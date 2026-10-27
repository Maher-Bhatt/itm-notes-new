import { useState, useEffect } from "react";
import {
  Wrench,
  Power,
  Clock,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Copy,
  Check,
  Shield,
  Layers,
  History,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { logAdminAction } from "@/services/adminOperationsService";

export interface MaintenanceWindow {
  id: string;
  start_time: string;
  end_time: string;
  reason: string;
  affected_areas: string[];
  is_active: boolean;
  created_at: string;
}

interface AdminMaintenanceTabProps {
  maintenanceOn: boolean;
  maintenanceMessage: string;
  maintenanceKey: string;
  onToggleMaintenance: (on: boolean, msg: string, key: string) => Promise<void>;
}

export function AdminMaintenanceTab({
  maintenanceOn,
  maintenanceMessage,
  maintenanceKey,
  onToggleMaintenance,
}: AdminMaintenanceTabProps) {
  const [reason, setReason] = useState(maintenanceMessage || "Scheduled server infrastructure upgrade.");
  const [copiedKey, setCopiedKey] = useState(false);
  const [windows, setWindows] = useState<MaintenanceWindow[]>(() => {
    try {
      const raw = localStorage.getItem("itm_maintenance_windows");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // Scheduled window form
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [scheduleReason, setScheduleReason] = useState("");
  const [affectedArea, setAffectedArea] = useState("all");

  const loadWindows = async () => {
    try {
      const { data } = await supabase
        .from("maintenance_windows")
        .select("*")
        .order("start_time", { ascending: false });

      if (data && data.length > 0) {
        setWindows(data as MaintenanceWindow[]);
        localStorage.setItem("itm_maintenance_windows", JSON.stringify(data));
      }
    } catch {}
  };

  useEffect(() => {
    loadWindows();
  }, []);

  const handleManualToggle = async () => {
    const nextState = !maintenanceOn;
    try {
      await onToggleMaintenance(nextState, reason, maintenanceKey);
      await logAdminAction(
        nextState ? "MAINTENANCE_ENABLED" : "MAINTENANCE_DISABLED",
        "maintenance_mode",
        undefined,
        { reason }
      );
      toast.success(nextState ? "Maintenance mode activated" : "Maintenance mode deactivated");
    } catch {
      toast.error("Failed to toggle maintenance mode");
    }
  };

  const handleAddWindow = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!startTime || !endTime || !scheduleReason.trim()) {
      toast.error("Please fill in start time, end time, and maintenance reason");
      return;
    }

    const newWindow: MaintenanceWindow = {
      id: `mwin-${Date.now()}`,
      start_time: startTime,
      end_time: endTime,
      reason: scheduleReason.trim(),
      affected_areas: [affectedArea],
      is_active: true,
      created_at: new Date().toISOString(),
    };

    try {
      await supabase.from("maintenance_windows").insert(newWindow);
    } catch {}

    const updated = [newWindow, ...windows];
    setWindows(updated);
    localStorage.setItem("itm_maintenance_windows", JSON.stringify(updated));

    await logAdminAction("MAINTENANCE_WINDOW_SCHEDULE", "maintenance_window", newWindow.id, {
      start_time: startTime,
      end_time: endTime,
      reason: scheduleReason,
    });

    toast.success("Maintenance window scheduled successfully");
    setStartTime("");
    setEndTime("");
    setScheduleReason("");
  };

  const handleDeleteWindow = async (id: string) => {
    try {
      await supabase.from("maintenance_windows").delete().eq("id", id);
    } catch {}
    const updated = windows.filter((w) => w.id !== id);
    setWindows(updated);
    localStorage.setItem("itm_maintenance_windows", JSON.stringify(updated));
    toast.info("Maintenance window removed");
  };

  const copyKey = () => {
    navigator.clipboard.writeText(maintenanceKey);
    setCopiedKey(true);
    toast.success("Admin bypass key copied!");
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      {/* 1. Emergency Killswitch Card */}
      <div className="bg-slate-800 border border-slate-700 rounded-3xl p-5 sm:p-6 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-700">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Power className={`h-5 w-5 ${maintenanceOn ? "text-amber-400" : "text-amber-500"}`} />
              Emergency Site Maintenance Killswitch
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Instantly lock student views behind a maintenance screen with admin bypass.
            </p>
          </div>

          <button
            onClick={handleManualToggle}
            className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all shadow-md active:scale-95 ${
              maintenanceOn
                ? "bg-amber-500 hover:bg-amber-500 text-slate-950"
                : "bg-amber-500 hover:bg-amber-400 text-slate-950"
            }`}
          >
            {maintenanceOn ? "Deactivate Maintenance" : "Activate Maintenance Mode"}
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Student Public Banner Message
            </label>
            <input
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g. System upgrading for Mid-term results release. Back online at 6 PM."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D6E85D]"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/60 p-3.5 rounded-2xl border border-slate-700/60 text-xs">
            <div className="space-y-0.5">
              <span className="text-[10px] uppercase font-bold text-slate-400">
                Admin Bypass Access Key
              </span>
              <p className="font-mono text-amber-400 font-bold text-xs">{maintenanceKey}</p>
            </div>
            <button
              onClick={copyKey}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center gap-1.5 self-start sm:self-auto"
            >
              {copiedKey ? <Check className="h-3.5 w-3.5 text-amber-500" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copiedKey ? "Copied" : "Copy Bypass Key"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Scheduled Maintenance Windows */}
      <div className="bg-slate-800 border border-slate-700 rounded-3xl p-5 sm:p-6 space-y-5 shadow-xl">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-700">
          <Calendar className="h-5 w-5 text-[#D6E85D]" />
          <div>
            <h3 className="text-sm font-bold text-white">Scheduled Maintenance Windows</h3>
            <p className="text-[11px] text-slate-400">Pre-schedule planned downtime with affected subsystem targeting</p>
          </div>
        </div>

        <form onSubmit={handleAddWindow} className="space-y-3 bg-slate-900/60 p-4 rounded-2xl border border-slate-700/60">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Start Time
              </label>
              <input
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D6E85D]"
                required
              />
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Estimated End Time
              </label>
              <input
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D6E85D]"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Maintenance Reason / Description
              </label>
              <input
                value={scheduleReason}
                onChange={(e) => setScheduleReason(e.target.value)}
                placeholder="e.g. Database schema migration for question bank indexing"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D6E85D]"
                required
              />
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Target Subsystem
              </label>
              <select
                value={affectedArea}
                onChange={(e) => setAffectedArea(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D6E85D]"
              >
                <option value="all">Entire Platform (All Pages)</option>
                <option value="coding_lab">Coding Lab Only</option>
                <option value="community">Community Forum Only</option>
                <option value="quizzes">Quizzes & Mock Exams</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-[#D6E85D] hover:bg-[#c8dc4e] text-[#183F36] text-xs font-black shadow-md cursor-pointer"
            >
              Add Scheduled Window
            </button>
          </div>
        </form>

        {/* Existing Windows List */}
        <div className="space-y-3 pt-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <History className="h-3.5 w-3.5 text-slate-500" />
            Scheduled & Past Windows
          </h4>

          {windows.length === 0 ? (
            <p className="text-xs text-slate-500 py-4 text-center">No maintenance windows scheduled.</p>
          ) : (
            windows.map((win) => {
              const now = new Date();
              const isPast = new Date(win.end_time) < now;
              const isLive = new Date(win.start_time) <= now && new Date(win.end_time) >= now;

              return (
                <div
                  key={win.id}
                  className="bg-slate-900/60 border border-slate-700/60 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      {isLive ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-ping" />
                          Live Downtime Now
                        </span>
                      ) : isPast ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-400">
                          Completed
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-500/15 text-sky-400 border border-sky-500/30">
                          Upcoming Scheduled
                        </span>
                      )}

                      <span className="font-bold text-white">{win.reason}</span>
                    </div>

                    <div className="text-[11px] text-slate-400 font-mono flex items-center gap-3">
                      <span>{new Date(win.start_time).toLocaleString()} → {new Date(win.end_time).toLocaleString()}</span>
                      <span className="text-slate-500">[{win.affected_areas.join(", ")}]</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteWindow(win.id)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400 self-end sm:self-auto transition-colors"
                    title="Remove window"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
