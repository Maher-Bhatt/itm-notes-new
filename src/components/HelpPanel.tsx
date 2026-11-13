import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, FileText, HelpCircle, Loader2, Send, X } from "lucide-react";
import { toast } from "sonner";
import { LIBRARY } from "@/data/libraryIndex";
import { searchTopics } from "@/data/subjects";
import { useAuth } from "@/contexts/AuthContext";
import { createSupportTicket } from "@/services/adminOperationsService";

/**
 * Floating help panel.
 * 1. Type a question → instant matches from the Semester 3 library and topic notes (runs locally).
 * 2. Nothing useful? Send it to the support desk; the result shown is the real outcome of the request.
 */
export function HelpPanel({ onClose }: { onClose: () => void }) {
  const { user, profile } = useAuth();
  const [q, setQ] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (query.length < 2) return { docs: [], topics: [] };
    const terms = query.split(/\s+/).filter((t) => t.length > 1);
    const docs = LIBRARY.flatMap((s) =>
      s.docs
        .filter((d) => {
          const hay = `${d.title} ${d.kind} ${s.short} ${s.name} ${d.summary}`.toLowerCase();
          return terms.every((t) => hay.includes(t));
        })
        .map((d) => ({ s, d }))
    ).slice(0, 4);
    const topics = searchTopics(terms[0] ?? query)
      .filter(({ topic }) => terms.every((t) => `${topic.title} ${topic.simpleExplanation}`.toLowerCase().includes(t)))
      .slice(0, 4);
    return { docs, topics };
  }, [q]);

  const send = async () => {
    const message = q.trim();
    if (message.length < 5) {
      toast.error("Please describe what you need in a few words.");
      return;
    }
    setSending(true);
    try {
      await createSupportTicket(message, "Help panel request", user?.email || undefined, profile?.display_name || undefined, user?.id);
      toast.success("Sent to the support desk. Replies appear in your inbox.");
      setQ("");
      onClose();
    } catch {
      toast.error("Couldn't reach the support desk. Check your connection and try again.");
    } finally {
      setSending(false);
    }
  };

  const hasResults = results.docs.length > 0 || results.topics.length > 0;

  return (
    <div className="surface-card absolute bottom-16 right-0 w-[min(92vw,24rem)] p-4 scale-in">
      <div className="flex items-start justify-between gap-3 border-b border-border pb-3">
        <div>
          <h4 className="text-sm font-semibold text-foreground">Help</h4>
          <p className="text-xs text-muted-foreground">Search your notes, or ask the support desk.</p>
        </div>
        <button type="button" onClick={onClose} className="rounded-md p-1 text-muted-foreground hover:bg-secondary hover:text-foreground cursor-pointer" aria-label="Close help">
          <X className="h-4 w-4" />
        </button>
      </div>

      <textarea
        autoFocus
        value={q}
        onChange={(e) => setQ(e.target.value)}
        rows={2}
        placeholder="e.g. normalization, tower of hanoi, missing CONMP unit 3 notes"
        className="mt-3 w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none"
      />

      <div className="mt-3 max-h-64 space-y-3 overflow-y-auto">
        {q.trim().length >= 2 && !hasResults && (
          <p className="text-xs text-muted-foreground">No notes match yet. Send it to the support desk below.</p>
        )}
        {results.docs.length > 0 && (
          <div>
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Library</p>
            {results.docs.map(({ s, d }) => (
              <Link
                key={`${s.slug}/${d.slug}`}
                to={`/library/${s.slug}/${d.slug}`}
                onClick={onClose}
                className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm hover:bg-secondary"
              >
                <BookOpen className="h-4 w-4 shrink-0 text-primary" />
                <span className="min-w-0 truncate text-foreground">
                  {s.short}: {d.title}
                </span>
              </Link>
            ))}
          </div>
        )}
        {results.topics.length > 0 && (
          <div>
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Topics</p>
            {results.topics.map(({ subject, topic }) => (
              <Link
                key={`${subject.id}/${topic.id}`}
                to={`/subject/${subject.id}/topic/${topic.id}`}
                onClick={onClose}
                className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm hover:bg-secondary"
              >
                <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
                <span className="min-w-0 truncate text-foreground">{topic.title}</span>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between gap-2 border-t border-border pt-3">
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <HelpCircle className="h-3.5 w-3.5" /> Still stuck?
        </span>
        <button
          type="button"
          onClick={send}
          disabled={sending || !user}
          title={user ? "Send to support desk" : "Sign in to contact support"}
          className="inline-flex items-center gap-1.5 rounded-lg bg-foreground px-3 py-1.5 text-xs font-medium text-background hover:bg-primary hover:text-primary-foreground transition-colors disabled:opacity-50 cursor-pointer"
        >
          {sending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
          Send to support
        </button>
      </div>
    </div>
  );
}
