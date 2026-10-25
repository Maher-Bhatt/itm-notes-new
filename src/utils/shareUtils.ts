/**
 * ITM Notes - Social & WhatsApp Sharing Utility
 * Formats rich academic cards for class WhatsApp groups and social sharing.
 */

import { toast } from "sonner";

export interface ShareOptions {
  title: string;
  subjectName: string;
  excerpt: string;
  urlPath: string;
}

export async function shareTopicToSocial({ title, subjectName, excerpt, urlPath }: ShareOptions): Promise<void> {
  const fullUrl = `https://itm-notes-new.vercel.app${urlPath}`;
  const shareText = `📚 *ITM Notes* · ${subjectName}
📖 *${title}*

${excerpt.slice(0, 140)}...

🔗 Study topic with full code & diagrams:
${fullUrl}`;

  // 1. Try Native Web Share API (Mobile / Tablet browsers)
  if (navigator.share) {
    try {
      await navigator.share({
        title: `${title} - ITM Notes`,
        text: shareText,
        url: fullUrl,
      });
      toast.success("Shared successfully!");
      return;
    } catch (e: any) {
      if (e.name !== 'AbortError') {
        // Fallback to clipboard if share failed
      } else {
        return;
      }
    }
  }

  // 2. Direct WhatsApp Web fallback
  const encodedText = encodeURIComponent(shareText);
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedText}`;

  // Check if opening whatsapp is preferred or clipboard
  try {
    await navigator.clipboard.writeText(shareText);
    toast.success("Copied shareable note link to clipboard!", {
      description: "Paste in your class WhatsApp group.",
      action: {
        label: "Open WhatsApp",
        onClick: () => window.open(whatsappUrl, "_blank"),
      },
    });
  } catch {
    window.open(whatsappUrl, "_blank");
  }
}
