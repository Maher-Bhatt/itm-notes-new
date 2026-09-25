# Unit 5: Graphs & Graph Algorithms
# Topics:
# dsa-u5-t1: Graph Terminology & Representations: Directed vs Undirected, Weighted vs Unweighted, Adjacency Matrix vs Adjacency List (Space & Time Tradeoffs)
# dsa-u5-t2: Graph Traversals: Breadth-First Search (BFS) using Queue & Depth-First Search (DFS) using Stack/Recursion with Visited Array
# dsa-u5-t3: Topological Sort: Directed Acyclic Graphs (DAG), Kahn's Algorithm (In-degree queue) vs DFS-based Topological Sort
# dsa-u5-t4: Shortest Path Algorithms: Dijkstra's Algorithm (Greedy, Min-Heap priority queue, Non-negative weights) & Bellman-Ford (Negative edge detection)
# dsa-u5-t5: Minimum Spanning Tree (MST): Cut Property, Prim's Algorithm vs Kruskal's Algorithm with Disjoint-Set Union (Union-Find by Rank & Path Compression)

unit5 = {
    "id": "dsa-u5",
    "title": "Unit 5: Graphs & Graph Algorithms",
    "description": "Network topology modeling, graph representation trade-offs (Adjacency Matrix vs List), systematic search traversals (BFS, DFS), DAG dependency resolution via Topological Sort (Kahn's and DFS), Single-Source Shortest Paths (Dijkstra and Bellman-Ford), and Minimum Spanning Trees (Prim and Kruskal with DSU).",
    "topics": [
        {
            "id": "dsa-u5-t1",
            "title": "Graph Terminology & Representations: Directed vs Undirected, Weighted vs Unweighted, Adjacency Matrix vs Adjacency List (Space & Time Tradeoffs)",
            "simpleExplanation": "A Graph G = (V, E) models arbitrary non-linear networks of vertices interconnected by directed or undirected edges. In computational memory, graphs are represented either as dense 2D Adjacency Matrices (O(V^2) memory, O(1) edge lookup) or sparse dynamic Adjacency Lists (O(V + E) memory, optimal neighbor iteration), presenting a foundational space-time trade-off.",
            "detailedExplanation": """## 1. Formal Graph Definitions and Classifications

A **Graph** $G = (V, E)$ consists of:
- $V$: A non-empty set of **Vertices** (Nodes). $|V| = V$.
- $E$: A set of **Edges** (Arcs) connecting pairs of vertices. $|E| = E$.

```mermaid
graph LR
    subgraph Undirected ["Undirected Graph (Symmetric)"]
        U1((0)) --- U2((1))
        U1 --- U3((2))
        U2 --- U3
    end

    subgraph Directed ["Directed Graph / Digraph (Asymmetric)"]
        D1((0)) --> D2((1))
        D2 --> D3((2))
        D3 --> D1
    end
```

### Graph Classifications
1. **Undirected Graph**: Edges are unordered pairs $(u, v) = (v, u)$. Degree of vertex $v$ is the count of incident edges.
   - **Handshaking Lemma**: The sum of degrees of all vertices equals twice the number of edges:
     $$\\sum_{v \\in V} \\text{deg}(v) = 2|E|$$
2. **Directed Graph (Digraph)**: Edges are ordered pairs $(u, v) \\ne (v, u)$ from source $u$ to destination $v$.
   - **In-Degree**: Count of incoming edges arriving at vertex $v$.
   - **Out-Degree**: Count of outgoing edges departing from vertex $v$.
   - $\\sum \\text{in-deg}(v) = \\sum \\text{out-deg}(v) = |E|$.
3. **Weighted Graph**: Each edge is assigned a numerical weight / cost $w(u, v)$ (e.g., latency, distance, monetary cost).
4. **Dense vs Sparse Graphs**:
   - **Dense Graph**: $|E| \\approx |V|^2$. Almost all pairs of vertices are connected.
   - **Sparse Graph**: $|E| \\ll |V|^2$ (often $|E| \\approx \\mathcal{O}(|V|)$). Most vertices connect to a handful of neighbors.

---

## 2. In-Memory Graph Representations

```mermaid
flowchart TD
    subgraph Reps ["Graph Storage Representations"]
        AM["Adjacency Matrix\n- 2D Array: matrix[V][V]\n- Space: O(V^2)\n- Check Edge (u,v): O(1)\n- Find all neighbors: O(V)"]
        AL["Adjacency List\n- Array of Linked Lists / Vectors: adj[V]\n- Space: O(V + E)\n- Check Edge (u,v): O(deg(u))\n- Find all neighbors: O(deg(u))"]
    end
```

### A. Adjacency Matrix
A 2D array `adj[V][V]` of boolean or integer weights:
$$\\text{adj}[u][v] = \\begin{cases} 1 & \\text{if edge } (u, v) \\in E \\\\ 0 & \\text{otherwise} \\end{cases}$$
For weighted graphs, `adj[u][v] = weight`, and non-edges are set to $\\infty$ or $0$.
- In undirected graphs, the matrix is **strictly symmetric** across the main diagonal: $\\text{adj}[u][v] == \\text{adj}[v][u]$.

### B. Adjacency List
An array of $|V|$ linked lists or dynamic vectors, where `adj[u]` stores all adjacent neighbor vertices directly reachable from $u$.
- For weighted graphs, each linked list node stores a pair: `(neighbor_id, edge_weight)`.

---

## 3. Comprehensive Space and Time Complexity Trade-Offs

| Operation / Metric | Adjacency Matrix | Adjacency List (Linked List) | Adjacency List (Dynamic Vector) |
| :--- | :--- | :--- | :--- |
| **Total Memory Space** | $\\Theta(V^2)$ | $\\Theta(V + E)$ (Undirected: $V + 2E$) | $\\Theta(V + E)$ |
| **Edge Lookup $(u, v)$**| $\\mathcal{O}(1)$ | $\\mathcal{O}(\\text{deg}(u))$ | $\\mathcal{O}(\\text{deg}(u))$ |
| **Find All Neighbors of $u$**| $\\Theta(V)$ | $\\Theta(\\text{deg}(u))$ | $\\Theta(\\text{deg}(u))$ |
| **Add Edge $(u, v)$** | $\\mathcal{O}(1)$ | $\\mathcal{O}(1)$ (insert at head) | $\\mathcal{O}(1)$ amortized |
| **Delete Edge $(u, v)$** | $\\mathcal{O}(1)$ | $\\mathcal{O}(\\text{deg}(u))$ | $\\mathcal{O}(\\text{deg}(u))$ |
| **Add Vertex** | $\\Theta(V^2)$ (realloc array) | $\\mathcal{O}(1)$ | $\\mathcal{O}(1)$ amortized |
| **Best Used When** | Dense graphs ($E \\approx V^2$) | Sparse graphs ($E \\ll V^2$) | General real-world networks |

---

> [!IMPORTANT] **MEMORIZE:**
> - Handshaking Lemma: $\\sum \\text{deg}(v) = 2E$. As a direct corollary, **the number of vertices with odd degree in an undirected graph must always be even**!
> - Adjacency Matrix uses $\\mathcal{O}(V^2)$ space regardless of edge count.
> - Adjacency List uses $\\mathcal{O}(V + E)$ space, making it vastly superior for real-world sparse graphs (social networks, road networks).

> [!NOTE] **DEV BRAIN:**
> In web-scale graphs (e.g., Facebook with 3 billion users, each with 300 friends), an Adjacency Matrix would require $(3 \\times 10^9)^2 \\approx 9 \\times 10^{18}$ bytes (9 Exabytes)! An Adjacency List consumes only $(V + E) \\approx 3 \\times 10^9 + 9 \\times 10^{11}$ bytes (less than 1 Terabyte).

> [!WARNING] **TRAP:**
> In an undirected graph represented by an Adjacency List, each edge $(u, v)$ appears **twice**: once in `adj[u]` and once in `adj[v]`. Total list nodes = $2E$!

> [!TIP] **EXAM TIP:**
> When asked to choose between Adjacency Matrix and List for an algorithm (like BFS or Dijkstra), evaluate the graph density: if $E = \\Theta(V^2)$ use Matrix; if $E = \\mathcal{O}(V)$ use List!""",
            "shortNotes": "Graph G = (V,E). Handshaking Lemma: sum of degrees = 2E. Adjacency Matrix consumes O(V^2) space with O(1) edge lookup. Adjacency List consumes O(V + E) space, ideal for sparse networks.",
            "examples": [
                {
                    "title": "C Implementation: Graph Construction via Adjacency Matrix and Adjacency List",
                    "problem": "Implement an undirected graph with 4 vertices using both an Adjacency Matrix and an Adjacency List.",
                    "explanation": "Demonstrates matrix initialization and pointer-based linked list chaining for graph representations.",
                    "code": """#include <stdio.h>
#include <stdlib.h>

#define V 4

// 1. Adjacency Matrix
void initMatrix(int mat[V][V]) {
    for (int i = 0; i < V; i++)
        for (int j = 0; j < V; j++)
            mat[i][j] = 0;
}

void addEdgeMatrix(int mat[V][V], int u, int v) {
    mat[u][v] = 1;
    mat[v][u] = 1; // Undirected symmetric
}

// 2. Adjacency List
typedef struct AdjListNode {
    int dest;
    struct AdjListNode *next;
} AdjListNode;

typedef struct {
    AdjListNode *head[V];
} AdjListGraph;

AdjListGraph* createListGraph() {
    AdjListGraph *g = (AdjListGraph*)malloc(sizeof(AdjListGraph));
    for (int i = 0; i < V; i++) g->head[i] = NULL;
    return g;
}

void addEdgeList(AdjListGraph *g, int u, int v) {
    // Add v to u's list
    AdjListNode *newNode = (AdjListNode*)malloc(sizeof(AdjListNode));
    newNode->dest = v;
    newNode->next = g->head[u];
    g->head[u] = newNode;

    // Add u to v's list (undirected)
    newNode = (AdjListNode*)malloc(sizeof(AdjListNode));
    newNode->dest = u;
    newNode->next = g->head[v];
    g->head[v] = newNode;
}

void printMatrix(int mat[V][V]) {
    printf("Adjacency Matrix (4x4):\\n");
    for (int i = 0; i < V; i++) {
        for (int j = 0; j < V; j++) printf("%d ", mat[i][j]);
        printf("\\n");
    }
}

void printList(AdjListGraph *g) {
    printf("Adjacency List:\\n");
    for (int i = 0; i < V; i++) {
        printf("Vertex %d: ", i);
        AdjListNode *curr = g->head[i];
        while (curr) {
            printf("-> %d ", curr->dest);
            curr = curr->next;
        }
        printf("NULL\\n");
    }
}

int main() {
    int mat[V][V];
    initMatrix(mat);
    AdjListGraph *g = createListGraph();

    // Edges: (0-1), (0-2), (1-2), (2-3)
    int edges[][2] = {{0,1}, {0,2}, {1,2}, {2,3}};
    for (int i = 0; i < 4; i++) {
        addEdgeMatrix(mat, edges[i][0], edges[i][1]);
        addEdgeList(g, edges[i][0], edges[i][1]);
    }

    printMatrix(mat);
    printf("\\n");
    printList(g);

    return 0;
}""",
                    "output": """Adjacency Matrix (4x4):
0 1 1 0 
1 0 1 0 
1 1 0 1 
0 0 1 0 

Adjacency List:
Vertex 0: -> 2 -> 1 NULL
Vertex 1: -> 2 -> 0 NULL
Vertex 2: -> 3 -> 1 -> 0 NULL
Vertex 3: -> 2 NULL"""
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
                    "answer": """1. **Handshaking Lemma Statement**:
   In any undirected graph $G = (V, E)$, the sum of the degrees of all vertices is equal to twice the number of edges:
   $$\\sum_{v \\in V} \\text{deg}(v) = 2|E|$$

2. **Proof**:
   - Every edge $e = (u, v)$ connects exactly two endpoints $u$ and $v$.
   - When we calculate the degree of all vertices, each edge contributes $+1$ to the degree of vertex $u$ and $+1$ to the degree of vertex $v$.
   - Thus, every single edge is counted exactly twice in the degree sum.
   - Therefore: $\\sum_{v \\in V} \\text{deg}(v) = 2|E|$.

3. **Proof that Count of Odd-Degree Vertices is Even**:
   - Partition the vertices $V$ into two disjoint sets: $V_{\\text{even}}$ (vertices with even degree) and $V_{\\text{odd}}$ (vertices with odd degree).
   - $\\sum_{v \\in V} \\text{deg}(v) = \\sum_{v \\in V_{\\text{even}}} \\text{deg}(v) + \\sum_{v \\in V_{\\text{odd}}} \\text{deg}(v) = 2|E|$.
   - Because $2|E|$ is even, and the sum over $V_{\\text{even}}$ is a sum of even numbers (which is even):
     $$\\sum_{v \\in V_{\\text{odd}}} \\text{deg}(v) = 2|E| - \\sum_{v \\in V_{\\text{even}}} \\text{deg}(v) = \\text{Even} - \\text{Even} = \\text{Even}$$
   - The sum of odd numbers can only be even if the **number of terms (vertices in $V_{\\text{odd}}$) is even**. Q.E.D.""",
                    "keyPoints": [
                        "Statement of Handshaking Lemma: sum of degrees = 2|E|.",
                        "Edge dual-counting proof.",
                        "Partitioning into even and odd sets to prove even cardinality of odd-degree vertices."
                    ]
                },
                {
                    "question": "Compare Adjacency Matrix and Adjacency List representations of a graph. When is an Adjacency Matrix preferred over an Adjacency List?",
                    "marks": "7 Marks",
                    "answer": """1. **Comparison Across Core Architectural Dimensions**:
   - **Space Complexity**:
     * Adjacency Matrix: Strictly $\\Theta(V^2)$ regardless of edge count.
     * Adjacency List: $\\Theta(V + E)$ for directed, $\\Theta(V + 2E)$ for undirected.
   - **Edge Existence Query $(u, v)$**:
     * Matrix: $\\mathcal{O}(1)$ by checking `matrix[u][v]`.
     * List: $\\mathcal{O}(\\text{deg}(u))$ by scanning `adj[u]`.
   - **Find All Neighbors of Vertex $u$**:
     * Matrix: $\\Theta(V)$ by scanning row $u$.
     * List: $\\Theta(\\text{deg}(u))$ by traversing list `adj[u]`.
   - **Add Edge**: Both $\\mathcal{O}(1)$.
   - **Delete Edge**: Matrix $\\mathcal{O}(1)$; List $\\mathcal{O}(\\text{deg}(u))$.

2. **When to Prefer an Adjacency Matrix**:
   - **Dense Graphs**: When $|E| \\approx |V|^2$. Matrix avoids pointer storage overhead.
   - **Frequent Edge Existence Checks**: Applications requiring millions of $O(1)$ relationship lookups.
   - **Small Vertex Counts**: In small graphs where matrix simplicity and contiguous cache layout outperform scattered heap nodes.
   - **Dense Graph Algorithms**: Floyd-Warshall all-pairs shortest paths naturally operates on 2D matrices.""",
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
            "detailedExplanation": """## 1. The Cycle Hazard and the Visited Array

Unlike trees, general graphs frequently contain **cycles**: paths that start and end at the same vertex. A naive traversal that simply follows edges will loop infinitely.

To prevent infinite loops, all graph traversals maintain a boolean **`visited[]` array** of size $|V|$. When a vertex $v$ is first encountered, `visited[v]` is set to `true`. Edges leading to already visited vertices are ignored.

```mermaid
flowchart TD
    subgraph Traversals ["Fundamental Graph Traversals"]
        BFS["Breadth-First Search (BFS)\n- Queue-driven (FIFO)\n- Level-by-level exploration\n- Finds Unweighted Shortest Paths\n- Time: O(V + E), Space: O(V)"]
        DFS["Depth-First Search (DFS)\n- Stack / Recursion-driven (LIFO)\n- Deep branch-first exploration\n- Detects cycles & connected components\n- Time: O(V + E), Space: O(V)"]
    end
```

---

## 2. Breadth-First Search (BFS)

BFS explores the graph in concentric wavefronts: all vertices at distance 1 from source $s$, followed by all vertices at distance 2, and so on.

```mermaid
sequenceDiagram
    autonumber
    participant Q as FIFO Queue
    Note over Q: Enqueue source vertex 0 -> Queue: [0]
    Note over Q: Dequeue 0 -> Mark visited -> Enqueue unvisited neighbors (1, 2) -> Queue: [1, 2]
    Note over Q: Dequeue 1 -> Enqueue neighbor 3 -> Queue: [2, 3]
    Note over Q: Dequeue 2 -> Neighbor 3 already in queue -> Enqueue 4 -> Queue: [3, 4]
    Note over Q: Continue until Queue is empty!
```

### Algorithm:
1. Initialize `visited[V] = {false}` and an empty FIFO `Queue`.
2. Enqueue source $s$, mark `visited[s] = true`.
3. While `Queue` is not empty:
   - $u = \\text{Queue.dequeue()}$
   - Process $u$.
   - For every neighbor $v \\in \\text{adj}[u]$:
     - If `visited[v] == false`:
       - `visited[v] = true`
       - $\\text{Queue.enqueue}(v)$

### Essential BFS Property (Shortest Path Invariant):
In an **unweighted graph**, BFS is guaranteed to discover the shortest path (minimum number of edges) from the source to every reachable vertex!

---

## 3. Depth-First Search (DFS)

DFS plunges as deeply as possible along a single branch before backtracking when hitting a dead end or an already visited vertex.

### DFS Algorithm (Recursive):
```c
void DFS(int u) {
    visited[u] = true;
    printf("%d ", u);

    for (each neighbor v in adj[u]) {
        if (!visited[v]) {
            DFS(v); // Recursive descent
        }
    }
}
```

### DFS Edge Classification in Directed Graphs:
During DFS traversal, edges can be classified into 4 distinct categories:
1. **Tree Edge**: Edge $(u, v)$ leading to an unvisited vertex (part of the DFS tree).
2. **Back Edge**: Edge $(u, v)$ pointing to an **ancestor** currently on the active recursion call stack. **A directed graph contains a cycle IF AND ONLY IF a Back Edge exists!**
3. **Forward Edge**: Non-tree edge $(u, v)$ pointing to a descendant in the DFS tree.
4. **Cross Edge**: Edge connecting two vertices in different subtrees (neither is an ancestor).

```mermaid
graph TD
    subgraph DFS_Edges ["DFS Edge Classifications"]
        A((A)) -->|Tree Edge| B((B))
        B -->|Tree Edge| C((C))
        C -.->|Back Edge: CYCLE!| A
        A -.->|Forward Edge| C
    end
```

---

## 4. Handling Disconnected Graphs

If a graph contains multiple disconnected components, running BFS/DFS from a single source visits only vertices in that component. To ensure complete traversal across the entire graph:

```c
for (int i = 0; i < V; i++) {
    if (!visited[i]) {
        BFS(i); // or DFS(i)
    }
}
```

The count of outer loop calls equals the **total number of connected components**!

---

## 5. Complexity Summary

| Metric | Adjacency List Representation | Adjacency Matrix Representation |
| :--- | :--- | :--- |
| **BFS Time Complexity** | $\\mathcal{O}(V + E)$ | $\\mathcal{O}(V^2)$ |
| **DFS Time Complexity** | $\\mathcal{O}(V + E)$ | $\\mathcal{O}(V^2)$ |
| **BFS Space Complexity** | $\\mathcal{O}(V)$ (Queue + Visited) | $\\mathcal{O}(V)$ |
| **DFS Space Complexity** | $\\mathcal{O}(V)$ (Call Stack + Visited) | $\\mathcal{O}(V)$ |

---

> [!IMPORTANT] **MEMORIZE:**
> - In unweighted graphs, **BFS computes the shortest path**. DFS does NOT compute shortest paths.
> - In directed graphs, a cycle exists **if and only if DFS encounters a Back Edge** (a node currently on the recursion call stack).
> - Traversal time is $\\mathcal{O}(V + E)$ for Adjacency List and $\\mathcal{O}(V^2)$ for Adjacency Matrix.

> [!NOTE] **DEV BRAIN:**
> Web crawlers (like Googlebot) use BFS to discover web pages layer-by-layer starting from root seeds, ensuring they crawl high-ranking pages closest to the root domain first.

> [!WARNING] **TRAP:**
> In BFS, **mark a vertex as visited the moment it is ENQUEUED**, NOT when it is dequeued! Marking on dequeue causes duplicate insertions of the same node from multiple neighbors, causing exponential queue explosion!

> [!TIP] **EXAM TIP:**
> When asked to perform BFS and DFS on a given graph in exams, always state: (1) Starting vertex, (2) Tie-breaking rule (e.g., visit smaller numerical index first), and (3) Show queue/stack snapshots at every step.""",
            "shortNotes": "Traversals use visited[] to prevent cycles. BFS uses a Queue (level-order) and finds unweighted shortest paths. DFS uses recursion/stack (depth-first) and detects cycles via back-edges. Complexity: O(V + E).",
            "examples": [
                {
                    "title": "C Program Implementing Complete BFS and DFS with Adjacency List",
                    "problem": "Implement Breadth-First Search and Depth-First Search on an undirected graph with 5 vertices.",
                    "explanation": "Uses a boolean visited array, dynamic adjacency lists, and a queue for BFS and recursion for DFS.",
                    "code": """#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

#define MAX_V 5

typedef struct Node {
    int dest;
    struct Node *next;
} Node;

Node* adj[MAX_V];
bool visited[MAX_V];

void addEdge(int u, int v) {
    Node *n = (Node*)malloc(sizeof(Node));
    n->dest = v;
    n->next = adj[u];
    adj[u] = n;

    n = (Node*)malloc(sizeof(Node));
    n->dest = u;
    n->next = adj[v];
    adj[v] = n;
}

void resetVisited() {
    for (int i = 0; i < MAX_V; i++) visited[i] = false;
}

// 1. Breadth-First Search
void BFS(int start) {
    resetVisited();
    int queue[MAX_V];
    int front = 0, rear = 0;

    printf("BFS Traversal starting from %d: ", start);
    visited[start] = true;
    queue[rear++] = start;

    while (front < rear) {
        int u = queue[front++];
        printf("%d ", u);

        Node *curr = adj[u];
        while (curr) {
            int v = curr->dest;
            if (!visited[v]) {
                visited[v] = true; // Mark on enqueue!
                queue[rear++] = v;
            }
            curr = curr->next;
        }
    }
    printf("\\n");
}

// 2. Depth-First Search
void DFSRecursive(int u) {
    visited[u] = true;
    printf("%d ", u);

    Node *curr = adj[u];
    while (curr) {
        int v = curr->dest;
        if (!visited[v]) {
            DFSRecursive(v);
        }
        curr = curr->next;
    }
}

void DFS(int start) {
    resetVisited();
    printf("DFS Traversal starting from %d: ", start);
    DFSRecursive(start);
    printf("\\n");
}

int main() {
    for (int i = 0; i < MAX_V; i++) adj[i] = NULL;

    // Graph: 0-1, 0-2, 1-3, 1-4, 2-4
    addEdge(0, 1);
    addEdge(0, 2);
    addEdge(1, 3);
    addEdge(1, 4);
    addEdge(2, 4);

    BFS(0);
    DFS(0);

    return 0;
}""",
                    "output": """BFS Traversal starting from 0: 0 2 1 4 3 
DFS Traversal starting from 0: 0 2 4 1 3 """
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
                    "answer": """1. **Algorithm for BFS**:
   - Initialize `visited[0...V-1] = false` and `dist[0...V-1] = infinity`.
   - Enqueue source `s`, set `visited[s] = true`, `dist[s] = 0`.
   - While `Queue` is not empty:
     * `u = dequeue(Queue);`
     * For each neighbor $v$ in `adj[u]`:
       - If `!visited[v]`:
         * `visited[v] = true;`
         * `dist[v] = dist[u] + 1;`
         * `enqueue(Queue, v);`

2. **Proof of Shortest Path Guarantee**:
   - The FIFO queue maintains the invariant that if vertex $x$ is enqueued before vertex $y$, then $\\text{dist}[x] \\le \\text{dist}[y]$.
   - Elements are processed in non-decreasing order of edge distances ($k = 0, 1, 2, \\dots$).
   - A vertex $v$ is discovered via the earliest possible edge from a vertex at distance $k$. Any alternate path discovered later must have distance $\\ge k + 1$.
   - Thus, the first time vertex $v$ is visited, `dist[v]` is strictly the minimum edge distance.""",
                    "keyPoints": [
                        "Formal algorithm steps using FIFO queue and visited array.",
                        "Queue monotonic distance invariant (dist[x] <= dist[y]).",
                        "Proof that first discovery corresponds to minimum edge path."
                    ]
                },
                {
                    "question": "Explain how Depth-First Search (DFS) is used to detect cycles in: (a) an Undirected Graph, and (b) a Directed Graph.",
                    "marks": "7 Marks",
                    "answer": """1. **Cycle Detection in Undirected Graph**:
   - Use a `visited[]` array and pass the `parent` vertex in recursive calls: `DFS(u, parent)`.
   - For every neighbor $v$ of $u$:
     * If `!visited[v]`: recursively call `DFS(v, u)`.
     * If `visited[v] == true` AND $v \\ne \\text{parent}$:
       - A non-trivial cycle is detected! (We found an alternate path to an already visited node that is not our direct predecessor).

2. **Cycle Detection in Directed Graph**:
   - A standard `visited[]` array is insufficient because cross edges to already processed subtrees do not constitute a cycle.
   - We maintain a **Recursion Call Stack Array** (`inStack[]` or 3-color states: White = unvisited, Gray = active in stack, Black = finished).
   - `DFS(u)`:
     * Set `visited[u] = true` and `inStack[u] = true`.
     * For every neighbor $v$ of $u$:
       - If `!visited[v]`: recursively call `DFS(v)`.
       - If `inStack[v] == true`: **Cycle Detected!** Edge $(u, v)$ is a **Back Edge** pointing to an ancestor currently active on the call stack.
     * When backtracking, set `inStack[u] = false`.
   - **Theorem**: A directed graph has a cycle if and only if DFS encounters a Back Edge.""",
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
            "detailedExplanation": """## 1. The Concept of Topological Ordering

A **Topological Sort** of a directed graph $G = (V, E)$ is a linear ordering of all its vertices such that:
$$\\forall (u, v) \\in E, \\quad u \\text{ appears strictly BEFORE } v \\text{ in the ordering}$$

```mermaid
graph LR
    subgraph DAG ["Directed Acyclic Graph (Build Dependencies)"]
        C["Compile Code (0)"] --> L["Link Binaries (1)"]
        T["Unit Tests (2)"] --> P["Package Artifact (3)"]
        L --> P
        P --> D["Deploy (4)"]
    end
```

Valid Topological Order: `0 -> 2 -> 1 -> 3 -> 4` (or `2 -> 0 -> 1 -> 3 -> 4`).

### The Fundamental Theorem of Topological Sorting
> **Theorem**: A graph possesses a topological sorting **IF AND ONLY IF it is a Directed Acyclic Graph (DAG)**.

If the graph contains a directed cycle ($u \\to v \\to w \\to u$), a topological sort is logically impossible because $u$ must precede $v$, $v$ must precede $w$, and $w$ must precede $u$—a circular paradox ($u < u$).

---

## 2. Method 1: Kahn's Algorithm (In-Degree Queue Approach)

Kahn's Algorithm is a BFS-style algorithm based on vertex **in-degrees** (count of incoming edges):

```mermaid
flowchart TD
    subgraph Kahns ["Kahn's Algorithm (BFS In-Degree)"]
        K1["1. Calculate in-degree of all V vertices"]
        K2["2. Enqueue all vertices with in-degree == 0"]
        K3["3. While queue is not empty:\n   u = dequeue() -> Add u to Topological Order\n   For each neighbor v in adj[u]:\n     Decrement in-degree[v]--\n     If in-degree[v] == 0 -> Enqueue v"]
        K4{"Did Output contain all V vertices?"}
        K4 -- Yes --> SUCCESS["Valid Topological Sort!"]
        K4 -- No --> CYCLE["CYCLE DETECTED! Graph is not a DAG."]
        K1 --> K2 --> K3 --> K4
    end
```

### Cycle Detection Bonus:
If Kahn's algorithm terminates and the count of processed vertices is $< |V|$, the graph contains a **directed cycle**! (Cycle nodes never reach in-degree 0).

---

## 3. Method 2: DFS-Based Topological Sort

The DFS approach is based on completion timestamps: a vertex finishes processing only after all its downstream dependencies are satisfied.

```mermaid
flowchart TD
    subgraph DFS_Topo ["DFS Topological Sort"]
        D1["Call DFS on unvisited vertex u"]
        D2["Recursively visit all unvisited neighbors of u"]
        D3["After all neighbors are explored, PUSH u onto Stack!"]
        D4["Once all vertices explored: Pop entire stack to produce Topo Sort!"]
        D1 --> D2 --> D3 --> D4
    end
```

### Algorithm Steps:
1. Maintain `visited[V] = {false}` and an empty `Stack`.
2. For each vertex $i \\in [0 \\dots V-1]$:
   - If `!visited[i]`, call `DFSTopo(i)`.
3. Inside `DFSTopo(u)`:
   - `visited[u] = true`.
   - For each neighbor $v \\in \\text{adj}[u]$:
     - If `!visited[v]`: `DFSTopo(v)`.
   - **Post-visit**: `stack.push(u)`.
4. After all DFS calls complete, popping elements from the stack one-by-one yields the topological ordering.

---

## 4. Kahn's vs DFS Topological Sort Comparison

| Dimension | Kahn's Algorithm | DFS-Based Topological Sort |
| :--- | :--- | :--- |
| **Paradigm** | BFS (Queue-driven) | DFS (Call Stack / Explicit Stack) |
| **Key Metric Tracked** | Vertex In-Degrees (`in_degree[]`) | Post-visit finish order |
| **Cycle Detection** | Natural: Count of processed vertices $< V$ | Requires extra `inStack[]` recursion array |
| **Time Complexity** | $\\mathcal{O}(V + E)$ | $\\mathcal{O}(V + E)$ |
| **Auxiliary Space** | $\\mathcal{O}(V)$ (Queue + In-degree array) | $\\mathcal{O}(V)$ (Stack + Visited array) |
| **Ordering Direction**| Generates order from front to back | Generates order in reverse (reversed via Stack) |

---

> [!IMPORTANT] **MEMORIZE:**
> - Topological Sort is valid **ONLY on DAGs** (Directed Acyclic Graphs).
> - In Kahn's Algorithm: Enqueue vertices with **in-degree 0**. When visiting neighbor $v$, decrement in-degree; enqueue when in-degree becomes 0.
> - If Kahn's output has fewer than $V$ elements $\\implies$ Graph has a cycle!

> [!NOTE] **DEV BRAIN:**
> Package managers (npm, pip, Maven) and build systems (Make, CMake) construct a DAG of dependencies and run Topological Sort to determine the exact order in which packages must be compiled.

> [!WARNING] **TRAP:**
> In DFS-based topological sort, you MUST push the vertex to the stack **after** visiting all its neighbors (in the post-visit phase), NOT at the beginning! Pushing at the start produces an incorrect preorder traversal!

> [!TIP] **EXAM TIP:**
> A DAG can have multiple valid topological orderings. Unless a specific tie-breaking rule is given (such as choosing the smallest vertex ID first), any valid dependency ordering receives full marks!""",
            "shortNotes": "Topological sort orders DAG vertices so (u, v) implies u precedes v. Kahn's algorithm enqueues in-degree 0 nodes; DFS pushes to stack post-order. Both run in O(V + E) time.",
            "examples": [
                {
                    "title": "C Program: Topological Sort using Kahn's Algorithm and Cycle Detection",
                    "problem": "Implement Kahn's algorithm to compute topological sort of a directed graph and detect if a cycle exists.",
                    "explanation": "Calculates in-degrees, manages zero-in-degree queue, and verifies whether all V vertices were processed.",
                    "code": """#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

#define MAX_V 6

typedef struct Node {
    int dest;
    struct Node *next;
} Node;

Node* adj[MAX_V];
int inDegree[MAX_V];

void addDirectedEdge(int u, int v) {
    Node *n = (Node*)malloc(sizeof(Node));
    n->dest = v;
    n->next = adj[u];
    adj[u] = n;
    inDegree[v]++;
}

void kahnsTopologicalSort() {
    int queue[MAX_V];
    int front = 0, rear = 0;
    int topoOrder[MAX_V];
    int count = 0;

    // 1. Enqueue all vertices with in-degree 0
    for (int i = 0; i < MAX_V; i++) {
        if (inDegree[i] == 0) {
            queue[rear++] = i;
        }
    }

    // 2. Process queue
    while (front < rear) {
        int u = queue[front++];
        topoOrder[count++] = u;

        Node *curr = adj[u];
        while (curr) {
            int v = curr->dest;
            inDegree[v]--;
            if (inDegree[v] == 0) {
                queue[rear++] = v;
            }
            curr = curr->next;
        }
    }

    // 3. Verify Cycle
    if (count != MAX_V) {
        printf("Error: Graph contains a directed cycle! Topological sort impossible.\\n");
    } else {
        printf("Valid Topological Ordering (Kahn's): ");
        for (int i = 0; i < count; i++) {
            printf("%d ", topoOrder[i]);
        }
        printf("\\n");
    }
}

int main() {
    for (int i = 0; i < MAX_V; i++) {
        adj[i] = NULL;
        inDegree[i] = 0;
    }

    // Graph: 5->2, 5->0, 4->0, 4->1, 2->3, 3->1
    addDirectedEdge(5, 2);
    addDirectedEdge(5, 0);
    addDirectedEdge(4, 0);
    addDirectedEdge(4, 1);
    addDirectedEdge(2, 3);
    addDirectedEdge(3, 1);

    kahnsTopologicalSort();

    return 0;
}""",
                    "output": """Valid Topological Ordering (Kahn's): 4 5 2 0 3 1 """
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
                    "answer": """1. **Definition of DAG**:
   A Directed Acyclic Graph (DAG) is a directed graph that contains no directed cycles. In other words, there is no sequence of directed edges that starts and ends at the same vertex.

2. **Kahn's Algorithm Steps**:
   - **Step 1**: Calculate the in-degree of every vertex in the graph.
   - **Step 2**: Initialize a FIFO queue and enqueue all vertices with `in-degree == 0`.
   - **Step 3**: Initialize `count = 0`.
   - **Step 4**: While the queue is not empty:
     * Dequeue vertex $u$ and append it to the topological sort result. Increment `count++`.
     * For each neighbor $v$ of $u$:
       - Decrement `in-degree[v]--`.
       - If `in-degree[v] == 0`, enqueue $v$.

3. **Cycle Detection Mechanism**:
   - In a directed cycle, every vertex in the cycle has an in-degree of at least 1 from its predecessor.
   - None of the vertices in the cycle will ever reach an in-degree of 0.
   - Consequently, vertices in a cycle are never enqueued or processed.
   - If the final `count < V`, the algorithm detects that a **directed cycle exists** and reports failure.""",
                    "keyPoints": [
                        "Formal definition of DAG.",
                        "Step-by-step description of Kahn's Algorithm using in-degree queue.",
                        "Clear explanation of cycle detection when count < V."
                    ]
                },
                {
                    "question": "Explain the DFS-based algorithm for Topological Sorting. Why are vertices pushed onto the stack during the post-visit phase rather than pre-visit?",
                    "marks": "5 Marks",
                    "answer": """1. **Algorithm Overview**:
   - Initialize `visited[V] = {false}` and an empty stack $S$.
   - For each unvisited vertex $i \\in [0 \\dots V-1]$: call `DFSTopo(i)`.
   - In `DFSTopo(u)`:
     * `visited[u] = true`.
     * For each neighbor $v \\in \\text{adj}[u]$:
       - If `!visited[v]`: call `DFSTopo(v)`.
     * **Post-Visit Action**: Push $u$ onto stack $S$.
   - Pop and print all elements from $S$.

2. **Why Push Post-Visit (Not Pre-Visit)**:
   - In topological sort, if an edge $u \\to v$ exists, $u$ must appear before $v$.
   - In DFS, `DFSTopo(u)` visits $u$, dives into neighbor $v$, and $v$'s entire subtree completes **before** $u$ finishes.
   - Pushing post-visit means $v$ is pushed onto the stack **before** $u$.
   - Because a stack is LIFO, when we pop the stack at the end, $u$ is popped **before** $v$, preserving the correct dependency order ($u$ before $v$)!
   - Pushing pre-visit would order elements by their initial discovery, which fails if a node has incoming edges from other branches.""",
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
            "detailedExplanation": """## 1. The Single-Source Shortest Path (SSSP) Problem

Given a weighted directed or undirected graph $G = (V, E)$ with edge weight function $w: E \\to \\mathbb{R}$, find the minimum weight path from designated source $s$ to all vertices $v \\in V$:
$$\\text{dist}[v] = \\min_{P} \\sum_{e \\in P} w(e)$$

### The Core Primitive: Edge Relaxation
Both Dijkstra and Bellman-Ford rely on the fundamental operation of **relaxing an edge $(u, v)$ with weight $w$**:
```c
if (dist[u] + w < dist[v]) {
    dist[v] = dist[u] + w;
    parent[v] = u;
}
```

```mermaid
flowchart LR
    subgraph Relax ["Edge Relaxation: relax(u, v, w)"]
        U["u (dist[u] = 5)"] -->|weight = 2| V["v (dist[v] = 10)"]
        NOTE["5 + 2 = 7 < 10\nImprovement found! Update dist[v] = 7"]
    end
```

---

## 2. Dijkstra's Algorithm (Greedy Strategy)

Dijkstra's algorithm solves SSSP in graphs with **strictly non-negative edge weights** ($w(e) \\ge 0$).

```mermaid
flowchart TD
    subgraph Dijkstra_Flow ["Dijkstra's Algorithm Flow"]
        D1["1. dist[s] = 0; all other dist[v] = inf"]
        D2["2. Insert (dist=0, s) into Min-Heap PQ"]
        D3["3. While PQ is not empty:\n   (d, u) = extractMin(PQ)\n   If d > dist[u]: continue (stale pair)\n   For each neighbor v of u with weight w:\n     If dist[u] + w < dist[v]:\n       dist[v] = dist[u] + w\n       Insert (dist[v], v) into PQ"]
        D1 --> D2 --> D3
    end
```

### Why Dijkstra Fails on Negative Edge Weights
Dijkstra's greedy paradigm permanently fixes `dist[u]` once vertex $u$ is extracted from the Min-Heap, assuming that because all edge weights are positive, no future path can ever decrease `dist[u]`.
If an edge has **negative weight**, an extended detour path could yield a lower total cost, breaking Dijkstra's greedy invariant and producing incorrect shortest distances.

---

## 3. Bellman-Ford Algorithm (Dynamic Programming)

Bellman-Ford solves SSSP in general graphs and **permits negative edge weights**.

### Algorithmic Concept:
In a graph with $V$ vertices without negative cycles, any simple shortest path contains at most $V - 1$ edges. Therefore, relaxing **all $E$ edges across $V - 1$ outer iterations** guarantees that shortest paths are propagated to all vertices.

```c
// Bellman-Ford Outer Loop
for (int i = 1; i <= V - 1; i++) {
    for (each edge (u, v) with weight w in E) {
        if (dist[u] != INF && dist[u] + w < dist[v]) {
            dist[v] = dist[u] + w;
        }
    }
}
```

### Negative Weight Cycle Detection:
What if the graph contains a **negative weight cycle** (a cycle whose edge weights sum to $< 0$)?
A negative cycle allows an algorithm to loop endlessly, driving path cost to $-\\infty$.
- **Detection Test**: Run a $V$-th relaxation pass over all edges.
  ```c
  for (each edge (u, v) with weight w in E) {
      if (dist[u] != INF && dist[u] + w < dist[v]) {
          printf("Negative Weight Cycle Detected!\\n");
      }
  }
  ```
  If any distance can *still* be reduced on the $V$-th pass, the graph contains a negative cycle!

---

## 4. Architectural Comparison: Dijkstra vs Bellman-Ford

| Feature / Metric | Dijkstra's Algorithm | Bellman-Ford Algorithm |
| :--- | :--- | :--- |
| **Design Paradigm** | Greedy Strategy | Dynamic Programming |
| **Data Structure Used**| Min-Heap (Priority Queue) | Simple Edge List Array |
| **Negative Weights** | **Forbidden** (Fails or loops) | **Permitted** (Handled correctly) |
| **Negative Cycle Detection**| Cannot detect | **Can detect** on $V$-th relaxation pass |
| **Time Complexity** | $\\mathcal{O}((V + E) \\log V)$ | $\\mathcal{O}(V \\times E)$ |
| **Auxiliary Space** | $\\mathcal{O}(V)$ | $\\mathcal{O}(V)$ |
| **Primary Use Case** | Network routing (OSPF, Google Maps) | Currency arbitrage, RIP routing protocol |

---

> [!IMPORTANT] **MEMORIZE:**
> - Dijkstra's time complexity: $\\mathcal{O}((V + E) \\log V)$ with a binary Min-Heap.
> - Bellman-Ford's time complexity: $\\mathcal{O}(V \\times E)$.
> - Dijkstra requires **non-negative weights**. Bellman-Ford handles **negative weights** and detects negative cycles on the $V$-th pass!

> [!NOTE] **DEV BRAIN:**
> Foreign exchange arbitrage detection in algorithmic trading models currencies as graph vertices and conversion exchange rates as logarithmic edge weights: $-\\log(\\text{Rate})$. Negative cycles in this graph represent guaranteed arbitrage profit loops!

> [!WARNING] **TRAP:**
> Do not confuse a *negative edge* with a *negative cycle*. Bellman-Ford can find shortest paths with negative edges. It is only when the sum of weights around a closed cycle is negative that shortest paths are mathematically undefined ($-\\infty$)!

> [!TIP] **EXAM TIP:**
> When asked to trace Bellman-Ford, always show: (1) Distance array after each of the $V-1$ iterations, and (2) The $V$-th iteration checking if any value changes to confirm absence of negative cycles.""",
            "shortNotes": "Dijkstra is greedy using a Min-Heap (O((V+E)log V)), requiring non-negative weights. Bellman-Ford relaxes all edges V-1 times in O(V*E) time, handling negative weights and detecting negative cycles.",
            "examples": [
                {
                    "title": "C Implementation of Bellman-Ford with Negative Cycle Detection",
                    "problem": "Implement Bellman-Ford SSSP algorithm on a graph with 5 vertices and 8 edges, including negative weights and negative cycle validation.",
                    "explanation": "Demonstrates relaxation of edge list across V-1 passes, followed by the V-th verification pass.",
                    "code": """#include <stdio.h>
#include <stdbool.h>

#define INF 1000000000

typedef struct {
    int src, dest, weight;
} Edge;

void bellmanFord(int V, int E, Edge edges[], int src) {
    int dist[V];
    for (int i = 0; i < V; i++) dist[i] = INF;
    dist[src] = 0;

    // 1. Relax all edges V - 1 times
    for (int i = 1; i <= V - 1; i++) {
        for (int j = 0; j < E; j++) {
            int u = edges[j].src;
            int v = edges[j].dest;
            int w = edges[j].weight;
            if (dist[u] != INF && dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
            }
        }
    }

    // 2. Check for negative-weight cycles (V-th iteration)
    bool hasCycle = false;
    for (int j = 0; j < E; j++) {
        int u = edges[j].src;
        int v = edges[j].dest;
        int w = edges[j].weight;
        if (dist[u] != INF && dist[u] + w < dist[v]) {
            hasCycle = true;
            break;
        }
    }

    if (hasCycle) {
        printf("Graph contains a Negative-Weight Cycle!\\n");
    } else {
        printf("Shortest Distances from Source %d:\\n", src);
        for (int i = 0; i < V; i++) {
            printf("  Vertex %d : %d\\n", i, dist[i]);
        }
    }
}

int main() {
    int V = 5, E = 8;
    Edge edges[] = {
        {0, 1, -1}, {0, 2, 4},
        {1, 2, 3},  {1, 3, 2}, {1, 4, 2},
        {3, 2, 5},  {3, 1, 1},
        {4, 3, -3}
    };

    bellmanFord(V, E, edges, 0);

    return 0;
}""",
                    "output": """Shortest Distances from Source 0:
  Vertex 0 : 0
  Vertex 1 : -1
  Vertex 2 : 2
  Vertex 3 : -2
  Vertex 4 : 1"""
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
                    "answer": """1. **Dijkstra's Algorithm Overview**:
   - Initialize `dist[s] = 0` and all other `dist[v] = infinity`.
   - Maintain a Min-Heap priority queue of pairs `(dist, vertex)` and a set `visited`.
   - While the priority queue is not empty:
     * Extract vertex $u$ with minimum `dist[u]`.
     * If $u$ is already visited, continue.
     * Mark $u$ as visited.
     * For each neighbor $v$ of $u$ with weight $w$:
       - If `dist[u] + w < dist[v]`:
         * `dist[v] = dist[u] + w`.
         * Insert `(dist[v], v)` into priority queue.

2. **Why Dijkstra Fails on Negative Edge Weights**:
   - **Greedy Invariant**: Dijkstra assumes that when a vertex $u$ is extracted from the Min-Heap, its distance `dist[u]` is final and optimal.
   - This assumption is mathematically valid *only if all future edge additions are non-negative* ($w \\ge 0$), meaning path lengths can only grow.
   - If negative edge weights exist, a longer multi-hop path could later reduce the total path cost below `dist[u]`.
   - Because Dijkstra marks nodes as permanently visited and never revisits them, it misses these shorter paths, producing incorrect distance results.""",
                    "keyPoints": [
                        "Dijkstra's step-by-step algorithm using priority queue.",
                        "Analysis of the greedy invariant.",
                        "Explanation with counterexample showing how negative weights break path monotonicity."
                    ]
                },
                {
                    "question": "Explain the Bellman-Ford algorithm. Prove why V - 1 relaxation iterations are sufficient to find shortest paths in a graph without negative cycles.",
                    "marks": "5 Marks",
                    "answer": """1. **Bellman-Ford Algorithm**:
   - Initialize `dist[source] = 0` and all other `dist[v] = infinity`.
   - Execute $V - 1$ outer iterations. In each iteration, relax every edge $(u, v) \\in E$:
     `if (dist[u] + w < dist[v]) dist[v] = dist[u] + w;`
   - Execute a $V$-th pass: if any edge can still be relaxed, report "Negative Cycle Detected".

2. **Proof Why $V - 1$ Iterations Suffice**:
   - In a graph of $V$ vertices with no negative cycles, a simple shortest path visits each vertex at most once.
   - Therefore, any simple shortest path contains at most **$V - 1$ edges**.
   - In the $1$-st iteration, all shortest paths of length 1 edge are correctly determined.
   - By induction, after iteration $k$, all shortest paths of length at most $k$ edges are guaranteed to be computed.
   - Because the longest simple shortest path has at most $V - 1$ edges, **$V - 1$ iterations guarantee that all shortest paths are finalized**.""",
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
            "detailedExplanation": """## 1. The Minimum Spanning Tree (MST) Problem

Given a connected, undirected, weighted graph $G = (V, E)$, a **Spanning Tree** is a subgraph $T = (V, E_T)$ that connects all $|V|$ vertices with exactly $|V| - 1$ edges without containing any cycles.

The **Minimum Spanning Tree (MST)** is the spanning tree that minimizes the total sum of edge weights:
$$w(T) = \\sum_{e \\in E_T} w(e) \\quad \\text{is minimized}$$

```mermaid
graph LR
    subgraph Graph ["Original Graph"]
        A((A)) ---|4| B((B))
        A ---|2| C((C))
        B ---|1| C
        B ---|5| D((D))
        C ---|8| D
    end

    subgraph MST ["Minimum Spanning Tree (Total Weight = 2 + 1 + 5 = 8)"]
        MA((A)) ---|2| MC((C))
        MB((B)) ---|1| MC
        MB ---|5| MD((D))
    end
```

---

## 2. The Cut Property (Theoretical Foundation of MST)

Both Prim's and Kruskal's greedy algorithms are proven correct by the **Cut Property**:

> **The Cut Property**:
> Let $S \\subset V$ be any subset of vertices, and let $(S, V - S)$ be a **cut** partitioning the graph into two disjoint sets.
> If edge $e = (u, v)$ is the **strictly minimum-weight edge** crossing the cut (i.e., with one endpoint in $S$ and the other in $V - S$), then **this edge $e$ must belong to the Minimum Spanning Tree**.

---

## 3. Prim's Algorithm (Vertex-Growing Strategy)

Prim's algorithm starts from an arbitrary root vertex and grows a single tree outward vertex-by-vertex:
1. Initialize an empty tree $T$ and a set of visited vertices $S = \\{s\\}$.
2. Insert all edges incident to $s$ into a Min-Heap Priority Queue.
3. While the tree contains fewer than $V - 1$ edges:
   - Extract the minimum weight edge $e = (u, v)$ from the Min-Heap where $u \\in S$.
   - If $v \\in S$, discard $e$ (it would form a cycle).
   - If $v \\notin S$:
     - Add $e$ to MST $T$.
     - Add $v$ to $S$.
     - Enqueue all edges departing from $v$ into the Min-Heap.
- **Time Complexity**: $\\mathcal{O}((V + E) \\log V)$ using a binary Min-Heap.

```mermaid
sequenceDiagram
    autonumber
    participant T as Prim's MST Set S
    participant PQ as Min-Heap of Crossing Edges
    Note over T: S = {0}
    Note over PQ: Edges crossing from S to V-S: (0-1: 4), (0-7: 8)
    Note over PQ: Extract Min: Edge (0-1: 4) -> Add to MST!
    Note over T: S = {0, 1}
    Note over PQ: Add crossing edges from vertex 1 -> Extract next minimum crossing edge...
```

---

## 4. Kruskal's Algorithm (Edge-Growing Strategy)

Kruskal's algorithm treats the graph as a forest of individual trees and merges them:
1. Sort all $E$ edges in non-decreasing order of weight: $w(e_1) \\le w(e_2) \\le \\dots \\le w(e_E)$.
2. Iterate through sorted edges:
   - If adding edge $(u, v)$ **does not create a cycle**, add it to the MST.
   - Else, discard the edge.
3. Stop when $V - 1$ edges have been selected.

```mermaid
flowchart TD
    subgraph Kruskal_Flow ["Kruskal's Algorithm Flow"]
        K1["1. Sort all E edges by weight in O(E log E)"]
        K2["2. Initialize DSU: each vertex is its own set"]
        K3["3. For each edge (u, v) in sorted order:\n   If find(u) != find(v):\n     Add (u, v) to MST\n     union(u, v)\n     If edges == V - 1: break"]
        K1 --> K2 --> K3
    end
```

---

## 5. Disjoint-Set Union (DSU) / Union-Find

To check if edge $(u, v)$ creates a cycle in $\\mathcal{O}(1)$ time, Kruskal's algorithm uses a **Disjoint-Set Union (DSU)** data structure with two optimizations:

### A. Union by Rank
- Each set is a tree; `rank[root]` estimates tree height.
- When unioning two sets, always attach the root of the **smaller rank tree** under the root of the **higher rank tree**, preventing tree skewing.

### B. Path Compression
- During `find(x)`, make every traversed node point directly to the set representative root.

```mermaid
graph TD
    subgraph PathCompression ["Path Compression in find(x)"]
        subgraph Before ["Before: Deep Pointer Chain"]
            A1((Root)) --> B1((B))
            B1 --> C1((C))
            C1 --> D1((x))
        end
        subgraph After ["After: Flat Tree with O(1) Depth"]
            A2((Root)) --> B2((B))
            A2 --> C2((C))
            A2 --> D2((x))
        end
    end
```

### Ackermann Complexity
With Union by Rank + Path Compression, any sequence of $m$ operations on $n$ elements executes in:
$$\\mathcal{O}(m \\cdot \\alpha(n))$$
Where $\\alpha(n)$ is the **Inverse Ackermann Function**. For all physical values in the known universe ($n < 10^{80}$ atoms), $\\alpha(n) \\le 4$, making DSU operations **effectively $\\mathcal{O}(1)$ constant time**!

---

## 6. Prim vs Kruskal Comparison Matrix

| Dimension | Prim's Algorithm | Kruskal's Algorithm |
| :--- | :--- | :--- |
| **Strategy** | Grows a single tree from a root vertex | Grows a forest of trees by picking global minimum edges |
| **Data Structures** | Min-Heap Priority Queue + Visited array | Sorting Algorithm + Disjoint-Set Union (DSU) |
| **Time Complexity** | $\\mathcal{O}((V + E) \\log V)$ | $\\mathcal{O}(E \\log E) = \\mathcal{O}(E \\log V)$ |
| **Dense Graphs ($E \\approx V^2$)**| **Faster** ($\\\\mathcal{O}(V^2)$ with adjacency matrix) | Slower (sorting $V^2$ edges) |
| **Sparse Graphs ($E \\approx V$)** | Slower | **Faster** (fewer edges to sort) |

---

> [!IMPORTANT] **MEMORIZE:**
> - An MST always contains exactly **$V - 1$ edges**.
> - The Cut Property states that the lightest edge crossing any cut belongs to the MST.
> - Kruskal's uses **DSU** (Union-Find) with Union by Rank and Path Compression ($\\\\alpha(n) \\approx \\mathcal{O}(1)$).
> - Prim's is preferred for **Dense Graphs**; Kruskal's is preferred for **Sparse Graphs**.

> [!NOTE] **DEV BRAIN:**
> In computer graphics, Kruskal's algorithm on a randomized grid generates realistic mazes: cells are vertices, walls are edges with random weights, and the MST forms the maze corridors!

> [!WARNING] **TRAP:**
> Do not confuse a Minimum Spanning Tree with Shortest Paths! Dijkstra minimizes the path from a *single source*; MST minimizes the *total weight of all edges* across the entire network. The shortest path between two vertices in an MST is often NOT the shortest path in the original graph!

> [!TIP] **EXAM TIP:**
> When asked to trace Kruskal's algorithm, list all edges sorted by weight in a table, and for each edge show whether it is **ACCEPTED** or **REJECTED (Forms Cycle)**.""",
            "shortNotes": "MST connects all V vertices with V - 1 edges of minimum total weight. Prim grows a tree via Min-Heap (best for dense). Kruskal sorts edges and selects via DSU with path compression (best for sparse).",
            "examples": [
                {
                    "title": "C Implementation of Kruskal's Algorithm using Disjoint-Set Union (Union by Rank)",
                    "problem": "Implement Kruskal's algorithm to compute the Minimum Spanning Tree weight of an undirected graph.",
                    "explanation": "Sorts edges, uses DSU with path compression and union by rank to prevent cycles, and sums MST weights.",
                    "code": """#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int u, v, weight;
} Edge;

typedef struct {
    int parent;
    int rank;
} Subset;

int find(Subset subsets[], int i) {
    if (subsets[i].parent != i)
        subsets[i].parent = find(subsets, subsets[i].parent); // Path Compression
    return subsets[i].parent;
}

void unionSets(Subset subsets[], int x, int y) {
    int rootX = find(subsets, x);
    int rootY = find(subsets, y);

    if (subsets[rootX].rank < subsets[rootY].rank)
        subsets[rootX].parent = rootY;
    else if (subsets[rootX].rank > subsets[rootY].rank)
        subsets[rootY].parent = rootX;
    else {
        subsets[rootY].parent = rootX;
        subsets[rootX].rank++;
    }
}

int compareEdges(const void *a, const void *b) {
    return ((Edge*)a)->weight - ((Edge*)b)->weight;
}

void kruskalsMST(int V, int E, Edge edges[]) {
    // 1. Sort edges by weight
    qsort(edges, E, sizeof(Edge), compareEdges);

    Subset *subsets = (Subset*)malloc(V * sizeof(Subset));
    for (int v = 0; v < V; v++) {
        subsets[v].parent = v;
        subsets[v].rank = 0;
    }

    Edge mst[V - 1];
    int edgeCount = 0;
    int totalWeight = 0;

    for (int i = 0; i < E && edgeCount < V - 1; i++) {
        Edge nextEdge = edges[i];
        int x = find(subsets, nextEdge.u);
        int y = find(subsets, nextEdge.v);

        if (x != y) { // Does not form cycle
            mst[edgeCount++] = nextEdge;
            totalWeight += nextEdge.weight;
            unionSets(subsets, x, y);
        }
    }

    printf("Minimum Spanning Tree Edges:\\n");
    for (int i = 0; i < edgeCount; i++) {
        printf("  Edge (%d - %d) : Weight %d\\n", 
               mst[i].u, mst[i].v, mst[i].weight);
    }
    printf("Total MST Weight: %d\\n", totalWeight);

    free(subsets);
}

int main() {
    int V = 4, E = 5;
    Edge edges[] = {
        {0, 1, 10},
        {0, 2, 6},
        {0, 3, 5},
        {1, 3, 15},
        {2, 3, 4}
    };

    kruskalsMST(V, E, edges);

    return 0;
}""",
                    "output": """Minimum Spanning Tree Edges:
  Edge (2 - 3) : Weight 4
  Edge (0 - 3) : Weight 5
  Edge (0 - 1) : Weight 10
Total MST Weight: 19"""
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
                    "answer": """1. **Statement of the Cut Property**:
   Let $G = (V, E)$ be a connected, undirected graph with real edge weights. Let $(S, V - S)$ be any cut partitioning vertices $V$ into two disjoint sets. If edge $e = (u, v)$ is the strictly minimum-weight edge crossing the cut $(u \\in S, v \\in V - S)$, then edge $e$ belongs to every Minimum Spanning Tree of $G$.

2. **Proof by Contradiction**:
   - Assume there exists an MST $T$ that does NOT contain the lightest crossing edge $e = (u, v)$.
   - Since $T$ is a spanning tree, adding edge $e$ to $T$ must create a unique cycle $C$.
   - Because $u \\in S$ and $v \\in V - S$, the cycle $C$ must cross the cut $(S, V - S)$ at least once more via some other edge $e' = (x, y)$ where $x \\in S$ and $y \\in V - S$.
   - Now, construct a new spanning tree $T'$ by removing $e'$ and adding $e$:
     $$T' = (T - \\{e'\\}) \\cup \\{e\\}$$
   - The total weight of the new tree is:
     $$w(T') = w(T) - w(e') + w(e)$$
   - Because $e$ is the strictly minimum-weight edge crossing the cut, $w(e) < w(e')$.
   - Therefore:
     $$w(T') < w(T)$$
   - This contradicts the initial premise that $T$ was a Minimum Spanning Tree!
   - Hence, the lightest crossing edge $e$ must belong to the MST. Q.E.D.""",
                    "keyPoints": [
                        "Formal statement of the Cut Property.",
                        "Proof by contradiction using cycle creation when adding edge e.",
                        "Swapping e with crossing edge e' to produce tree of strictly lower weight."
                    ]
                },
                {
                    "question": "Explain the Disjoint-Set Union (DSU) data structure. Describe the two optimizations: (a) Union by Rank, and (b) Path Compression. What is the resulting time complexity?",
                    "marks": "5 Marks",
                    "answer": """1. **Concept of DSU**:
   DSU maintains a collection of disjoint sets supporting two operations: `find(x)` (identifies set representative) and `union(x, y)` (merges two sets).

2. **Optimization 1: Union by Rank**:
   - Naive union can link taller trees under shorter ones, creating a degenerate chain of depth $O(n)$.
   - In Union by Rank, each set maintains a `rank` approximating tree height.
   - When unioning, attach the root of the smaller rank tree under the root of the larger rank tree. Rank increases only if both trees had equal rank.
   - Limits tree height to $\\mathcal{O}(\\log n)$.

3. **Optimization 2: Path Compression**:
   - Inside `find(x)`, make every visited node point directly to the root representative:
     `parent[x] = find(parent[x])`.
   - Flattens the tree so future `find` queries on those nodes execute in $O(1)$ time.

4. **Resulting Complexity**:
   Combining Union by Rank and Path Compression reduces the amortized cost per operation to $\\mathcal{O}(\\alpha(n))$, where $\\alpha(n) \\le 4$ is the Inverse Ackermann function—effectively constant time.""",
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
}
