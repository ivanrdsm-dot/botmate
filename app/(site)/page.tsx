import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import RobotCarousel from "@/components/RobotCarousel";
import Pillars from "@/components/Pillars";
import Metrics from "@/components/Metrics";
import Bento from "@/components/Bento";
import Gallery from "@/components/Gallery";
import VideoShowcase from "@/components/VideoShowcase";
import Compare from "@/components/Compare";
import Testimonials from "@/components/Testimonials";
import Process from "@/components/Process";
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
      <Pillars />
      <RobotCarousel />
      <VideoShowcase />
      <Metrics />

      <section className="pb-24">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionTitle
              eyebrow="Catálogo completo"
              title={<>Toda la <span className="gradient-text">flota</span></>}
              description="Modelos Pudu Robotics adaptados al estilo BotMate para servicio, publicidad, eventos y limpieza."
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

      <Gallery />
      <Bento />

      <section className="py-24">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionTitle
              eyebrow="Casos de éxito"
              title={<>Marcas que <span className="gradient-text">multiplicaron</span> resultados</>}
              description="Resultados verificados con Universidad Anáhuac, Red Bull, TECMA, AMDM y más."
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
                    <span className="text-brand-300">{c.industry}</span>
                    <span className="inline-flex items-center gap-1 text-white/40"><MapPin className="h-3 w-3" /> {c.city}</span>
                  </div>
                  <h3 className="mt-3 flex items-start justify-between gap-3 font-display text-lg font-semibold leading-tight">
                    {c.title}
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-white/40 transition group-hover:rotate-12 group-hover:text-brand-300" />
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
