import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, CalendarClock, Code2, Coffee, Cpu, Database, Flame, Search, Sigma, type LucideIcon } from "lucide-react";
import { LIBRARY } from "@/data/libraryIndex";
import { daysUntilFinals, docKey, getAllProgress, getLastRead, FINALS_START } from "@/lib/readingProgress";

export const SUBJECT_ICONS: Record<string, LucideIcon> = {
  dsa: Code2,
  dbms: Database,
  conmp: Sigma,
  coa: Cpu,
  java: Coffee,
};

function openSearch() {
  window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", ctrlKey: true }));
}

/** Dashboard hero: continue learning, search, exam stats, and the five subject libraries. */
export function LibraryHighlights({ name, streakDays }: { name?: string; streakDays?: number }) {
  const progress = useMemo(() => getAllProgress(), []);
  const last = useMemo(() => getLastRead(), []);
  const days = daysUntilFinals();

  const totalDocs = LIBRARY.reduce((n, s) => n + s.docs.length, 0);
  const finished = Object.values(progress).filter((p) => p.done).length;

  const lastDoc = useMemo(() => {
    if (!last) return null;
    const s = LIBRARY.find((x) => x.slug === last.subject);
    const d = s?.docs.find((x) => x.slug === last.doc);
    return s && d ? { s, d, pct: progress[docKey(s.slug, d.slug)]?.pct ?? 0 } : null;
  }, [last, progress]);

  const stats = [
    { label: "Days to finals", value: days > 0 ? String(days) : "Live", unit: days > 0 ? `from ${FINALS_START.toLocaleDateString("en-IN", { day: "numeric", month: "short" })}` : "", icon: CalendarClock },
    { label: "Documents read", value: String(finished), unit: `of ${totalDocs}`, icon: BookOpen },
    { label: "Study streak", value: String(streakDays ?? 0), unit: streakDays === 1 ? "day" : "days", icon: Flame, warm: true },
  ];

  return (
    <section className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:items-end">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Dashboard</p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-medium leading-[1.05] text-foreground">
            Continue your <em className="text-primary">learning</em>
            {name ? <span className="sr-only">, {name}</span> : null}
          </h1>
          <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-muted-foreground">
            {name ? `Welcome back, ${name.split(" ")[0]}. ` : ""}Your Semester 3 notes, slides and handwritten pages, ready to read in one focused place.
          </p>
          <button
            type="button"
            onClick={openSearch}
            className="surface-card mt-6 flex w-full max-w-xl items-center gap-3 rounded-full py-2 pl-5 pr-2 text-left text-sm text-muted-foreground transition-colors hover:border-primary/40 cursor-pointer"
          >
            <Search className="h-4 w-4 shrink-0" />
            <span className="flex-1 truncate">Search notes, subjects, topics…</span>
            <kbd className="hidden sm:inline-flex rounded-full !border-0 bg-foreground px-3 py-1.5 text-xs font-medium text-background">Ctrl + K</kbd>
          </button>
        </div>

        {lastDoc ? (
          <Link to={`/library/${lastDoc.s.slug}/${lastDoc.d.slug}`} className="surface-card group block p-5 transition-colors hover:border-primary/40">
            <div className="flex items-center gap-3">
              <span className="icon-tile">
                <BookOpen className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Pick up where you left off · {lastDoc.s.short}</p>
                <p className="truncate font-semibold text-foreground group-hover:text-primary transition-colors">{lastDoc.d.title}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-primary" style={{ width: `${Math.round(lastDoc.pct * 100)}%` }} />
              </div>
              <span className="text-xs tabular-nums text-muted-foreground">{Math.round(lastDoc.pct * 100)}%</span>
            </div>
          </Link>
        ) : (
          <Link to="/library" className="surface-card group block p-5 transition-colors hover:border-primary/40">
            <div className="flex items-center gap-3">
              <span className="icon-tile">
                <BookOpen className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs text-muted-foreground">Start here</p>
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors">Open your Semester 3 Library</p>
              </div>
              <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {stats.map(({ label, value, unit, icon: Icon, warm }) => (
          <div key={label} className={`surface-card p-5 ${warm ? "!bg-accent/60" : ""}`}>
            <Icon className="h-5 w-5 text-primary" />
            <p className="mt-3 text-sm font-medium text-foreground">{label}</p>
            <p className="mt-0.5 text-2xl font-semibold tabular-nums text-foreground">
              {value} <span className="text-sm font-medium text-primary">{unit}</span>
            </p>
          </div>
        ))}
      </div>

      <div>
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="text-2xl font-medium text-foreground">Your subjects</h2>
          <Link to="/library" className="text-sm font-medium text-primary hover:underline underline-offset-4">
            Open library
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {LIBRARY.map((s) => {
            const Icon = SUBJECT_ICONS[s.slug] ?? BookOpen;
            const guide = s.docs.find((d) => d.featured) ?? s.docs[0];
            const pct = progress[docKey(s.slug, guide.slug)]?.pct ?? 0;
            return (
              <Link key={s.slug} to={`/library/${s.slug}`} className="surface-card group flex flex-col p-4 transition-colors hover:border-primary/40">
                <Icon className="h-6 w-6 text-foreground" strokeWidth={1.6} />
                <p className="mt-3 font-semibold text-foreground">{s.short}</p>
                <p className="line-clamp-1 text-xs text-muted-foreground">{s.name}</p>
                <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{s.docs.length} resources</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                </div>
                <div className="mt-3 h-1 overflow-hidden rounded-full bg-muted">
                  <div className="h-full bg-primary" style={{ width: `${Math.round(pct * 100)}%` }} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
