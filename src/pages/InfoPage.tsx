import { useEffect, useState, type ReactNode } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { createSupportTicket } from "@/services/adminOperationsService";
import { setPageMeta } from "@/lib/pageMeta";
import infoPages from "@/content/infoPages.json";
import guides from "@/content/guides.json";

export const INFO_PAGES = infoPages as Record<"about" | "privacy" | "terms" | "guidelines", { title: string; description: string; body: string }>;

export type InfoSlug = keyof typeof INFO_PAGES;

type ArticlePage = { title: string; description: string; body: string };

export const GUIDES = guides as Record<string, ArticlePage>;

export function InfoPage({ slug }: { slug: InfoSlug }) {
  return <Article page={INFO_PAGES[slug]} path={`/${slug}`} />;
}

/** Exam-technique articles at /guides/:guideSlug (content in src/content/guides.json). */
export function GuidePage() {
  const { guideSlug = "" } = useParams();
  const page = GUIDES[guideSlug];
  if (!page) return <Navigate to="/exam-plan" replace />;
  const others = Object.entries(GUIDES).filter(([slug]) => slug !== guideSlug);
  return (
    <Article
      page={page}
      path={`/guides/${guideSlug}`}
      eyebrow={
        <Link to="/exam-plan" className="text-sm text-muted-foreground hover:text-foreground">
          Exam plan · Exam technique
        </Link>
      }
      footer={
        others.length > 0 && (
          <div className="mt-12 border-t border-border pt-6">
            <p className="text-sm text-muted-foreground">Also read</p>
            <ul className="mt-2 space-y-1">
              {others.map(([slug, g]) => (
                <li key={slug}>
                  <Link to={`/guides/${slug}`} className="text-[17px] text-foreground underline decoration-border underline-offset-4 hover:decoration-primary">
                    {g.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )
      }
    />
  );
}

function Article({ page, path, eyebrow, footer }: { page: ArticlePage; path: string; eyebrow?: ReactNode; footer?: ReactNode }) {
  useEffect(() => {
    setPageMeta({ title: `${page.title} | CampusLoop`, description: page.description, path });
    window.scrollTo(0, 0);
  }, [page, path]);

  return (
    <article className="mx-auto max-w-[44rem] px-5 pb-8 pt-14 sm:px-8">
      {eyebrow && <div className="mb-3">{eyebrow}</div>}
      <h1 className="text-4xl font-medium leading-tight text-foreground sm:text-5xl">{page.title}</h1>
      <div className="reader-prose mt-8" style={{ fontSize: "17px" }}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            a: ({ href, children }) =>
              href?.startsWith("/") ? <Link to={href}>{children}</Link> : <a href={href} target="_blank" rel="noreferrer">{children}</a>,
            h2: ({ children }) => <h2 className="reader-heading">{children}</h2>,
            table: ({ children }) => (
              <div className="reader-table">
                <table>{children}</table>
              </div>
            ),
          }}
        >
          {page.body}
        </ReactMarkdown>
      </div>
      {footer}
    </article>
  );
}

export function ContactPage() {
  const { user, profile } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("Question");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    setPageMeta({ title: "Contact | CampusLoop", description: "Questions, missing notes, corrections or takedown requests: send CampusLoop a message.", path: "/contact" });
  }, []);
  useEffect(() => {
    if (user?.email) setEmail(user.email);
    if (profile?.display_name) setName(profile.display_name);
  }, [user, profile]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim().length < 10) {
      toast.error("Please write at least a sentence so we can help.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Please enter a valid email so we can reply.");
      return;
    }
    setSending(true);
    try {
      await createSupportTicket(message.trim(), `Contact: ${topic}`, email.trim(), name.trim() || undefined, user?.id);
      setSent(true);
    } catch {
      toast.error("Your message couldn't be sent. Please try again in a moment.");
    } finally {
      setSending(false);
    }
  };

  const field = "w-full rounded-lg border border-border bg-card px-3.5 py-2.5 text-[15px] text-foreground placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none";

  return (
    <section className="mx-auto max-w-[40rem] px-5 pb-8 pt-14 sm:px-8">
      <h1 className="text-4xl font-medium leading-tight text-foreground sm:text-5xl">Contact</h1>
      <p className="mt-4 text-[17px] leading-relaxed text-muted-foreground">
        Missing notes, a mistake in a document, a feature idea, or a takedown request from an author: send it here and we'll reply by email.
      </p>

      {sent ? (
        <div className="surface-card mt-10 p-6">
          <p className="text-lg font-semibold text-foreground">Message sent.</p>
          <p className="mt-2 text-muted-foreground">Thanks. We usually reply within two days, to {email}.</p>
          <Link to="/library" className="mt-5 inline-block text-sm font-medium text-primary hover:underline underline-offset-4">
            Back to the Library
          </Link>
        </div>
      ) : (
        <form onSubmit={submit} className="mt-10 space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-foreground">Name</span>
              <input className={field} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-foreground">Email</span>
              <input className={field} type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
            </label>
          </div>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-foreground">Topic</span>
            <select className={field} value={topic} onChange={(e) => setTopic(e.target.value)}>
              {["Question", "Missing notes", "Mistake in a document", "Feature idea", "Takedown request", "Account or privacy"].map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-foreground">Message</span>
            <textarea className={`${field} min-h-[10rem] resize-y`} required value={message} onChange={(e) => setMessage(e.target.value)} />
          </label>
          <button
            type="submit"
            disabled={sending}
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background hover:bg-primary hover:text-primary-foreground transition-colors disabled:opacity-60 cursor-pointer"
          >
            {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            Send message
          </button>
          <p className="text-xs text-muted-foreground">
            We use your email only to reply. See the <Link to="/privacy" className="underline underline-offset-2">privacy policy</Link>.
          </p>
        </form>
      )}
    </section>
  );
}
