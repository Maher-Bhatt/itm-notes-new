/**
 * ITM SLS Baroda University - Previous Year Question Papers (PYQ)
 * Real Mid-Semester (MST-1, MST-2), End-Semester, and Remedial papers
 * with full verified solutions, marking criteria, and topic linkages.
 */

export interface PyqQuestion {
  id: string;
  questionNumber: string;
  marks: number;
  questionText: string;
  subQuestions?: {
    optionLabel: string; // e.g. "Q1 (a)" or "OR"
    questionText: string;
    marks: number;
    modelSolution: string;
    codeSnippet?: string;
    markingScheme: string;
    linkedTopicUrl: string;
  }[];
  modelSolution: string;
  codeSnippet?: string;
  markingScheme: string;
  linkedTopicUrl: string;
}

export interface PyqPaper {
  id: string;
  subjectCode: string;
  subjectName: string;
  semester: number;
  year: number; // 2025, 2024, 2023
  examType: 'MST-1' | 'MST-2' | 'End-Semester' | 'Remedial';
  dateConducted: string;
  durationMinutes: number;
  totalMarks: number;
  instructions: string[];
  questions: PyqQuestion[];
}

export const PYQ_PAPERS: PyqPaper[] = [
  // ── OOPJ (C2311C1) 2024 End-Semester ──
  {
    id: 'oopj-endsem-2024',
    subjectCode: 'C2311C1',
    subjectName: 'Object-Oriented Programming with Java',
    semester: 3,
    year: 2024,
    examType: 'End-Semester',
    dateConducted: 'December 2024',
    durationMinutes: 150,
    totalMarks: 60,
    instructions: [
      'Attempt all questions as per internal choices.',
      'Figures to the right indicate full marks.',
      'Assume suitable data if necessary and write executable Java syntax.',
    ],
    questions: [
      {
        id: 'oopj-2024-q1',
        questionNumber: 'Q1 (a)',
        marks: 5,
        questionText: 'Explain Dynamic Method Dispatch in Java with a complete working program demonstrating polymorphism.',
        markingScheme: '1M: Definition, 2.5M: Correct Code with Parent Reference, 1.5M: Output explanation',
        linkedTopicUrl: '/imp-questions/oopj#part-b',
        modelSolution: `Dynamic Method Dispatch is Java's runtime polymorphism mechanism where a call to an overridden method is resolved at runtime rather than compile-time based on the actual object type present on the heap.

A superclass reference variable (Parent p = new Child();) can refer to a subclass object. When an overridden method is invoked through this reference, Java executes the subclass version.`,
        codeSnippet: `class Vehicle {
    void start() { System.out.println("Vehicle starting"); }
}
class ElectricCar extends Vehicle {
    @Override
    void start() { System.out.println("Electric car starting silently with battery power"); }
}
public class TestDispatch {
    public static void main(String[] args) {
        Vehicle v = new ElectricCar(); // Dynamic binding
        v.start(); // Invokes ElectricCar.start() at runtime
    }
}`,
      },
      {
        id: 'oopj-2024-q2',
        questionNumber: 'Q1 (b)',
        marks: 5,
        questionText: 'Differentiate between Method Overloading and Method Overriding with suitable comparison parameters and examples.',
        markingScheme: '2M: Comparison table (4 points), 2M: Example code, 1M: Rules',
        linkedTopicUrl: '/imp-questions/oopj#part-c',
        modelSolution: `| Parameter | Method Overloading | Method Overriding |
| :--- | :--- | :--- |
| Binding | Compile-time (Static) | Runtime (Dynamic) |
| Inheritance | Within same class or subclass | Requires IS-A Inheritance relationship |
| Signature | Must have DIFFERENT parameter lists | Must have EXACT same method signature |
| Return Type | Can be different | Must be same or covariant |
| private/static | Can be overloaded | CANNOT be overridden |`,
      },
      {
        id: 'oopj-2024-q3',
        questionNumber: 'Q2',
        marks: 7,
        questionText: 'What is multiple inheritance? Why does Java not support multiple inheritance through classes? How do Interfaces solve the Diamond Problem?',
        markingScheme: '2M: Diamond problem diagram/explanation, 3M: Interface solution code, 2M: Default method resolution rules',
        linkedTopicUrl: '/imp-questions/oopj#part-b',
        modelSolution: `Java disallows multiple inheritance using classes to eliminate the 'Diamond Problem'. If Class D inherits from Class B and Class C, which both override a method from Class A, Class D cannot determine which method implementation to inherit.

Interfaces solve this because standard interface methods lack implementation bodies, removing ambiguity. In Java 8+, if two interfaces provide conflicting default methods, Java compiler forces the implementing class to explicitly override the method and resolve it using InterfaceName.super.method().`,
        codeSnippet: `interface Printable { default void display() { System.out.println("Printable"); } }
interface Showable { default void display() { System.out.println("Showable"); } }
class Document implements Printable, Showable {
    @Override
    public void display() {
        Printable.super.display(); // Explicit resolution
        System.out.println("Document resolved");
    }
}`,
      },
    ],
  },

  // ── DSA (C2310C5) 2024 MST-1 ──
  {
    id: 'dsa-mst1-2024',
    subjectCode: 'C2310C5',
    subjectName: 'Data Structures and Algorithms',
    semester: 3,
    year: 2024,
    examType: 'MST-1',
    dateConducted: 'October 2024',
    durationMinutes: 90,
    totalMarks: 30,
    instructions: [
      'Write algorithms / C code with clear variable definitions.',
      'Show trace tables for dry runs.',
    ],
    questions: [
      {
        id: 'dsa-mst-q1',
        questionNumber: 'Q1 (a)',
        marks: 5,
        questionText: 'Explain the Circular Queue full and empty boundary conditions. Write enqueue and dequeue operations in C.',
        markingScheme: '1.5M: Boundary modulo math, 2M: Enqueue C code, 1.5M: Dequeue C code',
        linkedTopicUrl: '/imp-questions/dsa#part-b',
        modelSolution: `In a standard linear queue, once elements are dequeued, memory is wasted at the front. A circular queue wraps around using modulo arithmetic:
- Empty condition: front == -1
- Full condition: (rear + 1) % MAX == front
- Next position: index = (index + 1) % MAX`,
        codeSnippet: `void enqueue(int val) {
    if ((rear + 1) % MAX == front) {
        printf("Queue Overflow\\n");
        return;
    }
    if (front == -1) front = 0;
    rear = (rear + 1) % MAX;
    q[rear] = val;
}
int dequeue() {
    if (front == -1) { printf("Queue Underflow\\n"); return -1; }
    int data = q[front];
    if (front == rear) { front = -1; rear = -1; }
    else { front = (front + 1) % MAX; }
    return data;
}`,
      },
      {
        id: 'dsa-mst-q2',
        questionNumber: 'Q1 (b)',
        marks: 5,
        questionText: 'Demonstrate AVL Tree rotations for LL, RR, LR, and RL imbalance cases with diagrams.',
        markingScheme: '2M: Balance factor definition, 3M: Diagrams and rotation pointers',
        linkedTopicUrl: '/imp-questions/dsa#part-b',
        modelSolution: `An AVL tree is a self-balancing BST where Balance Factor BF = height(left) - height(right) must be in {-1, 0, +1}.
- LL Imbalance (BF = +2, left child BF = +1): Single Right Rotation on node.
- RR Imbalance (BF = -2, right child BF = -1): Single Left Rotation on node.
- LR Imbalance (BF = +2, left child BF = -1): Double rotation - Left rotate child, then Right rotate node.
- RL Imbalance (BF = -2, right child BF = +1): Double rotation - Right rotate child, then Left rotate node.`,
      },
    ],
  },

  // ── Computer Architecture (C2310C2) 2024 End-Semester ──
  {
    id: 'ca-endsem-2024',
    subjectCode: 'C2310C2',
    subjectName: 'Computer Architecture & Organization',
    semester: 3,
    year: 2024,
    examType: 'End-Semester',
    dateConducted: 'December 2024',
    durationMinutes: 150,
    totalMarks: 60,
    instructions: [
      'Draw neat block diagrams and space-time charts where required.',
    ],
    questions: [
      {
        id: 'ca-2024-q1',
        questionNumber: 'Q1',
        marks: 6,
        questionText: 'Explain the 16-bit Common Bus System of Mano Basic Computer with multiplexer selection lines.',
        markingScheme: '2M: Multiplexer 3-to-8 decoder table, 2M: Register widths, 2M: Diagram description',
        linkedTopicUrl: '/imp-questions/ca#part-b',
        modelSolution: `The Mano basic computer connects 7 registers and Memory via a common bus using a 3-to-8 line multiplexer with selection lines S2, S1, S0:
- S2 S1 S0 = 001: AR (Address Register, 12 bits)
- S2 S1 S0 = 010: PC (Program Counter, 12 bits)
- S2 S1 S0 = 011: DR (Data Register, 16 bits)
- S2 S1 S0 = 100: AC (Accumulator, 16 bits)
- S2 S1 S0 = 101: IR (Instruction Register, 16 bits)
- S2 S1 S0 = 110: TR (Temporary Register, 16 bits)
- S2 S1 S0 = 111: Memory word M[AR] (16 bits)
AR and PC have 12 bits because memory contains 4096 words (2^12 = 4096).`,
      },
      {
        id: 'ca-2024-q2',
        questionNumber: 'Q2',
        marks: 6,
        questionText: 'Multiply (+7) by (-3) using Booth Multiplication Algorithm. Show complete step-by-step cycle table.',
        markingScheme: '2M: Two\'s complement conversion, 3M: 4-cycle trace table, 1M: Final 8-bit output',
        linkedTopicUrl: '/imp-questions/ca#part-b',
        modelSolution: `Multiplicand M = +7 = 0111, -M = 1001. Multiplier Q = -3 = 1101.
Initially AC = 0000, Q_-1 = 0, Count = 4.
- Cycle 1: Q_0 Q_-1 = 10 -> AC = AC - M = 1001. ASR -> AC = 1100, Q = 1110, Q_-1 = 1.
- Cycle 2: Q_0 Q_-1 = 01 -> AC = AC + M = 0011. ASR -> AC = 0001, Q = 1111, Q_-1 = 0.
- Cycle 3: Q_0 Q_-1 = 10 -> AC = AC - M = 1010. ASR -> AC = 1101, Q = 0111, Q_-1 = 1.
- Cycle 4: Q_0 Q_-1 = 11 -> No operation. ASR -> AC = 1110, Q = 1011, Q_-1 = 1.
Result: 1110 1011 in two's complement = -21. Verified!`,
      },
    ],
  },

  // ── DBMS (C2311C4) 2024 End-Semester ──
  {
    id: 'dbms-endsem-2024',
    subjectCode: 'C2311C4',
    subjectName: 'Database Management Systems',
    semester: 3,
    year: 2024,
    examType: 'End-Semester',
    dateConducted: 'December 2024',
    durationMinutes: 150,
    totalMarks: 60,
    instructions: [
      'Write standard SQL and relational algebra equations.',
    ],
    questions: [
      {
        id: 'dbms-2024-q1',
        questionNumber: 'Q1',
        marks: 7,
        questionText: 'Explain 1NF, 2NF, 3NF, and BCNF normalization with functional dependencies and an un-normalized student-course table.',
        markingScheme: '1.5M: 1NF & 2NF, 2M: 3NF & transitive dependencies, 2M: BCNF determinant rule, 1.5M: Lossless decomposition check',
        linkedTopicUrl: '/imp-questions/dbms#part-b',
        modelSolution: `Normalization systematically eliminates data redundancy, insertion anomalies, update anomalies, and deletion anomalies:
- 1NF: All attribute values must be atomic (no multivalued repeating sets).
- 2NF: In 1NF and no non-prime attribute is partially dependent on any candidate key (Full functional dependency).
- 3NF: In 2NF and no transitive dependency exists (for X -> Y, X is superkey or Y is prime attribute).
- BCNF: Stricter than 3NF: for every non-trivial functional dependency X -> Y, X MUST be a superkey.`,
      },
    ],
  },

  // ── CONMP (S2320C1) 2024 End-Semester ──
  {
    id: 'conmp-endsem-2024',
    subjectCode: 'S2320C1',
    subjectName: 'Computer Oriented Numerical Methods with Python',
    semester: 3,
    year: 2024,
    examType: 'End-Semester',
    dateConducted: 'December 2024',
    durationMinutes: 90,
    totalMarks: 30,
    instructions: [
      'Provide iteration table and clean Python code with convergence check.',
    ],
    questions: [
      {
        id: 'conmp-2024-q1',
        questionNumber: 'Q1',
        marks: 6,
        questionText: 'Find the real root of f(x) = x^3 - 2x - 5 = 0 using Newton-Raphson method with initial guess x_0 = 2 up to 3 iterations. Write Python implementation.',
        markingScheme: '2M: Iteration calculation, 3M: Python script, 1M: Final root',
        linkedTopicUrl: '/imp-questions/conmp#part-b',
        modelSolution: `Formula: x_{n+1} = x_n - f(x_n) / f'(x_n).
Here f(x) = x^3 - 2x - 5, f'(x) = 3x^2 - 2.
- x_0 = 2.0: f(2) = -1, f'(2) = 10 -> x_1 = 2 - (-1/10) = 2.1
- x_1 = 2.1: f(2.1) = 0.061, f'(2.1) = 11.23 -> x_2 = 2.1 - 0.061/11.23 = 2.094568
- x_2 = 2.094568: f(x_2) = 0.000185 -> x_3 = 2.094551. Quadratic convergence achieved!`,
        codeSnippet: `def newton_raphson(f, df, x0, tol=1e-6, max_iter=20):
    x = x0
    for i in range(max_iter):
        fx, dfx = f(x), df(x)
        if abs(dfx) < 1e-12: break
        x_next = x - fx / dfx
        if abs(x_next - x) < tol: return x_next
        x = x_next
    return x`,
      },
    ],
  },
];
