import { useState } from "react";
import { X, Send, Sparkles, FileText, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { useGamification } from "@/hooks/useGamification";

interface StudentContributionModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultSubjectId?: string;
}

export function StudentContributionModal({
  isOpen,
  onClose,
  defaultSubjectId = "dsa",
}: StudentContributionModalProps) {
  const { user, profile } = useAuth();
  const { addXp } = useGamification();

  const [subjectId, setSubjectId] = useState(defaultSubjectId);
  const [unitNumber, setUnitNumber] = useState<number>(1);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [contentType, setContentType] = useState<"note" | "code" | "cheat_sheet">("note");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("Please fill in title and markdown content.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      // Store in localStorage contributions queue
      const existingRaw = localStorage.getItem("itm_student_contributions");
      const list = existingRaw ? JSON.parse(existingRaw) : [];

      const contribution = {
        id: `contrib-${Date.now()}`,
        studentName: profile?.display_name || user?.email?.split("@")[0] || "Student",
        studentEmail: user?.email,
        subjectId,
        unitNumber,
        title: title.trim(),
        content: content.trim(),
        contentType,
        status: "pending",
        submittedAt: new Date().toISOString(),
      };

      list.unshift(contribution);
      localStorage.setItem("itm_student_contributions", JSON.stringify(list));

      addXp(50); // Immediate participation reward
      toast.success("Contribution submitted to faculty review!", {
        description: "+50 XP awarded! You'll receive another +200 XP when approved.",
      });

      setIsSubmitting(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg bg-card border border-border rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#183F36] via-[#1D4A3F] to-[#12332C] text-white flex items-center justify-between border-b border-[#D6E85D]/30 shrink-0">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-[#D6E85D] text-[#183F36]">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-white font-display">
                Contribute Notes or Code
              </h3>
              <p className="text-[11px] text-[#A2BAAF]">
                Earn up to +250 XP and get recognized as a Campus Topper
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 overflow-y-auto max-h-[75vh]">
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label className="font-bold text-foreground block mb-1">Subject</label>
              <select
                value={subjectId}
                onChange={(e) => setSubjectId(e.target.value)}
                className="w-full h-9 rounded-xl border border-input bg-secondary/30 px-2.5 text-xs text-foreground focus:ring-1 focus:ring-primary"
              >
                <option value="oopj">Java (OOPJ · C2311C1)</option>
                <option value="dsa">Data Structures (DSA · C2310C5)</option>
                <option value="ca">Computer Architecture (CA · C2310C2)</option>
                <option value="dbms">Database Systems (DBMS · C2311C4)</option>
                <option value="conmp">Numerical Python (CONMP · S2320C1)</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-foreground block mb-1">Unit Number</label>
              <select
                value={unitNumber}
                onChange={(e) => setUnitNumber(Number(e.target.value))}
                className="w-full h-9 rounded-xl border border-input bg-secondary/30 px-2.5 text-xs text-foreground focus:ring-1 focus:ring-primary"
              >
                {[1, 2, 3, 4, 5, 6].map((u) => (
                  <option key={u} value={u}>Unit {u}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="font-bold text-xs text-foreground block mb-1">Topic Title / Concept Name</label>
            <input
              type="text"
              placeholder="e.g. Quick Sort Hoare Partitioning with Trace Table"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full h-10 px-3 rounded-xl border border-input bg-secondary/30 text-xs text-foreground focus:ring-1 focus:ring-primary outline-none"
              required
            />
          </div>

          <div>
            <label className="font-bold text-xs text-foreground block mb-1">Content / Code (Markdown supported)</label>
            <textarea
              placeholder="Write clear explanation, definitions, C/Java code snippets, or exam viva tips..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-36 p-3 rounded-xl border border-input bg-secondary/30 text-xs text-foreground focus:ring-1 focus:ring-primary outline-none resize-none font-mono"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-10 rounded-xl bg-[#183F36] hover:bg-[#12332C] text-[#D6E85D] font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-[#183F36]/20 cursor-pointer font-display"
          >
            <Send className="h-4 w-4" />
            <span>{isSubmitting ? "Submitting..." : "Submit for Faculty Approval (+50 XP)"}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
