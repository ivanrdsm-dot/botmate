export default function Logo({
  className = "h-8",
  withWordmark = true,
}: {
  className?: string;
  withWordmark?: boolean;
}) {
  if (!withWordmark) {
    return <RobotMark className={className} />;
  }
  return (
    <svg viewBox="0 0 240 64" className={className} role="img" aria-label="BotMate">
      <defs>
        <linearGradient id="botmate-blue" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#5B73FB" />
          <stop offset="100%" stopColor="#3D5AFE" />
        </linearGradient>
      </defs>
      {/* "bot" */}
      <text
        x="0"
        y="50"
        fontFamily="var(--font-display), system-ui, sans-serif"
        fontWeight="900"
        fontSize="56"
        fill="url(#botmate-blue)"
        letterSpacing="-2"
      >
        bot
      </text>
      {/* mini robot between bot and mate */}
      <g transform="translate(99,16)">
        <rect x="0" y="2" width="26" height="32" rx="6" fill="#F4F5FB" stroke="#1F2540" strokeWidth="1.5" />
        <rect x="4" y="6" width="18" height="14" rx="3" fill="#1F2540" />
        <circle cx="9" cy="13" r="2" fill="#5B73FB" />
        <circle cx="17" cy="13" r="2" fill="#5B73FB" />
        <rect x="9" y="24" width="8" height="3" rx="1" fill="#1F2540" />
        <rect x="6" y="35" width="14" height="4" rx="1.5" fill="#1F2540" />
      </g>
      {/* "mate" */}
      <text
        x="134"
        y="50"
        fontFamily="var(--font-display), system-ui, sans-serif"
        fontWeight="900"
        fontSize="56"
        fill="url(#botmate-blue)"
        letterSpacing="-2"
      >
        mate
      </text>
    </svg>
  );
}

function RobotMark({ className = "h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} role="img" aria-label="BotMate">
      <rect width="40" height="40" rx="9" fill="#3D5AFE" />
      <rect x="10" y="9" width="20" height="22" rx="4" fill="#F4F5FB" stroke="#0E174D" strokeWidth="0.8" />
      <rect x="13" y="12" width="14" height="10" rx="2" fill="#1F2540" />
      <circle cx="17" cy="17" r="1.8" fill="#5B73FB" />
      <circle cx="23" cy="17" r="1.8" fill="#5B73FB" />
      <rect x="17" y="25" width="6" height="2" rx="1" fill="#1F2540" />
    </svg>
  );
}
