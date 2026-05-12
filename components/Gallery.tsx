"use client";

import Image from "next/image";
import { useState } from "react";
import { X, ArrowLeft, ArrowRight, Camera } from "lucide-react";
import SectionTitle from "./SectionTitle";
import Reveal from "./Reveal";

const gallery: { src: string; caption: string; tag: string; ratio: string }[] = [
  { src: "/photos/booth-banner.jpg", caption: "Stand BotMate · Los 4 servicios", tag: "Showroom", ratio: "aspect-[4/5]" },
  { src: "/photos/event-redbull.jpg", caption: "Robot de servicio · Anáhuac Labs", tag: "Eventos", ratio: "aspect-[3/4]" },
  { src: "/photos/anahuac-service.jpg", caption: "Servicio en Anáhuac 5.0", tag: "Bebidas", ratio: "aspect-[3/4]" },
  { src: "/photos/outdoor-display.jpg", caption: "Publicidad interactiva exterior", tag: "Publicidad", ratio: "aspect-[3/4]" },
  { src: "/photos/expo-tecma.jpg", caption: "Activación TECMA · AMDM 1943", tag: "Ferias", ratio: "aspect-[3/4]" },
];

export default function Gallery() {
  const [open, setOpen] = useState<number | null>(null);

  const close = () => setOpen(null);
  const prev = () => setOpen((i) => (i === null ? null : (i + gallery.length - 1) % gallery.length));
  const next = () => setOpen((i) => (i === null ? null : (i + 1) % gallery.length));

  return (
    <section className="py-24">
      <div className="container-x">
        <SectionTitle
          eyebrow="Galería · BotMate en acción"
          title={<>Activaciones <span className="gradient-text">reales</span> con clientes</>}
          description="Fotos de implementaciones BotMate con Universidad Anáhuac, Red Bull, Peñafiel, TECMA, AMDM y otros clientes."
        />

        <div className="mt-12 grid gap-4 md:grid-cols-4">
          <Reveal className="md:col-span-2 md:row-span-2">
            <button onClick={() => setOpen(0)} className="group relative block aspect-[4/5] h-full w-full overflow-hidden rounded-3xl border border-white/10 bg-bg-card md:aspect-auto">
              <Image src={gallery[0].src} alt={gallery[0].caption} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                <div>
                  <p className="rounded-full bg-brand-500/30 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand-100 inline-block">{gallery[0].tag}</p>
                  <p className="mt-2 font-display text-lg font-semibold text-white">{gallery[0].caption}</p>
                </div>
                <Camera className="h-5 w-5 rounded-full bg-white/10 p-1 text-white backdrop-blur" />
              </div>
            </button>
          </Reveal>

          {gallery.slice(1).map((g, idx) => (
            <Reveal key={g.src} delay={idx + 1}>
              <button onClick={() => setOpen(idx + 1)} className={`group relative block ${g.ratio} w-full overflow-hidden rounded-3xl border border-white/10 bg-bg-card`}>
                <Image src={g.src} alt={g.caption} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="rounded-full bg-brand-500/30 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-brand-100 inline-block">{g.tag}</p>
                  <p className="mt-1.5 text-xs font-medium text-white">{g.caption}</p>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {open !== null && (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-black/85 p-4 backdrop-blur" onClick={close}>
          <button onClick={close} className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"><X className="h-5 w-5" /></button>
          <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"><ArrowLeft className="h-5 w-5" /></button>
          <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"><ArrowRight className="h-5 w-5" /></button>
          <div onClick={(e) => e.stopPropagation()} className="relative max-h-[90vh] max-w-5xl">
            <Image src={gallery[open].src} alt={gallery[open].caption} width={1600} height={2000} className="max-h-[90vh] w-auto rounded-2xl object-contain" />
            <p className="mt-3 text-center text-sm text-white/80">{gallery[open].caption}</p>
          </div>
        </div>
      )}
    </section>
  );
}
