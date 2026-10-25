/**
 * ITM University - Core Formulas & Definitions Bank
 * Comprehensive searchable formula cards rendered with KaTeX
 * across all core engineering subjects.
 */

export interface FormulaItem {
  id: string;
  subjectCode: string;
  subjectName: string;
  title: string;
  category: 'Time Complexity' | 'Numerical Analysis' | 'Architecture AMAT' | 'Relational Algebra' | 'Data Structures';
  latex: string;
  explanation: string;
  variables: { symbol: string; meaning: string }[];
  examSignificance: string;
}

export const FORMULAS_DATA: FormulaItem[] = [
  // ── CONMP (S2320C1) Formulas ──
  {
    id: 'f-nr-1',
    subjectCode: 'S2320C1',
    subjectName: 'Numerical Methods with Python',
    title: 'Newton-Raphson Iteration Formula',
    category: 'Numerical Analysis',
    latex: 'x_{n+1} = x_n - \\frac{f(x_n)}{f\'(x_n)}',
    explanation: 'Finds successive root approximations using tangent line intersections. Possesses quadratic order of convergence (p = 2).',
    variables: [
      { symbol: 'x_n', meaning: 'Current root estimate at step n' },
      { symbol: 'f(x_n)', meaning: 'Function value evaluated at x_n' },
      { symbol: "f'(x_n)", meaning: 'First analytical derivative (slope) at x_n' },
    ],
    examSignificance: 'Mandatory in Q1 or Q2. Always verify that derivative is not zero.',
  },
  {
    id: 'f-bisection-1',
    subjectCode: 'S2320C1',
    subjectName: 'Numerical Methods with Python',
    title: 'Bisection Method Interval Halving',
    category: 'Numerical Analysis',
    latex: 'm = \\frac{a + b}{2}, \\quad |e_n| \\le \\frac{b - a}{2^n}',
    explanation: 'Bracketing method based on the Intermediate Value Theorem. Guarantees linear convergence by halving the bracket width at every step.',
    variables: [
      { symbol: '[a, b]', meaning: 'Bracketing interval where f(a) * f(b) < 0' },
      { symbol: 'm', meaning: 'Midpoint approximation' },
      { symbol: 'n', meaning: 'Number of iterations required for desired tolerance' },
    ],
    examSignificance: 'Commonly tested with error bound estimation.',
  },
  {
    id: 'f-simpson-13',
    subjectCode: 'S2320C1',
    subjectName: 'Numerical Methods with Python',
    title: "Simpson's 1/3rd Quadrature Rule",
    category: 'Numerical Analysis',
    latex: '\\int_a^b f(x)dx \\approx \\frac{h}{3} \\left[ y_0 + y_n + 4\\sum_{i=1,3,5}^{n-1} y_i + 2\\sum_{j=2,4,6}^{n-2} y_j \\right]',
    explanation: 'Numerical integration approximating function segments with parabolic arcs. Requires an even number of subintervals (n must be even).',
    variables: [
      { symbol: 'h', meaning: 'Step size (b - a) / n' },
      { symbol: '4 * sum', meaning: 'Weight 4 on odd-indexed ordinates' },
      { symbol: '2 * sum', meaning: 'Weight 2 on even-indexed ordinates' },
    ],
    examSignificance: 'Frequently asked 5-mark question with Python code.',
  },
  {
    id: 'f-rk4-1',
    subjectCode: 'S2320C1',
    subjectName: 'Numerical Methods with Python',
    title: 'Runge-Kutta 4th Order (RK4) ODE Formula',
    category: 'Numerical Analysis',
    latex: 'y_{n+1} = y_n + \\frac{h}{6}(k_1 + 2k_2 + 2k_3 + k_4)',
    explanation: 'High-precision 4th-order ODE initial value solver matching Taylor series without requiring analytical derivatives.',
    variables: [
      { symbol: 'k_1', meaning: 'f(x_n, y_n)' },
      { symbol: 'k_2', meaning: 'f(x_n + h/2, y_n + h*k_1/2)' },
      { symbol: 'k_3', meaning: 'f(x_n + h/2, y_n + h*k_2/2)' },
      { symbol: 'k_4', meaning: 'f(x_n + h, y_n + h*k_3)' },
    ],
    examSignificance: 'Premier 5-mark numerical algorithm in Semester 3 exams.',
  },

  // ── Computer Architecture (C2310C2) Formulas ──
  {
    id: 'f-amat-1',
    subjectCode: 'C2310C2',
    subjectName: 'Computer Architecture & Organization',
    title: 'Average Memory Access Time (AMAT)',
    category: 'Architecture AMAT',
    latex: '\\text{AMAT} = \\text{Hit Time}_{L1} + (\\text{Miss Rate}_{L1} \\times \\text{Miss Penalty}_{L1})',
    explanation: 'Quantifies the effective latency experienced by the processor across a tiered memory hierarchy.',
    variables: [
      { symbol: 'Hit Time', meaning: 'Time to access L1 cache (typically 1-2 clock cycles)' },
      { symbol: 'Miss Rate', meaning: 'Fraction of memory accesses that miss L1 (1 - Hit Rate)' },
      { symbol: 'Miss Penalty', meaning: 'Latency to fetch line from L2/DRAM into L1' },
    ],
    examSignificance: 'Standard numerical problem in unit 4 (Cache & Memory Hierarchy).',
  },
  {
    id: 'f-pipeline-speedup',
    subjectCode: 'C2310C2',
    subjectName: 'Computer Architecture & Organization',
    title: 'Pipelining Theoretical Speedup Ratio',
    category: 'Architecture AMAT',
    latex: 'S_k = \\frac{n \\cdot t_n}{(k + n - 1) \\cdot t_k} \\xrightarrow{n \\to \\infty} \\frac{t_n}{t_k} = k',
    explanation: 'Demonstrates that as instruction count n increases, maximum speedup approaches the number of pipeline stages k.',
    variables: [
      { symbol: 'k', meaning: 'Number of pipeline stages (e.g. 4 or 5)' },
      { symbol: 'n', meaning: 'Total number of instructions executed' },
      { symbol: 't_n', meaning: 'Execution time for non-pipelined instruction' },
      { symbol: 't_k', meaning: 'Clock cycle time of longest pipeline stage + latch delay' },
    ],
    examSignificance: 'Mandatory derivation in Computer Architecture Mid-Sem and End-Sem.',
  },

  // ── DSA (C2310C5) Formulas ──
  {
    id: 'f-circular-q',
    subjectCode: 'C2310C5',
    subjectName: 'Data Structures and Algorithms',
    title: 'Circular Queue Boundary & Count Equations',
    category: 'Data Structures',
    latex: '\\text{Next Rear} = (\\text{rear} + 1) \\bmod \\text{MAX}, \\quad \\text{Count} = (\\text{rear} - \\text{front} + \\text{MAX}) \\bmod \\text{MAX}',
    explanation: 'Connects the last index of array buffer back to index 0, preventing false overflow drift.',
    variables: [
      { symbol: 'rear', meaning: 'Index of last inserted item' },
      { symbol: 'front', meaning: 'Index of first element to dequeue' },
      { symbol: 'MAX', meaning: 'Fixed capacity buffer length' },
    ],
    examSignificance: 'Crucial for both university practical code and theoretical exam.',
  },
  {
    id: 'f-avl-bf',
    subjectCode: 'C2310C5',
    subjectName: 'Data Structures and Algorithms',
    title: 'AVL Tree Balance Factor Condition',
    category: 'Data Structures',
    latex: '\\text{BF}(N) = h(N.\\text{left}) - h(N.\\text{right}) \\in \\{-1, 0, +1\\}',
    explanation: 'Maintains strictly logarithmic height O(log n) for search, insert, and delete operations.',
    variables: [
      { symbol: 'BF', meaning: 'Balance Factor of node N' },
      { symbol: 'h(left)', meaning: 'Height of left subtree' },
      { symbol: 'h(right)', meaning: 'Height of right subtree' },
    ],
    examSignificance: 'Every paper tests LL, RR, LR, RL rotation dry runs.',
  },

  // ── DBMS (C2311C4) Formulas ──
  {
    id: 'f-rel-algebra-div',
    subjectCode: 'C2311C4',
    subjectName: 'Database Management Systems',
    title: 'Relational Division Operator Definition',
    category: 'Relational Algebra',
    latex: 'R \\div S = \\pi_{R-S}(R) - \\pi_{R-S}((\\pi_{R-S}(R) \\times S) - R)',
    explanation: 'Answers queries involving the universal quantifier "FOR ALL", e.g. "Find students who completed ALL lab practicals".',
    variables: [
      { symbol: 'R', meaning: 'Relation with schema (A, B)' },
      { symbol: 'S', meaning: 'Relation with schema (B)' },
      { symbol: 'R \\div S', meaning: 'All tuples in A that are associated with EVERY tuple in B' },
    ],
    examSignificance: 'Tested in 3-mark and 5-mark relational theory.',
  },
];
