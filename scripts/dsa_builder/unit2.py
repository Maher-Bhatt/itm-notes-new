# Unit 2: Arrays, Strings & Linked Lists
# Topics:
# dsa-u2-t1: 1D & 2D Arrays: Memory Mapping Formulas (Row-Major vs Column-Major), Address Calculation & Sparse Matrices
# dsa-u2-t2: Singly Linked List: Dynamic Memory Allocation, Node Structure, Pointer Manipulation, Insertion & Deletion at Head/Tail/Arbitrary
# dsa-u2-t3: Doubly Linked List (DLL): Two-Way Pointers, Insertion, Deletion, Forward & Backward Traversals
# dsa-u2-t4: Circular Linked List (SLL & DLL variants): Applications (Round-Robin CPU Scheduling), Loop Traversal & Boundary conditions
# dsa-u2-t5: Advanced Linked List Problems: Reversing a Linked List (Iterative & Recursive), Detecting Cycles (Floyd's Tortoise and Hare), and Finding Middle Node

unit2 = {
    "id": "dsa-u2",
    "title": "Unit 2: Arrays, Strings & Linked Lists",
    "description": "Contiguous array storage, row-major and column-major memory mapping formulas, sparse matrix representations, dynamic singly linked lists, doubly linked lists, circular linked lists, and interview-grade pointer algorithms (Floyd's cycle detection, list reversal, middle node).",
    "topics": [
        {
            "id": "dsa-u2-t1",
            "title": "1D & 2D Arrays: Memory Mapping Formulas (Row-Major vs Column-Major), Address Calculation & Sparse Matrices",
            "simpleExplanation": "An array is a contiguous memory collection of homogeneous elements indexed by integers. Because physical RAM is strictly a 1D linear address space, multi-dimensional 2D arrays are serialized into memory using either Row-Major Order (row-by-row, standard in C/C++/Java) or Column-Major Order (column-by-column, standard in Fortran/MATLAB), while Sparse Matrices compress memory by storing only non-zero elements in 3-tuple form.",
            "detailedExplanation": """## 1. Linear 1D Array Memory Addressing

In physical RAM, memory is addressed linearly as a sequential continuum of byte addresses. When an array $A[0 \\dots N-1]$ of elements—each occupying $W$ bytes—is allocated, it is assigned a starting physical address known as the **Base Address (BA)**.

$$\\text{Address}(A[i]) = \\text{BA} + (i - \\text{LowerBound}) \\times W$$

For zero-indexed arrays (where $\\text{LowerBound} = 0$):
$$\\text{Address}(A[i]) = \\text{BA} + i \\times W$$

This simple arithmetic demonstrates why array random access is strictly $\\mathcal{O}(1)$: the CPU calculates the target memory offset directly without inspecting intermediate cells.

---

## 2. 2D Arrays and Memory Layouts

Consider a 2D array $A[R][C]$ consisting of $M$ rows (indexed $0 \\le i < M$) and $N$ columns (indexed $0 \\le j < N$). Because physical RAM is one-dimensional, 2D matrices must be linearized into 1D memory.

```mermaid
flowchart TD
    subgraph Matrix ["2D Matrix: 3 Rows x 4 Columns"]
        R0["Row 0: [ A00, A01, A02, A03 ]"]
        R1["Row 1: [ A10, A11, A12, A13 ]"]
        R2["Row 2: [ A20, A21, A22, A23 ]"]
    end

    subgraph RowMajor ["Row-Major Serialization (C/C++, Java, Python)"]
        RM["A00 | A01 | A02 | A03 || A10 | A11 | A12 | A13 || A20 | A21 | A22 | A23"]
    end

    subgraph ColMajor ["Column-Major Serialization (Fortran, MATLAB, R)"]
        CM["A00 | A10 | A20 || A01 | A11 | A21 || A02 | A12 | A22 || A03 | A13 | A23"]
    end

    Matrix --> RowMajor
    Matrix --> ColMajor
```

### A. Row-Major Order (RMO)
In Row-Major Order, elements are placed row after row. To access element $A[i][j]$:
1. Skip all previous $i$ complete rows. Each row contains $N$ columns.
2. Skip $j$ elements in the current row.

$$\\text{Address}(A[i][j]) = \\text{BA} + [ (i - L_r) \\times N + (j - L_c) ] \\times W$$

Where:
- $\\text{BA}$ = Base Address
- $L_r, U_r$ = Lower and upper bounds of rows ($M = U_r - L_r + 1$)
- $L_c, U_c$ = Lower and upper bounds of columns ($N = U_c - L_c + 1$)
- $W$ = Width / size of each element in bytes

### B. Column-Major Order (CMO)
In Column-Major Order, elements are placed column after column. To access element $A[i][j]$:
1. Skip all previous $j$ complete columns. Each column contains $M$ rows.
2. Skip $i$ elements in the current column.

$$\\text{Address}(A[i][j]) = \\text{BA} + [ (j - L_c) \\times M + (i - L_r) ] \\times W$$

### Hardware Cache Implications (Spatial Locality)
In modern CPU microarchitectures, traversing a 2D array in Row-Major order when language compilers use RMO (such as C) utilizes the CPU cache lines effectively ($L1$ cache hits). Inverting the loops to traverse columns first leads to catastrophic **strided cache misses**, degrading execution speed by up to $10\\times$ to $50\\times$!

---

## 3. Sparse Matrices

A matrix is formally categorized as **sparse** if the overwhelming majority of its entries are zero ($> 70\\% - 90\\%$ zeroes). Storing a $10,000 \\times 10,000$ sparse matrix as a dense 2D array requires $10^8 \\times 4\\text{ bytes} \\approx 400\\text{ MB}$ of memory, wasting RAM on zero entries.

```
Dense Matrix (5 x 4):
[ 0   0   0   9 ]
[ 0   5   0   0 ]
[ 0   0   0   0 ]
[ 7   0   0   0 ]
[ 0   0   3   0 ]
```

### Triplet Representation (Coordinate List - COO)
We represent a sparse matrix as an array of 3-tuples: `(Row, Column, Value)`.
- Row 0 stores metadata: `[Total Rows, Total Cols, Total Non-Zero Elements (NZ)]`.
- The subsequent `NZ` rows store the coordinates and values of non-zero entries.

```
Triplet (3-Tuple) Representation Table:
Index | Row | Col | Value
------+-----+-----+-------
[0]   |  5  |  4  |   4   <-- Metadata (Rows=5, Cols=4, NonZero=4)
[1]   |  0  |  3  |   9
[2]   |  1  |  1  |   5
[3]   |  3  |  0  |   7
[4]   |  4  |  2  |   3
```

Memory reduction: Storing 4 non-zero elements requires only $5 \\times 3 \\times 4\\text{ bytes} = 60\\text{ bytes}$, down from $5 \\times 4 \\times 4 = 80\\text{ bytes}$, scaling exponentially as matrix dimensions grow to millions of rows.

---

> [!IMPORTANT] **MEMORIZE:**
> - Row-Major: Multiply row index offset by total number of **Columns** ($N$): $[i \\times N + j] \\times W$.
> - Column-Major: Multiply column index offset by total number of **Rows** ($M$): $[j \\times M + i] \\times W$.

> [!NOTE] **DEV BRAIN:**
> In high-performance computing, numerical packages use specialized sparse formats: CSR (Compressed Sparse Row) and CSC (Compressed Sparse Column) to perform fast sparse matrix-vector multiplications ($SpMV$) in machine learning pipelines.

> [!WARNING] **TRAP:**
> Watch out for non-zero indexed matrices in university exams! If array bounds are $A[1 \\dots 10][1 \\dots 20]$, you must subtract the lower bounds: $(i - 1) \\times 20 + (j - 1)$. Forgetting lower bounds produces incorrect address calculations!

> [!TIP] **EXAM TIP:**
> When calculating 2D address, always explicitly list: (1) Base Address $\\text{BA}$, (2) Element size $W$, (3) Number of columns $N = U_c - L_c + 1$, (4) Number of rows $M = U_r - L_r + 1$, and then substitute step-by-step into the formula.""",
            "shortNotes": "1D Address = BA + i*W. 2D Row-Major = BA + [i*Cols + j]*W; Col-Major = BA + [j*Rows + i]*W. Sparse matrices compress zeroes using 3-tuple (Row, Col, Value) arrays.",
            "examples": [
                {
                    "title": "Address Calculation & Sparse Matrix Triplet Conversion in C",
                    "problem": "Calculate memory address for A[4][7] under Row-Major and Column-Major order (Base=1000, size=4 bytes, bounds [0..5][0..9]), and convert a dense matrix to 3-tuple sparse matrix.",
                    "explanation": "Demonstrates theoretical address validation and dynamic triplet construction from a dense sparse matrix.",
                    "code": """#include <stdio.h>

#define ROWS 4
#define COLS 5

typedef struct {
    int row;
    int col;
    int val;
} Element;

void calculateAddresses() {
    int BA = 1000;
    int W = 4;
    int Lr = 0, Ur = 5;
    int Lc = 0, Uc = 9;
    int M = Ur - Lr + 1; // 6 rows
    int N = Uc - Lc + 1; // 10 columns
    int i = 4, j = 7;

    int addrRMO = BA + ((i - Lr) * N + (j - Lc)) * W;
    int addrCMO = BA + ((j - Lc) * M + (i - Lr)) * W;

    printf("Address Calculations for A[4][7]:\\n");
    printf("  Row-Major Order Address    : %d\\n", addrRMO);
    printf("  Column-Major Order Address : %d\\n\\n", addrCMO);
}

void createSparseMatrix(int matrix[ROWS][COLS]) {
    Element sparse[ROWS * COLS + 1];
    int k = 1;

    for (int i = 0; i < ROWS; i++) {
        for (int j = 0; j < COLS; j++) {
            if (matrix[i][j] != 0) {
                sparse[k].row = i;
                sparse[k].col = j;
                sparse[k].val = matrix[i][j];
                k++;
            }
        }
    }
    sparse[0].row = ROWS;
    sparse[0].col = COLS;
    sparse[0].val = k - 1; // Total non-zero count

    printf("Sparse Matrix Triplet (3-Tuple) Representation:\\n");
    printf("Row | Col | Value\\n");
    printf("----+-----+------\\n");
    for (int i = 0; i < k; i++) {
        printf("%3d | %3d | %5d\\n", sparse[i].row, sparse[i].col, sparse[i].val);
    }
}

int main() {
    calculateAddresses();

    int matrix[ROWS][COLS] = {
        {0, 0, 8, 0, 0},
        {3, 0, 0, 0, 0},
        {0, 0, 0, 0, 5},
        {0, 9, 0, 0, 0}
    };
    createSparseMatrix(matrix);

    return 0;
}""",
                    "output": """Address Calculations for A[4][7]:
  Row-Major Order Address    : 1188
  Column-Major Order Address : 1184

Sparse Matrix Triplet (3-Tuple) Representation:
Row | Col | Value
----+-----+------
  4 |   5 |     4
  0 |   2 |     8
  1 |   0 |     3
  2 |   4 |     5
  3 |   1 |     9"""
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
                    "answer": """1. **Given Parameters**:
   - Row bounds: $L_r = 2, U_r = 8 \\implies \\text{Number of rows } M = U_r - L_r + 1 = 8 - 2 + 1 = 7$.
   - Column bounds: $L_c = -1, U_c = 5 \\implies \\text{Number of columns } N = U_c - L_c + 1 = 5 - (-1) + 1 = 7$.
   - Target indices: $i = 5, j = 2$.
   - Base Address $\\text{BA} = 400$.
   - Element size $W = 4$ bytes.

2. **(a) Row-Major Order (RMO)**:
   $$\\text{Address}(A[i, j]) = \\text{BA} + [ (i - L_r) \\times N + (j - L_c) ] \\times W$$
   $$\\text{Offset} = (5 - 2) \\times 7 + (2 - (-1)) = (3 \\times 7) + (3) = 21 + 3 = 24$$
   $$\\text{Address}(A[5, 2]) = 400 + (24 \\times 4) = 400 + 96 = 496$$

3. **(b) Column-Major Order (CMO)**:
   $$\\text{Address}(A[i, j]) = \\text{BA} + [ (j - L_c) \\times M + (i - L_r) ] \\times W$$
   $$\\text{Offset} = (2 - (-1)) \\times 7 + (5 - 2) = (3 \\times 7) + (3) = 21 + 3 = 24$$
   $$\\text{Address}(A[5, 2]) = 400 + (24 \\times 4) = 400 + 96 = 496$$

*(Note: Both values coincide here because row count $M$ and column count $N$ happen to be identical ($7$), and $(i - L_r) = (j - L_c) = 3$.)*""",
                    "keyPoints": [
                        "Calculation of dimension counts: M = 7 rows, N = 7 columns.",
                        "Step-by-step substitution into Row-Major formula giving 496.",
                        "Step-by-step substitution into Column-Major formula giving 496."
                    ]
                },
                {
                    "question": "What is a Sparse Matrix? Explain why dense 2D array representation is inefficient for sparse matrices, and describe the 3-Tuple (Triplet) representation.",
                    "marks": "5 Marks",
                    "answer": """1. **Definition**: A sparse matrix is a matrix in which the number of zero elements is substantially greater than the number of non-zero elements (typically $> 75\\%$ zero entries).

2. **Inefficiency of Dense Storage**:
   - **Wasted Memory**: Storing zeroes in a standard 2D array of size $M \\times N$ consumes $M \\times N \\times W$ bytes of memory. For a $10^5 \\times 10^5$ matrix with only 10,000 non-zero items, dense storage requires 40 GB of RAM.
   - **Wasted CPU Cycles**: Traversing or multiplying dense matrices involves evaluating billions of trivial multiplications with zero ($0 \\times x = 0$).

3. **Triplet (3-Tuple) Representation**:
   - Non-zero elements are stored in a 2D array of shape $(NZ + 1) \\times 3$.
   - **Row 0 (Header)**: Holds `[Total Rows, Total Columns, Total Non-Zero Elements]`.
   - **Rows 1 to NZ**: Each row contains `[row_index, col_index, non_zero_value]`.
   - Space complexity drops from $\\mathcal{O}(M \\times N)$ to $\\mathcal{O}(NZ)$, yielding massive storage savings.""",
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
            "detailedExplanation": """## 1. Node Anatomy and Heap Dynamic Allocation

An array requires a contiguous block of physical RAM allocated up front. In contrast, a **Singly Linked List (SLL)** allocates individual nodes dynamically in the application heap using runtime memory allocators (`malloc` in C, `new` in C++ / Java).

```mermaid
graph LR
    subgraph SLL ["Singly Linked List Architecture"]
        HEAD["head"] --> N1["Node 1\n[Data: 10 | Next]"]
        N1 --> N2["Node 2\n[Data: 20 | Next]"]
        N2 --> N3["Node 3\n[Data: 30 | Next: NULL]"]
    end
```

### Physical Node Memory Layout
Each node contains two fields:
1. `data`: The payload (primitive type or composite struct/object).
2. `next`: A pointer (memory address) storing the location of the successor node in heap space. The terminal node has `next = NULL`.

```c
typedef struct Node {
    int data;
    struct Node *next;
} Node;
```

---

## 2. Pointer Manipulation Algorithms

The integrity of a linked list relies entirely on preserving pointer links. **The golden rule of pointer updates**: *Always connect the new node's outgoing pointer to the existing chain before modifying any predecessor's pointer, preventing orphan memory leaks.*

```mermaid
flowchart TD
    subgraph Insert_Head ["Insertion at Head: O(1)"]
        IH1["1. Allocate newNode\nnewNode->data = val"]
        IH2["2. Connect to existing chain\nnewNode->next = head"]
        IH3["3. Update head reference\nhead = newNode"]
        IH1 --> IH2 --> IH3
    end

    subgraph Delete_Head ["Deletion at Head: O(1)"]
        DH1["1. Check head != NULL"]
        DH2["2. temp = head\nhead = head->next"]
        DH3["3. free(temp)"]
        DH1 --> DH2 --> DH3
    end
```

### A. Insertion Operations

1. **Insertion at Head ($O(1)$ Time)**:
   - Create `newNode`.
   - `newNode->next = head`.
   - `head = newNode`.

2. **Insertion at Tail ($O(n)$ without tail pointer, $O(1)$ with tail pointer)**:
   - Create `newNode` with `newNode->next = NULL`.
   - If `head == NULL`, set `head = newNode`.
   - Else, traverse with `curr` until `curr->next == NULL`.
   - `curr->next = newNode`.

3. **Insertion After a Given Node ($O(1)$ Time)**:
   - Given pointer `prevNode`.
   - `newNode->next = prevNode->next`.
   - `prevNode->next = newNode`.

### B. Deletion Operations

1. **Deletion at Head ($O(1)$ Time)**:
   - Check if `head == NULL` (underflow).
   - `temp = head`.
   - `head = head->next`.
   - `free(temp)`.

2. **Deletion at Tail ($O(n)$ Time)**:
   - If single node: `free(head); head = NULL;`.
   - Traverse with `curr` until `curr->next->next == NULL`.
   - `free(curr->next)`.
   - `curr->next = NULL`.

3. **Deletion of Arbitrary Node by Key ($O(n)$ Search + $O(1)$ Splice)**:
   - Maintain `prev` and `curr` pointers.
   - Advance until `curr->data == key`.
   - `prev->next = curr->next`.
   - `free(curr)`.

---

## 3. Arrays vs Singly Linked Lists: Structural Trade-offs

| Criterion | Dynamic Array (`std::vector`) | Singly Linked List |
| :--- | :--- | :--- |
| **Memory Allocation** | Single contiguous block; reallocated when capacity is exceeded. | Dispersed individual heap allocations on demand. |
| **Random Access** | $\\mathcal{O}(1)$ via index arithmetic. | $\\mathcal{O}(n)$ sequential pointer chasing. |
| **Insert / Delete at Head**| $\\mathcal{O}(n)$ due to shifting elements. | $\\mathcal{O}(1)$ pointer reassignment. |
| **Insert / Delete at Tail**| $\\mathcal{O}(1)$ amortized. | $\\mathcal{O}(1)$ with tail pointer (deletion is still $\\mathcal{O}(n)$). |
| **Memory Overhead** | Unused reserved capacity buffer. | Extra pointer per node (8 bytes on 64-bit systems). |
| **Cache Locality** | Outstanding (CPU hardware prefetching). | Poor (pointer chasing causes frequent L1/L2 cache misses). |

---

> [!IMPORTANT] **MEMORIZE:**
> In Singly Linked Lists, deleting the **tail node** requires $\\mathcal{O}(n)$ time even if you maintain a direct `tail` pointer, because you must update the *second-to-last* node's `next` pointer to `NULL`, which requires traversing from `head`!

> [!NOTE] **DEV BRAIN:**
> In modern systems with deep memory hierarchies, dynamic arrays frequently outperform linked lists even on insertions, because contiguous memory layout exploits CPU cache prefetching, while linked list pointer chasing incurs cache misses.

> [!WARNING] **TRAP:**
> Never write `free(temp)` before `head = head->next`. Accessing `temp->next` after `free(temp)` is a critical **Use-After-Free** security vulnerability and undefined behavior!

> [!TIP] **EXAM TIP:**
> When writing linked list algorithms in exams, ALWAYS explicitly handle edge cases: (1) Empty list (`head == NULL`), (2) Single-node list (`head->next == NULL`), and (3) Target element not found.""",
            "shortNotes": "SLL nodes contain data and next pointer. Insert/delete at head is O(1); arbitrary access is O(n). Deleting tail is O(n) without predecessor pointer. Memory is non-contiguous.",
            "examples": [
                {
                    "title": "Complete C Implementation of Singly Linked List with Core Operations",
                    "problem": "Implement a complete Singly Linked List supporting insertAtHead, insertAtTail, deleteHead, deleteByKey, and display.",
                    "explanation": "Demonstrates proper pointer manipulation, handling boundary conditions, and preventing memory leaks using free().",
                    "code": """#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node *next;
} Node;

Node* createNode(int value) {
    Node *newNode = (Node*)malloc(sizeof(Node));
    newNode->data = value;
    newNode->next = NULL;
    return newNode;
}

void insertAtHead(Node **head, int value) {
    Node *newNode = createNode(value);
    newNode->next = *head;
    *head = newNode;
}

void insertAtTail(Node **head, int value) {
    Node *newNode = createNode(value);
    if (*head == NULL) {
        *head = newNode;
        return;
    }
    Node *curr = *head;
    while (curr->next != NULL) {
        curr = curr->next;
    }
    curr->next = newNode;
}

void deleteHead(Node **head) {
    if (*head == NULL) return;
    Node *temp = *head;
    *head = (*head)->next;
    free(temp);
}

void deleteByKey(Node **head, int key) {
    if (*head == NULL) return;
    if ((*head)->data == key) {
        deleteHead(head);
        return;
    }
    Node *curr = *head;
    while (curr->next != NULL && curr->next->data != key) {
        curr = curr->next;
    }
    if (curr->next != NULL) {
        Node *temp = curr->next;
        curr->next = temp->next;
        free(temp);
    }
}

void printList(Node *head) {
    Node *curr = head;
    printf("Head -> ");
    while (curr != NULL) {
        printf("[%d] -> ", curr->data);
        curr = curr->next;
    }
    printf("NULL\\n");
}

int main() {
    Node *head = NULL;

    insertAtHead(&head, 30);
    insertAtHead(&head, 10);
    insertAtTail(&head, 40);
    insertAtTail(&head, 50);
    printList(head);

    deleteHead(&head);
    printf("After deleteHead:\\n");
    printList(head);

    deleteByKey(&head, 40);
    printf("After deleting key 40:\\n");
    printList(head);

    return 0;
}""",
                    "output": """Head -> [10] -> [30] -> [40] -> [50] -> NULL
After deleteHead:
Head -> [30] -> [40] -> [50] -> NULL
After deleting key 40:
Head -> [30] -> [50] -> NULL"""
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
                    "answer": """1. **Algorithm for Insertion at Position $P$ (1-indexed)**:
   - **Step 1**: If $P = 1$, call `insertAtHead(val)` and return.
   - **Step 2**: Traverse the list using pointer `curr` initialized to `head` and counter $i = 1$ until $i = P - 1$ or `curr == NULL`.
   - **Step 3**: If `curr == NULL`, position is out of bounds; abort.
   - **Step 4**: Allocate `newNode = malloc(sizeof(Node))`; assign `newNode->data = val`.
   - **Step 5**: Set `newNode->next = curr->next`.
   - **Step 6**: Set `curr->next = newNode`.

2. **Crucial Edge Cases**:
   - **Empty List ($head == NULL$)**: If $P = 1$, new node becomes head; if $P > 1$, invalid position error.
   - **Insertion at Head ($P = 1$)**: Modifies the global list head pointer.
   - **Insertion at Tail ($P = N + 1$)**: `curr->next` is `NULL`, so `newNode->next` becomes `NULL`.
   - **Position Out of Range ($P > N + 1$)**: Traversal reaches `NULL` before counter hits $P - 1$.""",
                    "keyPoints": [
                        "Step-by-step algorithm linking newNode before updating predecessor.",
                        "Special handling of head position (P=1).",
                        "Edge cases: Empty list, tail boundary, out-of-bounds index."
                    ]
                },
                {
                    "question": "Compare Arrays and Singly Linked Lists in detail. Under what software requirements should an engineer prefer a Linked List over an Array?",
                    "marks": "7 Marks",
                    "answer": """1. **Comparison Across Core Architectural Dimensions**:
   - **Memory Layout**: Arrays require contiguous physical memory; Linked Lists utilize non-contiguous heap allocations.
   - **Access Complexity**: Arrays support $\\mathcal{O}(1)$ random access ($A[i]$); Linked Lists require $\\mathcal{O}(n)$ sequential pointer traversal.
   - **Insertion/Deletion**: Arrays require $\\mathcal{O}(n)$ shifting; Linked Lists require $\\mathcal{O}(1)$ pointer updates once the target position is found.
   - **Memory Overhead**: Arrays have minimal overhead (reserved unused slots); Linked Lists require 8 bytes per node for pointers on 64-bit systems.
   - **Cache Locality**: Arrays exhibit excellent spatial locality (CPU prefetching); Linked Lists suffer from cache thrashing.

2. **When to Choose a Linked List**:
   - **Unknown or Rapidly Fluctuating Collection Size**: Prevents repeated array resizing allocations.
   - **Frequent Insertions/Deletions at Head/Front**: Such as building undo stacks or real-time FIFO message queues.
   - **No Requirement for Random Index Access**: Workloads only process items sequentially.""",
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
            "detailedExplanation": """## 1. Architectural Anatomy of a Doubly Linked List

A major limitation of Singly Linked Lists is the inability to navigate backward: once you advance past a node, you cannot return to its predecessor without restarting from `head`. 

A **Doubly Linked List (DLL)** overcomes this by maintaining two pointer references per node:
- `data`: Node value payload.
- `next`: Memory address of the successor node (`NULL` at tail).
- `prev`: Memory address of the predecessor node (`NULL` at head).

```mermaid
graph LR
    subgraph DLL ["Doubly Linked List Architecture"]
        HEAD["head"] --> N1["Node 1\nprev: NULL\ndata: 10\nnext"]
        N1 -->|next| N2["Node 2\nprev\ndata: 20\nnext"]
        N2 -->|prev| N1
        N2 -->|next| N3["Node 3\nprev\ndata: 30\nnext: NULL"]
        N3 -->|prev| N2
        TAIL["tail"] --> N3
    end
```

### C Node Structure
```c
typedef struct DLLNode {
    int data;
    struct DLLNode *prev;
    struct DLLNode *next;
} DLLNode;
```

---

## 2. Pointer Mutation Mechanics

Because every node is tethered by two independent pointers, **every insertion or deletion requires updating up to four pointer references**. Careless reassignments break the two-way invariant, resulting in orphaned sublists or infinite loops.

```mermaid
flowchart TD
    subgraph Insert_Between ["Inserting newNode between A and B"]
        S1["1. newNode->prev = A"]
        S2["2. newNode->next = B"]
        S3["3. A->next = newNode"]
        S4["4. B->prev = newNode"]
        S1 --> S2 --> S3 --> S4
    end
```

### A. Insertion Operations

1. **Insert at Head ($O(1)$ Time)**:
   - Create `newNode` with `prev = NULL` and `next = head`.
   - If `head != NULL`, set `head->prev = newNode`.
   - Update `head = newNode`.

2. **Insert at Tail with Tail Pointer ($O(1)$ Time)**:
   - Create `newNode` with `next = NULL` and `prev = tail`.
   - If `tail != NULL`, set `tail->next = newNode`.
   - Update `tail = newNode`.

3. **Insert After Given Node `curr` ($O(1)$ Time)**:
   - Create `newNode`.
   - `newNode->next = curr->next`.
   - `newNode->prev = curr`.
   - If `curr->next != NULL`, `curr->next->prev = newNode`.
   - `curr->next = newNode`.

### B. Deletion Operations

1. **Delete Given Node `target` ($O(1)$ Time)**:
   - If `target->prev != NULL`, `target->prev->next = target->next`; else `head = target->next`.
   - If `target->next != NULL`, `target->next->prev = target->prev`; else `tail = target->prev`.
   - `free(target)`.

*This highlights the great advantage of DLL: we can delete any node in $O(1)$ time without traversing from `head` to find its predecessor.*

---

## 3. Bidirectional Traversals

A DLL enables seamless bidirectional navigation:
- **Forward Traversal**: Start at `head`, loop while `curr != NULL`, stepping `curr = curr->next`.
- **Backward Traversal**: Start at `tail`, loop while `curr != NULL`, stepping `curr = curr->prev`.

### Real-World Applications
1. **Web Browser History**: Clicking "Back" and "Forward" buttons moves along a doubly linked list of visited URLs.
2. **Music Player Playlists**: Navigating to next song or returning to previous track.
3. **LRU (Least Recently Used) Cache**: Combining a Hash Table with a DLL allows $O(1)$ eviction from tail and $O(1)$ promotion to head.

---

> [!IMPORTANT] **MEMORIZE:**
> Deleting a known node in a Singly Linked List requires $\\mathcal{O}(n)$ time because the predecessor pointer must be located by traversing from `head`. In a Doubly Linked List, deletion of a known node is strictly $\\mathcal{O}(1)$ because `target->prev` is immediately available!

> [!NOTE] **DEV BRAIN:**
> The Linux kernel uses an intrusive circular doubly linked list (`struct list_head`) for process scheduling tables, device drivers, and network buffers due to its consistent $O(1)$ insertion and removal mechanics.

> [!WARNING] **TRAP:**
> Always verify boundary checks for `NULL` before accessing `curr->next->prev`! If `curr` is the last node in the list, `curr->next` is `NULL`, and dereferencing it triggers a Segmentation Fault (Crash).

> [!TIP] **EXAM TIP:**
> When asked to write the insertion algorithm between nodes $A$ and $B$, write down the four pointer steps in exact order: (1) `newNode->next = B`, (2) `newNode->prev = A`, (3) `A->next = newNode`, (4) `B->prev = newNode`.""",
            "shortNotes": "DLL nodes store data, prev, and next pointers. Enables bidirectional traversal. Deleting a given node is O(1) without predecessor search. Consumes 2x pointer memory.",
            "examples": [
                {
                    "title": "Full C Implementation of Doubly Linked List with Two-Way Traversal",
                    "problem": "Implement a Doubly Linked List supporting insertAtHead, insertAtTail, deleteNode, forward traversal, and backward traversal.",
                    "explanation": "Demonstrates bidirectional pointer wiring, maintaining head and tail references, and O(1) node deletion.",
                    "code": """#include <stdio.h>
#include <stdlib.h>

typedef struct DLLNode {
    int data;
    struct DLLNode *prev;
    struct DLLNode *next;
} DLLNode;

DLLNode* createDLLNode(int val) {
    DLLNode *node = (DLLNode*)malloc(sizeof(DLLNode));
    node->data = val;
    node->prev = NULL;
    node->next = NULL;
    return node;
}

void insertHead(DLLNode **head, DLLNode **tail, int val) {
    DLLNode *node = createDLLNode(val);
    if (*head == NULL) {
        *head = *tail = node;
        return;
    }
    node->next = *head;
    (*head)->prev = node;
    *head = node;
}

void insertTail(DLLNode **head, DLLNode **tail, int val) {
    DLLNode *node = createDLLNode(val);
    if (*tail == NULL) {
        *head = *tail = node;
        return;
    }
    node->prev = *tail;
    (*tail)->next = node;
    *tail = node;
}

void deleteNode(DLLNode **head, DLLNode **tail, DLLNode *target) {
    if (*head == NULL || target == NULL) return;

    if (*head == target) *head = target->next;
    if (*tail == target) *tail = target->prev;

    if (target->prev != NULL) target->prev->next = target->next;
    if (target->next != NULL) target->next->prev = target->prev;

    free(target);
}

void printForward(DLLNode *head) {
    printf("Forward  : NULL <-> ");
    DLLNode *curr = head;
    while (curr != NULL) {
        printf("[%d] <-> ", curr->data);
        curr = curr->next;
    }
    printf("NULL\\n");
}

void printBackward(DLLNode *tail) {
    printf("Backward : NULL <-> ");
    DLLNode *curr = tail;
    while (curr != NULL) {
        printf("[%d] <-> ", curr->data);
        curr = curr->prev;
    }
    printf("NULL\\n");
}

int main() {
    DLLNode *head = NULL;
    DLLNode *tail = NULL;

    insertHead(&head, &tail, 20);
    insertHead(&head, &tail, 10);
    insertTail(&head, &tail, 30);
    insertTail(&head, &tail, 40);

    printForward(head);
    printBackward(tail);

    // Delete node with value 30 (head->next->next)
    printf("\\nDeleting node with value 30...\\n");
    deleteNode(&head, &tail, head->next->next);

    printForward(head);
    printBackward(tail);

    return 0;
}""",
                    "output": """Forward  : NULL <-> [10] <-> [20] <-> [30] <-> [40] <-> NULL
Backward : NULL <-> [40] <-> [30] <-> [20] <-> [10] <-> NULL

Deleting node with value 30...
Forward  : NULL <-> [10] <-> [20] <-> [40] <-> NULL
Backward : NULL <-> [40] <-> [20] <-> [10] <-> NULL"""
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
                    "answer": """1. **Algorithm to Delete Node `target`**:
   - **Step 1**: Check if `target == NULL`; if true, exit immediately.
   - **Step 2 (Predecessor Update)**:
     If `target->prev != NULL`:
         `target->prev->next = target->next;`
     Else (`target` is head):
         `head = target->next;`
   - **Step 3 (Successor Update)**:
     If `target->next != NULL`:
         `target->next->prev = target->prev;`
     Else (`target` is tail):
         `tail = target->prev;`
   - **Step 4**: Free allocated memory: `free(target);`.

2. **Edge Cases Handled**:
   - **Deleting Head Node**: `target->prev == NULL`. Global `head` pointer moves to `target->next`.
   - **Deleting Tail Node**: `target->next == NULL`. Global `tail` pointer retreats to `target->prev`.
   - **Deleting Only Remaining Node**: Both `head` and `tail` become `NULL`.""",
                    "keyPoints": [
                        "Complete algorithm updating both prev and next references.",
                        "Handling head deletion without null pointer dereference.",
                        "Handling tail deletion and single-node list condition."
                    ]
                },
                {
                    "question": "Differentiate between Singly Linked List (SLL) and Doubly Linked List (DLL) in terms of node layout, space overhead, algorithmic efficiency, and real-world use cases.",
                    "marks": "7 Marks",
                    "answer": """1. **Node Layout & Pointer Symmetry**:
   - **SLL**: Single forward pointer (`next`). Linear unidirectional traversal only.
   - **DLL**: Dual pointers (`prev` and `next`). Bidirectional traversal.

2. **Comparative Complexity Matrix**:
   - **Memory Overhead**: SLL requires 1 pointer per node; DLL requires 2 pointers per node (100% higher pointer overhead).
   - **Search Time**: Both require $\\mathcal{O}(n)$ worst-case search.
   - **Delete Given Node Pointer**: SLL takes $\\mathcal{O}(n)$ because predecessor must be found; DLL takes $\\mathcal{O}(1)$ directly via `target->prev`.
   - **Reversal Complexity**: SLL requires updating all $n$ pointers; DLL can be traversed in reverse natively via `tail` in $\\mathcal{O}(1)$ initialization.

3. **Engineering Use Cases**:
   - **SLL Preferred**: Memory-constrained embedded systems, simple forward processing, single-ended stacks.
   - **DLL Preferred**: LRU cache implementations, browser history navigation, operating system process tables, text editor cursor navigation.""",
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
            "detailedExplanation": """## 1. Circular Linked List Topologies

In standard linked lists, `NULL` marks the boundary of the list. In a **Circular Linked List (CLL)**, there is no end: the structure forms a closed continuous loop.

```mermaid
graph LR
    subgraph CSLL ["Circular Singly Linked List (CSLL)"]
        N1["Node 1\n[Data: 10]"] -->|next| N2["Node 2\n[Data: 20]"]
        N2 -->|next| N3["Node 3\n[Data: 30]"]
        N3 -->|next loops back| N1
        TAIL["tail"] --> N3
    end
```

### Variants
1. **Circular Singly Linked List (CSLL)**: The `next` pointer of the last node points back to `head`.
2. **Circular Doubly Linked List (CDLL)**:
   - `lastNode->next = head`
   - `head->prev = lastNode`
   This forms a complete bidirectional ring where every node has valid predecessor and successor references.

---

## 2. The Tail-Pointer Optimization

In a linear linked list, maintaining a `head` pointer is standard. In a **Circular Singly Linked List**, maintaining a single `tail` pointer instead of a `head` pointer provides a powerful optimization:
- The head node is accessible in $O(1)$ time via `tail->next`.
- The tail node is accessible in $O(1)$ time directly via `tail`.
- **Insert at Head**: Takes $O(1)$ time (`newNode->next = tail->next; tail->next = newNode;`).
- **Insert at Tail**: Takes $O(1)$ time (same as head insert, followed by `tail = newNode;`).

```mermaid
flowchart TD
    subgraph TailOpt ["Tail Pointer Advantage: O(1) Head & Tail Insert"]
        T["tail pointer points to Node 3"]
        T -->|tail->next| H["head (Node 1)"]
        H -->|next| M["Node 2"]
        M -->|next| T
    end
```

---

## 3. Loop Traversal and Boundary Traps

Because a circular list lacks `NULL`, a naive while loop (`while (curr != NULL)`) results in an **infinite loop**, locking the processor.

### Correct Traversal Idiom: `do-while` Loop
```c
if (head != NULL) {
    Node *curr = head;
    do {
        printf("%d ", curr->data);
        curr = curr->next;
    } while (curr != head); // Terminate when loop circles back to start
}
```

### Boundary Edge Cases
1. **Empty List**: `head == NULL`.
2. **Single-Node List**: `head->next == head`. Deleting this sole node requires setting `head = NULL`.
3. **Splitting a Circular List into Two Halves**: Uses Floyd's fast and slow pointers, followed by closing the two loops independently.

---

## 4. Real-World Application: Round-Robin CPU Scheduling

Operating system kernels schedule concurrent processes using the **Round-Robin (RR)** scheduling algorithm. Each process receives a fixed time slice (time quantum $q$, e.g., $10\\text{ ms}$).

```mermaid
sequenceDiagram
    autonumber
    participant CPU as OS Scheduler (CPU)
    participant P1 as Process P1 (Quantum=10ms)
    participant P2 as Process P2 (Quantum=10ms)
    participant P3 as Process P3 (Quantum=10ms)

    CPU->>P1: Execute P1 for 10ms
    Note over P1: Quantum expires -> Move to next node in Circular List
    CPU->>P2: Execute P2 for 10ms
    Note over P2: Quantum expires -> Move to next node
    CPU->>P3: Execute P3 for 10ms
    Note over P3: Quantum expires -> Loops back to P1!
    CPU->>P1: Resume P1 execution
```

If a process finishes its total CPU burst, it is spliced out of the circular list in $O(1)$ time; if not, the scheduler advances pointer `curr = curr->next` to grant the next process its time slice.

---

> [!IMPORTANT] **MEMORIZE:**
> In a Circular Linked List, always maintain a pointer to **TAIL**, not head! With only a `tail` pointer, both head operations (`tail->next`) and tail operations (`tail`) run in $\\mathcal{O}(1)$ time.

> [!NOTE] **DEV BRAIN:**
> Circular ring buffers (implemented over arrays or circular lists) power audio streaming buffers, video playback queues, and multiplayer game server tick loops where old frames are continuously recycled.

> [!WARNING] **TRAP:**
> Never write `while (curr->next != NULL)` in a circular list! It will never terminate. Always use `curr != head` or loop termination checks based on node count!

> [!TIP] **EXAM TIP:**
> When asked to implement Round-Robin scheduling using a linked list in university exams, explicitly describe why Circular Linked List is the ideal data structure: cyclic topology eliminates end-of-list reset overhead.""",
            "shortNotes": "CLL has no NULL pointers; tail points to head. Maintaining a tail pointer enables O(1) head and tail insertions. Standard traversal uses do-while (curr != head). Powers OS Round-Robin scheduling.",
            "examples": [
                {
                    "title": "Complete C Implementation of Circular Linked List with Round-Robin Simulation",
                    "problem": "Implement a Circular Singly Linked List using a tail pointer and simulate Round-Robin CPU process time sharing.",
                    "explanation": "Demonstrates tail-pointer circular insertion, loop traversal via do-while, and cyclical execution decrement.",
                    "code": """#include <stdio.h>
#include <stdlib.h>

typedef struct ProcessNode {
    int pid;
    int remainingBurst;
    struct ProcessNode *next;
} ProcessNode;

ProcessNode* createProcess(int pid, int burst) {
    ProcessNode *node = (ProcessNode*)malloc(sizeof(ProcessNode));
    node->pid = pid;
    node->remainingBurst = burst;
    node->next = NULL;
    return node;
}

// Insert at tail in O(1) using tail pointer
void addProcess(ProcessNode **tail, int pid, int burst) {
    ProcessNode *newNode = createProcess(pid, burst);
    if (*tail == NULL) {
        *tail = newNode;
        newNode->next = newNode; // Points to itself
        return;
    }
    newNode->next = (*tail)->next;
    (*tail)->next = newNode;
    *tail = newNode;
}

void simulateRoundRobin(ProcessNode **tail, int quantum) {
    if (*tail == NULL) return;
    ProcessNode *curr = (*tail)->next; // Start at head
    ProcessNode *prev = *tail;

    printf("Starting Round-Robin Scheduling (Time Quantum = %d ms):\\n", quantum);

    while (*tail != NULL) {
        printf("  [CPU] Process P%d running (Remaining: %d ms)...\\n", 
               curr->pid, curr->remainingBurst);

        if (curr->remainingBurst <= quantum) {
            printf("  --> Process P%d COMPLETED! Deallocating.\\n", curr->pid);
            if (curr == curr->next) { // Only one node left
                free(curr);
                *tail = NULL;
                break;
            } else {
                prev->next = curr->next;
                if (curr == *tail) *tail = prev; // Update tail if deleted
                ProcessNode *toDelete = curr;
                curr = curr->next;
                free(toDelete);
            }
        } else {
            curr->remainingBurst -= quantum;
            printf("  --> Process P%d preempted. Remaining: %d ms.\\n", 
                   curr->pid, curr->remainingBurst);
            prev = curr;
            curr = curr->next;
        }
    }
    printf("All processes executed successfully.\\n");
}

int main() {
    ProcessNode *tail = NULL;

    addProcess(&tail, 1, 25);
    addProcess(&tail, 2, 10);
    addProcess(&tail, 3, 15);

    simulateRoundRobin(&tail, 10);

    return 0;
}""",
                    "output": """Starting Round-Robin Scheduling (Time Quantum = 10 ms):
  [CPU] Process P1 running (Remaining: 25 ms)...
  --> Process P1 preempted. Remaining: 15 ms.
  [CPU] Process P2 running (Remaining: 10 ms)...
  --> Process P2 COMPLETED! Deallocating.
  [CPU] Process P3 running (Remaining: 15 ms)...
  --> Process P3 preempted. Remaining: 5 ms.
  [CPU] Process P1 running (Remaining: 15 ms)...
  --> Process P1 preempted. Remaining: 5 ms.
  [CPU] Process P3 running (Remaining: 5 ms)...
  --> Process P3 COMPLETED! Deallocating.
  [CPU] Process P1 running (Remaining: 5 ms)...
  --> Process P1 COMPLETED! Deallocating.
All processes executed successfully."""
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
                    "answer": """1. **The Architectural Advantage**:
   - In a Circular Singly Linked List (CSLL), the tail node directly points to the head node: `head = tail->next`.
   - Therefore, having a pointer to `tail` provides immediate $\\mathcal{O}(1)$ access to **both** the tail node AND the head node.

2. **Comparative Complexity**:
   - **With Head Pointer Only**:
     * Insert at Head: Requires traversing the entire list ($O(n)$) to update the last node's `next` pointer to point to the new head.
     * Insert at Tail: Requires traversing the entire list ($O(n)$) to locate the tail.
   - **With Tail Pointer**:
     * Insert at Head: $\\mathcal{O}(1)$ time. `newNode->next = tail->next; tail->next = newNode;`.
     * Insert at Tail: $\\mathcal{O}(1)$ time. Same pointer linking as head insert, followed by `tail = newNode;`.

3. **Conclusion**:
   Maintaining a `tail` pointer reduces head and tail insertion operations from $\\mathcal{O}(n)$ down to $\\mathcal{O}(1)$ without extra pointer fields.""",
                    "keyPoints": [
                        "Direct O(1) access to both head (tail->next) and tail.",
                        "Elimination of O(n) traversal for head/tail insertions.",
                        "Code snippets comparing head vs tail pointer implementations."
                    ]
                },
                {
                    "question": "Describe how Circular Linked Lists are applied in Round-Robin CPU scheduling. What operations occur when a process completes its quantum versus when it finishes its burst?",
                    "marks": "5 Marks",
                    "answer": """1. **System Modeling**:
   - In operating systems, the ready queue is modeled as a Circular Linked List where each node represents a Process Control Block (PCB).
   - The CPU scheduler holds a pointer `currentProcess` referencing the running task.

2. **When Quantum Expires (Preemption)**:
   - If the process has remaining CPU burst time ($> 0$), the scheduler simply advances its pointer:
     `currentProcess = currentProcess->next;`
   - The next process in the cycle immediately receives the CPU for the next time quantum. Zero list restructuring is required.

3. **When Process Finishes Burst (Termination)**:
   - The process node must be removed from the ready queue.
   - Using predecessor pointer `prev`, the scheduler executes an $O(1)$ deletion:
     `prev->next = currentProcess->next; free(currentProcess);`
   - `currentProcess = prev->next;`
   - The loop continues seamlessly without having to reset to a list start.""",
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
            "detailedExplanation": """## 1. Problem 1: In-Place Linked List Reversal

Reversing a singly linked list means transforming $1 \\to 2 \\to 3 \\to \\text{NULL}$ into $3 \\to 2 \\to 1 \\to \\text{NULL}$ without allocating new nodes in memory.

### A. Iterative Three-Pointer Approach (In-Place, $\\mathcal{O}(n)$ Time, $\\mathcal{O}(1)$ Space)
We maintain three sliding pointers:
- `prev`: Tracks the reversed prefix (initialized to `NULL`).
- `curr`: Points to the node currently undergoing pointer redirection (initialized to `head`).
- `next`: Temporarily preserves the unreversed suffix before `curr->next` is overwritten.

```mermaid
flowchart TD
    subgraph Iterative_Reversal ["Iterative 3-Pointer Reversal Cycle"]
        S1["1. next = curr->next (Preserve remainder)"]
        S2["2. curr->next = prev (Reverse link)"]
        S3["3. prev = curr (Slide prev forward)"]
        S4["4. curr = next (Slide curr forward)"]
        S1 --> S2 --> S3 --> S4
    end
```

### B. Recursive Approach ($\\mathcal{O}(n)$ Time, $\\mathcal{O}(n)$ Call Stack Space)
The recursive method traverses to the tail first, and reverses pointer connections during the unwind phase:
```c
Node* reverseRecursive(Node *head) {
    if (head == NULL || head->next == NULL) return head; // Base case: tail reached
    Node *newHead = reverseRecursive(head->next);
    head->next->next = head; // Make successor point back to current
    head->next = NULL;       // Break old forward link
    return newHead;
}
```

---

## 2. Problem 2: Floyd's Cycle-Finding Algorithm (Tortoise and Hare)

A cycle occurs in a linked list when a node's `next` pointer points back to a previously visited node, causing an infinite loop.

```mermaid
graph LR
    subgraph CycleList ["Linked List with Internal Cycle"]
        N1["1"] --> N2["2"]
        N2 --> N3["3"]
        N3 --> N4["4"]
        N4 --> N5["5"]
        N5 --> N3
    end
```

### Algorithm Mechanics:
1. Initialize two pointers at `head`: `slow` (Tortoise) and `fast` (Hare).
2. Move `slow` by 1 step: `slow = slow->next`.
3. Move `fast` by 2 steps: `fast = fast->next->next`.
4. **Collision Proof**: If a cycle exists, `fast` enters the cycle and reduces the relative gap by 1 node per iteration. They are guaranteed to collide in $\\mathcal{O}(n)$ steps. If `fast` or `fast->next` reaches `NULL`, the list is strictly acyclic.

```mermaid
sequenceDiagram
    autonumber
    participant S as Slow Pointer (1 step/iter)
    participant F as Fast Pointer (2 steps/iter)
    Note over S,F: Both start at Head
    Note over S,F: Iteration 1: Gap increases
    Note over S,F: Both inside Cycle: Fast is chasing Slow from behind
    Note over S,F: Relative speed = 2 - 1 = 1 node / iter
    Note over S,F: COLLISION! (slow == fast) -> Cycle Detected!
```

### Finding the Start Node of the Cycle:
Once a collision occurs:
1. Leave `slow` at the meeting node.
2. Reset `fast` to `head`.
3. Advance both `slow` and `fast` at the **same speed** (1 step per iteration).
4. **The node where they meet is the exact entry point of the cycle.**
*(Mathematical proof: Distance from head to cycle start $L_1$ equals distance from collision to cycle start $k \\cdot C - L_2$.)*

---

## 3. Problem 3: Finding the Middle Node in a Single Pass

To locate the exact middle node of a linked list:
- **Naive method**: Two passes (Pass 1 counts total nodes $N$; Pass 2 traverses to $\\lfloor N/2 \\rfloor$).
- **Optimal Fast & Slow Pointer Method**: Single pass ($\\\\mathcal{O}(n)$ time, $\\\\mathcal{O}(1)$ space).

```c
Node* findMiddle(Node *head) {
    Node *slow = head;
    Node *fast = head;
    while (fast != NULL && fast->next != NULL) {
        slow = slow->next;       // 1 step
        fast = fast->next->next; // 2 steps
    }
    return slow; // When fast reaches end, slow is at exact middle
}
```

For odd length (e.g., 5 nodes): `slow` lands on node 3.
For even length (e.g., 6 nodes): `slow` lands on node 4 (the second middle).

---

> [!IMPORTANT] **MEMORIZE:**
> - To reverse: `next = curr->next; curr->next = prev; prev = curr; curr = next;` (Return `prev` as new head).
> - Floyd's Cycle Detection: `slow` moves 1 step, `fast` moves 2 steps. Collision proves loop existence. Reset one pointer to `head` and step both by 1 to find cycle start!

> [!NOTE] **DEV BRAIN:**
> Floyd's cycle detection is not limited to linked lists. It is used in cryptography (Pollard's rho algorithm for integer factorization) and pseudo-random number generator period validation.

> [!WARNING] **TRAP:**
> In Floyd's algorithm, always check `while (fast != NULL && fast->next != NULL)`. Checking only `fast != NULL` will trigger a Segmentation Fault when attempting `fast->next->next` on an odd-length list!

> [!TIP] **EXAM TIP:**
> When asked to prove why resetting one pointer to head locates the cycle start in Floyd's algorithm, write the algebraic equation: $2(L_1 + k) = L_1 + mC + k \\implies L_1 = mC - k$.""",
            "shortNotes": "Reversal uses 3 sliding pointers (prev, curr, next) in O(n) time and O(1) space. Floyd's cycle detection uses slow (1 step) and fast (2 steps); collision proves cycle. Fast & slow finds middle node in 1 pass.",
            "examples": [
                {
                    "title": "C Program: Linked List In-Place Reversal, Middle Finding, and Floyd's Cycle Detection",
                    "problem": "Implement iterative reversal, middle node detection, and cycle detection/removal on a singly linked list.",
                    "explanation": "Demonstrates three-pointer reversal, fast/slow middle location, and Floyd's cycle detection.",
                    "code": """#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

typedef struct Node {
    int data;
    struct Node *next;
} Node;

Node* createNode(int val) {
    Node *n = (Node*)malloc(sizeof(Node));
    n->data = val;
    n->next = NULL;
    return n;
}

Node* reverseList(Node *head) {
    Node *prev = NULL;
    Node *curr = head;
    Node *next = NULL;
    while (curr != NULL) {
        next = curr->next; // 1. Save next
        curr->next = prev; // 2. Reverse pointer
        prev = curr;       // 3. Move prev
        curr = next;       // 4. Move curr
    }
    return prev; // New head
}

Node* findMiddle(Node *head) {
    Node *slow = head;
    Node *fast = head;
    while (fast != NULL && fast->next != NULL) {
        slow = slow->next;
        fast = fast->next->next;
    }
    return slow;
}

bool detectCycle(Node *head) {
    Node *slow = head;
    Node *fast = head;
    while (fast != NULL && fast->next != NULL) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return true; // Cycle detected
    }
    return false;
}

void printList(Node *head) {
    Node *curr = head;
    while (curr != NULL) {
        printf("%d -> ", curr->data);
        curr = curr->next;
    }
    printf("NULL\\n");
}

int main() {
    // Construct list: 10 -> 20 -> 30 -> 40 -> 50 -> NULL
    Node *head = createNode(10);
    head->next = createNode(20);
    head->next->next = createNode(30);
    head->next->next->next = createNode(40);
    head->next->next->next->next = createNode(50);

    printf("Original List:\\n  ");
    printList(head);

    Node *mid = findMiddle(head);
    printf("Middle Node Data: %d\\n", mid->data);

    head = reverseList(head);
    printf("Reversed List:\\n  ");
    printList(head);

    printf("Has cycle? %s\\n", detectCycle(head) ? "YES" : "NO");

    // Create deliberate cycle: tail points to 40
    head->next->next->next->next->next = head->next;
    printf("After injecting cycle: Has cycle? %s\\n", 
           detectCycle(head) ? "YES" : "NO");

    return 0;
}""",
                    "output": """Original List:
  10 -> 20 -> 30 -> 40 -> 50 -> NULL
Middle Node Data: 30
Reversed List:
  50 -> 40 -> 30 -> 20 -> 10 -> NULL
Has cycle? NO
After injecting cycle: Has cycle? YES"""
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
                    "answer": """1. **Algorithm Overview**:
   - Initialize `slow = head` and `fast = head`.
   - `slow` advances 1 node per iteration; `fast` advances 2 nodes per iteration.
   - If `fast` or `fast->next` reaches `NULL`, no cycle exists.
   - If `slow == fast`, a cycle is detected.

2. **Mathematical Proof of Cycle Start**:
   - Let $L_1$ = distance from `head` to the cycle start node.
   - Let $C$ = circumference (length) of the cycle.
   - Let $k$ = distance from cycle start node to the collision point.
   - Distance traveled by `slow` = $L_1 + k$.
   - Distance traveled by `fast` = $L_1 + m \\cdot C + k$ (where $m$ is integer loops completed).
   - Because `fast` moves at twice the speed of `slow`:
     $$2 \\cdot \\text{Distance}(slow) = \\text{Distance}(fast)$$
     $$2(L_1 + k) = L_1 + m \\cdot C + k$$
     $$2 L_1 + 2k = L_1 + m \\cdot C + k$$
     $$L_1 + k = m \\cdot C \\implies L_1 = m \\cdot C - k$$

3. **Conclusion**:
   $L_1$ (distance from head to cycle start) exactly equals $(m \\cdot C - k)$ (distance from the collision point to the cycle start moving forward).
   Therefore, resetting one pointer to `head` and advancing both pointers 1 step at a time guarantees they will collide at the exact entrance of the cycle.""",
                    "keyPoints": [
                        "Specification of slow (1 step) and fast (2 steps) mechanics.",
                        "Algebraic derivation: 2(L1 + k) = L1 + mC + k yielding L1 = mC - k.",
                        "Conclusion proving simultaneous convergence at cycle entry."
                    ]
                },
                {
                    "question": "Write the iterative algorithm to reverse a Singly Linked List using three pointers. Trace the algorithm on a list with 3 nodes.",
                    "marks": "5 Marks",
                    "answer": """1. **Algorithm**:
   - Initialize `prev = NULL`, `curr = head`, `next = NULL`.
   - Loop while `curr != NULL`:
     * `next = curr->next;` (store next node)
     * `curr->next = prev;` (redirect pointer backward)
     * `prev = curr;` (advance prev)
     * `curr = next;` (advance curr)
   - Update `head = prev;` and return `head`.

2. **Trace on List [10 -> 20 -> 30 -> NULL]**:
   - **Initial State**: `prev = NULL`, `curr = 10`.
   - **Iteration 1**:
     * `next = 20`. `10->next = NULL`. `prev = 10`, `curr = 20`.
     * State: `10 -> NULL`.
   - **Iteration 2**:
     * `next = 30`. `20->next = 10`. `prev = 20`, `curr = 30`.
     * State: `20 -> 10 -> NULL`.
   - **Iteration 3**:
     * `next = NULL`. `30->next = 20`. `prev = 30`, `curr = NULL`.
     * State: `30 -> 20 -> 10 -> NULL`.
   - **Loop Terminates**: `curr == NULL`. Return `prev` (node 30) as new head.""",
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
}
