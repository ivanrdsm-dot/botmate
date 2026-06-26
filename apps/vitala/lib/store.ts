// Vitala — persistencia local del perfil (sin backend; privacidad por diseño).
// Los datos del usuario viven en SU dispositivo hasta que decida sincronizar.

import type { Profile } from "./types";

const KEY = "vitala.profile.v1";

export function saveProfile(p: Profile): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(p));
}

export function loadProfile(): Profile | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Profile;
  } catch {
    return null;
  }
}

export function clearProfile(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEY);
}

export const emptyProfile: Profile = {
  name: "",
  age: 0,
  sex: "female",
  heightCm: 0,
  weightKg: 0,
  activity: "moderate",
  goal: "maintain",
  preference: "omnivore",
  allergies: [],
  pregnantOrLactating: false,
  hasMedicalCondition: false,
  conditionNotes: "",
  takesMedication: false,
  country: "México",
  currency: "MXN",
  acceptedDisclaimer: false,
};
