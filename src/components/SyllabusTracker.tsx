import React, { useMemo } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  BookOpen, 
  Award, 
  TrendingUp, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { Subject, Unit } from '@/data/types';
import { useProgress } from '@/hooks/useProgress';
import { Link } from 'react-router-dom';

interface SyllabusTrackerProps {
  subject: Subject;
}

// ITM / GTU university syllabus credit mark weightages estimation
const UNIT_MARKS_MAP: Record<number, number> = {
  1: 12,
  2: 14,
  3: 16,
  4: 10,
  5: 8
};

export const SyllabusTracker: React.FC<SyllabusTrackerProps> = ({ subject }) => {
  const { isCompleted, toggleComplete } = useProgress();

  const unitStats = useMemo(() => {
    if (!subject || !subject.units) return [];
    return (subject.units || []).map((unit, idx) => {
      const unitNumber = idx + 1;
      const expectedMarks = UNIT_MARKS_MAP[unitNumber] || 12;
      const totalTopics = unit.topics?.length || 0;
      const completedTopics = (unit.topics || []).filter(t => isCompleted(t.id)).length;
      const percent = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

      return {
        unitNumber,
        unit,
        expectedMarks,
        totalTopics,
        completedTopics,
        percent,
      };
    });
  }, [subject, isCompleted]);

  const overallPercent = useMemo(() => {
    let total = 0;
    let done = 0;
    unitStats.forEach(u => {
      total += u.totalTopics;
      done += u.completedTopics;
    });
    return total > 0 ? Math.round((done / total) * 100) : 0;
  }, [unitStats]);

  return (
    <div className="bg-card border border-border/80 rounded-3xl p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/70 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
              <BookOpen className="h-4 w-4" />
            </span>
            <h3 className="font-extrabold text-base text-foreground">
              Syllabus Coverage & Mark Weightages
            </h3>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            {subject.name} • Official University 60-Mark Pattern
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-2xl font-black text-foreground">
            {overallPercent}%
          </span>
          <span className="text-xs text-muted-foreground font-medium">Completed</span>
        </div>
      </div>

      {/* Progress overview bar */}
      <div className="w-full h-2 rounded-full bg-secondary overflow-hidden">
        <div 
          className="h-full bg-primary transition-all duration-500 rounded-full" 
          style={{ width: `${overallPercent}%` }}
        />
      </div>

      {/* Unit Rows */}
      <div className="space-y-4">
        {unitStats.map(({ unitNumber, unit, expectedMarks, totalTopics, completedTopics, percent }) => {
          const isFinished = percent === 100;

          return (
            <div 
              key={unit.id}
              className={`p-4 rounded-2xl border transition-all ${
                isFinished 
                  ? 'bg-indigo-400/5 border-indigo-400/30' 
                  : 'bg-secondary/30 border-border/70'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-primary/10 text-primary">
                      Unit {unitNumber}
                    </span>
                    <h4 className="font-bold text-xs sm:text-sm text-foreground">
                      {unit.title}
                    </h4>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-1">
                    {completedTopics} of {totalTopics} topics read
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-bold text-indigo-500 dark:text-indigo-300 block">
                    ~{expectedMarks} Marks
                  </span>
                  <span className="text-[10px] text-muted-foreground font-mono">
                    {percent}% done
                  </span>
                </div>
              </div>

              {/* Progress bar per unit */}
              <div className="w-full h-1.5 rounded-full bg-secondary/80 overflow-hidden mb-3">
                <div 
                  className={`h-full transition-all duration-300 ${isFinished ? 'bg-indigo-400' : 'bg-primary'}`}
                  style={{ width: `${percent}%` }}
                />
              </div>

              {/* Topic Pills */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {(unit.topics || []).map((t) => {
                  const done = isCompleted(t.id);
                  return (
                    <Link
                      key={t.id}
                      to={`/subject/${subject.id}/topic/${t.id}`}
                      className={`text-[11px] px-2.5 py-1 rounded-xl border transition-all flex items-center gap-1.5 apple-press ${
                        done
                          ? 'bg-indigo-400/10 border-indigo-400/30 text-indigo-400 dark:text-indigo-400 font-semibold'
                          : 'bg-card border-border/80 text-muted-foreground hover:text-foreground hover:border-primary/40'
                      }`}
                    >
                      {done ? (
                        <CheckCircle2 className="h-3 w-3 text-indigo-400 shrink-0" />
                      ) : (
                        <Circle className="h-3 w-3 text-muted-foreground/60 shrink-0" />
                      )}
                      <span className="truncate max-w-[150px]">{t.title}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
