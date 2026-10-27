import { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
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
  Mic,
  Cpu,
  Database,
  Terminal,
  Calculator,
} from "lucide-react";
import { toast } from "sonner";
import { getMasterSubjectBank, MasterSubjectBank } from "@/data/masterBanksRegistry";
import { SUBJECT_IMP_DATA } from "@/data/impQuestionsData";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { AudioNotesPlayer } from "@/components/AudioNotesPlayer";
import { openTimetable } from "@/components/GlobalTimetableModal";
import { aiVoice } from "@/utils/aiVoiceEngine";

export default function SubjectImpQuestionsPage() {
  const { subjectId } = useParams<{ subjectId: string }>();
  const navigate = useNavigate();

  // Master bank lookup
  const masterBank = useMemo(() => getMasterSubjectBank(subjectId), [subjectId]);
  const legacyData = subjectId ? SUBJECT_IMP_DATA[subjectId] : null;

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<"all" | "partA" | "partB" | "partC" | "partD">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [revealedOutputs, setRevealedOutputs] = useState<Record<string, boolean>>({});
  const [revealedMcqs, setRevealedMcqs] = useState<Record<number, boolean>>({});
  const [currentlySpeakingId, setCurrentlySpeakingId] = useState<string | null>(null);

  // Local storage mastery tracking
  const storageKey = `itm_mastered_${masterBank?.id || subjectId}`;
  const [masteredItems, setMasteredItems] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(masteredItems));
    } catch (e) {
      console.warn("Failed to persist mastery:", e);
    }
  }, [masteredItems, storageKey]);

  // Synchronize hash with activeTab (#part-a, #part-b, #part-c, #part-d)
  useEffect(() => {
    const syncHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === "#part-a" || hash === "#parta") setActiveTab("partA");
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

  // AI Voice playback for individual questions
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

  // Filtered queries for Master Bank
  const filteredPartA = useMemo(() => {
    if (!masterBank) return [];
    if (!searchQuery.trim()) return masterBank.predictOutput;
    const q = searchQuery.toLowerCase();
    return masterBank.predictOutput.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.concept.toLowerCase().includes(q) ||
        item.rule.toLowerCase().includes(q) ||
        item.code.toLowerCase().includes(q)
    );
  }, [masterBank, searchQuery]);

  const filteredPartB = useMemo(() => {
    if (!masterBank) return [];
    if (!searchQuery.trim()) return masterBank.longAnswers;
    const q = searchQuery.toLowerCase();
    return masterBank.longAnswers.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.concept.toLowerCase().includes(q) ||
        item.code.toLowerCase().includes(q) ||
        item.examNote.toLowerCase().includes(q)
    );
  }, [masterBank, searchQuery]);

  const filteredPartC = useMemo(() => {
    if (!masterBank) return [];
    if (!searchQuery.trim()) return masterBank.theoryQuestions;
    const q = searchQuery.toLowerCase();
    return masterBank.theoryQuestions.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.definition.toLowerCase().includes(q) ||
        item.examTip.toLowerCase().includes(q)
    );
  }, [masterBank, searchQuery]);

  // Fallback: If neither master bank nor legacy data exists
  if (!masterBank && !legacyData) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto w-full py-20 text-center text-foreground animate-fade-in">
        <HelpCircle className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Subject Question Bank Not Found</h2>
        <p className="text-muted-foreground mb-6">
          We couldn't locate questions for subject ID: <code className="text-primary font-mono">{subjectId}</code>
        </p>
        <Link
          to="/imp-questions"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl font-bold text-xs hover:opacity-90 transition-all shadow-md"
        >
          <ChevronRight className="h-4 w-4 rotate-180" />
          <span>Back to All Question Banks</span>
        </Link>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // RENDER MASTER SOLVED QUESTION BANK (If available)
  // ─────────────────────────────────────────────────────────────────────────────
  if (masterBank) {
    const totalQuestions = masterBank.predictOutput.length + masterBank.longAnswers.length + masterBank.theoryQuestions.length;
    const masteredCount = Object.values(masteredItems).filter(Boolean).length;
    const progressPercent = Math.min(100, Math.round((masteredCount / totalQuestions) * 100));

    // Subject Icon selector
    const SubjectIcon =
      masterBank.id === "dsa" ? Database :
      masterBank.id === "ca" ? Cpu :
      masterBank.id === "dbms" ? Layers :
      masterBank.id === "conmp" ? Calculator : Terminal;

    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-[1550px] mx-auto space-y-8 animate-fade-in print:p-0">
        {/* ── TOP HEADER / BREADCRUMB ── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-border/60">
          <div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium mb-1">
              <Link to="/imp-questions" className="hover:text-primary transition-colors">
                Question Banks
              </Link>
              <span>·</span>
              <span>Semester {masterBank.semester}</span>
              <span>·</span>
              <span className="font-mono font-bold text-foreground">{masterBank.code}</span>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 dark:text-amber-500 font-bold text-[10px] border border-amber-500/20">
                Master Solved Bank
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground font-display flex items-center gap-2.5">
              <SubjectIcon className={`h-7 w-7 ${masterBank.theme.iconColor}`} />
              <span>{masterBank.name}</span>
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              {masterBank.code} · Complete University Solved Answers, Program Dry Runs & Viva Traps
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={() => openTimetable("remedial")}
              className="h-9 px-3 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground font-bold text-xs flex items-center gap-1.5 transition-all border border-border cursor-pointer shadow-xs"
              title="View Remedial Schedule"
            >
              <Calendar className="h-3.5 w-3.5 text-amber-500" />
              <span>Timetable</span>
            </button>

            <button
              onClick={handlePrint}
              className="h-9 px-3 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground font-bold text-xs flex items-center gap-1.5 transition-all border border-border cursor-pointer shadow-xs"
              title="Print to PDF"
            >
              <Printer className="h-3.5 w-3.5 text-amber-500" />
              <span>Print / PDF</span>
            </button>
          </div>
        </div>

        {/* ── HERO BANNER WITH MASTERY & AUDIO PLAYER ── */}
        <div className={`p-5 sm:p-6 rounded-3xl bg-gradient-to-r ${masterBank.theme.primaryBg} text-white shadow-xl border ${masterBank.theme.borderGlow} relative overflow-hidden print-hidden`}>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/20 text-white backdrop-blur-md flex items-center gap-1.5">
                  <Flame className="h-3 w-3 fill-amber-400 text-amber-400" />
                  {masterBank.badge}
                </span>
                <span className="text-xs font-mono font-bold text-white/90">
                  {totalQuestions} Fully Solved Master Answers
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-white font-display">
                {masterBank.shortName} Master Exam Blueprint & Solved Question Bank
              </h2>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                {masterBank.summary}
              </p>

              {/* Mastery Progress Bar */}
              <div className="pt-2 max-w-md space-y-1.5">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-white/90 flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5 text-amber-500" />
                    Mastery: {masteredCount} of {totalQuestions} Solved
                  </span>
                  <span className="font-bold text-amber-500">{progressPercent}%</span>
                </div>
                <div className="w-full bg-black/40 h-2 rounded-full overflow-hidden border border-white/10">
                  <div
                    className="bg-amber-500 h-full transition-all duration-500 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-3 shrink-0">
              <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center">
                <span className="text-2xl font-black font-mono text-white">
                  {masterBank.predictOutput.length}
                </span>
                <p className="text-[10px] text-white/70 uppercase font-bold tracking-wider">Predict Output</p>
              </div>
              <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center">
                <span className="text-2xl font-black font-mono text-amber-500">
                  {masterBank.longAnswers.length}
                </span>
                <p className="text-[10px] text-white/70 uppercase font-bold tracking-wider">5-Mark Programs</p>
              </div>
              <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center">
                <span className="text-2xl font-black font-mono text-amber-300">
                  {masterBank.theoryQuestions.length}
                </span>
                <p className="text-[10px] text-white/70 uppercase font-bold tracking-wider">3-Mark Theory</p>
              </div>
              <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center">
                <span className="text-2xl font-black font-mono text-purple-300">
                  {masterBank.quickMcqs.length}
                </span>
                <p className="text-[10px] text-white/70 uppercase font-bold tracking-wider">Quick MCQs</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── UNIFIED AI AUDIO LECTURE BAR ── */}
        <AudioNotesPlayer
          title={`${masterBank.shortName} Master Exam Audio Lecture`}
          textToRead={`${masterBank.audioLectureSummary} Here is the detailed breakdown of the master question bank: ${masterBank.summary}`}
        />

        {/* ── STICKY NAVIGATION TABS & SEARCH BAR ── */}
        <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-md py-3 border-y border-border flex flex-col md:flex-row items-center justify-between gap-4 print-hidden">
          {/* Navigation Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full md:w-auto font-display">
            {[
              { id: "all", label: `All (${totalQuestions})` },
              { id: "partA", label: `Part A: Predict Output (${masterBank.predictOutput.length})` },
              { id: "partB", label: `Part B: 5-Mark Programs (${masterBank.longAnswers.length})` },
              { id: "partC", label: `Part C: 3-Mark Theory (${masterBank.theoryQuestions.length})` },
              { id: "partD", label: "Part D: Strategy & MCQs" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground shadow-sm font-black"
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
              placeholder={`Search ${masterBank.shortName} keywords...`}
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
        {/* SECTION A: PREDICT THE OUTPUT                                      */}
        {/* ─────────────────────────────────────────────────────────────────── */}
        {(activeTab === "all" || activeTab === "partA") && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-1 border-b border-border/80">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-foreground font-display flex items-center gap-2">
                  <span>Part A: Predict the Output & Execution Traces</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 dark:text-amber-500 font-mono font-bold">
                    {filteredPartA.length} Problems
                  </span>
                </h2>
              </div>
              <span className="text-xs text-muted-foreground font-medium">Step-by-Step Execution Traces</span>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {filteredPartA.map((prog) => {
                const isMastered = !!masteredItems[prog.id];
                const isRevealed = !!revealedOutputs[prog.id];
                const isSpeaking = currentlySpeakingId === prog.id;

                return (
                  <div
                    key={prog.id}
                    className={`p-5 sm:p-6 rounded-2xl bg-card border transition-all ${
                      isMastered ? "border-amber-500/50 bg-amber-500/[0.02]" : "border-border hover:border-primary/50"
                    }`}
                  >
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border/60">
                      <div className="flex items-center gap-2.5">
                        <span className="w-7 h-7 rounded-lg bg-primary/10 text-primary font-mono font-bold text-xs flex items-center justify-center">
                          A{prog.programNumber}
                        </span>
                        <div>
                          <h3 className="text-sm sm:text-base font-bold text-foreground">
                            {prog.title}
                          </h3>
                          <span className="text-[11px] text-muted-foreground font-medium">
                            Concept: <strong className="text-foreground">{prog.concept}</strong>
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {/* Audio Narrator Button */}
                        <button
                          onClick={() => speakQuestion(prog.id, `${prog.title}. Concept: ${prog.concept}. Rule: ${prog.rule}. Output: ${prog.output}`)}
                          className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                            isSpeaking
                              ? "bg-amber-500 text-white animate-pulse"
                              : "bg-secondary text-muted-foreground hover:text-foreground"
                          }`}
                          title="Listen to this problem"
                        >
                          <Volume2 className="h-3.5 w-3.5" />
                          <span className="hidden sm:inline">{isSpeaking ? "Speaking..." : "Listen"}</span>
                        </button>

                        {/* Mastery Checkbox */}
                        <button
                          onClick={() => toggleMastered(prog.id)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                            isMastered
                              ? "bg-amber-500 text-white"
                              : "bg-secondary text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          <Check className="h-3.5 w-3.5" />
                          <span>{isMastered ? "Mastered" : "Mark Mastered"}</span>
                        </button>
                      </div>
                    </div>

                    {/* Code Display with Copy */}
                    <div className="mt-4 relative rounded-xl overflow-hidden border border-border bg-[#051410] text-[#E8EDE4]">
                      <div className="flex items-center justify-between px-3.5 py-1.5 bg-[#09221C] text-[11px] font-mono text-muted-foreground border-b border-white/5">
                        <span className="flex items-center gap-1.5">
                          <Code2 className="h-3.5 w-3.5 text-primary" />
                          Program Code (C / Python / SQL)
                        </span>
                        <button
                          onClick={() => copyCode(prog.code, prog.title)}
                          className="hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <Copy className="h-3 w-3" />
                          <span>Copy</span>
                        </button>
                      </div>
                      <pre className="p-4 text-xs font-mono leading-relaxed overflow-x-auto whitespace-pre">
                        {prog.code}
                      </pre>
                    </div>

                    {/* Output & Execution Trace */}
                    <div className="mt-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => toggleOutput(prog.id)}
                          className="h-8 px-3 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          {isRevealed ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                          <span>{isRevealed ? "Hide Output & Trace" : "Reveal Output & Trace"}</span>
                        </button>
                      </div>

                      {isRevealed && (
                        <div className="space-y-3 animate-fade-in">
                          {/* Output Box */}
                          <div className="p-3.5 rounded-xl bg-secondary/60 border border-border">
                            <span className="text-[10px] font-mono uppercase font-black tracking-wider text-muted-foreground block mb-1">
                              Exact Console Output
                            </span>
                            <pre className="text-xs font-mono font-bold text-foreground whitespace-pre-wrap">
                              {prog.output}
                            </pre>
                          </div>

                          {/* Step-by-Step Trace */}
                          <div className="space-y-1.5 pt-1">
                            <span className="text-xs font-bold text-foreground">Line-by-Line Execution Trace:</span>
                            <div className="space-y-1">
                              {prog.steps.map((st) => (
                                <div key={st.step} className="flex items-start gap-2 text-xs text-muted-foreground">
                                  <span className="px-1.5 py-0.2 rounded bg-primary/10 text-primary font-mono font-bold text-[10px] shrink-0">
                                    Step {st.step}
                                  </span>
                                  <span>{st.action}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Golden Rule */}
                          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-300 text-xs flex items-start gap-2">
                            <Sparkles className="h-4 w-4 shrink-0 mt-0.5" />
                            <div>
                              <strong className="font-bold">Golden Rule: </strong>
                              <span>{prog.rule}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────────── */}
        {/* SECTION B: 5-MARK PROGRAMMING QUESTIONS                            */}
        {/* ─────────────────────────────────────────────────────────────────── */}
        {(activeTab === "all" || activeTab === "partB") && (
          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between pb-1 border-b border-border/80">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-foreground font-display flex items-center gap-2">
                  <span>Part B: 5-Mark Programming Implementations</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 dark:text-amber-500 font-mono font-bold">
                    {filteredPartB.length} Questions
                  </span>
                </h2>
              </div>
              <span className="text-xs text-muted-foreground font-medium">Concept (1m) + Code (2.5m) + Output (1m) + Explanation (0.5m)</span>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {filteredPartB.map((item) => {
                const isMastered = !!masteredItems[item.id];
                const isRevealed = !!revealedOutputs[item.id];
                const isSpeaking = currentlySpeakingId === item.id;

                return (
                  <div
                    key={item.id}
                    className={`p-5 sm:p-6 rounded-2xl bg-card border transition-all ${
                      isMastered ? "border-amber-500/50 bg-amber-500/[0.02]" : "border-border hover:border-primary/50"
                    }`}
                  >
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border/60">
                      <div className="flex items-center gap-2.5">
                        <span className="px-2 py-1 rounded-lg bg-amber-500/10 text-amber-500 dark:text-amber-500 font-mono font-bold text-xs">
                          {item.qNumber} · 5 Marks
                        </span>
                        <h3 className="text-sm sm:text-base font-bold text-foreground">
                          {item.title}
                        </h3>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {/* Audio Narrator */}
                        <button
                          onClick={() => speakQuestion(item.id, `${item.title}. Concept: ${item.concept}. Exam Tip: ${item.examNote}. Examiner Viva Trap: ${item.vivaTrap || ''}`)}
                          className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                            isSpeaking
                              ? "bg-amber-500 text-white animate-pulse"
                              : "bg-secondary text-muted-foreground hover:text-foreground"
                          }`}
                          title="Listen to this question"
                        >
                          <Volume2 className="h-3.5 w-3.5" />
                          <span className="hidden sm:inline">{isSpeaking ? "Speaking..." : "Listen"}</span>
                        </button>

                        <button
                          onClick={() => toggleMastered(item.id)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                            isMastered
                              ? "bg-amber-500 text-white"
                              : "bg-secondary text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          <Check className="h-3.5 w-3.5" />
                          <span>{isMastered ? "Mastered" : "Mark Mastered"}</span>
                        </button>
                      </div>
                    </div>

                    {/* Requirements checklist if present */}
                    {item.requirements && item.requirements.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 pt-3">
                        {item.requirements.map((req, rIdx) => (
                          <span key={rIdx} className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-secondary text-muted-foreground flex items-center gap-1">
                            <CheckCircle2 className="h-2.5 w-2.5 text-primary" />
                            {req}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Concept Box (1 Mark) */}
                    <div className="mt-3 p-3.5 rounded-xl bg-secondary/40 border border-border text-xs leading-relaxed text-foreground">
                      <strong className="text-primary font-bold">1. Concept & Theory (1 Mark): </strong>
                      <span>{item.concept}</span>
                    </div>

                    {/* Executable Code (2.5 Marks) */}
                    <div className="mt-4 rounded-xl overflow-hidden border border-border bg-[#051410] text-[#E8EDE4]">
                      <div className="flex items-center justify-between px-3.5 py-1.5 bg-[#09221C] text-[11px] font-mono text-muted-foreground border-b border-white/5">
                        <span className="flex items-center gap-1.5">
                          <Code2 className="h-3.5 w-3.5 text-primary" />
                          2. Complete Executable Code / Query (2.5 Marks)
                        </span>
                        <button
                          onClick={() => copyCode(item.code, item.title)}
                          className="hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <Copy className="h-3 w-3" />
                          <span>Copy</span>
                        </button>
                      </div>
                      <pre className="p-4 text-xs font-mono leading-relaxed overflow-x-auto whitespace-pre">
                        {item.code}
                      </pre>
                    </div>

                    {/* Output & Explanation Toggle */}
                    <div className="mt-4 space-y-3">
                      <button
                        onClick={() => toggleOutput(item.id)}
                        className="h-8 px-3 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        {isRevealed ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                        <span>{isRevealed ? "Hide Output & Explanation" : "Reveal Output & Explanation"}</span>
                      </button>

                      {isRevealed && (
                        <div className="space-y-3 animate-fade-in">
                          {/* Exact Output (1 Mark) */}
                          <div className="p-3.5 rounded-xl bg-secondary/60 border border-border">
                            <span className="text-[10px] font-mono uppercase font-black tracking-wider text-muted-foreground block mb-1">
                              3. Exact Execution Output (1 Mark)
                            </span>
                            <pre className="text-xs font-mono font-bold text-foreground whitespace-pre-wrap">
                              {item.output}
                            </pre>
                          </div>

                          {/* Step Explanation (0.5 Mark) */}
                          <div className="space-y-1.5 pt-1">
                            <span className="text-xs font-bold text-foreground">4. Step-by-Step Explanation (0.5 Mark):</span>
                            <ul className="space-y-1 list-disc list-inside text-xs text-muted-foreground">
                              {item.explanationPoints.map((pt, pIdx) => (
                                <li key={pIdx}>{pt}</li>
                              ))}
                            </ul>
                          </div>

                          {/* Trace Table if present */}
                          {item.traceTable && (
                            <div className="overflow-x-auto pt-2">
                              <table className="w-full text-xs text-left border border-border rounded-lg overflow-hidden">
                                <thead className="bg-secondary/80 font-bold font-mono">
                                  <tr>
                                    {item.traceTable.headers.map((h, hIdx) => (
                                      <th key={hIdx} className="p-2 border-b border-border">{h}</th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody>
                                  {item.traceTable.rows.map((row, rIdx) => (
                                    <tr key={rIdx} className="border-b border-border/50 hover:bg-secondary/20">
                                      {row.map((cell, cIdx) => (
                                        <td key={cIdx} className="p-2 font-mono">{cell}</td>
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}

                          {/* Yellow Exam Note */}
                          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-300 text-xs">
                            <strong className="font-bold">Exam Note: </strong>
                            <span>{item.examNote}</span>
                          </div>

                          {/* Red/Orange Examiner Viva Trap */}
                          {item.vivaTrap && (
                            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-700 dark:text-red-300 text-xs flex items-start gap-2">
                              <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                              <div>
                                <strong className="font-bold">Examiner Viva Trap: </strong>
                                <span>{item.vivaTrap}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────────── */}
        {/* SECTION C: 3-MARK THEORY QUESTIONS                                */}
        {/* ─────────────────────────────────────────────────────────────────── */}
        {(activeTab === "all" || activeTab === "partC") && (
          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between pb-1 border-b border-border/80">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-foreground font-display flex items-center gap-2">
                  <span>Part C: 3-Mark Comparative Theory</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 font-mono font-bold">
                    {filteredPartC.length} Questions
                  </span>
                </h2>
              </div>
              <span className="text-xs text-muted-foreground font-medium">Comparison Matrices (3+ Rows) & Diagrams</span>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {filteredPartC.map((th) => {
                const isMastered = !!masteredItems[th.id];
                const isSpeaking = currentlySpeakingId === th.id;

                return (
                  <div
                    key={th.id}
                    className={`p-5 sm:p-6 rounded-2xl bg-card border transition-all ${
                      isMastered ? "border-amber-500/50 bg-amber-500/[0.02]" : "border-border hover:border-primary/50"
                    }`}
                  >
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border/60">
                      <div className="flex items-center gap-2.5">
                        <span className="px-2 py-1 rounded-lg bg-orange-500/10 text-orange-600 dark:text-orange-400 font-mono font-bold text-xs">
                          Q{th.qNumber} · 3 Marks
                        </span>
                        <h3 className="text-sm sm:text-base font-bold text-foreground">
                          {th.title}
                        </h3>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {/* Audio Narrator */}
                        <button
                          onClick={() => speakQuestion(th.id, `${th.title}. Definition: ${th.definition}. Exam Tip: ${th.examTip}`)}
                          className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                            isSpeaking
                              ? "bg-amber-500 text-white animate-pulse"
                              : "bg-secondary text-muted-foreground hover:text-foreground"
                          }`}
                          title="Listen to this answer"
                        >
                          <Volume2 className="h-3.5 w-3.5" />
                          <span className="hidden sm:inline">{isSpeaking ? "Speaking..." : "Listen"}</span>
                        </button>

                        <button
                          onClick={() => toggleMastered(th.id)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                            isMastered
                              ? "bg-amber-500 text-white"
                              : "bg-secondary text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          <Check className="h-3.5 w-3.5" />
                          <span>{isMastered ? "Mastered" : "Mark Mastered"}</span>
                        </button>
                      </div>
                    </div>

                    {/* Definition */}
                    <p className="mt-3 text-xs leading-relaxed text-foreground">
                      <strong>Definition: </strong>{th.definition}
                    </p>

                    {/* Comparison Table */}
                    {th.comparisonTable && (
                      <div className="mt-4 overflow-x-auto">
                        <table className="w-full text-xs text-left border border-border rounded-xl overflow-hidden">
                          <thead className="bg-secondary font-bold font-mono text-foreground">
                            <tr>
                              {th.comparisonTable.headers.map((h, hIdx) => (
                                <th key={hIdx} className="p-2.5 border-b border-border">{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {th.comparisonTable.rows.map((row, rIdx) => (
                              <tr key={rIdx} className="border-b border-border/60 hover:bg-secondary/30">
                                {row.map((cell, cIdx) => (
                                  <td key={cIdx} className="p-2.5 leading-relaxed">{cell}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {/* Diagram */}
                    {th.diagram && (
                      <div className="mt-3 p-3 rounded-xl bg-[#051410] text-[#E8EDE4] font-mono text-[11px] leading-relaxed overflow-x-auto whitespace-pre">
                        {th.diagram}
                      </div>
                    )}

                    {/* Exam Tip */}
                    <div className="mt-3 p-2.5 rounded-xl bg-primary/10 border border-primary/20 text-xs text-foreground flex items-center gap-2">
                      <Sparkles className="h-3.5 w-3.5 text-primary shrink-0" />
                      <div>
                        <strong className="text-primary font-bold">Exam Formula: </strong>
                        <span>{th.examTip}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────────── */}
        {/* SECTION D: STRATEGY, MISTAKES, REVISION & MCQS                     */}
        {/* ─────────────────────────────────────────────────────────────────── */}
        {(activeTab === "all" || activeTab === "partD") && (
          <div className="space-y-6 pt-4">
            {/* Strategy Blueprint */}
            <div className="space-y-3">
              <h2 className="text-lg font-black text-foreground font-display flex items-center gap-2">
                <Award className="h-5 w-5 text-amber-500" />
                <span>University Exam Strategy & Marks Allocation Blueprint</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {masterBank.examStrategy.map((strat, sIdx) => (
                  <div key={sIdx} className="p-4 rounded-2xl bg-card border border-border space-y-2">
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-mono font-bold text-[10px]">
                      {strat.marks} · {strat.timeAllocation}
                    </span>
                    <h3 className="font-bold text-sm text-foreground">{strat.part}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{strat.strategy}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 6 Fatal Mistakes */}
            <div className="space-y-3">
              <h2 className="text-lg font-black text-foreground font-display flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <span>6 Fatal Student Mistakes to Avoid</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {masterBank.fatalMistakes.map((mis, mIdx) => (
                  <div key={mIdx} className="p-4 rounded-2xl bg-red-500/[0.04] border border-red-500/20 space-y-1.5 text-xs">
                    <div className="font-bold text-red-600 dark:text-red-400 flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-red-500/20 text-red-600 dark:text-red-400 flex items-center justify-center text-[10px] font-mono">
                        {mIdx + 1}
                      </span>
                      <span>{mis.mistake}</span>
                    </div>
                    <p className="text-muted-foreground pl-6.5">
                      <strong>Consequence: </strong>{mis.consequence}
                    </p>
                    <p className="text-amber-500 dark:text-amber-500 pl-6.5 font-medium">
                      <strong>Remedy: </strong>{mis.remedy}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 16-Row Quick Revision Matrix */}
            <div className="space-y-3">
              <h2 className="text-lg font-black text-foreground font-display flex items-center gap-2">
                <Layers className="h-5 w-5 text-primary" />
                <span>16-Row Quick Revision Matrix (Last-Night Formula Sheet)</span>
              </h2>

              <div className="overflow-x-auto rounded-2xl border border-border">
                <table className="w-full text-xs text-left">
                  <thead className="bg-secondary font-bold font-mono text-foreground border-b border-border">
                    <tr>
                      <th className="p-3 w-1/3">Topic / Concept</th>
                      <th className="p-3">Core Invariant to Remember</th>
                    </tr>
                  </thead>
                  <tbody>
                    {masterBank.revisionTable.map((rev, rIdx) => (
                      <tr key={rIdx} className="border-b border-border/50 hover:bg-secondary/30">
                        <td className="p-3 font-bold text-foreground">{rev.topic}</td>
                        <td className="p-3 font-mono text-primary leading-relaxed">{rev.remember}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick MCQs */}
            <div className="space-y-3">
              <h2 className="text-lg font-black text-foreground font-display flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-amber-500" />
                <span>10 Quick-Hit Exam MCQs (Question 1 Preparation)</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {masterBank.quickMcqs.map((mcq, qIdx) => {
                  const isRevealed = !!revealedMcqs[qIdx];
                  return (
                    <div key={qIdx} className="p-4 rounded-2xl bg-card border border-border space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-xs font-bold text-foreground">
                          Q{qIdx + 1}. {mcq.question}
                        </p>
                        <button
                          onClick={() => toggleMcq(qIdx)}
                          className="text-[11px] font-bold text-primary hover:underline shrink-0"
                        >
                          {isRevealed ? "Hide" : "Show Answer"}
                        </button>
                      </div>

                      {isRevealed && (
                        <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs animate-fade-in space-y-1">
                          <p className="font-bold text-amber-500 dark:text-amber-500">
                            Answer: {mcq.answer}
                          </p>
                          {mcq.explanation && (
                            <p className="text-[11px] text-muted-foreground">{mcq.explanation}</p>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // FALLBACK: RENDER LEGACY SUBJECT DATA (If not yet in Master Banks)
  // ─────────────────────────────────────────────────────────────────────────────
  const units = legacyData ? ["All", ...Array.from(new Set(legacyData.questions.map((q) => q.unit)))] : ["All"];
  const filteredLegacy = legacyData ? legacyData.questions.filter((q) => {
    const matchSearch = q.question.toLowerCase().includes(searchQuery.toLowerCase()) || q.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchSearch;
  }) : [];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto w-full text-foreground animate-fade-in">
      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <span>/</span>
        <Link to="/imp-questions" className="hover:text-foreground">IMP Questions</Link>
        <span>/</span>
        <span className="text-foreground font-medium">{legacyData?.subjectName}</span>
      </div>

      <div className="bg-gradient-to-br from-primary/10 via-secondary/40 to-background border border-border/80 rounded-2xl p-6 sm:p-8 mb-8 shadow-sm">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-2">
          {legacyData?.subjectName}
        </h1>
        <p className="text-muted-foreground text-sm max-w-2xl">{legacyData?.summary}</p>
      </div>

      <div className="space-y-4">
        {filteredLegacy.map((q) => (
          <div key={q.id} className="p-5 rounded-2xl bg-card border border-border space-y-3">
            <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold">{q.marks}</span>
            <h3 className="font-bold text-sm text-foreground">{q.question}</h3>
            <div className="text-xs text-muted-foreground leading-relaxed">
              <MarkdownRenderer content={q.answer} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
