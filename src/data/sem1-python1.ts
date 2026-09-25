import type { Subject } from './types';

export const sem1Python1Subject: Subject = {
  id: 'sem1-python1',
  name: 'Python Programming 1',
  code: 'PY101',
  color: 'bg-emerald-600',
  icon: 'code',
  description: 'Foundational Python 1 — Problem Solving, Syntax, Operators, Control Flow, Lists, Tuples, Dictionaries, and Functions',
  semester: 1,
  units: [
    {
      id: 'py1-u1',
      title: 'Unit 1: Programming Fundamentals & Logic Design',
      description: 'Problem-solving methodology, algorithms, flowcharts, pseudocode, and Python execution architecture.',
      topics: [
        {
          id: 'py1-t1',
          title: 'Algorithms, Flowcharts & Problem Solving Techniques',
          simpleExplanation: 'An algorithm is a step-by-step recipe to solve a computational problem. A flowchart is a visual diagram of that recipe using standard geometric shapes.',
          detailedExplanation: `### Problem Solving in Computer Science

Before writing code in any programming language, software engineers formulate the problem using formal logic tools:

1. **Algorithm**: A finite, unambiguous sequence of steps designed to perform a specific task.
   - **Characteristics**: Input, Output, Definiteness, Finiteness, Effectiveness.
2. **Flowchart**: Standardized graphical representation:
   - **Oval (Terminal)**: Start / End
   - **Parallelogram**: Input / Output operations (\`read x\`, \`print y\`)
   - **Rectangle**: Processing & arithmetic computation (\`sum = a + b\`)
   - **Diamond**: Decision making & condition branching (\`is x > 0?\`)
   - **Circle**: Connector between flow paths
   - **Flow lines (Arrows)**: Sequence of instruction execution

> [!TIP] **EXAM TIP:**
> In university exams, when asked to write an algorithm for finding the largest of 3 numbers, always include both the step-by-step numbered algorithm AND the corresponding flowchart with proper diamond decision symbols to secure full marks.

> [!NOTE] **DEV BRAIN:**
> Think of an algorithm as a cooking recipe. If you say "bake until done" without specifying temperature and time, it's ambiguous. A computer needs exact unambiguous rules like \`while temperature < 180: heat()\`.`,
          shortNotes: 'Algorithm = step-by-step logic. Flowchart = graphical blueprint. Terminal (Oval), Process (Rectangle), Decision (Diamond), I/O (Parallelogram).',
          examples: [
            {
              title: 'Algorithm to Find the Largest of Three Numbers',
              problem: 'Design an algorithm to find the maximum among three numbers A, B, and C.',
              explanation: 'Compare A with B and C sequentially using conditional steps.',
              code: `Step 1: Start
Step 2: Read values of A, B, and C
Step 3: If A >= B and A >= C, then Max = A
Step 4: Else if B >= C, then Max = B
Step 5: Else Max = C
Step 6: Print Max
Step 7: Stop`,
              output: 'Input: 15, 42, 28 -> Max: 42'
            }
          ],
          keyPoints: [
            'Algorithms must guarantee termination after finite steps.',
            'Flowcharts use ISO standard symbols (Oval, Parallelogram, Rectangle, Diamond).',
            'Pseudocode is an informal, language-agnostic textual outline of an algorithm.',
            'Desk checking / dry running with sample inputs catches logic bugs before coding.'
          ],
          mcqs: [
            {
              question: 'Which geometric symbol represents a decision or condition in a flowchart?',
              options: ['Rectangle', 'Diamond', 'Parallelogram', 'Oval'],
              correctIndex: 1,
              explanation: 'A diamond represents conditional branching with two or more output paths (True/False).'
            },
            {
              question: 'Which of the following is NOT an essential property of an algorithm?',
              options: ['Finiteness', 'Definiteness', 'Infinite Execution', 'Effectiveness'],
              correctIndex: 2,
              explanation: 'An algorithm must always terminate after a finite number of steps.'
            }
          ],
          theoryQuestions: [
            {
              question: 'Differentiate between an Algorithm, Pseudocode, and a Flowchart with examples.',
              marks: '5 Marks',
              answer: 'An Algorithm is a step-by-step logic sequence in plain English. A Flowchart is its graphical depiction using standardized shapes. Pseudocode is structured text resembling code without strict syntax rules.'
            }
          ]
        },
        {
          id: 'py1-t2',
          title: 'Python Architecture: Compiler vs Interpreter & Virtual Machine',
          simpleExplanation: 'Python code is first compiled into intermediate bytecode (.pyc), which is then interpreted line-by-line by the Python Virtual Machine (PVM).',
          detailedExplanation: `### How Python Executes Your Code

Unlike pure compiled languages (C/C++) or pure interpreters (early BASIC), Python uses a **two-stage hybrid execution model**:

1. **Source Code (\`.py\`)**: Human-readable text written by the developer.
2. **Bytecode Compilation (\`.pyc\`)**:
   - The Python compiler checks syntax and converts \`.py\` into compact, platform-independent byte instructions known as **Bytecode**.
   - Stored in the \`__pycache__\` directory to accelerate repeated module imports.
3. **Python Virtual Machine (PVM)**:
   - The runtime engine that reads each bytecode instruction and translates it into native machine code (CPU opcodes) on the fly.

\`\`\`
   +----------------+     Compiler     +----------------+       PVM        +-----------------+
   |  script.py     | -------------->  |  Bytecode      | -------------->  | CPU Execution   |
   |  (Source Code) |                  |  (script.pyc)  |                  | (Native Opcodes)|
   +----------------+                  +----------------+                  +-----------------+
\`\`\`

> [!IMPORTANT] **MEMORIZE:**
> - **Compiler**: Translates entire program before execution (fast runtime, slower build).
> - **Interpreter**: Translates instructions on-the-fly during execution (slower execution, rapid debugging).
> - Python is an **interpreted language with pre-compiled bytecode execution**.`,
          shortNotes: 'Python compiles .py to .pyc bytecode, then PVM interprets bytecode into machine instructions.',
          examples: [
            {
              title: 'Checking Python Bytecode with dis module',
              problem: 'Inspect the bytecode generated for a simple addition function.',
              explanation: 'The standard library module `dis` disassembles Python functions into PVM bytecode instructions.',
              code: `import dis

def add(a, b):
    return a + b

dis.dis(add)`,
              output: `  2           0 LOAD_FAST                0 (a)
              2 LOAD_FAST                1 (b)
              4 BINARY_ADD
              6 RETURN_VALUE`
            }
          ],
          keyPoints: [
            'Python source code (.py) is compiled to platform-independent bytecode (.pyc).',
            'PVM (Python Virtual Machine) is the interpreter that executes bytecode instructions.',
            'CPython is the reference C implementation of Python; others include PyPy, Jython, and IronPython.',
            'Garbage collection in Python is handled automatically via Reference Counting and a generational cyclic GC.'
          ],
          mcqs: [
            {
              question: 'What is the intermediate file generated by Python before running code on the PVM?',
              options: ['.exe file', 'Machine code', 'Bytecode (.pyc)', 'Assembly code'],
              correctIndex: 2,
              explanation: 'Python compiles source code into intermediate bytecode instructions (.pyc) for the PVM.'
            }
          ]
        }
      ]
    },
    {
      id: 'py1-u2',
      title: 'Unit 2: Python Syntax, Tokens & Operators',
      description: 'Variables, dynamic typing, numeric and string literals, type casting, and complete operator hierarchy.',
      topics: [
        {
          id: 'py1-t3',
          title: 'Tokens, Variables & Dynamic Typing in Python',
          simpleExplanation: 'Tokens are the smallest building blocks of Python code (keywords, identifiers, literals, operators). Variables are named references pointing to objects in memory.',
          detailedExplanation: `### Python Tokens & Memory Model

A Python token is the smallest lexical unit recognized by the parser:
1. **Keywords**: Reserved words with fixed semantics (\`def\`, \`class\`, \`if\`, \`import\`, \`lambda\`, \`True\`, \`None\`). Python 3.12 has 35 keywords.
2. **Identifiers**: User-defined names for variables, functions, and classes.
   - Rules: Must start with a letter (A-Z, a-z) or underscore (\`_\`). Cannot start with a digit. Case-sensitive. Cannot be a keyword.
3. **Literals**: Constant values assigned to variables:
   - Integer: \`42\`, \`0b1010\` (binary), \`0x2A\` (hex)
   - Float: \`3.14\`, \`1.5e-3\`
   - String: \`'single'\`, \`"double"\`, \`'''triple multi-line'''\`
   - Boolean: \`True\`, \`False\`
   - Special: \`None\`

### Dynamic Typing & Everything is an Object
In Python, variables do **not** have types; **objects have types**. A variable is simply a reference tag attached to an object in heap memory:

\`\`\`python
x = 10       # x refers to an int object 10
x = "Hello"  # x now refers to a str object 'Hello' (no type declaration needed)
\`\`\`

> [!WARNING] **TRAP:**
> In Python, \`x = y = [1, 2]\` assigns BOTH variables to the *same* mutable list in memory. Modifying \`x.append(3)\` will also change \`y\`!`,
          shortNotes: 'Python is dynamically typed. Variables are references to objects. Keywords are reserved. Identifiers follow alphanumeric rules.',
          examples: [
            {
              title: 'Checking Types and Memory Identity',
              problem: 'Demonstrate type deduction and the id() memory address in Python.',
              explanation: 'Use type() to inspect object type and id() to view the unique memory address.',
              code: `val = 100
print(type(val))  # <class 'int'>
print(id(val))    # memory address

val = 3.14159
print(type(val))  # <class 'float'>`,
              output: `<class 'int'>\n140723145829280\n<class 'float'>`
            }
          ],
          keyPoints: [
            'Python is strongly and dynamically typed.',
            'Variable names cannot start with a digit and cannot use hyphens or spaces.',
            'id() returns memory identity; is checks identity, == checks value equality.',
            'Type casting can be implicit (int + float -> float) or explicit (int("25")).'
          ],
          mcqs: [
            {
              question: 'Which of the following is an invalid identifier in Python?',
              options: ['_my_var', 'var_2', '2nd_val', 'valTwo'],
              correctIndex: 2,
              explanation: 'Identifiers cannot start with a number (2nd_val is invalid).'
            }
          ]
        },
        {
          id: 'py1-t4',
          title: 'Complete Operator Hierarchy & Precedence',
          simpleExplanation: 'Operators perform computations on operands. Python supports arithmetic, comparison, logical, bitwise, assignment, identity (is), and membership (in) operators.',
          detailedExplanation: `### Categories of Python Operators

1. **Arithmetic**: \`+\`, \`-\`, \`*\`, \`/\` (float division), \`//\` (floor integer division), \`%\` (modulus), \`**\` (exponentiation).
2. **Comparison / Relational**: \`==\`, \`!=\`, \`>\`, \`<\`, \`>=\`, \`<=\`.
3. **Logical**: \`and\`, \`or\`, \`not\` (short-circuit evaluation).
4. **Bitwise**: \`&\` (AND), \`|\` (OR), \`^\` (XOR), \`~\` (NOT), \`<<\` (Left Shift), \`>>\` (Right Shift).
5. **Membership**: \`in\`, \`not in\` (checks presence in sequences like lists, strings, tuples).
6. **Identity**: \`is\`, \`is not\` (checks whether two references point to the identical memory address).

### Operator Precedence (Highest to Lowest):
1. Parentheses: \`()\`
2. Exponentiation: \`**\`
3. Unary plus, minus, bitwise NOT: \`+x\`, \`-x\`, \`~x\`
4. Multiplication, division, floor division, modulus: \`*\`, \`/\`, \`//\`, \`%\`
5. Addition, subtraction: \`+\`, \`-\`
6. Bitwise shifts: \`<<\`, \`>>\`
7. Bitwise AND: \`&\`
8. Bitwise XOR, OR: \`^\`, \`|\`
9. Comparisons, identity, membership: \`==\`, \`!=\`, \`<\`, \`>\`, \`is\`, \`in\`
10. Logical NOT: \`not\`
11. Logical AND: \`and\`
12. Logical OR: \`or\`

> [!TIP] **EXAM TIP:**
> Remember the difference between \`/\` and \`//\`. In Python 3, \`7 / 2\` produces \`3.5\` (float), whereas \`7 // 2\` produces \`3\` (integer floor division).`,
          shortNotes: 'Precedence: () -> ** -> *,/,//,% -> +,- -> comparisons -> not -> and -> or. / gives float, // gives floor integer.',
          examples: [
            {
              title: 'Floor Division and Modulus Comparison',
              problem: 'Show the difference between float division, floor division, and negative floor division.',
              explanation: 'Floor division rounds down towards negative infinity.',
              code: `print(7 / 2)    # 3.5
print(7 // 2)   # 3
print(-7 // 2)  # -4 (floor rounds DOWN)
print(7 % 2)    # 1`,
              output: `3.5\n3\n-4\n1`
            }
          ],
          keyPoints: [
            'Python 3 division (/) always returns a float.',
            'Floor division (//) rounds down towards negative infinity (e.g. -7//2 is -4).',
            'is checks memory identity, whereas == checks value equivalence.',
            'Logical operators (and, or) utilize short-circuit evaluation.'
          ],
          mcqs: [
            {
              question: 'What is the output of -11 // 3 in Python?',
              options: ['-3', '-4', '-3.66', '3'],
              correctIndex: 1,
              explanation: '-11 / 3 is -3.6667. Floor division rounds down to the next lower integer, which is -4.'
            }
          ]
        }
      ]
    },
    {
      id: 'py1-u3',
      title: 'Unit 3: Control Flow & Decision Making',
      description: 'Conditional branching, iterative loops (for, while), loop control statements, and nested patterns.',
      topics: [
        {
          id: 'py1-t5',
          title: 'Conditional Branching: if, if-else, if-elif-else',
          simpleExplanation: 'Conditionals allow your program to take different paths depending on whether a boolean expression evaluates to True or False. Python uses strict indentation instead of curly braces.',
          detailedExplanation: `### Decision Making in Python

Python relies on **4-space indentation** to denote blocks of code.

\`\`\`python
if condition_1:
    # executed if condition_1 is True
elif condition_2:
    # executed if condition_1 is False and condition_2 is True
else:
    # executed if all previous conditions are False
\`\`\`

### Ternary Conditional Expression (Inline if-else):
Python supports single-line conditional assignments:
\`\`\`python
status = "Adult" if age >= 18 else "Minor"
\`\`\`

> [!WARNING] **TRAP:**
> Beware of the "truthiness" of values in Python:
> - **Falsy values**: \`False\`, \`0\`, \`0.0\`, \`""\` (empty string), \`[]\` (empty list), \`()\` (empty tuple), \`{}\` (empty dict), \`None\`.
> - All non-zero numbers and non-empty containers are **Truthy**.`,
          shortNotes: 'Python uses indentation for blocks. elif is short for else if. Empty containers and 0 are falsy.',
          examples: [
            {
              title: 'Student Grade Classifier',
              problem: 'Classify student percentage into university grades (Distinction, First Class, Pass, Fail).',
              explanation: 'Check conditions from highest to lowest grade thresholds.',
              code: `marks = 82

if marks >= 75:
    grade = "Distinction"
elif marks >= 60:
    grade = "First Class"
elif marks >= 40:
    grade = "Pass Class"
else:
    grade = "Fail"

print(f"Grade: {grade}")`,
              output: 'Grade: Distinction'
            }
          ],
          keyPoints: [
            'Python blocks are determined by indentation (standard is 4 spaces, never mix tabs and spaces).',
            'elif replaces the else if construct found in C/Java.',
            'Ternary syntax: value_if_true if condition else value_if_false.',
            'None, 0, empty sequences and mappings evaluate to False in boolean context.'
          ],
          mcqs: [
            {
              question: 'Which of the following evaluates to False in a Python if statement?',
              options: ['[0]', '" "', '[]', '-1'],
              correctIndex: 2,
              explanation: 'An empty list [] is falsy. [0] is a non-empty list and " " is a non-empty string, both truthy.'
            }
          ]
        },
        {
          id: 'py1-t6',
          title: 'Iterative Loops: while, for, range(), and Loop Controls',
          simpleExplanation: 'Loops repeat code multiple times. while runs as long as a condition holds; for iterates over sequences using the range() generator. break, continue, and pass control loop flow.',
          detailedExplanation: `### Loops in Python

1. **while loop**: Repeats execution as long as the test condition remains True.
\`\`\`python
count = 0
while count < 5:
    print(count)
    count += 1
\`\`\`

2. **for loop with range()**:
   \`range(start, stop, step)\` generates integers from \`start\` up to \`stop - 1\`:
   - \`range(5)\` -> 0, 1, 2, 3, 4
   - \`range(1, 10, 2)\` -> 1, 3, 5, 7, 9
   - \`range(5, 0, -1)\` -> 5, 4, 3, 2, 1

3. **Loop Control Statements**:
   - \`break\`: Immediately terminates the innermost loop.
   - \`continue\`: Skips the rest of the current iteration and jumps to the next.
   - \`pass\`: A null statement used as a placeholder where syntax requires code.

### Python Loop else Clause
Python loops feature an optional \`else\` block that runs **only if the loop finishes naturally without encountering a break statement**.

\`\`\`python
for n in range(2, 10):
    for x in range(2, n):
        if n % x == 0:
            break
    else:
        print(f"{n} is prime")
\`\`\``,
          shortNotes: 'for iterates over range() or collections. while checks condition. break exits, continue skips, pass is no-op. else runs if no break occurred.',
          examples: [
            {
              title: 'Prime Number Verification with for-else',
              problem: 'Check if a number is prime using the unique loop-else construct.',
              explanation: 'If a factor is found, break. If the loop completes without break, the else clause executes.',
              code: `num = 29
for i in range(2, int(num ** 0.5) + 1):
    if num % i == 0:
        print(f"{num} is composite")
        break
else:
    print(f"{num} is prime")`,
              output: '29 is prime'
            }
          ],
          keyPoints: [
            'range(start, stop, step) excludes the stop boundary.',
            'break aborts the loop entirely; continue skips to the next iteration.',
            'The loop else clause runs only when the loop terminates without a break.',
            'pass serves as an empty code block placeholder.'
          ],
          mcqs: [
            {
              question: 'When does the else block attached to a for loop execute in Python?',
              options: [
                'Every time an iteration completes',
                'Only when the loop is terminated by a break',
                'Only when the loop finishes all iterations without encountering a break',
                'Never'
              ],
              correctIndex: 2,
              explanation: 'A loop else block runs only if the loop terminates normally without hitting a break statement.'
            }
          ]
        },
        {
          id: 'py1-t6b',
          title: 'Nested Loops: Star Patterns, Number Triangles & Floyd Triangle',
          simpleExplanation: 'Nested loops place one loop inside another. The outer loop controls rows, while the inner loop controls columns and characters printed on each row.',
          detailedExplanation: `### Structure of Nested Loops

A nested loop has an outer loop and one or more inner loops:
\`\`\`python
for i in range(rows):         # Outer loop: controls rows
    for j in range(cols):     # Inner loop: controls columns
        print(char, end="")
    print()                   # Moves cursor to the next line
\`\`\`

### 1. Right-Angled Star Triangle:
\`\`\`python
n = 5
for i in range(1, n + 1):
    for j in range(i):
        print("* ", end="")
    print()
\`\`\`
*Output:*
\`\`\`
* 
* * 
* * * 
* * * * 
* * * * * 
\`\`\`

### 2. Inverted Right Triangle:
\`\`\`python
n = 5
for i in range(n, 0, -1):
    for j in range(i):
        print("* ", end="")
    print()
\`\`\`

### 3. Centered Pyramid Pattern:
\`\`\`python
n = 5
for i in range(1, n + 1):
    # Print leading spaces
    print(" " * (n - i), end="")
    # Print stars
    print("* " * i)
\`\`\`

### 4. Floyd's Number Triangle:
A triangle of consecutive integers starting from 1:
\`\`\`python
n = 4
num = 1
for i in range(1, n + 1):
    for j in range(i):
        print(f"{num:2d} ", end="")
        num += 1
    print()
\`\`\`
*Output:*
\`\`\`
 1 
 2  3 
 4  5  6 
 7  8  9 10 
\`\`\`

> [!TIP] **EXAM TIP:**
> When asked to print pyramid patterns in paper exams, write down the grid coordinates $(i, j)$ and notice:
> - Spaces on row $i$: $n - i$
> - Stars / Numbers on row $i$: $2i - 1$ (for connected pyramids) or $i$ (for space-separated pyramids).
> Always remember \`end=""\` inside the inner loop and an empty \`print()\` in the outer loop!`,
          shortNotes: 'Outer loop controls rows; inner loop controls columns. Use print(..., end="") to stay on same line and print() for line break.',
          examples: [
            {
              title: "Floyd's Number Triangle Generator",
              problem: "Generate Floyd's Triangle up to 4 rows.",
              explanation: "Track consecutive numbers across inner loop iterations.",
              code: `rows = 4
current = 1
for r in range(1, rows + 1):
    for c in range(r):
        print(current, end=" ")
        current += 1
    print()`,
              output: "1 \n2 3 \n4 5 6 \n7 8 9 10 "
            }
          ],
          keyPoints: [
            'Outer loop executes once per row; inner loop executes multiple times per row.',
            'Total iterations of inner loop in a triangular pattern of size N is N*(N+1)/2.',
            'print(val, end="") suppresses the default newline in Python.',
            'Floyds triangle uses a single continuous counter across all rows.'
          ],
          mcqs: [
            {
              question: 'How many times does the inner print execute for a triangle with N = 4 rows (1 to N)?',
              options: ['4', '16', '10', '8'],
              correctIndex: 2,
              explanation: 'Sum of 1 + 2 + 3 + 4 = 10 times (Formula: N*(N+1)/2 = 4*5/2 = 10).'
            }
          ]
        }
      ]
    },
    {
      id: 'py1-u4',
      title: 'Unit 4: Core Collections & String Processing',
      description: 'Lists, list comprehension, immutable tuples, dictionaries, sets, and string manipulation.',
      topics: [
        {
          id: 'py1-t7',
          title: 'Lists & List Comprehensions',
          simpleExplanation: 'Lists are ordered, mutable collections of items. List comprehension provides a clean, fast one-line syntax to transform or filter lists.',
          detailedExplanation: `### Python Lists

Lists are dynamic arrays that can hold mixed data types:
\`\`\`python
nums = [10, 20, 30, 40, 50]
nums.append(60)       # Add to end: [10, 20, 30, 40, 50, 60]
nums.insert(1, 15)    # Insert at index 1
nums.pop()            # Removes and returns last element (60)
nums.remove(20)       # Removes first occurrence of 20
\`\`\`

### Slicing Syntax: \`list[start:stop:step]\`
- \`nums[1:4]\` -> elements from index 1 up to 3
- \`nums[::-1]\` -> reverses the list in O(N) time

### List Comprehension:
A concise, readable, and faster alternative to traditional loops:
\`\`\`python
# [expression for item in iterable if condition]
squares = [x**2 for x in range(1, 6)]           # [1, 4, 9, 16, 25]
evens = [x for x in range(10) if x % 2 == 0]    # [0, 2, 4, 6, 8]
\`\`\`

> [!TIP] **EXAM TIP:**
> List comprehension is frequently asked in 3-mark theory questions: "Convert the following for-loop with conditional append into a single-line list comprehension."`,
          shortNotes: 'Lists are mutable. Slicing: [start:stop:step]. List comprehension: [expr for x in iterable if cond].',
          examples: [
            {
              title: 'Filter & Square Odd Numbers',
              problem: 'Given a list of numbers, create a new list containing squares of only the odd numbers.',
              explanation: 'Use list comprehension with an if filter.',
              code: `numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
odd_squares = [x**2 for x in numbers if x % 2 != 0]
print(odd_squares)`,
              output: '[1, 9, 25, 49, 81]'
            }
          ],
          keyPoints: [
            'Lists are mutable, ordered, and allow duplicate values.',
            'Negative indexing accesses elements from the end (-1 is the last item).',
            'List comprehension is executed at C speed and is more concise than standard loops.',
            'Common methods: append, extend, insert, remove, pop, sort, reverse.'
          ],
          mcqs: [
            {
              question: 'What is the output of [x * 2 for x in range(4)]?',
              options: ['[0, 2, 4, 6]', '[2, 4, 6, 8]', '[0, 1, 2, 3]', '[0, 2, 4]'],
              correctIndex: 0,
              explanation: 'range(4) produces 0, 1, 2, 3. Multiplying each by 2 yields [0, 2, 4, 6].'
            }
          ]
        },
        {
          id: 'py1-t8',
          title: 'Tuples, Dictionaries & Sets in Python',
          simpleExplanation: 'Tuples are immutable lists (read-only). Dictionaries store key-value pairs with O(1) hash lookup. Sets store unique, unordered elements.',
          detailedExplanation: `### Tuples (Immutable Sequences)
Created using parentheses \`()\` or comma separation:
\`\`\`python
point = (10, 20)
# point[0] = 15  -> TypeError: 'tuple' object does not support item assignment
x, y = point    # Tuple unpacking
\`\`\`
- **Why use tuples?** Integrity protection (cannot be accidentally altered), faster iteration, and can be used as dictionary keys (because they are hashable).

### Dictionaries (Key-Value Hash Maps)
Keys must be immutable (strings, numbers, tuples) and unique:
\`\`\`python
student = {"roll": 101, "name": "Aarav", "gpa": 9.2}
print(student["name"])             # "Aarav"
print(student.get("dept", "CSE"))  # "CSE" (safe lookup with default)
student["city"] = "Vadodara"       # Insert or update
\`\`\`

### Sets (Unique Unordered Collections)
\`\`\`python
s1 = {1, 2, 3, 4}
s2 = {3, 4, 5, 6}
print(s1 | s2)   # Union: {1, 2, 3, 4, 5, 6}
print(s1 & s2)   # Intersection: {3, 4}
print(s1 - s2)   # Difference: {1, 2}
\`\`\``,
          shortNotes: 'Tuple = immutable list (). Dict = key-value map {k: v}. Set = unique unordered elements {}.',
          examples: [
            {
              title: 'Word Frequency Counter Using Dictionary',
              problem: 'Count occurrences of each word in a string using a Python dictionary.',
              explanation: 'Iterate over words and update dictionary counts using dict.get().',
              code: `text = "python is fun and python is powerful"
words = text.split()
counts = {}
for w in words:
    counts[w] = counts.get(w, 0) + 1
print(counts)`,
              output: "{'python': 2, 'is': 2, 'fun': 1, 'and': 1, 'powerful': 1}"
            }
          ],
          keyPoints: [
            'Tuples are immutable; single-element tuples require a trailing comma e.g. (42,).',
            'Dictionary keys must be hashable (immutable) types.',
            'dict.get(key, default) avoids throwing KeyError on missing keys.',
            'Sets automatically eliminate duplicate elements.'
          ],
          mcqs: [
            {
              question: 'Which of the following CANNOT be used as a dictionary key in Python?',
              options: ['Integer', 'String', 'Tuple of integers', 'List of integers'],
              correctIndex: 3,
              explanation: 'Lists are mutable and unhashable, so they cannot be used as dictionary keys.'
            }
          ]
        }
      ]
    },
    {
      id: 'py1-u5',
      title: 'Unit 5: Functions, Scope & Modular Code',
      description: 'Function definition, argument variations (*args, **kwargs), variable scope rules, lambda functions, and modules.',
      topics: [
        {
          id: 'py1-t9',
          title: 'Functions: Parameters, Return Values & *args / **kwargs',
          simpleExplanation: 'Functions are reusable blocks of code that take inputs, perform operations, and return outputs. *args accepts variable positional arguments as a tuple, while **kwargs accepts variable keyword arguments as a dictionary.',
          detailedExplanation: `### Defining Functions in Python

\`\`\`python
def greet(name, greeting="Hello"):
    """Docstring explaining the function."""
    return f"{greeting}, {name}!"
\`\`\`

### Argument Types:
1. **Positional Arguments**: Assigned based on their order.
2. **Keyword Arguments**: Passed explicitly by name (\`greet(greeting="Hi", name="Rahul")\`).
3. **Default Arguments**: Provide fallback values if not supplied by the caller.
4. **Arbitrary Positional (\`*args\`)**: Bundles extra positional arguments into a \`tuple\`.
5. **Arbitrary Keyword (\`**kwargs\`)**: Bundles extra named arguments into a \`dict\`.

\`\`\`python
def full_logger(msg, *args, **kwargs):
    print("Message:", msg)
    print("Additional Args:", args)      # Tuple
    print("Named Config:", kwargs)       # Dictionary
\`\`\`

### Lambda (Anonymous) Functions:
Short, one-line throwaway functions:
\`\`\`python
square = lambda x: x * x
print(square(5))  # 25
\`\`\``,
          shortNotes: 'def creates functions. *args collects tuple of positional args. **kwargs collects dict of keyword args. lambda creates inline functions.',
          examples: [
            {
              title: 'Flexible Calculator Using *args',
              problem: 'Write a function that calculates the sum of any number of passed arguments.',
              explanation: 'Use *args to iterate over an arbitrary number of inputs.',
              code: `def total_sum(*numbers):
    total = 0
    for n in numbers:
        total += n
    return total

print(total_sum(10, 20, 30))
print(total_sum(5, 15, 25, 35, 45))`,
              output: `60\n125`
            }
          ],
          keyPoints: [
            '*args receives variable positional arguments as a tuple.',
            '**kwargs receives variable keyword arguments as a dictionary.',
            'Default argument values are evaluated once when the function is defined (avoid mutable defaults like []).',
            'Lambda functions can only contain a single expression.'
          ],
          mcqs: [
            {
              question: 'In Python, what data type is *args inside a function?',
              options: ['List', 'Tuple', 'Dictionary', 'Set'],
              correctIndex: 1,
              explanation: '*args packs variable positional arguments into a tuple.'
            }
          ]
        },
        {
          id: 'py1-t10',
          title: 'Variable Scope Rules (LEGB) & Built-in Modules',
          simpleExplanation: 'Scope defines where a variable can be seen and used. Python resolves variable names using the LEGB rule: Local -> Enclosing -> Global -> Built-in.',
          detailedExplanation: `### The LEGB Scope Resolution Rule

When a variable name is referenced in Python, the interpreter searches in this precise sequence:
1. **L — Local**: Names assigned inside the current function.
2. **E — Enclosing**: Names defined in the local scope of any enclosing/outer functions (closures).
3. **G — Global**: Names defined at the top-level of the script/module or declared with the \`global\` keyword.
4. **B — Built-in**: Names pre-assigned in Python's \`builtins\` module (\`print\`, \`len\`, \`range\`, \`int\`).

\`\`\`python
x = "Global"

def outer():
    x = "Enclosing"
    def inner():
        nonlocal x   # Modifies the enclosing variable
        x = "Modified Enclosing"
    inner()
    print(x)  # Prints: Modified Enclosing
\`\`\`

### Python Modules
A module is simply a Python file containing functions and variables.
- Standard modules: \`math\`, \`random\`, \`datetime\`, \`sys\`, \`os\`.
- \`import math\` -> \`math.sqrt(16)\`
- \`from math import pi, pow\` -> \`pow(2, 3)\``,
          shortNotes: 'LEGB: Local -> Enclosing -> Global -> Built-in. Use global to write to module scope, nonlocal for enclosing functions.',
          examples: [
            {
              title: 'Random Number Generator and Math Functions',
              problem: 'Use math and random modules to simulate a dice roll and compute hypotenuse.',
              explanation: 'Demonstrate module imports and function calls.',
              code: `import math
import random

# Hypotenuse: sqrt(3^2 + 4^2) = 5
hyp = math.hypot(3, 4)
print("Hypotenuse:", hyp)

# Simulated dice roll between 1 and 6
dice = random.randint(1, 6)
print("Dice roll is valid (1-6):", 1 <= dice <= 6)`,
              output: `Hypotenuse: 5.0\nDice roll is valid (1-6): True`
            }
          ],
          keyPoints: [
            'LEGB defines the variable search order in Python.',
            'global keyword allows modifying a module-level variable inside a function.',
            'nonlocal keyword allows modifying an enclosing function variable in nested functions.',
            'Modules are imported using import module_name or from module_name import func.'
          ],
          mcqs: [
            {
              question: 'In Python scope resolution (LEGB), what does "E" stand for?',
              options: ['External', 'Enclosing', 'Execution', 'Environment'],
              correctIndex: 1,
              explanation: 'LEGB stands for Local, Enclosing, Global, Built-in.'
            }
          ]
        },
        {
          id: 'py1-t11',
          title: 'Recursion, Call Stack Mechanics & File Handling (I/O)',
          simpleExplanation: 'Recursion is when a function calls itself to solve smaller instances of the same problem until a base condition is hit. File handling allows programs to read from and write data to disk persistently.',
          detailedExplanation: `### 1. Recursion & The Call Stack

Every recursive function MUST have two parts:
1. **Base Case**: The termination condition that returns a value without further recursive calls (prevents infinite recursion and \`RecursionError: maximum recursion depth exceeded\`).
2. **Recursive Step**: The function calling itself with a strictly smaller sub-problem approaching the base case.

#### Factorial Function: $n! = n \\times (n-1)!$
\`\`\`python
def factorial(n):
    if n <= 1:           # Base case
        return 1
    return n * factorial(n - 1)  # Recursive step
\`\`\`

#### Fibonacci Sequence: $F(n) = F(n-1) + F(n-2)$
\`\`\`python
def fibonacci(n):
    if n <= 0: return 0
    if n == 1: return 1
    return fibonacci(n - 1) + fibonacci(n - 2)
\`\`\`

### 2. File Handling in Python

Files store data persistently on secondary storage. Python provides the built-in \`open()\` function:
\`\`\`python
file_object = open(filename, mode)
\`\`\`

#### Access Modes:
- \`'r'\`: Read mode (default). Raises \`FileNotFoundError\` if file does not exist.
- \`'w'\`: Write mode. Overwrites existing contents or creates a new file.
- \`'a'\`: Append mode. Writes data at the end of the file without erasing contents.
- \`'r+'\`: Read and Write mode.
- \`'b'\`: Binary mode (e.g., \`'rb'\`, \`'wb'\` for images/audio).

#### Safe File Handling: The \`with\` Context Manager
The \`with\` statement automatically closes the file even if exceptions occur during execution:
\`\`\`python
# Writing to a file
with open("students.txt", "w") as f:
    f.write("Rahul Sharma, CSE, 8.8\\n")
    f.write("Ananya Patel, IT, 9.2\\n")

# Reading line by line
with open("students.txt", "r") as f:
    for line in f:
        print(line.strip())
\`\`\`

> [!WARNING] **TRAP:**
> Never forget to close files when not using \`with\`! An unclosed file can lead to resource leaks and incomplete buffered writes. Always prefer \`with open(...) as f:\`.`,
          shortNotes: 'Recursion requires base case + recursive step. File modes: r (read), w (write/truncate), a (append). with open() guarantees automatic file closing.',
          examples: [
            {
              title: 'Recursive Sum of Digits & File Logger',
              problem: 'Compute sum of digits recursively and write result to a text log.',
              explanation: 'Base case: single digit returns itself. Recursive step: n % 10 + sum_digits(n // 10).',
              code: `def sum_digits(n):
    if n < 10:
        return n
    return (n % 10) + sum_digits(n // 10)

result = sum_digits(12345)  # 1+2+3+4+5 = 15
print("Sum of digits:", result)

# Write to log
with open("log.txt", "w") as f:
    f.write(f"Computation result: {result}\\n")

with open("log.txt", "r") as f:
    print("File Content:", f.read().strip())`,
              output: "Sum of digits: 15\nFile Content: Computation result: 15"
            }
          ],
          keyPoints: [
            'Recursion must have a base case to avoid RecursionError.',
            'Default Python recursion limit is 1000 (configurable via sys.setrecursionlimit).',
            'with open(...) as f automatically calls f.close() upon exiting the block.',
            'read() reads entire file, readline() reads one line, readlines() returns list of lines.'
          ],
          mcqs: [
            {
              question: 'Which file mode opens a file for writing without truncating/deleting existing data?',
              options: ["'r'", "'w'", "'a'", "'x'"],
              correctIndex: 2,
              explanation: "Mode 'a' (append) positions the file pointer at the end of the file, preserving existing content."
            },
            {
              question: 'What error occurs if a recursive function never reaches its base case in Python?',
              options: ['ZeroDivisionError', 'RecursionError', 'MemoryError', 'TypeError'],
              correctIndex: 1,
              explanation: 'Python throws a RecursionError: maximum recursion depth exceeded.'
            }
          ]
        }
      ]
    }
  ]
};
