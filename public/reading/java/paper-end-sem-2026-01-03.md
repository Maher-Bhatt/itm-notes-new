> **Object Oriented Programming using Java (C2311C1) · End-semester regular examination, Winter 2025 · 3 January 2026 (Saturday) · 100 marks · 10:10 am – 1:10 pm**
> ITM SLS Baroda University · SOCSET · B.Tech Semester III. Question 1 is compulsory; Q2–Q5: any four of six (5 marks each).
> Questions transcribed from the original paper. Solutions are written by CampusLoop; check them against your class notes. Every program on this page was compiled and run on JDK 26.

# Q1. Multiple choice questions [20]

**1. Which of the following is not a feature of Java?** a) Platform independent · b) Object oriented · c) Pointer-based · d) Robust
**Answer: (c) Pointer-based.** Java has references, not pointer arithmetic.

**2. Which stream is used for reading characters?** a) FileInputStream · b) FileReader · c) ByteArrayStream · d) DataStream
**Answer: (b) FileReader** (a character stream; FileInputStream reads bytes).

**3. Which keyword prevents inheritance?** a) static · b) super · c) final · d) this
**Answer: (c) final.**

**4. Which method starts a thread?** a) run() · b) begin() · c) start() · d) execute()
**Answer: (c) start()**, which creates the new thread and then calls run() on it.

**5. Interfaces contain:** a) Only concrete methods · b) Only variables · c) Only abstract methods · d) Abstract + static methods
**Answer: (d).** Since Java 8 an interface can have abstract, default and static methods (and constants).

**6. Which block always executes (even if an exception occurs)?** a) try · b) catch · c) throw · d) finally
**Answer: (d) finally.**

**7. Dynamic method dispatch works using:** a) Compile-time binding · b) Run-time binding · c) Static binding · d) Overloading
**Answer: (b) Run-time binding.**

**8. Constructor name must be same as:** a) File name · b) Class name · c) Method name · d) None
**Answer: (b) Class name.**

**9. Arrays in Java are:** a) Objects · b) Functions · c) Primitive types · d) None
**Answer: (a) Objects** (created with `new`, have a `length` field).

**10. Which keyword is used to call the current object?** a) super · b) this · c) new · d) call
**Answer: (b) this.**

**11. Which JavaFX control is used for multiple-line text input?** a) TextField · b) TextArea · c) Label · d) Slider
**Answer: (b) TextArea.**

**12. String objects are:** a) Mutable · b) Immutable · c) Both · d) None
**Answer: (b) Immutable.**

**13. Which class creates mutable strings?** a) String · b) StringBuffer · c) StringToken · d) Buffer
**Answer: (b) StringBuffer** (StringBuilder too).

**14. Bytecode is executed by:** a) JVM · b) JRE · c) JDK · d) Compiler
**Answer: (a) JVM.**

**15. Which statement is true about Java?** a) supports multi-level inheritance · b) supports multiple inheritance · c) does not support inheritance · d) does not support hierarchical inheritance
**Answer: (a).** Multiple inheritance of classes is not allowed (only through interfaces).

**16. Which is NOT a Java primitive data type?** a) int · b) char · c) boolean · d) String
**Answer: (d) String** (a class).

**17. Which loop executes at least once?** a) for · b) while · c) do-while · d) for-each
**Answer: (c) do-while.**

**18. Which operator has the highest precedence?** a) + · b) * · c) = · d) &&
**Answer: (b) \*.**

**19. Wrapper class for char is:** a) Character · b) Char · c) CharWrapper · d) C
**Answer: (a) Character.**

**20. Which statements are not true in Java?** a) An object can be created for an interface · b) An object can be created for an abstract class · c) An object can be created for a class · d) A reference can be declared for an interface
**Answer: (a) and (b)** are not true. You cannot instantiate an interface or an abstract class (only an anonymous subclass of them); (c) and (d) are true.

# Q2. Answer any four (out of six) [20]

## Q2.1 Explain the use of wrapper classes with an example.

Every primitive type has a **wrapper class** in `java.lang` that stores the value inside an object:

| Primitive | Wrapper |
|---|---|
| byte, short, int, long | Byte, Short, **Integer**, Long |
| float, double | Float, Double |
| char | **Character** |
| boolean | Boolean |

Uses:
- **Collections and generics** work only with objects: `ArrayList<Integer>`, not `ArrayList<int>`.
- **Utility methods:** parsing and conversion, e.g. `Integer.parseInt("42")`, `Integer.toBinaryString(10)`, `Character.isDigit(c)`, `Double.valueOf("3.5")`.
- **Constants:** `Integer.MAX_VALUE`, `Integer.MIN_VALUE`.
- **null** can represent "no value" (e.g. a missing database field).
- **Autoboxing / unboxing:** the compiler converts automatically between the primitive and its wrapper.

```java
import java.util.ArrayList;

public class WrapperDemo {
    public static void main(String[] args) {
        int n = 25;
        Integer boxed = n;                 // autoboxing
        int back = boxed;                  // unboxing
        Integer parsed = Integer.parseInt("120");
        ArrayList<Integer> list = new ArrayList<>();
        list.add(back);
        list.add(parsed);                  // collections need objects
        System.out.println(list);                          // [25, 120]
        System.out.println(Integer.toBinaryString(10));    // 1010
        System.out.println(Character.isDigit('7'));        // true
        System.out.println(Integer.MAX_VALUE);             // 2147483647
    }
}
```

## Q2.2 What is an access modifier? Explain the access modifiers in Java.

An **access modifier** controls where a class, constructor, field or method can be used from. It enforces encapsulation (hide data, expose only what is needed).

| Modifier | Same class | Same package | Subclass (other package) | Anywhere |
|---|---|---|---|---|
| `private` | ✓ | ✗ | ✗ | ✗ |
| *default* (no keyword) | ✓ | ✓ | ✗ | ✗ |
| `protected` | ✓ | ✓ | ✓ (through inheritance) | ✗ |
| `public` | ✓ | ✓ | ✓ | ✓ |

```java
public class Account {
    private double balance;          // only inside Account
    String branch;                   // default: same package
    protected String holder;         // package + subclasses
    public void deposit(double amt) { balance += amt; }   // everywhere
}
```
A top-level class can only be `public` or default. Private members are reached from outside through public getters/setters.

## Q2.3 Need for exception handling; exception handling using try and catch.

An **exception** is an abnormal event at run time (divide by zero, missing file, bad index) that disrupts normal flow. Without handling, the JVM prints a stack trace and **terminates the program**. Exception handling:
- keeps the program running (graceful recovery or a clear message),
- separates error-handling code from normal logic,
- passes errors up the call stack to the method that can deal with them,
- lets resources be released (finally / try-with-resources).

`try` encloses code that may throw; `catch` handles a specific exception type; several catch blocks can follow one try (most specific first).

```java
public class TryCatchDemo {
    public static void main(String[] args) {
        int[] a = {10, 20, 30};
        try {
            int x = a[1] / 0;                    // ArithmeticException
            System.out.println(x);
        } catch (ArithmeticException e) {
            System.out.println("Cannot divide by zero: " + e.getMessage());
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Bad index");
        }
        System.out.println("Program continues");
    }
}
```
Output:
```
Cannot divide by zero: / by zero
Program continues
```

## Q2.4 Differentiate between JDK, JVM and JRE with a diagram.

```
┌──────────────────────── JDK ────────────────────────┐
│  javac, java, javadoc, jar, jdb (development tools)  │
│  ┌──────────────────── JRE ───────────────────────┐  │
│  │  class libraries (java.lang, java.util, …)      │  │
│  │  ┌────────────────── JVM ──────────────────┐    │  │
│  │  │ class loader · bytecode verifier ·       │    │  │
│  │  │ interpreter + JIT compiler · GC          │    │  │
│  │  └─────────────────────────────────────────┘    │  │
│  └─────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────┘
```

| | JDK | JRE | JVM |
|---|---|---|---|
| Full form | Java Development Kit | Java Runtime Environment | Java Virtual Machine |
| Purpose | **develop** and run programs | **run** programs | **execute bytecode** |
| Contains | JRE + compiler (`javac`), debugger, tools | JVM + standard class libraries | class loader, verifier, interpreter/JIT, garbage collector |
| Who needs it | developers | end users | part of the JRE |
| Platform | platform-specific | platform-specific | platform-specific (that is what makes bytecode portable) |

Flow: `Hello.java` → **javac** (JDK) → `Hello.class` (bytecode) → **JVM** (inside JRE) → machine code.

## Q2.5 Explain the concept of object reference in Java.

A **reference variable** holds the **address (reference) of an object on the heap**, not the object itself. `Student s = new Student();` creates the object on the heap; `s` (on the stack) refers to it.
- **Several references can point to one object:** `Student t = s;` copies the reference, not the object, so a change through `t` is seen through `s`.
- A reference can be **null** (refers to nothing); using it throws `NullPointerException`.
- An object with **no remaining references** becomes eligible for garbage collection.
- `==` compares references (same object?); `equals()` compares contents (if overridden).
- Java passes the **reference by value** to methods: the method can change the object's fields, but reassigning the parameter does not affect the caller's variable.

```java
class Box { int size; }

public class RefDemo {
    static void grow(Box b)  { b.size = 50; }        // changes the shared object
    static void swap(Box b)  { b = new Box(); b.size = 99; } // only the local copy changes
    public static void main(String[] args) {
        Box a = new Box();
        a.size = 10;
        Box c = a;                 // same object
        c.size = 20;
        System.out.println(a.size);   // 20
        grow(a);
        System.out.println(a.size);   // 50
        swap(a);
        System.out.println(a.size);   // 50
        System.out.println(a == c);   // true
    }
}
```

## Q2.6 Differentiate between abstract class and interface with Java code.

| Abstract class | Interface |
|---|---|
| declared with `abstract class` | declared with `interface` |
| can have abstract **and** concrete methods | abstract methods; since Java 8 also `default` and `static`, since 9 `private` |
| can have instance variables of any kind | only `public static final` constants |
| can have constructors | no constructors |
| members can be private/protected/public | methods are public by default |
| a class `extends` only **one** abstract class | a class can `implement` **many** interfaces (multiple inheritance of type) |
| use for closely related classes sharing state/code | use for a capability/contract shared by unrelated classes |

```java
abstract class Shape {
    String name;
    Shape(String name) { this.name = name; }
    abstract double area();                       // abstract
    void show() { System.out.println(name + " area = " + area()); } // concrete
}

interface Drawable {
    void draw();                                  // implicitly public abstract
    default void info() { System.out.println("Drawable object"); }
}

class Circle extends Shape implements Drawable {
    double r;
    Circle(double r) { super("Circle"); this.r = r; }
    double area() { return Math.PI * r * r; }
    public void draw() { System.out.println("Drawing a circle"); }
}

public class AbstractVsInterface {
    public static void main(String[] args) {
        Circle c = new Circle(2);
        c.show();      // Circle area = 12.566370614359172
        c.draw();      // Drawing a circle
        c.info();      // Drawable object
    }
}
```

# Q3. Answer any four (out of six) [20]

## Q3.1 What is an inner class? Explain static inner class with example.

An **inner (nested) class** is a class declared inside another class. It groups classes used in one place, increases encapsulation and can access the outer class's members. Kinds: **static nested class**, **non-static inner class**, **local class** (inside a method) and **anonymous class**.

A **static nested class** is declared with `static`:
- it does **not** need an outer object: `Outer.Nested n = new Outer.Nested();`
- it can access only the **static** members of the outer class directly (including private static ones).

```java
class University {
    private static String name = "ITM SLS Baroda";
    private String dean = "Dr. X";               // instance member

    static class Department {                    // static nested class
        String dept;
        Department(String dept) { this.dept = dept; }
        void show() {
            System.out.println(dept + " belongs to " + name);  // static member OK
            // System.out.println(dean);  // error: needs a University object
        }
    }
}

public class StaticNestedDemo {
    public static void main(String[] args) {
        University.Department d = new University.Department("CSE");
        d.show();      // CSE belongs to ITM SLS Baroda
    }
}
```

## Q3.2 Explain any 5 array methods with example.

The `java.util.Arrays` class provides static helper methods:

| Method | Use |
|---|---|
| `Arrays.toString(a)` | string form `[…]` for printing |
| `Arrays.sort(a)` | sort ascending (dual-pivot quicksort for primitives) |
| `Arrays.binarySearch(a, key)` | index of key in a **sorted** array (negative if absent) |
| `Arrays.fill(a, v)` | set every element to v |
| `Arrays.copyOf(a, n)` / `copyOfRange(a, i, j)` | copy (with new length / a range) |
| `Arrays.equals(a, b)` | compare contents element by element |
| `a.length` (field) | number of elements |

```java
import java.util.Arrays;

public class ArrayMethods {
    public static void main(String[] args) {
        int[] a = {42, 7, 19, 3, 25};
        Arrays.sort(a);
        System.out.println(Arrays.toString(a));             // [3, 7, 19, 25, 42]
        System.out.println(Arrays.binarySearch(a, 19));     // 2
        int[] b = Arrays.copyOf(a, 7);
        System.out.println(Arrays.toString(b));             // [3, 7, 19, 25, 42, 0, 0]
        int[] c = new int[4];
        Arrays.fill(c, 9);
        System.out.println(Arrays.toString(c));             // [9, 9, 9, 9]
        System.out.println(Arrays.equals(a, Arrays.copyOf(b, 5)));  // true
        System.out.println(a.length);                       // 5
    }
}
```

## Q3.3 Explain the this, super and final keywords with examples.

**this** refers to the **current object**:
- distinguish fields from parameters with the same name: `this.name = name;`
- call another constructor of the same class: `this(0, "NA");` (must be the first statement)
- pass or return the current object: `return this;`

**super** refers to the **parent class** part of the object:
- call the parent constructor: `super(name);` (first statement in the child constructor)
- call an overridden parent method: `super.display();`
- access a hidden parent field: `super.x`

**final** means "cannot change":
- **final variable:** a constant, assigned once: `final double PI = 3.14159;`
- **final method:** cannot be overridden.
- **final class:** cannot be extended (e.g. `String`).

```java
class Person {
    String name;
    Person(String name) { this.name = name; }        // this: field vs parameter
    void display() { System.out.println("Name: " + name); }
    final void id() { System.out.println("Person ID"); } // cannot be overridden
}

final class Student extends Person {                 // cannot be extended
    final int roll;                                  // assigned once
    Student(String name, int roll) {
        super(name);                                 // super: parent constructor
        this.roll = roll;
    }
    Student() { this("Unknown", 0); }                // this(): constructor chaining
    @Override
    void display() {
        super.display();                             // super: parent method
        System.out.println("Roll: " + roll);
    }
}

public class KeywordsDemo {
    public static void main(String[] args) {
        new Student("Asha", 7).display();
        new Student().display();
    }
}
```
Output:
```
Name: Asha
Roll: 7
Name: Unknown
Roll: 0
```

## Q3.4 What is a package, and which packages are predefined in Java?

A **package** is a namespace that groups related classes and interfaces (like a folder). Benefits: avoids **name clashes** (two `Date` classes in `java.util` and `java.sql`), **access control** (default/protected access works per package), organisation and reuse.

Creating and using one:
```
// file: com/campus/util/MathUtil.java
package com.campus.util;
public class MathUtil { public static int square(int x) { return x * x; } }

// another file
import com.campus.util.MathUtil;
... MathUtil.square(5) ...
```

**Predefined (built-in) packages:**

| Package | Contents |
|---|---|
| `java.lang` | String, Math, System, wrapper classes, Thread, Exception (imported automatically) |
| `java.util` | Scanner, ArrayList, HashMap, Arrays, Collections, Random, Date |
| `java.io` | File, FileReader, FileWriter, BufferedReader, streams |
| `java.net` | URL, Socket, networking |
| `java.sql` | JDBC: Connection, Statement, ResultSet |
| `java.time` | LocalDate, LocalTime, Duration |
| `javafx.*` | JavaFX GUI: scene, controls, stage (separate module) |
| `java.awt`, `javax.swing` | older GUI toolkits |

## Q3.5 Differentiate between throw and throws with a proper example.

| throw | throws |
|---|---|
| used **inside a method body** | used in the **method signature** |
| actually **throws one exception object** | **declares** exceptions the method may throw |
| followed by an instance: `throw new X("msg");` | followed by class names: `throws IOException, SQLException` |
| can throw only one exception at a time | can list several |
| used for checked and unchecked exceptions | mainly needed for **checked** exceptions |

```java
public class ThrowThrowsDemo {
    // 'throws' declares that the caller must handle the checked exception
    static void checkAge(int age) throws Exception {
        if (age < 18)
            throw new Exception("Age " + age + " is below 18");   // 'throw' raises it
        System.out.println("Eligible");
    }
    public static void main(String[] args) {
        try {
            checkAge(20);
            checkAge(15);
        } catch (Exception e) {
            System.out.println("Caught: " + e.getMessage());
        }
    }
}
```
Output:
```
Eligible
Caught: Age 15 is below 18
```

## Q3.6 Explain the thread life cycle and daemon threads.

**Life cycle** (states of `Thread.State`):
1. **New:** object created with `new Thread(...)`, not yet started.
2. **Runnable:** after `start()`; ready to run or running (scheduler decides).
3. **Blocked:** waiting to acquire a monitor lock (entering a synchronized block).
4. **Waiting:** waiting indefinitely: `wait()`, `join()`.
5. **Timed waiting:** waiting for a time: `sleep(ms)`, `wait(ms)`, `join(ms)`.
6. **Terminated (dead):** `run()` finished or an uncaught exception.

```
New ──start()──► Runnable ◄──────────── notify()/time over/lock acquired
                   │   ▲                        │
         run() ends│   └── Blocked / Waiting / Timed waiting
                   ▼
              Terminated
```

**Daemon thread:** a low-priority background service thread (e.g. garbage collector). The JVM **exits when only daemon threads remain**; it does not wait for them. Set with `setDaemon(true)` **before** `start()`; check with `isDaemon()`.

```java
public class DaemonDemo {
    public static void main(String[] args) throws InterruptedException {
        Thread bg = new Thread(() -> {
            while (true) {
                System.out.println("autosave...");
                try { Thread.sleep(300); } catch (InterruptedException e) { return; }
            }
        });
        bg.setDaemon(true);          // background thread
        bg.start();
        System.out.println("Daemon? " + bg.isDaemon());
        Thread.sleep(700);           // main works for a while
        System.out.println("main ends; JVM exits and the daemon is stopped");
    }
}
```

# Q4. Answer any four (out of six) [20]

## Q4.1 Explain any five StringBuffer methods with examples.

`StringBuffer` is a **mutable, thread-safe** (synchronized) sequence of characters; changes happen in place without creating new objects.

| Method | Effect |
|---|---|
| `append(x)` | add at the end |
| `insert(i, x)` | insert at index i |
| `replace(start, end, s)` | replace characters [start, end) |
| `delete(start, end)` / `deleteCharAt(i)` | remove characters |
| `reverse()` | reverse the contents |
| `length()` / `capacity()` | characters used / storage allocated (default 16, grows as (old × 2) + 2) |
| `charAt(i)` / `setCharAt(i, c)` | read / change one character |

```java
public class BufferDemo {
    public static void main(String[] args) {
        StringBuffer sb = new StringBuffer("Java");
        sb.append(" Programming");          System.out.println(sb); // Java Programming
        sb.insert(5, "OOP ");               System.out.println(sb); // Java OOP Programming
        sb.replace(0, 4, "Core");           System.out.println(sb); // Core OOP Programming
        sb.delete(4, 8);                    System.out.println(sb); // Core Programming
        sb.reverse();                       System.out.println(sb); // gnimmargorP eroC
        System.out.println(sb.length() + " " + sb.capacity());     // 16 20
    }
}
```
(Capacity is 20 because `new StringBuffer("Java")` allocates 16 + 4.)

## Q4.2 Can we overload the main method? How is the overloaded main accessed?

**Yes.** `main` is an ordinary static method, so it can be overloaded with different parameter lists. But the **JVM always starts the program from `public static void main(String[] args)`**. Any other `main` runs only if you **call it explicitly**, like any other method.

```java
public class MainOverload {
    public static void main(String[] args) {
        System.out.println("main(String[]) - entry point");
        main(5);                 // call the overloaded versions explicitly
        main("CampusLoop", 2);
    }
    public static void main(int x) {
        System.out.println("main(int): " + x);
    }
    public static void main(String s, int times) {
        for (int i = 0; i < times; i++) System.out.println("main(String, int): " + s);
    }
}
```
Output:
```
main(String[]) - entry point
main(int): 5
main(String, int): CampusLoop
main(String, int): CampusLoop
```

## Q4.3 Explain dynamic method dispatch with an example.

**Dynamic method dispatch** is how Java resolves a call to an **overridden method at run time**, based on the **actual object** the reference points to, not the reference type. It is the basis of **run-time polymorphism**: a superclass reference can hold a subclass object (upcasting), and the subclass's version runs.

```java
class Shape  { void draw() { System.out.println("Drawing a shape"); } }
class Circle extends Shape { void draw() { System.out.println("Drawing a circle"); } }
class Square extends Shape { void draw() { System.out.println("Drawing a square"); } }

public class DispatchDemo {
    public static void main(String[] args) {
        Shape s;                 // superclass reference
        s = new Shape();  s.draw();
        s = new Circle(); s.draw();   // Circle's draw chosen at run time
        s = new Square(); s.draw();
        Shape[] all = { new Circle(), new Square() };
        for (Shape x : all) x.draw();  // one loop, different behaviour
    }
}
```
Output:
```
Drawing a shape
Drawing a circle
Drawing a square
Drawing a circle
Drawing a square
```
Only overridden instance methods are dispatched dynamically; fields, static and private methods are bound at compile time.

## Q4.4 Why do we need encapsulation? Explain with an example.

**Encapsulation** = wrapping data (fields) and the methods that work on it into one unit (class), and **hiding the data** by making fields `private`, exposing controlled access through public getters/setters.

Why:
- **Data protection / validation:** invalid values (negative balance, age 500) can be rejected in setters.
- **Control:** fields can be read-only (getter only) or write-only.
- **Flexibility / maintainability:** the internal representation can change without changing the code that uses the class.
- **Reduced coupling** and easier testing.

```java
class BankAccount {
    private double balance;                       // hidden
    private final String owner;
    BankAccount(String owner) { this.owner = owner; }
    public double getBalance() { return balance; } // read access
    public void deposit(double amt) {
        if (amt <= 0) { System.out.println("Invalid amount"); return; }
        balance += amt;
    }
    public void withdraw(double amt) {
        if (amt > balance) { System.out.println("Insufficient balance"); return; }
        balance -= amt;
    }
}

public class EncapsulationDemo {
    public static void main(String[] args) {
        BankAccount acc = new BankAccount("Riya");
        acc.deposit(1000);
        acc.deposit(-50);          // rejected
        acc.withdraw(5000);        // rejected
        acc.withdraw(300);
        // acc.balance = 1_000_000;   // compile error: balance is private
        System.out.println(acc.getBalance());   // 700.0
    }
}
```

## Q4.5 Explain exception handling using try, catch and finally with an example.

- **try:** code that may throw an exception.
- **catch:** handles a matching exception type (several catches allowed, most specific first).
- **finally:** **always** runs, whether an exception occurred, was caught or not, or the try returned. Used for clean-up (close files, connections).

```java
public class FinallyDemo {
    static int divide(int a, int b) {
        try {
            return a / b;
        } catch (ArithmeticException e) {
            System.out.println("Error: " + e.getMessage());
            return -1;
        } finally {
            System.out.println("finally runs for " + a + "/" + b);
        }
    }
    public static void main(String[] args) {
        System.out.println(divide(10, 2));
        System.out.println(divide(10, 0));
    }
}
```
Output:
```
finally runs for 10/2
5
Error: / by zero
finally runs for 10/0
-1
```

## Q4.6 (a) Command-line integers: sum, difference, product, quotient. (b) Three integers in decreasing order.

**(a)** Command-line arguments arrive as `String[] args` and must be parsed.
```java
public class CmdCalc {
    public static void main(String[] args) {
        if (args.length < 2) {
            System.out.println("Usage: java CmdCalc <a> <b>");
            return;
        }
        int a = Integer.parseInt(args[0]);
        int b = Integer.parseInt(args[1]);
        System.out.println("Sum        = " + (a + b));
        System.out.println("Difference = " + (a - b));
        System.out.println("Product    = " + (a * b));
        if (b != 0) System.out.println("Quotient   = " + ((double) a / b));
        else        System.out.println("Quotient   = undefined (division by zero)");
    }
}
```
Run `java CmdCalc 20 8` → Sum = 28, Difference = 12, Product = 160, Quotient = 2.5.

**(b)**
```java
import java.util.Scanner;

public class DescendingThree {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter three integers: ");
        int a = sc.nextInt(), b = sc.nextInt(), c = sc.nextInt();
        int t;
        if (a < b) { t = a; a = b; b = t; }   // now a >= b
        if (a < c) { t = a; a = c; c = t; }   // now a is the largest
        if (b < c) { t = b; b = c; c = t; }   // now b >= c
        System.out.println("Decreasing order: " + a + " " + b + " " + c);
        sc.close();
    }
}
```
Input `4 19 11` → `Decreasing order: 19 11 4`.

# Q5. Answer any four (out of six) [20]

## Q5.1 Abstract class Employee, derived BTech_employee and inherit_app.

```java
abstract class Employee {
    static int last_emp_id = 0;
    int emp_id;
    String name;
    double gross_salary;

    Employee() {                                    // default constructor
        this("Unknown", 0);
    }
    Employee(String name, double gross_salary) {    // parameterized constructor
        this.emp_id = ++last_emp_id;                // auto-generated id
        this.name = name;
        this.gross_salary = gross_salary;
    }
    double calculate_net_salary() {                 // base version: no deduction
        return gross_salary;
    }
}

class BTech_employee extends Employee {
    double tax;
    BTech_employee() { super(); tax = 0; }
    BTech_employee(String name, double gross_salary, double tax) {
        super(name, gross_salary);
        this.tax = tax;
    }
    @Override
    double calculate_net_salary() {                 // net = gross - tax
        return gross_salary - tax;
    }
}

public class inherit_app {
    public static void main(String[] args) {
        BTech_employee[] staff = {
            new BTech_employee("Asha", 60000, 6000),
            new BTech_employee("Ravi", 45000, 3500),
            new BTech_employee("Meera", 80000, 9500)
        };
        for (BTech_employee e : staff)
            System.out.println(e.emp_id + " " + e.name + " net salary = " + e.calculate_net_salary());
        System.out.println("Employees created: " + Employee.last_emp_id);
    }
}
```
Output:
```
1 Asha net salary = 54000.0
2 Ravi net salary = 41500.0
3 Meera net salary = 70500.0
Employees created: 3
```
(The paper asks for calculate_net_salary() in the abstract class; it is given a body there so the default constructor works. You may instead declare it `abstract double calculate_net_salary();`.)

## Q5.2 Read a file using FileReader and display its content.

```java
import java.io.FileReader;
import java.io.IOException;

public class ReadFileDemo {
    public static void main(String[] args) {
        String path = args.length > 0 ? args[0] : "notes.txt";
        try (FileReader fr = new FileReader(path)) {     // closed automatically
            int ch;
            while ((ch = fr.read()) != -1)               // read() returns -1 at end of file
                System.out.print((char) ch);
        } catch (IOException e) {
            System.out.println("Could not read file: " + e.getMessage());
        }
    }
}
```
For line-by-line reading wrap it: `new BufferedReader(new FileReader(path))` and use `readLine()`.

## Q5.3 Demonstrate thread synchronization using a synchronized method or block.

Without synchronization, two threads doing `count++` (read–modify–write) lose updates. A **synchronized** method/block lets only one thread hold the object's lock at a time.

```java
class Counter {
    private int count = 0;
    synchronized void increment() { count++; }      // synchronized method
    int get() { return count; }
}

public class SyncDemo {
    public static void main(String[] args) throws InterruptedException {
        Counter c = new Counter();
        Runnable task = () -> {
            for (int i = 0; i < 10000; i++) c.increment();
        };
        Thread t1 = new Thread(task), t2 = new Thread(task);
        t1.start(); t2.start();
        t1.join();  t2.join();                      // wait for both
        System.out.println("Count = " + c.get());   // always 20000
    }
}
```
Synchronized **block** form, locking only the critical section:
```
void increment() {
    synchronized (this) { count++; }
}
```

## Q5.4 Explain JavaFX UI controls: Label, TextField, TextArea, ComboBox, ListView, Slider.

| Control | Purpose | Key methods |
|---|---|---|
| **Label** | displays non-editable text (or an image) | `new Label("Name:")`, `setText()` |
| **TextField** | single-line text input | `getText()`, `setPromptText("…")` |
| **TextArea** | multi-line text input | `setPrefRowCount(5)`, `setWrapText(true)`, `getText()` |
| **ComboBox** | drop-down list, pick one (optionally editable) | `getItems().addAll(…)`, `getValue()`, `setOnAction()` |
| **ListView** | scrollable list, single or multiple selection | `getItems()`, `getSelectionModel().getSelectedItem()` |
| **Slider** | choose a numeric value by dragging | `new Slider(0, 100, 50)`, `getValue()`, `valueProperty().addListener()` |

```
import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;

public class ControlsDemo extends Application {
    @Override
    public void start(Stage stage) {
        Label title = new Label("Student feedback");
        TextField name = new TextField();
        name.setPromptText("Your name");
        TextArea comments = new TextArea();
        comments.setPrefRowCount(3);
        ComboBox<String> branch = new ComboBox<>();
        branch.getItems().addAll("CSE", "IT", "AI", "CSN");
        ListView<String> subjects = new ListView<>();
        subjects.getItems().addAll("Java", "DBMS", "DSA", "COA");
        Slider rating = new Slider(1, 10, 5);
        rating.setShowTickLabels(true);
        Label out = new Label();
        rating.valueProperty().addListener((o, oldV, newV) ->
                out.setText("Rating: " + newV.intValue()));
        VBox root = new VBox(8, title, name, comments, branch, subjects, rating, out);
        stage.setScene(new Scene(root, 320, 420));
        stage.setTitle("JavaFX controls");
        stage.show();
    }
    public static void main(String[] args) { launch(args); }
}
```

## Q5.5 Read the code; fix any error and show the output.

**(1) Concatenation order**
```
System.out.println(10 + 20 + "Java");    // 30Java   (left to right: 10+20 = 30 first)
System.out.println("Java" + 10 + 20);    // Java1020 (String first, so + concatenates)
System.out.println("Java" + (10 + 20));  // Java30   (brackets evaluated first)
```

**(2) `==` vs `equals()`**
```
String s1 = "Hello";               // string pool
String s2 = new String("Hello");   // new heap object
System.out.println(s1 == s2);      // false (different objects)
System.out.println(s1.equals(s2)); // true  (same characters)
```

**(3) LoopTest:** `continue` skips even i, so count = 1 + 3 + 5 = **9**.

**(4) Overloading:** `t.display(5)` → `int: 5`; `t.display(5.5f)`: no `float` version, so the float **widens to double** → `double: 5.5`.

**(5) super_use:** the only error is the **missing semicolon** after `System.out.println(obj.i + " " + obj.j)`. `i` has default access, which is fine because all classes are in the same package. Corrected:
```java
class A {
    int i;
    public int j;
    A() { i = 1; j = 2; }
}
class B extends A {
    int a;
    B() { super(); }
}
class super_use {
    public static void main(String args[]) {
        B obj = new B();
        System.out.println(obj.i + " " + obj.j);   // semicolon added
    }
}
```
Output: **`1 2`** (B's constructor calls A's, which sets i = 1, j = 2).

(The two programs named `Test` must be in separate files, since a file can contain only one public class of a given name.)

## Q5.6 Vehicle class hierarchy: Truck, Car and Motorcycle.

```java
abstract class Vehicle {
    protected String make, model, fuelType;
    protected int year;
    Vehicle(String make, String model, int year, String fuelType) {
        this.make = make; this.model = model; this.year = year; this.fuelType = fuelType;
    }
    // km per litre for a given distance and fuel used
    double fuelEfficiency(double km, double litres) { return km / litres; }
    // distance = speed (km/h) x time (h)
    double distanceTravelled(double speed, double hours) { return speed * hours; }
    abstract int maxSpeed();                          // differs for each vehicle
    void show(double km, double litres) {
        System.out.printf("%s %s %s (%d, %s): %.1f km/l, max %d km/h%n",
                getClass().getSimpleName(), make, model, year, fuelType,
                fuelEfficiency(km, litres), maxSpeed());
    }
}

class Truck extends Vehicle {
    double loadTonnes;
    Truck(String make, String model, int year, String fuel, double load) {
        super(make, model, year, fuel); loadTonnes = load;
    }
    int maxSpeed() { return loadTonnes > 10 ? 80 : 100; }
}

class Car extends Vehicle {
    int seats;
    Car(String make, String model, int year, String fuel, int seats) {
        super(make, model, year, fuel); this.seats = seats;
    }
    int maxSpeed() { return 180; }
}

class Motorcycle extends Vehicle {
    int cc;
    Motorcycle(String make, String model, int year, String fuel, int cc) {
        super(make, model, year, fuel); this.cc = cc;
    }
    int maxSpeed() { return cc >= 350 ? 140 : 110; }
}

public class VehicleApp {
    public static void main(String[] args) {
        Vehicle[] fleet = {
            new Truck("Tata", "Signa", 2022, "Diesel", 16),
            new Car("Maruti", "Swift", 2024, "Petrol", 5),
            new Motorcycle("Royal Enfield", "Classic", 2023, "Petrol", 350)
        };
        double[][] trips = { {400, 80}, {300, 15}, {200, 5} };   // km, litres
        for (int i = 0; i < fleet.length; i++)
            fleet[i].show(trips[i][0], trips[i][1]);
        System.out.println("Car covers " + fleet[1].distanceTravelled(60, 2.5) + " km in 2.5 h at 60 km/h");
    }
}
```
Output:
```
Truck Tata Signa (2022, Diesel): 5.0 km/l, max 80 km/h
Car Maruti Swift (2024, Petrol): 20.0 km/l, max 180 km/h
Motorcycle Royal Enfield Classic (2023, Petrol): 40.0 km/l, max 140 km/h
Car covers 150.0 km in 2.5 h at 60 km/h
```
