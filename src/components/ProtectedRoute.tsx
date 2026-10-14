import React, { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, ShieldAlert, KeyRound, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

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
  const [pin, setPin] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // Admin routes bypass student onboarding requirements
  if (!requireAdmin) {
    const hasCompletedOnboarding = profile?.onboarding_completed === true || (profile?.onboarding_completed === null && Boolean(profile?.semester));

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
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 antialiased">
        <div className="w-full max-w-md bg-slate-900 border border-rose-500/30 rounded-2xl p-8 shadow-2xl space-y-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 mx-auto flex items-center justify-center">
            <ShieldAlert className="h-8 w-8" />
          </div>
          <div>
            <span className="px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[10px] font-bold uppercase tracking-wider">
              403 • Unauthorized Access
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight mt-2">Platform Admin Console Restricted</h2>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Signed in as <span className="text-slate-200 font-mono font-semibold">{user.email}</span>. This command area is strictly reserved for the platform founder and authorized university administrators.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-left space-y-1.5 text-xs text-slate-400">
            <div className="flex items-center gap-1.5 font-bold text-slate-300">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span>Security Policy Enforced</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Direct access requires authenticated administrator credentials in the university database.
            </p>
          </div>

          <button
            onClick={() => navigate("/dashboard")}
            className="w-full h-11 bg-[#183F36] hover:bg-[#1f5246] text-[#D6E85D] rounded-xl text-xs font-bold shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer border border-[#D6E85D]/30"
          >
            <ArrowLeft className="h-4 w-4" /> Return to Student Dashboard
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
