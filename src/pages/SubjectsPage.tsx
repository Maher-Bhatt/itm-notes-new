import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { subjects, getAllTopicIds } from "@/data/subjects";
import { useProgress } from "@/hooks/useProgress";
import { useAcademic } from "@/contexts/AcademicContext";
import { SUBJECT_IMP_DATA } from "@/data/impQuestionsData";
import {
  BookOpen,
  Search,
  Layers,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  FolderDown,
  HelpCircle,
  Zap,
  GraduationCap,
  Flame,
} from "lucide-react";
import { BackToTop } from "@/components/BackToTop";

function SubjectCard({ sub, progressPct, hasImpQuestions, navigateRef }: { sub: any; progressPct: number; hasImpQuestions: boolean; navigateRef: any }) {
  const totalUnits = sub.units?.length || 0;
  const totalTopics = sub.units?.reduce((acc, u) => acc + (u.topics?.length || 0), 0) || 0;
  const allTopicIds = getAllTopicIds(sub.id);
  const userCompletedInSub = progressPct > 0 ? Math.round((progressPct / 100) * totalTopics) : 0;
  const firstTopicId = sub.units?.[0]?.topics?.[0]?.id;

  return (
    <div key={sub.id} className="group relative rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-primary/30 transition-all p-5 flex flex-col justify-between gap-4 card-lift press">
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <span className="px-2.5 py-0.5 rounded-md font-mono text-[10px] font-bold bg-primary/10 text-primary border border-primary/20">
              {sub.code || "SUB"}
            </span>
            <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-white/10 text-white/60">
              Semester {sub.semester}
            </span>
          </div>
          <span className="text-[11px] font-semibold text-white/60 flex items-center gap-1">
            <BookOpen className="h-3 w-3 text-accent-foreground" />
            {totalUnits} Units · {totalTopics} Topics
          </span>
        </div>

        <h3 className="font-bold text-base text-white group-hover:text-primary transition-colors leading-snug">
          <Link to={`/subject/${sub.id}`} className="hover:underline press">
            {sub.name}
          </Link>
        </h3>

        <p className="text-[11px] text-white/60 line-clamp-2 leading-relaxed">
          {sub.description || "Detailed syllabus notes, algorithmic proofs, diagrams, and exam review questions."}
        </p>

        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between text-[11px] text-white/60">
            <span className="font-medium">Curriculum Progress</span>
            <span className="font-bold text-primary tabular-nums">{progressPct}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full bg-gradient-electric transition-all duration-500 rounded-full" style={{ width: `${progressPct}%` }} />
          </div>
        </div>

        <div className="pt-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-white/50 block mb-1.5">
            Syllabus Units:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {sub.units?.slice(0, 3).map((unit, idx) => (
              <span
                key={unit.id}
                className="text-[10px] px-2 py-1 rounded-md bg-white/10 text-white/80 font-medium truncate max-w-[200px]"
                title={unit.title}
              >
                U{idx + 1}: {unit.title.replace(/^Unit \d+:\s*/i, "")}
              </span>
            ))}
            {totalUnits > 3 && (
              <span className="text-[10px] px-2 py-1 rounded-md bg-white/10 text-white/60 font-semibold">
                +{sub.units?.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
        <button
          onClick={() => navigateRef(`/subject/${sub.id}`)}
          className="w-full py-2.5 px-3 rounded-xl bg-gradient-electric text-white font-bold text-xs shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer press font-display"
        >
          <span>Explore Units & Notes</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>

        <div className="grid grid-cols-2 gap-2 text-[11px]">
          <button
            onClick={() => navigateRef(`/subject/${sub.id}/cheat-sheet`)}
            className="py-1.5 px-2 rounded-xl border border-accent/30 bg-accent/10 hover:bg-accent/20 text-accent-foreground font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer press"
            title="Formulas, proofs & rapid revision"
          >
            <Zap className="h-3 w-3" />
            <span>Cheat Sheet</span>
          </button>

          {hasImpQuestions ? (
            <button
              onClick={() => navigateRef(`/imp-questions/${sub.id}`)}
              className="py-1.5 px-2 rounded-xl border border-primary/20 bg-primary/10 hover:bg-primary/20 text-primary font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer press"
              title="Solved 3, 5, 7 marks university questions"
            >
              <HelpCircle className="h-3 w-3" />
              <span>IMP Questions</span>
            </button>
          ) : (
            <button
              onClick={() => navigateRef(`/materials?subject=${sub.id}`)}
              className="py-1.5 px-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer press"
              title="Download PDFs and lab manuals"
            >
              <FolderDown className="h-3 w-3" />
              <span>PDF Materials</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SubjectsPage() {
  const navigate = useNavigate();
  const { semesterNumber } = useAcademic();
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
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full text-white fade-in space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-white/50">
        <Link to="/dashboard" className="hover:text-white transition-colors press">
          Dashboard
        </Link>
        <span>/</span>
        <span className="text-white font-medium">Subjects & Notes Directory</span>
      </div>

      {/* Hero Header Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 lg:p-10 shadow-lg shadow-black/30">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 -mb-20 w-64 h-64 bg-primary/20 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 text-accent-foreground text-xs font-bold border border-accent/30 backdrop-blur-xs">
            <Flame className="h-3.5 w-3.5 text-accent-foreground" />
            <span>Curriculum & Notes Hub</span>
            <span className="text-white/40">·</span>
            <span>B.Tech CSE & IT</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight font-display text-white">
            Choose Your Course & Study Syllabus
          </h1>

          <p className="text-sm sm:text-base text-white/80 leading-relaxed">
            Select any course below to explore unit-by-unit lecture notes, code implementations,
            algorithmic proofs, solved university exam questions, and last-night cheat sheets.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
            <div className="bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-xs">
              <span className="text-[11px] font-semibold text-white/40 block">Total Courses</span>
              <span className="text-xl font-extrabold text-white font-display">{totalSubjects}+ Subjects</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-xs">
              <span className="text-[11px] font-semibold text-white/40 block">Syllabus Units</span>
              <span className="text-xl font-extrabold text-accent-foreground font-display">{totalUnits}+ Units</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-xs">
              <span className="text-[11px] font-semibold text-white/40 block">Detailed Topics</span>
              <span className="text-xl font-extrabold text-white font-display">{totalTopics}+ Topics</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-xs">
              <span className="text-[11px] font-semibold text-white/40 block">Exam Solved</span>
              <span className="text-xl font-extrabold text-accent-foreground font-display">100% Verified</span>
            </div>
          </div>

          {/* Quick Jump Bar */}
          <div className="relative z-10 mt-6 pt-5 border-t border-white/10 flex items-center gap-2 overflow-x-auto no-scrollbar max-w-full pb-1">
            <span className="text-xs font-bold text-accent-foreground flex items-center gap-1.5 shrink-0">
              <Flame className="h-3.5 w-3.5" />
              Quick Access Sem 3:
            </span>
            {coreSem3Subjects.map((sub) => (
              <Link
                key={sub.id}
                to={`/subject/${sub.id}`}
                className="px-2.5 py-1 rounded-xl text-xs font-semibold bg-white/10 hover:bg-accent hover:text-white text-white border border-white/15 transition-all shrink-0 whitespace-nowrap press"
              >
                {sub.name.replace("Comprehensive University Syllabus for ", "").split("—")[0].trim()}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Search and Filters Section */}
      <div className="glass-card border border-white/10 rounded-2xl p-4 shadow-lg shadow-black/20 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Semester Filter Tabs */}
          <div className="flex items-center gap-1 bg-white/10 p-1 rounded-xl border border-white/10 overflow-x-auto scrollbar-none max-w-full">
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
                      ? "bg-gradient-electric text-white font-bold shadow-lg shadow-primary/30"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {sem.label}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/60" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by subject, course code (CS301, CS401), or topic..."
              className="w-full h-10 pl-10 pr-4 rounded-xl border border-white/10 bg-background text-xs sm:text-sm font-medium text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-ring transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/60 hover:text-white font-semibold press"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-white/60 px-1">
          <span>
            Showing <strong className="text-white">{filteredSubjects.length}</strong> {filteredSubjects.length === 1 ? "course" : "courses"}
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
          const totalSubUnits = sub.units?.length || 0;
          const totalSubTopics = topicIds.length;
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