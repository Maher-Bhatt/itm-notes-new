import { Subject } from './types';

/**
 * BCA Master Curriculum Registry (30 Subjects, Semesters 1 to 6)
 * Complete university syllabus with lecture notes, theory questions, and MCQs.
 */
export const bcaMasterSubjects: Subject[] = [
  {
    "id": "bca101-foc",
    "name": "Fundamentals of Computers & IT",
    "code": "BCA101",
    "color": "bg-blue-600",
    "icon": "cpu",
    "semester": 1,
    "description": "Comprehensive BCA syllabus covering Computer Architecture, Von Neumann model, CPU Registers, Memory Hierarchy (SRAM, DRAM, NVMe), I/O Buses, and System Software.",
    "units": [
      {
        "id": "bca101-u1",
        "title": "Unit 1: Computer Hardware & Von Neumann Architecture",
        "description": "Von Neumann stored-program model, ALU, Control Unit, CPU register sets, and Instruction Execution Cycle.",
        "topics": [
          {
            "id": "bca101-u1-t1",
            "title": "Von Neumann Architecture, Stored-Program Concept & CPU Organization",
            "simpleExplanation": "The Von Neumann architecture is the theoretical foundation of modern computers. It introduces the stored-program concept where instructions and data reside together in the same read-write memory space.",
            "detailedExplanation": "## 1. The Von Neumann Stored-Program Concept\n\nBefore the Von Neumann architecture (1945), computers were wired manually using patch cords to execute different programs. John von Neumann proposed that program instructions should be encoded in binary and stored in primary memory alongside data.\n\n### Core Functional Units\n1. **Central Processing Unit (CPU)**:\n   - **Arithmetic Logic Unit (ALU)**: Executes micro-operations such as addition, subtraction, AND, OR, XOR, and bitwise shifts.\n   - **Control Unit (CU)**: Fetches the next instruction from RAM, decodes opcode bits, and emits hardware clock timing control signals.\n   - **Processor Registers**: Ultra-fast storage inside the CPU core (Accumulator, Program Counter PC, Instruction Register IR, Memory Address Register MAR, Memory Data Register MDR).\n2. **Memory Subsystem**: Uniformly addressed linear byte array holding instructions and operands.\n3. **Input / Output Peripherals**: Interfaces transferring data between external devices and primary memory via buses.\n\n### The Von Neumann Bottleneck\nBecause instructions and data share the exact same physical bus (Bus Multiplexing), CPU throughput is fundamentally throttled by the bandwidth of the system memory bus.",
            "keyPoints": [
              "Stored-program concept stores both program code and data in unified memory.",
              "Von Neumann Bottleneck occurs because instructions and operands share one physical bus.",
              "CPU execution cycle comprises: Fetch -> Decode -> Execute -> Store."
            ],
            "theoryQuestions": [
              {
                "question": "Explain Von Neumann Architecture with a block diagram and discuss the Von Neumann bottleneck.",
                "marks": "7 Marks",
                "answer": "The Von Neumann architecture comprises five major blocks: ALU, Control Unit, Primary Memory, Input Units, and Output Units. Instructions and data are stored in the same address space. The bottleneck arises because the CPU speed greatly outpaces memory bus bandwidth, causing CPU stalls."
              }
            ],
            "mcqs": [
              {
                "question": "In the Von Neumann architecture, what is shared between program instructions and data?",
                "options": [
                  "Physical memory and system bus",
                  "Arithmetic logic registers",
                  "Floating point coprocessor",
                  "Instruction cache"
                ],
                "correctIndex": 0,
                "explanation": "The defining characteristic of Von Neumann architecture is that instructions and operands reside in the same primary memory and share a unified bus."
              }
            ]
          },
          {
            "id": "bca101-u1-t2",
            "title": "Memory Hierarchy: Registers, L1/L2/L3 Cache, SRAM vs DRAM",
            "simpleExplanation": "Memory hierarchy balances latency, bandwidth, and cost per bit. Registers and SRAM caches provide nanosecond access, while DRAM RAM provides high capacity at lower cost.",
            "detailedExplanation": "## 1. Principles of Memory Hierarchy\n\nComputer memory hierarchy balances access latency against cost per bit:\n1. **Internal CPU Registers**: Fastest (<1 clock cycle, ~0.5ns latency), minimal capacity (typically 64-bit to 512-bit per register).\n2. **Level 1 (L1) Cache**: Split into L1 Instruction and L1 Data caches (1-4 clock cycles, ~32KB - 64KB per core).\n3. **Level 2 (L2) Cache**: Core-dedicated cache (~10-14 clock cycles, 512KB - 1MB per core).\n4. **Level 3 (L3) Cache**: Shared multi-core cache (~40-60 clock cycles, 16MB - 64MB).\n5. **Primary RAM (DDR4 / DDR5)**: Volatile dynamic RAM requiring periodic electrical refreshing (50-100ns latency, 8GB - 64GB).\n6. **Secondary Storage (NVMe SSD / HDD)**: Persistent non-volatile flash or magnetic storage (microseconds to milliseconds, 512GB - 4TB).",
            "keyPoints": [
              "Principle of Locality (Temporal & Spatial Locality) drives cache effectiveness.",
              "SRAM (Static RAM) is used for caches because it requires no refresh cycles.",
              "DRAM (Dynamic RAM) uses tiny capacitors that must be refreshed hundreds of times per second."
            ],
            "theoryQuestions": [
              {
                "question": "Differentiate between SRAM and DRAM. Why is SRAM preferred for Cache memory?",
                "marks": "5 Marks",
                "answer": "SRAM uses 6-transistor flip-flop cells per bit, requires no refresh, and operates at multi-gigahertz speeds. DRAM uses a single transistor and capacitor per bit, making it denser and cheaper but slower due to required refresh cycles."
              }
            ],
            "mcqs": [
              {
                "question": "Which type of memory requires periodic electrical refreshing to prevent data decay?",
                "options": [
                  "SRAM",
                  "DRAM",
                  "EEPROM",
                  "Mask ROM"
                ],
                "correctIndex": 1,
                "explanation": "DRAM stores bits on tiny capacitors that leak charge over time, requiring periodic refresh cycles."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "bca102-c-programming",
    "name": "Programming in C & Problem Solving",
    "code": "BCA102",
    "color": "bg-indigo-600",
    "icon": "code",
    "semester": 1,
    "description": "Foundational procedural programming in C \u2014 Variables, Data Types, Control Structures, Functions, Arrays, Pointers, Structures, Unions, and Dynamic Memory Allocation (malloc, calloc, free).",
    "units": [
      {
        "id": "bca102-u1",
        "title": "Unit 1: C Language Basics & Control Structures",
        "description": "Compilation pipeline, token types, operators, conditional branching (if-else, switch-case), and iteration constructs.",
        "topics": [
          {
            "id": "bca102-u1-t1",
            "title": "C Compilation Pipeline (Preprocessor, Compiler, Assembler, Linker)",
            "simpleExplanation": "Translating C source code into an executable file involves four sequential stages: preprocessing macros, compiling C into assembly, assembling into binary object code, and linking external libraries.",
            "detailedExplanation": "## 1. The Four Stages of C Compilation\n\n```\n+-----------+    Preprocessor    +-----------+    Compiler     +-----------+    Assembler    +-----------+    Linker     +-----------+\n| hello.c   | ---------------> | hello.i   | ------------> | hello.s   | ------------> | hello.o   | ------------> | hello.exe |\n+-----------+   (gcc -E)       +-----------+   (gcc -S)      +-----------+   (gcc -c)      +-----------+   (gcc)       +-----------+\n```\n\n1. **Preprocessing (`cpp`)**:\n   - Expands `#include <stdio.h>` header files.\n   - Replaces `#define` constants and macros.\n   - Strips single-line `//` and block `/* */` comments.\n   - Handles conditional compilation `#ifdef / #ifndef`.\n2. **Compilation proper (`cc1`)**:\n   - Performs lexical analysis, parsing, semantic checking, and intermediate code generation.\n   - Translates preprocessed code into native CPU assembly instructions (`.s`).\n3. **Assembly (`as`)**:\n   - Converts assembly mnemonic mnemonics (`mov`, `add`, `jmp`) into machine language relocatable object binary (`.o` or `.obj`).\n4. **Linking (`ld`)**:\n   - Combines object files with system C runtime libraries (`libc.a`, `crt0.o`).\n   - Resolves unresolved external function symbols such as `printf()`.",
            "keyPoints": [
              "Preprocessing produces pure C code with all directives resolved.",
              "Linker resolves external function addresses and outputs the binary executable.",
              "The flag gcc -Wall -Wextra enforces strict warning checks."
            ],
            "theoryQuestions": [
              {
                "question": "Explain the four stages of the C compilation model with input and output file extensions.",
                "marks": "5 Marks",
                "answer": "1. Preprocessor: .c to .i (header inclusion and macro expansion). 2. Compiler: .i to .s (assembly code generation). 3. Assembler: .s to .o (machine code object file). 4. Linker: .o to executable binary (symbol resolution and library binding)."
              }
            ],
            "mcqs": [
              {
                "question": "Which stage of the C build process is responsible for expanding #include directives?",
                "options": [
                  "Preprocessor",
                  "Assembler",
                  "Linker",
                  "Loader"
                ],
                "correctIndex": 0,
                "explanation": "The C Preprocessor evaluates all hash-prefixed directives such as #include and #define before syntactic compilation begins."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "bca103-digital-logic",
    "name": "Digital Logic & Computer Design",
    "code": "BCA103",
    "color": "bg-cyan-600",
    "icon": "binary",
    "semester": 1,
    "description": "Boolean algebra, De Morgan's Laws, Karnaugh Maps (K-Maps), Combinational Circuits (Adders, Multiplexers, Encoders), and Sequential Circuits (Flip-Flops, Registers, Counters).",
    "units": [
      {
        "id": "bca103-u1",
        "title": "Unit 1: Boolean Algebra & Karnaugh Map Minimization",
        "description": "Axioms of Boolean algebra, universal NAND/NOR logic gates, SOP and POS forms, and 2/3/4-variable K-Map minimization.",
        "topics": [
          {
            "id": "bca103-u1-t1",
            "title": "De Morgan's Laws & Universal NAND/NOR Gate Implementations",
            "simpleExplanation": "De Morgan's Laws state that the complement of a product equals the sum of complements, and vice versa. NAND and NOR are universal gates because any digital circuit can be built exclusively with either gate.",
            "detailedExplanation": "## 1. De Morgan's Mathematical Theorems\n\n1. **First Theorem**:\n   $$\\overline{A \\cdot B} = \\overline{A} + \\overline{B}$$\n   *The complement of a logical AND is equivalent to the logical OR of the individual complements.*\n\n2. **Second Theorem**:\n   $$\\overline{A + B} = \\overline{A} \\cdot \\overline{B}$$\n   *The complement of a logical OR is equivalent to the logical AND of the individual complements.*\n\n## 2. Universal Gate Property\n- A gate is termed **Universal** if it can implement all three primary logic functions: NOT, AND, and OR.\n- Both **NAND** and **NOR** gates possess universality.\n\n### Implementing NOT, AND, OR using NAND Gates:\n- **NOT**: Connect both inputs of a NAND gate together: $Y = \\overline{A \\cdot A} = \\overline{A}$.\n- **AND**: Feed the output of a NAND gate into a NAND-based inverter: $Y = \\overline{\\overline{A \\cdot B}} = A \\cdot B$.\n- **OR**: Invert inputs $A$ and $B$ first, then feed into NAND: $Y = \\overline{\\overline{A} \\cdot \\overline{B}} = A + B$.",
            "keyPoints": [
              "NAND and NOR gates can implement every Boolean function without auxiliary gates.",
              "De Morgan's laws convert between SOP (Sum of Products) and POS (Product of Sums).",
              "Universal gate fabrication reduces manufacturing costs in CMOS VLSI integrated circuits."
            ],
            "theoryQuestions": [
              {
                "question": "State and prove De Morgan's Laws using truth tables. Why are NAND and NOR known as universal gates?",
                "marks": "7 Marks",
                "answer": "De Morgan's laws state (A.B)' = A' + B' and (A+B)' = A'.B'. By constructing truth tables for all 4 input combinations (00, 01, 10, 11), both sides evaluate identically. NAND and NOR are universal because they can reproduce NOT, AND, and OR gates."
              }
            ],
            "mcqs": [
              {
                "question": "How many 2-input NAND gates are required to construct a 2-input OR gate?",
                "options": [
                  "1",
                  "2",
                  "3",
                  "4"
                ],
                "correctIndex": 2,
                "explanation": "To make an OR gate, invert A using 1 NAND, invert B using 1 NAND, and pass both into a 3rd NAND gate (3 gates total)."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "bca104-math-cs",
    "name": "Mathematical Foundations of Computer Science",
    "code": "BCA104",
    "color": "bg-emerald-600",
    "icon": "calculator",
    "semester": 1,
    "description": "Discrete foundations for computation: Set Theory, Relations, Equivalence Relations, Functions (Injective, Surjective, Bijective), Matrix Algebra, Determinants, and Eigenvalues.",
    "units": [
      {
        "id": "bca104-u1",
        "title": "Unit 1: Set Theory, Relations & Matrix Operations",
        "description": "Sets, Cartesian products, equivalence relations, matrix rank, Cramer's rule, and Cayley-Hamilton theorem.",
        "topics": [
          {
            "id": "bca104-u1-t1",
            "title": "Equivalence Relations & Equivalence Classes",
            "simpleExplanation": "A relation R on a set A is an equivalence relation if it is Reflexive, Symmetric, and Transitive simultaneously. Equivalence relations partition a set into mutually disjoint equivalence classes.",
            "detailedExplanation": "## 1. Formal Definition of Equivalence Relation\n\nA binary relation $R \\subseteq A \\times A$ is an **Equivalence Relation** if and only if it satisfies three axioms:\n1. **Reflexivity**: $\\forall a \\in A, (a, a) \\in R$.\n2. **Symmetry**: $\\forall a, b \\in A, (a, b) \\in R \\implies (b, a) \\in R$.\n3. **Transitivity**: $\\forall a, b, c \\in A, [(a, b) \\in R \\land (b, c) \\in R] \\implies (a, c) \\in R$.\n\n### Equivalence Classes and Partitions\n- Let $R$ be an equivalence relation on $A$. The **equivalence class** of an element $a \\in A$ is defined as:\n  $$[a] = \\{ x \\in A \\mid (x, a) \\in R \\}$$\n- **Fundamental Theorem of Equivalence Relations**: The family of all equivalence classes forms a partition of $A$: the classes are non-empty, pairwise disjoint, and their union equals $A$.",
            "keyPoints": [
              "Equivalence relations require Reflexivity, Symmetry, and Transitivity.",
              "Equivalence classes partition a set into mutually disjoint subsets.",
              "Congruence modulo n is a classic mathematical equivalence relation on integers."
            ],
            "theoryQuestions": [
              {
                "question": "Define an Equivalence Relation. Prove that congruence modulo m is an equivalence relation on the set of integers Z.",
                "marks": "5 Marks",
                "answer": "For integers a, b, a \u2261 b (mod m) means m divides (a - b). 1. Reflexive: m divides (a - a) = 0. 2. Symmetric: if m | (a - b), then m | -(a - b) = (b - a). 3. Transitive: if m | (a - b) and m | (b - c), then m | [(a - b) + (b - c)] = (a - c)."
              }
            ],
            "mcqs": [
              {
                "question": "Which of the following is NOT a required property for a relation to be an equivalence relation?",
                "options": [
                  "Reflexive",
                  "Anti-symmetric",
                  "Symmetric",
                  "Transitive"
                ],
                "correctIndex": 1,
                "explanation": "Anti-symmetry is a property of partial order relations (POSETs), whereas equivalence relations require symmetry."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "bca105-comm-skills",
    "name": "Professional Communication & Soft Skills",
    "code": "BCA105",
    "color": "bg-teal-600",
    "icon": "message-square",
    "semester": 1,
    "description": "Essential corporate communication \u2014 7 Cs of Communication, Active Listening, Technical Email Etiquette, Resume & Cover Letter drafting, and Technical Presentations.",
    "units": [
      {
        "id": "bca105-u1",
        "title": "Unit 1: The Communication Process & The 7 Cs",
        "description": "Shannon-Weaver communication model, barriers to communication, and the 7 Cs of effective business writing.",
        "topics": [
          {
            "id": "bca105-u1-t1",
            "title": "The 7 Cs of Effective Business Communication",
            "simpleExplanation": "The 7 Cs provide a universal framework for corporate and technical communication: Clear, Concise, Concrete, Correct, Coherent, Complete, and Courteous.",
            "detailedExplanation": "## The 7 Cs Principles\n\n1. **Clarity**: State the primary objective unequivocally. Avoid ambiguous jargon.\n2. **Conciseness**: Express maximum information using minimal words without sacrificing meaning.\n3. **Concreteness**: Support statements with facts, data points, and explicit timelines.\n4. **Correctness**: Maintain grammatical accuracy, accurate terminology, and verifiable facts.\n5. **Coherence**: Ensure logical continuity where every paragraph flows naturally into the next.\n6. **Completeness**: Provide all necessary context so the receiver can act without follow-up questions.\n7. **Courtesy**: Adopt an empathetic, respectful, and constructive tone.",
            "keyPoints": [
              "7 Cs guarantee professional clarity and prevent workplace miscommunication.",
              "Noise (physical, psychological, semantic) impedes accurate message transmission.",
              "Active feedback confirms that the receiver's decoded meaning matches the sender's encoding."
            ],
            "theoryQuestions": [
              {
                "question": "Enumerate and explain the 7 Cs of effective communication with corporate examples.",
                "marks": "5 Marks",
                "answer": "The 7 Cs are Clarity, Conciseness, Concreteness, Correctness, Coherence, Completeness, and Courtesy. For example, Conciseness eliminates bloated filler words like 'due to the fact that' in favor of 'because'."
              }
            ],
            "mcqs": [
              {
                "question": "Which of the 7 Cs ensures that the message contains all facts the receiver needs for decision-making?",
                "options": [
                  "Conciseness",
                  "Completeness",
                  "Concreteness",
                  "Courtesy"
                ],
                "correctIndex": 1,
                "explanation": "Completeness ensures the recipient has all relevant information to take action without back-and-forth clarification."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "bca201-data-structures",
    "name": "Data Structures using C",
    "code": "BCA201",
    "color": "bg-purple-600",
    "icon": "database",
    "semester": 2,
    "description": "Comprehensive University BCA Syllabus for Data Structures using C \u2014 Linear and Non-Linear Data Structures: Linked Lists, Stacks, Queues, Binary Search Trees, and Graph Traversals.",
    "units": [
      {
        "id": "bca201-u1",
        "title": "Unit 1: Fundamentals & Theoretical Foundations of Data Structures using C",
        "description": "Core concepts, definitions, architectural principles, and foundational theory for Data Structures using C.",
        "topics": [
          {
            "id": "bca201-u1-t1",
            "title": "Core Principles and Architecture of Data Structures using C",
            "simpleExplanation": "This topic covers the fundamental principles, design patterns, and operational foundations of Data Structures using C required for university examinations and technical interviews.",
            "detailedExplanation": "## 1. Overview & Architectural Importance\n\nData Structures using C (BCA201) is a core subject in the Bachelor of Computer Applications curriculum. It provides essential theoretical depth and hands-on practical competence.\n\n### Key Conceptual Pillars\n1. **Theoretical Foundations**: Rigorous understanding of underlying mathematical models, protocols, and algorithm complexity.\n2. **Industry Relevance**: Real-world application in modern software engineering, web architectures, enterprise systems, and data pipelines.\n3. **Exam Focus**: Solved analytical derivations, step-by-step numerical problems, and standard university question patterns.",
            "keyPoints": [
              "Standard university curriculum mapped for Data Structures using C.",
              "Covers essential theoretical and practical examination blueprints.",
              "Includes comprehensive model answers and high-yield MCQs."
            ],
            "theoryQuestions": [
              {
                "question": "Explain the fundamental architecture and importance of Data Structures using C in modern computer applications.",
                "marks": "7 Marks",
                "answer": "Data Structures using C (BCA201) forms a foundational pillar in computer science by bridging low-level computation with high-level software abstractions. Students must understand its architectural components, lifecycle, and best practices."
              }
            ],
            "mcqs": [
              {
                "question": "Which of the following best describes the primary objective of Data Structures using C?",
                "options": [
                  "To provide systematic foundations for computing systems",
                  "Only for hardware manufacturing",
                  "Exclusively for theoretical proofs",
                  "None of the above"
                ],
                "correctIndex": 0,
                "explanation": "Data Structures using C equips students with systematic, industry-ready computational problem-solving skills."
              }
            ]
          },
          {
            "id": "bca201-u1-t2",
            "title": "Key Methodologies, Implementations & Solved Examples for Data Structures using C",
            "simpleExplanation": "Step-by-step breakdown of core algorithms, execution lifecycle, and practical problem-solving methodologies for Data Structures using C.",
            "detailedExplanation": "## Practical Implementation & Algorithmic Analysis\n\nIn this topic, we analyze real-world implementations, edge cases, and standard university numerical problems related to Data Structures using C.\n\n### Implementation Best Practices\n- Maintain clean modular structure and rigorous separation of concerns.\n- Optimize algorithmic time and space complexity.\n- Implement robust error handling and boundary validation.",
            "keyPoints": [
              "Comprehensive problem-solving methodology with step-by-step derivations.",
              "Focus on time/space complexity optimization.",
              "Standard high-yield university question pattern."
            ],
            "theoryQuestions": [
              {
                "question": "Describe the step-by-step problem-solving lifecycle used in Data Structures using C.",
                "marks": "5 Marks",
                "answer": "The methodology involves requirement analysis, mathematical or algorithmic formalization, implementation verification, boundary testing, and performance profiling."
              }
            ],
            "mcqs": [
              {
                "question": "What is the key factor when analyzing algorithms and system implementations?",
                "options": [
                  "Time and space complexity",
                  "Number of lines of comments",
                  "Font size of source code",
                  "Color scheme of IDE"
                ],
                "correctIndex": 0,
                "explanation": "Asymptotic time and space efficiency dictate the scalability and real-world viability of computing solutions."
              }
            ]
          }
        ]
      },
      {
        "id": "bca201-u2",
        "title": "Unit 2: Advanced Concepts & Industry Applications of Data Structures using C",
        "description": "In-depth analysis of advanced patterns, performance tuning, and practical applications of Data Structures using C.",
        "topics": [
          {
            "id": "bca201-u2-t1",
            "title": "Advanced Architecture, Security & Optimization in Data Structures using C",
            "simpleExplanation": "Explores advanced architectural optimizations, security controls, and enterprise-grade deployment considerations for Data Structures using C.",
            "detailedExplanation": "## Advanced Engineering & System Optimization\n\nThis unit explores high-performance paradigms, scalability strategies, fault tolerance, and security mechanisms within Data Structures using C.\n\n### Optimization Strategies\n1. **Resource Efficiency**: Minimizing memory footprint and CPU instruction count.\n2. **Concurrency & Throughput**: Safe multi-threaded or asynchronous execution.\n3. **Security Posture**: Defending against malicious inputs, buffer overflows, and unauthorized access.",
            "keyPoints": [
              "Enterprise-grade optimization and scalability techniques.",
              "Security controls and defensive coding best practices.",
              "Exam-tested analytical comparison tables."
            ],
            "theoryQuestions": [
              {
                "question": "Discuss advanced optimization techniques and security best practices relevant to Data Structures using C.",
                "marks": "7 Marks",
                "answer": "Optimization requires profiling system bottlenecks, implementing efficient caching, choosing optimal data representations, and enforcing strict input validation."
              }
            ],
            "mcqs": [
              {
                "question": "Which principle is fundamental to securing modern computing systems?",
                "options": [
                  "Principle of Least Privilege",
                  "Running all services as root",
                  "Hardcoding passwords in source files",
                  "Disabling firewall rules"
                ],
                "correctIndex": 0,
                "explanation": "The Principle of Least Privilege ensures entities operate using only the minimal permissions necessary to perform their legitimate function."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "bca202-discrete-math",
    "name": "Discrete Mathematics & Graph Theory",
    "code": "BCA202",
    "color": "bg-indigo-600",
    "icon": "network",
    "semester": 2,
    "description": "Comprehensive University BCA Syllabus for Discrete Mathematics & Graph Theory \u2014 Propositional Logic, Proof Methods, Recurrence Relations, Planar Graphs, Euler Paths, and Trees.",
    "units": [
      {
        "id": "bca202-u1",
        "title": "Unit 1: Fundamentals & Theoretical Foundations of Discrete Mathematics",
        "description": "Core concepts, definitions, architectural principles, and foundational theory for Discrete Mathematics & Graph Theory.",
        "topics": [
          {
            "id": "bca202-u1-t1",
            "title": "Core Principles and Architecture of Discrete Mathematics & Graph Theory",
            "simpleExplanation": "This topic covers the fundamental principles, design patterns, and operational foundations of Discrete Mathematics & Graph Theory required for university examinations and technical interviews.",
            "detailedExplanation": "## 1. Overview & Architectural Importance\n\nDiscrete Mathematics & Graph Theory (BCA202) is a core subject in the Bachelor of Computer Applications curriculum. It provides essential theoretical depth and hands-on practical competence.\n\n### Key Conceptual Pillars\n1. **Theoretical Foundations**: Rigorous understanding of underlying mathematical models, protocols, and algorithm complexity.\n2. **Industry Relevance**: Real-world application in modern software engineering, web architectures, enterprise systems, and data pipelines.\n3. **Exam Focus**: Solved analytical derivations, step-by-step numerical problems, and standard university question patterns.",
            "keyPoints": [
              "Standard university curriculum mapped for Discrete Mathematics & Graph Theory.",
              "Covers essential theoretical and practical examination blueprints.",
              "Includes comprehensive model answers and high-yield MCQs."
            ],
            "theoryQuestions": [
              {
                "question": "Explain the fundamental architecture and importance of Discrete Mathematics & Graph Theory in modern computer applications.",
                "marks": "7 Marks",
                "answer": "Discrete Mathematics & Graph Theory (BCA202) forms a foundational pillar in computer science by bridging low-level computation with high-level software abstractions. Students must understand its architectural components, lifecycle, and best practices."
              }
            ],
            "mcqs": [
              {
                "question": "Which of the following best describes the primary objective of Discrete Mathematics & Graph Theory?",
                "options": [
                  "To provide systematic foundations for computing systems",
                  "Only for hardware manufacturing",
                  "Exclusively for theoretical proofs",
                  "None of the above"
                ],
                "correctIndex": 0,
                "explanation": "Discrete Mathematics & Graph Theory equips students with systematic, industry-ready computational problem-solving skills."
              }
            ]
          },
          {
            "id": "bca202-u1-t2",
            "title": "Key Methodologies, Implementations & Solved Examples for Discrete Mathematics & Graph Theory",
            "simpleExplanation": "Step-by-step breakdown of core algorithms, execution lifecycle, and practical problem-solving methodologies for Discrete Mathematics & Graph Theory.",
            "detailedExplanation": "## Practical Implementation & Algorithmic Analysis\n\nIn this topic, we analyze real-world implementations, edge cases, and standard university numerical problems related to Discrete Mathematics & Graph Theory.\n\n### Implementation Best Practices\n- Maintain clean modular structure and rigorous separation of concerns.\n- Optimize algorithmic time and space complexity.\n- Implement robust error handling and boundary validation.",
            "keyPoints": [
              "Comprehensive problem-solving methodology with step-by-step derivations.",
              "Focus on time/space complexity optimization.",
              "Standard high-yield university question pattern."
            ],
            "theoryQuestions": [
              {
                "question": "Describe the step-by-step problem-solving lifecycle used in Discrete Mathematics & Graph Theory.",
                "marks": "5 Marks",
                "answer": "The methodology involves requirement analysis, mathematical or algorithmic formalization, implementation verification, boundary testing, and performance profiling."
              }
            ],
            "mcqs": [
              {
                "question": "What is the key factor when analyzing algorithms and system implementations?",
                "options": [
                  "Time and space complexity",
                  "Number of lines of comments",
                  "Font size of source code",
                  "Color scheme of IDE"
                ],
                "correctIndex": 0,
                "explanation": "Asymptotic time and space efficiency dictate the scalability and real-world viability of computing solutions."
              }
            ]
          }
        ]
      },
      {
        "id": "bca202-u2",
        "title": "Unit 2: Advanced Concepts & Industry Applications of Discrete Mathematics",
        "description": "In-depth analysis of advanced patterns, performance tuning, and practical applications of Discrete Mathematics & Graph Theory.",
        "topics": [
          {
            "id": "bca202-u2-t1",
            "title": "Advanced Architecture, Security & Optimization in Discrete Mathematics & Graph Theory",
            "simpleExplanation": "Explores advanced architectural optimizations, security controls, and enterprise-grade deployment considerations for Discrete Mathematics & Graph Theory.",
            "detailedExplanation": "## Advanced Engineering & System Optimization\n\nThis unit explores high-performance paradigms, scalability strategies, fault tolerance, and security mechanisms within Discrete Mathematics & Graph Theory.\n\n### Optimization Strategies\n1. **Resource Efficiency**: Minimizing memory footprint and CPU instruction count.\n2. **Concurrency & Throughput**: Safe multi-threaded or asynchronous execution.\n3. **Security Posture**: Defending against malicious inputs, buffer overflows, and unauthorized access.",
            "keyPoints": [
              "Enterprise-grade optimization and scalability techniques.",
              "Security controls and defensive coding best practices.",
              "Exam-tested analytical comparison tables."
            ],
            "theoryQuestions": [
              {
                "question": "Discuss advanced optimization techniques and security best practices relevant to Discrete Mathematics & Graph Theory.",
                "marks": "7 Marks",
                "answer": "Optimization requires profiling system bottlenecks, implementing efficient caching, choosing optimal data representations, and enforcing strict input validation."
              }
            ],
            "mcqs": [
              {
                "question": "Which principle is fundamental to securing modern computing systems?",
                "options": [
                  "Principle of Least Privilege",
                  "Running all services as root",
                  "Hardcoding passwords in source files",
                  "Disabling firewall rules"
                ],
                "correctIndex": 0,
                "explanation": "The Principle of Least Privilege ensures entities operate using only the minimal permissions necessary to perform their legitimate function."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "bca203-web-technologies",
    "name": "Web Technologies (HTML5, CSS3, JS)",
    "code": "BCA203",
    "color": "bg-orange-600",
    "icon": "globe",
    "semester": 2,
    "description": "Comprehensive University BCA Syllabus for Web Technologies (HTML5, CSS3, JS) \u2014 Modern responsive web development: Semantic HTML5, CSS Flexbox/Grid, ES6+ JavaScript, DOM APIs, and Async Fetch.",
    "units": [
      {
        "id": "bca203-u1",
        "title": "Unit 1: Fundamentals & Theoretical Foundations of Web Technologies",
        "description": "Core concepts, definitions, architectural principles, and foundational theory for Web Technologies (HTML5, CSS3, JS).",
        "topics": [
          {
            "id": "bca203-u1-t1",
            "title": "Core Principles and Architecture of Web Technologies",
            "simpleExplanation": "This topic covers the fundamental principles, design patterns, and operational foundations of Web Technologies (HTML5, CSS3, JS) required for university examinations and technical interviews.",
            "detailedExplanation": "## 1. Overview & Architectural Importance\n\nWeb Technologies (HTML5, CSS3, JS) (BCA203) is a core subject in the Bachelor of Computer Applications curriculum. It provides essential theoretical depth and hands-on practical competence.\n\n### Key Conceptual Pillars\n1. **Theoretical Foundations**: Rigorous understanding of underlying mathematical models, protocols, and algorithm complexity.\n2. **Industry Relevance**: Real-world application in modern software engineering, web architectures, enterprise systems, and data pipelines.\n3. **Exam Focus**: Solved analytical derivations, step-by-step numerical problems, and standard university question patterns.",
            "keyPoints": [
              "Standard university curriculum mapped for Web Technologies (HTML5, CSS3, JS).",
              "Covers essential theoretical and practical examination blueprints.",
              "Includes comprehensive model answers and high-yield MCQs."
            ],
            "theoryQuestions": [
              {
                "question": "Explain the fundamental architecture and importance of Web Technologies (HTML5, CSS3, JS) in modern computer applications.",
                "marks": "7 Marks",
                "answer": "Web Technologies (HTML5, CSS3, JS) (BCA203) forms a foundational pillar in computer science by bridging low-level computation with high-level software abstractions. Students must understand its architectural components, lifecycle, and best practices."
              }
            ],
            "mcqs": [
              {
                "question": "Which of the following best describes the primary objective of Web Technologies (HTML5, CSS3, JS)?",
                "options": [
                  "To provide systematic foundations for computing systems",
                  "Only for hardware manufacturing",
                  "Exclusively for theoretical proofs",
                  "None of the above"
                ],
                "correctIndex": 0,
                "explanation": "Web Technologies (HTML5, CSS3, JS) equips students with systematic, industry-ready computational problem-solving skills."
              }
            ]
          },
          {
            "id": "bca203-u1-t2",
            "title": "Key Methodologies, Implementations & Solved Examples for Web Technologies",
            "simpleExplanation": "Step-by-step breakdown of core algorithms, execution lifecycle, and practical problem-solving methodologies for Web Technologies (HTML5, CSS3, JS).",
            "detailedExplanation": "## Practical Implementation & Algorithmic Analysis\n\nIn this topic, we analyze real-world implementations, edge cases, and standard university numerical problems related to Web Technologies (HTML5, CSS3, JS).\n\n### Implementation Best Practices\n- Maintain clean modular structure and rigorous separation of concerns.\n- Optimize algorithmic time and space complexity.\n- Implement robust error handling and boundary validation.",
            "keyPoints": [
              "Comprehensive problem-solving methodology with step-by-step derivations.",
              "Focus on time/space complexity optimization.",
              "Standard high-yield university question pattern."
            ],
            "theoryQuestions": [
              {
                "question": "Describe the step-by-step problem-solving lifecycle used in Web Technologies (HTML5, CSS3, JS).",
                "marks": "5 Marks",
                "answer": "The methodology involves requirement analysis, mathematical or algorithmic formalization, implementation verification, boundary testing, and performance profiling."
              }
            ],
            "mcqs": [
              {
                "question": "What is the key factor when analyzing algorithms and system implementations?",
                "options": [
                  "Time and space complexity",
                  "Number of lines of comments",
                  "Font size of source code",
                  "Color scheme of IDE"
                ],
                "correctIndex": 0,
                "explanation": "Asymptotic time and space efficiency dictate the scalability and real-world viability of computing solutions."
              }
            ]
          }
        ]
      },
      {
        "id": "bca203-u2",
        "title": "Unit 2: Advanced Concepts & Industry Applications of Web Technologies",
        "description": "In-depth analysis of advanced patterns, performance tuning, and practical applications of Web Technologies (HTML5, CSS3, JS).",
        "topics": [
          {
            "id": "bca203-u2-t1",
            "title": "Advanced Architecture, Security & Optimization in Web Technologies",
            "simpleExplanation": "Explores advanced architectural optimizations, security controls, and enterprise-grade deployment considerations for Web Technologies (HTML5, CSS3, JS).",
            "detailedExplanation": "## Advanced Engineering & System Optimization\n\nThis unit explores high-performance paradigms, scalability strategies, fault tolerance, and security mechanisms within Web Technologies (HTML5, CSS3, JS).\n\n### Optimization Strategies\n1. **Resource Efficiency**: Minimizing memory footprint and CPU instruction count.\n2. **Concurrency & Throughput**: Safe multi-threaded or asynchronous execution.\n3. **Security Posture**: Defending against malicious inputs, buffer overflows, and unauthorized access.",
            "keyPoints": [
              "Enterprise-grade optimization and scalability techniques.",
              "Security controls and defensive coding best practices.",
              "Exam-tested analytical comparison tables."
            ],
            "theoryQuestions": [
              {
                "question": "Discuss advanced optimization techniques and security best practices relevant to Web Technologies (HTML5, CSS3, JS).",
                "marks": "7 Marks",
                "answer": "Optimization requires profiling system bottlenecks, implementing efficient caching, choosing optimal data representations, and enforcing strict input validation."
              }
            ],
            "mcqs": [
              {
                "question": "Which principle is fundamental to securing modern computing systems?",
                "options": [
                  "Principle of Least Privilege",
                  "Running all services as root",
                  "Hardcoding passwords in source files",
                  "Disabling firewall rules"
                ],
                "correctIndex": 0,
                "explanation": "The Principle of Least Privilege ensures entities operate using only the minimal permissions necessary to perform their legitimate function."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "bca204-dbms-sql",
    "name": "Database Management Systems & SQL",
    "code": "BCA204",
    "color": "bg-amber-600",
    "icon": "server",
    "semester": 2,
    "description": "Comprehensive University BCA Syllabus for Database Management Systems & SQL \u2014 Relational Database Design, ER Modeling, Normalization (1NF to BCNF), Complex SQL Joins, and ACID Transactions.",
    "units": [
      {
        "id": "bca204-u1",
        "title": "Unit 1: Fundamentals & Theoretical Foundations of Database Management Systems",
        "description": "Core concepts, definitions, architectural principles, and foundational theory for Database Management Systems & SQL.",
        "topics": [
          {
            "id": "bca204-u1-t1",
            "title": "Core Principles and Architecture of Database Management Systems & SQL",
            "simpleExplanation": "This topic covers the fundamental principles, design patterns, and operational foundations of Database Management Systems & SQL required for university examinations and technical interviews.",
            "detailedExplanation": "## 1. Overview & Architectural Importance\n\nDatabase Management Systems & SQL (BCA204) is a core subject in the Bachelor of Computer Applications curriculum. It provides essential theoretical depth and hands-on practical competence.\n\n### Key Conceptual Pillars\n1. **Theoretical Foundations**: Rigorous understanding of underlying mathematical models, protocols, and algorithm complexity.\n2. **Industry Relevance**: Real-world application in modern software engineering, web architectures, enterprise systems, and data pipelines.\n3. **Exam Focus**: Solved analytical derivations, step-by-step numerical problems, and standard university question patterns.",
            "keyPoints": [
              "Standard university curriculum mapped for Database Management Systems & SQL.",
              "Covers essential theoretical and practical examination blueprints.",
              "Includes comprehensive model answers and high-yield MCQs."
            ],
            "theoryQuestions": [
              {
                "question": "Explain the fundamental architecture and importance of Database Management Systems & SQL in modern computer applications.",
                "marks": "7 Marks",
                "answer": "Database Management Systems & SQL (BCA204) forms a foundational pillar in computer science by bridging low-level computation with high-level software abstractions. Students must understand its architectural components, lifecycle, and best practices."
              }
            ],
            "mcqs": [
              {
                "question": "Which of the following best describes the primary objective of Database Management Systems & SQL?",
                "options": [
                  "To provide systematic foundations for computing systems",
                  "Only for hardware manufacturing",
                  "Exclusively for theoretical proofs",
                  "None of the above"
                ],
                "correctIndex": 0,
                "explanation": "Database Management Systems & SQL equips students with systematic, industry-ready computational problem-solving skills."
              }
            ]
          },
          {
            "id": "bca204-u1-t2",
            "title": "Key Methodologies, Implementations & Solved Examples for Database Management Systems & SQL",
            "simpleExplanation": "Step-by-step breakdown of core algorithms, execution lifecycle, and practical problem-solving methodologies for Database Management Systems & SQL.",
            "detailedExplanation": "## Practical Implementation & Algorithmic Analysis\n\nIn this topic, we analyze real-world implementations, edge cases, and standard university numerical problems related to Database Management Systems & SQL.\n\n### Implementation Best Practices\n- Maintain clean modular structure and rigorous separation of concerns.\n- Optimize algorithmic time and space complexity.\n- Implement robust error handling and boundary validation.",
            "keyPoints": [
              "Comprehensive problem-solving methodology with step-by-step derivations.",
              "Focus on time/space complexity optimization.",
              "Standard high-yield university question pattern."
            ],
            "theoryQuestions": [
              {
                "question": "Describe the step-by-step problem-solving lifecycle used in Database Management Systems & SQL.",
                "marks": "5 Marks",
                "answer": "The methodology involves requirement analysis, mathematical or algorithmic formalization, implementation verification, boundary testing, and performance profiling."
              }
            ],
            "mcqs": [
              {
                "question": "What is the key factor when analyzing algorithms and system implementations?",
                "options": [
                  "Time and space complexity",
                  "Number of lines of comments",
                  "Font size of source code",
                  "Color scheme of IDE"
                ],
                "correctIndex": 0,
                "explanation": "Asymptotic time and space efficiency dictate the scalability and real-world viability of computing solutions."
              }
            ]
          }
        ]
      },
      {
        "id": "bca204-u2",
        "title": "Unit 2: Advanced Concepts & Industry Applications of Database Management Systems",
        "description": "In-depth analysis of advanced patterns, performance tuning, and practical applications of Database Management Systems & SQL.",
        "topics": [
          {
            "id": "bca204-u2-t1",
            "title": "Advanced Architecture, Security & Optimization in Database Management Systems & SQL",
            "simpleExplanation": "Explores advanced architectural optimizations, security controls, and enterprise-grade deployment considerations for Database Management Systems & SQL.",
            "detailedExplanation": "## Advanced Engineering & System Optimization\n\nThis unit explores high-performance paradigms, scalability strategies, fault tolerance, and security mechanisms within Database Management Systems & SQL.\n\n### Optimization Strategies\n1. **Resource Efficiency**: Minimizing memory footprint and CPU instruction count.\n2. **Concurrency & Throughput**: Safe multi-threaded or asynchronous execution.\n3. **Security Posture**: Defending against malicious inputs, buffer overflows, and unauthorized access.",
            "keyPoints": [
              "Enterprise-grade optimization and scalability techniques.",
              "Security controls and defensive coding best practices.",
              "Exam-tested analytical comparison tables."
            ],
            "theoryQuestions": [
              {
                "question": "Discuss advanced optimization techniques and security best practices relevant to Database Management Systems & SQL.",
                "marks": "7 Marks",
                "answer": "Optimization requires profiling system bottlenecks, implementing efficient caching, choosing optimal data representations, and enforcing strict input validation."
              }
            ],
            "mcqs": [
              {
                "question": "Which principle is fundamental to securing modern computing systems?",
                "options": [
                  "Principle of Least Privilege",
                  "Running all services as root",
                  "Hardcoding passwords in source files",
                  "Disabling firewall rules"
                ],
                "correctIndex": 0,
                "explanation": "The Principle of Least Privilege ensures entities operate using only the minimal permissions necessary to perform their legitimate function."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "bca205-cyber-ethics",
    "name": "Cyber Ethics & Environmental Studies",
    "code": "BCA205",
    "color": "bg-emerald-600",
    "icon": "shield",
    "semester": 2,
    "description": "Comprehensive University BCA Syllabus for Cyber Ethics & Environmental Studies \u2014 IT Act 2000, Intellectual Property Rights, Cyber Crimes, E-Waste Management, and Sustainable IT practices.",
    "units": [
      {
        "id": "bca205-u1",
        "title": "Unit 1: Fundamentals & Theoretical Foundations of Cyber Ethics",
        "description": "Core concepts, definitions, architectural principles, and foundational theory for Cyber Ethics & Environmental Studies.",
        "topics": [
          {
            "id": "bca205-u1-t1",
            "title": "Core Principles and Architecture of Cyber Ethics & Environmental Studies",
            "simpleExplanation": "This topic covers the fundamental principles, design patterns, and operational foundations of Cyber Ethics & Environmental Studies required for university examinations and technical interviews.",
            "detailedExplanation": "## 1. Overview & Architectural Importance\n\nCyber Ethics & Environmental Studies (BCA205) is a core subject in the Bachelor of Computer Applications curriculum. It provides essential theoretical depth and hands-on practical competence.\n\n### Key Conceptual Pillars\n1. **Theoretical Foundations**: Rigorous understanding of underlying mathematical models, protocols, and algorithm complexity.\n2. **Industry Relevance**: Real-world application in modern software engineering, web architectures, enterprise systems, and data pipelines.\n3. **Exam Focus**: Solved analytical derivations, step-by-step numerical problems, and standard university question patterns.",
            "keyPoints": [
              "Standard university curriculum mapped for Cyber Ethics & Environmental Studies.",
              "Covers essential theoretical and practical examination blueprints.",
              "Includes comprehensive model answers and high-yield MCQs."
            ],
            "theoryQuestions": [
              {
                "question": "Explain the fundamental architecture and importance of Cyber Ethics & Environmental Studies in modern computer applications.",
                "marks": "7 Marks",
                "answer": "Cyber Ethics & Environmental Studies (BCA205) forms a foundational pillar in computer science by bridging low-level computation with high-level software abstractions. Students must understand its architectural components, lifecycle, and best practices."
              }
            ],
            "mcqs": [
              {
                "question": "Which of the following best describes the primary objective of Cyber Ethics & Environmental Studies?",
                "options": [
                  "To provide systematic foundations for computing systems",
                  "Only for hardware manufacturing",
                  "Exclusively for theoretical proofs",
                  "None of the above"
                ],
                "correctIndex": 0,
                "explanation": "Cyber Ethics & Environmental Studies equips students with systematic, industry-ready computational problem-solving skills."
              }
            ]
          },
          {
            "id": "bca205-u1-t2",
            "title": "Key Methodologies, Implementations & Solved Examples for Cyber Ethics & Environmental Studies",
            "simpleExplanation": "Step-by-step breakdown of core algorithms, execution lifecycle, and practical problem-solving methodologies for Cyber Ethics & Environmental Studies.",
            "detailedExplanation": "## Practical Implementation & Algorithmic Analysis\n\nIn this topic, we analyze real-world implementations, edge cases, and standard university numerical problems related to Cyber Ethics & Environmental Studies.\n\n### Implementation Best Practices\n- Maintain clean modular structure and rigorous separation of concerns.\n- Optimize algorithmic time and space complexity.\n- Implement robust error handling and boundary validation.",
            "keyPoints": [
              "Comprehensive problem-solving methodology with step-by-step derivations.",
              "Focus on time/space complexity optimization.",
              "Standard high-yield university question pattern."
            ],
            "theoryQuestions": [
              {
                "question": "Describe the step-by-step problem-solving lifecycle used in Cyber Ethics & Environmental Studies.",
                "marks": "5 Marks",
                "answer": "The methodology involves requirement analysis, mathematical or algorithmic formalization, implementation verification, boundary testing, and performance profiling."
              }
            ],
            "mcqs": [
              {
                "question": "What is the key factor when analyzing algorithms and system implementations?",
                "options": [
                  "Time and space complexity",
                  "Number of lines of comments",
                  "Font size of source code",
                  "Color scheme of IDE"
                ],
                "correctIndex": 0,
                "explanation": "Asymptotic time and space efficiency dictate the scalability and real-world viability of computing solutions."
              }
            ]
          }
        ]
      },
      {
        "id": "bca205-u2",
        "title": "Unit 2: Advanced Concepts & Industry Applications of Cyber Ethics",
        "description": "In-depth analysis of advanced patterns, performance tuning, and practical applications of Cyber Ethics & Environmental Studies.",
        "topics": [
          {
            "id": "bca205-u2-t1",
            "title": "Advanced Architecture, Security & Optimization in Cyber Ethics & Environmental Studies",
            "simpleExplanation": "Explores advanced architectural optimizations, security controls, and enterprise-grade deployment considerations for Cyber Ethics & Environmental Studies.",
            "detailedExplanation": "## Advanced Engineering & System Optimization\n\nThis unit explores high-performance paradigms, scalability strategies, fault tolerance, and security mechanisms within Cyber Ethics & Environmental Studies.\n\n### Optimization Strategies\n1. **Resource Efficiency**: Minimizing memory footprint and CPU instruction count.\n2. **Concurrency & Throughput**: Safe multi-threaded or asynchronous execution.\n3. **Security Posture**: Defending against malicious inputs, buffer overflows, and unauthorized access.",
            "keyPoints": [
              "Enterprise-grade optimization and scalability techniques.",
              "Security controls and defensive coding best practices.",
              "Exam-tested analytical comparison tables."
            ],
            "theoryQuestions": [
              {
                "question": "Discuss advanced optimization techniques and security best practices relevant to Cyber Ethics & Environmental Studies.",
                "marks": "7 Marks",
                "answer": "Optimization requires profiling system bottlenecks, implementing efficient caching, choosing optimal data representations, and enforcing strict input validation."
              }
            ],
            "mcqs": [
              {
                "question": "Which principle is fundamental to securing modern computing systems?",
                "options": [
                  "Principle of Least Privilege",
                  "Running all services as root",
                  "Hardcoding passwords in source files",
                  "Disabling firewall rules"
                ],
                "correctIndex": 0,
                "explanation": "The Principle of Least Privilege ensures entities operate using only the minimal permissions necessary to perform their legitimate function."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "bca301-cpp-oops",
    "name": "Object-Oriented Programming with C++",
    "code": "BCA301",
    "color": "bg-blue-600",
    "icon": "code",
    "semester": 3,
    "description": "Comprehensive University BCA Syllabus for Object-Oriented Programming with C++ \u2014 Core OOP: Classes, Encapsulation, Constructors/Destructors, Inheritance, Polymorphism, Virtual Functions, and STL.",
    "units": [
      {
        "id": "bca301-u1",
        "title": "Unit 1: Fundamentals & Theoretical Foundations of Object-Oriented Programming with C++",
        "description": "Core concepts, definitions, architectural principles, and foundational theory for Object-Oriented Programming with C++.",
        "topics": [
          {
            "id": "bca301-u1-t1",
            "title": "Core Principles and Architecture of Object-Oriented Programming with C++",
            "simpleExplanation": "This topic covers the fundamental principles, design patterns, and operational foundations of Object-Oriented Programming with C++ required for university examinations and technical interviews.",
            "detailedExplanation": "## 1. Overview & Architectural Importance\n\nObject-Oriented Programming with C++ (BCA301) is a core subject in the Bachelor of Computer Applications curriculum. It provides essential theoretical depth and hands-on practical competence.\n\n### Key Conceptual Pillars\n1. **Theoretical Foundations**: Rigorous understanding of underlying mathematical models, protocols, and algorithm complexity.\n2. **Industry Relevance**: Real-world application in modern software engineering, web architectures, enterprise systems, and data pipelines.\n3. **Exam Focus**: Solved analytical derivations, step-by-step numerical problems, and standard university question patterns.",
            "keyPoints": [
              "Standard university curriculum mapped for Object-Oriented Programming with C++.",
              "Covers essential theoretical and practical examination blueprints.",
              "Includes comprehensive model answers and high-yield MCQs."
            ],
            "theoryQuestions": [
              {
                "question": "Explain the fundamental architecture and importance of Object-Oriented Programming with C++ in modern computer applications.",
                "marks": "7 Marks",
                "answer": "Object-Oriented Programming with C++ (BCA301) forms a foundational pillar in computer science by bridging low-level computation with high-level software abstractions. Students must understand its architectural components, lifecycle, and best practices."
              }
            ],
            "mcqs": [
              {
                "question": "Which of the following best describes the primary objective of Object-Oriented Programming with C++?",
                "options": [
                  "To provide systematic foundations for computing systems",
                  "Only for hardware manufacturing",
                  "Exclusively for theoretical proofs",
                  "None of the above"
                ],
                "correctIndex": 0,
                "explanation": "Object-Oriented Programming with C++ equips students with systematic, industry-ready computational problem-solving skills."
              }
            ]
          },
          {
            "id": "bca301-u1-t2",
            "title": "Key Methodologies, Implementations & Solved Examples for Object-Oriented Programming with C++",
            "simpleExplanation": "Step-by-step breakdown of core algorithms, execution lifecycle, and practical problem-solving methodologies for Object-Oriented Programming with C++.",
            "detailedExplanation": "## Practical Implementation & Algorithmic Analysis\n\nIn this topic, we analyze real-world implementations, edge cases, and standard university numerical problems related to Object-Oriented Programming with C++.\n\n### Implementation Best Practices\n- Maintain clean modular structure and rigorous separation of concerns.\n- Optimize algorithmic time and space complexity.\n- Implement robust error handling and boundary validation.",
            "keyPoints": [
              "Comprehensive problem-solving methodology with step-by-step derivations.",
              "Focus on time/space complexity optimization.",
              "Standard high-yield university question pattern."
            ],
            "theoryQuestions": [
              {
                "question": "Describe the step-by-step problem-solving lifecycle used in Object-Oriented Programming with C++.",
                "marks": "5 Marks",
                "answer": "The methodology involves requirement analysis, mathematical or algorithmic formalization, implementation verification, boundary testing, and performance profiling."
              }
            ],
            "mcqs": [
              {
                "question": "What is the key factor when analyzing algorithms and system implementations?",
                "options": [
                  "Time and space complexity",
                  "Number of lines of comments",
                  "Font size of source code",
                  "Color scheme of IDE"
                ],
                "correctIndex": 0,
                "explanation": "Asymptotic time and space efficiency dictate the scalability and real-world viability of computing solutions."
              }
            ]
          }
        ]
      },
      {
        "id": "bca301-u2",
        "title": "Unit 2: Advanced Concepts & Industry Applications of Object-Oriented Programming with C++",
        "description": "In-depth analysis of advanced patterns, performance tuning, and practical applications of Object-Oriented Programming with C++.",
        "topics": [
          {
            "id": "bca301-u2-t1",
            "title": "Advanced Architecture, Security & Optimization in Object-Oriented Programming with C++",
            "simpleExplanation": "Explores advanced architectural optimizations, security controls, and enterprise-grade deployment considerations for Object-Oriented Programming with C++.",
            "detailedExplanation": "## Advanced Engineering & System Optimization\n\nThis unit explores high-performance paradigms, scalability strategies, fault tolerance, and security mechanisms within Object-Oriented Programming with C++.\n\n### Optimization Strategies\n1. **Resource Efficiency**: Minimizing memory footprint and CPU instruction count.\n2. **Concurrency & Throughput**: Safe multi-threaded or asynchronous execution.\n3. **Security Posture**: Defending against malicious inputs, buffer overflows, and unauthorized access.",
            "keyPoints": [
              "Enterprise-grade optimization and scalability techniques.",
              "Security controls and defensive coding best practices.",
              "Exam-tested analytical comparison tables."
            ],
            "theoryQuestions": [
              {
                "question": "Discuss advanced optimization techniques and security best practices relevant to Object-Oriented Programming with C++.",
                "marks": "7 Marks",
                "answer": "Optimization requires profiling system bottlenecks, implementing efficient caching, choosing optimal data representations, and enforcing strict input validation."
              }
            ],
            "mcqs": [
              {
                "question": "Which principle is fundamental to securing modern computing systems?",
                "options": [
                  "Principle of Least Privilege",
                  "Running all services as root",
                  "Hardcoding passwords in source files",
                  "Disabling firewall rules"
                ],
                "correctIndex": 0,
                "explanation": "The Principle of Least Privilege ensures entities operate using only the minimal permissions necessary to perform their legitimate function."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "bca302-os-concepts",
    "name": "Operating System Principles & Linux",
    "code": "BCA302",
    "color": "bg-cyan-600",
    "icon": "terminal",
    "semester": 3,
    "description": "Comprehensive University BCA Syllabus for Operating System Principles & Linux \u2014 Process Scheduling, CPU Algorithms, Semaphores, Banker's Deadlock Avoidance, Paging, Virtual Memory, and Bash Scripting.",
    "units": [
      {
        "id": "bca302-u1",
        "title": "Unit 1: Fundamentals & Theoretical Foundations of Operating System Principles",
        "description": "Core concepts, definitions, architectural principles, and foundational theory for Operating System Principles & Linux.",
        "topics": [
          {
            "id": "bca302-u1-t1",
            "title": "Core Principles and Architecture of Operating System Principles & Linux",
            "simpleExplanation": "This topic covers the fundamental principles, design patterns, and operational foundations of Operating System Principles & Linux required for university examinations and technical interviews.",
            "detailedExplanation": "## 1. Overview & Architectural Importance\n\nOperating System Principles & Linux (BCA302) is a core subject in the Bachelor of Computer Applications curriculum. It provides essential theoretical depth and hands-on practical competence.\n\n### Key Conceptual Pillars\n1. **Theoretical Foundations**: Rigorous understanding of underlying mathematical models, protocols, and algorithm complexity.\n2. **Industry Relevance**: Real-world application in modern software engineering, web architectures, enterprise systems, and data pipelines.\n3. **Exam Focus**: Solved analytical derivations, step-by-step numerical problems, and standard university question patterns.",
            "keyPoints": [
              "Standard university curriculum mapped for Operating System Principles & Linux.",
              "Covers essential theoretical and practical examination blueprints.",
              "Includes comprehensive model answers and high-yield MCQs."
            ],
            "theoryQuestions": [
              {
                "question": "Explain the fundamental architecture and importance of Operating System Principles & Linux in modern computer applications.",
                "marks": "7 Marks",
                "answer": "Operating System Principles & Linux (BCA302) forms a foundational pillar in computer science by bridging low-level computation with high-level software abstractions. Students must understand its architectural components, lifecycle, and best practices."
              }
            ],
            "mcqs": [
              {
                "question": "Which of the following best describes the primary objective of Operating System Principles & Linux?",
                "options": [
                  "To provide systematic foundations for computing systems",
                  "Only for hardware manufacturing",
                  "Exclusively for theoretical proofs",
                  "None of the above"
                ],
                "correctIndex": 0,
                "explanation": "Operating System Principles & Linux equips students with systematic, industry-ready computational problem-solving skills."
              }
            ]
          },
          {
            "id": "bca302-u1-t2",
            "title": "Key Methodologies, Implementations & Solved Examples for Operating System Principles & Linux",
            "simpleExplanation": "Step-by-step breakdown of core algorithms, execution lifecycle, and practical problem-solving methodologies for Operating System Principles & Linux.",
            "detailedExplanation": "## Practical Implementation & Algorithmic Analysis\n\nIn this topic, we analyze real-world implementations, edge cases, and standard university numerical problems related to Operating System Principles & Linux.\n\n### Implementation Best Practices\n- Maintain clean modular structure and rigorous separation of concerns.\n- Optimize algorithmic time and space complexity.\n- Implement robust error handling and boundary validation.",
            "keyPoints": [
              "Comprehensive problem-solving methodology with step-by-step derivations.",
              "Focus on time/space complexity optimization.",
              "Standard high-yield university question pattern."
            ],
            "theoryQuestions": [
              {
                "question": "Describe the step-by-step problem-solving lifecycle used in Operating System Principles & Linux.",
                "marks": "5 Marks",
                "answer": "The methodology involves requirement analysis, mathematical or algorithmic formalization, implementation verification, boundary testing, and performance profiling."
              }
            ],
            "mcqs": [
              {
                "question": "What is the key factor when analyzing algorithms and system implementations?",
                "options": [
                  "Time and space complexity",
                  "Number of lines of comments",
                  "Font size of source code",
                  "Color scheme of IDE"
                ],
                "correctIndex": 0,
                "explanation": "Asymptotic time and space efficiency dictate the scalability and real-world viability of computing solutions."
              }
            ]
          }
        ]
      },
      {
        "id": "bca302-u2",
        "title": "Unit 2: Advanced Concepts & Industry Applications of Operating System Principles",
        "description": "In-depth analysis of advanced patterns, performance tuning, and practical applications of Operating System Principles & Linux.",
        "topics": [
          {
            "id": "bca302-u2-t1",
            "title": "Advanced Architecture, Security & Optimization in Operating System Principles & Linux",
            "simpleExplanation": "Explores advanced architectural optimizations, security controls, and enterprise-grade deployment considerations for Operating System Principles & Linux.",
            "detailedExplanation": "## Advanced Engineering & System Optimization\n\nThis unit explores high-performance paradigms, scalability strategies, fault tolerance, and security mechanisms within Operating System Principles & Linux.\n\n### Optimization Strategies\n1. **Resource Efficiency**: Minimizing memory footprint and CPU instruction count.\n2. **Concurrency & Throughput**: Safe multi-threaded or asynchronous execution.\n3. **Security Posture**: Defending against malicious inputs, buffer overflows, and unauthorized access.",
            "keyPoints": [
              "Enterprise-grade optimization and scalability techniques.",
              "Security controls and defensive coding best practices.",
              "Exam-tested analytical comparison tables."
            ],
            "theoryQuestions": [
              {
                "question": "Discuss advanced optimization techniques and security best practices relevant to Operating System Principles & Linux.",
                "marks": "7 Marks",
                "answer": "Optimization requires profiling system bottlenecks, implementing efficient caching, choosing optimal data representations, and enforcing strict input validation."
              }
            ],
            "mcqs": [
              {
                "question": "Which principle is fundamental to securing modern computing systems?",
                "options": [
                  "Principle of Least Privilege",
                  "Running all services as root",
                  "Hardcoding passwords in source files",
                  "Disabling firewall rules"
                ],
                "correctIndex": 0,
                "explanation": "The Principle of Least Privilege ensures entities operate using only the minimal permissions necessary to perform their legitimate function."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "bca303-coa",
    "name": "Computer Organization & Architecture",
    "code": "BCA303",
    "color": "bg-rose-600",
    "icon": "cpu",
    "semester": 3,
    "description": "Comprehensive University BCA Syllabus for Computer Organization & Architecture \u2014 Register Transfer Logic, ALU, Microprogrammed Control, 8085 Microprocessor Pinout, Addressing Modes, and DMA I/O.",
    "units": [
      {
        "id": "bca303-u1",
        "title": "Unit 1: Fundamentals & Theoretical Foundations of Computer Organization",
        "description": "Core concepts, definitions, architectural principles, and foundational theory for Computer Organization & Architecture.",
        "topics": [
          {
            "id": "bca303-u1-t1",
            "title": "Core Principles and Architecture of Computer Organization & Architecture",
            "simpleExplanation": "This topic covers the fundamental principles, design patterns, and operational foundations of Computer Organization & Architecture required for university examinations and technical interviews.",
            "detailedExplanation": "## 1. Overview & Architectural Importance\n\nComputer Organization & Architecture (BCA303) is a core subject in the Bachelor of Computer Applications curriculum. It provides essential theoretical depth and hands-on practical competence.\n\n### Key Conceptual Pillars\n1. **Theoretical Foundations**: Rigorous understanding of underlying mathematical models, protocols, and algorithm complexity.\n2. **Industry Relevance**: Real-world application in modern software engineering, web architectures, enterprise systems, and data pipelines.\n3. **Exam Focus**: Solved analytical derivations, step-by-step numerical problems, and standard university question patterns.",
            "keyPoints": [
              "Standard university curriculum mapped for Computer Organization & Architecture.",
              "Covers essential theoretical and practical examination blueprints.",
              "Includes comprehensive model answers and high-yield MCQs."
            ],
            "theoryQuestions": [
              {
                "question": "Explain the fundamental architecture and importance of Computer Organization & Architecture in modern computer applications.",
                "marks": "7 Marks",
                "answer": "Computer Organization & Architecture (BCA303) forms a foundational pillar in computer science by bridging low-level computation with high-level software abstractions. Students must understand its architectural components, lifecycle, and best practices."
              }
            ],
            "mcqs": [
              {
                "question": "Which of the following best describes the primary objective of Computer Organization & Architecture?",
                "options": [
                  "To provide systematic foundations for computing systems",
                  "Only for hardware manufacturing",
                  "Exclusively for theoretical proofs",
                  "None of the above"
                ],
                "correctIndex": 0,
                "explanation": "Computer Organization & Architecture equips students with systematic, industry-ready computational problem-solving skills."
              }
            ]
          },
          {
            "id": "bca303-u1-t2",
            "title": "Key Methodologies, Implementations & Solved Examples for Computer Organization & Architecture",
            "simpleExplanation": "Step-by-step breakdown of core algorithms, execution lifecycle, and practical problem-solving methodologies for Computer Organization & Architecture.",
            "detailedExplanation": "## Practical Implementation & Algorithmic Analysis\n\nIn this topic, we analyze real-world implementations, edge cases, and standard university numerical problems related to Computer Organization & Architecture.\n\n### Implementation Best Practices\n- Maintain clean modular structure and rigorous separation of concerns.\n- Optimize algorithmic time and space complexity.\n- Implement robust error handling and boundary validation.",
            "keyPoints": [
              "Comprehensive problem-solving methodology with step-by-step derivations.",
              "Focus on time/space complexity optimization.",
              "Standard high-yield university question pattern."
            ],
            "theoryQuestions": [
              {
                "question": "Describe the step-by-step problem-solving lifecycle used in Computer Organization & Architecture.",
                "marks": "5 Marks",
                "answer": "The methodology involves requirement analysis, mathematical or algorithmic formalization, implementation verification, boundary testing, and performance profiling."
              }
            ],
            "mcqs": [
              {
                "question": "What is the key factor when analyzing algorithms and system implementations?",
                "options": [
                  "Time and space complexity",
                  "Number of lines of comments",
                  "Font size of source code",
                  "Color scheme of IDE"
                ],
                "correctIndex": 0,
                "explanation": "Asymptotic time and space efficiency dictate the scalability and real-world viability of computing solutions."
              }
            ]
          }
        ]
      },
      {
        "id": "bca303-u2",
        "title": "Unit 2: Advanced Concepts & Industry Applications of Computer Organization",
        "description": "In-depth analysis of advanced patterns, performance tuning, and practical applications of Computer Organization & Architecture.",
        "topics": [
          {
            "id": "bca303-u2-t1",
            "title": "Advanced Architecture, Security & Optimization in Computer Organization & Architecture",
            "simpleExplanation": "Explores advanced architectural optimizations, security controls, and enterprise-grade deployment considerations for Computer Organization & Architecture.",
            "detailedExplanation": "## Advanced Engineering & System Optimization\n\nThis unit explores high-performance paradigms, scalability strategies, fault tolerance, and security mechanisms within Computer Organization & Architecture.\n\n### Optimization Strategies\n1. **Resource Efficiency**: Minimizing memory footprint and CPU instruction count.\n2. **Concurrency & Throughput**: Safe multi-threaded or asynchronous execution.\n3. **Security Posture**: Defending against malicious inputs, buffer overflows, and unauthorized access.",
            "keyPoints": [
              "Enterprise-grade optimization and scalability techniques.",
              "Security controls and defensive coding best practices.",
              "Exam-tested analytical comparison tables."
            ],
            "theoryQuestions": [
              {
                "question": "Discuss advanced optimization techniques and security best practices relevant to Computer Organization & Architecture.",
                "marks": "7 Marks",
                "answer": "Optimization requires profiling system bottlenecks, implementing efficient caching, choosing optimal data representations, and enforcing strict input validation."
              }
            ],
            "mcqs": [
              {
                "question": "Which principle is fundamental to securing modern computing systems?",
                "options": [
                  "Principle of Least Privilege",
                  "Running all services as root",
                  "Hardcoding passwords in source files",
                  "Disabling firewall rules"
                ],
                "correctIndex": 0,
                "explanation": "The Principle of Least Privilege ensures entities operate using only the minimal permissions necessary to perform their legitimate function."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "bca304-financial-accounting",
    "name": "Financial Accounting & Management",
    "code": "BCA304",
    "color": "bg-teal-600",
    "icon": "dollar-sign",
    "semester": 3,
    "description": "Comprehensive University BCA Syllabus for Financial Accounting & Management \u2014 Double-Entry Bookkeeping, Journal Entries, Ledger, Trial Balance, Final Accounts, and Cost Analysis for IT.",
    "units": [
      {
        "id": "bca304-u1",
        "title": "Unit 1: Fundamentals & Theoretical Foundations of Financial Accounting",
        "description": "Core concepts, definitions, architectural principles, and foundational theory for Financial Accounting & Management.",
        "topics": [
          {
            "id": "bca304-u1-t1",
            "title": "Core Principles and Architecture of Financial Accounting & Management",
            "simpleExplanation": "This topic covers the fundamental principles, design patterns, and operational foundations of Financial Accounting & Management required for university examinations and technical interviews.",
            "detailedExplanation": "## 1. Overview & Architectural Importance\n\nFinancial Accounting & Management (BCA304) is a core subject in the Bachelor of Computer Applications curriculum. It provides essential theoretical depth and hands-on practical competence.\n\n### Key Conceptual Pillars\n1. **Theoretical Foundations**: Rigorous understanding of underlying mathematical models, protocols, and algorithm complexity.\n2. **Industry Relevance**: Real-world application in modern software engineering, web architectures, enterprise systems, and data pipelines.\n3. **Exam Focus**: Solved analytical derivations, step-by-step numerical problems, and standard university question patterns.",
            "keyPoints": [
              "Standard university curriculum mapped for Financial Accounting & Management.",
              "Covers essential theoretical and practical examination blueprints.",
              "Includes comprehensive model answers and high-yield MCQs."
            ],
            "theoryQuestions": [
              {
                "question": "Explain the fundamental architecture and importance of Financial Accounting & Management in modern computer applications.",
                "marks": "7 Marks",
                "answer": "Financial Accounting & Management (BCA304) forms a foundational pillar in computer science by bridging low-level computation with high-level software abstractions. Students must understand its architectural components, lifecycle, and best practices."
              }
            ],
            "mcqs": [
              {
                "question": "Which of the following best describes the primary objective of Financial Accounting & Management?",
                "options": [
                  "To provide systematic foundations for computing systems",
                  "Only for hardware manufacturing",
                  "Exclusively for theoretical proofs",
                  "None of the above"
                ],
                "correctIndex": 0,
                "explanation": "Financial Accounting & Management equips students with systematic, industry-ready computational problem-solving skills."
              }
            ]
          },
          {
            "id": "bca304-u1-t2",
            "title": "Key Methodologies, Implementations & Solved Examples for Financial Accounting & Management",
            "simpleExplanation": "Step-by-step breakdown of core algorithms, execution lifecycle, and practical problem-solving methodologies for Financial Accounting & Management.",
            "detailedExplanation": "## Practical Implementation & Algorithmic Analysis\n\nIn this topic, we analyze real-world implementations, edge cases, and standard university numerical problems related to Financial Accounting & Management.\n\n### Implementation Best Practices\n- Maintain clean modular structure and rigorous separation of concerns.\n- Optimize algorithmic time and space complexity.\n- Implement robust error handling and boundary validation.",
            "keyPoints": [
              "Comprehensive problem-solving methodology with step-by-step derivations.",
              "Focus on time/space complexity optimization.",
              "Standard high-yield university question pattern."
            ],
            "theoryQuestions": [
              {
                "question": "Describe the step-by-step problem-solving lifecycle used in Financial Accounting & Management.",
                "marks": "5 Marks",
                "answer": "The methodology involves requirement analysis, mathematical or algorithmic formalization, implementation verification, boundary testing, and performance profiling."
              }
            ],
            "mcqs": [
              {
                "question": "What is the key factor when analyzing algorithms and system implementations?",
                "options": [
                  "Time and space complexity",
                  "Number of lines of comments",
                  "Font size of source code",
                  "Color scheme of IDE"
                ],
                "correctIndex": 0,
                "explanation": "Asymptotic time and space efficiency dictate the scalability and real-world viability of computing solutions."
              }
            ]
          }
        ]
      },
      {
        "id": "bca304-u2",
        "title": "Unit 2: Advanced Concepts & Industry Applications of Financial Accounting",
        "description": "In-depth analysis of advanced patterns, performance tuning, and practical applications of Financial Accounting & Management.",
        "topics": [
          {
            "id": "bca304-u2-t1",
            "title": "Advanced Architecture, Security & Optimization in Financial Accounting & Management",
            "simpleExplanation": "Explores advanced architectural optimizations, security controls, and enterprise-grade deployment considerations for Financial Accounting & Management.",
            "detailedExplanation": "## Advanced Engineering & System Optimization\n\nThis unit explores high-performance paradigms, scalability strategies, fault tolerance, and security mechanisms within Financial Accounting & Management.\n\n### Optimization Strategies\n1. **Resource Efficiency**: Minimizing memory footprint and CPU instruction count.\n2. **Concurrency & Throughput**: Safe multi-threaded or asynchronous execution.\n3. **Security Posture**: Defending against malicious inputs, buffer overflows, and unauthorized access.",
            "keyPoints": [
              "Enterprise-grade optimization and scalability techniques.",
              "Security controls and defensive coding best practices.",
              "Exam-tested analytical comparison tables."
            ],
            "theoryQuestions": [
              {
                "question": "Discuss advanced optimization techniques and security best practices relevant to Financial Accounting & Management.",
                "marks": "7 Marks",
                "answer": "Optimization requires profiling system bottlenecks, implementing efficient caching, choosing optimal data representations, and enforcing strict input validation."
              }
            ],
            "mcqs": [
              {
                "question": "Which principle is fundamental to securing modern computing systems?",
                "options": [
                  "Principle of Least Privilege",
                  "Running all services as root",
                  "Hardcoding passwords in source files",
                  "Disabling firewall rules"
                ],
                "correctIndex": 0,
                "explanation": "The Principle of Least Privilege ensures entities operate using only the minimal permissions necessary to perform their legitimate function."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "bca305-software-engineering",
    "name": "Software Engineering & Agile",
    "code": "BCA305",
    "color": "bg-violet-600",
    "icon": "layers",
    "semester": 3,
    "description": "Comprehensive University BCA Syllabus for Software Engineering & Agile \u2014 Software Life Cycle Models, Agile Scrum, Sprint Management, IEEE 830 SRS Specifications, and Black/White Box Testing.",
    "units": [
      {
        "id": "bca305-u1",
        "title": "Unit 1: Fundamentals & Theoretical Foundations of Software Engineering",
        "description": "Core concepts, definitions, architectural principles, and foundational theory for Software Engineering & Agile.",
        "topics": [
          {
            "id": "bca305-u1-t1",
            "title": "Core Principles and Architecture of Software Engineering & Agile",
            "simpleExplanation": "This topic covers the fundamental principles, design patterns, and operational foundations of Software Engineering & Agile required for university examinations and technical interviews.",
            "detailedExplanation": "## 1. Overview & Architectural Importance\n\nSoftware Engineering & Agile (BCA305) is a core subject in the Bachelor of Computer Applications curriculum. It provides essential theoretical depth and hands-on practical competence.\n\n### Key Conceptual Pillars\n1. **Theoretical Foundations**: Rigorous understanding of underlying mathematical models, protocols, and algorithm complexity.\n2. **Industry Relevance**: Real-world application in modern software engineering, web architectures, enterprise systems, and data pipelines.\n3. **Exam Focus**: Solved analytical derivations, step-by-step numerical problems, and standard university question patterns.",
            "keyPoints": [
              "Standard university curriculum mapped for Software Engineering & Agile.",
              "Covers essential theoretical and practical examination blueprints.",
              "Includes comprehensive model answers and high-yield MCQs."
            ],
            "theoryQuestions": [
              {
                "question": "Explain the fundamental architecture and importance of Software Engineering & Agile in modern computer applications.",
                "marks": "7 Marks",
                "answer": "Software Engineering & Agile (BCA305) forms a foundational pillar in computer science by bridging low-level computation with high-level software abstractions. Students must understand its architectural components, lifecycle, and best practices."
              }
            ],
            "mcqs": [
              {
                "question": "Which of the following best describes the primary objective of Software Engineering & Agile?",
                "options": [
                  "To provide systematic foundations for computing systems",
                  "Only for hardware manufacturing",
                  "Exclusively for theoretical proofs",
                  "None of the above"
                ],
                "correctIndex": 0,
                "explanation": "Software Engineering & Agile equips students with systematic, industry-ready computational problem-solving skills."
              }
            ]
          },
          {
            "id": "bca305-u1-t2",
            "title": "Key Methodologies, Implementations & Solved Examples for Software Engineering & Agile",
            "simpleExplanation": "Step-by-step breakdown of core algorithms, execution lifecycle, and practical problem-solving methodologies for Software Engineering & Agile.",
            "detailedExplanation": "## Practical Implementation & Algorithmic Analysis\n\nIn this topic, we analyze real-world implementations, edge cases, and standard university numerical problems related to Software Engineering & Agile.\n\n### Implementation Best Practices\n- Maintain clean modular structure and rigorous separation of concerns.\n- Optimize algorithmic time and space complexity.\n- Implement robust error handling and boundary validation.",
            "keyPoints": [
              "Comprehensive problem-solving methodology with step-by-step derivations.",
              "Focus on time/space complexity optimization.",
              "Standard high-yield university question pattern."
            ],
            "theoryQuestions": [
              {
                "question": "Describe the step-by-step problem-solving lifecycle used in Software Engineering & Agile.",
                "marks": "5 Marks",
                "answer": "The methodology involves requirement analysis, mathematical or algorithmic formalization, implementation verification, boundary testing, and performance profiling."
              }
            ],
            "mcqs": [
              {
                "question": "What is the key factor when analyzing algorithms and system implementations?",
                "options": [
                  "Time and space complexity",
                  "Number of lines of comments",
                  "Font size of source code",
                  "Color scheme of IDE"
                ],
                "correctIndex": 0,
                "explanation": "Asymptotic time and space efficiency dictate the scalability and real-world viability of computing solutions."
              }
            ]
          }
        ]
      },
      {
        "id": "bca305-u2",
        "title": "Unit 2: Advanced Concepts & Industry Applications of Software Engineering",
        "description": "In-depth analysis of advanced patterns, performance tuning, and practical applications of Software Engineering & Agile.",
        "topics": [
          {
            "id": "bca305-u2-t1",
            "title": "Advanced Architecture, Security & Optimization in Software Engineering & Agile",
            "simpleExplanation": "Explores advanced architectural optimizations, security controls, and enterprise-grade deployment considerations for Software Engineering & Agile.",
            "detailedExplanation": "## Advanced Engineering & System Optimization\n\nThis unit explores high-performance paradigms, scalability strategies, fault tolerance, and security mechanisms within Software Engineering & Agile.\n\n### Optimization Strategies\n1. **Resource Efficiency**: Minimizing memory footprint and CPU instruction count.\n2. **Concurrency & Throughput**: Safe multi-threaded or asynchronous execution.\n3. **Security Posture**: Defending against malicious inputs, buffer overflows, and unauthorized access.",
            "keyPoints": [
              "Enterprise-grade optimization and scalability techniques.",
              "Security controls and defensive coding best practices.",
              "Exam-tested analytical comparison tables."
            ],
            "theoryQuestions": [
              {
                "question": "Discuss advanced optimization techniques and security best practices relevant to Software Engineering & Agile.",
                "marks": "7 Marks",
                "answer": "Optimization requires profiling system bottlenecks, implementing efficient caching, choosing optimal data representations, and enforcing strict input validation."
              }
            ],
            "mcqs": [
              {
                "question": "Which principle is fundamental to securing modern computing systems?",
                "options": [
                  "Principle of Least Privilege",
                  "Running all services as root",
                  "Hardcoding passwords in source files",
                  "Disabling firewall rules"
                ],
                "correctIndex": 0,
                "explanation": "The Principle of Least Privilege ensures entities operate using only the minimal permissions necessary to perform their legitimate function."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "bca401-java-programming",
    "name": "Core Java Programming & OOP",
    "code": "BCA401",
    "color": "bg-amber-600",
    "icon": "coffee",
    "semester": 4,
    "description": "Comprehensive University BCA Syllabus for Core Java Programming & OOP \u2014 Java Virtual Machine (JVM), Interfaces, Multithreading, Exception Handling, Collections Framework, and JDBC Database Connectivity.",
    "units": [
      {
        "id": "bca401-u1",
        "title": "Unit 1: Fundamentals & Theoretical Foundations of Core Java Programming",
        "description": "Core concepts, definitions, architectural principles, and foundational theory for Core Java Programming & OOP.",
        "topics": [
          {
            "id": "bca401-u1-t1",
            "title": "Core Principles and Architecture of Core Java Programming & OOP",
            "simpleExplanation": "This topic covers the fundamental principles, design patterns, and operational foundations of Core Java Programming & OOP required for university examinations and technical interviews.",
            "detailedExplanation": "## 1. Overview & Architectural Importance\n\nCore Java Programming & OOP (BCA401) is a core subject in the Bachelor of Computer Applications curriculum. It provides essential theoretical depth and hands-on practical competence.\n\n### Key Conceptual Pillars\n1. **Theoretical Foundations**: Rigorous understanding of underlying mathematical models, protocols, and algorithm complexity.\n2. **Industry Relevance**: Real-world application in modern software engineering, web architectures, enterprise systems, and data pipelines.\n3. **Exam Focus**: Solved analytical derivations, step-by-step numerical problems, and standard university question patterns.",
            "keyPoints": [
              "Standard university curriculum mapped for Core Java Programming & OOP.",
              "Covers essential theoretical and practical examination blueprints.",
              "Includes comprehensive model answers and high-yield MCQs."
            ],
            "theoryQuestions": [
              {
                "question": "Explain the fundamental architecture and importance of Core Java Programming & OOP in modern computer applications.",
                "marks": "7 Marks",
                "answer": "Core Java Programming & OOP (BCA401) forms a foundational pillar in computer science by bridging low-level computation with high-level software abstractions. Students must understand its architectural components, lifecycle, and best practices."
              }
            ],
            "mcqs": [
              {
                "question": "Which of the following best describes the primary objective of Core Java Programming & OOP?",
                "options": [
                  "To provide systematic foundations for computing systems",
                  "Only for hardware manufacturing",
                  "Exclusively for theoretical proofs",
                  "None of the above"
                ],
                "correctIndex": 0,
                "explanation": "Core Java Programming & OOP equips students with systematic, industry-ready computational problem-solving skills."
              }
            ]
          },
          {
            "id": "bca401-u1-t2",
            "title": "Key Methodologies, Implementations & Solved Examples for Core Java Programming & OOP",
            "simpleExplanation": "Step-by-step breakdown of core algorithms, execution lifecycle, and practical problem-solving methodologies for Core Java Programming & OOP.",
            "detailedExplanation": "## Practical Implementation & Algorithmic Analysis\n\nIn this topic, we analyze real-world implementations, edge cases, and standard university numerical problems related to Core Java Programming & OOP.\n\n### Implementation Best Practices\n- Maintain clean modular structure and rigorous separation of concerns.\n- Optimize algorithmic time and space complexity.\n- Implement robust error handling and boundary validation.",
            "keyPoints": [
              "Comprehensive problem-solving methodology with step-by-step derivations.",
              "Focus on time/space complexity optimization.",
              "Standard high-yield university question pattern."
            ],
            "theoryQuestions": [
              {
                "question": "Describe the step-by-step problem-solving lifecycle used in Core Java Programming & OOP.",
                "marks": "5 Marks",
                "answer": "The methodology involves requirement analysis, mathematical or algorithmic formalization, implementation verification, boundary testing, and performance profiling."
              }
            ],
            "mcqs": [
              {
                "question": "What is the key factor when analyzing algorithms and system implementations?",
                "options": [
                  "Time and space complexity",
                  "Number of lines of comments",
                  "Font size of source code",
                  "Color scheme of IDE"
                ],
                "correctIndex": 0,
                "explanation": "Asymptotic time and space efficiency dictate the scalability and real-world viability of computing solutions."
              }
            ]
          }
        ]
      },
      {
        "id": "bca401-u2",
        "title": "Unit 2: Advanced Concepts & Industry Applications of Core Java Programming",
        "description": "In-depth analysis of advanced patterns, performance tuning, and practical applications of Core Java Programming & OOP.",
        "topics": [
          {
            "id": "bca401-u2-t1",
            "title": "Advanced Architecture, Security & Optimization in Core Java Programming & OOP",
            "simpleExplanation": "Explores advanced architectural optimizations, security controls, and enterprise-grade deployment considerations for Core Java Programming & OOP.",
            "detailedExplanation": "## Advanced Engineering & System Optimization\n\nThis unit explores high-performance paradigms, scalability strategies, fault tolerance, and security mechanisms within Core Java Programming & OOP.\n\n### Optimization Strategies\n1. **Resource Efficiency**: Minimizing memory footprint and CPU instruction count.\n2. **Concurrency & Throughput**: Safe multi-threaded or asynchronous execution.\n3. **Security Posture**: Defending against malicious inputs, buffer overflows, and unauthorized access.",
            "keyPoints": [
              "Enterprise-grade optimization and scalability techniques.",
              "Security controls and defensive coding best practices.",
              "Exam-tested analytical comparison tables."
            ],
            "theoryQuestions": [
              {
                "question": "Discuss advanced optimization techniques and security best practices relevant to Core Java Programming & OOP.",
                "marks": "7 Marks",
                "answer": "Optimization requires profiling system bottlenecks, implementing efficient caching, choosing optimal data representations, and enforcing strict input validation."
              }
            ],
            "mcqs": [
              {
                "question": "Which principle is fundamental to securing modern computing systems?",
                "options": [
                  "Principle of Least Privilege",
                  "Running all services as root",
                  "Hardcoding passwords in source files",
                  "Disabling firewall rules"
                ],
                "correctIndex": 0,
                "explanation": "The Principle of Least Privilege ensures entities operate using only the minimal permissions necessary to perform their legitimate function."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "bca402-computer-networks",
    "name": "Computer Networks & TCP/IP",
    "code": "BCA402",
    "color": "bg-blue-600",
    "icon": "share-2",
    "semester": 4,
    "description": "Comprehensive University BCA Syllabus for Computer Networks & TCP/IP \u2014 OSI 7-Layer Architecture, IPv4/IPv6 CIDR Subnetting, Routing Protocols, TCP 3-Way Handshake, and Application Services (DNS, HTTP).",
    "units": [
      {
        "id": "bca402-u1",
        "title": "Unit 1: Fundamentals & Theoretical Foundations of Computer Networks",
        "description": "Core concepts, definitions, architectural principles, and foundational theory for Computer Networks & TCP/IP.",
        "topics": [
          {
            "id": "bca402-u1-t1",
            "title": "Core Principles and Architecture of Computer Networks & TCP/IP",
            "simpleExplanation": "This topic covers the fundamental principles, design patterns, and operational foundations of Computer Networks & TCP/IP required for university examinations and technical interviews.",
            "detailedExplanation": "## 1. Overview & Architectural Importance\n\nComputer Networks & TCP/IP (BCA402) is a core subject in the Bachelor of Computer Applications curriculum. It provides essential theoretical depth and hands-on practical competence.\n\n### Key Conceptual Pillars\n1. **Theoretical Foundations**: Rigorous understanding of underlying mathematical models, protocols, and algorithm complexity.\n2. **Industry Relevance**: Real-world application in modern software engineering, web architectures, enterprise systems, and data pipelines.\n3. **Exam Focus**: Solved analytical derivations, step-by-step numerical problems, and standard university question patterns.",
            "keyPoints": [
              "Standard university curriculum mapped for Computer Networks & TCP/IP.",
              "Covers essential theoretical and practical examination blueprints.",
              "Includes comprehensive model answers and high-yield MCQs."
            ],
            "theoryQuestions": [
              {
                "question": "Explain the fundamental architecture and importance of Computer Networks & TCP/IP in modern computer applications.",
                "marks": "7 Marks",
                "answer": "Computer Networks & TCP/IP (BCA402) forms a foundational pillar in computer science by bridging low-level computation with high-level software abstractions. Students must understand its architectural components, lifecycle, and best practices."
              }
            ],
            "mcqs": [
              {
                "question": "Which of the following best describes the primary objective of Computer Networks & TCP/IP?",
                "options": [
                  "To provide systematic foundations for computing systems",
                  "Only for hardware manufacturing",
                  "Exclusively for theoretical proofs",
                  "None of the above"
                ],
                "correctIndex": 0,
                "explanation": "Computer Networks & TCP/IP equips students with systematic, industry-ready computational problem-solving skills."
              }
            ]
          },
          {
            "id": "bca402-u1-t2",
            "title": "Key Methodologies, Implementations & Solved Examples for Computer Networks & TCP/IP",
            "simpleExplanation": "Step-by-step breakdown of core algorithms, execution lifecycle, and practical problem-solving methodologies for Computer Networks & TCP/IP.",
            "detailedExplanation": "## Practical Implementation & Algorithmic Analysis\n\nIn this topic, we analyze real-world implementations, edge cases, and standard university numerical problems related to Computer Networks & TCP/IP.\n\n### Implementation Best Practices\n- Maintain clean modular structure and rigorous separation of concerns.\n- Optimize algorithmic time and space complexity.\n- Implement robust error handling and boundary validation.",
            "keyPoints": [
              "Comprehensive problem-solving methodology with step-by-step derivations.",
              "Focus on time/space complexity optimization.",
              "Standard high-yield university question pattern."
            ],
            "theoryQuestions": [
              {
                "question": "Describe the step-by-step problem-solving lifecycle used in Computer Networks & TCP/IP.",
                "marks": "5 Marks",
                "answer": "The methodology involves requirement analysis, mathematical or algorithmic formalization, implementation verification, boundary testing, and performance profiling."
              }
            ],
            "mcqs": [
              {
                "question": "What is the key factor when analyzing algorithms and system implementations?",
                "options": [
                  "Time and space complexity",
                  "Number of lines of comments",
                  "Font size of source code",
                  "Color scheme of IDE"
                ],
                "correctIndex": 0,
                "explanation": "Asymptotic time and space efficiency dictate the scalability and real-world viability of computing solutions."
              }
            ]
          }
        ]
      },
      {
        "id": "bca402-u2",
        "title": "Unit 2: Advanced Concepts & Industry Applications of Computer Networks",
        "description": "In-depth analysis of advanced patterns, performance tuning, and practical applications of Computer Networks & TCP/IP.",
        "topics": [
          {
            "id": "bca402-u2-t1",
            "title": "Advanced Architecture, Security & Optimization in Computer Networks & TCP/IP",
            "simpleExplanation": "Explores advanced architectural optimizations, security controls, and enterprise-grade deployment considerations for Computer Networks & TCP/IP.",
            "detailedExplanation": "## Advanced Engineering & System Optimization\n\nThis unit explores high-performance paradigms, scalability strategies, fault tolerance, and security mechanisms within Computer Networks & TCP/IP.\n\n### Optimization Strategies\n1. **Resource Efficiency**: Minimizing memory footprint and CPU instruction count.\n2. **Concurrency & Throughput**: Safe multi-threaded or asynchronous execution.\n3. **Security Posture**: Defending against malicious inputs, buffer overflows, and unauthorized access.",
            "keyPoints": [
              "Enterprise-grade optimization and scalability techniques.",
              "Security controls and defensive coding best practices.",
              "Exam-tested analytical comparison tables."
            ],
            "theoryQuestions": [
              {
                "question": "Discuss advanced optimization techniques and security best practices relevant to Computer Networks & TCP/IP.",
                "marks": "7 Marks",
                "answer": "Optimization requires profiling system bottlenecks, implementing efficient caching, choosing optimal data representations, and enforcing strict input validation."
              }
            ],
            "mcqs": [
              {
                "question": "Which principle is fundamental to securing modern computing systems?",
                "options": [
                  "Principle of Least Privilege",
                  "Running all services as root",
                  "Hardcoding passwords in source files",
                  "Disabling firewall rules"
                ],
                "correctIndex": 0,
                "explanation": "The Principle of Least Privilege ensures entities operate using only the minimal permissions necessary to perform their legitimate function."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "bca403-python-programming",
    "name": "Python Programming & Applications",
    "code": "BCA403",
    "color": "bg-green-600",
    "icon": "file-code",
    "semester": 4,
    "description": "Comprehensive University BCA Syllabus for Python Programming & Applications \u2014 Python Data Structures, Object-Oriented Python, File Handling, Regular Expressions, and Intro to NumPy & Pandas.",
    "units": [
      {
        "id": "bca403-u1",
        "title": "Unit 1: Fundamentals & Theoretical Foundations of Python Programming",
        "description": "Core concepts, definitions, architectural principles, and foundational theory for Python Programming & Applications.",
        "topics": [
          {
            "id": "bca403-u1-t1",
            "title": "Core Principles and Architecture of Python Programming & Applications",
            "simpleExplanation": "This topic covers the fundamental principles, design patterns, and operational foundations of Python Programming & Applications required for university examinations and technical interviews.",
            "detailedExplanation": "## 1. Overview & Architectural Importance\n\nPython Programming & Applications (BCA403) is a core subject in the Bachelor of Computer Applications curriculum. It provides essential theoretical depth and hands-on practical competence.\n\n### Key Conceptual Pillars\n1. **Theoretical Foundations**: Rigorous understanding of underlying mathematical models, protocols, and algorithm complexity.\n2. **Industry Relevance**: Real-world application in modern software engineering, web architectures, enterprise systems, and data pipelines.\n3. **Exam Focus**: Solved analytical derivations, step-by-step numerical problems, and standard university question patterns.",
            "keyPoints": [
              "Standard university curriculum mapped for Python Programming & Applications.",
              "Covers essential theoretical and practical examination blueprints.",
              "Includes comprehensive model answers and high-yield MCQs."
            ],
            "theoryQuestions": [
              {
                "question": "Explain the fundamental architecture and importance of Python Programming & Applications in modern computer applications.",
                "marks": "7 Marks",
                "answer": "Python Programming & Applications (BCA403) forms a foundational pillar in computer science by bridging low-level computation with high-level software abstractions. Students must understand its architectural components, lifecycle, and best practices."
              }
            ],
            "mcqs": [
              {
                "question": "Which of the following best describes the primary objective of Python Programming & Applications?",
                "options": [
                  "To provide systematic foundations for computing systems",
                  "Only for hardware manufacturing",
                  "Exclusively for theoretical proofs",
                  "None of the above"
                ],
                "correctIndex": 0,
                "explanation": "Python Programming & Applications equips students with systematic, industry-ready computational problem-solving skills."
              }
            ]
          },
          {
            "id": "bca403-u1-t2",
            "title": "Key Methodologies, Implementations & Solved Examples for Python Programming & Applications",
            "simpleExplanation": "Step-by-step breakdown of core algorithms, execution lifecycle, and practical problem-solving methodologies for Python Programming & Applications.",
            "detailedExplanation": "## Practical Implementation & Algorithmic Analysis\n\nIn this topic, we analyze real-world implementations, edge cases, and standard university numerical problems related to Python Programming & Applications.\n\n### Implementation Best Practices\n- Maintain clean modular structure and rigorous separation of concerns.\n- Optimize algorithmic time and space complexity.\n- Implement robust error handling and boundary validation.",
            "keyPoints": [
              "Comprehensive problem-solving methodology with step-by-step derivations.",
              "Focus on time/space complexity optimization.",
              "Standard high-yield university question pattern."
            ],
            "theoryQuestions": [
              {
                "question": "Describe the step-by-step problem-solving lifecycle used in Python Programming & Applications.",
                "marks": "5 Marks",
                "answer": "The methodology involves requirement analysis, mathematical or algorithmic formalization, implementation verification, boundary testing, and performance profiling."
              }
            ],
            "mcqs": [
              {
                "question": "What is the key factor when analyzing algorithms and system implementations?",
                "options": [
                  "Time and space complexity",
                  "Number of lines of comments",
                  "Font size of source code",
                  "Color scheme of IDE"
                ],
                "correctIndex": 0,
                "explanation": "Asymptotic time and space efficiency dictate the scalability and real-world viability of computing solutions."
              }
            ]
          }
        ]
      },
      {
        "id": "bca403-u2",
        "title": "Unit 2: Advanced Concepts & Industry Applications of Python Programming",
        "description": "In-depth analysis of advanced patterns, performance tuning, and practical applications of Python Programming & Applications.",
        "topics": [
          {
            "id": "bca403-u2-t1",
            "title": "Advanced Architecture, Security & Optimization in Python Programming & Applications",
            "simpleExplanation": "Explores advanced architectural optimizations, security controls, and enterprise-grade deployment considerations for Python Programming & Applications.",
            "detailedExplanation": "## Advanced Engineering & System Optimization\n\nThis unit explores high-performance paradigms, scalability strategies, fault tolerance, and security mechanisms within Python Programming & Applications.\n\n### Optimization Strategies\n1. **Resource Efficiency**: Minimizing memory footprint and CPU instruction count.\n2. **Concurrency & Throughput**: Safe multi-threaded or asynchronous execution.\n3. **Security Posture**: Defending against malicious inputs, buffer overflows, and unauthorized access.",
            "keyPoints": [
              "Enterprise-grade optimization and scalability techniques.",
              "Security controls and defensive coding best practices.",
              "Exam-tested analytical comparison tables."
            ],
            "theoryQuestions": [
              {
                "question": "Discuss advanced optimization techniques and security best practices relevant to Python Programming & Applications.",
                "marks": "7 Marks",
                "answer": "Optimization requires profiling system bottlenecks, implementing efficient caching, choosing optimal data representations, and enforcing strict input validation."
              }
            ],
            "mcqs": [
              {
                "question": "Which principle is fundamental to securing modern computing systems?",
                "options": [
                  "Principle of Least Privilege",
                  "Running all services as root",
                  "Hardcoding passwords in source files",
                  "Disabling firewall rules"
                ],
                "correctIndex": 0,
                "explanation": "The Principle of Least Privilege ensures entities operate using only the minimal permissions necessary to perform their legitimate function."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "bca404-system-analysis",
    "name": "System Analysis, Design & UML",
    "code": "BCA404",
    "color": "bg-fuchsia-600",
    "icon": "layout",
    "semester": 4,
    "description": "Comprehensive University BCA Syllabus for System Analysis, Design & UML \u2014 System Development Lifecycle, Feasibility Studies, DFD Modeling, UML Diagrams (Use Case, Class, Sequence), and System Testing.",
    "units": [
      {
        "id": "bca404-u1",
        "title": "Unit 1: Fundamentals & Theoretical Foundations of System Analysis, Design",
        "description": "Core concepts, definitions, architectural principles, and foundational theory for System Analysis, Design & UML.",
        "topics": [
          {
            "id": "bca404-u1-t1",
            "title": "Core Principles and Architecture of System Analysis, Design & UML",
            "simpleExplanation": "This topic covers the fundamental principles, design patterns, and operational foundations of System Analysis, Design & UML required for university examinations and technical interviews.",
            "detailedExplanation": "## 1. Overview & Architectural Importance\n\nSystem Analysis, Design & UML (BCA404) is a core subject in the Bachelor of Computer Applications curriculum. It provides essential theoretical depth and hands-on practical competence.\n\n### Key Conceptual Pillars\n1. **Theoretical Foundations**: Rigorous understanding of underlying mathematical models, protocols, and algorithm complexity.\n2. **Industry Relevance**: Real-world application in modern software engineering, web architectures, enterprise systems, and data pipelines.\n3. **Exam Focus**: Solved analytical derivations, step-by-step numerical problems, and standard university question patterns.",
            "keyPoints": [
              "Standard university curriculum mapped for System Analysis, Design & UML.",
              "Covers essential theoretical and practical examination blueprints.",
              "Includes comprehensive model answers and high-yield MCQs."
            ],
            "theoryQuestions": [
              {
                "question": "Explain the fundamental architecture and importance of System Analysis, Design & UML in modern computer applications.",
                "marks": "7 Marks",
                "answer": "System Analysis, Design & UML (BCA404) forms a foundational pillar in computer science by bridging low-level computation with high-level software abstractions. Students must understand its architectural components, lifecycle, and best practices."
              }
            ],
            "mcqs": [
              {
                "question": "Which of the following best describes the primary objective of System Analysis, Design & UML?",
                "options": [
                  "To provide systematic foundations for computing systems",
                  "Only for hardware manufacturing",
                  "Exclusively for theoretical proofs",
                  "None of the above"
                ],
                "correctIndex": 0,
                "explanation": "System Analysis, Design & UML equips students with systematic, industry-ready computational problem-solving skills."
              }
            ]
          },
          {
            "id": "bca404-u1-t2",
            "title": "Key Methodologies, Implementations & Solved Examples for System Analysis, Design & UML",
            "simpleExplanation": "Step-by-step breakdown of core algorithms, execution lifecycle, and practical problem-solving methodologies for System Analysis, Design & UML.",
            "detailedExplanation": "## Practical Implementation & Algorithmic Analysis\n\nIn this topic, we analyze real-world implementations, edge cases, and standard university numerical problems related to System Analysis, Design & UML.\n\n### Implementation Best Practices\n- Maintain clean modular structure and rigorous separation of concerns.\n- Optimize algorithmic time and space complexity.\n- Implement robust error handling and boundary validation.",
            "keyPoints": [
              "Comprehensive problem-solving methodology with step-by-step derivations.",
              "Focus on time/space complexity optimization.",
              "Standard high-yield university question pattern."
            ],
            "theoryQuestions": [
              {
                "question": "Describe the step-by-step problem-solving lifecycle used in System Analysis, Design & UML.",
                "marks": "5 Marks",
                "answer": "The methodology involves requirement analysis, mathematical or algorithmic formalization, implementation verification, boundary testing, and performance profiling."
              }
            ],
            "mcqs": [
              {
                "question": "What is the key factor when analyzing algorithms and system implementations?",
                "options": [
                  "Time and space complexity",
                  "Number of lines of comments",
                  "Font size of source code",
                  "Color scheme of IDE"
                ],
                "correctIndex": 0,
                "explanation": "Asymptotic time and space efficiency dictate the scalability and real-world viability of computing solutions."
              }
            ]
          }
        ]
      },
      {
        "id": "bca404-u2",
        "title": "Unit 2: Advanced Concepts & Industry Applications of System Analysis, Design",
        "description": "In-depth analysis of advanced patterns, performance tuning, and practical applications of System Analysis, Design & UML.",
        "topics": [
          {
            "id": "bca404-u2-t1",
            "title": "Advanced Architecture, Security & Optimization in System Analysis, Design & UML",
            "simpleExplanation": "Explores advanced architectural optimizations, security controls, and enterprise-grade deployment considerations for System Analysis, Design & UML.",
            "detailedExplanation": "## Advanced Engineering & System Optimization\n\nThis unit explores high-performance paradigms, scalability strategies, fault tolerance, and security mechanisms within System Analysis, Design & UML.\n\n### Optimization Strategies\n1. **Resource Efficiency**: Minimizing memory footprint and CPU instruction count.\n2. **Concurrency & Throughput**: Safe multi-threaded or asynchronous execution.\n3. **Security Posture**: Defending against malicious inputs, buffer overflows, and unauthorized access.",
            "keyPoints": [
              "Enterprise-grade optimization and scalability techniques.",
              "Security controls and defensive coding best practices.",
              "Exam-tested analytical comparison tables."
            ],
            "theoryQuestions": [
              {
                "question": "Discuss advanced optimization techniques and security best practices relevant to System Analysis, Design & UML.",
                "marks": "7 Marks",
                "answer": "Optimization requires profiling system bottlenecks, implementing efficient caching, choosing optimal data representations, and enforcing strict input validation."
              }
            ],
            "mcqs": [
              {
                "question": "Which principle is fundamental to securing modern computing systems?",
                "options": [
                  "Principle of Least Privilege",
                  "Running all services as root",
                  "Hardcoding passwords in source files",
                  "Disabling firewall rules"
                ],
                "correctIndex": 0,
                "explanation": "The Principle of Least Privilege ensures entities operate using only the minimal permissions necessary to perform their legitimate function."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "bca405-ecommerce-web",
    "name": "E-Commerce Technologies & Security",
    "code": "BCA405",
    "color": "bg-pink-600",
    "icon": "shopping-cart",
    "semester": 4,
    "description": "Comprehensive University BCA Syllabus for E-Commerce Technologies & Security \u2014 E-Commerce Architecture, Payment Gateways (UPI, Cards), SSL/TLS Encryption, Digital Signatures, and Mobile Commerce.",
    "units": [
      {
        "id": "bca405-u1",
        "title": "Unit 1: Fundamentals & Theoretical Foundations of E-Commerce Technologies",
        "description": "Core concepts, definitions, architectural principles, and foundational theory for E-Commerce Technologies & Security.",
        "topics": [
          {
            "id": "bca405-u1-t1",
            "title": "Core Principles and Architecture of E-Commerce Technologies & Security",
            "simpleExplanation": "This topic covers the fundamental principles, design patterns, and operational foundations of E-Commerce Technologies & Security required for university examinations and technical interviews.",
            "detailedExplanation": "## 1. Overview & Architectural Importance\n\nE-Commerce Technologies & Security (BCA405) is a core subject in the Bachelor of Computer Applications curriculum. It provides essential theoretical depth and hands-on practical competence.\n\n### Key Conceptual Pillars\n1. **Theoretical Foundations**: Rigorous understanding of underlying mathematical models, protocols, and algorithm complexity.\n2. **Industry Relevance**: Real-world application in modern software engineering, web architectures, enterprise systems, and data pipelines.\n3. **Exam Focus**: Solved analytical derivations, step-by-step numerical problems, and standard university question patterns.",
            "keyPoints": [
              "Standard university curriculum mapped for E-Commerce Technologies & Security.",
              "Covers essential theoretical and practical examination blueprints.",
              "Includes comprehensive model answers and high-yield MCQs."
            ],
            "theoryQuestions": [
              {
                "question": "Explain the fundamental architecture and importance of E-Commerce Technologies & Security in modern computer applications.",
                "marks": "7 Marks",
                "answer": "E-Commerce Technologies & Security (BCA405) forms a foundational pillar in computer science by bridging low-level computation with high-level software abstractions. Students must understand its architectural components, lifecycle, and best practices."
              }
            ],
            "mcqs": [
              {
                "question": "Which of the following best describes the primary objective of E-Commerce Technologies & Security?",
                "options": [
                  "To provide systematic foundations for computing systems",
                  "Only for hardware manufacturing",
                  "Exclusively for theoretical proofs",
                  "None of the above"
                ],
                "correctIndex": 0,
                "explanation": "E-Commerce Technologies & Security equips students with systematic, industry-ready computational problem-solving skills."
              }
            ]
          },
          {
            "id": "bca405-u1-t2",
            "title": "Key Methodologies, Implementations & Solved Examples for E-Commerce Technologies & Security",
            "simpleExplanation": "Step-by-step breakdown of core algorithms, execution lifecycle, and practical problem-solving methodologies for E-Commerce Technologies & Security.",
            "detailedExplanation": "## Practical Implementation & Algorithmic Analysis\n\nIn this topic, we analyze real-world implementations, edge cases, and standard university numerical problems related to E-Commerce Technologies & Security.\n\n### Implementation Best Practices\n- Maintain clean modular structure and rigorous separation of concerns.\n- Optimize algorithmic time and space complexity.\n- Implement robust error handling and boundary validation.",
            "keyPoints": [
              "Comprehensive problem-solving methodology with step-by-step derivations.",
              "Focus on time/space complexity optimization.",
              "Standard high-yield university question pattern."
            ],
            "theoryQuestions": [
              {
                "question": "Describe the step-by-step problem-solving lifecycle used in E-Commerce Technologies & Security.",
                "marks": "5 Marks",
                "answer": "The methodology involves requirement analysis, mathematical or algorithmic formalization, implementation verification, boundary testing, and performance profiling."
              }
            ],
            "mcqs": [
              {
                "question": "What is the key factor when analyzing algorithms and system implementations?",
                "options": [
                  "Time and space complexity",
                  "Number of lines of comments",
                  "Font size of source code",
                  "Color scheme of IDE"
                ],
                "correctIndex": 0,
                "explanation": "Asymptotic time and space efficiency dictate the scalability and real-world viability of computing solutions."
              }
            ]
          }
        ]
      },
      {
        "id": "bca405-u2",
        "title": "Unit 2: Advanced Concepts & Industry Applications of E-Commerce Technologies",
        "description": "In-depth analysis of advanced patterns, performance tuning, and practical applications of E-Commerce Technologies & Security.",
        "topics": [
          {
            "id": "bca405-u2-t1",
            "title": "Advanced Architecture, Security & Optimization in E-Commerce Technologies & Security",
            "simpleExplanation": "Explores advanced architectural optimizations, security controls, and enterprise-grade deployment considerations for E-Commerce Technologies & Security.",
            "detailedExplanation": "## Advanced Engineering & System Optimization\n\nThis unit explores high-performance paradigms, scalability strategies, fault tolerance, and security mechanisms within E-Commerce Technologies & Security.\n\n### Optimization Strategies\n1. **Resource Efficiency**: Minimizing memory footprint and CPU instruction count.\n2. **Concurrency & Throughput**: Safe multi-threaded or asynchronous execution.\n3. **Security Posture**: Defending against malicious inputs, buffer overflows, and unauthorized access.",
            "keyPoints": [
              "Enterprise-grade optimization and scalability techniques.",
              "Security controls and defensive coding best practices.",
              "Exam-tested analytical comparison tables."
            ],
            "theoryQuestions": [
              {
                "question": "Discuss advanced optimization techniques and security best practices relevant to E-Commerce Technologies & Security.",
                "marks": "7 Marks",
                "answer": "Optimization requires profiling system bottlenecks, implementing efficient caching, choosing optimal data representations, and enforcing strict input validation."
              }
            ],
            "mcqs": [
              {
                "question": "Which principle is fundamental to securing modern computing systems?",
                "options": [
                  "Principle of Least Privilege",
                  "Running all services as root",
                  "Hardcoding passwords in source files",
                  "Disabling firewall rules"
                ],
                "correctIndex": 0,
                "explanation": "The Principle of Least Privilege ensures entities operate using only the minimal permissions necessary to perform their legitimate function."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "bca501-php-mysql",
    "name": "Web Development with PHP & MySQL",
    "code": "BCA501",
    "color": "bg-indigo-600",
    "icon": "server",
    "semester": 5,
    "description": "Comprehensive University BCA Syllabus for Web Development with PHP & MySQL \u2014 Server-Side Scripting, Superglobals, Form Handling, Sessions, Cookies, Object-Oriented PHP, and MySQL PDO Integration.",
    "units": [
      {
        "id": "bca501-u1",
        "title": "Unit 1: Fundamentals & Theoretical Foundations of Web Development with PHP",
        "description": "Core concepts, definitions, architectural principles, and foundational theory for Web Development with PHP & MySQL.",
        "topics": [
          {
            "id": "bca501-u1-t1",
            "title": "Core Principles and Architecture of Web Development with PHP & MySQL",
            "simpleExplanation": "This topic covers the fundamental principles, design patterns, and operational foundations of Web Development with PHP & MySQL required for university examinations and technical interviews.",
            "detailedExplanation": "## 1. Overview & Architectural Importance\n\nWeb Development with PHP & MySQL (BCA501) is a core subject in the Bachelor of Computer Applications curriculum. It provides essential theoretical depth and hands-on practical competence.\n\n### Key Conceptual Pillars\n1. **Theoretical Foundations**: Rigorous understanding of underlying mathematical models, protocols, and algorithm complexity.\n2. **Industry Relevance**: Real-world application in modern software engineering, web architectures, enterprise systems, and data pipelines.\n3. **Exam Focus**: Solved analytical derivations, step-by-step numerical problems, and standard university question patterns.",
            "keyPoints": [
              "Standard university curriculum mapped for Web Development with PHP & MySQL.",
              "Covers essential theoretical and practical examination blueprints.",
              "Includes comprehensive model answers and high-yield MCQs."
            ],
            "theoryQuestions": [
              {
                "question": "Explain the fundamental architecture and importance of Web Development with PHP & MySQL in modern computer applications.",
                "marks": "7 Marks",
                "answer": "Web Development with PHP & MySQL (BCA501) forms a foundational pillar in computer science by bridging low-level computation with high-level software abstractions. Students must understand its architectural components, lifecycle, and best practices."
              }
            ],
            "mcqs": [
              {
                "question": "Which of the following best describes the primary objective of Web Development with PHP & MySQL?",
                "options": [
                  "To provide systematic foundations for computing systems",
                  "Only for hardware manufacturing",
                  "Exclusively for theoretical proofs",
                  "None of the above"
                ],
                "correctIndex": 0,
                "explanation": "Web Development with PHP & MySQL equips students with systematic, industry-ready computational problem-solving skills."
              }
            ]
          },
          {
            "id": "bca501-u1-t2",
            "title": "Key Methodologies, Implementations & Solved Examples for Web Development with PHP & MySQL",
            "simpleExplanation": "Step-by-step breakdown of core algorithms, execution lifecycle, and practical problem-solving methodologies for Web Development with PHP & MySQL.",
            "detailedExplanation": "## Practical Implementation & Algorithmic Analysis\n\nIn this topic, we analyze real-world implementations, edge cases, and standard university numerical problems related to Web Development with PHP & MySQL.\n\n### Implementation Best Practices\n- Maintain clean modular structure and rigorous separation of concerns.\n- Optimize algorithmic time and space complexity.\n- Implement robust error handling and boundary validation.",
            "keyPoints": [
              "Comprehensive problem-solving methodology with step-by-step derivations.",
              "Focus on time/space complexity optimization.",
              "Standard high-yield university question pattern."
            ],
            "theoryQuestions": [
              {
                "question": "Describe the step-by-step problem-solving lifecycle used in Web Development with PHP & MySQL.",
                "marks": "5 Marks",
                "answer": "The methodology involves requirement analysis, mathematical or algorithmic formalization, implementation verification, boundary testing, and performance profiling."
              }
            ],
            "mcqs": [
              {
                "question": "What is the key factor when analyzing algorithms and system implementations?",
                "options": [
                  "Time and space complexity",
                  "Number of lines of comments",
                  "Font size of source code",
                  "Color scheme of IDE"
                ],
                "correctIndex": 0,
                "explanation": "Asymptotic time and space efficiency dictate the scalability and real-world viability of computing solutions."
              }
            ]
          }
        ]
      },
      {
        "id": "bca501-u2",
        "title": "Unit 2: Advanced Concepts & Industry Applications of Web Development with PHP",
        "description": "In-depth analysis of advanced patterns, performance tuning, and practical applications of Web Development with PHP & MySQL.",
        "topics": [
          {
            "id": "bca501-u2-t1",
            "title": "Advanced Architecture, Security & Optimization in Web Development with PHP & MySQL",
            "simpleExplanation": "Explores advanced architectural optimizations, security controls, and enterprise-grade deployment considerations for Web Development with PHP & MySQL.",
            "detailedExplanation": "## Advanced Engineering & System Optimization\n\nThis unit explores high-performance paradigms, scalability strategies, fault tolerance, and security mechanisms within Web Development with PHP & MySQL.\n\n### Optimization Strategies\n1. **Resource Efficiency**: Minimizing memory footprint and CPU instruction count.\n2. **Concurrency & Throughput**: Safe multi-threaded or asynchronous execution.\n3. **Security Posture**: Defending against malicious inputs, buffer overflows, and unauthorized access.",
            "keyPoints": [
              "Enterprise-grade optimization and scalability techniques.",
              "Security controls and defensive coding best practices.",
              "Exam-tested analytical comparison tables."
            ],
            "theoryQuestions": [
              {
                "question": "Discuss advanced optimization techniques and security best practices relevant to Web Development with PHP & MySQL.",
                "marks": "7 Marks",
                "answer": "Optimization requires profiling system bottlenecks, implementing efficient caching, choosing optimal data representations, and enforcing strict input validation."
              }
            ],
            "mcqs": [
              {
                "question": "Which principle is fundamental to securing modern computing systems?",
                "options": [
                  "Principle of Least Privilege",
                  "Running all services as root",
                  "Hardcoding passwords in source files",
                  "Disabling firewall rules"
                ],
                "correctIndex": 0,
                "explanation": "The Principle of Least Privilege ensures entities operate using only the minimal permissions necessary to perform their legitimate function."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "bca502-csharp-dotnet",
    "name": "Application Development with C# & .NET",
    "code": "BCA502",
    "color": "bg-violet-600",
    "icon": "box",
    "semester": 5,
    "description": "Comprehensive University BCA Syllabus for Application Development with C# & .NET \u2014 .NET Common Language Runtime (CLR), C# Syntax, Windows Forms, Event-Driven Programming, and ADO.NET Data Access.",
    "units": [
      {
        "id": "bca502-u1",
        "title": "Unit 1: Fundamentals & Theoretical Foundations of Application Development with C#",
        "description": "Core concepts, definitions, architectural principles, and foundational theory for Application Development with C# & .NET.",
        "topics": [
          {
            "id": "bca502-u1-t1",
            "title": "Core Principles and Architecture of Application Development with C# & .NET",
            "simpleExplanation": "This topic covers the fundamental principles, design patterns, and operational foundations of Application Development with C# & .NET required for university examinations and technical interviews.",
            "detailedExplanation": "## 1. Overview & Architectural Importance\n\nApplication Development with C# & .NET (BCA502) is a core subject in the Bachelor of Computer Applications curriculum. It provides essential theoretical depth and hands-on practical competence.\n\n### Key Conceptual Pillars\n1. **Theoretical Foundations**: Rigorous understanding of underlying mathematical models, protocols, and algorithm complexity.\n2. **Industry Relevance**: Real-world application in modern software engineering, web architectures, enterprise systems, and data pipelines.\n3. **Exam Focus**: Solved analytical derivations, step-by-step numerical problems, and standard university question patterns.",
            "keyPoints": [
              "Standard university curriculum mapped for Application Development with C# & .NET.",
              "Covers essential theoretical and practical examination blueprints.",
              "Includes comprehensive model answers and high-yield MCQs."
            ],
            "theoryQuestions": [
              {
                "question": "Explain the fundamental architecture and importance of Application Development with C# & .NET in modern computer applications.",
                "marks": "7 Marks",
                "answer": "Application Development with C# & .NET (BCA502) forms a foundational pillar in computer science by bridging low-level computation with high-level software abstractions. Students must understand its architectural components, lifecycle, and best practices."
              }
            ],
            "mcqs": [
              {
                "question": "Which of the following best describes the primary objective of Application Development with C# & .NET?",
                "options": [
                  "To provide systematic foundations for computing systems",
                  "Only for hardware manufacturing",
                  "Exclusively for theoretical proofs",
                  "None of the above"
                ],
                "correctIndex": 0,
                "explanation": "Application Development with C# & .NET equips students with systematic, industry-ready computational problem-solving skills."
              }
            ]
          },
          {
            "id": "bca502-u1-t2",
            "title": "Key Methodologies, Implementations & Solved Examples for Application Development with C# & .NET",
            "simpleExplanation": "Step-by-step breakdown of core algorithms, execution lifecycle, and practical problem-solving methodologies for Application Development with C# & .NET.",
            "detailedExplanation": "## Practical Implementation & Algorithmic Analysis\n\nIn this topic, we analyze real-world implementations, edge cases, and standard university numerical problems related to Application Development with C# & .NET.\n\n### Implementation Best Practices\n- Maintain clean modular structure and rigorous separation of concerns.\n- Optimize algorithmic time and space complexity.\n- Implement robust error handling and boundary validation.",
            "keyPoints": [
              "Comprehensive problem-solving methodology with step-by-step derivations.",
              "Focus on time/space complexity optimization.",
              "Standard high-yield university question pattern."
            ],
            "theoryQuestions": [
              {
                "question": "Describe the step-by-step problem-solving lifecycle used in Application Development with C# & .NET.",
                "marks": "5 Marks",
                "answer": "The methodology involves requirement analysis, mathematical or algorithmic formalization, implementation verification, boundary testing, and performance profiling."
              }
            ],
            "mcqs": [
              {
                "question": "What is the key factor when analyzing algorithms and system implementations?",
                "options": [
                  "Time and space complexity",
                  "Number of lines of comments",
                  "Font size of source code",
                  "Color scheme of IDE"
                ],
                "correctIndex": 0,
                "explanation": "Asymptotic time and space efficiency dictate the scalability and real-world viability of computing solutions."
              }
            ]
          }
        ]
      },
      {
        "id": "bca502-u2",
        "title": "Unit 2: Advanced Concepts & Industry Applications of Application Development with C#",
        "description": "In-depth analysis of advanced patterns, performance tuning, and practical applications of Application Development with C# & .NET.",
        "topics": [
          {
            "id": "bca502-u2-t1",
            "title": "Advanced Architecture, Security & Optimization in Application Development with C# & .NET",
            "simpleExplanation": "Explores advanced architectural optimizations, security controls, and enterprise-grade deployment considerations for Application Development with C# & .NET.",
            "detailedExplanation": "## Advanced Engineering & System Optimization\n\nThis unit explores high-performance paradigms, scalability strategies, fault tolerance, and security mechanisms within Application Development with C# & .NET.\n\n### Optimization Strategies\n1. **Resource Efficiency**: Minimizing memory footprint and CPU instruction count.\n2. **Concurrency & Throughput**: Safe multi-threaded or asynchronous execution.\n3. **Security Posture**: Defending against malicious inputs, buffer overflows, and unauthorized access.",
            "keyPoints": [
              "Enterprise-grade optimization and scalability techniques.",
              "Security controls and defensive coding best practices.",
              "Exam-tested analytical comparison tables."
            ],
            "theoryQuestions": [
              {
                "question": "Discuss advanced optimization techniques and security best practices relevant to Application Development with C# & .NET.",
                "marks": "7 Marks",
                "answer": "Optimization requires profiling system bottlenecks, implementing efficient caching, choosing optimal data representations, and enforcing strict input validation."
              }
            ],
            "mcqs": [
              {
                "question": "Which principle is fundamental to securing modern computing systems?",
                "options": [
                  "Principle of Least Privilege",
                  "Running all services as root",
                  "Hardcoding passwords in source files",
                  "Disabling firewall rules"
                ],
                "correctIndex": 0,
                "explanation": "The Principle of Least Privilege ensures entities operate using only the minimal permissions necessary to perform their legitimate function."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "bca503-mobile-android",
    "name": "Mobile Application Development (Android)",
    "code": "BCA503",
    "color": "bg-emerald-600",
    "icon": "smartphone",
    "semester": 5,
    "description": "Comprehensive University BCA Syllabus for Mobile Application Development (Android) \u2014 Android Architecture, Activity Lifecycle, UI Layouts, RecyclerView, Room Database, Background Services, and RESTful APIs.",
    "units": [
      {
        "id": "bca503-u1",
        "title": "Unit 1: Fundamentals & Theoretical Foundations of Mobile Application Development",
        "description": "Core concepts, definitions, architectural principles, and foundational theory for Mobile Application Development (Android).",
        "topics": [
          {
            "id": "bca503-u1-t1",
            "title": "Core Principles and Architecture of Mobile Application Development",
            "simpleExplanation": "This topic covers the fundamental principles, design patterns, and operational foundations of Mobile Application Development (Android) required for university examinations and technical interviews.",
            "detailedExplanation": "## 1. Overview & Architectural Importance\n\nMobile Application Development (Android) (BCA503) is a core subject in the Bachelor of Computer Applications curriculum. It provides essential theoretical depth and hands-on practical competence.\n\n### Key Conceptual Pillars\n1. **Theoretical Foundations**: Rigorous understanding of underlying mathematical models, protocols, and algorithm complexity.\n2. **Industry Relevance**: Real-world application in modern software engineering, web architectures, enterprise systems, and data pipelines.\n3. **Exam Focus**: Solved analytical derivations, step-by-step numerical problems, and standard university question patterns.",
            "keyPoints": [
              "Standard university curriculum mapped for Mobile Application Development (Android).",
              "Covers essential theoretical and practical examination blueprints.",
              "Includes comprehensive model answers and high-yield MCQs."
            ],
            "theoryQuestions": [
              {
                "question": "Explain the fundamental architecture and importance of Mobile Application Development (Android) in modern computer applications.",
                "marks": "7 Marks",
                "answer": "Mobile Application Development (Android) (BCA503) forms a foundational pillar in computer science by bridging low-level computation with high-level software abstractions. Students must understand its architectural components, lifecycle, and best practices."
              }
            ],
            "mcqs": [
              {
                "question": "Which of the following best describes the primary objective of Mobile Application Development (Android)?",
                "options": [
                  "To provide systematic foundations for computing systems",
                  "Only for hardware manufacturing",
                  "Exclusively for theoretical proofs",
                  "None of the above"
                ],
                "correctIndex": 0,
                "explanation": "Mobile Application Development (Android) equips students with systematic, industry-ready computational problem-solving skills."
              }
            ]
          },
          {
            "id": "bca503-u1-t2",
            "title": "Key Methodologies, Implementations & Solved Examples for Mobile Application Development",
            "simpleExplanation": "Step-by-step breakdown of core algorithms, execution lifecycle, and practical problem-solving methodologies for Mobile Application Development (Android).",
            "detailedExplanation": "## Practical Implementation & Algorithmic Analysis\n\nIn this topic, we analyze real-world implementations, edge cases, and standard university numerical problems related to Mobile Application Development (Android).\n\n### Implementation Best Practices\n- Maintain clean modular structure and rigorous separation of concerns.\n- Optimize algorithmic time and space complexity.\n- Implement robust error handling and boundary validation.",
            "keyPoints": [
              "Comprehensive problem-solving methodology with step-by-step derivations.",
              "Focus on time/space complexity optimization.",
              "Standard high-yield university question pattern."
            ],
            "theoryQuestions": [
              {
                "question": "Describe the step-by-step problem-solving lifecycle used in Mobile Application Development (Android).",
                "marks": "5 Marks",
                "answer": "The methodology involves requirement analysis, mathematical or algorithmic formalization, implementation verification, boundary testing, and performance profiling."
              }
            ],
            "mcqs": [
              {
                "question": "What is the key factor when analyzing algorithms and system implementations?",
                "options": [
                  "Time and space complexity",
                  "Number of lines of comments",
                  "Font size of source code",
                  "Color scheme of IDE"
                ],
                "correctIndex": 0,
                "explanation": "Asymptotic time and space efficiency dictate the scalability and real-world viability of computing solutions."
              }
            ]
          }
        ]
      },
      {
        "id": "bca503-u2",
        "title": "Unit 2: Advanced Concepts & Industry Applications of Mobile Application Development",
        "description": "In-depth analysis of advanced patterns, performance tuning, and practical applications of Mobile Application Development (Android).",
        "topics": [
          {
            "id": "bca503-u2-t1",
            "title": "Advanced Architecture, Security & Optimization in Mobile Application Development",
            "simpleExplanation": "Explores advanced architectural optimizations, security controls, and enterprise-grade deployment considerations for Mobile Application Development (Android).",
            "detailedExplanation": "## Advanced Engineering & System Optimization\n\nThis unit explores high-performance paradigms, scalability strategies, fault tolerance, and security mechanisms within Mobile Application Development (Android).\n\n### Optimization Strategies\n1. **Resource Efficiency**: Minimizing memory footprint and CPU instruction count.\n2. **Concurrency & Throughput**: Safe multi-threaded or asynchronous execution.\n3. **Security Posture**: Defending against malicious inputs, buffer overflows, and unauthorized access.",
            "keyPoints": [
              "Enterprise-grade optimization and scalability techniques.",
              "Security controls and defensive coding best practices.",
              "Exam-tested analytical comparison tables."
            ],
            "theoryQuestions": [
              {
                "question": "Discuss advanced optimization techniques and security best practices relevant to Mobile Application Development (Android).",
                "marks": "7 Marks",
                "answer": "Optimization requires profiling system bottlenecks, implementing efficient caching, choosing optimal data representations, and enforcing strict input validation."
              }
            ],
            "mcqs": [
              {
                "question": "Which principle is fundamental to securing modern computing systems?",
                "options": [
                  "Principle of Least Privilege",
                  "Running all services as root",
                  "Hardcoding passwords in source files",
                  "Disabling firewall rules"
                ],
                "correctIndex": 0,
                "explanation": "The Principle of Least Privilege ensures entities operate using only the minimal permissions necessary to perform their legitimate function."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "bca504-cloud-computing",
    "name": "Cloud Computing Foundations",
    "code": "BCA504",
    "color": "bg-sky-600",
    "icon": "cloud",
    "semester": 5,
    "description": "Comprehensive University BCA Syllabus for Cloud Computing Foundations \u2014 Cloud Service Models (IaaS, PaaS, SaaS), Virtualization, Hypervisors, Containerization with Docker, and Serverless Computing.",
    "units": [
      {
        "id": "bca504-u1",
        "title": "Unit 1: Fundamentals & Theoretical Foundations of Cloud Computing Foundations",
        "description": "Core concepts, definitions, architectural principles, and foundational theory for Cloud Computing Foundations.",
        "topics": [
          {
            "id": "bca504-u1-t1",
            "title": "Core Principles and Architecture of Cloud Computing Foundations",
            "simpleExplanation": "This topic covers the fundamental principles, design patterns, and operational foundations of Cloud Computing Foundations required for university examinations and technical interviews.",
            "detailedExplanation": "## 1. Overview & Architectural Importance\n\nCloud Computing Foundations (BCA504) is a core subject in the Bachelor of Computer Applications curriculum. It provides essential theoretical depth and hands-on practical competence.\n\n### Key Conceptual Pillars\n1. **Theoretical Foundations**: Rigorous understanding of underlying mathematical models, protocols, and algorithm complexity.\n2. **Industry Relevance**: Real-world application in modern software engineering, web architectures, enterprise systems, and data pipelines.\n3. **Exam Focus**: Solved analytical derivations, step-by-step numerical problems, and standard university question patterns.",
            "keyPoints": [
              "Standard university curriculum mapped for Cloud Computing Foundations.",
              "Covers essential theoretical and practical examination blueprints.",
              "Includes comprehensive model answers and high-yield MCQs."
            ],
            "theoryQuestions": [
              {
                "question": "Explain the fundamental architecture and importance of Cloud Computing Foundations in modern computer applications.",
                "marks": "7 Marks",
                "answer": "Cloud Computing Foundations (BCA504) forms a foundational pillar in computer science by bridging low-level computation with high-level software abstractions. Students must understand its architectural components, lifecycle, and best practices."
              }
            ],
            "mcqs": [
              {
                "question": "Which of the following best describes the primary objective of Cloud Computing Foundations?",
                "options": [
                  "To provide systematic foundations for computing systems",
                  "Only for hardware manufacturing",
                  "Exclusively for theoretical proofs",
                  "None of the above"
                ],
                "correctIndex": 0,
                "explanation": "Cloud Computing Foundations equips students with systematic, industry-ready computational problem-solving skills."
              }
            ]
          },
          {
            "id": "bca504-u1-t2",
            "title": "Key Methodologies, Implementations & Solved Examples for Cloud Computing Foundations",
            "simpleExplanation": "Step-by-step breakdown of core algorithms, execution lifecycle, and practical problem-solving methodologies for Cloud Computing Foundations.",
            "detailedExplanation": "## Practical Implementation & Algorithmic Analysis\n\nIn this topic, we analyze real-world implementations, edge cases, and standard university numerical problems related to Cloud Computing Foundations.\n\n### Implementation Best Practices\n- Maintain clean modular structure and rigorous separation of concerns.\n- Optimize algorithmic time and space complexity.\n- Implement robust error handling and boundary validation.",
            "keyPoints": [
              "Comprehensive problem-solving methodology with step-by-step derivations.",
              "Focus on time/space complexity optimization.",
              "Standard high-yield university question pattern."
            ],
            "theoryQuestions": [
              {
                "question": "Describe the step-by-step problem-solving lifecycle used in Cloud Computing Foundations.",
                "marks": "5 Marks",
                "answer": "The methodology involves requirement analysis, mathematical or algorithmic formalization, implementation verification, boundary testing, and performance profiling."
              }
            ],
            "mcqs": [
              {
                "question": "What is the key factor when analyzing algorithms and system implementations?",
                "options": [
                  "Time and space complexity",
                  "Number of lines of comments",
                  "Font size of source code",
                  "Color scheme of IDE"
                ],
                "correctIndex": 0,
                "explanation": "Asymptotic time and space efficiency dictate the scalability and real-world viability of computing solutions."
              }
            ]
          }
        ]
      },
      {
        "id": "bca504-u2",
        "title": "Unit 2: Advanced Concepts & Industry Applications of Cloud Computing Foundations",
        "description": "In-depth analysis of advanced patterns, performance tuning, and practical applications of Cloud Computing Foundations.",
        "topics": [
          {
            "id": "bca504-u2-t1",
            "title": "Advanced Architecture, Security & Optimization in Cloud Computing Foundations",
            "simpleExplanation": "Explores advanced architectural optimizations, security controls, and enterprise-grade deployment considerations for Cloud Computing Foundations.",
            "detailedExplanation": "## Advanced Engineering & System Optimization\n\nThis unit explores high-performance paradigms, scalability strategies, fault tolerance, and security mechanisms within Cloud Computing Foundations.\n\n### Optimization Strategies\n1. **Resource Efficiency**: Minimizing memory footprint and CPU instruction count.\n2. **Concurrency & Throughput**: Safe multi-threaded or asynchronous execution.\n3. **Security Posture**: Defending against malicious inputs, buffer overflows, and unauthorized access.",
            "keyPoints": [
              "Enterprise-grade optimization and scalability techniques.",
              "Security controls and defensive coding best practices.",
              "Exam-tested analytical comparison tables."
            ],
            "theoryQuestions": [
              {
                "question": "Discuss advanced optimization techniques and security best practices relevant to Cloud Computing Foundations.",
                "marks": "7 Marks",
                "answer": "Optimization requires profiling system bottlenecks, implementing efficient caching, choosing optimal data representations, and enforcing strict input validation."
              }
            ],
            "mcqs": [
              {
                "question": "Which principle is fundamental to securing modern computing systems?",
                "options": [
                  "Principle of Least Privilege",
                  "Running all services as root",
                  "Hardcoding passwords in source files",
                  "Disabling firewall rules"
                ],
                "correctIndex": 0,
                "explanation": "The Principle of Least Privilege ensures entities operate using only the minimal permissions necessary to perform their legitimate function."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "bca505-data-mining",
    "name": "Data Warehousing & Data Mining",
    "code": "BCA505",
    "color": "bg-yellow-600",
    "icon": "trending-up",
    "semester": 5,
    "description": "Comprehensive University BCA Syllabus for Data Warehousing & Data Mining \u2014 ETL Pipelines, Star & Snowflake Schemas, OLAP Cubes, Association Rule Mining (Apriori), Decision Trees, and K-Means Clustering.",
    "units": [
      {
        "id": "bca505-u1",
        "title": "Unit 1: Fundamentals & Theoretical Foundations of Data Warehousing",
        "description": "Core concepts, definitions, architectural principles, and foundational theory for Data Warehousing & Data Mining.",
        "topics": [
          {
            "id": "bca505-u1-t1",
            "title": "Core Principles and Architecture of Data Warehousing & Data Mining",
            "simpleExplanation": "This topic covers the fundamental principles, design patterns, and operational foundations of Data Warehousing & Data Mining required for university examinations and technical interviews.",
            "detailedExplanation": "## 1. Overview & Architectural Importance\n\nData Warehousing & Data Mining (BCA505) is a core subject in the Bachelor of Computer Applications curriculum. It provides essential theoretical depth and hands-on practical competence.\n\n### Key Conceptual Pillars\n1. **Theoretical Foundations**: Rigorous understanding of underlying mathematical models, protocols, and algorithm complexity.\n2. **Industry Relevance**: Real-world application in modern software engineering, web architectures, enterprise systems, and data pipelines.\n3. **Exam Focus**: Solved analytical derivations, step-by-step numerical problems, and standard university question patterns.",
            "keyPoints": [
              "Standard university curriculum mapped for Data Warehousing & Data Mining.",
              "Covers essential theoretical and practical examination blueprints.",
              "Includes comprehensive model answers and high-yield MCQs."
            ],
            "theoryQuestions": [
              {
                "question": "Explain the fundamental architecture and importance of Data Warehousing & Data Mining in modern computer applications.",
                "marks": "7 Marks",
                "answer": "Data Warehousing & Data Mining (BCA505) forms a foundational pillar in computer science by bridging low-level computation with high-level software abstractions. Students must understand its architectural components, lifecycle, and best practices."
              }
            ],
            "mcqs": [
              {
                "question": "Which of the following best describes the primary objective of Data Warehousing & Data Mining?",
                "options": [
                  "To provide systematic foundations for computing systems",
                  "Only for hardware manufacturing",
                  "Exclusively for theoretical proofs",
                  "None of the above"
                ],
                "correctIndex": 0,
                "explanation": "Data Warehousing & Data Mining equips students with systematic, industry-ready computational problem-solving skills."
              }
            ]
          },
          {
            "id": "bca505-u1-t2",
            "title": "Key Methodologies, Implementations & Solved Examples for Data Warehousing & Data Mining",
            "simpleExplanation": "Step-by-step breakdown of core algorithms, execution lifecycle, and practical problem-solving methodologies for Data Warehousing & Data Mining.",
            "detailedExplanation": "## Practical Implementation & Algorithmic Analysis\n\nIn this topic, we analyze real-world implementations, edge cases, and standard university numerical problems related to Data Warehousing & Data Mining.\n\n### Implementation Best Practices\n- Maintain clean modular structure and rigorous separation of concerns.\n- Optimize algorithmic time and space complexity.\n- Implement robust error handling and boundary validation.",
            "keyPoints": [
              "Comprehensive problem-solving methodology with step-by-step derivations.",
              "Focus on time/space complexity optimization.",
              "Standard high-yield university question pattern."
            ],
            "theoryQuestions": [
              {
                "question": "Describe the step-by-step problem-solving lifecycle used in Data Warehousing & Data Mining.",
                "marks": "5 Marks",
                "answer": "The methodology involves requirement analysis, mathematical or algorithmic formalization, implementation verification, boundary testing, and performance profiling."
              }
            ],
            "mcqs": [
              {
                "question": "What is the key factor when analyzing algorithms and system implementations?",
                "options": [
                  "Time and space complexity",
                  "Number of lines of comments",
                  "Font size of source code",
                  "Color scheme of IDE"
                ],
                "correctIndex": 0,
                "explanation": "Asymptotic time and space efficiency dictate the scalability and real-world viability of computing solutions."
              }
            ]
          }
        ]
      },
      {
        "id": "bca505-u2",
        "title": "Unit 2: Advanced Concepts & Industry Applications of Data Warehousing",
        "description": "In-depth analysis of advanced patterns, performance tuning, and practical applications of Data Warehousing & Data Mining.",
        "topics": [
          {
            "id": "bca505-u2-t1",
            "title": "Advanced Architecture, Security & Optimization in Data Warehousing & Data Mining",
            "simpleExplanation": "Explores advanced architectural optimizations, security controls, and enterprise-grade deployment considerations for Data Warehousing & Data Mining.",
            "detailedExplanation": "## Advanced Engineering & System Optimization\n\nThis unit explores high-performance paradigms, scalability strategies, fault tolerance, and security mechanisms within Data Warehousing & Data Mining.\n\n### Optimization Strategies\n1. **Resource Efficiency**: Minimizing memory footprint and CPU instruction count.\n2. **Concurrency & Throughput**: Safe multi-threaded or asynchronous execution.\n3. **Security Posture**: Defending against malicious inputs, buffer overflows, and unauthorized access.",
            "keyPoints": [
              "Enterprise-grade optimization and scalability techniques.",
              "Security controls and defensive coding best practices.",
              "Exam-tested analytical comparison tables."
            ],
            "theoryQuestions": [
              {
                "question": "Discuss advanced optimization techniques and security best practices relevant to Data Warehousing & Data Mining.",
                "marks": "7 Marks",
                "answer": "Optimization requires profiling system bottlenecks, implementing efficient caching, choosing optimal data representations, and enforcing strict input validation."
              }
            ],
            "mcqs": [
              {
                "question": "Which principle is fundamental to securing modern computing systems?",
                "options": [
                  "Principle of Least Privilege",
                  "Running all services as root",
                  "Hardcoding passwords in source files",
                  "Disabling firewall rules"
                ],
                "correctIndex": 0,
                "explanation": "The Principle of Least Privilege ensures entities operate using only the minimal permissions necessary to perform their legitimate function."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "bca601-ai-ml",
    "name": "Artificial Intelligence & Machine Learning",
    "code": "BCA601",
    "color": "bg-purple-600",
    "icon": "sparkles",
    "semester": 6,
    "description": "Comprehensive University BCA Syllabus for Artificial Intelligence & Machine Learning \u2014 State Space Search, Heuristics, Supervised Learning (Linear Regression, KNN), Unsupervised Learning, and Neural Networks.",
    "units": [
      {
        "id": "bca601-u1",
        "title": "Unit 1: Fundamentals & Theoretical Foundations of Artificial Intelligence",
        "description": "Core concepts, definitions, architectural principles, and foundational theory for Artificial Intelligence & Machine Learning.",
        "topics": [
          {
            "id": "bca601-u1-t1",
            "title": "Core Principles and Architecture of Artificial Intelligence & Machine Learning",
            "simpleExplanation": "This topic covers the fundamental principles, design patterns, and operational foundations of Artificial Intelligence & Machine Learning required for university examinations and technical interviews.",
            "detailedExplanation": "## 1. Overview & Architectural Importance\n\nArtificial Intelligence & Machine Learning (BCA601) is a core subject in the Bachelor of Computer Applications curriculum. It provides essential theoretical depth and hands-on practical competence.\n\n### Key Conceptual Pillars\n1. **Theoretical Foundations**: Rigorous understanding of underlying mathematical models, protocols, and algorithm complexity.\n2. **Industry Relevance**: Real-world application in modern software engineering, web architectures, enterprise systems, and data pipelines.\n3. **Exam Focus**: Solved analytical derivations, step-by-step numerical problems, and standard university question patterns.",
            "keyPoints": [
              "Standard university curriculum mapped for Artificial Intelligence & Machine Learning.",
              "Covers essential theoretical and practical examination blueprints.",
              "Includes comprehensive model answers and high-yield MCQs."
            ],
            "theoryQuestions": [
              {
                "question": "Explain the fundamental architecture and importance of Artificial Intelligence & Machine Learning in modern computer applications.",
                "marks": "7 Marks",
                "answer": "Artificial Intelligence & Machine Learning (BCA601) forms a foundational pillar in computer science by bridging low-level computation with high-level software abstractions. Students must understand its architectural components, lifecycle, and best practices."
              }
            ],
            "mcqs": [
              {
                "question": "Which of the following best describes the primary objective of Artificial Intelligence & Machine Learning?",
                "options": [
                  "To provide systematic foundations for computing systems",
                  "Only for hardware manufacturing",
                  "Exclusively for theoretical proofs",
                  "None of the above"
                ],
                "correctIndex": 0,
                "explanation": "Artificial Intelligence & Machine Learning equips students with systematic, industry-ready computational problem-solving skills."
              }
            ]
          },
          {
            "id": "bca601-u1-t2",
            "title": "Key Methodologies, Implementations & Solved Examples for Artificial Intelligence & Machine Learning",
            "simpleExplanation": "Step-by-step breakdown of core algorithms, execution lifecycle, and practical problem-solving methodologies for Artificial Intelligence & Machine Learning.",
            "detailedExplanation": "## Practical Implementation & Algorithmic Analysis\n\nIn this topic, we analyze real-world implementations, edge cases, and standard university numerical problems related to Artificial Intelligence & Machine Learning.\n\n### Implementation Best Practices\n- Maintain clean modular structure and rigorous separation of concerns.\n- Optimize algorithmic time and space complexity.\n- Implement robust error handling and boundary validation.",
            "keyPoints": [
              "Comprehensive problem-solving methodology with step-by-step derivations.",
              "Focus on time/space complexity optimization.",
              "Standard high-yield university question pattern."
            ],
            "theoryQuestions": [
              {
                "question": "Describe the step-by-step problem-solving lifecycle used in Artificial Intelligence & Machine Learning.",
                "marks": "5 Marks",
                "answer": "The methodology involves requirement analysis, mathematical or algorithmic formalization, implementation verification, boundary testing, and performance profiling."
              }
            ],
            "mcqs": [
              {
                "question": "What is the key factor when analyzing algorithms and system implementations?",
                "options": [
                  "Time and space complexity",
                  "Number of lines of comments",
                  "Font size of source code",
                  "Color scheme of IDE"
                ],
                "correctIndex": 0,
                "explanation": "Asymptotic time and space efficiency dictate the scalability and real-world viability of computing solutions."
              }
            ]
          }
        ]
      },
      {
        "id": "bca601-u2",
        "title": "Unit 2: Advanced Concepts & Industry Applications of Artificial Intelligence",
        "description": "In-depth analysis of advanced patterns, performance tuning, and practical applications of Artificial Intelligence & Machine Learning.",
        "topics": [
          {
            "id": "bca601-u2-t1",
            "title": "Advanced Architecture, Security & Optimization in Artificial Intelligence & Machine Learning",
            "simpleExplanation": "Explores advanced architectural optimizations, security controls, and enterprise-grade deployment considerations for Artificial Intelligence & Machine Learning.",
            "detailedExplanation": "## Advanced Engineering & System Optimization\n\nThis unit explores high-performance paradigms, scalability strategies, fault tolerance, and security mechanisms within Artificial Intelligence & Machine Learning.\n\n### Optimization Strategies\n1. **Resource Efficiency**: Minimizing memory footprint and CPU instruction count.\n2. **Concurrency & Throughput**: Safe multi-threaded or asynchronous execution.\n3. **Security Posture**: Defending against malicious inputs, buffer overflows, and unauthorized access.",
            "keyPoints": [
              "Enterprise-grade optimization and scalability techniques.",
              "Security controls and defensive coding best practices.",
              "Exam-tested analytical comparison tables."
            ],
            "theoryQuestions": [
              {
                "question": "Discuss advanced optimization techniques and security best practices relevant to Artificial Intelligence & Machine Learning.",
                "marks": "7 Marks",
                "answer": "Optimization requires profiling system bottlenecks, implementing efficient caching, choosing optimal data representations, and enforcing strict input validation."
              }
            ],
            "mcqs": [
              {
                "question": "Which principle is fundamental to securing modern computing systems?",
                "options": [
                  "Principle of Least Privilege",
                  "Running all services as root",
                  "Hardcoding passwords in source files",
                  "Disabling firewall rules"
                ],
                "correctIndex": 0,
                "explanation": "The Principle of Least Privilege ensures entities operate using only the minimal permissions necessary to perform their legitimate function."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "bca602-cyber-security",
    "name": "Information Security & Cryptography",
    "code": "BCA602",
    "color": "bg-red-600",
    "icon": "shield-alert",
    "semester": 6,
    "description": "Comprehensive University BCA Syllabus for Information Security & Cryptography \u2014 CIA Triad, Symmetric vs Asymmetric Cryptography (AES, RSA), Digital Signatures, Firewalls, and Vulnerability Assessment.",
    "units": [
      {
        "id": "bca602-u1",
        "title": "Unit 1: Fundamentals & Theoretical Foundations of Information Security",
        "description": "Core concepts, definitions, architectural principles, and foundational theory for Information Security & Cryptography.",
        "topics": [
          {
            "id": "bca602-u1-t1",
            "title": "Core Principles and Architecture of Information Security & Cryptography",
            "simpleExplanation": "This topic covers the fundamental principles, design patterns, and operational foundations of Information Security & Cryptography required for university examinations and technical interviews.",
            "detailedExplanation": "## 1. Overview & Architectural Importance\n\nInformation Security & Cryptography (BCA602) is a core subject in the Bachelor of Computer Applications curriculum. It provides essential theoretical depth and hands-on practical competence.\n\n### Key Conceptual Pillars\n1. **Theoretical Foundations**: Rigorous understanding of underlying mathematical models, protocols, and algorithm complexity.\n2. **Industry Relevance**: Real-world application in modern software engineering, web architectures, enterprise systems, and data pipelines.\n3. **Exam Focus**: Solved analytical derivations, step-by-step numerical problems, and standard university question patterns.",
            "keyPoints": [
              "Standard university curriculum mapped for Information Security & Cryptography.",
              "Covers essential theoretical and practical examination blueprints.",
              "Includes comprehensive model answers and high-yield MCQs."
            ],
            "theoryQuestions": [
              {
                "question": "Explain the fundamental architecture and importance of Information Security & Cryptography in modern computer applications.",
                "marks": "7 Marks",
                "answer": "Information Security & Cryptography (BCA602) forms a foundational pillar in computer science by bridging low-level computation with high-level software abstractions. Students must understand its architectural components, lifecycle, and best practices."
              }
            ],
            "mcqs": [
              {
                "question": "Which of the following best describes the primary objective of Information Security & Cryptography?",
                "options": [
                  "To provide systematic foundations for computing systems",
                  "Only for hardware manufacturing",
                  "Exclusively for theoretical proofs",
                  "None of the above"
                ],
                "correctIndex": 0,
                "explanation": "Information Security & Cryptography equips students with systematic, industry-ready computational problem-solving skills."
              }
            ]
          },
          {
            "id": "bca602-u1-t2",
            "title": "Key Methodologies, Implementations & Solved Examples for Information Security & Cryptography",
            "simpleExplanation": "Step-by-step breakdown of core algorithms, execution lifecycle, and practical problem-solving methodologies for Information Security & Cryptography.",
            "detailedExplanation": "## Practical Implementation & Algorithmic Analysis\n\nIn this topic, we analyze real-world implementations, edge cases, and standard university numerical problems related to Information Security & Cryptography.\n\n### Implementation Best Practices\n- Maintain clean modular structure and rigorous separation of concerns.\n- Optimize algorithmic time and space complexity.\n- Implement robust error handling and boundary validation.",
            "keyPoints": [
              "Comprehensive problem-solving methodology with step-by-step derivations.",
              "Focus on time/space complexity optimization.",
              "Standard high-yield university question pattern."
            ],
            "theoryQuestions": [
              {
                "question": "Describe the step-by-step problem-solving lifecycle used in Information Security & Cryptography.",
                "marks": "5 Marks",
                "answer": "The methodology involves requirement analysis, mathematical or algorithmic formalization, implementation verification, boundary testing, and performance profiling."
              }
            ],
            "mcqs": [
              {
                "question": "What is the key factor when analyzing algorithms and system implementations?",
                "options": [
                  "Time and space complexity",
                  "Number of lines of comments",
                  "Font size of source code",
                  "Color scheme of IDE"
                ],
                "correctIndex": 0,
                "explanation": "Asymptotic time and space efficiency dictate the scalability and real-world viability of computing solutions."
              }
            ]
          }
        ]
      },
      {
        "id": "bca602-u2",
        "title": "Unit 2: Advanced Concepts & Industry Applications of Information Security",
        "description": "In-depth analysis of advanced patterns, performance tuning, and practical applications of Information Security & Cryptography.",
        "topics": [
          {
            "id": "bca602-u2-t1",
            "title": "Advanced Architecture, Security & Optimization in Information Security & Cryptography",
            "simpleExplanation": "Explores advanced architectural optimizations, security controls, and enterprise-grade deployment considerations for Information Security & Cryptography.",
            "detailedExplanation": "## Advanced Engineering & System Optimization\n\nThis unit explores high-performance paradigms, scalability strategies, fault tolerance, and security mechanisms within Information Security & Cryptography.\n\n### Optimization Strategies\n1. **Resource Efficiency**: Minimizing memory footprint and CPU instruction count.\n2. **Concurrency & Throughput**: Safe multi-threaded or asynchronous execution.\n3. **Security Posture**: Defending against malicious inputs, buffer overflows, and unauthorized access.",
            "keyPoints": [
              "Enterprise-grade optimization and scalability techniques.",
              "Security controls and defensive coding best practices.",
              "Exam-tested analytical comparison tables."
            ],
            "theoryQuestions": [
              {
                "question": "Discuss advanced optimization techniques and security best practices relevant to Information Security & Cryptography.",
                "marks": "7 Marks",
                "answer": "Optimization requires profiling system bottlenecks, implementing efficient caching, choosing optimal data representations, and enforcing strict input validation."
              }
            ],
            "mcqs": [
              {
                "question": "Which principle is fundamental to securing modern computing systems?",
                "options": [
                  "Principle of Least Privilege",
                  "Running all services as root",
                  "Hardcoding passwords in source files",
                  "Disabling firewall rules"
                ],
                "correctIndex": 0,
                "explanation": "The Principle of Least Privilege ensures entities operate using only the minimal permissions necessary to perform their legitimate function."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "bca603-big-data",
    "name": "Big Data Analytics & Hadoop",
    "code": "BCA603",
    "color": "bg-amber-600",
    "icon": "pie-chart",
    "semester": 6,
    "description": "Comprehensive University BCA Syllabus for Big Data Analytics & Hadoop \u2014 The 5 Vs of Big Data, Hadoop Distributed File System (HDFS), MapReduce Processing, Apache Spark, and NoSQL MongoDB.",
    "units": [
      {
        "id": "bca603-u1",
        "title": "Unit 1: Fundamentals & Theoretical Foundations of Big Data Analytics",
        "description": "Core concepts, definitions, architectural principles, and foundational theory for Big Data Analytics & Hadoop.",
        "topics": [
          {
            "id": "bca603-u1-t1",
            "title": "Core Principles and Architecture of Big Data Analytics & Hadoop",
            "simpleExplanation": "This topic covers the fundamental principles, design patterns, and operational foundations of Big Data Analytics & Hadoop required for university examinations and technical interviews.",
            "detailedExplanation": "## 1. Overview & Architectural Importance\n\nBig Data Analytics & Hadoop (BCA603) is a core subject in the Bachelor of Computer Applications curriculum. It provides essential theoretical depth and hands-on practical competence.\n\n### Key Conceptual Pillars\n1. **Theoretical Foundations**: Rigorous understanding of underlying mathematical models, protocols, and algorithm complexity.\n2. **Industry Relevance**: Real-world application in modern software engineering, web architectures, enterprise systems, and data pipelines.\n3. **Exam Focus**: Solved analytical derivations, step-by-step numerical problems, and standard university question patterns.",
            "keyPoints": [
              "Standard university curriculum mapped for Big Data Analytics & Hadoop.",
              "Covers essential theoretical and practical examination blueprints.",
              "Includes comprehensive model answers and high-yield MCQs."
            ],
            "theoryQuestions": [
              {
                "question": "Explain the fundamental architecture and importance of Big Data Analytics & Hadoop in modern computer applications.",
                "marks": "7 Marks",
                "answer": "Big Data Analytics & Hadoop (BCA603) forms a foundational pillar in computer science by bridging low-level computation with high-level software abstractions. Students must understand its architectural components, lifecycle, and best practices."
              }
            ],
            "mcqs": [
              {
                "question": "Which of the following best describes the primary objective of Big Data Analytics & Hadoop?",
                "options": [
                  "To provide systematic foundations for computing systems",
                  "Only for hardware manufacturing",
                  "Exclusively for theoretical proofs",
                  "None of the above"
                ],
                "correctIndex": 0,
                "explanation": "Big Data Analytics & Hadoop equips students with systematic, industry-ready computational problem-solving skills."
              }
            ]
          },
          {
            "id": "bca603-u1-t2",
            "title": "Key Methodologies, Implementations & Solved Examples for Big Data Analytics & Hadoop",
            "simpleExplanation": "Step-by-step breakdown of core algorithms, execution lifecycle, and practical problem-solving methodologies for Big Data Analytics & Hadoop.",
            "detailedExplanation": "## Practical Implementation & Algorithmic Analysis\n\nIn this topic, we analyze real-world implementations, edge cases, and standard university numerical problems related to Big Data Analytics & Hadoop.\n\n### Implementation Best Practices\n- Maintain clean modular structure and rigorous separation of concerns.\n- Optimize algorithmic time and space complexity.\n- Implement robust error handling and boundary validation.",
            "keyPoints": [
              "Comprehensive problem-solving methodology with step-by-step derivations.",
              "Focus on time/space complexity optimization.",
              "Standard high-yield university question pattern."
            ],
            "theoryQuestions": [
              {
                "question": "Describe the step-by-step problem-solving lifecycle used in Big Data Analytics & Hadoop.",
                "marks": "5 Marks",
                "answer": "The methodology involves requirement analysis, mathematical or algorithmic formalization, implementation verification, boundary testing, and performance profiling."
              }
            ],
            "mcqs": [
              {
                "question": "What is the key factor when analyzing algorithms and system implementations?",
                "options": [
                  "Time and space complexity",
                  "Number of lines of comments",
                  "Font size of source code",
                  "Color scheme of IDE"
                ],
                "correctIndex": 0,
                "explanation": "Asymptotic time and space efficiency dictate the scalability and real-world viability of computing solutions."
              }
            ]
          }
        ]
      },
      {
        "id": "bca603-u2",
        "title": "Unit 2: Advanced Concepts & Industry Applications of Big Data Analytics",
        "description": "In-depth analysis of advanced patterns, performance tuning, and practical applications of Big Data Analytics & Hadoop.",
        "topics": [
          {
            "id": "bca603-u2-t1",
            "title": "Advanced Architecture, Security & Optimization in Big Data Analytics & Hadoop",
            "simpleExplanation": "Explores advanced architectural optimizations, security controls, and enterprise-grade deployment considerations for Big Data Analytics & Hadoop.",
            "detailedExplanation": "## Advanced Engineering & System Optimization\n\nThis unit explores high-performance paradigms, scalability strategies, fault tolerance, and security mechanisms within Big Data Analytics & Hadoop.\n\n### Optimization Strategies\n1. **Resource Efficiency**: Minimizing memory footprint and CPU instruction count.\n2. **Concurrency & Throughput**: Safe multi-threaded or asynchronous execution.\n3. **Security Posture**: Defending against malicious inputs, buffer overflows, and unauthorized access.",
            "keyPoints": [
              "Enterprise-grade optimization and scalability techniques.",
              "Security controls and defensive coding best practices.",
              "Exam-tested analytical comparison tables."
            ],
            "theoryQuestions": [
              {
                "question": "Discuss advanced optimization techniques and security best practices relevant to Big Data Analytics & Hadoop.",
                "marks": "7 Marks",
                "answer": "Optimization requires profiling system bottlenecks, implementing efficient caching, choosing optimal data representations, and enforcing strict input validation."
              }
            ],
            "mcqs": [
              {
                "question": "Which principle is fundamental to securing modern computing systems?",
                "options": [
                  "Principle of Least Privilege",
                  "Running all services as root",
                  "Hardcoding passwords in source files",
                  "Disabling firewall rules"
                ],
                "correctIndex": 0,
                "explanation": "The Principle of Least Privilege ensures entities operate using only the minimal permissions necessary to perform their legitimate function."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "bca604-mern-stack",
    "name": "Full Stack MERN Development",
    "code": "BCA604",
    "color": "bg-emerald-600",
    "icon": "layers",
    "semester": 6,
    "description": "Comprehensive University BCA Syllabus for Full Stack MERN Development \u2014 Full Stack Architecture: MongoDB Schemas, Express Routing Middleware, React Component Hooks, and Node.js RESTful Services.",
    "units": [
      {
        "id": "bca604-u1",
        "title": "Unit 1: Fundamentals & Theoretical Foundations of Full Stack MERN Development",
        "description": "Core concepts, definitions, architectural principles, and foundational theory for Full Stack MERN Development.",
        "topics": [
          {
            "id": "bca604-u1-t1",
            "title": "Core Principles and Architecture of Full Stack MERN Development",
            "simpleExplanation": "This topic covers the fundamental principles, design patterns, and operational foundations of Full Stack MERN Development required for university examinations and technical interviews.",
            "detailedExplanation": "## 1. Overview & Architectural Importance\n\nFull Stack MERN Development (BCA604) is a core subject in the Bachelor of Computer Applications curriculum. It provides essential theoretical depth and hands-on practical competence.\n\n### Key Conceptual Pillars\n1. **Theoretical Foundations**: Rigorous understanding of underlying mathematical models, protocols, and algorithm complexity.\n2. **Industry Relevance**: Real-world application in modern software engineering, web architectures, enterprise systems, and data pipelines.\n3. **Exam Focus**: Solved analytical derivations, step-by-step numerical problems, and standard university question patterns.",
            "keyPoints": [
              "Standard university curriculum mapped for Full Stack MERN Development.",
              "Covers essential theoretical and practical examination blueprints.",
              "Includes comprehensive model answers and high-yield MCQs."
            ],
            "theoryQuestions": [
              {
                "question": "Explain the fundamental architecture and importance of Full Stack MERN Development in modern computer applications.",
                "marks": "7 Marks",
                "answer": "Full Stack MERN Development (BCA604) forms a foundational pillar in computer science by bridging low-level computation with high-level software abstractions. Students must understand its architectural components, lifecycle, and best practices."
              }
            ],
            "mcqs": [
              {
                "question": "Which of the following best describes the primary objective of Full Stack MERN Development?",
                "options": [
                  "To provide systematic foundations for computing systems",
                  "Only for hardware manufacturing",
                  "Exclusively for theoretical proofs",
                  "None of the above"
                ],
                "correctIndex": 0,
                "explanation": "Full Stack MERN Development equips students with systematic, industry-ready computational problem-solving skills."
              }
            ]
          },
          {
            "id": "bca604-u1-t2",
            "title": "Key Methodologies, Implementations & Solved Examples for Full Stack MERN Development",
            "simpleExplanation": "Step-by-step breakdown of core algorithms, execution lifecycle, and practical problem-solving methodologies for Full Stack MERN Development.",
            "detailedExplanation": "## Practical Implementation & Algorithmic Analysis\n\nIn this topic, we analyze real-world implementations, edge cases, and standard university numerical problems related to Full Stack MERN Development.\n\n### Implementation Best Practices\n- Maintain clean modular structure and rigorous separation of concerns.\n- Optimize algorithmic time and space complexity.\n- Implement robust error handling and boundary validation.",
            "keyPoints": [
              "Comprehensive problem-solving methodology with step-by-step derivations.",
              "Focus on time/space complexity optimization.",
              "Standard high-yield university question pattern."
            ],
            "theoryQuestions": [
              {
                "question": "Describe the step-by-step problem-solving lifecycle used in Full Stack MERN Development.",
                "marks": "5 Marks",
                "answer": "The methodology involves requirement analysis, mathematical or algorithmic formalization, implementation verification, boundary testing, and performance profiling."
              }
            ],
            "mcqs": [
              {
                "question": "What is the key factor when analyzing algorithms and system implementations?",
                "options": [
                  "Time and space complexity",
                  "Number of lines of comments",
                  "Font size of source code",
                  "Color scheme of IDE"
                ],
                "correctIndex": 0,
                "explanation": "Asymptotic time and space efficiency dictate the scalability and real-world viability of computing solutions."
              }
            ]
          }
        ]
      },
      {
        "id": "bca604-u2",
        "title": "Unit 2: Advanced Concepts & Industry Applications of Full Stack MERN Development",
        "description": "In-depth analysis of advanced patterns, performance tuning, and practical applications of Full Stack MERN Development.",
        "topics": [
          {
            "id": "bca604-u2-t1",
            "title": "Advanced Architecture, Security & Optimization in Full Stack MERN Development",
            "simpleExplanation": "Explores advanced architectural optimizations, security controls, and enterprise-grade deployment considerations for Full Stack MERN Development.",
            "detailedExplanation": "## Advanced Engineering & System Optimization\n\nThis unit explores high-performance paradigms, scalability strategies, fault tolerance, and security mechanisms within Full Stack MERN Development.\n\n### Optimization Strategies\n1. **Resource Efficiency**: Minimizing memory footprint and CPU instruction count.\n2. **Concurrency & Throughput**: Safe multi-threaded or asynchronous execution.\n3. **Security Posture**: Defending against malicious inputs, buffer overflows, and unauthorized access.",
            "keyPoints": [
              "Enterprise-grade optimization and scalability techniques.",
              "Security controls and defensive coding best practices.",
              "Exam-tested analytical comparison tables."
            ],
            "theoryQuestions": [
              {
                "question": "Discuss advanced optimization techniques and security best practices relevant to Full Stack MERN Development.",
                "marks": "7 Marks",
                "answer": "Optimization requires profiling system bottlenecks, implementing efficient caching, choosing optimal data representations, and enforcing strict input validation."
              }
            ],
            "mcqs": [
              {
                "question": "Which principle is fundamental to securing modern computing systems?",
                "options": [
                  "Principle of Least Privilege",
                  "Running all services as root",
                  "Hardcoding passwords in source files",
                  "Disabling firewall rules"
                ],
                "correctIndex": 0,
                "explanation": "The Principle of Least Privilege ensures entities operate using only the minimal permissions necessary to perform their legitimate function."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "bca605-project-management",
    "name": "Software Project Management & Capstone",
    "code": "BCA605",
    "color": "bg-blue-600",
    "icon": "check-circle",
    "semester": 6,
    "description": "Comprehensive University BCA Syllabus for Software Project Management & Capstone \u2014 Project Scope Management, WBS, Effort Estimation (COCOMO), Gantt Scheduling, Risk Mitigation, and Capstone Project Viva Preparation.",
    "units": [
      {
        "id": "bca605-u1",
        "title": "Unit 1: Fundamentals & Theoretical Foundations of Software Project Management",
        "description": "Core concepts, definitions, architectural principles, and foundational theory for Software Project Management & Capstone.",
        "topics": [
          {
            "id": "bca605-u1-t1",
            "title": "Core Principles and Architecture of Software Project Management & Capstone",
            "simpleExplanation": "This topic covers the fundamental principles, design patterns, and operational foundations of Software Project Management & Capstone required for university examinations and technical interviews.",
            "detailedExplanation": "## 1. Overview & Architectural Importance\n\nSoftware Project Management & Capstone (BCA605) is a core subject in the Bachelor of Computer Applications curriculum. It provides essential theoretical depth and hands-on practical competence.\n\n### Key Conceptual Pillars\n1. **Theoretical Foundations**: Rigorous understanding of underlying mathematical models, protocols, and algorithm complexity.\n2. **Industry Relevance**: Real-world application in modern software engineering, web architectures, enterprise systems, and data pipelines.\n3. **Exam Focus**: Solved analytical derivations, step-by-step numerical problems, and standard university question patterns.",
            "keyPoints": [
              "Standard university curriculum mapped for Software Project Management & Capstone.",
              "Covers essential theoretical and practical examination blueprints.",
              "Includes comprehensive model answers and high-yield MCQs."
            ],
            "theoryQuestions": [
              {
                "question": "Explain the fundamental architecture and importance of Software Project Management & Capstone in modern computer applications.",
                "marks": "7 Marks",
                "answer": "Software Project Management & Capstone (BCA605) forms a foundational pillar in computer science by bridging low-level computation with high-level software abstractions. Students must understand its architectural components, lifecycle, and best practices."
              }
            ],
            "mcqs": [
              {
                "question": "Which of the following best describes the primary objective of Software Project Management & Capstone?",
                "options": [
                  "To provide systematic foundations for computing systems",
                  "Only for hardware manufacturing",
                  "Exclusively for theoretical proofs",
                  "None of the above"
                ],
                "correctIndex": 0,
                "explanation": "Software Project Management & Capstone equips students with systematic, industry-ready computational problem-solving skills."
              }
            ]
          },
          {
            "id": "bca605-u1-t2",
            "title": "Key Methodologies, Implementations & Solved Examples for Software Project Management & Capstone",
            "simpleExplanation": "Step-by-step breakdown of core algorithms, execution lifecycle, and practical problem-solving methodologies for Software Project Management & Capstone.",
            "detailedExplanation": "## Practical Implementation & Algorithmic Analysis\n\nIn this topic, we analyze real-world implementations, edge cases, and standard university numerical problems related to Software Project Management & Capstone.\n\n### Implementation Best Practices\n- Maintain clean modular structure and rigorous separation of concerns.\n- Optimize algorithmic time and space complexity.\n- Implement robust error handling and boundary validation.",
            "keyPoints": [
              "Comprehensive problem-solving methodology with step-by-step derivations.",
              "Focus on time/space complexity optimization.",
              "Standard high-yield university question pattern."
            ],
            "theoryQuestions": [
              {
                "question": "Describe the step-by-step problem-solving lifecycle used in Software Project Management & Capstone.",
                "marks": "5 Marks",
                "answer": "The methodology involves requirement analysis, mathematical or algorithmic formalization, implementation verification, boundary testing, and performance profiling."
              }
            ],
            "mcqs": [
              {
                "question": "What is the key factor when analyzing algorithms and system implementations?",
                "options": [
                  "Time and space complexity",
                  "Number of lines of comments",
                  "Font size of source code",
                  "Color scheme of IDE"
                ],
                "correctIndex": 0,
                "explanation": "Asymptotic time and space efficiency dictate the scalability and real-world viability of computing solutions."
              }
            ]
          }
        ]
      },
      {
        "id": "bca605-u2",
        "title": "Unit 2: Advanced Concepts & Industry Applications of Software Project Management",
        "description": "In-depth analysis of advanced patterns, performance tuning, and practical applications of Software Project Management & Capstone.",
        "topics": [
          {
            "id": "bca605-u2-t1",
            "title": "Advanced Architecture, Security & Optimization in Software Project Management & Capstone",
            "simpleExplanation": "Explores advanced architectural optimizations, security controls, and enterprise-grade deployment considerations for Software Project Management & Capstone.",
            "detailedExplanation": "## Advanced Engineering & System Optimization\n\nThis unit explores high-performance paradigms, scalability strategies, fault tolerance, and security mechanisms within Software Project Management & Capstone.\n\n### Optimization Strategies\n1. **Resource Efficiency**: Minimizing memory footprint and CPU instruction count.\n2. **Concurrency & Throughput**: Safe multi-threaded or asynchronous execution.\n3. **Security Posture**: Defending against malicious inputs, buffer overflows, and unauthorized access.",
            "keyPoints": [
              "Enterprise-grade optimization and scalability techniques.",
              "Security controls and defensive coding best practices.",
              "Exam-tested analytical comparison tables."
            ],
            "theoryQuestions": [
              {
                "question": "Discuss advanced optimization techniques and security best practices relevant to Software Project Management & Capstone.",
                "marks": "7 Marks",
                "answer": "Optimization requires profiling system bottlenecks, implementing efficient caching, choosing optimal data representations, and enforcing strict input validation."
              }
            ],
            "mcqs": [
              {
                "question": "Which principle is fundamental to securing modern computing systems?",
                "options": [
                  "Principle of Least Privilege",
                  "Running all services as root",
                  "Hardcoding passwords in source files",
                  "Disabling firewall rules"
                ],
                "correctIndex": 0,
                "explanation": "The Principle of Least Privilege ensures entities operate using only the minimal permissions necessary to perform their legitimate function."
              }
            ]
          }
        ]
      }
    ]
  }
];
