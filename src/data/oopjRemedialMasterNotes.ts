/**
 * ITM University — OOPJ (C2311C1) Remedial Special Master Notes
 * Complete Zero-to-Hero Syllabus Guide for Unit 2 & Unit 3
 * EXPANDED EDITION — every topic has exhaustive theory, complete programs, exact outputs.
 * A student who knows NOTHING about Java can read this and pass the exam.
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
  subtitle: "Read this first if you have zero background in Java",
  content: `
### 1. What is Java and Why Does It Exist?

Java is a high-level, class-based, object-oriented programming language created by **James Gosling** at Sun Microsystems in **1995** (now owned by Oracle).

Its most famous promise is: **"Write Once, Run Anywhere" (WORA)**

**The Problem Java Solved:**
In C/C++, your code compiled into machine code for ONE specific CPU. A Windows .exe would not run on Linux. Java solved this with two layers:

\`\`\`
Your Code (.java)
      |
  [javac compiler]    ← translates to platform-independent BYTECODE
      |
  Bytecode (.class)   ← same on ALL platforms (Windows, Mac, Linux)
      |
    [JVM]             ← each OS has its own JVM that reads bytecode
      |
  Machine Code        ← native CPU instructions
\`\`\`

---

### 2. JDK vs JRE vs JVM — The Golden Exam Triangle

\`\`\`
+------------------------------------------------------------------+
|              JDK  (Java Development Kit)                         |
|  javac (compiler), javadoc, jar tool, debugger (jdb)            |
|                                                                  |
|  +------------------------------------------------------------+  |
|  |          JRE  (Java Runtime Environment)                   |  |
|  |  Standard Libraries: java.lang, java.util, java.io         |  |
|  |                                                            |  |
|  |  +------------------------------------------------------+  |  |
|  |  |        JVM  (Java Virtual Machine)                   |  |  |
|  |  |  ClassLoader + Bytecode Verifier + Execution Engine  |  |  |
|  |  |  Memory: Heap + Stack + Method Area + PC Register    |  |  |
|  |  |  Garbage Collector (automatic memory management)     |  |  |
|  |  +------------------------------------------------------+  |  |
|  +------------------------------------------------------------+  |
+------------------------------------------------------------------+
\`\`\`

| Term | Full Form | Who Needs It |
|------|-----------|--------------|
| **JVM** | Java Virtual Machine | Everyone at runtime |
| **JRE** | Java Runtime Environment | End users running apps |
| **JDK** | Java Development Kit | Developers & students writing code |

> **Exam tip**: "Which executes bytecode?" → JVM. "What does javac belong to?" → JDK.

---

### 3. Anatomy of Every Java Program — Keyword by Keyword

\`\`\`java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, ITM Students!");
    }
}
\`\`\`

| Keyword | Why It Is Required |
|---------|-------------------|
| \`public class Main\` | Everything in Java lives inside a class; name MUST match filename |
| \`public\` (on main) | JVM calls main() from outside the package — must be accessible |
| \`static\` (on main) | JVM calls main() WITHOUT creating an object of Main first |
| \`void\` | main() returns nothing to the OS when program ends |
| \`main\` | Hardcoded JVM entry-point — the JVM literally looks for this name |
| \`String[] args\` | Command-line arguments passed as a String array |
| \`System.out.println\` | System=class, out=PrintStream field, println=method |

---

### 4. Java Memory Model — Stack vs Heap (Critical for All Unit 2 Topics)

\`\`\`
STACK MEMORY (per thread)          HEAP MEMORY (shared by all threads)
- Local variables                  - All objects created with 'new'
- Method call frames (LIFO)        - Garbage Collected automatically
- Reference variables              - Objects live until GC removes them
- Very fast                        - Bigger, slightly slower

Example: Student s = new Student("Ali", 1);

   STACK                              HEAP
  ┌──────────┐                   ┌──────────────────────┐
  │  s       │ ─── (address) ──► │  [Student Object]    │
  │ (ref)    │                   │  name   = "Ali"      │
  └──────────┘                   │  rollNo = 1          │
                                 └──────────────────────┘
\`\`\`

---

### 5. The 4 Pillars of OOP — What Every Exam Tests

| Pillar | Definition | Java Mechanism |
|--------|------------|----------------|
| **Encapsulation** | Bundle data + methods; hide internals | \`private\` fields + getters/setters |
| **Abstraction** | Show WHAT, hide HOW | \`abstract\` class, \`interface\` |
| **Inheritance** | Child acquires parent's members | \`extends\`, \`implements\` |
| **Polymorphism** | Same name, different behavior | Overloading (compile-time), Overriding (runtime) |

---

### 6. The 4-Step Answer Formula for Full Marks

1. **1-Line Definition** — examiner sees you know the concept (+1 mark)
2. **Syntax / Diagram / Memory Model** — shows deep understanding (+1-2 marks)
3. **Compilable Java Code with Comments** — practical proof (+2-3 marks)
4. **Exact Terminal Output** — ALWAYS include; losing marks here is wasteful
`,
};

export const REMEDIAL_SYLLABUS_SECTIONS: SyllabusTopicSection[] = [
  // ─────────────────────────────────────────────────────────────────────────────
  // UNIT 2
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "unit2-class-object",
    unit: 2,
    unitTitle: "Unit 2: Classes, Objects and Methods",
    topicTitle: "Class, Object, Object Reference & The new Operator",
    syllabusKeywords: ["Class", "Object", "Object reference", "new operator", "instance", "heap", "stack"],
    examMarksWeightage: "Both (Frequent)",
    beginnerConcept:
      "A Class is a COOKIE CUTTER — it defines the shape but has no physical existence. An Object is the actual COOKIE — created from the cutter, exists in memory (the Heap). An Object Reference is the label on the cookie bag telling you WHERE the cookie is stored. The 'new' keyword is the act of pressing the cutter into dough.",
    detailedTheory: `
#### 1. What is a Class? (The Blueprint)

A **class** is a user-defined blueprint that defines:
- **State (Data Members / Fields)**: What the object KNOWS — e.g., \`name\`, \`rollNo\`, \`marks\`
- **Behavior (Methods)**: What the object CAN DO — e.g., \`study()\`, \`calculateGrade()\`
- **Identity**: Each object has a unique memory address distinguishing it from others

A class by itself occupies NO memory for its data members — it is like a recipe card.

**Class Syntax:**
\`\`\`java
[access_modifier] class ClassName {
    // Fields (State)
    dataType fieldName;

    // Constructor
    ClassName(parameters) { /* initialize fields */ }

    // Methods (Behavior)
    returnType methodName(parameters) { /* code */ }
}
\`\`\`

---

#### 2. What is an Object? (The Instance)

An **object** is the concrete, memory-occupying instance of a class. It lives in **Heap Memory**. Every object has:
1. **State**: Current values of its instance variables
2. **Behavior**: The methods it can respond to  
3. **Identity**: Its unique heap address

---

#### 3. Object Reference vs Object — The Critical Distinction (5-Mark Topic)

\`\`\`
    STACK MEMORY                        HEAP MEMORY
  ┌─────────────────┐               ┌──────────────────────────────┐
  │  Student s1     │ ─(addr 0x4A)─►│  [Student Object]            │
  │  (holds: 0x4A)  │               │  name   = "Rahul"            │
  └─────────────────┘               │  rollNo = 101                │
                                    │  marks  = 95.5               │
  ┌─────────────────┐               └──────────────────────────────┘
  │  Student s2=s1  │ ─(addr 0x4A)─► SAME OBJECT! (not a copy)
  │  (holds: 0x4A)  │
  └─────────────────┘

  // s1 and s2 → ONE object. Modifying via s2 changes what s1 sees!

  ┌─────────────────┐               ┌──────────────────────────────┐
  │  Student s3     │ ─(addr 0x7B)─►│  [Separate Student Object]   │
  └─────────────────┘               └──────────────────────────────┘
\`\`\`

**The \`null\` Reference:**
\`\`\`java
Student s;           // s = null — points to NOTHING on heap
s.display();         // NullPointerException! Cannot access via null
\`\`\`

---

#### 4. The 3 Internal Phases of 'new'

When you write \`Student s = new Student("Rahul", 101);\` Java does 3 things:

| Phase | What Happens |
|-------|-------------|
| **1. Declaration** | Stack space allocated for reference \`s\`; initially holds \`null\` |
| **2. Instantiation** | JVM allocates heap memory for all Student fields (zero-initialized: 0, null, false) |
| **3. Initialization** | Constructor \`Student("Rahul", 101)\` is called; fields set to real values; heap address returned to \`s\` |

---

#### 5. Anonymous Objects

Created without assigning to a reference — used only once, immediately eligible for Garbage Collection:
\`\`\`java
new Student("Ali", 102).display();  // Created, used, then gone
\`\`\`
`,
    codeSnippet: `// Complete Program: Classes, Objects, References, new operator
class Student {
    String name;
    int rollNo;
    double marks;

    // Parameterized Constructor
    Student(String name, int rollNo, double marks) {
        this.name   = name;
        this.rollNo = rollNo;
        this.marks  = marks;
    }

    void display() {
        System.out.println("Roll: " + rollNo + " | Name: " + name
                           + " | Marks: " + marks);
    }

    // Returns a NEW object (demonstrates object as return type)
    Student withBonus(double bonus) {
        return new Student(this.name, this.rollNo, this.marks + bonus);
    }
}

public class Main {
    public static void main(String[] args) {

        // --- 1: Basic object creation ---
        System.out.println("=== 1. Basic Object Creation ===");
        Student s1 = new Student("Rahul", 101, 72.0);
        s1.display();

        // --- 2: Two references, ONE object (aliasing) ---
        System.out.println("\\n=== 2. Aliased References (same object) ===");
        Student s2 = s1;   // s2 points to the SAME heap object
        s2.marks = 88.0;   // mutating via s2
        System.out.print("s1 after changing via s2: ");
        s1.display();      // s1 sees the change — same object!

        // --- 3: Two genuinely different objects ---
        System.out.println("\\n=== 3. Two Separate Objects ===");
        Student s3 = new Student("Ayesha", 102, 91.5);
        s3.marks = 95.0;   // only s3's object changes
        s1.display();      // s1 unchanged
        s3.display();      // s3 changed

        // --- 4: Anonymous object ---
        System.out.println("\\n=== 4. Anonymous Object (no reference) ===");
        new Student("Anonymous", 999, 55.0).display();

        // --- 5: Object returned from method ---
        System.out.println("\\n=== 5. Object Returned from Method ===");
        Student boosted = s3.withBonus(5.0);
        boosted.display();
    }
}`,
    output: `=== 1. Basic Object Creation ===
Roll: 101 | Name: Rahul | Marks: 72.0

=== 2. Aliased References (same object) ===
s1 after changing via s2: Roll: 101 | Name: Rahul | Marks: 88.0

=== 3. Two Separate Objects ===
Roll: 101 | Name: Rahul | Marks: 88.0
Roll: 102 | Name: Ayesha | Marks: 95.0

=== 4. Anonymous Object (no reference) ===
Roll: 999 | Name: Anonymous | Marks: 55.0

=== 5. Object Returned from Method ===
Roll: 102 | Name: Ayesha | Marks: 100.0`,
    commonMistakesToAvoid: [
      "Writing 'Student s;' and thinking an object exists. It does NOT — only a null reference exists on the stack.",
      "Thinking 's2 = s1' copies the object. It copies the MEMORY ADDRESS — both point to the same single object.",
      "Forgetting that modifying an object through one alias affects all other references to that same object.",
      "Calling methods on a null reference — NullPointerException at runtime.",
      "Confusing class (blueprint, no memory) with object (instance, real heap memory).",
    ],
    keyTakeaways: [
      "Class = Blueprint (no memory for fields). Object = Live instance on Heap (has memory).",
      "Reference variable lives on STACK and holds an address. Object lives on HEAP.",
      "'new' does 3 things: allocate heap, call constructor, return address to reference.",
      "Two references to same object — one change affects the other view too.",
      "Anonymous objects have no reference and are immediately garbage-collectible.",
    ],
  },

  {
    id: "unit2-constructors",
    unit: 2,
    unitTitle: "Unit 2: Classes, Objects and Methods",
    topicTitle: "Constructors, Constructor Overloading & this() Constructor Chaining",
    syllabusKeywords: ["Constructor", "Default constructor", "Parameterized constructor", "Constructor Overloading", "this keyword", "this()", "constructor chaining", "copy constructor"],
    examMarksWeightage: "Both (Frequent)",
    beginnerConcept:
      "A constructor is the BIRTH CEREMONY of every object. The instant 'new' carves out memory in the Heap, the constructor AUTOMATICALLY runs to fill that memory with meaningful values. You never call it by name — Java calls it for you. Constructor Overloading = multiple birth ceremonies (you can be born as a basic user, or a premium user, depending on arguments). this() chaining = one ceremony delegates to another so no one repeats setup work.",
    detailedTheory: `
#### 1. What is a Constructor?

A **constructor** is a special block of code that:
1. Has the **exact same name as the class** (case-sensitive)
2. Has **NO return type** — not even \`void\` (if you write \`void\`, Java treats it as a regular method!)
3. Is **automatically called** by the JVM when you execute \`new ClassName()\`
4. Its job is to **initialize the object's instance variables** with starting values

**Syntax:**
\`\`\`java
class ClassName {
    ClassName()                    { /* no-arg (default) constructor */ }
    ClassName(Type p1, Type p2)    { /* parameterized constructor */    }
}
\`\`\`

---

#### 2. Types of Constructors

| Type | Description | When Java Provides It |
|------|-------------|----------------------|
| **Default (no-arg)** | Zero parameters; body just calls \`super()\` | Only if you write NO constructors at all |
| **Parameterized** | Takes parameters to set fields with custom values | Manually written |
| **Copy Constructor** | Takes same-class object as param; copies its state | Manually written (Java has no built-in one) |

> **CRITICAL EXAM RULE**: The moment you define ANY constructor (even one parameterized constructor), Java's compiler **removes** the automatic default constructor. Calling \`new Student()\` then becomes a **compile-time error** unless you also manually write the no-arg constructor!

---

#### 3. The \`this\` Keyword — 4 Uses

\`this\` is a reference to the **current object** (the object currently executing the method/constructor):

| Use # | Syntax | Purpose |
|-------|--------|---------|
| 1 | \`this.name = name;\` | Resolve name conflict between field and parameter |
| 2 | \`this(arg1, arg2);\` | Constructor chaining — call another constructor (FIRST LINE only) |
| 3 | \`someMethod(this);\` | Pass current object as argument to another method |
| 4 | \`return this;\` | Return current object (enables method chaining / builder pattern) |

---

#### 4. Constructor Chaining with this(...)

**Constructor Chaining** = calling one constructor FROM another constructor inside the same class.

\`\`\`
RULES (Exam Rules — very strict):
1. this(...) MUST be the VERY FIRST STATEMENT in the constructor body
2. NO circular chaining: A→B→A causes "Recursive constructor invocation" compile error
3. Only ONE this(...) allowed per constructor
4. this(...) and super(...) CANNOT both be first line — choose one

Execution flow for Book() → this("ITM","Faculty",0.0):

new Book()
  ↓
Book() body starts
  ↓ (this("ITM","Faculty",0.0) on line 1 — deferred)
Book("ITM","Faculty",0.0) runs FIRST → initializes all fields
  ↓ (returns)
Book() body continues after this(...)
\`\`\`

---

#### 5. Copy Constructor (Java Requires Manual Writing)

Java does **not** have a built-in copy constructor. You write it manually:
\`\`\`java
Student(Student original) {
    this.name   = original.name;
    this.rollNo = original.rollNo;
    this.marks  = original.marks;
}
\`\`\`
This creates a **truly independent object** — unlike \`s2 = s1\` (aliasing), modifying the copy does NOT affect the original.

---

#### 6. Default Values When Object is Created (Before Constructor Runs)

Before the constructor body executes, all fields get these zero-values:

| Data Type | Default Value |
|-----------|---------------|
| int, short, byte, long | 0 |
| float, double | 0.0 |
| char | '\\u0000' (null char) |
| boolean | false |
| Object reference (String, arrays, etc.) | null |
`,
    codeSnippet: `// Complete Program: All Constructor Types + Chaining + Copy Constructor
class BankAccount {
    String holderName;
    String accountType;
    double balance;
    static int totalAccounts = 0;  // tracks how many accounts exist

    // ─── Constructor 1: Default / No-arg ───────────────────────────────
    BankAccount() {
        this("Unknown Holder", "Savings", 1000.0); // chain to master — FIRST LINE
        System.out.println("  [No-arg constructor done]");
    }

    // ─── Constructor 2: Name + Type only ───────────────────────────────
    BankAccount(String name, String type) {
        this(name, type, 500.0); // chain to master — FIRST LINE
        System.out.println("  [2-arg constructor done for: " + name + "]");
    }

    // ─── Constructor 3: Master / Full parameterized ─────────────────────
    BankAccount(String name, String type, double initialBalance) {
        this.holderName  = name;           // 'this.field' resolves name clash
        this.accountType = type;
        this.balance     = initialBalance;
        totalAccounts++;
        System.out.println("  [Master 3-arg constructor done for: " + name + "]");
    }

    // ─── Constructor 4: Copy Constructor ───────────────────────────────
    BankAccount(BankAccount original) {
        // Creates independent copy with "(Copy)" suffix
        this(original.holderName + " (Copy)", original.accountType, original.balance);
        System.out.println("  [Copy constructor done]");
    }

    void display() {
        System.out.println("    Account: " + holderName
            + " | Type: " + accountType
            + " | Balance: Rs." + balance);
    }
}

public class Main {
    public static void main(String[] args) {
        System.out.println("=== 1. No-arg Constructor (chains to master) ===");
        BankAccount a1 = new BankAccount();
        a1.display();

        System.out.println("\\n=== 2. Two-arg Constructor (chains to master) ===");
        BankAccount a2 = new BankAccount("Rahul Sharma", "Current");
        a2.display();

        System.out.println("\\n=== 3. Full 3-arg Constructor ===");
        BankAccount a3 = new BankAccount("Ayesha Khan", "Fixed Deposit", 75000.0);
        a3.display();

        System.out.println("\\n=== 4. Copy Constructor — independent copy ===");
        BankAccount a4 = new BankAccount(a3);   // copy of a3
        a4.balance = 100.0;                      // change copy only
        System.out.println("  Original a3:"); a3.display();
        System.out.println("  Copy a4:");    a4.display();

        System.out.println("\\nTotal BankAccount objects created: " + BankAccount.totalAccounts);
    }
}`,
    output: `=== 1. No-arg Constructor (chains to master) ===
  [Master 3-arg constructor done for: Unknown Holder]
  [No-arg constructor done]
    Account: Unknown Holder | Type: Savings | Balance: Rs.1000.0

=== 2. Two-arg Constructor (chains to master) ===
  [Master 3-arg constructor done for: Rahul Sharma]
  [2-arg constructor done for: Rahul Sharma]
    Account: Rahul Sharma | Type: Current | Balance: Rs.500.0

=== 3. Full 3-arg Constructor ===
  [Master 3-arg constructor done for: Ayesha Khan]
    Account: Ayesha Khan | Type: Fixed Deposit | Balance: Rs.75000.0

=== 4. Copy Constructor — independent copy ===
  [Master 3-arg constructor done for: Ayesha Khan (Copy)]
  [Copy constructor done]
  Original a3:
    Account: Ayesha Khan | Type: Fixed Deposit | Balance: Rs.75000.0
  Copy a4:
    Account: Ayesha Khan (Copy) | Type: Fixed Deposit | Balance: Rs.100.0

Total BankAccount objects created: 4`,
    commonMistakesToAvoid: [
      "Writing 'void BankAccount()' — adding void makes it a regular METHOD, not a constructor!",
      "Defining only a parameterized constructor and then calling 'new BankAccount()' — compile error because Java removed the default constructor.",
      "Placing this(...) anywhere other than the FIRST LINE of the constructor — this is a compile error.",
      "Trying to use both this(...) and super(...) as the first statement — only one is allowed.",
      "Confusing 's2 = s1' (aliasing — one object) with copy constructor (two independent objects).",
    ],
    keyTakeaways: [
      "Constructor: same name as class, NO return type, auto-invoked by 'new'.",
      "Java provides default constructor ONLY if you write ZERO constructors — add one yourself if needed.",
      "'this.field = param' resolves naming conflict between instance field and constructor parameter.",
      "'this(...)' chains constructors — eliminates code duplication — MUST be the first statement.",
      "Copy constructor gives a truly independent object; aliasing (s2=s1) gives two names for one object.",
    ],
  },

  {
    id: "unit2-method-overloading",
    unit: 2,
    unitTitle: "Unit 2: Classes, Objects and Methods",
    topicTitle: "Method Overloading — Compile-Time / Static Polymorphism",
    syllabusKeywords: ["Method Overloading", "Static polymorphism", "Compile-time polymorphism", "method signature", "type promotion"],
    examMarksWeightage: "Both (Frequent)",
    beginnerConcept:
      "A PRINTER can print documents, photos, and labels — you always press 'Print' but the printer adapts to what you give it. Method Overloading is that: the SAME method name, multiple versions with different parameters. Java picks the right version at COMPILE TIME (before running), which is why it is called Compile-Time Polymorphism.",
    detailedTheory: `
#### 1. What is Method Overloading?

**Method Overloading** = multiple methods in the **same class** with the **same name** but **different parameter lists**.

Java resolves which version to call at **compile time** based on argument count, types, and order.

> **One-liner for exam**: "Method Overloading allows a class to have multiple methods with the same name, differentiated by their parameter lists, resolved at compile time."

---

#### 2. What Makes a Method Signature Different?

The **method signature** = method name + parameter list (types, count, order). Return type is NOT part of the signature.

| Change | Creates New Overload? | Example |
|--------|-----------------------|---------|
| Different number of params | ✅ YES | \`add(int)\` vs \`add(int,int)\` |
| Different types of params | ✅ YES | \`add(int,int)\` vs \`add(double,double)\` |
| Different order of types | ✅ YES | \`show(int,String)\` vs \`show(String,int)\` |
| Different return type only | ❌ NO — Compile Error | \`int add(int,int)\` vs \`double add(int,int)\` |
| Different param names only | ❌ NO — Same Signature | \`add(int a, int b)\` vs \`add(int x, int y)\` |
| Different access modifier | ❌ NO — Same Signature | \`public add(int)\` vs \`private add(int)\` |

---

#### 3. Automatic Type Promotion (Widening) in Overloading

When no exact match exists, Java **widens** the argument type to the next larger compatible type:

\`\`\`
byte → short → int → long → float → double
                 char ──────────┘
\`\`\`

\`\`\`java
void show(long a)   { System.out.println("long version: "   + a); }
void show(double a) { System.out.println("double version: " + a); }

show(100);    // int → widened to long (closest fit). Prints "long version: 100"
show(3.14f);  // float → widened to double. Prints "double version: 3.14..."
\`\`\`

---

#### 4. Overloading vs Overriding — The Must-Know Comparison Table

| Feature | Method **Overloading** | Method **Overriding** |
|---------|------------------------|----------------------|
| Location | Same class | Parent class + Child class |
| Method name | Same | Same |
| Parameters | **Must be different** | Must be identical |
| Return type | Can differ | Must be same (or covariant) |
| Resolved at | **Compile time** | **Runtime** |
| Polymorphism type | Static / Compile-time | Dynamic / Runtime |
| Needs inheritance? | NO | YES |
| @Override annotation | Not used | Recommended |
| private/static methods | Can be overloaded | Cannot be overridden |

---

#### 5. Why Use Overloading?

Instead of \`addTwoInts()\`, \`addThreeInts()\`, \`addTwoDoubles()\` — just have one intuitive name \`add()\` that adapts to its inputs. Cleaner API, easier to remember.
`,
    codeSnippet: `// Complete Program: Method Overloading with Calculator
class Calculator {

    // Overload 1: add two integers
    int add(int a, int b) {
        System.out.println("  [Calling: int+int version]");
        return a + b;
    }

    // Overload 2: add three integers
    int add(int a, int b, int c) {
        System.out.println("  [Calling: int+int+int version]");
        return a + b + c;
    }

    // Overload 3: add two doubles
    double add(double a, double b) {
        System.out.println("  [Calling: double+double version]");
        return a + b;
    }

    // Overload 4: int first, then double
    double add(int a, double b) {
        System.out.println("  [Calling: int+double version]");
        return a + b;
    }

    // Overload 5: double first, then int (different order = different signature)
    double add(double a, int b) {
        System.out.println("  [Calling: double+int version]");
        return a + b;
    }

    // For type promotion demo
    void show(long a)   { System.out.println("  [long version]   value = " + a); }
    void show(double a) { System.out.println("  [double version] value = " + a); }
}

public class Main {
    public static void main(String[] args) {
        Calculator calc = new Calculator();

        System.out.println("=== Overloaded add() Calls ===");
        System.out.println("add(3, 5)        = " + calc.add(3, 5));
        System.out.println("add(1, 2, 3)     = " + calc.add(1, 2, 3));
        System.out.println("add(2.5, 3.5)    = " + calc.add(2.5, 3.5));
        System.out.println("add(5, 2.5)      = " + calc.add(5, 2.5));
        System.out.println("add(2.5, 5)      = " + calc.add(2.5, 5));

        System.out.println("\\n=== Type Promotion Demo ===");
        calc.show(100);    // int → promoted to long (not double, because long is smaller/closer)
        calc.show(3.14f);  // float → promoted to double
    }
}`,
    output: `=== Overloaded add() Calls ===
  [Calling: int+int version]
add(3, 5)        = 8
  [Calling: int+int+int version]
add(1, 2, 3)     = 6
  [Calling: double+double version]
add(2.5, 3.5)    = 6.0
  [Calling: int+double version]
add(5, 2.5)      = 7.5
  [Calling: double+int version]
add(2.5, 5)      = 7.5

=== Type Promotion Demo ===
  [long version]   value = 100
  [double version] value = 3.140000104904175`,
    commonMistakesToAvoid: [
      "Attempting to overload by changing ONLY the return type — this is a compile error.",
      "Confusing overloading (same class) with overriding (parent + child class).",
      "Forgetting that parameter ORDER matters: add(int, double) ≠ add(double, int).",
      "Expecting int to promote directly to double when a long version is available (Java picks closest fit first).",
    ],
    keyTakeaways: [
      "Same method name + different parameter lists in ONE class = Method Overloading.",
      "Resolved at COMPILE TIME → also called Static Polymorphism.",
      "Return type alone CANNOT distinguish overloaded methods.",
      "Java auto-widens (promotes) argument types when no exact match exists.",
      "Overloading creates a cleaner API — one intuitive name covers all argument variants.",
    ],
  },

  {
    id: "unit2-recursion",
    unit: 2,
    unitTitle: "Unit 2: Classes, Objects and Methods",
    topicTitle: "Recursion & Call Stack Mechanics",
    syllabusKeywords: ["Recursion", "recursive method", "base case", "recursive case", "call stack", "stack overflow"],
    examMarksWeightage: "Both (Frequent)",
    beginnerConcept:
      "Recursion is a method that CALLS ITSELF to solve a smaller piece of the same problem, until the problem is so small it can be answered directly (the base case). It is like looking up a word in a dictionary, and that definition uses another word you don't know, so you look that up too — until you find a word whose meaning you already know (base case), and then you build up your understanding going backward.",
    detailedTheory: `
#### 1. What is Recursion?

**Recursion** = a method that calls itself. Every recursive solution has exactly TWO parts:

| Part | Technical Name | Purpose |
|------|---------------|---------|
| **Direct answer** | **Base Case** | The stopping condition — prevents infinite recursion |
| **Self-call with smaller input** | **Recursive Case** | Breaks the problem into a smaller instance of itself |

**Structure of every recursive method:**
\`\`\`java
returnType methodName(parameters) {
    if (base_condition) {        // BASE CASE — always check this first!
        return simple_answer;
    }
    // RECURSIVE CASE — call itself with a smaller/simpler input
    return methodName(smaller_input);
}
\`\`\`

> **CRITICAL**: If you forget the base case, Java runs infinitely and throws **StackOverflowError**.

---

#### 2. The Call Stack — How Java Executes Recursion

Every method call creates a **stack frame** in the Call Stack. Frames stack up like plates — the last one in is the first one out (LIFO).

For \`factorial(4)\`:
\`\`\`
factorial(4) called → frame 1 pushed
  factorial(3) called → frame 2 pushed
    factorial(2) called → frame 3 pushed
      factorial(1) called → frame 4 pushed
        BASE CASE: returns 1
      frame 4 popped → returns 1
    frame 3 returns 2 × 1 = 2
  frame 2 returns 3 × 2 = 6
frame 1 returns 4 × 6 = 24

STACK grows ↓ then unwinds ↑
\`\`\`

---

#### 3. Common Recursive Problems (All Exam Favorites)

| Problem | Formula | Base Case |
|---------|---------|-----------|
| **Factorial** n! | n × factorial(n-1) | factorial(0) = 1 |
| **Fibonacci** | fib(n-1) + fib(n-2) | fib(0)=0, fib(1)=1 |
| **Sum of n numbers** | n + sum(n-1) | sum(0) = 0 |
| **Power** a^n | a × power(a, n-1) | power(a, 0) = 1 |
| **Reverse a string** | last char + reverse(rest) | length ≤ 1 |

---

#### 4. Recursion vs Iteration — Exam Comparison

| Feature | Recursion | Iteration (loops) |
|---------|-----------|-------------------|
| Syntax clarity | Often cleaner | Can be verbose |
| Memory | Stack frame per call (risk of StackOverflowError) | O(1) extra memory |
| Speed | Slower (function call overhead) | Faster |
| Best for | Tree/graph traversal, divide-and-conquer | Simple repetition |
| When to avoid | Very deep recursion (n > ~10000) | Naturally recursive problems |

---

#### 5. StackOverflowError

Java's Call Stack has a finite size (~500-1000 frames typically). Missing a base case causes infinite recursion → **StackOverflowError** (not to be confused with NullPointerException or ArrayIndexOutOfBoundsException).
`,
    codeSnippet: `// Complete Program: Recursion — Factorial, Fibonacci, Sum, Power
public class Main {

    // ─── 1. Factorial: n! = n × (n-1)! ──────────────────────────────────
    static long factorial(int n) {
        System.out.println("  factorial(" + n + ") called");
        if (n == 0 || n == 1) return 1;    // BASE CASE
        return n * factorial(n - 1);        // RECURSIVE CASE
    }

    // ─── 2. Fibonacci: fib(n) = fib(n-1) + fib(n-2) ─────────────────────
    static int fibonacci(int n) {
        if (n == 0) return 0;               // BASE CASE
        if (n == 1) return 1;               // BASE CASE
        return fibonacci(n - 1) + fibonacci(n - 2);  // RECURSIVE CASE
    }

    // ─── 3. Sum of first n natural numbers ───────────────────────────────
    static int sumToN(int n) {
        if (n == 0) return 0;               // BASE CASE
        return n + sumToN(n - 1);           // RECURSIVE CASE
    }

    // ─── 4. Power: a^n ───────────────────────────────────────────────────
    static long power(int base, int exp) {
        if (exp == 0) return 1;             // BASE CASE: anything^0 = 1
        return base * power(base, exp - 1); // RECURSIVE CASE
    }

    public static void main(String[] args) {
        // Factorial
        System.out.println("=== Factorial(4) — Call Stack Trace ===");
        System.out.println("Result: " + factorial(4));

        // Fibonacci
        System.out.println("\\n=== Fibonacci Sequence (0 to 7) ===");
        System.out.print("Fibonacci: ");
        for (int i = 0; i <= 7; i++) {
            System.out.print(fibonacci(i) + " ");
        }
        System.out.println();

        // Sum
        System.out.println("\\n=== Sum of 1 to 5 ===");
        System.out.println("1+2+3+4+5 = " + sumToN(5));

        // Power
        System.out.println("\\n=== Power: 2^8 ===");
        System.out.println("2^8 = " + power(2, 8));
    }
}`,
    output: `=== Factorial(4) — Call Stack Trace ===
  factorial(4) called
  factorial(3) called
  factorial(2) called
  factorial(1) called
Result: 24

=== Fibonacci Sequence (0 to 7) ===
Fibonacci: 0 1 1 2 3 5 8 13 

=== Sum of 1 to 5 ===
1+2+3+4+5 = 15

=== Power: 2^8 ===
2^8 = 256`,
    commonMistakesToAvoid: [
      "Forgetting the base case — causes infinite recursion and StackOverflowError.",
      "Writing the base case at the BOTTOM of the method — Java still evaluates the recursive call first.",
      "Returning nothing (void) when the recursive calls need to combine results — you'll lose the answer.",
      "Confusing StackOverflowError (recursion gone infinite) with NullPointerException (null object access).",
    ],
    keyTakeaways: [
      "Recursion = method calling itself with a smaller input.",
      "TWO mandatory parts: Base Case (stop condition) + Recursive Case (smaller self-call).",
      "Each call creates a new Stack Frame — deep recursion risks StackOverflowError.",
      "Factorial(0)=1, Fibonacci(0)=0 & Fibonacci(1)=1 — memorize these base cases.",
      "Missing base case = infinite recursion = StackOverflowError on the exam.",
    ],
  },

  {
    id: "unit2-passing-returning-objects",
    unit: 2,
    unitTitle: "Unit 2: Classes, Objects and Methods",
    topicTitle: "Passing Objects to Methods & Returning Objects from Methods",
    syllabusKeywords: ["Passing object", "returning object", "pass by reference", "pass by value", "method parameters"],
    examMarksWeightage: "Both (Frequent)",
    beginnerConcept:
      "In Java, primitives (int, double) are passed BY VALUE — the method gets a copy, original stays safe. Objects are passed BY REFERENCE VALUE — the method gets the memory address of the object, so it CAN modify the original object's state (but cannot make the caller's reference point to a different object). Think of it as handing someone the GPS coordinates to your house (reference) vs handing them a photocopy of a document (primitive value).",
    detailedTheory: `
#### 1. Pass by Value vs Pass by Reference in Java

**Java is ALWAYS pass-by-value.** BUT the 'value' of an object variable is its REFERENCE (memory address). This distinction is what trips up most students.

\`\`\`
Primitive (int, double, etc.):
  int x = 10;
  modify(x);        // method receives a COPY of 10
  // x is still 10 after the method returns

Object Reference:
  Student s = new Student("Ali", 1);
  modify(s);        // method receives a COPY of the ADDRESS
  // The address points to the same heap object
  // → method CAN modify the object's fields (name, rollNo, etc.)
  // → method CANNOT make 's' point to a different object
\`\`\`

---

#### 2. Passing Objects to Methods

When an object is passed as an argument:
- A **copy of the reference** (memory address) is passed — NOT a copy of the object
- Any changes to the object's **fields** inside the method PERSIST after return
- If the method reassigns the local reference to a new object, the original caller's reference is UNAFFECTED

\`\`\`java
void doubleMarks(Student s) {
    s.marks *= 2;       // ✅ Modifies the original object in heap
    s = new Student();  // ❌ Only changes local copy of reference; caller unaffected
}
\`\`\`

---

#### 3. Returning Objects from Methods

Methods can return objects. This is used for:
- **Factory methods**: \`createDefaultStudent()\` — builds and returns a configured object
- **Object transformation**: \`withBonus(5.0)\` — returns a new modified copy
- **Builder pattern**: returns \`this\` for chaining
- **Comparing and returning**: \`findTopper(a, b)\` — returns whichever object is better

---

#### 4. Comparing Objects Inside Methods

You can pass two objects and compare them inside a method:
\`\`\`java
static Student findTopper(Student a, Student b) {
    return (a.marks >= b.marks) ? a : b;  // returns a REFERENCE to the winner
}
\`\`\`

---

#### 5. Method that Modifies vs Method that Creates New Object

| Pattern | Mutates original? | Example |
|---------|------------------|---------|
| Mutator method | ✅ YES | \`applyDiscount(Account a)\` |
| Factory/copy method | ❌ NO (returns new) | \`a.withDiscount()\` → new object |
`,
    codeSnippet: `// Complete Program: Passing & Returning Objects
class Student {
    String name;
    int rollNo;
    double marks;

    Student(String name, int rollNo, double marks) {
        this.name   = name;
        this.rollNo = rollNo;
        this.marks  = marks;
    }

    void display() {
        System.out.println("  " + name + " [Roll " + rollNo + "] — Marks: " + marks);
    }
}

public class Main {

    // ─── Method 1: Receiving an object and MODIFYING it ──────────────────
    static void applyBonus(Student s, double bonus) {
        System.out.println("  Inside applyBonus() — BEFORE: " + s.marks);
        s.marks += bonus;   // Modifies the actual heap object
        System.out.println("  Inside applyBonus() — AFTER:  " + s.marks);
        // Reassigning local reference does NOT affect caller:
        s = new Student("Ghost", 0, 0);  // Only local s changes
    }

    // ─── Method 2: Receiving an object and RETURNING a new one ───────────
    static Student createCopyWithBonus(Student original, double bonus) {
        // Does NOT mutate original — returns a fresh object
        return new Student(original.name + " (Boosted)", original.rollNo,
                           original.marks + bonus);
    }

    // ─── Method 3: Comparing two objects, returning the better one ────────
    static Student findTopper(Student a, Student b) {
        return (a.marks >= b.marks) ? a : b;
    }

    // ─── Method 4: Passing primitive vs object — key distinction ─────────
    static void tryChangeInt(int x) {
        x = 999;   // Only changes local copy; caller's x unchanged
    }

    public static void main(String[] args) {
        Student s1 = new Student("Rahul",  101, 72.0);
        Student s2 = new Student("Ayesha", 102, 91.5);

        // --- Passing object and modifying it ---
        System.out.println("=== 1. Passing Object (Modifying Fields) ===");
        System.out.println("Before applyBonus:");
        s1.display();
        applyBonus(s1, 10.0);
        System.out.println("After applyBonus (s1 was modified in heap):");
        s1.display();   // 82.0 — method DID change the heap object

        // --- Returning new object ---
        System.out.println("\\n=== 2. Returning New Object ===");
        Student s3 = createCopyWithBonus(s2, 5.0);
        System.out.println("Original s2:"); s2.display();    // unchanged
        System.out.println("New boosted s3:"); s3.display();

        // --- Comparing and returning object ---
        System.out.println("\\n=== 3. Finding Topper ===");
        Student topper = findTopper(s1, s2);
        System.out.println("Topper is:"); topper.display();

        // --- Primitive pass by value ---
        System.out.println("\\n=== 4. Primitive is Pass-by-VALUE ===");
        int score = 50;
        tryChangeInt(score);
        System.out.println("score after tryChangeInt(50) = " + score); // still 50!
    }
}`,
    output: `=== 1. Passing Object (Modifying Fields) ===
Before applyBonus:
  Rahul [Roll 101] — Marks: 72.0
  Inside applyBonus() — BEFORE: 72.0
  Inside applyBonus() — AFTER:  82.0
After applyBonus (s1 was modified in heap):
  Rahul [Roll 101] — Marks: 82.0

=== 2. Returning New Object ===
Original s2:
  Ayesha [Roll 102] — Marks: 91.5
New boosted s3:
  Ayesha (Boosted) [Roll 102] — Marks: 96.5

=== 3. Finding Topper ===
Topper is:
  Ayesha [Roll 102] — Marks: 91.5

=== 4. Primitive is Pass-by-VALUE ===
score after tryChangeInt(50) = 50`,
    commonMistakesToAvoid: [
      "Saying Java uses pass-by-reference for objects — WRONG. Java passes the VALUE of the reference (the address).",
      "Thinking reassigning the parameter inside a method changes the caller's reference — it does NOT.",
      "Forgetting that modifying the object's FIELDS via the passed reference DOES affect the original object.",
      "Returning a local object reference without understanding it points to a heap object that outlives the method's stack frame.",
    ],
    keyTakeaways: [
      "Java is ALWAYS pass-by-value. For objects, the 'value' is the memory address (reference).",
      "Modifying an object's FIELDS via a passed reference DOES change the original.",
      "Reassigning the local parameter to a new object does NOT change the caller's reference.",
      "Methods can return objects — useful for factories, transformations, and comparisons.",
      "Primitive variables are truly copied — method changes to them never affect the caller.",
    ],
  },

  {
    id: "unit2-static",
    unit: 2,
    unitTitle: "Unit 2: Classes, Objects and Methods",
    topicTitle: "The static Keyword — Variables, Methods, Blocks & Nested Classes",
    syllabusKeywords: ["static keyword", "static variable", "class variable", "static method", "static block", "static initializer"],
    examMarksWeightage: "Both (Frequent)",
    beginnerConcept:
      "Imagine a UNIVERSITY WHITEBOARD visible to every student in a classroom (static variable) vs each student's personal notebook (instance variable). The whiteboard's content belongs to the CLASSROOM itself — not any single student. Static = belongs to the CLASS, shared by ALL objects. Instance = each object has its own copy.",
    detailedTheory: `
#### 1. static Variable (Class Variable)

A **static variable** belongs to the CLASS — there is exactly ONE copy shared by ALL objects of that class.

\`\`\`
          CLASS (Counter)
         ┌──────────────────────────────────────┐
         │  static int count = 0;  ← ONE copy  │
         │  (lives in Method Area/Metaspace)    │
         └──────────────────────────────────────┘
              ↑               ↑              ↑
         Object #1       Object #2      Object #3
         (no own copy)  (no own copy)  (no own copy)
         All see the SAME count variable
\`\`\`

**Use cases for static variables:**
- Object counter (how many instances created)
- Shared configuration (e.g., TAX_RATE for all bank accounts)
- Constants (always combined with \`final\`: \`static final double PI = 3.14159;\`)

---

#### 2. static Method

A **static method** belongs to the class, not any instance. Rules:
- Can be called WITHOUT creating an object: \`ClassName.methodName()\`
- Can ONLY access other \`static\` members directly (cannot access instance variables)
- Can be overloaded but NOT overridden
- \`main()\` is static because the JVM calls it without creating any object first

\`\`\`java
class MathHelper {
    static double circleArea(double r) { return 3.14159 * r * r; }
}
// Called as:
MathHelper.circleArea(5.0);  // No object needed!
\`\`\`

---

#### 3. static Block (Static Initializer)

A **static block** runs ONCE when the class is first loaded into JVM memory — before any object is created, before \`main()\` runs:

\`\`\`java
class Config {
    static String dbUrl;
    static {
        // Runs ONCE when class loads — good for one-time setup
        dbUrl = "jdbc:mysql://localhost:3306/itmdb";
        System.out.println("Static block executed — class loaded");
    }
}
\`\`\`

**Execution order:**
\`\`\`
1. static block (when class is first loaded/referenced)
2. Constructor (when new creates an object)
3. Instance methods (when called on object)
\`\`\`

---

#### 4. static vs Instance — Complete Comparison

| Feature | static (class-level) | Instance (object-level) |
|---------|---------------------|------------------------|
| Belongs to | The CLASS | Each OBJECT |
| Memory | Method Area / Metaspace | Heap (inside each object) |
| Copies | ONE copy for all objects | One copy PER object |
| Access | \`ClassName.member\` or directly in static context | \`objectRef.member\` |
| Can access instance members? | ❌ NO (no 'this' context) | ✅ YES |
| Initialized | When class loads | When object is constructed |
| \`this\` keyword | ❌ Cannot use \`this\` | ✅ Can use \`this\` |

---

#### 5. Why Can't Static Methods Access Instance Variables?

A static method has no \`this\` reference. Instance variables exist INSIDE objects — you need an object (\`this\`) to find them. When a static method runs, there may be zero objects, one object, or a hundred objects — Java has no way to know WHICH object's instance variable to read.
`,
    codeSnippet: `// Complete Program: static variable, method, block, and counter
class Employee {
    // ─── STATIC (class-level) members ────────────────────────────────────
    static int employeeCount = 0;          // Shared counter — ONE copy
    static final String COMPANY = "ITM Solutions Pvt. Ltd.";  // Constant

    // ─── STATIC BLOCK: runs once when class is first loaded ────────────
    static {
        System.out.println("[Static Block] Employee class loaded.");
        System.out.println("[Static Block] Company: " + COMPANY);
    }

    // ─── INSTANCE (object-level) members ─────────────────────────────────
    int id;
    String name;
    double salary;

    Employee(int id, String name, double salary) {
        this.id     = id;
        this.name   = name;
        this.salary = salary;
        employeeCount++;  // static variable — increments the ONE shared copy
        System.out.println("  [Constructor] Created employee #" + employeeCount + ": " + name);
    }

    void display() {
        System.out.println("  ID: " + id + " | Name: " + name
            + " | Salary: Rs." + salary
            + " | Company: " + COMPANY);
    }

    // ─── STATIC METHOD: utility — does not need 'this' context ───────────
    static void printCompanyInfo() {
        System.out.println("  Company: " + COMPANY);
        System.out.println("  Total Employees: " + employeeCount);
        // System.out.println(name);  // COMPILE ERROR! Cannot access instance var
    }

    // ─── STATIC METHOD: finds higher salary between two employees ─────────
    static Employee higherSalary(Employee a, Employee b) {
        return (a.salary >= b.salary) ? a : b;
    }
}

public class Main {
    public static void main(String[] args) {
        System.out.println("=== Before any objects are created ===");
        Employee.printCompanyInfo();   // Call static method without object

        System.out.println("\\n=== Creating Employees ===");
        Employee e1 = new Employee(1, "Rahul Kumar",  55000.0);
        Employee e2 = new Employee(2, "Ayesha Khan",  72000.0);
        Employee e3 = new Employee(3, "Vikram Singh", 61000.0);

        System.out.println("\\n=== Employee Details ===");
        e1.display();
        e2.display();
        e3.display();

        System.out.println("\\n=== Company Summary ===");
        Employee.printCompanyInfo();

        System.out.println("\\n=== Highest Paid ===");
        Employee top = Employee.higherSalary(e1, e2);
        System.out.println("  Between e1 and e2, higher salary: " + top.name);

        System.out.println("\\n=== Shared static variable demo ===");
        System.out.println("e1.employeeCount = " + e1.employeeCount); // 3 (via object ref)
        System.out.println("e2.employeeCount = " + e2.employeeCount); // 3 (same variable!)
        System.out.println("Employee.employeeCount = " + Employee.employeeCount); // 3 (class access)
    }
}`,
    output: `[Static Block] Employee class loaded.
[Static Block] Company: ITM Solutions Pvt. Ltd.
=== Before any objects are created ===
  Company: ITM Solutions Pvt. Ltd.
  Total Employees: 0

=== Creating Employees ===
  [Constructor] Created employee #1: Rahul Kumar
  [Constructor] Created employee #2: Ayesha Khan
  [Constructor] Created employee #3: Vikram Singh

=== Employee Details ===
  ID: 1 | Name: Rahul Kumar | Salary: Rs.55000.0 | Company: ITM Solutions Pvt. Ltd.
  ID: 2 | Name: Ayesha Khan | Salary: Rs.72000.0 | Company: ITM Solutions Pvt. Ltd.
  ID: 3 | Name: Vikram Singh | Salary: Rs.61000.0 | Company: ITM Solutions Pvt. Ltd.

=== Company Summary ===
  Company: ITM Solutions Pvt. Ltd.
  Total Employees: 3

=== Highest Paid ===
  Between e1 and e2, higher salary: Ayesha Khan

=== Shared static variable demo ===
e1.employeeCount = 3
e2.employeeCount = 3
Employee.employeeCount = 3`,
    commonMistakesToAvoid: [
      "Accessing instance variables inside a static method — compile error: 'non-static variable cannot be referenced from static context'.",
      "Thinking each object has its own copy of a static variable — only ONE copy exists for the entire class.",
      "Using 'this' inside a static method — static methods have no 'this' reference.",
      "Calling a static method via an object reference (works but misleading — use ClassName.method()).",
    ],
    keyTakeaways: [
      "static = belongs to the CLASS, shared by ALL objects. One copy total.",
      "Instance = belongs to EACH OBJECT. One copy per object.",
      "static method: no 'this', cannot access instance variables, callable without object.",
      "static block: runs ONCE when class loads — before constructors and main().",
      "static final = constant: ONE shared, unchangeable value (e.g., TAX_RATE, PI).",
    ],
  },

  {
    id: "unit2-finalize",
    unit: 2,
    unitTitle: "Unit 2: Classes, Objects and Methods",
    topicTitle: "The finalize() Method & Garbage Collection",
    syllabusKeywords: ["finalize()", "Garbage Collection", "GC", "Garbage Collector", "memory management", "eligible for GC"],
    examMarksWeightage: "3-Mark",
    beginnerConcept:
      "When you 'new' an object, Java allocates heap memory for it. When the object is no longer reachable (no reference points to it), Java's Garbage Collector (GC) eventually reclaims that memory automatically — no manual free() like in C. The finalize() method is like writing a WILL: code that runs one last time just BEFORE the GC destroys the object. However, you never know WHEN the GC will run — it is not deterministic.",
    detailedTheory: `
#### 1. What is Garbage Collection (GC)?

Java manages memory automatically through the **Garbage Collector (GC)** — a background JVM thread that:
1. Identifies objects that are **no longer reachable** (no live reference points to them)
2. Reclaims their heap memory so it can be reused
3. Runs **automatically** — you do NOT call it manually (though you can hint with \`System.gc()\`)

**An object becomes eligible for GC when:**
\`\`\`java
// Case 1: Reference is set to null
Student s = new Student("Ali", 1);
s = null;            // s no longer points to the object → eligible for GC

// Case 2: Reference goes out of scope
{
    Student temp = new Student("Bob", 2);
}                    // temp's scope ends → object eligible for GC

// Case 3: Reference reassigned to a new object
Student s = new Student("Ali", 1);
s = new Student("Bob", 2);  // first object (Ali) → eligible for GC

// Case 4: Island of isolation (circular references with no external ref)
class Node { Node next; }
Node a = new Node();
Node b = new Node();
a.next = b; b.next = a;
a = null; b = null;    // Both eligible for GC (GC detects cycles)
\`\`\`

---

#### 2. The finalize() Method

\`finalize()\` is a protected method defined in \`java.lang.Object\`. It is called by the GC **ONCE** just before the object is destroyed. You override it to release non-Java resources (like file handles, database connections, native memory) before the object dies.

\`\`\`java
@Override
protected void finalize() throws Throwable {
    // cleanup code — runs once before GC destroys the object
    System.out.println("Cleaning up resources for: " + this.id);
    super.finalize();  // Always call super.finalize()!
}
\`\`\`

---

#### 3. Important Limitations of finalize()

| Limitation | Detail |
|-----------|--------|
| **Non-deterministic** | You cannot predict WHEN (or IF) GC will call finalize() |
| **Called only once** | If finalize() resurrects the object (makes it reachable again), GC will NOT call finalize() a second time |
| **Deprecated (Java 9+)** | Oracle deprecated finalize() in Java 9; prefer try-with-resources |
| **Performance hit** | Objects with finalize() take longer to GC (extra finalization queue step) |
| **No guarantee** | Program may exit before GC runs — finalize() may NEVER execute |

---

#### 4. System.gc() — Requesting GC (Only a Hint!)

\`System.gc()\` is a **request** (not a command) to the JVM to run GC. The JVM may ignore it.

\`Runtime.getRuntime().gc()\` does the same thing.

---

#### 5. Modern Alternative: try-with-resources (AutoCloseable)

\`\`\`java
try (FileReader fr = new FileReader("data.txt")) {
    // use fr
}  // fr.close() is AUTOMATICALLY called here — deterministic cleanup
\`\`\`
This is the preferred modern approach over \`finalize()\`.
`,
    codeSnippet: `// Complete Program: finalize() and Garbage Collection
class DatabaseConnection {
    private int connectionId;
    private String host;
    private boolean connected;
    private static int activeConnections = 0;

    DatabaseConnection(int id, String host) {
        this.connectionId = id;
        this.host         = host;
        this.connected    = true;
        activeConnections++;
        System.out.println("[+] Connection #" + id + " opened to " + host
            + " | Active: " + activeConnections);
    }

    void query(String sql) {
        if (connected) {
            System.out.println("  Executing on #" + connectionId + ": " + sql);
        }
    }

    void close() {
        if (connected) {
            connected = false;
            activeConnections--;
            System.out.println("[-] Connection #" + connectionId + " closed manually"
                + " | Active: " + activeConnections);
        }
    }

    // GC will call this ONCE just before destroying the object
    @Override
    protected void finalize() throws Throwable {
        if (connected) {
            connected = false;
            activeConnections--;
            System.out.println("[GC finalize()] Connection #" + connectionId
                + " closed by GC cleanup | Active: " + activeConnections);
        }
        super.finalize();  // Always call parent finalize!
    }
}

public class Main {
    public static void main(String[] args) throws InterruptedException {
        System.out.println("=== Opening Connections ===");
        DatabaseConnection c1 = new DatabaseConnection(1, "db-primary");
        DatabaseConnection c2 = new DatabaseConnection(2, "db-replica");
        DatabaseConnection c3 = new DatabaseConnection(3, "db-backup");

        System.out.println("\\n=== Using Connections ===");
        c1.query("SELECT * FROM students");
        c2.query("SELECT * FROM courses");

        System.out.println("\\n=== Manual Close (Best Practice) ===");
        c1.close();   // Explicitly closed — deterministic

        System.out.println("\\n=== Making c2 eligible for GC (set to null) ===");
        c2 = null;    // c2's object no longer reachable — eligible for GC

        System.out.println("\\n=== Requesting GC (hint — JVM may ignore) ===");
        System.gc();  // Hints to JVM: "please run GC now"
        Thread.sleep(200); // Give GC a moment (still no guarantee!)

        System.out.println("\\n=== c3 still active (in scope) ===");
        c3.query("BACKUP DATABASE");

        System.out.println("\\n=== Program ending (c3 goes out of scope) ===");
        // c3 becomes eligible for GC when main() exits
    }
}`,
    output: `=== Opening Connections ===
[+] Connection #1 opened to db-primary | Active: 1
[+] Connection #2 opened to db-replica | Active: 2
[+] Connection #3 opened to db-backup | Active: 3

=== Using Connections ===
  Executing on #1: SELECT * FROM students
  Executing on #2: SELECT * FROM courses

=== Manual Close (Best Practice) ===
[-] Connection #1 closed manually | Active: 2

=== Making c2 eligible for GC (set to null) ===

=== Requesting GC (hint — JVM may ignore) ===
[GC finalize()] Connection #2 closed by GC cleanup | Active: 1

=== c3 still active (in scope) ===
  Executing on #3: BACKUP DATABASE

=== Program ending (c3 goes out of scope) ===`,
    commonMistakesToAvoid: [
      "Relying on finalize() for critical cleanup — GC may never call it before program exit.",
      "Forgetting to call super.finalize() inside your overridden finalize() — can suppress parent cleanup.",
      "Calling System.gc() and expecting GC to run immediately — it is only a hint.",
      "Confusing finalize() with destructor in C++ — Java's finalize() is non-deterministic and not guaranteed.",
    ],
    keyTakeaways: [
      "Java GC automatically reclaims heap memory when objects are unreachable (no live reference).",
      "finalize() runs ONCE before GC destroys the object — used for non-Java resource cleanup.",
      "finalize() is non-deterministic — you cannot predict when or if it will be called.",
      "finalize() is deprecated since Java 9 — use try-with-resources (AutoCloseable) instead.",
      "An object becomes GC-eligible when: set to null, goes out of scope, or reference is reassigned.",
    ],
  },

  {
    id: "unit2-access-control",
    unit: 2,
    unitTitle: "Unit 2: Classes, Objects and Methods",
    topicTitle: "Access Control & Modifiers — private, default, protected, public",
    syllabusKeywords: ["Access control", "access modifier", "private", "default", "protected", "public", "encapsulation", "getter", "setter"],
    examMarksWeightage: "Both (Frequent)",
    beginnerConcept:
      "Access modifiers are SECURITY GUARDS for your class members. private = only you (same class) can access it, like a personal diary. default = your family (same package) can access it, like a house key. protected = family + relatives (same package + subclasses in other packages). public = everyone in the world can access it, like a public park.",
    detailedTheory: `
#### 1. The 4 Access Modifiers in Java

| Modifier | Same Class | Same Package | Subclass (other package) | Everywhere |
|----------|:----------:|:------------:|:------------------------:|:----------:|
| **private** | ✅ | ❌ | ❌ | ❌ |
| **default** (no keyword) | ✅ | ✅ | ❌ | ❌ |
| **protected** | ✅ | ✅ | ✅ | ❌ |
| **public** | ✅ | ✅ | ✅ | ✅ |

**Memory Trick**: Think of access as concentric circles expanding outward:
\`\`\`
  ┌─────────────────────────────────────────────┐
  │ public (everyone)                           │
  │  ┌────────────────────────────────────────┐ │
  │  │ protected (package + subclasses)       │ │
  │  │  ┌─────────────────────────────────┐   │ │
  │  │  │ default (same package only)     │   │ │
  │  │  │  ┌──────────────────────────┐   │   │ │
  │  │  │  │ private (same class only)│   │   │ │
  │  │  │  └──────────────────────────┘   │   │ │
  │  │  └─────────────────────────────────┘   │ │
  │  └────────────────────────────────────────┘ │
  └─────────────────────────────────────────────┘
\`\`\`

---

#### 2. Encapsulation: private Fields + public Getters/Setters

The cornerstone of encapsulation: declare fields \`private\`, expose them through controlled \`public\` methods.

**Why?**
- Validation: setter can reject invalid values (e.g., negative age)
- Flexibility: internal representation can change without breaking client code
- Security: certain fields can be read-only (no setter) or write-only (no getter)

\`\`\`java
class Student {
    private int age;      // Cannot be accessed directly from outside

    public int getAge()   { return age; }   // Getter: read access
    public void setAge(int age) {           // Setter: validated write access
        if (age > 0 && age < 120) this.age = age;
        else System.out.println("Invalid age!");
    }
}
\`\`\`

---

#### 3. Where Each Modifier Can Be Applied

| Modifier | Class | Field | Method | Constructor |
|----------|:-----:|:-----:|:------:|:-----------:|
| public | ✅ | ✅ | ✅ | ✅ |
| protected | ❌ (top-level) | ✅ | ✅ | ✅ |
| default | ✅ | ✅ | ✅ | ✅ |
| private | ❌ (top-level) | ✅ | ✅ | ✅ |

Note: A top-level class can only be \`public\` or default (no modifier). \`private\` and \`protected\` apply to inner/nested classes only.

---

#### 4. protected in Inheritance

\`protected\` is the most important modifier for inheritance. A child class in a DIFFERENT package can access parent's protected members:
\`\`\`java
// package: com.itm.base
public class Vehicle {
    protected int speed;          // Accessible in subclasses even in different packages
    private String secretCode;    // NOT accessible in subclasses!
}

// package: com.itm.derived
public class Car extends Vehicle {
    void accelerate() {
        speed += 10;  // ✅ protected — accessible via inheritance
        // secretCode; ❌ private — NOT accessible
    }
}
\`\`\`
`,
    codeSnippet: `// Complete Program: All 4 Access Modifiers + Encapsulation with Getters/Setters
class Employee {
    // private: accessible only inside Employee class
    private int id;
    private double salary;
    private String ssn; // sensitive — no getter for full SSN

    // default (no modifier): accessible within same package
    String department;

    // protected: accessible in subclasses (even in other packages)
    protected String name;

    // public: accessible everywhere
    public String email;

    // Constructor (public) — used to initialize private fields
    public Employee(int id, String name, String dept, double salary, String ssn) {
        this.id         = id;
        this.name       = name;
        this.department = dept;
        this.salary     = salary;
        this.ssn        = ssn;
        this.email      = name.toLowerCase().replace(" ", ".") + "@itm.edu.in";
    }

    // public getter for private 'id' (read-only — no setter)
    public int getId() { return id; }

    // public getter for private 'salary'
    public double getSalary() { return salary; }

    // public setter with validation
    public void setSalary(double salary) {
        if (salary < 0) {
            System.out.println("  [Error] Salary cannot be negative. Rejected.");
        } else if (salary > 5000000) {
            System.out.println("  [Error] Salary exceeds policy limit. Rejected.");
        } else {
            this.salary = salary;
            System.out.println("  [OK] Salary updated to Rs." + salary);
        }
    }

    // Only last 4 digits of SSN accessible (partial getter = data masking)
    public String getMaskedSSN() {
        return "****-****-" + ssn.substring(ssn.length() - 4);
    }

    public void display() {
        System.out.println("  ID: " + id + " | Name: " + name
            + " | Dept: " + department + " | Salary: Rs." + salary
            + " | Email: " + email + " | SSN: " + getMaskedSSN());
    }
}

// Subclass (same package) — can access protected 'name'
class Manager extends Employee {
    private String teamLead;

    Manager(int id, String name, String dept, double salary, String ssn, String lead) {
        super(id, name, dept, salary, ssn);
        this.teamLead = lead;
    }

    void displayManagerInfo() {
        // Can access protected 'name' from parent
        System.out.println("  Manager: " + name + " (protected field)");
        System.out.println("  Team Lead: " + teamLead);
        // System.out.println(salary); // private — COMPILE ERROR
        System.out.println("  Salary (via getter): Rs." + getSalary());
    }
}

public class Main {
    public static void main(String[] args) {
        Employee e = new Employee(1, "Rahul Sharma", "Engineering", 75000.0, "123-45-6789");

        System.out.println("=== Employee Details ===");
        e.display();

        System.out.println("\\n=== Accessing Public Fields Directly ===");
        System.out.println("  email (public):      " + e.email);         // ✅
        System.out.println("  department (default): " + e.department);   // ✅ (same package)
        System.out.println("  name (protected):    " + e.name);          // ✅ (same package)
        // System.out.println(e.id);     // ❌ private — compile error
        // System.out.println(e.salary); // ❌ private — compile error

        System.out.println("\\n=== Using Getters/Setters (Encapsulation) ===");
        System.out.println("  ID (via getter): " + e.getId());
        System.out.println("  Salary (via getter): Rs." + e.getSalary());

        System.out.println("\\n=== Setter Validation Demo ===");
        e.setSalary(90000.0);    // Valid
        e.setSalary(-5000.0);    // Rejected
        e.setSalary(9999999.0);  // Rejected

        System.out.println("\\n=== Manager (subclass) accessing protected field ===");
        Manager m = new Manager(2, "Ayesha Khan", "Management", 120000.0, "987-65-4321", "Rahul");
        m.displayManagerInfo();
    }
}`,
    output: `=== Employee Details ===
  ID: 1 | Name: Rahul Sharma | Dept: Engineering | Salary: Rs.75000.0 | Email: rahul.sharma@itm.edu.in | SSN: ****-****-6789

=== Accessing Public Fields Directly ===
  email (public):      rahul.sharma@itm.edu.in
  department (default): Engineering
  name (protected):    Rahul Sharma

=== Using Getters/Setters (Encapsulation) ===
  ID (via getter): 1
  Salary (via getter): Rs.75000.0

=== Setter Validation Demo ===
  [OK] Salary updated to Rs.90000.0
  [Error] Salary cannot be negative. Rejected.
  [Error] Salary exceeds policy limit. Rejected.

=== Manager (subclass) accessing protected field ===
  Manager: Ayesha Khan (protected field)
  Team Lead: Rahul
  Salary (via getter): Rs.120000.0`,
    commonMistakesToAvoid: [
      "Forgetting that 'default' (no modifier) is NOT accessible outside the package — a common misunderstanding.",
      "Declaring a top-level class as 'private' — only public or default allowed for top-level classes.",
      "Accessing private fields of parent class directly in a child class — must use public/protected getter.",
      "Not calling super() in child constructor when parent has no default constructor.",
    ],
    keyTakeaways: [
      "4 modifiers (widest to narrowest): public → protected → default → private.",
      "private: same class only. default: same package. protected: package + subclasses. public: everywhere.",
      "Encapsulation = private fields + public getters/setters with validation logic.",
      "protected is essential for inheritance across packages.",
      "A top-level class can only be public or default — never private or protected.",
    ],
  },

  {
    id: "unit2-nested-inner-classes",
    unit: 2,
    unitTitle: "Unit 2: Classes, Objects and Methods",
    topicTitle: "Nested Classes — Member Inner, Static Nested, Local & Anonymous Inner Classes",
    syllabusKeywords: ["Nested class", "Inner class", "Member inner class", "Static nested class", "Local inner class", "Anonymous inner class", "anonymous class"],
    examMarksWeightage: "Both (Frequent)",
    beginnerConcept:
      "A nested class is a class defined INSIDE another class. It is like a room built inside a house — the room (inner class) can access the house's furniture (outer class members). There are 4 types: Member Inner Class (regular room), Static Nested Class (independent guest room attached to house), Local Inner Class (temporary pop-up tent inside a method), Anonymous Inner Class (a tent you build AND use simultaneously — no name given).",
    detailedTheory: `
#### 1. Why Nested Classes Exist

Nested classes allow:
1. **Logical grouping**: a class that is only useful to one other class should live inside it
2. **Increased encapsulation**: inner class can be \`private\`; outside world cannot use it
3. **More readable code**: related classes grouped together
4. **Access to outer class members**: inner classes can directly access outer class private members

---

#### 2. Types of Nested Classes

\`\`\`
Nested Classes
├── Static Nested Class (associated with outer CLASS, not outer object)
└── Inner Classes (associated with outer OBJECT)
    ├── Member Inner Class (defined at class level, non-static)
    ├── Local Inner Class (defined inside a method)
    └── Anonymous Inner Class (defined + instantiated in one expression)
\`\`\`

---

#### 3. Member Inner Class

- Defined at the class body level (not inside any method)
- Non-static — requires an instance of the outer class to exist first
- Has full access to ALL outer class members (even private ones)

\`\`\`java
class Outer {
    private int x = 10;
    class Inner {
        void show() { System.out.println(x); }  // Can access outer's private x!
    }
}
// Creating: need an outer object first
Outer outer = new Outer();
Outer.Inner inner = outer.new Inner();  // Special syntax!
inner.show();
\`\`\`

---

#### 4. Static Nested Class

- Defined with \`static\` keyword at class body level
- Can be instantiated WITHOUT an outer class object
- Can ONLY access static members of the outer class (no \`this\` reference to outer object)

\`\`\`java
class Outer {
    static int count = 5;
    static class StaticNested {
        void show() { System.out.println(count); }  // Only static outer members
    }
}
// No outer object needed:
Outer.StaticNested sn = new Outer.StaticNested();
\`\`\`

---

#### 5. Local Inner Class

- Defined INSIDE a method (or block)
- Scope is limited to that method only
- Cannot have access modifiers (public, private, etc.)
- Can access \`final\` or effectively final local variables of the enclosing method

\`\`\`java
void greet(String prefix) {
    class LocalGreeter {         // Local inner class — exists only in greet()
        void say(String name) {
            System.out.println(prefix + " " + name); // 'prefix' must be effectively final
        }
    }
    new LocalGreeter().say("Rahul");
}
\`\`\`

---

#### 6. Anonymous Inner Class (THE EXAM FAVORITE)

- A class with NO name
- Defined and instantiated in a SINGLE expression
- Used to provide a one-time implementation of an interface or extend a class
- Most commonly used with functional interfaces (before Java 8 lambdas)

\`\`\`java
interface Greeting {
    void greet(String name);
}

// Anonymous inner class implementing Greeting:
Greeting g = new Greeting() {
    @Override
    public void greet(String name) {
        System.out.println("Hello, " + name + "!");
    }
};
g.greet("Ayesha");
\`\`\`

**Key facts about anonymous inner classes:**
- Cannot have a constructor (no name to call)
- Cannot be reused (created once, used once)
- Can access \`final\` or effectively final variables from enclosing scope
- Implicitly \`final\` — cannot be subclassed
`,
    codeSnippet: `// Complete Program: All 4 types of nested classes
// ─── Interface for Anonymous Class demo ─────────────────────────────────────
interface Sortable {
    void sort(int[] arr);
    default String getAlgorithmName() { return "Unknown"; }
}

// ─── Outer class ─────────────────────────────────────────────────────────────
class DataProcessor {
    private String datasetName;
    private int[] data;
    static int processedCount = 0;  // static outer member

    DataProcessor(String name, int[] data) {
        this.datasetName = name;
        this.data        = data.clone();
    }

    // ─── 1. MEMBER INNER CLASS ────────────────────────────────────────────
    class Statistics {
        // Can access outer's private fields directly!
        double calculateAverage() {
            int sum = 0;
            for (int val : data) sum += val;  // 'data' is outer's private field
            return (double) sum / data.length;
        }
        int findMax() {
            int max = data[0];
            for (int val : data) if (val > max) max = val;
            return max;
        }
        void display() {
            System.out.println("  Dataset: " + datasetName);  // outer's private
            System.out.println("  Average: " + calculateAverage());
            System.out.println("  Max:     " + findMax());
        }
    }

    // ─── 2. STATIC NESTED CLASS ───────────────────────────────────────────
    static class ProcessingLog {
        // No access to datasetName or data (non-static outer members)
        static void logCount() {
            // Can only access static outer member:
            System.out.println("  Total datasets processed: " + processedCount);
        }
    }

    // ─── 3. LOCAL INNER CLASS (inside a method) ───────────────────────────
    void applyTransformation(final double multiplier) {
        // Local inner class — lives only inside this method
        class Transformer {
            void apply() {
                for (int i = 0; i < data.length; i++) {
                    data[i] = (int)(data[i] * multiplier); // 'multiplier' = effectively final
                }
                System.out.println("  Transformation applied (x" + multiplier + ")");
            }
        }
        new Transformer().apply();  // Create & use immediately
        processedCount++;
    }

    void displayData(String label) {
        System.out.print("  " + label + " " + datasetName + ": [");
        for (int i = 0; i < data.length; i++) {
            System.out.print(data[i] + (i < data.length-1 ? ", " : ""));
        }
        System.out.println("]");
    }
}

public class Main {
    public static void main(String[] args) {
        int[] scores = {45, 78, 92, 61, 55, 83};

        DataProcessor dp = new DataProcessor("Exam Scores", scores);
        dp.displayData("Original");

        // ─── 1. Member Inner Class ────────────────────────────────────────
        System.out.println("\\n=== 1. Member Inner Class (Statistics) ===");
        DataProcessor.Statistics stats = dp.new Statistics();  // Special syntax!
        stats.display();

        // ─── 2. Static Nested Class ───────────────────────────────────────
        System.out.println("\\n=== 2. Static Nested Class (ProcessingLog) ===");
        DataProcessor.ProcessingLog.logCount(); // No outer object needed

        // ─── 3. Local Inner Class (inside applyTransformation) ───────────
        System.out.println("\\n=== 3. Local Inner Class (Transformer) ===");
        dp.applyTransformation(1.1); // Give 10% bonus
        dp.displayData("After bonus");

        // ─── 4. Anonymous Inner Class ─────────────────────────────────────
        System.out.println("\\n=== 4. Anonymous Inner Class (Sortable interface) ===");
        // Implementing Sortable interface inline — no separate class name!
        Sortable bubbleSort = new Sortable() {
            @Override
            public void sort(int[] arr) {
                int n = arr.length;
                for (int i = 0; i < n-1; i++) {
                    for (int j = 0; j < n-i-1; j++) {
                        if (arr[j] > arr[j+1]) {
                            int temp = arr[j]; arr[j] = arr[j+1]; arr[j+1] = temp;
                        }
                    }
                }
            }
            @Override
            public String getAlgorithmName() { return "Bubble Sort (Anonymous)"; }
        };

        int[] arr = {64, 34, 25, 12, 22};
        System.out.println("  Algorithm: " + bubbleSort.getAlgorithmName());
        System.out.print("  Before sort: "); for(int v:arr) System.out.print(v+" ");
        bubbleSort.sort(arr);
        System.out.print("\\n  After sort:  "); for(int v:arr) System.out.print(v+" ");
        System.out.println();

        System.out.println("\\n=== Final Processing Log ===");
        DataProcessor.ProcessingLog.logCount();
    }
}`,
    output: `  Original Exam Scores: [45, 78, 92, 61, 55, 83]

=== 1. Member Inner Class (Statistics) ===
  Dataset: Exam Scores
  Average: 69.0
  Max:     92

=== 2. Static Nested Class (ProcessingLog) ===
  Total datasets processed: 0

=== 3. Local Inner Class (Transformer) ===
  Transformation applied (x1.1)
  After bonus Exam Scores: [49, 85, 101, 67, 60, 91]

=== 4. Anonymous Inner Class (Sortable interface) ===
  Algorithm: Bubble Sort (Anonymous)
  Before sort: 64 34 25 12 22 
  After sort:  12 22 25 34 64 

=== Final Processing Log ===
  Total datasets processed: 1`,
    commonMistakesToAvoid: [
      "Instantiating a member inner class without an outer class object (compile error).",
      "Accessing non-static outer fields from a static nested class (compile error).",
      "Writing a constructor inside an anonymous inner class — anonymous classes CANNOT have constructors.",
      "Accessing local variables in a local inner class that are not final or effectively final.",
    ],
    keyTakeaways: [
      "4 types: Member Inner, Static Nested, Local Inner, Anonymous Inner.",
      "Member inner class: needs outer object. Syntax: outerObj.new InnerClass().",
      "Static nested class: no outer object needed. Access: OuterClass.NestedClass.",
      "Anonymous inner class: implements interface or extends class inline — no reuse, no constructor.",
      "Inner classes can access ALL outer class members (even private); static nested class can only access static outer members.",
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // UNIT 3: INHERITANCE
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "unit3-inheritance",
    unit: 3,
    unitTitle: "Unit 3: Inheritance",
    topicTitle: "Inheritance — extends, super, Multilevel, Constructor Chaining & Method Overriding",
    syllabusKeywords: ["Inheritance", "extends", "super keyword", "parent class", "child class", "base class", "derived class", "multilevel inheritance", "constructor in inheritance", "super()"],
    examMarksWeightage: "Both (Frequent)",
    beginnerConcept:
      "Inheritance is Java's way of letting a child class AUTOMATICALLY HAVE all the features (fields + methods) of a parent class, without rewriting them. It is like a child inheriting their parents' traits — the child (subclass) gets the parent's DNA (fields and methods) automatically, and can ADD new traits or MODIFY existing ones. 'extends' is the inheritance keyword. 'super' is how you explicitly call the parent's version of something.",
    detailedTheory: `
#### 1. What is Inheritance?

**Inheritance** is an OOP mechanism where a **child class (subclass/derived class)** acquires the fields and methods of a **parent class (superclass/base class)**. It represents an **IS-A relationship**.

> "A Car IS-A Vehicle." So Car extends Vehicle.

**Benefits of Inheritance:**
1. **Code Reuse**: Write once in parent, use in all children
2. **Method Overriding**: Customize parent behavior in child
3. **Polymorphism**: Parent reference can point to child objects
4. **Extensibility**: Add new features without modifying existing code

---

#### 2. The extends Keyword — Syntax

\`\`\`java
class ParentClass {
    // fields and methods
}

class ChildClass extends ParentClass {
    // inherits all non-private fields and methods from ParentClass
    // can add new fields and methods
    // can override parent methods
}
\`\`\`

**What is inherited?**
| Member | Inherited? |
|--------|-----------|
| public fields | ✅ YES |
| protected fields | ✅ YES |
| default fields (same package) | ✅ YES (if same package) |
| private fields | ❌ NO (not directly, use getters) |
| public methods | ✅ YES |
| protected methods | ✅ YES |
| Constructors | ❌ NO (not inherited, but can be called with super()) |

---

#### 3. Constructor Execution Order in Inheritance

**Golden Rule**: When a child object is created, the **parent constructor ALWAYS runs first**, then the child constructor.

\`\`\`
new ChildClass() is called
  ↓
ChildClass() constructor starts
  ↓ (first line: super() call — explicit or implicit)
ParentClass() constructor runs COMPLETELY
  ↓ (parent done)
ChildClass() constructor body continues
  ↓
Object fully initialized
\`\`\`

If you do NOT explicitly call \`super(...)\` as the first line, Java automatically inserts \`super()\` (no-arg parent constructor call). If the parent has NO no-arg constructor, this is a **compile error** — you must explicitly call the correct \`super(...)\` with arguments.

---

#### 4. The super Keyword — 3 Uses

| Use | Syntax | Purpose |
|-----|--------|---------|
| 1 | \`super();\` or \`super(args);\` | Call parent constructor (MUST be first line) |
| 2 | \`super.fieldName\` | Access parent's field (when child has field with same name) |
| 3 | \`super.methodName()\` | Call parent's (overridden) version of a method |

---

#### 5. Types of Inheritance in Java

| Type | Description | Java Support |
|------|-------------|-------------|
| **Single** | A extends B | ✅ YES |
| **Multilevel** | A extends B extends C | ✅ YES |
| **Hierarchical** | B extends A, C extends A | ✅ YES |
| **Multiple** | A extends B AND C (two parents) | ❌ NO (prevented to avoid Diamond Problem — use interfaces instead) |
| **Hybrid** | Combination of above | ❌ NO via classes (use interfaces) |

**Why No Multiple Class Inheritance?**
The **Diamond Problem**: if both B and C override method m() from A, and D extends both B and C — which version of m() does D get? Java avoids this ambiguity by disallowing multiple class inheritance.

---

#### 6. Multilevel Inheritance — Constructor Chain

\`\`\`
class A { A() { print("A"); } }
class B extends A { B() { super(); print("B"); } }
class C extends B { C() { super(); print("C"); } }

new C() → calls C() → calls B() → calls A()
Output: A B C   (parent always before child)
\`\`\`

---

#### 7. Method Overriding Rules (Complete List)

1. Same method name, same parameters, same return type (or covariant)
2. @Override annotation recommended (helps compiler catch mistakes)
3. Overriding method's access modifier CANNOT be more restrictive than parent's
4. \`final\` methods CANNOT be overridden
5. \`static\` methods CANNOT be overridden (only hidden)
6. \`private\` methods CANNOT be overridden (not inherited)
7. Constructors CANNOT be overridden
`,
    codeSnippet: `// Complete Program: Multilevel Inheritance + super keyword + Method Overriding
// ─── Level 1: Base class ─────────────────────────────────────────────────────
class Animal {
    protected String name;
    protected String species;
    protected int age;

    Animal(String name, String species, int age) {
        this.name    = name;
        this.species = species;
        this.age     = age;
        System.out.println("[Animal constructor] " + name + " the " + species + " created.");
    }

    void breathe() {
        System.out.println("  " + name + " breathes oxygen.");
    }

    void sleep() {
        System.out.println("  " + name + " is sleeping.");
    }

    void display() {
        System.out.println("  [Animal] Name: " + name + " | Species: " + species + " | Age: " + age);
    }

    @Override
    public String toString() {
        return "Animal(" + name + ", " + species + ")";
    }
}

// ─── Level 2: extends Animal ─────────────────────────────────────────────────
class Mammal extends Animal {
    protected boolean hasFur;

    Mammal(String name, String species, int age, boolean hasFur) {
        super(name, species, age);   // MUST be first line — calls Animal constructor
        this.hasFur = hasFur;
        System.out.println("[Mammal constructor] " + name + " is a mammal. Fur: " + hasFur);
    }

    void nurseYoung() {
        System.out.println("  " + name + " nurses its young with milk.");
    }

    @Override
    void display() {
        super.display();  // Call Animal's display() first, then add mammal info
        System.out.println("  [Mammal] Has Fur: " + hasFur);
    }
}

// ─── Level 3: extends Mammal (Multilevel Inheritance) ─────────────────────────
class Dog extends Mammal {
    private String breed;
    private String owner;

    Dog(String name, int age, String breed, String owner) {
        super(name, "Canis lupus familiaris", age, true); // Calls Mammal constructor
        this.breed = breed;
        this.owner = owner;
        System.out.println("[Dog constructor] " + name + " the " + breed + " created.");
    }

    // Overriding breathe() from Animal
    @Override
    void breathe() {
        super.breathe();  // First call parent version
        System.out.println("  " + name + " also pants to cool down.");
    }

    // New behavior unique to Dog
    void bark() {
        System.out.println("  " + name + " says: Woof! Woof!");
    }

    void fetch() {
        System.out.println("  " + name + " fetches the ball for " + owner + "!");
    }

    @Override
    void display() {
        super.display();  // Calls Mammal's display() which calls Animal's display()
        System.out.println("  [Dog] Breed: " + breed + " | Owner: " + owner);
    }
}

public class Main {
    public static void main(String[] args) {
        System.out.println("====== Creating a Dog (3-level deep) ======");
        Dog d = new Dog("Bruno", 3, "Labrador", "Rahul");

        System.out.println("\\n====== All Inherited & New Methods ======");
        d.display();        // Multilevel: Dog → Mammal → Animal display chain

        System.out.println("\\n--- Inherited from Animal ---");
        d.breathe();        // Overridden — calls super.breathe() then adds own
        d.sleep();          // Inherited directly from Animal (not overridden)

        System.out.println("\\n--- Inherited from Mammal ---");
        d.nurseYoung();     // Inherited from Mammal

        System.out.println("\\n--- Dog-specific Methods ---");
        d.bark();
        d.fetch();

        System.out.println("\\n====== Inheritance Hierarchy Check ======");
        System.out.println("d instanceof Dog:    " + (d instanceof Dog));
        System.out.println("d instanceof Mammal: " + (d instanceof Mammal));
        System.out.println("d instanceof Animal: " + (d instanceof Animal));
        System.out.println("d instanceof Object: " + (d instanceof Object)); // Everything in Java!

        System.out.println("\\n====== super.field access demo ======");
        // Dog can access protected 'name' from Animal via super
        System.out.println("  Dog's name (via inherited field): " + d.name);
    }
}`,
    output: `====== Creating a Dog (3-level deep) ======
[Animal constructor] Bruno the Canis lupus familiaris created.
[Mammal constructor] Bruno is a mammal. Fur: true
[Dog constructor] Bruno the Labrador created.

====== All Inherited & New Methods ======
  [Animal] Name: Bruno | Species: Canis lupus familiaris | Age: 3
  [Mammal] Has Fur: true
  [Dog] Breed: Labrador | Owner: Rahul

--- Inherited from Animal ---
  Bruno breathes oxygen.
  Bruno also pants to cool down.
  Bruno is sleeping.

--- Inherited from Mammal ---
  Bruno nurses its young with milk.

--- Dog-specific Methods ---
  Bruno says: Woof! Woof!
  Bruno fetches the ball for Rahul!

====== Inheritance Hierarchy Check ======
d instanceof Dog:    true
d instanceof Mammal: true
d instanceof Animal: true
d instanceof Object: true

====== super.field access demo ======
  Dog's name (via inherited field): Bruno`,
    commonMistakesToAvoid: [
      "Forgetting to call super() in the child constructor when parent has no default constructor — compile error.",
      "Placing super() anywhere other than the FIRST LINE of the child constructor — compile error.",
      "Trying to override a private or static method — private methods are not inherited, static methods are hidden not overridden.",
      "Making the overriding method MORE restrictive than the parent (e.g., public → protected) — compile error.",
      "Attempting multiple inheritance with classes — Java only allows multiple inheritance through interfaces.",
    ],
    keyTakeaways: [
      "Inheritance: child class 'extends' parent class, acquiring all non-private members.",
      "Constructor order: parent constructor ALWAYS runs BEFORE child constructor.",
      "super() calls parent constructor (first line). super.method() calls parent's version of a method.",
      "Java supports single, multilevel, and hierarchical inheritance — NOT multiple class inheritance.",
      "@Override annotation lets the compiler verify your override is correct.",
    ],
  },

  {
    id: "unit3-overriding-dispatch",
    unit: 3,
    unitTitle: "Unit 3: Inheritance",
    topicTitle: "Method Overriding & Dynamic Method Dispatch (Runtime Polymorphism)",
    syllabusKeywords: ["Method Overriding", "Dynamic method dispatch", "Runtime polymorphism", "upcasting", "parent reference", "virtual method", "@Override"],
    examMarksWeightage: "Both (Frequent)",
    beginnerConcept:
      "Method Overriding = a child class redefines a parent's method with the same name and parameters. Dynamic Method Dispatch = when you hold a child object via a PARENT reference and call an overridden method, Java calls the CHILD's version at RUNTIME — not the parent's. It is like a company role: the CEO title belongs to the company (parent), but whoever is currently CEO (child object) performs the role their OWN way. Java decides AT RUNTIME who the actual person in the role is.",
    detailedTheory: `
#### 1. What is Method Overriding?

**Method Overriding** = a subclass provides a **specific implementation** for a method already defined in its superclass.

Rules for a valid override:
| Rule | Detail |
|------|--------|
| Same method name | Must match exactly |
| Same parameter list | Same types, count, and order |
| Same return type (or covariant) | Covariant = child return type is a subtype of parent return type |
| @Override annotation | Strongly recommended — compiler checks the above rules |
| Access modifier | Overriding method's access CANNOT be more restrictive than parent's |
| Cannot override | private, static, final methods |

---

#### 2. @Override Annotation — Why Always Use It

\`\`\`java
class Parent {
    void display() { System.out.println("Parent"); }
}

class Child extends Parent {
    @Override
    void display() { System.out.println("Child"); }  // @Override: compiler verifies this is a real override

    // Without @Override:
    void dispaly() { ... }  // Typo! Without @Override, compiler won't catch this bug
                             // With @Override: "Method does not override method from its superclass" — CAUGHT!
}
\`\`\`

---

#### 3. Dynamic Method Dispatch — The Heart of Runtime Polymorphism

**Dynamic Method Dispatch** = Java resolves which overridden method version to call at **RUNTIME**, based on the actual object type (not the reference type).

\`\`\`java
Animal a = new Dog("Bruno");  // Upcasting: Dog object held in Animal reference
a.makeSound();  // Which makeSound()? DOG's version! (resolved at runtime)
\`\`\`

**Step-by-step mechanism:**
\`\`\`
Compile time: Compiler checks if Animal has a makeSound() method → YES → compiles
Runtime:       JVM looks at the actual object type in heap → Dog → calls Dog.makeSound()
\`\`\`

---

#### 4. Upcasting vs Downcasting

| | Upcasting | Downcasting |
|--|-----------|-------------|
| Direction | Child → Parent | Parent → Child |
| Syntax | Implicit: \`Animal a = new Dog();\` | Explicit: \`Dog d = (Dog) a;\` |
| Risk | Safe (always works) | Can throw ClassCastException if wrong |
| Limitation | Can only call methods declared in parent reference type | Can call child-specific methods |
| Safe check | Always safe | Use instanceof before casting |

---

#### 5. Polymorphism with Arrays — The Power of Runtime Dispatch

\`\`\`java
Animal[] zoo = {new Dog(), new Cat(), new Bird()};
for (Animal a : zoo) {
    a.makeSound();  // Each animal makes its OWN sound at runtime!
}
\`\`\`

This is the beauty of runtime polymorphism — one loop, different behaviors!

---

#### 6. Overriding vs Overloading — Ultimate Comparison (Exam Table)

| Aspect | Overriding | Overloading |
|--------|-----------|-------------|
| Location | Parent + Child | Same class |
| Parameters | Must be IDENTICAL | Must be DIFFERENT |
| Return type | Same (or covariant) | Can be different |
| Resolved | RUNTIME | Compile time |
| Polymorphism | Runtime (dynamic) | Compile-time (static) |
| @Override | YES | NO |
| Inheritance | REQUIRED | NOT required |
| Access modifier | Cannot be more restrictive | Can change freely |
| static/final/private | Cannot override these | Can overload these |
`,
    codeSnippet: `// Complete Program: Method Overriding + Dynamic Method Dispatch + Polymorphism
// ─── Abstract-like base class ──────────────────────────────────────────────────
class Shape {
    protected String color;

    Shape(String color) {
        this.color = color;
    }

    // These will be overridden by subclasses
    double area() {
        return 0.0;
    }

    double perimeter() {
        return 0.0;
    }

    void describe() {
        System.out.println("  Shape: " + this.getClass().getSimpleName()
            + " | Color: " + color
            + " | Area: " + String.format("%.2f", area())
            + " | Perimeter: " + String.format("%.2f", perimeter()));
    }
}

// ─── Subclass 1 ────────────────────────────────────────────────────────────────
class Circle extends Shape {
    private double radius;

    Circle(String color, double radius) {
        super(color);
        this.radius = radius;
    }

    @Override
    double area() { return Math.PI * radius * radius; }

    @Override
    double perimeter() { return 2 * Math.PI * radius; }

    @Override
    void describe() {
        super.describe();  // Call parent describe(), then add circle info
        System.out.println("    Radius: " + radius);
    }
}

// ─── Subclass 2 ────────────────────────────────────────────────────────────────
class Rectangle extends Shape {
    private double length, width;

    Rectangle(String color, double length, double width) {
        super(color);
        this.length = length;
        this.width  = width;
    }

    @Override
    double area() { return length * width; }

    @Override
    double perimeter() { return 2 * (length + width); }

    @Override
    void describe() {
        super.describe();
        System.out.println("    Length: " + length + " | Width: " + width);
    }
}

// ─── Subclass 3 ────────────────────────────────────────────────────────────────
class Triangle extends Shape {
    private double a, b, c;  // Three sides

    Triangle(String color, double a, double b, double c) {
        super(color);
        this.a = a; this.b = b; this.c = c;
    }

    @Override
    double area() {
        double s = (a + b + c) / 2;  // Heron's formula
        return Math.sqrt(s * (s-a) * (s-b) * (s-c));
    }

    @Override
    double perimeter() { return a + b + c; }
}

public class Main {
    public static void main(String[] args) {
        // ─── Dynamic Method Dispatch via Array ──────────────────────────────
        System.out.println("=== Dynamic Method Dispatch (Runtime Polymorphism) ===");

        // Array of PARENT type (Shape), but holding CHILD objects
        Shape[] shapes = {
            new Circle("Red",    7.0),
            new Rectangle("Blue", 5.0, 3.0),
            new Triangle("Green", 3.0, 4.0, 5.0),
            new Circle("Yellow", 3.5),
        };

        // Same call — different behavior based on ACTUAL object type at runtime
        for (Shape s : shapes) {
            s.describe();  // Java calls Circle.describe(), Rectangle.describe(), etc.
            System.out.println();
        }

        // ─── Upcasting & Downcasting ────────────────────────────────────────
        System.out.println("=== Upcasting & Downcasting ===");
        Shape s = new Circle("Purple", 10.0);  // Upcasting (implicit) — safe

        System.out.println("  Calling area() via Shape reference: " + String.format("%.2f", s.area()));
        // s.radius  ← COMPILE ERROR! Shape reference cannot see Circle-specific members

        // Safe downcast using instanceof
        if (s instanceof Circle) {
            Circle c = (Circle) s;  // Explicit downcast
            System.out.println("  Downcast successful — accessing Circle directly");
            c.describe();
        }

        // ─── Finding max area via parent reference ──────────────────────────
        System.out.println("\\n=== Finding Largest Shape ===");
        Shape largest = shapes[0];
        for (Shape sh : shapes) {
            if (sh.area() > largest.area()) largest = sh;
        }
        System.out.println("  Largest shape type: " + largest.getClass().getSimpleName());
        System.out.println("  Area: " + String.format("%.2f", largest.area()));
    }
}`,
    output: `=== Dynamic Method Dispatch (Runtime Polymorphism) ===
  Shape: Circle | Color: Red | Area: 153.94 | Perimeter: 43.98
    Radius: 7.0

  Shape: Rectangle | Color: Blue | Area: 15.00 | Perimeter: 16.00
    Length: 5.0 | Width: 3.0

  Shape: Triangle | Color: Green | Area: 6.00 | Perimeter: 12.00

  Shape: Circle | Color: Yellow | Area: 38.48 | Perimeter: 21.99
    Radius: 3.5

=== Upcasting & Downcasting ===
  Calling area() via Shape reference: 314.16
  Downcast successful — accessing Circle directly
  Shape: Circle | Color: Purple | Area: 314.16 | Perimeter: 62.83
    Radius: 10.0

=== Finding Largest Shape ===
  Largest shape type: Circle
  Area: 314.16`,
    commonMistakesToAvoid: [
      "Changing the method signature when 'overriding' — this creates a new OVERLOADED method, not an override.",
      "Making the overriding method private when parent's method was public — access cannot be restricted.",
      "Expecting to call child-specific methods via a parent reference without downcasting — compile error.",
      "Forgetting instanceof check before downcasting — ClassCastException at runtime if wrong.",
      "Thinking static methods are overridden — they are HIDDEN, not overridden (compile-time, not runtime).",
    ],
    keyTakeaways: [
      "Method Overriding: same signature in child class that redefines parent behavior.",
      "Dynamic Method Dispatch: Java calls child's version at RUNTIME even when parent reference is used.",
      "Upcasting (child→parent): implicit and safe. Downcasting (parent→child): explicit, use instanceof first.",
      "@Override annotation: compiler-verified check that you are really overriding (catches typos).",
      "Runtime polymorphism enables one code to work with many object types — the power of OOP.",
    ],
  },

  {
    id: "unit3-final",
    unit: 3,
    unitTitle: "Unit 3: Inheritance",
    topicTitle: "Stopping Inheritance & Modification with the final Keyword",
    syllabusKeywords: ["final keyword", "final class", "final method", "final variable", "constant", "stop inheritance"],
    examMarksWeightage: "3-Mark",
    beginnerConcept:
      "The 'final' keyword is like putting a PERMANENT LOCK on something. A final variable cannot be changed (constant). A final method cannot be overridden by child classes. A final class cannot be extended at all — no children allowed. It is the 'last word' — nothing can modify or extend it after you declare it final.",
    detailedTheory: `
#### 1. final Variable — Constant Value

A \`final\` variable's value CANNOT be changed after it is assigned. It becomes a **constant**.

\`\`\`java
final double PI = 3.14159265;   // Constant — cannot reassign
final int MAX_SIZE = 100;

PI = 3.14;      // COMPILE ERROR: cannot assign a value to final variable
MAX_SIZE++;     // COMPILE ERROR: cannot assign a value to final variable
\`\`\`

**Important: Blank Final Variable** — a final variable can be declared without assignment, but MUST be assigned exactly ONCE before first use (usually in constructor):
\`\`\`java
class Circle {
    final double radius;  // blank final — no value yet
    Circle(double r) { this.radius = r; }  // assigned once in constructor — OK
}
\`\`\`

**static final = Compile-Time Constant** (shared + unchangeable):
\`\`\`java
static final double TAX_RATE = 0.18;  // Access: ClassName.TAX_RATE
\`\`\`

---

#### 2. final Method — Cannot Be Overridden

A \`final\` method in a parent class CANNOT be overridden in any subclass:

\`\`\`java
class BankAccount {
    final void applyInterest() {  // Rules are fixed — no subclass can change
        balance *= 1.05;
    }
}

class SavingsAccount extends BankAccount {
    @Override
    void applyInterest() { ... }  // COMPILE ERROR: cannot override final method
}
\`\`\`

**Use case**: Security-critical methods (like authentication logic, interest rate calculations) that must not be tampered with by subclasses.

---

#### 3. final Class — Cannot Be Extended (No Inheritance)

A \`final\` class cannot have any subclasses:

\`\`\`java
final class ImmutableConfig { ... }

class MyConfig extends ImmutableConfig { ... }  // COMPILE ERROR: cannot inherit from final class
\`\`\`

**Famous final classes in Java's standard library:**
- \`java.lang.String\` — String is final (immutability guarantee)
- \`java.lang.Math\` — Math is final
- All wrapper classes: \`Integer\`, \`Double\`, \`Boolean\` — all final

---

#### 4. Summary Table — The 3 Uses of final

| Applied to | Meaning | Violation |
|------------|---------|-----------|
| **Variable** | Value cannot change after assignment | Compile error on reassignment |
| **Method** | Cannot be overridden in subclasses | Compile error on @Override attempt |
| **Class** | Cannot be extended (no subclasses) | Compile error on extends attempt |

---

#### 5. final vs static final

| | final | static final |
|-|-|-----|
| Scope | Per object (each object can have different final value via constructor) | Per class (one value shared by all) |
| Access | \`this.field\` | \`ClassName.CONSTANT\` |
| Memory | Heap (per object) | Method Area (one copy) |
| Convention | camelCase | ALL_CAPS_UNDERSCORE |
`,
    codeSnippet: `// Complete Program: final variable, method, and class
// ─── 1. final CLASS — cannot be extended ──────────────────────────────────────
final class MathConstants {
    // static final = compile-time constants (ALL_CAPS convention)
    public static final double PI      = 3.14159265358979;
    public static final double E       = 2.71828182845904;
    public static final int    MAX_INT = Integer.MAX_VALUE;

    static double circleArea(double radius) {
        return PI * radius * radius;  // Uses our constant
    }
    // Cannot extend MathConstants — it is final
}

// ─── 2. Class with final METHOD ────────────────────────────────────────────────
class BankAccount {
    protected String accountNumber;
    protected double balance;

    // Instance-level blank final — must be set in constructor
    final String bankName;

    BankAccount(String accNo, double balance, String bankName) {
        this.accountNumber = accNo;
        this.balance       = balance;
        this.bankName      = bankName;  // assigned exactly once — OK
    }

    // final method — no subclass may override this security-critical method
    final void validateTransaction(double amount) {
        if (amount <= 0) {
            System.out.println("  [Security] Transaction REJECTED: amount must be positive.");
        } else if (amount > balance * 0.9) {
            System.out.println("  [Security] Transaction REJECTED: exceeds 90% of balance.");
        } else {
            System.out.println("  [Security] Transaction APPROVED: Rs." + amount);
            balance -= amount;
        }
    }

    void displayBalance() {
        System.out.println("  " + bankName + " | " + accountNumber
            + " | Balance: Rs." + balance);
    }
}

// ─── 3. Subclass can inherit but CANNOT override the final method ──────────────
class SavingsAccount extends BankAccount {
    private double interestRate;

    SavingsAccount(String accNo, double balance, double rate) {
        super(accNo, balance, "State Bank of India");
        this.interestRate = rate;
    }

    void applyInterest() {
        double interest = balance * interestRate / 100;
        balance += interest;
        System.out.println("  Interest applied: Rs." + interest);
    }

    // Cannot override validateTransaction() — it is final in parent!
    // @Override
    // void validateTransaction(double amount) { } // COMPILE ERROR if uncommented
}

public class Main {
    public static void main(String[] args) {
        // ─── final CLASS ──────────────────────────────────────────────────────
        System.out.println("=== 1. final Class (MathConstants) ===");
        System.out.println("  PI = " + MathConstants.PI);
        System.out.println("  E  = " + MathConstants.E);
        System.out.println("  Circle area (r=5): " + String.format("%.4f", MathConstants.circleArea(5)));
        // new MathConstants() has no useful instance — it is a utility class
        // class TestMath extends MathConstants {} // COMPILE ERROR if uncommented

        // ─── final METHOD + blank final ───────────────────────────────────────
        System.out.println("\\n=== 2. final Method (validateTransaction) ===");
        SavingsAccount sa = new SavingsAccount("SBI-00123", 50000.0, 4.0);
        sa.displayBalance();

        sa.validateTransaction(5000.0);    // Valid
        sa.validateTransaction(-200.0);    // Rejected: negative
        sa.validateTransaction(48000.0);   // Rejected: too large
        sa.displayBalance();

        // ─── final VARIABLE ───────────────────────────────────────────────────
        System.out.println("\\n=== 3. final Variable Demo ===");
        final int MAX_RETRIES = 3;
        System.out.println("  Max retries allowed: " + MAX_RETRIES);
        // MAX_RETRIES = 5; // COMPILE ERROR if uncommented

        // ─── Apply interest (non-final method — child can define new methods) ─
        System.out.println("\\n=== 4. Subclass Adds New Non-final Method ===");
        sa.applyInterest();   // New method — not in parent, not overriding anything
        sa.displayBalance();

        System.out.println("\\n  bankName is final: " + sa.bankName);
        // sa.bankName = "HDFC"; // COMPILE ERROR: cannot assign to final field
    }
}`,
    output: `=== 1. final Class (MathConstants) ===
  PI = 3.14159265358979
  E  = 2.71828182845904
  Circle area (r=5): 78.5398

=== 2. final Method (validateTransaction) ===
  State Bank of India | SBI-00123 | Balance: Rs.50000.0
  [Security] Transaction APPROVED: Rs.5000.0
  [Security] Transaction REJECTED: amount must be positive.
  [Security] Transaction REJECTED: exceeds 90% of balance.
  State Bank of India | SBI-00123 | Balance: Rs.45000.0

=== 3. final Variable Demo ===
  Max retries allowed: 3

=== 4. Subclass Adds New Non-final Method ===
  Interest applied: Rs.1800.0
  State Bank of India | SBI-00123 | Balance: Rs.46800.0

  bankName is final: State Bank of India`,
    commonMistakesToAvoid: [
      "Trying to reassign a final variable — compile error.",
      "Using @Override on a final parent method in a subclass — compile error.",
      "Using extends on a final class — compile error.",
      "Forgetting to initialize a blank final field in the constructor — compile error.",
      "Confusing final (Java) with const (C++) — Java has no 'const' keyword.",
    ],
    keyTakeaways: [
      "final variable = constant value — cannot change after assignment.",
      "final method = cannot be overridden in any subclass.",
      "final class = cannot be extended — no subclasses allowed.",
      "static final = class-level constant, written in ALL_CAPS.",
      "Famous final classes in Java: String, Integer, Math, all wrapper classes.",
    ],
  },

  {
    id: "unit3-interfaces",
    unit: 3,
    unitTitle: "Unit 3: Inheritance",
    topicTitle: "Interfaces — Declaration, Implementation, References, instanceof & Multiple Inheritance",
    syllabusKeywords: ["Interface", "implements", "interface reference", "instanceof operator", "interface inheritance", "multiple interface implementation", "default method", "static method in interface"],
    examMarksWeightage: "Both (Frequent)",
    beginnerConcept:
      "An interface is a PURE CONTRACT — a list of method promises with NO implementation (before Java 8). It says 'if you want to be called Flyable, you MUST provide a fly() method.' Any class that signs this contract (implements the interface) must fulfill every promised method. Interfaces solve Java's multiple inheritance problem — a class can implement MANY interfaces simultaneously.",
    detailedTheory: `
#### 1. What is an Interface?

An **interface** is a reference type (like a class) that contains ONLY:
- Abstract methods (no body) — mandatory to implement
- Constants (public static final variables)
- Since Java 8: default methods (with body) and static methods
- Since Java 9: private methods

An interface is a **CAN-DO contract** (capability), while a class is an **IS-A entity** (identity).

**Syntax:**
\`\`\`java
[public] interface InterfaceName [extends Interface1, Interface2] {
    // All fields are automatically: public static final
    int MAX = 100;                 // actually: public static final int MAX = 100;

    // All methods are automatically: public abstract
    void methodName(params);      // actually: public abstract void methodName(params);

    // Java 8+: default method (has a body)
    default void defaultMethod() { System.out.println("Default implementation"); }

    // Java 8+: static method
    static void staticMethod()   { System.out.println("Interface static method"); }
}
\`\`\`

---

#### 2. Implementing an Interface

\`\`\`java
class ClassName implements InterfaceName1, InterfaceName2 {
    @Override
    public void methodFromInterface1() { /* MUST implement */ }

    @Override
    public void methodFromInterface2() { /* MUST implement */ }
}
\`\`\`

**Rules:**
1. A class can implement MULTIPLE interfaces (solves multiple inheritance)
2. All abstract methods MUST be implemented (unless the class is declared abstract)
3. Overriding interface methods MUST use \`public\` (interface methods are public by default)
4. A class can simultaneously \`extends\` one class AND \`implements\` multiple interfaces

---

#### 3. Interface Reference (Polymorphism)

An interface can be used as a reference type — enabling runtime polymorphism:
\`\`\`java
Drawable d = new Circle();   // Circle implements Drawable
d.draw();                    // Calls Circle's draw() at runtime
\`\`\`

You can only call methods declared in the interface via an interface reference, even if the object has more methods.

---

#### 4. The instanceof Operator

\`instanceof\` checks if an object is an instance of a particular class or interface:
\`\`\`java
Object obj = new Circle();
if (obj instanceof Drawable) {
    Drawable d = (Drawable) obj;  // Safe to cast
    d.draw();
}
\`\`\`

**Always use instanceof before downcasting** to avoid ClassCastException.

---

#### 5. Interface Inheritance (extends for interfaces)

Interfaces can extend OTHER interfaces (even multiple):
\`\`\`java
interface Flyable { void fly(); }
interface Swimmable { void swim(); }
interface Duck extends Flyable, Swimmable {
    void quack();  // Duck must implement all 3: fly, swim, quack
}
\`\`\`

---

#### 6. Abstract Class vs Interface — Quick Comparison (Full table is the next topic)

| | Interface | Abstract Class |
|-|-----------|---------------|
| Multiple inheritance | ✅ A class can implement many | ❌ Only one can be extended |
| Constructors | ❌ None | ✅ Yes |
| Instance fields | ❌ None (only static final) | ✅ Yes |
| Method body | ❌ No (except default/static Java8+) | ✅ Yes for concrete methods |
| When to use | Capability/behavior contract | Shared state + partial implementation |
`,
    codeSnippet: `// Complete Program: Interface — Declaration, Implementation, Reference, instanceof, Multiple & Inheritance
// ─── Interface 1: Drawable ────────────────────────────────────────────────────
interface Drawable {
    double PI = 3.14159;   // implicitly public static final

    void draw();           // implicitly public abstract

    // Java 8+ default method — subclasses may override
    default String getColor() {
        return "Black (default)";
    }

    // Java 8+ static method — belongs to the interface, not implementors
    static void printDrawingTip() {
        System.out.println("  [Drawable Tip] Always specify dimensions before drawing.");
    }
}

// ─── Interface 2: Resizable ───────────────────────────────────────────────────
interface Resizable {
    void resize(double factor);
    double getArea();
}

// ─── Interface 3: Printable (inherits from Drawable + Resizable) ──────────────
interface Printable extends Drawable, Resizable {
    void print();  // Printable must implement: draw, resize, getArea, AND print
}

// ─── Class 1: Circle implements Drawable AND Resizable ────────────────────────
class Circle implements Drawable, Resizable {
    private double radius;
    private String color;

    Circle(double radius, String color) {
        this.radius = radius;
        this.color  = color;
    }

    @Override
    public void draw() {
        System.out.println("  Drawing Circle — radius=" + radius
            + ", area=" + String.format("%.2f", getArea()));
    }

    @Override
    public void resize(double factor) {
        radius *= factor;
        System.out.println("  Circle resized by " + factor + "x — new radius=" + radius);
    }

    @Override
    public double getArea() {
        return PI * radius * radius;  // Using interface constant PI
    }

    @Override  // Overriding the default method from Drawable
    public String getColor() { return color; }
}

// ─── Class 2: Square implements Printable (gets all 3 interfaces) ─────────────
class Square implements Printable {
    private double side;

    Square(double side) { this.side = side; }

    @Override public void draw()   { System.out.println("  Drawing Square — side=" + side); }
    @Override public void resize(double f) { side *= f; System.out.println("  Square resized — new side=" + side); }
    @Override public double getArea()      { return side * side; }
    @Override public void print()          { System.out.println("  Printing Square: side=" + side + ", area=" + getArea()); }
    @Override public String getColor()     { return "Blue"; }
}

public class Main {
    public static void main(String[] args) {
        Circle c = new Circle(7.0, "Red");
        Square sq = new Square(5.0);

        // ─── Interface static method call ─────────────────────────────────
        System.out.println("=== Interface Static Method ===");
        Drawable.printDrawingTip();

        // ─── Interface Reference (Polymorphism) ───────────────────────────
        System.out.println("\\n=== Interface Reference — Polymorphism ===");
        Drawable[] drawables = { c, sq };
        for (Drawable d : drawables) {
            d.draw();
            System.out.println("    Color: " + d.getColor());
        }

        // ─── Multiple Interface Implementation ────────────────────────────
        System.out.println("\\n=== Multiple Interfaces on Circle ===");
        Resizable r = c;           // Circle IS-A Resizable
        r.resize(1.5);
        System.out.println("  New area: " + String.format("%.2f", r.getArea()));

        // ─── instanceof checks ────────────────────────────────────────────
        System.out.println("\\n=== instanceof Checks ===");
        System.out.println("c instanceof Drawable:  " + (c instanceof Drawable));
        System.out.println("c instanceof Resizable: " + (c instanceof Resizable));
        System.out.println("c instanceof Printable: " + (c instanceof Printable));  // false!
        System.out.println("sq instanceof Printable:" + (sq instanceof Printable)); // true!

        // ─── Safe downcast using instanceof ──────────────────────────────
        System.out.println("\\n=== Safe Downcast with instanceof ===");
        Drawable d = sq;
        if (d instanceof Printable) {
            Printable p = (Printable) d;
            p.print();
        }

        // ─── Interface constant ────────────────────────────────────────────
        System.out.println("\\n=== Interface Constant ===");
        System.out.println("Drawable.PI = " + Drawable.PI);  // Access via interface name
    }
}`,
    output: `=== Interface Static Method ===
  [Drawable Tip] Always specify dimensions before drawing.

=== Interface Reference — Polymorphism ===
  Drawing Circle — radius=7.0, area=153.94
    Color: Red
  Drawing Square — side=5.0
    Color: Blue

=== Multiple Interfaces on Circle ===
  Circle resized by 1.5x — new radius=10.5
  New area: 346.36

=== instanceof Checks ===
c instanceof Drawable:  true
c instanceof Resizable: true
c instanceof Printable: false
sq instanceof Printable:true

=== Safe Downcast with instanceof ===
  Printing Square: side=5.0, area=25.0

=== Interface Constant ===
Drawable.PI = 3.14159`,
    commonMistakesToAvoid: [
      "Implementing an interface method with package-private or protected access — must be public.",
      "Trying to add instance variables to an interface — only public static final constants allowed.",
      "Forgetting to implement ALL abstract methods of an interface in a non-abstract class — compile error.",
      "Calling an interface static method via an object reference (e.g., c.printDrawingTip()) — must use Drawable.printDrawingTip().",
      "Not using instanceof before casting — risks ClassCastException at runtime.",
    ],
    keyTakeaways: [
      "Interface = pure contract: no instance fields, no constructors, all methods abstract (unless default/static).",
      "A class can implement MULTIPLE interfaces — solving Java's multiple inheritance limitation.",
      "Interface reference + overriding = runtime polymorphism (same mechanism as abstract class).",
      "All interface fields: public static final. All interface methods: public abstract (default).",
      "instanceof: always check before downcasting to prevent ClassCastException.",
    ],
  },

  {
    id: "unit3-abstract-vs-interface",
    unit: 3,
    unitTitle: "Unit 3: Inheritance",
    topicTitle: "Abstract Class vs Interface — Complete 10-Point Master Comparison",
    syllabusKeywords: ["Abstract class", "abstract method", "interface", "abstract vs interface", "partial implementation", "multiple inheritance"],
    examMarksWeightage: "5-Mark",
    beginnerConcept:
      "Abstract Class = a partially-built HOUSE (some rooms done, some empty). The child must complete the empty rooms (abstract methods). Interface = a CHECKLIST the builder must follow (these features MUST exist). The house (abstract class) has rooms, furniture, and structure. The checklist (interface) is just rules — no physical presence. A class can follow many checklists (implements many interfaces) but can only be built ON ONE existing house (extends one abstract class).",
    detailedTheory: `
#### 1. Abstract Class — Definition

An **abstract class** is a class declared with the \`abstract\` keyword that:
- May have abstract methods (no body — must be implemented by subclasses)
- May have concrete (non-abstract) methods (with body — shared implementation)
- May have instance fields (state)
- **CAN have constructors** (called via \`super()\` from subclass)
- Cannot be instantiated directly — \`new AbstractClass()\` is a **compile error**
- Subclass must implement ALL abstract methods or itself be declared abstract

\`\`\`java
abstract class Animal {
    String name;  // instance field — OK!
    Animal(String name) { this.name = name; }  // constructor — OK!

    abstract void makeSound();  // abstract method — no body
    void breathe() { System.out.println(name + " breathes"); }  // concrete — OK!
}
\`\`\`

---

#### 2. The 10-Point Ultimate Comparison Table (Exam Gold)

| # | Feature | Abstract Class | Interface |
|---|---------|---------------|-----------|
| 1 | **Keyword** | \`abstract class\` | \`interface\` |
| 2 | **Instantiation** | ❌ Cannot use \`new\` | ❌ Cannot use \`new\` |
| 3 | **Methods** | Abstract + Concrete (mixed) | Abstract (default: Java 8+, static: Java 8+) |
| 4 | **Instance Variables** | ✅ YES (any type, any access) | ❌ NO (only \`public static final\` constants) |
| 5 | **Constructors** | ✅ YES | ❌ NO |
| 6 | **Inheritance** | \`extends\` (one only) | \`implements\` (multiple allowed) |
| 7 | **Multiple Inheritance** | ❌ A class extends ONE abstract class | ✅ A class implements MANY interfaces |
| 8 | **Access Modifiers** | Any (public, protected, private) | Methods: public only; Fields: public static final |
| 9 | **Speed** | Slightly faster (direct method lookup) | Slightly slower (dispatch table) |
| 10 | **When to Use** | IS-A relationship with shared state | CAN-DO capability/behavior contract |

---

#### 3. When to Choose Abstract Class vs Interface?

**Choose Abstract Class when:**
- Classes share common STATE (instance variables, e.g., \`name\`, \`id\`, \`balance\`)
- You want to provide default (shared) implementations for some methods
- You have a clear IS-A relationship (Dog IS-A Animal)
- You want to restrict instantiation but share code

**Choose Interface when:**
- Defining a CAPABILITY/CONTRACT (can fly, can swim, can be serialized)
- Multiple unrelated classes need the same contract (String and File can both be Comparable)
- You need multiple inheritance (a class must be both Flyable AND Swimmable)
- You want pure abstraction with no shared implementation

---

#### 4. Can a Class Both Extend and Implement?

**YES!** A class can extend one abstract class AND implement multiple interfaces simultaneously:

\`\`\`java
abstract class Vehicle {
    abstract void start();
    void stop() { System.out.println("Stopped"); }
}

interface Electric { void charge(); }
interface Autonomous { void selfDrive(); }

// Tesla extends Vehicle AND implements 2 interfaces
class Tesla extends Vehicle implements Electric, Autonomous {
    @Override public void start()     { System.out.println("Tesla starts silently"); }
    @Override public void charge()    { System.out.println("Charging at Supercharger"); }
    @Override public void selfDrive() { System.out.println("Autopilot engaged"); }
}
\`\`\`

---

#### 5. Abstract Class Constructors — How They Work

Abstract class constructors are called via \`super()\` from the subclass constructor. They set up shared state:
\`\`\`java
abstract class Shape {
    String color;
    Shape(String color) { this.color = color; }  // Constructor in abstract class
}
class Circle extends Shape {
    double radius;
    Circle(String color, double radius) {
        super(color);  // Calls abstract class constructor!
        this.radius = radius;
    }
}
\`\`\`
`,
    codeSnippet: `// Complete Program: Abstract Class vs Interface — Real-world Bank Account System
// ─── INTERFACE: Taxable (CAN-DO capability) ───────────────────────────────────
interface Taxable {
    double TAX_RATE = 0.10;  // public static final
    double calculateTax(double amount);  // public abstract
    default String getTaxType() { return "Standard Income Tax"; }  // Java 8+
}

// ─── INTERFACE: Insurable ─────────────────────────────────────────────────────
interface Insurable {
    double INSURANCE_RATE = 0.005;
    double calculateInsurance();
    default String getInsurancePlan() { return "Basic Coverage"; }
}

// ─── ABSTRACT CLASS: BankAccount (IS-A with shared state) ─────────────────────
abstract class BankAccount {
    // Instance fields — shared state (NOT possible in interface!)
    protected String accountNumber;
    protected String holderName;
    protected double balance;
    protected String bankName = "ITM National Bank";

    // Constructor — initializes shared state (NOT possible in interface!)
    BankAccount(String accNo, String holder, double initialBalance) {
        this.accountNumber = accNo;
        this.holderName    = holder;
        this.balance       = initialBalance;
        System.out.println("[Account Created] " + accNo + " for " + holder
            + " | Balance: Rs." + initialBalance);
    }

    // Concrete method — shared implementation (NOT abstract)
    void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            System.out.println("  [Deposit] Rs." + amount + " deposited. Balance: Rs." + balance);
        } else {
            System.out.println("  [Deposit] REJECTED: amount must be positive.");
        }
    }

    // Concrete method — shared
    void displayBalance() {
        System.out.println("  " + bankName + " | " + accountNumber
            + " | Holder: " + holderName + " | Balance: Rs." + balance);
    }

    // ABSTRACT methods — subclasses MUST implement (different rules per account type)
    abstract void withdraw(double amount);
    abstract double calculateInterest();
    abstract String getAccountType();
}

// ─── CONCRETE CLASS: SavingsAccount — extends abstract + implements 2 interfaces
class SavingsAccount extends BankAccount implements Taxable, Insurable {
    private double interestRate;
    private int minBalanceRequirement;

    SavingsAccount(String accNo, String holder, double balance, double rate) {
        super(accNo, holder, balance);  // Calls abstract class constructor
        this.interestRate         = rate;
        this.minBalanceRequirement = 1000;
    }

    @Override
    public void withdraw(double amount) {
        if (amount <= 0) {
            System.out.println("  [Withdraw] REJECTED: amount must be positive.");
        } else if (balance - amount < minBalanceRequirement) {
            System.out.println("  [Withdraw] REJECTED: would breach minimum balance of Rs." + minBalanceRequirement);
        } else {
            balance -= amount;
            System.out.println("  [Withdraw] Rs." + amount + " withdrawn. Balance: Rs." + balance);
        }
    }

    @Override
    public double calculateInterest() {
        return balance * (interestRate / 100);
    }

    @Override
    public String getAccountType() { return "Savings Account"; }

    // From Taxable interface
    @Override
    public double calculateTax(double amount) { return amount * TAX_RATE; }

    // From Insurable interface
    @Override
    public double calculateInsurance() { return balance * INSURANCE_RATE; }

    // Override default method from Insurable
    @Override
    public String getInsurancePlan() { return "Savings Premium Coverage"; }
}

// ─── CONCRETE CLASS: FixedDeposit — extends abstract + implements Taxable only ─
class FixedDeposit extends BankAccount implements Taxable {
    private int months;
    private double fdRate;

    FixedDeposit(String accNo, String holder, double amount, int months, double rate) {
        super(accNo, holder, amount);
        this.months = months;
        this.fdRate = rate;
    }

    @Override
    public void withdraw(double amount) {
        System.out.println("  [Withdraw] BLOCKED: FD account cannot withdraw before maturity ("
            + months + " months).");
    }

    @Override
    public double calculateInterest() {
        return balance * (fdRate / 100) * (months / 12.0);
    }

    @Override
    public String getAccountType() { return "Fixed Deposit (" + months + " months @ " + fdRate + "%)"; }

    @Override
    public double calculateTax(double amount) {
        return amount * TAX_RATE * 0.8;  // 80% tax on FD interest (TDS)
    }

    @Override
    public String getTaxType() { return "TDS on Fixed Deposit"; }  // Override default method
}

public class Main {
    public static void main(String[] args) {
        System.out.println("====== Creating Accounts ======");
        SavingsAccount sa = new SavingsAccount("SAV-001", "Rahul Sharma",  50000.0, 4.0);
        FixedDeposit   fd = new FixedDeposit("FD-001", "Ayesha Khan", 200000.0, 12, 7.5);

        System.out.println("\\n====== Account Details ======");
        sa.displayBalance();  // Shared concrete method from abstract class
        fd.displayBalance();

        System.out.println("\\n====== Transactions ======");
        sa.deposit(5000.0);          // Inherited from abstract class
        sa.withdraw(10000.0);        // Own implementation
        sa.withdraw(48000.0);        // Rejected (min balance)
        fd.withdraw(50000.0);        // Blocked (FD rule)

        System.out.println("\\n====== Interest & Tax Calculations ======");
        double saInterest = sa.calculateInterest();
        double fdInterest = fd.calculateInterest();

        System.out.println("  SA Interest earned:   Rs." + saInterest);
        System.out.println("  SA Tax on interest:   Rs." + sa.calculateTax(saInterest));
        System.out.println("  SA Insurance:         Rs." + sa.calculateInsurance());
        System.out.println("  SA Insurance Plan:    "    + sa.getInsurancePlan());

        System.out.println("  FD Interest earned:   Rs." + fdInterest);
        System.out.println("  FD Tax type:          "    + fd.getTaxType());
        System.out.println("  FD TDS on interest:   Rs." + fd.calculateTax(fdInterest));

        System.out.println("\\n====== Polymorphism via Abstract Class Reference ======");
        BankAccount[] accounts = { sa, fd };
        for (BankAccount acc : accounts) {
            System.out.println("  Type: " + acc.getAccountType()
                + " | Interest: Rs." + String.format("%.2f", acc.calculateInterest()));
        }

        System.out.println("\\n====== instanceof Checks ======");
        System.out.println("sa instanceof BankAccount: " + (sa instanceof BankAccount));
        System.out.println("sa instanceof Taxable:     " + (sa instanceof Taxable));
        System.out.println("sa instanceof Insurable:   " + (sa instanceof Insurable));
        System.out.println("fd instanceof Insurable:   " + (fd instanceof Insurable)); // false!
    }
}`,
    output: `====== Creating Accounts ======
[Account Created] SAV-001 for Rahul Sharma | Balance: Rs.50000.0
[Account Created] FD-001 for Ayesha Khan | Balance: Rs.200000.0

====== Account Details ======
  ITM National Bank | SAV-001 | Holder: Rahul Sharma | Balance: Rs.50000.0
  ITM National Bank | FD-001 | Holder: Ayesha Khan | Balance: Rs.200000.0

====== Transactions ======
  [Deposit] Rs.5000.0 deposited. Balance: Rs.55000.0
  [Withdraw] Rs.10000.0 withdrawn. Balance: Rs.45000.0
  [Withdraw] REJECTED: would breach minimum balance of Rs.1000
  [Withdraw] BLOCKED: FD account cannot withdraw before maturity (12 months).

====== Interest & Tax Calculations ======
  SA Interest earned:   Rs.1800.0
  SA Tax on interest:   Rs.180.0
  SA Insurance:         Rs.225.0
  SA Insurance Plan:    Savings Premium Coverage
  FD Interest earned:   Rs.15000.0
  FD Tax type:          TDS on Fixed Deposit
  FD TDS on interest:   Rs.1200.0

====== Polymorphism via Abstract Class Reference ======
  Type: Savings Account | Interest: Rs.1800.00
  Type: Fixed Deposit (12 months @ 7.5%) | Interest: Rs.15000.00

====== instanceof Checks ======
sa instanceof BankAccount: true
sa instanceof Taxable:     true
sa instanceof Insurable:   true
fd instanceof Insurable:   false`,
    commonMistakesToAvoid: [
      "Trying to instantiate an abstract class with 'new AbstractClass()' — compile error.",
      "Forgetting to implement ALL abstract methods in the concrete subclass — compile error.",
      "Adding instance fields to an interface — not allowed; interfaces only have public static final constants.",
      "Saying abstract classes cannot have constructors — WRONG, they CAN (called via super() from subclass).",
      "Choosing interface when shared STATE (fields) is needed — use abstract class instead.",
    ],
    keyTakeaways: [
      "Abstract class: mixed (abstract + concrete methods), has instance fields + constructors, extends ONE.",
      "Interface: pure contract (abstract methods + constants), no fields/constructors, implements MANY.",
      "Use abstract class for IS-A with shared state. Use interface for CAN-DO capabilities.",
      "A class can 'extends' one abstract class AND 'implements' multiple interfaces simultaneously.",
      "Both cannot be instantiated directly — only their concrete subclasses/implementations can be.",
    ],
  },
];
