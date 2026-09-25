-- ========================================================
-- REAL USERS PROFILE SYNC & AUTOMATIC AUTH POPULATION
-- ========================================================

-- 1. Add extra columns to profiles for full student directory
ALTER TABLE public.profiles 
  ADD COLUMN IF NOT EXISTS email TEXT,
  ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'student',
  ADD COLUMN IF NOT EXISTS xp INTEGER DEFAULT 120,
  ADD COLUMN IF NOT EXISTS level INTEGER DEFAULT 1,
  ADD COLUMN IF NOT EXISTS streak_days INTEGER DEFAULT 1,
  ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'Active';

-- 2. Backfill existing profiles from auth.users
UPDATE public.profiles p
SET 
  email = u.email,
  display_name = COALESCE(
    NULLIF(u.raw_user_meta_data->>'display_name', ''),
    NULLIF(p.display_name, 'Student'),
    split_part(u.email, '@', 1)
  ),
  role = CASE 
    WHEN u.email = 'maherbhatt01@gmail.com' THEN 'admin'
    ELSE COALESCE(p.role, 'student')
  END
FROM auth.users u
WHERE p.user_id = u.id;

-- 3. Insert any auth.users that don't have a profile yet
INSERT INTO public.profiles (
  user_id,
  email,
  display_name,
  role,
  branch,
  xp,
  level,
  streak_days,
  status
)
SELECT 
  u.id,
  u.email,
  COALESCE(
    NULLIF(u.raw_user_meta_data->>'display_name', ''),
    split_part(u.email, '@', 1)
  ),
  CASE 
    WHEN u.email = 'maherbhatt01@gmail.com' THEN 'admin'
    ELSE 'student'
  END,
  'B.Tech CSE ''26',
  120,
  1,
  1,
  'Active'
FROM auth.users u
ON CONFLICT (user_id) DO UPDATE SET
  email = EXCLUDED.email,
  display_name = COALESCE(NULLIF(EXCLUDED.display_name, ''), public.profiles.display_name);

-- 4. Auto-sync trigger for all future user signups
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert into profiles with real display_name and email
  INSERT INTO public.profiles (
    user_id,
    email,
    display_name,
    role,
    branch,
    xp,
    level,
    streak_days,
    status
  )
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(
      NULLIF(NEW.raw_user_meta_data->>'display_name', ''),
      split_part(NEW.email, '@', 1)
    ),
    CASE WHEN NEW.email = 'maherbhatt01@gmail.com' THEN 'admin' ELSE 'student' END,
    'B.Tech CSE ''26',
    120,
    1,
    1,
    'Active'
  )
  ON CONFLICT (user_id) DO UPDATE SET
    email = EXCLUDED.email,
    display_name = COALESCE(NULLIF(EXCLUDED.display_name, ''), public.profiles.display_name);

  -- Insert into user_roles
  INSERT INTO public.user_roles (user_id, role)
  VALUES (
    NEW.id,
    CASE WHEN NEW.email = 'maherbhatt01@gmail.com' THEN 'admin'::public.app_role ELSE 'user'::public.app_role END
  )
  ON CONFLICT (user_id, role) DO NOTHING;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Re-create trigger on auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 5. Set RLS policies for profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admins can manage all profiles' AND tablename = 'profiles') THEN
    CREATE POLICY "Admins can manage all profiles" ON public.profiles FOR ALL USING (
      EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin') OR
      auth.email() = 'maherbhatt01@gmail.com'
    );
  END IF;
END $$;
