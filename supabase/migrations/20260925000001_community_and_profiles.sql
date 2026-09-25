-- ========================================================
-- ITM NOTES: PROFILES, COMMUNITY POSTS, COMMENTS, & FRIENDS
-- ========================================================

-- 1. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  avatar_url TEXT,
  branch TEXT DEFAULT 'B.Tech CSE ''26',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Profiles viewable by everyone' AND tablename = 'profiles') THEN
    CREATE POLICY "Profiles viewable by everyone" ON public.profiles FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can insert their own profile' AND tablename = 'profiles') THEN
    CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can update their own profile' AND tablename = 'profiles') THEN
    CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
  END IF;
END $$;

-- 2. COMMUNITY POSTS TABLE
CREATE TABLE IF NOT EXISTS public.community_posts (
  id TEXT PRIMARY KEY,
  author_id TEXT NOT NULL,
  author_name TEXT NOT NULL,
  author_email TEXT,
  author_avatar TEXT,
  author_branch TEXT DEFAULT 'B.Tech CSE ''26',
  is_masked BOOLEAN DEFAULT false,
  mask_alias TEXT DEFAULT 'Anonymous Student 🎭',
  category TEXT NOT NULL,
  content TEXT NOT NULL,
  likes INTEGER DEFAULT 0,
  pinned BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.community_posts ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Community posts viewable by everyone' AND tablename = 'community_posts') THEN
    CREATE POLICY "Community posts viewable by everyone" ON public.community_posts FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Authenticated users can create posts' AND tablename = 'community_posts') THEN
    CREATE POLICY "Authenticated users can create posts" ON public.community_posts FOR INSERT WITH CHECK (auth.role() = 'authenticated');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Authors and admins can update posts' AND tablename = 'community_posts') THEN
    CREATE POLICY "Authors and admins can update posts" ON public.community_posts FOR UPDATE USING (
      auth.uid()::text = author_id OR 
      EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin')
    );
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Authors and admins can delete posts' AND tablename = 'community_posts') THEN
    CREATE POLICY "Authors and admins can delete posts" ON public.community_posts FOR DELETE USING (
      auth.uid()::text = author_id OR 
      EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin')
    );
  END IF;
END $$;

-- 3. COMMUNITY COMMENTS TABLE
CREATE TABLE IF NOT EXISTS public.community_comments (
  id TEXT PRIMARY KEY,
  post_id TEXT NOT NULL REFERENCES public.community_posts(id) ON DELETE CASCADE,
  author_id TEXT NOT NULL,
  author_name TEXT NOT NULL,
  author_email TEXT,
  author_avatar TEXT,
  is_masked BOOLEAN DEFAULT false,
  mask_alias TEXT DEFAULT 'Masked Student 🎭',
  content TEXT NOT NULL,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.community_comments ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Comments viewable by everyone' AND tablename = 'community_comments') THEN
    CREATE POLICY "Comments viewable by everyone" ON public.community_comments FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Authenticated users can create comments' AND tablename = 'community_comments') THEN
    CREATE POLICY "Authenticated users can create comments" ON public.community_comments FOR INSERT WITH CHECK (auth.role() = 'authenticated');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Authors and admins can delete comments' AND tablename = 'community_comments') THEN
    CREATE POLICY "Authors and admins can delete comments" ON public.community_comments FOR DELETE USING (
      auth.uid()::text = author_id OR 
      EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin')
    );
  END IF;
END $$;

-- 4. COMMUNITY POST LIKES TABLE (Prevents duplicate likes per user)
CREATE TABLE IF NOT EXISTS public.community_post_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id TEXT NOT NULL REFERENCES public.community_posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(post_id, user_id)
);

ALTER TABLE public.community_post_likes ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Likes viewable by everyone' AND tablename = 'community_post_likes') THEN
    CREATE POLICY "Likes viewable by everyone" ON public.community_post_likes FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can toggle their own likes' AND tablename = 'community_post_likes') THEN
    CREATE POLICY "Users can toggle their own likes" ON public.community_post_likes FOR INSERT WITH CHECK (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can remove their own likes' AND tablename = 'community_post_likes') THEN
    CREATE POLICY "Users can remove their own likes" ON public.community_post_likes FOR DELETE USING (auth.uid() = user_id);
  END IF;
END $$;

-- 5. STUDENT STUDY FRIENDS TABLE
CREATE TABLE IF NOT EXISTS public.student_friends (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  friend_id TEXT NOT NULL,
  friend_name TEXT,
  friend_email TEXT,
  friend_branch TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, friend_id)
);

ALTER TABLE public.student_friends ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users view their own friends' AND tablename = 'student_friends') THEN
    CREATE POLICY "Users view their own friends" ON public.student_friends FOR SELECT USING (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can add friends' AND tablename = 'student_friends') THEN
    CREATE POLICY "Users can add friends" ON public.student_friends FOR INSERT WITH CHECK (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can remove friends' AND tablename = 'student_friends') THEN
    CREATE POLICY "Users can remove friends" ON public.student_friends FOR DELETE USING (auth.uid() = user_id);
  END IF;
END $$;

-- 6. SEED INITIAL COMMUNITY POSTS
INSERT INTO public.community_posts (id, author_id, author_name, author_email, author_branch, is_masked, mask_alias, category, content, likes, pinned, created_at)
VALUES
  (
    'post-1',
    'admin-maher-system',
    'Rohan Deshmukh',
    'rohan.d@itm.ac.in',
    'B.Tech CSE Sem 3',
    true,
    'Anonymous Student 🎭',
    'College Feedback',
    'The AC in Lab 3 (Ground Floor) has been dripping water right near the power strips for two weeks now, and Wi-Fi speed drops to zero during practical hours. Can college administration please repair this before semester finals start?',
    38,
    true,
    now() - interval '2 hours'
  ),
  (
    'post-2',
    'student-priya-system',
    'Priya Sharma',
    'priya.s@itm.ac.in',
    'B.Tech CSE Sem 3',
    false,
    'Priya Sharma',
    'Exam Survival & Tips',
    'For anyone studying Computer Architecture Unit 2: pay special attention to the Master Instruction Cycle flowchart (T0 through T6) and BSA subroutine instructions. Those are almost guaranteed 7-mark questions according to previous question papers!',
    47,
    false,
    now() - interval '4 hours'
  ),
  (
    'post-3',
    'student-kunal-system',
    'Kunal Verma',
    'kunal.v@itm.ac.in',
    'B.Tech CSE Sem 3',
    true,
    'Anonymous Student 🎭',
    'Campus Confessions',
    'Confession: I skipped Friday 8:30 AM lecture just to finish my assignment, but thanks to the 75% attendance calculator on ITM Notes I checked first and knew I still have 3 safe bunks left without dropping below the threshold! 😅',
    62,
    false,
    now() - interval '6 hours'
  ),
  (
    'post-4',
    'student-aarav-system',
    'Aarav Patel',
    'aarav.p@itm.ac.in',
    'B.Tech CSE Sem 3',
    false,
    'Aarav Patel',
    'Projects & Tech',
    'Check out the new Practical Coding Lab with 94 complete runnable programs for C, Java, and Python! Tested all DSA problems with time complexity analysis. Perfect for preparing for external viva exams.',
    53,
    false,
    now() - interval '12 hours'
  ),
  (
    'post-5',
    'student-ananya-system',
    'Ananya Mehta',
    'ananya.m@itm.ac.in',
    'B.Tech CSE Sem 3',
    true,
    'Anonymous Student 🎭',
    'College Feedback',
    'Can the college canteen please bring back hot filter coffee during afternoon breaks? Also the library study rooms need more charging outlets for laptops. Posting masked so we can get genuine student improvements done without red tape!',
    41,
    false,
    now() - interval '1 day'
  )
ON CONFLICT (id) DO NOTHING;

-- Seed Comments for Post 1
INSERT INTO public.community_comments (id, post_id, author_id, author_name, author_email, is_masked, mask_alias, content, likes, created_at)
VALUES
  (
    'c-1',
    'post-1',
    'admin-maher',
    'Maher Bhatt (Admin)',
    'maher@itm.ac.in',
    false,
    'Admin',
    'Noted! Forwarding this feedback directly to the IT infrastructure team and campus maintenance.',
    14,
    now() - interval '1 hour'
  ),
  (
    'c-2',
    'post-1',
    'user-masked-2',
    'Anonymous Peer',
    'student2@itm.ac.in',
    true,
    'Masked Peer 🎭',
    'Same in Lab 2! Glad someone spoke up with the mask option so we do not get targeted for feedback.',
    9,
    now() - interval '45 minutes'
  ),
  (
    'c-3',
    'post-2',
    'student-aarav-system',
    'Aarav Patel',
    'aarav.p@itm.ac.in',
    false,
    'Aarav Patel',
    'Yes! Also practice the Booth multiplication numerical with negative multiplicand. That was in the sample paper.',
    12,
    now() - interval '3 hours'
  )
ON CONFLICT (id) DO NOTHING;
