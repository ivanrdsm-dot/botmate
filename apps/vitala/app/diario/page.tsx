"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { vitala } from "@/lib/brand";
import { computeTargets } from "@/lib/nutrition";
import { loadProfile } from "@/lib/store";
import type { Allergen, Profile } from "@/lib/types";
import {
  addEntry,
  dayTotals,
  loadDay,
  removeEntry,
  sumItems,
  todayKey,
  type DiaryEntry,
  type FoodItem,
} from "@/lib/diary";

const C = vitala.colors;

const ALLERGEN_ES: Record<Allergen, string> = {
  gluten: "gluten",
  lacteos: "lácteos",
  huevo: "huevo",
  frutos_secos: "frutos secos",
  cacahuate: "cacahuate",
  soya: "soya",
  mariscos: "mariscos",
  pescado: "pescado",
  ajonjoli: "ajonjolí",
};

// Reduce la imagen a máx 1024px y la devuelve como base64 jpeg (ligera y barata).
function downscale(file: File): Promise<{ base64: string; mediaType: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const max = 1024;
        const scale = Math.min(1, max / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("canvas"));
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.8);
        resolve({ base64: dataUrl.split(",")[1], mediaType: "image/jpeg" });
      };
      img.onerror = reject;
      img.src = reader.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function Ring({ label, value, unit }: { label: string; value: number; unit: string }) {
  return (
    <div className="rounded-2xl border p-4 text-center" style={{ borderColor: "rgba(74,222,128,.18)", background: C.bgSoft }}>
      <div className="text-xl font-bold" style={{ color: C.brandLight }}>
        {value}<span className="ml-1 text-xs font-normal opacity-60">{unit}</span>
      </div>
      <div className="mt-1 text-xs opacity-70">{label}</div>
    </div>
  );
}

export default function Diario() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [day, setDay] = useState<DiaryEntry[]>([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [draft, setDraft] = useState<FoodItem[] | null>(null);
  const [notes, setNotes] = useState("");
  const [msg, setMsg] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setProfile(loadProfile());
    setDay(loadDay());
  }, []);

  const target = useMemo(() => (profile ? computeTargets(profile).calories : 0), [profile]);
  const totals = dayTotals();
  const remaining = target ? Math.max(0, target - totals.kcal) : 0;

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setAnalyzing(true);
    setMsg("");
    setDraft(null);
    try {
      const { base64, mediaType } = await downscale(file);
      const allergies = (profile?.allergies ?? []).map((a) => ALLERGEN_ES[a]);
      const res = await fetch("/api/analyze-food", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ base64, mediaType, allergies }),
      });
      const data = await res.json();
      if (data.degraded) {
        setMsg(data.message);
      } else if (data.error) {
        setMsg(data.error);
      } else {
        setDraft(data.items ?? []);
        setNotes(data.notes ?? "");
        if (!data.items?.length) setMsg("No detectamos comida en la foto. Intenta otra.");
      }
    } catch {
      setMsg("No pudimos procesar la imagen. Intenta de nuevo.");
    } finally {
      setAnalyzing(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function saveDraft() {
    if (!draft?.length) return;
    addEntry({ title: "Comida", items: draft, notes });
    setDraft(null);
    setNotes("");
    setDay(loadDay());
  }

  function deleteEntry(id: string) {
    removeEntry(id);
    setDay(loadDay());
  }

  const draftTotals = draft ? sumItems(draft) : null;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Diario de hoy 📸</h1>
        <p className="mt-1 text-sm opacity-70">
          Toma una foto de tu plato y la IA estima calorías y macros.
        </p>
      </div>

      {/* Totales del día */}
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Ring label="Consumidas" value={Math.round(totals.kcal)} unit="kcal" />
        <Ring label={target ? "Te quedan" : "Sin meta"} value={target ? remaining : 0} unit="kcal" />
        <Ring label="Proteína" value={Math.round(totals.protein)} unit="g" />
        <Ring label="Carbs / Grasa" value={Math.round(totals.carbs)} unit={`/${Math.round(totals.fat)}g`} />
      </section>
      {!target && (
        <p className="text-xs opacity-60">
          Crea tu plan en <Link href="/onboarding" className="underline">onboarding</Link> para ver tu meta diaria.
        </p>
      )}

      {/* Captura */}
      <section className="rounded-2xl border p-5 text-center" style={{ borderColor: "rgba(74,222,128,.2)", background: C.bgSoft }}>
        <input ref={inputRef} type="file" accept="image/*" capture="environment" onChange={onPick} className="hidden" />
        <button
          onClick={() => inputRef.current?.click()}
          disabled={analyzing}
          className="rounded-full px-6 py-3 font-semibold text-black disabled:opacity-50"
          style={{ background: C.brand }}
        >
          {analyzing ? "Analizando…" : "📷 Tomar / subir foto"}
        </button>
        {msg && <p className="mt-3 text-sm" style={{ color: C.accent }}>{msg}</p>}
      </section>

      {/* Borrador a confirmar */}
      {draft && draft.length > 0 && (
        <section className="rounded-2xl border p-5" style={{ borderColor: "rgba(74,222,128,.25)", background: C.bgSoft }}>
          <h2 className="font-semibold" style={{ color: C.brandLight }}>Detectamos:</h2>
          <div className="mt-3 space-y-2">
            {draft.map((it, i) => (
              <div key={i} className="flex items-start justify-between gap-3 text-sm">
                <div>
                  <div className="font-medium">
                    {it.name}
                    {it.grams ? <span className="opacity-50"> · {it.grams} g</span> : null}
                    {it.confidence && it.confidence !== "alta" && (
                      <span className="ml-2 rounded-full px-2 py-0.5 text-[10px]" style={{ background: "rgba(245,158,11,.15)", color: C.accent }}>
                        confianza {it.confidence}
                      </span>
                    )}
                  </div>
                  <div className="text-xs opacity-60">P{Math.round(it.protein)} · C{Math.round(it.carbs)} · G{Math.round(it.fat)}</div>
                </div>
                <button onClick={() => setDraft(draft.filter((_, j) => j !== i))} className="shrink-0 text-right">
                  <div className="font-semibold" style={{ color: C.brandLight }}>{Math.round(it.kcal)} kcal</div>
                  <div className="text-xs opacity-50 underline">quitar</div>
                </button>
              </div>
            ))}
          </div>
          {notes && (
            <p className="mt-3 rounded-xl border p-3 text-xs" style={{ borderColor: "rgba(245,158,11,.3)", color: "#FCD9A0" }}>
              {notes}
            </p>
          )}
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm opacity-70">Total: <strong style={{ color: C.brandLight }}>{Math.round(draftTotals!.kcal)} kcal</strong></span>
            <div className="flex gap-2">
              <button onClick={() => { setDraft(null); setNotes(""); }} className="rounded-full border px-4 py-2 text-sm" style={{ borderColor: "rgba(74,222,128,.25)" }}>
                Descartar
              </button>
              <button onClick={saveDraft} className="rounded-full px-5 py-2 text-sm font-semibold text-black" style={{ background: C.brand }}>
                Agregar al diario
              </button>
            </div>
          </div>
          <p className="mt-3 text-[11px] opacity-50">Estimaciones aproximadas con IA, no valores exactos. No sustituye orientación profesional.</p>
        </section>
      )}

      {/* Registro del día */}
      <section>
        <h2 className="text-2xl font-bold">Registro</h2>
        {day.length === 0 ? (
          <p className="mt-2 text-sm opacity-60">Aún no registras nada hoy. Toma tu primera foto. 👆</p>
        ) : (
          <div className="mt-4 space-y-3">
            {day.map((e) => (
              <div key={e.id} className="rounded-2xl border p-4" style={{ borderColor: "rgba(74,222,128,.15)", background: C.bgSoft }}>
                <div className="flex items-center justify-between">
                  <span className="font-medium">{e.title}</span>
                  <span className="text-sm font-semibold" style={{ color: C.brandLight }}>{Math.round(e.kcal)} kcal</span>
                </div>
                <div className="mt-1 text-xs opacity-60">{e.items.map((i) => i.name).join(", ")}</div>
                <button onClick={() => deleteEntry(e.id)} className="mt-2 text-xs underline opacity-50 hover:opacity-100">Eliminar</button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
