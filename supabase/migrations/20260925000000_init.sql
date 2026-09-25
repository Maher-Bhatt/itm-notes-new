-- ==========================================
-- ITM NOTES 2.0 INITIALIZATION SCRIPT
-- ==========================================

-- 1. UTILITIES & ROLES
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL DEFAULT 'user',
  UNIQUE (user_id, role)
);

CREATE OR REPLACE FUNCTION public.has_role(user_id UUID, check_role public.app_role)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.user_roles ur
    WHERE ur.user_id = has_role.user_id AND ur.role = check_role
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. AUTO-ASSIGN ADMIN TRIGGER
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Everyone gets 'user'
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user')
  ON CONFLICT (user_id, role) DO NOTHING;

  -- specific email gets 'admin'
  IF NEW.email = 'maherbhatt01@gmail.com' THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 3. ACADEMIC HIERARCHY

CREATE TABLE public.universities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  university_id UUID NOT NULL REFERENCES public.universities(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.branches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id UUID NOT NULL REFERENCES public.programs(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.semesters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  branch_id UUID NOT NULL REFERENCES public.branches(id) ON DELETE CASCADE,
  number INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.subjects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  semester_id UUID NOT NULL REFERENCES public.semesters(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  code TEXT NOT NULL,
  color TEXT,
  icon TEXT,
  description TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.units (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.topics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  unit_id UUID NOT NULL REFERENCES public.units(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  simple_explanation TEXT,
  detailed_explanation TEXT,
  rich_content TEXT,
  short_notes TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.examples (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_id UUID NOT NULL REFERENCES public.topics(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  problem TEXT,
  explanation TEXT,
  code TEXT,
  output TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.key_points (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_id UUID NOT NULL REFERENCES public.topics(id) ON DELETE CASCADE,
  point TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.mcqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_id UUID NOT NULL REFERENCES public.topics(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  options JSONB NOT NULL,
  correct_index INTEGER NOT NULL,
  explanation TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. ROW LEVEL SECURITY (RLS)

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.universities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.branches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.semesters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.units ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.examples ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.key_points ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mcqs ENABLE ROW LEVEL SECURITY;

-- Read access for everyone
CREATE POLICY "Viewable by everyone" ON public.universities FOR SELECT USING (true);
CREATE POLICY "Viewable by everyone" ON public.programs FOR SELECT USING (true);
CREATE POLICY "Viewable by everyone" ON public.branches FOR SELECT USING (true);
CREATE POLICY "Viewable by everyone" ON public.semesters FOR SELECT USING (true);
CREATE POLICY "Viewable by everyone" ON public.subjects FOR SELECT USING (true);
CREATE POLICY "Viewable by everyone" ON public.units FOR SELECT USING (true);
CREATE POLICY "Viewable by everyone" ON public.topics FOR SELECT USING (true);
CREATE POLICY "Viewable by everyone" ON public.examples FOR SELECT USING (true);
CREATE POLICY "Viewable by everyone" ON public.key_points FOR SELECT USING (true);
CREATE POLICY "Viewable by everyone" ON public.mcqs FOR SELECT USING (true);
CREATE POLICY "Users view own role" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);

-- Admin write access
CREATE POLICY "Admins manage roles" ON public.user_roles FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage universities" ON public.universities FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage programs" ON public.programs FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage branches" ON public.branches FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage semesters" ON public.semesters FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage subjects" ON public.subjects FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage units" ON public.units FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage topics" ON public.topics FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage examples" ON public.examples FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage key_points" ON public.key_points FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage mcqs" ON public.mcqs FOR ALL USING (public.has_role(auth.uid(), 'admin'));
-- 5. ADVANCED ACADEMIC FEATURES (Mock Tests, Flashcards, Coding)

CREATE TABLE public.mock_tests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  duration_minutes INTEGER NOT NULL DEFAULT 180,
  total_marks INTEGER NOT NULL DEFAULT 100,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.test_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  test_id UUID NOT NULL REFERENCES public.mock_tests(id) ON DELETE CASCADE,
  section TEXT NOT NULL,
  question TEXT NOT NULL,
  marks INTEGER NOT NULL,
  expected_answer TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.flashcards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
  topic_id UUID REFERENCES public.topics(id) ON DELETE CASCADE,
  front TEXT NOT NULL,
  back TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.coding_problems (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  starter_code TEXT,
  solution_code TEXT,
  test_cases JSONB,
  time_complexity TEXT,
  space_complexity TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  item_type TEXT NOT NULL,
  item_id UUID NOT NULL,
  status TEXT NOT NULL,
  score INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, item_type, item_id)
);

-- Enable RLS for new tables
ALTER TABLE public.mock_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.flashcards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coding_problems ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

-- Read access
CREATE POLICY "Viewable by everyone" ON public.mock_tests FOR SELECT USING (true);
CREATE POLICY "Viewable by everyone" ON public.test_questions FOR SELECT USING (true);
CREATE POLICY "Viewable by everyone" ON public.flashcards FOR SELECT USING (true);
CREATE POLICY "Viewable by everyone" ON public.coding_problems FOR SELECT USING (true);

-- User progress access
CREATE POLICY "Users view own progress" ON public.user_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users update own progress" ON public.user_progress FOR ALL USING (auth.uid() = user_id);

-- Admin write access
CREATE POLICY "Admins manage mock_tests" ON public.mock_tests FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage test_questions" ON public.test_questions FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage flashcards" ON public.flashcards FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage coding_problems" ON public.coding_problems FOR ALL USING (public.has_role(auth.uid(), 'admin'));
