// Vitala — identidad de marca
export const vitala = {
  name: "Vitala",
  legalName: "Vitala",
  tagline: "Un nutriólogo para todos. Una moneda. Para toda la vida.",
  claim: "Nutrición de primer mundo al alcance de cualquier persona.",
  description:
    "Vitala te arma un plan de alimentación personalizado a partir de tus datos, respetando tus alergias y condiciones de salud. Acceso de por vida por el precio simbólico de una sola moneda de tu país.",
  lifetimePriceLabel: "✨  1 moneda · acceso de por vida",
  path: "/",
  colors: {
    // Verdes — más cálidos y saturados
    brand:       "#34D399",  // mint-verde principal
    brandDeep:   "#059669",  // profundo para contraste
    brandLight:  "#6EE7B7",  // claro, amigable
    brandGlow:   "rgba(52,211,153,0.18)",
    // Ámbar — calidez y energía
    accent:      "#FBBF24",
    accentLight: "#FDE68A",
    accentGlow:  "rgba(251,191,36,0.18)",
    // Fondos — cálidos, no fríos
    bg:          "#080F0A",  // verde muy oscuro y cálido
    bgSoft:      "rgba(52,211,153,0.07)",
    bgCard:      "rgba(255,255,255,0.04)",
    bgCardHover: "rgba(52,211,153,0.10)",
    // Texto
    text:        "#ECFDF5",
    textMuted:   "rgba(236,253,245,0.60)",
  },
  defaultCurrency: { code: "MXN", symbol: "$", country: "México" },
} as const;
