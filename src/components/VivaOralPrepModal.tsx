import { useState } from "react";
import { 
  X, 
  BookOpen, 
  Sparkles, 
  HelpCircle, 
  Volume2, 
  AlertTriangle, 
  ChevronRight, 
  ChevronLeft, 
  RotateCcw,
  CheckCircle2,
  Mic
} from "lucide-react";
import { aiVoice } from "@/utils/aiVoiceEngine";
import { toast } from "sonner";

export interface VivaCard {
  id: string;
  subjectCode: string;
  practicalTitle: string;
  question: string;
  examinerTrap: string;
  modelSpokenAnswer: string;
  followUpQuestion: string;
  keyPoints: string[];
}

const VIVA_QUESTIONS: VivaCard[] = [
  {
    id: "viva-1",
    subjectCode: "C2310C5 (DSA)",
    practicalTitle: "Railway Reservation Circular Queue",
    question: "Why can't we use a simple linear array queue for railway ticket cancellations?",
    examinerTrap: "Examiners will ask: If rear reaches MAX - 1 and elements are dequeued from front, is the queue full? Students wrongly say 'yes'.",
    modelSpokenAnswer: "In a linear array queue, dequeuing simply increments the front pointer without reclaiming freed slots. Even if front has advanced, rear reaching MAX-1 reports a false overflow. A circular queue connects index MAX-1 back to 0 using modulo arithmetic, reusing empty positions.",
    followUpQuestion: "What is the exact condition for Circular Queue full condition?",
    keyPoints: ["False overflow in linear queue", "Modulo arithmetic (rear + 1) % MAX == front", "Fairness of FIFO ordering"],
  },
  {
    id: "viva-2",
    subjectCode: "C2311C1 (OOPJ)",
    practicalTitle: "Polymorphism & Dynamic Dispatch",
    question: "If a Parent reference points to a Child object and you call an overridden method, which version executes and why?",
    examinerTrap: "Examiners trap students by declaring variables in Parent and Child with the same name. Remember: Methods are overridden dynamically, but variables are bonded statically at compile-time!",
    modelSpokenAnswer: "The child class method executes because Java implements Dynamic Method Dispatch. At runtime, the JVM inspects the actual object type located on the heap and invokes that class's vtable entry.",
    followUpQuestion: "Can static methods be overridden dynamically in Java?",
    keyPoints: ["Resolved at runtime by JVM", "Based on heap object type", "Variables and static methods use compile-time binding"],
  },
  {
    id: "viva-3",
    subjectCode: "C2310C2 (CA)",
    practicalTitle: "Mano Basic Computer Common Bus",
    question: "Why are the Address Register (AR) and Program Counter (PC) 12 bits wide while Memory words are 16 bits?",
    examinerTrap: "Students often guess 16 bits for all registers. Always remember that memory has 4096 words, so 2^12 = 4096.",
    modelSpokenAnswer: "The basic computer memory has a capacity of 4,096 words. To uniquely address 4,096 distinct memory locations, we require exactly log2(4096) = 12 address bits. DR, AC, and Memory words store 16-bit data operands.",
    followUpQuestion: "What binary values must S2 S1 S0 have to place PC onto the common bus?",
    keyPoints: ["2^12 = 4096 addressable words", "AR & PC are 12 bits", "S2 S1 S0 = 010 for PC"],
  },
  {
    id: "viva-4",
    subjectCode: "C2311C4 (DBMS)",
    practicalTitle: "Normalization & Functional Dependencies",
    question: "What is the exact mathematical difference between 3NF and BCNF?",
    examinerTrap: "Examiners will give a functional dependency where the right side is a prime attribute and ask if it violates BCNF. Yes! 3NF permits prime attribute on RHS, but BCNF strictly forbids it unless LHS is superkey.",
    modelSpokenAnswer: "In 3NF, for any functional dependency X -> Y, either X must be a superkey OR Y must be a prime attribute (part of candidate key). BCNF removes the second relaxation: X MUST be a superkey for every non-trivial dependency.",
    followUpQuestion: "Can BCNF decomposition always guarantee dependency preservation?",
    keyPoints: ["3NF allows prime attribute on RHS", "BCNF determinant must be superkey", "BCNF may lose functional dependencies"],
  },
  {
    id: "viva-5",
    subjectCode: "S2320C1 (CONMP)",
    practicalTitle: "Newton-Raphson & Root Finding",
    question: "What is the order of convergence of Newton-Raphson, and when does it fail?",
    examinerTrap: "Examiners ask what happens when the initial guess x0 is at a local maximum or minimum. At that point f'(x0) = 0, causing division by zero and infinite failure.",
    modelSpokenAnswer: "Newton-Raphson has quadratic order of convergence (p = 2), meaning the number of correct decimal places approximately doubles each iteration. It fails when f'(x) equals 0 (division by zero) or when the initial guess oscillates between two points.",
    followUpQuestion: "Which bracketing method is guaranteed to always converge?",
    keyPoints: ["Order of convergence p = 2", "Fails if derivative equals zero", "Bisection has guaranteed linear convergence"],
  },
];

interface VivaOralPrepModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function VivaOralPrepModal({ isOpen, onClose }: VivaOralPrepModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  if (!isOpen) return null;

  const current = VIVA_QUESTIONS[currentIndex];

  const handleSpeak = (text: string) => {
    if (isSpeaking) {
      aiVoice.stop();
      setIsSpeaking(false);
    } else {
      aiVoice.speak(text, () => setIsSpeaking(false));
      setIsSpeaking(true);
      toast.success("Reading viva response with Studio AI Voice");
    }
  };

  const handleNext = () => {
    aiVoice.stop();
    setIsSpeaking(false);
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % VIVA_QUESTIONS.length);
  };

  const handlePrev = () => {
    aiVoice.stop();
    setIsSpeaking(false);
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + VIVA_QUESTIONS.length) % VIVA_QUESTIONS.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-2xl bg-card border border-border rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#183F36] via-[#1D4A3F] to-[#12332C] text-white flex items-center justify-between border-b border-[#D6E85D]/30 shrink-0">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-[#D6E85D] text-[#183F36]">
              <Mic className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono font-black uppercase px-2 py-0.2 rounded bg-[#D6E85D] text-[#183F36]">
                  University Viva Prep
                </span>
                <span className="text-xs text-[#A2BAAF] font-bold">
                  Card {currentIndex + 1} of {VIVA_QUESTIONS.length}
                </span>
              </div>
              <h3 className="font-bold text-sm sm:text-base text-white font-display">
                Oral Exam Drill & Examiner Traps
              </h3>
            </div>
          </div>
          <button
            onClick={() => {
              aiVoice.stop();
              onClose();
            }}
            className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Card Body */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {/* Tag & Topic */}
          <div className="flex items-center justify-between text-xs">
            <span className="px-2.5 py-1 rounded-lg bg-secondary text-foreground font-mono font-bold">
              {current.subjectCode}
            </span>
            <span className="text-muted-foreground font-medium">
              {current.practicalTitle}
            </span>
          </div>

          {/* Flashcard Box */}
          <div 
            onClick={() => setIsFlipped(!isFlipped)}
            className="p-5 rounded-2xl border-2 border-primary/30 hover:border-primary/60 bg-secondary/20 hover:bg-secondary/30 transition-all cursor-pointer space-y-3 relative group"
          >
            <span className="text-[10px] uppercase font-bold text-primary tracking-wider block">
              {!isFlipped ? "🗣️ Viva Question (Click card to reveal Model Spoken Answer)" : "✅ Model Spoken Answer & Scoring Points"}
            </span>

            <h4 className="font-bold text-base sm:text-lg text-foreground leading-snug">
              {current.question}
            </h4>

            {isFlipped ? (
              <div className="space-y-3 pt-2 text-xs leading-relaxed text-foreground/90 border-t border-border/60 animate-fade-in">
                <p className="bg-card p-3 rounded-xl border border-border">
                  {current.modelSpokenAnswer}
                </p>

                {/* Key Points */}
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-muted-foreground uppercase">Key Keywords to Say Aloud:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {current.keyPoints.map((pt, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-md bg-indigo-500/15 text-indigo-400 dark:text-indigo-400 font-bold font-mono text-[10px]">
                        ✓ {pt}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Examiner Trap Alert */}
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-xs flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
                  <div>
                    <strong className="block text-[11px] uppercase tracking-wider">Examiner Viva Trap:</strong>
                    {current.examinerTrap}
                  </div>
                </div>

                {/* Follow up question */}
                <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-700 dark:text-indigo-400 text-xs">
                  <strong className="block text-[11px] uppercase tracking-wider mb-1">Expected Follow-up Question:</strong>
                  {current.followUpQuestion}
                </div>
              </div>
            ) : (
              <div className="pt-4 flex items-center justify-between text-xs text-muted-foreground font-medium">
                <span>Tap anywhere to reveal verified answer</span>
                <span className="text-primary font-bold flex items-center gap-1">
                  Reveal &gt;
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="p-4 border-t border-border bg-secondary/30 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleSpeak(isFlipped ? current.modelSpokenAnswer : current.question)}
              className={`h-9 px-3 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                isSpeaking 
                  ? "bg-rose-500 text-white border-rose-500 animate-pulse" 
                  : "bg-card text-foreground hover:bg-secondary border-border"
              }`}
            >
              <Volume2 className="h-4 w-4" />
              <span>{isSpeaking ? "Stop Voice" : "🎙️ Listen AI Voice"}</span>
            </button>
            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="h-9 px-3 rounded-xl border border-border text-foreground hover:bg-secondary text-xs font-semibold flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Flip Card</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="h-9 px-3 rounded-xl border border-border text-foreground hover:bg-secondary text-xs font-bold flex items-center gap-1 cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Prev</span>
            </button>
            <button
              onClick={handleNext}
              className="h-9 px-4 rounded-xl bg-[#183F36] text-[#D6E85D] hover:bg-[#12332C] text-xs font-bold flex items-center gap-1 transition-all cursor-pointer shadow-xs font-display"
            >
              <span>Next Card</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
