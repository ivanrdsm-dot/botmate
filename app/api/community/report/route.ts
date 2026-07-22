// Vitala — reportar una publicación de la comunidad (App Store 1.2).
// Un reporte por usuario por post; al llegar a 3 reportes el post se oculta
// automáticamente (deleted_at) hasta revisión manual.

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { limitByUser, RATE_MSG } from "@/lib/ratelimit";

export const runtime = "nodejs";

const AUTO_HIDE_AT = 3;

export async function POST(req: Request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !anon || !serviceRole) {
    return NextResponse.json({ error: "Reportes no configurados." }, { status: 500 });
  }

  const authHeader = req.headers.get("authorization") ?? "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
  if (!token) return NextResponse.json({ error: "Inicia sesión para reportar." }, { status: 401 });
  const userClient = createClient(url, anon);
  const { data: userData, error: userErr } = await userClient.auth.getUser(token);
  if (userErr || !userData.user) {
    return NextResponse.json({ error: "Sesión inválida." }, { status: 401 });
  }
  const user = userData.user;

  if (!(await limitByUser(user.id, "report", 10, 86400))) {
    return NextResponse.json({ error: RATE_MSG }, { status: 429 });
  }

  let body: { postId?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }
  const postId = body.postId ?? "";
  if (!/^[0-9a-f-]{36}$/i.test(postId)) {
    return NextResponse.json({ error: "Post inválido." }, { status: 400 });
  }

  const admin = createClient(url, serviceRole, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { error: insErr } = await admin
    .from("community_reports")
    .insert({ post_id: postId, user_id: user.id });
  if (insErr && insErr.code !== "23505") {
    // 23505 = ya lo reportó antes: lo tratamos como éxito idempotente.
    console.error("report insert error", insErr);
    return NextResponse.json({ error: "No se pudo enviar el reporte." }, { status: 500 });
  }

  const { count } = await admin
    .from("community_reports")
    .select("*", { count: "exact", head: true })
    .eq("post_id", postId);

  if ((count ?? 0) >= AUTO_HIDE_AT) {
    await admin
      .from("community_posts")
      .update({ deleted_at: new Date().toISOString() })
      .eq("id", postId)
      .is("deleted_at", null);
  }

  return NextResponse.json({ ok: true, hidden: (count ?? 0) >= AUTO_HIDE_AT });
}
