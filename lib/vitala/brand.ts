// Vitala — identidad de marca (producto de salud/nutrición)
// Concepto: nutrición de primer mundo para todos. Una sola moneda, de por vida.

export const vitala = {
  name: "Vitala",
  legalName: "Vitala",
  tagline: "Un nutriólogo para todos. Una moneda. Para toda la vida.",
  claim: "Nutrición de primer mundo al alcance de cualquier persona.",
  description:
    "Vitala te arma un plan de alimentación personalizado a partir de tus datos, respetando tus alergias y condiciones de salud. Acceso de por vida por el precio simbólico de una sola moneda de tu país.",
  // Precio simbólico: 1 unidad de la moneda local, pago único de por vida.
  lifetimePriceLabel: "1 moneda — pago único, acceso de por vida",
  path: "/vitala",
  colors: {
    brand: "#16A34A", // verde fresco
    brandDeep: "#0F7A38",
    brandLight: "#4ADE80",
    accent: "#F59E0B", // ámbar cálido (moneda)
    bg: "#06120C",
    bgSoft: "#0B1A12",
  },
  // El precio se muestra como "1" en la moneda detectada; sólo es un símbolo del modelo.
  defaultCurrency: { code: "MXN", symbol: "$", country: "México" },
} as const;
