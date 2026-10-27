import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Clock,
  MapPin,
  UserCheck,
  FileText,
  CheckCircle2,
  AlertCircle,
  Copy,
  Search,
  Share2,
  X,
  GraduationCap,
  Sparkles,
  Download,
  Building2,
  BookOpen,
  ChevronRight,
  Printer,
} from "lucide-react";
import { toast } from "sonner";
import {
  VIVA_SCHEDULE,
  REMEDIAL_EXAMS,
  TIMETABLE_DATA,
  FACULTY_DIRECTORY,
  VIVA_CLASS_LOCATIONS,
  VIVA_INSTRUCTIONS,
  VivaItem,
  RemedialExamItem,
} from "@/data/timetableData";

interface TimetableModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: "viva" | "remedial" | "faculty" | "mst";
  initialClass?: 1 | 2 | 3 | 4 | 5;
}

// Master question bank route resolver
const getSubjectBankRoute = (codeOrName: string): string | null => {
  const norm = (codeOrName || "").toUpperCase();
  if (norm.includes("C2311C1") || norm.includes("OOPJ") || norm.includes("JAVA")) return "/imp-questions/oopj";
  if (norm.includes("C2310C5") || norm.includes("DSA") || norm.includes("DATA STRUCTURE")) return "/imp-questions/dsa";
  if (norm.includes("C2310C2") || norm.includes("CA") || norm.includes("ARCHITECTURE")) return "/imp-questions/ca";
  if (norm.includes("C2311C4") || norm.includes("DBMS") || norm.includes("DATABASE")) return "/imp-questions/dbms";
  if (norm.includes("S2320C1") || norm.includes("CONMP") || norm.includes("COANMP") || norm.includes("NUMERICAL")) return "/imp-questions/conmp";
  return null;
};

export function TimetableModal({
  isOpen,
  onClose,
  initialTab = "viva",
  initialClass = 1,
}: TimetableModalProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"viva" | "remedial" | "faculty" | "mst">(initialTab);
  const [selectedClass, setSelectedClass] = useState<1 | 2 | 3 | 4 | 5>(initialClass);
  const [selectedBranch, setSelectedBranch] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Sync initial props if modal reopens
  useEffect(() => {
    if (isOpen) {
      if (initialTab) setActiveTab(initialTab);
      if (initialClass) setSelectedClass(initialClass);
    }
  }, [isOpen, initialTab, initialClass]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Filtered Viva Items
  const filteredViva = useMemo(() => {
    return VIVA_SCHEDULE.filter((item) => {
      if (item.classGroup !== selectedClass) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        item.subjectName.toLowerCase().includes(q) ||
        item.subjectCode.toLowerCase().includes(q) ||
        item.facultyName.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q) ||
        item.date.includes(q)
      );
    });
  }, [selectedClass, searchQuery]);

  // Filtered Remedial Items
  const filteredRemedial = useMemo(() => {
    return REMEDIAL_EXAMS.filter((item) => {
      if (selectedBranch !== "all" && item.branch !== selectedBranch && `${item.semester}` !== selectedBranch) {
        return false;
      }
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        item.courseName.toLowerCase().includes(q) ||
        item.courseCode.toLowerCase().includes(q) ||
        item.branch.toLowerCase().includes(q) ||
        item.date.includes(q)
      );
    });
  }, [selectedBranch, searchQuery]);

  // Filtered Faculty Mentors
  const filteredFaculty = useMemo(() => {
    if (!searchQuery.trim()) return FACULTY_DIRECTORY;
    const q = searchQuery.toLowerCase();
    return FACULTY_DIRECTORY.filter(
      (f) =>
        f.name.toLowerCase().includes(q) ||
        f.role.toLowerCase().includes(q) ||
        f.subjects.some((s) => s.toLowerCase().includes(q)) ||
        f.vivaRooms.some((r) => r.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  if (!isOpen) return null;

  const activeLocation = VIVA_CLASS_LOCATIONS[selectedClass];

  const handleCopyClassSchedule = () => {
    const items = VIVA_SCHEDULE.filter((v) => v.classGroup === selectedClass);
    const textLines = [
      `📅 ITM (SLS) Baroda University - Submission & Viva Schedule 2026`,
      `Class: Class ${selectedClass} | Venue: ${activeLocation.room} (${activeLocation.block})`,
      `Reporting: 10:00 AM Onwards`,
      `----------------------------------------------------`,
      ...items.map(
        (i) =>
          `• ${i.date} | ${i.subjectCode} (${i.subjectName})\n  Faculty: ${i.facultyName} | Room: ${i.location}`
      ),
      `----------------------------------------------------`,
      `⚠️ Instructions: Mandatory physical submission of practical files & assignments.`,
      `Powered by ITM Notes Portal`,
    ];

    navigator.clipboard.writeText(textLines.join("\n"));
    toast.success(`Class ${selectedClass} Viva timetable copied to clipboard!`);
  };

  const handlePrintSchedule = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-card text-foreground border border-border rounded-3xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-scale-in">
        {/* ── MODAL TOP HEADER ── */}
        <div className="p-4 sm:p-5 border-b border-border bg-zinc-950 text-white border-b border-zinc-800 shrink-0">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white text-zinc-950 font-black shadow-xs flex items-center justify-center shadow-md shrink-0">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base sm:text-lg font-black tracking-tight text-white font-display">
                    Exam & Viva Timetable Hub
                  </h2>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-white text-zinc-950 font-black shadow-xs">
                    Odd Sem 2026-27
                  </span>
                </div>
                <p className="text-xs text-zinc-400 mt-0.5 font-medium">
                  ITM (SLS) Baroda University · School of Computer Science Engineering & Technology
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handlePrintSchedule}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all cursor-pointer"
                title="Print Timetable"
              >
                <Printer className="h-3.5 w-3.5" />
                <span>Print</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* ── MAIN NAVIGATION TABS (Compact & Non-Clipping) ── */}
          <div className="flex items-center gap-1.5 mt-3.5 overflow-x-auto no-scrollbar font-display">
            <button
              onClick={() => setActiveTab("viva")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
                activeTab === "viva"
                  ? "bg-white text-zinc-950 font-black shadow-xs shadow-sm shadow-[#FAFAFA]/20 font-black"
                  : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white"
              }`}
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Sem 3 Viva & Submissions</span>
              <span className="px-1.5 py-0.2 rounded-md bg-white/10 text-white/90 text-[10px]">Oct 26 – Nov 3</span>
            </button>

            <button
              onClick={() => setActiveTab("remedial")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
                activeTab === "remedial"
                  ? "bg-white text-zinc-950 font-black shadow-xs shadow-sm shadow-[#FAFAFA]/20 font-black"
                  : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white"
              }`}
            >
              <Clock className="h-3.5 w-3.5" />
              <span>Remedial Papers</span>
              <span className="px-1.5 py-0.2 rounded-md bg-white/10 text-white/90 text-[10px]">Sem 3 & 5</span>
            </button>

            <button
              onClick={() => setActiveTab("faculty")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
                activeTab === "faculty"
                  ? "bg-white text-zinc-950 font-black shadow-xs shadow-sm shadow-[#FAFAFA]/20 font-black"
                  : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white"
              }`}
            >
              <UserCheck className="h-3.5 w-3.5" />
              <span>Faculty Mentors</span>
              <span className="px-1.5 py-0.2 rounded-md bg-white/10 text-white/90 text-[10px] font-mono">{FACULTY_DIRECTORY.length}</span>
            </button>

            <button
              onClick={() => setActiveTab("mst")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
                activeTab === "mst"
                  ? "bg-white text-zinc-950 font-black shadow-xs shadow-sm shadow-[#FAFAFA]/20 font-black"
                  : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white"
              }`}
            >
              <FileText className="h-3.5 w-3.5" />
              <span>MST Regular Archive</span>
            </button>
          </div>
        </div>

        {/* ── SEARCH & SUB-CONTROLS BAR ── */}
        <div className="p-3 sm:px-5 sm:py-3.5 border-b border-border bg-card/90 backdrop-blur flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder={
                activeTab === "viva"
                  ? "Search by subject (e.g. OOPJ), faculty (e.g. Diksha), room, or date..."
                  : activeTab === "remedial"
                  ? "Search remedial subject or course code (e.g. C2311C1)..."
                  : "Search faculty name or room..."
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-9 pl-9 pr-3 rounded-xl border border-input bg-background text-xs focus:outline-none focus:ring-1 focus:ring-primary"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-xs"
              >
                Clear
              </button>
            )}
          </div>

          {activeTab === "viva" && (
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleCopyClassSchedule}
                className="h-9 px-3.5 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95 border border-border cursor-pointer shrink-0 font-display shadow-xs"
                title={`Copy Class ${selectedClass} timetable to clipboard`}
              >
                <Copy className="h-3.5 w-3.5 text-primary" />
                <span>Copy Class {selectedClass}</span>
              </button>
            </div>
          )}
        </div>

        {/* ── STICKY PINNED CLASS SELECTOR (Only in Viva tab) ── */}
        {activeTab === "viva" && (
          <div className="px-4 py-3 sm:px-6 sm:py-3 border-b border-border bg-secondary/30 shrink-0 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-muted-foreground uppercase tracking-wider text-[10px] font-display">
                Select Your B.Tech Cohort Class:
              </span>
              <span className="text-primary font-semibold flex items-center gap-1 text-[11px]">
                <MapPin className="h-3.5 w-3.5 text-amber-500" />
                Assigned Venue: <strong className="text-foreground">{activeLocation.room}</strong> ({activeLocation.block})
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {([1, 2, 3, 4, 5] as const).map((cls) => {
                const loc = VIVA_CLASS_LOCATIONS[cls];
                const isSelected = selectedClass === cls;
                return (
                  <button
                    key={cls}
                    onClick={() => setSelectedClass(cls)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer relative ${
                      isSelected
                        ? "bg-zinc-900 text-white border-zinc-800 text-white border-[#18181B] shadow-md shadow-[#18181B]/25 font-bold"
                        : "bg-card hover:bg-secondary/70 border-border text-foreground"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black">Class {cls}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-md font-mono font-bold ${
                          isSelected
                            ? "bg-white text-zinc-950 font-black shadow-xs"
                            : "bg-secondary border border-border text-muted-foreground"
                        }`}
                      >
                        {loc.room}
                      </span>
                    </div>
                    <p
                      className={`text-[10px] mt-0.5 truncate ${
                        isSelected ? "text-zinc-100 font-bold" : "text-muted-foreground"
                      }`}
                    >
                      {loc.block}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ── TAB 1: VIVA & SUBMISSIONS ── */}
        {activeTab === "viva" && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {/* Timetable Table & Cards */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
              <div className="p-3.5 bg-secondary/30 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-xs sm:text-sm text-foreground flex items-center gap-1.5 font-display">
                    <span>Class {selectedClass} Practical Viva & Submission Schedule</span>
                  </h3>
                  <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-500 dark:text-amber-500 text-[10px] font-bold border border-amber-500/20 font-mono">
                    {filteredViva.length} Subjects
                  </span>
                </div>
                <span className="text-[11px] text-muted-foreground font-mono">
                  Room: {activeLocation.room} · Daily Slot: 10:00 AM Onwards
                </span>
              </div>

              {filteredViva.length === 0 ? (
                <div className="p-8 text-center text-xs text-muted-foreground">
                  No viva schedule items match your search term "{searchQuery}".
                </div>
              ) : (
                <div className="divide-y divide-border/60">
                  {filteredViva.map((viva) => {
                    const isDay1 = viva.date === "26-10-2026";
                    return (
                      <div
                        key={viva.id}
                        className={`p-3.5 sm:p-4 hover:bg-secondary/30 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                          isDay1 ? "bg-zinc-900 text-white border-zinc-800/[0.03] dark:bg-[#FAFAFA]/[0.02]" : ""
                        }`}
                      >
                        <div className="flex items-start gap-3 min-w-0">
                          {/* Date badge */}
                          <div className={`w-16 sm:w-20 p-2 rounded-xl text-center shrink-0 border ${
                            isDay1 
                              ? "bg-zinc-900 text-white border-zinc-800 text-zinc-100 font-bold border-[#18181B] shadow-xs" 
                              : "bg-secondary text-foreground border-border"
                          }`}>
                            <span className={`block text-[9px] uppercase font-bold ${isDay1 ? "text-zinc-100 font-bold" : "text-muted-foreground"}`}>
                              {isDay1 ? "Day 1" : "Date"}
                            </span>
                            <span className="block text-xs font-mono font-black">
                              {viva.date}
                            </span>
                          </div>

                          {/* Subject Details */}
                          <div className="space-y-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-zinc-900 text-white border-zinc-800 text-zinc-100 font-bold dark:bg-[#FAFAFA] dark:text-[#18181B] font-mono">
                                {viva.subjectCode}
                              </span>
                              <h4 className="font-bold text-xs sm:text-sm text-foreground">
                                {viva.subjectName}
                              </h4>
                              {isDay1 && (
                                <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-amber-500/15 text-amber-500 dark:text-amber-500 border border-amber-500/30 flex items-center gap-1 font-mono">
                                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                                  Starts Tomorrow
                                </span>
                              )}
                            </div>

                            <div className="flex items-center gap-3 text-[11px] text-muted-foreground flex-wrap pt-0.5">
                              <span className="flex items-center gap-1 text-foreground font-medium">
                                <UserCheck className="h-3.5 w-3.5 text-primary shrink-0" />
                                {viva.facultyName}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                                Venue: <strong className="text-foreground">{viva.location}</strong>
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                                {viva.timeSlot}
                              </span>
                            </div>

                            {viva.notes && (
                              <p className="text-[10px] text-muted-foreground italic flex items-center gap-1 pt-0.5">
                                <FileText className="h-3 w-3 text-muted-foreground shrink-0" />
                                <span>{viva.notes}</span>
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Right Actions & Tag */}
                        <div className="flex items-center gap-2 shrink-0 sm:flex-col sm:items-end">
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-orange-500/10 text-orange-600 dark:text-orange-400 text-[10px] font-bold border border-orange-500/20">
                            <FileText className="h-3 w-3" />
                            File Submission
                          </span>

                          {(() => {
                            const bankRoute = getSubjectBankRoute(viva.subjectCode || viva.subjectName);
                            if (bankRoute) {
                              return (
                                <button
                                  type="button"
                                  onClick={() => {
                                    onClose();
                                    navigate(bankRoute);
                                  }}
                                  className="px-2.5 py-1 rounded-lg bg-zinc-900 text-white border-zinc-800 hover:bg-[#27272A] text-zinc-100 font-bold font-black text-[10px] flex items-center gap-1 shadow-xs cursor-pointer transition-all active:scale-95 font-display"
                                  title={`Open 38 Master Solved Qs for ${viva.subjectCode}`}
                                >
                                  <BookOpen className="h-3 w-3" />
                                  <span>38 Solved Qs</span>
                                </button>
                              );
                            }
                            return (
                              <button
                                type="button"
                                onClick={() => {
                                  onClose();
                                  navigate("/materials");
                                }}
                                className="px-2.5 py-1 rounded-lg bg-secondary hover:bg-secondary/80 text-foreground font-bold text-[10px] flex items-center gap-1 border border-border cursor-pointer transition-all"
                              >
                                <BookOpen className="h-3 w-3 text-primary" />
                                <span>Materials</span>
                              </button>
                            );
                          })()}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Mandatory Guidelines Box */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-200 space-y-2">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0" />
                <h4 className="font-bold text-xs uppercase tracking-wider font-display">
                  Official Mandatory Submission Guidelines
                </h4>
              </div>
              <ul className="space-y-1.5 text-[11px] text-amber-800 dark:text-amber-300 list-disc list-inside">
                {VIVA_INSTRUCTIONS.map((inst, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {inst}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* ── TAB 2: REMEDIAL EXAMINATIONS ── */}
        {activeTab === "remedial" && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {/* Filter pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: "all", label: "All Remedial Papers" },
                { id: "3", label: "Sem 3 (CSE & IT)" },
                { id: "CSE", label: "Sem 5 (CSE)" },
                { id: "AI & DS", label: "Sem 5 (AI & DS)" },
                { id: "CSN", label: "Sem 5 (CSN)" },
              ].map((pill) => (
                <button
                  key={pill.id}
                  onClick={() => setSelectedBranch(pill.id)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedBranch === pill.id
                      ? "bg-zinc-900 text-white border-zinc-800 text-zinc-100 font-bold shadow-sm font-black"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>

            {/* Master Question Banks Quick Access Banner */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-zinc-900 via-stone-900 to-zinc-950 text-white flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-md border border-zinc-700/60">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="px-2 py-0.5 rounded bg-white text-zinc-950 font-black shadow-xs text-[10px] font-black uppercase font-mono">
                    University Master Banks
                  </span>
                  <span className="text-xs font-mono font-bold text-zinc-100 font-bold">
                    190 Solved Questions · All 5 Subjects
                  </span>
                </div>
                <h4 className="font-bold text-xs sm:text-sm text-white font-display">
                  Full 38-Question Model Solutions with Step-by-Step Code & Single Studio AI Voice
                </h4>
                <div className="flex items-center gap-1.5 flex-wrap pt-0.5 text-[11px]">
                  {[
                    { label: "OOPJ (Oct 26)", path: "/imp-questions/oopj" },
                    { label: "DSA", path: "/imp-questions/dsa" },
                    { label: "CA", path: "/imp-questions/ca" },
                    { label: "DBMS", path: "/imp-questions/dbms" },
                    { label: "CONMP", path: "/imp-questions/conmp" },
                  ].map((btn) => (
                    <button
                      key={btn.path}
                      type="button"
                      onClick={() => {
                        onClose();
                        navigate(btn.path);
                      }}
                      className="px-2 py-0.5 rounded-lg bg-white/10 hover:bg-[#FAFAFA] hover:text-[#18181B] text-white/90 font-bold transition-all text-[10px] cursor-pointer"
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  navigate("/imp-questions");
                }}
                className="h-8 px-3 rounded-xl bg-[#FAFAFA] hover:bg-zinc-100 text-[#18181B] font-bold text-xs flex items-center gap-1.5 transition-all shrink-0 cursor-pointer shadow-xs self-start md:self-auto font-display"
              >
                <BookOpen className="h-3.5 w-3.5" />
                <span>All Question Banks</span>
              </button>
            </div>

            {/* Remedial Papers Table */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
              <div className="p-3.5 bg-secondary/30 border-b border-border flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-xs sm:text-sm text-foreground">
                    B.Tech Remedial Examination Timetable (Odd Semester 2026-2027)
                  </h3>
                  <p className="text-[11px] text-muted-foreground">
                    Duration: 90 Minutes (10:10 AM to 11:40 AM) · ITM SLS Baroda University
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-500 font-mono text-xs font-bold border border-amber-500/20">
                  90 Mins
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="text-[10px] font-bold text-muted-foreground uppercase border-b border-border bg-secondary/10">
                    <tr>
                      <th className="p-3">Date & Day</th>
                      <th className="p-3">Semester & Branch</th>
                      <th className="p-3">Course Code</th>
                      <th className="p-3">Course Name</th>
                      <th className="p-3 text-right">Time Slot</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {filteredRemedial.map((exam) => (
                      <tr key={exam.id} className="hover:bg-secondary/20 transition-colors">
                        <td className="p-3 font-semibold text-foreground">
                          <span className="font-mono">{exam.date}</span>
                          <span className="block text-[10px] text-muted-foreground">
                            {exam.dayOfWeek}
                          </span>
                        </td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-secondary border border-border text-foreground">
                            Sem {exam.semester} · {exam.branch}
                          </span>
                        </td>
                        <td className="p-3 font-mono text-[11px] font-bold text-amber-500 dark:text-amber-500">
                          {exam.courseCode}
                        </td>
                        <td className="p-3 font-medium text-foreground">
                          <div className="flex items-center justify-between gap-2">
                            <span>{exam.courseName}</span>
                            {(() => {
                              const bankRoute = getSubjectBankRoute(exam.courseCode || exam.courseName);
                              if (bankRoute) {
                                return (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      onClose();
                                      navigate(bankRoute);
                                    }}
                                    className="px-2 py-0.5 rounded-md bg-zinc-900 text-white border-zinc-800 text-zinc-100 font-bold hover:bg-[#27272A] text-[10px] font-black shrink-0 font-display transition-all cursor-pointer shadow-2xs"
                                    title="Open 38 Master Solved Questions"
                                  >
                                    38 Solved Qs &gt;
                                  </button>
                                );
                              }
                              return null;
                            })()}
                          </div>
                        </td>
                        <td className="p-3 text-right font-mono font-bold text-muted-foreground">
                          {exam.timeSlot}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 3: FACULTY DIRECTORY ── */}
        {activeTab === "faculty" && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            <div className="p-3 rounded-xl bg-secondary/40 border border-border flex items-center justify-between text-xs">
              <span className="font-medium text-foreground">
                School of CSET Faculty Members & Viva In-Charges
              </span>
              <span className="text-muted-foreground">
                {filteredFaculty.length} Faculties listed
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredFaculty.map((f) => (
                <div
                  key={f.id}
                  className="p-4 rounded-2xl border border-border bg-card hover:border-primary/40 transition-all space-y-2.5 shadow-xs"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-zinc-900 text-white border-zinc-800 text-zinc-100 font-bold flex items-center justify-center font-bold text-xs shrink-0">
                        {f.name.split(" ").map((n) => n[0]).slice(1, 3).join("")}
                      </div>
                      <div>
                        <h4 className="font-bold text-xs sm:text-sm text-foreground">{f.name}</h4>
                        <p className="text-[10px] text-muted-foreground font-medium">{f.title}</p>
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] text-foreground/90 font-medium">{f.role}</p>

                  <div className="space-y-1 pt-1 border-t border-border/60 text-[10px]">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <BookOpen className="h-3 w-3 text-primary shrink-0" />
                      <span>{f.subjects.join(", ")}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <MapPin className="h-3 w-3 text-amber-500 shrink-0" />
                      <span>Venues: {f.vivaRooms.join(", ")}</span>
                    </div>
                    {f.officeLocation && (
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Building2 className="h-3 w-3 text-amber-500 shrink-0" />
                        <span>{f.officeLocation}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB 4: MST REGULAR ARCHIVE ── */}
        {activeTab === "mst" && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            <div className="p-3 rounded-xl bg-secondary/30 border border-border text-xs text-muted-foreground">
              Archived Mid-Semester Examination (CET / MST) schedules for BCA, MCA, and B.Tech.
            </div>

            <div className="space-y-4">
              {TIMETABLE_DATA.filter((b) => b.type === "mst" || !b.type).map((batch) => (
                <div key={batch.id} className="border border-border rounded-2xl p-4 bg-card shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-xs sm:text-sm text-foreground">{batch.name}</h4>
                    <span className="text-[10px] text-muted-foreground">{batch.exams.length} papers</span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="text-[10px] font-bold text-muted-foreground uppercase border-b border-border">
                        <tr>
                          <th className="pb-2">Date</th>
                          <th className="pb-2">Code</th>
                          <th className="pb-2">Subject</th>
                          <th className="pb-2 text-right">Time</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/60">
                        {batch.exams.map((ex, i) => (
                          <tr key={i} className="hover:bg-secondary/20">
                            <td className="py-2 font-mono font-medium">{ex.date}</td>
                            <td className="py-2 font-mono font-bold text-amber-500">{ex.courseCode}</td>
                            <td className="py-2 text-foreground">
                              <div className="flex items-center justify-between gap-2">
                                <span>{ex.courseName}</span>
                                {(() => {
                                  const bankRoute = getSubjectBankRoute(ex.courseCode || ex.courseName);
                                  if (bankRoute) {
                                    return (
                                      <button
                                        type="button"
                                        onClick={() => {
                                          onClose();
                                          navigate(bankRoute);
                                        }}
                                        className="px-2 py-0.5 rounded-md bg-zinc-900 text-white border-zinc-800 text-zinc-100 font-bold hover:bg-[#27272A] text-[10px] font-black shrink-0 font-display transition-all cursor-pointer shadow-2xs"
                                        title="Open 38 Master Solved Questions"
                                      >
                                        Solved &gt;
                                      </button>
                                    );
                                  }
                                  return null;
                                })()}
                              </div>
                            </td>
                            <td className="py-2 text-right font-mono text-muted-foreground">{ex.time}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── MODAL FOOTER ── */}
        <div className="p-3 sm:p-4 border-t border-border bg-secondary/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shrink-0 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-primary shrink-0" />
            <span>ITM (SLS) Baroda University · Academic Year 2026-2027</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-foreground text-background font-bold text-xs hover:opacity-90 transition-all self-end sm:self-auto cursor-pointer"
          >
            Close Schedule
          </button>
        </div>
      </div>
    </div>
  );
}
