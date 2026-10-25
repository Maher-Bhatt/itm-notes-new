import { useState, useEffect, useMemo } from "react";
import {
  FileText,
  Clock,
  History,
  RotateCcw,
  Send,
  Eye,
  CheckCircle,
  Calendar,
  AlertCircle,
  BookOpen,
} from "lucide-react";
import { subjects } from "@/data/subjects";
import {
  TopicVersion,
  fetchTopicVersions,
  createTopicVersion,
} from "@/services/adminOperationsService";
import { toast } from "sonner";

export function AdminDraftsTab() {
  const [selectedSubjectId, setSelectedSubjectId] = useState(subjects[0]?.id || "");
  const [selectedTopicId, setSelectedTopicId] = useState("");
  const [versions, setVersions] = useState<TopicVersion[]>([]);
  const [loading, setLoading] = useState(false);

  // New Draft / Revision Form
  const [revisionTitle, setRevisionTitle] = useState("");
  const [revisionContent, setRevisionContent] = useState("");
  const [status, setStatus] = useState<"draft" | "published" | "scheduled">("draft");
  const [scheduledAt, setScheduledAt] = useState("");

  const currentSubject = subjects.find((s) => s.id === selectedSubjectId);
  const availableTopics = useMemo(() => currentSubject?.topics || [], [currentSubject]);

  useEffect(() => {
    if (availableTopics.length > 0 && !selectedTopicId) {
      setSelectedTopicId(availableTopics[0].id);
    }
  }, [availableTopics, selectedTopicId]);

  useEffect(() => {
    if (!selectedTopicId) return;
    const load = async () => {
      setLoading(true);
      try {
        const v = await fetchTopicVersions(selectedTopicId);
        setVersions(v);
        const latest = v[0];
        if (latest) {
          setRevisionTitle(latest.title);
          setRevisionContent(latest.content);
        }
      } catch {
        toast.error("Failed to load topic versions");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [selectedTopicId]);

  const handleSaveRevision = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!revisionTitle.trim() || !revisionContent.trim()) {
      toast.error("Please provide a title and note content");
      return;
    }

    try {
      const created = await createTopicVersion(
        selectedTopicId,
        revisionTitle.trim(),
        revisionContent.trim(),
        status,
        status === "scheduled" ? scheduledAt : undefined
      );
      setVersions([created, ...versions]);
      toast.success(
        status === "published"
          ? "Topic published live!"
          : status === "scheduled"
          ? "Topic revision scheduled!"
          : "Draft saved successfully!"
      );
    } catch {
      toast.error("Failed to save revision");
    }
  };

  const handleRollback = async (ver: TopicVersion) => {
    if (!confirm(`Rollback to Version ${ver.version_number}?`)) return;
    try {
      const rolledBack = await createTopicVersion(
        selectedTopicId,
        `${ver.title} (Rolled back to v${ver.version_number})`,
        ver.content,
        "published"
      );
      setVersions([rolledBack, ...versions]);
      setRevisionTitle(rolledBack.title);
      setRevisionContent(rolledBack.content);
      toast.success(`Rolled back to Version ${ver.version_number} and published live!`);
    } catch {
      toast.error("Rollback failed");
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* 1. Header & Subject/Topic Selector */}
      <div className="bg-slate-800 border border-slate-700 rounded-3xl p-5 sm:p-6 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-700">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <FileText className="h-5 w-5 text-[#D6E85D]" />
              Draft & Publish Workflow + Version History
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Review syllabus note drafts, schedule releases, and rollback previous versions.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Select Curriculum Subject
            </label>
            <select
              value={selectedSubjectId}
              onChange={(e) => {
                setSelectedSubjectId(e.target.value);
                setSelectedTopicId("");
              }}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium focus:outline-none focus:border-[#D6E85D]"
            >
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>
                  Sem {s.semester} · {s.name} ({s.code || s.id})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Select Topic
            </label>
            <select
              value={selectedTopicId}
              onChange={(e) => setSelectedTopicId(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium focus:outline-none focus:border-[#D6E85D]"
            >
              {availableTopics.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 2. Editor & Revision Creator */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <form
          onSubmit={handleSaveRevision}
          className="lg:col-span-2 bg-slate-800 border border-slate-700 rounded-3xl p-5 sm:p-6 space-y-4 shadow-xl"
        >
          <div className="flex items-center justify-between pb-2 border-b border-slate-700">
            <h3 className="font-bold text-white text-sm">Editor: Topic Content Revision</h3>
            <span className="text-[11px] text-slate-400 font-mono">
              Topic ID: {selectedTopicId}
            </span>
          </div>

          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Revision Title
            </label>
            <input
              value={revisionTitle}
              onChange={(e) => setRevisionTitle(e.target.value)}
              placeholder="e.g. Asymptotic Notation (Big-O, Omega, Theta) - Comprehensive 2026 Edition"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D6E85D]"
              required
            />
          </div>

          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Markdown / KaTeX Note Content
            </label>
            <textarea
              value={revisionContent}
              onChange={(e) => setRevisionContent(e.target.value)}
              rows={12}
              placeholder="Write or edit full topic markdown, mathematical equations, and diagrams..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white font-mono leading-relaxed focus:outline-none focus:border-[#D6E85D]"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Release Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D6E85D]"
              >
                <option value="draft">Save as Internal Draft</option>
                <option value="published">Publish Live Immediately</option>
                <option value="scheduled">Schedule Future Release</option>
              </select>
            </div>

            {status === "scheduled" && (
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Scheduled Publish Timestamp
                </label>
                <input
                  type="datetime-local"
                  value={scheduledAt}
                  onChange={(e) => setScheduledAt(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D6E85D]"
                  required
                />
              </div>
            )}
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#D6E85D] hover:bg-[#c8dc4e] text-[#183F36] text-xs font-black shadow-md cursor-pointer transition-all"
            >
              {status === "published"
                ? "Publish Version"
                : status === "scheduled"
                ? "Schedule Version"
                : "Save Revision Draft"}
            </button>
          </div>
        </form>

        {/* 3. Version History & Rollback sidebar */}
        <div className="bg-slate-800 border border-slate-700 rounded-3xl p-5 sm:p-6 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-700">
            <History className="h-4 w-4 text-[#D6E85D]" />
            <h3 className="font-bold text-white text-sm">Version History</h3>
          </div>

          {loading ? (
            <div className="py-8 text-center text-slate-500 text-xs">Loading versions…</div>
          ) : versions.length === 0 ? (
            <div className="py-8 text-center text-slate-400 text-xs">No version history yet.</div>
          ) : (
            <div className="space-y-3">
              {versions.map((ver, idx) => (
                <div
                  key={ver.id}
                  className="bg-slate-900/60 border border-slate-700/60 rounded-2xl p-3.5 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono font-bold text-xs text-[#D6E85D]">
                        v{ver.version_number}
                      </span>
                      {idx === 0 && (
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase">
                          Latest
                        </span>
                      )}
                    </div>

                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      ver.status === "published"
                        ? "bg-emerald-500/10 text-emerald-400"
                        : ver.status === "scheduled"
                        ? "bg-sky-500/10 text-sky-400"
                        : "bg-slate-700 text-slate-300"
                    }`}>
                      {ver.status}
                    </span>
                  </div>

                  <p className="text-white font-medium text-xs line-clamp-1">{ver.title}</p>
                  <p className="text-[11px] text-slate-500 font-mono">
                    {new Date(ver.created_at).toLocaleString()}
                  </p>

                  {idx > 0 && (
                    <button
                      onClick={() => handleRollback(ver)}
                      className="w-full mt-2 py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <RotateCcw className="h-3 w-3" />
                      <span>Rollback to this version</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
