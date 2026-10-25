/**
 * ITM University — OOPJ (C2311C1) Remedial Special Master Notes
 * Complete Zero-to-Hero Syllabus Guide for Unit 2 & Unit 3
 * Combines full academic theory with real code, diagrams, stack traces, and exam rules.
 */

export interface SyllabusTopicSection {
  id: string;
  unit: 2 | 3;
  unitTitle: string;
  topicTitle: string;
  syllabusKeywords: string[];
  beginnerConcept: string;
  detailedTheory: string;
  codeSnippet: string;
  output: string;
  examMarksWeightage: "3-Mark" | "5-Mark" | "Both (Frequent)";
  commonMistakesToAvoid: string[];
  keyTakeaways: string[];
}

export const ZERO_TO_HERO_JAVA_FOUNDATION = {
  title: "Zero-to-Hero: What is Java & How to Clear the Remedial Exam",
  subtitle: "Read this 5-minute primer if you have zero background in Java",
  content: `
### 1. What is Java and Why Does it Exist?
Java is a high-level, class-based, object-oriented programming language designed by James Gosling at Sun Microsystems in 1995 (now owned by Oracle). Its core engineering motto is:
> **"Write Once, Run Anywhere" (WORA)**

In traditional languages like C and C++, source code is compiled directly into machine code for a specific CPU architecture (e.g. Intel x86 or ARM Windows). If you compile a C program on Windows, it will NOT run on Linux or Mac without recompilation.

Java solved this using an intermediate layer called **Bytecode** and the **Java Virtual Machine (JVM)**:
1. You write Java source code in a \`.java\` file (e.g. \`Main.java\`).
2. The Java compiler (\`javac\`) compiles your source code into platform-independent **Bytecode** stored in a \`.class\` file (\`Main.class\`).
3. The **JVM** on the target computer reads the Bytecode and converts it into native CPU instructions at runtime using the **Just-In-Time (JIT) Compiler**.

---

### 2. JDK vs JRE vs JVM (The Golden Exam Triangle)
Every student must know the exact difference between these three terms:

\`\`\`
+-----------------------------------------------------------------+
|                       JDK (Java Development Kit)                |
|  - javac (Compiler), javadoc, jar, debugger tools               |
|                                                                 |
|  +-----------------------------------------------------------+  |
|  |                 JRE (Java Runtime Environment)            |  |
|  |  - Standard Class Libraries (rt.jar, java.lang, java.util)|  |
|  |                                                           |  |
|  |  +-----------------------------------------------------+  |  |
|  |  |             JVM (Java Virtual Machine)              |  |  |
|  |  |  - ClassLoader Subsystem                            |  |  |
|  |  |  - Memory Areas (Heap, Stack, Method Area/Metaspace)|  |  |
|  |  |  - Execution Engine (Interpreter + JIT Compiler)    |  |  |
|  |  |  - Garbage Collector (Automatic Memory Management) |  |  |
|  |  +-----------------------------------------------------+  |  |
|  +-----------------------------------------------------------+  |
+-----------------------------------------------------------------+
\`\`\`

- **JVM (Java Virtual Machine)**: The abstract software machine that actually executes Java bytecode. It is platform-dependent (there is a different JVM for Windows, Mac, and Linux), but all JVMs execute the same standard bytecode.
- **JRE (Java Runtime Environment)**: JVM + Core Class Libraries (e.g., \`String\`, \`System\`, \`Math\`). Needed by users who only want to RUN Java applications.
- **JDK (Java Development Kit)**: JRE + Development Tools (\`javac\` compiler, \`java\` launcher, debugger). Needed by developers and students to WRITE and COMPILE Java code.

---

### 3. Anatomy of Every Java Program (Keyword by Keyword)
Consider the simplest valid Java program:

\`\`\`java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, ITM Students!");
    }
}
\`\`\`

Here is why every single word is mandatory:
1. **\`public class Main\`**: Everything in Java lives inside a class. The class name must match the filename (\`Main.java\`). \`public\` allows the class to be accessible from outside its package.
2. **\`public\` (on \`main\`)**: The JVM executes outside your program package, so \`main\` must be declared \`public\` so the JVM can call it.
3. **\`static\` (on \`main\`)**: Allows the JVM to invoke \`main()\` **without creating an object of class \`Main\`**. If \`main\` were non-static, the JVM would not know how to construct \`Main\`!
4. **\`void\`**: \`main()\` does not return any value to the operating system when the program finishes.
5. **\`main\`**: The predefined identifier that the JVM looks for as the entry point of execution.
6. **\`String[] args\`**: Command-line arguments passed as an array of strings.
7. **\`System.out.println()\`**: \`System\` is a built-in class in \`java.lang\`, \`out\` is a \`public static final PrintStream\` object inside \`System\`, and \`println()\` is a method of \`PrintStream\` that prints the string followed by a newline.

---

### 4. The 4-Step Answer Formula to Score Full Marks in ITM Exams
When writing answers in the university paper, follow this strict formula:
- **Step 1: 1-Line Definition** (Never skip this — gives the examiner instant confidence).
- **Step 2: Syntax / Architecture Diagram / Memory Model** (Stack vs Heap or Class Hierarchy).
- **Step 3: Minimal Compilable Java Code with Comments** (Keep it small, clean, and bug-free).
- **Step 4: Exact Terminal Output** (Always write the output box; examiners deduct 1 to 1.5 marks if output is missing).
`,
};

export const REMEDIAL_SYLLABUS_SECTIONS: SyllabusTopicSection[] = [
  // ─────────────────────────────────────────────────────────────────────────────
  // UNIT 2: CLASSES, OBJECTS AND METHODS
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "unit2-class-object",
    unit: 2,
    unitTitle: "Unit 2: Classes, Objects and Methods",
    topicTitle: "Class, Object, Object Reference & The new Operator",
    syllabusKeywords: ["Class", "Object", "Object reference", "new operator"],
    examMarksWeightage: "Both (Frequent)",
    beginnerConcept:
      "A Class is like a building blueprint or a cookie cutter. It has no physical existence in memory. An Object is the actual physical house built from the blueprint or the actual cookie cut from the dough. An Object Reference is the address label (or GPS coordinate) pointing to that object in memory.",
    detailedTheory: `
#### 1. What is a Class?
A class is a user-defined blueprint, prototype, or template from which individual objects are created. It defines:
- **State / Attributes (Data Members / Fields)**: What the object knows (e.g., \`name\`, \`rollNo\`, \`marks\`).
- **Behavior / Methods (Member Functions)**: What the object can do (e.g., \`study()\`, \`calculateGrade()\`).

#### 2. What is an Object?
An object is an identifiable entity with state, behavior, and identity. It is an instance of a class that occupies real memory in the **Java Heap**.

#### 3. Object vs Object Reference (Stack vs Heap)
Understanding this difference is critical for passing the exam:
- **Object Reference Variable**: Stored on the **Call Stack**. It does NOT contain the object itself; it holds only the 32-bit or 64-bit memory address pointing to the object in heap memory.
- **Actual Object**: Created in the **Heap Memory** by the JVM runtime allocator.

\`\`\`
STACK MEMORY                             HEAP MEMORY
+--------------------+                   +-----------------------------------+
| Student s1         | ──(address 0x4A)─>| [Student Object in Heap]          |
| (Holds: 0x4A)      |                   | - name = "Maher"                  |
+--------------------+                   | - roll = 101                      |
| Student s2 = s1    | ──(address 0x4A)─>| - marks = 95.0                    |
| (Also holds 0x4A)  |                   +-----------------------------------+
+--------------------+
\`\`\`

#### 4. The 3 Phases of the \`new\` Operator
When you execute \`Student s = new Student("Maher", 101);\`, Java performs three sequential steps:
1. **Declaration (\`Student s\`)**: Allocates memory on the stack for a reference variable of type \`Student\`. Currently it holds \`null\`.
2. **Instantiation (\`new\`)**: Allocates sufficient dynamic memory on the heap for all instance variables of the \`Student\` class and initializes them to their default zero-values (\`0\`, \`0.0\`, \`false\`, \`null\`).
3. **Initialization (\`Student("Maher", 101)\`)**: Calls the constructor to initialize the newly allocated heap memory with meaningful student data, and returns the heap memory address, which is assigned into \`s\`.
`,
    codeSnippet: `class Student {
    String name;
    int rollNo;

    Student(String name, int rollNo) {
        this.name = name;
        this.rollNo = rollNo;
    }

    void display() {
        System.out.println("Roll: " + rollNo + " | Name: " + name);
    }
}

public class Main {
    public static void main(String[] args) {
        // Step 1: Declaration & Instantiation
        Student s1 = new Student("Rahul", 101);
        Student s2 = s1; // Both s1 and s2 point to the SAME object in Heap!

        s1.display();

        // Mutating via s2 changes the object that s1 sees
        s2.name = "Rahul Sharma";
        System.out.println("After modifying via reference s2:");
        s1.display();
    }
}`,
    output: `Roll: 101 | Name: Rahul
After modifying via reference s2:
Roll: 101 | Name: Rahul Sharma`,
    commonMistakesToAvoid: [
      "Saying 'Student s;' creates an object. It does NOT! It only creates a reference variable holding null.",
      "Forgetting that assigning s2 = s1 does NOT copy the object; it only copies the memory address.",
    ],
    keyTakeaways: [
      "Class = Blueprint on disk; Object = Instance in Heap memory.",
      "Reference variable lives on Stack; Object lives on Heap.",
      "The 'new' operator allocates heap memory and returns its reference address.",
    ],
  },

  {
    id: "unit2-constructors",
    unit: 2,
    unitTitle: "Unit 2: Classes, Objects and Methods",
    topicTitle: "Constructors, Constructor Overloading & Chaining with this()",
    syllabusKeywords: ["Constructor", "Constructor Overloading", "this and static keyword"],
    examMarksWeightage: "Both (Frequent)",
    beginnerConcept:
      "A constructor is a special method called automatically when an object is created. Its only job is to initialize the object's variables. Constructor overloading lets you build objects in different ways (e.g. creating a blank user vs a user with name and email). Constructor chaining with this(...) lets one constructor call another so you don't repeat code.",
    detailedTheory: `
#### 1. Constructor Rules in Java
1. A constructor has the **exact same name as the class**.
2. A constructor has **NO return type** (not even \`void\`). If you add \`void\`, Java treats it as an ordinary method!
3. It is automatically invoked at the moment of object instantiation using \`new\`.
4. If you write **zero constructors**, the Java compiler automatically inserts an invisible, empty **Default Constructor** (\`ClassName() { super(); }\`).
5. **CRITICAL EXAM RULE**: If you define **ANY** constructor (e.g. parameterized \`Student(String n)\`), Java **NEVER** creates the default constructor. If you then try to call \`new Student()\`, it causes a compile error!

#### 2. Constructor Overloading
Having multiple constructors in the same class with different parameter lists (different number, types, or order of parameters).

#### 3. Constructor Chaining using \`this(...)\`
Constructor chaining is the process of calling one constructor from another constructor within the same class.
- **Rule 1**: \`this(...)\` **MUST be the very first statement** in the constructor body.
- **Rule 2**: You cannot use \`this(...)\` in a cycle (\`A()\` calls \`B()\` and \`B()\` calls \`A()\`). This causes a compile-time error: *Recursive constructor invocation*.
`,
    codeSnippet: `class Book {
    String title;
    String author;
    double price;

    // 1. Default / No-arg constructor chaining to 3-arg constructor
    Book() {
        this("Untitled Note", "ITM Faculty", 0.0); // Must be line 1!
        System.out.println("Default constructor executed");
    }

    // 2. Overloaded constructor taking title and author
    Book(String title, String author) {
        this(title, author, 199.0); // Chains to master constructor
        System.out.println("2-Arg constructor executed");
    }

    // 3. Master parameterized constructor
    Book(String title, String author, double price) {
        this.title = title;
        this.author = author;
        this.price = price;
        System.out.println("Master 3-arg constructor executed");
    }

    void display() {
        System.out.println("Book: " + title + " by " + author + " | Rs." + price);
    }
}

public class Main {
    public static void main(String[] args) {
        System.out.println("--- Creating b1 with no args ---");
        Book b1 = new Book();
        b1.display();

        System.out.println("\\n--- Creating b2 with 2 args ---");
        Book b2 = new Book("OOPJ Mastery", "Prof. Sharma");
        b2.display();
    }
}`,
    output: `--- Creating b1 with no args ---
Master 3-arg constructor executed
Default constructor executed
Book: Untitled Note by ITM Faculty | Rs.0.0

--- Creating b2 with 2 args ---
Master 3-arg constructor executed
2-Arg constructor executed
Book: OOPJ Mastery by Prof. Sharma | Rs.199.0`,
    commonMistakesToAvoid: [
      "Writing a return type like 'void Book()' — this turns it into an ordinary method!",
      "Placing this(...) on line 2 after System.out.println() — will not compile! Constructor call must be first statement.",
    ],
    keyTakeaways: [
      "Constructors initialize object state; no return type allowed.",
      "this(...) calls another constructor of the same class.",
      "Constructor call must be the FIRST statement in the body.",
    ],
  },

  {
    id: "unit2-method-overload",
    unit: 2,
    unitTitle: "Unit 2: Classes, Objects and Methods",
    topicTitle: "Method Overloading (Compile-Time / Static Polymorphism)",
    syllabusKeywords: ["Method Overloading"],
    examMarksWeightage: "Both (Frequent)",
    beginnerConcept:
      "Method overloading means giving two or more methods in the same class the same name, but with different parameters (like area of circle vs area of rectangle). The compiler knows which one to call simply by looking at the arguments you pass.",
    detailedTheory: `
#### 1. Definition
When two or more methods in the same class share the exact same method name but have **different parameter lists** (different number of parameters, different data types, or different order of parameters), it is called **Method Overloading**.

#### 2. Why is it called Compile-Time (Static) Polymorphism?
Because the Java compiler determines **at compile time** which overloaded method to bind based on the method signature and argument types passed at the call site. No runtime lookup is required.

#### 3. Strict Rules of Method Overloading
- **MUST Differ in Parameters**:
  - Number of parameters (e.g. \`add(int, int)\` vs \`add(int, int, int)\`).
  - Types of parameters (e.g. \`add(int, int)\` vs \`add(double, double)\`).
  - Order of parameters (e.g. \`display(int, String)\` vs \`display(String, int)\`).
- **RETURN TYPE ALONE CANNOT OVERLOAD**:
  \`int compute(int x)\` and \`double compute(int x)\` will cause a **compile error**: *method compute(int) is already defined*. The compiler cannot decide which to call if you write \`compute(5);\`.
- **Automatic Type Promotion**: If no exact match is found, Java automatically promotes primitive types:
  \`byte -> short -> int -> long -> float -> double\`.
`,
    codeSnippet: `class Calculator {
    // 1. Two integer addition
    int add(int a, int b) {
        System.out.println("Called add(int, int)");
        return a + b;
    }

    // 2. Three integer addition (Overloaded by count)
    int add(int a, int b, int c) {
        System.out.println("Called add(int, int, int)");
        return a + b + c;
    }

    // 3. Two double addition (Overloaded by type)
    double add(double a, double b) {
        System.out.println("Called add(double, double)");
        return a + b;
    }
}

public class Main {
    public static void main(String[] args) {
        Calculator calc = new Calculator();
        System.out.println("Sum 1: " + calc.add(10, 20));
        System.out.println("Sum 2: " + calc.add(5, 15, 25));
        System.out.println("Sum 3: " + calc.add(2.5, 4.5));
    }
}`,
    output: `Called add(int, int)
Sum 1: 30
Called add(int, int, int)
Sum 2: 45
Called add(double, double)
Sum 3: 7.0`,
    commonMistakesToAvoid: [
      "Claiming that changing the return type overloads a method. It does NOT; it causes a duplicate method compile error.",
      "Ambiguity errors with varargs or matching null with overloaded wrapper types.",
    ],
    keyTakeaways: [
      "Same method name + different parameter list in the same class.",
      "Resolved at compile-time by javac based on arguments.",
      "Return type alone CANNOT distinguish overloaded methods.",
    ],
  },

  {
    id: "unit2-recursion",
    unit: 2,
    unitTitle: "Unit 2: Classes, Objects and Methods",
    topicTitle: "Recursion & Call Stack Execution Mechanics",
    syllabusKeywords: ["Recursion"],
    examMarksWeightage: "Both (Frequent)",
    beginnerConcept:
      "Recursion is a programming technique where a method solves a large problem by calling itself with a smaller version of the problem, until it hits a stopping condition called the Base Case. Without a base case, it calls itself forever until memory runs out (StackOverflowError).",
    detailedTheory: `
#### 1. What is Recursion?
A method in Java that calls itself directly or indirectly is known as a **recursive method**, and the process is called **recursion**.

#### 2. The Two Mandatory Parts of Every Recursive Function
1. **Base Case (Termination Condition)**: A condition that stops recursion and returns a direct answer without making any further recursive call.
2. **Recursive Step (Reduction Step)**: The call to itself with arguments modified to move closer toward the base case.

#### 3. The Call Stack Mechanics (Push & Pop)
Every time a method is called in Java, the JVM creates an **Activation Record (Stack Frame)** on top of the thread's Call Stack.
- **Push Phase (Winding)**: Each call suspends its caller, pushes a new frame with its local variables and parameters onto the stack, and calls itself with \`n - 1\`.
- **Pop Phase (Unwinding)**: Once the base case returns a value, the stack frames are popped one by one in Last-In-First-Out (**LIFO**) order, returning results up the chain.
`,
    codeSnippet: `public class Main {
    // Recursive Factorial: n! = n * (n - 1)!
    static int factorial(int n) {
        if (n <= 1) { // BASE CASE: stops recursion
            return 1;
        }
        return n * factorial(n - 1); // RECURSIVE STEP
    }

    public static void main(String[] args) {
        int num = 4;
        System.out.println("Factorial of " + num + " = " + factorial(num));
    }
}`,
    output: `Factorial of 4 = 24`,
    commonMistakesToAvoid: [
      "Forgetting the base case. Without 'if (n <= 1) return 1;', the JVM throws StackOverflowError.",
      "Not knowing the order: calls are stacked bottom-up, but calculations unwind top-down (LIFO).",
    ],
    keyTakeaways: [
      "Recursion requires a Base Case and a Recursive Step.",
      "Each recursive call creates a Stack Frame on the Call Stack.",
      "Unwinding happens in LIFO order upon reaching the base case.",
    ],
  },

  {
    id: "unit2-passing-returning-objects",
    unit: 2,
    unitTitle: "Unit 2: Classes, Objects and Methods",
    topicTitle: "Passing and Returning Objects from Methods",
    syllabusKeywords: ["Passing and Returning object form Method"],
    examMarksWeightage: "5-Mark",
    beginnerConcept:
      "In Java, everything is passed by value. When you pass an object to a method, you are passing a copy of the reference (the memory address). This means changes made to the object's variables inside the method WILL affect the original object!",
    detailedTheory: `
#### 1. Java's Parameter Passing Model: Call by Value of Reference
A common misconception is that Java supports 'Call by Reference'. In reality:
> **Java is strictly Call by Value, always.**

When you pass an object reference variable to a method:
- The **value being copied** is the **memory address (reference)** pointing to the heap object.
- Because both the caller and the method hold references pointing to the exact same heap object, modifying the fields of the object inside the method persists outside!
- However, if the method assigns the parameter to a \`new\` object (\`c = new Complex(0,0)\`), the caller's reference does NOT change.

#### 2. Returning Objects
A method can instantiate a new object on the heap and return its reference address to the caller. This is standard pattern in mathematical modeling (e.g. Complex numbers, Matrices).
`,
    codeSnippet: `class Complex {
    int real, imag;

    Complex(int real, int imag) {
        this.real = real;
        this.imag = imag;
    }

    // Accepts a Complex object and returns a brand-new Complex object
    Complex add(Complex other) {
        int sumReal = this.real + other.real;
        int sumImag = this.imag + other.imag;
        return new Complex(sumReal, sumImag); // returning new object
    }

    void display() {
        System.out.println(real + " + " + imag + "i");
    }
}

public class Main {
    public static void main(String[] args) {
        Complex c1 = new Complex(3, 4);
        Complex c2 = new Complex(2, 5);

        // c2 is passed as an object argument; sum receives a new object
        Complex sum = c1.add(c2);

        System.out.print("c1 = "); c1.display();
        System.out.print("c2 = "); c2.display();
        System.out.print("sum = "); sum.display();
    }
}`,
    output: `c1 = 3 + 4i
c2 = 2 + 5i
sum = 5 + 9i`,
    commonMistakesToAvoid: [
      "Confusing modifying an object's fields with reassigning a reference variable.",
      "Forgetting to return a new object when mathematical immutability is desired.",
    ],
    keyTakeaways: [
      "Java passes copies of reference addresses (Call by Value).",
      "Mutations to fields inside methods affect the heap object directly.",
      "Returning an object hands back a heap reference to the caller.",
    ],
  },

  {
    id: "unit2-static-keyword",
    unit: 2,
    unitTitle: "Unit 2: Classes, Objects and Methods",
    topicTitle: "The static Keyword: Variables, Methods, Blocks & Counters",
    syllabusKeywords: ["this and static keyword"],
    examMarksWeightage: "Both (Frequent)",
    beginnerConcept:
      "Non-static means 'belongs to one specific object'. Static means 'belongs to the entire class as a whole'. There is only ONE copy of a static variable in memory, shared by every single object of that class.",
    detailedTheory: `
#### 1. What does \`static\` mean?
The \`static\` keyword in Java is used for memory management. It indicates that a member belongs to the **class itself**, rather than to instances (objects) of the class.

#### 2. Static Variables (Class Variables)
- Allocated memory **only once** when the class is loaded into memory (stored in Metaspace / Method Area).
- Shared across all instances of the class. If Object A modifies a static variable, Object B sees the updated value immediately.
- Ideal for shared counters, company names, college codes, or constants.

#### 3. Static Methods
- Can be called directly using the class name: \`ClassName.methodName()\`. No object required!
- **CRITICAL EXAM QUESTION: Why can't a static method access non-static members directly?**
  - A static method belongs to the class and runs when the class is loaded, before any object has even been instantiated.
  - Non-static (instance) variables belong to specific objects in heap memory.
  - Since a static method has no \`this\` pointer (no object context), the JVM cannot know *which* object's variable you want to read or write! Therefore, the compiler forbids it.
`,
    codeSnippet: `class StudentCounter {
    String name;              // Instance variable (separate copy per object)
    static int studentCount = 0; // Static variable (1 shared copy for all objects)

    StudentCounter(String name) {
        this.name = name;
        studentCount++; // increments the common shared counter
    }

    static void displayTotalStudents() {
        // System.out.println(name); // COMPILE ERROR: cannot access instance var from static method!
        System.out.println("Total Registered Students: " + studentCount);
    }
}

public class Main {
    public static void main(String[] args) {
        StudentCounter s1 = new StudentCounter("Aman");
        StudentCounter s2 = new StudentCounter("Bhavya");
        StudentCounter s3 = new StudentCounter("Chirag");

        // Invoked via ClassName without needing any object
        StudentCounter.displayTotalStudents();
    }
}`,
    output: `Total Registered Students: 3`,
    commonMistakesToAvoid: [
      "Trying to use 'this' or 'super' inside a static method — causes an immediate compile error.",
      "Assuming each object gets its own copy of a static variable.",
    ],
    keyTakeaways: [
      "Static variables have 1 shared copy stored in Metaspace.",
      "Static methods run without object creation via ClassName.method().",
      "Static methods cannot directly access instance variables or use 'this'.",
    ],
  },

  {
    id: "unit2-finalize-method",
    unit: 2,
    unitTitle: "Unit 2: Classes, Objects and Methods",
    topicTitle: "The finalize() Method & Garbage Collection",
    syllabusKeywords: ["finalize () method"],
    examMarksWeightage: "3-Mark",
    beginnerConcept:
      "finalize() is a cleanup method in Java's root Object class. Java's Garbage Collector runs it just before an unused object is destroyed to free resources like open files. However, it is unpredictable, slow, and was deprecated in Java 9.",
    detailedTheory: `
#### 1. What is \`finalize()\`?
\`finalize()\` is a protected method defined in \`java.lang.Object\`:
\`\`\`java
protected void finalize() throws Throwable
\`\`\`
It was originally designed as a safety net to allow an object to perform final cleanup operations (releasing file descriptors, closing database sockets, reclaiming native OS handles) right before the Garbage Collector (GC) reclaims the object's heap memory.

#### 2. When is it Invoked?
- Only when an object becomes **unreachable** (eligible for garbage collection, e.g. \`obj = null;\`).
- Invoked by the JVM Garbage Collector thread before freeing the memory.
- A programmer can request GC via \`System.gc()\`, but the JVM is **not obligated** to run it immediately.

#### 3. Why is \`finalize()\` Deprecated (Since Java 9)?
1. **Unpredictability**: There is zero guarantee when—or even whether—\`finalize()\` will ever run before the JVM terminates.
2. **Performance Degradation**: Objects with \`finalize()\` methods must survive at least two garbage collection cycles, drastically increasing GC pause times.
3. **Deadlocks & Security Leaks**: An exception thrown in \`finalize()\` is quietly swallowed, and the object can 'resurrect' itself by assigning \`this\` to a static reference!
4. **Modern Alternative**: Always use the **\`AutoCloseable\`** interface and **\`try-with-resources\`** blocks instead.
`,
    codeSnippet: `public class Main {
    @Override
    protected void finalize() {
        System.out.println("finalize() hook invoked by Garbage Collector!");
    }

    public static void main(String[] args) {
        Main obj = new Main();
        obj = null; // Object is now unreferenced and eligible for GC

        // Request JVM to run garbage collection (only a recommendation)
        System.gc();
        System.out.println("End of main method.");
    }
}`,
    output: `End of main method.
finalize() hook invoked by Garbage Collector! (Output order may vary depending on JVM)`,
    commonMistakesToAvoid: [
      "Assuming System.gc() immediately forces garbage collection. It is only an asynchronous suggestion.",
      "Not mentioning that finalize() is deprecated since Java 9 in exam answers.",
    ],
    keyTakeaways: [
      "finalize() is an Object class method for pre-destruction cleanup.",
      "Called automatically by the Garbage Collector, not manually.",
      "Deprecated in Java 9 due to unreliability and performance issues.",
    ],
  },

  {
    id: "unit2-access-control",
    unit: 2,
    unitTitle: "Unit 2: Classes, Objects and Methods",
    topicTitle: "Access Control & Modifiers (private, default, protected, public)",
    syllabusKeywords: ["Access control", "modifiers"],
    examMarksWeightage: "Both (Frequent)",
    beginnerConcept:
      "Access specifiers decide who can see and modify your variables and methods. Think of private as your diary (only you), default as your home (only your family/package), protected as your family heirloom (your family + your children in other towns), and public as a billboard on the highway (everyone).",
    detailedTheory: `
#### The 4 Access Levels in Java
Java provides 4 levels of visibility for class members:

| Access Specifier | Same Class | Same Package | Subclass (Different Package) | World (Different Package) |
| :--- | :---: | :---: | :---: | :---: |
| **\`private\`** | **YES** | NO | NO | NO |
| **\`default\`** (no keyword) | **YES** | **YES** | NO | NO |
| **\`protected\`** | **YES** | **YES** | **YES** (via inheritance) | NO |
| **\`public\`** | **YES** | **YES** | **YES** | **YES** |

#### Crucial Exam Notes:
- **Default access** is also known as **package-private**. It is active when you write no modifier keyword.
- **Top-level classes** can ONLY be \`public\` or \`default\`. You cannot make a top-level outer class \`private\` or \`protected\`.
- **Protected visibility** outside the package is ONLY accessible through inheritance (\`extends\`), and only by child instances, not through an external instance reference variable.
`,
    codeSnippet: `package college;

public class Employee {
    private int ssn = 999;     // Only inside Employee class
    String department = "CSE";  // Default: anywhere in 'college' package
    protected double salary = 75000; // Package + Subclasses in other packages
    public String name = "Dr. Bhatt"; // Everywhere in the universe

    public void showInternal() {
        System.out.println("Private ssn accessible internally: " + ssn);
    }
}

// In another file in the same package:
class TestAccess {
    public static void main(String[] args) {
        Employee emp = new Employee();
        // System.out.println(emp.ssn); // COMPILE ERROR: ssn has private access!
        System.out.println(emp.department); // OK: same package
        System.out.println(emp.salary);     // OK: same package
        System.out.println(emp.name);       // OK: public
    }
}`,
    output: `CSE
75000.0
Dr. Bhatt`,
    commonMistakesToAvoid: [
      "Confusing 'protected' with 'default'. Protected gives access to subclasses located in different packages.",
      "Writing 'private class MyClass' at the top level — top-level classes can only be public or default.",
    ],
    keyTakeaways: [
      "Access hierarchy: private < default < protected < public.",
      "Top-level classes can only be public or package-private (default).",
      "Encapsulation relies on private data members with public getters/setters.",
    ],
  },

  {
    id: "unit2-nested-inner-classes",
    unit: 2,
    unitTitle: "Unit 2: Classes, Objects and Methods",
    topicTitle: "Nested Classes, Member Inner Classes & Anonymous Inner Classes",
    syllabusKeywords: ["Nested class", "Inner class", "Anonymous inner class"],
    examMarksWeightage: "Both (Frequent)",
    beginnerConcept:
      "A class written inside another class is a Nested Class. If it is static, it can exist independently. If it is non-static (Inner Class), it is physically bound to an outer object and can access all outer variables, even private ones! An Anonymous Inner Class is a throwaway class written and instantiated in a single line without even giving it a name.",
    detailedTheory: `
#### 1. Classification of Nested Classes
A class defined within another enclosing class is called a **Nested Class**:
1. **Static Nested Class**: Declared with \`static\`. Can be instantiated without an outer class object: \`new Outer.StaticNested()\`. It can only directly access static members of the outer class.
2. **Non-Static Inner Class (Member Inner Class)**: Declared without \`static\`. Every instance is bound to an outer instance: \`outerObj.new Inner()\`. It has direct access to **ALL** members of the outer class, including \`private\` variables!
3. **Local Inner Class**: Defined inside a method block.
4. **Anonymous Inner Class**: A local inner class without a name, declared and instantiated in a single expression.

#### 2. Anonymous Inner Classes (Deep Dive)
An anonymous inner class is used when you need a one-time implementation of an interface or class without creating a separate \`.java\` file:
\`\`\`java
Runnable r = new Runnable() {
    public void run() {
        System.out.println("Running anonymously!");
    }
};
\`\`\`
- Creates a hidden class (e.g. \`Main$1.class\`) that implements the interface.
- Used heavily in GUI event handling (Button clicks), multithreading (\`Runnable\`), and sorting (\`Comparator\`).
`,
    codeSnippet: `class Outer {
    private String secret = "TopSecret123";
    static int code = 888;

    // 1. Non-static Member Inner Class
    class Inner {
        void reveal() {
            // Can access private outer members!
            System.out.println("Inner reading private outer: " + secret);
        }
    }

    // 2. Static Nested Class
    static class StaticNested {
        void show() {
            System.out.println("Static Nested reading outer static code: " + code);
        }
    }
}

interface Greeting {
    void greet();
}

public class Main {
    public static void main(String[] args) {
        // Instantiating Inner class (needs outer instance)
        Outer outer = new Outer();
        Outer.Inner inner = outer.new Inner();
        inner.reveal();

        // Instantiating Static Nested class (no outer instance needed)
        Outer.StaticNested nested = new Outer.StaticNested();
        nested.show();

        // 3. Anonymous Inner Class
        Greeting g = new Greeting() {
            public void greet() {
                System.out.println("Hello from Anonymous Inner Class!");
            }
        };
        g.greet();
    }
}`,
    output: `Inner reading private outer: TopSecret123
Static Nested reading outer static code: 888
Hello from Anonymous Inner Class!`,
    commonMistakesToAvoid: [
      "Trying to create a non-static Inner object with 'new Outer.Inner()'. You MUST use 'outerObj.new Inner()'.",
      "Thinking an anonymous inner class creates an instance of an interface directly. It creates an instance of an unnamed class that implements the interface.",
    ],
    keyTakeaways: [
      "Inner class is bound to an outer instance and accesses all outer members.",
      "Static nested class does not require an outer instance.",
      "Anonymous inner class declares and instantiates a one-off subclass or interface implementation in one expression.",
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // UNIT 3: INHERITANCE AND INTERFACES
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "unit3-inheritance-basics",
    unit: 3,
    unitTitle: "Unit 3: Inheritance and Interfaces",
    topicTitle: "Inheritance Fundamentals, Constructor Order & super Keyword",
    syllabusKeywords: [
      "Use of Inheritance",
      "Inheriting Data members and Methods",
      "constructor in inheritance",
      "Handle multilevel constructors - super keyword",
    ],
    examMarksWeightage: "Both (Frequent)",
    beginnerConcept:
      "Inheritance is how a child class inherits properties and methods from a parent class using the extends keyword. When a child object is created, Java automatically builds the parent part first before building the child part. The super keyword lets the child talk to its parent's constructor or methods.",
    detailedTheory: `
#### 1. Why Use Inheritance?
1. **Code Reusability**: Common properties and methods are written once in a superclass and shared by all subclasses.
2. **Method Overriding & Runtime Polymorphism**: Allows a child to specialize parent behavior.
3. **Establishing IS-A Relationship**: \`Dog IS-A Animal\`, \`Manager IS-A Employee\`.

#### 2. What is Inherited vs What is NOT Inherited?
- **Inherited**: All \`public\` and \`protected\` data members and methods. Default (package-private) members are inherited only within the same package.
- **NOT Inherited**:
  - \`private\` members (they exist in memory, but child cannot access them directly).
  - **Constructors are NEVER inherited** (a child has its own constructors).

#### 3. Constructor Execution Order in Inheritance
- **Bottom-Up Call, Top-Down Execution**: When you call \`new Child()\`, \`Child()\` immediately delegates to \`Parent()\` via \`super()\`, which delegates to \`Object()\`.
- Execution unwinds from the top: \`Object\` runs -> \`Parent\` runs -> \`Child\` runs.
- **The \`super\` Keyword Uses**:
  1. \`super(args)\`: Call the parent class constructor (must be the first statement in child constructor).
  2. \`super.methodName()\`: Call an overridden superclass method.
  3. \`super.variableName\`: Access a shadowed superclass field.
`,
    codeSnippet: `class Person {
    String name;

    Person(String name) {
        this.name = name;
        System.out.println("1. Person constructor executed for: " + name);
    }
}

class Employee extends Person {
    int empId;

    Employee(String name, int empId) {
        super(name); // MUST be first statement! Calls Person(name)
        this.empId = empId;
        System.out.println("2. Employee constructor executed for ID: " + empId);
    }
}

class Manager extends Employee {
    String department;

    Manager(String name, int empId, String department) {
        super(name, empId); // Calls Employee(name, empId)
        this.department = department;
        System.out.println("3. Manager constructor executed for Dept: " + department);
    }

    void display() {
        System.out.println("Manager details: " + name + " | " + empId + " | " + department);
    }
}

public class Main {
    public static void main(String[] args) {
        Manager m = new Manager("Rahul Sharma", 501, "Engineering");
        m.display();
    }
}`,
    output: `1. Person constructor executed for: Rahul Sharma
2. Employee constructor executed for ID: 501
3. Manager constructor executed for Dept: Engineering
Manager details: Rahul Sharma | 501 | Engineering`,
    commonMistakesToAvoid: [
      "Calling super(...) on line 2 of the constructor body. It must be the very first statement.",
      "If the parent class has only parameterized constructors, the child MUST call super(args) explicitly.",
    ],
    keyTakeaways: [
      "Constructors are called bottom-up, but execute top-down.",
      "super(...) delegates to parent constructor.",
      "Private members are not directly accessible by subclasses.",
    ],
  },

  {
    id: "unit3-method-overriding-dispatch",
    unit: 3,
    unitTitle: "Unit 3: Inheritance and Interfaces",
    topicTitle: "Method Overriding & Dynamic Method Dispatch (Runtime Polymorphism)",
    syllabusKeywords: [
      "Multilevel Inheritance -method overriding",
      "Dynamic method dispatch",
    ],
    examMarksWeightage: "5-Mark",
    beginnerConcept:
      "Method overriding is when a child class changes how a parent method works (e.g., Shape says 'generic area', but Circle says '3.14 * r * r'). Dynamic Method Dispatch is Java's ability to pick which method to run based on the real object in memory at runtime, even if the reference is of parent type.",
    detailedTheory: `
#### 1. What is Method Overriding?
When a subclass provides a specific implementation of a method that is already defined in its superclass, with the **exact same method name, exact same parameters, and compatible return type**, it is called **Method Overriding**.

#### 2. The 6 Golden Rules of Overriding (Must Memorize for 3-Mark & 5-Mark Questions)
1. **Method Signature**: Must be identical (name + parameter types and order).
2. **Return Type**: Must be identical or a **covariant subtype** (e.g. parent returns \`Object\`, child returns \`String\`).
3. **Access Privilege Rule**: Subclass method **CANNOT reduce visibility**. If parent method is \`protected\`, child can be \`protected\` or \`public\`, but NOT \`default\` or \`private\`.
4. **Final & Static Methods**:
   - A \`final\` method **cannot be overridden** (body is locked).
   - A \`static\` method **cannot be overridden** (it is shadowed/hidden, not polymorphic).
   - \`private\` methods cannot be overridden because they are not visible to subclasses.
5. **Exception Rule**: Overriding method cannot throw broader (higher) checked exceptions than the superclass method.
6. **Inheritance Required**: Method overriding can only happen between two classes with an IS-A relationship.

#### 3. Dynamic Method Dispatch (Runtime Polymorphism)
Dynamic method dispatch is the mechanism by which a call to an overridden method is resolved at runtime rather than at compile time:
\`\`\`java
Shape s = new Circle(); // Upcasting
s.area(); // JVM resolves Circle's area() at runtime!
\`\`\`
- **Compile Time**: The compiler checks only that the reference type (\`Shape\`) has an \`area()\` method.
- **Runtime**: The JVM checks the **actual object on the heap** (\`Circle\`) via its Virtual Method Table (vtable) and dispatches \`Circle.area()\`.
`,
    codeSnippet: `class Shape {
    void area() {
        System.out.println("Area of generic shape undefined");
    }
}

class Circle extends Shape {
    double radius = 5.0;

    @Override
    void area() {
        System.out.println("Area of Circle = " + (3.14159 * radius * radius));
    }
}

class Rectangle extends Shape {
    double l = 4.0, b = 6.0;

    @Override
    void area() {
        System.out.println("Area of Rectangle = " + (l * b));
    }
}

public class Main {
    public static void main(String[] args) {
        // Superclass reference variable
        Shape s;

        // Points to Circle object in heap
        s = new Circle();
        s.area(); // Circle's area() runs dynamically!

        // Same reference now points to Rectangle object
        s = new Rectangle();
        s.area(); // Rectangle's area() runs dynamically!
    }
}`,
    output: `Area of Circle = 78.53975
Area of Rectangle = 24.0`,
    commonMistakesToAvoid: [
      "Thinking the reference type decides which method runs. The ACTUAL HEAP OBJECT decides at runtime!",
      "Assigning weaker access privileges in child class (e.g. overriding a public method with default visibility).",
    ],
    keyTakeaways: [
      "Overriding = same signature in subclass with modified behavior.",
      "Dynamic method dispatch resolves overridden calls using actual heap object at runtime.",
      "Upcasting allows superclass reference to hold any subclass object.",
    ],
  },

  {
    id: "unit3-final-keyword",
    unit: 3,
    unitTitle: "Unit 3: Inheritance and Interfaces",
    topicTitle: "Stopping Inheritance & Modification with the final Keyword",
    syllabusKeywords: ["Stop Inheritance -Final keywords"],
    examMarksWeightage: "Both (Frequent)",
    beginnerConcept:
      "The final keyword is Java's padlock. Put it on a variable and it becomes an unchangeable constant. Put it on a method and no child can override it. Put it on a class and no other class can inherit from it.",
    detailedTheory: `
#### The 3 Uses of \`final\` in Java

| Application | Meaning | Effect | Example |
| :--- | :--- | :--- | :--- |
| **\`final\` Variable** | Constant value | Value can be assigned only once; cannot be modified | \`final double PI = 3.14159;\` |
| **\`final\` Method** | Locked implementation | Cannot be overridden by any subclass | \`final void securityCheck() {}\` |
| **\`final\` Class** | Immutable structure | Cannot be extended / inherited (no subclasses) | \`final class SystemSecurity {}\` |

#### Blank Final Variable
A \`final\` variable that is declared without an immediate initial value is called a **blank final variable**. It **must** be initialized in every constructor of the class; otherwise the compiler throws an error.

#### Built-in Java Example
Why is \`java.lang.String\` a \`final\` class?
To preserve immutability, thread-safety, and security. If someone could subclass \`String\`, they could override methods to alter password and URL strings!
`,
    codeSnippet: `class SecurityModule {
    final double TAX_RATE = 0.18; // 1. final variable: constant
    final int blankFinalId;       // Blank final variable

    SecurityModule(int id) {
        this.blankFinalId = id; // Initialized in constructor
    }

    final void authenticate() { // 2. final method: cannot be overridden
        System.out.println("Executing core authentication algorithm.");
    }
}

// 3. final class: cannot be inherited
final class LockedDatabase {
    void connect() {
        System.out.println("Connected to locked DB.");
    }
}

// class HackedModule extends LockedDatabase {} // COMPILE ERROR: cannot inherit from final class!

public class Main {
    public static void main(String[] args) {
        SecurityModule sec = new SecurityModule(404);
        System.out.println("Tax Rate: " + sec.TAX_RATE);
        System.out.println("ID: " + sec.blankFinalId);
        sec.authenticate();

        // sec.TAX_RATE = 0.25; // COMPILE ERROR: cannot assign value to final variable!
    }
}`,
    output: `Tax Rate: 0.18
ID: 404
Executing core authentication algorithm.`,
    commonMistakesToAvoid: [
      "Trying to reassign a final variable.",
      "Trying to override a final method or inherit from a final class like String.",
    ],
    keyTakeaways: [
      "final variable = constant.",
      "final method = cannot override.",
      "final class = cannot inherit.",
    ],
  },

  {
    id: "unit3-interfaces-deep-dive",
    unit: 3,
    unitTitle: "Unit 3: Inheritance and Interfaces",
    topicTitle: "Interfaces, Implementation, References & Multiple Inheritance",
    syllabusKeywords: [
      "Creation and Implementation of an interface",
      "Interface reference",
      "instance of operator",
      "Interface inheritance",
    ],
    examMarksWeightage: "Both (Frequent)",
    beginnerConcept:
      "An interface is a pure 100% contract specifying WHAT a class must do, but not HOW. Classes use implements to fulfill the contract. Java does not allow extending multiple classes (no diamond problem), but it DOES allow implementing multiple interfaces!",
    detailedTheory: `
#### 1. What is an Interface?
An interface is a reference type in Java, similar to a class, that can contain only constants, method signatures, default methods, static methods, and nested types.
- Methods without a body are implicitly **\`public abstract\`**.
- All variables in an interface are implicitly **\`public static final\`** (constants).
- You **cannot instantiate an interface with \`new\`** directly (no constructors allowed).

#### 2. Why Multiple Inheritance of Type is Allowed via Interfaces
Java forbids multiple class inheritance (\`class C extends A, B\`) because of the **Diamond Problem**: if both \`A\` and \`B\` define \`void show()\`, which one does \`C\` inherit?
With interfaces, methods have no bodies! \`C\` implements \`A\` and \`B\`, and provides **its own single implementation** of \`show()\`. There is zero ambiguity!

#### 3. Interface Inheritance
An interface can \`extend\` another interface (and even multiple interfaces!):
\`\`\`java
interface B extends A {}
interface C extends A, B {}
\`\`\`

#### 4. The \`instanceof\` Operator
A binary operator used to test whether an object is an instance of a specified class or interface at runtime:
\`\`\`java
if (v instanceof Car) {
    Car c = (Car) v; // Safe downcasting! Prevents ClassCastException
}
\`\`\`
`,
    codeSnippet: `interface Printable {
    void print(); // implicitly public abstract
}

interface Showable {
    void show();
}

// Interface extending another interface
interface AdvancedShowable extends Showable {
    void showDetails();
}

// Class implementing multiple interfaces (Multiple Inheritance of Type)
class Document implements Printable, AdvancedShowable {
    public void print() {
        System.out.println("Printing Document content...");
    }

    public void show() {
        System.out.println("Showing basic Document preview...");
    }

    public void showDetails() {
        System.out.println("Showing high-resolution Document details...");
    }
}

public class Main {
    public static void main(String[] args) {
        Document doc = new Document();

        // Interface reference pointing to implementing object
        Printable p = doc;
        p.print();

        // Testing runtime type with instanceof
        if (doc instanceof AdvancedShowable) {
            System.out.println("doc safely implements AdvancedShowable");
            doc.showDetails();
        }
    }
}`,
    output: `Printing Document content...
doc safely implements AdvancedShowable
Showing high-resolution Document details...`,
    commonMistakesToAvoid: [
      "Forgetting to mark overriding interface methods as 'public' in the class. Interface methods are implicitly public, so omitting public causes 'weaker access privilege' compile error.",
      "Trying to use 'implements' between two interfaces. Interfaces EXTEND other interfaces; classes IMPLEMENT interfaces.",
    ],
    keyTakeaways: [
      "Interface = pure contract (implicitly public abstract methods).",
      "Solves the diamond problem to achieve multiple inheritance in Java.",
      "instanceof operator prevents ClassCastException during downcasting.",
    ],
  },

  {
    id: "unit3-abstract-class-vs-interface",
    unit: 3,
    unitTitle: "Unit 3: Inheritance and Interfaces",
    topicTitle: "Comparison between Abstract Class and Interface (10-Point Master Table)",
    syllabusKeywords: ["Comparison between Abstract Class and interface"],
    examMarksWeightage: "Both (Frequent)",
    beginnerConcept:
      "An abstract class is an incomplete class meant to be extended by closely related things (e.g. Animal -> Dog, Cat). An interface is a contract meant for capability (e.g. Printable, Cloneable, Flyable) that can be added to completely unrelated things (e.g. Bird can fly, Airplane can fly).",
    detailedTheory: `
#### Comprehensive Comparison Matrix for University Exams

| Comparison Point | Abstract Class | Interface |
| :--- | :--- | :--- |
| **1. Primary Purpose** | Code sharing & partial implementation among closely related classes (IS-A) | Contract specification for capabilities across unrelated classes (CAN-DO) |
| **2. Declaration Keyword** | Declared with \`abstract class\` | Declared with \`interface\` |
| **3. Implementation Keyword**| Subclass uses \`extends\` | Subclass uses \`implements\` |
| **4. Method Types** | Can have abstract, concrete, final, static, private methods | Historically abstract only; Java 8+ supports \`default\` and \`static\`, Java 9+ supports \`private\` |
| **5. Variable Types** | Can contain instance, static, final, non-final variables | **ONLY \`public static final\` constants** |
| **6. Constructors** | **YES**, can have constructors (invoked via \`super()\`) | **NO**, interfaces cannot have constructors |
| **7. Multiple Inheritance**| **NO**, a class can extend only ONE abstract class | **YES**, a class can implement MANY interfaces |
| **8. Access Modifiers** | Methods can be \`private\`, \`protected\`, \`public\`, \`default\` | Methods are \`public\` by default |
| **9. Speed / Performance** | Faster execution (direct method dispatch) | Slightly slower due to search in interface method tables |
| **10. Adding New Methods**| Can add concrete methods without breaking existing subclasses | Adding non-default abstract methods breaks all implementing classes |
`,
    codeSnippet: `// 1. Abstract Class: Account
abstract class BankAccount {
    double balance;

    // Abstract class constructor!
    BankAccount(double balance) {
        this.balance = balance;
    }

    // Abstract method: no body
    abstract double calculateInterest();

    // Concrete method: shared by all accounts
    void displayBalance() {
        System.out.println("Current Balance: Rs." + balance);
    }
}

// 2. Interface: Taxable (Capability)
interface Taxable {
    double TAX_RATE = 0.05; // public static final
    double calculateTax(double amount);
}

// Subclass inheriting abstract class AND implementing interface
class SavingsAccount extends BankAccount implements Taxable {
    SavingsAccount(double balance) {
        super(balance);
    }

    @Override
    double calculateInterest() {
        return balance * 0.04; // 4% interest
    }

    @Override
    public double calculateTax(double amount) {
        return amount * TAX_RATE;
    }
}

public class Main {
    public static void main(String[] args) {
        SavingsAccount sa = new SavingsAccount(50000);
        sa.displayBalance();
        double interest = sa.calculateInterest();
        System.out.println("Interest Earned: Rs." + interest);
        System.out.println("Tax Deducted: Rs." + sa.calculateTax(interest));
    }
}`,
    output: `Current Balance: Rs.50000.0
Interest Earned: Rs.2000.0
Tax Deducted: Rs.100.0`,
    commonMistakesToAvoid: [
      "Saying interfaces cannot have concrete methods. Since Java 8, interfaces CAN have default and static methods!",
      "Saying abstract classes cannot have constructors. They CAN, and are called via super() from subclasses.",
    ],
    keyTakeaways: [
      "Abstract class = IS-A with state & constructors (Single inheritance).",
      "Interface = CAN-DO contract with constants only (Multiple inheritance).",
      "A class can extend 1 abstract class and implement multiple interfaces simultaneously.",
    ],
  },
];
