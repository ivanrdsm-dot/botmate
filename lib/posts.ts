export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: "Guías" | "Comparativas" | "ROI" | "Tendencias" | "Casos";
  readMin: number;
  date: string; // ISO
  author: { name: string; role: string };
  cover: string;
  body: {
    type: "h2" | "p" | "ul" | "quote" | "callout";
    content: string | string[];
  }[];
  tags: string[];
};

export const posts: Post[] = [
  {
    slug: "botmate-serve-vs-botmate-ads-cual-elegir",
    title: "Entrega o publicidad: cómo definir la prioridad de tu robot",
    excerpt:
      "Una guía para elegir según la tarea, el recorrido y el contenido que necesita tu negocio.",
    category: "Comparativas",
    readMin: 2,
    date: "2026-09-13",
    author: {
      name: "Botmate",
      role: "Guías de evaluación",
    },
    cover: "compare",
    tags: ["Evaluación", "Robótica de servicio"],
    body: [
      {
        type: "h2",
        content: "Empieza por la tarea",
      },
      {
        type: "p",
        content:
          "Anota qué se transporta, cuántas veces se repite el recorrido y quién carga y descarga. Si tu prioridad es comunicar, define el contenido, el público y el punto de interacción antes de elegir la pantalla.",
      },
      {
        type: "h2",
        content: "Compara el espacio de trabajo",
      },
      {
        type: "ul",
        content: [
          "Mide los pasillos con mobiliario en su posición habitual.",
          "Considera cruces con personas y zonas de espera.",
          "Identifica pisos, desniveles y puntos de carga.",
        ],
      },
      {
        type: "h2",
        content: "Pide una demostración relevante",
      },
      {
        type: "p",
        content:
          "La demostración debe representar la tarea que necesitas resolver. Observa el recorrido completo, la interacción con el equipo humano y lo que sucede cuando el robot encuentra un obstáculo. Un accesorio publicitario o una bandeja puede cambiar la configuración necesaria.",
      },
    ],
  },
  {
    slug: "roi-renta-de-robots-restaurantes",
    title: "Cómo evaluar el costo de incorporar un robot",
    excerpt:
      "Organiza los costos y las mediciones de tu operación antes de comparar renta y compra.",
    category: "Guías",
    readMin: 2,
    date: "2026-09-13",
    author: {
      name: "Botmate",
      role: "Guías de evaluación",
    },
    cover: "roi",
    tags: ["Evaluación", "Robótica de servicio"],
    body: [
      {
        type: "h2",
        content: "Define qué quieres medir",
      },
      {
        type: "p",
        content:
          "Elige una tarea concreta y registra cómo se realiza hoy: frecuencia, duración de los recorridos y personas involucradas. Evita atribuir a la robótica cambios que también pueden deberse al horario, al personal o a la demanda.",
      },
      {
        type: "h2",
        content: "Compara el costo completo",
      },
      {
        type: "ul",
        content: [
          "Equipo y accesorios de la versión seleccionada.",
          "Traslado, instalación e integraciones.",
          "Capacitación, mantenimiento y consumibles.",
          "Tiempo de preparación y seguimiento del equipo.",
        ],
      },
      {
        type: "h2",
        content: "Repite la medición en condiciones comparables",
      },
      {
        type: "p",
        content:
          "Evalúa el mismo recorrido y una carga de trabajo semejante durante la prueba. Documenta tanto las tareas completadas como las intervenciones del personal. Ese registro ayuda a decidir si la solución tiene sentido para tu proyecto; no sustituye una cotización ni garantiza un ahorro.",
      },
    ],
  },
  {
    slug: "como-implementar-robot-en-restaurante",
    title: "Prepara tu restaurante para una demostración",
    excerpt:
      "Qué conviene revisar antes de probar un robot de servicio en tu espacio.",
    category: "Guías",
    readMin: 2,
    date: "2026-09-13",
    author: {
      name: "Botmate",
      role: "Guías de evaluación",
    },
    cover: "guide",
    tags: ["Evaluación", "Robótica de servicio"],
    body: [
      {
        type: "h2",
        content: "Dibuja el recorrido habitual",
      },
      {
        type: "p",
        content:
          "Marca el origen, los destinos y las zonas de espera. Incluye puertas, mobiliario y cualquier punto donde se crucen clientes y personal. Lleva medidas de los pasos más estrechos para compararlas con la ficha del modelo.",
      },
      {
        type: "h2",
        content: "Organiza a las personas",
      },
      {
        type: "ul",
        content: [
          "Define quién carga, descarga y solicita el recorrido.",
          "Prepara una tarea representativa del servicio habitual.",
          "Acuerda cómo se atenderán bloqueos o pausas.",
          "Asigna un responsable de recopilar observaciones.",
        ],
      },
      {
        type: "h2",
        content: "Observa más que la llegada",
      },
      {
        type: "p",
        content:
          "Revisa la estabilidad de la carga, los cruces, los tiempos de espera y la facilidad de uso para el personal. Al terminar, identifica qué condiciones hay que ajustar y pide una propuesta que explique el alcance de puesta en marcha y capacitación.",
      },
    ],
  },
  {
    slug: "limpieza-autonoma-botmate-clean-vs-tradicional",
    title: "Limpieza autónoma y con operador: tareas distintas",
    excerpt:
      "Cómo preparar la evaluación de equipos de limpieza sin confundir sus formas de uso.",
    category: "Guías",
    readMin: 2,
    date: "2026-09-13",
    author: {
      name: "Botmate",
      role: "Guías de evaluación",
    },
    cover: "cleaning",
    tags: ["Evaluación", "Robótica de servicio"],
    body: [
      {
        type: "h2",
        content: "Clasifica tus superficies",
      },
      {
        type: "p",
        content:
          "Registra el tipo de piso, el área y las restricciones de horario. Considera obstáculos, materiales delicados, alfombras y zonas que requieren protocolos específicos de tu organización.",
      },
      {
        type: "h2",
        content: "Distingue cómo se opera el equipo",
      },
      {
        type: "p",
        content:
          "Una solución autónoma necesita rutas y condiciones de trabajo definidas. Una fregadora conducida por una persona depende de la dirección del operador. Consulta la forma de uso del modelo exacto antes de planear turnos o reasignar tareas.",
      },
      {
        type: "h2",
        content: "Revisa los consumibles y el servicio",
      },
      {
        type: "ul",
        content: [
          "Compatibilidad de cepillos, filtros y productos de limpieza.",
          "Acceso a carga, agua y disposición de residuos.",
          "Trabajo de detalle que permanece a cargo del personal.",
          "Mantenimiento y capacitación incluidos en la propuesta.",
        ],
      },
    ],
  },
  {
    slug: "futuro-robotica-mexico-2026",
    title: "Qué preguntar antes de elegir un proveedor de robótica",
    excerpt:
      "Una lista práctica para comparar propuestas por alcance y claridad.",
    category: "Guías",
    readMin: 2,
    date: "2026-09-13",
    author: {
      name: "Botmate",
      role: "Guías de evaluación",
    },
    cover: "future",
    tags: ["Evaluación", "Robótica de servicio"],
    body: [
      {
        type: "h2",
        content: "Identifica el equipo exacto",
      },
      {
        type: "p",
        content:
          "Pide el fabricante, el nombre completo del modelo, la versión y los accesorios. La fotografía o el nombre comercial por sí solos no definen la configuración que recibirás.",
      },
      {
        type: "h2",
        content: "Deja las condiciones por escrito",
      },
      {
        type: "ul",
        content: [
          "Precio y conceptos incluidos en la cotización.",
          "Disponibilidad, entrega y requisitos del sitio.",
          "Garantía, mantenimiento y canales de soporte.",
          "Responsabilidades del proveedor y del cliente.",
        ],
      },
      {
        type: "h2",
        content: "Solicita evidencia relacionada con tu tarea",
      },
      {
        type: "p",
        content:
          "Si una propuesta incluye porcentajes de ahorro o productividad, pregunta cómo se midieron, en qué condiciones y con qué plazo. La experiencia de otra operación puede orientar la conversación, pero no reemplaza la evaluación de tu espacio.",
      },
    ],
  },
];
