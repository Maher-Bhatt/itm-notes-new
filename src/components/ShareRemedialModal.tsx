import React, { useState } from "react";
import {
  X,
  Share2,
  Copy,
  Check,
  Send,
  ExternalLink,
  QrCode,
  Sparkles,
  Flame,
  MessageCircle,
} from "lucide-react";
import { toast } from "sonner";

interface ShareRemedialModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  url?: string;
}

export function ShareRemedialModal({
  isOpen,
  onClose,
  title = "OOPJ Remedial Special: Units 2 & 3 Zero-to-Hero Notes & Solved Question Bank",
  url = typeof window !== "undefined" ? window.location.href : "https://itm-notes-new.vercel.app/imp-questions/oopj",
}: ShareRemedialModalProps) {
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);

  if (!isOpen) return null;

  const targetUrl = typeof window !== "undefined" ? window.location.href : url;

  const shareText = `🔥 *ITM University OOPJ (C2311C1) Remedial Special Pass Guide!*

Complete Units 2 & 3 Zero-to-Hero Notes + 30-Page Solved Question Bank:
✅ 5 Predict the Output with Call Stack Traces
✅ 15 Long Answer 5-Mark Coding Solutions
✅ 18 Theory 3-Mark Questions & Comparison Tables
✅ Complete Syllabus Theory from Scratch (Classes to Dynamic Dispatch)
✅ Exam Blueprint & Rapid MCQ Revision

Pass guaranteed even starting from zero! Read here:
${targetUrl}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(targetUrl);
      setCopied(true);
      toast.success("Link copied to clipboard!", {
        description: "Ready to paste in WhatsApp, Telegram, or Discord.",
      });
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error("Failed to copy link");
    }
  };

  const handleCopyFormattedText = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      toast.success("Full WhatsApp message copied!", {
        description: "Includes syllabus highlights, question count, and direct link.",
      });
    } catch {
      toast.error("Failed to copy message");
    }
  };

  const handleWhatsAppShare = () => {
    const encoded = encodeURIComponent(shareText);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, "_blank");
    toast.success("Opening WhatsApp...");
  };

  const handleTelegramShare = () => {
    const encodedUrl = encodeURIComponent(targetUrl);
    const encodedText = encodeURIComponent("ITM University OOPJ Remedial Special Master Notes & Solved Question Bank");
    window.open(`https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`, "_blank");
    toast.success("Opening Telegram...");
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: "ITM University OOPJ (C2311C1) Remedial Special Notes & Solved Question Bank",
          url: targetUrl,
        });
        toast.success("Shared successfully!");
      } catch (err: any) {
        if (err.name !== "AbortError") {
          handleCopyLink();
        }
      }
    } else {
      handleCopyLink();
    }
  };

  // QR Code URL via reliable public QR service
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(targetUrl)}&bgcolor=183F36&color=D6E85D&margin=10`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="bg-card border border-border rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl relative animate-scale-in text-foreground">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-11 h-11 rounded-2xl bg-[#183F36] text-[#D6E85D] flex items-center justify-center shadow-md shadow-[#183F36]/20">
            <Share2 className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-[10px] uppercase">
                Viral Study Hub
              </span>
              <span className="text-[11px] font-mono text-muted-foreground">Share & Help Friends</span>
            </div>
            <h3 className="font-extrabold text-lg text-foreground font-display">
              Share OOPJ Remedial Special
            </h3>
          </div>
        </div>

        {/* Description Pill */}
        <p className="text-xs text-muted-foreground leading-relaxed mb-6 p-3 rounded-2xl bg-secondary/40 border border-border/80">
          Send these complete Units 2 & 3 Zero-to-Hero Notes + Solved Question Bank to your university batchmates, WhatsApp class group, or study partners.
        </p>

        {/* Primary Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <button
            onClick={handleWhatsAppShare}
            className="w-full py-3 px-4 rounded-2xl bg-indigo-500 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <MessageCircle className="h-4 w-4" />
            <span>Share on WhatsApp</span>
          </button>

          <button
            onClick={handleTelegramShare}
            className="w-full py-3 px-4 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <Send className="h-4 w-4" />
            <span>Share on Telegram</span>
          </button>
        </div>

        {/* Link Copy Box */}
        <div className="p-2.5 rounded-2xl bg-background border border-border mb-5 flex items-center justify-between gap-2">
          <span className="font-mono text-xs text-muted-foreground truncate pl-1">
            {targetUrl}
          </span>
          <button
            onClick={handleCopyLink}
            className={`px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
              copied
                ? "bg-indigo-400 text-white"
                : "bg-primary text-primary-foreground hover:opacity-90"
            }`}
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied ? "Copied!" : "Copy Link"}</span>
          </button>
        </div>

        {/* Secondary Options: Copy Formatted Message & QR Code */}
        <div className="flex items-center justify-between gap-2 pt-2 border-t border-border/80">
          <button
            onClick={handleCopyFormattedText}
            className="text-xs font-semibold text-primary hover:underline flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Copy Full WhatsApp Message</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowQr(!showQr)}
              className="px-2.5 py-1.5 rounded-xl bg-secondary hover:bg-secondary/80 text-muted-foreground hover:text-foreground text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
            >
              <QrCode className="h-3.5 w-3.5" />
              <span>{showQr ? "Hide QR" : "Show QR"}</span>
            </button>

            {typeof navigator !== "undefined" && "share" in navigator && (
              <button
                onClick={handleNativeShare}
                className="px-2.5 py-1.5 rounded-xl bg-[#183F36] text-[#D6E85D] text-xs font-bold flex items-center gap-1 cursor-pointer hover:bg-[#12332C]"
                title="System Share Menu"
              >
                <Share2 className="h-3.5 w-3.5" />
                <span>More</span>
              </button>
            )}
          </div>
        </div>

        {/* QR Code Reveal Panel */}
        {showQr && (
          <div className="mt-5 p-4 rounded-2xl bg-[#183F36] text-center space-y-2 animate-fade-in border border-[#D6E85D]/30">
            <p className="text-[11px] font-bold text-[#D6E85D] uppercase tracking-wider">
              Scan with phone to open instantly
            </p>
            <div className="inline-block p-2 rounded-xl bg-white shadow-lg">
              <img
                src={qrCodeUrl}
                alt="QR Code for OOPJ Notes"
                className="w-40 h-40 object-contain mx-auto"
                loading="lazy"
              />
            </div>
            <p className="text-[10px] text-[#A2BAAF]">
              Perfect for sharing in the classroom, lab, or exam hall!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
