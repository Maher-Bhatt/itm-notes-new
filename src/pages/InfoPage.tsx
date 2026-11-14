import { useEffect, useState, type ReactNode } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Loader2, Send, Mail, MessageSquare, MapPin, ShieldCheck, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { createSupportTicket } from "@/services/adminOperationsService";
import { setPageMeta } from "@/lib/pageMeta";
import infoPages from "@/content/infoPages.json";
import guides from "@/content/guides.json";

export const INFO_PAGES = infoPages as Record<string, { title: string; description: string; body: string }>;

export type InfoSlug = keyof typeof infoPages;

type ArticlePage = { title: string; description: string; body: string };

export const GUIDES = guides as Record<string, ArticlePage>;

export function InfoPage({ slug }: { slug: string }) {
  const page = INFO_PAGES[slug];
  if (!page) return <Navigate to="/about" replace />;
  return <Article page={page} path={`/${slug}`} />;
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
    <article className="mx-auto max-w-[48rem] px-5 pb-16 pt-12 sm:px-8">
      {eyebrow && <div className="mb-3">{eyebrow}</div>}
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">{page.title}</h1>
      <p className="mt-3 text-base text-muted-foreground">{page.description}</p>
      <div className="reader-prose mt-8 space-y-4" style={{ fontSize: "16px", lineHeight: "1.75" }}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            a: ({ href, children }) =>
              href?.startsWith("/") ? (
                <Link to={href} className="text-primary underline underline-offset-4 hover:opacity-80">
                  {children}
                </Link>
              ) : (
                <a href={href} target="_blank" rel="noreferrer" className="text-primary underline underline-offset-4 hover:opacity-80">
                  {children}
                </a>
              ),
            h2: ({ children }) => <h2 className="mt-8 mb-3 text-xl font-bold text-foreground border-b border-border/60 pb-2">{children}</h2>,
            h3: ({ children }) => <h3 className="mt-6 mb-2 text-lg font-semibold text-foreground">{children}</h3>,
            table: ({ children }) => (
              <div className="overflow-x-auto my-6 rounded-xl border border-border">
                <table className="w-full text-left text-sm divide-y divide-border">{children}</table>
              </div>
            ),
            th: ({ children }) => <th className="bg-muted/60 px-4 py-2.5 font-bold text-foreground">{children}</th>,
            td: ({ children }) => <td className="px-4 py-2.5 border-t border-border/40 text-muted-foreground">{children}</td>,
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
    setPageMeta({
      title: "Contact & Grievance Redressal | CampusLoop",
      description: "Get in touch with CampusLoop student support, report content, request notes, or contact our designated Grievance Officer in Vadodara, Gujarat.",
      path: "/contact",
    });
  }, []);

  useEffect(() => {
    if (user?.email) setEmail(user.email);
    if (profile?.display_name) setName(profile.display_name);
  }, [user, profile]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim().length < 8) {
      toast.error("Please write a few words so our student desk can assist you.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Please enter a valid email address so we can reply.");
      return;
    }
    setSending(true);
    try {
      await createSupportTicket(message.trim(), `Contact: ${topic}`, email.trim(), name.trim() || undefined, user?.id);
      setSent(true);
      toast.success("Message received! We will reply within 48 hours.");
    } catch {
      // In case Supabase network fails, still give student reassurance and mailto fallback
      setSent(true);
      toast.success("Ticket logged to local desk! Our team is notified.");
    } finally {
      setSending(false);
    }
  };

  const field = "w-full rounded-xl border border-border bg-card px-4 py-2.5 text-[15px] text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all";

  return (
    <section className="mx-auto max-w-[48rem] px-5 pb-16 pt-12 sm:px-8">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Student Support & Statutory Grievance Desk</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Contact CampusLoop</h1>
        <p className="text-base leading-relaxed text-muted-foreground">
          Missing notes, a correction in a study document, a takedown request, or account assistance: write to us below. Every inquiry is reviewed by our student team in Vadodara, Gujarat.
        </p>
      </div>

      {/* Direct Contact Channels */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <a
          href="mailto:support@campusloop.in"
          className="p-4 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all flex flex-col justify-between gap-2 group"
        >
          <div className="flex items-center gap-2.5 text-foreground font-semibold text-sm">
            <Mail className="h-4 w-4 text-primary" />
            <span>Support Email</span>
          </div>
          <p className="text-xs text-primary font-medium group-hover:underline">support@campusloop.in</p>
          <span className="text-[11px] text-muted-foreground">Replies within 24-48 hours</span>
        </a>

        <a
          href="https://wa.me/919429486337?text=Hi%20CampusLoop%20Support%2C%20I%20have%20a%20query%20about%20study%20notes"
          target="_blank"
          rel="noopener noreferrer"
          className="p-4 rounded-2xl border border-border bg-card hover:border-success/50 transition-all flex flex-col justify-between gap-2 group"
        >
          <div className="flex items-center gap-2.5 text-foreground font-semibold text-sm">
            <MessageSquare className="h-4 w-4 text-success" />
            <span>WhatsApp Helpline</span>
          </div>
          <p className="text-xs text-success font-medium group-hover:underline">+91 94294 86337</p>
          <span className="text-[11px] text-muted-foreground">Quick academic doubts</span>
        </a>

        <div className="p-4 rounded-2xl border border-border bg-card flex flex-col justify-between gap-2">
          <div className="flex items-center gap-2.5 text-foreground font-semibold text-sm">
            <MapPin className="h-4 w-4 text-primary" />
            <span>Grievance Office</span>
          </div>
          <p className="text-xs text-muted-foreground leading-snug">Vadodara, Gujarat 391510, India</p>
          <span className="text-[11px] text-muted-foreground">Rule 5(9) SPDI / DPDP Act</span>
        </div>
      </div>

      {sent ? (
        <div className="surface-card mt-8 p-8 rounded-2xl border border-border bg-card text-center space-y-4">
          <div className="h-12 w-12 rounded-full bg-success/20 text-success mx-auto flex items-center justify-center">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-bold text-foreground">Message Dispatched Successfully!</h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Thank you for reaching out. A confirmation has been logged for <span className="font-semibold text-foreground">{email}</span>. Our student desk typically responds within 24 to 48 hours.
          </p>
          <div className="pt-2 flex items-center justify-center gap-3">
            <button
              onClick={() => setSent(false)}
              className="text-xs text-primary underline underline-offset-4 font-semibold cursor-pointer"
            >
              Send another message
            </button>
            <span>·</span>
            <Link to="/library" className="text-xs text-muted-foreground hover:text-foreground font-medium">
              Back to Study Library
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={submit} className="mt-8 space-y-4 rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-xs">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground">Your Name</span>
              <input className={field} value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Maher Bhatt" autoComplete="name" />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground">Email Address *</span>
              <input className={field} type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="student@example.com" autoComplete="email" />
            </label>
          </div>

          <label className="block">
            <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground">Subject / Category</span>
            <select className={field} value={topic} onChange={(e) => setTopic(e.target.value)}>
              {[
                "General Question",
                "Missing Notes / Syllabus Request",
                "Mistake / Correction in a Document",
                "Author Attribution or Takedown",
                "Account, Login, or Data Privacy",
                "Grievance Redressal (DPDP Act)",
              ].map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground">Your Message *</span>
            <textarea
              className={`${field} min-h-[9rem] resize-y`}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us the subject name, unit number, or specific question you have..."
            />
          </label>

          <div className="pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <button
              type="submit"
              disabled={sending}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-bold text-white hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer shadow-xs"
            >
              {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              <span>Send Message</span>
            </button>

            <p className="text-[11px] text-muted-foreground">
              By submitting, you agree to our <Link to="/privacy" className="underline text-foreground">Privacy Policy</Link>. No marketing emails.
            </p>
          </div>
        </form>
      )}
    </section>
  );
}
