import { useState, useMemo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BookOpen,
  CheckCircle2,
  Copy,
  Download,
  ExternalLink,
  FileText,
  Filter,
  GraduationCap,
  HelpCircle,
  Printer,
  Search,
  Sparkles,
  ChevronRight,
  ChevronDown,
  AlertTriangle,
  Flame,
  Award,
  Layers,
  Code2,
  Play,
  RotateCcw,
  Check,
  Eye,
  EyeOff,
  Calendar,
  Share2,
  Volume2,
} from "lucide-react";
import { toast } from "sonner";
import {
  PREDICT_OUTPUT_QUESTIONS,
  LONG_ANSWER_QUESTIONS,
  THEORY_QUESTIONS,
  EXAM_WRITING_FORMATS,
  COMMON_MISTAKES,
  MCQ_REVISION_TABLE,
  QUICK_MCQS,
  PredictOutputItem,
  LongAnswerQuestion,
  TheoryQuestion,
} from "@/data/oopjQuestionBank";
import { openTimetable } from "@/components/GlobalTimetableModal";
import { AudioNotesPlayer } from "@/components/AudioNotesPlayer";
import { aiVoice } from "@/utils/aiVoiceEngine";
import {
  ZERO_TO_HERO_JAVA_FOUNDATION,
  REMEDIAL_SYLLABUS_SECTIONS,
  SyllabusTopicSection,
} from "@/data/oopjRemedialMasterNotes";
import { ShareRemedialModal } from "@/components/ShareRemedialModal";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";

export default function OopjImpQuestionsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"theory" | "all" | "partA" | "partB" | "partC" | "partD">("theory");
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [theoryUnitFilter, setTheoryUnitFilter] = useState<"all" | 2 | 3>("all");
  const [expandedTheoryIds, setExpandedTheoryIds] = useState<Record<string, boolean>>(() => ({
    "unit2-class-object": true,
    "unit2-constructors": true,
  }));
  const [searchQuery, setSearchQuery] = useState("");
  const [revealedOutputs, setRevealedOutputs] = useState<Record<string, boolean>>({});
  const [revealedMcqs, setRevealedMcqs] = useState<Record<number, boolean>>({});
  const [activeTraceStep, setActiveTraceStep] = useState<Record<string, number>>({});
  const [expandedTraps, setExpandedTraps] = useState<Record<string, boolean>>({});
  const [currentlySpeakingId, setCurrentlySpeakingId] = useState<string | null>(null);
  const [masteredItems, setMasteredItems] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem("itm_oopj_mastered");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const toggleTheoryExpand = (id: string) => {
    setExpandedTheoryIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const speakQuestion = (id: string, text: string) => {
    if (currentlySpeakingId === id) {
      aiVoice.stop();
      setCurrentlySpeakingId(null);
      toast.info("Audio playback stopped");
    } else {
      aiVoice.speak(text, () => {
        setCurrentlySpeakingId(null);
      });
      setCurrentlySpeakingId(id);
      toast.success("Reading question with Studio AI Narrator", {
        description: "Hands-free single AI voice lecture",
      });
    }
  };

  const filteredTheorySections = useMemo(() => {
    return REMEDIAL_SYLLABUS_SECTIONS.filter((topic) => {
      const matchesUnit = theoryUnitFilter === "all" || topic.unit === theoryUnitFilter;
      if (!searchQuery.trim()) return matchesUnit;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        topic.topicTitle.toLowerCase().includes(q) ||
        topic.beginnerConcept.toLowerCase().includes(q) ||
        topic.detailedTheory.toLowerCase().includes(q) ||
        topic.syllabusKeywords.some((k) => k.toLowerCase().includes(q));
      return matchesUnit && matchesSearch;
    });
  }, [theoryUnitFilter, searchQuery]);

  // Save mastered items to local storage
  useEffect(() => {
    try {
      localStorage.setItem("itm_oopj_mastered", JSON.stringify(masteredItems));
    } catch (e) {
      console.warn("Failed to persist mastered state:", e);
    }
  }, [masteredItems]);

  // Synchronize hash with activeTab (#part-a, #part-b, #part-c, #part-d)
  useEffect(() => {
    const syncHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === "#theory" || hash === "#notes") setActiveTab("theory");
      else if (hash === "#all") setActiveTab("all");
      else if (hash === "#part-a" || hash === "#parta") setActiveTab("partA");
      else if (hash === "#part-b" || hash === "#partb") setActiveTab("partB");
      else if (hash === "#part-c" || hash === "#partc") setActiveTab("partC");
      else if (hash === "#part-d" || hash === "#partd") setActiveTab("partD");
    };
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  const toggleMastered = (id: string) => {
    setMasteredItems((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      if (updated[id]) {
        toast.success("Marked as Mastered! Keep up the momentum.");
      }
      return updated;
    });
  };

  const toggleOutput = (id: string) => {
    setRevealedOutputs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleMcq = (idx: number) => {
    setRevealedMcqs((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const copyCode = (codeText: string, label: string) => {
    navigator.clipboard.writeText(codeText);
    toast.success(`Copied ${label} code to clipboard!`);
  };

  const handlePrint = () => {
    window.print();
  };

  // Filtered lists
  const filteredPartA = useMemo(() => {
    if (!searchQuery.trim()) return PREDICT_OUTPUT_QUESTIONS;
    const q = searchQuery.toLowerCase();
    return PREDICT_OUTPUT_QUESTIONS.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.concept.toLowerCase().includes(q) ||
        item.rule.toLowerCase().includes(q) ||
        item.code.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const filteredPartB = useMemo(() => {
    if (!searchQuery.trim()) return LONG_ANSWER_QUESTIONS;
    const q = searchQuery.toLowerCase();
    return LONG_ANSWER_QUESTIONS.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.concept.toLowerCase().includes(q) ||
        item.code.toLowerCase().includes(q) ||
        item.examNote.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const filteredPartC = useMemo(() => {
    if (!searchQuery.trim()) return THEORY_QUESTIONS;
    const q = searchQuery.toLowerCase();
    return THEORY_QUESTIONS.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.definition.toLowerCase().includes(q) ||
        item.examTip.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const totalQuestions = PREDICT_OUTPUT_QUESTIONS.length + LONG_ANSWER_QUESTIONS.length + THEORY_QUESTIONS.length;
  const masteredCount = Object.values(masteredItems).filter(Boolean).length;
  const progressPercent = Math.min(100, Math.round((masteredCount / totalQuestions) * 100));

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1500px] mx-auto space-y-8 animate-fade-in print:p-0">
      {/* ── TOP HEADER / BREADCRUMB ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-border/60">
        <div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium mb-1">
            <Link to="/imp-questions" className="hover:text-primary transition-colors">
              Question Banks
            </Link>
            <span>·</span>
            <span>Semester 3</span>
            <span>·</span>
            <span className="font-mono font-bold text-foreground">C2311C1</span>
            <span className="px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-600 font-bold text-[10px]">
              Remedial Live
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground font-display">
            OOPJ Solved Question Bank
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Object Oriented Programming with Java · Complete Step-by-Step Code, Dry Runs & Exam Strategy
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={() => openTimetable("remedial")}
            className="h-9 px-3 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground font-bold text-xs flex items-center gap-1.5 transition-all border border-border cursor-pointer shadow-xs"
            title="View Remedial Schedule"
          >
            <Calendar className="h-3.5 w-3.5 text-primary" />
            <span>Oct 26 Schedule</span>
          </button>

          <button
            onClick={() => setIsShareModalOpen(true)}
            className="h-9 px-3.5 rounded-xl bg-gradient-electric hover:opacity-90 text-white font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-md shadow-indigo-400/20 font-display"
            title="Share Remedial Guide with Classmates"
          >
            <Share2 className="h-3.5 w-3.5" />
            <span>Share Guide</span>
          </button>

          <button
            onClick={handlePrint}
            className="h-9 px-3.5 rounded-xl bg-[#183F36] text-[#D6E85D] hover:bg-[#12332C] font-black text-xs flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-md shadow-[#183F36]/20 font-display"
            title="Print or Save as PDF"
          >
            <Printer className="h-3.5 w-3.5" />
            <span>Print / PDF</span>
          </button>
        </div>
      </div>

      {/* ── HERO BANNER: PAPER PATTERN & PROGRESS ── */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#183F36] via-[#1D4A3F] to-[#12332C] text-white shadow-xl border border-[#D6E85D]/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#D6E85D]/15 via-transparent to-transparent pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10 items-center">
          <div className="lg:col-span-8 space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#D6E85D] text-[#183F36] shadow-xs">
                Official University Format
              </span>
              <span className="text-xs font-mono text-[#D6E85D] font-bold">
                Paper: Q1 MCQs | Q2 3-Mark (any 3 of 5) | Q3 5-Mark (any 3 of 5)
              </span>
            </div>

            <h2 className="text-lg sm:text-xl font-black text-white font-display">
              Master Every Code Trace, Theory Proof & Viva Trap
            </h2>
            <p className="text-xs text-[#A2BAAF] leading-relaxed max-w-3xl">
              Every program has been compiled and executed. For 5-mark answers write:{" "}
              <strong className="text-white">Definition (1m)</strong> +{" "}
              <strong className="text-white">Code (2.5m)</strong> +{" "}
              <strong className="text-white">Output (1m)</strong> +{" "}
              <strong className="text-white">Explanation (0.5m)</strong>.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
              <span className="px-2.5 py-1 rounded-xl bg-white/10 border border-white/15 text-white/90 font-mono">
                Part A: 5 Traces
              </span>
              <span className="px-2.5 py-1 rounded-xl bg-white/10 border border-white/15 text-white/90 font-mono">
                Part B: 15 Programs
              </span>
              <span className="px-2.5 py-1 rounded-xl bg-white/10 border border-white/15 text-white/90 font-mono">
                Part C: 18 Theory
              </span>
              <span className="px-2.5 py-1 rounded-xl bg-[#D6E85D]/20 border border-[#D6E85D]/40 text-[#D6E85D] font-mono font-bold">
                Part D: Strategy & 10 MCQs
              </span>
            </div>
          </div>

          {/* Right: Revision Progress Gauge */}
          <div className="lg:col-span-4 bg-black/25 backdrop-blur-md rounded-2xl p-4 border border-white/10 space-y-3 text-center sm:text-left">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white/90">Remedial Mastery Tracker</span>
              <span className="font-mono font-bold text-[#D6E85D]">{progressPercent}% Done</span>
            </div>

            <div className="h-2 rounded-full bg-white/20 overflow-hidden">
              <div
                className="h-full bg-[#D6E85D] rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-[#A2BAAF]">
              <span>
                {masteredCount} of {totalQuestions} Topics Mastered
              </span>
              <button
                onClick={() => {
                  setMasteredItems({});
                  toast.info("Progress reset.");
                }}
                className="hover:text-white underline text-[10px]"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── UNIFIED AI AUDIO LECTURE BAR ── */}
      <AudioNotesPlayer
        title="OOPJ Java Master Exam Audio Lecture"
        textToRead="Welcome to the Object Oriented Programming with Java master audio lecture. In Java, dynamic method dispatch resolves at runtime based on the actual object created on the heap. super must be the very first statement in a constructor. In abstract classes, methods can have default or abstract signatures, while interfaces allow Java to achieve multiple inheritance without diamond ambiguity. Review the 5 output traces, 15 long programs, and 18 theory comparison tables."
      />

      {/* ── SEARCH & SUB-NAVIGATION BAR ── */}
      <div className="p-3 sm:p-4 rounded-2xl bg-card border border-border shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar font-display">
          {[
            { id: "theory", label: "Zero-to-Hero Notes (Units 2 & 3)" },
            { id: "all", label: "Full Guide (Theory + All Solved Qs)" },
            { id: "partA", label: "Part A: Predict Output (5)" },
            { id: "partB", label: "Part B: 5-Mark Coding (15)" },
            { id: "partC", label: "Part C: 3-Mark Theory (18)" },
            { id: "partD", label: "Part D: Strategy & MCQs" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                activeTab === tab.id
                  ? "bg-[#183F36] text-[#D6E85D] shadow-sm font-black"
                  : "bg-secondary/60 text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Live Search */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search keywords (e.g. super, interface)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 pl-9 pr-8 rounded-xl border border-input bg-background text-xs focus:outline-none focus:ring-1 focus:ring-primary"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-xs"
            >
              ✕
            </button>
          )}
        </div>
      </div>

            {/* ─────────────────────────────────────────────────────────────────── */}
      {/* ZERO-TO-HERO SYLLABUS THEORY NOTES (UNITS 2 & 3)                    */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {(activeTab === "theory" || activeTab === "all") && (
        <div className="space-y-6">
          {/* Header & Unit Filter */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-border/80">
            <div>
              <h2 className="text-xl font-black text-foreground font-display flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-amber-500" />
                <span>Zero-to-Hero Syllabus Master Notes</span>
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Complete academic theory designed to guarantee a passing grade even if starting with zero Java knowledge.
              </p>
            </div>

            {/* Filter by Unit 2 / Unit 3 */}
            <div className="flex items-center gap-1.5 shrink-0 bg-secondary/60 p-1 rounded-xl border border-border">
              <button
                onClick={() => setTheoryUnitFilter("all")}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  theoryUnitFilter === "all"
                    ? "bg-[#183F36] text-[#D6E85D] shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                All Topics ({REMEDIAL_SYLLABUS_SECTIONS.length})
              </button>
              <button
                onClick={() => setTheoryUnitFilter(2)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  theoryUnitFilter === 2
                    ? "bg-[#183F36] text-[#D6E85D] shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Unit 2: Classes & Methods
              </button>
              <button
                onClick={() => setTheoryUnitFilter(3)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  theoryUnitFilter === 3
                    ? "bg-[#183F36] text-[#D6E85D] shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Unit 3: Inheritance & Interfaces
              </button>
            </div>
          </div>

          {/* Module 0: Beginner Zero-to-Hero Foundation Card */}
          <div className="p-5 sm:p-6 rounded-3xl bg-card border border-primary/40 shadow-md space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/15 text-indigo-400 dark:text-indigo-300 font-bold text-xs">
                MODULE 0 · FOUNDATION
              </span>
              <span className="text-[11px] font-mono text-muted-foreground">
                Read before proceeding to Units 2 & 3
              </span>
            </div>
            <h3 className="text-lg font-bold text-foreground font-display">
              {ZERO_TO_HERO_JAVA_FOUNDATION.title}
            </h3>
            <p className="text-xs text-muted-foreground">
              {ZERO_TO_HERO_JAVA_FOUNDATION.subtitle}
            </p>
            <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm">
              <MarkdownRenderer content={ZERO_TO_HERO_JAVA_FOUNDATION.content} />
            </div>
          </div>

          {/* Render All Theory Topics */}
          <div className="space-y-5">
            {filteredTheorySections.map((topic) => {
              const isExpanded = expandedTheoryIds[topic.id] ?? false;
              return (
                <div
                  key={topic.id}
                  className="rounded-3xl border border-border bg-card shadow-sm hover:border-primary/40 transition-all overflow-hidden"
                >
                  {/* Topic Accordion Header */}
                  <div
                    onClick={() => toggleTheoryExpand(topic.id)}
                    className="p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer hover:bg-secondary/30 transition-colors"
                  >
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2 py-0.5 rounded-md bg-[#183F36] text-[#D6E85D] font-mono font-bold text-[10px]">
                          Unit {topic.unit}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-secondary text-foreground font-semibold text-[10px]">
                          Weight: {topic.examMarksWeightage}
                        </span>
                        <div className="flex items-center gap-1 flex-wrap">
                          {topic.syllabusKeywords.map((k, ki) => (
                            <span key={ki} className="text-[10px] text-muted-foreground/80 font-mono">
                              #{k}
                            </span>
                          ))}
                        </div>
                      </div>

                      <h3 className="font-bold text-base sm:text-lg text-foreground font-display">
                        {topic.topicTitle}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {topic.beginnerConcept}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 pt-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          speakQuestion(topic.id, `${topic.topicTitle}. ${topic.beginnerConcept}. ${topic.detailedTheory}`);
                        }}
                        className={`p-2 rounded-xl transition-all cursor-pointer ${
                          currentlySpeakingId === topic.id
                            ? "bg-amber-500 text-black animate-pulse"
                            : "bg-secondary hover:bg-secondary/80 text-muted-foreground hover:text-foreground"
                        }`}
                        title="Listen with AI Voice"
                      >
                        <Volume2 className="h-4 w-4" />
                      </button>
                      <span className="p-1.5 rounded-xl bg-secondary/80 text-muted-foreground">
                        {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                      </span>
                    </div>
                  </div>

                  {/* Expanded Theory Body */}
                  {isExpanded && (
                    <div className="p-5 sm:p-6 border-t border-border/80 bg-background/50 space-y-6 animate-fade-in">
                      {/* Beginner Intuition Callout */}
                      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200 space-y-1">
                        <p className="font-bold flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
                          <Sparkles className="h-3.5 w-3.5" />
                          <span>Beginner Concept (Plain-English Mental Model):</span>
                        </p>
                        <p className="leading-relaxed">{topic.beginnerConcept}</p>
                      </div>

                      {/* Detailed Academic Theory */}
                      <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm">
                        <MarkdownRenderer content={topic.detailedTheory} />
                      </div>

                      {/* Code Sample with Copy */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
                          <span className="flex items-center gap-1.5 font-mono">
                            <Code2 className="h-3.5 w-3.5 text-primary" />
                            <span>Complete Compilable Java Example</span>
                          </span>
                          <button
                            onClick={() => copyCode(topic.codeSnippet, topic.topicTitle)}
                            className="px-2.5 py-1 rounded-lg bg-secondary hover:bg-secondary/80 text-foreground font-mono text-[11px] flex items-center gap-1 cursor-pointer"
                          >
                            <Copy className="h-3 w-3" />
                            <span>Copy Code</span>
                          </button>
                        </div>

                        <div className="rounded-2xl overflow-hidden border border-border/80 bg-slate-950 text-slate-100 font-mono text-xs p-4 shadow-inner">
                          <pre className="overflow-x-auto custom-scrollbar whitespace-pre leading-relaxed">
                            {topic.codeSnippet}
                          </pre>
                        </div>
                      </div>

                      {/* Expected Terminal Output */}
                      <div className="space-y-1.5">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                          Exact Execution Output (Real Terminal):
                        </span>
                        <div className="p-3 rounded-xl bg-secondary/80 border border-border font-mono text-xs text-foreground whitespace-pre-wrap">
                          {topic.output}
                        </div>
                      </div>

                      {/* Common Mistakes & Key Takeaways Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-xs space-y-2">
                          <p className="font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                            <AlertTriangle className="h-3.5 w-3.5" />
                            <span>Common Examiner Traps to Avoid:</span>
                          </p>
                          <ul className="space-y-1 list-disc list-inside text-rose-900/90 dark:text-rose-200/90 leading-relaxed">
                            {topic.commonMistakesToAvoid.map((m, mi) => (
                              <li key={mi}>{m}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-xs space-y-2">
                          <p className="font-bold text-indigo-400 dark:text-indigo-300 flex items-center gap-1.5">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            <span>Key Exam Takeaways:</span>
                          </p>
                          <ul className="space-y-1 list-disc list-inside text-indigo-200 dark:text-indigo-400/90 leading-relaxed">
                            {topic.keyTakeaways.map((k, ki) => (
                              <li key={ki}>{k}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* SECTION A: PREDICT THE OUTPUT                                      */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {(activeTab === "all" || activeTab === "partA") && (
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-1 border-b border-border/80">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black text-foreground font-display flex items-center gap-2">
                <span>Part A: Predict the Output</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 dark:text-indigo-300 font-mono font-bold">
                  {filteredPartA.length} Programs
                </span>
              </h2>
            </div>
            <span className="text-xs text-muted-foreground font-medium">Quick Marks · Step-by-Step Traces</span>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {filteredPartA.map((prog) => {
              const isMastered = !!masteredItems[prog.id];
              const isRevealed = !!revealedOutputs[prog.id];
              return (
                <div
                  key={prog.id}
                  className={`bg-card border rounded-3xl p-5 sm:p-6 shadow-sm transition-all space-y-4 ${
                    isMastered ? "border-indigo-500/40 bg-indigo-500/[0.02]" : "border-border"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <button
                        onClick={() => toggleMastered(prog.id)}
                        className={`w-7 h-7 rounded-xl border flex items-center justify-center transition-all cursor-pointer mt-0.5 shrink-0 ${
                          isMastered
                            ? "bg-indigo-500 border-indigo-500 text-white"
                            : "border-border text-transparent hover:border-primary/60"
                        }`}
                        title="Mark as Mastered"
                      >
                        <Check className="h-4 w-4 stroke-[3]" />
                      </button>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-black bg-[#183F36] text-[#D6E85D] dark:bg-[#D6E85D] dark:text-[#183F36]">
                            Program {prog.programNumber}
                          </span>
                          <h3 className="font-bold text-sm sm:text-base text-foreground font-display">
                            {prog.title}
                          </h3>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{prog.concept}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => speakQuestion(prog.id, `${prog.title}. Concept: ${prog.concept}. Rule: ${prog.rule}. Output: ${prog.output}`)}
                        className={`p-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                          currentlySpeakingId === prog.id
                            ? "bg-amber-500 text-white animate-pulse"
                            : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                        }`}
                        title="Listen to this problem"
                      >
                        <Volume2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => copyCode(prog.code, `Program ${prog.programNumber}`)}
                        className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors cursor-pointer"
                        title="Copy Code"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => toggleOutput(prog.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                          isRevealed
                            ? "bg-secondary text-foreground"
                            : "bg-[#183F36] text-[#D6E85D] shadow-xs"
                        }`}
                      >
                        {isRevealed ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                        <span>{isRevealed ? "Hide Output" : "Reveal Output"}</span>
                      </button>
                    </div>
                  </div>

                  {/* Code & Output Split */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                    <div className="lg:col-span-8 bg-slate-950 text-slate-100 p-4 rounded-2xl font-mono text-xs overflow-x-auto border border-slate-800 leading-relaxed">
                      <pre>
                        <code>{prog.code}</code>
                      </pre>
                    </div>

                    <div className="lg:col-span-4 flex flex-col justify-between space-y-3">
                      <div className="p-4 rounded-2xl bg-secondary/40 border border-border space-y-2">
                        <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block font-display">
                          Execution Output
                        </span>
                        {isRevealed ? (
                          <div className="p-3 rounded-xl bg-slate-900 text-indigo-300 font-mono text-xs border border-indigo-500/30 whitespace-pre">
                            {prog.output}
                          </div>
                        ) : (
                          <div
                            onClick={() => toggleOutput(prog.id)}
                            className="p-4 rounded-xl border border-dashed border-border text-center text-xs text-muted-foreground cursor-pointer hover:bg-secondary/60 transition-colors"
                          >
                            Click to reveal output & dry run
                          </div>
                        )}
                      </div>

                      {/* Rule Box */}
                      <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-200 text-xs space-y-1">
                        <span className="font-bold uppercase tracking-wider text-[10px] block font-display text-amber-700 dark:text-amber-300">
                          Golden Rule to Remember:
                        </span>
                        <p className="text-[11px] leading-relaxed">{prog.rule}</p>
                      </div>
                    </div>
                  </div>

                  {/* Step-by-Step Trace Accordion */}
                  <div className="p-3.5 rounded-2xl bg-secondary/20 border border-border/80 space-y-2">
                    <span className="font-bold text-xs text-foreground block font-display">
                      Line-by-Line Execution Trace:
                    </span>
                    <div className="space-y-1.5 text-xs">
                      {prog.steps.map((st) => (
                        <div key={st.step} className="flex items-start gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-primary/10 text-primary font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                            {st.step}
                          </span>
                          <p className="text-[11px] text-muted-foreground leading-relaxed flex-1">
                            {st.action}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* SECTION B: 5-MARK LONG ANSWER / PROGRAMMING QUESTIONS               */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {(activeTab === "all" || activeTab === "partB") && (
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between pb-1 border-b border-border/80">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black text-foreground font-display flex items-center gap-2">
                <span>Part B: Long Answer / Programming (5 Marks Each)</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-mono font-bold">
                  {filteredPartB.length} Questions
                </span>
              </h2>
            </div>
            <span className="text-xs text-muted-foreground font-medium">Concept + Code + Output + Dry Run</span>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {filteredPartB.map((q) => {
              const isMastered = !!masteredItems[q.id];
              const isTrapOpen = !!expandedTraps[q.id];
              return (
                <div
                  key={q.id}
                  className={`bg-card border rounded-3xl p-5 sm:p-6 shadow-sm transition-all space-y-4 ${
                    isMastered ? "border-indigo-500/40 bg-indigo-500/[0.02]" : "border-border"
                  }`}
                >
                  {/* Top Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <button
                        onClick={() => toggleMastered(q.id)}
                        className={`w-7 h-7 rounded-xl border flex items-center justify-center transition-all cursor-pointer mt-0.5 shrink-0 ${
                          isMastered
                            ? "bg-indigo-500 border-indigo-500 text-white"
                            : "border-border text-transparent hover:border-primary/60"
                        }`}
                        title="Mark as Mastered"
                      >
                        <Check className="h-4 w-4 stroke-[3]" />
                      </button>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-black bg-indigo-600 text-white">
                            {q.qNumber} · 5 Marks
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-2 py-0.5 rounded bg-secondary">
                            {q.category}
                          </span>
                        </div>
                        <h3 className="font-bold text-base sm:text-lg text-foreground font-display mt-1">
                          {q.title}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                      <button
                        onClick={() => speakQuestion(q.id, `${q.title}. Concept: ${q.concept}. Exam Tip: ${q.examNote}. Viva Trap: ${q.vivaTrap || ''}`)}
                        className={`p-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                          currentlySpeakingId === q.id
                            ? "bg-amber-500 text-white animate-pulse"
                            : "text-muted-foreground hover:text-foreground hover:bg-secondary border border-border/80"
                        }`}
                        title="Listen to this question"
                      >
                        <Volume2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => copyCode(q.code, q.title)}
                        className="px-3 py-1.5 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground font-bold text-xs flex items-center gap-1.5 transition-all border border-border cursor-pointer"
                      >
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy Code</span>
                      </button>
                    </div>
                  </div>

                  {/* Concept Definition (1 mark) */}
                  <div className="p-4 rounded-2xl bg-secondary/30 border border-border space-y-2">
                    <div className="flex items-center gap-1.5">
                      <BookOpen className="h-4 w-4 text-primary" />
                      <span className="font-bold text-xs text-foreground uppercase tracking-wider font-display">
                        1. Concept Definition (1 Mark in Exam)
                      </span>
                    </div>
                    <p className="text-xs text-foreground/90 leading-relaxed font-medium">
                      {q.concept}
                    </p>
                    {q.requirements && (
                      <ul className="pt-1 space-y-1 text-[11px] text-muted-foreground list-disc list-inside">
                        {q.requirements.map((req, rIdx) => (
                          <li key={rIdx}>{req}</li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Code Block (2.5 marks) */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-muted-foreground uppercase tracking-wider font-display text-[10px]">
                        2. Verified Program Implementation (2.5 Marks)
                      </span>
                      <span className="text-[10px] text-indigo-400 font-mono font-bold">
                        ✓ Compiles & Executes Cleanly
                      </span>
                    </div>
                    <div className="bg-slate-950 text-slate-100 p-4 rounded-2xl font-mono text-xs overflow-x-auto border border-slate-800 leading-relaxed">
                      <pre>
                        <code>{q.code}</code>
                      </pre>
                    </div>
                  </div>

                  {/* Real Output & Explanation Split */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                    {/* Output (1 mark) */}
                    <div className="lg:col-span-5 p-4 rounded-2xl bg-secondary/30 border border-border space-y-2">
                      <span className="font-bold text-[10px] text-muted-foreground uppercase tracking-wider block font-display">
                        3. Exact Console Output (1 Mark)
                      </span>
                      <div className="p-3 rounded-xl bg-slate-900 text-indigo-300 font-mono text-xs border border-indigo-500/30 whitespace-pre">
                        {q.output}
                      </div>
                    </div>

                    {/* Explanation (0.5 mark) */}
                    <div className="lg:col-span-7 p-4 rounded-2xl bg-secondary/30 border border-border space-y-2">
                      <span className="font-bold text-[10px] text-muted-foreground uppercase tracking-wider block font-display">
                        4. Step-by-Step Explanation (0.5 Mark)
                      </span>
                      <ul className="space-y-1.5 text-[11px] text-muted-foreground list-disc list-inside">
                        {q.explanationPoints.map((pt, pIdx) => (
                          <li key={pIdx} className="leading-relaxed">
                            {pt}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Trace Table if present */}
                  {q.traceTable && (
                    <div className="rounded-2xl border border-border overflow-hidden">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-secondary text-[10px] uppercase font-bold text-muted-foreground border-b border-border">
                          <tr>
                            {q.traceTable.headers.map((h, hIdx) => (
                              <th key={hIdx} className="p-2.5">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border/60">
                          {q.traceTable.rows.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-secondary/20">
                              {row.map((cell, cIdx) => (
                                <td key={cIdx} className="p-2.5 text-foreground font-medium">
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Exam Note Box (Yellow alert) */}
                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-200 text-xs space-y-1">
                    <span className="font-bold uppercase tracking-wider text-[10px] block font-display text-amber-700 dark:text-amber-300">
                      ★ Examiner Full-Marks Tip:
                    </span>
                    <p className="text-[11px] leading-relaxed">{q.examNote}</p>
                  </div>

                  {/* Viva Trap Accordion if present */}
                  {q.vivaTrap && (
                    <div className="rounded-2xl border border-border overflow-hidden">
                      <button
                        onClick={() => setExpandedTraps((prev) => ({ ...prev, [q.id]: !prev[q.id] }))}
                        className="w-full p-3 bg-secondary/20 hover:bg-secondary/40 text-left flex items-center justify-between text-xs font-bold text-foreground transition-colors cursor-pointer"
                      >
                        <span className="flex items-center gap-2">
                          <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                          <span>Viva Examiner Trap / Follow-up Question</span>
                        </span>
                        <ChevronDown
                          className={`h-4 w-4 text-muted-foreground transition-transform ${
                            isTrapOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isTrapOpen && (
                        <div className="p-4 bg-background text-xs text-muted-foreground border-t border-border leading-relaxed">
                          {q.vivaTrap}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* SECTION C: 3-MARK THEORY QUESTIONS                                 */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {(activeTab === "all" || activeTab === "partC") && (
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between pb-1 border-b border-border/80">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black text-foreground font-display flex items-center gap-2">
                <span>Part C: Theory Questions (3 Marks Each)</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 dark:text-indigo-300 font-mono font-bold">
                  {filteredPartC.length} Questions
                </span>
              </h2>
            </div>
            <span className="text-xs text-muted-foreground font-medium">Definition + Rules + Tables + Snippets</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPartC.map((th) => {
              const isMastered = !!masteredItems[th.id];
              return (
                <div
                  key={th.id}
                  className={`bg-card border rounded-3xl p-5 shadow-sm transition-all space-y-3.5 flex flex-col justify-between ${
                    isMastered ? "border-indigo-500/40 bg-indigo-500/[0.02]" : "border-border"
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2.5">
                        <button
                          onClick={() => toggleMastered(th.id)}
                          className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all cursor-pointer mt-0.5 shrink-0 ${
                            isMastered
                              ? "bg-indigo-500 border-indigo-500 text-white"
                              : "border-border text-transparent hover:border-primary/60"
                          }`}
                          title="Mark as Mastered"
                        >
                          <Check className="h-3.5 w-3.5 stroke-[3]" />
                        </button>
                        <div>
                          <span className="text-[10px] font-mono font-bold text-primary block">
                            Q{th.qNumber} · 3 Marks
                          </span>
                          <h3 className="font-bold text-sm sm:text-base text-foreground font-display">
                            {th.title}
                          </h3>
                        </div>
                      </div>

                      <button
                        onClick={() => speakQuestion(th.id, `${th.title}. Definition: ${th.definition}. Exam Tip: ${th.examTip}`)}
                        className={`p-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
                          currentlySpeakingId === th.id
                            ? "bg-amber-500 text-white animate-pulse"
                            : "text-muted-foreground hover:text-foreground hover:bg-secondary border border-border/80"
                        }`}
                        title="Listen to this answer"
                      >
                        <Volume2 className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    {/* Definition */}
                    <div className="p-3 rounded-xl bg-secondary/30 border border-border text-xs text-foreground/90 font-medium leading-relaxed">
                      <strong>Definition:</strong> {th.definition}
                    </div>

                    {/* Comparison Table if present */}
                    {th.comparisonTable && (
                      <div className="rounded-xl border border-border overflow-hidden text-xs">
                        <table className="w-full text-left">
                          <thead className="bg-secondary text-[10px] font-bold text-muted-foreground uppercase border-b border-border">
                            <tr>
                              {th.comparisonTable.headers.map((h, idx) => (
                                <th key={idx} className="p-2">
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border/60 text-[11px]">
                            {th.comparisonTable.rows.map((row, rIdx) => (
                              <tr key={rIdx} className="hover:bg-secondary/20">
                                {row.map((cell, cIdx) => (
                                  <td key={cIdx} className="p-2 text-foreground font-medium">
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {/* Uses or Rules List */}
                    {th.usesOrRules.length > 0 && (
                      <div className="space-y-2 text-xs">
                        {th.usesOrRules.map((use, uIdx) => (
                          <div key={uIdx} className="p-2.5 rounded-xl bg-secondary/20 border border-border/70 space-y-1">
                            <h4 className="font-bold text-xs text-foreground font-display">{use.title}</h4>
                            <p className="text-[11px] text-muted-foreground leading-relaxed">{use.explanation}</p>
                            {use.code && (
                              <pre className="p-2 rounded-lg bg-slate-950 text-slate-100 font-mono text-[10px] overflow-x-auto mt-1">
                                <code>{use.code}</code>
                              </pre>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Diagram if present */}
                    {th.diagram && (
                      <pre className="p-3 rounded-xl bg-slate-950 text-indigo-300 font-mono text-xs overflow-x-auto border border-slate-800">
                        {th.diagram}
                      </pre>
                    )}
                  </div>

                  {/* Exam Tip */}
                  <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-200 text-[11px]">
                    <strong>Tip:</strong> {th.examTip}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* SECTION D: EXAM STRATEGY, COMMON MISTAKES & MCQS                   */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {(activeTab === "all" || activeTab === "partD") && (
        <div className="space-y-6 pt-2">
          <div className="flex items-center justify-between pb-1 border-b border-border/80">
            <h2 className="text-lg font-black text-foreground font-display flex items-center gap-2">
              <span>Part D: Exam Strategy & MCQ Master Deck</span>
            </h2>
            <span className="text-xs text-muted-foreground font-medium">Full Marks Formula + Flashcards</span>
          </div>

          {/* Formats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {EXAM_WRITING_FORMATS.map((fmt, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-card border border-border shadow-xs space-y-1.5">
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#183F36] text-[#D6E85D] dark:bg-[#D6E85D] dark:text-[#183F36] uppercase">
                  {fmt.type}
                </span>
                <p className="text-xs text-foreground/90 font-medium leading-relaxed pt-1">
                  {fmt.format}
                </p>
              </div>
            ))}
          </div>

          {/* Common Mistakes that lose marks */}
          <div className="p-5 rounded-3xl bg-rose-500/10 border border-rose-500/20 text-rose-950 dark:text-rose-100 space-y-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-rose-600 dark:text-rose-400 shrink-0" />
              <h3 className="font-bold text-sm uppercase tracking-wider font-display">
                Top 6 Common Mistakes That Cost Students Marks in Java
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {COMMON_MISTAKES.map((mstk, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-background/50 border border-rose-500/20 flex items-start gap-2">
                  <span className="font-bold text-rose-600 font-mono">{idx + 1}.</span>
                  <span className="text-[11px] leading-relaxed text-foreground/90 font-medium">{mstk}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive MCQ Flashcards */}
          <div className="bg-card border border-border rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm sm:text-base text-foreground font-display">
                  Quick One-Line Answers for Q1 MCQs
                </h3>
                <p className="text-xs text-muted-foreground">Test yourself by clicking to reveal each answer</p>
              </div>
              <button
                onClick={() => {
                  const allOpen: Record<number, boolean> = {};
                  QUICK_MCQS.forEach((_, i) => (allOpen[i] = true));
                  setRevealedMcqs(allOpen);
                }}
                className="text-xs text-primary font-bold hover:underline cursor-pointer"
              >
                Reveal All
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {QUICK_MCQS.map((mcq, idx) => {
                const isOpen = !!revealedMcqs[idx];
                return (
                  <div
                    key={idx}
                    onClick={() => toggleMcq(idx)}
                    className="p-3.5 rounded-2xl border border-border bg-secondary/30 hover:bg-secondary/60 transition-all cursor-pointer space-y-2 flex flex-col justify-between"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-semibold text-xs text-foreground">
                        <strong className="text-primary font-mono mr-1">Q{idx + 1}.</strong>
                        {mcq.question}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-border/60 flex items-center justify-between text-xs">
                      {isOpen ? (
                        <div className="space-y-0.5">
                          <span className="px-2 py-0.5 rounded-md bg-[#183F36] text-[#D6E85D] font-mono font-black text-xs inline-block">
                            {mcq.answer}
                          </span>
                          {mcq.explanation && (
                            <span className="block text-[10px] text-muted-foreground italic">
                              {mcq.explanation}
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-[11px] text-muted-foreground italic">
                          Click to show answer ▾
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* MCQ Master Table */}
          <div className="bg-card border border-border rounded-3xl p-5 sm:p-6 shadow-sm space-y-3">
            <h3 className="font-bold text-sm text-foreground font-display">
              MCQ High-Yield Revision Table
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-secondary text-[10px] uppercase font-bold text-muted-foreground border-b border-border">
                  <tr>
                    <th className="p-2.5 w-1/4">Topic</th>
                    <th className="p-2.5">What to Remember in Exam</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {MCQ_REVISION_TABLE.map((row, idx) => (
                    <tr key={idx} className="hover:bg-secondary/20">
                      <td className="p-2.5 font-bold font-mono text-primary">{row.topic}</td>
                      <td className="p-2.5 text-foreground font-medium">{row.remember}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ── FOOTER BAR ── */}
      <div className="p-4 rounded-2xl bg-secondary/30 border border-border text-center text-xs text-muted-foreground flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <span>ITM Notes Portal · Department of Computer Science & Engineering</span>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-primary hover:underline font-semibold cursor-pointer"
        >
          Back to Top ↑
        </button>
      </div>
    </div>
  );
}
