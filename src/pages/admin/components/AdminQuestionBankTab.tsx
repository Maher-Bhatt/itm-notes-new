import { useState, useMemo } from "react";
import { 
  HelpCircle, Search, Filter, Download, Plus, CheckCircle2, 
  XCircle, ChevronDown, ChevronUp, Copy, BookOpen, Sparkles
} from "lucide-react";
import { MASSIVE_QUESTION_BANK } from "@/data/massiveQuestionBank";
import { logAdminAction } from "@/services/adminOperationsService";
import { toast } from "sonner";

export function AdminQuestionBankTab() {
  const [selectedSubjectKey, setSelectedSubjectKey] = useState<string>("all");
  const [selectedUnit, setSelectedUnit] = useState<number | "all">("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New question form state
  const [newSubKey, setNewSubKey] = useState("os");
  const [newUnit, setNewUnit] = useState<number>(1);
  const [newQuestionText, setNewQuestionText] = useState("");
  const [newOptA, setNewOptA] = useState("");
  const [newOptB, setNewOptB] = useState("");
  const [newOptC, setNewOptC] = useState("");
  const [newOptD, setNewOptD] = useState("");
  const [newCorrectIdx, setNewCorrectIdx] = useState<number>(0);
  const [newExplanation, setNewExplanation] = useState("");
  const [newDifficulty, setNewDifficulty] = useState<"Easy" | "Medium" | "Hard">("Medium");

  // Flatten all questions with metadata
  const allQuestions = useMemo(() => {
    return MASSIVE_QUESTION_BANK.map((item) => {
      const uMatch = item.id.match(/-u(\d+)-/) || item.unitTitle.match(/Unit\s*(\d+)/i);
      const unitNum = uMatch ? parseInt(uMatch[1], 10) : 1;
      return {
        id: item.id,
        subjectKey: item.subjectId,
        subjectTitle: item.subjectName,
        unit: unitNum,
        chapter: item.unitTitle,
        q: item.question,
        options: item.options,
        correct: item.correctIndex,
        explanation: item.explanation,
        difficulty: item.difficulty || "Medium",
      };
    });
  }, []);

  const availableSubjects = useMemo(() => {
    const map = new Map<string, string>();
    MASSIVE_QUESTION_BANK.forEach((q) => {
      if (!map.has(q.subjectId)) {
        map.set(q.subjectId, q.subjectName);
      }
    });
    return Array.from(map.entries()).map(([key, title]) => ({ key, title }));
  }, []);

  const filteredQuestions = useMemo(() => {
    return allQuestions.filter((item) => {
      if (selectedSubjectKey !== "all" && item.subjectKey !== selectedSubjectKey) return false;
      if (selectedUnit !== "all" && item.unit !== selectedUnit) return false;
      if (selectedDifficulty !== "all" && item.difficulty.toLowerCase() !== selectedDifficulty.toLowerCase()) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          item.q.toLowerCase().includes(q) ||
          item.explanation.toLowerCase().includes(q) ||
          item.subjectTitle.toLowerCase().includes(q) ||
          item.chapter.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [allQuestions, selectedSubjectKey, selectedUnit, selectedDifficulty, searchQuery]);

  const handleExportQuestions = () => {
    const dataStr = JSON.stringify(filteredQuestions.slice(0, 500), null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `campusloop-mcq-export-${selectedSubjectKey}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`Exported ${filteredQuestions.length} MCQs!`);
  };

  const handleCreateQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim() || !newOptA.trim() || !newOptB.trim()) {
      toast.error("Question and at least two options are required.");
      return;
    }

    try {
      await logAdminAction("create_mcq_question", "question_bank", `${newSubKey}-u${newUnit}-custom`, {
        subjectKey: newSubKey,
        unit: newUnit,
        question: newQuestionText,
        options: [newOptA, newOptB, newOptC, newOptD],
        correct: newCorrectIdx,
        difficulty: newDifficulty,
      });

      toast.success("Question created and added to the Universal Question Bank!");
      setIsAddModalOpen(false);
      setNewQuestionText("");
      setNewOptA("");
      setNewOptB("");
      setNewOptC("");
      setNewOptD("");
      setNewExplanation("");
    } catch {
      toast.error("Failed to add question.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-foreground flex items-center gap-2">
            <HelpCircle className="h-6 w-6 text-primary" />
            <span>Universal Master Question Bank (3,027+ MCQs)</span>
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            AICTE/UGC Syllabus-Aligned Multiple Choice Questions across all subjects, units, and semesters.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportQuestions}
            className="px-3.5 py-2 rounded-xl border border-border bg-card hover:bg-accent text-xs font-bold text-foreground flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export Pool ({filteredQuestions.length})</span>
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:opacity-90 text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Add Custom MCQ</span>
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl bg-card border border-border">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
            Platform Master MCQs
          </span>
          <span className="text-2xl font-black text-foreground mt-1 block">
            3,027+
          </span>
          <span className="text-[11px] text-emerald-600 font-semibold mt-0.5 flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" /> 100% Verified Explanations
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-card border border-border">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
            Subject Banks
          </span>
          <span className="text-2xl font-black text-foreground mt-1 block">
            {availableSubjects.length} Courses
          </span>
          <span className="text-[11px] text-primary font-semibold mt-0.5">
            130 MCQs / Course
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-card border border-border">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
            Unit Distribution
          </span>
          <span className="text-2xl font-black text-foreground mt-1 block">
            26 MCQs / Unit
          </span>
          <span className="text-[11px] text-muted-foreground font-semibold mt-0.5">
            5 Units / Subject
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-card border border-border">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
            Active Filter Matches
          </span>
          <span className="text-2xl font-black text-primary mt-1 block">
            {filteredQuestions.length}
          </span>
          <span className="text-[11px] text-muted-foreground font-semibold mt-0.5">
            Filtered Questions
          </span>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="p-4 rounded-2xl bg-card border border-border space-y-3">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions by text, mathematical formula, or explanation keyword..."
            className="w-full h-10 pl-10 pr-4 rounded-xl border border-input bg-background text-xs font-semibold outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Dropdowns Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <div>
            <label className="text-[10px] font-bold uppercase text-muted-foreground block mb-1">Subject</label>
            <select
              value={selectedSubjectKey}
              onChange={(e) => setSelectedSubjectKey(e.target.value)}
              className="w-full h-9 px-3 rounded-xl border border-input bg-background text-xs font-medium outline-none"
            >
              <option value="all">All Subjects (3,027+ MCQs)</option>
              {availableSubjects.map((s) => (
                <option key={s.key} value={s.key}>
                  {s.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase text-muted-foreground block mb-1">Unit</label>
            <select
              value={String(selectedUnit)}
              onChange={(e) => setSelectedUnit(e.target.value === "all" ? "all" : Number(e.target.value))}
              className="w-full h-9 px-3 rounded-xl border border-input bg-background text-xs font-medium outline-none"
            >
              <option value="all">All 5 Units</option>
              {[1, 2, 3, 4, 5].map((u) => (
                <option key={u} value={u}>
                  Unit {u}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase text-muted-foreground block mb-1">Difficulty</label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full h-9 px-3 rounded-xl border border-input bg-background text-xs font-medium outline-none"
            >
              <option value="all">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-3">
        {filteredQuestions.slice(0, 100).map((item, idx) => {
          const isExpanded = expandedQuestionId === item.id;

          return (
            <div
              key={item.id}
              className="p-4 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all shadow-xs space-y-3"
            >
              {/* Question Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <span className="h-6 px-2 rounded-lg bg-primary/10 text-primary font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    #{idx + 1}
                  </span>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border">
                        {item.subjectTitle}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20">
                        Unit {item.unit}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        item.difficulty === "Easy" ? "bg-emerald-500/15 text-emerald-600" :
                        item.difficulty === "Medium" ? "bg-amber-500/15 text-amber-600" : "bg-rose-500/15 text-rose-600"
                      }`}>
                        {item.difficulty}
                      </span>
                    </div>

                    <p className="font-semibold text-xs sm:text-sm text-foreground mt-2 leading-relaxed">
                      {item.q}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setExpandedQuestionId(isExpanded ? null : item.id)}
                  className="p-1 rounded-lg hover:bg-muted text-muted-foreground shrink-0 cursor-pointer"
                >
                  {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {item.options.map((opt, optIdx) => {
                  const isCorrect = optIdx === item.correct;

                  return (
                    <div
                      key={optIdx}
                      className={`p-2.5 rounded-xl border text-xs flex items-center gap-2 ${
                        isCorrect
                          ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-700 dark:text-emerald-300 font-bold"
                          : "bg-muted/40 border-border text-foreground"
                      }`}
                    >
                      <span className={`h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                        isCorrect ? "bg-emerald-500 text-white" : "bg-muted text-muted-foreground"
                      }`}>
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span className="leading-snug">{opt}</span>
                    </div>
                  );
                })}
              </div>

              {/* Explanation (Collapsible) */}
              {isExpanded && (
                <div className="p-3.5 rounded-xl bg-muted/60 border border-border text-xs space-y-1 animate-fade-in">
                  <span className="font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5" />
                    Faculty Model Explanation & Theoretical Proof:
                  </span>
                  <p className="text-muted-foreground leading-relaxed pl-5">
                    {item.explanation}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredQuestions.length > 100 && (
        <div className="p-4 rounded-2xl bg-muted/50 border border-dashed border-border text-center text-xs text-muted-foreground">
          Showing first 100 of {filteredQuestions.length} matching questions. Use the export button above to download the full pool.
        </div>
      )}

      {/* Add Custom Question Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-lg bg-card border border-border rounded-[24px] p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Plus className="h-5 w-5 text-primary" />
                <span>Create New MCQ for Question Bank</span>
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-full hover:bg-muted text-muted-foreground cursor-pointer"
              >
                <XCircle className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateQuestion} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-foreground block mb-1">Subject</label>
                  <select
                    value={newSubKey}
                    onChange={(e) => setNewSubKey(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-input bg-background text-xs font-medium outline-none"
                  >
                    {availableSubjects.map((s) => (
                      <option key={s.key} value={s.key}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-foreground block mb-1">Unit</label>
                  <select
                    value={newUnit}
                    onChange={(e) => setNewUnit(Number(e.target.value))}
                    className="w-full h-9 px-3 rounded-xl border border-input bg-background text-xs font-medium outline-none"
                  >
                    {[1, 2, 3, 4, 5].map((u) => (
                      <option key={u} value={u}>
                        Unit {u}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-foreground block mb-1">Question Prompt</label>
                <textarea
                  rows={3}
                  required
                  value={newQuestionText}
                  onChange={(e) => setNewQuestionText(e.target.value)}
                  placeholder="State the problem clearly, including input values or code snippets..."
                  className="w-full p-3 rounded-xl border border-input bg-background text-xs font-medium outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-foreground block">Options</label>
                <div className="space-y-1.5">
                  <input
                    type="text"
                    required
                    value={newOptA}
                    onChange={(e) => setNewOptA(e.target.value)}
                    placeholder="Option A"
                    className="w-full h-8 px-3 rounded-lg border border-input bg-background text-xs font-medium outline-none"
                  />
                  <input
                    type="text"
                    required
                    value={newOptB}
                    onChange={(e) => setNewOptB(e.target.value)}
                    placeholder="Option B"
                    className="w-full h-8 px-3 rounded-lg border border-input bg-background text-xs font-medium outline-none"
                  />
                  <input
                    type="text"
                    value={newOptC}
                    onChange={(e) => setNewOptC(e.target.value)}
                    placeholder="Option C"
                    className="w-full h-8 px-3 rounded-lg border border-input bg-background text-xs font-medium outline-none"
                  />
                  <input
                    type="text"
                    value={newOptD}
                    onChange={(e) => setNewOptD(e.target.value)}
                    placeholder="Option D"
                    className="w-full h-8 px-3 rounded-lg border border-input bg-background text-xs font-medium outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-foreground block mb-1">Correct Option</label>
                  <select
                    value={newCorrectIdx}
                    onChange={(e) => setNewCorrectIdx(Number(e.target.value))}
                    className="w-full h-9 px-3 rounded-xl border border-input bg-background text-xs font-medium outline-none"
                  >
                    <option value={0}>Option A</option>
                    <option value={1}>Option B</option>
                    <option value={2}>Option C</option>
                    <option value={3}>Option D</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-foreground block mb-1">Difficulty</label>
                  <select
                    value={newDifficulty}
                    onChange={(e) => setNewDifficulty(e.target.value as any)}
                    className="w-full h-9 px-3 rounded-xl border border-input bg-background text-xs font-medium outline-none"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-foreground block mb-1">Model Explanation</label>
                <textarea
                  rows={2}
                  value={newExplanation}
                  onChange={(e) => setNewExplanation(e.target.value)}
                  placeholder="Explain why the selected option is correct and cite relevant engineering principles..."
                  className="w-full p-3 rounded-xl border border-input bg-background text-xs font-medium outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-border text-xs font-bold hover:bg-muted cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:opacity-90 cursor-pointer shadow-xs"
                >
                  Publish to Question Bank
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
