import { useState, useEffect, useMemo } from "react";
import {
  MessageSquare,
  Flag,
  FileCheck2,
  CheckCircle,
  XCircle,
  Edit3,
  RefreshCw,
  Filter,
  Search,
  Sparkles,
  Clock,
  User,
  X,
  AlertCircle,
} from "lucide-react";
import {
  ModerationItem,
  fetchModerationQueue,
  updateModerationStatus,
} from "@/services/adminOperationsService";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function AdminModerationTab() {
  const [items, setItems] = useState<ModerationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("pending");
  const [search, setSearch] = useState("");

  // Reject modal state
  const [rejectingItem, setRejectingItem] = useState<ModerationItem | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");

  // Edit modal state
  const [editingItem, setEditingItem] = useState<ModerationItem | null>(null);
  const [editedContent, setEditedContent] = useState("");

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchModerationQueue();
      setItems(data);
    } catch {
      toast.error("Failed to load moderation items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const q = search.trim().toLowerCase();
      const matchesSearch =
        !q ||
        item.target_title.toLowerCase().includes(q) ||
        item.content.toLowerCase().includes(q) ||
        item.reporter_name.toLowerCase().includes(q);

      const matchesType = typeFilter === "all" || item.type === typeFilter;
      const matchesStatus = statusFilter === "all" || item.status === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [items, search, typeFilter, statusFilter]);

  const handleApprove = async (item: ModerationItem) => {
    try {
      await updateModerationStatus(item.id, "approved");

      // If student contribution, reward 150 XP!
      if (item.type === "student_contribution" && item.reporter_email) {
        try {
          const { data: userProfile } = await supabase
            .from("profiles")
            .select("id, total_xp")
            .eq("email", item.reporter_email)
            .maybeSingle();

          if (userProfile) {
            await supabase
              .from("profiles")
              .update({ total_xp: (userProfile.total_xp || 0) + 150 })
              .eq("id", userProfile.id);
            toast.success(`Approved! Awarded +150 XP to ${item.reporter_name}`);
          } else {
            toast.success("Approved submission");
          }
        } catch {
          toast.success("Approved submission");
        }
      } else {
        toast.success("Approved report/item");
      }

      setItems((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, status: "approved" } : i))
      );
    } catch {
      toast.error("Failed to approve item");
    }
  };

  const handleConfirmReject = async () => {
    if (!rejectingItem) return;
    try {
      await updateModerationStatus(
        rejectingItem.id,
        "rejected",
        rejectionReason.trim() || "Declined by admin review"
      );
      toast.info("Item marked as rejected");
      setItems((prev) =>
        prev.map((i) =>
          i.id === rejectingItem.id
            ? { ...i, status: "rejected", rejection_reason: rejectionReason }
            : i
        )
      );
      setRejectingItem(null);
      setRejectionReason("");
    } catch {
      toast.error("Failed to reject item");
    }
  };

  const handleConfirmEditAndApprove = async () => {
    if (!editingItem) return;
    try {
      await updateModerationStatus(
        editingItem.id,
        "approved",
        undefined,
        editedContent
      );
      toast.success("Content edited and approved!");
      setItems((prev) =>
        prev.map((i) =>
          i.id === editingItem.id
            ? { ...i, status: "approved", content: editedContent }
            : i
        )
      );
      setEditingItem(null);
      setEditedContent("");
    } catch {
      toast.error("Failed to edit and approve");
    }
  };

  return (
    <div className="space-y-5 animate-fade-in">
      {/* 1. Header controls */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2.5">
        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search reports by content, author, or subject…"
            className="w-full pl-9 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#D6E85D]/60"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 bg-slate-800 border border-slate-700 px-2.5 py-1.5 rounded-xl text-xs text-slate-300">
            <Filter className="h-3 w-3 text-slate-400" />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-transparent text-white focus:outline-none cursor-pointer"
            >
              <option value="all" className="bg-slate-800">All Queue Types</option>
              <option value="errata" className="bg-slate-800">Errata Reports</option>
              <option value="student_contribution" className="bg-slate-800">Student Contributions</option>
              <option value="community_post" className="bg-slate-800">Community Posts</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-800 border border-slate-700 px-2.5 py-1.5 rounded-xl text-xs text-slate-300">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent text-white focus:outline-none cursor-pointer"
            >
              <option value="all" className="bg-slate-800">All Status</option>
              <option value="pending" className="bg-slate-800">Pending Review</option>
              <option value="approved" className="bg-slate-800">Approved</option>
              <option value="rejected" className="bg-slate-800">Rejected</option>
            </select>
          </div>

          <button
            onClick={loadData}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-700 transition-colors"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* 2. Moderation Items List */}
      <div className="space-y-3">
        {loading ? (
          <div className="py-12 text-center text-slate-500 text-sm">Loading queue items…</div>
        ) : filteredItems.length === 0 ? (
          <div className="py-12 text-center text-slate-400 text-sm bg-slate-800 border border-slate-700 rounded-2xl">
            <CheckCircle className="h-8 w-8 text-[#D6E85D] mx-auto mb-2 opacity-80" />
            <p className="font-bold text-white">Queue Empty</p>
            <p className="text-xs text-slate-400 mt-1">No moderation reports match this filter.</p>
          </div>
        ) : (
          filteredItems.map((item) => {
            const isPending = item.status === "pending";

            return (
              <div
                key={item.id}
                className={`bg-slate-800 border rounded-2xl p-4 sm:p-5 space-y-3 transition-all ${
                  isPending ? "border-amber-500/30 shadow-sm" : "border-slate-700/60 opacity-80"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-700/60 pb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    {item.type === "errata" && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-500/15 text-rose-400 border border-rose-500/30 flex items-center gap-1">
                        <Flag className="h-3 w-3" />
                        Errata Report
                      </span>
                    )}
                    {item.type === "student_contribution" && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-purple-500/15 text-purple-400 border border-purple-500/30 flex items-center gap-1">
                        <Sparkles className="h-3 w-3" />
                        Student Contribution
                      </span>
                    )}
                    {item.type === "community_post" && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-500/15 text-blue-400 border border-blue-500/30 flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" />
                        Post Report
                      </span>
                    )}

                    <span className="font-bold text-white text-sm">
                      {item.target_title}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3 text-slate-500" />
                      {item.reporter_name}
                    </span>
                    <span className="flex items-center gap-1 font-mono text-[11px]">
                      <Clock className="h-3 w-3 text-slate-500" />
                      {new Date(item.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Content body */}
                <div className="bg-slate-900/60 rounded-xl p-3 text-xs text-slate-200 border border-slate-700/40 space-y-2">
                  <p className="whitespace-pre-wrap leading-relaxed">{item.content}</p>

                  {item.suggested_fix && (
                    <div className="pt-2 border-t border-slate-800">
                      <span className="text-[10px] uppercase font-bold text-emerald-400 block mb-0.5">
                        Suggested Correction:
                      </span>
                      <p className="text-emerald-200/90 font-mono text-[11px]">
                        {item.suggested_fix}
                      </p>
                    </div>
                  )}

                  {item.rejection_reason && (
                    <div className="pt-2 border-t border-slate-800">
                      <span className="text-[10px] uppercase font-bold text-red-400 block mb-0.5">
                        Rejection Reason:
                      </span>
                      <p className="text-red-300 text-[11px]">{item.rejection_reason}</p>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-1">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    item.status === "approved"
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                      : item.status === "rejected"
                      ? "bg-red-500/10 text-red-400 border border-red-500/30"
                      : "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                  }`}>
                    {item.status}
                  </span>

                  {isPending && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingItem(item);
                          setEditedContent(item.suggested_fix || item.content);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                      >
                        <Edit3 className="h-3 w-3" />
                        <span>Edit & Approve</span>
                      </button>

                      <button
                        onClick={() => {
                          setRejectingItem(item);
                          setRejectionReason("");
                        }}
                        className="px-3 py-1.5 rounded-xl bg-red-500/15 hover:bg-red-500/25 border border-red-500/30 text-red-400 text-xs font-bold flex items-center gap-1.5 transition-colors"
                      >
                        <XCircle className="h-3 w-3" />
                        <span>Reject</span>
                      </button>

                      <button
                        onClick={() => handleApprove(item)}
                        className="px-3.5 py-1.5 rounded-xl bg-[#D6E85D] hover:bg-[#c8dc4e] text-[#183F36] text-xs font-black flex items-center gap-1.5 transition-colors"
                      >
                        <CheckCircle className="h-3.5 w-3.5" />
                        <span>Approve (+XP)</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* 3. Reject Reason Modal */}
      {rejectingItem && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-3xl w-full max-w-md p-6 space-y-4 shadow-2xl relative animate-scale-in">
            <button
              onClick={() => setRejectingItem(null)}
              className="absolute right-4 top-4 p-1.5 rounded-xl bg-slate-700/60 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="space-y-1">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-red-400" />
                Reject Submission
              </h3>
              <p className="text-xs text-slate-400">
                Provide a helpful note explaining why this submission does not meet syllabus guidelines.
              </p>
            </div>

            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="e.g. Duplicate question, incorrect formula derivation, or off-syllabus topic..."
              rows={3}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-400"
            />

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setRejectingItem(null)}
                className="px-3 py-1.5 rounded-xl bg-slate-700 text-slate-200 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReject}
                className="px-4 py-1.5 rounded-xl bg-red-500 text-white font-bold text-xs hover:bg-red-600 transition-colors"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Edit & Approve Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-3xl w-full max-w-lg p-6 space-y-4 shadow-2xl relative animate-scale-in">
            <button
              onClick={() => setEditingItem(null)}
              className="absolute right-4 top-4 p-1.5 rounded-xl bg-slate-700/60 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Edit3 className="h-4 w-4 text-[#D6E85D]" />
                Edit then Approve
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Polish typos, fix formatting, or enrich content before publishing.
              </p>
            </div>

            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              rows={6}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white font-mono placeholder-slate-500 focus:outline-none focus:border-[#D6E85D]"
            />

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setEditingItem(null)}
                className="px-3 py-1.5 rounded-xl bg-slate-700 text-slate-200 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmEditAndApprove}
                className="px-4 py-1.5 rounded-xl bg-[#D6E85D] text-[#183F36] font-black text-xs hover:bg-[#c8dc4e] transition-colors"
              >
                Save & Approve (+XP)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
