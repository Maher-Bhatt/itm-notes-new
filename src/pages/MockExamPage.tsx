import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Trophy, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  Bookmark, 
  RotateCcw, 
  Sparkles, 
  Award, 
  BarChart2, 
  Layers, 
  HelpCircle,
  Eye,
  FileCheck
} from 'lucide-react';
import { useGamification } from '@/hooks/useGamification';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface MockQuestion {
  id: string;
  unit: string;
  marks: number;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

interface MockExamConfig {
  id: string;
  title: string;
  subjectCode: string;
  subjectName: string;
  totalMarks: number;
  durationMinutes: number;
  negativeMarking: boolean;
  questions: MockQuestion[];
}

const SAMPLE_MOCK_EXAMS: MockExamConfig[] = [
  {
    id: 'mock-oopj-endsem',
    title: 'OOP with Java (End-Semester Full Paper Simulation)',
    subjectCode: 'C2311C1',
    subjectName: 'Object-Oriented Programming with Java',
    totalMarks: 30,
    durationMinutes: 45,
    negativeMarking: true,
    questions: [
      {
        id: 'q1',
        unit: 'Unit 1: Java Basics & OOP',
        marks: 2,
        question: 'Which of the following statements is TRUE regarding Java memory management?',
        options: [
          'Objects are created in the stack and primitives in the heap',
          'Objects are created in the heap and local variables reside on the call stack',
          'Garbage Collection can be forcefully triggered by System.gc() without JVM discretion',
          'Primitive variables are always stored in the Permanent Generation'
        ],
        correctOptionIndex: 1,
        explanation: 'In Java, all object instances are allocated on the Heap memory, whereas method execution frames and primitive local variables live on the Stack.'
      },
      {
        id: 'q2',
        unit: 'Unit 2: Inheritance & Interfaces',
        marks: 3,
        question: 'What is the output of the following Java inheritance code snippet?',
        codeSnippet: `class Base {\n    Base() { System.out.print("B "); }\n}\nclass Derived extends Base {\n    Derived() { System.out.print("D "); }\n}\npublic class Test {\n    public static void main(String[] args) {\n        Derived obj = new Derived();\n    }\n}`,
        options: ['D B', 'B D', 'B', 'Compilation Error: super() not called'],
        correctOptionIndex: 1,
        explanation: 'When a subclass constructor is executed, the compiler implicitly inserts super() as the first instruction, calling Base() first ("B "), followed by Derived() ("D ").'
      },
      {
        id: 'q3',
        unit: 'Unit 2: Interfaces',
        marks: 2,
        question: 'Can an interface in Java 8+ have concrete methods?',
        options: [
          'No, interfaces can only have abstract method declarations',
          'Yes, using default and static method keywords with full bodies',
          'Yes, but only if the interface extends an abstract class',
          'Only protected methods can have bodies'
        ],
        correctOptionIndex: 1,
        explanation: 'Java 8 introduced default and static interface methods to support backward compatibility with lambda expressions without breaking existing implementers.'
      },
      {
        id: 'q4',
        unit: 'Unit 3: Exception Handling',
        marks: 3,
        question: 'What happens when both the try block and the finally block contain a return statement?',
        codeSnippet: `public static int test() {\n    try {\n        return 10;\n    } finally {\n        return 20;\n    }\n}`,
        options: [
          'Returns 10',
          'Returns 20',
          'Compilation error: unreachable code',
          'Throws IllegalStateException at runtime'
        ],
        correctOptionIndex: 1,
        explanation: 'The finally block always executes prior to method return. Its return statement overwrites the pending return from the try block.'
      },
      {
        id: 'q5',
        unit: 'Unit 4: Multithreading',
        marks: 3,
        question: 'Which method call transitions a running thread into the WAITING state and releases the acquired monitor lock?',
        options: ['Thread.sleep()', 'Thread.yield()', 'object.wait()', 'thread.join() without object lock'],
        correctOptionIndex: 2,
        explanation: 'wait() must be called inside a synchronized block; it releases the object monitor so other threads can enter, unlike sleep() which retains the lock.'
      },
      {
        id: 'q6',
        unit: 'Unit 5: Collections Framework',
        marks: 3,
        question: 'What is the worst-case time complexity of HashMap.get(key) prior to Java 8 vs in Java 8+ when hash collisions occur on the same bucket?',
        options: [
          'O(1) in both',
          'O(N) prior to Java 8; O(log N) in Java 8+ (via Red-Black Tree)',
          'O(log N) prior to Java 8; O(1) in Java 8+',
          'O(N^2) in all versions'
        ],
        correctOptionIndex: 1,
        explanation: 'In Java 8+, when a bucket linked list exceeds TREEIFY_THRESHOLD (8 entries), it converts into a Red-Black Balanced Binary Tree, reducing lookup from O(N) to O(log N).'
      },
      {
        id: 'q7',
        unit: 'Unit 1: Polymorphism',
        marks: 2,
        question: 'Which type of polymorphism is resolved at compile time in Java?',
        options: ['Method Overriding', 'Method Overloading', 'Dynamic Method Dispatch', 'Interface implementation binding'],
        correctOptionIndex: 1,
        explanation: 'Method overloading is resolved at compile-time by the compiler examining method argument types and counts (Static Polymorphism).'
      },
      {
        id: 'q8',
        unit: 'Unit 4: Synchronization',
        marks: 3,
        question: 'What is the purpose of the `volatile` keyword in Java?',
        options: [
          'It locks the entire class for atomic transactions',
          'It guarantees memory visibility across thread CPU caches directly from Main Memory',
          'It prevents a variable from being serialized',
          'It makes the variable immutable like final'
        ],
        correctOptionIndex: 1,
        explanation: 'volatile guarantees that reads and writes to that variable are immediately flushed and retrieved from Main RAM, establishing a happens-before relationship.'
      },
      {
        id: 'q9',
        unit: 'Unit 3: Java I/O',
        marks: 3,
        question: 'Which Java I/O stream is best suited for buffering high-speed line-by-line character file reading?',
        options: ['FileInputStream', 'BufferedReader wrapping FileReader', 'ByteArrayInputStream', 'DataOutputStream'],
        correctOptionIndex: 1,
        explanation: 'BufferedReader maintains an in-memory 8KB char buffer and provides the convenient readLine() method.'
      },
      {
        id: 'q10',
        unit: 'Unit 5: Generics',
        marks: 3,
        question: 'What process does the Java compiler perform on Generic types during compilation?',
        options: [
          'Type Reification',
          'Type Erasure (replacing type parameters with Object or bound)',
          'Dynamic Cast Injection at runtime',
          'Virtual Machine Polymorphic Cloning'
        ],
        correctOptionIndex: 1,
        explanation: 'Java uses Type Erasure to enforce type constraints at compile-time while discarding type metadata from bytecode for backward compatibility with pre-generics code.'
      }
    ]
  },
  {
    id: 'mock-dsa-mst1',
    title: 'Data Structures & Algorithms (MST-1 Exam Simulation)',
    subjectCode: 'C2311C2',
    subjectName: 'Data Structures and Algorithms',
    totalMarks: 30,
    durationMinutes: 45,
    negativeMarking: true,
    questions: [
      {
        id: 'dsa-1',
        unit: 'Unit 1: Asymptotic Analysis',
        marks: 3,
        question: 'What is the recurrence relation solution for Merge Sort using the Master Theorem: T(n) = 2T(n/2) + O(n)?',
        options: ['O(n)', 'O(n log n)', 'O(n^2)', 'O(log n)'],
        correctOptionIndex: 1,
        explanation: 'Here a=2, b=2, so n^(log_b a) = n^(log_2 2) = n^1. Since f(n) = O(n), case 2 applies giving O(n log n).'
      },
      {
        id: 'dsa-2',
        unit: 'Unit 2: Linear Data Structures',
        marks: 3,
        question: 'In a Circular Queue implemented with an array of size N, what is the full condition when using front and rear pointers?',
        options: [
          'rear == front',
          '(rear + 1) % N == front',
          'rear == N - 1',
          'front == rear + 1'
        ],
        correctOptionIndex: 1,
        explanation: 'To differentiate between an empty queue (front == -1) and a full queue, circular queues leave one sentinel slot: (rear + 1) % N == front.'
      },
      {
        id: 'dsa-3',
        unit: 'Unit 2: Stacks & Applications',
        marks: 3,
        question: 'What is the postfix expression of: A + B * C - D / E?',
        options: [
          'A B C * + D E / -',
          'A B + C * D E / -',
          '+ A * B C - / D E',
          'A B C + * D - E /'
        ],
        correctOptionIndex: 0,
        explanation: 'B*C evaluates first (BC*), then A+(BC*) -> ABC*+, then D/E (DE/), finally (ABC*+) - (DE/) -> ABC*+DE/-.'
      },
      {
        id: 'dsa-4',
        unit: 'Unit 3: Trees & BST',
        marks: 3,
        question: 'What is the maximum number of nodes in a binary tree of height h (where a single root node has height 0)?',
        options: ['2^(h+1) - 1', '2^h', '2^h - 1', 'h^2'],
        correctOptionIndex: 0,
        explanation: 'At depth i, there are 2^i nodes. The sum of geometric series 2^0 + 2^1 + ... + 2^h = 2^(h+1) - 1.'
      },
      {
        id: 'dsa-5',
        unit: 'Unit 3: AVL Trees',
        marks: 3,
        question: 'What is the valid balance factor of any node in an AVL tree?',
        options: ['Only 0', '-1, 0, or +1', 'Any value <= 2', '-2 to +2'],
        correctOptionIndex: 1,
        explanation: 'An AVL tree is a self-balancing BST where the difference between left and right subtree heights (Balance Factor) must strictly be in {-1, 0, 1}.'
      }
    ]
  }
];

export default function MockExamPage() {
  const [selectedMock, setSelectedMock] = useState<MockExamConfig | null>(null);
  const [examStarted, setExamStarted] = useState(false);
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [markedForReview, setMarkedForReview] = useState<Set<string>>(new Set());
  const [secondsLeft, setSecondsLeft] = useState<number>(0);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
  const { addXp, unlockAchievement } = useGamification();
  const navigate = useNavigate();

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startExam = (exam: MockExamConfig) => {
    setSelectedMock(exam);
    setExamStarted(true);
    setExamSubmitted(false);
    setCurrentIndex(0);
    setAnswers({});
    setMarkedForReview(new Set());
    setSecondsLeft(exam.durationMinutes * 60);
  };

  // Timer countdown
  useEffect(() => {
    if (examStarted && !examSubmitted && secondsLeft > 0) {
      timerRef.current = setInterval(() => {
        setSecondsLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            handleSubmitExam(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [examStarted, examSubmitted]);

  const currentQuestion = selectedMock?.questions[currentIndex];

  const handleSelectOption = (qId: string, optionIdx: number) => {
    setAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const handleClearResponse = (qId: string) => {
    setAnswers(prev => {
      const copy = { ...prev };
      delete copy[qId];
      return copy;
    });
  };

  const toggleMarkForReview = (qId: string) => {
    setMarkedForReview(prev => {
      const copy = new Set(prev);
      if (copy.has(qId)) copy.delete(qId);
      else copy.add(qId);
      return copy;
    });
  };

  const handleSubmitExam = (isAuto = false) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setShowConfirmSubmit(false);
    setExamSubmitted(true);

    if (isAuto) {
      toast.error('⏰ Time Up!', { description: 'Exam was automatically submitted.' });
    } else {
      toast.success('Exam Submitted Successfully! 🎉');
    }

    addXp(60, `Mock Exam Complete: ${selectedMock?.title}`);
    unlockAchievement('speed-demon');
  };

  // Results calculation
  const results = useMemo(() => {
    if (!selectedMock || !examSubmitted) return null;

    let score = 0;
    let correctCount = 0;
    let wrongCount = 0;
    let skippedCount = 0;
    const unitBreakdown: Record<string, { total: number; correct: number }> = {};

    selectedMock.questions.forEach(q => {
      if (!unitBreakdown[q.unit]) {
        unitBreakdown[q.unit] = { total: 0, correct: 0 };
      }
      unitBreakdown[q.unit].total += 1;

      const userAns = answers[q.id];
      if (userAns === undefined) {
        skippedCount++;
      } else if (userAns === q.correctOptionIndex) {
        correctCount++;
        score += q.marks;
        unitBreakdown[q.unit].correct += 1;
      } else {
        wrongCount++;
        if (selectedMock.negativeMarking) {
          score -= Math.round((q.marks * 0.25) * 10) / 10;
        }
      }
    });

    const percentage = Math.max(0, Math.round((score / selectedMock.totalMarks) * 100));
    // Estimate university percentile based on score distribution
    const percentile = Math.min(99, Math.max(40, Math.round(percentage * 0.95 + 10)));

    // Weakest units
    const weakUnits = Object.entries(unitBreakdown)
      .filter(([_, data]) => (data.correct / data.total) < 0.6)
      .map(([name, data]) => ({ name, accuracy: Math.round((data.correct / data.total) * 100) }));

    return {
      score: Math.max(0, score),
      totalMarks: selectedMock.totalMarks,
      percentage,
      percentile,
      correctCount,
      wrongCount,
      skippedCount,
      weakUnits
    };
  }, [selectedMock, examSubmitted, answers]);

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // 1. SELECT EXAM SCREEN
  if (!examStarted) {
    return (
      <div className="container max-w-5xl mx-auto px-4 py-8 space-y-6">
        <div className="border-b border-border/80 pb-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-wide">
              GTU & ITM Exam Simulation
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Full Timed Mock Examinations
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Simulate real university exam conditions with live timer, question palette, negative marking, and post-exam weak-unit analysis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SAMPLE_MOCK_EXAMS.map(exam => (
            <div 
              key={exam.id}
              className="bg-card border border-border/80 hover:border-primary/50 rounded-3xl p-6 shadow-sm space-y-4 transition-all apple-press flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-secondary text-primary">
                    {exam.subjectCode}
                  </span>
                  <span className="text-xs font-bold text-amber-500 dark:text-amber-500">
                    {exam.totalMarks} Marks
                  </span>
                </div>

                <h3 className="font-extrabold text-base text-foreground mb-1">
                  {exam.title}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {exam.subjectName}
                </p>

                <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-border/60 text-center">
                  <div className="p-2 rounded-xl bg-secondary/50">
                    <span className="text-[10px] text-muted-foreground block">Duration</span>
                    <span className="text-xs font-bold text-foreground">{exam.durationMinutes} Mins</span>
                  </div>
                  <div className="p-2 rounded-xl bg-secondary/50">
                    <span className="text-[10px] text-muted-foreground block">Questions</span>
                    <span className="text-xs font-bold text-foreground">{exam.questions.length} Items</span>
                  </div>
                  <div className="p-2 rounded-xl bg-secondary/50">
                    <span className="text-[10px] text-muted-foreground block">Marking</span>
                    <span className="text-xs font-bold text-foreground">
                      {exam.negativeMarking ? '-0.25 Neg' : 'Normal'}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => startExam(exam)}
                className="w-full py-2.5 rounded-2xl bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center gap-2 hover:opacity-90 shadow-md transition-all apple-press"
              >
                <Sparkles className="h-4 w-4" /> Start Timed Mock Exam
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 2. EXAM RESULTS SCREEN
  if (examSubmitted && results) {
    return (
      <div className="container max-w-4xl mx-auto px-4 py-8 space-y-6">
        <div className="bg-card border border-border/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 animate-scale-in">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/70 pb-6">
            <div>
              <span className="text-xs font-bold text-amber-500 dark:text-amber-500 uppercase tracking-wide flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4" /> Mock Exam Complete
              </span>
              <h1 className="text-2xl font-black text-foreground mt-1">
                {selectedMock?.title}
              </h1>
              <p className="text-xs text-muted-foreground mt-0.5">
                Official Scorecard & Performance Analytics
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setExamStarted(false)}
                className="px-4 py-2 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground text-xs font-bold transition-all apple-press"
              >
                Back to Mock Exams
              </button>
            </div>
          </div>

          {/* Score Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 text-center">
              <span className="text-[11px] font-bold text-muted-foreground block">Your Score</span>
              <span className="text-2xl sm:text-3xl font-black text-primary">
                {results.score} <span className="text-xs text-muted-foreground font-normal">/ {results.totalMarks}</span>
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center">
              <span className="text-[11px] font-bold text-muted-foreground block">Accuracy</span>
              <span className="text-2xl sm:text-3xl font-black text-amber-500 dark:text-amber-500">
                {results.percentage}%
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-center">
              <span className="text-[11px] font-bold text-muted-foreground block">Est. Percentile</span>
              <span className="text-2xl sm:text-3xl font-black text-purple-600 dark:text-purple-400">
                {results.percentile}th
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-secondary border border-border/80 text-center">
              <span className="text-[11px] font-bold text-muted-foreground block">Breakdown</span>
              <span className="text-xs font-bold text-foreground block mt-1">
                <span className="text-amber-500">{results.correctCount} Correct</span> •{' '}
                <span className="text-rose-600">{results.wrongCount} Wrong</span>
              </span>
            </div>
          </div>

          {/* Weak Units Alert */}
          {results.weakUnits.length > 0 && (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-700 dark:text-amber-400">
                <AlertCircle className="h-4 w-4" /> Recommended Revision Areas:
              </div>
              <p className="text-xs text-muted-foreground">
                You struggled on these specific syllabus units during this mock exam:
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {results.weakUnits.map((u, i) => (
                  <span 
                    key={i} 
                    className="px-3 py-1 rounded-xl bg-card border border-amber-500/40 text-xs font-semibold text-foreground flex items-center gap-1.5"
                  >
                    <span>{u.name}</span>
                    <span className="text-rose-500 font-bold">({u.accuracy}% acc)</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Detailed Question Review */}
          <div className="space-y-4 pt-4 border-t border-border/70">
            <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
              <Eye className="h-4 w-4 text-primary" /> Question-by-Question Solution Review:
            </h3>

            <div className="space-y-4">
              {selectedMock?.questions.map((q, idx) => {
                const userAns = answers[q.id];
                const isCorrect = userAns === q.correctOptionIndex;
                const isSkipped = userAns === undefined;

                return (
                  <div
                    key={q.id}
                    className={`p-4 rounded-2xl border transition-all ${
                      isCorrect
                        ? 'border-amber-500/30 bg-amber-500/5'
                        : isSkipped
                        ? 'border-border bg-secondary/20'
                        : 'border-rose-500/30 bg-rose-500/5'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="text-xs font-bold font-mono text-muted-foreground">
                        Q{idx + 1} • {q.unit}
                      </span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        isCorrect
                          ? 'bg-amber-500/20 text-amber-500 dark:text-amber-500'
                          : isSkipped
                          ? 'bg-secondary text-muted-foreground'
                          : 'bg-rose-500/20 text-rose-600 dark:text-rose-400'
                      }`}>
                        {isCorrect ? `+${q.marks} Marks` : isSkipped ? 'Skipped (0M)' : '-0.25 Marks'}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm font-semibold text-foreground leading-relaxed mb-3">
                      {q.question}
                    </p>

                    {q.codeSnippet && (
                      <pre className="p-3 rounded-xl bg-black/90 text-amber-500 font-mono text-xs overflow-x-auto mb-3">
                        <code>{q.codeSnippet}</code>
                      </pre>
                    )}

                    <div className="space-y-1.5 mb-3">
                      {q.options.map((opt, optIdx) => {
                        const isChosen = userAns === optIdx;
                        const isTheCorrect = q.correctOptionIndex === optIdx;

                        return (
                          <div
                            key={optIdx}
                            className={`p-2.5 rounded-xl border text-xs flex items-center justify-between ${
                              isTheCorrect
                                ? 'bg-amber-500/20 border-amber-500/60 font-bold text-amber-500 dark:text-amber-500'
                                : isChosen
                                ? 'bg-rose-500/20 border-rose-500/60 text-rose-700 dark:text-rose-300 font-medium'
                                : 'bg-card border-border/60 text-muted-foreground'
                            }`}
                          >
                            <span>{opt}</span>
                            {isTheCorrect && <span className="text-[10px] text-amber-500 font-bold">✓ Correct Answer</span>}
                            {isChosen && !isTheCorrect && <span className="text-[10px] text-rose-600 font-bold">✗ Your Choice</span>}
                          </div>
                        );
                      })}
                    </div>

                    <div className="p-3 rounded-xl bg-card border border-border/70 text-xs text-foreground/90 space-y-1">
                      <span className="font-bold text-primary block text-[11px]">Explanation:</span>
                      <p className="text-muted-foreground">{q.explanation}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 3. LIVE EXAM INTERACTION SCREEN
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Fixed Bar */}
      <header className="sticky top-0 z-40 bg-card border-b border-border/80 px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
            <Trophy className="h-4 w-4" />
          </span>
          <div>
            <h2 className="text-xs sm:text-sm font-bold text-foreground truncate max-w-[200px] sm:max-w-md">
              {selectedMock?.title}
            </h2>
            <p className="text-[10px] text-muted-foreground">
              Official ITM Timed Examination Pattern
            </p>
          </div>
        </div>

        {/* Timer Bar */}
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-xs font-black border ${
            secondsLeft < 300
              ? 'bg-rose-500/20 border-rose-500 text-rose-600 animate-pulse'
              : 'bg-secondary border-border text-foreground'
          }`}>
            <Clock className="h-3.5 w-3.5 text-primary" />
            <span>{formatTimer(secondsLeft)}</span>
          </div>

          <button
            onClick={() => setShowConfirmSubmit(true)}
            className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-500 text-white font-bold text-xs shadow-sm transition-all apple-press"
          >
            Submit Exam
          </button>
        </div>
      </header>

      {/* Main Exam Body */}
      <div className="container max-w-6xl mx-auto p-4 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Question Pane (8 cols) */}
        <div className="lg:col-span-8 bg-card border border-border/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          {currentQuestion && (
            <>
              {/* Question Meta */}
              <div className="flex items-center justify-between pb-4 border-b border-border/60">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-primary/10 text-primary">
                    Question {currentIndex + 1} of {selectedMock?.questions.length}
                  </span>
                  <span className="text-xs text-muted-foreground font-medium">
                    {currentQuestion.unit}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-foreground">
                    +{currentQuestion.marks} Marks
                  </span>
                  {selectedMock?.negativeMarking && (
                    <span className="text-[10px] text-rose-500 font-medium">(-0.25)</span>
                  )}
                </div>
              </div>

              {/* Question Statement */}
              <div className="space-y-4">
                <p className="text-sm sm:text-base font-semibold text-foreground leading-relaxed">
                  {currentQuestion.question}
                </p>

                {currentQuestion.codeSnippet && (
                  <pre className="p-3.5 rounded-2xl bg-black/90 text-amber-500 font-mono text-xs overflow-x-auto">
                    <code>{currentQuestion.codeSnippet}</code>
                  </pre>
                )}
              </div>

              {/* Options */}
              <div className="space-y-2.5 pt-2">
                {currentQuestion.options.map((opt, optIdx) => {
                  const isSelected = answers[currentQuestion.id] === optIdx;

                  return (
                    <div
                      key={optIdx}
                      onClick={() => handleSelectOption(currentQuestion.id, optIdx)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 select-none apple-press ${
                        isSelected
                          ? 'bg-primary/10 border-primary ring-1 ring-primary/40 shadow-sm'
                          : 'bg-secondary/30 border-border/70 hover:bg-secondary/60 hover:border-primary/30'
                      }`}
                    >
                      <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs ${
                        isSelected ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'
                      }`}>
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span className="text-xs sm:text-sm font-medium text-foreground">
                        {opt}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-border/60">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleMarkForReview(currentQuestion.id)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                      markedForReview.has(currentQuestion.id)
                        ? 'bg-purple-500/20 text-purple-600 dark:text-purple-400 border border-purple-500/40'
                        : 'bg-secondary text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Bookmark className="h-3.5 w-3.5" />
                    {markedForReview.has(currentQuestion.id) ? 'Marked for Review' : 'Mark for Review'}
                  </button>

                  {answers[currentQuestion.id] !== undefined && (
                    <button
                      onClick={() => handleClearResponse(currentQuestion.id)}
                      className="px-3 py-2 rounded-xl bg-secondary text-muted-foreground hover:text-rose-500 text-xs font-semibold flex items-center gap-1 transition-colors"
                    >
                      <RotateCcw className="h-3 w-3" /> Clear
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    disabled={currentIndex === 0}
                    onClick={() => setCurrentIndex(prev => prev - 1)}
                    className="p-2.5 rounded-xl bg-secondary text-foreground disabled:opacity-40 text-xs font-semibold flex items-center gap-1"
                  >
                    <ChevronLeft className="h-4 w-4" /> Previous
                  </button>

                  <button
                    onClick={() => {
                      if (currentIndex + 1 < (selectedMock?.questions.length || 0)) {
                        setCurrentIndex(prev => prev + 1);
                      } else {
                        setShowConfirmSubmit(true);
                      }
                    }}
                    className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs flex items-center gap-1 shadow-sm hover:opacity-90"
                  >
                    {currentIndex + 1 < (selectedMock?.questions.length || 0) ? (
                      <>
                        Save & Next <ChevronRight className="h-4 w-4" />
                      </>
                    ) : (
                      'Review & Submit'
                    )}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Right Side: Question Palette (4 cols) */}
        <div className="lg:col-span-4 bg-card border border-border/80 rounded-3xl p-5 shadow-sm space-y-4">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">
            Question Palette
          </span>

          {/* Legend */}
          <div className="grid grid-cols-2 gap-2 text-[10px] text-muted-foreground pb-2 border-b border-border/60">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-amber-500" /> Answered
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-purple-500" /> Marked for Review
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-secondary border border-border" /> Not Visited
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500" /> Skipped
            </span>
          </div>

          {/* Palette Grid */}
          <div className="grid grid-cols-5 gap-2 max-h-60 overflow-y-auto custom-scrollbar p-1">
            {selectedMock?.questions.map((q, idx) => {
              const isCurrent = currentIndex === idx;
              const isAnswered = answers[q.id] !== undefined;
              const isMarked = markedForReview.has(q.id);

              let badgeClass = 'bg-secondary text-muted-foreground border-border';
              if (isMarked) {
                badgeClass = 'bg-purple-500 text-white border-purple-600 font-bold';
              } else if (isAnswered) {
                badgeClass = 'bg-amber-500 text-white border-amber-500 font-bold';
              }

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-9 rounded-xl border text-xs font-semibold flex items-center justify-center transition-all apple-press ${badgeClass} ${
                    isCurrent ? 'ring-2 ring-primary ring-offset-2' : ''
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-border/60 text-center">
            <button
              onClick={() => setShowConfirmSubmit(true)}
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-500 text-white font-bold text-xs shadow-sm transition-all apple-press"
            >
              Submit Examination
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmSubmit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="bg-card border border-border rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-scale-in">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                <AlertCircle className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-bold text-sm text-foreground">Confirm Exam Submission?</h3>
                <p className="text-xs text-muted-foreground">Are you ready to calculate your score?</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center py-2">
              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <span className="text-[10px] text-muted-foreground block">Answered</span>
                <span className="text-base font-bold text-amber-500">
                  {Object.keys(answers).length}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20">
                <span className="text-[10px] text-muted-foreground block">Marked</span>
                <span className="text-base font-bold text-purple-600">
                  {markedForReview.size}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-secondary border border-border">
                <span className="text-[10px] text-muted-foreground block">Remaining</span>
                <span className="text-base font-bold text-foreground">
                  {(selectedMock?.questions.length || 0) - Object.keys(answers).length}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-border/60">
              <button
                onClick={() => setShowConfirmSubmit(false)}
                className="px-4 py-2 rounded-xl bg-secondary text-foreground text-xs font-semibold hover:bg-secondary/80"
              >
                Resume Exam
              </button>
              <button
                onClick={() => handleSubmitExam(false)}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-500 text-white text-xs font-bold shadow-md"
              >
                Yes, Submit Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
