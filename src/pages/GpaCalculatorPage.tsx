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
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  BookOpen, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  ShieldAlert, 
  Search,
  X,
  RefreshCw,
  Target
} from 'lucide-react';
import { toast } from 'sonner';

export interface CatalogCourse {
  code: string;
  name: string;
  credits: number;
  type: 'Theory' | 'Lab' | 'Elective';
  defaultClasses: number;
}

export const ITM_SEM3_CATALOG: CatalogCourse[] = [
  { code: 'CS401', name: 'Computer Architecture', credits: 4, type: 'Theory', defaultClasses: 36 },
  { code: 'DSA301', name: 'Data Structures & Algorithms', credits: 4, type: 'Theory', defaultClasses: 36 },
  { code: 'DBMS302', name: 'Database Management Systems', credits: 4, type: 'Theory', defaultClasses: 36 },
  { code: 'JAVA303', name: 'OOP with Java', credits: 3, type: 'Theory', defaultClasses: 32 },
  { code: 'COANMP', name: 'Computer Oriented Numerical Methods (Python)', credits: 3, type: 'Theory', defaultClasses: 32 },
  { code: 'DSA301P', name: 'DSA Laboratory', credits: 1, type: 'Lab', defaultClasses: 14 },
  { code: 'DBMS302P', name: 'DBMS Laboratory', credits: 1, type: 'Lab', defaultClasses: 14 },
  { code: 'JAVA303P', name: 'Java Laboratory', credits: 1, type: 'Lab', defaultClasses: 14 },
  { code: 'PY301P', name: 'Python Numerical Methods Lab', credits: 1, type: 'Lab', defaultClasses: 14 },
  { code: 'WD301P', name: 'Web Technology Lab', credits: 1, type: 'Lab', defaultClasses: 14 },
  { code: 'EL301', name: 'Professional Elective I', credits: 3, type: 'Elective', defaultClasses: 30 },
  { code: 'OE301', name: 'Open Elective I', credits: 3, type: 'Elective', defaultClasses: 30 },
];

export interface SubjectGrade {
  id: string;
  name: string;
  code: string;
  credits: number;
  type?: 'Theory' | 'Lab' | 'Elective';
  internalMarks: number; // out of 50 (MST 30 + Assignment 20)
  externalMarks: number; // out of 50 (End-sem University Exam)
}

export interface SubjectAttendance {
  id: string;
  name: string;
  code: string;
  attended: number;
  total: number;
}

const DEFAULT_INITIAL_SUBJECTS: SubjectGrade[] = [
  { id: 'ca', name: 'Computer Architecture', code: 'CS401', credits: 4, type: 'Theory', internalMarks: 0, externalMarks: 0 },
  { id: 'dsa', name: 'Data Structures & Algorithms', code: 'DSA301', credits: 4, type: 'Theory', internalMarks: 0, externalMarks: 0 },
  { id: 'dbms', name: 'Database Management Systems', code: 'DBMS302', credits: 4, type: 'Theory', internalMarks: 0, externalMarks: 0 },
  { id: 'java', name: 'OOP with Java', code: 'JAVA303', credits: 3, type: 'Theory', internalMarks: 0, externalMarks: 0 },
  { id: 'coanmp', name: 'Computer Oriented Numerical Methods (Python)', code: 'COANMP', credits: 3, type: 'Theory', internalMarks: 0, externalMarks: 0 },
  { id: 'dsa-lab', name: 'DSA Laboratory', code: 'DSA301P', credits: 1, type: 'Lab', internalMarks: 0, externalMarks: 0 },
  { id: 'dbms-lab', name: 'DBMS Laboratory', code: 'DBMS302P', credits: 1, type: 'Lab', internalMarks: 0, externalMarks: 0 },
  { id: 'java-lab', name: 'Java Laboratory', code: 'JAVA303P', credits: 1, type: 'Lab', internalMarks: 0, externalMarks: 0 },
];

const DEFAULT_INITIAL_ATTENDANCE: SubjectAttendance[] = [
  { id: 'att-ca', name: 'Computer Architecture', code: 'CS401', attended: 28, total: 32 },
  { id: 'att-dsa', name: 'Data Structures & Algorithms', code: 'DSA301', attended: 30, total: 35 },
  { id: 'att-dbms', name: 'Database Management Systems', code: 'DBMS302', attended: 26, total: 32 },
  { id: 'att-java', name: 'OOP with Java', code: 'JAVA303', attended: 27, total: 30 },
  { id: 'att-coanmp', name: 'Computer Oriented Numerical Methods', code: 'COANMP', attended: 24, total: 28 },
  { id: 'att-dsa-lab', name: 'DSA Laboratory', code: 'DSA301P', attended: 12, total: 12 },
  { id: 'att-dbms-lab', name: 'DBMS Laboratory', code: 'DBMS302P', attended: 11, total: 12 },
  { id: 'att-java-lab', name: 'Java Laboratory', code: 'JAVA303P', attended: 11, total: 12 },
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
  const [activeTab, setActiveTab] = useState<'sgpa' | 'cgpa' | 'attendance'>('sgpa');

  // Subjects list with localStorage persistence
  const [subjects, setSubjects] = useState<SubjectGrade[]>(() => {
    try {
      const saved = localStorage.getItem('itm_user_gpa_subjects');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return DEFAULT_INITIAL_SUBJECTS;
  });

  // Save subjects whenever changed
  useEffect(() => {
    try {
      localStorage.setItem('itm_user_gpa_subjects', JSON.stringify(subjects));
    } catch {}
  }, [subjects]);

  // Target SGPA for Goal Planner
  const [targetSgpa, setTargetSgpa] = useState<number>(8.5);

  // Subject Selector Modal State
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [catalogFilter, setCatalogFilter] = useState<'All' | 'Theory' | 'Lab' | 'Elective'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [customCourseName, setCustomCourseName] = useState('');
  const [customCourseCode, setCustomCourseCode] = useState('');
  const [customCourseCredits, setCustomCourseCredits] = useState(3);

  // Attendance states
  const [overallTotalClasses, setOverallTotalClasses] = useState<number>(48);
  const [overallAttendedClasses, setOverallAttendedClasses] = useState<number>(38);
  const [targetAttendancePercent, setTargetAttendancePercent] = useState<number>(75);

  const [subjectAttendance, setSubjectAttendance] = useState<SubjectAttendance[]>(() => {
    try {
      const saved = localStorage.getItem('itm_attendance_records');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return DEFAULT_INITIAL_ATTENDANCE;
  });

  useEffect(() => {
    try {
      localStorage.setItem('itm_attendance_records', JSON.stringify(subjectAttendance));
    } catch {}
  }, [subjectAttendance]);

  // Previous Semesters for Cumulative CGPA
  const [prevSemesters, setPrevSemesters] = useState([
    { sem: 1, sgpa: 8.2, credits: 20 },
    { sem: 2, sgpa: 8.4, credits: 21 },
  ]);

  // SGPA Calculation
  const result = useMemo(() => {
    let totalCredits = 0;
    let totalGradePoints = 0;

    const breakdown = subjects.map((sub) => {
      const internal = Number(sub.internalMarks) || 0;
      const external = Number(sub.externalMarks) || 0;
      const totalMarks = Math.min(100, Math.max(0, internal + external));
      const { grade, points, label } = getGradeFromPercentage(totalMarks);
      const credits = Number(sub.credits) || 1;
      const weightedPoints = points * credits;

      totalCredits += credits;
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

  // Target SGPA Goal Projection
  const targetRequiredMarks = useMemo(() => {
    if (result.totalCredits === 0) return 0;
    // Target total grade points = targetSgpa * totalCredits
    const neededGradePoints = targetSgpa * result.totalCredits;
    // Grade point average needed:
    const neededGpaAvg = neededGradePoints / result.totalCredits;
    // Approximate percentage required: 85 for 10, 75 for 9, 65 for 8, 55 for 7
    let targetPercent = 50;
    if (neededGpaAvg >= 9.5) targetPercent = 88;
    else if (neededGpaAvg >= 9.0) targetPercent = 82;
    else if (neededGpaAvg >= 8.0) targetPercent = 75;
    else if (neededGpaAvg >= 7.0) targetPercent = 65;
    else if (neededGpaAvg >= 6.0) targetPercent = 55;

    // Calculate current average internal marks across theory/labs
    const avgInternal = subjects.length > 0 
      ? subjects.reduce((sum, s) => sum + (Number(s.internalMarks) || 0), 0) / subjects.length 
      : 35;

    const neededExternalAvg = Math.max(0, Math.min(50, Math.round(targetPercent - avgInternal)));
    return neededExternalAvg;
  }, [result, targetSgpa, subjects]);

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

  // Operations for Courses
  const updateSubjectMarks = (id: string, field: 'internalMarks' | 'externalMarks' | 'credits', val: number) => {
    setSubjects((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: Math.max(0, val) } : s))
    );
  };

  const removeSubject = (id: string) => {
    setSubjects((prev) => prev.filter((s) => s.id !== id));
    toast.info('Course removed');
  };

  const handleSelectCatalogCourse = (course: CatalogCourse) => {
    // Check if already added
    if (subjects.some((s) => s.code.toLowerCase() === course.code.toLowerCase())) {
      toast.warning(`${course.name} (${course.code}) is already in your courses list.`);
      return;
    }

    const newSub: SubjectGrade = {
      id: `course-${Date.now()}-${course.code}`,
      name: course.name,
      code: course.code,
      credits: course.credits,
      type: course.type,
      internalMarks: 0,
      externalMarks: 0,
    };

    setSubjects((prev) => [...prev, newSub]);
    toast.success(`Added ${course.name} (${course.credits} Credits)`);
  };

  const handleAddCustomCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customCourseName.trim()) {
      toast.error('Please enter a course name');
      return;
    }

    const newSub: SubjectGrade = {
      id: `custom-${Date.now()}`,
      name: customCourseName.trim(),
      code: (customCourseCode.trim() || 'CUSTOM').toUpperCase(),
      credits: Math.max(1, Math.min(6, customCourseCredits)),
      type: 'Elective',
      internalMarks: 0,
      externalMarks: 0,
    };

    setSubjects((prev) => [...prev, newSub]);
    setCustomCourseName('');
    setCustomCourseCode('');
    setIsCatalogOpen(false);
    toast.success('Custom course added to your calculation');
  };

  const handleLoadSem3Curriculum = () => {
    setSubjects(DEFAULT_INITIAL_SUBJECTS);
    toast.success('Loaded official Semester 3 ITM curriculum');
    setIsCatalogOpen(false);
  };

  const handleClearAllSubjects = () => {
    if (confirm('Clear all courses from the calculator?')) {
      setSubjects([]);
      toast.info('All courses cleared');
    }
  };

  // Sync Attendance with GPA courses
  const handleSyncAttendanceWithCourses = () => {
    if (subjects.length === 0) {
      toast.warning('No courses in your GPA list to sync.');
      return;
    }

    const newAttendanceList: SubjectAttendance[] = subjects.map((sub) => {
      // Keep existing record if available
      const existing = subjectAttendance.find((a) => a.code === sub.code);
      if (existing) return existing;
      const catalogMatch = ITM_SEM3_CATALOG.find((c) => c.code === sub.code);
      const defaultTotal = catalogMatch?.defaultClasses || (sub.type === 'Lab' ? 14 : 32);
      return {
        id: `att-${sub.code}-${Date.now()}`,
        name: sub.name,
        code: sub.code,
        attended: Math.round(defaultTotal * 0.8),
        total: defaultTotal,
      };
    });

    setSubjectAttendance(newAttendanceList);
    // Recalculate overall
    const totalHeld = newAttendanceList.reduce((acc, curr) => acc + curr.total, 0);
    const totalAtt = newAttendanceList.reduce((acc, curr) => acc + curr.attended, 0);
    setOverallTotalClasses(totalHeld);
    setOverallAttendedClasses(totalAtt);

    toast.success('Synced attendance list with your registered courses!');
  };

  // Operations for Attendance
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

  const quickAttendanceStep = (id: string, type: 'present' | 'absent') => {
    setSubjectAttendance((prev) =>
      prev.map((s) => {
        if (s.id !== id) return s;
        if (type === 'present') {
          return { ...s, attended: s.attended + 1, total: s.total + 1 };
        } else {
          return { ...s, total: s.total + 1 };
        }
      })
    );
    // Update overall too
    setOverallTotalClasses((prev) => prev + 1);
    if (type === 'present') {
      setOverallAttendedClasses((prev) => prev + 1);
    }
  };

  const removeSubjectAttendance = (id: string) => {
    setSubjectAttendance((prev) => prev.filter((s) => s.id !== id));
    toast.info('Course removed from attendance tracker');
  };

  const filteredCatalog = useMemo(() => {
    return ITM_SEM3_CATALOG.filter((c) => {
      if (catalogFilter !== 'All' && c.type !== catalogFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q);
      }
      return true;
    });
  }, [catalogFilter, searchQuery]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-10 animate-fade-in">
        {/* Banner Section */}
        <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 mb-8 shadow-sm">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
              ITM SLS Baroda University
            </span>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              10-Point Relative Grading System
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-foreground mb-2 tracking-tight flex items-center gap-2.5">
            <Calculator className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
            SGPA, CGPA & 75% Attendance Predictor
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-3xl mb-6">
            Select your subjects from the official university catalog, input your internal CIE and external ESE marks, and track your attendance to guarantee exam hall ticket clearance.
          </p>

          {/* Quick Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-border/80 pb-1">
            <button
              onClick={() => setActiveTab('sgpa')}
              className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all ${
                activeTab === 'sgpa'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              }`}
            >
              Semester SGPA Predictor ({subjects.length} Courses)
            </button>
            <button
              onClick={() => setActiveTab('attendance')}
              className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'attendance'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              }`}
            >
              <Clock className="h-4 w-4" /> 75% Attendance Guard
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
          </div>
        </div>

        {/* ── Summary Result Cards ── */}
        {activeTab === 'attendance' ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-8">
            <div className={`bg-card border rounded-2xl p-5 sm:p-6 shadow-sm flex items-center justify-between ${
              attendanceStats.isSafe ? 'border-emerald-500/40' : 'border-rose-500/40'
            }`}>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                  Overall Attendance
                </p>
                <div className={`text-3xl sm:text-5xl font-black font-mono ${
                  attendanceStats.isSafe ? 'text-emerald-500' : 'text-rose-500'
                }`}>
                  {attendanceStats.currentPercent}%
                </div>
                <p className="text-[11px] text-muted-foreground mt-1">
                  {attendanceStats.attended} Attended / {attendanceStats.total} Conducted
                </p>
              </div>
              <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center ${
                attendanceStats.isSafe ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
              }`}>
                {attendanceStats.isSafe ? <ShieldCheck className="h-6 w-6 sm:h-7 sm:w-7" /> : <ShieldAlert className="h-6 w-6 sm:h-7 sm:w-7" />}
              </div>
            </div>

            <div className="bg-card border border-border/80 rounded-2xl p-5 sm:p-6 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                  {attendanceStats.isSafe ? 'Safe Bunk Margin' : 'Consecutive Needed'}
                </p>
                <div className="text-3xl sm:text-5xl font-black text-foreground font-mono">
                  {attendanceStats.isSafe ? `${attendanceStats.safeBunks} Classes` : `${attendanceStats.neededClasses} Classes`}
                </div>
                <p className="text-[11px] text-muted-foreground mt-1">
                  {attendanceStats.isSafe 
                    ? `Can skip safely without dropping below ${targetAttendancePercent}%` 
                    : `Must attend consecutively to reach ${targetAttendancePercent}%`}
                </p>
              </div>
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <Calendar className="h-6 w-6 sm:h-7 sm:w-7" />
              </div>
            </div>

            <div className={`bg-card border rounded-2xl p-5 sm:p-6 shadow-sm flex items-center justify-between ${
              attendanceStats.isSafe ? 'border-emerald-500/30' : 'border-rose-500/30'
            }`}>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                  Hall Ticket Eligibility
                </p>
                <div className={`text-xl sm:text-2xl font-black tracking-tight ${
                  attendanceStats.isSafe ? 'text-emerald-500' : 'text-rose-500'
                }`}>
                  {attendanceStats.isSafe ? 'EXAM ELIGIBLE' : 'DEBARRED RISK'}
                </div>
                <p className="text-[11px] text-muted-foreground mt-1">
                  Mandatory 75% rule for ITM SLS Baroda exams
                </p>
              </div>
              <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center ${
                attendanceStats.isSafe ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
              }`}>
                {attendanceStats.isSafe ? <CheckCircle2 className="h-6 w-6 sm:h-7 sm:w-7" /> : <AlertTriangle className="h-6 w-6 sm:h-7 sm:w-7" />}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-8">
            <div className="bg-card border border-primary/30 rounded-2xl p-5 sm:p-6 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                  Predicted Semester SGPA
                </p>
                <div className="text-3xl sm:text-5xl font-black text-primary font-mono">
                  {result.sgpa.toFixed(2)}
                </div>
                <p className="text-[11px] text-muted-foreground mt-1">
                  Out of 10.00 · {result.totalCredits} Total Credits
                </p>
              </div>
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <Award className="h-6 w-6 sm:h-7 sm:w-7" />
              </div>
            </div>

            <div className="bg-card border border-border/80 rounded-2xl p-5 sm:p-6 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                  Equivalent Percentage
                </p>
                <div className="text-3xl sm:text-5xl font-black text-foreground font-mono">
                  {result.percentageEquivalent}%
                </div>
                <p className="text-[11px] text-muted-foreground mt-1">
                  Formula: (SGPA - 0.75) × 10
                </p>
              </div>
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 sm:h-7 sm:w-7" />
              </div>
            </div>

            <div className="bg-card border border-border/80 rounded-2xl p-5 sm:p-6 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                  Cumulative CGPA (Overall)
                </p>
                <div className="text-3xl sm:text-5xl font-black text-amber-500 font-mono">
                  {cgpaResult.cgpa.toFixed(2)}
                </div>
                <p className="text-[11px] text-muted-foreground mt-1">
                  Across {cgpaResult.totalCredits} Completed Credits
                </p>
              </div>
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Sparkles className="h-6 w-6 sm:h-7 sm:w-7" />
              </div>
            </div>
          </div>
        )}

        {/* ── SGPA Tab: Course Management & Subject Selector ── */}
        {activeTab === 'sgpa' && (
          <div className="space-y-6 mb-8">
            {/* Action Bar */}
            <div className="bg-card border border-border rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-base text-foreground">Registered Courses & Mark Entry</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Select your subjects from the curriculum. Enter Internal (MST + Assignment out of 50) and External Exam marks (out of 50).
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleLoadSem3Curriculum}
                  className="px-3 py-1.5 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground font-semibold text-xs transition-colors flex items-center gap-1.5 border border-border"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Sem 3 Template</span>
                </button>

                <button
                  type="button"
                  onClick={handleClearAllSubjects}
                  className="px-3 py-1.5 rounded-xl hover:bg-destructive/10 text-muted-foreground hover:text-destructive font-semibold text-xs transition-colors"
                >
                  Clear All
                </button>

                <button
                  type="button"
                  onClick={() => setIsCatalogOpen(true)}
                  className="px-4 py-2 rounded-xl bg-primary text-primary-foreground font-bold text-xs hover:opacity-90 transition-opacity flex items-center gap-1.5 shadow-sm"
                >
                  <Plus className="h-4 w-4" />
                  <span>+ Select Subject / Add</span>
                </button>
              </div>
            </div>

            {/* Target SGPA Advisor Banner */}
            <div className="p-4 rounded-2xl bg-secondary/30 border border-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Target className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-foreground">SGPA Target Goal Planner</h4>
                  <p className="text-[11px] text-muted-foreground">
                    To achieve an SGPA of <strong className="text-foreground">{targetSgpa}</strong>, you need an average of{' '}
                    <strong className="text-primary">{targetRequiredMarks} / 50</strong> marks in your external semester exams.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-xs font-semibold text-muted-foreground mr-1">Target:</span>
                {[7.5, 8.0, 8.5, 9.0].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTargetSgpa(t)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                      targetSgpa === t
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'bg-secondary text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {t.toFixed(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Courses Display: Desktop Table & Mobile Cards */}
            {subjects.length === 0 ? (
              <div className="bg-card border border-dashed border-border rounded-2xl p-10 text-center">
                <BookOpen className="h-10 w-10 text-muted-foreground/60 mx-auto mb-3" />
                <h4 className="text-base font-bold text-foreground">No subjects added yet</h4>
                <p className="text-xs text-muted-foreground max-w-sm mx-auto mt-1 mb-5">
                  Select your semester subjects from the official ITM catalog or load the standard Semester 3 curriculum to begin.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={handleLoadSem3Curriculum}
                    className="pill-button bg-primary text-primary-foreground font-bold text-xs px-5 py-2.5 shadow-sm"
                  >
                    Load Sem 3 Curriculum
                  </button>
                  <button
                    onClick={() => setIsCatalogOpen(true)}
                    className="pill-button bg-secondary text-foreground font-bold text-xs px-5 py-2.5 border border-border"
                  >
                    + Browse Course Catalog
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* 1. Desktop Table (Hidden on small mobile) */}
                <div className="hidden md:block bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="bg-secondary/50 text-muted-foreground uppercase text-[11px] font-bold border-b border-border">
                        <tr>
                          <th className="py-3.5 px-4">Subject & Code</th>
                          <th className="py-3.5 px-3">Credits</th>
                          <th className="py-3.5 px-3">Internal (50)</th>
                          <th className="py-3.5 px-3">External (50)</th>
                          <th className="py-3.5 px-3">Total (100)</th>
                          <th className="py-3.5 px-3">Grade</th>
                          <th className="py-3.5 px-3 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/60">
                        {result.breakdown.map((sub) => (
                          <tr key={sub.id} className="hover:bg-secondary/20 transition-colors">
                            <td className="py-3.5 px-4 font-semibold text-foreground">
                              <div className="font-bold">{sub.name}</div>
                              <div className="flex items-center gap-1.5 mt-0.5">
                                <span className="text-[11px] font-mono text-muted-foreground">{sub.code}</span>
                                {sub.type && (
                                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-secondary text-muted-foreground font-medium">
                                    {sub.type}
                                  </span>
                                )}
                              </div>
                            </td>

                            <td className="py-3.5 px-3">
                              <select
                                value={sub.credits}
                                onChange={(e) => updateSubjectMarks(sub.id, 'credits', Number(e.target.value))}
                                className="h-8 px-2 rounded-lg border border-input bg-background font-mono text-xs focus:ring-1 focus:ring-primary"
                              >
                                {[1, 2, 3, 4, 5, 6].map((cr) => (
                                  <option key={cr} value={cr}>
                                    {cr} cr
                                  </option>
                                ))}
                              </select>
                            </td>

                            <td className="py-3.5 px-3">
                              <input
                                type="number"
                                min="0"
                                max="50"
                                placeholder="0"
                                value={sub.internalMarks || ''}
                                onChange={(e) => updateSubjectMarks(sub.id, 'internalMarks', Number(e.target.value))}
                                className="w-16 h-8 px-2 rounded-lg border border-input bg-background font-mono text-xs focus:ring-1 focus:ring-primary text-center"
                              />
                            </td>

                            <td className="py-3.5 px-3">
                              <input
                                type="number"
                                min="0"
                                max="50"
                                placeholder="0"
                                value={sub.externalMarks || ''}
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

                {/* 2. Mobile Responsive Cards (< md screens) */}
                <div className="md:hidden space-y-3">
                  {result.breakdown.map((sub) => (
                    <div key={sub.id} className="p-4 rounded-2xl bg-card border border-border shadow-sm space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-bold text-sm text-foreground">{sub.name}</h4>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="text-[11px] font-mono text-muted-foreground">{sub.code}</span>
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-secondary text-muted-foreground font-semibold">
                              {sub.credits} Credits
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => removeSubject(sub.id)}
                          className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-1">
                        <div>
                          <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                            Internal (CIE / 50)
                          </label>
                          <input
                            type="number"
                            min="0"
                            max="50"
                            placeholder="0"
                            value={sub.internalMarks || ''}
                            onChange={(e) => updateSubjectMarks(sub.id, 'internalMarks', Number(e.target.value))}
                            className="w-full h-9 px-3 rounded-xl border border-input bg-background font-mono text-sm text-center font-bold"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                            External (ESE / 50)
                          </label>
                          <input
                            type="number"
                            min="0"
                            max="50"
                            placeholder="0"
                            value={sub.externalMarks || ''}
                            onChange={(e) => updateSubjectMarks(sub.id, 'externalMarks', Number(e.target.value))}
                            className="w-full h-9 px-3 rounded-xl border border-input bg-background font-mono text-sm text-center font-bold"
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-border/60 text-xs">
                        <div className="font-bold text-foreground">
                          Score: <span className="font-mono">{sub.totalMarks} / 100</span>
                        </div>
                        <span className={`px-2.5 py-0.5 rounded-full font-bold text-xs ${
                          sub.grade === 'AA'
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                            : sub.grade === 'AB' || sub.grade === 'BB'
                            ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20'
                            : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                        }`}>
                          {sub.grade} ({sub.points} pts)
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* ── Attendance Tab: 75% Requirement & Subject Logger ── */}
        {activeTab === 'attendance' && (
          <div className="space-y-8 mb-8">
            {/* Quick Model Section */}
            <div className="bg-card border border-border rounded-2xl p-5 sm:p-6 shadow-sm">
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
                  {/* threshold indicator line */}
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

            {/* Subject-Wise Attendance Log */}
            <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
              <div className="p-5 bg-secondary/30 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-bold text-base text-foreground">Subject-Wise Attendance Log</h3>
                  <p className="text-xs text-muted-foreground">Keep track of individual course attendance to prevent subject-wise debarment</p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={handleSyncAttendanceWithCourses}
                    className="px-3 py-1.5 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground font-semibold text-xs transition-colors flex items-center gap-1.5 border border-border"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    <span>Sync with My Courses</span>
                  </button>

                  <button
                    onClick={() => {
                      setSubjectAttendance(DEFAULT_INITIAL_ATTENDANCE);
                      setOverallTotalClasses(48);
                      setOverallAttendedClasses(38);
                      toast.info('Reset attendance records to default');
                    }}
                    className="px-3 py-1.5 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground font-semibold text-xs transition-colors"
                  >
                    Reset
                  </button>
                </div>
              </div>

              {/* Desktop Table for Attendance */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-secondary/50 text-muted-foreground uppercase text-[11px] font-bold border-b border-border">
                    <tr>
                      <th className="py-3 px-4">Subject</th>
                      <th className="py-3 px-3">Attended</th>
                      <th className="py-3 px-3">Total Held</th>
                      <th className="py-3 px-3">Attendance %</th>
                      <th className="py-3 px-3">Quick Step</th>
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

                          <td className="py-3.5 px-3">
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => quickAttendanceStep(sub.id, 'present')}
                                className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 text-[11px] font-bold transition-colors"
                                title="Attended class"
                              >
                                +1 Pres
                              </button>
                              <button
                                onClick={() => quickAttendanceStep(sub.id, 'absent')}
                                className="px-2 py-1 rounded bg-rose-500/10 text-rose-600 hover:bg-rose-500/20 text-[11px] font-bold transition-colors"
                                title="Bunked class"
                              >
                                +1 Miss
                              </button>
                            </div>
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

              {/* Mobile Cards for Attendance */}
              <div className="md:hidden divide-y divide-border/60">
                {subjectAttendance.map((sub) => {
                  const total = Math.max(1, sub.total);
                  const attended = Math.min(total, Math.max(0, sub.attended));
                  const pct = Math.round((attended / total) * 100);
                  const isSafe = pct >= 75;
                  const bunks = Math.max(0, Math.floor((100 * attended) / 75 - total));
                  const needed = Math.max(0, Math.ceil((75 * total - 100 * attended) / 25));

                  return (
                    <div key={sub.id} className="p-4 space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-bold text-sm text-foreground">{sub.name}</h4>
                          <span className="text-[11px] font-mono text-muted-foreground">{sub.code}</span>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full font-bold text-xs ${
                          isSafe
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                            : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                        }`}>
                          {pct}%
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">
                          {attended} attended / {total} held
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => quickAttendanceStep(sub.id, 'present')}
                            className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 font-bold text-xs"
                          >
                            +1 Present
                          </button>
                          <button
                            onClick={() => quickAttendanceStep(sub.id, 'absent')}
                            className="px-2.5 py-1 rounded-lg bg-rose-500/10 text-rose-600 font-bold text-xs"
                          >
                            +1 Bunk
                          </button>
                        </div>
                      </div>

                      <div className="text-[11px]">
                        {isSafe ? (
                          <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                            ✓ Safe margin: Can miss {bunks} more class{bunks === 1 ? '' : 'es'}.
                          </span>
                        ) : (
                          <span className="text-rose-600 dark:text-rose-400 font-semibold">
                            ⚠️ Shortage: Must attend {needed} consecutive class{needed === 1 ? '' : 'es'}.
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ── CGPA Historical Semesters Tab ── */}
        {activeTab === 'cgpa' && (
          <div className="bg-card border border-border rounded-2xl p-5 sm:p-6 shadow-sm mb-8">
            <h3 className="font-bold text-base text-foreground mb-1">Previous Semester Performance</h3>
            <p className="text-xs text-muted-foreground mb-6">
              Enter your official SGPA and total credits from Semester 1 and Semester 2 grade sheets to project your cumulative CGPA.
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
        )}

        {/* ── Official ITM Grading Scale Reference ── */}
        <div className="bg-card border border-border rounded-2xl p-5 sm:p-6 shadow-sm">
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

      {/* ── Course Catalog Selection Modal ── */}
      {isCatalogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-background/80 backdrop-blur-sm animate-fade-in">
          <div 
            className="w-full max-w-2xl bg-card border border-border rounded-3xl shadow-xl overflow-hidden flex flex-col max-h-[85vh] animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 border-b border-border flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-foreground">Select Course from Curriculum</h3>
                <p className="text-xs text-muted-foreground">Pick from official Semester 3 courses or add a custom elective</p>
              </div>
              <button
                onClick={() => setIsCatalogOpen(false)}
                className="p-1.5 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Filter Tabs & Search */}
            <div className="p-4 border-b border-border/60 bg-secondary/20 space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by course name or code (e.g. DSA, CS401, Java)..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-background border border-border text-xs sm:text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar">
                {(['All', 'Theory', 'Lab', 'Elective'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setCatalogFilter(tab)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      catalogFilter === tab
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'bg-secondary text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Course List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2.5 custom-scrollbar">
              {filteredCatalog.map((course) => {
                const isAdded = subjects.some((s) => s.code.toLowerCase() === course.code.toLowerCase());
                return (
                  <div
                    key={course.code}
                    className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                      isAdded
                        ? 'bg-secondary/20 border-border/50 opacity-75'
                        : 'bg-secondary/40 border-border hover:border-primary/50 hover:bg-secondary/60'
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-foreground truncate">{course.name}</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-primary/10 text-primary font-bold">
                          {course.code}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-muted-foreground mt-0.5">
                        <span>{course.credits} Credits</span>
                        <span>•</span>
                        <span>{course.type}</span>
                        <span>•</span>
                        <span>~{course.defaultClasses} Classes / Sem</span>
                      </div>
                    </div>

                    <button
                      disabled={isAdded}
                      onClick={() => handleSelectCatalogCourse(course)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                        isAdded
                          ? 'bg-secondary text-muted-foreground cursor-not-allowed'
                          : 'bg-primary text-primary-foreground hover:opacity-90 apple-press shadow-sm'
                      }`}
                    >
                      {isAdded ? '✓ Added' : '+ Add'}
                    </button>
                  </div>
                );
              })}

              {/* Custom Course Form */}
              <div className="mt-4 p-4 rounded-2xl border border-dashed border-border bg-secondary/20">
                <h4 className="font-bold text-xs text-foreground mb-2">Can't find your subject? Add Custom Course:</h4>
                <form onSubmit={handleAddCustomCourse} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <input
                      type="text"
                      placeholder="Course Name (e.g. Cyber Security)"
                      value={customCourseName}
                      onChange={(e) => setCustomCourseName(e.target.value)}
                      className="sm:col-span-2 px-3 py-2 rounded-xl bg-background border border-border text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-primary"
                    />
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Code (CS305)"
                        value={customCourseCode}
                        onChange={(e) => setCustomCourseCode(e.target.value)}
                        className="w-1/2 px-2.5 py-2 rounded-xl bg-background border border-border text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-primary"
                      />
                      <select
                        value={customCourseCredits}
                        onChange={(e) => setCustomCourseCredits(Number(e.target.value))}
                        className="w-1/2 px-2 py-2 rounded-xl bg-background border border-border text-xs text-foreground outline-none focus:border-primary"
                      >
                        {[1, 2, 3, 4, 5, 6].map((c) => (
                          <option key={c} value={c}>
                            {c} Cr
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground font-bold text-xs border border-border transition-colors"
                  >
                    + Add Custom Course to Calculator
                  </button>
                </form>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-border bg-secondary/30 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                {subjects.length} Course{subjects.length === 1 ? '' : 's'} Selected
              </span>
              <button
                onClick={() => setIsCatalogOpen(false)}
                className="px-4 py-2 rounded-xl bg-primary text-primary-foreground font-bold text-xs hover:opacity-90 apple-press shadow-sm"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
