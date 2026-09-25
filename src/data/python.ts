import type { Subject } from "./types";

export const pythonSubject: Subject = {
  id: "python",
  name: "Python Programming",
  code: "PY",
  color: "221 83% 53%",
  icon: "🐍",
  description: "Complete Python Semester 2 — OOP, Exceptions, Regex, Files, NumPy, Pandas, System Interaction & Testing",
  semester: 2,
  units: [
    {
      id: "py-u1",
      title: "Unit 1: Object-Oriented Programming",
      description: "Classes, Objects, Constructors, Inheritance, Polymorphism, Encapsulation & Abstraction",
      topics: [
        {
          id: "py-u1-t1",
          title: "Introduction to OOP & Classes",
          simpleExplanation: "Object-Oriented Programming (OOP) is a way of writing programs by grouping related data and functions together into 'objects'. Think of it like organizing your room — instead of throwing everything in one pile, you put books on the shelf, clothes in the wardrobe. A 'class' is like a blueprint or template that defines what data an object holds and what it can do.",
          detailedExplanation: `OOP is a programming paradigm based on the concept of "objects" that contain both data (attributes) and code (methods). Before OOP, we used procedural programming where code was just a sequence of instructions. OOP makes code more organized, reusable, and easier to maintain.

**Why do we need OOP?**
- Modern software is complex with thousands of lines of code
- Multiple developers need to work on the same project
- Code needs to be reusable and maintainable
- Real-world entities are easier to model as objects

**Key OOP Concepts:**
1. **Class** — A blueprint/template that defines the structure and behavior
2. **Object** — An instance of a class (the actual thing created from the blueprint)
3. **Encapsulation** — Bundling data and methods together, hiding internal details
4. **Inheritance** — Creating new classes from existing ones
5. **Polymorphism** — Same interface, different implementations
6. **Abstraction** — Hiding complexity, showing only necessary features

**Class in Python:**
A class is defined using the \`class\` keyword. It creates a new namespace where attributes (variables) and methods (functions) are defined.

**Two types of variables in a class:**
- **Class variables** — Shared across ALL instances of the class
- **Instance variables** — Unique to each instance, defined inside methods using \`self\``,
          examples: [
            {
              title: "Creating a Simple Class",
              problem: "Create a class called Student with name and age, and display the information.",
              explanation: "We define a class with class variables and instance variables. The __init__ method is the constructor that runs when an object is created.",
              code: `class Student:
    # Class variable (shared by all students)
    school = "ITM University"

    # Constructor (initializer)
    def __init__(self, name, age):
        # Instance variables (unique to each student)
        self.name = name
        self.age = age

    # Method to display info
    def display(self):
        print(f"Name: {self.name}, Age: {self.age}, School: {self.school}")

# Creating objects (instances)
s1 = Student("Rahul", 19)
s2 = Student("Priya", 20)

s1.display()
s2.display()
print(f"Same school? {s1.school == s2.school}")`,
              output: `Name: Rahul, Age: 19, School: ITM University
Name: Priya, Age: 20, School: ITM University
Same school? True`
            },
            {
              title: "Class vs Instance Variables",
              problem: "Demonstrate the difference between class variables and instance variables.",
              explanation: "Class variables are shared by all objects. Instance variables are unique to each object. Changing a class variable affects all instances, but changing an instance variable affects only that specific object.",
              code: `class Car:
    # Class variable
    wheels = 4

    def __init__(self, brand, color):
        # Instance variables
        self.brand = brand
        self.color = color

car1 = Car("Toyota", "Red")
car2 = Car("Honda", "Blue")

print(f"Car1: {car1.brand}, {car1.color}, Wheels: {car1.wheels}")
print(f"Car2: {car2.brand}, {car2.color}, Wheels: {car2.wheels}")

# Changing instance variable — affects only car1
car1.color = "Green"
print(f"\\nAfter changing car1 color:")
print(f"Car1: {car1.color}")
print(f"Car2: {car2.color}")  # Unchanged`,
              output: `Car1: Toyota, Red, Wheels: 4
Car2: Honda, Blue, Wheels: 4

After changing car1 color:
Car1: Green
Car2: Blue`
            },
            {
              title: "Methods — Getters and Setters",
              problem: "Create a BankAccount class with getter/setter methods for controlled access.",
              explanation: "Getters retrieve values and setters update values with validation. This is a key part of encapsulation — controlling how data is accessed and modified.",
              code: `class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.__balance = balance  # Private variable (name mangling)

    # Getter method
    def get_balance(self):
        return self.__balance

    # Setter method with validation
    def set_balance(self, amount):
        if amount < 0:
            print("Error: Balance cannot be negative!")
        else:
            self.__balance = amount

    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount
            print(f"Deposited: {amount}. New balance: {self.__balance}")
        else:
            print("Deposit amount must be positive!")

    def withdraw(self, amount):
        if amount > self.__balance:
            print("Insufficient funds!")
        elif amount <= 0:
            print("Invalid amount!")
        else:
            self.__balance -= amount
            print(f"Withdrawn: {amount}. Remaining: {self.__balance}")

acc = BankAccount("Rahul", 1000)
acc.deposit(500)
acc.withdraw(200)
print(f"Balance: {acc.get_balance()}")
acc.set_balance(-100)  # Will show error`,
              output: `Deposited: 500. New balance: 1500
Withdrawn: 200. Remaining: 1300
Balance: 1300
Error: Balance cannot be negative!`
            }
          ],
          keyPoints: [
            "OOP organizes code into objects that contain both data and methods",
            "A class is a blueprint; an object is an instance created from that blueprint",
            "Class variables are shared by all instances; instance variables are unique to each",
            "The __init__ method is the constructor — it runs automatically when creating an object",
            "self refers to the current instance of the class",
            "Getters and setters provide controlled access to private data",
            "Private variables use double underscore prefix (__variable) for name mangling"
          ],
          mcqs: [
            { question: "What is a class in Python?", options: ["A function that returns objects", "A blueprint for creating objects", "A type of variable", "A built-in module"], correctIndex: 1, explanation: "A class is a blueprint or template that defines the structure (attributes) and behavior (methods) of objects." },
            { question: "Which method is called automatically when an object is created?", options: ["__str__", "__new__", "__init__", "__create__"], correctIndex: 2, explanation: "__init__ is the constructor method that initializes the object's attributes when it's instantiated." },
            { question: "What does 'self' refer to in a class method?", options: ["The class itself", "The current instance of the class", "The parent class", "A global variable"], correctIndex: 1, explanation: "'self' refers to the current instance (object) of the class, allowing access to its attributes and methods." },
            { question: "Class variables are:", options: ["Unique to each object", "Shared across all instances", "Only accessible inside __init__", "Automatically private"], correctIndex: 1, explanation: "Class variables are defined outside methods and shared by all instances of the class." },
            { question: "What is name mangling in Python?", options: ["Renaming a class", "Adding __ prefix to make variables private", "Changing method names at runtime", "Encrypting variable values"], correctIndex: 1, explanation: "Python uses name mangling (double underscore prefix) to make attributes harder to access from outside, providing a form of privacy." }
          ]
        },
        {
          id: "py-u1-t2",
          title: "Constructors & Destructors",
          simpleExplanation: "A constructor is a special method that runs automatically when you create a new object — like a setup wizard that initializes everything. A destructor is the opposite — it runs when an object is about to be destroyed, cleaning up resources.",
          detailedExplanation: `**Constructor (__init__):**
The constructor is a special method in Python classes that initializes the object's state. It's called automatically when you create a new object using the class name.

- Defined using \`def __init__(self, ...)\`
- Called automatically during object creation
- Used to set initial values for instance variables
- Can take parameters to customize each object
- Every class should have a constructor for proper initialization

**Types of Constructors:**
1. **Default constructor** — No parameters (except self)
2. **Parameterized constructor** — Takes parameters to initialize with specific values

**Destructor (__del__):**
The destructor is called when an object is about to be destroyed (garbage collected).
- Defined using \`def __del__(self)\`
- Called automatically when the object's reference count reaches zero
- Used to clean up resources (close files, release connections)
- Python has automatic garbage collection, so destructors are rarely needed

**Special Methods (Dunder Methods):**
Python has many special methods that start and end with double underscores:
- \`__init__\` — Constructor
- \`__del__\` — Destructor
- \`__str__\` — String representation (for print())
- \`__repr__\` — Official string representation
- \`__len__\` — For len() function`,
          examples: [
            {
              title: "Default vs Parameterized Constructor",
              problem: "Create a class demonstrating both types of constructors.",
              explanation: "A default constructor has no parameters. A parameterized constructor accepts values to customize each object.",
              code: `# Default Constructor
class DefaultGreeter:
    def __init__(self):
        self.message = "Hello, World!"

    def greet(self):
        print(self.message)

# Parameterized Constructor
class CustomGreeter:
    def __init__(self, name, language="English"):
        self.name = name
        self.language = language

    def greet(self):
        if self.language == "Hindi":
            print(f"Namaste, {self.name}!")
        elif self.language == "Spanish":
            print(f"Hola, {self.name}!")
        else:
            print(f"Hello, {self.name}!")

# Using default constructor
g1 = DefaultGreeter()
g1.greet()

# Using parameterized constructor
g2 = CustomGreeter("Rahul", "Hindi")
g3 = CustomGreeter("Maria", "Spanish")
g2.greet()
g3.greet()`,
              output: `Hello, World!
Namaste, Rahul!
Hola, Maria!`
            },
            {
              title: "Destructor and Object Lifecycle",
              problem: "Show how destructors work when objects are deleted.",
              explanation: "The __del__ method is called when an object is about to be garbage collected. We can use 'del' to explicitly delete an object.",
              code: `class FileHandler:
    def __init__(self, filename):
        self.filename = filename
        print(f"Opening file: {self.filename}")

    def read(self):
        print(f"Reading from {self.filename}...")

    def __del__(self):
        print(f"Closing file: {self.filename} (cleanup done)")

# Create object
f1 = FileHandler("data.txt")
f1.read()

# Explicitly delete
print("About to delete f1...")
del f1
print("f1 has been deleted")`,
              output: `Opening file: data.txt
Reading from data.txt...
About to delete f1...
Closing file: data.txt (cleanup done)
f1 has been deleted`
            },
            {
              title: "Special Methods (__str__ and __repr__)",
              problem: "Make objects print nicely using special methods.",
              explanation: "__str__ defines what print() shows. __repr__ defines the 'official' representation used in debugging.",
              code: `class Product:
    def __init__(self, name, price):
        self.name = name
        self.price = price

    def __str__(self):
        return f"{self.name} — ₹{self.price}"

    def __repr__(self):
        return f"Product('{self.name}', {self.price})"

p = Product("Laptop", 45000)

# __str__ is called by print()
print(p)

# __repr__ is called in interpreter/debugging
print(repr(p))

# Works in lists too
products = [Product("Phone", 15000), Product("Tablet", 25000)]
print(products)  # Uses __repr__ for items in list`,
              output: `Laptop — ₹45000
Product('Laptop', 45000)
[Product('Phone', 15000), Product('Tablet', 25000)]`
            }
          ],
          keyPoints: [
            "__init__ is the constructor — runs automatically when creating an object",
            "Default constructors take no parameters; parameterized ones accept values",
            "__del__ is the destructor — runs when an object is garbage collected",
            "Python's garbage collector handles memory automatically; destructors are rarely needed",
            "__str__ controls what print() displays; __repr__ is for debugging",
            "Special methods (dunder methods) let you customize object behavior",
            "Constructors are essential for setting up initial state of objects"
          ],
          mcqs: [
            { question: "When is __init__ called?", options: ["When the class is defined", "When an object is created", "When a method is called", "When the program ends"], correctIndex: 1, explanation: "__init__ is automatically called when you create a new object, e.g., obj = MyClass()." },
            { question: "What does __del__ do?", options: ["Deletes a class", "Removes a method", "Called when object is garbage collected", "Clears all variables"], correctIndex: 2, explanation: "__del__ is the destructor method called when an object's reference count drops to zero and it's about to be removed from memory." },
            { question: "Which method controls what print(obj) displays?", options: ["__repr__", "__print__", "__str__", "__display__"], correctIndex: 2, explanation: "__str__ returns a human-readable string representation of the object, used by print()." },
            { question: "A constructor that takes no parameters (except self) is called:", options: ["Empty constructor", "Default constructor", "Null constructor", "Base constructor"], correctIndex: 1, explanation: "A default constructor only takes 'self' and sets default values for all attributes." },
            { question: "What happens if you don't define __init__ in a class?", options: ["Error occurs", "Python uses a default empty constructor", "The class can't be instantiated", "All variables become None"], correctIndex: 1, explanation: "Python provides a default constructor that does nothing. You can still create objects, but they won't have custom initialization." }
          ]
        },
        {
          id: "py-u1-t3",
          title: "Inheritance",
          simpleExplanation: "Inheritance is when a new class (child) gets all the features of an existing class (parent) and can add its own. It's like how children inherit traits from parents — you get their eye color but can develop your own skills. This lets us reuse code instead of writing everything from scratch.",
          detailedExplanation: `**Inheritance** allows a class to inherit attributes and methods from another class.

**Terminology:**
- **Parent/Base/Super class** — The class being inherited from
- **Child/Derived/Sub class** — The class that inherits

**Types of Inheritance in Python:**

1. **Single Inheritance** — One child inherits from one parent
   \`class Child(Parent)\`

2. **Multiple Inheritance** — One child inherits from multiple parents
   \`class Child(Parent1, Parent2)\`

3. **Multilevel Inheritance** — Chain of inheritance (Grandparent → Parent → Child)

4. **Hierarchical Inheritance** — Multiple children inherit from one parent

**Method Resolution Order (MRO):**
When a class has multiple parents, Python uses MRO to determine which method to call first. It follows the C3 linearization algorithm. You can check MRO using \`ClassName.__mro__\` or \`ClassName.mro()\`.

**super() function:**
Used to call methods from the parent class. Essential when overriding methods but still wanting to use the parent's version.

**Key Rules:**
- Child class automatically gets ALL public methods and attributes of parent
- Child can override (replace) parent methods
- Child can extend (add new) methods
- Private members (__ prefix) are not directly inherited`,
          examples: [
            {
              title: "Single Inheritance",
              problem: "Create an Animal parent class and a Dog child class.",
              explanation: "Dog inherits from Animal, getting its attributes and methods. Dog also adds its own method.",
              code: `class Animal:
    def __init__(self, name, species):
        self.name = name
        self.species = species

    def speak(self):
        print(f"{self.name} makes a sound")

    def info(self):
        print(f"{self.name} is a {self.species}")

class Dog(Animal):
    def __init__(self, name, breed):
        # Call parent constructor
        super().__init__(name, "Dog")
        self.breed = breed

    # Override parent method
    def speak(self):
        print(f"{self.name} says: Woof! Woof!")

    # New method only in Dog
    def fetch(self, item):
        print(f"{self.name} fetches the {item}!")

dog = Dog("Buddy", "Golden Retriever")
dog.info()    # Inherited from Animal
dog.speak()   # Overridden in Dog
dog.fetch("ball")  # Dog's own method`,
              output: `Buddy is a Dog
Buddy says: Woof! Woof!
Buddy fetches the ball!`
            },
            {
              title: "Multiple Inheritance",
              problem: "Create a class that inherits from two parent classes.",
              explanation: "A child class can inherit from multiple parents. When both parents have the same method, Python uses MRO to decide which one to call.",
              code: `class Father:
    def skills(self):
        print("Gardening, Cooking")

    def eye_color(self):
        print("Brown eyes")

class Mother:
    def skills(self):
        print("Painting, Singing")

    def hair_color(self):
        print("Black hair")

class Child(Father, Mother):
    def own_skills(self):
        print("Programming, Gaming")

c = Child()
c.eye_color()    # From Father
c.hair_color()   # From Mother
c.skills()       # From Father (first in MRO)
c.own_skills()   # Child's own

# Check Method Resolution Order
print("\\nMRO:", [cls.__name__ for cls in Child.__mro__])`,
              output: `Brown eyes
Black hair
Gardening, Cooking
Programming, Gaming

MRO: ['Child', 'Father', 'Mother', 'object']`
            },
            {
              title: "Multilevel Inheritance with super()",
              problem: "Create a chain: Vehicle → Car → ElectricCar",
              explanation: "Each class builds on the previous one. super() lets us call parent constructors up the chain.",
              code: `class Vehicle:
    def __init__(self, brand, year):
        self.brand = brand
        self.year = year

    def start(self):
        print(f"{self.brand} engine starting...")

class Car(Vehicle):
    def __init__(self, brand, year, doors):
        super().__init__(brand, year)
        self.doors = doors

    def drive(self):
        print(f"{self.brand} is driving with {self.doors} doors")

class ElectricCar(Car):
    def __init__(self, brand, year, doors, battery_kwh):
        super().__init__(brand, year, doors)
        self.battery = battery_kwh

    # Override start method
    def start(self):
        print(f"{self.brand} silently powers on... (no engine!)")

    def charge(self):
        print(f"Charging {self.battery}kWh battery...")

tesla = ElectricCar("Tesla", 2024, 4, 100)
tesla.start()     # Overridden
tesla.drive()     # From Car
tesla.charge()    # ElectricCar's own
print(f"Year: {tesla.year}")  # From Vehicle`,
              output: `Tesla silently powers on... (no engine!)
Tesla is driving with 4 doors
Charging 100kWh battery...
Year: 2024`
            }
          ],
          keyPoints: [
            "Inheritance lets a child class reuse code from a parent class",
            "Single inheritance: one parent → one child",
            "Multiple inheritance: multiple parents → one child",
            "Multilevel: grandparent → parent → child chain",
            "super() calls the parent class methods, especially constructors",
            "MRO (Method Resolution Order) determines which parent's method is called first",
            "Child classes can override parent methods to change behavior"
          ],
          mcqs: [
            { question: "What is inheritance in OOP?", options: ["Creating new variables", "A class getting features from another class", "Deleting unused code", "Running code in sequence"], correctIndex: 1, explanation: "Inheritance allows a child class to acquire attributes and methods from a parent class, promoting code reuse." },
            { question: "In class Child(Parent1, Parent2), which parent's method is called first?", options: ["Parent2", "Both simultaneously", "Parent1", "Depends on method name"], correctIndex: 2, explanation: "Python follows MRO from left to right, so Parent1's methods take priority over Parent2's." },
            { question: "What does super().__init__() do?", options: ["Creates a new class", "Calls the parent class constructor", "Deletes the parent", "Makes a copy of the parent"], correctIndex: 1, explanation: "super().__init__() calls the parent class's constructor to initialize inherited attributes." },
            { question: "Which inheritance type has a chain: A → B → C?", options: ["Single", "Multiple", "Multilevel", "Hierarchical"], correctIndex: 2, explanation: "Multilevel inheritance creates a chain where C inherits from B, which inherits from A." },
            { question: "Can a child class override a parent's method?", options: ["No, never", "Yes, by defining a method with the same name", "Only with special permission", "Only private methods"], correctIndex: 1, explanation: "A child class can override any parent method by simply defining a method with the same name." }
          ]
        },
        {
          id: "py-u1-t4",
          title: "Polymorphism & Encapsulation",
          simpleExplanation: "Polymorphism means 'many forms' — the same function or method can behave differently depending on what object calls it. Encapsulation means bundling data and methods together and hiding the internal details — like a TV remote where you press buttons without knowing the circuit inside.",
          detailedExplanation: `**Polymorphism:**
The word comes from Greek: poly (many) + morph (form). In Python, polymorphism means:
1. **Method Overriding** — Child class redefines parent's method
2. **Operator Overloading** — Same operator behaves differently for different types
3. **Duck Typing** — "If it walks like a duck, it's a duck" — Python cares about what an object can DO, not what it IS

**Operator Overloading:**
Python lets you define how operators (+, -, *, ==, etc.) work with your custom objects using special methods:
- \`__add__\` for +
- \`__sub__\` for -
- \`__eq__\` for ==
- \`__lt__\` for <
- \`__len__\` for len()

**Encapsulation:**
Encapsulation is about restricting direct access to some components:
- **Public** — Accessible everywhere (no prefix)
- **Protected** — Accessible in class and subclasses (single underscore _)
- **Private** — Accessible only inside the class (double underscore __)

Note: Python doesn't enforce strict access control like Java. The underscore conventions are guidelines, not rules. Double underscore uses name mangling (\`_ClassName__variable\`) to make access harder but not impossible.`,
          examples: [
            {
              title: "Polymorphism — Method Overriding",
              problem: "Show how different classes can have the same method name but different behavior.",
              explanation: "Each shape class has an area() method, but each calculates differently. This is polymorphism in action.",
              code: `import math

class Shape:
    def area(self):
        return 0

    def describe(self):
        print(f"{self.__class__.__name__}: Area = {self.area():.2f}")

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return math.pi * self.radius ** 2

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height

class Triangle(Shape):
    def __init__(self, base, height):
        self.base = base
        self.height = height

    def area(self):
        return 0.5 * self.base * self.height

# Polymorphism: same method, different behavior
shapes = [Circle(5), Rectangle(4, 6), Triangle(3, 8)]
for shape in shapes:
    shape.describe()`,
              output: `Circle: Area = 78.54
Rectangle: Area = 24.00
Triangle: Area = 12.00`
            },
            {
              title: "Operator Overloading",
              problem: "Create a Vector class that supports + and == operators.",
              explanation: "By defining __add__ and __eq__, we can use + and == with our custom objects just like built-in types.",
              code: `class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)

    def __eq__(self, other):
        return self.x == other.x and self.y == other.y

    def __str__(self):
        return f"Vector({self.x}, {self.y})"

    def __len__(self):
        return int((self.x**2 + self.y**2)**0.5)

v1 = Vector(3, 4)
v2 = Vector(1, 2)
v3 = v1 + v2          # Uses __add__

print(f"v1 = {v1}")
print(f"v2 = {v2}")
print(f"v1 + v2 = {v3}")
print(f"v1 == v2: {v1 == v2}")      # Uses __eq__
print(f"len(v1) = {len(v1)}")        # Uses __len__`,
              output: `v1 = Vector(3, 4)
v2 = Vector(1, 2)
v1 + v2 = Vector(4, 6)
v1 == v2: False
len(v1) = 5`
            },
            {
              title: "Encapsulation — Access Control",
              problem: "Demonstrate public, protected, and private access levels.",
              explanation: "Python uses naming conventions to indicate access levels. Double underscore triggers name mangling for privacy.",
              code: `class Employee:
    def __init__(self, name, salary, ssn):
        self.name = name         # Public
        self._salary = salary    # Protected (convention)
        self.__ssn = ssn         # Private (name mangling)

    def get_info(self):
        return f"{self.name}, Salary: {self._salary}, SSN: {self.__ssn}"

    def get_ssn_last4(self):
        return f"***-**-{self.__ssn[-4:]}"

emp = Employee("Rahul", 50000, "123-45-6789")

# Public — accessible
print(f"Name: {emp.name}")

# Protected — accessible but shouldn't be used outside
print(f"Salary: {emp._salary}")

# Private — NOT directly accessible
try:
    print(emp.__ssn)
except AttributeError as e:
    print(f"Error: {e}")

# But accessible through methods
print(f"SSN: {emp.get_ssn_last4()}")

# Name mangling: still accessible via _ClassName__variable
print(f"Mangled access: {emp._Employee__ssn}")`,
              output: `Name: Rahul
Salary: 50000
Error: 'Employee' object has no attribute '__ssn'
SSN: ***-**-6789
Mangled access: 123-45-6789`
            }
          ],
          keyPoints: [
            "Polymorphism: same method name, different behavior in different classes",
            "Operator overloading lets you define how +, -, ==, etc. work with your objects",
            "Duck typing: Python cares about what an object CAN do, not what it IS",
            "Encapsulation bundles data and methods, hiding internal details",
            "Public (no prefix), Protected (_prefix), Private (__prefix)",
            "Python's 'private' isn't truly private — name mangling makes access harder, not impossible",
            "Special methods like __add__, __eq__, __str__ customize operator behavior"
          ],
          mcqs: [
            { question: "What is polymorphism?", options: ["Creating multiple classes", "Same interface, different implementations", "Hiding data", "Inheriting methods"], correctIndex: 1, explanation: "Polymorphism means the same method or operator can behave differently depending on the object type." },
            { question: "Which special method enables the + operator?", options: ["__plus__", "__sum__", "__add__", "__concat__"], correctIndex: 2, explanation: "__add__(self, other) is called when the + operator is used with objects of the class." },
            { question: "What does a double underscore prefix (__var) do?", options: ["Makes it constant", "Triggers name mangling for privacy", "Makes it global", "Deletes the variable"], correctIndex: 1, explanation: "Double underscore triggers name mangling, changing __var to _ClassName__var to discourage direct access." },
            { question: "In Python, _salary with single underscore means:", options: ["Private variable", "Protected by convention", "Static variable", "Global variable"], correctIndex: 1, explanation: "Single underscore is a convention indicating 'protected' — it works but shouldn't be accessed from outside." },
            { question: "What is duck typing?", options: ["A design pattern", "Type checking at compile time", "If it behaves right, it IS right", "Naming convention for classes"], correctIndex: 2, explanation: "Duck typing means Python checks behavior (methods/attributes) rather than type. If it walks and quacks like a duck, it's a duck." }
          ]
        },
        {
          id: "py-u1-t5",
          title: "Abstraction & Abstract Classes",
          simpleExplanation: "Abstraction means hiding the complex implementation and showing only the necessary features. Think of driving a car — you use the steering wheel and pedals without knowing how the engine works internally. In Python, we use abstract classes to create templates that other classes MUST follow.",
          detailedExplanation: `**Abstraction** hides complexity and shows only essential features. In Python, we achieve this using the \`abc\` (Abstract Base Class) module.

**Abstract Class:**
- Cannot be instantiated directly (you can't create objects of it)
- Acts as a template/contract for child classes
- Can have abstract methods (no implementation) and concrete methods (with implementation)
- Created by inheriting from \`ABC\` and using \`@abstractmethod\` decorator

**Abstract Method:**
- Declared with \`@abstractmethod\` decorator
- Has no implementation in the abstract class (just \`pass\` or \`...\`)
- MUST be implemented by any child class
- If a child doesn't implement all abstract methods, it also becomes abstract

**Why use Abstraction?**
1. Enforces a consistent interface across related classes
2. Prevents instantiation of incomplete classes
3. Documents what methods subclasses must implement
4. Makes code more maintainable and predictable`,
          examples: [
            {
              title: "Abstract Class — Payment System",
              problem: "Create an abstract Payment class that forces subclasses to implement process_payment().",
              explanation: "The abstract class defines WHAT must be done. Each subclass defines HOW it's done.",
              code: `from abc import ABC, abstractmethod

class Payment(ABC):
    def __init__(self, amount):
        self.amount = amount

    @abstractmethod
    def process_payment(self):
        pass  # No implementation — child MUST define this

    # Concrete method (has implementation)
    def receipt(self):
        print(f"Receipt: Payment of ₹{self.amount} processed via {self.__class__.__name__}")

class CreditCard(Payment):
    def __init__(self, amount, card_number):
        super().__init__(amount)
        self.card = card_number

    def process_payment(self):
        print(f"Processing ₹{self.amount} via Credit Card ending {self.card[-4:]}")

class UPI(Payment):
    def __init__(self, amount, upi_id):
        super().__init__(amount)
        self.upi_id = upi_id

    def process_payment(self):
        print(f"Processing ₹{self.amount} via UPI: {self.upi_id}")

# Cannot create Payment directly
try:
    p = Payment(100)
except TypeError as e:
    print(f"Error: {e}")

# But can create subclasses
cc = CreditCard(5000, "4111111111111234")
cc.process_payment()
cc.receipt()

upi = UPI(200, "rahul@upi")
upi.process_payment()
upi.receipt()`,
              output: `Error: Can't instantiate abstract class Payment with abstract method process_payment
Processing ₹5000 via Credit Card ending 1234
Receipt: Payment of ₹5000 processed via CreditCard
Processing ₹200 via UPI: rahul@upi
Receipt: Payment of ₹200 processed via UPI`
            },
            {
              title: "Abstract Class with Multiple Abstract Methods",
              problem: "Create a Database abstract class with connect, query, and disconnect methods.",
              explanation: "All three methods must be implemented by any concrete database class.",
              code: `from abc import ABC, abstractmethod

class Database(ABC):
    @abstractmethod
    def connect(self):
        pass

    @abstractmethod
    def query(self, sql):
        pass

    @abstractmethod
    def disconnect(self):
        pass

    def status(self):
        print(f"Database type: {self.__class__.__name__}")

class MySQL(Database):
    def connect(self):
        print("Connected to MySQL on port 3306")

    def query(self, sql):
        print(f"MySQL executing: {sql}")
        return [{"id": 1, "name": "Rahul"}]

    def disconnect(self):
        print("MySQL connection closed")

db = MySQL()
db.status()
db.connect()
result = db.query("SELECT * FROM users")
print(f"Result: {result}")
db.disconnect()`,
              output: `Database type: MySQL
Connected to MySQL on port 3306
MySQL executing: SELECT * FROM users
Result: [{'id': 1, 'name': 'Rahul'}]
MySQL connection closed`
            }
          ],
          keyPoints: [
            "Abstraction hides complexity and shows only necessary features",
            "Abstract classes are created using ABC module and @abstractmethod decorator",
            "Abstract classes CANNOT be instantiated directly",
            "Abstract methods MUST be implemented by child classes",
            "Abstract classes can have both abstract and concrete (regular) methods",
            "If a child doesn't implement all abstract methods, it also becomes abstract",
            "Abstraction enforces a consistent interface across related classes"
          ],
          mcqs: [
            { question: "What module is used to create abstract classes in Python?", options: ["abstract", "interface", "abc", "meta"], correctIndex: 2, explanation: "The abc (Abstract Base Class) module provides the ABC class and @abstractmethod decorator." },
            { question: "Can you create an object of an abstract class?", options: ["Yes, always", "No, never", "Only if it has no abstract methods", "Only with super()"], correctIndex: 1, explanation: "Abstract classes cannot be instantiated directly. You must create a concrete subclass that implements all abstract methods." },
            { question: "What happens if a child class doesn't implement an abstract method?", options: ["It works fine", "The method returns None", "The child also becomes abstract", "Python auto-generates it"], correctIndex: 2, explanation: "If a child class doesn't implement all abstract methods from the parent, it also becomes abstract and can't be instantiated." },
            { question: "What decorator marks a method as abstract?", options: ["@abstract", "@virtual", "@abstractmethod", "@interface"], correctIndex: 2, explanation: "@abstractmethod decorator from the abc module marks a method as abstract, requiring subclass implementation." },
            { question: "An abstract class CAN have:", options: ["Only abstract methods", "Only concrete methods", "Both abstract and concrete methods", "No methods at all"], correctIndex: 2, explanation: "Abstract classes can mix abstract methods (no implementation) with concrete methods (with implementation)." }
          ]
        }
      ]
    },
    {
      id: "py-u2",
      title: "Unit 2: Exception Handling & Multithreading",
      description: "try-except-else-finally, custom exceptions, threading, synchronization",
      topics: [
        {
          id: "py-u2-t1",
          title: "Exception Handling — try, except, else, finally",
          simpleExplanation: "Errors happen in programs — maybe the user enters text instead of a number, or a file doesn't exist. Exception handling lets your program deal with these errors gracefully instead of crashing. You wrap risky code in a 'try' block, and if something goes wrong, the 'except' block catches the error and handles it.",
          detailedExplanation: `**Errors vs Exceptions:**
- **Syntax Error** — Wrong code grammar (missing colon, wrong indentation). Program won't run at all.
- **Exception** — Code is grammatically correct but fails during execution (divide by zero, file not found).

**Exception Handling Keywords:**
1. **try** — Wrap risky code here
2. **except** — Catches and handles the error
3. **else** — Runs ONLY if no exception occurred
4. **finally** — ALWAYS runs, whether error occurred or not (cleanup code)

**Flow:**
\`\`\`
try → (error?) → except → finally
try → (no error?) → else → finally
\`\`\`

**Common Built-in Exceptions:**
- \`ZeroDivisionError\` — Division by zero
- \`ValueError\` — Wrong value type (e.g., int("hello"))
- \`TypeError\` — Wrong operation on a type
- \`IndexError\` — List index out of range
- \`KeyError\` — Dictionary key not found
- \`FileNotFoundError\` — File doesn't exist
- \`NameError\` — Variable not defined
- \`AttributeError\` — Object doesn't have that attribute

**Catching Specific vs General Exceptions:**
Always try to catch specific exceptions first. Using bare \`except:\` is bad practice because it catches everything, including keyboard interrupts.`,
          examples: [
            {
              title: "Basic try-except-else-finally",
              problem: "Create a division calculator that handles errors gracefully.",
              explanation: "The try block attempts division. If an error occurs, except catches it. else runs on success. finally always runs.",
              code: `def divide(a, b):
    try:
        result = a / b
    except ZeroDivisionError:
        print("Error: Cannot divide by zero!")
        return None
    except TypeError:
        print("Error: Please provide numbers only!")
        return None
    else:
        print(f"{a} ÷ {b} = {result}")
        return result
    finally:
        print("--- Division operation complete ---")

# Test cases
divide(10, 3)
print()
divide(10, 0)
print()
divide("10", 3)`,
              output: `10 ÷ 3 = 3.3333333333333335
--- Division operation complete ---

Error: Cannot divide by zero!
--- Division operation complete ---

Error: Please provide numbers only!
--- Division operation complete ---`
            },
            {
              title: "Handling Multiple Exceptions",
              problem: "Process a list with various error scenarios.",
              explanation: "Different operations can raise different exceptions. We catch each one specifically for appropriate handling.",
              code: `data = [10, 0, "hello", 5, None]

for i, value in enumerate(data):
    try:
        result = 100 / value
        print(f"100 / {value} = {result:.2f}")
    except ZeroDivisionError:
        print(f"Index {i}: Cannot divide by zero!")
    except TypeError:
        print(f"Index {i}: '{value}' is not a valid number!")
    except Exception as e:
        print(f"Index {i}: Unexpected error — {e}")`,
              output: `100 / 10 = 10.00
Index 1: Cannot divide by zero!
Index 2: 'hello' is not a valid number!
100 / 5 = 20.00
Index 4: 'None' is not a valid number!`
            },
            {
              title: "File Handling with Exceptions",
              problem: "Safely read a file and handle potential errors.",
              explanation: "File operations can fail for many reasons. We use try-except-finally to ensure the file is always closed.",
              code: `# Example: Safe file reading
def read_file(filename):
    try:
        file = open(filename, 'r')
        content = file.read()
        print(f"File content ({len(content)} chars):")
        print(content[:100])
    except FileNotFoundError:
        print(f"Error: '{filename}' does not exist!")
    except PermissionError:
        print(f"Error: No permission to read '{filename}'!")
    except Exception as e:
        print(f"Unexpected error: {e}")
    else:
        print("File read successfully!")
    finally:
        try:
            file.close()
            print("File closed.")
        except NameError:
            pass  # file was never opened

read_file("nonexistent.txt")
print()

# Better approach: using 'with' statement
try:
    with open("test.txt", "w") as f:
        f.write("Hello, World!")
    with open("test.txt", "r") as f:
        print(f"Read: {f.read()}")
except IOError as e:
    print(f"IO Error: {e}")`,
              output: `Error: 'nonexistent.txt' does not exist!

Read: Hello, World!`
            }
          ],
          keyPoints: [
            "try block contains code that might raise an exception",
            "except catches specific exceptions — always prefer specific over general",
            "else runs ONLY if no exception was raised in try",
            "finally ALWAYS runs — use it for cleanup (closing files, connections)",
            "Use 'except Exception as e' to capture the error message",
            "Common exceptions: ZeroDivisionError, ValueError, TypeError, FileNotFoundError",
            "The 'with' statement is the preferred way to handle files (auto-closes)"
          ],
          mcqs: [
            { question: "When does the 'else' block execute?", options: ["Always", "When an exception occurs", "When NO exception occurs", "Before the try block"], correctIndex: 2, explanation: "The else block runs only when the try block completes without raising any exception." },
            { question: "When does the 'finally' block execute?", options: ["Only on success", "Only on error", "Always, regardless of exceptions", "Never automatically"], correctIndex: 2, explanation: "The finally block always executes, whether an exception occurred or not. It's used for cleanup operations." },
            { question: "What exception is raised by int('hello')?", options: ["TypeError", "ValueError", "SyntaxError", "NameError"], correctIndex: 1, explanation: "ValueError is raised when a function receives a value of the right type but inappropriate value." },
            { question: "Why is bare 'except:' considered bad practice?", options: ["It's slower", "It catches ALL exceptions including system ones", "It doesn't work", "It only catches one error"], correctIndex: 1, explanation: "Bare except catches everything including KeyboardInterrupt and SystemExit, making debugging hard." },
            { question: "What does 'except Exception as e' do?", options: ["Ignores the error", "Captures error in variable e", "Re-raises the error", "Logs to a file"], correctIndex: 1, explanation: "'as e' captures the exception object in variable e, allowing you to print or log the error message." }
          ]
        },
        {
          id: "py-u2-t2",
          title: "Custom Exceptions & raise Keyword",
          simpleExplanation: "Sometimes Python's built-in exceptions aren't specific enough. You can create your own custom exceptions to handle your app's unique error cases. The 'raise' keyword lets you manually trigger an exception whenever a condition is violated.",
          detailedExplanation: `**raise Keyword:**
You can manually raise exceptions using the \`raise\` keyword. This is useful for enforcing business rules in your code.

\`\`\`python
raise ExceptionType("Error message")
\`\`\`

**Custom Exceptions:**
Create your own exception classes by inheriting from the built-in \`Exception\` class (or any of its subclasses).

**Steps to create a custom exception:**
1. Create a class that inherits from \`Exception\`
2. Optionally override \`__init__\` and \`__str__\`
3. Raise it using the \`raise\` keyword
4. Catch it using \`except YourException\`

**Best practices:**
- Name should end with "Error" (e.g., AgeError, BalanceError)
- Create a base exception for your module, then derive specific ones
- Include meaningful error messages
- Keep exception hierarchies simple`,
          examples: [
            {
              title: "Using raise for Validation",
              problem: "Create a function that validates age and raises an error for invalid values.",
              explanation: "We use 'raise' to manually trigger exceptions when business rules are violated.",
              code: `def validate_age(age):
    if not isinstance(age, int):
        raise TypeError("Age must be an integer!")
    if age < 0:
        raise ValueError("Age cannot be negative!")
    if age > 150:
        raise ValueError("Age seems unrealistic!")
    return True

# Test cases
test_ages = [25, -5, 200, "twenty"]
for age in test_ages:
    try:
        validate_age(age)
        print(f"Age {age}: Valid ✓")
    except (TypeError, ValueError) as e:
        print(f"Age {age}: Invalid ✗ — {e}")`,
              output: `Age 25: Valid ✓
Age -5: Invalid ✗ — Age cannot be negative!
Age 200: Invalid ✗ — Age seems unrealistic!
Age twenty: Invalid ✗ — Age must be an integer!`
            },
            {
              title: "Creating Custom Exception Classes",
              problem: "Build a banking system with custom exceptions.",
              explanation: "Custom exceptions make error handling more specific and meaningful for your application.",
              code: `# Base exception for our banking module
class BankError(Exception):
    pass

class InsufficientFundsError(BankError):
    def __init__(self, balance, amount):
        self.balance = balance
        self.amount = amount
        super().__init__(f"Cannot withdraw ₹{amount}. Balance: ₹{balance}")

class InvalidAmountError(BankError):
    def __init__(self, amount):
        super().__init__(f"Invalid amount: ₹{amount}. Must be positive.")

class Account:
    def __init__(self, name, balance=0):
        self.name = name
        self.balance = balance

    def withdraw(self, amount):
        if amount <= 0:
            raise InvalidAmountError(amount)
        if amount > self.balance:
            raise InsufficientFundsError(self.balance, amount)
        self.balance -= amount
        print(f"Withdrawn ₹{amount}. Remaining: ₹{self.balance}")

acc = Account("Rahul", 1000)
tests = [500, -100, 800]
for amt in tests:
    try:
        acc.withdraw(amt)
    except InsufficientFundsError as e:
        print(f"Failed: {e}")
    except InvalidAmountError as e:
        print(f"Failed: {e}")`,
              output: `Withdrawn ₹500. Remaining: ₹500
Failed: Invalid amount: ₹-100. Must be positive.
Failed: Cannot withdraw ₹800. Balance: ₹500`
            }
          ],
          keyPoints: [
            "'raise' manually triggers an exception",
            "Custom exceptions inherit from the Exception class",
            "Name custom exceptions with 'Error' suffix (e.g., AgeError)",
            "Create a base exception for your module, then derive specific ones",
            "Custom exceptions make error handling more specific and readable",
            "Override __init__ and __str__ for meaningful error messages"
          ],
          mcqs: [
            { question: "How do you create a custom exception?", options: ["Using @exception decorator", "Inheriting from Exception class", "Using the 'custom' keyword", "Defining a function"], correctIndex: 1, explanation: "Custom exceptions are created by making a class that inherits from Exception or its subclasses." },
            { question: "What does the 'raise' keyword do?", options: ["Catches an exception", "Prevents exceptions", "Manually triggers an exception", "Ignores errors"], correctIndex: 2, explanation: "raise manually triggers a specified exception, stopping normal flow and entering exception handling." },
            { question: "Custom exception names should end with:", options: ["Exception", "Error", "Fault", "Any name works"], correctIndex: 1, explanation: "By convention, custom exception class names should end with 'Error' for clarity." },
            { question: "Can you raise built-in exceptions manually?", options: ["No, only custom ones", "Yes, using the raise keyword", "Only in try blocks", "Only in functions"], correctIndex: 1, explanation: "You can raise any exception (built-in or custom) using the raise keyword." },
            { question: "What's the best base class for custom exceptions?", options: ["BaseException", "Exception", "RuntimeError", "object"], correctIndex: 1, explanation: "Exception is the proper base class. BaseException includes KeyboardInterrupt which shouldn't be caught accidentally." }
          ]
        },
        {
          id: "py-u2-t3",
          title: "Multithreading",
          simpleExplanation: "Multithreading is like a chef cooking multiple dishes at the same time instead of finishing one completely before starting the next. Your program can do multiple things simultaneously — download a file while processing data while updating the display. The threading module in Python lets you run code in parallel.",
          detailedExplanation: `**What is a Thread?**
A thread is the smallest unit of execution. A process can have multiple threads running concurrently, sharing the same memory space.

**Why Multithreading?**
- I/O bound tasks (file reading, network requests) benefit greatly
- Improves responsiveness (UI doesn't freeze while processing)
- Better utilization of waiting time

**Python's threading module:**
- \`threading.Thread\` — Creates a new thread
- \`thread.start()\` — Begins thread execution
- \`thread.join()\` — Waits for thread to complete
- \`threading.Lock()\` — Prevents race conditions

**Important: GIL (Global Interpreter Lock)**
Python has a GIL that allows only one thread to execute Python bytecode at a time. This means:
- Multithreading is great for I/O-bound tasks (network, file, sleep)
- For CPU-bound tasks, use \`multiprocessing\` instead

**Race Condition:**
When multiple threads access shared data simultaneously, results can be unpredictable. Use locks to prevent this.`,
          examples: [
            {
              title: "Basic Threading",
              problem: "Run two tasks simultaneously using threads.",
              explanation: "Each thread runs independently. start() begins execution, join() waits for completion.",
              code: `import threading
import time

def download_file(filename, duration):
    print(f"Starting download: {filename}")
    time.sleep(duration)
    print(f"Completed download: {filename}")

def process_data(data):
    print(f"Processing {data}...")
    time.sleep(1)
    print(f"Finished processing {data}")

# Without threading (sequential)
start = time.time()

# With threading (parallel)
t1 = threading.Thread(target=download_file, args=("video.mp4", 2))
t2 = threading.Thread(target=download_file, args=("image.jpg", 1))
t3 = threading.Thread(target=process_data, args=("report",))

t1.start()
t2.start()
t3.start()

t1.join()  # Wait for t1 to finish
t2.join()
t3.join()

elapsed = time.time() - start
print(f"\\nTotal time: {elapsed:.1f}s (instead of 4s sequentially!)")`,
              output: `Starting download: video.mp4
Starting download: image.jpg
Processing report...
Finished processing report
Completed download: image.jpg
Completed download: video.mp4

Total time: 2.0s (instead of 4s sequentially!)`
            },
            {
              title: "Thread Synchronization with Locks",
              problem: "Safely update a shared counter from multiple threads.",
              explanation: "Without a lock, two threads can read/write the same variable simultaneously, causing data corruption. A lock ensures only one thread accesses the shared resource at a time.",
              code: `import threading

# Shared resource
counter = 0
lock = threading.Lock()

def increment(name, times):
    global counter
    for _ in range(times):
        lock.acquire()   # Lock before accessing shared data
        try:
            current = counter
            counter = current + 1
        finally:
            lock.release()  # Always release the lock
    print(f"{name} done. Counter = {counter}")

# Create threads
threads = []
for i in range(3):
    t = threading.Thread(target=increment, args=(f"Thread-{i+1}", 1000))
    threads.append(t)
    t.start()

for t in threads:
    t.join()

print(f"\\nFinal counter: {counter} (expected: 3000)")`,
              output: `Thread-1 done. Counter = 1000
Thread-2 done. Counter = 2000
Thread-3 done. Counter = 3000

Final counter: 3000 (expected: 3000)`
            }
          ],
          keyPoints: [
            "A thread is the smallest unit of execution within a process",
            "threading.Thread creates a thread; start() runs it, join() waits for it",
            "Multithreading is best for I/O-bound tasks (network, files, sleep)",
            "Python's GIL limits true parallelism for CPU-bound tasks",
            "Race conditions occur when threads access shared data simultaneously",
            "Use threading.Lock() to prevent race conditions",
            "Always release locks in a finally block to avoid deadlocks"
          ],
          mcqs: [
            { question: "What does thread.join() do?", options: ["Merges two threads", "Waits for the thread to finish", "Starts a new thread", "Kills the thread"], correctIndex: 1, explanation: "join() blocks the calling thread until the target thread completes its execution." },
            { question: "What is a race condition?", options: ["Threads running too fast", "Multiple threads accessing shared data simultaneously", "A threading error", "Thread priority conflict"], correctIndex: 1, explanation: "A race condition occurs when multiple threads read/write shared data concurrently, leading to unpredictable results." },
            { question: "What does Python's GIL stand for?", options: ["Global Integer Lock", "General Interpreter Lock", "Global Interpreter Lock", "Generic Instance Lock"], correctIndex: 2, explanation: "GIL (Global Interpreter Lock) ensures only one thread executes Python bytecode at a time." },
            { question: "Which is best for I/O-bound tasks?", options: ["multiprocessing", "threading", "asyncio only", "subprocess"], correctIndex: 1, explanation: "Threading is ideal for I/O-bound tasks since threads can release the GIL during I/O waits." },
            { question: "What prevents race conditions?", options: ["Using more threads", "threading.Lock()", "Global variables", "Thread priority"], correctIndex: 1, explanation: "Lock() ensures only one thread accesses the shared resource at a time, preventing data corruption." }
          ]
        }
      ]
    },
    {
      id: "py-u3",
      title: "Unit 3: Regular Expressions",
      description: "Pattern matching, groups, search, match, findall, sub",
      topics: [
        {
          id: "py-u3-t1",
          title: "Regex Basics — Pattern Matching",
          simpleExplanation: "Regular expressions (regex) are powerful patterns for searching and manipulating text. Think of it as a super-powered 'Find and Replace' that can match complex patterns — like finding all email addresses in a document, or validating phone numbers.",
          detailedExplanation: `**What is Regex?**
Regular expressions are sequences of characters that form search patterns. Python's \`re\` module provides regex support.

**Basic Pattern Elements:**
- \`.\` — Matches ANY character (except newline)
- \`\\d\` — Matches any digit (0-9)
- \`\\w\` — Matches any word character (a-z, A-Z, 0-9, _)
- \`\\s\` — Matches any whitespace (space, tab, newline)
- \`\\D\`, \`\\W\`, \`\\S\` — Negations (non-digit, non-word, non-space)

**Quantifiers:**
- \`*\` — 0 or more times
- \`+\` — 1 or more times
- \`?\` — 0 or 1 time
- \`{n}\` — Exactly n times
- \`{n,m}\` — Between n and m times

**Anchors:**
- \`^\` — Start of string
- \`$\` — End of string
- \`\\b\` — Word boundary

**Character Classes:**
- \`[abc]\` — Matches a, b, or c
- \`[a-z]\` — Any lowercase letter
- \`[^abc]\` — NOT a, b, or c

**Key re module functions:**
- \`re.search()\` — Find first match anywhere
- \`re.match()\` — Match at beginning only
- \`re.findall()\` — Find all matches
- \`re.sub()\` — Search and replace
- \`re.split()\` — Split by pattern`,
          examples: [
            {
              title: "Finding Patterns in Text",
              problem: "Use regex to extract phone numbers and emails from text.",
              explanation: "We create patterns using special regex characters and use re.findall() to find all matches.",
              code: `import re

text = """
Contact us at support@example.com or sales@company.co.in
Call: 9876543210 or +91-98765-43210
Office: 022-12345678
"""

# Find all email addresses
emails = re.findall(r'[\\w.+-]+@[\\w-]+\\.[\\w.]+', text)
print("Emails found:", emails)

# Find all phone numbers (Indian format)
phones = re.findall(r'\\+?\\d[\\d-]{8,}\\d', text)
print("Phones found:", phones)

# Check if string starts with a word
if re.match(r'Contact', text.strip()):
    print("Text starts with 'Contact'")

# Search anywhere in string
result = re.search(r'\\d{10}', text)
if result:
    print(f"First 10-digit number: {result.group()}")`,
              output: `Emails found: ['support@example.com', 'sales@company.co.in']
Phones found: ['9876543210', '+91-98765-43210', '022-12345678']
Text starts with 'Contact'
First 10-digit number: 9876543210`
            },
            {
              title: "Groups and Substitution",
              problem: "Use regex groups to extract parts and replace text.",
              explanation: "Parentheses create groups that capture parts of the match. re.sub replaces matches.",
              code: `import re

# Groups — extract parts of a match
date_text = "Today is 15-04-2025 and tomorrow is 16-04-2025"
dates = re.findall(r'(\\d{2})-(\\d{2})-(\\d{4})', date_text)
for day, month, year in dates:
    print(f"Day: {day}, Month: {month}, Year: {year}")

# Substitution — replace patterns
messy = "Hello    World   This   has    extra    spaces"
clean = re.sub(r'\\s+', ' ', messy)
print(f"\\nCleaned: '{clean}'")

# Replace with groups (reformat dates)
reformatted = re.sub(r'(\\d{2})-(\\d{2})-(\\d{4})', r'\\3/\\2/\\1', date_text)
print(f"Reformatted: {reformatted}")

# Split by pattern
data = "apple;banana,cherry:date"
parts = re.split(r'[;,:]', data)
print(f"\\nSplit: {parts}")`,
              output: `Day: 15, Month: 04, Year: 2025
Day: 16, Month: 04, Year: 2025

Cleaned: 'Hello World This has extra spaces'
Reformatted: Today is 2025/04/15 and tomorrow is 2025/04/16

Split: ['apple', 'banana', 'cherry', 'date']`
            }
          ],
          keyPoints: [
            "Regex uses special characters to define search patterns",
            "\\d matches digits, \\w matches word chars, \\s matches whitespace",
            "Quantifiers: * (0+), + (1+), ? (0-1), {n} (exact), {n,m} (range)",
            "re.search() finds first match; re.findall() finds all matches",
            "re.match() only matches at the beginning of the string",
            "Groups (parentheses) capture specific parts of a match",
            "re.sub() replaces matched patterns; re.split() splits by pattern"
          ],
          mcqs: [
            { question: "What does \\d+ match?", options: ["One digit", "One or more digits", "Zero or more digits", "Exactly two digits"], correctIndex: 1, explanation: "\\d matches a single digit, and + means 'one or more', so \\d+ matches one or more consecutive digits." },
            { question: "What's the difference between re.match() and re.search()?", options: ["No difference", "match() searches anywhere, search() at start", "match() at start only, search() anywhere", "match() returns all, search() returns first"], correctIndex: 2, explanation: "re.match() checks for a match only at the beginning. re.search() checks anywhere in the string." },
            { question: "What does re.findall() return?", options: ["First match", "True/False", "A list of all matches", "A match object"], correctIndex: 2, explanation: "re.findall() returns a list of all non-overlapping matches in the string." },
            { question: "The pattern [^abc] matches:", options: ["a, b, or c", "Any character EXCEPT a, b, c", "Start of line", "The literal ^abc"], correctIndex: 1, explanation: "Inside brackets, ^ negates the character class, matching any character NOT in the set." },
            { question: "What does re.sub(r'\\s+', ' ', text) do?", options: ["Removes all spaces", "Replaces multiple spaces with one", "Adds spaces", "Counts spaces"], correctIndex: 1, explanation: "It finds one or more whitespace characters (\\s+) and replaces each occurrence with a single space." }
          ]
        }
      ]
    },
    {
      id: "py-u4",
      title: "Unit 4: File Handling & CSV",
      description: "Reading/writing files, CSV operations, file modes",
      topics: [
        {
          id: "py-u4-t1",
          title: "File Handling in Python",
          simpleExplanation: "Files let your program save data permanently — RAM loses everything when you turn off the computer, but files on disk persist. Python makes it easy to create, read, update, and delete files using built-in functions.",
          detailedExplanation: `**Why File Handling?**
Data stored in variables is lost when the program ends. Files provide permanent storage on disk.

**File Operations:**
1. **Open** — \`open(filename, mode)\`
2. **Read** — \`.read()\`, \`.readline()\`, \`.readlines()\`
3. **Write** — \`.write()\`, \`.writelines()\`
4. **Close** — \`.close()\` (or use \`with\` statement)

**File Modes:**
| Mode | Description |
|------|-------------|
| 'r' | Read (default). Error if file doesn't exist |
| 'w' | Write. Creates file or overwrites existing |
| 'a' | Append. Creates file or adds to end |
| 'x' | Create. Error if file already exists |
| 'r+' | Read and write |
| 'b' | Binary mode (add to above: 'rb', 'wb') |

**The \`with\` Statement (Context Manager):**
Always use \`with open(...) as f:\` — it automatically closes the file even if an error occurs. This is the recommended approach.`,
          examples: [
            {
              title: "Reading and Writing Files",
              problem: "Create a file, write data, then read it back.",
              explanation: "We use 'w' mode to write and 'r' mode to read. The 'with' statement ensures proper file closure.",
              code: `# Writing to a file
with open("students.txt", "w") as f:
    f.write("Rahul - 85\\n")
    f.write("Priya - 92\\n")
    f.write("Amit - 78\\n")
print("File written successfully!")

# Reading entire file
with open("students.txt", "r") as f:
    content = f.read()
    print("Full content:")
    print(content)

# Reading line by line
print("Line by line:")
with open("students.txt", "r") as f:
    for line_num, line in enumerate(f, 1):
        print(f"  Line {line_num}: {line.strip()}")

# Appending to file
with open("students.txt", "a") as f:
    f.write("Neha - 95\\n")

print("\\nAfter appending:")
with open("students.txt", "r") as f:
    print(f.read())`,
              output: `File written successfully!
Full content:
Rahul - 85
Priya - 92
Amit - 78

Line by line:
  Line 1: Rahul - 85
  Line 2: Priya - 92
  Line 3: Amit - 78

After appending:
Rahul - 85
Priya - 92
Amit - 78
Neha - 95`
            },
            {
              title: "CSV File Operations",
              problem: "Read and write CSV files using Python's csv module.",
              explanation: "CSV (Comma Separated Values) is a common format for tabular data. Python's csv module makes it easy to work with.",
              code: `import csv

# Writing CSV
students = [
    ["Name", "Age", "Grade"],
    ["Rahul", 19, "A"],
    ["Priya", 20, "A+"],
    ["Amit", 19, "B+"],
]

with open("students.csv", "w", newline="") as f:
    writer = csv.writer(f)
    writer.writerows(students)
print("CSV written!")

# Reading CSV
print("\\nReading CSV:")
with open("students.csv", "r") as f:
    reader = csv.reader(f)
    header = next(reader)
    print(f"Columns: {header}")
    for row in reader:
        print(f"  {row[0]}, Age: {row[1]}, Grade: {row[2]}")

# Using DictReader for named access
print("\\nUsing DictReader:")
with open("students.csv", "r") as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(f"  {row['Name']} got grade {row['Grade']}")`,
              output: `CSV written!

Reading CSV:
Columns: ['Name', 'Age', 'Grade']
  Rahul, Age: 19, Grade: A
  Priya, Age: 20, Grade: A+
  Amit, Age: 19, Grade: B+

Using DictReader:
  Rahul got grade A
  Priya got grade A+
  Amit got grade B+`
            }
          ],
          keyPoints: [
            "Files provide permanent storage — data persists after program ends",
            "Always use 'with open()' to ensure files are properly closed",
            "Modes: 'r' (read), 'w' (write/overwrite), 'a' (append), 'x' (create new)",
            "read() gets entire content; readline() gets one line; readlines() gets list of lines",
            "CSV module: csv.reader() for reading, csv.writer() for writing",
            "DictReader allows accessing CSV columns by name instead of index",
            "'newline=\"\"' parameter prevents extra blank lines in CSV on Windows"
          ],
          mcqs: [
            { question: "What mode opens a file for writing, creating it if it doesn't exist?", options: ["'r'", "'w'", "'x'", "'a'"], correctIndex: 1, explanation: "'w' mode opens for writing and creates the file if it doesn't exist. Warning: it overwrites existing content!" },
            { question: "What is the advantage of 'with open()' over 'open()'?", options: ["Faster reading", "Automatically closes the file", "Can read larger files", "Supports more formats"], correctIndex: 1, explanation: "'with' statement ensures the file is properly closed even if an exception occurs, preventing resource leaks." },
            { question: "What does CSV stand for?", options: ["Comma Separated Values", "Character String Variables", "Coded Standard Values", "Column Structured View"], correctIndex: 0, explanation: "CSV stands for Comma Separated Values — a simple text format for tabular data." },
            { question: "Which method reads all lines into a list?", options: ["read()", "readline()", "readlines()", "readall()"], correctIndex: 2, explanation: "readlines() returns a list where each element is a line from the file." },
            { question: "What does 'a' mode do?", options: ["Overwrites the file", "Appends to end of file", "Creates a new file only", "Reads in append mode"], correctIndex: 1, explanation: "'a' mode opens the file for appending — new data is added to the end without erasing existing content." }
          ]
        }
      ]
    },
    {
      id: "py-u5",
      title: "Unit 5: NumPy",
      description: "Arrays, operations, mathematical functions, array manipulation",
      topics: [
        {
          id: "py-u5-t1",
          title: "NumPy Arrays & Operations",
          simpleExplanation: "NumPy (Numerical Python) is a library for working with numbers and arrays efficiently. While Python lists are flexible, they're slow for math. NumPy arrays are like supercharged lists — they're faster, use less memory, and support mathematical operations directly.",
          detailedExplanation: `**Why NumPy over Lists?**
- **Speed**: NumPy uses C under the hood — up to 50x faster than lists
- **Memory**: Stores elements efficiently (fixed type, contiguous memory)
- **Vectorized operations**: Do math on entire arrays without loops
- **Broadcasting**: Automatically handles arrays of different shapes

**Creating Arrays:**
- \`np.array([1, 2, 3])\` — From a list
- \`np.zeros((3, 4))\` — All zeros
- \`np.ones((2, 3))\` — All ones
- \`np.arange(0, 10, 2)\` — Range with step
- \`np.linspace(0, 1, 5)\` — Evenly spaced
- \`np.random.randint(0, 10, (3, 3))\` — Random

**Key Properties:**
- \`shape\` — Dimensions (rows, cols)
- \`dtype\` — Data type
- \`size\` — Total elements
- \`ndim\` — Number of dimensions

**Array Operations:**
Element-wise: +, -, *, /, ** all work on entire arrays
Aggregation: sum(), mean(), max(), min(), std()
Reshaping: reshape(), flatten(), transpose()`,
          examples: [
            {
              title: "Creating and Manipulating Arrays",
              problem: "Create arrays and perform basic operations.",
              explanation: "NumPy operations work on entire arrays at once — no loops needed!",
              code: `import numpy as np

# Creating arrays
a = np.array([1, 2, 3, 4, 5])
b = np.array([10, 20, 30, 40, 50])

print("Array a:", a)
print("Array b:", b)

# Element-wise operations
print("\\na + b =", a + b)
print("a * b =", a * b)
print("a ** 2 =", a ** 2)

# Aggregation
print("\\nSum of a:", a.sum())
print("Mean of a:", a.mean())
print("Max of b:", b.max())
print("Std of a:", a.std().round(2))

# 2D Arrays
matrix = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
print("\\nMatrix:")
print(matrix)
print("Shape:", matrix.shape)
print("Row sums:", matrix.sum(axis=1))
print("Col sums:", matrix.sum(axis=0))`,
              output: `Array a: [1 2 3 4 5]
Array b: [10 20 30 40 50]

a + b = [11 22 33 44 55]
a * b = [ 10  40  90 160 250]
a ** 2 = [ 1  4  9 16 25]

Sum of a: 15
Mean of a: 3.0
Max of b: 50
Std of a: 1.41

Matrix:
[[1 2 3]
 [4 5 6]
 [7 8 9]]
Shape: (3, 3)
Row sums: [ 6 15 24]
Col sums: [12 15 18]`
            },
            {
              title: "Array Indexing, Slicing & Reshaping",
              problem: "Access and reshape array elements.",
              explanation: "NumPy supports powerful indexing, boolean masking, and shape transformation.",
              code: `import numpy as np

a = np.array([10, 20, 30, 40, 50, 60, 70, 80, 90])

# Slicing
print("First 3:", a[:3])
print("Last 3:", a[-3:])
print("Every 2nd:", a[::2])

# Boolean indexing (filtering)
print("\\n> 50:", a[a > 50])
print("Even:", a[a % 20 == 0])

# Reshaping
reshaped = a.reshape(3, 3)
print("\\nReshaped to 3x3:")
print(reshaped)

# Flatten back
flat = reshaped.flatten()
print("Flattened:", flat)

# Transpose
print("\\nTranspose:")
print(reshaped.T)

# Stacking arrays
x = np.array([1, 2, 3])
y = np.array([4, 5, 6])
print("\\nVStack:", np.vstack([x, y]))
print("HStack:", np.hstack([x, y]))`,
              output: `First 3: [10 20 30]
Last 3: [70 80 90]
Every 2nd: [10 30 50 70 90]

> 50: [60 70 80 90]
Even: [20 40 60 80]

Reshaped to 3x3:
[[10 20 30]
 [40 50 60]
 [70 80 90]]
Flattened: [10 20 30 40 50 60 70 80 90]

Transpose:
[[10 40 70]
 [20 50 80]
 [30 60 90]]

VStack: [[1 2 3]
 [4 5 6]]
HStack: [1 2 3 4 5 6]`
            }
          ],
          keyPoints: [
            "NumPy arrays are faster and more memory-efficient than Python lists",
            "All elements must be the same data type (homogeneous)",
            "Vectorized operations: do math on entire arrays without loops",
            "Shape, dtype, size, ndim are key array properties",
            "Boolean indexing: arr[arr > 5] filters elements by condition",
            "reshape() changes dimensions; flatten() converts to 1D; T transposes",
            "axis=0 means columns, axis=1 means rows for aggregation functions"
          ],
          mcqs: [
            { question: "Why is NumPy faster than Python lists?", options: ["Better syntax", "Uses C internally and contiguous memory", "Has more functions", "Runs on GPU"], correctIndex: 1, explanation: "NumPy arrays use C under the hood with fixed types and contiguous memory allocation, making operations much faster." },
            { question: "What does arr.reshape(3, 4) do?", options: ["Creates a new array", "Rearranges into 3 rows, 4 columns", "Adds elements", "Sorts the array"], correctIndex: 1, explanation: "reshape() rearranges elements into the specified dimensions without changing the data." },
            { question: "What does np.arange(0, 10, 2) produce?", options: ["[0, 2, 4, 6, 8]", "[0, 1, 2, 3, 4]", "[2, 4, 6, 8, 10]", "[0, 10, 2]"], correctIndex: 0, explanation: "arange(start, stop, step) generates values from 0 to 10 (exclusive) with step 2." },
            { question: "In NumPy, arr[arr > 5] is called:", options: ["Fancy indexing", "Boolean indexing", "Slice indexing", "Conditional slicing"], correctIndex: 1, explanation: "Boolean indexing uses a boolean condition to filter array elements." },
            { question: "What does axis=0 mean in np.sum(arr, axis=0)?", options: ["Sum rows", "Sum columns", "Sum all", "Sum diagonals"], correctIndex: 1, explanation: "axis=0 operates along columns (vertically), summing each column across all rows." }
          ]
        }
      ]
    },
    {
      id: "py-u6",
      title: "Unit 6: Pandas & Matplotlib",
      description: "DataFrames, Series, data manipulation, visualization",
      topics: [
        {
          id: "py-u6-t1",
          title: "Pandas — Series & DataFrames",
          simpleExplanation: "Pandas is Python's most popular data analysis library. Think of it as Excel inside Python. A Series is like a single column, and a DataFrame is a full table with rows and columns. You can load data from CSV files, filter it, calculate statistics, and more — all with simple code.",
          detailedExplanation: `**What is Pandas?**
Pandas (Python Data Analysis Library) provides powerful data structures for data manipulation and analysis.

**Core Components:**
1. **Series** — 1D labeled array (like a single column)
2. **DataFrame** — 2D labeled table (like a spreadsheet)

**Creating DataFrames:**
- From dictionary: \`pd.DataFrame({'col1': [1,2], 'col2': [3,4]})\`
- From CSV: \`pd.read_csv('file.csv')\`
- From list of lists: \`pd.DataFrame([[1,2],[3,4]], columns=['A','B'])\`

**Essential Operations:**
- \`df.head()\` / \`df.tail()\` — First/last rows
- \`df.info()\` — Column types, non-null counts
- \`df.describe()\` — Statistical summary
- \`df.shape\` — (rows, columns)
- \`df['col']\` — Select column
- \`df.loc[]\` — Select by label
- \`df.iloc[]\` — Select by position
- \`df[df['col'] > value]\` — Filter rows
- \`df.groupby('col').mean()\` — Group and aggregate
- \`df.sort_values('col')\` — Sort
- \`df.dropna()\` / \`df.fillna()\` — Handle missing values`,
          examples: [
            {
              title: "Creating and Exploring DataFrames",
              problem: "Create a student DataFrame and explore its properties.",
              explanation: "We create a DataFrame from a dictionary and use various methods to understand the data.",
              code: `import pandas as pd

# Create DataFrame from dictionary
data = {
    'Name': ['Rahul', 'Priya', 'Amit', 'Neha', 'Vikram'],
    'Age': [19, 20, 19, 21, 20],
    'Marks': [85, 92, 78, 95, 88],
    'Grade': ['A', 'A+', 'B+', 'A+', 'A']
}

df = pd.DataFrame(data)
print("DataFrame:")
print(df)
print(f"\\nShape: {df.shape}")
print(f"Columns: {list(df.columns)}")

# Statistical summary
print("\\nStatistics:")
print(df.describe())

# Selecting data
print(f"\\nNames: {list(df['Name'])}")
print(f"\\nTop scorer: {df.loc[df['Marks'].idxmax(), 'Name']} ({df['Marks'].max()})")`,
              output: `DataFrame:
     Name  Age  Marks Grade
0   Rahul   19     85     A
1   Priya   20     92    A+
2    Amit   19     78    B+
3    Neha   21     95    A+
4  Vikram   20     88     A

Shape: (5, 4)
Columns: ['Name', 'Age', 'Marks', 'Grade']

Statistics:
             Age      Marks
count   5.000000   5.000000
mean   19.800000  87.600000
std     0.836660   6.542171
min    19.000000  78.000000
max    21.000000  95.000000

Names: ['Rahul', 'Priya', 'Amit', 'Neha', 'Vikram']

Top scorer: Neha (95)`
            },
            {
              title: "Filtering, Sorting & Grouping",
              problem: "Filter students by marks, sort, and group by grade.",
              explanation: "Pandas makes data manipulation easy with intuitive syntax for filtering, sorting, and aggregation.",
              code: `import pandas as pd

df = pd.DataFrame({
    'Name': ['Rahul', 'Priya', 'Amit', 'Neha', 'Vikram', 'Sita'],
    'Department': ['CS', 'CS', 'IT', 'CS', 'IT', 'IT'],
    'Marks': [85, 92, 78, 95, 88, 91]
})

# Filtering
high_scorers = df[df['Marks'] >= 90]
print("High scorers (>=90):")
print(high_scorers)

# Sorting
sorted_df = df.sort_values('Marks', ascending=False)
print("\\nSorted by marks:")
print(sorted_df[['Name', 'Marks']])

# Grouping
dept_stats = df.groupby('Department')['Marks'].agg(['mean', 'max', 'count'])
print("\\nDepartment statistics:")
print(dept_stats.round(1))

# Adding new column
df['Result'] = df['Marks'].apply(lambda x: 'Pass' if x >= 80 else 'Needs Improvement')
print("\\nWith results:")
print(df[['Name', 'Marks', 'Result']])`,
              output: `High scorers (>=90):
    Name Department  Marks
1  Priya         CS     92
3   Neha         CS     95
5   Sita         IT     91

Sorted by marks:
     Name  Marks
3    Neha     95
1   Priya     92
5    Sita     91
4  Vikram     88
0   Rahul     85
2    Amit     78

Department statistics:
            mean  max  count
Department
CS          90.7   95      3
IT          85.7   91      3

With results:
     Name  Marks           Result
0   Rahul     85             Pass
1   Priya     92             Pass
2    Amit     78  Needs Improvement
3    Neha     95             Pass
4  Vikram     88             Pass
5    Sita     91             Pass`
            }
          ],
          keyPoints: [
            "Series is 1D (column); DataFrame is 2D (table)",
            "Create DataFrames from dictionaries, lists, or CSV files",
            "df.head(), df.info(), df.describe() for quick data exploration",
            "df[condition] filters rows; df['col'] selects columns",
            "loc[] selects by label; iloc[] selects by position",
            "groupby() groups data for aggregation (mean, sum, count)",
            "sort_values() sorts; apply() applies custom functions to columns"
          ],
          mcqs: [
            { question: "What is a Pandas DataFrame?", options: ["A 1D array", "A 2D labeled data structure", "A graph", "A database connection"], correctIndex: 1, explanation: "A DataFrame is a 2D labeled data structure with rows and columns, similar to a spreadsheet." },
            { question: "How do you select rows where Marks > 90?", options: ["df.select(Marks > 90)", "df[df['Marks'] > 90]", "df.filter(Marks > 90)", "df.where(90)"], correctIndex: 1, explanation: "df[df['Marks'] > 90] uses boolean indexing to filter rows where the condition is True." },
            { question: "What does df.describe() show?", options: ["Column names only", "Data types", "Statistical summary (count, mean, std, etc.)", "First 5 rows"], correctIndex: 2, explanation: "describe() generates descriptive statistics including count, mean, std, min, max, and quartiles." },
            { question: "What's the difference between loc and iloc?", options: ["No difference", "loc by label, iloc by position", "loc for rows, iloc for columns", "loc is faster"], correctIndex: 1, explanation: "loc uses labels/names to select data; iloc uses integer positions (0, 1, 2...)." },
            { question: "What does groupby() do?", options: ["Sorts data", "Groups data by column values for aggregation", "Merges DataFrames", "Creates a new column"], correctIndex: 1, explanation: "groupby() splits data into groups based on column values, allowing group-level operations like mean, sum, etc." }
          ]
        }
      ]
    },
    {
      id: "py-u7",
      title: "Unit 7: System Level Interaction",
      description: "sys module, stdin/stdout/stderr, command line arguments, environment",
      topics: [
        {
          id: "py-u7-t1",
          title: "sys Module & Command Line Interaction",
          simpleExplanation: "The sys module lets your Python program interact with the system — read command-line arguments, control input/output streams, and access system information. It's like giving your program access to the computer's control panel.",
          detailedExplanation: `**The sys Module** provides access to system-specific parameters and functions.

**Standard Streams:**
- \`sys.stdin\` — Standard input (keyboard by default)
- \`sys.stdout\` — Standard output (console by default)
- \`sys.stderr\` — Standard error (console by default)
These can be redirected to files or other programs.

**Command Line Arguments (\`sys.argv\`):**
When you run \`python script.py arg1 arg2\`:
- \`sys.argv[0]\` = "script.py" (script name)
- \`sys.argv[1]\` = "arg1"
- \`sys.argv[2]\` = "arg2"
- \`len(sys.argv)\` = number of arguments

**Other Useful Functions:**
- \`sys.exit()\` — Exit the program
- \`sys.path\` — Module search paths
- \`sys.version\` — Python version
- \`sys.platform\` — Operating system
- \`sys.getsizeof()\` — Memory size of object
- \`sys.getrecursionlimit()\` — Max recursion depth`,
          examples: [
            {
              title: "Working with sys Module",
              problem: "Explore system information and standard streams.",
              explanation: "sys provides access to system information and I/O streams.",
              code: `import sys

# System information
print(f"Python version: {sys.version.split()[0]}")
print(f"Platform: {sys.platform}")
print(f"Max integer: {sys.maxsize}")
print(f"Recursion limit: {sys.getrecursionlimit()}")

# Memory sizes
x = 42
s = "Hello Python"
lst = [1, 2, 3, 4, 5]
print(f"\\nMemory usage:")
print(f"  int(42): {sys.getsizeof(x)} bytes")
print(f"  str: {sys.getsizeof(s)} bytes")
print(f"  list: {sys.getsizeof(lst)} bytes")

# stdout writing (same as print)
sys.stdout.write("Written via stdout\\n")

# stderr for errors
sys.stderr.write("This is an error message\\n")

# Module search path
print(f"\\nNumber of search paths: {len(sys.path)}")
print(f"First path: {sys.path[0] or '(current directory)'}")`,
              output: `Python version: 3.11.0
Platform: linux
Max integer: 9223372036854775807
Recursion limit: 1000

Memory usage:
  int(42): 28 bytes
  str: 61 bytes
  list: 120 bytes

Written via stdout
This is an error message

Number of search paths: 8
First path: (current directory)`
            },
            {
              title: "Command Line Arguments",
              problem: "Create a script that processes command-line arguments.",
              explanation: "sys.argv contains the command-line arguments as a list of strings.",
              code: `import sys

# Simulating command line arguments
# In real usage: python calculator.py add 5 3
sys.argv = ["calculator.py", "add", "5", "3"]

print(f"Script name: {sys.argv[0]}")
print(f"Total arguments: {len(sys.argv)}")

if len(sys.argv) < 4:
    print("Usage: python calculator.py <operation> <num1> <num2>")
    # sys.exit(1)  # Exit with error code
else:
    operation = sys.argv[1]
    num1 = float(sys.argv[2])
    num2 = float(sys.argv[3])

    if operation == "add":
        print(f"{num1} + {num2} = {num1 + num2}")
    elif operation == "sub":
        print(f"{num1} - {num2} = {num1 - num2}")
    elif operation == "mul":
        print(f"{num1} × {num2} = {num1 * num2}")
    elif operation == "div":
        if num2 == 0:
            sys.stderr.write("Error: Division by zero!\\n")
        else:
            print(f"{num1} ÷ {num2} = {num1 / num2}")
    else:
        print(f"Unknown operation: {operation}")`,
              output: `Script name: calculator.py
Total arguments: 4
5.0 + 3.0 = 8.0`
            }
          ],
          keyPoints: [
            "sys module provides access to system-specific parameters and functions",
            "sys.argv is a list of command-line arguments; [0] is the script name",
            "sys.stdin, sys.stdout, sys.stderr are the standard I/O streams",
            "sys.exit() terminates the program; 0 = success, non-zero = error",
            "sys.path is the list of directories Python searches for modules",
            "sys.getsizeof() returns the memory size of an object in bytes",
            "sys.platform tells you the operating system (linux, win32, darwin)"
          ],
          mcqs: [
            { question: "What does sys.argv[0] contain?", options: ["First argument", "Script name", "Python version", "Current directory"], correctIndex: 1, explanation: "sys.argv[0] always contains the name of the Python script being executed." },
            { question: "What is sys.stdout?", options: ["Standard input", "Standard output (console)", "Standard error", "System log"], correctIndex: 1, explanation: "sys.stdout is the standard output stream, which defaults to the console/terminal." },
            { question: "sys.exit(0) means:", options: ["Error occurred", "Successful termination", "Restart program", "Close all files"], correctIndex: 1, explanation: "Exit code 0 conventionally means successful termination. Non-zero indicates an error." },
            { question: "What does sys.getsizeof() return?", options: ["File size", "Variable name length", "Memory size in bytes", "Data type size"], correctIndex: 2, explanation: "sys.getsizeof() returns the size of an object in bytes, including overhead." },
            { question: "sys.path is used for:", options: ["File system navigation", "Finding installed modules", "Network paths", "User directories"], correctIndex: 1, explanation: "sys.path is a list of directories that Python searches when importing modules." }
          ]
        }
      ]
    },
    {
      id: "py-u8",
      title: "Unit 8: Testing in Python",
      description: "unittest, test cases, assertions, TDD, black box vs white box",
      topics: [
        {
          id: "py-u8-t1",
          title: "Software Testing & unittest",
          simpleExplanation: "Testing is checking whether your code works correctly before deploying it. Instead of manually running your program and checking output, you write test code that automatically verifies your functions. Python's unittest module helps you write and run these tests systematically.",
          detailedExplanation: `**What is Software Testing?**
Testing verifies that software meets requirements and is defect-free. It catches bugs early, saving time and money.

**Types of Testing:**
1. **Manual Testing** — Humans run tests manually (slow, error-prone)
2. **Automated Testing** — Scripts test automatically (fast, repeatable)

**Testing Methods:**
- **White Box** — Tester knows the internal code structure
- **Black Box** — Tester only knows inputs and expected outputs

**Unit Testing:**
Testing individual components (functions, methods) in isolation.

**Python unittest Module:**
- Create a class inheriting from \`unittest.TestCase\`
- Write test methods starting with \`test_\`
- Use assertion methods to verify results

**Common Assertions:**
| Method | Checks |
|--------|--------|
| assertEqual(a, b) | a == b |
| assertNotEqual(a, b) | a != b |
| assertTrue(x) | x is True |
| assertFalse(x) | x is False |
| assertIn(a, b) | a in b |
| assertRaises(Error) | Exception is raised |
| assertIsNone(x) | x is None |

**Test-Driven Development (TDD):**
1. Write a failing test first
2. Write minimal code to pass the test
3. Refactor the code
4. Repeat`,
          examples: [
            {
              title: "Basic Unit Testing",
              problem: "Write tests for a calculator module.",
              explanation: "Each test method checks one specific behavior. We use assertEqual to verify results.",
              code: `import unittest

# Functions to test
def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

def divide(a, b):
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b

# Test class
class TestCalculator(unittest.TestCase):

    def test_add_positive(self):
        self.assertEqual(add(3, 5), 8)

    def test_add_negative(self):
        self.assertEqual(add(-1, -1), -2)

    def test_subtract(self):
        self.assertEqual(subtract(10, 3), 7)

    def test_divide(self):
        self.assertEqual(divide(10, 2), 5.0)

    def test_divide_by_zero(self):
        with self.assertRaises(ValueError):
            divide(10, 0)

# Run tests
suite = unittest.TestLoader().loadTestsFromTestCase(TestCalculator)
runner = unittest.TextTestRunner(verbosity=2)
runner.run(suite)`,
              output: `test_add_negative (__main__.TestCalculator) ... ok
test_add_positive (__main__.TestCalculator) ... ok
test_divide (__main__.TestCalculator) ... ok
test_divide_by_zero (__main__.TestCalculator) ... ok
test_subtract (__main__.TestCalculator) ... ok

----------------------------------------------------------------------
Ran 5 tests in 0.001s

OK`
            },
            {
              title: "Testing with Edge Cases",
              problem: "Write comprehensive tests including edge cases.",
              explanation: "Good tests cover normal cases, boundary conditions, and error scenarios.",
              code: `import unittest

def is_palindrome(s):
    s = s.lower().replace(" ", "")
    return s == s[::-1]

def find_max(lst):
    if not lst:
        raise ValueError("List is empty")
    return max(lst)

class TestStringUtils(unittest.TestCase):

    def test_palindrome_true(self):
        self.assertTrue(is_palindrome("madam"))

    def test_palindrome_false(self):
        self.assertFalse(is_palindrome("hello"))

    def test_palindrome_spaces(self):
        self.assertTrue(is_palindrome("race car"))

    def test_palindrome_mixed_case(self):
        self.assertTrue(is_palindrome("RaceCar"))

class TestFindMax(unittest.TestCase):

    def test_normal_list(self):
        self.assertEqual(find_max([3, 1, 4, 1, 5]), 5)

    def test_single_element(self):
        self.assertEqual(find_max([42]), 42)

    def test_negative_numbers(self):
        self.assertEqual(find_max([-5, -1, -10]), -1)

    def test_empty_list(self):
        with self.assertRaises(ValueError):
            find_max([])

# Run
loader = unittest.TestLoader()
suite = unittest.TestSuite()
suite.addTests(loader.loadTestsFromTestCase(TestStringUtils))
suite.addTests(loader.loadTestsFromTestCase(TestFindMax))
unittest.TextTestRunner(verbosity=2).run(suite)`,
              output: `test_palindrome_false (__main__.TestStringUtils) ... ok
test_palindrome_mixed_case (__main__.TestStringUtils) ... ok
test_palindrome_spaces (__main__.TestStringUtils) ... ok
test_palindrome_true (__main__.TestStringUtils) ... ok
test_empty_list (__main__.TestFindMax) ... ok
test_negative_numbers (__main__.TestFindMax) ... ok
test_normal_list (__main__.TestFindMax) ... ok
test_single_element (__main__.TestFindMax) ... ok

----------------------------------------------------------------------
Ran 8 tests in 0.002s

OK`
            }
          ],
          keyPoints: [
            "Unit testing checks individual functions/methods in isolation",
            "Test classes inherit from unittest.TestCase",
            "Test method names MUST start with 'test_'",
            "assertEqual, assertTrue, assertRaises are common assertions",
            "assertRaises checks that specific exceptions are raised",
            "Good tests cover normal cases, edge cases, and error cases",
            "TDD: Write test first → Write code to pass → Refactor → Repeat"
          ],
          mcqs: [
            { question: "What must test method names start with?", options: ["check_", "verify_", "test_", "assert_"], correctIndex: 2, explanation: "unittest discovers test methods by looking for methods starting with 'test_'. Other names are ignored." },
            { question: "What does assertEqual(a, b) check?", options: ["a is b", "a == b", "a > b", "type(a) == type(b)"], correctIndex: 1, explanation: "assertEqual checks that a equals b. If not, the test fails with a descriptive message." },
            { question: "White box testing means:", options: ["Testing without code knowledge", "Testing with full code knowledge", "Testing UI only", "Testing performance"], correctIndex: 1, explanation: "White box testing means the tester knows the internal code structure and tests code paths, loops, and conditions." },
            { question: "In TDD, what comes first?", options: ["Writing code", "Writing tests", "Code review", "Deployment"], correctIndex: 1, explanation: "Test-Driven Development writes a failing test first, then writes the minimum code to pass it." },
            { question: "assertRaises is used to:", options: ["Prevent exceptions", "Check an exception is raised", "Raise an exception", "Count exceptions"], correctIndex: 1, explanation: "assertRaises verifies that a specific exception is raised when running the code." }
          ]
        }
      ]
    }
  ]
};
