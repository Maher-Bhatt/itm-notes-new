import { useState, useEffect, useMemo } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Filter,
  RefreshCw,
  Search,
  Laptop,
  Smartphone,
  Copy,
  Check,
  Eye,
  X,
  ShieldAlert,
} from "lucide-react";
import {
  ClientErrorItem,
  fetchClientErrors,
  resolveClientError,
} from "@/services/clientErrorService";
import { toast } from "sonner";

export function AdminErrorsTab() {
  const [errors, setErrors] = useState<ClientErrorItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [routeFilter, setRouteFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "unresolved" | "resolved">("all");
  const [search, setSearch] = useState("");
  const [selectedError, setSelectedError] = useState<ClientErrorItem | null>(null);
  const [copied, setCopied] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchClientErrors();
      setErrors(data);
    } catch {
      toast.error("Could not load client error logs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Distinct routes
  const availableRoutes = useMemo(() => {
    const set = new Set<string>();
    errors.forEach((e) => {
      if (e.route) set.add(e.route);
    });
    return Array.from(set);
  }, [errors]);

  const filteredErrors = useMemo(() => {
    return errors.filter((e) => {
      const q = search.trim().toLowerCase();
      const matchesSearch =
        !q ||
        e.message.toLowerCase().includes(q) ||
        e.route.toLowerCase().includes(q) ||
        (e.stack && e.stack.toLowerCase().includes(q));

      const matchesRoute = routeFilter === "all" || e.route === routeFilter;
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "unresolved" ? e.status !== "resolved" : e.status === "resolved");

      return matchesSearch && matchesRoute && matchesStatus;
    });
  }, [errors, search, routeFilter, statusFilter]);

  const unresolvedCount = useMemo(
    () => errors.filter((e) => e.status !== "resolved").length,
    [errors]
  );

  const handleResolve = async (errItem: ClientErrorItem) => {
    try {
      await resolveClientError(errItem.id);
      setErrors((prev) =>
        prev.map((e) =>
          e.id === errItem.id
            ? { ...e, status: "resolved", resolved_at: new Date().toISOString() }
            : e
        )
      );
      if (selectedError?.id === errItem.id) {
        setSelectedError({
          ...selectedError,
          status: "resolved",
          resolved_at: new Date().toISOString(),
        });
      }
      toast.success("Error marked as resolved");
    } catch {
      toast.error("Failed to update status");
    }
  };

  const copyStackToClipboard = () => {
    if (!selectedError?.stack) return;
    navigator.clipboard.writeText(
      `Route: ${selectedError.route}\nMessage: ${selectedError.message}\nDevice: ${JSON.stringify(selectedError.device_info)}\n\n${selectedError.stack}`
    );
    setCopied(true);
    toast.success("Stack trace copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-5 animate-fade-in">
      {/* 1. Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0">
            <ShieldAlert className="h-5 w-5 text-red-400" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wide">
              Unresolved Crashes
            </p>
            <p className="text-xl font-extrabold text-white">{unresolvedCount}</p>
          </div>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
            <AlertTriangle className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wide">
              Total Logged Exceptions
            </p>
            <p className="text-xl font-extrabold text-white">{errors.length}</p>
          </div>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wide">
              Unique Fault Routes
            </p>
            <p className="text-xl font-extrabold text-white">{availableRoutes.length}</p>
          </div>
        </div>
      </div>

      {/* 2. Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2.5">
        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search error message, stack, or path…"
            className="w-full pl-9 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#D6E85D]/60"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 bg-slate-800 border border-slate-700 px-2.5 py-1.5 rounded-xl text-xs text-slate-300">
            <Filter className="h-3 w-3 text-slate-400" />
            <select
              value={routeFilter}
              onChange={(e) => setRouteFilter(e.target.value)}
              className="bg-transparent text-white focus:outline-none cursor-pointer max-w-[140px] truncate"
            >
              <option value="all" className="bg-slate-800">All Routes</option>
              {availableRoutes.map((r) => (
                <option key={r} value={r} className="bg-slate-800">
                  {r}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-800 border border-slate-700 px-2.5 py-1.5 rounded-xl text-xs text-slate-300">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="bg-transparent text-white focus:outline-none cursor-pointer"
            >
              <option value="all" className="bg-slate-800">All Status</option>
              <option value="unresolved" className="bg-slate-800">Unresolved Only</option>
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

      {/* 3. Error Items List */}
      <div className="space-y-3">
        {loading ? (
          <div className="py-12 text-center text-slate-500 text-sm">Loading client errors…</div>
        ) : filteredErrors.length === 0 ? (
          <div className="py-12 text-center text-slate-400 text-sm bg-slate-800 border border-slate-700 rounded-2xl">
            <CheckCircle2 className="h-8 w-8 text-emerald-400 mx-auto mb-2 opacity-80" />
            <p className="font-bold text-white">Clean Error Inbox</p>
            <p className="text-xs text-slate-400 mt-1">No active frontend crashes recorded for this filter.</p>
          </div>
        ) : (
          filteredErrors.map((err) => {
            const isUnresolved = err.status !== "resolved";
            const isMobile = err.device_info?.width && err.device_info.width < 768;

            return (
              <div
                key={err.id}
                className={`bg-slate-800 border rounded-2xl p-4 transition-all shadow-sm ${
                  isUnresolved ? "border-amber-500/30 bg-slate-800" : "border-slate-700/60 opacity-75"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs px-2 py-0.5 rounded-md bg-slate-900 border border-slate-700 text-[#D6E85D] font-bold">
                        {err.route}
                      </span>
                      {isUnresolved ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-red-500/15 text-red-400 border border-red-500/30">
                          Unresolved
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                          Resolved
                        </span>
                      )}
                      <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                        <Clock className="h-3 w-3" />
                        {new Date(err.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} · {new Date(err.created_at).toLocaleDateString()}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white font-mono break-all sm:break-normal line-clamp-2 pt-1">
                      {err.message}
                    </h4>

                    <div className="flex items-center gap-3 pt-1 text-[11px] text-slate-400 flex-wrap">
                      <span className="flex items-center gap-1">
                        {isMobile ? <Smartphone className="h-3.5 w-3.5 text-slate-500" /> : <Laptop className="h-3.5 w-3.5 text-slate-500" />}
                        {err.device_info?.width}×{err.device_info?.height}px
                      </span>
                      <span className="truncate max-w-[240px] text-slate-500">
                        {err.device_info?.userAgent || "Browser"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-700/60 justify-end">
                    <button
                      onClick={() => setSelectedError(err)}
                      className="px-3 py-1.5 rounded-xl bg-slate-700/60 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>Inspect Stack</span>
                    </button>
                    {isUnresolved && (
                      <button
                        onClick={() => handleResolve(err)}
                        className="px-3 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-1.5 transition-colors"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>Mark Resolved</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* 4. Inspect Stack Modal */}
      {selectedError && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-3xl w-full max-w-2xl p-6 space-y-4 shadow-2xl relative animate-scale-in">
            <button
              onClick={() => setSelectedError(null)}
              className="absolute right-4 top-4 p-1.5 rounded-xl bg-slate-700/60 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs px-2.5 py-0.5 rounded-md bg-[#D6E85D]/10 text-[#D6E85D] font-bold border border-[#D6E85D]/30">
                  {selectedError.route}
                </span>
                <span className="text-xs text-slate-400">
                  {new Date(selectedError.created_at).toLocaleString()}
                </span>
              </div>
              <h3 className="text-base font-bold text-white font-mono break-words">
                {selectedError.message}
              </h3>
            </div>

            <div className="bg-slate-900 border border-slate-950 rounded-2xl p-4 overflow-hidden relative">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2">
                <span className="text-[10px] font-mono uppercase text-slate-400">Stack Trace</span>
                <button
                  onClick={copyStackToClipboard}
                  className="flex items-center gap-1 text-[11px] text-slate-300 hover:text-white font-medium bg-slate-800 px-2 py-1 rounded-md"
                >
                  {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                  <span>{copied ? "Copied" : "Copy Stack"}</span>
                </button>
              </div>
              <pre className="font-mono text-xs text-red-300/90 whitespace-pre-wrap max-h-72 overflow-y-auto leading-relaxed select-all">
                {selectedError.stack || "No call stack captured."}
              </pre>
            </div>

            <div className="bg-slate-900/40 p-3 rounded-xl border border-slate-700/60 text-xs text-slate-400 space-y-1">
              <p><span className="text-slate-500">Device Screen:</span> {selectedError.device_info?.width} × {selectedError.device_info?.height}px</p>
              <p className="truncate"><span className="text-slate-500">User Agent:</span> {selectedError.device_info?.userAgent}</p>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              {selectedError.status !== "resolved" && (
                <button
                  onClick={() => handleResolve(selectedError)}
                  className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Mark as Resolved</span>
                </button>
              )}
              <button
                onClick={() => setSelectedError(null)}
                className="px-4 py-2 rounded-xl bg-slate-700 text-slate-200 text-xs font-semibold hover:bg-slate-600 transition-colors"
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
