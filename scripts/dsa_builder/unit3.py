# Unit 3: Stacks & Queues
# Topics:
# dsa-u3-t1: Stack ADT: LIFO Principle, Array vs Linked List Implementations, Overflow/Underflow & Push/Pop operations
# dsa-u3-t2: Stack Applications: Infix to Postfix / Prefix Conversion (Shunting-Yard Algorithm), Evaluation of Postfix Expressions & Balanced Parentheses Checking
# dsa-u3-t3: Queue ADT: FIFO Principle, Simple Linear Queue Array Limitation, and Circular Queue Index Arithmetic `(rear + 1) % size`
# dsa-u3-t4: Specialized Queues: Double-Ended Queue (Deque), Priority Queue (Array vs Heap implementation), and Implementing Stacks using Queues

unit3 = {
    "id": "dsa-u3",
    "title": "Unit 3: Stacks & Queues",
    "description": "Linear container ADTs enforcing LIFO and FIFO disciplines. Covers array vs linked implementations of Stacks, expression parsing via Dijkstra's Shunting-Yard algorithm, circular queue index arithmetic, Double-Ended Queues (Deques), Priority Queues, and dual-queue Stack emulation.",
    "topics": [
        {
            "id": "dsa-u3-t1",
            "title": "Stack ADT: LIFO Principle, Array vs Linked List Implementations, Overflow/Underflow & Push/Pop operations",
            "simpleExplanation": "A Stack is a restricted linear data structure that strictly enforces the Last-In, First-Out (LIFO) discipline, where all additions and removals occur exclusively at a single endpoint called the top. It can be implemented using a fixed-size array (subject to stack overflow) or a dynamic singly linked list (unbounded capacity, subject only to system heap exhaustion).",
            "detailedExplanation": """## 1. The Stack ADT and LIFO Paradigm

A **Stack** is an Abstract Data Type modeling a linear container where elements are accessed in **Last-In, First-Out (LIFO)** order: the most recently inserted element is invariably the first to be retrieved and removed.

```mermaid
flowchart TD
    subgraph Stack_LIFO ["Stack Mechanics (LIFO Discipline)"]
        direction TB
        E["push(40) --> "] --> TOP["[ 40 ] <-- TOP of Stack"]
        TOP --> B1["[ 30 ]"]
        B1 --> B2["[ 20 ]"]
        B2 --> BOT["[ 10 ] <-- BOTTOM of Stack"]
        TOP -.->|pop() extracts 40| OUT["40 returned"]
    end
```

### Core ADT Operations:
- `push(item)`: Inserts `item` onto the top of the stack.
- `pop()`: Removes and returns the element at the top.
- `peek()` / `top()`: Returns the element currently at the top without removing it.
- `isEmpty()`: Returns boolean indicating whether the stack contains 0 items.
- `isFull()`: Applicable to fixed-capacity array implementations.

### Boundary Error Conditions
1. **Stack Overflow**: Attempting to execute `push()` when the underlying memory buffer is completely full ($top = MAX - 1$).
2. **Stack Underflow**: Attempting to execute `pop()` or `peek()` when the stack is empty ($top = -1$ or $head = NULL$).

---

## 2. Array-Based vs Linked List-Based Implementations

```mermaid
graph TD
    subgraph Impl ["Implementation Comparison"]
        A["Array Implementation\n- Fixed contiguous buffer\n- Top is an integer index\n- O(1) ops, zero pointer overhead\n- Subject to fixed Stack Overflow"]
        B["Linked List Implementation\n- Dynamic heap nodes\n- Top is a node pointer (*top)\n- O(1) ops, unbounded growth\n- 8-byte pointer overhead per node"]
    end
```

### A. Static Array Implementation
- An integer variable `top` tracks the index of the highest occupied slot, initialized to `-1`.
- `push(x)`: Checks if $top == MAX - 1$. If false, executes: `arr[++top] = x`.
- `pop()`: Checks if $top == -1$. If false, executes: `return arr[top--]`.
- **Pros**: Outstanding cache locality; zero pointer memory overhead.
- **Cons**: Fixed capacity; risks stack overflow if sized too small, or wastes memory if sized too large.

### B. Dynamic Linked List Implementation
- The stack top is represented by a pointer `top` referencing the head node of a singly linked list.
- `push(x)`: Allocates `newNode`, sets `newNode->next = top`, and updates `top = newNode`.
- `pop()`: Checks if `top == NULL`. If false, saves `temp = top`, advances `top = top->next`, frees `temp`, and returns data.
- **Pros**: Grows dynamically on demand up to physical system RAM capacity.
- **Cons**: Pointer memory overhead (8 bytes per node on 64-bit OS) and non-contiguous heap allocations causing cache misses.

---

## 3. Structural Comparison Matrix

| Architectural Feature | Fixed Array Implementation | Linked List Implementation |
| :--- | :--- | :--- |
| **Push Complexity** | $\\mathcal{O}(1)$ strict worst-case | $\\mathcal{O}(1)$ (heap `malloc` latency) |
| **Pop Complexity** | $\\mathcal{O}(1)$ | $\\mathcal{O}(1)$ |
| **Memory Overhead** | Unused pre-allocated array cells | Extra `next` pointer per element |
| **Overflow Condition** | $top == MAX - 1$ | Heap out-of-memory error only |
| **Underflow Condition**| $top == -1$ | $top == NULL$ |
| **Hardware Cache** | Excellent spatial locality | Poor spatial locality (heap fragmentation) |

---

## 4. Fundamental Computer Science Applications

1. **Function Call Stack**: Operating systems and language runtimes (C, Java, Python) manage activation records (stack frames) storing local variables, parameters, and return addresses on an architecture-level call stack.
2. **Backtracking Algorithms**: Solving mazes, N-Queens problem, and graph Depth-First Search (DFS).
3. **Undo/Redo Operations**: Text editors and graphic tools maintain dual stacks: an Undo stack and a Redo stack.
4. **Syntax Parsing**: Compiler abstract syntax tree (AST) construction and bracket validation.

---

> [!IMPORTANT] **MEMORIZE:**
> - In an array-based stack, `top` is initialized to `-1`. An empty check is `top == -1`, and full check is `top == MAX - 1`.
> - Pre-increment during push: `arr[++top] = val`.
> - Post-decrement during pop: `val = arr[top--]`.

> [!NOTE] **DEV BRAIN:**
> In C and C++, a recursive function lacking a proper base case exhausts the OS thread stack memory (typically 1MB to 8MB limit), triggering a literal `Segmentation fault (core dumped)` caused by **Stack Overflow**.

> [!WARNING] **TRAP:**
> When popping from a linked list stack, never forget to deallocate the removed node memory with `free(temp)`. Omitting `free()` causes a memory leak that can degrade long-running server daemons!

> [!TIP] **EXAM TIP:**
> When asked to implement a stack using a linked list, ALWAYS push and pop at the **HEAD** of the list ($O(1)$), never at the tail ($O(n)$)!""",
            "shortNotes": "Stack enforces LIFO via top pointer. Array implementation uses top index (risks overflow). Linked list implementation uses dynamic head nodes (unbounded). Push/Pop execute in O(1).",
            "examples": [
                {
                    "title": "Complete C Implementation of Stack: Array-Based vs Linked List",
                    "problem": "Implement a Stack ADT using both a fixed array and dynamic linked list, demonstrating push, pop, peek, overflow, and underflow handling.",
                    "explanation": "Illustrates concrete differences in memory management, overflow detection, and pointer updates.",
                    "code": """#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

#define MAX 3

// 1. Array Implementation
typedef struct {
    int items[MAX];
    int top;
} ArrayStack;

void initArrayStack(ArrayStack *s) { s->top = -1; }
bool isFullArr(ArrayStack *s) { return s->top == MAX - 1; }
bool isEmptyArr(ArrayStack *s) { return s->top == -1; }

void pushArr(ArrayStack *s, int val) {
    if (isFullArr(s)) {
        printf("ArrayStack Error: Stack Overflow! Cannot push %d\\n", val);
        return;
    }
    s->items[++(s->top)] = val;
}

int popArr(ArrayStack *s) {
    if (isEmptyArr(s)) {
        printf("ArrayStack Error: Stack Underflow!\\n");
        return -1;
    }
    return s->items[(s->top)--];
}

// 2. Linked List Implementation
typedef struct Node {
    int data;
    struct Node *next;
} Node;

typedef struct {
    Node *top;
} LinkedStack;

void initLinkedStack(LinkedStack *s) { s->top = NULL; }
bool isEmptyLink(LinkedStack *s) { return s->top == NULL; }

void pushLink(LinkedStack *s, int val) {
    Node *newNode = (Node*)malloc(sizeof(Node));
    newNode->data = val;
    newNode->next = s->top;
    s->top = newNode;
}

int popLink(LinkedStack *s) {
    if (isEmptyLink(s)) {
        printf("LinkedStack Error: Stack Underflow!\\n");
        return -1;
    }
    Node *temp = s->top;
    int val = temp->data;
    s->top = s->top->next;
    free(temp);
    return val;
}

int main() {
    printf("--- Array Stack Demo ---\\n");
    ArrayStack as;
    initArrayStack(&as);
    pushArr(&as, 10);
    pushArr(&as, 20);
    pushArr(&as, 30);
    pushArr(&as, 40); // Triggers Overflow
    printf("Popped from ArrayStack: %d\\n", popArr(&as));

    printf("\\n--- Linked Stack Demo ---\\n");
    LinkedStack ls;
    initLinkedStack(&ls);
    pushLink(&ls, 100);
    pushLink(&ls, 200);
    pushLink(&ls, 300);
    printf("Popped from LinkedStack: %d\\n", popLink(&ls));
    printf("Popped from LinkedStack: %d\\n", popLink(&ls));

    return 0;
}""",
                    "output": """--- Array Stack Demo ---
ArrayStack Error: Stack Overflow! Cannot push 40
Popped from ArrayStack: 30

--- Linked Stack Demo ---
Popped from LinkedStack: 300
Popped from LinkedStack: 200"""
                }
            ],
            "keyPoints": [
                "Stack is a LIFO (Last-In, First-Out) data structure with all mutations constrained to the top.",
                "Primary operations push, pop, and peek all operate in O(1) constant time.",
                "Array implementations use an integer index top initialized to -1, which is prone to fixed stack overflow.",
                "Linked list implementations insert and delete at the head node, offering dynamic growth with zero overflow risk.",
                "Underflow occurs when attempting to pop or peek from an empty stack."
            ],
            "theoryQuestions": [
                {
                    "question": "Define Stack ADT. Write algorithms for push() and pop() operations using an array, including boundary checks for overflow and underflow.",
                    "marks": "5 Marks",
                    "answer": """1. **Definition of Stack ADT**:
   A Stack is a linear Abstract Data Type operating under the Last-In, First-Out (LIFO) discipline. Elements are added and removed exclusively at one end called the `top`.

2. **Algorithm: `push(Stack *S, int val)`**:
   - **Step 1 (Check Overflow)**:
     If `S->top == MAX - 1`:
         Print "Stack Overflow Error" and abort.
   - **Step 2 (Increment & Insert)**:
     `S->top = S->top + 1;`
     `S->arr[S->top] = val;`
   - **Step 3**: Return success.

3. **Algorithm: `pop(Stack *S)`**:
   - **Step 1 (Check Underflow)**:
     If `S->top == -1`:
         Print "Stack Underflow Error" and abort.
   - **Step 2 (Extract & Decrement)**:
     `val = S->arr[S->top];`
     `S->top = S->top - 1;`
   - **Step 3**: Return `val`.""",
                    "keyPoints": [
                        "Formal definition of Stack ADT and LIFO behavior.",
                        "Push algorithm showing explicit top == MAX - 1 check.",
                        "Pop algorithm showing explicit top == -1 check."
                    ]
                },
                {
                    "question": "Compare array-based and linked list-based implementations of a Stack. Under what engineering scenarios would you choose one over the other?",
                    "marks": "7 Marks",
                    "answer": """1. **Architectural Comparison**:
   - **Time Complexity**: Both achieve strict $\\mathcal{O}(1)$ for `push`, `pop`, and `peek`.
   - **Memory Layout**: Array uses contiguous memory; Linked list uses scattered dynamic heap nodes.
   - **Size Flexibility**: Array is fixed-size at compile/allocation time; Linked list grows dynamically.
   - **Overhead**: Array has 0 pointer overhead (wastes memory only if oversized); Linked list consumes extra pointer memory per node (8 bytes on 64-bit platforms).
   - **Cache Locality**: Array provides high spatial locality and hardware prefetching; Linked list incurs cache misses.

2. **Engineering Selection Criteria**:
   - **Select Array Stack**:
     * Maximum stack depth is known in advance (e.g., fixed expression evaluator).
     * Performance-critical embedded systems where heap allocation is forbidden.
     * High spatial cache locality is needed for high-frequency operations.
   - **Select Linked Stack**:
     * Maximum stack size cannot be predicted (unbounded recursion or dynamic task backtrackers).
     * System cannot tolerate pre-allocated unused buffer memory.""",
                    "keyPoints": [
                        "Comparison covering time, memory layout, sizing, pointer overhead, and caching.",
                        "Practical criteria favoring array stacks (deterministic bounds, cache hits).",
                        "Practical criteria favoring linked stacks (unbounded growth, no fixed limit)."
                    ]
                }
            ],
            "mcqs": [
                {
                    "question": "What is the result of attempting to pop an element from an array-based stack where top == -1?",
                    "options": [
                        "Stack Overflow",
                        "Stack Underflow",
                        "Garbage value returned silently",
                        "Dynamic memory expansion"
                    ],
                    "correctIndex": 1,
                    "explanation": "Attempting to remove an element from an already empty stack is the definition of Stack Underflow."
                },
                {
                    "question": "Why is the head of a Singly Linked List used as the stack top rather than the tail?",
                    "options": [
                        "The tail cannot store integer data.",
                        "Push and pop at the head take O(1) time, while deleting the tail takes O(n) time.",
                        "The head pointer automatically prevents memory leaks.",
                        "Linked lists cannot traverse to the tail."
                    ],
                    "correctIndex": 1,
                    "explanation": "In a singly linked list, inserting and deleting at the head executes in O(1) time. Deleting at the tail requires O(n) time to locate the second-to-last node."
                },
                {
                    "question": "If the sequence of operations push(1), push(2), pop(), push(3), push(4), pop(), pop() is executed on an empty stack, what elements remain in the stack?",
                    "options": [
                        "[ 1 ]",
                        "[ 2 ]",
                        "[ 1, 3 ]",
                        "The stack is empty"
                    ],
                    "correctIndex": 0,
                    "explanation": "Trace: push(1) -> [1]; push(2) -> [1,2]; pop() -> 2 leaves [1]; push(3) -> [1,3]; push(4) -> [1,3,4]; pop() -> 4 leaves [1,3]; pop() -> 3 leaves [1]."
                },
                {
                    "question": "Which system component directly relies on the Stack data structure to execute program code?",
                    "options": [
                        "CPU Instruction Pipeline",
                        "Operating System Call Stack (Runtime Activation Records)",
                        "Disk File Allocation Table",
                        "Direct Memory Access (DMA) Controller"
                    ],
                    "correctIndex": 1,
                    "explanation": "Runtime environments use the Call Stack to manage function activation frames, return addresses, and local variables in LIFO order."
                }
            ]
        },
        {
            "id": "dsa-u3-t2",
            "title": "Stack Applications: Infix to Postfix / Prefix Conversion (Shunting-Yard Algorithm), Evaluation of Postfix Expressions & Balanced Parentheses Checking",
            "simpleExplanation": "Stacks provide the mechanical backbone for expression parsing and syntax validation in compilers. Using Edsger Dijkstra's Shunting-Yard algorithm, ambiguous human-readable infix expressions with parentheses and operator precedence are converted into unambiguous parenthesis-free postfix (Reverse Polish) notation, which can then be evaluated in a single linear pass using an operand stack.",
            "detailedExplanation": """## 1. Expression Notations

Mathematical expressions can be formalized in three distinct syntactic notations:
1. **Infix Notation**: Operator is positioned *between* operands ($A + B$). Requires parentheses and operator precedence rules (PEMDAS / BODMAS) to eliminate ambiguity.
2. **Postfix Notation (Reverse Polish Notation - RPN)**: Operator follows operands ($A B +$). Eliminates the need for parentheses and precedence rules; evaluated strictly left-to-right.
3. **Prefix Notation (Polish Notation)**: Operator precedes operands ($+ A B$). Evaluated right-to-left.

---

## 2. Infix to Postfix: Dijkstra's Shunting-Yard Algorithm

Invented by Edsger Dijkstra, the **Shunting-Yard Algorithm** uses an operator stack to convert infix expressions into postfix notation in $\\mathcal{O}(n)$ time.

```mermaid
flowchart TD
    subgraph ShuntingYard ["Shunting-Yard Algorithm Decision Flow"]
        TOKEN["Read Next Token from Infix"] --> T1{Is Operand?}
        T1 -- Yes --> OUT["Append directly to Postfix Output"]
        T1 -- No --> T2{Is Left Paren '('?}
        T2 -- Yes --> PUSH["Push '(' to Operator Stack"]
        T2 -- No --> T3{Is Right Paren ')'?}
        T3 -- Yes --> POP_PAREN["Pop stack to Output until '(' is met. Discard '('"]
        T3 -- No --> T4{Is Operator?}
        T4 -- Yes --> POP_PREC["While stack top has >= precedence (or > if right-assoc):\n Pop stack to Output.\n Then push current operator."]
    end
```

### Operator Precedence and Associativity Table
| Operator | Precedence Level | Associativity |
| :--- | :--- | :--- |
| `^` (Exponentiation) | 3 (Highest) | Right-to-Left |
| `*`, `/`, `%` | 2 | Left-to-Right |
| `+`, `-` | 1 (Lowest) | Left-to-Right |
| `(`, `)` | Parentheses | Non-associative (Delimiters) |

### Step-by-Step Conversion Walkthrough
**Convert**: $A + B \\times C - D / E$

| Token | Action | Operator Stack (Top $\\to$ Bottom) | Postfix Output |
| :--- | :--- | :--- | :--- |
| `A` | Operand $\\to$ Output | `[ ]` | `A` |
| `+` | Push `+` | `[ + ]` | `A` |
| `B` | Operand $\\to$ Output | `[ + ]` | `A B` |
| `*` | `*` has higher prec than `+` $\\to$ Push | `[ *, + ]` | `A B` |
| `C` | Operand $\\to$ Output | `[ *, + ]` | `A B C` |
| `-` | `-` has lower prec than `*` $\\to$ Pop `*`; same prec as `+` (L-to-R) $\\to$ Pop `+`; Push `-` | `[ - ]` | `A B C * +` |
| `D` | Operand $\\to$ Output | `[ - ]` | `A B C * + D` |
| `/` | `/` has higher prec than `-` $\\to$ Push | `[ /, - ]` | `A B C * + D` |
| `E` | Operand $\\to$ Output | `[ /, - ]` | `A B C * + D E` |
| `End`| Drain remaining stack to Output | `[ ]` | **`A B C * + D E / -`** |

---

## 3. Evaluation of Postfix Expressions

Postfix evaluation requires **only an Operand Stack** and runs in a single pass of $\\mathcal{O}(n)$ time without backtracking:
1. Scan the postfix string from left to right.
2. If token is an **operand**: Push its numerical value onto the stack.
3. If token is an **operator** $\\odot$:
   - Pop $op_2 = \\text{stack.pop()}$ (Second operand).
   - Pop $op_1 = \\text{stack.pop()}$ (First operand).
   - Compute result $= op_1 \\odot op_2$.
   - Push result back onto stack.
4. When scan completes, the single value remaining on the stack is the final result.

```mermaid
sequenceDiagram
    autonumber
    participant S as Operand Stack
    Note over S: Scan: "6 3 2 + *"
    Note over S: Push 6, Push 3, Push 2 -> Stack: [2, 3, 6]
    Note over S: Read '+': Pop 2, Pop 3 -> Compute 3 + 2 = 5 -> Push 5. Stack: [5, 6]
    Note over S: Read '*': Pop 5, Pop 6 -> Compute 6 * 5 = 30 -> Push 30. Stack: [30]
    Note over S: End of string: Final Result = 30!
```

---

## 4. Balanced Parentheses & Delimiter Checking

Compilers check balanced brackets (`( )`, `{ }`, `[ ]`) using a stack:
1. Scan characters left-to-right.
2. If opening delimiter (`(`, `{`, `[`): Push onto stack.
3. If closing delimiter (`)`, `}`, `]`):
   - If stack is empty: **Unbalanced** (premature closing bracket).
   - Pop top element. If it does not match the closing delimiter type: **Unbalanced** (mismatched nesting, e.g., `( ]`).
4. At end of string: If stack is empty, delimiters are **Balanced**; otherwise **Unbalanced** (unclosed bracket).

---

> [!IMPORTANT] **MEMORIZE:**
> In postfix evaluation, order matters during popping! The first popped element is the **right operand** ($op_2$), and the second popped is the **left operand** ($op_1$). For non-commutative operations like division and subtraction, calculate $op_1 / op_2$ and $op_1 - op_2$, NEVER $op_2 - op_1$!

> [!NOTE] **DEV BRAIN:**
> The Java Virtual Machine (JVM) is a stack-based virtual machine: bytecode instructions like `iadd`, `imul`, and `isub` pop operands from the evaluation stack and push back the result.

> [!WARNING] **TRAP:**
> Right-associative operators like `^` (exponentiation) behave differently: if the current operator has EQUAL precedence to the stack top, **do not pop**! Push it onto the stack ($2 \\wedge 3 \\wedge 2 = 2 \\wedge (3 \\wedge 2) = 512$, not $(2^3)^2 = 64$).

> [!TIP] **EXAM TIP:**
> When solving Infix to Postfix conversion questions in exams, always construct a clear four-column trace table: (1) Symbol Scanned, (2) Action Taken, (3) Operator Stack Contents, and (4) Postfix Expression So Far.""",
            "shortNotes": "Shunting-Yard converts infix to postfix via operator stack. Postfix evaluation uses an operand stack (op1 operator op2). Balanced brackets push opening and pop on matching closing.",
            "examples": [
                {
                    "title": "C Program: Infix to Postfix Conversion and Evaluation",
                    "problem": "Write a complete C program to convert an infix expression to postfix and evaluate the postfix result.",
                    "explanation": "Demonstrates operator precedence handling, stack-based conversion, and operand stack evaluation.",
                    "code": """#include <stdio.h>
#include <stdlib.h>
#include <ctype.h>
#include <string.h>

int precedence(char op) {
    if (op == '+' || op == '-') return 1;
    if (op == '*' || op == '/') return 2;
    return 0;
}

void infixToPostfix(const char *infix, char *postfix) {
    char stack[100];
    int top = -1;
    int k = 0;

    for (int i = 0; infix[i] != '\\0'; i++) {
        char ch = infix[i];
        if (isdigit(ch) || isalpha(ch)) {
            postfix[k++] = ch;
        } else if (ch == '(') {
            stack[++top] = ch;
        } else if (ch == ')') {
            while (top != -1 && stack[top] != '(') {
                postfix[k++] = stack[top--];
            }
            if (top != -1) top--; // Discard '('
        } else { // Operator
            while (top != -1 && precedence(stack[top]) >= precedence(ch)) {
                postfix[k++] = stack[top--];
            }
            stack[++top] = ch;
        }
    }
    while (top != -1) {
        postfix[k++] = stack[top--];
    }
    postfix[k] = '\\0';
}

int evaluatePostfix(const char *postfix) {
    int stack[100];
    int top = -1;

    for (int i = 0; postfix[i] != '\\0'; i++) {
        char ch = postfix[i];
        if (isdigit(ch)) {
            stack[++top] = ch - '0';
        } else {
            int op2 = stack[top--];
            int op1 = stack[top--];
            switch (ch) {
                case '+': stack[++top] = op1 + op2; break;
                case '-': stack[++top] = op1 - op2; break;
                case '*': stack[++top] = op1 * op2; break;
                case '/': stack[++top] = op1 / op2; break;
            }
        }
    }
    return stack[top];
}

int main() {
    char infix[] = "(2+3)*4-8/2";
    char postfix[100];

    infixToPostfix(infix, postfix);
    printf("Infix Expression   : %s\\n", infix);
    printf("Postfix Expression : %s\\n", postfix);

    int result = evaluatePostfix(postfix);
    printf("Evaluated Result   : %d\\n", result);

    return 0;
}""",
                    "output": """Infix Expression   : (2+3)*4-8/2
Postfix Expression : 23+4*82/-
Evaluated Result   : 16"""
                }
            ],
            "keyPoints": [
                "Infix requires parentheses and precedence rules; Postfix (RPN) is unambiguous and parenthesis-free.",
                "Dijkstra's Shunting-Yard algorithm transforms infix to postfix in O(n) time using an operator stack.",
                "Postfix evaluation scans left-to-right using an operand stack in linear O(n) time.",
                "In postfix evaluation, op2 is popped before op1, and calculation is op1 operator op2.",
                "Balanced parenthesis validation pushes opening brackets and pops on matching closing brackets."
            ],
            "theoryQuestions": [
                {
                    "question": "Convert the following infix expression into postfix using the Shunting-Yard algorithm. Show the step-by-step trace table:\\nExpression: (A + B) * C - (D - E) ^ F",
                    "marks": "7 Marks",
                    "answer": """1. **Precedence and Associativity**:
   - `^` : Precedence 3 (Right-to-Left)
   - `*`, `/` : Precedence 2 (Left-to-Right)
   - `+`, `-` : Precedence 1 (Left-to-Right)

2. **Step-by-Step Conversion Trace Table**:

| Token | Action | Stack (Top to Bottom) | Postfix Output |
| :--- | :--- | :--- | :--- |
| `(` | Push `(` | `( ` | |
| `A` | Append to output | `( ` | `A` |
| `+` | Push `+` | `+ (` | `A` |
| `B` | Append to output | `+ (` | `A B` |
| `)` | Pop until `(` | empty | `A B +` |
| `*` | Push `*` | `*` | `A B +` |
| `C` | Append to output | `*` | `A B + C` |
| `-` | Pop `*` (higher prec), push `-` | `-` | `A B + C *` |
| `(` | Push `(` | `( -` | `A B + C *` |
| `D` | Append to output | `( -` | `A B + C * D` |
| `-` | Push `-` | `- ( -` | `A B + C * D` |
| `E` | Append to output | `- ( -` | `A B + C * D E` |
| `)` | Pop until `(` | `-` | `A B + C * D E -` |
| `^` | Push `^` (higher prec than `-`)| `^ -` | `A B + C * D E -` |
| `F` | Append to output | `^ -` | `A B + C * D E - F` |
| `End`| Drain stack (`^`, then `-`) | empty | **`A B + C * D E - F ^ -`** |

3. **Final Postfix String**: `A B + C * D E - F ^ -`""",
                    "keyPoints": [
                        "Specification of operator precedence rules.",
                        "Comprehensive trace table showing token, action, stack state, and output string.",
                        "Correct final postfix expression output."
                    ]
                },
                {
                    "question": "Write an algorithm to evaluate a postfix expression using a stack. Trace the evaluation for postfix string: '5 3 + 8 2 / - *' (with leading operand).",
                    "marks": "5 Marks",
                    "answer": """1. **Algorithm**:
   - Initialize an empty operand stack $S$.
   - Iterate through tokens left to right:
     * If token is a number: `push(token)`.
     * If token is an operator $\\odot$:
       - `op2 = pop()`
       - `op1 = pop()`
       - `res = op1 \\odot op2`
       - `push(res)`
   - Return `pop()` as the final evaluated answer.

2. **Trace for '5 3 + 8 2 / -'**:
   - Token `5`: Push 5 $\\to$ `[5]`
   - Token `3`: Push 3 $\\to$ `[3, 5]`
   - Token `+`: Pop 3, Pop 5 $\\to$ $5 + 3 = 8$ $\\to$ Push 8 $\\to$ `[8]`
   - Token `8`: Push 8 $\\to$ `[8, 8]`
   - Token `2`: Push 2 $\\to$ `[2, 8, 8]`
   - Token `/`: Pop 2, Pop 8 $\\to$ $8 / 2 = 4$ $\\to$ Push 4 $\\to$ `[4, 8]`
   - Token `-`: Pop 4, Pop 8 $\\to$ $8 - 4 = 4$ $\\to$ Push 4 $\\to$ `[4]`
   - Result = **4**.""",
                    "keyPoints": [
                        "Formal algorithm steps detailing op2 then op1 popping order.",
                        "Step-by-step operand stack state trace.",
                        "Correct numerical derivation."
                    ]
                }
            ],
            "mcqs": [
                {
                    "question": "What is the equivalent postfix notation for the infix expression: a + b * c - d?",
                    "options": [
                        "a b c * + d -",
                        "a b + c * d -",
                        "a b c + * d -",
                        "- + a * b c d"
                    ],
                    "correctIndex": 0,
                    "explanation": "Multiplication takes precedence: b * c -> b c *. Then addition: a + (b*c) -> a b c * +. Finally subtraction: -> a b c * + d -."
                },
                {
                    "question": "During the evaluation of a postfix expression, the operator '-' is encountered. If op2 is popped first and op1 second, what operation must be computed?",
                    "options": [
                        "op2 - op1",
                        "op1 - op2",
                        "-(op1 + op2)",
                        "abs(op1 - op2)"
                    ],
                    "correctIndex": 1,
                    "explanation": "Because stack pops in reverse order, the first popped item is the right operand (op2) and the second is the left operand (op1). Subtraction must compute op1 - op2."
                },
                {
                    "question": "What data structure is utilized by compilers to check whether parenthesis delimiters are balanced?",
                    "options": [
                        "Queue",
                        "Stack",
                        "Binary Search Tree",
                        "Heap"
                    ],
                    "correctIndex": 1,
                    "explanation": "A stack naturally enforces the required LIFO nesting relationship: the most recently opened delimiter must be the first to close."
                },
                {
                    "question": "What is the postfix representation of the right-associative expression: 2 ^ 3 ^ 2?",
                    "options": [
                        "2 3 2 ^ ^",
                        "2 3 ^ 2 ^",
                        "^ ^ 2 3 2",
                        "2 3 ^ ^ 2"
                    ],
                    "correctIndex": 0,
                    "explanation": "Because exponentiation is right-associative, 2 ^ (3 ^ 2) evaluates 3 ^ 2 first (3 2 ^), then 2 ^ result (2 3 2 ^ ^)."
                }
            ]
        },
        {
            "id": "dsa-u3-t3",
            "title": "Queue ADT: FIFO Principle, Simple Linear Queue Array Limitation, and Circular Queue Index Arithmetic `(rear + 1) % size`",
            "simpleExplanation": "A Queue is an Abstract Data Type enforcing First-In, First-Out (FIFO) ordering, where elements enter at the rear and depart from the front. Simple linear array queues suffer from 'false overflow' where freed front slots cannot be reused; Circular Queues eliminate this using modulo index arithmetic `(rear + 1) % size` to wrap pointers around the array buffer.",
            "detailedExplanation": """## 1. The Queue ADT and the FIFO Paradigm

A **Queue** is a linear container where elements are inserted at the **rear** (enqueue) and removed from the **front** (dequeue), enforcing the **First-In, First-Out (FIFO)** discipline.

```mermaid
flowchart LR
    subgraph Queue_FIFO ["Queue FIFO Architecture"]
        IN["enqueue(40)"] --> REAR["[ 40 ] <-- REAR"]
        REAR --> M2["[ 30 ]"]
        M2 --> M1["[ 20 ]"]
        M1 --> FRONT["[ 10 ] <-- FRONT"]
        FRONT --> OUT["dequeue() --> 10"]
    end
```

### Core ADT Operations:
- `enqueue(x)`: Appends an element to the rear of the queue.
- `dequeue()`: Extracts and returns the element at the front of the queue.
- `peek()` / `front()`: Returns the front element without removal.
- `isEmpty()`: Verifies if the queue contains zero elements.
- `isFull()`: Verifies if capacity is exhausted.

---

## 2. The False Overflow Dilemma in Linear Array Queues

In a simple linear array queue of capacity $N$:
- `front` and `rear` both start at `-1`.
- `enqueue()` increments `rear` and inserts data: `arr[++rear] = x`.
- `dequeue()` increments `front`: `val = arr[++front]`.

```
Linear Array Queue (Capacity = 4):
Step 1: Enqueue 10, 20, 30, 40 -> [ 10, 20, 30, 40 ], front = 0, rear = 3
Step 2: Dequeue twice         -> [  -,  -, 30, 40 ], front = 2, rear = 3
Step 3: Try to enqueue 50     -> rear == MAX - 1 (3 == 3)!
```

### The False Overflow Problem
Even though slots $0$ and $1$ are completely empty, `rear == MAX - 1` triggers a **False Overflow**. The queue appears full despite having 50% free capacity! Shifting all elements left on every dequeue cures this, but turns `dequeue()` into a costly $\\mathcal{O}(n)$ operation.

---

## 3. The Circular Queue Solution

A **Circular Queue** wraps the linear array into a continuous conceptual ring by calculating indices using **modulo arithmetic** ($% N$).

```mermaid
flowchart TD
    subgraph CircularRing ["Circular Queue Ring Buffer (Size = 6)"]
        S0["Slot 0"] --> S1["Slot 1"]
        S1 --> S2["Slot 2"]
        S2 --> S3["Slot 3"]
        S3 --> S4["Slot 4"]
        S4 --> S5["Slot 5"]
        S5 -->|Wrap around via (rear + 1) % 6| S0
    end
```

### Modulo Index Arithmetic:
Instead of `rear++`, we use:
$$\\text{rear} = (\\text{rear} + 1) \\pmod N$$
$$\\text{front} = (\\text{front} + 1) \\pmod N$$

### Boundary Invariant Formulas:
1. **Empty Condition**:
   $$\\text{front} == -1$$
   *(Alternative convention: `front == rear` if leaving one slot unallocated).*
2. **Full Condition**:
   $$(\\text{rear} + 1) \\pmod N == \\text{front}$$
   *(The very next slot after rear is occupied by front).*
3. **Queue Size**:
   $$\\text{Count} = (\\text{rear} - \\text{front} + N) \\pmod N + 1$$

---

## 4. Complexity & Structural Comparison

| Dimension | Linear Array Queue (without shifting) | Linear Array Queue (with shifting) | Circular Array Queue |
| :--- | :--- | :--- | :--- |
| **Enqueue Time** | $\\mathcal{O}(1)$ | $\\mathcal{O}(1)$ | $\\mathcal{O}(1)$ |
| **Dequeue Time** | $\\mathcal{O}(1)$ | $\\mathcal{O}(n)$ | $\\mathcal{O}(1)$ |
| **Memory Reuse** | Broken (False Overflow) | Complete | Complete |
| **Index Math** | Simple `++` | Simple `++` | Modulo `(i + 1) % N` |
| **Auxiliary Space**| $\\mathcal{O}(1)$ | $\\mathcal{O}(1)$ | $\\mathcal{O}(1)$ |

---

> [!IMPORTANT] **MEMORIZE:**
> Circular Queue conditions:
> - **Full**: `(rear + 1) % MAX == front`
> - **Empty**: `front == -1`
> - **Reset on Dequeuing Last Element**: If `front == rear`, set `front = -1; rear = -1;`!

> [!NOTE] **DEV BRAIN:**
> Circular ring buffers implemented over contiguous memory are standard in high-performance networking (Linux socket buffers `sk_buff`) and hardware device drivers (circular DMA descriptor rings).

> [!WARNING] **TRAP:**
> Forgetting to reset `front = rear = -1` when dequeuing the final remaining element leaves the queue in a permanently broken state where `front != -1` even though the queue is empty!

> [!TIP] **EXAM TIP:**
> When asked to trace a Circular Queue in exams, draw a numbered clock-face diagram with slots $0$ to $N - 1$. Mark `F` and `R` pointers at each step to visualize wraparound arithmetic clearly.""",
            "shortNotes": "Queue enforces FIFO. Linear queues suffer from false overflow. Circular queue solves this via modulo arithmetic (rear + 1) % size == front for full condition.",
            "examples": [
                {
                    "title": "Complete C Implementation of Circular Queue with Modulo Arithmetic",
                    "problem": "Implement a fixed-size Circular Queue supporting enqueue, dequeue, display, and verify resolution of false overflow.",
                    "explanation": "Uses modulo arithmetic for pointer advancement and tests wraparound behavior.",
                    "code": """#include <stdio.h>
#include <stdbool.h>

#define SIZE 5

typedef struct {
    int items[SIZE];
    int front;
    int rear;
} CircularQueue;

void initQueue(CircularQueue *q) {
    q->front = -1;
    q->rear = -1;
}

bool isFull(CircularQueue *q) {
    return (q->rear + 1) % SIZE == q->front;
}

bool isEmpty(CircularQueue *q) {
    return q->front == -1;
}

void enqueue(CircularQueue *q, int val) {
    if (isFull(q)) {
        printf("CircularQueue Full! Cannot enqueue %d\\n", val);
        return;
    }
    if (isEmpty(q)) {
        q->front = 0;
    }
    q->rear = (q->rear + 1) % SIZE;
    q->items[q->rear] = val;
    printf("Enqueued: %d (front=%d, rear=%d)\\n", val, q->front, q->rear);
}

int dequeue(CircularQueue *q) {
    if (isEmpty(q)) {
        printf("CircularQueue Empty! Cannot dequeue.\\n");
        return -1;
    }
    int val = q->items[q->front];
    if (q->front == q->rear) { // Last element removed -> reset
        q->front = -1;
        q->rear = -1;
    } else {
        q->front = (q->front + 1) % SIZE;
    }
    return val;
}

void display(CircularQueue *q) {
    if (isEmpty(q)) {
        printf("Queue is Empty.\\n");
        return;
    }
    printf("Queue elements: ");
    int i = q->front;
    while (1) {
        printf("%d ", q->items[i]);
        if (i == q->rear) break;
        i = (i + 1) % SIZE;
    }
    printf("\\n");
}

int main() {
    CircularQueue q;
    initQueue(&q);

    enqueue(&q, 10);
    enqueue(&q, 20);
    enqueue(&q, 30);
    enqueue(&q, 40);
    display(&q);

    printf("Dequeued: %d\\n", dequeue(&q));
    printf("Dequeued: %d\\n", dequeue(&q));
    display(&q);

    // In a linear queue, slots 0 and 1 would be wasted.
    // In a circular queue, they are reused:
    printf("Testing Circular Wraparound:\\n");
    enqueue(&q, 50);
    enqueue(&q, 60);
    enqueue(&q, 70); // Should fill slot 0 or 1
    display(&q);

    return 0;
}""",
                    "output": """Enqueued: 10 (front=0, rear=0)
Enqueued: 20 (front=0, rear=1)
Enqueued: 30 (front=0, rear=2)
Enqueued: 40 (front=0, rear=3)
Queue elements: 10 20 30 40 
Dequeued: 10
Dequeued: 20
Queue elements: 30 40 
Testing Circular Wraparound:
Enqueued: 50 (front=2, rear=4)
Enqueued: 60 (front=2, rear=0)
Enqueued: 70 (front=2, rear=1)
Queue elements: 30 40 50 60 70 """
                }
            ],
            "keyPoints": [
                "Queues operate under the FIFO (First-In, First-Out) discipline.",
                "Linear array queues suffer from False Overflow, where capacity is wasted after dequeue operations.",
                "Circular queues wrap indices around the array buffer using modulo arithmetic: (index + 1) % SIZE.",
                "Full condition in a circular queue: (rear + 1) % SIZE == front.",
                "Empty condition: front == -1. If front == rear during dequeue, reset both pointers to -1."
            ],
            "theoryQuestions": [
                {
                    "question": "Explain the concept of 'False Overflow' in linear array queues. How does a Circular Queue resolve this problem? State the boundary conditions for a Circular Queue.",
                    "marks": "7 Marks",
                    "answer": """1. **The False Overflow Problem**:
   - In a linear queue of size $N$, elements are enqueued at `rear` and dequeued at `front`.
   - When elements are dequeued, `front` increments, leaving freed memory slots at the beginning of the array.
   - Eventually, `rear` reaches $N - 1$. Any subsequent `enqueue()` call fails because `rear == N - 1`, reporting a "Queue Overflow", despite the fact that slots $0$ to `front - 1` are empty.
   - This wasted capacity condition is termed **False Overflow**.

2. **Resolution via Circular Queue**:
   - The array is treated as a continuous logical ring.
   - When `rear` reaches $N - 1$, rather than failing, it wraps around to index $0$ if that slot is free:
     $$\\text{rear} = (\\text{rear} + 1) \\pmod N$$
   - The same modulo arithmetic applies to `front`:
     $$\\text{front} = (\\text{front} + 1) \\pmod N$$

3. **Mathematical Boundary Conditions**:
   - **Queue Empty**: `front == -1` (or `front == rear` depending on convention).
   - **Queue Full**: `(rear + 1) % N == front`.
   - **Single Element Reset**: If `front == rear` during a dequeue, reset `front = -1; rear = -1;`.""",
                    "keyPoints": [
                        "Clear explanation of why linear queues report overflow when early slots are free.",
                        "Modulo index arithmetic (rear + 1) % N wrapping around.",
                        "Formal boundary formulas for full, empty, and single-element reset."
                    ]
                },
                {
                    "question": "A circular queue of capacity 6 currently has front = 4 and rear = 2. How many elements are in the queue? What slots in the array are occupied?",
                    "marks": "5 Marks",
                    "answer": """1. **Given Parameters**:
   - Capacity $N = 6$.
   - Indices: $0, 1, 2, 3, 4, 5$.
   - `front = 4`, `rear = 2`.

2. **Occupied Slots**:
   - Elements start at `front = 4` and advance circularly up to `rear = 2`.
   - Traversal sequence:
     * Slot 4 (front)
     * Slot 5
     * Slot 0 (wraparound: $(5 + 1) \\% 6 = 0$)
     * Slot 1
     * Slot 2 (rear)
   - **Occupied Slots**: 4, 5, 0, 1, 2.

3. **Total Element Count Formula**:
   $$\\text{Count} = (\\text{rear} - \\text{front} + N) \\pmod N + 1$$
   $$\\text{Count} = (2 - 4 + 6) \\pmod 6 + 1 = 4 \\pmod 6 + 1 = 4 + 1 = 5$$
   - The queue currently contains **5 elements**.""",
                    "keyPoints": [
                        "Circular traversal order starting at front and wrapping to rear.",
                        "List of occupied indices: 4, 5, 0, 1, 2.",
                        "Count calculation using modular arithmetic yielding 5."
                    ]
                }
            ],
            "mcqs": [
                {
                    "question": "In a circular queue of size N using 0-based indexing, what is the mathematical condition to check if the queue is full?",
                    "options": [
                        "rear == N - 1",
                        "(rear + 1) % N == front",
                        "front == (rear + 1)",
                        "rear == front"
                    ],
                    "correctIndex": 1,
                    "explanation": "If advancing rear by 1 using modulo N results in front, the next slot is already occupied by the head of the queue, indicating the circular buffer is full."
                },
                {
                    "question": "What is the primary operational defect of a basic linear queue implemented via a fixed-size array?",
                    "options": [
                        "Enqueue requires O(n) time.",
                        "It suffers from False Overflow where vacated front slots cannot be reused without element shifting.",
                        "It cannot store floating point values.",
                        "It reverses the order of elements."
                    ],
                    "correctIndex": 1,
                    "explanation": "As elements are dequeued, front moves forward, permanently stranding earlier array indices unless elements are shifted."
                },
                {
                    "question": "If a circular queue of capacity 8 has front = 6 and rear = 1, what is the total number of elements currently stored?",
                    "options": [
                        "3",
                        "4",
                        "5",
                        "6"
                    ],
                    "correctIndex": 1,
                    "explanation": "Count = (rear - front + N) % N + 1 = (1 - 6 + 8) % 8 + 1 = 3 % 8 + 1 = 4 elements (slots 6, 7, 0, 1)."
                },
                {
                    "question": "What action must be executed when the sole remaining element of a circular queue is dequeued?",
                    "options": [
                        "Set rear = (rear + 1) % N",
                        "Reset both front = -1 and rear = -1",
                        "Set front = 0 and rear = 0",
                        "Reallocate the array with double capacity"
                    ],
                    "correctIndex": 1,
                    "explanation": "When front == rear, removing that element empties the queue. Both front and rear must be reset to -1 to reflect the empty state."
                }
            ]
        },
        {
            "id": "dsa-u3-t4",
            "title": "Specialized Queues: Double-Ended Queue (Deque), Priority Queue (Array vs Heap implementation), and Implementing Stacks using Queues",
            "simpleExplanation": "Specialized queue variations adapt FIFO behavior for specific domains: Double-Ended Queues (Deques) allow insertions and deletions at both front and rear ends; Priority Queues dequeue elements by priority rank rather than arrival order (efficiently implemented via binary heaps in O(log n) time); and Stacks can be simulated using two queues through either push-costly or pop-costly designs.",
            "detailedExplanation": """## 1. Double-Ended Queue (Deque)

A **Double-Ended Queue (Deque)** (pronounced "deck") is a generalized linear container allowing insertions and deletions at **both** ends:

```mermaid
flowchart LR
    subgraph Deque_Layout ["Double-Ended Queue (Deque) Architecture"]
        direction LR
        IN_F["insertFront() -->"] --> F["FRONT"]
        F <--> BODY["Interior Data Buffer"] <--> R["REAR"]
        R <-- "<-- insertRear()" <-- IN_R["insertRear()"]
        F --> OUT_F["deleteFront()"]
        R --> OUT_R["deleteRear()"]
    end
```

### Deque Variants:
1. **Input-Restricted Deque**: Deletions allowed at both ends, but insertions permitted at one end only (e.g., rear only).
2. **Output-Restricted Deque**: Insertions allowed at both ends, but deletions permitted at one end only (e.g., front only).

### Core Applications
- **Sliding Window Maximum/Minimum**: Finding the maximum element in every sliding sub-array of size $k$ in $\\mathcal{O}(n)$ time.
- **A-Stealing Job Schedulers**: Work-stealing scheduling algorithms in multi-core runtimes (e.g., Go runtime, Java ForkJoinPool).
- **Undo/Redo History with Max Limit**: Oldest history drops off the front when the maximum capacity is exceeded.

---

## 2. Priority Queue ADT: Array vs Heap Implementations

A **Priority Queue** is an ADT where each element is paired with a priority rank. Elements with higher priority are dequeued before lower-priority elements. If two elements share equal priority, they are served according to FIFO order.

```mermaid
graph TD
    subgraph PQ_Implementations ["Priority Queue Implementation Trade-offs"]
        U["Unsorted Array\nEnqueue: O(1)\nDequeue (find max): O(n)"]
        S["Sorted Array\nEnqueue (insert in order): O(n)\nDequeue (remove max at tail): O(1)"]
        H["Binary Heap (Min/Max Heap)\nEnqueue: O(log n)\nDequeue: O(log n)\nOptimal Balance!"]
    end
```

### Comprehensive Implementation Comparison

| Metric / Operation | Unsorted Array | Sorted Array | Binary Heap (Optimal) |
| :--- | :--- | :--- | :--- |
| **`insert()` / `enqueue()`** | $\\mathcal{O}(1)$ | $\\mathcal{O}(n)$ | $\\mathcal{O}(\\log n)$ |
| **`extractMax()` / `dequeue()`** | $\\mathcal{O}(n)$ | $\\mathcal{O}(1)$ | $\\mathcal{O}(\\log n)$ |
| **`peek()`** | $\\mathcal{O}(n)$ | $\\mathcal{O}(1)$ | $\\mathcal{O}(1)$ |
| **Space Overhead** | $\\mathcal{O}(1)$ | $\\mathcal{O}(1)$ | $\\mathcal{O}(1)$ |
| **Engineering Verdict** | Inefficient at scale | Inefficient for inserts | Universally used in OS schedulers & Dijkstra |

---

## 3. Emulating a Stack using Queues

A classic interview and university question asks: *How can a LIFO Stack be implemented using only FIFO Queue instances?*

Two standard strategies exist using two queues ($q_1$ and $q_2$):

```mermaid
flowchart TD
    subgraph PushCostly ["Method 1: Making Push Costly (O(n) Push, O(1) Pop)"]
        P1["1. Enqueue new item x into q2"]
        P2["2. Dequeue all elements from q1 one-by-one and enqueue into q2"]
        P3["3. Swap names of q1 and q2 (q1 now has newest item at front!)"]
        P1 --> P2 --> P3
    end
```

### Method 1: Push-Costly ($\mathcal{O}(n)$ Push, $\mathcal{O}(1)$ Pop)
1. `push(x)`:
   - Enqueue $x$ into helper queue $q_2$.
   - While $q_1$ is not empty: dequeue from $q_1$ and enqueue into $q_2$.
   - Swap the roles of $q_1$ and $q_2$.
   - *(Result: The most recently inserted item $x$ is positioned at the front of $q_1$.)*
2. `pop()`:
   - Dequeue directly from $q_1$ in $\\mathcal{O}(1)$ time.

### Method 2: Pop-Costly ($\mathcal{O}(1)$ Push, $\mathcal{O}(n)$ Pop)
1. `push(x)`:
   - Enqueue $x$ into $q_1$ in $\\mathcal{O}(1)$ time.
2. `pop()`:
   - Dequeue $N - 1$ elements from $q_1$ and enqueue them into $q_2$.
   - The single remaining element in $q_1$ is the latest element; dequeue and return it.
   - Swap the roles of $q_1$ and $q_2$.

---

> [!IMPORTANT] **MEMORIZE:**
> - A Deque supports four operations: `insertFront`, `insertRear`, `deleteFront`, `deleteRear`.
> - A Priority Queue implemented via a Binary Heap achieves $\\mathcal{O}(\\log n)$ for both insertion and extraction, outperforming array implementations.

> [!NOTE] **DEV BRAIN:**
> In Python, `collections.deque` is implemented as an unrolled doubly linked list of blocks, providing fast $O(1)$ appends and pops from both ends.

> [!WARNING] **TRAP:**
> Do not assume a Priority Queue is a fully sorted list. A binary heap only guarantees that the root is the extremum (min or max); elements in other levels are partially ordered!

> [!TIP] **EXAM TIP:**
> When asked to implement a stack using queues, clearly state whether your design is **Push-Costly** ($O(n)$ push, $O(1)$ pop) or **Pop-Costly** ($O(1)$ push, $O(n)$ pop), and provide step-by-step queue transfer traces.""",
            "shortNotes": "Deque allows insertion/deletion at both ends. Priority Queue serves highest rank first (O(log n) via binary heaps). Stacks can be emulated using two queues via push-costly or pop-costly methods.",
            "examples": [
                {
                    "title": "C Program: Implementing Stack using Two Queues (Push-Costly)",
                    "problem": "Implement a LIFO Stack using two FIFO Queue ADTs such that pop executes in O(1) time.",
                    "explanation": "Illustrates how transferring elements between two queues reverses FIFO order to achieve LIFO behavior.",
                    "code": """#include <stdio.h>
#include <stdbool.h>

#define MAX 50

typedef struct {
    int arr[MAX];
    int front, rear;
} Queue;

void initQ(Queue *q) { q->front = 0; q->rear = 0; }
bool isQEmpty(Queue *q) { return q->front == q->rear; }
void enq(Queue *q, int val) { q->arr[(q->rear)++] = val; }
int deq(Queue *q) { return q->arr[(q->front)++]; }

// Stack container built using two queues
typedef struct {
    Queue q1, q2;
} QueueStack;

void initStack(QueueStack *s) {
    initQ(&s->q1);
    initQ(&s->q2);
}

// Push-Costly: O(n) push
void push(QueueStack *s, int val) {
    // 1. Enqueue into q2
    enq(&s->q2, val);

    // 2. Transfer all from q1 to q2
    while (!isQEmpty(&s->q1)) {
        enq(&s->q2, deq(&s->q1));
    }

    // 3. Swap q1 and q2
    Queue temp = s->q1;
    s->q1 = s->q2;
    s->q2 = temp;
    initQ(&s->q2);
}

// Pop: O(1)
int pop(QueueStack *s) {
    if (isQEmpty(&s->q1)) {
        printf("Stack Underflow!\\n");
        return -1;
    }
    return deq(&s->q1);
}

int main() {
    QueueStack s;
    initStack(&s);

    printf("Pushing 10, 20, 30 onto QueueStack...\\n");
    push(&s, 10);
    push(&s, 20);
    push(&s, 30);

    printf("Popped (LIFO expected 30): %d\\n", pop(&s));
    printf("Popped (LIFO expected 20): %d\\n", pop(&s));

    push(&s, 40);
    printf("Pushed 40\\n");
    printf("Popped (LIFO expected 40): %d\\n", pop(&s));
    printf("Popped (LIFO expected 10): %d\\n", pop(&s));

    return 0;
}""",
                    "output": """Pushing 10, 20, 30 onto QueueStack...
Popped (LIFO expected 30): 30
Popped (LIFO expected 20): 20
Pushed 40
Popped (LIFO expected 40): 40
Popped (LIFO expected 10): 10"""
                }
            ],
            "keyPoints": [
                "A Deque supports insertion and deletion at both front and rear terminals in O(1) time.",
                "Input-restricted deques permit insertion at one end only; output-restricted deques permit deletion at one end only.",
                "Priority Queues serve elements by priority rank rather than arrival timestamp.",
                "Binary Heaps provide optimal O(log n) enqueue and dequeue operations for Priority Queues.",
                "Stacks can be implemented using two queues with either O(n) push and O(1) pop, or O(1) push and O(n) pop."
            ],
            "theoryQuestions": [
                {
                    "question": "What is a Double-Ended Queue (Deque)? Differentiate between Input-Restricted and Output-Restricted Deques with real-world examples.",
                    "marks": "5 Marks",
                    "answer": """1. **Definition of Deque**:
   A Deque (Double-Ended Queue) is a generalized linear data structure in which insertions and deletions can be performed at either the front or the rear end.

2. **Input-Restricted Deque**:
   - **Constraint**: Insertions are permitted at only one end (typically `rear`), while deletions are allowed at both ends (`front` and `rear`).
   - **Real-World Example**: A printer spooler where all new print jobs enter at the rear, but administrators can cancel urgent jobs from the front or remove erroneous jobs from the rear.

3. **Output-Restricted Deque**:
   - **Constraint**: Deletions are permitted at only one end (typically `front`), while insertions are allowed at both ends (`front` and `rear`).
   - **Real-World Example**: An undo/redo manager where normal actions append to the rear, urgent prioritized undo operations prepend to the front, and items are removed strictly from the front.""",
                    "keyPoints": [
                        "Formal definition of Deque supporting four endpoint operations.",
                        "Input-restricted definition (1 insertion end, 2 deletion ends) with example.",
                        "Output-restricted definition (2 insertion ends, 1 deletion end) with example."
                    ]
                },
                {
                    "question": "Explain how a Priority Queue can be implemented using: (a) Unsorted Array, (b) Sorted Array, and (c) Binary Heap. Compare their time complexities.",
                    "marks": "7 Marks",
                    "answer": """1. **Implementation Approaches**:
   - **(a) Unsorted Array**:
     * `Insert`: Append to end in $\\mathcal{O}(1)$ time.
     * `DeleteMax`: Scan entire array to locate maximum priority item in $\\mathcal{O}(n)$ time, then shift elements to fill hole.
   - **(b) Sorted Array (Ascending Order)**:
     * `Insert`: Find correct position and shift elements in $\\mathcal{O}(n)$ time.
     * `DeleteMax`: Remove the last element at index $N - 1$ in $\\mathcal{O}(1)$ time without shifting.
   - **(c) Binary Heap (Max-Heap)**:
     * `Insert`: Place at next available leaf and bubble up in $\\mathcal{O}(\\log n)$ time.
     * `DeleteMax`: Replace root with last leaf and bubble down (heapify) in $\\mathcal{O}(\\log n)$ time.

2. **Complexity Comparison Table**:

| Operation | Unsorted Array | Sorted Array | Binary Heap |
| :--- | :--- | :--- | :--- |
| **Insert** | $\\mathcal{O}(1)$ | $\\mathcal{O}(n)$ | $\\mathcal{O}(\\log n)$ |
| **DeleteMax** | $\\mathcal{O}(n)$ | $\\mathcal{O}(1)$ | $\\mathcal{O}(\\log n)$ |
| **PeekMax** | $\\mathcal{O}(n)$ | $\\mathcal{O}(1)$ | $\\mathcal{O}(1)$ |

3. **Conclusion**:
   The Binary Heap offers the most balanced performance, avoiding linear $\\mathcal{O}(n)$ bottlenecks on both insertions and extractions.""",
                    "keyPoints": [
                        "Detailed explanation of Unsorted Array, Sorted Array, and Binary Heap implementations.",
                        "Comparison table covering Insert, DeleteMax, and PeekMax.",
                        "Conclusion highlighting Binary Heap balance."
                    ]
                }
            ],
            "mcqs": [
                {
                    "question": "What is the time complexity of extracting the highest-priority element from a Binary Heap-based Priority Queue containing n items?",
                    "options": [
                        "O(1)",
                        "O(log n)",
                        "O(n)",
                        "O(n log n)"
                    ],
                    "correctIndex": 1,
                    "explanation": "Extracting the root takes O(1), but restoring the heap invariant via the heapify (bubble-down) process along the tree height takes O(log n) time."
                },
                {
                    "question": "Which type of Deque restricts insertions to a single end while allowing removals from both ends?",
                    "options": [
                        "Circular Deque",
                        "Input-Restricted Deque",
                        "Output-Restricted Deque",
                        "Priority Deque"
                    ],
                    "correctIndex": 1,
                    "explanation": "An Input-Restricted Deque allows insertion at only one designated end, but permits deletion from both front and rear."
                },
                {
                    "question": "In implementing a Stack using two Queues with push-costly design, what is the time complexity of the push operation for n elements?",
                    "options": [
                        "O(1)",
                        "O(log n)",
                        "O(n)",
                        "O(n^2)"
                    ],
                    "correctIndex": 2,
                    "explanation": "To keep the newest element at the front of the queue, all existing n-1 elements must be transferred to the second queue and back, costing O(n) per push."
                },
                {
                    "question": "Which algorithm commonly relies on a Double-Ended Queue (Deque) to maintain extreme values over sliding intervals in O(n) total time?",
                    "options": [
                        "Dijkstra's Algorithm",
                        "Sliding Window Maximum",
                        "Floyd-Warshall Algorithm",
                        "Kruskal's MST Algorithm"
                    ],
                    "correctIndex": 1,
                    "explanation": "The sliding window maximum problem uses a monotonic deque storing array indices to find the maximum in each window of size k in O(n) amortized time."
                }
            ]
        }
    ]
}
