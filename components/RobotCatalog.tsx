"use client";
import { useState } from "react";
import Link from "next/link";
import { Search, X, ArrowUpRight } from "lucide-react";
import { robots, categoryLabel, type RobotCategory } from "@/lib/robots";
import RobotCard from "./RobotCard";
export default function RobotCatalog() {
  const [category, setCategory] = useState<RobotCategory | "all">("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const normalize = (s: string) =>
    s
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  const list = robots.filter(
    (r) =>
      (category === "all" || r.category === category) &&
      normalize([r.name, r.tagline, ...r.useCases].join(" ")).includes(
        normalize(query),
      ),
  );
  const compare = robots.filter((r) => selected.includes(r.slug));
  return (
    <div>
      <div className="catalog-tools">
        <div
          className="filter-tabs"
          role="group"
          aria-label="Filtrar por aplicación"
        >
          {(
            ["all", "delivery", "guidance", "cleaning", "logistics"] as const
          ).map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={category === c}
              onClick={() => setCategory(c)}
            >
              {c === "all" ? "Todos" : categoryLabel[c]}
            </button>
          ))}
        </div>
        <label className="catalog-search">
          <Search size={18} />
          <span className="sr-only">Buscar robot o industria</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar robot o industria"
            type="search"
          />
        </label>
      </div>
      <p className="result-count" aria-live="polite">
        {list.length} {list.length === 1 ? "modelo" : "modelos"} · Selecciona
        hasta 3 para comparar aplicaciones.
      </p>
      <div className="catalog-grid">
        {list.map((r) => (
          <div key={r.slug}>
            <RobotCard robot={r} />
            <label className="compare-choice">
              <input
                type="checkbox"
                checked={selected.includes(r.slug)}
                disabled={!selected.includes(r.slug) && selected.length >= 3}
                onChange={() =>
                  setSelected((v) =>
                    v.includes(r.slug)
                      ? v.filter((x) => x !== r.slug)
                      : [...v, r.slug],
                  )
                }
              />
              Comparar {r.name}
            </label>
          </div>
        ))}
      </div>
      {list.length === 0 && (
        <div className="empty-state">
          <h2>No encontramos ese modelo.</h2>
          <p>Prueba con otra aplicación o busca por industria.</p>
          <button
            className="btn-ghost"
            onClick={() => {
              setQuery("");
              setCategory("all");
            }}
          >
            Restablecer búsqueda
          </button>
        </div>
      )}
      {selected.length > 0 && (
        <section
          className="comparison-panel"
          aria-label="Comparación de robots"
        >
          <div className="section-heading-row">
            <div>
              <p className="eyebrow">Tu selección</p>
              <h2>Compara por aplicación.</h2>
            </div>
            <button className="btn-ghost" onClick={() => setSelected([])}>
              Limpiar
              <X size={16} />
            </button>
          </div>
          {selected.length === 1 ? (
            <p>Selecciona otro modelo para verlos lado a lado.</p>
          ) : (
            <div
              className="table-scroll"
              role="region"
              tabIndex={0}
              aria-label="Tabla comparativa de modelos"
            >
              <table>
                <caption className="sr-only">
                  Aplicaciones y operación de los robots seleccionados
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Qué necesitas</th>
                    {compare.map((r) => (
                      <th key={r.slug} scope="col">
                        {r.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Aplicación</th>
                    {compare.map((r) => (
                      <td key={r.slug}>{categoryLabel[r.category]}</td>
                    ))}
                  </tr>
                  <tr>
                    <th scope="row">Espacios</th>
                    {compare.map((r) => (
                      <td key={r.slug}>{r.useCases.join(", ")}</td>
                    ))}
                  </tr>
                  <tr>
                    <th scope="row">Aspectos a considerar</th>
                    {compare.map((r) => (
                      <td key={r.slug}>{r.highlights.join(" · ")}</td>
                    ))}
                  </tr>
                  <tr>
                    <th scope="row">Siguiente paso</th>
                    {compare.map((r) => (
                      <td key={r.slug}>
                        <Link
                          className="text-link"
                          href={`/contacto?robot=${encodeURIComponent(r.name)}&interes=Cotizacion`}
                        >
                          Consultar modelo
                          <ArrowUpRight size={15} />
                        </Link>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
