-- Allow everyone (including guests) to browse the materials list.
-- Downloads still require authentication (record_material_download RPC checks auth.uid()).
-- Storage bucket remains private; signed URLs are issued server-side only for authed users.

DROP POLICY IF EXISTS "Materials viewable by authenticated" ON public.materials;

CREATE POLICY "Materials viewable by everyone"
ON public.materials
FOR SELECT
TO anon, authenticated
USING (true);