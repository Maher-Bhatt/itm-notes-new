import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { subjects, btechSubjects, bcaSubjects, getAllTopicIds } from "@/data/subjects";
import { useProgress } from "@/hooks/useProgress";
import { useUniversity } from "@/contexts/UniversityContext";
import { SUBJECT_IMP_DATA } from "@/data/impQuestionsData";
import {
  BookOpen,
  Search,
  ArrowRight,
  Flame,
  Zap,
  GraduationCap,
  Layers,
  Sparkles
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
  const isBca = sub.id?.startsWith("bca") || (sub.code || "").startsWith("BCA");

  return (
    <div
      onClick={() => navigateRef(`/subject/${sub.id}`)}
      className="group relative rounded-[22px] border border-[#E8E4DA] dark:border-neutral-800 bg-white dark:bg-[#1C1C1E] hover:border-[#2B4EFF]/50 transition-all p-5 flex flex-col justify-between gap-4 card-lift press cursor-pointer select-none shadow-xs"
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold bg-[#E6EAFD] text-[#2B4EFF] dark:bg-blue-950/40 dark:text-blue-300">
              {sub.code || "SUB"}
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#F6F3EC] dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
              {isBca ? "BCA" : "B.Tech"} · Sem {sub.semester}
            </span>
          </div>
          <span className="text-[11px] font-medium text-[#6B7280] dark:text-neutral-400 flex items-center gap-1">
            <BookOpen className="h-3 w-3" />
            {totalUnits} Units · {totalTopics} Topics
          </span>
        </div>

        <h3 className="font-bold text-base text-[#111111] dark:text-white group-hover:text-[#2B4EFF] transition-colors leading-snug">
          {sub.name}
        </h3>

        <p className="text-[11px] text-[#6B7280] dark:text-neutral-400 line-clamp-2 leading-relaxed">
          {sub.description || "Detailed syllabus notes, algorithmic proofs, diagrams, and exam review questions."}
        </p>

        {/* Units Chips */}
        <div className="pt-1">
          <div className="flex flex-wrap gap-1.5">
            {sub.units?.slice(0, 3).map((unit: any, idx: number) => (
              <span
                key={unit.id}
                className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#F6F3EC] dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-medium truncate max-w-[190px]"
                title={unit.title}
              >
                U{idx + 1}: {unit.title.replace(/^Unit \d+:\s*/i, "")}
              </span>
            ))}
            {totalUnits > 3 && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full text-[#6B7280] font-semibold">
                +{sub.units?.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Footer: Progress & Action */}
      <div className="pt-3 border-t border-[#EFECE6] dark:border-neutral-800 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-1 max-w-[140px]">
          <div className="h-1.5 flex-1 rounded-full bg-[#F6F3EC] dark:bg-neutral-800 overflow-hidden">
            <div
              className="h-full bg-[#2B4EFF] rounded-full transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <span className="text-[10px] font-mono text-neutral-500">{progressPct}%</span>
        </div>

        <div className="flex items-center gap-2">
          {hasImpQuestions && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                navigateRef(`/imp-questions/${sub.id}`);
              }}
              className="px-2.5 py-1 rounded-full bg-[#E6EAFD] hover:bg-[#D8E0FC] text-[#2B4EFF] font-bold text-[10px] press flex items-center gap-1 cursor-pointer"
              title="Solved Exam Questions"
            >
              <Zap className="h-3 w-3" />
              <span>IMP</span>
            </button>
          )}

          <span className="text-xs font-bold text-foreground group-hover:text-[#2B4EFF] group-hover:translate-x-1 transition-all flex items-center gap-1 font-display">
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
  const { currentUniversity } = useUniversity();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<"all" | "btech" | "bca">("all");
  const [selectedSemester, setSelectedSemester] = useState<number | "all">("all");

  const filteredSubjects = useMemo(() => {
    return subjects.filter((subject) => {
      // Degree filter
      const isBca = subject.id.startsWith("bca") || (subject.code || "").startsWith("BCA");
      if (selectedCourse === "bca" && !isBca) return false;
      if (selectedCourse === "btech" && isBca) return false;

      // Semester filter
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
  }, [selectedCourse, selectedSemester, searchQuery]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full text-foreground fade-in space-y-7 select-none">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Link to="/dashboard" className="hover:text-foreground transition-colors press">
          Dashboard
        </Link>
        <span>/</span>
        <span className="text-foreground font-medium">Subjects & Notes Directory</span>
      </div>

      {/* Hero Header Banner */}
      <div className="relative overflow-hidden rounded-[24px] border border-[#E8E4DA] dark:border-neutral-800 bg-white dark:bg-[#1C1C1E] p-6 sm:p-8 lg:p-10 shadow-xs">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E6EAFD] text-[#2B4EFF] dark:bg-blue-950/40 dark:text-blue-300 text-xs font-bold border border-[#2B4EFF]/20">
            <GraduationCap className="h-4 w-4 text-[#2B4EFF]" />
            <span>{currentUniversity.shortName} · Pan-India Academic Curriculum</span>
            <span className="text-muted-foreground/40">·</span>
            <span className="text-muted-foreground font-medium">{subjects.length} Verified Subjects</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight font-display text-[#111111] dark:text-white">
            Comprehensive Engineering & BCA Course Registry
          </h1>

          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Full semester syllabus notes, unit lecture notes, runnable code implementations,
            algorithmic proofs, solved university PYQ papers, and rapid revision sheets for B.Tech & BCA.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="bg-[#F6F3EC] dark:bg-neutral-800/80 border border-[#E8E4DA] dark:border-neutral-800 rounded-2xl p-3 text-center">
              <div className="text-xl sm:text-2xl font-black font-mono text-[#111111] dark:text-white">{subjects.length}</div>
              <div className="text-[10px] text-[#6B7280] dark:text-neutral-400 font-bold uppercase tracking-wider mt-0.5">Total Subjects</div>
            </div>
            <div className="bg-[#F6F3EC] dark:bg-neutral-800/80 border border-[#E8E4DA] dark:border-neutral-800 rounded-2xl p-3 text-center">
              <div className="text-xl sm:text-2xl font-black font-mono text-[#2B4EFF]">21</div>
              <div className="text-[10px] text-[#6B7280] dark:text-neutral-400 font-bold uppercase tracking-wider mt-0.5">B.Tech Engineering</div>
            </div>
            <div className="bg-[#F6F3EC] dark:bg-neutral-800/80 border border-[#E8E4DA] dark:border-neutral-800 rounded-2xl p-3 text-center">
              <div className="text-xl sm:text-2xl font-black font-mono text-emerald-600">30</div>
              <div className="text-[10px] text-[#6B7280] dark:text-neutral-400 font-bold uppercase tracking-wider mt-0.5">BCA Computer App</div>
            </div>
            <div className="bg-[#F6F3EC] dark:bg-neutral-800/80 border border-[#E8E4DA] dark:border-neutral-800 rounded-2xl p-3 text-center">
              <div className="text-xl sm:text-2xl font-black font-mono text-[#111111] dark:text-white">6 Semesters</div>
              <div className="text-[10px] text-[#6B7280] dark:text-neutral-400 font-bold uppercase tracking-wider mt-0.5">Full Coverage</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Chips & Search Bar */}
      <div className="rounded-[22px] bg-white dark:bg-[#1C1C1E] border border-[#E8E4DA] dark:border-neutral-800 p-4 sm:p-5 shadow-xs space-y-4">
        {/* Row 1: Degree Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs font-bold text-[#6B7280] shrink-0 mr-1">Degree:</span>
            {[
              { id: "all", label: `All Degrees (${subjects.length})` },
              { id: "btech", label: `B.Tech Engineering (${btechSubjects.length})` },
              { id: "bca", label: `BCA (${bcaSubjects.length} Subjects)` },
            ].map((course) => {
              const isActive = selectedCourse === course.id;
              return (
                <button
                  key={course.id}
                  type="button"
                  onClick={() => setSelectedCourse(course.id as any)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap border ${
                    isActive
                      ? "bg-[#2B4EFF] text-white border-[#2B4EFF] shadow-xs"
                      : "bg-[#F6F3EC] dark:bg-neutral-800 text-[#6B7280] dark:text-neutral-300 border-[#E8E4DA] dark:border-neutral-700 hover:text-[#111111] dark:hover:text-white"
                  }`}
                >
                  {course.label}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B7280]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search subject, code (e.g. BCA101, OS401)..."
              className="w-full h-10 pl-10 pr-4 rounded-full border border-[#E8E4DA] dark:border-neutral-800 bg-[#F6F3EC] dark:bg-neutral-900 text-xs font-medium text-[#111111] dark:text-white placeholder-[#6B7280] focus:outline-none focus:border-[#2B4EFF] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#6B7280] hover:text-[#111111] font-semibold cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Row 2: Semester Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none pt-1 border-t border-[#EFECE6] dark:border-neutral-800">
          <span className="text-xs font-bold text-[#6B7280] shrink-0 mr-1">Semester:</span>
          {[
            { label: "All Semesters", val: "all" },
            { label: "Sem 1", val: 1 },
            { label: "Sem 2", val: 2 },
            { label: "Sem 3", val: 3 },
            { label: "Sem 4", val: 4 },
            { label: "Sem 5", val: 5 },
            { label: "Sem 6", val: 6 },
          ].map((sem) => {
            const isActive = selectedSemester === sem.val;
            return (
              <button
                key={String(sem.val)}
                type="button"
                onClick={() => setSelectedSemester(sem.val as any)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "bg-[#111111] text-white dark:bg-white dark:text-[#111111] font-bold shadow-xs"
                    : "bg-[#F6F3EC] dark:bg-neutral-800 text-[#6B7280] dark:text-neutral-400 hover:text-[#111111] dark:hover:text-white"
                }`}
              >
                {sem.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between text-xs text-[#6B7280] px-1 pt-1">
          <span>
            Showing <strong className="text-[#111111] dark:text-white">{filteredSubjects.length}</strong> {filteredSubjects.length === 1 ? "subject" : "subjects"}
            {selectedSemester !== "all" && ` in Semester ${selectedSemester}`}
            {searchQuery && ` matching "${searchQuery}"`}
          </span>
          <span>Click any subject to start studying</span>
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
