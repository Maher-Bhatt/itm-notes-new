import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Download, 
  Search, 
  Filter, 
  BookOpen, 
  CheckCircle, 
  FolderDown, 
  FileText, 
  ExternalLink,
  Layers,
  Sparkles,
  Eye,
  Plus,
  Folder,
  Calendar,
  ChevronRight,
  TrendingUp,
  FileCheck,
  X
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
import { REAL_STUDY_MATERIALS, StudyMaterial } from "@/data/materialsData";

// Subject Overviews Cards matching Screenshot 2
const SUBJECT_OVERVIEW_CARDS = [
  {
    id: "mat-1",
    code: "DATA - COMPUTER",
    tag: "Notes",
    tagColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    title: "Official Timetables",
    subtitle: "Complete schedule & test room mappings for Mid-Semester Exams.",
    pages: "12 Pages",
    fileSize: "1.4 MB",
  },
  {
    id: "mat-2",
    code: "DATA & FRAMES",
    tag: "Notes",
    tagColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    title: "Exercise Practice Sets",
    subtitle: "Algorithmic problem solutions, dry runs, and time complexity table.",
    pages: "28 Pages",
    fileSize: "3.2 MB",
  },
  {
    id: "mat-3",
    code: "MATH - EXAM 02",
    tag: "Notes",
    tagColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    title: "Practical Code Reference",
    subtitle: "Data Structures in C, Stacks, Queues, Binary Trees & Dijkstra code.",
    pages: "34 Pages",
    fileSize: "2.8 MB",
  },
  {
    id: "mat-4",
    code: "DBMS - EXAMS",
    tag: "Notes",
    tagColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    title: "Interactive Data Sets",
    subtitle: "Relational Algebra, SQL triggers, 1NF-BCNF decomposition proofs.",
    pages: "22 Pages",
    fileSize: "1.9 MB",
  },
  {
    id: "mat-5",
    code: "AUTO - EXAMS",
    tag: "Exam",
    tagColor: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    title: "Offline Syllabus Units",
    subtitle: "All units compiled into offline indexed high-yield summaries.",
    pages: "48 Pages",
    fileSize: "4.5 MB",
  },
  {
    id: "mat-6",
    code: "AUTO - EXAMS",
    tag: "Exam",
    tagColor: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    title: "Project Guidelines",
    subtitle: "Semester capstone project formats, SRS templates, and viva questions.",
    pages: "16 Pages",
    fileSize: "1.1 MB",
  },
];

// Question Banks Chart Data matching Screenshot 2
const QUESTION_BANK_TREND_DATA = [
  { date: "Oct 00", count: 18 },
  { date: "Oct 08", count: 32 },
  { date: "Oct 16", count: 48 },
  { date: "Oct 24", count: 38 },
  { date: "Oct 30", count: 72 },
  { date: "Nov 10", count: 85 },
];

// Timetables List matching Screenshot 2
const TIMETABLES_LIST = [
  {
    name: "Basic Promotional Applied (Adv) - 2026",
    subject: "25 Mar 2026",
    type: "16.4 KB",
    size: "55.5%",
  },
  {
    name: "Data File Fast Detection (Doc July 2026)",
    subject: "06 Mar 2026",
    type: "10.4 KB",
    size: "1364 KB",
  },
  {
    name: "Second Stage Propagation (Information - 2026)",
    subject: "10 Mar 2026",
    type: "14.4 KB",
    size: "50.6%",
  },
];

export default function MaterialsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubTab, setSelectedSubTab] = useState<"address" | "databases">("address");
  const [activePreview, setActivePreview] = useState<any | null>(null);

  // Filtered cards based on search query
  const filteredOverviews = useMemo(() => {
    if (!searchQuery.trim()) return SUBJECT_OVERVIEW_CARDS;
    return SUBJECT_OVERVIEW_CARDS.filter(c => 
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleDownload = (item: any) => {
    toast.success(`Downloading ${item.title} (${item.fileSize || "PDF"})...`);
    // Create simulated file download
    const blob = new Blob([`# ${item.title}\n\nITM SLS Baroda University Study Material\n\n${item.subtitle}`], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${item.title.replace(/\s+/g, "_")}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto space-y-8 animate-fade-in">
      {/* ── TOP HEADER SECTION matching Screenshot 2 ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-border/60">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-foreground">
            ITM Notes Materials
          </h1>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5 font-medium">
            <span>Academic resources</span>
            <span>·</span>
            <span>Academic materials</span>
            <span>·</span>
            <span>ITM</span>
            <span>·</span>
            <span className="text-foreground font-semibold">Sem 3</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Sub Tabs */}
          <div className="flex rounded-xl bg-secondary p-1 border border-border text-xs font-semibold">
            <button
              onClick={() => setSelectedSubTab("address")}
              className={`px-3 py-1 rounded-lg transition-all ${
                selectedSubTab === "address" ? "bg-background text-foreground shadow-xs font-bold" : "text-muted-foreground"
              }`}
            >
              Curriculum Notes
            </button>
            <button
              onClick={() => setSelectedSubTab("databases")}
              className={`px-3 py-1 rounded-lg transition-all ${
                selectedSubTab === "databases" ? "bg-background text-foreground shadow-xs font-bold" : "text-muted-foreground"
              }`}
            >
              Databases & Media
            </button>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search for notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 pl-8 pr-3 w-44 sm:w-56 rounded-xl border border-input bg-card text-xs focus:ring-1 focus:ring-primary outline-none"
            />
          </div>

          <button
            onClick={() => {
              navigate("/imp-questions");
              toast.info("Navigating to Question Banks");
            }}
            className="h-9 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/20 flex items-center gap-1.5 transition-all active:scale-95 shrink-0"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add Sheet</span>
          </button>
        </div>
      </div>

      {/* ── SECTION 1: SUBJECT OVERVIEWS 6-CARD GRID matching Screenshot 2 ── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-foreground">Subject Overviews</h2>
          <span className="text-xs text-muted-foreground font-medium">
            {filteredOverviews.length} official materials available
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {filteredOverviews.map((card) => (
            <div
              key={card.id}
              className="bg-card border border-border/80 hover:border-primary/50 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${card.tagColor}`}>
                    {card.tag}
                  </span>
                  <span className="text-[10px] font-mono text-muted-foreground">
                    {card.pages}
                  </span>
                </div>

                {/* Simulated Document Preview Area */}
                <div 
                  onClick={() => setActivePreview(card)}
                  className="h-24 rounded-xl bg-secondary/50 border border-border/60 flex items-center justify-center p-3 mb-3 cursor-pointer group-hover:bg-primary/5 transition-colors"
                >
                  <FileText className="h-10 w-10 text-muted-foreground/60 group-hover:text-primary transition-colors" />
                </div>

                <div className="text-[10px] font-mono font-bold text-primary mb-0.5">
                  {card.code}
                </div>
                <h3 className="font-bold text-xs text-foreground truncate mb-1">
                  {card.title}
                </h3>
                <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed mb-3">
                  {card.subtitle}
                </p>
              </div>

              <button
                onClick={() => handleDownload(card)}
                className="w-full h-8 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-sm"
              >
                <Download className="h-3 w-3" />
                <span>Download</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ── SECTION 2: THREE-COLUMN MIDDLE ROW matching Screenshot 2 ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Column 1: Examination Materials Directory Tree (~28% -> lg:col-span-3) */}
        <div className="lg:col-span-3 bg-card border border-border rounded-2xl p-5 shadow-sm space-y-4">
          <h3 className="font-bold text-sm text-foreground">Examination Materials</h3>

          <div className="space-y-1.5 text-xs font-semibold">
            <button className="w-full p-2.5 rounded-xl bg-indigo-600 text-white font-bold flex items-center justify-between text-left shadow-xs">
              <span className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <span>Student Materials</span>
              </span>
              <ChevronRight className="h-3.5 w-3.5 opacity-70" />
            </button>

            <button 
              onClick={() => toast.info("Viewing Attendance study records...")}
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

        {/* Column 2: Question Banks Trend Chart (~38% -> lg:col-span-5) */}
        <div className="lg:col-span-5 bg-card border border-border rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-bold text-sm text-foreground">Question Banks</h3>
              <Link to="/imp-questions" className="text-xs text-primary font-semibold hover:underline">
                View All &gt;
              </Link>
            </div>
            <p className="text-[11px] text-muted-foreground">
              Your test inquiries & solved practice question accuracy over time.
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
                    dataKey="count" 
                    stroke="#6366F1" 
                    strokeWidth={2.5} 
                    dot={{ fill: "#6366F1", r: 4 }} 
                    activeDot={{ r: 6 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="pt-3 border-t border-border/60 flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Top Question Bank: 85% Accuracy</span>
            <Link to="/imp-questions" className="text-primary hover:underline font-semibold flex items-center gap-1">
              <span>Core Overviews</span>
              <ExternalLink className="h-3 w-3" />
            </Link>
          </div>
        </div>

        {/* Column 3: Downloadable Resources (5x2 Metric Grid) (~34% -> lg:col-span-4) */}
        <div className="lg:col-span-4 bg-card border border-border rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-sm text-foreground mb-1">Downloadable Resources</h3>
            <p className="text-[11px] text-muted-foreground mb-3">
              Comprehensive offline pack for Semester 3.
            </p>

            {/* 10 Critical Data Metrics Matrix (5 columns x 2 rows) matching Screenshot 2 */}
            <div className="grid grid-cols-5 gap-2 text-center p-3 rounded-xl bg-secondary/30 border border-border/60 mb-4">
              <div>
                <span className="text-base font-black font-mono text-foreground block">32</span>
                <span className="text-[10px] text-muted-foreground uppercase font-semibold">Notes</span>
              </div>
              <div>
                <span className="text-base font-black font-mono text-indigo-600 block">67</span>
                <span className="text-[10px] text-muted-foreground uppercase font-semibold">MCQs</span>
              </div>
              <div>
                <span className="text-base font-black font-mono text-foreground block">31</span>
                <span className="text-[10px] text-muted-foreground uppercase font-semibold">Prac</span>
              </div>
              <div>
                <span className="text-base font-black font-mono text-purple-600 block">515</span>
                <span className="text-[10px] text-muted-foreground uppercase font-semibold">Quest</span>
              </div>
              <div>
                <span className="text-base font-black font-mono text-emerald-600 block">50%</span>
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
              toast.success("Preparing offline bundle: 32 Notes & 515 Questions (24.8 MB)...");
            }}
            className="w-full h-10 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md shadow-indigo-600/20"
          >
            <FolderDown className="h-4 w-4" />
            <span>Get Revision Now (Download All)</span>
          </button>
        </div>
      </div>

      {/* ── SECTION 3: BOTTOM ROW: TIMETABLES & CHEATSHEET BANNER matching Screenshot 2 ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Table: Timetables (~65% -> lg:col-span-8) */}
        <div className="lg:col-span-8 bg-card border border-border rounded-2xl p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-foreground">Timetables</h3>
            <span className="text-xs text-primary font-semibold hover:underline cursor-pointer">
              View All &gt;
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-[10px] font-bold text-muted-foreground uppercase border-b border-border">
                <tr>
                  <th className="pb-2.5">Name</th>
                  <th className="pb-2.5">Date / Subject</th>
                  <th className="pb-2.5">Type / Size</th>
                  <th className="pb-2.5 text-right">Forward</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {TIMETABLES_LIST.map((item, idx) => (
                  <tr key={idx} className="hover:bg-secondary/20 transition-colors">
                    <td className="py-3 font-semibold text-foreground flex items-center gap-2">
                      <FileCheck className="h-4 w-4 text-primary shrink-0" />
                      <span>{item.name}</span>
                    </td>
                    <td className="py-3 text-muted-foreground">{item.subject}</td>
                    <td className="py-3 font-mono text-[11px] text-muted-foreground">{item.type}</td>
                    <td className="py-3 text-right">
                      <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 font-mono">
                        {item.size}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Promo Card: ITM Notes Solved Questions (~35% -> lg:col-span-4) */}
        <div className="lg:col-span-4 bg-gradient-to-br from-slate-900 to-indigo-950 text-white border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
                MST Exclusive
              </span>
              <span className="text-[11px] text-slate-400">Baroda University</span>
            </div>
            <h3 className="font-bold text-base text-white">
              ITM Notes · Questions the Majority Solve
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              Top priority cheatsheet for the upcoming mid semester examinations with solved step-by-step algorithms and worked formulas.
            </p>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <button
              onClick={() => navigate("/imp-questions")}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all active:scale-95"
            >
              Open Solved Bank &gt;
            </button>
            <span className="text-[11px] text-emerald-400 font-semibold font-mono">
              ✓ 100% Verified
            </span>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {activePreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-card border border-border rounded-2xl w-full max-w-lg p-6 shadow-2xl relative space-y-4">
            <button
              onClick={() => setActivePreview(null)}
              className="absolute right-4 top-4 p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-xs font-bold bg-primary/10 text-primary border border-primary/20">
                {activePreview.code}
              </span>
              <span className="text-xs text-muted-foreground">{activePreview.pages}</span>
            </div>

            <h3 className="font-black text-lg text-foreground">{activePreview.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{activePreview.subtitle}</p>

            <div className="p-4 rounded-xl bg-secondary/50 border border-border text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">File Size:</span>
                <span className="font-mono font-bold text-foreground">{activePreview.fileSize}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Format:</span>
                <span className="font-semibold text-foreground">Indexed University PDF / Markdown</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Verification:</span>
                <span className="font-bold text-emerald-600">SLS Baroda University Exam Cell</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setActivePreview(null)}
                className="px-4 py-2 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground font-semibold text-xs"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleDownload(activePreview);
                  setActivePreview(null);
                }}
                className="px-5 py-2 rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-sm hover:opacity-90 flex items-center gap-1.5"
              >
                <Download className="h-4 w-4" />
                <span>Download Now</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
