/**
 * Mapeo central de portadas a fotografía real de BotMate.
 * Sustituye los placeholders genéricos: cada caso y artículo usa una foto
 * de un robot real o de una activación real con clientes.
 */

/** Fotografías reales de activaciones con clientes. */
export const realPhotos = {
  boothBanner: "/photos/booth-banner.jpg",
  anahuacService: "/photos/anahuac-service.jpg",
  eventRedbull: "/photos/event-redbull.jpg",
  outdoorDisplay: "/photos/outdoor-display.jpg",
  expoTecma: "/photos/expo-tecma.jpg",
} as const;

const robot = (slug: string) => `/photos/robots/${slug}.jpg`;

/** Portada por industria para los casos de éxito. */
export const caseCover: Record<string, { src: string; alt: string }> = {
  restaurant: { src: robot("botmate-serve"), alt: "BotMate Serve entregando platillos en restaurante" },
  hotel: { src: robot("botmate-tower"), alt: "BotMate Tower en servicio de hotel" },
  hospital: { src: robot("botmate-flex"), alt: "BotMate Flex en distribución hospitalaria" },
  retail: { src: realPhotos.outdoorDisplay, alt: "Robot BotMate con publicidad interactiva en exterior" },
  logistics: { src: robot("botmate-cargo-600"), alt: "BotMate Cargo 600 en centro de distribución" },
  corporate: { src: robot("botmate-clean"), alt: "BotMate Clean en limpieza de corporativo" },
};

export const defaultCaseCover = { src: realPhotos.boothBanner, alt: "Robots BotMate en activación" };

/** Portada por tema para los artículos del blog. */
export const postCover: Record<string, { src: string; alt: string }> = {
  compare: { src: robot("botmate-serve"), alt: "Comparativa de robots de servicio BotMate" },
  roi: { src: robot("botmate-ads"), alt: "BotMate Ads generando retorno publicitario" },
  guide: { src: realPhotos.anahuacService, alt: "Robot BotMate en servicio con clientes" },
  cleaning: { src: robot("botmate-clean"), alt: "BotMate Clean en limpieza autónoma" },
  future: { src: robot("botmate-glide"), alt: "El futuro de la robótica de servicio en México" },
  tax: { src: robot("botmate-cargo-600"), alt: "Deducción fiscal por inversión en robótica" },
};

export const defaultPostCover = { src: realPhotos.boothBanner, alt: "BotMate — robots de servicio" };

export const getCaseCover = (variant: string) => caseCover[variant] ?? defaultCaseCover;
export const getPostCover = (cover: string) => postCover[cover] ?? defaultPostCover;
