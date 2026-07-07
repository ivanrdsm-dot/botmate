import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import { robots, categoryLabel } from "@/lib/robots";
import { waLink, site } from "@/lib/site";
import {
  Check,
  ArrowLeft,
  MessageCircle,
  Award,
  Download,
  Sparkles,
  Settings2,
  Layers,
} from "lucide-react";
import Image from "next/image";
import CTA from "@/components/CTA";
import RobotArt, { robotVariantFromSlug } from "@/components/RobotArt";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import Reveal from "@/components/Reveal";

export async function generateStaticParams() {
  return robots.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const r = robots.find((x) => x.slug === params.slug);
  if (!r) return {};
  return {
    title: `${r.name} — ${r.tagline}`,
    description: r.slogan + ". " + r.description.slice(0, 130),
    alternates: { canonical: `/robots/${r.slug}` },
    openGraph: {
      title: `${r.name} en México · ${r.tagline}`,
      description: r.description,
      url: `${site.url}/robots/${r.slug}`,
    },
    keywords: [
      `${r.name} México`,
      `${r.name} precio`,
      `${r.name} renta`,
      `${r.name} venta`,
      r.model ?? r.name,
      ...r.useCases.map((u) => `${r.name} ${u.toLowerCase()}`),
    ],
  };
}

export default function RobotDetail({ params }: { params: { slug: string } }) {
  const r = robots.find((x) => x.slug === params.slug);
  if (!r) notFound();

  const ld = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: r.name,
    description: r.description,
    brand: { "@type": "Brand", name: r.brand },
    category: categoryLabel[r.category],
    model: r.model,
    offers: {
      "@type": "Offer",
      priceCurrency: "MXN",
      availability: "https://schema.org/InStock",
      url: `${site.url}/robots/${r.slug}`,
      seller: { "@type": "Organization", name: site.name },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "127",
    },
  };

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Inicio", url: "/" },
          { name: "Robots", url: "/robots" },
          { name: r.name, url: `/robots/${r.slug}` },
        ]}
      />

      {/* HERO estilo Pudu */}
      <section className="relative isolate overflow-hidden pt-28">
        <div className="absolute inset-0 -z-10 grid-bg opacity-50" />
        <div className="absolute -top-32 left-1/2 -z-10 h-[600px] w-[1100px] -translate-x-1/2 rounded-full bg-brand-700/30 blur-3xl" />
        <div className="container-x">
          <Link href="/robots" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white">
            <ArrowLeft className="h-4 w-4" /> Volver al catálogo
          </Link>

          <div className="mt-10 grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="chip">{categoryLabel[r.category]}</span>
                <span className="chip">{r.brand}</span>
                {r.badge && (
                  <span className="rounded-full bg-gradient-to-r from-brand-500 to-brand-400 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                    {r.badge}
                  </span>
                )}
              </div>

              <h1 className="mt-6 font-display text-[clamp(2.25rem,5vw,4.5rem)] font-bold leading-[1.05] tracking-tight">
                {r.name}
              </h1>
              <p className="mt-3 font-display text-xl text-brand-300 sm:text-2xl">{r.tagline}</p>
              <p className="mt-4 text-base text-white/65 sm:text-lg">{r.slogan}</p>
              <p className="mt-6 max-w-xl text-white/70 leading-relaxed">{r.description}</p>

              {r.awards && (
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {r.awards.map((a) => (
                    <div key={a} className="flex items-start gap-2 rounded-2xl border border-white/10 bg-bg-card/60 p-3 text-xs text-white/80">
                      <Award className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" /> {a}
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contacto" className="btn-primary">Solicitar cotización</Link>
                <a
                  href={waLink(`Hola, me interesa el ${r.name}. ¿Pueden enviarme cotización?`)}
                  target="_blank"
                  rel="noopener"
                  className="btn-ghost"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </a>
                <a
                  href={waLink(`Hola, me gustaría recibir el datasheet del ${r.name}.`)}
                  target="_blank"
                  rel="noopener"
                  className="btn-ghost"
                >
                  <Download className="h-4 w-4" /> Datasheet
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-8 -z-10 rounded-[40px] bg-gradient-to-br from-brand-500/30 via-brand-700/20 to-transparent blur-3xl" />
              <div className="relative mx-auto grid aspect-[3/4] w-full max-w-[460px] place-items-center overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-br from-[#10162E] to-[#05070F]">
                {r.image ? (
                  <Image
                    src={r.image}
                    alt={`${r.name} — ${r.brand}`}
                    fill
                    priority
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="object-cover"
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 grid-bg opacity-40" />
                    <RobotArt variant={robotVariantFromSlug(r.slug)} className="relative h-3/4 w-3/4 animate-float" />
                  </>
                )}
                <div className="absolute left-4 right-4 top-4 z-10 flex items-center justify-between text-[10px] uppercase tracking-widest text-white/45">
                  <span>{r.model ?? r.name}</span>
                  <span className="text-emerald-400">● Disponible</span>
                </div>
                {r.modes && (
                  <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-wrap gap-1.5">
                    {r.modes.map((m) => (
                      <span key={m} className="rounded-full border border-white/10 bg-bg/65 px-2.5 py-1 text-[10px] font-medium text-white/85 backdrop-blur">
                        {m}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS RIBBON */}
      <section className="mt-16 border-y border-white/10 bg-bg-soft/60 py-10">
        <div className="container-x">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {r.highlights.slice(0, 4).map((h) => (
              <div key={h} className="flex items-start gap-3">
                <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-500/15 text-brand-300">
                  <Sparkles className="h-3.5 w-3.5" />
                </span>
                <p className="text-sm text-white/85">{h}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KEY FEATURES estilo Pudu */}
      <section className="py-20">
        <div className="container-x">
          <div className="max-w-3xl">
            <span className="chip"><Layers className="h-3.5 w-3.5 text-brand-300" /> Características destacadas</span>
            <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
              Por qué <span className="gradient-text">{r.name}</span> es la elección correcta
            </h2>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {r.keyFeatures.map((kf, i) => (
              <Reveal key={kf.title} delay={i}>
                <div className="card-tech h-full">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500/30 to-brand-700/30 ring-1 ring-white/10">
                    <span className="font-display text-lg font-bold gradient-text">0{i + 1}</span>
                  </div>
                  <h3 className="font-display text-xl font-semibold">{kf.title}</h3>
                  <p className="mt-2 text-white/70 leading-relaxed">{kf.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SPECS TABLE estilo Pudu */}
      <section className="py-20">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <span className="chip"><Settings2 className="h-3.5 w-3.5 text-brand-300" /> Hoja de especificaciones</span>
              <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
                <span className="gradient-text">Datos técnicos</span> oficiales
              </h2>
              <p className="mt-4 text-white/70">
                Especificaciones autorizadas por Pudu Robotics. ¿Necesitas el datasheet en PDF? Solicítalo a tu asesor BotMate por WhatsApp.
              </p>
              <a
                href={waLink(`Hola, ¿me podrían enviar el datasheet PDF oficial del ${r.name}?`)}
                target="_blank"
                rel="noopener"
                className="btn-primary mt-6"
              >
                <Download className="h-4 w-4" /> Solicitar PDF
              </a>
            </div>

            <div className="overflow-hidden rounded-3xl border border-white/10 bg-bg-card/40">
              <div className="grid grid-cols-2">
                {r.specs.map((s, i) => (
                  <div
                    key={s.label}
                    className={`border-white/5 px-5 py-4 ${i % 2 === 0 ? "border-r" : ""} ${i >= 2 ? "border-t" : ""}`}
                  >
                    <p className="text-xs uppercase tracking-wider text-white/50">{s.label}</p>
                    <p className="mt-1 font-display text-base font-semibold text-white">{s.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SCENARIOS estilo Pudu */}
      <section className="py-20">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <span className="chip">Escenarios de aplicación</span>
              <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
                ¿Dónde brilla <span className="gradient-text">{r.name}</span>?
              </h2>
            </div>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            {r.useCases.map((u) => (
              <div key={u} className="rounded-2xl border border-white/10 bg-bg-card/60 px-5 py-3 text-sm font-medium text-white/85 transition hover:border-brand-500/50 hover:text-white">
                {u}
              </div>
            ))}
          </div>

          {r.modes && (
            <div className="mt-12">
              <p className="text-sm uppercase tracking-wider text-white/50">Modos disponibles</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {r.modes.map((m) => (
                  <span key={m} className="rounded-full bg-brand-500/10 px-3 py-1 text-xs font-medium text-brand-200">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* TODOS LOS HIGHLIGHTS */}
      <section className="py-20">
        <div className="container-x">
          <div className="rounded-3xl border border-white/10 bg-bg-card/40 p-8 sm:p-12">
            <h2 className="font-display text-2xl font-bold sm:text-3xl">
              Resumen <span className="gradient-text">{r.name}</span>
            </h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {r.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3 text-sm text-white/85">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-500/20 text-brand-300">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CTA
        title={`Lleva ${r.name} a tu operación`}
        subtitle="Solicita una demo presencial o virtual y compruébalo en acción con un asesor BotMate."
      />

      <Script
        id={`ld-${r.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
    </>
  );
}
