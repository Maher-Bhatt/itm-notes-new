> **Object Oriented Programming Language using Java (C2311C1) · Mid-semester term examination · 1 October 2026 · 60 marks · 2 hours (10:10 am – 12:10 pm)**
> ITM SLS Baroda University · B.Tech (CSE/IT/AI/CSN) · Semester III · Academic year 2026–27.
> All ten parts of Q1 are compulsory; Q2: any three of four (3 marks each); Q3: any four of five (5 marks each); Q4: any three of four (7 marks each).
> Questions transcribed from the original paper. Solutions are written by CampusLoop; check them against your class notes. Programs were compiled and run on JDK 26.

# Q1. Answer all (1 mark each) [10]

**1.1 Which of the following is NOT a feature of Java?** (a) Platform-independent · (b) Pointer arithmetic · (c) Robust · (d) Multithreaded
**Answer: (b) Pointer arithmetic.**

**1.2 A Java compiler converts source code into:** (a) Machine code · (b) Byte code · (c) Assembly code · (d) Object code
**Answer: (b) Byte code.**

**1.3 Which class represents a mutable sequence of characters?** (a) String · (b) StringBuffer · (c) Integer · (d) Character
**Answer: (b) StringBuffer.**

**1.4 The default value of an element in an uninitialized int array is:** (a) null · (b) 1 · (c) 0 · (d) Garbage value
**Answer: (c) 0.** Java arrays are always initialised (0, 0.0, false, '\u0000' or null).

**1.5 A static block in a Java class is executed:** (a) Every time an object is created · (b) Only once, when the class is loaded · (c) Only when main() calls it explicitly · (d) After the constructor runs
**Answer: (b).**

**1.6 Which keyword is used to allocate memory for a new object?** (a) class · (b) new · (c) this · (d) static
**Answer: (b) new.**

**1.7 Which statement about constructors is TRUE?** (a) A constructor has a return type of void · (b) A constructor has the same name as the class and no return type · (c) A constructor can be called using the dot operator · (d) A constructor cannot be overloaded
**Answer: (b).**

**1.8 Method overloading in Java is an example of:** (a) Run-time polymorphism · (b) Compile-time polymorphism · (c) Inheritance · (d) Encapsulation
**Answer: (b) Compile-time polymorphism.**

**1.9 Which access modifier restricts visibility to only within the same class?** (a) public · (b) protected · (c) private · (d) default
**Answer: (c) private.**

**1.10 When do local variables declared inside a method become eligible for garbage collection?** (a) As soon as the method is called · (b) When the method returns and no reference to them exists outside it · (c) Only when System.gc() is called · (d) They are never garbage collected
**Answer: (b).** (Strictly, local variables live on the stack and disappear when the method returns; the *objects* they referred to become eligible for GC if nothing else refers to them.)

# Q2. Attempt any three (3 marks each) [9]

## 2(a) What is bytecode? How does it enable platform independence?

**Bytecode** is the intermediate, platform-neutral instruction set produced by the Java compiler (`javac Hello.java` → `Hello.class`). It is not machine code for any real CPU; it is code for the **Java Virtual Machine**.

Platform independence ("**write once, run anywhere**"):
1. The same `.class` file is produced on any operating system.
2. Every platform has its own **JVM** (Windows, Linux, macOS, Android-style runtimes) that understands the same bytecode.
3. The JVM verifies the bytecode and executes it by **interpreting** it and compiling hot parts to native code with the **JIT compiler**.

So the program is portable; only the JVM is platform-specific. Bytecode verification also adds security.

## 2(b) What is constructor overloading? Illustrate with an example.

**Constructor overloading:** a class has **several constructors with different parameter lists** (number, type or order), so objects can be created in different ways. The compiler picks the one matching the arguments. `this(...)` lets one constructor reuse another.

```java
class Rectangle {
    int length, width;
    Rectangle() { this(1, 1); }                 // default: unit square
    Rectangle(int side) { this(side, side); }   // square
    Rectangle(int length, int width) {          // general
        this.length = length;
        this.width = width;
    }
    int area() { return length * width; }
}

public class ConstructorOverload {
    public static void main(String[] args) {
        System.out.println(new Rectangle().area());       // 1
        System.out.println(new Rectangle(5).area());      // 25
        System.out.println(new Rectangle(4, 6).area());   // 24
    }
}
```

## 2(c) while vs do-while; an example where the two loops run a different number of times.

| while | do-while |
|---|---|
| **entry-controlled**: condition tested **before** the body | **exit-controlled**: condition tested **after** the body |
| body may run **zero** times | body runs **at least once** |
| `while (cond) { … }` | `do { … } while (cond);` (note the semicolon) |

```java
public class LoopCompare {
    public static void main(String[] args) {
        int i = 10, w = 0, d = 0;
        while (i < 5) { w++; i++; }       // condition false at start: 0 runs
        i = 10;
        do { d++; i++; } while (i < 5);   // runs once before testing
        System.out.println("while ran " + w + " times, do-while ran " + d + " time");
    }
}
```
Output: `while ran 0 times, do-while ran 1 time`.

## 2(d) Object reference: why can a method modify the object, but reassigning the parameter does not affect the caller?

A reference variable holds the **address of an object**. Java is **always pass-by-value**; for objects, the value passed is a **copy of the reference**.
- Inside the method, the parameter and the caller's variable point to the **same object**, so `p.field = …` changes that shared object and the caller sees it.
- Reassigning the parameter (`p = new …`) only changes the **local copy** of the reference; the caller's variable still points to the original object.

Program with output: [Java end-sem 2025, Q2.5](/library/java/paper-end-sem-2026-01-03#q2-5-explain-the-concept-of-object-reference-in-java) (`grow()` changes the object, `swap()` does not affect the caller).

# Q3. Attempt any four (5 marks each) [20]

## 3(a) Predict the output; labelled break vs normal break.

```java
public class LabelledBreak {
    public static void main(String[] args) {
        outer:
        for (int i = 1; i <= 3; i++) {
            for (int j = 1; j <= 3; j++) {
                if (i == 2 && j == 2) break outer;
                System.out.println("i=" + i + " j=" + j);
            }
        }
        System.out.println("Loop ended");
    }
}
```
Output:
```
i=1 j=1
i=1 j=2
i=1 j=3
i=2 j=1
Loop ended
```
When i = 2 and j = 2, `break outer` leaves **both** loops at once, so i = 3 never runs.
- A **normal `break`** exits only the **innermost** loop (or switch). With a plain `break` here, the program would continue with i = 3 and also print `i=3 j=1 … i=3 j=3`.
- A **labelled `break`** exits the loop marked with that label, which is useful for leaving nested loops.

(The paper's print statement may have no space before `j=`; then the lines read `i=1j=1` and so on.)

## 3(b) Check whether a number is prime using a for loop.

```java
import java.util.Scanner;

public class PrimeCheck {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a number: ");
        int n = sc.nextInt();
        boolean prime = n > 1;
        for (int i = 2; i * i <= n; i++) {      // test divisors up to sqrt(n)
            if (n % i == 0) { prime = false; break; }
        }
        System.out.println(n + (prime ? " is prime" : " is not prime"));
        sc.close();
    }
}
```
Input 29 → `29 is prime`; input 91 → `91 is not prime` (7 × 13). 0 and 1 are not prime.

## 3(c) Count vowels, consonants, digits and blank spaces in a string.

```java
import java.util.Scanner;

public class CountChars {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a string: ");
        String s = sc.nextLine().toLowerCase();
        int vowels = 0, consonants = 0, digits = 0, spaces = 0;
        for (int i = 0; i < s.length(); i++) {
            char ch = s.charAt(i);
            if ("aeiou".indexOf(ch) != -1) vowels++;
            else if (ch >= 'a' && ch <= 'z') consonants++;
            else if (Character.isDigit(ch)) digits++;
            else if (ch == ' ') spaces++;
        }
        System.out.println("Vowels: " + vowels + ", Consonants: " + consonants
                + ", Digits: " + digits + ", Spaces: " + spaces);
        sc.close();
    }
}
```
Input `Hello World 2026` → `Vowels: 3, Consonants: 7, Digits: 4, Spaces: 2`.

## 3(d) Method overloading with three add() methods.

```java
public class AddOverload {
    static int add(int a, int b)          { return a + b; }
    static double add(double a, double b) { return a + b; }
    static int add(int a, int b, int c)   { return a + b + c; }

    public static void main(String[] args) {
        System.out.println("add(4, 5)       = " + add(4, 5));
        System.out.println("add(2.5, 3.25)  = " + add(2.5, 3.25));
        System.out.println("add(1, 2, 3)    = " + add(1, 2, 3));
    }
}
```
Output:
```
add(4, 5)       = 9
add(2.5, 3.25)  = 5.75
add(1, 2, 3)    = 6
```
The compiler chooses the method by the number and types of arguments (compile-time polymorphism). The return type alone cannot distinguish overloads.

## 3(e) Predict the output; constructor chaining with this().

```java
class Demo {
    int x;
    Demo() { this(10); }
    Demo(int x) { this.x = x; }
}
public class Test {
    public static void main(String[] a) {
        Demo d = new Demo();
        System.out.println(d.x);
    }
}
```
Output: **`10`**.

How it works:
1. `new Demo()` calls the **no-argument constructor**.
2. Its first statement `this(10)` **chains** to the constructor `Demo(int x)` of the same class, with x = 10.
3. There, `this.x = x` assigns the parameter to the field (`this.x` is the field, `x` the parameter).
4. Control returns to `Demo()`, which has nothing else to do, and the object has x = 10.

Rules: `this(...)` must be the **first statement** of a constructor; constructors cannot call each other in a cycle; it avoids duplicating initialisation code.

# Q4. Attempt any three (7 marks each) [21]

## 4(a) Nested classes: static nested, inner and anonymous inner class.

A **nested class** is a class defined inside another class. It logically groups helper classes, increases encapsulation and can access the enclosing class's members.

| | Static nested class | Inner (non-static) class | Anonymous inner class |
|---|---|---|---|
| Declared | `static class N { }` inside the outer class | `class I { }` inside the outer class | `new Type() { … }` inside an expression |
| Needs an outer object? | no: `new Outer.N()` | yes: `outer.new I()` | created where it is written |
| Access to outer members | only static ones directly | all, including private instance fields | effectively final locals + outer members |
| Name | has a name | has a name | **no name**, used once |
| Typical use | helper/builder class | iterator, a part tied to one outer object | one-off implementation of an interface or abstract class (event handlers) |

```java
interface Greeting { void greet(); }

class Outer {
    private static String school = "SOCSET";
    private String student = "Asha";

    static class StaticNested {
        void show() { System.out.println("Static nested sees " + school); }
    }
    class Inner {
        void show() { System.out.println("Inner sees " + student + " of " + school); }
    }
}

public class NestedDemo {
    public static void main(String[] args) {
        Outer.StaticNested sn = new Outer.StaticNested();   // no outer object
        sn.show();

        Outer o = new Outer();
        Outer.Inner in = o.new Inner();                     // needs an outer object
        in.show();

        Greeting g = new Greeting() {                       // anonymous inner class
            public void greet() { System.out.println("Hello from an anonymous class"); }
        };
        g.greet();
    }
}
```
Output:
```
Static nested sees SOCSET
Inner sees Asha of SOCSET
Hello from an anonymous class
```

## 4(b) BankAccount: constructors, overloaded deposit(), this, static totalAccounts.

```java
public class BankAccount {
    private long accountNumber;
    private String holderName;
    private double balance;
    static int totalAccounts = 0;                 // shared by all objects

    BankAccount() {                               // (i) default constructor
        this(0, "Not assigned", 0.0);
    }
    BankAccount(long accountNumber, String holderName, double balance) {  // (i) parameterized
        this.accountNumber = accountNumber;       // (iii) this resolves the name conflict
        this.holderName = holderName;
        this.balance = balance;
        totalAccounts++;                          // (iv) incremented in the constructor
    }
    void deposit(int amount) {                    // (ii) overloaded: int
        balance += amount;
        System.out.println("Deposited int " + amount + " into " + accountNumber);
    }
    void deposit(double amount) {                 // (ii) overloaded: double
        balance += amount;
        System.out.println("Deposited double " + amount + " into " + accountNumber);
    }
    void display() {
        System.out.println(accountNumber + " | " + holderName + " | balance " + balance);
    }

    public static void main(String[] args) {
        BankAccount a = new BankAccount(1001, "Riya Shah", 5000);
        BankAccount b = new BankAccount();
        a.deposit(1500);          // int version
        a.deposit(249.75);        // double version
        b.deposit(100);
        a.display();
        b.display();
        System.out.println("Total accounts: " + BankAccount.totalAccounts);
    }
}
```
Output:
```
Deposited int 1500 into 1001
Deposited double 249.75 into 1001
Deposited int 100 into 0
1001 | Riya Shah | balance 6749.75
0 | Not assigned | balance 100.0
Total accounts: 2
```
The default constructor chains with `this(...)`, so `totalAccounts` is incremented once per object in one place.

## 4(c) Recursion without a base case.

```
class Test {
    void recurse(int n) {
        System.out.println(n);
        recurse(n - 1);
    }
}
```
**What happens with `recurse(5)`:** it prints 5, 4, 3, 2, 1, 0, −1, −2, … forever, because there is **no base case** to stop the recursion. Every call pushes a new **stack frame** (parameter n, return address) onto the thread's call stack, and none of them ever returns. The stack has a fixed size, so after several thousand calls the JVM throws **`java.lang.StackOverflowError`** (an Error, not an Exception) and the program terminates.

**Corrected version:**
```java
public class Test {
    void recurse(int n) {
        if (n < 1) return;          // base case: stop below 1
        System.out.println(n);
        recurse(n - 1);             // moves towards the base case
    }
    public static void main(String[] args) {
        new Test().recurse(5);
    }
}
```
Output: `5 4 3 2 1` (one per line). A correct recursive method needs a **base case** and each call must move **closer** to it.

## 4(d) Matrix class: sum, largest and smallest, addition.

```java
public class Matrix {
    private final int[][] a;
    private final int rows, cols;

    Matrix(int[][] data) {
        rows = data.length;
        cols = data[0].length;
        a = new int[rows][cols];
        for (int i = 0; i < rows; i++)
            a[i] = data[i].clone();
    }

    Integer sum() {                                   // (i)
        int s = 0;
        for (int[] row : a) for (int v : row) s += v;
        return s;                                     // autoboxed to Integer
    }

    Integer[] minMax() {                              // (ii) {smallest, largest}
        int min = Integer.MAX_VALUE, max = Integer.MIN_VALUE;
        for (int[] row : a)
            for (int v : row) {
                min = Math.min(min, v);
                max = Math.max(max, v);
            }
        return new Integer[] {min, max};
    }

    Matrix add(Matrix other) {                        // (iii)
        if (rows != other.rows || cols != other.cols)
            throw new IllegalArgumentException("Matrices must be the same size");
        int[][] r = new int[rows][cols];
        for (int i = 0; i < rows; i++)
            for (int j = 0; j < cols; j++)
                r[i][j] = a[i][j] + other.a[i][j];
        return new Matrix(r);
    }

    void print() {
        for (int[] row : a) System.out.println(java.util.Arrays.toString(row));
    }

    public static void main(String[] args) {
        Matrix m1 = new Matrix(new int[][] {{3, 8, 1}, {4, -2, 9}});
        Matrix m2 = new Matrix(new int[][] {{5, 0, 2}, {1, 6, -3}});
        Integer total = m1.sum();
        Integer[] mm = m1.minMax();
        System.out.println("Sum of m1 = " + total);
        System.out.println("Smallest = " + mm[0] + ", largest = " + mm[1]);
        System.out.println("m1 + m2 =");
        m1.add(m2).print();
        System.out.println("Sum as binary (Integer.toBinaryString): " + Integer.toBinaryString(total));
    }
}
```
Output:
```
Sum of m1 = 23
Smallest = -2, largest = 9
m1 + m2 =
[8, 8, 3]
[5, 4, 6]
Sum as binary (Integer.toBinaryString): 10111
```
The wrapper class `Integer` is used for the returned results (autoboxing) and for its utility methods (`MAX_VALUE`, `MIN_VALUE`, `toBinaryString`).
