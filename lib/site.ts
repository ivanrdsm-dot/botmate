export const site = {
  name: "BotMate",
  legalName: "BotMate México",
  tagline: "El compañero robot ideal para tu marca · México",
  description:
    "BotMate es el compañero robot ideal para tu marca en México. Renta y venta de robots para publicidad interactiva, navegación en eventos, exposiciones, ferias y limpieza. Confianza de Universidad Anáhuac, Red Bull, TECMA, AMDM y más.",
  url: "https://botmate.mx",
  email: "contacto@botmate.mx",
  whatsapp: "525531491986",
  whatsappDisplay: "+52 55 3149 1986",
  phone: "+525531491986",
  phoneDisplay: "55 3149 1986",
  address: {
    street: "Insurgentes Sur 1763",
    locality: "Guadalupe Inn, Álvaro Obregón",
    region: "CDMX",
    country: "MX",
    postal: "01020",
  },
  social: {
    instagram: "https://instagram.com/botmate.mx",
    linkedin: "https://linkedin.com/company/botmate-mx",
    tiktok: "https://tiktok.com/@botmate.mx",
    facebook: "https://facebook.com/botmate.mx",
  },
  metrics: [
    { label: "Productividad", value: "+40%" },
    { label: "Satisfacción del cliente", value: "+35%" },
    { label: "Reducción de costos", value: "-20%" },
    { label: "Robots operando en México", value: "+500" },
  ],
} as const;

export const waLink = (msg?: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
    msg ?? "Hola BotMate, me interesa información sobre sus robots."
  )}`;
