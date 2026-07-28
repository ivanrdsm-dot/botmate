// Vitala — base de platillos comunes (LATAM/México) para registro rápido de un
// toque y como respaldo del estimador cuando no hay IA configurada.
// Valores aproximados por porción típica. Orientativos, no exactos.

export interface CommonFood {
  name: string;
  portion: string; // porción típica descrita
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
  keywords: string[]; // para el respaldo por texto
}

export const COMMON_FOODS: CommonFood[] = [
  { name: "Quesadilla de maíz con queso", portion: "1 pieza", kcal: 190, protein: 8, carbs: 20, fat: 9, keywords: ["quesadilla", "quesadillas"] },
  { name: "Taco al pastor", portion: "1 taco", kcal: 230, protein: 12, carbs: 20, fat: 11, keywords: ["taco", "tacos", "pastor"] },
  { name: "Huevos revueltos", portion: "2 huevos", kcal: 180, protein: 13, carbs: 2, fat: 13, keywords: ["huevo", "huevos", "revueltos"] },
  { name: "Plátano", portion: "1 pieza", kcal: 105, protein: 1, carbs: 27, fat: 0, keywords: ["plátano", "platano", "banana"] },
  { name: "Vaso de leche", portion: "250 ml", kcal: 150, protein: 8, carbs: 12, fat: 8, keywords: ["leche", "vaso de leche"] },
  { name: "Frijoles refritos", portion: "1/2 taza", kcal: 130, protein: 7, carbs: 20, fat: 3, keywords: ["frijol", "frijoles", "refritos"] },
  { name: "Arroz blanco", portion: "1 taza", kcal: 205, protein: 4, carbs: 45, fat: 0, keywords: ["arroz"] },
  { name: "Pechuga de pollo a la plancha", portion: "150 g", kcal: 250, protein: 46, carbs: 0, fat: 6, keywords: ["pollo", "pechuga"] },
  { name: "Torta de jamón", portion: "1 pieza", kcal: 450, protein: 20, carbs: 50, fat: 18, keywords: ["torta"] },
  { name: "Tortilla de maíz", portion: "1 pieza", kcal: 65, protein: 2, carbs: 13, fat: 1, keywords: ["tortilla", "tortillas"] },
  { name: "Aguacate", portion: "1/2 pieza", kcal: 160, protein: 2, carbs: 9, fat: 15, keywords: ["aguacate"] },
  { name: "Manzana", portion: "1 pieza", kcal: 95, protein: 0, carbs: 25, fat: 0, keywords: ["manzana"] },
  { name: "Avena con agua", portion: "1 taza", kcal: 160, protein: 6, carbs: 27, fat: 3, keywords: ["avena"] },
  { name: "Yogur natural", portion: "1 taza", kcal: 150, protein: 8, carbs: 17, fat: 4, keywords: ["yogur", "yogurt"] },
  { name: "Ensalada verde", portion: "1 plato", kcal: 120, protein: 3, carbs: 10, fat: 8, keywords: ["ensalada"] },
  { name: "Sopa de verduras", portion: "1 plato", kcal: 110, protein: 4, carbs: 18, fat: 3, keywords: ["sopa"] },
  { name: "Pan integral", portion: "1 rebanada", kcal: 80, protein: 4, carbs: 14, fat: 1, keywords: ["pan"] },
  { name: "Café con leche", portion: "1 taza", kcal: 60, protein: 3, carbs: 6, fat: 3, keywords: ["café", "cafe"] },
  { name: "Enchiladas", portion: "3 piezas", kcal: 400, protein: 15, carbs: 45, fat: 18, keywords: ["enchilada", "enchiladas"] },
  { name: "Chilaquiles", portion: "1 plato", kcal: 450, protein: 14, carbs: 50, fat: 20, keywords: ["chilaquiles"] },
  { name: "Pozole", portion: "1 tazón", kcal: 350, protein: 22, carbs: 35, fat: 12, keywords: ["pozole"] },
  { name: "Sincronizada / quesadilla de harina", portion: "1 pieza", kcal: 300, protein: 14, carbs: 28, fat: 15, keywords: ["sincronizada", "harina"] },
  { name: "Refresco", portion: "355 ml", kcal: 140, protein: 0, carbs: 39, fat: 0, keywords: ["refresco", "coca", "soda"] },
  { name: "Barra de granola", portion: "1 pieza", kcal: 130, protein: 3, carbs: 22, fat: 4, keywords: ["granola", "barra"] },
];

// Sugerencias rápidas por slot (ids de COMMON_FOODS por nombre).
export const QUICK_BY_SLOT: Record<string, string[]> = {
  desayuno: ["Huevos revueltos", "Avena con agua", "Plátano", "Yogur natural", "Café con leche", "Chilaquiles"],
  comida: ["Pechuga de pollo a la plancha", "Arroz blanco", "Frijoles refritos", "Taco al pastor", "Enchiladas", "Pozole"],
  cena: ["Quesadilla de maíz con queso", "Sopa de verduras", "Ensalada verde", "Torta de jamón", "Pan integral"],
  snack: ["Manzana", "Aguacate", "Barra de granola", "Yogur natural", "Refresco"],
};

export function findFood(name: string): CommonFood | undefined {
  return COMMON_FOODS.find((f) => f.name === name);
}
