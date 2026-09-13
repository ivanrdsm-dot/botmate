import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BotMate — Robots de servicio en México",
    short_name: "BotMate",
    description: "Renta y venta de robots de servicio BotMate en México.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    lang: "es-MX",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },

    ],
  };
}
