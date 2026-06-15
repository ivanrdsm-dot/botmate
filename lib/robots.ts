export type RobotCategory = "delivery" | "cleaning" | "logistics" | "guidance";

export type KeyFeature = { title: string; desc: string };

export type Robot = {
  slug: string;
  name: string;
  model?: string;
  tagline: string;
  slogan: string;
  category: RobotCategory;
  brand: "Pudu Robotics" | "BotMate";
  description: string;
  highlights: string[];
  keyFeatures: KeyFeature[];
  specs: { label: string; value: string }[];
  useCases: string[];
  modes?: string[];
  awards?: string[];
  hero?: string;
  badge?: string;
};

export const robots: Robot[] = [
  {
    slug: "bellabot-pro",
    name: "BellaBot Pro",
    model: "BellaBot Pro",
    tagline: "El robot mesero premium con expresiones que enamoran",
    slogan: "Robot de entrega premium con interacción emocional avanzada",
    category: "delivery",
    brand: "Pudu Robotics",
    description:
      "BellaBot Pro es la evolución del icónico robot mesero más querido del mundo. Combina pantalla facial emotiva, cámaras 3D de profundidad, sensores ultrasónicos y bandejas para 4 niveles que entregan hasta 40 kg con la mejor experiencia de servicio del mercado.",
    highlights: [
      "Pantalla facial con +20 expresiones emocionales",
      "Carga útil de 40 kg distribuida en 4 bandejas",
      "Navegación PUDU SLAM con LiDAR + visión 3D",
      "Modos: entrega, regreso, crucero, cumpleaños y greeting",
      "Tactile touch: caricia en la cabeza activa respuesta",
    ],
    keyFeatures: [
      {
        title: "Pantalla facial emotiva",
        desc: "Pantalla doble con más de 20 expresiones faciales animadas que reaccionan al servicio, al cliente y al entorno.",
      },
      {
        title: "Sensación de seguridad multinivel",
        desc: "Combinación de LiDAR 360°, cámaras de profundidad RGBD, sensores ultrasónicos y de caída para evitar obstáculos en tiempo real.",
      },
      {
        title: "4 bandejas inteligentes con sensor",
        desc: "Cada bandeja detecta si el platillo fue retirado, permite entregas multi-mesa en un solo viaje y soporta carga útil de 40 kg.",
      },
      {
        title: "Modos de operación versátiles",
        desc: "Entrega, regreso, crucero, marketing y cumpleaños — todo configurable desde pantalla o app PUDU Link.",
      },
    ],
    specs: [
      { label: "Modelo", value: "BellaBot Pro" },
      { label: "Carga máxima", value: "40 kg" },
      { label: "Bandejas", value: "4 niveles" },
      { label: "Pantalla", value: "Doble HD frontal y trasera" },
      { label: "Velocidad", value: "0.5 – 1.2 m/s" },
      { label: "Autonomía", value: "12 – 24 horas" },
      { label: "Ancho de paso", value: "55 cm" },
      { label: "Navegación", value: "PUDU SLAM · LiDAR + visión 3D" },
      { label: "Sensores", value: "LiDAR 360° · RGBD · Ultrasónicos · Caída" },
      { label: "Conectividad", value: "Wi-Fi · BLE · 4G opcional" },
    ],
    useCases: ["Restaurantes", "Hoteles", "Buffet", "Banquetes"],
    modes: ["Entrega", "Regreso", "Crucero", "Greeting", "Cumpleaños"],
    badge: "Más vendido",
  },
  {
    slug: "kettybot-pro",
    name: "KettyBot Pro",
    model: "KettyBot Pro",
    tagline: "Anfitrión + publicidad + entrega en un solo robot",
    slogan: "El robot anfitrión con la pantalla publicitaria más grande del mercado",
    category: "guidance",
    brand: "Pudu Robotics",
    description:
      "KettyBot Pro combina entrega ágil con la pantalla publicitaria frontal más grande de su categoría: 18.5\" FHD. Ideal para anfitrionería, marketing experiencial y campañas dinámicas. Su diseño ultra-esbelto navega pasillos de hasta 55 cm.",
    highlights: [
      "Pantalla publicitaria frontal 18.5\" FHD",
      "Ancho ultra esbelto para pasillos angostos",
      "CMS publicitario integrado con métricas",
      "Reconocimiento facial y de voz",
      "Modos: entrega + marketing + guía + greeting",
    ],
    keyFeatures: [
      {
        title: "Pantalla 18.5\" FHD para campañas dinámicas",
        desc: "Reproduce videos, imágenes y QR de tus marcas, sincronizado con un CMS web para programar campañas por hora, día y zona.",
      },
      {
        title: "Anfitrión inteligente",
        desc: "Detecta llegada de clientes, los saluda, los guía a su mesa y registra interacciones con cámara de profundidad.",
      },
      {
        title: "Diseño esbelto certificado",
        desc: "Ancho de 55 cm para navegar pasillos angostos de restaurantes, food courts y tiendas retail sin chocar con sillas.",
      },
      {
        title: "Métricas publicitarias en la nube",
        desc: "Reportes de impresiones, alcance estimado y heatmaps de zonas frecuentadas listos para vender a tus marcas patrocinadoras.",
      },
    ],
    specs: [
      { label: "Modelo", value: "KettyBot Pro" },
      { label: "Pantalla principal", value: "18.5\" FHD frontal" },
      { label: "Pantalla secundaria", value: "Trasera HD" },
      { label: "Carga máxima", value: "15 kg" },
      { label: "Ancho", value: "55 cm" },
      { label: "Velocidad", value: "0.5 – 1.2 m/s" },
      { label: "Autonomía", value: "Hasta 16 horas" },
      { label: "Tiempo de carga", value: "4 horas" },
      { label: "Navegación", value: "PUDU SLAM · visión profunda" },
      { label: "CMS", value: "Plataforma web BotMate Ads" },
    ],
    useCases: ["Restaurantes", "Retail", "Eventos", "Marketing experiencial"],
    modes: ["Entrega", "Marketing", "Guía", "Greeting"],
    badge: "Marketing 360°",
  },
  {
    slug: "swiftbot",
    name: "SwiftBot",
    model: "SwiftBot",
    tagline: "Hospitalidad premium con doble pantalla animada",
    slogan: "El robot de entrega para experiencias premium en hotelería y fine dining",
    category: "delivery",
    brand: "Pudu Robotics",
    description:
      "SwiftBot eleva la experiencia de servicio con pantallas duales animadas, bandejas modulares intercambiables y operación silenciosa <50 dB. La opción favorita de hoteles boutique, restaurantes de alta cocina, spas y casinos premium.",
    highlights: [
      "Doble pantalla con animaciones premium",
      "Bandejas modulares intercambiables",
      "Sensores ultrasónicos anti-caída",
      "Operación silenciosa <50 dB",
      "Diseño elegante para entornos exclusivos",
    ],
    keyFeatures: [
      {
        title: "Diseño premium para entornos exclusivos",
        desc: "Acabados blancos satinados, iluminación LED contextual y movimientos suaves diseñados para hoteles y fine dining.",
      },
      {
        title: "Bandejas modulares",
        desc: "Cambia bandejas por compartimentos cerrados, jaulas o porta-vinos según la operación del día.",
      },
      {
        title: "Operación ultra silenciosa",
        desc: "Menos de 50 dB para no interrumpir conversaciones de huéspedes en lobbies, restaurantes y salones VIP.",
      },
      {
        title: "Pantallas animadas duales",
        desc: "Sincroniza saludos personalizados, branding del hotel y promociones del bar con animaciones premium.",
      },
    ],
    specs: [
      { label: "Modelo", value: "SwiftBot" },
      { label: "Carga máxima", value: "40 kg" },
      { label: "Bandejas", value: "Modulares intercambiables" },
      { label: "Pantallas", value: "Duales HD animadas" },
      { label: "Autonomía", value: "12 horas" },
      { label: "Ruido", value: "< 50 dB(A)" },
      { label: "Velocidad", value: "0.5 – 1.2 m/s" },
      { label: "Navegación", value: "PUDU SLAM" },
    ],
    useCases: ["Hoteles", "Fine dining", "Spas", "Casinos"],
    modes: ["Servicio", "Crucero", "Promociones"],
  },
  {
    slug: "flashbot",
    name: "FlashBot",
    model: "FlashBot",
    tagline: "Entregas autónomas multi-piso para hoteles 24/7",
    slogan: "Robot de entrega completamente cerrado, multi-piso y con integración IoT",
    category: "delivery",
    brand: "Pudu Robotics",
    description:
      "FlashBot navega elevadores, abre puertas automáticas y entrega amenidades 24/7 sin contacto. Diseño cerrado con compartimentos seguros y código de apertura por SMS. Integración nativa con PMS hoteleros y plataformas de room service.",
    highlights: [
      "Integración con elevadores y puertas automáticas",
      "Compartimentos cerrados con código por SMS",
      "API para PMS hoteleros (Opera, OTA)",
      "Operación 24/7 sin supervisión",
      "Conectividad 4G + IoT + LoRa",
    ],
    keyFeatures: [
      {
        title: "Integración multi-piso",
        desc: "Llama al elevador, presiona el piso destino, abre puertas automáticas y entrega al huésped sin intervención humana.",
      },
      {
        title: "Compartimentos seguros",
        desc: "Hasta 4 compartimentos cerrados con código generado por SMS o app del hotel — solo el destinatario abre.",
      },
      {
        title: "Conectividad nativa al PMS",
        desc: "APIs y conectores listos para Opera, Salto, Cloudbeds y otras plataformas hoteleras.",
      },
      {
        title: "Operación 24/7 sin contacto",
        desc: "Diseñado para servicios nocturnos sin staff: amenidades, room service, lavandería y entregas exprés.",
      },
    ],
    specs: [
      { label: "Modelo", value: "FlashBot" },
      { label: "Carga máxima", value: "20 kg" },
      { label: "Compartimentos", value: "Hasta 4 cerrados" },
      { label: "Conectividad", value: "Wi-Fi · 4G · LoRa · IoT" },
      { label: "Navegación", value: "Multi-piso · PUDU SLAM" },
      { label: "Autonomía", value: "12-15 horas" },
      { label: "Apertura", value: "Código SMS / app / face ID" },
    ],
    useCases: ["Hoteles", "Hospitales", "Edificios corporativos"],
    modes: ["Room service", "Amenidades", "Lavandería", "Entrega exprés"],
    badge: "Multi-piso",
  },
  {
    slug: "holabot",
    name: "HolaBot",
    model: "HolaBot",
    tagline: "Bus-tender de alta capacidad para rotación rápida",
    slogan: "El robot busser que soporta 60 kg y se activa con tu voz",
    category: "delivery",
    brand: "Pudu Robotics",
    description:
      "HolaBot soporta hasta 60 kg en 4 bandejas profundas y recoge platillos sucios con un solo comando de voz \"¡Hola Bot!\". Triplica la productividad del personal de busser en restaurantes de alto volumen y comedores industriales.",
    highlights: [
      "Capacidad de 60 kg en 4 bandejas profundas",
      "Comando por voz '¡Hola Bot!'",
      "Plataforma reforzada para vajilla y bandejas",
      "Sensores anti-derrame y anti-vibración",
      "Diseño robusto para cocinas y back-of-house",
    ],
    keyFeatures: [
      {
        title: "Carga útil de 60 kg",
        desc: "La mayor capacidad de su segmento. Aguanta vajilla pesada, charolas de catering y contenedores industriales.",
      },
      {
        title: "Activación por voz",
        desc: "Tu equipo dice '¡Hola Bot!' y el robot llega a la mesa lista para recoger.",
      },
      {
        title: "Bandejas profundas",
        desc: "Diseño tipo busser pan para evitar derrames y permitir carga vertical de copas y vasos.",
      },
      {
        title: "Estabilidad reforzada",
        desc: "Chasis y suspensión optimizados para mover cargas pesadas sin vibrar ni derramar.",
      },
    ],
    specs: [
      { label: "Modelo", value: "HolaBot" },
      { label: "Carga máxima", value: "60 kg" },
      { label: "Bandejas", value: "4 profundas" },
      { label: "Activación", value: "Voz / pantalla / app" },
      { label: "Autonomía", value: "12 horas" },
      { label: "Velocidad", value: "0.5 – 1.2 m/s" },
      { label: "Navegación", value: "PUDU SLAM" },
    ],
    useCases: ["Restaurantes alto volumen", "Buffets", "Comedores industriales"],
    modes: ["Busser", "Entrega", "Regreso"],
  },
  {
    slug: "cc1",
    name: "CC1",
    model: "CC1 · PuduScrub",
    tagline: "Robot inteligente de limpieza comercial · 4 en 1",
    slogan: "Funciones de barrido, fregado, aspirado y trapeado en un solo equipo",
    category: "cleaning",
    brand: "Pudu Robotics",
    description:
      "CC1 integra cuatro capacidades de limpieza —barrido, fregado, aspirado y trapeado— con potencia de succión de hasta 17,000 Pa que no deja manchas. Apto para pisos duros y alfombras suaves con estación de auto-recarga, auto-vaciado y auto-rellenado de agua.",
    highlights: [
      "4 funciones en uno: barre, friega, aspira y trapea",
      "Potencia de succión 17,000 Pa que no deja manchas",
      "Estación dedicada de carga y agua automática",
      "Navegación PUDU SLAM con LiDAR + visión",
      "Reanudación desde punto de interrupción",
      "Reportes digitales en tiempo real",
    ],
    keyFeatures: [
      {
        title: "Limpieza 4 en 1",
        desc: "Un solo robot integra barrido, fregado, aspirado y trapeado. Cambia entre modos sin intervención humana.",
      },
      {
        title: "Succión 17,000 Pa",
        desc: "Potencia super alta que no deja manchas ni residuos. Apto para pisos duros, granito, mármol y alfombras suaves.",
      },
      {
        title: "Estación inteligente con agua",
        desc: "Carga automática y adición y drenaje automático de agua mediante estación de acoplamiento dedicada.",
      },
      {
        title: "Navegación PUDU SLAM",
        desc: "Mapeo SLAM con sensores LiDAR y visuales. Reanuda la limpieza exactamente donde se quedó tras una pausa.",
      },
      {
        title: "Reportes en tiempo real",
        desc: "Notificaciones en tiempo real y generación de reportes digitales con cobertura, tiempo y áreas pendientes.",
      },
    ],
    specs: [
      { label: "Modelo", value: "CC1 · PuduScrub" },
      { label: "Modos de limpieza", value: "Barrido · Trapeado · Fregado · Aspirado" },
      { label: "Potencia de succión", value: "Máx 17,000 Pa" },
      { label: "Eficiencia", value: "700 – 1,000 m²/h" },
      { label: "Tanque agua limpia", value: "15 L" },
      { label: "Tanque agua residual", value: "15 L" },
      { label: "Autonomía fregado", value: "5 h" },
      { label: "Autonomía trapeado silencioso", value: "9 h" },
      { label: "Tiempo de carga", value: "< 3 horas" },
      { label: "Ruido operativo", value: "< 70 dB(A)" },
      { label: "Velocidad máxima", value: "1.2 m/s" },
      { label: "Navegación", value: "PUDU SLAM (LiDAR + visión)" },
    ],
    useCases: [
      "Edificio de oficinas",
      "Educación",
      "Retail",
      "Alimentos y bebidas",
      "Transporte público",
      "Salud",
      "Manufactura",
      "Hospitalidad",
    ],
    modes: ["Barrido", "Fregado", "Aspirado", "Trapeado", "Silencioso nocturno"],
    badge: "4 en 1",
  },
  {
    slug: "sh1",
    name: "SH1",
    model: "SH1",
    tagline: "Robot de limpieza compacto para espacios reducidos",
    slogan: "Limpieza autónoma silenciosa para oficinas y hoteles",
    category: "cleaning",
    brand: "Pudu Robotics",
    description:
      "Pensado para oficinas medianas, hoteles y locales comerciales. Limpia automáticamente durante horarios off-peak con operación silenciosa y reportes de cobertura en la nube.",
    highlights: [
      "Diseño compacto y ultra silencioso",
      "Programación nocturna inteligente",
      "Reportes de cobertura en la nube",
      "Estación de carga inalámbrica",
    ],
    keyFeatures: [
      {
        title: "Compacto y silencioso",
        desc: "Diseñado para oficinas y áreas comerciales medianas donde el espacio y el ruido importan.",
      },
      {
        title: "Programación inteligente",
        desc: "Define horarios de limpieza nocturna automatizada con apagado automático al terminar.",
      },
      {
        title: "Reportes en la nube",
        desc: "Visualiza cobertura, tiempo y rutas desde dashboard web BotMate Insights.",
      },
    ],
    specs: [
      { label: "Modelo", value: "SH1" },
      { label: "Eficiencia", value: "Hasta 600 m²/h" },
      { label: "Autonomía", value: "3 horas" },
      { label: "Navegación", value: "PUDU SLAM" },
      { label: "Ruido", value: "< 60 dB(A)" },
    ],
    useCases: ["Oficinas", "Hoteles", "Boutiques", "Áreas comunes"],
    modes: ["Limpieza profunda", "Limpieza ligera", "Modo silencioso"],
  },
  {
    slug: "pudubot-2",
    name: "PuduBot 2",
    model: "PuduBot 2",
    tagline: "El nuevo robot de entrega universal con PUDU VSLAM+",
    slogan: "Robot de entrega universal con despliegue 75% más rápido",
    category: "logistics",
    brand: "Pudu Robotics",
    description:
      "PuduBot 2 es la siguiente generación con tecnología PUDU VSLAM+ que reduce el tiempo de despliegue un 75%. Opera en entornos con techos de hasta 30 metros y mapea escenas de hasta 40,000 m². Bandejas configurables hasta 7 niveles con doble LiDAR y chasis de líder industrial.",
    highlights: [
      "PUDU VSLAM+: despliegue 75% más rápido",
      "Opera con techos de hasta 30 metros",
      "Mapeo en escenas de hasta 40,000 m²",
      "Doble LiDAR para detección 360°",
      "Hasta 7 bandejas configurables",
      "Auto-recarga sin intervención manual",
    ],
    keyFeatures: [
      {
        title: "PUDU VSLAM+ sin marcadores",
        desc: "Nueva generación de tecnología sin marcadores que reduce el tiempo de despliegue en un 75% y opera en entornos con techos altos.",
      },
      {
        title: "Doble LiDAR de seguridad",
        desc: "Detección 360° con visión completa de las características ambientales. Mejora la estabilidad de movimiento un 30%.",
      },
      {
        title: "Bandejas configurables",
        desc: "3 bandejas estándar, hasta 7 configurables según la operación. Tamaño 52×43.2 cm con sensor de retiro.",
      },
      {
        title: "PUDU OS plataforma abierta",
        desc: "SDK abierto, conectividad Type-C, 4G, LoRa y Wi-Fi. Compatible con Pudu Watch, Pudu Pager y Pudu Link.",
      },
    ],
    specs: [
      { label: "Modelo", value: "PuduBot 2" },
      { label: "Dimensiones", value: "58 × 53.5 × 129 cm" },
      { label: "Tamaño de bandeja", value: "52 × 43.2 cm" },
      { label: "Peso", value: "39 kg" },
      { label: "Carga máxima", value: "40 kg" },
      { label: "Bandejas", value: "3 estándar · hasta 7 configurables" },
      { label: "Autonomía", value: "12 – 15 horas" },
      { label: "Tiempo de carga", value: "4 horas" },
      { label: "Ancho de paso", value: "80 cm" },
      { label: "Velocidad", value: "0.5 – 1.2 m/s" },
      { label: "Batería", value: "Li-ion alto rendimiento" },
      { label: "Carga", value: "Cable y auto-carga" },
      { label: "Navegación", value: "PUDU VSLAM+ (sin marcadores)" },
      { label: "Sensores", value: "Doble LiDAR · cámaras RGBD" },
      { label: "Conectividad", value: "Type-C · 4G · LoRa · Wi-Fi" },
      { label: "SDK", value: "PUDU OS · plataforma abierta" },
    ],
    useCases: [
      "Manufactura",
      "Hospitales y clínicas",
      "Entretenimiento",
      "Retail",
      "Edificios de oficinas",
    ],
    modes: ["Entrega", "Cumpleaños", "Crucero", "Devolución"],
    awards: [
      "100+ premios internacionales",
      "11M+ horas de trabajo acumuladas",
      "8,000+ socios globales",
      "80% cuota de mercado global Pudu",
    ],
    badge: "Nuevo · VSLAM+",
  },
  {
    slug: "t300",
    name: "T300",
    model: "T300",
    tagline: "AMR de carga industrial 300 kg",
    slogan: "Robot autónomo móvil para transporte de carga media en almacenes",
    category: "logistics",
    brand: "Pudu Robotics",
    description:
      "Robot autónomo móvil para transporte de cargas medianas en almacenes, plantas de manufactura y campus industriales. Acoplable a estaciones de carga y elevadores con flota administrada por software RMS.",
    highlights: [
      "Carga útil 300 kg",
      "Acoplamiento a roll containers",
      "Flota administrada por RMS",
      "Integración con WMS y MES",
      "Navegación SLAM industrial",
    ],
    keyFeatures: [
      {
        title: "Carga útil 300 kg",
        desc: "Ideal para transporte de piezas, materia prima y unidades de carga ligera entre estaciones.",
      },
      {
        title: "Acoplamiento automático",
        desc: "Se acopla a roll containers y carros de logística sin intervención humana.",
      },
      {
        title: "Flota administrada",
        desc: "Software RMS para coordinar flotas, rutas y prioridades en tiempo real.",
      },
    ],
    specs: [
      { label: "Modelo", value: "T300" },
      { label: "Carga máxima", value: "300 kg" },
      { label: "Velocidad", value: "1.5 m/s" },
      { label: "Navegación", value: "SLAM industrial" },
      { label: "Integraciones", value: "WMS · MES · RMS" },
    ],
    useCases: ["E-commerce", "Almacén", "Manufactura ligera"],
    modes: ["Pick-and-place", "Transporte", "Flota"],
  },
  {
    slug: "t600",
    name: "T600",
    model: "T600",
    tagline: "AMR heavy-duty de hasta 600 kg",
    slogan: "Solución de mayor capacidad para tarimas y carga pesada",
    category: "logistics",
    brand: "Pudu Robotics",
    description:
      "Solución de mayor capacidad para mover tarimas y unidades de carga pesada en CEDIS y plantas. Reduce hasta 60% el tiempo de picking & packing con flotas coordinadas por RMS y APIs para WMS.",
    highlights: [
      "Carga útil 600 kg",
      "Apto para tarimas estándar",
      "Reduce 60% el tiempo de picking & packing",
      "Integración con WMS Manhattan, SAP, Oracle",
      "Velocidad 1.5 m/s en cargas máximas",
    ],
    keyFeatures: [
      {
        title: "Heavy-duty real",
        desc: "Soporta tarimas estándar de hasta 600 kg con chasis reforzado y suspensión adaptativa.",
      },
      {
        title: "Reducción de picking 60%",
        desc: "Combinado con WMS y RMS reduce el tiempo de picking & packing hasta un 60% en CEDIS de e-commerce.",
      },
      {
        title: "Integración empresarial",
        desc: "APIs y conectores para Manhattan, SAP, Oracle y plataformas WMS de uso común.",
      },
    ],
    specs: [
      { label: "Modelo", value: "T600" },
      { label: "Carga máxima", value: "600 kg" },
      { label: "Velocidad", value: "1.5 m/s" },
      { label: "Tipo de carga", value: "Tarimas estándar" },
      { label: "Navegación", value: "SLAM industrial · 360°" },
      { label: "Integraciones", value: "WMS · MES · RMS" },
    ],
    useCases: ["Logística 3PL", "Manufactura", "Centros de distribución"],
    modes: ["Tarimas", "Flotas", "Multi-zona"],
    badge: "Heavy duty",
  },
];

export const categoryLabel: Record<RobotCategory, string> = {
  delivery: "Entrega y servicio",
  cleaning: "Limpieza autónoma",
  logistics: "Logística y carga",
  guidance: "Recepción y marketing",
};
