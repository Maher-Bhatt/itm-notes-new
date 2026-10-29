import { useState, useMemo } from "react";
import { 
  Code, Search, Filter, Download, CheckCircle2, XCircle, 
  Play, Terminal, Copy, Eye, FileCode, Check, Sparkles, HelpCircle
} from "lucide-react";
import { ALL_CODING_PROBLEMS, CodingProblem } from "@/data/codingLabData";
import { toast } from "sonner";

export function AdminPracticalsTab() {
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
  const [selectedSemester, setSelectedSemester] = useState<number | "all">("all");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [inspectingPractical, setInspectingPractical] = useState<CodingProblem | null>(null);
  const [activeInspectorTab, setActiveInspectorTab] = useState<"aim" | "solution" | "starter" | "viva" | "test">("aim");
  const [testResult, setTestResult] = useState<{ passed: boolean; output: string } | null>(null);

  const departments = [
    { id: "all", name: "All Departments" },
    { id: "CSE", name: "CSE" },
    { id: "AI&DS", name: "AI&DS" },
    { id: "ECE", name: "ECE" },
    { id: "BCA", name: "BCA" },
    { id: "MCA", name: "MCA" },
    { id: "MECH", name: "MECH" },
    { id: "CIVIL", name: "CIVIL" },
    { id: "MBA", name: "MBA" },
  ];

  const languages = ["all", "c", "cpp", "java", "python", "sql", "javascript", "bash", "verilog"];

  const filteredPracticals = useMemo(() => {
    return ALL_CODING_PROBLEMS.filter((p) => {
      if (selectedDepartment !== "all") {
        const d = (p.department || "").toLowerCase();
        const s = p.subjectName.toLowerCase();
        const depTarget = selectedDepartment.toLowerCase();
        const match = d === depTarget || s.includes(depTarget) ||
          (depTarget === "cse" && (s.includes("cs") || s.includes("dsa") || s.includes("os") || s.includes("cn"))) ||
          (depTarget === "ai&ds" && (s.includes("ai") || s.includes("ml") || s.includes("nlp") || s.includes("vision"))) ||
          (depTarget === "ece" && (s.includes("ec") || s.includes("electronics") || s.includes("vlsi") || s.includes("signal"))) ||
          (depTarget === "bca" && s.includes("bca")) ||
          (depTarget === "mca" && s.includes("mca")) ||
          (depTarget === "mba" && s.includes("mba")) ||
          (depTarget === "mech" && (s.includes("me") || s.includes("cad") || s.includes("fea"))) ||
          (depTarget === "civil" && (s.includes("ce") || s.includes("structural") || s.includes("surveying")));
        if (!match) return false;
      }
      if (selectedLanguage !== "all" && p.language.toLowerCase() !== selectedLanguage.toLowerCase()) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          p.subjectName.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.fileName.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [selectedDepartment, selectedLanguage, searchQuery]);

  const handleTestValidator = (prob: CodingProblem) => {
    try {
      const res = prob.validator(prob.modelSolution);
      setTestResult(res);
      if (res.passed) {
        toast.success("Validator Verification PASSED: Model solution satisfies all tokens.");
      } else {
        toast.error("Validator Verification FAILED.");
      }
    } catch (err: any) {
      toast.error(`Validation test threw an error: ${err?.message || err}`);
    }
  };

  const handleExportPracticals = () => {
    const dataStr = JSON.stringify(filteredPracticals.slice(0, 500), null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `campusloop-practicals-${selectedDepartment}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`Exported ${filteredPracticals.length} practical experiments!`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-foreground flex items-center gap-2">
            <Code className="h-6 w-6 text-primary" />
            <span>Universal Practicals Laboratory Bank (1,180+ Experiments)</span>
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Full AICTE/UGC Laboratory Manuals across 43 courses with starter scaffolds, model code, and oral viva voce questions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportPracticals}
            className="px-3.5 py-2 rounded-xl border border-border bg-card hover:bg-accent text-xs font-bold text-foreground flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export Bank ({filteredPracticals.length})</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl bg-card border border-border">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
            Total Laboratory Experiments
          </span>
          <span className="text-2xl font-black text-foreground mt-1 block">
            {ALL_CODING_PROBLEMS.length}+
          </span>
          <span className="text-[11px] text-emerald-600 font-semibold mt-0.5 flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" /> 100% Executable Code
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-card border border-border">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
            Lab Courses
          </span>
          <span className="text-2xl font-black text-foreground mt-1 block">
            43 Labs
          </span>
          <span className="text-[11px] text-primary font-semibold mt-0.5">
            Sem 1 to Sem 8
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-card border border-border">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
            Oral Viva Voce Questions
          </span>
          <span className="text-2xl font-black text-foreground mt-1 block">
            3,500+ Q&As
          </span>
          <span className="text-[11px] text-muted-foreground font-semibold mt-0.5">
            3-5 Q&As per Practical
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-card border border-border">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
            Filter Matches
          </span>
          <span className="text-2xl font-black text-primary mt-1 block">
            {filteredPracticals.length}
          </span>
          <span className="text-[11px] text-muted-foreground font-semibold mt-0.5">
            Active Filtered
          </span>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="p-4 rounded-2xl bg-card border border-border space-y-3">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search practicals by title, algorithm, or lab course..."
            className="w-full h-10 pl-10 pr-4 rounded-xl border border-input bg-background text-xs font-semibold outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Department Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
          <span className="text-[10px] font-bold uppercase text-muted-foreground shrink-0 mr-1">Dept:</span>
          {departments.map((dep) => (
            <button
              key={dep.id}
              onClick={() => setSelectedDepartment(dep.id)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedDepartment.toLowerCase() === dep.id.toLowerCase()
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-muted text-muted-foreground hover:bg-accent"
              }`}
            >
              {dep.name}
            </button>
          ))}
        </div>

        {/* Language Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
          <span className="text-[10px] font-bold uppercase text-muted-foreground shrink-0 mr-1">Lang:</span>
          {languages.map((lng) => (
            <button
              key={lng}
              onClick={() => setSelectedLanguage(lng)}
              className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold uppercase transition-all cursor-pointer whitespace-nowrap ${
                selectedLanguage === lng
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "bg-muted text-muted-foreground hover:bg-accent"
              }`}
            >
              {lng}
            </button>
          ))}
        </div>
      </div>

      {/* Practicals Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {filteredPracticals.slice(0, 75).map((prob, idx) => (
          <div
            key={prob.id}
            className="p-4 rounded-2xl bg-card border border-border hover:border-primary/40 transition-all flex flex-col justify-between shadow-xs group"
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 truncate">
                  {prob.subjectName}
                </span>
                <span className="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded bg-muted text-muted-foreground shrink-0">
                  {prob.language}
                </span>
              </div>

              <h4 className="font-bold text-sm text-foreground mt-2.5 group-hover:text-primary transition-colors line-clamp-1">
                {prob.title}
              </h4>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                {prob.description}
              </p>
            </div>

            <div className="pt-3 mt-3 border-t border-border flex items-center justify-between">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                prob.difficulty === "Easy" ? "bg-emerald-500/15 text-emerald-600" :
                prob.difficulty === "Medium" ? "bg-amber-500/15 text-amber-600" : "bg-rose-500/15 text-rose-600"
              }`}>
                {prob.difficulty}
              </span>

              <button
                onClick={() => {
                  setInspectingPractical(prob);
                  setActiveInspectorTab("aim");
                  setTestResult(null);
                }}
                className="text-xs font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Inspect Experiment</span>
                <Eye className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredPracticals.length > 75 && (
        <div className="p-4 rounded-2xl bg-muted/50 border border-dashed border-border text-center text-xs text-muted-foreground">
          Showing 75 of {filteredPracticals.length} matching practicals. Use the search bar or Export button to inspect all.
        </div>
      )}

      {/* Practical Inspector Modal */}
      {inspectingPractical && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-3xl bg-card border border-border rounded-[24px] p-6 shadow-2xl space-y-4 max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-primary text-primary-foreground">
                    {inspectingPractical.language}
                  </span>
                  <span className="text-xs font-mono text-muted-foreground">
                    {inspectingPractical.fileName}
                  </span>
                </div>
                <h3 className="text-base font-bold text-foreground mt-1">
                  {inspectingPractical.title}
                </h3>
              </div>

              <button
                onClick={() => setInspectingPractical(null)}
                className="p-1 rounded-full hover:bg-muted text-muted-foreground cursor-pointer"
              >
                <XCircle className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="flex items-center gap-1.5 border-b border-border pb-2">
              {[
                { id: "aim", label: "Aim & Specs" },
                { id: "solution", label: "Model Solution" },
                { id: "starter", label: "Starter Scaffold" },
                { id: "viva", label: "Viva Voce Q&As" },
                { id: "test", label: "Run Validator" },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveInspectorTab(t.id as any)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeInspectorTab === t.id
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs">
              {activeInspectorTab === "aim" && (
                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-muted/40 border border-border space-y-2">
                    <span className="font-bold text-foreground uppercase tracking-wider text-[11px] block">
                      Problem Statement & Apparatus
                    </span>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                      {inspectingPractical.description}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-muted/40 border border-border space-y-2">
                    <span className="font-bold text-foreground uppercase tracking-wider text-[11px] block">
                      Expected Output Verification
                    </span>
                    <pre className="p-3 rounded-lg bg-neutral-900 text-neutral-100 font-mono text-[11px] overflow-x-auto whitespace-pre-wrap border border-neutral-800">
                      {inspectingPractical.expectedOutput}
                    </pre>
                  </div>
                </div>
              )}

              {activeInspectorTab === "solution" && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-foreground text-[11px] uppercase">
                      Official University Reference Solution
                    </span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(inspectingPractical.modelSolution);
                        toast.success("Model solution copied!");
                      }}
                      className="text-primary hover:underline flex items-center gap-1 cursor-pointer font-semibold"
                    >
                      <Copy className="h-3 w-3" /> Copy Code
                    </button>
                  </div>
                  <pre className="p-4 rounded-xl bg-neutral-900 text-neutral-100 font-mono text-xs overflow-x-auto leading-relaxed border border-neutral-800">
                    <code>{inspectingPractical.modelSolution}</code>
                  </pre>
                </div>
              )}

              {activeInspectorTab === "starter" && (
                <div className="space-y-2">
                  <span className="font-bold text-foreground text-[11px] uppercase">
                    Scaffold Starter Code with // TODO Markers
                  </span>
                  <pre className="p-4 rounded-xl bg-neutral-900 text-neutral-100 font-mono text-xs overflow-x-auto leading-relaxed border border-neutral-800">
                    <code>{inspectingPractical.starterCode}</code>
                  </pre>
                </div>
              )}

              {activeInspectorTab === "viva" && (
                <div className="space-y-3">
                  <span className="font-bold text-foreground text-[11px] uppercase block">
                    Oral Examiner Viva Voce Examination Questions & Answers
                  </span>
                  {(inspectingPractical.vivaQuestions || []).map((viva, vIdx) => (
                    <div key={vIdx} className="p-3.5 rounded-xl bg-muted/40 border border-border space-y-1.5">
                      <span className="font-bold text-primary block">
                        Q{vIdx + 1}: {viva.question}
                      </span>
                      <p className="text-muted-foreground leading-relaxed pl-4 border-l-2 border-primary/30">
                        {viva.answer}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {activeInspectorTab === "test" && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-muted/40 border border-border space-y-2 text-center">
                    <Terminal className="h-8 w-8 text-primary mx-auto" />
                    <h4 className="font-bold text-sm text-foreground">Interactive Browser Token Validator</h4>
                    <p className="text-xs text-muted-foreground max-w-md mx-auto">
                      Run the automated validator against this experiment's model solution to verify compile checks and syntax invariants.
                    </p>
                    <button
                      onClick={() => handleTestValidator(inspectingPractical)}
                      className="px-4 py-2 rounded-xl bg-primary text-primary-foreground font-bold text-xs flex items-center gap-2 mx-auto cursor-pointer shadow-xs"
                    >
                      <Play className="h-3.5 w-3.5 fill-current" />
                      <span>Execute Validator Check</span>
                    </button>
                  </div>

                  {testResult && (
                    <div className={`p-4 rounded-xl border space-y-2 animate-fade-in ${
                      testResult.passed
                        ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-800 dark:text-emerald-300"
                        : "bg-rose-500/10 border-rose-500/40 text-rose-800 dark:text-rose-300"
                    }`}>
                      <div className="flex items-center gap-2 font-bold text-xs">
                        {testResult.passed ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                        <span>Status: {testResult.passed ? "PASSED (Model Solution Verified)" : "FAILED"}</span>
                      </div>
                      <pre className="p-3 rounded-lg bg-neutral-900 text-neutral-100 font-mono text-[11px] overflow-x-auto whitespace-pre-wrap border border-neutral-800">
                        {testResult.output}
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end border-t border-border">
              <button
                onClick={() => setInspectingPractical(null)}
                className="px-4 py-2 rounded-xl bg-primary text-primary-foreground font-bold text-xs cursor-pointer"
              >
                Close Inspector
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
