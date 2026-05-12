export type CaseStudy = {
  slug: string;
  client: string;
  industry: string;
  city: string;
  title: string;
  summary: string;
  hero: string;
  robots: string[];
  challenge: string;
  solution: string;
  results: { label: string; value: string; sub?: string }[];
  quote: { text: string; author: string; role: string };
  timeline: string;
  scope: string;
};

export const cases: CaseStudy[] = [
  {
    slug: "grupo-restaurantero-cdmx",
    client: "Grupo Restaurantero CDMX",
    industry: "Restaurantes",
    city: "Ciudad de México",
    title: "Cómo 12 BellaBot Pro elevaron el ticket promedio 18% en 6 meses",
    summary:
      "Un grupo gastronómico de 7 sucursales en CDMX automatizó la operación de servicio durante hora pico y liberó al equipo humano para enfocarse en experiencia al comensal.",
    hero: "restaurant",
    robots: ["BellaBot Pro", "HolaBot"],
    challenge:
      "Rotación del 38% en personal de meseros, tiempos de espera mayores a 9 minutos en horarios pico y caída de NPS durante fines de semana de alta demanda.",
    solution:
      "Implementamos una flota mixta de 12 BellaBot Pro para entrega de platillos y 4 HolaBot para retiro de loza. Integración con el POS para sincronizar pedidos y ruteo óptimo entre cocinas y mesas. Capacitación inmersiva de 3 días al equipo completo.",
    results: [
      { label: "Ticket promedio", value: "+18%", sub: "comensales pidieron más postres y bebidas" },
      { label: "Tiempo de espera", value: "-46%", sub: "de 9.2 a 5.0 minutos en hora pico" },
      { label: "Rotación de meseros", value: "-62%", sub: "trabajo más ergonómico" },
      { label: "NPS promedio", value: "+24 pts" },
    ],
    quote: {
      text: "Los robots se volvieron parte del show. Los clientes los buscan, los meseros los aman y las propinas subieron porque nuestro equipo ahora tiene tiempo para conversar con cada mesa.",
      author: "Mariana Esquivel",
      role: "Directora de Operaciones",
    },
    timeline: "Implementación en 14 días",
    scope: "12 BellaBot Pro · 4 HolaBot · 7 sucursales",
  },
  {
    slug: "hotel-boutique-tulum",
    client: "Hotel Boutique Tulum",
    industry: "Hotelería",
    city: "Tulum, QROO",
    title: "Room service 24/7 con FlashBot en un hotel boutique de 84 llaves",
    summary:
      "Una propiedad 5 estrellas en Tulum eliminó las quejas por demora en entrega de amenidades y room service nocturno con flota autónoma multi-piso.",
    hero: "hotel",
    robots: ["FlashBot", "SwiftBot"],
    challenge:
      "Personal nocturno reducido generaba esperas de hasta 45 minutos para amenidades, toallas y room service. El hotel sufría 12 quejas semanales y bajaba calificación en Booking.",
    solution:
      "Integración de 3 FlashBot con elevadores y PMS Opera. SwiftBot para servicio en restaurante y bar de alberca. Compartimentos seguros con código por SMS para huéspedes.",
    results: [
      { label: "Tiempo de entrega", value: "-71%", sub: "de 38 a 11 minutos promedio" },
      { label: "Calificación Booking", value: "9.4", sub: "subió desde 8.6" },
      { label: "Costos de planta nocturna", value: "-28%" },
      { label: "Operación", value: "24/7", sub: "sin interrupciones" },
    ],
    quote: {
      text: "FlashBot transformó nuestra operación nocturna. Los huéspedes se graban videos cuando llega el robot — se convirtió en contenido orgánico para redes sociales.",
      author: "Ricardo Sandoval",
      role: "Gerente General",
    },
    timeline: "Go-live en 21 días",
    scope: "3 FlashBot · 1 SwiftBot · Integración PMS",
  },
  {
    slug: "hospital-monterrey",
    client: "Hospital Privado Monterrey",
    industry: "Salud",
    city: "Monterrey, NL",
    title: "Distribución hospitalaria cero-contacto con PuduBot 2",
    summary:
      "Un hospital privado de 180 camas redujo desplazamientos del personal de enfermería un 54% al automatizar la entrega de medicamentos e insumos entre áreas.",
    hero: "hospital",
    robots: ["PuduBot 2", "CC1"],
    challenge:
      "Personal de enfermería invertía 2.1 horas diarias caminando entre farmacia, almacén y pisos. Riesgo biológico al cruzar zonas críticas con materiales contaminados.",
    solution:
      "8 PuduBot 2 con compartimentos esterilizables para distribución intra-piso y entre áreas. 2 CC1 para limpieza autónoma nocturna en pasillos y vestíbulos.",
    results: [
      { label: "Tiempo de enfermería liberado", value: "+54%", sub: "ahora dedicado a pacientes" },
      { label: "Incidentes de contaminación cruzada", value: "0", sub: "desde implementación" },
      { label: "Horas-hombre limpieza", value: "-62%" },
      { label: "Satisfacción del personal", value: "+41%" },
    ],
    quote: {
      text: "Liberar al equipo médico de tareas logísticas fue el mejor regreso de inversión que hemos tenido. La automatización pagó sola en 9 meses.",
      author: "Dra. Patricia Núñez",
      role: "Directora de Enfermería",
    },
    timeline: "Despliegue en 30 días",
    scope: "8 PuduBot 2 · 2 CC1 · Integración con sistema farmacia",
  },
  {
    slug: "plaza-comercial-guadalajara",
    client: "Plaza Comercial Premium",
    industry: "Retail",
    city: "Guadalajara, JAL",
    title: "Marketing experiencial + limpieza autónoma en plaza de 95,000 m²",
    summary:
      "Una plaza comercial premium combinó publicidad interactiva con KettyBot Pro y limpieza 4-en-1 con CC1 para reducir costos operativos y crear nuevas fuentes de ingreso publicitario.",
    hero: "retail",
    robots: ["KettyBot Pro", "CC1"],
    challenge:
      "Espacios publicitarios estáticos en saturación, costos crecientes de cuadrilla de limpieza diurna y necesidad de diferenciarse contra plazas vecinas.",
    solution:
      "6 KettyBot Pro como pantallas publicitarias rodantes con CMS dedicado, vendidas como espacio premium a marcas ancla. 4 CC1 para limpieza autónoma off-peak.",
    results: [
      { label: "Nuevo ingreso publicitario", value: "$2.1M MXN/año" },
      { label: "Costo de limpieza", value: "-44%" },
      { label: "Tiempo de limpieza piso", value: "-78%" },
      { label: "Tráfico convertido", value: "+12%", sub: "campañas con CTA en KettyBot" },
    ],
    quote: {
      text: "Convertimos un costo operativo en una unidad de negocio. KettyBot Pro paga renta y aún genera utilidad.",
      author: "Eduardo Mejía",
      role: "Director Comercial",
    },
    timeline: "Lanzamiento en 28 días",
    scope: "6 KettyBot Pro · 4 CC1 · CMS publicitario",
  },
  {
    slug: "centro-distribucion-bajio",
    client: "3PL Bajío",
    industry: "Logística",
    city: "Querétaro, QRO",
    title: "AMR T600 para picking & packing en CEDIS de 18,000 m²",
    summary:
      "Una empresa 3PL en Querétaro redujo 61% el tiempo de picking en su centro de distribución usando una flota de robots autónomos T600 con integración WMS.",
    hero: "logistics",
    robots: ["T600", "T300"],
    challenge:
      "Crecimiento de 240% en pedidos de e-commerce y dificultad para contratar montacarguistas. SLA de entrega comprometido en hora pico.",
    solution:
      "12 T600 para mover tarimas entre racks y zona de empaque, 4 T300 para piezas medianas. Integración con WMS Manhattan y flota administrada por RMS Pudu.",
    results: [
      { label: "Tiempo de picking", value: "-61%" },
      { label: "Pedidos / hora", value: "+3.4×" },
      { label: "Errores de picking", value: "-92%" },
      { label: "Accidentes laborales", value: "0" },
    ],
    quote: {
      text: "Los T600 trabajan 22 horas al día sin queja. Pudimos triplicar capacidad sin construir un nuevo CEDIS.",
      author: "Andrés Carmona",
      role: "Director de Logística",
    },
    timeline: "Implementación en 45 días",
    scope: "12 T600 · 4 T300 · Integración WMS",
  },
  {
    slug: "corporativo-polanco",
    client: "Corporativo Polanco",
    industry: "Oficinas",
    city: "Ciudad de México",
    title: "Robot anfitrión + limpieza nocturna en torre corporativa AAA",
    summary:
      "Una torre corporativa AAA en Polanco automatizó la recepción de visitantes y limpieza nocturna de 14 pisos con flota híbrida BotMate.",
    hero: "corporate",
    robots: ["KettyBot Pro", "CC1", "SH1"],
    challenge:
      "Imagen institucional desactualizada, costos elevados de cuadrilla de limpieza y recepcionistas saturados con +280 visitantes diarios.",
    solution:
      "1 KettyBot Pro como anfitrión digital en lobby con check-in inteligente. 2 CC1 + 3 SH1 para limpieza autónoma nocturna en pisos comunes y privados.",
    results: [
      { label: "Costo de limpieza", value: "-39%" },
      { label: "Tiempo recepcionistas en check-in", value: "-71%" },
      { label: "Encuesta de experiencia tenant", value: "92%", sub: "subió desde 67%" },
      { label: "Ahorro anual", value: "$1.8M MXN" },
    ],
    quote: {
      text: "Los inquilinos sienten que están en una torre del 2030. La tecnología se convirtió en argumento de renta.",
      author: "Lucía Ramos",
      role: "Property Manager",
    },
    timeline: "Despliegue en 20 días",
    scope: "1 KettyBot Pro · 2 CC1 · 3 SH1 · 14 pisos",
  },
];
