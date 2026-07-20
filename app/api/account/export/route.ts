// Vitala — exportar mis datos (BLUEPRINT bloque 4, derecho de portabilidad).
// GET con Bearer token: devuelve el perfil y la membresía del usuario autenticado
// como JSON descargable. Rate limit: 5 por día por usuario.

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { limitByUser, RATE_MSG } from "@/lib/ratelimit";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !anon || !serviceRole) {
    return NextResponse.json({ error: "Exportación no configurada." }, { status: 500 });
  }

  const authHeader = req.headers.get("authorization") ?? "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
  if (!token) return NextResponse.json({ error: "No autenticado." }, { status: 401 });

  const userClient = createClient(url, anon);
  const { data: userData, error: userErr } = await userClient.auth.getUser(token);
  if (userErr || !userData.user) {
    return NextResponse.json({ error: "Sesión inválida." }, { status: 401 });
  }
  const user = userData.user;

  if (!(await limitByUser(user.id, "export", 5, 86400))) {
    return NextResponse.json({ error: RATE_MSG }, { status: 429 });
  }

  const admin = createClient(url, serviceRole, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const [{ data: profile }, { data: membership }] = await Promise.all([
    admin.from("profiles").select("data, updated_at").eq("user_id", user.id).maybeSingle(),
    admin.from("memberships").select("lifetime, granted_at").eq("user_id", user.id).maybeSingle(),
  ]);

  const payload = {
    exportadoEl: new Date().toISOString(),
    cuenta: { id: user.id, email: user.email ?? null, creadaEl: user.created_at ?? null },
    perfil: profile?.data ?? null,
    perfilActualizadoEl: profile?.updated_at ?? null,
    membresia: membership ?? null,
    nota: "Este archivo contiene todos los datos que Vitala guarda sobre ti en la nube. Las fotos de tu diario nunca se almacenan; los registros locales viven solo en tu dispositivo.",
  };

  return new NextResponse(JSON.stringify(payload, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Disposition": 'attachment; filename="vitala-mis-datos.json"',
      "Cache-Control": "no-store",
    },
  });
}
