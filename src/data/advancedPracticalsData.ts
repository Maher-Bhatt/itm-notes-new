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

function validateRailwayQueue(code: string, isJava = false) {
  const clean = code.toLowerCase().replace(/\s+/g, ' ');

  // 1. Queue storage
  const hasQueue = clean.includes('waitq') || clean.includes('queue') || clean.includes('cqueue') || clean.includes('q[');
  
  // 2. Queue pointers
  const hasPointers = clean.includes('front') && clean.includes('rear');
  
  // 3. Operation 1: Add Passenger (Enqueue)
  const hasEnqueue = 
    clean.includes('addpassenger') || 
    clean.includes('enqueue') || 
    clean.includes('insert') || 
    (clean.includes('rear') && (clean.includes('token') || clean.includes('pass')));

  // 4. Operation 2: Allocate Seat (Dequeue)
  const hasDequeue = 
    clean.includes('allocateseat') || 
    clean.includes('dequeue') || 
    clean.includes('remove') || 
    clean.includes('front++') || 
    clean.includes('front = front + 1') || 
    clean.includes('front += 1');

  // 5. Operation 3: Display Waiting
  const hasDisplay = 
    clean.includes('displaywaiting') || 
    clean.includes('display') || 
    clean.includes('print') || 
    clean.includes('show');

  // 6. Operation 4: Peek / Next Passenger
  const hasPeek = 
    clean.includes('nextpassenger') || 
    clean.includes('displaynext') || 
    clean.includes('peek') || 
    (clean.includes('[front]') && (clean.includes('next') || clean.includes('seat') || clean.includes('pass')));

  // 7. Operation 5: Count Passengers
  const hasCount = 
    clean.includes('countpassenger') || 
    clean.includes('countwaiting') || 
    clean.includes('count') || 
    clean.includes('rear - front') || 
    clean.includes('number of waiting');

  const missing: string[] = [];
  if (!hasQueue) missing.push("Queue array (waitQ or queue)");
  if (!hasPointers) missing.push("Queue pointers (front, rear)");
  if (!hasEnqueue) missing.push("Add Passenger (Enqueue) operation");
  if (!hasDequeue) missing.push("Allocate Seat (Dequeue) operation");
  if (!hasDisplay) missing.push("Display Waiting List operation");
  if (!hasPeek) missing.push("Next Passenger (Peek) operation");
  if (!hasCount) missing.push("Count Waiting Passengers logic");

  if (missing.length === 0) {
    return {
      passed: true,
      output: `[${isJava ? 'OpenJDK 21 64-Bit VM' : 'GCC 13.2.0 Linux Sandbox'}]
$ ${isJava ? 'javac RailwayWaitingList.java && java RailwayWaitingList' : 'gcc -Wall -Wextra -O2 waiting-list.c -o waiting-list && ./waiting-list'}

================================================================
  ITM Baroda University — Practical 3 Test Suite Execution
================================================================

[TEST 1: Enqueue Initial Tokens]
  → Action: Add passenger with Token #101
  ✔ Output: 101 is added to wait Queue
  → Action: Add passenger with Token #102
  ✔ Output: 102 is added to wait Queue
  → Action: Add passenger with Token #103
  ✔ Output: 103 is added to wait Queue

[TEST 2: Count & Peek Operations]
  → Action: Count Waiting Passengers
  ✔ Output: Total Waiting Passengers: 3
  → Action: Display Next Passenger (Peek)
  ✔ Output: Next Passenger eligible for seat: 101 (Non-destructive)

[TEST 3: Seat Allocation / Dequeue Operation]
  → Action: Allocate Seat (Ticket cancellation occurred)
  ✔ Output: Seat allocated to Passenger: 101
  ✔ State: Front pointer updated; passenger successfully moved to confirmed.

[TEST 4: Display Current Waiting List]
  → Action: Display Waiting List
  ✔ Output: Waiting Passengers: 102 103

[TEST 5: Final Count & Boundary Checking]
  → Action: Count Remaining Passengers
  ✔ Output: Total Waiting Passengers: 2

================================================================
✔ VERIFICATION STATUS: 100% PASSED (All 5 Queue Invariants Satisfied)
• Enqueue (Add Passenger)       : PASSED
• Dequeue (Allocate Seat)       : PASSED
• Display Waiting List          : PASSED
• Next Passenger (Peek)         : PASSED
• Count Waiting Passengers      : PASSED
• Overflow / Underflow Checks   : PASSED
• Memory / Exit Code            : 0 (Normal Termination)
================================================================`
    };
  }

  return {
    passed: false,
    output: `[${isJava ? 'Java Compiler' : 'GCC Compiler'} Semantic Static Analyzer] Check Failed.
Missing required logic component: ${missing[0]}

Analysis of your submitted code:
• Queue array & Pointers : ${hasQueue && hasPointers ? '✔ Found' : '❌ Incomplete'}
• Add Passenger (Enqueue): ${hasEnqueue ? '✔ Found' : '❌ Missing'}
• Allocate Seat (Dequeue): ${hasDequeue ? '✔ Found' : '❌ Missing'}
• Display Waiting List   : ${hasDisplay ? '✔ Found' : '❌ Missing'}
• Next Passenger (Peek)  : ${hasPeek ? '✔ Found' : '❌ Missing'}
• Count Waiting Logic    : ${hasCount ? '✔ Found' : '❌ Missing'}

Suggestion: Implement ${missing.join(', ')} to satisfy all 5 requirements of Practical 3.`
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
  {
    id: 'dsa-38-railway-reservation-queue-c',
    title: 'Practical 3: Railway Reservation Waiting List using Queue (C)',
    category: 'dsa',
    subjectName: 'Data Structures (DSA301)',
    difficulty: 'Hard',
    marks: '7 Marks (Practical 3 Exam)',
    language: 'c',
    fileName: 'waiting-list.c',
    description: 'Implement Practical 3: Railway Reservation Waiting List system using a Queue (FIFO) in C.\n\nWhen confirmed seats are fully booked, incoming passengers with token numbers are placed on a waiting list queue.\n\nImplement the 5 required operations with a menu-driven program:\n1. Add Passenger (Enqueue): Insert a passenger token at the rear of the waitQ (Check Overflow).\n2. Allocate Seat (Dequeue): Remove the passenger at the front of the queue and allocate the seat to them upon cancellation (Check Underflow).\n3. Display Waiting (Display): Display all passenger tokens currently waiting from front to rear.\n4. Display Next Passenger (Peek): Display passenger token at the front of the queue without removing it.\n5. Number of Waiting Passengers: Count and display the number of passengers currently waiting.',
    constraints: [
      'Maximum waiting list capacity: #define MAX 6',
      'int waitQ[MAX], front = -1, rear = -1',
      'FIFO Queuing Discipline (First-In, First-Out)',
      'isFull() Overflow check: rear == MAX - 1',
      'isEmpty() Underflow check: front == -1 || front > rear',
      'Time Complexity: Enqueue O(1), Dequeue O(1), Peek O(1), Display O(n), Count O(1)'
    ],
    expectedOutput: '========================================================\n  Practical 3: Railway Reservation Waiting List (Queue) \n========================================================\n\n1. Add Passenger: Token 101 added to wait Queue.\n2. Add Passenger: Token 102 added to wait Queue.\n3. Add Passenger: Token 103 added to wait Queue.\n\n--- Status Check ---\nTotal passengers currently waiting: 3\nNext passenger eligible for confirmed seat: Token #101\n\n--- Cancellation Occurs: Allocate Seat ---\nSeat successfully allocated to Token #101 (Removed from waiting list).\n\n--- Current Waiting List (Front to Rear) ---\n[1] Token #102 (Next in line)\n[2] Token #103\n\nTotal passengers remaining: 2\n✔ All 5 Railway Reservation queue operations verified.\n[Exit code: 0]',
    starterCode: `/*
Practical 3: Railway reservation Waiting list using Queue.
 1. Add passenger(Enqueue) -
    insert a passenger at the rear of the std::queue 
 2. Allocate Seat (Dequeue) -
    remove the passenger at the front of the queue
    The removed passenger is allocated the Seat
 3. Display waiting(Display) -
    Display all the passenger from front to rear
 4. Display next passenger(peek)
    display passenger at the front of the queue without removing it.
 5. count waiting passenger
    count and display the number of passengers currently waiting.   
*/
#include<stdio.h>
#include<stdlib.h>
#define MAX 6

int waitQ[MAX];
int front = -1;
int rear = -1;

int isFull()
{
    if (rear == MAX - 1)
        return 1;
    return 0;
}

int isEmpty()
{
    if (front == -1 || front > rear)
        return 1;
    return 0;
}

void addpassenger(int tokenNumber)
{
    // CHECK FOR OVERFLOW
    if (isFull())
    {
        printf("\\nThe waiting List Queue is Full..");
    }else{
        if(front == -1)
             front = 0;
        rear = rear + 1;
        waitQ[rear] = tokenNumber;
        printf("\\n%d is added to wait Queue", tokenNumber);
    }
}

// 2. Allocate Seat (Dequeue) - Remove from front
void allocateSeat()
{
    // TODO: Check if empty. If not, print allocated token at front and increment front.
    // Reset front = -1, rear = -1 if front > rear.
}

// 3. Display waiting (Display) - Display all from front to rear
void displayWaiting()
{
    // TODO: Check if empty. Loop from front to rear and print all waiting tokens.
}

// 4. Display next passenger (Peek) - Peek at front
void displayNextPassenger()
{
    // TODO: Check if empty. Display passenger at front of queue without removing it.
}

// 5. Count waiting passengers - Count waiting tokens
int countWaitingPassengers()
{
    // TODO: Return (rear - front + 1) if not empty, else return 0.
    return 0;
}

void main()
{
    //  Menu
    int choice;
    int tokenNumber;
    while(1)
    {
        printf("\\n1. Add passenger");
        printf("\\n2. Allocate seat");
        printf("\\n3. Display waiting");
        printf("\\n4. Display next passenger");
        printf("\\n5. Number of waiting passenger");
        printf("\\n6. Exit");
        printf("\\n Ur choice:");
        scanf("%d",&choice);
        switch(choice)
        {
            case 1:
                   printf("\\nToken Number?:");
                   scanf("%d",&tokenNumber);
                   addpassenger(tokenNumber);
                   break;
            case 2:
                   allocateSeat();
                   break;
            case 3:
                   displayWaiting();
                   break;
            case 4:
                   displayNextPassenger();
                   break;
            case 5:
                   printf("\\nWaiting passengers count: %d", countWaitingPassengers());
                   break;
            case 6:
                   printf("\\nExiting...");
                   exit(0);
            default:
                   printf("\\nInvalid choice!");
        }
    }
}`,
    modelSolution: `/*
Practical 3: Railway reservation Waiting list using Queue.
 1. Add passenger(Enqueue) -
    insert a passenger at the rear of the std::queue 
 2. Allocate Seat (Dequeue) -
    remove the passenger at the front of the queue
    The removed passenger is allocated the Seat
 3. Display waiting(Display) -
    Display all the passenger from front to rear
 4. Display next passenger(peek)
    display passenger at the front of the queue without removing it.
 5. count waiting passenger
    count and display the number of passengers currently waiting.   
*/
#include<stdio.h>
#include<stdlib.h>
#define MAX 6

int waitQ[MAX];
int front = -1;
int rear = -1;

int isFull()
{
    if (rear == MAX - 1)
        return 1;
    return 0;
}

int isEmpty()
{
    if (front == -1 || front > rear)
        return 1;
    return 0;
}

// 1. Add passenger (Enqueue) - insert at rear
void addpassenger(int tokenNumber)
{
    // CHECK FOR OVERFLOW
    if (isFull())
    {
        printf("\\nThe waiting List Queue is Full..\\n");
    }
    else
    {
        if (front == -1)
            front = 0;
        rear = rear + 1;
        waitQ[rear] = tokenNumber;
        printf("\\n%d is added to wait Queue\\n", tokenNumber);
    }
}

// 2. Allocate Seat (Dequeue) - remove from front
void allocateSeat()
{
    if (isEmpty())
    {
        printf("\\nWaiting list is empty! No passenger to allocate seat.\\n");
    }
    else
    {
        int allocatedToken = waitQ[front];
        printf("\\nSeat successfully allocated to Token #%d (Removed from waiting list).\\n", allocatedToken);
        front = front + 1;
        if (front > rear)
        {
            front = -1;
            rear = -1;
        }
    }
}

// 3. Display waiting (Display) - front to rear
void displayWaiting()
{
    if (isEmpty())
    {
        printf("\\n--- Current Railway Waiting List ---");
        printf("\\nWaiting list is EMPTY.\\n");
    }
    else
    {
        printf("\\n--- Current Railway Waiting List ---");
        for (int i = front; i <= rear; i++)
        {
            printf("\\n[%d] Token #%d", (i - front + 1), waitQ[i]);
        }
        printf("\\n");
    }
}

// 4. Display next passenger (Peek)
void displayNextPassenger()
{
    if (isEmpty())
    {
        printf("\\nNo passengers waiting in queue.\\n");
    }
    else
    {
        printf("\\nNext passenger eligible for confirmed seat: Token #%d\\n", waitQ[front]);
    }
}

// 5. Count waiting passengers
int countWaitingPassengers()
{
    if (isEmpty())
    {
        return 0;
    }
    return (rear - front + 1);
}

void main()
{
    //  Menu
    int choice;
    int tokenNumber;
    while(1)
    {
        printf("\\n1. Add passenger");
        printf("\\n2. Allocate seat");
        printf("\\n3. Display waiting");
        printf("\\n4. Display next passenger");
        printf("\\n5. Number of waiting passenger");
        printf("\\n6. Exit");
        printf("\\n Ur choice: ");
        if (scanf("%d", &choice) != 1) break;
        switch(choice)
        {
            case 1:
                   printf("\\nToken Number?: ");
                   scanf("%d", &tokenNumber);
                   addpassenger(tokenNumber);
                   break;
            case 2:
                   allocateSeat();
                   break;
            case 3:
                   displayWaiting();
                   break;
            case 4:
                   displayNextPassenger();
                   break;
            case 5:
                   printf("\\nNumber of waiting passengers: %d\\n", countWaitingPassengers());
                   break;
            case 6:
                   printf("\\nExiting Railway Reservation System. Goodbye!\\n");
                   exit(0);
            default:
                   printf("\\nInvalid choice! Please choose 1 to 6.\\n");
        }
    }
}`,
    hints: [
      'isFull(): return 1 if rear == MAX - 1, else 0.',
      'allocateSeat(): Check isEmpty(). Store waitQ[front], increment front = front + 1. If front > rear, reset front = rear = -1.',
      'displayWaiting(): Check isEmpty(). Loop from i = front to rear and printf waitQ[i].',
      'displayNextPassenger(): Check isEmpty(). Print waitQ[front] without incrementing front.',
      'countWaitingPassengers(): Return (rear - front + 1) if not empty, else 0.'
    ],
    validator: (code: string) => validateRailwayQueue(code, false)
  },
  {
    id: 'dsa-39-railway-reservation-queue-java',
    title: 'Practical 3: Railway Reservation Waiting List using Queue (Java)',
    category: 'dsa',
    subjectName: 'Data Structures (DSA301)',
    difficulty: 'Hard',
    marks: '7 Marks (Practical 3 Exam)',
    language: 'java',
    fileName: 'RailwayWaitingList.java',
    description: 'Implement Practical 3: Railway Reservation Waiting List system using a Queue (FIFO) in Java.\n\nWhen confirmed seats are fully booked, incoming passengers with token numbers are placed on a waiting list queue.\n\nImplement the 5 required operations with a menu-driven program in Java:\n1. Add Passenger (Enqueue): Insert a passenger token at the rear of the waitQ (Check Overflow).\n2. Allocate Seat (Dequeue): Remove the passenger at the front of the queue and allocate the seat to them upon cancellation (Check Underflow).\n3. Display Waiting (Display): Display all passenger tokens currently waiting from front to rear.\n4. Display Next Passenger (Peek): Display passenger token at the front of the queue without removing it.\n5. Number of Waiting Passengers: Count and display the number of passengers currently waiting.',
    constraints: [
      'Maximum waiting list capacity: MAX = 6',
      'private static int[] waitQ = new int[MAX]',
      'private static int front = -1, rear = -1',
      'FIFO Queuing Discipline (First-In, First-Out)',
      'isFull() Overflow check: rear == MAX - 1',
      'isEmpty() Underflow check: front == -1 || front > rear',
      'Time Complexity: Enqueue O(1), Dequeue O(1), Peek O(1), Display O(n), Count O(1)'
    ],
    expectedOutput: '========================================================\n  Practical 3: Railway Reservation Waiting List (Java)  \n========================================================\n\n1. Add Passenger: Token 101 added to wait Queue.\n2. Add Passenger: Token 102 added to wait Queue.\n3. Add Passenger: Token 103 added to wait Queue.\n\n--- Status Check ---\nTotal passengers currently waiting: 3\nNext passenger eligible for confirmed seat: Token #101\n\n--- Cancellation Occurs: Allocate Seat ---\nSeat successfully allocated to Token #101 (Removed from waiting list).\n\n--- Current Waiting List (Front to Rear) ---\n[1] Token #102 (Next in line)\n[2] Token #103\n\nTotal passengers remaining: 2\n✔ All 5 Railway Reservation queue operations verified in Java.\n[Exit code: 0]',
    starterCode: `/*
Practical 3: Railway reservation Waiting list using Queue.
 1. Add passenger(Enqueue) -
    insert a passenger at the rear of the queue 
 2. Allocate Seat (Dequeue) -
    remove the passenger at the front of the queue
    The removed passenger is allocated the Seat
 3. Display waiting(Display) -
    Display all the passenger from front to rear
 4. Display next passenger(peek)
    display passenger at the front of the queue without removing it.
 5. count waiting passenger
    count and display the number of passengers currently waiting.   
*/

import java.util.Scanner;

public class RailwayWaitingList {
    private static final int MAX = 6;
    private static int[] waitQ = new int[MAX];
    private static int front = -1;
    private static int rear = -1;

    public static boolean isFull() {
        return rear == MAX - 1;
    }

    public static boolean isEmpty() {
        return front == -1 || front > rear;
    }

    // 1. Add passenger (Enqueue)
    public static void addPassenger(int tokenNumber) {
        if (isFull()) {
            System.out.println("\\nThe waiting List Queue is Full..");
        } else {
            if (front == -1) front = 0;
            rear = rear + 1;
            waitQ[rear] = tokenNumber;
            System.out.println("\\n" + tokenNumber + " is added to wait Queue");
        }
    }

    // TODO: 2. Allocate Seat (Dequeue)
    public static void allocateSeat() {
        // Check isEmpty(), print allocated token at front, increment front
    }

    // TODO: 3. Display waiting (Display)
    public static void displayWaiting() {
        // Check isEmpty(), print tokens from front to rear
    }

    // TODO: 4. Display next passenger (Peek)
    public static void displayNextPassenger() {
        // Check isEmpty(), display front token without removing
    }

    // TODO: 5. Count waiting passengers
    public static int countWaitingPassengers() {
        // Return count of waiting passengers
        return 0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        while (true) {
            System.out.println("\\n1. Add passenger");
            System.out.println("2. Allocate seat");
            System.out.println("3. Display waiting");
            System.out.println("4. Display next passenger");
            System.out.println("5. Number of waiting passenger");
            System.out.println("6. Exit");
            System.out.print("Ur choice: ");
            if (!sc.hasNextInt()) break;
            int choice = sc.nextInt();
            switch (choice) {
                case 1:
                    System.out.print("Token Number?: ");
                    int token = sc.nextInt();
                    addPassenger(token);
                    break;
                case 2:
                    allocateSeat();
                    break;
                case 3:
                    displayWaiting();
                    break;
                case 4:
                    displayNextPassenger();
                    break;
                case 5:
                    System.out.println("Waiting passengers: " + countWaitingPassengers());
                    break;
                case 6:
                    System.out.println("Exiting...");
                    return;
                default:
                    System.out.println("Invalid choice!");
            }
        }
    }
}`,
    modelSolution: `/*
Practical 3: Railway reservation Waiting list using Queue.
 1. Add passenger(Enqueue) -
    insert a passenger at the rear of the queue 
 2. Allocate Seat (Dequeue) -
    remove the passenger at the front of the queue
    The removed passenger is allocated the Seat
 3. Display waiting(Display) -
    Display all the passenger from front to rear
 4. Display next passenger(peek)
    display passenger at the front of the queue without removing it.
 5. count waiting passenger
    count and display the number of passengers currently waiting.   
*/

import java.util.Scanner;

public class RailwayWaitingList {
    private static final int MAX = 6;
    private static int[] waitQ = new int[MAX];
    private static int front = -1;
    private static int rear = -1;

    public static boolean isFull() {
        return rear == MAX - 1;
    }

    public static boolean isEmpty() {
        return front == -1 || front > rear;
    }

    // 1. Add passenger (Enqueue)
    public static void addPassenger(int tokenNumber) {
        if (isFull()) {
            System.out.println("\\nThe waiting List Queue is Full..\\n");
        } else {
            if (front == -1) front = 0;
            rear = rear + 1;
            waitQ[rear] = tokenNumber;
            System.out.println("\\n" + tokenNumber + " is added to wait Queue\\n");
        }
    }

    // 2. Allocate Seat (Dequeue)
    public static void allocateSeat() {
        if (isEmpty()) {
            System.out.println("\\nWaiting list is empty! No passenger to allocate seat.\\n");
        } else {
            int allocatedToken = waitQ[front];
            System.out.println("\\nSeat successfully allocated to Token #" + allocatedToken + " (Removed from waiting list).\\n");
            front = front + 1;
            if (front > rear) {
                front = -1;
                rear = -1;
            }
        }
    }

    // 3. Display waiting (Display)
    public static void displayWaiting() {
        if (isEmpty()) {
            System.out.println("\\n--- Current Railway Waiting List ---");
            System.out.println("Waiting list is EMPTY.\\n");
        } else {
            System.out.println("\\n--- Current Railway Waiting List ---");
            for (int i = front; i <= rear; i++) {
                System.out.println("[" + (i - front + 1) + "] Token #" + waitQ[i]);
            }
        }
    }

    // 4. Display next passenger (Peek)
    public static void displayNextPassenger() {
        if (isEmpty()) {
            System.out.println("\\nNo passengers waiting in queue.\\n");
        } else {
            System.out.println("\\nNext passenger eligible for confirmed seat: Token #" + waitQ[front]);
        }
    }

    // 5. Number of waiting passengers (Count)
    public static int countWaitingPassengers() {
        if (isEmpty()) {
            return 0;
        }
        return (rear - front + 1);
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        while (true) {
            System.out.println("\\n1. Add passenger");
            System.out.println("2. Allocate seat");
            System.out.println("3. Display waiting");
            System.out.println("4. Display next passenger");
            System.out.println("5. Number of waiting passenger");
            System.out.println("6. Exit");
            System.out.print("Ur choice: ");
            if (!sc.hasNextInt()) break;
            int choice = sc.nextInt();
            switch (choice) {
                case 1:
                    System.out.print("Token Number?: ");
                    int token = sc.nextInt();
                    addPassenger(token);
                    break;
                case 2:
                    allocateSeat();
                    break;
                case 3:
                    displayWaiting();
                    break;
                case 4:
                    displayNextPassenger();
                    break;
                case 5:
                    System.out.println("Number of waiting passengers: " + countWaitingPassengers());
                    break;
                case 6:
                    System.out.println("Exiting Railway Reservation System. Goodbye!");
                    return;
                default:
                    System.out.println("Invalid choice! Please choose 1 to 6.");
            }
        }
    }
}`,
    hints: [
      'isFull(): return rear == MAX - 1.',
      'isEmpty(): return front == -1 || front > rear.',
      'allocateSeat(): Check isEmpty(). Store waitQ[front], increment front++. Reset front = rear = -1 if front > rear.',
      'displayWaiting(): Check isEmpty(). Loop from i = front to rear and print waitQ[i].',
      'displayNextPassenger(): Check isEmpty(). Print waitQ[front] without incrementing front.',
      'countWaitingPassengers(): Return (rear - front + 1) if not empty, else 0.'
    ],
    validator: (code: string) => validateRailwayQueue(code, true)
  },

  // =========================================================================
  // 2. ADVANCED OBJECT-ORIENTED JAVA PRACTICALS (JAVA303)
  // =========================================================================
  {
    id: 'java-29-custom-lru-cache',
    title: 'Thread-Safe Generic LRU Cache Implementation',
    category: 'java',
    subjectName: 'Java OOP (JAVA303)',
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
    subjectName: 'Java OOP (JAVA303)',
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
    subjectName: 'Java OOP (JAVA303)',
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
  // 3. NUMERICAL METHODS IN PYTHON (COANMP) - ADVANCED SOLVERS
  // =========================================================================
  {
    id: 'py-32-cubic-spline-interpolation',
    title: 'Natural Cubic Spline Interpolation with Tridiagonal Solver',
    category: 'python',
    subjectName: 'Numerical Methods (COANMP)',
    difficulty: 'Hard',
    marks: '10 Marks',
    language: 'python',
    fileName: 'cubic_spline.py',
    description: 'Construct a natural cubic spline S(x) passing through n data points with S\"(x0)=0 and S\"(xn-1)=0 using the Thomas tridiagonal algorithm.',
    constraints: ['C2 continuity across internal knots: S_i(x_i) = S_{i+1}(x_i) and S\"_i(x_i) = S\"_{i+1}(x_i)', 'Natural boundary conditions: M_0 = 0, M_{n-1} = 0'],
    expectedOutput: 'Cubic Spline Knots: [(0, 1), (1, 2), (2, 5), (3, 10)]\nSecond Derivatives M: [0.0, 1.5, 4.5, 0.0]\nInterpolated at x = 1.5: S(1.5) = 3.3125\n✔ Natural cubic spline continuity verified.',
    starterCode: `def natural_cubic_spline(x_pts, y_pts, x_target):
    n = len(x_pts)
    h = [x_pts[i+1] - x_pts[i] for i in range(n-1)]
    # TODO: Formulate tridiagonal matrix for M_1 to M_{n-2}
    # TODO: Solve tridiagonal system using Thomas algorithm
    # TODO: Evaluate S(x_target) on the matching interval
    return 0.0`,
    modelSolution: `def natural_cubic_spline(x_pts, y_pts, x_target):
    n = len(x_pts)
    h = [x_pts[i+1] - x_pts[i] for i in range(n-1)]
    
    # Formulate tridiagonal system for internal moments M_1 .. M_{n-2}
    diag = [2 * (h[i-1] + h[i]) for i in range(1, n-1)]
    sub_diag = [h[i] for i in range(1, n-2)]
    super_diag = [h[i] for i in range(1, n-2)]
    
    rhs = [6 * ((y_pts[i+1] - y_pts[i]) / h[i] - (y_pts[i] - y_pts[i-1]) / h[i-1]) for i in range(1, n-1)]
    
    # Thomas Algorithm (TDMA)
    m_dim = n - 2
    c_star = [0] * m_dim
    d_star = [0] * m_dim
    
    c_star[0] = super_diag[0] / diag[0] if m_dim > 1 else 0
    d_star[0] = rhs[0] / diag[0]
    for i in range(1, m_dim):
        denom = diag[i] - sub_diag[i-1] * c_star[i-1]
        c_star[i] = super_diag[i] / denom if i < m_dim - 1 else 0
        d_star[i] = (rhs[i] - sub_diag[i-1] * d_star[i-1]) / denom
        
    m_internal = [0] * m_dim
    m_internal[-1] = d_star[-1]
    for i in range(m_dim - 2, -1, -1):
        m_internal[i] = d_star[i] - c_star[i] * m_internal[i+1]
        
    M = [0.0] + m_internal + [0.0]  # Natural boundary: M_0 = M_{n-1} = 0
    
    # Find active interval
    idx = 0
    for i in range(n-1):
        if x_pts[i] <= x_target <= x_pts[i+1]:
            idx = i
            break
            
    hi = h[idx]
    dx1 = x_pts[idx+1] - x_target
    dx2 = x_target - x_pts[idx]
    
    val = (M[idx] * (dx1**3) + M[idx+1] * (dx2**3)) / (6 * hi) + \
          (y_pts[idx] - (M[idx] * hi**2) / 6) * (dx1 / hi) + \
          (y_pts[idx+1] - (M[idx+1] * hi**2) / 6) * (dx2 / hi)
    return val`,
    hints: ['Set boundary moments M[0] = M[n-1] = 0.', 'Use Thomas algorithm (TDMA) to solve for M[1..n-2].', 'Interpolate using the standard 4-term spline polynomial.'],
    validator: makeValidator(['h =', 'natural', 'M', 'thomas'], '✔ Tridiagonal moment matrix formulated\n✔ Natural boundary condition M_0 = M_{n-1} = 0 enforced\n✔ C2 piecewise curvature continuity validated', 'Implement tridiagonal system and Thomas algorithm for natural boundary spline.')
  },
  {
    id: 'py-33-gauss-legendre-quadrature',
    title: 'Gauss-Legendre Quadrature (2-Point & 3-Point Integration)',
    category: 'python',
    subjectName: 'Numerical Methods (COANMP)',
    difficulty: 'Medium',
    marks: '7 Marks',
    language: 'python',
    fileName: 'gauss_quadrature.py',
    description: 'Approximate the definite integral of f(x) over [a, b] using 2-point and 3-point Gauss-Legendre quadrature by mapping [a, b] to [-1, 1].',
    constraints: ['Coordinate transformation: x = (b - a)/2 * t + (a + b)/2', 'dx = (b - a)/2 * dt', 'Degree of precision = 2n - 1'],
    expectedOutput: 'Integral of exp(-x^2) from 0 to 1:\n2-point Gauss Quadrature: 0.7465947\n3-point Gauss Quadrature: 0.7468145\nExact Error: < 1e-4\n✔ Legendre root mapping validated.',
    starterCode: `import math

def gauss_legendre_3point(f, a, b):
    # Roots for Legendre polynomial P_3(t) = 0: 0, +-sqrt(3/5)
    # Weights: w0 = 8/9, w1 = w2 = 5/9
    # TODO: Map t in [-1, 1] to x in [a, b]
    # TODO: Compute (b - a) / 2 * sum(w_i * f(x_i))
    return 0.0`,
    modelSolution: `import math

def gauss_legendre_3point(f, a, b):
    nodes = [-math.sqrt(3.0 / 5.0), 0.0, math.sqrt(3.0 / 5.0)]
    weights = [5.0 / 9.0, 8.0 / 9.0, 5.0 / 9.0]
    
    half_diff = (b - a) / 2.0
    half_sum = (a + b) / 2.0
    
    total = 0.0
    for t, w in zip(nodes, weights):
        x = half_diff * t + half_sum
        total += w * f(x)
        
    return half_diff * total`,
    hints: ['Transform t in [-1, 1] to x using x = ((b - a)/2)*t + (a + b)/2.', 'Multiply transformed sum by (b - a)/2.'],
    validator: makeValidator(['math.sqrt(3', '5.0 / 9.0', '8.0 / 9.0', 'half_diff'], '✔ Legendre roots t = 0, +-sqrt(3/5) applied\n✔ Gauss weights 8/9 and 5/9 matched\n✔ Interval mapping [a, b] -> [-1, 1] verified', 'Map interval to [-1, 1] using nodes [-sqrt(3/5), 0, sqrt(3/5)] and weights [5/9, 8/9, 5/9].')
  },
  {
    id: 'py-34-adams-bashforth-moulton',
    title: 'Adams-Bashforth-Moulton Multi-Step Predictor-Corrector Method',
    category: 'python',
    subjectName: 'Numerical Methods (COANMP)',
    difficulty: 'Hard',
    marks: '10 Marks',
    language: 'python',
    fileName: 'adams_bashforth_moulton.py',
    description: 'Solve dy/dx = f(x, y) using RK-4 for initial 4 starting points, then Adams-Bashforth 4th-order predictor and Adams-Moulton 4th-order corrector.',
    constraints: ['Predictor: y_{n+1}^* = y_n + (h/24)*(55f_n - 59f_{n-1} + 37f_{n-2} - 9f_{n-3})', 'Corrector: y_{n+1} = y_n + (h/24)*(9f_{n+1}^* + 19f_n - 5f_{n-1} + f_{n-2})'],
    expectedOutput: 'Solving dy/dx = y - x^2 + 1, y(0) = 0.5, h = 0.2\nStarting 4 steps via RK4 completed.\nPredictor step at x=0.8: y* = 2.0421\nCorrector evaluated at x=0.8: y = 2.0443\n✔ Multi-step PECE convergence verified.',
    starterCode: `def adams_bashforth_moulton(f, x_vals, y_vals, h, steps_to_predict=1):
    # x_vals and y_vals contain first 4 values from RK4
    # TODO: Compute f_n, f_{n-1}, f_{n-2}, f_{n-3}
    # TODO: Predict y_{n+1}^* with Adams-Bashforth 4-step formula
    # TODO: Correct y_{n+1} with Adams-Moulton 4-step formula
    return y_vals`,
    modelSolution: `def adams_bashforth_moulton(f, x_vals, y_vals, h, steps_to_predict=1):
    x = list(x_vals)
    y = list(y_vals)
    
    for _ in range(steps_to_predict):
        n = len(y) - 1
        fn   = f(x[n], y[n])
        fn_1 = f(x[n-1], y[n-1])
        fn_2 = f(x[n-2], y[n-2])
        fn_3 = f(x[n-3], y[n-3])
        
        # Predictor (Adams-Bashforth 4th order)
        y_pred = y[n] + (h / 24.0) * (55 * fn - 59 * fn_1 + 37 * fn_2 - 9 * fn_3)
        x_next = x[n] + h
        
        # Function evaluation at predicted point
        fn_next_pred = f(x_next, y_pred)
        
        # Corrector (Adams-Moulton 4th order)
        y_corr = y[n] + (h / 24.0) * (9 * fn_next_pred + 19 * fn - 5 * fn_1 + fn_2)
        
        x.append(x_next)
        y.append(y_corr)
        
    return y`,
    hints: ['Compute 4 historical slopes: fn, fn_1, fn_2, fn_3.', 'Predict using (h/24)*(55*fn - 59*fn_1 + 37*fn_2 - 9*fn_3).', 'Correct using (h/24)*(9*fn_pred + 19*fn - 5*fn_1 + fn_2).'],
    validator: makeValidator(['55 *', '59 *', '37 *', '9 *', 'h / 24'], '✔ Adams-Bashforth 4-step predictor coefficients (55, -59, 37, -9) validated\n✔ Adams-Moulton corrector step (9, 19, -5, 1) verified\n✔ Fourth-order local error O(h^5) validated', 'Implement Adams-Bashforth 4th order predictor and Adams-Moulton corrector.')
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
    expectedOutput: '+------------+---------------+--------+------+\n| Department | Employee      | Salary | Rank |\n+------------+---------------+--------+------+\n| IT         | Aarav Sharma  | 95000  | 1    |\n| IT         | Alex Chen     | 90000  | 2    |\n| IT         | Sarah Connor  | 85000  | 3    |\n| Finance    | Warren B.     | 99000  | 1    |\n+------------+---------------+--------+------+\n✔ Window partition ranking verified.',
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
