import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { PublicLayout } from "@/layouts/PublicLayout";
import { setRobots } from "@/lib/pageMeta";

type Mode = "signin" | "signup" | "forgot" | "reset";

const field =
  "w-full rounded-lg border border-border bg-card px-3.5 py-2.5 text-[15px] text-foreground placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none";

/** Where to go after signing in: back to the page that asked for sign-in, else the dashboard. */
function useReturnPath() {
  const location = useLocation();
  return useMemo(() => {
    const from = (location.state as { from?: string | { pathname?: string; search?: string } } | null)?.from;
    const path = typeof from === "string" ? from : from ? `${from.pathname || ""}${from.search || ""}` : "";
    return path && path !== "/" && !path.startsWith("/auth") ? path : "/dashboard";
  }, [location.state]);
}

export default function AuthPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isLoading } = useAuth();
  const returnPath = useReturnPath();
  const params = new URLSearchParams(location.search);
  const [mode, setMode] = useState<Mode>(params.get("mode") === "reset" ? "reset" : params.get("mode") === "signup" ? "signup" : "signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [sentReset, setSentReset] = useState(false);

  useEffect(() => {
    document.title = mode === "signup" ? "Create account · CampusLoop" : mode === "reset" ? "Set a new password · CampusLoop" : "Sign in · CampusLoop";
    setRobots("noindex, nofollow");
  }, [mode]);

  // A password-recovery link signs the user in with a recovery session: show the new-password form.
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") setMode("reset");
    });
    return () => data.subscription.unsubscribe();
  }, []);

  // Already signed in (and not resetting a password): continue to the app.
  useEffect(() => {
    if (!isLoading && user && mode !== "reset") navigate(returnPath, { replace: true });
  }, [isLoading, user, mode, navigate, returnPath]);

  const afterSignIn = async (userId: string) => {
    const { data: profile } = await supabase.from("profiles").select("onboarding_completed, semester").eq("user_id", userId).maybeSingle();
    const p = profile as { onboarding_completed?: boolean | null; semester?: number | null } | null;
    navigate(!p || (p.onboarding_completed !== true && !p.semester) ? "/onboarding" : returnPath, { replace: true });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signin") {
        const { data, error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
        if (error) throw error;
        if (data.user) await afterSignIn(data.user.id);
      } else if (mode === "signup") {
        if (password.length < 8) throw new Error("Use at least 8 characters for your password.");
        const displayName = name.trim() || email.split("@")[0];
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: { data: { display_name: displayName } },
        });
        if (error) throw error;
        if (data.user && !data.session) {
          toast.success("Check your email to confirm your account, then sign in.");
          setMode("signin");
          return;
        }
        if (data.user) {
          const { error: profileError } = await supabase.from("profiles").upsert(
            { user_id: data.user.id, email: email.trim(), display_name: displayName, role: "student", onboarding_completed: false } as never,
            { onConflict: "user_id" }
          );
          if (profileError) console.warn("Profile will be created during onboarding:", profileError.message);
          navigate("/onboarding", { replace: true });
        }
      } else if (mode === "forgot") {
        const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
          redirectTo: `${window.location.origin}/auth?mode=reset`,
        });
        if (error) throw error;
        setSentReset(true);
      } else if (mode === "reset") {
        if (password.length < 8) throw new Error("Use at least 8 characters for your new password.");
        const { error } = await supabase.auth.updateUser({ password });
        if (error) throw error;
        toast.success("Password updated. You're signed in.");
        navigate("/dashboard", { replace: true });
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const heading = {
    signin: { t: "Welcome back", d: "Sign in to sync your progress and use practice, mock exams and the coding lab." },
    signup: { t: "Create your free account", d: "Save progress across devices, practise with quizzes and mock papers, and join your campus." },
    forgot: { t: "Reset your password", d: "Enter your email and we'll send you a link to choose a new password." },
    reset: { t: "Choose a new password", d: "Enter a new password for your account." },
  }[mode];

  return (
    <PublicLayout>
      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[1fr_minmax(0,26rem)] lg:py-20">
        <div className="hidden lg:block">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">CampusLoop account</p>
          <h1 className="mt-4 text-5xl font-medium leading-[1.05] text-foreground">
            Study on any device, <em className="text-primary">pick up where you left off.</em>
          </h1>
          <ul className="mt-8 space-y-3 text-[16px] text-muted-foreground">
            <li>• The Library is free to read without an account.</li>
            <li>• An account adds quizzes, timed mock papers, question banks and the coding lab.</li>
            <li>• Your campus feed, clubs and messages live here too.</li>
          </ul>
          <Link to="/library" className="mt-8 inline-block text-sm font-medium text-primary hover:underline underline-offset-4">
            Just want to read? Open the Library
          </Link>
        </div>

        <div className="surface-card p-7 sm:p-8">
          <h2 className="text-3xl font-medium text-foreground">{heading.t}</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{heading.d}</p>

          {mode === "forgot" && sentReset ? (
            <div className="mt-6 rounded-lg border border-border bg-secondary/60 p-4 text-sm text-foreground">
              If an account exists for <strong>{email}</strong>, a reset link is on its way. It can take a minute; check spam too.
            </div>
          ) : (
            <form onSubmit={submit} className="mt-6 space-y-4">
              {mode === "signup" && (
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-foreground">Your name</span>
                  <input className={field} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
                </label>
              )}
              {mode !== "reset" && (
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-foreground">Email</span>
                  <input className={field} type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
                </label>
              )}
              {mode !== "forgot" && (
                <label className="block">
                  <span className="mb-1.5 flex items-center justify-between text-sm font-medium text-foreground">
                    {mode === "reset" ? "New password" : "Password"}
                    {mode === "signin" && (
                      <button type="button" onClick={() => setMode("forgot")} className="text-xs font-normal text-primary hover:underline cursor-pointer">
                        Forgot password?
                      </button>
                    )}
                  </span>
                  <span className="relative block">
                    <input
                      className={`${field} pr-11`}
                      type={showPassword ? "text" : "password"}
                      required
                      minLength={mode === "signin" ? undefined : 8}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete={mode === "signin" ? "current-password" : "new-password"}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-muted-foreground hover:text-foreground cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </span>
                  {mode !== "signin" && <span className="mt-1 block text-xs text-muted-foreground">At least 8 characters.</span>}
                </label>
              )}
              <button
                type="submit"
                disabled={busy}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background hover:bg-primary hover:text-primary-foreground transition-colors disabled:opacity-60 cursor-pointer"
              >
                {busy && <Loader2 className="h-4 w-4 animate-spin" />}
                {{ signin: "Sign in", signup: "Create account", forgot: "Send reset link", reset: "Save new password" }[mode]}
              </button>
            </form>
          )}

          <div className="mt-6 border-t border-border pt-5 text-sm text-muted-foreground">
            {mode === "signin" && (
              <>New here?{" "}<button type="button" onClick={() => setMode("signup")} className="font-medium text-primary hover:underline cursor-pointer">Create a free account</button></>
            )}
            {mode === "signup" && (
              <>Already have an account?{" "}<button type="button" onClick={() => setMode("signin")} className="font-medium text-primary hover:underline cursor-pointer">Sign in</button></>
            )}
            {(mode === "forgot" || mode === "reset") && (
              <button type="button" onClick={() => { setMode("signin"); setSentReset(false); }} className="font-medium text-primary hover:underline cursor-pointer">Back to sign in</button>
            )}
          </div>
          {mode === "signup" && (
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              By creating an account you agree to the <Link to="/terms" className="underline underline-offset-2">terms</Link> and{" "}
              <Link to="/privacy" className="underline underline-offset-2">privacy policy</Link>.
            </p>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}
