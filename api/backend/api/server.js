import express from "express";
import * as dav from "dav";
import ical from "node-ical";
import { createEvent } from "ics";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import fetch from "node-fetch";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });
console.log("🟢 Running server file:", __filename);

const {
  APPLE_ID,
  APPLE_APP_PASSWORD,
  CALDAV_URL,
  CALENDAR_PATH,
  PORT = 3000,
} = process.env;

if (!APPLE_ID || !APPLE_APP_PASSWORD) {
  console.error("❌ Missing APPLE_ID or APPLE_APP_PASSWORD; check .env file");
  process.exit(1);
}

// Try multiple Apple CalDAV servers - Apple uses different server endpoints
const APPLE_CALDAV_SERVERS = [
  "https://p01-caldav.icloud.com",
  "https://p02-caldav.icloud.com",
  "https://p03-caldav.icloud.com",
  "https://p04-caldav.icloud.com",
  "https://p05-caldav.icloud.com",
];

// Create a custom transport that works better with Apple's CalDAV
const transport = {
  send: async function (request, url) {
    console.log(
      ` Making ${request.method || "GET"} request to: ${url.substring(0, 80)}...`,
    );

    const fetchOptions = {
      method: request.method || "GET",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(`${APPLE_ID}:${APPLE_APP_PASSWORD}`).toString("base64"),
        "User-Agent": "DAVKit/4.0.1 (730); CalendarAgent/47 (CalendarAgent-47)",
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
    } else if (request.method === "REPORT") {
      fetchOptions.headers["Content-Type"] = "text/xml; charset=utf-8";
      fetchOptions.headers["Depth"] = "1";
    }

    // Add body if present
    if (request.requestData) {
      fetchOptions.body = request.requestData;
    }

    const response = await fetch(url, fetchOptions);
    const responseText = await response.text();

    console.log(`📡 Response: ${response.status} ${response.statusText}`);

    if (response.status >= 400) {
      console.error(
        `❌ Request failed: ${response.status} ${response.statusText}`,
      );
      console.error("Response body:", responseText.substring(0, 300));
    }

    return {
      status: response.status,
      responseText: responseText,
      getResponseHeader: (header) => response.headers.get(header),
    };
  },
};

let calendars = []; // will hold discovered calendars
let workingServer = null;
let davInterval;

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

// Manual CalDAV discovery function
async function manualCalDAVDiscovery(serverUrl) {
  try {
    console.log(" Manual CalDAV discovery...");

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

    // Extract principal URL from XML
    let principalMatch = principalXml.match(
      /<current-user-principal[^>]*><href[^>]*>([^<]+)<\/href><\/current-user-principal>/i,
    );
    if (!principalMatch) {
      principalMatch = principalXml.match(
        /<D:current-user-principal[^>]*><D:href[^>]*>([^<]+)<\/D:href><\/D:current-user-principal>/i,
      );
    }
    if (!principalMatch) {
      principalMatch = principalXml.match(/<href[^>]*>([^<]+)<\/href>/i);
    }
    if (!principalMatch) {
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

    // Extract calendar home URL
    let calendarHomeMatch = calendarHomeXml.match(
      /<calendar-home-set[^>]*><href[^>]*>([^<]+)<\/href><\/calendar-home-set>/i,
    );
    if (!calendarHomeMatch) {
      calendarHomeMatch = calendarHomeXml.match(
        /<C:calendar-home-set[^>]*><D:href[^>]*>([^<]+)<\/D:href><\/C:calendar-home-set>/i,
      );
    }
    if (!calendarHomeMatch) {
      calendarHomeMatch = calendarHomeXml.match(/<href[^>]*>([^<]+)<\/href>/i);
    }
    if (!calendarHomeMatch) {
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
    const discoveredCalendars = [];
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
        // Extract href
        let hrefMatch = responseContent.match(/<href[^>]*>([^<]+)<\/href>/i);
        if (!hrefMatch) {
          hrefMatch = responseContent.match(/<D:href[^>]*>([^<]+)<\/D:href>/i);
        }

        // Extract displayname
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
            discoveredCalendars.push(calendar);
            console.log(
              `Found calendar: ${calendar.displayName} at ${calendar.url}`,
            );
          }
        }
      }
    }

    console.log(`✅ Found ${discoveredCalendars.length} calendars`);
    return discoveredCalendars;
  } catch (error) {
    console.error("❌ Manual discovery failed:", error.message);
    throw error;
  }
}

async function initCalDAV() {
  console.log("🔑 Connecting to CalDAV...");

  try {
    // First, discover the correct Apple CalDAV server
    workingServer = await findAppleCalDAVServer();

    // Use manual discovery to get calendars
    calendars = await manualCalDAVDiscovery(workingServer);

    console.log(
      "✅ Calendars:",
      calendars.map((c) => c.displayName),
    );
    console.log(
      "🔗 Calendar URLs:",
      calendars.map((c) => c.url),
    );

    // Keep the connection alive with periodic refreshes
    davInterval = setInterval(async () => {
      try {
        console.log("🔄 CalDAV connection keepalive");
      } catch (err) {
        console.error("❌ CalDAV refresh failed:", err.message);
      }
    }, 60000); // Refresh every minute
  } catch (error) {
    console.error("❌ CalDAV initialization failed:", error.message);
    throw error;
  }
}

process.on("SIGINT", () => {
  if (davInterval) clearInterval(davInterval);
  console.log("👋 Shutting down gracefully");
  process.exit(0);
});

function getWorkCalendar() {
  if (!calendars || calendars.length === 0) {
    throw new Error("CalDAV calendars not initialized yet");
  }

  // If CALENDAR_PATH is specified, try to find exact match
  if (CALENDAR_PATH) {
    const cal = calendars.find((c) => c.url.endsWith(CALENDAR_PATH));
    if (!cal) {
      console.error("🚫 No calendar matches CALENDAR_PATH:", CALENDAR_PATH);
      console.error(
        "Available calendars:",
        calendars.map((c) => ({ name: c.displayName, url: c.url })),
      );
      return null;
    }
    return cal;
  }

  // Otherwise, return the first calendar (or you could implement logic to find "Work" calendar)
  return calendars[0];
}

// Custom function to fetch calendar events using direct CalDAV REPORT
async function fetchCalendarEvents(calendar, startDate, endDate) {
  try {
    console.log("📅 Fetching calendar events with REPORT method...");

    const reportBody = `<?xml version="1.0" encoding="UTF-8"?>
<C:calendar-query xmlns:C="urn:ietf:params:xml:ns:caldav" xmlns:D="DAV:">
  <D:prop>
    <D:getetag/>
    <C:calendar-data/>
  </D:prop>
  <C:filter>
    <C:comp-filter name="VCALENDAR">
      <C:comp-filter name="VEVENT">
        <C:time-range start="${startDate.toISOString().replace(/[-:]/g, "").split(".")[0]}Z"
                      end="${endDate.toISOString().replace(/[-:]/g, "").split(".")[0]}Z"/>
      </C:comp-filter>
    </C:comp-filter>
  </C:filter>
</C:calendar-query>`;

    const response = await transport.send(
      {
        method: "REPORT",
        requestData: reportBody,
        depth: "1",
      },
      calendar.url,
    );

    if (response.status !== 207) {
      throw new Error(`REPORT request failed with status ${response.status}`);
    }

    console.log(
      `📊 REPORT response received (${response.responseText.length} chars)`,
    );

    // Parse the multistatus XML response
    const events = [];
    const responseRegex = /<response[^>]*>(.*?)<\/response>/gis;
    let match;

    while ((match = responseRegex.exec(response.responseText)) !== null) {
      const responseContent = match[1];

      // Extract calendar data
      const calendarDataMatch = responseContent.match(
        /<calendar-data[^>]*>(.*?)<\/calendar-data>/is,
      );
      if (calendarDataMatch) {
        const calendarData = calendarDataMatch[1].trim();
        if (calendarData && calendarData.includes("BEGIN:VCALENDAR")) {
          events.push({ calendarData });
        }
      }
    }

    console.log(`📋 Found ${events.length} events`);
    return events;
  } catch (error) {
    console.error("❌ Failed to fetch calendar events:", error.message);
    throw error;
  }
}

async function startServer() {
  const app = express();
  app.use(express.json());

  app.get("/busy", async (req, res) => {
    try {
      const { start, end } = req.query;

      if (!calendars || calendars.length === 0) {
        return res.status(500).send("CalDAV calendars not initialized");
      }

      console.log(`📅 Fetching events from ${calendars.length} calendars`);

      const startDate = new Date(start);
      const endDate = new Date(end);

      const allBusyPeriods = [];

      // Filter out system calendars that typically don't contain user events
      const userCalendars = calendars;
      console.log(
        `📊 Checking ${userCalendars.length} user calendars:`,
        userCalendars.map((c) => c.displayName),
      );

      // Fetch events from each calendar
      for (const calendar of userCalendars) {
        try {
          console.log(`🔍 Checking calendar: ${calendar.displayName}`);

          // Use our custom calendar event fetching
          const events = await fetchCalendarEvents(
            calendar,
            startDate,
            endDate,
          );

          for (const eventObj of events) {
            try {
              // Parse the calendar data
              const parsed = ical.parseICS(eventObj.calendarData);
              for (const key in parsed) {
                const ev = parsed[key];
                if (ev.type === "VEVENT") {
                  const eventStart = new Date(ev.start);
                  const eventEnd = new Date(ev.end);

                  // Check if event overlaps with requested time range
                  if (eventEnd > startDate && eventStart < endDate) {
                    allBusyPeriods.push({
                      start: eventStart.toISOString(),
                      end: eventEnd.toISOString(),
                      title: ev.summary || "No Title",
                      calendar: calendar.displayName, // Add calendar name for reference
                    });
                  }
                }
              }
            } catch (parseError) {
              console.warn(
                `⚠️ Failed to parse event from ${calendar.displayName}:`,
                parseError.message,
              );
            }
          }
        } catch (calendarError) {
          console.warn(
            `⚠️ Failed to fetch events from ${calendar.displayName}:`,
            calendarError.message,
          );
          // Continue with other calendars even if one fails
        }
      }

      // Sort busy periods by start time
      allBusyPeriods.sort((a, b) => new Date(a.start) - new Date(b.start));

      console.log(
        `📋 Returning ${allBusyPeriods.length} busy periods from all calendars`,
      );
      console.log(
        `📊 Events by calendar:`,
        userCalendars.map((cal) => ({
          name: cal.displayName,
          count: allBusyPeriods.filter(
            (event) => event.calendar === cal.displayName,
          ).length,
        })),
      );

      res.json(allBusyPeriods);
    } catch (err) {
      console.error("❌ /busy error:", err.message);
      console.error("Stack trace:", err.stack);
      return res.status(500).send(err.message);
    }
  });

  // BOOK endpoint
  app.post("/book", async (req, res) => {
    try {
      const { start, end, title, attendee, reason } = req.body;

      // Validate required fields
      if (!start || !end || !title) {
        return res
          .status(400)
          .json({ error: "Missing required fields: start, end, title" });
      }

      console.log("📝 Creating event:", { start, end, title, attendee });

      const calendar = getWorkCalendar();
      if (!calendar) {
        return res.status(404).json({ error: "Work calendar not found" });
      }

      console.log("📅 Using calendar:", calendar.displayName);

      // Create ICS content manually for better compatibility
      const eventId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const startDate = new Date(start);
      const endDate = new Date(end);

      // Format dates for ICS (YYYYMMDDTHHMMSSZ)
      const formatICSDate = (date) => {
        return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
      };

      const icsContent = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//CalDAV API//EN",
        "CALSCALE:GREGORIAN",
        "METHOD:PUBLISH",
        "BEGIN:VEVENT",
        `UID:${eventId}@caldav-api`,
        `DTSTART:${formatICSDate(startDate)}`,
        `DTEND:${formatICSDate(endDate)}`,
        `DTSTAMP:${formatICSDate(new Date())}`,
        `CREATED:${formatICSDate(new Date())}`,
        `LAST-MODIFIED:${formatICSDate(new Date())}`,
        `SUMMARY:${title} REASON: ${reason || "No reason provided"}`,
        `STATUS:CONFIRMED`,
        `TRANSP:OPAQUE`,
        attendee ? `ATTENDEE:MAILTO:${attendee}` : "",
        "BEGIN:VALARM",
        "ACTION:DISPLAY",
        "DESCRIPTION:Reminder",
        "TRIGGER:-PT1H",
        "END:VALARM",
        "END:VEVENT",
        "END:VCALENDAR",
      ]
        .filter((line) => line !== "")
        .join("\r\n");

      console.log("📄 Generated ICS content length:", icsContent.length);

      try {
        const icsValue = icsContent;

        try {
          // Generate a unique filename for the event
          const eventUrl = `${calendar.url}${eventId}.ics`;

          console.log("🔗 Event URL:", eventUrl);

          // Use PUT method with proper headers for CalDAV
          const response = await fetch(eventUrl, {
            method: "PUT",
            headers: {
              Authorization:
                "Basic " +
                Buffer.from(`${APPLE_ID}:${APPLE_APP_PASSWORD}`).toString(
                  "base64",
                ),
              "Content-Type": "text/calendar; charset=utf-8",
              "User-Agent":
                "DAVKit/4.0.1 (730); CalendarAgent/47 (CalendarAgent-47)",
              "If-None-Match": "*", // Ensure we don't overwrite existing events
            },
            body: icsValue,
          });

          const responseText = await response.text();
          console.log(
            `📡 PUT Response: ${response.status} ${response.statusText}`,
          );

          if (response.status === 201 || response.status === 204) {
            console.log("✅ Event created successfully");
            res.status(201).json({
              message: "Event created successfully",
              eventId: eventId,
              eventUrl: eventUrl,
            });
          } else if (response.status === 412) {
            console.error("❌ Event already exists (412 Precondition Failed)");
            res
              .status(409)
              .json({ error: "Event with this ID already exists" });
          } else {
            console.error(
              "❌ PUT failed:",
              response.status,
              response.statusText,
            );
            console.error("Response body:", responseText);

            // If PUT fails, try using a different approach
            if (response.status === 501) {
              console.log(
                "🔄 PUT not supported, trying alternative approach...",
              );

              // Try using MKCALENDAR or alternative method
              const altResponse = await fetch(eventUrl, {
                method: "PUT",
                headers: {
                  Authorization:
                    "Basic " +
                    Buffer.from(`${APPLE_ID}:${APPLE_APP_PASSWORD}`).toString(
                      "base64",
                    ),
                  "Content-Type": "text/calendar",
                  "User-Agent": "CalDAV-Client/1.0",
                },
                body: icsValue,
              });

              if (altResponse.status === 201 || altResponse.status === 204) {
                console.log("✅ Event created with alternative method");
                res.status(201).json({
                  message: "Event created successfully",
                  eventId: eventId,
                });
              } else {
                throw new Error(
                  `Alternative method also failed: ${altResponse.status} ${altResponse.statusText}`,
                );
              }
            } else {
              throw new Error(
                `Server returned ${response.status}: ${responseText}`,
              );
            }
          }
        } catch (putError) {
          console.error("❌ Calendar PUT error:", putError);
          res.status(500).json({
            error: "Failed to create event on calendar server",
            details: putError.message,
          });
        }
      } catch (error) {
        console.error("❌ /book error:", error.message);
        res.status(500).json({
          error: "Internal server error",
          details: error.message,
        });
      }
    } catch (err) {
      console.error("❌ /book error:", err.message);
    }
  });

  app.get("/calendars", (req, res) => {
    try {
      if (!calendars || calendars.length === 0) {
        return res
          .status(500)
          .json({ error: "CalDAV calendars not initialized" });
      }

      const calendarList = calendars.map((cal) => ({
        displayName: cal.displayName,
        url: cal.url,
        description: cal.description || "No description",
        color: cal.color || "Default",
      }));

      res.json(calendarList);
    } catch (err) {
      console.error("❌ /calendars error:", err.message);
      res.status(500).json({ error: err.message });
    }
  });

  app.listen(PORT, () => {
    console.log(`🚀 API listening at http://localhost:${PORT}`);
    console.log(`📋 Available endpoints:`);
    console.log(
      `  GET  /busy?start=2025-06-28T00:00:00Z&end=2025-07-05T00:00:00Z`,
    );
    console.log(`  POST /book`);
    console.log(`  GET  /calendars (debug)`);
  });
}

// Kick everything off
initCalDAV()
  .then(startServer)
  .catch((err) => {
    console.error("❌ Failed to initialize CalDAV:", err.message);
    process.exit(1);
  });
