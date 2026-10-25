import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { subjects, getAllTopicIds } from "@/data/subjects";
import { Subject } from "@/data/types";
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
  Sparkles,
  BookMarked,
  Filter,
  Flame,
} from "lucide-react";
import { BackToTop } from "@/components/BackToTop";

export default function SubjectsPage() {
  const navigate = useNavigate();
  const { semesterNumber } = useAcademic();
  const { getSubjectProgress } = useProgress();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSemester, setSelectedSemester] = useState<number | "all">(3); // Default to Semester 3 Core

  // Calculate high-level curriculum stats
  const totalSubjects = subjects.length;
  const totalUnits = useMemo(
    () => subjects.reduce((acc, sub) => acc + (sub.units?.length || 0), 0),
    []
  );
  const totalTopics = useMemo(
    () =>
      subjects.reduce(
        (acc, sub) =>
          acc +
          (sub.units?.reduce((uAcc, u) => uAcc + (u.topics?.length || 0), 0) || 0),
        0
      ),
    []
  );

  // Filter subjects based on semester and search query
  const filteredSubjects = useMemo(() => {
    return subjects.filter((subject) => {
      // Semester filter
      if (selectedSemester !== "all" && subject.semester !== selectedSemester) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = subject.name.toLowerCase().includes(query);
        const matchesCode = subject.code?.toLowerCase().includes(query);
        const matchesDesc = subject.description?.toLowerCase().includes(query);
        const matchesUnits = subject.units?.some(
          (u) =>
            u.title.toLowerCase().includes(query) ||
            u.topics?.some((t) => t.title.toLowerCase().includes(query))
        );
        return matchesName || matchesCode || matchesDesc || matchesUnits;
      }

      return true;
    });
  }, [selectedSemester, searchQuery]);

  // Quick jump core semester 3 subjects
  const coreSem3Subjects = useMemo(
    () => subjects.filter((s) => s.semester === 3),
    []
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full text-foreground animate-fade-in space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Link to="/dashboard" className="hover:text-primary transition-colors">
          Dashboard
        </Link>
        <span>/</span>
        <span className="text-foreground font-medium">Subjects & Notes Directory</span>
      </div>

      {/* Hero Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#183F36] via-[#12332C] to-[#0D2620] text-[#F5F1E8] border border-[#23584C] p-6 sm:p-8 lg:p-10 shadow-xl">
        {/* Subtle Decorative Elements */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-[#D6E85D]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 -mb-20 w-64 h-64 bg-[#183F36]/40 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D6E85D]/20 text-[#D6E85D] text-xs font-bold border border-[#D6E85D]/30 backdrop-blur-xs">
            <Sparkles className="h-3.5 w-3.5 text-[#D6E85D]" />
            <span>Curriculum & Notes Hub</span>
            <span className="text-white/40">·</span>
            <span>B.Tech CSE & IT</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight font-display text-white">
            Choose Your Course & Study Syllabus
          </h1>

          <p className="text-sm sm:text-base text-[#D4E0D6] leading-relaxed">
            Select any course below to explore unit-by-unit lecture notes, code implementations,
            algorithmic proofs, solved university exam questions, and last-night cheat sheets.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-3 backdrop-blur-xs">
              <span className="text-[11px] font-semibold text-[#D4E0D6] block">Total Courses</span>
              <span className="text-xl font-extrabold text-white font-display">{totalSubjects}+ Subjects</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-3 backdrop-blur-xs">
              <span className="text-[11px] font-semibold text-[#D4E0D6] block">Syllabus Units</span>
              <span className="text-xl font-extrabold text-[#D6E85D] font-display">{totalUnits}+ Units</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-3 backdrop-blur-xs">
              <span className="text-[11px] font-semibold text-[#D4E0D6] block">Detailed Topics</span>
              <span className="text-xl font-extrabold text-white font-display">{totalTopics}+ Topics</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-3 backdrop-blur-xs">
              <span className="text-[11px] font-semibold text-[#D4E0D6] block">Exam Solved</span>
              <span className="text-xl font-extrabold text-[#D6E85D] font-display">100% Verified</span>
            </div>
          </div>
        </div>

        {/* Quick Jump Bar */}
        <div className="relative z-10 mt-6 pt-5 border-t border-white/10 flex items-center gap-2 overflow-x-auto scrollbar-none max-w-full pb-1">
          <span className="text-xs font-bold text-[#D6E85D] flex items-center gap-1.5 shrink-0">
            <Flame className="h-3.5 w-3.5" />
            Quick Access Sem 3:
          </span>
          {coreSem3Subjects.map((sub) => (
            <Link
              key={sub.id}
              to={`/subject/${sub.id}`}
              className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white/10 hover:bg-[#D6E85D] hover:text-[#183F36] text-white border border-white/15 transition-all shrink-0 whitespace-nowrap"
            >
              {sub.name.replace("Comprehensive University Syllabus for ", "").split("—")[0].trim()}
            </Link>
          ))}
        </div>
      </div>

      {/* Search and Filters Section */}
      <div className="bg-card border border-border/80 rounded-2xl p-4 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Semester Filter Tabs */}
          <div className="flex items-center gap-1.5 bg-secondary/60 p-1 rounded-xl border border-border/60 overflow-x-auto scrollbar-none max-w-full">
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
                      ? "bg-[#183F36] text-[#D6E85D] font-bold shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
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
              placeholder="Search by subject, course code (CS301, CS401), or topic..."
              className="w-full h-10 pl-10 pr-4 rounded-xl border border-border bg-background text-xs sm:text-sm font-medium text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground font-semibold"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Status count summary */}
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
      {filteredSubjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSubjects.map((sub) => {
            const topicIds = getAllTopicIds(sub.id);
            const progressPct = getSubjectProgress(topicIds);
            const totalSubUnits = sub.units?.length || 0;
            const totalSubTopics = topicIds.length;
            const hasImpQuestions = Boolean(SUBJECT_IMP_DATA[sub.id]);

            return (
              <div
                key={sub.id}
                className="group relative rounded-2xl border border-border/80 bg-card hover:bg-secondary/20 hover:border-primary/50 transition-all p-5 flex flex-col justify-between gap-4 shadow-xs hover:shadow-md"
              >
                <div className="space-y-3">
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="px-2.5 py-0.5 rounded-md font-mono text-[10px] font-bold bg-primary/10 text-primary border border-primary/20">
                        {sub.code || "SUB"}
                      </span>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-secondary text-muted-foreground">
                        Semester {sub.semester}
                      </span>
                    </div>

                    <span className="text-[11px] font-semibold text-muted-foreground flex items-center gap-1">
                      <BookOpen className="h-3 w-3 text-[#D6E85D]" />
                      {totalSubUnits} Units · {totalSubTopics} Topics
                    </span>
                  </div>

                  {/* Subject Title */}
                  <h3 className="font-bold text-base text-foreground group-hover:text-primary transition-colors leading-snug">
                    <Link to={`/subject/${sub.id}`} className="hover:underline">
                      {sub.name}
                    </Link>
                  </h3>

                  {/* Subject Description */}
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {sub.description ||
                      "Detailed syllabus notes, algorithmic proofs, diagrams, and exam review questions."}
                  </p>

                  {/* Progress Indicator */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                      <span className="font-medium">Curriculum Progress</span>
                      <span className="font-bold text-primary tabular-nums">{progressPct}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-500 rounded-full"
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                  </div>

                  {/* Units Snapshot Chips */}
                  <div className="pt-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80 block mb-1.5">
                      Syllabus Units:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {sub.units?.slice(0, 3).map((unit, idx) => (
                        <span
                          key={unit.id}
                          className="text-[10px] px-2 py-1 rounded-md bg-secondary/80 text-foreground/90 font-medium truncate max-w-[200px]"
                          title={unit.title}
                        >
                          U{idx + 1}: {unit.title.replace(/^Unit \d+:\s*/i, "")}
                        </span>
                      ))}
                      {totalSubUnits > 3 && (
                        <span className="text-[10px] px-2 py-1 rounded-md bg-muted text-muted-foreground font-semibold">
                          +{totalSubUnits - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-3 border-t border-border/60 flex flex-col gap-2">
                  <button
                    onClick={() => navigate(`/subject/${sub.id}`)}
                    className="w-full py-2.5 px-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <span>Explore Units & Notes</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>

                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <button
                      onClick={() => navigate(`/subject/${sub.id}/cheat-sheet`)}
                      className="py-1.5 px-2 rounded-lg border border-amber-500/30 bg-amber-500/5 hover:bg-amber-500/10 text-amber-700 dark:text-amber-400 font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      title="Formulas, proofs & rapid revision"
                    >
                      <Zap className="h-3 w-3" />
                      <span>Cheat Sheet</span>
                    </button>

                    {hasImpQuestions ? (
                      <button
                        onClick={() => navigate(`/imp-questions/${sub.id}`)}
                        className="py-1.5 px-2 rounded-lg border border-primary/20 bg-primary/5 hover:bg-primary/10 text-primary font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                        title="Solved 3, 5, 7 marks university questions"
                      >
                        <HelpCircle className="h-3 w-3" />
                        <span>IMP Questions</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => navigate(`/materials?subject=${sub.id}`)}
                        className="py-1.5 px-2 rounded-lg border border-border bg-secondary/50 hover:bg-secondary text-foreground font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer"
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
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="p-12 text-center rounded-2xl border border-dashed border-border bg-card space-y-3">
          <BookOpen className="h-10 w-10 text-muted-foreground mx-auto" />
          <h3 className="text-base font-bold text-foreground">No subjects found</h3>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            No courses match "{searchQuery}" in the selected semester. Try clearing your search or
            switching semesters.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedSemester("all");
            }}
            className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold transition-all cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}

      <BackToTop />
    </div>
  );
}
