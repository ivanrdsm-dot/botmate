import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import { posts } from "@/lib/posts";
import { site } from "@/lib/site";
import { ArrowLeft, Clock, Calendar, Share2, ArrowUpRight } from "lucide-react";
import ScrollProgress from "@/components/ScrollProgress";
import Newsletter from "@/components/Newsletter";

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const p = posts.find((x) => x.slug === params.slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.excerpt,
    alternates: { canonical: `/blog/${p.slug}` },
    openGraph: { title: p.title, description: p.excerpt, type: "article", publishedTime: p.date },
  };
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const p = posts.find((x) => x.slug === params.slug);
  if (!p) notFound();
  const related = posts.filter((x) => x.slug !== p.slug && x.category === p.category).slice(0, 3);

  const ld = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: p.title,
    description: p.excerpt,
    datePublished: p.date,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name, logo: { "@type": "ImageObject", url: `${site.url}/logo.svg` } },
    mainEntityOfPage: `${site.url}/blog/${p.slug}`,
    keywords: p.tags.join(", "),
  };

  return (
    <>
      <ScrollProgress />
      <article className="pt-32">
        <div className="container-x max-w-3xl">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white">
            <ArrowLeft className="h-4 w-4" /> Volver al blog
          </Link>
          <div className="mt-8 flex flex-wrap items-center gap-3 text-xs text-white/50">
            <span className="text-accent">{p.category}</span>
            <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {p.readMin} min</span>
            <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" /> {fmt(p.date)}</span>
          </div>
          <h1 className="mt-4 font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
            {p.title}
          </h1>
          <p className="mt-6 text-lg text-white/70">{p.excerpt}</p>

          <div className="mt-8 flex items-center justify-between border-y border-white/10 py-4">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-accent/30 to-accent-violet/30 text-sm font-semibold">
                {p.author.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-semibold">{p.author.name}</p>
                <p className="text-xs text-white/50">{p.author.role}</p>
              </div>
            </div>
            <button className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/70 hover:text-white">
              <Share2 className="h-3.5 w-3.5" /> Compartir
            </button>
          </div>

          <div className="mt-10 space-y-6">
            {p.body.map((b, i) => <Block key={i} b={b} />)}
          </div>

          <div className="mt-12 flex flex-wrap gap-2 border-t border-white/10 pt-8">
            {p.tags.map((t) => (
              <span key={t} className="chip">#{t}</span>
            ))}
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="py-20">
          <div className="container-x">
            <h2 className="font-display text-2xl font-semibold">Sigue leyendo</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {related.map((r) => (
                <Link key={r.slug} href={`/blog/${r.slug}`} className="card-tech group flex flex-col">
                  <span className="text-xs text-accent">{r.category}</span>
                  <h3 className="mt-2 line-clamp-2 font-display text-lg font-semibold">{r.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-white/60">{r.excerpt}</p>
                  <span className="mt-auto inline-flex items-center gap-1 pt-4 text-xs text-accent group-hover:gap-2 transition-all">
                    Leer <ArrowUpRight className="h-3 w-3" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Newsletter />

      <Script id={`ld-blog-${p.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}

function Block({ b }: { b: { type: string; content: string | string[] } }) {
  switch (b.type) {
    case "h2":
      return <h2 className="mt-10 font-display text-2xl font-bold tracking-tight sm:text-3xl">{b.content as string}</h2>;
    case "p":
      return <p className="text-[1.05rem] leading-[1.75] text-white/80">{b.content as string}</p>;
    case "ul":
      return (
        <ul className="list-disc space-y-2 pl-6 text-white/80 leading-relaxed">
          {(b.content as string[]).map((li, i) => <li key={i}>{li}</li>)}
        </ul>
      );
    case "quote":
      return (
        <blockquote className="border-l-2 border-accent pl-5 italic text-white/85">
          {b.content as string}
        </blockquote>
      );
    case "callout":
      return (
        <div className="rounded-2xl border border-accent/30 bg-accent/5 p-5 text-sm text-accent/90">
          💡 {b.content as string}
        </div>
      );
    default:
      return null;
  }
}

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString("es-MX", { year: "numeric", month: "long", day: "numeric" });
}
