-- EMERGENCY SUPABASE RLS SECURITY SCRIPT
-- Run this in your Supabase SQL Editor immediately to secure your database from attackers.
-- This script prevents users from editing other users' profiles, spoofing admin roles, and dropping tables.

-- 1. Enable RLS on all critical tables
ALTER TABLE "profiles" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "user_roles" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "universities" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "programs" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "branches" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "semesters" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "subjects" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "community_posts" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "community_post_likes" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "community_comments" ENABLE ROW LEVEL SECURITY;

-- 2. Profiles Table Policies
DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON profiles;
CREATE POLICY "Public profiles are viewable by everyone." ON profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can insert their own profile." ON profiles;
CREATE POLICY "Users can insert their own profile." ON profiles FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

DROP POLICY IF EXISTS "Users can update own profile." ON profiles;
CREATE POLICY "Users can update own profile." ON profiles FOR UPDATE USING (auth.uid()::text = user_id::text);

DROP POLICY IF EXISTS "Admins can update all profiles." ON profiles;
CREATE POLICY "Admins can update all profiles." ON profiles FOR UPDATE USING (
  EXISTS (SELECT 1 FROM user_roles WHERE user_roles.user_id::text = auth.uid()::text AND role = 'admin')
);

-- 3. User Roles Table Policies
DROP POLICY IF EXISTS "Users can view their own role." ON user_roles;
CREATE POLICY "Users can view their own role." ON user_roles FOR SELECT USING (auth.uid()::text = user_id::text);

DROP POLICY IF EXISTS "Admins can view all roles." ON user_roles;
CREATE POLICY "Admins can view all roles." ON user_roles FOR SELECT USING (
  EXISTS (SELECT 1 FROM user_roles WHERE user_roles.user_id::text = auth.uid()::text AND role = 'admin')
);

DROP POLICY IF EXISTS "Only admins can modify roles." ON user_roles;
CREATE POLICY "Only admins can modify roles." ON user_roles FOR ALL USING (
  EXISTS (SELECT 1 FROM user_roles WHERE user_roles.user_id::text = auth.uid()::text AND role = 'admin')
);

-- 4. Academic Data (Universities, Programs, etc.)
DROP POLICY IF EXISTS "Academic data is viewable by everyone." ON universities;
CREATE POLICY "Academic data is viewable by everyone." ON universities FOR SELECT USING (true);

DROP POLICY IF EXISTS "Only admins can modify universities." ON universities;
CREATE POLICY "Only admins can modify universities." ON universities FOR ALL USING (
  EXISTS (SELECT 1 FROM user_roles WHERE user_roles.user_id::text = auth.uid()::text AND role = 'admin')
);

DROP POLICY IF EXISTS "Programs viewable by everyone." ON programs;
CREATE POLICY "Programs viewable by everyone." ON programs FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can modify programs." ON programs;
CREATE POLICY "Admins can modify programs." ON programs FOR ALL USING (
  EXISTS (SELECT 1 FROM user_roles WHERE user_roles.user_id::text = auth.uid()::text AND role = 'admin')
);

DROP POLICY IF EXISTS "Branches viewable by everyone." ON branches;
CREATE POLICY "Branches viewable by everyone." ON branches FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can modify branches." ON branches;
CREATE POLICY "Admins can modify branches." ON branches FOR ALL USING (
  EXISTS (SELECT 1 FROM user_roles WHERE user_roles.user_id::text = auth.uid()::text AND role = 'admin')
);

DROP POLICY IF EXISTS "Semesters viewable by everyone." ON semesters;
CREATE POLICY "Semesters viewable by everyone." ON semesters FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can modify semesters." ON semesters;
CREATE POLICY "Admins can modify semesters." ON semesters FOR ALL USING (
  EXISTS (SELECT 1 FROM user_roles WHERE user_roles.user_id::text = auth.uid()::text AND role = 'admin')
);

DROP POLICY IF EXISTS "Subjects viewable by everyone." ON subjects;
CREATE POLICY "Subjects viewable by everyone." ON subjects FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can modify subjects." ON subjects;
CREATE POLICY "Admins can modify subjects." ON subjects FOR ALL USING (
  EXISTS (SELECT 1 FROM user_roles WHERE user_roles.user_id::text = auth.uid()::text AND role = 'admin')
);

-- 5. Community Posts
DROP POLICY IF EXISTS "Posts viewable by everyone." ON community_posts;
CREATE POLICY "Posts viewable by everyone." ON community_posts FOR SELECT USING (true);

DROP POLICY IF EXISTS "Authenticated users can insert posts." ON community_posts;
CREATE POLICY "Authenticated users can insert posts." ON community_posts FOR INSERT WITH CHECK (
  auth.role() = 'authenticated' AND auth.uid()::text = author_id::text
);

DROP POLICY IF EXISTS "Users can update own posts." ON community_posts;
CREATE POLICY "Users can update own posts." ON community_posts FOR UPDATE USING (auth.uid()::text = author_id::text);

DROP POLICY IF EXISTS "Users can delete own posts." ON community_posts;
CREATE POLICY "Users can delete own posts." ON community_posts FOR DELETE USING (auth.uid()::text = author_id::text);

DROP POLICY IF EXISTS "Admins can delete any post." ON community_posts;
CREATE POLICY "Admins can delete any post." ON community_posts FOR DELETE USING (
  EXISTS (SELECT 1 FROM user_roles WHERE user_roles.user_id::text = auth.uid()::text AND role = 'admin')
);
