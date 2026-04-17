-- =========================================================
-- ENUM + USER ROLES (RBAC foundation)
-- =========================================================
DO $$ BEGIN
  CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
CREATE POLICY "Users can view their own roles" ON public.user_roles
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Only admins can manage roles" ON public.user_roles;
CREATE POLICY "Only admins can manage roles" ON public.user_roles
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- =========================================================
-- updated_at helper
-- =========================================================
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

-- =========================================================
-- PROFILES
-- =========================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Profiles viewable by authenticated" ON public.profiles;
CREATE POLICY "Profiles viewable by authenticated" ON public.profiles
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Users update own profile" ON public.profiles;
CREATE POLICY "Users update own profile" ON public.profiles
  FOR UPDATE TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users insert own profile" ON public.profiles;
CREATE POLICY "Users insert own profile" ON public.profiles
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Auto-create profile + default 'user' role on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)))
  ON CONFLICT (user_id) DO NOTHING;

  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user')
  ON CONFLICT (user_id, role) DO NOTHING;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =========================================================
-- PROGRESS TRACKING
-- =========================================================
CREATE TABLE IF NOT EXISTS public.topic_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subject_id TEXT NOT NULL,
  topic_id TEXT NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT true,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, subject_id, topic_id)
);
ALTER TABLE public.topic_progress ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users manage own progress" ON public.topic_progress;
CREATE POLICY "Users manage own progress" ON public.topic_progress
  FOR ALL TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'))
  WITH CHECK (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS public.bookmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subject_id TEXT NOT NULL,
  topic_id TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, subject_id, topic_id)
);
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users manage own bookmarks" ON public.bookmarks;
CREATE POLICY "Users manage own bookmarks" ON public.bookmarks
  FOR ALL TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'))
  WITH CHECK (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subject_id TEXT NOT NULL,
  topic_id TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, subject_id, topic_id)
);
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Reviews viewable by authenticated" ON public.reviews;
CREATE POLICY "Reviews viewable by authenticated" ON public.reviews
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Users insert own reviews" ON public.reviews;
CREATE POLICY "Users insert own reviews" ON public.reviews
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users update own reviews" ON public.reviews;
CREATE POLICY "Users update own reviews" ON public.reviews
  FOR UPDATE TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users delete own reviews or admin" ON public.reviews;
CREATE POLICY "Users delete own reviews or admin" ON public.reviews
  FOR DELETE TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

DROP TRIGGER IF EXISTS update_reviews_updated_at ON public.reviews;
CREATE TRIGGER update_reviews_updated_at
  BEFORE UPDATE ON public.reviews
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE IF NOT EXISTS public.test_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subject_id TEXT NOT NULL,
  topic_id TEXT NOT NULL,
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  taken_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.test_results ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users view own test results or admin" ON public.test_results;
CREATE POLICY "Users view own test results or admin" ON public.test_results
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Users insert own test results" ON public.test_results;
CREATE POLICY "Users insert own test results" ON public.test_results
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- =========================================================
-- MATERIALS
-- =========================================================
CREATE TABLE IF NOT EXISTS public.materials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id TEXT NOT NULL,
  file_name TEXT NOT NULL,
  storage_path TEXT,
  external_url TEXT,
  file_type TEXT NOT NULL CHECK (file_type IN ('pdf', 'pptx', 'docx')),
  file_size BIGINT,
  description TEXT,
  download_count INTEGER NOT NULL DEFAULT 0,
  uploaded_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  CHECK (storage_path IS NOT NULL OR external_url IS NOT NULL)
);
CREATE INDEX IF NOT EXISTS idx_materials_subject ON public.materials(subject_id);

ALTER TABLE public.materials ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Materials viewable by authenticated" ON public.materials;
CREATE POLICY "Materials viewable by authenticated" ON public.materials
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Only admins insert materials" ON public.materials;
CREATE POLICY "Only admins insert materials" ON public.materials
  FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Only admins update materials" ON public.materials;
CREATE POLICY "Only admins update materials" ON public.materials
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Only admins delete materials" ON public.materials;
CREATE POLICY "Only admins delete materials" ON public.materials
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- =========================================================
-- DOWNLOAD HISTORY
-- =========================================================
CREATE TABLE IF NOT EXISTS public.download_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  material_id UUID NOT NULL REFERENCES public.materials(id) ON DELETE CASCADE,
  downloaded_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, material_id)
);
CREATE INDEX IF NOT EXISTS idx_download_history_user ON public.download_history(user_id);
CREATE INDEX IF NOT EXISTS idx_download_history_material ON public.download_history(material_id);

ALTER TABLE public.download_history ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users view own downloads or admin" ON public.download_history;
CREATE POLICY "Users view own downloads or admin" ON public.download_history
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Users insert own downloads" ON public.download_history;
CREATE POLICY "Users insert own downloads" ON public.download_history
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- =========================================================
-- ATOMIC DOWNLOAD RPC
-- =========================================================
CREATE OR REPLACE FUNCTION public.record_material_download(_material_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _uid uuid := auth.uid();
BEGIN
  IF _uid IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  INSERT INTO public.download_history (user_id, material_id)
  VALUES (_uid, _material_id)
  ON CONFLICT (user_id, material_id)
    DO UPDATE SET downloaded_at = now();

  UPDATE public.materials
  SET download_count = download_count + 1
  WHERE id = _material_id;
END;
$$;

-- =========================================================
-- ADMIN RPCs
-- =========================================================
CREATE OR REPLACE FUNCTION public.admin_stats()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _result jsonb;
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Forbidden';
  END IF;

  SELECT jsonb_build_object(
    'total_users', (SELECT count(*) FROM auth.users),
    'new_users_30d', (SELECT count(*) FROM auth.users WHERE created_at > now() - interval '30 days'),
    'active_users_30d', (
      SELECT count(DISTINCT user_id) FROM (
        SELECT user_id FROM public.topic_progress WHERE completed_at > now() - interval '30 days'
        UNION ALL
        SELECT user_id FROM public.test_results WHERE taken_at > now() - interval '30 days'
        UNION ALL
        SELECT user_id FROM public.download_history WHERE downloaded_at > now() - interval '30 days'
      ) s
    ),
    'total_materials', (SELECT count(*) FROM public.materials),
    'total_downloads', (SELECT COALESCE(sum(download_count), 0) FROM public.materials),
    'total_topics_completed', (SELECT count(*) FROM public.topic_progress WHERE completed = true),
    'total_quizzes_taken', (SELECT count(*) FROM public.test_results),
    'avg_quiz_score', (
      SELECT COALESCE(round(avg(score::numeric / NULLIF(total_questions, 0) * 100), 1), 0)
      FROM public.test_results
    ),
    'retention_30d', (
      SELECT CASE
        WHEN (SELECT count(*) FROM auth.users WHERE created_at < now() - interval '30 days') = 0 THEN 0
        ELSE round(
          100.0 * (
            SELECT count(DISTINCT u.id)
            FROM auth.users u
            WHERE u.created_at < now() - interval '30 days'
              AND EXISTS (
                SELECT 1 FROM public.topic_progress tp
                WHERE tp.user_id = u.id AND tp.completed_at > now() - interval '30 days'
                UNION ALL
                SELECT 1 FROM public.test_results tr
                WHERE tr.user_id = u.id AND tr.taken_at > now() - interval '30 days'
                UNION ALL
                SELECT 1 FROM public.download_history dh
                WHERE dh.user_id = u.id AND dh.downloaded_at > now() - interval '30 days'
              )
          )::numeric / (SELECT count(*) FROM auth.users WHERE created_at < now() - interval '30 days'),
        1)
      END
    )
  ) INTO _result;

  RETURN _result;
END;
$$;

CREATE OR REPLACE FUNCTION public.admin_list_users(
  _search text DEFAULT NULL,
  _since timestamptz DEFAULT NULL,
  _limit int DEFAULT 25,
  _offset int DEFAULT 0
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _rows jsonb;
  _total bigint;
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Forbidden';
  END IF;

  WITH filtered AS (
    SELECT u.id, u.email, u.created_at,
           p.display_name,
           EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = u.id AND ur.role = 'admin') AS is_admin
    FROM auth.users u
    LEFT JOIN public.profiles p ON p.user_id = u.id
    WHERE (_search IS NULL OR u.email ILIKE '%' || _search || '%' OR p.display_name ILIKE '%' || _search || '%')
      AND (_since IS NULL OR u.created_at >= _since)
  )
  SELECT count(*) INTO _total FROM filtered;

  WITH filtered AS (
    SELECT u.id, u.email, u.created_at,
           p.display_name,
           EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = u.id AND ur.role = 'admin') AS is_admin,
           (SELECT count(*) FROM public.topic_progress tp WHERE tp.user_id = u.id AND tp.completed) AS topics_completed,
           (SELECT count(*) FROM public.test_results tr WHERE tr.user_id = u.id) AS quizzes_taken,
           (SELECT count(*) FROM public.download_history dh WHERE dh.user_id = u.id) AS downloads
    FROM auth.users u
    LEFT JOIN public.profiles p ON p.user_id = u.id
    WHERE (_search IS NULL OR u.email ILIKE '%' || _search || '%' OR p.display_name ILIKE '%' || _search || '%')
      AND (_since IS NULL OR u.created_at >= _since)
    ORDER BY u.created_at DESC
    LIMIT _limit OFFSET _offset
  )
  SELECT COALESCE(jsonb_agg(row_to_json(filtered)), '[]'::jsonb) INTO _rows FROM filtered;

  RETURN jsonb_build_object('total', _total, 'rows', _rows);
END;
$$;

CREATE OR REPLACE FUNCTION public.admin_user_details(_user_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _result jsonb;
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Forbidden';
  END IF;

  SELECT jsonb_build_object(
    'user', (
      SELECT jsonb_build_object('id', u.id, 'email', u.email, 'created_at', u.created_at,
                                 'display_name', p.display_name,
                                 'is_admin', EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = u.id AND ur.role = 'admin'))
      FROM auth.users u LEFT JOIN public.profiles p ON p.user_id = u.id
      WHERE u.id = _user_id
    ),
    'topics_completed', (SELECT count(*) FROM public.topic_progress WHERE user_id = _user_id AND completed),
    'quizzes_taken', (SELECT count(*) FROM public.test_results WHERE user_id = _user_id),
    'avg_score', (
      SELECT COALESCE(round(avg(score::numeric / NULLIF(total_questions, 0) * 100), 1), 0)
      FROM public.test_results WHERE user_id = _user_id
    ),
    'downloads', (SELECT count(*) FROM public.download_history WHERE user_id = _user_id),
    'by_subject', (
      SELECT COALESCE(jsonb_agg(row_to_json(s)), '[]'::jsonb) FROM (
        SELECT subject_id, count(*) AS topics_completed
        FROM public.topic_progress
        WHERE user_id = _user_id AND completed
        GROUP BY subject_id
        ORDER BY topics_completed DESC
      ) s
    )
  ) INTO _result;

  RETURN _result;
END;
$$;

CREATE OR REPLACE FUNCTION public.admin_user_growth(_days int DEFAULT 30)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Forbidden';
  END IF;

  RETURN (
    SELECT COALESCE(jsonb_agg(row_to_json(s) ORDER BY (s->>'day'))::jsonb, '[]'::jsonb)
    FROM (
      SELECT to_char(date_trunc('day', d), 'YYYY-MM-DD') AS day,
             COALESCE((SELECT count(*) FROM auth.users u WHERE date_trunc('day', u.created_at) = date_trunc('day', d)), 0) AS new_users
      FROM generate_series(now() - (_days || ' days')::interval, now(), interval '1 day') d
    ) s
  );
END;
$$;

CREATE OR REPLACE FUNCTION public.admin_set_role(_user_id uuid, _role app_role, _grant boolean)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Forbidden';
  END IF;
  IF _user_id = auth.uid() AND _role = 'admin' AND NOT _grant THEN
    RAISE EXCEPTION 'You cannot remove your own admin role';
  END IF;

  IF _grant THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (_user_id, _role)
    ON CONFLICT (user_id, role) DO NOTHING;
  ELSE
    DELETE FROM public.user_roles WHERE user_id = _user_id AND role = _role;
  END IF;
END;
$$;

-- =========================================================
-- STORAGE: materials bucket
-- =========================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('materials', 'materials', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Materials public read" ON storage.objects;
CREATE POLICY "Materials public read" ON storage.objects
  FOR SELECT USING (bucket_id = 'materials');

DROP POLICY IF EXISTS "Admins upload materials" ON storage.objects;
CREATE POLICY "Admins upload materials" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'materials' AND public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins update materials" ON storage.objects;
CREATE POLICY "Admins update materials" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'materials' AND public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins delete materials" ON storage.objects;
CREATE POLICY "Admins delete materials" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'materials' AND public.has_role(auth.uid(), 'admin'));

-- =========================================================
-- BOOTSTRAP FIRST ADMIN
-- =========================================================
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role
FROM auth.users
WHERE email = 'your-maherbhatt01@gmail.com'
ON CONFLICT (user_id, role) DO NOTHING;