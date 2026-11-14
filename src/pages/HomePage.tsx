import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, BookOpen, CalendarClock, Code2, Focus, ListChecks, NotebookPen, Search } from "lucide-react";
import { LIBRARY } from "@/data/libraryIndex";
import { SUBJECT_ICONS } from "@/components/LibraryHighlights";
import { DEFAULT_TITLE, setPageMeta } from "@/lib/pageMeta";
import { daysUntilFinals, FINALS_START, minutesFor } from "@/lib/readingProgress";

const DOCS = LIBRARY.flatMap((s) => s.docs.map((d) => ({ s, d })));
const DOC_COUNT = DOCS.length;
const READING_HOURS = Math.round(DOCS.reduce((n, { d }) => n + (d.scanned ? 0 : d.words), 0) / 200 / 60);
const SCANNED_PAGES = DOCS.reduce((n, { d }) => n + (d.scanned ? d.pages ?? 0 : 0), 0);

const FAQ = [
  {
    q: "What is CampusLoop?",
    a: "A free study platform for B.Tech students. Every study guide, lecture note, slide deck and handwritten page for your semester is converted into clean text you can read on any phone or laptop, with progress that's saved for you.",
  },
  {
    q: "Do I need an account?",
    a: "No. The whole Library is free to read without signing in. A free account adds practice quizzes, mock exams, the coding lab, the campus community and progress across devices.",
  },
  {
    q: "Who makes it?",
    a: "CampusLoop is built by students at ITM (SLS) Baroda University. Course material belongs to its original authors; the study guides are written to explain each unit from zero.",
  },
  {
    q: "Which subjects are covered?",
    a: `Semester 3 B.Tech: ${LIBRARY.map((s) => s.name).join(", ")}. More semesters are being added.`,
  },
];

export default function HomePage() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const days = daysUntilFinals();

  useEffect(() => {
    setPageMeta({
      title: DEFAULT_TITLE,
      description: `Free Semester 3 B.Tech study guides, lecture notes, slides and handwritten notes for ${LIBRARY.map((s) => s.short).join(", ")}, readable in a focused reader. Exam practice, mock tests and a coding lab with a free account.`,
      path: "/",
    });
  }, []);

  const results = useMemo(() => {
    const terms = q.trim().toLowerCase().split(/\s+/).filter((t) => t.length > 1);
    if (!terms.length) return [];
    return DOCS.filter(({ s, d }) => {
      const hay = `${d.title} ${d.kind} ${s.short} ${s.name} ${d.summary}`.toLowerCase();
      return terms.every((t) => hay.includes(t));
    }).slice(0, 6);
  }, [q]);

  return (
    <>
      {/* Hero */}
      <section className="mx-auto grid max-w-6xl gap-12 px-5 pb-16 pt-14 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:pt-20">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Free for B.Tech students</p>
          <h1 className="mt-4 text-[2.6rem] font-medium leading-[1.04] text-foreground sm:text-6xl">
            Your semester, <em className="text-primary">in one calm place.</em>
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Study guides, lecture notes, slides and handwritten pages for every Semester 3 subject, rewritten for focused reading. No sign-up needed.
          </p>

          <form
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              if (results[0]) navigate(`/library/${results[0].s.slug}/${results[0].d.slug}`);
              else navigate("/library");
            }}
            className="relative mt-8 max-w-xl"
          >
            <label className="surface-card flex items-center gap-3 rounded-full py-2 pl-5 pr-2 focus-within:border-primary/50">
              <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search a topic, e.g. normalization, recursion, pipelining"
                aria-label="Search the library"
                className="h-10 w-full bg-transparent text-[15px] text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              <button type="submit" className="shrink-0 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                Search
              </button>
            </label>
            {results.length > 0 && (
              <ul className="surface-card absolute inset-x-0 top-full z-20 mt-2 overflow-hidden p-1.5">
                {results.map(({ s, d }) => (
                  <li key={`${s.slug}/${d.slug}`}>
                    <Link to={`/library/${s.slug}/${d.slug}`} className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-secondary">
                      <BookOpen className="h-4 w-4 shrink-0 text-primary" />
                      <span className="min-w-0 flex-1 truncate text-sm text-foreground">{d.title}</span>
                      <span className="shrink-0 text-xs text-muted-foreground">{s.short} · {d.kind}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </form>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link to="/library" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity">
              Open the Library <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/auth" className="inline-flex items-center rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground hover:bg-secondary transition-colors">
              Create a free account
            </Link>
          </div>
        </div>

        {/* Reader preview (real content from the DBMS study guide) */}
        <div aria-hidden className="relative hidden lg:block">
          <div className="surface-card rotate-[1.2deg] p-7">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">DBMS · Study guide · Unit 1</p>
            <p className="font-serif-display mt-3 text-3xl font-medium leading-tight text-foreground">Three-level ANSI/SPARC architecture</p>
            <div className="mt-4 rounded-r-md border-l-[3px] border-primary bg-accent/50 px-4 py-3 font-reading text-[15px] leading-relaxed text-foreground">
              A database is described at three levels so that users, programmers and the storage engine can each change without breaking the others.
            </div>
            <ul className="mt-4 space-y-2 font-reading text-[15px] text-foreground/90">
              <li>• <strong>External level</strong>: what each user sees (views)</li>
              <li>• <strong>Conceptual level</strong>: the whole logical schema</li>
              <li>• <strong>Internal level</strong>: how data is stored on disk</li>
            </ul>
            <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground">
              <span>42 min left</span>
              <span className="h-1 w-32 overflow-hidden rounded-full bg-muted">
                <span className="block h-full w-2/5 bg-primary" />
              </span>
            </div>
          </div>
          <div className="surface-card absolute -bottom-6 -left-8 flex items-center gap-3 px-4 py-3">
            <span className="icon-tile !h-9 !w-9">
              <NotebookPen className="h-4 w-4" />
            </span>
            <span className="text-sm text-foreground">Notes saved as you read</span>
          </div>
        </div>
      </section>

      {/* Finals banner */}
      {days > 0 && (
        <section className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="flex flex-col gap-4 rounded-2xl border border-primary/25 bg-accent/60 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <CalendarClock className="h-6 w-6 shrink-0 text-primary" />
              <div>
                <p className="font-semibold text-foreground">
                  Finals start {FINALS_START.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}: {days} {days === 1 ? "day" : "days"} to go
                </p>
                <p className="text-sm text-muted-foreground">Start with a subject's complete study guide, then revise unit by unit.</p>
              </div>
            </div>
            <Link to="/library" className="shrink-0 rounded-full bg-foreground px-5 py-2.5 text-center text-sm font-medium text-background hover:bg-primary hover:text-primary-foreground transition-colors">
              Plan my revision
            </Link>
          </div>
        </section>
      )}

      {/* Proof numbers */}
      <section className="mx-auto max-w-6xl px-5 pt-20 sm:px-8">
        <h2 className="text-3xl font-medium text-foreground sm:text-4xl">Why CampusLoop?</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            { n: String(DOC_COUNT), t: "documents", d: "Every guide, lecture note, slide deck, tutorial and paper from the course, organised by unit.", cta: "Browse the Library", to: "/library" },
            { n: `${READING_HOURS} hours`, t: "of readable text", d: "Converted from PDFs and slides into clean text with headings, tables, code and diagrams.", cta: "Read a study guide", to: `/library/${LIBRARY[0].slug}/study-guide` },
            { n: String(SCANNED_PAGES), t: "handwritten pages", d: "Class notes kept exactly as written, so nothing from the lectures goes missing.", cta: "See handwritten notes", to: "/library/coa" },
          ].map((p) => (
            <div key={p.t} className="surface-card flex flex-col p-6">
              <p className="font-serif-display text-4xl font-medium text-foreground">{p.n}</p>
              <p className="text-sm font-medium text-primary">{p.t}</p>
              <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted-foreground">{p.d}</p>
              <Link to={p.to} className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary">
                {p.cta} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Subjects */}
      <section className="mx-auto max-w-6xl px-5 pt-20 sm:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-3xl font-medium text-foreground sm:text-4xl">Semester 3 subjects</h2>
          <Link to="/library" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline underline-offset-4">
            All documents <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {LIBRARY.map((s) => {
            const Icon = SUBJECT_ICONS[s.slug] ?? BookOpen;
            const mins = s.docs.reduce((n, d) => n + (d.scanned ? 0 : minutesFor(d.words)), 0);
            return (
              <Link key={s.slug} to={`/library/${s.slug}`} className="surface-card group flex flex-col p-5 transition-colors hover:border-primary/40">
                <span className="icon-tile">
                  <Icon className="h-5 w-5" />
                </span>
                <p className="mt-4 font-semibold text-foreground group-hover:text-primary transition-colors">{s.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {s.docs.length} documents · {Math.round(mins / 60)} h of reading
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Tools */}
      <section className="mx-auto max-w-6xl px-5 pt-20 sm:px-8">
        <h2 className="text-3xl font-medium text-foreground sm:text-4xl">Built for the way you actually revise</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            { icon: Focus, t: "A reader that stays out of the way", d: "Serif text, adjustable size, dark mode, contents sidebar and focus mode. It remembers where you stopped.", tag: "Free, no account", to: "/library" },
            { icon: ListChecks, t: "Practice that feels like the exam", d: "Unit-wise quizzes, timed mock papers and solved question banks, with your weak units highlighted.", tag: "Free account", to: "/auth" },
            { icon: Code2, t: "A coding lab for practicals", d: "Write and check your lab programs in C, Java, Python and SQL, with expected outputs and viva questions.", tag: "Free account", to: "/auth" },
          ].map(({ icon: Icon, t, d, tag, to }) => (
            <Link key={t} to={to} className="surface-card group p-6 transition-colors hover:border-primary/40">
              <Icon className="h-6 w-6 text-primary" strokeWidth={1.7} />
              <p className="mt-4 text-lg font-semibold text-foreground">{t}</p>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{d}</p>
              <p className="mt-4 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">{tag}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-5 pt-20 sm:px-8">
        <h2 className="text-3xl font-medium text-foreground sm:text-4xl">Questions</h2>
        <div className="mt-6 divide-y divide-border border-y border-border">
          {FAQ.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[17px] font-medium text-foreground">
                {f.q}
                <span className="text-xl text-muted-foreground transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
        <script
          type="application/ld+json"
          // FAQ rich results for search engines
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
            }),
          }}
        />
      </section>

      {/* Closing CTA */}
      <section className="mx-auto max-w-6xl px-5 pt-20 sm:px-8">
        <div className="sidebar-dark flex flex-col items-start gap-6 rounded-3xl px-8 py-12 sm:px-12 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-medium text-foreground sm:text-4xl">
              Ready for <em className="text-primary">25 November?</em>
            </h2>
            <p className="mt-2 text-muted-foreground">Open a study guide now. It takes ten seconds, no account needed.</p>
          </div>
          <Link to="/library" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-sidebar-accent px-6 py-3 text-sm font-medium text-sidebar-accent-foreground hover:opacity-90 transition-opacity">
            Start reading <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
