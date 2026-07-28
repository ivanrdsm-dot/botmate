// Vitala — puente a Apple Salud (HealthKit) y Google Health Connect.
// Solo funciona en la app NATIVA (Capacitor). En web todo degrada a no-op.
// La mayoría de las pulseras (Apple Watch, Fitbit, Garmin, Oura, Xiaomi…)
// escriben en estos hubs, así que leyéndolos cubrimos casi todos los wearables.
//
// Usamos registerPlugin de @capacitor/core: el build web NO necesita ninguna
// dependencia nueva. Para el build nativo, instala un plugin de salud
// compatible con Capacitor 6 (recomendado: `capacitor-health`, cubre iOS
// HealthKit + Android Health Connect) y corre `npx cap sync`. El nombre del
// plugin registrado debe coincidir ("HealthPlugin" abajo) — ajústalo al que uses.
//
// Los datos NUNCA salen del dispositivo salvo que el usuario active la nube.

import { Capacitor, registerPlugin } from "@capacitor/core";
import { mergeReadings, isoDay, type DayMetrics } from "./health";

// Interfaz mínima que esperamos del plugin nativo de salud.
interface HealthPluginI {
  isHealthAvailable(): Promise<{ available: boolean }>;
  requestHealthPermissions(opts: { permissions: string[] }): Promise<{ granted: boolean }>;
  queryAggregated(opts: {
    dataType: string; // 'steps' | 'active-calories' | 'workout' ...
    startDate: string;
    endDate: string;
    bucket: "day";
  }): Promise<{ aggregatedData: Array<{ startDate: string; value: number }> }>;
}

// Puente lazy: no explota si el plugin nativo no está instalado (web/dev).
let _plugin: HealthPluginI | null = null;
function plugin(): HealthPluginI | null {
  if (!Capacitor.isNativePlatform()) return null;
  if (_plugin) return _plugin;
  try {
    _plugin = registerPlugin<HealthPluginI>("HealthPlugin");
    return _plugin;
  } catch {
    return null;
  }
}

export function isNativeHealthAvailable(): boolean {
  return Capacitor.isNativePlatform();
}

/** Pide permiso de lectura al usuario (HealthKit/Health Connect muestran su hoja nativa). */
export async function requestHealthAuthorization(): Promise<boolean> {
  const p = plugin();
  if (!p) return false;
  try {
    const { granted } = await p.requestHealthPermissions({
      permissions: ["READ_STEPS", "READ_ACTIVE_CALORIES", "READ_WORKOUTS"],
    });
    return granted;
  } catch (e) {
    console.warn("health authorization failed", e);
    return false;
  }
}

async function dailyTotals(p: HealthPluginI, dataType: string, days: number): Promise<Record<string, number>> {
  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - days);
  const res = await p.queryAggregated({
    dataType,
    startDate: start.toISOString(),
    endDate: end.toISOString(),
    bucket: "day",
  });
  const totals: Record<string, number> = {};
  for (const row of res?.aggregatedData ?? []) {
    const day = isoDay(new Date(row.startDate));
    totals[day] = (totals[day] ?? 0) + (Number(row.value) || 0);
  }
  return totals;
}

/**
 * Sincroniza los últimos `days` días desde el hub de salud a la métrica local.
 * Devuelve cuántos días se actualizaron (0 si no hay datos o no es nativo).
 */
export async function syncFromAppleHealth(days = 7): Promise<number> {
  const p = plugin();
  if (!p) return 0;
  try {
    const [steps, active, workout] = await Promise.all([
      dailyTotals(p, "steps", days).catch(() => ({})),
      dailyTotals(p, "active-calories", days).catch(() => ({})),
      dailyTotals(p, "workout", days).catch(() => ({})),
    ]);
    const byDay: Record<string, Partial<DayMetrics> & { date: string }> = {};
    for (const [date, v] of Object.entries(steps)) (byDay[date] ??= { date }).steps = Math.round(v);
    for (const [date, v] of Object.entries(active)) (byDay[date] ??= { date }).activeKcal = Math.round(v);
    for (const [date, v] of Object.entries(workout)) (byDay[date] ??= { date }).workoutMin = Math.round(v / 60);
    return mergeReadings(Object.values(byDay), "apple_health");
  } catch (e) {
    console.warn("syncFromAppleHealth failed", e);
    return 0;
  }
}
