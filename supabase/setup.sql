-- ============================================================================
-- Vitala · setup.sql — Esquema COMPLETO (BLUEPRINT bloques 1+).
-- Pega TODO esto en: Supabase → SQL Editor → Run. Es idempotente: puedes
-- correrlo de nuevo sobre una base existente y aplica los cambios nuevos.
--
-- Seguridad clave (BLUEPRINT sección 08 y 16):
--   · RLS por usuario en profiles.
--   · memberships: el cliente SOLO LEE la suya. Otorgar membresía es exclusivo
--     del servidor vía grant_lifetime_membership() (webhooks de pago).
--   · anonymize_user(): sobreescribe EN SU LUGAR, nunca copia datos.
-- ============================================================================

-- PERFIL (datos de salud por usuario) ----------------------------------------
create table if not exists public.profiles (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references auth.users(id) on delete set null,
  data        jsonb not null default '{}'::jsonb,
  updated_at  timestamptz not null default now(),
  deleted_at  timestamptz
);
create unique index if not exists profiles_user_id_uidx
  on public.profiles(user_id) where user_id is not null;

alter table public.profiles enable row level security;
drop policy if exists "leer mi perfil"   on public.profiles;
drop policy if exists "crear mi perfil"  on public.profiles;
drop policy if exists "editar mi perfil" on public.profiles;
create policy "leer mi perfil"   on public.profiles for select using (auth.uid() = user_id);
create policy "crear mi perfil"  on public.profiles for insert with check (auth.uid() = user_id);
create policy "editar mi perfil" on public.profiles for update using (auth.uid() = user_id);

-- MEMBRESÍA ("1 peso, de por vida") ------------------------------------------
-- BLOQUE 1: el cliente autenticado SOLO puede LEER su membresía. Escribirla es
-- exclusivo del servidor (service_role / grant_lifetime_membership). Así nadie
-- se otorga acceso editando su propio cliente.
create table if not exists public.memberships (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references auth.users(id) on delete set null,
  lifetime    boolean not null default false,
  granted_at  timestamptz not null default now(),
  deleted_at  timestamptz
);
create unique index if not exists memberships_user_id_uidx
  on public.memberships(user_id) where user_id is not null;

alter table public.memberships enable row level security;
drop policy if exists "ver mi membresia"    on public.memberships;
drop policy if exists "crear mi membresia"  on public.memberships;  -- eliminada (bloque 1)
drop policy if exists "editar mi membresia" on public.memberships;  -- eliminada (bloque 1)
create policy "ver mi membresia" on public.memberships for select using (auth.uid() = user_id);
-- Sin políticas de INSERT/UPDATE/DELETE → con RLS activo, el cliente no puede escribir.

-- EVENTOS DE PAGO (bloque 1) --------------------------------------------------
-- Idempotencia y rastro mínimo de webhooks. 100% server-side: sin políticas RLS
-- (RLS activo + cero políticas = invisible para anon/authenticated).
-- No guarda datos personales: solo ids del proveedor y estado.
create table if not exists public.payment_events (
  id           uuid primary key default gen_random_uuid(),
  provider     text not null check (provider in ('mercadopago','stripe')),
  external_id  text not null,
  user_id      uuid,
  status       text not null,
  raw_status   text,
  processed_at timestamptz not null default now(),
  unique (provider, external_id)
);
alter table public.payment_events enable row level security;

-- OTORGAR MEMBRESÍA (bloque 1) ------------------------------------------------
-- Único camino para conceder "de por vida". Solo invocable con service_role
-- (revocada a todos los demás). La llaman los webhooks tras verificar el pago.
create or replace function public.grant_lifetime_membership(p_user_id uuid)
returns void
language sql
security definer
set search_path = public
as $$
  insert into public.memberships (user_id, lifetime, granted_at)
  values (p_user_id, true, now())
  on conflict (user_id) where user_id is not null
  do update set lifetime = true, deleted_at = null;
$$;
revoke all on function public.grant_lifetime_membership(uuid) from public, anon, authenticated;

-- BORRADO DE CUENTA — anonimización irreversible (App Store 5.1.1(v)) ---------
-- Sobreescribe EN SU LUGAR. Prohíbido copiar datos a logs/backups/auditoría.
create or replace function public.anonymize_user(p_user_id uuid)
returns void
language sql
security definer
set search_path = public
as $$
  update public.profiles
     set data = jsonb_build_object('name', 'Usuario eliminado'),
         deleted_at = now()
   where user_id = p_user_id;

  update public.memberships
     set deleted_at = now()
   where user_id = p_user_id;

  update public.community_posts
     set display_name = 'Alguien de Vitala'
   where user_id = p_user_id;
$$;
revoke all on function public.anonymize_user(uuid) from public, anon, authenticated;

-- COMUNIDAD (muro de logros) --------------------------------------------------
-- Lectura pública (motivación); escritura SOLO vía servidor tras moderación
-- (/api/community/post con service_role). Sin política de INSERT para clientes.
create table if not exists public.community_posts (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid references auth.users(id) on delete set null,
  display_name text not null check (char_length(display_name) between 1 and 40),
  message      text not null check (char_length(message) between 1 and 500),
  stats        jsonb not null default '{}'::jsonb,
  created_at   timestamptz not null default now(),
  deleted_at   timestamptz
);
create index if not exists community_posts_created_idx on public.community_posts (created_at desc);

alter table public.community_posts enable row level security;
drop policy if exists "leer comunidad" on public.community_posts;
create policy "leer comunidad" on public.community_posts
  for select using (deleted_at is null);

-- RATE LIMITING (bloque 3) ----------------------------------------------------
-- Ventana fija en Postgres, sin servicios externos. Claves tipo
-- 'coach:user:<id>' o 'coach:ip:<hash>' (IPs SIEMPRE hasheadas, nunca crudas).
-- Server-only: RLS activo sin políticas + función revocada a roles de cliente.
create table if not exists public.rate_limits (
  key          text primary key,
  window_start timestamptz not null default now(),
  hits         int not null default 1
);
alter table public.rate_limits enable row level security;

create or replace function public.check_rate_limit(p_key text, p_window_secs int, p_max int)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  allowed boolean;
begin
  insert into public.rate_limits as r (key, window_start, hits)
  values (p_key, now(), 1)
  on conflict (key) do update set
    hits = case
             when r.window_start < now() - make_interval(secs => p_window_secs) then 1
             else r.hits + 1
           end,
    window_start = case
             when r.window_start < now() - make_interval(secs => p_window_secs) then now()
             else r.window_start
           end
  returning hits <= p_max into allowed;
  return allowed;
end;
$$;
revoke all on function public.check_rate_limit(text, int, int) from public, anon, authenticated;

-- Limpieza opcional (correr de vez en cuando o con pg_cron):
--   delete from public.rate_limits where window_start < now() - interval '2 days';
