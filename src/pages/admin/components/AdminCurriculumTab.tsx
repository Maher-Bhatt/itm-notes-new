import { useState, useMemo } from "react";
import { 
  BookOpen, Search, Plus, Filter, CheckCircle2, XCircle, 
  Layers, ChevronRight, Eye, Edit3, Trash2, Download, 
  Sparkles, RefreshCw, GraduationCap, Building2, Check
} from "lucide-react";
import { ALL_SUBJECTS_METADATA, SubjectMeta } from "@/pages/CodingLabPage";
import { subjects } from "@/data/subjects";
import type { Subject } from "@/data/types";
import { logAdminAction } from "@/services/adminOperationsService";
import { toast } from "sonner";

export function AdminCurriculumTab() {
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
  const [selectedSemester, setSelectedSemester] = useState<number | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSubject, setActiveSubject] = useState<SubjectMeta | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New subject form state
  const [newSubName, setNewSubName] = useState("");
  const [newSubCode, setNewSubCode] = useState("");
  const [newSubDept, setNewSubDept] = useState("CSE");
  const [newSubSem, setNewSubSem] = useState<number>(4);
  const [newSubDesc, setNewSubDesc] = useState("");

  const departments = [
    { id: "all", name: "All Departments" },
    { id: "CSE", name: "Computer Science" },
    { id: "AI&DS", name: "AI & Data Science" },
    { id: "ECE", name: "Electronics & Comm" },
    { id: "BCA", name: "BCA Computing" },
    { id: "MCA", name: "MCA Advanced" },
    { id: "MECH", name: "Mechanical Eng" },
    { id: "CIVIL", name: "Civil Eng" },
    { id: "MBA", name: "MBA Analytics" },
  ];

  // Filtered subjects
  const filteredSubjects = useMemo(() => {
    return ALL_SUBJECTS_METADATA.filter(s => {
      if (selectedSemester !== "all" && s.semester !== selectedSemester) return false;
      if (selectedDepartment !== "all") {
        const depTarget = selectedDepartment.toLowerCase();
        const code = s.code.toLowerCase();
        const name = s.name.toLowerCase();
        const match = code.includes(depTarget) || name.includes(depTarget) ||
          (depTarget === "cse" && (code.includes("cs") || code.includes("dsa") || code.includes("os") || code.includes("cn"))) ||
          (depTarget === "ai&ds" && (code.includes("ai") || code.includes("aiml") || name.includes("intelligence"))) ||
          (depTarget === "ece" && (code.includes("ec") || name.includes("electronics"))) ||
          (depTarget === "bca" && (code.includes("bca") || name.includes("bca"))) ||
          (depTarget === "mca" && code.includes("mca")) ||
          (depTarget === "mba" && (code.includes("mba") || name.includes("analytics") || name.includes("finance"))) ||
          (depTarget === "mech" && (code.includes("me") || name.includes("mechanics") || name.includes("cad"))) ||
          (depTarget === "civil" && (code.includes("ce") || name.includes("structural") || name.includes("gis")));
        if (!match) return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          s.name.toLowerCase().includes(q) ||
          s.shortName.toLowerCase().includes(q) ||
          s.code.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [selectedDepartment, selectedSemester, searchQuery]);

  const handleCreateSubject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubName.trim() || !newSubCode.trim()) {
      toast.error("Subject title and code are required.");
      return;
    }

    try {
      await logAdminAction("create_curriculum_subject", "curriculum", newSubCode, {
        name: newSubName,
        code: newSubCode,
        department: newSubDept,
        semester: newSubSem,
        description: newSubDesc,
      });

      toast.success(`Curriculum subject ${newSubCode}: ${newSubName} created successfully!`);
      setIsAddModalOpen(false);
      setNewSubName("");
      setNewSubCode("");
      setNewSubDesc("");
    } catch {
      toast.error("Failed to create subject.");
    }
  };

  const handleExportCurriculum = () => {
    const dataStr = JSON.stringify(ALL_SUBJECTS_METADATA, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "campusloop-universal-curriculum.json";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Curriculum syllabus catalog exported!");
  };

  return (
    <div className="space-y-6">
      {/* Header & Metrics */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-foreground flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span>Universal Curriculum & Syllabus Director</span>
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Manage 43+ University Laboratory & Theory Courses across all 8 semesters and departments.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCurriculum}
            className="px-3.5 py-2 rounded-xl border border-border bg-card hover:bg-accent text-xs font-bold text-foreground flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export Catalog</span>
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:opacity-90 text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Add New Course</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl bg-card border border-border">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
            Accredited Courses
          </span>
          <span className="text-2xl font-black text-foreground mt-1 block">
            {ALL_SUBJECTS_METADATA.length}
          </span>
          <span className="text-[11px] text-emerald-600 font-semibold mt-0.5 flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" /> 100% Syllabus Covered
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-card border border-border">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
            Academic Semesters
          </span>
          <span className="text-2xl font-black text-foreground mt-1 block">
            8 Semesters
          </span>
          <span className="text-[11px] text-primary font-semibold mt-0.5">
            Sem 1 through Sem 8
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-card border border-border">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
            Curriculum Units
          </span>
          <span className="text-2xl font-black text-foreground mt-1 block">
            215+ Units
          </span>
          <span className="text-[11px] text-muted-foreground font-semibold mt-0.5">
            5 Units / Subject
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-card border border-border">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
            Departments
          </span>
          <span className="text-2xl font-black text-foreground mt-1 block">
            8 Disciplines
          </span>
          <span className="text-[11px] text-muted-foreground font-semibold mt-0.5">
            CSE, AI, ECE, BCA, MBA...
          </span>
        </div>
      </div>

      {/* Search & Department Filters */}
      <div className="p-4 rounded-2xl bg-card border border-border space-y-3">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by course code (e.g. OS401L), title, keywords..."
            className="w-full h-10 pl-10 pr-4 rounded-xl border border-input bg-background text-xs font-semibold outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Department Filter Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
          <span className="text-[10px] font-bold uppercase text-muted-foreground shrink-0 mr-1">Dept:</span>
          {departments.map((dept) => (
            <button
              key={dept.id}
              onClick={() => setSelectedDepartment(dept.id)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedDepartment === dept.id
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-muted text-muted-foreground hover:bg-accent"
              }`}
            >
              {dept.name}
            </button>
          ))}
        </div>

        {/* Semester Filter Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
          <span className="text-[10px] font-bold uppercase text-muted-foreground shrink-0 mr-1">Semester:</span>
          {(["all", 1, 2, 3, 4, 5, 6, 7, 8] as const).map((sem) => (
            <button
              key={String(sem)}
              onClick={() => setSelectedSemester(sem)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedSemester === sem
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "bg-muted text-muted-foreground hover:bg-accent"
              }`}
            >
              {sem === "all" ? "All Semesters" : `Semester ${sem}`}
            </button>
          ))}
        </div>
      </div>

      {/* Subjects Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {filteredSubjects.map((subject) => (
          <div
            key={subject.code}
            className="p-4 rounded-2xl bg-card border border-border hover:border-primary/40 transition-all flex flex-col justify-between group shadow-xs"
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${subject.badgeClass}`}>
                  Semester {subject.semester} · {subject.code}
                </span>
                <span className="text-xl shrink-0">{subject.icon}</span>
              </div>

              <h4 className="font-bold text-sm text-foreground mt-2.5 group-hover:text-primary transition-colors">
                {subject.name}
              </h4>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                {subject.description}
              </p>
            </div>

            <div className="pt-3 mt-3 border-t border-border flex items-center justify-between">
              <span className="text-[11px] font-mono font-semibold text-muted-foreground">
                5 Complete Units
              </span>
              <button
                onClick={() => setActiveSubject(subject)}
                className="text-xs font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Inspect Syllabus</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Inspect Syllabus Modal */}
      {activeSubject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-xl bg-card border border-border rounded-[24px] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">{activeSubject.icon}</span>
                <div>
                  <h3 className="text-base font-bold text-foreground">{activeSubject.name}</h3>
                  <span className="text-xs font-mono text-muted-foreground">
                    Code: {activeSubject.code} · Semester {activeSubject.semester}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setActiveSubject(null)}
                className="p-1.5 rounded-full hover:bg-muted text-muted-foreground cursor-pointer"
              >
                <XCircle className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Accredited 5-Unit Syllabus Architecture
              </h5>

              {[1, 2, 3, 4, 5].map((u) => (
                <div key={u} className="p-3 rounded-xl bg-muted/50 border border-border flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="h-6 w-6 rounded-lg bg-primary/10 text-primary font-bold text-xs flex items-center justify-center">
                      U{u}
                    </span>
                    <div>
                      <span className="text-xs font-bold text-foreground block">
                        Unit {u} Core Competencies & Theorems
                      </span>
                      <span className="text-[11px] text-muted-foreground font-mono">
                        Includes detailed notes, formulas, 26 unit MCQs & viva questions
                      </span>
                    </div>
                  </div>
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setActiveSubject(null)}
                className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold cursor-pointer"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Course Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-lg bg-card border border-border rounded-[24px] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Plus className="h-5 w-5 text-primary" />
                <span>Add New Course to Universal Curriculum</span>
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-full hover:bg-muted text-muted-foreground cursor-pointer"
              >
                <XCircle className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubject} className="space-y-3.5">
              <div>
                <label className="text-xs font-bold text-foreground block mb-1">Course Title</label>
                <input
                  type="text"
                  required
                  value={newSubName}
                  onChange={(e) => setNewSubName(e.target.value)}
                  placeholder="e.g. Distributed Operating Systems (CS603L)"
                  className="w-full h-10 px-3.5 rounded-xl border border-input bg-background text-xs font-medium outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-foreground block mb-1">Course Code</label>
                  <input
                    type="text"
                    required
                    value={newSubCode}
                    onChange={(e) => setNewSubCode(e.target.value)}
                    placeholder="e.g. DOS603L"
                    className="w-full h-10 px-3.5 rounded-xl border border-input bg-background text-xs font-medium outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-foreground block mb-1">Department</label>
                  <select
                    value={newSubDept}
                    onChange={(e) => setNewSubDept(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-input bg-background text-xs font-medium outline-none"
                  >
                    <option value="CSE">CSE</option>
                    <option value="AI&DS">AI&DS</option>
                    <option value="ECE">ECE</option>
                    <option value="BCA">BCA</option>
                    <option value="MCA">MCA</option>
                    <option value="MECH">MECH</option>
                    <option value="CIVIL">CIVIL</option>
                    <option value="MBA">MBA</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-foreground block mb-1">Semester</label>
                  <select
                    value={newSubSem}
                    onChange={(e) => setNewSubSem(Number(e.target.value))}
                    className="w-full h-10 px-3 rounded-xl border border-input bg-background text-xs font-medium outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                      <option key={s} value={s}>
                        Semester {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-foreground block mb-1">Syllabus Structure</label>
                  <div className="h-10 px-3 rounded-xl border border-border bg-muted flex items-center text-xs font-mono text-muted-foreground">
                    5 Units · AICTE Standard
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-foreground block mb-1">Description & Scope</label>
                <textarea
                  rows={2}
                  value={newSubDesc}
                  onChange={(e) => setNewSubDesc(e.target.value)}
                  placeholder="Overview of algorithms, laboratory components and prerequisites..."
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
                  Confirm & Register
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
