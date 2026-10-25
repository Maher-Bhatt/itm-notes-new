import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  BookOpen, 
  ChevronRight, 
  HelpCircle, 
  Sparkles, 
  Cpu, 
  Database, 
  Server, 
  Coffee, 
  Terminal, 
  Code2,
  CheckCircle,
  FileText,
  Folder,
  Download,
  FolderDown,
  FileCheck,
  ExternalLink,
  Flame,
  Search,
  Plus,
  Eye,
  Layers,
  Volume2,
  Mic,
  Calendar,
  Calculator,
  Check
} from "lucide-react";
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip 
} from "recharts";
import { toast } from "sonner";
import { openTimetable } from "@/components/GlobalTimetableModal";

// Question Bank Activity Chart Data
const QUESTION_BANK_TREND_DATA = [
  { date: "Oct 01", inquiries: 18 },
  { date: "Oct 08", inquiries: 32 },
  { date: "Oct 16", inquiries: 48 },
  { date: "Oct 24", inquiries: 64 },
  { date: "Oct 26", inquiries: 92 },
  { date: "Nov 02", inquiries: 85 },
];

interface SubjectCardConfig {
  id: string;
  code: string;
  name: string;
  shortName: string;
  badge: string;
  badgeColor: string;
  path: string;
  icon: any;
  colorScheme: {
    iconBg: string;
    iconColor: string;
    borderHover: string;
    cardBorder?: string;
  };
  description: string;
  parts: {
    partA: string;
    partB: string;
    partC: string;
  };
  highlights: string[];
}

const MASTER_SUBJECTS: SubjectCardConfig[] = [
  {
    id: "oopj",
    code: "C2311C1",
    name: "Object-Oriented Programming with Java",
    shortName: "Java (OOPJ)",
    badge: "🔥 Remedial Special · Zero-to-Hero Notes + 38 Solved Qs",
    badgeColor: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
    path: "/imp-questions/oopj",
    icon: Coffee,
    colorScheme: {
      iconBg: "bg-[#183F36] text-[#D6E85D]",
      iconColor: "text-[#D6E85D]",
      borderHover: "hover:border-[#183F36] dark:hover:border-[#D6E85D]/60",
      cardBorder: "border-primary/40",
    },
    description: "Zero-to-Hero passing guide: Complete Units 2 & 3 syllabus theory, dynamic method dispatch, constructor chaining, interfaces, 38 solved exam questions with traces & viral sharing.",
    parts: {
      partA: "5 Output Traces (Part A)",
      partB: "15 Programs (Part B)",
      partC: "18 Theory Proofs (Part C)",
    },
    highlights: ["Zero-to-Hero Theory", "Units 2 & 3 Complete", "38 Solved Qs", "WhatsApp Share"],
  },
  {
    id: "dsa",
    code: "C2310C5",
    name: "Data Structures and Algorithms",
    shortName: "Data Structures (DSA)",
    badge: "Core CS · 38 Solved Qs",
    badgeColor: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
    path: "/imp-questions/dsa",
    icon: Database,
    colorScheme: {
      iconBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
      iconColor: "text-emerald-500",
      borderHover: "hover:border-emerald-500/60",
    },
    description: "Circular Queue modulo arithmetic, BST recursion traces, AVL LL/RR/LR/RL rotations, Dijkstra, Prim & Kruskal DSU.",
    parts: {
      partA: "5 Execution Traces (Part A)",
      partB: "15 C Programs (Part B)",
      partC: "18 Comparative Tables (Part C)",
    },
    highlights: ["Circular Modulo", "BST Inorder Sort", "AVL Rotations", "Graph MST"],
  },
  {
    id: "ca",
    code: "C2310C2",
    name: "Computer Architecture & Organization",
    shortName: "Architecture (CA)",
    badge: "Hardware & RTL · 38 Solved Qs",
    badgeColor: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30",
    path: "/imp-questions/ca",
    icon: Cpu,
    colorScheme: {
      iconBg: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
      iconColor: "text-blue-500",
      borderHover: "hover:border-blue-500/60",
    },
    description: "16-bit Common Bus RTL, Booth signed multiplication, 4-stage pipeline hazards, AMAT cache mapping & DMA cycle stealing.",
    parts: {
      partA: "5 RTL Traces (Part A)",
      partB: "15 Hardware Qs (Part B)",
      partC: "18 Theory Matrices (Part C)",
    },
    highlights: ["Common Bus RTL", "Booth Multiplier", "Pipeline Hazards", "AMAT Cache"],
  },
  {
    id: "dbms",
    code: "C2311C4",
    name: "Database Management Systems",
    shortName: "Database (DBMS)",
    badge: "Relational & SQL · 38 Solved Qs",
    badgeColor: "bg-orange-500/15 text-orange-600 dark:text-orange-400 border-orange-500/30",
    path: "/imp-questions/dbms",
    icon: Layers,
    colorScheme: {
      iconBg: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
      iconColor: "text-orange-500",
      borderHover: "hover:border-orange-500/60",
    },
    description: "NULL 3-valued logic, BCNF lossless decomposition, Window functions, ACID WAL recovery, PL/SQL Triggers & B+ Trees.",
    parts: {
      partA: "5 SQL NULL Traces (Part A)",
      partB: "15 Design & Queries (Part B)",
      partC: "18 Comparative Tables (Part C)",
    },
    highlights: ["NULL 3-Valued Logic", "BCNF Decomposition", "ACID & WAL", "PL/SQL Triggers"],
  },
  {
    id: "conmp",
    code: "S2320C1",
    name: "Computer Oriented Numerical Methods with Python",
    shortName: "Numerical Python (CONMP)",
    badge: "Applied Math · 38 Solved Qs",
    badgeColor: "bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30",
    path: "/imp-questions/conmp",
    icon: Calculator,
    colorScheme: {
      iconBg: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
      iconColor: "text-purple-500",
      borderHover: "hover:border-purple-500/60",
    },
    description: "Newton-Raphson quadratic trace, RK4 4th-order ODE, Simpson 1/3rd & 3/8th quadrature, Gauss-Seidel diagonal dominance.",
    parts: {
      partA: "5 Numerical Traces (Part A)",
      partB: "15 Python Programs (Part B)",
      partC: "18 Comparative Tables (Part C)",
    },
    highlights: ["Quadratic Trace", "RK4 Solver", "Simpson Quadrature", "Gauss-Seidel"],
  },
];

export default function ImpQuestionsSubjectsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"all" | "exam" | "subject">("all");
  const [searchFilter, setSearchFilter] = useState("");

  const filteredSubjects = useMemo(() => {
    let list = MASTER_SUBJECTS;
    if (activeTab === "exam") {
      list = list.filter((s) => s.id === "oopj" || s.id === "dsa" || s.id === "ca");
    }
    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase();
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.code.toLowerCase().includes(q) ||
          s.shortName.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q)
      );
    }
    return list;
  }, [activeTab, searchFilter]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto space-y-8 animate-fade-in">
      {/* ── TOP HEADER SECTION ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-border/60">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground font-display flex items-center gap-2">
            <span>Important Exam Questions & Solved Banks</span>
            <Sparkles className="h-5 w-5 text-amber-500" />
          </h1>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5 font-medium flex-wrap">
            <span>Academic Resources</span>
            <span>·</span>
            <span>University Question Banks</span>
            <span>·</span>
            <span>ITM Notes</span>
            <span>·</span>
            <span className="text-foreground font-semibold">Semester 3 (B.Tech CSE)</span>
            <span>·</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">190 Master Solved Qs</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Mode Filter Tabs */}
          <div className="flex rounded-xl bg-secondary p-1 border border-border text-xs font-semibold">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                activeTab === "all" ? "bg-background text-foreground shadow-xs font-bold" : "text-muted-foreground"
              }`}
            >
              All Subjects
            </button>
            <button
              onClick={() => setActiveTab("exam")}
              className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                activeTab === "exam" ? "bg-background text-foreground shadow-xs font-bold" : "text-muted-foreground"
              }`}
            >
              <Flame className="h-3.5 w-3.5 text-amber-500" />
              <span>Remedial Banks</span>
            </button>
            <button
              onClick={() => setActiveTab("subject")}
              className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                activeTab === "subject" ? "bg-background text-foreground shadow-xs font-bold" : "text-muted-foreground"
              }`}
            >
              <Folder className="h-3.5 w-3.5" />
              <span>Core Modules</span>
            </button>
          </div>

          {/* Timetable Trigger */}
          <button
            onClick={() => openTimetable("remedial")}
            className="h-9 px-3.5 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground font-bold text-xs border border-border flex items-center gap-1.5 transition-all active:scale-95 shrink-0 cursor-pointer"
          >
            <Calendar className="h-3.5 w-3.5 text-primary" />
            <span>Timetables</span>
          </button>

          {/* Practice Quiz Trigger */}
          <button
            onClick={() => {
              navigate("/quiz");
              toast.info("Navigating to Active Recall Quiz");
            }}
            className="h-9 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/20 flex items-center gap-1.5 transition-all active:scale-95 shrink-0 cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Practice Quiz</span>
          </button>
        </div>
      </div>

      {/* ── FEATURED HERO: 5-SUBJECT MASTER UNIVERSITY SOLVED BANKS ── */}
      <div className="p-5 sm:p-7 rounded-3xl bg-gradient-to-r from-[#183F36] via-[#1D4A3F] to-[#12332C] text-white shadow-xl border border-[#D6E85D]/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#D6E85D]/20 via-transparent to-transparent pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#D6E85D] text-[#183F36] shadow-xs flex items-center gap-1.5 font-display">
                <Flame className="h-3 w-3 fill-[#183F36]" />
                University Model Solved Banks
              </span>
              <span className="text-xs font-mono font-bold text-[#D6E85D]">
                190 Master Questions · 38 Solved Per Subject
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/10 text-white border border-white/20 flex items-center gap-1">
                <Mic className="h-3 w-3 text-[#D6E85D]" />
                Single Studio AI Voice Narrator
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white font-display tracking-tight">
              Complete Model Solutions for All 5 Semester 3 Subjects
            </h2>
            <p className="text-xs sm:text-sm text-[#A2BAAF] leading-relaxed">
              Every subject includes: <strong>Part A</strong> (5 Predict Output dry runs with line-by-line trace tables), <strong>Part B</strong> (15 5-mark complete code implementations with exact execution outputs & viva traps), <strong>Part C</strong> (18 3-mark comparative theory matrices), and <strong>Part D</strong> (University exam strategy, fatal mistakes & MCQs).
            </p>

            {/* Quick subject jump pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <button
                onClick={() => navigate("/imp-questions/oopj")}
                className="px-3 py-1 rounded-xl bg-white/15 hover:bg-[#D6E85D] hover:text-[#183F36] text-white font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Java (OOPJ)</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/30 text-amber-200">Oct 26</span>
              </button>
              <button
                onClick={() => navigate("/imp-questions/dsa")}
                className="px-3 py-1 rounded-xl bg-white/15 hover:bg-[#D6E85D] hover:text-[#183F36] text-white font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>DSA (C2310C5)</span>
              </button>
              <button
                onClick={() => navigate("/imp-questions/ca")}
                className="px-3 py-1 rounded-xl bg-white/15 hover:bg-[#D6E85D] hover:text-[#183F36] text-white font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Architecture (CA)</span>
              </button>
              <button
                onClick={() => navigate("/imp-questions/dbms")}
                className="px-3 py-1 rounded-xl bg-white/15 hover:bg-[#D6E85D] hover:text-[#183F36] text-white font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>DBMS (C2311C4)</span>
              </button>
              <button
                onClick={() => navigate("/imp-questions/conmp")}
                className="px-3 py-1 rounded-xl bg-white/15 hover:bg-[#D6E85D] hover:text-[#183F36] text-white font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Numerical Python (CONMP)</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3 shrink-0">
            <button
              onClick={() => navigate("/imp-questions/oopj")}
              className="h-11 px-5 rounded-2xl bg-[#D6E85D] hover:bg-[#c8dc4e] text-[#183F36] font-black text-xs shadow-lg shadow-[#D6E85D]/20 flex items-center gap-2 transition-all active:scale-95 cursor-pointer font-display"
            >
              <BookOpen className="h-4 w-4" />
              <span>Open Remedial Bank (OOPJ)</span>
            </button>
            <span className="text-[11px] text-[#A2BAAF] font-medium">
              Next paper: Oct 26, 2026 · 10:10 AM
            </span>
          </div>
        </div>
      </div>

      {/* ── SEARCH & FILTER BAR ── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search subjects, codes, or topics..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full h-10 pl-10 pr-4 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
          />
        </div>

        <div className="text-xs text-muted-foreground self-end sm:self-auto font-medium">
          Showing <span className="font-bold text-foreground">{filteredSubjects.length}</span> of {MASTER_SUBJECTS.length} subjects
        </div>
      </div>

      {/* ── 5 MASTER SUBJECT CARDS GRID ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
        {filteredSubjects.map((sub) => {
          const IconComponent = sub.icon;
          return (
            <div
              key={sub.id}
              className={`bg-card border ${sub.colorScheme.cardBorder || "border-border"} rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-4 ${sub.colorScheme.borderHover} transition-all relative group`}
            >
              <div className="space-y-3.5">
                {/* Header: Icon + Code + Badge */}
                <div className="flex items-start justify-between gap-2">
                  <div className={`p-2.5 rounded-xl ${sub.colorScheme.iconBg}`}>
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold font-mono border ${sub.badgeColor}`}>
                    {sub.code}
                  </span>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors flex items-center justify-between">
                    <span>{sub.shortName}</span>
                    <Sparkles className="h-3 w-3 text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <span className="text-[10px] text-muted-foreground font-mono block mt-0.5">
                    38 Solved Questions · All 6 Units
                  </span>
                  <p className="text-[11px] text-muted-foreground leading-relaxed mt-2 line-clamp-3">
                    {sub.description}
                  </p>
                </div>

                {/* Part Links */}
                <div className="space-y-1.5 pt-1 text-xs">
                  <Link
                    to={`${sub.path}#part-a`}
                    className="p-2 rounded-xl border border-border/70 bg-secondary/20 hover:bg-secondary/60 flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span className="font-medium text-foreground text-[11px]">{sub.parts.partA}</span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold font-mono">
                      Traces
                    </span>
                  </Link>

                  <Link
                    to={`${sub.path}#part-b`}
                    className="p-2 rounded-xl border border-border/70 bg-secondary/20 hover:bg-secondary/60 flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span className="font-medium text-foreground text-[11px]">{sub.parts.partB}</span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-bold font-mono">
                      5 Marks
                    </span>
                  </Link>

                  <Link
                    to={`${sub.path}#part-c`}
                    className="p-2 rounded-xl border border-border/70 bg-secondary/20 hover:bg-secondary/60 flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span className="font-medium text-foreground text-[11px]">{sub.parts.partC}</span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-orange-500/20 text-orange-600 dark:text-orange-400 font-bold font-mono">
                      3 Marks
                    </span>
                  </Link>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2 border-t border-border/60">
                <button
                  onClick={() => navigate(sub.path)}
                  className="w-full h-9 rounded-xl bg-secondary hover:bg-primary hover:text-primary-foreground text-foreground font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-98 cursor-pointer"
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>Open 38 Solved Qs</span>
                  <ChevronRight className="h-3.5 w-3.5 ml-auto opacity-70" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── LOWER SECTION: DIRECTORY + DBMS/EXAM TRENDS + METRIC PACK ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Column 1: Examination Materials Directory Tree */}
        <div className="lg:col-span-3 bg-card border border-border rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-1 border-b border-border/60">
            <h3 className="font-bold text-sm text-foreground">Examination Materials</h3>
            <span className="text-[10px] text-muted-foreground font-mono">Schedules & Notes</span>
          </div>

          <div className="space-y-1.5 text-xs font-semibold">
            <button
              onClick={() => navigate("/materials")}
              className="w-full p-2.5 rounded-xl bg-[#183F36] text-[#D6E85D] font-bold flex items-center justify-between text-left shadow-xs cursor-pointer hover:bg-[#12332C] transition-all"
            >
              <span className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <span>Student Notes & Materials</span>
              </span>
              <ChevronRight className="h-3.5 w-3.5 opacity-70" />
            </button>

            <button 
              onClick={() => openTimetable("remedial")}
              className="w-full p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/60 flex items-center justify-between text-left transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-amber-500" />
                <span>Remedial Timetable (Oct 26)</span>
              </span>
              <ChevronRight className="h-3.5 w-3.5 opacity-50" />
            </button>

            <button 
              onClick={() => openTimetable("viva")}
              className="w-full p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/60 flex items-center justify-between text-left transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <FileCheck className="h-4 w-4 text-emerald-500" />
                <span>Practical Viva Timetable</span>
              </span>
              <ChevronRight className="h-3.5 w-3.5 opacity-50" />
            </button>

            <button 
              onClick={() => openTimetable("mst")}
              className="w-full p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/60 flex items-center justify-between text-left transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-blue-500" />
                <span>MST Mid-Semester Archive</span>
              </span>
              <ChevronRight className="h-3.5 w-3.5 opacity-50" />
            </button>

            <button 
              onClick={() => navigate("/calculator")}
              className="w-full p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/60 flex items-center justify-between text-left transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Calculator className="h-4 w-4 text-purple-500" />
                <span>CGPA / Attendance Tracker</span>
              </span>
              <ChevronRight className="h-3.5 w-3.5 opacity-50" />
            </button>
          </div>
        </div>

        {/* Column 2: Database Management & Student Inquiries Line Chart */}
        <div className="lg:col-span-5 bg-card border border-border rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-bold text-sm text-foreground">Solved Question Inquiries & Trends</h3>
              <span 
                onClick={() => navigate("/imp-questions/oopj")}
                className="text-xs text-primary font-semibold hover:underline cursor-pointer"
              >
                View OOPJ &gt;
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground">
              Peak remedial exam revision activity across Semester 3 subjects
            </p>

            <div className="h-44 w-full pt-3">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={QUESTION_BANK_TREND_DATA}>
                  <XAxis dataKey="date" stroke="#94A3B8" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis hide domain={[0, 100]} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      borderColor: "hsl(var(--border))",
                      borderRadius: "0.5rem",
                      fontSize: "11px",
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="inquiries" 
                    stroke="#183F36" 
                    strokeWidth={2.5} 
                    dot={{ fill: "#183F36", r: 4 }} 
                    activeDot={{ r: 6, fill: "#D6E85D" }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="pt-3 border-t border-border/60 flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Solved Bank Coverage: 100 % (190 Questions)</span>
            <span 
              onClick={() => navigate("/materials")}
              className="text-primary hover:underline font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>Notes Overviews</span>
              <ExternalLink className="h-3 w-3" />
            </span>
          </div>
        </div>

        {/* Column 3: Downloadable Resources & Studio Voice Hero Card */}
        <div className="lg:col-span-4 bg-card border border-border rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-bold text-sm text-foreground">University Solved Pack</h3>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-[10px] font-mono">
                Sem 3 Verified
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground mb-3">
              5 subjects · 190 questions · 75 code implementations
            </p>

            {/* 10 Critical Data Metrics Matrix */}
            <div className="grid grid-cols-5 gap-2 text-center p-3 rounded-xl bg-secondary/30 border border-border/60 mb-4">
              <div>
                <span className="text-base font-black font-mono text-foreground block">190</span>
                <span className="text-[10px] text-muted-foreground uppercase font-semibold">Total Qs</span>
              </div>
              <div>
                <span className="text-base font-black font-mono text-[#183F36] dark:text-[#D6E85D] block">25</span>
                <span className="text-[10px] text-muted-foreground uppercase font-semibold">Traces</span>
              </div>
              <div>
                <span className="text-base font-black font-mono text-foreground block">75</span>
                <span className="text-[10px] text-muted-foreground uppercase font-semibold">5-Mark</span>
              </div>
              <div>
                <span className="text-base font-black font-mono text-[#183F36] dark:text-[#D6E85D] block">90</span>
                <span className="text-[10px] text-muted-foreground uppercase font-semibold">Theory</span>
              </div>
              <div>
                <span className="text-base font-black font-mono text-emerald-600 dark:text-emerald-400 block">100%</span>
                <span className="text-[10px] text-muted-foreground uppercase font-semibold">Solved</span>
              </div>

              {/* Row 2 */}
              <div className="pt-2 border-t border-border/60">
                <span className="text-xs font-bold font-mono text-foreground block">5</span>
                <span className="text-[9px] text-muted-foreground">Subjects</span>
              </div>
              <div className="pt-2 border-t border-border/60">
                <span className="text-xs font-bold font-mono text-foreground block">30</span>
                <span className="text-[9px] text-muted-foreground">Units</span>
              </div>
              <div className="pt-2 border-t border-border/60">
                <span className="text-xs font-bold font-mono text-foreground block">50</span>
                <span className="text-[9px] text-muted-foreground">MCQs</span>
              </div>
              <div className="pt-2 border-t border-border/60">
                <span className="text-xs font-bold font-mono text-foreground block">5</span>
                <span className="text-[9px] text-muted-foreground">Blueprints</span>
              </div>
              <div className="pt-2 border-t border-border/60">
                <span className="text-xs font-bold font-mono text-foreground block">1</span>
                <span className="text-[9px] text-muted-foreground">AI Voice</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              toast.success("All 5 Question Banks are fully loaded and ready online!", {
                description: "Click any subject card to study model answers with code and AI narration.",
              });
            }}
            className="w-full h-10 rounded-xl bg-[#183F36] hover:bg-[#12332C] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md shadow-[#183F36]/20 cursor-pointer font-display"
          >
            <FolderDown className="h-4 w-4 text-[#D6E85D]" />
            <span>Revision Ready · 190 Master Qs</span>
          </button>
        </div>
      </div>
    </div>
  );
}
