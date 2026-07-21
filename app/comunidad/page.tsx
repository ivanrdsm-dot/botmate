"use client";

// Vitala — Comunidad: muro de logros para motivarnos entre todos.
// Lectura pública; publicar requiere cuenta y pasa por moderación server-side.

import Link from "next/link";
import { useEffect, useState } from "react";
import Reveal from "@/components/Reveal";
import { vitala } from "@/lib/brand";
import { getSupabase } from "@/lib/supabase";
import { useUser } from "@/lib/useUser";
import { loadProfile } from "@/lib/store";

const C = vitala.colors;

interface Post {
  id: string;
  display_name: string;
  message: string;
  stats: { kgLost?: number; streakDays?: number };
  created_at: string;
}

function timeAgo(iso: string): string {
  const mins = Math.max(1, Math.round((Date.now() - new Date(iso).getTime()) / 60000));
  if (mins < 60) return `hace ${mins} min`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `hace ${hours} h`;
  const days = Math.round(hours / 24);
  return `hace ${days} d`;
}

export default function ComunidadPage() {
  const { user, configured } = useUser();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [message, setMessage] = useState("");
  const [kgLost, setKgLost] = useState("");
  const [streak, setStreak] = useState("");
  const [sending, setSending] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    (async () => {
      const sb = getSupabase();
      if (!sb) { setLoaded(true); return; }
      const { data } = await sb
        .from("community_posts")
        .select("id, display_name, message, stats, created_at")
        .order("created_at", { ascending: false })
        .limit(50);
      setPosts((data as Post[]) ?? []);
      setLoaded(true);
    })();
  }, []);

  async function publish() {
    setSending(true);
    setNotice("");
    try {
      const sb = getSupabase();
      const token = sb ? (await sb.auth.getSession()).data.session?.access_token : undefined;
      if (!token) { setNotice("Inicia sesión para publicar."); return; }
      const res = await fetch("/api/community/post", {
        method: "POST",
        headers: { "content-type": "application/json", authorization: `Bearer ${token}` },
        body: JSON.stringify({
          message,
          displayName: loadProfile()?.name?.split(" ")[0] || "Alguien de Vitala",
          stats: { kgLost: kgLost ? Number(kgLost) : undefined, streakDays: streak ? Number(streak) : undefined },
        }),
      });
      const data = await res.json();
      if (data.crisis) { setNotice(data.reply); return; }
      if (data.error) { setNotice(data.error); return; }
      if (data.post) {
        setPosts((p) => [data.post, ...p]);
        setMessage(""); setKgLost(""); setStreak("");
        setNotice("¡Publicado! Gracias por motivar a la comunidad. 💚");
      }
    } catch {
      setNotice("Sin conexión. Intenta de nuevo.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <Reveal>
        <header className="text-center">
          <span className="badge-amber">💪 Logros reales, gente real</span>
          <h1 className="mt-4 text-3xl font-bold sm:text-4xl">Comunidad Vitala</h1>
          <p className="mx-auto mt-3 max-w-lg text-sm" style={{ color: C.textMuted }}>
            Cada avance cuenta: el primer día, el kilo que se fue, la semana completa
            de caminatas. Compártelo y motiva a alguien más a empezar.
          </p>
        </header>
      </Reveal>

      {configured && user ? (
        <Reveal>
          <div className="card p-5">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={500}
              rows={3}
              placeholder="Cuéntanos tu logro… (sin enlaces ni promociones)"
              className="w-full resize-none rounded-xl border bg-transparent px-4 py-3 text-sm outline-none"
              style={{ borderColor: "rgba(14,122,82,0.25)" }}
            />
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <input value={kgLost} onChange={(e) => setKgLost(e.target.value)} type="number" min="0" step="0.1" placeholder="kg perdidos (opcional)"
                className="w-40 rounded-xl border bg-transparent px-3 py-2 text-sm outline-none" style={{ borderColor: "rgba(14,122,82,0.25)" }} />
              <input value={streak} onChange={(e) => setStreak(e.target.value)} type="number" min="0" placeholder="días de racha (opcional)"
                className="w-40 rounded-xl border bg-transparent px-3 py-2 text-sm outline-none" style={{ borderColor: "rgba(14,122,82,0.25)" }} />
              <button onClick={publish} disabled={sending || message.trim().length < 3} className="btn-brand ml-auto text-sm disabled:opacity-50">
                {sending ? "Publicando…" : "Publicar"}
              </button>
            </div>
            {notice && <p className="mt-3 text-sm" style={{ color: C.brandLight }}>{notice}</p>}
          </div>
        </Reveal>
      ) : (
        <Reveal>
          <div className="card p-5 text-center text-sm" style={{ color: C.textMuted }}>
            <p>Para publicar tu logro necesitas una cuenta (es gratis y toma 10 segundos).</p>
            <Link href="/cuenta" className="btn-brand mt-3 inline-flex text-sm">Iniciar sesión</Link>
          </div>
        </Reveal>
      )}

      <div className="space-y-3">
        {!loaded &&
          [1, 2, 3].map((i) => (
            <div key={i} className="card animate-pulse p-5">
              <div className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-full" style={{ background: "rgba(14,122,82,0.12)" }} />
                <div className="space-y-1.5">
                  <div className="h-3 w-24 rounded" style={{ background: "rgba(14,122,82,0.12)" }} />
                  <div className="h-2.5 w-14 rounded" style={{ background: "rgba(14,122,82,0.08)" }} />
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="h-3 w-full rounded" style={{ background: "rgba(14,122,82,0.08)" }} />
                <div className="h-3 w-3/4 rounded" style={{ background: "rgba(14,122,82,0.08)" }} />
              </div>
            </div>
          ))}
        {loaded && posts.length === 0 && (
          <div className="card p-6 text-center text-sm" style={{ color: C.textMuted }}>
            Sé la primera persona en compartir un logro. Alguien allá afuera necesita ver que sí se puede. 🌱
          </div>
        )}
        {posts.map((p) => (
          <Reveal key={p.id}>
            <article className="card p-5">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white" style={{ background: C.brandDeep }}>
                  {p.display_name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold">{p.display_name}</p>
                  <p className="text-xs" style={{ color: C.textMuted }}>{timeAgo(p.created_at)}</p>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed">{p.message}</p>
              {(p.stats?.kgLost || p.stats?.streakDays) && (
                <div className="mt-3 flex gap-2">
                  {p.stats.kgLost ? (
                    <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ background: "rgba(14,122,82,0.10)", color: C.brandLight }}>
                      ⚖️ −{p.stats.kgLost} kg
                    </span>
                  ) : null}
                  {p.stats.streakDays ? (
                    <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ background: "rgba(180,83,9,0.10)", color: C.accent }}>
                      🔥 {p.stats.streakDays} días de racha
                    </span>
                  ) : null}
                </div>
              )}
            </article>
          </Reveal>
        ))}
      </div>

      <p className="text-center text-xs" style={{ color: C.textMuted }}>
        Comunidad moderada. Sin enlaces, ventas ni consejos médicos. Comparte experiencias,
        no prescripciones: cada cuerpo es distinto. 💚
      </p>
    </div>
  );
}
