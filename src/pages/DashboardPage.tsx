import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useGamification } from "@/hooks/useGamification";
import { useAcademic } from "@/contexts/AcademicContext";
import { subjects } from "@/data/subjects";
import { 
  Sparkles, 
  BookOpen, 
  Calendar, 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  ExternalLink, 
  FileText, 
  Search, 
  Plus, 
  ChevronRight, 
  TrendingUp, 
  ChevronLeft,
  Award,
  Layers,
  Flame,
  CheckCircle2,
  Users
} from "lucide-react";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip 
} from "recharts";
import { toast } from "sonner";

// Chart Activity Data matching Screenshot 1 spline curve
const STUDY_ACTIVITY_DATA = [
  { time: "0h", hours: 12 },
  { time: "02", hours: 28 },
  { time: "06", hours: 45 },
  { time: "12:00", hours: 82 },
  { time: "Jun 20", hours: 64 },
  { time: "24:00", hours: 96 },
];

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const { semesterNumber } = useAcademic();
  const { state: game, levelInfo } = useGamification();

  const [activeShortcutTab, setActiveShortcutTab] = useState<"overview" | "tools">("overview");
  const [selectedCourseFilter, setSelectedCourseFilter] = useState("all");

  const completedModulesCount = 4;
  const totalModulesCount = 8;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6 animate-fade-in">
      {/* ── TOP HEADER SECTION matching Screenshot 1 ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-border/60">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-foreground">
            ITM Notes Student Dashboard
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5 font-medium">
            Pages / Default Tree · Student Dashboard · Real TM Record (Sem {profile?.semester || semesterNumber || 3})
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search for topics..."
              onClick={() => {
                const event = new KeyboardEvent('keydown', { key: 'k', ctrlKey: true });
                window.dispatchEvent(event);
              }}
              readOnly
              className="h-9 pl-8 pr-3 w-44 sm:w-56 rounded-xl border border-input bg-card text-xs focus:outline-none cursor-pointer"
            />
          </div>

          <button
            onClick={() => {
              navigate("/materials");
              toast.info("Navigating to Academic Materials repository");
            }}
            className="h-9 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/20 flex items-center gap-2 transition-all active:scale-95 shrink-0"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add Sheet</span>
          </button>
        </div>
      </div>

      {/* ── 2-COLUMN MAIN GRID ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ── LEFT / MAIN CONTENT (~68% width -> lg:col-span-8) ── */}
        <div className="lg:col-span-8 space-y-6">
          {/* 1. Hero Academic Overview Card matching Screenshot 1 */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-900 text-white p-6 sm:p-8 shadow-xl border border-slate-800">
            <div className="relative z-10 max-w-xl space-y-3">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 inline-block">
                Semester 3 Active Term
              </span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                Academic Overview
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Tune into your study on blast with the fastest access to any syllabus topic, 
                high-yield question bank, or practical reference across BCA & MCA.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => navigate("/materials")}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                >
                  <span>See Section Now</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* 3D Visual Art Illustration (Simulated via SVG Graphic) */}
            <div className="absolute right-4 -bottom-6 sm:bottom-0 opacity-80 sm:opacity-100 pointer-events-none hidden sm:block">
              <svg width="220" height="180" viewBox="0 0 220 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="30" y="20" width="130" height="150" rx="16" fill="#1E293B" stroke="#6366F1" strokeWidth="2" />
                <rect x="45" y="40" width="100" height="12" rx="6" fill="#475569" />
                <rect x="45" y="60" width="70" height="10" rx="5" fill="#6366F1" fillOpacity="0.6" />
                <rect x="45" y="80" width="90" height="10" rx="5" fill="#475569" fillOpacity="0.8" />
                <rect x="45" y="100" width="80" height="10" rx="5" fill="#475569" fillOpacity="0.8" />
                <circle cx="160" cy="50" r="28" fill="#F59E0B" />
                <path d="M152 50L158 56L170 44" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="135" y="105" width="55" height="14" rx="4" transform="rotate(-35 135 105)" fill="#38BDF8" />
                <polygon points="120,125 125,115 132,122" fill="#F43F5E" />
              </svg>
            </div>
          </div>

          {/* 2. Academic Overview Secondary Card */}
          <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-bold text-base text-foreground">Academic Overview</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  See how you currently benchmark across modules, verified exam papers, and practical labs.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs border border-emerald-500/20 flex items-center gap-1.5">
                  <CheckCircle className="h-3.5 w-3.5" />
                  <span>Complete {completedModulesCount}/{totalModulesCount} modules</span>
                </span>

                <select 
                  value={selectedCourseFilter}
                  onChange={(e) => setSelectedCourseFilter(e.target.value)}
                  className="h-8 px-2.5 rounded-lg border border-input bg-background text-xs font-semibold text-foreground outline-none cursor-pointer"
                >
                  <option value="all">All Courses</option>
                  <option value="dsa">DSA</option>
                  <option value="dbms">DBMS</option>
                  <option value="ca">Computer Arch</option>
                  <option value="java">Java</option>
                </select>

                <button 
                  onClick={() => navigate("/materials")}
                  className="text-xs text-primary hover:underline font-semibold flex items-center gap-1"
                >
                  <span>See all</span>
                  <ExternalLink className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>

          {/* 3. Dual Split Row: Shortcuts & Study Progress Activity Curve */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Card: Shortcuts matching Screenshot 1 */}
            <div className="bg-card border border-border rounded-2xl p-5 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-sm text-foreground">Shortcuts</h3>
                  <div className="flex rounded-lg bg-secondary p-0.5 border border-border text-[11px] font-semibold">
                    <button
                      onClick={() => setActiveShortcutTab("overview")}
                      className={`px-2.5 py-1 rounded-md transition-all ${
                        activeShortcutTab === "overview" ? "bg-background text-foreground shadow-xs font-bold" : "text-muted-foreground"
                      }`}
                    >
                      Overview
                    </button>
                    <button
                      onClick={() => setActiveShortcutTab("tools")}
                      className={`px-2.5 py-1 rounded-md transition-all ${
                        activeShortcutTab === "tools" ? "bg-background text-foreground shadow-xs font-bold" : "text-muted-foreground"
                      }`}
                    >
                      Tools & Docs
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  {/* Shortcut 1 */}
                  <div 
                    onClick={() => navigate("/imp-questions")}
                    className="p-3 rounded-xl border border-border/80 bg-secondary/20 hover:bg-secondary/50 cursor-pointer transition-all flex items-start gap-3"
                  >
                    <div className="p-2 rounded-lg bg-orange-500/10 text-orange-500 shrink-0 mt-0.5">
                      <FileText className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-bold text-xs text-foreground truncate">
                        Alternative Tree Tracker Maps Notes...
                      </h4>
                      <p className="text-[11px] text-muted-foreground truncate">
                        Current ITM 2026 - 4 submissions · 18 files updated
                      </p>
                    </div>
                  </div>

                  {/* Shortcut 2 */}
                  <div 
                    onClick={() => navigate("/materials")}
                    className="p-3 rounded-xl border border-border/80 bg-secondary/20 hover:bg-secondary/50 cursor-pointer transition-all flex items-start gap-3"
                  >
                    <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-500 shrink-0 mt-0.5">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-xs text-foreground truncate">
                          Internal Continuous Tests & Exams
                        </h4>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-600 font-bold border border-emerald-500/20">
                          ✓ Active
                        </span>
                      </div>
                      <p className="text-[11px] text-muted-foreground truncate">
                        October 26, 2026 – Due Nov 11, 2026
                      </p>
                    </div>
                  </div>

                  {/* Shortcut 3 */}
                  <div 
                    onClick={() => navigate("/calculator")}
                    className="p-3 rounded-xl border border-border/80 bg-secondary/20 hover:bg-secondary/50 cursor-pointer transition-all flex items-start gap-3"
                  >
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 shrink-0 mt-0.5">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-bold text-xs text-foreground truncate">
                        Curriculum Tree Regulations & Attendance
                      </h4>
                      <p className="text-[11px] text-muted-foreground truncate">
                        SLS Baroda University 75% Criteria Calculator
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-border/60 mt-3 flex items-center justify-between text-xs text-muted-foreground">
                <span>3 Shortcuts configured</span>
                <button onClick={() => navigate("/materials")} className="text-primary hover:underline font-semibold text-[11px]">
                  Manage shortcuts
                </button>
              </div>
            </div>

            {/* Right Card: Study Progress with Spline Area Chart matching Screenshot 1 */}
            <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-foreground">Study Progress</h3>
                  <span className="text-[11px] text-muted-foreground">Level 5 Academic</span>
                </div>
                <div className="text-right">
                  <span className="text-lg font-black font-mono text-primary">209.4 XP</span>
                  <span className="text-[10px] text-muted-foreground block">Overall Rating</span>
                </div>
              </div>

              {/* Progress Bars */}
              <div className="space-y-2 text-xs">
                <div>
                  <div className="flex justify-between text-[11px] mb-1 font-semibold text-muted-foreground">
                    <span>Total CPI Target</span>
                    <span className="text-foreground font-mono">38 / 50%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: "76%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] mb-1 font-semibold text-muted-foreground">
                    <span>Attendance Tracking</span>
                    <span className="text-foreground font-mono">38 / 50%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                    <div className="h-full bg-sky-500 rounded-full" style={{ width: "76%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] mb-1 font-semibold text-muted-foreground">
                    <span>Interaction Practical Progress</span>
                    <span className="text-foreground font-mono">48 / 50%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: "96%" }} />
                  </div>
                </div>
              </div>

              {/* Spline Area Chart matching Screenshot 1 */}
              <div className="h-28 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={STUDY_ACTIVITY_DATA}>
                    <defs>
                      <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366F1" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#6366F1" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="time" stroke="#94A3B8" fontSize={9} tickLine={false} axisLine={false} />
                    <YAxis hide domain={[0, 100]} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--card))", 
                        borderColor: "hsl(var(--border))",
                        borderRadius: "0.5rem",
                        fontSize: "11px",
                      }} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="hours" 
                      stroke="#6366F1" 
                      strokeWidth={2.5}
                      fillOpacity={1} 
                      fill="url(#purpleGradient)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN (~32% width -> lg:col-span-4) ── */}
        <div className="lg:col-span-4 space-y-6">
          {/* 1. Study Progress Advice Widget matching Screenshot 1 */}
          <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-foreground">Study Progress</h3>
              <div className="flex items-center gap-1 text-muted-foreground">
                <button className="p-1 rounded hover:bg-secondary"><ChevronLeft className="h-4 w-4" /></button>
                <button className="p-1 rounded hover:bg-secondary"><ChevronRight className="h-4 w-4" /></button>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200/50 dark:border-indigo-800/30 flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-600 text-white shrink-0">
                <BookOpen className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-medium text-foreground leading-relaxed">
                  Feed your student notes to help improve your grading for mid exams preparation.
                </p>
                <Link to="/materials" className="text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline inline-block pt-1">
                  Learn more &gt;
                </Link>
              </div>
            </div>
          </div>

          {/* 2. Radial Donut Dual Gauges matching Screenshot 1 (30% & 91%) */}
          <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-foreground">Study Progress</h3>
              <Link to="/calculator" className="text-xs text-primary font-semibold hover:underline">
                View All &gt;
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center py-2">
              {/* Gauge 1: 30% Syllabus */}
              <div className="flex flex-col items-center">
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-secondary stroke-current"
                      strokeWidth="3.5"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-indigo-600 stroke-current transition-all duration-1000"
                      strokeDasharray="30, 100"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute text-center">
                    <span className="text-xl font-black text-foreground font-mono">30%</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-foreground mt-2">Syllabus Covered</span>
                <span className="text-[10px] text-muted-foreground">Units 1–2 done</span>
              </div>

              {/* Gauge 2: 91% Attendance */}
              <div className="flex flex-col items-center">
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-secondary stroke-current"
                      strokeWidth="3.5"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-sky-500 stroke-current transition-all duration-1000"
                      strokeDasharray="91, 100"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute text-center">
                    <span className="text-xl font-black text-foreground font-mono">91%</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-foreground mt-2">Attendance</span>
                <span className="text-[10px] text-emerald-600 font-semibold">Above 75% cutoff</span>
              </div>
            </div>
          </div>

          {/* 3. Faculty / Subject Mentors Quick List matching Screenshot 1 */}
          <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-3">
            <h3 className="font-bold text-sm text-foreground">Faculty & Subject Mentors</h3>

            <div className="space-y-3">
              {/* Mentor 1 */}
              <div className="p-3 rounded-xl border border-border/80 bg-secondary/20 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-600 font-bold text-xs flex items-center justify-center shrink-0">
                    AM
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-foreground truncate">Aniket Manjrekar Trek</p>
                    <p className="text-[10px] text-muted-foreground truncate">Data Structures & Algo · BCA</p>
                  </div>
                </div>
                <button 
                  onClick={() => toast.info("Opening Aniket Manjrekar's course guide...")}
                  className="px-2.5 py-1 rounded-lg border border-border text-[11px] font-semibold text-foreground hover:bg-secondary transition-colors shrink-0"
                >
                  View More
                </button>
              </div>

              {/* Mentor 2 */}
              <div className="p-3 rounded-xl border border-border/80 bg-secondary/20 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-600 font-bold text-xs flex items-center justify-center shrink-0">
                    BT
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs font-bold text-foreground truncate">Bcs Tracking</p>
                      <span className="text-[9px] px-1 rounded bg-emerald-500/20 text-emerald-600 font-bold">PRO</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground truncate">Database Sys, App Development</p>
                  </div>
                </div>
                <button 
                  onClick={() => toast.info("Opening DBMS practical portal...")}
                  className="px-2.5 py-1 rounded-lg border border-border text-[11px] font-semibold text-foreground hover:bg-secondary transition-colors shrink-0"
                >
                  View More
                </button>
              </div>

              {/* Mentor 3 */}
              <div className="p-3 rounded-xl border border-border/80 bg-secondary/20 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-600 font-bold text-xs flex items-center justify-center shrink-0">
                    AS
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-foreground truncate">Applied Science</p>
                    <p className="text-[10px] text-muted-foreground truncate">Engineering Chem, Assignment 2</p>
                  </div>
                </div>
                <button 
                  onClick={() => toast.info("Opening Chemistry assignment tracker...")}
                  className="px-2.5 py-1 rounded-lg border border-border text-[11px] font-semibold text-foreground hover:bg-secondary transition-colors shrink-0"
                >
                  View More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
