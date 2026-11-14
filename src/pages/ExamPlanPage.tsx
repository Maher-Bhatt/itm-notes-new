import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, RotateCcw } from "lucide-react";
import plan from "@/content/examPlan.json";
import guides from "@/content/guides.json";
import { setPageMeta } from "@/lib/pageMeta";
import { daysUntilFinals, FINALS_START } from "@/lib/readingProgress";

interface PlanUnit {
  unit: number;
  topic: string;
  weight: number;
  anchor: string;
}
interface PlanSubject {
  slug: string;
  short: string;
  name: string;
  weightsKnown: boolean;
  revisionAnchor: string;
  units: PlanUnit[];
}

const SUBJECTS = plan as PlanSubject[];
const DONE_KEY = "cl_exam_plan_done_v1";

interface Task {
  id: string;
  s: PlanSubject;
  u: PlanUnit;
  share: number; // fraction of that subject's marks
}

/** Spread every unit over the available days, balancing each day's share of total marks. */
function buildSchedule(days: number): { day: number; date: Date; tasks: Task[] }[] {
  const queues = SUBJECTS.map((s) => {
    const total = s.units.reduce((n, u) => n + u.weight, 0) || 1;
    return [...s.units].sort((a, b) => a.unit - b.unit).map((u) => ({ id: `${s.slug}-${u.unit}`, s, u, share: u.weight / total }));
  });
  // Interleave subjects so no day is a single-subject marathon.
  const order: Task[] = [];
  for (let i = 0; queues.some((q) => i < q.length); i++) queues.forEach((q) => q[i] && order.push(q[i]));

  const studyDays = Math.max(1, days - 1); // keep the final day for revision sheets
  const perDay = order.reduce((n, t) => n + t.share, 0) / studyDays;
  // Place each unit on the day where the midpoint of its marks falls, so days carry similar weight.
  const buckets: Task[][] = Array.from({ length: studyDays }, () => []);
  let cumulative = 0;
  for (const t of order) {
    const idx = Math.min(studyDays - 1, Math.floor((cumulative + t.share / 2) / perDay));
    buckets[idx].push(t);
    cumulative += t.share;
  }
  const schedule = buckets
    .filter((b) => b.length)
    .map((tasks, i) => ({ day: i + 1, date: new Date(), tasks }));
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  schedule.forEach((d, i) => {
    d.date = new Date(start.getTime() + i * 86_400_000);
  });
  return schedule;
}

export default function ExamPlanPage() {
  const days = daysUntilFinals();
  const [done, setDone] = useState<Set<string>>(() => {
    try {
      return new Set(JSON.parse(localStorage.getItem(DONE_KEY) || "[]") as string[]);
    } catch {
      return new Set();
    }
  });

  useEffect(() => {
    setPageMeta({
      title: "Semester 3 finals revision plan: day-by-day, weighted by marks | CampusLoop",
      description: `A day-by-day revision plan for Semester 3 B.Tech finals (${SUBJECTS.map((s) => s.short).join(", ")}), with time split by each unit's marks and links to the exact study-guide section.`,
      path: "/exam-plan",
    });
  }, []);

  useEffect(() => {
    localStorage.setItem(DONE_KEY, JSON.stringify([...done]));
  }, [done]);

  const schedule = useMemo(() => buildSchedule(Math.max(days, 2)), [days]);
  const total = SUBJECTS.reduce((n, s) => n + s.units.length, 0);
  const pct = Math.round((done.size / total) * 100);
  const todayIndex = 0;

  const toggle = (id: string) =>
    setDone((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <div className="mx-auto max-w-4xl px-5 pb-10 pt-12 sm:px-8">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Semester 3 · Finals</p>
      <h1 className="mt-3 text-4xl font-medium leading-[1.05] text-foreground sm:text-5xl">
        Your revision plan, <em className="text-primary">weighted by marks.</em>
      </h1>
      <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-muted-foreground">
        {days > 0
          ? `Finals start ${FINALS_START.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}. Every unit of all five subjects is spread across the ${days} days left, with more time for units that carry more marks. The last day is for the revision sheets.`
          : "Exams are underway. Use the plan as a checklist and focus on the units you haven't ticked yet."}
      </p>

      <div className="surface-card mt-8 flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
        <div className="flex-1">
          <div className="flex items-baseline justify-between text-sm">
            <span className="font-medium text-foreground">
              {done.size} of {total} units revised
            </span>
            <span className="tabular-nums text-muted-foreground">{pct}%</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-primary transition-[width]" style={{ width: `${pct}%` }} />
          </div>
        </div>
        {done.size > 0 && (
          <button
            type="button"
            onClick={() => setDone(new Set())}
            className="inline-flex items-center gap-1.5 self-start rounded-lg px-3 py-1.5 text-xs text-muted-foreground hover:bg-secondary hover:text-foreground cursor-pointer sm:self-auto"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Reset
          </button>
        )}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2 text-sm">
        <span className="text-muted-foreground">Exam guides (questions, mistakes, self-checks):</span>
        {SUBJECTS.map((s) => (
          <Link
            key={s.slug}
            to={`/library/${s.slug}/exam-guide`}
            className="rounded-full border border-border px-3 py-1 text-foreground hover:border-primary/50 hover:text-primary transition-colors"
          >
            {s.short}
          </Link>
        ))}
      </div>

      <ol className="mt-10 space-y-6">
        {schedule.map((d, i) => (
          <li key={d.day} className={`surface-card p-5 sm:p-6 ${i === todayIndex && days > 0 ? "ring-1 ring-primary/40" : ""}`}>
            <div className="flex items-baseline justify-between gap-3">
              <h2 className="text-xl font-medium text-foreground">
                Day {d.day}
                {i === todayIndex && days > 0 && <span className="ml-2 align-middle text-xs font-semibold uppercase tracking-wider text-primary">Today</span>}
              </h2>
              <span className="text-sm text-muted-foreground">{d.date.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })}</span>
            </div>
            <ul className="mt-4 divide-y divide-border">
              {d.tasks.map((t) => {
                const isDone = done.has(t.id);
                return (
                  <li key={t.id} className="flex items-start gap-3 py-3">
                    <button
                      type="button"
                      onClick={() => toggle(t.id)}
                      aria-pressed={isDone}
                      aria-label={`Mark ${t.s.short} unit ${t.u.unit} as revised`}
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors cursor-pointer ${
                        isDone ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary"
                      }`}
                    >
                      {isDone && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                    </button>
                    <div className="min-w-0 flex-1">
                      <Link
                        to={`/library/${t.s.slug}/study-guide#${t.u.anchor}`}
                        className={`text-[15px] font-medium hover:text-primary ${isDone ? "text-muted-foreground line-through" : "text-foreground"}`}
                      >
                        {t.s.short} · Unit {t.u.unit}: {t.u.topic}
                      </Link>
                      <p className="text-xs text-muted-foreground">
                        {t.s.weightsKnown ? `${t.u.weight} marks` : "Weight not published: equal share"} · {t.s.name}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
        <li className="surface-card p-5 sm:p-6">
          <h2 className="text-xl font-medium text-foreground">Final day: revision sheets</h2>
          <p className="mt-1 text-sm text-muted-foreground">One page per subject with every definition, formula and algorithm to look at before the paper.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {SUBJECTS.map((s) => (
              <Link
                key={s.slug}
                to={`/library/${s.slug}/study-guide#${s.revisionAnchor}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 text-sm text-foreground hover:border-primary/50 hover:text-primary transition-colors"
              >
                {s.short} <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            ))}
          </div>
        </li>
      </ol>

      <section className="mt-10" aria-labelledby="technique-heading">
        <h2 id="technique-heading" className="text-xl font-medium text-foreground">Exam technique</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {Object.entries(guides as Record<string, { title: string; description: string }>).map(([slug, g]) => (
            <Link key={slug} to={`/guides/${slug}`} className="surface-card group block p-5 transition-colors hover:border-primary/40">
              <p className="font-medium text-foreground group-hover:text-primary">{g.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{g.description}</p>
            </Link>
          ))}
          <Link to="/library/conmp/formula-sheet" className="surface-card group block p-5 transition-colors hover:border-primary/40">
            <p className="font-medium text-foreground group-hover:text-primary">CONMP formula sheet</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">Every numerical-methods formula on one page, each linked to a solved exam question.</p>
          </Link>
          <Link to="/papers" className="surface-card group block p-5 transition-colors hover:border-primary/40">
            <p className="font-medium text-foreground group-hover:text-primary">Solved past papers</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">22 CET, mid-sem and end-sem papers with worked solutions, filterable by subject and year.</p>
          </Link>
        </div>
      </section>

      <p className="mt-10 text-xs leading-relaxed text-muted-foreground">
        Unit weights come from the official syllabus tables in each study guide (DSA, DBMS, CONMP). COA and Java don't publish unit weights, so their units get equal time. Ticks are saved on this device.
      </p>
    </div>
  );
}
