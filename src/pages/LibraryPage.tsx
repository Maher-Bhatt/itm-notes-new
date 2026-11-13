import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowRight, BookOpen, FileText, PenLine, Presentation, ScrollText, Search, ClipboardList, FlaskConical, CheckCircle2 } from "lucide-react";
import { LIBRARY } from "@/data/libraryIndex";
import type { LibraryDoc, LibrarySubject } from "@/data/libraryTypes";
import { daysUntilFinals, getAllProgress, getLastRead, minutesFor, docKey, FINALS_START } from "@/lib/readingProgress";

const KIND_ICON: Record<string, typeof FileText> = {
  "Study guide": BookOpen,
  Syllabus: ScrollText,
  "Lecture notes": FileText,
  Slides: Presentation,
  "Handwritten notes": PenLine,
  Tutorial: ClipboardList,
  "Question paper": ClipboardList,
  "Lab manual": FlaskConical,
  Assignment: ClipboardList,
};

const FILTERS = [
  { label: "All", kinds: [] as string[] },
  { label: "Notes", kinds: ["Lecture notes", "Lab manual"] },
  { label: "Slides", kinds: ["Slides"] },
  { label: "Handwritten", kinds: ["Handwritten notes"] },
  { label: "Practice & papers", kinds: ["Tutorial", "Question paper", "Assignment", "Syllabus"] },
];

function docMeta(doc: LibraryDoc) {
  if (doc.scanned) return `${doc.pages ?? "—"} scanned pages`;
  return `${minutesFor(doc.words)} min read`;
}

function groupByUnit(docs: LibraryDoc[]) {
  const groups = new Map<string, LibraryDoc[]>();
  for (const d of docs) {
    if (d.featured) continue;
    const key = d.unit != null ? `Unit ${d.unit}` : d.kind === "Syllabus" ? "Course" : "Practice & papers";
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(d);
  }
  const order = (k: string) => (k === "Course" ? -1 : k.startsWith("Unit") ? parseInt(k.slice(5), 10) : 999);
  return [...groups.entries()].sort((a, b) => order(a[0]) - order(b[0]));
}

function ProgressBar({ pct }: { pct: number }) {
  return (
    <div className="h-1 w-full rounded-full bg-muted overflow-hidden" aria-hidden>
      <div className="h-full bg-primary transition-[width]" style={{ width: `${Math.round(pct * 100)}%` }} />
    </div>
  );
}

export default function LibraryPage() {
  const { subjectSlug } = useParams();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState<string>("All");
  const progress = useMemo(() => getAllProgress(), []);
  const last = useMemo(() => getLastRead(), []);
  const days = daysUntilFinals();

  const subject: LibrarySubject = LIBRARY.find((s) => s.slug === subjectSlug) ?? LIBRARY[0];

  const lastDoc = useMemo(() => {
    if (!last) return null;
    const s = LIBRARY.find((x) => x.slug === last.subject);
    const d = s?.docs.find((x) => x.slug === last.doc);
    return s && d ? { s, d, pct: progress[docKey(s.slug, d.slug)]?.pct ?? 0 } : null;
  }, [last, progress]);

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return null;
    return LIBRARY.flatMap((s) =>
      s.docs.filter((d) => `${d.title} ${d.kind} ${s.short} ${s.name}`.toLowerCase().includes(q)).map((d) => ({ s, d }))
    );
  }, [query]);

  const guide = subject.docs.find((d) => d.featured);
  const guidePct = guide ? progress[docKey(subject.slug, guide.slug)]?.pct ?? 0 : 0;
  const subjectDone = subject.docs.filter((d) => progress[docKey(subject.slug, d.slug)]?.done).length;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 pb-8 border-b border-border">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">Semester 3 · Course material</p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-medium leading-[1.05] text-foreground">Your semester <em className="text-primary">library</em></h1>
          <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
            Every study guide, lecture note, slide deck and handwritten page from your course, rewritten as clean text you can read
            without distractions.
          </p>
        </div>
        {days > 0 && (
          <div className="shrink-0 rounded-xl border border-border bg-card px-5 py-4 text-right">
            <div className="text-3xl font-semibold tabular-nums text-foreground">{days}</div>
            <div className="text-xs text-muted-foreground">
              {days === 1 ? "day" : "days"} until finals ·{" "}
              {FINALS_START.toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
            </div>
          </div>
        )}
      </header>

      {/* Continue + search */}
      <section className="grid gap-4 py-8 md:grid-cols-[1.4fr_1fr]">
        {lastDoc ? (
          <Link
            to={`/library/${lastDoc.s.slug}/${lastDoc.d.slug}`}
            className="group rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/40"
          >
            <p className="text-xs font-medium text-muted-foreground">Continue reading · {lastDoc.s.short}</p>
            <h2 className="mt-1.5 text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{lastDoc.d.title}</h2>
            <div className="mt-4 flex items-center gap-3">
              <ProgressBar pct={lastDoc.pct} />
              <span className="text-xs tabular-nums text-muted-foreground shrink-0">{Math.round(lastDoc.pct * 100)}%</span>
            </div>
          </Link>
        ) : (
          <div className="rounded-xl border border-dashed border-border p-5">
            <p className="text-xs font-medium text-muted-foreground">Where to start</p>
            <p className="mt-1.5 text-[15px] text-foreground">
              Open a subject's <span className="font-semibold">Complete Study Guide</span>. It covers every unit from zero, then use the
              unit notes for depth.
            </p>
          </div>
        )}
        <label className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 focus-within:border-primary/50 transition-colors">
          <Search className="h-4 w-4 text-muted-foreground shrink-0" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search all notes, slides and papers"
            className="h-12 w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            aria-label="Search library"
          />
        </label>
      </section>

      {searchResults ? (
        <section>
          <h2 className="text-sm font-semibold text-foreground mb-3">
            {searchResults.length} result{searchResults.length === 1 ? "" : "s"}
          </h2>
          <DocList items={searchResults.map(({ s, d }) => ({ s, d }))} progress={progress} showSubject />
        </section>
      ) : (
        <>
          {/* Subject tabs */}
          <nav aria-label="Subjects" className="-mx-4 px-4 overflow-x-auto no-scrollbar">
            <div className="flex gap-1 border-b border-border min-w-max">
              {LIBRARY.map((s) => {
                const active = s.slug === subject.slug;
                return (
                  <button
                    key={s.slug}
                    type="button"
                    onClick={() => navigate(`/library/${s.slug}`, { replace: true })}
                    className={`relative px-4 py-3 text-sm transition-colors cursor-pointer ${
                      active ? "text-foreground font-semibold" : "text-muted-foreground hover:text-foreground font-medium"
                    }`}
                    aria-current={active ? "page" : undefined}
                  >
                    {s.short}
                    {active && <span className="absolute inset-x-3 -bottom-px h-0.5 bg-primary rounded-full" />}
                  </button>
                );
              })}
            </div>
          </nav>

          <section className="pt-8">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="text-xl font-semibold text-foreground">{subject.name}</h2>
              <p className="text-sm text-muted-foreground">
                {subject.code && <span className="font-mono text-xs mr-2">{subject.code}</span>}
                {subject.docs.length} documents · {subjectDone} finished
              </p>
            </div>

            {guide && (
              <Link
                to={`/library/${subject.slug}/${guide.slug}`}
                className="surface-card group mt-5 block p-6 transition-colors hover:border-primary/40"
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-[0.1em] text-primary">Start here</p>
                    <h3 className="mt-2 text-xl font-semibold text-foreground">{guide.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground max-w-2xl">{guide.summary}</p>
                    <p className="mt-3 text-xs text-muted-foreground">{docMeta(guide)} · every unit, worked examples, exam tips</p>
                  </div>
                  <span className="hidden sm:inline-flex items-center gap-1.5 shrink-0 rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {guidePct > 0.02 ? "Continue" : "Read"} <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
                {guidePct > 0 && (
                  <div className="mt-5 flex items-center gap-3">
                    <ProgressBar pct={guidePct} />
                    <span className="text-xs tabular-nums text-muted-foreground">{Math.round(guidePct * 100)}%</span>
                  </div>
                )}
              </Link>
            )}

            <div className="mt-8 flex flex-wrap gap-2">
              {FILTERS.map((f) => (
                <button
                  key={f.label}
                  type="button"
                  onClick={() => setKind(f.label)}
                  className={`rounded-full px-4 py-1.5 text-sm transition-colors cursor-pointer ${
                    kind === f.label ? "bg-foreground text-background font-medium" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="mt-8 space-y-10">
              {groupByUnit(subject.docs.filter((d) => kind === "All" || FILTERS.find((f) => f.label === kind)?.kinds.includes(d.kind))).map(([group, docs]) => (
                <div key={group}>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground mb-3">{group}</h3>
                  <DocList items={docs.map((d) => ({ s: subject, d }))} progress={progress} />
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}

function DocList({
  items,
  progress,
  showSubject,
}: {
  items: { s: LibrarySubject; d: LibraryDoc }[];
  progress: ReturnType<typeof getAllProgress>;
  showSubject?: boolean;
}) {
  if (items.length === 0) return <p className="text-sm text-muted-foreground">Nothing found.</p>;
  return (
    <ul className="surface-card divide-y divide-border overflow-hidden">
      {items.map(({ s, d }) => {
        const Icon = KIND_ICON[d.kind] ?? FileText;
        const p = progress[docKey(s.slug, d.slug)];
        return (
          <li key={`${s.slug}/${d.slug}`}>
            <Link
              to={`/library/${s.slug}/${d.slug}`}
              className="group flex items-center gap-4 px-4 sm:px-5 py-3.5 transition-colors hover:bg-secondary/50"
            >
              <Icon className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[15px] font-medium text-foreground">{d.title}</p>
                <p className="text-xs text-muted-foreground">
                  {showSubject && `${s.short} · `}
                  {d.kind} · {docMeta(d)}
                </p>
              </div>
              {p?.done ? (
                <CheckCircle2 className="h-4 w-4 shrink-0 text-success" aria-label="Finished" />
              ) : p && p.pct > 0.02 ? (
                <span className="shrink-0 text-xs tabular-nums text-muted-foreground">{Math.round(p.pct * 100)}%</span>
              ) : null}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
