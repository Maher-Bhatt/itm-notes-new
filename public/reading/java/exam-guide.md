> Everything here is taken from the Java Complete Study Guide: for each unit, what examiners ask, what to write, the common mistakes and quick self-checks, followed by the last-night revision sheet.

# Basics of Java, Arrays and Strings

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
