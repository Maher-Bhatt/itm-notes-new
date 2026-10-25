export interface PredictOutputItem {
  id: string;
  programNumber: number;
  title: string;
  code: string;
  output: string;
  steps: { step: number; action: string }[];
  rule: string;
  concept: string;
  callStack?: { label: string; detail: string }[];
}

export interface LongAnswerQuestion {
  id: string;
  qNumber: string;
  title: string;
  marks: number;
  concept: string;
  requirements?: string[];
  code: string;
  output: string;
  explanationPoints: string[];
  traceTable?: { headers: string[]; rows: string[][] };
  examNote: string;
  vivaTrap?: string;
  category: 'polymorphism' | 'inheritance' | 'interfaces' | 'constructors' | 'static' | 'recursion' | 'classes' | 'exceptions';
}

export interface TheoryQuestion {
  id: string;
  qNumber: number;
  title: string;
  marks: number;
  definition: string;
  usesOrRules: { title: string; explanation: string; code?: string; output?: string }[];
  comparisonTable?: { headers: string[]; rows: string[][] };
  diagram?: string;
  examTip: string;
  category: string;
}

export interface McqRevisionItem {
  topic: string;
  remember: string;
}

export interface QuickMcq {
  question: string;
  answer: string;
  explanation?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// PART A: PREDICT THE OUTPUT (5 Programs with line-by-line traces)
// ─────────────────────────────────────────────────────────────────────────────
export const PREDICT_OUTPUT_QUESTIONS: PredictOutputItem[] = [
  {
    id: "pred-1",
    programNumber: 1,
    title: "Constructor chaining in multilevel inheritance",
    concept: "Constructor chaining (bottom-up call, top-down execution)",
    code: `class A { A() { System.out.println("A"); } }
class B extends A { B() { System.out.println("B"); } }
class C extends B { C() { System.out.println("C"); } }

public class Main {
    public static void main(String[] args) {
        new C();
    }
}`,
    output: `A\nB\nC`,
    steps: [
      { step: 1, action: "new C() starts. The first line of any constructor is a call to the parent constructor. C() has none written, so the compiler inserts super();." },
      { step: 2, action: "Control goes to B(). It also begins with an implicit super();, so control goes to A()." },
      { step: 3, action: "A() has no parent except Object. It runs its body: prints A." },
      { step: 4, action: "A finishes, control returns to B(). It runs its body: prints B." },
      { step: 5, action: "B finishes, control returns to C(). It runs its body: prints C." },
    ],
    rule: "Constructors are *called* bottom-up (C, B, A) but *finish and print* top-down (A, B, C). The parent part of an object must be fully built before the child part.",
    callStack: [
      { label: "Step 1", detail: "main() -> C()" },
      { label: "Step 2", detail: "C() -> B() [via implicit super()]" },
      { label: "Step 3", detail: "B() -> A() [via implicit super()]" },
      { label: "Step 4", detail: "A() prints 'A' & returns" },
      { label: "Step 5", detail: "B() prints 'B' & returns" },
      { label: "Step 6", detail: "C() prints 'C' & returns" },
    ],
  },
  {
    id: "pred-2",
    programNumber: 2,
    title: "Runtime polymorphism (Dynamic Method Dispatch)",
    concept: "Overridden method resolved by actual object at runtime",
    code: `class Animal { void sound() { System.out.println("Animal sound"); } }
class Dog extends Animal { void sound() { System.out.println("Bark"); } }

public class Main {
    public static void main(String[] args) {
        Animal a = new Dog();
        a.sound();
        a = new Animal();
        a.sound();
    }
}`,
    output: `Bark\nAnimal sound`,
    steps: [
      { step: 1, action: "Animal a = new Dog(); Reference 'a' is type Animal, but the actual heap object is Dog (upcasting)." },
      { step: 2, action: "a.sound(); JVM inspects the runtime object (Dog) and executes Dog's sound() -> prints 'Bark'." },
      { step: 3, action: "a = new Animal(); Reference 'a' is reassigned to point to an Animal object." },
      { step: 4, action: "a.sound(); JVM inspects runtime object (Animal) and executes Animal's sound() -> prints 'Animal sound'." },
    ],
    rule: "An overridden method is chosen using the actual object at runtime (dynamic method dispatch), not the reference type.",
  },
  {
    id: "pred-3",
    programNumber: 3,
    title: "Static counter vs instance id",
    concept: "Static variable (one shared copy) vs Instance variable (per object copy)",
    code: `class Counter {
    static int count = 0;
    int id;
    Counter() { count++; id = count; }
}

public class Main {
    public static void main(String[] args) {
        Counter c1 = new Counter();
        Counter c2 = new Counter();
        System.out.println(c1.id + " " + c2.id + " " + Counter.count);
    }
}`,
    output: `1 2 2`,
    steps: [
      { step: 1, action: "Initial state: static count = 0." },
      { step: 2, action: "new Counter() for c1: count becomes 1, then c1.id = 1." },
      { step: 3, action: "new Counter() for c2: count becomes 2, then c2.id = 2." },
      { step: 4, action: "Printing c1.id (1), c2.id (2), and Counter.count (2) yields '1 2 2'." },
    ],
    rule: "id is an instance variable (each object keeps its own copy, so c1 retains 1), while count is static (one shared copy in class metadata).",
  },
  {
    id: "pred-4",
    programNumber: 4,
    title: "Recursion (factorial of 5)",
    concept: "Call stack frames push & unwind upon reaching base case",
    code: `public class Main {
    static int f(int n) {
        if (n <= 1) return 1;
        return n * f(n - 1);
    }
    public static void main(String[] args) {
        System.out.println(f(5));
    }
}`,
    output: `120`,
    steps: [
      { step: 1, action: "Call Stack Push: f(5) = 5 * f(4) -> f(4) = 4 * f(3) -> f(3) = 3 * f(2) -> f(2) = 2 * f(1)." },
      { step: 2, action: "Base Case: f(1) hits n <= 1 and immediately returns 1." },
      { step: 3, action: "Unwinding: f(2) returns 2 * 1 = 2." },
      { step: 4, action: "Unwinding: f(3) returns 3 * 2 = 6." },
      { step: 5, action: "Unwinding: f(4) returns 4 * 6 = 24." },
      { step: 6, action: "Unwinding: f(5) returns 5 * 24 = 120." },
    ],
    rule: "Five stack frames are pushed. The base case n <= 1 halts recursion, and values multiply as the stack frames pop in LIFO order.",
  },
  {
    id: "pred-5",
    programNumber: 5,
    title: "Constructor chaining with this()",
    concept: "Overloaded constructor invocation using this(...)",
    code: `class P {
    int x, y;
    P() {
        this(5, 10);
        System.out.println("Default");
    }
    P(int x, int y) {
        this.x = x;
        this.y = y;
        System.out.println("Param: " + x + "," + y);
    }
}

public class Main {
    public static void main(String[] args) {
        new P();
    }
}`,
    output: `Param: 5,10\nDefault`,
    steps: [
      { step: 1, action: "new P() calls the no-arg constructor P()." },
      { step: 2, action: "Its first line is this(5, 10), which jumps to P(int, int) before anything else in P() executes." },
      { step: 3, action: "P(5, 10) initializes x=5, y=10 and prints 'Param: 5,10'." },
      { step: 4, action: "Control returns to P(), which resumes with its next line and prints 'Default'." },
    ],
    rule: "The statement written after this(...) executes last, so output prints in the reverse order of how constructors appear in source code.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// PART B: LONG ANSWER / PROGRAMMING QUESTIONS (15 Questions, 5 Marks Each)
// ─────────────────────────────────────────────────────────────────────────────
export const LONG_ANSWER_QUESTIONS: LongAnswerQuestion[] = [
  {
    id: "la-q1",
    qNumber: "Q1",
    title: "Dynamic Method Dispatch with Shape Program",
    marks: 5,
    category: "polymorphism",
    concept: "Dynamic method dispatch is the mechanism by which a call to an overridden method is resolved at runtime instead of compile time. When a superclass reference variable holds the address of a subclass object, the version of the method that runs is decided by the type of the object (not the type of the reference). This is how Java achieves runtime polymorphism.",
    requirements: [
      "There must be inheritance (IS-A relationship): Circle is-a Shape.",
      "The subclass must override the superclass method (same name, same parameters).",
      "A superclass reference must point to a subclass object: Shape s = new Circle(); (upcasting).",
    ],
    code: `class Shape {
    void area() { System.out.println("Area of generic shape"); }
}

class Circle extends Shape {
    double r = 5;
    @Override
    void area() { System.out.println("Area of Circle = " + (3.14 * r * r)); }
}

class Rectangle extends Shape {
    double l = 4, b = 6;
    @Override
    void area() { System.out.println("Area of Rectangle = " + (l * b)); }
}

public class Main {
    public static void main(String[] args) {
        Shape s; // superclass reference
        s = new Circle(); // upcasting: points to a Circle object
        s.area(); // Circle's area() runs

        s = new Rectangle(); // same reference, now points to Rectangle
        s.area(); // Rectangle's area() runs
    }
}`,
    output: `Area of Circle = 78.5\nArea of Rectangle = 24.0`,
    explanationPoints: [
      "Shape s; creates only a reference of type Shape. No object exists on heap yet.",
      "s = new Circle(); is upcasting. s now holds the memory address of a Circle object.",
      "s.area(): Compiler only verifies that Shape declares area(). At runtime, JVM checks actual object (Circle) and dispatches Circle.area().",
      "s = new Rectangle(); rebinds reference s to Rectangle. The same call s.area() now dispatches Rectangle.area().",
      "Calculations: Circle = 3.14 * 5 * 5 = 78.5. Rectangle = 4 * 6 = 24.0 (floating double).",
    ],
    examNote: "Crucial keywords for full marks: 'runtime polymorphism', 'upcasting', and 'method overriding'. Also note: a superclass reference can call only methods that exist in the superclass; subclass-specific methods are not accessible through it.",
    vivaTrap: "Examiner question: Can you call a method unique to Circle (e.g. s.circumference()) via Shape s? Answer: No! Compile-time check fails unless downcast: ((Circle)s).circumference().",
  },
  {
    id: "la-q2",
    qNumber: "Q2",
    title: "Multilevel Inheritance with the super Keyword",
    marks: 5,
    category: "inheritance",
    concept: "In multilevel inheritance a class is derived from a class that is itself derived from another class: Person -> Employee -> Manager. When a Manager object is created, constructors execute from the top of the chain (Person -> Employee -> Manager). Since Person and Employee have parameterized constructors, each child must pass values upward using super(...), which must be the first statement in the constructor.",
    code: `class Person {
    String name;
    Person(String name) {
        this.name = name;
    }
}

class Employee extends Person {
    int empId;
    Employee(String name, int empId) {
        super(name); // calls Person(String)
        this.empId = empId;
    }
}

class Manager extends Employee {
    String department;
    Manager(String name, int empId, String department) {
        super(name, empId); // calls Employee(String, int)
        this.department = department;
    }
    void display() {
        System.out.println("Name         : " + name);
        System.out.println("Employee ID  : " + empId);
        System.out.println("Department   : " + department);
    }
}

public class Main {
    public static void main(String[] args) {
        Manager m = new Manager("Rahul", 101, "Finance");
        m.display();
    }
}`,
    output: `Name         : Rahul\nEmployee ID  : 101\nDepartment   : Finance`,
    traceTable: {
      headers: ["Order", "Constructor", "Action"],
      rows: [
        ["1", "Manager(...) starts", "First line super(name, empId) calls Employee constructor."],
        ["2", "Employee(...) starts", "First line super(name) calls Person constructor."],
        ["3", "Person(...) runs", "Sets name = 'Rahul'. Finishes."],
        ["4", "Employee continues", "Sets empId = 101. Finishes."],
        ["5", "Manager continues", "Sets department = 'Finance'. Finishes."],
      ],
    },
    explanationPoints: [
      "display() accesses name and empId directly because Manager inherits them from Employee and Person (package-private/default access).",
      "super(...) MUST be the first statement in child constructors; putting it anywhere else causes a compile-time error.",
      "If Person had no no-arg constructor and Employee did not call super(name), compilation would immediately fail.",
    ],
    examNote: "Remember: Java does not support multiple inheritance with classes (class C extends A, B is illegal), but multilevel inheritance (C extends B, B extends A) is fully supported.",
  },
  {
    id: "la-q3",
    qNumber: "Q3",
    title: "Interface Vehicle with Car and Bike, plus instanceof",
    marks: 5,
    category: "interfaces",
    concept: "An interface declares what a class must do, not how. Classes use implements to promise to provide all of its methods. An interface reference can point to any object of an implementing class, providing polymorphism. The instanceof operator checks the real type of the object at runtime.",
    code: `interface Vehicle {
    void start();
    void stop();
}

class Car implements Vehicle {
    public void start() { System.out.println("Car started"); }
    public void stop()  { System.out.println("Car stopped"); }
}

class Bike implements Vehicle {
    public void start() { System.out.println("Bike started"); }
    public void stop()  { System.out.println("Bike stopped"); }
}

public class Main {
    public static void main(String[] args) {
        Vehicle v1 = new Car();  // interface reference -> Car object
        Vehicle v2 = new Bike(); // interface reference -> Bike object

        v1.start();
        v1.stop();
        v2.start();
        v2.stop();

        if (v1 instanceof Car)  System.out.println("v1 is a Car");
        if (v1 instanceof Bike) System.out.println("v1 is a Bike");
        if (v2 instanceof Car)  System.out.println("v2 is a Car");
        if (v2 instanceof Bike) System.out.println("v2 is a Bike");
    }
}`,
    output: `Car started\nCar stopped\nBike started\nBike stopped\nv1 is a Car\nv2 is a Bike`,
    explanationPoints: [
      "Vehicle v1 = new Car();: An interface cannot be instantiated with 'new Vehicle()', but an interface reference can hold any implementing object.",
      "v1.start() executes Car.start() via dynamic dispatch.",
      "v1 instanceof Car evaluates to true, while v1 instanceof Bike evaluates to false because the runtime object is Car.",
    ],
    examNote: "Common mistake: writing 'void start() {...}' in Car without the public keyword. Interface methods are implicitly public abstract. Overriding methods cannot assign weaker access privileges (default is weaker than public), causing compile error.",
    vivaTrap: "Why is public mandatory in implementing class? Because in interface, methods are 'public abstract' by default, and Java prohibits reducing method visibility when overriding.",
  },
  {
    id: "la-q4",
    qNumber: "Q4",
    title: "Interface Inheritance (A, B extends A, class implements B)",
    marks: 5,
    category: "interfaces",
    concept: "An interface can extend another interface using extends (and even multiple interfaces separated by commas). The child interface inherits all abstract methods of the parent. A concrete class that implements the child interface must define all inherited and declared abstract methods.",
    code: `interface A {
    void showA();
}

interface B extends A {
    void showB();
}

class Demo implements B {
    public void showA() { System.out.println("Method showA() from interface A"); }
    public void showB() { System.out.println("Method showB() from interface B"); }
}

public class Main {
    public static void main(String[] args) {
        Demo d = new Demo();
        d.showA();
        d.showB();
    }
}`,
    output: `Method showA() from interface A\nMethod showB() from interface B`,
    explanationPoints: [
      "B extends A means B contains both showA() (inherited) and showB() (own).",
      "A concrete class implementing B accepts the entire contract. If Demo omitted showA(), compiler would error: 'Demo is not abstract and does not override abstract method showA() in A'.",
      "The only alternative to not defining showA() is declaring class Demo as abstract.",
    ],
    examNote: "Keyword rule: class extends class, class implements interface, interface extends interface.",
  },
  {
    id: "la-q5",
    qNumber: "Q5",
    title: "Rectangle Class with Constructor Chaining using this()",
    marks: 5,
    category: "constructors",
    concept: "Constructor overloading gives a class several constructors with different parameter lists. Constructor chaining with this(...) lets one constructor call another constructor of the same class so initialization code is written only once. this(...) must be the first statement.",
    code: `class Rectangle {
    int length, breadth;

    Rectangle() { // no-argument constructor
        this(1, 1); // chains to parameterized constructor
    }

    Rectangle(int length, int breadth) { // parameterized constructor
        this.length = length;
        this.breadth = breadth;
    }

    int area() {
        return length * breadth;
    }
}

public class Main {
    public static void main(String[] args) {
        Rectangle r1 = new Rectangle();      // length = 1, breadth = 1
        Rectangle r2 = new Rectangle(5, 4);   // length = 5, breadth = 4
        System.out.println("Area of r1 = " + r1.area());
        System.out.println("Area of r2 = " + r2.area());
    }
}`,
    output: `Area of r1 = 1\nArea of r2 = 20`,
    explanationPoints: [
      "new Rectangle() invokes the no-arg constructor, which immediately runs this(1, 1), transferring control to the 2-argument constructor.",
      "this.length = length: 'this.length' refers to the instance variable, while 'length' refers to the parameter, resolving shadowing.",
      "Calculations: r1 = 1 * 1 = 1; r2 = 5 * 4 = 20.",
    ],
    examNote: "Never call this() in a recursive loop (A calls B and B calls A); the compiler catches this and throws 'recursive constructor invocation'.",
  },
  {
    id: "la-q6",
    qNumber: "Q6",
    title: "Method Overloading: area() of Three Shapes",
    marks: 5,
    category: "polymorphism",
    concept: "Method overloading occurs when multiple methods in the same class share the same name but differ in number, type, or order of parameters. The compiler resolves the target method at compile time based on method signatures, so it is compile-time (static) polymorphism. Return type alone CANNOT differentiate overloaded methods.",
    code: `class Area {
    int area(int side) { // square: one int
        return side * side;
    }

    int area(int length, int breadth) { // rectangle: two ints
        return length * breadth;
    }

    double area(double radius) { // circle: one double
        return 3.14 * radius * radius;
    }
}

public class Main {
    public static void main(String[] args) {
        Area a = new Area();
        System.out.println("Square    : " + a.area(5));
        System.out.println("Rectangle : " + a.area(4, 6));
        System.out.println("Circle    : " + a.area(2.0));
    }
}`,
    output: `Square    : 25\nRectangle : 24\nCircle    : 12.56`,
    traceTable: {
      headers: ["Call", "Arguments", "Version Chosen", "Result"],
      rows: [
        ["a.area(5)", "one int", "area(int)", "5 * 5 = 25"],
        ["a.area(4, 6)", "two ints", "area(int, int)", "4 * 6 = 24"],
        ["a.area(2.0)", "one double", "area(double)", "3.14 * 2.0 * 2.0 = 12.56"],
      ],
    },
    explanationPoints: [
      "Note that passing an integer literal like a.area(2) would invoke area(int) and return 4 (square), not the circle.",
      "Passing a floating-point literal like 2.0 binds to double, triggering the circle method.",
    ],
    examNote: "Writing two methods with the exact same parameter list but different return types (e.g. int area(int) vs double area(int)) gives compile error: 'method area(int) is already defined'.",
  },
  {
    id: "la-q7",
    qNumber: "Q7",
    title: "Recursion: Factorial, Fibonacci, and the Call Stack",
    marks: 5,
    category: "recursion",
    concept: "Recursion is when a method calls itself to solve smaller subproblems. Every recursive method requires a base case (stopping criterion) and a recursive case. Each call allocates a stack frame on the JVM call stack.",
    code: `public class Main {
    // factorial: n! = n * (n-1)!; base: 0! = 1! = 1
    static int factorial(int n) {
        if (n <= 1) return 1;
        return n * factorial(n - 1);
    }

    // n-th Fibonacci number: fib(n) = fib(n-1) + fib(n-2); base: fib(0)=0, fib(1)=1
    static int fib(int n) {
        if (n <= 1) return n;
        return fib(n - 1) + fib(n - 2);
    }

    static void printFibonacci(int terms) {
        for (int i = 0; i < terms; i++) {
            System.out.print(fib(i) + " ");
        }
        System.out.println();
    }

    public static void main(String[] args) {
        System.out.println("Factorial of 4 = " + factorial(4));
        System.out.print("Fibonacci series (7 terms): ");
        printFibonacci(7);
    }
}`,
    output: `Factorial of 4 = 24\nFibonacci series (7 terms): 0 1 1 2 3 5 8`,
    explanationPoints: [
      "Push phase: factorial(4) -> factorial(3) -> factorial(2) -> factorial(1) are pushed onto stack.",
      "Base case: factorial(1) returns 1 without calling further.",
      "Pop phase: Frames pop in reverse (LIFO). 2 * 1 = 2 -> 3 * 2 = 6 -> 4 * 6 = 24.",
      "Fibonacci terms generated: 0, 1, 1, 2, 3, 5, 8 for indices 0 through 6.",
    ],
    examNote: "Without a valid base case, recursion executes infinitely until JVM memory is exhausted, throwing StackOverflowError.",
  },
  {
    id: "la-q8",
    qNumber: "Q8",
    title: "Static Variable Counting Objects",
    marks: 5,
    category: "static",
    concept: "A static variable belongs to the class itself rather than any individual instance. There is only one shared copy in memory, loaded when the class is initialized. An instance variable has a distinct copy in every instantiated object. A static method can be called without creating an instance.",
    code: `class Counter {
    static int count = 0; // shared across all instances

    Counter() {
        count++; // executes each time a new object is created
    }

    static void displayCount() {
        System.out.println("Objects created: " + count);
    }
}

public class Main {
    public static void main(String[] args) {
        Counter c1 = new Counter();
        Counter.displayCount();
        Counter c2 = new Counter();
        Counter.displayCount();
        Counter c3 = new Counter();
        Counter.displayCount();
    }
}`,
    output: `Objects created: 1\nObjects created: 2\nObjects created: 3`,
    traceTable: {
      headers: ["After Action", "Static count"],
      rows: [
        ["c1 created", "1"],
        ["c2 created", "2"],
        ["c3 created", "3"],
      ],
    },
    explanationPoints: [
      "If 'count' were an instance variable (non-static), every new object would get its own count starting from 0 and incrementing to 1, causing the output to always be 1.",
      "displayCount() is static so it can be called directly via ClassName.displayCount() without needing an object.",
    ],
    examNote: "Static methods cannot access non-static variables directly because they have no 'this' pointer to an individual object instance.",
  },
  {
    id: "la-q9",
    qNumber: "Q9",
    title: "Passing and Returning Objects: Complex Numbers",
    marks: 5,
    category: "classes",
    concept: "In Java, object references are passed by value. When an object is passed as an argument, a copy of the reference is received, pointing to the same heap object. Methods can also construct and return new objects.",
    code: `class Complex {
    int real, imag;

    Complex(int real, int imag) {
        this.real = real;
        this.imag = imag;
    }

    // Receives a Complex object and returns a newly created Complex object
    Complex add(Complex c) {
        return new Complex(this.real + c.real, this.imag + c.imag);
    }

    void display() {
        System.out.println(real + " + " + imag + "i");
    }
}

public class Main {
    public static void main(String[] args) {
        Complex c1 = new Complex(3, 4);
        Complex c2 = new Complex(2, 5);
        Complex sum = c1.add(c2); // c2 passed as argument, new object returned

        System.out.print("c1 = "); c1.display();
        System.out.print("c2 = "); c2.display();
        System.out.print("sum = "); sum.display();
    }
}`,
    output: `c1 = 3 + 4i\nc2 = 2 + 5i\nsum = 5 + 9i`,
    explanationPoints: [
      "Inside c1.add(c2), 'this' refers to c1 and parameter 'c' refers to c2.",
      "Real parts: 3 + 2 = 5; Imaginary parts: 4 + 5 = 9.",
      "A new Complex(5, 9) is allocated in the heap and returned into 'sum'. The original objects c1 and c2 remain unaltered (pure/immutable operation).",
    ],
    examNote: "Passing objects to methods allows clean encapsulation of mathematical and domain entities.",
  },
  {
    id: "la-q10",
    qNumber: "Q10",
    title: "Access Specifiers: Comparison Table & Demonstration",
    marks: 5,
    category: "classes",
    concept: "Access specifiers dictate the visibility and accessibility of classes, constructors, methods, and fields. Java provides four levels: private, default (package-private), protected, and public.",
    code: `class Access {
    private   int a = 1; // private: same class only
              int b = 2; // default: same package
    protected int c = 3; // protected: package + subclasses
    public    int d = 4; // public: everywhere

    void show() { // inside same class: all four are accessible
        System.out.println(a + " " + b + " " + c + " " + d);
    }
}

public class Main { // different class in the SAME package
    public static void main(String[] args) {
        Access obj = new Access();
        // System.out.println(obj.a); // COMPILE ERROR: 'a' has private access
        System.out.println(obj.b); // OK: default is visible in same package
        System.out.println(obj.c); // OK: protected is visible in same package
        System.out.println(obj.d); // OK: public is visible everywhere
        obj.show();                // OK: prints all four
    }
}`,
    output: `2\n3\n4\n1 2 3 4`,
    traceTable: {
      headers: ["Specifier", "Same Class", "Same Package", "Subclass (Diff Pkg)", "World (Diff Pkg)"],
      rows: [
        ["private", "Yes", "No", "No", "No"],
        ["default (no keyword)", "Yes", "Yes", "No", "No"],
        ["protected", "Yes", "Yes", "Yes (via inheritance)", "No"],
        ["public", "Yes", "Yes", "Yes", "Yes"],
      ],
    },
    explanationPoints: [
      "Accessing obj.a directly outside the Access class fails at compile time with: 'a has private access in Access'.",
      "From a different package, only public members can be accessed directly on an object reference; protected members can only be accessed through inheritance inside a subclass.",
    ],
    examNote: "Order from most restrictive to least: private < default < protected < public.",
  },
  {
    id: "la-q11",
    qNumber: "Q11",
    title: "Inner Class and Static Nested Class",
    marks: 5,
    category: "classes",
    concept: "A non-static inner class is defined inside an enclosing class. Each Inner object is bound to an enclosing Outer instance and can access all Outer members, including private ones. A static nested class is declared with static; it does not hold a reference to an Outer instance and can directly access only static members of Outer.",
    code: `class Outer {
    int x = 10;        // instance member
    static int y = 20; // static member

    class Inner { // non-static inner class
        void display() {
            System.out.println("Inner accessing outer x = " + x);
        }
    }

    static class Nested { // static nested class
        void display() {
            System.out.println("Nested accessing outer static y = " + y);
        }
    }
}

public class Main {
    public static void main(String[] args) {
        Outer o = new Outer();
        Outer.Inner in = o.new Inner(); // Outer object instance required!
        in.display();

        Outer.Nested n = new Outer.Nested(); // No Outer object required!
        n.display();
    }
}`,
    output: `Inner accessing outer x = 10\nNested accessing outer static y = 20`,
    explanationPoints: [
      "o.new Inner() creates an Inner object bound to Outer instance 'o', providing implicit access to instance variable x.",
      "new Outer.Nested() instantiates the static class directly using the outer class name without creating an Outer instance.",
      "Inside Nested, writing 'x' directly causes a compile error because there is no enclosing Outer object.",
    ],
    examNote: "Syntax differentiator: Inner instantiation uses 'outerObj.new Inner()', while static nested uses 'new Outer.Nested()'.",
  },
  {
    id: "la-q12",
    qNumber: "Q12",
    title: "Anonymous Inner Classes",
    marks: 5,
    category: "classes",
    concept: "An anonymous inner class has no declared class name. It is declared and instantiated in a single expression: 'new TypeName() { ... };'. It either implements an interface or extends a class (concrete or abstract), typically used for short, one-time implementations like listeners or runnables.",
    code: `interface Greeting {
    void sayHello();
}

abstract class Animal {
    abstract void sound();
}

public class Main {
    public static void main(String[] args) {
        // 1) Anonymous class implementing Greeting interface
        Greeting g = new Greeting() {
            public void sayHello() {
                System.out.println("Hello from anonymous class!");
            }
        };
        g.sayHello();

        // 2) Anonymous subclass of abstract class Animal
        Animal a = new Animal() {
            void sound() {
                System.out.println("Anonymous animal makes a sound");
            }
        };
        a.sound();
    }
}`,
    output: `Hello from anonymous class!\nAnonymous animal makes a sound`,
    explanationPoints: [
      "'new Greeting() { ... }' does not instantiate the interface itself; it compiles into a synthetic class (e.g. Main$1) implementing Greeting.",
      "The method implemented for the interface must be declared public.",
      "Reference variable type is Greeting/Animal, but the actual runtime instance belongs to the compiler-generated anonymous class.",
    ],
    examNote: "Anonymous classes cannot declare constructors because they do not have a name! They can only have instance initializers.",
  },
  {
    id: "la-q13",
    qNumber: "Q13",
    title: "The final Keyword: Variable, Method, Class",
    marks: 5,
    category: "classes",
    concept: "The final keyword is used to restrict modification: (1) Final variable: becomes a constant whose value cannot be reassigned; (2) Final method: cannot be overridden by subclasses; (3) Final class: cannot be inherited or extended.",
    code: `class Base {
    final int MAX = 100; // (a) final variable
    final void show() { System.out.println("Final method"); } // (b) final method
}

final class Sealed { } // (c) final class

// class Child extends Sealed { } // ERROR: cannot inherit from final class Sealed

class Derived extends Base {
    // void show() { } // ERROR: show() in Derived cannot override final show() in Base
}

public class Main {
    public static void main(String[] args) {
        Base b = new Base();
        // b.MAX = 200; // ERROR: cannot assign a value to final variable MAX
        System.out.println(b.MAX);
        b.show();
    }
}`,
    output: `100\nFinal method`,
    traceTable: {
      headers: ["Line Attempted", "Compiler Error", "Reason"],
      rows: [
        ["b.MAX = 200;", "cannot assign a value to final variable MAX", "A final variable can be assigned only once, becoming constant."],
        ["void show() { } in Derived", "show() in Derived cannot override final show() in Base", "A final method's implementation is sealed against overriding."],
        ["class Child extends Sealed", "cannot inherit from final class Sealed", "A final class cannot be subclassed (e.g. java.lang.String)."],
      ],
    },
    explanationPoints: [
      "A blank final variable can be declared without initialization and initialized once later inside a constructor.",
      "Final methods CAN be inherited and invoked by subclasses; only overriding them is prohibited.",
      "All methods of a final class are implicitly final.",
    ],
    examNote: "Famous examples: String, Integer, Math are final classes in Java to preserve immutability and security.",
  },
  {
    id: "la-q14",
    qNumber: "Q14",
    title: "Abstract Class vs Interface with Account/Savings Program",
    marks: 5,
    category: "interfaces",
    concept: "An abstract class serves as a blueprint with partial implementation, allowing state (instance variables) and constructors. An interface defines a pure contract of capabilities (methods were 100% abstract traditionally; default/static allowed since Java 8). A class can extend only one abstract class, but implement multiple interfaces.",
    code: `abstract class Account {
    double balance;

    Account(double balance) { // abstract classes CAN have constructors
        this.balance = balance;
    }

    abstract double interest(); // abstract method: no body

    void showBalance() { // concrete method: shared across all subclasses
        System.out.println("Balance: " + balance);
    }
}

class Savings extends Account {
    Savings(double balance) {
        super(balance);
    }

    double interest() { // must implement the abstract method
        return balance * 0.04; // 4% interest
    }
}

public class Main {
    public static void main(String[] args) {
        // Account a = new Account(5000); // ERROR: Account is abstract; cannot be instantiated
        Account a = new Savings(10000);
        a.showBalance();
        System.out.println("Interest: " + a.interest());
    }
}`,
    output: `Balance: 10000.0\nInterest: 400.0`,
    traceTable: {
      headers: ["Feature", "Abstract Class", "Interface"],
      rows: [
        ["Keyword", "abstract class", "interface"],
        ["Methods", "Both abstract and concrete allowed", "Abstract by default (default/static since Java 8)"],
        ["Variables", "Any kind (instance, static, final, non-final)", "Only public static final constants"],
        ["Constructors", "Allowed (called via super())", "Not allowed"],
        ["Inheritance", "Single inheritance (extends)", "Multiple inheritance (implements)"],
      ],
    },
    explanationPoints: [
      "Abstract classes cannot be instantiated with new, but an abstract reference can hold subclass instances.",
      "Savings must implement interest(); otherwise Savings itself must be declared abstract.",
      "Interest = 10000 * 0.04 = 400.0.",
    ],
    examNote: "Remember: Abstract classes are for IS-A relationships with shared code; interfaces are for CAN-DO contracts across unrelated classes.",
  },
  {
    id: "la-q15",
    qNumber: "Q15",
    title: "Constructor Execution Order & super(args)",
    marks: 5,
    category: "constructors",
    concept: "In inheritance, constructors execute top-down (superclass first, subclass second). Java inserts super(); automatically if no constructor call is written. However, if the superclass defines ONLY a parameterized constructor, Java does NOT generate a default constructor, causing a compile error unless the child explicitly calls super(args).",
    code: `class Parent {
    Parent(int x) {
        System.out.println("Parent constructor: " + x);
    }
}

class Child extends Parent {
    Child() {
        super(10); // EXPLICIT call: must be first statement
        System.out.println("Child constructor");
    }
}

public class Main {
    public static void main(String[] args) {
        new Child();
    }
}`,
    output: `Parent constructor: 10\nChild constructor`,
    explanationPoints: [
      "If Child() omitted super(10), compiler would look for invisible super() in Parent, which does not exist, causing: 'constructor Parent in class Parent cannot be applied to given types; required: int, found: no arguments'.",
      "Two other remedies: (1) Add a no-arg constructor Parent() { } in Parent, or (2) Pass Child parameter up: Child(int v) { super(v); }.",
    ],
    examNote: "Constructor execution rule: The superclass constructor always finishes before the child constructor body runs, ensuring the inherited base is initialized.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// PART C: THEORY QUESTIONS (18 Questions, 3 Marks Each)
// ─────────────────────────────────────────────────────────────────────────────
export const THEORY_QUESTIONS: TheoryQuestion[] = [
  {
    id: "th-1",
    qNumber: 1,
    title: "Use of the super Keyword (Two Examples)",
    marks: 3,
    category: "keywords",
    definition: "super is a reference variable used in a subclass to refer to the immediate parent class object.",
    usesOrRules: [
      {
        title: "Use 1: Calling parent class constructor",
        explanation: "super(arguments); must be the first statement of the child constructor. If omitted, Java automatically inserts super();.",
        code: `class Person { String name; Person(String n) { name = n; } }
class Student extends Person {
    int roll;
    Student(String n, int r) { super(n); roll = r; }
}`,
        output: "Initializes parent fields during child creation",
      },
      {
        title: "Use 2: Calling parent's overridden method",
        explanation: "Allows child class to invoke superclass method implementation when it has been overridden.",
        code: `class A { void show() { System.out.println("A"); } }
class B extends A {
    void show() { super.show(); System.out.println("B"); }
}`,
        output: "A\nB",
      },
    ],
    examTip: "Mention the third use in one line: 'super.variable' accesses a parent variable hidden by a child variable of the same name.",
  },
  {
    id: "th-2",
    qNumber: 2,
    title: "Method Overriding and Three Rules",
    marks: 3,
    category: "polymorphism",
    definition: "When a subclass provides its own specific implementation of a method already defined in its superclass, with the exact same name, parameters, and return type (or covariant), it is called method overriding. It enables runtime polymorphism.",
    usesOrRules: [
      { title: "Rule 1: Signature & Return Type", explanation: "Method name and parameter list must be identical. Return type must be identical or a covariant subtype." },
      { title: "Rule 2: Visibility / Access Modifier", explanation: "The overriding method cannot have a more restrictive access modifier (e.g. public cannot become protected or default)." },
      { title: "Rule 3: Non-overridable Methods", explanation: "final, static, and private methods CANNOT be overridden." },
    ],
    examTip: "Always recommend writing @Override so the compiler alerts you if you accidentally make a typo in the method signature.",
  },
  {
    id: "th-3",
    qNumber: 3,
    title: "Method Overloading vs Method Overriding (Three Points)",
    marks: 3,
    category: "polymorphism",
    definition: "Comparison between static compile-time polymorphism (overloading) and dynamic runtime polymorphism (overriding).",
    usesOrRules: [],
    comparisonTable: {
      headers: ["Basis", "Method Overloading", "Method Overriding"],
      rows: [
        ["Meaning", "Same method name, different parameter lists", "Subclass redefines a parent's method with the same signature"],
        ["Location", "Within the same class (or inherited)", "Between superclass and subclass (inheritance required)"],
        ["Parameters", "Must be different (count, type, or order)", "Must be identical"],
        ["Polymorphism", "Compile-time (static binding)", "Runtime (dynamic binding)"],
        ["Access Restriction", "No restrictions", "Cannot reduce visibility (cannot make public into protected)"],
      ],
    },
    examTip: "Drawing a 3-column table guarantees full 3/3 marks in university evaluations.",
  },
  {
    id: "th-4",
    qNumber: 4,
    title: "The final Keyword with Variables, Methods, and Classes",
    marks: 3,
    category: "keywords",
    definition: "The final keyword provides immutability and prevents alteration across variables, methods, and classes.",
    usesOrRules: [
      { title: "With Variable", explanation: "Becomes a constant. Value can be assigned only once (e.g. final int MAX = 10;)." },
      { title: "With Method", explanation: "Cannot be overridden by any subclass (e.g. final void show() { })." },
      { title: "With Class", explanation: "Cannot be inherited; no class can extend it (e.g. final class A { }). Example: String class." },
    ],
    examTip: "Include the code snippet: final double PI = 3.14; PI = 3.15; // Error: cannot assign a value to final variable.",
  },
  {
    id: "th-5",
    qNumber: 5,
    title: "Interface and Three Differences Between Class and Interface",
    marks: 3,
    category: "interfaces",
    definition: "An interface is a reference type containing abstract method declarations and constants. It specifies WHAT a class must do, while implementing classes specify HOW. It achieves 100% abstraction and multiple inheritance of type.",
    usesOrRules: [],
    comparisonTable: {
      headers: ["Class", "Interface"],
      rows: [
        ["Can be instantiated with new", "Cannot be instantiated"],
        ["Can have constructors", "Cannot have constructors"],
        ["Can have instance variables", "Only public static final constants"],
        ["Extended with 'extends' (single parent)", "Implemented with 'implements' (multiple interfaces allowed)"],
        ["Methods can be concrete", "Methods are abstract by default (default/static since Java 8)"],
      ],
    },
    examTip: "Mention that interfaces support multiple inheritance: 'class Demo implements A, B'.",
  },
  {
    id: "th-6",
    qNumber: 6,
    title: "The this Keyword (Two Uses with Examples)",
    marks: 3,
    category: "keywords",
    definition: "this is a reference variable that refers to the current invoking object (the instance on which the method or constructor is currently executing).",
    usesOrRules: [
      {
        title: "Use 1: Shadowing instance variables",
        explanation: "Differentiates instance variables from method/constructor parameters sharing the same name.",
        code: `class Student {
    int id;
    Student(int id) { this.id = id; }
}`,
      },
      {
        title: "Use 2: Constructor chaining",
        explanation: "Calls another constructor in the same class to reuse initialization logic (must be first statement).",
        code: `class Box {
    int l, b;
    Box() { this(1, 1); }
    Box(int l, int b) { this.l = l; this.b = b; }
}`,
      },
    ],
    examTip: "Add one line: 'this can also be used to return the current object from a method: return this;'.",
  },
  {
    id: "th-7",
    qNumber: 7,
    title: "Static Variable & Method; Why Static Methods Cannot Access Non-Static Members",
    marks: 3,
    category: "static",
    definition: "Static members belong to the class itself rather than instances. A static variable is loaded once with the class. A static method can be called as ClassName.method() without an object.",
    usesOrRules: [
      {
        title: "Why static cannot access non-static directly",
        explanation: "Static methods load with the class and can execute before any object instance exists on the heap. Non-static members belong to individual objects. Without an object, there is no memory copy and no 'this' pointer, so the compiler rejects direct access.",
      },
    ],
    examTip: "Show code: static void show() { System.out.println(i); // ERROR: non-static variable i cannot be referenced from static context }.",
  },
  {
    id: "th-8",
    qNumber: 8,
    title: "The finalize() Method",
    marks: 3,
    category: "memory",
    definition: "finalize() is a protected method defined in java.lang.Object designed to perform cleanup operations (e.g. closing sockets/files) before an object is reclaimed by the Garbage Collector.",
    usesOrRules: [
      { title: "Signature", explanation: "protected void finalize() throws Throwable" },
      { title: "Invocation", explanation: "Invoked automatically by the JVM Garbage Collector when no references to the object remain." },
      { title: "Why Discouraged & Deprecated", explanation: "Timing of GC execution is unpredictable (no guarantee if or when it runs). Deprecated since Java 9 in favor of try-with-resources and AutoCloseable." },
    ],
    examTip: "Emphasize: System.gc() is merely a request to the JVM, not a guarantee that garbage collection will run immediately.",
  },
  {
    id: "th-9",
    qNumber: 9,
    title: "Static Nested Class vs Inner (Non-Static) Class",
    marks: 3,
    category: "classes",
    definition: "Comparison between static nested classes and member inner classes.",
    usesOrRules: [],
    comparisonTable: {
      headers: ["Static Nested Class", "Inner (Non-Static) Class"],
      rows: [
        ["Declared with 'static' keyword", "Declared without 'static' keyword"],
        ["Instantiated without Outer object: 'new Outer.Nested()'", "Requires an enclosing Outer object: 'outer.new Inner()'"],
        ["Can access only static members of Outer", "Can access all Outer members, including private ones"],
        ["Not bound to any specific outer instance", "Bound to the specific outer instance that created it"],
      ],
    },
    examTip: "Writing the instantiation syntax for both guarantees full marks.",
  },
  {
    id: "th-10",
    qNumber: 10,
    title: "Anonymous Inner Class & Two Situations of Use",
    marks: 3,
    category: "classes",
    definition: "An anonymous inner class is a class without a name, declared and instantiated simultaneously in a single expression.",
    usesOrRules: [
      { title: "Situation 1: One-time interface implementation", explanation: "Used when passing short event listeners or task implementations (e.g. Runnable, ActionListener, Comparator) where creating a separate named file is unnecessary." },
      { title: "Situation 2: On-the-fly method overriding", explanation: "Used to override a single method of an existing class or abstract class on the spot." },
    ],
    examTip: "Syntax example: Runnable r = new Runnable() { public void run() { System.out.println(\"Running\"); } };",
  },
  {
    id: "th-11",
    qNumber: 11,
    title: "Recursion and the Role of the Base Case",
    marks: 3,
    category: "recursion",
    definition: "Recursion is a programming technique where a method calls itself with smaller inputs to solve a problem.",
    usesOrRules: [
      { title: "Base Case", explanation: "The terminating condition that returns an immediate answer without making another recursive call." },
      { title: "Recursive Case", explanation: "The part of the method that reduces the problem size and calls itself." },
      { title: "Without Base Case", explanation: "Stack frames accumulate continuously until JVM stack memory is exhausted, throwing StackOverflowError." },
    ],
    examTip: "Provide a quick snippet: static int sum(int n) { if (n == 0) return 0; return n + sum(n - 1); }.",
  },
  {
    id: "th-12",
    qNumber: 12,
    title: "Constructor Overloading and Constructor Chaining with this()",
    marks: 3,
    category: "constructors",
    definition: "Constructor overloading allows multiple constructors with different parameters. Constructor chaining with this() lets one constructor invoke another in the same class.",
    usesOrRules: [
      { title: "Constructor Overloading", explanation: "Enables creating objects with different sets of initial data (e.g. Student(), Student(name), Student(name, age))." },
      { title: "Constructor Chaining with this()", explanation: "Avoids redundant code by funneling initialization into the master constructor. Must be the first statement." },
    ],
    examTip: "Show Student() chaining to Student(name) chaining to Student(name, age).",
  },
  {
    id: "th-13",
    qNumber: 13,
    title: "The Four Access Specifiers (One Line Each)",
    marks: 3,
    category: "classes",
    definition: "Summary of visibility rules in Java.",
    usesOrRules: [],
    comparisonTable: {
      headers: ["Specifier", "Visibility"],
      rows: [
        ["private", "Visible only inside the same class."],
        ["default (no keyword)", "Visible to all classes in the same package."],
        ["protected", "Visible in the same package and to subclasses in other packages."],
        ["public", "Visible to every class in every package."],
      ],
    },
    examTip: "Always write the order of restriction: private < default < protected < public.",
  },
  {
    id: "th-14",
    qNumber: 14,
    title: "The instanceof Operator and Safe Type Casting",
    marks: 3,
    category: "keywords",
    definition: "instanceof is a comparison operator that tests whether an object reference is an instance of a specified class, subclass, or interface. It returns true or false.",
    usesOrRules: [
      {
        title: "Safe Downcasting",
        explanation: "Prevents runtime ClassCastException by verifying the underlying object type before downcasting.",
        code: `Animal a = new Dog();
if (a instanceof Dog) {
    Dog d = (Dog) a; // safe downcast
    d.bark();
}`,
      },
    ],
    examTip: "If you downcast without instanceof (e.g. Dog d = (Dog) new Cat()), Java throws ClassCastException at runtime.",
  },
  {
    id: "th-15",
    qNumber: 15,
    title: "Abstract Class vs Interface (Three Points)",
    marks: 3,
    category: "interfaces",
    definition: "Concise 3-point contrast between abstract classes and interfaces.",
    usesOrRules: [],
    comparisonTable: {
      headers: ["Abstract Class", "Interface"],
      rows: [
        ["Can have both abstract and concrete methods", "Has abstract methods (default/static allowed since Java 8)"],
        ["A class can extend only one abstract class", "A class can implement many interfaces"],
        ["Can have constructors and instance variables", "No constructors; variables are only public static final"],
      ],
    },
    examTip: "Keywords: abstract class uses 'extends', interface uses 'implements'.",
  },
  {
    id: "th-16",
    qNumber: 16,
    title: "Passing Objects to and Returning Objects from Methods",
    marks: 3,
    category: "classes",
    definition: "How object references behave as method parameters and return values.",
    usesOrRules: [
      { title: "Passing Objects", explanation: "A copy of the reference is passed. The method works on the same underlying object in heap memory, so modifications to object fields persist after the method returns." },
      { title: "Returning Objects", explanation: "A method can allocate a new object on heap and return its reference to the caller by specifying the class name as the return type." },
    ],
    examTip: "Give example: static void increase(Counter c) { c.value += 10; } modifies caller's object directly.",
  },
  {
    id: "th-17",
    qNumber: 17,
    title: "Object vs Object Reference, and the Role of new",
    marks: 3,
    category: "memory",
    definition: "Comparison between stack-allocated references and heap-allocated objects.",
    usesOrRules: [],
    comparisonTable: {
      headers: ["Object", "Object Reference"],
      rows: [
        ["Actual instance stored in heap memory holding data", "Variable stored on stack holding the memory address of an object"],
        ["Created by the 'new' operator", "Declared like 'Student s;'"],
        ["Exists independently of variable name", "Can be null, reassigned, or multiple references can point to one object"],
      ],
    },
    examTip: "Role of new: (1) Allocates heap memory, (2) Calls constructor to initialize fields, (3) Returns memory address.",
  },
  {
    id: "th-18",
    qNumber: 18,
    title: "Multilevel Inheritance with a Diagram",
    marks: 3,
    category: "inheritance",
    definition: "In multilevel inheritance, a class is derived from another derived class, forming a chain: Grandparent -> Parent -> Child. The child inherits all non-private members of all ancestors.",
    diagram: `[Person (name)]
      ^
      | extends
[Employee (empId)]
      ^
      | extends
[Manager (department)]`,
    usesOrRules: [
      {
        title: "Key Characteristics",
        explanation: "Constructors execute top-down: Person -> Employee -> Manager. The child Manager has access to name, empId, and department.",
      },
    ],
    examTip: "Draw the 3-box vertical arrow diagram for immediate visual credit.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// PART D: EXAM STRATEGY, COMMON MISTAKES & MCQS
// ─────────────────────────────────────────────────────────────────────────────
export const EXAM_WRITING_FORMATS = [
  {
    type: "5-Mark Program",
    format: "1-line concept definition (1 mark) + Full program with comments (2.5 marks) + Exact output (1 mark) + 2-3 lines explanation (0.5 mark).",
  },
  {
    type: "3-Mark Theory",
    format: "Clear definition (1 mark) + 2-3 bullet points or table (1 mark) + Small code snippet or diagram (1 mark).",
  },
  {
    type: "Predict the Output",
    format: "Write the output exactly line-by-line. Optionally add a 1-line reason or state trace beside each line.",
  },
  {
    type: "Differences Question",
    format: "Always draw a 3-column table (Basis, Concept A, Concept B) with at least 3 distinct rows.",
  },
];

export const COMMON_MISTAKES = [
  "Forgetting 'public' when implementing interface methods (interface methods are public abstract; omitting public assigns weaker default package access).",
  "Writing this() or super() after another statement (must strictly be the FIRST line in the constructor body).",
  "Attempting to override final, static, or private methods.",
  "Trying to instantiate an abstract class or interface using 'new AbstractClass()' (only allowed via anonymous subclass).",
  "Accessing a non-static member from static methods or main() without an object instance.",
  "Omitting program output in answer sheets (loses 1 full mark automatically).",
];

export const MCQ_REVISION_TABLE: McqRevisionItem[] = [
  { topic: "static", remember: "One shared copy per class; belongs to class, not individual objects." },
  { topic: "final", remember: "Variable = constant; method = cannot override; class = cannot inherit." },
  { topic: "Access order", remember: "private < default < protected < public (from most restrictive to least)." },
  { topic: "Overloading", remember: "Compile-time polymorphism; same method name, different parameter lists." },
  { topic: "Overriding", remember: "Runtime polymorphism; same method signature in subclass." },
  { topic: "Interface", remember: "Methods public abstract; variables public static final; no constructors." },
  { topic: "Abstract class", remember: "Cannot be instantiated; can have constructors and concrete methods." },
  { topic: "instanceof", remember: "Returns boolean; prevents ClassCastException before downcasting." },
  { topic: "finalize()", remember: "Called by Garbage Collector before destroying object; deprecated since Java 9." },
  { topic: "this()", remember: "Calls another constructor in the same class; must be first statement." },
  { topic: "super()", remember: "Calls parent constructor; must be first statement; implicit if not written." },
  { topic: "Inner object", remember: "outer.new Inner() (requires enclosing instance)." },
  { topic: "Static nested object", remember: "new Outer.Nested() (no enclosing instance needed)." },
  { topic: "Constructor order", remember: "Called bottom-up, but executes and prints parent first, then child." },
  { topic: "Multiple inheritance", remember: "Not allowed with classes; achieved via interfaces." },
  { topic: "Default constructor", remember: "Provided by Java compiler ONLY if no constructor is written." },
  { topic: "Overloading by return type", remember: "Not possible in Java (causes compile error)." },
];

export const QUICK_MCQS: QuickMcq[] = [
  { question: "Which keyword prevents inheritance of a class?", answer: "final", explanation: "A final class cannot be extended (e.g. java.lang.String)." },
  { question: "Which method is called by the garbage collector before reclaiming an object?", answer: "finalize()", explanation: "Declared in java.lang.Object; deprecated in Java 9." },
  { question: "Which operator checks the runtime type of an object?", answer: "instanceof", explanation: "Returns true if the object is an instance of the class/interface." },
  { question: "Which keyword refers to the current invoking object?", answer: "this", explanation: "Used to avoid shadowing and chain constructors." },
  { question: "Which keyword refers to the immediate parent class?", answer: "super", explanation: "Used to call superclass constructor or superclass overridden methods." },
  { question: "What is the ultimate parent class of all classes in Java?", answer: "java.lang.Object", explanation: "Every class in Java directly or indirectly inherits from Object." },
  { question: "Can an abstract class have a constructor?", answer: "Yes", explanation: "Abstract classes can have constructors, called by subclasses via super()." },
  { question: "Can an interface have a constructor?", answer: "No", explanation: "Interfaces cannot maintain state and cannot be instantiated." },
  { question: "Can a static method be overridden?", answer: "No", explanation: "Static methods are resolved at compile-time; they can be hidden (method hiding), not overridden." },
  { question: "Can a Java class implement multiple interfaces?", answer: "Yes", explanation: "Java supports multiple inheritance of type via interfaces (implements A, B)." },
];
