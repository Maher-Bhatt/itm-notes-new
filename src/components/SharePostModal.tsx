import { useState } from 'react';
import { X, Copy, Check, Share2 } from 'lucide-react';
import { toast } from 'sonner';
import { CommunityPost } from '@/data/communityData';

interface SharePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: CommunityPost | null;
}

export function SharePostModal({ isOpen, onClose, post }: SharePostModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !post) return null;

  const postUrl = `${window.location.origin}/community?post=${post.id}`;
  const authorName = post.isMasked ? 'Anonymous Student 🎭' : post.authorName;
  const shareText = `Check out this ${post.category} post by ${authorName} on ITM Notes:\n"${post.content.slice(0, 100)}${post.content.length > 100 ? '...' : ''}"\n\nRead more & join the discussion: ${postUrl}`;

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(postUrl);
      setCopied(true);
      toast.success('Unique post link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `ITM Campus Social - ${authorName}`,
          text: `"${post.content.slice(0, 90)}..."`,
          url: postUrl,
        });
        toast.success('Shared successfully!');
      } catch (err) {
        // User cancelled or not supported
      }
    } else {
      handleCopyLink();
    }
  };

  const handleWhatsAppShare = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleTwitterShare = () => {
    const tweetText = `"${post.content.slice(0, 120)}..." — ${authorName} on ITM Campus Social`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(postUrl)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleTelegramShare = () => {
    const url = `https://t.me/share/url?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-background/80 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-md bg-card border border-border rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Share2 className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">Share Post</h3>
              <p className="text-[11px] text-muted-foreground">Unique direct link to this discussion</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Post Preview Card */}
        <div className="p-5 space-y-4">
          <div className="p-3.5 rounded-2xl bg-secondary/30 border border-border/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-foreground flex items-center gap-1.5">
                {authorName}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-secondary text-muted-foreground">
                {post.category}
              </span>
            </div>
            <p className="text-xs text-foreground/90 line-clamp-3 leading-relaxed">
              "{post.content}"
            </p>
          </div>

          {/* Unique Direct URL Box */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              Direct Post Link
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={postUrl}
                className="flex-1 px-3 py-2 rounded-xl bg-secondary/40 border border-border text-xs text-foreground font-mono truncate outline-none select-all"
              />
              <button
                onClick={handleCopyLink}
                className="px-3.5 py-2 rounded-xl bg-primary text-primary-foreground font-bold text-xs hover:opacity-90 apple-press transition-opacity flex items-center gap-1.5 shrink-0 shadow-sm"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Social Share Grid */}
          <div className="space-y-2 pt-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
              Share To Platform
            </span>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleWhatsAppShare}
                className="p-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold text-xs flex items-center justify-center gap-2 transition-colors apple-press"
              >
                <span>💬 WhatsApp</span>
              </button>

              <button
                onClick={handleTwitterShare}
                className="p-2.5 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground border border-border font-bold text-xs flex items-center justify-center gap-2 transition-colors apple-press"
              >
                <span>𝕏 Post on X</span>
              </button>

              <button
                onClick={handleTelegramShare}
                className="p-2.5 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/20 font-bold text-xs flex items-center justify-center gap-2 transition-colors apple-press"
              >
                <span>✈️ Telegram</span>
              </button>

              {typeof navigator !== 'undefined' && 'share' in navigator && (
                <button
                  onClick={handleNativeShare}
                  className="p-2.5 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 font-bold text-xs flex items-center justify-center gap-2 transition-colors apple-press"
                >
                  <Share2 className="h-3.5 w-3.5" />
                  <span>Device Share</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border bg-secondary/20 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground font-semibold text-xs apple-press transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
