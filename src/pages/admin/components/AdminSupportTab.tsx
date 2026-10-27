import { useState, useEffect, useMemo } from "react";
import {
  MessageSquare,
  Clock,
  CheckCircle2,
  Mail,
  User,
  Reply,
  RefreshCw,
  Search,
  Filter,
  X,
  Send,
  AlertCircle,
} from "lucide-react";
import {
  SupportTicket,
  fetchSupportTickets,
  replyToSupportTicket,
} from "@/services/adminOperationsService";
import { toast } from "sonner";

export function AdminSupportTab() {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<"all" | "open" | "in_progress" | "resolved">("open");
  const [search, setSearch] = useState("");

  // Reply modal
  const [replyingTicket, setReplyingTicket] = useState<SupportTicket | null>(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [nextStatus, setNextStatus] = useState<"resolved" | "in_progress">("resolved");
  const [sending, setSending] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchSupportTickets();
      setTickets(data);
    } catch {
      toast.error("Failed to load support tickets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const openTicketsCount = useMemo(
    () => tickets.filter((t) => t.status === "open").length,
    [tickets]
  );

  const filteredTickets = useMemo(() => {
    return tickets.filter((t) => {
      const q = search.trim().toLowerCase();
      const matchesSearch =
        !q ||
        t.subject.toLowerCase().includes(q) ||
        t.message.toLowerCase().includes(q) ||
        (t.user_name && t.user_name.toLowerCase().includes(q)) ||
        (t.user_email && t.user_email.toLowerCase().includes(q));

      const matchesStatus = statusFilter === "all" || t.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [tickets, search, statusFilter]);

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyingTicket || !replyMessage.trim()) return;

    setSending(true);
    try {
      await replyToSupportTicket(replyingTicket.id, replyMessage.trim(), nextStatus);
      toast.success("Reply dispatched and ticket updated!");
      setTickets((prev) =>
        prev.map((t) =>
          t.id === replyingTicket.id
            ? {
                ...t,
                admin_reply: replyMessage.trim(),
                status: nextStatus,
                replied_at: new Date().toISOString(),
              }
            : t
        )
      );
      setReplyingTicket(null);
      setReplyMessage("");
    } catch {
      toast.error("Failed to send reply");
    } finally {
      setSending(false);
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
            placeholder="Search student support tickets by query, name, or email…"
            className="w-full pl-9 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#D6E85D]/60"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-slate-800 border border-slate-700 px-2.5 py-1.5 rounded-xl text-xs text-slate-300">
            <Filter className="h-3 w-3 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="bg-transparent text-white focus:outline-none cursor-pointer"
            >
              <option value="all" className="bg-slate-800">All Status</option>
              <option value="open" className="bg-slate-800">Open ({openTicketsCount})</option>
              <option value="in_progress" className="bg-slate-800">In Progress</option>
              <option value="resolved" className="bg-slate-800">Resolved</option>
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

      {/* 2. Tickets List */}
      <div className="space-y-3">
        {loading ? (
          <div className="py-12 text-center text-slate-500 text-sm">Loading support tickets…</div>
        ) : filteredTickets.length === 0 ? (
          <div className="py-12 text-center text-slate-400 text-sm bg-slate-800 border border-slate-700 rounded-2xl">
            <CheckCircle2 className="h-8 w-8 text-[#D6E85D] mx-auto mb-2 opacity-80" />
            <p className="font-bold text-white">No Tickets Found</p>
            <p className="text-xs text-slate-400 mt-1">
              {statusFilter === "open" ? "Inbox is completely clear! Great work." : "No support inquiries match this filter."}
            </p>
          </div>
        ) : (
          filteredTickets.map((t) => {
            const isOpen = t.status === "open";
            const isInProgress = t.status === "in_progress";

            return (
              <div
                key={t.id}
                className={`bg-slate-800 border rounded-2xl p-4 sm:p-5 space-y-3 transition-all ${
                  isOpen
                    ? "border-amber-500/30 bg-slate-800"
                    : isInProgress
                    ? "border-sky-500/30 bg-slate-800"
                    : "border-slate-700/60 opacity-80"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 border-b border-slate-700/60 pb-3">
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                          isOpen
                            ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                            : isInProgress
                            ? "bg-sky-500/15 text-sky-400 border border-sky-500/30"
                            : "bg-amber-500/15 text-amber-500 border border-amber-500/30"
                        }`}
                      >
                        {t.status.replace("_", " ")}
                      </span>
                      <h4 className="text-sm font-bold text-white truncate">{t.subject}</h4>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-400 pt-0.5">
                      <span className="flex items-center gap-1 text-slate-300">
                        <User className="h-3 w-3 text-slate-500" />
                        {t.user_name || "Student"}
                      </span>
                      {t.user_email && (
                        <span className="flex items-center gap-1 font-mono text-[11px]">
                          <Mail className="h-3 w-3 text-slate-500" />
                          {t.user_email}
                        </span>
                      )}
                      <span className="flex items-center gap-1 font-mono text-[11px] text-slate-500">
                        <Clock className="h-3 w-3" />
                        {new Date(t.created_at).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setReplyingTicket(t);
                      setReplyMessage(t.admin_reply || "");
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-700/80 hover:bg-[#D6E85D] hover:text-[#183F36] text-white text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto shrink-0 transition-colors"
                  >
                    <Reply className="h-3.5 w-3.5" />
                    <span>{t.admin_reply ? "Edit Reply" : "Reply & Resolve"}</span>
                  </button>
                </div>

                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-700/40 text-xs text-slate-200">
                  <p className="whitespace-pre-wrap leading-relaxed">{t.message}</p>

                  {t.admin_reply && (
                    <div className="mt-2.5 pt-2 border-t border-slate-800">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#D6E85D] block mb-0.5">
                        Admin Resolution:
                      </span>
                      <p className="text-slate-300 text-xs italic">{t.admin_reply}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* 3. Reply Modal */}
      {replyingTicket && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleSendReply}
            className="bg-slate-800 border border-slate-700 rounded-3xl w-full max-w-lg p-6 space-y-4 shadow-2xl relative animate-scale-in"
          >
            <button
              type="button"
              onClick={() => setReplyingTicket(null)}
              className="absolute right-4 top-4 p-1.5 rounded-xl bg-slate-700/60 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400">
                Support Ticket Resolution
              </span>
              <h3 className="text-base font-bold text-white mt-0.5">
                Reply to {replyingTicket.user_name || "Student"}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5 font-mono">
                Subject: {replyingTicket.subject}
              </p>
            </div>

            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-700 text-xs text-slate-300 max-h-32 overflow-y-auto">
              {replyingTicket.message}
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Official Admin Response
              </label>
              <textarea
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                rows={4}
                placeholder="Write clear instructions, solved link, or syllabus clarification..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D6E85D]"
                required
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Set Ticket Status:</span>
                <select
                  value={nextStatus}
                  onChange={(e) => setNextStatus(e.target.value as any)}
                  className="bg-slate-900 border border-slate-700 rounded-lg text-xs text-white px-2 py-1"
                >
                  <option value="resolved">Resolved</option>
                  <option value="in_progress">In Progress</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setReplyingTicket(null)}
                  className="px-3 py-1.5 rounded-xl bg-slate-700 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={sending}
                  className="px-4 py-1.5 rounded-xl bg-[#D6E85D] hover:bg-[#c8dc4e] text-[#183F36] text-xs font-black shadow-md flex items-center gap-1.5"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>{sending ? "Sending..." : "Dispatch Reply"}</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
