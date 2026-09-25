-- Track IMP Questions page views per user per subject
CREATE TABLE IF NOT EXISTS public.imp_question_views (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subject_id TEXT NOT NULL,          -- e.g. 'c-programming', 'python'
  subject_name TEXT NOT NULL,        -- e.g. 'Programming in C'
  viewed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.imp_question_views ENABLE ROW LEVEL SECURITY;

-- Users can insert their own views
CREATE POLICY "Users can insert own imp views"
ON public.imp_question_views FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Admins can read all views via RPC (defined below)
CREATE POLICY "Users can view own imp views"
ON public.imp_question_views FOR SELECT
USING (auth.uid() = user_id);

-- RPC for admin: aggregate IMP question view stats
CREATE OR REPLACE FUNCTION public.admin_imp_stats()
RETURNS TABLE (
  subject_id   TEXT,
  subject_name TEXT,
  total_views  BIGINT,
  unique_users BIGINT,
  last_viewed  TIMESTAMP WITH TIME ZONE
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    subject_id,
    MAX(subject_name) AS subject_name,
    COUNT(*)          AS total_views,
    COUNT(DISTINCT user_id) AS unique_users,
    MAX(viewed_at)    AS last_viewed
  FROM imp_question_views
  GROUP BY subject_id
  ORDER BY total_views DESC;
$$;

-- RPC for admin: recent IMP views with user info
CREATE OR REPLACE FUNCTION public.admin_imp_recent_views(_limit INT DEFAULT 50)
RETURNS TABLE (
  user_id      UUID,
  email        TEXT,
  display_name TEXT,
  subject_name TEXT,
  viewed_at    TIMESTAMP WITH TIME ZONE
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    v.user_id,
    u.email,
    p.display_name,
    v.subject_name,
    v.viewed_at
  FROM imp_question_views v
  JOIN auth.users u ON u.id = v.user_id
  LEFT JOIN profiles p ON p.user_id = v.user_id
  ORDER BY v.viewed_at DESC
  LIMIT _limit;
$$;
