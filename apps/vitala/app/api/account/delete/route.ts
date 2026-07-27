// Vitala — borrado de cuenta (App Store 5.1.1(v)).
// 1) Verifica la identidad con el token del usuario.
// 2) Anonimiza el cascarón de forma irreversible (rpc anonymize_user).
// 3) Borra la identidad de auth (libera el email y mata las sesiones).
// Requiere SUPABASE_SERVICE_ROLE_KEY (secreta, solo en el servidor).

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !anon || !serviceRole) {
    return NextResponse.json(
      { error: "El borrado de cuenta no está configurado en el servidor." },
      { status: 500 }
    );
  }

  const authHeader = req.headers.get("authorization") ?? "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
  if (!token) return NextResponse.json({ error: "No autenticado." }, { status: 401 });

  // 1) Verifica quién es el usuario a partir de SU token.
  const userClient = createClient(url, anon);
  const { data: userData, error: userErr } = await userClient.auth.getUser(token);
  if (userErr || !userData.user) {
    return NextResponse.json({ error: "Sesión inválida." }, { status: 401 });
  }
  const userId = userData.user.id;

  // Cliente admin (service_role): omite RLS, puede borrar identidades.
  const admin = createClient(url, serviceRole, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  // 2) Anonimiza el cascarón ANTES de borrar (mientras user_id aún apunta).
  const { error: anonErr } = await admin.rpc("anonymize_user", { p_user_id: userId });
  if (anonErr) {
    console.error("anonymize_user error", anonErr);
    return NextResponse.json({ error: "No se pudo anonimizar la cuenta." }, { status: 500 });
  }

  // 3) Borra la identidad: el email queda libre y las sesiones se invalidan.
  //    Por la FK ON DELETE SET NULL, el cascarón anónimo sobrevive.
  const { error: delErr } = await admin.auth.admin.deleteUser(userId);
  if (delErr) {
    console.error("deleteUser error", delErr);
    return NextResponse.json({ error: "No se pudo borrar la identidad." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
