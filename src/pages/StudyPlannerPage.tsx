import React, { useState, useMemo, useEffect } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  BookOpen, 
  AlertCircle, 
  Printer, 
  Sliders, 
  Award, 
  CheckSquare, 
  Square,
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { subjects } from '@/data/subjects';
import { 
  generateStudyPlan, 
  getSavedStudyPlan, 
  saveStudyPlan, 
  togglePlanTask, 
  getPlanProgress, 
  StudyPlan 
} from '@/utils/studyPlannerEngine';
import { useGamification } from '@/hooks/useGamification';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export default function StudyPlannerPage() {
  const [examDate, setExamDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 21); // Default: 3 weeks out
    return d.toISOString().split('T')[0];
  });
  const [dailyHours, setDailyHours] = useState<number>(3);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(['oopj', 'dsa', 'ca-101', 'dbms']);
  const [plan, setPlan] = useState<StudyPlan | null>(() => getSavedStudyPlan());
  const [refreshKey, setRefreshKey] = useState(0);
  const { addXp, unlockAchievement } = useGamification();
  const navigate = useNavigate();

  const progress = useMemo(() => {
    return getPlanProgress();
  }, [plan, refreshKey]);

  const handleGenerate = () => {
    if (selectedSubjects.length === 0) {
      toast.error('Please select at least one subject');
      return;
    }

    const newPlan = generateStudyPlan({
      examDate,
      dailyStudyHours: dailyHours,
      selectedSubjectIds: selectedSubjects,
    });

    saveStudyPlan(newPlan);
    setPlan(newPlan);
    setRefreshKey(k => k + 1);

    addXp(30, 'Generated Exam Study Roadmap');
    unlockAchievement('speed-demon');
    toast.success('🎉 Smart Study Plan Generated!', {
      description: `${newPlan.days.length} days scheduled dynamically by syllabus weightage.`,
    });
  };

  const handleToggle = (taskId: string) => {
    const updated = togglePlanTask(taskId);
    if (updated) {
      setPlan(updated);
      setRefreshKey(k => k + 1);
      addXp(10, 'Completed Study Plan Task');
      toast.success('Task marked complete! (+10 XP)');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const daysUntilExam = useMemo(() => {
    if (!examDate) return 0;
    const diff = new Date(examDate).getTime() - new Date().getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }, [examDate]);

  return (
    <div className="container max-w-5xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-wide">
              Automated Academic Planner
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold text-xs">
              Weightage-Optimized
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Exam Countdown & Study Planner
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Input your exam date and daily available hours — our algorithm schedules every topic by GTU credit weightage.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {plan && (
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl border border-border/80 bg-card hover:bg-secondary text-foreground text-xs font-semibold flex items-center gap-2 shadow-sm transition-all apple-press"
            >
              <Printer className="h-4 w-4" /> Print Timetable
            </button>
          )}
        </div>
      </div>

      {/* Configuration Card */}
      <div className="bg-card border border-border/80 rounded-3xl p-6 shadow-sm space-y-5">
        <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
          <Sliders className="h-4 w-4 text-primary" /> Setup Exam Target:
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Exam Date */}
          <div>
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">
              Exam Start Date:
            </label>
            <div className="relative">
              <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="date"
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
                className="w-full h-11 pl-10 pr-3 rounded-2xl bg-secondary/50 border border-border text-xs text-foreground font-semibold focus:ring-1 focus:ring-primary"
              />
            </div>
            <span className="text-[11px] text-primary font-bold mt-1 block">
              {daysUntilExam} Days Left to Prepare
            </span>
          </div>

          {/* Daily Study Hours */}
          <div>
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">
              Daily Study Hours ({dailyHours} hrs/day):
            </label>
            <div className="flex items-center gap-3 h-11 px-3 bg-secondary/50 border border-border rounded-2xl">
              <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
              <input
                type="range"
                min={1}
                max={8}
                step={0.5}
                value={dailyHours}
                onChange={(e) => setDailyHours(Number(e.target.value))}
                className="w-full accent-primary cursor-pointer"
              />
              <span className="text-xs font-bold text-foreground shrink-0">{dailyHours}h</span>
            </div>
            <span className="text-[11px] text-muted-foreground mt-1 block">
              Total Capacity: ~{Math.round(daysUntilExam * dailyHours)} study hours
            </span>
          </div>

          {/* Generate Button */}
          <div className="flex items-end">
            <button
              onClick={handleGenerate}
              className="w-full h-11 rounded-2xl bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:opacity-90 transition-all apple-press"
            >
              <Sparkles className="h-4 w-4" /> {plan ? 'Regenerate Study Plan' : 'Generate Smart Plan'}
            </button>
          </div>
        </div>

        {/* Subjects Selection */}
        <div>
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-2">
            Target Subjects for this Exam:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {subjects.map(s => {
              const isChecked = selectedSubjects.includes(s.id);
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    setSelectedSubjects(prev =>
                      prev.includes(s.id) ? prev.filter(x => x !== s.id) : [...prev, s.id]
                    );
                  }}
                  className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 text-left transition-all apple-press ${
                    isChecked
                      ? 'bg-primary/10 border-primary text-primary'
                      : 'bg-secondary/40 border-border text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {isChecked ? (
                    <CheckSquare className="h-4 w-4 shrink-0 text-primary" />
                  ) : (
                    <Square className="h-4 w-4 shrink-0" />
                  )}
                  <span className="truncate">{s.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Plan Display & Day by Day View */}
      {plan && (
        <div className="space-y-6 animate-scale-in">
          {/* Progress Overview */}
          <div className="bg-card border border-border/80 rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Overall Study Plan Progress
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-foreground">
                  {progress.percent}%
                </span>
                <span className="text-xs text-muted-foreground font-medium">
                  ({progress.completed} of {progress.total} topics completed)
                </span>
              </div>
            </div>

            <div className="sm:w-64 space-y-1.5">
              <div className="w-full h-2.5 rounded-full bg-secondary overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-500" 
                  style={{ width: `${progress.percent}%` }}
                />
              </div>
              <span className="text-[10px] text-muted-foreground text-right block">
                Target completion date: {new Date(plan.examDate).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Days Schedule */}
          <div className="space-y-4">
            <h3 className="font-extrabold text-base text-foreground flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-primary" /> Day-by-Day Preparation Roadmap:
            </h3>

            <div className="space-y-4">
              {plan.days.map((day) => {
                const isToday = new Date(day.date).toDateString() === new Date().toDateString();
                const dayDone = day.tasks.every(t => t.completed);

                return (
                  <div
                    key={day.dayNumber}
                    className={`rounded-3xl border transition-all p-5 space-y-3 ${
                      isToday
                        ? 'bg-primary/5 border-primary shadow-md ring-1 ring-primary/40'
                        : dayDone
                        ? 'bg-indigo-500/5 border-indigo-500/30'
                        : 'bg-card border-border/80'
                    }`}
                  >
                    {/* Day Header */}
                    <div className="flex items-center justify-between gap-2 border-b border-border/60 pb-3">
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-lg text-xs font-bold ${
                          isToday
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-secondary text-foreground'
                        }`}>
                          Day {day.dayNumber}
                        </span>
                        <span className="text-xs font-bold text-foreground">
                          {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                        </span>
                        {isToday && (
                          <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 dark:text-indigo-400 font-bold text-[10px] animate-pulse">
                            TODAY'S TARGET
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{day.tasks.reduce((sum, t) => sum + t.estimatedMinutes, 0)} mins</span>
                      </div>
                    </div>

                    {/* Task Checklist */}
                    <div className="space-y-2">
                      {day.tasks.map((task) => (
                        <div
                          key={task.id}
                          className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                            task.completed
                              ? 'bg-indigo-500/10 border-indigo-500/30 line-through opacity-75'
                              : 'bg-secondary/30 border-border/70 hover:bg-secondary/60'
                          }`}
                        >
                          <div 
                            onClick={() => handleToggle(task.id)}
                            className="flex items-center gap-3 cursor-pointer min-w-0 flex-1 select-none"
                          >
                            <input
                              type="checkbox"
                              checked={task.completed}
                              onChange={() => {}}
                              className="rounded text-primary focus:ring-0 cursor-pointer"
                            />
                            <div className="min-w-0">
                              <p className="text-xs font-bold text-foreground truncate">
                                {task.topicTitle}
                              </p>
                              <p className="text-[10px] text-muted-foreground">
                                {task.subjectName} • ~{task.estimatedMinutes} mins • Weight: {task.weightage}
                              </p>
                            </div>
                          </div>

                          <button
                            onClick={() => navigate(task.topicUrl)}
                            className="text-xs font-semibold text-primary hover:underline flex items-center gap-1 shrink-0 apple-press"
                          >
                            <span>Study Note</span>
                            <ChevronRight className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
