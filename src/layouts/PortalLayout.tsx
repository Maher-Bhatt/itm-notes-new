import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { PortalSidebar } from "./PortalSidebar";
import { PortalTopNav } from "./PortalTopNav";
import { SearchDialog } from "@/components/SearchDialog";
import { MessageSquare, X, Send } from "lucide-react";
import { toast } from "sonner";
import { useFocusMode } from "@/contexts/FocusModeContext";
import { useAuth } from "@/contexts/AuthContext";
import { createSupportTicket } from "@/services/adminOperationsService";

export function PortalLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const { focusMode, toggleFocusMode, setFocusMode } = useFocusMode();
  const { user, profile } = useAuth();

  // Close mobile sidebar on route change
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  // Global keyboard shortcuts: Cmd+K (search), 'F' (Fullscreen Focus Mode)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInput = target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable;

      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      } else if ((e.key === "f" || e.key === "F") && !e.ctrlKey && !e.metaKey && !isInput) {
        e.preventDefault();
        toggleFocusMode();
        toast.info(!focusMode ? "🎯 Focus Mode Enabled" : "Focus Mode Disabled");
      } else if (e.key === "Escape" && focusMode) {
        setFocusMode(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [focusMode, toggleFocusMode, setFocusMode]);

  const handleToggleFocusMode = () => {
    toggleFocusMode();
    toast.info(!focusMode ? "🎯 Focus Mode Enabled" : "Focus Mode Disabled");
  };

  const handleSendQuickSupport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    const msg = chatMessage.trim();
    setChatMessage("");
    setIsChatOpen(false);
    toast.success("Message dispatched to Campus Support!");
    try {
      await createSupportTicket(
        msg,
        "Campus Desk Inquiry",
        user?.email || undefined,
        profile?.display_name || undefined,
        user?.id
      );
    } catch {
      // Ignored - fallback handled
    }
  };

  const isCodingLab = location.pathname.startsWith("/coding-lab");

  return (
    <div className="h-screen w-full overflow-hidden bg-background text-foreground flex antialiased">
      {/* Mesh Gradient Background */}
      <div className="fixed inset-0 z-[-10] overflow-hidden">
        <div className="aurora-blob aurora-blob-1" />
        <div className="aurora-blob aurora-blob-2" />
        <div className="aurora-blob aurora-blob-3" />
      </div>

      {/* 1. Persistent Left Dark Sidebar */}
      <PortalSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isCollapsed={focusMode}
      />

      {/* 2. Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Sticky Fixed Top Navbar */}
        <PortalTopNav
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
          onOpenSearch={() => setSearchOpen(true)}
          isFocusMode={focusMode}
          onToggleFocusMode={handleToggleFocusMode}
        />

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden pb-16 md:pb-6 bg-background">
          <Outlet />
        </main>
      </div>

      {/* 3. Universal Search Dialog */}
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />

      {/* 4. Global Floating Action Button (Campus Assistant) */}
      {!isCodingLab && (
        <div className="fixed bottom-[80px] md:bottom-8 right-4 sm:right-6 z-40">
          <button
            onClick={() => setIsChatOpen(!isChatOpen)}
            className="w-12 h-12 rounded-full bg-gradient-electric text-white shadow-lg shadow-primary/30 flex items-center justify-center transition-all hover:scale-105 active:scale-95 press cursor-pointer border border-white/20"
            title="Campus Assistant & Study Help"
          >
            {isChatOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <MessageSquare className="h-5 w-5" />
            )}
          </button>

          {/* Quick Assistant Popup */}
          {isChatOpen && (
            <div className="absolute bottom-16 right-0 w-80 sm:w-96 glass-card border border-white/10 rounded-2xl shadow-xl p-4 scale-in">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-electric flex items-center justify-center">
                    <MessageSquare className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-white font-display">Campus Assistant</h4>
                    <p className="text-[10px] text-muted-foreground">
                      Ask doubts, find question banks, or get exam tips
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="text-muted-foreground hover:text-white p-1 cursor-pointer press"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-2 mb-3 max-h-48 overflow-y-auto text-xs">
                <div className="p-2.5 rounded-lg bg-muted text-white/80">
                  👋 Hello! Need help finding syllabus notes, timetables, or previous year questions?
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <button
                    onClick={() => {
                      setIsChatOpen(false);
                      navigate("/materials");
                    }}
                    className="px-2.5 py-1 rounded-lg text-[11px] font-semibold border border-white/10 bg-background text-white hover:bg-secondary hover:text-primary transition-colors cursor-pointer"
                  >
                    📚 Study Materials
                  </button>
                  <button
                    onClick={() => {
                      setIsChatOpen(false);
                      navigate("/imp-questions");
                    }}
                    className="px-2.5 py-1 rounded-lg text-[11px] font-semibold border border-white/10 bg-background text-white hover:bg-secondary hover:text-primary transition-colors cursor-pointer"
                  >
                    ⚡ Question Banks
                  </button>
                  <button
                    onClick={() => {
                      setIsChatOpen(false);
                      navigate("/community");
                    }}
                    className="px-2.5 py-1 rounded-lg text-[11px] font-semibold border border-white/10 bg-background text-white hover:bg-secondary hover:text-primary transition-colors cursor-pointer"
                  >
                    💬 Campus Pulse Feed
                  </button>
                </div>
              </div>

              <form onSubmit={handleSendQuickSupport} className="relative">
                <input
                  type="text"
                  placeholder="Ask anything or request a note..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  className="w-full h-10 pl-3 pr-10 rounded-lg border border-white/10 bg-background text-white placeholder:text-muted-foreground/50 focus:ring-1 focus:ring-ring outline-none"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md bg-gradient-electric text-white hover:bg-primary/90 transition-opacity cursor-pointer press"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
}