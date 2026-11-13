# Read This First

## What this subject is about, in plain words

Java is a programming language. This subject teaches you two things at once:

1. How to write Java programs — variables, loops, arrays, strings (Unit 1).

2. How to think in objects (OOP) — instead of writing one long list of instructions, you model the program as objects that hold data and do actions, like real things (Units 2, 3, 5). Then you build windows and buttons with JavaFX (Unit 4).

The big idea of OOP in one picture. A class is a blueprint of a house. An object is an actual house built from that blueprint. From one blueprint you can build many houses; each house has its own colour and owner (its data), but all of them have the same rooms and doors (the same methods).

| Unit | Topic |
|---|---|
| 1 | Basics of Java, arrays and strings |
| 2 | Classes, objects and methods (OOP principles, constructors, overloading) |
| 3 | Inheritance and interfaces (super, overriding, abstract, final, packages) |
| 4 | JavaFX: GUI, shapes, layouts, event handling, animation |
| 5 | Class modeling (UML) + Java I/O, exception handling, multithreading |

How each topic is taught: In one line → Understand it (plain words + real-life example) → syntax and rules → a complete program with its output → line-by-line explanation → common mistakes → what to write in the exam → check yourself.

How to run every program in this guide: save as ClassName.java (the file name must match the public class), then

```
javac ClassName.java (compile → creates ClassName.class)
java ClassName (run)
```

Exam tip for Java theory answers: definition → small diagram/table → short code example → output. A 7-mark answer without a code example rarely gets full marks.

# Basics of Java, Arrays and Strings

## 1.1 History and evolution of Java

> In one line: Java was created at Sun Microsystems (1991, led by James Gosling) to be a simple, safe, object-oriented language that runs on any machine without changes — “Write Once, Run Anywhere”.

### Understand it

Before Java, a C/C++ program compiled on Windows produced a Windows-only

executable; to run it on Linux or a phone you had to recompile (and often rewrite parts). Sun wanted software for many different devices (TV set-top boxes, then the Internet), so they built a language whose compiled output runs on a virtual machine that exists for every device.

Timeline - 1991 — project “Green” at Sun; language first named Oak (after a tree outside Gosling’s office). - 1995 — renamed Java (after Java coffee); released publicly with the slogan Write Once, Run Anywhere. - 2010 — Oracle acquired Sun; Oracle now maintains Java. New versions every 6 months (Java 8, 11, 17, 21 are long-term-support versions).

### Java’s lineage (where its ideas came from)

```
 BCPL → B → C (structured programming) → C++ (adds OOP) → Java (OOP + portable + safe)
```

From C, Java took its syntax ( if , for , { } , ; ).

From C++, it took its object model (classes, objects, inheritance).

It removed risky features: pointers (direct memory access), multiple inheritance of classes, manual memory freeing (Java has a garbage collector), goto .

### The design trade-offs Java tried to solve (from your slides)

Older languages forced programmers to choose: - Ease-of-use vs power (BASIC was easy but weak; assembly was powerful but hard), - Safety vs efficiency (safe languages were slow; fast ones like C let you crash memory), - Rigidity vs extensibility.

And early languages (BASIC, COBOL, FORTRAN) relied on GOTO jumps, producing “spaghetti code” — tangled, impossible to follow. Structured languages (C) fixed this with blocks and loops; OOP languages (C++, Java) went further by organising code into objects.

| Features of Java (the “buzzwords” — common | 5-mark question) |
|---|---|
| Feature | Meaning |
| Simple | Syntax like C/C++ but without pointers, operator overloading, multiple class inheritance |
| Object-oriented | Everything is organised into classes and objects |
| Platform independent / portable | Compiled to bytecode, which runs on any machine that has a JVM |
| Secure | No pointers; bytecode is verified; programs run inside the JVM “sandbox” |
| Robust | Strong type checking, exception handling, automatic garbage collection |
| Architecture-neutral | Bytecode doesn’t depend on the processor; data type sizes are fixed (int is always 32 bits) |
| Interpreted & compiled | Compiled to bytecode, then the JVM interprets / JIT- compiles it |
| High performance | JIT (Just-In-Time) compiler converts hot bytecode to native code |
| Multithreaded | Built-in support to run several tasks at once (Unit 5) |
| Distributed | Built-in networking (java.net), RMI |
| Dynamic | Classes are loaded at run time when needed |

## 1.2 POP vs OOP

POP (Procedure-Oriented Programming) — the program is a list of functions working on shared data (C). OOP (Object-Oriented Programming) — the program is a set of objects, each bundling its own data + the functions (methods) that work on it (Java).

Analogy: POP is like a kitchen with one big shared table — every cook (function) grabs any ingredient (global data); a mistake by one cook spoils everything. OOP is like separate stations, each cook with their own ingredients and tools; others must ask the station (call a method) to get something done.

| Basis | POP | OOP |
|---|---|---|
| Focus | Functions (procedures) | Objects (data + behaviour) |
| Program divided into | Functions | Classes/objects |
| Approach | Top-down | Bottom-up |
| Data | Mostly global, freely accessible | Hidden inside objects (encapsulation) |
| Security | Less secure | More secure (access modifiers) |
| Reusability | Limited | High — inheritance |
| Adding new features | Harder | Easier — add new classes |
| Overloading | Not possible | Possible (polymorphism) |

Examples

C, Pascal, FORTRAN

Java, C++, Python, C#

## 1.3 JDK, JRE and JVM

> In one line: the JDK is the toolbox for writing Java; the JRE is what’s needed to run Java; the JVM is the engine inside the JRE that actually executes bytecode.

```
 ┌──────────────────────── JDK (Java Development Kit) ────────────────────────┐
 │ Development tools: javac (compiler), java (launcher), javadoc, jar, jdb │
 │ ┌──────────────────── JRE (Java Runtime Environment) ──────────────────┐ │
 │ │ Class libraries (java.lang, java.util, …) + supporting files │ │
 │ │ ┌──────────────── JVM (Java Virtual Machine) ────────────────────┐ │ │
 │ │ │ Class loader → Bytecode verifier → Interpreter + JIT compiler │ │ │
 │ │ └────────────────────────────────────────────────────────────────┘ │ │
 │ └──────────────────────────────────────────────────────────────────────┘ │
 └────────────────────────────────────────────────────────────────────────────┘
```

|  | JDK | JRE | JVM |
|---|---|---|---|
| Full form | Java Development Kit | Java Runtime Environment | Java Virtual Machine |
| Purpose | Develop and run programs | Run programs | Execute bytecode |
| Contains | JRE + development tools (javac, javadoc, jar, debugger) | JVM + class libraries | Class loader, verifier, interpreter, JIT, garbage collector |
| Who needs it | Programmers | Users who only run Java apps | Part of JRE |
| Platform dependent? | Yes (separate download per OS) | Yes | Yes — each OS has its own JVM. That’s exactly what makes bytecode platform-independent |

Multiple JDK versions can be installed on the same machine.

### How a Java program runs (compilation and execution)

```
 Hello.java ──javac (compiler)──▶ Hello.class (BYTECODE) ──▶ JVM on Windows ─▶ runs
 (source code) same file everywhere ├─▶ JVM on Linux ─▶ runs
 └─▶ JVM on Mac ─▶ runs
```

1. You write source code in Hello.java .

2. javac compiles it into bytecode ( Hello.class ) — instructions for an imaginary machine, not for any real CPU.

3. The JVM loads the class (class loader), checks it is safe (bytecode verifier), and executes it using the interpreter and JIT compiler, which turns it into native machine code of the host system.

Bytecode is the reason Java is platform independent: the same .class file runs on any OS that has a JVM.

### Java platforms (editions)

Java SE (Standard Edition) — core language and libraries; desktop and general programs (what you study).

Java EE / Jakarta EE (Enterprise Edition) — large server-side web applications (servlets, JSP, web services).

Java ME (Micro Edition) — small devices: old mobile phones, embedded systems.

JavaFX — rich desktop GUI applications (Unit 4).

## 1.4 Your first Java program — every word explained

```
public class Hello {
 public static void main(String[] args) {
 System.out.println("Hello, ITM!");
 }
}
```

Output:

```
Hello, ITM!
```

| Part | Meaning |
|---|---|
| public class Hello | defines a class named Hello; public = accessible from anywhere. The file must be named Hello.java |
| { … } | braces mark the beginning and end of a block |
| public (before main) | the JVM must be able to call main from outside the class |
| static | main belongs to the class, so the JVM can call it without creating an object |
| void | main returns nothing |
| main | the fixed name of the method where execution starts |
| String[] args | an array of strings holding command-line arguments |
| System.out.println(…) | prints the text and moves to a new line |
| ; | ends every statement |

### Rules of the main() method (from your slides)

Must be public static void main(String[] args) (also valid: String args[] , String... args ; the order static public is also allowed).

It’s the entry point; without it, the JVM reports an error at run time (the program compiles, but can’t run).

void — the return type is fixed; main can’t return a value to the JVM (use System.exit(code) for that).

The name main is fixed (case-sensitive: Main won’t work).

### Structure of System.out.println()

```
 System . out . println("Hi")
 (a class in (a static field (a method of PrintStream that prints
 java.lang) of type and then moves to the next line)
 PrintStream —
 the standard output stream, i.e. the screen)
```

print() prints without moving to a new line; println() prints then moves to a new line; printf() prints with a format ( System.out.printf("%.2f", 3.14159) → 3.14).

## 1.5 Data types

> In one line: a data type tells Java what kind of value a variable holds and how much memory it needs. Java is statically typed — every variable’s type is fixed when you declare it.

```
 DATA TYPES
 ┌────────────┴────────────┐
 PRIMITIVE (8) NON-PRIMITIVE (reference)
 ┌───────┼──────────┐ String, Array, Class,
 Integer Floating char boolean Interface
 byte float
 short double
 int
 long
```

### The 8 primitive types — memorise this table

| The 8 primitive | types — memorise | this table |  |  |
|---|---|---|---|---|
| Type | Size | Range | Default | Example |
| byte | 1 byte (8 bits) | −128 to 127 | 0 | byte b = 100; |
| short | 2 bytes | −32,768 to 32,767 | 0 | short s = 3000; |
| int | 4 bytes | −2³¹ to 2³¹−1 (≈ ±2.1 billion) | 0 | int marks = 95; |
| long | 8 bytes | −2⁶³ to 2⁶³−1 | 0L | long pop = 1400000000L; |
| float | 4 bytes | ≈ 6–7 decimal digits precision | 0.0f | float pi = 3.14f; |
| double | 8 bytes | ≈ 15 decimal digits precision | 0.0d | double g = 9.81; |
| char | 2 bytes (Unicode) | ‘000’ to ‘ ’ (0– 65535) | ‘000’ | char grade = 'A'; |
| boolean | JVM-dependent (1 bit of info) | true / false | false | boolean pass = true; |

Why is char 2 bytes in Java (1 in C)? Java uses Unicode, so a char can store characters of every language (Hindi, Gujarati, Chinese…), not only English. Why the L and f ? A whole number is an int by default and a decimal number is a double by default. L says “this is a long”; f says “this is a float”. float f = 3.14; is an error (double can’t silently go into float).

Non-primitive (reference) types don’t store the value directly — they store a reference (address) to an object in memory: String , arrays, classes, interfaces. Their default value is null .

## 1.6 Variables

A variable is a named memory location whose value can change.

```
int age; // declaration
age = 19; // assignment (initialisation)
int marks = 88; // declaration + initialisation
final double PI = 3.14159; // final = constant, cannot be changed
```

Naming rules: letters, digits, _ and $ ; cannot start with a digit; no spaces; not a keyword; case-sensitive ( age ≠ Age ). Convention: camelCase for variables/methods, PascalCase for classes, UPPER_CASE for constants.

Types of variables

| Kind | Declared | Lifetime | Default value? |
|---|---|---|---|
| Local | inside a method/block | until the block ends | No — must be initialised before use |
| Instance | inside a class, outside methods (no static ) | as long as the object exists; each object has its own copy | Yes (0, null, false) |
| Static (class) | inside a class with static | whole program; one copy shared by all objects | Yes |

## 1.7 Type conversion and type casting

> In one line: converting a value from one type to another — automatically when it’s safe (widening), manually with a cast when data might be lost (narrowing).

### Widening (implicit / automatic) conversion

Happens automatically when (1) the two types are compatible and (2) the destination is larger than the source:

```
 byte → short → int → long → float → double
 char ↗
```

```
int i = 100;
long l = i; // int → long, automatic
double d = l; // long → double, automatic → 100.0
```

### Narrowing (explicit) conversion = type casting

Larger → smaller can lose data, so you must write the target type in brackets:

```
double d = 9.78;
int i = (int) d; // 9 — the decimal part is CUT, not rounded
int big = 300;
byte b = (byte) big; // 44 — 300 doesn't fit in a byte; 300 − 256 = 44
char c = (char) 65; // 'A' — Unicode 65
int x = 'a'; // 97 — char → int is widening (automatic)
```

Analogy: pouring a small glass into a big bucket (widening) — never spills. Pouring a bucket into a glass (narrowing) — you must decide to do it, and some water may spill (data loss).

### Type promotion in expressions

In arithmetic, byte , short and char are first promoted to int; and if any operand is

long/float/double, the whole expression becomes that type.

```
byte a = 10, b = 20;
byte c = a + b; // ERROR: a + b is an int
byte c = (byte)(a + b); // OK
```

### Complete example

```
public class Casting {
 public static void main(String[] args) {
 int i = 100;
 double d = i; // widening
 double e = 9.78;
 int j = (int) e; // narrowing
 byte b = (byte) 300;
 System.out.println(d);
 System.out.println(j);
 System.out.println(b);
 System.out.println((char) 66);
 System.out.println('A' + 1);
 }
}
```

Output:

```
100.0
9
44
B
66
```

Why is the last line 66 and not ‘B’? 'A' + 1 is an arithmetic expression → promoted to int → 65 + 1 = 66.

## 1.8 Keywords (reserved words)

Words with a special meaning to the compiler; they can’t be used as identifiers. Java has about 50 (all lowercase):

```
abstract assert boolean break byte case catch char class const continue default do double else
enum extends final finally float for goto if implements import instanceof int interface long
native new package private protected public return short static strictfp super switch
synchronized this throw throws transient try void volatile while
```

const and goto are reserved but not used.

true , false , null are literals, not keywords — but still can’t be used as names.

## 1.9 Operators

| Category | Operators | Example (a = 10, b = 3) |
|---|---|---|
| Arithmetic | + − * / % | a / b = 3 (integer division), a % b = 1 (remainder), 10.0/3 = 3.333… |
| Unary | ++ −− + − ! | a++ (use then increase), ++a (increase then use) |
| Assignment | = += −= *= /= %= | a += 5 → a = 15 |
| Relational | == != > < >= <= | a > b → true (result is boolean) |
| Logical | && \|\| ! | (a > 5) && (b > 5) → false |
| Bitwise | & \| ^ ~ << >> >>> | a & b = 1010 & 0011 = 0010 = 2; a << 1 = 20 |
| Ternary | cond ? x : y | → 10 max = (a > b) ? a : b; |
| instanceof | obj instanceof Class | 3) true if obj is that class (Unit |

### Short-circuit logical operators

&& and || stop early when the result is already decided: - false && anything → false, the right side is not evaluated. - true || anything → true, the right side is not evaluated. This avoids errors: if (x != 0 && 10 / x > 1) never divides by zero. ( & and | on booleans evaluate both sides always.)

### a++ vs ++a — traced

```
public class IncDemo {
 public static void main(String[] args) {
 int a = 5;
 int b = a++; // b gets 5, THEN a becomes 6
 int c = ++a; // a becomes 7 FIRST, then c gets 7
 System.out.println(a + " " + b + " " + c);
 System.out.println(10 / 3 + " " + 10 % 3 + " " + 10.0 / 4);
 }
}
```

Output:

```
7 5 7
3 1 2.5
```

Precedence (high → low): () → ++ -- ! → * / % → + - → << >> → < > <= >= → == != → & → ^ → | → && → || → ?: → = += …

## 1.10 Control statements — decisions

### if, if-else, else-if ladder

```
if (marks >= 40) {
 System.out.println("Pass");
} else {
 System.out.println("Fail");
}
```

```
if (marks >= 85) grade = 'A';
else if (marks >= 70) grade = 'B';
else if (marks >= 50) grade = 'C';
else grade = 'F';
```

The ladder checks conditions top to bottom and runs only the first true one.

### Nested if — an if inside another if

```
if (age >= 18) {
 if (hasLicence) System.out.println("Can drive");
 else System.out.println("Get a licence first");
} else {
 System.out.println("Too young");
}
```

### switch

Chooses one of many blocks based on the value of an expression (int, char, String, enum, byte, short).

```
public class SwitchDemo {
 public static void main(String[] args) {
 int day = 3;
 switch (day) {
 case 1: System.out.println("Monday"); break;
 case 2: System.out.println("Tuesday"); break;
 case 3: System.out.println("Wednesday"); break;
 default: System.out.println("Other day");
 }
 // fall-through: without break, execution continues into the next case
 int n = 2;
 switch (n) {
 case 1: System.out.println("one");
 case 2: System.out.println("two");
 case 3: System.out.println("three");
 }
 }
}
```

Output:

```
Wednesday
two
three
```

Why “two three”? Case 2 matched and there was no break , so execution “fell through” into case 3. break exits the switch; default runs when no case matches.

## 1.11 Loops (iteration)

| Loop | Checks condition | Runs at least once? | Use when |
|---|---|---|---|
| while | before each iteration (entry-controlled) | No | number of repetitions unknown |
| do-while | after each iteration (exit-controlled) | Yes | must run at least once (menus) |
| for | before each iteration | No | number of repetitions known |
| for-each | — | — | visiting every element of an array/collection |

```
public class Loops {
 public static void main(String[] args) {
 int i = 1;
 while (i <= 3) { // while
 System.out.print(i + " ");
 i++;
 }
 System.out.println();
```

```
 int j = 10;
 do { // do-while: runs once even though 10 > 3
 System.out.print(j + " ");
 j++;
 } while (j <= 3);
 System.out.println();
```

```
 for (int k = 1; k <= 5; k++) // for: init; condition; update
 System.out.print(k * k + " ");
 System.out.println();
```

```
 int[] marks = {70, 85, 90};
 for (int m : marks) // for-each: "for each m in marks"
 System.out.print(m + " ");
 System.out.println();
 }
}
```

Output:

```
1 2 3
10
1 4 9 16 25
70 85 90
```

How the for loop runs: (1) initialisation once; (2) check condition — if false, stop; (3) run body; (4) update; go to (2).

## 1.12 Jump statements — break, continue, return

break — immediately exits the loop or switch. In nested loops, a labelled break exits the outer loop.

continue — skips the rest of this iteration and goes to the next one.

return — exits the whole method (optionally returning a value).

```
public class Jumps {
 public static void main(String[] args) {
 for (int i = 1; i <= 10; i++) {
 if (i == 5) break; // stop the loop at 5
 System.out.print(i + " ");
 }
 System.out.println();
 for (int i = 1; i <= 6; i++) {
 if (i % 2 == 0) continue; // skip even numbers
 System.out.print(i + " ");
 }
 System.out.println();
 outer:
 for (int i = 1; i <= 3; i++) {
 for (int j = 1; j <= 3; j++) {
 if (j == 2) continue outer; // jump to next i
 if (i == 3) break outer; // leave both loops
 System.out.print(i + "" + j + " ");
 }
 }
 System.out.println();
 }
}
```

Output:

```
1 3 5
11 21
```

## 1.13 Arrays

> In one line: an array is a fixed-size, indexed collection of elements of the same type. In Java, arrays are objects and know their own length.

### Declaring, creating, initialising

```
int[] marks; // 1. declare (preferred style) — also: int marks[];
marks = new int[5]; // 2. create: 5 ints, all 0 by default
marks[0] = 90; // 3. assign by index (0 to 4)
```

```
int[] a = new int[5]; // declare + create
int[] b = {10, 20, 30}; // declare + create + initialise (size 3)
String[] names = new String[3]; // all null by default
```

Index starts at 0; last index is length − 1 .

arr.length gives the size (a field, no brackets — unlike String.length() ).

Accessing a[5] in an array of size 5 throws ArrayIndexOutOfBoundsException (Java checks bounds — C doesn’t).

### Example: sum, average and maximum

```
public class ArrayDemo {
 public static void main(String[] args) {
 int[] m = {72, 88, 95, 60, 81};
 int sum = 0, max = m[0];
 for (int i = 0; i < m.length; i++) {
 sum += m[i];
 if (m[i] > max) max = m[i];
 }
 System.out.println("Length = " + m.length);
 System.out.println("Sum = " + sum + ", Average = " + (double) sum / m.length);
 System.out.println("Max = " + max);
 }
}
```

Output:

```
Length = 5
Sum = 396, Average = 79.2
Max = 95
```

### Multi-dimensional (2-D) arrays

A 2-D array is an array of arrays — think of a table with rows and columns.

```
public class Matrix {
 public static void main(String[] args) {
 int[][] m = { {1, 2, 3},
 {4, 5, 6} }; // 2 rows, 3 columns
 for (int i = 0; i < m.length; i++) { // m.length = rows = 2
 for (int j = 0; j < m[i].length; j++) // m[i].length = columns = 3
 System.out.print(m[i][j] + " ");
 System.out.println();
 }
 for (int[] row : m) { // for-each version
 for (int v : row) System.out.print(v * 10 + " ");
 System.out.println();
 }
 }
}
```

Output:

```
1 2 3
4 5 6
10 20 30
40 50 60
```

### Jagged arrays

A 2-D array whose rows have different lengths. Each row is a separate array, allocated individually — saves memory for uneven data (e.g., marks of students who took different numbers of subjects).

```
public class Jagged {
 public static void main(String[] args) {
 int[][] j = new int[3][]; // only the number of rows is fixed
 j[0] = new int[2];
 j[1] = new int[4];
 j[2] = new int[1];
 int v = 1;
 for (int i = 0; i < j.length; i++)
 for (int k = 0; k < j[i].length; k++)
 j[i][k] = v++;
 for (int[] row : j) {
 for (int x : row) System.out.print(x + " ");
 System.out.println();
 }
 }
}
```

Output:

```
1 2
3 4 5 6
7
```

```
 j ──▶ [ • ]──▶ [1][2]
 [ • ]──▶ [3][4][5][6]
 [ • ]──▶ [7]
```

## 1.14 Strings

> In one line: a String is an object that holds a sequence of characters. Strings are immutable — once created, their content can never change; every “change” creates a new String.

```
String s1 = "Java"; // string literal — stored in the String Constant Pool
String s2 = new String("Java"); // new object on the heap
```

String Constant Pool: identical literals share one object to save memory. So "Java" == "Java" is true (same object), but s1 == s2 is false (different objects). Always compare content with equals() .

### Important String methods

|  |  | Example (s = “Hello |  |
|---|---|---|---|
| Method | Does | World”) | Result |
| length() | number of characters | s.length() | 11 |
| charAt(i) | character at index i | s.charAt(4) | ‘o’ |
| substring(b) | from index b to end | s.substring(6) | “World” |
| substring(b, e) | from b up to e − 1 | s.substring(0, 5) | “Hello” |
| indexOf(x) | first position of x (−1 if absent) | s.indexOf('o') | 4 |
| lastIndexOf(x) | last position | s.lastIndexOf('o') | 7 |
| toUpperCase() / | change case | s.toUpperCase() | “HELLO WORLD” |
| toLowerCase() |  |  |  |
| trim() | remove leading/trailing spaces | " hi ".trim() | “hi” |
| concat(t) / + | join | "Hi".concat("!") | “Hi!” |
| equals(t) | same content? (case- sensitive) | "a".equals("A") | false |
| equalsIgnoreCase(t) | same, ignoring case | "a".equalsIgnoreCase ("A") | true |
| compareTo(t) | 0 if equal, <0 if before, >0 if after (dictionary order) | "apple".compareTo("b anana") | −1 |
| replace(a, b) | replace all a with b | s.replace('l', 'L') | “HeLLo WorLd” |
| contains(t) | contains substring? | s.contains("World") | true |
| startsWith/endsWith |  | s.endsWith("ld") | true |
| split(regex) | break into array | "a,b,c".split(",") | [“a”,“b”,“c”] |
| isEmpty() | length 0? | "".isEmpty() | true |

substring(begin, end) — remember: begin is included, end is excluded, and the result length = end − begin.

```
public class StringDemo {
 public static void main(String[] args) {
 String s = "Hello World";
 System.out.println(s.length());
 System.out.println(s.charAt(4));
 System.out.println(s.substring(6));
 System.out.println(s.substring(0, 5));
 System.out.println(s.indexOf('o') + " " + s.lastIndexOf('o'));
 System.out.println(s.toUpperCase());
 System.out.println(s.replace('l', 'L'));
 String a = "Java", b = new String("Java");
 System.out.println((a == b) + " " + a.equals(b));
 System.out.println("apple".compareTo("banana"));
 }
}
```

Output:

```
11
o
World
Hello
4 7
HELLO WORLD
HeLLo WorLd
false true
-1
```

## 1.15 StringBuffer (and StringBuilder)

> In one line: StringBuffer is a mutable (changeable) string — you can append, insert, delete and reverse in the same object without creating new ones.

Analogy: a String is a printed page — to change one word you must print a whole new page. A StringBuffer is a whiteboard — you erase and write on the same board.

Capacity: a StringBuffer keeps extra room. Default capacity = 16 characters; new

StringBuffer("Hi") has capacity 16 + 2 = 18. When full, it grows to (old × 2) + 2.

| Method | Does | Example (sb = “Hello”) | Result |
|---|---|---|---|
| append(x) | add at the end | sb.append(" Java") | “Hello Java” |
| insert(i, x) | insert at index i | sb.insert(0, "Hi ") | “Hi Hello” |
| replace(b, e, s) | replace chars b..e−1 | sb.replace(0, 1, "J") | “Jello” |
| delete(b, e) | delete chars b..e−1 | sb.delete(0, 2) | “llo” |
| deleteCharAt(i) | delete one char | sb.deleteCharAt(1) | “Hllo” |
| reverse() | reverse | sb.reverse() | “olleH” |
| length() | number of chars |  | 5 |
| capacity() | allocated space |  | 21 (16 + 5) |
| setCharAt(i, c) | change one char | sb.setCharAt(0,'Y') | “Yello” |
| toString() | convert to String |  |  |

```
public class SBDemo {
 public static void main(String[] args) {
 StringBuffer sb = new StringBuffer("Hello");
 System.out.println(sb.length() + " " + sb.capacity());
 sb.append(" Java");
 System.out.println(sb);
 sb.insert(5, ",");
 System.out.println(sb);
 sb.deleteCharAt(5);
 sb.reverse();
 System.out.println(sb);
 }
}
```

Output:

```
5 21
Hello Java
Hello, Java
avaJ olleH
```

| String | StringBuffer | StringBuilder |
|---|---|---|
| Immutable | Mutable | Mutable |
| Every change makes a new object (slow in loops) | Changes same object | Changes same object |
| Thread-safe (because immutable) | Thread-safe (methods synchronized) | Not thread-safe |
|  | Slower than StringBuilder | Fastest — use in single-threaded code |

## 1.16 Command-line arguments

Values typed after the class name when running the program arrive in main ’s String[] args .

```
public class CmdArgs {
 public static void main(String[] args) {
 System.out.println("Count = " + args.length);
 int sum = 0;
 for (String a : args) sum += Integer.parseInt(a); // String → int
 System.out.println("Sum = " + sum);
 }
}
```

Run: java CmdArgs 10 20 30

```
Count = 3
Sum = 60
```

args[0] = “10”, args[1] = “20”, … — they are always Strings, so numbers must be converted with Integer.parseInt() .

## 1.17 Variable arguments (varargs)

> In one line: type... name lets a method accept any number of arguments (zero or more); inside the method it’s an array.

```
public class VarArgs {
 static int sum(int... nums) { // nums is an int[]
 int s = 0;
 for (int n : nums) s += n;
 return s;
 }
 static void show(String label, int... v) {
 System.out.println(label + ": " + v.length + " values");
 }
 public static void main(String[] args) {
 System.out.println(sum());
 System.out.println(sum(5));
 System.out.println(sum(1, 2, 3, 4));
 show("Marks", 70, 80);
 }
}
```

Output:

```
0
5
10
Marks: 2 values
```

Rules for varargs: 1. Only one varargs parameter per method. 2. It must be the last parameter ( void f(int... a, String s) is an error). 3. Written with three dots ... (ellipsis). 4. Overloading a method with varargs can cause ambiguity errors.

## 1.18 Wrapper classes, autoboxing and unboxing

> In one line: a wrapper class “wraps” a primitive value inside an object, because many parts of Java (like ArrayList ) work only with objects.

| Primitive | Wrapper class |
|---|---|
| boolean | Boolean |
| char | Character |
| byte | Byte |
| short | Short |
| int | Integer |
| long | Long |
| float | Float |
| double | Double |

Why do we need them? (from your slides) 1. Collections like ArrayList store only objects — ArrayList<int> is illegal; use ArrayList<Integer> . 2. Utility methods — parsing and converting: Integer.parseInt("42") , Integer.toBinaryString(10) , Character.isDigit('5') . 3. Null — a wrapper can be null (meaning “no value”); a primitive can’t. 4.

Multithreading/synchronization needs objects.

Creating wrapper objects:

```
Integer a = new Integer(10); // 1. constructor — DEPRECATED (avoid)
Integer b = 10; // 2. direct assignment (autoboxing)
Integer c = Integer.valueOf(10); // 3. valueOf() — recommended
```

Common wrapper methods: intValue() / doubleValue() (object → primitive), valueOf() , parseInt(String) , toString() , compareTo() , equals() , Integer.min/max(a, b) , Math.round() , Integer.decode("0x1F") → 31.

### Autoboxing and auto-unboxing

Autoboxing: the compiler automatically converts primitive → wrapper object ( int → Integer ) when you assign a primitive to a wrapper variable or pass it where an object is expected (e.g., list.add(5) ).

Auto-unboxing: automatic wrapper → primitive ( Integer → int ) when you assign a wrapper to a primitive or use it in arithmetic.

```
import java.util.ArrayList;
public class Boxing {
 public static void main(String[] args) {
 int x = 25;
 Integer obj = x; // autoboxing (compiler writes Integer.valueOf(x))
 int y = obj; // auto-unboxing (compiler writes obj.intValue())
 ArrayList<Integer> list = new ArrayList<>();
 list.add(10); // autoboxing
 list.add(20);
 int total = list.get(0) + list.get(1); // auto-unboxing for +
 System.out.println(obj + " " + y + " " + total);
 System.out.println(Integer.parseInt("123") + 1);
 System.out.println(Integer.toBinaryString(10) + " " + Integer.MAX_VALUE);
 System.out.println(Character.isDigit('7') + " " + Character.toUpperCase('q'));
 }
}
```

Output:

```
25 25 30
124
1010 2147483647
true Q
```

### Unit 1 — Common mistakes

Naming the file differently from the public class ( class Hello in hello.java ).

float f = 3.14; — needs 3.14f .

Comparing strings with == instead of equals() .

arr.length() (wrong) vs arr.length ; str.length (wrong) vs str.length() .

Forgetting break in switch (unintended fall-through).

substring(0, 5) includes index 0–4, not 5.

Thinking (int) 9.99 gives 10 (it gives 9 — truncation).

## Unit 1 — What to write in the exam

Features of Java → table of buzzwords with one-line meanings.

JDK vs JRE vs JVM → nested diagram + table + compilation flow.

Type casting → widening chain + narrowing example with data loss + promotion rule.

Arrays → declaration/creation/initialisation + 2-D + jagged with diagram + code.

String vs StringBuffer → immutability, methods table, comparison table.

Wrapper classes → mapping table + need + autoboxing/unboxing code.

### Unit 1 — Check yourself

1. Why is Java platform independent?

2. Output of System.out.println(5 / 2 + " " + 5 % 2 + " " + 5 / 2.0); ?

3. What does (byte) 130 give?

4. "Programming".substring(3, 7) = ?

5. Difference between while and do-while ?

6. Can a varargs parameter be the first of two parameters?

Answers: 1) javac produces bytecode, which runs on any OS’s JVM. 2) 2 1 2.5 . 3) −126 (130 − 256).

4) “gram”. 5) while checks first (may run 0 times); do-while checks after (runs at least once). 6) No — it must be last.

# Classes, Objects and Methods

## 2.1 Object-Oriented Programming — the four pillars

> In one line: OOP organises a program as objects — bundles of data (fields) and behaviour (methods) — built on four principles: Encapsulation, Abstraction, Inheritance, Polymorphism.

### Understand it — a car

Encapsulation: the engine’s parts are sealed inside the bonnet; you interact only through the steering, pedals and gear. → Data is hidden inside the class and accessed only through methods.

Abstraction: to drive you only need to know “press accelerator = go faster”, not how fuel injection works. → Show what an object does, hide how.

Inheritance: an electric car is a car — it gets everything a car has (wheels, steering) and adds a battery. → A new class reuses an existing class’s features.

Polymorphism: the same “start()” action works differently for a petrol car (ignition) and an electric car (power on). → One name, many forms.

### 1. Encapsulation

Definition: wrapping data and the methods that operate on it into a single unit (class), and restricting direct access to the data — usually by making fields private and providing public getter/setter methods.

```
 ┌──────────────── class Account ────────────────┐
 │ private double balance; ← hidden data │
 │ ─────────────────────────────────────────── │
 │ public void deposit(double amt) ← controlled │
 │ public double getBalance() access │
 └────────────────────────────────────────────────┘
 outside code can't touch balance directly
```

```
class Account {
 private double balance; // hidden
 public void deposit(double amt) {
 if (amt > 0) balance += amt; // validation protects the data
 }
 public double getBalance() { return balance; }
}
public class EncapDemo {
 public static void main(String[] args) {
 Account a = new Account();
 a.deposit(500);
 a.deposit(-100); // rejected by validation
 // a.balance = 1000000; // compile ERROR: balance is private
 System.out.println(a.getBalance());
 }
}
```

Output:

```
500.0
```

Benefits: data protection (validation), flexibility (change the inside without breaking users), easier maintenance.

### 2. Abstraction

Definition: showing only the essential features of an object and hiding the implementation details. In Java it’s achieved with abstract classes and interfaces (Unit 3). Example (Shape hierarchy from your slides): every shape has an area() , but how area is computed differs; the user just calls shape.area() .

### 3. Inheritance

Definition: a mechanism where a new class (subclass/child) acquires the fields and methods of an existing class (superclass/parent) using extends . Represents an “is-a” relationship (Car is a Vehicle). Benefit: code reuse. (Full detail in Unit 3.)

```
 Vehicle (speed, start())
 / \
 Car Bike (each inherits speed & start(), adds its own)
```

### 4. Polymorphism

Definition: “many forms” — the same method name behaves differently depending on the context. - Compile-time (static) polymorphism → method overloading: same name, different parameter lists, in the same class. - Run-time (dynamic) polymorphism → method overriding: a subclass redefines a superclass method (Unit 3).

## 2.2 Classes and objects

Class — a blueprint/template that defines the fields (state) and methods (behaviour) of objects. It occupies no memory for data until objects are created. Object — a real instance of a class, with its own copy of the fields, created in memory with new .

A class Student is like the admission form template. Each filled form (Maher’s, Riya’s) is an object — same fields, different values.

### Declaring a class — general form

```
class ClassName {
 // fields (instance variables)
 type field1;
 type field2;
```

```
 // constructors
 ClassName(parameters) { ... }
```

```
 // methods
 returnType methodName(parameters) { ... }
}
```

### Creating objects — the new operator

```
Student s1; // 1. declare a reference variable (no object yet; s1 is null)
s1 = new Student(); // 2. new allocates memory on the HEAP, runs the constructor,
 // and returns the reference (address), stored in s1
Student s2 = new Student(); // both steps in one line
```

```
 Stack Heap
 ┌──────┐ ┌──────────────────┐
 │ s1 ──┼─────────▶│ Student object │ name = "Maher", roll = 7
 ├──────┤ └──────────────────┘
 │ s2 ──┼─────────▶┌──────────────────┐
 └──────┘ │ Student object │ name = "Riya", roll = 12
 └──────────────────┘
```

Student s3 = s1; does not copy the object — s3 and s1 now point to the same object.

### Example — class with fields and methods

```
class Student {
 String name;
 int roll;
 double spi;
```

```
 void display() {
 System.out.println(roll + " " + name + " " + spi);
 }
 boolean isTopper() {
 return spi >= 9.0;
 }
}
public class StudentDemo {
 public static void main(String[] args) {
 Student s1 = new Student();
 s1.name = "Maher"; s1.roll = 7; s1.spi = 9.2;
 Student s2 = new Student();
 s2.name = "Riya"; s2.roll = 12; s2.spi = 8.4;
 s1.display();
 s2.display();
 System.out.println(s1.isTopper() + " " + s2.isTopper());
 Student s3 = s1; // same object as s1
 s3.spi = 9.9;
 System.out.println(s1.spi);
 }
}
```

Output:

```
7 Maher 9.2
12 Riya 8.4
true false
9.9
```

The last line shows that s3 and s1 are the same object — changing through s3 changed s1.

### Class vs object

| Class | Object |
|---|---|
| Blueprint / template | Instance of the class |
| Logical entity | Physical entity (exists in memory) |
| Declared once with class | Created many times with new |
| No memory for fields when declared | Memory allocated on the heap |
| e.g., Student | e.g., s1 , s2 |

## 2.3 Access control — access modifiers

Access modifiers decide who can see a class member.

| modifiers decide | who can see | a class member. |  |  |
|---|---|---|---|---|
| Modifier | Same class | Same package (subclass or not) | Subclass in other package | Other package, non-subclass |
| private | ✔ | ✘ | ✘ | ✘ |
| default (no keyword, “package- private”/“friendly”) | ✔ | ✔ | ✘ | ✘ |
| protected | ✔ | ✔ | ✔ | ✘ |
| public | ✔ | ✔ | ✔ | ✔ |

Memory trick, from most restrictive to least: private < default < protected < public. - Use private for fields (encapsulation), public for methods others must call, protected for things subclasses need. - A top-level class can only be public or default.

## 2.4 Methods

> In one line: a method is a named block of statements that performs a task, which you can call whenever needed.

```
returnType methodName(parameterList) {
 // body
 return value; // if returnType is not void
}
```

returnType — type of value returned ( int , double , String , void = nothing).

parameters — values the method receives; the values passed when calling are arguments.

method signature = method name + parameter list (number, types, order) — the return type is not part of the signature.

Rules: a non-void method must return a value of that type on every path; Java passes arguments by value — for primitives the method gets a copy (changes don’t affect the caller); for objects it gets a copy of the reference, so it can change the object’s fields.

```
class Calculator {
 int add(int a, int b) { return a + b; } // returns a value
 void greet(String name) { System.out.println("Hi " + name); } // returns nothing
 void tryChange(int x) { x = 100; } // changes only the local copy
}
public class MethodDemo {
 public static void main(String[] args) {
 Calculator c = new Calculator();
 int r = c.add(4, 6);
 System.out.println(r);
 c.greet("Maher");
 int n = 5;
 c.tryChange(n);
 System.out.println(n);
 }
}
```

Output:

```
10
Hi Maher
5
```

## 2.5 Method overloading (compile-time polymorphism)

> In one line: several methods in the same class with the same name but different parameter lists (different number, type or order of parameters).

Analogy: the word “play” — play cricket, play the guitar, play a video. Same word; the meaning is decided by what follows it. The compiler decides which method to call by looking at the arguments.

```
class Area {
 double area(double r) { return 3.14 * r * r; } // circle
 int area(int l, int b) { return l * b; } // rectangle
 double area(double b, double h, boolean tri) { return 0.5 * b * h; } // triangle
}
public class OverloadDemo {
 static int max(int a, int b) { return a > b ? a : b; }
 static double max(double a, double b) { return a > b ? a : b; }
 static int max(int a, int b, int c) { return max(max(a, b), c); }
 public static void main(String[] args) {
 Area a = new Area();
 System.out.println(a.area(2.0));
 System.out.println(a.area(4, 5));
 System.out.println(a.area(6, 4, true));
 System.out.println(max(3, 9) + " " + max(2.5, 1.5) + " " + max(4, 8, 6));
 }
}
```

Output:

```
12.56
20
12.0
9 2.5 8
```

Rules: 1. Parameter lists must differ in number, type, or order. 2. Changing only the return type is NOT overloading — int f(int) and double f(int) together is a compile error. 3. Resolved at compile time → static polymorphism.

## 2.6 Constructors

> In one line: a constructor is a special method that initialises a new object — it runs automatically when you use new .

### Key features

1. Same name as the class.

2. No return type — not even void .

3. Called automatically, once per object, by new .

4. Can be overloaded.

5. Can’t be static , final or abstract .

6. If you write no constructor, Java provides a default constructor (no arguments) that sets fields to default values (0, null, false). If you write any constructor, the default one is not provided.

| Constructor | Method |
|---|---|
| Initialises an object | Performs an operation |
| Same name as class | Any name |
| No return type | Must have a return type (or void) |
| Called automatically by new | Called explicitly |
| Not inherited | Inherited |
| Default one provided by compiler | No default method provided |

### Types of constructors

(1) Default constructor — provided by the compiler when you write none. (2) No-argument constructor — written by you, with no parameters. (3) Parameterised constructor — takes arguments to set fields. (4) Copy constructor — takes an object of the same class and copies

its fields (Java has no built-in one; you write it). (5) Private constructor — prevents creating objects from outside the class (used in the Singleton pattern and utility classes).

```
class Box {
 double w, h, d;
 Box() { // no-argument constructor
 w = h = d = 1;
 }
 Box(double w, double h, double d) { // parameterised
 this.w = w; // this.w = the field, w = the parameter
 this.h = h;
 this.d = d;
 }
 Box(double side) { // overloaded: cube
 this(side, side, side); // calls the 3-argument constructor
 }
 Box(Box other) { // copy constructor
 this(other.w, other.h, other.d);
 }
 double volume() { return w * h * d; }
}
public class ConstructorDemo {
 public static void main(String[] args) {
 Box b1 = new Box();
 Box b2 = new Box(2, 3, 4);
 Box b3 = new Box(5);
 Box b4 = new Box(b2);
 System.out.println(b1.volume() + " " + b2.volume() + " " + b3.volume() + " " +
b4.volume());
 }
}
```

Output:

```
1.0 24.0 125.0 24.0
```

This one class shows constructor overloading: four constructors with different parameter lists; Java picks one based on the arguments given to new .

### Private constructor example (Singleton — only one object ever)

```
class Config {
 private static Config instance;
 private Config() { System.out.println("Config created"); } // can't call new Config()
outside
 static Config getInstance() {
 if (instance == null) instance = new Config();
 return instance;
 }
}
public class SingletonDemo {
 public static void main(String[] args) {
 Config a = Config.getInstance();
 Config b = Config.getInstance();
 System.out.println(a == b);
 }
}
```

Output:

```
Config created
true
```

## 2.7 The this keyword

this is a reference to the current object — the object whose method/constructor is running. Uses: 1. Distinguish fields from parameters with the same name: this.name = name; 2. Call another constructor of the same class: this(…) — must be the first statement. 3. Pass the current object to another method: obj.register(this); 4. Return the current object (method chaining): return this;

## 2.8 The static keyword

> In one line: a static member belongs to the class itself, not to any object — there is one shared copy.

Analogy: in a classroom, each student has their own notebook (instance variable), but there is one whiteboard shared by all (static variable).

Static variable: shared by all objects (e.g., a counter of how many objects were made). Access with ClassName.var .

Static method: can be called without an object ( Math.sqrt(16) , main ). Can access only static data and call only static methods directly; cannot use this or super .

Static block: runs once, when the class is loaded — used to initialise static variables.

```
class Counter {
 static int count = 0; // shared by all objects
 int id; // each object has its own
 static { System.out.println("Class loaded"); } // static block
 Counter() { count++; id = count; }
 static void showCount() { System.out.println("Objects = " + count); }
}
public class StaticDemo {
 public static void main(String[] args) {
 Counter a = new Counter();
 Counter b = new Counter();
 Counter c = new Counter();
 System.out.println(a.id + " " + b.id + " " + c.id);
 Counter.showCount();
 }
}
```

Output:

```
Class loaded
1 2 3
Objects = 3
```

## 2.9 Garbage collection and finalisation

Objects no longer referenced by any variable become garbage. The JVM’s garbage collector automatically frees their memory — Java has no delete / free . You can request collection with System.gc() , but the JVM decides when. (The old finalize() method, called before collection, is deprecated.)

### Unit 2 — Common mistakes

Giving a constructor a return type ( void Box() becomes an ordinary method, not a constructor).

Expecting the default constructor to exist after writing a parameterised one ( new Box() then fails).

Thinking Student s3 = s1; copies the object (it copies the reference).

Overloading by changing only the return type.

Accessing an instance variable from static main directly without an object.

## Unit 2 — What to write in the exam

Four pillars → definition + real-life example + small code for each.

Class vs object → table + memory diagram.

Constructor → features, types (default, no-arg, parameterised, copy, private), overloading, constructor vs method table, with code.

Access modifiers → the 4 × 4 table.

Method overloading → rules + example.

static → variable/method/block with the counter program.

### Unit 2 — Check yourself

1. What is printed by new Counter() three times then Counter.count ? 2. Is int f(int a) and int f(int b) valid overloading? 3. Can a constructor be private? Why? 4. Which modifier allows access from a subclass in another package but not from unrelated classes there?

Answers: 1) 3. 2) No — same signature (parameter names don’t matter). 3) Yes — to stop outside code from creating objects (Singleton, utility classes). 4) protected.

# Inheritance and Interfaces

## 3.1 Inheritance

> In one line: inheritance lets a new class (subclass) reuse the fields and methods of an existing class (superclass) and add or change what it needs, using the keyword extends .

### Understand it

Family analogy. A child inherits surname, eye colour and house from the parents without “rewriting” them, and also has their own skills. Similarly, class Car extends Vehicle gets everything Vehicle has, and adds airConditioner() .

Inheritance models an “is-a” relationship: a Car is a Vehicle, a Dog is an Animal, a

SavingsAccount is an Account. If the sentence “X is a Y” sounds wrong, don’t use

inheritance.

Terms: superclass = parent = base class; subclass = child = derived class.

### Syntax and rules

```
class Subclass extends Superclass {
 // extra fields and methods
}
```

1. A subclass inherits all non-private members of the superclass. Private members are not accessible in the subclass (they exist inside the object but can be reached only via public/protected methods).

2. Constructors are not inherited (but the subclass constructor calls the superclass

constructor — see super ).

3. Java does not support multiple inheritance of classes — a class can extend only one class. (Reason: the diamond problem — if B and C both define show() and D extends both, which show() does D get?) Multiple inheritance of types is achieved with interfaces.

4. Every class implicitly extends Object , the root of the Java class hierarchy.

### Types of inheritance

| Single Hybrid A (combination) │ B | Multilevel Hierarchical Multiple (NOT with classes) A A A B │ / \| \ \ / B B C D C ← only via interfaces │ C |
|---|---|
| Type | Meaning Supported with classes? |
| Single | one subclass extends one superclass ✔ |
| Multilevel | C extends B, B extends A (a chain) ✔ |
| Hierarchical | many subclasses extend one superclass ✔ |
| Multiple | one class extends two classes ✘ (use interfaces) |
| Hybrid | mix of the above only via interfaces |

### Example — multilevel inheritance

```
class Animal {
 String name;
 void eat() { System.out.println(name + " eats"); }
}
class Dog extends Animal { // Dog IS-A Animal
 void bark() { System.out.println(name + " barks"); }
}
class Puppy extends Dog { // Puppy IS-A Dog (and an Animal)
 void weep() { System.out.println(name + " weeps"); }
}
public class InheritDemo {
 public static void main(String[] args) {
 Puppy p = new Puppy();
 p.name = "Tommy"; // inherited field from Animal
 p.eat(); // from Animal
 p.bark(); // from Dog
 p.weep(); // its own
 }
}
```

Output:

```
Tommy eats
Tommy barks
Tommy weeps
```

## 3.2 The super keyword and constructor order

super refers to the immediate superclass. Three uses: 1. super(args) — call the superclass constructor (must be the first statement in the subclass constructor). 2. super.method() — call the superclass version of an overridden method. 3. super.field — access a superclass field hidden by a subclass field of the same name.

Constructor execution order: when you create a subclass object, constructors run from the top of the hierarchy down — superclass first, then subclass. If you don’t write super(…) , Java inserts super() (no-arg) automatically.

```
class A {
 A() { System.out.println("A constructor"); }
}
class B extends A {
 B() { System.out.println("B constructor"); } // super() inserted automatically
}
class C extends B {
 C() { System.out.println("C constructor"); }
}
public class OrderDemo {
 public static void main(String[] args) {
 new C();
 }
}
```

Output:

```
A constructor
B constructor
C constructor
```

Why top-down? A child object is built on top of its parent part — the parent part must be ready first (like building the ground floor before the first floor).

### super with parameters and with methods (your slide’s example)

```
class Base {
 int x;
 Base(int x) { this.x = x; }
 void show() { System.out.println("Super class x = " + x); }
}
class Derived extends Base {
 int y;
 Derived(int a, int b) {
 super(a); // calls Base(int) — sets x
 y = b;
 }
 @Override
 void show() {
 super.show(); // first run Base's show()
 System.out.println("Sub class y = " + y);
 }
}
public class SuperDemo {
 public static void main(String[] args) {
 Derived ob = new Derived(10, 24);
 ob.show();
 }
}
```

Output:

```
Super class x = 10
Sub class y = 24
```

## 3.3 Polymorphism — overloading vs overriding

Polymorphism = “many forms”: one name, different behaviours.

### Method overriding (run-time polymorphism)

> In one line: a subclass provides its own version of a method that already exists in the superclass, with the same name, same parameters and same (or covariant) return type.

Analogy: every bird can makeSound() , but a crow caws and a parrot talks. The

superclass says what (makeSound); each subclass decides how.

Rules of overriding 1. Same method name and same parameter list. 2. Same return type (or a subclass of it — covariant return). 3. Access can’t be more restrictive (a public method can’t be overridden as protected ). 4. final , static and private methods can’t be overridden. 5. Use the @Override annotation — the compiler then checks that you really override something.

### Dynamic method dispatch — the heart of run-time polymorphism

A superclass reference can point to a subclass object. When an overridden method is called through it, the JVM decides at run time which version to run — based on the actual object, not the reference type.

```
class Shape {
 double area() { return 0; }
 String name() { return "Shape"; }
}
class Circle extends Shape {
 double r;
 Circle(double r) { this.r = r; }
 @Override double area() { return 3.14 * r * r; }
 @Override String name() { return "Circle"; }
}
class Rect extends Shape {
 double l, b;
 Rect(double l, double b) { this.l = l; this.b = b; }
 @Override double area() { return l * b; }
 @Override String name() { return "Rectangle"; }
}
public class DispatchDemo {
 public static void main(String[] args) {
 Shape[] shapes = { new Circle(1), new Rect(3, 4), new Shape() };
 for (Shape s : shapes) // reference type is always Shape...
 System.out.println(s.name() + " area = " + s.area()); // ...but the object
decides
 }
}
```

Output:

```
Circle area = 3.14
Rectangle area = 12.0
Shape area = 0.0
```

The loop code never mentions Circle or Rect — yet each object runs its own area() . Adding a new shape later needs no change to this loop. That is the power of polymorphism.

### Overloading vs overriding (very common question)

| Overloading vs overriding | (very common question) |  |
|---|---|---|
| Basis | Overloading | Overriding |
| Where | Same class (or subclass) | Superclass and subclass |
| Method name | Same | Same |
| Parameters | Must differ | Must be the same |
| Return type | Can differ (doesn’t matter alone) | Same / covariant |
| Decided at | Compile time (static polymorphism) | Run time (dynamic polymorphism) |
| Inheritance needed? | No | Yes |
| static/final/private methods | Can be overloaded | Cannot be overridden |
| Purpose | Same action, different inputs | Change inherited behaviour |

## 3.4 The final keyword

final means “cannot be changed further”:

| means “cannot be changed | further”: |  |
|---|---|---|
| Used on | Effect | Example |
| Variable | value can’t be reassigned (a constant) | final int MAX = 100; |
| Method | can’t be overridden by subclasses | final void show() |
| Class | can’t be extended (no subclasses) | final class String (Java’s String is final) |
| Parameter | can’t be changed inside the method | void f(final int x) |

Final reference variable: final Student s = new Student(); — s can’t point to another object, but the object’s fields can still change ( s.name = "X" is allowed). A final variable not initialised at declaration (blank final) must be set in the constructor.

## 3.5 Abstract classes

> In one line: an abstract class is an incomplete class — it can have methods without a body (abstract methods) that subclasses must implement. You cannot create objects of it.

Analogy: “Shape” by itself can’t be drawn — you can only draw a circle or a square. Shape is a concept (abstract); Circle is concrete. The abstract class says “every shape must have area()”, but leaves the formula to each shape.

Rules 1. Declared with abstract : abstract class Shape { … } . 2. Can’t be instantiated: new Shape() is an error. But you can have a reference: Shape s = new Circle(); . 3. Can contain abstract methods ( abstract double area(); — no body, ends with ; ) and concrete methods, fields and constructors. 4. A subclass must implement all abstract methods, or else be declared abstract itself. 5. If a class has even one abstract method, the class must be abstract.

6. abstract can’t be combined with final , static or private on a method.

```
abstract class Parent {
 abstract void abstractMethod(); // no body
 void concreteMethod() {
 System.out.println("This is a concrete method.");
 }
}
class Child extends Parent {
 @Override
 void abstractMethod() { // MUST implement
 System.out.println("Child implements abstractMethod.");
 }
}
public class AbstractDemo {
 public static void main(String[] args) {
 Parent p = new Child(); // reference of abstract type
 p.abstractMethod();
 p.concreteMethod();
 System.out.println(p instanceof Parent);
 System.out.println(p instanceof Child);
 }
}
```

Output:

```
Child implements abstractMethod.
This is a concrete method.
true
true
```

## 3.6 The instanceof operator

object instanceof ClassName returns true if the object is an instance of that class or any of its subclasses (or implements that interface), otherwise false. Used before downcasting to avoid a ClassCastException :

```
Shape s = new Circle(2);
if (s instanceof Circle) {
 Circle c = (Circle) s; // safe downcast
}
```

null instanceof X is always false.

## 3.7 Interfaces

> In one line: an interface is a pure contract — a list of methods a class promises to provide, with no implementation (traditionally), declared with interface and adopted with implements .

Analogy: a USB standard. It doesn’t say how a pen drive or a mouse works inside; it says “if you are USB, you must have these pins and respond in this way”. Any device that implements USB can plug into any USB port. Similarly, any class implementing Printable can be passed wherever a Printable is expected.

### Rules

1. Methods are implicitly public abstract (no body).

2. Variables are implicitly public static final — i.e., constants.

3. No constructors; can’t be instantiated.

4. A class uses implements and must implement every method as public (or be abstract).

5. A class can implement many interfaces → this is how Java achieves multiple inheritance: class C extends B implements I1, I2 .

6. An interface can extend other interfaces (even several): interface I3 extends I1, I2 .

7. Since Java 8, interfaces may also have default and static methods with bodies; Java 9 added private methods.

```
interface Area {
 float PI = 3.14F; // public static final constant
 float compute(float x, float y); // public abstract
}
interface Printable {
 void print();
}
class Rectangle implements Area, Printable { // multiple interfaces
 public float compute(float x, float y) { return x * y; } // must be public
 public void print() { System.out.println("I am a rectangle"); }
}
class Circle implements Area {
 public float compute(float r, float unused) { return PI * r * r; }
}
public class InterfaceDemo {
 public static void main(String[] args) {
 Area a = new Rectangle(); // interface reference
 System.out.println("Area of rectangle = " + a.compute(10, 20));
 a = new Circle();
 System.out.println("Area of circle = " + a.compute(10, 0));
 ((Printable) new Rectangle()).print();
 }
}
```

Output:

```
Area of rectangle = 200.0
Area of circle = 314.0
I am a rectangle
```

### Interface vs abstract class (very common question)

| Interface vs abstract class | (very common question) |  |
|---|---|---|
| Basis | Interface | Abstract class |
| Keyword to use it | implements | extends |
| Multiple inheritance | Yes — a class can implement many | No — a class extends one |
| Methods | abstract by default (public); default/static allowed since Java 8 | abstract and concrete methods |
| Variables | only public static final constants | any kind of fields |
| Constructors | No | Yes |
| Access modifiers of methods | public | any |
| Speed of adding a method | breaks all implementing classes (unless default) | can add concrete methods safely |
| Use when | unrelated classes share a capability (“can fly”, “is printable”) | closely related classes share code (“is a shape”) |

## 3.8 Nested and inner classes

A nested class is a class defined inside another class. It can access all members of the enclosing class, even private ones; the outer class accesses the inner class’s members through an object of it. Used to group helper classes logically and for event handling in GUIs (Unit 4).

| object of it. Used to group helper | classes logically and for event | handling in GUIs (Unit 4). |
|---|---|---|
| Kind | Declared | Key point |
| Static nested class | static class Inner inside Outer | Can’t access the outer class’s instance members directly (needs an object); created without an outer object: new Outer.Inner() |
| Inner (non-static) class | class Inner inside Outer | Can access all outer members directly; needs an outer object: outer.new Inner() |
| Local inner class | a inside method | Visible only in that method |
| Anonymous inner class | no class with name, created in one expression | Used for one-off implementations — e.g., event handlers |

```
class Outer {
 private int x = 10;
 static int s = 5;
 class Inner { // inner class
 void show() { System.out.println("Inner sees x = " + x); }
 }
 static class Nested { // static nested class
 void show() { System.out.println("Nested sees s = " + s); }
 }
}
interface Greeter { void greet(); }
public class NestedDemo {
 public static void main(String[] args) {
 Outer o = new Outer();
 Outer.Inner in = o.new Inner();
 in.show();
 Outer.Nested n = new Outer.Nested();
 n.show();
 Greeter g = new Greeter() { // anonymous inner class
 public void greet() { System.out.println("Hello from anonymous class"); }
 };
 g.greet();
 }
}
```

Output:

```
Inner sees x = 10
Nested sees s = 5
Hello from anonymous class
```

## 3.9 Packages

> In one line: a package is a folder-like container that groups related classes and interfaces.

Why packages? 1. Organisation / reuse — related classes kept together. 2. Prevent name conflicts — college.Student and hospital.Student can coexist. 3. Access control / hiding — default-access classes are visible only inside their package.

### System (built-in) packages — the Java API

| Package | Contains |
|---|---|
| java.lang | Language basics: String, Math, System, wrapper classes, Thread, exceptions — imported automatically |
| java.util | Utilities: Scanner, ArrayList, HashMap, Random, Date, Vector |
| java.io | Input/output: File, streams, readers, writers |
| java.net | Networking: URL, Socket |
| java.awt | Abstract Window Toolkit (older GUI) |
| java.applet | Applets (obsolete) |
| javafx.* | Modern GUI (Unit 4) |

### Creating and using your own package

```
// File: mypack/Greeting.java
package mypack; // must be the FIRST statement
public class Greeting { // public so other packages can use it
 public void hello() { System.out.println("Hello from mypack"); }
}
```

```
// File: Main.java (outside the folder)
import mypack.Greeting; // or: import mypack.*;
public class Main {
 public static void main(String[] args) {
 new Greeting().hello();
 }
}
```

Compile & run:

```
javac -d . mypack/Greeting.java (-d . creates the mypack folder for the .class)
javac Main.java
java Main
```

Naming convention: all lowercase, often a reversed domain: in.ac.itmbu.cse .

import pkg.ClassName; imports one class; import pkg.*; imports all public classes of that package (not sub-packages).

You can also use a fully qualified name without import: java.util.Scanner sc = new

```
java.util.Scanner(System.in);
```

Hiding a class: don’t declare it public — then it’s visible only within its own package.

### CLASSPATH

The CLASSPATH is an environment variable (or -cp option) telling the JVM and compiler where to look for .class files and packages. Needed when your classes or libraries are not in the current directory.

```
javac -d C:\myclasses Greeting.java (put compiled classes there)
java -cp C:\myclasses;. Main (search there and in the current folder)
set CLASSPATH=C:\myclasses;. (Windows, for the session)
set PATH=C:\Program Files\Java\jdk-21\bin (PATH lets the OS find javac/java themselves)
```

PATH vs CLASSPATH: PATH helps the operating system find programs like javac ; CLASSPATH helps Java find classes.

### Unit 3 — Common mistakes

Trying class C extends A, B (not allowed).

Calling super(...) anywhere except the first line of a constructor.

Implementing an interface method without public (compile error: weaker access).

Instantiating an abstract class ( new Shape() ).

Thinking overriding is decided by the reference type (it’s the object type).

Forgetting -d . when compiling a packaged class.

## Unit 3 — What to write in the exam

Inheritance → definition, is-a, types diagram, rules, multilevel example.

super → three uses + constructor-order program.

Overloading vs overriding → table + dynamic dispatch program.

final → 4 uses table.

Abstract class vs interface → definitions, rules, program each, comparison table.

Packages → why, built-in list, create/import steps, CLASSPATH.

### Unit 3 — Check yourself

1. Order of constructor calls for new C() where C extends B extends A? 2. Can an interface have a constructor? 3. final on a class means? 4. A superclass reference holds a subclass object and calls an overridden method — which version runs? 5. Which package is imported automatically?

Answers: 1) A, B, C. 2) No. 3) It can’t be extended. 4) The subclass version (decided at run time). 5) java.lang.

# JavaFX: GUI and Event-Driven Programming

## 4.1 What is JavaFX?

> In one line: JavaFX is Java’s modern library for building graphical user interfaces (GUIs) — windows, buttons, text boxes, shapes, images, charts, animations and media — for desktop (and other) applications.

### Understand it

Until now every program talked to you through the console (text in, text out). Real apps have windows you click. JavaFX gives you ready-made pieces (controls like Button, TextField) and a way to react when the user clicks or types (event handling). It replaced the older AWT and Swing libraries as Java’s recommended GUI toolkit.

Theatre analogy — remember this, it explains the whole structure: - Stage = the theatre stage (the window). - Scene = the current scene of the play (what’s shown inside the window). - Nodes = the actors and props (buttons, labels, shapes) arranged in a scene graph (a tree).

### Features of JavaFX

Written in Java — use all Java libraries; also usable from other JVM languages.

FXML — an XML-based language to design the UI separately from the code (like HTML).

Scene Builder — drag-and-drop tool that generates FXML.

CSS styling — style controls with CSS like a web page.

Rich set of UI controls — Button, Label, TextField, CheckBox, ComboBox, TableView, TreeView, charts…

2D and 3D graphics, visual effects (shadow, blur), animations/transitions.

WebView — embed web pages (HTML5, CSS, JavaScript).

Media — play audio and video.

Hardware-accelerated graphics (via Prism, using the GPU).

Swing interoperability — JavaFX content can be embedded in Swing apps and vice versa.

Self-contained deployment — package app + runtime together.

### Installing / setting up JavaFX

Since JDK 11, JavaFX is not part of the JDK; it’s a separate open-source project (OpenJFX). Download the JavaFX SDK (or add it with Maven/Gradle), then compile and run with the module path:

```
javac --module-path "C:\javafx-sdk\lib" --add-modules javafx.controls MyApp.java
java --module-path "C:\javafx-sdk\lib" --add-modules javafx.controls MyApp
```

(In IDEs like IntelliJ/NetBeans/Eclipse you add the JavaFX library to the project and the same VM options.)

## 4.2 Architecture of the JavaFX API

```
 ┌────────────────────────────────────────────────────────────────────────┐
 │ JavaFX Public APIs and Scene Graph │
 ├────────────────────────────────────────────────────────────────────────┤
 │ Quantum Toolkit │
 ├───────────────────────────┬──────────────────────┬───────────────┬─────┤
 │ Prism (graphics) │ Glass Windowing │ Media Engine │ Web │
 │ Java2D · OpenGL · D3D │ Toolkit (GWT) │ (GStreamer) │ Engine
 │ │ Win32 / GTK / Mac │ │(WebKit)
 ├───────────────────────────┴──────────────────────┴───────────────┴─────┤
 │ JDK API and Java Virtual Machine │
 └────────────────────────────────────────────────────────────────────────┘
```

| Component | Role |
|---|---|
| Scene Graph | The tree of nodes that makes up the UI — the starting point of every JavaFX app |
| Public APIs | The classes you use (Stage, Scene, Button, …) |
| Quantum Toolkit | An abstraction layer that ties Prism, Glass, Media Engine and Web Engine together and makes them available to JavaFX; manages threading and rendering |
| Prism | The graphics/rendering engine; draws 2D and 3D using hardware acceleration — DirectX (D3D) on Windows, OpenGL on Mac/Linux, or Java2D when no GPU support |
| Glass Windowing Toolkit (GWT) | The lowest layer connecting JavaFX to the native operating system — creates windows, timers, surfaces, and manages the event queue (on Windows it uses Win32) |
| Media Engine | Plays audio and video; based on the open-source GStreamer |
| Web Engine / WebView | Displays HTML content using WebKit, an open- source browser engine — supports HTML5, CSS, JavaScript, DOM, SVG |
| JDK API & JVM | Everything runs on the standard Java platform |

## 4.3 Life cycle of a JavaFX application

A JavaFX app is a class that extends javafx.application.Application . The JavaFX runtime calls three methods, in order:

```
 main() → launch(args)
 │
 ▼
 1. constructor of your Application class
 │
 ▼
 2. init() — optional setup (no UI here); runs on the launcher thread
 │
 ▼
 3. start(Stage primaryStage) — ABSTRACT, must override; build and show the UI
 │ (runs on the JavaFX Application Thread)
 ▼
 app runs … waits for events
 │ (last window closed, or Platform.exit() called)
 ▼
 4. stop() — optional cleanup (save data, close files)
```

launch(args) (a static method of Application) starts the JavaFX runtime.

start() is the only method you must override.

init() and stop() have empty default implementations.

## 4.4 Structure of a JavaFX application — Stage, Scene, Scene Graph

```
 Stage (window)
 └── Scene (contents, has a size)
 └── Root node (e.g., Group, VBox, BorderPane)
 ├── Branch node (a layout pane / Group containing other nodes)
 │ ├── Leaf node (Button)
 │ └── Leaf node (Label)
 └── Leaf node (Circle)
```

### Stage

A stage is a window; it contains all the objects of the app. Class javafx.stage.Stage .

The primary stage is created by the platform and passed to start() .

Size via setWidth() / setHeight() ; title via setTitle() ; attach a scene with setScene() ; display with show() .

Five stage styles: Decorated (normal window with title bar), Undecorated (no border/title bar), Transparent (transparent background), Unified (no border between title bar and content), Utility (small tool window). stage.initStyle(StageStyle.UNDECORATED);

### Scene

Represents the physical contents of the window; class javafx.scene.Scene .

Created with the root node and optionally the size: new Scene(root, 600, 400) .

A scene can be added to only one stage at a time.

scene.setFill(Color.ORANGE) sets its background.

### Scene graph and nodes

A scene graph is a tree of all the visual elements (nodes). Class javafx.scene.Node . - Root node — the first node; has no parent ( Group , Region , WebView ). - Branch (parent) node — a node with children: Group, Region (layout panes, controls), WebView. - Leaf node — a node with no children: shapes (Rectangle, Circle), Text, ImageView, MediaView.

Node types: geometric objects (2D/3D shapes), UI controls (Button, CheckBox, TextArea…), containers/layout panes (BorderPane, GridPane, FlowPane…), media elements (audio, video, images).

## 4.5 Steps to create a JavaFX application

1. Extend the Application class (package javafx.application ).

2. Override start(Stage) .

3. Prepare a scene graph — create the nodes and a root node (e.g., Group ) holding them.

4. Prepare a Scene with the required dimensions and add the root node to it.

5. Prepare the Stage — set title, add the scene with setScene() , display with show() .

6. In main , call launch(args) .

### Basic example (from your slides) — line by line

```
import javafx.application.Application;
import javafx.scene.Group;
import javafx.scene.Scene;
import javafx.scene.paint.Color;
import javafx.stage.Stage;
```

```
public class MyFirstGUI extends Application { // step 1
 @Override
 public void start(Stage primaryStage) throws Exception { // step 2
 Group root = new Group(); // step 3: root node (empty)
 Scene s = new Scene(root, 600, 400); // step 4: 600 × 400 scene
 s.setFill(Color.ORANGE); // orange background
 primaryStage.setTitle("My First User Interface"); // step 5
 primaryStage.setScene(s);
 primaryStage.show(); // window appears
 }
 public static void main(String[] args) {
 launch(args); // step 6: start JavaFX
 }
}
```

Result: a 600 × 400 orange window titled “My First User Interface”.

### A program with a button and a label (controls + event)

```
import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;
```

```
public class ClickCounter extends Application {
 private int count = 0;
 @Override
 public void start(Stage stage) {
 Label label = new Label("Clicked 0 times");
 Button btn = new Button("Click me");
 btn.setOnAction(e -> { // event handler (lambda)
 count++;
 label.setText("Clicked " + count + " times");
 });
 VBox root = new VBox(10, label, btn); // vertical layout, 10px spacing
 stage.setScene(new Scene(root, 250, 120));
 stage.setTitle("Counter");
 stage.show();
 }
 public static void main(String[] args) { launch(args); }
}
```

Each click updates the label: “Clicked 1 times”, “Clicked 2 times”, …

## 4.6 2D shapes

All shapes are in javafx.scene.shape and extend Shape (a Node). Create the shape, set its properties (constructor or setters), add it to the scene graph.

| Shape | Properties needed | Example |
|---|---|---|
| Line | startX, startY, endX, endY | new Line(10, 10, 200, 10) |
| Rectangle | x, y, width, height (+ arcWidth, arcHeight for rounded corners) | new Rectangle(50, 50, 200, 100) |
| Circle | centerX, centerY, radius | new Circle(150, 150, 60) |
| Ellipse | centerX, centerY, radiusX, radiusY | new Ellipse(200, 100, 80, 40) |
| Polygon (closed) | a list of points | p.getPoints().addAll(0.0,0.0 , 100.0,0.0, 50.0,80.0) |
| Polyline (open) | a list of points | same as Polygon but not closed |
| CubicCurve | start, end, two control points (controlX1/Y1, controlX2/Y2) |  |
| QuadCurve | start, end, one control point |  |
| Arc | centerX, centerY, radiusX, radiusY, startAngle, length, type (OPEN, CHORD, ROUND) |  |
| SVGPath | an SVG path string |  |

The JavaFX coordinate system: origin (0, 0) at the top-left; x grows to the right, y grows downward.

### Colour, stroke, text and images

shape.setFill(Color.BLUE) — inside colour; shape.setStroke(Color.BLACK) — outline colour; setStrokeWidth(3) .

Colours: Color.RED , Color.rgb(255, 128, 0) , Color.web("#1e90ff") ; gradients:

LinearGradient , RadialGradient .

Text: Text t = new Text(50, 50, "Hello"); t.setFont(Font.font("Verdana", 20));

Images (package javafx.scene.image ): load with Image , display with ImageView . Formats: BMP, GIF, JPEG, PNG.

```
import java.io.FileInputStream;
import javafx.application.Application;
import javafx.scene.Group;
import javafx.scene.Scene;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.paint.Color;
import javafx.scene.shape.*;
import javafx.stage.Stage;
```

```
public class ShapesDemo extends Application {
 @Override
 public void start(Stage stage) throws Exception {
 Circle c = new Circle(100, 100, 50);
 c.setFill(Color.TOMATO);
 c.setStroke(Color.BLACK);
 Rectangle r = new Rectangle(200, 60, 140, 80);
 r.setArcWidth(20); r.setArcHeight(20); // rounded corners
 r.setFill(Color.LIGHTBLUE);
 Ellipse e = new Ellipse(100, 250, 80, 40);
 e.setFill(Color.GOLD);
 Line l = new Line(200, 200, 380, 300);
 l.setStrokeWidth(4);
 Image img = new Image(new FileInputStream("logo.png"));
 ImageView iv = new ImageView(img);
 iv.setX(400); iv.setY(50); iv.setFitWidth(150); iv.setPreserveRatio(true);
 Group root = new Group(c, r, e, l, iv);
 stage.setScene(new Scene(root, 600, 350, Color.WHITE));
 stage.setTitle("Shapes, colour and image");
 stage.show();
 }
 public static void main(String[] args) { launch(args); }
}
```

## 4.7 Layout panes

> In one line: a layout pane is a container that automatically arranges its child nodes (so you don’t have to calculate x/y positions). All are in javafx.scene.layout .

Layout

Arranges children…

Typical use

| HBox | in a single horizontal row | toolbar | of buttons |
|---|---|---|---|
| VBox | in a single vertical column | form | fields one below another |
| BorderPane | in five regions: top, bottom, left, right, center | main top, status | application window (menu bottom) |
| StackPane | on top of each other (stack), centred by default | text on | top of a shape/image |
| TextFlow | several Text nodes flowing as one paragraph | rich text |  |
| AnchorPane | anchors nodes at fixed distances from the pane’s edges | keep a bottom-right | button 10px from the |
| TilePane | in uniformly sized tiles (grid of equal cells) | photo | gallery |
| GridPane | in a grid of rows and columns | forms | (label + field in each row) |
| FlowPane | in a flow that wraps: a horizontal flow pane wraps to the next row at its width, a vertical one wraps to the next column at its height | tags, | chips |

```
 HBox: [A][B][C] VBox: [A] BorderPane: ┌────── top ──────┐
 [B] │left│center│right│
 [C] └──── bottom ─────┘
 GridPane: (0,0) (1,0) StackPane: ┌─────┐ FlowPane: [A][B][C][D]
 (0,1) (1,1) │ [B] │ on [A] [E][F] (wraps)
```

### Layout example (from your slides — a media-player bar)

```
import javafx.application.Application;
import javafx.geometry.Insets;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.scene.layout.*;
import javafx.stage.Stage;
```

```
public class LayoutExample extends Application {
 @Override
 public void start(Stage stage) {
 TextField textField = new TextField();
 Button playButton = new Button("Play");
 Button stopButton = new Button("Stop");
 HBox hbox = new HBox(); // horizontal row
 hbox.setSpacing(10); // 10px gap between children
 hbox.setPadding(new Insets(15)); // 15px border inside the box
 hbox.getChildren().addAll(textField, playButton, stopButton);
 Scene scene = new Scene(hbox);
 stage.setTitle("HBox layout");
 stage.setScene(scene);
 stage.show();
 }
 public static void main(String[] args) { launch(args); }
}
```

### GridPane login form

```
GridPane grid = new GridPane();
grid.setHgap(10); grid.setVgap(10); grid.setPadding(new Insets(20));
grid.add(new Label("Username:"), 0, 0); // (column, row)
grid.add(new TextField(), 1, 0);
grid.add(new Label("Password:"), 0, 1);
grid.add(new PasswordField(), 1, 1);
grid.add(new Button("Login"), 1, 2);
```

## 4.8 Event handling

> In one line: an event is a notification that something happened (a click, a key press, mouse movement); event handling is the code that reacts to it.

### Understand it

A console program runs top to bottom. A GUI program instead waits; the user decides what happens next. This style is called event-driven programming: you register “when this button is clicked, run this code”, and the program sleeps until it happens.

### Kinds of events (all subclasses of javafx.event.Event )

| Kinds of events (all subclasses of javafx.event.Event | ) |
|---|---|
| Event class | When it happens |
| ActionEvent | button pressed, menu item chosen, Enter in a text field |
| MouseEvent | mouse clicked, pressed, released, moved, dragged, entered, exited |
| KeyEvent | key pressed, released, typed |
| DragEvent | drag and drop |
| WindowEvent | window shown, hidden, closing |
| TouchEvent , SwipeEvent , ZoomEvent , ScrollEvent | touch screens / gestures |

Each event has a source (where it came from), a target (the node it is meant for), and a type (e.g., MouseEvent.MOUSE_CLICKED ).

### Phases of event handling (how an event travels)

1. Target selection — the system decides the target node: - Key events → the node that has focus. - Mouse events → the node at the cursor location. - Gesture events → the node at the centre of all touches at the start. - Swipe events → the node at the centre of the whole path of all fingers. - Touch events → the node where the touch was first pressed.

2. Route construction — the event dispatch chain is built: the path from the Stage down to the target node (Stage → Scene → root → … → target).

3. Event capturing phase — the event travels top-down from the stage to the target; any node on the path with an event filter registered runs it.

4. Event bubbling phase — the event travels bottom-up from the target back to the stage; any node with an event handler registered runs it.

```
 Stage ▲
 │ CAPTURING (filters) │ BUBBLING (handlers)
 Scene │
 │ │
 Root (VBox) │
 │ │
 Target (Button) ──────────────┘
```

Any filter or handler can call event.consume() to stop the event from travelling further.

### Event handlers vs event filters

Handler — runs in the bubbling phase. node.addEventHandler(type, handler) .

Filter — runs in the capturing phase (before handlers). node.addEventFilter(type, filter) .

Convenience methods register a handler for common events: setOnAction ,

setOnMouseClicked , setOnKeyPressed , setOnMouseEntered , …

### Three ways to write a handler

```
// (1) separate class implementing EventHandler
class MyHandler implements EventHandler<ActionEvent> {
 public void handle(ActionEvent e) { System.out.println("Clicked"); }
}
btn.setOnAction(new MyHandler());
```

```
// (2) anonymous inner class (your slides)
btn.setOnAction(new EventHandler<ActionEvent>() {
 @Override
 public void handle(ActionEvent e) { System.out.println("Clicked"); }
});
```

```
// (3) lambda expression (shortest, Java 8+)
btn.setOnAction(e -> System.out.println("Clicked"));
```

EventHandler<T> is an interface with a single method void handle(T event) .

### Mouse event example (from your slides)

```
import javafx.application.Application;
import javafx.event.EventHandler;
import javafx.scene.Group;
import javafx.scene.Scene;
import javafx.scene.input.MouseEvent;
import javafx.scene.paint.Color;
import javafx.scene.shape.Circle;
import javafx.stage.Stage;
```

```
public class MouseEventExample extends Application {
 @Override
 public void start(Stage primaryStage) {
 Circle circle = new Circle(150, 125, 40, Color.STEELBLUE);
 Group root = new Group(circle);
 Scene scene = new Scene(root, 300, 250);
 EventHandler<MouseEvent> mouseHandler = new EventHandler<MouseEvent>() {
 @Override
 public void handle(MouseEvent mouseEvent) {
 System.out.println(mouseEvent.getEventType() + "\n"
 + "X : Y - " + mouseEvent.getX() + " : " + mouseEvent.getY());
 }
 };
 circle.addEventHandler(MouseEvent.MOUSE_CLICKED, mouseHandler);
 circle.setOnMouseEntered(e -> circle.setFill(Color.ORANGE)); // hover colour
 circle.setOnMouseExited(e -> circle.setFill(Color.STEELBLUE));
 primaryStage.setTitle("Mouse events");
 primaryStage.setScene(scene);
 primaryStage.show();
 }
 public static void main(String[] args) { launch(args); }
}
```

Clicking the circle prints e.g. MOUSE_CLICKED and X : Y - 152.0 : 130.0 ; hovering turns it orange.

### Key event example

```
scene.setOnKeyPressed(e -> {
 switch (e.getCode()) {
 case UP: circle.setCenterY(circle.getCenterY() - 10); break;
 case DOWN: circle.setCenterY(circle.getCenterY() + 10); break;
 case LEFT: circle.setCenterX(circle.getCenterX() - 10); break;
 case RIGHT: circle.setCenterX(circle.getCenterX() + 10); break;
 default: break;
 }
});
```

Arrow keys move the circle.

## 4.9 Animation

| In one line: JavaFX’s javafx.animation move, rotate, scale, fade — with | package changes a node’s ready-made transition classes. | properties |
|---|---|---|
| Transition | Animates | Key settings |
| TranslateTransition | movement from one point to another | setByX/ByY (move setToX/ToY (move |
| RotateTransition | rotation | setByAngle / |
| ScaleTransition | size (zoom) — enlarge or shrink | setByX/ByY or |
| FadeTransition | opacity — fade in/out | setFromValue , invisible, 1 = opaque) |
| FillTransition | fill colour | setFromValue , (colours) |
| StrokeTransition | stroke colour |  |
| PathTransition | moves a node along a path (line, curve, any shape) |  |
|  |  | setPath(shape) |
| SequentialTransition | runs several transitions one after another |  |

setFromValue , setToValue (0 =

ParallelTransition

runs several transitions at the

same time

Common settings for every transition: setDuration(Duration.millis(2500)) , setNode(node) , setCycleCount(n) or Animation.INDEFINITE , setAutoReverse(true) , then play() (also pause() , stop() ).

### RotateTransition example (your slides)

```
import javafx.animation.RotateTransition;
import javafx.application.Application;
import javafx.scene.Group;
import javafx.scene.Scene;
import javafx.scene.paint.Color;
import javafx.scene.shape.Rectangle;
import javafx.stage.Stage;
import javafx.util.Duration;
```

```
public class AnimationExample extends Application {
 @Override
 public void start(Stage primaryStage) throws Exception {
 Rectangle rect = new Rectangle(400, 150, 200, 400); // x, y, width, height
 rect.setFill(Color.CORNFLOWERBLUE);
 Group root = new Group(rect);
 Scene s = new Scene(root, 1000, 700);
 Duration dt = new Duration(2500); // 2.5 seconds per cycle
 RotateTransition rt = new RotateTransition(dt, rect);
 rt.setByAngle(360); // full turn
 rt.setCycleCount(50);
 rt.setAutoReverse(true); // turn back the other way
 rt.play();
 primaryStage.setScene(s);
 primaryStage.setTitle("Rotate Transition");
 primaryStage.show();
 }
 public static void main(String[] args) { launch(args); }
}
```

### Fade + translate together

```
FadeTransition ft = new FadeTransition(Duration.seconds(2), circle);
ft.setFromValue(1.0); ft.setToValue(0.2);
TranslateTransition tt = new TranslateTransition(Duration.seconds(2), circle);
tt.setByX(300);
ParallelTransition pt = new ParallelTransition(ft, tt);
pt.setCycleCount(Animation.INDEFINITE); pt.setAutoReverse(true);
pt.play();
```

### Unit 4 — Common mistakes

Forgetting primaryStage.show() — nothing appears.

Forgetting launch(args) in main.

Adding the same node to two parents (a node can have only one parent).

Mixing up capturing (filters, top-down) and bubbling (handlers, bottom-up).

Thinking y increases upward (it increases downward).

Using JDK 11+ without adding the JavaFX SDK to the module path.

## Unit 4 — What to write in the exam

What is JavaFX + features (list of 8–10).

Architecture → layered diagram + role of Prism, Glass, Quantum, Media, Web engine.

Life cycle → init/start/stop diagram.

Stage, Scene, Scene graph → theatre analogy + tree diagram + node types + stage styles.

Steps to create an app + the basic example.

Layouts → table + small diagrams.

Event handling → event types, 4 phases, handler vs filter, code example.

Animation → transitions table + RotateTransition program.

### Unit 4 — Check yourself

1. Which method must every JavaFX application override? 2. Which layout is best for a login form? 3. In which phase do event filters run? 4. What do Prism and Glass do? 5. Which transition makes a node fade out?

Answers: 1) start(Stage). 2) GridPane. 3) Capturing (top-down). 4) Prism renders graphics

(D3D/OpenGL); Glass connects to the native OS windowing system and event queue. 5) FadeTransition.

# Class Modeling (UML), Java I/O, Exceptions and Multithreading

## 5.1 Class modeling and UML

> In one line: class modeling describes a system’s objects, their classes, attributes, operations and relationships in a diagram — using UML (Unified Modeling Language) — before writing code.

### Understand it

Before building a house you draw a plan, so that everyone (owner, architect, builder) agrees. Before writing a large program, developers draw a class diagram for the same reason. It’s language-independent: the same diagram can be coded in Java, C++ or Python.

UML is an OMG (Object Management Group) standard, an object-oriented visual modeling language used to represent classes, objects and their relationships (plus behaviour diagrams like use-case, sequence and activity diagrams).

Class diagram — shows classes and the relationships between them (general, reusable description).

Object diagram — shows particular objects (instances) with actual values at a moment.

### UML representation of a class

```
 ┌────────────────────────────┐
 │ Student │ ← 1. class name (bold, starts with a capital)
 ├────────────────────────────┤
 │ - studentId : int │ ← 2. attributes (visibility name : Type)
 │ - name : String │
 │ # spi : double = 0.0 │
 ├────────────────────────────┤
 │ + enroll(c : Course) : void│ ← 3. operations (visibility name(params) : ReturnType)
 │ + getSpi() : double │
 └────────────────────────────┘
 Visibility: + public - private # protected ~ package (default)
 Static members are underlined; abstract classes/operations are written in italics.
```

The same class in Java:

```
class Student {
 private int studentId;
 private String name;
 protected double spi = 0.0;
 public void enroll(Course c) { /* … */ }
 public double getSpi() { return spi; }
}
```

### UML representation of an object

An object box shows objectName : ClassName (underlined) and attribute = value pairs:

```
 ┌──────────────────────────┐
 │ maher : Student │ (underlined)
 ├──────────────────────────┤
 │ studentId = 25021007 │
 │ name = "Maher" │
 │ spi = 9.2 │
 └──────────────────────────┘
```

## 5.2 Values and attributes

An attribute is a named property of a class describing a data value held by each object (e.g., name , birthdate , weight of a Person).

A value is a piece of data — the actual value an attribute has in a particular object (“Maher”, 9.2).

Each attribute has one value for each object; different objects can have the same or different values.

Attribute values should be pure data, not objects — if something is an object with its own identity (e.g., the Company a person works for), model it as a class connected by an association, not as an attribute.

## 5.3 Object identifiers (object identity)

> In one line: every object has its own identity — it is a distinct object even if all its attribute values are equal to another object’s.

Two identical twins, same height, same clothes — still two different people. Two Student objects with name “Raj” and SPI 8 are still two objects.

Identity — what distinguishes this object from every other (in Java: its reference/memory location; compare with == ).

State — the current values of its attributes (compare with equals() if defined).

Class membership — which structure and operations it follows.

In a class model, identity is implicit — you don’t need to add an “id” attribute just to tell objects apart (an implementation may later add a database key). Changing an object’s state doesn’t make it a different object, and equal values don’t prove two references are the same object.

```
public class IdentityDemo {
 public static void main(String[] args) {
 String a = new String("Raj");
 String b = new String("Raj");
 String c = a;
 System.out.println(a == b); // different identities
 System.out.println(a.equals(b)); // same state (value)
 System.out.println(a == c); // same object
 }
}
```

Output:

```
false
true
true
```

## 5.4 Operations and methods

Operation — a function or procedure that may be applied to or by objects of a class (e.g., hire , fire , payDividend for Company; deposit(amount) for Account). - Each operation has the target object as an implicit argument (the object you call it on). - All objects of a class share the same operations. - The behaviour of an operation depends on the class of its target. - Polymorphic operation: the same operation applies to many classes (e.g., calculateArea() for Circle and Rectangle).

Method — the implementation of an operation for a class (the actual code). - Each class may implement a polymorphic operation with a different method (different code). - An operation may have arguments besides the target, as placeholders for values or objects. - Signature: when an operation has methods in several classes, they must have the same signature — the number and types of arguments and the type of the result.

```
 Operation (in the model): calculateArea() : double
 Circle method: area = π × radius × radius
 Rectangle method: area = width × height
```

Operation = the promise (“what”); method = the code that keeps the promise (“how”) — exactly like an abstract method and its overriding implementations in Java (Unit 3).

## 5.5 Links and associations

Link — a physical or conceptual connection among objects (e.g., Maher studies in ITM). Most links connect two objects; some connect three or more. Mathematically, a link is a tuple (an ordered list of objects). A link is an instance of an association.

Association — a description of a group of links with common structure and meaning (e.g., Student studies in College). It’s drawn as a line between classes; its name (a verb phrase, read in a direction) is optional if unambiguous.

| a direction) | is optional if unambiguous. |  |
|---|---|---|
|  | Link | Association |
| Between | objects | classes |
| Is | an instance | a description (template) of links |
| Example | maher — studies in — ITM | Student — studies in — College |

```
 Class diagram: ┌─────────┐ WorksFor ┌─────────┐
 │ Person │───────────────│ Company │
 └─────────┘ * 1 └─────────┘
```

```
 Object diagram: maher : Person ─────── Infosys : Company
 riya : Person ───────/
```

Association end names (roles) — the name of each end tells the role the class plays (Person is employee, Company is employer).

### Multiplicity

> In one line: multiplicity says how many objects of one class can be linked to ONE object of the associated class. Written at the end of the association line.

| Notation | Meaning |
|---|---|
| 1 | exactly one |
| 0..1 | zero or one (optional) |
| * or 0..* | zero or more (many) |
| 1..* | one or more |
| 3..5 | three to five inclusive |
| 2, 4 | two or four |

How to read it: read the number at the far end: “one X is linked to this many Y”.

```
 Student 1..* ─────────────── 0..* Course
```

“One student takes 0..* courses” (read the label near Course).

“One course has 1..* students” (read the label near Student).

More examples: Person * — 1 Company (each person works for exactly one company; a company employs many people). Country 1 — 1 Capital city.

### Association class

> In one line: an association that also has its own attributes (and operations), drawn as a class box attached to the association line with a dashed line.

Use it when a value belongs to the relationship itself, not to either side alone.

```
 Student 1..* ───────────┬─────────── 0..* Course
 ┆
 ┌───────────────┐
 │ Enrollment │
 ├───────────────┤
 │ term : String │
 │ grade : char │
 └───────────────┘
```

“Grade” isn’t a property of the student (they have many grades) or of the course (it has many students’ grades) — it belongs to this student in this course. Other examples: salary on Person–WorksFor–Company; accessPermission on User–Authorized–File.

### Ordering, bags and sequences (association ends)

By default, the objects at a “many” end form a set — no duplicates, no order. - {ordered} — the objects have a specific order (still no duplicates). E.g., a Screen has an ordered list of Windows (front to back). - {bag} — a collection that allows duplicates, no order. - {sequence} — an ordered collection that allows duplicates. E.g., a Route visits a sequence of Stops — the same stop may appear twice.

| Annotation | Order? | Duplicates? |
|---|---|---|
| (default) set | ✘ | ✘ |
| {ordered} | ✔ | ✘ |
| {bag} | ✘ | ✔ |
| {sequence} | ✔ | ✔ |

### Qualified association

A qualifier is an attribute that selects among the many objects at the other end, reducing “many” to “one”. E.g., Bank —[accountNumber]— Account: a bank has many accounts, but a

bank plus an account number identifies exactly one account. Drawn as a small box on the Bank end containing accountNumber .

### Aggregation and composition (special associations)

Aggregation (◇ hollow diamond) — “has-a / part-of” where the part can exist

independently. A Department has Teachers; if the department closes, teachers still exist.

Composition (◆ filled diamond) — a strong part-of: the part can’t exist without the whole and belongs to only one whole. A House has Rooms; destroy the house and its rooms are gone.

## 5.6 Generalization and inheritance

Generalization is the relationship between a superclass (general) and its subclasses (specialised versions) — an “is-a” relationship. Drawn as a line with a hollow triangle arrowhead pointing to the superclass.

```
 ┌──────────┐
 │ Animal │
 │ makeSound()
 └────△─────┘
 ┌───────┴───────┐
 ┌────┴───┐ ┌────┴───┐
 │ Dog │ │ Cat │
 └────────┘ └────────┘
```

Each subclass inherits the superclass’s attributes, operations and associations, and can add its own or override inherited operations.

### Use of generalization (three purposes — from your slides)

1. Support for polymorphism — code written for the superclass works for every subclass; adding a new subclass automatically gets the superclass behaviour → more flexible software.

2. Structuring the description of objects — forms a taxonomy (classification) that organises objects by their similarities; far better than modeling each class in isolation.

3. Enabling code reuse — common code is written once in the superclass; reuse is more productive than writing from scratch.

```
abstract class Animal {
 abstract void makeSound();
}
class Dog extends Animal { void makeSound() { System.out.println("Bark!"); } }
class Cat extends Animal { void makeSound() { System.out.println("Meow!"); } }
public class GenDemo {
 public static void main(String[] args) {
 Animal[] zoo = { new Dog(), new Cat() };
 for (Animal a : zoo) a.makeSound(); // polymorphism through generalization
 }
}
```

Output:

```
Bark!
Meow!
```

## 5.7 Java I/O — streams

> In one line: Java reads and writes data through streams — a stream is a sequence of data flowing from a source to a destination.

### Understand it

A stream is like a water pipe: data flows in one direction. An input stream brings data into your program (from the keyboard, a file, the network). An output stream carries data out (to the screen, a file). Pipes can be connected — e.g., a buffer pipe wrapped around a file pipe to make it faster.

```
 Source (keyboard / file / network) ──InputStream──▶ Java program ──OutputStream──▶
Destination (screen / file)
```

Why files? Variables and arrays lose their data when the program ends; a file stores data permanently (persistent) on disk.

### Standard streams

System.in — keyboard input (InputStream).

System.out — screen output (PrintStream).

System.err — error output (PrintStream).

### Byte streams vs character streams

| Byte streams vs character | streams |  |
|---|---|---|
|  | Byte streams | Character streams |
| Unit of data | 8-bit bytes | 16-bit Unicode characters |
| Base classes | InputStream , OutputStream | Reader , Writer |
| Use for | binary data: images, audio, video, .class files | text files |
| File classes | FileInputStream , FileOutputStream | FileReader , FileWriter |
| Buffered | BufferedInputStream , BufferedOutputStream | BufferedReader , BufferedWriter |

### Important classes in java.io

| Class | Purpose |
|---|---|
| File | represents a file or directory path; check , , , , exists() length() delete() mkdir() list() — it does not read or write contents |
| FileInputStream / FileOutputStream | read/write bytes from/to a file |
| FileReader / FileWriter | read/write characters from/to a file |
| BufferedReader / BufferedWriter | add a buffer (fewer slow disk accesses); readLine() reads a whole line |
| InputStreamReader / OutputStreamWriter | bridge from byte streams to character streams (with a charset) |
| PrintWriter / PrintStream | convenient print , println , printf |
| DataInputStream / DataOutputStream | read/write primitive values (int, double…) in binary |
| ObjectInputStream / ObjectOutputStream | read/write whole objects (serialization; the class must implement Serializable ) |
| RandomAccessFile | at any a ( ) read/write position in file seek() |
| / PushbackInputStream PushbackReader | a read value and push it back (look-ahead while parsing) |
| Scanner ( java.util ) | easy parsing of keyboard/file input: nextInt() , nextLine() , nextDouble() |

Common methods: InputStream.read() (returns one byte as int, −1 at end of stream), read(byte[]) , skip(n) , available() , close() ; OutputStream.write(int/byte[]) , flush() (push buffered data out), close() ; Reader.read() , Writer.write(String) .

### Example — write a text file, then read it back (with try-with-resources)

```
import java.io.*;
public class FileDemo {
 public static void main(String[] args) {
 File f = new File("notes.txt");
 try (BufferedWriter bw = new BufferedWriter(new FileWriter(f))) { // write
 bw.write("Line 1: Java I/O");
 bw.newLine();
 bw.write("Line 2: Streams");
 } catch (IOException e) {
 System.out.println("Write error: " + e.getMessage());
 }
 System.out.println("Exists? " + f.exists() + ", size = " + f.length() + " bytes");
 try (BufferedReader br = new BufferedReader(new FileReader(f))) { // read
 String line;
 int n = 0;
 while ((line = br.readLine()) != null) { // null = end of file
 n++;
 System.out.println(n + " -> " + line);
 }
 } catch (IOException e) {
 System.out.println("Read error: " + e.getMessage());
 }
 }
}
```

Output:

```
Exists? true, size = 32 bytes
1 -> Line 1: Java I/O
2 -> Line 2: Streams
```

Line by line: FileWriter opens the file for character output; wrapping it in BufferedWriter collects text in memory and writes it in large chunks (faster). readLine() returns one line at a time and null at the end. try-with-resources ( try (…) ) closes the streams automatically, even if an error occurs.

### Example — copy a binary file byte by byte

```
try (FileInputStream in = new FileInputStream("photo.jpg");
 FileOutputStream out = new FileOutputStream("copy.jpg")) {
 int b;
 while ((b = in.read()) != -1) // -1 means end of stream
 out.write(b);
}
```

### Reading from the keyboard

```
Scanner sc = new Scanner(System.in);
int age = sc.nextInt();
String name = sc.next();
// or
BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
String line = br.readLine();
```

## 5.8 Exception handling

> In one line: an exception is an abnormal event during program execution (dividing by zero, a missing file) that disrupts normal flow; exception handling lets the program catch it and respond gracefully instead of crashing.

### Understand it

You’re driving and get a flat tyre. Without a plan, the journey ends (program

crashes). With a spare tyre and a jack (an exception handler), you fix it and

continue. try = drive; catch = the plan for a flat tyre; finally = whatever

happens, you still lock the car at the end.

### Exception hierarchy

```
 Throwable
 ┌─────────┴──────────┐
 Error Exception
 (serious JVM problems: ┌──────┴───────────────────────┐
 OutOfMemoryError, IOException, SQLException, RuntimeException (unchecked)
 StackOverflowError) ClassNotFoundException, ├ ArithmeticException
 — don't catch these FileNotFoundException … ├ NullPointerException
 (CHECKED) ├ ArrayIndexOutOfBoundsException
 ├ NumberFormatException
 └ ClassCastException
```

| Checked exceptions | Unchecked exceptions |
|---|---|
| Checked by the compiler — you must handle (try- catch) or declare ( throws ) them | Not checked at compile time |
| Subclasses of Exception except RuntimeException | RuntimeException and its subclasses (and Error ) |
| Usually outside the program’s control (file missing, network down) | Usually programming bugs (null, bad index, divide by 0) |
| IOException, FileNotFoundException, SQLException, InterruptedException | ArithmeticException, NullPointerException, ArrayIndexOutOfBoundsException, NumberFormatException |

Error vs Exception: an Error is a serious problem in the JVM environment that a program normally can’t recover from; an Exception is a condition a program can catch and handle.

### The five keywords

| Keyword | Purpose |
|---|---|
| try | block of code that might throw an exception |
| catch | handles a specific exception type thrown in the try block |
| finally | block that always runs (exception or not) — for cleanup like closing files |
| throw | manually throws an exception object: throw new ArithmeticException("…") |
| throws | in a method signature, declares that the method may throw (checked) exceptions to its caller |

### try – catch – finally flow

```
public class ExDemo {
 public static void main(String[] args) {
 int[] a = {10, 20, 30};
 try {
 System.out.println("Start");
 int x = a[1] / 0; // ArithmeticException here
 System.out.println("Not printed");
 } catch (ArithmeticException e) {
 System.out.println("Caught: " + e.getMessage());
 } finally {
 System.out.println("Finally always runs");
 }
 try {
 System.out.println(a[5]);
 } catch (ArrayIndexOutOfBoundsException e) {
 System.out.println("Bad index");
 }
 try {
 int n = Integer.parseInt("12a");
 } catch (NumberFormatException | NullPointerException e) { // multi-catch
 System.out.println("Not a number");
 }
 System.out.println("Program continues normally");
 }
}
```

Output:

```
Start
Caught: / by zero
Finally always runs
Bad index
Not a number
Program continues normally
```

Flow rules: - When an exception occurs in try , the rest of try is skipped; Java jumps to the first matching catch . - If no catch matches, the exception travels up to the caller (propagation); if nobody catches it, the program stops with a stack trace. - Multiple catch blocks: a subclass exception must be caught before its superclass (otherwise the compiler reports the subclass catch as unreachable). catch (Exception e) goes last. - finally runs whether or not an exception occurred (even after return ).

### throw and throws, and a custom exception

```
class InsufficientBalanceException extends Exception { // custom CHECKED exception
 InsufficientBalanceException(String msg) { super(msg); }
}
class BankAccount {
 private double balance = 1000;
 void withdraw(double amt) throws InsufficientBalanceException { // declares it
 if (amt > balance)
 throw new InsufficientBalanceException("Balance " + balance + " < " + amt); //
throws it
 balance -= amt;
 System.out.println("Withdrawn " + amt + ", left " + balance);
 }
}
public class CustomExDemo {
 public static void main(String[] args) {
 BankAccount acc = new BankAccount();
 try {
 acc.withdraw(400);
 acc.withdraw(800);
 } catch (InsufficientBalanceException e) {
 System.out.println("Error: " + e.getMessage());
 }
 }
}
```

Output:

```
Withdrawn 400.0, left 600.0
Error: Balance 600.0 < 800.0
```

| throw | throws |
|---|---|
| Used inside a method body | Used in the method signature |
| Throws one exception object | Declares one or more exception classes |
| Followed by an object: throw new X() | Followed by class names: throws X, Y |
| Actually raises the exception | Only warns callers that it may happen |

Useful methods of exceptions: getMessage() , toString() , printStackTrace() .

## 5.9 Multithreading

> In one line: a thread is a lightweight, independent path of execution inside a program; multithreading runs several threads at the same time so a program can do many things concurrently.

### Understand it

In a restaurant kitchen, one chef (single thread) would cook dishes one after another. Several chefs (threads) working in the same kitchen (sharing the same memory) can cook many dishes simultaneously. But two chefs grabbing the same pan at once causes trouble — that’s why we need synchronization.

Examples: a music player plays a song while you browse the playlist; a browser downloads files while you scroll; a game updates graphics, sound and input in parallel.

Process vs thread

| Process | Thread |
|---|---|
| A program in execution | A path of execution within a process |
| Own separate memory | Shares the process’s memory |
| Heavyweight; switching is costly | Lightweight; switching is cheap |
| Communication between processes is costly | Threads communicate easily (shared data) |

Benefits of multithreading: better CPU utilisation (one thread waits for I/O while another runs), responsive user interfaces, faster on multi-core processors, simpler modelling of concurrent tasks.

### Two ways to create a thread

(1) Extend the Thread class and override run() . (2) Implement the Runnable interface (its run() ), then pass the object to a Thread . Preferred — your class can still extend another class (Java allows only one superclass).

In both, call start() (not run() ): start() creates a new thread which then calls run() . Calling run() directly just runs it in the current thread — no multithreading.

```
class Counter extends Thread { // way 1
 public void run() {
 for (int i = 1; i <= 3; i++)
 System.out.println(getName() + " count " + i);
 }
}
class Printer implements Runnable { // way 2
 public void run() {
 for (int i = 1; i <= 3; i++)
 System.out.println(Thread.currentThread().getName() + " print " + i);
 }
}
public class ThreadDemo {
 public static void main(String[] args) throws InterruptedException {
 Counter t1 = new Counter();
 t1.setName("T1");
 Thread t2 = new Thread(new Printer(), "T2");
 t1.start();
 t1.join(); // wait for T1 to finish (so the output order is predictable
here)
 t2.start();
 t2.join();
 System.out.println("Main done");
 }
}
```

Output:

```
T1 count 1
T1 count 2
T1 count 3
T2 print 1
T2 print 2
T2 print 3
Main done
```

(Without the join() calls, the lines of T1 and T2 would interleave unpredictably — the scheduler decides.)

### Thread life cycle (states)

```
 start() scheduler picks it
 NEW ───────────────▶ RUNNABLE ◀════════════════════▶ (running)
 │ ▲
 sleep(), wait(), │ │ time up / notify() /
 join(), waiting for │ │ lock obtained
 a lock / I/O ▼ │
 BLOCKED / WAITING / TIMED_WAITING
 │
 run() ends ▼
 TERMINATED (dead)
```

| State | Meaning |
|---|---|
| New | Thread object created, start() not called yet |
| Runnable | Ready to run / running — waiting for the CPU scheduler |
| Blocked | Waiting to get a lock (monitor) held by another thread |
| Waiting | Waiting indefinitely for another thread ( wait() , join() ) |
| Timed waiting | Waiting for a fixed time ( sleep(ms) , wait(ms) , join(ms) ) |
| Terminated | run() has finished (or an uncaught exception) |

### Important Thread methods

start() , run() , sleep(ms) (pause the current thread), join() (wait for a thread to die), isAlive() , getName()/setName() , getPriority()/setPriority() , currentThread() , yield() (hint to let others run), interrupt() .

### Thread priorities

Integers from 1 ( MIN_PRIORITY ) to 10 ( MAX_PRIORITY ), default 5 ( NORM_PRIORITY ). A higher priority is a hint to the scheduler to prefer that thread — not a guarantee.

### Synchronization

Problem (race condition): two threads update the same variable at the same time; one update can be lost. Solution: synchronized — only one thread at a time can execute a synchronized method/block on the same object (it must acquire the object’s lock/monitor).

```
class SharedCounter {
 private int count = 0;
 synchronized void increment() { count++; } // only one thread at a time
 int get() { return count; }
}
public class SyncDemo {
 public static void main(String[] args) throws InterruptedException {
 SharedCounter c = new SharedCounter();
 Runnable task = () -> { for (int i = 0; i < 10000; i++) c.increment(); };
 Thread a = new Thread(task), b = new Thread(task);
 a.start(); b.start();
 a.join(); b.join();
 System.out.println("Count = " + c.get());
 }
}
```

Output:

```
Count = 20000
```

Without synchronized , the result would often be less than 20000, because count++ is really three steps (read, add, write) and the two threads can interleave them.

Synchronized block: synchronized (this) { … } locks only a part of a method.

### Inter-thread communication

wait() , notify() , notifyAll() (methods of Object , called inside synchronized code) let threads coordinate — e.g., a producer thread waits while a buffer is full, and a consumer waits while it is empty; each notify() s the other after changing the buffer.

### Deadlock

A deadlock happens when two (or more) threads wait forever for locks held by each other: T1 holds lock A and wants B; T2 holds B and wants A. Prevention: always acquire locks in the same order, hold locks briefly, use timeouts.

### Unit 5 — Common mistakes

Treating an association-specific value (grade) as an attribute of one class.

Reading multiplicity at the wrong end.

Catching Exception before ArithmeticException (unreachable-code error).

Not handling or declaring a checked exception (IOException).

Calling run() instead of start() .

Forgetting to close streams (use try-with-resources).

## Unit 5 — What to write in the exam

UML class/object notation → drawn boxes with visibility symbols.

Object identity, values & attributes, operations vs methods → definitions + example.

Link vs association, multiplicity, association class, ordering/bag/sequence → diagrams + table.

Generalization → diagram + 3 uses.

Streams → byte vs character table + file read/write program.

Exceptions → hierarchy, checked vs unchecked, 5 keywords, throw vs throws, custom exception program.

Threads → two ways with code, life-cycle diagram, synchronization example.

### Unit 5 — Check yourself

1. Multiplicity 0..1 means? 2. What is an association class? Give an example. 3. Which base classes handle characters? 4. Is FileNotFoundException checked? 5. What does t.join() do? 6. Which interface is preferred for creating threads and why?

Answers: 1) Zero or one. 2) An association with its own attributes, e.g., Enrollment(grade) between Student and Course. 3) Reader and Writer. 4) Yes (subclass of IOException). 5) Makes the current thread wait until t finishes. 6) Runnable — the class can still extend another class.

# Last-Night Revision Sheet (Java)

Java = Gosling, Sun, 1995 (Oak). Bytecode + JVM → platform independent. JDK ⊃ JRE ⊃ JVM.

public static void main(String[] args) ; file name = public class name; javac X.java , java X .

8 primitives: byte 1, short 2, int 4, long 8, float 4, double 8, char 2 (Unicode), boolean.

Widening automatic (byte→short→int→long→float→double); narrowing needs a cast and may lose data.

&& / || short-circuit; a++ use-then-add, ++a add-then-use; switch needs break .

while (entry-controlled), do-while (exit-controlled, ≥1 run), for, for-each; break / continue / labelled.

Arrays: int[] a = new int[5] , a.length ; 2-D = array of arrays; jagged = unequal rows.

String immutable ( equals , not == ); StringBuffer mutable & synchronized (capacity 16 + len); StringBuilder fastest.

Varargs int... x — one, last. Wrappers: Integer, Character…; autoboxing/unboxing.

OOP pillars: encapsulation (private + getters), abstraction, inheritance (extends),

polymorphism (overload/override).

Constructor: same name, no return type, default given only if none written; this(...) , super(...) first line.

Access: private < default < protected < public. static = one shared copy; static methods can’t use this .

Overloading (compile time, different params) vs overriding (run time, same signature, dynamic dispatch).

final: variable const / method no override / class no extend. Abstract class: can’t instantiate, may have constructors. Interface: constants + abstract methods, multiple implementation.

Packages: package first line, import , javac -d . ; CLASSPATH finds classes, PATH finds javac.

JavaFX: Stage → Scene → scene graph (root/branch/leaf). Lifecycle init → start → stop; launch(args) . Prism (rendering), Glass (OS windows/events), Quantum (ties them). Layouts HBox, VBox, BorderPane, StackPane, GridPane, FlowPane, TilePane, AnchorPane. Events: target → route → capturing (filters) → bubbling (handlers). Transitions: Translate, Rotate, Scale, Fade, Path.

UML: class box (name/attributes/operations; + − # ~); link vs association; multiplicity 1, 0..1, , 1..; association class; {ordered}/{bag}/{sequence}; generalization triangle.

I/O: byte (InputStream/OutputStream) vs character (Reader/Writer);

BufferedReader.readLine(); read() returns −1 at end.

Exceptions: checked (IOException) vs unchecked (RuntimeException);

try/catch/finally/throw/throws; subclass catch first.

Threads: extend Thread or implement Runnable; start() not run() ; states New → Runnable → Blocked/Waiting → Terminated; synchronized prevents race conditions.
