import { useParams, Link, useNavigate } from "react-router-dom";
import { getTopic, getAdjacentTopics, getSubject } from "@/data/subjects";
import { Subject, Topic } from "@/data/types";
import { useProgress } from "@/hooks/useProgress";
import { useGamification } from "@/hooks/useGamification";
import { useTopic, useSubject } from "@/hooks/useAcademicData";
import { MCQQuiz } from "@/components/MCQQuiz";
import { TestMe } from "@/components/TestMe";
import { MarkdownRenderer, extractTOC } from "@/components/MarkdownRenderer";
import { Bookmark, CheckCircle, BookOpen, ChevronLeft, ChevronRight, Menu, X, Copy, Check, Maximize2, Minimize2, Loader2, HelpCircle, Clock, Printer, Layers, Sparkles } from "lucide-react";
import { usePomodoro } from "@/contexts/PomodoroContext";
import { AudioNotesPlayer } from "@/components/AudioNotesPlayer";
import { FlashcardsModal, Flashcard } from "@/components/FlashcardsModal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useState, useEffect, useCallback, useMemo } from "react";
import { SearchDialog } from "@/components/SearchDialog";
import { Footer } from "@/components/Footer";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

function XcodeBlock({ code, label, variant }: { code: string; label?: string; variant?: "output" }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [code]);

  return (
    <div className="xcode-block">
      <div className="xcode-block-header">
        <span className={`text-[11px] font-mono ${variant === "output" ? "text-success/70" : "text-muted-foreground"}`}>
          {label || (variant === "output" ? "Output" : "Code")}
        </span>
        <button onClick={handleCopy} className="text-muted-foreground hover:text-foreground transition-colors apple-press p-1 -m-1">
          {copied ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
        </button>
      </div>
      <div className="xcode-block-body">
        <pre><code className={`text-[13px] leading-relaxed ${variant === "output" ? "text-success/80" : ""}`}>{code}</code></pre>
      </div>
    </div>
  );
}

/* ── In-page TOC sidebar for rich content ── */
function ContentTOC({ markdown, activeId }: { markdown: string; activeId: string }) {
  const toc = useMemo(() => extractTOC(markdown), [markdown]);
  if (toc.length < 2) return null;

  return (
    <div className="space-y-0.5">
      <p className="text-[10px] font-semibold text-muted-foreground/50 uppercase tracking-wider mb-2 px-2">On This Page</p>
      {toc.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={`block text-[12px] py-1 transition-colors rounded ${
            item.level === 3 ? "pl-6" : "pl-2"
          } ${
            activeId === item.id
              ? "text-primary font-medium bg-primary/8"
              : "text-muted-foreground/60 hover:text-muted-foreground"
          }`}
        >
          {item.text}
        </a>
      ))}
    </div>
  );
}

export default function TopicPage() {
  const { subjectId, topicId } = useParams<{ subjectId: string; topicId: string }>();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [activeTocId, setActiveTocId] = useState("");

  // 1. Static lookup
  const staticResult = useMemo(() => getTopic(subjectId || "", topicId || ""), [subjectId, topicId]);
  const staticSubject = useMemo(() => getSubject(subjectId || ""), [subjectId]);

  // 2. Database lookup if UUID
  const isTopicUuid = topicId && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(topicId);
  const isSubjectUuid = subjectId && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(subjectId);

  const { data: dbTopic, isLoading: isTopicLoading } = useTopic(!staticResult && isTopicUuid ? topicId : undefined);
  const { data: dbSubject, isLoading: isSubjectLoading } = useSubject(!staticSubject && isSubjectUuid ? subjectId : undefined);

  // 3. Resolve Subject
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
      semester: 3,
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

  // 4. Resolve Topic
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

  // Check daily streak when user visits topic & unlock MST Survivor for CA
  useEffect(() => {
    checkDailyStreak();
    if (subjectId === 'ca-101') {
      unlockAchievement('mst-survivor');
    }
  }, [subjectId, checkDailyStreak, unlockAchievement]);

  // Keyboard shortcut: F to toggle focus mode
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "f" && !e.ctrlKey && !e.metaKey && !(e.target instanceof HTMLInputElement) && !(e.target instanceof HTMLTextAreaElement)) {
        setFocusMode((prev) => !prev);
      }
      if (e.key === "Escape" && focusMode) setFocusMode(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [focusMode]);

  // Scroll spy for TOC
  useEffect(() => {
    if (!resolvedTopic?.topic.richContent) return;
    const toc = extractTOC(resolvedTopic.topic.richContent);
    if (toc.length < 2) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveTocId(entry.target.id);
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
  }, [resolvedTopic?.topic.richContent, topicId]);

  useEffect(() => {
    setSidebarOpen(false);
    setActiveTocId("");
    window.scrollTo(0, 0);
  }, [topicId]);

  if (isTopicLoading || isSubjectLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center animate-fade-in flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading topic notes...</p>
        </div>
      </div>
    );
  }

  if (!resolvedTopic) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center animate-fade-in">
          <h2 className="text-xl font-bold mb-2">Topic not found</h2>
          <p className="text-sm text-muted-foreground mb-4">We couldn't find the requested topic.</p>
          <Link to="/" className="text-primary hover:underline text-sm font-medium">← Back to home</Link>
        </div>
      </div>
    );
  }

  const { topic, unitTitle } = resolvedTopic;
  const completed = isCompleted(topic.id);
  const bookmarked = isBookmarked(topic.id);
  const hasRichContent = true;

  const handleComplete = () => {
    if (!completed) {
      recordTopicCompleted();
    }
    toggleComplete(topic.id);
  };

  const allUnits = subject?.units || [];

  // Comprehensive audio script including title, overview, exam points, in-depth lecture notes, examples, and revision
  const fullAudioLectureScript = useMemo(() => {
    if (!topic) return "";
    const sections: string[] = [];

    sections.push(`Topic: ${topic.title}. From unit: ${unitTitle}. Subject: ${subject?.name || ""}.`);

    if (topic.simpleExplanation) {
      sections.push(`High level summary: ${topic.simpleExplanation}`);
    }

    if (topic.keyPoints && topic.keyPoints.length > 0) {
      sections.push(`Key exam scoring points to remember: ${topic.keyPoints.join(". ")}.`);
    }

    const detailRaw = topic.richContent || topic.detailedExplanation || "";
    if (detailRaw) {
      const cleanedDetail = detailRaw
        .replace(/```[\s\S]*?```/g, "")
        .replace(/<[^>]*>/g, "")
        .replace(/#{1,6}\s+/g, "")
        .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1")
        .replace(/[*_~`]/g, "")
        .replace(/\|[^\n]+\|/g, "")
        .trim();
      if (cleanedDetail) {
        sections.push(`In-depth lecture notes: ${cleanedDetail}`);
      }
    }

    if (topic.examples && topic.examples.length > 0) {
      const examplesSummary = topic.examples
        .map((ex, i) => `Example ${i + 1}: ${ex.title}. ${ex.problem}. Solution explanation: ${ex.explanation}`)
        .join(". ");
      sections.push(`Worked practical examples: ${examplesSummary}`);
    }

    if (topic.shortNotes) {
      sections.push(`Quick revision recap: ${topic.shortNotes}`);
    }

    return sections.join(" ");
  }, [topic, unitTitle, subject]);

  return (
    <div className={`min-h-screen bg-background flex flex-col ${focusMode ? "focus-mode" : ""}`}>
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />

      {/* Header */}
      <header className={`sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b transition-all duration-300 ${focusMode ? "opacity-0 pointer-events-none -translate-y-full" : ""}`}>
        <div className="max-w-[1400px] mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 -ml-2 rounded-md hover:bg-secondary text-foreground">
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <button onClick={() => navigate(`/subject/${subjectId}`)} className="p-1.5 -ml-1.5 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <nav className="hidden sm:flex items-center gap-2 text-[14px] text-muted-foreground font-medium">
              <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
              <ChevronRight className="h-4 w-4 opacity-40" />
              <Link to={`/subject/${subjectId}`} className="hover:text-foreground transition-colors">{subject?.name}</Link>
              <ChevronRight className="h-4 w-4 opacity-40" />
              <span className="text-foreground truncate max-w-[250px]">{topic.title}</span>
            </nav>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={handleComplete}
              className={`h-8 sm:h-9 px-2.5 sm:px-4 rounded-md text-[12px] sm:text-[13px] font-semibold inline-flex items-center gap-1.5 sm:gap-2 transition-all ${
                completed ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20" : "bg-secondary hover:bg-secondary/80 text-foreground"
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
              className={`hidden sm:inline-flex h-8 sm:h-9 px-2.5 sm:px-3 rounded-md text-[12px] sm:text-[13px] font-semibold items-center gap-1.5 transition-all ${
                isPomodoroRunning
                  ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 animate-pulse !inline-flex"
                  : "bg-secondary hover:bg-secondary/80 text-foreground"
              }`}
            >
              <Clock className={`h-4 w-4 ${isPomodoroRunning ? "text-emerald-500" : "text-primary"}`} />
              <span className="hidden md:inline font-mono">
                {isPomodoroRunning
                  ? `${String(Math.floor(pomodoroTimeLeft / 60)).padStart(2, '0')}:${String(pomodoroTimeLeft % 60).padStart(2, '0')}`
                  : "Focus 25m"}
              </span>
            </button>
            {/* Flashcards Trigger - hidden on very small screens */}
            <button
              onClick={() => setFlashcardsOpen(true)}
              title="Active Recall Flashcards"
              className="hidden md:inline-flex h-8 sm:h-9 px-2.5 sm:px-3 rounded-md text-[12px] sm:text-[13px] font-semibold items-center gap-1.5 bg-secondary hover:bg-secondary/80 text-foreground transition-all apple-press"
            >
              <Layers className="h-4 w-4 text-amber-500" />
              <span className="hidden lg:inline">Flashcards</span>
            </button>

            {/* Print / Save to PDF - hidden on mobile */}
            <button
              onClick={() => window.print()}
              title="Save Topic as PDF / Print Exam Guide"
              className="hidden sm:inline-flex p-1.5 sm:p-2 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
            >
              <Printer className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>

            <button
              onClick={() => setFocusMode(!focusMode)}
              title={focusMode ? "Exit Focus Mode (F)" : "Focus Mode (F)"}
              className="hidden sm:inline-flex p-1.5 sm:p-2 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
            >
              {focusMode ? <Minimize2 className="h-4 w-4 sm:h-5 sm:w-5" /> : <Maximize2 className="h-4 w-4 sm:h-5 sm:w-5" />}
            </button>
            <button onClick={() => toggleBookmark(topic.id)} className="p-1.5 sm:p-2 rounded-md hover:bg-secondary transition-colors">
              <Bookmark className={`h-4 w-4 sm:h-5 sm:w-5 ${bookmarked ? "fill-amber-500 text-amber-500" : "text-muted-foreground hover:text-foreground"}`} />
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 max-w-[1400px] mx-auto w-full">
        {/* Left sidebar — topic navigation */}
        <aside className={`${focusMode ? "hidden" : ""} ${sidebarOpen ? "fixed inset-0 z-40 lg:relative" : "hidden lg:block"} lg:w-72 lg:shrink-0`}>
          {sidebarOpen && <div className="fixed inset-0 bg-black/40 backdrop-blur-sm lg:hidden z-40" onClick={() => setSidebarOpen(false)} />}
          <div className={`${sidebarOpen ? "fixed left-0 top-14 bottom-0 w-72 z-50 bg-background shadow-xl" : ""} lg:sticky lg:top-14 lg:h-[calc(100vh-3.5rem)] overflow-y-auto border-r border-border p-4 custom-scrollbar`}>
            <p className="text-[12px] font-bold text-muted-foreground uppercase tracking-widest mb-4 px-2">Table of Contents</p>
            {allUnits.map((unit) => (
              <div key={unit.id} className="mb-6">
                <p className="text-[13px] font-bold text-foreground/80 px-2 mb-2 leading-tight">{unit.title}</p>
                <div className="space-y-1">
                  {unit.topics.map((t) => {
                    const isCurrent = t.id === topic.id;
                    const tCompleted = isCompleted(t.id);
                    return (
                      <button
                        key={t.id}
                        onClick={() => { navigate(`/subject/${subjectId}/topic/${t.id}`); setSidebarOpen(false); }}
                        className={`w-full text-left px-3 py-2 rounded-md text-[14px] flex items-start gap-3 transition-all ${
                          isCurrent ? "bg-primary text-primary-foreground font-medium shadow-sm" : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                        }`}
                      >
                        {tCompleted ? (
                          <CheckCircle className={`h-4 w-4 shrink-0 mt-0.5 ${isCurrent ? "text-primary-foreground/90" : "text-emerald-500"}`} />
                        ) : (
                          <BookOpen className={`h-4 w-4 shrink-0 mt-0.5 ${isCurrent ? "text-primary-foreground/70" : "opacity-40"}`} />
                        )}
                        <span className="leading-snug">{t.title}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Main reading area */}
        <main className="flex-1 min-w-0 animate-fade-in pb-20">
          {/* Focus Mode floating toolbar */}
          {focusMode && (
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-background/90 backdrop-blur-md border border-border rounded-full px-5 py-2.5 shadow-2xl animate-fade-in">
              <Minimize2 className="h-4 w-4 text-muted-foreground" />
              <span className="text-[13px] font-medium text-foreground">Focus Mode</span>
              <span className="text-[12px] text-muted-foreground/50 mx-1">·</span>
              <button
                onClick={() => setFocusMode(false)}
                className="text-[13px] text-primary font-bold hover:underline"
              >
                Exit (Esc)
              </button>
            </div>
          )}

          <div className={`flex gap-0 ${focusMode ? "" : ""}`}>
            {/* Reading column */}
            <div className={`${focusMode ? "max-w-4xl mx-auto" : "flex-1 min-w-0"} px-4 sm:px-6 md:px-12 py-6 sm:py-10 transition-all duration-300`}>
              <p className="text-[11px] sm:text-[13px] text-primary font-bold uppercase tracking-widest mb-3 sm:mb-4">{unitTitle}</p>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-3 sm:mb-4 leading-tight text-foreground tracking-tight">{topic.title}</h1>

              {/* Print Only Official Document Header */}
              <div className="hidden print-header mb-6">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-extrabold text-lg text-black">ITM SLS BARODA UNIVERSITY</span>
                  <span className="text-xs text-gray-600 font-semibold">B.Tech CSE · Semester 3</span>
                </div>
                <h1 className="text-2xl font-black text-black">{topic.title}</h1>
                <p className="text-xs text-gray-700">{subject?.name} ({subject?.code}) · {unitTitle}</p>
              </div>

              {/* Audio Notes Player (Listen to Complete Notes) */}
              <AudioNotesPlayer
                title={topic.title}
                textToRead={fullAudioLectureScript}
              />

              {/* ── Rich Content Mode ── */}
              <div className="topic-rich-content-wrapper max-w-[900px]">
                <Tabs defaultValue="detailed" className="w-full">
                  <TabsList className="mb-6 sm:mb-8 w-full max-w-[400px] h-10 sm:h-12 p-1 bg-secondary/50 rounded-lg">
                    <TabsTrigger value="detailed" className="text-[12px] sm:text-[14px] font-medium rounded-md h-full data-[state=active]:shadow-sm">Detailed Notes</TabsTrigger>
                    <TabsTrigger value="revision" className="text-[12px] sm:text-[14px] font-medium rounded-md h-full data-[state=active]:shadow-sm">Quick Revision</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="detailed" className="mt-0 focus-visible:outline-none">
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-6 p-3 rounded-xl bg-primary/5 border border-primary/20">
                      <div className="flex items-center gap-2 text-xs font-medium text-foreground">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span>Estimated Study Time: ~15 mins</span>
                      </div>
                      {!isPomodoroRunning ? (
                        <button
                          onClick={startPomodoro}
                          className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground font-bold text-xs inline-flex items-center gap-1.5 hover:opacity-90 apple-press shadow-sm"
                        >
                          <Clock className="h-3.5 w-3.5" /> Start 25m Focus Sprint (+50 XP)
                        </button>
                      ) : (
                        <button
                          onClick={() => setIsPomodoroModalOpen(true)}
                          className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 font-bold text-xs inline-flex items-center gap-1.5"
                        >
                          <Clock className="h-3.5 w-3.5 text-emerald-500" /> Focus Active: {Math.floor(pomodoroTimeLeft / 60)}m left
                        </button>
                      )}
                    </div>
                    <div className="mb-6 sm:mb-10 bg-secondary/30 rounded-xl p-4 sm:p-6 border border-border/50">
                      <p className="text-[11px] sm:text-[12px] font-bold text-primary uppercase tracking-widest mb-2 sm:mb-3 flex items-center gap-2">
                        <BookOpen className="h-4 w-4" /> Quick Summary
                      </p>
                      <p className="text-[14px] sm:text-[16px] leading-[1.7] sm:leading-[1.8] text-foreground/90 font-medium">{topic.simpleExplanation}</p>
                    </div>
                    <div className="rich-content prose-lg max-w-none">
                      <MarkdownRenderer content={topic.richContent || topic.detailedExplanation} />
                    </div>
                  </TabsContent>

                  <TabsContent value="revision" className="mt-0 focus-visible:outline-none">
                    <div className="bg-amber-500/10 rounded-2xl p-8 border border-amber-500/20">
                      <h2 className="text-2xl font-bold mb-6 text-amber-600 dark:text-amber-500 flex items-center gap-3">
                        <CheckCircle className="h-6 w-6" />
                        Revision Notes
                      </h2>
                      {topic.shortNotes ? (
                        <div className="rich-content prose-lg max-w-none prose-amber">
                          <MarkdownRenderer content={topic.shortNotes} />
                        </div>
                      ) : (
                        <div className="space-y-5">
                          <p className="text-amber-700/80 dark:text-amber-400/80 font-medium">Key formulas and definitions to remember before an exam.</p>
                          <ul className="space-y-3">
                            {topic.keyPoints.map((kp, idx) => (
                              <li key={idx} className="flex items-start gap-3">
                                <span className="text-amber-500 mt-1.5">•</span>
                                <span className="text-[16px] leading-relaxed text-amber-900 dark:text-amber-100">{kp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>

                {topic.examples.length > 0 && (
                  <div className="mt-16">
                    <h2 className="text-2xl font-extrabold mb-8 pb-3 border-b border-border text-foreground">Worked Examples</h2>
                    <div className="space-y-8">
                      {topic.examples.map((ex, i) => (
                        <div key={i} className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                          <div className="px-6 py-4 bg-secondary/30 border-b border-border">
                            <h4 className="font-bold text-[16px] text-foreground">{ex.title}</h4>
                            <p className="text-[14px] text-muted-foreground mt-1">{ex.problem}</p>
                          </div>
                          <div className="p-6 space-y-5">
                            <p className="text-[15px] text-foreground/90 leading-relaxed">{ex.explanation}</p>
                            {ex.code && <XcodeBlock code={ex.code} />}
                            {ex.output && <XcodeBlock code={ex.output} variant="output" />}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {topic.keyPoints.length > 0 && (
                  <div className="mt-16">
                    <h2 className="text-2xl font-extrabold mb-6 pb-3 border-b border-border text-foreground">Key Points</h2>
                    <div className="space-y-3 bg-secondary/20 rounded-xl p-6 border border-border/50">
                      {topic.keyPoints.map((point, i) => (
                        <div key={i} className="flex items-start gap-4">
                          <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[12px] font-bold shrink-0 mt-0.5">{i + 1}</span>
                          <span className="text-[16px] text-foreground/90 leading-relaxed font-medium">{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {topic.theoryQuestions && topic.theoryQuestions.length > 0 && (
                  <div className="mt-16">
                    <div className="flex items-center justify-between pb-3 border-b border-border mb-6">
                      <h2 className="text-2xl font-extrabold text-foreground flex items-center gap-2.5">
                        <HelpCircle className="h-6 w-6 text-primary" />
                        Exam Theory Questions ({topic.theoryQuestions.length})
                      </h2>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                        University Exam Pattern
                      </span>
                    </div>
                    <div className="space-y-4">
                      {topic.theoryQuestions.map((tq, i) => (
                        <details
                          key={i}
                          className="group bg-card border border-border/80 rounded-xl p-5 open:bg-secondary/15 open:border-primary/40 transition-colors shadow-sm"
                        >
                          <summary className="font-bold text-[15px] sm:text-[16px] text-foreground cursor-pointer flex items-center justify-between gap-4 select-none">
                            <div className="flex items-start gap-3">
                              <span className="w-6 h-6 rounded-md bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                                Q{i + 1}
                              </span>
                              <span>{tq.question}</span>
                            </div>
                            <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-bold shrink-0 ${
                              tq.marks === '2 Marks' || tq.marks === '3 Marks'
                                ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                                : tq.marks === '5 Marks'
                                ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400'
                                : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                            }`}>
                              {tq.marks}
                            </span>
                          </summary>
                          <div className="mt-4 pt-4 border-t border-border/60 text-[15px] leading-relaxed text-foreground/90 rich-content prose-base max-w-none">
                            <MarkdownRenderer content={tq.answer} />
                            {tq.keyPoints && tq.keyPoints.length > 0 && (
                              <div className="mt-4 p-3.5 bg-secondary/30 rounded-lg border border-border/50">
                                <p className="text-[11px] font-bold text-primary uppercase tracking-wider mb-2">
                                  Mark-Scoring Key Points:
                                </p>
                                <ul className="list-disc pl-5 space-y-1 text-xs text-muted-foreground">
                                  {tq.keyPoints.map((kp, kIdx) => (
                                    <li key={kIdx}>{kp}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </details>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-16 mb-8">
                  <h2 className="text-2xl font-extrabold mb-6 pb-3 border-b border-border text-foreground">Practice Quiz ({topic.mcqs.length} MCQs)</h2>
                  <MCQQuiz
                    mcqs={topic.mcqs}
                    topicId={topic.id}
                    onComplete={(score, total) => {
                      saveMcqScore(topic.id, score, total);
                      recordQuizCompleted(score, total);
                    }}
                  />
                </div>
              </div>

              {/* Nav */}
              <div className="flex items-center justify-between mt-12 pt-8 border-t border">
                {adjacent.prev ? (
                  <button onClick={() => navigate(`/subject/${subjectId}/topic/${adjacent.prev!.id}`)} className="apple-press inline-flex items-center gap-1.5 text-[14px] text-muted-foreground hover:text-foreground transition-colors">
                    <ChevronLeft className="h-4 w-4" /> Previous
                  </button>
                ) : <div />}
                {adjacent.next ? (
                  <button onClick={() => navigate(`/subject/${subjectId}/topic/${adjacent.next!.id}`)} className="apple-press inline-flex items-center gap-1.5 text-[14px] text-primary font-medium">
                    Next <ChevronRight className="h-4 w-4" />
                  </button>
                ) : <div />}
              </div>
            </div>

            {/* Right sidebar — In-page TOC for rich content */}
            {hasRichContent && !focusMode && (
              <aside className="hidden xl:block w-52 shrink-0 sticky top-12 self-start h-[calc(100vh-3rem)] overflow-y-auto p-4 border-l border">
                <ContentTOC markdown={topic.richContent!} activeId={activeTocId} />
              </aside>
            )}
          </div>

          {!focusMode && <Footer />}
        </main>
      </div>

      {/* Active Recall Flashcards Modal */}
      <FlashcardsModal
        isOpen={flashcardsOpen}
        onClose={() => setFlashcardsOpen(false)}
        topicTitle={topic.title}
        cards={flashcards}
      />
    </div>
  );
}
