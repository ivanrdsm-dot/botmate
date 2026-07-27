// Vitala — diario de comidas (registro local por día).
// Privacidad por diseño: vive en el dispositivo (luego se podrá sincronizar).

import type { MealSlot } from "./types";

export type Confidence = "alta" | "media" | "baja";

export interface FoodItem {
  name: string;
  grams?: number;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
  confidence?: Confidence;
}

export interface DiaryEntry {
  id: string;
  ts: string; // ISO
  title: string;
  slot: MealSlot;
  items: FoodItem[];
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
  notes?: string;
}

const KEY = "vitala.diary.v1";

export function todayKey(d = new Date()): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

type DiaryMap = Record<string, DiaryEntry[]>;

function readAll(): DiaryMap {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.localStorage.getItem(KEY) || "{}") as DiaryMap;
  } catch {
    return {};
  }
}

function writeAll(map: DiaryMap): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(map));
}

export function loadDay(date = todayKey()): DiaryEntry[] {
  return readAll()[date] ?? [];
}

export function sumItems(items: FoodItem[]) {
  return items.reduce(
    (a, i) => ({
      kcal: a.kcal + (i.kcal || 0),
      protein: a.protein + (i.protein || 0),
      carbs: a.carbs + (i.carbs || 0),
      fat: a.fat + (i.fat || 0),
    }),
    { kcal: 0, protein: 0, carbs: 0, fat: 0 }
  );
}

export function addEntry(
  entry: Omit<DiaryEntry, "id" | "ts" | "kcal" | "protein" | "carbs" | "fat">,
  date = todayKey()
): DiaryEntry {
  const totals = sumItems(entry.items);
  const full: DiaryEntry = {
    ...entry,
    ...totals,
    id: `${Date.now()}-${Math.round(Math.random() * 1e6)}`,
    ts: new Date().toISOString(),
  };
  const map = readAll();
  map[date] = [...(map[date] ?? []), full];
  writeAll(map);
  return full;
}

export function removeEntry(id: string, date = todayKey()): void {
  const map = readAll();
  map[date] = (map[date] ?? []).filter((e) => e.id !== id);
  writeAll(map);
}

export function dayTotals(date = todayKey()) {
  return loadDay(date).reduce(
    (a, e) => ({
      kcal: a.kcal + e.kcal,
      protein: a.protein + e.protein,
      carbs: a.carbs + e.carbs,
      fat: a.fat + e.fat,
    }),
    { kcal: 0, protein: 0, carbs: 0, fat: 0 }
  );
}
