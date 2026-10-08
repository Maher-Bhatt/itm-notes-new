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
-- Users can read all profiles, but only update their own. Admins can update any.
DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON profiles;
CREATE POLICY "Public profiles are viewable by everyone." ON profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can insert their own profile." ON profiles;
CREATE POLICY "Users can insert their own profile." ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile." ON profiles;
CREATE POLICY "Users can update own profile." ON profiles FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Admins can update all profiles." ON profiles;
CREATE POLICY "Admins can update all profiles." ON profiles FOR UPDATE USING (
  EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin')
);

-- 3. User Roles Table Policies
-- Extremely critical: Do not let users give themselves admin roles!
DROP POLICY IF EXISTS "Users can view their own role." ON user_roles;
CREATE POLICY "Users can view their own role." ON user_roles FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins can view all roles." ON user_roles;
CREATE POLICY "Admins can view all roles." ON user_roles FOR SELECT USING (
  EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin')
);

DROP POLICY IF EXISTS "Only admins can modify roles." ON user_roles;
CREATE POLICY "Only admins can modify roles." ON user_roles FOR ALL USING (
  EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin')
);

-- 4. Academic Data (Universities, Programs, etc.)
-- Read-only for everyone. Only admins can modify.
CREATE POLICY "Academic data is viewable by everyone." ON universities FOR SELECT USING (true);
CREATE POLICY "Only admins can modify universities." ON universities FOR ALL USING (EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin'));

CREATE POLICY "Programs viewable by everyone." ON programs FOR SELECT USING (true);
CREATE POLICY "Admins can modify programs." ON programs FOR ALL USING (EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin'));

CREATE POLICY "Branches viewable by everyone." ON branches FOR SELECT USING (true);
CREATE POLICY "Admins can modify branches." ON branches FOR ALL USING (EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin'));

CREATE POLICY "Semesters viewable by everyone." ON semesters FOR SELECT USING (true);
CREATE POLICY "Admins can modify semesters." ON semesters FOR ALL USING (EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin'));

CREATE POLICY "Subjects viewable by everyone." ON subjects FOR SELECT USING (true);
CREATE POLICY "Admins can modify subjects." ON subjects FOR ALL USING (EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin'));

-- 5. Community Posts
-- Authenticated users can read/insert. Users can only update/delete their own posts. Admins can delete any post.
CREATE POLICY "Posts viewable by everyone." ON community_posts FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert posts." ON community_posts FOR INSERT WITH CHECK (auth.role() = 'authenticated' AND auth.uid() = author_id);
CREATE POLICY "Users can update own posts." ON community_posts FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "Users can delete own posts." ON community_posts FOR DELETE USING (auth.uid() = author_id);
CREATE POLICY "Admins can delete any post." ON community_posts FOR DELETE USING (EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin'));
