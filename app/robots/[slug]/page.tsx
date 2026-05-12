import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import { robots, categoryLabel } from "@/lib/robots";
import { waLink, site } from "@/lib/site";
import { Check, ArrowLeft, MessageCircle } from "lucide-react";
import CTA from "@/components/CTA";
import RobotArt, { robotVariantFromSlug } from "@/components/RobotArt";

export async function generateStaticParams() {
  return robots.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const r = robots.find((x) => x.slug === params.slug);
  if (!r) return {};
  return {
    title: `${r.name} — ${r.tagline}`,
    description: r.description,
    alternates: { canonical: `/robots/${r.slug}` },
    openGraph: {
      title: `${r.name} en México · ${r.tagline}`,
      description: r.description,
      url: `${site.url}/robots/${r.slug}`,
    },
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
    offers: {
      "@type": "Offer",
      priceCurrency: "MXN",
      availability: "https://schema.org/InStock",
      url: `${site.url}/robots/${r.slug}`,
      seller: { "@type": "Organization", name: site.name },
    },
  };

  return (
    <>
      <section className="pt-32">
        <div className="container-x">
          <Link href="/robots" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white">
            <ArrowLeft className="h-4 w-4" /> Volver al catálogo
          </Link>

          <div className="mt-8 grid items-start gap-12 lg:grid-cols-2">
            <div className="relative">
              <div className="absolute -inset-6 -z-10 rounded-[40px] bg-gradient-to-br from-accent-violet/20 via-transparent to-accent/20 blur-3xl" />
              <div className="relative grid aspect-square place-items-center overflow-hidden rounded-3xl border border-white/10 bg-bg-card/60 p-8">
                <div className="absolute inset-0 grid-bg opacity-40" />
                <RobotArt variant={robotVariantFromSlug(r.slug)} className="relative h-3/4 w-3/4 animate-float" />
              </div>
            </div>

            <div>
              <span className="chip">{categoryLabel[r.category]} · {r.brand}</span>
              <h1 className="mt-4 font-display text-4xl font-bold sm:text-5xl">{r.name}</h1>
              <p className="mt-2 text-lg text-accent">{r.tagline}</p>
              <p className="mt-6 text-white/70">{r.description}</p>

              <ul className="mt-8 space-y-3">
                {r.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 text-sm text-white/80">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    {h}
                  </li>
                ))}
              </ul>

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
              </div>
            </div>
          </div>

          <div className="mt-16 grid gap-6 lg:grid-cols-2">
            <div className="card-tech">
              <h3 className="font-display text-xl font-semibold">Especificaciones</h3>
              <dl className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {r.specs.map((s) => (
                  <div key={s.label} className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                    <dt className="text-xs uppercase tracking-wider text-white/50">{s.label}</dt>
                    <dd className="mt-1 font-display text-lg text-white">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="card-tech">
              <h3 className="font-display text-xl font-semibold">Casos de uso</h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {r.useCases.map((u) => (
                  <span key={u} className="chip">{u}</span>
                ))}
              </div>
              <div className="mt-8 rounded-2xl border border-accent/20 bg-accent/5 p-5">
                <p className="font-display text-sm font-semibold text-accent">Disponible en renta o venta</p>
                <p className="mt-2 text-sm text-white/70">
                  Habla con un especialista para diseñar un plan a la medida de tu operación, con instalación, capacitación y mantenimiento incluidos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTA title={`Lleva ${r.name} a tu operación`} subtitle="Solicita una demo presencial o virtual y compruébalo en acción." />

      <Script
        id={`ld-${r.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
    </>
  );
}
