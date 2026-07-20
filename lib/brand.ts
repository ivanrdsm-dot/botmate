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
    // TEMA CLARO CÁLIDO — crema + jade + terracota (nada de negro).
    brand:       "#4CC38A",  // jade cálido: botones con texto oscuro
    brandDeep:   "#0E7A52",  // esmeralda profundo: CTA destacado, hovers
    brandLight:  "#0B6B4A",  // verde bosque: TITULARES legibles sobre crema
    brandGlow:   "rgba(76,195,138,0.20)",
    // Terracota/miel — calidez humana
    accent:      "#B45309",  // terracota: acentos y botones con texto blanco
    accentLight: "#F7B24E",  // miel: fondos suaves y detalles
    accentGlow:  "rgba(180,83,9,0.12)",
    // Fondos — crema cálida, papel
    bg:          "#FAF5EC",  // crema principal
    bgSoft:      "rgba(14,122,82,0.07)",
    bgCard:      "#FFFFFF",
    bgCardHover: "#F3EEE2",
    // Texto — verde-carbón cálido, nunca negro puro
    text:        "#26382E",
    textMuted:   "rgba(38,56,46,0.66)",
  },
  defaultCurrency: { code: "MXN", symbol: "$", country: "México" },
} as const;
