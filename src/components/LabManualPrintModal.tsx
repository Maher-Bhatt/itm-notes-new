import { Printer, X, Download, FileText, CheckCircle2 } from "lucide-react";

export interface LabManualData {
  practicalNumber: number;
  subjectCode: string;
  subjectName: string;
  title: string;
  aim: string;
  theory: string;
  algorithm: string[];
  code: string;
  sampleInput: string;
  sampleOutput: string;
  vivaQuestions: { q: string; a: string }[];
}

interface LabManualPrintModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: LabManualData;
  studentName?: string;
  enrollmentNo?: string;
}

export function LabManualPrintModal({
  isOpen,
  onClose,
  data,
  studentName = "Maher Bhatt",
  enrollmentNo = "2303031240001",
}: LabManualPrintModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in print:p-0 print:bg-white print:fixed print:inset-0">
      <div className="w-full max-w-4xl bg-card border border-border rounded-3xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden print:border-none print:shadow-none print:max-h-none print:rounded-none">
        {/* Modal Controls (Hidden in Print) */}
        <div className="p-4 bg-secondary/60 border-b border-border flex items-center justify-between shrink-0 print:hidden">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            <div>
              <h3 className="font-bold text-sm text-foreground">
                College Lab Manual Generator — Practical {data.practicalNumber}
              </h3>
              <p className="text-[11px] text-muted-foreground">
                Official ITM SLS Baroda University academic layout
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="h-9 px-4 rounded-xl bg-primary text-primary-foreground font-bold text-xs flex items-center gap-1.5 shadow-sm hover:opacity-90 transition-all cursor-pointer"
            >
              <Printer className="h-4 w-4" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl hover:bg-secondary text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-6 text-foreground print:p-0 print:text-black">
          {/* University Header */}
          <div className="text-center pb-4 border-b-2 border-black/80 space-y-1">
            <h1 className="text-xl sm:text-2xl font-black uppercase tracking-wider font-display">
              ITM (SLS) Baroda University
            </h1>
            <h2 className="text-sm font-bold text-muted-foreground print:text-black uppercase tracking-wide">
              School of Computer Science & Engineering · Department of Information Technology
            </h2>
            <div className="inline-block mt-1 px-3 py-0.5 rounded-full bg-secondary text-[11px] font-mono font-bold uppercase print:border print:border-black">
              Academic Lab Manual Record · Semester 3
            </div>
          </div>

          {/* Student Info Box */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl border border-border bg-secondary/20 text-xs font-mono print:border-black print:bg-white">
            <div>
              <span className="text-[10px] text-muted-foreground print:text-black uppercase block">Student Name:</span>
              <strong className="text-foreground print:text-black">{studentName}</strong>
            </div>
            <div>
              <span className="text-[10px] text-muted-foreground print:text-black uppercase block">Enrollment No:</span>
              <strong className="text-foreground print:text-black">{enrollmentNo}</strong>
            </div>
            <div>
              <span className="text-[10px] text-muted-foreground print:text-black uppercase block">Subject Code:</span>
              <strong className="text-foreground print:text-black">{data.subjectCode}</strong>
            </div>
            <div>
              <span className="text-[10px] text-muted-foreground print:text-black uppercase block">Practical No:</span>
              <strong className="text-primary print:text-black font-black">Practical {data.practicalNumber}</strong>
            </div>
          </div>

          {/* 1. AIM */}
          <div className="space-y-1.5">
            <h3 className="font-bold text-sm uppercase tracking-wide border-b border-border/80 pb-1 text-primary print:text-black">
              1. Aim / Objective
            </h3>
            <p className="text-xs leading-relaxed font-medium">
              {data.aim}
            </p>
          </div>

          {/* 2. THEORY */}
          <div className="space-y-1.5">
            <h3 className="font-bold text-sm uppercase tracking-wide border-b border-border/80 pb-1 text-primary print:text-black">
              2. Theoretical Background & Invariants
            </h3>
            <p className="text-xs leading-relaxed text-muted-foreground print:text-black">
              {data.theory}
            </p>
          </div>

          {/* 3. ALGORITHM */}
          <div className="space-y-2">
            <h3 className="font-bold text-sm uppercase tracking-wide border-b border-border/80 pb-1 text-primary print:text-black">
              3. Algorithm / Step-by-Step Procedure
            </h3>
            <ol className="list-decimal list-inside space-y-1 text-xs text-muted-foreground print:text-black font-mono">
              {data.algorithm.map((step, i) => (
                <li key={i} className="leading-relaxed">
                  {step}
                </li>
              ))}
            </ol>
          </div>

          {/* 4. SOURCE CODE */}
          <div className="space-y-2">
            <h3 className="font-bold text-sm uppercase tracking-wide border-b border-border/80 pb-1 text-primary print:text-black">
              4. Verified Source Code Implementation
            </h3>
            <pre className="p-4 rounded-xl bg-zinc-950 text-zinc-100 font-mono text-[11px] leading-relaxed overflow-x-auto border border-zinc-800 print:bg-white print:text-black print:border-black">
              <code>{data.code}</code>
            </pre>
          </div>

          {/* 5. EXECUTION OUTPUT */}
          <div className="space-y-2">
            <h3 className="font-bold text-sm uppercase tracking-wide border-b border-border/80 pb-1 text-primary print:text-black">
              5. Standard Console Execution Output
            </h3>
            <pre className="p-3.5 rounded-xl bg-zinc-900 text-amber-500 font-mono text-[11px] leading-relaxed border border-zinc-800 print:bg-white print:text-black print:border-black">
              {data.sampleOutput}
            </pre>
          </div>

          {/* 6. VIVA QUESTIONS */}
          {data.vivaQuestions && data.vivaQuestions.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-bold text-sm uppercase tracking-wide border-b border-border/80 pb-1 text-primary print:text-black">
                6. Viva Voce Questions & Answers
              </h3>
              <div className="space-y-2 text-xs">
                {data.vivaQuestions.map((v, i) => (
                  <div key={i} className="p-2.5 rounded-lg border border-border/60 bg-secondary/10 print:border-black print:bg-white">
                    <p className="font-bold mb-1">Q{i + 1}: {v.q}</p>
                    <p className="text-muted-foreground print:text-black">A: {v.a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Faculty Signature & Grading Box */}
          <div className="grid grid-cols-3 gap-4 pt-8 border-t-2 border-black/80 text-xs font-mono">
            <div>
              <p className="text-[10px] uppercase text-muted-foreground print:text-black">Date of Submission:</p>
              <p className="font-bold pt-1">___ / ___ / 2026</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] uppercase text-muted-foreground print:text-black">Marks / Grade Awarded:</p>
              <p className="font-bold pt-1">[ ____ / 10 ]</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase text-muted-foreground print:text-black">Faculty Signature:</p>
              <div className="h-6 border-b border-dotted border-black/60 mt-1 inline-block w-32" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
