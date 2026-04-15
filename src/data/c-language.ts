import type { Subject } from "./types";

export const cLanguageSubject: Subject = {
  id: "c-lang",
  name: "C Language",
  code: "CL",
  color: "199 89% 48%",
  icon: "{ }",
  description: "Complete C Programming — Syntax, Data Types, Operators, Control Flow, Functions, Arrays, Pointers, Structures",
  semester: 1,
  units: [
    {
      id: "c-u1",
      title: "Unit 1: C Fundamentals",
      description: "Program structure, data types, variables, operators, control flow",
      topics: [
        {
          id: "c-t1",
          title: "Structure of a C Program",
          simpleExplanation: "Every C program follows a fixed structure: preprocessor directives at top, then the main() function which is where execution begins. Think of it like a recipe — you list ingredients first (headers), then follow steps (statements) in the main cooking area (main function).",
          detailedExplanation: `C is a general-purpose, procedural language created by Dennis Ritchie at Bell Labs in 1972. Every C program follows a structured format:

1. **Preprocessor Directives** — Lines starting with #, processed before compilation. \`#include\` pulls in library headers (like importing modules in Python).

2. **main() function** — The entry point of every C program. Execution always starts here. It returns an integer to the operating system.

3. **Statements** — Instructions that end with a semicolon (;). Each statement performs one action.

4. **Return statement** — \`return 0;\` tells the OS the program ran successfully. Non-zero values indicate errors.

**Compilation Pipeline:**
Source Code (.c) → Preprocessor → Compiler → Object Code (.o) → Linker → Executable (.exe)

The preprocessor handles #include and #define directives. The compiler translates C code to machine-level object code. The linker combines object files with library code to create the final executable.`,
          examples: [
            { title: "Hello World Program", problem: "Write the simplest C program that displays a message.", explanation: "#include <stdio.h> includes the Standard I/O library for printf. main() is the entry point. printf outputs text. \\n creates a new line.", code: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    printf("Welcome to C Programming\\n");
    return 0;
}`, output: `Hello, World!
Welcome to C Programming` },
            { title: "Program with Comments and Variables", problem: "Create a program that uses comments, variables, and formatted output.", explanation: "Comments explain code. Variables store data. printf with format specifiers (%d, %s) displays variable values.", code: `#include <stdio.h>

/* This is a multi-line comment
   It explains the program */

int main() {
    // Single line comment
    int age = 20;
    float cgpa = 8.5;
    char grade = 'A';

    printf("Age: %d\\n", age);
    printf("CGPA: %.1f\\n", cgpa);
    printf("Grade: %c\\n", grade);

    return 0;  // Success
}`, output: `Age: 20
CGPA: 8.5
Grade: A` }
          ],
          keyPoints: [
            "Every C program must have a main() function — execution starts here",
            "#include <stdio.h> includes the Standard I/O library (printf, scanf)",
            "Statements end with semicolons (;)",
            "return 0 indicates successful program termination",
            "C is compiled, not interpreted — code must be compiled before running",
            "// for single-line comments, /* */ for multi-line comments"
          ],
          mcqs: [
            { question: "Which function is the entry point of every C program?", options: ["start()", "begin()", "main()", "run()"], correctIndex: 2, explanation: "Every C program must have a main() function — execution always begins there." },
            { question: "What does #include <stdio.h> do?", options: ["Defines main function", "Includes Standard I/O header", "Allocates memory", "Links the program"], correctIndex: 1, explanation: "stdio.h is the Standard I/O Header that provides printf() and scanf()." },
            { question: "What does return 0 in main() indicate?", options: ["Program failed", "Program exited mid-way", "Successful termination", "Memory was freed"], correctIndex: 2, explanation: "By convention, return 0 signals successful program termination to the OS." },
            { question: "Which step converts .c source code to machine code?", options: ["Linker", "Loader", "Compiler", "Preprocessor"], correctIndex: 2, explanation: "The compiler translates C source code into object code. The linker then creates the final executable." },
            { question: "What character ends every C statement?", options: ["Colon (:)", "Period (.)", "Semicolon (;)", "Comma (,)"], correctIndex: 2, explanation: "Every statement in C must end with a semicolon (;). Forgetting it causes a compilation error." }
          ]
        },
        {
          id: "c-t2",
          title: "Data Types, Variables & Constants",
          simpleExplanation: "Variables are named containers that store data. Data types tell the computer how much memory to reserve and what kind of data to expect — integer, decimal, character, etc. Constants are variables whose values cannot be changed once set.",
          detailedExplanation: `A **variable** is a named memory location. A **data type** tells the compiler the size and interpretation of stored bits.

**Primary Data Types:**
| Type | Size | Range | Format |
|------|------|-------|--------|
| int | 4 bytes | ±2.1 billion | %d |
| float | 4 bytes | ~7 significant digits | %f |
| double | 8 bytes | ~15 significant digits | %lf |
| char | 1 byte | Single character (ASCII) | %c |

**Constants** are fixed values:
- \`const int MAX = 100;\` — Cannot be reassigned
- \`#define PI 3.14159\` — Preprocessor constant (no type, no semicolon)

**Format Specifiers for printf/scanf:**
%d → int, %f → float, %lf → double (scanf), %c → char, %s → string

**scanf() requires & (address-of operator)** for all types except strings.`,
          examples: [
            { title: "Using Different Data Types", problem: "Declare variables of each type and display them.", explanation: "Each data type has a specific format specifier for input/output.", code: `#include <stdio.h>

int main() {
    int age = 20;
    float cgpa = 9.5f;
    double pi = 3.14159265;
    char grade = 'A';
    const int MAX = 100;

    printf("Age: %d\\n", age);
    printf("CGPA: %.1f\\n", cgpa);
    printf("Pi: %.5lf\\n", pi);
    printf("Grade: %c\\n", grade);
    printf("Max: %d\\n", MAX);

    // sizeof operator
    printf("\\nSize of int: %lu bytes\\n", sizeof(int));
    printf("Size of float: %lu bytes\\n", sizeof(float));
    printf("Size of char: %lu bytes\\n", sizeof(char));

    return 0;
}`, output: `Age: 20
CGPA: 9.5
Pi: 3.14159
Grade: A
Max: 100

Size of int: 4 bytes
Size of float: 4 bytes
Size of char: 1 byte` },
            { title: "User Input with scanf", problem: "Read values from the user and perform calculations.", explanation: "scanf reads input. & gives the memory address where the value should be stored.", code: `#include <stdio.h>

int main() {
    int num1, num2;
    float result;

    printf("Enter two numbers: ");
    scanf("%d %d", &num1, &num2);

    result = (float)num1 / num2;  // Type casting

    printf("%d + %d = %d\\n", num1, num2, num1 + num2);
    printf("%d / %d = %.2f\\n", num1, num2, result);

    return 0;
}`, output: `Enter two numbers: 10 3
10 + 3 = 13
10 / 3 = 3.33` }
          ],
          keyPoints: [
            "int (4 bytes), float (4 bytes), double (8 bytes), char (1 byte)",
            "Variables must be declared with a type before use",
            "const makes a variable read-only; #define creates preprocessor constants",
            "scanf requires & before variable names (except strings)",
            "sizeof() returns the size of a type in bytes",
            "Type casting: (float)num converts int to float"
          ],
          mcqs: [
            { question: "What is the size of int on a 32-bit system?", options: ["1 byte", "2 bytes", "4 bytes", "8 bytes"], correctIndex: 2, explanation: "int occupies 4 bytes (32 bits), giving a range of about ±2.1 billion." },
            { question: "Which format specifier is used for double in scanf?", options: ["%f", "%d", "%lf", "%g"], correctIndex: 2, explanation: "In scanf, %lf is used for double. In printf, %f works for both float and double." },
            { question: "What keyword declares a constant in C?", options: ["static", "const", "final", "fixed"], correctIndex: 1, explanation: "const makes a variable read-only. E.g., const int MAX = 100; cannot be modified." },
            { question: "How many bytes does char occupy?", options: ["4 bytes", "2 bytes", "8 bytes", "1 byte"], correctIndex: 3, explanation: "char is 1 byte (8 bits) and stores a single character as its ASCII value." },
            { question: "Why does scanf need & before variables?", options: ["To print the value", "To provide memory address", "To declare type", "To initialize value"], correctIndex: 1, explanation: "& gives scanf the memory address where it should store the input value." }
          ]
        },
        {
          id: "c-t3",
          title: "Operators",
          simpleExplanation: "Operators are symbols that perform operations on values. Arithmetic operators do math (+, -, *), relational operators compare values (>, <, ==), logical operators combine conditions (&&, ||), and bitwise operators work on individual bits.",
          detailedExplanation: `**Arithmetic:** + - * / % ++ --
- Integer division truncates: 7/2 = 3 (not 3.5)
- % gives remainder: 7%2 = 1
- Pre-increment (++x): increment first, then use
- Post-increment (x++): use first, then increment

**Relational:** > < >= <= == !=
- Return 1 (true) or 0 (false)
- ⚠️ == is equality test; = is assignment

**Logical:** && (AND), || (OR), ! (NOT)
- Short-circuit evaluation applies

**Bitwise:** & | ^ ~ << >>
- & = bit-AND, | = bit-OR, ^ = XOR, ~ = NOT
- << shifts left (multiply by 2), >> shifts right (divide by 2)`,
          examples: [
            { title: "All Operator Types", problem: "Demonstrate each category of operators.", explanation: "Each operator type serves a different purpose — math, comparison, logic, or bit manipulation.", code: `#include <stdio.h>

int main() {
    int a = 10, b = 3;

    // Arithmetic
    printf("Arithmetic:\\n");
    printf("  %d + %d = %d\\n", a, b, a+b);
    printf("  %d / %d = %d\\n", a, b, a/b);
    printf("  %d %% %d = %d\\n", a, b, a%b);

    // Pre vs Post increment
    int x = 5;
    printf("\\nIncrement:\\n");
    printf("  x++ = %d (x is now %d)\\n", x++, x);

    // Relational
    printf("\\nRelational:\\n");
    printf("  10 > 3: %d\\n", 10 > 3);
    printf("  10 == 3: %d\\n", 10 == 3);

    // Logical
    printf("\\nLogical:\\n");
    printf("  (10>5) && (3<5): %d\\n", (10>5) && (3<5));

    // Bitwise
    printf("\\nBitwise:\\n");
    printf("  5 & 3 = %d\\n", 5 & 3);
    printf("  5 << 1 = %d\\n", 5 << 1);

    return 0;
}`, output: `Arithmetic:
  10 + 3 = 13
  10 / 3 = 3
  10 % 3 = 1

Increment:
  x++ = 5 (x is now 6)

Relational:
  10 > 3: 1
  10 == 3: 0

Logical:
  (10>5) && (3<5): 1

Bitwise:
  5 & 3 = 1
  5 << 1 = 10` }
          ],
          keyPoints: [
            "Integer division truncates: 7/2 = 3, not 3.5",
            "% (modulus) gives the remainder of division",
            "++x (pre): increment then use. x++ (post): use then increment",
            "== checks equality; = assigns value — don't confuse them!",
            "&& is logical AND; || is logical OR; ! is NOT",
            "<< shifts bits left (×2); >> shifts bits right (÷2)"
          ],
          mcqs: [
            { question: "What is 7 / 2 in C (integer division)?", options: ["3.5", "3", "4", "3.0"], correctIndex: 1, explanation: "Integer division truncates the decimal part. 7/2 = 3, not 3.5." },
            { question: "What does ++ before a variable do?", options: ["Doubles it", "Increments after use", "Increments before use", "Does nothing"], correctIndex: 2, explanation: "Pre-increment (++x) increments first, then uses the value." },
            { question: "What does 5 << 1 equal?", options: ["2", "5", "10", "25"], correctIndex: 2, explanation: "Left shift by 1 multiplies by 2. Binary: 101 becomes 1010 = 10." },
            { question: "What's the difference between = and ==?", options: ["No difference", "= assigns, == compares", "= compares, == assigns", "Both compare"], correctIndex: 1, explanation: "= is assignment (x = 5). == is equality comparison (x == 5)." },
            { question: "What does 10 % 3 return?", options: ["3", "1", "0", "3.33"], correctIndex: 1, explanation: "% returns the remainder. 10 ÷ 3 = 3 remainder 1." }
          ]
        },
        {
          id: "c-t4",
          title: "Control Flow — if/else, switch, Loops",
          simpleExplanation: "Control flow decides WHICH code runs and HOW MANY TIMES. if/else makes decisions (like a fork in the road), switch handles multiple options (like a menu), and loops repeat code (for, while, do-while).",
          detailedExplanation: `**Decision Making:**
- \`if\` — Execute block if condition is true
- \`if-else\` — Two paths based on condition
- \`else if\` — Multiple conditions in sequence
- \`switch\` — Select one of many blocks based on a value

**Loops (Iteration):**
- \`for\` — When you know how many times to repeat
- \`while\` — Repeat while condition is true (may not execute at all)
- \`do-while\` — Execute at least once, then check condition

**Loop Control:**
- \`break\` — Exit loop immediately
- \`continue\` — Skip rest of current iteration, go to next

**Nested structures:** You can put if inside loops, loops inside if, loops inside loops.`,
          examples: [
            { title: "Grade Calculator", problem: "Use if-else to determine grade from marks.", explanation: "Multiple conditions are checked in sequence. First true condition executes its block.", code: `#include <stdio.h>

int main() {
    int marks = 85;

    if (marks >= 90) {
        printf("Grade: A+\\n");
    } else if (marks >= 80) {
        printf("Grade: A\\n");
    } else if (marks >= 70) {
        printf("Grade: B\\n");
    } else if (marks >= 60) {
        printf("Grade: C\\n");
    } else {
        printf("Grade: F (Fail)\\n");
    }

    // Loops
    printf("\\nCounting 1 to 5: ");
    for (int i = 1; i <= 5; i++) {
        printf("%d ", i);
    }

    printf("\\n\\nMultiplication table of 5:\\n");
    int n = 5, i = 1;
    while (i <= 10) {
        printf("  %d x %d = %d\\n", n, i, n*i);
        i++;
    }

    return 0;
}`, output: `Grade: A

Counting 1 to 5: 1 2 3 4 5

Multiplication table of 5:
  5 x 1 = 5
  5 x 2 = 10
  5 x 3 = 15
  5 x 4 = 20
  5 x 5 = 25
  5 x 6 = 30
  5 x 7 = 35
  5 x 8 = 40
  5 x 9 = 45
  5 x 10 = 50` }
          ],
          keyPoints: [
            "if-else makes decisions based on conditions",
            "switch is cleaner than long if-else chains for discrete values",
            "for loop: known iterations. while: condition-based. do-while: at least once",
            "break exits the loop; continue skips to next iteration",
            "Curly braces {} define code blocks for multi-statement bodies",
            "switch needs break in each case to prevent fall-through"
          ],
          mcqs: [
            { question: "Which loop executes at least once?", options: ["for", "while", "do-while", "All loops"], correctIndex: 2, explanation: "do-while checks the condition AFTER executing the body, so it always runs at least once." },
            { question: "What does 'break' do in a loop?", options: ["Pauses execution", "Exits the loop immediately", "Skips one iteration", "Restarts the loop"], correctIndex: 1, explanation: "break immediately exits the innermost loop and continues with the next statement after the loop." },
            { question: "What happens without 'break' in switch cases?", options: ["Error", "Only first case runs", "Fall-through to next case", "Program crashes"], correctIndex: 2, explanation: "Without break, execution falls through to the next case, running all subsequent cases." },
            { question: "for(int i=0; i<5; i++) runs how many times?", options: ["4", "5", "6", "Infinite"], correctIndex: 1, explanation: "i starts at 0, runs while i<5, so i = 0,1,2,3,4 — that's 5 iterations." },
            { question: "What does 'continue' do?", options: ["Exits the loop", "Skips remaining body, goes to next iteration", "Breaks all loops", "Pauses execution"], correctIndex: 1, explanation: "continue skips the rest of the current iteration and jumps to the next loop iteration." }
          ]
        },
        {
          id: "c-t5",
          title: "Functions",
          simpleExplanation: "Functions are reusable blocks of code that perform a specific task. Instead of writing the same code multiple times, you write it once in a function and call it whenever needed. Functions take inputs (parameters), do something, and optionally return an output.",
          detailedExplanation: `**Function Components:**
1. **Declaration (prototype)** — Tells compiler the function exists
2. **Definition** — The actual code of the function
3. **Call** — Using the function

**Syntax:**
\`return_type function_name(parameter_list) { body }\`

**Types of Functions:**
- No return, no parameters: \`void greet()\`
- With return: \`int add(int a, int b)\`
- With parameters: \`void display(char name[])\`

**Recursion:**
A function calling itself. Must have a base case to stop.
Classic example: Factorial — n! = n × (n-1)!

**Call by Value vs Call by Reference:**
- By value: Copy of variable is passed (original unchanged)
- By reference: Address is passed using pointers (original can change)`,
          examples: [
            { title: "Functions and Recursion", problem: "Create functions for common operations including a recursive factorial.", explanation: "Functions break code into manageable pieces. Recursion is when a function calls itself with a simpler input.", code: `#include <stdio.h>

// Function declarations
int add(int a, int b);
int factorial(int n);
void swap(int *a, int *b);

int main() {
    // Regular function call
    printf("3 + 5 = %d\\n", add(3, 5));

    // Recursive function
    printf("5! = %d\\n", factorial(5));

    // Call by reference (using pointers)
    int x = 10, y = 20;
    printf("Before swap: x=%d, y=%d\\n", x, y);
    swap(&x, &y);
    printf("After swap: x=%d, y=%d\\n", x, y);

    return 0;
}

int add(int a, int b) { return a + b; }

int factorial(int n) {
    if (n <= 1) return 1;       // Base case
    return n * factorial(n - 1); // Recursive case
}

void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}`, output: `3 + 5 = 8
5! = 120
Before swap: x=10, y=20
After swap: x=20, y=10` }
          ],
          keyPoints: [
            "Functions promote code reuse and modularity",
            "void means no return value; other types require a return statement",
            "Parameters are inputs; return value is the output",
            "Recursion: function calls itself — must have a base case",
            "Call by value: copy passed (original safe). Call by reference: address passed (original changes)",
            "Function prototype declares the function before main()"
          ],
          mcqs: [
            { question: "What does 'void' mean as a return type?", options: ["Returns zero", "Returns nothing", "Returns null", "Returns empty string"], correctIndex: 1, explanation: "void indicates the function doesn't return any value." },
            { question: "What is recursion?", options: ["Looping", "A function calling itself", "Nested functions", "Function overloading"], correctIndex: 1, explanation: "Recursion is when a function calls itself with a simpler version of the problem." },
            { question: "What happens without a base case in recursion?", options: ["Returns 0", "Infinite recursion (stack overflow)", "Compiles but doesn't run", "Returns null"], correctIndex: 1, explanation: "Without a base case, the function calls itself forever until the stack overflows." },
            { question: "In call by value, changing a parameter:", options: ["Changes the original", "Doesn't change the original", "Causes an error", "Changes all copies"], correctIndex: 1, explanation: "Call by value passes a copy, so changes inside the function don't affect the original variable." },
            { question: "What is 4! (4 factorial)?", options: ["4", "16", "24", "12"], correctIndex: 2, explanation: "4! = 4 × 3 × 2 × 1 = 24." }
          ]
        },
        {
          id: "c-t6",
          title: "Arrays & Strings",
          simpleExplanation: "An array stores multiple values of the same type in a single variable — like a row of lockers, each holding one item. Strings in C are just arrays of characters ending with a special null character (\\0).",
          detailedExplanation: `**Arrays:**
- Fixed-size collection of same-type elements
- Indexing starts at 0
- Declared as: \`type name[size];\`
- Accessed as: \`name[index]\`

**Strings in C:**
- Character arrays ending with '\\0' (null terminator)
- Declared as: \`char str[] = "Hello";\` (compiler adds \\0)
- String functions (from string.h): strlen, strcpy, strcat, strcmp

**Important notes:**
- Array size is fixed at declaration — cannot grow/shrink
- No bounds checking — accessing out-of-range index is undefined behavior
- Arrays are passed to functions as pointers (not copies)`,
          examples: [
            { title: "Arrays and Strings", problem: "Work with integer arrays and string operations.", explanation: "Arrays store multiple values. Strings are character arrays with automatic null termination.", code: `#include <stdio.h>
#include <string.h>

int main() {
    // Integer array
    int marks[] = {85, 92, 78, 95, 88};
    int n = sizeof(marks) / sizeof(marks[0]);
    int sum = 0;

    printf("Marks: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", marks[i]);
        sum += marks[i];
    }
    printf("\\nAverage: %.1f\\n", (float)sum / n);

    // Strings
    char name[] = "Rahul";
    char greeting[50];

    printf("\\nName: %s\\n", name);
    printf("Length: %lu\\n", strlen(name));

    strcpy(greeting, "Hello, ");
    strcat(greeting, name);
    strcat(greeting, "!");
    printf("Greeting: %s\\n", greeting);

    // String comparison
    printf("Compare 'abc' vs 'abd': %d\\n", strcmp("abc", "abd"));

    return 0;
}`, output: `Marks: 85 92 78 95 88
Average: 87.6

Name: Rahul
Length: 5
Greeting: Hello, Rahul!
Compare 'abc' vs 'abd': -1` }
          ],
          keyPoints: [
            "Arrays store fixed-size collections of same-type elements",
            "Indexing starts at 0; arr[0] is the first element",
            "sizeof(arr)/sizeof(arr[0]) gives the number of elements",
            "Strings are char arrays ending with null character '\\0'",
            "strlen() = length, strcpy() = copy, strcat() = concatenate, strcmp() = compare",
            "C does NOT check array bounds — be careful with indices!"
          ],
          mcqs: [
            { question: "Array indexing in C starts at:", options: ["1", "0", "-1", "Depends on type"], correctIndex: 1, explanation: "C arrays use zero-based indexing. The first element is at index 0." },
            { question: "What terminates a C string?", options: ["Newline", "Space", "Null character (\\0)", "Semicolon"], correctIndex: 2, explanation: "C strings end with '\\0' (null terminator) so functions know where the string ends." },
            { question: "strcmp('abc', 'abc') returns:", options: ["-1", "0", "1", "true"], correctIndex: 1, explanation: "strcmp returns 0 when strings are equal, negative if first < second, positive if first > second." },
            { question: "What happens if you access arr[100] in a size-5 array?", options: ["Returns 0", "Compilation error", "Undefined behavior", "Returns -1"], correctIndex: 2, explanation: "C doesn't check bounds. Accessing out-of-range indices is undefined behavior — could crash or return garbage." },
            { question: "strlen(\"Hello\") returns:", options: ["4", "5", "6", "10"], correctIndex: 1, explanation: "strlen counts characters excluding the null terminator. 'Hello' has 5 characters." }
          ]
        },
        {
          id: "c-t7",
          title: "Pointers",
          simpleExplanation: "A pointer is a variable that stores the memory address of another variable. Think of it like knowing someone's home address instead of the person themselves. Pointers are powerful — they let you directly manipulate memory, pass variables by reference, and work with dynamic data.",
          detailedExplanation: `**Pointer Basics:**
- Declaration: \`int *ptr;\` (ptr is a pointer to an int)
- Address-of: \`&variable\` gives the memory address
- Dereference: \`*ptr\` gives the value at the address

**Why Pointers?**
1. Pass variables by reference (modify originals in functions)
2. Dynamic memory allocation (malloc, free)
3. Efficient array and string manipulation
4. Data structures (linked lists, trees)

**Pointer Arithmetic:**
- \`ptr + 1\` moves to the next element (moves by sizeof(type) bytes)
- \`ptr - 1\` moves to the previous element
- Array name IS a pointer to its first element`,
          examples: [
            { title: "Pointer Basics", problem: "Demonstrate pointer declaration, address-of, and dereference operations.", explanation: "& gets the address, * accesses the value at an address. Pointers and arrays are closely related.", code: `#include <stdio.h>

int main() {
    int num = 42;
    int *ptr = &num;  // ptr stores address of num

    printf("Value of num: %d\\n", num);
    printf("Address of num: %p\\n", (void*)&num);
    printf("ptr stores: %p\\n", (void*)ptr);
    printf("Value at ptr: %d\\n", *ptr);

    // Modify value through pointer
    *ptr = 100;
    printf("\\nAfter *ptr = 100:\\n");
    printf("num = %d\\n", num);  // num changed!

    // Pointer with arrays
    int arr[] = {10, 20, 30, 40, 50};
    int *p = arr;  // arr is already a pointer

    printf("\\nArray via pointer:\\n");
    for (int i = 0; i < 5; i++) {
        printf("  *(p+%d) = %d\\n", i, *(p + i));
    }

    return 0;
}`, output: `Value of num: 42
Address of num: 0x7ffd5c3e4a04
ptr stores: 0x7ffd5c3e4a04
Value at ptr: 42

After *ptr = 100:
num = 100

Array via pointer:
  *(p+0) = 10
  *(p+1) = 20
  *(p+2) = 30
  *(p+3) = 40
  *(p+4) = 50` }
          ],
          keyPoints: [
            "A pointer stores the memory address of another variable",
            "& (address-of) gets the address; * (dereference) gets the value at address",
            "int *ptr declares a pointer to an integer",
            "Pointer arithmetic: ptr+1 moves to next element of that type's size",
            "Array name is a pointer to its first element",
            "Pointers enable call-by-reference in functions",
            "NULL pointer: ptr = NULL means it points to nothing"
          ],
          mcqs: [
            { question: "What does & operator do?", options: ["Multiplies", "Returns address of a variable", "Dereferences a pointer", "Logical AND"], correctIndex: 1, explanation: "& (address-of) returns the memory address of a variable." },
            { question: "What does *ptr give you?", options: ["Address stored in ptr", "Value at the address ptr holds", "Size of ptr", "Type of ptr"], correctIndex: 1, explanation: "* (dereference) accesses the value stored at the memory address the pointer holds." },
            { question: "If int *p = arr, what is *(p+2)?", options: ["arr[0]", "arr[1]", "arr[2]", "arr[3]"], correctIndex: 2, explanation: "p+2 moves 2 integer positions forward, equivalent to arr[2]." },
            { question: "A NULL pointer:", options: ["Points to zero", "Points to nothing/invalid", "Crashes immediately", "Is automatically freed"], correctIndex: 1, explanation: "NULL means the pointer doesn't point to any valid memory location." },
            { question: "What is the relationship between arrays and pointers?", options: ["They're unrelated", "Array name is a pointer to first element", "Pointers can't access arrays", "Arrays are pointers to pointers"], correctIndex: 1, explanation: "An array name acts as a constant pointer to its first element." }
          ]
        },
        {
          id: "c-t8",
          title: "Structures & Unions",
          simpleExplanation: "Structures let you group different types of data together under one name. Think of a student record — it has a name (string), roll number (int), and GPA (float). A structure bundles these together. Unions are similar but all members share the same memory location.",
          detailedExplanation: `**Structure (struct):**
- Groups variables of different types under one name
- Each member has its own memory space
- Total size = sum of all members (plus padding)
- Accessed using dot operator (.) or arrow operator (->) with pointers

**Union:**
- Similar to struct but all members SHARE the same memory
- Size = size of the largest member
- Only ONE member can hold a value at a time
- Useful for memory-efficient type-flexible storage`,
          examples: [
            { title: "Structures in Practice", problem: "Create a student structure with multiple data types.", explanation: "struct groups related data together. Each instance has its own copy of all members.", code: `#include <stdio.h>
#include <string.h>

struct Student {
    char name[50];
    int roll;
    float gpa;
};

void display(struct Student s) {
    printf("Name: %s, Roll: %d, GPA: %.1f\\n", s.name, s.roll, s.gpa);
}

int main() {
    struct Student s1;
    strcpy(s1.name, "Rahul");
    s1.roll = 101;
    s1.gpa = 8.5;

    struct Student s2 = {"Priya", 102, 9.2};

    printf("Student Records:\\n");
    display(s1);
    display(s2);

    // Array of structures
    struct Student batch[3] = {
        {"Amit", 103, 7.8},
        {"Neha", 104, 9.5},
        {"Vikram", 105, 8.1}
    };

    printf("\\nBatch:\\n");
    for (int i = 0; i < 3; i++) {
        display(batch[i]);
    }

    return 0;
}`, output: `Student Records:
Name: Rahul, Roll: 101, GPA: 8.5
Name: Priya, Roll: 102, GPA: 9.2

Batch:
Name: Amit, Roll: 103, GPA: 7.8
Name: Neha, Roll: 104, GPA: 9.5
Name: Vikram, Roll: 105, GPA: 8.1` }
          ],
          keyPoints: [
            "Structures group different data types under one name",
            "Access members with dot (.) operator: student.name",
            "Structures can contain arrays, other structures, and pointers",
            "Unions share memory — only one member active at a time",
            "sizeof(struct) = sum of members (with padding); sizeof(union) = largest member",
            "typedef can create aliases: typedef struct Student Student;"
          ],
          mcqs: [
            { question: "What is a structure in C?", options: ["An array of functions", "A group of different data types", "A loop construct", "A pointer type"], correctIndex: 1, explanation: "A structure groups variables of different data types under a single name." },
            { question: "How do you access a structure member?", options: ["structure->member", "structure.member", "structure[member]", "structure(member)"], correctIndex: 1, explanation: "The dot operator (.) accesses structure members directly." },
            { question: "In a union, all members share:", options: ["The same value", "The same memory location", "The same type", "Nothing"], correctIndex: 1, explanation: "Union members share the same memory space — only one can hold a value at a time." },
            { question: "sizeof(union) equals:", options: ["Sum of all members", "Size of smallest member", "Size of largest member", "Always 4 bytes"], correctIndex: 2, explanation: "A union's size equals its largest member, since all members share the same memory." },
            { question: "Can structures be passed to functions?", options: ["No, never", "Yes, by value or pointer", "Only by pointer", "Only global structures"], correctIndex: 1, explanation: "Structures can be passed by value (copy) or by reference (pointer) to functions." }
          ]
        }
      ]
    }
  ]
};
