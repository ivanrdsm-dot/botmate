-- ============================================================================
-- Vitala · Paso 2 — Preparar borrado de cuenta (cascarón anónimo)
-- App Store Guideline 5.1.1(v): permitir iniciar el borrado de la cuenta.
--
-- Qué hace:
--  - Agrega `deleted_at` a profiles y memberships (marca de borrado).
--  - Desacopla las tablas de auth.users: cambia ON DELETE CASCADE por
--    ON DELETE SET NULL sobre una nueva columna `user_id`. Así, al borrar la
--    identidad en auth.users, la fila SOBREVIVE como cascarón anónimo
--    (su user_id queda en NULL) en vez de desaparecer.
--  - Ajusta RLS para evaluar la pertenencia por `user_id`.
--
-- Aplicar en: Supabase → SQL Editor.
-- ============================================================================

-- 2.1 PROFILES ---------------------------------------------------------------
alter table public.profiles
  add column if not exists user_id uuid,
  add column if not exists deleted_at timestamptz;

update public.profiles set user_id = id where user_id is null;          -- backfill
alter table public.profiles alter column id set default gen_random_uuid();
alter table public.profiles drop constraint if exists profiles_id_fkey; -- quita el CASCADE
alter table public.profiles
  add constraint profiles_user_fk
  foreign key (user_id) references auth.users(id) on delete set null;   -- la fila sobrevive
create unique index if not exists profiles_user_id_uidx
  on public.profiles(user_id) where user_id is not null;

drop policy if exists "leer mi perfil"   on public.profiles;
drop policy if exists "crear mi perfil"  on public.profiles;
drop policy if exists "editar mi perfil" on public.profiles;
create policy "leer mi perfil"   on public.profiles for select using (auth.uid() = user_id);
create policy "crear mi perfil"  on public.profiles for insert with check (auth.uid() = user_id);
create policy "editar mi perfil" on public.profiles for update using (auth.uid() = user_id);

-- 2.2 MEMBERSHIPS (cascarón financiero anónimo para retención) ---------------
alter table public.memberships
  add column if not exists user_id uuid,
  add column if not exists deleted_at timestamptz;

update public.memberships set user_id = id where user_id is null;       -- backfill
alter table public.memberships alter column id set default gen_random_uuid();
alter table public.memberships drop constraint if exists memberships_id_fkey;
alter table public.memberships
  add constraint memberships_user_fk
  foreign key (user_id) references auth.users(id) on delete set null;
create unique index if not exists memberships_user_id_uidx
  on public.memberships(user_id) where user_id is not null;

drop policy if exists "ver mi membresia"    on public.memberships;
drop policy if exists "crear mi membresia"  on public.memberships;
drop policy if exists "editar mi membresia" on public.memberships;
create policy "ver mi membresia"    on public.memberships for select using (auth.uid() = user_id);
create policy "crear mi membresia"  on public.memberships for insert with check (auth.uid() = user_id);
create policy "editar mi membresia" on public.memberships for update using (auth.uid() = user_id);
