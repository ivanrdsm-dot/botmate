export type RobotCategory = "delivery" | "cleaning" | "logistics" | "guidance";

export type KeyFeature = { title: string; desc: string };

export type Robot = {
  slug: string;
  name: string;
  model?: string;
  tagline: string;
  slogan: string;
  category: RobotCategory;
  brand: "BotMate" | "Pudu Robotics";
  source?: string;
  verifiedAt?: string;
  imageNote?: string;
  description: string;
  highlights: string[];
  keyFeatures: KeyFeature[];
  specs: { label: string; value: string }[];
  useCases: string[];
  modes?: string[];
  awards?: string[];
  hero?: string;
  badge?: string;
  /** Path to main official product photo (in /public). */
  image?: string;
  /** Secondary image for gallery / hover state. */
  imageAlt?: string;
  /** Clip cinematográfico (loop, sin audio) para el banner de detalle. */
  video?: string;
};

const photo = (file: string) => `/photos/robots/${file}`;

export const robotImage = {
  "bellabot-pro": photo("botmate-serve.jpg"),
  "kettybot-pro": photo("botmate-ads.jpg"),
  "kettybot-pro-black": photo("botmate-ads-black.jpg"),
  "kettybot-pro-yellow": photo("botmate-ads-yellow.jpg"),
  swiftbot: photo("botmate-glide.jpg"),
  flashbot: photo("botmate-tower.jpg"),
  holabot: photo("botmate-carry.jpg"),
  cc1: "/media/cc1-complete.webp",
  sh1: photo("botmate-clean-mini.jpg"),
  "pudubot-2": photo("botmate-flex.jpg"),
  t300: photo("botmate-cargo-300.jpg"),
  t600: photo("botmate-cargo-600.jpg"),
} as const;

export const robots: Robot[] = [
  {
    slug: "botmate-serve",
    name: "BellaBot Pro",
    model: "BellaBot Pro",
    category: "delivery",
    brand: "Pudu Robotics",
    tagline: "Entrega de alimentos con una experiencia cercana.",
    slogan: "Entrega de alimentos con una experiencia cercana.",
    description:
      "Robot de servicio con bandejas y pantalla publicitaria. Permite organizar entregas y apoyar al equipo de atención en recorridos interiores.",
    highlights: [
      "Carga máxima: 40 kg",
      "Paso mínimo de referencia: 65 cm",
      "Pantalla para contenido publicitario",
    ],
    keyFeatures: [],
    specs: [
      {
        label: "Carga máxima",
        value: "40 kg (10 kg por bandeja)",
      },
      {
        label: "Paso mínimo",
        value: "65 cm",
      },
      {
        label: "Autonomía de referencia",
        value: "11 h sin carga",
      },
      {
        label: "Carga de batería",
        value: "4.5 h",
      },
    ],
    useCases: ["Restaurantes", "Hoteles", "Eventos"],
    source: "https://www.pudurobotics.com/en/products/bellabotpro",
    verifiedAt: "2026-09-13",
    image: "/photos/robots/botmate-serve.jpg",
    imageNote:
      "Imagen del archivo de producto existente; versión por confirmar.",
  },
  {
    slug: "botmate-ads",
    name: "KettyBot Pro",
    model: "KettyBot Pro",
    category: "guidance",
    brand: "Pudu Robotics",
    tagline: "Recepción, entrega y comunicación en pantalla.",
    slogan: "Recepción, entrega y comunicación en pantalla.",
    description:
      "Robot que combina una pantalla publicitaria con funciones de entrega y guía. La configuración de contenidos y recorridos se define según el espacio.",
    highlights: [
      "Pantalla de 18.5 pulgadas",
      "Modos de entrega y guía",
      "Detección de retiro en bandejas",
    ],
    keyFeatures: [],
    specs: [
      {
        label: "Pantalla publicitaria",
        value: "18.5 pulgadas",
      },
      {
        label: "Funciones",
        value: "Entrega, guía y publicidad",
      },
    ],
    useCases: ["Restaurantes", "Retail", "Eventos"],
    source: "https://www.pudurobotics.com/about/news/65bc885f3e0bf00039afdf11",
    verifiedAt: "2026-09-13",
    image: "/photos/robots/botmate-ads.jpg",
    imageNote:
      "Imagen del archivo de producto existente; versión por confirmar.",
  },
  {
    slug: "botmate-glide",
    name: "SwiftBot",
    model: "SwiftBot",
    category: "delivery",
    brand: "Pudu Robotics",
    tagline: "Servicio de entrega para espacios de hospitalidad.",
    slogan: "Servicio de entrega para espacios de hospitalidad.",
    description:
      "Robot de entrega para apoyar recorridos dentro de restaurantes y otros espacios de servicio. La viabilidad depende de la distribución y las condiciones del lugar.",
    highlights: ["Entrega en interiores", "Aplicaciones de hospitalidad"],
    keyFeatures: [],
    specs: [
      {
        label: "Tipo",
        value: "Robot de entrega",
      },
      {
        label: "Configuración",
        value: "Solicitar ficha de la versión ofertada",
      },
    ],
    useCases: ["Restaurantes", "Hoteles"],
    source: "https://www.pudurobotics.com/uk/product",
    verifiedAt: "2026-09-13",
    image: "/photos/robots/botmate-glide.jpg",
    imageNote:
      "Imagen del archivo de producto existente; versión por confirmar.",
  },
  {
    slug: "botmate-tower",
    name: "FlashBot",
    model: "FlashBot",
    category: "delivery",
    brand: "Pudu Robotics",
    tagline: "Entregas entre áreas de un edificio.",
    slogan: "Entregas entre áreas de un edificio.",
    description:
      "Robot orientado a la entrega en edificios. El uso de elevadores requiere una evaluación de compatibilidad e integración; no se asume incluido en cualquier instalación.",
    highlights: ["Entrega en edificios", "Integraciones sujetas a evaluación"],
    keyFeatures: [],
    specs: [
      {
        label: "Tipo",
        value: "Entrega en edificios",
      },
      {
        label: "Integración con elevadores",
        value: "Validar en sitio y en cotización",
      },
    ],
    useCases: ["Hoteles", "Edificios corporativos"],
    source: "https://www.pudurobotics.com/uk/product",
    verifiedAt: "2026-09-13",
    image: "/photos/robots/botmate-tower.jpg",
    imageNote:
      "Imagen del archivo de producto existente; versión por confirmar.",
  },
  {
    slug: "botmate-carry",
    name: "Pudu HolaBot",
    model: "Pudu HolaBot",
    category: "delivery",
    brand: "Pudu Robotics",
    tagline: "Apoyo en la recolección y traslado de vajilla.",
    slogan: "Apoyo en la recolección y traslado de vajilla.",
    description:
      "Robot de entrega con funciones de llamada y notificación para apoyar al personal en tareas de traslado. La carga y descarga de los artículos permanece a cargo del equipo humano.",
    highlights: ["Llamadas y notificaciones", "Traslado de vajilla"],
    keyFeatures: [],
    specs: [
      {
        label: "Carga máxima",
        value: "60 kg",
      },
      {
        label: "Operación",
        value: "Carga y descarga por el personal",
      },
    ],
    useCases: ["Restaurantes", "Comedores"],
    source: "https://www.pudurobotics.com/uk/product",
    verifiedAt: "2026-09-13",
  },
  {
    slug: "botmate-clean",
    name: "PUDU CC1",
    model: "PUDU CC1",
    category: "cleaning",
    brand: "Pudu Robotics",
    tagline: "Cuatro funciones para el cuidado de tus pisos.",
    slogan: "Cuatro funciones para el cuidado de tus pisos.",
    description:
      "Integra barrido, fregado, aspirado y trapeado. El modo, los consumibles y la estación se eligen según la superficie y la operación; las estaciones y ciertos accesorios se cotizan por separado.",
    highlights: [
      "Barrido, fregado, aspirado y trapeado",
      "Reanudación de tareas tras la recarga",
      "Reportes de limpieza",
    ],
    keyFeatures: [],
    specs: [
      {
        label: "Funciones",
        value: "Barrido, fregado, aspirado y trapeado",
      },
      {
        label: "Tanques",
        value: "15 L limpia / 15 L residual",
      },
      {
        label: "Autonomía de referencia",
        value: "5 h en fregado / 9 h trapeado silencioso",
      },
      {
        label: "Carga de batería",
        value: "Menos de 3 h",
      },
    ],
    useCases: ["Oficinas", "Retail", "Hoteles"],
    source: "https://www.pudurobotics.com/en/products/puduCC1",
    verifiedAt: "2026-09-13",
    image: "/media/cc1-complete.webp",
    imageNote:
      "Imagen del archivo de producto existente; versión por confirmar.",
  },
  {
    slug: "botmate-clean-mini",
    name: "PUDU SH1",
    model: "PUDU SH1",
    category: "cleaning",
    brand: "Pudu Robotics",
    tagline: "Limpieza de pisos con control del operador.",
    slogan: "Limpieza de pisos con control del operador.",
    description:
      "Fregadora vertical que una persona conduce durante la limpieza. Combina fregado y recuperación del agua para el cuidado diario de superficies comerciales.",
    highlights: [
      "Fregadora vertical de manejo manual",
      "Fregado y recuperación de agua",
    ],
    keyFeatures: [],
    specs: [
      {
        label: "Tipo",
        value: "Fregadora vertical",
      },
      {
        label: "Operación",
        value: "Conducida por una persona",
      },
    ],
    useCases: ["Restaurantes", "Retail", "Oficinas"],
    source: "https://www.pudurobotics.com/en/products/sh",
    verifiedAt: "2026-09-13",
    image: "/photos/robots/botmate-clean-mini.jpg",
    imageNote:
      "Imagen del archivo de producto existente; versión por confirmar.",
  },
  {
    slug: "botmate-flex",
    name: "PuduBot 2",
    model: "PuduBot 2",
    category: "delivery",
    brand: "Pudu Robotics",
    tagline: "Un robot de entrega adaptable a tu operación.",
    slogan: "Un robot de entrega adaptable a tu operación.",
    description:
      "Robot de entrega de propósito general con distintas configuraciones de accesorios. La selección de bandejas y rutas depende del material que se necesita transportar.",
    highlights: [
      "Entrega de propósito general",
      "Configuraciones con accesorios",
      "Recarga automática",
    ],
    keyFeatures: [],
    specs: [
      {
        label: "Tipo",
        value: "Robot de entrega universal",
      },
      {
        label: "Accesorios",
        value: "Validar configuración y compatibilidad",
      },
    ],
    useCases: ["Restaurantes", "Oficinas", "Manufactura"],
    source: "https://www.pudurobotics.com/products",
    verifiedAt: "2026-09-13",
    image: "/photos/robots/botmate-flex.jpg",
    imageNote:
      "Imagen del archivo de producto existente; versión por confirmar.",
  },
  {
    slug: "botmate-cargo-300",
    name: "PUDU T300",
    model: "PUDU T300",
    category: "logistics",
    brand: "Pudu Robotics",
    tagline: "Transporte de materiales entre estaciones.",
    slogan: "Transporte de materiales entre estaciones.",
    description:
      "Robot de transporte industrial para apoyar movimientos de carga. La versión estándar, los accesorios y las integraciones se seleccionan después de revisar el proceso.",
    highlights: [
      "Carga máxima: 300 kg",
      "Transporte de materiales",
      "Navegación VSLAM y LiDAR SLAM",
    ],
    keyFeatures: [],
    specs: [
      {
        label: "Carga máxima",
        value: "300 kg",
      },
      {
        label: "Tipo",
        value: "Transporte industrial",
      },
      {
        label: "Configuración",
        value: "Estándar o variantes por confirmar",
      },
    ],
    useCases: ["Almacenes", "Manufactura"],
    source: "https://www.pudurobotics.com/en/products/pudut300",
    verifiedAt: "2026-09-13",
    image: "/photos/robots/botmate-cargo-300.jpg",
    imageNote:
      "Imagen del archivo de producto existente; versión por confirmar.",
  },
  {
    slug: "botmate-cargo-600",
    name: "PUDU T600",
    model: "PUDU T600",
    category: "logistics",
    brand: "Pudu Robotics",
    tagline: "Transporte industrial para cargas mayores.",
    slogan: "Transporte industrial para cargas mayores.",
    description:
      "Familia de robots para movimiento de materiales de hasta 600 kg. Sus variantes tienen dimensiones y funciones distintas; confirma la versión antes de definir rutas y unidades de carga.",
    highlights: [
      "Carga máxima: 600 kg",
      "Versiones con configuraciones distintas",
    ],
    keyFeatures: [],
    specs: [
      {
        label: "Carga máxima",
        value: "600 kg",
      },
      {
        label: "Tipo",
        value: "Transporte industrial",
      },
      {
        label: "Versión",
        value: "Se confirma en la propuesta",
      },
    ],
    useCases: ["Logística", "Manufactura", "Almacenes"],
    source: "https://www.pudurobotics.com/en/products/pudut600",
    verifiedAt: "2026-09-13",
    image: "/photos/robots/botmate-cargo-600.jpg",
    imageNote:
      "Imagen del archivo de producto existente; versión por confirmar.",
  },
];

export const categoryLabel: Record<RobotCategory, string> = {
  delivery: "Entrega y servicio",
  cleaning: "Limpieza",
  logistics: "Logística y carga",
  guidance: "Recepción y publicidad",
};
