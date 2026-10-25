import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Sliders, 
  Layers, 
  Clock, 
  AlertCircle, 
  CheckSquare, 
  Square,
  Play
} from 'lucide-react';
import { subjects } from '@/data/subjects';

export interface CustomQuizConfig {
  selectedSubjectIds: string[];
  selectedUnits: number[]; // 1, 2, 3, 4, 5
  questionCount: number;
  timeLimitSeconds: number; // 0 for unlimited
  negativeMarking: boolean;
  difficulty: 'all' | 'easy' | 'medium' | 'hard';
}

interface CustomQuizBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartCustomQuiz: (config: CustomQuizConfig) => void;
}

export const CustomQuizBuilderModal: React.FC<CustomQuizBuilderModalProps> = ({
  isOpen,
  onClose,
  onStartCustomQuiz
}) => {
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(['oopj', 'dsa']);
  const [selectedUnits, setSelectedUnits] = useState<number[]>([1, 2, 3]);
  const [questionCount, setQuestionCount] = useState<number>(20);
  const [timeLimit, setTimeLimit] = useState<number>(30); // minutes
  const [negativeMarking, setNegativeMarking] = useState<boolean>(true);
  const [difficulty, setDifficulty] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');

  if (!isOpen) return null;

  const toggleSubject = (id: string) => {
    setSelectedSubjects(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const toggleUnit = (unitNum: number) => {
    setSelectedUnits(prev => 
      prev.includes(unitNum) ? prev.filter(u => u !== unitNum) : [...prev, unitNum]
    );
  };

  const handleStart = () => {
    if (selectedSubjects.length === 0) {
      alert('Please select at least one subject');
      return;
    }
    if (selectedUnits.length === 0) {
      alert('Please select at least one unit');
      return;
    }

    onStartCustomQuiz({
      selectedSubjectIds: selectedSubjects,
      selectedUnits,
      questionCount,
      timeLimitSeconds: timeLimit * 60,
      negativeMarking,
      difficulty
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="bg-card border border-border rounded-3xl max-w-xl w-full p-6 shadow-2xl relative max-h-[90vh] flex flex-col animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-border/70">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <Sliders className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-bold text-base text-foreground">
                Custom Test Builder
              </h3>
              <p className="text-xs text-muted-foreground">
                Tailor a personalized practice session by subjects, units & time pressure
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-secondary text-muted-foreground hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="flex-1 overflow-y-auto py-4 space-y-5 custom-scrollbar pr-1">
          {/* 1. Subjects Multi-select */}
          <div>
            <label className="text-xs font-bold text-foreground block mb-2">
              Select Subjects ({selectedSubjects.length} selected):
            </label>
            <div className="grid grid-cols-2 gap-2">
              {subjects.map(s => {
                const isChecked = selectedSubjects.includes(s.id);
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => toggleSubject(s.id)}
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

          {/* 2. Units Selection */}
          <div>
            <label className="text-xs font-bold text-foreground block mb-2">
              Target Units ({selectedUnits.length} selected):
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map(unitNum => {
                const isChecked = selectedUnits.includes(unitNum);
                return (
                  <button
                    key={unitNum}
                    type="button"
                    onClick={() => toggleUnit(unitNum)}
                    className={`flex-1 py-2 rounded-xl border text-xs font-bold transition-all apple-press ${
                      isChecked
                        ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                        : 'bg-secondary/40 border-border text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Unit {unitNum}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Question Count & Timer */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-foreground block mb-1.5">
                Questions Count:
              </label>
              <select
                value={questionCount}
                onChange={(e) => setQuestionCount(Number(e.target.value))}
                className="w-full h-10 rounded-xl bg-secondary/50 border border-border px-3 text-xs text-foreground font-semibold"
              >
                <option value={10}>10 Questions (Quick drill)</option>
                <option value={20}>20 Questions (Standard)</option>
                <option value={30}>30 Questions (MST Pattern)</option>
                <option value={50}>50 Questions (End-Sem Marathon)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-foreground block mb-1.5">
                Time Limit:
              </label>
              <select
                value={timeLimit}
                onChange={(e) => setTimeLimit(Number(e.target.value))}
                className="w-full h-10 rounded-xl bg-secondary/50 border border-border px-3 text-xs text-foreground font-semibold"
              >
                <option value={15}>15 Minutes</option>
                <option value={30}>30 Minutes</option>
                <option value={45}>45 Minutes</option>
                <option value={60}>60 Minutes</option>
                <option value={0}>No Timer (Relaxed)</option>
              </select>
            </div>
          </div>

          {/* 4. Negative Marking & Difficulty */}
          <div className="grid grid-cols-2 gap-4 pt-1">
            <div>
              <label className="text-xs font-bold text-foreground block mb-1.5">
                Difficulty Level:
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as any)}
                className="w-full h-10 rounded-xl bg-secondary/50 border border-border px-3 text-xs text-foreground font-semibold"
              >
                <option value="all">Mixed (Balanced)</option>
                <option value="easy">Easy (Fundamentals)</option>
                <option value="medium">Medium (University Level)</option>
                <option value="hard">Hard (Topper Level)</option>
              </select>
            </div>

            <div className="flex flex-col justify-end">
              <label 
                onClick={() => setNegativeMarking(!negativeMarking)}
                className="flex items-center gap-2.5 p-2.5 rounded-xl border border-border bg-secondary/30 cursor-pointer text-xs font-semibold select-none"
              >
                <input
                  type="checkbox"
                  checked={negativeMarking}
                  onChange={() => {}}
                  className="rounded text-primary focus:ring-0"
                />
                <span>Negative Marking (-0.25)</span>
              </label>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-border/70 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-secondary text-foreground text-xs font-semibold hover:bg-secondary/80"
          >
            Cancel
          </button>
          <button
            onClick={handleStart}
            className="px-5 py-2 rounded-xl bg-primary text-primary-foreground font-bold text-xs flex items-center gap-1.5 shadow-md hover:opacity-90 transition-all apple-press"
          >
            <Play className="h-4 w-4" /> Start Custom Test
          </button>
        </div>
      </div>
    </div>
  );
};
