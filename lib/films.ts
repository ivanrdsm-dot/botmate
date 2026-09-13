export const films = [
  {
    id: "publicidad",
    title: "Tu marca, en movimiento.",
    label: "Publicidad y recepción",
    poster: "/media/hero-field.webp",
    src: "/media/higgsfield/publicidad-exacta.mp4",
    credit: "Fotografía real · animación de cámara",
    alt: "Robot real con pantalla publicitaria, completo de la pantalla superior a la base",
    href: "/sectores#retail",
  },
  {
    id: "servicio",
    title: "La experiencia va primero.",
    label: "Servicio y eventos",
    poster: "/media/service-field.webp",
    src: "/media/higgsfield/servicio.mp4",
    credit: "Animación IA · foto real de Botmate",
    alt: "Robot real con bandejas de bebidas durante una activación de Botmate",
    href: "/sectores#restaurantes",
  },
  {
    id: "equipo",
    title: "Tecnología que se complementa.",
    label: "Entrega, publicidad y limpieza",
    poster: "/media/fleet-field.webp",
    src: "/media/higgsfield/equipo.mp4",
    credit: "Animación IA · foto real de Botmate",
    alt: "Tres robots reales de Botmate: entrega, CC1 de limpieza al centro y pantalla publicitaria",
    href: "/robots",
  },
] as const;

export const studioFilm = {
  id: "estudio",
  title: "Dale otro lugar a tu marca.",
  label: "Publicidad y recepción",
  poster: "/media/higgsfield/studio.webp",
  src: "/media/higgsfield/studio.mp4",
  credit: "Robot real · fondo de estudio generado",
  alt: "Composición ilustrativa con el robot de la fotografía original de Botmate sobre un fondo de estudio generado",
  href: "/sectores#retail",
} as const;
export const heroFilms = [studioFilm, films[1], films[2]] as const;
