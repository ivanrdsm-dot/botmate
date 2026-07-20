import type { Profile } from "./types";

const KEY = "vitala.profile.v1";

/** Versión vigente del aviso de salud y privacidad (bloque 4). */
export const CONSENT_VERSION = "v1-2026-07";

export function saveProfile(p: Profile): void {
  if (typeof window === "undefined") return;
  // Sella el consentimiento la primera vez que se acepta el aviso.
  const toSave: Profile =
    p.acceptedDisclaimer && !p.consent
      ? { ...p, consent: { version: CONSENT_VERSION, acceptedAt: new Date().toISOString() } }
      : p;
  window.localStorage.setItem(KEY, JSON.stringify(toSave));
}

export function loadProfile(): Profile | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(KEY);
  if (!raw) return null;
  try { return JSON.parse(raw) as Profile; } catch { return null; }
}

export function clearProfile(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEY);
}

export const emptyProfile: Profile = {
  name: "", age: 0, sex: "female", heightCm: 0, weightKg: 0,
  activity: "moderate", goal: "maintain", preference: "omnivore",
  allergies: [], pregnantOrLactating: false, hasMedicalCondition: false,
  conditionNotes: "", takesMedication: false,
  country: "México", currency: "MXN", acceptedDisclaimer: false,
};
