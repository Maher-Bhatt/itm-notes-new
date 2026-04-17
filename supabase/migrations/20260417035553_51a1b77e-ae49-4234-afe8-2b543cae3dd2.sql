-- Rename topic_progress -> progress and drop subject_id
ALTER TABLE public.topic_progress RENAME TO progress;
ALTER TABLE public.progress DROP COLUMN IF EXISTS subject_id;

-- Recreate uniqueness on (user_id, topic_id)
ALTER TABLE public.progress DROP CONSTRAINT IF EXISTS topic_progress_user_id_subject_id_topic_id_key;
DO $$ BEGIN
  ALTER TABLE public.progress ADD CONSTRAINT progress_user_topic_unique UNIQUE (user_id, topic_id);
EXCEPTION WHEN duplicate_table THEN NULL; WHEN duplicate_object THEN NULL; END $$;

-- Bookmarks: drop subject_id, re-unique on (user_id, topic_id)
ALTER TABLE public.bookmarks DROP COLUMN IF EXISTS subject_id;
ALTER TABLE public.bookmarks DROP CONSTRAINT IF EXISTS bookmarks_user_id_subject_id_topic_id_key;
DO $$ BEGIN
  ALTER TABLE public.bookmarks ADD CONSTRAINT bookmarks_user_topic_unique UNIQUE (user_id, topic_id);
EXCEPTION WHEN duplicate_table THEN NULL; WHEN duplicate_object THEN NULL; END $$;

-- Test results: drop subject_id
ALTER TABLE public.test_results DROP COLUMN IF EXISTS subject_id;

-- Reviews: drop subject_id, rename comment -> review_text, re-unique on (user_id, topic_id)
ALTER TABLE public.reviews DROP COLUMN IF EXISTS subject_id;
ALTER TABLE public.reviews RENAME COLUMN comment TO review_text;
ALTER TABLE public.reviews DROP CONSTRAINT IF EXISTS reviews_user_id_subject_id_topic_id_key;
DO $$ BEGIN
  ALTER TABLE public.reviews ADD CONSTRAINT reviews_user_topic_unique UNIQUE (user_id, topic_id);
EXCEPTION WHEN duplicate_table THEN NULL; WHEN duplicate_object THEN NULL; END $$;

-- Update RPCs that referenced topic_progress
CREATE OR REPLACE FUNCTION public.admin_stats()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE _result jsonb;
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN RAISE EXCEPTION 'Forbidden'; END IF;
  SELECT jsonb_build_object(
    'total_users', (SELECT count(*) FROM auth.users),
    'new_users_30d', (SELECT count(*) FROM auth.users WHERE created_at > now() - interval '30 days'),
    'active_users_30d', (
      SELECT count(DISTINCT user_id) FROM (
        SELECT user_id FROM public.progress WHERE completed_at > now() - interval '30 days'
        UNION ALL SELECT user_id FROM public.test_results WHERE taken_at > now() - interval '30 days'
        UNION ALL SELECT user_id FROM public.download_history WHERE downloaded_at > now() - interval '30 days'
      ) s
    ),
    'total_materials', (SELECT count(*) FROM public.materials),
    'total_downloads', (SELECT COALESCE(sum(download_count), 0) FROM public.materials),
    'total_topics_completed', (SELECT count(*) FROM public.progress WHERE completed = true),
    'total_quizzes_taken', (SELECT count(*) FROM public.test_results),
    'avg_quiz_score', (
      SELECT COALESCE(round(avg(score::numeric / NULLIF(total_questions, 0) * 100), 1), 0) FROM public.test_results
    ),
    'retention_30d', (
      SELECT CASE WHEN (SELECT count(*) FROM auth.users WHERE created_at < now() - interval '30 days') = 0 THEN 0
        ELSE round(100.0 * (
          SELECT count(DISTINCT u.id) FROM auth.users u
          WHERE u.created_at < now() - interval '30 days'
            AND EXISTS (
              SELECT 1 FROM public.progress tp WHERE tp.user_id = u.id AND tp.completed_at > now() - interval '30 days'
              UNION ALL SELECT 1 FROM public.test_results tr WHERE tr.user_id = u.id AND tr.taken_at > now() - interval '30 days'
              UNION ALL SELECT 1 FROM public.download_history dh WHERE dh.user_id = u.id AND dh.downloaded_at > now() - interval '30 days'
            )
        )::numeric / (SELECT count(*) FROM auth.users WHERE created_at < now() - interval '30 days'), 1)
      END
    )
  ) INTO _result;
  RETURN _result;
END; $$;

CREATE OR REPLACE FUNCTION public.admin_list_users(
  _search text DEFAULT NULL, _since timestamptz DEFAULT NULL,
  _limit int DEFAULT 25, _offset int DEFAULT 0
) RETURNS jsonb
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE _rows jsonb; _total bigint;
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN RAISE EXCEPTION 'Forbidden'; END IF;
  WITH filtered AS (
    SELECT u.id FROM auth.users u
    LEFT JOIN public.profiles p ON p.user_id = u.id
    WHERE (_search IS NULL OR u.email ILIKE '%' || _search || '%' OR p.display_name ILIKE '%' || _search || '%')
      AND (_since IS NULL OR u.created_at >= _since)
  )
  SELECT count(*) INTO _total FROM filtered;
  WITH filtered AS (
    SELECT u.id, u.email, u.created_at, p.display_name,
           EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = u.id AND ur.role = 'admin') AS is_admin,
           (SELECT count(*) FROM public.progress tp WHERE tp.user_id = u.id AND tp.completed) AS topics_completed,
           (SELECT count(*) FROM public.test_results tr WHERE tr.user_id = u.id) AS quizzes_taken,
           (SELECT count(*) FROM public.download_history dh WHERE dh.user_id = u.id) AS downloads
    FROM auth.users u LEFT JOIN public.profiles p ON p.user_id = u.id
    WHERE (_search IS NULL OR u.email ILIKE '%' || _search || '%' OR p.display_name ILIKE '%' || _search || '%')
      AND (_since IS NULL OR u.created_at >= _since)
    ORDER BY u.created_at DESC LIMIT _limit OFFSET _offset
  )
  SELECT COALESCE(jsonb_agg(row_to_json(filtered)), '[]'::jsonb) INTO _rows FROM filtered;
  RETURN jsonb_build_object('total', _total, 'rows', _rows);
END; $$;

CREATE OR REPLACE FUNCTION public.admin_user_details(_user_id uuid)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE _result jsonb;
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN RAISE EXCEPTION 'Forbidden'; END IF;
  SELECT jsonb_build_object(
    'user', (
      SELECT jsonb_build_object('id', u.id, 'email', u.email, 'created_at', u.created_at,
        'display_name', p.display_name,
        'is_admin', EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = u.id AND ur.role = 'admin'))
      FROM auth.users u LEFT JOIN public.profiles p ON p.user_id = u.id WHERE u.id = _user_id
    ),
    'topics_completed', (SELECT count(*) FROM public.progress WHERE user_id = _user_id AND completed),
    'quizzes_taken', (SELECT count(*) FROM public.test_results WHERE user_id = _user_id),
    'avg_score', (SELECT COALESCE(round(avg(score::numeric / NULLIF(total_questions, 0) * 100), 1), 0) FROM public.test_results WHERE user_id = _user_id),
    'downloads', (SELECT count(*) FROM public.download_history WHERE user_id = _user_id),
    'recent_topics', (
      SELECT COALESCE(jsonb_agg(row_to_json(s)), '[]'::jsonb) FROM (
        SELECT topic_id, completed_at FROM public.progress
        WHERE user_id = _user_id AND completed ORDER BY completed_at DESC LIMIT 10
      ) s
    )
  ) INTO _result;
  RETURN _result;
END; $$;

-- Tighten storage: signed-in only (kills the "public bucket listing" warning)
DROP POLICY IF EXISTS "Materials public read" ON storage.objects;
CREATE POLICY "Materials read by authenticated" ON storage.objects
  FOR SELECT TO authenticated USING (bucket_id = 'materials');

-- Make the bucket private (URLs will be signed by client when needed; for now public objects can still be fetched via getPublicUrl since policies + bucket flag combine)
UPDATE storage.buckets SET public = false WHERE id = 'materials';