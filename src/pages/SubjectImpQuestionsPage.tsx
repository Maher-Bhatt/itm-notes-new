import { useState, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SearchDialog } from "@/components/SearchDialog";
import { SUBJECT_IMP_DATA, ImpQuestion } from "@/data/impQuestionsData";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { 
  ChevronLeft, 
  HelpCircle, 
  CheckCircle, 
  Bookmark, 
  FileText, 
  Search, 
  Filter, 
  Award, 
  Sparkles, 
  Lightbulb, 
  AlertTriangle, 
  Code,
  Copy,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { toast } from "sonner";

export default function SubjectImpQuestionsPage() {
  const { subjectId } = useParams<{ subjectId: string }>();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUnit, setSelectedUnit] = useState<string>("All");
  const [selectedMarks, setSelectedMarks] = useState<string>("All");
  const [activeTab, setActiveTab] = useState<"questions" | "cheatsheet">("questions");
  const [expandedQuestions, setExpandedQuestions] = useState<Record<string, boolean>>({});

  const subjectData = subjectId ? SUBJECT_IMP_DATA[subjectId] : null;

  // Extract all unique units for filter
  const units = useMemo(() => {
    if (!subjectData) return ["All"];
    const set = new Set<string>();
    subjectData.questions.forEach((q) => set.add(q.unit));
    return ["All", ...Array.from(set)];
  }, [subjectData]);

  // Filtered questions
  const filteredQuestions = useMemo(() => {
    if (!subjectData) return [];
    return subjectData.questions.filter((q) => {
      const matchesSearch = 
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesUnit = selectedUnit === "All" || q.unit === selectedUnit;
      const matchesMarks = selectedMarks === "All" || q.marks === selectedMarks;
      return matchesSearch && matchesUnit && matchesMarks;
    });
  }, [subjectData, searchQuery, selectedUnit, selectedMarks]);

  const toggleExpand = (id: string) => {
    setExpandedQuestions((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const expandAll = () => {
    if (!subjectData) return;
    const allExpanded: Record<string, boolean> = {};
    subjectData.questions.forEach((q) => (allExpanded[q.id] = true));
    setExpandedQuestions(allExpanded);
  };

  const collapseAll = () => {
    setExpandedQuestions({});
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  if (!subjectData) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-20 text-center">
          <HelpCircle className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Subject Questions Not Found</h2>
          <p className="text-muted-foreground mb-6">
            We couldn't locate questions for subject ID: <code className="text-primary">{subjectId}</code>
          </p>
          <Link
            to="/imp-questions"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to All IMP Questions
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />

      {/* Top Header */}
      <Header onSearchOpen={() => setSearchOpen(true)} showBack backTo="/imp-questions" />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-8 animate-fade-in">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <Link to="/imp-questions" className="hover:text-foreground">IMP Questions</Link>
          <span>/</span>
          <span className="text-foreground font-medium">{subjectData.subjectName}</span>
        </div>

        {/* Banner Section */}
        <div className="bg-gradient-to-br from-primary/10 via-secondary/40 to-background border border-border/80 rounded-2xl p-6 sm:p-8 mb-8 shadow-sm">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30">
              {subjectData.code} · Semester {subjectData.semester}
            </span>
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${subjectData.badgeColor}`}>
              {subjectData.badge}
            </span>
            {subjectData.totalMarks && (
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center gap-1.5">
                <Award className="h-3.5 w-3.5" />
                {subjectData.totalMarks} Marks Bank
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-3 tracking-tight">
            {subjectData.subjectName}
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-3xl mb-6">
            {subjectData.summary}
          </p>

          {/* Tab Selector */}
          <div className="flex items-center gap-2 border-b border-border/60 pb-1">
            <button
              onClick={() => setActiveTab("questions")}
              className={`px-4 py-2 font-semibold text-sm rounded-lg transition-all flex items-center gap-2 ${
                activeTab === "questions"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <HelpCircle className="h-4 w-4" />
              Question Bank ({subjectData.questions.length})
            </button>
            <button
              onClick={() => setActiveTab("cheatsheet")}
              className={`px-4 py-2 font-semibold text-sm rounded-lg transition-all flex items-center gap-2 ${
                activeTab === "cheatsheet"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <Sparkles className="h-4 w-4" />
              Last-Night Cheat Sheet ({subjectData.cheatSheet.length})
            </button>
          </div>
        </div>

        {/* ── TAB 1: QUESTION BANK ── */}
        {activeTab === "questions" && (
          <div>
            {/* Filters Bar */}
            <div className="bg-card border border-border rounded-xl p-4 mb-6 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search questions or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-10 pl-9 pr-4 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Marks Filter */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
                <span className="text-xs font-semibold text-muted-foreground mr-1">Marks:</span>
                {["All", "3 Marks", "5 Marks", "7 Marks"].map((marks) => (
                  <button
                    key={marks}
                    onClick={() => setSelectedMarks(marks)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                      selectedMarks === marks
                        ? "bg-primary text-primary-foreground font-bold shadow-sm"
                        : "bg-secondary text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {marks}
                  </button>
                ))}
              </div>

              {/* Expand / Collapse All */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={expandAll}
                  className="px-3 py-1.5 text-xs font-medium rounded-md bg-secondary hover:bg-secondary/80 text-foreground"
                >
                  Expand All
                </button>
                <button
                  onClick={collapseAll}
                  className="px-3 py-1.5 text-xs font-medium rounded-md bg-secondary hover:bg-secondary/80 text-foreground"
                >
                  Collapse All
                </button>
              </div>
            </div>

            {/* Unit Filter Chips */}
            {units.length > 2 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
                <span className="text-xs font-semibold text-muted-foreground shrink-0">Unit:</span>
                {units.map((unit) => (
                  <button
                    key={unit}
                    onClick={() => setSelectedUnit(unit)}
                    className={`px-3 py-1 text-xs rounded-full whitespace-nowrap transition-all border ${
                      selectedUnit === unit
                        ? "bg-foreground text-background border-foreground font-semibold"
                        : "bg-card text-muted-foreground border-border hover:border-foreground/40 hover:text-foreground"
                    }`}
                  >
                    {unit}
                  </button>
                ))}
              </div>
            )}

            {/* Questions List */}
            <div className="space-y-4">
              {filteredQuestions.map((q, idx) => {
                const isExpanded = expandedQuestions[q.id] ?? true; // Default expanded for ease of reading
                return (
                  <div
                    key={q.id}
                    className="bg-card border border-border/80 rounded-xl overflow-hidden shadow-sm hover:border-primary/40 transition-colors"
                  >
                    {/* Question Header */}
                    <div
                      onClick={() => toggleExpand(q.id)}
                      className="p-4 sm:p-5 flex items-start gap-4 cursor-pointer select-none bg-secondary/10 hover:bg-secondary/30 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
                        {idx + 1}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                            q.marks === "3 Marks" 
                              ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                              : q.marks === "5 Marks"
                              ? "bg-purple-500/10 text-purple-600 dark:text-purple-400"
                              : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          }`}>
                            {q.marks}
                          </span>
                          <span className="text-[11px] text-muted-foreground font-medium">
                            {q.unit}
                          </span>
                        </div>
                        <h3 className="font-bold text-base sm:text-lg text-foreground leading-snug">
                          {q.question}
                        </h3>
                      </div>

                      <button className="text-muted-foreground p-1 hover:text-foreground">
                        {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                      </button>
                    </div>

                    {/* Answer Content */}
                    {isExpanded && (
                      <div className="p-5 sm:p-6 border-t border-border/60 space-y-5 animate-fade-in">
                        {/* Model Answer Body */}
                        <div className="rich-content prose-base max-w-none text-foreground/90">
                          <MarkdownRenderer content={q.answer} />
                        </div>

                        {/* Optional Code Block */}
                        {q.code && (
                          <div className="mt-4 rounded-xl overflow-hidden border border-border bg-slate-950 text-slate-100 p-4 font-mono text-sm">
                            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-xs text-slate-400">
                              <span>Code Implementation</span>
                              <button
                                onClick={() => copyToClipboard(q.code!, "Code")}
                                className="flex items-center gap-1 hover:text-slate-200"
                              >
                                <Copy className="h-3.5 w-3.5" /> Copy
                              </button>
                            </div>
                            <pre className="overflow-x-auto whitespace-pre">{q.code}</pre>
                          </div>
                        )}

                        {/* Callouts (Exam Tip, Dev Brain, Trap) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                          {q.examTip && (
                            <div className="p-3.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-xs leading-relaxed">
                              <span className="font-bold block mb-1 flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
                                <Award className="h-3.5 w-3.5" /> EXAM TIP:
                              </span>
                              {q.examTip}
                            </div>
                          )}

                          {q.devBrain && (
                            <div className="p-3.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-800 dark:text-blue-300 text-xs leading-relaxed">
                              <span className="font-bold block mb-1 flex items-center gap-1.5 text-blue-700 dark:text-blue-400">
                                <Lightbulb className="h-3.5 w-3.5" /> DEV BRAIN:
                              </span>
                              {q.devBrain}
                            </div>
                          )}

                          {q.trap && (
                            <div className="p-3.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-800 dark:text-rose-300 text-xs leading-relaxed md:col-span-2">
                              <span className="font-bold block mb-1 flex items-center gap-1.5 text-rose-700 dark:text-rose-400">
                                <AlertTriangle className="h-3.5 w-3.5" /> EXAM TRAP:
                              </span>
                              {q.trap}
                            </div>
                          )}
                        </div>

                        {/* Actions Toolbar */}
                        <div className="flex items-center justify-end gap-2 pt-2 border-t border-border/40 text-xs">
                          <button
                            onClick={() => copyToClipboard(`${q.question}\n\n${q.answer}`, "Full Question & Answer")}
                            className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground p-1.5 rounded transition-colors"
                          >
                            <Copy className="h-3.5 w-3.5" /> Copy Answer
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {filteredQuestions.length === 0 && (
                <div className="text-center py-16 bg-card border border-border rounded-xl">
                  <HelpCircle className="h-10 w-10 mx-auto text-muted-foreground/40 mb-3" />
                  <p className="text-base font-semibold text-foreground mb-1">No matching questions found</p>
                  <p className="text-sm text-muted-foreground mb-4">Try clearing your search query or filters.</p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedUnit("All");
                      setSelectedMarks("All");
                    }}
                    className="px-4 py-2 bg-secondary text-foreground text-xs font-semibold rounded-lg hover:bg-secondary/80"
                  >
                    Reset All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── TAB 2: LAST-NIGHT CHEAT SHEET ── */}
        {activeTab === "cheatsheet" && (
          <div className="space-y-6">
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-5 text-amber-900 dark:text-amber-200">
              <h3 className="font-bold text-base flex items-center gap-2 mb-1">
                <Sparkles className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                Last-Night Survival Revision
              </h3>
              <p className="text-xs sm:text-sm text-amber-800/80 dark:text-amber-300/80">
                These formula sheets, opcode tables, and step-by-step algorithms are condensed for memorization on the night before your university examination.
              </p>
            </div>

            {subjectData.cheatSheet.map((section, sIdx) => (
              <div key={sIdx} className="bg-card border border-border rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-bold text-foreground mb-4 pb-2 border-b border-border flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                    {sIdx + 1}
                  </span>
                  {section.title}
                </h2>
                <div className="rich-content prose-base max-w-none text-foreground/90">
                  <MarkdownRenderer content={section.content} />
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
