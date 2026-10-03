import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { useAuth } from "./AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface AcademicContextType {
  universityId: string | null;
  programId: string | null;
  branchId: string | null;
  semesterId: string | null;
  semesterNumber: number;
  setAcademicContext: (context: {
    universityId?: string;
    programId?: string;
    branchId?: string;
    semesterId?: string;
  }) => void;
  isLoading: boolean;
}

const AcademicContext = createContext<AcademicContextType | undefined>(undefined);

export function AcademicProvider({ children }: { children: React.ReactNode }) {
  const { user, profile } = useAuth();
  const [universityId, setUniversityId] = useState<string | null>(null);
  const [programId, setProgramId] = useState<string | null>(null);
  const [branchId, setBranchId] = useState<string | null>(null);
  const [semesterId, setSemesterId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Sync from profile whenever profile.semester is loaded or updated
  useEffect(() => {
    if (profile?.semester) {
      setSemesterId(`sem-${profile.semester}`);
    }
  }, [profile?.semester]);

  // Reset when user logs out
  useEffect(() => {
    if (!user) {
      setSemesterId(null);
    }
  }, [user]);

  // Derive semester number from semesterId (handles both "sem-N" format and plain numbers)
  const semesterNumber = useMemo(() => {
    if (semesterId) {
      if (semesterId.startsWith("sem-")) {
        const num = parseInt(semesterId.replace("sem-", ""), 10);
        if (!isNaN(num) && num >= 1 && num <= 8) return num;
      }
      const parsed = parseInt(semesterId, 10);
      if (!isNaN(parsed) && parsed >= 1 && parsed <= 8) return parsed;
    }
    if (profile?.semester && Number(profile.semester) >= 1 && Number(profile.semester) <= 8) {
      return Number(profile.semester);
    }
    return 1;
  }, [semesterId, profile?.semester]);

  // Future enhancement: fetch saved academic context from a user_preferences table
  useEffect(() => {
    // For now, load from local storage
    const stored = localStorage.getItem("academic_context");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUniversityId(parsed.universityId || null);
        setProgramId(parsed.programId || null);
        setBranchId(parsed.branchId || null);
        setSemesterId(parsed.semesterId || null);
      } catch (e) {
        console.error("Failed to parse academic context", e);
      }
    }
    setIsLoading(false);
  }, []);

  const setAcademicContext = (context: {
    universityId?: string;
    programId?: string;
    branchId?: string;
    semesterId?: string;
  }) => {
    if (context.universityId !== undefined) setUniversityId(context.universityId);
    if (context.programId !== undefined) setProgramId(context.programId);
    if (context.branchId !== undefined) setBranchId(context.branchId);
    if (context.semesterId !== undefined) setSemesterId(context.semesterId);

    localStorage.setItem("academic_context", JSON.stringify({
      universityId: context.universityId !== undefined ? context.universityId : universityId,
      programId: context.programId !== undefined ? context.programId : programId,
      branchId: context.branchId !== undefined ? context.branchId : branchId,
      semesterId: context.semesterId !== undefined ? context.semesterId : semesterId,
    }));
  };

  return (
    <AcademicContext.Provider
      value={{
        universityId,
        programId,
        branchId,
        semesterId,
        semesterNumber,
        setAcademicContext,
        isLoading,
      }}
    >
      {children}
    </AcademicContext.Provider>
  );
}

export function useAcademic() {
  const context = useContext(AcademicContext);
  if (context === undefined) {
    throw new Error("useAcademic must be used within an AcademicProvider");
  }
  return context;
}
