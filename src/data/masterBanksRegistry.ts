/**
 * ITM University - Master Question Banks Registry
 * Consolidates all 5 Core Semester 3 Master Solved Question Banks:
 * - C2311C1: OOPJ (Java)
 * - C2310C5: DSA (Data Structures & Algorithms)
 * - C2310C2: CA (Computer Architecture)
 * - C2311C4: DBMS (Database Management Systems)
 * - S2320C1: CONMP (Numerical Methods with Python)
 */

import {
  PREDICT_OUTPUT_QUESTIONS as OOPJ_PRED,
  LONG_ANSWER_QUESTIONS as OOPJ_LONG,
  THEORY_QUESTIONS as OOPJ_TH,
  EXAM_WRITING_FORMATS as OOPJ_STRAT,
  COMMON_MISTAKES as OOPJ_MISTAKES,
  MCQ_REVISION_TABLE as OOPJ_REV,
  QUICK_MCQS as OOPJ_MCQS,
  PredictOutputItem,
  LongAnswerQuestion,
  TheoryQuestion,
  McqRevisionItem,
  QuickMcq,
} from './oopjQuestionBank';

import {
  DSA_PREDICT_OUTPUT,
  DSA_LONG_QUESTIONS,
  DSA_THEORY_QUESTIONS,
  DSA_EXAM_STRATEGY,
  DSA_FATAL_MISTAKES,
  DSA_REVISION_TABLE,
  DSA_QUICK_MCQS,
} from './dsaMasterBank';

import {
  CA_PREDICT_OUTPUT,
  CA_LONG_QUESTIONS,
  CA_THEORY_QUESTIONS,
  CA_EXAM_STRATEGY,
  CA_FATAL_MISTAKES,
  CA_REVISION_TABLE,
  CA_QUICK_MCQS,
} from './caMasterBank';

import {
  DBMS_PREDICT_OUTPUT,
  DBMS_LONG_QUESTIONS,
  DBMS_THEORY_QUESTIONS,
  DBMS_EXAM_STRATEGY,
  DBMS_FATAL_MISTAKES,
  DBMS_REVISION_TABLE,
  DBMS_QUICK_MCQS,
} from './dbmsMasterBank';

import {
  CONMP_PREDICT_OUTPUT,
  CONMP_LONG_QUESTIONS,
  CONMP_THEORY_QUESTIONS,
  CONMP_EXAM_STRATEGY,
  CONMP_FATAL_MISTAKES,
  CONMP_REVISION_TABLE,
  CONMP_QUICK_MCQS,
} from './conmpMasterBank';

export interface ExamStrategyItem {
  part: string;
  marks: string;
  timeAllocation: string;
  strategy: string;
}

export interface FatalMistakeItem {
  mistake: string;
  consequence: string;
  remedy: string;
}

export interface MasterSubjectBank {
  id: string;
  code: string;
  name: string;
  shortName: string;
  semester: number;
  badge: string;
  summary: string;
  audioLectureSummary: string;
  theme: {
    primaryBg: string;
    accentColor: string;
    borderGlow: string;
    iconColor: string;
  };
  predictOutput: PredictOutputItem[];
  longAnswers: LongAnswerQuestion[];
  theoryQuestions: TheoryQuestion[];
  examStrategy: ExamStrategyItem[];
  fatalMistakes: FatalMistakeItem[];
  revisionTable: McqRevisionItem[];
  quickMcqs: QuickMcq[];
}

export const MASTER_BANKS: Record<string, MasterSubjectBank> = {
  'oopj': {
    id: 'oopj',
    code: 'C2311C1',
    name: 'Object-Oriented Programming with Java',
    shortName: 'OOPJ',
    semester: 3,
    badge: '38 Master Solved Qs · Remedial Oct 26',
    summary: 'Complete model answers: 5 Output Predicts with call stack traces, 15 5-mark programs, 18 3-mark theory proofs, and Q1 MCQ master revision.',
    audioLectureSummary: 'Welcome to the Object Oriented Programming with Java master audio lecture. In Java, remember that method overriding resolves dynamically at runtime based on the actual object type on the heap. Constructors chain from parent to child, and super must always be the very first statement. In abstract classes, default methods in interfaces provide flexibility, while multiple inheritance is achieved purely through interfaces.',
    theme: {
      primaryBg: 'from-[#18181B] via-[#1D4A3F] to-[#27272A]',
      accentColor: '#FAFAFA',
      borderGlow: 'border-[#FAFAFA]/40',
      iconColor: 'text-[#FAFAFA]',
    },
    predictOutput: OOPJ_PRED,
    longAnswers: OOPJ_LONG,
    theoryQuestions: OOPJ_TH,
    examStrategy: OOPJ_STRAT.map((s) => ({
      part: s.part,
      marks: s.marks,
      timeAllocation: s.timeAllocation,
      strategy: s.strategy,
    })),
    fatalMistakes: OOPJ_MISTAKES,
    revisionTable: OOPJ_REV,
    quickMcqs: OOPJ_MCQS,
  },

  'dsa': {
    id: 'dsa',
    code: 'C2310C5',
    name: 'Data Structures and Algorithms',
    shortName: 'DSA',
    semester: 3,
    badge: '38 Master Solved Qs · All 6 Units',
    summary: 'Comprehensive University Solved Bank: 5 Predict Output with execution traces, 15 5-mark C implementations with viva traps, 18 3-mark comparative theory tables, and master revision matrix.',
    audioLectureSummary: 'Welcome to the Data Structures and Algorithms master lecture. Remember the key invariants: In a Circular Queue, the full condition is evaluated using modulo arithmetic: rear plus one modulo maximum equals front. In a Binary Search Tree, an inorder traversal always produces keys in strictly ascending sorted order. Quick Sort achieves O of n log n on average using in-place partitioning, while Merge Sort is guaranteed O of n log n and is stable. For graphs, Dijkstra finds the shortest path on non-negative weighted graphs, while Kruskal and Prim construct Minimum Spanning Trees.',
    theme: {
      primaryBg: 'from-[#063323] via-[#0E4733] to-[#042419]',
      accentColor: '#4ADE80',
      borderGlow: 'border-amber-500/40',
      iconColor: 'text-amber-500',
    },
    predictOutput: DSA_PREDICT_OUTPUT,
    longAnswers: DSA_LONG_QUESTIONS,
    theoryQuestions: DSA_THEORY_QUESTIONS,
    examStrategy: DSA_EXAM_STRATEGY,
    fatalMistakes: DSA_FATAL_MISTAKES,
    revisionTable: DSA_REVISION_TABLE,
    quickMcqs: DSA_QUICK_MCQS,
  },

  'ca': {
    id: 'ca',
    code: 'C2310C2',
    name: 'Computer Architecture & Organization',
    shortName: 'CA',
    semester: 3,
    badge: '38 Master Solved Qs · Complete MST Bank',
    summary: 'Complete model answers: 5 Register Transfer & Cycle Traces, 15 5-mark Hardware/Architecture Problems with RTL & Diagrams, 18 3-mark theory matrices, and master revision matrix.',
    audioLectureSummary: 'Welcome to the Computer Architecture master audio lecture. In the Mano Basic Computer, the common bus system interconnects seven primary registers and memory using a three-to-eight line multiplexer. Remember that the Program Counter and Address Register are twelve bits wide because memory capacity is four thousand ninety-six words. Booths multiplication algorithm multiplies signed numbers in twos complement using arithmetic shift right. In pipelining, speedup approaches the number of stages as instruction count increases, while cache mapping balances tag, line index, and word offset.',
    theme: {
      primaryBg: 'from-[#142347] via-[#1A2E5C] to-[#0E1933]',
      accentColor: '#60A5FA',
      borderGlow: 'border-amber-500/40',
      iconColor: 'text-amber-500',
    },
    predictOutput: CA_PREDICT_OUTPUT,
    longAnswers: CA_LONG_QUESTIONS,
    theoryQuestions: CA_THEORY_QUESTIONS,
    examStrategy: CA_EXAM_STRATEGY,
    fatalMistakes: CA_FATAL_MISTAKES,
    revisionTable: CA_REVISION_TABLE,
    quickMcqs: CA_QUICK_MCQS,
  },

  'dbms': {
    id: 'dbms',
    code: 'C2311C4',
    name: 'Database Management Systems',
    shortName: 'DBMS',
    semester: 3,
    badge: '38 Master Solved Qs · Relational Design & SQL',
    summary: 'Comprehensive University Solved Bank: 5 Predict SQL Output with NULL trap traces, 15 5-mark Design/SQL Problems with schemas & viva traps, 18 3-mark comparative tables, and revision matrix.',
    audioLectureSummary: 'Welcome to the Database Management Systems master lecture. In SQL, three-valued logic dictates that comparing anything with NULL using equals or not equals evaluates to UNKNOWN, requiring the use of IS NULL. In normalization, First Normal Form enforces atomic values, Second Normal Form eliminates partial functional dependencies, Third Normal Form removes transitive dependencies, and Boyce-Codd Normal Form mandates that every determinant must be a superkey. Transactions enforce ACID properties using Write-Ahead Logging and Two-Phase Locking.',
    theme: {
      primaryBg: 'from-[#3D1A10] via-[#522518] to-[#29110B]',
      accentColor: '#FB923C',
      borderGlow: 'border-orange-500/40',
      iconColor: 'text-orange-400',
    },
    predictOutput: DBMS_PREDICT_OUTPUT,
    longAnswers: DBMS_LONG_QUESTIONS,
    theoryQuestions: DBMS_THEORY_QUESTIONS,
    examStrategy: DBMS_EXAM_STRATEGY,
    fatalMistakes: DBMS_FATAL_MISTAKES,
    revisionTable: DBMS_REVISION_TABLE,
    quickMcqs: DBMS_QUICK_MCQS,
  },

  'conmp': {
    id: 'conmp',
    code: 'S2320C1',
    name: 'Computer Oriented Numerical Methods with Python',
    shortName: 'CONMP',
    semester: 3,
    badge: '38 Master Solved Qs · Python Algorithms',
    summary: 'Comprehensive University Solved Bank: 5 Predict Output with iteration traces, 15 5-mark Python Numerical Programs with exact convergence outputs & viva traps, 18 3-mark comparative theory matrices.',
    audioLectureSummary: 'Welcome to the Computer Oriented Numerical Methods with Python master lecture. The Bisection method is a bracketing method with guaranteed linear convergence, halving the interval at each step. Newton-Raphson uses tangent line approximations with quadratic convergence, meaning correct digits double each iteration. For linear equations, Gauss-Seidel requires diagonal dominance to ensure convergence. In numerical integration, Simpsons one-third rule requires an even number of subintervals and achieves fourth-order accuracy. For differential equations, Runge-Kutta fourth order provides exceptional accuracy without analytical derivatives.',
    theme: {
      primaryBg: 'from-[#2B174D] via-[#381F63] to-[#1D0F33]',
      accentColor: '#C084FC',
      borderGlow: 'border-purple-500/40',
      iconColor: 'text-purple-400',
    },
    predictOutput: CONMP_PREDICT_OUTPUT,
    longAnswers: CONMP_LONG_QUESTIONS,
    theoryQuestions: CONMP_THEORY_QUESTIONS,
    examStrategy: CONMP_EXAM_STRATEGY,
    fatalMistakes: CONMP_FATAL_MISTAKES,
    revisionTable: CONMP_REVISION_TABLE,
    quickMcqs: CONMP_QUICK_MCQS,
  },
};

/**
 * Normalized Lookup: Maps all course codes, route paths, and subject aliases
 */
export function getMasterSubjectBank(subjectId: string | undefined): MasterSubjectBank | null {
  if (!subjectId) return null;
  const key = subjectId.toLowerCase().trim();

  // Alias Resolution Map
  if (['oopj', 'java', 'c2311c1', 'sem3-java'].includes(key)) {
    return MASTER_BANKS['oopj'];
  }
  if (['dsa', 'c2310c5', 'sem3-dsa', 'dsa301', 'data-structures'].includes(key)) {
    return MASTER_BANKS['dsa'];
  }
  if (['ca', 'c2310c2', 'ca-101', 'cs401', 'computer-architecture'].includes(key)) {
    return MASTER_BANKS['ca'];
  }
  if (['dbms', 'c2311c4', 'sem3-dbms', 'dbms302', 'database'].includes(key)) {
    return MASTER_BANKS['dbms'];
  }
  if (['conmp', 'coanmp', 's2320c1', 'sem3-coanmp', 'numerical-methods'].includes(key)) {
    return MASTER_BANKS['conmp'];
  }

  return MASTER_BANKS[key] || null;
}
