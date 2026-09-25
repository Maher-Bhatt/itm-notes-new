import { useState, useMemo, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { 
  Calculator, 
  Sparkles, 
  Award, 
  Plus, 
  Trash2, 
  RotateCcw, 
  TrendingUp, 
  CheckCircle,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  BookOpen,
  Calendar,
  Clock,
  ShieldCheck,
  ShieldAlert,
  Percent
} from 'lucide-react';
import { toast } from 'sonner';

interface SubjectGrade {
  id: string;
  name: string;
  code: string;
  credits: number;
  internalMarks: number; // out of 50 (MST 30 + Assignment 20)
  externalMarks: number; // out of 50
  grade?: string;
}

interface SubjectAttendance {
  id: string;
  name: string;
  code: string;
  attended: number;
  total: number;
}

const DEFAULT_ATTENDANCE: SubjectAttendance[] = [
  { id: 'ca-att', name: 'Computer Architecture', code: 'CS401', attended: 28, total: 32 },
  { id: 'dsa-att', name: 'Data Structures & Algorithms', code: 'DSA301', attended: 30, total: 35 },
  { id: 'dbms-att', name: 'Database Management Systems', code: 'DBMS302', attended: 26, total: 32 },
  { id: 'java-att', name: 'OOP with Java', code: 'JAVA303', attended: 27, total: 30 },
  { id: 'coanmp-att', name: 'Numerical Methods (COANMP)', code: 'COANMP', attended: 24, total: 28 },
  { id: 'dsa-lab-att', name: 'DSA Laboratory', code: 'DSA301P', attended: 12, total: 12 },
  { id: 'dbms-lab-att', name: 'DBMS Laboratory', code: 'DBMS302P', attended: 11, total: 12 },
  { id: 'java-lab-att', name: 'Java Laboratory', code: 'JAVA303P', attended: 11, total: 12 },
];

const DEFAULT_SEM3_SUBJECTS: SubjectGrade[] = [
  { id: 'ca', name: 'Computer Architecture', code: 'CS401', credits: 4, internalMarks: 40, externalMarks: 42 },
  { id: 'dsa', name: 'Data Structures & Algorithms', code: 'DSA301', credits: 4, internalMarks: 42, externalMarks: 40 },
  { id: 'dbms', name: 'Database Management Systems', code: 'DBMS302', credits: 4, internalMarks: 41, externalMarks: 39 },
  { id: 'java', name: 'OOP with Java', code: 'JAVA303', credits: 3, internalMarks: 44, externalMarks: 43 },
  { id: 'coanmp', name: 'Numerical Methods (COANMP)', code: 'COANMP', credits: 3, internalMarks: 39, externalMarks: 41 },
  { id: 'dsa-lab', name: 'DSA Laboratory', code: 'DSA301P', credits: 1, internalMarks: 45, externalMarks: 46 },
  { id: 'dbms-lab', name: 'DBMS Laboratory', code: 'DBMS302P', credits: 1, internalMarks: 44, externalMarks: 45 },
  { id: 'java-lab', name: 'Java Laboratory', code: 'JAVA303P', credits: 1, internalMarks: 46, externalMarks: 47 },
];

function getGradeFromPercentage(percentage: number): { grade: string; points: number; label: string } {
  if (percentage >= 85) return { grade: 'AA', points: 10, label: 'Outstanding' };
  if (percentage >= 75) return { grade: 'AB', points: 9, label: 'Excellent' };
  if (percentage >= 65) return { grade: 'BB', points: 8, label: 'Very Good' };
  if (percentage >= 55) return { grade: 'BC', points: 7, label: 'Good' };
  if (percentage >= 45) return { grade: 'CC', points: 6, label: 'Fair' };
  if (percentage >= 40) return { grade: 'CD', points: 5, label: 'Average' };
  if (percentage >= 35) return { grade: 'DD', points: 4, label: 'Pass' };
  return { grade: 'FF', points: 0, label: 'Fail / Remedial' };
}

export default function GpaCalculatorPage() {
  const [subjects, setSubjects] = useState<SubjectGrade[]>(DEFAULT_SEM3_SUBJECTS);
  const [targetSgpa, setTargetSgpa] = useState<number>(8.5);
  const [activeTab, setActiveTab] = useState<'sgpa' | 'cgpa' | 'attendance'>('sgpa');

  // Attendance states
  const [overallTotalClasses, setOverallTotalClasses] = useState<number>(48);
  const [overallAttendedClasses, setOverallAttendedClasses] = useState<number>(38);
  const [targetAttendancePercent, setTargetAttendancePercent] = useState<number>(75);

  const [subjectAttendance, setSubjectAttendance] = useState<SubjectAttendance[]>(() => {
    try {
      const saved = localStorage.getItem('itm_attendance_records');
      if (saved) return JSON.parse(saved);
    } catch {}
    return DEFAULT_ATTENDANCE;
  });

  useEffect(() => {
    try {
      localStorage.setItem('itm_attendance_records', JSON.stringify(subjectAttendance));
    } catch {}
  }, [subjectAttendance]);

  // Overall attendance statistics
  const attendanceStats = useMemo(() => {
    const total = Math.max(1, overallTotalClasses);
    const attended = Math.min(total, Math.max(0, overallAttendedClasses));
    const currentPercent = (attended / total) * 100;
    const req = targetAttendancePercent;

    const safeBunks = Math.max(0, Math.floor((100 * attended) / req - total));
    const neededClasses = Math.max(0, Math.ceil((req * total - 100 * attended) / (100 - req)));

    return {
      total,
      attended,
      currentPercent: Math.round(currentPercent * 10) / 10,
      isSafe: currentPercent >= req,
      safeBunks,
      neededClasses,
    };
  }, [overallTotalClasses, overallAttendedClasses, targetAttendancePercent]);

  // CGPA Tab states
  const [prevSemesters, setPrevSemesters] = useState([
    { sem: 1, sgpa: 8.2, credits: 20 },
    { sem: 2, sgpa: 8.4, credits: 21 },
  ]);

  // SGPA Calculation
  const result = useMemo(() => {
    let totalCredits = 0;
    let totalGradePoints = 0;

    const breakdown = subjects.map((sub) => {
      const totalMarks = Math.min(100, Math.max(0, Number(sub.internalMarks) + Number(sub.externalMarks)));
      const { grade, points, label } = getGradeFromPercentage(totalMarks);
      const weightedPoints = points * sub.credits;

      totalCredits += sub.credits;
      totalGradePoints += weightedPoints;

      return {
        ...sub,
        totalMarks,
        grade,
        points,
        label,
        weightedPoints,
      };
    });

    const sgpa = totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : '0.00';
    const percentageEquivalent = ((Number(sgpa) - 0.75) * 10).toFixed(1);

    return {
      totalCredits,
      totalGradePoints,
      sgpa: Number(sgpa),
      percentageEquivalent: Math.max(0, Number(percentageEquivalent)),
      breakdown,
    };
  }, [subjects]);

  // Overall CGPA Calculation
  const cgpaResult = useMemo(() => {
    let totalCredits = result.totalCredits;
    let totalWeightedSgpa = result.sgpa * result.totalCredits;

    prevSemesters.forEach((p) => {
      totalCredits += p.credits;
      totalWeightedSgpa += p.sgpa * p.credits;
    });

    const cgpa = totalCredits > 0 ? (totalWeightedSgpa / totalCredits).toFixed(2) : '0.00';
    return {
      cgpa: Number(cgpa),
      totalCredits,
    };
  }, [prevSemesters, result]);

  const updateSubjectMarks = (id: string, field: 'internalMarks' | 'externalMarks' | 'credits', val: number) => {
    setSubjects((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: Math.max(0, val) } : s))
    );
  };

  const removeSubject = (id: string) => {
    setSubjects((prev) => prev.filter((s) => s.id !== id));
    toast.info('Subject removed from calculation');
  };

  const addSubject = () => {
    const newSub: SubjectGrade = {
      id: `custom-${Date.now()}`,
      name: 'Elective / Custom Subject',
      code: 'ELEC301',
      credits: 3,
      internalMarks: 35,
      externalMarks: 35,
    };
    setSubjects((prev) => [...prev, newSub]);
    toast.success('Added new course row');
  };

  const resetToDefault = () => {
    setSubjects(DEFAULT_SEM3_SUBJECTS);
    toast.info('Reset to standard Semester 3 curriculum');
  };

  const updateSubjectAttendance = (id: string, field: 'attended' | 'total', val: number) => {
    setSubjectAttendance((prev) =>
      prev.map((s) => {
        if (s.id !== id) return s;
        const updated = { ...s, [field]: Math.max(0, val) };
        if (field === 'total' && updated.attended > val) {
          updated.attended = val;
        }
        return updated;
      })
    );
  };

  const removeSubjectAttendance = (id: string) => {
    setSubjectAttendance((prev) => prev.filter((s) => s.id !== id));
    toast.info('Subject removed from attendance tracker');
  };

  const addSubjectAttendance = () => {
    const newSub: SubjectAttendance = {
      id: `att-custom-${Date.now()}`,
      name: 'New Subject / Lab',
      code: 'SUB301',
      attended: 20,
      total: 25,
    };
    setSubjectAttendance((prev) => [...prev, newSub]);
    toast.success('Added new subject to attendance tracker');
  };

  const resetAttendance = () => {
    setSubjectAttendance(DEFAULT_ATTENDANCE);
    setOverallTotalClasses(48);
    setOverallAttendedClasses(38);
    toast.info('Reset attendance records to default Semester 3');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-8 animate-fade-in">
        {/* Banner Section */}
        <div className="bg-gradient-to-r from-primary/10 via-secondary/40 to-background border border-border/80 rounded-3xl p-6 sm:p-10 mb-8 shadow-sm">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30">
              ITM SLS Baroda University
            </span>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              10-Point Relative Grading System
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-3 tracking-tight flex items-center gap-3">
            <Calculator className="h-8 w-8 text-primary" />
            University SGPA & CGPA Predictor
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-3xl mb-6">
            Enter your internal Mid-Semester Test (MST) + Assignment marks and projected External Exam scores to calculate your exact SGPA, grade breakdown, and predicted cumulative CGPA.
          </p>

          {/* Quick Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-border/60 pb-1">
            <button
              onClick={() => setActiveTab('sgpa')}
              className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all ${
                activeTab === 'sgpa'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              }`}
            >
              Semester SGPA Predictor
            </button>
            <button
              onClick={() => setActiveTab('cgpa')}
              className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all ${
                activeTab === 'cgpa'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              }`}
            >
              Cumulative CGPA History
            </button>
            <button
              onClick={() => setActiveTab('attendance')}
              className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'attendance'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              }`}
            >
              <Clock className="h-4 w-4" /> 75% Attendance Tracker
            </button>
          </div>
        </div>

        {/* ── Summary Result Cards ── */}
        {activeTab === 'attendance' ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
            <div className={`bg-card border rounded-2xl p-6 shadow-sm flex items-center justify-between ${
              attendanceStats.isSafe ? 'border-emerald-500/40' : 'border-rose-500/40'
            }`}>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                  Overall Attendance
                </p>
                <div className={`text-4xl sm:text-5xl font-black font-mono ${
                  attendanceStats.isSafe ? 'text-emerald-500' : 'text-rose-500'
                }`}>
                  {attendanceStats.currentPercent}%
                </div>
                <p className="text-[11px] text-muted-foreground mt-1">
                  {attendanceStats.attended} Attended / {attendanceStats.total} Conducted
                </p>
              </div>
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                attendanceStats.isSafe ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
              }`}>
                {attendanceStats.isSafe ? <ShieldCheck className="h-7 w-7" /> : <ShieldAlert className="h-7 w-7" />}
              </div>
            </div>

            <div className="bg-card border border-border/80 rounded-2xl p-6 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                  {attendanceStats.isSafe ? 'Safe Bunk Margin' : 'Consecutive Needed'}
                </p>
                <div className="text-4xl sm:text-5xl font-black text-foreground font-mono">
                  {attendanceStats.isSafe ? `${attendanceStats.safeBunks} Classes` : `${attendanceStats.neededClasses} Classes`}
                </div>
                <p className="text-[11px] text-muted-foreground mt-1">
                  {attendanceStats.isSafe 
                    ? `Can skip safely without dropping below ${targetAttendancePercent}%` 
                    : `Must attend consecutively to reach ${targetAttendancePercent}%`}
                </p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <Calendar className="h-7 w-7" />
              </div>
            </div>

            <div className={`bg-card border rounded-2xl p-6 shadow-sm flex items-center justify-between ${
              attendanceStats.isSafe ? 'border-emerald-500/30' : 'border-rose-500/30'
            }`}>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                  Hall Ticket Eligibility
                </p>
                <div className={`text-2xl sm:text-3xl font-black tracking-tight ${
                  attendanceStats.isSafe ? 'text-emerald-500' : 'text-rose-500'
                }`}>
                  {attendanceStats.isSafe ? 'EXAM ELIGIBLE' : 'DEBARRED RISK'}
                </div>
                <p className="text-[11px] text-muted-foreground mt-1">
                  Mandatory 75% rule for ITM SLS Baroda exams
                </p>
              </div>
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                attendanceStats.isSafe ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
              }`}>
                {attendanceStats.isSafe ? <CheckCircle2 className="h-7 w-7" /> : <AlertTriangle className="h-7 w-7" />}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
            <div className="bg-card border border-primary/30 rounded-2xl p-6 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                  Predicted Semester SGPA
                </p>
                <div className="text-4xl sm:text-5xl font-black text-primary font-mono">
                  {result.sgpa.toFixed(2)}
                </div>
                <p className="text-[11px] text-muted-foreground mt-1">
                  Out of 10.00 · {result.totalCredits} Total Credits
                </p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <Award className="h-7 w-7" />
              </div>
            </div>

            <div className="bg-card border border-border/80 rounded-2xl p-6 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                  Equivalent Percentage
                </p>
                <div className="text-4xl sm:text-5xl font-black text-foreground font-mono">
                  {result.percentageEquivalent}%
                </div>
                <p className="text-[11px] text-muted-foreground mt-1">
                  Formula: (SGPA - 0.75) × 10
                </p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <TrendingUp className="h-7 w-7" />
              </div>
            </div>

            <div className="bg-card border border-border/80 rounded-2xl p-6 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                  Cumulative CGPA (Overall)
                </p>
                <div className="text-4xl sm:text-5xl font-black text-amber-500 font-mono">
                  {cgpaResult.cgpa.toFixed(2)}
                </div>
                <p className="text-[11px] text-muted-foreground mt-1">
                  Across {cgpaResult.totalCredits} Completed Credits
                </p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Sparkles className="h-7 w-7" />
              </div>
            </div>
          </div>
        )}

        {/* ── Table & Interactive Editor ── */}
        {activeTab === 'sgpa' ? (
          <div className="bg-card border border-border/80 rounded-2xl shadow-sm overflow-hidden mb-8">
            <div className="p-5 bg-secondary/30 border-b border-border flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="font-bold text-base text-foreground">Semester 3 Course Breakdown</h3>
                <p className="text-xs text-muted-foreground">Adjust your marks to test different exam scenarios</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={resetToDefault}
                  className="px-3 py-1.5 rounded-lg bg-secondary hover:bg-secondary/80 text-foreground font-semibold text-xs transition-colors flex items-center gap-1.5"
                >
                  <RotateCcw className="h-3.5 w-3.5" /> Reset Default
                </button>
                <button
                  onClick={addSubject}
                  className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground font-bold text-xs hover:opacity-90 transition-opacity flex items-center gap-1.5 shadow-sm"
                >
                  <Plus className="h-3.5 w-3.5" /> Add Course
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-secondary/50 text-muted-foreground uppercase text-[11px] font-bold border-b border-border">
                  <tr>
                    <th className="py-3 px-4">Subject</th>
                    <th className="py-3 px-3">Credits</th>
                    <th className="py-3 px-3">Internal (50)</th>
                    <th className="py-3 px-3">External (50)</th>
                    <th className="py-3 px-3">Total (100)</th>
                    <th className="py-3 px-3">Grade</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {result.breakdown.map((sub) => (
                    <tr key={sub.id} className="hover:bg-secondary/20 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-foreground">
                        <div>{sub.name}</div>
                        <span className="text-[11px] font-mono text-muted-foreground">{sub.code}</span>
                      </td>

                      <td className="py-3.5 px-3">
                        <input
                          type="number"
                          min="1"
                          max="6"
                          value={sub.credits}
                          onChange={(e) => updateSubjectMarks(sub.id, 'credits', Number(e.target.value))}
                          className="w-14 h-8 px-2 rounded-lg border border-input bg-background font-mono text-xs focus:ring-1 focus:ring-primary text-center"
                        />
                      </td>

                      <td className="py-3.5 px-3">
                        <input
                          type="number"
                          min="0"
                          max="50"
                          value={sub.internalMarks}
                          onChange={(e) => updateSubjectMarks(sub.id, 'internalMarks', Number(e.target.value))}
                          className="w-16 h-8 px-2 rounded-lg border border-input bg-background font-mono text-xs focus:ring-1 focus:ring-primary text-center"
                        />
                      </td>

                      <td className="py-3.5 px-3">
                        <input
                          type="number"
                          min="0"
                          max="50"
                          value={sub.externalMarks}
                          onChange={(e) => updateSubjectMarks(sub.id, 'externalMarks', Number(e.target.value))}
                          className="w-16 h-8 px-2 rounded-lg border border-input bg-background font-mono text-xs focus:ring-1 focus:ring-primary text-center"
                        />
                      </td>

                      <td className="py-3.5 px-3 font-mono font-bold text-foreground">
                        {sub.totalMarks} / 100
                      </td>

                      <td className="py-3.5 px-3">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full font-bold text-xs ${
                          sub.grade === 'AA'
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                            : sub.grade === 'AB' || sub.grade === 'BB'
                            ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20'
                            : sub.grade === 'BC' || sub.grade === 'CC'
                            ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                            : 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20'
                        }`}>
                          {sub.grade} ({sub.points} pts)
                        </span>
                      </td>

                      <td className="py-3.5 px-3 text-right">
                        <button
                          onClick={() => removeSubject(sub.id)}
                          className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                          title="Remove Subject"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : activeTab === 'cgpa' ? (
          /* ── CGPA Historical Semesters Tab ── */
          <div className="bg-card border border-border/80 rounded-2xl p-6 shadow-sm mb-8">
            <h3 className="font-bold text-base text-foreground mb-1">Previous Semester Performance</h3>
            <p className="text-xs text-muted-foreground mb-6">
              Enter your official SGPA and total credits from Semester 1 and Semester 2 grade sheets.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {prevSemesters.map((p, idx) => (
                <div key={p.sem} className="p-4 rounded-xl border border-border bg-secondary/30 space-y-3">
                  <h4 className="font-bold text-sm text-foreground flex items-center justify-between">
                    <span>Semester {p.sem}</span>
                    <span className="text-xs text-primary font-mono font-semibold">{p.credits} Credits</span>
                  </h4>
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <label className="text-[11px] font-semibold text-muted-foreground block mb-1">SGPA</label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        max="10"
                        value={p.sgpa}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setPrevSemesters((prev) =>
                            prev.map((item, i) => (i === idx ? { ...item, sgpa: val } : item))
                          );
                        }}
                        className="w-full h-9 px-3 rounded-lg border border-input bg-background font-mono text-sm"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="text-[11px] font-semibold text-muted-foreground block mb-1">Credits</label>
                      <input
                        type="number"
                        min="10"
                        max="30"
                        value={p.credits}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setPrevSemesters((prev) =>
                            prev.map((item, i) => (i === idx ? { ...item, credits: val } : item))
                          );
                        }}
                        className="w-full h-9 px-3 rounded-lg border border-input bg-background font-mono text-sm"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* ── 75% Attendance Requirement & Bunk Manager Tab ── */
          <div className="space-y-8 mb-8">
            {/* Quick Model Section */}
            <div className="bg-card border border-border/80 rounded-2xl p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-border/60">
                <div>
                  <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Overall 75% Attendance Modeler
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    ITM SLS Baroda University UGC Regulation: 75% aggregate attendance is required to generate final exam hall ticket.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-muted-foreground">Target:</span>
                  {[75, 80, 85].map((pct) => (
                    <button
                      key={pct}
                      onClick={() => setTargetAttendancePercent(pct)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        targetAttendancePercent === pct
                          ? 'bg-primary text-primary-foreground shadow-sm'
                          : 'bg-secondary text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {pct}%
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
                <div>
                  <label className="text-xs font-semibold text-foreground block mb-1.5">
                    Classes Conducted / Held So Far
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="300"
                    value={overallTotalClasses}
                    onChange={(e) => setOverallTotalClasses(Math.max(1, Number(e.target.value)))}
                    className="w-full h-11 px-4 rounded-xl border border-input bg-background font-mono text-base font-semibold focus:ring-2 focus:ring-primary"
                  />
                  <p className="text-[11px] text-muted-foreground mt-1">Total periods scheduled across all subjects</p>
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground block mb-1.5">
                    Classes Actually Attended
                  </label>
                  <input
                    type="number"
                    min="0"
                    max={overallTotalClasses}
                    value={overallAttendedClasses}
                    onChange={(e) => setOverallAttendedClasses(Math.min(overallTotalClasses, Math.max(0, Number(e.target.value))))}
                    className="w-full h-11 px-4 rounded-xl border border-input bg-background font-mono text-base font-semibold focus:ring-2 focus:ring-primary"
                  />
                  <p className="text-[11px] text-muted-foreground mt-1">Number of lectures where you were present</p>
                </div>
              </div>

              {/* Attendance Visual Bar */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-muted-foreground">Current Attendance: {attendanceStats.currentPercent}%</span>
                  <span className="text-primary font-bold">Requirement Threshold: {targetAttendancePercent}%</span>
                </div>
                <div className="relative w-full h-4 rounded-full bg-secondary overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 rounded-full ${
                      attendanceStats.isSafe ? 'bg-emerald-500' : 'bg-rose-500'
                    }`}
                    style={{ width: `${Math.min(100, attendanceStats.currentPercent)}%` }}
                  />
                  {/* 75% threshold indicator line */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-foreground/80 z-10 shadow"
                    style={{ left: `${targetAttendancePercent}%` }}
                    title={`Minimum ${targetAttendancePercent}% Required`}
                  />
                </div>
              </div>

              {/* Actionable Advice Box */}
              <div className={`p-4 rounded-xl border flex items-start gap-3.5 ${
                attendanceStats.isSafe
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-950 dark:text-emerald-200'
                  : 'bg-rose-500/10 border-rose-500/30 text-rose-950 dark:text-rose-200'
              }`}>
                {attendanceStats.isSafe ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                )}
                <div className="text-xs sm:text-sm leading-relaxed">
                  {attendanceStats.isSafe ? (
                    <div>
                      <strong className="font-bold text-emerald-600 dark:text-emerald-400 block mb-0.5">
                        🎉 Safe Zone: You have a healthy attendance buffer!
                      </strong>
                      You can safely bunk / skip up to <strong>{attendanceStats.safeBunks} more classes</strong> without dropping below the mandatory {targetAttendancePercent}% exam threshold.
                    </div>
                  ) : (
                    <div>
                      <strong className="font-bold text-rose-600 dark:text-rose-400 block mb-0.5">
                        ⚠️ Shortage Alert: You are below the 75% requirement!
                      </strong>
                      You must attend the next <strong>{attendanceStats.neededClasses} consecutive classes</strong> without missing a single period to bring your attendance back up to {targetAttendancePercent}%.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Subject-by-Subject Attendance Table */}
            <div className="bg-card border border-border/80 rounded-2xl shadow-sm overflow-hidden">
              <div className="p-5 bg-secondary/30 border-b border-border flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="font-bold text-base text-foreground">Semester 3 Subject-Wise Attendance Log</h3>
                  <p className="text-xs text-muted-foreground">Keep track of individual course attendance to prevent subject-wise debarment</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={resetAttendance}
                    className="px-3 py-1.5 rounded-lg bg-secondary hover:bg-secondary/80 text-foreground font-semibold text-xs transition-colors flex items-center gap-1.5"
                  >
                    <RotateCcw className="h-3.5 w-3.5" /> Reset Default
                  </button>
                  <button
                    onClick={addSubjectAttendance}
                    className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground font-bold text-xs hover:opacity-90 transition-opacity flex items-center gap-1.5 shadow-sm"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add Course
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-secondary/50 text-muted-foreground uppercase text-[11px] font-bold border-b border-border">
                    <tr>
                      <th className="py-3 px-4">Subject</th>
                      <th className="py-3 px-3">Attended</th>
                      <th className="py-3 px-3">Total Held</th>
                      <th className="py-3 px-3">Attendance %</th>
                      <th className="py-3 px-3">75% Recommendation</th>
                      <th className="py-3 px-3">Status</th>
                      <th className="py-3 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {subjectAttendance.map((sub) => {
                      const total = Math.max(1, sub.total);
                      const attended = Math.min(total, Math.max(0, sub.attended));
                      const pct = Math.round((attended / total) * 100);
                      const isSafe = pct >= 75;
                      const bunks = Math.max(0, Math.floor((100 * attended) / 75 - total));
                      const needed = Math.max(0, Math.ceil((75 * total - 100 * attended) / 25));

                      return (
                        <tr key={sub.id} className="hover:bg-secondary/20 transition-colors">
                          <td className="py-3.5 px-4 font-semibold text-foreground">
                            <div>{sub.name}</div>
                            <span className="text-[11px] font-mono text-muted-foreground">{sub.code}</span>
                          </td>

                          <td className="py-3.5 px-3">
                            <input
                              type="number"
                              min="0"
                              max={sub.total}
                              value={sub.attended}
                              onChange={(e) => updateSubjectAttendance(sub.id, 'attended', Number(e.target.value))}
                              className="w-16 h-8 px-2 rounded-lg border border-input bg-background font-mono text-xs focus:ring-1 focus:ring-primary text-center"
                            />
                          </td>

                          <td className="py-3.5 px-3">
                            <input
                              type="number"
                              min="1"
                              max="100"
                              value={sub.total}
                              onChange={(e) => updateSubjectAttendance(sub.id, 'total', Number(e.target.value))}
                              className="w-16 h-8 px-2 rounded-lg border border-input bg-background font-mono text-xs focus:ring-1 focus:ring-primary text-center"
                            />
                          </td>

                          <td className="py-3.5 px-3 font-mono font-bold">
                            <span className={isSafe ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}>
                              {pct}%
                            </span>
                          </td>

                          <td className="py-3.5 px-3 text-xs">
                            {isSafe ? (
                              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                                Can bunk {bunks} class{bunks === 1 ? '' : 'es'}
                              </span>
                            ) : (
                              <span className="text-rose-600 dark:text-rose-400 font-semibold">
                                Must attend {needed} class{needed === 1 ? '' : 'es'}
                              </span>
                            )}
                          </td>

                          <td className="py-3.5 px-3">
                            <span className={`inline-block px-2.5 py-0.5 rounded-full font-bold text-xs ${
                              isSafe
                                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                                : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                            }`}>
                              {isSafe ? 'Eligible' : 'Debarred Risk'}
                            </span>
                          </td>

                          <td className="py-3.5 px-3 text-right">
                            <button
                              onClick={() => removeSubjectAttendance(sub.id)}
                              className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                              title="Remove Course"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── Official ITM Grading Scale Reference ── */}
        <div className="bg-card border border-border/80 rounded-2xl p-6 shadow-sm">
          <h4 className="font-bold text-sm text-foreground mb-3 flex items-center gap-2">
            <HelpCircle className="h-4 w-4 text-primary" />
            Official ITM SLS Baroda University Grading Matrix
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 text-center text-xs">
            {[
              { g: 'AA', pts: 10, marks: '≥ 85%' },
              { g: 'AB', pts: 9, marks: '75–84%' },
              { g: 'BB', pts: 8, marks: '65–74%' },
              { g: 'BC', pts: 7, marks: '55–64%' },
              { g: 'CC', pts: 6, marks: '45–54%' },
              { g: 'CD', pts: 5, marks: '40–44%' },
              { g: 'DD', pts: 4, marks: '35–39%' },
              { g: 'FF', pts: 0, marks: '< 35%' },
            ].map((scale) => (
              <div key={scale.g} className="p-3 rounded-xl bg-secondary/40 border border-border/60">
                <span className="font-black text-sm text-foreground block">{scale.g}</span>
                <span className="text-primary font-bold block">{scale.pts} Points</span>
                <span className="text-[10px] text-muted-foreground">{scale.marks}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
