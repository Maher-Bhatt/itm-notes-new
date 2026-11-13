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
import { 
  getAllIIMBCourses,
  getDegreeTopicStats,
  getIIMBStats,
  IITB_VS_IIMB_COMPARISON,
  IIMBCourse
} from "@/data/iimb-curriculum";
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
  ListChecks,
  Briefcase,
  TrendingUp,
  FileText,
  Target,
  LineChart,
  Table,
  CheckSquare
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

// IIMB Department icon helper
function getIIMBDeptIcon(dept: string) {
  switch (dept) {
    case "Decision Sciences": return <LineChart className="h-4 w-4" />;
    case "Business Analytics": return <BarChart3 className="h-4 w-4" />;
    case "Finance & Accounting": return <TrendingUp className="h-4 w-4" />;
    case "Marketing": return <Target className="h-4 w-4" />;
    case "Strategy": return <Briefcase className="h-4 w-4" />;
    case "Operations": return <Cog className="h-4 w-4" />;
    default: return <GraduationCap className="h-4 w-4" />;
  }
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
      className="group relative rounded-2xl border border-border dark:border-stone-800 bg-white dark:bg-card hover:border-primary/50 transition-all p-5 flex flex-col justify-between gap-4 card-lift press cursor-pointer select-none shadow-xs"
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold bg-primary/10 text-primary dark:bg-primary/15 dark:text-primary">
              {sub.code || "SUB"}
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-background dark:bg-stone-800 text-stone-600 dark:text-stone-400">
              {isBca ? "BCA" : "B.Tech"} · Sem {sub.semester}
            </span>
          </div>
          <span className="text-[11px] font-medium text-muted-foreground dark:text-stone-400 flex items-center gap-1">
            <BookOpen className="h-3 w-3" />
            {totalUnits} Units · {totalTopics} Topics
          </span>
        </div>

        <h3 className="font-bold text-base text-foreground dark:text-white group-hover:text-primary transition-colors leading-snug">
          {sub.name}
        </h3>

        <p className="text-[11px] text-muted-foreground dark:text-stone-400 line-clamp-2 leading-relaxed">
          {sub.description || "Detailed syllabus notes, algorithmic proofs, diagrams, and exam review questions."}
        </p>

        {/* Units Chips */}
        <div className="pt-1">
          <div className="flex flex-wrap gap-1.5">
            {sub.units?.slice(0, 3).map((unit: any, idx: number) => (
              <span
                key={unit.id}
                className="text-[10px] px-2 py-0.5 rounded-md bg-background dark:bg-stone-800 text-stone-600 dark:text-stone-400 border border-border/60 dark:border-stone-700/60 font-medium"
              >
                U{idx + 1}: {unit.title.split(":")[1]?.trim() || unit.title}
              </span>
            ))}
            {sub.units?.length > 3 && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-md text-muted-foreground font-medium">
                +{sub.units.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-border dark:border-stone-800 flex items-center justify-between">
        {/* Progress bar */}
        <div className="flex items-center gap-2">
          <div className="w-16 sm:w-20 bg-stone-200 dark:bg-stone-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-primary h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <span className="text-[10px] font-mono text-muted-foreground dark:text-stone-400 font-semibold">
            {progressPct}%
          </span>
        </div>

        <div className="flex items-center gap-2">
          {hasImpQuestions && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                navigateRef(`/imp-questions/${sub.id}`);
              }}
              className="px-2.5 py-1 rounded-full bg-primary/10 hover:bg-primary/10 text-primary font-bold text-[10px] press flex items-center gap-1 cursor-pointer"
              title="Solved Exam Questions"
            >
              <Zap className="h-3 w-3" />
              <span>IMP</span>
            </button>
          )}

          <span className="text-xs font-bold text-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex items-center gap-1 font-display">
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
  const { getSubjectProgress, isCompleted } = useProgress();
  const { currentUniversity } = useUniversity();

  // Tab View Mode: "interactive" notes vs "specializations" deep research vs "curriculum" directory vs "iimb-topics"
  const [activeTab, setActiveTab] = useState<"interactive" | "specializations" | "curriculum" | "iimb-topics">("interactive");

  // Interactive study view states
  const [selectedCourse, setSelectedCourse] = useState<"all" | "btech" | "bca">("all");
  const [selectedSemester, setSelectedSemester] = useState<number | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Specialization deep research states
  const allSpecs = useMemo(() => getAllSpecializations(), []);
  const [selectedSpecId, setSelectedSpecId] = useState<string>("btech-ai-ds");
  const activeSpecialization = useMemo(() => {
    return getSpecializationById(selectedSpecId) || allSpecs[0];
  }, [allSpecs, selectedSpecId]);

  // Department curriculum catalog states
  const allDepartments = useMemo(() => getAllDepartments(), []);
  const curriculumStats = useMemo(() => getCurriculumStats(), []);
  const [selectedDeptId, setSelectedDeptId] = useState<string>("cse");
  const [selectedCurriculumSem, setSelectedCurriculumSem] = useState<number | "all">("all");
  const activeDepartment = useMemo(() => {
    return getDepartmentById(selectedDeptId) || allDepartments[0];
  }, [allDepartments, selectedDeptId]);

  // IIMB & Topics Explorer state
  const allIimbCourses = useMemo(() => getAllIIMBCourses(), []);
  const degreeTopicStats = useMemo(() => getDegreeTopicStats(), []);
  const iimbStats = useMemo(() => getIIMBStats(), []);
  const [selectedIimbCourseId, setSelectedIimbCourseId] = useState<string>("iimb-ds1");
  const [selectedIimbDept, setSelectedIimbDept] = useState<string>("all");
  const [searchIimbTopic, setSearchIimbTopic] = useState<string>("");

  const selectedIimbCourse = useMemo(() => {
    return allIimbCourses.find(c => c.id === selectedIimbCourseId) || allIimbCourses[0];
  }, [allIimbCourses, selectedIimbCourseId]);

  const filteredIimbCourses = useMemo(() => {
    return allIimbCourses.filter(course => {
      if (selectedIimbDept !== "all" && course.department !== selectedIimbDept) {
        return false;
      }
      if (searchIimbTopic.trim()) {
        const q = searchIimbTopic.toLowerCase().trim();
        const matchesName = course.name.toLowerCase().includes(q);
        const matchesCode = course.code.toLowerCase().includes(q);
        const matchesTopics = course.units.some(u => 
          u.unitTitle.toLowerCase().includes(q) || 
          u.topics.some(t => t.toLowerCase().includes(q))
        );
        const matchesCases = course.keyCaseStudies.some(cs => cs.toLowerCase().includes(q));
        return matchesName || matchesCode || matchesTopics || matchesCases;
      }
      return true;
    });
  }, [allIimbCourses, selectedIimbDept, searchIimbTopic]);

  // Filtered interactive subjects
  const filteredSubjects = useMemo(() => {
    return subjects.filter((subject) => {
      const isBca = subject.id.startsWith("bca") || (subject.code || "").startsWith("BCA");
      if (selectedCourse === "bca" && !isBca) return false;
      if (selectedCourse === "btech" && isBca) return false;

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
      <div className="relative overflow-hidden rounded-2xl border border-border dark:border-stone-800 bg-white dark:bg-card p-6 sm:p-8 lg:p-10 shadow-xs">
        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 text-primary dark:bg-primary/15 dark:text-primary text-xs font-bold border border-primary/20">
            <GraduationCap className="h-4 w-4 text-primary" />
            <span>{currentUniversity.shortName} · AICTE & UGC Accredited Multi-Department Curriculum</span>
            <span className="text-muted-foreground/40">·</span>
            <span className="text-muted-foreground font-medium">{subjects.length} Interactive Subjects</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight font-display text-foreground dark:text-white">
            Engineering, BCA, Specializations & IIMB Analytics Registry
          </h1>

          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 leading-relaxed">
            Deep-researched curricula for <strong>B.Tech in AI & Data Science (16 Dedicated AI Subjects)</strong>, 
            <strong> Cyber Security</strong>, <strong> Cloud & DevOps</strong>, <strong> BCA Specializations</strong>, and <strong> IIM Bangalore (IIMB) PGP-BA & Decision Sciences</strong> with full topic breakdowns.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="bg-background dark:bg-stone-800/80 border border-border dark:border-stone-800 rounded-2xl p-3 text-center">
              <div className="text-xl sm:text-2xl font-bold font-mono text-foreground dark:text-white">{curriculumStats.totalSubjectsAcrossAllDepts}</div>
              <div className="text-[10px] text-muted-foreground dark:text-stone-400 font-bold uppercase tracking-wider mt-0.5">Cataloged Subjects</div>
            </div>
            <div className="bg-background dark:bg-stone-800/80 border border-border dark:border-stone-800 rounded-2xl p-3 text-center">
              <div className="text-xl sm:text-2xl font-bold font-mono text-primary">{subjects.length}</div>
              <div className="text-[10px] text-muted-foreground dark:text-stone-400 font-bold uppercase tracking-wider mt-0.5">Interactive Subjects</div>
            </div>
            <div className="bg-background dark:bg-stone-800/80 border border-border dark:border-stone-800 rounded-2xl p-3 text-center">
              <div className="text-xl sm:text-2xl font-bold font-mono text-primary">{iimbStats.totalTopics}+ Topics</div>
              <div className="text-[10px] text-muted-foreground dark:text-stone-400 font-bold uppercase tracking-wider mt-0.5">IIMB Master Topics</div>
            </div>
            <div className="bg-background dark:bg-stone-800/80 border border-border dark:border-stone-800 rounded-2xl p-3 text-center">
              <div className="text-xl sm:text-2xl font-bold font-mono text-success">1,900+ Topics</div>
              <div className="text-[10px] text-muted-foreground dark:text-stone-400 font-bold uppercase tracking-wider mt-0.5">Avg Degree Topics</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main View Mode Tabs (4 Tabs) */}
      <div className="flex items-center gap-2 border-b border-border dark:border-stone-800 pb-3 overflow-x-auto scrollbar-none">
        <button
          type="button"
          onClick={() => setActiveTab("interactive")}
          className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
            activeTab === "interactive"
              ? "bg-primary text-white shadow-xs"
              : "bg-background dark:bg-stone-800 text-muted-foreground hover:text-foreground dark:hover:text-white"
          }`}
        >
          <BookOpen className="h-4 w-4" />
          <span>Interactive Study Notes ({subjects.length} Subjects)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("iimb-topics")}
          className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
            activeTab === "iimb-topics"
              ? "bg-primary text-white shadow-xs"
              : "bg-background dark:bg-stone-800 text-muted-foreground hover:text-foreground dark:hover:text-white"
          }`}
        >
          <BarChart3 className="h-4 w-4" />
          <span>Topics Breakdown & IIMB Analytics ({iimbStats.totalTopics}+ Topics)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("specializations")}
          className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
            activeTab === "specializations"
              ? "bg-primary text-white shadow-xs"
              : "bg-background dark:bg-stone-800 text-muted-foreground hover:text-foreground dark:hover:text-white"
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
              ? "bg-primary text-white shadow-xs"
              : "bg-background dark:bg-stone-800 text-muted-foreground hover:text-foreground dark:hover:text-white"
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
          <div className="rounded-2xl bg-white dark:bg-card border border-border dark:border-stone-800 p-4 sm:p-5 shadow-xs space-y-4">
            {/* Row 1: Degree Switcher */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                <span className="text-xs font-bold text-muted-foreground shrink-0 mr-1">Degree:</span>
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
                          ? "bg-primary text-white border-primary shadow-xs"
                          : "bg-background dark:bg-stone-800 text-muted-foreground dark:text-stone-300 border-border dark:border-stone-700 hover:text-foreground dark:hover:text-white"
                      }`}
                    >
                      {course.label}
                    </button>
                  );
                })}
              </div>

              {/* Search Bar */}
              <div className="relative min-w-[240px] sm:w-72">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search subject, code, or topic..."
                  className="w-full pl-10 pr-4 py-2 rounded-full text-xs bg-background dark:bg-stone-800/80 border border-border dark:border-stone-700 focus:outline-none focus:border-primary text-foreground dark:text-white placeholder:text-stone-400 transition-all"
                />
              </div>
            </div>

            {/* Row 2: Semester Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-border/60 dark:border-stone-800/80 scrollbar-none">
              <span className="text-xs font-bold text-muted-foreground shrink-0 mr-1">Semester:</span>
              <button
                type="button"
                onClick={() => setSelectedSemester("all")}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedSemester === "all"
                    ? "bg-foreground text-white dark:bg-white dark:text-stone-900"
                    : "bg-background dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:text-foreground dark:hover:text-white"
                }`}
              >
                All Semesters
              </button>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                <button
                  key={sem}
                  type="button"
                  onClick={() => setSelectedSemester(sem)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    selectedSemester === sem
                      ? "bg-primary text-white shadow-xs"
                      : "bg-background dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:text-foreground dark:hover:text-white"
                  }`}
                >
                  Sem {sem}
                </button>
              ))}
            </div>
          </div>

          {/* Subjects Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredSubjects.map((sub) => {
              const totalTopicIds = getAllTopicIds(sub.id);
              const completedCount = totalTopicIds.filter((tId) => isCompleted(tId)).length;
              const progressPct = totalTopicIds.length > 0 ? Math.round((completedCount / totalTopicIds.length) * 100) : 0;
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

          {filteredSubjects.length === 0 && (
            <div className="text-center py-16 bg-white dark:bg-card rounded-2xl border border-border dark:border-stone-800 p-8">
              <BookOpen className="h-10 w-10 text-stone-400 mx-auto mb-3 opacity-60" />
              <h3 className="font-bold text-base text-foreground dark:text-white mb-1">No Subjects Found</h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                No matching subjects found for your search query or semester selection. Try clearing filters.
              </p>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 2: TOPICS TAXONOMY & IIM BANGALORE (IIMB) ANALYTICS CATALOG */}
      {/* ========================================================================= */}
      {activeTab === "iimb-topics" && (
        <div className="space-y-8">
          {/* Section Banner */}
          <div className="rounded-2xl bg-gradient-to-r from-primary/15 to-primary/15 text-white p-6 sm:p-8 space-y-4 shadow-sm">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-primary text-xs font-bold border border-white/20">
              <BarChart3 className="h-4 w-4" />
              <span>Deep Research · AICTE / UGC Topic Taxonomy & IIM Bangalore (IIMB) DCAL</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight font-display">
              How Many Topics Are in Subjects? & IIMB Analytics Master Syllabus
            </h2>
            <p className="text-sm text-primary max-w-3xl leading-relaxed">
              Every accredited theory subject in India universally spans <strong>5 Units</strong> with <strong>8 to 10 granular topics per unit</strong> (40 to 50 topics/subject). Across a 4-year degree, a student covers <strong>1,800 to 2,200+ topics</strong>. Explore the exhaustive breakdown alongside <strong>IIM Bangalore's (IIMB) flagship Decision Sciences, Business Analytics & Prescriptive AI</strong> curriculum.
            </p>
          </div>

          {/* SUBSECTION 1: DEGREE TOPIC COUNT TAXONOMY */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-foreground dark:text-white flex items-center gap-2">
                  <ListChecks className="h-5 w-5 text-primary" />
                  <span>1. Degree-Wide Topic Count Taxonomy (Statutory Standards)</span>
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Standard Contact Hours (L-T-P), Unit partitioning, and cumulative topic accumulation.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {degreeTopicStats.map((stat) => (
                <div
                  key={stat.degree}
                  className="rounded-2xl border border-border dark:border-stone-800 bg-white dark:bg-card p-5 space-y-4 shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary dark:bg-primary/15 dark:text-primary">
                      {stat.durationYears} Years · {stat.totalSemesters} Terms
                    </span>
                    <span className="text-xs font-mono font-bold text-stone-500">
                      {stat.totalTheorySubjects} Subjects
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-base text-foreground dark:text-white leading-snug">
                      {stat.degree}
                    </h4>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1 line-clamp-2">
                      {stat.keyDisciplineFocus}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border dark:border-stone-800">
                    <div className="bg-background dark:bg-stone-800/60 p-2.5 rounded-xl text-center">
                      <div className="text-base font-bold font-mono text-primary">
                        {stat.totalSyllabusTopics.toLocaleString()}
                      </div>
                      <div className="text-[9px] font-bold text-stone-500 uppercase mt-0.5">Theory Topics</div>
                    </div>
                    <div className="bg-background dark:bg-stone-800/60 p-2.5 rounded-xl text-center">
                      <div className="text-base font-bold font-mono text-success">
                        {stat.labExperimentsCount}
                      </div>
                      <div className="text-[9px] font-bold text-stone-500 uppercase mt-0.5">Lab Experiments</div>
                    </div>
                  </div>

                  <div className="text-[11px] text-stone-600 dark:text-stone-400 bg-background dark:bg-stone-800/40 p-2.5 rounded-xl flex items-center justify-between">
                    <span>Average per Subject:</span>
                    <span className="font-bold font-mono text-foreground dark:text-white">
                      {stat.avgUnitsPerSubject} Units × {stat.avgTopicsPerUnit} = {stat.avgUnitsPerSubject * stat.avgTopicsPerUnit} Topics
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SUBSECTION 2: IIM BANGALORE (IIMB) MASTER CURRICULUM EXPLORER */}
          <div className="space-y-4 pt-4 border-t border-border dark:border-stone-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-foreground dark:text-white flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  <span>2. IIM Bangalore (IIMB) Master Subjects & Topics Registry</span>
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Verified syllabus from IIMB PGP (MBA), PGP-BA (Business Analytics), and DCAL (Prof. U Dinesh Kumar).
                </p>
              </div>

              {/* Search IIMB Topics */}
              <div className="relative min-w-[240px] sm:w-64">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-stone-400" />
                <input
                  type="text"
                  value={searchIimbTopic}
                  onChange={(e) => setSearchIimbTopic(e.target.value)}
                  placeholder="Search IIMB topics, cases, tools..."
                  className="w-full pl-9 pr-3 py-1.5 rounded-full text-xs bg-background dark:bg-stone-800 border border-border dark:border-stone-700 text-foreground dark:text-white placeholder:text-stone-400 focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            {/* Department Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-xs font-bold text-muted-foreground shrink-0 mr-1">Academic Area:</span>
              {[
                { id: "all", label: `All Areas (${allIimbCourses.length})` },
                { id: "Decision Sciences", label: "Decision Sciences" },
                { id: "Business Analytics", label: "Business Analytics" },
                { id: "Finance & Accounting", label: "Finance & Accounting" },
                { id: "Marketing", label: "Marketing" },
                { id: "Strategy", label: "Strategy & Platforms" },
                { id: "Operations", label: "Operations & Supply Chain" },
              ].map((area) => {
                const isActive = selectedIimbDept === area.id;
                return (
                  <button
                    key={area.id}
                    type="button"
                    onClick={() => setSelectedIimbDept(area.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap border ${
                      isActive
                        ? "bg-primary text-white border-primary/60 shadow-xs"
                        : "bg-background dark:bg-stone-800 text-muted-foreground dark:text-stone-300 border-border dark:border-stone-700 hover:text-foreground dark:hover:text-white"
                    }`}
                  >
                    {area.label}
                  </button>
                );
              })}
            </div>

            {/* Course Selector Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {filteredIimbCourses.map((c) => {
                const isSelected = selectedIimbCourseId === c.id;
                return (
                  <div
                    key={c.id}
                    onClick={() => setSelectedIimbCourseId(c.id)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer card-lift select-none flex flex-col justify-between gap-2 ${
                      isSelected
                        ? "bg-primary/10 border-primary dark:bg-primary/15 dark:border-primary/60 shadow-xs"
                        : "bg-white dark:bg-card border-border dark:border-stone-800 hover:border-stone-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] font-bold text-primary dark:text-primary">
                        {c.code}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary dark:bg-primary/15 dark:text-primary">
                        {c.totalTopics} Topics
                      </span>
                    </div>

                    <h4 className="font-bold text-xs text-foreground dark:text-white line-clamp-2 leading-snug">
                      {c.name}
                    </h4>

                    <div className="text-[10px] text-stone-500 flex items-center justify-between pt-1 border-t border-stone-200/60 dark:border-stone-800">
                      <span>{c.term}</span>
                      <span className="font-bold">{c.credits} Credits</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected IIMB Course Deep Dive Card */}
            {selectedIimbCourse && (
              <div className="rounded-2xl border border-border dark:border-stone-800 bg-white dark:bg-card p-6 sm:p-8 space-y-6 shadow-xs">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border dark:border-stone-800">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-3 py-1 rounded-full font-mono text-xs font-bold bg-primary/10 text-primary dark:bg-primary/15 dark:text-primary">
                        {selectedIimbCourse.code}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary dark:bg-primary/15 dark:text-primary">
                        {selectedIimbCourse.department}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-background dark:bg-stone-800 text-stone-600 dark:text-stone-400">
                        {selectedIimbCourse.program} · {selectedIimbCourse.term}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground dark:text-white font-display">
                      {selectedIimbCourse.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 max-w-3xl leading-relaxed">
                      {selectedIimbCourse.description}
                    </p>
                  </div>

                  <div className="shrink-0 flex md:flex-col items-center md:items-end justify-between gap-2 bg-background dark:bg-stone-800/60 p-4 rounded-2xl border border-border dark:border-stone-800">
                    <span className="text-xs font-bold text-stone-500 uppercase">Total Unit Topics</span>
                    <span className="text-2xl sm:text-3xl font-bold font-mono text-primary">
                      {selectedIimbCourse.totalTopics}
                    </span>
                    <span className="text-[10px] text-stone-500 font-semibold">{selectedIimbCourse.credits} Statutory Credits</span>
                  </div>
                </div>

                {/* Faculty & Pedagogy Meta Bar */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-background dark:bg-stone-800/40 border border-border dark:border-stone-800 space-y-1">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Lead Faculty (IIMB)</div>
                    <div className="font-bold text-xs text-foreground dark:text-white">{selectedIimbCourse.leadFaculty}</div>
                  </div>

                  <div className="p-4 rounded-xl bg-background dark:bg-stone-800/40 border border-border dark:border-stone-800 space-y-1">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Pedagogy & Lab Setup</div>
                    <div className="font-bold text-xs text-foreground dark:text-white line-clamp-1">{selectedIimbCourse.pedagogy}</div>
                  </div>

                  <div className="p-4 rounded-xl bg-background dark:bg-stone-800/40 border border-border dark:border-stone-800 space-y-1">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Tools & Environments</div>
                    <div className="flex flex-wrap gap-1">
                      {selectedIimbCourse.toolsUsed.map(tool => (
                        <span key={tool} className="text-[10px] px-2 py-0.5 rounded-md bg-white dark:bg-stone-800 font-mono font-bold text-primary border border-stone-200 dark:border-stone-700">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Key Real-World Case Studies */}
                <div className="p-4 rounded-xl bg-primary/10 dark:bg-primary/20 border border-primary/20 space-y-2">
                  <div className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Briefcase className="h-4 w-4" />
                    <span>Published Case Studies Solved in Course:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedIimbCourse.keyCaseStudies.map(cs => (
                      <span key={cs} className="text-xs px-3 py-1 rounded-full bg-white dark:bg-stone-800 text-foreground dark:text-white font-medium border border-primary/30 dark:border-primary/60 shadow-2xs">
                        {cs}
                      </span>
                    ))}
                  </div>
                </div>

                {/* ALL 5 UNITS & GRANULAR TOPICS LISTING */}
                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-foreground dark:text-white flex items-center gap-2">
                      <ListChecks className="h-4 w-4 text-primary" />
                      <span>Granular Unit-by-Unit Syllabus Topics ({selectedIimbCourse.units.length} Units · {selectedIimbCourse.totalTopics} Topics)</span>
                    </h4>
                  </div>

                  <div className="space-y-3">
                    {selectedIimbCourse.units.map(unit => (
                      <div
                        key={unit.unitNumber}
                        className="rounded-2xl border border-border dark:border-stone-800 bg-background dark:bg-stone-900/60 p-4 space-y-3"
                      >
                        <div className="flex items-center justify-between pb-2 border-b border-border dark:border-stone-800">
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-primary text-white font-mono text-xs font-bold flex items-center justify-center shrink-0">
                              {unit.unitNumber}
                            </span>
                            <span className="font-bold text-xs sm:text-sm text-foreground dark:text-white">
                              {unit.unitTitle}
                            </span>
                          </div>
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-700">
                            {unit.topicCount} Topics
                          </span>
                        </div>

                        {/* Topics bullet grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                          {unit.topics.map((topic, tIdx) => (
                            <div
                              key={topic}
                              className="flex items-start gap-2 text-xs text-stone-700 dark:text-stone-300 p-2 rounded-xl bg-white dark:bg-card border border-border/60 dark:border-stone-800 hover:border-primary/40 transition-all"
                            >
                              <CheckCircle2 className="h-3.5 w-3.5 text-success shrink-0 mt-0.5" />
                              <span className="leading-snug">{topic}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* SUBSECTION 3: IIT BOMBAY VS IIM BANGALORE COMPARISON */}
          <div className="space-y-4 pt-6 border-t border-border dark:border-stone-800">
            <div>
              <h3 className="text-lg font-bold text-foreground dark:text-white flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                <span>3. Comparative Analysis: IIT Bombay (CS Systems) vs. IIM Bangalore (Decision Sciences)</span>
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                How India's premier technical vs. management institutions approach computational and analytical education.
              </p>
            </div>

            <div className="rounded-2xl border border-border dark:border-stone-800 bg-white dark:bg-card overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-background dark:bg-stone-800/80 border-b border-border dark:border-stone-800 text-stone-700 dark:text-stone-300">
                    <tr>
                      <th className="py-3 px-4 font-bold uppercase tracking-wider w-1/4">Curricular Dimension</th>
                      <th className="py-3 px-4 font-bold uppercase tracking-wider text-primary dark:text-primary w-3/8">
                        IIT Bombay (Computer Science & Engg)
                      </th>
                      <th className="py-3 px-4 font-bold uppercase tracking-wider text-primary dark:text-primary w-3/8">
                        IIM Bangalore (Decision Sciences & PGP-BA)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border dark:divide-stone-800">
                    {IITB_VS_IIMB_COMPARISON.map((row) => (
                      <tr key={row.dimension} className="hover:bg-background dark:hover:bg-stone-800/40 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-foreground dark:text-white align-top">
                          {row.dimension}
                        </td>
                        <td className="py-3.5 px-4 text-stone-600 dark:text-stone-300 leading-relaxed align-top">
                          {row.iitBombay}
                        </td>
                        <td className="py-3.5 px-4 text-stone-600 dark:text-stone-300 leading-relaxed align-top">
                          {row.iimBangalore}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 3: SPECIALIZATIONS & COURSE COUNTS (DEEP RESEARCH) */}
      {/* ========================================================================= */}
      {activeTab === "specializations" && (
        <div className="space-y-6">
          {/* Program Selector Pills */}
          <div className="rounded-2xl bg-white dark:bg-card border border-border dark:border-stone-800 p-4 sm:p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-muted-foreground">Select Specialization Track:</span>
              <span className="text-xs font-semibold text-primary">{allSpecs.length} Research Programs</span>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {allSpecs.map((spec) => {
                const isSelected = selectedSpecId === spec.id;
                return (
                  <button
                    key={spec.id}
                    type="button"
                    onClick={() => setSelectedSpecId(spec.id)}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 border ${
                      isSelected
                        ? "bg-primary text-white border-primary shadow-xs"
                        : "bg-background dark:bg-stone-800 text-muted-foreground dark:text-stone-300 border-border dark:border-stone-700 hover:text-foreground dark:hover:text-white"
                    }`}
                  >
                    {getSpecIcon(spec.id)}
                    <span>{spec.shortName}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Specialization Overview Card */}
          {activeSpecialization && (
            <div className="space-y-6">
              {/* Header Box */}
              <div className="rounded-2xl border border-border dark:border-stone-800 bg-white dark:bg-card p-6 sm:p-8 space-y-5 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full font-mono text-[11px] font-bold bg-primary/10 text-primary dark:bg-primary/15 dark:text-primary">
                        {activeSpecialization.degree} · {activeSpecialization.durationYears} Years ({activeSpecialization.totalSemesters} Semesters)
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-success/10 text-success dark:bg-success/10 dark:text-success">
                        AICTE CBCS Model
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-foreground dark:text-white font-display">
                      {activeSpecialization.name}
                    </h2>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedDeptId(activeSpecialization.departmentId);
                        setActiveTab("curriculum");
                      }}
                      className="px-4 py-2 rounded-full bg-background dark:bg-stone-800 hover:bg-muted text-stone-800 dark:text-stone-200 text-xs font-bold transition-all press flex items-center gap-1.5 cursor-pointer"
                    >
                      <GraduationCap className="h-4 w-4" />
                      <span>View Full Semester Grids</span>
                    </button>
                  </div>
                </div>

                {/* KPI Metrics Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
                  <div className="bg-background dark:bg-stone-800/60 border border-border dark:border-stone-800 rounded-2xl p-3.5 text-center">
                    <div className="text-xl sm:text-2xl font-bold font-mono text-primary">{activeSpecialization.totalCredits}</div>
                    <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mt-0.5">Total Credits</div>
                  </div>
                  <div className="bg-background dark:bg-stone-800/60 border border-border dark:border-stone-800 rounded-2xl p-3.5 text-center">
                    <div className="text-xl sm:text-2xl font-bold font-mono text-foreground dark:text-white">{activeSpecialization.totalCoursesCount}</div>
                    <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mt-0.5">Total Courses</div>
                  </div>
                  <div className="bg-background dark:bg-stone-800/60 border border-border dark:border-stone-800 rounded-2xl p-3.5 text-center">
                    <div className="text-xl sm:text-2xl font-bold font-mono text-primary">{activeSpecialization.specializationSubjectsCount}</div>
                    <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mt-0.5">Dedicated AI / Core</div>
                  </div>
                  <div className="bg-background dark:bg-stone-800/60 border border-border dark:border-stone-800 rounded-2xl p-3.5 text-center">
                    <div className="text-xl sm:text-2xl font-bold font-mono text-success">{activeSpecialization.practicalLabsCount}</div>
                    <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mt-0.5">Practical Labs</div>
                  </div>
                  <div className="bg-background dark:bg-stone-800/60 border border-border dark:border-stone-800 rounded-2xl p-3.5 text-center col-span-2 sm:col-span-1">
                    <div className="text-xl sm:text-2xl font-bold font-mono text-primary">{activeSpecialization.capstoneProjectsCount}</div>
                    <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mt-0.5">Capstones & Intern</div>
                  </div>
                </div>

                {/* AICTE Category Credit Breakdown */}
                <div className="p-4 rounded-2xl bg-background dark:bg-stone-800/40 border border-border dark:border-stone-800 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-foreground dark:text-white">
                    <span className="flex items-center gap-1.5">
                      <Layers className="h-4 w-4 text-primary" />
                      <span>Statutory Credit Breakdown (AICTE 160-Credit Model)</span>
                    </span>
                    <span className="font-mono text-primary">{activeSpecialization.totalCredits} Credits Total</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                    <div className="p-2.5 rounded-xl bg-white dark:bg-card border border-border/60 dark:border-stone-700 flex justify-between items-center">
                      <span className="text-muted-foreground">Basic Sciences (BSC):</span>
                      <span className="font-bold font-mono text-foreground dark:text-white">{activeSpecialization.categoryBreakdown.basicSciences} Cr</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white dark:bg-card border border-border/60 dark:border-stone-700 flex justify-between items-center">
                      <span className="text-muted-foreground">Engg Sciences (ESC):</span>
                      <span className="font-bold font-mono text-foreground dark:text-white">{activeSpecialization.categoryBreakdown.engineeringSciences} Cr</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white dark:bg-card border border-border/60 dark:border-stone-700 flex justify-between items-center">
                      <span className="text-muted-foreground">Core Computing (PCC):</span>
                      <span className="font-bold font-mono text-foreground dark:text-white">{activeSpecialization.categoryBreakdown.coreComputing} Cr</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white dark:bg-card border border-border/60 dark:border-stone-700 flex justify-between items-center">
                      <span className="text-muted-foreground">Specialization Domain:</span>
                      <span className="font-bold font-mono text-primary">{activeSpecialization.categoryBreakdown.specializationDomain} Cr</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white dark:bg-card border border-border/60 dark:border-stone-700 flex justify-between items-center">
                      <span className="text-muted-foreground">Professional Electives:</span>
                      <span className="font-bold font-mono text-foreground dark:text-white">{activeSpecialization.categoryBreakdown.electives} Cr</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white dark:bg-card border border-border/60 dark:border-stone-700 flex justify-between items-center">
                      <span className="text-muted-foreground">Practical Labs:</span>
                      <span className="font-bold font-mono text-success">{activeSpecialization.categoryBreakdown.practicalLabs} Cr</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white dark:bg-card border border-border/60 dark:border-stone-700 flex justify-between items-center">
                      <span className="text-muted-foreground">Projects & Internships:</span>
                      <span className="font-bold font-mono text-primary">{activeSpecialization.categoryBreakdown.projectsAndInternships} Cr</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white dark:bg-card border border-border/60 dark:border-stone-700 flex justify-between items-center">
                      <span className="text-muted-foreground">Humanities & Mgmt:</span>
                      <span className="font-bold font-mono text-foreground dark:text-white">{activeSpecialization.categoryBreakdown.humanitiesAndMgmt} Cr</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dedicated Specialization Subjects Catalog */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-foreground dark:text-white flex items-center gap-2">
                      <Brain className="h-5 w-5 text-primary" />
                      <span>Dedicated Specialization Subjects ({activeSpecialization.specializationSubjects.length} Courses)</span>
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Exact course titles, semesters, and credits as verified across Anna University, VTU, Mumbai University & GTU.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeSpecialization.specializationSubjects.map((sub, idx) => (
                    <div
                      key={sub.code}
                      className="rounded-2xl border border-border dark:border-stone-800 bg-white dark:bg-card p-4 sm:p-5 flex flex-col justify-between gap-3 shadow-xs hover:border-primary/40 transition-all"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-primary/10 text-primary dark:bg-primary/15 dark:text-primary font-mono text-[10px] font-bold flex items-center justify-center">
                              {idx + 1}
                            </span>
                            <span className="font-mono text-xs font-bold text-primary dark:text-primary">
                              {sub.code}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-background dark:bg-stone-800 text-stone-600 dark:text-stone-400 font-medium border border-stone-200 dark:border-stone-700">
                              Sem {sub.semester}
                            </span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary dark:bg-primary/15 dark:text-primary font-semibold">
                              {sub.category}
                            </span>
                            <span className="text-[10px] font-bold font-mono text-stone-700 dark:text-stone-300">
                              {sub.credits} Credits
                            </span>
                          </div>
                        </div>

                        <h4 className="font-bold text-sm text-foreground dark:text-white leading-snug">
                          {sub.name}
                        </h4>

                        <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                          {sub.description}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-border dark:border-stone-800 flex items-center justify-between text-[11px] text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                          <span>AICTE Model Scheme Aligned</span>
                        </span>
                        <span className="font-mono font-medium">3-4 Lecture Hrs/Wk</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4-Year Academic Progression Roadmap */}
              <div className="rounded-2xl border border-border dark:border-stone-800 bg-white dark:bg-card p-6 sm:p-8 space-y-4 shadow-xs">
                <h3 className="text-lg font-bold text-foreground dark:text-white flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <span>Academic Progression Roadmap</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {activeSpecialization.learningRoadmap.map((stage, idx) => (
                    <div
                      key={stage.stage}
                      className="p-4 rounded-2xl bg-background dark:bg-stone-800/40 border border-border dark:border-stone-800 space-y-2 relative"
                    >
                      <div className="text-[10px] font-bold font-mono text-primary dark:text-primary">
                        PHASE {idx + 1} · {stage.semesters}
                      </div>
                      <h4 className="font-bold text-xs text-foreground dark:text-white leading-snug">
                        {stage.stage}
                      </h4>
                      <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
                        <strong>Focus:</strong> {stage.focus}
                      </p>
                      <div className="text-[10px] text-success dark:text-success font-medium pt-1 border-t border-stone-200 dark:border-stone-700">
                        🎯 {stage.milestone}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Career Roles Strip */}
              <div className="rounded-2xl border border-border dark:border-stone-800 bg-white dark:bg-card p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  <span className="text-xs font-bold text-foreground dark:text-white">Target Career Roles:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeSpecialization.careerRoles.map((role) => (
                    <span
                      key={role}
                      className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary dark:bg-primary/15 dark:text-primary font-bold border border-primary/20"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 4: PAN-INDIA DEPARTMENT CATALOG (368 SUBJECTS) */}
      {/* ========================================================================= */}
      {activeTab === "curriculum" && (
        <div className="space-y-6">
          {/* Department Selection Pills */}
          <div className="rounded-2xl bg-white dark:bg-card border border-border dark:border-stone-800 p-4 sm:p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-muted-foreground">Select Engineering & Applied Science Department:</span>
              <span className="text-xs font-semibold text-primary">{allDepartments.length} Complete Departments</span>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {allDepartments.map((dept) => {
                const isSelected = selectedDeptId === dept.id;
                return (
                  <button
                    key={dept.id}
                    type="button"
                    onClick={() => {
                      setSelectedDeptId(dept.id);
                      setSelectedCurriculumSem("all");
                    }}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 border ${
                      isSelected
                        ? "bg-primary text-white border-primary shadow-xs"
                        : "bg-background dark:bg-stone-800 text-muted-foreground dark:text-stone-300 border-border dark:border-stone-700 hover:text-foreground dark:hover:text-white"
                    }`}
                  >
                    {getDeptIcon(dept.id)}
                    <span>{dept.shortName}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Department Overview Banner */}
          {activeDepartment && (
            <div className="rounded-2xl border border-border dark:border-stone-800 bg-white dark:bg-card p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full font-mono text-[11px] font-bold bg-primary/10 text-primary dark:bg-primary/15 dark:text-primary">
                      {activeDepartment.degree} · {activeDepartment.durationYears} Years ({activeDepartment.totalSemesters} Semesters)
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-background dark:bg-stone-800 text-stone-600 dark:text-stone-400">
                      {activeDepartment.totalCredits} Statutory Credits
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-foreground dark:text-white font-display">
                    {activeDepartment.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 max-w-3xl leading-relaxed">
                    {activeDepartment.description}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-center px-4 py-2 rounded-2xl bg-background dark:bg-stone-800 border border-border dark:border-stone-700">
                    <div className="text-xl font-mono font-bold text-foreground dark:text-white">{activeDepartment.totalSubjects}</div>
                    <div className="text-[10px] text-stone-500 font-bold uppercase">Department Subjects</div>
                  </div>
                </div>
              </div>

              {/* Career Paths */}
              <div className="pt-2 border-t border-border dark:border-stone-800 flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-muted-foreground">Key Industry Roles:</span>
                {activeDepartment.careerPaths.map((career) => (
                  <span
                    key={career}
                    className="text-xs px-2.5 py-0.5 rounded-full bg-background dark:bg-stone-800/80 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 font-medium"
                  >
                    {career}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Semester Selector Filter for Curriculum */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs font-bold text-muted-foreground shrink-0 mr-1">Filter Semester:</span>
            <button
              type="button"
              onClick={() => setSelectedCurriculumSem("all")}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedCurriculumSem === "all"
                  ? "bg-foreground text-white dark:bg-white dark:text-stone-900"
                  : "bg-background dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:text-foreground dark:hover:text-white"
              }`}
            >
              All Semesters ({activeDepartment.semesters.length})
            </button>
            {activeDepartment.semesters.map((sem) => (
              <button
                key={sem.semester}
                type="button"
                onClick={() => setSelectedCurriculumSem(sem.semester)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  selectedCurriculumSem === sem.semester
                    ? "bg-primary text-white shadow-xs"
                    : "bg-background dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:text-foreground dark:hover:text-white"
                }`}
              >
                Semester {sem.semester} ({sem.subjects.length})
              </button>
            ))}
          </div>

          {/* Semester-Wise Course Grids */}
          <div className="space-y-6">
            {activeDepartment.semesters.map((sem) => {
              if (selectedCurriculumSem !== "all" && selectedCurriculumSem !== sem.semester) {
                return null;
              }

              const semFilteredSubjects = sem.subjects;

              return (
                <div
                  key={sem.semester}
                  className="rounded-2xl border border-border dark:border-stone-800 bg-white dark:bg-card p-6 space-y-4 shadow-xs"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-border dark:border-stone-800">
                    <div className="flex items-center gap-2.5">
                      <span className="w-8 h-8 rounded-full bg-primary text-white font-mono text-sm font-bold flex items-center justify-center shadow-xs">
                        {sem.semester}
                      </span>
                      <div>
                        <h3 className="font-semibold text-base text-foreground dark:text-white font-display">
                          Semester {sem.semester}
                        </h3>
                        <p className="text-xs text-stone-500">
                          {sem.subjects.length} Statutory Subjects · {sem.totalCredits} Credits
                        </p>
                      </div>
                    </div>

                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-background dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                      Total Credits: {sem.totalCredits}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {semFilteredSubjects.map((subject) => {
                      return (
                        <div
                          key={subject.code}
                          className="rounded-2xl border border-border dark:border-stone-800 bg-background dark:bg-[#151516] p-4 flex flex-col justify-between gap-3 hover:border-primary/40 transition-all"
                        >
                          <div className="space-y-2">
                            <div className="flex items-center justify-between gap-2">
                              <span className="px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold bg-primary/10 text-primary dark:bg-primary/15 dark:text-primary">
                                {subject.code}
                              </span>
                              <div className="flex items-center gap-1.5">
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-400 font-medium border border-stone-200 dark:border-stone-700">
                                  {subject.category}
                                </span>
                                <span className="text-[10px] font-bold font-mono text-stone-700 dark:text-stone-300">
                                  {subject.credits} Credits
                                </span>
                              </div>
                            </div>

                            <h4 className="font-bold text-sm text-foreground dark:text-white leading-snug">
                              {subject.name}
                            </h4>

                            <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2 leading-relaxed">
                              {subject.description}
                            </p>

                            {/* Key Topics */}
                            <div className="flex flex-wrap gap-1 pt-1">
                              {subject.keyTopics.map((topic) => (
                                <span
                                  key={topic}
                                  className="text-[10px] px-2 py-0.5 rounded-md bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-400 font-medium border border-stone-200 dark:border-stone-700"
                                >
                                  {topic}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Action Button */}
                          <div className="pt-2 border-t border-border dark:border-stone-800 flex items-center justify-between">
                            {subject.interactiveSubjectId ? (
                              <button
                                type="button"
                                onClick={() => navigate(`/subject/${subject.interactiveSubjectId}`)}
                                className="px-3 py-1.5 rounded-full bg-primary hover:bg-[#1E3FE0] text-white text-[11px] font-bold transition-all press flex items-center gap-1.5 cursor-pointer shadow-xs"
                              >
                                <BookOpen className="h-3 w-3" />
                                <span>Open Full Notes & MCQs</span>
                                <ArrowRight className="h-3 w-3" />
                              </button>
                            ) : (
                              <span className="text-[11px] text-muted-foreground font-medium flex items-center gap-1">
                                <CheckCircle2 className="h-3.5 w-3.5 text-success" />
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
