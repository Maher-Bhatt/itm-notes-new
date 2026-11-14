-- Doubt threads attached to Library documents (and optionally a section of a document).
-- Readable by everyone (the Library is public); posting requires sign-in.

CREATE TABLE IF NOT EXISTS public.doc_doubts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  doc_key text NOT NULL CHECK (char_length(doc_key) BETWEEN 3 AND 200),         -- "<subject>/<doc>"
  section_id text CHECK (section_id IS NULL OR char_length(section_id) <= 200),
  section_title text CHECK (section_title IS NULL OR char_length(section_title) <= 300),
  parent_id uuid REFERENCES public.doc_doubts(id) ON DELETE CASCADE,            -- NULL = a question, else a reply
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  author_name text NOT NULL CHECK (char_length(author_name) BETWEEN 1 AND 80),
  body text NOT NULL CHECK (char_length(body) BETWEEN 3 AND 4000),
  status text NOT NULL DEFAULT 'visible' CHECK (status IN ('visible', 'hidden')),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS doc_doubts_doc_idx ON public.doc_doubts (doc_key, created_at DESC);
CREATE INDEX IF NOT EXISTS doc_doubts_parent_idx ON public.doc_doubts (parent_id);
CREATE INDEX IF NOT EXISTS doc_doubts_user_idx ON public.doc_doubts (user_id, created_at DESC);

ALTER TABLE public.doc_doubts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Read visible doubts" ON public.doc_doubts;
CREATE POLICY "Read visible doubts" ON public.doc_doubts FOR SELECT
  USING (status = 'visible' OR user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Post own doubts" ON public.doc_doubts;
CREATE POLICY "Post own doubts" ON public.doc_doubts FOR INSERT
  WITH CHECK (auth.uid() = user_id AND status = 'visible');

DROP POLICY IF EXISTS "Authors and admins update doubts" ON public.doc_doubts;
CREATE POLICY "Authors and admins update doubts" ON public.doc_doubts FOR UPDATE
  USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Authors and admins delete doubts" ON public.doc_doubts;
CREATE POLICY "Authors and admins delete doubts" ON public.doc_doubts FOR DELETE
  USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));

-- Rate limit: at most 10 doubts/replies per user per 10 minutes.
CREATE OR REPLACE FUNCTION public.doc_doubts_rate_limit()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF (SELECT count(*) FROM public.doc_doubts
      WHERE user_id = NEW.user_id AND created_at > now() - interval '10 minutes') >= 10 THEN
    RAISE EXCEPTION 'You are posting too fast. Please wait a few minutes.' USING ERRCODE = 'P0001';
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS doc_doubts_rate_limit ON public.doc_doubts;
CREATE TRIGGER doc_doubts_rate_limit BEFORE INSERT ON public.doc_doubts
  FOR EACH ROW EXECUTE FUNCTION public.doc_doubts_rate_limit();

GRANT SELECT ON public.doc_doubts TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.doc_doubts TO authenticated;
