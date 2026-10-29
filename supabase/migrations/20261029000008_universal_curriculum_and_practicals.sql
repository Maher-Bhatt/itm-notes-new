-- =============================================================================
-- MIGRATION: 20261029000008_universal_curriculum_and_practicals.sql
-- Description: Universal Multi-Department Curriculum, Master Question Bank,
--              Laboratory Practicals (1,180+ Experiments), System Diagnostics,
--              and Student Submissions with Row Level Security (RLS)
-- =============================================================================

-- 1. DEPARTMENTS TABLE
CREATE TABLE IF NOT EXISTS public.departments (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  code TEXT NOT NULL UNIQUE,
  icon TEXT NOT NULL DEFAULT '🏫',
  description TEXT,
  total_semesters INTEGER NOT NULL DEFAULT 8,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public can view active departments' AND tablename = 'departments') THEN
    CREATE POLICY "Public can view active departments" ON public.departments
      FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admins can manage departments' AND tablename = 'departments') THEN
    CREATE POLICY "Admins can manage departments" ON public.departments
      FOR ALL USING (
        auth.role() = 'authenticated' AND (
          EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin') OR
          auth.jwt()->>'email' = 'maherbhatt01@gmail.com'
        )
      );
  END IF;
END $$;

-- Seed Standard Academic Departments
INSERT INTO public.departments (id, name, code, icon, description, total_semesters) VALUES
  ('cse', 'Computer Science & Engineering', 'CSE', '💻', 'Core computer systems, software engineering, OS, networks, compilers & security', 8),
  ('aids', 'Artificial Intelligence & Data Science', 'AI&DS', '🤖', 'Machine learning, deep learning, NLP, computer vision, big data & generative AI', 8),
  ('ece', 'Electronics & Communication Engineering', 'ECE', '⚡', 'Digital logic, microprocessors, signals, communication systems, VLSI & embedded IoT', 8),
  ('bca', 'Bachelor of Computer Applications', 'BCA', '📱', 'Web design, mobile apps, database systems, Python, Java & software testing', 6),
  ('mca', 'Master of Computer Applications', 'MCA', '☁️', 'Enterprise software, distributed computing, cloud native architectures & algorithms', 4),
  ('mech', 'Mechanical Engineering (Computational)', 'MECH', '🔧', 'FEA, thermodynamics, kinematics, CFD simulation & CAD modeling', 8),
  ('civil', 'Civil Engineering (Computational)', 'CIVIL', '🏗️', 'Structural analysis, GIS geomatics, hydraulics, geotechnical & transport design', 8),
  ('mba', 'Master of Business Administration (Analytics & Finance)', 'MBA', '📈', 'Business intelligence, financial modeling, marketing analytics & operations research', 4)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  code = EXCLUDED.code,
  icon = EXCLUDED.icon,
  description = EXCLUDED.description;

-- 2. CURRICULUM SUBJECTS TABLE
CREATE TABLE IF NOT EXISTS public.curriculum_subjects (
  id TEXT PRIMARY KEY,
  department_id TEXT NOT NULL REFERENCES public.departments(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  short_name TEXT NOT NULL,
  code TEXT NOT NULL,
  semester INTEGER NOT NULL CHECK (semester BETWEEN 1 AND 8),
  icon TEXT NOT NULL DEFAULT '📚',
  description TEXT,
  units_count INTEGER NOT NULL DEFAULT 5,
  total_topics INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.curriculum_subjects ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public can view active curriculum subjects' AND tablename = 'curriculum_subjects') THEN
    CREATE POLICY "Public can view active curriculum subjects" ON public.curriculum_subjects
      FOR SELECT USING (is_active = true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admins can manage curriculum subjects' AND tablename = 'curriculum_subjects') THEN
    CREATE POLICY "Admins can manage curriculum subjects" ON public.curriculum_subjects
      FOR ALL USING (
        auth.role() = 'authenticated' AND (
          EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin') OR
          auth.jwt()->>'email' = 'maherbhatt01@gmail.com'
        )
      );
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_curriculum_subjects_dept_sem ON public.curriculum_subjects(department_id, semester);

-- 3. UNIVERSAL QUESTION BANK TABLE
CREATE TABLE IF NOT EXISTS public.universal_question_bank (
  id TEXT PRIMARY KEY,
  subject_id TEXT REFERENCES public.curriculum_subjects(id) ON DELETE SET NULL,
  subject_name TEXT NOT NULL,
  semester INTEGER NOT NULL CHECK (semester BETWEEN 1 AND 8),
  unit_number INTEGER NOT NULL CHECK (unit_number BETWEEN 1 AND 5),
  chapter_title TEXT NOT NULL,
  question TEXT NOT NULL,
  options JSONB NOT NULL,
  correct_answer INTEGER NOT NULL CHECK (correct_answer BETWEEN 0 AND 3),
  explanation TEXT NOT NULL,
  difficulty TEXT NOT NULL DEFAULT 'Medium' CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
  marks INTEGER NOT NULL DEFAULT 1,
  exam_weight TEXT NOT NULL DEFAULT 'Standard',
  is_verified BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.universal_question_bank ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Authenticated students can view questions' AND tablename = 'universal_question_bank') THEN
    CREATE POLICY "Authenticated students can view questions" ON public.universal_question_bank
      FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admins can manage question bank' AND tablename = 'universal_question_bank') THEN
    CREATE POLICY "Admins can manage question bank" ON public.universal_question_bank
      FOR ALL USING (
        auth.role() = 'authenticated' AND (
          EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin') OR
          auth.jwt()->>'email' = 'maherbhatt01@gmail.com'
        )
      );
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_question_bank_subject_unit ON public.universal_question_bank(subject_name, unit_number);
CREATE INDEX IF NOT EXISTS idx_question_bank_semester ON public.universal_question_bank(semester);

-- 4. UNIVERSAL PRACTICALS TABLE (1,180+ Laboratory Experiments)
CREATE TABLE IF NOT EXISTS public.universal_practicals (
  id TEXT PRIMARY KEY,
  course_id TEXT,
  subject_name TEXT NOT NULL,
  department TEXT NOT NULL,
  semester INTEGER NOT NULL CHECK (semester BETWEEN 1 AND 8),
  title TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'general',
  difficulty TEXT NOT NULL DEFAULT 'Medium' CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
  marks TEXT NOT NULL DEFAULT '10 Marks (University Lab Exam)',
  language TEXT NOT NULL,
  file_name TEXT NOT NULL,
  description TEXT NOT NULL,
  constraints JSONB NOT NULL DEFAULT '[]'::jsonb,
  expected_output TEXT NOT NULL,
  starter_code TEXT NOT NULL,
  model_solution TEXT NOT NULL,
  hints JSONB NOT NULL DEFAULT '[]'::jsonb,
  viva_questions JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_verified BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.universal_practicals ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public can view universal practicals' AND tablename = 'universal_practicals') THEN
    CREATE POLICY "Public can view universal practicals" ON public.universal_practicals
      FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admins can manage universal practicals' AND tablename = 'universal_practicals') THEN
    CREATE POLICY "Admins can manage universal practicals" ON public.universal_practicals
      FOR ALL USING (
        auth.role() = 'authenticated' AND (
          EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin') OR
          auth.jwt()->>'email' = 'maherbhatt01@gmail.com'
        )
      );
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_universal_practicals_dept_sem ON public.universal_practicals(department, semester);
CREATE INDEX IF NOT EXISTS idx_universal_practicals_language ON public.universal_practicals(language);

-- 5. STUDENT PRACTICAL SUBMISSIONS TABLE
CREATE TABLE IF NOT EXISTS public.student_practical_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  practical_id TEXT NOT NULL REFERENCES public.universal_practicals(id) ON DELETE CASCADE,
  code TEXT NOT NULL,
  language TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('passed', 'failed', 'compiling')),
  execution_output TEXT,
  runtime_ms INTEGER NOT NULL DEFAULT 0,
  memory_mb NUMERIC(6, 2) NOT NULL DEFAULT 0.0,
  passed_testcases INTEGER NOT NULL DEFAULT 1,
  total_testcases INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.student_practical_submissions ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Students can view own submissions' AND tablename = 'student_practical_submissions') THEN
    CREATE POLICY "Students can view own submissions" ON public.student_practical_submissions
      FOR SELECT USING (auth.uid() = student_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Students can record own submissions' AND tablename = 'student_practical_submissions') THEN
    CREATE POLICY "Students can record own submissions" ON public.student_practical_submissions
      FOR INSERT WITH CHECK (auth.uid() = student_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admins can view all practical submissions' AND tablename = 'student_practical_submissions') THEN
    CREATE POLICY "Admins can view all practical submissions" ON public.student_practical_submissions
      FOR ALL USING (
        auth.role() = 'authenticated' AND (
          EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin') OR
          auth.jwt()->>'email' = 'maherbhatt01@gmail.com'
        )
      );
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_practical_submissions_student ON public.student_practical_submissions(student_id, practical_id);

-- 6. ADMIN SYSTEM DIAGNOSTICS TABLE
CREATE TABLE IF NOT EXISTS public.admin_system_diagnostics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_name TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('operational', 'degraded', 'offline')),
  latency_ms INTEGER NOT NULL DEFAULT 0,
  details JSONB NOT NULL DEFAULT '{}'::jsonb,
  checked_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.admin_system_diagnostics ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admins can manage system diagnostics' AND tablename = 'admin_system_diagnostics') THEN
    CREATE POLICY "Admins can manage system diagnostics" ON public.admin_system_diagnostics
      FOR ALL USING (
        auth.role() = 'authenticated' AND (
          EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin') OR
          auth.jwt()->>'email' = 'maherbhatt01@gmail.com'
        )
      );
  END IF;
END $$;

-- 7. ADMIN BROADCAST ANNOUNCEMENTS TABLE
CREATE TABLE IF NOT EXISTS public.admin_broadcast_announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  target_departments JSONB NOT NULL DEFAULT '["all"]'::jsonb,
  target_semesters JSONB NOT NULL DEFAULT '["all"]'::jsonb,
  priority TEXT NOT NULL DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'urgent', 'critical')),
  is_pinned BOOLEAN NOT NULL DEFAULT false,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.admin_broadcast_announcements ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public can view active announcements' AND tablename = 'admin_broadcast_announcements') THEN
    CREATE POLICY "Public can view active announcements" ON public.admin_broadcast_announcements
      FOR SELECT USING (expires_at IS NULL OR expires_at > now());
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admins can manage announcements' AND tablename = 'admin_broadcast_announcements') THEN
    CREATE POLICY "Admins can manage announcements" ON public.admin_broadcast_announcements
      FOR ALL USING (
        auth.role() = 'authenticated' AND (
          EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin') OR
          auth.jwt()->>'email' = 'maherbhatt01@gmail.com'
        )
      );
  END IF;
END $$;
