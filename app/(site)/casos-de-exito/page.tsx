import type { Metadata } from "next";
import Link from "next/link";
import SectionTitle from "@/components/SectionTitle";
import CTA from "@/components/CTA";
import TiltCard from "@/components/TiltCard";
import Reveal from "@/components/Reveal";
import { cases } from "@/lib/cases";
import { ArrowUpRight, MapPin } from "lucide-react";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Casos de éxito — Empresas mexicanas que escalaron con BotMate",
  description:
    "Casos reales de restaurantes, hoteles, hospitales, plazas comerciales, CEDIS y corporativos en México que aumentaron productividad y redujeron costos con robots Pudu Robotics implementados por BotMate.",
  alternates: { canonical: "/casos-de-exito" },
  keywords: [
    "casos de éxito robots México",
    "ROI robots restaurantes",
    "robot hotelero caso real",
    "automatización hospital México",
    "T600 CEDIS caso",
  ],
};

export default function CasosPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Inicio", url: "/" }, { name: "Casos de éxito", url: "/casos-de-exito" }]} />
      <section className="pt-32">
        <div className="container-x">
          <SectionTitle
            eyebrow="Casos de éxito"
            title={<>Resultados que se <span className="gradient-text">miden</span></>}
            description="Implementaciones reales de BotMate en distintos sectores. KPIs verificados, plazos cumplidos y clientes que repiten."
          />
        </div>
      </section>

      <section className="py-12">
        <div className="container-x grid gap-6 lg:grid-cols-2">
          {cases.map((c, i) => (
            <Reveal key={c.slug} delay={i}>
              <TiltCard className="rounded-3xl" max={5}>
                <Link href={`/casos-de-exito/${c.slug}`} className="card-tech group flex h-full flex-col">
                  <div className="relative mb-5 grid aspect-[16/9] place-items-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#0B1020] to-[#070A14]">
                    <div className="absolute inset-0 grid-bg opacity-40" />
                    <CaseHero variant={c.hero} />
                    <span className="absolute left-3 top-3 rounded-full bg-gradient-to-r from-accent to-accent-violet px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                      {c.industry}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-accent">{c.client}</span>
                    <span className="inline-flex items-center gap-1 text-white/40"><MapPin className="h-3 w-3" /> {c.city}</span>
                  </div>

                  <h3 className="mt-3 flex items-start justify-between gap-3 font-display text-xl font-semibold leading-tight">
                    {c.title}
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-white/40 transition group-hover:rotate-12 group-hover:text-accent" />
                  </h3>
                  <p className="mt-2 text-sm text-white/60">{c.summary}</p>

                  <div className="mt-5 grid grid-cols-2 gap-3 border-t border-white/5 pt-5">
                    {c.results.slice(0, 4).map((r) => (
                      <div key={r.label}>
                        <p className="font-display text-xl font-bold gradient-text">{r.value}</p>
                        <p className="text-[11px] uppercase tracking-wider text-white/50">{r.label}</p>
                      </div>
                    ))}
                  </div>
                </Link>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      <CTA title="¿Listo para escribir tu caso de éxito?" subtitle="Te conectamos con un cliente actual de tu industria para que platiquen sin filtros." />
    </>
  );
}

function CaseHero({ variant }: { variant: string }) {
  const map: Record<string, string> = {
    restaurant: "🍽️",
    hotel: "🏨",
    hospital: "🏥",
    retail: "🛍️",
    logistics: "📦",
    corporate: "🏢",
  };
  return (
    <div className="relative">
      <div className="absolute -inset-12 -z-10 rounded-full bg-gradient-to-br from-accent/30 to-accent-violet/30 blur-2xl" />
      <span className="text-7xl" aria-hidden>{map[variant] ?? "🤖"}</span>
    </div>
  );
}
