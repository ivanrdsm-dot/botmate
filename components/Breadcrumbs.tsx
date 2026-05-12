import Link from "next/link";
import Script from "next/script";
import { ChevronRight } from "lucide-react";
import { breadcrumbLd } from "@/lib/seo";

export default function Breadcrumbs({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  return (
    <>
      <nav aria-label="Breadcrumb" className="container-x pt-28">
        <ol className="flex flex-wrap items-center gap-1 text-xs text-white/50">
          {items.map((it, i) => {
            const last = i === items.length - 1;
            return (
              <li key={it.url} className="flex items-center gap-1">
                {i > 0 && <ChevronRight className="h-3 w-3 text-white/30" />}
                {last ? (
                  <span className="text-white/80">{it.name}</span>
                ) : (
                  <Link href={it.url} className="hover:text-white">{it.name}</Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <Script id={`ld-bc-${items.map(i => i.url).join("_")}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd(items)) }} />
    </>
  );
}
