import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { PortalSidebar } from "./PortalSidebar";
import { PortalTopNav } from "./PortalTopNav";
import { SearchDialog } from "@/components/SearchDialog";
import { MessageSquare, Sparkles, X, Send } from "lucide-react";
import { toast } from "sonner";

export function PortalLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const [isFocusMode, setIsFocusMode] = useState(false);

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
        setIsFocusMode((prev) => {
          const next = !prev;
          toast.info(next ? "🎯 Focus Mode Enabled (Sidebar Hidden)" : "Focus Mode Disabled");
          return next;
        });
      } else if (e.key === "Escape" && isFocusMode) {
        setIsFocusMode(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFocusMode]);

  const handleToggleFocusMode = () => {
    setIsFocusMode((prev) => {
      const next = !prev;
      toast.info(next ? "🎯 Focus Mode Enabled (Sidebar Hidden)" : "Focus Mode Disabled");
      return next;
    });
  };

  const handleSendQuickSupport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    toast.success("Message dispatched to ITM Notes Campus Support!");
    setChatMessage("");
    setIsChatOpen(false);
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-slate-50 dark:bg-background text-foreground flex antialiased">
      {/* 1. Persistent Left Dark-Navy Sidebar (Collapsible in Focus Mode) */}
      <PortalSidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        isCollapsed={isFocusMode}
      />

      {/* 2. Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Sticky Fixed Top Navbar - NEVER SCROLLS AWAY */}
        <PortalTopNav 
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
          onOpenSearch={() => setSearchOpen(true)}
          isFocusMode={isFocusMode}
          onToggleFocusMode={handleToggleFocusMode}
        />

        {/* Dynamic Page Content - Dedicated smooth scroll container */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <Outlet />
        </main>
      </div>

      {/* 3. Universal Search Dialog */}
      <SearchDialog 
        open={searchOpen} 
        onOpenChange={setSearchOpen} 
      />

      {/* 4. Global Floating Action Button (FAB) matching Screenshot */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="w-12 h-12 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-600/30 flex items-center justify-center transition-transform hover:scale-105 active:scale-95 relative"
          title="Campus Assistant & Study Help"
        >
          {isChatOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <>
              <MessageSquare className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-[10px] font-black text-white flex items-center justify-center border-2 border-background">
                1
              </span>
            </>
          )}
        </button>

        {/* Quick Assistant Popup */}
        {isChatOpen && (
          <div className="absolute bottom-16 right-0 w-80 sm:w-96 bg-card border border-border rounded-2xl shadow-2xl p-4 animate-scale-in">
            <div className="flex items-center justify-between pb-3 border-b border-border mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-foreground">ITM Campus Desk</h4>
                  <p className="text-[10px] text-muted-foreground">Ask doubts, find question banks, or get exam tips</p>
                </div>
              </div>
              <button 
                onClick={() => setIsChatOpen(false)}
                className="text-muted-foreground hover:text-foreground p-1"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-2 mb-3 max-h-48 overflow-y-auto text-xs">
              <div className="p-2.5 rounded-xl bg-secondary/60 text-foreground">
                👋 Hello! Need help finding syllabus notes, timetables, or previous year questions?
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                <button
                  onClick={() => {
                    setIsChatOpen(false);
                    navigate("/materials");
                  }}
                  className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-semibold text-[11px] border border-indigo-200/40"
                >
                  📚 View Study Materials
                </button>
                <button
                  onClick={() => {
                    setIsChatOpen(false);
                    navigate("/imp-questions");
                  }}
                  className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 font-semibold text-[11px] border border-emerald-200/40"
                >
                  ⚡ Question Banks
                </button>
                <button
                  onClick={() => {
                    setIsChatOpen(false);
                    navigate("/community");
                  }}
                  className="px-2.5 py-1 rounded-lg bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 font-semibold text-[11px] border border-purple-200/40"
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
                className="w-full h-10 pl-3 pr-10 rounded-xl border border-input bg-background text-xs focus:ring-1 focus:ring-primary outline-none"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
