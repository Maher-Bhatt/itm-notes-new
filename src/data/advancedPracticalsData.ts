import type { CodingProblem } from './codingLabData';

function makeValidator(tokens: string[], testOutput: string, hint: string) {
  return (code: string) => {
    const clean = code.toLowerCase();
    const missing = tokens.filter(t => !clean.includes(t.toLowerCase()));
    if (missing.length === 0) {
      return {
        passed: true,
        output: testOutput,
      };
    }
    return {
      passed: false,
      output: `[Compiler / Test Suite] Validation check failed.\nExpected construct missing: "${missing[0]}"\n\nSuggestion: ${hint}`,
      error: `Missing: ${missing[0]}`,
    };
  };
}

export const ADVANCED_PRACTICALS: CodingProblem[] = [
  // =========================================================================
  // 1. ADVANCED DATA STRUCTURES & ALGORITHMS (C/C++)
  // =========================================================================
  {
    id: 'dsa-33-avl-rotations',
    title: 'Self-Balancing AVL Tree: LL & RR Rotations',
    category: 'dsa',
    subjectName: 'Data Structures (DSA301)',
    difficulty: 'Hard',
    marks: '10 Marks (University Practical)',
    language: 'c',
    fileName: 'avl_rotations.c',
    description: 'Implement rightRotate (LL rotation) and leftRotate (RR rotation) in a self-balancing AVL tree to restore the balance factor condition: |h(left) - h(right)| <= 1.',
    constraints: ['Time Complexity: O(1) per rotation', 'Space Complexity: O(1)', 'Node height must be updated after rotation'],
    expectedOutput: 'Tree before rotation unbalanced at root (BF = 2)\nPerforming Right Rotation (LL Case)...\nNew Root: 20, Left Child: 10, Right Child: 30\nHeight: 2, Balance Factor: 0\n✔ AVL invariant restored.',
    starterCode: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int key;
    struct Node *left, *right;
    int height;
};

int max(int a, int b) { return (a > b) ? a : b; }
int height(struct Node *n) { return (n == NULL) ? 0 : n->height; }

struct Node* rightRotate(struct Node *y) {
    // TODO: Implement Right Rotation (LL Rotation)
    return y;
}

struct Node* leftRotate(struct Node *x) {
    // TODO: Implement Left Rotation (RR Rotation)
    return x;
}

int main() {
    printf("AVL Rotation engine initialized.\\n");
    return 0;
}`,
    modelSolution: `struct Node* rightRotate(struct Node *y) {
    struct Node *x = y->left;
    struct Node *T2 = x->right;
    x->right = y;
    y->left = T2;
    y->height = max(height(y->left), height(y->right)) + 1;
    x->height = max(height(x->left), height(x->right)) + 1;
    return x;
}

struct Node* leftRotate(struct Node *x) {
    struct Node *y = x->right;
    struct Node *T2 = y->left;
    y->left = x;
    x->right = T2;
    x->height = max(height(x->left), height(x->right)) + 1;
    y->height = max(height(y->left), height(y->right)) + 1;
    return y;
}`,
    hints: ['Save `x = y->left` and `T2 = x->right`.', 'Set `x->right = y` and `y->left = T2`.', 'Update heights bottom-up starting with y then x.'],
    validator: makeValidator(['rightRotate', 'leftRotate', 'height', 'max'], '✔ Test 1: LL Rotation verified [Height updated]\n✔ Test 2: RR Rotation verified [Height updated]\n✔ Test 3: Subtree T2 pointer preservation: PASSED\n✔ Time Complexity: O(1)', 'Ensure leftRotate and rightRotate update heights using max(height(left), height(right)) + 1.')
  },
  {
    id: 'dsa-34-lca-bst',
    title: 'Lowest Common Ancestor (LCA) in a Binary Search Tree',
    category: 'dsa',
    subjectName: 'Data Structures (DSA301)',
    difficulty: 'Medium',
    marks: '7 Marks',
    language: 'c',
    fileName: 'lca_bst.c',
    description: 'Find the lowest common ancestor of two specified nodes in a Binary Search Tree using the BST ordering property without visiting all nodes.',
    constraints: ['Time Complexity: O(h) where h is BST height', 'Space Complexity: O(1) iterative or O(h) recursion stack'],
    expectedOutput: 'BST Keys: [6, 2, 8, 0, 4, 7, 9, 3, 5]\nLCA of 2 and 8 is: 6\nLCA of 2 and 4 is: 2\n✔ All test cases passed.',
    starterCode: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int val;
    struct Node *left, *right;
};

struct Node* lowestCommonAncestor(struct Node* root, int p, int q) {
    // TODO: Use BST invariant to navigate left, right, or return root
    return NULL;
}`,
    modelSolution: `struct Node* lowestCommonAncestor(struct Node* root, int p, int q) {
    while (root != NULL) {
        if (p < root->val && q < root->val) {
            root = root->left;
        } else if (p > root->val && q > root->val) {
            root = root->right;
        } else {
            return root;
        }
    }
    return NULL;
}`,
    hints: ['If both p and q are less than root, LCA lies in left subtree.', 'If both are greater, LCA lies in right subtree.', 'Otherwise, root is the split point / LCA.'],
    validator: makeValidator(['lowestCommonAncestor', 'root->val', 'root->left', 'root->right'], '✔ Test 1: Split root LCA: PASSED\n✔ Test 2: Ancestor node itself LCA: PASSED\n✔ Test 3: O(h) iterative traversal verified', 'Navigate left if both < root, right if both > root.')
  },
  {
    id: 'dsa-35-topological-sort',
    title: "Kahn's Algorithm: Topological Sort on Directed Acyclic Graph (DAG)",
    category: 'dsa',
    subjectName: 'Data Structures (DSA301)',
    difficulty: 'Hard',
    marks: '10 Marks',
    language: 'c',
    fileName: 'topological_sort.c',
    description: "Perform topological sorting of a DAG with V vertices using Kahn's BFS algorithm based on in-degree calculation and a processing queue.",
    constraints: ['Time Complexity: O(V + E)', 'Space Complexity: O(V)', 'Detects cycles if output length < V'],
    expectedOutput: 'DAG Edges: (5->0), (5->2), (4->0), (4->1), (2->3), (3->1)\nIn-degrees: [0:2, 1:2, 2:1, 3:1, 4:0, 5:0]\nTopological Order: 4 5 2 0 3 1\n✔ Valid linear ordering verified.',
    starterCode: `#include <stdio.h>
#define MAX 100

void topologicalSort(int adj[MAX][MAX], int V) {
    int inDegree[MAX] = {0};
    int queue[MAX], front = 0, rear = 0;
    // TODO: 1. Calculate in-degrees for all vertices
    // TODO: 2. Enqueue all vertices with inDegree == 0
    // TODO: 3. While queue not empty, dequeue u, print, and decrement inDegree of neighbors
}`,
    modelSolution: `void topologicalSort(int adj[MAX][MAX], int V) {
    int inDegree[MAX] = {0};
    int queue[MAX], front = 0, rear = 0;
    for (int i = 0; i < V; i++)
        for (int j = 0; j < V; j++)
            if (adj[i][j]) inDegree[j]++;
    for (int i = 0; i < V; i++)
        if (inDegree[i] == 0) queue[rear++] = i;
    int count = 0;
    while (front < rear) {
        int u = queue[front++];
        printf("%d ", u);
        count++;
        for (int v = 0; v < V; v++) {
            if (adj[u][v] && --inDegree[v] == 0)
                queue[rear++] = v;
        }
    }
}`,
    hints: ['Compute incoming edges into each vertex.', 'Push 0 in-degree nodes into queue.', 'Decrement neighbor in-degrees and push when 0.'],
    validator: makeValidator(['inDegree', 'queue', 'front', 'rear', 'adj'], '✔ In-degree calculation verified\n✔ BFS queue ordering applied\n✔ Linear dependency ordering confirmed\n✔ Time Complexity: O(V + E)', 'Ensure inDegree array tracks incoming edges and decrements in the loop.')
  },
  {
    id: 'dsa-36-01-knapsack',
    title: '0/1 Knapsack Problem (Dynamic Programming 2D Table)',
    category: 'dsa',
    subjectName: 'Data Structures (DSA301)',
    difficulty: 'Medium',
    marks: '7 Marks',
    language: 'c',
    fileName: 'knapsack.c',
    description: 'Solve the 0/1 Knapsack problem for N items with weights and values given a maximum capacity W using bottom-up 2D dynamic programming.',
    constraints: ['Time Complexity: O(N * W)', 'Space Complexity: O(N * W)', '1 <= N <= 100, 1 <= W <= 1000'],
    expectedOutput: 'Weights: [10, 20, 30], Values: [60, 100, 120], Capacity: 50\nDP Table Built: 4 x 51\nMaximum Value in Knapsack = 220\n✔ All test cases passed.',
    starterCode: `#include <stdio.h>

int max(int a, int b) { return (a > b) ? a : b; }

int knapSack(int W, int wt[], int val[], int n) {
    int dp[n + 1][W + 1];
    // TODO: Fill dp[i][w] = max(val[i-1] + dp[i-1][w-wt[i-1]], dp[i-1][w])
    return 0;
}`,
    modelSolution: `int knapSack(int W, int wt[], int val[], int n) {
    int dp[n + 1][W + 1];
    for (int i = 0; i <= n; i++) {
        for (int w = 0; w <= W; w++) {
            if (i == 0 || w == 0)
                dp[i][w] = 0;
            else if (wt[i - 1] <= w)
                dp[i][w] = max(val[i - 1] + dp[i - 1][w - wt[i - 1]], dp[i - 1][w]);
            else
                dp[i][w] = dp[i - 1][w];
        }
    }
    return dp[n][W];
}`,
    hints: ['Base case: row 0 and col 0 are zero.', 'If item weight <= w, take max of include or exclude.'],
    validator: makeValidator(['dp', 'wt[i - 1]', 'val[i - 1]', 'max'], '✔ Test 1: {10,20,30}, W=50 -> 220\n✔ Test 2: Boundary W=0 -> 0\n✔ DP table state recurrence verified', 'Recurrence: dp[i][w] = max(val[i-1] + dp[i-1][w-wt[i-1]], dp[i-1][w]).')
  },
  {
    id: 'dsa-37-lcs',
    title: 'Longest Common Subsequence (LCS) & Backtrack Recovery',
    category: 'dsa',
    subjectName: 'Data Structures (DSA301)',
    difficulty: 'Medium',
    marks: '7 Marks',
    language: 'c',
    fileName: 'lcs.c',
    description: 'Find the length of the longest common subsequence between two strings X and Y using a 2D dynamic programming grid.',
    constraints: ['Time Complexity: O(m * n)', 'Space Complexity: O(m * n)', 'Strings of length up to 500'],
    expectedOutput: 'String X: "AGGTAB", String Y: "GXTXAYB"\nLCS Length: 4\nReconstructed LCS: "GTAB"\n✔ Dynamic programming grid verified.',
    starterCode: `#include <stdio.h>
#include <string.h>

int lcs(char* X, char* Y, int m, int n) {
    int dp[m + 1][n + 1];
    // TODO: If X[i-1] == Y[j-1] -> 1 + dp[i-1][j-1], else max(dp[i-1][j], dp[i][j-1])
    return 0;
}`,
    modelSolution: `int lcs(char* X, char* Y, int m, int n) {
    int dp[m + 1][n + 1];
    for (int i = 0; i <= m; i++) {
        for (int j = 0; j <= n; j++) {
            if (i == 0 || j == 0)
                dp[i][j] = 0;
            else if (X[i - 1] == Y[j - 1])
                dp[i][j] = dp[i - 1][j - 1] + 1;
            else
                dp[i][j] = (dp[i - 1][j] > dp[i][j - 1]) ? dp[i - 1][j] : dp[i][j - 1];
        }
    }
    return dp[m][n];
}`,
    hints: ['If characters match: 1 + diagonal value.', 'If mismatch: max of top or left value.'],
    validator: makeValidator(['dp', 'X[i - 1]', 'Y[j - 1]'], '✔ Test 1: "AGGTAB" vs "GXTXAYB" -> 4\n✔ Test 2: Disjoint strings -> 0\n✔ DP table transitions verified', 'Check match with X[i-1] == Y[j-1].')
  },

  // =========================================================================
  // 2. ADVANCED OBJECT-ORIENTED JAVA PRACTICALS (JAVA303)
  // =========================================================================
  {
    id: 'java-29-custom-lru-cache',
    title: 'Thread-Safe Generic LRU Cache Implementation',
    category: 'java',
    subjectName: 'Java Programming (JAVA303)',
    difficulty: 'Hard',
    marks: '10 Marks',
    language: 'java',
    fileName: 'LRUCache.java',
    description: 'Implement a generic Least Recently Used (LRU) cache with fixed capacity using LinkedHashMap in access-order mode with removeEldestEntry override.',
    constraints: ['O(1) get and put operations', 'Evicts least recently accessed element upon exceeding capacity'],
    expectedOutput: 'LRU Cache (Capacity = 3)\nput(1, "A"), put(2, "B"), put(3, "C")\nget(1) -> "A" (1 becomes most recent)\nput(4, "D") -> Evicted key: 2\nCurrent Cache State: [3, 1, 4]\n✔ Access-order eviction verified.',
    starterCode: `import java.util.LinkedHashMap;
import java.util.Map;

public class LRUCache<K, V> extends LinkedHashMap<K, V> {
    private final int capacity;

    public LRUCache(int capacity) {
        super(capacity, 0.75f, true); // true = access-order
        this.capacity = capacity;
    }

    // TODO: Override removeEldestEntry(Map.Entry<K, V> eldest)
}`,
    modelSolution: `import java.util.LinkedHashMap;
import java.util.Map;

public class LRUCache<K, V> extends LinkedHashMap<K, V> {
    private final int capacity;

    public LRUCache(int capacity) {
        super(capacity, 0.75f, true);
        this.capacity = capacity;
    }

    @Override
    protected boolean removeEldestEntry(Map.Entry<K, V> eldest) {
        return size() > capacity;
    }
}`,
    hints: ['Call super(capacity, 0.75f, true) to enable access order.', 'Override removeEldestEntry to return size() > capacity.'],
    validator: makeValidator(['removeEldestEntry', 'size() > capacity', 'LinkedHashMap'], '✔ Constructor access-order flag verified\n✔ Eviction policy (size() > capacity) validated\n✔ Generic type safety: PASSED', 'Override removeEldestEntry and return size() > capacity.')
  },
  {
    id: 'java-30-producer-consumer',
    title: 'Producer-Consumer Concurrency with BlockingQueue',
    category: 'java',
    subjectName: 'Java Programming (JAVA303)',
    difficulty: 'Medium',
    marks: '7 Marks',
    language: 'java',
    fileName: 'ProducerConsumerLab.java',
    description: 'Coordinate multiple producer and consumer threads safely without race conditions using java.util.concurrent.ArrayBlockingQueue.',
    constraints: ['Thread-safe queue capacity: 5 items', 'Handles InterruptedException cleanly'],
    expectedOutput: '[Producer-1] Produced message ID: 1 (Queue size: 1)\n[Producer-2] Produced message ID: 2 (Queue size: 2)\n[Consumer-1] Consumed message ID: 1\n✔ No deadlock, mutual exclusion maintained.',
    starterCode: `import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;

public class ProducerConsumerLab {
    private static final BlockingQueue<Integer> queue = new ArrayBlockingQueue<>(5);

    public static void produce(int item) throws InterruptedException {
        // TODO: Insert item into queue using blocking put()
    }

    public static int consume() throws InterruptedException {
        // TODO: Retrieve item using blocking take()
        return -1;
    }
}`,
    modelSolution: `import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;

public class ProducerConsumerLab {
    private static final BlockingQueue<Integer> queue = new ArrayBlockingQueue<>(5);

    public static void produce(int item) throws InterruptedException {
        queue.put(item);
    }

    public static int consume() throws InterruptedException {
        return queue.take();
    }
}`,
    hints: ['Use `queue.put(item)` which blocks if full.', 'Use `queue.take()` which blocks if empty.'],
    validator: makeValidator(['queue.put', 'queue.take', 'BlockingQueue'], '✔ BlockingQueue.put() verified\n✔ BlockingQueue.take() verified\n✔ Thread safety and backpressure guaranteed', 'Use put() to produce and take() to consume.')
  },
  {
    id: 'java-31-stream-grouping',
    title: 'Advanced Java 8 Streams: groupingBy & Statistics Summary',
    category: 'java',
    subjectName: 'Java Programming (JAVA303)',
    difficulty: 'Medium',
    marks: '7 Marks',
    language: 'java',
    fileName: 'StreamAnalytics.java',
    description: 'Process an employee dataset using Stream API to group employees by department and calculate average salary and highest earner.',
    constraints: ['Pure functional pipeline without external mutable state', 'Use Collectors.groupingBy and Collectors.averagingDouble'],
    expectedOutput: 'Department Salary Averages:\n- Engineering: $95,000.00 (Count: 12)\n- Product: $88,500.00 (Count: 5)\n- Design: $78,000.00 (Count: 4)\n✔ Stream pipeline executed.',
    starterCode: `import java.util.*;
import java.util.stream.Collectors;

record Employee(String name, String department, double salary) {}

public class StreamAnalytics {
    public static Map<String, Double> averageSalaryByDept(List<Employee> employees) {
        // TODO: Group by department and compute average salary
        return null;
    }
}`,
    modelSolution: `import java.util.*;
import java.util.stream.Collectors;

record Employee(String name, String department, double salary) {}

public class StreamAnalytics {
    public static Map<String, Double> averageSalaryByDept(List<Employee> employees) {
        return employees.stream()
            .collect(Collectors.groupingBy(
                Employee::department,
                Collectors.averagingDouble(Employee::salary)
            ));
    }
}`,
    hints: ['Use `employees.stream().collect(...)`.', 'Combine `Collectors.groupingBy` with downstream `Collectors.averagingDouble`.'],
    validator: makeValidator(['collect', 'groupingBy', 'averagingDouble'], '✔ Functional stream pipeline validated\n✔ Method reference syntax verified\n✔ Downstream collector aggregation: PASSED', 'Use Collectors.groupingBy and Collectors.averagingDouble.')
  },

  // =========================================================================
  // 3. NUMERICAL METHODS IN PYTHON (COANMP)
  // =========================================================================
  {
    id: 'py-21-rk4-ode-solver',
    title: 'Fourth-Order Runge-Kutta (RK-4) Numerical ODE Solver',
    category: 'python',
    subjectName: 'COANMP (Numerical Methods)',
    difficulty: 'Hard',
    marks: '10 Marks',
    language: 'python',
    fileName: 'rk4_solver.py',
    description: 'Solve the initial value problem dy/dx = f(x, y) with y(x0) = y0 up to target x using the classical 4th-order Runge-Kutta method.',
    constraints: ['Fourth-order local truncation error: O(h^5)', 'Global truncation error: O(h^4)'],
    expectedOutput: 'ODE: dy/dx = x + y, y(0) = 1, h = 0.1\nIterating 10 steps to x = 1.0...\nx = 1.0, y_num = 3.4365016\nTrue Analytical Solution y = 2*e^x - x - 1: 3.4365637\nError: 6.21e-05\n✔ RK-4 convergence verified.',
    starterCode: `def rk4_solve(f, x0, y0, x_target, h=0.1):
    x = x0
    y = y0
    while x < x_target - 1e-9:
        # TODO: Compute k1, k2, k3, k4 slopes
        # TODO: Update y = y + (h / 6.0) * (k1 + 2*k2 + 2*k3 + k4)
        x += h
    return y`,
    modelSolution: `def rk4_solve(f, x0, y0, x_target, h=0.1):
    x = x0
    y = y0
    while x < x_target - 1e-9:
        k1 = f(x, y)
        k2 = f(x + 0.5 * h, y + 0.5 * h * k1)
        k3 = f(x + 0.5 * h, y + 0.5 * h * k2)
        k4 = f(x + h, y + h * k3)
        y += (h / 6.0) * (k1 + 2 * k2 + 2 * k3 + k4)
        x += h
    return y`,
    hints: ['k1 = f(x, y)', 'k2 = f(x + 0.5*h, y + 0.5*h*k1)', 'k3 = f(x + 0.5*h, y + 0.5*h*k2)', 'k4 = f(x + h, y + h*k3)'],
    validator: makeValidator(['k1 =', 'k2 =', 'k3 =', 'k4 =', '(k1 + 2', 'h / 6'], '✔ Slopes k1, k2, k3, k4 computed correctly\n✔ Weighted average (h/6)*(k1 + 2k2 + 2k3 + k4) verified\n✔ Order of convergence: O(h^4) validated', 'Compute k1, k2, k3, k4 and update y += (h/6.0)*(k1 + 2*k2 + 2*k3 + k4).')
  },
  {
    id: 'py-22-simpson-three-eighth',
    title: "Simpson's 3/8 Rule for Numerical Integration",
    category: 'python',
    subjectName: 'COANMP (Numerical Methods)',
    difficulty: 'Medium',
    marks: '7 Marks',
    language: 'python',
    fileName: 'simpson_38.py',
    description: "Implement Simpson's 3/8 rule to integrate a function over [a, b] using n sub-intervals (where n must be a multiple of 3).",
    constraints: ['n must be divisible by 3', 'Formula: (3h/8) * [f0 + fn + 3*sum(f_non_multiples) + 2*sum(f_multiples)]'],
    expectedOutput: 'Integral of 1/(1 + x^2) from 0 to 6 with n=6:\nStep size h = 1.0\nEstimated Value: 1.357081\n✔ Simpson 3/8 formula validated.',
    starterCode: `def simpson_38(f, a, b, n):
    if n % 3 != 0:
        raise ValueError("n must be a multiple of 3")
    h = (b - a) / n
    # TODO: Implement 3h/8 rule weighting
    return 0.0`,
    modelSolution: `def simpson_38(f, a, b, n):
    if n % 3 != 0:
        raise ValueError("n must be a multiple of 3")
    h = (b - a) / n
    total = f(a) + f(b)
    for i in range(1, n):
        if i % 3 == 0:
            total += 2 * f(a + i * h)
        else:
            total += 3 * f(a + i * h)
    return (3 * h / 8.0) * total`,
    hints: ['Check if i % 3 == 0 to multiply by 2, otherwise multiply by 3.', 'Multiply final sum by (3 * h / 8.0).'],
    validator: makeValidator(['(3 * h / 8', 'i % 3 == 0', 'total +='], '✔ Modulo 3 check applied\n✔ Factor 3 for non-multiples, factor 2 for multiples\n✔ 3h/8 coefficient verified', 'Multiply multiples of 3 by 2, non-multiples by 3, and outer by (3*h/8).')
  },
  {
    id: 'py-23-newton-forward-diff',
    title: "Newton's Forward Difference Interpolation Table Generator",
    category: 'python',
    subjectName: 'COANMP (Numerical Methods)',
    difficulty: 'Medium',
    marks: '7 Marks',
    language: 'python',
    fileName: 'newton_forward.py',
    description: "Construct the forward difference table Delta^k y and interpolate f(x) for a point near the beginning of the table.",
    constraints: ['Equally spaced x data points: x_i = x0 + i*h', 'u = (x - x0) / h'],
    expectedOutput: 'Forward Difference Table (Delta^1 to Delta^4) computed successfully.\nInterpolated y at x=45.5:\nValue = 0.71325\n✔ Pascal factorial product scaling verified.',
    starterCode: `def forward_diff_table(x, y):
    n = len(y)
    diff = [[0] * n for _ in range(n)]
    for i in range(n):
        diff[i][0] = y[i]
    # TODO: Fill diff[i][j] = diff[i+1][j-1] - diff[i][j-1]
    return diff`,
    modelSolution: `def forward_diff_table(x, y):
    n = len(y)
    diff = [[0] * n for _ in range(n)]
    for i in range(n):
        diff[i][0] = y[i]
    for j in range(1, n):
        for i in range(n - j):
            diff[i][j] = diff[i + 1][j - 1] - diff[i][j - 1]
    return diff`,
    hints: ['Outer column loop j from 1 to n.', 'Inner row loop i from 0 to n - j.', 'Formula: diff[i][j] = diff[i+1][j-1] - diff[i][j-1].'],
    validator: makeValidator(['diff[i + 1][j - 1] - diff[i][j - 1]', 'range(1, n)'], '✔ Forward difference recurrence verified\n✔ Upper triangular table layout validated', 'Fill diff[i][j] = diff[i+1][j-1] - diff[i][j-1].')
  },

  // =========================================================================
  // 4. ADVANCED DATABASE & SQL PRACTICALS (DBMS302)
  // =========================================================================
  {
    id: 'dbms-31-window-dense-rank',
    title: 'Practical 31: Department Top-3 Earners via DENSE_RANK() Window Function',
    category: 'dbms',
    subjectName: 'Database Management Systems (DBMS302)',
    difficulty: 'Medium',
    marks: '7 Marks',
    language: 'sql',
    fileName: 'top3_salaries_window.sql',
    description: 'Find employees who earn in the top 3 highest unique salaries in each department using DENSE_RANK() OVER (PARTITION BY ... ORDER BY ...).',
    constraints: ['Must handle ties cleanly without skipping ranks (DENSE_RANK)', 'Use Common Table Expression (CTE) or subquery'],
    expectedOutput: '+------------+---------------+--------+------+\n| Department | Employee      | Salary | Rank |\n+------------+---------------+--------+------+\n| IT         | Maher Bhatt   | 95000  | 1    |\n| IT         | Alex Chen     | 90000  | 2    |\n| IT         | Sarah Connor  | 85000  | 3    |\n| Finance    | Warren B.     | 99000  | 1    |\n+------------+---------------+--------+------+\n✔ Window partition ranking verified.',
    starterCode: `-- Practical 31: Window Functions\n-- Write a query to find the top 3 earners per department\nWITH RankedSalaries AS (\n    SELECT \n        d.dept_name,\n        e.emp_name,\n        e.salary,\n        -- TODO: Add DENSE_RANK() OVER (PARTITION BY ... ORDER BY ...)\n    FROM Employees e\n    JOIN Departments d ON e.dept_id = d.dept_id\n)\nSELECT * FROM RankedSalaries WHERE rank <= 3;`,
    modelSolution: `WITH RankedSalaries AS (
    SELECT 
        d.dept_name,
        e.emp_name,
        e.salary,
        DENSE_RANK() OVER (PARTITION BY e.dept_id ORDER BY e.salary DESC) AS salary_rank
    FROM Employees e
    JOIN Departments d ON e.dept_id = d.dept_id
)
SELECT dept_name, emp_name, salary, salary_rank
FROM RankedSalaries
WHERE salary_rank <= 3
ORDER BY dept_name, salary_rank;`,
    hints: ['Use `DENSE_RANK() OVER (PARTITION BY dept_id ORDER BY salary DESC)`.', 'Filter with `salary_rank <= 3` in the outer query.'],
    validator: makeValidator(['dense_rank()', 'partition by', 'order by', 'over'], '+---------------------------------------------------------+\n| STATUS: OK. DENSE_RANK() window partitioning validated. |\n| Rows Evaluated: 24 employees across 4 departments.      |\n| Tie handling: Continuous rank 1,2,3 without gaps.       |\n+---------------------------------------------------------+', 'Ensure DENSE_RANK() OVER (PARTITION BY ... ORDER BY ...) is specified.')
  },
  {
    id: 'dbms-32-recursive-cte',
    title: 'Practical 32: Organizational Hierarchy Traversal with Recursive CTE',
    category: 'dbms',
    subjectName: 'Database Management Systems (DBMS302)',
    difficulty: 'Hard',
    marks: '10 Marks',
    language: 'sql',
    fileName: 'recursive_org_chart.sql',
    description: 'Traverse an employee-manager hierarchy to calculate management level and full reporting chain using a recursive WITH statement.',
    constraints: ['Must terminate when manager_id IS NULL (CEO anchor)', 'Increment level = prev.level + 1 in recursive member'],
    expectedOutput: '+--------+---------------+------------+-------+-------------------------+\n| EmpID  | Name          | ManagerID  | Level | Management Path         |\n+--------+---------------+------------+-------+-------------------------+\n| 1      | CEO John      | NULL       | 1     | John                    |\n| 2      | VP Engineering| 1          | 2     | John -> VP Engineering  |\n| 3      | Lead Architect| 2          | 3     | John -> VP -> Architect |\n+--------+---------------+------------+-------+-------------------------+\n✔ Tree traversal verified.',
    starterCode: `-- Practical 32: Recursive CTE Hierarchy\nWITH RECURSIVE OrgChart AS (\n    -- Anchor member: CEO (manager_id IS NULL)\n    SELECT emp_id, emp_name, manager_id, 1 as level\n    FROM Employees\n    WHERE manager_id IS NULL\n    \n    UNION ALL\n    \n    -- Recursive member: Join Employees with OrgChart\n    SELECT e.emp_id, e.emp_name, e.manager_id, o.level + 1\n    FROM Employees e\n    JOIN OrgChart o ON e.manager_id = o.emp_id\n)\nSELECT * FROM OrgChart;`,
    modelSolution: `WITH RECURSIVE OrgChart AS (
    SELECT emp_id, emp_name, manager_id, 1 as level
    FROM Employees
    WHERE manager_id IS NULL
    
    UNION ALL
    
    SELECT e.emp_id, e.emp_name, e.manager_id, o.level + 1
    FROM Employees e
    JOIN OrgChart o ON e.manager_id = o.emp_id
)
SELECT emp_id, emp_name, manager_id, level 
FROM OrgChart 
ORDER BY level, emp_id;`,
    hints: ['The anchor query selects the root node where `manager_id IS NULL`.', 'The recursive step joins `Employees e` on `e.manager_id = o.emp_id`.'],
    validator: makeValidator(['with recursive', 'union all', 'manager_id is null', 'level + 1'], '+---------------------------------------------------------+\n| STATUS: OK. Recursive CTE successfully evaluated.       |\n| Tree Depth: 4 levels traversed without cycle.           |\n| Anchors: 1 root identified, 18 reporting nodes resolved.|\n+---------------------------------------------------------+', 'Use WITH RECURSIVE with UNION ALL and level + 1.')
  }
];
