"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowLeft, ClipboardCheck } from "lucide-react";
import { waLink } from "@/lib/site";
export default function ContactForm({
  initialInterest = "Demo",
  initialRobot = "",
}: {
  initialInterest?: string;
  initialRobot?: string;
}) {
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const review = useRef<HTMLElement>(null);
  const hasInteracted = useRef(false);
  useEffect(() => {
    if (!hasInteracted.current) return;
    if (message) review.current?.focus();
    else document.getElementById("nombre")?.focus();
  }, [message]);
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("nombre") || "").trim();
    const city = String(data.get("ciudad") || "").trim();
    if (!name || !city) {
      e.currentTarget
        .querySelector<HTMLInputElement>(!name ? "#nombre" : "#ciudad")
        ?.focus();
      return;
    }
    hasInteracted.current = true;
    setMessage(
      [
        `Hola Botmate, soy ${name}${data.get("empresa") ? ` de ${String(data.get("empresa")).trim()}` : ""}.`,
        `Me interesa: ${data.get("interes")}.`,
        data.get("robot") && `Modelo: ${String(data.get("robot")).trim()}.`,
        `Mi operación está en ${city}.`,
        data.get("mensaje") &&
          `Necesidad: ${String(data.get("mensaje")).trim()}`,
      ]
        .filter(Boolean)
        .join("\n"),
    );
    setCopied(false);
    setCopyError(false);
  }
  return (
    <form className="contact-form" onSubmit={submit}>
      <h2>Cuéntanos tu proyecto.</h2>
      <p>Solo lo necesario para comenzar. Los campos con * son obligatorios.</p>
      <div hidden={!!message}>
        <div className="form-grid">
          <label className="form-field" htmlFor="nombre">
            <span>Nombre *</span>
            <input
              id="nombre"
              name="nombre"
              autoComplete="given-name"
              className="input"
              required
              pattern=".*\S.*"
              maxLength={100}
              placeholder="Tu nombre"
            />
          </label>
          <label className="form-field" htmlFor="empresa">
            <span>Empresa</span>
            <input
              id="empresa"
              name="empresa"
              autoComplete="organization"
              className="input"
              maxLength={120}
              placeholder="Nombre de tu negocio"
            />
          </label>
        </div>
        <div className="form-grid">
          <label className="form-field" htmlFor="ciudad">
            <span>Ciudad y estado *</span>
            <input
              id="ciudad"
              name="ciudad"
              autoComplete="address-level2"
              className="input"
              required
              pattern=".*\S.*"
              maxLength={120}
              placeholder="Ej. Guadalajara, Jalisco"
            />
          </label>
          <label className="form-field" htmlFor="interes">
            <span>¿Qué necesitas?</span>
            <select
              id="interes"
              name="interes"
              className="input"
              defaultValue={initialInterest}
            >
              <option value="Demo">Una demostración</option>
              <option value="Cotizacion">Cotizar un robot</option>
              <option value="Renta">Rentar</option>
              <option value="Compra">Comprar</option>
              <option value="Soporte">Soporte o refacciones</option>
            </select>
          </label>
        </div>
        <label className="form-field" htmlFor="robot">
          <span>Modelo de interés (opcional)</span>
          <input
            id="robot"
            name="robot"
            className="input"
            defaultValue={initialRobot}
            maxLength={100}
            placeholder="Te ayudamos a elegir"
          />
        </label>
        <label className="form-field" htmlFor="mensaje">
          <span>¿Qué tarea quieres resolver?</span>
          <textarea
            id="mensaje"
            name="mensaje"
            rows={3}
            maxLength={800}
            className="input"
            placeholder="Ej. Trasladar platillos entre cocina y mesas durante el servicio."
          />
        </label>
        <label className="consent-row">
          <input type="checkbox" name="consentimiento" required />
          <span>
            He leído la{" "}
            <Link href="/privacidad" target="_blank" rel="noopener noreferrer">
              información sobre privacidad
            </Link>{" "}
            y quiero preparar una consulta para compartirla con Botmate por
            WhatsApp.
          </span>
        </label>
        <button type="submit" className="btn-primary">
          Revisar mi mensaje
          <ArrowUpRight size={17} />
        </button>
        <p className="fine-print">
          Este formulario prepara el texto en tu navegador. Tú decides cuándo
          enviarlo desde WhatsApp.
        </p>
      </div>
      {message && (
        <section
          ref={review}
          tabIndex={-1}
          className="message-review"
          aria-labelledby="review-title"
        >
          <h3 id="review-title">Tu mensaje está preparado.</h3>
          <pre>{message}</pre>
          <a
            href={waLink(message)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Continuar en WhatsApp
            <ArrowUpRight size={17} />
          </a>
          <p>
            Se abrirá WhatsApp en otra pestaña. Revisa el texto y pulsa enviar
            allí para contactar al equipo; todavía no se ha enviado esta
            solicitud.
          </p>
          <button
            type="button"
            className="btn-ghost"
            onClick={() => {
              setMessage("");
            }}
          >
            <ArrowLeft size={15} />
            Editar
          </button>
          <button
            type="button"
            className="btn-ghost"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(message);
                setCopied(true);
                setCopyError(false);
              } catch {
                setCopyError(true);
              }
            }}
          >
            <ClipboardCheck size={15} />
            {copied ? "Copiado" : "Copiar texto"}
          </button>
          <p role="status">
            {copied
              ? "Mensaje copiado al portapapeles."
              : copyError
                ? "No fue posible copiar automáticamente. Selecciona el texto del mensaje y cópialo."
                : ""}
          </p>
        </section>
      )}
    </form>
  );
}
