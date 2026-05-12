import Script from "next/script";
import { breadcrumbLd } from "@/lib/seo";

export default function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  return (
    <Script
      id={`ld-bc-${items.map(i => i.url).join("_")}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd(items)) }}
    />
  );
}
