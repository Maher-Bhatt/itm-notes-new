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
      <div className="min-h-screen flex items-center justify-center bg-[#F6F3EC] dark:bg-[#111111]">
        <Loader2 className="h-8 w-8 animate-spin text-[#2B4EFF]" />
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
    const hasCompletedOnboarding = profile?.onboarding_completed === true || 
      (profile?.onboarding_completed === null && Boolean(profile?.semester));

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
      <div className="min-h-screen bg-[#F6F3EC] dark:bg-[#111111] flex items-center justify-center p-4 antialiased">
        <div className="w-full max-w-md bg-white dark:bg-[#1C1C1E] border border-rose-500/30 rounded-[24px] p-8 shadow-xl space-y-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-500 mx-auto flex items-center justify-center">
            <ShieldAlert className="h-8 w-8" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#111111] dark:text-white">Access Denied (403)</h2>
            <p className="text-xs text-[#6B7280] dark:text-neutral-400 mt-2 leading-relaxed">
              The Admin Portal is restricted to verified administrators of ITM SLS Baroda. Your current account (<span className="font-mono text-foreground font-semibold">{user.email}</span>) does not have administrative privileges.
            </p>
          </div>
          <div className="pt-2">
            <button
              onClick={() => navigate("/dashboard")}
              className="w-full py-2.5 px-4 rounded-full bg-[#111111] dark:bg-white text-white dark:text-[#111111] text-xs font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2 cursor-pointer"
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
