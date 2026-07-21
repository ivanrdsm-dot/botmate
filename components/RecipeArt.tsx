// Vitala — arte generativo por receta (sin assets, sin licencias, nítido siempre).
// Gradiente cálido determinista por platillo + emoji protagonista con textura.
// Si existe foto real (lib/recipeImages), la UI la prefiere sobre este arte.

const EMOJI: Record<string, string> = {
  d1: "🥣", d2: "🍳", d3: "🍓", d4: "🌶️", d5: "🥤", d6: "🥘", d7: "🍅", d8: "🥑",
  c1: "🍗", c2: "🐟", c3: "🍛", c4: "🌮", c5: "🥗", c6: "🥥", c7: "🍣", c8: "🍛",
  c9: "🥢", c10: "🍋", n1: "🍄", n2: "🐠", n3: "🎃", n4: "🌯", n5: "🥬", n6: "🍲",
  n7: "🍜", n8: "🫒", s1: "🍎", s2: "🫐", s3: "🥕", s4: "🫘", s5: "🍫", s6: "🥒", s7: "🫓",
};

// Paletas cálidas por momento del día.
const PALETTES: Record<string, [string, string, string]> = {
  desayuno: ["#FDE8C8", "#F7C873", "#E8975A"], // amanecer miel
  comida:   ["#DFF2E4", "#9AD8AE", "#4CC38A"], // jade fresco
  cena:     ["#E7E4F4", "#B9AEDC", "#8B7EC8"], // atardecer lavanda
  snack:    ["#FBE5DB", "#F5B79B", "#E8875F"], // durazno
};

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export default function RecipeArt({
  id,
  slot,
  size = 64,
  className = "",
}: {
  id: string;
  slot: string;
  size?: number;
  className?: string;
}) {
  const [c1, c2, c3] = PALETTES[slot] ?? PALETTES.comida;
  const angle = (hash(id) % 4) * 45 + 15;
  const emoji = EMOJI[id] ?? "🥗";
  return (
    <div
      aria-hidden
      className={`relative flex shrink-0 items-center justify-center overflow-hidden ${className}`}
      style={{
        width: size,
        height: size,
        background: `linear-gradient(${angle}deg, ${c1} 0%, ${c2} 55%, ${c3} 100%)`,
      }}
    >
      {/* textura: el mismo emoji gigante, tenue y girado */}
      <span
        className="absolute select-none"
        style={{
          fontSize: size * 1.15,
          opacity: 0.18,
          transform: `rotate(${(hash(id) % 5) * 8 - 16}deg) translate(${size * 0.22}px, ${size * 0.18}px)`,
          filter: "saturate(0.8)",
        }}
      >
        {emoji}
      </span>
      <span
        className="relative select-none"
        style={{ fontSize: size * 0.52, filter: "drop-shadow(0 2px 3px rgba(38,56,46,0.25))" }}
      >
        {emoji}
      </span>
    </div>
  );
}
