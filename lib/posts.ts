export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: "Guías" | "Comparativas" | "ROI" | "Tendencias" | "Casos";
  readMin: number;
  date: string; // ISO
  author: { name: string; role: string };
  cover: string;
  body: { type: "h2" | "p" | "ul" | "quote" | "callout"; content: string | string[] }[];
  tags: string[];
};

export const posts: Post[] = [
  {
    slug: "bellabot-vs-kettybot-cual-elegir",
    title: "BellaBot Pro vs KettyBot Pro: ¿Cuál es el robot ideal para tu restaurante?",
    excerpt:
      "Comparativa exhaustiva entre los dos modelos más populares de Pudu Robotics. Analizamos capacidad de carga, navegación, marketing y ROI para que tomes la mejor decisión.",
    category: "Comparativas",
    readMin: 7,
    date: "2026-04-22",
    author: { name: "Equipo BotMate", role: "Robotics Specialists" },
    cover: "compare",
    tags: ["BellaBot", "KettyBot", "Restaurantes", "Comparativa"],
    body: [
      { type: "p", content: "Elegir entre BellaBot Pro y KettyBot Pro es la pregunta más frecuente entre nuestros clientes restauranteros. Ambos son íconos de Pudu Robotics, pero responden a operaciones distintas. Esta guía resuelve la duda con datos." },
      { type: "h2", content: "Diferencias clave en 30 segundos" },
      { type: "ul", content: [
        "BellaBot Pro: 4 bandejas · 40 kg · pantalla facial expresiva · ancho 53 cm",
        "KettyBot Pro: 3 bandejas · 15 kg · pantalla publicitaria 18.5\" · ancho 47 cm",
        "BellaBot es para volumen y rotación. KettyBot es para marketing y pasillos angostos.",
      ]},
      { type: "h2", content: "Cuando elegir BellaBot Pro" },
      { type: "p", content: "Si tu restaurante mueve más de 250 platos por hora pico, BellaBot Pro es la elección. Su capacidad de 4 bandejas permite servir 4 mesas simultáneamente sin regresar a cocina." },
      { type: "h2", content: "Cuando elegir KettyBot Pro" },
      { type: "p", content: "Si tu modelo de negocio incluye monetizar pantalla publicitaria (cadenas de café, food courts, plazas) o tienes pasillos menores a 70 cm, KettyBot Pro suma marketing al servicio." },
      { type: "callout", content: "ROI promedio: BellaBot paga su renta con +9 mesas servidas al día. KettyBot lo hace con +6 mesas + ingresos publicitarios. En cadenas con marca propia, BellaBot suele ganar." },
      { type: "h2", content: "Veredicto" },
      { type: "p", content: "No es una decisión binaria. En el 38% de nuestras implementaciones recomendamos flota mixta: BellaBot para entrega masiva, KettyBot como anfitrión y marketing en entrada." },
    ],
  },
  {
    slug: "roi-renta-de-robots-restaurantes",
    title: "El ROI real de rentar robots en un restaurante mexicano",
    excerpt:
      "Hicimos los números con 14 clientes reales: cuánto ahorras, cuánto vendes más y en qué mes pagas la renta. Spoiler: el break-even es más rápido de lo que crees.",
    category: "ROI",
    readMin: 8,
    date: "2026-04-10",
    author: { name: "Equipo BotMate", role: "Robotics Specialists" },
    cover: "roi",
    tags: ["ROI", "Renta", "Restaurantes", "Métricas"],
    body: [
      { type: "p", content: "El argumento más común contra automatizar un restaurante es: 'cuesta caro'. Lo es solo si calculas mal. Esta guía descompone el ROI con números reales de 14 clientes BotMate en CDMX, GDL y MTY." },
      { type: "h2", content: "Costos: renta vs sueldo mesero" },
      { type: "ul", content: [
        "Renta promedio BellaBot Pro: $11,400 MXN/mes (todo incluido)",
        "Sueldo promedio mesero CDMX + prestaciones: $14,800 MXN/mes",
        "El robot no es sustituto, es multiplicador: libera al mesero para vender",
      ]},
      { type: "h2", content: "Ingresos incrementales" },
      { type: "p", content: "Con BellaBot, el mesero deja de cargar platos y pasa a sugerir postres, vinos y experiencias. Nuestros 14 clientes reportan en promedio +14% en ticket por la mesa atendida." },
      { type: "callout", content: "Break-even típico: mes 4-6. A partir del mes 7, cada peso de renta genera $2.30 MXN de utilidad incremental." },
      { type: "h2", content: "Deducción fiscal Plan México" },
      { type: "p", content: "La renta es 100% deducible. Si compras bajo el estímulo del Plan México, puedes deducir hasta 89% de la inversión en el ejercicio fiscal." },
      { type: "h2", content: "Cómo medir el tuyo" },
      { type: "p", content: "Pídenos una simulación gratuita: con tu ticket promedio, cubierto promedio y horario pico calculamos tu ROI estimado en menos de 10 minutos." },
    ],
  },
  {
    slug: "como-implementar-robot-en-restaurante",
    title: "Implementar un robot en tu restaurante: guía paso a paso (sin estrés)",
    excerpt:
      "Desde el mapeo SLAM hasta el primer turno con clientes. Te enseñamos qué esperar, qué preparar y los 5 errores que NO debes cometer.",
    category: "Guías",
    readMin: 10,
    date: "2026-03-28",
    author: { name: "Equipo BotMate", role: "Implementación" },
    cover: "guide",
    tags: ["Implementación", "Guía", "Restaurantes"],
    body: [
      { type: "p", content: "Implementar bien un robot de servicio es 80% preparación y 20% tecnología. Aquí te resumimos el proceso completo de BotMate." },
      { type: "h2", content: "1. Diagnóstico del sitio (día 1)" },
      { type: "p", content: "Visitamos tu local, medimos pasillos, identificamos zonas conflictivas (puertas batientes, alfombras gruesas, desniveles) y entendemos tu flujo de servicio." },
      { type: "h2", content: "2. Mapeo SLAM (día 2)" },
      { type: "p", content: "El robot navega tu restaurante con LiDAR y crea un mapa 3D. Configuramos rutas, puntos de pickup en cocina y mesas destino." },
      { type: "h2", content: "3. Capacitación al equipo (día 3-4)" },
      { type: "p", content: "Hosts, meseros y cocineros aprenden a operar pantalla, comandos por voz y protocolos de excepción. La mayoría aprende en menos de 30 minutos." },
      { type: "h2", content: "4. Soft launch (día 5-7)" },
      { type: "p", content: "Operación en sombra durante los servicios. El robot funciona, pero un mesero acompaña por si hay ajustes." },
      { type: "callout", content: "Errores comunes: pasillos saturados con sillas mal acomodadas, WiFi inestable, falta de pickup point claro en cocina, no informar al cliente que el robot llegará a su mesa, no usar las funciones de marketing." },
      { type: "h2", content: "5. Go-live y mejora continua" },
      { type: "p", content: "BotMate monitorea métricas semanales el primer mes: entregas exitosas, tiempo promedio, intervenciones humanas. Optimizamos rutas hasta obtener +95% de éxito autónomo." },
    ],
  },
  {
    slug: "limpieza-autonoma-cc1-vs-tradicional",
    title: "Limpieza autónoma CC1 vs cuadrilla tradicional: el caso financiero",
    excerpt:
      "Una plaza comercial de 80,000 m² descubrió que el CC1 ahorra 44% en costo de limpieza y libera al personal humano para tareas de mayor valor.",
    category: "Comparativas",
    readMin: 6,
    date: "2026-03-12",
    author: { name: "Equipo BotMate", role: "Operations" },
    cover: "cleaning",
    tags: ["CC1", "Limpieza", "Retail"],
    body: [
      { type: "p", content: "El CC1 PuduScrub barre, aspira, friega y trapea de forma autónoma. ¿Realmente vale la pena vs un equipo de limpieza humano? Hicimos el ejercicio." },
      { type: "h2", content: "Costo total por m²/año" },
      { type: "ul", content: [
        "Cuadrilla tradicional: $48 MXN/m²/año (mano de obra + supervisión + insumos)",
        "CC1 en renta: $27 MXN/m²/año (renta + electricidad + agua)",
        "Ahorro: 44% sostenido y predecible",
      ]},
      { type: "h2", content: "Lo que NO sustituye" },
      { type: "p", content: "El CC1 no reemplaza a tu equipo humano: lo libera. Los humanos siguen siendo necesarios para detalle, baños, vidrios y vaciado de basureros. El CC1 hace el trabajo pesado y repetitivo." },
      { type: "callout", content: "En plazas de >50,000 m² el ROI del CC1 se materializa en 11-14 meses. En oficinas grandes, en 9-11 meses." },
    ],
  },
  {
    slug: "futuro-robotica-mexico-2026",
    title: "El estado de la robótica de servicio en México 2026",
    excerpt:
      "Análisis del mercado mexicano: adopción por sector, principales jugadores, regulación y tendencias para los próximos 24 meses.",
    category: "Tendencias",
    readMin: 9,
    date: "2026-02-28",
    author: { name: "Equipo BotMate", role: "Research" },
    cover: "future",
    tags: ["Mercado", "Tendencias", "México"],
    body: [
      { type: "p", content: "México vive el momento más interesante en adopción de robótica de servicio de su historia. El Plan México, el nearshoring y el costo creciente de mano de obra empujan a empresas de todos los sectores a explorar automatización." },
      { type: "h2", content: "Crecimiento por sector" },
      { type: "ul", content: [
        "Restaurantes: +210% YoY en flota desplegada",
        "Hotelería: +140% YoY, principalmente Cancún-Riviera y CDMX",
        "Manufactura: AMR de carga creció 360% por nearshoring",
        "Salud: aún incipiente, pero con 5 hospitales pioneros en CDMX y MTY",
      ]},
      { type: "h2", content: "El factor Plan México" },
      { type: "p", content: "El estímulo fiscal de hasta 89% de deducción está acelerando decisiones que tomarían meses. Las empresas están aprovechando el ejercicio fiscal 2026 para automatizar." },
      { type: "h2", content: "Predicciones BotMate" },
      { type: "ul", content: [
        "2026: 5,000+ robots de servicio operando en México",
        "2027: integración masiva con IA generativa (robots que conversan)",
        "2028: primeros robots con piernas en hotelería premium",
      ]},
    ],
  },
  {
    slug: "guia-fiscal-plan-mexico-robots",
    title: "Plan México: cómo deducir hasta 89% al comprar robots",
    excerpt:
      "Te explicamos paso a paso cómo aplicar el estímulo fiscal del Plan México a tu inversión en robots de servicio, sin letra pequeña.",
    category: "ROI",
    readMin: 6,
    date: "2026-02-14",
    author: { name: "Equipo BotMate", role: "Finance" },
    cover: "tax",
    tags: ["Fiscal", "Plan México", "Deducción"],
    body: [
      { type: "p", content: "El Plan México incluye estímulos fiscales para empresas que invierten en innovación, automatización y tecnologías limpias. Los robots de servicio aplican en ambas categorías." },
      { type: "h2", content: "Quién puede aplicar" },
      { type: "ul", content: [
        "Personas morales bajo régimen general",
        "MIPYMES con activos elegibles",
        "Empresas que demuestren impacto en productividad o sostenibilidad",
      ]},
      { type: "h2", content: "Cómo se aplica" },
      { type: "p", content: "Se trata de una deducción inmediata acelerada que permite restar hasta 89% del costo de adquisición del activo en el ejercicio fiscal donde se compra. Aplica también a renta financiera." },
      { type: "callout", content: "Importante: consulta siempre con tu contador o fiscalista. BotMate proporciona la documentación técnica que respalda el activo." },
    ],
  },
];
