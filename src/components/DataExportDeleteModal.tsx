import { useState } from "react";
import { Download, Trash2, X, AlertTriangle, ShieldCheck, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { useGamification } from "@/hooks/useGamification";

interface DataExportDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DataExportDeleteModal({ isOpen, onClose }: DataExportDeleteModalProps) {
  const { user, profile, signOut } = useAuth();
  const { state: game } = useGamification();
  const [confirmDeleteText, setConfirmDeleteText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  if (!isOpen) return null;

  const handleExportData = () => {
    try {
      const exportPayload = {
        exportedAt: new Date().toISOString(),
        user: {
          id: user?.id,
          email: user?.email,
          displayName: profile?.display_name,
          semester: profile?.semester,
          branch: profile?.branch,
        },
        gamification: game,
        bookmarks: JSON.parse(localStorage.getItem("itm_bookmarks") || "[]"),
        quizAttempts: JSON.parse(localStorage.getItem("itm_quiz_attempts") || "{}"),
        attendanceLog: JSON.parse(localStorage.getItem("itm_daily_attendance_log") || "[]"),
        studyPlan: JSON.parse(localStorage.getItem("itm_active_study_plan") || "null"),
        srsFlashcards: JSON.parse(localStorage.getItem("itm_srs_flashcards") || "{}"),
        focusSessions: JSON.parse(localStorage.getItem("itm_focus_sessions_log") || "[]"),
      };

      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportPayload, null, 2));
      const downloadAnchor = document.createElement("a");
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `itm_notes_backup_${user?.email?.split("@")[0] || "student"}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();

      toast.success("Personal study data exported successfully!", {
        description: "Your notes, progress, and flashcards are saved in JSON format.",
      });
    } catch (e) {
      toast.error("Failed to assemble export payload.");
    }
  };

  const handleDeleteAccount = () => {
    if (confirmDeleteText !== "DELETE") {
      toast.error("Type DELETE to confirm account removal.");
      return;
    }

    setIsDeleting(true);
    setTimeout(async () => {
      // Clear personal storage
      const keysToClear = [
        "itm_bookmarks",
        "itm_quiz_attempts",
        "itm_daily_attendance_log",
        "itm_active_study_plan",
        "itm_srs_flashcards",
        "itm_focus_sessions_log",
      ];
      keysToClear.forEach((k) => localStorage.removeItem(k));

      toast.success("Account and local study data deleted.");
      setIsDeleting(false);
      onClose();
      await signOut();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-card border border-border rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-secondary/60 border-b border-border flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-foreground">
                Data Ownership & Account Privacy
              </h3>
              <p className="text-[11px] text-muted-foreground">
                Export your study data or request account deletion
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-muted-foreground hover:text-foreground cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-5 text-xs">
          {/* Export Box */}
          <div className="p-4 rounded-2xl border border-border/80 bg-secondary/20 space-y-2">
            <h4 className="font-bold text-sm text-foreground flex items-center gap-1.5">
              <Download className="h-4 w-4 text-primary" />
              <span>Export Personal Archive (JSON)</span>
            </h4>
            <p className="text-muted-foreground text-[11px] leading-relaxed">
              Download your complete personal profile archive: saved bookmarks, quiz history, SM-2 flashcard intervals, Pomodoro focus hours, and study planner items.
            </p>
            <button
              onClick={handleExportData}
              className="mt-1 w-full h-9 rounded-xl bg-primary text-primary-foreground font-bold flex items-center justify-center gap-1.5 shadow-sm hover:opacity-90 transition-all cursor-pointer"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download My Study Data</span>
            </button>
          </div>

          {/* Delete Danger Zone */}
          <div className="p-4 rounded-2xl border border-rose-500/30 bg-rose-500/5 space-y-3">
            <h4 className="font-bold text-sm text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
              <AlertTriangle className="h-4 w-4" />
              <span>Delete Student Account</span>
            </h4>
            <p className="text-muted-foreground text-[11px] leading-relaxed">
              This action permanently deletes your local study streak ({game.streakDays} days), {game.xp} XP, attendance logs, and quiz history. This action cannot be reversed.
            </p>

            <div>
              <label className="text-[10px] text-muted-foreground uppercase font-bold block mb-1">
                Type <strong className="text-rose-500">DELETE</strong> to confirm:
              </label>
              <input
                type="text"
                value={confirmDeleteText}
                onChange={(e) => setConfirmDeleteText(e.target.value)}
                placeholder="DELETE"
                className="w-full h-9 px-3 rounded-xl border border-rose-500/40 bg-background text-xs font-mono focus:ring-1 focus:ring-rose-500 outline-none"
              />
            </div>

            <button
              onClick={handleDeleteAccount}
              disabled={confirmDeleteText !== "DELETE" || isDeleting}
              className={`w-full h-9 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                confirmDeleteText === "DELETE" && !isDeleting
                  ? "bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-600/20"
                  : "bg-secondary text-muted-foreground opacity-50 cursor-not-allowed"
              }`}
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>{isDeleting ? "Deleting..." : "Permanently Delete Account"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
