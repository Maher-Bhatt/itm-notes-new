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
import BookmarksPage from "./pages/BookmarksPage";
import MaterialsPage from "./pages/MaterialsPage";
import QuizPage from "./pages/QuizPage";
import CodingLabPage from "./pages/CodingLabPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import SeedPage from "./pages/admin/SeedPage";
import SubjectImpQuestionsPage from "./pages/SubjectImpQuestionsPage";
import ProfilePage from "./pages/ProfilePage";
import GpaCalculatorPage from "./pages/GpaCalculatorPage";
import SubjectCheatSheetPage from "./pages/SubjectCheatSheetPage";
import { PomodoroProvider } from "@/contexts/PomodoroContext";
import { PomodoroFloatingWidget } from "@/components/PomodoroFloatingWidget";
import { AchievementCelebrationModal } from "@/components/AchievementCelebrationModal";
import { ProtectedRoute } from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AcademicProvider>
          <PomodoroProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <ErrorBoundary>
                  <PomodoroFloatingWidget />
                  <AchievementCelebrationModal />
                  <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/auth" element={<AuthPage />} />
                  <Route path="/onboarding" element={<ProtectedRoute><OnboardingPage /></ProtectedRoute>} />
                  <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
                  <Route path="/admin/seed" element={<ProtectedRoute requireAdmin><SeedPage /></ProtectedRoute>} />
                  <Route path="/subject/:subjectId" element={<SubjectDashboard />} />
                  <Route path="/subject/:subjectId/cheat-sheet" element={<SubjectCheatSheetPage />} />
                  <Route path="/subject/:subjectId/topic/:topicId" element={<TopicPage />} />
                  <Route path="/bookmarks" element={<ProtectedRoute><BookmarksPage /></ProtectedRoute>} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/materials" element={<MaterialsPage />} />
                  <Route path="/calculator" element={<GpaCalculatorPage />} />
                  <Route path="/gpa-calculator" element={<GpaCalculatorPage />} />
                  <Route path="/quiz" element={<QuizPage />} />
                    <Route path="/coding-lab" element={<CodingLabPage />} />
                  <Route path="/admin" element={<ProtectedRoute requireAdmin><AdminDashboard /></ProtectedRoute>} />
                  <Route path="/admin/seed" element={<ProtectedRoute requireAdmin><SeedPage /></ProtectedRoute>} />
                  <Route path="/imp-questions" element={<ImpQuestionsSubjectsPage />} />
                  <Route path="/imp-questions/c-programming" element={<CProgrammingImpQuestionsPage />} />
                  <Route path="/imp-questions/python" element={<PythonImpQuestionsPage />} />
                  <Route path="/imp-questions/:subjectId" element={<SubjectImpQuestionsPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </ErrorBoundary>
            </BrowserRouter>
          </TooltipProvider>
        </PomodoroProvider>
      </AcademicProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;

