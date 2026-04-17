import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { subjects } from "@/data/subjects";
import { Loader2, BookOpen, Award, Download, Bookmark } from "lucide-react";

interface Details {
  completed_topics: string[];
  quizzes_taken: number;
  avg_quiz_score: number;
  downloads: number;
  bookmarks: number;
}

interface Props {
  userId: string | null;
  email: string | null;
  onOpenChange: (open: boolean) => void;
}

export function UserDetailsDialog({ userId, email, onOpenChange }: Props) {
  const [data, setData] = useState<Details | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    setErr(null);
    setData(null);
    (supabase as any)
      .rpc("admin_user_details", { _user_id: userId })
      .then(({ data, error }: { data: Details | null; error: { message?: string } | null }) => {
        if (error) setErr(error.message ?? "Couldn't load user details");
        else setData(data);
        setLoading(false);
      });
  }, [userId]);

  // Map completed topic IDs → subjects studied
  const subjectsStudied = (() => {
    if (!data) return [];
    const ids = new Set(data.completed_topics);
    const map = new Map<string, number>();
    for (const subj of subjects) {
      let n = 0;
      for (const u of subj.units) for (const t of u.topics) if (ids.has(t.id)) n++;
      if (n > 0) map.set(subj.name, n);
    }
    return Array.from(map.entries());
  })();

  return (
    <Dialog open={!!userId} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-semibold">User details</DialogTitle>
          <DialogDescription className="truncate">{email}</DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="py-10 flex justify-center"><Loader2 className="h-5 w-5 animate-spin text-muted-foreground" /></div>
        ) : err ? (
          <div className="py-8 text-center text-sm text-destructive">{err}</div>
        ) : data ? (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-3">
              <Stat icon={BookOpen} label="Topics completed" value={data.completed_topics.length} />
              <Stat icon={Award}    label="Quizzes taken"   value={data.quizzes_taken} />
              <Stat icon={Award}    label="Avg quiz score"  value={`${data.avg_quiz_score}%`} />
              <Stat icon={Download} label="Downloads"       value={data.downloads} />
              <Stat icon={Bookmark} label="Bookmarks"       value={data.bookmarks} />
            </div>

            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Subjects studied
              </h4>
              {subjectsStudied.length === 0 ? (
                <p className="text-xs text-muted-foreground">No completed topics yet.</p>
              ) : (
                <div className="space-y-1.5">
                  {subjectsStudied.map(([name, n]) => (
                    <div key={name} className="flex items-center justify-between text-sm">
                      <span>{name}</span>
                      <span className="text-muted-foreground tabular-nums text-xs">{n} topic{n === 1 ? "" : "s"}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

function Stat({ icon: Icon, label, value }: { icon: typeof BookOpen; label: string; value: string | number }) {
  return (
    <div className="surface-elevated rounded p-3">
      <div className="flex items-center gap-1.5 mb-1">
        <Icon className="h-3 w-3 text-muted-foreground" />
        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</span>
      </div>
      <div className="text-lg font-bold tabular-nums">{value}</div>
    </div>
  );
}
