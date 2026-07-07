# Vitala — Lanzar HOY (ruta crítica)

Todo el código está listo y compila. Lo que falta requiere **tus cuentas**
(verificación humana, no lo puedo hacer por ti). Sigue este orden.

## 1. Publicar la web en vivo (≈5 min) — gratis
1. Entra a **vercel.com** → "Log in with GitHub".
2. **Add New → Project** → importa `ivanrdsm-dot/botmate`.
3. Rama: `claude/health-nutrition-app-o1g8jn` (para probar) o `main` (si mergeas el PR).
4. **Deploy**. Te da una URL. Abre `…/vitala` → ya está en vivo.
5. En tu iPhone (Safari) → Compartir → **"Agregar a pantalla de inicio"**. Queda como app con ícono de Vitala.

➡️ **Con esto ya tienes la app usable hoy.** Lo de abajo enciende funciones.

## 2. Cuentas personales (Google + Apple) — `docs/VITALA-SUPABASE.md`
1. Crea proyecto en **supabase.com**.
2. Pega en el SQL Editor las migraciones en orden:
   `supabase/migrations/0001_account_deletion_prep.sql` y `0002_anonymize_user.sql`,
   más el SQL base de `docs/VITALA-SUPABASE.md` (tablas + RLS si es proyecto nuevo).
3. Activa proveedores **Google** (§3) y **Apple** (§3b).
4. En **Vercel → Settings → Environment Variables** agrega:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (secreta — habilita el borrado de cuenta)
5. Redeploy.

## 3. Coach IA (opcional) — `.env.example`
- Agrega `ANTHROPIC_API_KEY` en Vercel (console.anthropic.com). Sin ella, el Coach
  degrada a respuestas seguras. Modelo por defecto: `claude-haiku-4-5` (el más barato).

## 4. Cobro "1 peso" (opcional) — `docs/VITALA-SUPABASE.md`
- Agrega `STRIPE_SECRET_KEY` en Vercel. Sin ella corre en modo demo.
- ⚠️ En **iOS** Apple exige **In-App Purchase** para desbloqueos digitales, no Stripe.
  Decisión de producto: ver `docs/APP-STORE-LISTING.md`.

## 5. Apps en tiendas (1–3 días, no "hoy") — `docs/STORE-LAUNCH.md`
- Empaqueta con Capacitor. Íconos PNG ya generados en `public/vitala/`
  (`icon-1024.png`, `icon-512.png`, `icon-192.png`, `apple-touch-icon.png`).
- Cumplimiento ya implementado: **5.1.1(v)** (borrar cuenta) y **4.8** (Apple login).
- Textos/checklist de la ficha: `docs/APP-STORE-LISTING.md`.

---

### Llaves que me puedes pasar (públicas, sin riesgo) para que yo configure el resto
- `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
(Las secretas —`SUPABASE_SERVICE_ROLE_KEY`, `ANTHROPIC_API_KEY`, `STRIPE_SECRET_KEY`—
van directo en Vercel, nunca aquí ni en el código.)
