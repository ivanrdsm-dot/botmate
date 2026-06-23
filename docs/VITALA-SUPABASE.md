# Vitala — Cuentas personales con Supabase + Google

Cada usuario tiene una **cuenta personal y privada**, entra con **Google**, y su
plan a medida se sincroniza en la nube. Si Supabase no está configurado, la app
funciona en **modo local** (datos en el dispositivo) sin romperse.

## 1. Crea el proyecto (tú, 3 min)

1. Entra a **supabase.com** → New project (elige región cercana, p. ej. East US).
2. En **Project Settings → API** copia:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public key` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Pega esas dos en Vercel → *Settings → Environment Variables* (y en `.env.local`
   para desarrollo). Son **públicas**, no hay riesgo en exponerlas.

## 2. Crea la tabla y la seguridad (RLS)

En Supabase → **SQL Editor** pega y ejecuta:

```sql
-- Perfil personal por usuario (datos de salud en JSON)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- Seguridad a nivel de fila: cada quien SOLO ve y edita lo suyo
alter table public.profiles enable row level security;

create policy "leer mi perfil"   on public.profiles
  for select using (auth.uid() = id);
create policy "crear mi perfil"  on public.profiles
  for insert with check (auth.uid() = id);
create policy "editar mi perfil" on public.profiles
  for update using (auth.uid() = id);

-- Membresía de por vida ("1 peso, para siempre")
create table if not exists public.memberships (
  id uuid primary key references auth.users(id) on delete cascade,
  lifetime boolean not null default false,
  granted_at timestamptz not null default now()
);
alter table public.memberships enable row level security;
create policy "ver mi membresia"    on public.memberships for select using (auth.uid() = id);
create policy "crear mi membresia"  on public.memberships for insert with check (auth.uid() = id);
create policy "editar mi membresia" on public.memberships for update using (auth.uid() = id);
```

> **Pago "1 peso":** el flujo de `/vitala/uno-peso` usa **Stripe** si configuras
> `STRIPE_SECRET_KEY`; si no, corre en **modo demo** (concede el acceso para
> probar). Nota real: las pasarelas tienen un **monto mínimo** (Stripe ≈ $10 MXN),
> así que "1 peso" literal puede requerir un ajuste de precio o un proveedor local;
> el valor se controla con `VITALA_PRICE_CENTS` y `VITALA_CURRENCY`.

> Con RLS activado, aunque alguien tuviera la llave pública, **no puede leer los
> datos de otra persona**. Es la base de la privacidad de salud.

## 3. Activa el login con Google

1. En **Google Cloud Console** → *APIs & Services → Credentials* → crea un
   **OAuth client ID** (tipo "Web application").
2. En *Authorized redirect URIs* agrega la que te da Supabase:
   `https://TU-PROYECTO.supabase.co/auth/v1/callback`
3. Copia *Client ID* y *Client secret*.
4. En Supabase → **Authentication → Providers → Google** → pégalos y activa.
5. En Supabase → **Authentication → URL Configuration** agrega tu dominio
   (`https://TU-DOMINIO`) como *Site URL* y a *Redirect URLs*.

¡Listo! El botón "Continuar con Google" de `/vitala/cuenta` ya funciona.

## 3b. Activa "Sign in with Apple" (Guideline 4.8)

Apple exige una opción de login con privacidad cuando ofreces Google. Pasos:

1. En **developer.apple.com** → Certificates, Identifiers & Profiles:
   - Crea un **App ID** y un **Services ID** (este último es tu `client_id` web).
   - Habilita **Sign in with Apple** y registra el dominio + la URL de retorno de
     Supabase: `https://TU-PROYECTO.supabase.co/auth/v1/callback`.
   - Crea una **Key** con Sign in with Apple → descarga el `.p8`. Anota **Key ID**
     y **Team ID**.
2. En Supabase → **Authentication → Providers → Apple** → pega Services ID,
   Team ID, Key ID y el contenido del `.p8`. Activa.
3. El botón "Continuar con Apple" de `/vitala/cuenta` ya queda funcionando.

> ⚠️ **Nota para la app nativa (Capacitor/iOS):** el flujo web de arriba sirve
> para la PWA. Para la app de la App Store, Apple suele exigir el **Sign in with
> Apple nativo** (no el redirect web dentro del WebView). Si te lo marcan en
> revisión, se agrega el plugin nativo de Apple Sign-In en Capacitor — avísame y
> lo integramos.

## Costo a escala (por qué Supabase)

| Usuarios activos/mes | Costo |
|---|---|
| Hasta 50,000 | Gratis |
| 100,000 | ~$25/mes (incluye DB + auth + storage) |
| 500,000 | ~$1,325/mes |

~$0.00325 por usuario a gran escala: el modelo de "una moneda" se sostiene.

## Qué hace el código (ya implementado)

- `lib/vitala/supabase.ts` — cliente, login Google, guardar/leer perfil en la nube.
- `lib/vitala/useUser.ts` — estado de sesión reactivo.
- `app/(vitala)/vitala/cuenta/page.tsx` — login, cuenta y sincronización.
- El onboarding sube el plan a la cuenta del usuario si hay sesión.
- Sin credenciales → "modo local" automático (no se rompe nada).
