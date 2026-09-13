"use client";
import type {Locale} from "@/lib/locale";
import { useState } from "react";
import { CalendarDays, ArrowUpRight } from "lucide-react";
import { bookingUrl, bookingEmbedUrl } from "@/lib/booking";

export default function BookingCalendar({locale="es"}:{locale?:Locale}) {
  const en = locale === "en";
  const [open, setOpen] = useState(false);
  return (
    <div className="booking-calendar">
      <div className="booking-calendar-heading">
        <span className="tiny-label">
          {en?"MEET BOTMATE":"CONOCE BOTMATE"} · 30 MIN · GOOGLE MEET
        </span>
        <h2>{en?"Let’s talk about your project.":"Hablemos de tu proyecto."}</h2>
        <p>
          {en?"Choose an available time. You will receive your video call details when you complete the booking in Google.":"Elige un horario disponible en nuestra agenda. Recibirás la información de tu videollamada al completar la reserva en Google."}
        </p>
      </div>
      {open ? (
        <iframe
          src={bookingEmbedUrl}
          title={en?"Botmate booking calendar":"Agenda de citas de Botmate en Google Calendar"}
          className="booking-iframe"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <div className="calendar-placeholder">
          <CalendarDays size={44} strokeWidth={1.25} />
          <h3>
            {en?"Your next conversation with technology.":"Tu próxima conversación con la tecnología."}
          </h3>
          <button
            type="button"
            className="btn-primary"
            onClick={() => setOpen(true)}
          >
            {en?"View times and book":"Ver horarios y reservar"} <ArrowUpRight size={18} />
          </button>
          <p className="fine-print">
            {en?"Opening the calendar loads Google Calendar and its privacy policy applies.":"Al abrir la agenda se carga Google Calendar y aplica su política de privacidad."}
          </p>
        </div>
      )}
      <a
        className="text-link"
        href={bookingUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        {en?"Open Google Calendar":"Abrir agenda en Google"} <ArrowUpRight size={16} />
      </a>
    </div>
  );
}
