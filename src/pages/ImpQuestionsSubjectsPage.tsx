import { useState } from "react";
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
  Eye
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

// Question Bank Activity Chart Data matching Screenshot 3
const QUESTION_BANK_TREND_DATA = [
  { date: "Oct 00", inquiries: 18 },
  { date: "Oct 08", inquiries: 32 },
  { date: "Oct 16", inquiries: 48 },
  { date: "Oct 24", inquiries: 38 },
  { date: "Oct 30", inquiries: 72 },
  { date: "Nov 10", inquiries: 85 },
];

export default function ImpQuestionsSubjectsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"all" | "exam" | "subject">("all");
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    "ca-q1": true,
  });

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto space-y-8 animate-fade-in">
      {/* ── TOP HEADER SECTION matching Screenshot 3 ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-border/60">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-foreground">
            Important Exam Questions
          </h1>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5 font-medium">
            <span>Academic resources</span>
            <span>·</span>
            <span>Question Banks</span>
            <span>·</span>
            <span>ITM MOOCs</span>
            <span>·</span>
            <span className="text-foreground font-semibold">Sem 3</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Mode Filter Tabs matching Screenshot 3 */}
          <div className="flex rounded-xl bg-secondary p-1 border border-border text-xs font-semibold">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-3 py-1 rounded-lg transition-all ${
                activeTab === "all" ? "bg-background text-foreground shadow-xs font-bold" : "text-muted-foreground"
              }`}
            >
              All Courses
            </button>
            <button
              onClick={() => setActiveTab("exam")}
              className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1 ${
                activeTab === "exam" ? "bg-background text-foreground shadow-xs font-bold" : "text-muted-foreground"
              }`}
            >
              <Flame className="h-3.5 w-3.5 text-amber-500" />
              <span>Exam Banks</span>
            </button>
            <button
              onClick={() => setActiveTab("subject")}
              className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1 ${
                activeTab === "subject" ? "bg-background text-foreground shadow-xs font-bold" : "text-muted-foreground"
              }`}
            >
              <Folder className="h-3.5 w-3.5" />
              <span>Subject Wise</span>
            </button>
          </div>

          <button
            onClick={() => {
              navigate("/quiz");
              toast.info("Navigating to Active Recall Quiz");
            }}
            className="h-9 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/20 flex items-center gap-1.5 transition-all active:scale-95 shrink-0"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Practice Quiz</span>
          </button>
        </div>
      </div>

      {/* ── TOP 3 SUBJECT CARDS GRID matching Screenshot 3 ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Computer Architecture ✨ */}
        <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-4 hover:border-primary/50 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                <Cpu className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-foreground flex items-center gap-1.5">
                  <span>Computer Architecture</span>
                  <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                </h3>
                <span className="text-[10px] text-muted-foreground font-mono">CS401 · 46 Solved Questions</span>
              </div>
            </div>

            <Link 
              to="/imp-questions/ca-101" 
              className="text-xs text-primary font-semibold hover:underline"
            >
              View All &gt;
            </Link>
          </div>

          {/* Checklist Items matching Screenshot 3 */}
          <div className="space-y-2 pt-1 text-xs">
            <div 
              onClick={() => toggleCheck("ca-q1")}
              className="p-2.5 rounded-xl border border-border/80 bg-secondary/20 hover:bg-secondary/40 cursor-pointer flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  checked={checkedItems["ca-q1"] || false} 
                  onChange={() => toggleCheck("ca-q1")}
                  className="rounded text-primary focus:ring-0" 
                />
                <span className="font-medium text-foreground">Current Exam Questions (Units 1–6)</span>
              </div>
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
            </div>

            <div 
              onClick={() => navigate("/imp-questions/ca-101")}
              className="p-2.5 rounded-xl border border-border/80 bg-secondary/20 hover:bg-secondary/40 cursor-pointer flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded border border-border inline-block" />
                <span className="font-medium text-foreground">L1 Computer Architecture (3016)</span>
              </div>
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
            </div>

            <div 
              onClick={() => navigate("/imp-questions/ca-101")}
              className="p-2.5 rounded-xl border border-border/80 bg-secondary/20 hover:bg-secondary/40 cursor-pointer flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded border border-border inline-block" />
                <span className="font-medium text-foreground">Certain Exam Management (Net 2026)</span>
              </div>
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
          </div>
        </div>

        {/* Card 2: Data Structures ✨ */}
        <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-4 hover:border-primary/50 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <Database className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-foreground flex items-center gap-1.5">
                  <span>Data Structures</span>
                  <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                </h3>
                <span className="text-[10px] text-muted-foreground font-mono">DSA301 · Complexity & Code</span>
              </div>
            </div>

            <Link 
              to="/imp-questions/sem3-dsa" 
              className="text-xs text-primary font-semibold hover:underline"
            >
              View All &gt;
            </Link>
          </div>

          {/* Table Metrics matching Screenshot 3 */}
          <div className="rounded-xl border border-border/80 bg-secondary/20 p-2.5 text-xs">
            <div className="grid grid-cols-5 text-[10px] font-bold text-muted-foreground uppercase pb-1.5 border-b border-border/60">
              <span>Date</span>
              <span>Action</span>
              <span>Stock</span>
              <span>Link</span>
              <span className="text-right">49</span>
            </div>
            <div className="grid grid-cols-5 py-2 items-center text-[11px] font-medium border-b border-border/40">
              <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-600 font-bold font-mono text-[10px] inline-block w-fit">~90</span>
              <span>0</span>
              <span className="font-mono">13</span>
              <Eye className="h-3.5 w-3.5 text-muted-foreground" />
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground ml-auto" />
            </div>
            <div className="grid grid-cols-5 py-2 items-center text-[11px] font-medium">
              <span className="px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-600 font-bold font-mono text-[10px] inline-block w-fit">6</span>
              <span>0</span>
              <span className="font-mono">13</span>
              <span className="text-muted-foreground">-</span>
              <Eye className="h-3.5 w-3.5 text-muted-foreground ml-auto" />
            </div>
          </div>
        </div>

        {/* Card 3: Database Management Systems ✨ */}
        <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-4 hover:border-primary/50 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-400">
                <Server className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-foreground flex items-center gap-1.5">
                  <span>Database Management</span>
                  <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                </h3>
                <span className="text-[10px] text-muted-foreground font-mono">DBMS302 · SQL & Normalization</span>
              </div>
            </div>

            <Link 
              to="/imp-questions/sem3-dbms" 
              className="text-xs text-primary font-semibold hover:underline"
            >
              View All &gt;
            </Link>
          </div>

          {/* Table Metrics matching Screenshot 3 */}
          <div className="rounded-xl border border-border/80 bg-secondary/20 p-2.5 text-xs">
            <div className="grid grid-cols-5 text-[10px] font-bold text-muted-foreground uppercase pb-1.5 border-b border-border/60">
              <span>Owner</span>
              <span>Section</span>
              <span>Stock</span>
              <span>Link</span>
              <span className="text-right">46</span>
            </div>
            <div className="grid grid-cols-5 py-2 items-center text-[11px] font-medium border-b border-border/40">
              <span className="px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-600 font-bold font-mono text-[10px] inline-block w-fit">-10.6</span>
              <span>0</span>
              <span className="text-muted-foreground">-</span>
              <span className="text-[10px] font-mono text-muted-foreground">126 KB</span>
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground ml-auto" />
            </div>
            <div className="grid grid-cols-5 py-2 items-center text-[11px] font-medium">
              <span className="px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-600 font-bold font-mono text-[10px] inline-block w-fit">10</span>
              <span>0</span>
              <span className="text-muted-foreground">-</span>
              <span className="text-[10px] font-mono text-muted-foreground">126 KB</span>
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground ml-auto" />
            </div>
          </div>
        </div>
      </div>

      {/* ── LOWER SECTION: EXAMINATION MATERIALS TREE + DBMS CHART + 5x2 RESOURCE MATRIX matching Screenshot 3 ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Column 1: Examination Materials Directory Tree */}
        <div className="lg:col-span-3 bg-card border border-border rounded-2xl p-5 shadow-sm space-y-4">
          <h3 className="font-bold text-sm text-foreground">Examination Materials</h3>

          <div className="space-y-1.5 text-xs font-semibold">
            <button className="w-full p-2.5 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-between text-left shadow-md shadow-blue-600/20">
              <span className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <span>Student Materials</span>
              </span>
              <ChevronRight className="h-3.5 w-3.5 opacity-70" />
            </button>

            <button 
              onClick={() => toast.info("Opening Attendance study materials...")}
              className="w-full p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/60 flex items-center justify-between text-left transition-colors"
            >
              <span className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>Attendance Materials</span>
              </span>
              <ChevronRight className="h-3.5 w-3.5 opacity-50" />
            </button>

            <button 
              onClick={() => navigate("/calculator")}
              className="w-full p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/60 flex items-center justify-between text-left transition-colors"
            >
              <span className="flex items-center gap-2">
                <Folder className="h-4 w-4" />
                <span>Attendance Tracker</span>
              </span>
              <ChevronRight className="h-3.5 w-3.5 opacity-50" />
            </button>

            <button 
              onClick={() => navigate("/community")}
              className="w-full p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/60 flex items-center justify-between text-left transition-colors"
            >
              <span className="flex items-center gap-2">
                <Folder className="h-4 w-4" />
                <span>Community Topics</span>
              </span>
              <ChevronRight className="h-3.5 w-3.5 opacity-50" />
            </button>
          </div>
        </div>

        {/* Column 2: Database Management Systems Line Chart */}
        <div className="lg:col-span-5 bg-card border border-border rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-bold text-sm text-foreground">Database Management Systems</h3>
              <span className="text-xs text-primary font-semibold hover:underline cursor-pointer">
                View All &gt;
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground">
              Year Date Inquiries & Exam Question Analysis
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
            <span className="text-muted-foreground">Question Bank Inquiries: 0 %</span>
            <span className="text-primary hover:underline font-semibold flex items-center gap-1 cursor-pointer">
              <span>Core Overviews</span>
              <ExternalLink className="h-3 w-3" />
            </span>
          </div>
        </div>

        {/* Column 3: Downloadable Resources (5x2 Metric Grid) */}
        <div className="lg:col-span-4 bg-card border border-border rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-sm text-foreground mb-1">Downloadable Resources</h3>
            <p className="text-[11px] text-muted-foreground mb-3">
              Comprehensive offline pack for Semester 3.
            </p>

            {/* 10 Critical Data Metrics Matrix matching Screenshot 3 */}
            <div className="grid grid-cols-5 gap-2 text-center p-3 rounded-xl bg-secondary/30 border border-border/60 mb-4">
              <div>
                <span className="text-base font-black font-mono text-foreground block">32</span>
                <span className="text-[10px] text-muted-foreground uppercase font-semibold">Notes</span>
              </div>
              <div>
                <span className="text-base font-black font-mono text-brand-forest dark:text-emerald-400 block">67</span>
                <span className="text-[10px] text-muted-foreground uppercase font-semibold">MCQs</span>
              </div>
              <div>
                <span className="text-base font-black font-mono text-foreground block">31</span>
                <span className="text-[10px] text-muted-foreground uppercase font-semibold">Prac</span>
              </div>
              <div>
                <span className="text-base font-black font-mono text-brand-forest dark:text-emerald-400 block">515</span>
                <span className="text-[10px] text-muted-foreground uppercase font-semibold">Quest</span>
              </div>
              <div>
                <span className="text-base font-black font-mono text-emerald-600 dark:text-brand-chartreuse block">50%</span>
                <span className="text-[10px] text-muted-foreground uppercase font-semibold">Solved</span>
              </div>

              {/* Row 2 */}
              <div className="pt-2 border-t border-border/60">
                <span className="text-xs font-bold font-mono text-foreground block">24</span>
                <span className="text-[9px] text-muted-foreground">Files</span>
              </div>
              <div className="pt-2 border-t border-border/60">
                <span className="text-xs font-bold font-mono text-foreground block">4</span>
                <span className="text-[9px] text-muted-foreground">Units</span>
              </div>
              <div className="pt-2 border-t border-border/60">
                <span className="text-xs font-bold font-mono text-foreground block">5</span>
                <span className="text-[9px] text-muted-foreground">Themes</span>
              </div>
              <div className="pt-2 border-t border-border/60">
                <span className="text-xs font-bold font-mono text-foreground block">27</span>
                <span className="text-[9px] text-muted-foreground">Images</span>
              </div>
              <div className="pt-2 border-t border-border/60">
                <span className="text-xs font-bold font-mono text-foreground block">1.2k</span>
                <span className="text-[9px] text-muted-foreground">Views</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              toast.success("Preparing full 515-question solved revision pack...");
            }}
            className="w-full h-10 rounded-xl bg-brand-forest hover:bg-brand-deep text-white font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md shadow-brand-forest/20"
          >
            <FolderDown className="h-4 w-4 text-brand-chartreuse" />
            <span>Get Revision Now</span>
          </button>
        </div>
      </div>
    </div>
  );
}
