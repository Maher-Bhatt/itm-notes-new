-- Remove any leftover bootstrap for the wrong email
DELETE FROM public.user_roles
WHERE user_id IN (SELECT id FROM auth.users WHERE email = 'your-maherbhatt01@gmail.com')
  AND role = 'admin';

-- Promote the correct email to admin (works whether the user already exists or signs up later via the trigger ... wait, trigger only adds 'user'. So we promote on existing only here.)
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role
FROM auth.users
WHERE email = 'maherbhatt01@gmail.com'
ON CONFLICT (user_id, role) DO NOTHING;

-- Also create a one-time trigger-friendly bootstrap: any future signup with this exact email gets admin
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)))
  ON CONFLICT (user_id) DO NOTHING;

  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user')
  ON CONFLICT (user_id, role) DO NOTHING;

  -- Bootstrap: auto-admin for the project owner email
  IF NEW.email = 'maherbhatt01@gmail.com' THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;

  RETURN NEW;
END;
$$;