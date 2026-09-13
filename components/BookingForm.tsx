"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CalendarDays, ArrowUpRight, ArrowLeft, Check } from "lucide-react";
import { waLink } from "@/lib/site";
export default function BookingForm({ today }: { today: string }) {
  const [message, setMessage] = useState("");
  const review = useRef<HTMLElement>(null);
  const interacted = useRef(false);
  useEffect(() => {
    if (!interacted.current) return;
    if (message) review.current?.focus();
    else document.getElementById("booking-name")?.focus();
  }, [message]);
  return (
    <form
      className="booking-form"
      onSubmit={(e) => {
        e.preventDefault();
        const d = new FormData(e.currentTarget);
        const date = String(d.get("fecha"));
        const input = e.currentTarget.elements.namedItem(
          "fecha",
        ) as HTMLInputElement;
        input.setCustomValidity(date < today ? "Elige una fecha futura." : "");
        if (!e.currentTarget.reportValidity()) return;
        if (!String(d.get("nombre")).trim()) return;
        interacted.current = true;
        setMessage(
          `Hola Botmate, soy ${String(d.get("nombre")).trim()} de ${String(d.get("empresa")).trim()}.\nQuiero solicitar una demostración de ${d.get("solucion")}.\nFecha preferida: ${date}, ${d.get("horario")} (hora de Ciudad de México).\nModalidad: ${d.get("modalidad")}.\nCiudad: ${String(d.get("ciudad")).trim()}.\nPor favor confirmen disponibilidad antes de reservar.`,
        );
      }}
    >
      <div hidden={!!message}>
        <div className="booking-form-heading">
          <CalendarDays size={24} />
          <div>
            <h2>Solicita tu fecha.</h2>
            <p>El equipo confirma la disponibilidad contigo.</p>
          </div>
        </div>
        <fieldset>
          <legend>
            <span>01</span> Tu proyecto
          </legend>
          <div className="form-grid">
            <label className="form-field" htmlFor="booking-name">
              <span>Nombre *</span>
              <input
                className="input"
                name="nombre"
                id="booking-name"
                autoComplete="given-name"
                required
                pattern=".*\S.*"
                maxLength={100}
              />
            </label>
            <label className="form-field">
              <span>Empresa *</span>
              <input
                className="input"
                name="empresa"
                autoComplete="organization"
                required
                pattern=".*\S.*"
                maxLength={120}
              />
            </label>
          </div>
          <label className="form-field">
            <span>Ciudad y estado *</span>
            <input
              className="input"
              name="ciudad"
              autoComplete="address-level2"
              required
              pattern=".*\S.*"
              maxLength={120}
            />
          </label>
          <label className="form-field">
            <span>¿Qué te gustaría conocer?</span>
            <select className="input" name="solucion">
              <option>Entrega y hospitalidad</option>
              <option>Publicidad y eventos</option>
              <option>Limpieza comercial</option>
              <option>Logística interna</option>
              <option>Necesito asesoría para elegir</option>
            </select>
          </label>
        </fieldset>
        <fieldset>
          <legend>
            <span>02</span> Cuándo y cómo
          </legend>
          <div className="form-grid">
            <label className="form-field">
              <span>Fecha preferida *</span>
              <input
                className="input"
                type="date"
                name="fecha"
                required
                min={today}
                onInput={(e) => e.currentTarget.setCustomValidity("")}
              />
            </label>
            <label className="form-field">
              <span>Horario preferido</span>
              <select className="input" name="horario">
                <option>Por la mañana</option>
                <option>Por la tarde</option>
                <option>Horario flexible</option>
              </select>
            </label>
          </div>
          <label className="form-field">
            <span>Modalidad</span>
            <select className="input" name="modalidad">
              <option>Primera conversación por videollamada</option>
              <option>Demostración presencial por coordinar</option>
            </select>
          </label>
          <p className="fine-print">
            La fecha es una preferencia, no un horario disponible confirmado. La
            demostración presencial depende de ubicación y modelo.
          </p>
        </fieldset>
        <label className="consent-row">
          <input type="checkbox" required />
          <span>
            Leí la{" "}
            <Link href="/privacidad" target="_blank" rel="noopener noreferrer">
              información de privacidad
            </Link>{" "}
            y quiero preparar mi solicitud para compartirla por WhatsApp.
          </span>
        </label>
        <button className="btn-primary" type="submit">
          Revisar solicitud
          <ArrowUpRight size={17} />
        </button>
        <p className="fine-print">
          Tus datos permanecen en esta página hasta que decidas abrir WhatsApp.
        </p>
      </div>
      {message && (
        <section
          className="message-review"
          ref={review}
          tabIndex={-1}
          aria-labelledby="booking-review"
        >
          <Check size={28} />
          <h2 id="booking-review">Todo listo para solicitar tu demo.</h2>
          <pre>{message}</pre>
          <a
            href={waLink(message)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Enviar solicitud por WhatsApp
            <ArrowUpRight size={17} />
          </a>
          <p className="fine-print">
            Todavía no se ha enviado ni reservado. Pulsa enviar dentro de
            WhatsApp; Botmate te confirmará la fecha.
          </p>
          <button
            type="button"
            className="btn-ghost"
            onClick={() => setMessage("")}
          >
            <ArrowLeft size={16} />
            Editar solicitud
          </button>
        </section>
      )}
    </form>
  );
}
