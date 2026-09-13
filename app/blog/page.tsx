import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import PageIntro from "@/components/PageIntro";
import { posts } from "@/lib/posts";
import CTA from "@/components/CTA";
export const metadata: Metadata = {
  title: "Guías para elegir e implementar robots de servicio",
  description:
    "Recursos de Botmate para preparar una demostración, comparar aplicaciones y evaluar las condiciones de un proyecto de robótica.",
  alternates: { canonical: "/blog" },
};
export default function Page() {
  return (
    <>
      <PageIntro
        eyebrow="Guías y recursos"
        title={
          <>
            Buenas preguntas.
            <br />
            <span>Mejores decisiones.</span>
          </>
        }
        description="Guías breves para evaluar tu operación, preparar una demostración y comparar propuestas con claridad."
      />
      <section className="section-space section-compact">
        <div className="container-x resource-grid">
          {posts.map((p) => (
            <article className="resource-card" key={p.slug}>
              <p className="eyebrow">
                {p.category} · {p.readMin} min
              </p>
              <h2>{p.title}</h2>
              <p>{p.excerpt}</p>
              <Link className="text-link" href={`/blog/${p.slug}`}>
                Leer guía
                <ArrowUpRight size={17} />
              </Link>
            </article>
          ))}
        </div>
      </section>
      <CTA />
    </>
  );
}
