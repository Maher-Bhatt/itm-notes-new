import { useParams, Link, useNavigate } from "react-router-dom";
import { getSubject, getAllTopicIds, subjects } from "@/data/subjects";
import { Subject } from "@/data/types";
import { useProgress } from "@/hooks/useProgress";
import { useSubject } from "@/hooks/useAcademicData";
import {
  CheckCircle,
  BookOpen,
  Bookmark,
  ChevronRight,
  ChevronDown,
  HelpCircle,
  FolderDown,
  Zap,
  ArrowLeft,
  Sparkles,
  Award,
  Layers,
  Clock,
  GraduationCap
} from "lucide-react";
import { SUBJECT_IMP_DATA } from "@/data/impQuestionsData";
import { useState, useMemo, useEffect } from "react";
import { SearchDialog } from "@/components/SearchDialog";
import { BackToTop } from "@/components/BackToTop";
import { SubjectDashboardSkeleton } from "@/components/PageSkeletonLoaders";

export default function SubjectDashboard() {
  const { subjectId } = useParams<{ subjectId: string }>();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [collapsedUnits, setCollapsedUnits] = useState<string[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [subjectId]);

  // 1. Check if it's already a static subject ID (e.g. "sem3-dbms", "sem4-os")
  const staticSubject = useMemo(() => getSubject(subjectId || ""), [subjectId]);

  // 2. If not found statically (e.g. it's a Supabase UUID), fetch from database
  const isLikelyUuid = subjectId && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(subjectId);
  const { data: dbSubject, isLoading: isDbLoading } = useSubject(!staticSubject && isLikelyUuid ? subjectId : undefined);

  // 3. Resolve the subject
  const subject: Subject | undefined = useMemo(() => {
    if (staticSubject) return staticSubject;
    if (!dbSubject) return undefined;
    const dbSub = dbSubject as any;

    const match = getSubject(dbSub.code) || getSubject(dbSub.name);
    if (match) return match;

    return {
      id: dbSub.id,
      name: dbSub.name,
      code: dbSub.code || "",
      color: dbSub.color || "bg-primary",
      icon: dbSub.icon || "book-open",
      description: dbSub.description || "",
      semester: dbSub.semester || dbSub.semester_number || 1,
      units: (dbSub.units || []).map((u: any) => ({
        id: u.id,
        title: u.title,
        description: u.description || "",
        topics: (u.topics || []).map((t: any) => ({
          id: t.id,
          title: t.title,
          simpleExplanation: "",
          detailedExplanation: "",
          keyPoints: [],
          examples: [],
          mcqs: [],
        })),
      })),
    };
  }, [staticSubject, dbSubject]);

  const { isCompleted, isBookmarked, getSubjectProgress } = useProgress();

  const siblingSubjects = useMemo(
    () => (subject ? subjects.filter((s) => s.semester === subject.semester) : []),
    [subject?.semester]
  );

  if (isDbLoading) {
    return <SubjectDashboardSkeleton />;
  }

  if (!subject) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F6F3EC] dark:bg-[#0E0E10] px-4">
        <div className="text-center max-w-md p-8 rounded-[24px] bg-white dark:bg-[#1C1C1E] border border-[#E8E4DA] dark:border-neutral-800 shadow-sm space-y-4">
          <GraduationCap className="w-12 h-12 text-[#2B4EFF] mx-auto opacity-80" />
          <h2 className="text-xl font-extrabold text-[#111111] dark:text-white">Subject notes not found</h2>
          <p className="text-sm text-[#6B7280] dark:text-neutral-400">
            We couldn't locate the requested course syllabus in our academic registry.
          </p>
          <Link
            to="/subjects"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-[#2B4EFF] text-white text-xs font-bold hover:bg-[#1E3EDB] transition-colors"
          >
            ← Browse All Subjects
          </Link>
        </div>
      </div>
    );
  }

  const topicIds = getAllTopicIds(subject.id);
  const progress = getSubjectProgress(topicIds);
  const totalTopics = topicIds.length;
  const completedTopicsCount = topicIds.filter((id) => isCompleted(id)).length;

  const toggleUnit = (unitId: string) => {
    setCollapsedUnits((prev) =>
      prev.includes(unitId) ? prev.filter((id) => id !== unitId) : [...prev, unitId]
    );
  };

  const hasImpQuestions = Boolean(SUBJECT_IMP_DATA[subject.id]);

  return (
    <div className="min-h-screen bg-[#F6F3EC] dark:bg-[#0E0E10] text-[#111111] dark:text-white pb-24">
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-5 space-y-6">
        
        {/* ── 1. CLEAN BREADCRUMB & SWITCHER HEADER ───────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E8E4DA] dark:border-neutral-800">
          <div className="flex items-center gap-2 flex-wrap text-xs font-medium">
            <Link
              to="/subjects"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-[#1C1C1E] border border-[#E8E4DA] dark:border-neutral-800 text-xs font-bold text-[#111111] dark:text-white hover:border-[#2B4EFF] transition-colors shadow-2xs"
            >
              <ArrowLeft className="h-3.5 w-3.5 text-[#2B4EFF]" />
              <span>All Subjects</span>
            </Link>
            <span className="text-[#6B7280]">/</span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#E6EAFD] text-[#2B4EFF] font-bold text-[11px]">
              Semester {subject.semester}
            </span>
            <span className="text-[#6B7280]">/</span>
            <span className="font-bold text-[#111111] dark:text-white">
              {subject.code || subject.name.split("—")[0].trim()}
            </span>
          </div>

          {/* Quick Subject Select Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#6B7280] hidden sm:inline">Switch Course:</span>
            <select
              value={subject.id}
              onChange={(e) => navigate(`/subject/${e.target.value}`)}
              className="h-8 px-3 rounded-full border border-[#E8E4DA] dark:border-neutral-800 bg-white dark:bg-[#1C1C1E] text-xs font-bold text-[#111111] dark:text-white outline-none cursor-pointer hover:border-[#2B4EFF] transition-all"
            >
              <optgroup label="Semester 5">
                {subjects
                  .filter((s) => s.semester === 5)
                  .map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.code ? `[${s.code}] ` : ""}{s.name.split("—")[0].trim()}
                    </option>
                  ))}
              </optgroup>
              <optgroup label="Semester 4">
                {subjects
                  .filter((s) => s.semester === 4)
                  .map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.code ? `[${s.code}] ` : ""}{s.name.split("—")[0].trim()}
                    </option>
                  ))}
              </optgroup>
              <optgroup label="Semester 3">
                {subjects
                  .filter((s) => s.semester === 3)
                  .map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.code ? `[${s.code}] ` : ""}{s.name.split("—")[0].trim()}
                    </option>
                  ))}
              </optgroup>
              <optgroup label="Semester 2">
                {subjects
                  .filter((s) => s.semester === 2)
                  .map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.code ? `[${s.code}] ` : ""}{s.name.split("—")[0].trim()}
                    </option>
                  ))}
              </optgroup>
              <optgroup label="Semester 1">
                {subjects
                  .filter((s) => s.semester === 1)
                  .map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.code ? `[${s.code}] ` : ""}{s.name.split("—")[0].trim()}
                    </option>
                  ))}
              </optgroup>
            </select>
          </div>
        </div>

        {/* ── 2. ELEGANT SUBJECT HERO CARD ─────────────────────────────────── */}
        <div className="rounded-[24px] bg-white dark:bg-[#1C1C1E] border border-[#E8E4DA] dark:border-neutral-800 p-6 sm:p-8 shadow-xs space-y-5">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-5">
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                {subject.code && (
                  <span className="px-3 py-1 rounded-full font-mono text-xs font-bold bg-[#E6EAFD] text-[#2B4EFF] dark:bg-blue-950/40 dark:text-blue-300">
                    {subject.code}
                  </span>
                )}
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#F6F3EC] dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                  Semester {subject.semester} Curriculum
                </span>
                <span className="text-xs text-[#6B7280] flex items-center gap-1 font-medium">
                  <Layers className="w-3.5 h-3.5" />
                  {subject.units?.length || 0} Units · {totalTopics} Topics
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-[#111111] dark:text-white tracking-tight leading-tight">
                {subject.name}
              </h1>

              <p className="text-xs sm:text-sm text-[#6B7280] dark:text-neutral-400 leading-relaxed max-w-3xl">
                {subject.description || "Master core concepts with step-by-step lecture notes, code implementations, diagrams, and verified university exam questions."}
              </p>
            </div>

            {/* Progress Card */}
            <div className="flex items-center sm:flex-col justify-between sm:justify-center p-4 rounded-2xl bg-[#F6F3EC] dark:bg-neutral-800/60 border border-[#E8E4DA] dark:border-neutral-800 min-w-[160px] text-center gap-2">
              <div className="text-left sm:text-center">
                <div className="text-2xl sm:text-3xl font-black text-[#111111] dark:text-white font-mono">
                  {progress}%
                </div>
                <div className="text-[10px] uppercase font-bold text-[#6B7280] dark:text-neutral-400 tracking-wider">
                  Syllabus Mastered
                </div>
              </div>
              <div className="w-24 sm:w-full h-2 rounded-full bg-white dark:bg-neutral-700 overflow-hidden">
                <div
                  className="h-full bg-[#2B4EFF] rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-[10px] font-semibold text-[#6B7280]">
                {completedTopicsCount} of {totalTopics} topics read
              </span>
            </div>
          </div>

          {/* Quick Action Pills Strip (Pure CampusLoop tokens) */}
          <div className="pt-2 border-t border-[#EFECE6] dark:border-neutral-800 flex flex-wrap items-center gap-2.5">
            {hasImpQuestions && (
              <button
                type="button"
                onClick={() => navigate(`/imp-questions/${subject.id}`)}
                className="px-4 py-2 rounded-full bg-[#2B4EFF] text-white hover:bg-[#1E3EDB] text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Exam IMP Questions (3, 5, 7 Marks)</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => navigate(`/materials?subject=${subject.id}`)}
              className="px-4 py-2 rounded-full bg-[#F6F3EC] dark:bg-neutral-800 hover:bg-[#EFECE6] text-neutral-800 dark:text-neutral-200 border border-[#E8E4DA] dark:border-neutral-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <FolderDown className="w-3.5 h-3.5 text-[#2B4EFF]" />
              <span>College PDFs & Manuals</span>
            </button>

            <button
              type="button"
              onClick={() => navigate(`/subject/${subject.id}/cheat-sheet`)}
              className="px-4 py-2 rounded-full bg-[#F6F3EC] dark:bg-neutral-800 hover:bg-[#EFECE6] text-neutral-800 dark:text-neutral-200 border border-[#E8E4DA] dark:border-neutral-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>Last-Night Cheat Sheet</span>
            </button>

            <button
              type="button"
              onClick={() => navigate(`/mock-exam`)}
              className="px-4 py-2 rounded-full bg-[#D7F75B] hover:bg-[#C6E84A] text-[#111111] text-xs font-extrabold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer ml-auto"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#111111]" />
              <span>Practice MCQs</span>
            </button>
          </div>
        </div>

        {/* ── 3. HORIZONTAL SIBLING SUBJECTS STRIP ─────────────────────────── */}
        {siblingSubjects.length > 1 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs font-bold text-[#6B7280] whitespace-nowrap pl-1">
              Semester {subject.semester}:
            </span>
            {siblingSubjects.map((sib) => {
              const isCurrent = sib.id === subject.id || sib.code === subject.code;
              const shortName = sib.name.replace("Comprehensive University Syllabus for ", "").split("—")[0].trim();
              return (
                <button
                  key={sib.id}
                  type="button"
                  onClick={() => navigate(`/subject/${sib.id}`)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 border ${
                    isCurrent
                      ? "bg-[#111111] text-white dark:bg-white dark:text-[#111111] border-transparent shadow-xs"
                      : "bg-white dark:bg-[#1C1C1E] text-[#6B7280] dark:text-neutral-400 hover:text-[#111111] dark:hover:text-white border-[#E8E4DA] dark:border-neutral-800"
                  }`}
                >
                  {sib.code && <span className="opacity-70 font-mono text-[10px]">{sib.code}</span>}
                  <span>{shortName}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* ── 4. BEAUTIFUL, UNCLUTTERED UNIT ACCORDION CARDS ──────────────── */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-base font-bold text-[#111111] dark:text-white">
              Course Units & Detailed Topics
            </h2>
            <span className="text-xs font-medium text-[#6B7280]">
              Click any topic to read full notes & solutions
            </span>
          </div>

          {(subject.units || []).map((unit, unitIdx) => {
            const isCollapsed = collapsedUnits.includes(unit.id);
            const unitTopics = unit.topics || [];
            const completedInUnit = unitTopics.filter((t) => isCompleted(t.id)).length;
            const unitProgressPct = unitTopics.length > 0 ? Math.round((completedInUnit / unitTopics.length) * 100) : 0;

            return (
              <div
                key={unit.id}
                className="rounded-[22px] bg-white dark:bg-[#1C1C1E] border border-[#E8E4DA] dark:border-neutral-800 overflow-hidden shadow-xs transition-all"
              >
                {/* Unit Card Header */}
                <button
                  type="button"
                  onClick={() => toggleUnit(unit.id)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left hover:bg-[#F6F3EC]/40 dark:hover:bg-neutral-800/30 transition-colors cursor-pointer select-none"
                >
                  <div className="flex items-start sm:items-center gap-3.5 flex-1 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-[#E6EAFD] text-[#2B4EFF] dark:bg-blue-950/60 dark:text-blue-300 font-extrabold text-xs flex items-center justify-center shrink-0">
                      U{unitIdx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-sm sm:text-base text-[#111111] dark:text-white leading-snug">
                          {unit.title}
                        </h3>
                      </div>
                      {unit.description && (
                        <p className="text-xs text-[#6B7280] dark:text-neutral-400 line-clamp-1 mt-0.5">
                          {unit.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="hidden sm:inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#F6F3EC] dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                      {completedInUnit} / {unitTopics.length} done
                    </span>
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-[#6B7280] hover:bg-[#F6F3EC] dark:hover:bg-neutral-800 transition-colors">
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isCollapsed ? "-rotate-90" : "rotate-0"
                        }`}
                      />
                    </div>
                  </div>
                </button>

                {/* Topics List Inside Unit */}
                {!isCollapsed && (
                  <div className="border-t border-[#EFECE6] dark:border-neutral-800/80 divide-y divide-[#EFECE6] dark:divide-neutral-800/60 bg-white dark:bg-[#1C1C1E]">
                    {unitTopics.map((topic, topicIdx) => {
                      const completed = isCompleted(topic.id);
                      const bookmarked = isBookmarked(topic.id);
                      const mcqCount = topic.mcqs?.length ?? 0;

                      return (
                        <div
                          key={topic.id}
                          onClick={() => navigate(`/subject/${subject.id}/topic/${topic.id}`)}
                          className="p-3.5 sm:p-4 px-4 sm:px-6 hover:bg-[#F6F3EC]/70 dark:hover:bg-neutral-800/50 transition-all flex items-center justify-between gap-4 cursor-pointer group"
                        >
                          <div className="flex items-center gap-3.5 flex-1 min-w-0">
                            <div
                              className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold transition-colors ${
                                completed
                                  ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400"
                                  : "bg-[#F6F3EC] text-[#6B7280] dark:bg-neutral-800 dark:text-neutral-400 group-hover:bg-[#E6EAFD] group-hover:text-[#2B4EFF]"
                              }`}
                            >
                              {completed ? (
                                <CheckCircle className="w-4 h-4" />
                              ) : (
                                <span>{topicIdx + 1}</span>
                              )}
                            </div>

                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-xs sm:text-sm text-[#111111] dark:text-neutral-100 group-hover:text-[#2B4EFF] dark:group-hover:text-[#3D5EFF] transition-colors leading-snug">
                                {topic.title}
                              </h4>
                              <div className="flex items-center gap-2 mt-1 flex-wrap">
                                {mcqCount > 0 && (
                                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E6EAFD] text-[#2B4EFF] dark:bg-blue-950/40 dark:text-blue-300">
                                    {mcqCount} Practice MCQs
                                  </span>
                                )}
                                {topic.examples && topic.examples.length > 0 && (
                                  <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#F6F3EC] dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                                    Solved Examples
                                  </span>
                                )}
                                {topic.theoryQuestions && topic.theoryQuestions.length > 0 && (
                                  <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#F6F3EC] dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                                    {topic.theoryQuestions.length} Exam Q&A
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 shrink-0">
                            {bookmarked && (
                              <Bookmark className="w-4 h-4 text-amber-500 fill-amber-500" />
                            )}
                            <span className="hidden md:inline-flex text-xs font-bold text-[#2B4EFF] group-hover:underline">
                              Read Notes
                            </span>
                            <ChevronRight className="w-4 h-4 text-[#6B7280] group-hover:text-[#2B4EFF] group-hover:translate-x-1 transition-all" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <BackToTop />
    </div>
  );
}
