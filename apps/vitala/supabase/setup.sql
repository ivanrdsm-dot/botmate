-- ============================================================================
-- Vitala · setup.sql — Esquema COMPLETO para un proyecto Supabase NUEVO.
-- Pega TODO esto una sola vez en: Supabase → SQL Editor → Run.
-- (Si ya corriste el SQL base + 0001 + 0002, NO necesitas esto.)
--
-- Crea las tablas en su forma final (con user_id desacoplado + deleted_at),
-- la seguridad por fila (RLS) y la función de borrado anónimo.
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

-- MEMBRESÍA ("1 peso, de por vida" / cascarón financiero anónimo) -------------
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
drop policy if exists "crear mi membresia"  on public.memberships;
drop policy if exists "editar mi membresia" on public.memberships;
create policy "ver mi membresia"    on public.memberships for select using (auth.uid() = user_id);
create policy "crear mi membresia"  on public.memberships for insert with check (auth.uid() = user_id);
create policy "editar mi membresia" on public.memberships for update using (auth.uid() = user_id);

-- BORRADO DE CUENTA — anonimización irreversible (App Store 5.1.1(v)) ---------
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
$$;
revoke all on function public.anonymize_user(uuid) from public, anon, authenticated;
