import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, CheckCircle2, FileText } from "lucide-react";
import { LIBRARY } from "@/data/libraryIndex";
import type { LibraryDoc, LibrarySubject } from "@/data/libraryTypes";
import { setPageMeta } from "@/lib/pageMeta";
import { docKey, getAllProgress } from "@/lib/readingProgress";

const EXAMS = ["CET-1", "CET-2", "Mid-sem", "End-sem"] as const;
const EXAM_LABEL: Record<string, string> = { "CET-1": "CET-1", "CET-2": "CET-2", "Mid-sem": "Mid-semester", "End-sem": "End-semester" };

interface Row {
  s: LibrarySubject;
  d: LibraryDoc;
}

const ALL: Row[] = LIBRARY.flatMap((s) => s.docs.filter((d) => d.kind === "Question paper" && d.date).map((d) => ({ s, d })));
const YEARS = [...new Set(ALL.map((r) => r.d.academicYear!))].sort().reverse();

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full px-3.5 py-1.5 text-sm transition-colors cursor-pointer ${
        active ? "bg-foreground text-background font-medium" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
      }`}
    >
      {children}
    </button>
  );
}

export default function PapersPage() {
  const [params, setParams] = useSearchParams();
  const subject = params.get("subject") ?? "all";
  const exam = params.get("exam") ?? "all";
  const year = params.get("year") ?? "all";
  const progress = useMemo(() => getAllProgress(), []);

  const set = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value === "all") next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  };

  useEffect(() => {
    setPageMeta({
      title: "Semester 3 previous-year papers with solutions (DSA, DBMS, CONMP, COA, Java) | CampusLoop",
      description: `${ALL.length} real ITM SLS Baroda Semester 3 question papers (CET-1, CET-2, mid-semester and end-semester) transcribed as text, with worked solutions. Filter by subject, exam and year.`,
      path: "/papers",
    });
  }, []);

  const rows = ALL.filter(
    (r) => (subject === "all" || r.s.slug === subject) && (exam === "all" || r.d.exam === exam) && (year === "all" || r.d.academicYear === year)
  ).sort((a, b) => (b.d.date ?? "").localeCompare(a.d.date ?? "") || a.s.short.localeCompare(b.s.short));

  const byYear = YEARS.map((y) => ({ y, items: rows.filter((r) => r.d.academicYear === y) })).filter((g) => g.items.length);

  return (
    <div className="mx-auto max-w-5xl px-5 pb-10 pt-12 sm:px-8">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Semester 3 · Question papers</p>
      <h1 className="mt-3 text-4xl font-medium leading-[1.05] text-foreground sm:text-5xl">
        Previous-year papers, <em className="text-primary">solved.</em>
      </h1>
      <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-muted-foreground">
        {ALL.length} real papers from ITM SLS Baroda, typed out from the original question papers, each with worked solutions: MCQ answers,
        step-by-step numericals, SQL, programs and exam-ready theory answers.
      </p>

      <div className="mt-8 space-y-3">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="mr-2 w-16 text-xs font-medium uppercase tracking-wider text-muted-foreground">Subject</span>
          <Chip active={subject === "all"} onClick={() => set("subject", "all")}>All</Chip>
          {LIBRARY.map((s) => (
            <Chip key={s.slug} active={subject === s.slug} onClick={() => set("subject", s.slug)}>
              {s.short}
            </Chip>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="mr-2 w-16 text-xs font-medium uppercase tracking-wider text-muted-foreground">Exam</span>
          <Chip active={exam === "all"} onClick={() => set("exam", "all")}>All</Chip>
          {EXAMS.map((e) => (
            <Chip key={e} active={exam === e} onClick={() => set("exam", e)}>
              {EXAM_LABEL[e]}
            </Chip>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="mr-2 w-16 text-xs font-medium uppercase tracking-wider text-muted-foreground">Year</span>
          <Chip active={year === "all"} onClick={() => set("year", "all")}>All</Chip>
          {YEARS.map((y) => (
            <Chip key={y} active={year === y} onClick={() => set("year", y)}>
              {y}
            </Chip>
          ))}
        </div>
      </div>

      {byYear.length === 0 && <p className="mt-10 text-muted-foreground">No papers match these filters yet.</p>}

      {byYear.map(({ y, items }) => (
        <section key={y} className="mt-10">
          <h2 className="text-2xl font-medium text-foreground">
            {y} <span className="text-base text-muted-foreground">· {items.length} papers</span>
          </h2>
          <ul className="surface-card mt-4 divide-y divide-border overflow-hidden">
            {items.map(({ s, d }) => {
              const done = progress[docKey(s.slug, d.slug)]?.done;
              return (
                <li key={`${s.slug}/${d.slug}`}>
                  <Link to={`/library/${s.slug}/${d.slug}`} className="group flex items-center gap-4 px-4 py-3.5 transition-colors hover:bg-secondary/50 sm:px-5">
                    <span className="icon-tile !h-9 !w-9 shrink-0">
                      <FileText className="h-4 w-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[15px] font-medium text-foreground">
                        {s.short} · {EXAM_LABEL[d.exam ?? ""] ?? d.exam}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(d.date!).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })} · {d.marks} marks · {s.name}
                      </p>
                    </div>
                    {done ? (
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-success" aria-label="Done" />
                    ) : (
                      <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      ))}

      <p className="mt-10 text-xs leading-relaxed text-muted-foreground">
        Questions are transcribed from scans of the original papers; anything unreadable in the scan is marked. Solutions are written by
        CampusLoop. If you spot a mistake, use the Doubts section at the end of the paper or the <Link to="/contact" className="underline underline-offset-2">contact page</Link>.
      </p>
    </div>
  );
}
