// Vitala — configuración de Capacitor (App Store / Play Store).
// La app nativa carga la web de producción (server.url) y suma capacidades
// nativas: Sign in with Apple nativo, splash, status bar.
// El Bundle ID debe coincidir con el registrado en Apple Developer.

import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "health.vitala.app",
  appName: "Vitala",
  // webDir es requerido por el CLI; no se usa porque cargamos server.url.
  webDir: "public",
  server: {
    url: "https://vitala.vercel.app",
    cleartext: false,
  },
  backgroundColor: "#080F0A",
  ios: {
    contentInset: "automatic",
    scheme: "Vitala",
  },
};

export default config;
