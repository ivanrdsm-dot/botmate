export type RobotCategory = "delivery" | "cleaning" | "logistics" | "guidance";

export type Robot = {
  slug: string;
  name: string;
  tagline: string;
  category: RobotCategory;
  brand: "Pudu Robotics" | "BotMate";
  description: string;
  highlights: string[];
  specs: { label: string; value: string }[];
  useCases: string[];
  hero?: string;
  badge?: string;
};

export const robots: Robot[] = [
  {
    slug: "bellabot-pro",
    name: "BellaBot Pro",
    tagline: "El robot mesero más querido del mundo",
    category: "delivery",
    brand: "Pudu Robotics",
    description:
      "BellaBot Pro entrega platillos y bebidas con expresiones faciales que enamoran a los clientes. Carga hasta 40 kg y reduce los pasos de tus meseros en un 60%.",
    highlights: [
      "Pantalla facial interactiva con más de 20 expresiones",
      "Capacidad de carga 40 kg en 4 bandejas",
      "Navegación SLAM con cámaras 3D y LiDAR",
      "Modos: entrega, regreso, cruise y greeting",
    ],
    specs: [
      { label: "Carga máxima", value: "40 kg" },
      { label: "Bandejas", value: "4 niveles" },
      { label: "Autonomía", value: "12-24 horas" },
      { label: "Velocidad", value: "0.5 – 1.2 m/s" },
      { label: "Navegación", value: "SLAM + LiDAR + 3D" },
    ],
    useCases: ["Restaurantes", "Hoteles", "Buffet", "Banquetes"],
    badge: "Más vendido",
  },
  {
    slug: "kettybot-pro",
    name: "KettyBot Pro",
    tagline: "Bienvenida, marketing y entrega en un solo robot",
    category: "guidance",
    brand: "Pudu Robotics",
    description:
      "KettyBot Pro combina entrega ágil con una pantalla publicitaria 18.5\" para campañas dinámicas. Ideal para anfitrionería, promociones y acompañamiento.",
    highlights: [
      "Pantalla publicitaria 18.5\" frontal",
      "Diseño esbelto para pasillos angostos (53 cm)",
      "Reconocimiento de voz y rostro",
      "CMS publicitario integrado",
    ],
    specs: [
      { label: "Carga máxima", value: "15 kg" },
      { label: "Pantalla", value: "18.5\" FHD" },
      { label: "Ancho", value: "53 cm" },
      { label: "Autonomía", value: "Hasta 16 horas" },
      { label: "Navegación", value: "SLAM + visión profunda" },
    ],
    useCases: ["Restaurantes", "Retail", "Eventos", "Marketing experiencial"],
    badge: "Marketing 360°",
  },
  {
    slug: "swiftbot",
    name: "SwiftBot",
    tagline: "Hospitalidad premium con pantalla 18.5\"",
    category: "delivery",
    brand: "Pudu Robotics",
    description:
      "SwiftBot eleva la experiencia de servicio con pantalla publicitaria, sensores ultrasónicos y bandejas modulares. La opción favorita de hoteles boutique y restaurantes de alta cocina.",
    highlights: [
      "Doble pantalla con animaciones premium",
      "Bandejas modulares intercambiables",
      "Sensores ultrasónicos anti-caída",
      "Operación silenciosa <50 dB",
    ],
    specs: [
      { label: "Carga máxima", value: "40 kg" },
      { label: "Pantallas", value: "Dual HD" },
      { label: "Autonomía", value: "12 horas" },
      { label: "Ruido", value: "< 50 dB" },
    ],
    useCases: ["Hoteles", "Fine dining", "Spas", "Casinos"],
  },
  {
    slug: "flashbot",
    name: "FlashBot",
    tagline: "Entregas autónomas multi-piso para hoteles",
    category: "delivery",
    brand: "Pudu Robotics",
    description:
      "FlashBot navega elevadores, llama puertas automáticas y entrega amenidades 24/7 sin contacto. Integración con PMS hoteleros y plataformas de room service.",
    highlights: [
      "Integración con elevadores y puertas",
      "Compartimentos con cierre seguro",
      "API para PMS y POS",
      "Operación 24/7 sin supervisión",
    ],
    specs: [
      { label: "Carga máxima", value: "20 kg" },
      { label: "Compartimentos", value: "Hasta 4" },
      { label: "Conectividad", value: "WiFi + 4G + IoT" },
      { label: "Navegación", value: "Multi-piso" },
    ],
    useCases: ["Hoteles", "Hospitales", "Edificios corporativos"],
    badge: "Multi-piso",
  },
  {
    slug: "holabot",
    name: "HolaBot",
    tagline: "Bus-tender para alta rotación",
    category: "delivery",
    brand: "Pudu Robotics",
    description:
      "HolaBot soporta hasta 60 kg y recoge platillos sucios con un solo comando de voz. Triplica la productividad del personal de busser.",
    highlights: [
      "Capacidad de 60 kg en 4 bandejas profundas",
      "Comando por voz '¡Hola Bot!'",
      "Plataforma reforzada para vajilla",
      "Sensores anti-derrame",
    ],
    specs: [
      { label: "Carga máxima", value: "60 kg" },
      { label: "Activación", value: "Voz / pantalla" },
      { label: "Autonomía", value: "12 horas" },
    ],
    useCases: ["Restaurantes", "Buffets", "Comedores industriales"],
  },
  {
    slug: "cc1",
    name: "CC1 PuduScrub",
    tagline: "Limpieza comercial 4 en 1 totalmente autónoma",
    category: "cleaning",
    brand: "Pudu Robotics",
    description:
      "CC1 barre, aspira, friega y trapea de forma autónoma. Reduce hasta 80% del tiempo de limpieza en aeropuertos, plazas y corporativos.",
    highlights: [
      "4 funciones: barrer, aspirar, fregar, trapear",
      "Mapeo SLAM + IA de evitación de obstáculos",
      "Estación de auto-recarga y vaciado",
      "App de control y reportes en la nube",
    ],
    specs: [
      { label: "Rendimiento", value: "Hasta 1,000 m²/h" },
      { label: "Autonomía", value: "Hasta 4 horas" },
      { label: "Tanque limpio", value: "15 L" },
      { label: "Tanque sucio", value: "15 L" },
    ],
    useCases: ["Centros comerciales", "Aeropuertos", "Corporativos", "Hospitales"],
    badge: "4 en 1",
  },
  {
    slug: "sh1",
    name: "SH1",
    tagline: "Robot de limpieza compacto para espacios reducidos",
    category: "cleaning",
    brand: "Pudu Robotics",
    description:
      "Pensado para oficinas, hoteles y locales medianos. Limpia automáticamente durante horarios off-peak.",
    highlights: [
      "Diseño compacto y silencioso",
      "Programación nocturna",
      "Reportes de cobertura",
    ],
    specs: [
      { label: "Rendimiento", value: "Hasta 600 m²/h" },
      { label: "Autonomía", value: "3 horas" },
    ],
    useCases: ["Oficinas", "Hoteles", "Boutiques"],
  },
  {
    slug: "pudubot-2",
    name: "PuduBot 2",
    tagline: "Entrega industrial flexible",
    category: "logistics",
    brand: "Pudu Robotics",
    description:
      "PuduBot 2 cuenta con bandejas configurables para entregar piezas, documentos, alimentos o muestras en líneas de producción y campus.",
    highlights: [
      "Bandejas configurables",
      "Operación interior/exterior cubierto",
      "Integración con MES / WMS",
    ],
    specs: [
      { label: "Carga máxima", value: "60 kg" },
      { label: "Autonomía", value: "12 horas" },
    ],
    useCases: ["Manufactura", "Logística", "Campus corporativo"],
  },
  {
    slug: "t300",
    name: "T300",
    tagline: "AMR de carga 300 kg",
    category: "logistics",
    brand: "Pudu Robotics",
    description:
      "Robot autónomo móvil para transporte de cargas medianas en almacenes y plantas. Acoplable a estaciones de carga y elevadores.",
    highlights: [
      "Carga 300 kg",
      "Acoplamiento a roll containers",
      "Flota administrada por software RMS",
    ],
    specs: [
      { label: "Carga máxima", value: "300 kg" },
      { label: "Velocidad", value: "1.5 m/s" },
    ],
    useCases: ["E-commerce", "Almacén", "Manufactura ligera"],
  },
  {
    slug: "t600",
    name: "T600",
    tagline: "AMR de carga pesada 600 kg",
    category: "logistics",
    brand: "Pudu Robotics",
    description:
      "Solución de mayor capacidad para mover tarimas y unidades de carga pesada. Reduce hasta 60% el tiempo de picking & packing.",
    highlights: ["Carga 600 kg", "Apto para tarimas", "Integración con WMS"],
    specs: [
      { label: "Carga máxima", value: "600 kg" },
      { label: "Velocidad", value: "1.5 m/s" },
    ],
    useCases: ["Logística 3PL", "Manufactura", "Centros de distribución"],
    badge: "Heavy duty",
  },
];

export const categoryLabel: Record<RobotCategory, string> = {
  delivery: "Entrega y servicio",
  cleaning: "Limpieza autónoma",
  logistics: "Logística y carga",
  guidance: "Recepción y marketing",
};
