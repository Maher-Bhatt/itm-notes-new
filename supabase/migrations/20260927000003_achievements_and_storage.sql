
-- ========================================================
-- ITM NOTES: REAL ACHIEVEMENTS, PROFILES EXTENSION & STORAGE
-- ========================================================

-- 1. Extend profiles with real academic and personalization fields
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS program TEXT DEFAULT 'B.Tech',
  ADD COLUMN IF NOT EXISTS semester INTEGER DEFAULT 3,
  ADD COLUMN IF NOT EXISTS enrollment_no TEXT,
  ADD COLUMN IF NOT EXISTS bio TEXT,
  ADD COLUMN IF NOT EXISTS target_cgpa TEXT,
  ADD COLUMN IF NOT EXISTS goal TEXT,
  ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS achievements JSONB DEFAULT '[]'::jsonb;

-- 2. Create user_achievements table for persistent real achievements
CREATE TABLE IF NOT EXISTS public.user_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  achievement_id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  tier TEXT DEFAULT 'bronze',
  xp_reward INTEGER DEFAULT 0,
  unlocked_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, achievement_id)
);

ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'User achievements viewable by everyone' AND tablename = 'user_achievements') THEN
    CREATE POLICY "User achievements viewable by everyone" ON public.user_achievements FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can insert own achievements' AND tablename = 'user_achievements') THEN
    CREATE POLICY "Users can insert own achievements" ON public.user_achievements FOR INSERT WITH CHECK (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can update own achievements' AND tablename = 'user_achievements') THEN
    CREATE POLICY "Users can update own achievements" ON public.user_achievements FOR UPDATE USING (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can delete own achievements' AND tablename = 'user_achievements') THEN
    CREATE POLICY "Users can delete own achievements" ON public.user_achievements FOR DELETE USING (auth.uid() = user_id);
  END IF;
END $$;

-- 3. Storage bucket for profile pictures / avatars
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO UPDATE SET public = true;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public avatar read' AND tablename = 'objects') THEN
    CREATE POLICY "Public avatar read" ON storage.objects FOR SELECT USING (bucket_id = 'avatars');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Authenticated users can upload avatars' AND tablename = 'objects') THEN
    CREATE POLICY "Authenticated users can upload avatars" ON storage.objects FOR INSERT WITH CHECK (
      bucket_id = 'avatars' AND auth.role() = 'authenticated'
    );
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can update own avatar objects' AND tablename = 'objects') THEN
    CREATE POLICY "Users can update own avatar objects" ON storage.objects FOR UPDATE USING (
      bucket_id = 'avatars' AND auth.role() = 'authenticated'
    );
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can delete own avatar objects' AND tablename = 'objects') THEN
    CREATE POLICY "Users can delete own avatar objects" ON storage.objects FOR DELETE USING (
      bucket_id = 'avatars' AND auth.role() = 'authenticated'
    );
  END IF;
END $$;

