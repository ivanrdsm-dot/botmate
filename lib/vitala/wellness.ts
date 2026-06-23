// Vitala — contenido de hábitos, bienestar emocional, educación y motivación.
// Basado en prácticas de evidencia (hábitos atómicos, higiene del sueño,
// respiración, gratitud). Carácter educativo; NO es terapia ni diagnóstico.

export interface Habit {
  id: string;
  title: string;
  why: string;
  cue: string; // anclaje / disparador
  pillar: "nutricion" | "movimiento" | "sueno" | "mente" | "hidratacion";
}

export const HABITS: Habit[] = [
  {
    id: "h-water",
    title: "Un vaso de agua al despertar",
    why: "Rehidrata tras el ayuno nocturno y ayuda a arrancar el metabolismo.",
    cue: "Justo después de apagar la alarma.",
    pillar: "hidratacion",
  },
  {
    id: "h-veggies",
    title: "Verdura en dos comidas del día",
    why: "Más fibra y micronutrientes con mayor saciedad y menos calorías.",
    cue: "Al servir el plato, llena primero la mitad con verdura.",
    pillar: "nutricion",
  },
  {
    id: "h-walk",
    title: "Caminar 7,000 pasos",
    why: "La actividad ligera diaria reduce riesgo cardiovascular y mejora el ánimo.",
    cue: "Una caminata de 10 min después de cada comida.",
    pillar: "movimiento",
  },
  {
    id: "h-sleep",
    title: "Misma hora de dormir",
    why: "Un horario estable mejora la calidad del sueño y el control del apetito.",
    cue: "Pon una alarma 30 min antes de tu hora de dormir.",
    pillar: "sueno",
  },
  {
    id: "h-breath",
    title: "3 minutos de respiración lenta",
    why: "Activa el sistema parasimpático y baja el estrés percibido.",
    cue: "Antes de comer o al sentir tensión.",
    pillar: "mente",
  },
  {
    id: "h-screen",
    title: "Sin pantallas 30 min antes de dormir",
    why: "Reduce la luz azul y facilita conciliar el sueño.",
    cue: "Deja el teléfono a cargar fuera de la cama.",
    pillar: "sueno",
  },
];

export interface Practice {
  id: string;
  title: string;
  durationMin: number;
  steps: string[];
}

// Micro-prácticas de bienestar emocional (regulación, no terapia).
export const PRACTICES: Practice[] = [
  {
    id: "p-478",
    title: "Respiración 4-7-8",
    durationMin: 3,
    steps: [
      "Inhala por la nariz contando 4.",
      "Retén el aire contando 7.",
      "Exhala lento por la boca contando 8.",
      "Repite 4 ciclos.",
    ],
  },
  {
    id: "p-gratitude",
    title: "Tres cosas buenas",
    durationMin: 4,
    steps: [
      "Anota 3 cosas que salieron bien hoy, por pequeñas que sean.",
      "Por cada una, escribe por qué ocurrió.",
      "Léelas en voz baja antes de cerrar el día.",
    ],
  },
  {
    id: "p-ground",
    title: "Anclaje 5-4-3-2-1",
    durationMin: 3,
    steps: [
      "Nombra 5 cosas que ves.",
      "4 que puedes tocar.",
      "3 que escuchas.",
      "2 que hueles.",
      "1 que puedes saborear.",
    ],
  },
];

// Píldoras de educación en salud (mitos vs. evidencia).
export interface Lesson {
  id: string;
  topic: string;
  myth: string;
  fact: string;
}

export const LESSONS: Lesson[] = [
  {
    id: "l-detox",
    topic: "Detox",
    myth: "Los jugos detox 'limpian' el cuerpo de toxinas.",
    fact: "Tu hígado y riñones ya hacen ese trabajo. Prioriza fibra, agua y sueño en lugar de jugos restrictivos.",
  },
  {
    id: "l-carbs",
    topic: "Carbohidratos",
    myth: "Los carbohidratos engordan por sí solos.",
    fact: "El exceso de energía total es lo que aumenta peso. Los carbohidratos integrales son fuente clave de energía y fibra.",
  },
  {
    id: "l-protein",
    topic: "Proteína",
    myth: "Solo necesitas proteína si haces pesas.",
    fact: "La proteína suficiente preserva músculo, da saciedad y es importante a toda edad, especialmente al envejecer.",
  },
  {
    id: "l-spot",
    topic: "Grasa localizada",
    myth: "Puedes quemar grasa de una zona específica con ejercicios localizados.",
    fact: "La pérdida de grasa es sistémica. La combinación de alimentación, fuerza y movimiento es lo que funciona.",
  },
];

// Mensajes de motivación rotativos.
export const MOTIVATION: string[] = [
  "No tienes que ser perfecto. Solo un poco mejor que ayer.",
  "Los pequeños hábitos repetidos se vuelven una nueva vida.",
  "Cuidar tu salud es el acto de amor propio más rentable que existe.",
  "El mejor plan es el que sí puedes sostener.",
  "Cada vaso de agua, cada caminata, cada hora de sueño cuenta.",
  "Tu cuerpo te acompaña toda la vida. Trátalo como tal.",
  "El progreso no es lineal. Sigue avanzando.",
];

// Selección estable por día del año (rota cada día sin aleatoriedad).
export function motivationOfDay(date = new Date()): string {
  const dayOfYear = Math.floor(
    (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000
  );
  return MOTIVATION[dayOfYear % MOTIVATION.length];
}
