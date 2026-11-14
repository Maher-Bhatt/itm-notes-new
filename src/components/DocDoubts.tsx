import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Flag, Loader2, MessageCircleQuestion, Reply, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { deleteDoubt, fetchDoubts, postDoubt, reportDoubt, type Doubt } from "@/services/doubtService";

function timeAgo(iso: string) {
  const s = Math.max(1, Math.round((Date.now() - new Date(iso).getTime()) / 1000));
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.round(s / 60)} min ago`;
  if (s < 86400) return `${Math.round(s / 3600)} h ago`;
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

/**
 * Questions and answers attached to one Library document.
 * Hidden entirely until the `doc_doubts` table exists (migration 20261114000009).
 */
export function DocDoubts({
  docKey,
  docTitle,
  section,
}: {
  docKey: string;
  docTitle: string;
  section?: { id: string; title: string } | null;
}) {
  const { user, profile } = useAuth();
  const [available, setAvailable] = useState<boolean | null>(null);
  const [items, setItems] = useState<Doubt[]>([]);
  const [body, setBody] = useState("");
  const [tagSection, setTagSection] = useState(true);
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyBody, setReplyBody] = useState("");
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    try {
      const res = await fetchDoubts(docKey);
      setAvailable(res.available);
      setItems(res.items);
    } catch {
      setAvailable(true);
      setItems([]);
    }
  }, [docKey]);

  useEffect(() => {
    load();
  }, [load]);

  const threads = useMemo(() => {
    const roots = items.filter((d) => !d.parent_id).reverse(); // newest questions first
    return roots.map((q) => ({ q, replies: items.filter((r) => r.parent_id === q.id) }));
  }, [items]);

  if (!available) return null;

  const name = profile?.display_name || user?.email?.split("@")[0] || "Student";

  const submit = async (parentId: string | null) => {
    if (!user) return;
    const text = (parentId ? replyBody : body).trim();
    if (text.length < 3) {
      toast.error("Write a little more so others can help.");
      return;
    }
    setBusy(true);
    try {
      const created = await postDoubt({
        docKey,
        userId: user.id,
        authorName: name,
        body: text,
        parentId,
        sectionId: !parentId && tagSection && section ? section.id : null,
        sectionTitle: !parentId && tagSection && section ? section.title : null,
      });
      setItems((prev) => [...prev, created]);
      if (parentId) {
        setReplyBody("");
        setReplyTo(null);
      } else {
        setBody("");
      }
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not post. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const remove = async (d: Doubt) => {
    if (!confirm("Delete this post?")) return;
    try {
      await deleteDoubt(d.id);
      setItems((prev) => prev.filter((x) => x.id !== d.id && x.parent_id !== d.id));
    } catch {
      toast.error("Could not delete it. Please try again.");
    }
  };

  const report = async (d: Doubt) => {
    const reason = prompt("Why are you reporting this? (spam, abuse, wrong information…)");
    if (!reason) return;
    try {
      await reportDoubt(d, { id: user?.id, name, email: user?.email ?? undefined }, reason);
      toast.success("Reported. A moderator will review it.");
    } catch {
      toast.error("Could not send the report. Please try again.");
    }
  };

  const Post = ({ d, isReply }: { d: Doubt; isReply?: boolean }) => (
    <div className={isReply ? "border-l-2 border-border pl-4" : ""}>
      <div className="flex items-baseline justify-between gap-3 text-xs text-muted-foreground">
        <span>
          <span className="font-semibold text-foreground">{d.author_name}</span> · {timeAgo(d.created_at)}
          {d.section_title && !isReply && (
            <>
              {" · "}
              <a href={`#${d.section_id}`} className="text-primary hover:underline">
                {d.section_title}
              </a>
            </>
          )}
        </span>
        <span className="flex shrink-0 items-center gap-1">
          {user && user.id === d.user_id ? (
            <button type="button" onClick={() => remove(d)} className="rounded p-1 hover:bg-secondary hover:text-foreground cursor-pointer" aria-label="Delete">
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          ) : user ? (
            <button type="button" onClick={() => report(d)} className="rounded p-1 hover:bg-secondary hover:text-foreground cursor-pointer" aria-label="Report">
              <Flag className="h-3.5 w-3.5" />
            </button>
          ) : null}
        </span>
      </div>
      <p className="mt-1.5 whitespace-pre-line font-sans text-[15px] leading-relaxed text-foreground">{d.body}</p>
    </div>
  );

  return (
    <section aria-labelledby="doubts-heading" className="mt-14 border-t border-border pt-8 font-sans">
      <h2 id="doubts-heading" className="flex items-center gap-2 text-2xl font-medium text-foreground">
        <MessageCircleQuestion className="h-5 w-5 text-primary" /> Doubts {threads.length > 0 && <span className="text-base text-muted-foreground">({threads.length})</span>}
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">Ask about anything in “{docTitle}”. Classmates and seniors answer here.</p>

      {user ? (
        <div className="surface-card mt-5 p-4">
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={3}
            placeholder="What's confusing? Mention the example or step number if you can."
            className="w-full resize-y bg-transparent text-[15px] text-foreground placeholder:text-muted-foreground focus:outline-none"
            aria-label="Your doubt"
          />
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            {section ? (
              <label className="flex items-center gap-2 text-xs text-muted-foreground">
                <input type="checkbox" checked={tagSection} onChange={(e) => setTagSection(e.target.checked)} />
                About “{section.title.slice(0, 50)}”
              </label>
            ) : (
              <span />
            )}
            <button
              type="button"
              disabled={busy}
              onClick={() => submit(null)}
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background hover:bg-primary hover:text-primary-foreground transition-colors disabled:opacity-60 cursor-pointer"
            >
              {busy && <Loader2 className="h-4 w-4 animate-spin" />} Post doubt
            </button>
          </div>
        </div>
      ) : (
        <p className="mt-5 rounded-lg border border-border bg-secondary/50 px-4 py-3 text-sm text-muted-foreground">
          <Link to="/auth" state={{ from: window.location.pathname }} className="font-medium text-primary hover:underline">
            Sign in
          </Link>{" "}
          to ask a doubt or answer one.
        </p>
      )}

      <ul className="mt-6 space-y-5">
        {threads.length === 0 && <li className="text-sm text-muted-foreground">No doubts yet. Be the first to ask.</li>}
        {threads.map(({ q, replies }) => (
          <li key={q.id} className="surface-card space-y-4 p-4">
            <Post d={q} />
            {replies.map((r) => (
              <Post key={r.id} d={r} isReply />
            ))}
            {user &&
              (replyTo === q.id ? (
                <div className="border-l-2 border-primary/40 pl-4">
                  <textarea
                    value={replyBody}
                    onChange={(e) => setReplyBody(e.target.value)}
                    rows={2}
                    autoFocus
                    placeholder="Write an answer"
                    className="w-full resize-y rounded-md border border-border bg-background px-3 py-2 text-[15px] text-foreground focus:border-primary/50 focus:outline-none"
                  />
                  <div className="mt-2 flex gap-2">
                    <button type="button" disabled={busy} onClick={() => submit(q.id)} className="rounded-full bg-foreground px-3.5 py-1.5 text-xs font-medium text-background hover:bg-primary cursor-pointer">
                      Reply
                    </button>
                    <button type="button" onClick={() => setReplyTo(null)} className="rounded-full px-3.5 py-1.5 text-xs text-muted-foreground hover:bg-secondary cursor-pointer">
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button type="button" onClick={() => { setReplyTo(q.id); setReplyBody(""); }} className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline cursor-pointer">
                  <Reply className="h-3.5 w-3.5" /> Answer
                </button>
              ))}
          </li>
        ))}
      </ul>
    </section>
  );
}
