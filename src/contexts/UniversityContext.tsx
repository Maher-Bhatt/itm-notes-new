import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import {
  UniversityData,
  UniversitySubject,
  UniversityPeriod,
  UniversityExamSchedule,
  UniversityCampusClub,
  GUJARAT_UNIVERSITIES,
  getUniversityById,
} from '@/data/universitiesData';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';

interface UniversityContextType {
  currentUniversity: UniversityData;
  allUniversities: UniversityData[];
  selectedUniversityId: string;
  setUniversity: (universityId: string) => Promise<void>;
  activeDivision: string;
  setActiveDivision: (division: string) => Promise<void>;
  activeSubjects: UniversitySubject[];
  activeTimetable: UniversityPeriod[];
  activeExamSchedule: UniversityExamSchedule;
  activeClubs: UniversityCampusClub[];
  getSubjectsBySemester: (sem: number) => UniversitySubject[];
}

const LOCAL_STORAGE_KEY = 'itm_selected_university';
const LOCAL_DIVISION_KEY = 'itm_selected_division';

const UniversityContext = createContext<UniversityContextType | undefined>(undefined);

export const UniversityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, profile, updateProfile } = useAuth();

  // Initialize from profile, localStorage or default to 'itm-baroda'
  const [selectedUniversityId, setSelectedUniversityId] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) return saved;
    } catch {
      // ignore
    }
    return profile?.university || 'itm-baroda';
  });

  // Active division state
  const [activeDivision, setActiveDivisionState] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_DIVISION_KEY);
      if (saved) return saved;
    } catch {
      // ignore
    }
    return profile?.division || 'Div A';
  });

  // Sync if profile.university arrives from Supabase
  useEffect(() => {
    if (profile?.university && profile.university !== selectedUniversityId) {
      setSelectedUniversityId(profile.university);
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, profile.university);
      } catch {
        // ignore
      }
    }
    if (profile?.division && profile.division !== activeDivision) {
      setActiveDivisionState(profile.division);
      try {
        localStorage.setItem(LOCAL_DIVISION_KEY, profile.division);
      } catch {
        // ignore
      }
    }
  }, [profile?.university, profile?.division]);

  const currentUniversity = useMemo(() => {
    return getUniversityById(selectedUniversityId);
  }, [selectedUniversityId]);

  // Switch university
  const setUniversity = useCallback(
    async (universityId: string) => {
      const target = getUniversityById(universityId);
      setSelectedUniversityId(target.id);
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, target.id);
      } catch {
        // ignore
      }

      // If user is logged in, persist to Supabase profile
      if (user?.id) {
        try {
          await updateProfile({ university: target.id });
        } catch (e) {
          console.warn('Could not update university on remote profile:', e);
        }
      }

      toast.success(`Active Campus set to ${target.shortName}`, {
        description: `Curriculum, timetable, and study banks adjusted for ${target.location}.`,
      });
    },
    [user?.id, updateProfile]
  );

  // Switch division
  const setActiveDivision = useCallback(
    async (division: string) => {
      setActiveDivisionState(division);
      try {
        localStorage.setItem(LOCAL_DIVISION_KEY, division);
      } catch {
        // ignore
      }

      if (user?.id) {
        try {
          await updateProfile({ division });
        } catch (e) {
          console.warn('Could not update division on remote profile:', e);
        }
      }
    },
    [user?.id, updateProfile]
  );

  // Active subjects for semester 3 (or user semester)
  const activeSemester = profile?.semester || 3;

  const activeSubjects = useMemo(() => {
    return currentUniversity.subjects.filter((s) => s.semester === activeSemester);
  }, [currentUniversity, activeSemester]);

  const getSubjectsBySemester = useCallback(
    (sem: number) => {
      return currentUniversity.subjects.filter((s) => s.semester === sem);
    },
    [currentUniversity]
  );

  // Active timetable filtered by active division
  const activeTimetable = useMemo(() => {
    const matched = currentUniversity.dailyTimetable.filter((t) => t.division === activeDivision);
    return matched.length > 0 ? matched : currentUniversity.dailyTimetable.slice(0, 4);
  }, [currentUniversity, activeDivision]);

  const activeExamSchedule = useMemo(() => {
    return currentUniversity.examSchedule;
  }, [currentUniversity]);

  const activeClubs = useMemo(() => {
    return currentUniversity.clubs;
  }, [currentUniversity]);

  return (
    <UniversityContext.Provider
      value={{
        currentUniversity,
        allUniversities: GUJARAT_UNIVERSITIES,
        selectedUniversityId,
        setUniversity,
        activeDivision,
        setActiveDivision,
        activeSubjects,
        activeTimetable,
        activeExamSchedule,
        activeClubs,
        getSubjectsBySemester,
      }}
    >
      {children}
    </UniversityContext.Provider>
  );
};

export function useUniversity(): UniversityContextType {
  const context = useContext(UniversityContext);
  if (!context) {
    throw new Error('useUniversity must be used within a UniversityProvider');
  }
  return context;
}
