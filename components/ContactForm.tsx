"use client";

import { useState } from "react";
import { site, waLink } from "@/lib/site";
import { Send } from "lucide-react";

export default function ContactForm() {
  const [state, setState] = useState({
    nombre: "",
    empresa: "",
    email: "",
    telefono: "",
    interes: "Renta",
    mensaje: "",
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = [
      `Hola BotMate, soy ${state.nombre}${state.empresa ? ` de ${state.empresa}` : ""}.`,
      `Estoy interesado en: ${state.interes}.`,
      state.mensaje && `Detalles: ${state.mensaje}`,
      `Email: ${state.email}`,
      state.telefono && `Tel: ${state.telefono}`,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(waLink(text), "_blank");
  };

  return (
    <form onSubmit={onSubmit} className="card-tech space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Nombre" required>
          <input
            required
            value={state.nombre}
            onChange={(e) => setState({ ...state, nombre: e.target.value })}
            className="input"
            placeholder="Tu nombre"
          />
        </Field>
        <Field label="Empresa">
          <input
            value={state.empresa}
            onChange={(e) => setState({ ...state, empresa: e.target.value })}
            className="input"
            placeholder="Tu empresa"
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Email" required>
          <input
            type="email"
            required
            value={state.email}
            onChange={(e) => setState({ ...state, email: e.target.value })}
            className="input"
            placeholder="tu@correo.com"
          />
        </Field>
        <Field label="Teléfono">
          <input
            type="tel"
            value={state.telefono}
            onChange={(e) => setState({ ...state, telefono: e.target.value })}
            className="input"
            placeholder="55 0000 0000"
          />
        </Field>
      </div>

      <Field label="Interés">
        <select
          value={state.interes}
          onChange={(e) => setState({ ...state, interes: e.target.value })}
          className="input"
        >
          <option>Renta</option>
          <option>Venta</option>
          <option>Refacciones / Mantenimiento</option>
          <option>Demo</option>
          <option>Otro</option>
        </select>
      </Field>

      <Field label="Cuéntanos de tu operación">
        <textarea
          rows={4}
          value={state.mensaje}
          onChange={(e) => setState({ ...state, mensaje: e.target.value })}
          className="input"
          placeholder="¿Qué sector? ¿Cuántos robots? ¿Cuándo lo necesitas?"
        />
      </Field>

      <button type="submit" className="btn-primary w-full">
        <Send className="h-4 w-4" /> Enviar y abrir WhatsApp
      </button>

      <p className="text-center text-xs text-white/50">
        O escríbenos a <a href={`mailto:${site.email}`} className="text-accent">{site.email}</a>
      </p>

      <style jsx>{`
        :global(.input) {
          width: 100%;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: white;
          border-radius: 12px;
          padding: 12px 14px;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
        }
        :global(.input:focus) {
          border-color: rgba(34, 211, 238, 0.6);
          background: rgba(34, 211, 238, 0.05);
        }
        :global(.input::placeholder) { color: rgba(255,255,255,0.35); }
      `}</style>
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs uppercase tracking-wider text-white/60">
        {label} {required && <span className="text-accent">*</span>}
      </span>
      {children}
    </label>
  );
}
