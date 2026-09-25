import { Subject } from './types';

export const sem3JavaMaster: Subject = {
  id: 'sem3-java',
  name: 'Object Oriented Programming — Java Master',
  code: 'JAVA303',
  color: 'bg-red-600',
  icon: 'coffee',
  description: 'Comprehensive Java Object Oriented Programming notes for Semester 3. Exam-ready materials with code examples, detailed explanations, and multiple-choice questions.',
  semester: 3,
  units: [
    {
      id: 'unit-1',
      title: 'UNIT 1: Java Basics & OOP Fundamentals',
      description: 'Introduction to Java programming, basic syntax, control statements, arrays, and an introduction to classes and objects.',
      topics: [
        {
          id: 'intro-java',
          title: 'Introduction to Java (JDK, JRE, JVM, features)',
          simpleExplanation: 'Java is a popular, platform-independent programming language. To run Java, you need three main components: JDK (for developers), JRE (for running apps), and JVM (the engine that actually runs the code).',
          detailedExplanation: `## What is Java?
Java is a high-level, class-based, object-oriented programming language designed to have as few implementation dependencies as possible. The core philosophy of Java is **"Write Once, Run Anywhere" (WORA)**.

### Key Components: JDK, JRE, and JVM

1. **JVM (Java Virtual Machine)**
   - It is an abstract machine. It provides a runtime environment in which Java bytecode can be executed.
   - JVMs are available for many hardware and software platforms (i.e., JVM is platform-dependent).
   - It performs tasks like loading code, verifying code, executing code, and providing the runtime environment.

2. **JRE (Java Runtime Environment)**
   - JRE is the implementation of JVM. It physically exists.
   - It contains a set of libraries and other files that JVM uses at runtime.
   - If you only want to *run* Java programs, you only need JRE.

3. **JDK (Java Development Kit)**
   - JDK is a software development environment used to develop Java applications and applets.
   - It physically exists. It contains JRE + development tools (like compiler \`javac\`, debugger, etc.).

### Features of Java (Buzzwords)
- **Simple:** Clean syntax, easy to learn. No pointers.
- **Object-Oriented:** Everything in Java is an object (except primitive types).
- **Platform Independent:** Java code is compiled into bytecode, which can run on any system with a JVM.
- **Secured:** No explicit pointers, programs run inside a virtual machine sandbox.
- **Robust:** Strong memory management, automatic garbage collection, exception handling.
- **Multithreaded:** Can perform multiple tasks simultaneously.`,
          keyPoints: [
            'JDK = JRE + Development Tools',
            'JRE = JVM + Library Classes',
            'JVM translates bytecode into machine code.',
            'Java is platform-independent but JVM is platform-dependent.'
          ],
          examples: [
            {
              title: 'Hello World in Java',
              code: `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
              output: 'Hello, World!',
              explanation: 'This is a basic Java program. Every Java program must have a class and a main method as the starting point of execution.'
            }
          ],
          mcqs: [
            {
              question: 'Which component is responsible for converting bytecode into machine-specific code?',
              options: ['JDK', 'JRE', 'JVM', 'JIT'],
              correctAnswer: 2,
              explanation: 'The JVM (Java Virtual Machine) interprets the compiled bytecode into machine code for the specific platform.'
            },
            {
              question: 'What does WORA stand for in Java?',
              options: ['Write Once, Run Anywhere', 'Write Object, Read Array', 'Wait Or Run Away', 'None of the above'],
              correctAnswer: 0,
              explanation: 'WORA stands for Write Once, Run Anywhere, highlighting Java\'s platform independence.'
            },
            {
              question: 'Which of the following is required only to RUN a Java program, not develop it?',
              options: ['JDK', 'JRE', 'Compiler', 'Debugger'],
              correctAnswer: 1,
              explanation: 'JRE provides the runtime environment and libraries necessary to run Java applications.'
            }
          ]
        },
        {
          id: 'data-types',
          title: 'Data Types, Variables, Operators',
          simpleExplanation: 'Variables are containers for storing data values. Data types specify what kind of data can be stored. Operators are special symbols that perform specific operations on one, two, or three operands.',
          detailedExplanation: `## Data Types in Java
Java is a statically typed language, which means every variable must be declared with a data type before it can be used.

### Primitive Data Types
There are 8 primitive data types in Java:
1. **byte:** 1 byte (8 bits). Range: -128 to 127
2. **short:** 2 bytes (16 bits)
3. **int:** 4 bytes (32 bits). Default choice for integer values.
4. **long:** 8 bytes (64 bits). Suffix with 'L'.
5. **float:** 4 bytes (32 bits). Suffix with 'f'.
6. **double:** 8 bytes (64 bits). Default choice for decimals.
7. **boolean:** 1 bit of information (true or false).
8. **char:** 2 bytes (16 bits). Stores a single character (Unicode).

### Variables
A variable is a named memory location.
- **Local Variable:** Declared inside a method. Must be initialized before use.
- **Instance Variable:** Declared inside a class but outside methods. Initialized automatically.
- **Static Variable:** Declared with \`static\`. Shared among all objects of the class.

### Operators
- **Arithmetic:** \`+, -, *, /, %\`
- **Relational:** \`==, !=, >, <, >=, <=\`
- **Logical:** \`&&, ||, !\`
- **Assignment:** \`=, +=, -=\`, etc.
- **Unary:** \`++, --\`
- **Ternary:** \`condition ? true_value : false_value\``,
          keyPoints: [
            'Java has 8 primitive data types.',
            'String is NOT a primitive data type; it is a class (Reference type).',
            'Local variables do not get default values.',
            'Ternary operator is a shorthand for if-else.'
          ],
          examples: [
            {
              title: 'Variables and Operators Example',
              code: `public class Main {
    public static void main(String[] args) {
        int a = 10;
        int b = 20;
        boolean isGreater = a > b;
        
        System.out.println("Sum: " + (a + b));
        System.out.println("Is a > b? " + isGreater);
        
        // Ternary Operator
        int max = (a > b) ? a : b;
        System.out.println("Max value is: " + max);
    }
}`,
              output: 'Sum: 30\nIs a > b? false\nMax value is: 20',
              explanation: 'Demonstrates basic arithmetic, relational, and ternary operators using int and boolean variables.'
            }
          ],
          mcqs: [
            {
              question: 'What is the size of the `int` data type in Java?',
              options: ['2 bytes', '4 bytes', '8 bytes', 'Depends on OS'],
              correctAnswer: 1,
              explanation: 'In Java, an `int` is always 4 bytes (32 bits), regardless of the operating system.'
            },
            {
              question: 'Which of these is NOT a primitive data type in Java?',
              options: ['boolean', 'byte', 'String', 'char'],
              correctAnswer: 2,
              explanation: 'String is a reference data type (a class), not a primitive.'
            },
            {
              question: 'What is the default value of a local variable?',
              options: ['0', 'null', 'false', 'No default value, gives compilation error if used uninitialized'],
              correctAnswer: 3,
              explanation: 'Local variables are not assigned default values in Java. They must be initialized before use.'
            }
          ]
        },
        {
          id: 'control-statements',
          title: 'Control Statements (if-else, switch, loops)',
          simpleExplanation: 'Control statements manage the flow of program execution. You can make decisions using if-else/switch, and repeat tasks using loops (for, while, do-while).',
          detailedExplanation: `## Control Flow Statements
Control flow statements direct the order in which code executes in a Java program.

### Decision Making (Conditional)
1. **if-else statement:** Executes a block of code based on a boolean condition.
   \`\`\`java
   if (condition) { // code } else { // code }
   \`\`\`
2. **switch statement:** Allows a variable to be tested for equality against a list of values (cases). Works with primitives, Strings, and Enums.
   \`\`\`java
   switch(variable) {
       case 1: // code; break;
       default: // code;
   }
   \`\`\`

### Looping (Iteration)
1. **for loop:** Use when the number of iterations is known.
   \`\`\`java
   for (initialization; condition; increment/decrement) { }
   \`\`\`
2. **while loop:** Use when the number of iterations is unknown, condition is checked *before* execution.
3. **do-while loop:** Similar to while, but condition is checked *after* execution. Guarantees at least one execution.

### Jump Statements
- **break:** Exits the loop or switch entirely.
- **continue:** Skips the current iteration and moves to the next one.`,
          keyPoints: [
            'Use `for` loop when iterations are fixed.',
            'Use `while` loop when iterations depend on a condition.',
            '`do-while` loop executes at least once.',
            '`switch` can evaluate Strings starting from Java 7.'
          ],
          examples: [
            {
              title: 'Loop and Condition Example',
              code: `public class ControlFlow {
    public static void main(String[] args) {
        for(int i = 1; i <= 5; i++) {
            if (i == 3) {
                continue; // Skip printing 3
            }
            System.out.println("Value: " + i);
        }
    }
}`,
              output: 'Value: 1\nValue: 2\nValue: 4\nValue: 5',
              explanation: 'The loop runs from 1 to 5. When i is 3, continue skips the rest of the loop body, so 3 is not printed.'
            }
          ],
          mcqs: [
            {
              question: 'Which loop guarantees at least one execution of its body?',
              options: ['for loop', 'while loop', 'do-while loop', 'enhanced for loop'],
              correctAnswer: 2,
              explanation: 'The do-while loop evaluates its condition at the bottom, so the code block runs at least once.'
            },
            {
              question: 'Which statement is used to exit a loop prematurely?',
              options: ['continue', 'break', 'exit', 'return'],
              correctAnswer: 1,
              explanation: 'The break statement immediately terminates the loop or switch it is inside.'
            },
            {
              question: 'Can we use a String in a switch case in Java?',
              options: ['Yes, always', 'No, never', 'Yes, since Java 7', 'Yes, only in Java 8 and above'],
              correctAnswer: 2,
              explanation: 'String support in switch statements was introduced in Java 7.'
            }
          ]
        },
        {
          id: 'arrays',
          title: 'Arrays (1D, 2D, jagged)',
          simpleExplanation: 'An array is a collection of similar types of data stored in contiguous memory locations. Arrays have a fixed size once created.',
          detailedExplanation: `## Arrays in Java
An array is an object which contains elements of a similar data type. The elements of an array are stored in a contiguous memory location.

### Key Characteristics
- **Fixed Size:** Once an array is created, its size cannot be changed.
- **0-Indexed:** The first element is at index 0.
- **length property:** Every array has a \`length\` property that returns its size.

### Types of Arrays
1. **Single Dimensional Array (1D):** A simple list of values.
   \`\`\`java
   int[] arr = new int[5]; // Declaration and instantiation
   int[] arr2 = {10, 20, 30}; // Initialization
   \`\`\`

2. **Multidimensional Arrays (2D):** Arrays of arrays. Often represented as a matrix (rows and columns).
   \`\`\`java
   int[][] matrix = new int[3][3];
   \`\`\`

3. **Jagged Arrays:** A 2D array where the rows have different lengths.
   \`\`\`java
   int[][] jagged = new int[3][];
   jagged[0] = new int[2];
   jagged[1] = new int[4];
   jagged[2] = new int[3];
   \`\`\`

### ArrayIndexOutOfBoundsException
If you try to access an index that is negative or greater than or equal to the size of the array, JVM throws this runtime exception.`,
          keyPoints: [
            'Arrays in Java are dynamically allocated on the heap.',
            'Array sizes are fixed upon creation.',
            'Jagged arrays are multidimensional arrays with varying column lengths.',
            'Use `array.length` to get the size.'
          ],
          examples: [
            {
              title: 'Jagged Array Example',
              code: `public class JaggedArray {
    public static void main(String[] args) {
        int[][] arr = new int[2][]; // 2 rows
        arr[0] = new int[2]; // Row 0 has 2 cols
        arr[1] = new int[3]; // Row 1 has 3 cols

        int count = 0;
        // Populate
        for (int i = 0; i < arr.length; i++) {
            for (int j = 0; j < arr[i].length; j++) {
                arr[i][j] = count++;
                System.out.print(arr[i][j] + " ");
            }
            System.out.println(); // Next line
        }
    }
}`,
              output: '0 1 \n2 3 4 ',
              explanation: 'Notice how the first row prints 2 elements and the second row prints 3 elements.'
            }
          ],
          mcqs: [
            {
              question: 'What is a jagged array?',
              options: ['An array with negative indices', 'A multidimensional array where rows have different lengths', 'An array that resizes dynamically', 'An array containing mixed data types'],
              correctAnswer: 1,
              explanation: 'A jagged array is an array of arrays where each sub-array can have a different length.'
            },
            {
              question: 'How do you find the length of an array named `arr`?',
              options: ['arr.length()', 'arr.size', 'arr.length', 'arr.size()'],
              correctAnswer: 2,
              explanation: 'In Java, arrays have a property named `length` (no parentheses).'
            },
            {
              question: 'What exception is thrown if you access an invalid array index?',
              options: ['NullPointerException', 'IndexNotFoundException', 'ArrayMismatchException', 'ArrayIndexOutOfBoundsException'],
              correctAnswer: 3,
              explanation: 'Java throws an ArrayIndexOutOfBoundsException when trying to access an invalid index.'
            }
          ]
        },
        {
          id: 'classes-objects',
          title: 'Classes and Objects',
          simpleExplanation: 'A class is a blueprint or template, while an object is a real-world entity built from that blueprint. A class defines properties (variables) and behaviors (methods).',
          detailedExplanation: `## Classes and Objects
Java is deeply object-oriented. Everything is modeled as objects interacting with each other.

### What is a Class?
A class is a user-defined blueprint or prototype from which objects are created. It represents the set of properties or methods that are common to all objects of one type.
- **Fields (State):** Data variables inside the class.
- **Methods (Behavior):** Functions inside the class that operate on the data.

### What is an Object?
An object is a basic unit of Object-Oriented Programming and represents real-life entities. An object is an *instance* of a class.
Creating an object involves three steps:
1. **Declaration:** Associating a variable name with an object type.
2. **Instantiation:** The \`new\` keyword is used to create the object.
3. **Initialization:** The \`new\` keyword is followed by a call to a constructor, which initializes the new object.

### The \`new\` Keyword
The \`new\` keyword dynamically allocates memory for an object on the **heap** and returns a reference to it.

\`\`\`java
class Student {
    int id;
    String name;
}
// Creating object:
Student s1 = new Student();
\`\`\``,
          keyPoints: [
            'Class is a logical entity; Object is a physical entity (takes memory).',
            'Objects are created on the Heap memory area.',
            'Multiple objects can be created from a single class.',
            'Instance variables are distinct for every object.'
          ],
          examples: [
            {
              title: 'Class and Object Basics',
              code: `class Car {
    String brand;
    int speed;

    void drive() {
        System.out.println(brand + " is driving at " + speed + " km/h.");
    }
}

public class Main {
    public static void main(String[] args) {
        Car myCar = new Car(); // Object creation
        myCar.brand = "Toyota";
        myCar.speed = 120;
        myCar.drive(); // Method call
    }
}`,
              output: 'Toyota is driving at 120 km/h.',
              explanation: 'We defined a Car class with properties brand and speed. Then we created an object `myCar`, set its properties, and invoked its behavior.'
            }
          ],
          mcqs: [
            {
              question: 'Where is memory allocated for objects in Java?',
              options: ['Stack', 'Heap', 'Method Area', 'ROM'],
              correctAnswer: 1,
              explanation: 'Objects are always created on the Heap memory in Java.'
            },
            {
              question: 'Which keyword is used to allocate memory for an object?',
              options: ['alloc', 'create', 'new', 'instance'],
              correctAnswer: 2,
              explanation: 'The `new` keyword is used for memory allocation and object creation.'
            },
            {
              question: 'A class is a _______ entity, while an object is a ________ entity.',
              options: ['physical, logical', 'logical, physical', 'static, dynamic', 'dynamic, static'],
              correctAnswer: 1,
              explanation: 'A class is a blueprint (logical), while an object actually takes up memory space (physical).'
            }
          ]
        }
      ]
    },
    {
      id: 'unit-2',
      title: 'UNIT 2: Four Pillars of OOP',
      description: 'Deep dive into the core principles of Object Oriented Programming: Encapsulation, Inheritance, Polymorphism, and Abstraction.',
      topics: [
        {
          id: 'encapsulation',
          title: 'Encapsulation (access modifiers, getters/setters)',
          simpleExplanation: 'Encapsulation is like a capsule that wraps data (variables) and code (methods) together as a single unit. It hides internal data from the outside world using private variables and public getters/setters.',
          detailedExplanation: `## Encapsulation
Encapsulation in Java is the process of wrapping code and data together into a single unit. Think of a medical capsule, which contains mixed medicines inside.

### How to achieve Encapsulation
1. Declare the variables of a class as \`private\`.
2. Provide public \`setter\` and \`getter\` methods to modify and view the variable values.

### Why use Encapsulation?
- **Data Hiding:** The internal state is hidden. Other classes cannot directly access the variables.
- **Control over data:** You can make variables read-only (only getter) or write-only (only setter). You can also add validation logic inside setters.
- **Flexibility:** The internal implementation can be changed without breaking the code that uses the class.

### Access Modifiers
Java has 4 access modifiers:
1. **private:** Accessible only within the same class.
2. **default (no keyword):** Accessible only within the same package.
3. **protected:** Accessible within the same package and subclasses in other packages.
4. **public:** Accessible from anywhere.`,
          keyPoints: [
            'Encapsulation = Data Hiding + Abstraction.',
            'Variables should be private, methods should be public.',
            'Getters (accessors) return the value; Setters (mutators) modify the value.',
            'Allows adding validation checks inside the setter method.'
          ],
          examples: [
            {
              title: 'Encapsulation Example',
              code: `class Employee {
    private double salary; // Hidden data

    // Getter
    public double getSalary() {
        return salary;
    }

    // Setter with validation
    public void setSalary(double amount) {
        if (amount > 0) {
            this.salary = amount;
        } else {
            System.out.println("Invalid salary!");
        }
    }
}

public class Main {
    public static void main(String[] args) {
        Employee emp = new Employee();
        emp.setSalary(50000);
        System.out.println("Salary: " + emp.getSalary());
        
        emp.setSalary(-100); // Fails validation
    }
}`,
              output: 'Salary: 50000.0\nInvalid salary!',
              explanation: 'The salary variable is private. It cannot be set to a negative value because the setter method validates the input.'
            }
          ],
          mcqs: [
            {
              question: 'Which access modifier restricts access the most?',
              options: ['public', 'protected', 'default', 'private'],
              correctAnswer: 3,
              explanation: 'private restricts access to only within the same class.'
            },
            {
              question: 'What is the primary benefit of Encapsulation?',
              options: ['Code reusability', 'Data hiding and security', 'Faster execution', 'Multiple inheritance'],
              correctAnswer: 1,
              explanation: 'Encapsulation hides the internal state of objects, protecting data from unauthorized access or modification.'
            },
            {
              question: 'If a class has only getter methods and no setters, the class is:',
              options: ['Write-only', 'Read-only', 'Abstract', 'Invalid'],
              correctAnswer: 1,
              explanation: 'Without setters, the properties cannot be modified from outside, making the class read-only.'
            }
          ]
        },
        {
          id: 'inheritance',
          title: 'Inheritance (types, why no multiple)',
          simpleExplanation: 'Inheritance allows a new class (child) to inherit properties and behaviors from an existing class (parent). This promotes code reuse.',
          detailedExplanation: `## Inheritance
Inheritance is a mechanism in which one object acquires all the properties and behaviors of a parent object. The keyword used is \`extends\`.

- **Super Class (Parent/Base Class):** The class whose features are inherited.
- **Sub Class (Child/Derived Class):** The class that inherits the other class.

### Types of Inheritance in Java
1. **Single Inheritance:** Class B extends Class A.
2. **Multilevel Inheritance:** Class C extends Class B, and Class B extends Class A.
3. **Hierarchical Inheritance:** Class B and Class C both extend Class A.

### Why Multiple Inheritance is NOT supported in Java through Classes?
Java does not support Multiple Inheritance (where Class C extends both Class A and Class B) to prevent the **Diamond Problem**. 
If Class A and Class B both have a method named \`msg()\`, and Class C calls \`msg()\`, the compiler will be confused about which method to execute. This ambiguity is removed by simply not supporting multiple inheritance for classes. (Note: It is supported via Interfaces).

### IS-A Relationship
Inheritance represents an IS-A relationship. For example, a Dog IS-A Animal.`,
          keyPoints: [
            'Keyword `extends` is used for inheritance.',
            'Promotes Code Reusability and Method Overriding (Run-time Polymorphism).',
            'Constructors and private members are NOT inherited.',
            'Multiple inheritance is not supported through classes to avoid ambiguity.'
          ],
          examples: [
            {
              title: 'Single Inheritance Example',
              code: `class Animal {
    void eat() {
        System.out.println("Eating...");
    }
}

class Dog extends Animal {
    void bark() {
        System.out.println("Barking...");
    }
}

public class Main {
    public static void main(String[] args) {
        Dog d = new Dog();
        d.eat();  // Inherited method
        d.bark(); // Own method
    }
}`,
              output: 'Eating...\nBarking...',
              explanation: 'Dog class inherits the eat() method from the Animal class.'
            }
          ],
          mcqs: [
            {
              question: 'Which keyword is used to inherit a class?',
              options: ['implements', 'inherits', 'extends', 'super'],
              correctAnswer: 2,
              explanation: 'The `extends` keyword is used for class inheritance in Java.'
            },
            {
              question: 'Which type of inheritance is NOT supported by Java classes?',
              options: ['Single', 'Multilevel', 'Hierarchical', 'Multiple'],
              correctAnswer: 3,
              explanation: 'Java does not support Multiple Inheritance with classes to avoid the Diamond Problem (ambiguity).'
            },
            {
              question: 'Are constructors inherited by subclasses?',
              options: ['Yes', 'No', 'Only default constructors', 'Only parameterized constructors'],
              correctAnswer: 1,
              explanation: 'Constructors are not members of a class, so they are not inherited. However, the superclass constructor is called when a subclass object is created.'
            }
          ]
        },
        {
          id: 'polymorphism',
          title: 'Polymorphism (Overloading vs Overriding)',
          simpleExplanation: 'Polymorphism means "many forms". It allows us to perform a single action in different ways. We achieve this through Method Overloading (Compile-time) and Method Overriding (Run-time).',
          detailedExplanation: `## Polymorphism
Polymorphism allows objects to be treated as instances of their parent class rather than their actual class. 

### 1. Compile-Time Polymorphism (Method Overloading)
Occurs when a class has multiple methods with the **same name but different parameters** (different type, number, or order of arguments). 
- Resolved by the compiler.
- Return type doesn't matter for overloading.

### 2. Run-Time Polymorphism (Method Overriding)
Occurs when a subclass provides a specific implementation for a method that is already defined in its parent class.
- Must have the **same method signature** (same name and parameters).
- Achieved using inheritance.
- Resolved by the JVM at runtime based on the actual object type (Dynamic Method Dispatch).

### Dynamic Method Dispatch
This is the mechanism by which a call to an overridden method is resolved at runtime. 
\`\`\`java
Parent obj = new Child();
obj.show(); // Calls Child's show() method
\`\`\`
The reference variable is of type Parent, but the object is of type Child. The JVM checks the object type at runtime and executes the Child's method.`,
          keyPoints: [
            'Overloading happens in the SAME class; Overriding happens in Parent-Child classes.',
            'Overloading is Compile-time polymorphism; Overriding is Run-time polymorphism.',
            'In Overriding, you cannot restrict the access modifier (e.g., if parent method is protected, child method must be protected or public).',
            'Private, static, and final methods CANNOT be overridden.'
          ],
          examples: [
            {
              title: 'Overloading vs Overriding',
              code: `class Calculator {
    // Overloading
    int add(int a, int b) { return a + b; }
    int add(int a, int b, int c) { return a + b + c; }
}

class Animal {
    void sound() { System.out.println("Some sound"); }
}

class Cat extends Animal {
    // Overriding
    @Override
    void sound() { System.out.println("Meow"); }
}

public class Main {
    public static void main(String[] args) {
        Calculator calc = new Calculator();
        System.out.println(calc.add(2, 3));       // 5
        System.out.println(calc.add(2, 3, 4));    // 9

        Animal myAnimal = new Cat(); // Upcasting
        myAnimal.sound();            // Meow (Dynamic dispatch)
    }
}`,
              output: '5\n9\nMeow',
              explanation: 'Calculator shows overloading (same method name, different params). Animal/Cat shows overriding (child replaces parent method).'
            }
          ],
          mcqs: [
            {
              question: 'Method Overloading is an example of:',
              options: ['Run-time Polymorphism', 'Compile-time Polymorphism', 'Encapsulation', 'Abstraction'],
              correctAnswer: 1,
              explanation: 'The compiler determines which overloaded method to call based on the arguments passed, hence compile-time.'
            },
            {
              question: 'Which methods cannot be overridden?',
              options: ['public', 'protected', 'static', 'default'],
              correctAnswer: 2,
              explanation: 'Static methods belong to the class, not the object, so they cannot be overridden (they can be hidden).'
            },
            {
              question: 'What is Dynamic Method Dispatch?',
              options: ['Resolving method calls at compile time', 'Resolving an overridden method call at runtime', 'Throwing an exception for missing methods', 'None of the above'],
              correctAnswer: 1,
              explanation: 'It is the mechanism by which a call to an overridden method is resolved at runtime based on the actual object type.'
            }
          ]
        },
        {
          id: 'abstraction',
          title: 'Abstraction (abstract classes vs interfaces)',
          simpleExplanation: 'Abstraction means hiding the complex implementation details and showing only the essential features to the user. Like driving a car: you know how to use the steering wheel, but you do not need to know how the engine works.',
          detailedExplanation: `## Abstraction
Abstraction focuses on *what* the object does instead of *how* it does it. It is achieved using Abstract classes and Interfaces.

### Abstract Class (0 to 100% Abstraction)
- Declared with the \`abstract\` keyword.
- **Cannot be instantiated** (cannot create objects of it).
- Can contain both abstract methods (methods without a body) and concrete methods (methods with a body).
- Can have constructors and static methods.
- A child class must implement all abstract methods of the parent, or the child must also be declared abstract.

### Interface (100% Abstraction)
- A blueprint of a class declared with the \`interface\` keyword.
- Contains ONLY abstract methods (before Java 8). Since Java 8, interfaces can have \`default\` and \`static\` methods.
- Variables in an interface are implicitly \`public static final\` (constants).
- A class implements an interface using the \`implements\` keyword.
- Used to achieve **Multiple Inheritance** in Java.

### Abstract Class vs Interface
1. **Inheritance:** Class extends 1 abstract class; Class implements multiple interfaces.
2. **Methods:** Abstract class has both; Interface mainly has abstract methods.
3. **Variables:** Abstract class can have instance variables; Interface only has static final variables.`,
          keyPoints: [
            'Abstract classes cannot be instantiated using `new`.',
            'Interfaces are used to achieve multiple inheritance.',
            'Interface variables are `public static final` by default.',
            'Interface methods are `public abstract` by default.'
          ],
          examples: [
            {
              title: 'Abstract Class and Interface',
              code: `interface Walkable {
    void walk(); // public abstract by default
}

abstract class Vehicle {
    abstract void start(); // Abstract method
    void stop() { // Concrete method
        System.out.println("Vehicle stopped.");
    }
}

class Robot extends Vehicle implements Walkable {
    void start() {
        System.out.println("Robot starting engine...");
    }
    public void walk() {
        System.out.println("Robot is walking...");
    }
}

public class Main {
    public static void main(String[] args) {
        Robot r = new Robot();
        r.start();
        r.walk();
        r.stop();
    }
}`,
              output: 'Robot starting engine...\nRobot is walking...\nVehicle stopped.',
              explanation: 'Robot extends the abstract class Vehicle (implementing start) and implements the interface Walkable (implementing walk).'
            }
          ],
          mcqs: [
            {
              question: 'Can you create an object of an abstract class?',
              options: ['Yes', 'No', 'Only if it has no abstract methods', 'Only inside the same package'],
              correctAnswer: 1,
              explanation: 'Abstract classes are incomplete and cannot be instantiated directly.'
            },
            {
              question: 'Variables declared in an interface are implicitly:',
              options: ['private and final', 'public static final', 'protected static', 'default'],
              correctAnswer: 1,
              explanation: 'By default, interface variables are constants (public static final).'
            },
            {
              question: 'Which keyword is used by a class to use an interface?',
              options: ['extends', 'inherits', 'implements', 'uses'],
              correctAnswer: 2,
              explanation: 'A class `implements` an interface to define its abstract methods.'
            }
          ]
        }
      ]
    },
    {
      id: 'unit-3',
      title: 'UNIT 3: Advanced OOP Concepts',
      description: 'Understanding constructors, key keywords like this, super, static, and final, and organizing code using packages.',
      topics: [
        {
          id: 'constructors',
          title: 'Constructors (types, chaining)',
          simpleExplanation: 'A constructor is a special method used to initialize objects. It is called automatically when an object is created. It has the same name as the class and no return type.',
          detailedExplanation: `## Constructors
A constructor in Java is a special block of code that initializes a newly created object.

### Rules for Constructors:
1. Constructor name must be exactly the **same as the class name**.
2. Constructor must **not have an explicit return type** (not even void).
3. It cannot be abstract, static, final, or synchronized.

### Types of Constructors:
1. **Default Constructor (No-arg):** If you don't write any constructor, the compiler provides a default one that initializes variables to their default values (e.g., 0, null). If you write a no-arg constructor, you can put custom initialization logic.
2. **Parameterized Constructor:** A constructor that takes parameters to provide different values to distinct objects upon creation.
3. **Copy Constructor:** Java doesn't have a formal copy constructor like C++, but you can create one by passing an object of the same class as a parameter.

### Constructor Chaining
Calling one constructor from another constructor of the same class is called constructor chaining. It is done using the \`this()\` keyword.
- \`this()\` must be the **first statement** in the constructor.`,
          keyPoints: [
            'Constructors do not return any value.',
            'If you write a parameterized constructor, the compiler WILL NOT provide a default constructor.',
            '`this()` is used to call another constructor in the same class.',
            'Constructor chaining prevents duplicate code.'
          ],
          examples: [
            {
              title: 'Constructor Overloading and Chaining',
              code: `class Student {
    String name;
    int age;

    // Default
    Student() {
        this("Unknown", 18); // Calls parameterized constructor
        System.out.println("Default constructor called.");
    }

    // Parameterized
    Student(String name, int age) {
        this.name = name;
        this.age = age;
        System.out.println("Parameterized constructor called for " + name);
    }
}

public class Main {
    public static void main(String[] args) {
        Student s1 = new Student(); 
    }
}`,
              output: 'Parameterized constructor called for Unknown\nDefault constructor called.',
              explanation: 'Creating s1 triggers the default constructor. The default constructor first calls `this("Unknown", 18)`, jumping to the parameterized constructor. After the parameterized constructor finishes, the default constructor completes.'
            }
          ],
          mcqs: [
            {
              question: 'Which of the following is true about constructors?',
              options: ['They can have a return type.', 'They can be declared static.', 'They have the same name as the class.', 'They must be private.'],
              correctAnswer: 2,
              explanation: 'A constructor must have the exact same name as the class it belongs to.'
            },
            {
              question: 'What happens if you don\'t define any constructor in a class?',
              options: ['Compilation error', 'Runtime exception', 'Compiler generates a default no-argument constructor', 'The class cannot be instantiated'],
              correctAnswer: 2,
              explanation: 'If no constructors are defined, the Java compiler automatically inserts a default no-arg constructor.'
            },
            {
              question: 'What is used to call another constructor in the SAME class?',
              options: ['super()', 'this()', 'new()', 'parent()'],
              correctAnswer: 1,
              explanation: '`this()` is used for constructor chaining within the same class.'
            }
          ]
        },
        {
          id: 'this-super',
          title: 'this and super keywords',
          simpleExplanation: '`this` refers to the CURRENT object. `super` refers to the PARENT class object. They are crucial for resolving naming conflicts and calling parent class methods/constructors.',
          detailedExplanation: `## \`this\` Keyword
\`this\` is a reference variable that refers to the current object.

**Uses of \`this\`:**
1. Refer to current class instance variables (resolves shadowing when parameter name equals instance variable name).
2. Invoke current class method implicitly.
3. Invoke current class constructor: \`this()\`.
4. Return the current class instance.

## \`super\` Keyword
\`super\` is a reference variable used to refer to the immediate parent class object.

**Uses of \`super\`:**
1. Refer to immediate parent class instance variable (if child hides it).
2. Invoke immediate parent class method (useful when method is overridden).
3. Invoke immediate parent class constructor: \`super()\`.

### Important Note on Constructors
Whenever you create an object of a child class, the compiler automatically inserts \`super()\` as the first line of the child constructor, ensuring the parent class is initialized first.`,
          keyPoints: [
            '`this` = current object; `super` = parent object.',
            '`this()` and `super()` must be the FIRST statement in a constructor.',
            'You cannot use `this()` and `super()` together in the same constructor block.',
            'Both keywords cannot be used in `static` contexts.'
          ],
          examples: [
            {
              title: 'Using this and super',
              code: `class Parent {
    int x = 10;
    Parent() {
        System.out.println("Parent Constructor");
    }
}

class Child extends Parent {
    int x = 20; // Hides parent's x

    Child(int x) {
        super(); // Calls Parent constructor (implicitly there anyway)
        System.out.println("Child Constructor");
        System.out.println("Local x: " + x);
        System.out.println("Instance x: " + this.x);
        System.out.println("Parent x: " + super.x);
    }
}

public class Main {
    public static void main(String[] args) {
        Child c = new Child(30);
    }
}`,
              output: 'Parent Constructor\nChild Constructor\nLocal x: 30\nInstance x: 20\nParent x: 10',
              explanation: 'Shows how local variables, this (current instance), and super (parent instance) interact when variable names are identical.'
            }
          ],
          mcqs: [
            {
              question: 'Which keyword is used to access an overridden method of the parent class?',
              options: ['this', 'super', 'parent', 'base'],
              correctAnswer: 1,
              explanation: '`super.methodName()` allows you to call the parent\'s version of an overridden method.'
            },
            {
              question: 'Where must `super()` or `this()` be placed inside a constructor?',
              options: ['Anywhere', 'Last line', 'First line', 'Outside the constructor'],
              correctAnswer: 2,
              explanation: 'Calls to `this()` or `super()` must be the very first statement in a constructor.'
            },
            {
              question: 'Can `this` be used inside a static method?',
              options: ['Yes', 'No', 'Only if the class is public', 'Only in Java 8+'],
              correctAnswer: 1,
              explanation: 'Static methods belong to the class, not instances. `this` refers to an instance, so it cannot be used in a static context.'
            }
          ]
        },
        {
          id: 'static-final',
          title: 'static and final keywords',
          simpleExplanation: '`static` means "belongs to the class, not individual objects." `final` means "cannot be changed." A final variable is a constant, a final method cannot be overridden, a final class cannot be inherited.',
          detailedExplanation: `## The \`static\` Keyword
Used for memory management. If you apply static to a variable or method, it belongs to the class rather than instances of the class.

1. **Static Variable:** Shared among all objects. Memory is allocated only once in the class area.
2. **Static Method:** Can be called without creating an object (\`ClassName.methodName()\`). Can only access other static data/methods directly. Cannot use \`this\` or \`super\`.
3. **Static Block:** Used to initialize static variables. Executed *before* the main method at the time of class loading.

## The \`final\` Keyword
Used to restrict the user. 
1. **Final Variable:** Value cannot be modified once assigned (constant). Standard naming convention is UPPERCASE.
2. **Final Method:** Cannot be overridden by subclasses. Useful for preventing alteration of core logic.
3. **Final Class:** Cannot be inherited. (e.g., the \`String\` class in Java is final).`,
          keyPoints: [
            'Static members are accessed using the Class name.',
            'Static blocks execute exactly once when the class is loaded.',
            'Blank final variables can only be initialized inside a constructor.',
            'An abstract class cannot be final.'
          ],
          examples: [
            {
              title: 'Static and Final Demonstration',
              code: `class Counter {
    static int count = 0; // Shared memory
    final int MAX_LIMIT = 5; // Constant

    Counter() {
        count++;
        System.out.println("Count is: " + count);
    }
}

public class Main {
    public static void main(String[] args) {
        Counter c1 = new Counter();
        Counter c2 = new Counter();
        // c1.MAX_LIMIT = 10; // ERROR: cannot assign a value to final variable
        System.out.println("Total instances created: " + Counter.count);
    }
}`,
              output: 'Count is: 1\nCount is: 2\nTotal instances created: 2',
              explanation: 'Because count is static, c1 and c2 share it, and it increments continuously. MAX_LIMIT cannot be changed.'
            }
          ],
          mcqs: [
            {
              question: 'How many times is memory allocated for a static variable?',
              options: ['Once per object', 'Once per class load', 'Every time a method is called', 'Never'],
              correctAnswer: 1,
              explanation: 'Static variables get memory only once in the class area when the class is loaded into memory.'
            },
            {
              question: 'What happens if you try to inherit a final class?',
              options: ['It compiles fine', 'It throws a runtime exception', 'It causes a compile-time error', 'It becomes an abstract class'],
              correctAnswer: 2,
              explanation: 'A final class cannot be subclassed, so trying to extend it results in a compile-time error.'
            },
            {
              question: 'Which block executes first during class loading?',
              options: ['Constructor', 'Instance Initialization Block', 'Static Block', 'Main Method'],
              correctAnswer: 2,
              explanation: 'Static blocks are executed first, exactly once, when the class is loaded into memory.'
            }
          ]
        }
      ]
    },
    {
      id: 'unit-4',
      title: 'UNIT 4: Exception Handling & Multithreading',
      description: 'Handling runtime errors gracefully using try-catch blocks and running multiple tasks simultaneously using Threads.',
      topics: [
        {
          id: 'exception-handling',
          title: 'Exceptions (Checked vs Unchecked, try-catch-finally)',
          simpleExplanation: 'An exception is an unwanted event that disrupts normal program flow. We use try-catch blocks to "catch" these errors and handle them smoothly without crashing the program.',
          detailedExplanation: `## Exception Handling
An Exception is an abnormal condition that arises during the execution of a program. 

### Exception Hierarchy
\`Throwable\` is the root class. It has two main subclasses:
1. **Error:** Severe problems that applications should not try to catch (e.g., \`OutOfMemoryError\`, \`StackOverflowError\`).
2. **Exception:** Conditions that reasonable applications might want to catch.

### Types of Exceptions:
1. **Checked Exceptions:** Checked by the compiler at compile-time. (e.g., \`IOException\`, \`SQLException\`). You MUST handle them using try-catch or declare them using \`throws\`.
2. **Unchecked Exceptions:** Not checked at compile-time, occur at runtime. They extend \`RuntimeException\`. (e.g., \`ArithmeticException\`, \`NullPointerException\`).

### Keywords used in Exception Handling
- **try:** Block of code that might throw an exception.
- **catch:** Block of code that handles the exception.
- **finally:** Block of code that executes *whether an exception occurs or not*. Used for cleanup (closing files, DB connections).
- **throw:** Used to explicitly throw a single exception from inside a method.
- **throws:** Used in a method signature to declare that this method might throw an exception.`,
          keyPoints: [
            'Checked exceptions MUST be handled, Unchecked are optional.',
            '`finally` block ALWAYS executes, except if `System.exit()` is called.',
            'You can have multiple catch blocks for a single try block.',
            '`throw` is for an object; `throws` is for a class type in method signature.'
          ],
          examples: [
            {
              title: 'Try-Catch-Finally',
              code: `public class Main {
    public static void main(String[] args) {
        try {
            int result = 10 / 0; // ArithmeticException
            System.out.println(result);
        } catch (ArithmeticException e) {
            System.out.println("Error: Cannot divide by zero.");
        } finally {
            System.out.println("Finally block executed.");
        }
        System.out.println("Program continues...");
    }
}`,
              output: 'Error: Cannot divide by zero.\nFinally block executed.\nProgram continues...',
              explanation: 'The division by zero causes an exception. The catch block catches it, preventing a crash. Finally executes, and the program safely continues.'
            }
          ],
          mcqs: [
            {
              question: 'Which of these is a Checked Exception?',
              options: ['NullPointerException', 'ArithmeticException', 'IOException', 'ArrayIndexOutOfBoundsException'],
              correctAnswer: 2,
              explanation: 'IOException is checked at compile-time. The others are RuntimeExceptions (unchecked).'
            },
            {
              question: 'Which block is ALWAYS executed regardless of whether an exception is thrown?',
              options: ['try', 'catch', 'finally', 'throw'],
              correctAnswer: 2,
              explanation: 'The finally block contains crucial cleanup code and is guaranteed to run.'
            },
            {
              question: 'What is the keyword used to explicitly generate an exception?',
              options: ['throw', 'throws', 'catch', 'finally'],
              correctAnswer: 0,
              explanation: 'The `throw` keyword is used to explicitly throw a specific exception object.'
            }
          ]
        },
        {
          id: 'multithreading',
          title: 'Multithreading (Thread class, Runnable, Lifecycle)',
          simpleExplanation: 'Multithreading allows a program to do multiple things at exactly the same time. Think of it like multiple workers doing different parts of a job simultaneously to finish faster.',
          detailedExplanation: `## Multithreading in Java
A Thread is a lightweight sub-process, the smallest unit of processing. Multithreading is executing multiple threads simultaneously to maximize CPU utilization.

### How to Create a Thread
1. **By extending the \`Thread\` class:**
   Override the \`run()\` method. Start execution by calling \`start()\`.
2. **By implementing the \`Runnable\` interface:**
   Implement the \`run()\` method. Pass the Runnable instance to a Thread object, then call \`start()\`.
   *(This is preferred because Java doesn't support multiple inheritance of classes).*

### Thread Lifecycle States:
1. **New:** Thread object created but \`start()\` not called.
2. **Runnable:** \`start()\` called, waiting for CPU time.
3. **Running:** CPU is actively executing the \`run()\` method.
4. **Waiting/Blocked:** Thread is waiting for a resource or sleeping.
5. **Terminated/Dead:** \`run()\` method has completed execution.

### Synchronization
When multiple threads try to access a shared resource simultaneously, it can lead to inconsistent data. **Synchronization** ensures that only one thread can access the resource at a time using the \`synchronized\` keyword.`,
          keyPoints: [
            'Never call `run()` directly. Always call `start()` to spawn a new thread.',
            'Implementing Runnable is better design as it leaves room to extend another class.',
            '`Thread.sleep(ms)` pauses the thread.',
            'Synchronization prevents thread interference but can cause Deadlocks.'
          ],
          examples: [
            {
              title: 'Creating a Thread',
              code: `class MyTask implements Runnable {
    public void run() {
        for(int i = 1; i <= 3; i++) {
            System.out.println(Thread.currentThread().getName() + " is running " + i);
        }
    }
}

public class Main {
    public static void main(String[] args) {
        Thread t1 = new Thread(new MyTask());
        Thread t2 = new Thread(new MyTask());
        
        t1.setName("Worker-1");
        t2.setName("Worker-2");
        
        t1.start();
        t2.start();
    }
}`,
              output: 'Worker-1 is running 1\nWorker-2 is running 1\nWorker-1 is running 2\nWorker-2 is running 2\nWorker-1 is running 3\nWorker-2 is running 3\n(Note: Output order may vary as threads run concurrently)',
              explanation: 'Two threads are created and started. They execute the loop concurrently, interweaving their output.'
            }
          ],
          mcqs: [
            {
              question: 'Which method must be implemented when using the Runnable interface?',
              options: ['start()', 'run()', 'stop()', 'execute()'],
              correctAnswer: 1,
              explanation: 'The Runnable interface has a single abstract method named `run()`.'
            },
            {
              question: 'What happens if you call `run()` directly instead of `start()`?',
              options: ['Compilation error', 'Runtime exception', 'It behaves like a normal method call, no new thread is created', 'It works the same way'],
              correctAnswer: 2,
              explanation: 'Calling `run()` directly executes it on the current thread, defeating the purpose of multithreading.'
            },
            {
              question: 'Which keyword prevents multiple threads from accessing a block of code simultaneously?',
              options: ['volatile', 'synchronized', 'lock', 'static'],
              correctAnswer: 1,
              explanation: 'The `synchronized` keyword acts as a lock, ensuring thread safety.'
            }
          ]
        }
      ]
    },
    {
      id: 'unit-5',
      title: 'UNIT 5: Collections Framework & File I/O',
      description: 'Storing dynamic data using Lists, Sets, and Maps, and handling file reading/writing operations.',
      topics: [
        {
          id: 'collections-list-set',
          title: 'Collections (List, Set)',
          simpleExplanation: 'Unlike arrays, Collections can grow or shrink in size dynamically. Lists allow duplicates and keep order. Sets do NOT allow duplicates and do not guarantee order.',
          detailedExplanation: `## Collections Framework
A unified architecture for representing and manipulating collections of objects. The root interface is \`Collection\`.

### 1. List Interface
Maintains insertion order and allows duplicate elements.
- **ArrayList:** Uses a dynamic array internally. Fast for accessing elements, slow for insertions/deletions in the middle.
- **LinkedList:** Uses a doubly-linked list. Faster for insertions/deletions, slower for accessing elements.

### 2. Set Interface
A collection that contains NO duplicate elements.
- **HashSet:** Uses a Hash table. Fastest set, but does not maintain insertion order.
- **LinkedHashSet:** Maintains insertion order.
- **TreeSet:** Uses a Tree structure. Stores elements in sorted (ascending) order automatically.

### Iterating through Collections
You can traverse collections using:
1. Standard \`for\` loop (only for Lists)
2. Enhanced \`for-each\` loop
3. \`Iterator\` interface (safe for removing elements during traversal)`,
          keyPoints: [
            'Collections only store Objects (Reference types), not primitive types. (Use Integer instead of int).',
            'ArrayList is good for read-heavy operations.',
            'HashSet uniqueness is determined by `hashCode()` and `equals()` methods.',
            'TreeSet is sorted naturally.'
          ],
          examples: [
            {
              title: 'ArrayList vs HashSet',
              code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        // List: allows duplicates, ordered
        List<String> list = new ArrayList<>();
        list.add("Apple");
        list.add("Apple");
        System.out.println("List: " + list);

        // Set: no duplicates, unordered
        Set<String> set = new HashSet<>();
        set.add("Apple");
        set.add("Apple");
        System.out.println("Set: " + set);
    }
}`,
              output: 'List: [Apple, Apple]\nSet: [Apple]',
              explanation: 'List allows duplicate entries. The Set rejects the second "Apple" because duplicates are not allowed.'
            }
          ],
          mcqs: [
            {
              question: 'Which Collection maintains insertion order and allows duplicates?',
              options: ['HashSet', 'TreeSet', 'ArrayList', 'HashMap'],
              correctAnswer: 2,
              explanation: 'ArrayList implements the List interface, which allows duplicates and maintains order.'
            },
            {
              question: 'Which Set implementation keeps elements in ascending sorted order?',
              options: ['HashSet', 'LinkedHashSet', 'TreeSet', 'SortedArray'],
              correctAnswer: 2,
              explanation: 'TreeSet implements SortedSet and automatically sorts elements.'
            },
            {
              question: 'Can a Collection store primitive types like `int`?',
              options: ['Yes', 'No', 'Only in Java 8+', 'Only Lists can'],
              correctAnswer: 1,
              explanation: 'Collections can only store Objects. Primitives are automatically converted to their Wrapper classes (Autoboxing) e.g., int to Integer.'
            }
          ]
        },
        {
          id: 'collections-map',
          title: 'Map Interface',
          simpleExplanation: 'A Map stores data in Key-Value pairs, like a dictionary. You look up a "Key" (e.g., student ID) to find the "Value" (e.g., student Name).',
          detailedExplanation: `## Map Interface
A Map contains values on the basis of key-value pairs. It does NOT inherit from the \`Collection\` interface, but is part of the Collections Framework.

- **Keys must be unique.** If you insert a duplicate key, the old value is replaced by the new value.
- Values can be duplicated.

### Implementations:
1. **HashMap:** Unordered, unsorted. Fast constant-time performance for basic operations (\`get\` and \`put\`). Allows one null key.
2. **LinkedHashMap:** Maintains insertion order of keys.
3. **TreeMap:** Sorts the entries based on the natural ordering of keys. Does NOT allow null keys.

### Useful Methods:
- \`put(K key, V value)\`: Inserts an entry.
- \`get(Object key)\`: Returns the value for the key.
- \`containsKey(Object key)\`: Checks if key exists.
- \`keySet()\`: Returns a Set view of the keys.`,
          keyPoints: [
            'Maps store Key-Value pairs.',
            'Keys cannot be duplicated, values can.',
            'HashMap is the most commonly used Map implementation.',
            'Iterate over a Map using `map.keySet()` or `map.entrySet()`.'
          ],
          examples: [
            {
              title: 'HashMap Example',
              code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Map<Integer, String> students = new HashMap<>();
        
        students.put(101, "Alice");
        students.put(102, "Bob");
        students.put(101, "Charlie"); // Replaces Alice

        // Iterating
        for (Map.Entry<Integer, String> entry : students.entrySet()) {
            System.out.println("ID: " + entry.getKey() + ", Name: " + entry.getValue());
        }
    }
}`,
              output: 'ID: 101, Name: Charlie\nID: 102, Name: Bob',
              explanation: 'Because ID 101 is reused, the original value "Alice" is overwritten with "Charlie".'
            }
          ],
          mcqs: [
            {
              question: 'Does the Map interface extend the Collection interface?',
              options: ['Yes', 'No', 'Only in Java 8', 'It implements Collection'],
              correctAnswer: 1,
              explanation: 'Map is a separate branch in the Collections Framework hierarchy; it does not extend Collection.'
            },
            {
              question: 'What happens if you use `put()` with an existing key in a HashMap?',
              options: ['It throws an exception', 'It creates a duplicate entry', 'It ignores the new entry', 'It replaces the old value with the new value'],
              correctAnswer: 3,
              explanation: 'Maps do not allow duplicate keys. The existing value is overwritten.'
            },
            {
              question: 'Which Map maintains the keys in sorted order?',
              options: ['HashMap', 'TreeMap', 'LinkedHashMap', 'SortedMapSet'],
              correctAnswer: 1,
              explanation: 'TreeMap sorts the entries based on the natural ordering of keys.'
            }
          ]
        },
        {
          id: 'file-io',
          title: 'File I/O (FileReader, FileWriter)',
          simpleExplanation: 'File I/O (Input/Output) is how Java reads data from files on your hard drive, or writes data to files. We use Reader/Writer classes for text files.',
          detailedExplanation: `## File I/O in Java
The \`java.io\` package contains classes for system input and output.

### Character Streams (Text Files)
Used to read/write 16-bit Unicode characters. Best for text files (.txt, .csv).
- **FileWriter:** Writes character data to a file.
- **FileReader:** Reads character data from a file.
- **BufferedWriter/BufferedReader:** Wraps the FileReader/FileWriter to provide buffering, significantly improving performance (e.g., reading line-by-line using \`readLine()\`).

### Byte Streams (Binary Files)
Used to read/write 8-bit bytes. Best for binary data like images, audio, video.
- **FileInputStream / FileOutputStream**

### Exception Handling in I/O
File operations almost always throw \`IOException\` (a checked exception), so you MUST wrap file code in try-catch blocks. 

*Tip: Use "Try-with-resources" (introduced in Java 7) to automatically close files and prevent memory leaks.*`,
          keyPoints: [
            'Use Character streams (Readers/Writers) for Text.',
            'Use Byte streams (Input/Output Streams) for Binary data (images).',
            'Always close file resources to avoid memory leaks.',
            'Try-with-resources automatically closes streams.'
          ],
          examples: [
            {
              title: 'Writing and Reading a Text File',
              code: `import java.io.*;

public class Main {
    public static void main(String[] args) {
        String path = "test.txt";
        
        // Writing to file
        try (FileWriter fw = new FileWriter(path)) {
            fw.write("Hello, File I/O in Java!");
        } catch (IOException e) {
            e.printStackTrace();
        }

        // Reading from file
        try (BufferedReader br = new BufferedReader(new FileReader(path))) {
            String line = br.readLine();
            System.out.println("Read from file: " + line);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}`,
              output: 'Read from file: Hello, File I/O in Java!',
              explanation: 'The code creates a file, writes a string to it, and then reads that string back. Try-with-resources `( ... )` ensures files are closed.'
            }
          ],
          mcqs: [
            {
              question: 'Which class is best suited for reading text files line-by-line?',
              options: ['FileInputStream', 'FileReader', 'BufferedReader', 'ScannerStream'],
              correctAnswer: 2,
              explanation: 'BufferedReader has a handy `readLine()` method and provides performance improvements via buffering.'
            },
            {
              question: 'Which stream should be used to read an image file?',
              options: ['FileReader', 'FileInputStream', 'StringReader', 'ImageReader'],
              correctAnswer: 1,
              explanation: 'Images are binary data, so Byte Streams (FileInputStream) should be used.'
            },
            {
              question: 'What happens if you do not close a file stream?',
              options: ['The file deletes itself', 'Nothing happens', 'It causes a memory leak and file lock issues', 'Compilation error'],
              correctAnswer: 2,
              explanation: 'Unclosed streams hold OS resources and locks, leading to memory leaks and inability to move/delete the file.'
            }
          ]
        }
      ]
    },
    {
      id: 'unit-6',
      title: 'UNIT 6: String Handling & Java 8 Features',
      description: 'Mastering Strings, immutability, and modern Java features like Lambdas and Streams.',
      topics: [
        {
          id: 'strings',
          title: 'String, StringBuilder, StringBuffer',
          simpleExplanation: 'Strings represent text. In Java, regular Strings are IMMUTABLE (cannot be changed once created). If you need to manipulate text frequently, use StringBuilder, which is MUTABLE (can be changed).',
          detailedExplanation: `## String Handling
In Java, a \`String\` is an object that represents a sequence of characters.

### 1. String (Immutable)
- Once created, a String object cannot be modified. If you modify it, a *new* object is created in memory.
- Stored in a special memory area inside the Heap called the **String Constant Pool (SCP)** to save memory.
- Creating using literal: \`String s1 = "Hello";\` (Goes to SCP)
- Creating using \`new\`: \`String s2 = new String("Hello");\` (Creates object in normal Heap)

### 2. StringBuffer (Mutable, Thread-Safe)
- Can be modified without creating new objects.
- It is **synchronized** (thread-safe), meaning multiple threads cannot access it simultaneously. Slower performance.

### 3. StringBuilder (Mutable, Not Thread-Safe)
- Introduced in Java 1.5. 
- Mutable like StringBuffer, but **not synchronized**. 
- Much faster performance. Default choice for string manipulations in single-threaded scenarios.

### Common String Methods
- \`length()\`, \`charAt(int index)\`, \`substring(int begin)\`, \`toLowerCase()\`, \`equals()\`, \`trim()\`.`,
          keyPoints: [
            'Strings are strictly immutable in Java.',
            '`==` checks memory reference (address), `equals()` checks actual content.',
            'StringBuilder is faster than StringBuffer.',
            'Use StringBuilder when performing many string concatenations in a loop.'
          ],
          examples: [
            {
              title: 'Immutability vs Mutability',
              code: `public class Main {
    public static void main(String[] args) {
        // String
        String s = "Java";
        s.concat(" 8"); // Creates a new object but 's' reference is unchanged
        System.out.println("String: " + s);

        // StringBuilder
        StringBuilder sb = new StringBuilder("Java");
        sb.append(" 8"); // Modifies the original object
        System.out.println("StringBuilder: " + sb);
    }
}`,
              output: 'String: Java\nStringBuilder: Java 8',
              explanation: 'The String `concat` result is lost because it wasn\'t reassigned (`s = s.concat(...)`). StringBuilder modifies itself directly.'
            }
          ],
          mcqs: [
            {
              question: 'Why are Strings immutable in Java?',
              options: ['To allow multithreading', 'For security, caching (String Pool), and performance', 'Because arrays are immutable', 'To save disk space'],
              correctAnswer: 1,
              explanation: 'Immutability allows String pooling (caching), makes them safe for hash keys, and inherently thread-safe.'
            },
            {
              question: 'What is the main difference between StringBuilder and StringBuffer?',
              options: ['StringBuilder is immutable', 'StringBuffer is faster', 'StringBuffer is synchronized (thread-safe)', 'There is no difference'],
              correctAnswer: 2,
              explanation: 'StringBuffer is synchronized, making it thread-safe but slower. StringBuilder is unsynchronized and faster.'
            },
            {
              question: 'Which operator/method compares the ACTUAL text content of two Strings?',
              options: ['==', '=', 'equals()', 'compareTo()'],
              correctAnswer: 2,
              explanation: 'The `equals()` method compares the character sequence. The `==` operator compares memory addresses.'
            }
          ]
        },
        {
          id: 'lambda-streams',
          title: 'Java 8: Lambda & Streams API',
          simpleExplanation: 'Lambdas are short blocks of code that take parameters and return a value, acting like a method without a name. Streams let you process collections (like filtering or sorting) in a highly readable, functional way.',
          detailedExplanation: `## Java 8 Features
Java 8 brought functional programming concepts to Java.

### 1. Functional Interfaces
An interface that contains **exactly one abstract method**. They can have default and static methods.
- Indicated by the \`@FunctionalInterface\` annotation.
- Example: \`Runnable\`, \`Callable\`, \`Comparator\`.

### 2. Lambda Expressions
A concise way to represent anonymous functions (functions without a name). Used primarily to implement functional interfaces.
- **Syntax:** \`(parameters) -> { body }\`
- Makes code shorter and more readable by removing boilerplate class definitions.

### 3. Stream API
A Stream is a pipeline of computational operations applied to a source (like a Collection).
- Does NOT store data. Modifies a stream of data in transit.
- **Intermediate Operations:** Return a new Stream, are lazy. (e.g., \`filter()\`, \`map()\`, \`sorted()\`).
- **Terminal Operations:** Produce a final result and close the stream. (e.g., \`collect()\`, \`forEach()\`, \`count()\`).`,
          keyPoints: [
            'Lambda expressions provide implementation for Functional Interfaces.',
            'A Stream pipeline must have exactly one Terminal operation to execute.',
            'Streams do not mutate the original collection.',
            '`filter` takes a condition (Predicate) and keeps matching items.'
          ],
          examples: [
            {
              title: 'Lambda and Streams',
              code: `import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6);

        // Functional approach using Streams and Lambdas
        List<Integer> evenSquares = numbers.stream()
            .filter(n -> n % 2 == 0)   // Keep even numbers
            .map(n -> n * n)           // Square them
            .collect(Collectors.toList()); // Terminal operation

        System.out.println("Even Squares: " + evenSquares);
    }
}`,
              output: 'Even Squares: [4, 16, 36]',
              explanation: 'The stream filters the evens (2, 4, 6), maps them to their squares (4, 16, 36), and collects them back into a List.'
            }
          ],
          mcqs: [
            {
              question: 'How many abstract methods can a Functional Interface have?',
              options: ['Zero', 'Exactly One', 'Two', 'Unlimited'],
              correctAnswer: 1,
              explanation: 'A functional interface must have exactly one abstract method.'
            },
            {
              question: 'What is the syntax for a lambda expression?',
              options: ['parameters => body', 'parameters -> body', 'parameters >> body', 'body -> parameters'],
              correctAnswer: 1,
              explanation: 'Java uses the arrow `->` for lambda expressions.'
            },
            {
              question: 'Which of the following is a Terminal Operation in the Stream API?',
              options: ['filter()', 'map()', 'sorted()', 'collect()'],
              correctAnswer: 3,
              explanation: '`collect()` produces a final result (like a List), while the others return another Stream (Intermediate).'
            }
          ]
        }
      ]
    }
  ]
};
