"use client";

import { clients } from "@/lib/testimonials";

export default function Marquee() {
  const list = [...clients, ...clients];
  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-bg-soft/60 py-8">
      <div className="container-x mb-4 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.3em] text-white/50">
        <span className="h-px w-12 bg-white/20" />
        Empresas que confían en BotMate
        <span className="h-px w-12 bg-white/20" />
      </div>
      <div className="relative">
        <div
          className="flex w-max gap-12 whitespace-nowrap"
          style={{ animation: "marquee 38s linear infinite" }}
        >
          {list.map((c, i) => (
            <div
              key={i}
              className="flex h-10 items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-5 font-display text-sm font-semibold uppercase tracking-wider text-white/60"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-accent to-accent-violet" />
              {c}
            </div>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-bg-soft to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-bg-soft to-transparent" />
      </div>
      <style jsx>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
