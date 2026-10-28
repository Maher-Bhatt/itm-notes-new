/**
 * =============================================================================
 * ALL-INDIA MULTI-UNIVERSITY COMPREHENSIVE QUESTION BANK & MCQS (2026-2027)
 * Topic-wise, subject-wise multiple choice questions with in-depth explanations,
 * algorithmic proofs, and university examination standards.
 * =============================================================================
 */

import { MCQ } from './types';

export interface QuestionBankItem extends MCQ {
  id: string;
  subjectId: string;
  subjectName: string;
  topicId: string;
  topicTitle: string;
  unitTitle: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  branch: 'Common' | 'CSE' | 'IT' | 'AI&DS' | 'ECE' | 'EEE' | 'ME' | 'CE';
  semester: number;
}

export const MASSIVE_QUESTION_BANK: QuestionBankItem[] = [
  {
    "id": "dsa-001",
    "question": "What is the tight worst-case time complexity of reversing an array of size n in-place using the two-pointer technique?",
    "options": [
      "O(1)",
      "O(log n)",
      "O(n)",
      "O(n^2)"
    ],
    "correctIndex": 2,
    "explanation": "Reversing an array using two pointers requires swapping elements from both ends moving inward, taking exactly floor(n/2) swaps. Thus, the time complexity is strictly linear O(n).",
    "subjectId": "sem3-dsa-master",
    "subjectName": "Data Structures & Algorithms",
    "topicId": "dsa-arrays-01",
    "topicTitle": "Two-Pointer Array Reversal",
    "unitTitle": "Unit 1: Linear Data Structures",
    "difficulty": "Easy",
    "branch": "CSE",
    "semester": 3
  },
  {
    "id": "dsa-002",
    "question": "In a circular queue implemented using an array of capacity MAX, what is the exact full-queue invariant using modulo arithmetic?",
    "options": [
      "front == rear",
      "(rear + 1) % MAX == front",
      "rear == MAX - 1",
      "(front + 1) % MAX == rear"
    ],
    "correctIndex": 1,
    "explanation": "In a circular queue, one slot is reserved to distinguish full from empty. The queue is mathematically full when advancing the rear pointer wraps around to meet the front: (rear + 1) % MAX == front.",
    "subjectId": "sem3-dsa-master",
    "subjectName": "Data Structures & Algorithms",
    "topicId": "dsa-queues-01",
    "topicTitle": "Circular Queue Invariants",
    "unitTitle": "Unit 1: Linear Data Structures",
    "difficulty": "Medium",
    "branch": "CSE",
    "semester": 3
  },
  {
    "id": "dsa-003",
    "question": "What is the amortized cost per append operation for a dynamically resizing array (like Java ArrayList or Python List) that doubles its capacity when full?",
    "options": [
      "O(n)",
      "O(log n)",
      "O(1)",
      "O(sqrt(n))"
    ],
    "correctIndex": 2,
    "explanation": "Although an occasional resize costs O(n) to allocate memory and copy elements, doubling the size distributes this work across n previous single-cost appends. The aggregate work for n operations is <= 3n, giving an amortized time of O(1).",
    "subjectId": "sem3-dsa-master",
    "subjectName": "Data Structures & Algorithms",
    "topicId": "dsa-arrays-02",
    "topicTitle": "Dynamic Array Amortization",
    "unitTitle": "Unit 1: Linear Data Structures",
    "difficulty": "Hard",
    "branch": "CSE",
    "semester": 3
  },
  {
    "id": "dsa-004",
    "question": "Which data structure is fundamentally used by compilers to convert an infix mathematical expression to postfix notation (Dijkstra's Shunting-yard algorithm)?",
    "options": [
      "Queue",
      "Stack",
      "Binary Heap",
      "Priority Queue"
    ],
    "correctIndex": 1,
    "explanation": "Dijkstra's Shunting-yard algorithm utilizes a Stack to hold operators until operands of higher or equal precedence are encountered.",
    "subjectId": "sem3-dsa-master",
    "subjectName": "Data Structures & Algorithms",
    "topicId": "dsa-stacks-01",
    "topicTitle": "Infix to Postfix Conversion",
    "unitTitle": "Unit 1: Stacks & Applications",
    "difficulty": "Easy",
    "branch": "CSE",
    "semester": 3
  },
  {
    "id": "dsa-005",
    "question": "When evaluating the postfix expression: '6 2 3 + * 4 /', what is the final numeric result?",
    "options": [
      "7.5",
      "7",
      "8",
      "6"
    ],
    "correctIndex": 0,
    "explanation": "Step 1: 2 and 3 are pushed, '+' computes 2+3=5. Stack has [6, 5]. Step 2: '*' computes 6*5=30. Step 3: '4 /' computes 30/4 = 7.5.",
    "subjectId": "sem3-dsa-master",
    "subjectName": "Data Structures & Algorithms",
    "topicId": "dsa-stacks-02",
    "topicTitle": "Postfix Evaluation",
    "unitTitle": "Unit 1: Stacks & Applications",
    "difficulty": "Medium",
    "branch": "CSE",
    "semester": 3
  },
  {
    "id": "dsa-006",
    "question": "Floyd's Cycle-Finding Algorithm (Tortoise and Hare) detects a cycle in a linked list using two pointers moving at speeds 1 and 2. What is its auxiliary space complexity?",
    "options": [
      "O(n)",
      "O(log n)",
      "O(1)",
      "O(n^2)"
    ],
    "correctIndex": 2,
    "explanation": "Floyd's cycle detection only tracks two pointer variables (slow and fast), requiring strictly O(1) auxiliary space without hash tables.",
    "subjectId": "sem3-dsa-master",
    "subjectName": "Data Structures & Algorithms",
    "topicId": "dsa-linked-01",
    "topicTitle": "Floyd's Cycle Finding",
    "unitTitle": "Unit 1: Linked Lists",
    "difficulty": "Medium",
    "branch": "CSE",
    "semester": 3
  },
  {
    "id": "dsa-007",
    "question": "In a Binary Search Tree (BST) with n distinct keys, which tree traversal visits the keys in strictly sorted ascending order?",
    "options": [
      "Pre-order Traversal",
      "In-order Traversal",
      "Post-order Traversal",
      "Level-order Traversal"
    ],
    "correctIndex": 1,
    "explanation": "In-order traversal visits (Left, Root, Right). Since for every node in a BST, Left < Root < Right, in-order traversal guarantees monotonic ascending sorted order.",
    "subjectId": "sem3-dsa-master",
    "subjectName": "Data Structures & Algorithms",
    "topicId": "dsa-trees-01",
    "topicTitle": "BST In-Order Traversal",
    "unitTitle": "Unit 2: Non-Linear Trees",
    "difficulty": "Easy",
    "branch": "CSE",
    "semester": 3
  },
  {
    "id": "dsa-008",
    "question": "An AVL tree maintains height balance such that for every node, the balance factor (height(left) - height(right)) is restricted to which set?",
    "options": [
      "{-1, 0, 1}",
      "{-2, 0, 2}",
      "{0, 1}",
      "{-1, 1}"
    ],
    "correctIndex": 0,
    "explanation": "By definition, an AVL tree requires the balance factor of every node to be strictly within {-1, 0, 1}. Any balance factor of +2 or -2 triggers tree rotations (LL, RR, LR, RL).",
    "subjectId": "sem3-dsa-master",
    "subjectName": "Data Structures & Algorithms",
    "topicId": "dsa-trees-02",
    "topicTitle": "AVL Balance Factor Invariant",
    "unitTitle": "Unit 2: Balanced Trees",
    "difficulty": "Medium",
    "branch": "CSE",
    "semester": 3
  },
  {
    "id": "dsa-009",
    "question": "What is the time complexity of the bottom-up Build-Heap algorithm (Floyd's algorithm) to construct a binary heap from an arbitrary unsorted array of n elements?",
    "options": [
      "O(n log n)",
      "O(n)",
      "O(log n)",
      "O(n^2)"
    ],
    "correctIndex": 1,
    "explanation": "Because most nodes reside near the leaves (requiring fewer sift-down steps), the sum converges geometrically to O(n) linear time, rather than O(n log n).",
    "subjectId": "sem3-dsa-master",
    "subjectName": "Data Structures & Algorithms",
    "topicId": "dsa-heaps-01",
    "topicTitle": "Linear-Time Build Heap",
    "unitTitle": "Unit 2: Heaps & Priority Queues",
    "difficulty": "Hard",
    "branch": "CSE",
    "semester": 3
  },
  {
    "id": "dsa-010",
    "question": "Which algorithm finds single-source shortest paths in a directed graph with non-negative edge weights in O((V + E) log V) time?",
    "options": [
      "Bellman-Ford Algorithm",
      "Dijkstra's Algorithm",
      "Floyd-Warshall Algorithm",
      "Kruskal's Algorithm"
    ],
    "correctIndex": 1,
    "explanation": "Dijkstra's algorithm with a min-priority heap finds shortest paths in O((V + E) log V) time, provided all edge weights are non-negative.",
    "subjectId": "sem3-dsa-master",
    "subjectName": "Data Structures & Algorithms",
    "topicId": "dsa-graphs-01",
    "topicTitle": "Dijkstra's Shortest Path",
    "unitTitle": "Unit 3: Graphs & Algorithms",
    "difficulty": "Medium",
    "branch": "CSE",
    "semester": 3
  },
  {
    "id": "dsa-011",
    "question": "Which shortest-path algorithm can correctly handle graphs containing negative edge weights and detect negative weight cycles?",
    "options": [
      "Dijkstra's Algorithm",
      "Bellman-Ford Algorithm",
      "Breadth-First Search (BFS)",
      "Prim's Algorithm"
    ],
    "correctIndex": 1,
    "explanation": "Bellman-Ford relaxes all edges |V| - 1 times. If a further relaxation reduces distance, a negative cycle exists, making it suitable for negative edge weights.",
    "subjectId": "sem3-dsa-master",
    "subjectName": "Data Structures & Algorithms",
    "topicId": "dsa-graphs-02",
    "topicTitle": "Bellman-Ford Algorithm",
    "unitTitle": "Unit 3: Graphs & Algorithms",
    "difficulty": "Medium",
    "branch": "CSE",
    "semester": 3
  },
  {
    "id": "dsa-012",
    "question": "What is the worst-case time complexity of QuickSort when the pivot chosen is always the minimum or maximum element?",
    "options": [
      "O(n log n)",
      "O(n)",
      "O(n^2)",
      "O(log n)"
    ],
    "correctIndex": 2,
    "explanation": "If the chosen pivot does not partition the array evenly (e.g. partition size 0 and n-1), recurrence T(n) = T(n-1) + O(n) yields worst-case O(n^2).",
    "subjectId": "sem3-dsa-master",
    "subjectName": "Data Structures & Algorithms",
    "topicId": "dsa-sort-01",
    "topicTitle": "QuickSort Asymptotic Analysis",
    "unitTitle": "Unit 4: Sorting & Searching",
    "difficulty": "Easy",
    "branch": "CSE",
    "semester": 3
  },
  {
    "id": "dbms-001",
    "question": "Which ACID property guarantees that a transaction's operations are committed completely or completely rolled back in case of failure?",
    "options": [
      "Atomicity",
      "Consistency",
      "Isolation",
      "Durability"
    ],
    "correctIndex": 0,
    "explanation": "Atomicity ensures the 'all-or-nothing' principle using write-ahead logging (WAL) and undo logs.",
    "subjectId": "sem3-dbms-master",
    "subjectName": "Database Management Systems",
    "topicId": "dbms-trans-01",
    "topicTitle": "ACID Atomicity Invariant",
    "unitTitle": "Unit 4: Transactions & Concurrency",
    "difficulty": "Easy",
    "branch": "CSE",
    "semester": 3
  },
  {
    "id": "dbms-002",
    "question": "What normal form specifically eliminates transitive functional dependencies (where a non-prime attribute depends on another non-prime attribute)?",
    "options": [
      "First Normal Form (1NF)",
      "Second Normal Form (2NF)",
      "Third Normal Form (3NF)",
      "Boyce-Codd Normal Form (BCNF)"
    ],
    "correctIndex": 2,
    "explanation": "Third Normal Form (3NF) requires 2NF plus no transitive dependencies (if X -> A, then X is a superkey or A is a prime attribute).",
    "subjectId": "sem3-dbms-master",
    "subjectName": "Database Management Systems",
    "topicId": "dbms-norm-01",
    "topicTitle": "Third Normal Form (3NF)",
    "unitTitle": "Unit 3: Relational Normalization",
    "difficulty": "Medium",
    "branch": "CSE",
    "semester": 3
  },
  {
    "id": "dbms-003",
    "question": "In Boyce-Codd Normal Form (BCNF), for every non-trivial functional dependency X -> Y, what condition must strictly hold for X?",
    "options": [
      "X must be a prime attribute",
      "X must be a superkey",
      "Y must be a subset of X",
      "X must have atomic values"
    ],
    "correctIndex": 1,
    "explanation": "BCNF is a stricter form of 3NF where every determinant X in non-trivial dependency X -> Y must strictly be a superkey of the relation.",
    "subjectId": "sem3-dbms-master",
    "subjectName": "Database Management Systems",
    "topicId": "dbms-norm-02",
    "topicTitle": "BCNF Determinant Superkey Rule",
    "unitTitle": "Unit 3: Relational Normalization",
    "difficulty": "Medium",
    "branch": "CSE",
    "semester": 3
  },
  {
    "id": "dbms-004",
    "question": "Which SQL clause is used to filter aggregate group records produced by a GROUP BY clause?",
    "options": [
      "WHERE",
      "HAVING",
      "ORDER BY",
      "DISTINCT"
    ],
    "correctIndex": 1,
    "explanation": "WHERE filters individual rows prior to grouping; HAVING filters aggregated groups after the GROUP BY evaluation.",
    "subjectId": "sem3-dbms-master",
    "subjectName": "Database Management Systems",
    "topicId": "dbms-sql-01",
    "topicTitle": "WHERE vs HAVING Filtering",
    "unitTitle": "Unit 2: SQL Query Language",
    "difficulty": "Easy",
    "branch": "CSE",
    "semester": 3
  },
  {
    "id": "dbms-005",
    "question": "Why are B+ Trees preferred over B-Trees for database indexing on hard disks and SSDs?",
    "options": [
      "B+ Trees store all records only in leaf nodes linked sequentially for range queries",
      "B+ Trees have fewer nodes than B-Trees",
      "B+ Trees do not require rebalancing",
      "B+ Trees only support integer keys"
    ],
    "correctIndex": 0,
    "explanation": "In a B+ Tree, interior nodes only hold search keys for routing, while all actual records reside in leaves linked in a doubly-linked list, providing superior range scans.",
    "subjectId": "sem3-dbms-master",
    "subjectName": "Database Management Systems",
    "topicId": "dbms-idx-01",
    "topicTitle": "B+ Tree Indexing on Storage",
    "unitTitle": "Unit 5: Storage & Indexing",
    "difficulty": "Medium",
    "branch": "CSE",
    "semester": 3
  },
  {
    "id": "java-001",
    "question": "Which keyword in Java prevents a class from being subclassed by any child class?",
    "options": [
      "static",
      "final",
      "abstract",
      "private"
    ],
    "correctIndex": 1,
    "explanation": "Declaring a class as 'final' prevents inheritance (e.g. java.lang.String is a final class).",
    "subjectId": "sem3-java-master",
    "subjectName": "Object-Oriented Programming with Java",
    "topicId": "java-oop-01",
    "topicTitle": "Final Keyword Semantics",
    "unitTitle": "Unit 2: Classes & Inheritance",
    "difficulty": "Easy",
    "branch": "CSE",
    "semester": 3
  },
  {
    "id": "java-002",
    "question": "What is the output of comparing two distinct String objects created with 'new String(\"hello\")' using the == operator?",
    "options": [
      "true",
      "false",
      "Compilation Error",
      "NullPointerException"
    ],
    "correctIndex": 1,
    "explanation": "The == operator compares object memory references. Since both were allocated via 'new', their addresses differ, returning false. To compare characters, .equals() must be used.",
    "subjectId": "sem3-java-master",
    "subjectName": "Object-Oriented Programming with Java",
    "topicId": "java-str-01",
    "topicTitle": "String Equality & Reference",
    "unitTitle": "Unit 1: Java Foundations",
    "difficulty": "Easy",
    "branch": "CSE",
    "semester": 3
  },
  {
    "id": "java-003",
    "question": "In Java Exception Handling, which block is always guaranteed to execute regardless of whether an exception was thrown or caught?",
    "options": [
      "try",
      "catch",
      "finally",
      "throw"
    ],
    "correctIndex": 2,
    "explanation": "The 'finally' block executes unconditionally (except in System.exit(0) or catastrophic JVM crash) to ensure clean resource deallocation.",
    "subjectId": "sem3-java-master",
    "subjectName": "Object-Oriented Programming with Java",
    "topicId": "java-exc-01",
    "topicTitle": "Finally Block Guarantee",
    "unitTitle": "Unit 3: Exception Handling",
    "difficulty": "Easy",
    "branch": "CSE",
    "semester": 3
  },
  {
    "id": "java-004",
    "question": "What is the default initial capacity and load factor of a standard java.util.HashMap in modern Java?",
    "options": [
      "Capacity 16, Load Factor 0.75",
      "Capacity 10, Load Factor 0.5",
      "Capacity 32, Load Factor 1.0",
      "Capacity 8, Load Factor 0.8"
    ],
    "correctIndex": 0,
    "explanation": "Java HashMap defaults to an initial capacity of 16 buckets with a load factor of 0.75 (resizing when 75% full).",
    "subjectId": "sem3-java-master",
    "subjectName": "Object-Oriented Programming with Java",
    "topicId": "java-coll-01",
    "topicTitle": "HashMap Capacity & Load Factor",
    "unitTitle": "Unit 4: Java Collections Framework",
    "difficulty": "Medium",
    "branch": "CSE",
    "semester": 3
  },
  {
    "id": "cao-001",
    "question": "Booth's Multiplication Algorithm is specifically designed to perform fast multiplication on which type of binary numbers?",
    "options": [
      "Unsigned integers only",
      "Signed two's complement binary integers",
      "IEEE 754 Floating point numbers",
      "BCD digits"
    ],
    "correctIndex": 1,
    "explanation": "Booth's algorithm multiplies signed integers in 2's complement representation by skipping sequences of contiguous 1s, reducing additions/subtractions.",
    "subjectId": "computer-architecture",
    "subjectName": "Computer Architecture & Organization",
    "topicId": "cao-math-01",
    "topicTitle": "Booth's Multiplication Algorithm",
    "unitTitle": "Unit 2: Computer Arithmetic",
    "difficulty": "Medium",
    "branch": "CSE",
    "semester": 3
  },
  {
    "id": "cao-002",
    "question": "In a 5-stage RISC instruction pipeline (IF, ID, EX, MEM, WB), what hazard occurs when an instruction depends on the result of an earlier uncompleted instruction?",
    "options": [
      "Structural Hazard",
      "Data Hazard (RAW)",
      "Control Hazard",
      "Branch Hazard"
    ],
    "correctIndex": 1,
    "explanation": "Data hazards (Read-After-Write, RAW) occur when instruction j attempts to read a register before instruction i writes its result. Resolved by data forwarding or pipeline stalls.",
    "subjectId": "computer-architecture",
    "subjectName": "Computer Architecture & Organization",
    "topicId": "cao-pipe-01",
    "topicTitle": "Pipeline Data Hazards (RAW)",
    "unitTitle": "Unit 4: Instruction Pipelining",
    "difficulty": "Medium",
    "branch": "CSE",
    "semester": 3
  },
  {
    "id": "cao-003",
    "question": "In a Direct-Mapped Cache with 32-bit addresses, 64 KB cache size, and 16-byte cache blocks, how many bits are used for the Block Offset?",
    "options": [
      "2 bits",
      "4 bits",
      "6 bits",
      "8 bits"
    ],
    "correctIndex": 1,
    "explanation": "Cache block size is 16 bytes = 2^4 bytes. Therefore, 4 bits are required to index individual bytes within a cache block.",
    "subjectId": "computer-architecture",
    "subjectName": "Computer Architecture & Organization",
    "topicId": "cao-mem-01",
    "topicTitle": "Cache Address Decoding",
    "unitTitle": "Unit 5: Memory Hierarchy",
    "difficulty": "Medium",
    "branch": "CSE",
    "semester": 3
  },
  {
    "id": "os-001",
    "question": "Which CPU scheduling algorithm is completely free from starvation of low-priority processes?",
    "options": [
      "Shortest Job First (SJF)",
      "Priority Scheduling",
      "Round Robin (RR)",
      "Shortest Remaining Time First (SRTF)"
    ],
    "correctIndex": 2,
    "explanation": "Round Robin allocates a fixed time quantum to each ready process cyclically, guaranteeing that every process receives CPU time within (n-1)*q time units without starvation.",
    "subjectId": "os-core",
    "subjectName": "Operating Systems",
    "topicId": "os-sched-01",
    "topicTitle": "Round Robin Scheduling",
    "unitTitle": "Unit 2: Process Scheduling",
    "difficulty": "Easy",
    "branch": "CSE",
    "semester": 4
  },
  {
    "id": "os-002",
    "question": "What are the four necessary Coffman conditions required for a deadlock to occur in an operating system?",
    "options": [
      "Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait",
      "Preemption, Aging, Paging, Virtual Memory",
      "Semaphores, Mutex, Spinlocks, Monitors",
      "Context Switching, Interrupts, System Calls, Fork"
    ],
    "correctIndex": 0,
    "explanation": "The Coffman conditions are: Mutual Exclusion, Hold & Wait, No Preemption, and Circular Wait. Eliminating any one condition guarantees deadlock prevention.",
    "subjectId": "os-core",
    "subjectName": "Operating Systems",
    "topicId": "os-dead-01",
    "topicTitle": "Coffman Deadlock Conditions",
    "unitTitle": "Unit 3: Deadlock Invariants",
    "difficulty": "Medium",
    "branch": "CSE",
    "semester": 4
  },
  {
    "id": "net-001",
    "question": "In IPv4 networking, what is the default subnet mask for a standard Class B network?",
    "options": [
      "255.0.0.0",
      "255.255.0.0",
      "255.255.255.0",
      "255.255.255.255"
    ],
    "correctIndex": 1,
    "explanation": "Class B IPv4 addresses allocate 16 bits to Network ID and 16 bits to Host ID, resulting in a default subnet mask of 255.255.0.0 (/16).",
    "subjectId": "net-core",
    "subjectName": "Computer Networks",
    "topicId": "net-ip-01",
    "topicTitle": "IPv4 Class B Subnet Mask",
    "unitTitle": "Unit 3: Network Layer",
    "difficulty": "Easy",
    "branch": "CSE",
    "semester": 4
  },
  {
    "id": "net-002",
    "question": "At which layer of the OSI model does the Transmission Control Protocol (TCP) operate?",
    "options": [
      "Network Layer",
      "Transport Layer",
      "Data Link Layer",
      "Session Layer"
    ],
    "correctIndex": 1,
    "explanation": "TCP is a connection-oriented, reliable protocol operating at Layer 4: Transport Layer of the OSI Reference Model.",
    "subjectId": "net-core",
    "subjectName": "Computer Networks",
    "topicId": "net-tcp-01",
    "topicTitle": "OSI Transport Layer Protocol",
    "unitTitle": "Unit 4: Transport Layer",
    "difficulty": "Easy",
    "branch": "CSE",
    "semester": 4
  }
];

// Helper functions for question querying and testing
export function getQuestionsBySubject(subjectId?: string): QuestionBankItem[] {
  if (!subjectId || subjectId === 'all') return MASSIVE_QUESTION_BANK;
  return MASSIVE_QUESTION_BANK.filter(q => q.subjectId.toLowerCase() === subjectId.toLowerCase());
}

export function getQuestionsByBranch(branch?: string): QuestionBankItem[] {
  if (!branch || branch === 'all') return MASSIVE_QUESTION_BANK;
  return MASSIVE_QUESTION_BANK.filter(q => q.branch === branch || q.branch === 'Common');
}

export function getQuestionsByDifficulty(diff?: string): QuestionBankItem[] {
  if (!diff || diff === 'all') return MASSIVE_QUESTION_BANK;
  return MASSIVE_QUESTION_BANK.filter(q => q.difficulty.toLowerCase() === diff.toLowerCase());
}

export function getRandomPracticeQuiz(count: number = 10, subjectId?: string): QuestionBankItem[] {
  const pool = getQuestionsBySubject(subjectId);
  const shuffled = [...pool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
