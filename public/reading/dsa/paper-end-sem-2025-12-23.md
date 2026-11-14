> **Data Structures and Algorithms (C2310C5) · End-semester examination, Winter 2025 · Tuesday 23 December 2025 · 100 marks · 10:10 am – 1:10 pm**
> ITM SLS Baroda University · B.Tech Semester III (Regular). Question 1 is compulsory. (The date is partly hidden in the scan; Tuesday matches 23 December 2025.)
> Questions transcribed from the original paper. Solutions are written by CampusLoop; check them against your class notes.

# Q1. Multiple choice questions [20]

**1. Which notation expresses the upper bound of an algorithm's complexity?** A) Big Omega · B) Big Theta · C) Big O · D) Little Omega
**Answer: (C) Big O.**

**2. What type of data structure is a stack?** A) Non-linear · B) Linear · C) Hierarchical · D) Graph-based
**Answer: (B) Linear.**

**3. Which of the following is a non-primitive data type?** A) Integer · B) Float · C) Array · D) Character
**Answer: (C) Array.**

**4. Which notation represents average-case time complexity?** A) Big O · B) Big Omega · C) Big Theta · D) Sigma
**Answer: (C) Big Theta** (the tight bound, commonly used for the average case; O is the upper/worst-case bound and Ω the lower/best-case bound).

**5. Recursion is a process in which a function:** A) Calls another function · B) Calls itself · C) Returns a value only · D) Uses a loop
**Answer: (B).**

**6. Which data structure follows LIFO?** A) Queue · B) Array · C) Stack · D) Linked List
**Answer: (C) Stack.**

**7. Which data structure follows FIFO?** A) Stack · B) Queue · C) BST · D) Graph
**Answer: (B) Queue.**

**8. Which of the following is not a queue variant?** A) Circular queue · B) Priority queue · C) Deque · D) Hybrid queue
**Answer: (D) Hybrid queue.**

**9. What is the time complexity of binary search?** A) O(n) · B) O(log n) · C) O(n²) · D) O(1)
**Answer: (B) O(log n).**

**10. Which of the following is a linear data structure?** A) Tree · B) Graph · C) Stack · D) Binary Search Tree
**Answer: (C) Stack.**

**11. Which of the following is a non-linear data structure?** A) Array · B) Stack · C) Queue · D) Tree
**Answer: (D) Tree.**

**12. A binary search tree (BST):** A) Has no ordering rules · B) Always balanced · C) Left < Root < Right · D) Only stores integers
**Answer: (C).**

**13. DFS uses which data structure internally?** A) Queue · B) Stack · C) Array · D) Hash table
**Answer: (B) Stack** (explicit or via recursion).

**14. BFS uses which data structure?** A) Queue · B) Stack · C) Tree · D) Graph
**Answer: (A) Queue.**

**15. Which sorting algorithm repeatedly swaps adjacent elements?** A) Selection · B) Bubble · C) Merge · D) Quick
**Answer: (B) Bubble sort.**

**16. An adjacency matrix of a graph is stored in:** A) 1D array · B) Linked list · C) 2D array · D) Tree
**Answer: (C) 2D array.**

**17. Which notation describes the lower bound of algorithm complexity?** A) Big O · B) Big Theta · C) Big Sigma · D) Big Omega
**Answer: (D) Big Omega.**

**18. Which application commonly uses a queue?** A) Undo operations · B) Recursion · C) CPU scheduling · D) Expression evaluation
**Answer: (C) CPU scheduling.** (Undo, recursion and expression evaluation use stacks.)

**19. A linked list is preferred over arrays when:** A) Random access is required · B) Memory is limited and dynamic allocation is needed · C) Data is always sorted · D) Data size is fixed
**Answer: (B).**

**20. Which of the following is essential for a recursive function to avoid infinite calls?** A) Function name must be same · B) Function must return a value · C) Base condition must be present · D) Loop must be included
**Answer: (C) Base condition.**

# Q2. Answer any FOUR (out of six) [20]

## Q2.1 Define Abstract Data Type (ADT) with example.

An ADT defines a data type by its values and operations only, not its implementation. Example: Stack ADT (push, pop, peek, isEmpty; LIFO), which can be implemented with an array or a linked list. Full answer: [DSA CET-1 2025, Q2.3](/library/dsa/paper-cet-1-2025-08-25#q2-3-what-is-an-abstract-data-type-adt-how-is-it-different-from-a-data-structure).

## Q2.2 Explain Big O, Big Omega and Big Theta with one example each.

O = upper bound (f ≤ c·g), Ω = lower bound (f ≥ c·g), Θ = tight bound (c₁g ≤ f ≤ c₂g), for n ≥ n₀. Example: 3n + 2 is O(n) (c = 4, n₀ = 2), Ω(n) (c = 3), Θ(n). Full answer with graphs: [DSA CET-1 2025, Q2.2](/library/dsa/paper-cet-1-2025-08-25#q2-2-explain-big-o-big-omega-and-big-theta-with-examples-and-graphs).

## Q2.3 Pseudocode to find the maximum of three numbers.

```
Procedure MAX3(A, B, C)
1. MAX ← A
2. If B > MAX then MAX ← B
3. If C > MAX then MAX ← C
4. Write MAX; Return
```
Example: MAX3(12, 45, 7) → 45. Time O(1).

## Q2.4 What is a stack? List its applications.

A **stack** is a linear data structure where insertion (**push**) and deletion (**pop**) happen at one end, the **top**: Last In, First Out (LIFO). Operations: push, pop, peek/top, isEmpty, isFull, all O(1).

**Applications:** function calls and recursion (call stack); expression conversion (infix → postfix/prefix) and postfix evaluation; parenthesis matching; undo/redo in editors; browser back button; backtracking (maze, DFS); reversing a string.

## Q2.5 Differentiate between primitive and non-primitive data types.

| Primitive | Non-primitive |
|---|---|
| Built into the language | Derived/user-defined from primitives |
| Hold a single value | Hold a collection of values |
| int, float, char, double, boolean | Array, structure, linked list, stack, queue, tree, graph |
| Fixed size | Size can vary |
| Operated on directly by machine instructions | Need algorithms to operate on |

Non-primitive types are further split into **linear** (array, stack, queue, list) and **non-linear** (tree, graph).

## Q2.6 Write operations on a queue.

Queue (FIFO) with array `Q[N]`, `FRONT`, `REAR` (initially −1):
```
Procedure ENQUEUE(Q, N, FRONT, REAR, X)
1. If REAR = N − 1 then Write "OVERFLOW"; Return
2. If FRONT = −1 then FRONT ← 0
3. REAR ← REAR + 1; Q[REAR] ← X

Function DEQUEUE(Q, FRONT, REAR)
1. If FRONT = −1 or FRONT > REAR then Write "UNDERFLOW"; Return
2. Y ← Q[FRONT]; FRONT ← FRONT + 1
3. Return Y
```
Other operations: **peek/front** (return Q[FRONT]), **isEmpty** (FRONT = −1 or FRONT > REAR), **isFull** (REAR = N − 1), **display** (print Q[FRONT…REAR]).

# Q3. Answer any FOUR (out of six) [20]

## Q3.1 Explain infix, prefix and postfix expressions.

- **Infix:** operator between operands: `A + B * C`. Natural for people, but needs precedence rules and brackets.
- **Prefix (Polish):** operator before operands: `+ A * B C`.
- **Postfix (reverse Polish):** operator after operands: `A B C * +`.

Prefix and postfix need **no brackets and no precedence rules**; postfix is evaluated with a single stack scan, which is why compilers convert infix to postfix. Precedence used in conversion: `^` (right-associative) > `* /` > `+ −`. Example: `(A + B) * C` → prefix `* + A B C`, postfix `A B + C *`.

## Q3.2 Program to implement a stack using arrays.

```c
#include <stdio.h>
#define MAX 5
int stack[MAX], top = -1;

void push(int x) {
    if (top == MAX - 1) { printf("Stack overflow\n"); return; }
    stack[++top] = x;
}
int pop(void) {
    if (top == -1) { printf("Stack underflow\n"); return -1; }
    return stack[top--];
}
int peek(void) { return top == -1 ? -1 : stack[top]; }
void display(void) {
    for (int i = top; i >= 0; i--) printf("%d ", stack[i]);
    printf("\n");
}
int main(void) {
    push(10); push(20); push(30);
    display();                         /* 30 20 10 */
    printf("Popped %d\n", pop());      /* 30 */
    printf("Top is %d\n", peek());     /* 20 */
    return 0;
}
```

## Q3.3 Program to evaluate a postfix expression using a stack.

Push operands; on an operator pop two values (second popped is the left operand), apply it and push the result. Full C program: [DSA CET-2 2025, Q3.1](/library/dsa/paper-cet-2-2025-10-10#q3-1-program-to-evaluate-a-postfix-expression-using-a-stack). Example: `5 3 + 2 *` → 8 × 2 = 16.

## Q3.4 Program to implement a queue using arrays.

```c
#include <stdio.h>
#define MAX 5
int q[MAX], front = -1, rear = -1;

void enqueue(int x) {
    if (rear == MAX - 1) { printf("Queue overflow\n"); return; }
    if (front == -1) front = 0;
    q[++rear] = x;
}
int dequeue(void) {
    if (front == -1 || front > rear) { printf("Queue underflow\n"); return -1; }
    return q[front++];
}
void display(void) {
    for (int i = front; i != -1 && i <= rear; i++) printf("%d ", q[i]);
    printf("\n");
}
int main(void) {
    enqueue(10); enqueue(20); enqueue(30);
    display();                           /* 10 20 30 */
    printf("Deleted %d\n", dequeue());   /* 10 */
    display();                           /* 20 30 */
    return 0;
}
```

## Q3.5 Difference between a simple queue and a circular queue.

| Simple (linear) queue | Circular queue |
|---|---|
| REAR moves only forward; full when REAR = N − 1 | REAR wraps around: REAR = (REAR + 1) mod N |
| Freed slots at the front cannot be reused | Freed slots are reused |
| May report "full" while space is empty at the front | Uses all N positions |
| Full: REAR = N − 1 | Full: (REAR + 1) mod N = FRONT |
| Simpler | Slightly more logic (mod arithmetic) |

## Q3.6 Program to implement a circular queue.

```c
#include <stdio.h>
#define N 5
int cq[N], front = -1, rear = -1;

void enqueue(int x) {
    if ((rear + 1) % N == front) { printf("Queue full\n"); return; }
    if (front == -1) front = 0;
    rear = (rear + 1) % N;
    cq[rear] = x;
}
int dequeue(void) {
    if (front == -1) { printf("Queue empty\n"); return -1; }
    int x = cq[front];
    if (front == rear) front = rear = -1;      /* last element removed */
    else front = (front + 1) % N;
    return x;
}
void display(void) {
    if (front == -1) { printf("Empty\n"); return; }
    for (int i = front; ; i = (i + 1) % N) {
        printf("%d ", cq[i]);
        if (i == rear) break;
    }
    printf("\n");
}
int main(void) {
    for (int i = 1; i <= 5; i++) enqueue(i * 10);   /* 10..50, now full */
    dequeue(); dequeue();                            /* remove 10, 20 */
    enqueue(60); enqueue(70);                        /* reuse freed slots */
    display();                                       /* 30 40 50 60 70 */
    return 0;
}
```

# Q4. Answer any FOUR (out of six) [20]

## Q4.1 What is a tree? Define root and leaf node.

A **tree** is a non-linear, hierarchical data structure: a finite set of nodes with one special node, the **root**, and the remaining nodes partitioned into disjoint subtrees. There is exactly one path between any two nodes and no cycles.
- **Root node:** the topmost node, with no parent.
- **Leaf (terminal) node:** a node with no children (degree 0).
Other terms: parent, child, siblings, internal node, degree, level, height/depth, path, ancestor/descendant.

## Q4.2 Inorder, preorder and postorder traversal.

- **Preorder (N L R):** visit node, then left subtree, then right subtree.
- **Inorder (L N R):** left subtree, node, right subtree; gives **sorted order** for a BST.
- **Postorder (L R N):** left, right, then node; used to delete a tree or evaluate expression trees.

```c
void inorder(struct node *t)   { if (t) { inorder(t->left);  printf("%d ", t->data); inorder(t->right); } }
void preorder(struct node *t)  { if (t) { printf("%d ", t->data); preorder(t->left); preorder(t->right); } }
void postorder(struct node *t) { if (t) { postorder(t->left); postorder(t->right); printf("%d ", t->data); } }
```
Worked example on a 12-node tree: [DSA CET-2 2025, Q3.4](/library/dsa/paper-cet-2-2025-10-10#q3-4-traversals-of-the-given-binary-tree).

## Q4.3 Program to implement a binary search tree (insert, search).

```c
#include <stdio.h>
#include <stdlib.h>
struct node { int data; struct node *left, *right; };

struct node *insert(struct node *root, int x) {
    if (root == NULL) {
        struct node *n = malloc(sizeof *n);
        n->data = x; n->left = n->right = NULL;
        return n;
    }
    if (x < root->data) root->left = insert(root->left, x);
    else if (x > root->data) root->right = insert(root->right, x);
    return root;                       /* duplicates are ignored */
}
int search(struct node *root, int key) {
    while (root != NULL) {
        if (key == root->data) return 1;
        root = (key < root->data) ? root->left : root->right;
    }
    return 0;
}
void inorder(struct node *t) { if (t) { inorder(t->left); printf("%d ", t->data); inorder(t->right); } }

int main(void) {
    struct node *root = NULL;
    int a[] = {50, 30, 70, 20, 40, 60, 80};
    for (int i = 0; i < 7; i++) root = insert(root, a[i]);
    inorder(root);                                          /* 20 30 40 50 60 70 80 */
    printf("\n40 %s\n", search(root, 40) ? "found" : "not found");
    return 0;
}
```
Average O(log n) per operation; worst case O(n) for a skewed tree.

## Q4.4 Program to count the total leaf nodes in a binary tree.

```c
int countLeaves(struct node *t) {
    if (t == NULL) return 0;
    if (t->left == NULL && t->right == NULL) return 1;   /* leaf */
    return countLeaves(t->left) + countLeaves(t->right);
}
```
For the BST built above (50, 30, 70, 20, 40, 60, 80) the leaves are 20, 40, 60, 80 → `countLeaves(root)` returns **4**. Time O(n).

## Q4.5 What is a threaded binary tree?

In a binary tree with n nodes there are n + 1 NULL links. A **threaded binary tree** replaces them with **threads**: a NULL right link points to the node's **inorder successor**, and a NULL left link points to its **inorder predecessor**. Each node has two flag bits (`lthread`, `rthread`) to tell a thread from a real child link. Usually a header (dummy) node is used for the first and last threads.
**Advantage:** inorder traversal **without recursion or a stack**, in O(n) time and O(1) extra space; finding successor/predecessor is fast.
Types: one-way (only right threads) and two-way (both).

## Q4.6 Explain a binary search tree with its operations.

A **BST** is a binary tree where for every node, all keys in the left subtree are smaller and all keys in the right subtree are larger.
- **Search:** compare with the root; go left if smaller, right if larger, until found or NULL.
- **Insert:** search for the key; insert the new node where the search ends (at a NULL link).
- **Delete:** (1) leaf: remove it; (2) one child: link the child to the parent; (3) two children: replace the key with its **inorder successor** (smallest in the right subtree) or predecessor, then delete that node.
- **Traversal:** inorder gives sorted output. **Min/max:** leftmost/rightmost node.
Complexity: O(h): O(log n) when balanced, O(n) when skewed (e.g. inserting sorted data). Example: insert 50, 30, 70, 20, 40, 60, 80 → balanced tree of height 2.

# Q5. Answer any FOUR (out of six) [20]

## Q5.1 Explain linear search and binary search with example.

**Linear search:** check elements one by one from the start. Works on unsorted data. Best O(1), worst/average O(n).
Example: find 23 in [10, 45, 23, 8] → compare 10, 45, 23 → found at index 2 after 3 comparisons.

**Binary search:** on a **sorted** array, compare with the middle element and discard half each time.
```
LOW ← 0, HIGH ← N − 1
Repeat while LOW ≤ HIGH:
    MID ← ⌊(LOW + HIGH)/2⌋
    If A[MID] = KEY: return MID
    If KEY < A[MID]: HIGH ← MID − 1  else LOW ← MID + 1
Return −1
```
Example: A = [5, 12, 18, 23, 37, 45, 56], key 37: MID = 3 (23) → go right, LOW = 4; MID = 5 (45) → go left, HIGH = 4; MID = 4 (37) → found in 3 comparisons. O(log n).

## Q5.2 Program to implement bubble sort.

```c
#include <stdio.h>
void bubbleSort(int a[], int n) {
    for (int pass = 0; pass < n - 1; pass++) {
        int swapped = 0;
        for (int j = 0; j < n - 1 - pass; j++) {
            if (a[j] > a[j + 1]) {
                int t = a[j]; a[j] = a[j + 1]; a[j + 1] = t;
                swapped = 1;
            }
        }
        if (!swapped) break;          /* already sorted: best case O(n) */
    }
}
int main(void) {
    int a[] = {64, 34, 25, 12, 22, 11, 90}, n = 7;
    bubbleSort(a, n);
    for (int i = 0; i < n; i++) printf("%d ", a[i]);   /* 11 12 22 25 34 64 90 */
    return 0;
}
```
Worst/average O(n²), best O(n) with the swap flag, O(1) extra space, stable.

## Q5.3 Explain quick sort in simple words.

Quick sort is **divide and conquer**:
1. Pick a **pivot** (e.g. the first or last element).
2. **Partition:** rearrange so that elements smaller than the pivot are on its left and larger ones on its right; the pivot is now in its final sorted position.
3. **Recursively** quick-sort the left part and the right part.

Example: [35, 10, 50, 5, 40] with pivot 35 → partition → [5, 10] **35** [50, 40] → sort sides → [5, 10, 35, 40, 50].
Complexity: average/best **O(n log n)**; worst **O(n²)** when the pivot is always the smallest or largest (e.g. already sorted input with first-element pivot). In place (O(log n) stack), not stable. Usually fastest in practice.

## Q5.4 Convert infix to postfix using a stack: ((A+B)*(C+D)/(E−F))+G

**Postfix: `AB+CD+*EF-/G+`**. Full symbol-by-symbol stack table: [DSA CET-2 2025, Q2.4](/library/dsa/paper-cet-2-2025-10-10#q2-4-convert-infix-to-postfix-using-a-stack-a-b-c-d-e-f-g).

## Q5.5 Define algorithm efficiency and compare searching techniques.

**Algorithm efficiency** measures the resources an algorithm uses as the input size n grows: **time complexity** (number of basic operations) and **space complexity** (extra memory), usually expressed with asymptotic notation for best, average and worst cases.

| | Linear search | Binary search | Hashing |
|---|---|---|---|
| Data requirement | Any order | Sorted array | Hash table |
| Best case | O(1) | O(1) | O(1) |
| Average / worst | O(n) / O(n) | O(log n) / O(log n) | O(1) / O(n) with collisions |
| Works on linked lists | Yes | Not efficiently | n/a |
| Simplicity | Simplest | Needs sorting | Needs hash function and collision handling |

## Q5.6 Short notes on selection sort and insertion sort.

**Selection sort:** for each position i, find the **minimum** of the unsorted part and swap it into position i. Passes: n − 1; comparisons always n(n−1)/2 → **O(n²)** in all cases; at most n − 1 swaps; not stable. Example: [29, 10, 14, 37, 13] → [10, 29, 14, 37, 13] → [10, 13, 14, 37, 29] → [10, 13, 14, 37, 29] → [10, 13, 14, 29, 37].

**Insertion sort:** take elements one by one and **insert** each into its correct place in the sorted left part, shifting larger elements right (like sorting playing cards). Best **O(n)** (already sorted), worst/average **O(n²)**; stable; in place; good for small or nearly sorted data. Example: [12, 11, 13, 5, 6] → [11, 12, 13, 5, 6] → [11, 12, 13, 5, 6] → [5, 11, 12, 13, 6] → [5, 6, 11, 12, 13].
