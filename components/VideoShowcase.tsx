"use client";

import { useState } from "react";
import { Play } from "lucide-react";
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

        <div className="mt-12 grid items-start gap-8 lg:grid-cols-[minmax(0,360px)_1fr]">
          {/* MAIN portrait player */}
          <div className="relative mx-auto w-full max-w-[360px]">
            <div className="absolute -inset-4 -z-10 rounded-[40px] bg-gradient-to-br from-brand-500/30 via-brand-700/20 to-transparent blur-2xl" />
            <div className="relative aspect-[9/16] overflow-hidden rounded-[32px] border border-white/12 bg-black shadow-2xl">
              <video
                key={v.src}
                className="absolute inset-0 h-full w-full object-cover"
                src={v.src}
                poster={v.poster}
                autoPlay
                muted
                loop
                playsInline
                controls={false}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent" />
              <div className="absolute left-4 top-4 flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-500" />
                  </span>
                  REC
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <span className="rounded-full bg-brand-500/30 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand-100 backdrop-blur">{v.tag}</span>
                <p className="mt-2 font-display text-lg font-semibold text-white">{v.title}</p>
              </div>
            </div>
          </div>

          {/* thumbnail grid */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-4">
            {videos.map((vv, i) => (
              <button
                key={vv.src}
                onClick={() => setActive(i)}
                className={`group relative overflow-hidden rounded-2xl border text-left transition ${
                  i === active ? "border-brand-500/60 ring-1 ring-brand-500/50" : "border-white/10 hover:border-white/25"
                }`}
              >
                <div className="relative aspect-[9/16]">
                  <video className="absolute inset-0 h-full w-full object-cover" src={vv.src} poster={vv.poster} muted loop playsInline preload="metadata" />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg/85 via-bg/10 to-transparent" />
                  {i !== active && (
                    <span className="absolute inset-0 grid place-items-center">
                      <span className="grid h-11 w-11 place-items-center rounded-full border border-white/30 bg-black/40 text-white backdrop-blur transition group-hover:scale-110 group-hover:bg-brand-500/50">
                        <Play className="h-4 w-4 translate-x-px" />
                      </span>
                    </span>
                  )}
                  <div className="absolute inset-x-2 bottom-2">
                    <p className="text-[10px] uppercase tracking-wider text-brand-100">{vv.tag}</p>
                    <p className="text-xs font-medium leading-tight text-white">{vv.title}</p>
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
