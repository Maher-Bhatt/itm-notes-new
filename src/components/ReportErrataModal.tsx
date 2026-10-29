import { useState } from "react";
import { AlertCircle, X, Send, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { useGamification } from "@/hooks/useGamification";

interface ReportErrataModalProps {
  isOpen: boolean;
  onClose: () => void;
  topicId?: string;
  topicTitle?: string;
  selectedText?: string;
}

export function ReportErrataModal({
  isOpen,
  onClose,
  topicId,
  topicTitle,
  selectedText = "",
}: ReportErrataModalProps) {
  const { user } = useAuth();
  const { addXp } = useGamification();

  const [issueType, setIssueType] = useState<"code_bug" | "typo" | "wrong_answer" | "broken_formula">("code_bug");
  const [description, setDescription] = useState("");
  const [suggestedFix, setSuggestedFix] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      toast.error("Please explain what is incorrect.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      // Store in localStorage errata reports queue
      const existingRaw = localStorage.getItem("itm_errata_reports");
      const list = existingRaw ? JSON.parse(existingRaw) : [];

      const report = {
        id: `errata-${Date.now()}`,
        topicId: topicId || "global",
        topicTitle: topicTitle || "General",
        selectedText: selectedText.trim(),
        issueType,
        description: description.trim(),
        suggestedFix: suggestedFix.trim(),
        reportedBy: user?.email || "anonymous_student",
        status: "open",
        createdAt: new Date().toISOString(),
      };

      list.unshift(report);
      localStorage.setItem("itm_errata_reports", JSON.stringify(list));

      addXp(25); // Errata reward
      toast.success("Error report received! Thank you for improving CampusLoop.", {
        description: "+25 XP awarded to your academic profile.",
      });

      setIsSubmitting(false);
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-card border border-border rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 bg-amber-500/10 border-b border-amber-500/20 text-foreground flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500 text-white">
              <AlertCircle className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-foreground">
                Report Error or Errata
              </h3>
              <p className="text-[11px] text-muted-foreground">
                Help us keep all notes 100% exam-accurate (+25 XP)
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-3.5 text-xs">
          {topicTitle && (
            <div className="p-2.5 rounded-xl bg-secondary/40 border border-border">
              <span className="text-[10px] text-muted-foreground uppercase font-bold block">Topic:</span>
              <span className="font-bold text-foreground">{topicTitle}</span>
            </div>
          )}

          {selectedText && (
            <div>
              <label className="font-bold text-foreground block mb-1">Highlighted Excerpt</label>
              <div className="p-2.5 rounded-xl bg-secondary/50 border border-border/70 font-mono text-[11px] text-muted-foreground line-clamp-3">
                "{selectedText}"
              </div>
            </div>
          )}

          <div>
            <label className="font-bold text-foreground block mb-1">Issue Category</label>
            <select
              value={issueType}
              onChange={(e) => setIssueType(e.target.value as any)}
              className="w-full h-9 rounded-xl border border-input bg-secondary/30 px-2.5 text-xs text-foreground focus:ring-1 focus:ring-primary"
            >
              <option value="code_bug">Code Bug or Syntax Error</option>
              <option value="wrong_answer">Incorrect University Answer</option>
              <option value="broken_formula">Broken Math / KaTeX Formula</option>
              <option value="typo">Spelling or Grammatical Typo</option>
            </select>
          </div>

          <div>
            <label className="font-bold text-foreground block mb-1">What is incorrect?</label>
            <textarea
              placeholder="Explain what is wrong or misleading in the current notes..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full h-20 p-2.5 rounded-xl border border-input bg-secondary/30 text-xs text-foreground focus:ring-1 focus:ring-primary outline-none resize-none"
              required
            />
          </div>

          <div>
            <label className="font-bold text-foreground block mb-1">Suggested Correction (Optional)</label>
            <input
              type="text"
              placeholder="e.g. In line 4, change rear = rear + 1 to (rear + 1) % MAX"
              value={suggestedFix}
              onChange={(e) => setSuggestedFix(e.target.value)}
              className="w-full h-9 px-3 rounded-xl border border-input bg-secondary/30 text-xs text-foreground focus:ring-1 focus:ring-primary outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-9 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-amber-500/20 cursor-pointer"
          >
            <Send className="h-3.5 w-3.5" />
            <span>{isSubmitting ? "Submitting..." : "Send Error Report"}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
