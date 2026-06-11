-- =============================================================
-- Waste2Worth — Chat, Notifications, and Auto-Profile setup
-- Run this in your Supabase SQL editor (project rsmebegowxaeehqciqcm)
-- =============================================================

-- ============ MESSAGES (per-offer chat thread) ============
CREATE TABLE IF NOT EXISTS public.messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  offer_id uuid NOT NULL REFERENCES public.offers(id) ON DELETE CASCADE,
  sender_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  body text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.messages TO authenticated;
GRANT ALL ON public.messages TO service_role;

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "chat_select_participants" ON public.messages;
CREATE POLICY "chat_select_participants" ON public.messages FOR SELECT TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.offers o
    JOIN public.listings l ON l.id = o.listing_id
    WHERE o.id = messages.offer_id
      AND (o.buyer_id = auth.uid() OR l.user_id = auth.uid())
  )
);

DROP POLICY IF EXISTS "chat_insert_participants" ON public.messages;
CREATE POLICY "chat_insert_participants" ON public.messages FOR INSERT TO authenticated
WITH CHECK (
  sender_id = auth.uid() AND
  EXISTS (
    SELECT 1 FROM public.offers o
    JOIN public.listings l ON l.id = o.listing_id
    WHERE o.id = messages.offer_id
      AND (o.buyer_id = auth.uid() OR l.user_id = auth.uid())
  )
);

-- ============ NOTIFICATIONS ============
CREATE TABLE IF NOT EXISTS public.notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  kind text NOT NULL,
  body text NOT NULL,
  link text,
  read boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, UPDATE ON public.notifications TO authenticated;
GRANT ALL ON public.notifications TO service_role;

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "notif_select_own" ON public.notifications;
CREATE POLICY "notif_select_own" ON public.notifications FOR SELECT TO authenticated
USING (user_id = auth.uid());

DROP POLICY IF EXISTS "notif_update_own" ON public.notifications;
CREATE POLICY "notif_update_own" ON public.notifications FOR UPDATE TO authenticated
USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- Trigger: notify seller of new offer
CREATE OR REPLACE FUNCTION public.notify_new_offer()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE seller uuid; listing_title text;
BEGIN
  SELECT user_id, title INTO seller, listing_title FROM public.listings WHERE id = NEW.listing_id;
  IF seller IS NOT NULL AND seller <> NEW.buyer_id THEN
    INSERT INTO public.notifications (user_id, kind, body, link)
    VALUES (seller, 'new_offer',
            'New offer ₹' || NEW.offered_price_inr || ' on "' || listing_title || '"',
            '/seller');
  END IF;
  RETURN NEW;
END $$;

DROP TRIGGER IF EXISTS trg_notify_new_offer ON public.offers;
CREATE TRIGGER trg_notify_new_offer
AFTER INSERT ON public.offers
FOR EACH ROW EXECUTE FUNCTION public.notify_new_offer();

-- Trigger: auto-create profile + role on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE desired_role app_role;
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', ''))
  ON CONFLICT (user_id) DO NOTHING;

  desired_role := COALESCE((NEW.raw_user_meta_data->>'role')::app_role, 'buyer');
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, desired_role)
  ON CONFLICT DO NOTHING;
  RETURN NEW;
END $$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
