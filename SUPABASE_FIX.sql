-- =========================================================================
-- Waste2Worth — DEFINITIVE schema + trigger fix
-- Run this ONCE in Supabase SQL editor for project rsmebegowxaeehqciqcm.
-- It fixes PGRST204 errors like:
--   "Could not find the 'role' column of 'profiles' in the schema cache"
--   "Could not find the 'email' column of 'profiles' in the schema cache"
-- These errors come from an OLD handle_new_user() trigger still in your DB
-- that tries to insert role/email into profiles. This script replaces it.
-- =========================================================================

-- 0. Ensure enum + tables match what the app expects
DO $$ BEGIN
  CREATE TYPE public.app_role AS ENUM ('admin','seller','buyer');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- profiles must NOT have role / email columns (roles live in user_roles)
ALTER TABLE public.profiles DROP COLUMN IF EXISTS role;
ALTER TABLE public.profiles DROP COLUMN IF EXISTS email;

-- 1. Drop EVERY old trigger on auth.users that may still write role/email
DROP TRIGGER IF EXISTS on_auth_user_created       ON auth.users;
DROP TRIGGER IF EXISTS on_auth_user_created_trg   ON auth.users;
DROP TRIGGER IF EXISTS handle_new_user_trg        ON auth.users;
DROP TRIGGER IF EXISTS create_profile_for_user    ON auth.users;

-- 2. Replace handle_new_user with the CORRECT version (no role/email on profiles)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  desired_role public.app_role;
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', ''))
  ON CONFLICT (user_id) DO NOTHING;

  desired_role := COALESCE(
    NULLIF(NEW.raw_user_meta_data->>'role','')::public.app_role,
    'buyer'::public.app_role
  );

  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, desired_role)
  ON CONFLICT (user_id, role) DO NOTHING;

  RETURN NEW;
END;
$$;

-- 3. Reattach the single canonical trigger
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 4. has_role helper (avoids RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  );
$$;

-- 5. Grants + RLS for profiles & user_roles
GRANT SELECT, INSERT, UPDATE ON public.profiles   TO authenticated;
GRANT ALL                    ON public.profiles   TO service_role;
GRANT SELECT                 ON public.user_roles TO authenticated;
GRANT ALL                    ON public.user_roles TO service_role;

ALTER TABLE public.profiles   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "profiles_select_own"  ON public.profiles;
DROP POLICY IF EXISTS "profiles_update_own"  ON public.profiles;
DROP POLICY IF EXISTS "profiles_insert_own"  ON public.profiles;
CREATE POLICY "profiles_select_own" ON public.profiles FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE TO authenticated
  USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "user_roles_select_own" ON public.user_roles;
CREATE POLICY "user_roles_select_own" ON public.user_roles FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.has_role(auth.uid(),'admin'));

-- 6. Force PostgREST to refresh its schema cache (clears any leftover PGRST204)
NOTIFY pgrst, 'reload schema';
