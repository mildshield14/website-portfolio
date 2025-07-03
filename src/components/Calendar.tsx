// src/components/Calendar.tsx
import React, { useEffect, useState } from "react";
import "../scss/Calendar.scss";
import getTranslation from "../getTranslation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import emailjs from "@emailjs/browser";

emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

type CalendarProps = {
  size: string;
  lang: string;
};

type TimeSlot = {
  start: Date; // UTC time for booking
  end: Date; // UTC time for booking
  available: boolean;
  displayStart?: Date; // Local time for display
  displayEnd?: Date; // Local time for display
};

const Calendar: React.FC<CalendarProps> = ({ size, lang }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");
  const [_, setBusyPeriods] = useState<any[]>([]);
  const [showCalendar, setShowCalendar] = useState(true);
  const [isBooking, setIsBooking] = useState(false);

  // helper
  function isoUtcMidnight(date: Date, hour: 0 | 24) {
    const y = date.getUTCFullYear();
    const m = date.getUTCMonth();
    const d = date.getUTCDate();
    return new Date(Date.UTC(y, m, d + (hour === 24 ? 1 : 0))).toISOString();
  }

  // Generate time slots for the selected date
  useEffect(() => {
    const fetchAndGenerateSlots = async () => {
      if (selectedDate) {
        try {
          // Check availability first
          const startISO = isoUtcMidnight(selectedDate, 0); // 00:00 Z of that day
          const endISO = isoUtcMidnight(selectedDate, 24); // 00:00 Z next day
          const response = await fetch(
            `https://portfolio-backend-two-beta.vercel.app/api/busy?start=${startISO}&end=${endISO}`,
          );
          const busyPeriodsData = await response.json();
          setBusyPeriods(busyPeriodsData);

          const dayOfWeek = selectedDate.getDay();
          if (dayOfWeek === 0 || dayOfWeek === 6) {
            setTimeSlots([]);
            return;
          }

          // FIXED: Generate slots in LOCAL timezone, then convert to UTC for comparison
          const slots: TimeSlot[] = [];
          const startHour = 9; // 9 AM LOCAL TIME
          const endHour = 17; // 5 PM LOCAL TIME

          // Fixed slot generation logic - replace the slot generation part in your useEffect

          for (let hour = startHour; hour < endHour; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
              // Create slot in LOCAL timezone for display
              const slotStartLocal = new Date(selectedDate);
              slotStartLocal.setHours(hour, minute, 0, 0);

              const slotEndLocal = new Date(slotStartLocal);
              slotEndLocal.setMinutes(slotEndLocal.getMinutes() + 30);

              const slotStartUTC = new Date(slotStartLocal.toISOString());
              const slotEndUTC = new Date(slotEndLocal.toISOString());

              // Check if this slot overlaps with any busy period
              const isAvailable = !busyPeriodsData.some((busyPeriod: any) => {
                const busyStart = new Date(busyPeriod.start);
                const busyEnd = new Date(busyPeriod.end);

                // inclusive bounds
                return slotStartUTC <= busyEnd && busyStart <= slotEndUTC;
              });

              if (isAvailable) {
                slots.push({
                  start: slotStartUTC, // UTC for booking API
                  end: slotEndUTC, // UTC for booking API
                  available: true,
                  displayStart: slotStartLocal, // Local for display
                  displayEnd: slotEndLocal, // Local for display
                });
              }
            }
          }
          setTimeSlots(slots);
          setMessage("");

          // const relevantEvents = debugBackendResponse(
          //   busyPeriodsData,
          //   selectedDate,
          // );
        } catch (error) {
          console.error("Error fetching busy periods:", error);
          setMessage(getTranslation(lang, "errorChecking"));
          setTimeSlots([]);
        }
      }
    };

    fetchAndGenerateSlots();
  }, [selectedDate, lang]);

  const checkAvailability = async (date: Date) => {
    try {
      const startISO = isoUtcMidnight(date, 0); // 00:00 Z of that day
      const endISO = isoUtcMidnight(date, 24); // 00:00 Z next day

      const response = await fetch(
        `https://portfolio-backend-two-beta.vercel.app/api/busy?start=${startISO}&end=${endISO}`,
      );
      const data = await response.json();
      setBusyPeriods(data);
      setMessage("");
    } catch (error) {
      setMessage(getTranslation(lang, "errorChecking"));
    }
  };

  const downloadICSFile = (
    slot: TimeSlot,
    userName: string,
    userReason: string,
  ) => {
    const formatDateForICS = (date: Date): string => {
      return date
        .toISOString()
        .replace(/[-:]/g, "")
        .replace(/\.\d{3}/, "");
    };

    const uid = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}@portfolio`;

    const icsData = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Portfolio Calendar//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:REQUEST",
      "BEGIN:VEVENT",
      `UID:${uid}`,
      `DTSTAMP:${formatDateForICS(new Date())}`,
      `DTSTART:${formatDateForICS(slot.start)}`,
      `DTEND:${formatDateForICS(slot.end)}`,
      `SUMMARY:Meeting with ${userName}`,
      `DESCRIPTION:Reason: ${userReason || "No reason provided"}\\nBooking made via portfolio calendar`,
      `ORGANIZER;CN=Vennila Sooben:MAILTO:vennilasooben1401@gmail.com`,
      `ATTENDEE;CUTYPE=INDIVIDUAL;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;RSVP=TRUE;CN=${userName}:MAILTO:${email}`,
      "STATUS:CONFIRMED",
      "SEQUENCE:0",
      "PRIORITY:5",
      "CLASS:PUBLIC",
      "TRANSP:OPAQUE",
      "BEGIN:VALARM",
      "TRIGGER:-PT15M",
      "ACTION:DISPLAY",
      "DESCRIPTION:Meeting reminder",
      "END:VALARM",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `meeting-${slot.start.toISOString().split("T")[0]}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const sendAttendeeConfirmation = async (
    attendeeEmail: string,
    attendeeName: string,
    slot: TimeSlot,
    reason: string,
  ) => {
    // Validate email before sending
    if (!attendeeEmail || !attendeeEmail.includes("@")) {
      throw new Error("Invalid email address");
    }

    const templateParams = {
      to_email: attendeeEmail,
      to_name: attendeeName,
      user_email: attendeeEmail,
      meeting_date: slot.start.toLocaleDateString(),
      meeting_time: `${(slot.displayStart || slot.start).toLocaleTimeString()} – ${(slot.displayEnd || slot.end).toLocaleTimeString()}`,
      meeting_reason:
        reason || (lang === "fr" ? "Non spécifié" : "Not specified"),
      confirmation_message:
        lang === "fr"
          ? "Je vous enverrai un lien Zoom dans les 24h qui suivent si votre demande a l'air d'être authentique. En cas d'annulation, veuillez me contacter."
          : "I'll send you a Zoom link in the next 24h if your demand looks legit. In case of cancellation, please contact me.",
      from_name: "Vennila Sooben",
      from_email: "vennilasooben1401@gmail.com",
    };

    try {
      const result = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );
      return result;
    } catch (error: any) {
      console.error("❌ EmailJS error:", error);
      console.error("Error details:", {
        status: error.status,
        text: error.text,
        message: error.message,
      });
      throw error;
    }
  };

  const bookAppointment = async () => {
    if (!selectedSlot || !name || !email) {
      setMessage(getTranslation(lang, "fillRequired"));
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage(
        lang === "fr" ? "Adresse email invalide" : "Invalid email address",
      );
      return;
    }

    setIsBooking(true);
    try {
      setMessage(
        lang === "fr" ? "Réservation en cours..." : "Booking in progress...",
      );

      // 1. Book in calendar API
      const calendarResponse = await fetch(
        "https://portfolio-backend-two-beta.vercel.app/api/book",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            start: selectedSlot.start,
            end: selectedSlot.end,
            title: `Meeting with ${name}`,
            reason: reason,
            attendee: email,
            attendeeName: name,
          }),
        },
      );

      if (!calendarResponse.ok) {
        throw new Error("Failed to book calendar slot");
      }

      // 2. Send notifications in parallel (but handle failures gracefully)
      const [ownerNotificationResult, attendeeEmailResult] =
        await Promise.allSettled([
          //   sendOwnerNotification(name, email, selectedSlot, reason),
          sendAttendeeConfirmation(email, name, selectedSlot, reason),
          sendAttendeeConfirmation(
            "vennilasooben1401@gmail.com",
            name,
            selectedSlot,
            reason,
          ),
        ]);

      // 3. Download ICS file regardless of email status
      downloadICSFile(selectedSlot, name, reason);

      // 4. Show appropriate success message
      let successMessage =
        lang === "fr"
          ? "Rendez-vous réservé avec succès!"
          : "Booking successful!";

      if (attendeeEmailResult.status === "fulfilled") {
        successMessage +=
          lang === "fr"
            ? " Email de confirmation envoyé."
            : " Confirmation email sent.";
      }

      if (ownerNotificationResult.status === "rejected") {
        console.warn(
          "Owner notification failed:",
          ownerNotificationResult.reason,
        );
      }

      setMessage(successMessage);

      // 5. Reset form
      setSelectedSlot(null);
      setName("");
      setEmail("");
      setReason("");
      checkAvailability(selectedDate!);
    } catch (error) {
      console.error("Booking error:", error);
      setMessage(getTranslation(lang, "bookingError"));
    } finally {
      setIsBooking(false);
    }
  };

  // const debugBackendResponse = (busyPeriodsData: any[], selectedDate: Date) => {
  //   const relevantEvents = busyPeriodsData.filter((event) => {
  //     const eventStart = new Date(event.start);
  //     const eventDate = eventStart.toDateString();
  //     const selectedDateStr = selectedDate.toDateString();
  //     return eventDate === selectedDateStr;
  //   });
  //
  //   return relevantEvents;
  // };

  return (
    <section className={size}>
      <h2 id="calendar" className="page__title">
        {getTranslation(lang, "calendar")}
      </h2>
      <div className="calendar__container">
        <div className="calendar__main">
          <DatePicker
            selected={selectedDate}
            onChange={(date: Date | null) => {
              if (date) {
                setSelectedDate(date);
                setShowCalendar(true);
                checkAvailability(date);
              }
            }}
            inline
            minDate={new Date()}
            dateFormat="MMMM d, yyyy"
          />

          {selectedDate && timeSlots.length > 0 && (
            <div className="calendar__slots">
              {showCalendar && (
                <>
                  <button
                    className="calendar__close-button"
                    onClick={() =>
                      setShowCalendar((showCalendar) => !showCalendar)
                    }
                  >
                    ×
                  </button>
                  <h3>
                    {selectedDate.toLocaleDateString(
                      lang === "fr" ? "fr-FR" : "en-US",
                      {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      },
                    )}
                  </h3>
                  <div className="calendar__slots-grid">
                    {timeSlots.map((slot, index) => {
                      // Convert UTC back to local for display
                      const displayTime = new Date(slot.start.getTime());
                      return (
                        <button
                          key={index}
                          className={`calendar__slot ${
                            selectedSlot === slot
                              ? "calendar__slot--selected"
                              : ""
                          }`}
                          onClick={() => setSelectedSlot(slot)}
                          disabled={isBooking}
                        >
                          {displayTime.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          )}

          {selectedDate && timeSlots.length === 0 && (
            <div className="calendar__no-slots">
              {getTranslation(lang, "noAvailableSlots")}
            </div>
          )}
        </div>

        {selectedSlot && (
          <div className="calendar__form">
            <h3>{getTranslation(lang, "bookingDetails")}</h3>
            <input
              type="text"
              placeholder={getTranslation(lang, "name")}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="calendar__input"
              disabled={isBooking}
            />
            <input
              type="email"
              placeholder={getTranslation(lang, "email")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="calendar__input"
              disabled={isBooking}
            />
            <input
              type="text"
              placeholder={getTranslation(lang, "reasons")}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="calendar__input"
              disabled={isBooking}
            />
            <button
              onClick={bookAppointment}
              className="calendar__button"
              disabled={isBooking}
            >
              {isBooking
                ? lang === "fr"
                  ? "Réservation..."
                  : "Booking..."
                : getTranslation(lang, "book")}
            </button>
          </div>
        )}

        {message && (
          <div
            className={`calendar__message ${
              message.includes("error") ||
              message.includes("Problem") ||
              message.includes("Issue") ||
              message.includes("Invalid") ||
              message.includes("invalide")
                ? "calendar__message--error"
                : ""
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </section>
  );
};

export default Calendar;
