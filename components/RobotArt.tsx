type Variant = "bella" | "ketty" | "swift" | "flash" | "hola" | "cc1" | "sh1" | "pudubot" | "t300" | "t600" | "generic";

export default function RobotArt({ variant = "generic", className = "" }: { variant?: Variant; className?: string }) {
  return (
    <svg viewBox="0 0 320 320" className={className}>
      <defs>
        <linearGradient id={`grad-${variant}`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#22D3EE" />
          <stop offset="100%" stopColor="#A855F7" />
        </linearGradient>
        <radialGradient id={`shadow-${variant}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`screen-${variant}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#0B1226" />
          <stop offset="100%" stopColor="#020615" />
        </linearGradient>
      </defs>
      <ellipse cx="160" cy="295" rx="110" ry="14" fill={`url(#shadow-${variant})`} />
      {renderBody(variant)}
    </svg>
  );
}

function renderBody(v: Variant) {
  const g = (s: string) => `url(#${s})`;
  switch (v) {
    case "bella":
      return (
        <>
          <rect x="80" y="50" width="160" height="200" rx="42" fill={g(`screen-bella`)} stroke={g(`grad-bella`)} strokeWidth="2" />
          <rect x="100" y="70" width="120" height="74" rx="22" fill="#06081A" stroke="rgba(255,255,255,0.08)" />
          <ellipse cx="138" cy="106" rx="11" ry="13" fill={g(`grad-bella`)} />
          <ellipse cx="182" cy="106" rx="11" ry="13" fill={g(`grad-bella`)} />
          <path d="M138 130 Q160 142 182 130" stroke={g(`grad-bella`)} strokeWidth="3" fill="none" strokeLinecap="round" />
          <rect x="92" y="160" width="136" height="10" rx="3" fill="rgba(255,255,255,0.08)" />
          <rect x="92" y="184" width="136" height="10" rx="3" fill="rgba(255,255,255,0.08)" />
          <rect x="92" y="208" width="136" height="10" rx="3" fill="rgba(255,255,255,0.08)" />
          <ellipse cx="160" cy="262" rx="92" ry="14" fill="#0B1020" stroke="rgba(255,255,255,0.08)" />
          <circle cx="120" cy="262" r="9" fill={g(`grad-bella`)} />
          <circle cx="200" cy="262" r="9" fill={g(`grad-bella`)} />
        </>
      );
    case "ketty":
      return (
        <>
          <rect x="100" y="40" width="120" height="210" rx="34" fill={g(`screen-ketty`)} stroke={g(`grad-ketty`)} strokeWidth="2" />
          <rect x="114" y="56" width="92" height="120" rx="14" fill="#06081A" />
          <text x="160" y="100" textAnchor="middle" fontFamily="sans-serif" fontSize="14" fontWeight="700" fill={g(`grad-ketty`)}>BOTMATE</text>
          <rect x="124" y="116" width="72" height="6" rx="2" fill="rgba(34,211,238,0.5)" />
          <rect x="134" y="130" width="52" height="4" rx="2" fill="rgba(255,255,255,0.2)" />
          <rect x="124" y="146" width="72" height="20" rx="6" fill={g(`grad-ketty`)} opacity="0.4" />
          <circle cx="140" cy="200" r="5" fill={g(`grad-ketty`)} />
          <circle cx="180" cy="200" r="5" fill={g(`grad-ketty`)} />
          <ellipse cx="160" cy="262" rx="76" ry="12" fill="#0B1020" />
          <circle cx="128" cy="262" r="8" fill={g(`grad-ketty`)} />
          <circle cx="192" cy="262" r="8" fill={g(`grad-ketty`)} />
        </>
      );
    case "swift":
      return (
        <>
          <rect x="84" y="48" width="152" height="206" rx="40" fill={g(`screen-swift`)} stroke={g(`grad-swift`)} strokeWidth="2" />
          <rect x="100" y="64" width="120" height="80" rx="18" fill="#06081A" />
          <rect x="118" y="84" width="84" height="44" rx="10" fill={g(`grad-swift`)} opacity="0.25" />
          <circle cx="140" cy="106" r="7" fill={g(`grad-swift`)} />
          <circle cx="180" cy="106" r="7" fill={g(`grad-swift`)} />
          <rect x="100" y="158" width="120" height="8" rx="3" fill="rgba(255,255,255,0.08)" />
          <rect x="100" y="178" width="120" height="8" rx="3" fill="rgba(255,255,255,0.08)" />
          <rect x="100" y="198" width="120" height="8" rx="3" fill="rgba(255,255,255,0.08)" />
          <rect x="100" y="218" width="120" height="8" rx="3" fill="rgba(255,255,255,0.08)" />
          <ellipse cx="160" cy="268" rx="92" ry="14" fill="#0B1020" />
        </>
      );
    case "flash":
      return (
        <>
          <rect x="86" y="46" width="148" height="210" rx="34" fill={g(`screen-flash`)} stroke={g(`grad-flash`)} strokeWidth="2" />
          <rect x="100" y="62" width="120" height="64" rx="14" fill="#06081A" />
          <rect x="116" y="80" width="88" height="6" rx="2" fill={g(`grad-flash`)} />
          <rect x="116" y="92" width="60" height="6" rx="2" fill="rgba(255,255,255,0.3)" />
          <rect x="100" y="140" width="120" height="48" rx="10" fill="#0B1020" stroke="rgba(255,255,255,0.1)" />
          <rect x="112" y="150" width="42" height="30" rx="6" fill={g(`grad-flash`)} opacity="0.4" />
          <rect x="166" y="150" width="42" height="30" rx="6" fill={g(`grad-flash`)} opacity="0.4" />
          <rect x="100" y="200" width="120" height="48" rx="10" fill="#0B1020" stroke="rgba(255,255,255,0.1)" />
          <ellipse cx="160" cy="268" rx="92" ry="14" fill="#0B1020" />
        </>
      );
    case "hola":
      return (
        <>
          <rect x="76" y="56" width="168" height="196" rx="38" fill={g(`screen-hola`)} stroke={g(`grad-hola`)} strokeWidth="2" />
          <rect x="96" y="74" width="128" height="60" rx="16" fill="#06081A" />
          <circle cx="136" cy="104" r="9" fill={g(`grad-hola`)} />
          <circle cx="184" cy="104" r="9" fill={g(`grad-hola`)} />
          <rect x="88" y="150" width="144" height="14" rx="4" fill="rgba(255,255,255,0.08)" />
          <rect x="88" y="174" width="144" height="14" rx="4" fill="rgba(255,255,255,0.08)" />
          <rect x="88" y="198" width="144" height="14" rx="4" fill="rgba(255,255,255,0.08)" />
          <rect x="88" y="222" width="144" height="14" rx="4" fill="rgba(255,255,255,0.08)" />
        </>
      );
    case "cc1":
      return (
        <>
          <ellipse cx="160" cy="180" rx="120" ry="80" fill={g(`screen-cc1`)} stroke={g(`grad-cc1`)} strokeWidth="2" />
          <ellipse cx="160" cy="148" rx="60" ry="20" fill="#06081A" />
          <ellipse cx="160" cy="148" rx="48" ry="14" fill={g(`grad-cc1`)} opacity="0.3" />
          <rect x="100" y="170" width="120" height="60" rx="10" fill="#06081A" stroke="rgba(255,255,255,0.08)" />
          <rect x="112" y="184" width="50" height="32" rx="4" fill={g(`grad-cc1`)} opacity="0.25" />
          <rect x="170" y="184" width="40" height="32" rx="4" fill="rgba(255,255,255,0.08)" />
          <circle cx="100" cy="240" r="14" fill="#0B1020" stroke={g(`grad-cc1`)} />
          <circle cx="220" cy="240" r="14" fill="#0B1020" stroke={g(`grad-cc1`)} />
        </>
      );
    case "sh1":
      return (
        <>
          <ellipse cx="160" cy="200" rx="100" ry="60" fill={g(`screen-sh1`)} stroke={g(`grad-sh1`)} strokeWidth="2" />
          <ellipse cx="160" cy="172" rx="50" ry="14" fill="#06081A" />
          <rect x="120" y="200" width="80" height="20" rx="6" fill={g(`grad-sh1`)} opacity="0.3" />
          <circle cx="110" cy="248" r="10" fill="#0B1020" stroke={g(`grad-sh1`)} />
          <circle cx="210" cy="248" r="10" fill="#0B1020" stroke={g(`grad-sh1`)} />
        </>
      );
    case "pudubot":
    case "t300":
      return (
        <>
          <rect x="60" y="120" width="200" height="100" rx="14" fill={g(`screen-${v}`)} stroke={g(`grad-${v}`)} strokeWidth="2" />
          <rect x="74" y="134" width="172" height="22" rx="4" fill="rgba(255,255,255,0.08)" />
          <rect x="74" y="166" width="172" height="22" rx="4" fill="rgba(255,255,255,0.08)" />
          <rect x="80" y="220" width="160" height="22" rx="6" fill="#06081A" />
          <circle cx="100" cy="250" r="14" fill="#0B1020" stroke={g(`grad-${v}`)} />
          <circle cx="220" cy="250" r="14" fill="#0B1020" stroke={g(`grad-${v}`)} />
          <rect x="120" y="90" width="80" height="22" rx="6" fill={g(`grad-${v}`)} opacity="0.4" />
        </>
      );
    case "t600":
      return (
        <>
          <rect x="40" y="100" width="240" height="120" rx="14" fill={g(`screen-t600`)} stroke={g(`grad-t600`)} strokeWidth="2" />
          <rect x="54" y="116" width="212" height="32" rx="4" fill="rgba(255,255,255,0.08)" />
          <rect x="54" y="156" width="212" height="32" rx="4" fill="rgba(255,255,255,0.08)" />
          <rect x="60" y="220" width="200" height="22" rx="6" fill="#06081A" />
          <circle cx="80" cy="250" r="16" fill="#0B1020" stroke={g(`grad-t600`)} />
          <circle cx="160" cy="250" r="16" fill="#0B1020" stroke={g(`grad-t600`)} />
          <circle cx="240" cy="250" r="16" fill="#0B1020" stroke={g(`grad-t600`)} />
        </>
      );
    default:
      return (
        <>
          <rect x="80" y="60" width="160" height="180" rx="36" fill={g(`screen-generic`)} stroke={g(`grad-generic`)} strokeWidth="2" />
          <rect x="100" y="78" width="120" height="68" rx="20" fill="#06081A" />
          <circle cx="138" cy="112" r="10" fill={g(`grad-generic`)} />
          <circle cx="182" cy="112" r="10" fill={g(`grad-generic`)} />
          <rect x="92" y="160" width="136" height="10" rx="3" fill="rgba(255,255,255,0.08)" />
          <rect x="92" y="184" width="136" height="10" rx="3" fill="rgba(255,255,255,0.08)" />
          <rect x="92" y="208" width="136" height="10" rx="3" fill="rgba(255,255,255,0.08)" />
          <ellipse cx="160" cy="262" rx="92" ry="14" fill="#0B1020" />
          <circle cx="120" cy="262" r="9" fill={g(`grad-generic`)} />
          <circle cx="200" cy="262" r="9" fill={g(`grad-generic`)} />
        </>
      );
  }
}

export function robotVariantFromSlug(slug: string): Variant {
  if (slug.includes("bella")) return "bella";
  if (slug.includes("ketty")) return "ketty";
  if (slug.includes("swift")) return "swift";
  if (slug.includes("flash")) return "flash";
  if (slug.includes("hola")) return "hola";
  if (slug === "cc1") return "cc1";
  if (slug === "sh1") return "sh1";
  if (slug.includes("pudubot")) return "pudubot";
  if (slug === "t300") return "t300";
  if (slug === "t600") return "t600";
  return "generic";
}
