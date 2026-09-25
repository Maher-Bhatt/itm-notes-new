# Unit 4: Trees & Balanced Search Trees
# Topics:
# dsa-u4-t1: Tree Terminology & Properties: Root, Leaf, Height, Depth, Degree, Strict vs Complete vs Full vs Perfect Binary Trees
# dsa-u4-t2: Binary Tree Traversals: Depth-First (Inorder, Preorder, Postorder - Recursive & Iterative) and Breadth-First (Level-Order) Traversals
# dsa-u4-t3: Binary Search Tree (BST): BST Invariant, Search, Insertion, Deletion (3 Cases: Leaf, 1 Child, 2 Children with Inorder Predecessor/Successor)
# dsa-u4-t4: Self-Balancing AVL Trees: Balance Factor (-1, 0, +1), Rotations (LL, RR, LR, RL) with Step-by-Step balance diagrams & Re-balancing on Insert/Delete
# dsa-u4-t5: Binary Heaps: Min-Heap & Max-Heap Invariants, Array-based Representation, Heapify Operation (O(n) bottom-up construction), and Heap Sort

unit4 = {
    "id": "dsa-u4",
    "title": "Unit 4: Trees & Balanced Search Trees",
    "description": "Hierarchical tree data structures, binary tree classifications, DFS and BFS traversals, Binary Search Tree (BST) operations, self-balancing AVL trees with rotational rebalancing (LL, RR, LR, RL), and binary heaps with O(n) heap construction and Heap Sort.",
    "topics": [
        {
            "id": "dsa-u4-t1",
            "title": "Tree Terminology & Properties: Root, Leaf, Height, Depth, Degree, Strict vs Complete vs Full vs Perfect Binary Trees",
            "simpleExplanation": "A tree is a hierarchical, non-linear data structure of connected nodes rooted at a single top node without cycles. Binary trees restrict each node to at most two children and are classified into distinct structural categories: Full (Strict), Complete (compact level-fill from left), and Perfect (all leaves at same depth with maximum nodes 2^(h+1)-1).",
            "detailedExplanation": """## 1. Formal Tree Anatomy and Terminology

A **Tree** is a non-linear data structure defined recursively: it consists of a set of one or more nodes such that there is one designated node called the **Root**, and the remaining nodes are partitioned into disjoint sets, each of which is itself a subtree.

```mermaid
graph TD
    R["Root Node (A)\nDepth=0, Level=0"] --> B["B (Internal Node)\nDepth=1, Degree=2"]
    R --> C["C (Internal Node)\nDepth=1, Degree=1"]

    B --> D["D (Leaf Node)\nDepth=2, Degree=0"]
    B --> E["E (Leaf Node)\nDepth=2, Degree=0"]

    C --> F["F (Internal Node)\nDepth=2, Degree=1"]
    F --> G["G (Leaf Node)\nDepth=3, Degree=0"]
```

### Essential Tree Definitions:
1. **Root**: The topmost node of the hierarchy possessing zero incoming edges (no parent).
2. **Edge**: The directed link connecting a parent node to its child. A tree with $N$ nodes always has exactly $N - 1$ edges.
3. **Leaf (Terminal Node)**: A node with no children ($\\\\text{Degree} = 0$).
4. **Internal (Non-Terminal) Node**: A node with at least one child.
5. **Degree of a Node**: The total count of subtrees (children) attached to that node.
6. **Degree of a Tree**: The maximum degree across all nodes in the tree.
7. **Depth of a Node**: The number of edges along the unique path from the **root to that node**. (Depth of root is 0).
8. **Height of a Node**: The number of edges on the longest path from **that node down to a leaf**.
9. **Height of a Tree**: The height of the root node (maximum depth among all nodes).
10. **Level of a Node**: Commonly defined as $\\\\text{Depth} + 1$ (or equivalent to depth, depending on textbook convention).

---

## 2. Binary Tree Classifications

A **Binary Tree** is a tree where every node has **at most two children**, labeled as `left` and `right`.

```mermaid
flowchart TD
    subgraph Types ["Binary Tree Structural Classifications"]
        FB["Full / Strict Binary Tree\nEvery node has 0 or 2 children"]
        CB["Complete Binary Tree\nAll levels full except possibly the last;\nlast level filled from left to right"]
        PB["Perfect Binary Tree\nAll interior nodes have 2 children;\nall leaves are at the exact same depth"]
        DB["Degenerate / Pathological Tree\nEvery parent has only 1 child\n(behaves like a linked list)"]
    end
```

### A. Full (Strict / Proper) Binary Tree
- **Rule**: Every node must have **either 0 or 2 children**. No node has exactly 1 child.
- **Mathematical Invariant**: If $L$ is the number of leaf nodes and $I$ is the number of internal nodes:
  $$L = I + 1$$

### B. Complete Binary Tree
- **Rule**: Every level except possibly the last is completely filled, and all nodes in the last level are packed as far **left** as possible.
- **Significance**: Complete binary trees can be mapped into a 1D contiguous array without pointer overhead (powers Binary Heaps).
- For a node at array index $i$ (0-indexed):
  - Left child $= 2i + 1$
  - Right child $= 2i + 2$
  - Parent $= \\lfloor (i - 1) / 2 \\rfloor$

### C. Perfect Binary Tree
- **Rule**: All interior nodes have exactly 2 children, and **all leaf nodes reside at the identical depth**.
- A perfect binary tree of height $h$ contains:
  $$\\text{Total Nodes } N = 2^{h+1} - 1$$
  $$\\text{Total Leaf Nodes } L = 2^h$$
  $$\\text{Total Internal Nodes } I = 2^h - 1$$

### D. Degenerate (Skewed) Binary Tree
- Every internal node has exactly one child.
- Height $h = N - 1$.
- Search complexity collapses from $\\mathcal{O}(\\log n)$ down to $\\mathcal{O}(n)$, matching a linked list.

---

## 3. Mathematical Properties Summary Table

| Property | Minimum Value | Maximum Value |
| :--- | :--- | :--- |
| **Nodes in Binary Tree of Height $h$** | $h + 1$ (Skewed) | $2^{h+1} - 1$ (Perfect) |
| **Height of Binary Tree with $N$ Nodes** | $\\lfloor \\log_2 N \\rfloor$ (Complete) | $N - 1$ (Skewed) |
| **Leaves in Binary Tree of Height $h$** | $1$ | $2^h$ |
| **Total Edges with $N$ Nodes** | $N - 1$ | $N - 1$ (Always invariant) |

---

> [!IMPORTANT] **MEMORIZE:**
> - In any non-empty binary tree: $L = n_2 + 1$ (Leaves = Nodes with Degree 2 + 1).
> - In a complete binary tree indexed from 0: Left child is $2i + 1$, Right child is $2i + 2$, Parent is $\\lfloor (i - 1) / 2 \\rfloor$.

> [!NOTE] **DEV BRAIN:**
> Complete binary trees are stored directly in contiguous RAM arrays for cache efficiency in priority queues and heaps, requiring 0 bytes of pointer overhead!

> [!WARNING] **TRAP:**
> Do not confuse *Full* with *Complete*. A full tree can be unbalanced (e.g., left child has 2 children, right child is a leaf). A complete tree can have a node with 1 child (on the last level, left-aligned)!

> [!TIP] **EXAM TIP:**
> When asked to prove $L = n_2 + 1$, equate total nodes $N = n_0 + n_1 + n_2$ to total edges $E = N - 1 = n_1 + 2n_2$, then substitute $n_0 + n_1 + n_2 - 1 = n_1 + 2n_2$ to immediately yield $n_0 = n_2 + 1$.""",
            "shortNotes": "Tree has root, edges (N-1), leaves, height and depth. Full tree: 0 or 2 children (L = I + 1). Complete: all levels full except last (left-filled). Perfect: all levels full, N = 2^(h+1) - 1.",
            "examples": [
                {
                    "title": "C Program to Calculate Tree Height, Node Count, and Leaf Count",
                    "problem": "Construct a binary tree and implement recursive functions to compute its height, total node count, and leaf node count.",
                    "explanation": "Demonstrates recursive tree property calculations using divide-and-conquer sub-tree aggregation.",
                    "code": """#include <stdio.h>
#include <stdlib.h>

typedef struct TreeNode {
    int val;
    struct TreeNode *left;
    struct TreeNode *right;
} TreeNode;

TreeNode* createNode(int val) {
    TreeNode *node = (TreeNode*)malloc(sizeof(TreeNode));
    node->val = val;
    node->left = NULL;
    node->right = NULL;
    return node;
}

int countNodes(TreeNode *root) {
    if (root == NULL) return 0;
    return 1 + countNodes(root->left) + countNodes(root->right);
}

int countLeaves(TreeNode *root) {
    if (root == NULL) return 0;
    if (root->left == NULL && root->right == NULL) return 1;
    return countLeaves(root->left) + countLeaves(root->right);
}

int max(int a, int b) { return (a > b) ? a : b; }

int calculateHeight(TreeNode *root) {
    if (root == NULL) return -1; // Height of empty tree is -1; single node is 0
    return 1 + max(calculateHeight(root->left), calculateHeight(root->right));
}

int main() {
    /*
             10
            /  \\
           20   30
          /  \\
         40   50
    */
    TreeNode *root = createNode(10);
    root->left = createNode(20);
    root->right = createNode(30);
    root->left->left = createNode(40);
    root->left->right = createNode(50);

    printf("Binary Tree Metrics:\\n");
    printf("  Total Node Count : %d\\n", countNodes(root));
    printf("  Leaf Node Count  : %d\\n", countLeaves(root));
    printf("  Tree Height      : %d edges\\n", calculateHeight(root));

    return 0;
}""",
                    "output": """Binary Tree Metrics:
  Total Node Count : 5
  Leaf Node Count  : 3
  Tree Height      : 2 edges"""
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
                    "answer": """1. **Definitions**:
   - **Full Binary Tree**: Every node has either 0 or 2 children.
   - **Complete Binary Tree**: All levels are completely full except possibly the last level, which is filled sequentially from left to right.
   - **Perfect Binary Tree**: All internal nodes have 2 children and all leaf nodes reside at the identical bottom level.

2. **Mathematical Proof ($L = n_2 + 1$)**:
   - Let $N$ = total number of nodes in the binary tree.
   - Let $n_0$ = number of leaf nodes (nodes of degree 0, denoted $L$).
   - Let $n_1$ = number of nodes of degree 1.
   - Let $n_2$ = number of nodes of degree 2.
   - **Equation 1 (Total Nodes)**:
     $$N = n_0 + n_1 + n_2$$
   - **Equation 2 (Total Edges)**:
     Every edge connects to a child. Nodes of degree 1 contribute 1 outgoing edge, nodes of degree 2 contribute 2 outgoing edges:
     $$E = 0 \\cdot n_0 + 1 \\cdot n_1 + 2 \\cdot n_2 = n_1 + 2n_2$$
   - In any tree, the total number of edges is always $N - 1$:
     $$E = N - 1 \\implies N = E + 1$$
     $$N = (n_1 + 2n_2) + 1$$
   - **Equating the two expressions for $N$**:
     $$n_0 + n_1 + n_2 = n_1 + 2n_2 + 1$$
     Subtracting $n_1$ and $n_2$ from both sides:
     $$n_0 = n_2 + 1$$
   - **Conclusion**: The number of leaf nodes ($n_0$) is strictly $n_2 + 1$. Q.E.D.""",
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
                    "answer": """1. **Node Bounds as a Function of Height $h$ (assuming root at height 0)**:
   - **Minimum Nodes**: Occurs when the tree is degenerate (skewed):
     $$N_{\\min} = h + 1$$
   - **Maximum Nodes**: Occurs when the tree is perfect:
     $$N_{\\max} = \\sum_{i=0}^h 2^i = 2^{h+1} - 1$$

2. **Height of Complete Binary Tree with $N = 100$**:
   - In a complete binary tree, height $h$ is given by:
     $$h = \\lfloor \\log_2 N \\rfloor$$
   - For $N = 100$:
     $$2^6 = 64 \\le 100 < 128 = 2^7$$
     $$h = \\lfloor \\log_2 100 \\rfloor = 6$$
   - The complete binary tree has a height of **6 edges** (spanning 7 levels, from level 0 to level 6).""",
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
            "detailedExplanation": """## 1. Classification of Traversal Strategies

Unlike linear data structures (arrays, lists) which possess a single natural sequential traversal path, hierarchical trees can be traversed in several distinct dimensional orders.

```mermaid
flowchart TD
    TR["Tree Traversals"] --> DFS["Depth-First Traversals\n(Explores subtree depth via Call Stack)"]
    TR --> BFS["Breadth-First Traversal\n(Level-Order via FIFO Queue)"]

    DFS --> PRE["Preorder Traversal\n[Root -> Left -> Right]"]
    DFS --> IN["Inorder Traversal\n[Left -> Root -> Right]"]
    DFS --> POST["Postorder Traversal\n[Left -> Right -> Root]"]
```

---

## 2. Depth-First Search (DFS) Traversals

Consider the benchmark binary tree:
```
        A
       / \\
      B   C
     / \\
    D   E
```

### A. Preorder Traversal (Root $\\to$ Left $\\to$ Right)
- **Order of Evaluation**: Process current node, then recursively visit left subtree, then recursively visit right subtree.
- **Trace for Benchmark**: `A -> B -> D -> E -> C`
- **Primary Use Cases**: Cloning a tree, evaluating prefix expressions, generating serialization strings.

### B. Inorder Traversal (Left $\\to$ Root $\\to$ Right)
- **Order of Evaluation**: Recursively visit left subtree, process current node, then recursively visit right subtree.
- **Trace for Benchmark**: `D -> B -> E -> A -> C`
- **Primary Use Case**: Performing Inorder traversal on a **Binary Search Tree (BST)** yields all keys in strictly sorted ascending numerical order!

### C. Postorder Traversal (Left $\\to$ Right $\\to$ Root)
- **Order of Evaluation**: Recursively visit left subtree, recursively visit right subtree, then process current node.
- **Trace for Benchmark**: `D -> E -> B -> C -> A`
- **Primary Use Cases**: Deleting an entire tree (children must be freed before parent memory), postfix expression evaluation, calculating sub-tree disk storage sizes.

---

## 3. Iterative DFS Traversals Using Stacks

Recursive DFS consumes implicit memory on the function call stack. In production systems with deep or skewed trees, recursion can cause stack overflow crashes. Iterative versions make the stack explicit.

```mermaid
flowchart TD
    subgraph Iterative_Preorder ["Iterative Preorder with Explicit Stack"]
        S1["1. Push root to Stack"]
        S2["2. Loop while Stack is not empty:"]
        S3["   node = pop() -> Print node"]
        S4["   Push node->right (if exists)\n   Push node->left (if exists)"]
        S1 --> S2 --> S3 --> S4 --> S2
    end
```

*(Note: In Preorder, we push the **right** child before the **left** child so that the left child sits on top of the LIFO stack and is processed first).*

### Iterative Inorder Algorithm:
1. Initialize empty stack and set `curr = root`.
2. While `curr != NULL` or stack is not empty:
   - While `curr != NULL`: Push `curr` to stack and advance `curr = curr->left`.
   - `curr = stack.pop()`.
   - Print `curr->val`.
   - Advance `curr = curr->right`.

---

## 4. Breadth-First Search (Level-Order Traversal)

Level-Order traversal visits nodes horizontally level-by-level, starting from the root (level 0) and proceeding left-to-right across each level.

```mermaid
sequenceDiagram
    autonumber
    participant Q as FIFO Queue
    Note over Q: Enqueue Root 'A' -> Queue: [A]
    Note over Q: Dequeue 'A' (Print A) -> Enqueue children: Left 'B', Right 'C' -> Queue: [B, C]
    Note over Q: Dequeue 'B' (Print B) -> Enqueue children: Left 'D', Right 'E' -> Queue: [C, D, E]
    Note over Q: Dequeue 'C' (Print C) -> Has no children -> Queue: [D, E]
    Note over Q: Dequeue 'D' (Print D) -> Queue: [E]
    Note over Q: Dequeue 'E' (Print E) -> Queue is Empty! Done.
```

- **Output Order**: `A -> B -> C -> D -> E`
- **Algorithm**: Initialize FIFO queue with `root`. While queue is not empty: dequeue `curr`, process it, and enqueue `curr->left` and `curr->right` if they exist.

---

## 5. Algorithmic Complexity Comparison

| Traversal Method | Data Structure Used | Time Complexity | Auxiliary Space (Balanced Tree) | Auxiliary Space (Skewed Tree) |
| :--- | :--- | :--- | :--- | :--- |
| **Recursive Inorder / Pre / Post**| Call Stack | $\\mathcal{O}(n)$ | $\\mathcal{O}(\\log n)$ | $\\mathcal{O}(n)$ |
| **Iterative Inorder / Preorder** | Explicit `Stack` | $\\mathcal{O}(n)$ | $\\mathcal{O}(\\log n)$ | $\\mathcal{O}(n)$ |
| **Level-Order Traversal** | FIFO `Queue` | $\\mathcal{O}(n)$ | $\\mathcal{O}(n/2) = \\mathcal{O}(n)$ | $\\mathcal{O}(1)$ |

---

> [!IMPORTANT] **MEMORIZE:**
> - Inorder: $L \\to V \\to R$ (Yields sorted keys on a BST).
> - Preorder: $V \\to L \\to R$ (Used to copy / serialize a tree).
> - Postorder: $L \\to R \\to V$ (Used to delete a tree bottom-up).
> - Level-Order: Breadth-first using a **Queue**.

> [!NOTE] **DEV BRAIN:**
> You can uniquely reconstruct a binary tree if given: (1) Inorder + Preorder, OR (2) Inorder + Postorder. However, you CANNOT uniquely reconstruct a general binary tree from Preorder + Postorder alone!

> [!WARNING] **TRAP:**
> In iterative preorder, beginners often push `left` before `right`. Because a stack is LIFO, pushing `left` first causes `right` to be on top, mistakenly traversing right before left!

> [!TIP] **EXAM TIP:**
> When asked to reconstruct a tree from Preorder and Inorder: The first element in Preorder is ALWAYS the root. Locate that root in Inorder: everything to the left is the left subtree, and everything to the right is the right subtree!""",
            "shortNotes": "DFS traversals (Preorder: V-L-R, Inorder: L-V-R, Postorder: L-R-V) use stacks/recursion. BFS (Level-Order) uses a FIFO queue. Inorder traversal on a BST yields sorted order.",
            "examples": [
                {
                    "title": "C Program Implementing All 4 Binary Tree Traversals",
                    "problem": "Implement recursive Preorder, Inorder, Postorder, and Queue-based Level-Order traversals on a binary tree.",
                    "explanation": "Constructs a sample binary tree and runs all four traversal algorithms to verify sequential output orders.",
                    "code": """#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    char data;
    struct Node *left;
    struct Node *right;
} Node;

Node* createNode(char val) {
    Node *n = (Node*)malloc(sizeof(Node));
    n->data = val;
    n->left = NULL;
    n->right = NULL;
    return n;
}

void preorder(Node *root) {
    if (root == NULL) return;
    printf("%c ", root->data);
    preorder(root->left);
    preorder(root->right);
}

void inorder(Node *root) {
    if (root == NULL) return;
    inorder(root->left);
    printf("%c ", root->data);
    inorder(root->right);
}

void postorder(Node *root) {
    if (root == NULL) return;
    postorder(root->left);
    postorder(root->right);
    printf("%c ", root->data);
}

// Queue for Level-Order
void levelOrder(Node *root) {
    if (root == NULL) return;
    Node* queue[100];
    int front = 0, rear = 0;

    queue[rear++] = root; // Enqueue root
    while (front < rear) {
        Node *curr = queue[front++]; // Dequeue
        printf("%c ", curr->data);
        if (curr->left != NULL) queue[rear++] = curr->left;
        if (curr->right != NULL) queue[rear++] = curr->right;
    }
}

int main() {
    /*
             A
            / \\
           B   C
          / \\
         D   E
    */
    Node *root = createNode('A');
    root->left = createNode('B');
    root->right = createNode('C');
    root->left->left = createNode('D');
    root->left->right = createNode('E');

    printf("Preorder   (V-L-R) : "); preorder(root); printf("\\n");
    printf("Inorder    (L-V-R) : "); inorder(root); printf("\\n");
    printf("Postorder  (L-R-V) : "); postorder(root); printf("\\n");
    printf("Level-Order (BFS)   : "); levelOrder(root); printf("\\n");

    return 0;
}""",
                    "output": """Preorder   (V-L-R) : A B D E C 
Inorder    (L-V-R) : D B E A C 
Postorder  (L-R-V) : D E B C A 
Level-Order (BFS)   : A B C D E """
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
                    "answer": """1. **Reconstruction Principle**:
   - The first element of `Preorder` is always the root of the current subtree.
   - Finding that root in `Inorder` partitions the sequence: elements to the left form the left subtree, and elements to the right form the right subtree.

2. **Step-by-Step Reconstruction**:
   - **Step 1**: Preorder begins with `A`. Thus, **Root = A**.
   - **Step 2**: Inorder has `A` at index 3:
     * Left Inorder: `[D, B, E]` (3 nodes)
     * Right Inorder: `[F, C]` (2 nodes)
   - **Step 3 (Left Subtree of A)**:
     * Left Preorder (next 3 items): `[B, D, E]`. Root is `B`.
     * In Left Inorder `[D, B, E]`: `D` is left of `B`, `E` is right of `B`.
     * So, `B->left = D` and `B->right = E`.
   - **Step 4 (Right Subtree of A)**:
     * Right Preorder: `[C, F]`. Root is `C`.
     * In Right Inorder `[F, C]`: `F` is to the left of `C`, right is empty.
     * So, `C->left = F` and `C->right = NULL`.

3. **Final Tree Structure**:
```
        A
       / \\
      B   C
     / \\  /
    D   E F
```""",
                    "keyPoints": [
                        "Identification of root from first element of Preorder.",
                        "Partitioning of Inorder into left and right subtrees.",
                        "Recursive resolution of subtrees to yield the unique tree diagram."
                    ]
                },
                {
                    "question": "Write the iterative algorithm for Inorder traversal of a binary tree using an explicit stack. Explain why recursion is avoided in certain production systems.",
                    "marks": "5 Marks",
                    "answer": """1. **Iterative Inorder Algorithm**:
   - **Step 1**: Initialize an empty stack $S$ and pointer `curr = root`.
   - **Step 2**: While `curr != NULL` or $S$ is not empty:
     * **Inner Loop**: While `curr != NULL`:
       - Push `curr` onto stack $S$.
       - `curr = curr->left;`
     * Pop top node: `curr = pop(S);`
     * Process / print `curr->data;`
     * Advance to right subtree: `curr = curr->right;`
   - **Step 3**: Terminate when stack is empty and `curr == NULL`.

2. **Why Avoid Recursion in Production Systems**:
   - **Stack Overflow Hazards**: A skewed tree with $N = 10^5$ nodes consumes $10^5$ stack frames, exhausting the thread stack (typically limited to 1MB - 8MB).
   - **Performance Overhead**: Recursive calls incur function prologue/epilogue overhead and register saves.
   - **Heap vs Stack Memory**: Iterative algorithms use heap-allocated stack memory, which can expand to available physical RAM.""",
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
            "detailedExplanation": """## 1. The BST Invariant

A **Binary Search Tree (BST)** is a node-based binary tree data structure that maintains an ordering property:

$$\\forall x \\in \\text{LeftSubtree}(u): \\text{key}(x) < \\text{key}(u)$$
$$\\forall y \\in \\text{RightSubtree}(u): \\text{key}(y) > \\text{key}(u)$$

*(Assuming distinct keys; duplicates can be placed consistently on the right or tracked with a frequency counter).*

```mermaid
graph TD
    R["50"] --> L["30 (Left < 50)"]
    R --> RT["70 (Right > 50)"]

    L --> LL["20 (< 30)"]
    L --> LR["40 (> 30)"]

    RT --> RL["60 (< 70)"]
    RT --> RR["80 (> 70)"]
```

---

## 2. Core Search and Insertion Operations

### A. Search Operation ($\\mathcal{O}(h)$ Time)
1. If `root == NULL`, target not found.
2. If `target == root->key`, return `root`.
3. If `target < root->key`, recursively search `root->left`.
4. If `target > root->key`, recursively search `root->right`.

### B. Insertion Operation ($\\mathcal{O}(h)$ Time)
New nodes are **always inserted as leaves**:
1. Traverse down using the search logic until hitting `NULL`.
2. Attach the new node at the vacated child pointer location.

```mermaid
flowchart TD
    subgraph Insert_Flow ["BST Insertion: insert(35)"]
        N50["50: 35 < 50 -> go Left"] --> N30["30: 35 > 30 -> go Right"]
        N30 --> N40["40: 35 < 40 -> go Left"]
        N40 --> NULL["left is NULL -> Attach 35 here!"]
    end
```

---

## 3. The 3 Cases of BST Deletion

Node deletion is the most nuanced BST mutation because the BST invariant must be preserved after removal.

```mermaid
flowchart TD
    DEL["delete(key)"] --> C1{"Node is a Leaf?\n(0 Children)"}
    C1 -- Yes --> A1["Case 1: Simply free node and set parent pointer to NULL"]
    C1 -- No --> C2{"Node has 1 Child?"}
    C2 -- Yes --> A2["Case 2: Bypass node, linking parent directly to child. Free node"]
    C2 -- No --> A3["Case 3: Node has 2 Children!\nFind Inorder Successor (min of right subtree)\nCopy successor key to node\nRecursively delete successor"]
```

### Case 1: Node to Delete is a Leaf (Degree 0)
- **Action**: Directly deallocate the node and update its parent's link to `NULL`.

### Case 2: Node to Delete has Exactly One Child (Degree 1)
- **Action**: Bypass the node by connecting its parent directly to its sole child. Free the target node.

### Case 3: Node to Delete has Two Children (Degree 2)
A node with two children cannot be bypassed without breaking tree structure.
- **Action**:
  1. Locate the **Inorder Successor** (smallest key in the right subtree: leftmost node in `root->right`) OR the **Inorder Predecessor** (largest key in the left subtree: rightmost node in `root->left`).
  2. Overwrite the target node's key with the successor's key.
  3. Recursively delete the successor node from the right subtree. *(Note: The successor is guaranteed to have at most ONE child, reducing this deletion to Case 1 or Case 2!)*

---

## 4. Performance: Balanced vs Skewed Trees

The time complexity of search, insert, and delete is proportional to tree **height $h$**, NOT directly $\\log_2 n$:

| Tree State | Diagram | Height $h$ | Search / Insert / Delete Time |
| :--- | :--- | :--- | :--- |
| **Balanced BST** | Symmetrical branching | $\\lfloor \\log_2 n \\rfloor$ | $\\mathcal{O}(\\log n)$ |
| **Skewed BST** | Insert ordered sequence: $10, 20, 30, 40$ | $n - 1$ | $\\mathcal{O}(n)$ (Degenerates to Linked List) |

This performance degradation motivated the invention of self-balancing search trees (AVL Trees, Red-Black Trees).

---

> [!IMPORTANT] **MEMORIZE:**
> - Inorder Successor = Smallest node in the **Right Subtree** (`curr = node->right; while(curr->left) curr = curr->left;`).
> - Inorder Predecessor = Largest node in the **Left Subtree** (`curr = node->left; while(curr->right) curr = curr->right;`).
> - Deleting a 2-child node reduces to deleting a 0-child or 1-child node!

> [!NOTE] **DEV BRAIN:**
> In C++ `std::set` / `std::map` and Java `TreeSet` / `TreeMap`, self-balancing Red-Black BSTs are used to guarantee $\\mathcal{O}(\\log n)$ worst-case performance under all insertion sequences.

> [!WARNING] **TRAP:**
> Never simply delete a node with two children by splicing! You must replace its key with its Inorder Successor/Predecessor, and then delete that successor from the subtree!

> [!TIP] **EXAM TIP:**
> When drawing BST deletion for Case 3, clearly mark: (1) Target node, (2) Inorder successor, (3) Key replacement step, and (4) The final spliced subtree.""",
            "shortNotes": "BST maintains Left < Root < Right. Search/Insert/Delete take O(h) time. Deletion handles 3 cases: leaf (set NULL), 1 child (bypass to child), 2 children (replace with inorder successor).",
            "examples": [
                {
                    "title": "Complete C Implementation of Binary Search Tree with All 3 Deletion Cases",
                    "problem": "Implement BST insertion, search, and full deletion covering leaf, 1-child, and 2-child cases.",
                    "explanation": "Demonstrates recursive BST construction and the three-case deletion algorithm.",
                    "code": """#include <stdio.h>
#include <stdlib.h>

typedef struct BSTNode {
    int key;
    struct BSTNode *left;
    struct BSTNode *right;
} BSTNode;

BSTNode* createNode(int key) {
    BSTNode *n = (BSTNode*)malloc(sizeof(BSTNode));
    n->key = key;
    n->left = n->right = NULL;
    return n;
}

BSTNode* insert(BSTNode *root, int key) {
    if (root == NULL) return createNode(key);
    if (key < root->key) root->left = insert(root->left, key);
    else if (key > root->key) root->right = insert(root->right, key);
    return root;
}

BSTNode* findMin(BSTNode *root) {
    while (root->left != NULL) root = root->left;
    return root;
}

BSTNode* deleteNode(BSTNode *root, int key) {
    if (root == NULL) return NULL;

    if (key < root->key) {
        root->left = deleteNode(root->left, key);
    } else if (key > root->key) {
        root->right = deleteNode(root->right, key);
    } else {
        // Case 1: Leaf (0 children)
        if (root->left == NULL && root->right == NULL) {
            free(root);
            return NULL;
        }
        // Case 2: One child
        else if (root->left == NULL) {
            BSTNode *temp = root->right;
            free(root);
            return temp;
        } else if (root->right == NULL) {
            BSTNode *temp = root->left;
            free(root);
            return temp;
        }
        // Case 3: Two children
        else {
            BSTNode *successor = findMin(root->right);
            root->key = successor->key; // Copy successor data
            root->right = deleteNode(root->right, successor->key); // Delete successor
        }
    }
    return root;
}

void inorder(BSTNode *root) {
    if (root == NULL) return;
    inorder(root->left);
    printf("%d ", root->key);
    inorder(root->right);
}

int main() {
    BSTNode *root = NULL;
    int keys[] = {50, 30, 70, 20, 40, 60, 80};
    for (int i = 0; i < 7; i++) root = insert(root, keys[i]);

    printf("Original BST Inorder: ");
    inorder(root);
    printf("\\n");

    // Case 1: Delete Leaf (20)
    root = deleteNode(root, 20);
    printf("After deleting 20 (Leaf)      : ");
    inorder(root);
    printf("\\n");

    // Case 2: Delete Node with 1 child (Insert 25 first under 40)
    root = insert(root, 25);
    root = deleteNode(root, 30); // 30 now has children
    printf("After deleting 30 (Node)      : ");
    inorder(root);
    printf("\\n");

    // Case 3: Delete Node with 2 children (50 Root)
    root = deleteNode(root, 50);
    printf("After deleting 50 (2 Children): ");
    inorder(root);
    printf("\\n");

    return 0;
}""",
                    "output": """Original BST Inorder: 20 30 40 50 60 70 80 
After deleting 20 (Leaf)      : 30 40 50 60 70 80 
After deleting 30 (Node)      : 25 40 50 60 70 80 
After deleting 50 (2 Children): 25 40 60 70 80 """
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
                    "answer": """1. **Case 1: Deleting a Leaf Node (0 Children)**:
   - *Logic*: The node has no subtrees attached.
   - *Action*: Update the parent's pointer to this node to `NULL`, then deallocate node memory.
   - *Complexity*: $\\mathcal{O}(h)$ to find node, $\\mathcal{O}(1)$ to delete.

2. **Case 2: Deleting a Node with One Child (1 Child)**:
   - *Logic*: The node has either a left child or a right child, but not both.
   - *Action*: Splicing bypass. Update the parent's pointer to point directly to the node's only child, bypassing the deleted node. Free target node.
   - *Complexity*: $\\mathcal{O}(h)$ search, $\\mathcal{O}(1)$ pointer splice.

3. **Case 3: Deleting a Node with Two Children (2 Children)**:
   - *Logic*: Removing a 2-child node creates two orphaned subtrees.
   - *Action*:
     a) Locate the **Inorder Successor** (smallest element in the right subtree, found by traversing `left` from `node->right`).
     b) Overwrite the target node's value with the Inorder Successor's value.
     c) Call delete recursively on the right subtree to remove the Inorder Successor.
     *(Because the successor has at most one child, step (c) always falls under Case 1 or Case 2).*
   - *Complexity*: $\\mathcal{O}(h)$ total time.""",
                    "keyPoints": [
                        "Clear categorization of Case 1 (leaf), Case 2 (one child), and Case 3 (two children).",
                        "Role of Inorder Successor in preserving BST invariant.",
                        "Reduction of Case 3 to a simpler Case 1/2 deletion."
                    ]
                },
                {
                    "question": "What is a Skewed Binary Search Tree? Under what condition does it occur, and what is its effect on search time complexity?",
                    "marks": "5 Marks",
                    "answer": """1. **Definition of Skewed BST**:
   A skewed BST is a degenerate binary tree where every internal node has exactly one child. All nodes form a single linear branch.
   - **Left-Skewed**: Every parent has only a left child.
   - **Right-Skewed**: Every parent has only a right child.

2. **Conditions Causing Skewing**:
   - Occurs when data keys are inserted into the BST in **strictly sorted order** (e.g., ascending: 10, 20, 30, 40, 50) or **reverse sorted order**.
   - Each newly inserted element is larger than all prior elements and attaches as the rightmost leaf.

3. **Impact on Complexity**:
   - Height $h$ collapses from optimal $\\log_2 n$ to worst-case $n - 1$.
   - Search, insertion, and deletion operations degrade from $\\mathcal{O}(\\log n)$ down to $\\mathcal{O}(n)$, matching a singly linked list and forfeiting all binary search advantages.""",
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
            "detailedExplanation": """## 1. The Balance Factor and AVL Invariant

The fundamental flaw of standard BSTs is vulnerability to skewing ($O(n)$ height). Invented in 1962 by Georgy Adelson-Velsky and Evgenii Landis, the **AVL Tree** was the first self-balancing BST in computer science history.

### The Balance Factor (BF)
For every node $u$ in an AVL tree:
$$\\text{BF}(u) = \\text{Height}(\\text{LeftSubtree}(u)) - \\text{Height}(\\text{RightSubtree}(u))$$

$$\\text{AVL Invariant: } \\text{BF}(u) \\in \\{-1, 0, +1\\}$$

```mermaid
graph TD
    N["Node [BF = Height(Left) - Height(Right)]"]
    N -->|"BF = +1"| L1["Left-Heavy (Left is 1 level taller)"]
    N -->|"BF = 0"| L2["Perfect Balance (Equal heights)"]
    N -->|"BF = -1"| L3["Right-Heavy (Right is 1 level taller)"]
    N -.->|"BF = +2 or -2"| CRIT["CRITICAL IMBALANCE!\nTriggers Tree Rotation"]
```

### Height Guarantee
An AVL tree with $N$ nodes is guaranteed to maintain height:
$$h < 1.44 \\log_2(N + 2)$$
This guarantees that search, insertion, and deletion strictly require **$\\mathcal{O}(\\log n)$ worst-case time**.

---

## 2. The Four Rotational Cases

When an insertion causes a node's balance factor to become $+2$ or $-2$, balance is restored using tree rotations. The rotation type is determined by the relationship between the imbalanced node and the inserted grandchild:

```mermaid
flowchart TD
    IMB["Imbalanced Node (BF = +2 or -2)"] --> BF_POS{"BF == +2\n(Left-Heavy)"}
    IMB --> BF_NEG{"BF == -2\n(Right-Heavy)"}

    BF_POS -->|"Inserted in Left child's Left subtree"| LL["LL Imbalance\nFix: Single Right Rotation"]
    BF_POS -->|"Inserted in Left child's Right subtree"| LR["LR Imbalance\nFix: Double Rotation (Left on child, then Right on root)"]

    BF_NEG -->|"Inserted in Right child's Right subtree"| RR["RR Imbalance\nFix: Single Left Rotation"]
    BF_NEG -->|"Inserted in Right child's Left subtree"| RL["RL Imbalance\nFix: Double Rotation (Right on child, then Left on root)"]
```

---

## 3. Step-by-Step Rotation Mechanics

### A. Right Rotation (Fixes LL Imbalance)
Node $z$ has $\\text{BF} = +2$, and its left child $y$ has $\\text{BF} = +1$.
```
       z (BF=+2)                y (BF=0)
      / \\                     / \\
     y   T3    == Right ==>   x     z
    / \\                     / \\   / \\
   x   T2                   T0 T1 T2 T3
  / \\
 T0  T1
```
- $y$ becomes the new root.
- $z$ becomes $y$'s right child.
- $y$'s former right subtree ($T_2$) becomes $z$'s new left subtree.

### B. Left Rotation (Fixes RR Imbalance)
Node $z$ has $\\text{BF} = -2$, and its right child $y$ has $\\text{BF} = -1$.
```
     z (BF=-2)                  y (BF=0)
    / \\                       / \\
   T0  y       == Left ==>    z     x
      / \\                   / \\   / \\
     T1  x                  T0 T1 T2 T3
        / \\
       T2  T3
```
- $y$ becomes the new root.
- $z$ becomes $y$'s left child.
- $y$'s former left subtree ($T_1$) becomes $z$'s new right subtree.

### C. Left-Right Rotation (Fixes LR Imbalance)
Node $z$ has $\\text{BF} = +2$, and its left child $y$ has $\\text{BF} = -1$.
1. **Step 1**: Perform **Left Rotation on $y$** (transforms into LL case).
2. **Step 2**: Perform **Right Rotation on $z$** (restores balance).

### D. Right-Left Rotation (Fixes RL Imbalance)
Node $z$ has $\\text{BF} = -2$, and its right child $y$ has $\\text{BF} = +1$.
1. **Step 1**: Perform **Right Rotation on $y$** (transforms into RR case).
2. **Step 2**: Perform **Left Rotation on $z$** (restores balance).

---

## 4. Re-Balancing on Deletion

While an insertion requires at most **one rotation** (single or double) to rebalance the entire tree, **deletion can trigger up to $\\mathcal{O}(\\log n)$ rotations** cascading up the path to the root.

---

> [!IMPORTANT] **MEMORIZE:**
> - $\\text{BF} = \\text{Height}(\\text{Left}) - \\text{Height}(\\text{Right})$. Legal set is $\\{-1, 0, +1\\}$.
> - **LL Case** $\\to$ Single Right Rotation on root.
> - **RR Case** $\\to$ Single Left Rotation on root.
> - **LR Case** $\\to$ Left Rotate Left Child, then Right Rotate root.
> - **RL Case** $\\to$ Right Rotate Right Child, then Left Rotate root.

> [!NOTE] **DEV BRAIN:**
> AVL trees maintain stricter balance than Red-Black trees. As a result, AVL trees provide faster lookups ($O(\\log n)$ with a smaller constant factor), making them preferred for read-heavy workloads (e.g., in-memory database indices).

> [!WARNING] **TRAP:**
> After rotating, you must recalculate the heights of both the rotated child AND the former root! Stale height variables will miscalculate balance factors on subsequent insertions!

> [!TIP] **EXAM TIP:**
> When asked to show AVL balance after inserting a sequence (e.g., 10, 20, 30, 40, 50), recalculate and write down the balance factor of EVERY ancestor node after each insertion before choosing the rotation.""",
            "shortNotes": "AVL tree invariant requires Balance Factor = Height(L) - Height(R) in {-1, 0, 1}. Imbalances are corrected via rotations: LL (Right), RR (Left), LR (Left-Right), RL (Right-Left) in O(log n) time.",
            "examples": [
                {
                    "title": "Complete C Implementation of Self-Balancing AVL Tree",
                    "problem": "Implement AVL tree insertion with automatic height recalculation and LL, RR, LR, RL rotational re-balancing.",
                    "explanation": "Demonstrates balance factor checking and pointer transformations for all four rotation types.",
                    "code": """#include <stdio.h>
#include <stdlib.h>

typedef struct AVLNode {
    int key;
    struct AVLNode *left;
    struct AVLNode *right;
    int height;
} AVLNode;

int height(AVLNode *n) { return (n == NULL) ? 0 : n->height; }
int max(int a, int b) { return (a > b) ? a : b; }

AVLNode* createNode(int key) {
    AVLNode *n = (AVLNode*)malloc(sizeof(AVLNode));
    n->key = key;
    n->left = n->right = NULL;
    n->height = 1; // Leaf node starts at height 1
    return n;
}

int getBalance(AVLNode *n) {
    return (n == NULL) ? 0 : height(n->left) - height(n->right);
}

// Right Rotation (LL fix)
AVLNode* rotateRight(AVLNode *y) {
    AVLNode *x = y->left;
    AVLNode *T2 = x->right;

    x->right = y;
    y->left = T2;

    y->height = max(height(y->left), height(y->right)) + 1;
    x->height = max(height(x->left), height(x->right)) + 1;

    return x; // New root
}

// Left Rotation (RR fix)
AVLNode* rotateLeft(AVLNode *x) {
    AVLNode *y = x->right;
    AVLNode *T2 = y->left;

    y->left = x;
    x->right = T2;

    x->height = max(height(x->left), height(x->right)) + 1;
    y->height = max(height(y->left), height(y->right)) + 1;

    return y; // New root
}

AVLNode* insertAVL(AVLNode *node, int key) {
    if (node == NULL) return createNode(key);

    if (key < node->key) node->left = insertAVL(node->left, key);
    else if (key > node->key) node->right = insertAVL(node->right, key);
    else return node; // No duplicates

    node->height = 1 + max(height(node->left), height(node->right));
    int balance = getBalance(node);

    // 1. LL Case
    if (balance > 1 && key < node->left->key)
        return rotateRight(node);

    // 2. RR Case
    if (balance < -1 && key > node->right->key)
        return rotateLeft(node);

    // 3. LR Case
    if (balance > 1 && key > node->left->key) {
        node->left = rotateLeft(node->left);
        return rotateRight(node);
    }

    // 4. RL Case
    if (balance < -1 && key < node->right->key) {
        node->right = rotateRight(node->right);
        return rotateLeft(node);
    }

    return node;
}

void printPreorder(AVLNode *root) {
    if (root == NULL) return;
    printf("%d(BF=%d) ", root->key, getBalance(root));
    printPreorder(root->left);
    printPreorder(root->right);
}

int main() {
    AVLNode *root = NULL;

    // Inserting 10, 20, 30 causes RR imbalance at 10:
    root = insertAVL(root, 10);
    root = insertAVL(root, 20);
    root = insertAVL(root, 30); // Triggers Left Rotation

    printf("Preorder after inserting 10, 20, 30 (RR solved):\\n  ");
    printPreorder(root);
    printf("\\n");

    // Inserting 40, 50 causes another rotation:
    root = insertAVL(root, 40);
    root = insertAVL(root, 50);

    // Inserting 25 causes LR / RL adjustment:
    root = insertAVL(root, 25);

    printf("Preorder after inserting 40, 50, 25:\\n  ");
    printPreorder(root);
    printf("\\n");

    return 0;
}""",
                    "output": """Preorder after inserting 10, 20, 30 (RR solved):
  20(BF=0) 10(BF=0) 30(BF=0) 
Preorder after inserting 40, 50, 25:
  30(BF=0) 20(BF=0) 10(BF=0) 25(BF=0) 40(BF=-1) 50(BF=0) """
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
                    "answer": """1. **Definition of AVL Tree**:
   An AVL tree is a self-balancing Binary Search Tree where the heights of the two subtrees of any node differ by at most one:
   $$\\text{Balance Factor (BF)} = \\text{Height}(\\text{Left}) - \\text{Height}(\\text{Right}) \\in \\{-1, 0, +1\\}$$

2. **The Four Rotations**:
   - **(a) LL Rotation (Single Right Rotation)**:
     * *Cause*: Insertion into the left subtree of the left child (node BF becomes $+2$, left child BF is $+1$).
     * *Fix*: Rotate right around the imbalanced node. The left child becomes the new root; former root becomes its right child.
   - **(b) RR Rotation (Single Left Rotation)**:
     * *Cause*: Insertion into the right subtree of the right child (node BF becomes $-2$, right child BF is $-1$).
     * *Fix*: Rotate left around the imbalanced node. The right child becomes the new root; former root becomes its left child.
   - **(c) LR Rotation (Double Rotation)**:
     * *Cause*: Insertion into the right subtree of the left child (node BF becomes $+2$, left child BF is $-1$).
     * *Fix*: First rotate left on the left child, then rotate right on the imbalanced root node.
   - **(d) RL Rotation (Double Rotation)**:
     * *Cause*: Insertion into the left subtree of the right child (node BF becomes $-2$, right child BF is $+1$).
     * *Fix*: First rotate right on the right child, then rotate left on the imbalanced root node.""",
                    "keyPoints": [
                        "Formal definition of AVL balance factor.",
                        "Analysis of all 4 imbalance triggers (LL, RR, LR, RL).",
                        "Single vs double rotation mechanics."
                    ]
                },
                {
                    "question": "Insert the keys: 50, 40, 30, 20, 25 into an initially empty AVL tree. Show the step-by-step tree configuration after each insertion and identify the rotations performed.",
                    "marks": "5 Marks",
                    "answer": """1. **Insert 50, 40**:
   - 50(BF=1) -> 40(BF=0) attached to left. Balanced.
2. **Insert 30**:
   - 50(BF=+2) -> 40(BF=+1) -> 30(BF=0).
   - Imbalance at node 50 (LL case: inserted in left-of-left).
   - **Action**: Right Rotate around 50.
   - **Result**: 40 is root, left=30, right=50. All BF=0.
3. **Insert 20**:
   - 40(BF=1) -> left child 30(BF=1) -> left child 20(BF=0). Balanced.
4. **Insert 25**:
   - Path: 40 -> 30 -> 20 -> right child 25.
   - Node 30 has $\\text{Height}(\\text{Left})=2$ (nodes 20, 25) and $\\text{Height}(\\text{Right})=0$.
   - Balance factor of 30 becomes $+2$. Child 20 has balance factor $-1$ (key 25 is in right subtree of 20).
   - **LR Imbalance at node 30**:
     * Step 1: Left rotate around 20 $\\implies$ 25 becomes left child of 30, with 20 as left child of 25.
     * Step 2: Right rotate around 30 $\\implies$ 25 becomes left child of 40, with 20 on left and 30 on right.
5. **Final Tree Configuration**:
   - Root: 40
   - Left subtree of 40: 25 (with left=20, right=30)
   - Right subtree of 40: 50
   - All balance factors are $\\in \\{-1, 0, +1\\}$.""",
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
            "detailedExplanation": """## 1. The Binary Heap Invariants

A **Binary Heap** is a specialized tree-based data structure satisfying two strict invariants:
1. **Structural Invariant (Complete Binary Tree)**: All levels are completely full, except possibly the last level, which is filled sequentially from left to right.
2. **Heap Order Invariant**:
   - **Max-Heap**: For every node $i$ other than root: $\\text{Key}(\\text{Parent}(i)) \\ge \\text{Key}(i)$. The maximum element is permanently stationed at the root.
   - **Min-Heap**: For every node $i$ other than root: $\\text{Key}(\\text{Parent}(i)) \\le \\text{Key}(i)$. The minimum element is permanently stationed at the root.

```mermaid
graph TD
    subgraph MaxHeap ["Max-Heap (Parent >= Children)"]
        R["90 (Root = Maximum)"] --> C1["70"]
        R --> C2["80"]
        C1 --> L1["40"]
        C1 --> L2["60"]
        C2 --> L3["20"]
        C2 --> L4["50"]
    end
```

---

## 2. Pointerless Array-Based Representation

Because a binary heap is guaranteed to be a complete binary tree, it can be mapped into a **1D contiguous array** without storing child or parent pointers:

```
Tree Nodes:        [ 90,  70,  80,  40,  60,  20,  50 ]
Array Index (0-based): 0    1    2    3    4    5    6
```

### 0-Indexed Array Mapping Formulas:
- $\\text{Parent}(i) = \\lfloor (i - 1) / 2 \\rfloor$
- $\\text{LeftChild}(i) = 2i + 1$
- $\\text{RightChild}(i) = 2i + 2$
- **Leaf Node Range**: In an array of $n$ elements, leaves occupy indices from $\\lfloor n/2 \\rfloor$ to $n - 1$. Internal nodes occupy indices from $0$ to $\\lfloor n/2 \\rfloor - 1$.

---

## 3. The Heapify (Sift-Down) Operation

The `heapify(arr, n, i)` procedure assumes subtrees rooted at $\\text{Left}(i)$ and $\\text{Right}(i)$ already satisfy the heap property, but node $i$ may violate it. It bubbles node $i$ down:

```mermaid
flowchart TD
    subgraph SiftDown ["Heapify / Sift-Down Logic"]
        H1["Compare node i with Left(i) and Right(i)"]
        H2{"Is node i smaller than either child?"}
        H2 -- No --> DONE["Heap invariant satisfied! Exit."]
        H2 -- Yes --> SWAP["Swap node i with LARGEST child"]
        SWAP --> REC["Recursively heapify swapped child index"]
        REC --> H1
    end
```

Running time of `heapify` on a node at height $h$ is $\\mathcal{O}(h) = \\mathcal{O}(\\log n)$.

---

## 4. Building a Heap: Why Bottom-Up Construction is $\\mathcal{O}(n)$, Not $\\mathcal{O}(n \\log n)$

To construct a heap from an arbitrary unsorted array of size $n$:
- **Naive Insertion**: Inserting $n$ elements one by one takes $n \\times \\mathcal{O}(\\log n) = \\mathcal{O}(n \\log n)$.
- **Bottom-Up `buildHeap`**: Call `heapify` on all non-leaf nodes starting from index $\\lfloor n/2 \\rfloor - 1$ down to $0$.

```c
void buildHeap(int arr[], int n) {
    for (int i = n / 2 - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }
}
```

### Mathematical Proof of $\\mathcal{O}(n)$ Time:
At height $h$, there are at most $\\lceil n / 2^{h+1} \\rceil$ nodes, each requiring at most $h$ swaps:
$$\\text{Total Work} = \\sum_{h=0}^{\\lfloor \\log_2 n \\rfloor} \\left\\lceil \\frac{n}{2^{h+1}} \\right\\rceil \\mathcal{O}(h) = \\mathcal{O}\\left( n \\sum_{h=0}^{\\infty} \\frac{h}{2^h} \\right)$$

The infinite series $\\sum_{h=0}^{\\infty} \\frac{h}{2^h} = 2$.
$$\\text{Total Work} = \\mathcal{O}(n \\times 2) = \\mathcal{O}(n)$$
*Most nodes reside near the bottom of the tree where height $h$ is tiny (leaves have $h=0$ and require 0 swaps).*

---

## 5. Heap Sort Algorithm

Heap Sort is an in-place, non-stable sorting algorithm running in guaranteed $\\mathcal{O}(n \\log n)$ time:
1. **Step 1 (Build Max-Heap)**: Transform input array into a Max-Heap in $\\mathcal{O}(n)$ time.
2. **Step 2 (Sort Phase)**:
   - For $i = n - 1$ down to $1$:
     * Swap `arr[0]` (current maximum) with `arr[i]` (last element).
     * Reduce heap size by 1.
     * Call `heapify(arr, i, 0)` on the root to restore the max-heap invariant.
3. Once the loop finishes, the array is sorted in **ascending order**.

```mermaid
sequenceDiagram
    autonumber
    participant A as Heap Sort Array
    Note over A: 1. Build Max-Heap: [ 90, 70, 80, 40, 60, 20, 50 ]
    Note over A: 2. Swap root (90) with last element (50) -> Array: [ 50, 70, 80, ..., | 90 ]
    Note over A: 3. Heapify root on reduced size 6 -> Max-Heap restored: [ 80, 70, 50, ... | 90 ]
    Note over A: 4. Swap root (80) with element at index 5 -> [ ..., | 80, 90 ]
    Note over A: Repeat until sorted!
```

---

> [!IMPORTANT] **MEMORIZE:**
> - To sort in **Ascending** order $\\to$ Use a **Max-Heap**.
> - To sort in **Descending** order $\\to$ Use a **Min-Heap**.
> - Building a heap bottom-up takes **$\\mathcal{O}(n)$ time**, NOT $\\mathcal{O}(n \\log n)$!

> [!NOTE] **DEV BRAIN:**
> Heap Sort runs in guaranteed $O(n \\log n)$ worst-case time with $O(1)$ auxiliary space, unlike QuickSort (which risks $O(n^2)$) and Merge Sort (which requires $O(n)$ extra memory). However, QuickSort is often faster in practice due to better cache locality.

> [!WARNING] **TRAP:**
> Heap Sort is **NOT a stable sort**. Swapping elements across long distances breaks the relative ordering of duplicate keys!

> [!TIP] **EXAM TIP:**
> When asked to prove why `buildHeap` is $O(n)$ in an exam, write the infinite summation $\\sum_{h=0}^\\infty \\frac{h}{2^h} = 2$. This formula demonstrates rigorous mathematical mastery.""",
            "shortNotes": "Binary Heap is a complete binary tree in an array. Max-heap: parent >= children. BuildHeap runs in O(n) bottom-up. Heap Sort swaps max to end and heapifies, running in O(n log n) in-place.",
            "examples": [
                {
                    "title": "C Program Implementing Bottom-Up Heapify and In-Place Heap Sort",
                    "problem": "Implement Max-Heap construction and Heap Sort to sort an integer array in ascending order.",
                    "explanation": "Demonstrates array-based indexing, O(n) build-heap, and the O(n log n) sorting phase.",
                    "code": """#include <stdio.h>

void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

void heapify(int arr[], int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest])
        largest = left;

    if (right < n && arr[right] > arr[largest])
        largest = right;

    if (largest != i) {
        swap(&arr[i], &arr[largest]);
        heapify(arr, n, largest); // Sift down recursively
    }
}

void heapSort(int arr[], int n) {
    // 1. Build Max-Heap (O(n) bottom-up)
    for (int i = n / 2 - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }

    // 2. Extract elements one by one
    for (int i = n - 1; i > 0; i--) {
        swap(&arr[0], &arr[i]); // Move current max to end
        heapify(arr, i, 0);      // Restore max-heap on reduced array
    }
}

void printArray(int arr[], int n) {
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");
}

int main() {
    int arr[] = {12, 11, 13, 5, 6, 7};
    int n = sizeof(arr) / sizeof(arr[0]);

    printf("Original Array : ");
    printArray(arr, n);

    heapSort(arr, n);

    printf("Sorted Array   : ");
    printArray(arr, n);

    return 0;
}""",
                    "output": """Original Array : 12 11 13 5 6 7 
Sorted Array   : 5 6 7 11 12 13 """
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
                    "answer": """1. **Concept**:
   - `buildHeap` calls `heapify` on non-leaf nodes starting from index $\\lfloor n/2 \\rfloor - 1$ down to $0$.
   - A node at height $h$ can take at most $h$ comparisons/swaps to bubble down to the bottom.

2. **Node Distribution by Height**:
   - In a complete binary tree of $n$ elements, the number of nodes at height $h$ is at most:
     $$N_h = \\left\\lceil \\frac{n}{2^{h+1}} \\right\\rceil$$
   - Leaves ($h = 0$): $\\approx n/2$ nodes (require 0 work).
   - Height $1$: $\\approx n/4$ nodes.
   - Height $h$: $\\approx n/2^{h+1}$ nodes.

3. **Total Work Summation**:
   $$T(n) = \\sum_{h=0}^{\\lfloor \\log_2 n \\rfloor} \\frac{n}{2^{h+1}} \\cdot \\mathcal{O}(h) = \\frac{n}{2} \\sum_{h=0}^{\\infty} \\frac{h}{2^h}$$
   - The infinite series $S = \\sum_{h=0}^{\\infty} \\frac{h}{2^h}$:
     $$S = \\frac{0}{1} + \\frac{1}{2} + \\frac{2}{4} + \\frac{3}{8} + \\frac{4}{16} + \\dots = 2$$
   - Substituting $S = 2$:
     $$T(n) = \\frac{n}{2} \\times 2 = \\mathcal{O}(n)$$

4. **Conclusion**:
   The vast majority of nodes are clustered at low heights with minimal swap costs, proving that bottom-up heap construction is strictly $\\mathcal{O}(n)$.""",
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
                    "answer": """1. **Heap Sort Steps**:
   - **Step 1**: Build a Max-Heap from the input array in $\\mathcal{O}(n)$ time.
   - **Step 2**: Swap root `arr[0]` (maximum) with `arr[n-1]`.
   - **Step 3**: Reduce heap size by 1 and call `heapify` on root.
   - **Step 4**: Repeat until heap size is 1.

2. **Trace for [4, 10, 3, 5, 1]**:
   - **Build Max-Heap**:
     * Internal nodes at index 1 (`10`), index 0 (`4`).
     * `heapify(1)`: children are 5, 1. Max is 10. No change.
     * `heapify(0)`: children are 10 (idx 1), 3 (idx 2). Largest is 10. Swap 4 and 10 $\\to$ `[10, 4, 3, 5, 1]`.
     * Heapify swapped child at idx 1: children 5, 1. Largest is 5. Swap 4 and 5 $\\to$ `[10, 5, 3, 4, 1]`.
     * **Max-Heap**: `[10, 5, 3, 4, 1]`.
   - **Sort Iteration 1**: Swap 10 and 1 $\\to$ `[1, 5, 3, 4, | 10]`. Heapify root $\\to$ `[5, 4, 3, 1, | 10]`.
   - **Sort Iteration 2**: Swap 5 and 1 $\\to$ `[1, 4, 3, | 5, 10]`. Heapify root $\\to$ `[4, 1, 3, | 5, 10]`.
   - **Sort Iteration 3**: Swap 4 and 3 $\\to$ `[3, 1, | 4, 5, 10]`. Heapify root $\\to$ `[3, 1, | 4, 5, 10]`.
   - **Sort Iteration 4**: Swap 3 and 1 $\\to$ `[1, 3, 4, 5, 10]`.
   - **Sorted Output**: `[1, 3, 4, 5, 10]`.""",
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
}
