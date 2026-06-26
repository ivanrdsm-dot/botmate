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

// Alérgenos / exclusiones comunes (etiquetado obligatorio)
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
  protein: number; // gramos
  carbs: number; // gramos
  fat: number; // gramos
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
  // Banderas de seguridad clínica (gating legal)
  pregnantOrLactating: boolean;
  hasMedicalCondition: boolean;
  conditionNotes: string;
  takesMedication: boolean;
  // Localización para el modelo "1 moneda"
  country: string;
  currency: string;
  acceptedDisclaimer: boolean;
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
}

export interface DayPlan {
  day: string;
  meals: PlannedMeal[];
  totals: { kcal: number } & Macros;
}

export interface WeekPlan {
  days: DayPlan[];
  targets: Targets;
  flags: string[]; // advertencias de seguridad a mostrar
}
