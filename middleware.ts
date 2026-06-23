import { NextResponse, type NextRequest } from "next/server";

// Dominio propio de Vitala (ej. "vitala.health"). Se configura como variable
// de entorno en Vercel. Si no está, este middleware no hace nada (no-op).
const VITALA_HOST = process.env.VITALA_HOST?.toLowerCase();

export function middleware(req: NextRequest) {
  const host = req.headers.get("host")?.split(":")[0]?.toLowerCase();
  const { pathname } = req.nextUrl;

  // Solo actúa en el dominio de Vitala; cualquier otro dominio (botmate.mx)
  // pasa intacto. Y si ya viene con /vitala, no se reescribe.
  if (VITALA_HOST && host === VITALA_HOST && !pathname.startsWith("/vitala")) {
    const url = req.nextUrl.clone();
    url.pathname = `/vitala${pathname === "/" ? "" : pathname}`;
    return NextResponse.rewrite(url);
  }
  return NextResponse.next();
}

export const config = {
  // No corre en archivos estáticos, _next ni API.
  matcher: ["/((?!_next/|api/|.*\\..*).*)"],
};
