import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export function useTrackImpView(subjectId: string, subjectName: string) {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    // Fire-and-forget — don't block the UI
    (supabase as any)
      .from("imp_question_views")
      .insert({ user_id: user.id, subject_id: subjectId, subject_name: subjectName })
      .then(() => {}); // silently ignore errors
  }, [user, subjectId, subjectName]);
}
