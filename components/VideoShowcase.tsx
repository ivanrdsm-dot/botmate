"use client";

import { useState } from "react";
import SectionTitle from "./SectionTitle";

const videos = [
  { src: "/videos/robot-service.mp4", poster: "/videos/robot-service-poster.jpg", title: "Servicio en restaurante", tag: "Hospitalidad" },
  { src: "/videos/robot-display.mp4", poster: "/videos/robot-display-poster.jpg", title: "Activación en retail", tag: "Publicidad" },
  { src: "/videos/robot-showcase.mp4", poster: "/videos/robot-showcase-poster.jpg", title: "Convención · Ferias", tag: "Eventos" },
  { src: "/videos/robot-event-loop.mp4", poster: "/videos/robot-event-loop-poster.jpg", title: "Limpieza autónoma", tag: "Limpieza" },
];

export default function VideoShowcase() {
  const [active, setActive] = useState(0);
  const v = videos[active];
  return (
    <section className="py-24">
      <div className="container-x">
        <SectionTitle
          eyebrow="BotMate en video"
          title={<>Míralo <span className="gradient-text">en acción</span></>}
          description="Clips reales de despliegues BotMate en restaurantes, eventos, retail y limpieza."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-bg-card">
            <video
              key={v.src}
              className="aspect-video w-full object-cover"
              src={v.src}
              poster={v.poster}
              autoPlay
              muted
              loop
              playsInline
              controls={false}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
              <div>
                <span className="rounded-full bg-brand-500/30 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand-100 backdrop-blur">{v.tag}</span>
                <p className="mt-2 font-display text-lg font-semibold text-white">{v.title}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
            {videos.map((vv, i) => (
              <button
                key={vv.src}
                onClick={() => setActive(i)}
                className={`group relative overflow-hidden rounded-2xl border text-left transition ${
                  i === active ? "border-brand-500/60 ring-1 ring-brand-500/50" : "border-white/10 hover:border-white/25"
                }`}
              >
                <div className="relative aspect-video">
                  <video className="absolute inset-0 h-full w-full object-cover" src={vv.src} poster={vv.poster} muted loop playsInline preload="metadata" />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2">
                    <p className="text-[10px] uppercase tracking-wider text-brand-100">{vv.tag}</p>
                    <p className="text-sm font-medium text-white">{vv.title}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
