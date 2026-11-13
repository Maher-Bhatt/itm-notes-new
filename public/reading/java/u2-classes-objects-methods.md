### Classes, Objects & Methods

**Unit 02 Overview**

**Core Fundamentals**

- Class & Object
- Object Reference
- new Operator
- this Keyword
- static Keyword

**Methods & Logic**

- Constructors
- Constructor Overloading
- Method Overloading
- Recursion
- Object Passing & Return
- finalize() Method

**Scope & Architecture**

- Access Control
- Access Modifiers
- Nested Classes
- Inner Classes
- Anonymous Inner Classes

### Object-Oriented Programming (OOP)

**OVERVIEW**

**Core Concept**

- A programming paradigm centered around "objects"—structuring code into instances of defined classes.

**The Blueprint**

- A class acts as a template for creating objects that share common attributes (properties) and behaviors (methods).

**Four Basic Principles of OOP:**

**Encapsulation**

- Bundling data and methods into a single class unit to restrict direct internal access.

**Inheritance**

- Deriving new classes from existing superclasses to promote reusable code structure.

**Abstraction**

- Hiding complex implementation details to present only essential functionality.

**Polymorphism**

- Enabling different objects to execute custom behaviors through a shared interface.

### OOP Principles

**CORE CONCEPTS**

**Encapsulation**

Encapsulation refers to the practice of bundling data (attributes) and the methods (functions) that operate on that data into a single unit called a class.

This provides data hiding and allows for controlled access to the internal state of objects. By encapsulating data, you can control how it's manipulated and prevent unintended interference.

**Inheritance**

Inheritance allows you to create a new class (subclass or derived class) that inherits attributes and behaviors from an existing class (superclass or base class).

- This promotes code reuse and allows you to create specialized classes based on a more general template.

### CORE CONCEPTS OOP Principles

**Abstraction**

- Abstraction involves simplifying complex reality by modeling classes based on their essential characteristics.

It allows you to focus on the necessary features while hiding unnecessary details. Abstraction helps manage complexity and makes code more manageable.

**Polymorphism**

- Polymorphism means the ability of objects of different classes to be treated as objects of a common superclass.

It allows you to define a single interface or method signature that multiple classes can implement in their own way. This promotes flexibility and extensibility in your code.

### Encapsulation

**CORE CONCEPTS**

**Bundling Unit**

- Encapsulation is one of the four fundamental OOP concepts.
- It is the wrapping of Data and Methods into a single unit (called a class).

**Access Control**

- It is the technique of making class fields private.
- Controlled access to these internal fields is provided exclusively via public methods.

**Data Hiding**

- Private fields cannot be accessed by external code, protecting class variables from direct exposure.

**Due to this security mechanism, encapsulation is commonly termed data hiding.**

### Encapsulation Overview

**CORE CONCEPTS**

**Protective Barrier**

Encapsulation can be described as a protective barrier that prevents code and data from being randomly accessed by other code defined outside the class.

- Access to the data and code is tightly controlled by an interface.

**Key Advantages**

- The main benefit of encapsulation is the ability to modify implemented code without breaking the code of others who use our code.
- With this feature Encapsulation gives maintainability, flexibility and extensibility to our code.

### Encapsulation Architecture

**CORE CONCEPTS**

**Class Structure & Scope**

**Access Control & Interface**

![Slide 7 figure](/reading/java/img/u2-classes-objects-methods-s007-167.png)

### CORE CONCEPTS Encapsulation Code Example

**Encapsulated Class Definition**

**Main Execution & Access**

![Slide 8 figure](/reading/java/img/u2-classes-objects-methods-s008-181.png)

![Slide 8 figure](/reading/java/img/u2-classes-objects-methods-s008-182.png)

### Inheritance Architecture

**CORE CONCEPTS**

**Core Definition**

- Inheritance is the mechanism by which one object acquires the properties and behaviors of another object.
- It organizes information into a structured, manageable hierarchical order.

**Key Keywords**

- When implementing inheritance, the primary keywords utilized are:

**extends**

**implements**

**IS-A Relationship**

**These keywords determine whether one object is an IS-A type of another.**

- Through this relationship, objects acquire and reuse existing properties from parent classes.

### Example: Vehicle Abstraction Hierarchy

**CORE CONCEPTS**

- ABSTRACT CLASS

**Vehicle**

- Base class definition
- CONCRETE CLASS
- Car

**Extends Vehicle base behaviors with specific passenger car implementation.**

- CONCRETE CLASS
- Bus
- Inherits core properties while adding mass transit capability logic.
- CONCRETE CLASS
- Truck
- Specializes the abstract hierarchy for heavy cargo transport.

### Example: Java Class Inheritance

**CORE CONCEPTS**

- ParentChildExample.java

**class Parent {**

- String parentName;
- String familyName;
- }

**class Child extends Parent {**

- String childName;
- int childAge;

**void printMyName() {**

- System.out.println(
- "My name is" + childName +

**" " + familyName);**

- }
- }
- SUPERCLASS (BASE)

**Parent Class**

- Defines base fields shared across family members:

**parentName : String**

**familyName : String**

- SUBCLASS (DERIVED)

**Child extends Parent**

- Inherits base properties and adds specific logic:

**Adds childName and childAge attributes.**

**printMyName() directly accesses inherited familyName.**

### Abstraction in Object-Oriented Programming

**CORE CONCEPTS**

- 01. DEFINITION
- Essential Features
- Providing essential features while hiding internal implementation details is the core foundation of Abstraction.
- 02. SECURITY
- Encapsulated Safety
- Enhances internal implementation safely without affecting external systems, providing crucial security boundaries.
- 03. DATA RELEVANCE
- Selective Exposure
- Classes contain extensive data, but abstraction ensures users are only exposed to the subset they actually need.
- 04. USER EXPERIENCE
- Tailored Data Views
- Every user receives a personalized view specific to their requirements, preventing confusion from clutter.

### Example: Abstract Bank Class

**CORE CONCEPTS**

- Bank.java

**public abstract class Bank {**

**private int accno;**

**private String name;**

**private float balance;**

**private float loan;**

**void display_to_cler() {**

- System.out.println(
- "Accno = " + accno);
- System.out.println(
- "Name = " + name);
- }
- }
- ABSTRACT CLASS (BASE)

**Bank Class Template**

- Defines base structure for derived bank account types:

**public abstract class Bank**

- Cannot be directly instantiated without subclassing
- ENCAPSULATION & METHODS

**Data Protection & Access**

- Restricts direct access to member variables:

**private fields: accno, name, balance, loan**

**display_to_cler() prints account info**

### Polymorphism in OOP

**CORE CONCEPTS**

- 01. DEFINITION
- Multiple Forms

Polymorphism is the ability of an object to take on many forms. The most common use in OOP occurs when a parent class reference is used to refer to a child class object.

- 02. IS-A TEST
- Object Polymorphism

Any Java object passing more than one IS-A test is considered polymorphic. All Java objects pass the IS-A test for their own type and for the class Object.

- 03. REFERENCES
- Type Immutability

Access to an object is only through a reference variable of a single type. Once declared, the type of a reference variable cannot be changed.

### CORE CONCEPTS Example: Shape Hierarchy

**Shape**

- CATEGORY 01
- 2-D Shape

**Circle**

**Rectangle**

- └─ Square (Derived)

**Triangle**

- └─ Equilateral Triangle (Derived)
- CATEGORY 02
- 3-D Shape

**Sphere**

**Cube**

### Method Overloading Examples

**POLYMORPHISM IN JAVA**

**int add (int a, int b) 2 PARAMETERS (INT, INT)**

**float add (float a, int b) 2 PARAMETERS (FLOAT, INT)**

**float add (int a, float b) 2 PARAMETERS (INT, FLOAT)**

**void add (float a) 1 PARAMETER (FLOAT)**

**int add (int a) 1 PARAMETER (INT)**

### Classes & Objects

**OBJECT-ORIENTED PROGRAMMING**

- CONCEPT 01

**Class**

- A template or blueprint that describes the behaviors and states that objects of its type support.

**Key Characteristics:**

- Serves as a structural design / blueprint
- Defines attributes & methods
- Does not consume memory until instantiated
- CONCEPT 02

**Object**

- A real-world instance of a class having distinct states and behaviors.

**Example: Dog Object**

**States: Color, Name, Breed**

**Behaviors: Wagging, Barking, Eating**

### Class Definition & Concepts

**OBJECT-ORIENTED PROGRAMMING**

- PILLAR 01
- Object Blueprint
- A programming language construct used as a master template to instantiate objects.

**Core Functions:**

- Acts as a structural blueprint
- Defines shared attributes
- Defines common methods
- PILLAR 02
- Abstraction
- An abstract representation of real-world concepts within software systems.

**Models Entities Such As:**

- Person (e.g., User, Employee)
- Place (e.g., Location, Store)
- Thing (e.g., Account, Product)
- PILLAR 03
- Encapsulation
- Bundles data placeholders and executable code into a single logical unit.

**Core Components:**

**State: Member variables**

**Behavior: Reusable methods**

### Class Syntax Structure

**OBJECT-ORIENTED PROGRAMMING**

- ClassDeclaration.java

**class classname {**

- // State / Variables
- type instance_variable1;
- // Method 1 Definition
- type methodname1(parameter_list) {
- // body of method
- }
- // Method 2 Definition
- type methodname2(argument_list) {
- // body of method
- }
- }
- SYNTAX BREAKDOWN
- Core Elements

**1. Class Name**

- Defines the identifier used to instantiate objects from this template.

**2. Instance Variables**

- Hold the attribute state unique to each instance created from the class.

**3. Class Methods**

- Contain executable statements that define the behaviors and operations.

### Declaring a Class

**OBJECT-ORIENTED PROGRAMMING**

- GeneralSyntax.java

**class classname {**

- // State / Variables
- type instance_variable1;
- type instance_variable2;
- // Method Definitions
- type method1(params) {
- // body of method
- }
- type method2(params) {
- // body of method
- }
- }
- Dog.java

**public class Dog {**

- // Instance Variables
- String breed;
- int age;
- String color;
- // Methods (Behavior)
- void barking() { ... }
- void hungry() { ... }
- void sleeping() { ... }
- }

### Understanding Objects

**OBJECT-ORIENTED PROGRAMMING**

- CORE DEFINITION
- Real-Time Entity

**Instance of a Class**

- An Object is a real-time entity and an instance of a class. It possesses distinct properties and can perform specific actions.
- COMPOSITION
- State & Action

**Variables & Methods**

Objects contain variables (state) and methods (behavior). Objects exhibiting similar properties and actions are grouped together under one class.

- CONCEPTUAL MODEL
- Real-World Analogy

**Blueprint vs. House**

- “To give a real world analogy, a house is constructed according to a specification.”
- The class serves as the architectural specification, whereas the house itself is the physical object.

### Creating Objects Using new Operator

**OBJECT-ORIENTED PROGRAMMING**

- STEP 01
- Declare Variable

**Reference Declaration**

To access properties and methods, declare a variable of that class type. This variable does not define an object yet—it simply holds a reference.

- STEP 02
- Allocate Memory

**The new Operator**

- Acquire an actual physical copy of the object using the new operator. It dynamically allocates memory and returns its address reference.
- STEP 03
- Store Reference

**Dynamic Link**

- The memory address reference is stored in the variable. Consequently, in Java, all class objects are dynamically allocated.

### OBJECT-ORIENTED PROGRAMMING The new Operator in Java

- CORE METHOD
- Object Creation

**Most Common Approach**

- Using the new keyword is the primary and most basic way to create objects in Java.
- FLEXIBILITY
- Constructor Call

**Supports All Signatures**

- Invokes any desired constructor during creation, supporting no-argument or parameterized constructors.
- SYNTAX EXAMPLE
- Instantiation

**Basic Statement**

**mybox = new Box();**

- Allocates memory dynamically for a new Box object.

### Declaring & Instantiating Objects

**OBJECT-ORIENTED PROGRAMMING**

- SYNTAX BREAKDOWN
- Declaration Steps

**1. Declare Reference Variable**

**Box mybox;**

**Creates a reference variable that initially holds null.**

**2. Allocate Memory & Assign**

**mybox = new Box();**

- Allocates physical memory for the Box object and points mybox to it.

**Combined Shortcut**

**Box mybox = new Box();**

- MEMORY MODEL
- Statement vs. Effect

![Slide 24 figure](/reading/java/img/u2-classes-objects-methods-s024-499.png)

### Example of Class & Object

**OBJECT-ORIENTED PROGRAMMING**

- CLASS DEFINITION
- Class Structure

**Instance Variables**

**class Box {**

**double width;**

**double height;**

**double depth;**

- }
- Defines template attributes that belong to each instance of the class.
- MEMORY ALLOCATION
- The new Operator

**Dynamic Allocation**

**new Box();**

**The new operator dynamically allocates memory for an object at runtime.**

- INSTANTIATION SYNTAX
- Object Instance

**Combined Statement**

**Box mybox = new Box();**

- mybox is an instance (object) of class Box, holding a reference to the created object.

### Difference Between Classes & Objects

**OBJECT-ORIENTED PROGRAMMING**

- CONCEPTUAL BLUEPRINT

**Classes**

**Core Existence**

- Classes have logical existence. They act as a theoretical template or specification without taking up physical memory on their own.

**Real-World Analogy**

- Furniture itself does not have any physical existence—it is an abstract concept representing a category.
- CONCRETE INSTANCE

**Objects**

**Core Existence**

- Objects have physical existence. An object is a real instance created dynamically in memory based on its class specification.

**Real-World Analogy**

- Chair, Table, etc. do have physical existence as tangible objects created under the furniture category.

### OBJECT-ORIENTED PROGRAMMING Access Controls & Modifiers

- CORE CONCEPT
- Access Control

**Who Can Access**

**Decides who can access variables, methods, and classes in Java.**

- MECHANICS
- Specifiers

**Access Determination**

- How and where a member of a class is accessed is determined by the access specifiers.
- VISIBILITY
- Member Scope

**Class Boundaries**

- Members have visibility in the same class or other classes based on accessibility.
- IMPLEMENTATION
- Modifiers

**Tooling**

**To implement access control in Java, we use Access Modifiers.**

### Access Specifiers: Public & Private

**OBJECT-ORIENTED PROGRAMMING**

- UNRESTRICTED ACCESS

**public**

**Global Scope**

- When a class member is declared with public, it can be accessed from anywhere in the program.

**Usage Intent**

- Public classes, methods, or fields are used only if you explicitly want to offer unrestricted access to these members.
- RESTRICTED ACCESS

**private**

**Encapsulated Scope**

- You can access private methods and fields only within the same class to which they belong.

**Subclass Boundaries**

- Private members are not visible within subclasses and are strictly not inherited by subclasses.

### Access Specifiers: Protected & Default

**OBJECT-ORIENTED PROGRAMMING**

- SUBCLASS & PACKAGE SCOPE

**protected**

**Subclass & Package Access**

You can access protected methods and fields from within the same class, its subclasses, and classes of the same package, but not from other packages.

**Declaration Restriction**

- The protected access specifier cannot be used with class declarations.
- PACKAGE-ONLY SCOPE

**Default**

**Implicit Assignment**

- If you do not specify any access specifier while declaring a class, method, or field, it is considered with the default access specifier.

**Package Accessibility**

- Accessible from within the same package to which they belong, but strictly not accessible outside the package.

### Methods

- ¨A Java method is a collection of statements that are grouped together to perform an operation.
- ¨When you call the System.out.println method, for example, the system actually executes several statements in order to display a message on the console.

**This is the general form of a method:**

**type name(parameter-list) {**

**/ / body of method**

**}**

### Methods: Definition & Syntax

**OBJECT-ORIENTED PROGRAMMING**

- CORE CONCEPT

**What is a Method?**

**Definition**

- A Java method is a collection of statements that are grouped together to perform an operation.

**Practical Example**

When you call System.out.println, for example, the system actually executes several statements in order to display a message on the console.

- SYNTAX STRUCTURE

**General Form**

**typename(parameter-list) {**

- // body of method
- }

**Key Components**

**type: Return data type (or void)**

**name: Identifier used to call the method**

**parameter-list: Sequence of input parameters**

### Methods: Overview & Rules

**OBJECT-ORIENTED PROGRAMMING**

- CORE CONCEPT

**What is a Method?**

**OOP Context**

- The word method is commonly used in object-oriented programming.

**Function Analogy**

- It is similar to a function in any other programming language.
- DECLARATION & CONVENTION

**Naming & Scope**

**Declaration Scope**

- Name of method can be declared outside the class.

**Naming Convention**

- All methods have a name that starts with a lowercase character.

### Methods: Syntax Rules & Parameters

**OBJECT-ORIENTED PROGRAMMING**

- RETURN TYPE & NAMING

**Type & Identifier**

**Data Type Specifier**

Specifies the type of data returned by the method. This can be any valid type, including custom class types. If no value is returned, return type must be void.

**Method Name**

- Specified by name. Can be any legal identifier other than items already used within the current scope.
- METHOD INPUTS

**Parameter List**

**Structure & Sequence**

- The parameter-list is a sequence of type and identifier pairs separated by commas.

**Variable Role & Empty State**

- Parameters act as variables that receive argument values passed when invoked. If the method requires no parameters, the list remains empty.

### Why Use Methods?

**OBJECT-ORIENTED PROGRAMMING**

- REUSABILITY
- To Make Code Reusable
- If you need to do the same task multiple times, write a method once and call it each time you need to execute the task.
- FLEXIBILITY
- To Parameterize Code
- Use parameters to dynamically alter and control how the method behaves across different scenarios.
- ARCHITECTURE
- Top-Down Programming
- Easily solve bigger or complex problems by breaking them down into smaller, manageable sub-methods.
- MAINTAINABILITY
- To Simplify Code
- Encapsulates complex internal logic from other program parts, preventing accidental errors and confusion.

### OBJECT-ORIENTED PROGRAMMING Example: Class Methods in Action

- CLASS DEFINITION
- Box Class Logic
- CLASS USAGE
- BoxDemo Execution

![Slide 35 figure](/reading/java/img/u2-classes-objects-methods-s035-671.png)

![Slide 35 figure](/reading/java/img/u2-classes-objects-methods-s035-672.png)

### Method Overloading

**OBJECT-ORIENTED PROGRAMMING**

- DEFINITION
- Same Name, Unique Params
- If two methods have the same name but different parameter lists within one class, it is called "Method Overloading".
- REQUIREMENTS
- Parameter Signature
- Overloaded methods must have different parameter lists. You cannot overload methods based solely on different modifiers or return types.
- COMPILER LOGIC
- Method Resolution
- When overloaded methods are used, the Java compiler decides which method to invoke based on the number and types of parameters passed.

### Example: Method Overloading

**OBJECT-ORIENTED PROGRAMMING**

- CLASS DEFINITION
- Box Class Logic
- CLASS USAGE
- BoxDemo Execution

![Slide 37 figure](/reading/java/img/u2-classes-objects-methods-s037-709.png)

![Slide 37 figure](/reading/java/img/u2-classes-objects-methods-s037-710.png)

### Core Concept: Recursion

**OBJECT-ORIENTED PROGRAMMING**

- DEFINITION
- Self-Calling Method
- Recursion is a programming technique in which a method calls itself directly or indirectly.
- MEMORY MECHANISM
- Stack Allocation
- Each method call allocates new space on the internal stack for its local variables, enabling recursive calls automatically.
- BENEFITS & EXAMPLES
- Problem Breakdown
- Provides a way to break complicated problems down into simpler problems that are easier to solve.

**Examples:**

- Factorial of a number
- Fibonacci series

### Recursion: Syntax & Simple Example

**OBJECT-ORIENTED PROGRAMMING**

- GENERAL SYNTAX
- Recursive Structure

**type methodname() {**

- // code to be executed

**methodname(); // calling same method**

**}**

- A recursive method contains a call to itself within its own body definition.
- BASIC EXAMPLE
- Demonstration Method

**void demo() {**

- System.out.println("hello");

**demo(); // recursive call**

**}**

- When executed, this simple example continuously prints "hello" by invoking itself repeatedly.

### Recursion: Factorial Example

**OBJECT-ORIENTED PROGRAMMING**

- JAVA CODE
- Factorial Class

**public class Recursion {**

**static int factorial(int n) {**

**if (n == 1) return 1;**

**else return(n * factorial(n-1));**

**}**

**public static void main(String[] args) {**

- System.out.println(
- "Factorial of 5 is: " + factorial(5));

**}**

**}**

- CODE BREAKDOWN
- Method Logic

**1. Base Case**

- When n == 1, returns 1. This terminates the recursive call chain and prevents infinite execution.

**2. Recursive Step**

**Multiplies n by the result of calling factorial(n-1).**

**3. Program Output**

**Evaluating factorial(5) yields 5 * 4 * 3 * 2 * 1:**

**Factorial of 5 is: 120**

### Constructor: Overview & Key Features

**OBJECT-ORIENTED PROGRAMMING**

- CORE DEFINITION
- Role & Naming

**1. Special Initialization Method**

- A constructor is similar to a method that initializes the instance variables of a class.

**2. Identical Class Naming**

- A constructor must have the exact same name as the class name in which it is defined.
- EXECUTION & PARAMETERS
- Invocation Behavior

**1. Flexible Parameters**

- A constructor may or may not have parameters. Parameters act as local variables to receive data during instantiation.

**2. Automatic Call**

- Once defined, it is automatically invoked immediately after object creation, before the new operator completes.

### Constructor: Types & Rules

**OBJECT-ORIENTED PROGRAMMING**

- CONSTRUCTOR TYPES
- Classification

**1. Default Constructor**

- A constructor without any parameters is called default constructor.

**2. Parameterized Constructor**

- A constructor with one or more parameters is called parameterized constructor.
- RETURN & EXECUTION
- Key Rules

**1. No Return Type**

- A constructor does not return any value, not even void because implicitly the return type of a constructor is the class itself.

**2. Single Invocation**

- A constructor is called only once per object.

### OBJECT-ORIENTED PROGRAMMING Constructor: No-argument Type

- CORE DEFINITION
- Overview & Concept

**1. Parameter Flexibility**

- Similar to methods, a Java constructor may or may not have any parameters (arguments).

**2. Zero Arguments**

- If a constructor does not accept any parameters, it is known as a no-argument constructor.
- SYNTAX & STRUCTURE
- Basic Declaration

**Syntax Format**

**constructor()**

- {
- // syntax / code body
- }
- Contains empty parentheses with no parameter signatures defined inside.

### Private Constructor: Code Example

**OBJECT-ORIENTED PROGRAMMING**

- SOURCE CODE
- Main.java

**class Main {**

**int i;**

**private Main() {**

- i = 5;
- System.out.println("Constructor is called");
- }

**public static void main(String[] args) {**

**Main obj = new Main();**

- System.out.println("Value of i: " + obj.i);
- }
- }
- EXECUTION & ANALYSIS
- Key Takeaways

**1. Private Access**

**The constructor private Main() restricts instantiation from outside the class.**

**2. Same-Class Invocation**

- Inside main(), new Main() works because it resides within the same class definition.

**3. Console Output**

- Constructor is called
- Value of i: 5

### Constructor: Default Type

**OBJECT-ORIENTED PROGRAMMING**

- CORE DEFINITION
- Overview & Concept

**1. Automatic Generation**

- If we do not create any constructor, the Java compiler automatically creates a no-argument constructor during execution.

**2. Object Initialization**

- A default constructor is used to initialize every object of the class with the exact same data.
- SYNTAX & STRUCTURE
- Basic Declaration

**Syntax Format**

**Constructor_name()**

- {
- // statements
- }
- Generated with empty parameters and default body when no explicitly declared constructor exists.

### Default Constructor: Code Example

**OBJECT-ORIENTED PROGRAMMING**

- SOURCE CODE
- StudentDemo.java

**class Student {**

**int rollNo; String name;**

**Student() { rollNo = 101; name = "Suresh"; }**

**void display() {**

- System.out.println("Roll No: " + rollNo);
- System.out.println("Name: " + name);
- }
- }

**class StudentDemo {**

**public static void main(String[] args) {**

**Student s1 = new Student();**

- System.out.println("s1 object contains: ");
- s1.display();

**Student s2 = new Student();**

- System.out.println("s2 object contains: ");
- s2.display();
- }
- }
- EXECUTION & ANALYSIS
- Key Takeaways

**1. No-Arg Constructor**

**The Student() constructor initializes rollNo and name upon creation.**

**2. Automatic Initialization**

**Invoking new Student() triggers default values for object instance variables.**

**3. Console Output**

- Student Roll Number is: 101
- Student Name is: Suresh

### Constructor: Parameterized Type

**OBJECT-ORIENTED PROGRAMMING**

- CORE DEFINITION
- Overview & Concept

**1. Accepts Parameters**

- A Java constructor can accept one or more parameters to receive initial values.

**2. Custom Initialization**

- Parameterized constructors allow initializing each object with distinct, customizable data.
- SYNTAX & STRUCTURE
- Basic Declaration

**Syntax Format**

**Constructor_name(parameters)**

- {
- // statements
- }
- Parameters are specified within parentheses to pass initial values during object instantiation.

### Parameterized Constructor: Code Example

**OBJECT-ORIENTED PROGRAMMING**

- SOURCE CODE
- Main.java

**class Main {**

**String languages;**

**Main(String lang) {**

- languages = lang;
- System.out.println(languages +
- " Programming Language");
- }

**public static void main(String[] args) {**

**Main obj1 = new Main("Java");**

**Main obj2 = new Main("Python");**

**Main obj3 = new Main("C");**

- }
- }
- EXECUTION & ANALYSIS
- Key Takeaways

**1. Parameterized Constructor**

- The Main(String lang) constructor accepts a string argument to initialize field state.

**2. Dynamic Value Passing**

- Passing distinct parameters during new instantiation sets custom instance data for each object.

**3. Console Output**

- Java Programming Language
- Python Programming Language
- C Programming Language

### Constructor Overloading: Core Concept

**OBJECT-ORIENTED PROGRAMMING**

- CORE DEFINITION
- Definition & Purpose

**1. Multiple Constructors**

- The concept of defining more than one constructor within the same class.

**2. Versatile Execution**

- Allows every constructor to perform a different initialization task depending on requirements.
- KEY REQUIREMENT
- Parameter Distinction

**1. Different Parameters**

- Overloaded constructors must differ in parameter list (number, type, or sequence of arguments).

**2. Flexible Object Creation**

- Provides callers multiple tailored entry points to instantiate objects with varied initial data.

### Constructor Overloading: Code Example

**OBJECT-ORIENTED PROGRAMMING**

- CLASS DEFINITION
- Box.java

**class Box {**

**double width, height, depth;**

- // Default constructor

**Box() { width = height = depth = 10; }**

- // Parameterized constructor

**Box(double w, double h, double d) {**

- width = w; height = h; depth = d;
- }
- // Compute and return volume

**double volume() {**

**return width * height * depth;**

- }
- }
- EXECUTION CLASS
- BoxDemo6.java

**class BoxDemo6 {**

**public static void main(String[] args) {**

- // Instantiate using default constructor

**Box mybox1 = new Box();**

- // Instantiate using parameterized constructor

**Box mybox2 = new Box(10, 20, 15);**

**double vol;**

- vol = mybox1.volume();
- System.out.println("Volume is " + vol);
- vol = mybox2.volume();
- System.out.println("Volume is " + vol);
- }
- }
