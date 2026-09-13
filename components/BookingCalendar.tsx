"use client";
import { useState } from "react";
import { CalendarDays, ArrowUpRight } from "lucide-react";
import { bookingUrl, bookingEmbedUrl } from "@/lib/booking";

export default function BookingCalendar() {
  const [open, setOpen] = useState(false);
  return (
    <div className="booking-calendar">
      <div className="booking-calendar-heading">
        <span className="tiny-label">
          CONOCE BOTMATE · 30 MIN · GOOGLE MEET
        </span>
        <h2>Hablemos de tu proyecto.</h2>
        <p>
          Elige un horario disponible en nuestra agenda. Recibirás la
          información de tu videollamada al completar la reserva en Google.
        </p>
      </div>
      {open ? (
        <iframe
          src={bookingEmbedUrl}
          title="Agenda de citas de Botmate en Google Calendar"
          className="booking-iframe"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <div className="calendar-placeholder">
          <CalendarDays size={44} strokeWidth={1.25} />
          <h3>
            Tu próxima conversación
            <br />
            con la tecnología.
          </h3>
          <button
            type="button"
            className="btn-primary"
            onClick={() => setOpen(true)}
          >
            Ver horarios y reservar <ArrowUpRight size={18} />
          </button>
          <p className="fine-print">
            Al abrir la agenda se carga Google Calendar y aplica su política de
            privacidad.
          </p>
        </div>
      )}
      <a
        className="text-link"
        href={bookingUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        Abrir agenda en Google <ArrowUpRight size={16} />
      </a>
    </div>
  );
}
