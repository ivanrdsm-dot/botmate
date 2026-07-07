// Vitala — generador de plan semanal
// Filtra por alergias y preferencia, asigna comidas por día y escala las
// porciones para acercarse a las calorías objetivo. Determinista por perfil
// (mismo perfil → mismo plan), sin dependencias externas: funciona offline.

import type {
  DayPlan,
  DietPreference,
  Macros,
  MealSlot,
  PlannedMeal,
  Profile,
  Targets,
  WeekPlan,
} from "./types";
import { MEALS, type Meal } from "./meals";
import { computeTargets, safetyFlags } from "./nutrition";

const DAYS = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];

const SLOT_SHARE: Record<MealSlot, number> = {
  desayuno: 0.3,
  comida: 0.4,
  cena: 0.22,
  snack: 0.08,
};

function dietOk(meal: Meal, pref: DietPreference): boolean {
  switch (pref) {
    case "omnivore":
      return true;
    case "vegetarian":
      return meal.vegetarian;
    case "vegan":
      return meal.vegan;
    case "pescatarian":
      return meal.vegetarian || !meal.landMeat;
    case "keto":
      return meal.keto;
    case "mediterranean":
      return meal.mediterranean;
  }
}

function allergyOk(meal: Meal, allergies: Profile["allergies"]): boolean {
  return !meal.allergens.some((a) => allergies.includes(a));
}

function poolFor(slot: MealSlot, p: Profile): Meal[] {
  return MEALS.filter(
    (m) => m.slot === slot && dietOk(m, p.preference) && allergyOk(m, p.allergies)
  );
}

// Hash determinista simple a partir del perfil → semilla de rotación.
function seedFrom(p: Profile): number {
  const str = `${p.name}|${p.age}|${p.weightKg}|${p.heightCm}|${p.goal}|${p.preference}`;
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function scaleMeal(meal: Meal, targetKcal: number): PlannedMeal {
  // Factor de escala acotado para mantener porciones realistas (0.6x–1.8x).
  const raw = targetKcal / meal.baseKcal;
  const f = Math.max(0.6, Math.min(1.8, raw));
  const r = (n: number) => Math.round(n * f);
  return {
    slot: meal.slot,
    name: meal.name,
    items: meal.items,
    kcal: r(meal.baseKcal),
    macros: { protein: r(meal.protein), carbs: r(meal.carbs), fat: r(meal.fat) },
    prepMin: meal.prepMin,
  };
}

export function generatePlan(p: Profile): WeekPlan {
  const targets: Targets = computeTargets(p);
  const seed = seedFrom(p);

  const slots: MealSlot[] = ["desayuno", "comida", "cena", "snack"];
  const pools: Record<MealSlot, Meal[]> = {
    desayuno: poolFor("desayuno", p),
    comida: poolFor("comida", p),
    cena: poolFor("cena", p),
    snack: poolFor("snack", p),
  };

  const days: DayPlan[] = DAYS.map((day, di) => {
    const meals: PlannedMeal[] = slots
      .map((slot) => {
        const pool = pools[slot];
        if (pool.length === 0) return null;
        const meal = pool[(seed + di) % pool.length];
        const slotKcal = targets.calories * SLOT_SHARE[slot];
        return scaleMeal(meal, slotKcal);
      })
      .filter((m): m is PlannedMeal => m !== null);

    const totals = meals.reduce(
      (acc, m) => ({
        kcal: acc.kcal + m.kcal,
        protein: acc.protein + m.macros.protein,
        carbs: acc.carbs + m.macros.carbs,
        fat: acc.fat + m.macros.fat,
      }),
      { kcal: 0, protein: 0, carbs: 0, fat: 0 } as { kcal: number } & Macros
    );

    return { day, meals, totals };
  });

  const flags = [...safetyFlags(p)];
  // Aviso si alguna preferencia + alergias dejó un slot sin opciones.
  slots.forEach((slot) => {
    if (pools[slot].length === 0)
      flags.push(
        `No encontramos opciones de ${slot} compatibles con tus alergias y preferencia. Te recomendamos una consulta personalizada.`
      );
  });
  if (targets.safetyFloorApplied)
    flags.push(
      "Ajustamos tus calorías al mínimo seguro recomendado para evitar un déficit excesivo."
    );

  return { days, targets, flags };
}
