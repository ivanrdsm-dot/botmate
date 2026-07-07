// Vitala — registro de peso y medidas (local, por fecha).

export interface WeightEntry {
  id: string;
  date: string;
  kg: number;
  notes?: string;
}

export interface MeasurementsEntry {
  id: string;
  date: string;
  waistCm?: number;
  hipCm?: number;
  chestCm?: number;
  armCm?: number;
  bodyFatPct?: number;
}

const WEIGHT_KEY = "vitala.weight.v1";
const MEAS_KEY = "vitala.measurements.v1";

function readWeight(): WeightEntry[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(window.localStorage.getItem(WEIGHT_KEY) || "[]"); } catch { return []; }
}

function writeWeight(entries: WeightEntry[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(WEIGHT_KEY, JSON.stringify(entries));
}

export function loadWeightLog(): WeightEntry[] {
  return readWeight().sort((a, b) => a.date.localeCompare(b.date));
}

export function addWeightEntry(kg: number, date: string, notes?: string): WeightEntry {
  const entry: WeightEntry = { id: `${Date.now()}-${Math.round(Math.random() * 1e6)}`, date, kg, notes };
  const entries = readWeight();
  writeWeight([...entries.filter((e) => e.date !== date), entry]);
  return entry;
}

export function removeWeightEntry(id: string): void {
  writeWeight(readWeight().filter((e) => e.id !== id));
}

function readMeas(): MeasurementsEntry[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(window.localStorage.getItem(MEAS_KEY) || "[]"); } catch { return []; }
}

export function loadMeasurements(): MeasurementsEntry[] {
  return readMeas().sort((a, b) => a.date.localeCompare(b.date));
}

export function addMeasurementsEntry(data: Omit<MeasurementsEntry, "id">): MeasurementsEntry {
  const entry: MeasurementsEntry = { ...data, id: `${Date.now()}-${Math.round(Math.random() * 1e6)}` };
  const entries = readMeas().filter((e) => e.date !== data.date);
  window.localStorage.setItem(MEAS_KEY, JSON.stringify([...entries, entry]));
  return entry;
}
