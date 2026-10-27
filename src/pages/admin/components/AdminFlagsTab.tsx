import { useState, useEffect } from "react";
import {
  Zap,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  Power,
  ShieldCheck,
  Bot,
  MessageSquare,
  Trophy,
  Clock,
  Terminal,
  Brain,
  Bell,
  Binary,
} from "lucide-react";
import {
  FeatureFlag,
  fetchFeatureFlags,
  updateFeatureFlag,
} from "@/services/adminOperationsService";
import { toast } from "sonner";

const FLAG_METADATA: Record<
  string,
  { label: string; description: string; icon: React.FC<{ className?: string }> }
> = {
  ai_doubt_solver: {
    label: "AI Doubt Solver",
    description: "Multi-turn syllabus-constrained academic doubt assistant.",
    icon: Bot,
  },
  community: {
    label: "Community Forum",
    description: "Student discussion threads, upvotes, and peer replies.",
    icon: MessageSquare,
  },
  gamification: {
    label: "XP & Streaks Engine",
    description: "Daily streak tracking, XP awards, and achievement celebrations.",
    icon: Trophy,
  },
  mock_exams: {
    label: "Timed Mock Exams",
    description: "Automated exam simulator with countdown timer and grading.",
    icon: Clock,
  },
  coding_lab: {
    label: "Interactive Coding Lab",
    description: "In-browser C/C++/Java/Python compiler and lab manual experiments.",
    icon: Terminal,
  },
  srs_flashcards: {
    label: "Spaced Repetition (SRS)",
    description: "SM-2 algorithmic review queue for active recall flashcards.",
    icon: Brain,
  },
  push_notifications: {
    label: "Push Notifications",
    description: "Mobile and web reminders for streak maintenance and exams.",
    icon: Bell,
  },
  formula_bank: {
    label: "Interactive Formula Bank",
    description: "Subject-wise mathematical and scientific formula sheet.",
    icon: Binary,
  },
};

export function AdminFlagsTab() {
  const [flags, setFlags] = useState<FeatureFlag[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchFeatureFlags();
      setFlags(data);
    } catch {
      toast.error("Failed to load feature flags");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleToggle = async (flagKey: string, currentStatus: boolean) => {
    const nextStatus = !currentStatus;
    try {
      await updateFeatureFlag(flagKey, nextStatus);
      setFlags((prev) =>
        prev.map((f) => (f.key === flagKey ? { ...f, enabled: nextStatus } : f))
      );
      toast.success(
        `${FLAG_METADATA[flagKey]?.label || flagKey} is now ${
          nextStatus ? "Enabled" : "Disabled"
        }`
      );
    } catch {
      toast.error("Failed to update feature flag");
    }
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      <div className="bg-slate-800 border border-slate-700 rounded-3xl p-5 sm:p-6 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-700">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Zap className="h-5 w-5 text-[#FAFAFA]" />
              Dynamic Feature Flags & Killswitches
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Instantly toggle application modules in real-time without redeploying code.
            </p>
          </div>

          <button
            onClick={loadData}
            className="px-3 py-1.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-semibold flex items-center gap-1.5 self-start sm:self-auto transition-colors"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh Flags</span>
          </button>
        </div>

        {loading ? (
          <div className="py-12 text-center text-slate-500 text-sm">Loading feature flags…</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {flags.map((flag) => {
              const meta = FLAG_METADATA[flag.key] || {
                label: flag.key.replace(/_/g, " "),
                description: flag.description || "System feature toggle",
                icon: Power,
              };
              const Icon = meta.icon;

              return (
                <div
                  key={flag.id || flag.key}
                  className={`bg-slate-900/70 border rounded-2xl p-4 sm:p-5 flex items-start justify-between gap-4 transition-all ${
                    flag.enabled
                      ? "border-slate-700/80 shadow-xs"
                      : "border-slate-800 opacity-60 bg-slate-950/40"
                  }`}
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div
                      className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${
                        flag.enabled
                          ? "bg-[#FAFAFA]/15 text-[#FAFAFA]"
                          : "bg-slate-800 text-slate-500"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-white truncate">{meta.label}</h4>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed mt-1">
                        {meta.description}
                      </p>
                    </div>
                  </div>

                  {/* Switch Toggle */}
                  <button
                    onClick={() => handleToggle(flag.key, flag.enabled)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      flag.enabled ? "bg-[#FAFAFA]" : "bg-slate-700"
                    }`}
                    role="switch"
                    aria-checked={flag.enabled}
                  >
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-[#18181B] shadow-sm ring-0 transition duration-200 ease-in-out ${
                        flag.enabled ? "translate-x-5 bg-[#18181B]" : "translate-x-0 bg-slate-400"
                      }`}
                    />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
