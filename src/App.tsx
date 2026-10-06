import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { AuthProvider } from "@/contexts/AuthContext";
import { AcademicProvider } from "@/contexts/AcademicContext";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import SubjectDashboard from "./pages/SubjectDashboard";
import TopicPage from "./pages/TopicPage";
import NotFound from "./pages/NotFound";
import ImpQuestionsSubjectsPage from "./pages/ImpQuestionsSubjectsPage";
import CProgrammingImpQuestionsPage from "./pages/CProgrammingImpQuestionsPage";
import PythonImpQuestionsPage from "./pages/PythonImpQuestionsPage";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import OnboardingPage from "./pages/OnboardingPage";
import { lazy, Suspense, useEffect } from "react";
import BookmarksPage from "./pages/BookmarksPage";
import MaterialsPage from "./pages/MaterialsPage";
import QuizPage from "./pages/QuizPage";
import SeedPage from "./pages/admin/SeedPage";
import SubjectImpQuestionsPage from "./pages/SubjectImpQuestionsPage";
import ProfilePage from "./pages/ProfilePage";
import GpaCalculatorPage from "./pages/GpaCalculatorPage";
import SubjectCheatSheetPage from "./pages/SubjectCheatSheetPage";
import { PomodoroProvider } from "@/contexts/PomodoroContext";
import { GamificationProvider, useGamification } from "@/hooks/useGamification";
import { PomodoroFloatingWidget } from "@/components/PomodoroFloatingWidget";
import { AchievementCelebrationModal } from "@/components/AchievementCelebrationModal";
import { AnnouncementBanner } from "@/components/AnnouncementBanner";
import { MaintenanceBanner } from "@/components/MaintenanceBanner";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { PWAInstallPrompt } from "@/components/PWAInstallPrompt";
import { PageFallback } from "@/components/PageSkeletonLoaders";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";

// React.lazy + Suspense code splitting for heavy interactive modules
const CodingLabPage = lazy(() => import("./pages/CodingLabPage"));
const CommunityPage = lazy(() => import("./pages/CommunityPage"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));

const queryClient = new QueryClient();

/** Runs once on app startup when user is authenticated to maintain streak. */
function AppStartup() {
  const { user } = useAuth();
  const { checkDailyStreak } = useGamification();

  useEffect(() => {
    if (user) {
      checkDailyStreak();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  return null;
}

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AcademicProvider>
          <GamificationProvider>
            <PomodoroProvider>
              <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <ErrorBoundary>
                  <AppStartup />
                  <MaintenanceBanner />
                  <AnnouncementBanner />
                  <PWAInstallPrompt />
                  <PomodoroFloatingWidget />
                  <AchievementCelebrationModal />
                  <Suspense fallback={<PageFallback />}>
                    <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/auth" element={<AuthPage />} />
                  <Route path="/onboarding" element={<ProtectedRoute><OnboardingPage /></ProtectedRoute>} />
                  <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
                  <Route path="/bookmarks" element={<ProtectedRoute><BookmarksPage /></ProtectedRoute>} />
                  <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                  <Route path="/subject/:subjectId" element={<SubjectDashboard />} />
                  <Route path="/subject/:subjectId/cheat-sheet" element={<SubjectCheatSheetPage />} />
                  <Route path="/subject/:subjectId/topic/:topicId" element={<TopicPage />} />
                  <Route path="/materials" element={<ProtectedRoute><MaterialsPage /></ProtectedRoute>} />
                  <Route path="/calculator" element={<ProtectedRoute><GpaCalculatorPage /></ProtectedRoute>} />
                  <Route path="/gpa-calculator" element={<ProtectedRoute><GpaCalculatorPage /></ProtectedRoute>} />
                  <Route path="/quiz" element={<ProtectedRoute><QuizPage /></ProtectedRoute>} />
                  <Route path="/coding-lab" element={<ProtectedRoute><CodingLabPage /></ProtectedRoute>} />
                  <Route path="/community" element={<ProtectedRoute><CommunityPage /></ProtectedRoute>} />
                  <Route path="/social" element={<ProtectedRoute><CommunityPage /></ProtectedRoute>} />
                  <Route path="/admin" element={<ProtectedRoute requireAdmin><AdminDashboard /></ProtectedRoute>} />
                  <Route path="/admin/seed" element={<ProtectedRoute requireAdmin><SeedPage /></ProtectedRoute>} />
                  <Route path="/imp-questions" element={<ProtectedRoute><ImpQuestionsSubjectsPage /></ProtectedRoute>} />
                  <Route path="/imp-questions/c-programming" element={<ProtectedRoute><CProgrammingImpQuestionsPage /></ProtectedRoute>} />
                  <Route path="/imp-questions/python" element={<ProtectedRoute><PythonImpQuestionsPage /></ProtectedRoute>} />
                  <Route path="/imp-questions/:subjectId" element={<ProtectedRoute><SubjectImpQuestionsPage /></ProtectedRoute>} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
              <MobileBottomNav />
              </ErrorBoundary>
            </BrowserRouter>
          </TooltipProvider>
            </PomodoroProvider>
          </GamificationProvider>
        </AcademicProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;

