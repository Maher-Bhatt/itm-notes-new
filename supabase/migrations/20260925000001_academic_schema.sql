-- Academic Hierarchy

-- Universities
CREATE TABLE public.universities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Programs (e.g. B.Tech)
CREATE TABLE public.programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  university_id UUID NOT NULL REFERENCES public.universities(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Branches (e.g. IT, CSE)
CREATE TABLE public.branches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id UUID NOT NULL REFERENCES public.programs(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Semesters
CREATE TABLE public.semesters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  branch_id UUID NOT NULL REFERENCES public.branches(id) ON DELETE CASCADE,
  number INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Subjects
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

-- Units
CREATE TABLE public.units (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Topics
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

-- Examples
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

-- Key Points
CREATE TABLE public.key_points (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_id UUID NOT NULL REFERENCES public.topics(id) ON DELETE CASCADE,
  point TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- MCQs
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

-- Add RLS for all new tables
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

-- Read access for all (using anon, authenticated)
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

-- Write access for admins
CREATE POLICY "Admins can manage universities" ON public.universities FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage programs" ON public.programs FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage branches" ON public.branches FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage semesters" ON public.semesters FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage subjects" ON public.subjects FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage units" ON public.units FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage topics" ON public.topics FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage examples" ON public.examples FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage key_points" ON public.key_points FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage mcqs" ON public.mcqs FOR ALL USING (public.has_role(auth.uid(), 'admin'));
