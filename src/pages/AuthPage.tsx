// @ts-nocheck
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useAcademic } from "@/contexts/AcademicContext";
import { toast } from "sonner";
import { Loader2, Lock, Sparkles } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

function getFeatureName(path?: string) {
  if (!path) return "this feature";
  if (path.includes("material")) return "the Academic Materials Library";
  if (path.includes("quiz")) return "Practice Quizzes";
  if (path.includes("calculator") || path.includes("gpa")) return "the Attendance & GPA Calculator";
  if (path.includes("coding")) return "the Practical Coding Lab";
  if (path.includes("community") || path.includes("social")) return "Campus Social & Confessions";
  if (path.includes("imp-questions")) return "University Exam IMP Questions";
  if (path.includes("profile")) return "Student Profile";
  if (path.includes("bookmark")) return "Bookmarked Topics";
  return "this feature";
}

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [semester, setSemester] = useState("3");
  const { setAcademicContext } = useAcademic();
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const fromState = (location.state as any)?.from;
  const fromLocation = fromState
    ? (typeof fromState === 'string' ? fromState : `${fromState.pathname || "/"}${fromState.search || ""}${fromState.hash || ""}`)
    : "/";

  // If already logged in, redirect to intended target
  if (user) {
    navigate(fromLocation, { replace: true });
    return null;
  }

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;

        // Ensure user profile is registered in Supabase
        if (data?.user?.id) {
          const fallbackName = data.user.user_metadata?.display_name || email.split("@")[0];
          await supabase.from("profiles").upsert({
            user_id: data.user.id,
            email: data.user.email,
            display_name: fallbackName,
          }, { onConflict: "user_id" });
        }

        toast.success("Successfully logged in!");
        navigate(fromLocation, { replace: true });
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              display_name: displayName,
            },
          },
        });
        if (error) throw error;

        // Immediately upsert into profiles so Admin and Social see the real student
        if (data?.user?.id) {
          try {
            await supabase.from("profiles").upsert({
              user_id: data.user.id,
              email: email,
              display_name: displayName,
              role: email.toLowerCase() === "maherbhatt01@gmail.com" ? "admin" : "student",
              branch: "B.Tech CSE '26",
            }, { onConflict: "user_id" });
          } catch {}
        }

        toast.success("Account created successfully! Please sign in.");
        setIsLogin(true);
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred during authentication.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md surface-elevated rounded-xl p-8 animate-slide-up">
          {/* Target Feature Requirement Banner */}
          {(location.state as any)?.from && (
            <div className="mb-6 p-3.5 rounded-xl bg-primary/10 border border-primary/20 text-xs text-primary font-medium flex items-center gap-2.5 animate-pulse">
              <Lock className="h-4 w-4 shrink-0 text-primary" />
              <div>
                <span className="font-bold">Student Login Required:</span> Sign in to access {getFeatureName((location.state as any)?.from?.pathname)}.
              </div>
            </div>
          )}

          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">
              {isLogin ? "Welcome to ITM Notes" : "Join Your Campus Platform"}
            </h1>
            <p className="text-muted-foreground text-sm">
              {isLogin 
                ? "Sign in to access official materials, 150+ coding practicals, GPA prediction, and campus social." 
                : "Create your student account to join the campus pulse and unlock all university tools."}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none" htmlFor="name">
                  Display Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Rahul Kumar"
                />
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="name@example.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 mt-4 apple-press"
            >
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : isLogin ? (
                "Sign In"
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            </span>
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary hover:underline font-medium focus:outline-none"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
