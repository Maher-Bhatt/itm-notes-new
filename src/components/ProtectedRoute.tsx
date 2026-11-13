import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, ShieldAlert, ArrowLeft } from "lucide-react";
import { CampusButton } from "@/components/campusloop/CampusButton";

export function ProtectedRoute({ 
  children, 
  requireAdmin = false 
}: { 
  children: React.ReactNode; 
  requireAdmin?: boolean; 
}) {
  const { user, role, profile, isLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Show clean spinner while auth session is initializing
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background dark:bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // COMPULSORY SIGN-IN: Signed-out users are strictly redirected to /auth
  // No guest bypass allowed anywhere in the app
  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // Onboarding enforcement for regular students
  if (!requireAdmin && user) {
    const isLocallyDone = typeof window !== 'undefined' && (
      localStorage.getItem('campusloop_onboarding_done') === 'true' ||
      localStorage.getItem('itm_student_onboarding_completed') === 'true' ||
      localStorage.getItem('itm_onboarding_skipped') === 'true'
    );

    const hasCompletedOnboarding = isLocallyDone || 
      profile?.onboarding_completed === true || 
      (profile?.onboarding_completed === null && Boolean(profile?.semester)) ||
      Boolean(profile?.semester);

    if (!hasCompletedOnboarding && location.pathname !== "/onboarding") {
      return <Navigate to="/onboarding" replace />;
    }

    if (hasCompletedOnboarding && location.pathname === "/onboarding") {
      return <Navigate to="/dashboard" replace />;
    }
  }

  // Admin Route Verification — Strict Founder & Verified Admin Role Only
  const isVerifiedAdmin = role === 'admin' || user?.email?.toLowerCase() === 'maherbhatt01@gmail.com';

  if (requireAdmin && !isVerifiedAdmin) {
    return (
      <div className="min-h-screen bg-background dark:bg-background flex items-center justify-center p-4 antialiased">
        <div className="w-full max-w-md bg-white dark:bg-card border border-destructive/30 rounded-2xl p-8 shadow-lg space-y-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-destructive/10 border border-destructive/20 text-destructive mx-auto flex items-center justify-center">
            <ShieldAlert className="h-8 w-8" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground dark:text-white">Access Denied (403)</h2>
            <p className="text-xs text-muted-foreground dark:text-stone-400 mt-2 leading-relaxed">
              The Admin Portal is restricted to verified administrators of ITM SLS Baroda. Your current account (<span className="font-mono text-foreground font-semibold">{user.email}</span>) does not have administrative privileges.
            </p>
          </div>
          <div className="pt-2">
            <button
              onClick={() => navigate("/dashboard")}
              className="w-full py-2.5 px-4 rounded-full bg-foreground dark:bg-white text-white dark:text-foreground text-xs font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Return to Student Dashboard</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
