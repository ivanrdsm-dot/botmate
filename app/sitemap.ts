import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://vitala.app", lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: "https://vitala.app/recetas", changeFrequency: "weekly", priority: 0.9 },
    { url: "https://vitala.app/comunidad", changeFrequency: "daily", priority: 0.8 },
    { url: "https://vitala.app/onboarding", changeFrequency: "monthly", priority: 0.8 },
    { url: "https://vitala.app/bienestar", changeFrequency: "monthly", priority: 0.7 },
    { url: "https://vitala.app/plan", changeFrequency: "monthly", priority: 0.7 },
    { url: "https://vitala.app/diario", changeFrequency: "monthly", priority: 0.7 },
    { url: "https://vitala.app/progreso", changeFrequency: "monthly", priority: 0.6 },
    { url: "https://vitala.app/uno-peso", changeFrequency: "monthly", priority: 0.6 },
    { url: "https://vitala.app/legal", changeFrequency: "yearly", priority: 0.3 },
  ];
}
