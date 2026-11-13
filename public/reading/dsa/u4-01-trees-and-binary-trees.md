## TREES AND BINARY TREES

Definitions • Representation • Traversals • Threaded Binary Trees • BST • General-to-Binary Conversion

Undergraduate Computer Science

Concepts, diagrams, pseudocode, worked examples, applications and revision questions

### Learning Objectives

- Define trees and explain common tree terminology.
- Explain binary trees and their array and linked representations.
- Perform preorder, inorder and postorder traversals.
- Understand threaded binary trees and their purpose.
- Construct, search, insert and delete nodes in a Binary Search Tree (BST).
- Convert a general tree into a binary tree using left-child right-sibling representation.
- Identify real-world and computer science applications of trees.

### 1. Introduction to Trees

A tree is a non-linear hierarchical data structure used to represent relationships between objects in a parent-child manner. Unlike arrays, linked lists, stacks and queues, which are generally linear, a tree can branch into multiple substructures.

Example

```
A
/ | \
B C D
/ \ |
E F G
```

Here, A is the root; B, C and D are its children; E, F and G are leaf nodes; and B is the parent of E and F.

### 2. Tree Terminology

| Term | Meaning |
|---|---|
| Node | An individual element in a tree. |
| Root | The topmost node. A tree has exactly one root. |
| Edge | A connection between two nodes. A tree with n nodes has n − 1 edges. |
| Parent | A node that has one or more children. |
| Child | A node directly below another node. |
| Siblings | Nodes having the same parent. |
| Leaf / Terminal Node | A node with no children. |
| Internal Node | A node having at least one child. |
| Degree of a Node | The number of children of that node. |
| Degree of a Tree | The maximum degree of any node in the tree. |
| Path | A sequence of connected nodes. |
| Depth | Number of edges from the root to a node. |
| Height | Number of edges on the longest path from the root to a leaf, under the common edge-based convention. |

### 3. Types of Trees

- General Tree
- Binary Tree
- Full Binary Tree
- Complete Binary Tree
- Perfect Binary Tree
- Balanced Binary Tree
- Binary Search Tree (BST)
- Threaded Binary Tree
- AVL Tree
- Heap

### 4. Binary Tree

A binary tree is a tree in which each node has at most two children. The two positions are called the left child and right child.

```
A
/ \
B C
/ \ \
D E F
```

Important Properties

- Maximum nodes at level i (root at level 0): 2^i.
- Maximum nodes in a binary tree of height h: 2^(h+1) − 1.
- A binary tree node may have zero, one or two children.

### 5. Representation of Binary Trees

5.1 Array Representation Array representation is especially useful for complete or nearly complete binary trees.

```
A
/ \
B C
/ \ / \
D E F G
1-based array:
Index: 1 2 3 4 5 6 7
Value: A B C D E F G
```

For 1-based indexing: Left child = 2i, Right child = 2i + 1, Parent = floor(i/2).

5.2 Linked Representation In linked representation, each node stores data and two pointers: one to the left child and one to the right child.

```
struct Node
{
int data;
struct Node *left;
struct Node *right;
};
```

- Advantages: dynamic allocation, no wasted array positions for sparse trees, natural for irregular trees.
- Disadvantage: additional memory is needed for pointers.

### 6. Tree Traversal

Tree traversal means visiting every node of a tree exactly once according to a specified order. The three fundamental depth-first traversals are preorder, inorder and postorder.

```
A
/ \
B C
/ \ / \
D E F G
```

| Traversal | Rule | Result |
|---|---|---|
| Preorder | Root → Left → Right (NLR) | A B D E C F G |
| Inorder | Left → Root → Right (LNR) | D B E A F C G |
| Postorder | Left → Right → Root (LRN) | D E B F G C A |

### 7. Preorder Traversal

Preorder visits the root before its left and right subtrees. It follows Root → Left → Right (NLR).

```
PREORDER(root)
if root = NULL
return
visit(root)
PREORDER(root.left)
PREORDER(root.right)
```

Applications include copying a tree, serialization and generating prefix expressions.

### 8. Inorder Traversal

Inorder visits the left subtree, then the root, then the right subtree. It follows Left → Root → Right (LNR).

```
INORDER(root)
if root = NULL
return
INORDER(root.left)
visit(root)
INORDER(root.right)
```

Important: Inorder traversal of a Binary Search Tree produces its keys in sorted ascending order.

### 9. Postorder Traversal

Postorder visits the left subtree, then the right subtree, and finally the root. It follows Left → Right → Root (LRN).

```
POSTORDER(root)
if root = NULL
return
POSTORDER(root.left)
POSTORDER(root.right)
visit(root)
```

Applications include deleting/freeing a tree, evaluating expression trees and generating postfix expressions.

### 10. Expression Trees

An expression tree represents operators as internal nodes and operands as leaf nodes.

```
For (A + B) * C:
*
/ \
+ C
/ \
A B
```

| Traversal | Expression Form |
|---|---|
| Preorder | * + A B C (Prefix) |
| Inorder | (A + B) * C (Infix) |
| Postorder | A B + C * (Postfix) |

### 11. Threaded Binary Tree

A threaded binary tree uses some NULL child pointers to store links to nodes that occur immediately before or after a node in a chosen traversal, most commonly inorder traversal. These links are called threads.

The main motivation is to perform traversal without recursion and without an auxiliary stack.

11.1 Inorder Threading

```
In an inorder-threaded tree:
- A NULL left pointer may point to the inorder predecessor.
- A NULL right pointer may point to the inorder successor.
```

Node Structure

```
struct Node
{
int data;
struct Node *left;
struct Node *right;
int leftThread;
int rightThread;
};
```

Inorder Traversal Pseudocode

```
THREAD_INORDER(root)
current = LEFTMOST(root)
while current != NULL
visit(current)
if current.rightThread = TRUE
current = current.right
else
current = LEFTMOST(current.right)
```

```
LEFTMOST(node)
if node = NULL
return NULL
while node.leftThread = FALSE
node = node.left
return node
```

- Advantages: traversal without recursion, no explicit stack, and useful reuse of otherwise NULL pointers.
- Disadvantages: insertion and deletion are more complicated and thread flags are required.

### 12. Binary Search Tree (BST)

A Binary Search Tree is a binary tree that maintains an ordering property: all keys in the left subtree are smaller than the node key, and all keys in the right subtree are larger than the node key.

```
/ \
30 70
/ \ / \
20 40 60 80
```

Thus: Left subtree < Root < Right subtree.

### 13. Searching in a BST

To search for a key, compare it with the current node. If the key is smaller, move left; if larger, move right; if equal, the key is found.

```
SEARCH(root, key)
if root = NULL
return NULL
if key = root.data
return root
if key < root.data
return SEARCH(root.left, key)
else
return SEARCH(root.right, key)
```

### 14. Insertion in a BST

Insertion follows the same comparisons used in searching. The new node is inserted at the appropriate NULL position.

```
INSERT(root, key)
if root = NULL
create new node
newNode.data = key
newNode.left = NULL
newNode.right = NULL
return newNode
```

```
if key < root.data
root.left = INSERT(root.left, key)
else if key > root.data
root.right = INSERT(root.right, key)
return root
```

### 15. Deletion in a BST

BST deletion has three important cases.

1. Leaf node: delete it directly.

2. Node with one child: connect the parent directly to the node's only child.

3. Node with two children: replace the node with its inorder successor (minimum value in the right subtree) or inorder predecessor, then delete the replacement node.

```
DELETE(root, key)
if root = NULL
return NULL
if key < root.data
root.left = DELETE(root.left, key)
else if key > root.data
root.right = DELETE(root.right, key)
else
if root.left = NULL AND root.right = NULL
delete root
return NULL
if root.left = NULL
temp = root.right
delete root
return temp
if root.right = NULL
temp = root.left
delete root
return temp
temp = MINIMUM(root.right)
root.data = temp.data
root.right = DELETE(root.right, temp.data)
return root
MINIMUM(root)
current = root
while current.left != NULL
current = current.left
return current
```

### 16. BST Complexity

| Operation | Balanced/Average | Worst Case (Skewed) |
|---|---|---|
| Search | O(log n) | O(n) |
| Insertion | O(log n) | O(n) |
| Deletion | O(log n) | O(n) |

A skewed BST can resemble a linked list. Balanced trees such as AVL trees and Red-Black trees help maintain better performance.

### 17. General Tree

A general tree is a tree in which a node can have any number of children.

```
A
/ | \
B C D
/ \ /|\
E F G H I
```

### 18. Conversion of General Tree to Binary Tree

The standard representation is the Left-Child Right-Sibling (LCRS) representation.

- The first child of a node becomes its left child in the binary representation.
- The next sibling of a node becomes its right child.
- Repeat the same rule for every node.

```
General tree:
A
/ | \
B C D
Binary representation:
A
/
B
\
C
\
D
```

For a larger example:

```
General tree:
A
/ | \
B C D
/ \ / \
E F G H
Left-child right-sibling representation:
```

```
A
/
B
/ \
E C
\ \
F D
/
G
\
H
```

Thus, A.left = B; B.right = C; C.right = D; B.left = E; E.right = F; D.left = G; and G.right = H.

Conversion Pseudocode

```
CONVERT_TO_BINARY(node)
if node = NULL
return NULL
create binaryNode
binaryNode.data = node.data
if node has children
binaryNode.left = CONVERT_TO_BINARY(first child)
current = first child
siblingBinary = binaryNode.left
while current has next sibling
current = next sibling
siblingBinary.right = CONVERT_TO_BINARY(current)
siblingBinary = siblingBinary.right
return binaryNode
```

### 19. Applications of Trees in Computer Science

| Application | Use of Trees |
|---|---|
| File Systems | Folders and subfolders form a hierarchy. |
| Databases | B-Trees and B+ Trees support efficient indexing. |
| Compilers | Parse trees, abstract syntax trees and expression trees represent program structure. |
| Artificial Intelligence | Decision trees support classification and decision- making. |
| Web Technologies | The HTML DOM is naturally represented as a tree. |
| Natural Language Processing | Parse trees represent grammatical structure. |
| Searching | BSTs and balanced trees maintain ordered data. |
| Heaps / Priority Queues | Binary heaps are tree-based structures used to implement priority queues. |
| Version Control | Tree structures can represent directory snapshots and hierarchical content. |

### 20. Comparison: General Tree vs Binary Tree vs BST

| Feature | General Tree | Binary Tree | BST |
|---|---|---|---|
| Maximum children | Any number | At most 2 | At most 2 |
| Left/right distinction | Not necessarily | Yes | Yes |
| Ordering required | No | No | Yes |
| Primary strength | Hierarchy | Binary hierarchical structure | Ordered searching |
| Typical search | Depends on structure | Depends on structure | Efficient when balanced |

### 21. Worked Example

Consider the BST:

```
/ \
30 70
/ \ / \
20 40 60 80
```

| Traversal | Output |
|---|---|
| Preorder | 50 30 20 40 70 60 80 |
| Inorder | 20 30 40 50 60 70 80 |
| Postorder | 20 40 30 60 80 70 50 |

The inorder result is sorted because the tree satisfies the BST ordering property.

### 22. Quick Revision Sheet

| Concept | Remember |
|---|---|
| Tree | Hierarchical non-linear data structure |
| Binary Tree | Maximum two children per node |
| Preorder | Root → Left → Right (NLR) |
| Inorder | Left → Root → Right (LNR) |
| Postorder | Left → Right → Root (LRN) |
| BST | Left < Root < Right |
| Threaded Tree | Uses NULL pointers as traversal threads |
| General → Binary | First Child → Left; Next Sibling → Right |
| Array BT, 1-based | Left = 2i; Right = 2i+1; Parent = floor(i/2) |
| Max nodes at level i | 2^i |
| Max nodes at height h | 2^(h+1) − 1 |

### 23. Exam-Oriented Questions

Short Answer Questions

4. Define a tree.

5. What is a root node?

6. Define a leaf node.

7. What is the degree of a node?

8. What is a binary tree?

9. Differentiate between a binary tree and a BST.

10. Define tree traversal.

11. What is inorder traversal?

12. What is a threaded binary tree?

13. What is an inorder successor?

14. Define Binary Search Tree.

15. What is a skewed binary tree?

16. What is a general tree?

17. Explain left-child right-sibling representation.

18. State two applications of trees.

Long Answer Questions

19. Explain tree terminology with a suitable diagram.

20. Explain array and linked representations of binary trees.

21. Explain preorder, inorder and postorder traversal with examples.

22. Write pseudocode for all three tree traversal techniques.

23. Explain threaded binary trees and their advantages.

24. Explain insertion, searching and deletion in a BST.

25. Explain the three cases of BST deletion.

26. Explain the conversion of a general tree into a binary tree.

27. Discuss applications of trees in computer science.

28. Compare general trees, binary trees and binary search trees.

### 24. Key Takeaways

- Trees are hierarchical, non-linear data structures.
- A binary tree has at most two children per node.
- Preorder, inorder and postorder are fundamental depth-first traversals.
- Inorder traversal of a BST gives sorted order.
- Threaded binary trees reduce the need for recursion or an explicit traversal stack.
- BST operations are efficient when the tree is reasonably balanced.
- A general tree can be represented as a binary tree using the left-child right-sibling technique.
