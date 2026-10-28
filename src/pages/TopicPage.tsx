import { useParams, Link, useNavigate } from "react-router-dom";
import { getTopic, getAdjacentTopics, getSubject } from "@/data/subjects";
import { Subject, Topic } from "@/data/types";
import { useProgress } from "@/hooks/useProgress";
import { useGamification } from "@/hooks/useGamification";
import { useTopic, useSubject } from "@/hooks/useAcademicData";
import { MCQQuiz } from "@/components/MCQQuiz";
import { TestMe } from "@/components/TestMe";
import { MarkdownRenderer, extractTOC } from "@/components/MarkdownRenderer";
import {
  Bookmark,
  CheckCircle,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Copy,
  Check,
  Maximize2,
  Minimize2,
  Loader2,
  HelpCircle,
  Clock,
  Printer,
  Layers,
  Zap,
  MoreVertical,
  Share2,
  Highlighter,
  MessageSquare,
  Flag,
  Trash2,
  Plus,
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { usePomodoro } from "@/contexts/PomodoroContext";
import { AudioNotesPlayer } from "@/components/AudioNotesPlayer";
import { FlashcardsModal, Flashcard } from "@/components/FlashcardsModal";
import { BilingualExplanation } from "@/components/BilingualExplanation";
import { VivaOralPrepModal } from "@/components/VivaOralPrepModal";
import { ReportErrataModal } from "@/components/ReportErrataModal";
import { useAnnotations } from "@/hooks/useAnnotations";
import { shareTopicToSocial, shareToWhatsApp } from "@/utils/shareUtils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useState, useEffect, useCallback, useMemo, useRef, memo } from "react";
import { SearchDialog } from "@/components/SearchDialog";
import { Footer } from "@/components/Footer";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BackToTop } from "@/components/BackToTop";
import { toast } from "sonner";

const XcodeBlock = memo(function XcodeBlock({ code, label, variant }: { code: string; label?: string; variant?: "output" }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [code]);

  return (
    <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-[#F6F3EC] dark:bg-neutral-900 overflow-hidden my-3">
      <div className="flex items-center justify-between px-3.5 py-2 bg-neutral-200/60 dark:bg-neutral-800/60 border-b border-neutral-200 dark:border-neutral-800">
        <span className="text-[11px] font-mono font-bold text-[#111111] dark:text-neutral-300">
          {label || (variant === "output" ? "Output" : "Code")}
        </span>
        <button onClick={handleCopy} className="text-neutral-500 hover:text-[#111111] dark:hover:text-white transition-colors p-1 rounded">
          {copied ? <Check className="h-3.5 w-3.5 text-[#2B4EFF]" /> : <Copy className="h-3.5 w-3.5" />}
        </button>
      </div>
      <div className="p-3.5 overflow-x-auto text-[#111111] dark:text-neutral-100">
        <pre><code className="text-[13px] font-mono leading-relaxed">{code}</code></pre>
      </div>
    </div>
  );
});

const ReadingProgressBar = memo(function ReadingProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number | null = null;
    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        const totalScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        if (totalScroll > 0 && barRef.current) {
          const currentProgress = Math.min(100, Math.max(0, (window.scrollY / totalScroll) * 100));
          barRef.current.style.width = `${currentProgress}%`;
        }
        rafId = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-[60] bg-transparent pointer-events-none">
      <div
        ref={barRef}
        className="h-full bg-gradient-electric transition-[width] duration-75 ease-out shadow-lg shadow-primary/30"
        style={{ width: "0%" }}
      />
    </div>
  );
});

const ContentTOC = memo(function ContentTOC({ markdown }: { markdown: string }) {
  const [activeId, setActiveId] = useState("");
  const toc = useMemo(() => extractTOC(markdown), [markdown]);

  useEffect(() => {
    if (toc.length < 2) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );
    toc.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [toc]);

  if (toc.length < 2) return null;

  return (
    <div className="space-y-0.5">
      <p className="text-[10px] font-semibold text-white/50 uppercase tracking-wider mb-2 px-2">On This Page</p>
      {toc.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={`block text-[12px] py-1.5 transition-colors rounded-lg ${
            item.level === 3 ? "pl-6" : "pl-2"
          } ${
            activeId === item.id
              ? "text-primary font-medium bg-primary/10"
              : "text-white/60 hover:text-white hover:bg-white/10"
          } press`}
        >
          {item.text}
        </a>
      ))}
    </div>
  );
});

export default function TopicPage() {
  const { subjectId, topicId } = useParams<{ subjectId: string; topicId: string }>();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [vivaModalOpen, setVivaModalOpen] = useState(false);
  const [errataModalOpen, setErrataModalOpen] = useState(false);
  const [annotationsDrawerOpen, setAnnotationsDrawerOpen] = useState(false);
  const [newStickyNote, setNewStickyNote] = useState("");

  const staticResult = useMemo(() => getTopic(subjectId || "", topicId || ""), [subjectId, topicId]);
  const staticSubject = useMemo(() => getSubject(subjectId || ""), [subjectId]);

  const isTopicUuid = topicId && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(topicId);
  const isSubjectUuid = subjectId && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(subjectId);

  const { data: dbTopic, isLoading: isTopicLoading } = useTopic(!staticResult && isTopicUuid ? topicId : undefined);
  const { data: dbSubject, isLoading: isSubjectLoading } = useSubject(!staticSubject && isSubjectUuid ? subjectId : undefined);

  const subject: Subject | undefined = useMemo(() => {
    if (staticSubject) return staticSubject;
    if (staticResult?.subject) return staticResult.subject;
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
  }, [staticSubject, staticResult, dbSubject]);

  const resolvedTopic = useMemo(() => {
    if (staticResult) {
      return { topic: staticResult.topic, unitTitle: staticResult.unitTitle };
    }
    if (!dbTopic) return undefined;
    const dbTop = dbTopic as any;
    return {
      topic: {
        id: dbTop.id,
        title: dbTop.title,
        simpleExplanation: dbTop.simple_explanation || "",
        detailedExplanation: dbTop.detailed_explanation || "",
        richContent: dbTop.rich_content || undefined,
        shortNotes: dbTop.short_notes || undefined,
        examples: dbTop.examples || [],
        keyPoints: (dbTop.key_points || []).map((kp: any) => kp.point),
        theoryQuestions: (dbTop.theory_questions || []),
        mcqs: (dbTop.mcqs || []).map((m: any) => ({
          question: m.question,
          options: m.options,
          correctIndex: m.correct_index,
          explanation: m.explanation,
        })),
      } as Topic,
      unitTitle: "Lecture Unit",
    };
  }, [staticResult, dbTopic]);

  const adjacent = useMemo(() => {
    if (subject && resolvedTopic) {
      return getAdjacentTopics(subject.id, resolvedTopic.topic.id);
    }
    return { prev: null, next: null };
  }, [subject, resolvedTopic]);

  const { isCompleted, isBookmarked, toggleComplete, toggleBookmark, saveMcqScore } = useProgress();
  const { recordTopicCompleted, recordQuizCompleted, unlockAchievement, checkDailyStreak } = useGamification();
  const { timeLeft: pomodoroTimeLeft, isRunning: isPomodoroRunning, startTimer: startPomodoro, setIsModalOpen: setIsPomodoroModalOpen } = usePomodoro();

  const [flashcardsOpen, setFlashcardsOpen] = useState(false);

  const currentTopicId = resolvedTopic?.topic.id || topicId || "global";
  const { annotations, addHighlight, addPersonalNote, removeAnnotation } = useAnnotations(currentTopicId);

  const flashcards = useMemo<Flashcard[]>(() => {
    const list: Flashcard[] = [];
    if (resolvedTopic?.topic.keyPoints) {
      resolvedTopic.topic.keyPoints.forEach((kp, idx) => {
        list.push({
          id: `kp-${idx}`,
          category: "Exam Point",
          front: kp.split(":")[0] || `Key Concept ${idx + 1}`,
          back: kp.includes(":") ? kp.split(":").slice(1).join(":").trim() : kp,
        });
      });
    }
    if (resolvedTopic?.topic.theoryQuestions) {
      resolvedTopic.topic.theoryQuestions.forEach((tq, idx) => {
        list.push({
          id: `tq-${idx}`,
          category: `Theory Question (${tq.marks})`,
          front: tq.question,
          back: tq.answer.replace(/```[\s\S]*?```/g, '').slice(0, 300) + (tq.answer.length > 300 ? '...' : ''),
          hint: tq.keyPoints?.[0],
        });
      });
    }
    if (resolvedTopic?.topic.mcqs) {
      resolvedTopic.topic.mcqs.forEach((m, idx) => {
        list.push({
          id: `mcq-${idx}`,
          category: "Practice Problem",
          front: m.question,
          back: `Correct Answer: ${m.options[m.correctIndex]}\n\n${m.explanation}`,
        });
      });
    }
    return list;
  }, [resolvedTopic]);

  useEffect(() => {
    try {
      checkDailyStreak();
      if (subjectId === 'ca-101') {
        unlockAchievement('mst-survivor');
      }
    } catch (e) {
      console.warn('Gamification check error:', e);
    }
  }, [subjectId, checkDailyStreak, unlockAchievement]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return;
      }
      if ((e.key === "f" || e.key === "F") && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        setFocusMode((prev) => !prev);
      } else if ((e.key === "b" || e.key === "B") && !e.ctrlKey && !e.metaKey && resolvedTopic?.topic.id) {
        e.preventDefault();
        toggleBookmark(resolvedTopic.topic.id);
        const willBeBookmarked = !isBookmarked(resolvedTopic.topic.id);
        toast.info(willBeBookmarked ? '🔖 Topic bookmarked!' : 'Bookmark removed');
      } else if (e.key === "Escape" && focusMode) {
        setFocusMode(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [focusMode, resolvedTopic?.topic.id, isBookmarked, toggleBookmark]);

  const handleShare = () => {
    if (!resolvedTopic) return;
    shareTopicToSocial({
      subjectName: subject?.name || 'ITM Notes',
      topicTitle: resolvedTopic.topic.title,
      url: window.location.href,
      unitTitle: resolvedTopic.unitTitle,
    });
  };

  const handleSaveNote = () => {
    if (!newStickyNote.trim()) return;
    addPersonalNote(newStickyNote.trim());
    setNewStickyNote("");
    toast.success("Personal study note saved!");
  };

  if (isTopicLoading || isSubjectLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <p className="text-xs text-white/60">Loading topic…</p>
        </div>
      </div>
    );
  }

  if (!resolvedTopic || !subject) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mx-auto mb-4">
            <BookOpen className="h-6 w-6 text-white/60" />
          </div>
          <h2 className="text-2xl font-bold mb-2 text-white">Topic not found</h2>
          <p className="text-white/60 mb-4">The topic you're looking for doesn't exist.</p>
          <Link to="/" className="text-primary hover:text-white/80 press">Back to Home</Link>
        </div>
      </div>
    );
  }

  const { topic, unitTitle } = resolvedTopic;
  const completed = isCompleted(topic.id);
  const bookmarked = isBookmarked(topic.id);
  const hasRichContent = Boolean(topic.richContent || topic.detailedExplanation);

  const fullAudioLectureScript = `${topic.title}. From Unit: ${unitTitle}. Subject: ${subject.name}. Overview: ${topic.simpleExplanation}. ${topic.keyPoints && topic.keyPoints.length > 0 ? "Key exam points to remember: " + topic.keyPoints.join(". ") : ""}`;

  const handleComplete = () => {
    if (!completed) {
      recordTopicCompleted();
    }
    toggleComplete(topic.id);
  };

  const allUnits = subject?.units || [];

  return (
    <div className={`min-h-screen bg-background flex flex-col ${focusMode ? "focus-mode" : ""}`}>
      <ReadingProgressBar />

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />

      <header className={`sticky top-0 z-50 bg-black/40 backdrop-blur-md border-b border-white/10 transition-all duration-300 ${focusMode ? "opacity-0 pointer-events-none -translate-y-full" : ""}`}>
        <div className="max-w-[1400px] mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-white/10 text-white press">
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <button onClick={() => navigate(`/subject/${subjectId}`)} className="p-1.5 -ml-1.5 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors press">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <nav className="hidden sm:flex items-center gap-2 text-[14px] text-white/60 font-medium">
              <Link to="/" className="hover:text-white transition-colors press">Home</Link>
              <ChevronRight className="h-4 w-4 opacity-40" />
              <Link to={`/subject/${subjectId}`} className="hover:text-white transition-colors press">{subject?.name}</Link>
              <ChevronRight className="h-4 w-4 opacity-40" />
              <span className="text-white truncate max-w-[250px]">{topic.title}</span>
            </nav>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={handleComplete}
              className={`h-8 sm:h-9 px-2.5 sm:px-4 rounded-lg text-[12px] sm:text-[13px] font-semibold inline-flex items-center gap-1.5 sm:gap-2 transition-all press ${
                completed
                  ? "bg-accent/10 text-accent-foreground hover:bg-accent/20 border border-accent/20"
                  : "bg-white/10 hover:bg-white/20 text-white border border-white/10"
              }`}
            >
              <CheckCircle className="h-4 w-4" />
              <span className="hidden sm:inline">{completed ? "Completed" : "Mark Complete"}</span>
            </button>
            <TestMe mcqs={topic.mcqs} topicId={topic.id} topicTitle={topic.title} />

            <button
              onClick={() => {
                if (!isPomodoroRunning) {
                  startPomodoro();
                } else {
                  setIsPomodoroModalOpen(true);
                }
              }}
              title={isPomodoroRunning ? `Focus session active: ${Math.floor(pomodoroTimeLeft / 60)}m left` : "Start 25m Focus Sprint directly"}
              className={`hidden sm:inline-flex h-8 sm:h-9 px-2.5 sm:px-3 rounded-lg text-[12px] sm:text-[13px] font-semibold items-center gap-1.5 transition-all press ${
                isPomodoroRunning
                  ? "bg-accent/20 text-accent-foreground border border-accent/30 animate-pulse"
                  : "bg-white/10 hover:bg-white/20 text-white border border-white/10"
              }`}
            >
              <Clock className={`h-4 w-4 ${isPomodoroRunning ? "text-accent-foreground" : "text-primary"}`} />
              <span className="hidden md:inline font-mono">
                {isPomodoroRunning
                  ? `${String(Math.floor(pomodoroTimeLeft / 60)).padStart(2, '0')}:${String(pomodoroTimeLeft % 60).padStart(2, '0')}`
                  : "Focus 25m"}
              </span>
            </button>

            <button
              onClick={() => setFlashcardsOpen(true)}
              title="Active Recall Flashcards"
              className="hidden md:inline-flex h-8 sm:h-9 px-2.5 sm:px-3 rounded-lg text-[12px] sm:text-[13px] font-semibold items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white transition-all press"
            >
              <Layers className="h-4 w-4 text-accent-foreground" />
              <span className="hidden lg:inline">Flashcards</span>
            </button>

            <button
              onClick={handleShare}
              title="Share Topic Link with Classmates"
              className="hidden sm:inline-flex p-1.5 sm:p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors press"
            >
              <Share2 className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>

            <button
              onClick={() => setAnnotationsDrawerOpen(true)}
              title={`Personal Notes & Highlights (${annotations.length})`}
              className="relative p-1.5 sm:p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors press"
            >
              <Highlighter className="h-4 w-4 sm:h-5 sm:w-5 text-accent-foreground" />
              {annotations.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-white font-bold text-[9px] flex items-center justify-center">
                  {annotations.length}
                </span>
              )}
            </button>

            <button
              onClick={() => window.print()}
              title="Save Topic as PDF / Print Exam Guide"
              className="hidden sm:inline-flex p-1.5 sm:p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors press"
            >
              <Printer className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>

            <button
              onClick={() => setFocusMode(!focusMode)}
              title={focusMode ? "Exit Focus Mode (F)" : "Focus Mode (F)"}
              className="hidden sm:inline-flex p-1.5 sm:p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors press"
            >
              {focusMode ? <Minimize2 className="h-4 w-4 sm:h-5 sm:w-5" /> : <Maximize2 className="h-4 w-4 sm:h-5 sm:w-5" />}
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="sm:hidden p-1.5 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors press">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 sm:hidden rounded-xl shadow-xl border border-white/10 glass-card">
                <DropdownMenuItem onClick={() => setFlashcardsOpen(true)} className="press hover:bg-white/5">
                  <Layers className="mr-2 h-4 w-4 text-accent-foreground" />
                  <span>Flashcards</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleShare} className="press hover:bg-white/5">
                  <Share2 className="mr-2 h-4 w-4 text-accent-foreground" />
                  <span>Share Topic</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setAnnotationsDrawerOpen(true)} className="press hover:bg-white/5">
                  <Highlighter className="mr-2 h-4 w-4 text-accent-foreground" />
                  <span>My Notes ({annotations.length})</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setVivaModalOpen(true)} className="press hover:bg-white/5">
                  <HelpCircle className="mr-2 h-4 w-4 text-primary" />
                  <span>Oral / Viva Prep</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setErrataModalOpen(true)} className="press hover:bg-white/5">
                  <Flag className="mr-2 h-4 w-4 text-destructive" />
                  <span>Report Error (+25 XP)</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => window.print()} className="press hover:bg-white/5">
                  <Printer className="mr-2 h-4 w-4 text-white/60" />
                  <span>Save / Print PDF</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <button onClick={() => toggleBookmark(topic.id)} className="p-1.5 sm:p-2 rounded-lg hover:bg-white/10 transition-colors press">
              <Bookmark className={`h-4 w-4 sm:h-5 sm:w-5 ${bookmarked ? "fill-accent text-accent-foreground" : "text-white/60 hover:text-white"}`} />
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 max-w-[1400px] mx-auto w-full">
        <aside className={`${focusMode ? "hidden" : ""} ${sidebarOpen ? "fixed inset-0 z-40 lg:relative" : "hidden lg:block"} lg:w-72 lg:shrink-0`}>
          {sidebarOpen && <div className="fixed inset-0 bg-black/60 backdrop-blur-sm lg:hidden z-40" onClick={() => setSidebarOpen(false)} />}
          <div className={`${sidebarOpen ? "fixed left-0 top-14 bottom-0 w-72 z-50 bg-background shadow-xl" : ""} lg:sticky lg:top-14 lg:h-[calc(100vh-3.5rem)] overflow-y-auto border-r border-white/10 p-4 scrollbar-thin`}>
            <div className="mb-4 pb-3 border-b border-white/10">
              <h3 className="font-bold text-sm text-white truncate">{subject?.name}</h3>
              <p className="text-[11px] text-white/60">{subject?.code} • Semester {subject?.semester}</p>
            </div>
            {allUnits.map((unit, uIdx) => (
              <div key={unit.id} className="mb-4">
                <p className="text-[11px] font-bold text-white/50 uppercase tracking-wider mb-1.5 px-2">
                  Unit {uIdx + 1}: {unit.title}
                </p>
                <div className="space-y-0.5">
                  {(unit.topics || []).map((t) => {
                    const isActive = t.id === topic.id;
                    const isDone = isCompleted(t.id);
                    return (
                      <Link
                        key={t.id}
                        to={`/subject/${subjectId}/topic/${t.id}`}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center justify-between text-xs py-1.5 px-2.5 rounded-lg transition-colors press ${
                          isActive
                            ? "bg-gradient-electric text-white font-semibold shadow-lg shadow-primary/40"
                            : "text-white/60 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <span className="truncate pr-2">{t.title}</span>
                        {isDone && <CheckCircle className={`h-3.5 w-3.5 shrink-0 ${isActive ? "text-white" : "text-accent-foreground"}`} />}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </aside>

        <main className="flex-1 min-w-0 pb-20">
          {focusMode && (
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-full px-5 py-2.5 shadow-xl animate-fade-in">
              <Minimize2 className="h-4 w-4 text-white/60" />
              <span className="text-[13px] font-medium text-white">Focus Mode</span>
              <span className="text-[12px] text-white/40 mx-1">·</span>
              <button
                onClick={() => setFocusMode(false)}
                className="text-[13px] text-primary font-bold hover:underline press"
              >
                Exit (Esc)
              </button>
            </div>
          )}

          <div className="flex gap-0">
            <div className={`${focusMode ? "max-w-4xl mx-auto" : "flex-1 min-w-0"} px-4 sm:px-6 md:px-12 py-6 sm:py-10 transition-all duration-300`}>
              <div className="flex items-center justify-between gap-2 mb-3">
                <p className="text-[11px] sm:text-[13px] text-primary font-bold uppercase tracking-widest">{unitTitle}</p>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setVivaModalOpen(true)}
                    className="px-2.5 py-1 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary text-[11px] font-bold inline-flex items-center gap-1 transition-all press"
                  >
                    <HelpCircle className="h-3 w-3" /> Viva Prep
                  </button>
                  <button
                    onClick={() => setErrataModalOpen(true)}
                    className="px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white/60 hover:text-white text-[11px] font-medium inline-flex items-center gap-1 transition-all press"
                  >
                    <Flag className="h-3 w-3 text-destructive" /> Report Typo
                  </button>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-3 sm:mb-4 leading-tight text-white tracking-tight">
                {topic.title}
              </h1>

              <div className="hidden print-header mb-6">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-extrabold text-lg text-white">ITM SLS BARODA UNIVERSITY</span>
                  <span className="text-xs text-white/60 font-semibold">B.Tech CSE · Semester 3</span>
                </div>
                <h1 className="text-2xl font-black text-white">{topic.title}</h1>
                <p className="text-xs text-white/70">{subject?.name} ({subject?.code}) · {unitTitle}</p>
              </div>

              <div className="mb-4">
                <BilingualExplanation topicTitle={topic.title} />
              </div>

              <AudioNotesPlayer
                title={topic.title}
                textToRead={fullAudioLectureScript}
              />

              <div className="topic-rich-content-wrapper max-w-[900px] mt-6">
                <Tabs defaultValue="detailed" className="w-full">
                  <TabsList className="mb-6 sm:mb-8 w-full max-w-[400px] h-10 sm:h-12 p-1 bg-white/10 rounded-xl border border-white/10">
                    <TabsTrigger value="detailed" className="text-[12px] sm:text-[14px] font-medium rounded-lg h-full data-[state=active]:bg-gradient-electric data-[state=active]:text-white shadow-lg shadow-primary/20">Detailed Notes</TabsTrigger>
                    <TabsTrigger value="revision" className="text-[12px] sm:text-[14px] font-medium rounded-lg h-full data-[state=active]:bg-gradient-electric data-[state=active]:text-white shadow-lg shadow-primary/20">Quick Revision</TabsTrigger>
                  </TabsList>

                  <TabsContent value="detailed" className="mt-0 focus-visible:outline-none">
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-6 p-3 rounded-xl bg-primary/10 border border-primary/20">
                      <div className="flex items-center gap-2 text-xs font-medium text-white">
                        <span className="w-2 h-2 rounded-full bg-accent-foreground animate-pulse"></span>
                        <span>Estimated Study Time: ~15 mins</span>
                      </div>
                      {!isPomodoroRunning ? (
                        <button
                          onClick={startPomodoro}
                          className="px-3 py-1.5 rounded-xl bg-gradient-electric text-white font-bold text-xs inline-flex items-center gap-1.5 hover:bg-primary/90 press shadow-lg shadow-primary/20"
                        >
                          <Clock className="h-3.5 w-3.5" /> Start 25m Focus Sprint (+50 XP)
                        </button>
                      ) : (
                        <button
                          onClick={() => setIsPomodoroModalOpen(true)}
                          className="px-3 py-1.5 rounded-xl bg-accent/20 text-accent-foreground border border-accent/30 font-bold text-xs inline-flex items-center gap-1.5"
                        >
                          <Clock className="h-3.5 w-3.5 text-accent-foreground" /> Focus Active: {Math.floor(pomodoroTimeLeft / 60)}m left
                        </button>
                      )}
                    </div>
                    <div className="mb-6 sm:mb-10 bg-white/10 rounded-xl p-4 sm:p-6 border border-white/10">
                      <p className="text-[11px] sm:text-[12px] font-bold text-primary uppercase tracking-widest mb-2 sm:mb-3 flex items-center gap-2">
                        <BookOpen className="h-4 w-4" /> Quick Summary
                      </p>
                      <p className="text-[14px] sm:text-[16px] leading-[1.7] sm:leading-[1.8] text-white/90 font-medium">{topic.simpleExplanation}</p>
                    </div>
                    <div className="rich-content prose-lg max-w-none">
                      <MarkdownRenderer content={topic.richContent || topic.detailedExplanation} />
                    </div>
                  </TabsContent>

                  <TabsContent value="revision" className="mt-0 focus-visible:outline-none">
                    <div className="bg-accent/10 rounded-xl p-8 border border-accent/20">
                      <h2 className="text-2xl font-bold mb-6 text-accent-foreground flex items-center gap-3">
                        <CheckCircle className="h-6 w-6" />
                        Revision Notes
                      </h2>
                      {topic.shortNotes ? (
                        <div className="rich-content prose-lg max-w-none">
                          <MarkdownRenderer content={topic.shortNotes} />
                        </div>
                      ) : (
                        <div className="space-y-5">
                          <p className="text-accent-foreground/80 font-medium">Key formulas and definitions to remember before an exam.</p>
                          <ul className="space-y-3">
                            {topic.keyPoints && topic.keyPoints.map((point, index) => (
                              <li key={index} className="flex items-start gap-3">
                                <span className="h-2 w-2 rounded-full bg-accent-foreground mt-2 shrink-0" />
                                <span className="text-white/90">{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>

                {topic.theoryQuestions && topic.theoryQuestions.length > 0 && (
                  <div className="mt-12 sm:mt-16">
                    <h2 className="text-xl sm:text-2xl font-extrabold mb-4 sm:mb-6 pb-2 sm:pb-3 border-b border-white/10 text-white">Important Exam Questions</h2>
                    <Accordion type="single" collapsible className="w-full space-y-2 sm:space-y-3">
                      {topic.theoryQuestions.map((q, idx) => (
                        <AccordionItem key={idx} value={`item-${idx}`} className="border border-white/10 rounded-xl bg-white/5">
                          <AccordionTrigger className="text-left font-bold text-[13px] sm:text-[15px] hover:no-underline py-3 sm:py-4 press">
                            <span className="flex items-center gap-2">
                              <span className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary font-mono">{q.marks}</span>
                              {q.question}
                            </span>
                          </AccordionTrigger>
                          <AccordionContent className="pt-2 pb-4 text-white/60 text-xs sm:text-sm leading-relaxed border-t border-white/10">
                            <MarkdownRenderer content={q.answer} />
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                )}

                {topic.mcqs && topic.mcqs.length > 0 && (
                  <div className="mt-16 mb-8">
                    <h2 className="text-2xl font-extrabold mb-6 pb-3 border-b border-white/10 text-white">Practice Quiz ({topic.mcqs.length} MCQs)</h2>
                    <MCQQuiz
                      mcqs={topic.mcqs}
                      topicId={topic.id}
                      onComplete={(score, total) => {
                        saveMcqScore(topic.id, score, total);
                        recordQuizCompleted(score, total);
                      }}
                    />
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between mt-12 pt-8 border-t border-white/10">
                {adjacent.prev ? (
                  <button onClick={() => navigate(`/subject/${subjectId}/topic/${adjacent.prev!.id}`)} className="press inline-flex items-center gap-1.5 text-[14px] text-white/60 hover:text-white transition-colors">
                    <ChevronLeft className="h-4 w-4" /> Previous
                  </button>
                ) : <div />}
                {adjacent.next ? (
                  <button onClick={() => navigate(`/subject/${subjectId}/topic/${adjacent.next!.id}`)} className="press inline-flex items-center gap-1.5 text-[14px] text-primary font-medium">
                    Next <ChevronRight className="h-4 w-4" />
                  </button>
                ) : <div />}
              </div>
            </div>

            {hasRichContent && !focusMode && (
              <aside className="hidden xl:block w-52 shrink-0 sticky top-12 self-start h-[calc(100vh-3rem)] overflow-y-auto p-4 border-l border-white/10">
                <ContentTOC markdown={topic.richContent || topic.detailedExplanation || ""} />
              </aside>
            )}
          </div>

          {!focusMode && <Footer />}
        </main>
      </div>

      <BackToTop />

      <FlashcardsModal
        isOpen={flashcardsOpen}
        onClose={() => setFlashcardsOpen(false)}
        topicTitle={topic.title}
        cards={flashcards}
      />

      <VivaOralPrepModal
        isOpen={vivaModalOpen}
        onClose={() => setVivaModalOpen(false)}
        subjectFilter={subject?.name}
      />

      <ReportErrataModal
        isOpen={errataModalOpen}
        onClose={() => setErrataModalOpen(false)}
        topicId={topic.id}
        topicTitle={topic.title}
      />

      {annotationsDrawerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end p-0 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-black/40 border-l border-white/10 h-full max-w-md w-full p-6 shadow-2xl flex flex-col slide-in">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-accent/10 text-accent-foreground flex items-center justify-center font-bold">
                  <Highlighter className="h-4 w-4" />
                </span>
                <div>
                  <h3 className="font-bold text-sm text-white">My Topic Notes & Highlights</h3>
                  <p className="text-[11px] text-white/60">{annotations.length} items saved on this topic</p>
                </div>
              </div>

              <button
                onClick={() => setAnnotationsDrawerOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/10 text-white/60 hover:text-white press"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="py-4 border-b border-white/10 space-y-2">
              <label className="text-xs font-bold text-white block">
                Add Sticky Exam Note:
              </label>
              <textarea
                value={newStickyNote}
                onChange={(e) => setNewStickyNote(e.target.value)}
                placeholder="e.g. Asked in 2024 MST-2 paper! Remember time complexity is O(N log N)..."
                rows={3}
                className="w-full rounded-xl bg-white/5 border border-white/10 p-3 text-xs text-white placeholder-white/40 focus:ring-1 focus:ring-ring resize-none"
              />
              <button
                onClick={handleSaveNote}
                disabled={!newStickyNote.trim()}
                className="w-full py-2 rounded-xl bg-gradient-electric text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-primary/20 hover:bg-primary/90 disabled:opacity-50 transition-all press"
              >
                <Plus className="h-4 w-4" /> Save Sticky Note
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-3 scrollbar-thin pr-1">
              {annotations.length === 0 ? (
                <div className="py-12 text-center">
                  <MessageSquare className="h-8 w-8 text-white/40 mx-auto mb-2" />
                  <p className="text-xs font-bold text-white">No notes or highlights yet</p>
                  <p className="text-[11px] text-white/60 mt-1 px-4">
                    Type a personal exam note above to review when revising before tests.
                  </p>
                </div>
              ) : (
                annotations.map((ann) => (
                  <div key={ann.id} className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-2 relative group press">
                    <div className="flex items-center justify-between text-[10px] text-white/60">
                      <span className="font-mono font-bold uppercase">
                        {ann.type === 'sticky_note' ? '📝 Personal Note' : '🟨 Text Highlight'}
                      </span>
                      <button
                        onClick={() => removeAnnotation(ann.id)}
                        className="p-1 rounded hover:bg-red-500/10 text-white/60 hover:text-red-400 transition-colors press"
                        title="Delete Note"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    {ann.highlightedText && (
                      <blockquote className="border-l-2 border-primary/60 pl-2 text-xs italic text-white/60 bg-primary/5 p-1.5 rounded">
                        "{ann.highlightedText}"
                      </blockquote>
                    )}

                    {ann.noteText && (
                      <p className="text-xs font-medium text-white leading-relaxed whitespace-pre-line">
                        {ann.noteText}
                      </p>
                    )}

                    <span className="text-[9px] text-white/40 block text-right">
                      {new Date(ann.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}