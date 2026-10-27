import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { subjects, getAllTopicIds } from "@/data/subjects";
import { useProgress } from "@/hooks/useProgress";
import { SUBJECT_IMP_DATA } from "@/data/impQuestionsData";
import {
  BookOpen,
  Search,
  ArrowRight,
  Flame,
  Zap,
} from "lucide-react";
import { BackToTop } from "@/components/BackToTop";

function SubjectCard({
  sub,
  progressPct,
  hasImpQuestions,
  navigateRef,
}: {
  sub: any;
  progressPct: number;
  hasImpQuestions: boolean;
  navigateRef: any;
}) {
  const totalUnits = sub.units?.length || 0;
  const totalTopics = sub.units?.reduce((acc: number, u: any) => acc + (u.topics?.length || 0), 0) || 0;

  return (
    <div
      onClick={() => navigateRef(`/subject/${sub.id}`)}
      className="group relative rounded-2xl border border-border bg-card hover:bg-secondary/40 hover:border-amber-500/40 transition-all p-5 flex flex-col justify-between gap-4 card-lift press cursor-pointer select-none shadow-xs"
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <span className="px-2.5 py-0.5 rounded-md font-mono text-[10px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              {sub.code || "SUB"}
            </span>
            <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-secondary text-muted-foreground">
              Semester {sub.semester}
            </span>
          </div>
          <span className="text-[11px] font-medium text-muted-foreground flex items-center gap-1">
            <BookOpen className="h-3 w-3" />
            {totalUnits} Units · {totalTopics} Topics
          </span>
        </div>

        <h3 className="font-bold text-base text-foreground group-hover:text-amber-500 transition-colors leading-snug">
          {sub.name}
        </h3>

        <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
          {sub.description || "Detailed syllabus notes, algorithmic proofs, diagrams, and exam review questions."}
        </p>

        {/* Units Chips */}
        <div className="pt-1">
          <div className="flex flex-wrap gap-1.5">
            {sub.units?.slice(0, 3).map((unit: any, idx: number) => (
              <span
                key={unit.id}
                className="text-[10px] px-2 py-0.5 rounded-md bg-secondary text-foreground/80 font-medium truncate max-w-[190px]"
                title={unit.title}
              >
                U{idx + 1}: {unit.title.replace(/^Unit \d+:\s*/i, "")}
              </span>
            ))}
            {totalUnits > 3 && (
              <span className="text-[10px] px-1.5 py-0.5 rounded text-muted-foreground font-semibold">
                +{sub.units?.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Footer: Progress & 1 Clean Action */}
      <div className="pt-3 border-t border-border flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-1 max-w-[140px]">
          <div className="h-1.5 flex-1 rounded-full bg-secondary overflow-hidden">
            <div
              className="h-full bg-amber-500 rounded-full transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <span className="text-[10px] font-mono text-muted-foreground">{progressPct}%</span>
        </div>

        <div className="flex items-center gap-2">
          {hasImpQuestions && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                navigateRef(`/imp-questions/${sub.id}`);
              }}
              className="px-2 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 font-bold text-[10px] border border-amber-500/20 press flex items-center gap-1 cursor-pointer"
              title="Solved Exam Questions"
            >
              <Zap className="h-3 w-3" />
              <span>IMP</span>
            </button>
          )}

          <span className="text-xs font-bold text-foreground group-hover:text-amber-500 group-hover:translate-x-1 transition-all flex items-center gap-1 font-display">
            <span>Explore</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
}

export default function SubjectsPage() {
  const navigate = useNavigate();
  const { getSubjectProgress } = useProgress();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSemester, setSelectedSemester] = useState<number | "all">(3);

  const totalSubjects = subjects.length;
  const totalUnits = useMemo(
    () => subjects.reduce((acc, sub) => acc + (sub.units?.length || 0), 0),
    [],
  );
  const totalTopics = useMemo(
    () =>
      subjects.reduce(
        (acc, sub) =>
          acc +
          (sub.units?.reduce((uAcc, u) => uAcc + (u.topics?.length || 0), 0) || 0),
        0,
      ),
    [],
  );

  const filteredSubjects = useMemo(() => {
    return subjects.filter((subject) => {
      if (selectedSemester !== "all" && subject.semester !== selectedSemester) {
        return false;
      }
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = subject.name.toLowerCase().includes(query);
        const matchesCode = subject.code?.toLowerCase().includes(query);
        const matchesDesc = subject.description?.toLowerCase().includes(query);
        const matchesUnits = subject.units?.some(
          (u) =>
            u.title.toLowerCase().includes(query) ||
            u.topics?.some((t) => t.title.toLowerCase().includes(query)),
        );
        return matchesName || matchesCode || matchesDesc || matchesUnits;
      }
      return true;
    });
  }, [selectedSemester, searchQuery]);

  const coreSem3Subjects = useMemo(
    () => subjects.filter((s) => s.semester === 3),
    [],
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full text-foreground fade-in space-y-8 select-none">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Link to="/dashboard" className="hover:text-foreground transition-colors press">
          Dashboard
        </Link>
        <span>/</span>
        <span className="text-foreground font-medium">Subjects & Notes Directory</span>
      </div>

      {/* Hero Header Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-border glass-card p-6 sm:p-8 lg:p-10 shadow-xs">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold border border-amber-500/20">
            <Flame className="h-3.5 w-3.5 text-amber-500" />
            <span>Curriculum & Notes Hub</span>
            <span className="text-muted-foreground/40">·</span>
            <span className="text-muted-foreground font-medium">B.Tech CSE & IT</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight font-display text-foreground">
            Choose Your Course & Study Syllabus
          </h1>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Select any course below to explore unit lecture notes, runnable code implementations,
            algorithmic proofs, solved university exam questions, and rapid revision sheets.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
            <div className="bg-secondary/60 border border-border rounded-xl p-3">
              <span className="text-[11px] font-semibold text-muted-foreground block">Total Courses</span>
              <span className="text-xl font-extrabold text-foreground font-display">{totalSubjects}+ Subjects</span>
            </div>
            <div className="bg-secondary/60 border border-border rounded-xl p-3">
              <span className="text-[11px] font-semibold text-muted-foreground block">Syllabus Units</span>
              <span className="text-xl font-extrabold text-amber-600 dark:text-amber-400 font-display">{totalUnits}+ Units</span>
            </div>
            <div className="bg-secondary/60 border border-border rounded-xl p-3">
              <span className="text-[11px] font-semibold text-muted-foreground block">Detailed Topics</span>
              <span className="text-xl font-extrabold text-foreground font-display">{totalTopics}+ Topics</span>
            </div>
            <div className="bg-secondary/60 border border-border rounded-xl p-3">
              <span className="text-[11px] font-semibold text-muted-foreground block">Exam Solved</span>
              <span className="text-xl font-extrabold text-amber-500 font-display">100% Solved</span>
            </div>
          </div>

          {/* Quick Jump Bar */}
          <div className="relative z-10 mt-6 pt-5 border-t border-border flex items-center gap-2 overflow-x-auto no-scrollbar max-w-full pb-1">
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1.5 shrink-0">
              <Flame className="h-3.5 w-3.5 text-amber-500" />
              Quick Jump Sem 3:
            </span>
            {coreSem3Subjects.map((sub) => (
              <Link
                key={sub.id}
                to={`/subject/${sub.id}`}
                className="px-2.5 py-1 rounded-xl text-xs font-semibold bg-secondary hover:bg-secondary/80 text-foreground border border-border transition-all shrink-0 whitespace-nowrap press"
              >
                {sub.name.replace("Comprehensive University Syllabus for ", "").split("—")[0].trim()}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Search and Filters Section */}
      <div className="glass-card border border-border rounded-2xl p-4 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Semester Filter Tabs */}
          <div className="flex items-center gap-1 bg-secondary/60 p-1 rounded-xl border border-border overflow-x-auto scrollbar-none max-w-full">
            {[
              { label: "Semester 3 (Core)", val: 3 },
              { label: "Semester 2", val: 2 },
              { label: "Semester 1", val: 1 },
              { label: "All Semesters", val: "all" },
            ].map((sem) => {
              const isActive = selectedSemester === sem.val;
              return (
                <button
                  key={String(sem.val)}
                  type="button"
                  onClick={() => setSelectedSemester(sem.val as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "bg-primary text-primary-foreground font-bold shadow-xs"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  {sem.label}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by subject, code (CS301), or topic..."
              className="w-full h-10 pl-10 pr-4 rounded-xl border border-border bg-background text-xs sm:text-sm font-medium text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground font-semibold press cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
          <span>
            Showing <strong className="text-foreground">{filteredSubjects.length}</strong> {filteredSubjects.length === 1 ? "course" : "courses"}
            {selectedSemester !== "all" && ` in Semester ${selectedSemester}`}
            {searchQuery && ` matching "${searchQuery}"`}
          </span>
          <span>Click any course card to open syllabus units</span>
        </div>
      </div>

      {/* Subjects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredSubjects.map((sub) => {
          const topicIds = getAllTopicIds(sub.id);
          const progressPct = getSubjectProgress(topicIds);
          const hasImpQuestions = Boolean(SUBJECT_IMP_DATA[sub.id]);

          return (
            <SubjectCard
              key={sub.id}
              sub={sub}
              progressPct={progressPct}
              hasImpQuestions={hasImpQuestions}
              navigateRef={navigate}
            />
          );
        })}
      </div>

      <BackToTop />
    </div>
  );
}
