export const site = {
  name: "BotMate",
  legalName: "BotMate México",
  tagline: "Robots de servicio en renta y venta · México",
  description:
    "BotMate es el líder en México en renta y venta de robots de servicio para restaurantes, hoteles, hospitales, centros comerciales y corporativos. Modelos BellaBot, KettyBot, SwiftBot, FlashBot, HolaBot, CC1 y más. Refacciones, mantenimiento y soporte técnico especializado.",
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
