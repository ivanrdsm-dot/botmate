import stories from '@/lib/pudu-stories.json';
import {BlogDetail} from '@/components/PuduPages';
import {localizedMetadata} from '@/lib/pudu-seo';
import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import Link from "next/link";
import { posts } from "@/lib/posts";
import { site } from "@/lib/site";
import CTA from "@/components/CTA";
export function generateStaticParams() {
  return [...posts,...stories.posts].map((p) => ({ slug: p.slug }));
}
export async function generateMetadata(
  props: {
    params: Promise<{ slug: string }>;
  }
): Promise<Metadata> {
  const params = await props.params;
  const current = stories.posts.find(p => p.slug === params.slug);
  if (current) return localizedMetadata(current.title.es,current.intro.es,"/blog/"+current.slug);
  const p = posts.find((p) => p.slug === params.slug);
  return p
    ? {
        title: p.title,
        description: p.excerpt,
        alternates: { canonical: `/blog/${p.slug}`, languages: {"es-MX": `/blog/${p.slug}`, en: `/en/blog/${p.slug}`} },
        openGraph: { type: "article", title: p.title, description: p.excerpt },
      }
    : {};
}
export default async function Page(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const current = stories.posts.find(p => p.slug === params.slug);
  if (current) return <BlogDetail post={current}/>;
  const p = posts.find((p) => p.slug === params.slug);
  if (!p) notFound();
  return (
    <>
      <article className="section-space">
        <div className="container-x article-content">
          <div className="breadcrumb">
            <Link href="/blog">Guías y recursos</Link>
            <span>/</span>
            <span>{p.category}</span>
          </div>
          <p className="eyebrow">
            Guía Botmate · {p.readMin} minutos de lectura
          </p>
          <h1 className="article-title">{p.title}</h1>
          <p>{p.excerpt}</p>
          <div className="article-body">
            {p.body.map((b, i) =>
              b.type === "h2" ? (
                <h2 key={i}>{b.content}</h2>
              ) : b.type === "ul" ? (
                <ul key={i}>
                  {(b.content as string[]).map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              ) : (
                <p key={i}>{b.content}</p>
              ),
            )}
          </div>
        </div>
      </article>
      <CTA />
      <script
        nonce={(await headers()).get("x-nonce") ?? undefined}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: p.title,
            description: p.excerpt,
            author: { "@type": "Organization", name: site.name },
            mainEntityOfPage: `${site.url}/blog/${p.slug}`,
          }),
        }}
      />
    </>
  );
}
