import type { MetadataRoute } from "next";
import { robots as robotList } from "@/lib/robots";
import { posts } from "@/lib/posts";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date("2026-09-13T00:00:00Z");
  const staticPaths = [
    "",
    "/robots",
    "/renta",
    "/venta",
    "/refacciones",
    "/servicios",
    "/sectores",
    "/casos-de-exito",
    "/blog",
    "/nosotros",
    "/contacto",
    "/reservar",
  ];

  const staticEntries = staticPaths.map((p) => ({
    url: `${site.url}${p}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: p === "" ? 1 : 0.8,
  }));

  const robotEntries = robotList.map((r) => ({
    url: `${site.url}/robots/${r.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const postEntries = posts.map((p) => ({
    url: `${site.url}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...robotEntries, ...postEntries];
}
