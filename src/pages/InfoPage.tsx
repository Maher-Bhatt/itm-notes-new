import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { createSupportTicket } from "@/services/adminOperationsService";
import { setPageMeta } from "@/lib/pageMeta";

const UPDATED = "14 November 2026";

export const INFO_PAGES = {
  about: {
    title: "About CampusLoop",
    description: "CampusLoop is a free study platform built by B.Tech students: course notes in a focused reader, exam practice and a coding lab.",
    body: `
CampusLoop started as a shared folder of notes between classmates at ITM (SLS) Baroda University. Before every exam the same problem came back: the material existed, but it was scattered across WhatsApp groups, PDFs that were hard to read on a phone, and slides with three words per page.

**CampusLoop puts all of it in one calm place.** Every study guide, lecture note, slide deck and handwritten page for the semester is converted into clean text you can read on any device, with your place saved.

## What we believe

- **Studying should be free.** The Library is free to read without an account, and always will be.
- **Less, but better.** One good reader beats ten half-built features.
- **Honest numbers only.** Every count on this site is calculated from the real content.
- **Your data stays yours.** No advertising trackers, no selling data. See the [privacy policy](/privacy).

## What's here

- **Library**: complete study guides that teach each unit from zero, plus the original lecture notes, slides, tutorials and papers, organised by unit.
- **Exam practice** (free account): quizzes, timed mock papers and solved question banks.
- **Coding lab** (free account): lab practicals with expected outputs and viva questions.
- **Campus** (free account): a feed, clubs and messages for your university.

## Who makes it

CampusLoop is built and maintained by students. Course material belongs to its original authors and is shared to help students study. If you are an author and want something changed or removed, please [contact us](/contact) and we will act on it quickly.
`,
  },
  privacy: {
    title: "Privacy policy",
    description: "What CampusLoop collects, why, where it is stored, and how to delete it.",
    body: `
*Last updated ${UPDATED}*

This policy explains what CampusLoop ("we") collects when you use the website and Android app, why, and what you can do about it. We keep it short and specific.

## Reading without an account

You can read the Library without signing in. In that case we do not ask for or store anything about you on our servers. Your reading position, text-size preference and personal notes are saved **only in your browser** (local storage) and never leave your device.

## If you create an account

We store, in our database:

| Data | Why |
|---|---|
| Email address and password (the password is hashed by our authentication provider) | To sign you in |
| Profile details you choose to add: name, university, branch, semester, enrolment number, bio, profile photo, goals | To personalise the app and show your profile to other students |
| Posts, comments, likes, saved posts, club memberships, event RSVPs, follows and friend connections | To run the campus community features |
| Direct messages | To deliver them to the person you message |
| Study progress, quiz results and achievements | To show your progress and streaks |
| Support requests you send | To answer them |
| Push notification subscription (only if you allow notifications) | To send you notifications |

## Collected automatically

- **Error reports**: if the app crashes, we record the page, the error message, your browser type and screen size so we can fix it. If you are signed in, the report is linked to your account.
- **Searches with no results**: the search text only (not who searched), so we know what notes are missing.

We do **not** use advertising, analytics or tracking cookies, and we do not sell or share your data for marketing. Because we only use storage that is strictly necessary for the site to work, we do not show a cookie banner.

## Service providers

- **Supabase**: database, authentication and file storage.
- **Vercel**: hosting the website.
- **Google Fonts**: the fonts used on the site are loaded from Google, which receives your IP address when it serves them.

## Who can see what

Your profile, posts and comments are visible to other signed-in students. Direct messages are visible to you and the person you message. Administrators can access data when needed to keep the service safe (for example, to handle a report).

## Your choices

- **Edit** your profile at any time from your profile page.
- **Export or delete** your data from the profile page, or ask us through the [contact page](/contact). We delete account data within 30 days of a request.
- **Clear local data** (reading position, notes) by clearing this site's data in your browser.

## Children

CampusLoop is meant for college students. Do not create an account if you are under 13.

## Changes

If we change this policy we will update the date above, and for significant changes we will tell signed-in users in the app.

## Contact

Questions about privacy: use the [contact page](/contact).
`,
  },
  terms: {
    title: "Terms of use",
    description: "The rules for using CampusLoop.",
    body: `
*Last updated ${UPDATED}*

By using CampusLoop you agree to these terms. If you don't agree, please don't use the service.

## The service

CampusLoop provides study material, exam-practice tools, a coding lab and community features for students. The Library is free to read without an account; other features need a free account. We may change or discontinue features at any time.

## Study material

- Material is provided to help you study. We work to keep it accurate, but **it is not official** and may contain mistakes. Always check your official syllabus and your faculty's instructions.
- Course material belongs to its respective authors. Use it for your own study; don't republish or sell it.
- If you are the author of material on CampusLoop and want it changed or removed, [contact us](/contact).

## Your account

- Give accurate information and keep your password safe. You are responsible for activity on your account.
- One person per account. Don't impersonate anyone.

## What you post

- You keep ownership of what you post, and you give us permission to display it on CampusLoop.
- Follow the [community guidelines](/guidelines). We may remove content or suspend accounts that break them.
- Don't post copyrighted material you don't have permission to share, or other people's personal information.

## Acceptable use

Don't try to break, overload or scrape the service, access other people's accounts, or use CampusLoop to cheat in an exam or assessment.

## No warranty

CampusLoop is provided "as is", without warranties. To the extent the law allows, we are not liable for losses arising from using it, including exam results.

## Changes

We may update these terms. The date above shows the latest version. Continuing to use CampusLoop after a change means you accept it.
`,
  },
  guidelines: {
    title: "Community guidelines",
    description: "How to keep CampusLoop's community helpful and respectful.",
    body: `
CampusLoop's community is for helping each other learn. These guidelines apply to posts, comments, messages and profiles.

## Do

- **Be kind.** Disagree with ideas, not people.
- **Be useful.** Share explanations, sources and worked answers, not just "same doubt".
- **Search first.** Your question may already be answered in the [Library](/library).
- **Credit others** when you share their notes or work.

## Don't

- Harass, bully, threaten or discriminate against anyone.
- Share other people's personal information, photos or messages without consent.
- Post exam papers before an exam, or help anyone cheat during one.
- Spam, advertise or post the same thing repeatedly.
- Upload copyrighted material you don't have permission to share.
- Post sexual, violent or illegal content.

## Reporting

Use the report option on any post or comment, or reach us through the [contact page](/contact). Moderators review reports and may remove content, issue a warning or suspend an account. Serious or repeated violations lead to a permanent ban.
`,
  },
} as const;

export type InfoSlug = keyof typeof INFO_PAGES;

export function InfoPage({ slug }: { slug: InfoSlug }) {
  const page = INFO_PAGES[slug];
  useEffect(() => {
    setPageMeta({ title: `${page.title} | CampusLoop`, description: page.description, path: `/${slug}` });
    window.scrollTo(0, 0);
  }, [page, slug]);

  return (
    <article className="mx-auto max-w-[44rem] px-5 pb-8 pt-14 sm:px-8">
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
