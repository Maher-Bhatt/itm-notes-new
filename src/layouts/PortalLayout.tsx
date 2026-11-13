import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { PortalSidebar } from "./PortalSidebar";
import { PortalTopNav } from "./PortalTopNav";
import { SearchDialog } from "@/components/SearchDialog";
import { HelpCircle, X } from "lucide-react";
import { toast } from "sonner";
import { useFocusMode } from "@/contexts/FocusModeContext";
import { useAuth } from "@/contexts/AuthContext";
import { HelpPanel } from "@/components/HelpPanel";
import { isPublicPath, setRobots, titleForPath } from "@/lib/pageMeta";

export function PortalLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { focusMode, toggleFocusMode, setFocusMode } = useFocusMode();
  const { user, profile } = useAuth();

  // Close mobile sidebar on route change; keep the tab title meaningful
  useEffect(() => {
    setSidebarOpen(false);
    if (!isPublicPath(location.pathname)) {
      // public pages (library) set their own title, description and canonical
      document.title = titleForPath(location.pathname);
      setRobots("noindex, nofollow");
    }
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

  const isCodingLab = location.pathname.startsWith("/coding-lab");

  return (
    <div className="h-screen w-full overflow-hidden bg-background text-foreground flex antialiased">
      {/* Ambient Spotlight & Dot Pattern */}
      <div className="ambient-spotlight" />
      <div className="fixed inset-0 z-0 pointer-events-none pattern-dots opacity-35" />

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
        <main className="flex-1 overflow-y-auto overflow-x-hidden pb-16 md:pb-6 bg-transparent relative z-10">
          <Outlet />
        </main>
      </div>

      {/* 3. Universal Search Dialog */}
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />

      {/* 4. Global Floating Action Button (Campus Assistant) */}
      {!isCodingLab && (
        <div className="fixed bottom-[calc(5.25rem+env(safe-area-inset-bottom,0px))] md:bottom-8 right-4 sm:right-6 z-40">
          <button
            onClick={() => setIsChatOpen(!isChatOpen)}
            className="w-12 h-12 rounded-full bg-foreground text-background shadow-lg flex items-center justify-center transition-transform hover:scale-105 active:scale-95 cursor-pointer"
            title="Help: search notes or contact support"
            aria-label="Help"
          >
            {isChatOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <HelpCircle className="h-5 w-5" />
            )}
          </button>

          {isChatOpen && <HelpPanel onClose={() => setIsChatOpen(false)} />}
        </div>
      )}
    </div>
  );
}