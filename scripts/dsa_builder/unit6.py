# Unit 6: Searching, Sorting & Hashing
# Topics:
# dsa-u6-t1: Searching: Linear Search vs Binary Search (Iterative, Recursive, O(log n) derivation, Binary Search on Answer)
# dsa-u6-t2: Quadratic Sorting Algorithms: Bubble Sort, Selection Sort, Insertion Sort (Best, Average, Worst Case Comparisons, In-place & Stability)
# dsa-u6-t3: Efficient Sorting: Merge Sort (Divide & Conquer, O(n log n) proof, Out-of-place) vs Quick Sort (Partitioning: Lomuto vs Hoare, Worst-case O(n^2), Randomized Quick Sort)
# dsa-u6-t4: Hashing Techniques: Hash Functions (Division, Multiplication, Mid-Square), Collision Resolution (Separate Chaining vs Open Addressing: Linear Probing, Quadratic Probing, Double Hashing), Load Factor & Rehashing

unit6 = {
    "id": "dsa-u6",
    "title": "Unit 6: Searching, Sorting & Hashing",
    "description": "Information retrieval and ordering algorithms. Covers Linear vs Binary Search (with O(log n) proofs and Binary Search on Answer), quadratic sorting algorithms (Bubble, Selection, Insertion), optimal divide-and-conquer sorting (Merge Sort vs Quick Sort with Lomuto/Hoare partitions), and hashing collision resolution (Chaining vs Open Addressing).",
    "topics": [
        {
            "id": "dsa-u6-t1",
            "title": "Searching: Linear Search vs Binary Search (Iterative, Recursive, O(log n) derivation, Binary Search on Answer)",
            "simpleExplanation": "Linear Search sequentially inspects every element in O(n) time on arbitrary data, whereas Binary Search eliminates half the remaining search space in each iteration by halving a sorted array in O(log n) time. The advanced paradigm of 'Binary Search on Answer' generalizes this principle to find optimal values across monotonic solution spaces.",
            "detailedExplanation": """## 1. Linear Search vs Binary Search

Searching is the computational process of locating a target key $K$ within a collection of $n$ elements.

```mermaid
flowchart TD
    subgraph Search_Comparison ["Search Strategy Comparison"]
        LS["Linear Search\n- Requires NO sorting\n- Scans items sequentially\n- Best: O(1), Worst: O(n)\n- Universal on all data structures"]
        BS["Binary Search\n- REQUIRES SORTED ARRAY\n- Eliminates half search space each step\n- Best: O(1), Worst: O(log n)\n- Requires contiguous random access"]
    end
```

### A. Linear Search (Sequential Search)
- **Mechanism**: Inspect elements from index $0$ to $n - 1$ sequentially. Stop when $A[i] == K$.
- **Best Case**: Target at first index $\\implies \\mathcal{O}(1)$.
- **Worst Case**: Target at final index or absent $\\implies \\mathcal{O}(n)$.
- **Average Case**: $\\frac{n+1}{2}$ comparisons $\\implies \\mathcal{O}(n)$.

### B. Binary Search (Interval Halving)
- **Prerequisite**: The array MUST be sorted ($A[0] \\le A[1] \\le \\dots \\le A[n-1]$).
- **Mechanism**: Maintain bounds `low` and `high`. Compute midpoint `mid`:
  1. If $A[\\text{mid}] == K$: Target found.
  2. If $A[\\text{mid}] > K$: Target must reside in left half $\\implies \\text{high} = \\text{mid} - 1$.
  3. If $A[\\text{mid}] < K$: Target must reside in right half $\\implies \\text{low} = \\text{mid} + 1$.

```mermaid
sequenceDiagram
    autonumber
    participant A as Sorted Array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
    Note over A: Target = 23. Initial: low = 0, high = 9
    Note over A: mid = (0 + 9)/2 = 4 -> A[4] = 16. (16 < 23) -> low = mid + 1 = 5
    Note over A: Subarray: [23, 38, 56, 72, 91]. low = 5, high = 9
    Note over A: mid = (5 + 9)/2 = 7 -> A[7] = 56. (56 > 23) -> high = mid - 1 = 6
    Note over A: Subarray: [23, 38]. low = 5, high = 6
    Note over A: mid = (5 + 6)/2 = 5 -> A[5] = 23. Target Found at index 5!
```

---

## 2. Mathematical Derivation of $\\mathcal{O}(\\log_2 n)$ Time Complexity

Let the initial problem size be $n$. In each iteration, the remaining search interval is halved:
- After iteration 1: $n / 2$ elements remain.
- After iteration 2: $n / 4 = n / 2^2$ elements remain.
- After iteration $k$: $n / 2^k$ elements remain.

The search terminates in the worst case when the interval contains only 1 element:
$$\\frac{n}{2^k} = 1 \\implies 2^k = n$$
Taking $\\log_2$ on both sides:
$$k = \\log_2 n$$
Therefore, Binary Search executes at most $\\lfloor \\log_2 n \\rfloor + 1$ comparisons, yielding **$\\mathcal{O}(\\log n)$ worst-case time**.

---

## 3. The Integer Overflow Midpoint Bug

In classic textbooks, the midpoint formula is written as:
$$\\text{mid} = \\frac{\\text{low} + \\text{high}}{2}$$

In programming environments with fixed-width 32-bit signed integers (C, C++, Java), if $\\text{low} + \\text{high} > 2^{31} - 1 = 2,147,483,647$, the sum **overflows into negative values**, yielding a negative index that triggers an `ArrayIndexOutOfBoundsException` or Segmentation Fault!

### Safe Midpoint Arithmetic:
$$\\text{mid} = \\text{low} + \\frac{\\text{high} - \\text{low}}{2}$$
*(Or bitwise shift: `low + ((high - low) >> 1)`).*

---

## 4. Binary Search on Answer (Monotonic Predicates)

Binary search is not limited to array lookups. It applies to **any monotonic function / predicate** $P(x)$:
- If $P(x) = \\text{True} \\implies P(y) = \\text{True}$ for all $y > x$.
- We can binary search over the range of possible numerical answers $[\\text{min\\_val}, \\text{max\\_val}]$ to find the optimal boundary $x$.
- **Examples**: Painter's Partition Problem, Book Allocation Problem, finding maximum capacity or minimum completion time.

---

> [!IMPORTANT] **MEMORIZE:**
> Always compute the midpoint as `low + (high - low) / 2` to prevent 32-bit integer overflow!

> [!NOTE] **DEV BRAIN:**
> In 2006, Google engineer Joshua Bloch revealed that standard binary search implementations across Java (`java.util.Arrays.binarySearch`), C libraries, and university textbooks had contained the `(low + high) / 2` integer overflow bug for over two decades!

> [!WARNING] **TRAP:**
> Do not attempt Binary Search on a standard Singly Linked List! Even though the list may be sorted, accessing `mid` requires $\\mathcal{O}(n)$ sequential pointer traversal, rendering binary search $\\mathcal{O}(n)$—worse than linear search due to pointer overhead!

> [!TIP] **EXAM TIP:**
> When asked to compare Linear and Binary Search, create a table covering: (1) Data ordering requirement, (2) Time complexity (Best, Avg, Worst), (3) Underlying data structure constraints (arrays vs lists), and (4) Number of comparisons for input $n = 10^6$ ($10^6$ vs $\\approx 20$).""",
            "shortNotes": "Linear Search checks elements sequentially in O(n) on unsorted data. Binary Search cuts sorted search space in half in O(log n) time. Safe mid formula: low + (high - low) / 2.",
            "examples": [
                {
                    "title": "C Program: Iterative and Recursive Binary Search with Overflow-Safe Midpoint",
                    "problem": "Implement iterative and recursive binary search on a sorted integer array with overflow-safe midpoint calculation.",
                    "explanation": "Demonstrates index arithmetic, boundary adjustments, and comparison tracing.",
                    "code": """#include <stdio.h>

// Iterative Binary Search: O(1) Auxiliary Space
int binarySearchIterative(int arr[], int n, int target) {
    int low = 0;
    int high = n - 1;

    while (low <= high) {
        int mid = low + (high - low) / 2; // Overflow-safe!

        if (arr[mid] == target)
            return mid;
        else if (arr[mid] < target)
            low = mid + 1;  // Search right
        else
            high = mid - 1; // Search left
    }
    return -1; // Not found
}

// Recursive Binary Search: O(log n) Call Stack Space
int binarySearchRecursive(int arr[], int low, int high, int target) {
    if (low > high) return -1;

    int mid = low + (high - low) / 2;
    if (arr[mid] == target)
        return mid;
    else if (arr[mid] < target)
        return binarySearchRecursive(arr, mid + 1, high, target);
    else
        return binarySearchRecursive(arr, low, mid - 1, target);
}

int main() {
    int arr[] = {3, 7, 12, 19, 25, 34, 48, 56, 68, 80};
    int n = sizeof(arr) / sizeof(arr[0]);
    int target = 48;

    int idxIter = binarySearchIterative(arr, n, target);
    printf("Iterative Search: Found %d at index %d\\n", target, idxIter);

    int idxRec = binarySearchRecursive(arr, 0, n - 1, target);
    printf("Recursive Search: Found %d at index %d\\n", target, idxRec);

    target = 99; // Absent
    printf("Searching for 99: Result = %d (Not Found)\\n", 
           binarySearchIterative(arr, n, target));

    return 0;
}""",
                    "output": """Iterative Search: Found 48 at index 6
Recursive Search: Found 48 at index 6
Searching for 99: Result = -1 (Not Found)"""
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
                    "answer": """1. **Mathematical Derivation of Time Complexity**:
   - Let $T(n)$ be the number of comparisons required for an array of size $n$.
   - In each step, one comparison is made with the midpoint, and the search continues on a subarray of size at most $n/2$:
     $$T(n) = T(n/2) + 1$$
   - Applying repeated substitution:
     $$T(n) = T(n/4) + 1 + 1 = T(n/2^2) + 2$$
     $$T(n) = T(n/2^k) + k$$
   - The recurrence terminates when $n / 2^k = 1 \\implies k = \\log_2 n$.
   - Substituting $k = \\log_2 n$:
     $$T(n) = T(1) + \\log_2 n = 1 + \\log_2 n = \\mathcal{O}(\\log n)$$

2. **Why Inefficient on a Singly Linked List**:
   - Binary Search requires $\\mathcal{O}(1)$ random access to jump directly to the middle element.
   - In a Singly Linked List, reaching the middle node requires traversing $\\approx n/2$ pointers sequentially from head, which costs $\\mathcal{O}(n)$ time.
   - The recurrence becomes $T(n) = T(n/2) + \\mathcal{O}(n) = \\mathcal{O}(n)$, which offers no asymptotic benefit over simple linear search and carries higher pointer-chasing constant overhead.""",
                    "keyPoints": [
                        "Recurrence relation T(n) = T(n/2) + 1.",
                        "Step-by-step substitution derivation yielding O(log n).",
                        "Explanation of why linked list lacks O(1) random access, degrading performance to O(n)."
                    ]
                },
                {
                    "question": "Explain the concept of 'Binary Search on Answer' with a suitable algorithmic problem example.",
                    "marks": "5 Marks",
                    "answer": """1. **Concept of Binary Search on Answer**:
   - Rather than searching for an element in an array, we binary search over the **range of possible answers** $[L, R]$ for an optimization problem.
   - **Prerequisite**: The problem must exhibit **monotonicity**:
     If a candidate answer $x$ is feasible, then all $y > x$ (or $y < x$) are also feasible.
   - We construct a boolean check function `isFeasible(x)` that tests whether a candidate answer $x$ satisfies problem constraints in $\\mathcal{O}(n)$ time.
   - We bisect the answer interval $[L, R]$, running in $\\mathcal{O}(n \\log(\\text{Range}))$ total time.

2. **Illustrative Example (Painter's Partition Problem)**:
   - *Problem*: Given $n$ boards of various lengths and $k$ painters, find the minimum time to paint all boards such that each painter paints contiguous boards.
   - *Search Range*: $L = \\max(\\text{boards})$ (a painter must paint at least the largest board), $R = \\sum \\text{boards}$ (one painter paints everything).
   - *Monotonicity*: If all boards can be painted in time $T$, they can definitely be painted in any time $> T$.
   - *Algorithm*: Binary search for midpoint $M = (L + R) / 2$. Check if $k$ painters suffice for time $M$. If yes, try smaller time ($R = M - 1$); if no, increase time ($L = M + 1$).""",
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
            "detailedExplanation": """## 1. Core Sorting Terminology

Before evaluating sorting algorithms, we must define two essential qualitative properties:
1. **In-Place Sorting**: An algorithm is strictly *in-place* if it requires a constant amount of additional memory outside the input array: $\\text{Auxiliary Space} = \\mathcal{O}(1)$.
2. **Algorithm Stability**: A sorting algorithm is *stable* if it preserves the relative order of duplicate elements that share identical keys. Stability is critical when sorting records with multiple secondary keys (e.g., sorting employees by Name, then by Department).

```mermaid
flowchart TD
    subgraph Quadratic_Sorts ["The Quadratic Sorting Trio (O(n^2))"]
        B["Bubble Sort\n- Swaps adjacent inversions\n- In-place, Stable\n- Adaptive with swapped flag: O(n) Best"]
        S["Selection Sort\n- Finds global minimum and swaps\n- In-place, UNSTABLE\n- Non-adaptive: O(n^2) in ALL cases"]
        I["Insertion Sort\n- Inserts into sorted prefix\n- In-place, Stable\n- Best on nearly-sorted data: O(n) Best"]
    end
```

---

## 2. Bubble Sort (Sinking Sort)

### Mechanics:
Repeatedly pass through the array, comparing adjacent elements `arr[j]` and `arr[j+1]`. If they are out of order (`arr[j] > arr[j+1]`), swap them. After pass $i$, the $i$-th largest element "bubbles up" to its permanent location at index $n - 1 - i$.

```mermaid
sequenceDiagram
    autonumber
    participant A as Array: [5, 1, 4, 2, 8]
    Note over A: Pass 1: Compare (5,1) -> Swap -> [1, 5, 4, 2, 8]
    Note over A: Compare (5,4) -> Swap -> [1, 4, 5, 2, 8]
    Note over A: Compare (5,2) -> Swap -> [1, 4, 2, 5, 8]
    Note over A: Compare (5,8) -> OK -> 8 is permanently locked at end!
```

### Adaptive Optimization:
Maintain a boolean flag `swapped`. If an entire pass completes with zero swaps, the array is already completely sorted; terminate immediately!
- **Best-Case Time (Already Sorted)**: $\\mathcal{O}(n)$ comparisons.
- **Worst-Case Time (Reverse Sorted)**: $\\frac{n(n-1)}{2} = \\mathcal{O}(n^2)$ comparisons and swaps.

---

## 3. Selection Sort

### Mechanics:
Divide the array into a sorted prefix on the left and an unsorted suffix on the right:
1. Scan the entire unsorted suffix to locate the index of the **global minimum**.
2. Swap this minimum element with the first element of the unsorted suffix.
3. Advance the sorted prefix boundary by 1.

### Why Selection Sort is UNSTABLE:
Consider sorting: $[4_A, 4_B, 2]$.
1. The global minimum is $2$ at index 2.
2. Selection sort swaps $4_A$ with $2$: $[2, 4_B, 4_A]$.
3. $4_A$ has jumped over $4_B$, destroying their relative order! Thus, standard Selection Sort is **unstable**.

Selection sort performs $\\mathcal{O}(n)$ total swaps, but its comparison count is **always $\\frac{n(n-1)}{2} = \\Theta(n^2)$**, even if the array is already sorted.

---

## 4. Insertion Sort (The Card Player's Algorithm)

### Mechanics:
Iterate from index $1$ to $n - 1$. Assume elements from $0$ to $i - 1$ form a sorted prefix. Take `key = arr[i]`, and shift all elements in the sorted prefix that are greater than `key` one position to the right, then insert `key` into the vacated slot.

```mermaid
sequenceDiagram
    autonumber
    participant A as Array: [12, 11, 13, 5, 6]
    Note over A: i=1, key=11: 12 > 11 -> Shift 12 right -> Insert 11 -> [11, 12, 13, 5, 6]
    Note over A: i=2, key=13: 12 < 13 -> No shifts -> [11, 12, 13, 5, 6]
    Note over A: i=3, key=5: Shift 13, 12, 11 right -> Insert 5 -> [5, 11, 12, 13, 6]
```

### Superiority on Nearly-Sorted Data:
If an array is already sorted or nearly sorted (each element is at most $k$ positions away from its target), Insertion Sort runs in **linear $\\mathcal{O}(n)$ time**.
Because of low constant overhead and optimal performance on small buffers, modern industrial sorting libraries (such as **Timsort** in Python/Java and **Introsort** in C++ `std::sort`) automatically switch to Insertion Sort for sub-arrays of size $n \\le 16$ to $32$!

---

## 5. Comprehensive Comparison Matrix

| Algorithm | Best-Case Time | Average-Case Time | Worst-Case Time | Auxiliary Space | Stable? | Swaps Count |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Bubble Sort** | $\\mathcal{O}(n)$ (with flag) | $\\mathcal{O}(n^2)$ | $\\mathcal{O}(n^2)$ | $\\mathcal{O}(1)$ | **Yes** | $\\mathcal{O}(n^2)$ |
| **Selection Sort** | $\\Theta(n^2)$ | $\\Theta(n^2)$ | $\\Theta(n^2)$ | $\\mathcal{O}(1)$ | **No** | $\\mathcal{O}(n)$ |
| **Insertion Sort** | $\\mathcal{O}(n)$ | $\\mathcal{O}(n^2)$ | $\\mathcal{O}(n^2)$ | $\\mathcal{O}(1)$ | **Yes** | $\\mathcal{O}(n^2)$ shifts |

---

> [!IMPORTANT] **MEMORIZE:**
> - Bubble Sort: Stable, in-place, $O(n)$ best case with flag.
> - Selection Sort: **UNSTABLE**, in-place, always $O(n^2)$ comparisons, but performs minimum swaps ($O(n)$).
> - Insertion Sort: Stable, in-place, $O(n)$ on nearly-sorted data, powers small-array thresholds in Timsort and Introsort.

> [!NOTE] **DEV BRAIN:**
> Selection Sort minimizes the number of memory write cycles (at most $n - 1$ swaps). In systems with write-sensitive memory (such as Flash EEPROM where write cycles degrade chip lifespan), Selection Sort is sometimes preferred over algorithms that perform frequent memory writes!

> [!WARNING] **TRAP:**
> Never claim Selection Sort is $O(n)$ on sorted arrays! It MUST scan the entire remaining suffix to verify that no smaller element exists. Its comparison count is strictly $\\frac{n(n-1)}{2}$ in all cases!

> [!TIP] **EXAM TIP:**
> When asked to prove instability of Selection Sort, write down the 3-element counterexample: $[4_A, 4_B, 2]$. Show that swapping 2 with $4_A$ yields $[2, 4_B, 4_A]$, breaking original order.""",
            "shortNotes": "Bubble Sort swaps adjacent items (O(n) best). Selection Sort picks min (unstable, O(n) swaps, O(n^2) comparisons). Insertion Sort shifts sorted prefix (stable, O(n) best on nearly-sorted data).",
            "examples": [
                {
                    "title": "C Program: Bubble, Selection, and Insertion Sort Implementations",
                    "problem": "Implement optimized Bubble Sort (with swapped flag), Selection Sort, and Insertion Sort on integer arrays.",
                    "explanation": "Demonstrates the three quadratic algorithms, tracking in-place swaps and early termination.",
                    "code": """#include <stdio.h>
#include <stdbool.h>

void swap(int *a, int *b) {
    int t = *a; *a = *b; *b = t;
}

// 1. Optimized Bubble Sort
void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;
        for (int j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(&arr[j], &arr[j + 1]);
                swapped = true;
            }
        }
        if (!swapped) break; // Array is sorted!
    }
}

// 2. Selection Sort
void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx])
                minIdx = j;
        }
        if (minIdx != i)
            swap(&arr[i], &arr[minIdx]);
    }
}

// 3. Insertion Sort
void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j]; // Shift right
            j--;
        }
        arr[j + 1] = key;
    }
}

void printArray(int arr[], int n) {
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");
}

int main() {
    int a1[] = {64, 34, 25, 12, 22, 11, 90};
    int a2[] = {64, 34, 25, 12, 22, 11, 90};
    int a3[] = {64, 34, 25, 12, 22, 11, 90};
    int n = 7;

    bubbleSort(a1, n);
    printf("Bubble Sort Result    : ");
    printArray(a1, n);

    selectionSort(a2, n);
    printf("Selection Sort Result : ");
    printArray(a2, n);

    insertionSort(a3, n);
    printf("Insertion Sort Result : ");
    printArray(a3, n);

    return 0;
}""",
                    "output": """Bubble Sort Result    : 11 12 22 25 34 64 90 
Selection Sort Result : 11 12 22 25 34 64 90 
Insertion Sort Result : 11 12 22 25 34 64 90 """
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
                    "answer": """1. **Definition of Stability**:
   A sorting algorithm is defined as **stable** if two data records with equal keys appear in the sorted output in the exact same relative order as they appeared in the original unsorted input.
   - Formally: If $A[i] = A[j]$ and $i < j$ in the input, then $A[i]$ must precede $A[j]$ in the sorted array.

2. **Proof that Selection Sort is Unstable**:
   - Consider the array of keys: $[4_A, 4_B, 2]$, where $4_A$ and $4_B$ are duplicate values distinguishable by subscript.
   - In the first pass of Selection Sort, the algorithm scans the array and identifies $2$ (at index 2) as the global minimum.
   - It swaps the minimum element ($2$) with the element at index 0 ($4_A$):
     $$\\text{Output}: [2, 4_B, 4_A]$$
   - Notice that $4_B$ now appears **before** $4_A$ in the sorted array!
   - The initial relative order has been violated, proving that standard Selection Sort is **unstable**.""",
                    "keyPoints": [
                        "Formal definition of stability regarding duplicate keys.",
                        "Concrete 3-element counterexample [4A, 4B, 2].",
                        "Demonstration that long-distance swap disrupts relative order."
                    ]
                },
                {
                    "question": "Compare Bubble Sort, Selection Sort, and Insertion Sort in terms of Best, Average, and Worst-case time complexities, auxiliary space, and number of swaps.",
                    "marks": "7 Marks",
                    "answer": """1. **Comparative Analysis Table**:

| Feature / Metric | Bubble Sort | Selection Sort | Insertion Sort |
| :--- | :--- | :--- | :--- |
| **Best-Case Time** | $\\mathcal{O}(n)$ (with swapped flag) | $\\Theta(n^2)$ | $\\mathcal{O}(n)$ (already sorted) |
| **Average-Case Time**| $\\mathcal{O}(n^2)$ | $\\Theta(n^2)$ | $\\mathcal{O}(n^2)$ |
| **Worst-Case Time** | $\\mathcal{O}(n^2)$ (reverse sorted) | $\\Theta(n^2)$ | $\\mathcal{O}(n^2)$ (reverse sorted) |
| **Auxiliary Space** | $\\mathcal{O}(1)$ (in-place) | $\\mathcal{O}(1)$ (in-place) | $\\mathcal{O}(1)$ (in-place) |
| **Stability** | **Stable** | **Unstable** | **Stable** |
| **Total Swaps** | $\\mathcal{O}(n^2)$ swaps | $\\mathcal{O}(n)$ swaps (at most $n-1$) | $\\mathcal{O}(n^2)$ element shifts |

2. **Engineering Selection Summary**:
   - **Insertion Sort** is the best choice when the array is nearly sorted or for small arrays ($N \\le 32$).
   - **Selection Sort** is preferred when memory write operations are significantly more expensive than read comparisons (e.g., Flash EEPROM).
   - **Bubble Sort** is primarily of pedagogical interest.""",
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
            "detailedExplanation": """## 1. The Divide-and-Conquer Sorting Paradigm

Both Merge Sort and Quick Sort decompose a large array sorting task into smaller subproblems, but they divide and conquer at opposite phases:
- **Merge Sort**: Divides *trivially* (splits array in half at index $n/2$), and does all heavy work during the **Combine phase** (`merge()`).
- **Quick Sort**: Does all heavy work during the **Divide phase** (`partition()`), and requires zero work during the Combine phase!

```mermaid
flowchart TD
    subgraph D_and_C ["Divide and Conquer Comparison"]
        MS["Merge Sort\n- Divide: Split at mid (Trivial)\n- Conquer: Recurse on halves\n- Combine: merge() (Heavy work: O(n))\n- Guaranteed O(n log n) time\n- Stable, but Out-of-place (O(n) RAM)"]
        QS["Quick Sort\n- Divide: partition() (Heavy work: O(n))\n- Conquer: Recurse on partitions\n- Combine: Trivial (Already in place!)\n- Average O(n log n), Worst O(n^2)\n- Unstable, but In-place (O(log n) stack)"]
    end
```

---

## 2. Merge Sort: Mechanics & Proof

### The `merge()` Subroutine:
Given two adjacent sorted subarrays $A[\\text{low} \\dots \\text{mid}]$ and $A[\\text{mid}+1 \\dots \\text{high}]$, merge them into a single sorted range using an auxiliary temporary array:
- Maintain two pointers $i = \\text{low}$ and $j = \\text{mid} + 1$.
- At each step, compare $A[i]$ and $A[j]$; copy the smaller element into temporary buffer $B$.
- Copy any remaining elements, then copy $B$ back into original array $A$.
- **Running Time**: Strictly $\\Theta(n)$ where $n = \\text{high} - \\text{low} + 1$.

### Mathematical Proof of $\\mathcal{O}(n \\log n)$ Time:
$$T(n) = 2 T(n/2) + \\Theta(n)$$
Using Master Theorem: $a = 2, b = 2 \\implies n^{\\log_2 2} = n^1$.
Because $f(n) = \\Theta(n^1)$, Case 2 applies:
$$T(n) = \\Theta(n \\log n) \\quad \\text{in Best, Average, and Worst Cases!}$$

### Space Overhead:
Merge Sort requires an auxiliary buffer of size $n$ during merging, making it **Out-of-Place** ($\\text{Auxiliary Space} = \\mathcal{O}(n)$). However, it is strictly **Stable**.

---

## 3. Quick Sort & Partitioning Schemes

Quick Sort picks a **pivot** element $P$ and rearranges the array into two partitions: elements $\\le P$ on the left, and elements $\\ge P$ on the right.

```mermaid
flowchart TD
    subgraph Partitioning ["QuickSort Partitioning Schemes"]
        LOM["Lomuto Partition\n- Pivot = Last element arr[high]\n- Single pointer i advances when arr[j] <= pivot\n- Simple, but makes ~3x more swaps\n- Degrades on duplicate keys"]
        HOARE["Hoare Partition (Original)\n- Pivot = First or Middle element\n- Dual pointers scan inward from low and high\n- Swaps out-of-place pairs\n- Makes ~3x fewer swaps than Lomuto"]
    end
```

### A. Lomuto Partition Scheme (Standard Textbook)
- Pivot is chosen as the last element `arr[high]`.
- Pointer $i$ tracks the boundary of elements $\\le \\text{pivot}$.
- Loop $j$ from `low` to `high - 1`:
  - If `arr[j] <= pivot`, increment $i$ and swap `arr[i]` with `arr[j]`.
- Swap `arr[i + 1]` with `arr[high]`. Return $i + 1$ as the pivot index.

### B. Hoare Partition Scheme (Production Standard)
- Maintain two pointers $i = \\text{low} - 1$ and $j = \\text{high} + 1$.
- Advance $i$ rightward until `arr[i] >= pivot`.
- Advance $j$ leftward until `arr[j] <= pivot`.
- If $i < j$, swap `arr[i]` with `arr[j]`; else return $j$.
- **Efficiency**: Hoare makes significantly fewer swaps on average than Lomuto.

---

## 4. QuickSort Worst-Case $\\mathcal{O}(n^2)$ and Randomized Mitigation

### When Worst-Case Occurs:
If the array is already sorted (or reverse-sorted) and the pivot is chosen as the first or last element, the partition produces unbalanced subproblems of size $0$ and $n - 1$:
$$T(n) = T(n - 1) + \\mathcal{O}(n) = \\mathcal{O}(n^2)$$

### Randomized QuickSort:
Instead of picking a fixed endpoint, select a pivot **uniformly at random** from the range $[\\text{low}, \\text{high}]$, and swap it with `arr[high]` before partitioning.
- **Result**: Expected worst-case probability becomes $\\frac{1}{n!}$, guaranteeing **$\\mathcal{O}(n \\log n)$ expected runtime** regardless of input distribution!

---

## 5. Merge Sort vs Quick Sort Comparison Matrix

| Dimension | Merge Sort | Quick Sort |
| :--- | :--- | :--- |
| **Worst-Case Time** | **$\\Theta(n \\log n)$** (Guaranteed) | $\\mathcal{O}(n^2)$ (Pathological pivot) |
| **Average-Case Time**| $\\Theta(n \\log n)$ | **$\\Theta(n \\log n)$** (Faster constants) |
| **Best-Case Time** | $\\Theta(n \\log n)$ | $\\Theta(n \\log n)$ |
| **Auxiliary Space** | $\\mathcal{O}(n)$ (Out-of-place buffer) | **$\\mathcal{O}(\\log n)$** (In-place call stack) |
| **Stability** | **Stable** (Preserves duplicates) | **Unstable** (Long-distance swaps) |
| **Locality of Reference**| Poor (Copies between buffers) | **Outstanding** (Cache-friendly array sweeps) |
| **Preferred For** | Linked lists, External disk sorting | In-memory general sorting (`std::sort`) |

---

> [!IMPORTANT] **MEMORIZE:**
> - Merge Sort is **Stable**, runs in guaranteed $\\Theta(n \\log n)$ time, but consumes $\\mathcal{O}(n)$ auxiliary memory.
> - Quick Sort is **Unstable**, operates **in-place** with $\\mathcal{O}(\\log n)$ stack space, and achieves the fastest real-world runtime via caching.
> - Randomized Quick Sort neutralizes pre-sorted $O(n^2)$ worst-case inputs.

> [!NOTE] **DEV BRAIN:**
> Java's `Arrays.sort()` uses a Dual-Pivot QuickSort for primitive types (`int[]`, `double[]`) because cache speed matters most and stability is irrelevant for primitives, but uses Timsort (an adaptive Merge Sort) for reference objects (`Object[]`) where stability is mandatory!

> [!WARNING] **TRAP:**
> Do not claim QuickSort uses $\\mathcal{O}(1)$ space! Recursive partitioning requires activation records on the function call stack: $\\mathcal{O}(\\log n)$ in the balanced case, and up to $\\mathcal{O}(n)$ in the worst case!

> [!TIP] **EXAM TIP:**
> When asked why Merge Sort is preferred for Linked Lists: Linked lists can be merged in-place in $O(1)$ space by rewiring node pointers (`next`), eliminating Merge Sort's $O(n)$ array buffer drawback!""",
            "shortNotes": "Merge Sort is stable, O(n log n) guaranteed, but requires O(n) space. Quick Sort is in-place and fastest on average (O(n log n)), but has O(n^2) worst case mitigated by randomized pivoting.",
            "examples": [
                {
                    "title": "C Program Implementing Merge Sort and Randomized Quick Sort",
                    "problem": "Implement Merge Sort with auxiliary array merging and Quick Sort with Lomuto partitioning.",
                    "explanation": "Demonstrates divide-and-conquer recursion, merge buffer allocation, and partition index returns.",
                    "code": """#include <stdio.h>
#include <stdlib.h>

void swap(int *a, int *b) {
    int t = *a; *a = *b; *b = t;
}

// 1. Merge Sort Implementation
void merge(int arr[], int low, int mid, int high) {
    int n1 = mid - low + 1;
    int n2 = high - mid;
    int L[n1], R[n2];

    for (int i = 0; i < n1; i++) L[i] = arr[low + i];
    for (int j = 0; j < n2; j++) R[j] = arr[mid + 1 + j];

    int i = 0, j = 0, k = low;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) arr[k++] = L[i++];
        else arr[k++] = R[j++];
    }
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}

void mergeSort(int arr[], int low, int high) {
    if (low < high) {
        int mid = low + (high - low) / 2;
        mergeSort(arr, low, mid);
        mergeSort(arr, mid + 1, high);
        merge(arr, low, mid, high);
    }
}

// 2. Quick Sort Implementation (Lomuto Partition)
int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = low - 1;

    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            swap(&arr[i], &arr[j]);
        }
    }
    swap(&arr[i + 1], &arr[high]);
    return i + 1;
}

void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

void printArray(int arr[], int n) {
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");
}

int main() {
    int a1[] = {38, 27, 43, 3, 9, 82, 10};
    int a2[] = {38, 27, 43, 3, 9, 82, 10};
    int n = 7;

    mergeSort(a1, 0, n - 1);
    printf("Merge Sort Output : ");
    printArray(a1, n);

    quickSort(a2, 0, n - 1);
    printf("Quick Sort Output : ");
    printArray(a2, n);

    return 0;
}""",
                    "output": """Merge Sort Output : 3 9 10 27 38 43 82 
Quick Sort Output : 3 9 10 27 38 43 82 """
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
                    "answer": """1. **Comparison Matrix**:
   - **Worst-Case Time Complexity**: Merge Sort is $\\Theta(n \\log n)$ guaranteed; Quick Sort is $\\mathcal{O}(n^2)$ when pivots are unbalanced.
   - **Auxiliary Space**: Merge Sort requires $\\mathcal{O}(n)$ extra buffer memory; Quick Sort is in-place requiring $\\mathcal{O}(\\log n)$ stack space.
   - **Stability**: Merge Sort is strictly **Stable**; Quick Sort is **Unstable**.
   - **Cache Locality**: Quick Sort processes contiguous memory in-place with high spatial locality; Merge Sort copies elements between buffers.

2. **When to Choose Merge Sort**:
   - **When Stability is Mandatory**: Sorting complex objects where identical keys must retain original sequence (e.g., student grade records).
   - **Linked Lists**: Linked lists can be merged by rewiring pointers without allocating $\\mathcal{O}(n)$ auxiliary arrays.
   - **External Sorting**: Large datasets residing on slow hard disks that do not fit into RAM.

3. **When to Choose Quick Sort**:
   - **In-Memory Array Sorting**: When raw speed and cache performance are prioritized.
   - **Memory-Constrained Systems**: Embedded firmware where $\\mathcal{O}(n)$ extra memory is unavailable.""",
                    "keyPoints": [
                        "Comparison covering worst-case time, auxiliary space, stability, and cache locality.",
                        "Conditions favoring Merge Sort: stability, linked lists, external disk sorting.",
                        "Conditions favoring Quick Sort: in-memory arrays, cache hits, zero extra buffer space."
                    ]
                },
                {
                    "question": "Explain the Hoare Partitioning scheme versus the Lomuto Partitioning scheme in Quick Sort with pseudocode and compare their efficiency.",
                    "marks": "5 Marks",
                    "answer": """1. **Lomuto Partition Scheme**:
   - Pivot is chosen as the last element `arr[high]`.
   - Single pointer $i$ initialized to `low - 1`. Loop $j$ from `low` to `high - 1`.
   - If `arr[j] <= pivot`: $i++$; swap `arr[i]` with `arr[j]`.
   - At end, swap `arr[i + 1]` with `arr[high]`. Returns $i + 1$.
   - *Drawback*: Performs $\\approx 3\\times$ more swaps than Hoare and degrades when many duplicates exist.

2. **Hoare Partition Scheme**:
   - Pivot is chosen as the first element `arr[low]` (or middle).
   - Two pointers $i = \\text{low} - 1$ and $j = \\text{high} + 1$ scan inward toward each other.
   - Increment $i$ while `arr[i] < pivot`; decrement $j$ while `arr[j] > pivot`.
   - If $i < j$, swap `arr[i]` with `arr[j]` and repeat; else return $j$.

3. **Efficiency Comparison**:
   - Hoare's algorithm performs on average **three times fewer swaps** than Lomuto's.
   - Hoare handles duplicate keys much more symmetrically, avoiding severe partition degradation.""",
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
            "detailedExplanation": """## 1. The Hashing Paradigm & The Load Factor

A **Hash Table** is an associative data structure implementing the Map/Dictionary ADT: it maps search keys to array bucket indices via a mathematical function $h(k)$.

$$\\text{Index} = h(k) \\pmod M$$
Where $k$ is the search key and $M$ is the table capacity.

```mermaid
flowchart LR
    KEY["Key ('Alice')"] --> HF["Hash Function: h(k)"]
    HF --> MOD["Modulo Table Size: % M"]
    MOD --> BUCKET["Bucket Index [4] in Hash Table"]
```

### The Load Factor ($\\alpha$)
The **load factor** quantifies how densely populated the hash table is:
$$\\alpha = \\frac{N}{M} = \\frac{\\text{Total Keys Stored}}{\\text{Total Table Buckets}}$$

- In **Separate Chaining**: $\\alpha$ can exceed $1$ (average chain length is $\\alpha$).
- In **Open Addressing**: $\\alpha$ can NEVER exceed $1$ (must maintain $\\alpha \\le 0.7 - 0.75$ to prevent probe clustering).

---

## 2. Common Hash Functions

A good hash function must: (1) Compute quickly in $\\mathcal{O}(1)$ time, (2) Distribute keys uniformly across all $M$ buckets, and (3) Minimize collisions.

1. **Division Method**:
   $$h(k) = k \\pmod M$$
   *Rule of Thumb*: Choose $M$ as a **prime number** not close to a power of 2 or 10, avoiding patterns in binary representations.

2. **Multiplication Method**:
   $$h(k) = \\lfloor M \\cdot (k \\cdot A \\pmod 1) \\rfloor$$
   Where $0 < A < 1$. Knuth recommended the inverse Golden Ratio:
   $$A = \\frac{\\sqrt{5} - 1}{2} \\approx 0.6180339887$$
   *Advantage*: The choice of table size $M$ is not critical; often chosen as a power of 2 ($2^p$) for fast bitwise shifting.

3. **Mid-Square Method**:
   - Square the key: $k^2$.
   - Extract the middle $r$ digits/bits of the product.
   - *Example*: For $k = 1234$, $k^2 = 1,522,756$. Middle digits $= 227$.

---

## 3. Collision Resolution Strategies

By the **Pigeonhole Principle**, if the number of keys $N$ exceeds the number of slots $M$, collisions are mathematically inevitable ($h(k_1) = h(k_2)$ for $k_1 \\ne k_2$).

```mermaid
flowchart TD
    COLL["Collision Resolution Techniques"] --> SC["Separate Chaining (Open Hashing)\nEach bucket holds a Linked List of collisions"]
    COLL --> OA["Open Addressing (Closed Hashing)\nAll elements stored inside table array.\nFind alternate slot via Probing sequence"]

    OA --> LP["Linear Probing: h(k, i) = (h(k) + i) % M"]
    OA --> QP["Quadratic Probing: h(k, i) = (h(k) + c1*i + c2*i^2) % M"]
    OA --> DH["Double Hashing: h(k, i) = (h1(k) + i * h2(k)) % M"]
```

---

## 4. Separate Chaining vs Open Addressing

### A. Separate Chaining (Open Hashing)
Each table bucket acts as the head pointer of a singly linked list. When a collision occurs, the new key is prepended to the bucket's list in $\\mathcal{O}(1)$ time.
- **Search Time**: $\\mathcal{O}(1 + \\alpha)$ average.
- **Pros**: Table never becomes "full"; graceful degradation under high load factor.
- **Cons**: Heap pointer memory overhead; poor cache locality.

### B. Open Addressing Probing Sequences

1. **Linear Probing**:
   $$h(k, i) = (h'(k) + i) \\pmod M, \\quad i = 0, 1, 2, \\dots$$
   - **Fatal Flaw (Primary Clustering)**: Long contiguous blocks of occupied slots build up. Any key hashing into the cluster must traverse to the very end, worsening the cluster length and degrading lookups to $\\mathcal{O}(n)$!

2. **Quadratic Probing**:
   $$h(k, i) = (h'(k) + c_1 i + c_2 i^2) \\pmod M$$
   - Eliminates primary clustering, but suffers from **Secondary Clustering** (keys with identical initial hash $h'(k)$ trace the exact same probe sequence).

3. **Double Hashing**:
   $$h(k, i) = (h_1(k) + i \\cdot h_2(k)) \\pmod M$$
   - Uses two independent hash functions. The step size is determined dynamically by $h_2(k)$.
   - *Requirement*: $h_2(k)$ must never evaluate to $0$, and must be coprime to $M$.
   - **Completely eliminates both primary and secondary clustering!**

---

## 5. Deletion in Open Addressing & Rehashing

### The Tombstone Problem in Open Addressing:
If you delete an element from an open-addressed table by setting the slot to empty (`NULL`), subsequent searches for elements that probed *past* that slot will stop prematurely and report "Not Found"!
- **Solution**: Mark deleted slots with a special sentinel value: **`TOMBSTONE`** (or `DELETED`). Search probes continue past tombstones, but insertions can overwrite them.

### Dynamic Rehashing:
When $\\alpha$ exceeds a threshold (typically $\\alpha > 0.7$):
1. Allocate a new table with roughly **double capacity** (new prime $M' \\approx 2M$).
2. Re-insert all active keys into the new table using $h'(k) = k \\pmod{M'}$.
3. Discard tombstones and old buffer.
- **Amortized Time**: $\\mathcal{O}(1)$ per insertion.

---

> [!IMPORTANT] **MEMORIZE:**
> - Load factor $\\alpha = N / M$.
> - In Open Addressing: Linear Probing $\\implies$ **Primary Clustering**; Quadratic Probing $\\implies$ **Secondary Clustering**; Double Hashing $\\implies$ **Optimal Distribution**.
> - In Open Addressing, deleted slots must be marked with a **`TOMBSTONE`** sentinel to keep search probe chains intact!

> [!NOTE] **DEV BRAIN:**
> Python's dictionary (`dict`) uses open addressing with a perturbation pseudo-random probing formula, and rehashes when the table is $2/3$ full ($\alpha > 0.66$) to guarantee lightning-fast $O(1)$ lookups.

> [!WARNING] **TRAP:**
> In Double Hashing, $h_2(k)$ must NEVER return $0$! If $h_2(k) = 0$, the step size is $i \\times 0 = 0$, trapping the probe in an infinite loop on the initial slot!

> [!TIP] **EXAM TIP:**
> When asked to insert keys into an open-addressed table with Linear or Quadratic probing, write down the collision calculation for each probe step $i = 0, 1, 2, \\dots$ clearly showing the modulo arithmetic.""",
            "shortNotes": "Hashing maps keys to indices in O(1) avg time. Collisions solved via Separate Chaining (linked lists) or Open Addressing (Linear, Quadratic, Double Hashing). Rehashing doubles table when load factor exceeds threshold.",
            "examples": [
                {
                    "title": "C Program: Hash Table with Open Addressing and Linear Probing with Tombstones",
                    "problem": "Implement a hash table using linear probing supporting insert, search, and delete operations with tombstone markers.",
                    "explanation": "Demonstrates index calculation, collision linear probing, tombstone handling during deletion, and lookup continuation.",
                    "code": """#include <stdio.h>
#include <stdbool.h>

#define TABLE_SIZE 7
#define EMPTY -1
#define TOMBSTONE -2

typedef struct {
    int key;
} HashItem;

HashItem table[TABLE_SIZE];

void initTable() {
    for (int i = 0; i < TABLE_SIZE; i++) table[i].key = EMPTY;
}

int hash(int key) {
    return key % TABLE_SIZE;
}

void insert(int key) {
    int idx = hash(key);
    int startIdx = idx;

    for (int i = 0; i < TABLE_SIZE; i++) {
        int probe = (startIdx + i) % TABLE_SIZE;
        if (table[probe].key == EMPTY || table[probe].key == TOMBSTONE) {
            table[probe].key = key;
            printf("Inserted %d at bucket index %d\\n", key, probe);
            return;
        }
    }
    printf("Hash Table Full! Cannot insert %d\\n", key);
}

bool search(int key) {
    int idx = hash(key);
    for (int i = 0; i < TABLE_SIZE; i++) {
        int probe = (idx + i) % TABLE_SIZE;
        if (table[probe].key == key) return true;
        if (table[probe].key == EMPTY) return false; // Stop at empty (tombstones are bypassed)
    }
    return false;
}

void deleteKey(int key) {
    int idx = hash(key);
    for (int i = 0; i < TABLE_SIZE; i++) {
        int probe = (idx + i) % TABLE_SIZE;
        if (table[probe].key == key) {
            table[probe].key = TOMBSTONE; // Mark tombstone!
            printf("Key %d deleted from index %d (marked TOMBSTONE)\\n", key, probe);
            return;
        }
        if (table[probe].key == EMPTY) break;
    }
    printf("Key %d not found for deletion.\\n", key);
}

void display() {
    printf("Hash Table Buckets:\\n");
    for (int i = 0; i < TABLE_SIZE; i++) {
        if (table[i].key == EMPTY) printf("  [%d] : EMPTY\\n", i);
        else if (table[i].key == TOMBSTONE) printf("  [%d] : [TOMBSTONE]\\n", i);
        else printf("  [%d] : %d\\n", i, table[i].key);
    }
}

int main() {
    initTable();

    // 10 % 7 = 3, 17 % 7 = 3 (Collision!), 24 % 7 = 3 (Collision!)
    insert(10);
    insert(17); // Collides -> probes to 4
    insert(24); // Collides -> probes to 5
    display();

    printf("Search 17: %s\\n", search(17) ? "FOUND" : "NOT FOUND");

    // Delete 17 and verify 24 is still found across tombstone
    deleteKey(17);
    display();

    printf("Search 24 across tombstone: %s\\n", search(24) ? "FOUND" : "NOT FOUND");

    return 0;
}""",
                    "output": """Inserted 10 at bucket index 3
Inserted 17 at bucket index 4
Inserted 24 at bucket index 5
Hash Table Buckets:
  [0] : EMPTY
  [1] : EMPTY
  [2] : EMPTY
  [3] : 10
  [4] : 17
  [5] : 24
  [6] : EMPTY
Search 17: FOUND
Key 17 deleted from index 4 (marked TOMBSTONE)
Hash Table Buckets:
  [0] : EMPTY
  [1] : EMPTY
  [2] : EMPTY
  [3] : 10
  [4] : [TOMBSTONE]
  [5] : 24
  [6] : EMPTY
Search 24 across tombstone: FOUND"""
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
                    "answer": """1. **Architectural Comparison**:
   - **Separate Chaining (Open Hashing)**:
     * Each table bucket holds a linked list of all colliding elements.
     * Table never strictly fills up; load factor $\\alpha = N/M$ can safely exceed $1.0$.
     * Deletions are straightforward: splice out the linked list node and `free()` memory.
     * Consumes extra pointer memory (8 bytes per node).
     * Incurs cache misses due to heap-allocated nodes scattered across memory.
   - **Open Addressing (Closed Hashing)**:
     * All keys are stored directly inside the fixed array table; no pointers are used.
     * Load factor can **never** exceed $1.0$; performance degrades severely when $\\alpha > 0.75$.
     * Deletions require special `TOMBSTONE` sentinel markers to keep search probe chains unbroken.
     * Zero pointer memory overhead.
     * Outstanding cache locality because probe sequences scan contiguous array cells.

2. **Performance Under High Load Factors**:
   - In Separate Chaining, lookup times degrade gracefully to $\\mathcal{O}(1 + \\alpha)$ (linear with chain length).
   - In Open Addressing, lookup times explode asymptotically to $\\mathcal{O}\\left(\\frac{1}{1 - \\alpha}\\right)$ as $\\alpha \\to 1$, stalling lookups and insertions.
   - Therefore, Open Addressing must perform **dynamic rehashing** (doubling table size) whenever $\\alpha > 0.7$.""",
                    "keyPoints": [
                        "Comparison covering memory layout, load factor capacity, and pointer overhead.",
                        "Cache locality trade-offs (contiguous array vs scattered heap nodes).",
                        "Performance degradation formulas under high load factors."
                    ]
                },
                {
                    "question": "Explain Linear Probing, Quadratic Probing, and Double Hashing. Define Primary Clustering and explain how Double Hashing resolves it.",
                    "marks": "5 Marks",
                    "answer": """1. **Probing Sequences in Open Addressing**:
   - **Linear Probing**:
     $$h(k, i) = (h'(k) + i) \\pmod M$$
     Scans adjacent consecutive slots: $i = 0, 1, 2, \\dots$.
   - **Quadratic Probing**:
     $$h(k, i) = (h'(k) + c_1 i + c_2 i^2) \\pmod M$$
     Scans quadratic intervals ($i^2 = 1, 4, 9, \\dots$), jumping over local clusters.
   - **Double Hashing**:
     $$h(k, i) = (h_1(k) + i \\cdot h_2(k)) \\pmod M$$
     Uses a secondary hash function $h_2(k)$ to compute a key-dependent step size.

2. **Primary Clustering & Resolution**:
   - **Primary Clustering**: In Linear Probing, occupied slots coalesce into long contiguous blocks. Any key whose initial hash hits any slot in the cluster must probe sequentially to the end, extending the cluster further and degrading lookup to $\\mathcal{O}(n)$.
   - **Resolution via Double Hashing**: In Double Hashing, even if two keys produce identical initial hashes $h_1(k_1) = h_1(k_2)$, their second hash values $h_2(k_1) \\ne h_2(k_2)$ will be different.
   - Consequently, they traverse completely different probe sequences with different step sizes, eliminating primary and secondary clustering.""",
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
