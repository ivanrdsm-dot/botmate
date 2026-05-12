"use client";

import { useState } from "react";
import { Mail, ArrowRight, Check } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setDone(true);
    // En producción: POST a /api/subscribe o servicio (Resend, Mailchimp, ConvertKit)
  };

  return (
    <section className="py-24">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-bg-card/60 p-10 sm:p-16">
          <div className="pointer-events-none absolute -left-10 top-0 h-72 w-72 rounded-full bg-accent-violet/30 blur-3xl" />
          <div className="pointer-events-none absolute -right-10 bottom-0 h-72 w-72 rounded-full bg-accent/30 blur-3xl" />
          <div className="relative mx-auto max-w-2xl text-center">
            <span className="chip mx-auto">
              <Mail className="h-3.5 w-3.5 text-accent" /> Newsletter mensual
            </span>
            <h2 className="mt-5 font-display text-3xl font-bold leading-tight sm:text-4xl">
              Tendencias de <span className="gradient-text">robótica de servicio</span> en tu correo
            </h2>
            <p className="mt-4 text-white/70">
              Casos reales, guías de ROI y novedades del mercado mexicano. Una vez al mes, sin spam.
            </p>
            <form onSubmit={onSubmit} className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
              {done ? (
                <div className="flex w-full items-center justify-center gap-2 rounded-full bg-emerald-500/20 px-6 py-3 text-sm font-semibold text-emerald-300">
                  <Check className="h-4 w-4" /> ¡Listo! Te llegará el siguiente número.
                </div>
              ) : (
                <>
                  <input
                    type="email"
                    required
                    placeholder="tu@correo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white placeholder:text-white/35 outline-none focus:border-accent/60"
                  />
                  <button type="submit" className="btn-primary">
                    Suscribirme <ArrowRight className="h-4 w-4" />
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
