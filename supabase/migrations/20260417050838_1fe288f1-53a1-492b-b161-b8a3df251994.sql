-- Replace admin RPCs to match the frontend contract.

-- Drop old signatures (we keep names but change shapes)
DROP FUNCTION IF EXISTS public.admin_list_users(text, timestamptz, integer, integer);
DROP FUNCTION IF EXISTS public.admin_user_growth(integer);
DROP FUNCTION IF EXISTS public.admin_stats();

-- 1) admin_list_users: returns a SET so the client can read rows directly,
--    each row carrying total_count for pagination.
CREATE OR REPLACE FUNCTION public.admin_list_users(
  _search text DEFAULT NULL,
  _from   timestamptz DEFAULT NULL,
  _to     timestamptz DEFAULT NULL,
  _limit  integer DEFAULT 25,
  _offset integer DEFAULT 0
)
RETURNS TABLE (
  user_id uuid,
  email text,
  display_name text,
  created_at timestamptz,
  last_sign_in_at timestamptz,
  topics_completed bigint,
  quizzes_taken bigint,
  downloads bigint,
  is_admin boolean,
  total_count bigint
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE _total bigint;
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Forbidden';
  END IF;

  SELECT count(*) INTO _total
  FROM auth.users u
  LEFT JOIN public.profiles p ON p.user_id = u.id
  WHERE (_search IS NULL OR u.email ILIKE '%' || _search || '%' OR p.display_name ILIKE '%' || _search || '%')
    AND (_from IS NULL OR u.created_at >= _from)
    AND (_to   IS NULL OR u.created_at <= _to);

  RETURN QUERY
  SELECT
    u.id,
    u.email::text,
    p.display_name,
    u.created_at,
    u.last_sign_in_at,
    (SELECT count(*) FROM public.progress      tp WHERE tp.user_id = u.id AND tp.completed)::bigint,
    (SELECT count(*) FROM public.test_results  tr WHERE tr.user_id = u.id)::bigint,
    (SELECT count(*) FROM public.download_history dh WHERE dh.user_id = u.id)::bigint,
    EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = u.id AND ur.role = 'admin'),
    _total
  FROM auth.users u
  LEFT JOIN public.profiles p ON p.user_id = u.id
  WHERE (_search IS NULL OR u.email ILIKE '%' || _search || '%' OR p.display_name ILIKE '%' || _search || '%')
    AND (_from IS NULL OR u.created_at >= _from)
    AND (_to   IS NULL OR u.created_at <= _to)
  ORDER BY u.created_at DESC
  LIMIT _limit OFFSET _offset;
END;
$$;

-- 2) admin_user_growth: returns rows {day, count} between _from/_to (defaults to last 30 days).
CREATE OR REPLACE FUNCTION public.admin_user_growth(
  _from timestamptz DEFAULT NULL,
  _to   timestamptz DEFAULT NULL
)
RETURNS TABLE (day date, count bigint)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE _start timestamptz; _end timestamptz;
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Forbidden';
  END IF;

  _end   := COALESCE(_to,   now());
  _start := COALESCE(_from, _end - interval '30 days');

  RETURN QUERY
  SELECT d::date AS day,
         (SELECT count(*)::bigint FROM auth.users u
          WHERE date_trunc('day', u.created_at) = date_trunc('day', d)) AS count
  FROM generate_series(_start, _end, interval '1 day') d
  ORDER BY d;
END;
$$;

-- 3) admin_stats: object shape that matches the AdminDashboard `Stats` interface.
CREATE OR REPLACE FUNCTION public.admin_stats()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE _result jsonb;
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Forbidden';
  END IF;

  SELECT jsonb_build_object(
    'total_users',     (SELECT count(*) FROM auth.users),
    'new_this_month',  (SELECT count(*) FROM auth.users WHERE created_at > now() - interval '30 days'),
    'active_30d', (
      SELECT count(DISTINCT user_id) FROM (
        SELECT user_id FROM public.progress         WHERE completed_at  > now() - interval '30 days'
        UNION ALL SELECT user_id FROM public.test_results    WHERE taken_at      > now() - interval '30 days'
        UNION ALL SELECT user_id FROM public.download_history WHERE downloaded_at > now() - interval '30 days'
      ) s
    ),
    'total_downloads', (SELECT COALESCE(sum(download_count), 0) FROM public.materials),
    'total_reviews',   (SELECT count(*) FROM public.reviews),
    'avg_rating',      (SELECT COALESCE(round(avg(rating)::numeric, 2), 0) FROM public.reviews),
    'retention_pct', (
      SELECT CASE
        WHEN (SELECT count(*) FROM auth.users WHERE created_at < now() - interval '30 days') = 0 THEN 0
        ELSE round(100.0 * (
          SELECT count(DISTINCT u.id) FROM auth.users u
          WHERE u.created_at < now() - interval '30 days'
            AND EXISTS (
              SELECT 1 FROM public.progress tp WHERE tp.user_id = u.id AND tp.completed_at > now() - interval '30 days'
              UNION ALL SELECT 1 FROM public.test_results tr WHERE tr.user_id = u.id AND tr.taken_at > now() - interval '30 days'
              UNION ALL SELECT 1 FROM public.download_history dh WHERE dh.user_id = u.id AND dh.downloaded_at > now() - interval '30 days'
            )
        )::numeric / NULLIF((SELECT count(*) FROM auth.users WHERE created_at < now() - interval '30 days'), 0), 1)
      END
    )
  ) INTO _result;
  RETURN _result;
END;
$$;