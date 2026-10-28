import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { AuthProvider } from "@/contexts/AuthContext";
import { AcademicProvider } from "@/contexts/AcademicContext";
import { UniversityProvider } from "@/contexts/UniversityContext";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import SubjectDashboard from "./pages/SubjectDashboard";
import TopicPage from "./pages/TopicPage";
import NotFound from "./pages/NotFound";
import ImpQuestionsSubjectsPage from "./pages/ImpQuestionsSubjectsPage";
import CProgrammingImpQuestionsPage from "./pages/CProgrammingImpQuestionsPage";
import PythonImpQuestionsPage from "./pages/PythonImpQuestionsPage";
import OopjImpQuestionsPage from "./pages/OopjImpQuestionsPage";
import AuthPage from "./pages/AuthPage";
import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/DashboardPage";
import OnboardingPage from "./pages/OnboardingPage";
import { lazy, Suspense, useEffect } from "react";
import BookmarksPage from "./pages/BookmarksPage";
import MaterialsPage from "./pages/MaterialsPage";
import QuizPage from "./pages/QuizPage";
import SeedPage from "./pages/admin/SeedPage";
import SubjectImpQuestionsPage from "./pages/SubjectImpQuestionsPage";
import ProfilePage from "./pages/ProfilePage";
import ExplorePage from "./pages/ExplorePage";
import InboxPage from "./pages/InboxPage";
import GpaCalculatorPage from "./pages/GpaCalculatorPage";
import SubjectCheatSheetPage from "./pages/SubjectCheatSheetPage";
import SubjectsPage from "./pages/SubjectsPage";
import { PortalLayout } from "@/layouts/PortalLayout";
import { PomodoroProvider } from "@/contexts/PomodoroContext";
import { FocusModeProvider } from "@/contexts/FocusModeContext";
import { GamificationProvider, useGamification } from "@/hooks/useGamification";
import { PomodoroFloatingWidget } from "@/components/PomodoroFloatingWidget";
import { AchievementCelebrationModal } from "@/components/AchievementCelebrationModal";
import { AnnouncementBanner } from "@/components/AnnouncementBanner";
import { MaintenanceBanner } from "@/components/MaintenanceBanner";
import { GlobalTimetableModal } from "@/components/GlobalTimetableModal";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { PWAInstallPrompt } from "@/components/PWAInstallPrompt";
import { PageFallback } from "@/components/PageSkeletonLoaders";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import { useCapacitorNative } from "@/hooks/useCapacitorNative";
import { AppStartupSplashScreen } from "@/components/AppStartupSplashScreen";
import { requestNotificationPermission, scheduleDailyStudyReminder } from "@/utils/studyReminders";
import { initGlobalErrorCapture } from "@/services/clientErrorService";

/**
 * Resilient lazy loader: if a new deployment removed old hashed chunks,
 * it clears caches and reloads once to fetch the latest version automatically.
 */
function lazyWithRetry<T extends React.ComponentType<any>>(
  factory: () => Promise<{ default: T }>
) {
  return lazy(async () => {
    const hasReloaded = sessionStorage.getItem("chunk_retry_refreshed");
    try {
      const comp = await factory();
      sessionStorage.removeItem("chunk_retry_refreshed");
      return comp;
    } catch (err) {
      if (!hasReloaded) {
        sessionStorage.setItem("chunk_retry_refreshed", "true");
        try {
          if ("caches" in window) {
            const keys = await caches.keys();
            await Promise.all(keys.map((k) => caches.delete(k)));
          }
        } catch {}
        window.location.reload();
        return new Promise(() => {});
      }
      sessionStorage.removeItem("chunk_retry_refreshed");
      throw err;
    }
  });
}

// React.lazy + Suspense code splitting with deployment-resilient retry
const CodingLabPage = lazyWithRetry(() => import("./pages/CodingLabPage"));
const CommunityPage = lazyWithRetry(() => import("./pages/CommunityPage"));
const AdminDashboard = lazyWithRetry(() => import("./pages/admin/AdminDashboard"));
const PyqPapersPage = lazyWithRetry(() => import("./pages/PyqPapersPage"));
const MockExamPage = lazyWithRetry(() => import("./pages/MockExamPage"));
const RapidRevisionPage = lazyWithRetry(() => import("./pages/RapidRevisionPage"));
const FormulaBankPage = lazyWithRetry(() => import("./pages/FormulaBankPage"));
const LearningAnalyticsPage = lazyWithRetry(() => import("./pages/LearningAnalyticsPage"));
const StudyPlannerPage = lazyWithRetry(() => import("./pages/StudyPlannerPage"));
const TodayPage = lazyWithRetry(() => import("./pages/TodayPage"));

const queryClient = new QueryClient();

/** Runs once on app startup when user is authenticated to maintain streak & schedule reminders. */
function AppStartup() {
  const { user } = useAuth();
  const { checkDailyStreak } = useGamification();

  useEffect(() => {
    initGlobalErrorCapture();
    if (user) {
      checkDailyStreak();
      requestNotificationPermission();
      scheduleDailyStudyReminder();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  return null;
}

/** Handles native mobile Android behaviors like back button, status bar, splash screen */
function NativeAppInitializer() {
  useCapacitorNative();
  return null;
}

/**
 * RootRoute: If guest/unauthenticated, renders the modern marketing LandingPage.
 * If student is signed in, redirects to the personalized /dashboard inside PortalLayout.
 */
function RootRoute() {
  const { user, isLoading } = useAuth();
  if (isLoading) {
    return <PageFallback />;
  }
  if (!user) {
    return <LandingPage />;
  }
  return <Navigate to="/dashboard" replace />;
}

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AcademicProvider>
          <UniversityProvider>
            <GamificationProvider>
            <PomodoroProvider>
              <FocusModeProvider>
                <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <NativeAppInitializer />
                  {/* Native-only or initial splash check */}
                  {typeof window !== "undefined" && window.location.hash.includes("native") && (
                    <AppStartupSplashScreen />
                  )}
                  <ErrorBoundary>
                    <AppStartup />
                    <MaintenanceBanner />
                    <AnnouncementBanner />
                    <PWAInstallPrompt />
                    <PomodoroFloatingWidget />
                    <AchievementCelebrationModal />
                    <GlobalTimetableModal />
                    <Suspense fallback={<PageFallback />}>
                      <Routes>
                        {/* Standalone Landing, Authentication & Onboarding */}
                        <Route path="/" element={<RootRoute />} />
                        <Route path="/auth" element={<AuthPage />} />
                        <Route path="/onboarding" element={<ProtectedRoute><OnboardingPage /></ProtectedRoute>} />

                        {/* Distraction-Free Topic Reader */}
                        <Route path="/subject/:subjectId/topic/:topicId" element={<ProtectedRoute><TopicPage /></ProtectedRoute>} />

                        {/* Redirects for legacy and intuitive routes */}
                        <Route path="/notes" element={<Navigate to="/subjects" replace />} />
                        <Route path="/settings" element={<Navigate to="/profile" replace />} />

                        {/* Unified Modern Portal Layout */}
                        <Route element={<PortalLayout />}>
                          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
                          <Route path="/materials" element={<ProtectedRoute><MaterialsPage /></ProtectedRoute>} />
                          <Route path="/quiz" element={<ProtectedRoute><QuizPage /></ProtectedRoute>} />
                          <Route path="/coding-lab" element={<ProtectedRoute><ErrorBoundary><CodingLabPage /></ErrorBoundary></ProtectedRoute>} />
                          <Route path="/community" element={<ProtectedRoute><CommunityPage /></ProtectedRoute>} />
                          <Route path="/social" element={<ProtectedRoute><CommunityPage /></ProtectedRoute>} />
                          <Route path="/imp-questions" element={<ProtectedRoute><ImpQuestionsSubjectsPage /></ProtectedRoute>} />
                          <Route path="/imp-questions/oopj" element={<ProtectedRoute><OopjImpQuestionsPage /></ProtectedRoute>} />
                          <Route path="/imp-questions/c2311c1" element={<ProtectedRoute><OopjImpQuestionsPage /></ProtectedRoute>} />
                          <Route path="/imp-questions/java" element={<ProtectedRoute><OopjImpQuestionsPage /></ProtectedRoute>} />
                          <Route path="/imp-questions/c-programming" element={<ProtectedRoute><CProgrammingImpQuestionsPage /></ProtectedRoute>} />
                          <Route path="/imp-questions/python" element={<ProtectedRoute><PythonImpQuestionsPage /></ProtectedRoute>} />
                          <Route path="/imp-questions/:subjectId" element={<ProtectedRoute><SubjectImpQuestionsPage /></ProtectedRoute>} />
                          <Route path="/calculator" element={<ProtectedRoute><GpaCalculatorPage /></ProtectedRoute>} />
                          <Route path="/gpa-calculator" element={<ProtectedRoute><GpaCalculatorPage /></ProtectedRoute>} />
                          <Route path="/bookmarks" element={<ProtectedRoute><BookmarksPage /></ProtectedRoute>} />
                          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                          <Route path="/subjects" element={<ProtectedRoute><SubjectsPage /></ProtectedRoute>} />
                          <Route path="/subject/:subjectId" element={<ProtectedRoute><SubjectDashboard /></ProtectedRoute>} />
                          <Route path="/subject/:subjectId/cheat-sheet" element={<ProtectedRoute><SubjectCheatSheetPage /></ProtectedRoute>} />

                          {/* 32 High-Value Features Routes */}
                          <Route path="/today" element={<ProtectedRoute><TodayPage /></ProtectedRoute>} />
                          <Route path="/pyq-papers" element={<ProtectedRoute><PyqPapersPage /></ProtectedRoute>} />
                          <Route path="/mock-exam" element={<ProtectedRoute><MockExamPage /></ProtectedRoute>} />
                          <Route path="/rapid-revision" element={<ProtectedRoute><RapidRevisionPage /></ProtectedRoute>} />
                          <Route path="/formulas" element={<ProtectedRoute><FormulaBankPage /></ProtectedRoute>} />
                          <Route path="/analytics" element={<ProtectedRoute><LearningAnalyticsPage /></ProtectedRoute>} />
                          <Route path="/study-planner" element={<ProtectedRoute><StudyPlannerPage /></ProtectedRoute>} />

                          <Route path="/admin" element={<ProtectedRoute requireAdmin><AdminDashboard /></ProtectedRoute>} />
                          <Route path="/admin/seed" element={<ProtectedRoute requireAdmin><SeedPage /></ProtectedRoute>} />
                          <Route path="/explore" element={<ProtectedRoute><ExplorePage /></ProtectedRoute>} />
                          <Route path="/inbox" element={<ProtectedRoute><InboxPage /></ProtectedRoute>} />
                          <Route path="/messages" element={<ProtectedRoute><InboxPage /></ProtectedRoute>} />
                        </Route>

                        <Route path="*" element={<NotFound />} />
                      </Routes>
                </Suspense>
                <MobileBottomNav />
                </ErrorBoundary>
              </BrowserRouter>
            </TooltipProvider>
          </FocusModeProvider>
        </PomodoroProvider>
      </GamificationProvider>
          </UniversityProvider>
        </AcademicProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
