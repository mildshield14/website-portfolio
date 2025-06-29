import { createAccount } from "dav";
import fetch from "node-fetch";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

const APPLE_ID = process.env.VITE_APP_APPLE_ID;
const APPLE_APP_PASSWORD = process.env.VITE_APP_APPLE_APP_PASSWORD;

// Try multiple Apple CalDAV servers - Apple uses different server endpoints
const APPLE_CALDAV_SERVERS = [
  "https://p01-caldav.icloud.com",
  "https://p02-caldav.icloud.com",
  "https://p03-caldav.icloud.com",
  "https://p04-caldav.icloud.com",
  "https://p05-caldav.icloud.com",
];

const transport = {
  send: async function (request, url) {
    console.log("Transport called with:", {
      method: request.method,
      url: url.substring(0, 100) + (url.length > 100 ? "..." : ""),
    });

    if (!url) {
      console.error("No URL provided to transport");
      throw new Error("No URL provided to transport");
    }

    try {
      const fetchOptions = {
        method: request.method || "GET",
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(`${APPLE_ID}:${APPLE_APP_PASSWORD}`).toString("base64"),
          "User-Agent":
            "DAVKit/4.0.1 (730); CalendarAgent/47 (CalendarAgent-47)",
          Accept: "*/*",
          "Accept-Language": "en-us",
          Connection: "keep-alive",
        },
      };

      // Set method-specific headers
      if (request.method === "PROPFIND") {
        fetchOptions.headers["Content-Type"] = "text/xml; charset=utf-8";
        fetchOptions.headers["Depth"] = request.depth || "0";
        fetchOptions.headers["Brief"] = "t";
      }

      // Add body if present
      if (request.requestData) {
        fetchOptions.body = request.requestData;
      }

      console.log(
        `Making ${fetchOptions.method} request to: ${url.substring(0, 80)}...`,
      );

      const response = await fetch(url, fetchOptions);
      const responseText = await response.text();

      console.log(`Response: ${response.status} ${response.statusText}`);

      // Debug Apple's XML response format
      if (response.status === 207 && responseText) {
        console.log(
          "XML Response sample:",
          responseText.substring(0, 500) + "...",
        );
      }

      if (response.status >= 400) {
        console.log("Response headers:", Object.fromEntries(response.headers));
        if (responseText) {
          console.log("Response body:", responseText.substring(0, 300));
        }
      }

      // Handle specific error cases
      if (response.status === 401) {
        console.error("❌ Authentication failed (401 Unauthorized)");
        throw new Error(
          "Authentication failed - check Apple ID and App-Specific Password",
        );
      } else if (response.status === 404) {
        console.error(
          "❌ Resource not found (404) - trying different server...",
        );
        throw new Error("Resource not found");
      }

      // Clean up the XML response for better parsing
      let cleanedResponseText = responseText;
      if (response.status === 207 && responseText.includes("<?xml")) {
        // Remove any BOM or extra whitespace that might interfere with parsing
        cleanedResponseText = responseText.replace(/^\uFEFF/, "").trim();
      }

      // Return response in format expected by dav library
      return {
        status: response.status,
        responseText: cleanedResponseText,
        getResponseHeader: (header) => response.headers.get(header),
      };
    } catch (error) {
      console.error("Request failed:", error.message);
      throw error;
    }
  },
};

// Function to find the correct Apple CalDAV server
async function findAppleCalDAVServer() {
  console.log("🔍 Discovering Apple CalDAV server...");

  for (const serverUrl of APPLE_CALDAV_SERVERS) {
    try {
      console.log(`Trying server: ${serverUrl}`);

      // Test basic connectivity with a simple PROPFIND request
      const testUrl = `${serverUrl}/`;
      const response = await fetch(testUrl, {
        method: "PROPFIND",
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(`${APPLE_ID}:${APPLE_APP_PASSWORD}`).toString("base64"),
          "Content-Type": "text/xml; charset=utf-8",
          Depth: "0",
          "User-Agent":
            "DAVKit/4.0.1 (730); CalendarAgent/47 (CalendarAgent-47)",
          Brief: "t",
        },
        body: `<?xml version="1.0" encoding="UTF-8"?>
<D:propfind xmlns:D="DAV:">
  <D:prop>
    <D:current-user-principal/>
  </D:prop>
</D:propfind>`,
      });

      if (response.status === 207 || response.status === 200) {
        console.log(`✅ Found working server: ${serverUrl}`);
        return serverUrl;
      } else if (response.status === 401) {
        console.log("❌ Authentication failed - check credentials");
        throw new Error("Authentication failed");
      }
    } catch (error) {
      console.log(`❌ Server ${serverUrl} failed: ${error.message}`);
      continue;
    }
  }

  throw new Error("Could not find a working Apple CalDAV server");
}

// Helper function to construct full URL
function constructFullUrl(baseUrl, path) {
  if (path.startsWith("http")) {
    return path;
  }
  // Remove trailing slash from baseUrl and leading slash from path if both exist
  const cleanBaseUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
  const cleanPath = path.startsWith("/") ? path : "/" + path;
  return cleanBaseUrl + cleanPath;
}

// Manual CalDAV discovery function as fallback
async function manualCalDAVDiscovery(serverUrl) {
  try {
    console.log("🔍 Manual CalDAV discovery...");

    // Step 1: Get current user principal
    const principalResponse = await fetch(`${serverUrl}/`, {
      method: "PROPFIND",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(`${APPLE_ID}:${APPLE_APP_PASSWORD}`).toString("base64"),
        "Content-Type": "text/xml; charset=utf-8",
        Depth: "0",
        "User-Agent": "DAVKit/4.0.1 (730); CalendarAgent/47 (CalendarAgent-47)",
      },
      body: `<?xml version="1.0" encoding="UTF-8"?>
<D:propfind xmlns:D="DAV:">
  <D:prop>
    <D:current-user-principal/>
  </D:prop>
</D:propfind>`,
    });

    const principalXml = await principalResponse.text();
    console.log(
      "Principal response sample:",
      principalXml.substring(0, 400) + "...",
    );

    // Extract principal URL from XML - Apple uses both default namespace and D: namespace
    let principalMatch = principalXml.match(
      /<current-user-principal[^>]*><href[^>]*>([^<]+)<\/href><\/current-user-principal>/i,
    );
    if (!principalMatch) {
      // Try with D: namespace as fallback
      principalMatch = principalXml.match(
        /<D:current-user-principal[^>]*><D:href[^>]*>([^<]+)<\/D:href><\/D:current-user-principal>/i,
      );
    }
    if (!principalMatch) {
      // Try more flexible pattern
      principalMatch = principalXml.match(/<href[^>]*>([^<]+)<\/href>/i);
    }
    if (!principalMatch) {
      console.log("Full principal XML:", principalXml);
      throw new Error("Could not find current-user-principal in response");
    }

    const principalPath = principalMatch[1];
    const fullPrincipalUrl = constructFullUrl(serverUrl, principalPath);
    console.log("✅ Found principal URL:", fullPrincipalUrl);

    // Step 2: Get calendar home
    const calendarHomeResponse = await fetch(fullPrincipalUrl, {
      method: "PROPFIND",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(`${APPLE_ID}:${APPLE_APP_PASSWORD}`).toString("base64"),
        "Content-Type": "text/xml; charset=utf-8",
        Depth: "0",
        "User-Agent": "DAVKit/4.0.1 (730); CalendarAgent/47 (CalendarAgent-47)",
      },
      body: `<?xml version="1.0" encoding="UTF-8"?>
<D:propfind xmlns:D="DAV:" xmlns:C="urn:ietf:params:xml:ns:caldav">
  <D:prop>
    <C:calendar-home-set/>
  </D:prop>
</D:propfind>`,
    });

    const calendarHomeXml = await calendarHomeResponse.text();
    console.log(
      "Calendar home response sample:",
      calendarHomeXml.substring(0, 400) + "...",
    );

    // Extract calendar home URL - try multiple patterns
    let calendarHomeMatch = calendarHomeXml.match(
      /<calendar-home-set[^>]*><href[^>]*>([^<]+)<\/href><\/calendar-home-set>/i,
    );
    if (!calendarHomeMatch) {
      calendarHomeMatch = calendarHomeXml.match(
        /<C:calendar-home-set[^>]*><D:href[^>]*>([^<]+)<\/D:href><\/C:calendar-home-set>/i,
      );
    }
    if (!calendarHomeMatch) {
      // Try more flexible pattern
      calendarHomeMatch = calendarHomeXml.match(/<href[^>]*>([^<]+)<\/href>/i);
    }
    if (!calendarHomeMatch) {
      console.log("Full calendar home XML:", calendarHomeXml);
      throw new Error("Could not find calendar-home-set in response");
    }

    const calendarHomePath = calendarHomeMatch[1];
    const fullCalendarHomeUrl = constructFullUrl(serverUrl, calendarHomePath);
    console.log("✅ Found calendar home URL:", fullCalendarHomeUrl);

    // Step 3: List calendars
    const calendarsResponse = await fetch(fullCalendarHomeUrl, {
      method: "PROPFIND",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(`${APPLE_ID}:${APPLE_APP_PASSWORD}`).toString("base64"),
        "Content-Type": "text/xml; charset=utf-8",
        Depth: "1",
        "User-Agent": "DAVKit/4.0.1 (730); CalendarAgent/47 (CalendarAgent-47)",
      },
      body: `<?xml version="1.0" encoding="UTF-8"?>
<D:propfind xmlns:D="DAV:" xmlns:C="urn:ietf:params:xml:ns:caldav" xmlns:CS="http://calendarserver.org/ns/" xmlns:ICAL="http://apple.com/ns/ical/">
  <D:prop>
    <D:displayname/>
    <D:resourcetype/>
    <C:calendar-description/>
    <ICAL:calendar-color/>
    <CS:getctag/>
    <C:supported-calendar-component-set/>
  </D:prop>
</D:propfind>`,
    });

    const calendarsXml = await calendarsResponse.text();

    // Parse calendar information
    const calendars = [];
    const responseRegex = /<response[^>]*>(.*?)<\/response>/gis;
    let match;

    while ((match = responseRegex.exec(calendarsXml)) !== null) {
      const responseContent = match[1];

      // Check if this response contains a calendar resource type
      const hasCalendarResourceType =
        responseContent.includes("<C:calendar/>") ||
        responseContent.includes("<calendar/>") ||
        (responseContent.includes("resourcetype") &&
          responseContent.includes("calendar"));

      if (hasCalendarResourceType) {
        // Extract href - try multiple patterns
        let hrefMatch = responseContent.match(/<href[^>]*>([^<]+)<\/href>/i);
        if (!hrefMatch) {
          hrefMatch = responseContent.match(/<D:href[^>]*>([^<]+)<\/D:href>/i);
        }

        // Extract displayname - try multiple patterns
        let displayNameMatch = responseContent.match(
          /<displayname[^>]*>([^<]*)<\/displayname>/i,
        );
        if (!displayNameMatch) {
          displayNameMatch = responseContent.match(
            /<D:displayname[^>]*>([^<]*)<\/D:displayname>/i,
          );
        }

        const descriptionMatch = responseContent.match(
          /<C:calendar-description[^>]*>([^<]*)<\/C:calendar-description>/i,
        );
        const colorMatch = responseContent.match(
          /<ICAL:calendar-color[^>]*>([^<]*)<\/ICAL:calendar-color>/i,
        );

        if (hrefMatch) {
          const calendarUrl = constructFullUrl(serverUrl, hrefMatch[1]);
          const calendar = {
            url: calendarUrl,
            displayName: displayNameMatch
              ? displayNameMatch[1]
              : "Unnamed Calendar",
            description: descriptionMatch ? descriptionMatch[1] : "",
            color: colorMatch ? colorMatch[1] : "Default",
          };

          // Skip the calendar home URL itself
          if (
            calendar.url !== fullCalendarHomeUrl &&
            calendar.url !== fullCalendarHomeUrl + "/"
          ) {
            calendars.push(calendar);
            console.log(
              `Found calendar: ${calendar.displayName} at ${calendar.url}`,
            );
          }
        }
      }
    }

    console.log("\n🎉 === MANUAL DISCOVERY SUCCESSFUL ===");
    console.log("Found calendars:\n");

    if (calendars.length > 0) {
      calendars.forEach((cal, index) => {
        console.log(`${index + 1}. ${cal.displayName}`);
        console.log(`   URL: ${cal.url}`);
        console.log(`   Description: ${cal.description || "No description"}`);
        console.log(`   Color: ${cal.color}`);
        console.log("");
      });

      console.log(`Total calendars found: ${calendars.length}`);
    } else {
      console.log("⚠️  No calendars found");
    }

    return calendars;
  } catch (error) {
    console.error("❌ Manual discovery failed:", error.message);
    throw error;
  }
}

(async () => {
  try {
    console.log("Username:", APPLE_ID);

    // First, discover the correct Apple CalDAV server
    const serverUrl = await findAppleCalDAVServer();

    console.log("\n📅 Creating CalDAV account...");

    try {
      const account = await createAccount({
        server: serverUrl,
        credentials: {
          username: APPLE_ID,
          password: APPLE_APP_PASSWORD,
        },
        loadCollections: true,
        xhr: transport,
        accountType: "caldav",
      });

      console.log("\n🎉 === CONNECTION SUCCESSFUL ===");
      console.log("Found calendars:\n");

      if (account.calendars && account.calendars.length > 0) {
        account.calendars.forEach((cal, index) => {
          console.log(`${index + 1}. ${cal.displayName || "Unnamed Calendar"}`);
          console.log(`   URL: ${cal.url}`);
          console.log(`   Description: ${cal.description || "No description"}`);
          console.log(`   Color: ${cal.color || "Default"}`);
          console.log(`   Timezone: ${cal.timezone || "Default"}`);
          console.log("");
        });

        console.log(`Total calendars found: ${account.calendars.length}`);
      } else {
        console.log("⚠️  No calendars found or calendars array is empty");
        console.log("Account principal:", account.principalUrl);
        console.log("Account home URL:", account.homeUrl);
      }
    } catch (davError) {
      console.log("DAV Error:", davError.message);

      // Manual CalDAV discovery as fallback
      await manualCalDAVDiscovery(serverUrl);
    }
  } catch (error) {
    console.error("\n❌ === CONNECTION FAILED ===");
  }
})();
