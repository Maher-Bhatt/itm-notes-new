-- ========================================================
-- ITM NOTES: PART A PLATFORM ENHANCEMENTS MIGRATION
-- Push subscriptions, Bookmark folders, Verified community answers,
-- Weekly goals & streak freeze, Personal division timetable, Search analytics
-- ========================================================

-- 1. Push Subscriptions Table
CREATE TABLE IF NOT EXISTS public.push_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  platform TEXT NOT NULL CHECK (platform IN ('android', 'web', 'ios')),
  token TEXT NOT NULL,
  endpoint TEXT,
  p256dh TEXT,
  auth TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, token)
);

ALTER TABLE public.push_subscriptions ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can view own push subscriptions' AND tablename = 'push_subscriptions') THEN
    CREATE POLICY "Users can view own push subscriptions" ON public.push_subscriptions FOR SELECT USING (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can insert own push subscriptions' AND tablename = 'push_subscriptions') THEN
    CREATE POLICY "Users can insert own push subscriptions" ON public.push_subscriptions FOR INSERT WITH CHECK (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can update own push subscriptions' AND tablename = 'push_subscriptions') THEN
    CREATE POLICY "Users can update own push subscriptions" ON public.push_subscriptions FOR UPDATE USING (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can delete own push subscriptions' AND tablename = 'push_subscriptions') THEN
    CREATE POLICY "Users can delete own push subscriptions" ON public.push_subscriptions FOR DELETE USING (auth.uid() = user_id);
  END IF;
END $$;

-- 2. Bookmark Folders Table
CREATE TABLE IF NOT EXISTS public.bookmark_folders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  color TEXT DEFAULT '#183F36',
  icon TEXT DEFAULT 'folder',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.bookmark_folders ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can view own bookmark folders' AND tablename = 'bookmark_folders') THEN
    CREATE POLICY "Users can view own bookmark folders" ON public.bookmark_folders FOR SELECT USING (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can insert own bookmark folders' AND tablename = 'bookmark_folders') THEN
    CREATE POLICY "Users can insert own bookmark folders" ON public.bookmark_folders FOR INSERT WITH CHECK (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can update own bookmark folders' AND tablename = 'bookmark_folders') THEN
    CREATE POLICY "Users can update own bookmark folders" ON public.bookmark_folders FOR UPDATE USING (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can delete own bookmark folders' AND tablename = 'bookmark_folders') THEN
    CREATE POLICY "Users can delete own bookmark folders" ON public.bookmark_folders FOR DELETE USING (auth.uid() = user_id);
  END IF;
END $$;

-- 3. Extend Community Posts & Comments for Verified Answers & AI Badges
ALTER TABLE public.community_comments
  ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS verified_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS verified_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS is_ai_generated BOOLEAN DEFAULT false;

ALTER TABLE public.community_posts
  ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS verified_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS is_ai_generated BOOLEAN DEFAULT false;

-- 4. Extend Profiles with Academic Division, Weekly Goals & Settings
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS division TEXT DEFAULT 'A',
  ADD COLUMN IF NOT EXISTS weekly_goal_days INTEGER DEFAULT 5,
  ADD COLUMN IF NOT EXISTS weekly_goal_completed_days INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS streak_freeze_count INTEGER DEFAULT 1,
  ADD COLUMN IF NOT EXISTS streak_freeze_last_claimed_week TEXT,
  ADD COLUMN IF NOT EXISTS push_enabled BOOLEAN DEFAULT true,
  ADD COLUMN IF NOT EXISTS motion_reduced BOOLEAN DEFAULT false;

-- 5. Search Analytics Table (Priority Zero-Result Search Logging)
CREATE TABLE IF NOT EXISTS public.search_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  query TEXT NOT NULL,
  results_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.search_analytics ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Anyone can log search analytics' AND tablename = 'search_analytics') THEN
    CREATE POLICY "Anyone can log search analytics" ON public.search_analytics FOR INSERT WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admins can view search analytics' AND tablename = 'search_analytics') THEN
    CREATE POLICY "Admins can view search analytics" ON public.search_analytics FOR SELECT USING (
      EXISTS (
        SELECT 1 FROM public.user_roles 
        WHERE user_roles.user_id = auth.uid() AND user_roles.role = 'admin'
      )
    );
  END IF;
END $$;
