import { useState, useMemo } from 'react';
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
  HelpCircle,
  BookOpen
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
  const [activeTab, setActiveTab] = useState<'sgpa' | 'cgpa'>('sgpa');

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
          <div className="flex gap-2 border-b border-border/60 pb-1">
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
          </div>
        </div>

        {/* ── Summary Result Cards ── */}
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
        ) : (
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
