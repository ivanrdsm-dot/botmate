-- ============================================================================
-- Vitala · Paso 3 — Anonimización irreversible del cascarón
-- Sobrescribe (sin copiar a ningún lado: ni auditoría, ni logs, ni backup) los
-- datos personales/de salud del usuario, y marca deleted_at. Sin vuelta atrás.
--
-- La llama SOLO el servidor (service_role) desde /api/vitala/account/delete.
-- Aplicar en: Supabase → SQL Editor (después de 0001).
-- ============================================================================
create or replace function public.anonymize_user(p_user_id uuid)
returns void
language sql
security definer
set search_path = public
as $$
  -- Datos de salud: se reemplaza TODO el JSON por un valor neutro.
  -- No queda nombre real, edad, peso, alergias ni condición médica.
  update public.profiles
     set data = jsonb_build_object('name', 'Usuario eliminado'),
         deleted_at = now()
   where user_id = p_user_id;

  -- Membresía: no tiene datos personales; solo se marca como borrada.
  update public.memberships
     set deleted_at = now()
   where user_id = p_user_id;
$$;

-- Que NADIE pueda llamarla desde el cliente; solo el servidor (service_role).
revoke all on function public.anonymize_user(uuid) from public, anon, authenticated;
