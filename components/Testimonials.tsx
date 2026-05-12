"use client";

import { useEffect, useState } from "react";
import { Quote, Star } from "lucide-react";
import { testimonials } from "@/lib/testimonials";
import SectionTitle from "./SectionTitle";

export default function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % testimonials.length), 6000);
    return () => clearInterval(id);
  }, []);
  const t = testimonials[i];

  return (
    <section className="py-24">
      <div className="container-x">
        <SectionTitle
          eyebrow="Lo que dicen"
          title={<>Clientes que <span className="gradient-text">recomiendan</span> BotMate</>}
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-bg-card/60 p-8 sm:p-10">
            <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-accent/15 blur-3xl" />
            <Quote className="h-10 w-10 text-accent/60" />
            <p key={i} className="mt-6 font-display text-2xl leading-snug text-white sm:text-3xl animate-[fadeIn_0.6s_ease]">
              &ldquo;{t.text}&rdquo;
            </p>
            <div className="mt-8 flex items-center justify-between">
              <div>
                <p className="font-semibold">{t.author}</p>
                <p className="text-sm text-white/60">{t.role} · {t.company}</p>
              </div>
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-amber-300 text-amber-300" />
                ))}
              </div>
            </div>
            <div className="mt-6 flex gap-2">
              {testimonials.map((_, j) => (
                <button
                  key={j}
                  onClick={() => setI(j)}
                  aria-label={`Testimonio ${j + 1}`}
                  className={`h-1.5 rounded-full transition-all ${j === i ? "w-8 bg-accent" : "w-1.5 bg-white/20"}`}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {testimonials.slice(0, 4).map((t2, j) => (
              <button
                key={j}
                onClick={() => setI(j)}
                className={`group rounded-2xl border p-4 text-left transition ${
                  j === i ? "border-accent/50 bg-accent/5" : "border-white/10 bg-bg-card/40 hover:border-white/25"
                }`}
              >
                <div className="flex gap-1">
                  {Array.from({ length: t2.rating }).map((_, k) => (
                    <Star key={k} className="h-3 w-3 fill-amber-300 text-amber-300" />
                  ))}
                </div>
                <p className="mt-2 line-clamp-3 text-sm text-white/70">&ldquo;{t2.text}&rdquo;</p>
                <p className="mt-3 text-xs font-semibold text-white">{t2.author}</p>
                <p className="text-[11px] text-white/50">{t2.company}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
