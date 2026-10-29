import { Subject } from './types';

export const sem4DaaMaster: Subject = {
  id: "sem4-daa",
  name: "Design & Analysis of Algorithms (DAA)",
  code: "DAA403",
  color: "bg-purple-600",
  icon: "code",
  description: "Comprehensive University Syllabus for Design and Analysis of Algorithms — Asymptotic Bounds (Big-O, Omega, Theta), Master Theorem, Divide & Conquer, Greedy Strategy (Huffman, MST), Dynamic Programming (LCS, 0/1 Knapsack, MCM), Backtracking (N-Queens), and NP-Completeness Proofs.",
  semester: 4,
  units: [
    {
      id: "daa-u1",
      title: "Unit 1: Asymptotic Analysis & Recurrence Relations",
      description: "Formal asymptotic notations (O, Omega, Theta, o, omega), Recurrence solving techniques (Substitution, Recursion Tree, Master Theorem), and Amortized Analysis (Accounting and Potential Method).",
      topics: [
        {
          id: "daa-u1-t1",
          title: "Asymptotic Growth Bounds, Recurrence Trees, and the Master Theorem",
          simpleExplanation: "Algorithm analysis quantifies resource utilization (time and space) as a function of input size n independent of machine hardware. Asymptotic notations describe boundary growth rates: Big-O (upper bound), Big-Omega (lower bound), and Big-Theta (asymptotically tight bound). Recurrence relations model recursive algorithms and can be solved systematically using the Master Theorem by comparing work done at the root f(n) with work done at leaf leaves n^(log_b a).",
          detailedExplanation: `## 1. Formal Mathematical Definitions of Asymptotic Notations

Let $f(n)$ and $g(n)$ be functions mapping non-negative integers to real numbers:
1. **Big-O Notation ($O$) - Asymptotic Upper Bound**:
   \\[
   f(n) = O(g(n)) \\iff \\exists c > 0, n_0 \\ge 1 \\text{ such that } 0 \\le f(n) \\le c \\cdot g(n), \\quad \\forall n \\ge n_0
   \\]
2. **Big-Omega Notation ($\\Omega$) - Asymptotic Lower Bound**:
   \\[
   f(n) = \\Omega(g(n)) \\iff \\exists c > 0, n_0 \\ge 1 \\text{ such that } 0 \\le c \\cdot g(n) \\le f(n), \\quad \\forall n \\ge n_0
   \\]
3. **Big-Theta Notation ($\\Theta$) - Asymptotically Tight Bound**:
   \\[
   f(n) = \\Theta(g(n)) \\iff \\exists c_1, c_2 > 0, n_0 \\ge 1 \\text{ such that } 0 \\le c_1 \\cdot g(n) \\le f(n) \\le c_2 \\cdot g(n), \\quad \\forall n \\ge n_0
   \\]

---

## 2. The Master Theorem for Divide-and-Conquer Recurrences

For recurrences of the canonical form:
\\[
T(n) = a \\cdot T\\left(\\frac{n}{b}\\right) + f(n), \\quad a \\ge 1, b > 1
\\]
Compare $f(n)$ with the watershed benchmark function $n^{\\log_b a}$ (the total number of leaf nodes in the recursion tree):

- **Case 1 (Leaf Dominated)**:
  If $f(n) = O(n^{\\log_b a - \\epsilon})$ for some constant $\\epsilon > 0$, then:
  \\[
  T(n) = \\Theta(n^{\\log_b a})
  \\]
- **Case 2 (Balanced Work Across Levels)**:
  If $f(n) = \\Theta(n^{\\log_b a} \\log^k n)$ for some $k \\ge 0$, then:
  \\[
  T(n) = \\Theta(n^{\\log_b a} \\log^{k+1} n)
  \\]
- **Case 3 (Root Dominated)**:
  If $f(n) = \\Omega(n^{\\log_b a + \\epsilon})$ for some $\\epsilon > 0$, AND the regularity condition holds: $a \\cdot f(n/b) \\le c \\cdot f(n)$ for some $c < 1$ for all sufficiently large $n$, then:
  \\[
  T(n) = \\Theta(f(n))
  \\]`,
          shortNotes: "Big-O is upper bound, Big-Omega is lower bound, Big-Theta is tight bound. Master Theorem: T(n) = a*T(n/b) + f(n) compares f(n) with n^(log_b a).",
          examples: [
            {
              title: "Python Implementation: Master Theorem Solver & Benchmark",
              problem: "Demonstrate solving T(n) = 2T(n/2) + O(n) (MergeSort) and T(n) = 3T(n/2) + O(n^2) using Master Theorem cases.",
              explanation: "Compares f(n) with n^(log_b a) and applies the corresponding asymptotic case.",
              code: `import math

def solve_master(a, b, fn_deg):
    crit = math.log(a, b)
    print(f"Recurrence: T(n) = {a}T(n/{b}) + O(n^{fn_deg})")
    print(f"Critical exponent log_{b}({a}) = {crit:.3f}")

    if fn_deg < crit:
        print(f"Case 1 (Leaf heavy): T(n) = Theta(n^{crit:.3f})\\n")
    elif abs(fn_deg - crit) < 1e-6:
        print(f"Case 2 (Balanced): T(n) = Theta(n^{crit:.3f} * log n)\\n")
    else:
        print(f"Case 3 (Root heavy): T(n) = Theta(n^{fn_deg})\\n")

# MergeSort: T(n) = 2T(n/2) + n
solve_master(2, 2, 1)

# Strassen: T(n) = 7T(n/2) + n^2
solve_master(7, 2, 2)`,
              output: `Recurrence: T(n) = 2T(n/2) + O(n^1)
Critical exponent log_2(2) = 1.000
Case 2 (Balanced): T(n) = Theta(n^1.000 * log n)

Recurrence: T(n) = 7T(n/2) + O(n^2)
Critical exponent log_2(7) = 2.807
Case 1 (Leaf heavy): T(n) = Theta(n^2.807)`
            }
          ],
          keyPoints: [
            "Theta notation requires satisfying both upper and lower bounds simultaneously.",
            "In Master Theorem, a is number of subproblems, b is division factor, and f(n) is combine cost.",
            "MergeSort has a=2, b=2, crit=1, f(n)=n^1, resulting in Case 2: Theta(n log n).",
            "Strassen's matrix multiplication has a=7, b=2, crit=2.807, resulting in Case 1: Theta(n^2.807).",
            "Master Theorem cannot be applied if b is not constant (e.g. b=sqrt(n)) or if gap is non-polynomial."
          ],
          theoryQuestions: [
            {
              question: "State the Master Theorem for divide-and-conquer recurrences with all three cases and boundary regularity conditions.",
              marks: "7 Marks",
              answer: "The Master Theorem solves recurrences of the form T(n) = a*T(n/b) + f(n), where a >= 1 and b > 1. Let E = log_b(a). 1. Case 1: If f(n) = O(n^(E - epsilon)) for some epsilon > 0, then T(n) = Theta(n^E). 2. Case 2: If f(n) = Theta(n^E * log^k(n)) for k >= 0, then T(n) = Theta(n^E * log^(k+1)(n)). 3. Case 3: If f(n) = Omega(n^(E + epsilon)) for some epsilon > 0, and the regularity condition a*f(n/b) <= c*f(n) holds for some constant c < 1 for sufficiently large n, then T(n) = Theta(f(n))."
            }
          ],
          mcqs: [
            {
              question: "What is the tight asymptotic bound for the recurrence T(n) = 4T(n/2) + n^2?",
              options: [
                "Theta(n^2)",
                "Theta(n^2 log n)",
                "Theta(n^3)",
                "Theta(n log n)"
              ],
              correctIndex: 1,
              explanation: "Here a = 4, b = 2. Critical exponent is log_b(a) = log_2(4) = 2. Since f(n) = n^2 = Theta(n^2), this is Case 2 (k = 0), yielding Theta(n^2 log n)."
            }
          ]
        }
      ]
    },
    {
      id: "daa-u2",
      title: "Unit 2: Dynamic Programming & Optimization Problems",
      description: "Core principles of Dynamic Programming (Optimal Substructure, Overlapping Subproblems), Memoization vs Tabulation, Longest Common Subsequence (LCS), 0/1 Knapsack Problem, and Matrix Chain Multiplication (MCM).",
      topics: [
        {
          id: "daa-u2-t1",
          title: "Dynamic Programming Invariants, 0/1 Knapsack, and Longest Common Subsequence (LCS)",
          simpleExplanation: "Dynamic Programming (DP) solves complex optimization problems by breaking them down into simpler overlapping subproblems and caching their solutions to avoid redundant recomputations. A problem is suitable for DP if it satisfies two invariants: Optimal Substructure (an optimal solution to the problem contains optimal solutions to subproblems) and Overlapping Subproblems (subproblems are computed multiple times). Top-down DP uses recursive memoization, while Bottom-up DP uses iterative tabulation.",
          detailedExplanation: `## 1. Top-Down Memoization vs Bottom-Up Tabulation

| Metric | Top-Down (Memoization) | Bottom-Up (Tabulation) |
| :--- | :--- | :--- |
| **Approach** | Recursive descent with cache lookup | Iterative array traversal filling entries |
| **State Evaluation** | Computes **only needed states** | Systematically computes **all table states** |
| **Call Stack** | Overhead of function recursion and potential stack overflow | Zero recursion; pure loops with optimal cache locality |
| **Space Optimization** | Difficult to reduce state dimension | Frequently reducible from $O(n^2)$ to $O(n)$ space |

---

## 2. 0/1 Knapsack Problem (Dynamic Programming)

Given $n$ items, each with weight $w_i$ and profit $p_i$, and a knapsack of maximum weight capacity $W$:
- Each item can either be taken ($x_i = 1$) or not taken ($x_i = 0$); fractional splits are strictly disallowed.

### Recurrence Relation:
Let $DP[i][w]$ be the maximum profit attainable using a subset of the first $i$ items with capacity $w$:
\\[
DP[i][w] = 
\\begin{cases} 
0 & \\text{if } i = 0 \\text{ or } w = 0 \\\\
DP[i-1][w] & \\text{if } w_i > w \\quad (\\text{cannot fit}) \\\\
\\max\\big(DP[i-1][w], \\; p_i + DP[i-1][w - w_i]\\big) & \\text{if } w_i \\le w \\quad (\\text{exclude vs include})
\\end{cases}
\\]
- **Time Complexity**: $\\Theta(n \\cdot W)$ (Pseudo-polynomial time; dependent on numeric magnitude of $W$).
- **Space Complexity**: $O(n \\cdot W)$, optimizable to $O(W)$ using 1D backwards iteration.

---

## 3. Longest Common Subsequence (LCS)

Given two strings $X = \\langle x_1, \\dots, x_m \\rangle$ and $Y = \\langle y_1, \\dots, y_n \\rangle$:
\\[
c[i, j] = 
\\begin{cases}
0 & \\text{if } i = 0 \\text{ or } j = 0 \\\\
c[i-1, j-1] + 1 & \\text{if } x_i = y_j \\\\
\\max\\big(c[i-1, j], \\; c[i, j-1]\\big) & \\text{if } x_i \\ne y_j
\\end{cases}
\\]
- **Time Complexity**: $\\Theta(m \\cdot n)$.
- **Space Complexity**: $\\Theta(m \\cdot n)$. Backtracking through arrows recovers the actual subsequence.`,
          shortNotes: "Dynamic programming requires Optimal Substructure and Overlapping Subproblems. 0/1 Knapsack runs in O(n*W) time; LCS runs in O(m*n) time.",
          examples: [
            {
              title: "C Program: 0/1 Knapsack Bottom-Up DP with Item Tracking",
              problem: "Given profits {60, 100, 120}, weights {10, 20, 30}, and knapsack capacity W = 50, compute maximum profit and print selected items.",
              explanation: "Constructs 2D DP table and backtracks from DP[n][W] to identify chosen items.",
              code: `#include <stdio.h>

int max(int a, int b) { return (a > b) ? a : b; }

int main() {
    int val[] = {60, 100, 120};
    int wt[] = {10, 20, 30};
    int W = 50;
    int n = 3;

    int dp[4][51];

    for (int i = 0; i <= n; i++) {
        for (int w = 0; w <= W; w++) {
            if (i == 0 || w == 0)
                dp[i][w] = 0;
            else if (wt[i - 1] <= w)
                dp[i][w] = max(dp[i - 1][w], val[i - 1] + dp[i - 1][w - wt[i - 1]]);
            else
                dp[i][w] = dp[i - 1][w];
        }
    }

    printf("Maximum Attainable Profit: %d\\n", dp[n][W]);

    // Backtrack selected items
    int res = dp[n][W];
    int w = W;
    printf("Selected Items (0-indexed): ");
    for (int i = n; i > 0 && res > 0; i--) {
        if (res != dp[i - 1][w]) {
            printf("Item %d (val=%d, wt=%d) ", i - 1, val[i - 1], wt[i - 1]);
            res -= val[i - 1];
            w -= wt[i - 1];
        }
    }
    printf("\\n");
    return 0;
}`,
              output: `Maximum Attainable Profit: 220
Selected Items (0-indexed): Item 2 (val=120, wt=30) Item 1 (val=100, wt=20) `
            }
          ],
          keyPoints: [
            "DP requires two core properties: Optimal Substructure and Overlapping Subproblems.",
            "0/1 Knapsack recurrence: DP[i][w] = max(DP[i-1][w], val[i] + DP[i-1][w - wt[i]]).",
            "0/1 Knapsack is NP-Complete; DP runs in pseudo-polynomial time O(n * W).",
            "Longest Common Subsequence (LCS) runs in Theta(m * n) time.",
            "Fractional Knapsack can be solved greedily in O(n log n); 0/1 Knapsack requires Dynamic Programming."
          ],
          theoryQuestions: [
            {
              question: "Differentiate between Greedy Strategy and Dynamic Programming with appropriate algorithmic examples.",
              marks: "5 Marks",
              answer: "Greedy Strategy makes a locally optimal choice at each step without ever reconsidering past decisions (e.g., Fractional Knapsack, Dijkstra's algorithm, Huffman Coding). It operates in top-down fashion and is generally faster (O(n log n)). Dynamic Programming solves all subproblems, caches results, and considers all choices before making an optimal decision (e.g., 0/1 Knapsack, Floyd-Warshall, Matrix Chain Multiplication). DP is required when greedy choices do not lead to a globally optimal solution."
            }
          ],
          mcqs: [
            {
              question: "Why can the 0/1 Knapsack problem NOT be solved optimally using the Greedy Strategy based on profit-to-weight ratio?",
              options: [
                "Greedy strategy cannot take fractional items, leaving empty capacity that could hold higher total profit combinations",
                "0/1 Knapsack has no optimal substructure",
                "Profit-to-weight ratio cannot be computed in polynomial time",
                "Weights are floating-point numbers"
              ],
              correctIndex: 0,
              explanation: "Because items cannot be divided, choosing the item with the highest ratio may leave unused space in the knapsack that prevents taking an alternative combination with higher aggregate value."
            }
          ]
        }
      ]
    },
    {
      id: "daa-u3",
      title: "Unit 3: Greedy Paradigm & Advanced Graph Algorithms",
      description: "Greedy choice property and optimal substructure, Huffman Coding, Minimum Spanning Trees (Kruskal with DSU and Prim with Min-Heap), Single-Source Shortest Paths (Dijkstra, Bellman-Ford), and All-Pairs Shortest Paths (Floyd-Warshall).",
      topics: [
        {
          id: "daa-u3-t1",
          title: "Greedy Strategy, Minimum Spanning Trees (Kruskal & Prim), and Shortest Paths",
          simpleExplanation: "A greedy algorithm always picks the choice that looks best right now without looking ahead or regretting past decisions. Think of it like assembling an emergency toolkit: at every step, grab the single highest-value tool that fits, hoping it produces the best overall kit. While it doesn't always find the global optimum, it produces 100% optimal solutions for specific problems with the 'Greedy Choice Property' and 'Optimal Substructure'—such as finding the cheapest electrical wire network connecting all houses (Minimum Spanning Tree) or the quickest driving path across cities (Dijkstra's Algorithm).",
          detailedExplanation: `## 1. The Greedy Strategy & The Cut Property

A problem exhibits the **Greedy Choice Property** if a globally optimal solution can be assembled by iteratively making locally optimal (greedy) choices without exploring alternatives or rolling back.

### The Cut Property for Minimum Spanning Trees (MST)
Let $G = (V, E)$ be a connected, undirected graph with real edge weights:
- A **Cut** $(S, V - S)$ is a partition of vertices $V$ into two disjoint non-empty subsets.
- An edge $(u, v) \\in E$ **crosses** the cut if $u \\in S$ and $v \\in (V - S)$.
- An edge is **light** if its weight is the minimum among all edges crossing the cut.

> **MST Cut Theorem**: If edge $e = (u, v)$ is a light edge crossing a cut $(S, V - S)$, then $e$ belongs to some Minimum Spanning Tree of $G$.

---

## 2. Kruskal's vs Prim's MST Algorithms Comparison

| Criterion | Kruskal's Algorithm | Prim's Algorithm |
| :--- | :--- | :--- |
| **Strategy** | Edge-centric (sorts all edges globally) | Vertex-centric (grows a single connected tree) |
| **Data Structure** | Disjoint Set Union (DSU) with Path Compression | Priority Queue (Min-Heap / Fibonacci Heap) |
| **Cycle Detection** | \`Find(u) == Find(v)\` via DSU | Maintained implicitly via visited boolean set |
| **Time Complexity** | $O(E \\log E) = O(E \\log V)$ | $O(E \\log V)$ with binary heap; $O(E + V \\log V)$ with Fibonacci heap |
| **Best Suited For** | Sparse graphs ($E \\ll V^2$) | Dense graphs ($E \\approx V^2$) |

---

## 3. Dijkstra vs Bellman-Ford Shortest Path

- **Dijkstra's Algorithm**:
  - Maintains a priority queue of unvisited vertices ordered by tentative distance $d[u]$.
  - Greedily extracts $\\min(d[u])$ and relaxes outgoing edges:
    \\[
    d[v] = \\min(d[v], d[u] + w(u, v))
    \\]
  - **Constraint**: Edge weights **must be non-negative** ($w(u, v) \\ge 0$). Fails completely on graphs with negative edge weights.
  - **Complexity**: $O((V + E) \\log V)$ using a binary min-heap.

- **Bellman-Ford Algorithm**:
  - Relaxes all $|E|$ edges $|V| - 1$ times consecutively.
  - Handles **negative edge weights**.
  - Performs an additional $|V|$-th relaxation pass: if any distance decreases, a **negative-weight cycle** exists reachable from source $S$.
  - **Complexity**: $O(V \\cdot E)$.`,
          shortNotes: "Kruskal uses DSU O(E log V); Prim uses Min-Heap O(E log V); Dijkstra fails on negative edges; Bellman-Ford detects negative cycles in O(V*E); Floyd-Warshall computes all-pairs shortest paths in O(V^3).",
          examples: [
            {
              title: "Python Implementation: Kruskal's MST with Disjoint Set Union (DSU)",
              problem: "Find the Minimum Spanning Tree weight and edge set of an undirected weighted graph using Kruskal's greedy strategy.",
              explanation: "Sorts edges by weight ascendingly and uses Path Compression + Union by Rank to avoid cycles in near-constant alpha(V) time per operation.",
              code: `class DisjointSet:
    def __init__(self, n: int):
        self.parent = list(range(n))
        self.rank = [0] * n

    def find(self, i: int) -> int:
        if self.parent[i] == i:
            return i
        self.parent[i] = self.find(self.parent[i])  # Path compression
        return self.parent[i]

    def union(self, u: int, v: int) -> bool:
        root_u = self.find(u)
        root_v = self.find(v)
        if root_u == root_v:
            return False  # Cycle detected
        # Union by rank
        if self.rank[root_u] < self.rank[root_v]:
            self.parent[root_u] = root_v
        elif self.rank[root_u] > self.rank[root_v]:
            self.parent[root_v] = root_u
        else:
            self.parent[root_v] = root_u
            self.rank[root_u] += 1
        return True

def kruskal_mst(vertices: int, edges: list[tuple[int, int, int]]):
    # Sort edges by weight: (weight, u, v)
    edges.sort()
    dsu = DisjointSet(vertices)
    mst = []
    total_cost = 0

    for weight, u, v in edges:
        if dsu.union(u, v):
            mst.append((u, v, weight))
            total_cost += weight
            if len(mst) == vertices - 1:
                break

    return total_cost, mst

# Graph with 4 vertices (0, 1, 2, 3)
graph_edges = [
    (10, 0, 1),
    (6, 0, 2),
    (5, 0, 3),
    (15, 1, 3),
    (4, 2, 3)
]
cost, tree = kruskal_mst(4, graph_edges)
print(f"MST Total Weight: {cost}")
print("Included Edges:")
for u, v, w in tree:
    print(f"Edge ({u} - {v}) with weight {w}")`,
              output: `MST Total Weight: 19
Included Edges:
Edge (2 - 3) with weight 4
Edge (0 - 3) with weight 5
Edge (0 - 1) with weight 10`
            }
          ],
          keyPoints: [
            "Greedy choice property guarantees locally optimal choices lead to global optimum.",
            "Cut Property proves light edges crossing any cut are safe for MST inclusion.",
            "Kruskal's algorithm runs in O(E log E) time using Disjoint Set Union (DSU).",
            "Dijkstra's shortest path runs in O((V + E) log V) but fails if negative weight edges exist.",
            "Bellman-Ford detects negative weight cycles in O(V * E) time."
          ],
          theoryQuestions: [
            {
              question: "State and prove the Cut Property of Minimum Spanning Trees. How does Kruskal's algorithm leverage it?",
              marks: "7 Marks",
              answer: "Let G=(V,E) be a connected graph. A cut (S, V-S) partitions vertices. An edge e=(u,v) crossing the cut with minimum weight among all crossing edges is termed light. Proof by contradiction: Assume T is an MST that does not contain e. Adding e to T creates a unique simple cycle. Because u in S and v in V-S, there must exist at least one other edge e' on this cycle crossing the cut. Since e is light, weight(e) <= weight(e'). Replacing e' with e produces a new spanning tree T' = T - {e'} + {e} with weight(T') = weight(T) - weight(e') + weight(e) <= weight(T). Thus T' is also an MST containing e. Kruskal's algorithm sorts all edges ascendingly and greedily includes edges crossing disjoint connected component cuts using DSU."
            },
            {
              question: "Why does Dijkstra's algorithm fail on graphs containing negative edge weights?",
              marks: "3 Marks",
              answer: "Dijkstra assumes that once a vertex u is marked visited (settled) from the priority queue, its shortest distance d[u] is final and cannot be improved. A negative edge encountered later could provide a shorter route to u through another node, violating the greedy invariant and leaving the distance un-updated."
            }
          ],
          mcqs: [
            {
              question: "What is the time complexity of Kruskal's algorithm on a connected graph with V vertices and E edges using Disjoint Set Union with path compression?",
              options: ["O(E log V)", "O(V^2)", "O(V log E)", "O(E * V)"],
              correctIndex: 0,
              explanation: "Sorting the E edges takes O(E log E) = O(E log V). The 2E Find and V-1 Union operations take O(E * alpha(V)), where alpha is the inverse Ackermann function (effectively constant <= 4). Hence dominant time is O(E log V)."
            }
          ]
        }
      ]
    },
    {
      id: "daa-u4",
      title: "Unit 4: Backtracking and Branch-and-Bound",
      description: "State space trees, Depth-First Backtracking (N-Queens, Graph Coloring, Hamiltonian Cycle, Subset Sum), and Breadth-First Branch-and-Bound (LCBB, 0/1 Knapsack B&B, Traveling Salesperson Problem).",
      topics: [
        {
          id: "daa-u4-t1",
          title: "State Space Trees, Backtracking Paradigms (N-Queens), and Branch-and-Bound",
          simpleExplanation: "When a problem has no clever greedy or dynamic programming shortcut, we must search through combinations. Backtracking is like exploring a dark labyrinth: walk forward until you hit a dead end, backtrack to the last intersection, and try the next path. It builds candidate solutions step-by-step and 'prunes' (abandons) any branch as soon as it violates a constraint. Branch-and-Bound does the same for optimization problems but uses mathematical bounds (best-case estimates) to prune entire subtrees that cannot possibly beat our current best solution.",
          detailedExplanation: `## 1. Backtracking vs Branch-and-Bound Architectural Comparison

\`\`\`mermaid
flowchart TD
    Root["Root Node (Initial State)"] --> B1["Branch 1: Valid Path"]
    Root --> B2["Branch 2: Dead End"]
    Root --> B3["Branch 3: Pruned Subtree"]
    B1 --> Sol["Solution Leaf"]
    B2 -.->|"Prune (Constraint Violated)"| Backtrack["Backtrack Step"]
    B3 -.->|"Bound >= Best (Optimization)"| Pruned["Discard Branch"]
\`\`\`

| Attribute | Backtracking | Branch-and-Bound |
| :--- | :--- | :--- |
| **Search Strategy** | Depth-First Search (DFS) | Breadth-First Search (BFS) / Best-First Search (LCBB) |
| **Problem Type** | Decision, Satisfiability, Enumeration (e.g., N-Queens, Sudoku) | Optimization (Minimization / Maximization e.g., TSP, 0/1 Knapsack) |
| **Pruning Mechanism** | Bounding functions testing feasibility / constraints | Upper & Lower cost bounds pruning non-promising subtrees |
| **Data Structure** | Call stack / recursion | Priority Queue / Min-Heap |
| **Memory Footprint** | $O(d)$ where $d$ is maximum tree depth (Linear) | $O(b^d)$ exponential in worst case |

---

## 2. The N-Queens Problem Formulation

Place $N$ non-attacking queens on an $N \\times N$ chessboard such that no two queens share the same row, column, or diagonal:
- **Representation**: Vector $X = [x_1, x_2, \\dots, x_n]$, where $x_i$ represents the column position of queen in row $i$.
- **Constraint Formulation**:
  1. No two queens in same column: $x_i \\ne x_j$ for all $i \\ne j$.
  2. No two queens on same diagonal: $|x_i - x_j| \\ne |i - j|$.

---

## 3. Branch-and-Bound for Traveling Salesperson Problem (TSP)

TSP finds the minimum weight Hamiltonian cycle traversing every vertex exactly once and returning to start.
1. **Cost Matrix Reduction**:
   - Subtract minimum value of each row from all elements in that row.
   - Subtract minimum value of each column from all elements in that column.
   - The sum of subtracted row and column values defines the **Lower Bound** ($LB$) of the root.
2. **LCBB (Least Cost Branch and Bound)**:
   - Branching generates state space nodes for each unvisited city.
   - For each child node, calculate reduced cost matrix and updated lower bound.
   - The Priority Queue always expands the node with the lowest lower bound first.
   - Nodes with $LB \\ge \\text{current best solution}$ are immediately pruned.`,
          shortNotes: "Backtracking uses DFS with constraint pruning (N-Queens, Graph Coloring); Branch & Bound uses BFS/LCBB with min-heap bounds for optimization (TSP, Knapsack).",
          examples: [
            {
              title: "Python Implementation: N-Queens Backtracking Solver",
              problem: "Find all valid configurations for placing N non-attacking queens on an N x N chessboard.",
              explanation: "Uses recursive backtracking with column, main diagonal (row - col), and anti-diagonal (row + col) tracking sets for O(1) conflict detection.",
              code: `def solve_n_queens(n: int):
    solutions = []
    board = [['.' for _ in range(n)] for _ in range(n)]

    cols = set()
    diag_pos = set()  # (row + col)
    diag_neg = set()  # (row - col)

    def backtrack(row: int):
        if row == n:
            solutions.append(["".join(r) for r in board])
            return

        for col in range(n):
            if col in cols or (row + col) in diag_pos or (row - col) in diag_neg:
                continue

            # Place queen
            board[row][col] = 'Q'
            cols.add(col)
            diag_pos.add(row + col)
            diag_neg.add(row - col)

            backtrack(row + 1)

            # Undo move (backtrack)
            board[row][col] = '.'
            cols.remove(col)
            diag_pos.remove(row + col)
            diag_neg.remove(row - col)

    backtrack(0)
    return solutions

# Solve for 4-Queens
solutions_4 = solve_n_queens(4)
print(f"Total Solutions for 4-Queens: {len(solutions_4)}")
for idx, sol in enumerate(solutions_4, 1):
    print(f"\\nSolution {idx}:")
    for row in sol:
        print(row)`,
              output: `Total Solutions for 4-Queens: 2

Solution 1:
.Q..
...Q
Q...
..Q.

Solution 2:
..Q.
Q...
...Q
.Q..`
            }
          ],
          keyPoints: [
            "Backtracking performs DFS exploration of state space trees with constraint pruning.",
            "N-Queens diagonal attack check requires |row1 - row2| != |col1 - col2|.",
            "Branch and Bound explores nodes using BFS or LCBB (Least Cost Branch and Bound) using priority queues.",
            "LCBB prunes nodes whose lower bound exceeds the current best known solution.",
            "Reduced cost matrices establish lower bounds for the Traveling Salesperson Problem."
          ],
          theoryQuestions: [
            {
              question: "Differentiate between Backtracking and Branch-and-Bound paradigms with respect to tree traversal, data structures, and application domains.",
              marks: "5 Marks",
              answer: "1. Traversal: Backtracking uses Depth-First Search (DFS); Branch-and-Bound uses Breadth-First Search (BFS) or Best-First / Least-Cost (LCBB). 2. Data Structure: Backtracking utilizes the implicit recursion stack; Branch-and-Bound utilizes an explicit FIFO queue or Min-Heap Priority Queue. 3. Objective: Backtracking solves decision and constraint satisfaction problems (e.g., N-Queens, Sudoku, Hamiltonian cycle); Branch-and-Bound solves discrete combinatorial optimization problems (e.g., 0/1 Knapsack, TSP). 4. Pruning: Backtracking prunes when feasibility constraints are violated; Branch-and-Bound prunes when calculated bounds cannot improve upon the best known cost."
            }
          ],
          mcqs: [
            {
              question: "In the 8-Queens problem, how many total non-attacking solutions exist on a standard 8x8 chessboard?",
              options: ["92", "12", "64", "48"],
              correctIndex: 0,
              explanation: "There are exactly 92 distinct solutions to the 8-Queens problem (12 unique solutions if rotations and reflections are grouped as equivalent)."
            }
          ]
        }
      ]
    },
    {
      id: "daa-u5",
      title: "Unit 5: String Matching, NP-Completeness & Approximation",
      description: "String matching algorithms (Naive, Rabin-Karp, Knuth-Morris-Pratt KMP), Complexity classes P, NP, NP-Complete, and NP-Hard, Cook-Levin Theorem, polynomial-time reductions, and approximation algorithms.",
      topics: [
        {
          id: "daa-u5-t1",
          title: "KMP String Matching, NP-Completeness Classes, and Approximation Algorithms",
          simpleExplanation: "When searching for a word in a book, the naive approach slides the word one letter at a time, often re-reading characters it already saw. The Knuth-Morris-Pratt (KMP) algorithm is much smarter: it analyzes the word beforehand to know exactly how far to skip ahead without ever backtracking in the main text, finishing in linear O(n) time. Meanwhile, computational complexity deals with the hardest problems in computer science: 'P' represents problems that can be solved quickly by computers (polynomial time); 'NP' are problems whose answers can be verified quickly. NP-Complete problems are the toughest of all—if someone finds a fast polynomial algorithm for any single one of them, every single NP problem can be solved fast!",
          detailedExplanation: `## 1. Knuth-Morris-Pratt (KMP) String Matching Algorithm

The naive string matching algorithm takes $O((n - m + 1) \\cdot m)$ worst-case time because mismatched characters cause full rollback of the text index $i$.

The **KMP Algorithm** achieves optimal $O(n + m)$ linear time using the **Longest Prefix Suffix (LPS)** array $\\pi$:
- $\\pi[q]$ represents the length of the longest proper prefix of pattern $P[1 \\dots q]$ that is also a suffix of $P[1 \\dots q]$.
- When a mismatch occurs at $P[q + 1] \\ne T[i]$, instead of resetting $i$, set $q = \\pi[q]$ and continue comparing from $T[i]$.

---

## 2. Computational Complexity Taxonomy (P, NP, NP-Complete, NP-Hard)

\`\`\`mermaid
flowchart TD
    subgraph NPHard["NP-Hard (At least as hard as any problem in NP)"]
        subgraph NP["NP (Verifiable in Polynomial Time)"]
            NPC["NP-Complete (Intersection: in NP and NP-Hard)"]
            P["P (Solvable in Polynomial Time)"]
        end
    end
\`\`\`

1. **Class P**:
   \\[
   P = \\{ L \\subseteq \\Sigma^* \\mid L \\text{ is decidable by a Deterministic Turing Machine in } O(n^k) \\text{ for some } k \\ge 1 \\}
   \\]
   Examples: Shortest Path (Dijkstra), MST (Kruskal), Matrix Multiplication, Sorting.

2. **Class NP (Nondeterministic Polynomial Time)**:
   - Decision problems for which a proposed certificate (candidate solution) can be verified in polynomial time by a Deterministic Turing Machine.
   - Alternatively: problems solvable in polynomial time by a Non-Deterministic Turing Machine (NTM).

3. **NP-Hard**:
   A language $L$ is NP-Hard if for every $L' \\in NP$, $L' \\le_p L$ (every problem in NP is polynomial-time reducible to $L$). $L$ does not need to be in NP.

4. **NP-Complete (NPC)**:
   A language $L$ is NP-Complete if:
   1. $L \\in NP$, AND
   2. $L$ is NP-Hard ($L' \\le_p L$ for all $L' \\in NP$).

> **Cook-Levin Theorem (1971)**: The Boolean Satisfiability Problem (SAT) is NP-Complete. It proved the existence of the first NP-Complete problem directly from Turing Machine state transitions without relying on prior reductions.

---

## 3. Vertex Cover 2-Approximation Algorithm

Since NP-Complete optimization problems cannot be solved optimally in polynomial time (unless $P = NP$), we use **Approximation Algorithms** with guaranteed approximation ratio $\\rho$:
\\[
\\max\\left(\\frac{C}{C^*}, \\frac{C^*}{C}\\right) \\le \\rho
\\]

### 2-Approximation for Vertex Cover:
1. Initialize $C = \\emptyset$, $E' = E$.
2. While $E' \\ne \\emptyset$:
   - Pick an arbitrary edge $(u, v) \\in E'$.
   - Add **both** $u$ and $v$ to $C$: $C = C \\cup \\{u, v\\}$.
   - Remove from $E'$ all edges incident to either $u$ or $v$.
3. Return $C$.
- **Guarantee**: $|C| \\le 2 \\cdot |C^*|$ (guaranteed within $2\\times$ of the true minimum vertex cover).`,
          shortNotes: "KMP runs in O(n + m) using LPS array. P = polynomial time solvable. NP = polynomial time verifiable. NPC = in NP and NP-Hard. Cook-Levin proved SAT is NP-Complete. Vertex Cover 2-approx selects both endpoints of arbitrary edges.",
          examples: [
            {
              title: "Python Implementation: KMP String Matching Algorithm",
              problem: "Find all 0-indexed occurrences of pattern P in text T in linear O(n + m) time using the prefix array.",
              explanation: "Constructs the LPS array and scans text without backtracking the text index.",
              code: `def compute_lps(pattern: str) -> list[int]:
    m = len(pattern)
    lps = [0] * m
    length = 0  # length of previous longest prefix suffix
    i = 1

    while i < m:
        if pattern[i] == pattern[length]:
            length += 1
            lps[i] = length
            i += 1
        else:
            if length != 0:
                length = lps[length - 1]
            else:
                lps[i] = 0
                i += 1
    return lps

def kmp_search(text: str, pattern: str) -> list[int]:
    n = len(text)
    m = len(pattern)
    lps = compute_lps(pattern)
    occurrences = []

    i = 0  # index for text
    j = 0  # index for pattern

    while i < n:
        if pattern[j] == text[i]:
            i += 1
            j += 1

        if j == m:
            occurrences.append(i - j)
            j = lps[j - 1]
        elif i < n and pattern[j] != text[i]:
            if j != 0:
                j = lps[j - 1]
            else:
                i += 1

    return occurrences

# Test string search
text_sample = "ABABDABACDABABCABAB"
pattern_sample = "ABABCABAB"
matches = kmp_search(text_sample, pattern_sample)
print(f"Text:    {text_sample}")
print(f"Pattern: {pattern_sample}")
print(f"Pattern found at index positions: {matches}")`,
              output: `Text:    ABABDABACDABABCABAB
Pattern: ABABCABAB
Pattern found at index positions: [10]`
            }
          ],
          keyPoints: [
            "KMP achieves O(n + m) worst-case time by avoiding text index rollback.",
            "LPS array stores the length of the longest proper prefix that is also a suffix.",
            "P is the class of decision problems solvable in polynomial time O(n^k).",
            "NP problems are verifiable in polynomial time given a certificate.",
            "Cook-Levin Theorem proved Boolean Satisfiability (SAT) is NP-Complete."
          ],
          theoryQuestions: [
            {
              question: "State the Cook-Levin Theorem and describe the procedure to prove that a newly discovered problem X is NP-Complete.",
              marks: "7 Marks",
              answer: "The Cook-Levin Theorem states that the Boolean Satisfiability Problem (SAT) is NP-Complete, meaning any problem in NP can be reduced to SAT in polynomial time. To prove that a new problem X is NP-Complete: 1. Prove X in NP by exhibiting a polynomial-time verification algorithm that validates a given certificate in O(n^k) time. 2. Select a known NP-Complete problem Y (e.g., 3-SAT, Vertex Cover, Hamiltonian Cycle). 3. Construct a transformation function f that maps any instance y of Y to an instance f(y) of X in polynomial time (Reduction step). 4. Prove correctness: instance y has a YES answer in Y if and only if f(y) has a YES answer in X. Conclude that X is NP-Complete."
            }
          ],
          mcqs: [
            {
              question: "If a decision problem X is known to be NP-Complete, which of the following statements must be true?",
              options: [
                "If X can be solved in polynomial time, then P = NP",
                "X cannot be verified in polynomial time",
                "X is not in NP",
                "X can be solved in O(n log n) time on a deterministic computer"
              ],
              correctIndex: 0,
              explanation: "By definition of NP-Completeness, every problem in NP reduces to X in polynomial time. If X is solvable in polynomial time, all problems in NP become solvable in polynomial time, proving P = NP."
            }
          ]
        }
      ]
    }
  ]
};
