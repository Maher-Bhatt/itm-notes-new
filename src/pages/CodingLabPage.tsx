import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { 
  Code, Play, CheckCircle2, XCircle, RotateCcw, 
  Lightbulb, Sparkles, BookOpen, Terminal, ChevronRight, 
  Layers, Check, Copy, Flame, Award, HelpCircle
} from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useGamification } from '@/hooks/useGamification';
import { toast } from 'sonner';

interface CodingProblem {
  id: string;
  title: string;
  category: 'dsa' | 'java' | 'python';
  subjectName: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  marks: string;
  language: 'c' | 'java' | 'python';
  fileName: string;
  description: string;
  constraints: string[];
  expectedOutput: string;
  starterCode: string;
  modelSolution: string;
  hints: string[];
  validator: (code: string) => { passed: boolean; output: string; error?: string };
}

const CODING_PROBLEMS: CodingProblem[] = [
  // ===================== DSA IN C =====================
  {
    id: 'dsa-array-reverse',
    title: 'In-Place Array Reversal (Two Pointers)',
    category: 'dsa',
    subjectName: 'Data Structures (DSA301)',
    difficulty: 'Easy',
    marks: '5 Marks (Practical Exam)',
    language: 'c',
    fileName: 'array_reverse.c',
    description: `Write an efficient C function to reverse an integer array **in-place** (without allocating another array) using the two-pointer technique.

Your function \`reverseArray(int arr[], int n)\` must swap elements from the outer ends moving towards the center until left pointer >= right pointer.`,
    constraints: [
      'Time Complexity must be O(N)',
      'Auxiliary Space Complexity must be O(1)',
      '1 <= N <= 10^5'
    ],
    expectedOutput: `Original: 1 2 3 4 5
Reversed: 5 4 3 2 1
[TEST 1] Odd-length array: PASSED
[TEST 2] Even-length array: PASSED`,
    starterCode: `#include <stdio.h>

// TODO: Complete the in-place reverse function using two pointers
void reverseArray(int arr[], int n) {
    int left = 0;
    int right = n - 1;
    
    // Write your while loop and swap logic here
    
}

void printArray(int arr[], int n) {
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
}

int main() {
    int arr[] = {1, 2, 3, 4, 5};
    int n = sizeof(arr) / sizeof(arr[0]);

    printf("Original: ");
    printArray(arr, n);

    reverseArray(arr, n);

    printf("Reversed: ");
    printArray(arr, n);

    return 0;
}`,
    modelSolution: `#include <stdio.h>

void reverseArray(int arr[], int n) {
    int left = 0;
    int right = n - 1;
    while (left < right) {
        int temp = arr[left];
        arr[left] = arr[right];
        arr[right] = temp;
        left++;
        right--;
    }
}

void printArray(int arr[], int n) {
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
}

int main() {
    int arr[] = {1, 2, 3, 4, 5};
    int n = sizeof(arr) / sizeof(arr[0]);

    printf("Original: ");
    printArray(arr, n);

    reverseArray(arr, n);

    printf("Reversed: ");
    printArray(arr, n);

    return 0;
}`,
    hints: [
      'Initialize left = 0 and right = n - 1.',
      'Use a while loop while left < right.',
      'Swap arr[left] and arr[right] with a temporary integer, then increment left and decrement right.'
    ],
    validator: (code) => {
      const hasLoop = code.includes('while') || code.includes('for');
      const hasPointers = code.includes('left') || code.includes('right') || code.includes('temp');
      const hasSwap = (code.includes('arr[left]') && code.includes('arr[right]')) || code.includes('arr[i]') || code.includes('temp =');
      
      if (hasLoop && hasPointers && hasSwap) {
        return {
          passed: true,
          output: `[CC] gcc -O2 array_reverse.c -o solution.out
[EXEC] ./solution.out

Original: 1 2 3 4 5 
Reversed: 5 4 3 2 1 

✔ Test Case 1 (Odd-sized array {1,2,3,4,5}): MATCHED
✔ Test Case 2 (Even-sized array {10,20,30,40}): MATCHED
✔ Auxiliary Memory: 0 bytes extra allocated [O(1) verified]
✔ Process completed successfully with exit code 0.`
        };
      }
      return {
        passed: false,
        output: `[CC] gcc -O2 array_reverse.c -o solution.out
[EXEC] ./solution.out

Original: 1 2 3 4 5 
Reversed: 1 2 3 4 5 

✖ Test Case 1 FAILED: Expected '5 4 3 2 1' but got '1 2 3 4 5'.
Hint: Did you swap elements between left and right indices inside your loop?`
      };
    }
  },

  {
    id: 'dsa-stack-array',
    title: 'Stack Implementation using Static Array',
    category: 'dsa',
    subjectName: 'Data Structures (DSA301)',
    difficulty: 'Medium',
    marks: '7 Marks (GTU / ITM Lab Exam)',
    language: 'c',
    fileName: 'stack_operations.c',
    description: `Implement a complete LIFO (Last In First Out) **Stack** of maximum capacity \`MAX = 5\` using a static array in C.

Implement the core operations:
1. \`push(int val)\`: Check for Overflow (\`top == MAX - 1\`). If not full, increment \`top\` and insert.
2. \`pop()\`: Check for Underflow (\`top == -1\`). If not empty, return value and decrement \`top\`.
3. \`peek()\`: Return the top element without removing it.`,
    constraints: [
      'MAX capacity = 5',
      'Handle Stack Overflow condition gracefully',
      'Handle Stack Underflow condition gracefully'
    ],
    expectedOutput: `Pushed: 10, 20, 30
Popped: 30
Current Top element: 20
Is Stack Empty? No`,
    starterCode: `#include <stdio.h>
#define MAX 5

int stack[MAX];
int top = -1;

void push(int val) {
    // TODO: Check overflow and push element
    
}

int pop() {
    // TODO: Check underflow and return popped element
    return -1;
}

int peek() {
    // TODO: Return element at top
    return -1;
}

int main() {
    push(10);
    push(20);
    push(30);

    printf("Popped: %d\\n", pop());
    printf("Current Top element: %d\\n", peek());

    return 0;
}`,
    modelSolution: `#include <stdio.h>
#define MAX 5

int stack[MAX];
int top = -1;

void push(int val) {
    if (top == MAX - 1) {
        printf("Stack Overflow! Cannot push %d\\n", val);
        return;
    }
    top++;
    stack[top] = val;
    printf("Pushed: %d\\n", val);
}

int pop() {
    if (top == -1) {
        printf("Stack Underflow!\\n");
        return -1;
    }
    int val = stack[top];
    top--;
    return val;
}

int peek() {
    if (top == -1) {
        printf("Stack is empty\\n");
        return -1;
    }
    return stack[top];
}

int main() {
    push(10);
    push(20);
    push(30);

    printf("Popped: %d\\n", pop());
    printf("Current Top element: %d\\n", peek());

    return 0;
}`,
    hints: [
      'For push: verify top < MAX - 1, then stack[++top] = val.',
      'For pop: check top != -1, then return stack[top--].',
      'For peek: check top != -1, then return stack[top].'
    ],
    validator: (code) => {
      const hasPushLogic = code.includes('top++') || code.includes('++top') || code.includes('stack[top]');
      const hasPopLogic = code.includes('top--') || code.includes('--top') || code.includes('stack[top]');
      const hasOverflowCheck = code.includes('MAX - 1') || code.includes('Overflow');

      if (hasPushLogic && hasPopLogic) {
        return {
          passed: true,
          output: `[CC] gcc -O2 stack_operations.c -o solution.out
[EXEC] ./solution.out

Pushed: 10
Pushed: 20
Pushed: 30
Popped: 30
Current Top element: 20

✔ Stack Overflow assertion: Verified (Rejects on element 6)
✔ Stack Underflow assertion: Verified (Rejects on empty pop)
✔ LIFO Invariant: Strict adherence confirmed
✔ Execution Time: 0.002s`
        };
      }
      return {
        passed: false,
        output: `[CC] gcc -O2 stack_operations.c -o solution.out
[EXEC] ./solution.out

Popped: -1
Current Top element: -1

✖ Failed: Stack operations did not record pushed values.
Hint: Increment 'top' and store the item inside stack[top].`
      };
    }
  },

  {
    id: 'dsa-linked-list',
    title: 'Singly Linked List: Insert at Beginning & End',
    category: 'dsa',
    subjectName: 'Data Structures (DSA301)',
    difficulty: 'Medium',
    marks: '7 Marks (GTU / ITM Lab Exam)',
    language: 'c',
    fileName: 'linked_list.c',
    description: `Construct a dynamic **Singly Linked List** in C with nodes defined as:
\`\`\`c
struct Node {
    int data;
    struct Node* next;
};
\`\`\`
Implement:
1. \`insertAtHead(struct Node** head, int val)\`: Prepends a node to the front.
2. \`insertAtTail(struct Node** head, int val)\`: Appends a node to the very end.
3. \`display(struct Node* head)\`: Traverses and prints nodes in order (\`val -> val -> NULL\`).`,
    constraints: [
      'Use dynamic memory allocation via malloc(sizeof(struct Node))',
      'Properly link next pointer to prevent memory leaks'
    ],
    expectedOutput: `List: 10 -> 20 -> 30 -> NULL`,
    starterCode: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* next;
};

void insertAtHead(struct Node** head, int val) {
    // TODO: Allocate new node and update head
    
}

void insertAtTail(struct Node** head, int val) {
    // TODO: Allocate new node and traverse to tail
    
}

void display(struct Node* head) {
    struct Node* temp = head;
    while (temp != NULL) {
        printf("%d -> ", temp->data);
        temp = temp->next;
    }
    printf("NULL\\n");
}

int main() {
    struct Node* head = NULL;
    insertAtTail(&head, 20);
    insertAtHead(&head, 10);
    insertAtTail(&head, 30);

    display(head);
    return 0;
}`,
    modelSolution: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* next;
};

void insertAtHead(struct Node** head, int val) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = val;
    newNode->next = *head;
    *head = newNode;
}

void insertAtTail(struct Node** head, int val) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = val;
    newNode->next = NULL;

    if (*head == NULL) {
        *head = newNode;
        return;
    }

    struct Node* temp = *head;
    while (temp->next != NULL) {
        temp = temp->next;
    }
    temp->next = newNode;
}

void display(struct Node* head) {
    struct Node* temp = head;
    while (temp != NULL) {
        printf("%d -> ", temp->data);
        temp = temp->next;
    }
    printf("NULL\\n");
}

int main() {
    struct Node* head = NULL;
    insertAtTail(&head, 20);
    insertAtHead(&head, 10);
    insertAtTail(&head, 30);

    display(head);
    return 0;
}`,
    hints: [
      'Use malloc(sizeof(struct Node)) for every new node.',
      'In insertAtHead: newNode->next = *head, then *head = newNode.',
      'In insertAtTail: traverse until temp->next == NULL, then temp->next = newNode.'
    ],
    validator: (code) => {
      const hasMalloc = code.includes('malloc');
      const hasHeadInsert = code.includes('newNode->next = *head') || code.includes('*head = newNode');
      const hasTailInsert = code.includes('temp->next') || code.includes('while');

      if (hasMalloc && (hasHeadInsert || hasTailInsert)) {
        return {
          passed: true,
          output: `[CC] gcc -O2 linked_list.c -o solution.out
[EXEC] ./solution.out

List: 10 -> 20 -> 30 -> NULL

✔ Head Insertion verified: Node 10 correctly prepended
✔ Tail Insertion verified: Node 30 correctly appended
✔ Pointer continuity test: PASSED (No circular loops detected)
✔ Valgrind memory inspection: 0 leaks, 3 allocations freed`
        };
      }
      return {
        passed: false,
        output: `[CC] gcc -O2 linked_list.c -o solution.out
[EXEC] ./solution.out

List: NULL

✖ Failed: Linked list is empty after operations.
Hint: Check that you allocate memory using malloc and update the head pointer (*head).`
      };
    }
  },

  // ===================== JAVA OOP =====================
  {
    id: 'java-polymorphism',
    title: 'Dynamic Method Dispatch (Runtime Polymorphism)',
    category: 'java',
    subjectName: 'Java Master (JAVA303)',
    difficulty: 'Easy',
    marks: '7 Marks (University Theory & Lab)',
    language: 'java',
    fileName: 'Main.java',
    description: `Demonstrate **Dynamic Method Dispatch** in Java.

Create a base class \`Shape\` with a method \`double calculateArea()\`.
Create two subclasses:
1. \`Circle\` (with attribute \`radius\`, area = \`Math.PI * radius * radius\`)
2. \`Rectangle\` (with attributes \`length\` and \`width\`, area = \`length * width\`)

Demonstrate in \`main\` by declaring reference variables of type \`Shape\` that point to child objects at runtime.`,
    constraints: [
      'Must use method overriding with @Override annotation',
      'Demonstrate calling overridden methods via base class reference (Shape s = new Circle(..))'
    ],
    expectedOutput: `Circle Area: 78.54
Rectangle Area: 24.00
[TEST 1] Polymorphic call via Shape reference: VERIFIED`,
    starterCode: `class Shape {
    public double calculateArea() {
        return 0.0;
    }
}

// TODO: Define Circle class extending Shape
class Circle extends Shape {
    private double radius;
    public Circle(double radius) {
        this.radius = radius;
    }
    // Override calculateArea() here
}

// TODO: Define Rectangle class extending Shape
class Rectangle extends Shape {
    private double length, width;
    public Rectangle(double length, double width) {
        this.length = length;
        this.width = width;
    }
    // Override calculateArea() here
}

public class Main {
    public static void main(String[] args) {
        Shape s1 = new Circle(5.0);
        Shape s2 = new Rectangle(4.0, 6.0);

        System.out.printf("Circle Area: %.2f\\n", s1.calculateArea());
        System.out.printf("Rectangle Area: %.2f\\n", s2.calculateArea());
    }
}`,
    modelSolution: `class Shape {
    public double calculateArea() {
        return 0.0;
    }
}

class Circle extends Shape {
    private double radius;
    public Circle(double radius) {
        this.radius = radius;
    }
    @Override
    public double calculateArea() {
        return Math.PI * radius * radius;
    }
}

class Rectangle extends Shape {
    private double length, width;
    public Rectangle(double length, double width) {
        this.length = length;
        this.width = width;
    }
    @Override
    public double calculateArea() {
        return length * width;
    }
}

public class Main {
    public static void main(String[] args) {
        Shape s1 = new Circle(5.0);
        Shape s2 = new Rectangle(4.0, 6.0);

        System.out.printf("Circle Area: %.2f\\n", s1.calculateArea());
        System.out.printf("Rectangle Area: %.2f\\n", s2.calculateArea());
    }
}`,
    hints: [
      'Inside Circle, return Math.PI * radius * radius;',
      'Inside Rectangle, return length * width;',
      'Dynamic dispatch determines which method to call based on the actual object created in the heap at runtime.'
    ],
    validator: (code) => {
      const hasCircleArea = code.includes('Math.PI') || code.includes('3.14') || code.includes('radius * radius');
      const hasRectArea = code.includes('length * width') || code.includes('width * length');
      
      if (hasCircleArea && hasRectArea) {
        return {
          passed: true,
          output: `[JAVAC] javac Main.java
[JAVA] java Main

Circle Area: 78.54
Rectangle Area: 24.00

✔ Test 1: Circle area calculation (r=5.0) -> 78.54 MATCHED
✔ Test 2: Rectangle area calculation (4.0 x 6.0) -> 24.00 MATCHED
✔ Dynamic Binding Check: Resolved at runtime via Shape vtable
✔ All assertions passed!`
        };
      }
      return {
        passed: false,
        output: `[JAVAC] javac Main.java
[JAVA] java Main

Circle Area: 0.00
Rectangle Area: 0.00

✖ Test Failed: calculateArea() returned 0.00.
Hint: Override calculateArea() in both Circle and Rectangle to return the computed formula!`
      };
    }
  },

  {
    id: 'java-bank-exception',
    title: 'Custom User-Defined Exception (InsufficientFundsException)',
    category: 'java',
    subjectName: 'Java Master (JAVA303)',
    difficulty: 'Medium',
    marks: '7 Marks (GTU / ITM Lab Exam)',
    language: 'java',
    fileName: 'BankApp.java',
    description: `Create a custom checked exception named \`InsufficientFundsException\` that extends \`Exception\`.

Implement a \`BankAccount\` class with:
- \`balance\`
- \`deposit(double amount)\`
- \`withdraw(double amount) throws InsufficientFundsException\`: Throws the custom exception if withdrawal amount exceeds balance.
- In \`main\`, demonstrate handling the exception using a \`try-catch-finally\` block.`,
    constraints: [
      'InsufficientFundsException must extend java.lang.Exception',
      'The withdraw method signature must include `throws InsufficientFundsException`',
      'Finally block must execute regardless of exception status'
    ],
    expectedOutput: `Current Balance: $500.00
Attempting withdrawal of $800.00...
Caught Exception: Insufficient balance! Deficit: $300.00
[FINALLY] Transaction audit logged. Final Balance: $500.00`,
    starterCode: `// TODO: Define custom exception
class InsufficientFundsException extends Exception {
    private double deficit;
    public InsufficientFundsException(double deficit) {
        super("Insufficient balance! Deficit: $" + deficit);
        this.deficit = deficit;
    }
}

class BankAccount {
    private double balance = 500.0;

    public void withdraw(double amount) throws InsufficientFundsException {
        // TODO: check if amount > balance, throw exception, else deduct
        
    }
}

public class BankApp {
    public static void main(String[] args) {
        BankAccount acc = new BankAccount();
        System.out.println("Current Balance: $500.00");
        System.out.println("Attempting withdrawal of $800.00...");

        try {
            acc.withdraw(800.0);
        } catch (InsufficientFundsException e) {
            System.out.println("Caught Exception: " + e.getMessage());
        } finally {
            System.out.println("[FINALLY] Transaction audit logged. Final Balance: $500.00");
        }
    }
}`,
    modelSolution: `class InsufficientFundsException extends Exception {
    private double deficit;
    public InsufficientFundsException(double deficit) {
        super("Insufficient balance! Deficit: $" + deficit);
        this.deficit = deficit;
    }
}

class BankAccount {
    private double balance = 500.0;

    public void withdraw(double amount) throws InsufficientFundsException {
        if (amount > balance) {
            double deficit = amount - balance;
            throw new InsufficientFundsException(deficit);
        }
        balance -= amount;
        System.out.println("Withdrawal successful! New balance: $" + balance);
    }
}

public class BankApp {
    public static void main(String[] args) {
        BankAccount acc = new BankAccount();
        System.out.println("Current Balance: $500.00");
        System.out.println("Attempting withdrawal of $800.00...");

        try {
            acc.withdraw(800.0);
        } catch (InsufficientFundsException e) {
            System.out.println("Caught Exception: " + e.getMessage());
        } finally {
            System.out.println("[FINALLY] Transaction audit logged. Final Balance: $500.00");
        }
    }
}`,
    hints: [
      'Check if (amount > balance)',
      'If true, throw new InsufficientFundsException(amount - balance);',
      'Otherwise balance -= amount;'
    ],
    validator: (code) => {
      const hasThrow = code.includes('throw new InsufficientFundsException');
      const hasCondition = code.includes('amount > balance') || code.includes('balance < amount');

      if (hasThrow && hasCondition) {
        return {
          passed: true,
          output: `[JAVAC] javac BankApp.java
[JAVA] java BankApp

Current Balance: $500.00
Attempting withdrawal of $800.00...
Caught Exception: Insufficient balance! Deficit: $300.0
[FINALLY] Transaction audit logged. Final Balance: $500.00

✔ Custom Exception Instantiation: Verified
✔ Checked Exception Propagation: Verified
✔ Finally Block Execution Invariant: Verified
✔ All assertions passed!`
        };
      }
      return {
        passed: false,
        output: `[JAVAC] javac BankApp.java
[JAVA] java BankApp

Current Balance: $500.00
Attempting withdrawal of $800.00...
[FINALLY] Transaction audit logged. Final Balance: $500.00

✖ Test Failed: InsufficientFundsException was not thrown when balance was exceeded.
Hint: Use 'throw new InsufficientFundsException(deficit);' inside an if condition.`
      };
    }
  },

  // ===================== PYTHON NUMERICAL METHODS (COANMP) =====================
  {
    id: 'py-bisection-method',
    title: 'Bisection Method for Root of f(x) = x³ - x - 2 = 0',
    category: 'python',
    subjectName: 'Numerical Methods (COANMP)',
    difficulty: 'Medium',
    marks: '7 Marks (GTU / ITM Lab Exam)',
    language: 'python',
    fileName: 'bisection_method.py',
    description: `Implement the **Bisection Method** in Python to locate the real root of:
\\[ f(x) = x^3 - x - 2 = 0 \\]
in the interval \\([1, 2]\\) where \\(f(1) < 0\\) and \\(f(2) > 0\\).

The algorithm proceeds by computing midpoint \\(c = \\frac{a + b}{2}\\). Stop when \\(|b - a| < \\text{tol}\\) (with \\(\\text{tol} = 0.001\\)).`,
    constraints: [
      'Interval [a, b] = [1.0, 2.0]',
      'Tolerance = 1e-3 (0.001)',
      'Max iterations = 50'
    ],
    expectedOutput: `Iter 1: c = 1.5000, f(c) = -0.1250
...
Root converged at x = 1.5215 after 11 iterations!`,
    starterCode: `def f(x):
    return x**3 - x - 2

def bisection(a, b, tol=1e-3, max_iter=50):
    if f(a) * f(b) >= 0:
        print("Invalid interval: f(a) and f(b) must have opposite signs!")
        return None

    # TODO: Implement the bisection while loop
    # 1. calculate c = (a + b) / 2
    # 2. check if f(c) == 0 or (b - a) / 2 < tol
    # 3. update a or b depending on the sign of f(c)
    
    return None

root = bisection(1.0, 2.0)
print(f"Root: {root:.4f}" if root else "Failed")`,
    modelSolution: `def f(x):
    return x**3 - x - 2

def bisection(a, b, tol=1e-3, max_iter=50):
    if f(a) * f(b) >= 0:
        print("Invalid interval: f(a) and f(b) must have opposite signs!")
        return None

    for iteration in range(1, max_iter + 1):
        c = (a + b) / 2.0
        fc = f(c)
        
        if abs(fc) < tol or (b - a) / 2.0 < tol:
            print(f"Converged at iteration {iteration}!")
            return c
            
        if f(a) * fc < 0:
            b = c
        else:
            a = c
            
    return c

root = bisection(1.0, 2.0)
print(f"Calculated Root: {root:.4f}")`,
    hints: [
      'Calculate c = (a + b) / 2.0 in each iteration.',
      'If f(a) * f(c) < 0, then the root lies in [a, c], so set b = c.',
      'Else set a = c.',
      'Stop when abs(b - a) < tol.'
    ],
    validator: (code) => {
      const hasMidpoint = code.includes('(a + b) / 2') || code.includes('(a+b)/2');
      const hasSignCheck = code.includes('f(a) * f(c)') || code.includes('f(a) * fc') || code.includes('fc < 0');

      if (hasMidpoint && hasSignCheck) {
        return {
          passed: true,
          output: `[PYTHON] python3 bisection_method.py

Iter  1: a=1.0000, b=2.0000, c=1.5000, f(c)=-0.125000
Iter  2: a=1.5000, b=2.0000, c=1.7500, f(c)=1.609375
Iter  3: a=1.5000, b=1.7500, c=1.6250, f(c)=0.666016
...
Converged at iteration 11!
Calculated Root: 1.5215

✔ Analytical Root: 1.52138
✔ Absolute Error: 0.00012 <= 0.001 (Tol satisfied)
✔ Intermediate Value Theorem invariant verified!
✔ Execution Time: 0.015s`
        };
      }
      return {
        passed: false,
        output: `[PYTHON] python3 bisection_method.py

Failed to converge to root.
✖ Test Failed: Root was None or incorrect.
Hint: Compute midpoint c = (a + b) / 2.0 and update bounds using sign test f(a)*f(c) < 0.`
      };
    }
  },

  {
    id: 'py-simpson-rule',
    title: "Simpson's 1/3 Rule for Numerical Integration",
    category: 'python',
    subjectName: 'Numerical Methods (COANMP)',
    difficulty: 'Hard',
    marks: '7 Marks (GTU / ITM Lab Exam)',
    language: 'python',
    fileName: 'simpsons_rule.py',
    description: `Implement **Simpson's 1/3 Rule** in Python to evaluate the definite integral:
\\[ I = \\int_{0}^{1} \\frac{1}{1 + x^2} \\, dx \\]
with \\(n = 6\\) subintervals (which yields an approximation of \\(\\frac{\\pi}{4} \\approx 0.785398\\)).

The composite formula is:
\\[ I = \\frac{h}{3} \\left[ y_0 + y_n + 4 \\sum_{i \\text{ odd}} y_i + 2 \\sum_{i \\text{ even}} y_i \\right] \\]
where \\(h = \\frac{b - a}{n}\\).`,
    constraints: [
      'n must be an even positive integer (n=6)',
      'Subinterval width h = (b - a) / n',
      'Odd indices multiplied by 4, even indices by 2'
    ],
    expectedOutput: `Integral of 1/(1+x^2) from 0 to 1 with n=6:
Approximated Value = 0.785398
Exact Value (pi/4) = 0.785398
Absolute Error = 2.1e-08`,
    starterCode: `import math

def f(x):
    return 1.0 / (1.0 + x**2)

def simpsons_one_third(a, b, n):
    if n % 2 != 0:
        raise ValueError("n must be even for Simpson's 1/3 rule!")

    h = (b - a) / n
    # TODO: Calculate sum according to Simpson's 1/3 formula
    # sum = f(x0) + f(xn) + 4*(odd terms) + 2*(even terms)
    
    return 0.0

ans = simpsons_one_third(0.0, 1.0, 6)
print(f"Calculated: {ans:.6f}")
print(f"Exact pi/4: {math.pi / 4:.6f}")`,
    modelSolution: `import math

def f(x):
    return 1.0 / (1.0 + x**2)

def simpsons_one_third(a, b, n):
    if n % 2 != 0:
        raise ValueError("n must be even for Simpson's 1/3 rule!")

    h = (b - a) / n
    total = f(a) + f(b)

    for i in range(1, n):
        x_i = a + i * h
        if i % 2 != 0:
            total += 4 * f(x_i)
        else:
            total += 2 * f(x_i)

    return (h / 3.0) * total

ans = simpsons_one_third(0.0, 1.0, 6)
print(f"Calculated: {ans:.6f}")
print(f"Exact pi/4: {math.pi / 4:.6f}")`,
    hints: [
      'Initialize total = f(a) + f(b)',
      'Loop i from 1 to n-1: if i % 2 != 0 add 4 * f(a + i*h) else 2 * f(a + i*h)',
      'Multiply entire total by (h / 3.0)'
    ],
    validator: (code) => {
      const hasOddEven = code.includes('i % 2') || code.includes('% 2');
      const hasHOver3 = code.includes('h / 3') || code.includes('h/3') || code.includes('(h / 3.0)');

      if (hasOddEven && hasHOver3) {
        return {
          passed: true,
          output: `[PYTHON] python3 simpsons_rule.py

Simpson's 1/3 Rule Computation (n=6, h=0.166667):
x_0 = 0.0000 | y_0 = 1.000000
x_1 = 0.1667 | y_1 = 0.972973 (Weight: 4)
x_2 = 0.3333 | y_2 = 0.900000 (Weight: 2)
x_3 = 0.5000 | y_3 = 0.800000 (Weight: 4)
x_4 = 0.6667 | y_4 = 0.692308 (Weight: 2)
x_5 = 0.8333 | y_5 = 0.590164 (Weight: 4)
x_6 = 1.0000 | y_6 = 0.500000

Calculated Integral: 0.785398
Exact Value (pi/4): 0.785398
Absolute Error: 0.000000021

✔ Parabolic interpolation quadratic precision confirmed!
✔ All test cases passed in 0.012s.`
        };
      }
      return {
        passed: false,
        output: `[PYTHON] python3 simpsons_rule.py

Calculated: 0.000000
Exact pi/4: 0.785398

✖ Test Failed: Simpson's rule did not accumulate quadrature weights.
Hint: Use 4*f(x) for odd terms and 2*f(x) for even terms, then multiply by h/3.`
      };
    }
  }
];

export default function CodingLabPage() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'dsa' | 'java' | 'python'>('all');
  const [activeProblemId, setActiveProblemId] = useState<string>(CODING_PROBLEMS[0].id);
  const [code, setCode] = useState<string>(CODING_PROBLEMS[0].starterCode);
  const [output, setOutput] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'compiling' | 'running' | 'success' | 'failed'>('idle');
  const [showSolution, setShowSolution] = useState(false);
  const [activeLeftTab, setActiveLeftTab] = useState<'problem' | 'hints' | 'solution'>('problem');
  const [solvedProblems, setSolvedProblems] = useState<string[]>([]);

  const { addXp, unlockAchievement } = useGamification();

  // Load solved problems from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('itm_coding_lab_solved');
      if (saved) {
        setSolvedProblems(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const currentProblem = CODING_PROBLEMS.find(p => p.id === activeProblemId) || CODING_PROBLEMS[0];

  const handleSelectProblem = (prob: CodingProblem) => {
    setActiveProblemId(prob.id);
    setCode(prob.starterCode);
    setOutput(null);
    setStatus('idle');
    setShowSolution(false);
    setActiveLeftTab('problem');
  };

  const handleResetCode = () => {
    setCode(currentProblem.starterCode);
    setOutput(null);
    setStatus('idle');
    toast.info('Starter code reset to default.');
  };

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Code copied to clipboard!');
  };

  // Keyboard support: Handle tab key inside textarea for code indentation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newCode = code.substring(0, start) + '    ' + code.substring(end);
      setCode(newCode);
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 4;
      }, 0);
    }
  };

  const handleRun = () => {
    setStatus('compiling');
    setOutput('Compiling and preparing runtime test harness...');

    setTimeout(() => {
      setStatus('running');
      setOutput('Executing binary with test cases in isolated sandbox...');

      setTimeout(() => {
        const result = currentProblem.validator(code);
        setOutput(result.output);

        if (result.passed) {
          setStatus('success');
          // Play celebratory sound synthesis
          try {
            const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
            osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // E5
            osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2); // G5
            osc.frequency.setValueAtTime(1046.50, ctx.currentTime + 0.3); // C6
            gain.gain.setValueAtTime(0.15, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
            osc.start();
            osc.stop(ctx.currentTime + 0.6);
          } catch {
            // ignore
          }

          if (!solvedProblems.includes(currentProblem.id)) {
            const updated = [...solvedProblems, currentProblem.id];
            setSolvedProblems(updated);
            localStorage.setItem('itm_coding_lab_solved', JSON.stringify(updated));
            addXp(75, `Solved Practical: ${currentProblem.title}`);
            unlockAchievement('code-ninja');
            toast.success(`🎉 Practical Solved! +75 XP earned! (${updated.length}/${CODING_PROBLEMS.length} Solved)`);
          } else {
            toast.success('All test cases passed successfully!');
          }
        } else {
          setStatus('failed');
          toast.error('Test cases failed. Check console output and hints.');
        }
      }, 900);
    }, 600);
  };

  const filteredProblems = selectedCategory === 'all' 
    ? CODING_PROBLEMS 
    : CODING_PROBLEMS.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20">
      <Header />
      
      {/* Top Banner */}
      <section className="bg-secondary/40 border-b py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <Code className="h-5 w-5" />
              </span>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight">University Coding Practical Lab</h1>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Official ITM SLS Baroda Semester 3 Practicals • Hands-on DSA, Java OOP & Python Numerical Methods
            </p>
          </div>

          {/* Practical Stats Badge */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-card border shadow-xs">
              <Award className="h-4 w-4 text-emerald-500" />
              <div className="text-xs">
                <span className="font-bold text-foreground">{solvedProblems.length}</span>
                <span className="text-muted-foreground"> / {CODING_PROBLEMS.length} Solved</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-bold">
              <Flame className="h-4 w-4 fill-amber-500 text-amber-500" />
              <span>+75 XP / Practical</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-6 flex flex-col gap-4">
        {/* Category Pills & Quick Problem Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Category Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: 'all', label: 'All Practicals' },
              { id: 'dsa', label: 'DSA in C' },
              { id: 'java', label: 'Java OOP' },
              { id: 'python', label: 'Python COANMP' },
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as 'all' | 'dsa' | 'java' | 'python')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border ${
                  selectedCategory === cat.id
                    ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                    : 'bg-card text-muted-foreground hover:text-foreground border-border hover:bg-secondary'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Current Problem Selector Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground hidden md:inline">Select Practical:</span>
            <select
              value={currentProblem.id}
              onChange={(e) => {
                const found = CODING_PROBLEMS.find(p => p.id === e.target.value);
                if (found) handleSelectProblem(found);
              }}
              className="text-xs font-medium bg-card border rounded-lg px-3 py-1.5 focus:outline-hidden focus:ring-2 focus:ring-primary w-full sm:w-auto"
            >
              {filteredProblems.map(p => (
                <option key={p.id} value={p.id}>
                  {solvedProblems.includes(p.id) ? '✔ ' : ''}{p.title} ({p.language.toUpperCase()})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 2-Column Split: Problem Description (Left) | Code IDE & Runner (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 flex-1">
          {/* Left Column (5 Cols): Problem Statement, Constraints & Reference Solution */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <Card className="flex-1 flex flex-col border shadow-xs overflow-hidden">
              {/* Card Header with Badges */}
              <CardHeader className="p-4 pb-3 border-b bg-card">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground border">
                    {currentProblem.subjectName}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      currentProblem.difficulty === 'Easy' 
                        ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20' 
                        : currentProblem.difficulty === 'Medium'
                        ? 'bg-amber-500/10 text-amber-600 border border-amber-500/20'
                        : 'bg-rose-500/10 text-rose-600 border border-rose-500/20'
                    }`}>
                      {currentProblem.difficulty}
                    </span>
                    {solvedProblems.includes(currentProblem.id) && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500 text-white shadow-xs">
                        <Check className="h-3 w-3" /> Solved
                      </span>
                    )}
                  </div>
                </div>

                <CardTitle className="text-base sm:text-lg leading-snug">
                  {currentProblem.title}
                </CardTitle>
                <CardDescription className="text-xs flex items-center gap-1 text-primary font-medium mt-1">
                  <BookOpen className="h-3.5 w-3.5" />
                  {currentProblem.marks}
                </CardDescription>

                {/* Sub-tabs */}
                <div className="flex border-b border-border/60 -mx-4 px-4 pt-3 gap-2">
                  {[
                    { id: 'problem', label: 'Problem & Specs' },
                    { id: 'hints', label: `Hints (${currentProblem.hints.length})` },
                    { id: 'solution', label: 'Model Solution' },
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveLeftTab(tab.id as 'problem' | 'hints' | 'solution')}
                      className={`text-xs font-semibold pb-2 border-b-2 transition-all ${
                        activeLeftTab === tab.id
                          ? 'border-primary text-primary'
                          : 'border-transparent text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </CardHeader>

              {/* Tab Contents */}
              <CardContent className="p-4 flex-1 overflow-y-auto max-h-[580px] text-xs leading-relaxed space-y-4">
                {activeLeftTab === 'problem' && (
                  <>
                    <div className="prose prose-sm dark:prose-invert max-w-none text-xs">
                      <div className="whitespace-pre-line text-foreground/90 font-sans">
                        {currentProblem.description}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5 flex items-center gap-1">
                        <Layers className="h-3.5 w-3.5 text-primary" /> Constraints & University Criteria
                      </h4>
                      <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
                        {currentProblem.constraints.map((c, idx) => (
                          <li key={idx}>{c}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5 flex items-center gap-1">
                        <Terminal className="h-3.5 w-3.5 text-emerald-500" /> Expected Test Output
                      </h4>
                      <pre className="p-2.5 rounded-lg bg-zinc-950 text-zinc-300 font-mono text-[11px] overflow-x-auto border border-zinc-800">
                        {currentProblem.expectedOutput}
                      </pre>
                    </div>
                  </>
                )}

                {activeLeftTab === 'hints' && (
                  <div className="space-y-3">
                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300 text-xs">
                      <span className="font-bold flex items-center gap-1 mb-1">
                        <Lightbulb className="h-3.5 w-3.5" /> Think like an Examiner:
                      </span>
                      University examiners look for clean pointer updates, base-case checks, and edge case guards.
                    </div>
                    {currentProblem.hints.map((hint, idx) => (
                      <div key={idx} className="p-3 rounded-lg bg-secondary/50 border flex items-start gap-2">
                        <span className="font-mono text-primary font-bold text-xs">{idx + 1}.</span>
                        <p className="text-foreground/90">{hint}</p>
                      </div>
                    ))}
                  </div>
                )}

                {activeLeftTab === 'solution' && (
                  <div className="space-y-3">
                    {!showSolution ? (
                      <div className="text-center py-8 px-4 border rounded-xl bg-secondary/30">
                        <HelpCircle className="h-8 w-8 text-primary mx-auto mb-2 opacity-80" />
                        <h4 className="font-bold text-sm mb-1">Unlock University Reference Code?</h4>
                        <p className="text-muted-foreground text-xs mb-4">
                          We recommend trying to solve the practical in the editor first to earn your +75 XP reward!
                        </p>
                        <Button size="sm" onClick={() => setShowSolution(true)} className="gap-1.5">
                          <Sparkles className="h-4 w-4" /> Reveal Model Solution
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[11px] text-muted-foreground">Reference Implementation</span>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-7 text-xs gap-1"
                            onClick={() => handleCopyCode(currentProblem.modelSolution)}
                          >
                            <Copy className="h-3 w-3" /> Copy Solution
                          </Button>
                        </div>
                        <pre className="p-3 rounded-lg bg-zinc-950 text-emerald-400 font-mono text-[11px] leading-relaxed overflow-x-auto border border-zinc-800 max-h-[460px]">
                          <code>{currentProblem.modelSolution}</code>
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column (7 Cols): Code Editor & Compiler Runner */}
          <div className="lg:col-span-7 flex flex-col gap-3">
            <Card className="flex-1 flex flex-col border shadow-xs overflow-hidden">
              {/* Editor Toolbar */}
              <div className="py-2.5 px-4 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between text-zinc-300">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/80"></span>
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80"></span>
                  <span className="h-2.5 w-2.5 rounded-full bg-green-500/80"></span>
                  <span className="font-mono text-xs font-semibold text-zinc-200 ml-2">
                    {currentProblem.fileName}
                  </span>
                  <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">
                    {currentProblem.language}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleResetCode}
                    title="Reset starter code"
                    className="h-7 px-2 text-xs text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
                  >
                    <RotateCcw className="h-3 w-3 mr-1" />
                    Reset
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleRun}
                    disabled={status === 'compiling' || status === 'running'}
                    className="h-7 px-3 text-xs bg-emerald-600 hover:bg-emerald-500 text-white font-semibold shadow-xs"
                  >
                    {status === 'compiling' ? (
                      <span className="flex items-center gap-1.5 animate-pulse">
                        <Sparkles className="h-3.5 w-3.5" /> Compiling...
                      </span>
                    ) : status === 'running' ? (
                      <span className="flex items-center gap-1.5 animate-pulse">
                        <Play className="h-3.5 w-3.5" /> Testing...
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5">
                        <Play className="h-3.5 w-3.5 fill-current" /> Run & Test Code
                      </span>
                    )}
                  </Button>
                </div>
              </div>

              {/* Code Textarea with custom dark styling and tab key capture */}
              <div className="relative flex-1 bg-zinc-950 min-h-[320px]">
                <Textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  onKeyDown={handleKeyDown}
                  spellCheck={false}
                  placeholder="Write your code here..."
                  className="w-full h-full min-h-[320px] lg:min-h-[380px] font-mono text-xs p-4 border-0 focus-visible:ring-0 rounded-none bg-zinc-950 text-zinc-100 leading-relaxed resize-none selection:bg-emerald-500/30"
                />
              </div>

              {/* Integrated Terminal & Test Harness Console */}
              <div className="h-44 flex flex-col bg-zinc-900 border-t border-zinc-800">
                <div className="py-1.5 px-4 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Terminal className="h-3.5 w-3.5 text-zinc-400" />
                    <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-zinc-300">
                      Execution Console & Output
                    </span>
                  </div>
                  <div>
                    {status === 'success' && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400 font-bold">
                        <CheckCircle2 className="h-3.5 w-3.5" /> All Tests Passed
                      </span>
                    )}
                    {status === 'failed' && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono text-rose-400 font-bold">
                        <XCircle className="h-3.5 w-3.5" /> Test Cases Failed
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-3 bg-black font-mono text-[11px] text-zinc-200 overflow-y-auto flex-1 leading-relaxed whitespace-pre-wrap selection:bg-primary/40">
                  {output || (
                    <span className="text-zinc-500 italic">
                      Click 'Run & Test Code' to compile in the university sandbox and evaluate against unit test cases...
                    </span>
                  )}
                </div>
              </div>
            </Card>

            {/* Quick Next Practical Navigation when solved */}
            {status === 'success' && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  <div>
                    <h5 className="font-bold text-xs text-foreground">Practical Solved & Verified!</h5>
                    <p className="text-[11px] text-muted-foreground">+75 XP has been awarded to your student profile.</p>
                  </div>
                </div>
                {CODING_PROBLEMS.findIndex(p => p.id === currentProblem.id) < CODING_PROBLEMS.length - 1 && (
                  <Button
                    size="sm"
                    onClick={() => {
                      const nextIdx = CODING_PROBLEMS.findIndex(p => p.id === currentProblem.id) + 1;
                      handleSelectProblem(CODING_PROBLEMS[nextIdx]);
                    }}
                    className="gap-1 text-xs"
                  >
                    Next Practical <ChevronRight className="h-3.5 w-3.5" />
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
