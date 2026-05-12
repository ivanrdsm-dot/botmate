"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import SectionTitle from "./SectionTitle";

type Row = { label: string; values: (string | boolean)[] };

const cols = ["BellaBot Pro", "KettyBot Pro", "SwiftBot", "CC1"];
const rows: Row[] = [
  { label: "Categoría", values: ["Entrega", "Entrega + Marketing", "Hospitalidad premium", "Limpieza 4 en 1"] },
  { label: "Carga máxima", values: ["40 kg", "15 kg", "40 kg", "—"] },
  { label: "Bandejas", values: ["4", "3", "Modulares", "—"] },
  { label: "Pantalla publicitaria", values: [false, true, true, false] },
  { label: "Expresiones faciales", values: [true, true, true, false] },
  { label: "Ancho", values: ["53 cm", "47 cm", "55 cm", "60 cm"] },
  { label: "Rendimiento", values: ["—", "—", "—", "1,000 m²/h"] },
  { label: "Autonomía", values: ["12-24 h", "16 h", "12 h", "4 h"] },
  { label: "Plan recomendado", values: ["Renta anual", "Renta semestral", "Venta + leasing", "Renta anual"] },
];

export default function Compare() {
  const [filter, setFilter] = useState<"todos" | "rest" | "limp">("todos");

  const visible = (i: number) =>
    filter === "todos" ||
    (filter === "rest" && i < 3) ||
    (filter === "limp" && i === 3);

  return (
    <section className="py-24">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionTitle
            eyebrow="Comparador"
            title={<>Elige el robot <span className="gradient-text">correcto</span></>}
            description="Compara modelos lado a lado y decide con datos. Si tienes dudas, agendamos una llamada de 15 minutos sin compromiso."
          />
          <div className="flex gap-2 rounded-full border border-white/10 bg-bg-card/60 p-1">
            {([
              ["todos", "Todos"],
              ["rest", "Servicio"],
              ["limp", "Limpieza"],
            ] as const).map(([k, l]) => (
              <button
                key={k}
                onClick={() => setFilter(k)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                  filter === k ? "bg-gradient-to-r from-accent to-accent-violet text-white" : "text-white/60 hover:text-white"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-bg-card/40">
          <div className="grid border-b border-white/10" style={{ gridTemplateColumns: `220px repeat(${cols.length}, 1fr)` }}>
            <div className="bg-bg-soft px-5 py-4 text-xs uppercase tracking-wider text-white/50">Característica</div>
            {cols.map((c, i) =>
              visible(i) ? (
                <div key={c} className="border-l border-white/10 bg-bg-soft px-5 py-4 font-display text-sm font-semibold">
                  {c}
                </div>
              ) : null
            )}
          </div>
          {rows.map((r, idx) => (
            <div
              key={r.label}
              className={`grid border-b border-white/5 ${idx % 2 === 0 ? "bg-white/[0.015]" : ""}`}
              style={{ gridTemplateColumns: `220px repeat(${cols.length}, 1fr)` }}
            >
              <div className="px-5 py-4 text-sm text-white/60">{r.label}</div>
              {r.values.map((v, i) =>
                visible(i) ? (
                  <div key={i} className="border-l border-white/5 px-5 py-4 text-sm">
                    {typeof v === "boolean" ? (
                      v ? <Check className="h-4 w-4 text-accent" /> : <X className="h-4 w-4 text-white/30" />
                    ) : (
                      <span className="text-white/90">{v}</span>
                    )}
                  </div>
                ) : null
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
