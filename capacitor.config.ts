import type { CapacitorConfig } from "@capacitor/cli";

// Vitala — empaqueta la PWA como app nativa para App Store y Google Play.
// Estrategia: la app nativa carga la PWA ya desplegada (server.url).
// Reemplaza VITALA_APP_URL por tu dominio en producción (p. ej. https://vitala.health/vitala).
const APP_URL = process.env.VITALA_APP_URL || "https://botmate.mx/vitala";

const config: CapacitorConfig = {
  appId: "health.vitala.app",
  appName: "Vitala",
  webDir: "public",
  server: {
    url: APP_URL,
    cleartext: false,
  },
  backgroundColor: "#06120C",
  ios: {
    contentInset: "always",
  },
};

export default config;
