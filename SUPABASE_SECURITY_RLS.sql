-- FIX FOR INFINITE RECURSION IN RLS (ERROR: infinite recursion detected in policy for relation "user_roles")
-- Run this immediately to restore your Admin access!

-- 1. Create a SECURITY DEFINER function to safely check admin status without triggering RLS loops
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_roles.user_id::text = auth.uid()::text AND role = 'admin'
  );
$$;

-- 2. Fix user_roles policies to prevent the infinite loop
DROP POLICY IF EXISTS "Admins can view all roles." ON user_roles;
CREATE POLICY "Admins can view all roles." ON user_roles FOR SELECT USING (is_admin());

DROP POLICY IF EXISTS "Only admins can modify roles." ON user_roles;
CREATE POLICY "Only admins can modify roles." ON user_roles FOR ALL USING (is_admin());

-- 3. Fix profiles policies
DROP POLICY IF EXISTS "Admins can update all profiles." ON profiles;
CREATE POLICY "Admins can update all profiles." ON profiles FOR UPDATE USING (is_admin());

-- 4. Fix Academic Data policies
DROP POLICY IF EXISTS "Only admins can modify universities." ON universities;
CREATE POLICY "Only admins can modify universities." ON universities FOR ALL USING (is_admin());

DROP POLICY IF EXISTS "Admins can modify programs." ON programs;
CREATE POLICY "Admins can modify programs." ON programs FOR ALL USING (is_admin());

DROP POLICY IF EXISTS "Admins can modify branches." ON branches;
CREATE POLICY "Admins can modify branches." ON branches FOR ALL USING (is_admin());

DROP POLICY IF EXISTS "Admins can modify semesters." ON semesters;
CREATE POLICY "Admins can modify semesters." ON semesters FOR ALL USING (is_admin());

DROP POLICY IF EXISTS "Admins can modify subjects." ON subjects;
CREATE POLICY "Admins can modify subjects." ON subjects FOR ALL USING (is_admin());

-- 5. Fix Community Posts policies
DROP POLICY IF EXISTS "Admins can delete any post." ON community_posts;
CREATE POLICY "Admins can delete any post." ON community_posts FOR DELETE USING (is_admin());

