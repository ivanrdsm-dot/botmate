import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BotMate — Robots de servicio en México",
    short_name: "BotMate",
    description: "Renta y venta de robots de servicio Pudu Robotics en México.",
    start_url: "/",
    display: "standalone",
    background_color: "#04060B",
    theme_color: "#04060B",
    lang: "es-MX",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/logo.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
    ],
  };
}
