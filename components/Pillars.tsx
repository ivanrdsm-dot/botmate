"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Megaphone, Map, Tent, Sparkles } from "lucide-react";
import SectionTitle from "./SectionTitle";
import Reveal from "./Reveal";

const pillars = [
  {
    icon: Megaphone,
    title: "Publicidad interactiva",
    desc: "Pantallas rodantes que muestran anuncios, capturan atención y promocionan productos en supermercados, plazas y stands.",
    photo: "/photos/outdoor-display.jpg",
    href: "/robots/kettybot-pro",
    clients: ["Universidad Anáhuac", "Pudu"],
  },
  {
    icon: Map,
    title: "Navegación en eventos",
    desc: "Guía a tus asistentes en convenciones y conferencias. Facilita la orientación y mejora la experiencia del usuario.",
    photo: "/photos/event-redbull.jpg",
    href: "/robots/kettybot-pro",
    clients: ["Anáhuac 5.0", "Red Bull"],
  },
  {
    icon: Tent,
    title: "Exposiciones y ferias",
    desc: "Atractivo de stand: brinda información, destaca tu marca y reparte muestras o piezas promocionales con tus productos.",
    photo: "/photos/expo-tecma.jpg",
    href: "/robots/swiftbot",
    clients: ["TECMA", "AMDM 1943"],
  },
  {
    icon: Sparkles,
    title: "Robot de limpieza",
    desc: "Mantiene espacios impecables en plazas, hoteles, hospitales y corporativos. Barre, aspira, friega y trapea de forma autónoma.",
    photo: "/photos/anahuac-service.jpg",
    href: "/robots/cc1",
    clients: ["Hoteles", "Corporativos"],
  },
];

export default function Pillars() {
  return (
    <section className="py-24">
      <div className="container-x">
        <SectionTitle
          eyebrow="Soluciones BotMate"
          title={<>El <span className="gradient-text">compañero robot</span> ideal para tu marca</>}
          description="Cuatro líneas de servicio diseñadas para que tu marca destaque, tus eventos fluyan y tus espacios brillen — siempre."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i}>
              <Link href={p.href} className="group block overflow-hidden rounded-3xl border border-white/10 bg-bg-card/60 transition hover:border-brand-500/50">
                <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[5/4]">
                  <Image
                    src={p.photo}
                    alt={p.title}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover object-center transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" />
                  <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/45 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
                    <p.icon className="h-3.5 w-3.5 text-brand-300" />
                    {p.title}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-end justify-between gap-3">
                    <div className="flex flex-wrap gap-1.5">
                      {p.clients.map((c) => (
                        <span key={c} className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-medium text-white/85 backdrop-blur">
                          {c}
                        </span>
                      ))}
                    </div>
                    <ArrowUpRight className="h-5 w-5 rounded-full bg-white/10 p-1 text-white backdrop-blur transition group-hover:rotate-12 group-hover:bg-brand-500/80" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm text-white/65">{p.desc}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
