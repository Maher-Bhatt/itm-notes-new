import { useState, useMemo } from "react";
import {
  Megaphone,
  Plus,
  Trash2,
  Calendar,
  Layers,
  GraduationCap,
  Clock,
  Eye,
  CheckCircle,
  FileEdit,
  Radio,
  Archive,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { logAdminAction } from "@/services/adminOperationsService";

export interface ScheduledAnnouncement {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "success" | "error";
  audience: "all" | "students" | "admins";
  active: boolean;
  draft?: boolean;
  scheduled_start?: string;
  scheduled_end?: string;
  target_semester?: number | null;
  target_branch?: string | null;
  createdAt: string;
}

interface AdminAnnouncementsTabProps {
  announcements: ScheduledAnnouncement[];
  onAdd: (ann: Omit<ScheduledAnnouncement, "id" | "createdAt">) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onToggleActive: (id: string, active: boolean) => Promise<void>;
}

export function AdminAnnouncementsTab({
  announcements,
  onAdd,
  onDelete,
  onToggleActive,
}: AdminAnnouncementsTabProps) {
  const [showCreate, setShowCreate] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState<"info" | "warning" | "success" | "error">("info");
  const [audience, setAudience] = useState<"all" | "students" | "admins">("all");
  const [targetSemester, setTargetSemester] = useState<string>("all");
  const [targetBranch, setTargetBranch] = useState<string>("all");
  const [scheduledStart, setScheduledStart] = useState("");
  const [scheduledEnd, setScheduledEnd] = useState("");
  const [isDraft, setIsDraft] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Tab view within announcements: active, drafts, history
  const [viewFilter, setViewFilter] = useState<"active" | "drafts" | "history">("active");

  const categorizedAnnouncements = useMemo(() => {
    const now = new Date();
    return {
      active: announcements.filter(
        (a) =>
          !a.draft &&
          a.active &&
          (!a.scheduled_end || new Date(a.scheduled_end) > now)
      ),
      drafts: announcements.filter((a) => !!a.draft),
      history: announcements.filter(
        (a) =>
          !a.draft &&
          (!a.active || (a.scheduled_end && new Date(a.scheduled_end) <= now))
      ),
    };
  }, [announcements]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) {
      toast.error("Please fill in both title and message");
      return;
    }

    setSubmitting(true);
    try {
      await onAdd({
        title: title.trim(),
        message: message.trim(),
        type,
        audience,
        active: !isDraft,
        draft: isDraft,
        scheduled_start: scheduledStart || undefined,
        scheduled_end: scheduledEnd || undefined,
        target_semester: targetSemester !== "all" ? Number(targetSemester) : null,
        target_branch: targetBranch !== "all" ? targetBranch : null,
      });

      await logAdminAction("ANNOUNCEMENT_CREATE", "announcement", undefined, {
        title: title.trim(),
        isDraft,
        targetSemester,
      });

      toast.success(isDraft ? "Draft announcement saved" : "Announcement published");
      setTitle("");
      setMessage("");
      setScheduledStart("");
      setScheduledEnd("");
      setIsDraft(false);
      setShowCreate(false);
    } catch {
      toast.error("Failed to save announcement");
    } finally {
      setSubmitting(false);
    }
  };

  const currentList = categorizedAnnouncements[viewFilter];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* 1. Header with create button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Megaphone className="h-5 w-5 text-[#D6E85D]" />
            Announcement Scheduling & Targeting
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Broadcast targeted semester updates, exam alerts, and timetables.
          </p>
        </div>

        <button
          onClick={() => setShowCreate(!showCreate)}
          className="px-4 py-2 rounded-xl bg-[#D6E85D] hover:bg-[#c8dc4e] text-[#183F36] text-xs font-black flex items-center gap-1.5 transition-all active:scale-95 self-start sm:self-auto cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>New Announcement</span>
        </button>
      </div>

      {/* 2. Create Announcement Form */}
      {showCreate && (
        <form
          onSubmit={handleSubmit}
          className="bg-slate-800 border border-slate-700 rounded-3xl p-5 sm:p-6 space-y-4 shadow-xl animate-fade-in"
        >
          <div className="flex items-center justify-between pb-2 border-b border-slate-700">
            <h3 className="font-bold text-white text-sm">Composer: Target & Schedule</h3>
            <span className="text-[11px] text-slate-400">Broadcast banner alert</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Headline Title
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Remedial Exam Hall Tickets Released"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D6E85D]"
                required
              />
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Alert Banner Tone
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D6E85D]"
              >
                <option value="info">Info (Blue Notice)</option>
                <option value="warning">Warning (Amber Urgent)</option>
                <option value="success">Success (Emerald Green)</option>
                <option value="error">Critical Alert (Red)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Detailed Notice Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              placeholder="Full announcement text, schedule dates, or instructions for students..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D6E85D]"
              required
            />
          </div>

          {/* Targeting row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Target Semester
              </label>
              <select
                value={targetSemester}
                onChange={(e) => setTargetSemester(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D6E85D]"
              >
                <option value="all">All Semesters (1 to 4)</option>
                <option value="1">Semester 1</option>
                <option value="2">Semester 2</option>
                <option value="3">Semester 3</option>
                <option value="4">Semester 4</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Target Branch
              </label>
              <select
                value={targetBranch}
                onChange={(e) => setTargetBranch(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D6E85D]"
              >
                <option value="all">All Engineering Branches</option>
                <option value="CSE">Computer Science (CSE)</option>
                <option value="IT">Information Technology (IT)</option>
                <option value="Mechanical">Mechanical Engineering</option>
                <option value="Civil">Civil Engineering</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Audience Group
              </label>
              <select
                value={audience}
                onChange={(e) => setAudience(e.target.value as any)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D6E85D]"
              >
                <option value="all">All Users (Students + Guests)</option>
                <option value="students">Enrolled Students Only</option>
                <option value="admins">Admin Team Only</option>
              </select>
            </div>
          </div>

          {/* Scheduling dates row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Scheduled Start (Optional)
              </label>
              <input
                type="datetime-local"
                value={scheduledStart}
                onChange={(e) => setScheduledStart(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D6E85D]"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Expiration / Auto-hide Date (Optional)
              </label>
              <input
                type="datetime-local"
                value={scheduledEnd}
                onChange={(e) => setScheduledEnd(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D6E85D]"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-700">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
              <input
                type="checkbox"
                checked={isDraft}
                onChange={(e) => setIsDraft(e.target.checked)}
                className="rounded border-slate-600 text-[#D6E85D] focus:ring-0"
              />
              <span>Save as Draft (Do not publish immediately)</span>
            </label>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowCreate(false)}
                className="px-3.5 py-2 rounded-xl bg-slate-700 text-slate-300 text-xs font-semibold hover:bg-slate-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-4 py-2 rounded-xl bg-[#D6E85D] hover:bg-[#c8dc4e] text-[#183F36] text-xs font-black shadow-md"
              >
                {isDraft ? "Save Draft" : "Publish Announcement"}
              </button>
            </div>
          </div>
        </form>
      )}

      {/* 3. Filter tabs: Active / Drafts / History */}
      <div className="flex items-center gap-2 border-b border-slate-700 pb-2">
        <button
          onClick={() => setViewFilter("active")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
            viewFilter === "active"
              ? "bg-[#D6E85D]/15 text-[#D6E85D] border border-[#D6E85D]/30"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Radio className="h-3.5 w-3.5" />
          <span>Active Banners ({categorizedAnnouncements.active.length})</span>
        </button>

        <button
          onClick={() => setViewFilter("drafts")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
            viewFilter === "drafts"
              ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <FileEdit className="h-3.5 w-3.5" />
          <span>Drafts ({categorizedAnnouncements.drafts.length})</span>
        </button>

        <button
          onClick={() => setViewFilter("history")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
            viewFilter === "history"
              ? "bg-slate-700 text-white"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Archive className="h-3.5 w-3.5" />
          <span>History & Expired ({categorizedAnnouncements.history.length})</span>
        </button>
      </div>

      {/* 4. Render Announcement Items */}
      <div className="space-y-3">
        {currentList.length === 0 ? (
          <div className="py-12 text-center text-slate-400 text-sm bg-slate-800 border border-slate-700 rounded-2xl">
            <Megaphone className="h-8 w-8 text-slate-500 mx-auto mb-2 opacity-60" />
            <p className="font-bold text-white">No Announcements Found</p>
            <p className="text-xs text-slate-400 mt-1">There are no {viewFilter} announcements.</p>
          </div>
        ) : (
          currentList.map((ann) => {
            const isInfo = ann.type === "info";
            const isWarn = ann.type === "warning";
            const isErr = ann.type === "error";

            return (
              <div
                key={ann.id}
                className="bg-slate-800 border border-slate-700 rounded-2xl p-4 sm:p-5 space-y-3 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                          isErr
                            ? "bg-red-500/20 text-red-400 border border-red-500/30"
                            : isWarn
                            ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                            : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                        }`}
                      >
                        {ann.type}
                      </span>

                      {ann.draft ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-700 text-slate-300">
                          Draft
                        </span>
                      ) : ann.active ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          Broadcasting
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-700 text-slate-400">
                          Inactive
                        </span>
                      )}

                      {ann.target_semester && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-slate-900 border border-slate-700 text-[#D6E85D]">
                          Sem {ann.target_semester}
                        </span>
                      )}

                      {ann.target_branch && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-slate-900 border border-slate-700 text-sky-400">
                          {ann.target_branch}
                        </span>
                      )}
                    </div>

                    <h4 className="text-sm font-bold text-white pt-1">{ann.title}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">
                      {ann.message}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0">
                    <button
                      onClick={() => onToggleActive(ann.id, !ann.active)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                        ann.active
                          ? "bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20"
                          : "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20"
                      }`}
                    >
                      {ann.active ? "Pause" : "Activate"}
                    </button>

                    <button
                      onClick={() => onDelete(ann.id)}
                      className="p-1.5 rounded-xl bg-slate-700/60 hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors"
                      title="Delete announcement"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {(ann.scheduled_start || ann.scheduled_end) && (
                  <div className="pt-2 border-t border-slate-700/60 flex items-center gap-4 text-[11px] text-slate-400 flex-wrap font-mono">
                    {ann.scheduled_start && (
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-slate-500" />
                        Start: {new Date(ann.scheduled_start).toLocaleString()}
                      </span>
                    )}
                    {ann.scheduled_end && (
                      <span className="flex items-center gap-1">
                        <Archive className="h-3 w-3 text-slate-500" />
                        Expires: {new Date(ann.scheduled_end).toLocaleString()}
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
