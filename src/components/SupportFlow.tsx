import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import qrImage from "@/assets/qr-payment.jpeg";

const SESSION_KEY = "itm_support_dismissed";
const ENGAGEMENT_KEY = "itm_topics_viewed";

export function useSupportFlow() {
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem(SESSION_KEY);
    if (dismissed) return;

    const viewedCount = parseInt(localStorage.getItem(ENGAGEMENT_KEY) || "0", 10);
    if (viewedCount >= 3) {
      const timer = setTimeout(() => setShouldShow(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismiss = () => {
    setShouldShow(false);
    sessionStorage.setItem(SESSION_KEY, "true");
  };

  const recordEngagement = () => {
    const current = parseInt(localStorage.getItem(ENGAGEMENT_KEY) || "0", 10);
    localStorage.setItem(ENGAGEMENT_KEY, String(current + 1));
  };

  return { shouldShow, dismiss, recordEngagement };
}

interface SupportFlowProps {
  open: boolean;
  onDismiss: () => void;
}

export function SupportFlow({ open, onDismiss }: SupportFlowProps) {
  const [step, setStep] = useState<"enjoy" | "support" | "qr">("enjoy");

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onDismiss()}>
      <DialogContent className="sm:max-w-md surface-elevated border border-white/8">
        {step === "enjoy" && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-destructive" />
                Enjoying ITM Notes?
              </DialogTitle>
              <DialogDescription>
                We hope our notes are helping you learn better!
              </DialogDescription>
            </DialogHeader>
            <div className="flex gap-3 mt-4">
              <Button onClick={() => setStep("support")} className="flex-1">Yes, it's great! 🎉</Button>
              <Button variant="outline" onClick={onDismiss} className="flex-1">Not really</Button>
            </div>
          </>
        )}

        {step === "support" && (
          <>
            <DialogHeader>
              <DialogTitle>Would you like to support us? 💖</DialogTitle>
              <DialogDescription>
                Your support helps us keep ITM Notes free and continuously improving with better content.
              </DialogDescription>
            </DialogHeader>
            <div className="flex gap-3 mt-4">
              <Button onClick={() => setStep("qr")} className="flex-1">Sure, I'd love to!</Button>
              <Button variant="outline" onClick={onDismiss} className="flex-1">Maybe later</Button>
            </div>
          </>
        )}

        {step === "qr" && (
          <>
            <DialogHeader>
              <DialogTitle>Thank you! 🙏</DialogTitle>
              <DialogDescription>
                Scan the QR code below to support ITM Notes via UPI.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col items-center gap-4 mt-4">
              <div className="rounded-xl overflow-hidden border border-white/10">
                <img src={qrImage} alt="UPI Payment QR Code" className="w-56 h-56 object-contain" />
              </div>
              <p className="text-xs text-muted-foreground text-center">
                UPI ID: maherbhatt01@okhdfcbank
              </p>
              <Button variant="outline" size="sm" onClick={onDismiss}>
                Done
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
