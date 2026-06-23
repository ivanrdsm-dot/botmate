"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { vitala } from "@/lib/vitala/brand";
import { ACTIVITY_LABEL, GOAL_LABEL, validateProfile } from "@/lib/vitala/nutrition";
import { emptyProfile, loadProfile, saveProfile } from "@/lib/vitala/store";
import type { Allergen, Profile } from "@/lib/vitala/types";

const C = vitala.colors;

const ALLERGENS: { id: Allergen; label: string }[] = [
  { id: "gluten", label: "Gluten" },
  { id: "lacteos", label: "Lácteos" },
  { id: "huevo", label: "Huevo" },
  { id: "frutos_secos", label: "Frutos secos" },
  { id: "cacahuate", label: "Cacahuate" },
  { id: "soya", label: "Soya" },
  { id: "mariscos", label: "Mariscos" },
  { id: "pescado", label: "Pescado" },
  { id: "ajonjoli", label: "Ajonjolí" },
];

const PREFERENCES: { id: Profile["preference"]; label: string }[] = [
  { id: "omnivore", label: "Omnívora" },
  { id: "vegetarian", label: "Vegetariana" },
  { id: "vegan", label: "Vegana" },
  { id: "pescatarian", label: "Pescetariana" },
  { id: "keto", label: "Keto" },
  { id: "mediterranean", label: "Mediterránea" },
];

const field =
  "w-full rounded-xl border bg-transparent px-4 py-3 text-sm outline-none focus:ring-2";
const fieldStyle = { borderColor: "rgba(74,222,128,.25)" } as const;
const label = "mb-1 block text-sm font-medium opacity-80";

export default function Onboarding() {
  const router = useRouter();
  const [p, setP] = useState<Profile>(() => loadProfile() ?? emptyProfile);
  const [errors, setErrors] = useState<string[]>([]);

  const set = <K extends keyof Profile>(k: K, v: Profile[K]) =>
    setP((prev) => ({ ...prev, [k]: v }));

  const toggleAllergen = (a: Allergen) =>
    setP((prev) => ({
      ...prev,
      allergies: prev.allergies.includes(a)
        ? prev.allergies.filter((x) => x !== a)
        : [...prev.allergies, a],
    }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateProfile(p);
    setErrors(errs);
    if (errs.length) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    saveProfile(p);
    router.push("/vitala/plan");
  };

  return (
    <form onSubmit={submit} className="mx-auto max-w-2xl space-y-7">
      <div>
        <h1 className="text-3xl font-bold">Cuéntanos de ti</h1>
        <p className="mt-2 text-sm opacity-70">
          Con estos datos calculamos tus necesidades y respetamos tus alergias.
          Todo se guarda en tu dispositivo.
        </p>
      </div>

      {errors.length > 0 && (
        <ul
          className="space-y-1 rounded-xl border p-4 text-sm"
          style={{ borderColor: "rgba(248,113,113,.4)", background: "rgba(248,113,113,.08)", color: "#FCA5A5" }}
        >
          {errors.map((e) => (
            <li key={e}>• {e}</li>
          ))}
        </ul>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={label}>Nombre</label>
          <input className={field} style={fieldStyle} value={p.name}
            onChange={(e) => set("name", e.target.value)} placeholder="Tu nombre" />
        </div>
        <div>
          <label className={label}>Edad</label>
          <input type="number" className={field} style={fieldStyle} value={p.age || ""}
            onChange={(e) => set("age", Number(e.target.value))} placeholder="años" />
        </div>
        <div>
          <label className={label}>Sexo biológico</label>
          <select className={field} style={fieldStyle} value={p.sex}
            onChange={(e) => set("sex", e.target.value as Profile["sex"])}>
            <option value="female">Femenino</option>
            <option value="male">Masculino</option>
          </select>
        </div>
        <div>
          <label className={label}>Estatura (cm)</label>
          <input type="number" className={field} style={fieldStyle} value={p.heightCm || ""}
            onChange={(e) => set("heightCm", Number(e.target.value))} placeholder="cm" />
        </div>
        <div>
          <label className={label}>Peso (kg)</label>
          <input type="number" className={field} style={fieldStyle} value={p.weightKg || ""}
            onChange={(e) => set("weightKg", Number(e.target.value))} placeholder="kg" />
        </div>
        <div>
          <label className={label}>Nivel de actividad</label>
          <select className={field} style={fieldStyle} value={p.activity}
            onChange={(e) => set("activity", e.target.value as Profile["activity"])}>
            {Object.entries(ACTIVITY_LABEL).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={label}>Meta</label>
          <select className={field} style={fieldStyle} value={p.goal}
            onChange={(e) => set("goal", e.target.value as Profile["goal"])}>
            {Object.entries(GOAL_LABEL).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className={label}>Preferencia alimentaria</label>
          <div className="flex flex-wrap gap-2">
            {PREFERENCES.map((pref) => (
              <button type="button" key={pref.id} onClick={() => set("preference", pref.id)}
                className="rounded-full border px-4 py-2 text-sm"
                style={{
                  borderColor: p.preference === pref.id ? C.brand : "rgba(74,222,128,.25)",
                  background: p.preference === pref.id ? C.brand : "transparent",
                  color: p.preference === pref.id ? "#000" : "#E6F4EC",
                }}>
                {pref.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Alergias */}
      <div>
        <label className={label}>Alergias e intolerancias (obligatorio por seguridad)</label>
        <div className="flex flex-wrap gap-2">
          {ALLERGENS.map((a) => (
            <button type="button" key={a.id} onClick={() => toggleAllergen(a.id)}
              className="rounded-full border px-4 py-2 text-sm"
              style={{
                borderColor: p.allergies.includes(a.id) ? C.accent : "rgba(74,222,128,.25)",
                background: p.allergies.includes(a.id) ? "rgba(245,158,11,.15)" : "transparent",
                color: p.allergies.includes(a.id) ? C.accent : "#E6F4EC",
              }}>
              {a.label}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs opacity-60">Si no tienes alergias, déjalo vacío.</p>
      </div>

      {/* Banderas de seguridad clínica */}
      <div className="space-y-3 rounded-2xl border p-5" style={{ borderColor: "rgba(74,222,128,.18)", background: C.bgSoft }}>
        <h3 className="text-sm font-semibold" style={{ color: C.brandLight }}>Salud y seguridad</h3>
        {([
          ["pregnantOrLactating", "Estoy embarazada o en lactancia"],
          ["hasMedicalCondition", "Tengo una condición médica (diabetes, hipertensión, renal, etc.)"],
          ["takesMedication", "Tomo medicamentos de forma regular"],
        ] as const).map(([key, text]) => (
          <label key={key} className="flex items-center gap-3 text-sm">
            <input type="checkbox" checked={p[key] as boolean}
              onChange={(e) => set(key, e.target.checked)} className="h-4 w-4" />
            {text}
          </label>
        ))}
        {p.hasMedicalCondition && (
          <input className={field} style={fieldStyle} value={p.conditionNotes}
            onChange={(e) => set("conditionNotes", e.target.value)}
            placeholder="¿Cuál condición? (opcional, se queda en tu dispositivo)" />
        )}
      </div>

      {/* Disclaimer obligatorio */}
      <label className="flex items-start gap-3 rounded-2xl border p-4 text-sm"
        style={{ borderColor: "rgba(245,158,11,.3)", background: "rgba(245,158,11,.06)" }}>
        <input type="checkbox" checked={p.acceptedDisclaimer}
          onChange={(e) => set("acceptedDisclaimer", e.target.checked)} className="mt-1 h-4 w-4" />
        <span className="opacity-85">
          Entiendo que {vitala.name} ofrece orientación educativa, <strong>no realiza
          diagnósticos</strong> ni reemplaza a un profesional de la salud, y que ante
          cualquier condición debo consultar a mi médico o nutriólogo.
        </span>
      </label>

      <button type="submit"
        className="w-full rounded-full px-6 py-4 text-center font-semibold text-black"
        style={{ background: C.brand }}>
        Generar mi plan
      </button>
    </form>
  );
}
