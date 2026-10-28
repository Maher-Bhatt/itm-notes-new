-- =============================================================================
-- MIGRATION: 20261028000007_friend_requests_and_multi_university.sql
-- Description: Real Friend Requests, Student Connections, Direct Messages,
--              and Multi-University Profiles with Row Level Security (RLS)
-- =============================================================================

-- 1. EXTEND PROFILES TABLE WITH UNIVERSITY & ACADEMIC ATTRIBUTES
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'university') THEN
    ALTER TABLE public.profiles ADD COLUMN university TEXT NOT NULL DEFAULT 'itm-baroda';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'department') THEN
    ALTER TABLE public.profiles ADD COLUMN department TEXT NOT NULL DEFAULT 'Computer Science & Engineering';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'division') THEN
    ALTER TABLE public.profiles ADD COLUMN division TEXT NOT NULL DEFAULT 'Div A';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'enrollment_no') THEN
    ALTER TABLE public.profiles ADD COLUMN enrollment_no TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'friends_count') THEN
    ALTER TABLE public.profiles ADD COLUMN friends_count INTEGER NOT NULL DEFAULT 0;
  END IF;
END $$;

-- 2. EXTEND COMMUNITY POSTS TABLE WITH UNIVERSITY SCOPE
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'community_posts' AND column_name = 'university_id') THEN
    ALTER TABLE public.community_posts ADD COLUMN university_id TEXT NOT NULL DEFAULT 'all';
  END IF;
END $$;

-- 3. FRIEND REQUESTS TABLE (Real two-sided friend workflow)
CREATE TABLE IF NOT EXISTS public.friend_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  receiver_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined', 'cancelled')),
  message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(sender_id, receiver_id),
  CONSTRAINT no_self_friend_request CHECK (sender_id != receiver_id)
);

ALTER TABLE public.friend_requests ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can view their sent or received friend requests' AND tablename = 'friend_requests') THEN
    CREATE POLICY "Users can view their sent or received friend requests" ON public.friend_requests
      FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = receiver_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Authenticated users can send friend requests' AND tablename = 'friend_requests') THEN
    CREATE POLICY "Authenticated users can send friend requests" ON public.friend_requests
      FOR INSERT WITH CHECK (auth.uid() = sender_id AND auth.role() = 'authenticated');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Participants can update friend request status' AND tablename = 'friend_requests') THEN
    CREATE POLICY "Participants can update friend request status" ON public.friend_requests
      FOR UPDATE USING (auth.uid() = sender_id OR auth.uid() = receiver_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Senders can delete pending friend requests' AND tablename = 'friend_requests') THEN
    CREATE POLICY "Senders can delete pending friend requests" ON public.friend_requests
      FOR DELETE USING (auth.uid() = sender_id);
  END IF;
END $$;

-- Indexing for high-performance requests lookup
CREATE INDEX IF NOT EXISTS idx_friend_requests_receiver ON public.friend_requests(receiver_id, status);
CREATE INDEX IF NOT EXISTS idx_friend_requests_sender ON public.friend_requests(sender_id, status);

-- 4. MUTUAL STUDENT CONNECTIONS TABLE (Established friendships)
CREATE TABLE IF NOT EXISTS public.student_connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user1_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  user2_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  request_id UUID REFERENCES public.friend_requests(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user1_id, user2_id),
  CONSTRAINT no_self_connection CHECK (user1_id != user2_id)
);

ALTER TABLE public.student_connections ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can view their own student connections' AND tablename = 'student_connections') THEN
    CREATE POLICY "Users can view their own student connections" ON public.student_connections
      FOR SELECT USING (auth.uid() = user1_id OR auth.uid() = user2_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can create connections when accepted' AND tablename = 'student_connections') THEN
    CREATE POLICY "Users can create connections when accepted" ON public.student_connections
      FOR INSERT WITH CHECK (auth.uid() = user1_id OR auth.uid() = user2_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can remove their own connections' AND tablename = 'student_connections') THEN
    CREATE POLICY "Users can remove their own connections" ON public.student_connections
      FOR DELETE USING (auth.uid() = user1_id OR auth.uid() = user2_id);
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_student_connections_user1 ON public.student_connections(user1_id);
CREATE INDEX IF NOT EXISTS idx_student_connections_user2 ON public.student_connections(user2_id);

-- 5. REAL DIRECT MESSAGES TABLE (Mutual chatting)
CREATE TABLE IF NOT EXISTS public.direct_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  receiver_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT no_empty_message CHECK (length(trim(content)) > 0)
);

ALTER TABLE public.direct_messages ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can view messages they sent or received' AND tablename = 'direct_messages') THEN
    CREATE POLICY "Users can view messages they sent or received" ON public.direct_messages
      FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = receiver_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Authenticated users can send messages' AND tablename = 'direct_messages') THEN
    CREATE POLICY "Authenticated users can send messages" ON public.direct_messages
      FOR INSERT WITH CHECK (auth.uid() = sender_id AND auth.role() = 'authenticated');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Receivers can mark messages as read' AND tablename = 'direct_messages') THEN
    CREATE POLICY "Receivers can mark messages as read" ON public.direct_messages
      FOR UPDATE USING (auth.uid() = receiver_id);
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_direct_messages_conversation ON public.direct_messages(sender_id, receiver_id, created_at);

-- 6. HELPER FUNCTION TO ACCEPT A FRIEND REQUEST ATOMICALLY
CREATE OR REPLACE FUNCTION public.accept_friend_request(req_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_sender UUID;
  v_receiver UUID;
  v_status TEXT;
  v_u1 UUID;
  v_u2 UUID;
BEGIN
  -- Select request and lock row
  SELECT sender_id, receiver_id, status INTO v_sender, v_receiver, v_status
  FROM public.friend_requests
  WHERE id = req_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RETURN FALSE;
  END IF;

  -- Only receiver can accept
  IF auth.uid() != v_receiver THEN
    RAISE EXCEPTION 'Only the receiver can accept this friend request.';
  END IF;

  IF v_status != 'pending' THEN
    RETURN FALSE;
  END IF;

  -- Update request to accepted
  UPDATE public.friend_requests
  SET status = 'accepted', updated_at = now()
  WHERE id = req_id;

  -- Order IDs to enforce consistency
  IF v_sender < v_receiver THEN
    v_u1 := v_sender;
    v_u2 := v_receiver;
  ELSE
    v_u1 := v_receiver;
    v_u2 := v_sender;
  END IF;

  -- Insert connection
  INSERT INTO public.student_connections (user1_id, user2_id, request_id)
  VALUES (v_u1, v_u2, req_id)
  ON CONFLICT (user1_id, user2_id) DO NOTHING;

  -- Increment friends_count on both profiles
  UPDATE public.profiles SET friends_count = friends_count + 1 WHERE user_id IN (v_sender, v_receiver);

  RETURN TRUE;
END;
$$;
