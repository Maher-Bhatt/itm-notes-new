-- ========================================================
-- CAMPUSLOOP COMMUNITY SYSTEM MIGRATION (2026)
-- Adds: Clubs, Club Members, Events, Event RSVPs, Pulse Tiles,
-- User Follows, Direct Messages, Post Polls & Votes, Saved Posts, Reports
-- Fully backwards-compatible with existing tables and queries.
-- ========================================================

-- 1. CAMPUS PULSE TILES TABLE (Admin-controlled live status updates)
CREATE TABLE IF NOT EXISTS public.campus_pulse_tiles (
  id TEXT PRIMARY KEY,
  tone TEXT NOT NULL DEFAULT 'black', -- 'black', 'lime', 'blue', 'white'
  tag TEXT NOT NULL DEFAULT 'LIVE',
  title TEXT NOT NULL,
  subtitle TEXT,
  icon TEXT DEFAULT 'zap',
  link_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.campus_pulse_tiles ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Pulse tiles viewable by everyone' AND tablename = 'campus_pulse_tiles') THEN
    CREATE POLICY "Pulse tiles viewable by everyone" ON public.campus_pulse_tiles FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admins can modify pulse tiles' AND tablename = 'campus_pulse_tiles') THEN
    CREATE POLICY "Admins can modify pulse tiles" ON public.campus_pulse_tiles FOR ALL USING (
      EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin')
    );
  END IF;
END $$;

-- 2. CAMPUS CLUBS TABLE
CREATE TABLE IF NOT EXISTS public.campus_clubs (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'General', -- 'Tech', 'Arts', 'Sports', 'Academic', 'Cultural'
  description TEXT,
  icon_name TEXT DEFAULT 'users',
  cover_url TEXT,
  lead_id TEXT,
  lead_name TEXT,
  member_count INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.campus_clubs ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Clubs viewable by everyone' AND tablename = 'campus_clubs') THEN
    CREATE POLICY "Clubs viewable by everyone" ON public.campus_clubs FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Authenticated users can create clubs' AND tablename = 'campus_clubs') THEN
    CREATE POLICY "Authenticated users can create clubs" ON public.campus_clubs FOR INSERT WITH CHECK (auth.role() = 'authenticated');
  END IF;
END $$;

-- 3. CAMPUS CLUB MEMBERS TABLE
CREATE TABLE IF NOT EXISTS public.campus_club_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  club_id TEXT NOT NULL REFERENCES public.campus_clubs(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'member', -- 'member', 'moderator', 'admin'
  joined_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(club_id, user_id)
);

ALTER TABLE public.campus_club_members ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Club members viewable by everyone' AND tablename = 'campus_club_members') THEN
    CREATE POLICY "Club members viewable by everyone" ON public.campus_club_members FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can join and leave clubs' AND tablename = 'campus_club_members') THEN
    CREATE POLICY "Users can join and leave clubs" ON public.campus_club_members FOR ALL USING (auth.uid() = user_id);
  END IF;
END $$;

-- 4. CAMPUS EVENTS TABLE
CREATE TABLE IF NOT EXISTS public.campus_events (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  club_id TEXT REFERENCES public.campus_clubs(id) ON DELETE SET NULL,
  club_name TEXT,
  location TEXT NOT NULL DEFAULT 'Campus Center',
  event_date DATE NOT NULL,
  event_time TEXT NOT NULL DEFAULT '5:00 PM',
  attendee_count INTEGER NOT NULL DEFAULT 0,
  organizer_id TEXT,
  organizer_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.campus_events ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Events viewable by everyone' AND tablename = 'campus_events') THEN
    CREATE POLICY "Events viewable by everyone" ON public.campus_events FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Authenticated users can create events' AND tablename = 'campus_events') THEN
    CREATE POLICY "Authenticated users can create events" ON public.campus_events FOR INSERT WITH CHECK (auth.role() = 'authenticated');
  END IF;
END $$;

-- 5. CAMPUS EVENT RSVPS TABLE
CREATE TABLE IF NOT EXISTS public.campus_event_rsvps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id TEXT NOT NULL REFERENCES public.campus_events(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(event_id, user_id)
);

ALTER TABLE public.campus_event_rsvps ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'RSVPs viewable by everyone' AND tablename = 'campus_event_rsvps') THEN
    CREATE POLICY "RSVPs viewable by everyone" ON public.campus_event_rsvps FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can toggle their RSVP' AND tablename = 'campus_event_rsvps') THEN
    CREATE POLICY "Users can toggle their RSVP" ON public.campus_event_rsvps FOR ALL USING (auth.uid() = user_id);
  END IF;
END $$;

-- 6. CAMPUS USER FOLLOWS TABLE
CREATE TABLE IF NOT EXISTS public.campus_user_follows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  follower_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  following_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(follower_id, following_id)
);

ALTER TABLE public.campus_user_follows ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Follows viewable by everyone' AND tablename = 'campus_user_follows') THEN
    CREATE POLICY "Follows viewable by everyone" ON public.campus_user_follows FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can manage their follows' AND tablename = 'campus_user_follows') THEN
    CREATE POLICY "Users can manage their follows" ON public.campus_user_follows FOR ALL USING (auth.uid() = follower_id);
  END IF;
END $$;

-- 7. CAMPUS SAVED POSTS / COLLECTIONS TABLE
CREATE TABLE IF NOT EXISTS public.campus_saved_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  post_id TEXT NOT NULL REFERENCES public.community_posts(id) ON DELETE CASCADE,
  collection_name TEXT NOT NULL DEFAULT 'Saved',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, post_id)
);

ALTER TABLE public.campus_saved_posts ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users manage their saved posts' AND tablename = 'campus_saved_posts') THEN
    CREATE POLICY "Users manage their saved posts" ON public.campus_saved_posts FOR ALL USING (auth.uid() = user_id);
  END IF;
END $$;

-- 8. EXTEND COMMUNITY POSTS WITH CAMPUSLOOP ATTRIBUTES
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'community_posts' AND column_name = 'images') THEN
    ALTER TABLE public.community_posts ADD COLUMN images JSONB DEFAULT '[]'::jsonb;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'community_posts' AND column_name = 'poll') THEN
    ALTER TABLE public.community_posts ADD COLUMN poll JSONB DEFAULT NULL;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'community_posts' AND column_name = 'event_date') THEN
    ALTER TABLE public.community_posts ADD COLUMN event_date TEXT DEFAULT NULL;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'community_posts' AND column_name = 'location') THEN
    ALTER TABLE public.community_posts ADD COLUMN location TEXT DEFAULT NULL;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'community_posts' AND column_name = 'audience') THEN
    ALTER TABLE public.community_posts ADD COLUMN audience TEXT DEFAULT 'Everyone';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'community_posts' AND column_name = 'shares_count') THEN
    ALTER TABLE public.community_posts ADD COLUMN shares_count INTEGER DEFAULT 0;
  END IF;
END $$;

-- 9. CAMPUS DIRECT MESSAGES TABLE
CREATE TABLE IF NOT EXISTS public.campus_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  recipient_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  thread_id TEXT NOT NULL,
  content TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  is_request BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'accepted', -- 'pending', 'accepted', 'declined'
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.campus_messages ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users see their own messages' AND tablename = 'campus_messages') THEN
    CREATE POLICY "Users see their own messages" ON public.campus_messages FOR ALL USING (
      auth.uid() = sender_id OR auth.uid() = recipient_id
    );
  END IF;
END $$;

-- 10. CAMPUS POST REPORTS TABLE (Moderation)
CREATE TABLE IF NOT EXISTS public.campus_post_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  post_id TEXT NOT NULL,
  reason TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'resolved', 'dismissed'
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.campus_post_reports ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can report posts' AND tablename = 'campus_post_reports') THEN
    CREATE POLICY "Users can report posts" ON public.campus_post_reports FOR INSERT WITH CHECK (auth.role() = 'authenticated');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admins manage reports' AND tablename = 'campus_post_reports') THEN
    CREATE POLICY "Admins manage reports" ON public.campus_post_reports FOR ALL USING (
      EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin')
    );
  END IF;
END $$;
