import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SectionTitle from "@/components/SectionTitle";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import Newsletter from "@/components/Newsletter";
import { posts } from "@/lib/posts";
import { getPostCover } from "@/lib/media";
import { ArrowUpRight, Clock, Calendar } from "lucide-react";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Blog BotMate — Robótica de servicio, ROI y guías en México",
  description:
    "Guías, comparativas y análisis de ROI sobre robots de servicio BotMate en México. BotMate Serve vs BotMate Ads, implementación en restaurantes, Plan México, limpieza autónoma y más.",
  alternates: { canonical: "/blog" },
  keywords: [
    "blog robótica México",
    "comparativa BotMate Serve BotMate Ads",
    "ROI robots restaurantes",
    "guía implementación robot",
    "Plan México robots deducción",
  ],
};

export default function BlogPage() {
  const featured = posts[0];
  const rest = posts.slice(1);
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Inicio", url: "/" }, { name: "Blog", url: "/blog" }]} />
      <section className="pt-32">
        <div className="container-x">
          <SectionTitle
            eyebrow="Blog · Insights de robótica"
            title={<>Aprende cómo <span className="gradient-text">escalar con robots</span></>}
            description="Análisis, guías y comparativas de los expertos en robótica de servicio en México."
          />
        </div>
      </section>

      <section className="py-12">
        <div className="container-x">
          <Reveal>
            <Link href={`/blog/${featured.slug}`} className="group block overflow-hidden rounded-3xl border border-white/10 bg-bg-card/60">
              <div className="grid gap-0 lg:grid-cols-2">
                <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-[#10162E] to-[#070A14]">
                  <Image
                    src={getPostCover(featured.cover).src}
                    alt={getPostCover(featured.cover).alt}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.03]"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/50 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur">
                    Destacado
                  </span>
                </div>
                <div className="flex flex-col justify-center p-8 sm:p-10">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-white/50">
                    <span className="text-accent">{featured.category}</span>
                    <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {featured.readMin} min</span>
                    <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" /> {fmt(featured.date)}</span>
                  </div>
                  <h2 className="mt-3 font-display text-2xl font-bold leading-tight sm:text-3xl">
                    {featured.title}
                  </h2>
                  <p className="mt-3 text-white/65">{featured.excerpt}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent group-hover:gap-3 transition-all">
                    Leer artículo <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="py-12">
        <div className="container-x grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, i) => (
            <Reveal key={p.slug} delay={i}>
              <TiltCard className="rounded-3xl" max={4}>
                <Link href={`/blog/${p.slug}`} className="card-tech group flex h-full flex-col">
                  <div className="relative mb-5 aspect-[16/10] overflow-hidden rounded-2xl bg-gradient-to-br from-[#10162E] to-[#070A14]">
                    <Image
                      src={getPostCover(p.cover).src}
                      alt={getPostCover(p.cover).alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, 50vw"
                      className="object-cover transition duration-700 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg/60 via-transparent to-transparent" />
                  </div>
                  <div className="flex items-center gap-3 text-xs text-white/50">
                    <span className="text-accent">{p.category}</span>
                    <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {p.readMin} min</span>
                  </div>
                  <h3 className="mt-2 line-clamp-2 font-display text-lg font-semibold leading-tight">
                    {p.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm text-white/60">{p.excerpt}</p>
                  <span className="mt-auto pt-4 text-xs text-white/40">{fmt(p.date)}</span>
                </Link>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      <Newsletter />
    </>
  );
}

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString("es-MX", { year: "numeric", month: "long", day: "numeric" });
}

