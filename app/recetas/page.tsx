// Vitala — Recetario del mundo: cada platillo con su preparación paso a paso.
// Página de servidor, sin JS extra: usa <details> nativo para expandir recetas.

import type { Metadata } from "next";
import { MEALS } from "@/lib/meals";
import { vitala } from "@/lib/brand";
import RecipeArt from "@/components/RecipeArt";
import { RECIPE_IMAGES } from "@/lib/recipeImages";
import type { Allergen, MealSlot } from "@/lib/types";

export const metadata: Metadata = {
  title: "Recetas del mundo",
  description:
    "Recetario Vitala: platillos saludables de México, Japón, Grecia, India, Perú y más, con preparación paso a paso y etiquetado de alérgenos.",
};

const C = vitala.colors;

const SLOTS: { slot: MealSlot; label: string; emoji: string }[] = [
  { slot: "desayuno", label: "Desayunos", emoji: "🌅" },
  { slot: "comida", label: "Comidas", emoji: "🍽️" },
  { slot: "cena", label: "Cenas", emoji: "🌙" },
  { slot: "snack", label: "Snacks", emoji: "🍎" },
];

const ALLERGEN_LABEL: Record<Allergen, string> = {
  gluten: "Gluten",
  lacteos: "Lácteos",
  huevo: "Huevo",
  frutos_secos: "Frutos secos",
  cacahuate: "Cacahuate",
  soya: "Soya",
  mariscos: "Mariscos",
  pescado: "Pescado",
  ajonjoli: "Ajonjolí",
};

// SEO: datos estructurados schema.org/Recipe — cada platillo indexable en Google.
function recipeJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Recetario Vitala — recetas saludables del mundo",
    itemListElement: MEALS.map((m, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Recipe",
        name: m.name,
        ...(RECIPE_IMAGES[m.id] ? { image: `https://vitala.app${RECIPE_IMAGES[m.id]}` } : {}),
        recipeCuisine: m.origin,
        recipeCategory: m.slot,
        recipeIngredient: m.items,
        recipeInstructions: m.steps.map((s) => ({ "@type": "HowToStep", text: s })),
        totalTime: `PT${m.prepMin}M`,
        keywords: `receta saludable, ${m.origin}, nutrición`,
        nutrition: {
          "@type": "NutritionInformation",
          calories: `${m.baseKcal} calories`,
          proteinContent: `${m.protein} g`,
          carbohydrateContent: `${m.carbs} g`,
          fatContent: `${m.fat} g`,
        },
        author: { "@type": "Organization", name: "Vitala" },
      },
    })),
  };
}

export default function RecetasPage() {
  return (
    <div className="space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(recipeJsonLd()) }}
      />
      <header className="text-center">
        <span className="badge-amber">🌎 Cocinas de todo el mundo</span>
        <h1 className="mt-4 text-3xl font-bold sm:text-4xl">Recetario Vitala</h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm" style={{ color: C.textMuted }}>
          {MEALS.length} platillos saludables de México, Japón, Grecia, India, Perú,
          Tailandia y más — con ingredientes accesibles, preparación paso a paso y
          alérgenos siempre visibles. Tu plan semanal se arma con estas recetas según
          tu perfil.
        </p>
      </header>

      {SLOTS.map(({ slot, label, emoji }) => {
        const meals = MEALS.filter((m) => m.slot === slot);
        return (
          <section key={slot}>
            <h2 className="mb-4 text-xl font-bold" style={{ color: C.brandLight }}>
              {emoji} {label}
            </h2>
            <div className="grid gap-3">
              {meals.map((m) => (
                <details key={m.id} className="card overflow-hidden">
                  <summary className="flex cursor-pointer list-none items-center gap-4 px-4 py-3.5">
                    {RECIPE_IMAGES[m.id] ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={RECIPE_IMAGES[m.id]}
                        alt={m.name}
                        width={64}
                        height={64}
                        loading="lazy"
                        className="h-16 w-16 shrink-0 rounded-xl object-cover"
                      />
                    ) : (
                      <RecipeArt id={m.id} slot={m.slot} size={64} className="rounded-xl" />
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold leading-snug">{m.name}</div>
                      <div className="mt-0.5 text-xs" style={{ color: C.textMuted }}>
                        {m.origin} · {m.prepMin} min · {m.baseKcal} kcal · {m.protein} g proteína
                      </div>
                    </div>
                    <span aria-hidden className="text-lg" style={{ color: C.brand }}>+</span>
                  </summary>
                  <div className="space-y-4 border-t px-5 py-4" style={{ borderColor: "rgba(52,211,153,0.12)" }}>
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-wide" style={{ color: C.accent }}>
                        Ingredientes
                      </h3>
                      <ul className="mt-1.5 space-y-0.5 text-sm" style={{ color: C.textMuted }}>
                        {m.items.map((it) => (
                          <li key={it}>· {it}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-wide" style={{ color: C.accent }}>
                        Preparación
                      </h3>
                      <ol className="mt-1.5 space-y-1.5 text-sm">
                        {m.steps.map((s, i) => (
                          <li key={i} className="flex gap-2">
                            <span className="font-bold" style={{ color: C.brand }}>{i + 1}.</span>
                            <span style={{ color: C.textMuted }}>{s}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span style={{ color: C.textMuted }}>
                        {m.carbs} g carbs · {m.fat} g grasa
                      </span>
                      {m.allergens.length > 0 ? (
                        m.allergens.map((a) => (
                          <span
                            key={a}
                            className="rounded-full border px-2 py-0.5"
                            style={{ borderColor: "rgba(251,191,36,0.35)", color: C.accent }}
                          >
                            ⚠ {ALLERGEN_LABEL[a]}
                          </span>
                        ))
                      ) : (
                        <span className="rounded-full border px-2 py-0.5" style={{ borderColor: "rgba(52,211,153,0.35)", color: C.brandLight }}>
                          Sin alérgenos comunes
                        </span>
                      )}
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </section>
        );
      })}

      <p className="text-center text-xs" style={{ color: C.textMuted }}>
        Valores nutricionales aproximados por porción base. Si tienes alergias o una
        condición médica, configúralas en tu perfil: tu plan las respeta automáticamente.
      </p>
    </div>
  );
}
