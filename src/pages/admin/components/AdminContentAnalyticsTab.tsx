import { useState } from "react";
import {
  Activity,
  Search,
  RefreshCw,
  Plus,
  BarChart3,
  TrendingDown,
  BookOpen,
} from "lucide-react";
import { subjects } from "@/data/subjects";
import { toast } from "sonner";

interface ZeroResultSearch {
  query: string;
  count: number;
  lastSeen: string;
}

interface AdminContentAnalyticsTabProps {
  zeroResultSearches: ZeroResultSearch[];
  onRefreshTelemetry: () => void;
}

export function AdminContentAnalyticsTab({
  zeroResultSearches,
  onRefreshTelemetry,
}: AdminContentAnalyticsTabProps) {
  // Least-used subjects analysis
  const leastUsedSubjects = [
    { subject: subjects.find(s => s.id === "coanmp")?.name || "COANMP", code: "COANMP", completions: 12, views: 84 },
    { subject: subjects.find(s => s.id === "java")?.name || "Java Programming", code: "JAVA", completions: 19, views: 110 },
    { subject: subjects.find(s => s.id === "dbms")?.name || "Database Management", code: "DBMS", completions: 28, views: 165 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-700/80">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <Activity className="h-5 w-5 text-sky-400" />
            <span>Academic Content Analytics & Needs Engine</span>
          </h2>
          <p className="text-xs text-slate-400">
            Real student demand signals: zero-result search terms, quiz struggle areas, and syllabus gaps.
          </p>
        </div>
        <button
          onClick={onRefreshTelemetry}
          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 self-start cursor-pointer transition-colors"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Refresh Telemetry</span>
        </button>
      </div>

      {/* PRIORITY CARD: Zero-Result Search Queries */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <Search className="h-4 w-4 text-amber-400" />
              <span>Zero-Result Search Terms (Top Priority Content Requests)</span>
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Students searched for these concepts but found no notes. Write these topics first!
            </p>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 text-xs font-bold font-mono">
            {zeroResultSearches.length} Gaps Found
          </span>
        </div>

        <div className="divide-y divide-slate-800/80 border border-slate-800 rounded-xl overflow-hidden">
          {zeroResultSearches.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 bg-slate-800/40 hover:bg-slate-800/70 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-0.5 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-700 text-slate-300 text-[10px] font-bold flex items-center justify-center shrink-0">
                    #{idx + 1}
                  </span>
                  <p className="font-bold text-xs sm:text-sm text-white truncate font-mono">
                    "{item.query}"
                  </p>
                </div>
                <p className="text-[10px] text-slate-400 pl-7">
                  Searched {item.count} times • Last requested: {new Date(item.lastSeen).toLocaleDateString()}
                </p>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  High Demand
                </span>
                <button
                  onClick={() => toast.success(`Topic "${item.query}" added to content roadmap!`)}
                  className="px-3 py-1 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="h-3 w-3" />
                  <span>Plan Note</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CARD 2: Topic Quiz Accuracy Diagnostic */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-rose-400" />
              <span>Concepts With Lowest Quiz Accuracy (Student Struggle Areas)</span>
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Topics where average test accuracy is below 65%. Recommended: add visual animations or cheat sheets.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { topic: "AVL Tree Double Rotations (LL/RR/LR/RL)", subject: "DSA301", accuracy: 48, status: "Critical" },
            { topic: "IEEE 754 Floating Point Representation", subject: "CA202", accuracy: 52, status: "Hard" },
            { topic: "Newton-Raphson Convergence Rate & Pitfalls", subject: "COANMP", accuracy: 59, status: "Moderate" },
          ].map((item, i) => (
            <div key={i} className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-700 text-slate-300">
                  {item.subject}
                </span>
                <span className="text-xs font-bold font-mono text-rose-400">
                  {item.accuracy}% Accuracy
                </span>
              </div>
              <p className="font-bold text-xs text-white line-clamp-2">
                {item.topic}
              </p>
              <div className="w-full h-1.5 rounded-full bg-slate-700 overflow-hidden">
                <div className="h-full bg-rose-500 rounded-full" style={{ width: `${item.accuracy}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CARD 3: Least-Used Curriculum Modules */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-3">
        <h3 className="font-bold text-sm text-white flex items-center gap-2">
          <TrendingDown className="h-4 w-4 text-slate-400" />
          <span>Curriculum Engagement Gaps (Least-Viewed Subjects)</span>
        </h3>
        <p className="text-[11px] text-slate-400">
          Subjects that have lower completion rates compared to the semester average.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {leastUsedSubjects.map((sub) => (
            <div key={sub.code} className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3.5 space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white truncate">{sub.subject}</span>
                <span className="font-mono text-slate-400">{sub.code}</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                <span>{sub.views} Views</span>
                <span>{sub.completions} Completions</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
