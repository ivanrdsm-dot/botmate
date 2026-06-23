// Vitala — motor de cálculo nutricional
// Fórmulas estándar y públicas: Mifflin-St Jeor (BMR) + factores de actividad.
// Las salidas son orientativas y NO sustituyen la valoración de un profesional.

import type { ActivityLevel, Goal, Macros, Profile, Targets } from "./types";

const ACTIVITY_FACTOR: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9,
};

export const ACTIVITY_LABEL: Record<ActivityLevel, string> = {
  sedentary: "Sedentario (poco o nada de ejercicio)",
  light: "Ligero (1-3 días/semana)",
  moderate: "Moderado (3-5 días/semana)",
  active: "Activo (6-7 días/semana)",
  very_active: "Muy activo (físico intenso o 2x/día)",
};

export const GOAL_LABEL: Record<Goal, string> = {
  lose: "Bajar de peso",
  maintain: "Mantener peso",
  gain: "Subir masa muscular",
};

/** Mifflin-St Jeor: tasa metabólica basal. */
export function bmrMifflin(p: Profile): number {
  const base = 10 * p.weightKg + 6.25 * p.heightCm - 5 * p.age;
  return Math.round(p.sex === "male" ? base + 5 : base - 161);
}

/** Gasto energético total diario. */
export function tdee(p: Profile): number {
  return Math.round(bmrMifflin(p) * ACTIVITY_FACTOR[p.activity]);
}

/**
 * Calorías objetivo según meta, con PISO DE SEGURIDAD para no recomendar
 * déficits peligrosos (mínimos clínicos conservadores).
 */
export function targetCalories(p: Profile): { calories: number; floorApplied: boolean } {
  const maintenance = tdee(p);
  let calories = maintenance;
  if (p.goal === "lose") calories = Math.round(maintenance * 0.82); // ~18% déficit
  if (p.goal === "gain") calories = Math.round(maintenance * 1.12); // ~12% superávit

  const floor = p.sex === "male" ? 1500 : 1200;
  const floorApplied = calories < floor;
  if (floorApplied) calories = floor;
  return { calories, floorApplied };
}

/**
 * Reparto de macros. Proteína por kg de peso (ajustada a la meta),
 * grasa ~25-30% de calorías, resto en carbohidratos. Keto invierte el reparto.
 */
export function macrosFor(p: Profile, calories: number): Macros {
  if (p.preference === "keto") {
    const fat = Math.round((calories * 0.7) / 9);
    const protein = Math.round((calories * 0.25) / 4);
    const carbs = Math.round((calories * 0.05) / 4);
    return { protein, carbs, fat };
  }

  const proteinPerKg = p.goal === "gain" ? 2.0 : p.goal === "lose" ? 1.8 : 1.6;
  const protein = Math.round(p.weightKg * proteinPerKg);
  const fat = Math.round((calories * 0.27) / 9);
  const proteinKcal = protein * 4;
  const fatKcal = fat * 9;
  const carbs = Math.max(0, Math.round((calories - proteinKcal - fatKcal) / 4));
  return { protein, carbs, fat };
}

/** Recomendación de agua: ~35 ml por kg, redondeado a 100 ml. */
export function waterMl(p: Profile): number {
  return Math.round((p.weightKg * 35) / 100) * 100;
}

export function computeTargets(p: Profile): Targets {
  const bmr = bmrMifflin(p);
  const total = tdee(p);
  const { calories, floorApplied } = targetCalories(p);
  return {
    bmr,
    tdee: total,
    calories,
    macros: macrosFor(p, calories),
    waterMl: waterMl(p),
    safetyFloorApplied: floorApplied,
  };
}

/** Validación de datos de entrada antes de generar nada. */
export function validateProfile(p: Partial<Profile>): string[] {
  const errors: string[] = [];
  if (!p.name?.trim()) errors.push("Escribe tu nombre.");
  if (!p.age || p.age < 15 || p.age > 100)
    errors.push("La edad debe estar entre 15 y 100 años.");
  if (!p.heightCm || p.heightCm < 120 || p.heightCm > 230)
    errors.push("La estatura debe estar entre 120 y 230 cm.");
  if (!p.weightKg || p.weightKg < 35 || p.weightKg > 300)
    errors.push("El peso debe estar entre 35 y 300 kg.");
  if (!p.acceptedDisclaimer)
    errors.push("Debes aceptar el aviso de salud para continuar.");
  return errors;
}

/** Mensajes de seguridad clínica según banderas del perfil. */
export function safetyFlags(p: Profile): string[] {
  const flags: string[] = [];
  if (p.pregnantOrLactating)
    flags.push(
      "Estás en embarazo o lactancia: este plan es solo informativo. Acude con un profesional de la salud antes de seguir cualquier dieta."
    );
  if (p.hasMedicalCondition)
    flags.push(
      "Indicaste una condición médica: consulta a tu médico o nutriólogo antes de aplicar cambios en tu alimentación."
    );
  if (p.takesMedication)
    flags.push(
      "Tomas medicamentos: algunos alimentos pueden interactuar con tu tratamiento. Valídalo con tu médico."
    );
  if (p.age < 18)
    flags.push(
      "Eres menor de edad: este plan debe revisarse con un adulto responsable y un profesional de la salud."
    );
  return flags;
}
