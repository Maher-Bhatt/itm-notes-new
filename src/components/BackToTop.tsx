import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-20 right-4 sm:bottom-8 sm:right-6 z-30 w-11 h-11 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:opacity-90 transition-all duration-200 animate-fade-in apple-press"
      style={{ marginBottom: 'env(safe-area-inset-bottom, 0px)' }}
      title="Back to top"
      aria-label="Scroll back to top"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
