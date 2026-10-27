import { useState, useEffect, useMemo } from "react";
import {
  Clock,
  Filter,
  RefreshCw,
  Search,
  Shield,
  FileText,
  User,
  Eye,
  X,
  Lock,
} from "lucide-react";
import {
  AuditLogItem,
  fetchAuditLogs,
} from "@/services/adminOperationsService";
import { toast } from "sonner";

export function AdminAuditLogsTab() {
  const [logs, setLogs] = useState<AuditLogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionFilter, setActionFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedLog, setSelectedLog] = useState<AuditLogItem | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchAuditLogs();
      setLogs(data);
    } catch {
      toast.error("Failed to load audit logs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const availableActionTypes = useMemo(() => {
    const set = new Set<string>();
    logs.forEach((l) => set.add(l.action_type));
    return Array.from(set);
  }, [logs]);

  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const q = search.trim().toLowerCase();
      const matchesSearch =
        !q ||
        log.admin_email.toLowerCase().includes(q) ||
        log.action_type.toLowerCase().includes(q) ||
        log.target_type.toLowerCase().includes(q);

      const matchesAction = actionFilter === "all" || log.action_type === actionFilter;

      return matchesSearch && matchesAction;
    });
  }, [logs, search, actionFilter]);

  return (
    <div className="space-y-5 animate-fade-in">
      {/* 1. Header controls */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2.5">
        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search audit trail by admin email or target type…"
            className="w-full pl-9 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#FAFAFA]/60"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-slate-800 border border-slate-700 px-2.5 py-1.5 rounded-xl text-xs text-slate-300">
            <Filter className="h-3 w-3 text-slate-400" />
            <select
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value)}
              className="bg-transparent text-white focus:outline-none cursor-pointer max-w-[160px] truncate"
            >
              <option value="all" className="bg-slate-800">All Action Types</option>
              {availableActionTypes.map((t) => (
                <option key={t} value={t} className="bg-slate-800">
                  {t}
                </option>
              ))}
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

      {/* 2. Audit Trail List */}
      <div className="space-y-3">
        {loading ? (
          <div className="py-12 text-center text-slate-500 text-sm">Loading security audit trail…</div>
        ) : filteredLogs.length === 0 ? (
          <div className="py-12 text-center text-slate-400 text-sm bg-slate-800 border border-slate-700 rounded-2xl">
            <Lock className="h-8 w-8 text-slate-500 mx-auto mb-2 opacity-60" />
            <p className="font-bold text-white">No Audit Events Logged</p>
            <p className="text-xs text-slate-400 mt-1">Admin actions will appear here in chronological order.</p>
          </div>
        ) : (
          filteredLogs.map((log) => (
            <div
              key={log.id}
              className="bg-slate-800 border border-slate-700 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-sm hover:border-slate-600 transition-colors"
            >
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#FAFAFA]/15 text-[#FAFAFA] border border-[#FAFAFA]/30">
                    {log.action_type}
                  </span>
                  <span className="font-mono text-slate-400 text-[11px]">
                    Target: {log.target_type} {log.target_id ? `(${log.target_id})` : ""}
                  </span>
                </div>

                <div className="flex items-center gap-3 pt-1 text-slate-300 text-xs">
                  <span className="flex items-center gap-1 text-white font-medium">
                    <User className="h-3 w-3 text-slate-500" />
                    {log.admin_email}
                  </span>
                  <span className="text-slate-500 flex items-center gap-1 font-mono text-[11px]">
                    <Clock className="h-3 w-3" />
                    {new Date(log.created_at).toLocaleString()}
                  </span>
                </div>
              </div>

              {log.details && Object.keys(log.details).length > 0 && (
                <button
                  onClick={() => setSelectedLog(log)}
                  className="px-3 py-1.5 rounded-xl bg-slate-700/60 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 self-start sm:self-auto shrink-0 transition-colors"
                >
                  <Eye className="h-3.5 w-3.5" />
                  <span>Inspect Payload</span>
                </button>
              )}
            </div>
          ))
        )}
      </div>

      {/* 3. Detail Payload Modal */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-3xl w-full max-w-lg p-6 space-y-4 shadow-2xl relative animate-scale-in">
            <button
              onClick={() => setSelectedLog(null)}
              className="absolute right-4 top-4 p-1.5 rounded-xl bg-slate-700/60 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            <div>
              <span className="text-[10px] font-mono uppercase text-[#FAFAFA]">
                {selectedLog.action_type}
              </span>
              <h3 className="text-base font-bold text-white mt-0.5">
                Audit Event Metadata
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Logged by {selectedLog.admin_email} at {new Date(selectedLog.created_at).toLocaleString()}
              </p>
            </div>

            <pre className="bg-slate-900 border border-slate-950 rounded-2xl p-4 font-mono text-xs text-slate-300 max-h-60 overflow-y-auto whitespace-pre-wrap">
              {JSON.stringify(selectedLog.details, null, 2)}
            </pre>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedLog(null)}
                className="px-4 py-2 rounded-xl bg-slate-700 text-slate-200 text-xs font-semibold hover:bg-slate-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
