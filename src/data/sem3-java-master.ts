import { Subject } from './types';

export const sem3JavaMaster: Subject = {
  id: "java-master-303",
  name: "Object Oriented Programming (JAVA)",
  code: "JAVA303",
  color: "bg-red-600",
  icon: "coffee",
  description: "Complete OOP Course: Classes, Inheritance, Polymorphism, and Multithreading. Includes runnable examples, dry runs, and problem sets.",
  semester: 3,
  units: [
    {
      id: "java-u1",
      title: "Unit 1: Fundamentals of OOP",
      description: "Classes, Objects, Encapsulation, and Constructors.",
      orderIndex: 0,
      topics: [
        {
          id: "java-t1",
          title: "Classes and Objects",
          simpleExplanation: "A Class is a blueprint. An Object is an actual thing built from that blueprint.",
          detailedExplanation: "Object-Oriented Programming (OOP) revolves around dividing a program into objects. \n\n### 1. Class\nA class is a user-defined blueprint or prototype from which objects are created. It represents the set of properties or methods that are common to all objects of one type.\n\n### 2. Object\nAn object is a basic unit of OOP and represents real-life entities. An object consists of:\n- **State**: Represented by attributes (variables).\n- **Behavior**: Represented by methods (functions).\n- **Identity**: Gives a unique name to an object and enables it to interact with other objects.",
          shortNotes: "Class = Blueprint. Object = Instance of Class. State = Variables. Behavior = Methods.",
          keyPoints: [
            "Java is strictly object-oriented; everything must be inside a class.",
            "The `new` keyword is used to allocate memory for an object at runtime.",
            "Classes are logical constructs; Objects are physical realities."
          ],
          examples: [
            {
              title: "Basic Class & Object Creation",
              problem: "Create a Dog class and instantiate a Dog object.",
              explanation: "We define a class `Dog` with states (breed, age) and behavior (bark). We then instantiate it in `main`.",
              code: `class Dog {
    // State
    String breed;
    int age;

    // Behavior
    void bark() {
        System.out.println("Woof! I am a " + breed);
    }
}

public class Main {
    public static void main(String[] args) {
        // Object Creation
        Dog myDog = new Dog();
        myDog.breed = "Golden Retriever";
        myDog.age = 3;

        myDog.bark(); // Calling method
    }
}`,
              output: "Woof! I am a Golden Retriever\n"
            }
          ],
          mcqs: [
            { question: "Which keyword is used to allocate memory for an object?", options: ["alloc", "malloc", "new", "create"], correctIndex: 2, explanation: "In Java, 'new' dynamically allocates memory on the heap for an object." }
          ]
        },
        {
          id: "java-t2",
          title: "Constructors & This Keyword",
          simpleExplanation: "A Constructor is a special method called automatically when an object is created to set its initial values.",
          detailedExplanation: "Constructors look like methods but have no return type and share the exact name of the class.\n\n### Types of Constructors:\n1. **Default Constructor**: Provided by Java if no constructor is defined. Initializes fields to default values (0, null).\n2. **No-Arg Constructor**: A constructor with no parameters explicitly written by the programmer.\n3. **Parameterized Constructor**: Accepts arguments to initialize fields dynamically.\n\n### The `this` Keyword:\n`this` is a reference variable that refers to the current object. It is heavily used to resolve ambiguity between instance variables and parameters.",
          shortNotes: "Constructor = same name as class, no return type. `this` = refers to current object.",
          keyPoints: [
            "Constructors cannot be abstract, static, final, or synchronized.",
            "If you write ANY constructor, Java removes the default one.",
            "`this()` can be used to call another constructor in the same class (Constructor Chaining)."
          ],
          examples: [
            {
              title: "Parameterized Constructor and this",
              problem: "Initialize variables using a constructor and resolve naming conflicts.",
              explanation: "The parameters `name` and `age` have the same names as the instance variables. We use `this.name = name` to differentiate them.",
              code: `class Student {
    String name;
    int age;

    // Parameterized Constructor
    Student(String name, int age) {
        this.name = name; // 'this.name' refers to instance variable
        this.age = age;
    }

    void display() {
        System.out.println(name + " is " + age + " years old.");
    }
}

public class Main {
    public static void main(String[] args) {
        Student s1 = new Student("Alice", 20);
        s1.display();
    }
}`,
              output: "Alice is 20 years old.\n"
            }
          ],
          mcqs: []
        }
      ]
    },
    {
      id: "java-u2",
      title: "Unit 2: Inheritance & Polymorphism",
      description: "Code reusability, Method Overloading vs Overriding, and Dynamic Method Dispatch.",
      orderIndex: 1,
      topics: [
        {
          id: "java-t3",
          title: "Inheritance (IS-A Relationship)",
          simpleExplanation: "Inheritance allows a new class to inherit properties and methods from an existing class.",
          detailedExplanation: "Inheritance represents the IS-A relationship. The `extends` keyword is used to inherit from a class.\n\n### Types of Inheritance in Java:\n1. **Single**: A inherits from B.\n2. **Multilevel**: C inherits from B, B inherits from A.\n3. **Hierarchical**: B and C both inherit from A.\n\n> **Note**: Java does NOT support Multiple Inheritance through classes (A inherits from B and C) to avoid the Diamond Problem. Interfaces must be used instead.\n\n### The `super` Keyword:\nUsed to refer to the immediate parent class object. It can be used to call parent methods, access parent variables, or call parent constructors.",
          shortNotes: "Inheritance = code reusability. Keyword = extends. Multiple inheritance not supported.",
          keyPoints: [
            "Constructors are NOT inherited.",
            "Private members of parent class are NOT accessible directly in child class.",
            "`super()` must be the very first statement in a constructor."
          ],
          examples: [
            {
              title: "Hierarchical Inheritance & super",
              problem: "Demonstrate inheritance and calling parent constructor.",
              explanation: "The `Dog` class inherits `Animal`. It uses `super(name)` to pass the name up to the Animal constructor.",
              code: `class Animal {
    String name;
    Animal(String name) {
        this.name = name;
        System.out.println("Animal created: " + name);
    }
}

class Dog extends Animal {
    Dog(String name) {
        super(name); // Calls parent constructor
        System.out.println("Dog created");
    }
}

public class Main {
    public static void main(String[] args) {
        Dog d = new Dog("Buddy");
    }
}`,
              output: "Animal created: Buddy\nDog created\n"
            }
          ],
          mcqs: []
        },
        {
          id: "java-t4",
          title: "Polymorphism & Dynamic Method Dispatch",
          simpleExplanation: "Polymorphism means 'many forms'. It allows parent references to point to child objects.",
          detailedExplanation: "### 1. Compile-Time Polymorphism (Method Overloading)\nMethods with the SAME name but DIFFERENT parameters. Resolved by the compiler.\n\n### 2. Run-Time Polymorphism (Method Overriding)\nA child class provides a specific implementation of a parent's method. \n\n### Dynamic Method Dispatch:\nThis is the core of Java polymorphism. A parent class reference variable can point to a child class object. At runtime, the JVM looks at the **actual object type** (not the reference type) to decide which overridden method to call.",
          shortNotes: "Overloading = same name, diff params. Overriding = same name & params in child. Dynamic Dispatch = Parent ref points to Child object.",
          keyPoints: [
            "You cannot override static methods (that is called Method Hiding).",
            "You cannot override final methods.",
            "Dynamic Dispatch is achieved via Upcasting: `Parent p = new Child();`"
          ],
          examples: [
            {
              title: "Dynamic Method Dispatch",
              problem: "Demonstrate run-time polymorphism.",
              explanation: "We create a reference of type `Bank`, but assign it a `SBI` object. When `getInterestRate()` is called, the JVM dynamically calls the SBI version.",
              code: `class Bank {
    float getInterestRate() { return 0f; }
}

class SBI extends Bank {
    float getInterestRate() { return 7.5f; }
}

class HDFC extends Bank {
    float getInterestRate() { return 8.0f; }
}

public class Main {
    public static void main(String[] args) {
        Bank b; // Parent reference

        b = new SBI(); // Points to SBI object
        System.out.println("SBI Rate: " + b.getInterestRate()); // Calls SBI's method

        b = new HDFC(); // Points to HDFC object
        System.out.println("HDFC Rate: " + b.getInterestRate()); // Calls HDFC's method
    }
}`,
              output: "SBI Rate: 7.5\nHDFC Rate: 8.0\n"
            }
          ],
          mcqs: []
        }
      ]
    }
  ]
};
