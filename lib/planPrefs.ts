// Vitala — personalización del plan: horarios de comida + cambios de platillo.
// Todo local (localStorage). El plan base se genera del perfil; estas
// preferencias se aplican encima al mostrarlo.

import type { MealSlot } from "./types";

const TIMES_KEY = "vitala.mealtimes.v1";
const SWAPS_KEY = "vitala.planswaps.v1";

export const DEFAULT_TIMES: Record<MealSlot, string> = {
  desayuno: "08:00",
  comida: "14:00",
  cena: "20:00",
  snack: "17:00",
};

export function loadMealTimes(): Record<MealSlot, string> {
  if (typeof window === "undefined") return { ...DEFAULT_TIMES };
  try {
    return { ...DEFAULT_TIMES, ...JSON.parse(window.localStorage.getItem(TIMES_KEY) || "{}") };
  } catch {
    return { ...DEFAULT_TIMES };
  }
}

export function saveMealTime(slot: MealSlot, time: string): void {
  if (typeof window === "undefined") return;
  const cur = loadMealTimes();
  cur[slot] = time;
  window.localStorage.setItem(TIMES_KEY, JSON.stringify(cur));
}

// Cambios de platillo: clave `${day}:${slot}` → id del platillo elegido.
export type SwapMap = Record<string, string>;

export function loadSwaps(): SwapMap {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.localStorage.getItem(SWAPS_KEY) || "{}") as SwapMap;
  } catch {
    return {};
  }
}

export function setSwap(day: string, slot: MealSlot, mealId: string): void {
  if (typeof window === "undefined") return;
  const cur = loadSwaps();
  cur[`${day}:${slot}`] = mealId;
  window.localStorage.setItem(SWAPS_KEY, JSON.stringify(cur));
}

export function clearSwap(day: string, slot: MealSlot): void {
  if (typeof window === "undefined") return;
  const cur = loadSwaps();
  delete cur[`${day}:${slot}`];
  window.localStorage.setItem(SWAPS_KEY, JSON.stringify(cur));
}
