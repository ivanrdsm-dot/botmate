import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Metrics from "@/components/Metrics";
import Bento from "@/components/Bento";
import Sectors from "@/components/Sectors";
import Process from "@/components/Process";
import Compare from "@/components/Compare";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import Newsletter from "@/components/Newsletter";
import RobotCard from "@/components/RobotCard";
import SectionTitle from "@/components/SectionTitle";
import Reveal from "@/components/Reveal";
import { robots } from "@/lib/robots";
import { cases } from "@/lib/cases";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";

export default function HomePage() {
  const featured = ["bellabot-pro", "kettybot-pro", "swiftbot", "cc1", "flashbot", "t600"];
  const featuredRobots = robots.filter((r) => featured.includes(r.slug));
  const featuredCases = cases.slice(0, 3);

  return (
    <>
      <Hero />
      <Marquee />
      <Metrics />

      <section className="py-24">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionTitle
              eyebrow="Catálogo"
              title={<>Robots <span className="gradient-text">destacados</span></>}
              description="Modelos de servicio, limpieza y carga con la mejor tecnología Pudu Robotics, disponibles en renta o venta en México."
            />
            <Link href="/robots" className="btn-ghost">
              Ver todos <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredRobots.map((r, i) => (
              <Reveal key={r.slug} delay={i}>
                <RobotCard robot={r} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Bento />
      <Sectors />

      <section className="py-24">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionTitle
              eyebrow="Casos de éxito"
              title={<>Empresas que <span className="gradient-text">multiplicaron resultados</span></>}
              description="Resultados verificados en restaurantes, hoteles, hospitales, plazas, logística y corporativos."
            />
            <Link href="/casos-de-exito" className="btn-ghost">
              Todos los casos <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {featuredCases.map((c, i) => (
              <Reveal key={c.slug} delay={i}>
                <Link href={`/casos-de-exito/${c.slug}`} className="card-tech group flex h-full flex-col">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-accent">{c.industry}</span>
                    <span className="inline-flex items-center gap-1 text-white/40"><MapPin className="h-3 w-3" /> {c.city}</span>
                  </div>
                  <h3 className="mt-3 flex items-start justify-between gap-3 font-display text-lg font-semibold leading-tight">
                    {c.title}
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-white/40 transition group-hover:rotate-12 group-hover:text-accent" />
                  </h3>
                  <div className="mt-5 grid grid-cols-2 gap-3 border-t border-white/5 pt-5">
                    {c.results.slice(0, 2).map((r) => (
                      <div key={r.label}>
                        <p className="font-display text-2xl font-bold gradient-text">{r.value}</p>
                        <p className="text-[10px] uppercase tracking-wider text-white/50">{r.label}</p>
                      </div>
                    ))}
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Compare />
      <Testimonials />
      <Process />
      <FAQ />
      <Newsletter />
      <CTA />
    </>
  );
}
