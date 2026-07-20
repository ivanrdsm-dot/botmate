import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Vitala",
    short_name: "Vitala",
    description: "Nutrición de primer mundo, al alcance de toda la humanidad.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAF5EC",
    theme_color: "#FAF5EC",
    icons: [
      { src: "/vitala/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/vitala/icon-maskable.svg", sizes: "any", type: "image/svg+xml", purpose: "maskable" },
    ],
  };
}
