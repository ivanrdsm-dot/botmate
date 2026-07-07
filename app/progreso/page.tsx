"use client";

import { useEffect, useState } from "react";
import Reveal from "@/components/Reveal";
import { vitala } from "@/lib/brand";
import {
  addMeasurementsEntry,
  addWeightEntry,
  loadMeasurements,
  loadWeightLog,
  removeWeightEntry,
  type MeasurementsEntry,
  type WeightEntry,
} from "@/lib/progress";
import { loadProfile } from "@/lib/store";

const C = vitala.colors;

function WeightChart({ entries }: { entries: WeightEntry[] }) {
  const W = 480;
  const H = 160;
  const PAD = { top: 16, bottom: 28, left: 36, right: 16 };
  const iW = W - PAD.left - PAD.right;
  const iH = H - PAD.top - PAD.bottom;

  if (entries.length < 2) {
    return (
      <div
        className="flex h-40 items-center justify-center rounded-2xl border text-sm opacity-60"
        style={{ borderColor: "rgba(74,222,128,.15)", background: C.bgSoft }}
      >
        Registra al menos 2 pesadas para ver la gráfica
      </div>
    );
  }

  const kgs = entries.map((e) => e.kg);
  const minKg = Math.min(...kgs) - 0.5;
  const maxKg = Math.max(...kgs) + 0.5;

  const xOf = (i: number) => PAD.left + (i / (entries.length - 1)) * iW;
  const yOf = (kg: number) => PAD.top + ((maxKg - kg) / (maxKg - minKg)) * iH;

  const points = entries.map((e, i) => `${xOf(i)},${yOf(e.kg)}`).join(" ");
  const area = `M${xOf(0)},${yOf(entries[0].kg)} ${entries
    .map((e, i) => `L${xOf(i)},${yOf(e.kg)}`)
    .join(" ")} L${xOf(entries.length - 1)},${PAD.top + iH} L${xOf(0)},${PAD.top + iH} Z`;

  const first = entries[0];
  const last = entries[entries.length - 1];
  const delta = last.kg - first.kg;
  const isDown = delta < 0;

  const yLabels = [minKg + 0.5, (minKg + maxKg) / 2, maxKg - 0.5].map(
    (v) => Math.round(v * 10) / 10,
  );

  return (
    <div
      className="overflow-hidden rounded-2xl border"
      style={{ borderColor: "rgba(74,222,128,.18)", background: C.bgSoft }}
    >
      <div className="flex items-center justify-between px-5 pt-4">
        <span className="text-sm font-semibold" style={{ color: C.brandLight }}>
          Evolución del peso
        </span>
        <span
          className="rounded-full px-3 py-0.5 text-xs font-semibold"
          style={{
            background: isDown ? "rgba(74,222,128,.15)" : "rgba(245,158,11,.15)",
            color: isDown ? C.brandLight : C.accent,
          }}
        >
          {delta > 0 ? "+" : ""}{delta.toFixed(1)} kg
        </span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="mt-1 w-full">
        <defs>
          <linearGradient id="wgrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={C.brand} stopOpacity="0.3" />
            <stop offset="100%" stopColor={C.brand} stopOpacity="0.0" />
          </linearGradient>
        </defs>
        {yLabels.map((v) => (
          <text key={v} x={PAD.left - 4} y={yOf(v) + 4} textAnchor="end" fontSize="9" fill="rgba(230,244,236,.4)">{v}</text>
        ))}
        {yLabels.map((v) => (
          <line key={v} x1={PAD.left} y1={yOf(v)} x2={PAD.left + iW} y2={yOf(v)} stroke="rgba(74,222,128,.08)" strokeWidth="1" />
        ))}
        <path d={area} fill="url(#wgrad)" />
        <polyline points={points} fill="none" stroke={C.brand} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
        {entries.map((e, i) => (
          <circle key={e.id} cx={xOf(i)} cy={yOf(e.kg)} r="3" fill={C.brandLight} />
        ))}
        <text x={xOf(0)} y={H - 6} textAnchor="middle" fontSize="9" fill="rgba(230,244,236,.4)">{first.date.slice(5)}</text>
        <text x={xOf(entries.length - 1)} y={H - 6} textAnchor="middle" fontSize="9" fill="rgba(230,244,236,.4)">{last.date.slice(5)}</text>
      </svg>
    </div>
  );
}

function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export default function ProgresoPage() {
  const [entries, setEntries] = useState<WeightEntry[]>([]);
  const [meas, setMeas] = useState<MeasurementsEntry[]>([]);
  const [kg, setKg] = useState("");
  const [date, setDate] = useState(todayStr());
  const [notes, setNotes] = useState("");
  const [tab, setTab] = useState<"peso" | "medidas">("peso");
  const [mForm, setMForm] = useState({ waistCm: "", hipCm: "", chestCm: "", armCm: "", bodyFatPct: "" });
  const [goalKg, setGoalKg] = useState<number | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setEntries(loadWeightLog());
    setMeas(loadMeasurements());
    const profile = loadProfile();
    if (profile) {
      setGoalKg(
        profile.goal === "lose"
          ? Math.max(profile.weightKg - 5, 50)
          : profile.goal === "gain"
          ? profile.weightKg + 5
          : null,
      );
    }
    setReady(true);
  }, []);

  if (!ready) return null;

  const recent = entries.slice(-30);
  const latest = entries.length ? entries[entries.length - 1] : null;
  const first = entries.length ? entries[0] : null;
  const delta = latest && first ? latest.kg - first.kg : null;

  function handleAddWeight(e: React.FormEvent) {
    e.preventDefault();
    const v = parseFloat(kg);
    if (!v || v < 20 || v > 500) return;
    addWeightEntry(v, date, notes.trim() || undefined);
    setEntries(loadWeightLog());
    setKg("");
    setNotes("");
  }

  function handleDelete(id: string) {
    removeWeightEntry(id);
    setEntries(loadWeightLog());
  }

  function handleAddMeas(e: React.FormEvent) {
    e.preventDefault();
    const d: Omit<MeasurementsEntry, "id"> = { date };
    if (mForm.waistCm) d.waistCm = parseFloat(mForm.waistCm);
    if (mForm.hipCm) d.hipCm = parseFloat(mForm.hipCm);
    if (mForm.chestCm) d.chestCm = parseFloat(mForm.chestCm);
    if (mForm.armCm) d.armCm = parseFloat(mForm.armCm);
    if (mForm.bodyFatPct) d.bodyFatPct = parseFloat(mForm.bodyFatPct);
    if (Object.keys(d).length < 2) return;
    addMeasurementsEntry(d);
    setMeas(loadMeasurements());
    setMForm({ waistCm: "", hipCm: "", chestCm: "", armCm: "", bodyFatPct: "" });
  }

  const inp = "w-full rounded-xl border bg-transparent px-4 py-3 text-sm outline-none focus:ring-2";
  const inpStyle = { borderColor: "rgba(74,222,128,.25)" } as const;

  return (
    <div className="space-y-8">
      <Reveal><div><h1 className="text-3xl font-bold">Mi progreso</h1><p className="mt-1 text-sm opacity-70">Registra tu peso y medidas para ver tu evolución.</p></div></Reveal>

      {latest && (
        <Reveal>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-2xl border p-4 text-center" style={{ borderColor: "rgba(74,222,128,.18)", background: C.bgSoft }}>
              <div className="text-xl font-bold" style={{ color: C.brandLight }}>{latest.kg} kg</div>
              <div className="mt-1 text-xs opacity-70">Peso actual</div>
            </div>
            {first && first.id !== latest.id && (
              <div className="rounded-2xl border p-4 text-center" style={{ borderColor: "rgba(74,222,128,.18)", background: C.bgSoft }}>
                <div className="text-xl font-bold" style={{ color: C.brandLight }}>{first.kg} kg</div>
                <div className="mt-1 text-xs opacity-70">Peso inicial</div>
              </div>
            )}
            {delta !== null && (
              <div className="rounded-2xl border p-4 text-center" style={{ borderColor: "rgba(74,222,128,.18)", background: C.bgSoft }}>
                <div className="text-xl font-bold" style={{ color: delta < 0 ? C.brandLight : C.accent }}>{delta > 0 ? "+" : ""}{delta.toFixed(1)} kg</div>
                <div className="mt-1 text-xs opacity-70">Cambio total</div>
              </div>
            )}
            {goalKg && (
              <div className="rounded-2xl border p-4 text-center" style={{ borderColor: "rgba(74,222,128,.18)", background: C.bgSoft }}>
                <div className="text-xl font-bold" style={{ color: C.accent }}>{goalKg} kg</div>
                <div className="mt-1 text-xs opacity-70">Meta estimada</div>
              </div>
            )}
          </div>
        </Reveal>
      )}

      {recent.length > 0 && <Reveal><WeightChart entries={recent} /></Reveal>}

      <div className="flex gap-2">
        {(["peso", "medidas"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)} className="rounded-full px-5 py-2 text-sm font-semibold transition-colors"
            style={tab === t ? { background: C.brand, color: "#000" } : { border: `1px solid rgba(74,222,128,.25)`, color: C.brandLight }}>
            {t === "peso" ? "Peso" : "Medidas"}
          </button>
        ))}
      </div>

      {tab === "peso" && (
        <div className="space-y-6">
          <Reveal>
            <form onSubmit={handleAddWeight} className="rounded-2xl border p-5 space-y-4" style={{ borderColor: "rgba(74,222,128,.18)", background: C.bgSoft }}>
              <h2 className="font-semibold" style={{ color: C.brandLight }}>Registrar peso</h2>
              <div className="grid gap-3 sm:grid-cols-3">
                <div><label className="mb-1 block text-xs opacity-70">Fecha</label><input type="date" value={date} max={todayStr()} onChange={(e) => setDate(e.target.value)} className={inp} style={inpStyle} /></div>
                <div><label className="mb-1 block text-xs opacity-70">Peso (kg)</label><input type="number" step="0.1" min="20" max="500" placeholder="70.5" value={kg} onChange={(e) => setKg(e.target.value)} className={inp} style={inpStyle} required /></div>
                <div><label className="mb-1 block text-xs opacity-70">Nota (opcional)</label><input type="text" placeholder="Mañana en ayunas…" value={notes} onChange={(e) => setNotes(e.target.value)} className={inp} style={inpStyle} /></div>
              </div>
              <button type="submit" className="rounded-full px-6 py-2.5 text-sm font-semibold text-black" style={{ background: C.brand }}>Guardar</button>
            </form>
          </Reveal>
          {entries.length > 0 && (
            <Reveal>
              <div className="space-y-2">
                <h2 className="font-semibold text-sm opacity-70">Historial</h2>
                {[...entries].reverse().slice(0, 20).map((e) => (
                  <div key={e.id} className="flex items-center justify-between rounded-xl border px-4 py-3 text-sm" style={{ borderColor: "rgba(74,222,128,.12)", background: C.bgSoft }}>
                    <div><span className="font-semibold" style={{ color: C.brandLight }}>{e.kg} kg</span><span className="ml-3 opacity-60 text-xs">{e.date}</span>{e.notes && <span className="ml-3 opacity-50 text-xs">{e.notes}</span>}</div>
                    <button onClick={() => handleDelete(e.id)} className="rounded-lg px-2 py-1 text-xs opacity-40 hover:opacity-80 transition-opacity">✕</button>
                  </div>
                ))}
              </div>
            </Reveal>
          )}
        </div>
      )}

      {tab === "medidas" && (
        <div className="space-y-6">
          <Reveal>
            <form onSubmit={handleAddMeas} className="rounded-2xl border p-5 space-y-4" style={{ borderColor: "rgba(74,222,128,.18)", background: C.bgSoft }}>
              <h2 className="font-semibold" style={{ color: C.brandLight }}>Registrar medidas</h2>
              <div><label className="mb-1 block text-xs opacity-70">Fecha</label><input type="date" value={date} max={todayStr()} onChange={(e) => setDate(e.target.value)} className={inp} style={inpStyle} /></div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[{key:"waistCm",label:"Cintura (cm)"},{key:"hipCm",label:"Cadera (cm)"},{key:"chestCm",label:"Pecho (cm)"},{key:"armCm",label:"Brazo (cm)"},{key:"bodyFatPct",label:"% grasa corporal"}].map(({key,label:lbl})=>(
                  <div key={key}><label className="mb-1 block text-xs opacity-70">{lbl}</label><input type="number" step="0.1" min="0" placeholder="—" value={mForm[key as keyof typeof mForm]} onChange={(e)=>setMForm(prev=>({...prev,[key]:e.target.value}))} className={inp} style={inpStyle} /></div>
                ))}
              </div>
              <button type="submit" className="rounded-full px-6 py-2.5 text-sm font-semibold text-black" style={{ background: C.brand }}>Guardar</button>
            </form>
          </Reveal>
          {meas.length > 0 && (
            <Reveal>
              <div className="space-y-2">
                <h2 className="font-semibold text-sm opacity-70">Historial de medidas</h2>
                {[...meas].reverse().slice(0,10).map((m)=>(
                  <div key={m.id} className="rounded-xl border px-4 py-3 text-sm" style={{ borderColor: "rgba(74,222,128,.12)", background: C.bgSoft }}>
                    <div className="font-medium text-xs opacity-60 mb-1">{m.date}</div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1">
                      {m.waistCm && <span>Cintura: <strong>{m.waistCm}</strong> cm</span>}
                      {m.hipCm && <span>Cadera: <strong>{m.hipCm}</strong> cm</span>}
                      {m.chestCm && <span>Pecho: <strong>{m.chestCm}</strong> cm</span>}
                      {m.armCm && <span>Brazo: <strong>{m.armCm}</strong> cm</span>}
                      {m.bodyFatPct && <span>Grasa: <strong>{m.bodyFatPct}</strong>%</span>}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          )}
        </div>
      )}

      {entries.length === 0 && (
        <Reveal>
          <div className="rounded-2xl border p-6 text-center text-sm opacity-70" style={{ borderColor: "rgba(74,222,128,.15)" }}>
            <p>Aún no tienes registros. Agrega tu peso de hoy para empezar.</p>
            <p className="mt-1 text-xs opacity-60">Se recomienda pesarse a la misma hora, idealmente en ayunas.</p>
          </div>
        </Reveal>
      )}
    </div>
  );
}
