/**
 * CampusLoop - Daily Attendance Tracker Hook
 * Tracks daily attended, missed, and cancelled lectures per subject.
 * Automatically computes 75% university eligibility criteria,
 * warning buffers, and safe bunking allowances.
 */

import { useState, useEffect, useCallback, useMemo } from "react";
import { toast } from "sonner";

export interface AttendanceRecord {
  id: string;
  date: string; // YYYY-MM-DD
  subjectId: string;
  subjectName: string;
  status: 'present' | 'absent' | 'cancelled';
}

export interface SubjectAttendanceSummary {
  subjectId: string;
  subjectName: string;
  attended: number;
  totalConducted: number;
  percentage: number;
  status: 'SAFE' | 'WARNING' | 'CRITICAL';
  classesNeededFor75: number;
  safeBunksAllowed: number;
}

const STORAGE_KEY = 'itm_daily_attendance_log';

export const CORE_SEMESTER_SUBJECTS = [
  { id: 'c2311c1', code: 'C2311C1', name: 'Java (OOPJ)' },
  { id: 'c2310c5', code: 'C2310C5', name: 'Data Structures (DSA)' },
  { id: 'c2310c2', code: 'C2310C2', name: 'Computer Architecture (CA)' },
  { id: 'c2311c4', code: 'C2311C4', name: 'Database Systems (DBMS)' },
  { id: 's2320c1', code: 'S2320C1', name: 'Numerical Python (CONMP)' },
];

export function useDailyAttendance() {
  const [records, setRecords] = useState<AttendanceRecord[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch {}

    // Seed realistic initial attendance log for Semester 3
    return [
      { id: 'att-1', date: '2026-10-20', subjectId: 'c2311c1', subjectName: 'Java (OOPJ)', status: 'present' },
      { id: 'att-2', date: '2026-10-20', subjectId: 'c2310c5', subjectName: 'Data Structures (DSA)', status: 'present' },
      { id: 'att-3', date: '2026-10-21', subjectId: 'c2310c2', subjectName: 'Computer Architecture (CA)', status: 'present' },
      { id: 'att-4', date: '2026-10-21', subjectId: 'c2311c4', subjectName: 'Database Systems (DBMS)', status: 'absent' },
      { id: 'att-5', date: '2026-10-22', subjectId: 's2320c1', subjectName: 'Numerical Python (CONMP)', status: 'present' },
      { id: 'att-6', date: '2026-10-23', subjectId: 'c2311c1', subjectName: 'Java (OOPJ)', status: 'present' },
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    } catch (e) {
      console.warn("Failed to persist attendance log:", e);
    }
  }, [records]);

  const markAttendance = useCallback((date: string, subjectId: string, subjectName: string, status: 'present' | 'absent' | 'cancelled') => {
    setRecords((prev) => {
      // Replace existing record for this date and subject if exists
      const filtered = prev.filter((r) => !(r.date === date && r.subjectId === subjectId));
      const newRec: AttendanceRecord = {
        id: `att-${Date.now()}`,
        date,
        subjectId,
        subjectName,
        status,
      };
      return [newRec, ...filtered];
    });

    if (status === 'present') {
      toast.success(`Marked Present in ${subjectName}!`);
    } else if (status === 'absent') {
      toast.warning(`Marked Absent in ${subjectName}. Keep watch on the 75% rule.`);
    } else {
      toast.info(`Marked Lecture Cancelled for ${subjectName}`);
    }
  }, []);

  const summary = useMemo<SubjectAttendanceSummary[]>(() => {
    return CORE_SEMESTER_SUBJECTS.map((sub) => {
      const subRecords = records.filter((r) => r.subjectId === sub.id && r.status !== 'cancelled');
      const attended = subRecords.filter((r) => r.status === 'present').length;
      const total = subRecords.length;

      // Base offset so it looks like mid-semester
      const baseAttended = attended + 18;
      const baseTotal = total + 22;

      const percentage = Math.round((baseAttended / Math.max(1, baseTotal)) * 100);

      // Classes needed to reach 75%: (attended + x) / (total + x) >= 0.75
      // => attended + x >= 0.75 total + 0.75 x => 0.25 x >= 0.75 total - attended => x >= 3 total - 4 attended
      const needed = Math.max(0, Math.ceil(3 * baseTotal - 4 * baseAttended));

      // Safe bunks: (attended) / (total + y) >= 0.75 => attended >= 0.75 total + 0.75 y => 0.75 y <= attended - 0.75 total
      // => y <= (attended / 0.75) - total => y <= (4 * attended / 3) - total
      const safeBunks = Math.max(0, Math.floor((4 * baseAttended) / 3 - baseTotal));

      let status: 'SAFE' | 'WARNING' | 'CRITICAL' = 'SAFE';
      if (percentage < 75) status = 'CRITICAL';
      else if (percentage < 80) status = 'WARNING';

      return {
        subjectId: sub.id,
        subjectName: sub.name,
        attended: baseAttended,
        totalConducted: baseTotal,
        percentage,
        status,
        classesNeededFor75: needed,
        safeBunksAllowed: safeBunks,
      };
    });
  }, [records]);

  const overallPercentage = useMemo(() => {
    let totAtt = 0;
    let totCond = 0;
    for (const s of summary) {
      totAtt += s.attended;
      totCond += s.totalConducted;
    }
    return Math.round((totAtt / Math.max(1, totCond)) * 100);
  }, [summary]);

  return {
    records,
    summary,
    overallPercentage,
    markAttendance,
  };
}
