export default function Aurora({ intensity = 1 }: { intensity?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div
        className="absolute -top-40 left-1/2 h-[820px] w-[1200px] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(closest-side, rgba(124,58,237,0.45), transparent 70%), radial-gradient(closest-side, rgba(34,211,238,0.35), transparent 60%)",
          opacity: 0.55 * intensity,
          filter: "blur(80px)",
        }}
      />
      <svg
        className="absolute -top-20 left-1/2 h-[700px] w-[1400px] -translate-x-1/2 opacity-60"
        viewBox="0 0 1400 700"
        fill="none"
      >
        <defs>
          <linearGradient id="aurora1" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="rgba(34,211,238,0)" />
            <stop offset="50%" stopColor="rgba(34,211,238,0.45)" />
            <stop offset="100%" stopColor="rgba(34,211,238,0)" />
          </linearGradient>
          <linearGradient id="aurora2" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="rgba(168,85,247,0)" />
            <stop offset="50%" stopColor="rgba(168,85,247,0.45)" />
            <stop offset="100%" stopColor="rgba(168,85,247,0)" />
          </linearGradient>
        </defs>
        <path
          d="M0,200 C260,120 540,300 700,220 C880,140 1140,320 1400,240 L1400,260 C1140,340 880,160 700,240 C540,320 260,140 0,220 Z"
          fill="url(#aurora1)"
        >
          <animate attributeName="d" dur="14s" repeatCount="indefinite"
            values="M0,200 C260,120 540,300 700,220 C880,140 1140,320 1400,240 L1400,260 C1140,340 880,160 700,240 C540,320 260,140 0,220 Z;
                    M0,240 C260,160 540,260 700,180 C880,100 1140,360 1400,200 L1400,220 C1140,380 880,120 700,200 C540,280 260,180 0,260 Z;
                    M0,200 C260,120 540,300 700,220 C880,140 1140,320 1400,240 L1400,260 C1140,340 880,160 700,240 C540,320 260,140 0,220 Z" />
        </path>
        <path
          d="M0,340 C300,260 560,420 760,360 C960,300 1180,460 1400,380 L1400,400 C1180,480 960,320 760,380 C560,440 300,280 0,360 Z"
          fill="url(#aurora2)"
        >
          <animate attributeName="d" dur="18s" repeatCount="indefinite"
            values="M0,340 C300,260 560,420 760,360 C960,300 1180,460 1400,380 L1400,400 C1180,480 960,320 760,380 C560,440 300,280 0,360 Z;
                    M0,380 C300,300 560,380 760,320 C960,260 1180,500 1400,340 L1400,360 C1180,520 960,280 760,340 C560,400 300,320 0,400 Z;
                    M0,340 C300,260 560,420 760,360 C960,300 1180,460 1400,380 L1400,400 C1180,480 960,320 760,380 C560,440 300,280 0,360 Z" />
        </path>
      </svg>
    </div>
  );
}
