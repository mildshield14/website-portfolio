// src/components/Calendar.tsx
import React, { useState, useEffect } from "react";
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
  start: Date;
  end: Date;
  available: boolean;
};

const Calendar: React.FC<CalendarProps> = ({ size, lang }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");
  const [, setBusy] = useState<any[]>([]);
  const [showCalendar, setShowCalendar] = useState(true);
  const [isBooking, setIsBooking] = useState(false);

  // Generate time slots for the selected date
  useEffect(() => {
    const fetchAndGenerateSlots = async () => {
      if (selectedDate) {
        try {
          // Check availability first
          const start = new Date(selectedDate);
          start.setHours(0, 0, 0);
          const end = new Date(selectedDate);
          end.setHours(23, 59, 59);

          const response = await fetch(
            `https://portfolio-backend-npr19civg-vennila-soobens-projects.vercel.app/api/busy?start=${start.toISOString()}&end=${end.toISOString()}`,
          );
          const busyPeriods = await response.json();
          setBusy(busyPeriods);

          const dayOfWeek = selectedDate.getDay();
          if (dayOfWeek === 0 || dayOfWeek === 6) {
            // 0 is Sunday, 6 is Saturday
            setTimeSlots([]);
            return;
          }

          // Generate available slots
          const slots: TimeSlot[] = [];
          const startHour = 9; // 9 AM
          const endHour = 17; // 5 PM

          for (let hour = startHour; hour < endHour; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
              const slotStart = new Date(selectedDate);
              slotStart.setHours(hour, minute, 0);
              const slotEnd = new Date(slotStart);
              slotEnd.setMinutes(slotEnd.getMinutes() + 30);

              const isAvailable = !busyPeriods.some(
                (busySlot: {
                  start: string | number | Date;
                  end: string | number | Date;
                }) =>
                  new Date(busySlot.start) < slotEnd &&
                  new Date(busySlot.end) > slotStart,
              );

              if (isAvailable) {
                slots.push({ start: slotStart, end: slotEnd, available: true });
              }
            }
          }
          setTimeSlots(slots);
          setMessage("");
        } catch (error) {
          setMessage(getTranslation(lang, "errorChecking"));
          setTimeSlots([]);
        }
      }
    };

    fetchAndGenerateSlots();
  }, [selectedDate, lang]);

  const checkAvailability = async (date: Date) => {
    try {
      const start = new Date(date);
      start.setHours(0, 0, 0);
      const end = new Date(date);
      end.setHours(23, 59, 59);

      const response = await fetch(
        `https://portfolio-backend-npr19civg-vennila-soobens-projects.vercel.app/api/busy?start=${start.toISOString()}&end=${end.toISOString()}`,
      );
      const data = await response.json();
      setBusy(data);
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
      to_email: attendeeEmail, // This should match your EmailJS template variable
      to_name: attendeeName,
      user_email: attendeeEmail, // Backup - some templates use this
      meeting_date: slot.start.toLocaleDateString(),
      meeting_time: `${slot.start.toLocaleTimeString()} – ${slot.end.toLocaleTimeString()}`,
      meeting_reason:
        reason || (lang === "fr" ? "Non spécifié" : "Not specified"),
      confirmation_message:
        lang === "fr"
          ? "Je vous enverrai un lien Zoom dans les 24h qui suivent. En cas d'annulation, veuillez me contacter."
          : "I'll send you a Zoom link in the next 24h. In case of cancellation, please contact me.",
      from_name: "Vennila Sooben",
      from_email: "vennilasooben1401@gmail.com",
    };

    console.log("Sending email to:", attendeeEmail);
    console.log("Template params:", templateParams);

    try {
      const result = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );
      console.log("✅ Email sent successfully:", result);
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

  // const sendOwnerNotification = async (
  //     attendeeName: string,
  //     attendeeEmail: string,
  //     slot: TimeSlot,
  //     reason: string
  // ) => {
  //     const ownerFormData = new FormData();
  //     ownerFormData.append('attendee_name', attendeeName);
  //     ownerFormData.append('attendee_email', attendeeEmail);
  //     ownerFormData.append('meeting_reason', reason || 'Not specified');
  //     ownerFormData.append('meeting_date', slot.start.toLocaleDateString());
  //     ownerFormData.append('meeting_time', `${slot.start.toLocaleTimeString()} - ${slot.end.toLocaleTimeString()}`);
  //     ownerFormData.append('_subject', `New Meeting Booking - ${attendeeName} on ${slot.start.toLocaleDateString()}`);
  //     ownerFormData.append('message',
  //         `New meeting booking details:\n\n` +
  //         `Attendee: ${attendeeName}\n` +
  //         `Email: ${attendeeEmail}\n` +
  //         `Date: ${slot.start.toLocaleDateString()}\n` +
  //         `Time: ${slot.start.toLocaleTimeString()} - ${slot.end.toLocaleTimeString()}\n` +
  //         `Reason: ${reason || 'Not specified'}\n\n` +
  //         `This booking was made through your portfolio calendar.`
  //     );
  //
  //     return fetch(`https://formspree.io/f/${import.meta.env.VITE_APP_FORM_KEY}`, {
  //         method: 'POST',
  //         body: ownerFormData,
  //         headers: {
  //             'Accept': 'application/json'
  //         }
  //     });
  // };

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
      const calendarResponse = await fetch("https://portfolio-backend-npr19civg-vennila-soobens-projects.vercel.app/api/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          start: selectedSlot.start,
          end: selectedSlot.end,
          title: `Meeting with ${name}`,
          attendee: email,
        }),
      });

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
      } else {
        console.warn("Attendee email failed:", attendeeEmailResult.reason);
        successMessage +=
          lang === "fr"
            ? " (Problème avec l'email de confirmation)"
            : " (Issue with confirmation email)";
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
                    {timeSlots.map((slot, index) => (
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
                        {slot.start.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </button>
                    ))}
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
