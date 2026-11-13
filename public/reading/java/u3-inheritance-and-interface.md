ITMBU UNIVERSITY • COMPUTER SCIENCE & ENGINEERING

## Unit 3: Inheritance and Interface

Study guide covering Java inheritance, polymorphism, abstract classes, interfaces, nested classes, packages, and class paths.

Unit overview: Use the navigation to move between topics. Code examples and interactive visualizations are included where available.

TOPIC 1

### Fundamentals Review

Key Class & Method Concepts

Class: A template from which objects (instances) are created, containing data and code[cite: 52].

Constructor: Initializes an object immediately upon creation. It has the exact same name as the class and does not have a return type, not even void[cite: 54].

this Keyword: Used inside any method to refer to the current object on which the method was invoked[cite: 55].

The static Keyword[cite: 56, 57]

Preceding a member declaration with static allows it to be used independently of any object of that class[cite: 56]. A common example is main(), which must be called before any objects exist[cite: 56].

Static instance variables act as global variables; all instances share the same copy[cite: 57].

Restrictions: Static methods can only call other static methods, access static data, and cannot refer to this or super[cite: 57].

A static block can be declared to initialize static variables, executing exactly once when the class loads[cite: 57].

Access Modifiers Overview[cite: 58, 152]

| Access | Same | Subclass in | Other Classes | Subclass in | Non-subclasses |
|---|---|---|---|---|---|
| Modifier | Class | Same | in Same | Other | in Other Package |
|  |  | Package | Package | Packages |  |
| Public | Yes | Yes | Yes | Yes | Yes |

| Access | Same | Subclass in | Other Classes | Subclass in | Non-subclasses |
|---|---|---|---|---|---|
| Modifier | Class | Same | in Same | Other | in Other Package |
|  |  | Package | Package | Packages |  |
| Protected | Yes | Yes | Yes | Yes | No |
| Friendly | Yes | Yes | Yes | No | No |
| (Default) |  |  |  |  |  |
| Private | Yes | No | No | No | No |

TOPIC 2

### Inheritance

Inheritance allows you to derive new classes from existing classes, making features of the existing class available to the new class[cite: 59]. This promotes code reusability without rewriting code[cite: 59, 62].

Implemented using the extends keyword[cite: 59].

The existing class is the superclass; the inheriting class is the subclass[cite: 59, 61].

A subclass inherits all members of the superclass except private members[cite: 61, 72].

Java does not support multiple class inheritance (a class can specify only one superclass)[cite: 60].

Multi-level inheritance: Involves two or more classes (e.g., Class C extends Class B, and Class B extends Class A)[cite: 73].

The super Keyword & Constructor Hierarchy[cite: 65, 78]

The super keyword refers to the superclass[cite: 65]. It can be used to call the superclass's methods or constructors[cite: 77]. In a class hierarchy, constructors are called in order of derivation, from superclass to subclass[cite: 78].

Constructor Execution Order Visualizer[cite: 79]

Click the button to instantiate Class C (where C extends B, and B extends A).

Superclass A Constructor()

Subclass B Constructor()

Subclass C Constructor()

Interactive Code Playground: Inheritance & super[cite: 77]

class A { int x;

A(int x) { this.x = x;

} void show() { System.out.println("Super class x = " + x);

} }

class B extends A { int y;

B(int a, int b) { super(a); // Calls superclass constructor y = b;

} void show() { super.show(); // Calls superclass method System.out.println("Sub class y = " + y);

} }

B ob = new B(10, 24);

ob.show();

} }

TOPIC 3

### Polymorphism

Polymorphism (meaning "many forms") is the ability of the same method to take more than one form to perform several tasks[cite: 81]. It is categorized into two types:

| Static Polymorphism (Compile Time)[cite: 81] | Dynamic Polymorphism (Run Time)[cite: 82] |
|---|---|
| Method Overloading: Writing multiple methods in | Method Overriding: Writing methods in super |
| the same class with the same name but different | and sub classes with the same name and same |
| signatures[cite: 83, 85]. | signature[cite: 85, 87]. |

Differences in signature can be based on the JVM executes the method depending on the number, data type, or sequence of parameters[cite:

type of the object at run time[cite: 82, 87]. 84].

TOPIC 4

### The final Keyword

The final keyword sets limitations on extensibility[cite: 89].

Final Class: Cannot be extended (inherited)[cite: 90].

Final Method: Cannot be overridden[cite: 91].

Final Variable: Cannot be reassigned once initialized. If a reference object is final, it cannot be reassigned, but its internal properties can still be changed[cite: 92, 93].

Final Argument: Cannot be changed inside a method[cite: 94].

TOPIC 5

### Abstract Class & instanceof Operator

Abstract Classes

An abstract class is declared using the abstract keyword and cannot be instantiated[cite: 95, 98]. It acts as a template for other classes[cite: 98].

Can contain both concrete methods (methods with a body) and abstract methods (methods without a body)[cite: 96, 97].

Subclasses must provide implementations for the abstract methods[cite: 98].

instanceof Operator[cite: 101]

Evaluates if an object is an instance of a class (or subclass). Returns true if the object was created from the class or its subclass, otherwise returns false[cite: 101]. Syntax: operand1 instanceof operand2[cite: 101].

Interactive Code Playground: Abstract Class[cite: 99]

abstract class Parent { abstract void abstractmethod(); // No body

void nonabstract() { System.out.println("This is a concrete method.");

} }

class Child extends Parent { // Subclass MUST implement abstract methods void abstractmethod() { System.out.println("Child implements abstractmethod.");

} }

Child c = new Child();

c.abstractmethod();

c.nonabstract();

// instanceof check System.out.println("Is c an instance of Parent? " + (c instanceof Parent));

} }

TOPIC 6

### Interfaces

An interface is a collection of abstract methods and final variables[cite: 103, 107]. Java does not support multiple class inheritance, but a class can implement multiple interfaces to achieve multiple inheritance[cite: 104, 106].

Interfaces define what a class should do, not how it does it (methods have no body)[cite: 107].

Variables in an interface are implicitly static final (constants)[cite: 109].

Methods that implement an interface must be declared public[cite: 110].

Interfaces use the implements keyword when bound to a class, and can use extends to inherit from another interface[cite: 112, 116].

Interface vs Abstract Class[cite: 124]

| Interface | Abstract Class |
|---|---|
| implements keyword used[cite: 124]. | extends keyword used[cite: 124]. |
| Multiple inheritance possible (can inherit many | Multiple inheritance not possible (can inherit one |
| interfaces)[cite: 124]. | class)[cite: 124]. |

| Interface | Abstract Class |
|---|---|
| Methods are inherently public and abstract[cite: | Methods must be explicitly tagged as |
| 124]. | public/abstract[cite: 124]. |
| No implementation at all[cite: 124]. | Can have partial implementation (concrete |
|  | methods)[cite: 124]. |
| No constructors[cite: 124]. | Can have constructors[cite: 124]. |

Interactive Code Playground: Interfaces[cite: 119, 120]

interface Area { final static float PI = 3.14F;

float compute(float x, float y); // Abstract method }

class Rectangle implements Area { // Must be declared public public float compute(float x, float y) { return (x * y);

} }

Rectangle rect = new Rectangle();

Area a = rect; // Interface reference

System.out.println("Area of rectangle = " + a.compute(10, 20));

} }

TOPIC 7

### Nested & Inner Classes

A nested class is defined within another class. It has access to all members (including private) of the enclosing class, but the outer class cannot access the inner class's members directly[cite: 125, 130].

Static Nested Class: Has static modifier. Cannot refer directly to members of its enclosing class[cite: 130].

Non-static Nested Class (Inner Class): Fully within the scope of the enclosing class. Can access all variables/methods of the outer class[cite: 130].

* Note on Applets: The slides mention nested classes are helpful in handling events in applets[cite: 125]. Applets are also listed under system packages[cite: 136]. Further explanation of Applets requires additional slide context.

TOPIC 8

### Packages & Class Path

Packages group related classes/interfaces together acting as "containers", allowing code reuse, preventing naming conflicts, and hiding classes[cite: 131, 133].

System Packages (Java API):

java.lang: Language support (primitive types, math, exceptions). Automatically imported[cite: 135].

java.util: Utility classes (Vector, hash tables, random numbers)[cite: 135].

java.io: Input/output facilities[cite: 135].

java.net: Network communication[cite: 136].

java.awt: Abstract Window Toolkit for GUI[cite: 136].

java.applet: Classes for creating applets[cite: 136].

Creating and Accessing Packages[cite: 139, 142]

Creating: Use package packagename; as the first statement in the source file[cite: 139]. Naming convention suggests lowercase, often prefixed by domain names[cite: 138].

Importing: Use import Packagename.classname; to import a specific class, or import Packagename.*; to import all public classes in a package[cite: 137, 143].

Hiding: To hide a class from being accessed outside its package, do not declare it public[cite: 155].

Class Path

A classpath is a list of directories the compiler and interpreter search to find class files[cite: 157]. If saving classes outside the default JDK bin folder, you must set the classpath[cite: 157].

Command line: javac -d classpath filename[cite: 158]

Environment setup: set path="c:\program files\java\jdk1.2\bin"[cite: 158]

ITMBU University • Computer Science & Engineering • Unit 3 Study Guide
