import {puduProducts,puduAliases} from '@/lib/pudu';
import {PuduProductDetail} from '@/components/PuduSections';
import {localizedMetadata} from '@/lib/pudu-seo';
import {permanentRedirect} from 'next/navigation';
import type { Metadata } from "next";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check, FileText } from "lucide-react";
import { robots, categoryLabel } from "@/lib/robots";
import CTA from "@/components/CTA";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
export function generateStaticParams() {
  return [...robots, ...puduProducts].map((r) => ({ slug: r.slug }));
}
export async function generateMetadata(
  props: {
    params: Promise<{ slug: string }>;
  }
): Promise<Metadata> {
  const params = await props.params;
  const current = puduProducts.find(r => r.slug === params.slug);
  if (current) return localizedMetadata(current.name + " en México · Botmate", current.name + ": " + current.description.es, "/robots/" + current.slug);
  const r = robots.find((r) => r.slug === params.slug);
  return r
    ? {
        title: `${r.name} · Aplicaciones y características`,
        description: r.description,
        alternates: { canonical: `/robots/${r.slug}`, languages: {"es-MX": `/robots/${r.slug}`, en: `/en/robots/${r.slug}`} },
        openGraph: { title: `${r.name} · Botmate`, description: r.description },
      }
    : {};
}
export default async function Page(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  if (puduAliases[params.slug]) permanentRedirect("/robots/" + puduAliases[params.slug]);
  const current = puduProducts.find(r => r.slug === params.slug);
  if (current) return <PuduProductDetail robot={current} locale="es"/>;
  const r = robots.find((r) => r.slug === params.slug);
  if (!r) notFound();
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Inicio", url: "/" },
          { name: "Robots", url: "/robots" },
          { name: r.name, url: `/robots/${r.slug}` },
        ]}
      />
      <section className="product-hero">
        <div className="container-x">
          <div className="breadcrumb">
            <Link href="/robots">Catálogo</Link>
            <span>/</span>
            <span>{r.name}</span>
          </div>
          <div className="product-hero-grid">
            <div>
              <p className="eyebrow">
                Pudu Robotics · {categoryLabel[r.category]}
              </p>
              <h1>{r.name}</h1>
              <p className="product-tagline">{r.tagline}</p>
              <p className="product-description">{r.description}</p>
              <div className="hero-actions">
                <Link
                  href={`/contacto?robot=${encodeURIComponent(r.name)}&interes=Cotizacion`}
                  className="btn-primary"
                >
                  Cotizar este modelo
                  <ArrowUpRight size={18} />
                </Link>
                <Link
                  href="/reservar"
                  className="text-link"
                >
                  Reservar una llamada
                  <ArrowUpRight size={17} />
                </Link>
              </div>
              <p className="fine-print">
                Disponibilidad, versión y alcance sujetos a confirmación.
              </p>
            </div>
            <figure className="product-main-image">
              {r.image ? (
                <Image
                  src={r.image}
                  alt={`${r.name}, imagen de referencia de producto`}
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  priority
                  className="object-contain"
                />
              ) : (
                <div className="photo-placeholder">
                  <FileText size={52} />
                  <p>Consulta la ficha original de Pudu.</p>
                </div>
              )}
            </figure>
          </div>
        </div>
      </section>
      <section className="section-space soft-section">
        <div className="container-x detail-grid">
          <div>
            <p className="eyebrow">Su lugar en tu operación</p>
            <h2>¿Qué puede aportar?</h2>
            <ul className="check-list">
              {r.highlights.map((h) => (
                <li key={h}>
                  <Check size={18} />
                  {h}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Aplicaciones</p>
            <h2>Espacios a evaluar</h2>
            <div className="application-tags">
              {r.useCases.map((u) => (
                <span className="chip" key={u}>
                  {u}
                </span>
              ))}
            </div>
            <p className="muted">
              Antes de implementarlo se revisan superficies, recorridos, accesos
              y condiciones de operación.
            </p>
          </div>
        </div>
      </section>
      <section className="section-space">
        <div className="container-x detail-grid">
          <div>
            <p className="eyebrow">Datos para decidir</p>
            <h2>La ficha, sin rodeos.</h2>
            <p className="muted">
              Referencia del fabricante. El rendimiento depende del entorno, la
              carga y la configuración. Confirma la versión y los accesorios en
              tu propuesta.
            </p>
            <a
              href={r.source}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              Consultar fuente Pudu
              <ArrowUpRight size={17} />
            </a>
            <p className="fine-print">
              Consulta de fuente: 13 de septiembre de 2026.
            </p>
          </div>
          <dl className="spec-list">
            {r.specs.map((s) => (
              <div key={s.label}>
                <dt>{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <CTA
        title={`Conoce cómo encaja ${r.name} en tu negocio.`}
        primaryHref="/reservar"
      />
      <script
        nonce={(await headers()).get("x-nonce") ?? undefined}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: r.name,
            description: r.description,
            brand: { "@type": "Brand", name: "Pudu Robotics" },
            model: r.model,
            category: categoryLabel[r.category],
          }),
        }}
      />
    </>
  );
}
