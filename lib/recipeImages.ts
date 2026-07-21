// Fotos reales de recetas (opcional). Este archivo lo llena automáticamente
// `node scripts/fetch-recipe-images.mjs` (córrelo en tu máquina: descarga fotos
// libres de Wikimedia Commons a public/recetas/ y genera los créditos).
// Mientras esté vacío, la UI usa el arte generativo de RecipeArt.

export const RECIPE_IMAGES: Record<string, string> = {};
