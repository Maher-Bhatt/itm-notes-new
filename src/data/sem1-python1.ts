import type { Subject } from './types';

export const sem1Python1Subject: Subject = {
  id: 'sem1-python1',
  name: 'Python Programming 1',
  code: 'PY101',
  color: 'bg-emerald-600',
  icon: 'code',
  description: 'Complete University Syllabus for Python Programming 1 — Logic Building, Control Structures, Strings, Collections, Functions, Recursion, and File I/O',
  semester: 1,
  units: [
    {
      id: "py1-u1",
      title: "Unit 1: Problem Solving, Algorithms & Logic Design",
      description: "Fundamental problem-solving methodology, algorithmic formulation, flowchart standards, compilation vs interpretation, and the Python virtual machine architecture.",
      topics: [
        {
          id: "py1-u1-t1",
          title: "Problem Solving Methodology, Algorithms & Characteristics",
          simpleExplanation: "Problem solving in computer science is like writing a foolproof cooking recipe. An algorithm is that exact recipe\u2014a step-by-step list of clear instructions that takes some ingredients (inputs) and produces a delicious meal (output) without ever getting stuck in an infinite loop.",
          detailedExplanation: `## 1. Problem Solving Methodology in Computer Science

Before writing a single line of executable Python code, software engineers and computer scientists follow a disciplined **Problem Solving Life Cycle**. Writing code without algorithmic design is like trying to construct a multi-story building without an architectural blueprint—it leads to bugs, unmaintainable spaghetti code, and logical failures.

### The Six Phases of Problem Solving:
1. **Problem Definition & Understanding:** Clearly identifying what the problem is, what inputs are provided, what constraints exist (e.g., memory limits, execution time), and what the desired output should look like.
2. **Problem Analysis:** Breaking down the complex problem into smaller, manageable sub-problems (decomposition or top-down design) and identifying mathematical formulas or logical relationships.
3. **Algorithm Design & Representation:** Formulating a step-by-step procedure using algorithms, flowcharts, or pseudocode before touching a keyboard.
4. **Implementation (Coding):** Translating the refined algorithm into a high-level programming language such as Python.
5. **Testing & Debugging:** Running the program with varied test datasets (normal inputs, extreme edge cases, invalid inputs) to detect and fix syntax errors, runtime crashes, and logical discrepancies.
6. **Documentation & Maintenance:** Adding inline comments, docstrings, and user manuals so future engineers can enhance the system.

\`\`\`mermaid
flowchart TD
    A["1. Problem Definition
(Identify inputs, constraints & goals)"] --> B["2. Problem Analysis
(Decompose into sub-tasks)"]
    B --> C["3. Algorithm Design
(Pseudocode & Flowcharts)"]
    C --> D["4. Implementation
(Coding in Python)"]
    D --> E["5. Testing & Debugging
(Dry run & test edge cases)"]
    E --> F["6. Maintenance & Docs
(Updates & Docstrings)"]
\`\`\`

---

## 2. What is an Algorithm?

An **Algorithm** is an ordered, unambiguous, finite sequence of computational steps that transforms a given set of inputs into a specified output. 

The word originates from the name of the 9th-century Persian mathematician **Muhammad ibn Musa al-Khwarizmi**, whose works introduced systematic algebraic solutions.

### The Five Essential Characteristics of Every Algorithm (Donald Knuth's Criteria):
Every valid algorithm must satisfy the following five universal criteria:
- **Input:** An algorithm must have zero or more well-defined quantities supplied externally.
- **Output:** An algorithm must produce at least one well-defined result or quantity related to the inputs.
- **Definiteness (Unambiguity):** Each instruction must be clear, crisp, and completely unambiguous. There should be only one interpretation of any step. For example, "add 5 or 6 to X" violates definiteness.
- **Finiteness:** The algorithm must terminate after a finite number of steps for all test cases. An algorithm that loops infinitely is defective.
- **Effectiveness (Feasibility):** Every instruction must be sufficiently basic and feasible, meaning it could, in principle, be carried out by a human using pencil and paper in a finite amount of time.

---

## 3. Algorithm Design Techniques & Desk Checking

### Common Algorithmic Paradigms:
- **Sequential Execution:** Direct linear execution of statements one after the other.
- **Selection (Branching):** Making decisions based on condition evaluations (\`if-else\`).
- **Iteration (Looping):** Repeating a set of instructions until a termination condition is satisfied (\`while\`, \`for\`).
- **Divide and Conquer:** Breaking a large problem into identical smaller subproblems, solving them recursively, and combining results.

### Desk Checking (Dry Running):
A manual verification technique where the programmer sits down with paper and pencil, creates a **Trace Table**, and steps through the algorithm line by line using sample data values. This catches boundary errors (such as off-by-one errors) before runtime.

#### Trace Table Example: Sum of First 3 Natural Numbers
| Step | Instruction | Variable \`n\` | Variable \`i\` | Variable \`total\` | Condition (\`i <= n\`) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | Input \`n = 3\` | 3 | - | - | - |
| 2 | Set \`total = 0\`, \`i = 1\` | 3 | 1 | 0 | - |
| 3 | Loop Condition Check | 3 | 1 | 0 | True (1 <= 3) |
| 4 | \`total = total + i\` | 3 | 1 | 1 | - |
| 5 | \`i = i + 1\` | 3 | 2 | 1 | - |
| 6 | Loop Condition Check | 3 | 2 | 1 | True (2 <= 3) |
| 7 | \`total = total + i\` | 3 | 2 | 3 | - |
| 8 | \`i = i + 1\` | 3 | 3 | 3 | - |
| 9 | Loop Condition Check | 3 | 3 | 3 | True (3 <= 3) |
| 10 | \`total = total + i\` | 3 | 3 | 6 | - |
| 11 | \`i = i + 1\` | 3 | 4 | 6 | - |
| 12 | Loop Condition Check | 3 | 4 | 6 | False (4 <= 3) -> Exit |
| 13 | Output \`total\` (6) | 3 | 4 | 6 | - |

---

## 4. Algorithm vs Pseudocode vs Program

| Attribute | Algorithm | Pseudocode | Computer Program |
| :--- | :--- | :--- | :--- |
| **Definition** | Conceptual, mathematical step-by-step logic | Human-readable semi-formal text resembling code | Machine-executable code written in a specific syntax |
| **Language Dependency** | 100% Language independent | Language independent | Strictly bound to language syntax (e.g., Python, C) |
| **Execution** | Cannot be executed by a machine | Cannot be executed directly | Executed by compiler or interpreter |
| **Target Audience** | Humans (Engineers, Mathematicians) | Programmers designing software | Computers / Compilers / PVM |
| **Rules** | Rigorous logic, no syntax rules | Loose programming conventions, no strict syntax | Strict syntax; even a missing colon causes failure |

> [!IMPORTANT] **MEMORIZE:**
> The five canonical properties of an algorithm are: **Input**, **Output**, **Definiteness**, **Finiteness**, and **Effectiveness** (acronym: **IODFE**). In exams, state Donald Knuth's name when defining these!

> [!NOTE] **DEV BRAIN:**
> Think of an algorithm like a sorting function signature. Pseudocode is the whiteboard scratchpad where you design your pointers. The Python program is the actual PR you submit with unit tests and type annotations.

> [!WARNING] **TRAP:**
> Do NOT write Python code when the exam specifically asks for an "Algorithm" or "Pseudocode". Use formal steps (\`Step 1: Start\`, \`Step 2: Read N\`, etc.). Writing raw Python may cause examiners to deduct marks for not showing language-agnostic logic!

> [!TIP] **EXAM TIP:**
> When asked to formulate an algorithm, always provide: (1) Inputs, (2) Outputs, (3) Numbered steps starting with \`Step 1: Start\` and ending with \`Step N: Stop\`, and (4) A sample dry run trace table.`,
          shortNotes: "Algorithm: Finite, unambiguous step-by-step computational procedure. 5 properties: Input, Output, Definiteness, Finiteness, Effectiveness (Knuth).",
          examples: [
            {
              title: "Algorithm & Python Implementation: Sum of First N Numbers",
              problem: "Write an algorithm and corresponding Python program to calculate the sum of first N positive natural numbers.",
              explanation: "We validate that N is positive, then use an iterative accumulator variable to sum numbers from 1 up to N.",
              code: `# Algorithm Step Representation:
# Step 1: Start
# Step 2: Input positive integer N
# Step 3: Initialize total = 0, counter = 1
# Step 4: While counter <= N do Steps 5 and 6
# Step 5:     total = total + counter
# Step 6:     counter = counter + 1
# Step 7: Output total
# Step 8: Stop

def calculate_sum(n: int) -> int:
    if n < 1:
        raise ValueError("N must be a positive integer.")
    total = 0
    for i in range(1, n + 1):
        total += i
    return total

# Execution
num = 5
result = calculate_sum(num)
print(f"Sum of first {num} natural numbers is: {result}")
# Verification using Gauss formula: n * (n + 1) // 2
print(f"Formula check: {num * (num + 1) // 2}")`,
              output: "Sum of first 5 natural numbers is: 15\nFormula check: 15"
            },
          ],
          keyPoints: [
            "Problem solving follows six stages: Definition, Analysis, Design, Implementation, Testing, and Maintenance.",
            "Donald Knuth defined the 5 characteristics of algorithms: Input, Output, Definiteness, Finiteness, and Effectiveness.",
            "Algorithms are strictly language-agnostic and focus purely on computational logic.",
            "Desk checking uses trace tables to verify variable values step-by-step prior to writing code.",
            "An algorithm must guarantee termination after a finite number of operations."
          ],
          theoryQuestions: [
            {
              question: "Define an algorithm. Explain the five essential characteristics of an algorithm with suitable examples.",
              marks: "5 Marks",
              answer: "An algorithm is a finite, unambiguous, well-defined sequence of computational steps that takes inputs and produces outputs. The five essential characteristics defined by Donald Knuth are:\n1. Input: Zero or more quantities externally supplied.\n2. Output: At least one quantity produced as a result.\n3. Definiteness: Each step must be clear and unambiguous (e.g., 'Divide x by 2', not 'Divide x by 0 or 2').\n4. Finiteness: The algorithm must terminate after a finite number of operations under all circumstances.\n5. Effectiveness: Every operation must be feasible and basic enough to be performed on paper in finite time.",
              keyPoints: ["Definition of algorithm", "Donald Knuth's 5 properties: Input, Output, Definiteness, Finiteness, Effectiveness", "Examples illustrating ambiguity vs definiteness", "Termination requirement"]
            },
            {
              question: "Differentiate between an Algorithm, Pseudocode, and a Computer Program.",
              marks: "3 Marks",
              answer: "1. Algorithm: A conceptual, language-independent, step-by-step sequence of instructions designed to solve a problem.\n2. Pseudocode: An informal high-level representation of an algorithm using structured English and mathematical symbols that mimics programming constructs without syntax rules.\n3. Computer Program: Concrete implementation of an algorithm written in a specific syntax (like Python or C) that can be translated and executed by a computer.",
              keyPoints: ["Language independence vs syntax dependency", "Conceptual blueprint vs executable code", "Target audience (humans vs interpreters/compilers)"]
            },
          ],
          mcqs: [
            {
              question: "Which characteristic of an algorithm guarantees that it will not run forever in an infinite loop?",
              options: ["Definiteness", "Finiteness", "Effectiveness", "Input"],
              correctIndex: 1,
              explanation: "Finiteness ensures that the algorithm must terminate after a countable, finite number of steps for any valid input."
            },
            {
              question: "What is the primary purpose of a Trace Table during algorithm design?",
              options: ["To compile the source code into bytecode", "To perform manual desk checking and track variable values step by step", "To create graphical flowchart diagrams automatically", "To allocate heap memory for Python variables"],
              correctIndex: 1,
              explanation: "A trace table is used in desk checking to manually trace the values of variables at every step of execution to detect logic bugs."
            },
            {
              question: "If an algorithm instruction states 'Divide x by y, where y may or may not be 0', which characteristic is violated?",
              options: ["Finiteness", "Definiteness", "Output", "Generality"],
              correctIndex: 1,
              explanation: "Definiteness requires every step to be unambiguous and strictly well-defined; division by zero is undefined."
            },
          ]
        },
        {
          id: "py1-u1-t2",
          title: "Flowcharts, Standard Symbols & Flow of Control (Algorithms for largest of 3, leap year, prime)",
          simpleExplanation: "A flowchart is a visual map of an algorithm using standard geometric shapes like ovals, rectangles, and diamonds. Instead of reading paragraphs of text, you can glance at the shapes and arrows to see how decisions are made and how the program loops.",
          detailedExplanation: `## 1. Flowchart Fundamentals & Standard Symbols

A **Flowchart** is a graphical or pictorial representation of an algorithm. It uses standardized geometric symbols defined by ANSI/ISO to represent different types of actions, with arrows (flowlines) demonstrating the exact sequence of execution.

### Standard ANSI/ISO Flowchart Symbols:
1. **Oval / Rounded Rectangle (Terminal):** Represents the starting point (\`Start\`) or termination point (\`Stop\`/\`End\`) of a program or sub-routine.
2. **Parallelogram (Input / Output):** Represents data input operations (e.g., \`Read A, B\`, \`Input marks\`) and data output operations (e.g., \`Display result\`, \`Print Total\`).
3. **Rectangle (Process / Computation):** Represents data processing, arithmetic calculations, and variable assignments (e.g., \`sum = a + b\`, \`counter = counter + 1\`).
4. **Diamond (Decision / Condition):** Represents a logical condition or branch point. It always has one incoming arrow and two (or three) outgoing labeled paths (e.g., \`True\`/\`False\`, \`Yes\`/\`No\`).
5. **Small Circle (Connector):** Used to connect disjoint flow paths on the same page without crisscrossing lines. Often labeled with letters (A, B).
6. **Off-page Connector (Pentagon):** Used when a flowchart spans across multiple pages.
7. **Flowlines (Directed Arrows):** Indicate the direction and sequence of program control.

| Symbol Shape | Standard Name | Technical Function | Example Usage |
| :--- | :--- | :--- | :--- |
| Rounded Oval | Terminal | Marks Start / Stop | \`Start\`, \`End\` |
| Parallelogram | Input / Output | Reads external data / displays results | \`Read num\`, \`Print "Even"\` |
| Rectangle | Process | Arithmetic manipulation / assignment | \`area = 3.14 * r * r\` |
| Diamond | Decision | Conditional branching (\`True\`/\`False\`) | \`is count > 10?\` |
| Small Circle | Connector | Junction point on same page | \`(A)\` |
| Arrow Line | Flowline | Directs flow of control | Indicating next step |

---

## 2. Standard Flow of Control Structures

Every computer program, regardless of complexity, can be built using just three basic control structures (proven by the Böhm-Jacopini Theorem):
1. **Sequence:** Statements executed sequentially in linear order.
2. **Selection (Branching):** Choosing between two or more paths based on a boolean condition (\`if-else\`).
3. **Iteration (Looping):** Repeating a sequence of statements while a condition remains true (\`while\`, \`for\`).

---

## 3. Classic Exam Algorithms & Flowcharts

### Problem 1: Finding the Largest of Three Numbers (A, B, C)
#### Algorithm:
- **Step 1:** Start
- **Step 2:** Read values of $A$, $B$, and $C$.
- **Step 3:** If $A \\ge B$ and $A \\ge C$, then set $Max = A$ and go to Step 6.
- **Step 4:** Else if $B \\ge C$, then set $Max = B$ and go to Step 6.
- **Step 5:** Else set $Max = C$.
- **Step 6:** Display $Max$.
- **Step 7:** Stop.

\`\`\`mermaid
flowchart TD
    Start([Start]) --> In[/Read A, B, C/]
    In --> D1{Is A >= B and A >= C?}
    D1 -- Yes --> SetA[Max = A]
    D1 -- No --> D2{Is B >= C?}
    D2 -- Yes --> SetB[Max = B]
    D2 -- No --> SetC[Max = C]
    SetA --> Out[/Print Max/]
    SetB --> Out
    SetC --> Out
    Out --> Stop([Stop])
\`\`\`

---

### Problem 2: Checking if a Year is a Leap Year
A year is a leap year if:
1. It is divisible by 4 **AND** not divisible by 100, **OR**
2. It is divisible by 400.

#### Algorithm:
- **Step 1:** Start
- **Step 2:** Read integer \`year\`.
- **Step 3:** If \`(year % 400 == 0)\`, then output \`"Leap Year"\` and go to Step 7.
- **Step 4:** Else if \`(year % 100 == 0)\`, then output \`"Not a Leap Year"\` and go to Step 7.
- **Step 5:** Else if \`(year % 4 == 0)\`, then output \`"Leap Year"\` and go to Step 7.
- **Step 6:** Else output \`"Not a Leap Year"\`.
- **Step 7:** Stop.

\`\`\`mermaid
flowchart TD
    S([Start]) --> R[/Read year/]
    R --> C1{year % 400 == 0?}
    C1 -- Yes --> LY[/Print 'Leap Year'/]
    C1 -- No --> C2{year % 100 == 0?}
    C2 -- Yes --> NLY[/Print 'Not Leap Year'/]
    C2 -- No --> C3{year % 4 == 0?}
    C3 -- Yes --> LY
    C3 -- No --> NLY
    LY --> Term([Stop])
    NLY --> Term
\`\`\`

---

### Problem 3: Checking if a Number N is Prime
A prime number is an integer greater than 1 that has no positive divisors other than 1 and itself.

#### Algorithm (Optimized up to $\\sqrt{N}$):
- **Step 1:** Start
- **Step 2:** Read integer $N$.
- **Step 3:** If $N \\le 1$, output \`"Not Prime"\` and go to Step 9.
- **Step 4:** Set divisor $d = 2$.
- **Step 5:** While $d 	imes d \\le N$ do Steps 6 to 7.
- **Step 6:** If $N \\pmod d == 0$, output \`"Not Prime"\` and go to Step 9.
- **Step 7:** Set $d = d + 1$.
- **Step 8:** Output \`"Prime Number"\`.
- **Step 9:** Stop.

---

## 4. Flowchart vs Algorithm Comparison

| Dimension | Algorithm | Flowchart |
| :--- | :--- | :--- |
| **Format** | Step-by-step text (pseudocode/words) | Visual diagrams using geometric shapes |
| **Clarity** | Can become wordy and hard to trace loops | Immediate visual understanding of branches |
| **Modification** | Easy to edit, insert steps, or renumber | Hard to edit; requires redrawing the diagram |
| **Complexity** | Suitable for very large, complex programs | Becomes cluttered and clumsy for large systems |
| **Standardization** | No strict visual standard | ANSI/ISO standard symbols strictly applied |

> [!IMPORTANT] **MEMORIZE:**
> - **Oval:** Start / Stop (Terminal)
> - **Parallelogram:** Input / Output
> - **Rectangle:** Processing / Math Calculation
> - **Diamond:** Decision / Branching
> - **Circle:** Connector

> [!NOTE] **DEV BRAIN:**
> Flowcharts in modern software development are used during architecture reviews and whiteboarding (UML Activity diagrams) to align frontend, backend, and database logic before writing microservices.

> [!WARNING] **TRAP:**
> In the Leap Year algorithm, students frequently forget the century rule! Year \`1900\` is divisible by 4, but it is **NOT** a leap year because it is divisible by 100 and not by 400. \`2000\` is a leap year. Always test with 1900 and 2000!

> [!TIP] **EXAM TIP:**
> Always use a ruler or neat lines when drawing flowcharts in written exams. Clearly label every outgoing arrow from a diamond decision symbol with **Yes/No** or **True/False**. Unlabeled arrows result in lost marks!`,
          shortNotes: "Flowchart: Graphical algorithm representation. Terminal (Oval), I/O (Parallelogram), Process (Rectangle), Decision (Diamond), Connector (Circle).",
          examples: [
            {
              title: "Python Implementation of Leap Year & Prime Checking",
              problem: "Implement Python functions for Leap Year detection and Prime Number testing based on the flowcharts.",
              explanation: "Use clean conditional logic for the leap year rule and trial division up to integer square root for prime testing.",
              code: `def is_leap_year(year: int) -> bool:
    # Century rule: divisible by 400 OR (divisible by 4 and NOT 100)
    return (year % 400 == 0) or (year % 4 == 0 and year % 100 != 0)

def is_prime(n: int) -> bool:
    if n <= 1:
        return False
    # Check divisors up to sqrt(n)
    d = 2
    while d * d <= n:
        if n % d == 0:
            return False
        d += 1
    return True

# Test Cases
print("1900 Leap Year?", is_leap_year(1900)) # False
print("2000 Leap Year?", is_leap_year(2000)) # True
print("2024 Leap Year?", is_leap_year(2024)) # True
print("29 is Prime?", is_prime(29))           # True
print("49 is Prime?", is_prime(49))           # False`,
              output: "1900 Leap Year? False\n2000 Leap Year? True\n2024 Leap Year? True\n29 is Prime? True\n49 is Prime? False"
            },
          ],
          keyPoints: [
            "Flowcharts use standardized ANSI symbols to represent computational flow visually.",
            "Diamond symbols represent conditional tests and must have at least two clearly labeled exit paths.",
            "All computer algorithms can be expressed using three constructs: Sequence, Selection, and Iteration.",
            "Leap year condition: (year % 400 == 0) or (year % 4 == 0 and year % 100 != 0).",
            "Prime number check only needs trial divisors up to the square root of N."
          ],
          theoryQuestions: [
            {
              question: "Draw standard flowchart symbols and explain their technical purposes. Also explain the B\u00f6hm-Jacopini control structures.",
              marks: "5 Marks",
              answer: "Standard ANSI flowchart symbols:\n1. Terminal (Oval): Indicates program Start and Stop.\n2. Input/Output (Parallelogram): Represents reading input from user or writing output to screen.\n3. Processing (Rectangle): Arithmetic operations, data transformations, and variable assignments.\n4. Decision (Diamond): Evaluates a boolean condition with True/False branches.\n5. Connector (Circle): Connects divergent paths on the same page.\n\nB\u00f6hm-Jacopini Control Structures:\n1. Sequence: Linear top-to-bottom instruction execution.\n2. Selection: Conditional branching (if-then-else).\n3. Iteration: Repetition of instructions based on condition (loops).",
              keyPoints: ["ANSI symbols: Oval, Parallelogram, Rectangle, Diamond, Circle", "Three control structures: Sequence, Selection, Iteration", "Correct arrow labeling"]
            },
            {
              question: "Write an algorithm and draw the flowchart logic to determine whether a given year is a Leap Year.",
              marks: "5 Marks",
              answer: "Algorithm:\nStep 1: Start.\nStep 2: Read year from user.\nStep 3: If year % 400 == 0, then print 'Leap Year' and go to Step 7.\nStep 4: Else if year % 100 == 0, then print 'Not Leap Year' and go to Step 7.\nStep 5: Else if year % 4 == 0, then print 'Leap Year' and go to Step 7.\nStep 6: Else print 'Not Leap Year'.\nStep 7: Stop.\n\nKey logic: Centuries must be divisible by 400 to be leap years, while ordinary years only need divisibility by 4.",
              keyPoints: ["Step-by-step algorithm structure", "Century condition: year % 400 == 0", "Ordinary year condition: year % 4 == 0 and year % 100 != 0", "Correct terminal stop step"]
            },
          ],
          mcqs: [
            {
              question: "Which flowchart symbol is strictly used to denote decision-making and conditional branching?",
              options: ["Rectangle", "Oval", "Diamond", "Parallelogram"],
              correctIndex: 2,
              explanation: "The diamond symbol represents a condition evaluation and always has multiple exit flowlines (e.g., True/False)."
            },
            {
              question: "Which of the following years is NOT a leap year?",
              options: ["1600", "2000", "2400", "1800"],
              correctIndex: 3,
              explanation: "1800 is a century year divisible by 100, but not divisible by 400. Therefore, it is an ordinary year."
            },
            {
              question: "What is the primary role of a circular symbol in a flowchart?",
              options: ["To pause execution for user input", "To connect flowlines without cluttering the diagram", "To calculate mathematical formulas", "To terminate the entire program"],
              correctIndex: 1,
              explanation: "A small circle serves as a connector to join multiple converging paths on the same page cleanly."
            },
          ]
        },
        {
          id: "py1-u1-t3",
          title: "Compiler vs Interpreter & Python Virtual Machine (PVM, Bytecode .pyc)",
          simpleExplanation: "Computers only speak binary (0s and 1s). A compiler translates your entire book of code into machine language all at once before running, while an interpreter translates and runs it line-by-line. Python cleverly does both: it compiles your code into intermediate 'bytecode', and then the Python Virtual Machine (PVM) interprets that bytecode into hardware actions.",
          detailedExplanation: `## 1. How Computers Execute High-Level Code

Computers cannot directly understand high-level human-readable programming languages like C, Java, or Python. The central processing unit (CPU) can only execute binary **Machine Code**—streams of hexadecimal or binary numbers (\`0\`s and \`1\`s) tailored directly to the underlying processor architecture (such as x86_64, ARM64).

To bridge this semantic gap, computer systems rely on language translators:
1. **Compilers:** Translators that convert the entire source code into native machine code in a single comprehensive pass before execution.
2. **Interpreters:** Translators that read source instructions line-by-line, translate them on the fly, and immediately execute them.
3. **Hybrid Systems (Python & Java):** Systems that combine ahead-of-time or just-in-time compilation into an intermediate form (Bytecode) followed by virtual machine interpretation.

---

## 2. In-Depth Comparison: Compiler vs Interpreter

| Feature | Pure Compiler (e.g., C, C++, Rust) | Pure Interpreter (e.g., Early BASIC, Ruby) | Python (Hybrid Model) |
| :--- | :--- | :--- | :--- |
| **Translation Phase** | Translates entire program before running | Translates instruction line-by-line during runtime | Compiles source to Bytecode, then interprets Bytecode |
| **Output File** | Generates standalone binary executable (\`.exe\`, \`.elf\`) | No intermediate object file generated | Generates bytecode files (\`.pyc\` in \`__pycache__\`) |
| **Execution Speed** | Extremely fast (direct hardware execution) | Slow (re-translates loops every iteration) | Moderately fast (bytecode execution via PVM) |
| **Error Reporting** | Reports all syntax errors together after scanning file | Stops execution at the very first runtime error | Syntax checked at compile time; runtime errors hit at execution |
| **Portability** | Low (binary must be recompiled for each OS/CPU) | High (runs anywhere an interpreter is installed) | Very High (bytecode is platform independent) |
| **Memory Usage** | Lean runtime memory footprint | High memory overhead during interpretation | PVM overhead during execution |

---

## 3. The Python Execution Pipeline & Architecture

When you type \`python app.py\` in your terminal, Python does **NOT** directly interpret the raw text file line-by-line. Instead, it executes a two-stage hybrid process:

\`\`\`mermaid
flowchart LR
    A["Source Code
('app.py')"] --> B["Python Compiler
(Parser & AST)"]
    B --> C["Bytecode
('app.cpython-313.pyc')"]
    C --> D["Python Virtual Machine
(PVM Engine)"]
    D --> E["Native Machine Code
(0101 CPU Execution)"]
\`\`\`

### Stage 1: Compilation to Bytecode
- The Python compiler checks the source code for grammatical syntax errors.
- It parses the text into an **Abstract Syntax Tree (AST)**.
- It translates the AST into **Bytecode**—a compact, platform-independent intermediate instruction set specifically designed for the Python runtime.
- Bytecode instructions are represented as low-level operations (e.g., \`LOAD_NAME\`, \`STORE_FAST\`, \`BINARY_ADD\`).

### Stage 2: Caching in \`__pycache__\` (.pyc files)
- To prevent compiling the same file on every run, Python caches the compiled bytecode inside a directory named \`__pycache__\`.
- File naming convention: \`<module_name>.cpython-<version>.pyc\` (for instance: \`math_utils.cpython-313.pyc\`).
- On subsequent runs, Python checks the timestamp of \`app.py\` against \`app.pyc\`. If the source file has not changed, Python **skips compilation entirely** and loads the bytecode directly, drastically reducing startup latency!

### Stage 3: The Python Virtual Machine (PVM)
- The **PVM** is the runtime software engine of Python.
- It is a massive stack-based evaluation loop written in C (in CPython, the reference implementation).
- The PVM reads each bytecode instruction sequentially, maps it to native OS/CPU system calls, and executes it on the physical hardware.

---

## 4. Inspecting Python Bytecode

Python provides a built-in module named \`dis\` (disassembler) that allows developers to inspect the exact bytecode instructions generated by the compiler.

\`\`\`python
import dis

def add(a, b):
    return a + b

dis.dis(add)
\`\`\`

**Disassembly Output:**
\`\`\`text
  2           0 RESUME                   0
              2 LOAD_FAST                0 (a)
              4 LOAD_FAST                1 (b)
              6 BINARY_ADD
              8 RETURN_VALUE
\`\`\`
- \`LOAD_FAST 0\`: Pushes the value of local argument \`a\` onto the evaluation stack.
- \`LOAD_FAST 1\`: Pushes the value of local argument \`b\` onto the evaluation stack.
- \`BINARY_ADD\`: Pops both values, adds them, and pushes the result back onto the stack.
- \`RETURN_VALUE\`: Pops the top stack element and returns it to the caller.

> [!IMPORTANT] **MEMORIZE:**
> 1. Python source files have the extension \`.py\`.
> 2. Python bytecode files have the extension \`.pyc\` and reside inside \`__pycache__\`.
> 3. PVM stands for **Python Virtual Machine**.
> 4. Python is neither a purely compiled nor a purely interpreted language; it is a **Hybrid language** (compiled to bytecode, interpreted by PVM).

> [!NOTE] **DEV BRAIN:**
> CPython is the standard implementation written in C. Other Python runtimes exist: **PyPy** uses a Just-In-Time (JIT) compiler for 5x faster speeds; **Jython** compiles Python into Java JVM bytecode; **IronPython** compiles for .NET CLR.

> [!WARNING] **TRAP:**
> Students often claim: *"Python is an interpreted language, so it never compiles anything."* This is completely FALSE! Python ALWAYS compiles source code into Bytecode before executing it. If there is a syntax error on line 100, Python will fail immediately before executing line 1!

> [!TIP] **EXAM TIP:**
> When asked about Python's execution model in an exam, draw the 4-box diagram: \`Source Code (.py) -> Compiler -> Bytecode (.pyc) -> PVM -> Hardware\`. Mentioning the \`__pycache__\` folder and the \`dis\` module guarantees full marks.`,
          shortNotes: "Python is a hybrid language: Source code (.py) is compiled into platform-independent Bytecode (.pyc), which is executed by the Python Virtual Machine (PVM).",
          examples: [
            {
              title: "Demonstrating Bytecode Inspection with dis module",
              problem: "Write a Python script to inspect and explain the bytecode generated for a conditional function.",
              explanation: "Use Python's built-in dis module to see how high-level if-else branching is converted into stack bytecode instructions.",
              code: `import dis

def max_val(x, y):
    if x > y:
        return x
    else:
        return y

print("=== Bytecode Disassembly for max_val ===")
dis.dis(max_val)

# Call the function
print("Result:", max_val(42, 99))`,
              output: "=== Bytecode Disassembly for max_val ===\n  4           0 RESUME                   0\n              2 LOAD_FAST                0 (x)\n              4 LOAD_FAST                1 (y)\n              6 COMPARE_OP              24 (>)\n             10 POP_JUMP_IF_FALSE        2 (to 16)\n  5          12 LOAD_FAST                0 (x)\n             14 RETURN_VALUE\n  7     >>   16 LOAD_FAST                1 (y)\n             18 RETURN_VALUE\nResult: 99"
            },
          ],
          keyPoints: [
            "Compilers translate source code into native machine code ahead of time; pure interpreters translate line-by-line during runtime.",
            "Python uses a hybrid architecture: source code (.py) is compiled to bytecode (.pyc), which is then interpreted by the PVM.",
            "Bytecode is a platform-independent intermediate instruction set stored in the __pycache__ directory.",
            "The Python Virtual Machine (PVM) is a stack-based engine that converts bytecode into physical hardware operations.",
            "CPython is the reference implementation; PyPy is a JIT-compiled alternative."
          ],
          theoryQuestions: [
            {
              question: "Explain the Python execution architecture. What is the role of Bytecode and the Python Virtual Machine (PVM)?",
              marks: "5 Marks",
              answer: "Python uses a two-stage hybrid execution model:\n1. Compilation: When a Python script (.py) is invoked, the compiler verifies syntax and translates source instructions into an intermediate, platform-neutral representation called Bytecode. Bytecode instructions are cached in the __pycache__ folder as .pyc files.\n2. PVM (Python Virtual Machine): The PVM is the runtime interpreter engine of Python. It reads the bytecode sequentially and translates each bytecode instruction into native machine code instructions that the host CPU can execute.\n\nBenefits:\n- Platform Independence: Bytecode compiled on Windows can run on Linux or macOS without modification as long as a PVM is present.\n- Faster Execution on Subsequent Runs: Python skips compilation if the .pyc timestamp matches the source file.",
              keyPoints: ["Two-stage pipeline: Source -> Bytecode -> PVM -> CPU", "Role of bytecode and .pyc files", "Role and stack-based design of PVM", "Platform independence advantage"]
            },
            {
              question: "Differentiate between a Compiler and an Interpreter across four distinct parameters.",
              marks: "3 Marks",
              answer: "1. Translation Mechanism: A compiler translates the entire source code into machine code in one pass. An interpreter translates and executes source code line-by-line.\n2. Output: A compiler produces a standalone executable binary file (.exe). An interpreter does not generate an executable file.\n3. Speed: Compiled code executes significantly faster because translation happens prior to runtime. Interpreted code executes slower due to runtime translation overhead.\n4. Error Handling: Compilers display all syntax errors at once. Interpreters halt execution at the first line that encounters an error.",
              keyPoints: ["Whole program vs line-by-line translation", "Executable output generation", "Execution speed differences", "Debugging and error detection mechanisms"]
            },
          ],
          mcqs: [
            {
              question: "What is the file extension of compiled Python bytecode cached in the __pycache__ directory?",
              options: [".py", ".pyc", ".pyd", ".exe"],
              correctIndex: 1,
              explanation: ".pyc stands for 'Python Compiled' bytecode and is stored in __pycache__ to speed up future imports."
            },
            {
              question: "Which component of the Python architecture is responsible for actually executing bytecode on the CPU?",
              options: ["The Preprocessor", "The Linker", "The Python Virtual Machine (PVM)", "The Operating System Kernel"],
              correctIndex: 2,
              explanation: "The PVM (Python Virtual Machine) is the runtime engine that interprets and executes bytecode instructions."
            },
            {
              question: "Which Python standard library module is used to disassemble functions into bytecode instructions?",
              options: ["sys", "dis", "compile", "inspect"],
              correctIndex: 1,
              explanation: "The 'dis' module is the Python bytecode disassembler used to inspect PVM instructions."
            },
          ]
        },
        {
          id: "py1-u1-t4",
          title: "Python Ecosystem: History, Python 2 vs 3, Interactive vs Script Mode, PEP 8 Style Guide",
          simpleExplanation: "Python was created by Guido van Rossum to make coding as readable and enjoyable as everyday English. You can test single lines of code instantly using Interactive Mode (the REPL), or save multi-line software projects in files using Script Mode. PEP 8 is the official rulebook that keeps all Python code in the world looking neat, consistent, and clean.",
          detailedExplanation: `## 1. History & Philosophy of Python

Python was conceived in the late 1980s by Dutch programmer **Guido van Rossum** at the Centrum Wiskunde & Informatica (CWI) in the Netherlands. Its implementation began in December 1989 as a successor to the ABC programming language, capable of exception handling and interfacing with the Amoeba operating system.

Python was officially released to the public in **February 1991** (version 0.9.0). Guido van Rossum named the language after the British comedy television show **'Monty Python's Flying Circus'**, because he wanted the language to be fun and engaging, not solemn.

### The Zen of Python (PEP 20):
Written by Tim Peters, the core philosophy of Python can be viewed by typing \`import this\` in any Python shell:
- *Beautiful is better than ugly.*
- *Explicit is better than implicit.*
- *Simple is better than complex.*
- *Complex is better than complicated.*
- *Readability counts.*
- *There should be one—and preferably only one—obvious way to do it.*

---

## 2. Python 2 vs Python 3: The Great Architectural Shift

In 2008, **Python 3.0** (code-named "Python 3000" or "Py3K") was released. Unlike previous releases, Python 3 was intentionally **backwards-incompatible** to fix foundational design flaws in the language. Python 2 reached its official End-of-Life (EOL) on **January 1, 2020**.

### Major Differences Between Python 2 and Python 3:

| Feature / Concept | Python 2 (Deprecated) | Python 3 (Modern Standard) |
| :--- | :--- | :--- |
| **Print Statement** | Statement without parentheses: \`print "Hello"\` | Built-in function with parentheses: \`print("Hello")\` |
| **Integer Division** | Truncating floor division: \`5 / 2 == 2\` | True floating-point division: \`5 / 2 == 2.5\` (\`5 // 2 == 2\`) |
| **String Encoding** | ASCII by default; Unicode requires \`u"text"\` | All strings (\`str\`) are Unicode (UTF-8) by default; raw bytes use \`bytes\` |
| **User Input** | \`raw_input()\` returns string; \`input()\` evaluated code | \`raw_input()\` removed; \`input()\` always returns a \`str\` |
| **Range Function** | \`range()\` created in-memory list; \`xrange()\` was lazy | \`xrange()\` removed; \`range()\` is lazy and memory-efficient |
| **Exceptions** | \`except Exception, e:\` | \`except Exception as e:\` |
| **Comparison of Incompatible Types** | Permitted: \`'abc' > 5\` returned \`True\` | Raises \`TypeError: '>' not supported between instances\` |

---

## 3. Python Modes of Execution

Python programs can be authored and executed in two primary modes:

### A. Interactive Mode (REPL - Read-Eval-Print Loop)
- **How to Launch:** Simply type \`python\` or \`python3\` in your terminal or use IDLE. The prompt changes to \`>>>\`.
- **Mechanism:** It reads an expression, evaluates it immediately, prints the result, and loops back.
- **Advantages:** Instant feedback, perfect for learning, testing functions, checking data types, and inspecting library documentation.
- **Disadvantages:** Code is not saved to disk; once you close the shell, all variables and functions vanish.

### B. Script Mode
- **How to Use:** Write Python source code inside a text file with a \`.py\` extension (e.g., \`payroll.py\`) using an editor (VS Code, PyCharm, Vim), then run it: \`python payroll.py\`.
- **Advantages:** Code is permanently saved, can be version-controlled with Git, scheduled as cron jobs, and shared across teams.
- **Disadvantages:** Requires an edit-save-run cycle; debugging syntax requires re-executing the entire script.

---

## 4. The PEP 8 Style Guide: Writing Pythonic Code

**PEP 8** (Python Enhancement Proposal 8) is Python's official style guide authored by Guido van Rossum, Barry Warsaw, and Nick Coghlan. Following PEP 8 ensures that code is readable, standardized, and professional across global software teams.

### Core PEP 8 Conventions:
1. **Indentation:** Use strictly **4 spaces per indentation level**. Never mix tabs and spaces!
2. **Naming Conventions:**
   - **Variables & Functions:** \`snake_case\` (e.g., \`calculate_tax()\`, \`student_name\`).
   - **Constants:** \`ALL_CAPS_WITH_UNDERSCORES\` (e.g., \`MAX_RETRIES = 5\`, \`PI = 3.14159\`).
   - **Classes:** \`PascalCase\` or \`CapWords\` (e.g., \`StudentRecord\`, \`BankAccount\`).
   - **Private Attributes:** Preceded by a single underscore (e.g., \`_internal_cache\`).
3. **Maximum Line Length:** Limit all lines to a maximum of **79 characters** (or 88 characters under Black formatting standard).
4. **Blank Lines:**
   - Two blank lines around top-level function and class definitions.
   - One blank line between method definitions inside a class.
5. **Whitespace in Expressions:**
   - Avoid extraneous whitespace inside parentheses: \`spam(ham[1], {eggs: 2})\` (Not \`spam( ham[ 1 ] )\`).
   - Always surround binary operators with a single space on either side: \`x = y + 1\` (Not \`x=y+1\`).
6. **Imports:** Imports should always be placed at the very top of the file, ordered: (1) Standard library, (2) Related third-party imports, (3) Local application imports. Each on its own line:
   \`\`\`python
   import os
   import sys
   from datetime import datetime
   \`\`\`

> [!IMPORTANT] **MEMORIZE:**
> - Python was created by **Guido van Rossum** in **1991**.
> - PEP stands for **Python Enhancement Proposal**.
> - PEP 8 specifies **4 spaces** indentation (never tabs) and \`snake_case\` for variables and functions.
> - Python 3 division \`5 / 2\` evaluates to \`2.5\`, whereas integer floor division is \`5 // 2 = 2\`.

> [!NOTE] **DEV BRAIN:**
> In production software engineering, teams enforce PEP 8 automatically using linters like \`flake8\` or \`ruff\`, and auto-formatters like \`black\` or \`autopep8\` inside CI/CD GitHub Action workflows.

> [!WARNING] **TRAP:**
> Mixing tabs and spaces in Python 3 causes an immediate, fatal \`IndentationError: unindent does not match any outer indentation level\`. Always configure your editor to insert 4 spaces when pressing the Tab key!

> [!TIP] **EXAM TIP:**
> When asked to compare Python 2 vs Python 3, always highlight the three biggest exam points: (1) \`print\` statement vs function, (2) integer division (\`5/2 = 2\` vs \`2.5\`), and (3) default Unicode support in Python 3.`,
          shortNotes: "Created by Guido van Rossum in 1991. Py3 features print() as function, float division 5/2=2.5, and default UTF-8 Unicode. PEP 8 mandates 4 spaces and snake_case.",
          examples: [
            {
              title: "Demonstrating PEP 8 Standards and Python 3 Division",
              problem: "Write a clean, PEP 8 compliant Python script demonstrating Python 3 true division and floor division.",
              explanation: "Follow PEP 8 naming conventions (snake_case, constants in CAPS) and compare true float division / with integer floor division //.",
              code: `# Constant following PEP 8 naming standard
TAX_RATE: float = 0.075

def calculate_split(total_bill: float, num_people: int) -> tuple[float, int]:
    """Calculate bill share per person using true and floor division."""
    # True division (Python 3 returns float)
    exact_share = total_bill / num_people
    
    # Floor division (integer quotient)
    whole_rupees = int(total_bill) // num_people
    
    return exact_share, whole_rupees

# Execution
bill = 255.0
people = 4
share, whole = calculate_split(bill, people)

print(f"Total bill: \${bill}")
print(f"Exact share per person (5 / 2 style): \${share:.2f}")
print(f"Whole unit split (// style): \${whole}")`,
              output: "Total bill: $255.0\nExact share per person (5 / 2 style): $63.75\nWhole unit split (// style): $63"
            },
          ],
          keyPoints: [
            "Python was developed by Guido van Rossum and released in 1991; named after Monty Python.",
            "Python 3.0 broke backward compatibility in 2008 to fix fundamental design flaws; Python 2 sunset in 2020.",
            "In Python 3, print() is a function, 5 / 2 evaluates to 2.5, and all strings are Unicode UTF-8 by default.",
            "Interactive mode (REPL) allows rapid scratchpad experimentation; script mode executes saved .py files.",
            "PEP 8 is the official style guide: 4 spaces per indentation level, snake_case for functions, and UPPERCASE for constants."
          ],
          theoryQuestions: [
            {
              question: "Enumerate and explain at least five critical differences between Python 2 and Python 3.",
              marks: "5 Marks",
              answer: "1. Print Syntax: Python 2 used print as a keyword statement (`print 'Hello'`). Python 3 treats print as a built-in function (`print('Hello')`).\n2. Division Behavior: In Python 2, dividing two integers performed floor division (`5 / 2 == 2`). In Python 3, `/` performs true float division (`5 / 2 == 2.5`), while `//` performs floor division.\n3. String Representation: Python 2 strings were ASCII bytes by default, requiring a `u` prefix for Unicode. Python 3 strings are Unicode UTF-8 by default.\n4. Input Handling: Python 2 had `raw_input()` (returned string) and `input()` (evaluated input as code). Python 3 removed `raw_input()` and `input()` always safely returns a string.\n5. Lazy Evaluation: In Python 2, `range()` created an entire list in memory, with `xrange()` used for lazy generation. Python 3 removed `xrange()` and made `range()` a memory-efficient generator object.",
              keyPoints: ["print statement vs function", "Division: integer floor vs true float", "Unicode string encoding default", "raw_input() vs input()", "xrange() deprecated in favor of lazy range()"]
            },
            {
              question: "What is PEP 8? Outline four key rules prescribed by PEP 8 for writing clean Python code.",
              marks: "3 Marks",
              answer: "PEP 8 (Python Enhancement Proposal 8) is Python's official style guide for writing standardized, readable code. Four key rules are:\n1. Indentation: Strictly use 4 spaces per indentation level. Never mix tabs and spaces.\n2. Naming Conventions: Use `snake_case` for function and variable names, `PascalCase` for class names, and `ALL_CAPS` for constants.\n3. Maximum Line Length: Limit lines of code to at most 79 characters.\n4. Whitespace: Place a single space on either side of binary operators (e.g., `a = b + c`), but omit spaces immediately inside parentheses or brackets.",
              keyPoints: ["Definition of PEP 8", "4-space indentation rule", "snake_case vs PascalCase naming conventions", "Line length and whitespace standards"]
            },
          ],
          mcqs: [
            {
              question: "What is the result of the expression 7 / 2 in Python 3?",
              options: ["3", "3.5", "3.0", "Error"],
              correctIndex: 1,
              explanation: "In Python 3, the single slash '/' is the true division operator which returns a floating-point result (3.5)."
            },
            {
              question: "According to the PEP 8 style guide, how should constant variables be named?",
              options: ["camelCase", "snake_case", "ALL_CAPS_WITH_UNDERSCORES", "PascalCase"],
              correctIndex: 2,
              explanation: "PEP 8 states that constants must be named using ALL_CAPS with underscores separating words (e.g., MAX_RETRIES)."
            },
            {
              question: "Who created the Python programming language?",
              options: ["James Gosling", "Guido van Rossum", "Bjarne Stroustrup", "Dennis Ritchie"],
              correctIndex: 1,
              explanation: "Guido van Rossum invented Python in the late 1980s at CWI and released it in 1991."
            },
          ]
        },
      ]
    },
    {
      id: "py1-u2",
      title: "Unit 2: Python Syntax, Variables, Data Types & Operators",
      description: "Lexical structure of Python, dynamic typing mechanics, heap memory references, core primitive data types, comprehensive operator hierarchy, and formatted I/O.",
      topics: [
        {
          id: "py1-u2-t1",
          title: "Variables, Dynamic Typing, Identifiers, Keywords & Memory Reference (id(), type())",
          simpleExplanation: "In Python, a variable is not a cardboard box that holds data\u2014it is a sticky luggage tag that points to an object living in memory. You don't have to declare what kind of data goes into the tag; Python figures it out automatically at runtime (Dynamic Typing), and you can point that same tag to a completely different object whenever you want.",
          detailedExplanation: `## 1. The Python Variable Model: Tagged References, Not Storage Boxes

In traditional compiled languages like C, C++, or Java, a variable is a named memory location (a "storage box") with a fixed type:
\`\`\`c
// C Language: Box of size 4 bytes reserved for integers only
int age = 20; 
age = "twenty"; // COMPILE ERROR: Cannot put string in int box!
\`\`\`

In Python, **Everything is an Object**, and variables are merely **symbolic references (or pointers/labels)** attached to objects allocated on the private heap:
\`\`\`python
age = 20       # 'age' label is attached to the integer object 20
age = "twenty" # 'age' label is detached and re-attached to the string object "twenty"
\`\`\`

\`\`\`mermaid
flowchart LR
    subgraph References["Variable Names (Stack Namespace)"]
        A["age"]
    end
    subgraph Heap["Python Managed Heap"]
        O1["int: 20\\n(Memory: 0x104A)"]
        O2["str: 'twenty'\\n(Memory: 0x208B)"]
    end
    A -.->|Initially points to| O1
    A ===>|Reassigned to| O2
\`\`\`

---

## 2. Dynamic Typing vs Static Typing

Python is a **dynamically typed** and **strongly typed** language:
- **Dynamically Typed:** Variable types are determined at **runtime**, not during compile time. You never declare types with keywords like \`int x\` or \`float y\`. A variable takes on the type of whatever object it currently references.
- **Strongly Typed:** Python does not automatically coerce incompatible types in ambiguous operations. For example, \`10 + "5"\` causes a \`TypeError\` rather than implicitly turning into \`15\` or \`"105"\` (unlike JavaScript).

| Parameter | Static Typing (C, Java) | Dynamic Typing (Python) |
| :--- | :--- | :--- |
| **Type Declaration** | Explicitly declared before use (\`int count = 0;\`) | Inferred at assignment (\`count = 0\`) |
| **Type Check Timing** | During compilation | During program execution (runtime) |
| **Rebinding to New Type** | Disallowed (strict type binding) | Fully allowed (\`x = 10\` then \`x = "hi"\`) |
| **Performance** | Faster execution (compiler optimizes memory offsets) | Slight runtime overhead (type lookup per operation) |
| **Bug Detection** | Catches type errors before running | Type errors appear during runtime execution |

---

## 3. Identifiers & Naming Rules

An **Identifier** is a user-defined name used to identify a variable, function, class, module, or other object.

### The Strict Rules for Valid Identifiers:
1. **Allowed Characters:** Can contain uppercase letters (\`A-Z\`), lowercase letters (\`a-z\`), digits (\`0-9\`), and the underscore (\`_\`).
2. **First Character Rule:** Must begin with a letter or an underscore (\`_\`). It **CANNOT start with a digit** (e.g., \`1variable\` is illegal, \`var_1\` is legal).
3. **No Special Symbols:** Punctuation characters such as \`@\`, \`$\`, \`%\`, \`-\`, \`!\` are strictly forbidden (e.g., \`user@name\` is illegal).
4. **Case Sensitivity:** Python is strictly case-sensitive. \`Total\`, \`total\`, and \`TOTAL\` are three completely distinct variables.
5. **No Reserved Keywords:** You cannot use any Python keyword as an identifier (e.g., \`def = 5\` or \`class = "A"\` causes a \`SyntaxError\`).
6. **Length:** Identifiers can be of arbitrary length, but PEP 8 encourages concise, descriptive names.

---

## 4. Python Keywords

**Keywords** are reserved words that define the syntax and structural grammar of Python. They cannot be used as variable names, function names, or any other identifier.

In modern Python 3.12+, there are **35 reserved keywords**. You can view them at any time:
\`\`\`python
import keyword
print(keyword.kwlist)
\`\`\`

### Complete Keyword Categorization:
- **Value Keywords:** \`True\`, \`False\`, \`None\` (Note: Only these three keywords begin with a capital letter!)
- **Logical Operators:** \`and\`, \`or\`, \`not\`
- **Control Flow:** \`if\`, \`elif\`, \`else\`
- **Iteration / Loops:** \`for\`, \`while\`, \`break\`, \`continue\`, \`pass\`, \`else\`
- **Function / Class Definitions:** \`def\`, \`return\`, \`lambda\`, \`class\`, \`yield\`
- **Structure & Namespace:** \`import\`, \`from\`, \`as\`, \`global\`, \`nonlocal\`
- **Exception Handling:** \`try\`, \`except\`, \`finally\`, \`raise\`, \`assert\`
- **Context & Async:** \`with\`, \`async\`, \`await\`, \`del\`, \`is\`, \`in\`

---

## 5. Memory References: \`id()\`, \`type()\`, and Object Interning

Python provides two essential built-in inspection functions:
1. \`type(object)\`: Returns the data type class of the referenced object.
2. \`id(object)\`: Returns the unique integer identity of the object (corresponding to its memory address in CPython).

\`\`\`python
x = 250
print(type(x))  # <class 'int'>
print(id(x))    # e.g., 140723851927368
\`\`\`

### The Identity Operator \`is\` vs Equality Operator \`==\`:
- \`==\` checks **Value Equality**: Do two objects hold the same data contents?
- \`is\` checks **Reference Identity**: Do two variables point to the exact same physical memory address (\`id(a) == id(b)\`)?

### Small Integer Caching (Object Interning):
In CPython, creating new integer objects repeatedly causes memory overhead. Therefore, Python pre-allocates an array of integer objects in memory for all numbers in the range **\`-5\` to \`256\`** at startup!
- Any variable assigned a number between \`-5\` and \`256\` automatically points to this shared global cached object.
- Numbers outside this range are dynamically allocated on separate memory addresses.

\`\`\`python
a = 100
b = 100
print(a is b)  # True! Both share the pre-cached memory address

x = 500
y = 500
print(x == y)  # True (same values)
print(x is y)  # False in REPL (distinct memory objects!)
\`\`\`

> [!IMPORTANT] **MEMORIZE:**
> - Python variables are **tagged memory references**, not typed storage boxes.
> - Only three keywords start with an uppercase letter: **\`True\`**, **\`False\`**, and **\`None\`**.
> - Identifiers **cannot start with a digit** and **cannot contain hyphens or spaces**.
> - \`id()\` gives the memory address; \`type()\` gives the class.
> - Small integers from **-5 to 256** are automatically interned in memory by CPython.

> [!NOTE] **DEV BRAIN:**
> When garbage collection runs, Python uses **Reference Counting** augmented with a cyclic garbage collector. When an object's reference count drops to zero (\`del variable\`), its memory is immediately reclaimed by the PVM allocator.

> [!WARNING] **TRAP:**
> Never use \`is\` to check for equality of numbers or strings! Always use \`==\`. Writing \`if user_score is 100:\` might work in simple tests due to integer interning, but it will randomly break in production when scores exceed 256!

> [!TIP] **EXAM TIP:**
> When asked to explain the difference between \`==\` and \`is\`, draw two boxes with the same value \`[1, 2, 3]\` and show that \`a == b\` is \`True\` because contents match, but \`a is b\` is \`False\` because their memory addresses (\`id(a)\` and \`id(b)\`) are distinct.`,
          shortNotes: "Variables are memory references. Python is dynamically & strongly typed. Identifiers cannot start with digits. Only True, False, None are capitalized keywords.",
          examples: [
            {
              title: "Demonstrating Dynamic Typing, id(), type(), and is vs ==",
              problem: "Write a script demonstrating variable reassignment, memory identity inspection, and the behavioral difference between '==' and 'is'.",
              explanation: "Use id() to show how reassigning a variable changes its pointer, and compare lists with identical contents using == and is.",
              code: `# 1. Dynamic Typing
val = 42
print(f"val = {val} | Type: {type(val)} | id: {id(val)}")
val = "Hello Python"
print(f"val = '{val}' | Type: {type(val)} | id: {id(val)}")

# 2. Content Equality (==) vs Memory Identity (is)
list_a = [1, 2, 3]
list_b = [1, 2, 3]
list_c = list_a

print("list_a == list_b:", list_a == list_b)  # True: Same data
print("list_a is list_b:", list_a is list_b)  # False: Distinct heap objects
print("list_a is list_c:", list_a is list_c)  # True: Identical memory pointer

# 3. Small Integer Caching
n1 = 200
n2 = 200
print("200 is 200 (interned -5 to 256):", n1 is n2)`,
              output: "val = 42 | Type: <class 'int'> | id: [memory_address_1]\nval = 'Hello Python' | Type: <class 'str'> | id: [memory_address_2]\nlist_a == list_b: True\nlist_a is list_b: False\nlist_a is list_c: True\n200 is 200 (interned -5 to 256): True"
            },
          ],
          keyPoints: [
            "Variables in Python are object references (pointers) rather than fixed-size typed storage memory boxes.",
            "Python is dynamically typed (types checked at runtime) and strongly typed (no implicit illegal type coercions).",
            "Identifiers cannot start with digits, contain hyphens/spaces, or use reserved language keywords.",
            "There are 35 keywords; only True, False, and None are capitalized.",
            "id() returns memory identity, type() returns object class, == checks value equality, and is checks memory identity.",
            "Small integers in the range [-5, 256] are cached (interned) by CPython to optimize memory."
          ],
          theoryQuestions: [
            {
              question: "Explain the variable and memory reference model in Python. How does it fundamentally differ from C or Java?",
              marks: "5 Marks",
              answer: "In C or Java, a variable is a named physical storage box of fixed size and fixed type. Reassigning incompatible data causes compile-time failure.\n\nIn Python:\n1. Everything is an object allocated on the private heap.\n2. A variable is merely a tagged reference (pointer) bound to an object in the local or global namespace.\n3. Dynamic Typing allows a variable name to point to an integer at one moment and a string the next without error.\n4. Python tracks objects using Reference Counting. When the number of references to an object reaches zero, Python's garbage collector automatically reclaims that memory.\n5. The built-in id() function returns the memory address of the object currently bound to that variable.",
              keyPoints: ["Variable as object reference/label vs memory box", "Dynamic typing semantics", "Heap allocation and reference counting", "Role of id() and garbage collection"]
            },
            {
              question: "What is an Identifier? State the rules for naming identifiers in Python with valid and invalid examples.",
              marks: "3 Marks",
              answer: "An identifier is a user-defined name given to an entity like a variable, function, or class.\nRules:\n1. Must begin with an alphabet (A-Z, a-z) or an underscore (_). It cannot start with a digit. (Valid: `_count`, `num1`; Invalid: `1num`).\n2. Characters after the first can be letters, digits, or underscores. (Valid: `total_score`; Invalid: `total-score` due to hyphen).\n3. Cannot use special punctuation characters like @, $, %, #. (Invalid: `user$name`).\n4. Cannot be a reserved keyword. (Invalid: `while`, `def`, `class`).\n5. Case-sensitive: `val` and `Val` are distinct.",
              keyPoints: ["Definition of identifier", "First character rules (letters or underscore)", "Prohibition of special characters and keywords", "Case sensitivity rules"]
            },
          ],
          mcqs: [
            {
              question: "Which of the following is a VALID Python identifier?",
              options: ["2nd_variable", "my-name", "_total_sum", "for"],
              correctIndex: 2,
              explanation: "Identifiers can start with an underscore followed by alphanumeric characters. '2nd_variable' starts with a digit, 'my-name' contains a hyphen, and 'for' is a keyword."
            },
            {
              question: "Which of the following Python keywords begins with a capital letter?",
              options: ["def", "while", "None", "global"],
              correctIndex: 2,
              explanation: "Only three Python keywords start with an uppercase letter: True, False, and None."
            },
            {
              question: "What does the expression 'a is b' evaluate in Python?",
              options: ["Whether a and b have the same string length", "Whether id(a) == id(b) (identical memory location)", "Whether a and b have identical data values", "Whether a is a subclass of b"],
              correctIndex: 1,
              explanation: "The 'is' identity operator checks whether both variables point to the exact same memory address (id(a) == id(b))."
            },
          ]
        },
        {
          id: "py1-u2-t2",
          title: "Basic Data Types (int, float, complex, bool) & Explicit Type Casting",
          simpleExplanation: "Python has four core building blocks for numbers and truth: whole numbers (int), decimal numbers (float), mathematical numbers with imaginary parts (complex), and True/False toggles (bool). Type casting is the process of converting data from one shape to another, like turning the text string '42' into the actual math number 42.",
          detailedExplanation: `## 1. Fundamental Scalar Data Types in Python

In Python, data types represent the classification or categorization of data items. Python provides four fundamental built-in numeric and logical scalar types:

\`\`\`mermaid
flowchart TD
    Scalar["Scalar Built-in Types"] --> Num["Numeric Types"]
    Scalar --> B["Boolean Type (bool)"]
    Num --> I["Integer (int)\\nArbitrary precision"]
    Num --> F["Floating Point (float)\\nIEEE 754 64-bit"]
    Num --> C["Complex (complex)\\nreal + imag * 1j"]
    B --> Sub["Subclass of int\\nTrue == 1, False == 0"]
\`\`\`

---

## 2. In-Depth Study of the Four Primitive Types

### A. Integers (\`int\`)
- In Python 3, integers have **arbitrary precision** (unlimited size). Unlike C/Java where integers overflow at 32 bits ($2^{31}-1 = 2,147,483,647$) or 64 bits, Python integers can expand to fill available RAM! You can calculate $2^{1000}$ or $100!$ directly without any overflow errors.
- **Number System Literals:**
  - **Decimal (Base 10):** \`num = 42\`
  - **Binary (Base 2):** Prefix \`0b\` or \`0B\` (e.g., \`0b1010\` is \`10\`)
  - **Octal (Base 8):** Prefix \`0o\` or \`0O\` (e.g., \`0o12\` is \`10\`)
  - **Hexadecimal (Base 16):** Prefix \`0x\` or \`0X\` (e.g., \`0x1A\` is \`26\`)
  - **Digit Separator:** Underscores can be placed inside numbers for visual readability: \`one_million = 1_000_000\`.

### B. Floating-Point Numbers (\`float\`)
- Represents real numbers with fractional decimal points.
- Implemented internally using **C's double precision (IEEE 754 standard, 64-bit)**:
  - 1 sign bit, 11 bits for exponent, 52 bits for fraction/mantissa.
  - Precision is approximately 15 to 17 decimal digits.
- **Scientific Notation:** Numbers with powers of 10 use \`e\` or \`E\`:
  - \`3.5e4\` $= 3.5 \\times 10^4 = 35000.0$
  - \`1.2e-3\` $= 1.2 \\times 10^{-3} = 0.0012$

### C. Complex Numbers (\`complex\`)
- Represents numbers in the mathematical form $z = a + bj$, where $a$ is the real part and $b$ is the imaginary part.
- In Python, the imaginary unit is denoted by **\`j\` or \`J\`** (not \`i\`, following engineering tradition).
- Attributes:
  - \`z.real\`: Returns the real component as a float.
  - \`z.imag\`: Returns the imaginary component as a float.
  - \`z.conjugate()\`: Returns $a - bj$.

\`\`\`python
z = 3 + 4j
print(z.real)         # 3.0
print(z.imag)         # 4.0
print(z.conjugate())  # (3-4j)
print(abs(z))         # 5.0 (Magnitude: sqrt(3^2 + 4^2))
\`\`\`

### D. Booleans (\`bool\`)
- Represents logical truth values: **\`True\`** and **\`False\`**.
- In Python, \`bool\` is an explicit subclass of \`int\`.
  - \`True\` has an integer value of \`1\`.
  - \`False\` has an integer value of \`0\`.
  - \`True + True\` evaluates to \`2\`! \`True * 50\` evaluates to \`50\`.

---

## 3. Type Conversion (Type Casting)

Type conversion is transforming data from one data type into another.

### A. Implicit Type Conversion (Coercion)
Python automatically upgrades a narrower data type to a wider data type to prevent loss of precision during arithmetic operations without programmer intervention:
\`\`\`python
x = 10      # int
y = 4.5     # float
result = x + y  # Python automatically promotes result to float 14.5
\`\`\`

### B. Explicit Type Conversion (Type Casting)
The programmer manually converts data using built-in constructor functions:
1. \`int(x, base=10)\`: Converts float or string to integer (truncates decimal portion).
2. \`float(x)\`: Converts integer or numeric string to floating-point number.
3. \`complex(real, imag)\`: Creates a complex number.
4. \`str(x)\`: Converts any object into its string representation.
5. \`bool(x)\`: Evaluates truthiness of any object.

| Function Call | Input Value | Output Result | Notes |
| :--- | :--- | :--- | :--- |
| \`int(9.99)\` | Float \`9.99\` | \`9\` | Truncates towards zero (does NOT round!) |
| \`int("100")\` | String \`"100"\` | \`100\` | Parses string as base 10 int |
| \`int("1010", 2)\`| Binary string | \`10\` | Parses binary string to decimal int |
| \`float(25)\` | Integer \`25\` | \`25.0\` | Appends \`.0\` |
| \`float("3.14")\` | String \`"3.14"\`| \`3.14\` | Parses decimal string |
| \`str(123.45)\` | Float | \`"123.45"\` | Converts to text |
| \`bool(0)\` | Integer \`0\` | \`False\` | Zero is falsy |
| \`bool(-5)\` | Integer \`-5\` | \`True\` | Any non-zero integer is truthy |

---

## 4. Truthy and Falsy Values in Python

Every Python object has an intrinsic boolean value when evaluated in conditional statements (\`if\` or \`while\`):

### Strictly FALSY Values in Python:
- Numeric zeros: \`0\`, \`0.0\`, \`0j\`
- Constants: \`None\`, \`False\`
- Empty sequences and collections: \`""\` (empty string), \`[]\` (empty list), \`()\` (empty tuple), \`{}\` (empty dict), \`set()\` (empty set)
- Ranges with zero items: \`range(0)\`

**All other values in Python are TRUTHY!** (e.g., negative numbers like \`-1\`, non-empty strings like \`"False"\`, non-empty collections \`[0]\`).

> [!IMPORTANT] **MEMORIZE:**
> - Python 3 \`int\` has **arbitrary precision** (it never overflows!).
> - In complex numbers, Python uses the symbol **\`j\`**, not \`i\` (\`3 + 4j\`).
> - \`bool\` is a subclass of \`int\`: \`True == 1\` and \`False == 0\`.
> - \`int(9.99)\` truncates to \`9\`; it does not round up to \`10\`.

> [!NOTE] **DEV BRAIN:**
> Because floats follow IEEE 754, \`0.1 + 0.2\` in Python evaluates to \`0.30000000000000004\` due to binary floating-point representation limits! In financial applications, always use the \`decimal.Decimal\` module instead of \`float\`.

> [!WARNING] **TRAP:**
> Passing a floating-point string to \`int()\` raises an immediate \`ValueError\`!
> \`\`\`python
> int("45.67") # ERROR: ValueError: invalid literal for int() with base 10: '45.67'
> # Correct two-step conversion:
> int(float("45.67")) # Evaluates to 45
> \`\`\`

> [!TIP] **EXAM TIP:**
> If an exam question asks what \`bool("False")\` evaluates to, the answer is **\`True\`**! Why? Because \`"False"\` is a non-empty string, and any non-empty sequence is truthy! Only the empty string \`""\` evaluates to \`False\`.`,
          shortNotes: "int has arbitrary precision, float is 64-bit IEEE 754, complex uses 'j', bool inherits int (True=1, False=0). int() truncates decimals towards zero.",
          examples: [
            {
              title: "Comprehensive Demonstration of Types, Complex Math, and Type Casting",
              problem: "Write a Python script demonstrating arbitrary precision integers, complex number operations, and explicit type conversions.",
              explanation: "Show 2**100 integer expansion, complex conjugate and magnitude calculations, and truthiness checks.",
              code: `# 1. Arbitrary Precision Integer (No overflow)
huge_num = 2 ** 100
print(f"2^100 = {huge_num}")

# 2. Complex Numbers
z = 3 + 4j
print(f"z = {z} | Real: {z.real} | Imag: {z.imag}")
print(f"Conjugate: {z.conjugate()} | Magnitude abs(z): {abs(z)}")

# 3. Explicit Type Casting & Truncation
pi_float = 3.14159
pi_int = int(pi_float)
print(f"float {pi_float} -> int(pi) = {pi_int} (Truncated, not rounded)")

# 4. Two-step float string conversion
str_val = "89.75"
converted = int(float(str_val))
print(f"String '{str_val}' -> float -> int: {converted}")

# 5. Truthy / Falsy Nuance
print('bool("False"):', bool("False"))  # True (Non-empty string!)
print('bool(""):', bool(""))            # False (Empty string)`,
              output: "2^100 = 1267650600228229401496703205376\nz = (3+4j) | Real: 3.0 | Imag: 4.0\nConjugate: (3-4j) | Magnitude abs(z): 5.0\nfloat 3.14159 -> int(pi) = 3 (Truncated, not rounded)\nString '89.75' -> float -> int: 89\nbool(\"False\"): True\nbool(\"\"): False"
            },
          ],
          keyPoints: [
            "Python int has arbitrary precision with no fixed bit-width limit or integer overflow.",
            "Floats use 64-bit double precision according to the IEEE 754 standard.",
            "Complex numbers are represented as real + imag * 1j with .real, .imag, and .conjugate().",
            "bool is an int subclass where True == 1 and False == 0.",
            "int() truncates decimal digits towards zero; it does not perform mathematical rounding.",
            "Falsy values are 0, 0.0, None, False, empty sequences '', [], (), and empty mappings {}."
          ],
          theoryQuestions: [
            {
              question: "Discuss the primary scalar data types in Python. How does Python handle integer overflow compared to C/Java?",
              marks: "5 Marks",
              answer: "Primary scalar data types:\n1. int: Whole numbers of arbitrary precision. In C/Java, integers have fixed sizes (32-bit int overflows past 2,147,483,647). Python 3 automatically allocates dynamic memory blocks for integers, allowing numbers of virtually unlimited size (limited only by computer RAM).\n2. float: Fractional numbers implemented as 64-bit IEEE 754 double precision floats (approx 15-17 digits precision).\n3. complex: Numbers with real and imaginary parts using 'j' suffix (e.g., 3 + 4j) with `.real` and `.imag` float attributes.\n4. bool: Logical boolean values True and False. bool is a subclass of int (True=1, False=0).",
              keyPoints: ["Arbitrary precision integer architecture vs C fixed 32/64 bit limits", "float IEEE 754 double precision characteristics", "complex number syntax with j notation", "bool as an integer subclass"]
            },
            {
              question: "What is the difference between Implicit and Explicit Type Conversion? Explain with code snippets.",
              marks: "3 Marks",
              answer: "1. Implicit Type Conversion (Coercion): Automatically performed by Python at runtime to prevent data loss when combining compatible types. For example, adding an integer and a float: `result = 5 + 2.5` promotes `5` to float `5.0`, yielding `7.5`.\n2. Explicit Type Conversion (Type Casting): Manually performed by the programmer using built-in constructor functions like `int()`, `float()`, `str()`. For example, `num = int('120')` or `whole = int(9.85)` which explicitly truncates `9.85` to `9`.",
              keyPoints: ["Automatic promotion vs manual constructor invocation", "Examples: int + float implicit promotion", "int(), float(), str() explicit casting examples"]
            },
          ],
          mcqs: [
            {
              question: "What is the value of the expression int(-7.8) in Python?",
              options: ["-8", "-7", "-7.0", "Error"],
              correctIndex: 1,
              explanation: "int() truncates fractional digits directly towards zero, so -7.8 becomes -7."
            },
            {
              question: "Which of the following values evaluates to False when passed to bool()?",
              options: ["'0'", "[]", "[-1]", "'False'"],
              correctIndex: 1,
              explanation: "An empty list [] is an empty sequence and evaluates to False. Non-empty strings '0' and 'False', as well as list [-1], are truthy."
            },
            {
              question: "How is the imaginary unit represented in Python complex numbers?",
              options: ["i", "I", "j or J", "img"],
              correctIndex: 2,
              explanation: "Python uses 'j' or 'J' to denote the imaginary component of a complex number (e.g., 5 + 2j)."
            },
          ]
        },
        {
          id: "py1-u2-t3",
          title: "Complete Operator Hierarchy (Arithmetic, Relational, Logical, Bitwise, Assignment, is, in, Precedence Table)",
          simpleExplanation: "Operators are special symbols like +, *, and == that perform calculations and checks on your data. Python executes these operators following strict precedence rules\u2014just like the BODMAS/PEMDAS rule you learned in school. For example, exponentiation (** ) happens before multiplication, and math happens before comparison.",
          detailedExplanation: `## 1. Classification of Python Operators

An **Operator** is a special symbol or token that tells the Python interpreter to perform a specific mathematical, relational, or logical manipulation on one or more operands. Python features seven distinct categories of operators:

\`\`\`mermaid
flowchart TD
    Ops["Python Operators"] --> ARITH["Arithmetic (+, -, *, /, //, %, **)"]
    Ops --> REL["Relational / Comparison (==, !=, <, >, <=, >=)"]
    Ops --> LOG["Logical (and, or, not)"]
    Ops --> BIT["Bitwise (&, |, ^, ~, <<, >>)"]
    Ops --> ASSIGN["Assignment (=, +=, -=, *=, //=, :=)"]
    Ops --> IDEN["Identity (is, is not)"]
    Ops --> MEM["Membership (in, not in)"]
\`\`\`

---

## 2. Detailed Breakdown by Category

### A. Arithmetic Operators
- \`+\` (Addition): Adds values.
- \`-\` (Subtraction): Subtracts right operand from left.
- \`*\` (Multiplication): Multiplies values. Also performs string/list repetition (\`"A" * 3 -> "AAA"\`).
- \`/\` (True Float Division): Always returns a float (\`7 / 2 == 3.5\`).
- \`//\` (Floor Division): Returns the mathematical floor of the quotient (rounds DOWN to nearest integer towards $-\\infty$):
  - \`7 // 2 == 3\`
  - \`-7 // 2 == -4\` (Beware! Floors to $-\\infty$, not $-3$!)
- \`%\` (Modulo): Returns the remainder of division ($a \\% b = a - (a // b) \\times b$):
  - \`7 % 2 == 1\`
  - \`-7 % 2 == 1\` (In Python, sign of remainder matches the divisor $b$!)
- \`**\` (Exponentiation): Power operator (\`2 ** 3 == 8\`).

### B. Relational (Comparison) Operators
Return boolean \`True\` or \`False\`:
- \`==\` (Equal), \`!=\` (Not Equal)
- \`<\` (Less than), \`>\` (Greater than)
- \`<=\` (Less than or equal), \`>=\` (Greater than or equal)
- **Chained Comparisons:** Python supports mathematical chaining:
  \`\`\`python
  10 < x <= 50  # Evaluates as: (10 < x) and (x <= 50)
  \`\`\`

### C. Logical Operators & Short-Circuit Evaluation
Logical operators work on truth values:
- \`and\`: Returns \`True\` if BOTH operands are true.
- \`or\`: Returns \`True\` if AT LEAST ONE operand is true.
- \`not\`: Inverts the boolean truth value.
- **Short-Circuit Evaluation:**
  - In \`A and B\`: If \`A\` is falsy, Python does NOT evaluate \`B\` (returns \`A\` immediately).
  - In \`A or B\`: If \`A\` is truthy, Python does NOT evaluate \`B\` (returns \`A\` immediately).
  - *Returns the operand itself, not necessarily True/False:*
    \`"apple" or "banana"\` returns \`"apple"\`! \`0 and 42\` returns \`0\`!

### D. Bitwise Operators
Operate directly on the binary bit representations of integers:
- \`&\` (Bitwise AND): Sets bit to 1 if both corresponding bits are 1.
- \`|\` (Bitwise OR): Sets bit to 1 if at least one bit is 1.
- \`^\` (Bitwise XOR): Sets bit to 1 if bits are different.
- \`~\` (Bitwise NOT): Inverts all bits (Two's complement: \`~x == -(x + 1)\`).
- \`<<\` (Left Shift): Shifts bits left, filling zeros on right ($x \\ll n = x \\times 2^n$).
- \`>>\` (Right Shift): Shifts bits right, discarding overflow ($x \\gg n = x // 2^n$).

\`\`\`python
# Bitwise Demonstration: 5 (0101_2) and 3 (0011_2)
# 5 & 3 -> 0001_2 = 1
# 5 | 3 -> 0111_2 = 7
# 5 ^ 3 -> 0110_2 = 6
# ~5    -> -(5 + 1) = -6
\`\`\`

### E. Assignment & Walrus Operators
- Augmented assignments: \`+=\`, \`-=\`, \`*=\`, \`/=\`, \`//=\`, \`%=\`, \`**=\`, \`&=\`, \`|=\`, \`^=\`, \`<<=\`, \`>>=\`.
- **Walrus Operator (\`:=\` introduced in Python 3.8):** Assignment expression that assigns values to variables as part of a larger expression:
  \`\`\`python
  if (n := len(items)) > 10:
      print(f"List is too long with {n} elements!")
  \`\`\`

### F. Identity Operators (\`is\`, \`is not\`)
Check if two variables reference the **same memory address** (\`id(a) == id(b)\`).

### G. Membership Operators (\`in\`, \`not in\`)
Test whether a value is present in a sequence (string, list, tuple, set, dictionary keys):
\`\`\`python
"py" in "python"     # True
10 in [1, 2, 10, 20] # True
\`\`\`

---

## 3. Operator Precedence & Associativity Table

When an expression contains multiple operators, Python resolves ambiguity using **Precedence** (order of priority) and **Associativity** (direction of evaluation for equal precedence):

| Precedence Order | Operator Symbol | Description | Associativity |
| :--- | :--- | :--- | :--- |
| **1 (Highest)** | \`()\` | Parentheses (Grouping) | Left to Right |
| **2** | \`**\` | Exponentiation / Power | **Right to Left** |
| **3** | \`+x\`, \`-x\`, \`~x\` | Unary plus, Unary minus, Bitwise NOT | Right to Left |
| **4** | \`*\`, \`/\`, \`//\`, \`%\` | Multiplication, Division, Floor Div, Modulo | Left to Right |
| **5** | \`+\`, \`-\` | Addition, Subtraction | Left to Right |
| **6** | \`<<\`, \`>>\` | Bitwise Shifts | Left to Right |
| **7** | \`&\` | Bitwise AND | Left to Right |
| **8** | \`^\` | Bitwise XOR | Left to Right |
| **9** | \`\\|\` | Bitwise OR | Left to Right |
| **10** | \`==\`, \`!=\`, \`<\`, \`<=\`, \`>\`, \`>=\`, \`is\`, \`in\` | Comparisons, Identity, Membership | Left to Right |
| **11** | \`not\` | Logical NOT | Right to Left |
| **12** | \`and\` | Logical AND | Left to Right |
| **13 (Lowest)**| \`or\` | Logical OR | Left to Right |

> [!IMPORTANT] **MEMORIZE:**
> 1. Exponentiation \`**\` is **Right-to-Left** associative: \`2 ** 3 ** 2 = 2 ** (3 ** 2) = 2 ** 9 = 512\` (NOT \`(2**3)**2 = 64\`)!
> 2. Bitwise NOT \`~x\` is always equal to \`-(x + 1)\`.
> 3. Floor division with negative numbers rounds down towards $-\\infty$: \`-7 // 2\` evaluates to \`-4\`!

> [!NOTE] **DEV BRAIN:**
> In production code, never write convoluted expressions relying on obscure operator precedence tables. Always use explicit parentheses \`(a and b) or c\` to make your intent crystal clear to reviewers!

> [!WARNING] **TRAP:**
> The floor division of negative numbers \`-7 // 2\` is a favourite university trap question. Students write \`-3\`, but the answer is \`-4\`. Similarly, \`-7 % 2\` in Python evaluates to \`1\`, because Python uses modulo arithmetic satisfying $a = (a // b) \\times b + (a \\% b) \\implies -7 = (-4 \\times 2) + 1$.

> [!TIP] **EXAM TIP:**
> When solving precedence questions on paper, always write down each step explicitly. If you see \`2 ** 3 ** 2\`, immediately put brackets around the rightmost power: \`2 ** (3 ** 2)\` to avoid losing marks!`,
          shortNotes: "Precedence: () > ** (Right-to-Left!) > Unary (+,-,~) > *,/,//,% > +,- > Bitwise > Relational, is, in > not > and > or. ~x == -(x+1).",
          examples: [
            {
              title: "Demonstration of Operator Precedence, Right-to-Left Associativity, and Short Circuiting",
              problem: "Write a Python script to prove right-to-left associativity of exponentiation, negative floor division, and logical short-circuiting.",
              explanation: "Evaluate 2 ** 3 ** 2 vs (2 ** 3) ** 2, calculate -7 // 2 and -7 % 2, and trace short-circuit return values.",
              code: `# 1. Exponentiation Right-to-Left Associativity
val1 = 2 ** 3 ** 2
val2 = (2 ** 3) ** 2
print(f"2 ** 3 ** 2 = {val1} (Evaluated as 2 ** (3 ** 2) = 2 ** 9)")
print(f"(2 ** 3) ** 2 = {val2} (Forced left-to-right via parens)")

# 2. Negative Floor Division & Modulo Trap
print("-7 // 2 =", -7 // 2)  # -4 (Rounds down to -infinity)
print("-7 % 2  =", -7 % 2)   # 1  (-7 = (-4 * 2) + 1)

# 3. Bitwise NOT Formula: ~x == -(x + 1)
print("~10 =", ~10)          # -11
print("~(-5) =", ~(-5))      # 4

# 4. Short-Circuit Evaluation Return Values
print("'Hello' or 'World':", 'Hello' or 'World')  # 'Hello' (stops early)
print("0 or 'Default':", 0 or 'Default')          # 'Default'
print("[] and [1, 2]:", [] and [1, 2])            # [] (stops early)`,
              output: "2 ** 3 ** 2 = 512 (Evaluated as 2 ** (3 ** 2) = 2 ** 9)\n(2 ** 3) ** 2 = 64 (Forced left-to-right via parens)\n-7 // 2 = -4\n-7 % 2  = 1\n~10 = -11\n~(-5) = 4\n'Hello' or 'World': Hello\n0 or 'Default': Default\n[] and [1, 2]: []"
            },
          ],
          keyPoints: [
            "Python operators include Arithmetic, Relational, Logical, Bitwise, Assignment, Identity, and Membership.",
            "Exponentiation (**) has right-to-left associativity (2 ** 3 ** 2 = 512).",
            "Floor division (//) rounds down towards negative infinity (-7 // 2 = -4).",
            "Bitwise NOT (~x) inverts all bits and equals -(x + 1).",
            "Logical and / or perform short-circuit evaluation and return the operand value itself.",
            "Precedence order: () > ** > Unary > Math (*,/,//,%) > Addition (+,-) > Bitwise > Relational > not > and > or."
          ],
          theoryQuestions: [
            {
              question: "Construct the Operator Precedence Hierarchy Table in Python and explain the significance of operator associativity with examples.",
              marks: "5 Marks",
              answer: "Operator precedence dictates the order in which different operators are evaluated in a compound expression. When two operators have identical precedence, Associativity determines whether evaluation proceeds from Left-to-Right or Right-to-Left.\n\nPrecedence Hierarchy (High to Low):\n1. Parentheses: ()\n2. Exponentiation: ** (Right-to-Left)\n3. Unary operations: +x, -x, ~x\n4. Multiplicative: *, /, //, %\n5. Additive: +, -\n6. Bitwise Shifts: <<, >>\n7. Bitwise AND: &\n8. Bitwise XOR: ^\n9. Bitwise OR: |\n10. Comparisons, Identity (is), Membership (in)\n11. Logical NOT: not\n12. Logical AND: and\n13. Logical OR: or\n\nAssociativity Example:\nMost operators evaluate left-to-right (`10 - 4 - 2` = `(10 - 4) - 2 = 4`). However, exponentiation `**` evaluates right-to-left: `2 ** 3 ** 2` = `2 ** (3 ** 2) = 2 ** 9 = 512`.",
              keyPoints: ["Complete precedence ranking from () to or", "Explanation of associativity", "Right-to-left associativity of **", "Step-by-step example evaluation"]
            },
            {
              question: "What is Short-Circuit Evaluation in Python? Illustrate how 'and' and 'or' handle truth values.",
              marks: "3 Marks",
              answer: "Short-circuit evaluation is an optimization where the interpreter stops evaluating a compound boolean expression as soon as the overall outcome is determined:\n1. 'and' operator: If the left operand is falsy, the result is guaranteed to be falsy. Python stops immediately and returns the left operand without evaluating the right operand. If truthy, it evaluates and returns the right operand.\n2. 'or' operator: If the left operand is truthy, the overall condition must be true. Python immediately returns the left operand without checking the right operand. If falsy, it evaluates and returns the right operand.\nExample: `0 and print('Test')` never calls print because 0 is falsy.",
              keyPoints: ["Definition of short-circuit evaluation", "Behavior of 'and' with falsy left operand", "Behavior of 'or' with truthy left operand", "Prevention of unnecessary side effects"]
            },
          ],
          mcqs: [
            {
              question: "What is the evaluated output of the Python expression: 2 ** 2 ** 3?",
              options: ["64", "256", "512", "16"],
              correctIndex: 1,
              explanation: "Because ** evaluates from right to left, 2 ** 2 ** 3 is evaluated as 2 ** (2 ** 3) = 2 ** 8 = 256."
            },
            {
              question: "What does the expression ~7 evaluate to in Python?",
              options: ["-8", "-7", "8", "-6"],
              correctIndex: 0,
              explanation: "Bitwise NOT uses the formula ~x = -(x + 1). Therefore, ~7 = -(7 + 1) = -8."
            },
            {
              question: "What is the result of the expression: -11 // 3?",
              options: ["-3", "-4", "-3.66", "-3.0"],
              correctIndex: 1,
              explanation: "Floor division rounds down towards negative infinity. -11 / 3 = -3.666..., which rounds down to -4."
            },
          ]
        },
        {
          id: "py1-u2-t4",
          title: "Standard Input/Output: input(), print() formatting (f-strings, .format(), % specifiers)",
          simpleExplanation: "Programs need to talk to users! The input() function reads whatever the user types as text, while the print() function sends messages to the screen. To make numbers and messages look clean, Python offers three formatting styles: modern f-strings (f'{val:.2f}'), the .format() method, and classic % specifiers.",
          detailedExplanation: `## 1. Standard Input Handling with \`input()\`

In Python, user interaction is achieved through the built-in \`input()\` function.

### The Golden Rule of \`input()\`:
> **The \`input()\` function ALWAYS returns data as a string (\`str\`)!**

Even if the user types \`45\` or \`3.14\`, Python stores it as \`"45"\` or \`"3.14"\`. If you need to perform calculations, you must **explicitly cast** the input:
\`\`\`python
age = int(input("Enter your age: "))
price = float(input("Enter item price: "))
\`\`\`

### Reading Multiple Inputs on a Single Line:
In coding competitions and university practical exams, inputs are frequently provided on a single space-separated line. We use \`.split()\` combined with the \`map()\` function:
\`\`\`python
# Reading two integers: "10 20"
a, b = map(int, input("Enter two numbers: ").split())

# Reading an entire list of numbers: "5 12 8 99 3"
numbers = list(map(int, input("Enter array elements: ").split()))
\`\`\`

---

## 2. Standard Output with \`print()\`

The built-in \`print()\` function sends formatted text to the standard output stream (usually the console screen).

### Complete Function Signature:
\`\`\`python
print(*objects, sep=' ', end='\\n', file=sys.stdout, flush=False)
\`\`\`

- \`*objects\`: Any number of comma-separated items to display.
- \`sep\`: String inserted between separate objects. Default is a single space \`' '\`.
- \`end\`: String appended at the very end of the output. Default is a newline character \`'\\n'\`.
- \`file\`: An object with a \`write(string)\` method; defaults to \`sys.stdout\`. Can be directed to a text file!
- \`flush\`: Boolean. If \`True\`, forces the output buffer to immediately flush to the screen without waiting.

\`\`\`python
# Custom sep and end
print("25", "09", "2026", sep="-")           # Output: 25-09-2026
print("Loading", end="...")                  # Does not create a newline
print("Done!")                               # Output on same line: Loading...Done!
\`\`\`

---

## 3. Output Formatting Techniques Compared

Python has evolved three distinct string formatting mechanisms:

\`\`\`mermaid
flowchart TD
    Fmt["Python Formatting Styles"] --> F1["1. Modern f-strings (Python 3.6+)\\nf'Result: {x:.2f}'\\nFastest & Cleanest"]
    Fmt --> F2["2. str.format() (Python 2.7 / 3.0)\\n'{0:.2f}'.format(x)\\nPositional & Named placeholders"]
    Fmt --> F3["3. % Formatter (Printf style)\\n'%.2f' % x\\nLegacy C compatibility"]
\`\`\`

### Style 1: Modern f-strings (Formatted String Literals - PEP 498)
Introduced in Python 3.6, **f-strings** are prefixed with \`f\` or \`F\`. Expressions enclosed in curly braces \`{}\` are evaluated at runtime directly in the local scope.
- **Fastest execution speed** (compiled to specialized bytecode instructions).
- Supports inline math, function calls, and formatting format-specifiers.

\`\`\`python
name = "Alice"
cgpa = 9.876
print(f"Student: {name.upper()} | CGPA: {cgpa:.2f}")
# Output: Student: ALICE | CGPA: 9.88
\`\`\`

### Style 2: The \`str.format()\` Method
Introduced in Python 2.6/3.0. Uses \`{}\` placeholders replaced by arguments:
\`\`\`python
# Positional arguments
print("Hello {0}, you scored {1:.1f}%".format("Bob", 88.54))

# Named keyword arguments
print("Coordinates: Lat {lat}, Lon {lon}".format(lat=23.02, lon=72.57))
\`\`\`

### Style 3: Classic \`%\` (printf-style) Formatting
Legacy formatting inherited from C's \`printf\`:
- \`%s\`: String
- \`%d\`: Integer
- \`%f\`: Floating-point number
- \`%.2f\`: Floating-point rounded to 2 decimal places
- \`%x\` / \`%X\`: Hexadecimal integer
\`\`\`python
print("ID: %04d | Price: $%.2f" % (7, 19.95))
# Output: ID: 0007 | Price: $19.95
\`\`\`

---

## 4. Alignment, Padding, and Precision Specification Cheat Sheet

Within f-strings and \`.format()\`, a colon \`:\` indicates formatting specifications:

| Format Specifier | Technical Meaning | Example Usage | Formatted Output |
| :--- | :--- | :--- | :--- |
| \`:.2f\` | Float rounded to 2 decimal places | \`f"{3.14159:.2f}"\` | \`'3.14'\` |
| \`:>10\` | Right-aligned in a 10-character field | \`f"{'hi':>10}"\` | \`'        hi'\` |
| \`:<10\` | Left-aligned in a 10-character field | \`f"{'hi':<10}"\` | \`'hi        '\` |
| \`:^10\` | Centered in a 10-character field | \`f"{'hi':^10}"\` | \`'    hi    '\` |
| \`:08d\` | Zero-padded integer to 8 digits | \`f"{42:08d}"\` | \`'00000042'\` |
| \`:,\` | Thousands comma separator | \`f"{1000000:,}"\` | \`'1,000,000'\` |
| \`:.1%\` | Formats as percentage with 1 decimal | \`f"{0.856:.1%}"\` | \`'85.6%'\` |

> [!IMPORTANT] **MEMORIZE:**
> - \`input()\` always returns a string; use \`int(input())\` or \`float(input())\`.
> - \`print()\` parameters: \`sep\` controls space between items (default \`' '\`), \`end\` controls line termination (default \`'\\n'\`).
> - Modern Python standard is **f-strings** (\`f"Score: {val:.2f}"\`).
> - Field width formatting: \`<\` is left align, \`>\` is right align, \`^\` is center align.

> [!NOTE] **DEV BRAIN:**
> In Python 3.8+, f-strings support the debugging equal-sign specifier: \`f"{x=}"\` prints \`x=42\`. This saves immense time during rapid console debugging!

> [!WARNING] **TRAP:**
> Forgetting to cast \`input()\` causes silent concatenation bugs!
> \`\`\`python
> a = input("Num 1: ") # User types 10
> b = input("Num 2: ") # User types 20
> print(a + b)         # Prints "1020", NOT 30!
> \`\`\`

> [!TIP] **EXAM TIP:**
> When asked to format a tabular bill or student mark-sheet in an exam, use f-strings with width alignment specifiers: \`f"{name:<15}{marks:>5}"\` to produce perfectly aligned columns without manual spaces.`,
          shortNotes: "input() always returns str. print() has sep=' ' and end='\\n'. Format styles: f-strings (f'{val:.2f}'), .format(), % specifiers. Alignment: < left, > right, ^ center.",
          examples: [
            {
              title: "Comprehensive Demonstration of Formatted I/O & Tabular Alignment",
              problem: "Write a Python script that takes student records and displays a clean tabular grade sheet with custom alignments and decimal precision.",
              explanation: "Use f-strings with precision (:.2f), column padding (<, >), thousands separators (:,), and custom print sep and end parameters.",
              code: `# 1. Custom sep and end
print("Generating", "Report", sep="-", end="...")
print("DONE!\\n")

# 2. Student Data Table using f-strings with alignment specifiers
students = [
    ("Alice Johnson", 89.456, 125000),
    ("Bob Smith", 94.2, 98000),
    ("Charlie Brown", 76.891, 1500000)
]

# Header
print(f"{'Name':<18} | {'Score':>7} | {'Scholarship':>14}")
print("-" * 46)

# Rows
for name, score, scholarship in students:
    # :<18 = left aligned 18 chars
    # :>7.2f = right aligned 7 chars with 2 decimal places
    # :>14, = right aligned 14 chars with thousands commas
    print(f"{name:<18} | {score:>7.2f} | \${scholarship:>13,}")`,
              output: "Generating-Report...DONE!\n\nName               |   Score |    Scholarship\n----------------------------------------------\nAlice Johnson      |   89.46 | $      125,000\nBob Smith          |   94.20 | $       98,000\nCharlie Brown      |   76.89 | $    1,500,000"
            },
          ],
          keyPoints: [
            "input() reads user input strictly as a string; explicit type casting is mandatory for arithmetic.",
            "Multiple inputs on one line can be processed via map(int, input().split()).",
            "print() features sep (item separator) and end (line terminator) arguments.",
            "f-strings (f'{expr}') evaluate expressions at runtime and are the fastest and cleanest formatting method.",
            "Formatting specifiers control precision (:.2f), alignment (<, >, ^), padding (:05d), and commas (:,)."
          ],
          theoryQuestions: [
            {
              question: "Explain the working of the print() function with all its keyword arguments. Compare f-strings with str.format() and % formatting.",
              marks: "5 Marks",
              answer: "The print() function has the signature:\n`print(*objects, sep=' ', end='\\n', file=sys.stdout, flush=False)`\n- `*objects`: Comma-separated values printed to stream.\n- `sep`: Separator placed between objects (default single space).\n- `end`: Appended after the last object (default newline '\\n').\n- `file`: Output stream destination (default console sys.stdout).\n- `flush`: Forces stream buffer flushing if True.\n\nFormatting Comparisons:\n1. f-strings (Python 3.6+): `f'{val:.2f}'` - evaluated at runtime directly, cleanest syntax, fastest execution.\n2. str.format(): `'{:.2f}'.format(val)` - uses positional/named placeholders, slightly slower.\n3. % operator: `'%.2f' % val` - legacy C-style printf interpolation, prone to tuple errors.",
              keyPoints: ["print() signature and parameters (sep, end, file, flush)", "f-strings syntax and performance", "str.format() method mechanics", "% operator legacy formatting"]
            },
            {
              question: "How can you read two integers entered on a single space-separated line in Python? Explain with code.",
              marks: "3 Marks",
              answer: "To read multiple values from a single line:\n```python\na, b = map(int, input('Enter two integers: ').split())\n```\nExplanation:\n1. `input()` reads the entire entered text line as a single string (e.g., `'10 20'`).\n2. `.split()` splits the string on whitespace, producing a list of string tokens: `['10', '20']`.\n3. `map(int, ...)` applies the `int` conversion constructor to each string token.\n4. Multiple assignment unpacks the two resulting integers into variables `a` and `b`.",
              keyPoints: ["Use of input().split()", "Role of map(int, ...)", "Variable unpacking (a, b)", "Sample input and trace"]
            },
          ],
          mcqs: [
            {
              question: "What is the return type of the built-in input() function in Python 3?",
              options: ["int", "float", "str", "object"],
              correctIndex: 2,
              explanation: "input() always returns user input as a string (str) object."
            },
            {
              question: "What is printed by: print('A', 'B', 'C', sep='-', end='*')?",
              options: ["A-B-C*", "A B C-*", "A-B-C\\n*", "A-B-C*\\n"],
              correctIndex: 0,
              explanation: "The items are joined with sep='-' yielding 'A-B-C', and terminated with end='*' yielding 'A-B-C*'."
            },
            {
              question: "Which f-string specifier correctly formats the number 42 as an 8-character wide zero-padded integer?",
              options: ["f'{42:8z}'", "f'{42:08d}'", "f'{42:>08}'", "f'{42:#08d}'"],
              correctIndex: 1,
              explanation: "The specifier ':08d' formats an integer with width 8, padding leading empty spaces with zeros (e.g. 00000042)."
            },
          ]
        },
      ]
    },
    {
      id: "py1-u3",
      title: "Unit 3: Control Flow & Iterative Loops",
      description: "Decision-making constructs, conditional branching, while loops, for loops with range, loop control statements (break/continue/pass), unique loop-else semantics, and pattern printing.",
      topics: [
        {
          id: "py1-u3-t1",
          title: "Conditional Branching (if, if-else, if-elif-else, nested if, ternary operator)",
          simpleExplanation: "Conditional branching is like standing at a fork in the road and deciding which path to take based on the weather. If it rains, take the umbrella path; otherwise, walk in the sunshine. In Python, we write this using if, elif, and else statements, indented with 4 spaces instead of using curly brackets.",
          detailedExplanation: `## 1. Why Decision Making is Essential in Programming

By default, Python executes instructions in a linear sequential order from top to bottom. However, real-world problems require software to evaluate conditions and make dynamic choices based on data inputs.

In Python, decision-making is implemented through **Conditional Statements**. Unlike languages like C, C++, or Java that use curly braces \`{}\` to define code blocks, Python uses **Whitespace Indentation (Suite)** preceded by a colon \`:\`.

\`\`\`mermaid
flowchart TD
    Start([Condition Check]) --> D{Is condition True?}
    D -- Yes --> B1[Execute 'if' Suite]
    D -- No --> D2{Is 'elif' True?}
    D2 -- Yes --> B2[Execute 'elif' Suite]
    D2 -- No --> B3[Execute 'else' Fallback Suite]
    B1 --> Exit([Continue Program])
    B2 --> Exit
    B3 --> Exit
\`\`\`

---

## 2. Syntax Forms of Conditional Branching

### A. The Single \`if\` Statement
Executes a block of code only if the condition evaluates to \`True\`. If \`False\`, the block is bypassed:
\`\`\`python
if condition:
    # Statement suite (indented 4 spaces)
    statement_1
\`\`\`

### B. The \`if-else\` Statement
Provides two mutually exclusive branches: one executed when the condition is \`True\`, the other when \`False\`:
\`\`\`python
if score >= 50:
    print("Passed")
else:
    print("Failed")
\`\`\`

### C. The Multi-way \`if-elif-else\` Ladder
When testing multiple mutually exclusive conditions in sequence. Python tests each condition from top to bottom:
- The **first condition that evaluates to True** executes its block.
- Once an \`elif\` block executes, Python **skips all remaining branches**!
- The final optional \`else\` block catches all cases where none of the conditions were met.

\`\`\`python
score = 85
if score >= 90:
    grade = "A+"
elif score >= 80:
    grade = "A"
elif score >= 70:
    grade = "B"
elif score >= 60:
    grade = "C"
else:
    grade = "F"
\`\`\`

### D. Nested \`if\` Statements
An \`if\` statement placed inside another \`if\` or \`else\` block. Useful for hierarchical decision trees:
\`\`\`python
if age >= 18:
    if has_license:
        print("Authorized to drive.")
    else:
        print("Must obtain a driving license.")
else:
    print("Underage; cannot drive.")
\`\`\`

---

## 3. Python's Conditional Expression (Ternary Operator)

Python provides an elegant one-line syntax for simple \`if-else\` assignments called a **Conditional Expression**:

$$\\text{value\\_if\\_true} \\text{ if } \\text{condition} \\text{ else } \\text{value\\_if\\_false}$$

\`\`\`python
# Traditional 4-line if-else:
if age >= 18:
    status = "Adult"
else:
    status = "Minor"

# Elegant 1-line Python Ternary Expression:
status = "Adult" if age >= 18 else "Minor"
\`\`\`

You can even nest ternary expressions (though use sparingly to preserve readability):
\`\`\`python
result = "Positive" if num > 0 else ("Negative" if num < 0 else "Zero")
\`\`\`

---

## 4. Indentation Mechanics and Common Errors

Python's parser enforces indentation strictly. Indentation defines the scope and ownership of statements:
- Mixing tabs and spaces results in \`TabError\`.
- Forgetting the colon \`:\` at the end of \`if\`, \`elif\`, or \`else\` causes a \`SyntaxError\`.
- Inconsistent spacing causes \`IndentationError: unexpected indent\`.

| Language Construct | C / C++ / Java | Python |
| :--- | :--- | :--- |
| **Block Delimiter** | Curly braces \`{ ... }\` | Colon \`:\` and 4-space Indentation |
| **Else If Keyword** | \`else if\` | \`elif\` |
| **Parentheses on Condition**| Mandatory \`if (x > 0)\` | Optional \`if x > 0:\` |
| **Ternary Syntax** | \`condition ? val1 : val2\` | \`val1 if condition else val2\` |

> [!IMPORTANT] **MEMORIZE:**
> - Python uses **\`elif\`**, NOT \`else if\` or \`elseif\`.
> - The colon **\`:\`** is mandatory after \`if\`, \`elif\`, and \`else\`.
> - In an \`if-elif-else\` ladder, **only one block can execute**—the first one whose condition evaluates to \`True\`.
> - The ternary operator syntax is \`X if Condition else Y\`.

> [!NOTE] **DEV BRAIN:**
> Python 3.10 introduced the \`match ... case\` structural pattern matching statement (similar to advanced switch-case in other languages). However, \`if-elif-else\` remains the fundamental building block for logic branching.

> [!WARNING] **TRAP:**
> Beware of using assignment \`=\` instead of equality comparison \`==\`!
> In C, \`if (x = 5)\` assigns 5 and evaluates truthiness. In Python, \`if x = 5:\` is an immediate, compile-time \`SyntaxError: invalid syntax\`—Python actively prevents this bug!

> [!TIP] **EXAM TIP:**
> When writing nested if statements in paper exams, clearly indent each inner block by 1 inch. If your indentation is ambiguous or aligned with the outer if, examiners will deduct marks!`,
          shortNotes: "Branching: if, if-else, if-elif-else. Indentation (4 spaces) defines blocks. Ternary: value_if_true if condition else value_if_false.",
          examples: [
            {
              title: "Comprehensive Demonstration of if-elif-else and Ternary Operator",
              problem: "Write a Python script to categorize a student's grade based on marks and compute tax discount using a ternary expression.",
              explanation: "Demonstrate the if-elif-else ladder, nested conditions for scholarship checks, and the one-line ternary operator.",
              code: `def evaluate_student(marks: float, is_sports_quota: bool) -> tuple[str, str]:
    # 1. if-elif-else Ladder
    if marks >= 90:
        grade = "A+"
    elif marks >= 80:
        grade = "A"
    elif marks >= 70:
        grade = "B"
    elif marks >= 50:
        grade = "C"
    else:
        grade = "F"
        
    # 2. Nested if with Sports Quota
    if grade in ["A+", "A"]:
        scholarship = "Full Scholarship" if is_sports_quota else "Half Scholarship"
    else:
        scholarship = "Sports Support Only" if is_sports_quota else "No Scholarship"
        
    return grade, scholarship

# Execution
g1, s1 = evaluate_student(92.5, True)
g2, s2 = evaluate_student(84.0, False)
g3, s3 = evaluate_student(45.0, True)

print(f"Student 1 (92.5%, Sports): Grade {g1} -> {s1}")
print(f"Student 2 (84.0%, Academic): Grade {g2} -> {s2}")
print(f"Student 3 (45.0%, Sports): Grade {g3} -> {s3}")`,
              output: "Student 1 (92.5%, Sports): Grade A+ -> Full Scholarship\nStudent 2 (84.0%, Academic): Grade A -> Half Scholarship\nStudent 3 (45.0%, Sports): Grade F -> Sports Support Only"
            },
          ],
          keyPoints: [
            "Python uses 4 spaces indentation instead of curly braces to define statement suites.",
            "In an if-elif-else ladder, evaluation terminates at the very first true condition.",
            "The else block is optional and serves as a default fallback.",
            "The Python ternary expression format is: true_val if condition else false_val.",
            "Using assignment = inside if conditions produces a SyntaxError in Python."
          ],
          theoryQuestions: [
            {
              question: "Explain the different forms of conditional statements in Python with syntax and flow diagrams.",
              marks: "5 Marks",
              answer: "1. Simple if: Executes code block if condition is true.\nSyntax: `if cond: suite`\n2. if-else: Selects between two mutually exclusive blocks.\nSyntax: `if cond: suite1 else: suite2`\n3. if-elif-else Ladder: Tests multiple conditions sequentially. Only the first truthy suite executes; if none match, the optional else suite executes.\nSyntax: `if c1: s1 elif c2: s2 else: s3`\n4. Nested if: An if statement enclosed within another if statement.\n5. Ternary Operator: Inline expression returning one of two values: `x if cond else y`.",
              keyPoints: ["Syntax and behavior of if, if-else, and if-elif-else", "Explanation of mutual exclusivity in elif ladders", "Role of indentation suites", "Ternary operator syntax and usage"]
            },
            {
              question: "Write a Python program to find the largest among three numbers using nested if statements.",
              marks: "3 Marks",
              answer: "```python\na = int(input('A: '))\nb = int(input('B: '))\nc = int(input('C: '))\n\nif a >= b:\n    if a >= c:\n        largest = a\n    else:\n        largest = c\nelse:\n    if b >= c:\n        largest = b\n    else:\n        largest = c\n\nprint('Largest is:', largest)\n```",
              keyPoints: ["Nested comparison logic", "Handling of equality conditions", "Clear indentation blocks"]
            },
          ],
          mcqs: [
            {
              question: "Which keyword is used in Python for 'else if' conditional branching?",
              options: ["else if", "elseif", "elif", "case"],
              correctIndex: 2,
              explanation: "Python explicitly uses the keyword 'elif' to represent 'else if'."
            },
            {
              question: "What is the result of the ternary expression: 'Pass' if 65 >= 50 else 'Fail'?",
              options: ["'Pass'", "'Fail'", "True", "SyntaxError"],
              correctIndex: 0,
              explanation: "Because 65 >= 50 is True, the expression evaluates to the value preceding the 'if', which is 'Pass'."
            },
            {
              question: "What happens if you write 'if x = 10:' in Python?",
              options: ["x is assigned 10 and the condition evaluates to True", "Python throws a SyntaxError", "Python throws a TypeError", "x is compared to 10"],
              correctIndex: 1,
              explanation: "Python does not allow the assignment operator '=' inside condition headers; doing so triggers a SyntaxError."
            },
          ]
        },
        {
          id: "py1-u3-t2",
          title: "The while Loop, Sentinel Loops & Infinite Loop Traps",
          simpleExplanation: "A while loop is like a security guard standing at a gate: as long as the password is correct (condition is True), you can keep running around the track. But if you forget to count your laps (update condition), you will run forever in an infinite loop! Sentinel loops are loops that keep going until the user enters a special secret word like 'quit'.",
          detailedExplanation: `## 1. Mechanics of the \`while\` Loop

A **\`while\` loop** is a pre-test conditional loop (entry-controlled loop). It repeatedly executes a block of target statements as long as a given boolean condition evaluates to \`True\`.

### The Three Critical Pillars of Any Loop:
Every robust while loop must incorporate three distinct phases:
1. **Initialization:** Setting up loop control variables before the loop begins (e.g., \`count = 1\`).
2. **Condition Test:** Evaluated *before* every iteration. If \`True\`, the body executes. If \`False\`, the loop terminates.
3. **Update (Increment/Decrement):** Modifying the loop control variable inside the body so the condition eventually becomes \`False\`.

\`\`\`mermaid
flowchart TD
    Init["1. Initialization\\n(count = 1)"] --> Cond{2. Condition Test\\n(count <= 5?)}
    Cond -- True --> Body["Loop Body Statements\\n(print count)"]
    Body --> Upd["3. Update Step\\n(count += 1)"]
    Upd --> Cond
    Cond -- False --> Term["Exit Loop & Continue"]
\`\`\`

\`\`\`python
# Basic while loop structure
count = 1                 # 1. Initialization
while count <= 5:         # 2. Condition
    print(f"Lap {count}")
    count += 1            # 3. Update step
\`\`\`

---

## 2. Sentinel-Controlled Loops

In real-world programming, we often do not know in advance how many times a loop should execute. Instead, the loop should keep accepting data until the user inputs a predetermined termination marker called a **Sentinel Value** (e.g., \`-1\`, \`'quit'\`, \`'exit'\`).

\`\`\`python
total = 0
count = 0

print("Enter student scores (type -1 to stop):")
score = float(input("Score: "))

# -1 acts as the sentinel value
while score != -1:
    total += score
    count += 1
    score = float(input("Score: "))

if count > 0:
    print(f"Average score: {total / count:.2f}")
else:
    print("No valid scores were entered.")
\`\`\`

---

## 3. The Infinite Loop Trap: Causes and Safeguards

An **Infinite Loop** occurs when the loop condition always remains \`True\` and never terminates naturally. This freezes the program, consumes 100% of a CPU core, and can crash servers.

### Common Causes of Infinite Loops:
1. **Forgetting the Update Step:**
   \`\`\`python
   i = 1
   while i <= 5:
       print(i)
       # BUG: Missing 'i += 1'! i stays 1 forever!
   \`\`\`
2. **Updating in the Wrong Direction:**
   \`\`\`python
   i = 10
   while i > 0:
       print(i)
       i += 1  # BUG: i is increasing towards infinity (10, 11, 12...), never reaches 0!
   \`\`\`
3. **Floating Point Comparison Inaccuracy:**
   \`\`\`python
   val = 0.0
   while val != 1.0: # DANGEROUS! Due to IEEE 754 precision, val might hit 0.9999999999999999 and skip 1.0!
       val += 0.1
   \`\`\`

### Intentional Infinite Loops with Break:
In system daemons, game loops, and server listeners, infinite loops are created intentionally using \`while True:\` and exited via explicit break conditions:
\`\`\`python
while True:
    command = input("Prompt> ").strip().lower()
    if command == "exit":
        print("Shutting down daemon...")
        break
    print(f"Processing command: {command}")
\`\`\`

---

## 4. Classic Mathematical Algorithms Using While Loops

### A. Reversing the Digits of an Integer
Given a number $N = 1234$, extract digits from right to left using modulo \`% 10\` and integer division \`// 10\`:
\`\`\`python
def reverse_number(n: int) -> int:
    reversed_num = 0
    while n > 0:
        remainder = n % 10
        reversed_num = (reversed_num * 10) + remainder
        n = n // 10
    return reversed_num
\`\`\`

### B. Finding the Greatest Common Divisor (Euclidean Algorithm)
\`\`\`python
def compute_gcd(a: int, b: int) -> int:
    while b != 0:
        a, b = b, a % b
    return a
\`\`\`

> [!IMPORTANT] **MEMORIZE:**
> - \`while\` is an **entry-controlled** loop (tests condition BEFORE running body).
> - Every while loop requires: **Initialization**, **Condition Test**, and **Update**.
> - A **Sentinel Value** is a special input value used to signal the end of data entry.
> - \`while True:\` creates a loop that runs until an explicit \`break\` or \`return\` is triggered.

> [!NOTE] **DEV BRAIN:**
> In event-driven programming (e.g., Pygame, FastAPI servers, GUI applications), the entire application is powered by an outer \`while is_running:\` event loop that processes user keystrokes, network packets, and frame renderings.

> [!WARNING] **TRAP:**
> Never use exact equality \`!=\` when looping over floating-point increments! Always use relational bounds like \`while val < 1.0:\` or check using \`math.isclose()\` to avoid infinite loops caused by rounding artifacts!

> [!TIP] **EXAM TIP:**
> When asked to reverse a number or check for a palindrome in an exam, the standard while loop with \`% 10\` and \`// 10\` is the expected model answer. Trace the variables \`n\`, \`remainder\`, and \`reversed_num\` in a trace table to gain top marks.`,
          shortNotes: "while is an entry-controlled loop. Needs Init, Condition, Update. Sentinel values trigger exit. Reversing digits: n % 10 and n // 10.",
          examples: [
            {
              title: "Palindrome Number Checker and Euclidean GCD using While Loop",
              problem: "Write a Python script to verify if a number is a Palindrome (reads same forwards and backwards) and compute the GCD of two numbers using while loops.",
              explanation: "Use digit extraction (% 10, // 10) to construct the reversed integer, and use Euclid's modulo reduction for GCD.",
              code: `def is_palindrome(num: int) -> bool:
    original = num
    reversed_num = 0
    while num > 0:
        digit = num % 10
        reversed_num = (reversed_num * 10) + digit
        num = num // 10
    return original == reversed_num

def gcd(a: int, b: int) -> int:
    while b != 0:
        a, b = b, a % b
    return a

# Test cases
print("Is 1221 Palindrome?", is_palindrome(1221))
print("Is 1234 Palindrome?", is_palindrome(1234))
print("GCD of 48 and 18:", gcd(48, 18))`,
              output: "Is 1221 Palindrome? True\nIs 1234 Palindrome? False\nGCD of 48 and 18: 6"
            },
          ],
          keyPoints: [
            "while loops are entry-controlled loops that evaluate conditions before entering the loop suite.",
            "Three components are essential: loop variable initialization, condition evaluation, and update modification.",
            "Sentinel loops execute continuously until a special sentinel value is detected from input.",
            "Missing the update step or incrementing in the wrong direction creates infinite loops.",
            "Digit reversal uses remainder = n % 10 followed by reduction n = n // 10."
          ],
          theoryQuestions: [
            {
              question: "What is an entry-controlled loop? Explain the anatomy of the while loop and discuss what causes infinite loop traps.",
              marks: "5 Marks",
              answer: "An entry-controlled loop tests its terminating condition prior to executing the loop body. If the condition is false initially, the body is never executed.\n\nAnatomy of a while loop:\n1. Initialization: Variable is set before entering loop.\n2. Condition: Evaluated before each iteration.\n3. Loop Body: Statements executed repeatedly.\n4. Update: Modifies the loop control variable so the condition eventually becomes false.\n\nInfinite Loop Traps:\nAn infinite loop occurs when the condition never evaluates to False. Causes include:\n- Omitting the update statement (e.g., forgetting `i += 1`).\n- Updating in the wrong direction (e.g., `i -= 1` when condition is `i < 10`).\n- Floating-point equality comparison bugs where numbers do not land on exact values due to IEEE 754 precision.",
              keyPoints: ["Entry-controlled definition", "Initialization, condition, and update steps", "Causes of infinite loops", "Examples of infinite loop bugs"]
            },
            {
              question: "Explain Sentinel-controlled loops with a practical Python code example.",
              marks: "3 Marks",
              answer: "A sentinel-controlled loop is an indefinite loop that continues accepting and processing input until a specific predetermined value, known as a Sentinel Value, is entered by the user. It is used when the exact number of iterations is unknown in advance.\n\nExample:\n```python\ntotal = 0\nval = int(input('Enter positive numbers (-1 to stop): '))\nwhile val != -1:\n    total += val\n    val = int(input('Next: '))\nprint('Sum:', total)\n```\nHere, `-1` is the sentinel value signaling termination.",
              keyPoints: ["Definition of sentinel value", "Indefinite iteration rationale", "Code example demonstrating sentinel check"]
            },
          ],
          mcqs: [
            {
              question: "Why is the Python while loop classified as an 'entry-controlled' loop?",
              options: ["Because it checks the condition before executing the loop body", "Because it executes at least once regardless of condition", "Because it can only be entered from the main function", "Because it compiles into an entry table in bytecode"],
              correctIndex: 0,
              explanation: "Entry-controlled loops test the boolean condition at the entry point of each iteration before executing the body."
            },
            {
              question: "What is the output of the following code snippet?\ni = 1\nwhile i < 1:\n    print(i)\n    i += 1",
              options: ["1", "0", "Infinite loop", "No output"],
              correctIndex: 3,
              explanation: "Since i = 1, the condition (1 < 1) evaluates to False on the very first check, so the loop body is never entered."
            },
            {
              question: "Which operator combination is typically used to reverse the digits of an integer in a while loop?",
              options: ["/ and *", "% 10 and // 10", "** and %", ">> and <<"],
              correctIndex: 1,
              explanation: "% 10 extracts the last digit, while // 10 discards the last digit from the number."
            },
          ]
        },
        {
          id: "py1-u3-t3",
          title: "The for Loop & the range() Function (start, stop, step variations)",
          simpleExplanation: "In Python, a for loop is not like the clunky counter loops in C or Java\u2014it is a 'for-each' loop that smoothly visits every item in a sequence, like reading through each student on an attendance sheet. The range() function is a number generator that automatically creates sequences like [0, 1, 2, 3] without taking up lots of memory.",
          detailedExplanation: `## 1. The Python \`for\` Loop: A For-Each Iterator

In traditional languages like C or Java, a \`for\` loop is fundamentally an index-stepping counter:
\`\`\`c
// C style loop: Manual counter management
for (int i = 0; i < 5; i++) {
    printf("%d\\n", i);
}
\`\`\`

In Python, the \`for\` loop is fundamentally an **Iterator-based For-Each Loop**. It iterates directly over the items of any **iterable sequence** (such as a list, string, tuple, dictionary, or \`range\` generator) in the order they appear:

\`\`\`python
# Iterating over characters in a string
for char in "PYTHON":
    print(char, end=" ")
# Output: P Y T H O N 
\`\`\`

\`\`\`mermaid
flowchart LR
    Seq["Iterable Sequence\\n['Alice', 'Bob', 'Charlie']"] --> Iter["Iterator Protocol\\n(__iter__, __next__)"]
    Iter --> Var["Loop Variable\\n(item)"]
    Var --> Body["Execute Loop Body"]
    Body --> Iter
\`\`\`

---

## 2. The \`range()\` Function in Depth

When we need to execute a loop a specific number of times, we pair the \`for\` loop with the built-in **\`range()\`** function.

### Syntax & The Three Variations:
\`\`\`python
range(stop)                        # Form 1: 1 argument
range(start, stop)                 # Form 2: 2 arguments
range(start, stop, step)           # Form 3: 3 arguments
\`\`\`

- **\`start\` (Optional):** Starting integer of the sequence. Defaults to \`0\`.
- **\`stop\` (Mandatory):** Upper bound of the sequence. **The \`stop\` value is EXCLUSIVE** (the sequence stops at \`stop - 1\`).
- **\`step\` (Optional):** The increment between each number. Defaults to \`1\`. Can be positive or negative!

### Visualizing the Variations:
| Function Call | Generated Sequence | Description |
| :--- | :--- | :--- |
| \`range(5)\` | \`0, 1, 2, 3, 4\` | Starts at 0, goes up to $5-1=4$ |
| \`range(2, 7)\` | \`2, 3, 4, 5, 6\` | Starts at 2, goes up to $7-1=6$ |
| \`range(1, 10, 2)\` | \`1, 3, 5, 7, 9\` | Odd numbers, stepping by +2 |
| \`range(10, 0, -2)\`| \`10, 8, 6, 4, 2\` | Countdown reverse sequence, stepping by -2 |
| \`range(5, 5)\` | *Empty sequence* | Start equals stop -> 0 iterations |
| \`range(10, 2, 1)\` | *Empty sequence* | Step is positive but start > stop! |

---

## 3. Memory Efficiency: Why \`range\` is an Immutable Sequence, Not a List

In Python 2, \`range(1_000_000)\` constructed a physical list in RAM containing one million integer objects, consuming over 30 Megabytes of memory.

In Python 3, \`range()\` returns an **immutable sequence type (a lazy generator)**. It generates numbers on demand as the loop iterates:
- \`range(1_000_000_000)\` consumes only **48 bytes of memory**!
- It calculates elements mathematically on the fly in $O(1)$ constant time using the formula:
  $$\\text{value}_i = \\text{start} + (i \\times \\text{step})$$

\`\`\`python
import sys
r = range(10_000_000)
print(sys.getsizeof(r))  # Only 48 bytes!
\`\`\`

---

## 4. Advanced Iteration Utilities: \`enumerate()\` and \`zip()\`

Python provides two powerful built-in functions to supercharge \`for\` loops:

### A. \`enumerate(iterable, start=0)\`
Returns an iterator of tuples containing the index counter and the corresponding item:
\`\`\`python
fruits = ["Apple", "Banana", "Cherry"]
for index, fruit in enumerate(fruits, start=1):
    print(f"{index}. {fruit}")
# Output:
# 1. Apple
# 2. Banana
# 3. Cherry
\`\`\`

### B. \`zip(*iterables)\`
Iterates over multiple sequences in parallel, pairing corresponding elements together:
\`\`\`python
names = ["Alice", "Bob", "Charlie"]
scores = [95, 88, 92]

for name, score in zip(names, scores):
    print(f"{name} scored {score}")
\`\`\`

> [!IMPORTANT] **MEMORIZE:**
> - \`range(start, stop, step)\`: \`stop\` is **EXCLUSIVE** (never included in the output).
> - Default \`start\` is **\`0\`**; default \`step\` is **\`1\`**.
> - For countdowns, \`step\` must be negative (e.g., \`range(5, 0, -1)\` produces \`5, 4, 3, 2, 1\`).
> - \`enumerate()\` provides index and value simultaneously.
> - Python 3 \`range()\` uses $O(1)$ constant memory regardless of how large the sequence is.

> [!NOTE] **DEV BRAIN:**
> Never write \`for i in range(len(my_list)): val = my_list[i]\`. This is an anti-pattern in Python. Either iterate directly \`for val in my_list:\`, or use \`for i, val in enumerate(my_list):\` if you need indices!

> [!WARNING] **TRAP:**
> Writing \`range(10, 0)\` with no step will NOT produce numbers counting down from 10 to 1! Since default step is \`+1\`, \`10 + 1 = 11\` moves away from 0, resulting in an empty loop that never executes! You MUST specify a negative step: \`range(10, 0, -1)\`.

> [!TIP] **EXAM TIP:**
> If an exam question asks: *"What does \`range(1, 10, 3)\` produce?"*, write the sequence explicitly: \`1, 4, 7\` (10 is excluded!). Calculate it step by step: $1 \\to 1+3=4 \\to 4+3=7 \\to 7+3=10$ (stop reached -> omit 10).`,
          shortNotes: "for loop is a for-each sequence iterator. range(start, stop, step) excludes stop. range is memory-efficient (lazy). Use enumerate() for index tracking.",
          examples: [
            {
              title: "Demonstrating range() variations, enumerate(), and zip()",
              problem: "Write a Python script demonstrating forward range, countdown range, index enumeration, and parallel list iteration.",
              explanation: "Demonstrate the range variations and show pythonic iteration using enumerate and zip.",
              code: `# 1. Countdown range
print("Rocket Countdown:")
for count in range(5, 0, -1):
    print(count, end=" -> ")
print("BLASTOFF!\\n")

# 2. Step variation
print("Multiples of 3 below 20:")
for n in range(3, 20, 3):
    print(n, end=" ")
print("\\n")

# 3. Pythonic enumerate
languages = ["Python", "TypeScript", "Rust"]
print("Top Languages:")
for rank, lang in enumerate(languages, start=1):
    print(f"Rank #{rank}: {lang}")
print()

# 4. Parallel iteration with zip
roll_nos = [101, 102, 103]
names = ["Dev", "Priya", "Rohan"]
for r, n in zip(roll_nos, names):
    print(f"Roll {r}: {n}")`,
              output: "Rocket Countdown:\n5 -> 4 -> 3 -> 2 -> 1 -> BLASTOFF!\n\nMultiples of 3 below 20:\n3 6 9 12 15 18 \n\nTop Languages:\nRank #1: Python\nRank #2: TypeScript\nRank #3: Rust\n\nRoll 101: Dev\nRoll 102: Priya\nRoll 103: Rohan"
            },
          ],
          keyPoints: [
            "Python's for loop operates as a for-each sequence iterator via the iterator protocol.",
            "range(start, stop, step) generates sequences on demand; the stop argument is always exclusive.",
            "range() objects in Python 3 are lazy sequences consuming O(1) constant memory.",
            "Countdown sequences require a negative step parameter e.g., range(10, 0, -1).",
            "enumerate() pairs each element with its sequential index; zip() pairs elements across multiple iterables."
          ],
          theoryQuestions: [
            {
              question: "Explain the range() function in Python with all its argument variations. How does range() in Python 3 differ in memory utilization from Python 2?",
              marks: "5 Marks",
              answer: "The range() function produces an immutable sequence of integers. It has three syntactic variations:\n1. `range(stop)`: Produces integers from 0 up to stop - 1 (default start=0, step=1).\n2. `range(start, stop)`: Produces integers from start up to stop - 1 (default step=1).\n3. `range(start, stop, step)`: Produces integers from start up to stop - 1 incrementing by step.\n\nMemory Difference:\n- Python 2: `range()` eagerly created the entire list in memory. For `range(1000000)`, it allocated memory for 1 million integer pointers immediately, causing massive memory overhead.\n- Python 3: `range()` creates a lazy generator sequence object that computes values on demand in O(1) space, consuming only 48 bytes regardless of how large the sequence range is.",
              keyPoints: ["Three argument signatures of range()", "Exclusive nature of stop value", "Memory comparison: Python 2 eager list vs Python 3 lazy immutable sequence", "O(1) memory efficiency"]
            },
            {
              question: "What is the purpose of enumerate() and zip() functions in Python? Illustrate with examples.",
              marks: "3 Marks",
              answer: "1. `enumerate(iterable, start=0)`: Adds an automatic counter to an iterable and returns it as an enumerate object containing tuples of `(index, item)`. It eliminates the need for manual counter variables.\nExample: `for i, v in enumerate(['a', 'b']): print(i, v)`\n2. `zip(*iterables)`: Aggregates elements from multiple iterables into tuples element-wise, terminating when the shortest input iterable is exhausted.\nExample: `for x, y in zip([1, 2], ['a', 'b']): print(x, y)`",
              keyPoints: ["Purpose and return type of enumerate()", "Purpose of zip() for parallel iteration", "Code snippets illustrating usage"]
            },
          ],
          mcqs: [
            {
              question: "What sequence of numbers is generated by list(range(3, 12, 3))?",
              options: ["[3, 6, 9, 12]", "[3, 6, 9]", "[6, 9, 12]", "[3, 5, 7, 9, 11]"],
              correctIndex: 1,
              explanation: "Starts at 3, steps by 3 (3, 6, 9). 12 is excluded because the stop value is strictly exclusive."
            },
            {
              question: "What is the result of executing: list(range(5, 0))?",
              options: ["[5, 4, 3, 2, 1]", "[5, 4, 3, 2, 1, 0]", "[] (Empty list)", "Error"],
              correctIndex: 2,
              explanation: "Because the step defaults to +1, starting at 5 and incrementing by +1 will never reach 0, producing an empty sequence []."
            },
            {
              question: "How much memory does range(10_000_000) consume in Python 3?",
              options: ["Approx 40 Megabytes", "Approx 80 Megabytes", "Constant memory (approx 48 bytes)", "1 Gigabyte"],
              correctIndex: 2,
              explanation: "In Python 3, range() is a generator-like sequence type that calculates items lazily, requiring O(1) constant memory (~48 bytes)."
            },
          ]
        },
        {
          id: "py1-u3-t4",
          title: "Loop Control: break, continue, pass & the unique loop-else clause",
          simpleExplanation: "Sometimes you need to steer your loop: 'break' hits the emergency brakes and stops the loop completely; 'continue' skips the rest of the current lap and jumps straight to the next one; and 'pass' does absolutely nothing\u2014it's just a placeholder. Python also has a superpower found in almost no other language: the 'loop-else' clause, which only runs if the loop finished naturally without getting broken!",
          detailedExplanation: `## 1. Loop Control Statements Overview

Loop control statements alter the normal sequential execution flow of loops. Python supports three core control statements:
- **\`break\`:** Immediate exit from the innermost loop.
- **\`continue\`:** Skips the rest of the current iteration and jumps to the next cycle.
- **\`pass\`:** A null syntactic statement that does nothing.

\`\`\`mermaid
flowchart TD
    Cond{Loop Condition} -- True --> S1[Statements]
    S1 --> Check{Control Statement?}
    Check -- break --> Exit([Exit Loop Immediately])
    Check -- continue --> Cond
    Check -- pass --> S2[Continue Current Iteration]
    S2 --> Cond
    Cond -- False (Natural Exit) --> ElseBlock[Execute loop-else Block]
    ElseBlock --> Done([Done])
\`\`\`

---

## 2. In-Depth Analysis of Statements

### A. The \`break\` Statement
Terminates the loop immediately and transfers control to the statement directly following the loop.
- Useful for searching algorithms: once the target element is found, there is no need to examine the remaining items.
\`\`\`python
for num in [10, 25, 42, 67, 89]:
    if num == 42:
        print("Found target 42!")
        break # Halts loop immediately; 67 and 89 are never evaluated
\`\`\`

### B. The \`continue\` Statement
Rejects all remaining statements in the current iteration and returns control to the loop header:
- In a \`for\` loop, it advances to the next item in the iterable sequence.
- In a \`while\` loop, it jumps back to evaluate the conditional expression.
\`\`\`python
# Print only odd numbers
for n in range(1, 10):
    if n % 2 == 0:
        continue # Skip even numbers
    print(n, end=" ")
# Output: 1 3 5 7 9
\`\`\`

### C. The \`pass\` Statement
The \`pass\` statement is a **null operation (NOP)**. When executed, nothing happens!
- Why does Python need \`pass\`? Because Python uses whitespace indentation rather than empty braces \`{}\`. When Python's grammar requires a statement syntactically, but you don't want any code to run (e.g., stubs, empty callback functions, empty exception handlers), you use \`pass\`.
\`\`\`python
def future_feature():
    pass # Code to be implemented later; prevents IndentationError

class EmptyDatabaseModel:
    pass
\`\`\`

---

## 3. Python's Unique \`loop-else\` Clause

One of Python's most powerful yet frequently misunderstood features is the **\`else\` clause attached to loops (\`for-else\` and \`while-else\`)**.

### The Golden Rule of \`loop-else\`:
> **The \`else\` block executes IF AND ONLY IF the loop terminates naturally (by exhausting the iterable or when the condition becomes False). If the loop is terminated abnormally via a \`break\` statement, the \`else\` block is COMPLETELY SKIPPED!**

\`\`\`python
for item in collection:
    if condition(item):
        print("Item found!")
        break # Skips the else block!
else:
    # Executes ONLY if the loop never encountered a break!
    print("Item NOT found in entire collection.")
\`\`\`

### Classic Exam Example: Prime Number Checking without Flag Variables
In other languages, checking for a prime number requires maintaining an awkward boolean flag variable (e.g., \`bool is_prime = true\`). In Python, \`for-else\` eliminates the flag variable completely:

\`\`\`python
def check_prime(n: int):
    if n <= 1:
        print(f"{n} is not prime.")
        return

    for d in range(2, int(n ** 0.5) + 1):
        if n % d == 0:
            print(f"{n} is composite (divisible by {d}).")
            break # Factor found -> exit loop, SKIP the else!
    else:
        # Reached ONLY if NO divisor triggered a break!
        print(f"{n} is a PRIME number!")
\`\`\`

---

## 4. Comparison Summary

| Statement | Loop Execution Impact | Loop-Else Impact | Typical Purpose |
| :--- | :--- | :--- | :--- |
| **\`break\`** | Exits loop completely | **Cancels / skips** the else block | Search success, early exit |
| **\`continue\`** | Skips remainder of current step | Has no effect on else | Filter / ignore invalid data |
| **\`pass\`** | No effect on loop flow | No effect on else | Syntactic placeholder / stub |
| **\`loop-else\`**| Runs after final iteration | Runs only if no \`break\` occurred | Search fallback / not-found handling |

> [!IMPORTANT] **MEMORIZE:**
> - \`break\` terminates the loop **AND** cancels the \`else\` block.
> - \`continue\` skips to the **next iteration** of the loop.
> - \`pass\` is a **no-op placeholder** required by Python's indentation syntax.
> - The \`else\` clause in a loop executes **only when the loop completes without hitting a \`break\`**.

> [!NOTE] **DEV BRAIN:**
> Think of \`loop-else\` as \`loop-then-if-no-break\`. Some Python core developers have noted that if Python were redesigned today, they might name the keyword \`nobreak\` instead of \`else\` to prevent beginner confusion!

> [!WARNING] **TRAP:**
> In a \`while\` loop, if you call \`continue\` **before** updating your counter variable, you will create an inescapable infinite loop!
> \`\`\`python
> i = 0
> while i < 5:
>     if i == 2:
>         continue # BUG: i is never incremented! Stays 2 forever!
>     print(i)
>     i += 1
> \`\`\`

> [!TIP] **EXAM TIP:**
> Questions on \`for-else\` are a favourite topic for professors. If you see a loop with \`break\` and an \`else\` block, trace whether the \`break\` is triggered. If \`break\` fires, draw an X over the \`else\` block!`,
          shortNotes: "break exits loop & skips else. continue skips to next iteration. pass is a null placeholder. loop-else runs ONLY when loop finishes without a break.",
          examples: [
            {
              title: "Demonstration of break, continue, pass, and loop-else in Searching",
              problem: "Write a Python program to perform linear search on a list of students using loop-else, and filter data using continue.",
              explanation: "Search for a student using for-else without any boolean flags, and skip negative numbers using continue.",
              code: `# 1. Linear search using for-else
students = ["Alice", "Bob", "Charlie", "David"]
target = "Charlie"

for student in students:
    if student == target:
        print(f"Target '{target}' found in database!")
        break
else:
    print(f"Target '{target}' NOT found.")

# 2. Filtering with continue
scores = [85, -1, 92, 0, -5, 78]
valid_scores = []

for s in scores:
    if s < 0:
        continue  # Skip invalid negative scores
    valid_scores.append(s)

print("Valid scores after continue filter:", valid_scores)

# 3. Pass placeholder
for i in range(3):
    pass  # Placeholder for future logic
print("Pass statement executed without error.")`,
              output: "Target 'Charlie' found in database!\nValid scores after continue filter: [85, 92, 0, 78]\nPass statement executed without error."
            },
          ],
          keyPoints: [
            "break terminates the innermost loop immediately and bypasses any attached loop-else block.",
            "continue skips the remainder of the current iteration and proceeds directly to the next cycle.",
            "pass serves as a syntactic no-operation placeholder where code is structurally required.",
            "The loop-else clause executes only if the loop terminates naturally without encountering a break.",
            "Using for-else eliminates the need for auxiliary boolean flag variables in search algorithms."
          ],
          theoryQuestions: [
            {
              question: "Explain the semantics of the loop-else statement in Python. How does it make search algorithms more elegant? Provide a code example.",
              marks: "5 Marks",
              answer: "In Python, both `for` and `while` loops support an optional `else` clause.\n\nExecution Semantics:\n- The `else` block executes if and only if the loop completes all iterations naturally (i.e., when the iterable is exhausted or the while condition evaluates to False).\n- If the loop terminates prematurely via a `break` statement, the `else` block is completely skipped.\n\nSearch Elegance:\nIn languages like C or Java, linear search requires declaring a boolean flag (e.g., `found = false`) and checking it after the loop. In Python, placing the 'not found' code directly in the loop's `else` block eliminates the flag variable completely.\n\nExample:\n```python\nfor item in database:\n    if item == target:\n        print('Found')\n        break\nelse:\n    print('Not Found')\n```",
              keyPoints: ["Natural termination vs break termination", "Skipping of else block upon break", "Elimination of boolean search flags", "Illustrative linear search code"]
            },
            {
              question: "Differentiate between break, continue, and pass statements in Python.",
              marks: "3 Marks",
              answer: "1. `break`: Immediately terminates the loop and resumes execution at the statement following the loop. It cancels any attached loop-else block.\n2. `continue`: Halts the current iteration, discards remaining statements in the current cycle, and jumps to the next iteration of the loop.\n3. `pass`: A null operation that does nothing. It acts as a syntactic placeholder in empty functions, loops, or classes where Python grammar requires an indented statement.",
              keyPoints: ["Loop termination by break", "Cycle skipping by continue", "Syntactic placeholder role of pass"]
            },
          ],
          mcqs: [
            {
              question: "When does the 'else' block attached to a for loop execute?",
              options: ["Whenever the loop encounters a break statement", "Only when the loop terminates naturally without encountering a break", "At the beginning of the first iteration", "Only if an exception is thrown"],
              correctIndex: 1,
              explanation: "The loop-else block executes strictly when the loop finishes all iterations without hitting a break statement."
            },
            {
              question: "What is the primary technical purpose of the 'pass' statement in Python?",
              options: ["To exit a function early", "To serve as a null statement placeholder where syntax requires an indented suite", "To skip to the next loop iteration", "To terminate the entire Python Virtual Machine"],
              correctIndex: 1,
              explanation: "pass is a no-operation statement used when an indented block is syntactically required but no action should be performed."
            },
            {
              question: "What will be printed by the following code?\nfor i in range(3):\n    if i == 1:\n        break\nelse:\n    print('Completed')",
              options: ["Completed", "1", "No output", "SyntaxError"],
              correctIndex: 2,
              explanation: "When i == 1, the break statement executes, which terminates the loop and skips the else block entirely, producing no output."
            },
          ]
        },
        {
          id: "py1-u3-t5",
          title: "Nested Loops & Pattern Printing (Right triangle, inverted pyramid, diamond, Floyd's triangle)",
          simpleExplanation: "Nested loops are loops inside loops! Think of an analog clock: the minute hand has to loop 60 times for every single hour step of the hour hand. In university exams, professors love using nested loops to print geometric shapes like triangles and diamonds, where the outer loop manages rows and the inner loop manages columns.",
          detailedExplanation: `## 1. Mechanics of Nested Loops

A **Nested Loop** is a loop located inside the body of another loop. 

### The Clock Analogy:
Think of an analog clock:
- The **Outer Loop** represents the **Hour hand** (steps slowly, once per hour).
- The **Inner Loop** represents the **Minute hand** (runs through 60 complete cycles for *every single step* of the hour hand).

$$\\text{Total Executed Steps} = (\\text{Outer Iterations}) \\times (\\text{Inner Iterations})$$

If the outer loop runs $R$ times and the inner loop runs $C$ times, the inner suite executes $R \\times C$ times in total.

\`\`\`mermaid
flowchart TD
    O1["Outer Loop: Row i = 1 to N"] --> I1["Inner Loop: Column j = 1 to i"]
    I1 --> P["Print symbol '*' without newline (end='')"]
    P --> I1
    I1 -- Column Done --> NL["Print newline print()"]
    NL --> O1
    O1 -- All Rows Done --> End([Pattern Complete])
\`\`\`

---

## 2. The Universal Formula for Pattern Printing

In exam pattern problems, always construct a **Row-Column Trace Grid**:
1. **Outer Loop (\`i\`):** Controls the **Rows** (runs from row \`1\` to \`N\`).
2. **Inner Loop 1 (\`spaces\`):** Prints leading spaces (if the pattern is right-aligned or centered).
3. **Inner Loop 2 (\`j\`):** Prints the characters/stars/numbers for each column.
4. **Row Terminator:** A parameterless \`print()\` at the end of the outer loop to advance the cursor to the next line.

---

## 3. Four Classic University Exam Patterns

### Pattern 1: Right-Angled Star Triangle
\`\`\`text
*
* *
* * *
* * * *
* * * * *
\`\`\`
- Row $i$ (from 1 to $N$) contains exactly $i$ stars.
\`\`\`python
def right_triangle(n: int):
    for i in range(1, n + 1):
        for j in range(1, i + 1):
            print("*", end=" ")
        print()  # Newline after each row
\`\`\`

---

### Pattern 2: Inverted Pyramid / Centered Full Pyramid
\`\`\`text
    *
   * *
  * * *
 * * * *
* * * * *
\`\`\`
- For row $i$ (from 1 to $N$):
  - Leading spaces = $N - i$
  - Stars = $i$ (separated by a space)
\`\`\`python
def full_pyramid(n: int):
    for i in range(1, n + 1):
        # Print leading spaces
        for s in range(n - i):
            print(" ", end="")
        # Print stars with spaces
        for j in range(i):
            print("* ", end="")
        print()
\`\`\`

---

### Pattern 3: The Diamond Pattern
A diamond consists of two halves: an upright pyramid followed by an inverted pyramid.
\`\`\`text
    *
   ***
  *****
   ***
    *
\`\`\`
\`\`\`python
def diamond_pattern(n: int):
    # Upper half (1 to n)
    for i in range(1, n + 1):
        print(" " * (n - i) + "*" * (2 * i - 1))
    # Lower half (n-1 down to 1)
    for i in range(n - 1, 0, -1):
        print(" " * (n - i) + "*" * (2 * i - 1))
\`\`\`

---

### Pattern 4: Floyd's Triangle
Floyd's triangle is a right-angled triangle filled with consecutive running natural numbers:
\`\`\`text
1
2 3
4 5 6
7 8 9 10
\`\`\`
- A global running counter variable \`num = 1\` increments continuously across row and column iterations.

\`\`\`python
def floyds_triangle(n: int):
    num = 1
    for i in range(1, n + 1):
        for j in range(1, i + 1):
            print(num, end=" ")
            num += 1
        print()
\`\`\`

---

## 4. Pattern Matrix Analysis Table

| Pattern Name | Outer Loop Range | Space Formula | Symbol Formula | Key Logic |
| :--- | :--- | :--- | :--- | :--- |
| **Right Triangle** | \`i in 1..N\` | None | \`i\` stars | Stars increase with row index |
| **Inverted Triangle**| \`i in N..1\` | None | \`i\` stars | Stars decrease with countdown |
| **Full Pyramid** | \`i in 1..N\` | \`N - i\` spaces | \`2*i - 1\` stars | Centered symmetric layout |
| **Diamond** | Upright + Inverted | Symmetric | \`2*i - 1\` stars | Split into two loops |
| **Floyd's Triangle** | \`i in 1..N\` | None | Running \`num\` | \`num\` increments per cell |

> [!IMPORTANT] **MEMORIZE:**
> - Outer loop always governs the **row number (\`i\`)**.
> - Inner loop always governs the **column contents (\`j\`)**.
> - Use \`print(..., end=" ")\` to print on the same line.
> - Call parameterless \`print()\` at the end of each outer loop cycle to move to the next row.
> - In Floyd's triangle, \`num\` starts at 1 and is **never reset** inside the loops.

> [!NOTE] **DEV BRAIN:**
> In Python, string multiplication allows quick one-line pattern printing: \`print(" " * (n - i) + "* " * i)\`. While concise and pythonic for quick scripts, university exam markers usually want to see explicit nested loops to verify algorithmic logic!

> [!WARNING] **TRAP:**
> Forgetting to reset inner loop counters when calculating row-specific values (e.g., number triangles restarting at 1 for every row) vs running counters (like Floyd's triangle) is the number one cause of logic bugs in exams!

> [!TIP] **EXAM TIP:**
> When asked to draw a diamond or pyramid in an exam, write a quick 3-column table on scrap paper showing: \`Row i | Spaces | Stars\`. For $N=5$, row 1 has 4 spaces and 1 star ($N-1$ and $2(1)-1$). Deducing the algebraic formula ensures zero errors!`,
          shortNotes: "Outer loop controls rows; inner loop controls columns. Use end='' for same-line output and print() for newlines. Floyd's triangle uses a continuous running counter.",
          examples: [
            {
              title: "Implementation of Right Triangle, Diamond, and Floyd's Triangle",
              problem: "Write a complete Python script demonstrating Right Triangle, Diamond, and Floyd's Triangle pattern generation functions.",
              explanation: "Demonstrate nested loops for right triangle, diamond symmetry, and running number accumulation for Floyd's triangle.",
              code: `# 1. Right Angled Star Triangle
print("=== 1. Right Angled Triangle ===")
for i in range(1, 5):
    for j in range(1, i + 1):
        print("*", end=" ")
    print()

# 2. Floyd's Triangle
print("\\n=== 2. Floyd's Triangle ===")
num = 1
for i in range(1, 5):
    for j in range(1, i + 1):
        print(f"{num:2d}", end=" ")
        num += 1
    print()

# 3. Diamond Pattern (n = 3)
print("\\n=== 3. Diamond Pattern ===")
n = 3
# Top Half
for i in range(1, n + 1):
    print(" " * (n - i) + "*" * (2 * i - 1))
# Bottom Half
for i in range(n - 1, 0, -1):
    print(" " * (n - i) + "*" * (2 * i - 1))`,
              output: "=== 1. Right Angled Triangle ===\n* \n* * \n* * * \n* * * * \n\n=== 2. Floyd's Triangle ===\n 1 \n 2  3 \n 4  5  6 \n 7  8  9 10 \n\n=== 3. Diamond Pattern ===\n  *\n ***\n*****\n ***\n  *"
            },
          ],
          keyPoints: [
            "Nested loops consist of an outer loop controlling rows and inner loops controlling column outputs.",
            "Total iterations equals the product of outer and inner loop counts.",
            "print(..., end=' ') prevents newline advancement, allowing column printing on the same line.",
            "Calling parameterless print() terminates the row and moves to the next line.",
            "Floyd's triangle uses a continuously incrementing integer counter across all rows and columns."
          ],
          theoryQuestions: [
            {
              question: "Explain the concept of nested loops. Write a complete Python program using nested loops to print a centered pyramid of stars of height N.",
              marks: "5 Marks",
              answer: "A nested loop is a loop construct where one loop is placed entirely inside the body of another loop. The outer loop manages rows, while the inner loop manages columns or character positions. For every single iteration of the outer loop, the inner loop executes its complete set of iterations.\n\nCentered Pyramid Program:\n```python\nn = int(input('Enter height N: '))\nfor i in range(1, n + 1):\n    # Inner loop 1: Leading spaces\n    for s in range(n - i):\n        print(' ', end='')\n    # Inner loop 2: Stars with spaces\n    for j in range(i):\n        print('* ', end='')\n    # Newline after row completion\n    print()\n```",
              keyPoints: ["Nested loop definition and iteration math", "Role of outer loop (rows) vs inner loop (columns/spaces)", "Leading spaces formula (n - i)", "Row-ending print() statement"]
            },
            {
              question: "What is Floyd's Triangle? Write a Python function to print Floyd's Triangle for N rows.",
              marks: "3 Marks",
              answer: "Floyd's Triangle is a right-angled triangular array of consecutive natural numbers starting from 1. Each row contains an increasing number of elements equal to its row number.\n\nPython Function:\n```python\ndef print_floyds(n: int):\n    count = 1\n    for i in range(1, n + 1):\n        for j in range(1, i + 1):\n            print(count, end=' ')\n            count += 1\n        print()\n```",
              keyPoints: ["Definition of Floyd's Triangle", "Continuous counter incrementing across rows", "Inner loop bounded by row index i"]
            },
          ],
          mcqs: [
            {
              question: "In a nested loop with an outer loop running 4 times and an inner loop running 5 times, how many total times does the inner loop body execute?",
              options: ["9", "20", "25", "16"],
              correctIndex: 1,
              explanation: "Total executions = Outer iterations * Inner iterations = 4 * 5 = 20."
            },
            {
              question: "What does Floyd's Triangle print across its rows?",
              options: ["Powers of 2", "Consecutive running natural numbers (1, 2, 3, 4...)", "Odd numbers only", "Asterisks only"],
              correctIndex: 1,
              explanation: "Floyd's Triangle is a triangular matrix displaying consecutive running natural numbers starting from 1."
            },
            {
              question: "What is the formula for the number of stars on row i (1-indexed) in an odd-width centered pyramid?",
              options: ["i", "2 * i", "2 * i - 1", "i ** 2"],
              correctIndex: 2,
              explanation: "In an odd-width centered pyramid, row 1 has 1 star, row 2 has 3 stars, row 3 has 5 stars, following the formula 2 * i - 1."
            },
          ]
        },
      ]
    },
    {
      id: "py1-u4",
      title: "Unit 4: Sequence Data Structures & Strings",
      description: "Comprehensive mastery of sequential and associative collections: strings, slicing mathematics, lists, list comprehensions, tuples, dictionaries, and set operations.",
      topics: [
        {
          id: "py1-u4-t1",
          title: "Strings: Indexing, Slicing [start:stop:step], Immutability & Escape Sequences",
          simpleExplanation: "A string is a sequence of characters wrapped in quotes. Python gives every character an address number: starting from 0 from the left, or -1 from the right. Slicing lets you carve out any sub-piece of the string using [start:stop:step]. Once created, a Python string is carved in stone (immutable) and can never be altered in place.",
          detailedExplanation: `## 1. String Fundamentals in Python

In Python, a **String (\`str\`)** is an ordered, immutable sequence of Unicode characters. Strings can be enclosed using:
- Single quotes: \`'Python'\`
- Double quotes: \`"Python"\`
- Triple quotes: \`'''Multiline text'''\` or \`\\"\\"\\"Docstring text\\"\\"\\"\`

Because strings are Unicode (UTF-8) by default in Python 3, they natively support global languages, emojis, and mathematical symbols (\`"नमस्ते"\`, \`"Hello 🐍"\`).

---

## 2. Positive & Negative Indexing

Python strings provide dual-directional indexing:
- **Positive Indexing (Left-to-Right):** Starts at \`0\` for the first character and ends at \`len(s) - 1\`.
- **Negative Indexing (Right-to-Left):** Starts at \`-1\` for the last character and ends at \`-len(s)\`.

### Memory Layout Indexing Diagram:
Let string \`s = "PYTHON"\`:

| Character | **P** | **Y** | **T** | **H** | **O** | **N** |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Positive Index** | \`0\` | \`1\` | \`2\` | \`3\` | \`4\` | \`5\` |
| **Negative Index** | \`-6\` | \`-5\` | \`-4\` | \`-3\` | \`-2\` | \`-1\` |

\`\`\`python
s = "PYTHON"
print(s[0])   # 'P'
print(s[-1])  # 'N' (Last character)
print(s[-6])  # 'P'
\`\`\`
*Attempting to access an index outside the valid range raises an \`IndexError: string index out of range\`.*

---

## 3. String Slicing: \`[start:stop:step]\`

Slicing extracts a substring without modifying the original string:

$$\\text{substring} = \\text{string}[\\text{start} : \\text{stop} : \\text{step}]$$

### Slicing Rules:
- **\`start\`:** Index where extraction begins (inclusive). Defaults to \`0\` (if \`step > 0\`).
- **\`stop\`:** Index where extraction ends (**strictly EXCLUSIVE**). Defaults to \`len(s)\`.
- **\`step\`:** The stride or stride direction. Defaults to \`+1\`.

\`\`\`mermaid
flowchart LR
    S["String 'PYTHON'\\nIndices: 0 1 2 3 4 5"] --> Sl["Slice s[1:5:2]"]
    Sl --> R["Characters at index 1 and 3\\nResult: 'YH'"]
\`\`\`

### Slicing Examples & Edge Cases:
\`\`\`python
s = "UNIVERSITY"
# Indices: 0 1 2 3 4 5 6 7 8 9
# String:  U N I V E R S I T Y

print(s[0:4])     # 'UNIV' (Indices 0, 1, 2, 3)
print(s[:4])      # 'UNIV' (Default start = 0)
print(s[4:])      # 'ERSITY' (From index 4 to end)
print(s[::2])     # 'UIVRIY' (Every 2nd character)
print(s[::-1])    # 'YTISREVINU' (Reverses entire string!)
print(s[-4:])     # 'SITY' (Last 4 characters)
print(s[6:2:-1])  # 'SREV' (Negative step moves backwards!)
\`\`\`

### Why Slicing Never Raises \`IndexError\`:
Unlike direct indexing (\`s[99]\` crashes), slicing is **out-of-bounds safe**:
\`\`\`python
s = "PYTHON"
print(s[2:1000])  # 'THON' (Gracefully stops at string end without error!)
\`\`\`

---

## 4. String Immutability: What It Really Means

Strings in Python are **strictly immutable**. Once a string object is created on the heap, its internal character contents can **NEVER be modified, mutated, or overwritten in place**.

\`\`\`python
msg = "Python"
# Attempting in-place mutation:
msg[0] = "J" # CRASH: TypeError: 'str' object does not support item assignment!
\`\`\`

### How String Modification Actually Works:
When you perform operations like concatenation (\`+\`), replacement, or reassignment, Python does not alter the original string. Instead, it **creates a brand new string object** in memory and rebinds the variable pointer to the new address:
\`\`\`python
msg = "Python"
print(id(msg)) # e.g. 0x104A

msg = "J" + msg[1:] # Creates new string "Jython"
print(id(msg)) # Distinct memory address: e.g. 0x208B
\`\`\`

---

## 5. Escape Sequences and Raw Strings

An **Escape Sequence** begins with a backslash \`\\\` and represents special non-printable or formatting characters:
- \`\\n\`: Newline (line break)
- \`\\t\`: Horizontal Tab (4 or 8 spaces indent)
- \`\\\\\`: Literal backslash
- \`\\'\`: Single quote
- \`\\"\`: Double quote

### Raw Strings (\`r"..."\`):
When dealing with regular expressions or Windows file paths containing backslashes, escape sequences can corrupt the path (e.g., \`\\n\` in \`"C:\\new_folder"\` turns into a newline). Prepending \`r\` or \`R\` creates a **Raw String**, treating backslashes as literal characters:
\`\`\`python
# Problematic:
path = "C:\\test\\new_project" # \\n is parsed as newline!

# Solution using Raw String:
raw_path = r"C:\\test\\new_project"
print(raw_path) # C:\\test\\new_project
\`\`\`

> [!IMPORTANT] **MEMORIZE:**
> - Positive index: \`0\` to \`len - 1\`; Negative index: \`-1\` (last) to \`-len\` (first).
> - Slicing syntax: \`[start:stop:step]\` where \`stop\` is **strictly exclusive**.
> - Reversing any string in Python: \`s[::-1]\`.
> - Strings are **immutable**; item assignment \`s[0] = 'X'\` raises \`TypeError\`.
> - Raw strings \`r"..."\` suppress escape sequence interpretation.

> [!NOTE] **DEV BRAIN:**
> Because strings are immutable, repeated string concatenation in loops (\`s += char\`) creates $O(n^2)$ time complexity due to constant heap allocations! In production, always append characters to a list and use \`''.join(list)\` which runs in optimal $O(n)$ time.

> [!WARNING] **TRAP:**
> When using a negative step in slicing like \`s[2:6:-1]\`, the result is an **empty string \`""\`**! Why? Because you specified a negative step (backwards direction), but start index 2 is to the left of stop index 6! To go backwards, start must be greater than stop: \`s[6:2:-1]\`.

> [!TIP] **EXAM TIP:**
> Palindrome string checking is a classic 5-mark question. The most pythonic one-liner is \`return s == s[::-1]\`. When writing this in an exam, explain how \`[::-1]\` works: default start (end of string), default stop (beginning), and step of -1.`,
          shortNotes: "Strings are immutable sequences. Index: 0 to len-1 (or -1 to -len). Slicing: [start:stop:step]. Reverse: s[::-1]. Raw strings: r'path'.",
          examples: [
            {
              title: "String Indexing, Slicing, and Palindrome Verification",
              problem: "Write a Python script demonstrating string slicing tricks, reverse traversal, and a palindrome string tester.",
              explanation: "Extract slices with positive and negative steps, and verify palindrome strings using slicing.",
              code: `# 1. String Slicing Demonstrations
text = "DEVELOPMENT"
print("Original:", text)
print("text[0:5]:", text[0:5])     # 'DEVEL'
print("text[::2]:", text[::2])     # 'DVLPEN'
print("text[::-1]:", text[::-1])   # 'TNEMPOLEVED' (Reversed)
print("text[-4:]:", text[-4:])     # 'MENT' (Last 4 chars)

# 2. Out-of-bounds safety
print("Safe slice text[5:500]:", text[5:500]) # 'OPMENT'

# 3. Palindrome Checker
def check_palindrome(word: str) -> bool:
    clean_word = word.lower().replace(" ", "")
    return clean_word == clean_word[::-1]

print("Is 'radar' palindrome?", check_palindrome("radar"))
print("Is 'RaceCar' palindrome?", check_palindrome("RaceCar"))
print("Is 'python' palindrome?", check_palindrome("python"))`,
              output: "Original: DEVELOPMENT\ntext[0:5]: DEVEL\ntext[::2]: DVLPEN\ntext[::-1]: TNEMPOLEVED\ntext[-4:]: MENT\nSafe slice text[5:500]: OPMENT\nIs 'radar' palindrome? True\nIs 'RaceCar' palindrome? True\nIs 'python' palindrome? False"
            },
          ],
          keyPoints: [
            "Strings in Python are immutable sequences of Unicode characters.",
            "Dual indexing: 0 to len-1 (positive) and -1 to -len (negative).",
            "Slicing [start:stop:step] extracts portions where stop index is strictly exclusive.",
            "Reversing a string is cleanly expressed via s[::-1].",
            "Direct item assignment (s[0] = 'a') raises a TypeError due to immutability.",
            "Raw strings (r'...') preserve literal backslashes without escape sequence evaluation."
          ],
          theoryQuestions: [
            {
              question: "What is String Immutability in Python? Explain with memory allocation diagrams and code examples what happens when you modify a string.",
              marks: "5 Marks",
              answer: "String immutability means that once a string object is allocated in heap memory, its contents cannot be altered, updated, or modified in place.\n\nDemonstration:\n```python\ns = 'hello'\ns[0] = 'j' # Raises TypeError: 'str' object does not support item assignment\n```\nWhat happens during reassignment:\nWhen we write `s = 'j' + s[1:]`:\n1. Python does NOT modify the memory block of `'hello'`.\n2. It allocates an entirely new string object `'jello'` at a new heap memory location.\n3. The variable reference `s` is rebound to point to the new memory address.\n4. The old `'hello'` object remains untouched and is later garbage-collected if no other references exist.",
              keyPoints: ["Definition of immutability", "TypeError on item assignment", "New object allocation on heap", "Rebinding of variable reference"]
            },
            {
              question: "Explain string slicing syntax with examples of positive, negative, and reverse step indexing.",
              marks: "3 Marks",
              answer: "String slicing extracts a substring with syntax `string[start:stop:step]`:\n- `start`: Beginning index (inclusive, default 0).\n- `stop`: Ending index (exclusive, default length).\n- `step`: Increment stride (default 1).\n\nExamples on `s = 'PYTHON'`:\n1. Positive Slice: `s[1:4]` -> `'YTH'` (indices 1, 2, 3).\n2. Negative Index Slice: `s[-3:]` -> `'HON'` (last 3 characters).\n3. Reverse Slice: `s[::-1]` -> `'NOHTYP'` (reverses string by stepping -1 backwards).",
              keyPoints: ["Syntax components [start:stop:step]", "Exclusive stop index rule", "Negative step reversal behavior"]
            },
          ],
          mcqs: [
            {
              question: "What is the output of the slice expression 'COMPUTER'[2:7:2]?",
              options: ["'MPU'", "'MPT'", "'MUE'", "'OPT'"],
              correctIndex: 1,
              explanation: "Indices accessed: 2 ('M'), 4 ('P'), 6 ('T'). Result is 'MPT'."
            },
            {
              question: "What happens when you attempt to execute: s = 'Hello'; s[0] = 'h'?",
              options: ["s becomes 'hello'", "A TypeError is raised", "A ValueError is raised", "s is converted to a mutable list"],
              correctIndex: 1,
              explanation: "Strings in Python are immutable; modifying an index in place raises TypeError: 'str' object does not support item assignment."
            },
            {
              question: "What is the result of 'PYTHON'[-1:-4:-1]?",
              options: ["'NOH'", "'NOHT'", "'HON'", "''"],
              correctIndex: 0,
              explanation: "Indices: -1 ('N'), -2 ('O'), -3 ('H'). -4 is exclusive. Result is 'NOH'."
            },
          ]
        },
        {
          id: "py1-u4-t2",
          title: "Core String Methods (split, join, strip, replace, find, count, uppercase/lowercase)",
          simpleExplanation: "Strings have a rich toolbox of built-in methods that make text processing a breeze. You can chop sentences into words with split(), glue words together with join(), scrub away unwanted spaces with strip(), swap words with replace(), and search for letters with find() and count(). Remember: because strings are immutable, these methods always return a brand new string!",
          detailedExplanation: `## 1. Overview of Python String Methods

Python includes a powerful suite of built-in string methods. Because strings are **immutable**, none of these methods modify the caller string in place; they **always return a new string, list, or boolean result**.

\`\`\`mermaid
flowchart TD
    Methods["String Methods Categories"] --> Case["Case Conversion\\n(upper, lower, title, capitalize)"]
    Methods --> Search["Search & Count\\n(find, rfind, count, startswith, endswith)"]
    Methods --> SplitJoin["Splitting & Joining\\n(split, rsplit, splitlines, join)"]
    Methods --> Clean["Trimming & Editing\\n(strip, lstrip, rstrip, replace)"]
    Methods --> Test["Classification\\n(isalpha, isdigit, isalnum, isspace)"]
\`\`\`

---

## 2. In-Depth Study of Core Methods

### A. Case Conversion Methods
- \`s.upper()\`: Converts all characters to uppercase (\`"hi".upper() -> "HI"\`).
- \`s.lower()\`: Converts all characters to lowercase (\`"HI".lower() -> "hi"\`).
- \`s.title()\`: Capitalizes the first letter of each word (\`"hello world".title() -> "Hello World"\`).
- \`s.capitalize()\`: Capitalizes ONLY the first character of the entire string.
- \`s.swapcase()\`: Inverts cases (upper becomes lower, lower becomes upper).

### B. Searching & Counting Methods
- \`s.find(sub, start, end)\`: Returns the **lowest index** where substring \`sub\` is found. **Returns \`-1\` if not found** (never crashes!).
- \`s.index(sub, start, end)\`: Identical to \`find()\`, BUT **raises \`ValueError\`** if the substring is not found!
- \`s.rfind(sub)\`: Returns the highest (rightmost) index where \`sub\` is found.
- \`s.count(sub)\`: Returns the number of non-overlapping occurrences of \`sub\`.
- \`s.startswith(prefix)\`: Returns \`True\` if string begins with \`prefix\`.
- \`s.endswith(suffix)\`: Returns \`True\` if string ends with \`suffix\`.

\`\`\`python
s = "banana"
print(s.find("an"))    # 1 (First occurrence)
print(s.rfind("an"))   # 3 (Last occurrence)
print(s.count("an"))   # 2
print(s.find("xyz"))   # -1 (Safe!)
# s.index("xyz")       # CRASH: ValueError: substring not found
\`\`\`

### C. Splitting and Joining: \`split()\` and \`join()\`
These two methods are the cornerstone of text processing in Python.

#### 1. \`s.split(sep=None, maxsplit=-1)\`
- Splits a string into a **list of substrings** based on a delimiter string.
- If \`sep\` is omitted or \`None\`, it splits on runs of **consecutive whitespace characters** (spaces, tabs, newlines) and discards empty strings!
\`\`\`python
text = "Apple,Orange,Banana,Grapes"
fruits = text.split(",")
print(fruits) # ['Apple', 'Orange', 'Banana', 'Grapes']

sentence = "Python    is   awesome\\nand  fun"
print(sentence.split()) # ['Python', 'is', 'awesome', 'and', 'fun']
\`\`\`

#### 2. \`delimiter.join(iterable)\`
- Joins the elements of an iterable (list/tuple of strings) into a single string, separated by the calling delimiter string.
- *Notice: \`join\` is called ON the delimiter string!*
\`\`\`python
words = ["Learning", "Python", "is", "cool"]
sentence = " ".join(words)
print(sentence) # "Learning Python is cool"

csv_line = ",".join(["ID", "Name", "Score"])
print(csv_line) # "ID,Name,Score"
\`\`\`

### D. Trimming & Cleaning: \`strip()\`, \`lstrip()\`, \`rstrip()\`
- \`s.strip()\`: Removes leading and trailing whitespace characters (\` \`, \`\\t\`, \`\\n\`).
- \`s.lstrip()\`: Removes only leading (left-side) whitespace.
- \`s.rstrip()\`: Removes only trailing (right-side) whitespace.
- Can also remove custom characters: \`"###Hello###".strip("#") -> "Hello"\`.

### E. Replacement: \`s.replace(old, new, count=-1)\`
Returns a copy with all occurrences of \`old\` replaced by \`new\`. If \`count\` is specified, only the first \`count\` occurrences are replaced.
\`\`\`python
s = "one potato, two potato, three potato"
print(s.replace("potato", "tomato", 2))
# Output: "one tomato, two tomato, three potato"
\`\`\`

---

## 3. String Classification (Predicate) Methods

These methods return boolean \`True\` or \`False\`:
- \`s.isalpha()\`: \`True\` if all characters are alphabetic letters (\`a-z\`, \`A-Z\`).
- \`s.isdigit()\`: \`True\` if all characters are numeric digits (\`0-9\`).
- \`s.isalnum()\`: \`True\` if characters are alphanumeric (letters or numbers).
- \`s.isspace()\`: \`True\` if string contains only whitespace characters (\` \`, \`\\t\`, \`\\n\`).
- \`s.islower()\` / \`s.isupper()\`: Tests if all cased characters are lowercase / uppercase.

---

## 4. Method Comparison Table

| Method Name | Return Type | Missing Value Behavior | Example |
| :--- | :--- | :--- | :--- |
| \`find(sub)\` | \`int\` | Returns \`-1\` | \`"cat".find("x") -> -1\` |
| \`index(sub)\` | \`int\` | Raises \`ValueError\` | \`"cat".index("x") -> Error\` |
| \`split(sep)\` | \`list[str]\` | Returns \`[s]\` | \`"a-b".split("-") -> ['a', 'b']\` |
| \`join(seq)\` | \`str\` | N/A (requires str items) | \`"-".join(['a', 'b']) -> "a-b"\` |
| \`strip()\` | \`str\` | Returns unchanged copy | \`" hi ".strip() -> "hi"\` |
| \`replace()\` | \`str\` | Returns unchanged copy | \`"ab".replace("x", "y") -> "ab"\` |

> [!IMPORTANT] **MEMORIZE:**
> - \`find()\` returns \`-1\` on failure; \`index()\` crashes with \`ValueError\`.
> - \`join()\` is called on the **separator string**, not on the list (\`",".join(items)\`, NOT \`items.join(",")\`).
> - All items passed to \`join()\` must be strings; passing numbers raises \`TypeError\`.
> - None of these methods modify the original string (strings are immutable).

> [!NOTE] **DEV BRAIN:**
> When cleaning real-world CSV or web-scraped data, method chaining is extremely common: \`cleaned = raw_text.strip().lower().replace("\\n", " ")\`.

> [!WARNING] **TRAP:**
> Beginners frequently write \`items.join(",")\` because of JavaScript habits! In Python, the separator is the string object calling the method: \`",".join(items)\`.

> [!TIP] **EXAM TIP:**
> In exams, when asked how to count words in a sentence, the most robust answer is \`len(sentence.split())\`. Mention that calling \`split()\` without arguments handles arbitrary consecutive spaces and newlines automatically.`,
          shortNotes: "split() turns text into list; join() merges list into text. find() returns -1 if missing, index() throws ValueError. strip() removes whitespaces.",
          examples: [
            {
              title: "Text Processing: Cleaning, Splitting, Counting, and Joining",
              problem: "Write a Python function to clean a dirty user input string, count word frequencies, and reassemble it into a standardized CSV string.",
              explanation: "Demonstrate strip(), lower(), split(), replace(), and join() in a practical data-cleaning pipeline.",
              code: `dirty_input = "   Python, Java , C++ , PYTHON , Rust, java   "

# 1. Clean and split
tokens = dirty_input.split(",")
cleaned_tokens = [t.strip().title() for t in tokens]
print("Cleaned tokens:", cleaned_tokens)

# 2. Count occurrences
py_count = cleaned_tokens.count("Python")
print(f"Count of 'Python': {py_count}")

# 3. Join back into clean CSV
standardized_csv = ", ".join(cleaned_tokens)
print("Standardized CSV:", standardized_csv)

# 4. find() vs index()
quote = "Stay hungry, stay foolish"
print("find('hungry'):", quote.find("hungry"))  # 5
print("find('wealthy'):", quote.find("wealthy")) # -1 (Not found)`,
              output: "Cleaned tokens: ['Python', 'Java', 'C++', 'Python', 'Rust', 'Java']\nCount of 'Python': 2\nStandardized CSV: Python, Java, C++, Python, Rust, Java\nfind('hungry'): 5\nfind('wealthy'): -1"
            },
          ],
          keyPoints: [
            "String methods always return new objects and never modify the original string in place.",
            "find() returns -1 when a substring is missing, whereas index() raises a ValueError.",
            "split() splits text into a list of strings; join() concatenates an iterable of strings using a delimiter.",
            "strip() removes leading and trailing whitespace; lstrip() and rstrip() target specific ends.",
            "replace(old, new, count) substitutes substrings with an optional limit count."
          ],
          theoryQuestions: [
            {
              question: "Differentiate between the find() and index() methods in Python. Explain split() and join() with illustrative examples.",
              marks: "5 Marks",
              answer: "1. find() vs index():\n- `s.find(sub)`: Searches for substring `sub` and returns its lowest index. If the substring does not exist, it safely returns `-1`.\n- `s.index(sub)`: Performs the same search, but if the substring is not found, it raises a runtime `ValueError: substring not found`.\n\n2. split() and join():\n- `split(sep)`: Breaks a string into a list of substrings delimited by `sep`. If no argument is given, it splits by any whitespace.\nExample: `'red,green,blue'.split(',')` -> `['red', 'green', 'blue']`.\n- `join(iterable)`: Concatenates an iterable of strings using the calling string as the delimiter.\nExample: `'-'.join(['2026', '09', '25'])` -> `'2026-09-25'`.",
              keyPoints: ["Return value of find() on failure (-1) vs index() (ValueError)", "split() syntax, delimiter, and return type (list)", "join() syntax on delimiter string", "Illustrative examples for each"]
            },
            {
              question: "What is the function of strip(), lstrip(), and rstrip() methods? Provide code demonstrating their differences.",
              marks: "3 Marks",
              answer: "- `strip()`: Removes leading (left) and trailing (right) whitespace characters (or specified characters) from both ends of the string.\n- `lstrip()`: Removes only leading whitespace from the left side.\n- `rstrip()`: Removes only trailing whitespace from the right side.\n\nExample:\n```python\ns = '   Python   '\nprint(repr(s.strip()))   # 'Python'\nprint(repr(s.lstrip()))  # 'Python   '\nprint(repr(s.rstrip()))  # '   Python'\n```",
              keyPoints: ["Definitions of strip, lstrip, and rstrip", "Whitespace removal behavior", "Code snippets with repr() showing whitespace boundaries"]
            },
          ],
          mcqs: [
            {
              question: "What is the return value of 'python'.find('z')?",
              options: ["False", "None", "-1", "ValueError"],
              correctIndex: 2,
              explanation: "The find() method returns -1 when the requested substring does not exist in the string."
            },
            {
              question: "What is the output of: '-'.join(['A', 'B', 'C'])?",
              options: ["'A-B-C-'", "'-A-B-C'", "'A-B-C'", "['A-B-C']"],
              correctIndex: 2,
              explanation: "The join() method inserts the delimiter '-' strictly between consecutive elements, resulting in 'A-B-C'."
            },
            {
              question: "What will '  Data Science  '.strip() evaluate to?",
              options: ["'DataScience'", "'Data Science'", "'  Data Science'", "'Data Science  '"],
              correctIndex: 1,
              explanation: "strip() removes leading and trailing whitespace only; internal spaces between words are left untouched."
            },
          ]
        },
        {
          id: "py1-u4-t3",
          title: "Lists: Creation, Indexing, Slicing, Mutable Operations (append, extend, insert, pop, remove) & List Comprehensions",
          simpleExplanation: "A list is Python's versatile shopping cart: an ordered, changeable (mutable) collection that can hold any mix of numbers, text, or even other lists enclosed in square brackets []. You can add items with append(), combine carts with extend(), remove items with pop(), and write lightning-fast one-line transformation loops called List Comprehensions.",
          detailedExplanation: `## 1. What is a Python List?

A **List** is an ordered, **mutable** (modifiable), heterogeneous sequence of elements enclosed in square brackets \`[]\`.

### Key Characteristics:
- **Ordered:** Elements maintain their insertion order.
- **Mutable:** You can add, replace, reorder, or delete elements in place without creating a new list.
- **Heterogeneous:** A single list can contain mixed data types (integers, strings, booleans, floats, nested lists):
  \`\`\`python
  mixed = [101, "Alice", 3.85, True, [10, 20]]
  \`\`\`
- **Dynamic Resizing:** Python lists automatically expand and shrink in memory as elements are added or removed (implemented internally as a dynamic contiguous array of pointers in CPython).

---

## 2. Modifying Lists: The Essential Mutability Methods

Unlike strings, list operations modify the list **in place** and usually return \`None\`.

\`\`\`mermaid
flowchart TD
    ListOps["List Modification Methods"] --> Add["Adding Items"]
    ListOps --> Del["Removing Items"]
    ListOps --> Order["Ordering Items"]

    Add --> A1["append(x): Adds single element at end"]
    Add --> A2["extend(iter): Unpacks & appends multiple items"]
    Add --> A3["insert(idx, x): Inserts item at specific index"]

    Del --> D1["pop(idx): Removes & returns item (default last)"]
    Del --> D2["remove(x): Removes first matching value"]
    Del --> D3["clear(): Deletes all elements"]
    Del --> D4["del list[idx]: Deletes by index or slice"]

    Order --> O1["sort(): In-place ascending sort"]
    Order --> O2["reverse(): In-place element reversal"]
\`\`\`

### In-Depth Method Comparison:

#### 1. \`append(x)\` vs \`extend(iterable)\`
- \`append(x)\`: Adds item \`x\` as a **single element** to the end of the list. If you append a list, it becomes a nested sub-list!
- \`extend(iterable)\`: Iterates over the given iterable and appends each element individually, flattening one level.
\`\`\`python
a = [1, 2]
a.append([3, 4])
print(a)  # [1, 2, [3, 4]] -> Nested! Length is 3!

b = [1, 2]
b.extend([3, 4])
print(b)  # [1, 2, 3, 4] -> Flat! Length is 4!
\`\`\`

#### 2. \`insert(index, element)\`
Inserts \`element\` at the specified \`index\`, shifting subsequent elements to the right ($O(n)$ time complexity):
\`\`\`python
nums = [10, 30, 40]
nums.insert(1, 20)  # Insert 20 at index 1 -> [10, 20, 30, 40]
\`\`\`

#### 3. \`remove(value)\` vs \`pop(index)\` vs \`del\`
- \`remove(value)\`: Searches for the **first occurrence** of \`value\` and deletes it. If \`value\` is not found, it raises a \`ValueError\`. Does NOT return the deleted value.
- \`pop(index=-1)\`: Removes and **returns** the element at \`index\`. If index is omitted, it removes and returns the **last element** ($O(1)$ stack operation). Raises \`IndexError\` on empty lists.
- \`del list[index]\`: Python statement that deletes an element or an entire slice from memory: \`del nums[1:3]\`.

#### 4. \`sort()\` vs \`sorted()\`
- \`list.sort(key=None, reverse=False)\`: Modifies the original list **in-place**; returns \`None\`.
- \`sorted(iterable)\`: Built-in function that **returns a brand new sorted list**, leaving the original untouched!

---

## 3. Shallow Copy vs Deep Copy

Because lists are mutable objects storing references:
\`\`\`python
# The Reference Alias Trap:
list1 = [1, 2, 3]
list2 = list1  # list2 points to the SAME memory address!
list2.append(4)
print(list1)   # [1, 2, 3, 4] -> list1 was unexpectedly modified!
\`\`\`

### Proper Copying Techniques:
1. **Shallow Copy (\`copy()\` or \`[:]\`):** Creates a new outer list container, but nested objects are still referenced:
   \`\`\`python
   shallow = list1.copy()
   \`\`\`
2. **Deep Copy (\`copy.deepcopy()\`):** Recursively clones the outer list AND all nested objects:
   \`\`\`python
   import copy
   deep = copy.deepcopy(nested_list)
   \`\`\`

---

## 4. List Comprehensions: The Pythonic Power Tool

A **List Comprehension** offers a concise, readable, and computationally faster way to construct new lists from existing iterables.

### General Syntax:
$$\\text{[expression for item in iterable if condition]}$$

\`\`\`mermaid
flowchart LR
    A["[ x**2 "] --> B["for x in range(10) "]
    B --> C["if x % 2 == 0 ]"]
    C --> D["Result: [0, 4, 16, 36, 64]"]
\`\`\`

### Comparison: Traditional Loop vs List Comprehension
\`\`\`python
# Traditional Approach (5 lines):
squares = []
for x in range(1, 6):
    if x % 2 != 0:
        squares.append(x ** 2)

# List Comprehension (1 line!):
squares = [x ** 2 for x in range(1, 6) if x % 2 != 0]
# Output: [1, 9, 25]
\`\`\`

### Nested List Comprehension (Flattening a Matrix):
\`\`\`python
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flat = [val for row in matrix for val in row]
print(flat) # [1, 2, 3, 4, 5, 6, 7, 8, 9]
\`\`\`

> [!IMPORTANT] **MEMORIZE:**
> - Lists are **ordered** and **mutable**.
> - \`append(x)\` adds a single item; \`extend(iter)\` adds all items from iterable.
> - \`pop()\` removes and returns the last element ($O(1)$); \`remove(x)\` removes the first matching value.
> - \`sort()\` modifies in place; \`sorted()\` returns a new list.
> - List comprehension syntax: \`[expression for item in iterable if condition]\`.

> [!NOTE] **DEV BRAIN:**
> List comprehensions are not just syntactic sugar—they run noticeably faster than standard \`.append()\` loops because the looping bytecode is executed at optimized C-speed inside the CPython evaluation loop!

> [!WARNING] **TRAP:**
> Do NOT write \`a = a.sort()\`. Since \`.sort()\` operates in place, it returns \`None\`. Assigning \`a = a.sort()\` will erase your list and set \`a = None\`!

> [!TIP] **EXAM TIP:**
> When asked to compare \`append()\` vs \`extend()\` in an exam, draw two sample diagrams showing \`list.append([3, 4])\` creating a nested sublist \`[1, 2, [3, 4]]\` and \`list.extend([3, 4])\` producing a flat list \`[1, 2, 3, 4]\`. This visual distinction guarantees full marks!`,
          shortNotes: "Lists are mutable & ordered collections []. append() adds 1 item; extend() unpacks collection. pop() returns removed item. Comprehensions: [expr for x in iter if cond].",
          examples: [
            {
              title: "Comprehensive Demonstration of List Mutations and List Comprehensions",
              problem: "Write a Python script demonstrating append vs extend, pop vs remove, in-place sorting, and list comprehensions.",
              explanation: "Illustrate mutability differences, in-place methods, and filtering using list comprehensions.",
              code: `# 1. append vs extend
nums1 = [10, 20]
nums1.append([30, 40])
print("append([30, 40]):", nums1)  # [10, 20, [30, 40]]

nums2 = [10, 20]
nums2.extend([30, 40])
print("extend([30, 40]):", nums2)  # [10, 20, 30, 40]

# 2. pop vs remove
popped_item = nums2.pop(1)  # Removes element at index 1 (20)
print(f"Popped index 1: {popped_item} | Resulting list: {nums2}")
nums2.remove(40)            # Removes value 40
print("After remove(40):", nums2)

# 3. List Comprehension with filtering & transformation
raw_data = [12, -5, 0, 18, -3, 25, 8]
# Extract positive numbers squared
pos_squares = [x ** 2 for x in raw_data if x > 0]
print("Positive squares comprehension:", pos_squares)`,
              output: "append([30, 40]): [10, 20, [30, 40]]\nextend([30, 40]): [10, 20, 30, 40]\nPopped index 1: 20 | Resulting list: [10, 30, 40]\nAfter remove(40): [10, 30]\nPositive squares comprehension: [144, 324, 625, 64]"
            },
          ],
          keyPoints: [
            "Lists are ordered, mutable sequences that support heterogeneous data types.",
            "append() adds a single entity to the end; extend() unpacks and appends all items from an iterable.",
            "pop() removes and returns an element by index; remove() deletes the first occurrence of a value.",
            "sort() reorganizes the list in place; sorted() returns a new sorted list.",
            "List comprehensions provide concise syntax [expr for x in iter if cond] with faster execution."
          ],
          theoryQuestions: [
            {
              question: "Explain the difference between append() and extend() methods of lists. What is the difference between sort() and sorted()?",
              marks: "5 Marks",
              answer: "1. append() vs extend():\n- `list.append(x)`: Appends its argument `x` as a single element to the end of the list. If `x` is a list, it is nested as a sub-list (e.g., `[1].append([2, 3])` yields `[1, [2, 3]]`).\n- `list.extend(iterable)`: Iterates over the supplied iterable and appends each element individually to the list (e.g., `[1].extend([2, 3])` yields `[1, 2, 3]`).\n\n2. sort() vs sorted():\n- `list.sort()`: A method of list objects that sorts elements in-place and returns `None`. Modifies the original list.\n- `sorted(iterable)`: A built-in function that accepts any iterable, creates a new list containing the sorted elements, and leaves the original sequence untouched.",
              keyPoints: ["append() single entity addition vs extend() iterable flattening", "Code and memory layout examples for append vs extend", "sort() in-place mutation and None return value", "sorted() non-destructive behavior returning new list"]
            },
            {
              question: "What is a List Comprehension? Explain its syntax and give an example of filtering even numbers from a list.",
              marks: "3 Marks",
              answer: "A List Comprehension is a concise, pythonic syntactic construct used to generate a new list by applying an expression to each item in an iterable, with optional condition filtering.\n\nSyntax:\n`[expression for item in iterable if condition]`\n\nExample:\n```python\nnumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\neven_squares = [x ** 2 for x in numbers if x % 2 == 0]\nprint(even_squares) # [4, 16, 36, 64, 100]\n```",
              keyPoints: ["Definition of list comprehension", "Syntax components [expr for item in iter if cond]", "Executable code example with filtering"]
            },
          ],
          mcqs: [
            {
              question: "What is the output of the following code?\nx = [1, 2]\nx.append([3, 4])\nprint(len(x))",
              options: ["4", "3", "2", "Error"],
              correctIndex: 1,
              explanation: "append() adds the entire list [3, 4] as a single nested element at index 2, resulting in [1, 2, [3, 4]], which has length 3."
            },
            {
              question: "What does list.pop() return if no index argument is provided?",
              options: ["None", "The first element at index 0", "The last element of the list", "The length of the list"],
              correctIndex: 2,
              explanation: "By default, list.pop() removes and returns the last element of the list (index -1)."
            },
            {
              question: "What is the result of [x for x in range(6) if x % 2 != 0]?",
              options: ["[0, 2, 4]", "[1, 3, 5]", "[1, 3, 5, 7]", "[2, 4, 6]"],
              correctIndex: 1,
              explanation: "range(6) produces 0, 1, 2, 3, 4, 5. The condition x % 2 != 0 filters for odd numbers: [1, 3, 5]."
            },
          ]
        },
        {
          id: "py1-u4-t4",
          title: "Tuples: Immutability, Tuple Packing & Unpacking, Single-element Tuples (x,)",
          simpleExplanation: "A tuple is like a sealed, write-protected list enclosed in parentheses (). Once created, nobody can add, remove, or modify its items. Tuples are faster than lists and protect critical data from accidental changes. Python uses tuples under the hood to perform magic tricks like swapping two variables in one line: a, b = b, a!",
          detailedExplanation: `## 1. What is a Tuple?

A **Tuple** is an ordered, **immutable**, heterogeneous collection of elements enclosed in parentheses \`()\`.

### Why Do We Need Tuples When We Already Have Lists?
Students often ask: *"If lists can do everything tuples do and are mutable, why does Python have tuples?"*
1. **Data Integrity & Protection:** If you pass data to an external function or API, tuples guarantee that the receiving function cannot maliciously or accidentally mutate your data (write-protection).
2. **Performance (Speed & Memory):** Because tuples have fixed size, Python allocates a single, tight block of memory for them without excess over-allocation buffers. Tuples instantiate faster and consume less RAM than lists.
3. **Dictionary Keys & Set Elements:** Only **hashable** (immutable) objects can be used as keys in a dictionary or elements in a set. Lists cannot be dictionary keys; tuples can!

\`\`\`python
# Valid dictionary key using tuple coordinates:
geo_cache = {(23.02, 72.57): "Ahmedabad", (28.61, 77.20): "New Delhi"}
\`\`\`

---

## 2. The Single-Element Tuple Trap

This is one of the most infamous exam traps in Python programming:
- In mathematics and Python, parentheses \`()\` are used for grouping expressions: \`(5 + 2) * 3\`.
- Therefore, simply wrapping a single item in parentheses **DOES NOT create a tuple**!

\`\`\`python
x = (42)
print(type(x))  # <class 'int'> -> NOT A TUPLE!

s = ("Hello")
print(type(s))  # <class 'str'> -> NOT A TUPLE!
\`\`\`

### The Solution: The Trailing Comma
To create a single-element tuple, you **MUST include a trailing comma**:
\`\`\`python
x = (42,)
print(type(x))  # <class 'tuple'> -> VALID TUPLE!
\`\`\`

---

## 3. Tuple Packing and Unpacking

### A. Tuple Packing
When you write multiple comma-separated values without any brackets or parentheses, Python automatically **packs** them into a single tuple object:
\`\`\`python
coordinates = 10, 20, 30  # Packed automatically
print(type(coordinates))  # <class 'tuple'>
\`\`\`

### B. Sequence Unpacking
Extracting items from a tuple back into individual variables in a single statement. The number of variables on the left must exactly match the number of elements in the tuple:
\`\`\`python
point = (100, 200, 300)
x, y, z = point
print(f"x={x}, y={y}, z={z}")  # x=100, y=200, z=300
\`\`\`
*If variables and items mismatch, Python raises \`ValueError: too many values to unpack\` or \`not enough values to unpack\`.*

### C. Swapping Variables in One Line
In languages like C or Java, swapping two variables requires a temporary third variable:
\`\`\`c
int temp = a; a = b; b = temp;
\`\`\`
In Python, variable swapping is a **one-line tuple packing and unpacking operation**:
\`\`\`python
a = 10
b = 20
a, b = b, a  # Right side packs (20, 10); left side unpacks into a and b!
print(a, b)  # 20 10
\`\`\`

### D. Extended Unpacking with the Asterisk (\`*\`) Operator
Introduced in PEP 3132, the \`*\` operator captures excess elements into a list:
\`\`\`python
record = ("Alice", 95, 88, 92, "Distinction")
name, *scores, status = record

print(name)    # "Alice"
print(scores)  # [95, 88, 92] (Captured as a list!)
print(status)  # "Distinction"
\`\`\`

---

## 4. Tuple Methods and Operations

Because tuples are immutable, they do NOT support \`append()\`, \`extend()\`, \`insert()\`, \`remove()\`, or \`pop()\`.

Tuples have **only two built-in methods**:
1. \`t.count(value)\`: Returns the number of occurrences of \`value\`.
2. \`t.index(value)\`: Returns the index of the first occurrence of \`value\` (raises \`ValueError\` if missing).

| Feature | List (\`list\`) | Tuple (\`tuple\`) |
| :--- | :--- | :--- |
| **Syntax** | Square brackets \`[1, 2]\` | Parentheses \`(1, 2)\` or comma-separated |
| **Mutability** | Mutable (can modify in place) | Immutable (read-only) |
| **Memory Consumption** | Higher (includes growth buffer) | Lower (tight memory allocation) |
| **Execution Speed** | Slower instantiation | Faster instantiation |
| **Dictionary Key** | Cannot be used as dict keys | Can be used as dict keys (if elements hashable) |
| **Available Methods** | Many (\`append\`, \`pop\`, \`sort\`...) | Only two: \`count()\` and \`index()\` |

> [!IMPORTANT] **MEMORIZE:**
> - Tuples are **ordered** and **immutable**.
> - Single-element tuple syntax **requires a trailing comma**: \`(x,)\`.
> - Swapping variables: \`a, b = b, a\`.
> - Tuples have only two methods: \`count()\` and \`index()\`.
> - Tuples can be used as dictionary keys because they are immutable (hashable).

> [!NOTE] **DEV BRAIN:**
> When returning multiple values from a Python function (\`return x, y, z\`), Python is actually packing them into a single tuple! When you write \`a, b, c = func()\`, you are unpacking that returned tuple.

> [!WARNING] **TRAP:**
> While a tuple itself is immutable, if a tuple contains a **mutable element** (such as a list), the contents of that nested list CAN still be modified!
> \`\`\`python
> t = (1, 2, [10, 20])
> t[2].append(30) # VALID! t is now (1, 2, [10, 20, 30])!
> \`\`\`

> [!TIP] **EXAM TIP:**
> A very common viva and MCQ question is: *"What is the type of \`t = (5)\` vs \`t = (5,)\`?"* Always highlight that \`(5)\` is an integer (\`int\`), whereas \`(5,)\` is a tuple. The comma is what makes it a tuple, not the parentheses!`,
          shortNotes: "Tuples are immutable collections (). Single-item requires comma (x,). Packing & unpacking enables one-line swap: a, b = b, a. Only methods: count() & index().",
          examples: [
            {
              title: "Demonstrating Tuple Packing, Unpacking, Asterisk Capture, and Immutability",
              problem: "Write a Python script demonstrating single-element tuple creation, variable swapping, extended unpacking (*), and tuple methods.",
              explanation: "Show type((5)) vs type((5,)), swap two variables, unpack records with *, and call count() and index().",
              code: `# 1. Single Element Tuple Trap
not_tuple = (5)
is_tuple = (5,)
print(f"(5) type: {type(not_tuple)} | (5,) type: {type(is_tuple)}")

# 2. Variable Swapping via Tuple Unpacking
a, b = 100, 999
print(f"Before swap: a={a}, b={b}")
a, b = b, a
print(f"After swap:  a={a}, b={b}")

# 3. Extended Unpacking with *
student_record = ("Dev Bhatt", "Computer Science", 95, 92, 88, "Semester 1")
name, branch, *marks, sem = student_record
print(f"Name: {name} | Branch: {branch}")
print(f"Captured Marks list: {marks} | Sem: {sem}")

# 4. Tuple Methods
nums = (10, 20, 30, 20, 40, 20)
print("Count of 20:", nums.count(20))
print("Index of 30:", nums.index(30))`,
              output: "(5) type: <class 'int'> | (5,) type: <class 'tuple'>\nBefore swap: a=100, b=999\nAfter swap:  a=999, b=100\nName: Dev Bhatt | Branch: Computer Science\nCaptured Marks list: [95, 92, 88] | Sem: Semester 1\nCount of 20: 3\nIndex of 30: 2"
            },
          ],
          keyPoints: [
            "Tuples are ordered and immutable collections enclosed in parentheses ().",
            "Single element tuples must have a trailing comma e.g., (10,); otherwise Python treats it as an integer in parens.",
            "Tuple packing and unpacking enables variable swapping: a, b = b, a without temp variables.",
            "The extended unpacking operator (*) collects excess items into a list.",
            "Tuples support only two methods: count() and index() due to their immutable nature.",
            "Tuples can be used as dictionary keys if all their contained elements are hashable."
          ],
          theoryQuestions: [
            {
              question: "What is a Tuple in Python? Differentiate between Lists and Tuples across five parameters. Explain the single-element tuple syntax.",
              marks: "5 Marks",
              answer: "A tuple is an ordered, immutable collection of elements enclosed in parentheses `()`.\n\nDifferences between List and Tuple:\n1. Mutability: Lists are mutable (elements can be added/removed). Tuples are immutable.\n2. Syntax: Lists use square brackets `[1, 2]`. Tuples use parentheses `(1, 2)` or commas.\n3. Memory & Speed: Tuples consume less RAM and instantiate faster than lists due to fixed memory allocation.\n4. Hashability: Tuples can be used as dictionary keys (if containing immutable items). Lists are unhashable and cannot be dict keys.\n5. Methods: Lists have numerous mutation methods (append, pop, remove, sort). Tuples have only two methods (count, index).\n\nSingle-Element Tuple Syntax:\nParentheses are used for mathematical operator precedence, so `(5)` evaluates as the integer 5. To create a tuple with one element, a trailing comma is mandatory: `(5,)`.",
              keyPoints: ["Definition of tuple", "Five comparison points: Mutability, Syntax, Memory/Speed, Hashability, Methods", "Single-element comma syntax requirement"]
            },
            {
              question: "Explain Tuple Packing and Unpacking in Python with code examples.",
              marks: "3 Marks",
              answer: "1. Tuple Packing: Assigning multiple comma-separated values to a single variable automatically packs them into a tuple.\nExample: `data = 1, 'Admin', True` creates `data = (1, 'Admin', True)`.\n2. Tuple Unpacking: Extracting elements from a tuple into separate variables.\nExample: `id, role, active = data` unpacks values into `id=1`, `role='Admin'`, `active=True`.\nUnpacking is also the mechanism behind one-line variable swapping: `a, b = b, a`.",
              keyPoints: ["Definition of tuple packing", "Definition and rules of tuple unpacking", "Application in variable swapping"]
            },
          ],
          mcqs: [
            {
              question: "What is the data type of the variable t = (100)?",
              options: ["tuple", "int", "list", "set"],
              correctIndex: 1,
              explanation: "Without a trailing comma, parentheses are evaluated as mathematical grouping, making t an int. To make it a tuple, write (100,)."
            },
            {
              question: "Which of the following methods is available on a Python tuple?",
              options: ["append()", "pop()", "count()", "remove()"],
              correctIndex: 2,
              explanation: "Tuples are immutable and only support two non-mutating inspection methods: count() and index()."
            },
            {
              question: "What is the result of executing: a, *b, c = (1, 2, 3, 4, 5)?",
              options: ["a=1, b=2, c=5", "a=1, b=[2, 3, 4], c=5", "a=1, b=(2, 3, 4), c=5", "ValueError"],
              correctIndex: 1,
              explanation: "Extended unpacking captures the first item into a (1), the last into c (5), and all intermediate items into a list assigned to b ([2, 3, 4])."
            },
          ]
        },
        {
          id: "py1-u4-t5",
          title: "Dictionaries & Sets: Key-Value pairs, dict methods (get, keys, values, items), Set operations (union, intersection)",
          simpleExplanation: "A dictionary is like a real-life phone book: instead of looking up data by number indices (0, 1, 2), you look it up by a unique name (key) to get the phone number (value). A set is like a VIP guest list that automatically bans all duplicate entries and lets you perform cool Venn diagram math like union, intersection, and difference.",
          detailedExplanation: `## 1. Dictionaries in Python: The Associative Mapping

A **Dictionary (\`dict\`)** is an ordered (since Python 3.7), **mutable** collection of **\`key: value\` pairs** enclosed in curly braces \`{}\`.

### The Golden Rules of Dictionary Keys:
1. **Keys Must Be Unique:** Duplicate keys are not permitted. If a key is repeated during declaration, the latter value overwrites the earlier value.
2. **Keys Must Be Immutable (Hashable):** Keys can be strings, numbers, or tuples. **Lists, sets, and dictionaries CANNOT be used as keys** (raises \`TypeError: unhashable type: 'list'\`).
3. **Values Can Be Anything:** Values can be duplicates, mutable objects, lists, or even other nested dictionaries.

\`\`\`mermaid
flowchart LR
    subgraph Dict["Dictionary: {'name': 'Alice', 'cgpa': 9.8}"]
        K1["Key: 'name' (Hashable)"] -->|Maps to| V1["Value: 'Alice'"]
        K2["Key: 'cgpa' (Hashable)"] -->|Maps to| V2["Value: 9.8"]
    end
\`\`\`

---

## 2. Accessing & Modifying Dictionaries

### Direct Indexing vs the \`.get()\` Method:
\`\`\`python
student = {"name": "Alice", "age": 20}

# 1. Square bracket syntax:
print(student["name"])  # 'Alice'
# print(student["gpa"]) # CRASH: KeyError: 'gpa'!

# 2. Safe .get() method:
print(student.get("gpa"))         # None (Safe! Does not crash!)
print(student.get("gpa", 0.0))    # 0.0 (Custom default fallback!)
\`\`\`

### Essential Dictionary Methods:
- \`d.keys()\`: Returns a view object of all keys.
- \`d.values()\`: Returns a view object of all values.
- \`d.items()\`: Returns a view object of all \`(key, value)\` tuples.
- \`d.update({key: val})\`: Merges another dictionary or key-value pairs.
- \`d.pop(key, default)\`: Removes \`key\` and returns its value; raises \`KeyError\` if missing and no default provided.
- \`d.popitem()\`: Removes and returns the last inserted \`(key, value)\` pair ($O(1)$ LIFO).
- \`d.setdefault(key, default)\`: If \`key\` is present, returns its value; if not, inserts \`key\` with \`default\`.

\`\`\`python
student = {"name": "Bob", "dept": "CSE"}

# Iterating over key-value pairs
for key, value in student.items():
    print(f"{key} -> {value}")
\`\`\`

### Dictionary Comprehensions:
$$\\{ \\text{key\\_expr} : \\text{value\\_expr} \\text{ for item in iterable if condition} \\}$$
\`\`\`python
# Create a dictionary of squares for even numbers
squares_dict = {x: x ** 2 for x in range(1, 6) if x % 2 == 0}
# Result: {2: 4, 4: 16}
\`\`\`

---

## 3. Sets in Python: Unique Mathematical Collections

A **Set (\`set\`)** is an **unordered**, **mutable** collection of **unique, hashable elements** enclosed in curly braces \`{}\`.

### Defining Sets:
\`\`\`python
primes = {2, 3, 5, 7, 2, 3}
print(primes) # {2, 3, 5, 7} -> Duplicates automatically eliminated!

# THE EMPTY SET TRAP:
empty_dict = {}       # Creates an EMPTY DICT, NOT an empty set!
empty_set = set()     # Correct way to instantiate an empty set!
\`\`\`

---

## 4. Mathematical Set Operations (Venn Diagram Operations)

Python provides both operator syntax and method syntax for mathematical set operations:

\`\`\`mermaid
flowchart TD
    Ops["Mathematical Set Operations"] --> U["Union (A | B)\\nAll elements in A or B"]
    Ops --> I["Intersection (A & B)\\nElements common to both"]
    Ops --> D["Difference (A - B)\\nElements in A but NOT B"]
    Ops --> SD["Symmetric Difference (A ^ B)\\nElements in A or B, but NOT both"]
\`\`\`

| Mathematical Operation | Operator | Method Equivalent | Meaning |
| :--- | :---: | :--- | :--- |
| **Union** | \`A \\| B\` | \`A.union(B)\` | All elements from both sets |
| **Intersection** | \`A & B\` | \`A.intersection(B)\` | Elements present in BOTH sets |
| **Difference** | \`A - B\` | \`A.difference(B)\` | Elements in \`A\` but NOT in \`B\` |
| **Symmetric Difference** | \`A ^ B\`| \`A.symmetric_difference(B)\` | Elements in either \`A\` or \`B\`, but NOT both |
| **Subset Check** | \`A <= B\`| \`A.issubset(B)\` | True if every element of \`A\` is in \`B\` |
| **Superset Check** | \`A >= B\`| \`A.issuperset(B)\` | True if \`A\` contains all elements of \`B\` |

### Modifying Sets:
- \`s.add(x)\`: Adds element \`x\` to the set.
- \`s.remove(x)\`: Removes \`x\`; **raises \`KeyError\`** if \`x\` is not present!
- \`s.discard(x)\`: Removes \`x\`; **does NOT raise an error** if \`x\` is absent (safe!).

> [!IMPORTANT] **MEMORIZE:**
> - Dict keys must be **immutable (hashable)** and **unique**.
> - Empty set must be created with \`set()\`, because \`{}\` creates an empty dictionary.
> - \`d.get(key, default)\` avoids crashing on missing keys.
> - \`s.discard(x)\` does not raise an error if \`x\` is missing; \`s.remove(x)\` raises \`KeyError\`.
> - Mathematical operators: \`|\` (Union), \`&\` (Intersection), \`-\` (Difference), \`^\` (Symmetric Diff).

> [!NOTE] **DEV BRAIN:**
> Both Dictionaries and Sets in Python are powered by **Hash Tables**. Looking up an item (\`key in dict\` or \`x in set\`) takes average $O(1)$ constant time, compared to $O(n)$ linear scans in lists!

> [!WARNING] **TRAP:**
> Never try to use a list as a dictionary key or set item:
> \`d = {[1, 2]: "value"}\` crashes with \`TypeError: unhashable type: 'list'\`. Always convert the list to a tuple first: \`d = {(1, 2): "value"}\`!

> [!TIP] **EXAM TIP:**
> When asked to remove duplicates from a list in an exam, the standard pythonic trick is \`unique_list = list(set(original_list))\`. Explain that sets guarantee uniqueness, though they do not preserve element order.`,
          shortNotes: "Dict: key-value pairs {k: v}, keys must be immutable. Use d.get(k) to prevent KeyError. Set: unique items {x}, empty set is set(). Math: | (union), & (intersection), - (diff).",
          examples: [
            {
              title: "Comprehensive Demonstration of Dictionary Methods and Set Operations",
              problem: "Write a Python script demonstrating safe dict retrieval with get(), word frequency counting, and mathematical set operations.",
              explanation: "Demonstrate dictionary manipulation, set operations (union, intersection, difference), and remove duplicates with set().",
              code: `# 1. Safe Dictionary Access
user = {"username": "dev_bhatt", "role": "admin"}
print("Role:", user.get("role"))
print("Email (with default):", user.get("email", "support@college.edu"))

# 2. Word Frequency Counter using dict
sentence = "apple banana apple orange banana apple"
freq = {}
for word in sentence.split():
    freq[word] = freq.get(word, 0) + 1
print("Word Frequency:", freq)

# 3. Mathematical Set Operations
cs_students = {"Alice", "Bob", "Charlie", "David"}
math_students = {"Charlie", "David", "Emma", "Frank"}

print("Union (All Students):", cs_students | math_students)
print("Intersection (Both Courses):", cs_students & math_students)
print("Difference (CS Only):", cs_students - math_students)
print("Symmetric Diff (Only One Course):", cs_students ^ math_students)`,
              output: "Role: admin\nEmail (with default): support@college.edu\nWord Frequency: {'apple': 3, 'banana': 2, 'orange': 1}\nUnion (All Students): {'Alice', 'Bob', 'Charlie', 'David', 'Emma', 'Frank'}\nIntersection (Both Courses): {'Charlie', 'David'}\nDifference (CS Only): {'Alice', 'Bob'}\nSymmetric Diff (Only One Course): {'Alice', 'Bob', 'Emma', 'Frank'}"
            },
          ],
          keyPoints: [
            "Dictionaries map immutable hashable keys to arbitrary values via hash tables.",
            "d.get(key, default) avoids KeyError exceptions by returning None or a fallback default.",
            "Sets store unique, unordered elements; duplicate elements are discarded automatically.",
            "An empty set must be instantiated using set(); {} creates an empty dictionary.",
            "Mathematical set operators: | (Union), & (Intersection), - (Difference), and ^ (Symmetric Difference).",
            "s.discard(x) removes an item safely without error, whereas s.remove(x) raises a KeyError if missing."
          ],
          theoryQuestions: [
            {
              question: "What is a Dictionary in Python? What are the constraints on dictionary keys? Explain any four dictionary methods.",
              marks: "5 Marks",
              answer: "A Dictionary is an ordered, mutable mapping of key-value pairs written as `{key: value}`.\n\nConstraints on Dictionary Keys:\n1. Uniqueness: Each key in a dictionary must be unique. Duplicate keys overwrite previous mappings.\n2. Hashability: Keys must be immutable objects (strings, numbers, tuples). Mutable types like lists or dicts cannot be keys because their hash values can change.\n\nFour Methods:\n1. `get(key, default)`: Safely retrieves the value for `key`. Returns default if key is not found, avoiding KeyError.\n2. `keys()`: Returns a dynamic view of all keys in the dictionary.\n3. `items()`: Returns a dynamic view of `(key, value)` tuple pairs for iteration.\n4. `update(other_dict)`: Merges key-value pairs from `other_dict` into the calling dictionary.",
              keyPoints: ["Definition of dictionary", "Key constraints: uniqueness and hashability/immutability", "Explanation of get(), keys(), items(), update()", "Code snippets demonstrating usage"]
            },
            {
              question: "Explain Set operations in Python: Union, Intersection, Difference, and Symmetric Difference with mathematical operators and methods.",
              marks: "5 Marks",
              answer: "A Set is an unordered collection of unique elements.\n\nOperations:\n1. Union (`A | B` or `A.union(B)`): Returns a set containing all distinct elements present in set A, set B, or both.\n2. Intersection (`A & B` or `A.intersection(B)`): Returns elements that are common to both set A and set B.\n3. Difference (`A - B` or `A.difference(B)`): Returns elements that belong to set A but NOT to set B.\n4. Symmetric Difference (`A ^ B` or `A.symmetric_difference(B)`): Returns elements that are in either set A or set B, but not in both.\n\nExample:\n`A = {1, 2, 3}`, `B = {3, 4, 5}`\n- Union: `{1, 2, 3, 4, 5}`\n- Intersection: `{3}`\n- Difference (A-B): `{1, 2}`\n- Symmetric Diff: `{1, 2, 4, 5}`",
              keyPoints: ["Definition of set and uniqueness property", "Symbols: |, &, -, ^", "Method counterparts: union, intersection, difference, symmetric_difference", "Clear numerical examples"]
            },
          ],
          mcqs: [
            {
              question: "What is the result of executing type({}) in Python?",
              options: ["<class 'set'>", "<class 'dict'>", "<class 'tuple'>", "SyntaxError"],
              correctIndex: 1,
              explanation: "{} creates an empty dictionary by default. To create an empty set, you must use set()."
            },
            {
              question: "Which of the following objects CANNOT be used as a dictionary key?",
              options: ["(1, 2, 3)", "'student_name'", "[10, 20]", "100"],
              correctIndex: 2,
              explanation: "Lists are mutable and unhashable, so attempting to use a list as a dictionary key raises a TypeError."
            },
            {
              question: "If s = {1, 2, 3}, what happens when s.discard(10) is executed?",
              options: ["Raises a KeyError", "Raises a ValueError", "Does nothing and execution continues safely", "Appends 10 to the set"],
              correctIndex: 2,
              explanation: "s.discard(x) removes x if present, and does nothing without error if x is absent. (Unlike s.remove(x) which would raise KeyError)."
            },
          ]
        },
      ]
    },
    {
      id: "py1-u5",
      title: "Unit 5: Functions, Scope, Recursion & File I/O",
      description: "Modular programming, function definitions, parameter passing styles (*args, **kwargs), lambda functions, lexical variable scoping (LEGB), recursion mechanics on the call stack, and persistent file I/O operations.",
      topics: [
        {
          id: "py1-u5-t1",
          title: "User-Defined Functions: def, return, Positional vs Keyword vs Default Arguments",
          simpleExplanation: "A function is a reusable mini-program: you wrap up a block of code with a name using 'def', give it some inputs (arguments), and it hands you back a calculated result using 'return'. This saves you from copy-pasting the same code 50 times across your project, keeping your code DRY (Don't Repeat Yourself).",
          detailedExplanation: `## 1. Modular Programming & The DRY Principle

In software engineering, modular programming is the practice of dividing a large monolithic problem into smaller, independent, reusable blocks called **Functions**. 

The core philosophy of writing functions is the **DRY Principle (Don't Repeat Yourself)**:
- Reduces code redundancy and maintenance costs.
- Enhances readability, reusability, and code organization.
- Enables unit testing and isolated debugging.

\`\`\`mermaid
flowchart LR
    Caller["Main Program / Caller"] -->|"Arguments: add(10, 20)"| Func["Function Body: def add(a, b):"]
    Func -->|"Returns: 30"| Caller
\`\`\`

---

## 2. Anatomy of a Python Function

A function is defined using the **\`def\`** keyword, followed by the function identifier, parameters in parentheses, and a colon \`:\`.

\`\`\`python
def function_name(param1, param2) -> return_type:
    '''Optional Docstring: Explains what the function does.'''
    # Function Suite (Indented 4 spaces)
    result = param1 + param2
    return result
\`\`\`

### Parameters vs Arguments:
- **Parameter:** The variable listed inside the parentheses in the function **definition** (\`def add(a, b):\`).
- **Argument:** The actual concrete value sent to the function when it is **invoked/called** (\`add(5, 10)\`).

### The \`return\` Statement:
- Terminates function execution immediately and sends a value back to the caller.
- If a function finishes without an explicit \`return\` statement (or calls a bare \`return\`), Python **implicitly returns \`None\`**!
- Functions can return **multiple values** simultaneously; Python packs them into a single tuple automatically:
  \`\`\`python
  def min_max(numbers):
      return min(numbers), max(numbers)  # Returns a tuple (min_val, max_val)
  \`\`\`

---

## 3. Categories of Function Arguments

Python provides flexible mechanisms for passing data into functions:

\`\`\`mermaid
flowchart TD
    Args["Argument Passing Styles"] --> POS["1. Positional Arguments\\nMatched by exact order"]
    Args --> KEY["2. Keyword Arguments\\nMatched by parameter name"]
    Args --> DEF["3. Default Arguments\\nFallback values if omitted"]
\`\`\`

### A. Positional Arguments
Arguments matched to parameters strictly based on their physical position/order:
\`\`\`python
def power(base, exp):
    return base ** exp

print(power(2, 3))  # 8 (base=2, exp=3)
print(power(3, 2))  # 9 (base=3, exp=2) -> Order matters!
\`\`\`

### B. Keyword (Named) Arguments
Arguments passed by explicitly specifying the parameter name. The order does **NOT** matter when using keywords:
\`\`\`python
def describe_pet(animal_type, pet_name):
    print(f"I have a {animal_type} named {pet_name}.")

describe_pet(pet_name="Bruno", animal_type="Dog") # Order flipped, but works perfectly!
\`\`\`
*Rule: Positional arguments MUST always precede keyword arguments in a call (\`func(10, name="Alice")\` is legal, \`func(name="Alice", 10)\` is illegal!).*

### C. Default Parameter Values
Parameters can have default fallback values assigned in the function header. If the caller does not provide an argument, the default is used:
\`\`\`python
def greet(name, greeting="Hello"):
    print(f"{greeting}, {name}!")

greet("Alice")           # Uses default: "Hello, Alice!"
greet("Bob", "Good day") # Overrides default: "Good day, Bob!"
\`\`\`
*Syntactic Rule: In the function definition, non-default parameters must ALWAYS come before default parameters (\`def f(a, b=2):\` is legal; \`def f(a=2, b):\` causes \`SyntaxError: non-default argument follows default argument\`).*

---

## 4. The Mutable Default Argument Trap

This is one of Python's most notorious interview and exam traps:

### The Buggy Pattern:
\`\`\`python
def append_item(item, item_list=[]):
    item_list.append(item)
    return item_list

print(append_item(1)) # [1]
print(append_item(2)) # [1, 2] -> UNEXPECTED! The list was NOT reset to empty!
\`\`\`

### Why Does This Happen?
In Python, default parameter expressions are evaluated **once at function definition time**, NOT each time the function is called! The empty list \`[]\` is created once in memory. Every subsequent call shares that **exact same mutable list object**!

### The Proper Pythonic Fix:
Use \`None\` as the sentinel default value and create a fresh list inside:
\`\`\`python
def append_item(item, item_list=None):
    if item_list is None:
        item_list = []
    item_list.append(item)
    return item_list
\`\`\`

> [!IMPORTANT] **MEMORIZE:**
> - Functions are defined using **\`def\`**; they return **\`None\`** if no return statement is specified.
> - Positional arguments must appear **before** keyword arguments in calls.
> - Default parameters must be defined **after** non-default parameters.
> - Never use mutable objects (\`[]\`, \`{}\`) as default arguments; use **\`None\`**.
> - Returning multiple values \`return a, b\` packs them into a **tuple**.

> [!NOTE] **DEV BRAIN:**
> Python supports type hints (PEP 484): \`def add(a: int, b: int) -> int:\`. Type hints don't enforce types at runtime, but modern IDEs and static type checkers like \`mypy\` use them to prevent bugs in large enterprise codebases.

> [!WARNING] **TRAP:**
> Writing \`def calc(discount=0.1, price):\` is an immediate compile-time \`SyntaxError: non-default argument follows default argument\`! All parameters with default values must be pushed to the right side of the parameter list.

> [!TIP] **EXAM TIP:**
> When asked about "Call by Value vs Call by Reference" in Python, clarify that Python uses **Call by Object Reference (or Call by Sharing)**. If you pass an immutable object (int, string), the caller value cannot be changed. If you pass a mutable object (list, dict), in-place modifications reflect in the caller!`,
          shortNotes: "Functions: def func(): return. Positional before keyword args. Defaults after non-defaults. Never use mutable defaults (use None). Multi-returns pack into tuples.",
          examples: [
            {
              title: "Function Argument Varieties, Multi-return, and Mutable Default Fix",
              problem: "Write a Python script demonstrating positional, keyword, and default arguments, returning multiple statistics, and avoiding the mutable default trap.",
              explanation: "Compute statistics with multi-return tuple unpacking and show the safe item_list=None pattern.",
              code: `# 1. Multi-value return (packed as tuple)
def compute_stats(numbers: list) -> tuple[int, int, float]:
    low = min(numbers)
    high = max(numbers)
    avg = sum(numbers) / len(numbers)
    return low, high, avg

minimum, maximum, average = compute_stats([10, 20, 30, 40, 50])
print(f"Stats: Min={minimum}, Max={maximum}, Avg={average:.1f}")

# 2. Safe default argument pattern
def add_student(student_id: int, roster: list = None) -> list:
    if roster is None:
        roster = []
    roster.append(student_id)
    return roster

class_a = add_student(101)
print("Class A:", class_a)  # [101]
class_b = add_student(202)
print("Class B:", class_b)  # [202] (Isolated! Not contaminated by 101)`,
              output: "Stats: Min=10, Max=50, Avg=30.0\nClass A: [101]\nClass B: [202]"
            },
          ],
          keyPoints: [
            "Functions promote modularity, readability, and the DRY (Don't Repeat Yourself) principle.",
            "Parameters are defined in the function signature; arguments are concrete values passed at invocation.",
            "Positional arguments match strictly by order; keyword arguments match explicitly by parameter name.",
            "Default parameters must be placed after all non-default parameters in function definitions.",
            "Mutable default arguments (like lists) persist across function calls; use None as a sentinel default instead.",
            "Functions without an explicit return statement return None by default."
          ],
          theoryQuestions: [
            {
              question: "Explain the different types of function arguments supported in Python with code examples. What is the Mutable Default Argument trap?",
              marks: "5 Marks",
              answer: "Argument Types in Python:\n1. Positional Arguments: Mapped to parameters based strictly on sequence order: `power(2, 3)`.\n2. Keyword Arguments: Passed with explicit parameter names: `greet(name='Alice', greeting='Hi')`. Order does not matter.\n3. Default Arguments: Parameters initialized with fallback values: `def greet(name, msg='Hello')`. If omitted by caller, the default is used.\n\nMutable Default Argument Trap:\nDefault argument expressions are evaluated once when the function is defined, not per call. If a mutable object like `[]` is used (`def add(item, lst=[])`), that single list object is reused across all subsequent invocations, causing cross-call state pollution.\nFix: Use `lst=None` and initialize `if lst is None: lst = []`.",
              keyPoints: ["Positional, keyword, and default argument definitions", "Rule: Positional before keyword, non-default before default", "Explanation of mutable default evaluation timing", "The 'lst=None' idiom solution"]
            },
            {
              question: "What is meant by 'Call by Object Reference' in Python? How does it differ when passing mutable vs immutable objects?",
              marks: "3 Marks",
              answer: "Python uses Call by Object Reference (also called Call by Sharing):\n- When an argument is passed to a function, the parameter binds to the exact same object reference.\n- If the object is IMMUTABLE (int, float, str, tuple), modifying it inside the function creates a new local object; the caller's variable remains unchanged.\n- If the object is MUTABLE (list, dict), modifying it in place (e.g., `lst.append()`) directly modifies the caller's object because both share the same heap memory address.",
              keyPoints: ["Definition of Call by Object Reference / Call by Sharing", "Behavior with immutable types (safe from modification)", "Behavior with mutable types (in-place mutations reflect in caller)"]
            },
          ],
          mcqs: [
            {
              question: "What will be printed if a function has no return statement and its output is printed?",
              options: ["0", "False", "None", "SyntaxError"],
              correctIndex: 2,
              explanation: "In Python, any function that completes execution without reaching an explicit return statement returns the None object."
            },
            {
              question: "Which of the following function definitions causes a SyntaxError?",
              options: ["def func(a, b=5):", "def func(a=5, b=10):", "def func(a=5, b):", "def func(a, b, c=1):"],
              correctIndex: 2,
              explanation: "In Python, non-default arguments cannot follow default arguments in a function signature, so 'def func(a=5, b):' is illegal."
            },
            {
              question: "What does a function return when it executes: return 10, 20, 30?",
              options: ["A list [10, 20, 30]", "A tuple (10, 20, 30)", "Only the first value 10", "A syntax error"],
              correctIndex: 1,
              explanation: "Multiple comma-separated values in a return statement are automatically packed into a tuple."
            },
          ]
        },
        {
          id: "py1-u5-t2",
          title: "Variable Length Arguments (*args, **kwargs) & Anonymous Lambda Functions",
          simpleExplanation: "What if you don't know how many numbers the user will pass\u2014maybe 2, maybe 100? *args scoops up any number of extra positional inputs into a tuple, while **kwargs scoops up extra named inputs into a dictionary. Lambda functions are quick, one-line throwaway functions without a name that you can create on the fly.",
          detailedExplanation: `## 1. Handling Arbitrary Numbers of Arguments

When writing general-purpose functions (such as calculating the arithmetic mean of any number of inputs, or designing logging frameworks), you cannot always predict how many arguments a user will pass. 

Python solves this using **Variable-Length Argument Packing**:
- **\`*args\`:** Packs arbitrary extra **positional** arguments into a **\`tuple\`**.
- **\`**kwargs\`:** Packs arbitrary extra **keyword** arguments into a **\`dict\`**.

\`\`\`mermaid
flowchart TD
    Call["Function Call: func(1, 2, 3, x=10, y=20)"] --> Split{"Argument Parser"}
    Split -->|"Positional: (1, 2, 3)"| A["*args (Tuple)"]
    Split -->|"Keyword: {'x': 10, 'y': 20}"| K["**kwargs (Dict)"]
\`\`\`

---

## 2. In-Depth: \`*args\` and \`**kwargs\`

### A. The \`*args\` Parameter (Tuple Packing)
The single asterisk \`*\` instructs Python to scoop up any excess positional arguments and pack them into a tuple named \`args\`:
\`\`\`python
def calculate_sum(*args):
    print("Type of args:", type(args))  # <class 'tuple'>
    total = 0
    for num in args:
        total += num
    return total

print(calculate_sum(1, 2, 3, 4, 5))  # 15
print(calculate_sum(10, 20))         # 30
print(calculate_sum())               # 0 (Empty tuple)
\`\`\`

### B. The \`**kwargs\` Parameter (Dictionary Packing)
The double asterisk \`**\` instructs Python to scoop up any excess named keyword arguments and pack them into a dictionary named \`kwargs\`:
\`\`\`python
def print_user_profile(user_id, **kwargs):
    print(f"User ID: {user_id}")
    print("Type of kwargs:", type(kwargs))  # <class 'dict'>
    for key, value in kwargs.items():
        print(f"  {key}: {value}")

print_user_profile(101, name="Alice", role="Admin", department="CyberSecurity")
\`\`\`

### C. The Master Parameter Ordering Rule
When combining all argument forms in a single function definition, you **must strictly follow this sequence**:
$$\\text{def func}(\\text{positional}, \\text{default}=\\text{val}, *\\text{args}, \\text{keyword\\_only}, **\\text{kwargs}):$$

\`\`\`python
def master_func(a, b=0, *args, flag=True, **kwargs):
    pass
\`\`\`

### D. Argument Unpacking with \`*\` and \`**\`
The asterisk operators can also be used in reverse to **unpack** collections into function arguments during a function call:
\`\`\`python
def add_three(x, y, z):
    return x + y + z

nums = [10, 20, 30]
print(add_three(*nums))  # Unpacks list into positional arguments x=10, y=20, z=30

params = {"x": 1, "y": 2, "z": 3}
print(add_three(**params)) # Unpacks dict into keyword arguments!
\`\`\`

---

## 3. Anonymous (Lambda) Functions

A **Lambda Function** is an anonymous, unnamed function defined on a single line using the **\`lambda\`** keyword.

### Syntax:
$$\\text{lambda } \\text{arguments} : \\text{expression}$$

- Can take any number of arguments separated by commas.
- Must contain **only a single expression** (no multi-line blocks, no loops, no assignments).
- The expression is automatically evaluated and **implicitly returned** (the \`return\` keyword is forbidden inside lambda!).

### Traditional Function vs Lambda:
\`\`\`python
# Traditional def function:
def square(x):
    return x ** 2

# Equivalent lambda:
square_lambda = lambda x: x ** 2
print(square_lambda(5)) # 25
\`\`\`

---

## 4. Higher-Order Functions: Where Lambdas Shine

Lambda functions are most commonly passed as inline arguments to higher-order functions:

### A. Sorting Custom Data with \`sorted(key=lambda ...)\`
\`\`\`python
students = [("Alice", 88), ("Bob", 95), ("Charlie", 78)]
# Sort by marks (2nd element of tuple)
sorted_students = sorted(students, key=lambda s: s[1], reverse=True)
print(sorted_students) # [('Bob', 95), ('Alice', 88), ('Charlie', 78)]
\`\`\`

### B. \`map(function, iterable)\`
Applies the function to every item in the iterable:
\`\`\`python
nums = [1, 2, 3, 4]
doubled = list(map(lambda x: x * 2, nums)) # [2, 4, 6, 8]
\`\`\`

### C. \`filter(function, iterable)\`
Filters items for which the boolean function returns \`True\`:
\`\`\`python
nums = [10, 15, 20, 25, 30]
evens = list(filter(lambda x: x % 2 == 0, nums)) # [10, 20, 30]
\`\`\`

> [!IMPORTANT] **MEMORIZE:**
> - \`*args\` captures positional arguments as a **\`tuple\`**.
> - \`**kwargs\` captures keyword arguments as a **\`dict\`**.
> - In function signatures: \`positional, *args, **kwargs\`.
> - Lambda syntax: \`lambda args: expression\`.
> - Lambdas contain **only one expression** and have an **implicit return**; never write \`return\` inside a lambda!

> [!NOTE] **DEV BRAIN:**
> While \`map()\` and \`filter()\` with lambdas are popular in functional programming, Python developers generally prefer list comprehensions (\`[x*2 for x in nums]\` or \`[x for x in nums if x%2==0]\`) because they are more readable and faster!

> [!WARNING] **TRAP:**
> Do NOT write statements inside lambdas! Writing \`lambda x: return x * 2\` or \`lambda x: print(x); x = x + 1\` produces an immediate \`SyntaxError\`. Lambdas can only evaluate a single expression!

> [!TIP] **EXAM TIP:**
> When asked to define a lambda in an exam, always emphasize three points: (1) It is an anonymous function, (2) It contains only a single evaluated expression with implicit return, and (3) Its typical use cases include \`map()\`, \`filter()\`, and custom keys in \`sorted()\`.`,
          shortNotes: "*args packs into tuple; **kwargs packs into dict. Lambda: lambda args: expr (one-line anonymous function with implicit return). Ideal for sorted(), map(), filter().",
          examples: [
            {
              title: "Comprehensive Demonstration of *args, **kwargs, and Lambda with Sorted",
              problem: "Write a Python script demonstrating variable-length arguments (*args, **kwargs) and custom sorting using lambda functions.",
              explanation: "Create an event logger accepting arbitrary metadata via **kwargs and sort complex dictionary records using a lambda key.",
              code: `# 1. Variable Length *args and **kwargs
def log_event(event_name: str, *details, **metadata):
    print(f"Event: {event_name}")
    print(f"  Details tuple (*args): {details}")
    print(f"  Metadata dict (**kwargs): {metadata}")

log_event("LOGIN_SUCCESS", "IP: 192.168.1.1", "Browser: Chrome", user_id=402, role="Admin")

# 2. Lambda with sorted() on dictionary items
products = [
    {"name": "Laptop", "price": 1200},
    {"name": "Mouse", "price": 25},
    {"name": "Monitor", "price": 350}
]

# Sort by price ascending
sorted_products = sorted(products, key=lambda p: p["price"])
print("\\nSorted by price:")
for prod in sorted_products:
    print(f"  {prod['name']}: \${prod['price']}")`,
              output: "Event: LOGIN_SUCCESS\n  Details tuple (*args): ('IP: 192.168.1.1', 'Browser: Chrome')\n  Metadata dict (**kwargs): {'user_id': 402, 'role': 'Admin'}\n\nSorted by price:\n  Mouse: $25\n  Monitor: $350\n  Laptop: $1200"
            },
          ],
          keyPoints: [
            "*args packs arbitrary extra positional arguments into an immutable tuple.",
            "**kwargs packs arbitrary extra keyword arguments into a mutable dictionary.",
            "Argument unpacking using * and ** expands collections into discrete function arguments.",
            "Lambda functions are anonymous, one-line functions written as lambda args: expression.",
            "Lambdas implicitly return the result of their single expression; the return keyword is illegal inside lambdas.",
            "Common higher-order applications include map(), filter(), and sorted(key=lambda ...)."
          ],
          theoryQuestions: [
            {
              question: "Explain the concept of variable-length arguments in Python (*args and **kwargs). What is the parameter ordering rule?",
              marks: "5 Marks",
              answer: "Variable-length arguments allow functions to accept an arbitrary number of arguments:\n1. `*args`: Collects excess positional arguments passed to the function into a tuple. Inside the function, `args` behaves as a standard tuple.\n2. `**kwargs`: Collects excess keyword (named) arguments passed to the function into a dictionary. Inside the function, `kwargs` behaves as a key-value dictionary.\n\nParameter Ordering Rule:\nWhen mixing argument types in a function signature, they must appear in this strict sequence:\n1. Standard positional parameters\n2. Default parameters\n3. `*args` (positional variable-length)\n4. Keyword-only parameters\n5. `**kwargs` (keyword variable-length)\nExample: `def func(a, b=0, *args, kw_only=1, **kwargs): pass`",
              keyPoints: ["*args definition and tuple packing", "**kwargs definition and dict packing", "Strict parameter ordering rule", "Code snippet illustrating combined usage"]
            },
            {
              question: "What is an Anonymous (Lambda) Function? Discuss its syntax, limitations, and utility with higher-order functions.",
              marks: "3 Marks",
              answer: "A Lambda function is an anonymous (unnamed) inline function defined using the `lambda` keyword.\nSyntax: `lambda arguments: expression`\n\nCharacteristics & Limitations:\n- Can take any number of arguments, but can only evaluate a single expression.\n- The result of the expression is implicitly returned; the `return` keyword cannot be used.\n- Cannot contain multiple statements, loops, or variable assignments.\n\nUtility:\nUsed where short, throwaway functions are needed temporarily, especially with higher-order functions like `sorted(key=lambda x: x[1])`, `map()`, and `filter()`.",
              keyPoints: ["Definition of lambda function", "Syntax structure", "Single-expression limitation and implicit return", "Applications with sorted(), map(), filter()"]
            },
          ],
          mcqs: [
            {
              question: "What data type does *args take inside a Python function?",
              options: ["list", "tuple", "dict", "set"],
              correctIndex: 1,
              explanation: "Python packs all positional arguments passed via *args into an immutable tuple object."
            },
            {
              question: "What data type does **kwargs take inside a Python function?",
              options: ["list", "tuple", "dict", "generator"],
              correctIndex: 2,
              explanation: "Python packs all keyword arguments passed via **kwargs into a dictionary object."
            },
            {
              question: "Which of the following lambda expressions is syntactically INVALID?",
              options: ["lambda x, y: x + y", "lambda: 'Hello'", "lambda x: return x * 2", "lambda x: x if x > 0 else -x"],
              correctIndex: 2,
              explanation: "The 'return' keyword is forbidden inside lambda expressions because lambdas return their expression implicitly."
            },
          ]
        },
        {
          id: "py1-u5-t3",
          title: "Variable Scope: LEGB Rule (Local, Enclosing, Global, Built-in) & global/nonlocal keywords",
          simpleExplanation: "Scope is the neighborhood where a variable lives and who is allowed to see it. If you create a variable inside a bedroom (a function), someone standing on the street (outside) cannot see it. Python searches for variables following the LEGB rule: first in your Local room, then in the Enclosing house, then Global neighborhood, and finally Built-in country laws.",
          detailedExplanation: `## 1. What is Variable Scope and Lifetime?

In programming, **Scope** refers to the region of a program where a particular identifier (variable, function, class) is visible and accessible. 

- **Scope:** *Where* a variable can be referenced.
- **Lifetime:** *How long* a variable remains alive in memory before being destroyed. A local function variable is born when the function is called and dies when the function returns.

---

## 2. The LEGB Scope Resolution Rule

When Python encounters a variable name in code, it searches for that variable's value across four concentric scopes in a strict hierarchical order known as the **LEGB Rule**:

\`\`\`mermaid
flowchart TD
    L["1. LOCAL Scope (L)\\nInside current function"] --> E["2. ENCLOSING Scope (E)\\nInside enclosing nested function (closures)"]
    E --> G["3. GLOBAL Scope (G)\\nTop-level of current module/file"]
    G --> B["4. BUILT-IN Scope (B)\\nPre-loaded Python names (len, print, range)"]
    B --> NF["NameError: name 'x' is not defined"]
\`\`\`

### The Four LEGB Levels Explained:
1. **L — Local Scope:** Variables defined inside the body of the currently executing function or lambda. Accessible only inside that function.
2. **E — Enclosing (Nonlocal) Scope:** Variables defined in the outer enclosing function of a nested function structure (closures).
3. **G — Global Scope:** Variables defined at the top-level of a module file, or declared using the \`global\` keyword. Accessible by all functions within that file.
4. **B — Built-in Scope:** The widest scope containing pre-loaded Python built-ins like \`len\`, \`range\`, \`print\`, \`int\`, \`ValueError\`, etc. Provided by the \`builtins\` module.

*If Python searches through Local $\\to$ Enclosing $\\to$ Global $\\to$ Built-in and fails to find the variable name, it raises a \`NameError\`.*

---

## 3. Reading vs Modifying Scoped Variables

### Reading Global Variables:
Functions can **read** global variables freely without any special keyword:
\`\`\`python
app_name = "Finance Tracker"  # Global variable

def show_app():
    print(app_name)  # Reads global variable perfectly!

show_app()
\`\`\`

### Modifying Global Variables: The \`global\` Keyword
If you attempt to assign or rebind a variable inside a function, Python automatically treats it as a **new local variable**! To modify a global variable from inside a function, you must declare it using the **\`global\`** keyword:
\`\`\`python
counter = 0  # Global

def increment_bad():
    # counter += 1  # CRASH: UnboundLocalError!
    pass

def increment_good():
    global counter  # Tells Python to bind to the module-level variable
    counter += 1

increment_good()
print("Counter:", counter)  # 1
\`\`\`

---

## 4. Nested Functions and the \`nonlocal\` Keyword

Introduced in Python 3, the **\`nonlocal\`** keyword is used inside nested functions to rebind variables belonging to the **enclosing (outer) function's scope**, bypassing the local scope without making them global:

\`\`\`python
def outer():
    count = 10  # Enclosing variable

    def inner():
        nonlocal count  # Targets the variable in outer()!
        count += 5
        print("Inner count:", count)

    inner()
    print("Outer count:", count)

outer()
# Output:
# Inner count: 15
# Outer count: 15
\`\`\`

---

## 5. The Infamous \`UnboundLocalError\` Trap

\`\`\`python
x = 100

def check_val():
    print(x) # Error happens here!
    x = 200

# check_val() # CRASH: UnboundLocalError: local variable 'x' referenced before assignment
\`\`\`

### Why Does This Crash Occur?
When Python compiles the \`check_val\` function into bytecode, it inspects all assignments. Because it sees \`x = 200\` inside the function, it classifies \`x\` as a **Local Variable** for the *entire* function scope. When line 1 tries to print \`x\` before the local assignment on line 2, it crashes!

| Keyword | Target Scope | When to Use |
| :--- | :--- | :--- |
| *(None)* | Local | Normal local temporary variables inside functions |
| \`global\` | Global (Module level) | When a function needs to write/reassign a top-level module variable |
| \`nonlocal\` | Enclosing (Outer function) | When a nested inner function needs to modify a variable in outer function |

> [!IMPORTANT] **MEMORIZE:**
> - Scope lookup order is strictly **LEGB**: **L**ocal $\\to$ **E**nclosing $\\to$ **G**lobal $\\to$ **B**uilt-in.
> - Functions can **read** global variables without declaration.
> - Functions need **\`global x\`** to **modify/reassign** a global variable.
> - Nested functions need **\`nonlocal x\`** to modify an outer enclosing variable.
> - Assigning anywhere in a function makes that variable local throughout that entire function!

> [!NOTE] **DEV BRAIN:**
> In professional software engineering, relying heavily on \`global\` variables is considered an anti-pattern because it creates hidden dependencies and state mutations. Prefer passing values as parameters and returning modified results!

> [!WARNING] **TRAP:**
> \`nonlocal\` can only target variables in an **enclosing function**. Using \`nonlocal\` on a variable that only exists in the global module scope causes a \`SyntaxError: no binding for nonlocal 'x' found\`!

> [!TIP] **EXAM TIP:**
> When asked about the LEGB rule in an exam, draw the 4 concentric circles diagram. Show an arrow pointing from the innermost circle (Local) outwards to Enclosing, Global, and Built-in.`,
          shortNotes: "LEGB: Local -> Enclosing -> Global -> Built-in. Reading globals is free; modifying globals requires 'global x'. Nested inner functions use 'nonlocal x'.",
          examples: [
            {
              title: "Demonstration of LEGB Lookup, global, and nonlocal Keywords",
              problem: "Write a Python script demonstrating the LEGB resolution order, modifying global state with global, and closures with nonlocal.",
              explanation: "Illustrate scope hierarchy and state persistence in nested closures using nonlocal.",
              code: `# 1. Global Variable and the global keyword
active_users = 0

def user_login():
    global active_users
    active_users += 1

user_login()
user_login()
print(f"Active Users (via global): {active_users}")

# 2. Nested Functions and the nonlocal keyword (Closure)
def make_counter(start=0):
    count = start  # Enclosing scope variable
    
    def step():
        nonlocal count  # Rebinds enclosing 'count'
        count += 1
        return count
        
    return step

counter_a = make_counter(10)
print("Counter A step 1:", counter_a()) # 11
print("Counter A step 2:", counter_a()) # 12

counter_b = make_counter(100)
print("Counter B step 1:", counter_b()) # 101 (Isolated closure state!)`,
              output: "Active Users (via global): 2\nCounter A step 1: 11\nCounter A step 2: 12\nCounter B step 1: 101"
            },
          ],
          keyPoints: [
            "Variable scope defines the accessibility region of an identifier; lifetime defines its memory duration.",
            "LEGB dictates the search order: Local -> Enclosing -> Global -> Built-in.",
            "Global variables can be read without declaration, but rebinding requires the global keyword.",
            "The nonlocal keyword permits nested inner functions to rebind enclosing function variables.",
            "UnboundLocalError occurs when a variable is referenced before its local assignment in the same scope."
          ],
          theoryQuestions: [
            {
              question: "Explain the LEGB rule for variable scope resolution in Python with a comprehensive diagram and code examples. Differentiate between global and nonlocal keywords.",
              marks: "5 Marks",
              answer: "The LEGB rule defines Python's lookup hierarchy when resolving variable names:\n1. L (Local): Defined inside the current function/method.\n2. E (Enclosing): Defined in the enclosing scope of nested functions (closures).\n3. G (Global): Defined at the top-level of the current module file.\n4. B (Built-in): Reserved built-in names pre-loaded by Python (len, print, range).\n\nDifference between global and nonlocal:\n- `global x`: Declares that variable `x` resides at the top-level module scope, allowing a function to rebind that module-level variable.\n- `nonlocal x`: Declares that variable `x` resides in the nearest enclosing function's scope, bypassing the local scope without making it global.",
              keyPoints: ["Detailed explanation of LEGB components (L, E, G, B)", "Lookup search path and failure resulting in NameError", "Role and syntax of the global keyword", "Role and syntax of the nonlocal keyword in nested functions"]
            },
            {
              question: "What causes an UnboundLocalError in Python? Explain with a sample code snippet and show how to fix it.",
              marks: "3 Marks",
              answer: "An `UnboundLocalError` occurs when a function references a variable that Python has classified as local, before any value has been assigned to it locally.\n\nCode causing error:\n```python\nx = 10\ndef foo():\n    print(x) # Raises UnboundLocalError!\n    x = 20\n```\nCause: Because `x = 20` exists inside `foo()`, Python marks `x` as a local variable for the entire function at compile time. Thus, `print(x)` looks for a local `x` which hasn't been assigned yet.\nFix: Add `global x` at the top of `foo()` if modifying the global, or pass `x` as a parameter.",
              keyPoints: ["Definition of UnboundLocalError", "Compile-time local variable classification", "Illustrative code snippet and resolution"]
            },
          ],
          mcqs: [
            {
              question: "In what order does Python search for variables according to the LEGB rule?",
              options: ["Global -> Enclosing -> Local -> Built-in", "Local -> Enclosing -> Global -> Built-in", "Local -> Global -> Enclosing -> Built-in", "Built-in -> Global -> Enclosing -> Local"],
              correctIndex: 1,
              explanation: "Python strictly searches in the order: Local (L), Enclosing (E), Global (G), and Built-in (B)."
            },
            {
              question: "Which keyword allows an inner nested function to modify a variable in its enclosing outer function?",
              options: ["global", "nonlocal", "outer", "super"],
              correctIndex: 1,
              explanation: "The 'nonlocal' keyword allows a nested inner function to modify a variable belonging to an outer enclosing function."
            },
            {
              question: "What exception is raised when referencing a variable that exists nowhere in the LEGB scopes?",
              options: ["ValueError", "TypeError", "NameError", "AttributeError"],
              correctIndex: 2,
              explanation: "If an identifier cannot be found in Local, Enclosing, Global, or Built-in scopes, Python raises a NameError."
            },
          ]
        },
        {
          id: "py1-u5-t4",
          title: "Recursion Mechanics (Call Stack, Base Case, Factorial, Fibonacci, GCD)",
          simpleExplanation: "Recursion is like Russian nesting dolls: a function solves a problem by calling a smaller copy of itself over and over again. Every recursive function MUST have a stopping rule called the 'Base Case'\u2014otherwise, it will call itself forever until the computer runs out of memory and crashes with a RecursionError!",
          detailedExplanation: `## 1. What is Recursion?

**Recursion** is a programming technique where a function solves a computational problem by **calling itself directly or indirectly** with progressively smaller inputs of the same problem.

### The Two Mandatory Pillars of Every Recursive Function:
1. **The Base Case (Stopping Condition):** The simplest possible instance of the problem that can be answered immediately without making another recursive call. Without a base case, the function will recurse infinitely.
2. **The Recursive Case (Inductive Step):** The rule that reduces the current problem into one or more smaller subproblems, moving strictly closer towards the base case.

\`\`\`mermaid
flowchart TD
    Call["fact(3)"] --> C2["3 * fact(2)"]
    C2 --> C1["2 * fact(1)"]
    C1 --> C0["1 * fact(0)"]
    C0 -->|Base Case hit: returns 1| R0["Return 1"]
    R0 -->|Unwinds: 1 * 1| R1["Return 1"]
    R1 -->|Unwinds: 2 * 1| R2["Return 2"]
    R2 -->|Unwinds: 3 * 2| R3["Final Result: 6"]
\`\`\`

---

## 2. Call Stack Mechanics & Stack Frames

Every time a function is called in Python, the operating system allocates a block of memory called a **Stack Frame (Activation Record)** on the **Call Stack**.
- The stack frame stores local variables, parameters, and the return address.
- In recursion, each nested call pushes a **new stack frame** on top of the call stack.
- When the Base Case is reached, the stack begins to **unwind**: stack frames are popped one by one in Last-In, First-Out (LIFO) order, returning values back to their callers.

### Recursion Limit in Python:
To prevent stack overflow and system crashes due to runaway recursion, Python sets a default recursion limit of **1000 stack frames**:
\`\`\`python
import sys
print(sys.getrecursionlimit())  # Typically 1000
# sys.setrecursionlimit(5000)   # Can be adjusted if necessary
\`\`\`
*Exceeding this limit raises \`RecursionError: maximum recursion depth exceeded\`.*

---

## 3. Classic Exam Implementations

### Problem 1: Factorial of a Number ($N!$)
- **Mathematical Definition:**
  $$N! = \\begin{cases} 1 & \\text{if } N = 0 \\text{ or } N = 1 \\text{ (Base Case)} \\\\ N \\times (N-1)! & \\text{if } N > 1 \\text{ (Recursive Case)} \\end{cases}$$

\`\`\`python
def factorial(n: int) -> int:
    # 1. Base Case
    if n <= 1:
        return 1
    # 2. Recursive Case
    return n * factorial(n - 1)
\`\`\`

---

### Problem 2: Fibonacci Sequence
- **Mathematical Definition:**
  $$F(0) = 0, \\quad F(1) = 1$$
  $$F(n) = F(n-1) + F(n-2) \\quad \\text{for } n \\ge 2$$

\`\`\`python
def fibonacci(n: int) -> int:
    # Base Cases
    if n <= 0:
        return 0
    elif n == 1:
        return 1
    # Recursive Case
    return fibonacci(n - 1) + fibonacci(n - 2)
\`\`\`

#### The Recursion Tree for \`fibonacci(4)\`:
Notice how the naive recursive Fibonacci has exponential time complexity $O(2^n)$ because it recomputes identical branches:
\`\`\`text
                 fib(4)
               /        \\
           fib(3)        fib(2)
          /      \\       /     \\
       fib(2)  fib(1)  fib(1)  fib(0)
      /      \\
   fib(1)  fib(0)
\`\`\`

---

### Problem 3: Greatest Common Divisor (Euclid's Algorithm)
- **Mathematical Rule:** $\\gcd(a, b) = \\gcd(b, a \\bmod b)$, with base case $\\gcd(a, 0) = a$.

\`\`\`python
def gcd(a: int, b: int) -> int:
    # Base Case
    if b == 0:
        return a
    # Recursive Case
    return gcd(b, a % b)
\`\`\`

---

## 4. Recursion vs Iteration Comparison

| Dimension | Recursion | Iteration (\`while\` / \`for\`) |
| :--- | :--- | :--- |
| **Basic Mechanism** | Function repeatedly calls itself | Repetition using loop constructs |
| **Termination** | Reaching the Base Case | Loop condition evaluates to False |
| **Memory Overhead** | High (creates new stack frame per call, $O(n)$ space) | Low ($O(1)$ space, reuses same memory variables) |
| **Execution Speed** | Slower (function call overhead, stack pushing/popping) | Faster (direct register/variable updates) |
| **Code Elegance** | Very clean and intuitive for divide-and-conquer (trees) | Can require complex manual stack management |
| **Risk** | \`RecursionError\` (Stack Overflow) | Infinite loop freezes |

> [!IMPORTANT] **MEMORIZE:**
> - Every recursive function **must have a Base Case** to terminate.
> - Recursion uses the **Call Stack (LIFO)**.
> - Default Python recursion limit is **1000** (\`sys.getrecursionlimit()\`).
> - Factorial formula: \`n * factorial(n - 1)\`.
> - GCD Euclidean formula: \`gcd(b, a % b)\` with base \`b == 0: return a\`.

> [!NOTE] **DEV BRAIN:**
> In data structures (Semester 3), tree traversals (In-order, Pre-order, Post-order) and graph algorithms (DFS) are written almost exclusively using recursion because their hierarchical nature maps directly to the call stack!

> [!WARNING] **TRAP:**
> Forgetting the base case or failing to reduce the argument (\`return factorial(n)\`) causes an immediate crash with \`RecursionError: maximum recursion depth exceeded while calling a Python object\`.

> [!TIP] **EXAM TIP:**
> When asked to trace a recursive function in an exam, draw the Call Stack frames as physical rectangular boxes stacked on top of each other. Show them pushing upwards until the base case is reached, and then show arrows unwinding downwards with the returned values!`,
          shortNotes: "Recursion: function calling itself. Requires Base Case (stops recursion) and Recursive Step (reduces problem). Uses Call Stack (LIFO). Limit: 1000 frames.",
          examples: [
            {
              title: "Recursive Factorial, Fibonacci, and GCD with Call Stack Tracing",
              problem: "Write a complete Python script implementing recursive Factorial, Fibonacci, and Euclidean GCD with trace printing.",
              explanation: "Demonstrate base cases, recursive unwinding, and output validation for classic algorithms.",
              code: `# 1. Factorial with print tracing
def factorial_trace(n: int, depth: int = 0) -> int:
    indent = "  " * depth
    print(f"{indent}--> factorial({n}) called")
    if n <= 1:
        print(f"{indent}<-- Base case reached! Returning 1")
        return 1
    result = n * factorial_trace(n - 1, depth + 1)
    print(f"{indent}<-- Returning {n} * fact({n-1}) = {result}")
    return result

print("=== Tracing factorial(3) ===")
fact_3 = factorial_trace(3)
print(f"Final factorial(3): {fact_3}\\n")

# 2. Euclidean GCD
def gcd_recursive(a: int, b: int) -> int:
    if b == 0:
        return a
    return gcd_recursive(b, a % b)

print("GCD of 54 and 24:", gcd_recursive(54, 24))`,
              output: "=== Tracing factorial(3) ===\n--> factorial(3) called\n  --> factorial(2) called\n    --> factorial(1) called\n    <-- Base case reached! Returning 1\n  <-- Returning 2 * fact(1) = 2\n<-- Returning 3 * fact(2) = 6\nFinal factorial(3): 6\n\nGCD of 54 and 24: 6"
            },
          ],
          keyPoints: [
            "Recursion is a programming technique where a function calls itself to solve smaller subproblems.",
            "Every recursive function requires a base case to stop and a recursive step to reduce problem size.",
            "The system call stack pushes activation records (stack frames) for each call and pops them in LIFO order upon unwinding.",
            "Python's default recursion limit is 1000, configurable via sys.setrecursionlimit().",
            "Euclidean GCD algorithm relies on the identity gcd(a, b) = gcd(b, a % b) with base case b == 0.",
            "Recursion provides high mathematical clarity but incurs memory overhead compared to iteration."
          ],
          theoryQuestions: [
            {
              question: "What is Recursion? Explain how the Call Stack manages recursive function calls with an activation frame diagram for factorial(3).",
              marks: "5 Marks",
              answer: "Recursion is a technique where a function calls itself to solve smaller instances of the same problem.\n\nCall Stack Mechanics:\n1. Each function call creates an Activation Record (Stack Frame) on the call stack containing parameters, local variables, and return address.\n2. When `factorial(3)` is called, Frame 1 is pushed.\n3. `factorial(3)` calls `factorial(2)` -> Frame 2 is pushed.\n4. `factorial(2)` calls `factorial(1)` -> Frame 3 is pushed.\n5. Frame 3 hits the Base Case (`n <= 1`), returning 1.\n6. Stack unwinds: Frame 3 is popped, Frame 2 computes `2 * 1 = 2` and is popped, Frame 1 computes `3 * 2 = 6` and is popped, returning the final answer 6.",
              keyPoints: ["Definition of recursion", "Role of call stack and activation records", "Step-by-step push sequence for factorial(3)", "Base case termination and LIFO unwinding"]
            },
            {
              question: "Differentiate between Recursion and Iteration across five technical parameters.",
              marks: "5 Marks",
              answer: "1. Definition: Recursion involves a function calling itself; Iteration involves executing a loop construct (`for`/`while`).\n2. Termination: Recursion terminates when a Base Case is reached; Iteration terminates when the loop condition evaluates to False.\n3. Memory Overhead: Recursion consumes $O(n)$ auxiliary stack memory due to pushing stack frames; Iteration uses $O(1)$ constant memory.\n4. Speed: Recursion is slower due to function call overhead and stack manipulation; Iteration executes faster.\n5. Failure Mode: Unchecked recursion causes a `RecursionError` (Stack Overflow); Unchecked iteration results in an infinite loop.",
              keyPoints: ["Definition differences", "Termination conditions", "Memory consumption (Stack O(n) vs O(1))", "Execution speed differences", "Failure modes (Stack overflow vs infinite loop)"]
            },
          ],
          mcqs: [
            {
              question: "What error is raised in Python when a recursive function fails to reach a base case?",
              options: ["MemoryError", "RecursionError", "StackOverflowError", "InfiniteLoopError"],
              correctIndex: 1,
              explanation: "Python raises a RecursionError: maximum recursion depth exceeded when the recursion limit is breached."
            },
            {
              question: "What is the default recursion depth limit in standard Python 3?",
              options: ["100", "500", "1000", "Unlimited"],
              correctIndex: 2,
              explanation: "Python's default recursion limit is 1000 stack frames (viewable via sys.getrecursionlimit())."
            },
            {
              question: "Which data structure is internally used by the system runtime to manage recursive function calls?",
              options: ["Queue", "Stack", "Binary Tree", "Hash Table"],
              correctIndex: 1,
              explanation: "The runtime system uses the Call Stack (LIFO - Last In First Out) to allocate and unwind function frames."
            },
          ]
        },
        {
          id: "py1-u5-t5",
          title: "File Handling: Modes (r, w, a, r+), reading line by line, writing, and safe 'with open()' context manager",
          simpleExplanation: "When your Python script stops running, all its variables in RAM vanish! File handling lets you save data permanently onto your hard drive into text files (.txt, .csv) and read it back later. The 'with open()' statement is Python's gold standard: it automatically closes and locks up your file even if your code crashes halfway through.",
          detailedExplanation: `## 1. Why Persistent File Handling is Necessary

Variables, lists, and dictionaries in Python reside in **Volatile Memory (RAM)**. As soon as the Python program terminates or the computer powers off, all in-memory data is permanently lost.

**File Handling** enables applications to read and write persistent data stored on non-volatile secondary storage devices (hard drives, SSDs).

### The Three Steps of File I/O:
1. **Open** the file using the built-in \`open()\` function, which creates a file stream object and requests an OS file descriptor.
2. **Process** the file by reading from or writing to the stream.
3. **Close** the file to flush memory buffers and release operating system locks.

---

## 2. File Access Modes Explained

The \`open(filename, mode='r')\` function accepts a mode parameter that defines the access permissions and pointer location:

\`\`\`mermaid
flowchart TD
    Modes["File Access Modes"] --> R["'r' Mode (Read)\\nMust exist\\nPointer at start"]
    Modes --> W["'w' Mode (Write)\\nOverwrites existing file\\nCreates if missing"]
    Modes --> A["'a' Mode (Append)\\nPreserves existing data\\nPointer at end"]
    Modes --> RP["'r+' Mode (Read/Write)\\nUpdates without truncate\\nPointer at start"]
\`\`\`

### Complete File Modes Reference Table:

| Mode | Technical Action | Creates if Missing? | Truncates (Overwrites) Data? | Initial File Pointer Position |
| :--- | :--- | :---: | :---: | :--- |
| **\`'r'\`** | Read only (Default mode) | **No** (Raises \`FileNotFoundError\`) | No | Beginning of file |
| **\`'w'\`** | Write only | **Yes** | **Yes (Erases all existing contents!)** | Beginning of file |
| **\`'a'\`** | Append only | **Yes** | No (Appends to the end) | End of file |
| **\`'r+'\`**| Read and Write | **No** (Raises \`FileNotFoundError\`) | No | Beginning of file |
| **\`'w+'\`**| Write and Read | **Yes** | **Yes (Overwrites existing file!)** | Beginning of file |
| **\`'a+'\`**| Append and Read | **Yes** | No | End of file |
| **\`'b'\`** | Binary mode (e.g. \`'rb'\`, \`'wb'\`) | - | - | For images, audio, PDFs |

---

## 3. Reading from Files in Python

Python provides multiple methods for reading data:

### A. \`f.read(size=-1)\`
Reads the entire file into a single string. If \`size\` is specified, reads up to \`size\` bytes/characters:
\`\`\`python
with open("notes.txt", "r") as f:
    content = f.read()
    print(content)
\`\`\`

### B. \`f.readline()\`
Reads a single line from the file up to the newline character \`\\n\`:
\`\`\`python
with open("notes.txt", "r") as f:
    first_line = f.readline()
\`\`\`

### C. \`f.readlines()\`
Reads the entire file and returns a **list of strings**, where each string is a line from the file:
\`\`\`python
with open("notes.txt", "r") as f:
    lines = f.readlines() # ['Line 1\\n', 'Line 2\\n', ...]
\`\`\`

### D. Iterating Over File Object Directly (The Gold Standard!):
To read huge multi-gigabyte log files without exhausting RAM, iterate directly over the file handle. Python reads line-by-line lazily on demand:
\`\`\`python
with open("massive_log.txt", "r") as f:
    for line_number, line in enumerate(f, start=1):
        if "ERROR" in line:
            print(f"Error on line {line_number}: {line.strip()}")
\`\`\`

---

## 4. Writing to Files

- \`f.write(string)\`: Writes a string to the file stream. *Note: \`write()\` does NOT automatically append a newline \`\\n\`; you must include it explicitly!*
- \`f.writelines(list_of_strings)\`: Writes a sequence of strings to the file stream without adding newlines between them.

\`\`\`python
lines_to_write = ["Alpha\\n", "Beta\\n", "Gamma\\n"]
with open("greek.txt", "w") as f:
    f.writelines(lines_to_write)
\`\`\`

---

## 5. File Pointer Control: \`tell()\` and \`seek()\`

- **\`f.tell()\`:** Returns the current byte offset position of the file pointer.
- **\`f.seek(offset, whence=0)\`:** Moves the file pointer to a new position:
  - \`whence=0\`: Relative to beginning of file (default).
  - \`whence=1\`: Relative to current pointer position.
  - \`whence=2\`: Relative to end of file.

\`\`\`python
with open("data.txt", "r") as f:
    print("Initial pointer:", f.tell()) # 0
    f.read(5)
    print("Pointer after 5 bytes:", f.tell()) # 5
    f.seek(0) # Rewind pointer back to start
    print("Pointer after rewind:", f.tell()) # 0
\`\`\`

---

## 6. The \`with open()\` Context Manager: Why It is Mandatory

In legacy Python code, files were opened and closed manually:
\`\`\`python
# The Risky Legacy Pattern:
f = open("data.txt", "r")
data = f.read()
# IF AN EXCEPTION OCCURS HERE, f.close() IS NEVER REACHED!
f.close()
\`\`\`
If an exception occurs during reading, \`f.close()\` is skipped, leaving the file descriptor locked by the operating system and causing memory leaks!

### The Modern Pythonic Solution:
The **\`with\` statement** invokes Python's **Context Manager Protocol** (\`__enter__\` and \`__exit__\`):
\`\`\`python
with open("data.txt", "r") as f:
    data = f.read()
# Automatically closed here, guaranteed!
\`\`\`
- Guarantees that the file is **closed automatically**, even if unhandled exceptions crash the program!
- Eliminates manual \`f.close()\` boilerplate calls.

> [!IMPORTANT] **MEMORIZE:**
> - \`'r'\` requires file to exist; \`'w'\` overwrites existing content; \`'a'\` appends to end.
> - Always use **\`with open(...) as f:\`** context manager to guarantee automatic file closure.
> - \`f.write()\` does NOT append newlines automatically—you must add \`\\n\`.
> - \`tell()\` returns pointer location; \`seek(0)\` rewinds to beginning.
> - Iterating \`for line in f:\` is the most memory-efficient way to process large files.

> [!NOTE] **DEV BRAIN:**
> When handling files in web backends, always explicitly specify the character encoding: \`with open("data.txt", "r", encoding="utf-8") as f:\`. This prevents bizarre character corruption when deploying across Windows (cp1252) and Linux (UTF-8) servers!

> [!WARNING] **TRAP:**
> Opening a file with mode \`'w'\` (\`open("grades.txt", "w")\`) will **IMMEDIATELY truncate the file to zero bytes**, erasing all previous data before you even call \`write()\`! If you want to add data without deleting existing lines, ALWAYS use append mode \`'a'\`!

> [!TIP] **EXAM TIP:**
> When asked to count lines, words, and characters in a file in a practical exam, write a clean \`with open()\` loop that updates three counters: lines with \`for line in f:\`, words with \`len(line.split())\`, and chars with \`len(line)\`.`,
          shortNotes: "Files: 'r' (read), 'w' (overwrite), 'a' (append), 'r+' (read/write). Always use 'with open() as f:' to guarantee automatic closing. seek(0) rewinds pointer.",
          examples: [
            {
              title: "Complete File I/O: Writing, Reading, and Line/Word Counting",
              problem: "Write a Python script demonstrating writing lines with 'with open()', appending new data, and reading the file to count total lines, words, and characters.",
              explanation: "Demonstrate with open context manager for both writing and reading, and analyze file metrics.",
              code: `# 1. Writing data safely with 'w' mode
with open("demo_notes.txt", "w") as f:
    f.write("Python Programming 101\\n")
    f.write("File handling is simple and robust.\\n")

# 2. Appending data with 'a' mode
with open("demo_notes.txt", "a") as f:
    f.write("Always use context managers!\\n")

# 3. Reading and computing metrics
total_lines = 0
total_words = 0
total_chars = 0

with open("demo_notes.txt", "r") as f:
    for line in f:
        total_lines += 1
        total_words += len(line.split())
        total_chars += len(line)

print(f"File Analysis:")
print(f"  Lines: {total_lines}")
print(f"  Words: {total_words}")
print(f"  Characters: {total_chars}")`,
              output: "File Analysis:\n  Lines: 3\n  Words: 12\n  Characters: 92"
            },
          ],
          keyPoints: [
            "File handling provides persistent storage on non-volatile secondary storage.",
            "Access modes: 'r' (read), 'w' (write/truncate), 'a' (append), 'r+' (read and write).",
            "The with open() context manager ensures guaranteed automatic file closure, even upon runtime exceptions.",
            "f.read() reads entire file, f.readline() reads single line, while for line in f: iterates with low memory overhead.",
            "f.tell() reports the current byte pointer position; f.seek(offset) repositions the pointer."
          ],
          theoryQuestions: [
            {
              question: "Explain file access modes in Python. What is the advantage of using the 'with open()' statement over traditional open() and close()?",
              marks: "5 Marks",
              answer: "File Access Modes:\n1. 'r': Read-only. File must exist; pointer set at start.\n2. 'w': Write-only. Creates file if missing; TRUNCATES (erases) existing content.\n3. 'a': Append. Creates file if missing; writes exclusively to the end of the file.\n4. 'r+': Read and write. File must exist; does not truncate existing content.\n\nAdvantage of 'with open()':\nTraditional `open()` requires explicit `f.close()`. If an exception occurs during reading/writing, `f.close()` is never executed, causing file resource leaks and file locking.\nThe `with open()` statement implements the Context Manager Protocol (`__enter__` and `__exit__`). It guarantees that the file stream is cleanly and automatically closed as soon as execution leaves the `with` block, even if an unhandled exception or crash occurs.",
              keyPoints: ["Characteristics of modes 'r', 'w', 'a', 'r+'", "Risk of legacy open() and missed f.close()", "Role of with statement and Context Manager Protocol", "Automatic resource cleanup guarantee"]
            },
            {
              question: "Explain the role of tell() and seek() methods in Python file handling with a code example.",
              marks: "3 Marks",
              answer: "1. `f.tell()`: Returns an integer giving the file pointer's current byte position within the file stream.\n2. `f.seek(offset, whence=0)`: Changes the file pointer position to `offset` bytes from a reference point defined by `whence` (0 = file start, 1 = current pos, 2 = file end).\n\nExample:\n```python\nwith open('data.txt', 'r') as f:\n    data = f.read(10) # Reads 10 bytes\n    pos = f.tell()    # pos is 10\n    f.seek(0)         # Rewinds file pointer back to the beginning\n```",
              keyPoints: ["tell() reports byte offset", "seek() repositions file pointer", "Code snippet illustrating read, tell, and seek(0)"]
            },
          ],
          mcqs: [
            {
              question: "What happens if you open an existing file in 'w' mode?",
              options: ["New data is appended to the end of the file", "The existing contents are completely erased (truncated to 0 bytes)", "A FileExistsError is raised", "The file is opened in read-only mode"],
              correctIndex: 1,
              explanation: "Opening in 'w' mode immediately truncates the file, deleting all previous contents before writing begins."
            },
            {
              question: "What is the primary benefit of using 'with open(...) as f:' in Python?",
              options: ["It makes file reading execute 10 times faster", "It guarantees the file will be closed automatically even if errors occur", "It automatically encrypts the file contents", "It prevents files from being modified by other users"],
              correctIndex: 1,
              explanation: "The 'with' statement guarantees automatic closure of the file resource via context manager __exit__, even if exceptions occur."
            },
            {
              question: "Which method is used to reposition the file read/write pointer to the beginning of the file?",
              options: ["f.rewind()", "f.reset()", "f.seek(0)", "f.tell(0)"],
              correctIndex: 2,
              explanation: "f.seek(0) moves the file stream pointer to byte offset 0 (the beginning of the file)."
            },
          ]
        },
      ]
    },
  ]
};
