// Vitala — métricas de actividad y salud, normalizadas por día.
// Privacidad por diseño: viven en el dispositivo (localStorage). Cualquier
// fuente (Apple Salud, Health Connect, pulsera, o manual) se normaliza a este
// mismo formato, así el dashboard es idéntico venga de donde venga el dato.

export type HealthSource =
  | "manual"
  | "apple_health"
  | "health_connect"
  | "fitbit"
  | "garmin";

export interface DayMetrics {
  date: string; // YYYY-MM-DD
  steps?: number;
  activeKcal?: number; // energía activa quemada
  restingHr?: number; // frecuencia cardiaca en reposo
  sleepHours?: number;
  workoutMin?: number; // minutos de ejercicio del día
  source: HealthSource;
  updatedAt: string;
}

const KEY = "vitala.health.v1";

export function isoDay(d = new Date()): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function readAll(): Record<string, DayMetrics> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.localStorage.getItem(KEY) || "{}") as Record<string, DayMetrics>;
  } catch {
    return {};
  }
}

function writeAll(map: Record<string, DayMetrics>): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(map));
}

export function loadDays(): DayMetrics[] {
  return Object.values(readAll()).sort((a, b) => a.date.localeCompare(b.date));
}

export function metricsFor(date = isoDay()): DayMetrics | null {
  return readAll()[date] ?? null;
}

/** Fusiona datos nuevos en un día. Los valores presentes reemplazan; los
 *  ausentes conservan lo anterior. Devuelve el día actualizado. */
export function upsertDay(patch: Partial<DayMetrics> & { date: string; source: HealthSource }): DayMetrics {
  const map = readAll();
  const prev = map[patch.date];
  const merged: DayMetrics = {
    ...prev,
    ...Object.fromEntries(Object.entries(patch).filter(([, v]) => v !== undefined)),
    date: patch.date,
    source: patch.source,
    updatedAt: new Date().toISOString(),
  } as DayMetrics;
  map[patch.date] = merged;
  writeAll(map);
  return merged;
}

/** Absorbe un lote de lecturas de una fuente externa (sync de wearable). */
export function mergeReadings(readings: Array<Partial<DayMetrics> & { date: string }>, source: HealthSource): number {
  let n = 0;
  for (const r of readings) {
    upsertDay({ ...r, source });
    n++;
  }
  return n;
}

/** Últimos 7 días (rellena huecos con días vacíos para la gráfica). */
export function lastSevenDays(): DayMetrics[] {
  const map = readAll();
  const out: DayMetrics[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = isoDay(d);
    out.push(map[key] ?? { date: key, source: "manual", updatedAt: "" });
  }
  return out;
}

export interface WeeklySummary {
  avgSteps: number;
  totalActiveKcal: number;
  totalWorkoutMin: number;
  daysActive: number; // días con >= 30 min o >= 5000 pasos
}

export function weeklySummary(): WeeklySummary {
  const week = lastSevenDays();
  const stepsVals = week.map((d) => d.steps ?? 0);
  const avgSteps = Math.round(stepsVals.reduce((a, b) => a + b, 0) / 7);
  const totalActiveKcal = week.reduce((a, d) => a + (d.activeKcal ?? 0), 0);
  const totalWorkoutMin = week.reduce((a, d) => a + (d.workoutMin ?? 0), 0);
  const daysActive = week.filter((d) => (d.workoutMin ?? 0) >= 30 || (d.steps ?? 0) >= 5000).length;
  return { avgSteps, totalActiveKcal, totalWorkoutMin, daysActive };
}

/** Meta de pasos sugerida según objetivo del perfil. */
export function stepGoalFor(goal?: string): number {
  if (goal === "lose") return 10000;
  if (goal === "gain") return 7000;
  return 8000;
}
