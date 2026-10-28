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
      id: "daa-u4",
      title: "Unit 4: Dynamic Programming & Optimization Problems",
      description: "Core principles of Dynamic Programming (Optimal Substructure, Overlapping Subproblems), Memoization vs Tabulation, Longest Common Subsequence (LCS), 0/1 Knapsack Problem, and Matrix Chain Multiplication (MCM).",
      topics: [
        {
          id: "daa-u4-t1",
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
    }
  ]
};
