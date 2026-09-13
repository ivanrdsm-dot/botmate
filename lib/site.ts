export const site = {
  name: "BotMate",
  legalName: "BotMate México",
  tagline: "Robótica que trabaja contigo.",
  description:
    "Robots de servicio para entrega, publicidad y limpieza en México. Explora soluciones Pudu Robotics y consulta renta, compra e implementación con Botmate.",
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
  metrics: [] as { label: string; value: string }[],
} as const;

export const waLink = (msg?: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
    msg ?? "Hola BotMate, me interesa información sobre sus robots.",
  )}`;
