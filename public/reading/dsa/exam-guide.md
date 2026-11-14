> Everything here is taken from the DSA Complete Study Guide: for each unit, what examiners ask, what to write, the common mistakes and quick self-checks, followed by the last-night revision sheet.

# Introduction: Data Structures, ADTs and Algorithm Efficiency

## Unit 1 — What to write in the exam

Classify data structures → the tree diagram + one line each for primitive/non-primitive, linear/non-linear, with examples.

ADT → definition, TV-remote idea, components, the model diagram, Stack ADT as example, advantages.

Asymptotic notations → the three definitions with inequalities, the graph, and a worked c/n₀ example.

### Check yourself

1. Is a linked list static or dynamic? linear or non-linear?

2. What’s the difference between an ADT and a data structure?

3. Complexity of: for(i=1;i<=n;i++) for(j=1;j<=n;j*=2) x++;

4. Show 5n² + 3 = O(n²).

5. Arrange: n log n, 2ⁿ, log n, n², √n.

Answers: 1) Dynamic; linear. 2) ADT = what (operations); data structure = how (implementation). 3) O(n log n). 4) 5n² + 3 ≤ 6n² for n ≥ 2 → c = 6, n₀ = 2. 5) log n < √n < n log n < n² < 2ⁿ.

# Recursion

## Unit 2 — What to write in the exam

Define recursion + base case + recursive case + why the base case is essential (stack overflow).

Factorial: definition, algorithm, trace with the stack picture.

Fibonacci: definition, code, recursion tree, O(2ⁿ).

TOH: rules, 3-step idea, algorithm, 7-move table for n = 3, proof of 2ⁿ − 1.

Recursion vs iteration table.

### Common mistakes

Forgetting the base case, or writing one that is never reached (fib with only n == 0 ). Mixing up the peg order in the TOH recursive calls.

Saying TOH needs 2ⁿ moves (it’s 2ⁿ − 1).

### Check yourself

1. What happens if a recursive function has no base case?

2. Trace fact(5).

3. How many calls does fib(5) make? (Draw the tree.)

4. Moves for 6 disks?

5. Is fact tail-recursive?

Answers: 1) Infinite recursion → stack overflow. 2) 5 × 4 × 3 × 2 × 1 × 1 = 120. 3) 15. 4) 63. 5) No — the multiplication happens after the call returns.

# Linear Lists, Part A: Arrays and Stacks

### Part A — Check yourself

1. Address of A[4][6] in A[8][10], base 500, w = 2, row-major?

2. What are overflow and underflow conditions of an array stack?

3. Convert (A + B * C) / (D − E) to postfix.

4. Evaluate 2 3 4 * + 5 −.

Answers: 1) 500 + 2(10 × 4 + 6) = 592. 2) TOP = MAX − 1; TOP = −1. 3) A B C * + D E − /. 4) 3 × 4 = 12, 2 + 12 = 14, 14 − 5 = 9.

# Linear Lists, Part C: Linked Lists

### Unit 3 — What to write in the exam (question bank map)

3-mark: Define stack/queue/deque/priority queue. Overflow & underflow conditions. Input- vs output-restricted deque. SLL node structure in C. Linear vs circular queue (memory). Advantages of linked list over array. DLL advantage over SLL. CLL application. 5-mark: PUSH/POP algorithms; enqueue/dequeue for linear and circular queue; deque types with

diagram; priority queue using array and its limitations; insert at beginning of SLL; delete last node of DLL; traverse CLL; compare SLL/DLL/CLL; stack & queue from one deque; min- heap priority queue. 7-mark: Convert infix → postfix with table (e.g., A+(B*C−(D/E^F)*G)*H → A B C * D E F ^ / G * − H * + ); evaluate postfix; complete linear and circular queue with trace; deque with all four operations; max-heap PQ trace; SLL insertion at

beginning/end/position; DLL insert/delete at position; SLL→CLL; reverse SLL; detect & remove loop; merge two sorted lists; array vs linked list; queue applications.

### Unit 3 — Common mistakes

Stack: checking overflow after incrementing TOP (must check first).

Postfix evaluation: popping the operands in the wrong order for − and /.

Circular queue: writing rear + 1 instead of (rear + 1) % N .

Linked list insertion: changing prev->next before setting new->next (loses the rest of the list).

Circular list traversal using while (p != NULL) (infinite loop).

Forgetting the empty-list and single-node special cases.

### Unit 3 — Check yourself

1. Queue of size 5 using an array: after inserting 1, 2, 3, 4, 5 and deleting twice, can a linear queue accept a new element? A circular one?

2. In a circular queue with N = 6, F = 4, R = 3 — is it full?

3. Write the two pointer statements to insert node N after node P in an SLL.

4. Which linked list lets you delete a node in O(1) when you have a pointer to it?

5. Max-heap [60, 50, 40, 10, 30] — after extract-max?

Answers: 1) Linear: no (REAR = N − 1 → overflow); circular: yes (REAR wraps to 0). 2) (3 + 1) % 6 = 4 = F → full. 3) N->next = P->next; P->next = N; . 4) Doubly linked list. 5) [50, 30, 40, 10].

# Non-Linear Lists: Trees

## Unit 4 — Exam Questions You Must Be Able to Answer

1. Define tree and explain terminology (root, leaf, degree, level, height, depth, sibling) with a diagram.

2. Define binary tree; types (strict, complete, skewed); properties (2ⁱ, 2^(h+1)−1, n₀ = n₂+1).

3. Array vs linked representation of a binary tree.

4. Give preorder, inorder, postorder (and level order) for a given tree. Write recursive and non- recursive algorithms.

5. Construct a binary tree from inorder + preorder/postorder.

6. What is a threaded binary tree? Why is it needed? Draw threads for a given tree; write inorder traversal.

7. Construct a BST from a sequence; delete nodes (all three cases); show inorder.

8. Convert a general tree to a binary tree.

### Unit 4 — Common mistakes

Visiting the right subtree before the left.

In postorder, writing the root before finishing both subtrees.

BST: comparing only with the root (the rule applies at every node).

Two-children delete: using the inorder successor from the left subtree (it must be the smallest in the right subtree, or the largest in the left — the predecessor).

General → binary: making the second child a left child (siblings always go right).

### Unit 4 — Check yourself

1. Max nodes in a binary tree of height 3? 2. Inorder of a BST built from 15, 10, 20, 8, 12? 3. Preorder A B D E C F and inorder D B E A F C — draw the tree. 4. Why is a threaded tree useful?

Answers: 1) 2⁴ − 1 = 15. 2) 8 10 12 15 20. 3) A(B(D, E), C(F, –)). 4) Inorder traversal without a

stack/recursion, using the n + 1 empty pointers.

# Graphs

## Unit 5 — Exam Questions You Must Be Able to Answer

1. Define graph; explain terminologies (directed, undirected, weighted, degree, in/out-degree, path, cycle, connected, complete graph) with diagrams.

2. Represent a given graph by adjacency matrix and adjacency list; compare them.

3. Explain DFS with algorithm and give the DFS order for a given graph.

4. Explain BFS with algorithm, show queue contents step by step.

5. Differentiate DFS and BFS. Applications of graphs.

### Unit 5 — Common mistakes

Forgetting the visited check (infinite loop on a cycle).

In BFS, marking a vertex visited when dequeued instead of when enqueued (it may then be enqueued twice).

Writing an undirected adjacency matrix that isn’t symmetric.

### Unit 5 — Check yourself

1. A graph has 5 vertices with degrees 3, 2, 2, 2, 1. How many edges? 2. Space for an adjacency matrix of 100 vertices? 3. Which traversal finds the fewest-edge path? 4. Complete graph with 6 vertices — edges?

Answers: 1) Σdeg/2 = 10/2 = 5. 2) 100 × 100 = 10,000 entries. 3) BFS. 4) 6 × 5 / 2 = 15.

# Searching & Sorting

## Unit 6 — Exam Questions You Must Be Able to Answer

1. Write algorithms for linear and binary search; trace binary search; compare them.

2. Sort a given list using bubble / selection / insertion / quick sort showing every pass.

3. Explain quick sort with partition algorithm; best/worst case.

4. What is external sorting? Explain external merge sort.

5. Compare sorting algorithms (table above).

6. What is hashing? Explain hash functions and collision-resolution techniques with examples (chaining, linear probing).

### Unit 6 — Common mistakes

Using binary search on unsorted data.

Bubble sort: forgetting that after pass k the last k elements are already in place (inner loop can stop earlier).

Quick sort: forgetting the final swap of the pivot with A[j].

### Unit 6 — Check yourself

1. Max comparisons in binary search of 1000 elements? 2. Which sort makes at most n − 1 swaps? 3. Best case of insertion sort and when? 4. h(k) = k mod 7 with linear probing: insert 10, 17, 24 — where do they go?

Answers: 1) ⌊log₂1000⌋ + 1 = 10. 2) Selection sort. 3) O(n), already sorted input. 4) 10 → 3; 17 → 3 taken → 4; 24 → 3, 4 taken → 5.

# Last-Night Revision Sheet (DSA)

Unit 1 — DS = organised storage for efficient use. Primitive (int, char, float) vs non-primitive (array, list, tree). Linear (array, stack, queue, LL) vs non-linear (tree, graph). ADT = what (values + operations), not how. O = upper (≤), Ω = lower (≥), Θ = tight. Order: 1 < log n < √n < n < n log n < n² < n³ < 2ⁿ < n!. Nested loops multiply, sequential add, i*=2 → log n.

Unit 2 — Recursion = base case + recursive case. fact(n) = n·fact(n−1), fact(0)=1 → O(n). fib → O(2ⁿ). TOH moves = 2ⁿ − 1; steps: n−1 to aux, largest to dest, n−1 to dest.

Unit 3 —

Address: 1-D Base + w(i−LB) ; row-major Base + w[n(i−LR)+(j−LC)] ; column-major Base + w[m(j−LC)+(i−LR)] .

Stack LIFO; overflow TOP = N−1; underflow TOP = −1; PEEP returns S[TOP−I+1].

Infix→postfix: operand out; ( push; ) pop till ( ; operator pops higher/equal (not for ^ ); end pop all. Postfix eval: pop B then A, push A op B.

Queue FIFO; linear full R = N−1. Circular next = (i+1)%N, full (R+1)%N = F, empty F = −1. Deque: input-restricted (insert one end), output-restricted (delete one end). PQ: heap insert/delete O(log n).

SLL insert front: new→next = head; head = new . Reverse: prev/cur/next. Loop: slow/fast pointers. DLL: prev+next pointers, two-way traversal. CLL: last→next = first, stop when p == head ; round robin.

Unit 4 — Max nodes at level i = 2ⁱ; height h → 2^(h+1)−1 nodes; n₀ = n₂ + 1. Array child 2i+1, 2i+2. Pre NLR, In LNR, Post LRN. Inorder of BST = sorted. BST delete with two children → inorder successor. Threaded BT: NULL links → inorder predecessor/successor + flag bits. General → binary: left = first child, right = next sibling.

Unit 5 — G = (V, E). Σdeg = 2E. Complete graph n(n−1)/2 edges. Matrix O(V²) space, list O(V+E). DFS = stack/recursion (deep). BFS = queue (level-wise, shortest path in unweighted).

Unit 6 — Linear O(n) any data; binary O(log n) sorted only. Bubble: adjacent swaps, best O(n) with flag. Selection: pick min, ≤ n−1 swaps, always O(n²). Insertion: shift and insert, best O(n). Quick: pivot partition, avg O(n log n), worst O(n²). Merge: O(n log n) always, O(n) space. External sort = make sorted runs + k-way merge. Hashing h(k) = k mod m; collisions → chaining (hashed lists) or open addressing (linear/quadratic/double probing).
