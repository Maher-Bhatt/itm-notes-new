// @ts-nocheck
import { Subject } from './types';

export const sem3DetailedSubjects: Subject[] = [
  {
    id: "sub-coanmp",
    name: "Computer Oriented Numerical Methods with Python (COANMP)",
    code: "COANMP",
    color: "bg-blue-600",
    icon: "calculator",
    description: "Numerical analysis, root finding, interpolation, and integration using Python.",
    semester: 3,
    units: [
      {
        id: "coanmp-u1",
        title: "Unit 1: Roots of Non-Linear Equations",
        description: "Bisection, Newton-Raphson, and Secant Methods.",
        topics: [
          {
            id: "coanmp-t1",
            title: "The Bisection Method",
            simpleExplanation: "A simple root-finding method that repeatedly halves an interval to find where a function crosses zero.",
            detailedExplanation: "The Bisection Method is based on the Intermediate Value Theorem. If a continuous function $f(x)$ has values of opposite signs at the endpoints of an interval $[a, b]$ (i.e., $f(a) \\times f(b) < 0$), then the function must have at least one root in that interval.\n\n### Algorithm Steps:\n1. Choose two initial guesses $a$ and $b$ such that $f(a)f(b) < 0$.\n2. Calculate the midpoint $c = \\frac{a+b}{2}$.\n3. Evaluate $f(c)$.\n4. If $f(c) == 0$ (or is within an acceptable tolerance), $c$ is the root.\n5. If $f(a)f(c) < 0$, the root lies in $[a, c]$. Set $b = c$.\n6. If $f(c)f(b) < 0$, the root lies in $[c, b]$. Set $a = c$.\n7. Repeat until the interval is sufficiently small.\n\n**Advantages**: Guaranteed to converge.\n**Disadvantages**: Converges very slowly compared to other methods.",
            shortNotes: "Bisection = Halve the interval. Needs f(a) * f(b) < 0.",
            examples: [
              {
                title: "Python Implementation",
                problem: "Write a Python script to find the root using Bisection.",
                explanation: "We define a function and run a loop until the difference between a and b is smaller than our tolerance.",
                code: "def bisection(f, a, b, tol):\n    if f(a)*f(b) >= 0:\n        return None\n    c = a\n    while (b-a) >= tol:\n        c = (a+b)/2\n        if f(c) == 0.0:\n            break\n        if f(c)*f(a) < 0:\n            b = c\n        else:\n            a = c\n    return c"
              }
            ],
            keyPoints: ["Based on Intermediate Value Theorem", "Requires bracket [a,b]", "Slow but guaranteed convergence"],
            mcqs: [
              { question: "What is the condition for bisection method?", options: ["f(a)*f(b) > 0", "f(a)*f(b) < 0", "f(a)=f(b)", "None"], correctIndex: 1, explanation: "Signs must be opposite." }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "sub-dsa",
    name: "Data Structures and Algorithms (DSA)",
    code: "DSA301",
    color: "bg-green-600",
    icon: "database",
    description: "Deep dive into Arrays, Linked Lists, Trees, Graphs, and Dynamic Programming.",
    semester: 3,
    units: [
      {
        id: "dsa-u1",
        title: "Unit 1: Non-Linear Data Structures (Trees)",
        description: "Binary Trees, BST, AVL Trees, and Traversals.",
        topics: [
          {
            id: "dsa-t1",
            title: "Binary Search Trees (BST)",
            simpleExplanation: "A tree where every left child is smaller than the parent, and every right child is larger.",
            detailedExplanation: "A Binary Search Tree (BST) is a node-based binary tree data structure with the following properties:\n\n- The left subtree of a node contains only nodes with keys lesser than the node's key.\n- The right subtree of a node contains only nodes with keys greater than the node's key.\n- The left and right subtree each must also be a binary search tree.\n\n### Time Complexity:\n- **Search**: $O(\\log n)$ on average, $O(n)$ worst-case (skewed tree).\n- **Insertion**: $O(\\log n)$ average.\n- **Deletion**: $O(\\log n)$ average.\n\n### Traversals:\n- **Inorder** (Left, Root, Right): Visits nodes in ascending order!\n- **Preorder** (Root, Left, Right): Useful for copying trees.\n- **Postorder** (Left, Right, Root): Useful for deleting trees.",
            shortNotes: "BST: Left < Root < Right. Inorder traversal gives sorted data.",
            examples: [
              {
                title: "BST Node in Java",
                problem: "Define a BST Node",
                explanation: "A standard BST node contains data, left pointer, and right pointer.",
                code: "class Node {\n    int key;\n    Node left, right;\n    public Node(int item) {\n        key = item;\n        left = right = null;\n    }\n}"
              }
            ],
            keyPoints: ["Left smaller, Right larger", "Inorder gives sorted sequence", "Worst case O(n) if unbalanced"],
            mcqs: [
              { question: "Which traversal of a BST gives sorted output?", options: ["Preorder", "Postorder", "Inorder", "Level-order"], correctIndex: 2, explanation: "Inorder visits left (smaller), root, right (larger)." }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "sub-dbms",
    name: "Database Management Systems (DBMS)",
    code: "DBMS302",
    color: "bg-orange-600",
    icon: "server",
    description: "SQL, Relational Algebra, Normalization, ACID properties.",
    semester: 3,
    units: [
      {
        id: "dbms-u1",
        title: "Unit 1: Normalization & ACID",
        description: "Organizing data to minimize redundancy.",
        topics: [
          {
            id: "dbms-t1",
            title: "Database Normalization (1NF, 2NF, 3NF, BCNF)",
            simpleExplanation: "Normalization is the process of splitting tables to reduce data duplication and prevent anomalies.",
            detailedExplanation: "Normalization involves organizing columns and tables to ensure their dependencies make sense.\n\n### Normal Forms:\n1. **1NF (First Normal Form)**: No repeating groups. Every cell must contain a single (atomic) value.\n2. **2NF (Second Normal Form)**: Must be in 1NF. No partial dependencies (all non-key attributes must depend on the ENTIRE primary key, not just part of a composite key).\n3. **3NF (Third Normal Form)**: Must be in 2NF. No transitive dependencies (non-key attributes cannot depend on other non-key attributes).\n4. **BCNF (Boyce-Codd Normal Form)**: A stricter 3NF. For every dependency $X \\rightarrow Y$, $X$ MUST be a superkey.\n\n### Why normalize?\nTo prevent **Insertion**, **Update**, and **Deletion anomalies**.",
            shortNotes: "1NF: Atomic values. 2NF: No partial dependency. 3NF: No transitive dependency.",
            examples: [
              {
                title: "3NF Violation Example",
                problem: "Identify the 3NF violation: \`Students(StudentID, Name, Department, DeptHead)\`",
                explanation: "DeptHead depends on Department, and Department depends on StudentID. This is a transitive dependency! Fix: Split into \`Students(StudentID, Name, Department)\` and \`Departments(Department, DeptHead)\`."
              }
            ],
            keyPoints: ["Reduces redundancy", "Prevents anomalies", "BCNF is stricter than 3NF"],
            mcqs: [
              { question: "Transitive dependency is removed in which Normal Form?", options: ["1NF", "2NF", "3NF", "BCNF"], correctIndex: 2, explanation: "3NF specifically targets transitive dependencies." }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "sub-java",
    name: "Object Oriented Programming (Java)",
    code: "JAVA303",
    color: "bg-red-600",
    icon: "coffee",
    description: "Deep dive into OOP concepts, multithreading, and collections.",
    semester: 3,
    units: [
      {
        id: "java-u1",
        title: "Unit 1: Four Pillars of OOP",
        description: "Encapsulation, Inheritance, Polymorphism, Abstraction.",
        topics: [
          {
            id: "java-t1",
            title: "Polymorphism (Overloading vs Overriding)",
            simpleExplanation: "Polymorphism means 'many forms'. It allows objects to be treated as instances of their parent class.",
            detailedExplanation: "There are two main types of polymorphism in Java:\n\n### 1. Compile-Time Polymorphism (Method Overloading)\nOccurs when multiple methods in the same class have the same name but different parameters (type, number, or order). The compiler decides which method to call.\n\n### 2. Run-Time Polymorphism (Method Overriding)\nOccurs when a subclass provides a specific implementation of a method that is already provided by its parent class. It requires inheritance. The JVM decides at runtime which method to call based on the actual object type, not the reference type (Dynamic Method Dispatch).\n\n**Rules for Overriding:**\n- Method name and parameters must be EXACTLY the same.\n- Return type must be same or covariant.\n- Access modifier cannot be more restrictive.",
            shortNotes: "Overloading = same name, diff params (Compile-time). Overriding = same name, same params in child class (Run-time).",
            examples: [
              {
                title: "Method Overriding",
                problem: "Demonstrate dynamic method dispatch.",
                code: "class Animal { void sound() { print(\"Animal\"); } }\nclass Dog extends Animal { void sound() { print(\"Bark\"); } }\n\nAnimal myDog = new Dog();\nmyDog.sound(); // Prints 'Bark' because actual object is Dog!"
              }
            ],
            keyPoints: ["Overloading happens at compile time", "Overriding happens at runtime", "Overriding requires inheritance"],
            mcqs: [
              { question: "Which concept allows dynamic method dispatch?", options: ["Overloading", "Overriding", "Encapsulation", "Abstraction"], correctIndex: 1, explanation: "Overriding allows the JVM to determine the method at runtime." }
            ]
          }
        ]
      }
    ]
  }
];
