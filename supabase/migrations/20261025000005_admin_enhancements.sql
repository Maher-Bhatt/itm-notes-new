-- ==============================================================================
-- ITM NOTES - ADMIN ENHANCEMENTS & OPERATIONAL TABLES
-- Migration: 20261025000005_admin_enhancements.sql
-- ==============================================================================

-- 1. CLIENT ERROR INBOX (Feature 1)
CREATE TABLE IF NOT EXISTS public.client_errors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  route text NOT NULL,
  message text NOT NULL,
  stack text,
  app_version text DEFAULT '1.0.0',
  device_info jsonb DEFAULT '{}'::jsonb,
  status text NOT NULL DEFAULT 'unresolved' CHECK (status IN ('unresolved', 'investigating', 'resolved')),
  created_at timestamptz NOT NULL DEFAULT now(),
  resolved_at timestamptz,
  resolved_by uuid REFERENCES auth.users(id) ON DELETE SET NULL
);

ALTER TABLE public.client_errors ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can report frontend errors." ON public.client_errors;
CREATE POLICY "Public can report frontend errors." ON public.client_errors
  FOR INSERT TO public WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can view and manage client errors." ON public.client_errors;
CREATE POLICY "Admins can view and manage client errors." ON public.client_errors
  FOR ALL USING (is_admin());

CREATE INDEX IF NOT EXISTS idx_client_errors_route ON public.client_errors(route);
CREATE INDEX IF NOT EXISTS idx_client_errors_status ON public.client_errors(status);
CREATE INDEX IF NOT EXISTS idx_client_errors_created_at ON public.client_errors(created_at DESC);


-- 2. USER SUSPENSION FLAG (Feature 4)
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS is_suspended boolean DEFAULT false;


-- 3. ANNOUNCEMENTS SCHEDULING & TARGETING (Feature 5)
CREATE TABLE IF NOT EXISTS public.announcements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  message text NOT NULL,
  type text NOT NULL DEFAULT 'info' CHECK (type IN ('info', 'warning', 'success', 'error')),
  audience text NOT NULL DEFAULT 'all' CHECK (audience IN ('all', 'students', 'admins')),
  draft boolean NOT NULL DEFAULT false,
  scheduled_start timestamptz,
  scheduled_end timestamptz,
  target_semester integer,
  target_branch text,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL
);

ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can read active published announcements." ON public.announcements;
CREATE POLICY "Anyone can read active published announcements." ON public.announcements
  FOR SELECT USING (
    (NOT draft AND active AND (scheduled_start IS NULL OR scheduled_start <= now()) AND (scheduled_end IS NULL OR scheduled_end >= now()))
    OR is_admin()
  );

DROP POLICY IF EXISTS "Only admins can manage announcements." ON public.announcements;
CREATE POLICY "Only admins can manage announcements." ON public.announcements
  FOR ALL USING (is_admin());


-- 4. MAINTENANCE WINDOWS SCHEDULER (Feature 6)
CREATE TABLE IF NOT EXISTS public.maintenance_windows (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  reason text,
  start_time timestamptz NOT NULL,
  end_time timestamptz NOT NULL,
  affected_areas text[] NOT NULL DEFAULT ARRAY['all'],
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL
);

ALTER TABLE public.maintenance_windows ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view maintenance windows." ON public.maintenance_windows;
CREATE POLICY "Anyone can view maintenance windows." ON public.maintenance_windows
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Only admins can manage maintenance windows." ON public.maintenance_windows;
CREATE POLICY "Only admins can manage maintenance windows." ON public.maintenance_windows
  FOR ALL USING (is_admin());


-- 5. TOPIC VERSIONS & DRAFT PUBLISH WORKFLOW (Feature 7)
CREATE TABLE IF NOT EXISTS public.topic_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_id text NOT NULL,
  version_number integer NOT NULL DEFAULT 1,
  title text NOT NULL,
  content text NOT NULL,
  status text NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'scheduled')),
  published_at timestamptz,
  scheduled_at timestamptz,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.topic_versions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view published topic versions." ON public.topic_versions;
CREATE POLICY "Users can view published topic versions." ON public.topic_versions
  FOR SELECT USING (status = 'published' OR is_admin());

DROP POLICY IF EXISTS "Admins can manage topic versions." ON public.topic_versions;
CREATE POLICY "Admins can manage topic versions." ON public.topic_versions
  FOR ALL USING (is_admin());

CREATE INDEX IF NOT EXISTS idx_topic_versions_topic_id ON public.topic_versions(topic_id);


-- 6. AUDIT LOG (Feature 9)
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  admin_email text NOT NULL,
  action_type text NOT NULL,
  target_type text NOT NULL,
  target_id text,
  details jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Only admins can access audit logs." ON public.audit_logs;
CREATE POLICY "Only admins can access audit logs." ON public.audit_logs
  FOR ALL USING (is_admin());

CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON public.audit_logs(action_type);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON public.audit_logs(created_at DESC);


-- 7. SUPPORT TICKETS INBOX (Feature 11)
CREATE TABLE IF NOT EXISTS public.support_tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  user_email text,
  user_name text,
  subject text NOT NULL DEFAULT 'General Inquiry',
  message text NOT NULL,
  status text NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved')),
  priority text NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  admin_reply text,
  replied_at timestamptz,
  replied_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can insert support tickets." ON public.support_tickets;
CREATE POLICY "Users can insert support tickets." ON public.support_tickets
  FOR INSERT TO public WITH CHECK (true);

DROP POLICY IF EXISTS "Users can read own tickets; admins read all." ON public.support_tickets;
CREATE POLICY "Users can read own tickets; admins read all." ON public.support_tickets
  FOR SELECT USING (auth.uid() = user_id OR is_admin());

DROP POLICY IF EXISTS "Admins can update support tickets." ON public.support_tickets;
CREATE POLICY "Admins can update support tickets." ON public.support_tickets
  FOR UPDATE USING (is_admin());


-- 8. FEATURE FLAGS (Feature 12)
CREATE TABLE IF NOT EXISTS public.feature_flags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  enabled boolean NOT NULL DEFAULT true,
  description text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.feature_flags ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view feature flags." ON public.feature_flags;
CREATE POLICY "Anyone can view feature flags." ON public.feature_flags
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Only admins can modify feature flags." ON public.feature_flags;
CREATE POLICY "Only admins can modify feature flags." ON public.feature_flags
  FOR ALL USING (is_admin());

-- Seed default flags
INSERT INTO public.feature_flags (key, enabled, description) VALUES
  ('ai_doubt_solver', true, 'Enable 24/7 AI Doubt Solver trained on syllabus notes'),
  ('community', true, 'Enable student peer community and discussion threads'),
  ('gamification', true, 'Enable XP points, daily streaks, and achievement badges'),
  ('mock_exams', true, 'Enable timed university examination simulator'),
  ('coding_lab', true, 'Enable in-browser practical coding lab with test cases'),
  ('srs_flashcards', true, 'Enable SM-2 spaced repetition review for flashcards'),
  ('push_notifications', true, 'Enable push notifications for study & timetable alerts')
ON CONFLICT (key) DO NOTHING;


-- 9. UNIFIED MODERATION QUEUE (Feature 2)
CREATE TABLE IF NOT EXISTS public.moderation_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL CHECK (type IN ('errata', 'student_contribution', 'community_post')),
  target_id text NOT NULL,
  target_title text,
  reporter_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  reporter_name text,
  reporter_email text,
  content text NOT NULL,
  suggested_fix text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  rejection_reason text,
  reviewed_at timestamptz,
  reviewed_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.moderation_reports ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can submit moderation items." ON public.moderation_reports;
CREATE POLICY "Anyone can submit moderation items." ON public.moderation_reports
  FOR INSERT TO public WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can view and update moderation items." ON public.moderation_reports;
CREATE POLICY "Admins can view and update moderation items." ON public.moderation_reports
  FOR ALL USING (is_admin());

CREATE INDEX IF NOT EXISTS idx_moderation_reports_status ON public.moderation_reports(status);
CREATE INDEX IF NOT EXISTS idx_moderation_reports_type ON public.moderation_reports(type);
