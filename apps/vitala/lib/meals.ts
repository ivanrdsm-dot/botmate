// Vitala — banco de comidas base (contexto LATAM/México, ingredientes accesibles)
// Cada comida trae etiquetado de alérgenos y compatibilidad con preferencias.
// Valores nutricionales aproximados por porción base (se escalan al objetivo diario).

import type { Allergen, MealSlot } from "./types";

export interface Meal {
  id: string;
  slot: MealSlot;
  name: string;
  items: string[];
  baseKcal: number;
  protein: number;
  carbs: number;
  fat: number;
  prepMin: number;
  allergens: Allergen[];
  landMeat: boolean; // carne terrestre (res, pollo, cerdo)
  vegetarian: boolean;
  vegan: boolean;
  keto: boolean;
  mediterranean: boolean;
}

export const MEALS: Meal[] = [
  // ───────────── DESAYUNO ─────────────
  {
    id: "d1",
    slot: "desayuno",
    name: "Avena con plátano y crema de cacahuate",
    items: ["60 g avena", "1 plátano", "1 cda crema de cacahuate", "Canela"],
    baseKcal: 420, protein: 14, carbs: 62, fat: 13, prepMin: 8,
    allergens: ["gluten", "cacahuate"], landMeat: false,
    vegetarian: true, vegan: true, keto: false, mediterranean: true,
  },
  {
    id: "d2",
    slot: "desayuno",
    name: "Huevos revueltos con espinaca y aguacate",
    items: ["3 huevos", "1 taza espinaca", "1/2 aguacate", "Jitomate"],
    baseKcal: 380, protein: 22, carbs: 9, fat: 28, prepMin: 10,
    allergens: ["huevo"], landMeat: false,
    vegetarian: true, vegan: false, keto: true, mediterranean: true,
  },
  {
    id: "d3",
    slot: "desayuno",
    name: "Yogur griego con fresas y nuez",
    items: ["200 g yogur griego natural", "1 taza fresas", "20 g nuez", "Miel"],
    baseKcal: 330, protein: 20, carbs: 30, fat: 14, prepMin: 5,
    allergens: ["lacteos", "frutos_secos"], landMeat: false,
    vegetarian: true, vegan: false, keto: false, mediterranean: true,
  },
  {
    id: "d4",
    slot: "desayuno",
    name: "Tofu revuelto a la mexicana",
    items: ["200 g tofu firme", "Jitomate", "Cebolla", "Chile", "Tortilla de maíz"],
    baseKcal: 350, protein: 20, carbs: 30, fat: 16, prepMin: 12,
    allergens: ["soya"], landMeat: false,
    vegetarian: true, vegan: true, keto: false, mediterranean: false,
  },
  {
    id: "d5",
    slot: "desayuno",
    name: "Smoothie verde con proteína de chícharo",
    items: ["1 scoop proteína de chícharo", "Espinaca", "1 manzana", "Linaza", "Agua"],
    baseKcal: 300, protein: 25, carbs: 32, fat: 7, prepMin: 5,
    allergens: [], landMeat: false,
    vegetarian: true, vegan: true, keto: false, mediterranean: false,
  },
  {
    id: "d6",
    slot: "desayuno",
    name: "Chilaquiles verdes con frijoles",
    items: ["Tortilla horneada", "Salsa verde", "1/2 taza frijoles", "Queso fresco"],
    baseKcal: 410, protein: 16, carbs: 52, fat: 15, prepMin: 15,
    allergens: ["lacteos"], landMeat: false,
    vegetarian: true, vegan: false, keto: false, mediterranean: false,
  },

  // ───────────── COMIDA ─────────────
  {
    id: "c1",
    slot: "comida",
    name: "Pechuga de pollo con arroz integral y verduras",
    items: ["150 g pollo", "1 taza arroz integral", "Brócoli", "Zanahoria"],
    baseKcal: 520, protein: 42, carbs: 55, fat: 12, prepMin: 25,
    allergens: [], landMeat: true,
    vegetarian: false, vegan: false, keto: false, mediterranean: true,
  },
  {
    id: "c2",
    slot: "comida",
    name: "Salmón al horno con quinoa y espárragos",
    items: ["150 g salmón", "3/4 taza quinoa", "Espárragos", "Limón"],
    baseKcal: 540, protein: 38, carbs: 42, fat: 22, prepMin: 25,
    allergens: ["pescado"], landMeat: false,
    vegetarian: false, vegan: false, keto: false, mediterranean: true,
  },
  {
    id: "c3",
    slot: "comida",
    name: "Bowl de lentejas, arroz y verduras asadas",
    items: ["1 taza lentejas", "1/2 taza arroz", "Pimiento", "Calabacita", "Aceite de oliva"],
    baseKcal: 500, protein: 24, carbs: 78, fat: 10, prepMin: 30,
    allergens: [], landMeat: false,
    vegetarian: true, vegan: true, keto: false, mediterranean: true,
  },
  {
    id: "c4",
    slot: "comida",
    name: "Tacos de res magra con nopales",
    items: ["150 g res magra", "Nopales", "3 tortillas de maíz", "Pico de gallo"],
    baseKcal: 510, protein: 40, carbs: 48, fat: 16, prepMin: 25,
    allergens: [], landMeat: true,
    vegetarian: false, vegan: false, keto: false, mediterranean: false,
  },
  {
    id: "c5",
    slot: "comida",
    name: "Ensalada mediterránea con garbanzo y atún",
    items: ["1 lata atún", "1/2 taza garbanzo", "Pepino", "Jitomate", "Aceitunas", "Aceite de oliva"],
    baseKcal: 470, protein: 36, carbs: 32, fat: 22, prepMin: 12,
    allergens: ["pescado"], landMeat: false,
    vegetarian: false, vegan: false, keto: false, mediterranean: true,
  },
  {
    id: "c6",
    slot: "comida",
    name: "Curry de tofu y verduras con coco",
    items: ["200 g tofu", "Leche de coco", "Brócoli", "Pimiento", "1/2 taza arroz"],
    baseKcal: 530, protein: 26, carbs: 50, fat: 25, prepMin: 28,
    allergens: ["soya"], landMeat: false,
    vegetarian: true, vegan: true, keto: false, mediterranean: false,
  },

  // ───────────── CENA ─────────────
  {
    id: "n1",
    slot: "cena",
    name: "Omelette de claras con champiñones y queso",
    items: ["4 claras + 1 huevo", "Champiñones", "30 g queso panela", "Espinaca"],
    baseKcal: 300, protein: 30, carbs: 8, fat: 16, prepMin: 12,
    allergens: ["huevo", "lacteos"], landMeat: false,
    vegetarian: true, vegan: false, keto: true, mediterranean: true,
  },
  {
    id: "n2",
    slot: "cena",
    name: "Pescado blanco a la plancha con ensalada",
    items: ["150 g pescado blanco", "Mezcla de hojas verdes", "Aguacate", "Limón"],
    baseKcal: 340, protein: 34, carbs: 12, fat: 18, prepMin: 18,
    allergens: ["pescado"], landMeat: false,
    vegetarian: false, vegan: false, keto: true, mediterranean: true,
  },
  {
    id: "n3",
    slot: "cena",
    name: "Crema de calabaza con semillas y pan integral",
    items: ["Calabaza", "Caldo de verduras", "Semillas de calabaza", "1 reb. pan integral"],
    baseKcal: 320, protein: 12, carbs: 44, fat: 11, prepMin: 20,
    allergens: ["gluten"], landMeat: false,
    vegetarian: true, vegan: true, keto: false, mediterranean: true,
  },
  {
    id: "n4",
    slot: "cena",
    name: "Wrap integral de pollo y verduras",
    items: ["120 g pollo", "Tortilla integral", "Lechuga", "Jitomate", "Yogur natural"],
    baseKcal: 380, protein: 34, carbs: 36, fat: 11, prepMin: 15,
    allergens: ["gluten", "lacteos"], landMeat: true,
    vegetarian: false, vegan: false, keto: false, mediterranean: false,
  },
  {
    id: "n5",
    slot: "cena",
    name: "Ensalada de garbanzo, espinaca y aguacate",
    items: ["1 taza garbanzo", "Espinaca", "1/2 aguacate", "Aceite de oliva", "Limón"],
    baseKcal: 360, protein: 16, carbs: 38, fat: 17, prepMin: 10,
    allergens: [], landMeat: false,
    vegetarian: true, vegan: true, keto: false, mediterranean: true,
  },
  {
    id: "n6",
    slot: "cena",
    name: "Sopa de verduras con frijol y queso fresco",
    items: ["Verduras mixtas", "1/2 taza frijol", "30 g queso fresco", "Cilantro"],
    baseKcal: 330, protein: 18, carbs: 42, fat: 9, prepMin: 22,
    allergens: ["lacteos"], landMeat: false,
    vegetarian: true, vegan: false, keto: false, mediterranean: false,
  },

  // ───────────── SNACK ─────────────
  {
    id: "s1",
    slot: "snack",
    name: "Manzana con almendras",
    items: ["1 manzana", "20 g almendras"],
    baseKcal: 200, protein: 5, carbs: 26, fat: 11, prepMin: 1,
    allergens: ["frutos_secos"], landMeat: false,
    vegetarian: true, vegan: true, keto: false, mediterranean: true,
  },
  {
    id: "s2",
    slot: "snack",
    name: "Yogur griego con arándanos",
    items: ["150 g yogur griego", "1/2 taza arándanos"],
    baseKcal: 180, protein: 16, carbs: 20, fat: 4, prepMin: 2,
    allergens: ["lacteos"], landMeat: false,
    vegetarian: true, vegan: false, keto: false, mediterranean: true,
  },
  {
    id: "s3",
    slot: "snack",
    name: "Hummus con bastones de zanahoria y pepino",
    items: ["4 cda hummus", "Zanahoria", "Pepino"],
    baseKcal: 190, protein: 7, carbs: 22, fat: 9, prepMin: 5,
    allergens: ["ajonjoli"], landMeat: false,
    vegetarian: true, vegan: true, keto: false, mediterranean: true,
  },
  {
    id: "s4",
    slot: "snack",
    name: "Edamames con sal de mar",
    items: ["1 taza edamames", "Sal de mar"],
    baseKcal: 190, protein: 17, carbs: 15, fat: 8, prepMin: 6,
    allergens: ["soya"], landMeat: false,
    vegetarian: true, vegan: true, keto: false, mediterranean: false,
  },
  {
    id: "s5",
    slot: "snack",
    name: "Puño de nueces y un cuadro de chocolate amargo",
    items: ["25 g nueces mixtas", "10 g chocolate 85%"],
    baseKcal: 210, protein: 5, carbs: 12, fat: 17, prepMin: 1,
    allergens: ["frutos_secos"], landMeat: false,
    vegetarian: true, vegan: true, keto: true, mediterranean: true,
  },
  {
    id: "s6",
    slot: "snack",
    name: "Jícama con limón y chile",
    items: ["1 taza jícama", "Limón", "Chile en polvo"],
    baseKcal: 90, protein: 2, carbs: 20, fat: 0, prepMin: 3,
    allergens: [], landMeat: false,
    vegetarian: true, vegan: true, keto: false, mediterranean: false,
  },
];
