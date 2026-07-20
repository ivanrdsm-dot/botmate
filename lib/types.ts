// Vitala — tipos del dominio de nutrición

export type Sex = "male" | "female";

export type ActivityLevel =
  | "sedentary"
  | "light"
  | "moderate"
  | "active"
  | "very_active";

export type Goal = "lose" | "maintain" | "gain";

export type DietPreference =
  | "omnivore"
  | "vegetarian"
  | "vegan"
  | "pescatarian"
  | "keto"
  | "mediterranean";

export type Allergen =
  | "gluten"
  | "lacteos"
  | "huevo"
  | "frutos_secos"
  | "cacahuate"
  | "soya"
  | "mariscos"
  | "pescado"
  | "ajonjoli";

export type MealSlot = "desayuno" | "comida" | "cena" | "snack";

export interface Macros {
  protein: number;
  carbs: number;
  fat: number;
}

export interface Profile {
  name: string;
  age: number;
  sex: Sex;
  heightCm: number;
  weightKg: number;
  activity: ActivityLevel;
  goal: Goal;
  preference: DietPreference;
  allergies: Allergen[];
  pregnantOrLactating: boolean;
  hasMedicalCondition: boolean;
  conditionNotes: string;
  takesMedication: boolean;
  country: string;
  currency: string;
  acceptedDisclaimer: boolean;
  /** Registro de consentimiento (bloque 4): qué versión del aviso aceptó y cuándo. */
  consent?: { version: string; acceptedAt: string };
}

export interface Targets {
  bmr: number;
  tdee: number;
  calories: number;
  macros: Macros;
  waterMl: number;
  safetyFloorApplied: boolean;
}

export interface PlannedMeal {
  slot: MealSlot;
  name: string;
  items: string[];
  kcal: number;
  macros: Macros;
  prepMin: number;
  steps?: string[]; // preparación paso a paso
  origin?: string;  // cocina de origen (México, Japón, Grecia…)
}

export interface DayPlan {
  day: string;
  meals: PlannedMeal[];
  totals: { kcal: number } & Macros;
}

export interface WeekPlan {
  days: DayPlan[];
  targets: Targets;
  flags: string[];
}
