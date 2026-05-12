export type Testimonial = {
  text: string;
  author: string;
  role: string;
  company: string;
  rating: number;
};

export const testimonials: Testimonial[] = [
  {
    text: "BotMate no nos vendió robots, nos diseñó un sistema. La diferencia se nota en el resultado.",
    author: "Mariana Esquivel",
    role: "Directora de Operaciones",
    company: "Grupo Restaurantero CDMX",
    rating: 5,
  },
  {
    text: "Probé otro proveedor antes. La diferencia en soporte técnico es abismal. BotMate responde en minutos, no en días.",
    author: "Ricardo Sandoval",
    role: "Gerente General",
    company: "Hotel Boutique Tulum",
    rating: 5,
  },
  {
    text: "Pagaron solos en 9 meses. El equipo médico ahora dedica su tiempo a pacientes, no a caminar pasillos.",
    author: "Dra. Patricia Núñez",
    role: "Directora de Enfermería",
    company: "Hospital Privado Monterrey",
    rating: 5,
  },
  {
    text: "Convertimos un gasto operativo en una unidad de negocio. KettyBot Pro renta espacio publicitario premium.",
    author: "Eduardo Mejía",
    role: "Director Comercial",
    company: "Plaza Comercial Premium GDL",
    rating: 5,
  },
  {
    text: "12 T600 trabajan 22 horas diarias sin queja. Triplicamos capacidad sin construir un nuevo CEDIS.",
    author: "Andrés Carmona",
    role: "Director de Logística",
    company: "3PL Bajío",
    rating: 5,
  },
  {
    text: "Implementación impecable y mantenimiento siempre puntual. Cero sorpresas en 18 meses.",
    author: "Lucía Ramos",
    role: "Property Manager",
    company: "Corporativo Polanco",
    rating: 5,
  },
];

export const clients = [
  "Universidad Anáhuac",
  "Red Bull",
  "Peñafiel",
  "Sprite",
  "TECMA",
  "AMDM 1943",
  "Anáhuac Labs",
  "Club Élite Industrial",
  "Ferias de Idaho",
  "Pudu Robotics",
  "Anáhuac 5.0",
  "EXP CMAQ",
];
