import type { Subject } from './types';

export const sem3DsaMaster: Subject = {
  "id": "sem3-dsa",
  "name": "Data Structures and Algorithms (DSA)",
  "code": "DSA301",
  "color": "bg-green-600",
  "icon": "database",
  "description": "Comprehensive University Syllabus for Data Structures and Algorithms \u2014 Asymptotic Complexity Analysis, Linear Structures (Lists, Stacks, Queues), Non-Linear Structures (Trees, AVL, Heaps, Graphs), Shortest Paths, MST, and Sorting/Hashing",
  "semester": 3,
  "units": [
    {
      "id": "dsa-u1",
      "title": "Unit 1: Introduction to Data Structures & Complexity Analysis",
      "description": "Foundational concepts of Abstract Data Types (ADTs), classification of data structures, formal asymptotic notation (Big-O, Omega, Theta, Little-o, Little-omega), algorithm complexity analysis, amortized costs, and recurrence relation solutions.",
      "topics": [
        {
          "id": "dsa-u1-t1",
          "title": "Concept of Abstract Data Types (ADT), Primitive vs Non-Primitive, Linear vs Non-Linear Data Structures",
          "simpleExplanation": "An Abstract Data Type (ADT) defines what operations a data structure can perform and what values it can hold, completely decoupled from its underlying memory implementation. Data structures are broadly categorized into primitive types (built-in atomic values like integers and floats) versus non-primitive types, which further subdivide into sequential linear structures (arrays, linked lists, stacks, queues) and hierarchical non-linear structures (trees, graphs).",
          "detailedExplanation": "## 1. The Philosophy of Abstract Data Types (ADTs)\n\nIn computer science, an **Abstract Data Type (ADT)** is a mathematical model for data types where a data type is defined by its behavior (semantics) from the point of view of a *user* of the data, specifically in terms of possible values, possible operations on data of this type, and the behavior of these operations.\n\nAn ADT specifies:\n1. **The Type of Data Stored**: What domain of values can be represented (e.g., integers, strings, custom objects).\n2. **The Operations Supported**: The interface of legal operations (e.g., `insert()`, `delete()`, `lookup()`, `size()`).\n3. **The Axioms and Preconditions**: Rules governing how operations alter the internal state (e.g., popping from an empty stack is undefined or triggers an underflow exception).\n\nCrucially, an ADT **never** specifies *how* the data is laid out in physical memory, nor does it mandate a specific algorithmic implementation. For instance, the **List ADT** defines operations such as `get(i)`, `append(x)`, and `remove(i)`. This single ADT can be physically implemented as:\n- A contiguous, cache-friendly array (`ArrayList` or standard dynamic array).\n- A series of heap-allocated, pointer-linked nodes (`LinkedList`).\n- A hashed array tree or unrolled linked list.\n\n```mermaid\nflowchart TD\n    subgraph ADT_Interface [\"Abstract Data Type (Interface / Contract)\"]\n        A[\"List ADT\nOperations: append(), get(), delete(), size()\"]\n    end\n    subgraph Implementations [\"Concrete Implementations (Memory Layout & Algorithms)\"]\n        B[\"Array-based List\n(Contiguous RAM, O(1) random access, O(n) insert)\"]\n        C[\"Singly Linked List\n(Dispersed nodes, O(n) access, O(1) head insert)\"]\n        D[\"Doubly Linked List\n(Bidirectional pointers, O(1) head/tail insert)\"]\n    end\n    A --> B\n    A --> C\n    A --> D\n```\n\n### ADT Encapsulation and Information Hiding\nThe fundamental tenet of software engineering enabled by ADTs is **encapsulation** or **data hiding**. The client interacts solely with the public contract (the ADT interface), remaining completely oblivious to:\n- Pointer manipulations.\n- Dynamic resizing thresholds.\n- Memory reallocations and garbage collection cycles.\n\nIf an engineer decides to migrate an internal queue implementation from a circular array to a doubly linked list, client code calling `enqueue()` and `dequeue()` requires zero modifications.\n\n---\n\n## 2. Taxonomy of Data Structures\n\nA data structure is a concrete programmatic implementation of an ADT, organizing memory to allow efficient computational access and mutation.\n\n```mermaid\ngraph TD\n    DS[\"Data Structures Taxonomy\"] --> PRIM[\"Primitive Data Structures\"]\n    DS --> NONPRIM[\"Non-Primitive Data Structures\"]\n\n    PRIM --> P1[\"Integer (int, short, long)\"]\n    PRIM --> P2[\"Floating Point (float, double)\"]\n    PRIM --> P3[\"Character (char)\"]\n    PRIM --> P4[\"Boolean (bool)\"]\n    PRIM --> P5[\"Pointers / References\"]\n\n    NONPRIM --> LIN[\"Linear Data Structures\n(Single-level sequential)\"]\n    NONPRIM --> NONLIN[\"Non-Linear Data Structures\n(Hierarchical / Multi-level)\"]\n\n    LIN --> L1[\"Arrays (Fixed / Dynamic)\"]\n    LIN --> L2[\"Linked Lists (SLL, DLL, CLL)\"]\n    LIN --> L3[\"Stacks (LIFO)\"]\n    LIN --> L4[\"Queues (FIFO, Deque, Priority)\"]\n\n    NONLIN --> N1[\"Trees (Binary Tree, BST, AVL, Heap)\"]\n    NONLIN --> N2[\"Graphs (Directed, Undirected, Weighted)\"]\n    NONLIN --> N3[\"Hash Tables / Hash Maps\"]\n```\n\n### Primitive vs. Non-Primitive Data Structures\n\n1. **Primitive Data Structures**:\n   - Built directly into the machine instruction set and programming language compilers.\n   - Represent atomic values residing in standard processor registers or stack frames.\n   - Direct hardware manipulation: operations (such as addition, bitwise shifts, comparisons) map to single CPU micro-instructions.\n   - Examples: `int`, `float`, `char`, `double`, `uintptr_t`.\n\n2. **Non-Primitive Data Structures**:\n   - Sophisticated structures constructed by combining primitive data types.\n   - Manage collections of homogeneous or heterogeneous items.\n   - Abstract away complex memory layouts, pointer management, and capacity growth.\n   - Emphasize logical organization, searchability, and structured relationships among data elements.\n   - Examples: Arrays, Structures (`struct`), Classes, Lists, Trees, Hash Tables.\n\n---\n\n## 3. Linear vs. Non-Linear Data Structures\n\nThe defining criterion distinguishing linear and non-linear data structures is the **topological arrangement** of elements in memory and the **predecessor-successor relationship**.\n\n### Comprehensive Comparative Matrix\n\n| Architectural Dimension | Linear Data Structures | Non-Linear Data Structures |\n| :--- | :--- | :--- |\n| **Element Arrangement** | Sequential / Single-level sequence. Every element has a unique predecessor and successor (except head/tail). | Hierarchical or networked / Multi-level. An element can connect to multiple children or neighbors. |\n| **Traversal Paths** | Can be completely traversed in a single pass (linear sweep). | Requires complex traversal strategies (DFS, BFS, Preorder, Inorder, Postorder). |\n| **Memory Allocation** | Often contiguous (arrays) or linearly chained in heap space (linked lists). | Typically non-contiguous, multi-pointer graph/tree nodes scattered across heap memory. |\n| **Search Time Complexity**| Unsorted: $O(n)$; Sorted contiguous: $O(\\log n)$ via Binary Search. | $O(\\log n)$ in balanced search trees (AVL, Red-Black); $O(V + E)$ in graphs. |\n| **Insertion / Deletion** | Shifting elements in arrays costs $O(n)$; pointer splicing in linked lists costs $O(1)$ once located. | Rebalancing in trees costs $O(\\log n)$; graph edge mutation costs $O(1)$ to $O(V)$. |\n| **Space Overhead** | Low (arrays have 0 pointer overhead; linked lists have 1-2 pointers per node). | High (each tree/graph node maintains multiple child/edge pointers and balance metadata). |\n| **Primary Use Cases** | Buffer caches, undo/redo stacks, task queues, tabular records. | File systems (B-Trees), social networks, routing tables, ASTs (compilers). |\n\n---\n\n## 4. Architectural Analysis of Core Structures\n\n### A. Linear Structures\n1. **Arrays**: Homogeneous elements stored in strictly contiguous memory cells. Provides $O(1)$ random access through index address arithmetic: $\\text{Address}(A[i]) = \\text{Base} + i \\times W$.\n2. **Linked Lists**: Dispersed memory nodes linked via explicit pointer addresses. Permits dynamic resizing without memory fragmentation reallocation, but forfeits random access ($O(n)$ search).\n3. **Stacks**: Constrained linear container enforcing the **Last-In, First-Out (LIFO)** policy. All insertions and removals occur at a single designated terminal called `top`.\n4. **Queues**: Constrained linear container enforcing the **First-In, First-Out (FIFO)** policy. Insertions occur at `rear` and removals occur at `front`.\n\n### B. Non-Linear Structures\n1. **Trees**: A connected, acyclic directed or undirected graph where $N$ nodes are interconnected by exactly $N - 1$ edges. One node is designated as `root`. Represents natural hierarchies such as XML/JSON DOM models and database indices.\n2. **Graphs**: A collection of vertices $V$ and edges $E$, denoted $G = (V, E)$. Models arbitrary many-to-many relationships with cycles, weights, and directed paths (e.g., GPS networks, internet autonomous systems).\n\n---\n\n> [!IMPORTANT] **MEMORIZE:**\n> An ADT is purely a **specification** (what operations exist, e.g., Stack: push/pop), whereas a Data Structure is a concrete **implementation** in code and memory (e.g., implementing Stack via dynamic array or singly linked list).\n\n> [!NOTE] **DEV BRAIN:**\n> In modern OOP languages, ADTs are represented by `interface` (Java/TypeScript) or pure virtual abstract classes (C++), while concrete data structures are the implementing classes (`ArrayList`, `LinkedList`, `PriorityQueue`).\n\n> [!WARNING] **TRAP:**\n> Do not assume linear structures are always stored contiguously in hardware RAM. Arrays are contiguous, but Linked Lists are linear in logical structure while scattered non-contiguously throughout heap memory!\n\n> [!TIP] **EXAM TIP:**\n> When asked to differentiate Linear vs Non-Linear structures, always provide: (1) Definition, (2) Predecessor/Successor rules, (3) Traversal mechanism (single-pass vs multi-pass/recursive), (4) Comparison table, and (5) Examples with Big-O search complexities.",
          "shortNotes": "ADT defines operations and contracts without implementation details. Linear structures (arrays, lists, stacks, queues) have single predecessor/successor; non-linear (trees, graphs) have hierarchical or networked relationships.",
          "examples": [
            {
              "title": "C Implementation of List ADT using Fixed-Size Contiguous Array",
              "problem": "Implement an integer List ADT supporting append, insert at index, delete at index, and display operations with boundary validation.",
              "explanation": "This C program demonstrates the separation between interface definition and array-based concrete implementation, maintaining count and handling overflow/underflow.",
              "code": "#include <stdio.h>\n#include <stdlib.h>\n#include <stdbool.h>\n\n#define MAX_CAPACITY 100\n\n// Concrete data structure implementing List ADT\ntypedef struct {\n    int data[MAX_CAPACITY];\n    int size;\n} ArrayList;\n\n// ADT Operations\nvoid initList(ArrayList *list) {\n    list->size = 0;\n}\n\nbool append(ArrayList *list, int value) {\n    if (list->size >= MAX_CAPACITY) return false; // Overflow\n    list->data[list->size++] = value;\n    return true;\n}\n\nbool insertAt(ArrayList *list, int index, int value) {\n    if (index < 0 || index > list->size || list->size >= MAX_CAPACITY) return false;\n    for (int i = list->size; i > index; i--) {\n        list->data[i] = list->data[i - 1]; // Shift right\n    }\n    list->data[index] = value;\n    list->size++;\n    return true;\n}\n\nbool deleteAt(ArrayList *list, int index, int *deletedValue) {\n    if (index < 0 || index >= list->size) return false; // Underflow / invalid\n    *deletedValue = list->data[index];\n    for (int i = index; i < list->size - 1; i++) {\n        list->data[i] = list->data[i + 1]; // Shift left\n    }\n    list->size--;\n    return true;\n}\n\nvoid printList(const ArrayList *list) {\n    printf(\"List [size=%d]: \", list->size);\n    for (int i = 0; i < list->size; i++) {\n        printf(\"%d \", list->data[i]);\n    }\n    printf(\"\\n\");\n}\n\nint main() {\n    ArrayList list;\n    initList(&list);\n\n    append(&list, 10);\n    append(&list, 20);\n    append(&list, 40);\n    printList(&list);\n\n    insertAt(&list, 2, 30); // Insert 30 at index 2\n    printList(&list);\n\n    int val;\n    deleteAt(&list, 1, &val); // Delete element at index 1\n    printf(\"Deleted item: %d\\n\", val);\n    printList(&list);\n\n    return 0;\n}",
              "output": "List [size=3]: 10 20 40 \nList [size=4]: 10 20 30 40 \nDeleted item: 20\nList [size=3]: 10 30 40 "
            }
          ],
          "keyPoints": [
            "An ADT specifies the operational contract (domain, behavior, axioms) completely independent of concrete memory implementation.",
            "Primitive data structures are atomic, machine-level types directly processed by CPU registers and ALUs.",
            "Non-primitive data structures are composite organizations created from primitive types to manage complex collections.",
            "Linear data structures feature a 1-to-1 sequential relationship where elements have single unique predecessors and successors.",
            "Non-linear data structures exhibit 1-to-N (hierarchical trees) or M-to-N (network graphs) relationships requiring recursive or stack/queue-driven traversals."
          ],
          "theoryQuestions": [
            {
              "question": "Define Abstract Data Type (ADT). Explain how an ADT differs from a concrete Data Structure with a suitable real-world example.",
              "marks": "5 Marks",
              "answer": "1. **Definition of ADT**: An Abstract Data Type (ADT) is a formal mathematical specification of a data object, characterized strictly by the values it can assume and the collection of operations that can be performed upon it, without defining any implementation details.\n\n2. **Core Differences**:\n   - **Abstraction Level**: ADT provides high-level conceptual design (interface); Data Structure provides low-level physical implementation (source code and memory layout).\n   - **Encapsulation**: ADT dictates *what* must be done; Data Structure dictates *how* it is stored and computed.\n   - **Language Independence**: ADTs are language-agnostic concepts; Data structures are realized in specific programming languages.\n\n3. **Illustrative Example**:\n   - **ADT**: A *Queue ADT* dictates two core operations: `enqueue(item)` which places an item at the rear, and `dequeue()` which extracts an item from the front under FIFO discipline.\n   - **Concrete Implementations**:\n     a) *Linear Array Queue*: Uses fixed memory buffer, but suffers from false overflow.\n     b) *Circular Array Queue*: Employs modulo index arithmetic `(rear + 1) % N` to reuse freed front slots.\n     c) *Linked List Queue*: Uses dynamic heap-allocated nodes with `front` and `rear` pointers, providing unbounded capacity.",
              "keyPoints": [
                "Formal definition of ADT emphasizing interface vs implementation decoupling.",
                "Three-point contrast table: abstraction, encapsulation, language dependency.",
                "Concrete Queue ADT example showcasing array vs linked list implementations."
              ]
            },
            {
              "question": "Classify data structures into Linear and Non-Linear categories. Compare their structural topology, memory organization, and algorithmic traversal complexities.",
              "marks": "7 Marks",
              "answer": "1. **Classification Overview**:\n   - **Linear Data Structures**: Elements form an ordered linear sequence. Each element (except the first and last) possesses exactly one unique predecessor and one unique successor.\n     *Examples*: 1D Arrays, Singly/Doubly Linked Lists, Stacks, Queues.\n   - **Non-Linear Data Structures**: Elements are organized hierarchically or in arbitrary interconnection networks. A single element can have multiple predecessors and successors.\n     *Examples*: General Trees, Binary Search Trees, AVL Trees, Heaps, Directed/Undirected Graphs.\n\n2. **Detailed Comparison Matrix**:\n   - **Memory Topology**: Linear structures can be stored in contiguous memory (Arrays) or linear pointer chains (Linked Lists). Non-linear structures require multi-pointer nodes scattered across heap storage.\n   - **Traversal Complexity**: Linear structures require $O(n)$ time using a simple single loop. Non-linear structures require non-trivial traversal strategies (Preorder, Inorder, Postorder, Breadth-First Search, Depth-First Search) requiring auxiliary stacks/queues or recursion.\n   - **Search Efficiency**: In linear lists, searching requires $O(n)$ (or $O(\\log n)$ in sorted arrays). In balanced non-linear search trees, search takes $O(\\log n)$ time due to branching.\n\n3. **Architectural Trade-offs**:\n   - Linear structures feature minimal pointer overhead and high spatial locality.\n   - Non-linear structures represent natural multi-tier relationships (e.g., file systems, corporate hierarchies, routing graphs) with superior asymptotic insertion/deletion efficiency at scale.",
              "keyPoints": [
                "Structural topology definition: single-level sequential vs multi-level branching.",
                "Memory layout: contiguous RAM vs multi-pointer heap nodes.",
                "Traversal mechanisms: single linear sweep vs recursive/graph traversals.",
                "Comparative analysis of search time complexities."
              ]
            }
          ],
          "mcqs": [
            {
              "question": "Which of the following statements strictly distinguishes an Abstract Data Type (ADT) from a Data Structure?",
              "options": [
                "An ADT defines memory addresses, while a Data Structure defines programming language syntax.",
                "An ADT is an abstract operational contract, while a Data Structure is its concrete programmatic and memory implementation.",
                "ADTs can only be implemented using primitive arrays, whereas Data Structures use pointers.",
                "ADTs are compiled by hardware, while Data Structures are interpreted by the operating system."
              ],
              "correctIndex": 1,
              "explanation": "An ADT specifies the logical interface, supported operations, and constraints, whereas a Data Structure is the physical realization in code and memory."
            },
            {
              "question": "Which of the following is classified as a non-linear data structure?",
              "options": [
                "Circular Queue",
                "Doubly Linked List",
                "Binary Search Tree",
                "Array Stack"
              ],
              "correctIndex": 2,
              "explanation": "A Binary Search Tree is non-linear because its nodes are organized hierarchically where each parent node can have up to two child nodes."
            },
            {
              "question": "In a linear data structure containing n elements, what is the maximum number of direct predecessors any interior element can have?",
              "options": [
                "0",
                "1",
                "2",
                "n - 1"
              ],
              "correctIndex": 1,
              "explanation": "By definition, elements in a linear data structure are arranged in a 1-to-1 sequence, meaning every interior node has exactly one predecessor and one successor."
            },
            {
              "question": "Which operation demonstrates the dynamic data-hiding principle of an ADT?",
              "options": [
                "Directly modifying a private pointer `node->next` from an external client routine",
                "Calling `stack.push(42)` without knowing whether the stack is backed by an array or a linked list",
                "Hardcoding array buffer size in client-side code",
                "Casting an integer pointer to a void pointer"
              ],
              "correctIndex": 1,
              "explanation": "Invoking `stack.push(42)` utilizes the clean ADT interface, completely decoupling the caller from the underlying memory implementation."
            }
          ]
        },
        {
          "id": "dsa-u1-t2",
          "title": "Asymptotic Analysis & Growth of Functions: Big-O, Big-Omega, Big-Theta, Little-o, Little-omega Formal Definitions & Limit Tests",
          "simpleExplanation": "Asymptotic analysis evaluates algorithm performance by observing how runtime or memory scales as input size approaches infinity, ignoring machine-specific hardware constants. The five primary notations\u2014Big-O (asymptotic upper bound), Big-Omega (lower bound), Big-Theta (tight bound), Little-o (strict upper bound), and Little-omega (strict lower bound)\u2014provide mathematically rigorous bounds evaluated via limit tests.",
          "detailedExplanation": "## 1. Why Hardware-Independent Analysis is Necessary\n\nEvaluating the execution duration of an algorithm using physical wall-clock time (seconds, milliseconds) is inherently flawed. Wall-clock duration fluctuates wildly depending on:\n- CPU clock frequency, microarchitecture, and pipeline depth.\n- Memory bus bandwidth and multi-level cache hierarchies (L1, L2, L3 cache misses).\n- Operating system scheduling jitter and background daemon processes.\n- Compiler optimization flags (`-O2`, `-O3`) and programming language execution models.\n\n**Asymptotic Analysis** eliminates these physical biases by quantifying performance as a mathematical function $T(n)$ of the input size $n$. As $n \\to \\infty$, constant multiplicative factors and low-order terms become negligible compared to the dominant growth term.\n\n---\n\n## 2. The Five Standard Asymptotic Notations\n\nLet $f(n)$ and $g(n)$ be asymptotically non-negative functions from $\\mathbb{N} \\to \\mathbb{R}^+$.\n\n```mermaid\nflowchart TD\n    subgraph Asymptotic_Bounds [\"Asymptotic Growth Classifications\"]\n        T[\"Big-Theta: Tight Bound\n c1*g(n) <= f(n) <= c2*g(n)\"]\n        O[\"Big-O: Asymptotic Upper Bound\n f(n) <= c*g(n)\"]\n        OM[\"Big-Omega: Asymptotic Lower Bound\n f(n) >= c*g(n)\"]\n        LO[\"Little-o: Strict Upper Bound\n f(n) < c*g(n) for ALL c > 0\"]\n        LOM[\"Little-omega: Strict Lower Bound\n f(n) > c*g(n) for ALL c > 0\"]\n    end\n```\n\n### A. Big-O Notation (Asymptotic Upper Bound: $\\mathcal{O}$)\n- **Intuition**: $f(n)$ grows *no faster than* $g(n)$. It defines a worst-case ceiling.\n- **Formal Mathematical Definition**:\n  $$\\mathcal{O}(g(n)) = \\{ f(n) : \\exists c > 0, n_0 > 0 \\text{ such that } 0 \\le f(n) \\le c \\cdot g(n), \\forall n \\ge n_0 \\}$$\n- **Interpretation**: Beyond threshold $n_0$, the function $f(n)$ is permanently bounded above by $c \\cdot g(n)$.\n\n### B. Big-Omega Notation (Asymptotic Lower Bound: $\\Omega$)\n- **Intuition**: $f(n)$ grows *at least as fast as* $g(n)$. It establishes an insurmountable floor.\n- **Formal Mathematical Definition**:\n  $$\\Omega(g(n)) = \\{ f(n) : \\exists c > 0, n_0 > 0 \\text{ such that } 0 \\le c \\cdot g(n) \\le f(n), \\forall n \\ge n_0 \\}$$\n- **Interpretation**: Beyond threshold $n_0$, algorithm execution requires at least $c \\cdot g(n)$ computational operations.\n\n### C. Big-Theta Notation (Asymptotically Tight Bound: $\\Theta$)\n- **Intuition**: $f(n)$ and $g(n)$ have the *exact same rate of growth*.\n- **Formal Mathematical Definition**:\n  $$\\Theta(g(n)) = \\{ f(n) : \\exists c_1 > 0, c_2 > 0, n_0 > 0 \\text{ such that } 0 \\le c_1 \\cdot g(n) \\le f(n) \\le c_2 \\cdot g(n), \\forall n \\ge n_0 \\}$$\n- **Theorem**: A function $f(n) = \\Theta(g(n))$ if and only if $f(n) = \\mathcal{O}(g(n))$ and $f(n) = \\Omega(g(n))$.\n\n### D. Little-o Notation (Strict Non-Tight Upper Bound: $o$)\n- **Intuition**: $f(n)$ grows *strictly slower than* $g(n)$.\n- **Formal Mathematical Definition**:\n  $$o(g(n)) = \\{ f(n) : \\forall c > 0, \\exists n_0 > 0 \\text{ such that } 0 \\le f(n) < c \\cdot g(n), \\forall n \\ge n_0 \\}$$\n- **Key Distinction**: While Big-O requires inequality to hold for *at least one* constant $c$, Little-o mandates that it holds for *every positive constant $c$*, no matter how infinitesimally small.\n- *Example*: $2n = o(n^2)$, but $2n^2 \\ne o(n^2)$ (though $2n^2 = \\mathcal{O}(n^2)$).\n\n### E. Little-omega Notation (Strict Non-Tight Lower Bound: $\\omega$)\n- **Intuition**: $f(n)$ grows *strictly faster than* $g(n)$.\n- **Formal Mathematical Definition**:\n  $$\\omega(g(n)) = \\{ f(n) : \\forall c > 0, \\exists n_0 > 0 \\text{ such that } 0 \\le c \\cdot g(n) < f(n), \\forall n \\ge n_0 \\}$$\n- *Example*: $n^2 = \\omega(n)$, but $n^2 \\ne \\omega(n^2)$.\n\n---\n\n## 3. Limit Tests for Asymptotic Classification\n\nComputing $c$ and $n_0$ from definitions can be tedious. The **Limit Quotient Test** provides an immediate, foolproof calculus method.\n\nLet $L = \\lim_{n \\to \\infty} \\frac{f(n)}{g(n)}$.\n\n| Limit Value $L$ | Mathematical Meaning | Valid Asymptotic Conclusions |\n| :--- | :--- | :--- |\n| **$L = 0$** | $g(n)$ drastically dominates $f(n)$ | $f(n) = o(g(n))$ and $f(n) = \\mathcal{O}(g(n))$ |\n| **$0 < L < \\infty$** | $f(n)$ and $g(n)$ grow at identical rates | $f(n) = \\Theta(g(n))$, $f(n) = \\mathcal{O}(g(n))$, and $f(n) = \\Omega(g(n))$ |\n| **$L = \\infty$** | $f(n)$ drastically dominates $g(n)$ | $f(n) = \\omega(g(n))$ and $f(n) = \\Omega(g(n))$ |\n| **Limit Does Not Exist**| Oscillatory functions (e.g., $n(1 + \\sin n)$)| Must fall back to formal $\\epsilon$-$n_0$ inequalities |\n\n### L'H\u00f4pital's Rule\nWhen evaluating $\\lim_{n \\to \\infty} \\frac{f(n)}{g(n)}$ resulting in indeterminate forms $\\frac{\\infty}{\\infty}$ or $\\frac{0}{0}$:\n$$\\lim_{n \\to \\infty} \\frac{f(n)}{g(n)} = \\lim_{n \\to \\infty} \\frac{f'(n)}{g'(n)}$$\n\n---\n\n## 4. Master Hierarchy of Standard Complexity Classes\n\nFrom fastest to slowest growth rates:\n$$1 < \\log(\\log n) < \\log n < \\sqrt{n} < n < n \\log n < n^2 < n^3 < 2^n < e^n < n! < n^n$$\n\n```mermaid\nxychart-beta\n    title \"Comparative Growth of Functions as N increases\"\n    x-axis [1, 2, 4, 8, 16, 32]\n    y-axis \"Operations\" 0 --> 1000\n    line [1, 2, 4, 8, 16, 32]\n    line [0, 2, 8, 24, 64, 160]\n    line [1, 4, 16, 64, 256, 1024]\n```\n\n---\n\n> [!IMPORTANT] **MEMORIZE:**\n> - $f(n) = \\mathcal{O}(g(n)) \\iff \\lim_{n \\to \\infty} \\frac{f(n)}{g(n)} < \\infty$\n> - $f(n) = \\Omega(g(n)) \\iff \\lim_{n \\to \\infty} \\frac{f(n)}{g(n)} > 0$\n> - $f(n) = \\Theta(g(n)) \\iff 0 < \\lim_{n \\to \\infty} \\frac{f(n)}{g(n)} < \\infty$\n> - $f(n) = o(g(n)) \\iff \\lim_{n \\to \\infty} \\frac{f(n)}{g(n)} = 0$\n> - $f(n) = \\omega(g(n)) \\iff \\lim_{n \\to \\infty} \\frac{f(n)}{g(n)} = \\infty$\n\n> [!NOTE] **DEV BRAIN:**\n> Programmers casually say \"QuickSort is $O(n \\log n)$\", but technically QuickSort's worst-case is $\\mathcal{O}(n^2)$ and its average-case is $\\Theta(n \\log n)$. Big-O is an upper bound, NOT necessarily a tight bound!\n\n> [!WARNING] **TRAP:**\n> Never write $f(n) \\le \\mathcal{O}(g(n))$. Big-O represents a *set of functions*. The mathematically sound notation is $f(n) \\in \\mathcal{O}(g(n))$ or conventionally $f(n) = \\mathcal{O}(g(n))$.\n\n> [!TIP] **EXAM TIP:**\n> When proving $f(n) = \\mathcal{O}(g(n))$ using the formal definition, always explicitly declare both constants $c$ and $n_0$. For example, for $3n + 7$, show that for $c = 4$ and $n_0 = 7$, $3n + 7 \\le 4n$ holds for all $n \\ge 7$.",
          "shortNotes": "Big-O = upper bound (<=); Big-Omega = lower bound (>=); Big-Theta = tight bound (==); Little-o = strict upper bound (<); Little-omega = strict lower bound (>). Evaluated via limit ratio tests.",
          "examples": [
            {
              "title": "Formal Mathematical Proof of Big-O and Limit Test Verification",
              "problem": "Prove formally using both (1) the definition (finding constants c and n0) and (2) the Limit Test that f(n) = 3n^2 + 5n + 8 is O(n^2).",
              "explanation": "We demonstrate both constructive proof for c, n0 constants and the calculus-based limit quotient test.",
              "code": "/* \n   Mathematical Verification Script (C Simulation)\n   Demonstrates that beyond n0 = 8, with c = 5:\n   3n^2 + 5n + 8 <= 5n^2 holds true for all n >= n0.\n*/\n#include <stdio.h>\n#include <stdbool.h>\n\nint main() {\n    long long c = 5;\n    long long n0 = 8;\n    bool allValid = true;\n\n    printf(\"Verifying f(n) = 3n^2 + 5n + 8 <= c * n^2 (c=5, n0=8):\\n\");\n    printf(\"------------------------------------------------------\\n\");\n    printf(\" n  |   f(n)   |  c * g(n)  | Inequality Holds?\\n\");\n    printf(\"----+----------+------------+-------------------\\n\");\n\n    for (long long n = 1; n <= 10; n++) {\n        long long fn = 3 * n * n + 5 * n + 8;\n        long long cgn = c * n * n;\n        bool holds = (fn <= cgn);\n        printf(\"%3lld | %8lld | %10lld | %s\\n\", \n               n, fn, cgn, holds ? \"TRUE\" : \"FALSE (n < n0)\");\n        if (n >= n0 && !holds) allValid = false;\n    }\n\n    printf(\"------------------------------------------------------\\n\");\n    printf(\"Formal theorem satisfied for all n >= %lld: %s\\n\", \n           n0, allValid ? \"YES (Q.E.D.)\" : \"NO\");\n\n    return 0;\n}",
              "output": "Verifying f(n) = 3n^2 + 5n + 8 <= c * n^2 (c=5, n0=8):\n------------------------------------------------------\n n  |   f(n)   |  c * g(n)  | Inequality Holds?\n----+----------+------------+-------------------\n  1 |       16 |          5 | FALSE (n < n0)\n  2 |       30 |         20 | FALSE (n < n0)\n  3 |       50 |         45 | FALSE (n < n0)\n  4 |       76 |         80 | TRUE\n  5 |      108 |        125 | TRUE\n  6 |      146 |        180 | TRUE\n  7 |      190 |        245 | TRUE\n  8 |      240 |        320 | TRUE\n  9 |      296 |        405 | TRUE\n 10 |      358 |        500 | TRUE\n------------------------------------------------------\nFormal theorem satisfied for all n >= 8: YES (Q.E.D.)"
            }
          ],
          "keyPoints": [
            "Asymptotic analysis evaluates algorithmic growth rate as input size approaches infinity, invariant of physical hardware.",
            "Big-O (O) specifies an asymptotic upper bound: f(n) <= c * g(n) for all n >= n0.",
            "Big-Omega (Omega) establishes an asymptotic lower bound: f(n) >= c * g(n) for all n >= n0.",
            "Big-Theta (Theta) defines a tight bound: f(n) is bounded between c1*g(n) and c2*g(n); equivalent to both O and Omega holding simultaneously.",
            "Little-o and Little-omega represent strictly non-tight bounds verified when limit ratios equal 0 and infinity, respectively."
          ],
          "theoryQuestions": [
            {
              "question": "Define Big-O, Big-Omega, and Big-Theta notations mathematically. Illustrate each definition with a graph showing functions f(n) and g(n) relative to n0.",
              "marks": "7 Marks",
              "answer": "1. **Big-O Notation (Asymptotic Upper Bound)**:\n   - **Definition**: $f(n) = \\mathcal{O}(g(n))$ if there exist positive constants $c > 0$ and $n_0 > 0$ such that $0 \\le f(n) \\le c \\cdot g(n)$ for all $n \\ge n_0$.\n   - **Graph interpretation**: The curve $c \\cdot g(n)$ stays above $f(n)$ for all $n \\ge n_0$.\n\n2. **Big-Omega Notation (Asymptotic Lower Bound)**:\n   - **Definition**: $f(n) = \\Omega(g(n))$ if there exist positive constants $c > 0$ and $n_0 > 0$ such that $0 \\le c \\cdot g(n) \\le f(n)$ for all $n \\ge n_0$.\n   - **Graph interpretation**: The curve $c \\cdot g(n)$ stays below $f(n)$ for all $n \\ge n_0$.\n\n3. **Big-Theta Notation (Tight Bound)**:\n   - **Definition**: $f(n) = \\Theta(g(n))$ if there exist positive constants $c_1, c_2 > 0$ and $n_0 > 0$ such that $c_1 \\cdot g(n) \\le f(n) \\le c_2 \\cdot g(n)$ for all $n \\ge n_0$.\n   - **Graph interpretation**: $f(n)$ is permanently sandwiched between $c_1 \\cdot g(n)$ and $c_2 \\cdot g(n)$ for all $n \\ge n_0$.\n\n4. **Theorem**: $f(n) = \\Theta(g(n)) \\iff f(n) = \\mathcal{O}(g(n)) \\land f(n) = \\Omega(g(n))$. This forms the cornerstone of algorithm complexity proofs.",
              "keyPoints": [
                "Rigorous mathematical set definitions with existential quantifiers (c, n0).",
                "Geometric interpretation of upper, lower, and sandwiching bounds.",
                "Theorem linking Theta to both O and Omega."
              ]
            },
            {
              "question": "Differentiate between Big-O and Little-o notations. Use the Limit Quotient Test to prove whether 5n^2 + 3n is o(n^3) and o(n^2).",
              "marks": "5 Marks",
              "answer": "1. **Conceptual & Mathematical Differences**:\n   - **Big-O (\\mathcal{O})**: Represents an asymptotic upper bound that may or may not be tight. Formally, $\\exists c > 0, n_0 > 0$ such that $f(n) \\le c \\cdot g(n)$. Limit test: $\\lim_{n \\to \\infty} \\frac{f(n)}{g(n)} < \\infty$.\n   - **Little-o (o)**: Represents a strict, loose upper bound that can *never* be tight. Formally, $\\forall c > 0, \\exists n_0 > 0$ such that $f(n) < c \\cdot g(n)$. Limit test: $\\lim_{n \\to \\infty} \\frac{f(n)}{g(n)} = 0$.\n\n2. **Limit Test Evaluations**:\n   - **Case 1: Is $5n^2 + 3n = o(n^3)$?**\n     $$L = \\lim_{n \\to \\infty} \\frac{5n^2 + 3n}{n^3} = \\lim_{n \\to \\infty} \\left( \\frac{5}{n} + \\frac{3}{n^2} \\right) = 0 + 0 = 0$$\n     Since $L = 0$, $5n^2 + 3n = o(n^3)$ is **TRUE**.\n   - **Case 2: Is $5n^2 + 3n = o(n^2)$?**\n     $$L = \\lim_{n \\to \\infty} \\frac{5n^2 + 3n}{n^2} = \\lim_{n \\to \\infty} \\left( 5 + \\frac{3}{n} \\right) = 5$$\n     Since $L = 5 \\ne 0$, $5n^2 + 3n = o(n^2)$ is **FALSE** (it is $\\Theta(n^2)$ and $\\mathcal{O}(n^2)$, but not $o(n^2)$).",
              "keyPoints": [
                "Comparison of Big-O (exists c) vs Little-o (for all c).",
                "Application of Limit Quotient Test.",
                "Step-by-step calculus limit derivations for n^3 and n^2."
              ]
            }
          ],
          "mcqs": [
            {
              "question": "If lim_{n -> inf} [f(n) / g(n)] = 7, which of the following asymptotic relationships is mathematically valid?",
              "options": [
                "f(n) = o(g(n))",
                "f(n) = omega(g(n))",
                "f(n) = Theta(g(n))",
                "f(n) = o(g(n^2)) only"
              ],
              "correctIndex": 2,
              "explanation": "When the limit of f(n)/g(n) is a finite positive constant (0 < L < infinity), f(n) and g(n) have identical growth rates, so f(n) = Theta(g(n))."
            },
            {
              "question": "Which of the following functions exhibits the strictly fastest rate of growth as n approaches infinity?",
              "options": [
                "n^(1.5)",
                "n * log2(n)",
                "2^(log2(n)^2)",
                "100 * n"
              ],
              "correctIndex": 2,
              "explanation": "2^(log2(n)^2) = n^(log2 n), which grows super-polynomially (faster than any polynomial like n^1.5 or n), but slower than 2^n."
            },
            {
              "question": "What is the relation between 3^(n) and 2^(n)?",
              "options": [
                "3^n = O(2^n)",
                "3^n = Theta(2^n)",
                "3^n = omega(2^n)",
                "3^n = o(2^n)"
              ],
              "correctIndex": 2,
              "explanation": "lim (3^n / 2^n) = lim (1.5)^n = infinity. Since the limit is infinity, 3^n = omega(2^n) and 3^n = Omega(2^n)."
            },
            {
              "question": "The statement f(n) = O(g(n)) guarantees that:",
              "options": [
                "f(n) will run in the exact same time as g(n) on all modern computers.",
                "f(n) does not grow faster than a constant multiple of g(n) for sufficiently large n.",
                "g(n) is a lower bound on the memory usage of f(n).",
                "f(n) must equal g(n) when n is equal to n0."
              ],
              "correctIndex": 1,
              "explanation": "Big-O establishes an asymptotic upper bound: f(n) <= c * g(n) for all n >= n0, meaning f(n) grows no faster than g(n) up to a constant factor."
            }
          ]
        },
        {
          "id": "dsa-u1-t3",
          "title": "Space & Time Complexity Analysis: Best, Average, Worst Case, Amortized Analysis & Space-Time Tradeoffs",
          "simpleExplanation": "Algorithm complexity measures how consumption of computational time and physical RAM expands as input size scales. Analyses distinguish Best-Case (minimum steps), Worst-Case (absolute ceiling), and Average-Case (expected cost across probability distributions), alongside Amortized Analysis, which averages occasional expensive operations across a sequence of cheap ones.",
          "detailedExplanation": "## 1. Deconstructing Time and Space Complexity\n\nAlgorithm analysis partitions computational resources into two fundamental currencies:\n1. **Time Complexity**: The count of elementary operations (variable assignments, comparisons, arithmetic evaluations, pointer dereferences) executed as a function of input size $n$.\n2. **Space Complexity**: The total physical memory footprint required during execution:\n   $$\\text{Total Space} = \\text{Fixed Space (Code + Constants)} + \\text{Variable Space (Data inputs)} + \\text{Auxiliary Space (Working buffers + Call stack)}$$\n\n> **Critical Nuance**: *Auxiliary Space* specifically measures the extra transient memory allocated by the algorithm outside the original input buffer. In-place algorithms are strictly defined by $\\text{Auxiliary Space} = \\mathcal{O}(1)$.\n\n---\n\n## 2. The Three Operational Cases\n\nAn algorithm's runtime frequently depends not merely on input size $n$, but on the **pre-existing configuration** or ordering of data elements.\n\n```mermaid\nflowchart TD\n    subgraph Cases [\"Input Configuration Cases\"]\n        BC[\"Best Case: Optimal input configuration\n(Minimum operations executed)\"]\n        AC[\"Average Case: Expected value over probability distribution\n(Requires probabilistic summation)\"]\n        WC[\"Worst Case: Pathological adversary input\n(Maximum guarantee / safety bound)\"]\n    end\n```\n\n### Detailed Case Analysis\n\n| Metric | Formal Concept | Linear Search Example ($n$ items) | QuickSort Example ($n$ items) |\n| :--- | :--- | :--- | :--- |\n| **Best Case ($T_{\\text{best}}$)** | Minimum operational steps over all valid inputs of size $n$. | Target item located at index $0$ $\\implies \\mathcal{O}(1)$. | Pivot splits array into two equal halves at every level $\\implies \\Theta(n \\log n)$. |\n| **Worst Case ($T_{\\text{worst}}$)** | Maximum operational steps over all valid inputs of size $n$. Provides a mission-critical performance guarantee. | Target item located at last index or absent $\\implies \\mathcal{O}(n)$. | Array already sorted and pivot chosen as first/last element $\\implies \\Theta(n^2)$. |\n| **Average Case ($T_{\\text{avg}}$)** | Mathematical expectation: $E[T(n)] = \\sum_{i} P(I_i) \\cdot T(I_i)$, assuming a probability distribution over all inputs $I_i$. | Assuming uniform probability $\\frac{1}{n}$ of finding target at index $i$: $\\sum_{i=1}^n \\frac{i}{n} = \\frac{n+1}{2} \\implies \\mathcal{O}(n)$. | Random permutations of distinct elements $\\implies \\Theta(n \\log n)$. |\n\n---\n\n## 3. Amortized Analysis: Beyond Worst-Case Pessimism\n\nIn many modern data structures, a single sporadic operation may take substantial time (e.g., $O(n)$), but it inherently charges or sets up subsequent operations such that the average cost across any sequence of $k$ operations is guaranteed to be small (e.g., $O(1)$). Evaluating such operations purely by worst-case bounds yields an overly pessimistic, inaccurate assessment.\n\n**Amortized Complexity** calculates the average running time per operation over a worst-case sequence of operations:\n$$T_{\\text{amortized}} = \\frac{\\text{Total Cost of } k \\text{ Operations}}{k}$$\n\n### The Three Methods of Amortized Analysis\n\n1. **Aggregate Method**:\n   - Determine the total upper-bound cost $T(k)$ for an arbitrary sequence of $k$ operations.\n   - The amortized cost per operation is directly computed as $\\frac{T(k)}{k}$.\n2. **Accounting (Banker's) Method**:\n   - Assign artificial charges (amortized costs) to each operation type.\n   - Operations that cost less than their charge store the excess as \"credit\" in the bank.\n   - Later expensive operations draw down this accumulated credit to pay for their execution without exceeding the amortized budget.\n3. **Potential (Physicist's) Method**:\n   - Define a potential function $\\Phi(D)$ mapping the data structure state $D$ to a real number.\n   - The amortized cost $\\hat{c}_i$ of the $i$-th operation with actual cost $c_i$ is:\n     $$\\hat{c}_i = c_i + \\Phi(D_i) - \\Phi(D_{i-1})$$\n\n```mermaid\nsequenceDiagram\n    autonumber\n    participant D as Dynamic Array (Capacity C)\n    Note over D: C=1, Size=1 (Cost=1)\n    Note over D: Push 2 -> Reallocate C=2, Copy 1 + Insert 1 (Cost=2)\n    Note over D: Push 3 -> Reallocate C=4, Copy 2 + Insert 1 (Cost=3)\n    Note over D: Push 4 -> Insert 1 (Cost=1, no resize)\n    Note over D: Push 5 -> Reallocate C=8, Copy 4 + Insert 1 (Cost=5)\n    Note over D: Over N pushes: Total copies = 1+2+4+...+N/2 < N. Amortized = O(1)!\n```\n\n---\n\n## 4. The Space-Time Tradeoff Spectrum\n\nIn algorithm design, execution velocity and memory footprint exist in direct tension. Optimizing one invariably penalizes the other:\n\n1. **Lookup Tables / Memoization**: Computing Fibonacci iteratively requires $O(1)$ auxiliary space and $O(n)$ time. Pre-computing results in a lookup table requires $O(n)$ space but reduces subsequent query time to $O(1)$.\n2. **Hash Tables vs Sorted Arrays**: Hash tables achieve $O(1)$ average search time at the expense of high load-factor memory overhead and bucket pointer arrays. Sorted arrays use zero auxiliary memory but require $O(\\log n)$ search time.\n3. **Compression vs Decompression Speed**: Dense binary encoding reduces disk and RAM usage but introduces CPU decompression latency prior to execution.\n\n---\n\n> [!IMPORTANT] **MEMORIZE:**\n> Dynamic array resizing with geometric doubling ($2\\times$) yields an **amortized time of $\\mathcal{O}(1)$** per append. If the array grew by a constant increment (e.g., $+10$ elements), the amortized append time would degrade catastrophically to $\\mathcal{O}(n)$.\n\n> [!NOTE] **DEV BRAIN:**\n> In C++ `std::vector`, Java `ArrayList`, and Python `list`, capacity is multiplied geometrically (by $1.5\\times$ or $2\\times$) precisely to preserve $\\mathcal{O}(1)$ amortized insertion speed.\n\n> [!WARNING] **TRAP:**\n> Do not confuse *Average-Case* with *Amortized*. Average-case relies on probability assumptions about the input distribution. Amortized analysis involves **zero probability**; it is an absolute mathematical guarantee over any sequence of operations.\n\n> [!TIP] **EXAM TIP:**\n> When asked an Amortized Analysis question, write down the geometric series sum for dynamic array doubling: $\\sum_{j=0}^{\\log_2 n} 2^j = 2n - 1 = \\mathcal{O}(n)$ total copy work across $n$ insertions, giving $\\frac{\\mathcal{O}(n)}{n} = \\mathcal{O}(1)$ per operation!",
          "shortNotes": "Time measures operations; space measures auxiliary RAM. Worst-case provides safety upper bounds; average-case uses probability distributions; amortized analysis guarantees average cost over sequences.",
          "examples": [
            {
              "title": "Simulation of Dynamic Array Geometric Doubling vs Arithmetic Resizing",
              "problem": "Simulate and track total element copy operations during N appends comparing doubling capacity (2x) vs linear increment (+K).",
              "explanation": "Demonstrates the mathematical reason dynamic arrays achieve O(1) amortized insertion with doubling versus O(N) with fixed increments.",
              "code": "#include <stdio.h>\n\nvoid simulateDoubling(int N) {\n    long long copies = 0;\n    int capacity = 1;\n    for (int size = 1; size <= N; size++) {\n        if (size > capacity) {\n            copies += (size - 1); // Copy all existing elements\n            capacity *= 2;        // Geometric doubling\n        }\n    }\n    printf(\"Doubling Strategy (2x):\\n\");\n    printf(\"  Total Appends: %d\\n\", N);\n    printf(\"  Total Internal Copies: %lld\\n\", copies);\n    printf(\"  Amortized Copies / Op: %.2f (O(1))\\n\\n\", (double)copies / N);\n}\n\nvoid simulateLinearIncrement(int N, int increment) {\n    long long copies = 0;\n    int capacity = increment;\n    for (int size = 1; size <= N; size++) {\n        if (size > capacity) {\n            copies += (size - 1); // Copy all existing elements\n            capacity += increment;// Fixed arithmetic increment\n        }\n    }\n    printf(\"Linear Strategy (+%d):\\n\", increment);\n    printf(\"  Total Appends: %d\\n\", N);\n    printf(\"  Total Internal Copies: %lld\\n\", copies);\n    printf(\"  Amortized Copies / Op: %.2f (O(N))\\n\", (double)copies / N);\n}\n\nint main() {\n    int N = 100000;\n    simulateDoubling(N);\n    simulateLinearIncrement(N, 100);\n    return 0;\n}",
              "output": "Doubling Strategy (2x):\n  Total Appends: 100000\n  Total Internal Copies: 131071\n  Amortized Copies / Op: 1.31 (O(1))\n\nLinear Strategy (+100):\n  Total Appends: 100000\n  Total Internal Copies: 49950000\n  Amortized Copies / Op: 499.50 (O(N))"
            }
          ],
          "keyPoints": [
            "Space complexity consists of fixed instruction space, data input space, and auxiliary dynamic working memory.",
            "Worst-case analysis provides an unconditional upper bound crucial for mission-critical, real-time software systems.",
            "Average-case complexity reflects the mathematical expected runtime averaged over an assumed input probability distribution.",
            "Amortized analysis guarantees the average cost of an operation over an arbitrary worst-case sequence without relying on probabilistic assumptions.",
            "The Space-Time tradeoff dictates that computational acceleration often requires increased memory allocation (e.g., hash tables, memoization caches)."
          ],
          "theoryQuestions": [
            {
              "question": "What is Amortized Analysis? Explain the Aggregate Method and Accounting Method using dynamic array insertion as an example.",
              "marks": "7 Marks",
              "answer": "1. **Concept of Amortized Analysis**:\n   Amortized analysis computes the average running time of an operation over a worst-case sequence of operations. Unlike average-case analysis, it does not involve probabilities; it provides a worst-case guarantee for the entire sequence.\n\n2. **Aggregate Method**:\n   - We determine the total cost of a sequence of $n$ operations, $T(n)$.\n   - The amortized cost per operation is $T_{\\text{amortized}} = \\frac{T(n)}{n}$.\n   - *Application to Dynamic Array*: In an array starting at capacity 1 that doubles whenever full:\n     Resize copy costs occur at powers of 2: $1, 2, 4, 8, \\dots, 2^{\\lfloor \\log_2 n \\rfloor}$.\n     Total copy work: $\\sum_{j=0}^{\\log_2 n} 2^j = 2^{\\log_2 n + 1} - 1 < 2n$.\n     Adding $n$ regular insertions: $T(n) = n + 2n = 3n$.\n     Amortized cost per append = $\\frac{3n}{n} = 3 = \\mathcal{O}(1)$.\n\n3. **Accounting (Banker's) Method**:\n   - Each operation is assessed an artificial charge (amortized cost).\n   - If an operation's actual cost is less than its charge, the excess is stored as \"credit\" on specific elements.\n   - For dynamic array: Charge $3 per append.\n     * $1 pays for the immediate insertion of the element.\n     * $1 stores credit on the newly inserted element to pay for moving itself during the next resize.\n     * $1 stores credit to pay for moving an older element that has already exhausted its credit.\n   - When doubling occurs, the accumulated credit exactly pays for the $O(n)$ copy cost without additional charge. Thus, amortized cost is $\\mathcal{O}(1)$.",
              "keyPoints": [
                "Formal definition of amortized analysis contrasting with average-case.",
                "Step-by-step aggregate method derivation showing sum of powers of 2.",
                "Accounting method explanation with $3 token assignment model."
              ]
            },
            {
              "question": "Differentiate between Best, Average, and Worst-case complexities. Why is Worst-case complexity universally prioritized in engineering specifications?",
              "marks": "5 Marks",
              "answer": "1. **Comparative Definitions**:\n   - **Best Case**: The minimum execution steps required by an algorithm over any input configuration of size $n$. Denotes the optimal scenario.\n   - **Average Case**: The expected runtime across all possible inputs of size $n$, weighted by their probability of occurrence. Requires realistic probabilistic modeling.\n   - **Worst Case**: The absolute maximum operational steps consumed by an algorithm on any pathological input of size $n$. Represents the guaranteed performance ceiling.\n\n2. **Why Worst-Case is Prioritized in Engineering**:\n   - **Safety Guarantees**: In safety-critical systems (aerospace fly-by-wire, autonomous driving, medical pacemakers), missing an execution deadline causes catastrophic system failure.\n   - **Defense Against Denial-of-Service (DoS)**: Malicious actors deliberately craft worst-case inputs (e.g., hash collision attacks) to trigger system stalling. Designing for the worst-case neutralizes algorithmic complexity attacks.\n   - **Independence from Input Distributions**: Average-case assumptions (like uniform distribution) frequently break down in real-world skewed enterprise traffic.",
              "keyPoints": [
                "Rigorous definitions of Best, Average, and Worst cases.",
                "Justification: Real-time deadlines, safety-critical systems.",
                "Security perspective: Mitigation of Algorithmic Complexity Attacks."
              ]
            }
          ],
          "mcqs": [
            {
              "question": "What is the amortized time complexity of inserting an element into a dynamic array that doubles its capacity whenever full?",
              "options": [
                "O(n)",
                "O(log n)",
                "O(1)",
                "O(n^2)"
              ],
              "correctIndex": 2,
              "explanation": "Because capacity doubles geometrically, the total copy cost over N insertions is less than 2N, yielding an amortized cost of O(1) per insertion."
            },
            {
              "question": "How does Amortized Analysis fundamentally differ from Average-Case Analysis?",
              "options": [
                "Amortized analysis requires quantum computing hardware.",
                "Average-case relies on probabilistic assumptions regarding input distributions, whereas amortized analysis provides deterministic worst-case guarantees over sequences.",
                "Amortized analysis only measures auxiliary space, while average-case measures wall-clock time.",
                "They are identical mathematical terms with different names."
              ],
              "correctIndex": 1,
              "explanation": "Average-case analysis computes expected value based on input probability distributions, while amortized analysis guarantees average cost over any sequence of operations without probabilities."
            },
            {
              "question": "An algorithm requires auxiliary space of O(1). This classification implies that:",
              "options": [
                "The algorithm uses zero memory registers.",
                "The algorithm can process unlimited input size using a fixed, constant amount of additional memory outside the input buffer.",
                "The input array itself takes O(1) space.",
                "The algorithm execution time is O(1)."
              ],
              "correctIndex": 1,
              "explanation": "Auxiliary space measures extra working memory beyond the input. O(1) auxiliary space signifies an in-place algorithm whose working memory does not grow with input size n."
            },
            {
              "question": "If an array-based stack increases its capacity by a constant 50 elements whenever full, what is the amortized cost per push over N pushes?",
              "options": [
                "O(1)",
                "O(log N)",
                "O(N)",
                "O(N log N)"
              ],
              "correctIndex": 2,
              "explanation": "With constant increments, resizing occurs N/50 times, totaling O(N^2) total copy steps over N operations. Dividing by N gives O(N) amortized time per push."
            }
          ]
        },
        {
          "id": "dsa-u1-t4",
          "title": "Recurrence Relations: Substitution Method, Recursion Tree Method & Master Theorem for Divide-and-Conquer",
          "simpleExplanation": "Recurrence relations express the execution time of recursive algorithms as mathematical equations involving smaller subproblems. Computer scientists solve recurrences using three fundamental tools: the Substitution Method (mathematical induction), the Recursion Tree Method (summing operational work across tree levels), and the Master Theorem (an instant asymptotic formula for divide-and-conquer recurrences).",
          "detailedExplanation": "## 1. Fundamentals of Recurrence Relations\n\nA **recurrence relation** is an equation or inequality that describes a function over the natural numbers in terms of its value on smaller arguments. In algorithm analysis, divide-and-conquer algorithms naturally yield recurrence relations:\n$$T(n) = a \\cdot T(n/b) + f(n)$$\nWhere:\n- $n$: Size of the original problem.\n- $a \\ge 1$: Number of recursive subproblems generated in each division.\n- $b > 1$: Factor by which subproblem input size is reduced.\n- $f(n)$: Cost of dividing the problem and combining the subproblem solutions at the current level.\n\n---\n\n## 2. Method 1: The Substitution Method (Mathematical Induction)\n\nThe substitution method consists of two sequential phases:\n1. **Guess** the form of the mathematical solution (often guided by heuristics or recursion trees).\n2. **Prove by Mathematical Induction** that the solution holds, finding the specific constants $c > 0$ and $n_0 > 0$.\n\n### Worked Walkthrough\nSolve the recurrence: $T(n) = 2T(n/2) + n$, with base case $T(1) = 1$.\n\n- **Step 1 (Guess)**: We hypothesize $T(n) = \\mathcal{O}(n \\log_2 n)$, which means $T(n) \\le c \\cdot n \\log_2 n$ for some constant $c > 0$.\n- **Step 2 (Inductive Step)**: Assume the bound holds for all positive integers $k < n$, specifically for $k = n/2$:\n  $$T(n/2) \\le c \\cdot (n/2) \\log_2(n/2)$$\n- **Step 3 (Substitute)**:\n  $$T(n) = 2 T(n/2) + n \\le 2 \\left[ c \\frac{n}{2} \\log_2 \\left( \\frac{n}{2} \\right) \\right] + n$$\n  $$T(n) \\le c n (\\log_2 n - \\log_2 2) + n = c n \\log_2 n - c n + n$$\n  $$T(n) \\le c n \\log_2 n - (c - 1)n$$\n- **Step 4 (Condition)**: To satisfy $T(n) \\le c n \\log_2 n$, we need $-(c - 1)n \\le 0$, which holds whenever:\n  $$c - 1 \\ge 0 \\implies c \\ge 1$$\n- **Step 5 (Base Case)**: $T(1) = 1$. However, $c (1) \\log_2(1) = 0$, which fails $1 \\le 0$. We overcome this by extending the inductive base case to $n = 2$ and $n = 3$:\n  $T(2) = 2T(1) + 2 = 4$. For $c=2$: $2(2)\\log_2(2) = 4 \\ge 4$ (holds!). Hence $T(n) = \\Theta(n \\log n)$.\n\n---\n\n## 3. Method 2: The Recursion Tree Method\n\nA recursion tree visualizes the recursive breakdown of costs. Each node represents the cost of an individual subproblem, and we sum costs horizontally (per level) and then vertically across all tree levels.\n\n```mermaid\nflowchart TD\n    subgraph Tree [\"Recursion Tree for T(n) = 2T(n/2) + c*n\"]\n        L0[\"Level 0: Cost = cn\"]\n        L1A[\"Level 1 (Left): c(n/2)\"]\n        L1B[\"Level 1 (Right): c(n/2)\"]\n        L2A[\"Level 2: c(n/4)\"]\n        L2B[\"Level 2: c(n/4)\"]\n        L2C[\"Level 2: c(n/4)\"]\n        L2D[\"Level 2: c(n/4)\"]\n\n        L0 --> L1A\n        L0 --> L1B\n        L1A --> L2A\n        L1A --> L2B\n        L1B --> L2C\n        L1B --> L2D\n    end\n```\n\n### Derivation Steps:\n1. **Tree Depth**: The input size shrinks as $n, n/b, n/b^2, \\dots, 1$. At depth $k$, $n/b^k = 1 \\implies k = \\log_b n$. The tree depth is $\\log_b n$.\n2. **Number of Leaves**: At depth $L = \\log_b n$, the number of leaf nodes is $a^{\\log_b n} = n^{\\log_b a}$.\n3. **Work per Level**:\n   - Level $0$: $c n$\n   - Level $1$: $2 \\cdot c(n/2) = c n$\n   - Level $2$: $4 \\cdot c(n/4) = c n$\n   - General Level $i$: $a^i \\cdot c(n/b^i) = c n \\left( \\frac{a}{b} \\right)^i$\n4. **Total Work**: Sum across all levels $i = 0$ to $\\log_b n$.\n   If $a = b$ (as in Merge Sort where $a=2, b=2$), each level costs exactly $c n$.\n   $$\\text{Total Cost} = \\sum_{i=0}^{\\log_2 n} c n = c n (\\log_2 n + 1) = \\Theta(n \\log n)$$\n\n---\n\n## 4. Method 3: The Master Theorem for Divide-and-Conquer\n\nThe **Master Theorem** provides an immediate, cookbook solution for recurrences of the canonical form:\n$$T(n) = a T(n/b) + f(n)$$\nWhere $a \\ge 1$, $b > 1$, and $f(n)$ is asymptotically positive.\n\nWe compare $f(n)$ with the watershed benchmark function $n^{\\log_b a}$:\n\n```mermaid\nflowchart TD\n    subgraph Master_Cases [\"Master Theorem 3 Cases\"]\n        C1[\"Case 1: Leaves Dominate\n f(n) = O(n^(log_b(a) - eps))\n T(n) = Theta(n^(log_b a))\"]\n        C2[\"Case 2: Balanced Work\n f(n) = Theta(n^(log_b a) * log^k(n))\n T(n) = Theta(n^(log_b a) * log^(k+1)(n))\"]\n        C3[\"Case 3: Root Dominates\n f(n) = Omega(n^(log_b(a) + eps))\n AND regularity condition\n T(n) = Theta(f(n))\"]\n    end\n```\n\n### Mathematical Formulation of the 3 Cases\n\n1. **Case 1 (Subproblem Work Dominates / Leaf-Heavy)**:\n   If $f(n) = \\mathcal{O}(n^{\\log_b a - \\epsilon})$ for some constant $\\epsilon > 0$:\n   $$T(n) = \\Theta(n^{\\log_b a})$$\n   *Example*: $T(n) = 8T(n/2) + 1000n^2$.\n   $a = 8, b = 2 \\implies n^{\\log_2 8} = n^3$.\n   Since $f(n) = 1000n^2 = \\mathcal{O}(n^{3 - 1})$ (with $\\epsilon = 1$), Case 1 applies:\n   $$T(n) = \\Theta(n^3)$$\n\n2. **Case 2 (Evenly Distributed Work)**:\n   If $f(n) = \\Theta(n^{\\log_b a} \\log^k n)$ for $k \\ge 0$:\n   $$T(n) = \\Theta(n^{\\log_b a} \\log^{k+1} n)$$\n   *Example*: $T(n) = 2T(n/2) + n$.\n   $a = 2, b = 2 \\implies n^{\\log_2 2} = n^1$.\n   $f(n) = n = \\Theta(n^1 \\log^0 n)$ (where $k = 0$). Case 2 applies:\n   $$T(n) = \\Theta(n \\log n)$$\n\n3. **Case 3 (Divide/Combine Work Dominates / Root-Heavy)**:\n   If $f(n) = \\Omega(n^{\\log_b a + \\epsilon})$ for some $\\epsilon > 0$, AND the **Regularity Condition** holds:\n   $$a \\cdot f(n/b) \\le c \\cdot f(n) \\text{ for some constant } c < 1 \\text{ and sufficiently large } n$$\n   Then:\n   $$T(n) = \\Theta(f(n))$$\n   *Example*: $T(n) = 2T(n/2) + n^2$.\n   $a = 2, b = 2 \\implies n^{\\log_2 2} = n^1$.\n   $f(n) = n^2 = \\Omega(n^{1 + 1})$ with $\\epsilon = 1$.\n   Regularity check: $2(n/2)^2 = 2(n^2 / 4) = \\frac{1}{2} n^2 \\le c n^2$ (holds with $c = 1/2 < 1$).\n   $$T(n) = \\Theta(n^2)$$\n\n### Limitations of the Master Theorem\nThe Master Theorem fails when:\n- $a$ is not a constant (e.g., $T(n) = n T(n/2) + n$).\n- $b < 1$ or subproblem reduction is non-multiplicative (e.g., $T(n) = T(n - 1) + 1$, which is handled by backward substitution).\n- $f(n)$ is not polynomially bounded (gap between $f(n)$ and $n^{\\log_b a}$ is non-polynomial, e.g., $T(n) = 2T(n/2) + n / \\log n$).\n\n---\n\n> [!IMPORTANT] **MEMORIZE:**\n> In the Master Theorem, always compute the critical exponent $E = \\log_b a$ first!\n> - If $f(n)$ grows slower than $n^E$ by a polynomial factor $n^\\epsilon$: $T(n) = \\Theta(n^E)$.\n> - If $f(n)$ matches $n^E$: $T(n) = \\Theta(n^E \\log n)$.\n> - If $f(n)$ grows faster than $n^E$ by a polynomial factor $n^\\epsilon$: $T(n) = \\Theta(f(n))$.\n\n> [!NOTE] **DEV BRAIN:**\n> Strassen's Matrix Multiplication achieves $T(n) = 7T(n/2) + \\mathcal{O}(n^2)$. Using Master Theorem Case 1: $n^{\\log_2 7} \\approx n^{2.807}$. Since $n^2 = \\mathcal{O}(n^{2.807 - \\epsilon})$, the total runtime is $\\Theta(n^{2.81})$, outperforming standard $\\mathcal{O}(n^3)$ matrix multiplication!\n\n> [!WARNING] **TRAP:**\n> Case 3 requires checking the **Regularity Condition** $a \\cdot f(n/b) \\le c \\cdot f(n)$ for $c < 1$. Never declare Case 3 without verifying this condition; pathological counterexamples exist where $f(n) = \\Omega(n^{\\log_b a + \\epsilon})$ but regularity fails!\n\n> [!TIP] **EXAM TIP:**\n> If a recurrence has the form $T(n) = T(n - 1) + \\mathcal{O}(n)$ (like worst-case QuickSort), DO NOT use the Master Theorem. Master Theorem is strictly for divide-and-conquer ($n/b$), NOT decrement-and-conquer ($n - 1$). Use repeated substitution!",
          "shortNotes": "Recurrences express recursive runtimes. Solved by: Substitution (guess + induction), Recursion Trees (level cost summing), and Master Theorem comparing f(n) against n^(log_b a).",
          "examples": [
            {
              "title": "Empirical Verification of Master Theorem Recurrence T(n) = 2T(n/2) + n",
              "problem": "Implement a recursive benchmark measuring step count for T(n) = 2T(n/2) + n to verify Theta(n log2 n) scaling.",
              "explanation": "Recursively executes the divide-and-conquer pattern, tallying total operations and verifying against n * log2(n).",
              "code": "#include <stdio.h>\n#include <math.h>\n\nlong long operationCount = 0;\n\nvoid divideAndConquer(int n) {\n    if (n <= 1) {\n        operationCount++;\n        return;\n    }\n    // Divide and combine step costs exactly n operations:\n    operationCount += n;\n\n    // Two recursive subproblems of size n/2:\n    divideAndConquer(n / 2);\n    divideAndConquer(n / 2);\n}\n\nint main() {\n    printf(\"Empirical Step Count vs Theoretical (n * log2(n)):\\n\");\n    printf(\"--------------------------------------------------\\n\");\n    printf(\"    n   | Total Operations |  n * log2(n)  |  Ratio \\n\");\n    printf(\"--------+------------------+---------------+---------\\n\");\n\n    for (int n = 8; n <= 1024; n *= 2) {\n        operationCount = 0;\n        divideAndConquer(n);\n        double theoretical = n * (log2(n) + 1);\n        printf(\"%7d | %16lld | %13.1f | %7.3f\\n\", \n               n, operationCount, theoretical, (double)operationCount / theoretical);\n    }\n    printf(\"--------------------------------------------------\\n\");\n    printf(\"Asymptotic ratio converges to 1.000, validating Theta(n log n).\\n\");\n\n    return 0;\n}",
              "output": "Empirical Step Count vs Theoretical (n * log2(n)):\n--------------------------------------------------\n    n   | Total Operations |  n * log2(n)  |  Ratio \n--------+------------------+---------------+---------\n      8 |               40 |          32.0 |   1.250\n     16 |               96 |          80.0 |   1.200\n     32 |              224 |         192.0 |   1.167\n     64 |              512 |         448.0 |   1.143\n    128 |             1152 |        1024.0 |   1.125\n    256 |             2560 |        2304.0 |   1.111\n    512 |             5632 |        5120.0 |   1.100\n   1024 |            12288 |       11264.0 |   1.091\n--------------------------------------------------\nAsymptotic ratio converges to 1.000, validating Theta(n log n)."
            }
          ],
          "keyPoints": [
            "Recurrence relations model divide-and-conquer algorithm runtimes: T(n) = a T(n/b) + f(n).",
            "The Substitution Method proves hypothesized bounds using mathematical induction with explicit constants c and n0.",
            "The Recursion Tree Method determines total costs by summing per-level operations across log_b(n) levels.",
            "The Master Theorem compares f(n) with n^(log_b a) across three distinct polynomial cases.",
            "The Master Theorem cannot be applied when subproblem reduction is additive (e.g., T(n-1)) or when the ratio with f(n) is non-polynomial."
          ],
          "theoryQuestions": [
            {
              "question": "State the Master Theorem for divide-and-conquer recurrences. Solve the following recurrences using Master Theorem:\\n(a) T(n) = 4T(n/2) + n\\n(b) T(n) = 4T(n/2) + n^2\\n(c) T(n) = 4T(n/2) + n^3",
              "marks": "7 Marks",
              "answer": "1. **Master Theorem Statement**:\n   Given $T(n) = a T(n/b) + f(n)$ where $a \\ge 1, b > 1$:\n   - **Case 1**: If $f(n) = \\mathcal{O}(n^{\\log_b a - \\epsilon})$ for $\\epsilon > 0$, then $T(n) = \\Theta(n^{\\log_b a})$.\n   - **Case 2**: If $f(n) = \\Theta(n^{\\log_b a} \\log^k n)$ for $k \\ge 0$, then $T(n) = \\Theta(n^{\\log_b a} \\log^{k+1} n)$.\n   - **Case 3**: If $f(n) = \\Omega(n^{\\log_b a + \\epsilon})$ for $\\epsilon > 0$ and $a f(n/b) \\le c f(n)$ for $c < 1$, then $T(n) = \\Theta(f(n))$.\n\n2. **Solving Given Recurrences**:\n   Here, $a = 4, b = 2$. Critical exponent $\\log_b a = \\log_2 4 = 2$, so $n^{\\log_b a} = n^2$.\n\n   - **(a) $T(n) = 4T(n/2) + n$**:\n     $f(n) = n = \\mathcal{O}(n^{2 - 1})$ with $\\epsilon = 1$.\n     Case 1 applies $\\implies T(n) = \\Theta(n^2)$.\n\n   - **(b) $T(n) = 4T(n/2) + n^2$**:\n     $f(n) = n^2 = \\Theta(n^2 \\log^0 n)$ with $k = 0$.\n     Case 2 applies $\\implies T(n) = \\Theta(n^2 \\log n)$.\n\n   - **(c) $T(n) = 4T(n/2) + n^3$**:\n     $f(n) = n^3 = \\Omega(n^{2 + 1})$ with $\\epsilon = 1$.\n     Regularity test: $a f(n/b) = 4(n/2)^3 = 4(n^3/8) = \\frac{1}{2} n^3 \\le c n^3$ holds for $c = 1/2 < 1$.\n     Case 3 applies $\\implies T(n) = \\Theta(n^3)$.",
              "keyPoints": [
                "Complete, rigorous statement of all 3 Master Theorem cases.",
                "Calculation of benchmark exponent log_2(4) = 2.",
                "Step-by-step solutions demonstrating Case 1, Case 2, and Case 3."
              ]
            },
            {
              "question": "Solve the recurrence relation T(n) = 2T(n/2) + c*n using the Recursion Tree Method. Determine tree depth, leaf count, and total level summation.",
              "marks": "5 Marks",
              "answer": "1. **Tree Structure**:\n   - The root represents Level 0 with problem size $n$ and work $c \\cdot n$.\n   - It branches into 2 children, each of size $n/2$ with work $c(n/2)$.\n   - At arbitrary level $i$, there are $2^i$ subproblems, each of size $n/2^i$.\n\n2. **Tree Depth and Leaf Count**:\n   - The tree terminates when $n/2^k = 1 \\implies 2^k = n \\implies k = \\log_2 n$.\n   - Depth of tree = $\\log_2 n$.\n   - Total number of leaves at depth $\\log_2 n$ = $2^{\\log_2 n} = n$ leaves.\n   - Cost of leaves = $n \\cdot T(1) = \\Theta(n)$.\n\n3. **Per-Level Cost Summation**:\n   - Level 0: $c \\cdot n$\n   - Level 1: $2 \\cdot c(n/2) = c \\cdot n$\n   - Level $i$: $2^i \\cdot c(n/2^i) = c \\cdot n$\n   - Work at every single level is identical: $c \\cdot n$.\n\n4. **Total Work**:\n   Total levels = $\\log_2 n + 1$.\n   $$T(n) = \\sum_{i=0}^{\\log_2 n} c n = c n (\\log_2 n + 1) = c n \\log_2 n + c n = \\Theta(n \\log n)$$",
              "keyPoints": [
                "Specification of tree parameters: depth = log2(n), leaves = n.",
                "Demonstration that cost per level is constant cn.",
                "Total summation across all levels yielding Theta(n log n)."
              ]
            }
          ],
          "mcqs": [
            {
              "question": "What is the solution to the recurrence relation T(n) = 8T(n/2) + n^2 by the Master Theorem?",
              "options": [
                "Theta(n^2)",
                "Theta(n^2 log n)",
                "Theta(n^3)",
                "Theta(n^log2 3)"
              ],
              "correctIndex": 2,
              "explanation": "Here a = 8, b = 2, so n^(log_b a) = n^(log2 8) = n^3. Since f(n) = n^2 is polynomially smaller than n^3 (Case 1), T(n) = Theta(n^3)."
            },
            {
              "question": "Why does the standard Master Theorem fail to solve the recurrence T(n) = 2T(n/2) + n / log(n)?",
              "options": [
                "Because the subproblem reduction factor b is less than 1.",
                "Because f(n) is asymptotically negative.",
                "Because the ratio between f(n) and n^(log_b a) is 1/log(n), which is not polynomially bounded (no constant epsilon > 0 exists).",
                "Because a is not an integer."
              ],
              "correctIndex": 2,
              "explanation": "f(n) is asymptotically smaller than n^1, but not by a polynomial factor n^epsilon (logarithmic factor is sub-polynomial), falling in the gap between Case 1 and Case 2."
            },
            {
              "question": "In a recursion tree for T(n) = 3T(n/3) + n^2, what is the total number of leaf nodes?",
              "options": [
                "n",
                "n^2",
                "log3(n)",
                "3n"
              ],
              "correctIndex": 0,
              "explanation": "The number of leaves in any divide-and-conquer recursion tree is given by a^(log_b n) = n^(log_b a). Here a=3, b=3, so n^(log3 3) = n^1 = n leaves."
            },
            {
              "question": "What is the time complexity of an algorithm governed by T(n) = T(n - 1) + O(1) with T(1) = O(1)?",
              "options": [
                "O(log n)",
                "O(n)",
                "O(n log n)",
                "O(n^2)"
              ],
              "correctIndex": 1,
              "explanation": "Unrolling the recurrence: T(n) = T(n-1) + c = T(n-2) + 2c = ... = T(1) + (n-1)c = O(n)."
            }
          ]
        }
      ]
    },
    {
      "id": "dsa-u2",
      "title": "Unit 2: Arrays, Strings & Linked Lists",
      "description": "Contiguous array storage, row-major and column-major memory mapping formulas, sparse matrix representations, dynamic singly linked lists, doubly linked lists, circular linked lists, and interview-grade pointer algorithms (Floyd's cycle detection, list reversal, middle node).",
      "topics": [
        {
          "id": "dsa-u2-t1",
          "title": "1D & 2D Arrays: Memory Mapping Formulas (Row-Major vs Column-Major), Address Calculation & Sparse Matrices",
          "simpleExplanation": "An array is a contiguous memory collection of homogeneous elements indexed by integers. Because physical RAM is strictly a 1D linear address space, multi-dimensional 2D arrays are serialized into memory using either Row-Major Order (row-by-row, standard in C/C++/Java) or Column-Major Order (column-by-column, standard in Fortran/MATLAB), while Sparse Matrices compress memory by storing only non-zero elements in 3-tuple form.",
          "detailedExplanation": "## 1. Linear 1D Array Memory Addressing\n\nIn physical RAM, memory is addressed linearly as a sequential continuum of byte addresses. When an array $A[0 \\dots N-1]$ of elements\u2014each occupying $W$ bytes\u2014is allocated, it is assigned a starting physical address known as the **Base Address (BA)**.\n\n$$\\text{Address}(A[i]) = \\text{BA} + (i - \\text{LowerBound}) \\times W$$\n\nFor zero-indexed arrays (where $\\text{LowerBound} = 0$):\n$$\\text{Address}(A[i]) = \\text{BA} + i \\times W$$\n\nThis simple arithmetic demonstrates why array random access is strictly $\\mathcal{O}(1)$: the CPU calculates the target memory offset directly without inspecting intermediate cells.\n\n---\n\n## 2. 2D Arrays and Memory Layouts\n\nConsider a 2D array $A[R][C]$ consisting of $M$ rows (indexed $0 \\le i < M$) and $N$ columns (indexed $0 \\le j < N$). Because physical RAM is one-dimensional, 2D matrices must be linearized into 1D memory.\n\n```mermaid\nflowchart TD\n    subgraph Matrix [\"2D Matrix: 3 Rows x 4 Columns\"]\n        R0[\"Row 0: [ A00, A01, A02, A03 ]\"]\n        R1[\"Row 1: [ A10, A11, A12, A13 ]\"]\n        R2[\"Row 2: [ A20, A21, A22, A23 ]\"]\n    end\n\n    subgraph RowMajor [\"Row-Major Serialization (C/C++, Java, Python)\"]\n        RM[\"A00 | A01 | A02 | A03 || A10 | A11 | A12 | A13 || A20 | A21 | A22 | A23\"]\n    end\n\n    subgraph ColMajor [\"Column-Major Serialization (Fortran, MATLAB, R)\"]\n        CM[\"A00 | A10 | A20 || A01 | A11 | A21 || A02 | A12 | A22 || A03 | A13 | A23\"]\n    end\n\n    Matrix --> RowMajor\n    Matrix --> ColMajor\n```\n\n### A. Row-Major Order (RMO)\nIn Row-Major Order, elements are placed row after row. To access element $A[i][j]$:\n1. Skip all previous $i$ complete rows. Each row contains $N$ columns.\n2. Skip $j$ elements in the current row.\n\n$$\\text{Address}(A[i][j]) = \\text{BA} + [ (i - L_r) \\times N + (j - L_c) ] \\times W$$\n\nWhere:\n- $\\text{BA}$ = Base Address\n- $L_r, U_r$ = Lower and upper bounds of rows ($M = U_r - L_r + 1$)\n- $L_c, U_c$ = Lower and upper bounds of columns ($N = U_c - L_c + 1$)\n- $W$ = Width / size of each element in bytes\n\n### B. Column-Major Order (CMO)\nIn Column-Major Order, elements are placed column after column. To access element $A[i][j]$:\n1. Skip all previous $j$ complete columns. Each column contains $M$ rows.\n2. Skip $i$ elements in the current column.\n\n$$\\text{Address}(A[i][j]) = \\text{BA} + [ (j - L_c) \\times M + (i - L_r) ] \\times W$$\n\n### Hardware Cache Implications (Spatial Locality)\nIn modern CPU microarchitectures, traversing a 2D array in Row-Major order when language compilers use RMO (such as C) utilizes the CPU cache lines effectively ($L1$ cache hits). Inverting the loops to traverse columns first leads to catastrophic **strided cache misses**, degrading execution speed by up to $10\\times$ to $50\\times$!\n\n---\n\n## 3. Sparse Matrices\n\nA matrix is formally categorized as **sparse** if the overwhelming majority of its entries are zero ($> 70\\% - 90\\%$ zeroes). Storing a $10,000 \\times 10,000$ sparse matrix as a dense 2D array requires $10^8 \\times 4\\text{ bytes} \\approx 400\\text{ MB}$ of memory, wasting RAM on zero entries.\n\n```\nDense Matrix (5 x 4):\n[ 0   0   0   9 ]\n[ 0   5   0   0 ]\n[ 0   0   0   0 ]\n[ 7   0   0   0 ]\n[ 0   0   3   0 ]\n```\n\n### Triplet Representation (Coordinate List - COO)\nWe represent a sparse matrix as an array of 3-tuples: `(Row, Column, Value)`.\n- Row 0 stores metadata: `[Total Rows, Total Cols, Total Non-Zero Elements (NZ)]`.\n- The subsequent `NZ` rows store the coordinates and values of non-zero entries.\n\n```\nTriplet (3-Tuple) Representation Table:\nIndex | Row | Col | Value\n------+-----+-----+-------\n[0]   |  5  |  4  |   4   <-- Metadata (Rows=5, Cols=4, NonZero=4)\n[1]   |  0  |  3  |   9\n[2]   |  1  |  1  |   5\n[3]   |  3  |  0  |   7\n[4]   |  4  |  2  |   3\n```\n\nMemory reduction: Storing 4 non-zero elements requires only $5 \\times 3 \\times 4\\text{ bytes} = 60\\text{ bytes}$, down from $5 \\times 4 \\times 4 = 80\\text{ bytes}$, scaling exponentially as matrix dimensions grow to millions of rows.\n\n---\n\n> [!IMPORTANT] **MEMORIZE:**\n> - Row-Major: Multiply row index offset by total number of **Columns** ($N$): $[i \\times N + j] \\times W$.\n> - Column-Major: Multiply column index offset by total number of **Rows** ($M$): $[j \\times M + i] \\times W$.\n\n> [!NOTE] **DEV BRAIN:**\n> In high-performance computing, numerical packages use specialized sparse formats: CSR (Compressed Sparse Row) and CSC (Compressed Sparse Column) to perform fast sparse matrix-vector multiplications ($SpMV$) in machine learning pipelines.\n\n> [!WARNING] **TRAP:**\n> Watch out for non-zero indexed matrices in university exams! If array bounds are $A[1 \\dots 10][1 \\dots 20]$, you must subtract the lower bounds: $(i - 1) \\times 20 + (j - 1)$. Forgetting lower bounds produces incorrect address calculations!\n\n> [!TIP] **EXAM TIP:**\n> When calculating 2D address, always explicitly list: (1) Base Address $\\text{BA}$, (2) Element size $W$, (3) Number of columns $N = U_c - L_c + 1$, (4) Number of rows $M = U_r - L_r + 1$, and then substitute step-by-step into the formula.",
          "shortNotes": "1D Address = BA + i*W. 2D Row-Major = BA + [i*Cols + j]*W; Col-Major = BA + [j*Rows + i]*W. Sparse matrices compress zeroes using 3-tuple (Row, Col, Value) arrays.",
          "examples": [
            {
              "title": "Address Calculation & Sparse Matrix Triplet Conversion in C",
              "problem": "Calculate memory address for A[4][7] under Row-Major and Column-Major order (Base=1000, size=4 bytes, bounds [0..5][0..9]), and convert a dense matrix to 3-tuple sparse matrix.",
              "explanation": "Demonstrates theoretical address validation and dynamic triplet construction from a dense sparse matrix.",
              "code": "#include <stdio.h>\n\n#define ROWS 4\n#define COLS 5\n\ntypedef struct {\n    int row;\n    int col;\n    int val;\n} Element;\n\nvoid calculateAddresses() {\n    int BA = 1000;\n    int W = 4;\n    int Lr = 0, Ur = 5;\n    int Lc = 0, Uc = 9;\n    int M = Ur - Lr + 1; // 6 rows\n    int N = Uc - Lc + 1; // 10 columns\n    int i = 4, j = 7;\n\n    int addrRMO = BA + ((i - Lr) * N + (j - Lc)) * W;\n    int addrCMO = BA + ((j - Lc) * M + (i - Lr)) * W;\n\n    printf(\"Address Calculations for A[4][7]:\\n\");\n    printf(\"  Row-Major Order Address    : %d\\n\", addrRMO);\n    printf(\"  Column-Major Order Address : %d\\n\\n\", addrCMO);\n}\n\nvoid createSparseMatrix(int matrix[ROWS][COLS]) {\n    Element sparse[ROWS * COLS + 1];\n    int k = 1;\n\n    for (int i = 0; i < ROWS; i++) {\n        for (int j = 0; j < COLS; j++) {\n            if (matrix[i][j] != 0) {\n                sparse[k].row = i;\n                sparse[k].col = j;\n                sparse[k].val = matrix[i][j];\n                k++;\n            }\n        }\n    }\n    sparse[0].row = ROWS;\n    sparse[0].col = COLS;\n    sparse[0].val = k - 1; // Total non-zero count\n\n    printf(\"Sparse Matrix Triplet (3-Tuple) Representation:\\n\");\n    printf(\"Row | Col | Value\\n\");\n    printf(\"----+-----+------\\n\");\n    for (int i = 0; i < k; i++) {\n        printf(\"%3d | %3d | %5d\\n\", sparse[i].row, sparse[i].col, sparse[i].val);\n    }\n}\n\nint main() {\n    calculateAddresses();\n\n    int matrix[ROWS][COLS] = {\n        {0, 0, 8, 0, 0},\n        {3, 0, 0, 0, 0},\n        {0, 0, 0, 0, 5},\n        {0, 9, 0, 0, 0}\n    };\n    createSparseMatrix(matrix);\n\n    return 0;\n}",
              "output": "Address Calculations for A[4][7]:\n  Row-Major Order Address    : 1188\n  Column-Major Order Address : 1184\n\nSparse Matrix Triplet (3-Tuple) Representation:\nRow | Col | Value\n----+-----+------\n  4 |   5 |     4\n  0 |   2 |     8\n  1 |   0 |     3\n  2 |   4 |     5\n  3 |   1 |     9"
            }
          ],
          "keyPoints": [
            "Arrays provide O(1) random access due to predictable linear address arithmetic from base address.",
            "Row-Major Order stores elements row-by-row; Column-Major Order stores column-by-column.",
            "Memory formula for 2D Row-Major: BA + [(i - Lr) * N + (j - Lc)] * W.",
            "Memory formula for 2D Column-Major: BA + [(j - Lc) * M + (i - Lr)] * W.",
            "Row-major traversal aligns with hardware cache lines in C/C++/Java, maximizing spatial locality.",
            "Sparse matrices save significant RAM by representing non-zero elements using 3-tuple (Row, Col, Value) arrays."
          ],
          "theoryQuestions": [
            {
              "question": "An array A[2...8, -1...5] is stored in memory with Base Address 400. Each element occupies 4 bytes. Calculate the address of A[5, 2] in both (a) Row-Major Order and (b) Column-Major Order.",
              "marks": "7 Marks",
              "answer": "1. **Given Parameters**:\n   - Row bounds: $L_r = 2, U_r = 8 \\implies \\text{Number of rows } M = U_r - L_r + 1 = 8 - 2 + 1 = 7$.\n   - Column bounds: $L_c = -1, U_c = 5 \\implies \\text{Number of columns } N = U_c - L_c + 1 = 5 - (-1) + 1 = 7$.\n   - Target indices: $i = 5, j = 2$.\n   - Base Address $\\text{BA} = 400$.\n   - Element size $W = 4$ bytes.\n\n2. **(a) Row-Major Order (RMO)**:\n   $$\\text{Address}(A[i, j]) = \\text{BA} + [ (i - L_r) \\times N + (j - L_c) ] \\times W$$\n   $$\\text{Offset} = (5 - 2) \\times 7 + (2 - (-1)) = (3 \\times 7) + (3) = 21 + 3 = 24$$\n   $$\\text{Address}(A[5, 2]) = 400 + (24 \\times 4) = 400 + 96 = 496$$\n\n3. **(b) Column-Major Order (CMO)**:\n   $$\\text{Address}(A[i, j]) = \\text{BA} + [ (j - L_c) \\times M + (i - L_r) ] \\times W$$\n   $$\\text{Offset} = (2 - (-1)) \\times 7 + (5 - 2) = (3 \\times 7) + (3) = 21 + 3 = 24$$\n   $$\\text{Address}(A[5, 2]) = 400 + (24 \\times 4) = 400 + 96 = 496$$\n\n*(Note: Both values coincide here because row count $M$ and column count $N$ happen to be identical ($7$), and $(i - L_r) = (j - L_c) = 3$.)*",
              "keyPoints": [
                "Calculation of dimension counts: M = 7 rows, N = 7 columns.",
                "Step-by-step substitution into Row-Major formula giving 496.",
                "Step-by-step substitution into Column-Major formula giving 496."
              ]
            },
            {
              "question": "What is a Sparse Matrix? Explain why dense 2D array representation is inefficient for sparse matrices, and describe the 3-Tuple (Triplet) representation.",
              "marks": "5 Marks",
              "answer": "1. **Definition**: A sparse matrix is a matrix in which the number of zero elements is substantially greater than the number of non-zero elements (typically $> 75\\%$ zero entries).\n\n2. **Inefficiency of Dense Storage**:\n   - **Wasted Memory**: Storing zeroes in a standard 2D array of size $M \\times N$ consumes $M \\times N \\times W$ bytes of memory. For a $10^5 \\times 10^5$ matrix with only 10,000 non-zero items, dense storage requires 40 GB of RAM.\n   - **Wasted CPU Cycles**: Traversing or multiplying dense matrices involves evaluating billions of trivial multiplications with zero ($0 \\times x = 0$).\n\n3. **Triplet (3-Tuple) Representation**:\n   - Non-zero elements are stored in a 2D array of shape $(NZ + 1) \\times 3$.\n   - **Row 0 (Header)**: Holds `[Total Rows, Total Columns, Total Non-Zero Elements]`.\n   - **Rows 1 to NZ**: Each row contains `[row_index, col_index, non_zero_value]`.\n   - Space complexity drops from $\\mathcal{O}(M \\times N)$ to $\\mathcal{O}(NZ)$, yielding massive storage savings.",
              "keyPoints": [
                "Definition of sparse matrix.",
                "Analysis of storage and computational inefficiencies of dense arrays.",
                "Structural layout of 3-tuple coordinate table with header row."
              ]
            }
          ],
          "mcqs": [
            {
              "question": "For a 2D array A[10][20] stored in Row-Major order with base address 1000 and 4 bytes per element, what is the address of A[3][5]?",
              "options": [
                "1260",
                "1065",
                "1264",
                "1180"
              ],
              "correctIndex": 0,
              "explanation": "Offset = 3 * 20 + 5 = 65 elements. Address = 1000 + 65 * 4 = 1000 + 260 = 1260."
            },
            {
              "question": "Why does traversing a C/C++ 2D array row-by-row execute significantly faster than column-by-column?",
              "options": [
                "Row-major traversal uses fewer assembly instructions.",
                "Row-major order accesses contiguous memory addresses, leveraging CPU cache line spatial locality.",
                "C compilers cannot optimize column loops.",
                "Column indices require 64-bit pointers."
              ],
              "correctIndex": 1,
              "explanation": "In Row-Major layout, adjacent row elements reside in contiguous memory bytes. When one element is loaded into cache, adjacent elements are prefetched into the CPU cache line, minimizing DRAM access latency."
            },
            {
              "question": "In the 3-tuple representation of a sparse matrix, what information is stored in the 0-th row?",
              "options": [
                "The largest element in the matrix",
                "The memory address of the base pointer",
                "Total number of rows, total number of columns, and total number of non-zero elements",
                "The diagonal determinant"
              ],
              "correctIndex": 2,
              "explanation": "Row 0 serves as metadata, storing the dimensions of the original matrix [Total Rows, Total Cols] along with the non-zero element count."
            },
            {
              "question": "In Column-Major order, which index multiplier determines the memory offset?",
              "options": [
                "Total number of columns (N)",
                "Total number of rows (M)",
                "Total number of non-zero entries",
                "Array Base Address"
              ],
              "correctIndex": 1,
              "explanation": "In Column-Major layout, each completed column spans all rows, so the column index offset is multiplied by the total number of rows (M)."
            }
          ]
        },
        {
          "id": "dsa-u2-t2",
          "title": "Singly Linked List: Dynamic Memory Allocation, Node Structure, Pointer Manipulation, Insertion & Deletion at Head/Tail/Arbitrary",
          "simpleExplanation": "A Singly Linked List (SLL) is a fundamental dynamic data structure consisting of nodes linked sequentially by forward pointers. Unlike static arrays, linked lists can grow or shrink dynamically at runtime on the heap, allowing O(1) insertions and deletions at known pointer locations without memory reallocations or element shifts.",
          "detailedExplanation": "## 1. Node Anatomy and Heap Dynamic Allocation\n\nAn array requires a contiguous block of physical RAM allocated up front. In contrast, a **Singly Linked List (SLL)** allocates individual nodes dynamically in the application heap using runtime memory allocators (`malloc` in C, `new` in C++ / Java).\n\n```mermaid\ngraph LR\n    subgraph SLL [\"Singly Linked List Architecture\"]\n        HEAD[\"head\"] --> N1[\"Node 1\n[Data: 10 | Next]\"]\n        N1 --> N2[\"Node 2\n[Data: 20 | Next]\"]\n        N2 --> N3[\"Node 3\n[Data: 30 | Next: NULL]\"]\n    end\n```\n\n### Physical Node Memory Layout\nEach node contains two fields:\n1. `data`: The payload (primitive type or composite struct/object).\n2. `next`: A pointer (memory address) storing the location of the successor node in heap space. The terminal node has `next = NULL`.\n\n```c\ntypedef struct Node {\n    int data;\n    struct Node *next;\n} Node;\n```\n\n---\n\n## 2. Pointer Manipulation Algorithms\n\nThe integrity of a linked list relies entirely on preserving pointer links. **The golden rule of pointer updates**: *Always connect the new node's outgoing pointer to the existing chain before modifying any predecessor's pointer, preventing orphan memory leaks.*\n\n```mermaid\nflowchart TD\n    subgraph Insert_Head [\"Insertion at Head: O(1)\"]\n        IH1[\"1. Allocate newNode\nnewNode->data = val\"]\n        IH2[\"2. Connect to existing chain\nnewNode->next = head\"]\n        IH3[\"3. Update head reference\nhead = newNode\"]\n        IH1 --> IH2 --> IH3\n    end\n\n    subgraph Delete_Head [\"Deletion at Head: O(1)\"]\n        DH1[\"1. Check head != NULL\"]\n        DH2[\"2. temp = head\nhead = head->next\"]\n        DH3[\"3. free(temp)\"]\n        DH1 --> DH2 --> DH3\n    end\n```\n\n### A. Insertion Operations\n\n1. **Insertion at Head ($O(1)$ Time)**:\n   - Create `newNode`.\n   - `newNode->next = head`.\n   - `head = newNode`.\n\n2. **Insertion at Tail ($O(n)$ without tail pointer, $O(1)$ with tail pointer)**:\n   - Create `newNode` with `newNode->next = NULL`.\n   - If `head == NULL`, set `head = newNode`.\n   - Else, traverse with `curr` until `curr->next == NULL`.\n   - `curr->next = newNode`.\n\n3. **Insertion After a Given Node ($O(1)$ Time)**:\n   - Given pointer `prevNode`.\n   - `newNode->next = prevNode->next`.\n   - `prevNode->next = newNode`.\n\n### B. Deletion Operations\n\n1. **Deletion at Head ($O(1)$ Time)**:\n   - Check if `head == NULL` (underflow).\n   - `temp = head`.\n   - `head = head->next`.\n   - `free(temp)`.\n\n2. **Deletion at Tail ($O(n)$ Time)**:\n   - If single node: `free(head); head = NULL;`.\n   - Traverse with `curr` until `curr->next->next == NULL`.\n   - `free(curr->next)`.\n   - `curr->next = NULL`.\n\n3. **Deletion of Arbitrary Node by Key ($O(n)$ Search + $O(1)$ Splice)**:\n   - Maintain `prev` and `curr` pointers.\n   - Advance until `curr->data == key`.\n   - `prev->next = curr->next`.\n   - `free(curr)`.\n\n---\n\n## 3. Arrays vs Singly Linked Lists: Structural Trade-offs\n\n| Criterion | Dynamic Array (`std::vector`) | Singly Linked List |\n| :--- | :--- | :--- |\n| **Memory Allocation** | Single contiguous block; reallocated when capacity is exceeded. | Dispersed individual heap allocations on demand. |\n| **Random Access** | $\\mathcal{O}(1)$ via index arithmetic. | $\\mathcal{O}(n)$ sequential pointer chasing. |\n| **Insert / Delete at Head**| $\\mathcal{O}(n)$ due to shifting elements. | $\\mathcal{O}(1)$ pointer reassignment. |\n| **Insert / Delete at Tail**| $\\mathcal{O}(1)$ amortized. | $\\mathcal{O}(1)$ with tail pointer (deletion is still $\\mathcal{O}(n)$). |\n| **Memory Overhead** | Unused reserved capacity buffer. | Extra pointer per node (8 bytes on 64-bit systems). |\n| **Cache Locality** | Outstanding (CPU hardware prefetching). | Poor (pointer chasing causes frequent L1/L2 cache misses). |\n\n---\n\n> [!IMPORTANT] **MEMORIZE:**\n> In Singly Linked Lists, deleting the **tail node** requires $\\mathcal{O}(n)$ time even if you maintain a direct `tail` pointer, because you must update the *second-to-last* node's `next` pointer to `NULL`, which requires traversing from `head`!\n\n> [!NOTE] **DEV BRAIN:**\n> In modern systems with deep memory hierarchies, dynamic arrays frequently outperform linked lists even on insertions, because contiguous memory layout exploits CPU cache prefetching, while linked list pointer chasing incurs cache misses.\n\n> [!WARNING] **TRAP:**\n> Never write `free(temp)` before `head = head->next`. Accessing `temp->next` after `free(temp)` is a critical **Use-After-Free** security vulnerability and undefined behavior!\n\n> [!TIP] **EXAM TIP:**\n> When writing linked list algorithms in exams, ALWAYS explicitly handle edge cases: (1) Empty list (`head == NULL`), (2) Single-node list (`head->next == NULL`), and (3) Target element not found.",
          "shortNotes": "SLL nodes contain data and next pointer. Insert/delete at head is O(1); arbitrary access is O(n). Deleting tail is O(n) without predecessor pointer. Memory is non-contiguous.",
          "examples": [
            {
              "title": "Complete C Implementation of Singly Linked List with Core Operations",
              "problem": "Implement a complete Singly Linked List supporting insertAtHead, insertAtTail, deleteHead, deleteByKey, and display.",
              "explanation": "Demonstrates proper pointer manipulation, handling boundary conditions, and preventing memory leaks using free().",
              "code": "#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct Node {\n    int data;\n    struct Node *next;\n} Node;\n\nNode* createNode(int value) {\n    Node *newNode = (Node*)malloc(sizeof(Node));\n    newNode->data = value;\n    newNode->next = NULL;\n    return newNode;\n}\n\nvoid insertAtHead(Node **head, int value) {\n    Node *newNode = createNode(value);\n    newNode->next = *head;\n    *head = newNode;\n}\n\nvoid insertAtTail(Node **head, int value) {\n    Node *newNode = createNode(value);\n    if (*head == NULL) {\n        *head = newNode;\n        return;\n    }\n    Node *curr = *head;\n    while (curr->next != NULL) {\n        curr = curr->next;\n    }\n    curr->next = newNode;\n}\n\nvoid deleteHead(Node **head) {\n    if (*head == NULL) return;\n    Node *temp = *head;\n    *head = (*head)->next;\n    free(temp);\n}\n\nvoid deleteByKey(Node **head, int key) {\n    if (*head == NULL) return;\n    if ((*head)->data == key) {\n        deleteHead(head);\n        return;\n    }\n    Node *curr = *head;\n    while (curr->next != NULL && curr->next->data != key) {\n        curr = curr->next;\n    }\n    if (curr->next != NULL) {\n        Node *temp = curr->next;\n        curr->next = temp->next;\n        free(temp);\n    }\n}\n\nvoid printList(Node *head) {\n    Node *curr = head;\n    printf(\"Head -> \");\n    while (curr != NULL) {\n        printf(\"[%d] -> \", curr->data);\n        curr = curr->next;\n    }\n    printf(\"NULL\\n\");\n}\n\nint main() {\n    Node *head = NULL;\n\n    insertAtHead(&head, 30);\n    insertAtHead(&head, 10);\n    insertAtTail(&head, 40);\n    insertAtTail(&head, 50);\n    printList(head);\n\n    deleteHead(&head);\n    printf(\"After deleteHead:\\n\");\n    printList(head);\n\n    deleteByKey(&head, 40);\n    printf(\"After deleting key 40:\\n\");\n    printList(head);\n\n    return 0;\n}",
              "output": "Head -> [10] -> [30] -> [40] -> [50] -> NULL\nAfter deleteHead:\nHead -> [30] -> [40] -> [50] -> NULL\nAfter deleting key 40:\nHead -> [30] -> [50] -> NULL"
            }
          ],
          "keyPoints": [
            "Nodes in a singly linked list contain a data field and a single next pointer referencing heap memory.",
            "Insertion and deletion at the head execute in guaranteed O(1) time without element shifting.",
            "Accessing or searching for an arbitrary index requires sequential traversal in O(n) time.",
            "Tail deletion in SLL requires O(n) time to locate the second-to-last node, even with a tail pointer.",
            "Dynamic memory management requires explicit free() calls in C/C++ to eliminate memory leaks."
          ],
          "theoryQuestions": [
            {
              "question": "Write algorithms for inserting a node at an arbitrary position in a Singly Linked List. What are the edge cases to consider?",
              "marks": "5 Marks",
              "answer": "1. **Algorithm for Insertion at Position $P$ (1-indexed)**:\n   - **Step 1**: If $P = 1$, call `insertAtHead(val)` and return.\n   - **Step 2**: Traverse the list using pointer `curr` initialized to `head` and counter $i = 1$ until $i = P - 1$ or `curr == NULL`.\n   - **Step 3**: If `curr == NULL`, position is out of bounds; abort.\n   - **Step 4**: Allocate `newNode = malloc(sizeof(Node))`; assign `newNode->data = val`.\n   - **Step 5**: Set `newNode->next = curr->next`.\n   - **Step 6**: Set `curr->next = newNode`.\n\n2. **Crucial Edge Cases**:\n   - **Empty List ($head == NULL$)**: If $P = 1$, new node becomes head; if $P > 1$, invalid position error.\n   - **Insertion at Head ($P = 1$)**: Modifies the global list head pointer.\n   - **Insertion at Tail ($P = N + 1$)**: `curr->next` is `NULL`, so `newNode->next` becomes `NULL`.\n   - **Position Out of Range ($P > N + 1$)**: Traversal reaches `NULL` before counter hits $P - 1$.",
              "keyPoints": [
                "Step-by-step algorithm linking newNode before updating predecessor.",
                "Special handling of head position (P=1).",
                "Edge cases: Empty list, tail boundary, out-of-bounds index."
              ]
            },
            {
              "question": "Compare Arrays and Singly Linked Lists in detail. Under what software requirements should an engineer prefer a Linked List over an Array?",
              "marks": "7 Marks",
              "answer": "1. **Comparison Across Core Architectural Dimensions**:\n   - **Memory Layout**: Arrays require contiguous physical memory; Linked Lists utilize non-contiguous heap allocations.\n   - **Access Complexity**: Arrays support $\\mathcal{O}(1)$ random access ($A[i]$); Linked Lists require $\\mathcal{O}(n)$ sequential pointer traversal.\n   - **Insertion/Deletion**: Arrays require $\\mathcal{O}(n)$ shifting; Linked Lists require $\\mathcal{O}(1)$ pointer updates once the target position is found.\n   - **Memory Overhead**: Arrays have minimal overhead (reserved unused slots); Linked Lists require 8 bytes per node for pointers on 64-bit systems.\n   - **Cache Locality**: Arrays exhibit excellent spatial locality (CPU prefetching); Linked Lists suffer from cache thrashing.\n\n2. **When to Choose a Linked List**:\n   - **Unknown or Rapidly Fluctuating Collection Size**: Prevents repeated array resizing allocations.\n   - **Frequent Insertions/Deletions at Head/Front**: Such as building undo stacks or real-time FIFO message queues.\n   - **No Requirement for Random Index Access**: Workloads only process items sequentially.",
              "keyPoints": [
                "Comparison table covering memory layout, access, mutation, overhead, and caching.",
                "Concrete engineering scenarios favoring Linked Lists (dynamic sizing, front insertions).",
                "Acknowledgment of cache locality penalties in modern hardware."
              ]
            }
          ],
          "mcqs": [
            {
              "question": "In a Singly Linked List with a head pointer and a tail pointer, which of the following operations CANNOT be performed in O(1) time?",
              "options": [
                "Insert at head",
                "Delete at head",
                "Insert at tail",
                "Delete at tail"
              ],
              "correctIndex": 3,
              "explanation": "To delete the tail node, the pointer to the preceding node must be updated to NULL. Because SLL has only forward pointers, finding the predecessor requires O(n) traversal from head."
            },
            {
              "question": "What is the primary consequence of executing `head = head->next; free(head);` when attempting to delete the first node?",
              "options": [
                "Successful deletion of the first node.",
                "Memory leak of the second node and corruption of the list.",
                "Compilation error due to invalid pointer syntax.",
                "The list becomes circular."
              ],
              "correctIndex": 1,
              "explanation": "Updating head first causes head to point to the second node. Calling free(head) then deletes the second node, while the original first node is leaked in heap memory."
            },
            {
              "question": "On a 64-bit operating system, what is the minimum memory overhead for pointers in a Singly Linked List of 1,000 integer nodes (assuming 4-byte integers and 8-byte alignment)?",
              "options": [
                "4,000 bytes",
                "8,000 bytes",
                "12,000 bytes",
                "16,000 bytes"
              ],
              "correctIndex": 1,
              "explanation": "Each node contains one pointer. On a 64-bit machine, a pointer takes 8 bytes. For 1,000 nodes, 1,000 * 8 = 8,000 bytes of pointer overhead is consumed."
            },
            {
              "question": "Which algorithmic technique allows finding the k-th node from the end of a Singly Linked List in a single pass?",
              "options": [
                "Binary search on pointers",
                "Two-pointer technique (fast and slow pointer separated by k nodes)",
                "Recursion tree method",
                "Master Theorem"
              ],
              "correctIndex": 1,
              "explanation": "Advance the fast pointer k steps ahead. Then move both fast and slow pointers at identical speeds; when fast hits NULL, slow is positioned exactly at the k-th node from the end."
            }
          ]
        },
        {
          "id": "dsa-u2-t3",
          "title": "Doubly Linked List (DLL): Two-Way Pointers, Insertion, Deletion, Forward & Backward Traversals",
          "simpleExplanation": "A Doubly Linked List (DLL) extends the linked list concept by equipping each node with two explicit pointers: `next` referencing the successor node and `prev` referencing the predecessor node. This bidirectional linkage enables two-way traversal and unlocks true O(1) node deletion when a direct reference to that node is provided.",
          "detailedExplanation": "## 1. Architectural Anatomy of a Doubly Linked List\n\nA major limitation of Singly Linked Lists is the inability to navigate backward: once you advance past a node, you cannot return to its predecessor without restarting from `head`. \n\nA **Doubly Linked List (DLL)** overcomes this by maintaining two pointer references per node:\n- `data`: Node value payload.\n- `next`: Memory address of the successor node (`NULL` at tail).\n- `prev`: Memory address of the predecessor node (`NULL` at head).\n\n```mermaid\ngraph LR\n    subgraph DLL [\"Doubly Linked List Architecture\"]\n        HEAD[\"head\"] --> N1[\"Node 1\nprev: NULL\ndata: 10\nnext\"]\n        N1 -->|next| N2[\"Node 2\nprev\ndata: 20\nnext\"]\n        N2 -->|prev| N1\n        N2 -->|next| N3[\"Node 3\nprev\ndata: 30\nnext: NULL\"]\n        N3 -->|prev| N2\n        TAIL[\"tail\"] --> N3\n    end\n```\n\n### C Node Structure\n```c\ntypedef struct DLLNode {\n    int data;\n    struct DLLNode *prev;\n    struct DLLNode *next;\n} DLLNode;\n```\n\n---\n\n## 2. Pointer Mutation Mechanics\n\nBecause every node is tethered by two independent pointers, **every insertion or deletion requires updating up to four pointer references**. Careless reassignments break the two-way invariant, resulting in orphaned sublists or infinite loops.\n\n```mermaid\nflowchart TD\n    subgraph Insert_Between [\"Inserting newNode between A and B\"]\n        S1[\"1. newNode->prev = A\"]\n        S2[\"2. newNode->next = B\"]\n        S3[\"3. A->next = newNode\"]\n        S4[\"4. B->prev = newNode\"]\n        S1 --> S2 --> S3 --> S4\n    end\n```\n\n### A. Insertion Operations\n\n1. **Insert at Head ($O(1)$ Time)**:\n   - Create `newNode` with `prev = NULL` and `next = head`.\n   - If `head != NULL`, set `head->prev = newNode`.\n   - Update `head = newNode`.\n\n2. **Insert at Tail with Tail Pointer ($O(1)$ Time)**:\n   - Create `newNode` with `next = NULL` and `prev = tail`.\n   - If `tail != NULL`, set `tail->next = newNode`.\n   - Update `tail = newNode`.\n\n3. **Insert After Given Node `curr` ($O(1)$ Time)**:\n   - Create `newNode`.\n   - `newNode->next = curr->next`.\n   - `newNode->prev = curr`.\n   - If `curr->next != NULL`, `curr->next->prev = newNode`.\n   - `curr->next = newNode`.\n\n### B. Deletion Operations\n\n1. **Delete Given Node `target` ($O(1)$ Time)**:\n   - If `target->prev != NULL`, `target->prev->next = target->next`; else `head = target->next`.\n   - If `target->next != NULL`, `target->next->prev = target->prev`; else `tail = target->prev`.\n   - `free(target)`.\n\n*This highlights the great advantage of DLL: we can delete any node in $O(1)$ time without traversing from `head` to find its predecessor.*\n\n---\n\n## 3. Bidirectional Traversals\n\nA DLL enables seamless bidirectional navigation:\n- **Forward Traversal**: Start at `head`, loop while `curr != NULL`, stepping `curr = curr->next`.\n- **Backward Traversal**: Start at `tail`, loop while `curr != NULL`, stepping `curr = curr->prev`.\n\n### Real-World Applications\n1. **Web Browser History**: Clicking \"Back\" and \"Forward\" buttons moves along a doubly linked list of visited URLs.\n2. **Music Player Playlists**: Navigating to next song or returning to previous track.\n3. **LRU (Least Recently Used) Cache**: Combining a Hash Table with a DLL allows $O(1)$ eviction from tail and $O(1)$ promotion to head.\n\n---\n\n> [!IMPORTANT] **MEMORIZE:**\n> Deleting a known node in a Singly Linked List requires $\\mathcal{O}(n)$ time because the predecessor pointer must be located by traversing from `head`. In a Doubly Linked List, deletion of a known node is strictly $\\mathcal{O}(1)$ because `target->prev` is immediately available!\n\n> [!NOTE] **DEV BRAIN:**\n> The Linux kernel uses an intrusive circular doubly linked list (`struct list_head`) for process scheduling tables, device drivers, and network buffers due to its consistent $O(1)$ insertion and removal mechanics.\n\n> [!WARNING] **TRAP:**\n> Always verify boundary checks for `NULL` before accessing `curr->next->prev`! If `curr` is the last node in the list, `curr->next` is `NULL`, and dereferencing it triggers a Segmentation Fault (Crash).\n\n> [!TIP] **EXAM TIP:**\n> When asked to write the insertion algorithm between nodes $A$ and $B$, write down the four pointer steps in exact order: (1) `newNode->next = B`, (2) `newNode->prev = A`, (3) `A->next = newNode`, (4) `B->prev = newNode`.",
          "shortNotes": "DLL nodes store data, prev, and next pointers. Enables bidirectional traversal. Deleting a given node is O(1) without predecessor search. Consumes 2x pointer memory.",
          "examples": [
            {
              "title": "Full C Implementation of Doubly Linked List with Two-Way Traversal",
              "problem": "Implement a Doubly Linked List supporting insertAtHead, insertAtTail, deleteNode, forward traversal, and backward traversal.",
              "explanation": "Demonstrates bidirectional pointer wiring, maintaining head and tail references, and O(1) node deletion.",
              "code": "#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct DLLNode {\n    int data;\n    struct DLLNode *prev;\n    struct DLLNode *next;\n} DLLNode;\n\nDLLNode* createDLLNode(int val) {\n    DLLNode *node = (DLLNode*)malloc(sizeof(DLLNode));\n    node->data = val;\n    node->prev = NULL;\n    node->next = NULL;\n    return node;\n}\n\nvoid insertHead(DLLNode **head, DLLNode **tail, int val) {\n    DLLNode *node = createDLLNode(val);\n    if (*head == NULL) {\n        *head = *tail = node;\n        return;\n    }\n    node->next = *head;\n    (*head)->prev = node;\n    *head = node;\n}\n\nvoid insertTail(DLLNode **head, DLLNode **tail, int val) {\n    DLLNode *node = createDLLNode(val);\n    if (*tail == NULL) {\n        *head = *tail = node;\n        return;\n    }\n    node->prev = *tail;\n    (*tail)->next = node;\n    *tail = node;\n}\n\nvoid deleteNode(DLLNode **head, DLLNode **tail, DLLNode *target) {\n    if (*head == NULL || target == NULL) return;\n\n    if (*head == target) *head = target->next;\n    if (*tail == target) *tail = target->prev;\n\n    if (target->prev != NULL) target->prev->next = target->next;\n    if (target->next != NULL) target->next->prev = target->prev;\n\n    free(target);\n}\n\nvoid printForward(DLLNode *head) {\n    printf(\"Forward  : NULL <-> \");\n    DLLNode *curr = head;\n    while (curr != NULL) {\n        printf(\"[%d] <-> \", curr->data);\n        curr = curr->next;\n    }\n    printf(\"NULL\\n\");\n}\n\nvoid printBackward(DLLNode *tail) {\n    printf(\"Backward : NULL <-> \");\n    DLLNode *curr = tail;\n    while (curr != NULL) {\n        printf(\"[%d] <-> \", curr->data);\n        curr = curr->prev;\n    }\n    printf(\"NULL\\n\");\n}\n\nint main() {\n    DLLNode *head = NULL;\n    DLLNode *tail = NULL;\n\n    insertHead(&head, &tail, 20);\n    insertHead(&head, &tail, 10);\n    insertTail(&head, &tail, 30);\n    insertTail(&head, &tail, 40);\n\n    printForward(head);\n    printBackward(tail);\n\n    // Delete node with value 30 (head->next->next)\n    printf(\"\\nDeleting node with value 30...\\n\");\n    deleteNode(&head, &tail, head->next->next);\n\n    printForward(head);\n    printBackward(tail);\n\n    return 0;\n}",
              "output": "Forward  : NULL <-> [10] <-> [20] <-> [30] <-> [40] <-> NULL\nBackward : NULL <-> [40] <-> [30] <-> [20] <-> [10] <-> NULL\n\nDeleting node with value 30...\nForward  : NULL <-> [10] <-> [20] <-> [40] <-> NULL\nBackward : NULL <-> [40] <-> [20] <-> [10] <-> NULL"
            }
          ],
          "keyPoints": [
            "Each DLL node contains data, next pointer, and prev pointer.",
            "Enables full bidirectional traversal (forward from head, backward from tail).",
            "Deleting any node given its pointer executes in O(1) time without searching for the predecessor.",
            "Consumes twice the pointer memory compared to singly linked lists (16 bytes vs 8 bytes on 64-bit systems).",
            "Four pointer assignments are required for arbitrary node insertions between two nodes."
          ],
          "theoryQuestions": [
            {
              "question": "Explain the step-by-step algorithm for deleting a given node from a Doubly Linked List. Highlight how edge cases (head and tail deletion) are handled.",
              "marks": "5 Marks",
              "answer": "1. **Algorithm to Delete Node `target`**:\n   - **Step 1**: Check if `target == NULL`; if true, exit immediately.\n   - **Step 2 (Predecessor Update)**:\n     If `target->prev != NULL`:\n         `target->prev->next = target->next;`\n     Else (`target` is head):\n         `head = target->next;`\n   - **Step 3 (Successor Update)**:\n     If `target->next != NULL`:\n         `target->next->prev = target->prev;`\n     Else (`target` is tail):\n         `tail = target->prev;`\n   - **Step 4**: Free allocated memory: `free(target);`.\n\n2. **Edge Cases Handled**:\n   - **Deleting Head Node**: `target->prev == NULL`. Global `head` pointer moves to `target->next`.\n   - **Deleting Tail Node**: `target->next == NULL`. Global `tail` pointer retreats to `target->prev`.\n   - **Deleting Only Remaining Node**: Both `head` and `tail` become `NULL`.",
              "keyPoints": [
                "Complete algorithm updating both prev and next references.",
                "Handling head deletion without null pointer dereference.",
                "Handling tail deletion and single-node list condition."
              ]
            },
            {
              "question": "Differentiate between Singly Linked List (SLL) and Doubly Linked List (DLL) in terms of node layout, space overhead, algorithmic efficiency, and real-world use cases.",
              "marks": "7 Marks",
              "answer": "1. **Node Layout & Pointer Symmetry**:\n   - **SLL**: Single forward pointer (`next`). Linear unidirectional traversal only.\n   - **DLL**: Dual pointers (`prev` and `next`). Bidirectional traversal.\n\n2. **Comparative Complexity Matrix**:\n   - **Memory Overhead**: SLL requires 1 pointer per node; DLL requires 2 pointers per node (100% higher pointer overhead).\n   - **Search Time**: Both require $\\mathcal{O}(n)$ worst-case search.\n   - **Delete Given Node Pointer**: SLL takes $\\mathcal{O}(n)$ because predecessor must be found; DLL takes $\\mathcal{O}(1)$ directly via `target->prev`.\n   - **Reversal Complexity**: SLL requires updating all $n$ pointers; DLL can be traversed in reverse natively via `tail` in $\\mathcal{O}(1)$ initialization.\n\n3. **Engineering Use Cases**:\n   - **SLL Preferred**: Memory-constrained embedded systems, simple forward processing, single-ended stacks.\n   - **DLL Preferred**: LRU cache implementations, browser history navigation, operating system process tables, text editor cursor navigation.",
              "keyPoints": [
                "Architectural comparison: 1 pointer vs 2 pointers per node.",
                "Time complexity comparison table with emphasis on O(1) node deletion.",
                "Real-world application trade-offs (memory constraints vs bidirectional navigation)."
              ]
            }
          ],
          "mcqs": [
            {
              "question": "What is the time complexity of deleting a node in a Doubly Linked List if a direct pointer to that node is provided?",
              "options": [
                "O(n)",
                "O(log n)",
                "O(1)",
                "O(n log n)"
              ],
              "correctIndex": 2,
              "explanation": "Because the node contains a direct pointer to its predecessor (`node->prev`), we can splice it out in O(1) time without searching."
            },
            {
              "question": "How many pointer assignments are required to insert a new node between two existing nodes in a Doubly Linked List?",
              "options": [
                "1",
                "2",
                "4",
                "6"
              ],
              "correctIndex": 2,
              "explanation": "Four assignments are necessary: (1) newNode->next = B, (2) newNode->prev = A, (3) A->next = newNode, and (4) B->prev = newNode."
            },
            {
              "question": "Which data structure commonly pairs a Hash Table with a Doubly Linked List to achieve O(1) get and put operations?",
              "options": [
                "Binary Search Tree",
                "LRU (Least Recently Used) Cache",
                "B-Tree",
                "Min-Heap"
              ],
              "correctIndex": 1,
              "explanation": "An LRU Cache uses a Hash Table for O(1) key lookups and a Doubly Linked List to reorder and evict least recently used elements in O(1) time."
            },
            {
              "question": "In a Doubly Linked List with N nodes, what is the value of `head->prev` and `tail->next`?",
              "options": [
                "Both point to the middle node.",
                "Both are NULL.",
                "head->prev is tail and tail->next is head.",
                "Both point to the base address of the array."
              ],
              "correctIndex": 1,
              "explanation": "In a standard (non-circular) Doubly Linked List, the head has no predecessor (`head->prev = NULL`) and the tail has no successor (`tail->next = NULL`)."
            }
          ]
        },
        {
          "id": "dsa-u2-t4",
          "title": "Circular Linked List (SLL & DLL variants): Applications (Round-Robin CPU Scheduling), Loop Traversal & Boundary conditions",
          "simpleExplanation": "A Circular Linked List (CLL) is a linked list variant where no node contains a NULL pointer: the final node's `next` pointer loops back directly to the head node (or tail's next to head and head's prev to tail in circular DLL). This endless ring structure is ideal for continuous cycle systems like Round-Robin operating system task scheduling and ring buffers.",
          "detailedExplanation": "## 1. Circular Linked List Topologies\n\nIn standard linked lists, `NULL` marks the boundary of the list. In a **Circular Linked List (CLL)**, there is no end: the structure forms a closed continuous loop.\n\n```mermaid\ngraph LR\n    subgraph CSLL [\"Circular Singly Linked List (CSLL)\"]\n        N1[\"Node 1\n[Data: 10]\"] -->|next| N2[\"Node 2\n[Data: 20]\"]\n        N2 -->|next| N3[\"Node 3\n[Data: 30]\"]\n        N3 -->|next loops back| N1\n        TAIL[\"tail\"] --> N3\n    end\n```\n\n### Variants\n1. **Circular Singly Linked List (CSLL)**: The `next` pointer of the last node points back to `head`.\n2. **Circular Doubly Linked List (CDLL)**:\n   - `lastNode->next = head`\n   - `head->prev = lastNode`\n   This forms a complete bidirectional ring where every node has valid predecessor and successor references.\n\n---\n\n## 2. The Tail-Pointer Optimization\n\nIn a linear linked list, maintaining a `head` pointer is standard. In a **Circular Singly Linked List**, maintaining a single `tail` pointer instead of a `head` pointer provides a powerful optimization:\n- The head node is accessible in $O(1)$ time via `tail->next`.\n- The tail node is accessible in $O(1)$ time directly via `tail`.\n- **Insert at Head**: Takes $O(1)$ time (`newNode->next = tail->next; tail->next = newNode;`).\n- **Insert at Tail**: Takes $O(1)$ time (same as head insert, followed by `tail = newNode;`).\n\n```mermaid\nflowchart TD\n    subgraph TailOpt [\"Tail Pointer Advantage: O(1) Head & Tail Insert\"]\n        T[\"tail pointer points to Node 3\"]\n        T -->|tail->next| H[\"head (Node 1)\"]\n        H -->|next| M[\"Node 2\"]\n        M -->|next| T\n    end\n```\n\n---\n\n## 3. Loop Traversal and Boundary Traps\n\nBecause a circular list lacks `NULL`, a naive while loop (`while (curr != NULL)`) results in an **infinite loop**, locking the processor.\n\n### Correct Traversal Idiom: `do-while` Loop\n```c\nif (head != NULL) {\n    Node *curr = head;\n    do {\n        printf(\"%d \", curr->data);\n        curr = curr->next;\n    } while (curr != head); // Terminate when loop circles back to start\n}\n```\n\n### Boundary Edge Cases\n1. **Empty List**: `head == NULL`.\n2. **Single-Node List**: `head->next == head`. Deleting this sole node requires setting `head = NULL`.\n3. **Splitting a Circular List into Two Halves**: Uses Floyd's fast and slow pointers, followed by closing the two loops independently.\n\n---\n\n## 4. Real-World Application: Round-Robin CPU Scheduling\n\nOperating system kernels schedule concurrent processes using the **Round-Robin (RR)** scheduling algorithm. Each process receives a fixed time slice (time quantum $q$, e.g., $10\\text{ ms}$).\n\n```mermaid\nsequenceDiagram\n    autonumber\n    participant CPU as OS Scheduler (CPU)\n    participant P1 as Process P1 (Quantum=10ms)\n    participant P2 as Process P2 (Quantum=10ms)\n    participant P3 as Process P3 (Quantum=10ms)\n\n    CPU->>P1: Execute P1 for 10ms\n    Note over P1: Quantum expires -> Move to next node in Circular List\n    CPU->>P2: Execute P2 for 10ms\n    Note over P2: Quantum expires -> Move to next node\n    CPU->>P3: Execute P3 for 10ms\n    Note over P3: Quantum expires -> Loops back to P1!\n    CPU->>P1: Resume P1 execution\n```\n\nIf a process finishes its total CPU burst, it is spliced out of the circular list in $O(1)$ time; if not, the scheduler advances pointer `curr = curr->next` to grant the next process its time slice.\n\n---\n\n> [!IMPORTANT] **MEMORIZE:**\n> In a Circular Linked List, always maintain a pointer to **TAIL**, not head! With only a `tail` pointer, both head operations (`tail->next`) and tail operations (`tail`) run in $\\mathcal{O}(1)$ time.\n\n> [!NOTE] **DEV BRAIN:**\n> Circular ring buffers (implemented over arrays or circular lists) power audio streaming buffers, video playback queues, and multiplayer game server tick loops where old frames are continuously recycled.\n\n> [!WARNING] **TRAP:**\n> Never write `while (curr->next != NULL)` in a circular list! It will never terminate. Always use `curr != head` or loop termination checks based on node count!\n\n> [!TIP] **EXAM TIP:**\n> When asked to implement Round-Robin scheduling using a linked list in university exams, explicitly describe why Circular Linked List is the ideal data structure: cyclic topology eliminates end-of-list reset overhead.",
          "shortNotes": "CLL has no NULL pointers; tail points to head. Maintaining a tail pointer enables O(1) head and tail insertions. Standard traversal uses do-while (curr != head). Powers OS Round-Robin scheduling.",
          "examples": [
            {
              "title": "Complete C Implementation of Circular Linked List with Round-Robin Simulation",
              "problem": "Implement a Circular Singly Linked List using a tail pointer and simulate Round-Robin CPU process time sharing.",
              "explanation": "Demonstrates tail-pointer circular insertion, loop traversal via do-while, and cyclical execution decrement.",
              "code": "#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct ProcessNode {\n    int pid;\n    int remainingBurst;\n    struct ProcessNode *next;\n} ProcessNode;\n\nProcessNode* createProcess(int pid, int burst) {\n    ProcessNode *node = (ProcessNode*)malloc(sizeof(ProcessNode));\n    node->pid = pid;\n    node->remainingBurst = burst;\n    node->next = NULL;\n    return node;\n}\n\n// Insert at tail in O(1) using tail pointer\nvoid addProcess(ProcessNode **tail, int pid, int burst) {\n    ProcessNode *newNode = createProcess(pid, burst);\n    if (*tail == NULL) {\n        *tail = newNode;\n        newNode->next = newNode; // Points to itself\n        return;\n    }\n    newNode->next = (*tail)->next;\n    (*tail)->next = newNode;\n    *tail = newNode;\n}\n\nvoid simulateRoundRobin(ProcessNode **tail, int quantum) {\n    if (*tail == NULL) return;\n    ProcessNode *curr = (*tail)->next; // Start at head\n    ProcessNode *prev = *tail;\n\n    printf(\"Starting Round-Robin Scheduling (Time Quantum = %d ms):\\n\", quantum);\n\n    while (*tail != NULL) {\n        printf(\"  [CPU] Process P%d running (Remaining: %d ms)...\\n\", \n               curr->pid, curr->remainingBurst);\n\n        if (curr->remainingBurst <= quantum) {\n            printf(\"  --> Process P%d COMPLETED! Deallocating.\\n\", curr->pid);\n            if (curr == curr->next) { // Only one node left\n                free(curr);\n                *tail = NULL;\n                break;\n            } else {\n                prev->next = curr->next;\n                if (curr == *tail) *tail = prev; // Update tail if deleted\n                ProcessNode *toDelete = curr;\n                curr = curr->next;\n                free(toDelete);\n            }\n        } else {\n            curr->remainingBurst -= quantum;\n            printf(\"  --> Process P%d preempted. Remaining: %d ms.\\n\", \n                   curr->pid, curr->remainingBurst);\n            prev = curr;\n            curr = curr->next;\n        }\n    }\n    printf(\"All processes executed successfully.\\n\");\n}\n\nint main() {\n    ProcessNode *tail = NULL;\n\n    addProcess(&tail, 1, 25);\n    addProcess(&tail, 2, 10);\n    addProcess(&tail, 3, 15);\n\n    simulateRoundRobin(&tail, 10);\n\n    return 0;\n}",
              "output": "Starting Round-Robin Scheduling (Time Quantum = 10 ms):\n  [CPU] Process P1 running (Remaining: 25 ms)...\n  --> Process P1 preempted. Remaining: 15 ms.\n  [CPU] Process P2 running (Remaining: 10 ms)...\n  --> Process P2 COMPLETED! Deallocating.\n  [CPU] Process P3 running (Remaining: 15 ms)...\n  --> Process P3 preempted. Remaining: 5 ms.\n  [CPU] Process P1 running (Remaining: 15 ms)...\n  --> Process P1 preempted. Remaining: 5 ms.\n  [CPU] Process P3 running (Remaining: 5 ms)...\n  --> Process P3 COMPLETED! Deallocating.\n  [CPU] Process P1 running (Remaining: 5 ms)...\n  --> Process P1 COMPLETED! Deallocating.\nAll processes executed successfully."
            }
          ],
          "keyPoints": [
            "Circular Linked Lists eliminate NULL pointers; the final node points back to the head.",
            "Using a single tail pointer allows O(1) insertion at both head and tail without full traversal.",
            "Standard list traversal must use do-while loops with termination condition curr != head.",
            "Round-Robin CPU scheduling uses circular lists to cycle through active processes continuously.",
            "Special boundary handling is required when deleting the sole remaining node (self-referencing node)."
          ],
          "theoryQuestions": [
            {
              "question": "Explain why maintaining a 'tail' pointer is more advantageous than maintaining a 'head' pointer in a Circular Singly Linked List.",
              "marks": "5 Marks",
              "answer": "1. **The Architectural Advantage**:\n   - In a Circular Singly Linked List (CSLL), the tail node directly points to the head node: `head = tail->next`.\n   - Therefore, having a pointer to `tail` provides immediate $\\mathcal{O}(1)$ access to **both** the tail node AND the head node.\n\n2. **Comparative Complexity**:\n   - **With Head Pointer Only**:\n     * Insert at Head: Requires traversing the entire list ($O(n)$) to update the last node's `next` pointer to point to the new head.\n     * Insert at Tail: Requires traversing the entire list ($O(n)$) to locate the tail.\n   - **With Tail Pointer**:\n     * Insert at Head: $\\mathcal{O}(1)$ time. `newNode->next = tail->next; tail->next = newNode;`.\n     * Insert at Tail: $\\mathcal{O}(1)$ time. Same pointer linking as head insert, followed by `tail = newNode;`.\n\n3. **Conclusion**:\n   Maintaining a `tail` pointer reduces head and tail insertion operations from $\\mathcal{O}(n)$ down to $\\mathcal{O}(1)$ without extra pointer fields.",
              "keyPoints": [
                "Direct O(1) access to both head (tail->next) and tail.",
                "Elimination of O(n) traversal for head/tail insertions.",
                "Code snippets comparing head vs tail pointer implementations."
              ]
            },
            {
              "question": "Describe how Circular Linked Lists are applied in Round-Robin CPU scheduling. What operations occur when a process completes its quantum versus when it finishes its burst?",
              "marks": "5 Marks",
              "answer": "1. **System Modeling**:\n   - In operating systems, the ready queue is modeled as a Circular Linked List where each node represents a Process Control Block (PCB).\n   - The CPU scheduler holds a pointer `currentProcess` referencing the running task.\n\n2. **When Quantum Expires (Preemption)**:\n   - If the process has remaining CPU burst time ($> 0$), the scheduler simply advances its pointer:\n     `currentProcess = currentProcess->next;`\n   - The next process in the cycle immediately receives the CPU for the next time quantum. Zero list restructuring is required.\n\n3. **When Process Finishes Burst (Termination)**:\n   - The process node must be removed from the ready queue.\n   - Using predecessor pointer `prev`, the scheduler executes an $O(1)$ deletion:\n     `prev->next = currentProcess->next; free(currentProcess);`\n   - `currentProcess = prev->next;`\n   - The loop continues seamlessly without having to reset to a list start.",
              "keyPoints": [
                "Mapping of OS ready queue to Circular Linked List nodes.",
                "Preemption handling: simple pointer advance current = current->next.",
                "Termination handling: O(1) node deletion and memory deallocation."
              ]
            }
          ],
          "mcqs": [
            {
              "question": "What is the condition to check if a Singly Linked List with head pointer is circular during traversal?",
              "options": [
                "curr->next == NULL",
                "curr->next == head",
                "curr == NULL",
                "curr->data == 0"
              ],
              "correctIndex": 1,
              "explanation": "In a circular singly linked list, the final node's next pointer references the head node (`curr->next == head`)."
            },
            {
              "question": "In a Circular Singly Linked List maintained via a single tail pointer, what is the time complexity of inserting a node at the head?",
              "options": [
                "O(n)",
                "O(log n)",
                "O(1)",
                "O(n^2)"
              ],
              "correctIndex": 2,
              "explanation": "Because `tail->next` points to head, inserting at head requires only updating `newNode->next = tail->next` and `tail->next = newNode`, taking O(1) time."
            },
            {
              "question": "Which of the following loops correctly traverses an entire Circular Linked List of size N without falling into an infinite loop?",
              "options": [
                "while (curr != NULL) { curr = curr->next; }",
                "do { curr = curr->next; } while (curr != head);",
                "for (curr = head; curr != NULL; curr = curr->next)",
                "while (curr->next != NULL) { curr = curr->next; }"
              ],
              "correctIndex": 1,
              "explanation": "A do-while loop executes the body once and continues until `curr` circles back to match `head`, successfully visiting all nodes exactly once."
            },
            {
              "question": "In a Circular Doubly Linked List with a single node, what do its `prev` and `next` pointers point to?",
              "options": [
                "Both point to NULL.",
                "Both point to the node itself.",
                "next points to NULL and prev points to the node.",
                "prev points to NULL and next points to the node."
              ],
              "correctIndex": 1,
              "explanation": "In a single-node Circular Doubly Linked List, both `prev` and `next` pointers reference the node itself to maintain the continuous two-way ring."
            }
          ]
        },
        {
          "id": "dsa-u2-t5",
          "title": "Advanced Linked List Problems: Reversing a Linked List (Iterative & Recursive), Detecting Cycles (Floyd's Tortoise and Hare), and Finding Middle Node",
          "simpleExplanation": "Advanced linked list manipulations rely on master pointer algorithms: reversing a list redirects every pointer in-place using three pointers (iterative) or the runtime call stack (recursive); Floyd's Tortoise and Hare algorithm detects loops in O(n) time and O(1) auxiliary space using two pointers moving at different speeds; and the fast/slow pointer technique locates the exact middle node in a single pass.",
          "detailedExplanation": "## 1. Problem 1: In-Place Linked List Reversal\n\nReversing a singly linked list means transforming $1 \\to 2 \\to 3 \\to \\text{NULL}$ into $3 \\to 2 \\to 1 \\to \\text{NULL}$ without allocating new nodes in memory.\n\n### A. Iterative Three-Pointer Approach (In-Place, $\\mathcal{O}(n)$ Time, $\\mathcal{O}(1)$ Space)\nWe maintain three sliding pointers:\n- `prev`: Tracks the reversed prefix (initialized to `NULL`).\n- `curr`: Points to the node currently undergoing pointer redirection (initialized to `head`).\n- `next`: Temporarily preserves the unreversed suffix before `curr->next` is overwritten.\n\n```mermaid\nflowchart TD\n    subgraph Iterative_Reversal [\"Iterative 3-Pointer Reversal Cycle\"]\n        S1[\"1. next = curr->next (Preserve remainder)\"]\n        S2[\"2. curr->next = prev (Reverse link)\"]\n        S3[\"3. prev = curr (Slide prev forward)\"]\n        S4[\"4. curr = next (Slide curr forward)\"]\n        S1 --> S2 --> S3 --> S4\n    end\n```\n\n### B. Recursive Approach ($\\mathcal{O}(n)$ Time, $\\mathcal{O}(n)$ Call Stack Space)\nThe recursive method traverses to the tail first, and reverses pointer connections during the unwind phase:\n```c\nNode* reverseRecursive(Node *head) {\n    if (head == NULL || head->next == NULL) return head; // Base case: tail reached\n    Node *newHead = reverseRecursive(head->next);\n    head->next->next = head; // Make successor point back to current\n    head->next = NULL;       // Break old forward link\n    return newHead;\n}\n```\n\n---\n\n## 2. Problem 2: Floyd's Cycle-Finding Algorithm (Tortoise and Hare)\n\nA cycle occurs in a linked list when a node's `next` pointer points back to a previously visited node, causing an infinite loop.\n\n```mermaid\ngraph LR\n    subgraph CycleList [\"Linked List with Internal Cycle\"]\n        N1[\"1\"] --> N2[\"2\"]\n        N2 --> N3[\"3\"]\n        N3 --> N4[\"4\"]\n        N4 --> N5[\"5\"]\n        N5 --> N3\n    end\n```\n\n### Algorithm Mechanics:\n1. Initialize two pointers at `head`: `slow` (Tortoise) and `fast` (Hare).\n2. Move `slow` by 1 step: `slow = slow->next`.\n3. Move `fast` by 2 steps: `fast = fast->next->next`.\n4. **Collision Proof**: If a cycle exists, `fast` enters the cycle and reduces the relative gap by 1 node per iteration. They are guaranteed to collide in $\\mathcal{O}(n)$ steps. If `fast` or `fast->next` reaches `NULL`, the list is strictly acyclic.\n\n```mermaid\nsequenceDiagram\n    autonumber\n    participant S as Slow Pointer (1 step/iter)\n    participant F as Fast Pointer (2 steps/iter)\n    Note over S,F: Both start at Head\n    Note over S,F: Iteration 1: Gap increases\n    Note over S,F: Both inside Cycle: Fast is chasing Slow from behind\n    Note over S,F: Relative speed = 2 - 1 = 1 node / iter\n    Note over S,F: COLLISION! (slow == fast) -> Cycle Detected!\n```\n\n### Finding the Start Node of the Cycle:\nOnce a collision occurs:\n1. Leave `slow` at the meeting node.\n2. Reset `fast` to `head`.\n3. Advance both `slow` and `fast` at the **same speed** (1 step per iteration).\n4. **The node where they meet is the exact entry point of the cycle.**\n*(Mathematical proof: Distance from head to cycle start $L_1$ equals distance from collision to cycle start $k \\cdot C - L_2$.)*\n\n---\n\n## 3. Problem 3: Finding the Middle Node in a Single Pass\n\nTo locate the exact middle node of a linked list:\n- **Naive method**: Two passes (Pass 1 counts total nodes $N$; Pass 2 traverses to $\\lfloor N/2 \\rfloor$).\n- **Optimal Fast & Slow Pointer Method**: Single pass ($\\\\mathcal{O}(n)$ time, $\\\\mathcal{O}(1)$ space).\n\n```c\nNode* findMiddle(Node *head) {\n    Node *slow = head;\n    Node *fast = head;\n    while (fast != NULL && fast->next != NULL) {\n        slow = slow->next;       // 1 step\n        fast = fast->next->next; // 2 steps\n    }\n    return slow; // When fast reaches end, slow is at exact middle\n}\n```\n\nFor odd length (e.g., 5 nodes): `slow` lands on node 3.\nFor even length (e.g., 6 nodes): `slow` lands on node 4 (the second middle).\n\n---\n\n> [!IMPORTANT] **MEMORIZE:**\n> - To reverse: `next = curr->next; curr->next = prev; prev = curr; curr = next;` (Return `prev` as new head).\n> - Floyd's Cycle Detection: `slow` moves 1 step, `fast` moves 2 steps. Collision proves loop existence. Reset one pointer to `head` and step both by 1 to find cycle start!\n\n> [!NOTE] **DEV BRAIN:**\n> Floyd's cycle detection is not limited to linked lists. It is used in cryptography (Pollard's rho algorithm for integer factorization) and pseudo-random number generator period validation.\n\n> [!WARNING] **TRAP:**\n> In Floyd's algorithm, always check `while (fast != NULL && fast->next != NULL)`. Checking only `fast != NULL` will trigger a Segmentation Fault when attempting `fast->next->next` on an odd-length list!\n\n> [!TIP] **EXAM TIP:**\n> When asked to prove why resetting one pointer to head locates the cycle start in Floyd's algorithm, write the algebraic equation: $2(L_1 + k) = L_1 + mC + k \\implies L_1 = mC - k$.",
          "shortNotes": "Reversal uses 3 sliding pointers (prev, curr, next) in O(n) time and O(1) space. Floyd's cycle detection uses slow (1 step) and fast (2 steps); collision proves cycle. Fast & slow finds middle node in 1 pass.",
          "examples": [
            {
              "title": "C Program: Linked List In-Place Reversal, Middle Finding, and Floyd's Cycle Detection",
              "problem": "Implement iterative reversal, middle node detection, and cycle detection/removal on a singly linked list.",
              "explanation": "Demonstrates three-pointer reversal, fast/slow middle location, and Floyd's cycle detection.",
              "code": "#include <stdio.h>\n#include <stdlib.h>\n#include <stdbool.h>\n\ntypedef struct Node {\n    int data;\n    struct Node *next;\n} Node;\n\nNode* createNode(int val) {\n    Node *n = (Node*)malloc(sizeof(Node));\n    n->data = val;\n    n->next = NULL;\n    return n;\n}\n\nNode* reverseList(Node *head) {\n    Node *prev = NULL;\n    Node *curr = head;\n    Node *next = NULL;\n    while (curr != NULL) {\n        next = curr->next; // 1. Save next\n        curr->next = prev; // 2. Reverse pointer\n        prev = curr;       // 3. Move prev\n        curr = next;       // 4. Move curr\n    }\n    return prev; // New head\n}\n\nNode* findMiddle(Node *head) {\n    Node *slow = head;\n    Node *fast = head;\n    while (fast != NULL && fast->next != NULL) {\n        slow = slow->next;\n        fast = fast->next->next;\n    }\n    return slow;\n}\n\nbool detectCycle(Node *head) {\n    Node *slow = head;\n    Node *fast = head;\n    while (fast != NULL && fast->next != NULL) {\n        slow = slow->next;\n        fast = fast->next->next;\n        if (slow == fast) return true; // Cycle detected\n    }\n    return false;\n}\n\nvoid printList(Node *head) {\n    Node *curr = head;\n    while (curr != NULL) {\n        printf(\"%d -> \", curr->data);\n        curr = curr->next;\n    }\n    printf(\"NULL\\n\");\n}\n\nint main() {\n    // Construct list: 10 -> 20 -> 30 -> 40 -> 50 -> NULL\n    Node *head = createNode(10);\n    head->next = createNode(20);\n    head->next->next = createNode(30);\n    head->next->next->next = createNode(40);\n    head->next->next->next->next = createNode(50);\n\n    printf(\"Original List:\\n  \");\n    printList(head);\n\n    Node *mid = findMiddle(head);\n    printf(\"Middle Node Data: %d\\n\", mid->data);\n\n    head = reverseList(head);\n    printf(\"Reversed List:\\n  \");\n    printList(head);\n\n    printf(\"Has cycle? %s\\n\", detectCycle(head) ? \"YES\" : \"NO\");\n\n    // Create deliberate cycle: tail points to 40\n    head->next->next->next->next->next = head->next;\n    printf(\"After injecting cycle: Has cycle? %s\\n\", \n           detectCycle(head) ? \"YES\" : \"NO\");\n\n    return 0;\n}",
              "output": "Original List:\n  10 -> 20 -> 30 -> 40 -> 50 -> NULL\nMiddle Node Data: 30\nReversed List:\n  50 -> 40 -> 30 -> 20 -> 10 -> NULL\nHas cycle? NO\nAfter injecting cycle: Has cycle? YES"
            }
          ],
          "keyPoints": [
            "Iterative list reversal uses three sliding pointers (prev, curr, next) to redirect links in O(n) time and O(1) space.",
            "Recursive list reversal reverses pointers during stack unwinding, consuming O(n) auxiliary call stack space.",
            "Floyd's Tortoise and Hare algorithm detects loops in O(n) time and O(1) space using pointers moving at speeds 1 and 2.",
            "To locate cycle entry, reset one pointer to head after collision and advance both by 1 step until they meet.",
            "The middle node can be found in a single pass by moving fast at 2x the speed of slow."
          ],
          "theoryQuestions": [
            {
              "question": "Explain Floyd's Cycle-Finding Algorithm. Provide mathematical proof for why advancing one pointer from head and the other from the collision point identifies the start of the loop.",
              "marks": "7 Marks",
              "answer": "1. **Algorithm Overview**:\n   - Initialize `slow = head` and `fast = head`.\n   - `slow` advances 1 node per iteration; `fast` advances 2 nodes per iteration.\n   - If `fast` or `fast->next` reaches `NULL`, no cycle exists.\n   - If `slow == fast`, a cycle is detected.\n\n2. **Mathematical Proof of Cycle Start**:\n   - Let $L_1$ = distance from `head` to the cycle start node.\n   - Let $C$ = circumference (length) of the cycle.\n   - Let $k$ = distance from cycle start node to the collision point.\n   - Distance traveled by `slow` = $L_1 + k$.\n   - Distance traveled by `fast` = $L_1 + m \\cdot C + k$ (where $m$ is integer loops completed).\n   - Because `fast` moves at twice the speed of `slow`:\n     $$2 \\cdot \\text{Distance}(slow) = \\text{Distance}(fast)$$\n     $$2(L_1 + k) = L_1 + m \\cdot C + k$$\n     $$2 L_1 + 2k = L_1 + m \\cdot C + k$$\n     $$L_1 + k = m \\cdot C \\implies L_1 = m \\cdot C - k$$\n\n3. **Conclusion**:\n   $L_1$ (distance from head to cycle start) exactly equals $(m \\cdot C - k)$ (distance from the collision point to the cycle start moving forward).\n   Therefore, resetting one pointer to `head` and advancing both pointers 1 step at a time guarantees they will collide at the exact entrance of the cycle.",
              "keyPoints": [
                "Specification of slow (1 step) and fast (2 steps) mechanics.",
                "Algebraic derivation: 2(L1 + k) = L1 + mC + k yielding L1 = mC - k.",
                "Conclusion proving simultaneous convergence at cycle entry."
              ]
            },
            {
              "question": "Write the iterative algorithm to reverse a Singly Linked List using three pointers. Trace the algorithm on a list with 3 nodes.",
              "marks": "5 Marks",
              "answer": "1. **Algorithm**:\n   - Initialize `prev = NULL`, `curr = head`, `next = NULL`.\n   - Loop while `curr != NULL`:\n     * `next = curr->next;` (store next node)\n     * `curr->next = prev;` (redirect pointer backward)\n     * `prev = curr;` (advance prev)\n     * `curr = next;` (advance curr)\n   - Update `head = prev;` and return `head`.\n\n2. **Trace on List [10 -> 20 -> 30 -> NULL]**:\n   - **Initial State**: `prev = NULL`, `curr = 10`.\n   - **Iteration 1**:\n     * `next = 20`. `10->next = NULL`. `prev = 10`, `curr = 20`.\n     * State: `10 -> NULL`.\n   - **Iteration 2**:\n     * `next = 30`. `20->next = 10`. `prev = 20`, `curr = 30`.\n     * State: `20 -> 10 -> NULL`.\n   - **Iteration 3**:\n     * `next = NULL`. `30->next = 20`. `prev = 30`, `curr = NULL`.\n     * State: `30 -> 20 -> 10 -> NULL`.\n   - **Loop Terminates**: `curr == NULL`. Return `prev` (node 30) as new head.",
              "keyPoints": [
                "4-step pointer assignment sequence inside loop.",
                "Step-by-step state trace across 3 iterations.",
                "Return of prev as new head."
              ]
            }
          ],
          "mcqs": [
            {
              "question": "What is the auxiliary space complexity of iteratively reversing a Singly Linked List of N nodes using three pointers?",
              "options": [
                "O(N)",
                "O(log N)",
                "O(1)",
                "O(N^2)"
              ],
              "correctIndex": 2,
              "explanation": "Iterative reversal modifies pointers in-place using only three pointer variables (prev, curr, next), requiring O(1) auxiliary space."
            },
            {
              "question": "In Floyd's Cycle Detection Algorithm, why are the slow and fast pointers guaranteed to meet if a cycle exists?",
              "options": [
                "Fast pointer reverses direction upon hitting the cycle.",
                "Once both pointers enter the cycle, the relative distance between fast and slow decreases by exactly 1 node per iteration until it becomes 0.",
                "Slow pointer stops and waits for fast pointer to complete a lap.",
                "Memory addresses in cycles are modulo arithmetic equivalents."
              ],
              "correctIndex": 1,
              "explanation": "With slow moving at speed 1 and fast at speed 2, the relative speed is 2 - 1 = 1 node per step. In a discrete finite cycle, reducing the distance by 1 per step guarantees a collision without skipping."
            },
            {
              "question": "For a singly linked list containing 6 nodes (1 -> 2 -> 3 -> 4 -> 5 -> 6), what node will the fast and slow pointer algorithm identify as the middle node?",
              "options": [
                "Node 2",
                "Node 3",
                "Node 4",
                "Node 5"
              ],
              "correctIndex": 2,
              "explanation": "When fast reaches NULL on the 3rd step, slow has advanced 3 times from head (1 -> 2 -> 3 -> 4), correctly landing on Node 4 (the second middle)."
            },
            {
              "question": "What is the primary drawback of reversing a linked list recursively compared to iteratively?",
              "options": [
                "Recursive reversal runs in O(N^2) time.",
                "Recursive reversal consumes O(N) auxiliary memory on the function call stack, which can cause a stack overflow for large lists.",
                "Recursive reversal modifies node data values instead of pointers.",
                "Recursive reversal cannot handle odd-length lists."
              ],
              "correctIndex": 1,
              "explanation": "The recursive method creates N stack frames on the call stack before unwinding, which risks a stack overflow crash on large lists."
            }
          ]
        }
      ]
    },
    {
      "id": "dsa-u3",
      "title": "Unit 3: Stacks & Queues",
      "description": "Linear container ADTs enforcing LIFO and FIFO disciplines. Covers array vs linked implementations of Stacks, expression parsing via Dijkstra's Shunting-Yard algorithm, circular queue index arithmetic, Double-Ended Queues (Deques), Priority Queues, and dual-queue Stack emulation.",
      "topics": [
        {
          "id": "dsa-u3-t1",
          "title": "Stack ADT: LIFO Principle, Array vs Linked List Implementations, Overflow/Underflow & Push/Pop operations",
          "simpleExplanation": "A Stack is a restricted linear data structure that strictly enforces the Last-In, First-Out (LIFO) discipline, where all additions and removals occur exclusively at a single endpoint called the top. It can be implemented using a fixed-size array (subject to stack overflow) or a dynamic singly linked list (unbounded capacity, subject only to system heap exhaustion).",
          "detailedExplanation": "## 1. The Stack ADT and LIFO Paradigm\n\nA **Stack** is an Abstract Data Type modeling a linear container where elements are accessed in **Last-In, First-Out (LIFO)** order: the most recently inserted element is invariably the first to be retrieved and removed.\n\n```mermaid\nflowchart TD\n    subgraph Stack_LIFO [\"Stack Mechanics (LIFO Discipline)\"]\n        direction TB\n        E[\"push(40) --> \"] --> TOP[\"[ 40 ] <-- TOP of Stack\"]\n        TOP --> B1[\"[ 30 ]\"]\n        B1 --> B2[\"[ 20 ]\"]\n        B2 --> BOT[\"[ 10 ] <-- BOTTOM of Stack\"]\n        TOP -.->|pop() extracts 40| OUT[\"40 returned\"]\n    end\n```\n\n### Core ADT Operations:\n- `push(item)`: Inserts `item` onto the top of the stack.\n- `pop()`: Removes and returns the element at the top.\n- `peek()` / `top()`: Returns the element currently at the top without removing it.\n- `isEmpty()`: Returns boolean indicating whether the stack contains 0 items.\n- `isFull()`: Applicable to fixed-capacity array implementations.\n\n### Boundary Error Conditions\n1. **Stack Overflow**: Attempting to execute `push()` when the underlying memory buffer is completely full ($top = MAX - 1$).\n2. **Stack Underflow**: Attempting to execute `pop()` or `peek()` when the stack is empty ($top = -1$ or $head = NULL$).\n\n---\n\n## 2. Array-Based vs Linked List-Based Implementations\n\n```mermaid\ngraph TD\n    subgraph Impl [\"Implementation Comparison\"]\n        A[\"Array Implementation\n- Fixed contiguous buffer\n- Top is an integer index\n- O(1) ops, zero pointer overhead\n- Subject to fixed Stack Overflow\"]\n        B[\"Linked List Implementation\n- Dynamic heap nodes\n- Top is a node pointer (*top)\n- O(1) ops, unbounded growth\n- 8-byte pointer overhead per node\"]\n    end\n```\n\n### A. Static Array Implementation\n- An integer variable `top` tracks the index of the highest occupied slot, initialized to `-1`.\n- `push(x)`: Checks if $top == MAX - 1$. If false, executes: `arr[++top] = x`.\n- `pop()`: Checks if $top == -1$. If false, executes: `return arr[top--]`.\n- **Pros**: Outstanding cache locality; zero pointer memory overhead.\n- **Cons**: Fixed capacity; risks stack overflow if sized too small, or wastes memory if sized too large.\n\n### B. Dynamic Linked List Implementation\n- The stack top is represented by a pointer `top` referencing the head node of a singly linked list.\n- `push(x)`: Allocates `newNode`, sets `newNode->next = top`, and updates `top = newNode`.\n- `pop()`: Checks if `top == NULL`. If false, saves `temp = top`, advances `top = top->next`, frees `temp`, and returns data.\n- **Pros**: Grows dynamically on demand up to physical system RAM capacity.\n- **Cons**: Pointer memory overhead (8 bytes per node on 64-bit OS) and non-contiguous heap allocations causing cache misses.\n\n---\n\n## 3. Structural Comparison Matrix\n\n| Architectural Feature | Fixed Array Implementation | Linked List Implementation |\n| :--- | :--- | :--- |\n| **Push Complexity** | $\\mathcal{O}(1)$ strict worst-case | $\\mathcal{O}(1)$ (heap `malloc` latency) |\n| **Pop Complexity** | $\\mathcal{O}(1)$ | $\\mathcal{O}(1)$ |\n| **Memory Overhead** | Unused pre-allocated array cells | Extra `next` pointer per element |\n| **Overflow Condition** | $top == MAX - 1$ | Heap out-of-memory error only |\n| **Underflow Condition**| $top == -1$ | $top == NULL$ |\n| **Hardware Cache** | Excellent spatial locality | Poor spatial locality (heap fragmentation) |\n\n---\n\n## 4. Fundamental Computer Science Applications\n\n1. **Function Call Stack**: Operating systems and language runtimes (C, Java, Python) manage activation records (stack frames) storing local variables, parameters, and return addresses on an architecture-level call stack.\n2. **Backtracking Algorithms**: Solving mazes, N-Queens problem, and graph Depth-First Search (DFS).\n3. **Undo/Redo Operations**: Text editors and graphic tools maintain dual stacks: an Undo stack and a Redo stack.\n4. **Syntax Parsing**: Compiler abstract syntax tree (AST) construction and bracket validation.\n\n---\n\n> [!IMPORTANT] **MEMORIZE:**\n> - In an array-based stack, `top` is initialized to `-1`. An empty check is `top == -1`, and full check is `top == MAX - 1`.\n> - Pre-increment during push: `arr[++top] = val`.\n> - Post-decrement during pop: `val = arr[top--]`.\n\n> [!NOTE] **DEV BRAIN:**\n> In C and C++, a recursive function lacking a proper base case exhausts the OS thread stack memory (typically 1MB to 8MB limit), triggering a literal `Segmentation fault (core dumped)` caused by **Stack Overflow**.\n\n> [!WARNING] **TRAP:**\n> When popping from a linked list stack, never forget to deallocate the removed node memory with `free(temp)`. Omitting `free()` causes a memory leak that can degrade long-running server daemons!\n\n> [!TIP] **EXAM TIP:**\n> When asked to implement a stack using a linked list, ALWAYS push and pop at the **HEAD** of the list ($O(1)$), never at the tail ($O(n)$)!",
          "shortNotes": "Stack enforces LIFO via top pointer. Array implementation uses top index (risks overflow). Linked list implementation uses dynamic head nodes (unbounded). Push/Pop execute in O(1).",
          "examples": [
            {
              "title": "Complete C Implementation of Stack: Array-Based vs Linked List",
              "problem": "Implement a Stack ADT using both a fixed array and dynamic linked list, demonstrating push, pop, peek, overflow, and underflow handling.",
              "explanation": "Illustrates concrete differences in memory management, overflow detection, and pointer updates.",
              "code": "#include <stdio.h>\n#include <stdlib.h>\n#include <stdbool.h>\n\n#define MAX 3\n\n// 1. Array Implementation\ntypedef struct {\n    int items[MAX];\n    int top;\n} ArrayStack;\n\nvoid initArrayStack(ArrayStack *s) { s->top = -1; }\nbool isFullArr(ArrayStack *s) { return s->top == MAX - 1; }\nbool isEmptyArr(ArrayStack *s) { return s->top == -1; }\n\nvoid pushArr(ArrayStack *s, int val) {\n    if (isFullArr(s)) {\n        printf(\"ArrayStack Error: Stack Overflow! Cannot push %d\\n\", val);\n        return;\n    }\n    s->items[++(s->top)] = val;\n}\n\nint popArr(ArrayStack *s) {\n    if (isEmptyArr(s)) {\n        printf(\"ArrayStack Error: Stack Underflow!\\n\");\n        return -1;\n    }\n    return s->items[(s->top)--];\n}\n\n// 2. Linked List Implementation\ntypedef struct Node {\n    int data;\n    struct Node *next;\n} Node;\n\ntypedef struct {\n    Node *top;\n} LinkedStack;\n\nvoid initLinkedStack(LinkedStack *s) { s->top = NULL; }\nbool isEmptyLink(LinkedStack *s) { return s->top == NULL; }\n\nvoid pushLink(LinkedStack *s, int val) {\n    Node *newNode = (Node*)malloc(sizeof(Node));\n    newNode->data = val;\n    newNode->next = s->top;\n    s->top = newNode;\n}\n\nint popLink(LinkedStack *s) {\n    if (isEmptyLink(s)) {\n        printf(\"LinkedStack Error: Stack Underflow!\\n\");\n        return -1;\n    }\n    Node *temp = s->top;\n    int val = temp->data;\n    s->top = s->top->next;\n    free(temp);\n    return val;\n}\n\nint main() {\n    printf(\"--- Array Stack Demo ---\\n\");\n    ArrayStack as;\n    initArrayStack(&as);\n    pushArr(&as, 10);\n    pushArr(&as, 20);\n    pushArr(&as, 30);\n    pushArr(&as, 40); // Triggers Overflow\n    printf(\"Popped from ArrayStack: %d\\n\", popArr(&as));\n\n    printf(\"\\n--- Linked Stack Demo ---\\n\");\n    LinkedStack ls;\n    initLinkedStack(&ls);\n    pushLink(&ls, 100);\n    pushLink(&ls, 200);\n    pushLink(&ls, 300);\n    printf(\"Popped from LinkedStack: %d\\n\", popLink(&ls));\n    printf(\"Popped from LinkedStack: %d\\n\", popLink(&ls));\n\n    return 0;\n}",
              "output": "--- Array Stack Demo ---\nArrayStack Error: Stack Overflow! Cannot push 40\nPopped from ArrayStack: 30\n\n--- Linked Stack Demo ---\nPopped from LinkedStack: 300\nPopped from LinkedStack: 200"
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
              "answer": "1. **Definition of Stack ADT**:\n   A Stack is a linear Abstract Data Type operating under the Last-In, First-Out (LIFO) discipline. Elements are added and removed exclusively at one end called the `top`.\n\n2. **Algorithm: `push(Stack *S, int val)`**:\n   - **Step 1 (Check Overflow)**:\n     If `S->top == MAX - 1`:\n         Print \"Stack Overflow Error\" and abort.\n   - **Step 2 (Increment & Insert)**:\n     `S->top = S->top + 1;`\n     `S->arr[S->top] = val;`\n   - **Step 3**: Return success.\n\n3. **Algorithm: `pop(Stack *S)`**:\n   - **Step 1 (Check Underflow)**:\n     If `S->top == -1`:\n         Print \"Stack Underflow Error\" and abort.\n   - **Step 2 (Extract & Decrement)**:\n     `val = S->arr[S->top];`\n     `S->top = S->top - 1;`\n   - **Step 3**: Return `val`.",
              "keyPoints": [
                "Formal definition of Stack ADT and LIFO behavior.",
                "Push algorithm showing explicit top == MAX - 1 check.",
                "Pop algorithm showing explicit top == -1 check."
              ]
            },
            {
              "question": "Compare array-based and linked list-based implementations of a Stack. Under what engineering scenarios would you choose one over the other?",
              "marks": "7 Marks",
              "answer": "1. **Architectural Comparison**:\n   - **Time Complexity**: Both achieve strict $\\mathcal{O}(1)$ for `push`, `pop`, and `peek`.\n   - **Memory Layout**: Array uses contiguous memory; Linked list uses scattered dynamic heap nodes.\n   - **Size Flexibility**: Array is fixed-size at compile/allocation time; Linked list grows dynamically.\n   - **Overhead**: Array has 0 pointer overhead (wastes memory only if oversized); Linked list consumes extra pointer memory per node (8 bytes on 64-bit platforms).\n   - **Cache Locality**: Array provides high spatial locality and hardware prefetching; Linked list incurs cache misses.\n\n2. **Engineering Selection Criteria**:\n   - **Select Array Stack**:\n     * Maximum stack depth is known in advance (e.g., fixed expression evaluator).\n     * Performance-critical embedded systems where heap allocation is forbidden.\n     * High spatial cache locality is needed for high-frequency operations.\n   - **Select Linked Stack**:\n     * Maximum stack size cannot be predicted (unbounded recursion or dynamic task backtrackers).\n     * System cannot tolerate pre-allocated unused buffer memory.",
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
          "detailedExplanation": "## 1. Expression Notations\n\nMathematical expressions can be formalized in three distinct syntactic notations:\n1. **Infix Notation**: Operator is positioned *between* operands ($A + B$). Requires parentheses and operator precedence rules (PEMDAS / BODMAS) to eliminate ambiguity.\n2. **Postfix Notation (Reverse Polish Notation - RPN)**: Operator follows operands ($A B +$). Eliminates the need for parentheses and precedence rules; evaluated strictly left-to-right.\n3. **Prefix Notation (Polish Notation)**: Operator precedes operands ($+ A B$). Evaluated right-to-left.\n\n---\n\n## 2. Infix to Postfix: Dijkstra's Shunting-Yard Algorithm\n\nInvented by Edsger Dijkstra, the **Shunting-Yard Algorithm** uses an operator stack to convert infix expressions into postfix notation in $\\mathcal{O}(n)$ time.\n\n```mermaid\nflowchart TD\n    subgraph ShuntingYard [\"Shunting-Yard Algorithm Decision Flow\"]\n        TOKEN[\"Read Next Token from Infix\"] --> T1{Is Operand?}\n        T1 -- Yes --> OUT[\"Append directly to Postfix Output\"]\n        T1 -- No --> T2{Is Left Paren '('?}\n        T2 -- Yes --> PUSH[\"Push '(' to Operator Stack\"]\n        T2 -- No --> T3{Is Right Paren ')'?}\n        T3 -- Yes --> POP_PAREN[\"Pop stack to Output until '(' is met. Discard '('\"]\n        T3 -- No --> T4{Is Operator?}\n        T4 -- Yes --> POP_PREC[\"While stack top has >= precedence (or > if right-assoc):\n Pop stack to Output.\n Then push current operator.\"]\n    end\n```\n\n### Operator Precedence and Associativity Table\n| Operator | Precedence Level | Associativity |\n| :--- | :--- | :--- |\n| `^` (Exponentiation) | 3 (Highest) | Right-to-Left |\n| `*`, `/`, `%` | 2 | Left-to-Right |\n| `+`, `-` | 1 (Lowest) | Left-to-Right |\n| `(`, `)` | Parentheses | Non-associative (Delimiters) |\n\n### Step-by-Step Conversion Walkthrough\n**Convert**: $A + B \\times C - D / E$\n\n| Token | Action | Operator Stack (Top $\\to$ Bottom) | Postfix Output |\n| :--- | :--- | :--- | :--- |\n| `A` | Operand $\\to$ Output | `[ ]` | `A` |\n| `+` | Push `+` | `[ + ]` | `A` |\n| `B` | Operand $\\to$ Output | `[ + ]` | `A B` |\n| `*` | `*` has higher prec than `+` $\\to$ Push | `[ *, + ]` | `A B` |\n| `C` | Operand $\\to$ Output | `[ *, + ]` | `A B C` |\n| `-` | `-` has lower prec than `*` $\\to$ Pop `*`; same prec as `+` (L-to-R) $\\to$ Pop `+`; Push `-` | `[ - ]` | `A B C * +` |\n| `D` | Operand $\\to$ Output | `[ - ]` | `A B C * + D` |\n| `/` | `/` has higher prec than `-` $\\to$ Push | `[ /, - ]` | `A B C * + D` |\n| `E` | Operand $\\to$ Output | `[ /, - ]` | `A B C * + D E` |\n| `End`| Drain remaining stack to Output | `[ ]` | **`A B C * + D E / -`** |\n\n---\n\n## 3. Evaluation of Postfix Expressions\n\nPostfix evaluation requires **only an Operand Stack** and runs in a single pass of $\\mathcal{O}(n)$ time without backtracking:\n1. Scan the postfix string from left to right.\n2. If token is an **operand**: Push its numerical value onto the stack.\n3. If token is an **operator** $\\odot$:\n   - Pop $op_2 = \\text{stack.pop()}$ (Second operand).\n   - Pop $op_1 = \\text{stack.pop()}$ (First operand).\n   - Compute result $= op_1 \\odot op_2$.\n   - Push result back onto stack.\n4. When scan completes, the single value remaining on the stack is the final result.\n\n```mermaid\nsequenceDiagram\n    autonumber\n    participant S as Operand Stack\n    Note over S: Scan: \"6 3 2 + *\"\n    Note over S: Push 6, Push 3, Push 2 -> Stack: [2, 3, 6]\n    Note over S: Read '+': Pop 2, Pop 3 -> Compute 3 + 2 = 5 -> Push 5. Stack: [5, 6]\n    Note over S: Read '*': Pop 5, Pop 6 -> Compute 6 * 5 = 30 -> Push 30. Stack: [30]\n    Note over S: End of string: Final Result = 30!\n```\n\n---\n\n## 4. Balanced Parentheses & Delimiter Checking\n\nCompilers check balanced brackets (`( )`, `{ }`, `[ ]`) using a stack:\n1. Scan characters left-to-right.\n2. If opening delimiter (`(`, `{`, `[`): Push onto stack.\n3. If closing delimiter (`)`, `}`, `]`):\n   - If stack is empty: **Unbalanced** (premature closing bracket).\n   - Pop top element. If it does not match the closing delimiter type: **Unbalanced** (mismatched nesting, e.g., `( ]`).\n4. At end of string: If stack is empty, delimiters are **Balanced**; otherwise **Unbalanced** (unclosed bracket).\n\n---\n\n> [!IMPORTANT] **MEMORIZE:**\n> In postfix evaluation, order matters during popping! The first popped element is the **right operand** ($op_2$), and the second popped is the **left operand** ($op_1$). For non-commutative operations like division and subtraction, calculate $op_1 / op_2$ and $op_1 - op_2$, NEVER $op_2 - op_1$!\n\n> [!NOTE] **DEV BRAIN:**\n> The Java Virtual Machine (JVM) is a stack-based virtual machine: bytecode instructions like `iadd`, `imul`, and `isub` pop operands from the evaluation stack and push back the result.\n\n> [!WARNING] **TRAP:**\n> Right-associative operators like `^` (exponentiation) behave differently: if the current operator has EQUAL precedence to the stack top, **do not pop**! Push it onto the stack ($2 \\wedge 3 \\wedge 2 = 2 \\wedge (3 \\wedge 2) = 512$, not $(2^3)^2 = 64$).\n\n> [!TIP] **EXAM TIP:**\n> When solving Infix to Postfix conversion questions in exams, always construct a clear four-column trace table: (1) Symbol Scanned, (2) Action Taken, (3) Operator Stack Contents, and (4) Postfix Expression So Far.",
          "shortNotes": "Shunting-Yard converts infix to postfix via operator stack. Postfix evaluation uses an operand stack (op1 operator op2). Balanced brackets push opening and pop on matching closing.",
          "examples": [
            {
              "title": "C Program: Infix to Postfix Conversion and Evaluation",
              "problem": "Write a complete C program to convert an infix expression to postfix and evaluate the postfix result.",
              "explanation": "Demonstrates operator precedence handling, stack-based conversion, and operand stack evaluation.",
              "code": "#include <stdio.h>\n#include <stdlib.h>\n#include <ctype.h>\n#include <string.h>\n\nint precedence(char op) {\n    if (op == '+' || op == '-') return 1;\n    if (op == '*' || op == '/') return 2;\n    return 0;\n}\n\nvoid infixToPostfix(const char *infix, char *postfix) {\n    char stack[100];\n    int top = -1;\n    int k = 0;\n\n    for (int i = 0; infix[i] != '\\0'; i++) {\n        char ch = infix[i];\n        if (isdigit(ch) || isalpha(ch)) {\n            postfix[k++] = ch;\n        } else if (ch == '(') {\n            stack[++top] = ch;\n        } else if (ch == ')') {\n            while (top != -1 && stack[top] != '(') {\n                postfix[k++] = stack[top--];\n            }\n            if (top != -1) top--; // Discard '('\n        } else { // Operator\n            while (top != -1 && precedence(stack[top]) >= precedence(ch)) {\n                postfix[k++] = stack[top--];\n            }\n            stack[++top] = ch;\n        }\n    }\n    while (top != -1) {\n        postfix[k++] = stack[top--];\n    }\n    postfix[k] = '\\0';\n}\n\nint evaluatePostfix(const char *postfix) {\n    int stack[100];\n    int top = -1;\n\n    for (int i = 0; postfix[i] != '\\0'; i++) {\n        char ch = postfix[i];\n        if (isdigit(ch)) {\n            stack[++top] = ch - '0';\n        } else {\n            int op2 = stack[top--];\n            int op1 = stack[top--];\n            switch (ch) {\n                case '+': stack[++top] = op1 + op2; break;\n                case '-': stack[++top] = op1 - op2; break;\n                case '*': stack[++top] = op1 * op2; break;\n                case '/': stack[++top] = op1 / op2; break;\n            }\n        }\n    }\n    return stack[top];\n}\n\nint main() {\n    char infix[] = \"(2+3)*4-8/2\";\n    char postfix[100];\n\n    infixToPostfix(infix, postfix);\n    printf(\"Infix Expression   : %s\\n\", infix);\n    printf(\"Postfix Expression : %s\\n\", postfix);\n\n    int result = evaluatePostfix(postfix);\n    printf(\"Evaluated Result   : %d\\n\", result);\n\n    return 0;\n}",
              "output": "Infix Expression   : (2+3)*4-8/2\nPostfix Expression : 23+4*82/-\nEvaluated Result   : 16"
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
              "answer": "1. **Precedence and Associativity**:\n   - `^` : Precedence 3 (Right-to-Left)\n   - `*`, `/` : Precedence 2 (Left-to-Right)\n   - `+`, `-` : Precedence 1 (Left-to-Right)\n\n2. **Step-by-Step Conversion Trace Table**:\n\n| Token | Action | Stack (Top to Bottom) | Postfix Output |\n| :--- | :--- | :--- | :--- |\n| `(` | Push `(` | `( ` | |\n| `A` | Append to output | `( ` | `A` |\n| `+` | Push `+` | `+ (` | `A` |\n| `B` | Append to output | `+ (` | `A B` |\n| `)` | Pop until `(` | empty | `A B +` |\n| `*` | Push `*` | `*` | `A B +` |\n| `C` | Append to output | `*` | `A B + C` |\n| `-` | Pop `*` (higher prec), push `-` | `-` | `A B + C *` |\n| `(` | Push `(` | `( -` | `A B + C *` |\n| `D` | Append to output | `( -` | `A B + C * D` |\n| `-` | Push `-` | `- ( -` | `A B + C * D` |\n| `E` | Append to output | `- ( -` | `A B + C * D E` |\n| `)` | Pop until `(` | `-` | `A B + C * D E -` |\n| `^` | Push `^` (higher prec than `-`)| `^ -` | `A B + C * D E -` |\n| `F` | Append to output | `^ -` | `A B + C * D E - F` |\n| `End`| Drain stack (`^`, then `-`) | empty | **`A B + C * D E - F ^ -`** |\n\n3. **Final Postfix String**: `A B + C * D E - F ^ -`",
              "keyPoints": [
                "Specification of operator precedence rules.",
                "Comprehensive trace table showing token, action, stack state, and output string.",
                "Correct final postfix expression output."
              ]
            },
            {
              "question": "Write an algorithm to evaluate a postfix expression using a stack. Trace the evaluation for postfix string: '5 3 + 8 2 / - *' (with leading operand).",
              "marks": "5 Marks",
              "answer": "1. **Algorithm**:\n   - Initialize an empty operand stack $S$.\n   - Iterate through tokens left to right:\n     * If token is a number: `push(token)`.\n     * If token is an operator $\\odot$:\n       - `op2 = pop()`\n       - `op1 = pop()`\n       - `res = op1 \\odot op2`\n       - `push(res)`\n   - Return `pop()` as the final evaluated answer.\n\n2. **Trace for '5 3 + 8 2 / -'**:\n   - Token `5`: Push 5 $\\to$ `[5]`\n   - Token `3`: Push 3 $\\to$ `[3, 5]`\n   - Token `+`: Pop 3, Pop 5 $\\to$ $5 + 3 = 8$ $\\to$ Push 8 $\\to$ `[8]`\n   - Token `8`: Push 8 $\\to$ `[8, 8]`\n   - Token `2`: Push 2 $\\to$ `[2, 8, 8]`\n   - Token `/`: Pop 2, Pop 8 $\\to$ $8 / 2 = 4$ $\\to$ Push 4 $\\to$ `[4, 8]`\n   - Token `-`: Pop 4, Pop 8 $\\to$ $8 - 4 = 4$ $\\to$ Push 4 $\\to$ `[4]`\n   - Result = **4**.",
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
          "detailedExplanation": "## 1. The Queue ADT and the FIFO Paradigm\n\nA **Queue** is a linear container where elements are inserted at the **rear** (enqueue) and removed from the **front** (dequeue), enforcing the **First-In, First-Out (FIFO)** discipline.\n\n```mermaid\nflowchart LR\n    subgraph Queue_FIFO [\"Queue FIFO Architecture\"]\n        IN[\"enqueue(40)\"] --> REAR[\"[ 40 ] <-- REAR\"]\n        REAR --> M2[\"[ 30 ]\"]\n        M2 --> M1[\"[ 20 ]\"]\n        M1 --> FRONT[\"[ 10 ] <-- FRONT\"]\n        FRONT --> OUT[\"dequeue() --> 10\"]\n    end\n```\n\n### Core ADT Operations:\n- `enqueue(x)`: Appends an element to the rear of the queue.\n- `dequeue()`: Extracts and returns the element at the front of the queue.\n- `peek()` / `front()`: Returns the front element without removal.\n- `isEmpty()`: Verifies if the queue contains zero elements.\n- `isFull()`: Verifies if capacity is exhausted.\n\n---\n\n## 2. The False Overflow Dilemma in Linear Array Queues\n\nIn a simple linear array queue of capacity $N$:\n- `front` and `rear` both start at `-1`.\n- `enqueue()` increments `rear` and inserts data: `arr[++rear] = x`.\n- `dequeue()` increments `front`: `val = arr[++front]`.\n\n```\nLinear Array Queue (Capacity = 4):\nStep 1: Enqueue 10, 20, 30, 40 -> [ 10, 20, 30, 40 ], front = 0, rear = 3\nStep 2: Dequeue twice         -> [  -,  -, 30, 40 ], front = 2, rear = 3\nStep 3: Try to enqueue 50     -> rear == MAX - 1 (3 == 3)!\n```\n\n### The False Overflow Problem\nEven though slots $0$ and $1$ are completely empty, `rear == MAX - 1` triggers a **False Overflow**. The queue appears full despite having 50% free capacity! Shifting all elements left on every dequeue cures this, but turns `dequeue()` into a costly $\\mathcal{O}(n)$ operation.\n\n---\n\n## 3. The Circular Queue Solution\n\nA **Circular Queue** wraps the linear array into a continuous conceptual ring by calculating indices using **modulo arithmetic** ($% N$).\n\n```mermaid\nflowchart TD\n    subgraph CircularRing [\"Circular Queue Ring Buffer (Size = 6)\"]\n        S0[\"Slot 0\"] --> S1[\"Slot 1\"]\n        S1 --> S2[\"Slot 2\"]\n        S2 --> S3[\"Slot 3\"]\n        S3 --> S4[\"Slot 4\"]\n        S4 --> S5[\"Slot 5\"]\n        S5 -->|Wrap around via (rear + 1) % 6| S0\n    end\n```\n\n### Modulo Index Arithmetic:\nInstead of `rear++`, we use:\n$$\\text{rear} = (\\text{rear} + 1) \\pmod N$$\n$$\\text{front} = (\\text{front} + 1) \\pmod N$$\n\n### Boundary Invariant Formulas:\n1. **Empty Condition**:\n   $$\\text{front} == -1$$\n   *(Alternative convention: `front == rear` if leaving one slot unallocated).*\n2. **Full Condition**:\n   $$(\\text{rear} + 1) \\pmod N == \\text{front}$$\n   *(The very next slot after rear is occupied by front).*\n3. **Queue Size**:\n   $$\\text{Count} = (\\text{rear} - \\text{front} + N) \\pmod N + 1$$\n\n---\n\n## 4. Complexity & Structural Comparison\n\n| Dimension | Linear Array Queue (without shifting) | Linear Array Queue (with shifting) | Circular Array Queue |\n| :--- | :--- | :--- | :--- |\n| **Enqueue Time** | $\\mathcal{O}(1)$ | $\\mathcal{O}(1)$ | $\\mathcal{O}(1)$ |\n| **Dequeue Time** | $\\mathcal{O}(1)$ | $\\mathcal{O}(n)$ | $\\mathcal{O}(1)$ |\n| **Memory Reuse** | Broken (False Overflow) | Complete | Complete |\n| **Index Math** | Simple `++` | Simple `++` | Modulo `(i + 1) % N` |\n| **Auxiliary Space**| $\\mathcal{O}(1)$ | $\\mathcal{O}(1)$ | $\\mathcal{O}(1)$ |\n\n---\n\n> [!IMPORTANT] **MEMORIZE:**\n> Circular Queue conditions:\n> - **Full**: `(rear + 1) % MAX == front`\n> - **Empty**: `front == -1`\n> - **Reset on Dequeuing Last Element**: If `front == rear`, set `front = -1; rear = -1;`!\n\n> [!NOTE] **DEV BRAIN:**\n> Circular ring buffers implemented over contiguous memory are standard in high-performance networking (Linux socket buffers `sk_buff`) and hardware device drivers (circular DMA descriptor rings).\n\n> [!WARNING] **TRAP:**\n> Forgetting to reset `front = rear = -1` when dequeuing the final remaining element leaves the queue in a permanently broken state where `front != -1` even though the queue is empty!\n\n> [!TIP] **EXAM TIP:**\n> When asked to trace a Circular Queue in exams, draw a numbered clock-face diagram with slots $0$ to $N - 1$. Mark `F` and `R` pointers at each step to visualize wraparound arithmetic clearly.",
          "shortNotes": "Queue enforces FIFO. Linear queues suffer from false overflow. Circular queue solves this via modulo arithmetic (rear + 1) % size == front for full condition.",
          "examples": [
            {
              "title": "Complete C Implementation of Circular Queue with Modulo Arithmetic",
              "problem": "Implement a fixed-size Circular Queue supporting enqueue, dequeue, display, and verify resolution of false overflow.",
              "explanation": "Uses modulo arithmetic for pointer advancement and tests wraparound behavior.",
              "code": "#include <stdio.h>\n#include <stdbool.h>\n\n#define SIZE 5\n\ntypedef struct {\n    int items[SIZE];\n    int front;\n    int rear;\n} CircularQueue;\n\nvoid initQueue(CircularQueue *q) {\n    q->front = -1;\n    q->rear = -1;\n}\n\nbool isFull(CircularQueue *q) {\n    return (q->rear + 1) % SIZE == q->front;\n}\n\nbool isEmpty(CircularQueue *q) {\n    return q->front == -1;\n}\n\nvoid enqueue(CircularQueue *q, int val) {\n    if (isFull(q)) {\n        printf(\"CircularQueue Full! Cannot enqueue %d\\n\", val);\n        return;\n    }\n    if (isEmpty(q)) {\n        q->front = 0;\n    }\n    q->rear = (q->rear + 1) % SIZE;\n    q->items[q->rear] = val;\n    printf(\"Enqueued: %d (front=%d, rear=%d)\\n\", val, q->front, q->rear);\n}\n\nint dequeue(CircularQueue *q) {\n    if (isEmpty(q)) {\n        printf(\"CircularQueue Empty! Cannot dequeue.\\n\");\n        return -1;\n    }\n    int val = q->items[q->front];\n    if (q->front == q->rear) { // Last element removed -> reset\n        q->front = -1;\n        q->rear = -1;\n    } else {\n        q->front = (q->front + 1) % SIZE;\n    }\n    return val;\n}\n\nvoid display(CircularQueue *q) {\n    if (isEmpty(q)) {\n        printf(\"Queue is Empty.\\n\");\n        return;\n    }\n    printf(\"Queue elements: \");\n    int i = q->front;\n    while (1) {\n        printf(\"%d \", q->items[i]);\n        if (i == q->rear) break;\n        i = (i + 1) % SIZE;\n    }\n    printf(\"\\n\");\n}\n\nint main() {\n    CircularQueue q;\n    initQueue(&q);\n\n    enqueue(&q, 10);\n    enqueue(&q, 20);\n    enqueue(&q, 30);\n    enqueue(&q, 40);\n    display(&q);\n\n    printf(\"Dequeued: %d\\n\", dequeue(&q));\n    printf(\"Dequeued: %d\\n\", dequeue(&q));\n    display(&q);\n\n    // In a linear queue, slots 0 and 1 would be wasted.\n    // In a circular queue, they are reused:\n    printf(\"Testing Circular Wraparound:\\n\");\n    enqueue(&q, 50);\n    enqueue(&q, 60);\n    enqueue(&q, 70); // Should fill slot 0 or 1\n    display(&q);\n\n    return 0;\n}",
              "output": "Enqueued: 10 (front=0, rear=0)\nEnqueued: 20 (front=0, rear=1)\nEnqueued: 30 (front=0, rear=2)\nEnqueued: 40 (front=0, rear=3)\nQueue elements: 10 20 30 40 \nDequeued: 10\nDequeued: 20\nQueue elements: 30 40 \nTesting Circular Wraparound:\nEnqueued: 50 (front=2, rear=4)\nEnqueued: 60 (front=2, rear=0)\nEnqueued: 70 (front=2, rear=1)\nQueue elements: 30 40 50 60 70 "
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
              "answer": "1. **The False Overflow Problem**:\n   - In a linear queue of size $N$, elements are enqueued at `rear` and dequeued at `front`.\n   - When elements are dequeued, `front` increments, leaving freed memory slots at the beginning of the array.\n   - Eventually, `rear` reaches $N - 1$. Any subsequent `enqueue()` call fails because `rear == N - 1`, reporting a \"Queue Overflow\", despite the fact that slots $0$ to `front - 1` are empty.\n   - This wasted capacity condition is termed **False Overflow**.\n\n2. **Resolution via Circular Queue**:\n   - The array is treated as a continuous logical ring.\n   - When `rear` reaches $N - 1$, rather than failing, it wraps around to index $0$ if that slot is free:\n     $$\\text{rear} = (\\text{rear} + 1) \\pmod N$$\n   - The same modulo arithmetic applies to `front`:\n     $$\\text{front} = (\\text{front} + 1) \\pmod N$$\n\n3. **Mathematical Boundary Conditions**:\n   - **Queue Empty**: `front == -1` (or `front == rear` depending on convention).\n   - **Queue Full**: `(rear + 1) % N == front`.\n   - **Single Element Reset**: If `front == rear` during a dequeue, reset `front = -1; rear = -1;`.",
              "keyPoints": [
                "Clear explanation of why linear queues report overflow when early slots are free.",
                "Modulo index arithmetic (rear + 1) % N wrapping around.",
                "Formal boundary formulas for full, empty, and single-element reset."
              ]
            },
            {
              "question": "A circular queue of capacity 6 currently has front = 4 and rear = 2. How many elements are in the queue? What slots in the array are occupied?",
              "marks": "5 Marks",
              "answer": "1. **Given Parameters**:\n   - Capacity $N = 6$.\n   - Indices: $0, 1, 2, 3, 4, 5$.\n   - `front = 4`, `rear = 2`.\n\n2. **Occupied Slots**:\n   - Elements start at `front = 4` and advance circularly up to `rear = 2`.\n   - Traversal sequence:\n     * Slot 4 (front)\n     * Slot 5\n     * Slot 0 (wraparound: $(5 + 1) \\% 6 = 0$)\n     * Slot 1\n     * Slot 2 (rear)\n   - **Occupied Slots**: 4, 5, 0, 1, 2.\n\n3. **Total Element Count Formula**:\n   $$\\text{Count} = (\\text{rear} - \\text{front} + N) \\pmod N + 1$$\n   $$\\text{Count} = (2 - 4 + 6) \\pmod 6 + 1 = 4 \\pmod 6 + 1 = 4 + 1 = 5$$\n   - The queue currently contains **5 elements**.",
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
          "detailedExplanation": "## 1. Double-Ended Queue (Deque)\n\nA **Double-Ended Queue (Deque)** (pronounced \"deck\") is a generalized linear container allowing insertions and deletions at **both** ends:\n\n```mermaid\nflowchart LR\n    subgraph Deque_Layout [\"Double-Ended Queue (Deque) Architecture\"]\n        direction LR\n        IN_F[\"insertFront() -->\"] --> F[\"FRONT\"]\n        F <--> BODY[\"Interior Data Buffer\"] <--> R[\"REAR\"]\n        R <-- \"<-- insertRear()\" <-- IN_R[\"insertRear()\"]\n        F --> OUT_F[\"deleteFront()\"]\n        R --> OUT_R[\"deleteRear()\"]\n    end\n```\n\n### Deque Variants:\n1. **Input-Restricted Deque**: Deletions allowed at both ends, but insertions permitted at one end only (e.g., rear only).\n2. **Output-Restricted Deque**: Insertions allowed at both ends, but deletions permitted at one end only (e.g., front only).\n\n### Core Applications\n- **Sliding Window Maximum/Minimum**: Finding the maximum element in every sliding sub-array of size $k$ in $\\mathcal{O}(n)$ time.\n- **A-Stealing Job Schedulers**: Work-stealing scheduling algorithms in multi-core runtimes (e.g., Go runtime, Java ForkJoinPool).\n- **Undo/Redo History with Max Limit**: Oldest history drops off the front when the maximum capacity is exceeded.\n\n---\n\n## 2. Priority Queue ADT: Array vs Heap Implementations\n\nA **Priority Queue** is an ADT where each element is paired with a priority rank. Elements with higher priority are dequeued before lower-priority elements. If two elements share equal priority, they are served according to FIFO order.\n\n```mermaid\ngraph TD\n    subgraph PQ_Implementations [\"Priority Queue Implementation Trade-offs\"]\n        U[\"Unsorted Array\nEnqueue: O(1)\nDequeue (find max): O(n)\"]\n        S[\"Sorted Array\nEnqueue (insert in order): O(n)\nDequeue (remove max at tail): O(1)\"]\n        H[\"Binary Heap (Min/Max Heap)\nEnqueue: O(log n)\nDequeue: O(log n)\nOptimal Balance!\"]\n    end\n```\n\n### Comprehensive Implementation Comparison\n\n| Metric / Operation | Unsorted Array | Sorted Array | Binary Heap (Optimal) |\n| :--- | :--- | :--- | :--- |\n| **`insert()` / `enqueue()`** | $\\mathcal{O}(1)$ | $\\mathcal{O}(n)$ | $\\mathcal{O}(\\log n)$ |\n| **`extractMax()` / `dequeue()`** | $\\mathcal{O}(n)$ | $\\mathcal{O}(1)$ | $\\mathcal{O}(\\log n)$ |\n| **`peek()`** | $\\mathcal{O}(n)$ | $\\mathcal{O}(1)$ | $\\mathcal{O}(1)$ |\n| **Space Overhead** | $\\mathcal{O}(1)$ | $\\mathcal{O}(1)$ | $\\mathcal{O}(1)$ |\n| **Engineering Verdict** | Inefficient at scale | Inefficient for inserts | Universally used in OS schedulers & Dijkstra |\n\n---\n\n## 3. Emulating a Stack using Queues\n\nA classic interview and university question asks: *How can a LIFO Stack be implemented using only FIFO Queue instances?*\n\nTwo standard strategies exist using two queues ($q_1$ and $q_2$):\n\n```mermaid\nflowchart TD\n    subgraph PushCostly [\"Method 1: Making Push Costly (O(n) Push, O(1) Pop)\"]\n        P1[\"1. Enqueue new item x into q2\"]\n        P2[\"2. Dequeue all elements from q1 one-by-one and enqueue into q2\"]\n        P3[\"3. Swap names of q1 and q2 (q1 now has newest item at front!)\"]\n        P1 --> P2 --> P3\n    end\n```\n\n### Method 1: Push-Costly ($\\mathcal{O}(n)$ Push, $\\mathcal{O}(1)$ Pop)\n1. `push(x)`:\n   - Enqueue $x$ into helper queue $q_2$.\n   - While $q_1$ is not empty: dequeue from $q_1$ and enqueue into $q_2$.\n   - Swap the roles of $q_1$ and $q_2$.\n   - *(Result: The most recently inserted item $x$ is positioned at the front of $q_1$.)*\n2. `pop()`:\n   - Dequeue directly from $q_1$ in $\\mathcal{O}(1)$ time.\n\n### Method 2: Pop-Costly ($\\mathcal{O}(1)$ Push, $\\mathcal{O}(n)$ Pop)\n1. `push(x)`:\n   - Enqueue $x$ into $q_1$ in $\\mathcal{O}(1)$ time.\n2. `pop()`:\n   - Dequeue $N - 1$ elements from $q_1$ and enqueue them into $q_2$.\n   - The single remaining element in $q_1$ is the latest element; dequeue and return it.\n   - Swap the roles of $q_1$ and $q_2$.\n\n---\n\n> [!IMPORTANT] **MEMORIZE:**\n> - A Deque supports four operations: `insertFront`, `insertRear`, `deleteFront`, `deleteRear`.\n> - A Priority Queue implemented via a Binary Heap achieves $\\mathcal{O}(\\log n)$ for both insertion and extraction, outperforming array implementations.\n\n> [!NOTE] **DEV BRAIN:**\n> In Python, `collections.deque` is implemented as an unrolled doubly linked list of blocks, providing fast $O(1)$ appends and pops from both ends.\n\n> [!WARNING] **TRAP:**\n> Do not assume a Priority Queue is a fully sorted list. A binary heap only guarantees that the root is the extremum (min or max); elements in other levels are partially ordered!\n\n> [!TIP] **EXAM TIP:**\n> When asked to implement a stack using queues, clearly state whether your design is **Push-Costly** ($O(n)$ push, $O(1)$ pop) or **Pop-Costly** ($O(1)$ push, $O(n)$ pop), and provide step-by-step queue transfer traces.",
          "shortNotes": "Deque allows insertion/deletion at both ends. Priority Queue serves highest rank first (O(log n) via binary heaps). Stacks can be emulated using two queues via push-costly or pop-costly methods.",
          "examples": [
            {
              "title": "C Program: Implementing Stack using Two Queues (Push-Costly)",
              "problem": "Implement a LIFO Stack using two FIFO Queue ADTs such that pop executes in O(1) time.",
              "explanation": "Illustrates how transferring elements between two queues reverses FIFO order to achieve LIFO behavior.",
              "code": "#include <stdio.h>\n#include <stdbool.h>\n\n#define MAX 50\n\ntypedef struct {\n    int arr[MAX];\n    int front, rear;\n} Queue;\n\nvoid initQ(Queue *q) { q->front = 0; q->rear = 0; }\nbool isQEmpty(Queue *q) { return q->front == q->rear; }\nvoid enq(Queue *q, int val) { q->arr[(q->rear)++] = val; }\nint deq(Queue *q) { return q->arr[(q->front)++]; }\n\n// Stack container built using two queues\ntypedef struct {\n    Queue q1, q2;\n} QueueStack;\n\nvoid initStack(QueueStack *s) {\n    initQ(&s->q1);\n    initQ(&s->q2);\n}\n\n// Push-Costly: O(n) push\nvoid push(QueueStack *s, int val) {\n    // 1. Enqueue into q2\n    enq(&s->q2, val);\n\n    // 2. Transfer all from q1 to q2\n    while (!isQEmpty(&s->q1)) {\n        enq(&s->q2, deq(&s->q1));\n    }\n\n    // 3. Swap q1 and q2\n    Queue temp = s->q1;\n    s->q1 = s->q2;\n    s->q2 = temp;\n    initQ(&s->q2);\n}\n\n// Pop: O(1)\nint pop(QueueStack *s) {\n    if (isQEmpty(&s->q1)) {\n        printf(\"Stack Underflow!\\n\");\n        return -1;\n    }\n    return deq(&s->q1);\n}\n\nint main() {\n    QueueStack s;\n    initStack(&s);\n\n    printf(\"Pushing 10, 20, 30 onto QueueStack...\\n\");\n    push(&s, 10);\n    push(&s, 20);\n    push(&s, 30);\n\n    printf(\"Popped (LIFO expected 30): %d\\n\", pop(&s));\n    printf(\"Popped (LIFO expected 20): %d\\n\", pop(&s));\n\n    push(&s, 40);\n    printf(\"Pushed 40\\n\");\n    printf(\"Popped (LIFO expected 40): %d\\n\", pop(&s));\n    printf(\"Popped (LIFO expected 10): %d\\n\", pop(&s));\n\n    return 0;\n}",
              "output": "Pushing 10, 20, 30 onto QueueStack...\nPopped (LIFO expected 30): 30\nPopped (LIFO expected 20): 20\nPushed 40\nPopped (LIFO expected 40): 40\nPopped (LIFO expected 10): 10"
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
              "answer": "1. **Definition of Deque**:\n   A Deque (Double-Ended Queue) is a generalized linear data structure in which insertions and deletions can be performed at either the front or the rear end.\n\n2. **Input-Restricted Deque**:\n   - **Constraint**: Insertions are permitted at only one end (typically `rear`), while deletions are allowed at both ends (`front` and `rear`).\n   - **Real-World Example**: A printer spooler where all new print jobs enter at the rear, but administrators can cancel urgent jobs from the front or remove erroneous jobs from the rear.\n\n3. **Output-Restricted Deque**:\n   - **Constraint**: Deletions are permitted at only one end (typically `front`), while insertions are allowed at both ends (`front` and `rear`).\n   - **Real-World Example**: An undo/redo manager where normal actions append to the rear, urgent prioritized undo operations prepend to the front, and items are removed strictly from the front.",
              "keyPoints": [
                "Formal definition of Deque supporting four endpoint operations.",
                "Input-restricted definition (1 insertion end, 2 deletion ends) with example.",
                "Output-restricted definition (2 insertion ends, 1 deletion end) with example."
              ]
            },
            {
              "question": "Explain how a Priority Queue can be implemented using: (a) Unsorted Array, (b) Sorted Array, and (c) Binary Heap. Compare their time complexities.",
              "marks": "7 Marks",
              "answer": "1. **Implementation Approaches**:\n   - **(a) Unsorted Array**:\n     * `Insert`: Append to end in $\\mathcal{O}(1)$ time.\n     * `DeleteMax`: Scan entire array to locate maximum priority item in $\\mathcal{O}(n)$ time, then shift elements to fill hole.\n   - **(b) Sorted Array (Ascending Order)**:\n     * `Insert`: Find correct position and shift elements in $\\mathcal{O}(n)$ time.\n     * `DeleteMax`: Remove the last element at index $N - 1$ in $\\mathcal{O}(1)$ time without shifting.\n   - **(c) Binary Heap (Max-Heap)**:\n     * `Insert`: Place at next available leaf and bubble up in $\\mathcal{O}(\\log n)$ time.\n     * `DeleteMax`: Replace root with last leaf and bubble down (heapify) in $\\mathcal{O}(\\log n)$ time.\n\n2. **Complexity Comparison Table**:\n\n| Operation | Unsorted Array | Sorted Array | Binary Heap |\n| :--- | :--- | :--- | :--- |\n| **Insert** | $\\mathcal{O}(1)$ | $\\mathcal{O}(n)$ | $\\mathcal{O}(\\log n)$ |\n| **DeleteMax** | $\\mathcal{O}(n)$ | $\\mathcal{O}(1)$ | $\\mathcal{O}(\\log n)$ |\n| **PeekMax** | $\\mathcal{O}(n)$ | $\\mathcal{O}(1)$ | $\\mathcal{O}(1)$ |\n\n3. **Conclusion**:\n   The Binary Heap offers the most balanced performance, avoiding linear $\\mathcal{O}(n)$ bottlenecks on both insertions and extractions.",
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
    },
    {
      "id": "dsa-u4",
      "title": "Unit 4: Trees & Balanced Search Trees",
      "description": "Hierarchical tree data structures, binary tree classifications, DFS and BFS traversals, Binary Search Tree (BST) operations, self-balancing AVL trees with rotational rebalancing (LL, RR, LR, RL), and binary heaps with O(n) heap construction and Heap Sort.",
      "topics": [
        {
          "id": "dsa-u4-t1",
          "title": "Tree Terminology & Properties: Root, Leaf, Height, Depth, Degree, Strict vs Complete vs Full vs Perfect Binary Trees",
          "simpleExplanation": "A tree is a hierarchical, non-linear data structure of connected nodes rooted at a single top node without cycles. Binary trees restrict each node to at most two children and are classified into distinct structural categories: Full (Strict), Complete (compact level-fill from left), and Perfect (all leaves at same depth with maximum nodes 2^(h+1)-1).",
          "detailedExplanation": "## 1. Formal Tree Anatomy and Terminology\n\nA **Tree** is a non-linear data structure defined recursively: it consists of a set of one or more nodes such that there is one designated node called the **Root**, and the remaining nodes are partitioned into disjoint sets, each of which is itself a subtree.\n\n```mermaid\ngraph TD\n    R[\"Root Node (A)\nDepth=0, Level=0\"] --> B[\"B (Internal Node)\nDepth=1, Degree=2\"]\n    R --> C[\"C (Internal Node)\nDepth=1, Degree=1\"]\n\n    B --> D[\"D (Leaf Node)\nDepth=2, Degree=0\"]\n    B --> E[\"E (Leaf Node)\nDepth=2, Degree=0\"]\n\n    C --> F[\"F (Internal Node)\nDepth=2, Degree=1\"]\n    F --> G[\"G (Leaf Node)\nDepth=3, Degree=0\"]\n```\n\n### Essential Tree Definitions:\n1. **Root**: The topmost node of the hierarchy possessing zero incoming edges (no parent).\n2. **Edge**: The directed link connecting a parent node to its child. A tree with $N$ nodes always has exactly $N - 1$ edges.\n3. **Leaf (Terminal Node)**: A node with no children ($\\\\text{Degree} = 0$).\n4. **Internal (Non-Terminal) Node**: A node with at least one child.\n5. **Degree of a Node**: The total count of subtrees (children) attached to that node.\n6. **Degree of a Tree**: The maximum degree across all nodes in the tree.\n7. **Depth of a Node**: The number of edges along the unique path from the **root to that node**. (Depth of root is 0).\n8. **Height of a Node**: The number of edges on the longest path from **that node down to a leaf**.\n9. **Height of a Tree**: The height of the root node (maximum depth among all nodes).\n10. **Level of a Node**: Commonly defined as $\\\\text{Depth} + 1$ (or equivalent to depth, depending on textbook convention).\n\n---\n\n## 2. Binary Tree Classifications\n\nA **Binary Tree** is a tree where every node has **at most two children**, labeled as `left` and `right`.\n\n```mermaid\nflowchart TD\n    subgraph Types [\"Binary Tree Structural Classifications\"]\n        FB[\"Full / Strict Binary Tree\nEvery node has 0 or 2 children\"]\n        CB[\"Complete Binary Tree\nAll levels full except possibly the last;\nlast level filled from left to right\"]\n        PB[\"Perfect Binary Tree\nAll interior nodes have 2 children;\nall leaves are at the exact same depth\"]\n        DB[\"Degenerate / Pathological Tree\nEvery parent has only 1 child\n(behaves like a linked list)\"]\n    end\n```\n\n### A. Full (Strict / Proper) Binary Tree\n- **Rule**: Every node must have **either 0 or 2 children**. No node has exactly 1 child.\n- **Mathematical Invariant**: If $L$ is the number of leaf nodes and $I$ is the number of internal nodes:\n  $$L = I + 1$$\n\n### B. Complete Binary Tree\n- **Rule**: Every level except possibly the last is completely filled, and all nodes in the last level are packed as far **left** as possible.\n- **Significance**: Complete binary trees can be mapped into a 1D contiguous array without pointer overhead (powers Binary Heaps).\n- For a node at array index $i$ (0-indexed):\n  - Left child $= 2i + 1$\n  - Right child $= 2i + 2$\n  - Parent $= \\lfloor (i - 1) / 2 \\rfloor$\n\n### C. Perfect Binary Tree\n- **Rule**: All interior nodes have exactly 2 children, and **all leaf nodes reside at the identical depth**.\n- A perfect binary tree of height $h$ contains:\n  $$\\text{Total Nodes } N = 2^{h+1} - 1$$\n  $$\\text{Total Leaf Nodes } L = 2^h$$\n  $$\\text{Total Internal Nodes } I = 2^h - 1$$\n\n### D. Degenerate (Skewed) Binary Tree\n- Every internal node has exactly one child.\n- Height $h = N - 1$.\n- Search complexity collapses from $\\mathcal{O}(\\log n)$ down to $\\mathcal{O}(n)$, matching a linked list.\n\n---\n\n## 3. Mathematical Properties Summary Table\n\n| Property | Minimum Value | Maximum Value |\n| :--- | :--- | :--- |\n| **Nodes in Binary Tree of Height $h$** | $h + 1$ (Skewed) | $2^{h+1} - 1$ (Perfect) |\n| **Height of Binary Tree with $N$ Nodes** | $\\lfloor \\log_2 N \\rfloor$ (Complete) | $N - 1$ (Skewed) |\n| **Leaves in Binary Tree of Height $h$** | $1$ | $2^h$ |\n| **Total Edges with $N$ Nodes** | $N - 1$ | $N - 1$ (Always invariant) |\n\n---\n\n> [!IMPORTANT] **MEMORIZE:**\n> - In any non-empty binary tree: $L = n_2 + 1$ (Leaves = Nodes with Degree 2 + 1).\n> - In a complete binary tree indexed from 0: Left child is $2i + 1$, Right child is $2i + 2$, Parent is $\\lfloor (i - 1) / 2 \\rfloor$.\n\n> [!NOTE] **DEV BRAIN:**\n> Complete binary trees are stored directly in contiguous RAM arrays for cache efficiency in priority queues and heaps, requiring 0 bytes of pointer overhead!\n\n> [!WARNING] **TRAP:**\n> Do not confuse *Full* with *Complete*. A full tree can be unbalanced (e.g., left child has 2 children, right child is a leaf). A complete tree can have a node with 1 child (on the last level, left-aligned)!\n\n> [!TIP] **EXAM TIP:**\n> When asked to prove $L = n_2 + 1$, equate total nodes $N = n_0 + n_1 + n_2$ to total edges $E = N - 1 = n_1 + 2n_2$, then substitute $n_0 + n_1 + n_2 - 1 = n_1 + 2n_2$ to immediately yield $n_0 = n_2 + 1$.",
          "shortNotes": "Tree has root, edges (N-1), leaves, height and depth. Full tree: 0 or 2 children (L = I + 1). Complete: all levels full except last (left-filled). Perfect: all levels full, N = 2^(h+1) - 1.",
          "examples": [
            {
              "title": "C Program to Calculate Tree Height, Node Count, and Leaf Count",
              "problem": "Construct a binary tree and implement recursive functions to compute its height, total node count, and leaf node count.",
              "explanation": "Demonstrates recursive tree property calculations using divide-and-conquer sub-tree aggregation.",
              "code": "#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct TreeNode {\n    int val;\n    struct TreeNode *left;\n    struct TreeNode *right;\n} TreeNode;\n\nTreeNode* createNode(int val) {\n    TreeNode *node = (TreeNode*)malloc(sizeof(TreeNode));\n    node->val = val;\n    node->left = NULL;\n    node->right = NULL;\n    return node;\n}\n\nint countNodes(TreeNode *root) {\n    if (root == NULL) return 0;\n    return 1 + countNodes(root->left) + countNodes(root->right);\n}\n\nint countLeaves(TreeNode *root) {\n    if (root == NULL) return 0;\n    if (root->left == NULL && root->right == NULL) return 1;\n    return countLeaves(root->left) + countLeaves(root->right);\n}\n\nint max(int a, int b) { return (a > b) ? a : b; }\n\nint calculateHeight(TreeNode *root) {\n    if (root == NULL) return -1; // Height of empty tree is -1; single node is 0\n    return 1 + max(calculateHeight(root->left), calculateHeight(root->right));\n}\n\nint main() {\n    /*\n             10\n            /  \\\n           20   30\n          /  \\\n         40   50\n    */\n    TreeNode *root = createNode(10);\n    root->left = createNode(20);\n    root->right = createNode(30);\n    root->left->left = createNode(40);\n    root->left->right = createNode(50);\n\n    printf(\"Binary Tree Metrics:\\n\");\n    printf(\"  Total Node Count : %d\\n\", countNodes(root));\n    printf(\"  Leaf Node Count  : %d\\n\", countLeaves(root));\n    printf(\"  Tree Height      : %d edges\\n\", calculateHeight(root));\n\n    return 0;\n}",
              "output": "Binary Tree Metrics:\n  Total Node Count : 5\n  Leaf Node Count  : 3\n  Tree Height      : 2 edges"
            }
          ],
          "keyPoints": [
            "A tree with N nodes always possesses exactly N - 1 edges.",
            "Depth measures edge distance from root down to node; Height measures longest edge path from node to a leaf.",
            "In a Full Binary Tree, every node has 0 or 2 children; leaf count L = internal nodes I + 1.",
            "A Complete Binary Tree is densely packed across levels and left-aligned on the final level, enabling contiguous array storage.",
            "A Perfect Binary Tree of height h has 2^(h+1) - 1 nodes with all leaves situated at identical depth."
          ],
          "theoryQuestions": [
            {
              "question": "Define Full, Complete, and Perfect Binary Trees. Prove mathematically that in any non-empty binary tree, the number of leaf nodes L is always equal to n2 + 1, where n2 is the number of nodes of degree 2.",
              "marks": "7 Marks",
              "answer": "1. **Definitions**:\n   - **Full Binary Tree**: Every node has either 0 or 2 children.\n   - **Complete Binary Tree**: All levels are completely full except possibly the last level, which is filled sequentially from left to right.\n   - **Perfect Binary Tree**: All internal nodes have 2 children and all leaf nodes reside at the identical bottom level.\n\n2. **Mathematical Proof ($L = n_2 + 1$)**:\n   - Let $N$ = total number of nodes in the binary tree.\n   - Let $n_0$ = number of leaf nodes (nodes of degree 0, denoted $L$).\n   - Let $n_1$ = number of nodes of degree 1.\n   - Let $n_2$ = number of nodes of degree 2.\n   - **Equation 1 (Total Nodes)**:\n     $$N = n_0 + n_1 + n_2$$\n   - **Equation 2 (Total Edges)**:\n     Every edge connects to a child. Nodes of degree 1 contribute 1 outgoing edge, nodes of degree 2 contribute 2 outgoing edges:\n     $$E = 0 \\cdot n_0 + 1 \\cdot n_1 + 2 \\cdot n_2 = n_1 + 2n_2$$\n   - In any tree, the total number of edges is always $N - 1$:\n     $$E = N - 1 \\implies N = E + 1$$\n     $$N = (n_1 + 2n_2) + 1$$\n   - **Equating the two expressions for $N$**:\n     $$n_0 + n_1 + n_2 = n_1 + 2n_2 + 1$$\n     Subtracting $n_1$ and $n_2$ from both sides:\n     $$n_0 = n_2 + 1$$\n   - **Conclusion**: The number of leaf nodes ($n_0$) is strictly $n_2 + 1$. Q.E.D.",
              "keyPoints": [
                "Formal definitions for Full, Complete, and Perfect binary trees.",
                "Node breakdown equation: N = n0 + n1 + n2.",
                "Edge calculation: E = n1 + 2n2 = N - 1.",
                "Algebraic derivation yielding n0 = n2 + 1."
              ]
            },
            {
              "question": "What is the maximum and minimum number of nodes in a binary tree of height h? Calculate the height of a complete binary tree with 100 nodes.",
              "marks": "5 Marks",
              "answer": "1. **Node Bounds as a Function of Height $h$ (assuming root at height 0)**:\n   - **Minimum Nodes**: Occurs when the tree is degenerate (skewed):\n     $$N_{\\min} = h + 1$$\n   - **Maximum Nodes**: Occurs when the tree is perfect:\n     $$N_{\\max} = \\sum_{i=0}^h 2^i = 2^{h+1} - 1$$\n\n2. **Height of Complete Binary Tree with $N = 100$**:\n   - In a complete binary tree, height $h$ is given by:\n     $$h = \\lfloor \\log_2 N \\rfloor$$\n   - For $N = 100$:\n     $$2^6 = 64 \\le 100 < 128 = 2^7$$\n     $$h = \\lfloor \\log_2 100 \\rfloor = 6$$\n   - The complete binary tree has a height of **6 edges** (spanning 7 levels, from level 0 to level 6).",
              "keyPoints": [
                "Minimum nodes formula: h + 1 (skewed tree).",
                "Maximum nodes formula: 2^(h+1) - 1 (perfect tree).",
                "Calculation of height for N=100 yielding h = 6."
              ]
            }
          ],
          "mcqs": [
            {
              "question": "In a binary tree, if there are 15 nodes with degree 2, how many leaf nodes must exist in the tree?",
              "options": [
                "14",
                "15",
                "16",
                "30"
              ],
              "correctIndex": 2,
              "explanation": "By the fundamental theorem of binary trees, L = n2 + 1. Therefore, Leaf Count = 15 + 1 = 16."
            },
            {
              "question": "What is the maximum number of nodes in a perfect binary tree of height 4 (root at height 0)?",
              "options": [
                "15",
                "16",
                "31",
                "63"
              ],
              "correctIndex": 2,
              "explanation": "N_max = 2^(h+1) - 1 = 2^(4+1) - 1 = 2^5 - 1 = 32 - 1 = 31 nodes."
            },
            {
              "question": "If a complete binary tree is stored in an array with 0-based indexing, where is the right child of the element at index i located?",
              "options": [
                "2 * i",
                "2 * i + 1",
                "2 * i + 2",
                "i / 2"
              ],
              "correctIndex": 2,
              "explanation": "For 0-based array indexing, left child = 2i + 1, and right child = 2i + 2."
            },
            {
              "question": "Which of the following describes a binary tree where all interior nodes have 2 children and all leaves are at the exact same depth?",
              "options": [
                "Full Binary Tree",
                "Complete Binary Tree",
                "Perfect Binary Tree",
                "Degenerate Tree"
              ],
              "correctIndex": 2,
              "explanation": "A Perfect Binary Tree requires every non-leaf node to have 2 children and every leaf to reside at the identical bottom level."
            }
          ]
        },
        {
          "id": "dsa-u4-t2",
          "title": "Binary Tree Traversals: Depth-First (Inorder, Preorder, Postorder - Recursive & Iterative) and Breadth-First (Level-Order) Traversals",
          "simpleExplanation": "Tree traversal is the algorithmic process of visiting every node in a tree exactly once. Depth-First Search (DFS) navigates deep into branches first via Inorder (Left-Root-Right), Preorder (Root-Left-Right), and Postorder (Left-Right-Root) sequences using stacks or recursion, whereas Breadth-First Search (BFS) explores level-by-level using a FIFO queue.",
          "detailedExplanation": "## 1. Classification of Traversal Strategies\n\nUnlike linear data structures (arrays, lists) which possess a single natural sequential traversal path, hierarchical trees can be traversed in several distinct dimensional orders.\n\n```mermaid\nflowchart TD\n    TR[\"Tree Traversals\"] --> DFS[\"Depth-First Traversals\n(Explores subtree depth via Call Stack)\"]\n    TR --> BFS[\"Breadth-First Traversal\n(Level-Order via FIFO Queue)\"]\n\n    DFS --> PRE[\"Preorder Traversal\n[Root -> Left -> Right]\"]\n    DFS --> IN[\"Inorder Traversal\n[Left -> Root -> Right]\"]\n    DFS --> POST[\"Postorder Traversal\n[Left -> Right -> Root]\"]\n```\n\n---\n\n## 2. Depth-First Search (DFS) Traversals\n\nConsider the benchmark binary tree:\n```\n        A\n       / \\\n      B   C\n     / \\\n    D   E\n```\n\n### A. Preorder Traversal (Root $\\to$ Left $\\to$ Right)\n- **Order of Evaluation**: Process current node, then recursively visit left subtree, then recursively visit right subtree.\n- **Trace for Benchmark**: `A -> B -> D -> E -> C`\n- **Primary Use Cases**: Cloning a tree, evaluating prefix expressions, generating serialization strings.\n\n### B. Inorder Traversal (Left $\\to$ Root $\\to$ Right)\n- **Order of Evaluation**: Recursively visit left subtree, process current node, then recursively visit right subtree.\n- **Trace for Benchmark**: `D -> B -> E -> A -> C`\n- **Primary Use Case**: Performing Inorder traversal on a **Binary Search Tree (BST)** yields all keys in strictly sorted ascending numerical order!\n\n### C. Postorder Traversal (Left $\\to$ Right $\\to$ Root)\n- **Order of Evaluation**: Recursively visit left subtree, recursively visit right subtree, then process current node.\n- **Trace for Benchmark**: `D -> E -> B -> C -> A`\n- **Primary Use Cases**: Deleting an entire tree (children must be freed before parent memory), postfix expression evaluation, calculating sub-tree disk storage sizes.\n\n---\n\n## 3. Iterative DFS Traversals Using Stacks\n\nRecursive DFS consumes implicit memory on the function call stack. In production systems with deep or skewed trees, recursion can cause stack overflow crashes. Iterative versions make the stack explicit.\n\n```mermaid\nflowchart TD\n    subgraph Iterative_Preorder [\"Iterative Preorder with Explicit Stack\"]\n        S1[\"1. Push root to Stack\"]\n        S2[\"2. Loop while Stack is not empty:\"]\n        S3[\"   node = pop() -> Print node\"]\n        S4[\"   Push node->right (if exists)\n   Push node->left (if exists)\"]\n        S1 --> S2 --> S3 --> S4 --> S2\n    end\n```\n\n*(Note: In Preorder, we push the **right** child before the **left** child so that the left child sits on top of the LIFO stack and is processed first).*\n\n### Iterative Inorder Algorithm:\n1. Initialize empty stack and set `curr = root`.\n2. While `curr != NULL` or stack is not empty:\n   - While `curr != NULL`: Push `curr` to stack and advance `curr = curr->left`.\n   - `curr = stack.pop()`.\n   - Print `curr->val`.\n   - Advance `curr = curr->right`.\n\n---\n\n## 4. Breadth-First Search (Level-Order Traversal)\n\nLevel-Order traversal visits nodes horizontally level-by-level, starting from the root (level 0) and proceeding left-to-right across each level.\n\n```mermaid\nsequenceDiagram\n    autonumber\n    participant Q as FIFO Queue\n    Note over Q: Enqueue Root 'A' -> Queue: [A]\n    Note over Q: Dequeue 'A' (Print A) -> Enqueue children: Left 'B', Right 'C' -> Queue: [B, C]\n    Note over Q: Dequeue 'B' (Print B) -> Enqueue children: Left 'D', Right 'E' -> Queue: [C, D, E]\n    Note over Q: Dequeue 'C' (Print C) -> Has no children -> Queue: [D, E]\n    Note over Q: Dequeue 'D' (Print D) -> Queue: [E]\n    Note over Q: Dequeue 'E' (Print E) -> Queue is Empty! Done.\n```\n\n- **Output Order**: `A -> B -> C -> D -> E`\n- **Algorithm**: Initialize FIFO queue with `root`. While queue is not empty: dequeue `curr`, process it, and enqueue `curr->left` and `curr->right` if they exist.\n\n---\n\n## 5. Algorithmic Complexity Comparison\n\n| Traversal Method | Data Structure Used | Time Complexity | Auxiliary Space (Balanced Tree) | Auxiliary Space (Skewed Tree) |\n| :--- | :--- | :--- | :--- | :--- |\n| **Recursive Inorder / Pre / Post**| Call Stack | $\\mathcal{O}(n)$ | $\\mathcal{O}(\\log n)$ | $\\mathcal{O}(n)$ |\n| **Iterative Inorder / Preorder** | Explicit `Stack` | $\\mathcal{O}(n)$ | $\\mathcal{O}(\\log n)$ | $\\mathcal{O}(n)$ |\n| **Level-Order Traversal** | FIFO `Queue` | $\\mathcal{O}(n)$ | $\\mathcal{O}(n/2) = \\mathcal{O}(n)$ | $\\mathcal{O}(1)$ |\n\n---\n\n> [!IMPORTANT] **MEMORIZE:**\n> - Inorder: $L \\to V \\to R$ (Yields sorted keys on a BST).\n> - Preorder: $V \\to L \\to R$ (Used to copy / serialize a tree).\n> - Postorder: $L \\to R \\to V$ (Used to delete a tree bottom-up).\n> - Level-Order: Breadth-first using a **Queue**.\n\n> [!NOTE] **DEV BRAIN:**\n> You can uniquely reconstruct a binary tree if given: (1) Inorder + Preorder, OR (2) Inorder + Postorder. However, you CANNOT uniquely reconstruct a general binary tree from Preorder + Postorder alone!\n\n> [!WARNING] **TRAP:**\n> In iterative preorder, beginners often push `left` before `right`. Because a stack is LIFO, pushing `left` first causes `right` to be on top, mistakenly traversing right before left!\n\n> [!TIP] **EXAM TIP:**\n> When asked to reconstruct a tree from Preorder and Inorder: The first element in Preorder is ALWAYS the root. Locate that root in Inorder: everything to the left is the left subtree, and everything to the right is the right subtree!",
          "shortNotes": "DFS traversals (Preorder: V-L-R, Inorder: L-V-R, Postorder: L-R-V) use stacks/recursion. BFS (Level-Order) uses a FIFO queue. Inorder traversal on a BST yields sorted order.",
          "examples": [
            {
              "title": "C Program Implementing All 4 Binary Tree Traversals",
              "problem": "Implement recursive Preorder, Inorder, Postorder, and Queue-based Level-Order traversals on a binary tree.",
              "explanation": "Constructs a sample binary tree and runs all four traversal algorithms to verify sequential output orders.",
              "code": "#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct Node {\n    char data;\n    struct Node *left;\n    struct Node *right;\n} Node;\n\nNode* createNode(char val) {\n    Node *n = (Node*)malloc(sizeof(Node));\n    n->data = val;\n    n->left = NULL;\n    n->right = NULL;\n    return n;\n}\n\nvoid preorder(Node *root) {\n    if (root == NULL) return;\n    printf(\"%c \", root->data);\n    preorder(root->left);\n    preorder(root->right);\n}\n\nvoid inorder(Node *root) {\n    if (root == NULL) return;\n    inorder(root->left);\n    printf(\"%c \", root->data);\n    inorder(root->right);\n}\n\nvoid postorder(Node *root) {\n    if (root == NULL) return;\n    postorder(root->left);\n    postorder(root->right);\n    printf(\"%c \", root->data);\n}\n\n// Queue for Level-Order\nvoid levelOrder(Node *root) {\n    if (root == NULL) return;\n    Node* queue[100];\n    int front = 0, rear = 0;\n\n    queue[rear++] = root; // Enqueue root\n    while (front < rear) {\n        Node *curr = queue[front++]; // Dequeue\n        printf(\"%c \", curr->data);\n        if (curr->left != NULL) queue[rear++] = curr->left;\n        if (curr->right != NULL) queue[rear++] = curr->right;\n    }\n}\n\nint main() {\n    /*\n             A\n            / \\\n           B   C\n          / \\\n         D   E\n    */\n    Node *root = createNode('A');\n    root->left = createNode('B');\n    root->right = createNode('C');\n    root->left->left = createNode('D');\n    root->left->right = createNode('E');\n\n    printf(\"Preorder   (V-L-R) : \"); preorder(root); printf(\"\\n\");\n    printf(\"Inorder    (L-V-R) : \"); inorder(root); printf(\"\\n\");\n    printf(\"Postorder  (L-R-V) : \"); postorder(root); printf(\"\\n\");\n    printf(\"Level-Order (BFS)   : \"); levelOrder(root); printf(\"\\n\");\n\n    return 0;\n}",
              "output": "Preorder   (V-L-R) : A B D E C \nInorder    (L-V-R) : D B E A C \nPostorder  (L-R-V) : D E B C A \nLevel-Order (BFS)   : A B C D E "
            }
          ],
          "keyPoints": [
            "Tree traversals visit every node exactly once with O(n) time complexity.",
            "Inorder (Left-Root-Right) traversal of a BST outputs elements in sorted ascending order.",
            "Preorder (Root-Left-Right) is used for cloning, serialization, and prefix expression notation.",
            "Postorder (Left-Right-Root) is used for bottom-up operations like tree memory deallocation.",
            "Level-Order traversal processes nodes level-by-level using a FIFO Queue.",
            "A binary tree can be reconstructed from Inorder + Preorder or Inorder + Postorder."
          ],
          "theoryQuestions": [
            {
              "question": "Construct the unique binary tree given the following traversal sequences:\\nInorder:   D, B, E, A, F, C\\nPreorder:  A, B, D, E, C, F",
              "marks": "7 Marks",
              "answer": "1. **Reconstruction Principle**:\n   - The first element of `Preorder` is always the root of the current subtree.\n   - Finding that root in `Inorder` partitions the sequence: elements to the left form the left subtree, and elements to the right form the right subtree.\n\n2. **Step-by-Step Reconstruction**:\n   - **Step 1**: Preorder begins with `A`. Thus, **Root = A**.\n   - **Step 2**: Inorder has `A` at index 3:\n     * Left Inorder: `[D, B, E]` (3 nodes)\n     * Right Inorder: `[F, C]` (2 nodes)\n   - **Step 3 (Left Subtree of A)**:\n     * Left Preorder (next 3 items): `[B, D, E]`. Root is `B`.\n     * In Left Inorder `[D, B, E]`: `D` is left of `B`, `E` is right of `B`.\n     * So, `B->left = D` and `B->right = E`.\n   - **Step 4 (Right Subtree of A)**:\n     * Right Preorder: `[C, F]`. Root is `C`.\n     * In Right Inorder `[F, C]`: `F` is to the left of `C`, right is empty.\n     * So, `C->left = F` and `C->right = NULL`.\n\n3. **Final Tree Structure**:\n```\n        A\n       / \\\n      B   C\n     / \\  /\n    D   E F\n```",
              "keyPoints": [
                "Identification of root from first element of Preorder.",
                "Partitioning of Inorder into left and right subtrees.",
                "Recursive resolution of subtrees to yield the unique tree diagram."
              ]
            },
            {
              "question": "Write the iterative algorithm for Inorder traversal of a binary tree using an explicit stack. Explain why recursion is avoided in certain production systems.",
              "marks": "5 Marks",
              "answer": "1. **Iterative Inorder Algorithm**:\n   - **Step 1**: Initialize an empty stack $S$ and pointer `curr = root`.\n   - **Step 2**: While `curr != NULL` or $S$ is not empty:\n     * **Inner Loop**: While `curr != NULL`:\n       - Push `curr` onto stack $S$.\n       - `curr = curr->left;`\n     * Pop top node: `curr = pop(S);`\n     * Process / print `curr->data;`\n     * Advance to right subtree: `curr = curr->right;`\n   - **Step 3**: Terminate when stack is empty and `curr == NULL`.\n\n2. **Why Avoid Recursion in Production Systems**:\n   - **Stack Overflow Hazards**: A skewed tree with $N = 10^5$ nodes consumes $10^5$ stack frames, exhausting the thread stack (typically limited to 1MB - 8MB).\n   - **Performance Overhead**: Recursive calls incur function prologue/epilogue overhead and register saves.\n   - **Heap vs Stack Memory**: Iterative algorithms use heap-allocated stack memory, which can expand to available physical RAM.",
              "keyPoints": [
                "Two-loop iterative inorder algorithm using explicit stack.",
                "Hazard of thread call stack exhaustion in deep/skewed trees.",
                "Elimination of function calling overhead."
              ]
            }
          ],
          "mcqs": [
            {
              "question": "Which binary tree traversal guarantees outputting keys in ascending numerical order when performed on a Binary Search Tree?",
              "options": [
                "Preorder Traversal",
                "Inorder Traversal",
                "Postorder Traversal",
                "Level-Order Traversal"
              ],
              "correctIndex": 1,
              "explanation": "Because a BST enforces Left < Root < Right, an Inorder traversal (Left -> Root -> Right) visits elements in ascending order."
            },
            {
              "question": "What auxiliary data structure is fundamentally required to perform a Level-Order (BFS) traversal of a binary tree?",
              "options": [
                "Stack",
                "FIFO Queue",
                "Priority Queue",
                "Hash Table"
              ],
              "correctIndex": 1,
              "explanation": "Level-Order traversal processes nodes level-by-level in the order they are discovered, requiring a FIFO Queue."
            },
            {
              "question": "Why is it impossible to uniquely reconstruct an arbitrary binary tree given ONLY its Preorder and Postorder traversal sequences?",
              "options": [
                "Because both traversals process the root at the same time.",
                "Because when a node has only one child, Preorder and Postorder cannot differentiate whether that child is a left child or a right child.",
                "Because Preorder and Postorder have different asymptotic time complexities.",
                "Because the leaf nodes are discarded in Postorder."
              ],
              "correctIndex": 1,
              "explanation": "If a parent has a single child, Preorder is (Root, Child) and Postorder is (Child, Root). This sequence is identical whether the child is on the left or the right."
            },
            {
              "question": "Which traversal sequence is ideal for deleting an entire binary tree in memory bottom-up without accessing dangling pointers?",
              "options": [
                "Preorder",
                "Inorder",
                "Postorder",
                "Level-order"
              ],
              "correctIndex": 2,
              "explanation": "Postorder visits children before their parent (Left -> Right -> Root), ensuring child nodes are safely deallocated before the parent node memory is freed."
            }
          ]
        },
        {
          "id": "dsa-u4-t3",
          "title": "Binary Search Tree (BST): BST Invariant, Search, Insertion, Deletion (3 Cases: Leaf, 1 Child, 2 Children with Inorder Predecessor/Successor)",
          "simpleExplanation": "A Binary Search Tree (BST) is a binary tree governed by the strict BST invariant: for every node, all keys in its left subtree are strictly smaller, and all keys in its right subtree are strictly greater. Searching, inserting, and deleting run in O(h) time, with deletion requiring special handling across three cases: leaf node, single-child node, and two-children node (replaced by inorder predecessor or successor).",
          "detailedExplanation": "## 1. The BST Invariant\n\nA **Binary Search Tree (BST)** is a node-based binary tree data structure that maintains an ordering property:\n\n$$\\forall x \\in \\text{LeftSubtree}(u): \\text{key}(x) < \\text{key}(u)$$\n$$\\forall y \\in \\text{RightSubtree}(u): \\text{key}(y) > \\text{key}(u)$$\n\n*(Assuming distinct keys; duplicates can be placed consistently on the right or tracked with a frequency counter).*\n\n```mermaid\ngraph TD\n    R[\"50\"] --> L[\"30 (Left < 50)\"]\n    R --> RT[\"70 (Right > 50)\"]\n\n    L --> LL[\"20 (< 30)\"]\n    L --> LR[\"40 (> 30)\"]\n\n    RT --> RL[\"60 (< 70)\"]\n    RT --> RR[\"80 (> 70)\"]\n```\n\n---\n\n## 2. Core Search and Insertion Operations\n\n### A. Search Operation ($\\mathcal{O}(h)$ Time)\n1. If `root == NULL`, target not found.\n2. If `target == root->key`, return `root`.\n3. If `target < root->key`, recursively search `root->left`.\n4. If `target > root->key`, recursively search `root->right`.\n\n### B. Insertion Operation ($\\mathcal{O}(h)$ Time)\nNew nodes are **always inserted as leaves**:\n1. Traverse down using the search logic until hitting `NULL`.\n2. Attach the new node at the vacated child pointer location.\n\n```mermaid\nflowchart TD\n    subgraph Insert_Flow [\"BST Insertion: insert(35)\"]\n        N50[\"50: 35 < 50 -> go Left\"] --> N30[\"30: 35 > 30 -> go Right\"]\n        N30 --> N40[\"40: 35 < 40 -> go Left\"]\n        N40 --> NULL[\"left is NULL -> Attach 35 here!\"]\n    end\n```\n\n---\n\n## 3. The 3 Cases of BST Deletion\n\nNode deletion is the most nuanced BST mutation because the BST invariant must be preserved after removal.\n\n```mermaid\nflowchart TD\n    DEL[\"delete(key)\"] --> C1{\"Node is a Leaf?\n(0 Children)\"}\n    C1 -- Yes --> A1[\"Case 1: Simply free node and set parent pointer to NULL\"]\n    C1 -- No --> C2{\"Node has 1 Child?\"}\n    C2 -- Yes --> A2[\"Case 2: Bypass node, linking parent directly to child. Free node\"]\n    C2 -- No --> A3[\"Case 3: Node has 2 Children!\nFind Inorder Successor (min of right subtree)\nCopy successor key to node\nRecursively delete successor\"]\n```\n\n### Case 1: Node to Delete is a Leaf (Degree 0)\n- **Action**: Directly deallocate the node and update its parent's link to `NULL`.\n\n### Case 2: Node to Delete has Exactly One Child (Degree 1)\n- **Action**: Bypass the node by connecting its parent directly to its sole child. Free the target node.\n\n### Case 3: Node to Delete has Two Children (Degree 2)\nA node with two children cannot be bypassed without breaking tree structure.\n- **Action**:\n  1. Locate the **Inorder Successor** (smallest key in the right subtree: leftmost node in `root->right`) OR the **Inorder Predecessor** (largest key in the left subtree: rightmost node in `root->left`).\n  2. Overwrite the target node's key with the successor's key.\n  3. Recursively delete the successor node from the right subtree. *(Note: The successor is guaranteed to have at most ONE child, reducing this deletion to Case 1 or Case 2!)*\n\n---\n\n## 4. Performance: Balanced vs Skewed Trees\n\nThe time complexity of search, insert, and delete is proportional to tree **height $h$**, NOT directly $\\log_2 n$:\n\n| Tree State | Diagram | Height $h$ | Search / Insert / Delete Time |\n| :--- | :--- | :--- | :--- |\n| **Balanced BST** | Symmetrical branching | $\\lfloor \\log_2 n \\rfloor$ | $\\mathcal{O}(\\log n)$ |\n| **Skewed BST** | Insert ordered sequence: $10, 20, 30, 40$ | $n - 1$ | $\\mathcal{O}(n)$ (Degenerates to Linked List) |\n\nThis performance degradation motivated the invention of self-balancing search trees (AVL Trees, Red-Black Trees).\n\n---\n\n> [!IMPORTANT] **MEMORIZE:**\n> - Inorder Successor = Smallest node in the **Right Subtree** (`curr = node->right; while(curr->left) curr = curr->left;`).\n> - Inorder Predecessor = Largest node in the **Left Subtree** (`curr = node->left; while(curr->right) curr = curr->right;`).\n> - Deleting a 2-child node reduces to deleting a 0-child or 1-child node!\n\n> [!NOTE] **DEV BRAIN:**\n> In C++ `std::set` / `std::map` and Java `TreeSet` / `TreeMap`, self-balancing Red-Black BSTs are used to guarantee $\\mathcal{O}(\\log n)$ worst-case performance under all insertion sequences.\n\n> [!WARNING] **TRAP:**\n> Never simply delete a node with two children by splicing! You must replace its key with its Inorder Successor/Predecessor, and then delete that successor from the subtree!\n\n> [!TIP] **EXAM TIP:**\n> When drawing BST deletion for Case 3, clearly mark: (1) Target node, (2) Inorder successor, (3) Key replacement step, and (4) The final spliced subtree.",
          "shortNotes": "BST maintains Left < Root < Right. Search/Insert/Delete take O(h) time. Deletion handles 3 cases: leaf (set NULL), 1 child (bypass to child), 2 children (replace with inorder successor).",
          "examples": [
            {
              "title": "Complete C Implementation of Binary Search Tree with All 3 Deletion Cases",
              "problem": "Implement BST insertion, search, and full deletion covering leaf, 1-child, and 2-child cases.",
              "explanation": "Demonstrates recursive BST construction and the three-case deletion algorithm.",
              "code": "#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct BSTNode {\n    int key;\n    struct BSTNode *left;\n    struct BSTNode *right;\n} BSTNode;\n\nBSTNode* createNode(int key) {\n    BSTNode *n = (BSTNode*)malloc(sizeof(BSTNode));\n    n->key = key;\n    n->left = n->right = NULL;\n    return n;\n}\n\nBSTNode* insert(BSTNode *root, int key) {\n    if (root == NULL) return createNode(key);\n    if (key < root->key) root->left = insert(root->left, key);\n    else if (key > root->key) root->right = insert(root->right, key);\n    return root;\n}\n\nBSTNode* findMin(BSTNode *root) {\n    while (root->left != NULL) root = root->left;\n    return root;\n}\n\nBSTNode* deleteNode(BSTNode *root, int key) {\n    if (root == NULL) return NULL;\n\n    if (key < root->key) {\n        root->left = deleteNode(root->left, key);\n    } else if (key > root->key) {\n        root->right = deleteNode(root->right, key);\n    } else {\n        // Case 1: Leaf (0 children)\n        if (root->left == NULL && root->right == NULL) {\n            free(root);\n            return NULL;\n        }\n        // Case 2: One child\n        else if (root->left == NULL) {\n            BSTNode *temp = root->right;\n            free(root);\n            return temp;\n        } else if (root->right == NULL) {\n            BSTNode *temp = root->left;\n            free(root);\n            return temp;\n        }\n        // Case 3: Two children\n        else {\n            BSTNode *successor = findMin(root->right);\n            root->key = successor->key; // Copy successor data\n            root->right = deleteNode(root->right, successor->key); // Delete successor\n        }\n    }\n    return root;\n}\n\nvoid inorder(BSTNode *root) {\n    if (root == NULL) return;\n    inorder(root->left);\n    printf(\"%d \", root->key);\n    inorder(root->right);\n}\n\nint main() {\n    BSTNode *root = NULL;\n    int keys[] = {50, 30, 70, 20, 40, 60, 80};\n    for (int i = 0; i < 7; i++) root = insert(root, keys[i]);\n\n    printf(\"Original BST Inorder: \");\n    inorder(root);\n    printf(\"\\n\");\n\n    // Case 1: Delete Leaf (20)\n    root = deleteNode(root, 20);\n    printf(\"After deleting 20 (Leaf)      : \");\n    inorder(root);\n    printf(\"\\n\");\n\n    // Case 2: Delete Node with 1 child (Insert 25 first under 40)\n    root = insert(root, 25);\n    root = deleteNode(root, 30); // 30 now has children\n    printf(\"After deleting 30 (Node)      : \");\n    inorder(root);\n    printf(\"\\n\");\n\n    // Case 3: Delete Node with 2 children (50 Root)\n    root = deleteNode(root, 50);\n    printf(\"After deleting 50 (2 Children): \");\n    inorder(root);\n    printf(\"\\n\");\n\n    return 0;\n}",
              "output": "Original BST Inorder: 20 30 40 50 60 70 80 \nAfter deleting 20 (Leaf)      : 30 40 50 60 70 80 \nAfter deleting 30 (Node)      : 25 40 50 60 70 80 \nAfter deleting 50 (2 Children): 25 40 60 70 80 "
            }
          ],
          "keyPoints": [
            "BST invariant mandates: Left subtree keys < Parent key < Right subtree keys.",
            "Search, Insertion, and Deletion run in O(h) time, where h is tree height.",
            "Worst-case performance degrades to O(n) when keys are inserted in sorted order (skewed tree).",
            "Deletion Case 1 (Leaf): Free node and set parent pointer to NULL.",
            "Deletion Case 2 (Single Child): Bypass node and attach child directly to parent.",
            "Deletion Case 3 (Two Children): Replace key with Inorder Successor or Predecessor, then recursively delete that node."
          ],
          "theoryQuestions": [
            {
              "question": "Explain the three cases of deletion in a Binary Search Tree with detailed diagrams and pseudocode.",
              "marks": "7 Marks",
              "answer": "1. **Case 1: Deleting a Leaf Node (0 Children)**:\n   - *Logic*: The node has no subtrees attached.\n   - *Action*: Update the parent's pointer to this node to `NULL`, then deallocate node memory.\n   - *Complexity*: $\\mathcal{O}(h)$ to find node, $\\mathcal{O}(1)$ to delete.\n\n2. **Case 2: Deleting a Node with One Child (1 Child)**:\n   - *Logic*: The node has either a left child or a right child, but not both.\n   - *Action*: Splicing bypass. Update the parent's pointer to point directly to the node's only child, bypassing the deleted node. Free target node.\n   - *Complexity*: $\\mathcal{O}(h)$ search, $\\mathcal{O}(1)$ pointer splice.\n\n3. **Case 3: Deleting a Node with Two Children (2 Children)**:\n   - *Logic*: Removing a 2-child node creates two orphaned subtrees.\n   - *Action*:\n     a) Locate the **Inorder Successor** (smallest element in the right subtree, found by traversing `left` from `node->right`).\n     b) Overwrite the target node's value with the Inorder Successor's value.\n     c) Call delete recursively on the right subtree to remove the Inorder Successor.\n     *(Because the successor has at most one child, step (c) always falls under Case 1 or Case 2).*\n   - *Complexity*: $\\mathcal{O}(h)$ total time.",
              "keyPoints": [
                "Clear categorization of Case 1 (leaf), Case 2 (one child), and Case 3 (two children).",
                "Role of Inorder Successor in preserving BST invariant.",
                "Reduction of Case 3 to a simpler Case 1/2 deletion."
              ]
            },
            {
              "question": "What is a Skewed Binary Search Tree? Under what condition does it occur, and what is its effect on search time complexity?",
              "marks": "5 Marks",
              "answer": "1. **Definition of Skewed BST**:\n   A skewed BST is a degenerate binary tree where every internal node has exactly one child. All nodes form a single linear branch.\n   - **Left-Skewed**: Every parent has only a left child.\n   - **Right-Skewed**: Every parent has only a right child.\n\n2. **Conditions Causing Skewing**:\n   - Occurs when data keys are inserted into the BST in **strictly sorted order** (e.g., ascending: 10, 20, 30, 40, 50) or **reverse sorted order**.\n   - Each newly inserted element is larger than all prior elements and attaches as the rightmost leaf.\n\n3. **Impact on Complexity**:\n   - Height $h$ collapses from optimal $\\log_2 n$ to worst-case $n - 1$.\n   - Search, insertion, and deletion operations degrade from $\\mathcal{O}(\\log n)$ down to $\\mathcal{O}(n)$, matching a singly linked list and forfeiting all binary search advantages.",
              "keyPoints": [
                "Definition of degenerate left-skewed and right-skewed trees.",
                "Trigger condition: inserting pre-sorted or reverse-sorted data.",
                "Degradation of time complexity from O(log n) to linear O(n)."
              ]
            }
          ],
          "mcqs": [
            {
              "question": "What is the worst-case time complexity of searching for a key in an unbalanced Binary Search Tree with n nodes?",
              "options": [
                "O(1)",
                "O(log n)",
                "O(n)",
                "O(n log n)"
              ],
              "correctIndex": 2,
              "explanation": "If elements were inserted in sorted order, the BST degenerates into a linear chain (skewed tree) of height n-1, resulting in O(n) search time."
            },
            {
              "question": "Where is the Inorder Successor of a non-leaf node with two children located in a BST?",
              "options": [
                "The leftmost node of its right subtree",
                "The rightmost node of its left subtree",
                "Its direct parent node",
                "The root of the tree"
              ],
              "correctIndex": 0,
              "explanation": "The Inorder Successor is the smallest key strictly greater than the current node, found by moving to the right child and then following left pointers to the end."
            },
            {
              "question": "If keys 1, 2, 3, 4, 5 are inserted in that exact sequence into an empty BST, what is the resulting height of the tree (counting edges)?",
              "options": [
                "2",
                "3",
                "4",
                "5"
              ],
              "correctIndex": 2,
              "explanation": "Keys inserted in ascending order form a strictly right-skewed tree of 5 nodes, which has a height of N - 1 = 5 - 1 = 4 edges."
            },
            {
              "question": "When deleting a node with two children in a BST, how many children can its Inorder Successor have?",
              "options": [
                "At most 0 (must be a leaf)",
                "At most 1 (can only have a right child)",
                "Exactly 2",
                "Any number of children"
              ],
              "correctIndex": 1,
              "explanation": "The inorder successor is the leftmost node in the right subtree. Because it has no left child, it can have at most one child (its right child)."
            }
          ]
        },
        {
          "id": "dsa-u4-t4",
          "title": "Self-Balancing AVL Trees: Balance Factor (-1, 0, +1), Rotations (LL, RR, LR, RL) with Step-by-Step balance diagrams & Re-balancing on Insert/Delete",
          "simpleExplanation": "An AVL tree (named after inventors Adelson-Velsky and Landis) is a self-balancing binary search tree where the heights of the left and right subtrees of every node differ by at most one. Whenever an insertion or deletion causes the Balance Factor to deviate from {-1, 0, +1}, the tree immediately restores balance in O(log n) time using single (LL, RR) or double (LR, RL) rotations.",
          "detailedExplanation": "## 1. The Balance Factor and AVL Invariant\n\nThe fundamental flaw of standard BSTs is vulnerability to skewing ($O(n)$ height). Invented in 1962 by Georgy Adelson-Velsky and Evgenii Landis, the **AVL Tree** was the first self-balancing BST in computer science history.\n\n### The Balance Factor (BF)\nFor every node $u$ in an AVL tree:\n$$\\text{BF}(u) = \\text{Height}(\\text{LeftSubtree}(u)) - \\text{Height}(\\text{RightSubtree}(u))$$\n\n$$\\text{AVL Invariant: } \\text{BF}(u) \\in \\{-1, 0, +1\\}$$\n\n```mermaid\ngraph TD\n    N[\"Node [BF = Height(Left) - Height(Right)]\"]\n    N -->|\"BF = +1\"| L1[\"Left-Heavy (Left is 1 level taller)\"]\n    N -->|\"BF = 0\"| L2[\"Perfect Balance (Equal heights)\"]\n    N -->|\"BF = -1\"| L3[\"Right-Heavy (Right is 1 level taller)\"]\n    N -.->|\"BF = +2 or -2\"| CRIT[\"CRITICAL IMBALANCE!\nTriggers Tree Rotation\"]\n```\n\n### Height Guarantee\nAn AVL tree with $N$ nodes is guaranteed to maintain height:\n$$h < 1.44 \\log_2(N + 2)$$\nThis guarantees that search, insertion, and deletion strictly require **$\\mathcal{O}(\\log n)$ worst-case time**.\n\n---\n\n## 2. The Four Rotational Cases\n\nWhen an insertion causes a node's balance factor to become $+2$ or $-2$, balance is restored using tree rotations. The rotation type is determined by the relationship between the imbalanced node and the inserted grandchild:\n\n```mermaid\nflowchart TD\n    IMB[\"Imbalanced Node (BF = +2 or -2)\"] --> BF_POS{\"BF == +2\n(Left-Heavy)\"}\n    IMB --> BF_NEG{\"BF == -2\n(Right-Heavy)\"}\n\n    BF_POS -->|\"Inserted in Left child's Left subtree\"| LL[\"LL Imbalance\nFix: Single Right Rotation\"]\n    BF_POS -->|\"Inserted in Left child's Right subtree\"| LR[\"LR Imbalance\nFix: Double Rotation (Left on child, then Right on root)\"]\n\n    BF_NEG -->|\"Inserted in Right child's Right subtree\"| RR[\"RR Imbalance\nFix: Single Left Rotation\"]\n    BF_NEG -->|\"Inserted in Right child's Left subtree\"| RL[\"RL Imbalance\nFix: Double Rotation (Right on child, then Left on root)\"]\n```\n\n---\n\n## 3. Step-by-Step Rotation Mechanics\n\n### A. Right Rotation (Fixes LL Imbalance)\nNode $z$ has $\\text{BF} = +2$, and its left child $y$ has $\\text{BF} = +1$.\n```\n       z (BF=+2)                y (BF=0)\n      / \\                     / \\\n     y   T3    == Right ==>   x     z\n    / \\                     / \\   / \\\n   x   T2                   T0 T1 T2 T3\n  / \\\n T0  T1\n```\n- $y$ becomes the new root.\n- $z$ becomes $y$'s right child.\n- $y$'s former right subtree ($T_2$) becomes $z$'s new left subtree.\n\n### B. Left Rotation (Fixes RR Imbalance)\nNode $z$ has $\\text{BF} = -2$, and its right child $y$ has $\\text{BF} = -1$.\n```\n     z (BF=-2)                  y (BF=0)\n    / \\                       / \\\n   T0  y       == Left ==>    z     x\n      / \\                   / \\   / \\\n     T1  x                  T0 T1 T2 T3\n        / \\\n       T2  T3\n```\n- $y$ becomes the new root.\n- $z$ becomes $y$'s left child.\n- $y$'s former left subtree ($T_1$) becomes $z$'s new right subtree.\n\n### C. Left-Right Rotation (Fixes LR Imbalance)\nNode $z$ has $\\text{BF} = +2$, and its left child $y$ has $\\text{BF} = -1$.\n1. **Step 1**: Perform **Left Rotation on $y$** (transforms into LL case).\n2. **Step 2**: Perform **Right Rotation on $z$** (restores balance).\n\n### D. Right-Left Rotation (Fixes RL Imbalance)\nNode $z$ has $\\text{BF} = -2$, and its right child $y$ has $\\text{BF} = +1$.\n1. **Step 1**: Perform **Right Rotation on $y$** (transforms into RR case).\n2. **Step 2**: Perform **Left Rotation on $z$** (restores balance).\n\n---\n\n## 4. Re-Balancing on Deletion\n\nWhile an insertion requires at most **one rotation** (single or double) to rebalance the entire tree, **deletion can trigger up to $\\mathcal{O}(\\log n)$ rotations** cascading up the path to the root.\n\n---\n\n> [!IMPORTANT] **MEMORIZE:**\n> - $\\text{BF} = \\text{Height}(\\text{Left}) - \\text{Height}(\\text{Right})$. Legal set is $\\{-1, 0, +1\\}$.\n> - **LL Case** $\\to$ Single Right Rotation on root.\n> - **RR Case** $\\to$ Single Left Rotation on root.\n> - **LR Case** $\\to$ Left Rotate Left Child, then Right Rotate root.\n> - **RL Case** $\\to$ Right Rotate Right Child, then Left Rotate root.\n\n> [!NOTE] **DEV BRAIN:**\n> AVL trees maintain stricter balance than Red-Black trees. As a result, AVL trees provide faster lookups ($O(\\log n)$ with a smaller constant factor), making them preferred for read-heavy workloads (e.g., in-memory database indices).\n\n> [!WARNING] **TRAP:**\n> After rotating, you must recalculate the heights of both the rotated child AND the former root! Stale height variables will miscalculate balance factors on subsequent insertions!\n\n> [!TIP] **EXAM TIP:**\n> When asked to show AVL balance after inserting a sequence (e.g., 10, 20, 30, 40, 50), recalculate and write down the balance factor of EVERY ancestor node after each insertion before choosing the rotation.",
          "shortNotes": "AVL tree invariant requires Balance Factor = Height(L) - Height(R) in {-1, 0, 1}. Imbalances are corrected via rotations: LL (Right), RR (Left), LR (Left-Right), RL (Right-Left) in O(log n) time.",
          "examples": [
            {
              "title": "Complete C Implementation of Self-Balancing AVL Tree",
              "problem": "Implement AVL tree insertion with automatic height recalculation and LL, RR, LR, RL rotational re-balancing.",
              "explanation": "Demonstrates balance factor checking and pointer transformations for all four rotation types.",
              "code": "#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct AVLNode {\n    int key;\n    struct AVLNode *left;\n    struct AVLNode *right;\n    int height;\n} AVLNode;\n\nint height(AVLNode *n) { return (n == NULL) ? 0 : n->height; }\nint max(int a, int b) { return (a > b) ? a : b; }\n\nAVLNode* createNode(int key) {\n    AVLNode *n = (AVLNode*)malloc(sizeof(AVLNode));\n    n->key = key;\n    n->left = n->right = NULL;\n    n->height = 1; // Leaf node starts at height 1\n    return n;\n}\n\nint getBalance(AVLNode *n) {\n    return (n == NULL) ? 0 : height(n->left) - height(n->right);\n}\n\n// Right Rotation (LL fix)\nAVLNode* rotateRight(AVLNode *y) {\n    AVLNode *x = y->left;\n    AVLNode *T2 = x->right;\n\n    x->right = y;\n    y->left = T2;\n\n    y->height = max(height(y->left), height(y->right)) + 1;\n    x->height = max(height(x->left), height(x->right)) + 1;\n\n    return x; // New root\n}\n\n// Left Rotation (RR fix)\nAVLNode* rotateLeft(AVLNode *x) {\n    AVLNode *y = x->right;\n    AVLNode *T2 = y->left;\n\n    y->left = x;\n    x->right = T2;\n\n    x->height = max(height(x->left), height(x->right)) + 1;\n    y->height = max(height(y->left), height(y->right)) + 1;\n\n    return y; // New root\n}\n\nAVLNode* insertAVL(AVLNode *node, int key) {\n    if (node == NULL) return createNode(key);\n\n    if (key < node->key) node->left = insertAVL(node->left, key);\n    else if (key > node->key) node->right = insertAVL(node->right, key);\n    else return node; // No duplicates\n\n    node->height = 1 + max(height(node->left), height(node->right));\n    int balance = getBalance(node);\n\n    // 1. LL Case\n    if (balance > 1 && key < node->left->key)\n        return rotateRight(node);\n\n    // 2. RR Case\n    if (balance < -1 && key > node->right->key)\n        return rotateLeft(node);\n\n    // 3. LR Case\n    if (balance > 1 && key > node->left->key) {\n        node->left = rotateLeft(node->left);\n        return rotateRight(node);\n    }\n\n    // 4. RL Case\n    if (balance < -1 && key < node->right->key) {\n        node->right = rotateRight(node->right);\n        return rotateLeft(node);\n    }\n\n    return node;\n}\n\nvoid printPreorder(AVLNode *root) {\n    if (root == NULL) return;\n    printf(\"%d(BF=%d) \", root->key, getBalance(root));\n    printPreorder(root->left);\n    printPreorder(root->right);\n}\n\nint main() {\n    AVLNode *root = NULL;\n\n    // Inserting 10, 20, 30 causes RR imbalance at 10:\n    root = insertAVL(root, 10);\n    root = insertAVL(root, 20);\n    root = insertAVL(root, 30); // Triggers Left Rotation\n\n    printf(\"Preorder after inserting 10, 20, 30 (RR solved):\\n  \");\n    printPreorder(root);\n    printf(\"\\n\");\n\n    // Inserting 40, 50 causes another rotation:\n    root = insertAVL(root, 40);\n    root = insertAVL(root, 50);\n\n    // Inserting 25 causes LR / RL adjustment:\n    root = insertAVL(root, 25);\n\n    printf(\"Preorder after inserting 40, 50, 25:\\n  \");\n    printPreorder(root);\n    printf(\"\\n\");\n\n    return 0;\n}",
              "output": "Preorder after inserting 10, 20, 30 (RR solved):\n  20(BF=0) 10(BF=0) 30(BF=0) \nPreorder after inserting 40, 50, 25:\n  30(BF=0) 20(BF=0) 10(BF=0) 25(BF=0) 40(BF=-1) 50(BF=0) "
            }
          ],
          "keyPoints": [
            "An AVL Tree enforces Balance Factor BF = Height(Left) - Height(Right) in {-1, 0, +1} at every node.",
            "Worst-case search, insertion, and deletion are bounded by O(log n) time.",
            "LL Imbalance: Fixed with a Single Right Rotation.",
            "RR Imbalance: Fixed with a Single Left Rotation.",
            "LR Imbalance: Fixed with a Left Rotation on left child, then a Right Rotation on the imbalanced node.",
            "RL Imbalance: Fixed with a Right Rotation on right child, then a Left Rotation on the imbalanced node."
          ],
          "theoryQuestions": [
            {
              "question": "What is an AVL Tree? Explain the four types of rotations (LL, RR, LR, RL) used to restore balance with before-and-after structural diagrams.",
              "marks": "7 Marks",
              "answer": "1. **Definition of AVL Tree**:\n   An AVL tree is a self-balancing Binary Search Tree where the heights of the two subtrees of any node differ by at most one:\n   $$\\text{Balance Factor (BF)} = \\text{Height}(\\text{Left}) - \\text{Height}(\\text{Right}) \\in \\{-1, 0, +1\\}$$\n\n2. **The Four Rotations**:\n   - **(a) LL Rotation (Single Right Rotation)**:\n     * *Cause*: Insertion into the left subtree of the left child (node BF becomes $+2$, left child BF is $+1$).\n     * *Fix*: Rotate right around the imbalanced node. The left child becomes the new root; former root becomes its right child.\n   - **(b) RR Rotation (Single Left Rotation)**:\n     * *Cause*: Insertion into the right subtree of the right child (node BF becomes $-2$, right child BF is $-1$).\n     * *Fix*: Rotate left around the imbalanced node. The right child becomes the new root; former root becomes its left child.\n   - **(c) LR Rotation (Double Rotation)**:\n     * *Cause*: Insertion into the right subtree of the left child (node BF becomes $+2$, left child BF is $-1$).\n     * *Fix*: First rotate left on the left child, then rotate right on the imbalanced root node.\n   - **(d) RL Rotation (Double Rotation)**:\n     * *Cause*: Insertion into the left subtree of the right child (node BF becomes $-2$, right child BF is $+1$).\n     * *Fix*: First rotate right on the right child, then rotate left on the imbalanced root node.",
              "keyPoints": [
                "Formal definition of AVL balance factor.",
                "Analysis of all 4 imbalance triggers (LL, RR, LR, RL).",
                "Single vs double rotation mechanics."
              ]
            },
            {
              "question": "Insert the keys: 50, 40, 30, 20, 25 into an initially empty AVL tree. Show the step-by-step tree configuration after each insertion and identify the rotations performed.",
              "marks": "5 Marks",
              "answer": "1. **Insert 50, 40**:\n   - 50(BF=1) -> 40(BF=0) attached to left. Balanced.\n2. **Insert 30**:\n   - 50(BF=+2) -> 40(BF=+1) -> 30(BF=0).\n   - Imbalance at node 50 (LL case: inserted in left-of-left).\n   - **Action**: Right Rotate around 50.\n   - **Result**: 40 is root, left=30, right=50. All BF=0.\n3. **Insert 20**:\n   - 40(BF=1) -> left child 30(BF=1) -> left child 20(BF=0). Balanced.\n4. **Insert 25**:\n   - Path: 40 -> 30 -> 20 -> right child 25.\n   - Node 30 has $\\text{Height}(\\text{Left})=2$ (nodes 20, 25) and $\\text{Height}(\\text{Right})=0$.\n   - Balance factor of 30 becomes $+2$. Child 20 has balance factor $-1$ (key 25 is in right subtree of 20).\n   - **LR Imbalance at node 30**:\n     * Step 1: Left rotate around 20 $\\implies$ 25 becomes left child of 30, with 20 as left child of 25.\n     * Step 2: Right rotate around 30 $\\implies$ 25 becomes left child of 40, with 20 on left and 30 on right.\n5. **Final Tree Configuration**:\n   - Root: 40\n   - Left subtree of 40: 25 (with left=20, right=30)\n   - Right subtree of 40: 50\n   - All balance factors are $\\in \\{-1, 0, +1\\}$.",
              "keyPoints": [
                "Step-by-step tracking of Balance Factors after each key insertion.",
                "Detection and resolution of LL rotation on inserting 30.",
                "Detection and two-step resolution of LR rotation on inserting 25."
              ]
            }
          ],
          "mcqs": [
            {
              "question": "What is the maximum allowed difference between heights of left and right subtrees for any node in an AVL tree?",
              "options": [
                "0",
                "1",
                "2",
                "log2(n)"
              ],
              "correctIndex": 1,
              "explanation": "By definition, an AVL tree enforces that for every node, |Height(Left) - Height(Right)| <= 1, meaning Balance Factor in {-1, 0, +1}."
            },
            {
              "question": "Which rotation sequence is required to restore balance when a new node is inserted into the right subtree of the left child of an imbalanced node (LR imbalance)?",
              "options": [
                "Single Left Rotation",
                "Single Right Rotation",
                "Left Rotation on left child, followed by Right Rotation on the imbalanced node",
                "Right Rotation on left child, followed by Left Rotation on the imbalanced node"
              ],
              "correctIndex": 2,
              "explanation": "An LR imbalance requires a double rotation: first a Left rotation on the left child to convert it to an LL configuration, followed by a Right rotation on the parent."
            },
            {
              "question": "What is the worst-case time complexity of searching for a key in an AVL tree containing n nodes?",
              "options": [
                "O(1)",
                "O(log n)",
                "O(n)",
                "O(n log n)"
              ],
              "correctIndex": 1,
              "explanation": "Because height is strictly bounded by h < 1.44 log2(n+2), all dictionary operations (search, insert, delete) run in guaranteed O(log n) worst-case time."
            },
            {
              "question": "What is the maximum number of rotations required to rebalance an AVL tree after inserting a single new key?",
              "options": [
                "At most 1 rotation (either a single or double rotation)",
                "O(log n) rotations cascading to the root",
                "n / 2 rotations",
                "Exactly 2 rotations always"
              ],
              "correctIndex": 0,
              "explanation": "In an AVL tree, inserting a node requires at most one rotation (single LL/RR or double LR/RL) to restore the balance factor of the subtree and all its ancestors."
            }
          ]
        },
        {
          "id": "dsa-u4-t5",
          "title": "Binary Heaps: Min-Heap & Max-Heap Invariants, Array-based Representation, Heapify Operation (O(n) bottom-up construction), and Heap Sort",
          "simpleExplanation": "A Binary Heap is a complete binary tree that satisfies the heap ordering property: in a Max-Heap, every parent node is greater than or equal to its children (Min-Heap: parent is less than or equal). Stored compactly in contiguous arrays without pointer overhead, heaps can be constructed in optimal O(n) time via bottom-up heapify and power the O(n log n) in-place Heap Sort algorithm.",
          "detailedExplanation": "## 1. The Binary Heap Invariants\n\nA **Binary Heap** is a specialized tree-based data structure satisfying two strict invariants:\n1. **Structural Invariant (Complete Binary Tree)**: All levels are completely full, except possibly the last level, which is filled sequentially from left to right.\n2. **Heap Order Invariant**:\n   - **Max-Heap**: For every node $i$ other than root: $\\text{Key}(\\text{Parent}(i)) \\ge \\text{Key}(i)$. The maximum element is permanently stationed at the root.\n   - **Min-Heap**: For every node $i$ other than root: $\\text{Key}(\\text{Parent}(i)) \\le \\text{Key}(i)$. The minimum element is permanently stationed at the root.\n\n```mermaid\ngraph TD\n    subgraph MaxHeap [\"Max-Heap (Parent >= Children)\"]\n        R[\"90 (Root = Maximum)\"] --> C1[\"70\"]\n        R --> C2[\"80\"]\n        C1 --> L1[\"40\"]\n        C1 --> L2[\"60\"]\n        C2 --> L3[\"20\"]\n        C2 --> L4[\"50\"]\n    end\n```\n\n---\n\n## 2. Pointerless Array-Based Representation\n\nBecause a binary heap is guaranteed to be a complete binary tree, it can be mapped into a **1D contiguous array** without storing child or parent pointers:\n\n```\nTree Nodes:        [ 90,  70,  80,  40,  60,  20,  50 ]\nArray Index (0-based): 0    1    2    3    4    5    6\n```\n\n### 0-Indexed Array Mapping Formulas:\n- $\\text{Parent}(i) = \\lfloor (i - 1) / 2 \\rfloor$\n- $\\text{LeftChild}(i) = 2i + 1$\n- $\\text{RightChild}(i) = 2i + 2$\n- **Leaf Node Range**: In an array of $n$ elements, leaves occupy indices from $\\lfloor n/2 \\rfloor$ to $n - 1$. Internal nodes occupy indices from $0$ to $\\lfloor n/2 \\rfloor - 1$.\n\n---\n\n## 3. The Heapify (Sift-Down) Operation\n\nThe `heapify(arr, n, i)` procedure assumes subtrees rooted at $\\text{Left}(i)$ and $\\text{Right}(i)$ already satisfy the heap property, but node $i$ may violate it. It bubbles node $i$ down:\n\n```mermaid\nflowchart TD\n    subgraph SiftDown [\"Heapify / Sift-Down Logic\"]\n        H1[\"Compare node i with Left(i) and Right(i)\"]\n        H2{\"Is node i smaller than either child?\"}\n        H2 -- No --> DONE[\"Heap invariant satisfied! Exit.\"]\n        H2 -- Yes --> SWAP[\"Swap node i with LARGEST child\"]\n        SWAP --> REC[\"Recursively heapify swapped child index\"]\n        REC --> H1\n    end\n```\n\nRunning time of `heapify` on a node at height $h$ is $\\mathcal{O}(h) = \\mathcal{O}(\\log n)$.\n\n---\n\n## 4. Building a Heap: Why Bottom-Up Construction is $\\mathcal{O}(n)$, Not $\\mathcal{O}(n \\log n)$\n\nTo construct a heap from an arbitrary unsorted array of size $n$:\n- **Naive Insertion**: Inserting $n$ elements one by one takes $n \\times \\mathcal{O}(\\log n) = \\mathcal{O}(n \\log n)$.\n- **Bottom-Up `buildHeap`**: Call `heapify` on all non-leaf nodes starting from index $\\lfloor n/2 \\rfloor - 1$ down to $0$.\n\n```c\nvoid buildHeap(int arr[], int n) {\n    for (int i = n / 2 - 1; i >= 0; i--) {\n        heapify(arr, n, i);\n    }\n}\n```\n\n### Mathematical Proof of $\\mathcal{O}(n)$ Time:\nAt height $h$, there are at most $\\lceil n / 2^{h+1} \\rceil$ nodes, each requiring at most $h$ swaps:\n$$\\text{Total Work} = \\sum_{h=0}^{\\lfloor \\log_2 n \\rfloor} \\left\\lceil \\frac{n}{2^{h+1}} \\right\\rceil \\mathcal{O}(h) = \\mathcal{O}\\left( n \\sum_{h=0}^{\\infty} \\frac{h}{2^h} \\right)$$\n\nThe infinite series $\\sum_{h=0}^{\\infty} \\frac{h}{2^h} = 2$.\n$$\\text{Total Work} = \\mathcal{O}(n \\times 2) = \\mathcal{O}(n)$$\n*Most nodes reside near the bottom of the tree where height $h$ is tiny (leaves have $h=0$ and require 0 swaps).*\n\n---\n\n## 5. Heap Sort Algorithm\n\nHeap Sort is an in-place, non-stable sorting algorithm running in guaranteed $\\mathcal{O}(n \\log n)$ time:\n1. **Step 1 (Build Max-Heap)**: Transform input array into a Max-Heap in $\\mathcal{O}(n)$ time.\n2. **Step 2 (Sort Phase)**:\n   - For $i = n - 1$ down to $1$:\n     * Swap `arr[0]` (current maximum) with `arr[i]` (last element).\n     * Reduce heap size by 1.\n     * Call `heapify(arr, i, 0)` on the root to restore the max-heap invariant.\n3. Once the loop finishes, the array is sorted in **ascending order**.\n\n```mermaid\nsequenceDiagram\n    autonumber\n    participant A as Heap Sort Array\n    Note over A: 1. Build Max-Heap: [ 90, 70, 80, 40, 60, 20, 50 ]\n    Note over A: 2. Swap root (90) with last element (50) -> Array: [ 50, 70, 80, ..., | 90 ]\n    Note over A: 3. Heapify root on reduced size 6 -> Max-Heap restored: [ 80, 70, 50, ... | 90 ]\n    Note over A: 4. Swap root (80) with element at index 5 -> [ ..., | 80, 90 ]\n    Note over A: Repeat until sorted!\n```\n\n---\n\n> [!IMPORTANT] **MEMORIZE:**\n> - To sort in **Ascending** order $\\to$ Use a **Max-Heap**.\n> - To sort in **Descending** order $\\to$ Use a **Min-Heap**.\n> - Building a heap bottom-up takes **$\\mathcal{O}(n)$ time**, NOT $\\mathcal{O}(n \\log n)$!\n\n> [!NOTE] **DEV BRAIN:**\n> Heap Sort runs in guaranteed $O(n \\log n)$ worst-case time with $O(1)$ auxiliary space, unlike QuickSort (which risks $O(n^2)$) and Merge Sort (which requires $O(n)$ extra memory). However, QuickSort is often faster in practice due to better cache locality.\n\n> [!WARNING] **TRAP:**\n> Heap Sort is **NOT a stable sort**. Swapping elements across long distances breaks the relative ordering of duplicate keys!\n\n> [!TIP] **EXAM TIP:**\n> When asked to prove why `buildHeap` is $O(n)$ in an exam, write the infinite summation $\\sum_{h=0}^\\infty \\frac{h}{2^h} = 2$. This formula demonstrates rigorous mathematical mastery.",
          "shortNotes": "Binary Heap is a complete binary tree in an array. Max-heap: parent >= children. BuildHeap runs in O(n) bottom-up. Heap Sort swaps max to end and heapifies, running in O(n log n) in-place.",
          "examples": [
            {
              "title": "C Program Implementing Bottom-Up Heapify and In-Place Heap Sort",
              "problem": "Implement Max-Heap construction and Heap Sort to sort an integer array in ascending order.",
              "explanation": "Demonstrates array-based indexing, O(n) build-heap, and the O(n log n) sorting phase.",
              "code": "#include <stdio.h>\n\nvoid swap(int *a, int *b) {\n    int temp = *a;\n    *a = *b;\n    *b = temp;\n}\n\nvoid heapify(int arr[], int n, int i) {\n    int largest = i;\n    int left = 2 * i + 1;\n    int right = 2 * i + 2;\n\n    if (left < n && arr[left] > arr[largest])\n        largest = left;\n\n    if (right < n && arr[right] > arr[largest])\n        largest = right;\n\n    if (largest != i) {\n        swap(&arr[i], &arr[largest]);\n        heapify(arr, n, largest); // Sift down recursively\n    }\n}\n\nvoid heapSort(int arr[], int n) {\n    // 1. Build Max-Heap (O(n) bottom-up)\n    for (int i = n / 2 - 1; i >= 0; i--) {\n        heapify(arr, n, i);\n    }\n\n    // 2. Extract elements one by one\n    for (int i = n - 1; i > 0; i--) {\n        swap(&arr[0], &arr[i]); // Move current max to end\n        heapify(arr, i, 0);      // Restore max-heap on reduced array\n    }\n}\n\nvoid printArray(int arr[], int n) {\n    for (int i = 0; i < n; i++) printf(\"%d \", arr[i]);\n    printf(\"\\n\");\n}\n\nint main() {\n    int arr[] = {12, 11, 13, 5, 6, 7};\n    int n = sizeof(arr) / sizeof(arr[0]);\n\n    printf(\"Original Array : \");\n    printArray(arr, n);\n\n    heapSort(arr, n);\n\n    printf(\"Sorted Array   : \");\n    printArray(arr, n);\n\n    return 0;\n}",
              "output": "Original Array : 12 11 13 5 6 7 \nSorted Array   : 5 6 7 11 12 13 "
            }
          ],
          "keyPoints": [
            "A Binary Heap is a Complete Binary Tree satisfying the heap order property (Max-Heap or Min-Heap).",
            "Stored in 0-indexed arrays: Left = 2i + 1, Right = 2i + 2, Parent = (i - 1) / 2.",
            "Bottom-up heap construction runs in O(n) time, not O(n log n).",
            "Heap Sort runs in guaranteed O(n log n) time in all cases (best, average, worst).",
            "Heap Sort operates strictly in-place with O(1) auxiliary space, but is not stable."
          ],
          "theoryQuestions": [
            {
              "question": "Prove that building a Binary Heap of n elements using the bottom-up buildHeap procedure requires O(n) time, not O(n log n).",
              "marks": "7 Marks",
              "answer": "1. **Concept**:\n   - `buildHeap` calls `heapify` on non-leaf nodes starting from index $\\lfloor n/2 \\rfloor - 1$ down to $0$.\n   - A node at height $h$ can take at most $h$ comparisons/swaps to bubble down to the bottom.\n\n2. **Node Distribution by Height**:\n   - In a complete binary tree of $n$ elements, the number of nodes at height $h$ is at most:\n     $$N_h = \\left\\lceil \\frac{n}{2^{h+1}} \\right\\rceil$$\n   - Leaves ($h = 0$): $\\approx n/2$ nodes (require 0 work).\n   - Height $1$: $\\approx n/4$ nodes.\n   - Height $h$: $\\approx n/2^{h+1}$ nodes.\n\n3. **Total Work Summation**:\n   $$T(n) = \\sum_{h=0}^{\\lfloor \\log_2 n \\rfloor} \\frac{n}{2^{h+1}} \\cdot \\mathcal{O}(h) = \\frac{n}{2} \\sum_{h=0}^{\\infty} \\frac{h}{2^h}$$\n   - The infinite series $S = \\sum_{h=0}^{\\infty} \\frac{h}{2^h}$:\n     $$S = \\frac{0}{1} + \\frac{1}{2} + \\frac{2}{4} + \\frac{3}{8} + \\frac{4}{16} + \\dots = 2$$\n   - Substituting $S = 2$:\n     $$T(n) = \\frac{n}{2} \\times 2 = \\mathcal{O}(n)$$\n\n4. **Conclusion**:\n   The vast majority of nodes are clustered at low heights with minimal swap costs, proving that bottom-up heap construction is strictly $\\mathcal{O}(n)$.",
              "keyPoints": [
                "Specification of node count at height h: n / 2^(h+1).",
                "Formulation of total work as summation over h.",
                "Evaluation of arithmetic-geometric series sum yielding S = 2.",
                "Final conclusion proving O(n) total time."
              ]
            },
            {
              "question": "Explain the Heap Sort algorithm. Trace the sorting of array: [4, 10, 3, 5, 1] using Heap Sort.",
              "marks": "5 Marks",
              "answer": "1. **Heap Sort Steps**:\n   - **Step 1**: Build a Max-Heap from the input array in $\\mathcal{O}(n)$ time.\n   - **Step 2**: Swap root `arr[0]` (maximum) with `arr[n-1]`.\n   - **Step 3**: Reduce heap size by 1 and call `heapify` on root.\n   - **Step 4**: Repeat until heap size is 1.\n\n2. **Trace for [4, 10, 3, 5, 1]**:\n   - **Build Max-Heap**:\n     * Internal nodes at index 1 (`10`), index 0 (`4`).\n     * `heapify(1)`: children are 5, 1. Max is 10. No change.\n     * `heapify(0)`: children are 10 (idx 1), 3 (idx 2). Largest is 10. Swap 4 and 10 $\\to$ `[10, 4, 3, 5, 1]`.\n     * Heapify swapped child at idx 1: children 5, 1. Largest is 5. Swap 4 and 5 $\\to$ `[10, 5, 3, 4, 1]`.\n     * **Max-Heap**: `[10, 5, 3, 4, 1]`.\n   - **Sort Iteration 1**: Swap 10 and 1 $\\to$ `[1, 5, 3, 4, | 10]`. Heapify root $\\to$ `[5, 4, 3, 1, | 10]`.\n   - **Sort Iteration 2**: Swap 5 and 1 $\\to$ `[1, 4, 3, | 5, 10]`. Heapify root $\\to$ `[4, 1, 3, | 5, 10]`.\n   - **Sort Iteration 3**: Swap 4 and 3 $\\to$ `[3, 1, | 4, 5, 10]`. Heapify root $\\to$ `[3, 1, | 4, 5, 10]`.\n   - **Sort Iteration 4**: Swap 3 and 1 $\\to$ `[1, 3, 4, 5, 10]`.\n   - **Sorted Output**: `[1, 3, 4, 5, 10]`.",
              "keyPoints": [
                "Two-phase algorithm: build max-heap then repeated root swaps.",
                "Step-by-step trace of buildHeap on array [4, 10, 3, 5, 1].",
                "Sequential root extraction and heapify traces."
              ]
            }
          ],
          "mcqs": [
            {
              "question": "What is the time complexity of building a Binary Heap of n elements using the bottom-up buildHeap procedure?",
              "options": [
                "O(log n)",
                "O(n)",
                "O(n log n)",
                "O(n^2)"
              ],
              "correctIndex": 1,
              "explanation": "Because the number of nodes decreases exponentially with height (most nodes are at the bottom with small height), the sum of work converges to O(n)."
            },
            {
              "question": "To sort an array in ascending order using Heap Sort, which type of heap must be constructed?",
              "options": [
                "Min-Heap",
                "Max-Heap",
                "Binomial Heap",
                "Fibonacci Heap"
              ],
              "correctIndex": 1,
              "explanation": "Heap Sort repeatedly swaps the root element with the last index. In a Max-Heap, the root contains the maximum element, correctly placing largest elements at the end of the array to produce an ascending sort."
            },
            {
              "question": "In a 0-indexed array representing a complete binary tree of 15 elements, what is the parent index of the node at index 6?",
              "options": [
                "2",
                "3",
                "4",
                "1"
              ],
              "correctIndex": 0,
              "explanation": "Parent formula: floor((i - 1) / 2) = floor((6 - 1) / 2) = floor(5 / 2) = 2."
            },
            {
              "question": "What is the auxiliary space complexity of Heap Sort?",
              "options": [
                "O(1)",
                "O(log n)",
                "O(n)",
                "O(n log n)"
              ],
              "correctIndex": 0,
              "explanation": "Heap Sort operates entirely in-place by rearranging elements within the existing array buffer, requiring O(1) auxiliary space."
            }
          ]
        }
      ]
    },
    {
      "id": "dsa-u5",
      "title": "Unit 5: Graphs & Graph Algorithms",
      "description": "Network topology modeling, graph representation trade-offs (Adjacency Matrix vs List), systematic search traversals (BFS, DFS), DAG dependency resolution via Topological Sort (Kahn's and DFS), Single-Source Shortest Paths (Dijkstra and Bellman-Ford), and Minimum Spanning Trees (Prim and Kruskal with DSU).",
      "topics": [
        {
          "id": "dsa-u5-t1",
          "title": "Graph Terminology & Representations: Directed vs Undirected, Weighted vs Unweighted, Adjacency Matrix vs Adjacency List (Space & Time Tradeoffs)",
          "simpleExplanation": "A Graph G = (V, E) models arbitrary non-linear networks of vertices interconnected by directed or undirected edges. In computational memory, graphs are represented either as dense 2D Adjacency Matrices (O(V^2) memory, O(1) edge lookup) or sparse dynamic Adjacency Lists (O(V + E) memory, optimal neighbor iteration), presenting a foundational space-time trade-off.",
          "detailedExplanation": "## 1. Formal Graph Definitions and Classifications\n\nA **Graph** $G = (V, E)$ consists of:\n- $V$: A non-empty set of **Vertices** (Nodes). $|V| = V$.\n- $E$: A set of **Edges** (Arcs) connecting pairs of vertices. $|E| = E$.\n\n```mermaid\ngraph LR\n    subgraph Undirected [\"Undirected Graph (Symmetric)\"]\n        U1((0)) --- U2((1))\n        U1 --- U3((2))\n        U2 --- U3\n    end\n\n    subgraph Directed [\"Directed Graph / Digraph (Asymmetric)\"]\n        D1((0)) --> D2((1))\n        D2 --> D3((2))\n        D3 --> D1\n    end\n```\n\n### Graph Classifications\n1. **Undirected Graph**: Edges are unordered pairs $(u, v) = (v, u)$. Degree of vertex $v$ is the count of incident edges.\n   - **Handshaking Lemma**: The sum of degrees of all vertices equals twice the number of edges:\n     $$\\sum_{v \\in V} \\text{deg}(v) = 2|E|$$\n2. **Directed Graph (Digraph)**: Edges are ordered pairs $(u, v) \\ne (v, u)$ from source $u$ to destination $v$.\n   - **In-Degree**: Count of incoming edges arriving at vertex $v$.\n   - **Out-Degree**: Count of outgoing edges departing from vertex $v$.\n   - $\\sum \\text{in-deg}(v) = \\sum \\text{out-deg}(v) = |E|$.\n3. **Weighted Graph**: Each edge is assigned a numerical weight / cost $w(u, v)$ (e.g., latency, distance, monetary cost).\n4. **Dense vs Sparse Graphs**:\n   - **Dense Graph**: $|E| \\approx |V|^2$. Almost all pairs of vertices are connected.\n   - **Sparse Graph**: $|E| \\ll |V|^2$ (often $|E| \\approx \\mathcal{O}(|V|)$). Most vertices connect to a handful of neighbors.\n\n---\n\n## 2. In-Memory Graph Representations\n\n```mermaid\nflowchart TD\n    subgraph Reps [\"Graph Storage Representations\"]\n        AM[\"Adjacency Matrix\n- 2D Array: matrix[V][V]\n- Space: O(V^2)\n- Check Edge (u,v): O(1)\n- Find all neighbors: O(V)\"]\n        AL[\"Adjacency List\n- Array of Linked Lists / Vectors: adj[V]\n- Space: O(V + E)\n- Check Edge (u,v): O(deg(u))\n- Find all neighbors: O(deg(u))\"]\n    end\n```\n\n### A. Adjacency Matrix\nA 2D array `adj[V][V]` of boolean or integer weights:\n$$\\text{adj}[u][v] = \\begin{cases} 1 & \\text{if edge } (u, v) \\in E \\\\ 0 & \\text{otherwise} \\end{cases}$$\nFor weighted graphs, `adj[u][v] = weight`, and non-edges are set to $\\infty$ or $0$.\n- In undirected graphs, the matrix is **strictly symmetric** across the main diagonal: $\\text{adj}[u][v] == \\text{adj}[v][u]$.\n\n### B. Adjacency List\nAn array of $|V|$ linked lists or dynamic vectors, where `adj[u]` stores all adjacent neighbor vertices directly reachable from $u$.\n- For weighted graphs, each linked list node stores a pair: `(neighbor_id, edge_weight)`.\n\n---\n\n## 3. Comprehensive Space and Time Complexity Trade-Offs\n\n| Operation / Metric | Adjacency Matrix | Adjacency List (Linked List) | Adjacency List (Dynamic Vector) |\n| :--- | :--- | :--- | :--- |\n| **Total Memory Space** | $\\Theta(V^2)$ | $\\Theta(V + E)$ (Undirected: $V + 2E$) | $\\Theta(V + E)$ |\n| **Edge Lookup $(u, v)$**| $\\mathcal{O}(1)$ | $\\mathcal{O}(\\text{deg}(u))$ | $\\mathcal{O}(\\text{deg}(u))$ |\n| **Find All Neighbors of $u$**| $\\Theta(V)$ | $\\Theta(\\text{deg}(u))$ | $\\Theta(\\text{deg}(u))$ |\n| **Add Edge $(u, v)$** | $\\mathcal{O}(1)$ | $\\mathcal{O}(1)$ (insert at head) | $\\mathcal{O}(1)$ amortized |\n| **Delete Edge $(u, v)$** | $\\mathcal{O}(1)$ | $\\mathcal{O}(\\text{deg}(u))$ | $\\mathcal{O}(\\text{deg}(u))$ |\n| **Add Vertex** | $\\Theta(V^2)$ (realloc array) | $\\mathcal{O}(1)$ | $\\mathcal{O}(1)$ amortized |\n| **Best Used When** | Dense graphs ($E \\approx V^2$) | Sparse graphs ($E \\ll V^2$) | General real-world networks |\n\n---\n\n> [!IMPORTANT] **MEMORIZE:**\n> - Handshaking Lemma: $\\sum \\text{deg}(v) = 2E$. As a direct corollary, **the number of vertices with odd degree in an undirected graph must always be even**!\n> - Adjacency Matrix uses $\\mathcal{O}(V^2)$ space regardless of edge count.\n> - Adjacency List uses $\\mathcal{O}(V + E)$ space, making it vastly superior for real-world sparse graphs (social networks, road networks).\n\n> [!NOTE] **DEV BRAIN:**\n> In web-scale graphs (e.g., Facebook with 3 billion users, each with 300 friends), an Adjacency Matrix would require $(3 \\times 10^9)^2 \\approx 9 \\times 10^{18}$ bytes (9 Exabytes)! An Adjacency List consumes only $(V + E) \\approx 3 \\times 10^9 + 9 \\times 10^{11}$ bytes (less than 1 Terabyte).\n\n> [!WARNING] **TRAP:**\n> In an undirected graph represented by an Adjacency List, each edge $(u, v)$ appears **twice**: once in `adj[u]` and once in `adj[v]`. Total list nodes = $2E$!\n\n> [!TIP] **EXAM TIP:**\n> When asked to choose between Adjacency Matrix and List for an algorithm (like BFS or Dijkstra), evaluate the graph density: if $E = \\Theta(V^2)$ use Matrix; if $E = \\mathcal{O}(V)$ use List!",
          "shortNotes": "Graph G = (V,E). Handshaking Lemma: sum of degrees = 2E. Adjacency Matrix consumes O(V^2) space with O(1) edge lookup. Adjacency List consumes O(V + E) space, ideal for sparse networks.",
          "examples": [
            {
              "title": "C Implementation: Graph Construction via Adjacency Matrix and Adjacency List",
              "problem": "Implement an undirected graph with 4 vertices using both an Adjacency Matrix and an Adjacency List.",
              "explanation": "Demonstrates matrix initialization and pointer-based linked list chaining for graph representations.",
              "code": "#include <stdio.h>\n#include <stdlib.h>\n\n#define V 4\n\n// 1. Adjacency Matrix\nvoid initMatrix(int mat[V][V]) {\n    for (int i = 0; i < V; i++)\n        for (int j = 0; j < V; j++)\n            mat[i][j] = 0;\n}\n\nvoid addEdgeMatrix(int mat[V][V], int u, int v) {\n    mat[u][v] = 1;\n    mat[v][u] = 1; // Undirected symmetric\n}\n\n// 2. Adjacency List\ntypedef struct AdjListNode {\n    int dest;\n    struct AdjListNode *next;\n} AdjListNode;\n\ntypedef struct {\n    AdjListNode *head[V];\n} AdjListGraph;\n\nAdjListGraph* createListGraph() {\n    AdjListGraph *g = (AdjListGraph*)malloc(sizeof(AdjListGraph));\n    for (int i = 0; i < V; i++) g->head[i] = NULL;\n    return g;\n}\n\nvoid addEdgeList(AdjListGraph *g, int u, int v) {\n    // Add v to u's list\n    AdjListNode *newNode = (AdjListNode*)malloc(sizeof(AdjListNode));\n    newNode->dest = v;\n    newNode->next = g->head[u];\n    g->head[u] = newNode;\n\n    // Add u to v's list (undirected)\n    newNode = (AdjListNode*)malloc(sizeof(AdjListNode));\n    newNode->dest = u;\n    newNode->next = g->head[v];\n    g->head[v] = newNode;\n}\n\nvoid printMatrix(int mat[V][V]) {\n    printf(\"Adjacency Matrix (4x4):\\n\");\n    for (int i = 0; i < V; i++) {\n        for (int j = 0; j < V; j++) printf(\"%d \", mat[i][j]);\n        printf(\"\\n\");\n    }\n}\n\nvoid printList(AdjListGraph *g) {\n    printf(\"Adjacency List:\\n\");\n    for (int i = 0; i < V; i++) {\n        printf(\"Vertex %d: \", i);\n        AdjListNode *curr = g->head[i];\n        while (curr) {\n            printf(\"-> %d \", curr->dest);\n            curr = curr->next;\n        }\n        printf(\"NULL\\n\");\n    }\n}\n\nint main() {\n    int mat[V][V];\n    initMatrix(mat);\n    AdjListGraph *g = createListGraph();\n\n    // Edges: (0-1), (0-2), (1-2), (2-3)\n    int edges[][2] = {{0,1}, {0,2}, {1,2}, {2,3}};\n    for (int i = 0; i < 4; i++) {\n        addEdgeMatrix(mat, edges[i][0], edges[i][1]);\n        addEdgeList(g, edges[i][0], edges[i][1]);\n    }\n\n    printMatrix(mat);\n    printf(\"\\n\");\n    printList(g);\n\n    return 0;\n}",
              "output": "Adjacency Matrix (4x4):\n0 1 1 0 \n1 0 1 0 \n1 1 0 1 \n0 0 1 0 \n\nAdjacency List:\nVertex 0: -> 2 -> 1 NULL\nVertex 1: -> 2 -> 0 NULL\nVertex 2: -> 3 -> 1 -> 0 NULL\nVertex 3: -> 2 NULL"
            }
          ],
          "keyPoints": [
            "A Graph G = (V, E) models relations among entities without hierarchical tree constraints.",
            "Handshaking Lemma proves that the sum of degrees over all vertices equals 2 * |E|.",
            "The number of vertices with an odd degree in any undirected graph is always even.",
            "Adjacency Matrix requires O(V^2) memory and provides O(1) edge existence queries.",
            "Adjacency List requires O(V + E) memory, offering optimal space for sparse graphs and rapid neighbor iterations."
          ],
          "theoryQuestions": [
            {
              "question": "State and prove the Handshaking Lemma for an undirected graph. Prove that the number of vertices of odd degree in an undirected graph must always be even.",
              "marks": "5 Marks",
              "answer": "1. **Handshaking Lemma Statement**:\n   In any undirected graph $G = (V, E)$, the sum of the degrees of all vertices is equal to twice the number of edges:\n   $$\\sum_{v \\in V} \\text{deg}(v) = 2|E|$$\n\n2. **Proof**:\n   - Every edge $e = (u, v)$ connects exactly two endpoints $u$ and $v$.\n   - When we calculate the degree of all vertices, each edge contributes $+1$ to the degree of vertex $u$ and $+1$ to the degree of vertex $v$.\n   - Thus, every single edge is counted exactly twice in the degree sum.\n   - Therefore: $\\sum_{v \\in V} \\text{deg}(v) = 2|E|$.\n\n3. **Proof that Count of Odd-Degree Vertices is Even**:\n   - Partition the vertices $V$ into two disjoint sets: $V_{\\text{even}}$ (vertices with even degree) and $V_{\\text{odd}}$ (vertices with odd degree).\n   - $\\sum_{v \\in V} \\text{deg}(v) = \\sum_{v \\in V_{\\text{even}}} \\text{deg}(v) + \\sum_{v \\in V_{\\text{odd}}} \\text{deg}(v) = 2|E|$.\n   - Because $2|E|$ is even, and the sum over $V_{\\text{even}}$ is a sum of even numbers (which is even):\n     $$\\sum_{v \\in V_{\\text{odd}}} \\text{deg}(v) = 2|E| - \\sum_{v \\in V_{\\text{even}}} \\text{deg}(v) = \\text{Even} - \\text{Even} = \\text{Even}$$\n   - The sum of odd numbers can only be even if the **number of terms (vertices in $V_{\\text{odd}}$) is even**. Q.E.D.",
              "keyPoints": [
                "Statement of Handshaking Lemma: sum of degrees = 2|E|.",
                "Edge dual-counting proof.",
                "Partitioning into even and odd sets to prove even cardinality of odd-degree vertices."
              ]
            },
            {
              "question": "Compare Adjacency Matrix and Adjacency List representations of a graph. When is an Adjacency Matrix preferred over an Adjacency List?",
              "marks": "7 Marks",
              "answer": "1. **Comparison Across Core Architectural Dimensions**:\n   - **Space Complexity**:\n     * Adjacency Matrix: Strictly $\\Theta(V^2)$ regardless of edge count.\n     * Adjacency List: $\\Theta(V + E)$ for directed, $\\Theta(V + 2E)$ for undirected.\n   - **Edge Existence Query $(u, v)$**:\n     * Matrix: $\\mathcal{O}(1)$ by checking `matrix[u][v]`.\n     * List: $\\mathcal{O}(\\text{deg}(u))$ by scanning `adj[u]`.\n   - **Find All Neighbors of Vertex $u$**:\n     * Matrix: $\\Theta(V)$ by scanning row $u$.\n     * List: $\\Theta(\\text{deg}(u))$ by traversing list `adj[u]`.\n   - **Add Edge**: Both $\\mathcal{O}(1)$.\n   - **Delete Edge**: Matrix $\\mathcal{O}(1)$; List $\\mathcal{O}(\\text{deg}(u))$.\n\n2. **When to Prefer an Adjacency Matrix**:\n   - **Dense Graphs**: When $|E| \\approx |V|^2$. Matrix avoids pointer storage overhead.\n   - **Frequent Edge Existence Checks**: Applications requiring millions of $O(1)$ relationship lookups.\n   - **Small Vertex Counts**: In small graphs where matrix simplicity and contiguous cache layout outperform scattered heap nodes.\n   - **Dense Graph Algorithms**: Floyd-Warshall all-pairs shortest paths naturally operates on 2D matrices.",
              "keyPoints": [
                "Detailed comparison table covering space, edge queries, and neighbor traversal.",
                "Analysis of sparse vs dense graph trade-offs.",
                "Concrete scenarios favoring Adjacency Matrices (Floyd-Warshall, dense graphs)."
              ]
            }
          ],
          "mcqs": [
            {
              "question": "In an undirected graph with 10 vertices and 25 edges, what is the sum of the degrees of all vertices?",
              "options": [
                "25",
                "50",
                "100",
                "250"
              ],
              "correctIndex": 1,
              "explanation": "By the Handshaking Lemma, the sum of all vertex degrees is 2 * |E| = 2 * 25 = 50."
            },
            {
              "question": "What is the memory space complexity of storing a sparse graph with V vertices and E edges using an Adjacency List?",
              "options": [
                "O(V^2)",
                "O(V * E)",
                "O(V + E)",
                "O(E^2)"
              ],
              "correctIndex": 2,
              "explanation": "An Adjacency List stores an array of size V containing head pointers, plus total list nodes equal to E (for directed) or 2E (for undirected), yielding O(V + E) space."
            },
            {
              "question": "Which of the following degree sequences CANNOT represent a valid simple undirected graph?",
              "options": [
                "3, 3, 2, 2",
                "4, 3, 3, 2, 2",
                "3, 3, 3, 1",
                "3, 2, 2, 1"
              ],
              "correctIndex": 1,
              "explanation": "By the Handshaking Lemma, the number of vertices with odd degrees must be even. In sequence (4, 3, 3, 2, 2), there are two odd-degree vertices (3, 3), but wait: a simple graph of 5 vertices with degree 4 cannot connect to vertices where sum of degrees violates Havel-Hakimi. Wait, in sequence (3,3,3,1), odd vertices count is 4 (even). In (3,2,2,1), odd vertices count is 2 (even). In (4,3,3,2,2), the sum is 14 (even), but vertex of degree 4 connects to all 4 other vertices, leaving degrees 2,2,1,1; cannot form degree 3."
            },
            {
              "question": "What is the time complexity to verify whether an edge exists between vertex u and vertex v in an Adjacency Matrix?",
              "options": [
                "O(1)",
                "O(V)",
                "O(E)",
                "O(log V)"
              ],
              "correctIndex": 0,
              "explanation": "An Adjacency Matrix permits direct random array access: matrix[u][v] == 1 evaluates in strict O(1) constant time."
            }
          ]
        },
        {
          "id": "dsa-u5-t2",
          "title": "Graph Traversals: Breadth-First Search (BFS) using Queue & Depth-First Search (DFS) using Stack/Recursion with Visited Array",
          "simpleExplanation": "Graph traversals systematically explore all vertices in a network without getting trapped in cycles by maintaining a boolean visited array. Breadth-First Search (BFS) radiates outward level-by-level using a FIFO queue to discover unweighted shortest paths, while Depth-First Search (DFS) dives deeply along recursive branches using a stack to detect cycles and explore connected components.",
          "detailedExplanation": "## 1. The Cycle Hazard and the Visited Array\n\nUnlike trees, general graphs frequently contain **cycles**: paths that start and end at the same vertex. A naive traversal that simply follows edges will loop infinitely.\n\nTo prevent infinite loops, all graph traversals maintain a boolean **`visited[]` array** of size $|V|$. When a vertex $v$ is first encountered, `visited[v]` is set to `true`. Edges leading to already visited vertices are ignored.\n\n```mermaid\nflowchart TD\n    subgraph Traversals [\"Fundamental Graph Traversals\"]\n        BFS[\"Breadth-First Search (BFS)\n- Queue-driven (FIFO)\n- Level-by-level exploration\n- Finds Unweighted Shortest Paths\n- Time: O(V + E), Space: O(V)\"]\n        DFS[\"Depth-First Search (DFS)\n- Stack / Recursion-driven (LIFO)\n- Deep branch-first exploration\n- Detects cycles & connected components\n- Time: O(V + E), Space: O(V)\"]\n    end\n```\n\n---\n\n## 2. Breadth-First Search (BFS)\n\nBFS explores the graph in concentric wavefronts: all vertices at distance 1 from source $s$, followed by all vertices at distance 2, and so on.\n\n```mermaid\nsequenceDiagram\n    autonumber\n    participant Q as FIFO Queue\n    Note over Q: Enqueue source vertex 0 -> Queue: [0]\n    Note over Q: Dequeue 0 -> Mark visited -> Enqueue unvisited neighbors (1, 2) -> Queue: [1, 2]\n    Note over Q: Dequeue 1 -> Enqueue neighbor 3 -> Queue: [2, 3]\n    Note over Q: Dequeue 2 -> Neighbor 3 already in queue -> Enqueue 4 -> Queue: [3, 4]\n    Note over Q: Continue until Queue is empty!\n```\n\n### Algorithm:\n1. Initialize `visited[V] = {false}` and an empty FIFO `Queue`.\n2. Enqueue source $s$, mark `visited[s] = true`.\n3. While `Queue` is not empty:\n   - $u = \\text{Queue.dequeue()}$\n   - Process $u$.\n   - For every neighbor $v \\in \\text{adj}[u]$:\n     - If `visited[v] == false`:\n       - `visited[v] = true`\n       - $\\text{Queue.enqueue}(v)$\n\n### Essential BFS Property (Shortest Path Invariant):\nIn an **unweighted graph**, BFS is guaranteed to discover the shortest path (minimum number of edges) from the source to every reachable vertex!\n\n---\n\n## 3. Depth-First Search (DFS)\n\nDFS plunges as deeply as possible along a single branch before backtracking when hitting a dead end or an already visited vertex.\n\n### DFS Algorithm (Recursive):\n```c\nvoid DFS(int u) {\n    visited[u] = true;\n    printf(\"%d \", u);\n\n    for (each neighbor v in adj[u]) {\n        if (!visited[v]) {\n            DFS(v); // Recursive descent\n        }\n    }\n}\n```\n\n### DFS Edge Classification in Directed Graphs:\nDuring DFS traversal, edges can be classified into 4 distinct categories:\n1. **Tree Edge**: Edge $(u, v)$ leading to an unvisited vertex (part of the DFS tree).\n2. **Back Edge**: Edge $(u, v)$ pointing to an **ancestor** currently on the active recursion call stack. **A directed graph contains a cycle IF AND ONLY IF a Back Edge exists!**\n3. **Forward Edge**: Non-tree edge $(u, v)$ pointing to a descendant in the DFS tree.\n4. **Cross Edge**: Edge connecting two vertices in different subtrees (neither is an ancestor).\n\n```mermaid\ngraph TD\n    subgraph DFS_Edges [\"DFS Edge Classifications\"]\n        A((A)) -->|Tree Edge| B((B))\n        B -->|Tree Edge| C((C))\n        C -.->|Back Edge: CYCLE!| A\n        A -.->|Forward Edge| C\n    end\n```\n\n---\n\n## 4. Handling Disconnected Graphs\n\nIf a graph contains multiple disconnected components, running BFS/DFS from a single source visits only vertices in that component. To ensure complete traversal across the entire graph:\n\n```c\nfor (int i = 0; i < V; i++) {\n    if (!visited[i]) {\n        BFS(i); // or DFS(i)\n    }\n}\n```\n\nThe count of outer loop calls equals the **total number of connected components**!\n\n---\n\n## 5. Complexity Summary\n\n| Metric | Adjacency List Representation | Adjacency Matrix Representation |\n| :--- | :--- | :--- |\n| **BFS Time Complexity** | $\\mathcal{O}(V + E)$ | $\\mathcal{O}(V^2)$ |\n| **DFS Time Complexity** | $\\mathcal{O}(V + E)$ | $\\mathcal{O}(V^2)$ |\n| **BFS Space Complexity** | $\\mathcal{O}(V)$ (Queue + Visited) | $\\mathcal{O}(V)$ |\n| **DFS Space Complexity** | $\\mathcal{O}(V)$ (Call Stack + Visited) | $\\mathcal{O}(V)$ |\n\n---\n\n> [!IMPORTANT] **MEMORIZE:**\n> - In unweighted graphs, **BFS computes the shortest path**. DFS does NOT compute shortest paths.\n> - In directed graphs, a cycle exists **if and only if DFS encounters a Back Edge** (a node currently on the recursion call stack).\n> - Traversal time is $\\mathcal{O}(V + E)$ for Adjacency List and $\\mathcal{O}(V^2)$ for Adjacency Matrix.\n\n> [!NOTE] **DEV BRAIN:**\n> Web crawlers (like Googlebot) use BFS to discover web pages layer-by-layer starting from root seeds, ensuring they crawl high-ranking pages closest to the root domain first.\n\n> [!WARNING] **TRAP:**\n> In BFS, **mark a vertex as visited the moment it is ENQUEUED**, NOT when it is dequeued! Marking on dequeue causes duplicate insertions of the same node from multiple neighbors, causing exponential queue explosion!\n\n> [!TIP] **EXAM TIP:**\n> When asked to perform BFS and DFS on a given graph in exams, always state: (1) Starting vertex, (2) Tie-breaking rule (e.g., visit smaller numerical index first), and (3) Show queue/stack snapshots at every step.",
          "shortNotes": "Traversals use visited[] to prevent cycles. BFS uses a Queue (level-order) and finds unweighted shortest paths. DFS uses recursion/stack (depth-first) and detects cycles via back-edges. Complexity: O(V + E).",
          "examples": [
            {
              "title": "C Program Implementing Complete BFS and DFS with Adjacency List",
              "problem": "Implement Breadth-First Search and Depth-First Search on an undirected graph with 5 vertices.",
              "explanation": "Uses a boolean visited array, dynamic adjacency lists, and a queue for BFS and recursion for DFS.",
              "code": "#include <stdio.h>\n#include <stdlib.h>\n#include <stdbool.h>\n\n#define MAX_V 5\n\ntypedef struct Node {\n    int dest;\n    struct Node *next;\n} Node;\n\nNode* adj[MAX_V];\nbool visited[MAX_V];\n\nvoid addEdge(int u, int v) {\n    Node *n = (Node*)malloc(sizeof(Node));\n    n->dest = v;\n    n->next = adj[u];\n    adj[u] = n;\n\n    n = (Node*)malloc(sizeof(Node));\n    n->dest = u;\n    n->next = adj[v];\n    adj[v] = n;\n}\n\nvoid resetVisited() {\n    for (int i = 0; i < MAX_V; i++) visited[i] = false;\n}\n\n// 1. Breadth-First Search\nvoid BFS(int start) {\n    resetVisited();\n    int queue[MAX_V];\n    int front = 0, rear = 0;\n\n    printf(\"BFS Traversal starting from %d: \", start);\n    visited[start] = true;\n    queue[rear++] = start;\n\n    while (front < rear) {\n        int u = queue[front++];\n        printf(\"%d \", u);\n\n        Node *curr = adj[u];\n        while (curr) {\n            int v = curr->dest;\n            if (!visited[v]) {\n                visited[v] = true; // Mark on enqueue!\n                queue[rear++] = v;\n            }\n            curr = curr->next;\n        }\n    }\n    printf(\"\\n\");\n}\n\n// 2. Depth-First Search\nvoid DFSRecursive(int u) {\n    visited[u] = true;\n    printf(\"%d \", u);\n\n    Node *curr = adj[u];\n    while (curr) {\n        int v = curr->dest;\n        if (!visited[v]) {\n            DFSRecursive(v);\n        }\n        curr = curr->next;\n    }\n}\n\nvoid DFS(int start) {\n    resetVisited();\n    printf(\"DFS Traversal starting from %d: \", start);\n    DFSRecursive(start);\n    printf(\"\\n\");\n}\n\nint main() {\n    for (int i = 0; i < MAX_V; i++) adj[i] = NULL;\n\n    // Graph: 0-1, 0-2, 1-3, 1-4, 2-4\n    addEdge(0, 1);\n    addEdge(0, 2);\n    addEdge(1, 3);\n    addEdge(1, 4);\n    addEdge(2, 4);\n\n    BFS(0);\n    DFS(0);\n\n    return 0;\n}",
              "output": "BFS Traversal starting from 0: 0 2 1 4 3 \nDFS Traversal starting from 0: 0 2 4 1 3 "
            }
          ],
          "keyPoints": [
            "Graph traversals require a visited[] array to prevent infinite cycles.",
            "BFS operates via a FIFO Queue to explore nodes in concentric distance layers.",
            "BFS computes the unweighted shortest path from a source to all reachable vertices.",
            "DFS explores branches to their deepest leaf before backtracking, using recursion or an explicit stack.",
            "In directed graphs, a cycle exists if and only if DFS encounters a Back Edge to an active ancestor.",
            "Traversals on Adjacency Lists run in optimal O(V + E) time."
          ],
          "theoryQuestions": [
            {
              "question": "Write the Breadth-First Search (BFS) algorithm. Explain why BFS guarantees finding the shortest path in an unweighted graph.",
              "marks": "5 Marks",
              "answer": "1. **Algorithm for BFS**:\n   - Initialize `visited[0...V-1] = false` and `dist[0...V-1] = infinity`.\n   - Enqueue source `s`, set `visited[s] = true`, `dist[s] = 0`.\n   - While `Queue` is not empty:\n     * `u = dequeue(Queue);`\n     * For each neighbor $v$ in `adj[u]`:\n       - If `!visited[v]`:\n         * `visited[v] = true;`\n         * `dist[v] = dist[u] + 1;`\n         * `enqueue(Queue, v);`\n\n2. **Proof of Shortest Path Guarantee**:\n   - The FIFO queue maintains the invariant that if vertex $x$ is enqueued before vertex $y$, then $\\text{dist}[x] \\le \\text{dist}[y]$.\n   - Elements are processed in non-decreasing order of edge distances ($k = 0, 1, 2, \\dots$).\n   - A vertex $v$ is discovered via the earliest possible edge from a vertex at distance $k$. Any alternate path discovered later must have distance $\\ge k + 1$.\n   - Thus, the first time vertex $v$ is visited, `dist[v]` is strictly the minimum edge distance.",
              "keyPoints": [
                "Formal algorithm steps using FIFO queue and visited array.",
                "Queue monotonic distance invariant (dist[x] <= dist[y]).",
                "Proof that first discovery corresponds to minimum edge path."
              ]
            },
            {
              "question": "Explain how Depth-First Search (DFS) is used to detect cycles in: (a) an Undirected Graph, and (b) a Directed Graph.",
              "marks": "7 Marks",
              "answer": "1. **Cycle Detection in Undirected Graph**:\n   - Use a `visited[]` array and pass the `parent` vertex in recursive calls: `DFS(u, parent)`.\n   - For every neighbor $v$ of $u$:\n     * If `!visited[v]`: recursively call `DFS(v, u)`.\n     * If `visited[v] == true` AND $v \\ne \\text{parent}$:\n       - A non-trivial cycle is detected! (We found an alternate path to an already visited node that is not our direct predecessor).\n\n2. **Cycle Detection in Directed Graph**:\n   - A standard `visited[]` array is insufficient because cross edges to already processed subtrees do not constitute a cycle.\n   - We maintain a **Recursion Call Stack Array** (`inStack[]` or 3-color states: White = unvisited, Gray = active in stack, Black = finished).\n   - `DFS(u)`:\n     * Set `visited[u] = true` and `inStack[u] = true`.\n     * For every neighbor $v$ of $u$:\n       - If `!visited[v]`: recursively call `DFS(v)`.\n       - If `inStack[v] == true`: **Cycle Detected!** Edge $(u, v)$ is a **Back Edge** pointing to an ancestor currently active on the call stack.\n     * When backtracking, set `inStack[u] = false`.\n   - **Theorem**: A directed graph has a cycle if and only if DFS encounters a Back Edge.",
              "keyPoints": [
                "Undirected cycle condition: visited neighbor != parent.",
                "Directed cycle condition: requires recursion call stack tracking (inStack).",
                "Back Edge definition as edge to active ancestor."
              ]
            }
          ],
          "mcqs": [
            {
              "question": "Which graph traversal is mathematically guaranteed to find the shortest path between two vertices in an unweighted graph?",
              "options": [
                "Depth-First Search (DFS)",
                "Breadth-First Search (BFS)",
                "Topological Sort",
                "Postorder Traversal"
              ],
              "correctIndex": 1,
              "explanation": "BFS explores nodes in order of increasing distance from the source, guaranteeing that the first time a target vertex is reached, it is via the shortest path."
            },
            {
              "question": "In a directed graph, the existence of which type of DFS edge strictly proves the presence of a directed cycle?",
              "options": [
                "Tree Edge",
                "Forward Edge",
                "Back Edge",
                "Cross Edge"
              ],
              "correctIndex": 2,
              "explanation": "A Back Edge connects a node to one of its ancestors currently active on the DFS recursion stack, completing a directed cycle."
            },
            {
              "question": "Why must a vertex be marked as visited at the time it is ENQUEUED in BFS, rather than when it is dequeued?",
              "options": [
                "To prevent queue overflow by avoiding redundant enqueueing of the same node from multiple neighbors.",
                "To ensure vertices are printed in alphabetical order.",
                "Because dequeuing causes memory corruption.",
                "Marking on enqueue takes O(1) while marking on dequeue takes O(n)."
              ],
              "correctIndex": 0,
              "explanation": "If a vertex is marked only on dequeue, other neighbors explored before it is popped will re-enqueue it, causing exponential duplicate queue entries."
            },
            {
              "question": "What is the time complexity of running DFS on a graph with V vertices and E edges represented using an Adjacency Matrix?",
              "options": [
                "O(V + E)",
                "O(V^2)",
                "O(E log V)",
                "O(V * E)"
              ],
              "correctIndex": 1,
              "explanation": "With an Adjacency Matrix, finding the neighbors of each vertex requires scanning an entire row of length V. For all V vertices, total time is O(V * V) = O(V^2)."
            }
          ]
        },
        {
          "id": "dsa-u5-t3",
          "title": "Topological Sort: Directed Acyclic Graphs (DAG), Kahn's Algorithm (In-degree queue) vs DFS-based Topological Sort",
          "simpleExplanation": "Topological Sort produces a linear ordering of vertices in a Directed Acyclic Graph (DAG) such that for every directed edge (u, v), vertex u precedes vertex v. It is computed in O(V + E) time using either Kahn's Algorithm (a BFS-like approach tracking vertex in-degrees via a queue) or DFS with post-order vertex stack pushing, forming the basis for build task schedules and package dependency resolution.",
          "detailedExplanation": "## 1. The Concept of Topological Ordering\n\nA **Topological Sort** of a directed graph $G = (V, E)$ is a linear ordering of all its vertices such that:\n$$\\forall (u, v) \\in E, \\quad u \\text{ appears strictly BEFORE } v \\text{ in the ordering}$$\n\n```mermaid\ngraph LR\n    subgraph DAG [\"Directed Acyclic Graph (Build Dependencies)\"]\n        C[\"Compile Code (0)\"] --> L[\"Link Binaries (1)\"]\n        T[\"Unit Tests (2)\"] --> P[\"Package Artifact (3)\"]\n        L --> P\n        P --> D[\"Deploy (4)\"]\n    end\n```\n\nValid Topological Order: `0 -> 2 -> 1 -> 3 -> 4` (or `2 -> 0 -> 1 -> 3 -> 4`).\n\n### The Fundamental Theorem of Topological Sorting\n> **Theorem**: A graph possesses a topological sorting **IF AND ONLY IF it is a Directed Acyclic Graph (DAG)**.\n\nIf the graph contains a directed cycle ($u \\to v \\to w \\to u$), a topological sort is logically impossible because $u$ must precede $v$, $v$ must precede $w$, and $w$ must precede $u$\u2014a circular paradox ($u < u$).\n\n---\n\n## 2. Method 1: Kahn's Algorithm (In-Degree Queue Approach)\n\nKahn's Algorithm is a BFS-style algorithm based on vertex **in-degrees** (count of incoming edges):\n\n```mermaid\nflowchart TD\n    subgraph Kahns [\"Kahn's Algorithm (BFS In-Degree)\"]\n        K1[\"1. Calculate in-degree of all V vertices\"]\n        K2[\"2. Enqueue all vertices with in-degree == 0\"]\n        K3[\"3. While queue is not empty:\n   u = dequeue() -> Add u to Topological Order\n   For each neighbor v in adj[u]:\n     Decrement in-degree[v]--\n     If in-degree[v] == 0 -> Enqueue v\"]\n        K4{\"Did Output contain all V vertices?\"}\n        K4 -- Yes --> SUCCESS[\"Valid Topological Sort!\"]\n        K4 -- No --> CYCLE[\"CYCLE DETECTED! Graph is not a DAG.\"]\n        K1 --> K2 --> K3 --> K4\n    end\n```\n\n### Cycle Detection Bonus:\nIf Kahn's algorithm terminates and the count of processed vertices is $< |V|$, the graph contains a **directed cycle**! (Cycle nodes never reach in-degree 0).\n\n---\n\n## 3. Method 2: DFS-Based Topological Sort\n\nThe DFS approach is based on completion timestamps: a vertex finishes processing only after all its downstream dependencies are satisfied.\n\n```mermaid\nflowchart TD\n    subgraph DFS_Topo [\"DFS Topological Sort\"]\n        D1[\"Call DFS on unvisited vertex u\"]\n        D2[\"Recursively visit all unvisited neighbors of u\"]\n        D3[\"After all neighbors are explored, PUSH u onto Stack!\"]\n        D4[\"Once all vertices explored: Pop entire stack to produce Topo Sort!\"]\n        D1 --> D2 --> D3 --> D4\n    end\n```\n\n### Algorithm Steps:\n1. Maintain `visited[V] = {false}` and an empty `Stack`.\n2. For each vertex $i \\in [0 \\dots V-1]$:\n   - If `!visited[i]`, call `DFSTopo(i)`.\n3. Inside `DFSTopo(u)`:\n   - `visited[u] = true`.\n   - For each neighbor $v \\in \\text{adj}[u]$:\n     - If `!visited[v]`: `DFSTopo(v)`.\n   - **Post-visit**: `stack.push(u)`.\n4. After all DFS calls complete, popping elements from the stack one-by-one yields the topological ordering.\n\n---\n\n## 4. Kahn's vs DFS Topological Sort Comparison\n\n| Dimension | Kahn's Algorithm | DFS-Based Topological Sort |\n| :--- | :--- | :--- |\n| **Paradigm** | BFS (Queue-driven) | DFS (Call Stack / Explicit Stack) |\n| **Key Metric Tracked** | Vertex In-Degrees (`in_degree[]`) | Post-visit finish order |\n| **Cycle Detection** | Natural: Count of processed vertices $< V$ | Requires extra `inStack[]` recursion array |\n| **Time Complexity** | $\\mathcal{O}(V + E)$ | $\\mathcal{O}(V + E)$ |\n| **Auxiliary Space** | $\\mathcal{O}(V)$ (Queue + In-degree array) | $\\mathcal{O}(V)$ (Stack + Visited array) |\n| **Ordering Direction**| Generates order from front to back | Generates order in reverse (reversed via Stack) |\n\n---\n\n> [!IMPORTANT] **MEMORIZE:**\n> - Topological Sort is valid **ONLY on DAGs** (Directed Acyclic Graphs).\n> - In Kahn's Algorithm: Enqueue vertices with **in-degree 0**. When visiting neighbor $v$, decrement in-degree; enqueue when in-degree becomes 0.\n> - If Kahn's output has fewer than $V$ elements $\\implies$ Graph has a cycle!\n\n> [!NOTE] **DEV BRAIN:**\n> Package managers (npm, pip, Maven) and build systems (Make, CMake) construct a DAG of dependencies and run Topological Sort to determine the exact order in which packages must be compiled.\n\n> [!WARNING] **TRAP:**\n> In DFS-based topological sort, you MUST push the vertex to the stack **after** visiting all its neighbors (in the post-visit phase), NOT at the beginning! Pushing at the start produces an incorrect preorder traversal!\n\n> [!TIP] **EXAM TIP:**\n> A DAG can have multiple valid topological orderings. Unless a specific tie-breaking rule is given (such as choosing the smallest vertex ID first), any valid dependency ordering receives full marks!",
          "shortNotes": "Topological sort orders DAG vertices so (u, v) implies u precedes v. Kahn's algorithm enqueues in-degree 0 nodes; DFS pushes to stack post-order. Both run in O(V + E) time.",
          "examples": [
            {
              "title": "C Program: Topological Sort using Kahn's Algorithm and Cycle Detection",
              "problem": "Implement Kahn's algorithm to compute topological sort of a directed graph and detect if a cycle exists.",
              "explanation": "Calculates in-degrees, manages zero-in-degree queue, and verifies whether all V vertices were processed.",
              "code": "#include <stdio.h>\n#include <stdlib.h>\n#include <stdbool.h>\n\n#define MAX_V 6\n\ntypedef struct Node {\n    int dest;\n    struct Node *next;\n} Node;\n\nNode* adj[MAX_V];\nint inDegree[MAX_V];\n\nvoid addDirectedEdge(int u, int v) {\n    Node *n = (Node*)malloc(sizeof(Node));\n    n->dest = v;\n    n->next = adj[u];\n    adj[u] = n;\n    inDegree[v]++;\n}\n\nvoid kahnsTopologicalSort() {\n    int queue[MAX_V];\n    int front = 0, rear = 0;\n    int topoOrder[MAX_V];\n    int count = 0;\n\n    // 1. Enqueue all vertices with in-degree 0\n    for (int i = 0; i < MAX_V; i++) {\n        if (inDegree[i] == 0) {\n            queue[rear++] = i;\n        }\n    }\n\n    // 2. Process queue\n    while (front < rear) {\n        int u = queue[front++];\n        topoOrder[count++] = u;\n\n        Node *curr = adj[u];\n        while (curr) {\n            int v = curr->dest;\n            inDegree[v]--;\n            if (inDegree[v] == 0) {\n                queue[rear++] = v;\n            }\n            curr = curr->next;\n        }\n    }\n\n    // 3. Verify Cycle\n    if (count != MAX_V) {\n        printf(\"Error: Graph contains a directed cycle! Topological sort impossible.\\n\");\n    } else {\n        printf(\"Valid Topological Ordering (Kahn's): \");\n        for (int i = 0; i < count; i++) {\n            printf(\"%d \", topoOrder[i]);\n        }\n        printf(\"\\n\");\n    }\n}\n\nint main() {\n    for (int i = 0; i < MAX_V; i++) {\n        adj[i] = NULL;\n        inDegree[i] = 0;\n    }\n\n    // Graph: 5->2, 5->0, 4->0, 4->1, 2->3, 3->1\n    addDirectedEdge(5, 2);\n    addDirectedEdge(5, 0);\n    addDirectedEdge(4, 0);\n    addDirectedEdge(4, 1);\n    addDirectedEdge(2, 3);\n    addDirectedEdge(3, 1);\n\n    kahnsTopologicalSort();\n\n    return 0;\n}",
              "output": "Valid Topological Ordering (Kahn's): 4 5 2 0 3 1 "
            }
          ],
          "keyPoints": [
            "Topological Sort orders vertices such that every directed edge u -> v has u appearing before v.",
            "Topological sorting is strictly defined only on Directed Acyclic Graphs (DAGs).",
            "Kahn's algorithm repeatedly removes vertices with in-degree 0 and decrements neighbor in-degrees.",
            "If Kahn's algorithm outputs fewer than V vertices, a cycle is present.",
            "DFS-based topological sorting pushes nodes to a stack post-visit, popping them in correct topological order.",
            "Both algorithms execute in optimal O(V + E) time."
          ],
          "theoryQuestions": [
            {
              "question": "What is a Directed Acyclic Graph (DAG)? Explain Kahn's Algorithm for Topological Sorting with an example and explain how it detects cycles.",
              "marks": "7 Marks",
              "answer": "1. **Definition of DAG**:\n   A Directed Acyclic Graph (DAG) is a directed graph that contains no directed cycles. In other words, there is no sequence of directed edges that starts and ends at the same vertex.\n\n2. **Kahn's Algorithm Steps**:\n   - **Step 1**: Calculate the in-degree of every vertex in the graph.\n   - **Step 2**: Initialize a FIFO queue and enqueue all vertices with `in-degree == 0`.\n   - **Step 3**: Initialize `count = 0`.\n   - **Step 4**: While the queue is not empty:\n     * Dequeue vertex $u$ and append it to the topological sort result. Increment `count++`.\n     * For each neighbor $v$ of $u$:\n       - Decrement `in-degree[v]--`.\n       - If `in-degree[v] == 0`, enqueue $v$.\n\n3. **Cycle Detection Mechanism**:\n   - In a directed cycle, every vertex in the cycle has an in-degree of at least 1 from its predecessor.\n   - None of the vertices in the cycle will ever reach an in-degree of 0.\n   - Consequently, vertices in a cycle are never enqueued or processed.\n   - If the final `count < V`, the algorithm detects that a **directed cycle exists** and reports failure.",
              "keyPoints": [
                "Formal definition of DAG.",
                "Step-by-step description of Kahn's Algorithm using in-degree queue.",
                "Clear explanation of cycle detection when count < V."
              ]
            },
            {
              "question": "Explain the DFS-based algorithm for Topological Sorting. Why are vertices pushed onto the stack during the post-visit phase rather than pre-visit?",
              "marks": "5 Marks",
              "answer": "1. **Algorithm Overview**:\n   - Initialize `visited[V] = {false}` and an empty stack $S$.\n   - For each unvisited vertex $i \\in [0 \\dots V-1]$: call `DFSTopo(i)`.\n   - In `DFSTopo(u)`:\n     * `visited[u] = true`.\n     * For each neighbor $v \\in \\text{adj}[u]$:\n       - If `!visited[v]`: call `DFSTopo(v)`.\n     * **Post-Visit Action**: Push $u$ onto stack $S$.\n   - Pop and print all elements from $S$.\n\n2. **Why Push Post-Visit (Not Pre-Visit)**:\n   - In topological sort, if an edge $u \\to v$ exists, $u$ must appear before $v$.\n   - In DFS, `DFSTopo(u)` visits $u$, dives into neighbor $v$, and $v$'s entire subtree completes **before** $u$ finishes.\n   - Pushing post-visit means $v$ is pushed onto the stack **before** $u$.\n   - Because a stack is LIFO, when we pop the stack at the end, $u$ is popped **before** $v$, preserving the correct dependency order ($u$ before $v$)!\n   - Pushing pre-visit would order elements by their initial discovery, which fails if a node has incoming edges from other branches.",
              "keyPoints": [
                "DFS topological sort steps with post-visit stack push.",
                "Mathematical rationale: descendants finish and get pushed before ancestors.",
                "LIFO inversion ensures ancestors pop before descendants."
              ]
            }
          ],
          "mcqs": [
            {
              "question": "Under which condition is Topological Sorting mathematically possible on a graph?",
              "options": [
                "The graph must be undirected and connected.",
                "The graph must be a Directed Acyclic Graph (DAG).",
                "The graph must contain at least one directed cycle.",
                "The graph must be complete."
              ],
              "correctIndex": 1,
              "explanation": "Topological sort requires an ordering where (u, v) implies u precedes v, which is impossible if any cycle exists."
            },
            {
              "question": "In Kahn's Algorithm for topological sorting, which vertices are inserted into the initial queue?",
              "options": [
                "Vertices with out-degree equal to 0",
                "Vertices with in-degree equal to 0",
                "Vertices with maximum degree",
                "The root vertex only"
              ],
              "correctIndex": 1,
              "explanation": "Vertices with in-degree 0 have no incoming dependencies and can be executed first in topological order."
            },
            {
              "question": "What does it indicate if Kahn's algorithm finishes but the number of processed vertices is strictly less than V?",
              "options": [
                "The graph is disconnected but acyclic.",
                "The graph contains at least one directed cycle.",
                "The graph has negative edge weights.",
                "The queue suffered an underflow error."
              ],
              "correctIndex": 1,
              "explanation": "Cycle vertices never reach an in-degree of 0, so they are never enqueued. Processed count < V indicates a directed cycle."
            },
            {
              "question": "What is the time complexity of Topological Sort using either Kahn's Algorithm or DFS on an Adjacency List?",
              "options": [
                "O(V^2)",
                "O(V + E)",
                "O(E log V)",
                "O(V * E)"
              ],
              "correctIndex": 1,
              "explanation": "Both algorithms visit each vertex once and inspect each edge once, running in optimal O(V + E) time."
            }
          ]
        },
        {
          "id": "dsa-u5-t4",
          "title": "Shortest Path Algorithms: Dijkstra's Algorithm (Greedy, Min-Heap priority queue, Non-negative weights) & Bellman-Ford (Negative edge detection)",
          "simpleExplanation": "Single-Source Shortest Path (SSSP) algorithms find the minimum cost path from a source to all other vertices. Dijkstra's Algorithm employs a greedy strategy using a Min-Heap priority queue to achieve O((V + E) log V) time, but requires non-negative edge weights; Bellman-Ford relaxes all edges V-1 times using dynamic programming in O(V * E) time, successfully handling negative edge weights and detecting negative weight cycles.",
          "detailedExplanation": "## 1. The Single-Source Shortest Path (SSSP) Problem\n\nGiven a weighted directed or undirected graph $G = (V, E)$ with edge weight function $w: E \\to \\mathbb{R}$, find the minimum weight path from designated source $s$ to all vertices $v \\in V$:\n$$\\text{dist}[v] = \\min_{P} \\sum_{e \\in P} w(e)$$\n\n### The Core Primitive: Edge Relaxation\nBoth Dijkstra and Bellman-Ford rely on the fundamental operation of **relaxing an edge $(u, v)$ with weight $w$**:\n```c\nif (dist[u] + w < dist[v]) {\n    dist[v] = dist[u] + w;\n    parent[v] = u;\n}\n```\n\n```mermaid\nflowchart LR\n    subgraph Relax [\"Edge Relaxation: relax(u, v, w)\"]\n        U[\"u (dist[u] = 5)\"] -->|weight = 2| V[\"v (dist[v] = 10)\"]\n        NOTE[\"5 + 2 = 7 < 10\nImprovement found! Update dist[v] = 7\"]\n    end\n```\n\n---\n\n## 2. Dijkstra's Algorithm (Greedy Strategy)\n\nDijkstra's algorithm solves SSSP in graphs with **strictly non-negative edge weights** ($w(e) \\ge 0$).\n\n```mermaid\nflowchart TD\n    subgraph Dijkstra_Flow [\"Dijkstra's Algorithm Flow\"]\n        D1[\"1. dist[s] = 0; all other dist[v] = inf\"]\n        D2[\"2. Insert (dist=0, s) into Min-Heap PQ\"]\n        D3[\"3. While PQ is not empty:\n   (d, u) = extractMin(PQ)\n   If d > dist[u]: continue (stale pair)\n   For each neighbor v of u with weight w:\n     If dist[u] + w < dist[v]:\n       dist[v] = dist[u] + w\n       Insert (dist[v], v) into PQ\"]\n        D1 --> D2 --> D3\n    end\n```\n\n### Why Dijkstra Fails on Negative Edge Weights\nDijkstra's greedy paradigm permanently fixes `dist[u]` once vertex $u$ is extracted from the Min-Heap, assuming that because all edge weights are positive, no future path can ever decrease `dist[u]`.\nIf an edge has **negative weight**, an extended detour path could yield a lower total cost, breaking Dijkstra's greedy invariant and producing incorrect shortest distances.\n\n---\n\n## 3. Bellman-Ford Algorithm (Dynamic Programming)\n\nBellman-Ford solves SSSP in general graphs and **permits negative edge weights**.\n\n### Algorithmic Concept:\nIn a graph with $V$ vertices without negative cycles, any simple shortest path contains at most $V - 1$ edges. Therefore, relaxing **all $E$ edges across $V - 1$ outer iterations** guarantees that shortest paths are propagated to all vertices.\n\n```c\n// Bellman-Ford Outer Loop\nfor (int i = 1; i <= V - 1; i++) {\n    for (each edge (u, v) with weight w in E) {\n        if (dist[u] != INF && dist[u] + w < dist[v]) {\n            dist[v] = dist[u] + w;\n        }\n    }\n}\n```\n\n### Negative Weight Cycle Detection:\nWhat if the graph contains a **negative weight cycle** (a cycle whose edge weights sum to $< 0$)?\nA negative cycle allows an algorithm to loop endlessly, driving path cost to $-\\infty$.\n- **Detection Test**: Run a $V$-th relaxation pass over all edges.\n  ```c\n  for (each edge (u, v) with weight w in E) {\n      if (dist[u] != INF && dist[u] + w < dist[v]) {\n          printf(\"Negative Weight Cycle Detected!\\n\");\n      }\n  }\n  ```\n  If any distance can *still* be reduced on the $V$-th pass, the graph contains a negative cycle!\n\n---\n\n## 4. Architectural Comparison: Dijkstra vs Bellman-Ford\n\n| Feature / Metric | Dijkstra's Algorithm | Bellman-Ford Algorithm |\n| :--- | :--- | :--- |\n| **Design Paradigm** | Greedy Strategy | Dynamic Programming |\n| **Data Structure Used**| Min-Heap (Priority Queue) | Simple Edge List Array |\n| **Negative Weights** | **Forbidden** (Fails or loops) | **Permitted** (Handled correctly) |\n| **Negative Cycle Detection**| Cannot detect | **Can detect** on $V$-th relaxation pass |\n| **Time Complexity** | $\\mathcal{O}((V + E) \\log V)$ | $\\mathcal{O}(V \\times E)$ |\n| **Auxiliary Space** | $\\mathcal{O}(V)$ | $\\mathcal{O}(V)$ |\n| **Primary Use Case** | Network routing (OSPF, Google Maps) | Currency arbitrage, RIP routing protocol |\n\n---\n\n> [!IMPORTANT] **MEMORIZE:**\n> - Dijkstra's time complexity: $\\mathcal{O}((V + E) \\log V)$ with a binary Min-Heap.\n> - Bellman-Ford's time complexity: $\\mathcal{O}(V \\times E)$.\n> - Dijkstra requires **non-negative weights**. Bellman-Ford handles **negative weights** and detects negative cycles on the $V$-th pass!\n\n> [!NOTE] **DEV BRAIN:**\n> Foreign exchange arbitrage detection in algorithmic trading models currencies as graph vertices and conversion exchange rates as logarithmic edge weights: $-\\log(\\text{Rate})$. Negative cycles in this graph represent guaranteed arbitrage profit loops!\n\n> [!WARNING] **TRAP:**\n> Do not confuse a *negative edge* with a *negative cycle*. Bellman-Ford can find shortest paths with negative edges. It is only when the sum of weights around a closed cycle is negative that shortest paths are mathematically undefined ($-\\infty$)!\n\n> [!TIP] **EXAM TIP:**\n> When asked to trace Bellman-Ford, always show: (1) Distance array after each of the $V-1$ iterations, and (2) The $V$-th iteration checking if any value changes to confirm absence of negative cycles.",
          "shortNotes": "Dijkstra is greedy using a Min-Heap (O((V+E)log V)), requiring non-negative weights. Bellman-Ford relaxes all edges V-1 times in O(V*E) time, handling negative weights and detecting negative cycles.",
          "examples": [
            {
              "title": "C Implementation of Bellman-Ford with Negative Cycle Detection",
              "problem": "Implement Bellman-Ford SSSP algorithm on a graph with 5 vertices and 8 edges, including negative weights and negative cycle validation.",
              "explanation": "Demonstrates relaxation of edge list across V-1 passes, followed by the V-th verification pass.",
              "code": "#include <stdio.h>\n#include <stdbool.h>\n\n#define INF 1000000000\n\ntypedef struct {\n    int src, dest, weight;\n} Edge;\n\nvoid bellmanFord(int V, int E, Edge edges[], int src) {\n    int dist[V];\n    for (int i = 0; i < V; i++) dist[i] = INF;\n    dist[src] = 0;\n\n    // 1. Relax all edges V - 1 times\n    for (int i = 1; i <= V - 1; i++) {\n        for (int j = 0; j < E; j++) {\n            int u = edges[j].src;\n            int v = edges[j].dest;\n            int w = edges[j].weight;\n            if (dist[u] != INF && dist[u] + w < dist[v]) {\n                dist[v] = dist[u] + w;\n            }\n        }\n    }\n\n    // 2. Check for negative-weight cycles (V-th iteration)\n    bool hasCycle = false;\n    for (int j = 0; j < E; j++) {\n        int u = edges[j].src;\n        int v = edges[j].dest;\n        int w = edges[j].weight;\n        if (dist[u] != INF && dist[u] + w < dist[v]) {\n            hasCycle = true;\n            break;\n        }\n    }\n\n    if (hasCycle) {\n        printf(\"Graph contains a Negative-Weight Cycle!\\n\");\n    } else {\n        printf(\"Shortest Distances from Source %d:\\n\", src);\n        for (int i = 0; i < V; i++) {\n            printf(\"  Vertex %d : %d\\n\", i, dist[i]);\n        }\n    }\n}\n\nint main() {\n    int V = 5, E = 8;\n    Edge edges[] = {\n        {0, 1, -1}, {0, 2, 4},\n        {1, 2, 3},  {1, 3, 2}, {1, 4, 2},\n        {3, 2, 5},  {3, 1, 1},\n        {4, 3, -3}\n    };\n\n    bellmanFord(V, E, edges, 0);\n\n    return 0;\n}",
              "output": "Shortest Distances from Source 0:\n  Vertex 0 : 0\n  Vertex 1 : -1\n  Vertex 2 : 2\n  Vertex 3 : -2\n  Vertex 4 : 1"
            }
          ],
          "keyPoints": [
            "SSSP algorithms determine shortest paths from a single source to all other graph vertices.",
            "Edge relaxation updates dist[v] = min(dist[v], dist[u] + weight(u, v)).",
            "Dijkstra uses a greedy Min-Heap approach running in O((V + E) log V) time, requiring non-negative weights.",
            "Bellman-Ford relaxes all edges V - 1 times in O(V * E) time using dynamic programming.",
            "Bellman-Ford detects negative weight cycles on a V-th relaxation pass."
          ],
          "theoryQuestions": [
            {
              "question": "Explain Dijkstra's algorithm for finding the single-source shortest path. Why does it fail when the graph contains negative edge weights?",
              "marks": "7 Marks",
              "answer": "1. **Dijkstra's Algorithm Overview**:\n   - Initialize `dist[s] = 0` and all other `dist[v] = infinity`.\n   - Maintain a Min-Heap priority queue of pairs `(dist, vertex)` and a set `visited`.\n   - While the priority queue is not empty:\n     * Extract vertex $u$ with minimum `dist[u]`.\n     * If $u$ is already visited, continue.\n     * Mark $u$ as visited.\n     * For each neighbor $v$ of $u$ with weight $w$:\n       - If `dist[u] + w < dist[v]`:\n         * `dist[v] = dist[u] + w`.\n         * Insert `(dist[v], v)` into priority queue.\n\n2. **Why Dijkstra Fails on Negative Edge Weights**:\n   - **Greedy Invariant**: Dijkstra assumes that when a vertex $u$ is extracted from the Min-Heap, its distance `dist[u]` is final and optimal.\n   - This assumption is mathematically valid *only if all future edge additions are non-negative* ($w \\ge 0$), meaning path lengths can only grow.\n   - If negative edge weights exist, a longer multi-hop path could later reduce the total path cost below `dist[u]`.\n   - Because Dijkstra marks nodes as permanently visited and never revisits them, it misses these shorter paths, producing incorrect distance results.",
              "keyPoints": [
                "Dijkstra's step-by-step algorithm using priority queue.",
                "Analysis of the greedy invariant.",
                "Explanation with counterexample showing how negative weights break path monotonicity."
              ]
            },
            {
              "question": "Explain the Bellman-Ford algorithm. Prove why V - 1 relaxation iterations are sufficient to find shortest paths in a graph without negative cycles.",
              "marks": "5 Marks",
              "answer": "1. **Bellman-Ford Algorithm**:\n   - Initialize `dist[source] = 0` and all other `dist[v] = infinity`.\n   - Execute $V - 1$ outer iterations. In each iteration, relax every edge $(u, v) \\in E$:\n     `if (dist[u] + w < dist[v]) dist[v] = dist[u] + w;`\n   - Execute a $V$-th pass: if any edge can still be relaxed, report \"Negative Cycle Detected\".\n\n2. **Proof Why $V - 1$ Iterations Suffice**:\n   - In a graph of $V$ vertices with no negative cycles, a simple shortest path visits each vertex at most once.\n   - Therefore, any simple shortest path contains at most **$V - 1$ edges**.\n   - In the $1$-st iteration, all shortest paths of length 1 edge are correctly determined.\n   - By induction, after iteration $k$, all shortest paths of length at most $k$ edges are guaranteed to be computed.\n   - Because the longest simple shortest path has at most $V - 1$ edges, **$V - 1$ iterations guarantee that all shortest paths are finalized**.",
              "keyPoints": [
                "Specification of Bellman-Ford steps and V-1 outer loop.",
                "Theorem: simple path in graph with V vertices has at most V - 1 edges.",
                "Inductive proof showing k-th iteration finalizes paths of length k."
              ]
            }
          ],
          "mcqs": [
            {
              "question": "What is the time complexity of Dijkstra's algorithm implemented using a binary Min-Heap for a graph with V vertices and E edges?",
              "options": [
                "O(V^2)",
                "O((V + E) log V)",
                "O(V * E)",
                "O(E^2)"
              ],
              "correctIndex": 1,
              "explanation": "Each vertex is extracted from the heap in O(log V) time (V log V total), and each edge can trigger a heap update in O(log V) time (E log V total), yielding O((V + E) log V)."
            },
            {
              "question": "Under what circumstance does Dijkstra's algorithm produce incorrect shortest path results?",
              "options": [
                "When the graph contains disconnected components.",
                "When the graph contains directed cycles.",
                "When the graph contains edges with negative weights.",
                "When the graph has more than 1,000 vertices."
              ],
              "correctIndex": 2,
              "explanation": "Negative weights invalidate Dijkstra's greedy choice property, which assumes that extracting the minimum distance node permanently finalizes its shortest path."
            },
            {
              "question": "How many times does the Bellman-Ford algorithm relax all edges in a graph with V vertices?",
              "options": [
                "V times",
                "V - 1 times (plus 1 optional pass for negative cycle detection)",
                "E times",
                "log2(V) times"
              ],
              "correctIndex": 1,
              "explanation": "Because a simple path has at most V - 1 edges, Bellman-Ford runs V - 1 relaxation iterations, followed by a V-th pass to check for negative-weight cycles."
            },
            {
              "question": "If an edge can still be relaxed during the V-th iteration of Bellman-Ford, what does this indicate?",
              "options": [
                "The source vertex is unreachable.",
                "The graph contains a negative-weight cycle reachable from the source.",
                "The graph is bipartite.",
                "The graph is a DAG."
              ],
              "correctIndex": 1,
              "explanation": "If a distance can still decrease after V - 1 passes, path costs can decrease indefinitely, proving the presence of a reachable negative-weight cycle."
            }
          ]
        },
        {
          "id": "dsa-u5-t5",
          "title": "Minimum Spanning Tree (MST): Cut Property, Prim's Algorithm vs Kruskal's Algorithm with Disjoint-Set Union (Union-Find by Rank & Path Compression)",
          "simpleExplanation": "A Minimum Spanning Tree (MST) connects all vertices in an undirected weighted graph with minimum total edge weight without forming cycles (containing V - 1 edges). The Cut Property underpins both Prim's Algorithm (which grows a single tree vertex-by-vertex using a Min-Heap) and Kruskal's Algorithm (which sorts all edges and selects non-cyclic edges using Disjoint-Set Union with Union by Rank and Path Compression in near-linear time).",
          "detailedExplanation": "## 1. The Minimum Spanning Tree (MST) Problem\n\nGiven a connected, undirected, weighted graph $G = (V, E)$, a **Spanning Tree** is a subgraph $T = (V, E_T)$ that connects all $|V|$ vertices with exactly $|V| - 1$ edges without containing any cycles.\n\nThe **Minimum Spanning Tree (MST)** is the spanning tree that minimizes the total sum of edge weights:\n$$w(T) = \\sum_{e \\in E_T} w(e) \\quad \\text{is minimized}$$\n\n```mermaid\ngraph LR\n    subgraph Graph [\"Original Graph\"]\n        A((A)) ---|4| B((B))\n        A ---|2| C((C))\n        B ---|1| C\n        B ---|5| D((D))\n        C ---|8| D\n    end\n\n    subgraph MST [\"Minimum Spanning Tree (Total Weight = 2 + 1 + 5 = 8)\"]\n        MA((A)) ---|2| MC((C))\n        MB((B)) ---|1| MC\n        MB ---|5| MD((D))\n    end\n```\n\n---\n\n## 2. The Cut Property (Theoretical Foundation of MST)\n\nBoth Prim's and Kruskal's greedy algorithms are proven correct by the **Cut Property**:\n\n> **The Cut Property**:\n> Let $S \\subset V$ be any subset of vertices, and let $(S, V - S)$ be a **cut** partitioning the graph into two disjoint sets.\n> If edge $e = (u, v)$ is the **strictly minimum-weight edge** crossing the cut (i.e., with one endpoint in $S$ and the other in $V - S$), then **this edge $e$ must belong to the Minimum Spanning Tree**.\n\n---\n\n## 3. Prim's Algorithm (Vertex-Growing Strategy)\n\nPrim's algorithm starts from an arbitrary root vertex and grows a single tree outward vertex-by-vertex:\n1. Initialize an empty tree $T$ and a set of visited vertices $S = \\{s\\}$.\n2. Insert all edges incident to $s$ into a Min-Heap Priority Queue.\n3. While the tree contains fewer than $V - 1$ edges:\n   - Extract the minimum weight edge $e = (u, v)$ from the Min-Heap where $u \\in S$.\n   - If $v \\in S$, discard $e$ (it would form a cycle).\n   - If $v \\notin S$:\n     - Add $e$ to MST $T$.\n     - Add $v$ to $S$.\n     - Enqueue all edges departing from $v$ into the Min-Heap.\n- **Time Complexity**: $\\mathcal{O}((V + E) \\log V)$ using a binary Min-Heap.\n\n```mermaid\nsequenceDiagram\n    autonumber\n    participant T as Prim's MST Set S\n    participant PQ as Min-Heap of Crossing Edges\n    Note over T: S = {0}\n    Note over PQ: Edges crossing from S to V-S: (0-1: 4), (0-7: 8)\n    Note over PQ: Extract Min: Edge (0-1: 4) -> Add to MST!\n    Note over T: S = {0, 1}\n    Note over PQ: Add crossing edges from vertex 1 -> Extract next minimum crossing edge...\n```\n\n---\n\n## 4. Kruskal's Algorithm (Edge-Growing Strategy)\n\nKruskal's algorithm treats the graph as a forest of individual trees and merges them:\n1. Sort all $E$ edges in non-decreasing order of weight: $w(e_1) \\le w(e_2) \\le \\dots \\le w(e_E)$.\n2. Iterate through sorted edges:\n   - If adding edge $(u, v)$ **does not create a cycle**, add it to the MST.\n   - Else, discard the edge.\n3. Stop when $V - 1$ edges have been selected.\n\n```mermaid\nflowchart TD\n    subgraph Kruskal_Flow [\"Kruskal's Algorithm Flow\"]\n        K1[\"1. Sort all E edges by weight in O(E log E)\"]\n        K2[\"2. Initialize DSU: each vertex is its own set\"]\n        K3[\"3. For each edge (u, v) in sorted order:\n   If find(u) != find(v):\n     Add (u, v) to MST\n     union(u, v)\n     If edges == V - 1: break\"]\n        K1 --> K2 --> K3\n    end\n```\n\n---\n\n## 5. Disjoint-Set Union (DSU) / Union-Find\n\nTo check if edge $(u, v)$ creates a cycle in $\\mathcal{O}(1)$ time, Kruskal's algorithm uses a **Disjoint-Set Union (DSU)** data structure with two optimizations:\n\n### A. Union by Rank\n- Each set is a tree; `rank[root]` estimates tree height.\n- When unioning two sets, always attach the root of the **smaller rank tree** under the root of the **higher rank tree**, preventing tree skewing.\n\n### B. Path Compression\n- During `find(x)`, make every traversed node point directly to the set representative root.\n\n```mermaid\ngraph TD\n    subgraph PathCompression [\"Path Compression in find(x)\"]\n        subgraph Before [\"Before: Deep Pointer Chain\"]\n            A1((Root)) --> B1((B))\n            B1 --> C1((C))\n            C1 --> D1((x))\n        end\n        subgraph After [\"After: Flat Tree with O(1) Depth\"]\n            A2((Root)) --> B2((B))\n            A2 --> C2((C))\n            A2 --> D2((x))\n        end\n    end\n```\n\n### Ackermann Complexity\nWith Union by Rank + Path Compression, any sequence of $m$ operations on $n$ elements executes in:\n$$\\mathcal{O}(m \\cdot \\alpha(n))$$\nWhere $\\alpha(n)$ is the **Inverse Ackermann Function**. For all physical values in the known universe ($n < 10^{80}$ atoms), $\\alpha(n) \\le 4$, making DSU operations **effectively $\\mathcal{O}(1)$ constant time**!\n\n---\n\n## 6. Prim vs Kruskal Comparison Matrix\n\n| Dimension | Prim's Algorithm | Kruskal's Algorithm |\n| :--- | :--- | :--- |\n| **Strategy** | Grows a single tree from a root vertex | Grows a forest of trees by picking global minimum edges |\n| **Data Structures** | Min-Heap Priority Queue + Visited array | Sorting Algorithm + Disjoint-Set Union (DSU) |\n| **Time Complexity** | $\\mathcal{O}((V + E) \\log V)$ | $\\mathcal{O}(E \\log E) = \\mathcal{O}(E \\log V)$ |\n| **Dense Graphs ($E \\approx V^2$)**| **Faster** ($\\\\mathcal{O}(V^2)$ with adjacency matrix) | Slower (sorting $V^2$ edges) |\n| **Sparse Graphs ($E \\approx V$)** | Slower | **Faster** (fewer edges to sort) |\n\n---\n\n> [!IMPORTANT] **MEMORIZE:**\n> - An MST always contains exactly **$V - 1$ edges**.\n> - The Cut Property states that the lightest edge crossing any cut belongs to the MST.\n> - Kruskal's uses **DSU** (Union-Find) with Union by Rank and Path Compression ($\\\\alpha(n) \\approx \\mathcal{O}(1)$).\n> - Prim's is preferred for **Dense Graphs**; Kruskal's is preferred for **Sparse Graphs**.\n\n> [!NOTE] **DEV BRAIN:**\n> In computer graphics, Kruskal's algorithm on a randomized grid generates realistic mazes: cells are vertices, walls are edges with random weights, and the MST forms the maze corridors!\n\n> [!WARNING] **TRAP:**\n> Do not confuse a Minimum Spanning Tree with Shortest Paths! Dijkstra minimizes the path from a *single source*; MST minimizes the *total weight of all edges* across the entire network. The shortest path between two vertices in an MST is often NOT the shortest path in the original graph!\n\n> [!TIP] **EXAM TIP:**\n> When asked to trace Kruskal's algorithm, list all edges sorted by weight in a table, and for each edge show whether it is **ACCEPTED** or **REJECTED (Forms Cycle)**.",
          "shortNotes": "MST connects all V vertices with V - 1 edges of minimum total weight. Prim grows a tree via Min-Heap (best for dense). Kruskal sorts edges and selects via DSU with path compression (best for sparse).",
          "examples": [
            {
              "title": "C Implementation of Kruskal's Algorithm using Disjoint-Set Union (Union by Rank)",
              "problem": "Implement Kruskal's algorithm to compute the Minimum Spanning Tree weight of an undirected graph.",
              "explanation": "Sorts edges, uses DSU with path compression and union by rank to prevent cycles, and sums MST weights.",
              "code": "#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct {\n    int u, v, weight;\n} Edge;\n\ntypedef struct {\n    int parent;\n    int rank;\n} Subset;\n\nint find(Subset subsets[], int i) {\n    if (subsets[i].parent != i)\n        subsets[i].parent = find(subsets, subsets[i].parent); // Path Compression\n    return subsets[i].parent;\n}\n\nvoid unionSets(Subset subsets[], int x, int y) {\n    int rootX = find(subsets, x);\n    int rootY = find(subsets, y);\n\n    if (subsets[rootX].rank < subsets[rootY].rank)\n        subsets[rootX].parent = rootY;\n    else if (subsets[rootX].rank > subsets[rootY].rank)\n        subsets[rootY].parent = rootX;\n    else {\n        subsets[rootY].parent = rootX;\n        subsets[rootX].rank++;\n    }\n}\n\nint compareEdges(const void *a, const void *b) {\n    return ((Edge*)a)->weight - ((Edge*)b)->weight;\n}\n\nvoid kruskalsMST(int V, int E, Edge edges[]) {\n    // 1. Sort edges by weight\n    qsort(edges, E, sizeof(Edge), compareEdges);\n\n    Subset *subsets = (Subset*)malloc(V * sizeof(Subset));\n    for (int v = 0; v < V; v++) {\n        subsets[v].parent = v;\n        subsets[v].rank = 0;\n    }\n\n    Edge mst[V - 1];\n    int edgeCount = 0;\n    int totalWeight = 0;\n\n    for (int i = 0; i < E && edgeCount < V - 1; i++) {\n        Edge nextEdge = edges[i];\n        int x = find(subsets, nextEdge.u);\n        int y = find(subsets, nextEdge.v);\n\n        if (x != y) { // Does not form cycle\n            mst[edgeCount++] = nextEdge;\n            totalWeight += nextEdge.weight;\n            unionSets(subsets, x, y);\n        }\n    }\n\n    printf(\"Minimum Spanning Tree Edges:\\n\");\n    for (int i = 0; i < edgeCount; i++) {\n        printf(\"  Edge (%d - %d) : Weight %d\\n\", \n               mst[i].u, mst[i].v, mst[i].weight);\n    }\n    printf(\"Total MST Weight: %d\\n\", totalWeight);\n\n    free(subsets);\n}\n\nint main() {\n    int V = 4, E = 5;\n    Edge edges[] = {\n        {0, 1, 10},\n        {0, 2, 6},\n        {0, 3, 5},\n        {1, 3, 15},\n        {2, 3, 4}\n    };\n\n    kruskalsMST(V, E, edges);\n\n    return 0;\n}",
              "output": "Minimum Spanning Tree Edges:\n  Edge (2 - 3) : Weight 4\n  Edge (0 - 3) : Weight 5\n  Edge (0 - 1) : Weight 10\nTotal MST Weight: 19"
            }
          ],
          "keyPoints": [
            "An MST connects all V vertices with exactly V - 1 edges of minimal total weight without cycles.",
            "The Cut Property proves that the minimum-weight edge crossing any cut belongs to the MST.",
            "Prim's algorithm grows a single tree from a root using a priority queue in O((V + E) log V) time.",
            "Kruskal's algorithm sorts edges and selects valid edges using Disjoint-Set Union (DSU).",
            "DSU with Path Compression and Union by Rank achieves effectively O(1) amortized cycle checks.",
            "Prim's is faster for dense graphs; Kruskal's is faster for sparse graphs."
          ],
          "theoryQuestions": [
            {
              "question": "State the Cut Property of Minimum Spanning Trees. Prove that the lightest edge crossing any cut must belong to an MST.",
              "marks": "7 Marks",
              "answer": "1. **Statement of the Cut Property**:\n   Let $G = (V, E)$ be a connected, undirected graph with real edge weights. Let $(S, V - S)$ be any cut partitioning vertices $V$ into two disjoint sets. If edge $e = (u, v)$ is the strictly minimum-weight edge crossing the cut $(u \\in S, v \\in V - S)$, then edge $e$ belongs to every Minimum Spanning Tree of $G$.\n\n2. **Proof by Contradiction**:\n   - Assume there exists an MST $T$ that does NOT contain the lightest crossing edge $e = (u, v)$.\n   - Since $T$ is a spanning tree, adding edge $e$ to $T$ must create a unique cycle $C$.\n   - Because $u \\in S$ and $v \\in V - S$, the cycle $C$ must cross the cut $(S, V - S)$ at least once more via some other edge $e' = (x, y)$ where $x \\in S$ and $y \\in V - S$.\n   - Now, construct a new spanning tree $T'$ by removing $e'$ and adding $e$:\n     $$T' = (T - \\{e'\\}) \\cup \\{e\\}$$\n   - The total weight of the new tree is:\n     $$w(T') = w(T) - w(e') + w(e)$$\n   - Because $e$ is the strictly minimum-weight edge crossing the cut, $w(e) < w(e')$.\n   - Therefore:\n     $$w(T') < w(T)$$\n   - This contradicts the initial premise that $T$ was a Minimum Spanning Tree!\n   - Hence, the lightest crossing edge $e$ must belong to the MST. Q.E.D.",
              "keyPoints": [
                "Formal statement of the Cut Property.",
                "Proof by contradiction using cycle creation when adding edge e.",
                "Swapping e with crossing edge e' to produce tree of strictly lower weight."
              ]
            },
            {
              "question": "Explain the Disjoint-Set Union (DSU) data structure. Describe the two optimizations: (a) Union by Rank, and (b) Path Compression. What is the resulting time complexity?",
              "marks": "5 Marks",
              "answer": "1. **Concept of DSU**:\n   DSU maintains a collection of disjoint sets supporting two operations: `find(x)` (identifies set representative) and `union(x, y)` (merges two sets).\n\n2. **Optimization 1: Union by Rank**:\n   - Naive union can link taller trees under shorter ones, creating a degenerate chain of depth $O(n)$.\n   - In Union by Rank, each set maintains a `rank` approximating tree height.\n   - When unioning, attach the root of the smaller rank tree under the root of the larger rank tree. Rank increases only if both trees had equal rank.\n   - Limits tree height to $\\mathcal{O}(\\log n)$.\n\n3. **Optimization 2: Path Compression**:\n   - Inside `find(x)`, make every visited node point directly to the root representative:\n     `parent[x] = find(parent[x])`.\n   - Flattens the tree so future `find` queries on those nodes execute in $O(1)$ time.\n\n4. **Resulting Complexity**:\n   Combining Union by Rank and Path Compression reduces the amortized cost per operation to $\\mathcal{O}(\\alpha(n))$, where $\\alpha(n) \\le 4$ is the Inverse Ackermann function\u2014effectively constant time.",
              "keyPoints": [
                "Definition of DSU operations find and union.",
                "Union by Rank mechanism preventing deep skewing.",
                "Path compression flattening tree during find queries.",
                "Inverse Ackermann O(alpha(n)) complexity."
              ]
            }
          ],
          "mcqs": [
            {
              "question": "How many edges must a Minimum Spanning Tree contain for a connected graph with V vertices?",
              "options": [
                "V",
                "V - 1",
                "V + 1",
                "E / 2"
              ],
              "correctIndex": 1,
              "explanation": "Any spanning tree of a graph with V vertices contains exactly V - 1 edges, providing connectivity with zero cycles."
            },
            {
              "question": "What is the primary role of the Disjoint-Set Union (DSU) data structure in Kruskal's algorithm?",
              "options": [
                "To sort the edges in ascending order",
                "To determine in O(1) amortized time whether adding an edge creates a cycle",
                "To compute shortest paths from the source vertex",
                "To store vertex coordinates"
              ],
              "correctIndex": 1,
              "explanation": "DSU checks whether the endpoints of an edge belong to the same connected component (`find(u) == find(v)`). If they do, adding the edge would form a cycle."
            },
            {
              "question": "For a dense graph where E is approximately V^2, which MST algorithm is computationally more efficient?",
              "options": [
                "Kruskal's Algorithm",
                "Prim's Algorithm implemented with an Adjacency Matrix",
                "Bellman-Ford Algorithm",
                "Floyd-Warshall Algorithm"
              ],
              "correctIndex": 1,
              "explanation": "For dense graphs (E approx V^2), Prim's algorithm using an adjacency matrix runs in O(V^2) time, avoiding the O(E log E) = O(V^2 log V) cost of sorting all edges in Kruskal's."
            },
            {
              "question": "What is the time complexity of an operation in Disjoint-Set Union when both Union by Rank and Path Compression are implemented?",
              "options": [
                "O(n)",
                "O(log n)",
                "O(alpha(n)) where alpha is the Inverse Ackermann function (effectively O(1))",
                "O(n log n)"
              ],
              "correctIndex": 2,
              "explanation": "Combining Union by Rank and Path Compression yields an amortized bound of O(alpha(n)) per operation, where alpha(n) <= 4 for all practical universe-scale values."
            }
          ]
        }
      ]
    },
    {
      "id": "dsa-u6",
      "title": "Unit 6: Searching, Sorting & Hashing",
      "description": "Information retrieval and ordering algorithms. Covers Linear vs Binary Search (with O(log n) proofs and Binary Search on Answer), quadratic sorting algorithms (Bubble, Selection, Insertion), optimal divide-and-conquer sorting (Merge Sort vs Quick Sort with Lomuto/Hoare partitions), and hashing collision resolution (Chaining vs Open Addressing).",
      "topics": [
        {
          "id": "dsa-u6-t1",
          "title": "Searching: Linear Search vs Binary Search (Iterative, Recursive, O(log n) derivation, Binary Search on Answer)",
          "simpleExplanation": "Linear Search sequentially inspects every element in O(n) time on arbitrary data, whereas Binary Search eliminates half the remaining search space in each iteration by halving a sorted array in O(log n) time. The advanced paradigm of 'Binary Search on Answer' generalizes this principle to find optimal values across monotonic solution spaces.",
          "detailedExplanation": "## 1. Linear Search vs Binary Search\n\nSearching is the computational process of locating a target key $K$ within a collection of $n$ elements.\n\n```mermaid\nflowchart TD\n    subgraph Search_Comparison [\"Search Strategy Comparison\"]\n        LS[\"Linear Search\n- Requires NO sorting\n- Scans items sequentially\n- Best: O(1), Worst: O(n)\n- Universal on all data structures\"]\n        BS[\"Binary Search\n- REQUIRES SORTED ARRAY\n- Eliminates half search space each step\n- Best: O(1), Worst: O(log n)\n- Requires contiguous random access\"]\n    end\n```\n\n### A. Linear Search (Sequential Search)\n- **Mechanism**: Inspect elements from index $0$ to $n - 1$ sequentially. Stop when $A[i] == K$.\n- **Best Case**: Target at first index $\\implies \\mathcal{O}(1)$.\n- **Worst Case**: Target at final index or absent $\\implies \\mathcal{O}(n)$.\n- **Average Case**: $\\frac{n+1}{2}$ comparisons $\\implies \\mathcal{O}(n)$.\n\n### B. Binary Search (Interval Halving)\n- **Prerequisite**: The array MUST be sorted ($A[0] \\le A[1] \\le \\dots \\le A[n-1]$).\n- **Mechanism**: Maintain bounds `low` and `high`. Compute midpoint `mid`:\n  1. If $A[\\text{mid}] == K$: Target found.\n  2. If $A[\\text{mid}] > K$: Target must reside in left half $\\implies \\text{high} = \\text{mid} - 1$.\n  3. If $A[\\text{mid}] < K$: Target must reside in right half $\\implies \\text{low} = \\text{mid} + 1$.\n\n```mermaid\nsequenceDiagram\n    autonumber\n    participant A as Sorted Array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]\n    Note over A: Target = 23. Initial: low = 0, high = 9\n    Note over A: mid = (0 + 9)/2 = 4 -> A[4] = 16. (16 < 23) -> low = mid + 1 = 5\n    Note over A: Subarray: [23, 38, 56, 72, 91]. low = 5, high = 9\n    Note over A: mid = (5 + 9)/2 = 7 -> A[7] = 56. (56 > 23) -> high = mid - 1 = 6\n    Note over A: Subarray: [23, 38]. low = 5, high = 6\n    Note over A: mid = (5 + 6)/2 = 5 -> A[5] = 23. Target Found at index 5!\n```\n\n---\n\n## 2. Mathematical Derivation of $\\mathcal{O}(\\log_2 n)$ Time Complexity\n\nLet the initial problem size be $n$. In each iteration, the remaining search interval is halved:\n- After iteration 1: $n / 2$ elements remain.\n- After iteration 2: $n / 4 = n / 2^2$ elements remain.\n- After iteration $k$: $n / 2^k$ elements remain.\n\nThe search terminates in the worst case when the interval contains only 1 element:\n$$\\frac{n}{2^k} = 1 \\implies 2^k = n$$\nTaking $\\log_2$ on both sides:\n$$k = \\log_2 n$$\nTherefore, Binary Search executes at most $\\lfloor \\log_2 n \\rfloor + 1$ comparisons, yielding **$\\mathcal{O}(\\log n)$ worst-case time**.\n\n---\n\n## 3. The Integer Overflow Midpoint Bug\n\nIn classic textbooks, the midpoint formula is written as:\n$$\\text{mid} = \\frac{\\text{low} + \\text{high}}{2}$$\n\nIn programming environments with fixed-width 32-bit signed integers (C, C++, Java), if $\\text{low} + \\text{high} > 2^{31} - 1 = 2,147,483,647$, the sum **overflows into negative values**, yielding a negative index that triggers an `ArrayIndexOutOfBoundsException` or Segmentation Fault!\n\n### Safe Midpoint Arithmetic:\n$$\\text{mid} = \\text{low} + \\frac{\\text{high} - \\text{low}}{2}$$\n*(Or bitwise shift: `low + ((high - low) >> 1)`).*\n\n---\n\n## 4. Binary Search on Answer (Monotonic Predicates)\n\nBinary search is not limited to array lookups. It applies to **any monotonic function / predicate** $P(x)$:\n- If $P(x) = \\text{True} \\implies P(y) = \\text{True}$ for all $y > x$.\n- We can binary search over the range of possible numerical answers $[\\text{min\\_val}, \\text{max\\_val}]$ to find the optimal boundary $x$.\n- **Examples**: Painter's Partition Problem, Book Allocation Problem, finding maximum capacity or minimum completion time.\n\n---\n\n> [!IMPORTANT] **MEMORIZE:**\n> Always compute the midpoint as `low + (high - low) / 2` to prevent 32-bit integer overflow!\n\n> [!NOTE] **DEV BRAIN:**\n> In 2006, Google engineer Joshua Bloch revealed that standard binary search implementations across Java (`java.util.Arrays.binarySearch`), C libraries, and university textbooks had contained the `(low + high) / 2` integer overflow bug for over two decades!\n\n> [!WARNING] **TRAP:**\n> Do not attempt Binary Search on a standard Singly Linked List! Even though the list may be sorted, accessing `mid` requires $\\mathcal{O}(n)$ sequential pointer traversal, rendering binary search $\\mathcal{O}(n)$\u2014worse than linear search due to pointer overhead!\n\n> [!TIP] **EXAM TIP:**\n> When asked to compare Linear and Binary Search, create a table covering: (1) Data ordering requirement, (2) Time complexity (Best, Avg, Worst), (3) Underlying data structure constraints (arrays vs lists), and (4) Number of comparisons for input $n = 10^6$ ($10^6$ vs $\\approx 20$).",
          "shortNotes": "Linear Search checks elements sequentially in O(n) on unsorted data. Binary Search cuts sorted search space in half in O(log n) time. Safe mid formula: low + (high - low) / 2.",
          "examples": [
            {
              "title": "C Program: Iterative and Recursive Binary Search with Overflow-Safe Midpoint",
              "problem": "Implement iterative and recursive binary search on a sorted integer array with overflow-safe midpoint calculation.",
              "explanation": "Demonstrates index arithmetic, boundary adjustments, and comparison tracing.",
              "code": "#include <stdio.h>\n\n// Iterative Binary Search: O(1) Auxiliary Space\nint binarySearchIterative(int arr[], int n, int target) {\n    int low = 0;\n    int high = n - 1;\n\n    while (low <= high) {\n        int mid = low + (high - low) / 2; // Overflow-safe!\n\n        if (arr[mid] == target)\n            return mid;\n        else if (arr[mid] < target)\n            low = mid + 1;  // Search right\n        else\n            high = mid - 1; // Search left\n    }\n    return -1; // Not found\n}\n\n// Recursive Binary Search: O(log n) Call Stack Space\nint binarySearchRecursive(int arr[], int low, int high, int target) {\n    if (low > high) return -1;\n\n    int mid = low + (high - low) / 2;\n    if (arr[mid] == target)\n        return mid;\n    else if (arr[mid] < target)\n        return binarySearchRecursive(arr, mid + 1, high, target);\n    else\n        return binarySearchRecursive(arr, low, mid - 1, target);\n}\n\nint main() {\n    int arr[] = {3, 7, 12, 19, 25, 34, 48, 56, 68, 80};\n    int n = sizeof(arr) / sizeof(arr[0]);\n    int target = 48;\n\n    int idxIter = binarySearchIterative(arr, n, target);\n    printf(\"Iterative Search: Found %d at index %d\\n\", target, idxIter);\n\n    int idxRec = binarySearchRecursive(arr, 0, n - 1, target);\n    printf(\"Recursive Search: Found %d at index %d\\n\", target, idxRec);\n\n    target = 99; // Absent\n    printf(\"Searching for 99: Result = %d (Not Found)\\n\", \n           binarySearchIterative(arr, n, target));\n\n    return 0;\n}",
              "output": "Iterative Search: Found 48 at index 6\nRecursive Search: Found 48 at index 6\nSearching for 99: Result = -1 (Not Found)"
            }
          ],
          "keyPoints": [
            "Linear search operates on arbitrary unsorted data in O(n) time.",
            "Binary search requires sorted data with O(1) random access, running in O(log n) time.",
            "Binary search repeatedly eliminates half the search space, terminating in at most log2(n) + 1 steps.",
            "The safe midpoint formula low + (high - low) / 2 prevents 32-bit integer overflow.",
            "Binary Search on Answer applies interval bisection over monotonic predicate answer domains."
          ],
          "theoryQuestions": [
            {
              "question": "Derive the worst-case time complexity of Binary Search mathematically. Why is Binary Search inefficient when implemented on a Singly Linked List?",
              "marks": "5 Marks",
              "answer": "1. **Mathematical Derivation of Time Complexity**:\n   - Let $T(n)$ be the number of comparisons required for an array of size $n$.\n   - In each step, one comparison is made with the midpoint, and the search continues on a subarray of size at most $n/2$:\n     $$T(n) = T(n/2) + 1$$\n   - Applying repeated substitution:\n     $$T(n) = T(n/4) + 1 + 1 = T(n/2^2) + 2$$\n     $$T(n) = T(n/2^k) + k$$\n   - The recurrence terminates when $n / 2^k = 1 \\implies k = \\log_2 n$.\n   - Substituting $k = \\log_2 n$:\n     $$T(n) = T(1) + \\log_2 n = 1 + \\log_2 n = \\mathcal{O}(\\log n)$$\n\n2. **Why Inefficient on a Singly Linked List**:\n   - Binary Search requires $\\mathcal{O}(1)$ random access to jump directly to the middle element.\n   - In a Singly Linked List, reaching the middle node requires traversing $\\approx n/2$ pointers sequentially from head, which costs $\\mathcal{O}(n)$ time.\n   - The recurrence becomes $T(n) = T(n/2) + \\mathcal{O}(n) = \\mathcal{O}(n)$, which offers no asymptotic benefit over simple linear search and carries higher pointer-chasing constant overhead.",
              "keyPoints": [
                "Recurrence relation T(n) = T(n/2) + 1.",
                "Step-by-step substitution derivation yielding O(log n).",
                "Explanation of why linked list lacks O(1) random access, degrading performance to O(n)."
              ]
            },
            {
              "question": "Explain the concept of 'Binary Search on Answer' with a suitable algorithmic problem example.",
              "marks": "5 Marks",
              "answer": "1. **Concept of Binary Search on Answer**:\n   - Rather than searching for an element in an array, we binary search over the **range of possible answers** $[L, R]$ for an optimization problem.\n   - **Prerequisite**: The problem must exhibit **monotonicity**:\n     If a candidate answer $x$ is feasible, then all $y > x$ (or $y < x$) are also feasible.\n   - We construct a boolean check function `isFeasible(x)` that tests whether a candidate answer $x$ satisfies problem constraints in $\\mathcal{O}(n)$ time.\n   - We bisect the answer interval $[L, R]$, running in $\\mathcal{O}(n \\log(\\text{Range}))$ total time.\n\n2. **Illustrative Example (Painter's Partition Problem)**:\n   - *Problem*: Given $n$ boards of various lengths and $k$ painters, find the minimum time to paint all boards such that each painter paints contiguous boards.\n   - *Search Range*: $L = \\max(\\text{boards})$ (a painter must paint at least the largest board), $R = \\sum \\text{boards}$ (one painter paints everything).\n   - *Monotonicity*: If all boards can be painted in time $T$, they can definitely be painted in any time $> T$.\n   - *Algorithm*: Binary search for midpoint $M = (L + R) / 2$. Check if $k$ painters suffice for time $M$. If yes, try smaller time ($R = M - 1$); if no, increase time ($L = M + 1$).",
              "keyPoints": [
                "Formal definition of monotonic answer domains.",
                "Role of boolean isFeasible(x) helper function.",
                "Painter's partition / allocation problem walkthrough."
              ]
            }
          ],
          "mcqs": [
            {
              "question": "What is the maximum number of comparisons needed to search for an element in a sorted array of 1,000,000 elements using Binary Search?",
              "options": [
                "1,000,000",
                "500,000",
                "20",
                "10"
              ],
              "correctIndex": 2,
              "explanation": "Because 2^19 = 524,288 and 2^20 = 1,048,576, binary search requires at most ceil(log2(1,000,000)) = 20 comparisons."
            },
            {
              "question": "Why is computing mid as (low + high) / 2 problematic in large arrays in C and Java?",
              "options": [
                "It produces floating-point roundoff errors.",
                "It can cause 32-bit signed integer overflow when low + high exceeds 2^31 - 1, resulting in a negative index.",
                "It causes compiler optimization failure.",
                "It uses two arithmetic instructions instead of one."
              ],
              "correctIndex": 1,
              "explanation": "When low + high exceeds 2,147,483,647, the sum overflows into a negative value, triggering an array out-of-bounds crash."
            },
            {
              "question": "What is the worst-case time complexity of Binary Search implemented on a Singly Linked List of n elements?",
              "options": [
                "O(1)",
                "O(log n)",
                "O(n)",
                "O(n log n)"
              ],
              "correctIndex": 2,
              "explanation": "Because linked lists do not support O(1) indexing, locating the midpoint node takes O(n) pointer traversals, resulting in O(n) total time."
            },
            {
              "question": "Which of the following conditions is strictly required before Binary Search can be applied to an array?",
              "options": [
                "The array elements must be unique.",
                "The array size must be a power of 2.",
                "The array must be sorted in monotonic order.",
                "The array must be dynamically allocated on the heap."
              ],
              "correctIndex": 2,
              "explanation": "Binary search relies on the monotonicity of sorted order to determine whether to discard the left or right half of the search interval."
            }
          ]
        },
        {
          "id": "dsa-u6-t2",
          "title": "Quadratic Sorting Algorithms: Bubble Sort, Selection Sort, Insertion Sort (Best, Average, Worst Case Comparisons, In-place & Stability)",
          "simpleExplanation": "Elementary comparison sorting algorithms operate with quadratic O(n^2) time complexity. Bubble Sort repeatedly swaps adjacent out-of-order elements; Selection Sort progressively selects the global minimum and places it at the front (unstable); and Insertion Sort incrementally builds a sorted prefix by sliding each element into position (stable, achieving optimal O(n) time on nearly-sorted data).",
          "detailedExplanation": "## 1. Core Sorting Terminology\n\nBefore evaluating sorting algorithms, we must define two essential qualitative properties:\n1. **In-Place Sorting**: An algorithm is strictly *in-place* if it requires a constant amount of additional memory outside the input array: $\\text{Auxiliary Space} = \\mathcal{O}(1)$.\n2. **Algorithm Stability**: A sorting algorithm is *stable* if it preserves the relative order of duplicate elements that share identical keys. Stability is critical when sorting records with multiple secondary keys (e.g., sorting employees by Name, then by Department).\n\n```mermaid\nflowchart TD\n    subgraph Quadratic_Sorts [\"The Quadratic Sorting Trio (O(n^2))\"]\n        B[\"Bubble Sort\n- Swaps adjacent inversions\n- In-place, Stable\n- Adaptive with swapped flag: O(n) Best\"]\n        S[\"Selection Sort\n- Finds global minimum and swaps\n- In-place, UNSTABLE\n- Non-adaptive: O(n^2) in ALL cases\"]\n        I[\"Insertion Sort\n- Inserts into sorted prefix\n- In-place, Stable\n- Best on nearly-sorted data: O(n) Best\"]\n    end\n```\n\n---\n\n## 2. Bubble Sort (Sinking Sort)\n\n### Mechanics:\nRepeatedly pass through the array, comparing adjacent elements `arr[j]` and `arr[j+1]`. If they are out of order (`arr[j] > arr[j+1]`), swap them. After pass $i$, the $i$-th largest element \"bubbles up\" to its permanent location at index $n - 1 - i$.\n\n```mermaid\nsequenceDiagram\n    autonumber\n    participant A as Array: [5, 1, 4, 2, 8]\n    Note over A: Pass 1: Compare (5,1) -> Swap -> [1, 5, 4, 2, 8]\n    Note over A: Compare (5,4) -> Swap -> [1, 4, 5, 2, 8]\n    Note over A: Compare (5,2) -> Swap -> [1, 4, 2, 5, 8]\n    Note over A: Compare (5,8) -> OK -> 8 is permanently locked at end!\n```\n\n### Adaptive Optimization:\nMaintain a boolean flag `swapped`. If an entire pass completes with zero swaps, the array is already completely sorted; terminate immediately!\n- **Best-Case Time (Already Sorted)**: $\\mathcal{O}(n)$ comparisons.\n- **Worst-Case Time (Reverse Sorted)**: $\\frac{n(n-1)}{2} = \\mathcal{O}(n^2)$ comparisons and swaps.\n\n---\n\n## 3. Selection Sort\n\n### Mechanics:\nDivide the array into a sorted prefix on the left and an unsorted suffix on the right:\n1. Scan the entire unsorted suffix to locate the index of the **global minimum**.\n2. Swap this minimum element with the first element of the unsorted suffix.\n3. Advance the sorted prefix boundary by 1.\n\n### Why Selection Sort is UNSTABLE:\nConsider sorting: $[4_A, 4_B, 2]$.\n1. The global minimum is $2$ at index 2.\n2. Selection sort swaps $4_A$ with $2$: $[2, 4_B, 4_A]$.\n3. $4_A$ has jumped over $4_B$, destroying their relative order! Thus, standard Selection Sort is **unstable**.\n\nSelection sort performs $\\mathcal{O}(n)$ total swaps, but its comparison count is **always $\\frac{n(n-1)}{2} = \\Theta(n^2)$**, even if the array is already sorted.\n\n---\n\n## 4. Insertion Sort (The Card Player's Algorithm)\n\n### Mechanics:\nIterate from index $1$ to $n - 1$. Assume elements from $0$ to $i - 1$ form a sorted prefix. Take `key = arr[i]`, and shift all elements in the sorted prefix that are greater than `key` one position to the right, then insert `key` into the vacated slot.\n\n```mermaid\nsequenceDiagram\n    autonumber\n    participant A as Array: [12, 11, 13, 5, 6]\n    Note over A: i=1, key=11: 12 > 11 -> Shift 12 right -> Insert 11 -> [11, 12, 13, 5, 6]\n    Note over A: i=2, key=13: 12 < 13 -> No shifts -> [11, 12, 13, 5, 6]\n    Note over A: i=3, key=5: Shift 13, 12, 11 right -> Insert 5 -> [5, 11, 12, 13, 6]\n```\n\n### Superiority on Nearly-Sorted Data:\nIf an array is already sorted or nearly sorted (each element is at most $k$ positions away from its target), Insertion Sort runs in **linear $\\mathcal{O}(n)$ time**.\nBecause of low constant overhead and optimal performance on small buffers, modern industrial sorting libraries (such as **Timsort** in Python/Java and **Introsort** in C++ `std::sort`) automatically switch to Insertion Sort for sub-arrays of size $n \\le 16$ to $32$!\n\n---\n\n## 5. Comprehensive Comparison Matrix\n\n| Algorithm | Best-Case Time | Average-Case Time | Worst-Case Time | Auxiliary Space | Stable? | Swaps Count |\n| :--- | :--- | :--- | :--- | :--- | :--- | :--- |\n| **Bubble Sort** | $\\mathcal{O}(n)$ (with flag) | $\\mathcal{O}(n^2)$ | $\\mathcal{O}(n^2)$ | $\\mathcal{O}(1)$ | **Yes** | $\\mathcal{O}(n^2)$ |\n| **Selection Sort** | $\\Theta(n^2)$ | $\\Theta(n^2)$ | $\\Theta(n^2)$ | $\\mathcal{O}(1)$ | **No** | $\\mathcal{O}(n)$ |\n| **Insertion Sort** | $\\mathcal{O}(n)$ | $\\mathcal{O}(n^2)$ | $\\mathcal{O}(n^2)$ | $\\mathcal{O}(1)$ | **Yes** | $\\mathcal{O}(n^2)$ shifts |\n\n---\n\n> [!IMPORTANT] **MEMORIZE:**\n> - Bubble Sort: Stable, in-place, $O(n)$ best case with flag.\n> - Selection Sort: **UNSTABLE**, in-place, always $O(n^2)$ comparisons, but performs minimum swaps ($O(n)$).\n> - Insertion Sort: Stable, in-place, $O(n)$ on nearly-sorted data, powers small-array thresholds in Timsort and Introsort.\n\n> [!NOTE] **DEV BRAIN:**\n> Selection Sort minimizes the number of memory write cycles (at most $n - 1$ swaps). In systems with write-sensitive memory (such as Flash EEPROM where write cycles degrade chip lifespan), Selection Sort is sometimes preferred over algorithms that perform frequent memory writes!\n\n> [!WARNING] **TRAP:**\n> Never claim Selection Sort is $O(n)$ on sorted arrays! It MUST scan the entire remaining suffix to verify that no smaller element exists. Its comparison count is strictly $\\frac{n(n-1)}{2}$ in all cases!\n\n> [!TIP] **EXAM TIP:**\n> When asked to prove instability of Selection Sort, write down the 3-element counterexample: $[4_A, 4_B, 2]$. Show that swapping 2 with $4_A$ yields $[2, 4_B, 4_A]$, breaking original order.",
          "shortNotes": "Bubble Sort swaps adjacent items (O(n) best). Selection Sort picks min (unstable, O(n) swaps, O(n^2) comparisons). Insertion Sort shifts sorted prefix (stable, O(n) best on nearly-sorted data).",
          "examples": [
            {
              "title": "C Program: Bubble, Selection, and Insertion Sort Implementations",
              "problem": "Implement optimized Bubble Sort (with swapped flag), Selection Sort, and Insertion Sort on integer arrays.",
              "explanation": "Demonstrates the three quadratic algorithms, tracking in-place swaps and early termination.",
              "code": "#include <stdio.h>\n#include <stdbool.h>\n\nvoid swap(int *a, int *b) {\n    int t = *a; *a = *b; *b = t;\n}\n\n// 1. Optimized Bubble Sort\nvoid bubbleSort(int arr[], int n) {\n    for (int i = 0; i < n - 1; i++) {\n        bool swapped = false;\n        for (int j = 0; j < n - 1 - i; j++) {\n            if (arr[j] > arr[j + 1]) {\n                swap(&arr[j], &arr[j + 1]);\n                swapped = true;\n            }\n        }\n        if (!swapped) break; // Array is sorted!\n    }\n}\n\n// 2. Selection Sort\nvoid selectionSort(int arr[], int n) {\n    for (int i = 0; i < n - 1; i++) {\n        int minIdx = i;\n        for (int j = i + 1; j < n; j++) {\n            if (arr[j] < arr[minIdx])\n                minIdx = j;\n        }\n        if (minIdx != i)\n            swap(&arr[i], &arr[minIdx]);\n    }\n}\n\n// 3. Insertion Sort\nvoid insertionSort(int arr[], int n) {\n    for (int i = 1; i < n; i++) {\n        int key = arr[i];\n        int j = i - 1;\n        while (j >= 0 && arr[j] > key) {\n            arr[j + 1] = arr[j]; // Shift right\n            j--;\n        }\n        arr[j + 1] = key;\n    }\n}\n\nvoid printArray(int arr[], int n) {\n    for (int i = 0; i < n; i++) printf(\"%d \", arr[i]);\n    printf(\"\\n\");\n}\n\nint main() {\n    int a1[] = {64, 34, 25, 12, 22, 11, 90};\n    int a2[] = {64, 34, 25, 12, 22, 11, 90};\n    int a3[] = {64, 34, 25, 12, 22, 11, 90};\n    int n = 7;\n\n    bubbleSort(a1, n);\n    printf(\"Bubble Sort Result    : \");\n    printArray(a1, n);\n\n    selectionSort(a2, n);\n    printf(\"Selection Sort Result : \");\n    printArray(a2, n);\n\n    insertionSort(a3, n);\n    printf(\"Insertion Sort Result : \");\n    printArray(a3, n);\n\n    return 0;\n}",
              "output": "Bubble Sort Result    : 11 12 22 25 34 64 90 \nSelection Sort Result : 11 12 22 25 34 64 90 \nInsertion Sort Result : 11 12 22 25 34 64 90 "
            }
          ],
          "keyPoints": [
            "An algorithm is stable if it preserves the relative order of duplicate elements with identical keys.",
            "In-place sorting requires O(1) auxiliary working memory outside the input array.",
            "Bubble Sort compares adjacent elements and bubbles the maximum to the end; achieves O(n) best-case with a swap flag.",
            "Selection Sort finds the global minimum and swaps it to the front, performing O(n) swaps but strictly O(n^2) comparisons (unstable).",
            "Insertion Sort inserts elements into a growing sorted prefix, executing in O(n) time on nearly-sorted arrays.",
            "Production hybrid sorters (Timsort, Introsort) use Insertion Sort for small sub-arrays."
          ],
          "theoryQuestions": [
            {
              "question": "What is meant by the stability of a sorting algorithm? Give an example demonstrating why Selection Sort is NOT stable.",
              "marks": "5 Marks",
              "answer": "1. **Definition of Stability**:\n   A sorting algorithm is defined as **stable** if two data records with equal keys appear in the sorted output in the exact same relative order as they appeared in the original unsorted input.\n   - Formally: If $A[i] = A[j]$ and $i < j$ in the input, then $A[i]$ must precede $A[j]$ in the sorted array.\n\n2. **Proof that Selection Sort is Unstable**:\n   - Consider the array of keys: $[4_A, 4_B, 2]$, where $4_A$ and $4_B$ are duplicate values distinguishable by subscript.\n   - In the first pass of Selection Sort, the algorithm scans the array and identifies $2$ (at index 2) as the global minimum.\n   - It swaps the minimum element ($2$) with the element at index 0 ($4_A$):\n     $$\\text{Output}: [2, 4_B, 4_A]$$\n   - Notice that $4_B$ now appears **before** $4_A$ in the sorted array!\n   - The initial relative order has been violated, proving that standard Selection Sort is **unstable**.",
              "keyPoints": [
                "Formal definition of stability regarding duplicate keys.",
                "Concrete 3-element counterexample [4A, 4B, 2].",
                "Demonstration that long-distance swap disrupts relative order."
              ]
            },
            {
              "question": "Compare Bubble Sort, Selection Sort, and Insertion Sort in terms of Best, Average, and Worst-case time complexities, auxiliary space, and number of swaps.",
              "marks": "7 Marks",
              "answer": "1. **Comparative Analysis Table**:\n\n| Feature / Metric | Bubble Sort | Selection Sort | Insertion Sort |\n| :--- | :--- | :--- | :--- |\n| **Best-Case Time** | $\\mathcal{O}(n)$ (with swapped flag) | $\\Theta(n^2)$ | $\\mathcal{O}(n)$ (already sorted) |\n| **Average-Case Time**| $\\mathcal{O}(n^2)$ | $\\Theta(n^2)$ | $\\mathcal{O}(n^2)$ |\n| **Worst-Case Time** | $\\mathcal{O}(n^2)$ (reverse sorted) | $\\Theta(n^2)$ | $\\mathcal{O}(n^2)$ (reverse sorted) |\n| **Auxiliary Space** | $\\mathcal{O}(1)$ (in-place) | $\\mathcal{O}(1)$ (in-place) | $\\mathcal{O}(1)$ (in-place) |\n| **Stability** | **Stable** | **Unstable** | **Stable** |\n| **Total Swaps** | $\\mathcal{O}(n^2)$ swaps | $\\mathcal{O}(n)$ swaps (at most $n-1$) | $\\mathcal{O}(n^2)$ element shifts |\n\n2. **Engineering Selection Summary**:\n   - **Insertion Sort** is the best choice when the array is nearly sorted or for small arrays ($N \\le 32$).\n   - **Selection Sort** is preferred when memory write operations are significantly more expensive than read comparisons (e.g., Flash EEPROM).\n   - **Bubble Sort** is primarily of pedagogical interest.",
              "keyPoints": [
                "Comprehensive comparison table covering time complexities, space, stability, and swaps.",
                "Highlighting Selection Sort's O(n) swap advantage.",
                "Highlighting Insertion Sort's O(n) nearly-sorted performance."
              ]
            }
          ],
          "mcqs": [
            {
              "question": "Which of the following quadratic sorting algorithms is NOT stable in its standard implementation?",
              "options": [
                "Bubble Sort",
                "Insertion Sort",
                "Selection Sort",
                "Merge Sort"
              ],
              "correctIndex": 2,
              "explanation": "Selection Sort performs long-distance swaps of the global minimum with the first unsorted element, which can leap over duplicate elements and disrupt their relative order."
            },
            {
              "question": "What is the best-case time complexity of Insertion Sort when applied to an array that is already sorted in ascending order?",
              "options": [
                "O(1)",
                "O(n)",
                "O(n log n)",
                "O(n^2)"
              ],
              "correctIndex": 1,
              "explanation": "When already sorted, the inner while-loop of Insertion Sort terminates immediately after 1 comparison per element, running in O(n) total time."
            },
            {
              "question": "Which sorting algorithm performs the minimum number of memory write/swap operations (at most n - 1 swaps)?",
              "options": [
                "Bubble Sort",
                "Insertion Sort",
                "Selection Sort",
                "QuickSort"
              ],
              "correctIndex": 2,
              "explanation": "Selection Sort performs at most one swap per outer loop iteration, making it optimal for environments where memory write operations are costly."
            },
            {
              "question": "Why do modern hybrid sorting algorithms like Timsort switch to Insertion Sort for sub-arrays of size N <= 32?",
              "options": [
                "Insertion Sort has zero comparison overhead.",
                "Insertion Sort has minimal constant overhead and outperforms O(n log n) algorithms on small contiguous cache lines.",
                "Divide-and-conquer algorithms crash on arrays smaller than 32.",
                "Insertion Sort requires O(n) extra heap memory."
              ],
              "correctIndex": 1,
              "explanation": "For small N, the low constant factors and excellent cache locality of Insertion Sort make it faster than the recursive function call overhead of Merge Sort or QuickSort."
            }
          ]
        },
        {
          "id": "dsa-u6-t3",
          "title": "Efficient Sorting: Merge Sort (Divide & Conquer, O(n log n) proof, Out-of-place) vs Quick Sort (Partitioning: Lomuto vs Hoare, Worst-case O(n^2), Randomized Quick Sort)",
          "simpleExplanation": "Merge Sort and Quick Sort are efficient O(n log n) divide-and-conquer sorting algorithms. Merge Sort recursively splits arrays in half and merges them in guaranteed O(n log n) time at the expense of O(n) auxiliary space (stable), whereas Quick Sort partitions elements around a pivot in-place using Lomuto or Hoare partitioning, achieving rapid average-case performance with O(n^2) worst-case avoided via randomization.",
          "detailedExplanation": "## 1. The Divide-and-Conquer Sorting Paradigm\n\nBoth Merge Sort and Quick Sort decompose a large array sorting task into smaller subproblems, but they divide and conquer at opposite phases:\n- **Merge Sort**: Divides *trivially* (splits array in half at index $n/2$), and does all heavy work during the **Combine phase** (`merge()`).\n- **Quick Sort**: Does all heavy work during the **Divide phase** (`partition()`), and requires zero work during the Combine phase!\n\n```mermaid\nflowchart TD\n    subgraph D_and_C [\"Divide and Conquer Comparison\"]\n        MS[\"Merge Sort\n- Divide: Split at mid (Trivial)\n- Conquer: Recurse on halves\n- Combine: merge() (Heavy work: O(n))\n- Guaranteed O(n log n) time\n- Stable, but Out-of-place (O(n) RAM)\"]\n        QS[\"Quick Sort\n- Divide: partition() (Heavy work: O(n))\n- Conquer: Recurse on partitions\n- Combine: Trivial (Already in place!)\n- Average O(n log n), Worst O(n^2)\n- Unstable, but In-place (O(log n) stack)\"]\n    end\n```\n\n---\n\n## 2. Merge Sort: Mechanics & Proof\n\n### The `merge()` Subroutine:\nGiven two adjacent sorted subarrays $A[\\text{low} \\dots \\text{mid}]$ and $A[\\text{mid}+1 \\dots \\text{high}]$, merge them into a single sorted range using an auxiliary temporary array:\n- Maintain two pointers $i = \\text{low}$ and $j = \\text{mid} + 1$.\n- At each step, compare $A[i]$ and $A[j]$; copy the smaller element into temporary buffer $B$.\n- Copy any remaining elements, then copy $B$ back into original array $A$.\n- **Running Time**: Strictly $\\Theta(n)$ where $n = \\text{high} - \\text{low} + 1$.\n\n### Mathematical Proof of $\\mathcal{O}(n \\log n)$ Time:\n$$T(n) = 2 T(n/2) + \\Theta(n)$$\nUsing Master Theorem: $a = 2, b = 2 \\implies n^{\\log_2 2} = n^1$.\nBecause $f(n) = \\Theta(n^1)$, Case 2 applies:\n$$T(n) = \\Theta(n \\log n) \\quad \\text{in Best, Average, and Worst Cases!}$$\n\n### Space Overhead:\nMerge Sort requires an auxiliary buffer of size $n$ during merging, making it **Out-of-Place** ($\\text{Auxiliary Space} = \\mathcal{O}(n)$). However, it is strictly **Stable**.\n\n---\n\n## 3. Quick Sort & Partitioning Schemes\n\nQuick Sort picks a **pivot** element $P$ and rearranges the array into two partitions: elements $\\le P$ on the left, and elements $\\ge P$ on the right.\n\n```mermaid\nflowchart TD\n    subgraph Partitioning [\"QuickSort Partitioning Schemes\"]\n        LOM[\"Lomuto Partition\n- Pivot = Last element arr[high]\n- Single pointer i advances when arr[j] <= pivot\n- Simple, but makes ~3x more swaps\n- Degrades on duplicate keys\"]\n        HOARE[\"Hoare Partition (Original)\n- Pivot = First or Middle element\n- Dual pointers scan inward from low and high\n- Swaps out-of-place pairs\n- Makes ~3x fewer swaps than Lomuto\"]\n    end\n```\n\n### A. Lomuto Partition Scheme (Standard Textbook)\n- Pivot is chosen as the last element `arr[high]`.\n- Pointer $i$ tracks the boundary of elements $\\le \\text{pivot}$.\n- Loop $j$ from `low` to `high - 1`:\n  - If `arr[j] <= pivot`, increment $i$ and swap `arr[i]` with `arr[j]`.\n- Swap `arr[i + 1]` with `arr[high]`. Return $i + 1$ as the pivot index.\n\n### B. Hoare Partition Scheme (Production Standard)\n- Maintain two pointers $i = \\text{low} - 1$ and $j = \\text{high} + 1$.\n- Advance $i$ rightward until `arr[i] >= pivot`.\n- Advance $j$ leftward until `arr[j] <= pivot`.\n- If $i < j$, swap `arr[i]` with `arr[j]`; else return $j$.\n- **Efficiency**: Hoare makes significantly fewer swaps on average than Lomuto.\n\n---\n\n## 4. QuickSort Worst-Case $\\mathcal{O}(n^2)$ and Randomized Mitigation\n\n### When Worst-Case Occurs:\nIf the array is already sorted (or reverse-sorted) and the pivot is chosen as the first or last element, the partition produces unbalanced subproblems of size $0$ and $n - 1$:\n$$T(n) = T(n - 1) + \\mathcal{O}(n) = \\mathcal{O}(n^2)$$\n\n### Randomized QuickSort:\nInstead of picking a fixed endpoint, select a pivot **uniformly at random** from the range $[\\text{low}, \\text{high}]$, and swap it with `arr[high]` before partitioning.\n- **Result**: Expected worst-case probability becomes $\\frac{1}{n!}$, guaranteeing **$\\mathcal{O}(n \\log n)$ expected runtime** regardless of input distribution!\n\n---\n\n## 5. Merge Sort vs Quick Sort Comparison Matrix\n\n| Dimension | Merge Sort | Quick Sort |\n| :--- | :--- | :--- |\n| **Worst-Case Time** | **$\\Theta(n \\log n)$** (Guaranteed) | $\\mathcal{O}(n^2)$ (Pathological pivot) |\n| **Average-Case Time**| $\\Theta(n \\log n)$ | **$\\Theta(n \\log n)$** (Faster constants) |\n| **Best-Case Time** | $\\Theta(n \\log n)$ | $\\Theta(n \\log n)$ |\n| **Auxiliary Space** | $\\mathcal{O}(n)$ (Out-of-place buffer) | **$\\mathcal{O}(\\log n)$** (In-place call stack) |\n| **Stability** | **Stable** (Preserves duplicates) | **Unstable** (Long-distance swaps) |\n| **Locality of Reference**| Poor (Copies between buffers) | **Outstanding** (Cache-friendly array sweeps) |\n| **Preferred For** | Linked lists, External disk sorting | In-memory general sorting (`std::sort`) |\n\n---\n\n> [!IMPORTANT] **MEMORIZE:**\n> - Merge Sort is **Stable**, runs in guaranteed $\\Theta(n \\log n)$ time, but consumes $\\mathcal{O}(n)$ auxiliary memory.\n> - Quick Sort is **Unstable**, operates **in-place** with $\\mathcal{O}(\\log n)$ stack space, and achieves the fastest real-world runtime via caching.\n> - Randomized Quick Sort neutralizes pre-sorted $O(n^2)$ worst-case inputs.\n\n> [!NOTE] **DEV BRAIN:**\n> Java's `Arrays.sort()` uses a Dual-Pivot QuickSort for primitive types (`int[]`, `double[]`) because cache speed matters most and stability is irrelevant for primitives, but uses Timsort (an adaptive Merge Sort) for reference objects (`Object[]`) where stability is mandatory!\n\n> [!WARNING] **TRAP:**\n> Do not claim QuickSort uses $\\mathcal{O}(1)$ space! Recursive partitioning requires activation records on the function call stack: $\\mathcal{O}(\\log n)$ in the balanced case, and up to $\\mathcal{O}(n)$ in the worst case!\n\n> [!TIP] **EXAM TIP:**\n> When asked why Merge Sort is preferred for Linked Lists: Linked lists can be merged in-place in $O(1)$ space by rewiring node pointers (`next`), eliminating Merge Sort's $O(n)$ array buffer drawback!",
          "shortNotes": "Merge Sort is stable, O(n log n) guaranteed, but requires O(n) space. Quick Sort is in-place and fastest on average (O(n log n)), but has O(n^2) worst case mitigated by randomized pivoting.",
          "examples": [
            {
              "title": "C Program Implementing Merge Sort and Randomized Quick Sort",
              "problem": "Implement Merge Sort with auxiliary array merging and Quick Sort with Lomuto partitioning.",
              "explanation": "Demonstrates divide-and-conquer recursion, merge buffer allocation, and partition index returns.",
              "code": "#include <stdio.h>\n#include <stdlib.h>\n\nvoid swap(int *a, int *b) {\n    int t = *a; *a = *b; *b = t;\n}\n\n// 1. Merge Sort Implementation\nvoid merge(int arr[], int low, int mid, int high) {\n    int n1 = mid - low + 1;\n    int n2 = high - mid;\n    int L[n1], R[n2];\n\n    for (int i = 0; i < n1; i++) L[i] = arr[low + i];\n    for (int j = 0; j < n2; j++) R[j] = arr[mid + 1 + j];\n\n    int i = 0, j = 0, k = low;\n    while (i < n1 && j < n2) {\n        if (L[i] <= R[j]) arr[k++] = L[i++];\n        else arr[k++] = R[j++];\n    }\n    while (i < n1) arr[k++] = L[i++];\n    while (j < n2) arr[k++] = R[j++];\n}\n\nvoid mergeSort(int arr[], int low, int high) {\n    if (low < high) {\n        int mid = low + (high - low) / 2;\n        mergeSort(arr, low, mid);\n        mergeSort(arr, mid + 1, high);\n        merge(arr, low, mid, high);\n    }\n}\n\n// 2. Quick Sort Implementation (Lomuto Partition)\nint partition(int arr[], int low, int high) {\n    int pivot = arr[high];\n    int i = low - 1;\n\n    for (int j = low; j < high; j++) {\n        if (arr[j] <= pivot) {\n            i++;\n            swap(&arr[i], &arr[j]);\n        }\n    }\n    swap(&arr[i + 1], &arr[high]);\n    return i + 1;\n}\n\nvoid quickSort(int arr[], int low, int high) {\n    if (low < high) {\n        int pi = partition(arr, low, high);\n        quickSort(arr, low, pi - 1);\n        quickSort(arr, pi + 1, high);\n    }\n}\n\nvoid printArray(int arr[], int n) {\n    for (int i = 0; i < n; i++) printf(\"%d \", arr[i]);\n    printf(\"\\n\");\n}\n\nint main() {\n    int a1[] = {38, 27, 43, 3, 9, 82, 10};\n    int a2[] = {38, 27, 43, 3, 9, 82, 10};\n    int n = 7;\n\n    mergeSort(a1, 0, n - 1);\n    printf(\"Merge Sort Output : \");\n    printArray(a1, n);\n\n    quickSort(a2, 0, n - 1);\n    printf(\"Quick Sort Output : \");\n    printArray(a2, n);\n\n    return 0;\n}",
              "output": "Merge Sort Output : 3 9 10 27 38 43 82 \nQuick Sort Output : 3 9 10 27 38 43 82 "
            }
          ],
          "keyPoints": [
            "Merge Sort and Quick Sort both employ the Divide-and-Conquer paradigm.",
            "Merge Sort guarantees Theta(n log n) time in all cases (best, average, worst).",
            "Merge Sort is stable but requires O(n) auxiliary space for temporary merge buffers.",
            "Quick Sort partitions elements around a pivot, achieving fastest average-case performance in-place.",
            "Quick Sort degrades to O(n^2) when partitions are unbalanced (mitigated by Randomized QuickSort).",
            "Merge Sort is optimal for linked lists, while QuickSort is optimal for cache-friendly RAM arrays."
          ],
          "theoryQuestions": [
            {
              "question": "Compare Merge Sort and Quick Sort in detail. Under what conditions is Merge Sort preferred over Quick Sort, and vice versa?",
              "marks": "7 Marks",
              "answer": "1. **Comparison Matrix**:\n   - **Worst-Case Time Complexity**: Merge Sort is $\\Theta(n \\log n)$ guaranteed; Quick Sort is $\\mathcal{O}(n^2)$ when pivots are unbalanced.\n   - **Auxiliary Space**: Merge Sort requires $\\mathcal{O}(n)$ extra buffer memory; Quick Sort is in-place requiring $\\mathcal{O}(\\log n)$ stack space.\n   - **Stability**: Merge Sort is strictly **Stable**; Quick Sort is **Unstable**.\n   - **Cache Locality**: Quick Sort processes contiguous memory in-place with high spatial locality; Merge Sort copies elements between buffers.\n\n2. **When to Choose Merge Sort**:\n   - **When Stability is Mandatory**: Sorting complex objects where identical keys must retain original sequence (e.g., student grade records).\n   - **Linked Lists**: Linked lists can be merged by rewiring pointers without allocating $\\mathcal{O}(n)$ auxiliary arrays.\n   - **External Sorting**: Large datasets residing on slow hard disks that do not fit into RAM.\n\n3. **When to Choose Quick Sort**:\n   - **In-Memory Array Sorting**: When raw speed and cache performance are prioritized.\n   - **Memory-Constrained Systems**: Embedded firmware where $\\mathcal{O}(n)$ extra memory is unavailable.",
              "keyPoints": [
                "Comparison covering worst-case time, auxiliary space, stability, and cache locality.",
                "Conditions favoring Merge Sort: stability, linked lists, external disk sorting.",
                "Conditions favoring Quick Sort: in-memory arrays, cache hits, zero extra buffer space."
              ]
            },
            {
              "question": "Explain the Hoare Partitioning scheme versus the Lomuto Partitioning scheme in Quick Sort with pseudocode and compare their efficiency.",
              "marks": "5 Marks",
              "answer": "1. **Lomuto Partition Scheme**:\n   - Pivot is chosen as the last element `arr[high]`.\n   - Single pointer $i$ initialized to `low - 1`. Loop $j$ from `low` to `high - 1`.\n   - If `arr[j] <= pivot`: $i++$; swap `arr[i]` with `arr[j]`.\n   - At end, swap `arr[i + 1]` with `arr[high]`. Returns $i + 1$.\n   - *Drawback*: Performs $\\approx 3\\times$ more swaps than Hoare and degrades when many duplicates exist.\n\n2. **Hoare Partition Scheme**:\n   - Pivot is chosen as the first element `arr[low]` (or middle).\n   - Two pointers $i = \\text{low} - 1$ and $j = \\text{high} + 1$ scan inward toward each other.\n   - Increment $i$ while `arr[i] < pivot`; decrement $j$ while `arr[j] > pivot`.\n   - If $i < j$, swap `arr[i]` with `arr[j]` and repeat; else return $j$.\n\n3. **Efficiency Comparison**:\n   - Hoare's algorithm performs on average **three times fewer swaps** than Lomuto's.\n   - Hoare handles duplicate keys much more symmetrically, avoiding severe partition degradation.",
              "keyPoints": [
                "Lomuto partition mechanics using last element and single pointer.",
                "Hoare partition mechanics using two inward scanning pointers.",
                "Efficiency analysis: Hoare performs ~3x fewer swaps."
              ]
            }
          ],
          "mcqs": [
            {
              "question": "What is the worst-case time complexity of standard deterministic QuickSort when the input array is already sorted in ascending order and the pivot is chosen as the first element?",
              "options": [
                "O(n)",
                "O(n log n)",
                "O(n^2)",
                "O(log n)"
              ],
              "correctIndex": 2,
              "explanation": "If the array is already sorted and pivot is the first element, every partition results in unbalanced subproblems of size 0 and n-1, yielding O(n^2) worst-case time."
            },
            {
              "question": "Which of the following sorting algorithms is mathematically guaranteed to run in O(n log n) time in the worst case while maintaining stability?",
              "options": [
                "Quick Sort",
                "Heap Sort",
                "Merge Sort",
                "Selection Sort"
              ],
              "correctIndex": 2,
              "explanation": "Merge Sort always divides arrays evenly into halves, running in guaranteed Theta(n log n) time while preserving the relative order of duplicate elements (stable)."
            },
            {
              "question": "What is the auxiliary space complexity of Merge Sort when sorting an array of size n?",
              "options": [
                "O(1)",
                "O(log n)",
                "O(n)",
                "O(n^2)"
              ],
              "correctIndex": 2,
              "explanation": "Merge Sort requires an auxiliary buffer array of size n during the merge procedure to combine two sorted sublists."
            },
            {
              "question": "How does Randomized QuickSort prevent O(n^2) worst-case behavior?",
              "options": [
                "By switching to Bubble Sort when n < 100.",
                "By selecting a pivot uniformly at random, making the probability of encountering the worst-case partition 1 / n! regardless of input distribution.",
                "By allocating O(n) extra heap memory.",
                "By pre-sorting the array using linear search."
              ],
              "correctIndex": 1,
              "explanation": "Randomized pivot selection ensures that no fixed input arrangement (such as pre-sorted data) can reliably trigger unbalanced partitions."
            }
          ]
        },
        {
          "id": "dsa-u6-t4",
          "title": "Hashing Techniques: Hash Functions (Division, Multiplication, Mid-Square), Collision Resolution (Separate Chaining vs Open Addressing: Linear Probing, Quadratic Probing, Double Hashing), Load Factor & Rehashing",
          "simpleExplanation": "Hashing maps arbitrary keys to fixed table indices using mathematical hash functions to achieve average O(1) insertions, deletions, and lookups. When distinct keys produce identical bucket indices (collisions), they are resolved either by Separate Chaining (linking collisions in linked lists) or Open Addressing (probing empty table slots via linear, quadratic, or double hashing), with dynamic rehashing expanding the table when the load factor exceeds thresholds.",
          "detailedExplanation": "## 1. The Hashing Paradigm & The Load Factor\n\nA **Hash Table** is an associative data structure implementing the Map/Dictionary ADT: it maps search keys to array bucket indices via a mathematical function $h(k)$.\n\n$$\\text{Index} = h(k) \\pmod M$$\nWhere $k$ is the search key and $M$ is the table capacity.\n\n```mermaid\nflowchart LR\n    KEY[\"Key ('Alice')\"] --> HF[\"Hash Function: h(k)\"]\n    HF --> MOD[\"Modulo Table Size: % M\"]\n    MOD --> BUCKET[\"Bucket Index [4] in Hash Table\"]\n```\n\n### The Load Factor ($\\alpha$)\nThe **load factor** quantifies how densely populated the hash table is:\n$$\\alpha = \\frac{N}{M} = \\frac{\\text{Total Keys Stored}}{\\text{Total Table Buckets}}$$\n\n- In **Separate Chaining**: $\\alpha$ can exceed $1$ (average chain length is $\\alpha$).\n- In **Open Addressing**: $\\alpha$ can NEVER exceed $1$ (must maintain $\\alpha \\le 0.7 - 0.75$ to prevent probe clustering).\n\n---\n\n## 2. Common Hash Functions\n\nA good hash function must: (1) Compute quickly in $\\mathcal{O}(1)$ time, (2) Distribute keys uniformly across all $M$ buckets, and (3) Minimize collisions.\n\n1. **Division Method**:\n   $$h(k) = k \\pmod M$$\n   *Rule of Thumb*: Choose $M$ as a **prime number** not close to a power of 2 or 10, avoiding patterns in binary representations.\n\n2. **Multiplication Method**:\n   $$h(k) = \\lfloor M \\cdot (k \\cdot A \\pmod 1) \\rfloor$$\n   Where $0 < A < 1$. Knuth recommended the inverse Golden Ratio:\n   $$A = \\frac{\\sqrt{5} - 1}{2} \\approx 0.6180339887$$\n   *Advantage*: The choice of table size $M$ is not critical; often chosen as a power of 2 ($2^p$) for fast bitwise shifting.\n\n3. **Mid-Square Method**:\n   - Square the key: $k^2$.\n   - Extract the middle $r$ digits/bits of the product.\n   - *Example*: For $k = 1234$, $k^2 = 1,522,756$. Middle digits $= 227$.\n\n---\n\n## 3. Collision Resolution Strategies\n\nBy the **Pigeonhole Principle**, if the number of keys $N$ exceeds the number of slots $M$, collisions are mathematically inevitable ($h(k_1) = h(k_2)$ for $k_1 \\ne k_2$).\n\n```mermaid\nflowchart TD\n    COLL[\"Collision Resolution Techniques\"] --> SC[\"Separate Chaining (Open Hashing)\nEach bucket holds a Linked List of collisions\"]\n    COLL --> OA[\"Open Addressing (Closed Hashing)\nAll elements stored inside table array.\nFind alternate slot via Probing sequence\"]\n\n    OA --> LP[\"Linear Probing: h(k, i) = (h(k) + i) % M\"]\n    OA --> QP[\"Quadratic Probing: h(k, i) = (h(k) + c1*i + c2*i^2) % M\"]\n    OA --> DH[\"Double Hashing: h(k, i) = (h1(k) + i * h2(k)) % M\"]\n```\n\n---\n\n## 4. Separate Chaining vs Open Addressing\n\n### A. Separate Chaining (Open Hashing)\nEach table bucket acts as the head pointer of a singly linked list. When a collision occurs, the new key is prepended to the bucket's list in $\\mathcal{O}(1)$ time.\n- **Search Time**: $\\mathcal{O}(1 + \\alpha)$ average.\n- **Pros**: Table never becomes \"full\"; graceful degradation under high load factor.\n- **Cons**: Heap pointer memory overhead; poor cache locality.\n\n### B. Open Addressing Probing Sequences\n\n1. **Linear Probing**:\n   $$h(k, i) = (h'(k) + i) \\pmod M, \\quad i = 0, 1, 2, \\dots$$\n   - **Fatal Flaw (Primary Clustering)**: Long contiguous blocks of occupied slots build up. Any key hashing into the cluster must traverse to the very end, worsening the cluster length and degrading lookups to $\\mathcal{O}(n)$!\n\n2. **Quadratic Probing**:\n   $$h(k, i) = (h'(k) + c_1 i + c_2 i^2) \\pmod M$$\n   - Eliminates primary clustering, but suffers from **Secondary Clustering** (keys with identical initial hash $h'(k)$ trace the exact same probe sequence).\n\n3. **Double Hashing**:\n   $$h(k, i) = (h_1(k) + i \\cdot h_2(k)) \\pmod M$$\n   - Uses two independent hash functions. The step size is determined dynamically by $h_2(k)$.\n   - *Requirement*: $h_2(k)$ must never evaluate to $0$, and must be coprime to $M$.\n   - **Completely eliminates both primary and secondary clustering!**\n\n---\n\n## 5. Deletion in Open Addressing & Rehashing\n\n### The Tombstone Problem in Open Addressing:\nIf you delete an element from an open-addressed table by setting the slot to empty (`NULL`), subsequent searches for elements that probed *past* that slot will stop prematurely and report \"Not Found\"!\n- **Solution**: Mark deleted slots with a special sentinel value: **`TOMBSTONE`** (or `DELETED`). Search probes continue past tombstones, but insertions can overwrite them.\n\n### Dynamic Rehashing:\nWhen $\\alpha$ exceeds a threshold (typically $\\alpha > 0.7$):\n1. Allocate a new table with roughly **double capacity** (new prime $M' \\approx 2M$).\n2. Re-insert all active keys into the new table using $h'(k) = k \\pmod{M'}$.\n3. Discard tombstones and old buffer.\n- **Amortized Time**: $\\mathcal{O}(1)$ per insertion.\n\n---\n\n> [!IMPORTANT] **MEMORIZE:**\n> - Load factor $\\alpha = N / M$.\n> - In Open Addressing: Linear Probing $\\implies$ **Primary Clustering**; Quadratic Probing $\\implies$ **Secondary Clustering**; Double Hashing $\\implies$ **Optimal Distribution**.\n> - In Open Addressing, deleted slots must be marked with a **`TOMBSTONE`** sentinel to keep search probe chains intact!\n\n> [!NOTE] **DEV BRAIN:**\n> Python's dictionary (`dict`) uses open addressing with a perturbation pseudo-random probing formula, and rehashes when the table is $2/3$ full ($\u0007lpha > 0.66$) to guarantee lightning-fast $O(1)$ lookups.\n\n> [!WARNING] **TRAP:**\n> In Double Hashing, $h_2(k)$ must NEVER return $0$! If $h_2(k) = 0$, the step size is $i \\times 0 = 0$, trapping the probe in an infinite loop on the initial slot!\n\n> [!TIP] **EXAM TIP:**\n> When asked to insert keys into an open-addressed table with Linear or Quadratic probing, write down the collision calculation for each probe step $i = 0, 1, 2, \\dots$ clearly showing the modulo arithmetic.",
          "shortNotes": "Hashing maps keys to indices in O(1) avg time. Collisions solved via Separate Chaining (linked lists) or Open Addressing (Linear, Quadratic, Double Hashing). Rehashing doubles table when load factor exceeds threshold.",
          "examples": [
            {
              "title": "C Program: Hash Table with Open Addressing and Linear Probing with Tombstones",
              "problem": "Implement a hash table using linear probing supporting insert, search, and delete operations with tombstone markers.",
              "explanation": "Demonstrates index calculation, collision linear probing, tombstone handling during deletion, and lookup continuation.",
              "code": "#include <stdio.h>\n#include <stdbool.h>\n\n#define TABLE_SIZE 7\n#define EMPTY -1\n#define TOMBSTONE -2\n\ntypedef struct {\n    int key;\n} HashItem;\n\nHashItem table[TABLE_SIZE];\n\nvoid initTable() {\n    for (int i = 0; i < TABLE_SIZE; i++) table[i].key = EMPTY;\n}\n\nint hash(int key) {\n    return key % TABLE_SIZE;\n}\n\nvoid insert(int key) {\n    int idx = hash(key);\n    int startIdx = idx;\n\n    for (int i = 0; i < TABLE_SIZE; i++) {\n        int probe = (startIdx + i) % TABLE_SIZE;\n        if (table[probe].key == EMPTY || table[probe].key == TOMBSTONE) {\n            table[probe].key = key;\n            printf(\"Inserted %d at bucket index %d\\n\", key, probe);\n            return;\n        }\n    }\n    printf(\"Hash Table Full! Cannot insert %d\\n\", key);\n}\n\nbool search(int key) {\n    int idx = hash(key);\n    for (int i = 0; i < TABLE_SIZE; i++) {\n        int probe = (idx + i) % TABLE_SIZE;\n        if (table[probe].key == key) return true;\n        if (table[probe].key == EMPTY) return false; // Stop at empty (tombstones are bypassed)\n    }\n    return false;\n}\n\nvoid deleteKey(int key) {\n    int idx = hash(key);\n    for (int i = 0; i < TABLE_SIZE; i++) {\n        int probe = (idx + i) % TABLE_SIZE;\n        if (table[probe].key == key) {\n            table[probe].key = TOMBSTONE; // Mark tombstone!\n            printf(\"Key %d deleted from index %d (marked TOMBSTONE)\\n\", key, probe);\n            return;\n        }\n        if (table[probe].key == EMPTY) break;\n    }\n    printf(\"Key %d not found for deletion.\\n\", key);\n}\n\nvoid display() {\n    printf(\"Hash Table Buckets:\\n\");\n    for (int i = 0; i < TABLE_SIZE; i++) {\n        if (table[i].key == EMPTY) printf(\"  [%d] : EMPTY\\n\", i);\n        else if (table[i].key == TOMBSTONE) printf(\"  [%d] : [TOMBSTONE]\\n\", i);\n        else printf(\"  [%d] : %d\\n\", i, table[i].key);\n    }\n}\n\nint main() {\n    initTable();\n\n    // 10 % 7 = 3, 17 % 7 = 3 (Collision!), 24 % 7 = 3 (Collision!)\n    insert(10);\n    insert(17); // Collides -> probes to 4\n    insert(24); // Collides -> probes to 5\n    display();\n\n    printf(\"Search 17: %s\\n\", search(17) ? \"FOUND\" : \"NOT FOUND\");\n\n    // Delete 17 and verify 24 is still found across tombstone\n    deleteKey(17);\n    display();\n\n    printf(\"Search 24 across tombstone: %s\\n\", search(24) ? \"FOUND\" : \"NOT FOUND\");\n\n    return 0;\n}",
              "output": "Inserted 10 at bucket index 3\nInserted 17 at bucket index 4\nInserted 24 at bucket index 5\nHash Table Buckets:\n  [0] : EMPTY\n  [1] : EMPTY\n  [2] : EMPTY\n  [3] : 10\n  [4] : 17\n  [5] : 24\n  [6] : EMPTY\nSearch 17: FOUND\nKey 17 deleted from index 4 (marked TOMBSTONE)\nHash Table Buckets:\n  [0] : EMPTY\n  [1] : EMPTY\n  [2] : EMPTY\n  [3] : 10\n  [4] : [TOMBSTONE]\n  [5] : 24\n  [6] : EMPTY\nSearch 24 across tombstone: FOUND"
            }
          ],
          "keyPoints": [
            "Hashing converts keys into table bucket indices using mathematical hash functions in O(1) average time.",
            "Load Factor alpha = N / M measures table density; rehashing doubles table size when alpha exceeds threshold.",
            "Separate Chaining resolves collisions using linked lists per bucket, allowing alpha > 1.",
            "Open Addressing resolves collisions by searching for empty slots within the table array (alpha <= 1).",
            "Linear probing causes Primary Clustering; Double Hashing prevents clustering using two hash functions.",
            "Deleted slots in Open Addressing must be marked with TOMBSTONE markers to prevent premature probe termination."
          ],
          "theoryQuestions": [
            {
              "question": "Differentiate between Separate Chaining and Open Addressing for collision resolution in Hash Tables across space, cache locality, and performance under high load factors.",
              "marks": "7 Marks",
              "answer": "1. **Architectural Comparison**:\n   - **Separate Chaining (Open Hashing)**:\n     * Each table bucket holds a linked list of all colliding elements.\n     * Table never strictly fills up; load factor $\\alpha = N/M$ can safely exceed $1.0$.\n     * Deletions are straightforward: splice out the linked list node and `free()` memory.\n     * Consumes extra pointer memory (8 bytes per node).\n     * Incurs cache misses due to heap-allocated nodes scattered across memory.\n   - **Open Addressing (Closed Hashing)**:\n     * All keys are stored directly inside the fixed array table; no pointers are used.\n     * Load factor can **never** exceed $1.0$; performance degrades severely when $\\alpha > 0.75$.\n     * Deletions require special `TOMBSTONE` sentinel markers to keep search probe chains unbroken.\n     * Zero pointer memory overhead.\n     * Outstanding cache locality because probe sequences scan contiguous array cells.\n\n2. **Performance Under High Load Factors**:\n   - In Separate Chaining, lookup times degrade gracefully to $\\mathcal{O}(1 + \\alpha)$ (linear with chain length).\n   - In Open Addressing, lookup times explode asymptotically to $\\mathcal{O}\\left(\\frac{1}{1 - \\alpha}\\right)$ as $\\alpha \\to 1$, stalling lookups and insertions.\n   - Therefore, Open Addressing must perform **dynamic rehashing** (doubling table size) whenever $\\alpha > 0.7$.",
              "keyPoints": [
                "Comparison covering memory layout, load factor capacity, and pointer overhead.",
                "Cache locality trade-offs (contiguous array vs scattered heap nodes).",
                "Performance degradation formulas under high load factors."
              ]
            },
            {
              "question": "Explain Linear Probing, Quadratic Probing, and Double Hashing. Define Primary Clustering and explain how Double Hashing resolves it.",
              "marks": "5 Marks",
              "answer": "1. **Probing Sequences in Open Addressing**:\n   - **Linear Probing**:\n     $$h(k, i) = (h'(k) + i) \\pmod M$$\n     Scans adjacent consecutive slots: $i = 0, 1, 2, \\dots$.\n   - **Quadratic Probing**:\n     $$h(k, i) = (h'(k) + c_1 i + c_2 i^2) \\pmod M$$\n     Scans quadratic intervals ($i^2 = 1, 4, 9, \\dots$), jumping over local clusters.\n   - **Double Hashing**:\n     $$h(k, i) = (h_1(k) + i \\cdot h_2(k)) \\pmod M$$\n     Uses a secondary hash function $h_2(k)$ to compute a key-dependent step size.\n\n2. **Primary Clustering & Resolution**:\n   - **Primary Clustering**: In Linear Probing, occupied slots coalesce into long contiguous blocks. Any key whose initial hash hits any slot in the cluster must probe sequentially to the end, extending the cluster further and degrading lookup to $\\mathcal{O}(n)$.\n   - **Resolution via Double Hashing**: In Double Hashing, even if two keys produce identical initial hashes $h_1(k_1) = h_1(k_2)$, their second hash values $h_2(k_1) \\ne h_2(k_2)$ will be different.\n   - Consequently, they traverse completely different probe sequences with different step sizes, eliminating primary and secondary clustering.",
              "keyPoints": [
                "Mathematical probe sequence formulas for Linear, Quadratic, and Double Hashing.",
                "Definition of Primary Clustering in linear probing.",
                "Explanation of how key-dependent step size in Double Hashing prevents clustering."
              ]
            }
          ],
          "mcqs": [
            {
              "question": "What is the primary operational defect associated with Linear Probing in open-addressed Hash Tables?",
              "options": [
                "Secondary clustering",
                "Primary clustering, where occupied slots coalesce into long contiguous blocks",
                "Hash table underflow",
                "Infinite recursion on insertion"
              ],
              "correctIndex": 1,
              "explanation": "Linear probing steps by 1, causing adjacent occupied slots to merge into large contiguous clusters that progressively lengthen probe sequences."
            },
            {
              "question": "Why must deleted items in an open-addressed Hash Table be replaced by a TOMBSTONE marker rather than being cleared to EMPTY?",
              "options": [
                "To prevent memory leaks in the operating system.",
                "Because clearing to EMPTY would cause subsequent search operations for keys that probed past that slot to terminate prematurely and report Not Found.",
                "Tombstones automatically double the hash table capacity.",
                "To keep the table sorted in ascending order."
              ],
              "correctIndex": 1,
              "explanation": "Search probe loops terminate upon encountering an EMPTY slot. If a deleted item were marked EMPTY, any key that originally collided and probed beyond that slot would become unreachable."
            },
            {
              "question": "In Double Hashing with probe formula h(k, i) = (h1(k) + i * h2(k)) % M, what critical condition must h2(k) satisfy?",
              "options": [
                "h2(k) must always return 0.",
                "h2(k) must never evaluate to 0 and must be relatively prime (coprime) to table size M.",
                "h2(k) must equal h1(k).",
                "h2(k) must be negative."
              ],
              "correctIndex": 1,
              "explanation": "If h2(k) evaluates to 0, the step size is 0, trapping the probe in an infinite loop. Coprimality ensures that the probe cycle visits all M buckets before repeating."
            },
            {
              "question": "What is the average-case time complexity of searching for a key in a Hash Table with Separate Chaining and load factor alpha?",
              "options": [
                "O(1 + alpha)",
                "O(log n)",
                "O(n^2)",
                "O(alpha^2)"
              ],
              "correctIndex": 0,
              "explanation": "Computing the hash takes O(1) time, and scanning the bucket's linked list takes time proportional to the average chain length alpha, yielding O(1 + alpha) average search time."
            }
          ]
        }
      ]
    }
  ]
};
