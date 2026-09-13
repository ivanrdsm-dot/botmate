"use client";
import {
  createContext,
  useContext,
  useEffect,
  useSyncExternalStore,
} from "react";
import { usePathname } from "next/navigation";
import { Pause, Play } from "lucide-react";
const MotionContext = createContext({ enabled: false });
export const useSiteMotion = () => useContext(MotionContext);
type Connection = EventTarget & { saveData?: boolean; effectiveType?: string };
let pausedInMemory: boolean | undefined;
function preferences() {
  const connection = (navigator as Navigator & { connection?: Connection })
    .connection;
  const limited =
    matchMedia("(prefers-reduced-motion: reduce)").matches ||
    !!connection?.saveData ||
    ["slow-2g", "2g"].includes(connection?.effectiveType || "");
  let paused = false;
  try {
    paused = sessionStorage.getItem("botmate-motion") === "paused";
  } catch {}
  return limited ? "limited" : (pausedInMemory ?? paused) ? "paused" : "on";
}
function subscribe(callback: () => void) {
  const query = matchMedia("(prefers-reduced-motion: reduce)");
  const connection = (navigator as Navigator & { connection?: Connection })
    .connection;
  query.addEventListener("change", callback);
  connection?.addEventListener("change", callback);
  window.addEventListener("botmate-motion-change", callback);
  return () => {
    query.removeEventListener("change", callback);
    connection?.removeEventListener("change", callback);
    window.removeEventListener("botmate-motion-change", callback);
  };
}
export default function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const preference = useSyncExternalStore(
    subscribe,
    preferences,
    () => "limited",
  );
  const limited = preference === "limited";
  const pathname = usePathname();
  const en = pathname === "/en" || pathname.startsWith("/en/");
  const enabled = preference === "on";
  useEffect(() => {
    document.documentElement.dataset.motion = enabled ? "on" : "off";
    if (!enabled) return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("motion-entered");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.1 },
    );
    document
      .querySelectorAll(
        ".section-heading-row, .solution-card, .robot-card, .process-card, .motion-reveal",
      )
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [enabled, pathname]);
  return (
    <MotionContext.Provider value={{ enabled }}>
      {children}
      <button
        className="motion-toggle"
        type="button"
        aria-pressed={!enabled}
        aria-label={
          limited
            ? (en?"Reduced motion based on your device":"Movimiento reducido según tu dispositivo")
            : enabled
              ? (en?"Pause page animations":"Pausar animaciones de la página")
              : (en?"Enable page animations":"Activar animaciones de la página")
        }
        disabled={limited}
        onClick={() => {
          pausedInMemory = enabled;
          try {
            sessionStorage.setItem("botmate-motion", enabled ? "paused" : "on");
          } catch {}
          window.dispatchEvent(new Event("botmate-motion-change"));
        }}
      >
        {enabled ? <Pause size={14} /> : <Play size={14} />}
        <span>{enabled ? (en?"Pause motion":"Pausar movimiento") : (en?"Reduced motion":"Movimiento reducido")}</span>
      </button>
    </MotionContext.Provider>
  );
}
