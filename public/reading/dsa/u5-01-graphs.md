## GRAPHS

Terminologies • Matrix & List Representation • DFS • BFS • Applications

Undergraduate Computer Science

Learning Objectives

- Define graphs and explain fundamental graph terminology.
- Represent graphs using adjacency matrices and adjacency lists.
- Compare graph representations and select an appropriate one.
- Understand and implement Depth First Search (DFS) and Breadth First Search (BFS).
- Trace DFS and BFS step-by-step.
- Explain graph applications and analyze traversal complexity.

1. Introduction to Graphs A graph is a non-linear data structure consisting of vertices (nodes) and edges connecting pairs of vertices. It is commonly represented as G = (V, E), where V is the set of vertices and E is the set of edges.

```
A
B---C
|
D
V = {A, B, C, D}
E = {(A,B), (A,C), (B,C), (B,D)}
```

2. Applications of Graphs in Computer Science

| Application | Use |
|---|---|
| Computer networks | Devices are vertices; communication links are edges. |
| Social networks | Users are vertices; relationships are edges. |
| Maps/navigation | Locations are vertices; roads are weighted edges. |
| Web search | Web pages are vertices; hyperlinks are directed edges. |
| Operating systems | Process-resource relationships and deadlock models. |
| Artificial intelligence | Knowledge graphs, state-space search and planning. |
| Compiler design | Control-flow, dependency and data-flow graphs. |
| Recommendation systems | Users/items and relationships can be modeled as graphs. |

3. Graph Terminology

| Term | Meaning |
|---|---|
| Vertex | An individual node in a graph. |
| Edge | A connection between two vertices. |
| Adjacent vertices | Vertices directly connected by an edge. |
| Incident edge | An edge connected to a particular vertex. |
| Degree | Number of edges incident on a vertex in an undirected graph. |
| Path | A sequence of vertices connected by edges. |
| Cycle | A path that starts and ends at the same vertex. |
| Connected graph | A graph where every pair of vertices has a path between them. |
| Disconnected graph | A graph containing separate components. |
| Complete graph | A graph in which every pair of distinct vertices is connected. |

3.1 Directed and Undirected Graphs

```
Directed: A → B → C
Undirected: A ---- B
```

Directed edges have direction; undirected edges do not.

3.2 Weighted Graph

```
A ----- B
| |
10 3
| |
D ----- C
```

Weights may represent distance, cost, time, bandwidth or risk.

4. Graph Representation The two fundamental representations are adjacency matrix and adjacency list.

5. Adjacency Matrix An adjacency matrix is a two-dimensional array in which matrix[i][j] indicates whether an edge exists from vertex i to vertex j.

```
A ---- B
| |
| |
D ---- C
A B C D
A 0 1 0 1
B 1 0 1 0
C 0 1 0 1
D 1 0 1 0
```

For an undirected graph, the matrix is symmetric: matrix[i][j] = matrix[j][i].

5.1 Weighted Matrix

```
A B C D
A 0 5 ∞ 10
B 5 0 3 ∞
C ∞ 3 0 7
D 10 ∞ 7 0
```

- Edge lookup takes O(1).
- Space requirement is O(V²).
- Excellent for dense graphs.
- Can waste space for sparse graphs.

6. Adjacency List An adjacency list stores the neighbors of each vertex in a separate list.

```
A → B → D
B → A → C
C → B → D
D → A → C
```

A linked-list node may be defined as:

```
struct Node
{
int vertex;
struct Node *next;
};
```

- Typical storage is O(V + E).
- Efficient for sparse graphs.
- Finding neighbors is efficient.
- A particular edge may require searching a neighbor list.

7. Matrix vs List

| Feature | Matrix | List |
|---|---|---|
| Structure | 2D array | Neighbor list per vertex |
| Space | O(V²) | O(V + E) |
| Edge lookup | O(1) | O(degree) basic list |
| Find neighbors | O(V) | O(degree) |
| Dense graphs | Good | Less advantageous |
| Sparse graphs | Wasteful | Excellent |

8. Elementary Graph Operations

- Add vertex
- Add edge
- Delete vertex
- Delete edge
- Search vertex
- Find adjacent vertices
- Traverse graph

The two fundamental traversal methods are DFS and BFS.

9. Graph Traversal Graph traversal visits vertices systematically. Since graphs can contain cycles and multiple paths, a visited array or set is required to prevent repeated processing.

10. Depth First Search (DFS)

DFS explores as far as possible along one path before backtracking. It uses recursion or an explicit stack.

```
A
B C
/ \ \
D E F
One DFS order from A:
A B D E C F
```

10.1 Recursive DFS Pseudocode

```
DFS(vertex)
mark vertex as VISITED
visit(vertex)
for each neighbor of vertex
if neighbor is NOT VISITED
DFS(neighbor)
```

10.2 DFS for Disconnected Graph

```
DFS_GRAPH(G)
mark all vertices as NOT VISITED
for each vertex v in G
if v is NOT VISITED
DFS(v)
```

10.3 Iterative DFS Using Stack

```
DFS_ITERATIVE(G, start)
create empty STACK
create VISITED array
push start into STACK
while STACK is not empty
vertex = pop(STACK)
if vertex is not VISITED
mark vertex as VISITED
visit(vertex)
for each neighbor of vertex
if neighbor is not VISITED
push neighbor into STACK
```

A stack follows LIFO (Last In, First Out), supporting depth-first behavior.

11. DFS Step-by-Step Example

1. Visit A.

2. Move to B.

3. Move to D; D has no unvisited neighbor, so backtrack.

4. Visit E.

5. Backtrack to A and visit C.

6. Visit F.

Result: A B D E C F. The exact order depends on the order of neighbors.

12. Breadth First Search (BFS)

BFS explores a graph level by level and normally uses a queue.

```
A
B C
/ \ \
D E F
Level 0: A
Level 1: B C
Level 2: D E F
BFS = A B C D E F
```

12.1 BFS Pseudocode

```
BFS(G, start)
create empty QUEUE
create VISITED array
mark start as VISITED
enqueue(start)
while QUEUE is not empty
vertex = dequeue()
visit(vertex)
for each neighbor of vertex
if neighbor is NOT VISITED
mark neighbor as VISITED
enqueue(neighbor)
```

12.2 BFS Step-by-Step

7. Enqueue A.

8. Remove A and enqueue B,C.

9. Remove B and enqueue D,E.

10. Remove C and enqueue F.

11. Visit D, E and F.

Result: A B C D E F.

13. DFS vs BFS

| Feature | DFS | BFS |
|---|---|---|
| Strategy | Go deep, then backtrack | Visit level by level |
| Data structure | Stack / recursion | Queue |
| Shortest path in unweighted graph | Not guaranteed | Yes, from source |
| Typical uses | Backtracking, cycle detection, | Shortest paths, levels, broadcasting |

components

14. Applications of DFS

- Maze solving and backtracking.
- Cycle detection.
- Connected-component identification.
- Topological sorting in appropriate DAGs.
- State-space and puzzle exploration.
- Dependency analysis.

15. Applications of BFS

- Shortest path in an unweighted graph.
- Friends-of-friends in social networks.
- Network broadcasting.
- Level-order exploration.
- Web crawling by levels.
- Minimum number of edges from a source.

16. Disconnected Graphs

```
A ---- B C ---- D
```

A traversal starting at A visits only A and B. To traverse the complete graph, another traversal must begin from an unvisited vertex such as C.

```
TRAVERSE_GRAPH(G)
mark all vertices as NOT VISITED
for each vertex v in G
if v is NOT VISITED
DFS(v) // or BFS(v)
```

17. Complexity of DFS and BFS Let V be the number of vertices and E the number of edges.

| Representation | DFS Time | BFS Time |
|---|---|---|
| Adjacency List | O(V + E) | O(V + E) |
| Adjacency Matrix | O(V²) | O(V²) |

Auxiliary traversal space is O(V) for visited information and the stack/queue, excluding graph storage.

18. Worked Example

```
A
B C
/ \ \
D E F
\
```

```
G
Edges:
A-B, A-C, B-D, B-E, C-F, E-G
```

| Traversal | Result |
|---|---|
| DFS from A | A B D E G C F |
| BFS from A | A B C D E F G |

These orders assume neighbors are processed left-to-right.

19. Graph vs Tree

| Feature | Tree | Graph |
|---|---|---|
| Structure | Hierarchical | General network |
| Cycles | No cycles | May contain cycles |
| Root | Usually has a root | No root required |
| Path between two vertices | Exactly one | May be multiple |
| Connectivity | Connected | May be disconnected |
| Edges for n vertices | n − 1 | Variable |
| Traversal | DFS/BFS and tree traversals | DFS/BFS |

20. Common Student Mistakes

12. Forgetting the visited array/set.

13. Confusing DFS with BFS: DFS → stack/recursion; BFS → queue.

14. Assuming DFS always finds the shortest path.

15. Forgetting disconnected components.

16. Assuming traversal order is unique; it depends on neighbor order.

21. Quick Revision Sheet

| Concept | Remember |
|---|---|
| Graph | G = (V,E) |
| V | Set of vertices |
| E | Set of edges |
| Directed graph | Edges have direction |
| Undirected graph | Edges have no direction |
| Weighted graph | Edges have weights |
| Path | Sequence of connected vertices |
| Cycle | Returns to starting vertex |
| Adjacency Matrix | O(V²) space |
| Adjacency List | O(V+E) space |
| DFS | Stack / recursion |
| BFS | Queue |
| DFS/BFS with list | O(V+E) |

22. Exam-Oriented Questions

Short Answer Questions

17. Define a graph.

18. What are vertices and edges?

19. Differentiate directed and undirected graphs.

20. Define a weighted graph.

21. What is the degree of a vertex?

22. What is a path?

23. What is a cycle?

24. Define a connected graph.

25. What is an adjacency matrix?

26. What is an adjacency list?

27. What is DFS?

28. What is BFS?

29. Which data structure is used by DFS?

30. Which data structure is used by BFS?

31. What is the time complexity of DFS using an adjacency list?

32. Why is a visited array required?

33. Give two applications of graphs.

34. Give two applications of DFS.

35. Give two applications of BFS.

Long Answer Questions

36. Explain graph terminology with suitable examples.

37. Explain adjacency matrix representation with an example.

38. Explain adjacency list representation with an example.

39. Compare adjacency matrix and adjacency list.

40. Explain DFS with pseudocode and a suitable graph.

41. Explain BFS with pseudocode and a suitable graph.

42. Compare DFS and BFS.

43. Explain traversal of disconnected graphs.

44. Discuss applications of graphs in computer science.

45. Analyze the time and space complexity of DFS and BFS.

23. Key Takeaways

- Graphs model relationships using vertices and edges.
- Matrices are convenient for dense graphs; lists are efficient for sparse graphs.
- DFS explores deeply and uses recursion or a stack.
- BFS explores level by level and uses a queue.
- A visited mechanism is essential for general graph traversal.
- With an adjacency list, DFS and BFS run in O(V + E).
