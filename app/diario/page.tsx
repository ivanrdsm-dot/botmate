"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { vitala } from "@/lib/brand";
import { computeTargets } from "@/lib/nutrition";
import { loadProfile } from "@/lib/store";
import { getSupabase } from "@/lib/supabase";
import type { Allergen, MealSlot, Profile } from "@/lib/types";
import { addEntry, dayTotals, loadDay, removeEntry, sumItems, type DiaryEntry, type FoodItem } from "@/lib/diary";
import { QUICK_BY_SLOT, findFood } from "@/lib/foods";

const C = vitala.colors;

const ALLERGEN_ES: Record<Allergen, string> = {
  gluten: "gluten", lacteos: "lácteos", huevo: "huevo", frutos_secos: "frutos secos",
  cacahuate: "cacahuate", soya: "soya", mariscos: "mariscos", pescado: "pescado", ajonjoli: "ajonjolí",
};

const SLOTS: { id: MealSlot; label: string; emoji: string }[] = [
  { id: "desayuno", label: "Desayuno", emoji: "🌅" },
  { id: "comida", label: "Comida", emoji: "🍽️" },
  { id: "cena", label: "Cena", emoji: "🌙" },
  { id: "snack", label: "Snack", emoji: "🍎" },
];

function slotForNow(): MealSlot {
  const h = new Date().getHours();
  if (h < 11) return "desayuno";
  if (h < 17) return "comida";
  if (h < 21) return "cena";
  return "snack";
}

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
        resolve({ base64: canvas.toDataURL("image/jpeg", 0.8).split(",")[1], mediaType: "image/jpeg" });
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
    <div className="card p-4 text-center">
      <div className="text-xl font-bold" style={{ color: C.brandLight }}>{value}<span className="ml-1 text-xs font-normal" style={{ color: C.textMuted }}>{unit}</span></div>
      <div className="mt-1 text-xs" style={{ color: C.textMuted }}>{label}</div>
    </div>
  );
}

const field = "w-full rounded-xl border bg-transparent px-3 py-2 text-sm outline-none";
const fieldStyle = { borderColor: "rgba(14,122,82,.25)" } as const;

export default function Diario() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [day, setDay] = useState<DiaryEntry[]>([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [estimating, setEstimating] = useState(false);
  const [describe, setDescribe] = useState("");
  const [draft, setDraft] = useState<FoodItem[] | null>(null);
  const [draftSlot, setDraftSlot] = useState<MealSlot>("comida");
  const [notes, setNotes] = useState("");
  const [msg, setMsg] = useState("");
  const [manual, setManual] = useState({ name: "", kcal: "", protein: "", carbs: "", fat: "" });
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setProfile(loadProfile()); setDay(loadDay()); setDraftSlot(slotForNow()); }, []);

  const target = useMemo(() => (profile ? computeTargets(profile).calories : 0), [profile]);
  const totals = dayTotals();
  const remaining = target ? Math.max(0, target - totals.kcal) : 0;
  const pct = target ? Math.min(100, Math.round((totals.kcal / target) * 100)) : 0;
  const over = target ? totals.kcal > target : false;

  function ensureDraft(): FoodItem[] {
    if (draft) return draft;
    setDraftSlot(slotForNow());
    const fresh: FoodItem[] = [];
    setDraft(fresh);
    return fresh;
  }

  // ── Estimación por TEXTO (IA) ──────────────────────────────
  async function estimateFromText() {
    if (describe.trim().length < 3) return;
    setEstimating(true); setMsg("");
    try {
      const sb = getSupabase();
      const token = sb ? (await sb.auth.getSession()).data.session?.access_token : undefined;
      const res = await fetch("/api/estimate-food", {
        method: "POST",
        headers: { "content-type": "application/json", ...(token ? { authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({ text: describe.trim() }),
      });
      const data = await res.json();
      if (data.error) { setMsg(data.error); return; }
      const items: FoodItem[] = (data.items ?? []).map((i: FoodItem) => ({ ...i, confidence: i.confidence ?? "media" }));
      if (!items.length) { setMsg(data.notes || "No reconocimos platillos. Agrega manual."); return; }
      setDraft([...(draft ?? []), ...items]);
      setNotes(data.notes ?? "");
      setDescribe("");
      if (data.degraded) setMsg("Estimación básica (activa la IA en el servidor para mayor precisión).");
    } catch { setMsg("No pudimos calcular. Intenta de nuevo."); }
    finally { setEstimating(false); }
  }

  // ── Sugerencia rápida (un toque) ───────────────────────────
  function addQuick(name: string) {
    const f = findFood(name);
    if (!f) return;
    ensureDraft();
    setDraft((d) => [...(d ?? []), { name: f.name, kcal: f.kcal, protein: f.protein, carbs: f.carbs, fat: f.fat, confidence: "media" }]);
  }

  // ── Foto (IA visión) ───────────────────────────────────────
  async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setAnalyzing(true); setMsg(""); setDraft(null);
    try {
      const { base64, mediaType } = await downscale(file);
      const allergies = (profile?.allergies ?? []).map((a) => ALLERGEN_ES[a]);
      const res = await fetch("/api/analyze-food", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ base64, mediaType, allergies }),
      });
      const data = await res.json();
      setDraftSlot(slotForNow());
      if (data.degraded) setMsg(data.message);
      else if (data.error) setMsg(data.error);
      else { setDraft(data.items ?? []); setNotes(data.notes ?? ""); if (!data.items?.length) setMsg("No detectamos comida. Intenta otra foto o agrega manual."); }
    } catch { setMsg("No pudimos procesar la imagen. Intenta de nuevo."); }
    finally { setAnalyzing(false); if (inputRef.current) inputRef.current.value = ""; }
  }

  function editGrams(i: number, grams: number) {
    if (!draft) return;
    const it = draft[i];
    if (!it.grams || it.grams <= 0 || grams <= 0) return;
    const r = grams / it.grams;
    setDraft(draft.map((x, j) => j === i ? { ...x, grams, kcal: Math.round(x.kcal * r), protein: Math.round(x.protein * r), carbs: Math.round(x.carbs * r), fat: Math.round(x.fat * r) } : x));
  }

  function addManual() {
    const kcal = Number(manual.kcal);
    if (!manual.name.trim() || !kcal) return;
    ensureDraft();
    setDraft((d) => [...(d ?? []), { name: manual.name.trim(), kcal, protein: Number(manual.protein) || 0, carbs: Number(manual.carbs) || 0, fat: Number(manual.fat) || 0, confidence: "alta" }]);
    setManual({ name: "", kcal: "", protein: "", carbs: "", fat: "" });
  }

  function saveDraft() {
    if (!draft?.length) return;
    const label = SLOTS.find((s) => s.id === draftSlot)?.label ?? "Comida";
    addEntry({ title: label, slot: draftSlot, items: draft, notes });
    setDraft(null); setNotes(""); setDay(loadDay());
  }

  function deleteEntry(id: string) { removeEntry(id); setDay(loadDay()); }
  const draftTotals = draft ? sumItems(draft) : null;

  return (
    <div className="space-y-8">
      <div><h1 className="text-3xl font-bold">Diario de hoy</h1><p className="mt-1 text-sm" style={{ color: C.textMuted }}>Cuéntale a la IA qué comiste, tómale foto, o elige de las sugerencias.</p></div>

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Ring label="Consumidas" value={Math.round(totals.kcal)} unit="kcal" />
        <Ring label={target ? "Te quedan" : "Sin meta"} value={target ? remaining : 0} unit="kcal" />
        <Ring label="Proteína" value={Math.round(totals.protein)} unit="g" />
        <Ring label="Carbs / Grasa" value={Math.round(totals.carbs)} unit={`/${Math.round(totals.fat)}g`} />
      </section>

      {target > 0 && (
        <div>
          <div className="h-2.5 w-full overflow-hidden rounded-full" style={{ background: "rgba(14,122,82,.12)" }}>
            <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: over ? C.accent : C.brand }} />
          </div>
          <div className="mt-1 text-xs" style={{ color: C.textMuted }}>{Math.round(totals.kcal)} / {target} kcal {over && <span style={{ color: C.accent }}>· pasaste tu meta</span>}</div>
        </div>
      )}
      {!target && <p className="text-xs" style={{ color: C.textMuted }}>Crea tu plan en <Link href="/onboarding" className="underline">onboarding</Link> para ver tu meta.</p>}

      {/* ── Registro por TEXTO con IA ── */}
      <section className="card p-5">
        <h2 className="text-sm font-semibold" style={{ color: C.brandLight }}>✍️ Cuéntale a la IA qué comiste</h2>
        <p className="mt-1 text-xs" style={{ color: C.textMuted }}>Ej: “hoy desayuné 2 quesadillas de maíz con queso y un plátano con leche”.</p>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <input
            value={describe}
            onChange={(e) => setDescribe(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") estimateFromText(); }}
            placeholder="Describe tu comida…"
            className={field}
            style={fieldStyle}
          />
          <button onClick={estimateFromText} disabled={estimating || describe.trim().length < 3} className="btn-brand shrink-0 text-sm disabled:opacity-50">
            {estimating ? "Calculando…" : "Calcular con IA"}
          </button>
        </div>
      </section>

      {/* ── Sugerencias rápidas + foto + manual ── */}
      <section className="card p-5">
        <input ref={inputRef} type="file" accept="image/*" capture="environment" onChange={onPick} className="hidden" />
        <div className="flex flex-wrap items-center gap-2">
          <button onClick={() => inputRef.current?.click()} disabled={analyzing} className="btn-brand text-sm disabled:opacity-50">{analyzing ? "Analizando…" : "📷 Tomar / subir foto"}</button>
          <button onClick={() => ensureDraft()} className="rounded-full border px-4 py-2 text-sm font-semibold" style={{ borderColor: "rgba(14,122,82,.3)", color: C.brandLight }}>➕ Agregar manual</button>
        </div>
        <p className="mt-4 text-xs font-semibold" style={{ color: C.textMuted }}>Sugerencias rápidas · {SLOTS.find((s) => s.id === slotForNow())?.label}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {(QUICK_BY_SLOT[slotForNow()] ?? []).map((name) => {
            const f = findFood(name);
            return (
              <button key={name} onClick={() => addQuick(name)} className="rounded-full border px-3 py-1.5 text-xs" style={{ borderColor: "rgba(14,122,82,.22)", color: C.text }}>
                {name} <span style={{ color: C.textMuted }}>· {f?.kcal} kcal</span>
              </button>
            );
          })}
        </div>
        {msg && <p className="mt-3 text-sm" style={{ color: C.accent }}>{msg}</p>}
      </section>

      {draft && (
        <section className="card p-5">
          <div className="mb-3 flex flex-wrap gap-2">
            {SLOTS.map((s) => (
              <button key={s.id} onClick={() => setDraftSlot(s.id)} className="rounded-full border px-3 py-1.5 text-sm"
                style={{ borderColor: draftSlot === s.id ? C.brand : "rgba(14,122,82,.25)", background: draftSlot === s.id ? C.brand : "transparent", color: draftSlot === s.id ? "#0B2818" : C.text }}>
                {s.emoji} {s.label}
              </button>
            ))}
          </div>
          {draft.length > 0 && <h2 className="font-semibold" style={{ color: C.brandLight }}>Lo que vas a registrar:</h2>}
          <div className="mt-2 space-y-3">
            {draft.map((it, i) => (
              <div key={i} className="flex items-start justify-between gap-3 text-sm">
                <div className="min-w-0">
                  <div className="font-medium">{it.name}{it.confidence && it.confidence !== "alta" && <span className="ml-2 rounded-full px-2 py-0.5 text-[10px]" style={{ background: "rgba(180,83,9,.12)", color: C.accent }}>confianza {it.confidence}</span>}</div>
                  <div className="mt-1 flex items-center gap-2 text-xs" style={{ color: C.textMuted }}>
                    {typeof it.grams === "number" ? <><input type="number" value={it.grams} onChange={(e) => editGrams(i, Number(e.target.value))} className="w-16 rounded-lg border bg-transparent px-2 py-1 text-xs" style={fieldStyle} /> g</> : null}
                    <span>· P{Math.round(it.protein)} C{Math.round(it.carbs)} G{Math.round(it.fat)}</span>
                  </div>
                </div>
                <button onClick={() => setDraft(draft.filter((_, j) => j !== i))} className="shrink-0 text-right">
                  <div className="font-semibold" style={{ color: C.brandLight }}>{Math.round(it.kcal)} kcal</div>
                  <div className="text-xs underline" style={{ color: C.textMuted }}>quitar</div>
                </button>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-xl border p-3" style={{ borderColor: "rgba(14,122,82,.15)" }}>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-6">
              <input className={`${field} col-span-2 sm:col-span-2`} style={fieldStyle} placeholder="Alimento" value={manual.name} onChange={(e) => setManual({ ...manual, name: e.target.value })} />
              <input className={field} style={fieldStyle} type="number" placeholder="kcal" value={manual.kcal} onChange={(e) => setManual({ ...manual, kcal: e.target.value })} />
              <input className={field} style={fieldStyle} type="number" placeholder="P" value={manual.protein} onChange={(e) => setManual({ ...manual, protein: e.target.value })} />
              <input className={field} style={fieldStyle} type="number" placeholder="C" value={manual.carbs} onChange={(e) => setManual({ ...manual, carbs: e.target.value })} />
              <input className={field} style={fieldStyle} type="number" placeholder="G" value={manual.fat} onChange={(e) => setManual({ ...manual, fat: e.target.value })} />
            </div>
            <button onClick={addManual} className="mt-2 rounded-full border px-4 py-1.5 text-xs" style={{ borderColor: "rgba(14,122,82,.3)", color: C.brandLight }}>+ Añadir alimento</button>
          </div>
          {notes && <p className="mt-3 rounded-xl border p-3 text-xs" style={{ borderColor: "rgba(180,83,9,.25)", color: C.text, background: "rgba(247,178,78,.10)" }}>{notes}</p>}
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm" style={{ color: C.textMuted }}>Total: <strong style={{ color: C.brandLight }}>{Math.round(draftTotals!.kcal)} kcal</strong></span>
            <div className="flex gap-2">
              <button onClick={() => { setDraft(null); setNotes(""); }} className="rounded-full border px-4 py-2 text-sm" style={{ borderColor: "rgba(14,122,82,.25)" }}>Descartar</button>
              <button onClick={saveDraft} disabled={!draft.length} className="btn-brand text-sm disabled:opacity-40">Agregar al diario</button>
            </div>
          </div>
          <p className="mt-3 text-[11px]" style={{ color: C.textMuted }}>Estimaciones aproximadas, no exactas. No sustituye orientación profesional.</p>
        </section>
      )}

      <section>
        <h2 className="text-2xl font-bold">Registro</h2>
        {day.length === 0 ? <p className="mt-2 text-sm" style={{ color: C.textMuted }}>Aún no registras nada hoy. Cuéntale a la IA qué comiste. 👆</p> : (
          <div className="mt-4 space-y-5">
            {SLOTS.map((s) => {
              const entries = day.filter((e) => e.slot === s.id);
              if (entries.length === 0) return null;
              const sub = entries.reduce((a, e) => a + e.kcal, 0);
              return (
                <div key={s.id}>
                  <div className="mb-2 flex items-center justify-between text-sm"><span className="font-semibold">{s.emoji} {s.label}</span><span style={{ color: C.textMuted }}>{Math.round(sub)} kcal</span></div>
                  <div className="space-y-2">
                    {entries.map((e) => (
                      <div key={e.id} className="card p-4">
                        <div className="flex items-center justify-between"><span className="text-sm">{e.items.map((i) => i.name).join(", ")}</span><span className="text-sm font-semibold" style={{ color: C.brandLight }}>{Math.round(e.kcal)} kcal</span></div>
                        <button onClick={() => deleteEntry(e.id)} className="mt-2 text-xs underline" style={{ color: C.textMuted }}>Eliminar</button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
