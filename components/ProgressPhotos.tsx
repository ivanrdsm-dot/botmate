"use client";

// Fotos de progreso: viven SOLO en el dispositivo. Análisis IA opcional
// (la foto viaja en memoria y se descarta; jamás se guarda en servidores).

import { useEffect, useRef, useState } from "react";
import { vitala } from "@/lib/brand";
import { addPhoto, loadPhotos, removePhoto, type ProgressPhoto } from "@/lib/photos";
import { getSupabase } from "@/lib/supabase";
import { loadProfile } from "@/lib/store";

const C = vitala.colors;

interface BodyAnalysis {
  observations?: string[];
  enfoque?: string;
  tips?: string[];
  confidence?: string;
  note?: string;
  message?: string;
  error?: string;
}

const FOCUS_LABEL: Record<string, string> = {
  lose: "bajar de peso con hábitos sostenibles",
  maintain: "mantener y recomponer",
  gain: "ganar masa muscular",
  unknown: "definir tu meta con un profesional",
};

export default function ProgressPhotos() {
  const [photos, setPhotos] = useState<ProgressPhoto[]>([]);
  const [busy, setBusy] = useState(false);
  const [analysisFor, setAnalysisFor] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<BodyAnalysis | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => setPhotos(loadPhotos()), []);

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    await addPhoto(file);
    setPhotos(loadPhotos());
  }

  async function analyze(photo: ProgressPhoto) {
    setBusy(true);
    setAnalysisFor(photo.id);
    setAnalysis(null);
    try {
      const base64 = photo.dataUrl.split(",")[1];
      const sb = getSupabase();
      const token = sb ? (await sb.auth.getSession()).data.session?.access_token : undefined;
      const res = await fetch("/api/analyze-body", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          ...(token ? { authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ base64, mediaType: "image/jpeg", goal: loadProfile()?.goal }),
      });
      setAnalysis(await res.json());
    } catch {
      setAnalysis({ error: "Sin conexión. Intenta más tarde." });
    } finally {
      setBusy(false);
    }
  }

  const first = photos[0];
  const last = photos[photos.length - 1];

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold" style={{ color: C.brandLight }}>📸 Fotos de progreso</h2>
          <p className="mt-0.5 text-xs" style={{ color: C.textMuted }}>
            Se guardan SOLO en tu dispositivo. Nadie más las ve.
          </p>
        </div>
        <button onClick={() => inputRef.current?.click()} className="btn-brand text-sm">
          + Agregar foto
        </button>
        <input ref={inputRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={onPick} />
      </div>

      {photos.length === 0 && (
        <div className="card p-6 text-center text-sm" style={{ color: C.textMuted }}>
          Toma una foto al iniciar y repítela cada 2-4 semanas con la misma luz y pose.
          Tu constancia se verá aunque la báscula no se mueva. 💚
        </div>
      )}

      {first && last && first.id !== last.id && (
        <div className="card p-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide" style={{ color: C.accent }}>
            Antes / Ahora
          </p>
          <div className="grid grid-cols-2 gap-3">
            {[first, last].map((p, i) => (
              <figure key={p.id}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.dataUrl} alt={i === 0 ? "Primera foto" : "Foto más reciente"} className="w-full rounded-xl object-cover" />
                <figcaption className="mt-1 text-center text-xs" style={{ color: C.textMuted }}>
                  {new Date(p.ts).toLocaleDateString("es-MX", { day: "numeric", month: "short", year: "numeric" })}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      )}

      {photos.length > 0 && (
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
          {[...photos].reverse().map((p) => (
            <div key={p.id} className="group relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.dataUrl} alt="Foto de progreso" className="aspect-[3/4] w-full rounded-xl object-cover" />
              <div className="absolute inset-x-0 bottom-0 rounded-b-xl bg-gradient-to-t from-black/60 to-transparent p-2">
                <p className="text-[10px] text-white">
                  {new Date(p.ts).toLocaleDateString("es-MX", { day: "numeric", month: "short" })}
                </p>
              </div>
              <div className="absolute right-1 top-1 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                <button
                  onClick={() => analyze(p)}
                  disabled={busy}
                  title="Análisis con IA"
                  className="rounded-full bg-white/90 px-2 py-1 text-xs shadow"
                >✨</button>
                <button
                  onClick={() => { removePhoto(p.id); setPhotos(loadPhotos()); }}
                  title="Eliminar"
                  className="rounded-full bg-white/90 px-2 py-1 text-xs shadow"
                >🗑</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {analysisFor && (
        <div className="card p-5 text-sm">
          {busy && <p style={{ color: C.textMuted }}>Analizando con cuidado… ✨</p>}
          {analysis?.error && <p style={{ color: "#B91C1C" }}>{analysis.error}</p>}
          {analysis?.message && <p style={{ color: C.textMuted }}>{analysis.message}</p>}
          {analysis?.observations && (
            <div className="space-y-3">
              <p className="font-semibold" style={{ color: C.brandLight }}>Lo que veo (con cariño y margen de error):</p>
              <ul className="space-y-1" style={{ color: C.textMuted }}>
                {analysis.observations.map((o, i) => <li key={i}>· {o}</li>)}
              </ul>
              {analysis.enfoque && FOCUS_LABEL[analysis.enfoque] && (
                <p>
                  <span className="font-semibold" style={{ color: C.accent }}>Enfoque sugerido: </span>
                  {FOCUS_LABEL[analysis.enfoque]}
                </p>
              )}
              {analysis.tips && (
                <ul className="space-y-1" style={{ color: C.textMuted }}>
                  {analysis.tips.map((t, i) => <li key={i}>✓ {t}</li>)}
                </ul>
              )}
              <p className="text-xs" style={{ color: C.textMuted }}>
                {analysis.note ?? "Orientación educativa a partir de una foto: el margen de error es alto. Un profesional de la salud es quien puede evaluarte de verdad."}
                {" "}Tu foto se analizó en memoria y ya fue descartada: nunca se guarda.
              </p>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
