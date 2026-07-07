import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import { cases } from "@/lib/cases";
import { site } from "@/lib/site";
import { ArrowLeft, MapPin, Calendar, Boxes, Quote } from "lucide-react";
import CTA from "@/components/CTA";
import ScrollProgress from "@/components/ScrollProgress";
import Reveal from "@/components/Reveal";

export async function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const c = cases.find((x) => x.slug === params.slug);
  if (!c) return {};
  return {
    title: `${c.title} — Caso BotMate`,
    description: c.summary,
    alternates: { canonical: `/casos-de-exito/${c.slug}` },
    openGraph: {
      title: c.title,
      description: c.summary,
      url: `${site.url}/casos-de-exito/${c.slug}`,
      type: "article",
    },
  };
}

export default function CasoPage({ params }: { params: { slug: string } }) {
  const c = cases.find((x) => x.slug === params.slug);
  if (!c) notFound();

  const ld = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: c.title,
    description: c.summary,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name, logo: { "@type": "ImageObject", url: `${site.url}/logo.svg` } },
    mainEntityOfPage: `${site.url}/casos-de-exito/${c.slug}`,
  };

  return (
    <>
      <ScrollProgress />
      <article>
        <header className="relative isolate overflow-hidden pt-32">
          <div className="absolute inset-0 -z-10 grid-bg opacity-50" />
          <div className="absolute -top-32 left-1/2 -z-10 h-[600px] w-[1100px] -translate-x-1/2 rounded-full bg-accent-violet/20 blur-3xl" />
          <div className="container-x">
            <Link href="/casos-de-exito" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white">
              <ArrowLeft className="h-4 w-4" /> Volver a casos
            </Link>
            <div className="mt-8 flex flex-wrap items-center gap-2 text-xs">
              <span className="chip">{c.industry}</span>
              <span className="chip"><MapPin className="h-3 w-3" /> {c.city}</span>
              <span className="chip"><Calendar className="h-3 w-3" /> {c.timeline}</span>
              <span className="chip"><Boxes className="h-3 w-3" /> {c.scope}</span>
            </div>
            <h1 className="mt-6 max-w-4xl font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              {c.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg text-white/70">{c.summary}</p>
          </div>
        </header>

        <section className="py-16">
          <div className="container-x">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {c.results.map((r) => (
                <Reveal key={r.label}>
                  <div className="card-tech">
                    <p className="font-display text-4xl font-bold gradient-text">{r.value}</p>
                    <p className="mt-2 text-sm font-medium text-white">{r.label}</p>
                    {r.sub && <p className="mt-1 text-xs text-white/50">{r.sub}</p>}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container-x grid gap-10 lg:grid-cols-2">
            <Reveal>
              <h2 className="font-display text-3xl font-bold">El reto</h2>
              <p className="mt-4 text-white/75 leading-relaxed">{c.challenge}</p>
            </Reveal>
            <Reveal delay={1}>
              <h2 className="font-display text-3xl font-bold">La solución</h2>
              <p className="mt-4 text-white/75 leading-relaxed">{c.solution}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {c.robots.map((r) => (
                  <span key={r} className="chip">{r}</span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="py-16">
          <div className="container-x">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-bg-card/60 p-10 sm:p-14">
              <div className="absolute -right-10 -top-10 h-60 w-60 rounded-full bg-accent/20 blur-3xl" />
              <Quote className="h-12 w-12 text-accent/50" />
              <p className="mt-6 font-display text-2xl leading-snug sm:text-3xl">&ldquo;{c.quote.text}&rdquo;</p>
              <div className="mt-8 flex items-center gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-accent/30 to-accent-violet/30 font-semibold">
                  {c.quote.author.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold">{c.quote.author}</p>
                  <p className="text-sm text-white/60">{c.quote.role} · {c.client}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </article>

      <CTA title={`¿Tu industria es similar a ${c.client}?`} subtitle="Diseñamos una propuesta de automatización a la medida de tu operación." />

      <Script id={`ld-case-${c.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
