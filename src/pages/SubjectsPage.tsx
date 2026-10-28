import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { subjects, btechSubjects, bcaSubjects, getAllTopicIds } from "@/data/subjects";
import { 
  DEPARTMENT_CURRICULA, 
  getAllDepartments, 
  getDepartmentById, 
  getCurriculumStats,
  getAllSpecializations,
  getSpecializationById,
  ProgramSpecialization,
  DepartmentCurriculum 
} from "@/data/department-curriculum";
import { useProgress } from "@/hooks/useProgress";
import { useUniversity } from "@/contexts/UniversityContext";
import { SUBJECT_IMP_DATA } from "@/data/impQuestionsData";
import {
  BookOpen,
  Search,
  ArrowRight,
  Zap,
  GraduationCap,
  Layers,
  Sparkles,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Code,
  Cpu,
  Server,
  Radio,
  Cog,
  Building,
  CheckCircle2,
  Bookmark,
  Award,
  Shield,
  Cloud,
  Bot,
  Brain,
  BarChart3,
  ListChecks
} from "lucide-react";
import { BackToTop } from "@/components/BackToTop";

// Department icon helper
function getDeptIcon(id: string) {
  switch (id) {
    case "cse": return <Code className="h-4 w-4" />;
    case "aids": return <Cpu className="h-4 w-4" />;
    case "it": return <Server className="h-4 w-4" />;
    case "ece": return <Radio className="h-4 w-4" />;
    case "eee": return <Zap className="h-4 w-4" />;
    case "me": return <Cog className="h-4 w-4" />;
    case "ce": return <Building className="h-4 w-4" />;
    case "bca": return <Layers className="h-4 w-4" />;
    case "mca": return <Sparkles className="h-4 w-4" />;
    default: return <GraduationCap className="h-4 w-4" />;
  }
}

// Specialization icon helper
function getSpecIcon(id: string) {
  if (id.includes("ai") || id.includes("aiml")) return <Brain className="h-4 w-4" />;
  if (id.includes("robotics")) return <Bot className="h-4 w-4" />;
  if (id.includes("cyber")) return <Shield className="h-4 w-4" />;
  if (id.includes("cloud") || id.includes("devops")) return <Cloud className="h-4 w-4" />;
  return <Code className="h-4 w-4" />;
}

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

  // Tab View Mode: "interactive" notes vs "specializations" deep research vs "curriculum" directory
  const [activeTab, setActiveTab] = useState<"interactive" | "specializations" | "curriculum">("interactive");

  // Filters for Interactive Notes
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<"all" | "btech" | "bca">("all");
  const [selectedSemester, setSelectedSemester] = useState<number | "all">("all");

  // Filters for Specializations (Deep Research Explorer)
  const [selectedSpecId, setSelectedSpecId] = useState<string>("btech-ai-ds");

  // Filters for Curriculum Directory
  const [selectedDeptId, setSelectedDeptId] = useState<string>("cse");
  const [curriculumSearch, setCurriculumSearch] = useState("");

  const curriculumStats = useMemo(() => getCurriculumStats(), []);
  const allDepts = useMemo(() => getAllDepartments(), []);
  const allSpecs = useMemo(() => getAllSpecializations(), []);
  const activeDept = useMemo(() => getDepartmentById(selectedDeptId) || allDepts[0], [selectedDeptId, allDepts]);
  const activeSpec = useMemo(() => getSpecializationById(selectedSpecId) || allSpecs[0], [selectedSpecId, allSpecs]);

  // Filtered interactive subjects
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
        <span className="text-foreground font-medium">Pan-India University Academic Registry</span>
      </div>

      {/* Hero Header Banner */}
      <div className="relative overflow-hidden rounded-[24px] border border-[#E8E4DA] dark:border-neutral-800 bg-white dark:bg-[#1C1C1E] p-6 sm:p-8 lg:p-10 shadow-xs">
        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E6EAFD] text-[#2B4EFF] dark:bg-blue-950/40 dark:text-blue-300 text-xs font-bold border border-[#2B4EFF]/20">
            <GraduationCap className="h-4 w-4 text-[#2B4EFF]" />
            <span>{currentUniversity.shortName} · AICTE & UGC Accredited Multi-Department Curriculum</span>
            <span className="text-muted-foreground/40">·</span>
            <span className="text-muted-foreground font-medium">{subjects.length} Interactive Subjects</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight font-display text-[#111111] dark:text-white">
            Engineering, BCA & Department Specialization Suite
          </h1>

          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Deep-researched curricula for <strong>B.Tech in Artificial Intelligence (AI & DS, AI & ML, Robotics & AI)</strong>, 
            <strong> Cyber Security</strong>, <strong> Cloud & DevOps</strong>, <strong> BCA Specializations</strong>, and <strong> MCA</strong>. Access exact course counts, credit structures, theory lecture notes, and practice MCQs.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="bg-[#F6F3EC] dark:bg-neutral-800/80 border border-[#E8E4DA] dark:border-neutral-800 rounded-2xl p-3 text-center">
              <div className="text-xl sm:text-2xl font-black font-mono text-[#111111] dark:text-white">{curriculumStats.totalSubjectsAcrossAllDepts}</div>
              <div className="text-[10px] text-[#6B7280] dark:text-neutral-400 font-bold uppercase tracking-wider mt-0.5">Cataloged Subjects</div>
            </div>
            <div className="bg-[#F6F3EC] dark:bg-neutral-800/80 border border-[#E8E4DA] dark:border-neutral-800 rounded-2xl p-3 text-center">
              <div className="text-xl sm:text-2xl font-black font-mono text-[#2B4EFF]">{subjects.length}</div>
              <div className="text-[10px] text-[#6B7280] dark:text-neutral-400 font-bold uppercase tracking-wider mt-0.5">Interactive Subjects</div>
            </div>
            <div className="bg-[#F6F3EC] dark:bg-neutral-800/80 border border-[#E8E4DA] dark:border-neutral-800 rounded-2xl p-3 text-center">
              <div className="text-xl sm:text-2xl font-black font-mono text-emerald-600">{allSpecs.length} Tracks</div>
              <div className="text-[10px] text-[#6B7280] dark:text-neutral-400 font-bold uppercase tracking-wider mt-0.5">Specialized Degrees</div>
            </div>
            <div className="bg-[#F6F3EC] dark:bg-neutral-800/80 border border-[#E8E4DA] dark:border-neutral-800 rounded-2xl p-3 text-center">
              <div className="text-xl sm:text-2xl font-black font-mono text-[#111111] dark:text-white">160 Credits</div>
              <div className="text-[10px] text-[#6B7280] dark:text-neutral-400 font-bold uppercase tracking-wider mt-0.5">AICTE CBCS Benchmark</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main View Mode Tabs (3 Tabs) */}
      <div className="flex items-center gap-2 border-b border-[#E8E4DA] dark:border-neutral-800 pb-3 overflow-x-auto scrollbar-none">
        <button
          type="button"
          onClick={() => setActiveTab("interactive")}
          className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
            activeTab === "interactive"
              ? "bg-[#2B4EFF] text-white shadow-xs"
              : "bg-[#F6F3EC] dark:bg-neutral-800 text-[#6B7280] hover:text-[#111111] dark:hover:text-white"
          }`}
        >
          <BookOpen className="h-4 w-4" />
          <span>Interactive Study Notes ({subjects.length} Subjects)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("specializations")}
          className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
            activeTab === "specializations"
              ? "bg-[#2B4EFF] text-white shadow-xs"
              : "bg-[#F6F3EC] dark:bg-neutral-800 text-[#6B7280] hover:text-[#111111] dark:hover:text-white"
          }`}
        >
          <Brain className="h-4 w-4" />
          <span>Specializations & Course Counts (Deep Research)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("curriculum")}
          className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
            activeTab === "curriculum"
              ? "bg-[#2B4EFF] text-white shadow-xs"
              : "bg-[#F6F3EC] dark:bg-neutral-800 text-[#6B7280] hover:text-[#111111] dark:hover:text-white"
          }`}
        >
          <GraduationCap className="h-4 w-4" />
          <span>Pan-India Department Catalog ({curriculumStats.totalSubjectsAcrossAllDepts} Subjects)</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* VIEW 1: INTERACTIVE STUDY SUBJECTS */}
      {/* ========================================================================= */}
      {activeTab === "interactive" && (
        <div className="space-y-6">
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
                  placeholder="Search subject, code (e.g. BCA101, CD601, OS)..."
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

            {/* Row 2: Semester Pills (Sem 1 to Sem 8) */}
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
                { label: "Sem 7", val: 7 },
                { label: "Sem 8", val: 8 },
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
              <span>Click any subject to open rich lecture notes & MCQs</span>
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
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 2: DEGREE SPECIALIZATIONS & EXACT COURSE COUNTS (DEEP RESEARCH) */}
      {/* ========================================================================= */}
      {activeTab === "specializations" && (
        <div className="space-y-6">
          {/* Specialization Selection Header */}
          <div className="rounded-[22px] bg-white dark:bg-[#1C1C1E] border border-[#E8E4DA] dark:border-neutral-800 p-4 sm:p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">
                Select Degree Program & Specialization Track:
              </span>
              <span className="text-xs font-semibold text-[#2B4EFF] bg-[#E6EAFD] dark:bg-blue-950/40 px-2.5 py-0.5 rounded-full">
                AICTE 160-Credit Verified
              </span>
            </div>

            {/* Specialization Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {allSpecs.map((spec) => {
                const isSelected = selectedSpecId === spec.id;
                return (
                  <button
                    key={spec.id}
                    type="button"
                    onClick={() => setSelectedSpecId(spec.id)}
                    className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 border ${
                      isSelected
                        ? "bg-[#2B4EFF] text-white border-[#2B4EFF] shadow-xs"
                        : "bg-[#F6F3EC] dark:bg-neutral-800 text-[#6B7280] dark:text-neutral-300 border-[#E8E4DA] dark:border-neutral-700 hover:text-[#111111] dark:hover:text-white"
                    }`}
                  >
                    {getSpecIcon(spec.id)}
                    <span>{spec.shortName}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? "bg-white/20 text-white" : "bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300"}`}>
                      {spec.specializationSubjectsCount} Core AI/Spec
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Specialization Master Metrics Card */}
            <div className="bg-[#FAF8F5] dark:bg-neutral-800/80 rounded-2xl p-5 border border-[#E8E4DA] dark:border-neutral-700 space-y-4">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-xl font-extrabold text-[#111111] dark:text-white font-display">
                      {activeSpec.name}
                    </h2>
                    <span className="px-3 py-0.5 rounded-full text-[11px] font-bold bg-[#E6EAFD] text-[#2B4EFF] dark:bg-blue-950/40 dark:text-blue-300">
                      {activeSpec.degree} · {activeSpec.durationYears} Years ({activeSpec.totalSemesters} Semesters)
                    </span>
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 max-w-3xl leading-relaxed">
                    Detailed curriculum analysis answering: <strong>"How many subjects and courses are in {activeSpec.shortName}?"</strong>
                  </p>
                </div>

                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>AICTE Standard Model Grounded</span>
                </div>
              </div>

              {/* Exact Subject Counts Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
                <div className="bg-white dark:bg-neutral-900 border border-[#E8E4DA] dark:border-neutral-800 rounded-xl p-3 text-center">
                  <div className="text-2xl font-black font-mono text-[#2B4EFF]">{activeSpec.totalCredits}</div>
                  <div className="text-[10px] text-[#6B7280] font-bold uppercase tracking-wider mt-0.5">Total Credits</div>
                </div>

                <div className="bg-white dark:bg-neutral-900 border border-[#E8E4DA] dark:border-neutral-800 rounded-xl p-3 text-center">
                  <div className="text-2xl font-black font-mono text-[#111111] dark:text-white">{activeSpec.totalCoursesCount}</div>
                  <div className="text-[10px] text-[#6B7280] font-bold uppercase tracking-wider mt-0.5">Total Degree Courses</div>
                </div>

                <div className="bg-white dark:bg-neutral-900 border border-[#E8E4DA] dark:border-neutral-800 rounded-xl p-3 text-center">
                  <div className="text-2xl font-black font-mono text-purple-600">{activeSpec.theorySubjectsCount}</div>
                  <div className="text-[10px] text-[#6B7280] font-bold uppercase tracking-wider mt-0.5">Theory Subjects</div>
                </div>

                <div className="bg-white dark:bg-neutral-900 border border-[#E8E4DA] dark:border-neutral-800 rounded-xl p-3 text-center">
                  <div className="text-2xl font-black font-mono text-emerald-600">{activeSpec.specializationSubjectsCount}</div>
                  <div className="text-[10px] text-[#6B7280] font-bold uppercase tracking-wider mt-0.5">Dedicated Spec Core</div>
                </div>

                <div className="bg-white dark:bg-neutral-900 border border-[#E8E4DA] dark:border-neutral-800 rounded-xl p-3 text-center">
                  <div className="text-2xl font-black font-mono text-amber-600">{activeSpec.practicalLabsCount}</div>
                  <div className="text-[10px] text-[#6B7280] font-bold uppercase tracking-wider mt-0.5">Practical Labs</div>
                </div>

                <div className="bg-white dark:bg-neutral-900 border border-[#E8E4DA] dark:border-neutral-800 rounded-xl p-3 text-center">
                  <div className="text-2xl font-black font-mono text-rose-600">{activeSpec.capstoneProjectsCount}</div>
                  <div className="text-[10px] text-[#6B7280] font-bold uppercase tracking-wider mt-0.5">Projects / Internships</div>
                </div>
              </div>

              {/* Category Breakdown Bar */}
              <div className="pt-2 border-t border-[#E8E4DA] dark:border-neutral-700 space-y-2">
                <div className="text-xs font-bold text-[#6B7280] flex items-center justify-between">
                  <span>Credit Category Distribution (AICTE Model):</span>
                  <span>Basic Science ({activeSpec.categoryBreakdown.basicSciences} Cr) · Core Spec ({activeSpec.categoryBreakdown.specializationDomain} Cr)</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                  <div className="p-2 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                    <span className="text-[#6B7280] block text-[10px]">Basic Sciences (BSC):</span>
                    <strong className="text-neutral-800 dark:text-neutral-200">{activeSpec.categoryBreakdown.basicSciences} Credits</strong>
                  </div>
                  <div className="p-2 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                    <span className="text-[#6B7280] block text-[10px]">Engineering Sciences (ESC):</span>
                    <strong className="text-neutral-800 dark:text-neutral-200">{activeSpec.categoryBreakdown.engineeringSciences} Credits</strong>
                  </div>
                  <div className="p-2 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                    <span className="text-[#6B7280] block text-[10px]">Specialization Domain (PCC):</span>
                    <strong className="text-[#2B4EFF]">{activeSpec.categoryBreakdown.specializationDomain} Credits</strong>
                  </div>
                  <div className="p-2 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                    <span className="text-[#6B7280] block text-[10px]">Professional Electives (PEC):</span>
                    <strong className="text-emerald-600">{activeSpec.categoryBreakdown.electives} Credits</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section: Exact Specialization Subjects List */}
          <div className="rounded-[22px] bg-white dark:bg-[#1C1C1E] border border-[#E8E4DA] dark:border-neutral-800 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div>
                <h3 className="font-extrabold text-base text-[#111111] dark:text-white flex items-center gap-2">
                  <ListChecks className="h-5 w-5 text-[#2B4EFF]" />
                  <span>The {activeSpec.specializationSubjectsCount} Dedicated Subjects in {activeSpec.shortName}</span>
                </h3>
                <p className="text-xs text-[#6B7280] dark:text-neutral-400 mt-0.5">
                  Every specialized course taught across semesters with course code, credit weight, and domain area.
                </p>
              </div>

              <span className="text-xs font-mono text-[#6B7280]">
                {activeSpec.specializationSubjects.length} of {activeSpec.specializationSubjectsCount} listed
              </span>
            </div>

            {/* Specialization Subjects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              {activeSpec.specializationSubjects.map((sub, idx) => (
                <div
                  key={sub.code}
                  className="rounded-2xl border border-[#E8E4DA] dark:border-neutral-800 bg-[#FAF8F5] dark:bg-[#151516] p-4 flex flex-col justify-between gap-2 hover:border-[#2B4EFF]/40 transition-all"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="h-5 w-5 rounded-full bg-[#2B4EFF] text-white flex items-center justify-center font-bold text-[10px]">
                          {idx + 1}
                        </span>
                        <span className="px-2 py-0.5 rounded-full font-mono text-[10px] font-bold bg-[#E6EAFD] text-[#2B4EFF] dark:bg-blue-950/40 dark:text-blue-300">
                          {sub.code}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700">
                        Sem {sub.semester} · {sub.credits} Cr
                      </span>
                    </div>

                    <h4 className="font-bold text-sm text-[#111111] dark:text-white leading-snug">
                      {sub.name}
                    </h4>

                    <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                      {sub.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#E8E4DA] dark:border-neutral-800 flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#E6EAFD] text-[#2B4EFF] dark:bg-blue-950/40 dark:text-blue-300">
                      {sub.category}
                    </span>
                    <span className="text-[10px] font-mono text-[#6B7280]">
                      Semester {sub.semester}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Learning Roadmap */}
          <div className="rounded-[22px] bg-white dark:bg-[#1C1C1E] border border-[#E8E4DA] dark:border-neutral-800 p-5 sm:p-6 shadow-xs space-y-4">
            <h3 className="font-extrabold text-base text-[#111111] dark:text-white flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-[#2B4EFF]" />
              <span>{activeSpec.shortName} Curricular Progression Roadmap</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {activeSpec.learningRoadmap.map((stage, idx) => (
                <div key={stage.stage} className="rounded-2xl bg-[#FAF8F5] dark:bg-neutral-800/60 p-4 border border-[#E8E4DA] dark:border-neutral-700 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="h-6 w-6 rounded-full bg-[#111111] text-white dark:bg-white dark:text-[#111111] flex items-center justify-center font-bold text-xs">
                      {idx + 1}
                    </span>
                    <span className="text-[11px] font-bold text-[#2B4EFF]">{stage.semesters}</span>
                  </div>
                  <h4 className="font-bold text-xs text-[#111111] dark:text-white">{stage.stage}</h4>
                  <p className="text-[11px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    <strong>Focus:</strong> {stage.focus}
                  </p>
                  <div className="pt-1 text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 p-2 rounded-lg">
                    🎯 {stage.milestone}
                  </div>
                </div>
              ))}
            </div>

            {/* Target Career Roles */}
            <div className="pt-3 border-t border-[#E8E4DA] dark:border-neutral-800 flex items-center gap-2 flex-wrap text-xs">
              <span className="font-bold text-[#6B7280]">Target Career Placements:</span>
              {activeSpec.careerRoles.map((role) => (
                <span key={role} className="px-2.5 py-0.5 rounded-full bg-[#F6F3EC] dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 font-semibold text-[11px] border border-neutral-300 dark:border-neutral-700">
                  {role}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 3: PAN-INDIA DEPARTMENT CURRICULUM CATALOG */}
      {/* ========================================================================= */}
      {activeTab === "curriculum" && (
        <div className="space-y-6">
          {/* Department Selection Bar */}
          <div className="rounded-[22px] bg-white dark:bg-[#1C1C1E] border border-[#E8E4DA] dark:border-neutral-800 p-4 sm:p-5 shadow-xs space-y-4">
            <div className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">
              Select Department / Discipline:
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {allDepts.map((dept) => {
                const isSelected = selectedDeptId === dept.id;
                return (
                  <button
                    key={dept.id}
                    type="button"
                    onClick={() => {
                      setSelectedDeptId(dept.id);
                      setCurriculumSearch("");
                    }}
                    className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 border ${
                      isSelected
                        ? "bg-[#2B4EFF] text-white border-[#2B4EFF] shadow-xs"
                        : "bg-[#F6F3EC] dark:bg-neutral-800 text-[#6B7280] dark:text-neutral-300 border-[#E8E4DA] dark:border-neutral-700 hover:text-[#111111] dark:hover:text-white"
                    }`}
                  >
                    {getDeptIcon(dept.id)}
                    <span>{dept.shortName}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? "bg-white/20 text-white" : "bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300"}`}>
                      {dept.totalSubjects}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Department Quick Detail Card */}
            <div className="bg-[#F6F3EC] dark:bg-neutral-800/80 rounded-2xl p-4 sm:p-5 border border-[#E8E4DA] dark:border-neutral-700 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-lg text-[#111111] dark:text-white">{activeDept.name}</span>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#E6EAFD] text-[#2B4EFF] dark:bg-blue-950/40 dark:text-blue-300">
                      {activeDept.degree} · {activeDept.durationYears} Years
                    </span>
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 max-w-3xl leading-relaxed">
                    {activeDept.description}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <div className="text-xl font-black font-mono text-[#2B4EFF]">{activeDept.totalSubjects}</div>
                    <div className="text-[10px] text-[#6B7280] font-bold uppercase">Theory Subjects</div>
                  </div>
                  <div className="h-8 w-px bg-neutral-300 dark:bg-neutral-700" />
                  <div className="text-right">
                    <div className="text-xl font-black font-mono text-[#111111] dark:text-white">{activeDept.totalCredits}</div>
                    <div className="text-[10px] text-[#6B7280] font-bold uppercase">Total Credits</div>
                  </div>
                </div>
              </div>

              {/* Career Paths */}
              <div className="pt-2 border-t border-[#E8E4DA] dark:border-neutral-700 flex items-center gap-2 flex-wrap text-xs">
                <span className="font-bold text-[#6B7280] text-[11px]">Key Career Roles:</span>
                {activeDept.careerPaths.map((career) => (
                  <span key={career} className="px-2.5 py-0.5 rounded-full bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 font-medium text-[11px] border border-neutral-200 dark:border-neutral-800">
                    {career}
                  </span>
                ))}
              </div>
            </div>

            {/* Curriculum Search */}
            <div className="relative pt-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B7280]" />
              <input
                type="text"
                value={curriculumSearch}
                onChange={(e) => setCurriculumSearch(e.target.value)}
                placeholder={`Search ${activeDept.name} subjects, codes, topics...`}
                className="w-full h-10 pl-10 pr-4 rounded-full border border-[#E8E4DA] dark:border-neutral-800 bg-[#F6F3EC] dark:bg-neutral-900 text-xs font-medium text-[#111111] dark:text-white placeholder-[#6B7280] focus:outline-none focus:border-[#2B4EFF] transition-all"
              />
            </div>
          </div>

          {/* Department Semesters Stack */}
          <div className="space-y-6">
            {activeDept.semesters.map((sem) => {
              const semFilteredSubjects = sem.subjects.filter((s) => {
                if (!curriculumSearch.trim()) return true;
                const q = curriculumSearch.toLowerCase().trim();
                return (
                  s.name.toLowerCase().includes(q) ||
                  s.code.toLowerCase().includes(q) ||
                  s.description.toLowerCase().includes(q) ||
                  s.keyTopics.some((t) => t.toLowerCase().includes(q))
                );
              });

              if (semFilteredSubjects.length === 0) return null;

              return (
                <div
                  key={sem.semester}
                  className="rounded-[22px] border border-[#E8E4DA] dark:border-neutral-800 bg-white dark:bg-[#1C1C1E] overflow-hidden shadow-xs"
                >
                  {/* Semester Header */}
                  <div className="p-4 sm:p-5 bg-[#FBF9F5] dark:bg-neutral-900/60 border-b border-[#E8E4DA] dark:border-neutral-800 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-xl bg-[#2B4EFF] text-white flex items-center justify-center font-bold text-sm font-display">
                        S{sem.semester}
                      </div>
                      <div>
                        <h3 className="font-extrabold text-base text-[#111111] dark:text-white">
                          Semester {sem.semester} Curriculum
                        </h3>
                        <p className="text-xs text-[#6B7280] dark:text-neutral-400">
                          {sem.subjects.length} Subjects · {sem.totalCredits} Credits Allocated
                        </p>
                      </div>
                    </div>

                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#E6EAFD] text-[#2B4EFF] dark:bg-blue-950/40 dark:text-blue-300">
                      Semester {sem.semester} of {activeDept.totalSemesters}
                    </span>
                  </div>

                  {/* Semester Subjects Grid */}
                  <div className="p-4 sm:p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {semFilteredSubjects.map((subject) => {
                      return (
                        <div
                          key={subject.code}
                          className="rounded-2xl border border-[#E8E4DA] dark:border-neutral-800 bg-[#FAF8F5] dark:bg-[#151516] p-4 flex flex-col justify-between gap-3 hover:border-[#2B4EFF]/40 transition-all"
                        >
                          <div className="space-y-2">
                            <div className="flex items-center justify-between gap-2">
                              <span className="px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold bg-[#E6EAFD] text-[#2B4EFF] dark:bg-blue-950/40 dark:text-blue-300">
                                {subject.code}
                              </span>
                              <div className="flex items-center gap-1.5">
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 font-medium border border-neutral-200 dark:border-neutral-700">
                                  {subject.category}
                                </span>
                                <span className="text-[10px] font-bold font-mono text-neutral-700 dark:text-neutral-300">
                                  {subject.credits} Credits
                                </span>
                              </div>
                            </div>

                            <h4 className="font-bold text-sm text-[#111111] dark:text-white leading-snug">
                              {subject.name}
                            </h4>

                            <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                              {subject.description}
                            </p>

                            {/* Key Topics */}
                            <div className="flex flex-wrap gap-1 pt-1">
                              {subject.keyTopics.map((topic) => (
                                <span
                                  key={topic}
                                  className="text-[10px] px-2 py-0.5 rounded-md bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 font-medium border border-neutral-200 dark:border-neutral-700"
                                >
                                  {topic}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Action Button */}
                          <div className="pt-2 border-t border-[#E8E4DA] dark:border-neutral-800 flex items-center justify-between">
                            {subject.interactiveSubjectId ? (
                              <button
                                type="button"
                                onClick={() => navigate(`/subject/${subject.interactiveSubjectId}`)}
                                className="px-3 py-1.5 rounded-full bg-[#2B4EFF] hover:bg-[#1E3FE0] text-white text-[11px] font-bold transition-all press flex items-center gap-1.5 cursor-pointer shadow-xs"
                              >
                                <BookOpen className="h-3 w-3" />
                                <span>Open Full Notes & MCQs</span>
                                <ArrowRight className="h-3 w-3" />
                              </button>
                            ) : (
                              <span className="text-[11px] text-[#6B7280] font-medium flex items-center gap-1">
                                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                                <span>AICTE Model Curriculum Verified</span>
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <BackToTop />
    </div>
  );
}
