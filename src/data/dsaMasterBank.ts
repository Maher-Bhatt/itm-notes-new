/**
 * ITM University - Master Solved Question Bank: Data Structures & Algorithms (DSA)
 * Subject Code: C2310C5 / DSA301 · Semester 3
 * 
 * Modeled strictly after the 30-Page University Master Standard:
 * - Part A: 5 Predict-Output & Pointer/Tree Execution Traces
 * - Part B: 15 5-Mark Programming Implementations with Concept, Executable C Code, Output & Viva Traps
 * - Part C: 18 3-Mark Theory Answers with Comparative Matrices (3+ Rows) and Architectural Diagrams
 * - Part D: University Exam Blueprint, 6 Fatal Mistakes, 16-Row Quick Revision Matrix & 10 Quick MCQs
 */

import {
  PredictOutputItem,
  LongAnswerQuestion,
  TheoryQuestion,
  McqRevisionItem,
  QuickMcq,
} from './oopjQuestionBank';

// ─────────────────────────────────────────────────────────────────────────────
// PART A: PREDICT THE OUTPUT & POINTER/TREE EXECUTION TRACES (5 Questions)
// ─────────────────────────────────────────────────────────────────────────────
export const DSA_PREDICT_OUTPUT: PredictOutputItem[] = [
  {
    id: 'dsa-pred-1',
    programNumber: 1,
    title: 'Circular Queue Modulo Index Arithmetic & Pointer Wrap-Around',
    code: `#include <stdio.h>
#define SIZE 5

int queue[SIZE];
int front = -1, rear = -1;

void enqueue(int val) {
    if ((rear + 1) % SIZE == front) {
        printf("Overflow! ");
        return;
    }
    if (front == -1) front = 0;
    rear = (rear + 1) % SIZE;
    queue[rear] = val;
    printf("[%d@idx%d] ", val, rear);
}

int dequeue() {
    if (front == -1) return -1;
    int val = queue[front];
    if (front == rear) front = rear = -1;
    else front = (front + 1) % SIZE;
    return val;
}

int main() {
    enqueue(10); enqueue(20); enqueue(30); enqueue(40); enqueue(50);
    enqueue(60); // Check 6th
    printf("\\nDequeued: %d %d\\n", dequeue(), dequeue());
    enqueue(70); enqueue(80);
    printf("Front: %d, Rear: %d\\n", front, rear);
    return 0;
}`,
    output: `[10@idx0] [20@idx1] [30@idx2] [40@idx3] [50@idx4] Overflow! 
Dequeued: 10 20
[70@idx0] [80@idx1] 
Front: 2, Rear: 1`,
    steps: [
      { step: 1, action: "enqueue(10..50) fills indices 0, 1, 2, 3, 4. rear reaches index 4, front is at index 0." },
      { step: 2, action: "enqueue(60) checks (4 + 1) % 5 == 0 which matches front == 0 -> prints 'Overflow!'." },
      { step: 3, action: "dequeue() twice removes queue[0]=10 and queue[1]=20; front advances to (1 + 1) % 5 = index 2." },
      { step: 4, action: "enqueue(70) wraps rear to (4 + 1) % 5 = index 0. queue[0] becomes 70." },
      { step: 5, action: "enqueue(80) sets rear to (0 + 1) % 5 = index 1. queue[1] becomes 80. front remains at index 2." }
    ],
    rule: "Circular Queue modulo condition: (rear + 1) % SIZE == front prevents the 'False Overflow' problem of standard linear arrays.",
    concept: "Circular Arrays & Modulo Pointer Arithmetic",
    callStack: [
      { label: "Initial Fill", detail: "front=0, rear=4, array=[10, 20, 30, 40, 50]" },
      { label: "After 2 Dequeues", detail: "front=2, rear=4, slots 0 and 1 freed" },
      { label: "After Wrap-Around Enqueues", detail: "front=2, rear=1, array=[70, 80, 30, 40, 50]" }
    ]
  },
  {
    id: 'dsa-pred-2',
    programNumber: 2,
    title: 'Recursion Call Stack Unwinding in BST Inorder Traversal',
    code: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node *left, *right;
};

struct Node* n(int val) {
    struct Node* t = (struct Node*)malloc(sizeof(struct Node));
    t->data = val; t->left = t->right = NULL;
    return t;
}

void mystery(struct Node* root) {
    if (root == NULL) return;
    mystery(root->right);
    printf("%d ", root->data);
    mystery(root->left);
}

int main() {
    // Construct BST: 50 with left 30 (left 20, right 40) and right 70 (left 60, right 80)
    struct Node* root = n(50);
    root->left = n(30); root->right = n(70);
    root->left->left = n(20); root->left->right = n(40);
    root->right->left = n(60); root->right->right = n(80);

    mystery(root);
    return 0;
}`,
    output: `80 70 60 50 40 30 20`,
    steps: [
      { step: 1, action: "Function mystery() visits right child first, prints current node, then visits left child (Reverse Inorder: Right -> Root -> Left)." },
      { step: 2, action: "Traverses to rightmost leaf: node 80 is reached and printed first." },
      { step: 3, action: "Unwinds to node 70 (printed second), then visits 70's left child 60 (printed third)." },
      { step: 4, action: "Unwinds to root node 50 (printed fourth)." },
      { step: 5, action: "Repeats for left subtree: 40 -> 30 -> 20, outputting all keys in strictly descending order." }
    ],
    rule: "Standard Inorder (Left -> Root -> Right) produces ascending order in a BST. Reverse Inorder (Right -> Root -> Left) produces strictly descending order.",
    concept: "Binary Search Tree Reverse Traversal via Call Stack",
    callStack: [
      { label: "mystery(50)", detail: "Calls mystery(70)" },
      { label: "mystery(70)", detail: "Calls mystery(80)" },
      { label: "mystery(80)", detail: "Base case right=NULL -> Prints 80 -> Base case left=NULL -> Returns" }
    ]
  },
  {
    id: 'dsa-pred-3',
    programNumber: 3,
    title: 'Singly Linked List Pointer Splicing (Reversal Logic)',
    code: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int val;
    struct Node* next;
};

struct Node* reverse(struct Node* head) {
    struct Node *prev = NULL, *curr = head, *nxt = NULL;
    while (curr != NULL) {
        nxt = curr->next;
        curr->next = prev;
        prev = curr;
        curr = nxt;
    }
    return prev;
}

int main() {
    struct Node a = {10, NULL}, b = {20, NULL}, c = {30, NULL}, d = {40, NULL};
    a.next = &b; b.next = &c; c.next = &d;

    struct Node* newHead = reverse(&a);
    while (newHead) {
        printf("%d -> ", newHead->val);
        newHead = newHead->next;
    }
    printf("NULL\\n");
    return 0;
}`,
    output: `40 -> 30 -> 20 -> 10 -> NULL`,
    steps: [
      { step: 1, action: "Iter 1: curr=10. nxt=&b(20). a.next=NULL. prev=&a(10). curr=&b(20)." },
      { step: 2, action: "Iter 2: curr=20. nxt=&c(30). b.next=&a(10). prev=&b(20). curr=&c(30)." },
      { step: 3, action: "Iter 3: curr=30. nxt=&d(40). c.next=&b(20). prev=&c(30). curr=&d(40)." },
      { step: 4, action: "Iter 4: curr=40. nxt=NULL. d.next=&c(30). prev=&d(40). curr=NULL." },
      { step: 5, action: "Loop terminates. Function returns prev which is &d(40). The linked list is completely inverted in-place in O(n) time and O(1) space." }
    ],
    rule: "In-place linked list reversal requires 3 sliding pointers (prev, curr, nxt). Saving curr->next before rewiring curr->next = prev is mandatory to prevent orphan node memory loss.",
    concept: "Three-Pointer In-Place Linked List Inversion",
    callStack: [
      { label: "Step 1", detail: "10 -> NULL (prev points to 10)" },
      { label: "Step 2", detail: "20 -> 10 -> NULL (prev points to 20)" },
      { label: "Step 3", detail: "30 -> 20 -> 10 -> NULL (prev points to 30)" },
      { label: "Step 4", detail: "40 -> 30 -> 20 -> 10 -> NULL (new head is 40)" }
    ]
  },
  {
    id: 'dsa-pred-4',
    programNumber: 4,
    title: 'Stack-Based Postfix Expression Evaluation',
    code: `#include <stdio.h>
#include <ctype.h>

int stack[50], top = -1;
void push(int x) { stack[++top] = x; }
int pop() { return stack[top--]; }

int eval(char* exp) {
    for (int i = 0; exp[i] != '\\0'; i++) {
        if (isdigit(exp[i])) {
            push(exp[i] - '0');
        } else if (exp[i] != ' ') {
            int op2 = pop();
            int op1 = pop();
            switch (exp[i]) {
                case '+': push(op1 + op2); break;
                case '-': push(op1 - op2); break;
                case '*': push(op1 * op2); break;
                case '/': push(op1 / op2); break;
            }
        }
    }
    return pop();
}

int main() {
    char exp[] = "6 2 3 + * 8 4 / -";
    printf("Evaluated Result: %d\\n", eval(exp));
    return 0;
}`,
    output: `Evaluated Result: 28`,
    steps: [
      { step: 1, action: "Push 6, Push 2, Push 3 onto stack. Stack: [6, 2, 3]." },
      { step: 2, action: "Token '+': Pop op2=3, op1=2. Push (2 + 3) = 5. Stack: [6, 5]." },
      { step: 3, action: "Token '*': Pop op2=5, op1=6. Push (6 * 5) = 30. Stack: [30]." },
      { step: 4, action: "Push 8, Push 4. Stack: [30, 8, 4]." },
      { step: 5, action: "Token '/': Pop op2=4, op1=8. Push (8 / 4) = 2. Stack: [30, 2]." },
      { step: 6, action: "Token '-': Pop op2=2, op1=30. Push (30 - 2) = 28. Final result is 28." }
    ],
    rule: "CRITICAL OPERAND ORDER: The FIRST popped element is ALWAYS operand 2 (op2), and the SECOND popped is operand 1 (op1). Computing op2 - op1 instead of op1 - op2 causes fatal sign errors!",
    concept: "Postfix Evaluation with LIFO Operand Stack",
    callStack: [
      { label: "Token '+'", detail: "2 + 3 = 5 pushed" },
      { label: "Token '*'", detail: "6 * 5 = 30 pushed" },
      { label: "Token '/'", detail: "8 / 4 = 2 pushed" },
      { label: "Token '-'", detail: "30 - 2 = 28 final pop" }
    ]
  },
  {
    id: 'dsa-pred-5',
    programNumber: 5,
    title: 'Quick Sort Hoare Partition Index Swap Trace',
    code: `#include <stdio.h>

void swap(int* a, int* b) { int t = *a; *a = *b; *b = t; }

int partition(int arr[], int low, int high) {
    int pivot = arr[low];
    int i = low - 1, j = high + 1;
    while (1) {
        do { i++; } while (arr[i] < pivot);
        do { j--; } while (arr[j] > pivot);
        if (i >= j) return j;
        swap(&arr[i], &arr[j]);
        printf("Swapped: %d <-> %d | ", arr[i], arr[j]);
    }
}

int main() {
    int arr[] = {25, 10, 45, 15, 30, 5};
    int pIndex = partition(arr, 0, 5);
    printf("\\nPartition Index: %d, Arr: ", pIndex);
    for (int k = 0; k < 6; k++) printf("%d ", arr[k]);
    printf("\\n");
    return 0;
}`,
    output: `Swapped: 5 <-> 25 | Swapped: 15 <-> 45 | 
Partition Index: 2, Arr: 5 10 15 45 30 25`,
    steps: [
      { step: 1, action: "Pivot chosen as arr[0]=25. i starts at -1, j starts at 6." },
      { step: 2, action: "i advances to 0 (arr[0]=25 >= 25). j decrements to 5 (arr[5]=5 <= 25). Swap arr[0] and arr[5]. Arr: [5, 10, 45, 15, 30, 25]." },
      { step: 3, action: "i advances to 2 (arr[2]=45 >= 25). j decrements to 3 (arr[3]=15 <= 25). Swap arr[2] and arr[3]. Arr: [5, 10, 15, 45, 30, 25]." },
      { step: 4, action: "i advances to 3 (arr[3]=45 >= 25). j decrements to 2 (arr[2]=15 <= 25). Condition i >= j (3 >= 2) met. Return j = 2." }
    ],
    rule: "Hoare partition is faster than Lomuto partition (3x fewer swaps on average). The returned split index divides the array into arr[low..j] <= pivot and arr[j+1..high] >= pivot.",
    concept: "Two-Pointer In-Place Array Partitioning",
    callStack: [
      { label: "Initial", detail: "[25, 10, 45, 15, 30, 5], pivot=25" },
      { label: "After Swap 1", detail: "[5, 10, 45, 15, 30, 25]" },
      { label: "After Swap 2", detail: "[5, 10, 15, 45, 30, 25]" },
      { label: "Final Split", detail: "Left subarray [5, 10, 15] <= 25, Right subarray [45, 30, 25] >= 25" }
    ]
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// PART B: 15 5-MARK PROGRAMMING QUESTIONS WITH FULL IMPLEMENTATIONS
// ─────────────────────────────────────────────────────────────────────────────
export const DSA_LONG_QUESTIONS: LongAnswerQuestion[] = [
  {
    id: 'dsa-long-1',
    qNumber: 'Q1',
    title: 'Circular Queue Implementation with Railway Ticket Reservation System',
    marks: 5,
    category: 'classes',
    concept: 'A Circular Queue uses a fixed-size buffer with wrap-around pointers via the modulo operator ((rear + 1) % MAX). This overcomes the false overflow defect of linear queues where freed slots cannot be reused.',
    requirements: [
      'Define Passenger struct with ticketId, name, and seatNumber',
      'Implement enqueue() with boundary check (rear + 1) % MAX == front',
      'Implement dequeue() with underflow check and reset when front == rear',
      'Display passenger booking log'
    ],
    code: `#include <stdio.h>
#include <string.h>
#include <stdbool.h>

#define MAX_SEATS 5

typedef struct {
    int ticketId;
    char passengerName[30];
    int seatNumber;
} Booking;

typedef struct {
    Booking slots[MAX_SEATS];
    int front;
    int rear;
} CircularQueue;

void initQueue(CircularQueue* q) {
    q->front = -1;
    q->rear = -1;
}

bool isFull(CircularQueue* q) {
    return ((q->rear + 1) % MAX_SEATS) == q->front;
}

bool isEmpty(CircularQueue* q) {
    return q->front == -1;
}

bool bookTicket(CircularQueue* q, int ticketId, const char* name, int seatNum) {
    if (isFull(q)) {
        printf("[FAILED] Reservation Full! Ticket %d for %s waitlisted.\\n", ticketId, name);
        return false;
    }
    if (isEmpty(q)) {
        q->front = 0;
    }
    q->rear = (q->rear + 1) % MAX_SEATS;
    q->slots[q->rear].ticketId = ticketId;
    strncpy(q->slots[q->rear].passengerName, name, 29);
    q->slots[q->rear].seatNumber = seatNum;
    printf("[CONFIRMED] Ticket #%d booked for %s (Seat %d) at Slot %d\\n", 
           ticketId, name, seatNum, q->rear);
    return true;
}

bool cancelTicket(CircularQueue* q, Booking* cancelled) {
    if (isEmpty(q)) {
        printf("[ERROR] No active bookings to cancel (Underflow).\\n");
        return false;
    }
    *cancelled = q->slots[q->front];
    if (q->front == q->rear) {
        // Last booking removed: reset queue to empty
        q->front = q->rear = -1;
    } else {
        q->front = (q->front + 1) % MAX_SEATS;
    }
    printf("[CANCELLED] Refund issued for Ticket #%d (%s)\\n", 
           cancelled->ticketId, cancelled->passengerName);
    return true;
}

void displayManifest(CircularQueue* q) {
    if (isEmpty(q)) {
        printf("Train Manifest: All seats vacant.\\n");
        return;
    }
    printf("\\n--- ACTIVE PASSENGER MANIFEST ---\\n");
    int i = q->front;
    while (true) {
        printf("Seat %d | Ticket #%d: %s\\n", 
               q->slots[i].seatNumber, q->slots[i].ticketId, q->slots[i].passengerName);
        if (i == q->rear) break;
        i = (i + 1) % MAX_SEATS;
    }
    printf("---------------------------------\\n");
}

int main() {
    CircularQueue train;
    initQueue(&train);

    bookTicket(&train, 101, "Rahul Sharma", 12);
    bookTicket(&train, 102, "Pooja Patel", 14);
    bookTicket(&train, 103, "Amit Verma", 15);
    bookTicket(&train, 104, "Sneha Joshi", 18);
    bookTicket(&train, 105, "Vikas Singh", 22);
    
    // Attempt 6th (Triggers Overflow)
    bookTicket(&train, 106, "Neha Gupta", 25);

    displayManifest(&train);

    Booking cancelled;
    cancelTicket(&train, &cancelled);
    cancelTicket(&train, &cancelled);

    // Free slots 0 and 1 are now reused via modulo wrap-around
    bookTicket(&train, 107, "Kavita Rao", 1);
    displayManifest(&train);

    return 0;
}`,
    output: `[CONFIRMED] Ticket #101 booked for Rahul Sharma (Seat 12) at Slot 0
[CONFIRMED] Ticket #102 booked for Pooja Patel (Seat 14) at Slot 1
[CONFIRMED] Ticket #103 booked for Amit Verma (Seat 15) at Slot 2
[CONFIRMED] Ticket #104 booked for Sneha Joshi (Seat 18) at Slot 3
[CONFIRMED] Ticket #105 booked for Vikas Singh (Seat 22) at Slot 4
[FAILED] Reservation Full! Ticket 106 for Neha Gupta waitlisted.

--- ACTIVE PASSENGER MANIFEST ---
Seat 12 | Ticket #101: Rahul Sharma
Seat 14 | Ticket #102: Pooja Patel
Seat 15 | Ticket #103: Amit Verma
Seat 18 | Ticket #104: Sneha Joshi
Seat 22 | Ticket #105: Vikas Singh
---------------------------------
[CANCELLED] Refund issued for Ticket #101 (Rahul Sharma)
[CANCELLED] Refund issued for Ticket #102 (Pooja Patel)
[CONFIRMED] Ticket #107 booked for Kavita Rao (Seat 1) at Slot 0

--- ACTIVE PASSENGER MANIFEST ---
Seat 15 | Ticket #103: Amit Verma
Seat 18 | Ticket #104: Sneha Joshi
Seat 22 | Ticket #105: Vikas Singh
Seat 1 | Ticket #107: Kavita Rao
---------------------------------`,
    explanationPoints: [
      'Step 1: Circular Queue array has size MAX_SEATS=5, with front=-1 and rear=-1.',
      'Step 2: bookTicket increments rear via (rear + 1) % 5. When first element arrives, front is set to 0.',
      'Step 3: At capacity (slots 0..4 full), (rear + 1) % 5 == front (5 % 5 == 0 == front), correctly identifying full condition.',
      'Step 4: cancelTicket extracts slot at front and advances front = (front + 1) % 5, freeing indices 0 and 1.',
      'Step 5: Ticket 107 wraps around and occupies slot 0 without reallocating array memory.'
    ],
    traceTable: {
      headers: ['Operation', 'Front', 'Rear', 'Array State (Indices 0..4)'],
      rows: [
        ['Init', '-1', '-1', '[ - , - , - , - , - ]'],
        ['Book 101..105', '0', '4', '[ 101, 102, 103, 104, 105 ] (Full)'],
        ['Book 106', '0', '4', 'Rejected (Overflow: (4+1)%5 == 0)'],
        ['Cancel 101, 102', '2', '4', '[ freed, freed, 103, 104, 105 ]'],
        ['Book 107', '2', '0', '[ 107, freed, 103, 104, 105 ] (Wrapped to idx 0)']
      ]
    },
    examNote: 'In university exams, always write both boundary conditions explicitly: isFull(): ((rear + 1) % MAX) == front, and isEmpty(): front == -1. If asked for single element reset: when front == rear, reset front = rear = -1.',
    vivaTrap: 'Examiner Viva Trap: "Why do we say linear queue has false overflow?" Answer: In a linear queue, when elements are dequeued, front moves forward. Even if front reaches 3 and rear reaches MAX-1, rear cannot advance further, rejecting new elements despite empty slots at 0, 1, and 2. Circular queue solves this via modulo wrap-around.'
  },
  {
    id: 'dsa-long-2',
    qNumber: 'Q2',
    title: 'Singly Linked List Implementation (Insert at Head, Delete by Value, In-Place Reversal)',
    marks: 5,
    category: 'classes',
    concept: 'A Singly Linked List is a dynamic linear data structure composed of self-referential nodes containing data and a next pointer to the subsequent node in heap memory.',
    requirements: [
      'Define struct Node with int data and struct Node* next',
      'Implement insertAtHead() with O(1) time complexity',
      'Implement deleteByValue() handling head deletion, middle node deletion, and value not found',
      'Implement reverseList() using 3 pointers without extra memory allocation'
    ],
    code: `#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

struct Node {
    int data;
    struct Node* next;
};

struct Node* createNode(int value) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    if (!newNode) {
        printf("Memory allocation failed!\\n");
        exit(1);
    }
    newNode->data = value;
    newNode->next = NULL;
    return newNode;
}

void insertAtHead(struct Node** headRef, int value) {
    struct Node* newNode = createNode(value);
    newNode->next = *headRef;
    *headRef = newNode;
}

bool deleteByValue(struct Node** headRef, int target) {
    if (*headRef == NULL) return false;

    struct Node* temp = *headRef;

    // Case 1: Target is at Head
    if (temp->data == target) {
        *headRef = temp->next;
        free(temp);
        return true;
    }

    // Case 2: Target is in body or tail
    struct Node* prev = NULL;
    while (temp != NULL && temp->data != target) {
        prev = temp;
        temp = temp->next;
    }

    if (temp == NULL) return false; // Target not found

    prev->next = temp->next;
    free(temp);
    return true;
}

void reverseList(struct Node** headRef) {
    struct Node *prev = NULL, *curr = *headRef, *next = NULL;
    while (curr != NULL) {
        next = curr->next; // Store next
        curr->next = prev; // Reverse pointer
        prev = curr;       // Advance prev
        curr = next;       // Advance curr
    }
    *headRef = prev;
}

void printList(struct Node* head) {
    struct Node* curr = head;
    while (curr != NULL) {
        printf("%d -> ", curr->data);
        curr = curr->next;
    }
    printf("NULL\\n");
}

int main() {
    struct Node* head = NULL;

    insertAtHead(&head, 40);
    insertAtHead(&head, 30);
    insertAtHead(&head, 20);
    insertAtHead(&head, 10);
    printf("Original List: ");
    printList(head);

    deleteByValue(&head, 20);
    printf("After deleting 20: ");
    printList(head);

    reverseList(&head);
    printf("After in-place reversal: ");
    printList(head);

    return 0;
}`,
    output: `Original List: 10 -> 20 -> 30 -> 40 -> NULL
After deleting 20: 10 -> 30 -> 40 -> NULL
After in-place reversal: 40 -> 30 -> 10 -> NULL`,
    explanationPoints: [
      'Insert at Head: Allocates node, points newNode->next to existing *headRef, updates *headRef = newNode in O(1) time.',
      'Delete by Value: Special-cases target==head to avoid null-pointer dereference; otherwise tracks prev and temp, splicing prev->next = temp->next and calling free(temp) to avoid memory leaks.',
      'Reverse List: Uses 3 sliding pointers (prev, curr, next) to reorient arrows backward without creating duplicate nodes (O(n) time, O(1) auxiliary space).'
    ],
    examNote: 'Always use double pointers (struct Node** headRef) in helper functions when modifying the head node in C. If you pass single pointer (struct Node* head), the caller head remains unchanged!',
    vivaTrap: 'Viva Trap: "What happens if you do not call free(temp) after deleting a node?" Answer: The node becomes an inaccessible memory leak in heap RAM, causing gradual memory exhaustion in long-running services.'
  },
  {
    id: 'dsa-long-3',
    qNumber: 'Q3',
    title: 'Infix to Postfix Expression Conversion Using Stack (Shunting Yard)',
    marks: 5,
    category: 'classes',
    concept: 'Compilers cannot directly evaluate human-readable infix arithmetic (A + B * C) due to operator precedence and parentheses rules. Infix to Postfix conversion translates the expression into Reverse Polish Notation where operators follow operands.',
    requirements: [
      'Implement stack for character operators',
      'Define precedence() function: ^ (3), *, / (2), +, - (1)',
      'Handle left-associativity and parentheses nesting',
      'Produce valid postfix string output'
    ],
    code: `#include <stdio.h>
#include <ctype.h>
#include <string.h>

#define MAX 100

char stack[MAX];
int top = -1;

void push(char c) { stack[++top] = c; }
char pop() { return stack[top--]; }
char peek() { return (top >= 0) ? stack[top] : '\\0'; }
int isEmpty() { return top == -1; }

int precedence(char op) {
    if (op == '^') return 3;
    if (op == '*' || op == '/') return 2;
    if (op == '+' || op == '-') return 1;
    return 0;
}

void infixToPostfix(const char* infix, char* postfix) {
    int k = 0;
    for (int i = 0; infix[i] != '\\0'; i++) {
        char ch = infix[i];

        if (isalnum(ch)) {
            // Operands output directly
            postfix[k++] = ch;
        } else if (ch == '(') {
            push(ch);
        } else if (ch == ')') {
            while (!isEmpty() && peek() != '(') {
                postfix[k++] = pop();
            }
            if (!isEmpty()) pop(); // Discard '('
        } else {
            // Operator arrived
            while (!isEmpty() && precedence(peek()) >= precedence(ch)) {
                // Precedence rule: Pop higher or equal precedence operators
                if (ch == '^' && peek() == '^') break; // Right-associative exponent
                postfix[k++] = pop();
            }
            push(ch);
        }
    }
    while (!isEmpty()) {
        postfix[k++] = pop();
    }
    postfix[k] = '\\0';
}

int main() {
    char infix[] = "(A+B)*C-(D-E)*(F+G)";
    char postfix[MAX];

    infixToPostfix(infix, postfix);
    printf("Infix Expression   : %s\\n", infix);
    printf("Postfix Expression : %s\\n", postfix);
    return 0;
}`,
    output: `Infix Expression   : (A+B)*C-(D-E)*(F+G)
Postfix Expression : AB+C*DE-FG+*-`,
    explanationPoints: [
      'Rule 1: Operands (A..Z, 0..9) are immediately written to postfix output.',
      'Rule 2: Left parenthesis ( is pushed directly onto the stack.',
      'Rule 3: Right parenthesis ) triggers popping of operators until ( is encountered.',
      'Rule 4: Incoming operators pop any operators on stack having greater than or equal precedence before being pushed.',
      'Rule 5: After parsing string, all remaining stack operators are popped in LIFO order.'
    ],
    examNote: 'Exponentiation (^) is right-associative (2^3^2 = 2^(3^2) = 512). When incoming symbol is ^ and stack top is ^, DO NOT pop top! All other operators (+, -, *, /) are left-associative.',
    vivaTrap: 'Viva Trap: "Why do postfix expressions not require parentheses?" Answer: Operator evaluation order is strictly unambiguous and fully determined by position: each operator applies immediately to the two preceding operands.'
  },
  {
    id: 'dsa-long-4',
    qNumber: 'Q4',
    title: 'Binary Search Tree (BST) Recursive Insertion, Search & Inorder Traversal',
    marks: 5,
    category: 'classes',
    concept: 'A Binary Search Tree is a binary tree where for every node X: all keys in left subtree are strictly less than X, and all keys in right subtree are strictly greater than X. Inorder traversal yields strictly sorted keys in O(n) time.',
    requirements: [
      'Define BST Node with data, left, right pointers',
      'Recursive insertNode() maintaining BST invariant',
      'Recursive searchNode() returning true/false with comparison count',
      'Inorder traversal demonstrating ascending sequence'
    ],
    code: `#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

struct Node {
    int key;
    struct Node *left, *right;
};

struct Node* createNode(int key) {
    struct Node* n = (struct Node*)malloc(sizeof(struct Node));
    n->key = key;
    n->left = n->right = NULL;
    return n;
}

struct Node* insert(struct Node* root, int key) {
    if (root == NULL) return createNode(key);
    if (key < root->key)
        root->left = insert(root->left, key);
    else if (key > root->key)
        root->right = insert(root->right, key);
    return root; // Duplicate keys ignored
}

bool search(struct Node* root, int target, int* comparisons) {
    if (root == NULL) return false;
    (*comparisons)++;
    if (root->key == target) return true;
    if (target < root->key)
        return search(root->left, target, comparisons);
    else
        return search(root->right, target, comparisons);
}

void inorder(struct Node* root) {
    if (root != NULL) {
        inorder(root->left);
        printf("%d ", root->key);
        inorder(root->right);
    }
}

int main() {
    struct Node* root = NULL;
    int keys[] = {50, 30, 70, 20, 40, 60, 80};
    int n = sizeof(keys) / sizeof(keys[0]);

    for (int i = 0; i < n; i++) {
        root = insert(root, keys[i]);
    }

    printf("BST Inorder Traversal (Sorted Output): ");
    inorder(root);
    printf("\\n");

    int target = 60, comps = 0;
    if (search(root, target, &comps))
        printf("Key %d FOUND after %d comparisons!\\n", target, comps);
    else
        printf("Key %d NOT found after %d comparisons.\\n", target, comps);

    target = 99; comps = 0;
    if (search(root, target, &comps))
        printf("Key %d FOUND after %d comparisons!\\n", target, comps);
    else
        printf("Key %d NOT found after %d comparisons.\\n", target, comps);

    return 0;
}`,
    output: `BST Inorder Traversal (Sorted Output): 20 30 40 50 60 70 80 
Key 60 FOUND after 3 comparisons!
Key 99 NOT found after 3 comparisons.`,
    explanationPoints: [
      'BST Invariant: LeftSubtree < Root < RightSubtree at every hierarchical level.',
      'Search Complexity: O(log n) on balanced trees since each comparison eliminates half the remaining search space.',
      'Worst Case Complexity: O(n) when elements are inserted in already sorted order (creating a degenerate/skewed tree behaving like a linked list).',
      'Inorder Traversal: Left -> Root -> Right recursively guarantees monotonically ascending sequence.'
    ],
    examNote: 'If the exam asks why BST search degrades to O(n), draw a right-skewed tree: 10 -> 20 -> 30 -> 40 -> 50. State that AVL trees solve this via auto-balancing rotations.',
    vivaTrap: 'Viva Trap: "Can a BST have duplicate keys?" Answer: Standard BSTs do not allow duplicates. If duplicates must be stored, we either keep a frequency counter in the node or define duplicates to always go into the right subtree.'
  },
  {
    id: 'dsa-long-5',
    qNumber: 'Q5',
    title: 'Quick Sort Implementation with Hoare Partition & Time Complexity Analysis',
    marks: 5,
    category: 'classes',
    concept: 'Quick Sort is a Divide-and-Conquer algorithm that picks a pivot element, partitions the array such that all elements smaller than pivot precede it, and recursively sorts subarrays.',
    requirements: [
      'Implement partition() algorithm',
      'Implement recursive quickSort()',
      'Provide step trace of array state',
      'Discuss best, average, and worst case Big-O'
    ],
    code: `#include <stdio.h>

void swap(int* a, int* b) { int t = *a; *a = *b; *b = t; }

int partition(int arr[], int low, int high) {
    int pivot = arr[low];
    int i = low - 1;
    int j = high + 1;

    while (1) {
        do { i++; } while (arr[i] < pivot);
        do { j--; } while (arr[j] > pivot);
        if (i >= j) return j;
        swap(&arr[i], &arr[j]);
    }
}

void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi);
        quickSort(arr, pi + 1, high);
    }
}

void printArr(int arr[], int size) {
    for (int i = 0; i < size; i++) printf("%d ", arr[i]);
    printf("\\n");
}

int main() {
    int arr[] = {48, 22, 65, 12, 89, 34, 71, 5};
    int n = sizeof(arr) / sizeof(arr[0]);

    printf("Original Array : ");
    printArr(arr, n);

    quickSort(arr, 0, n - 1);

    printf("Quick-Sorted   : ");
    printArr(arr, n);
    return 0;
}`,
    output: `Original Array : 48 22 65 12 89 34 71 5 
Quick-Sorted   : 5 12 22 34 48 65 71 89`,
    explanationPoints: [
      'Divide: Partition array around pivot so left elements <= pivot and right elements >= pivot.',
      'Conquer: Recursively invoke quickSort on left and right partitions.',
      'Combine: Trivial because sorting happens in-place without auxiliary buffer arrays.',
      'Average Time: O(n log n). Worst Time: O(n^2) when pivot is always extreme smallest/largest.'
    ],
    examNote: 'Write recurrence relations in exam: Best case T(n) = 2T(n/2) + O(n) = O(n log n). Worst case T(n) = T(n-1) + O(n) = O(n^2).',
    vivaTrap: 'Viva Trap: "Why is Quick Sort preferred over Merge Sort for arrays?" Answer: Quick Sort sorts in-place with O(log n) stack space, whereas Merge Sort requires O(n) auxiliary memory. Quick Sort also has superior CPU cache locality.'
  },
  {
    id: 'dsa-long-6',
    qNumber: 'Q6',
    title: "Dijkstra's Single Source Shortest Path Algorithm (Adjacency Matrix)",
    marks: 5,
    category: 'classes',
    concept: "Dijkstra's algorithm finds the shortest path from a source vertex to all other vertices in a weighted graph with non-negative edge weights using a Greedy strategy.",
    requirements: [
      'Graph represented as 5x5 adjacency matrix',
      'Track dist[] array and visited[] boolean array',
      'Iteratively pick unvisited vertex with minimum distance',
      'Relax neighbor distances: dist[v] = min(dist[v], dist[u] + weight(u, v))'
    ],
    code: `#include <stdio.h>
#include <stdbool.h>

#define V 5
#define INF 99999

int minDistance(int dist[], bool visited[]) {
    int min = INF, minIndex = -1;
    for (int v = 0; v < V; v++) {
        if (!visited[v] && dist[v] <= min) {
            min = dist[v];
            minIndex = v;
        }
    }
    return minIndex;
}

void dijkstra(int graph[V][V], int src) {
    int dist[V];
    bool visited[V];

    for (int i = 0; i < V; i++) {
        dist[i] = INF;
        visited[i] = false;
    }
    dist[src] = 0;

    for (int count = 0; count < V - 1; count++) {
        int u = minDistance(dist, visited);
        visited[u] = true;

        for (int v = 0; v < V; v++) {
            // Relaxation step
            if (!visited[v] && graph[u][v] && dist[u] != INF 
                && dist[u] + graph[u][v] < dist[v]) {
                dist[v] = dist[u] + graph[u][v];
            }
        }
    }

    printf("Vertex \\t Shortest Distance from Source %d\\n", src);
    for (int i = 0; i < V; i++) {
        printf("%d -> %d \\t\\t %d\\n", src, i, dist[i]);
    }
}

int main() {
    int graph[V][V] = {
        {0, 10, 0, 30, 100},
        {10, 0, 50, 0, 0},
        {0, 50, 0, 20, 10},
        {30, 0, 20, 0, 60},
        {100, 0, 10, 60, 0}
    };

    dijkstra(graph, 0);
    return 0;
}`,
    output: `Vertex \t Shortest Distance from Source 0
0 -> 0 \t\t 0
0 -> 1 \t\t 10
0 -> 2 \t\t 50
0 -> 3 \t\t 30
0 -> 4 \t\t 60`,
    explanationPoints: [
      'Initialize all distances to INF, source distance to 0.',
      'Greedy selection: Pick node u with lowest tentative dist[u] among unvisited nodes.',
      'Edge Relaxation: For each neighbor v, if dist[u] + weight(u, v) < dist[v], update dist[v].',
      'Time Complexity: O(V^2) with matrix, or O((V + E) log V) using priority queue min-heap.'
    ],
    examNote: 'Always state in exams that Dijkstra FAILS on graphs with negative edge weights. For graphs with negative edges, the Bellman-Ford algorithm must be used.',
    vivaTrap: 'Viva Trap: "Why can Dijkstra not handle negative edge weights?" Answer: Dijkstra assumes that once a node is marked visited, its distance is finalized and optimal. A negative edge downstream could provide a shorter path, but Dijkstra will never reconsider a visited node.'
  },
  {
    id: 'dsa-long-7',
    qNumber: 'Q7',
    title: 'Breadth First Search (BFS) and Depth First Search (DFS) on Graphs',
    marks: 5,
    category: 'classes',
    concept: 'BFS explores graph level-by-level using a FIFO Queue. DFS explores deep along each branch before backtracking using a LIFO Recursion Call Stack.',
    requirements: [
      'Represent undirected graph with 6 vertices using adjacency matrix',
      'Implement BFS using queue with visited tracking',
      'Implement DFS using recursive backtracking',
      'Compare traversal orders and memory complexity'
    ],
    code: `#include <stdio.h>
#include <stdbool.h>

#define N 6

int adj[N][N] = {
    {0, 1, 1, 0, 0, 0}, // 0 connected to 1, 2
    {1, 0, 0, 1, 1, 0}, // 1 connected to 0, 3, 4
    {1, 0, 0, 0, 0, 1}, // 2 connected to 0, 5
    {0, 1, 0, 0, 0, 0}, // 3 connected to 1
    {0, 1, 0, 0, 0, 0}, // 4 connected to 1
    {0, 0, 1, 0, 0, 0}  // 5 connected to 2
};

void bfs(int start) {
    bool visited[N] = {false};
    int queue[N], front = 0, rear = 0;

    visited[start] = true;
    queue[rear++] = start;

    printf("BFS Order: ");
    while (front < rear) {
        int u = queue[front++];
        printf("%d ", u);
        for (int v = 0; v < N; v++) {
            if (adj[u][v] && !visited[v]) {
                visited[v] = true;
                queue[rear++] = v;
            }
        }
    }
    printf("\\n");
}

void dfsHelper(int u, bool visited[]) {
    visited[u] = true;
    printf("%d ", u);
    for (int v = 0; v < N; v++) {
        if (adj[u][v] && !visited[v]) {
            dfsHelper(v, visited);
        }
    }
}

void dfs(int start) {
    bool visited[N] = {false};
    printf("DFS Order: ");
    dfsHelper(start, visited);
    printf("\\n");
}

int main() {
    bfs(0);
    dfs(0);
    return 0;
}`,
    output: `BFS Order: 0 1 2 3 4 5 
DFS Order: 0 1 3 4 2 5 `,
    explanationPoints: [
      'BFS: Level-order expansion (0 -> {1, 2} -> {3, 4, 5}) using Queue.',
      'DFS: Deep branch exploration (0 -> 1 -> 3 -> backtrack -> 4 -> backtrack -> 2 -> 5).',
      'Both algorithms run in O(V + E) time with adjacency list, O(V^2) with matrix.'
    ],
    examNote: 'BFS is guaranteed to find the shortest path in an unweighted graph. DFS is used for cycle detection, topological sorting, and connected components.',
    vivaTrap: 'Viva Trap: "Which uses less memory: BFS or DFS?" Answer: On deep, narrow graphs, BFS uses less memory; on broad, bushy trees (e.g. branching factor 10), DFS uses O(height) which is far less memory than BFS O(width).'
  },
  {
    id: 'dsa-long-8',
    qNumber: 'Q8',
    title: 'Merge Sort Implementation with Auxiliary Buffer and Stable Sorting Proof',
    marks: 5,
    category: 'classes',
    concept: 'Merge Sort is an O(n log n) stable Divide-and-Conquer algorithm that divides an array into two halves, recursively sorts them, and merges the two sorted halves into a unified sequence.',
    requirements: [
      'Implement merge() helper function using temp array',
      'Implement recursive mergeSort()',
      'Demonstrate stable sorting preservation for identical keys',
      'Space-time complexity analysis'
    ],
    code: `#include <stdio.h>
#include <stdlib.h>

void merge(int arr[], int l, int m, int r) {
    int n1 = m - l + 1;
    int n2 = r - m;

    int L[n1], R[n2];
    for (int i = 0; i < n1; i++) L[i] = arr[l + i];
    for (int j = 0; j < n2; j++) R[j] = arr[m + 1 + j];

    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
        // <= ensures STABILITY (equal keys retain original order)
        if (L[i] <= R[j]) {
            arr[k++] = L[i++];
        } else {
            arr[k++] = R[j++];
        }
    }
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}

void mergeSort(int arr[], int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}

int main() {
    int arr[] = {38, 27, 43, 3, 9, 82, 10};
    int n = sizeof(arr) / sizeof(arr[0]);

    mergeSort(arr, 0, n - 1);
    printf("Merge-Sorted Array: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");
    return 0;
}`,
    output: `Merge-Sorted Array: 3 9 10 27 38 43 82`,
    explanationPoints: [
      'Divide: Find middle index m = l + (r - l) / 2 to avoid integer overflow.',
      'Conquer: Recursively sort left half arr[l..m] and right half arr[m+1..r].',
      'Combine: Merge both sorted sub-arrays in linear O(n) time into original array.',
      'Guarantee: Runs strictly in O(n log n) time in Best, Average, AND Worst case.'
    ],
    examNote: 'Emphasize why L[i] <= R[j] creates stability: when two elements are identical, the one from the left subarray is selected first, preserving original relative order.',
    vivaTrap: 'Viva Trap: "Why is Merge Sort preferred for Linked Lists?" Answer: Linked lists do not have O(1) random access needed by Quick Sort or Heap Sort, but inserting/splicing list nodes during merge costs O(1) extra space without allocating auxiliary array buffers.'
  },
  {
    id: 'dsa-long-9',
    qNumber: 'Q9',
    title: 'AVL Tree Self-Balancing Mechanism & Four Rotation Types (LL, RR, LR, RL)',
    marks: 5,
    category: 'classes',
    concept: 'An AVL Tree is a self-balancing binary search tree where the Balance Factor (BF = Height(Left) - Height(Right)) of every node is strictly in {-1, 0, +1}. When an insertion creates an imbalance (+2 or -2), rotations restore O(log n) height.',
    requirements: [
      'Define Node struct with height attribute',
      'Implement rightRotate() and leftRotate()',
      'Compute Balance Factor BF = height(left) - height(right)',
      'Handle LL, RR, LR, RL insertion cases'
    ],
    code: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int key, height;
    struct Node *left, *right;
};

int max(int a, int b) { return (a > b) ? a : b; }
int height(struct Node* n) { return (n == NULL) ? 0 : n->height; }

struct Node* createNode(int key) {
    struct Node* n = (struct Node*)malloc(sizeof(struct Node));
    n->key = key; n->height = 1;
    n->left = n->right = NULL;
    return n;
}

int getBalance(struct Node* n) {
    return (n == NULL) ? 0 : height(n->left) - height(n->right);
}

// Right Rotation (LL Imbalance)
struct Node* rightRotate(struct Node* y) {
    struct Node* x = y->left;
    struct Node* T2 = x->right;

    x->right = y;
    y->left = T2;

    y->height = max(height(y->left), height(y->right)) + 1;
    x->height = max(height(x->left), height(x->right)) + 1;
    return x; // New root
}

// Left Rotation (RR Imbalance)
struct Node* leftRotate(struct Node* x) {
    struct Node* y = x->right;
    struct Node* T2 = y->left;

    y->left = x;
    x->right = T2;

    x->height = max(height(x->left), height(x->right)) + 1;
    y->height = max(height(y->left), height(y->right)) + 1;
    return y; // New root
}

struct Node* insert(struct Node* node, int key) {
    if (node == NULL) return createNode(key);

    if (key < node->key)
        node->left = insert(node->left, key);
    else if (key > node->key)
        node->right = insert(node->right, key);
    else
        return node; // Duplicate keys not allowed

    node->height = 1 + max(height(node->left), height(node->right));
    int balance = getBalance(node);

    // Case 1: Left-Left (LL) -> Single Right Rotate
    if (balance > 1 && key < node->left->key)
        return rightRotate(node);

    // Case 2: Right-Right (RR) -> Single Left Rotate
    if (balance < -1 && key > node->right->key)
        return leftRotate(node);

    // Case 3: Left-Right (LR) -> Left Rotate child, then Right Rotate node
    if (balance > 1 && key > node->left->key) {
        node->left = leftRotate(node->left);
        return rightRotate(node);
    }

    // Case 4: Right-Left (RL) -> Right Rotate child, then Left Rotate node
    if (balance < -1 && key < node->right->key) {
        node->right = rightRotate(node->right);
        return leftRotate(node);
    }

    return node;
}

void preOrder(struct Node* root) {
    if (root != NULL) {
        printf("%d(h=%d) ", root->key, root->height);
        preOrder(root->left);
        preOrder(root->right);
    }
}

int main() {
    struct Node* root = NULL;
    // Sequential insertions that would skew a standard BST
    int keys[] = {10, 20, 30, 40, 50, 25};
    for (int i = 0; i < 6; i++) {
        root = insert(root, keys[i]);
    }

    printf("AVL Preorder Traversal after auto-balancing: \\n");
    preOrder(root);
    printf("\\n");
    return 0;
}`,
    output: `AVL Preorder Traversal after auto-balancing: 
30(h=3) 20(h=2) 10(h=1) 25(h=1) 40(h=2) 50(h=1)`,
    explanationPoints: [
      'Balance Factor = Height(Left) - Height(Right). Permitted set is {-1, 0, +1}.',
      'LL Case: Single Right Rotation at imbalanced node.',
      'RR Case: Single Left Rotation at imbalanced node.',
      'LR Case: Double Rotation (Left rotate left child, then Right rotate node).',
      'RL Case: Double Rotation (Right rotate right child, then Left rotate node).'
    ],
    examNote: 'Always draw the 4 rotation diagrams in exams: show nodes X, Y, Z and subtrees T1, T2, T3, T4 before and after rotation.',
    vivaTrap: 'Viva Trap: "What is the maximum height of an AVL tree with n nodes?" Answer: Approximately 1.44 log2(n), guaranteeing worst-case search, insert, and delete all remain strictly O(log n).'
  },
  {
    id: 'dsa-long-10',
    qNumber: 'Q10',
    title: 'Double-Ended Queue (Deque) Implementation using Circular Array',
    marks: 5,
    category: 'classes',
    concept: 'A Deque (Double Ended Queue) is a generalized queue where elements can be inserted and deleted from BOTH front and rear ends in O(1) time.',
    requirements: [
      'Implement insertFront(), insertRear()',
      'Implement deleteFront(), deleteRear()',
      'Handle pointer wrap-around at array boundary 0 and MAX-1',
      'Display contents from front to rear'
    ],
    code: `#include <stdio.h>
#include <stdbool.h>

#define CAPACITY 5

typedef struct {
    int arr[CAPACITY];
    int front, rear;
} Deque;

void initDeque(Deque* dq) { dq->front = -1; dq->rear = -1; }
bool isFull(Deque* dq) {
    return ((dq->front == 0 && dq->rear == CAPACITY - 1) || (dq->front == dq->rear + 1));
}
bool isEmpty(Deque* dq) { return dq->front == -1; }

void insertRear(Deque* dq, int val) {
    if (isFull(dq)) { printf("Deque Full!\\n"); return; }
    if (isEmpty(dq)) { dq->front = dq->rear = 0; }
    else if (dq->rear == CAPACITY - 1) dq->rear = 0;
    else dq->rear++;
    dq->arr[dq->rear] = val;
}

void insertFront(Deque* dq, int val) {
    if (isFull(dq)) { printf("Deque Full!\\n"); return; }
    if (isEmpty(dq)) { dq->front = dq->rear = 0; }
    else if (dq->front == 0) dq->front = CAPACITY - 1;
    else dq->front--;
    dq->arr[dq->front] = val;
}

int deleteFront(Deque* dq) {
    if (isEmpty(dq)) return -1;
    int val = dq->arr[dq->front];
    if (dq->front == dq->rear) dq->front = dq->rear = -1;
    else if (dq->front == CAPACITY - 1) dq->front = 0;
    else dq->front++;
    return val;
}

int deleteRear(Deque* dq) {
    if (isEmpty(dq)) return -1;
    int val = dq->arr[dq->rear];
    if (dq->front == dq->rear) dq->front = dq->rear = -1;
    else if (dq->rear == 0) dq->rear = CAPACITY - 1;
    else dq->rear--;
    return val;
}

void printDeque(Deque* dq) {
    if (isEmpty(dq)) { printf("Deque Empty\\n"); return; }
    int i = dq->front;
    printf("Deque: ");
    while (1) {
        printf("%d ", dq->arr[i]);
        if (i == dq->rear) break;
        i = (i + 1) % CAPACITY;
    }
    printf("\\n");
}

int main() {
    Deque dq;
    initDeque(&dq);
    insertRear(&dq, 10);
    insertRear(&dq, 20);
    insertFront(&dq, 5);
    insertRear(&dq, 30);
    printDeque(&dq);

    printf("Deleted Rear: %d\\n", deleteRear(&dq));
    printf("Deleted Front: %d\\n", deleteFront(&dq));
    printDeque(&dq);
    return 0;
}`,
    output: `Deque: 5 10 20 30 
Deleted Rear: 30
Deleted Front: 5
Deque: 10 20 `,
    explanationPoints: [
      'insertFront wrap-around: If front == 0, wrap to CAPACITY - 1.',
      'insertRear wrap-around: If rear == CAPACITY - 1, wrap to 0.',
      'deleteFront advances front = (front + 1) % CAPACITY.',
      'deleteRear decrements rear; wraps from 0 to CAPACITY - 1.'
    ],
    examNote: 'Mention the two specialized variants in your exam: Input-Restricted Deque (insert at one end, delete at both) and Output-Restricted Deque (insert at both ends, delete at one).',
    vivaTrap: 'Viva Trap: "Can a Deque simulate both a Stack and a Queue?" Answer: Yes! Restricting operations to insertRear + deleteRear yields a LIFO Stack; insertRear + deleteFront yields a FIFO Queue.'
  },
  {
    id: 'dsa-long-11',
    qNumber: 'Q11',
    title: "Prim's Minimum Spanning Tree (MST) Algorithm",
    marks: 5,
    category: 'classes',
    concept: "Prim's algorithm finds a Minimum Spanning Tree for a connected, weighted undirected graph by growing a tree vertex by vertex from an initial seed vertex, always adding the cheapest edge linking the tree to an outside vertex.",
    requirements: [
      'Track key[] (lowest edge weight to tree)',
      'Track parent[] to store MST topology',
      'Track inMST[] boolean array',
      'Print total MST weight and included edges'
    ],
    code: `#include <stdio.h>
#include <stdbool.h>

#define V 5
#define INF 99999

int minKey(int key[], bool inMST[]) {
    int min = INF, minIdx = -1;
    for (int v = 0; v < V; v++) {
        if (!inMST[v] && key[v] < min) {
            min = key[v];
            minIdx = v;
        }
    }
    return minIdx;
}

void primMST(int graph[V][V]) {
    int parent[V];
    int key[V];
    bool inMST[V];

    for (int i = 0; i < V; i++) {
        key[i] = INF;
        inMST[i] = false;
    }

    key[0] = 0;
    parent[0] = -1;

    for (int count = 0; count < V - 1; count++) {
        int u = minKey(key, inMST);
        inMST[u] = true;

        for (int v = 0; v < V; v++) {
            if (graph[u][v] && !inMST[v] && graph[u][v] < key[v]) {
                parent[v] = u;
                key[v] = graph[u][v];
            }
        }
    }

    int totalWeight = 0;
    printf("Edge \\t Weight\\n");
    for (int i = 1; i < V; i++) {
        printf("%d - %d \\t %d\\n", parent[i], i, graph[i][parent[i]]);
        totalWeight += graph[i][parent[i]];
    }
    printf("Total MST Weight: %d\\n", totalWeight);
}

int main() {
    int graph[V][V] = {
        {0, 2, 0, 6, 0},
        {2, 0, 3, 8, 5},
        {0, 3, 0, 0, 7},
        {6, 8, 0, 0, 9},
        {0, 5, 7, 9, 0}
    };
    primMST(graph);
    return 0;
}`,
    output: `Edge \t Weight
0 - 1 \t 2
1 - 2 \t 3
0 - 3 \t 6
1 - 4 \t 5
Total MST Weight: 16`,
    explanationPoints: [
      'Prim grows an MST by always picking the minimum weight cut edge connected to the visited component.',
      'An MST for a graph with V vertices always contains exactly V - 1 edges and no cycles.',
      'Time complexity is O(V^2) with matrix representation; reducible to O(E log V) using an adjacency list and binary min-heap.'
    ],
    examNote: 'Comparison point for exam: Prim grows a single continuous tree (vertex-based), whereas Kruskal connects disconnected components anywhere (edge-based via Disjoint Set Union).',
    vivaTrap: 'Viva Trap: "Does Prim algorithm work on graphs with negative weights?" Answer: Yes! Unlike Dijkstra, Prim works correctly with negative edge weights as long as there is no negative cycle affecting spanning tree definition.'
  },
  {
    id: 'dsa-long-12',
    qNumber: 'Q12',
    title: 'Open Addressing Hash Table with Linear Probing Collision Resolution',
    marks: 5,
    category: 'classes',
    concept: 'A Hash Table maps keys to array indices via a hash function h(k) = k % TABLE_SIZE. When two distinct keys hash to the identical index (a collision), Linear Probing checks subsequent slots sequentially: h(k, i) = (h(k) + i) % TABLE_SIZE.',
    requirements: [
      'Define HashTable array with empty/occupied/deleted sentinel states',
      'Implement insert(key) with linear probing loop',
      'Implement search(key) handling tombstone deletion states',
      'Demonstrate clustering effect'
    ],
    code: `#include <stdio.h>
#include <stdbool.h>

#define TABLE_SIZE 7
#define EMPTY -1
#define DELETED -2

int hashTable[TABLE_SIZE];

void initTable() {
    for (int i = 0; i < TABLE_SIZE; i++) hashTable[i] = EMPTY;
}

int hash(int key) { return key % TABLE_SIZE; }

bool insert(int key) {
    int index = hash(key);
    for (int i = 0; i < TABLE_SIZE; i++) {
        int probeIdx = (index + i) % TABLE_SIZE;
        if (hashTable[probeIdx] == EMPTY || hashTable[probeIdx] == DELETED) {
            hashTable[probeIdx] = key;
            printf("Inserted %d at Slot %d (Probe step %d)\\n", key, probeIdx, i);
            return true;
        }
    }
    printf("Hash Table Overflow! Cannot insert %d\\n", key);
    return false;
}

int search(int key) {
    int index = hash(key);
    for (int i = 0; i < TABLE_SIZE; i++) {
        int probeIdx = (index + i) % TABLE_SIZE;
        if (hashTable[probeIdx] == EMPTY) return -1; // Not in table
        if (hashTable[probeIdx] == key) return probeIdx;
    }
    return -1;
}

void printTable() {
    printf("Slot:  ");
    for (int i = 0; i < TABLE_SIZE; i++) printf("[%d]   ", i);
    printf("\\nValue: ");
    for (int i = 0; i < TABLE_SIZE; i++) {
        if (hashTable[i] == EMPTY) printf("EMPTY ");
        else if (hashTable[i] == DELETED) printf("DEL   ");
        else printf("%-5d ", hashTable[i]);
    }
    printf("\\n");
}

int main() {
    initTable();
    insert(10); // 10 % 7 = 3
    insert(17); // 17 % 7 = 3 -> Collides! Linear probes to slot 4
    insert(24); // 24 % 7 = 3 -> Collides! Linear probes to slot 5
    insert(8);  // 8 % 7 = 1
    printTable();

    int q = 17;
    int foundIdx = search(q);
    printf("Search %d: Found at index %d\\n", q, foundIdx);
    return 0;
}`,
    output: `Inserted 10 at Slot 3 (Probe step 0)
Inserted 17 at Slot 4 (Probe step 1)
Inserted 24 at Slot 5 (Probe step 2)
Inserted 8 at Slot 1 (Probe step 0)
Slot:  [0]   [1]   [2]   [3]   [4]   [5]   [6]   
Value: EMPTY 8     EMPTY 10    17    24    EMPTY 
Search 17: Found at index 4`,
    explanationPoints: [
      'Hash function: h(k) = k % 7 maps keys into slots 0..6.',
      'Collision Resolution: 10, 17, 24 all hash to 3. 10 occupies 3; 17 probes to (3+1)%7=4; 24 probes to (3+2)%7=5.',
      'Search stops when EMPTY is reached; deleted slots must be marked with a sentinel (Tombstone) to prevent premature search termination.'
    ],
    examNote: 'Define primary clustering in exams: long continuous runs of occupied slots develop, increasing average probe length for future insertions.',
    vivaTrap: 'Viva Trap: "Why do we need a DELETED tombstone marker instead of resetting the slot to EMPTY?" Answer: If slot 4 was reset to EMPTY, searching for 24 would terminate prematurely at slot 4 and return "Not Found", falsely missing 24 located at slot 5!'
  },
  {
    id: 'dsa-long-13',
    qNumber: 'Q13',
    title: 'Heap Sort Algorithm (Max-Heapify and Heap Construction)',
    marks: 5,
    category: 'classes',
    concept: 'Heap Sort is a comparison-based sorting algorithm using a Binary Max-Heap. It transforms the input array into a Max-Heap in O(n) time, then repeatedly swaps root (maximum) with the last element and heapifies in O(n log n) overall time.',
    requirements: [
      'Implement maxHeapify() for subtree rooted at index i',
      'Build Max-Heap from arbitrary array',
      'Extract max element iteratively to end of array',
      'Demonstrate in-place O(1) space sorting'
    ],
    code: `#include <stdio.h>

void swap(int* a, int* b) { int t = *a; *a = *b; *b = t; }

void heapify(int arr[], int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;

    if (largest != i) {
        swap(&arr[i], &arr[largest]);
        heapify(arr, n, largest);
    }
}

void heapSort(int arr[], int n) {
    // 1. Build Max Heap (start from last non-leaf node down to 0)
    for (int i = n / 2 - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }

    // 2. Extract elements one by one from heap
    for (int i = n - 1; i > 0; i--) {
        swap(&arr[0], &arr[i]); // Move current root (max) to end
        heapify(arr, i, 0);     // Heapify reduced heap
    }
}

int main() {
    int arr[] = {12, 11, 13, 5, 6, 7};
    int n = sizeof(arr) / sizeof(arr[0]);

    heapSort(arr, n);
    printf("Heap-Sorted Array: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");
    return 0;
}`,
    output: `Heap-Sorted Array: 5 6 7 11 12 13`,
    explanationPoints: [
      'Array representation of Binary Tree: parent at i has left child at 2i+1 and right child at 2i+2.',
      'Last non-leaf node is at index n/2 - 1.',
      'Building Max Heap takes O(n) time via mathematical summation of node heights.',
      'Sorting phase performs n - 1 extractions, each costing O(log n), totaling O(n log n).'
    ],
    examNote: 'Heap Sort guarantees O(n log n) in all cases (Best, Average, Worst) and requires O(1) auxiliary space, unlike Merge Sort which requires O(n). However, Heap Sort is NOT stable.',
    vivaTrap: 'Viva Trap: "Is Heap Sort stable?" Answer: No, identical elements can have their relative orders altered during heapify swaps.'
  },
  {
    id: 'dsa-long-14',
    qNumber: 'Q14',
    title: 'Circular Linked List: Insertion and Josephus Problem Simulation',
    marks: 5,
    category: 'classes',
    concept: 'A Circular Linked List connects the last node back to the head node. In the Josephus problem, N people stand in a circle and every K-th person is eliminated until only one survivor remains.',
    requirements: [
      'Create circular node linkages where last->next == head',
      'Implement elimination loop: count K-1 steps, delete K-th node',
      'Track remaining survivor',
      'Time complexity O(N * K)'
    ],
    code: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int playerNum;
    struct Node* next;
};

struct Node* createCircle(int n) {
    struct Node *head = NULL, *prev = NULL;
    for (int i = 1; i <= n; i++) {
        struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
        newNode->playerNum = i;
        if (head == NULL) head = newNode;
        else prev->next = newNode;
        prev = newNode;
    }
    prev->next = head; // Close circle
    return head;
}

int josephusSurvivor(int n, int k) {
    struct Node* curr = createCircle(n);
    struct Node* prev = NULL;

    while (curr->next != curr) {
        // Skip k-1 players
        for (int count = 1; count < k; count++) {
            prev = curr;
            curr = curr->next;
        }
        // Eliminate k-th player
        printf("Eliminated player #%d\\n", curr->playerNum);
        prev->next = curr->next;
        free(curr);
        curr = prev->next;
    }
    int survivor = curr->playerNum;
    free(curr);
    return survivor;
}

int main() {
    int n = 7, k = 3;
    printf("Simulating Josephus Problem (N=%d, K=%d):\\n", n, k);
    int winner = josephusSurvivor(n, k);
    printf("Winner / Last Survivor is Player #%d!\\n", winner);
    return 0;
}`,
    output: `Simulating Josephus Problem (N=7, K=3):
Eliminated player #3
Eliminated player #6
Eliminated player #2
Eliminated player #7
Eliminated player #5
Eliminated player #1
Winner / Last Survivor is Player #4!`,
    explanationPoints: [
      'Circular linked list natural fit: traversing past the last element immediately resumes at the first element.',
      'Every iteration counts k-1 players, bypasses the k-th node via prev->next = curr->next, and frees the memory.',
      'Termination condition: loop stops when curr->next == curr (only one single node remaining in the circle).'
    ],
    examNote: 'Write mathematical recursive formula in exam for Josephus: J(n, k) = (J(n - 1, k) + k - 1) % n + 1, with base case J(1, k) = 1.',
    vivaTrap: 'Viva Trap: "How to identify if a linked list contains a cycle?" Answer: Use Floyd Cycle-Finding Algorithm (Tortoise and Hare) with slow pointer moving 1 step and fast pointer moving 2 steps. If slow == fast, a cycle exists in O(n) time and O(1) space.'
  },
  {
    id: 'dsa-long-15',
    qNumber: 'Q15',
    title: 'Disjoint Set Union (DSU / Union-Find) with Path Compression and Kruskal MST',
    marks: 5,
    category: 'classes',
    concept: 'Disjoint Set Union (Union-Find) maintains partitioned sets of elements supporting find() (find representative of a set) and union() (merge two sets). Kruskal algorithm uses DSU to build an MST without creating cycles.',
    requirements: [
      'Implement find() with Path Compression (O(alpha(n)) ~ O(1))',
      'Implement unionSets() by Rank to keep trees flat',
      'Sort graph edges in ascending weight',
      'Include edge if endpoints belong to different components'
    ],
    code: `#include <stdio.h>
#include <stdlib.h>

struct Edge {
    int src, dest, weight;
};

struct DSU {
    int parent[20];
    int rank[20];
};

void initDSU(struct DSU* dsu, int n) {
    for (int i = 0; i < n; i++) {
        dsu->parent[i] = i;
        dsu->rank[i] = 0;
    }
}

int find(struct DSU* dsu, int i) {
    // Path compression
    if (dsu->parent[i] != i)
        dsu->parent[i] = find(dsu, dsu->parent[i]);
    return dsu->parent[i];
}

void unionSets(struct DSU* dsu, int x, int y) {
    int rootX = find(dsu, x);
    int rootY = find(dsu, y);
    if (rootX != rootY) {
        if (dsu->rank[rootX] < dsu->rank[rootY])
            dsu->parent[rootX] = rootY;
        else if (dsu->rank[rootX] > dsu->rank[rootY])
            dsu->parent[rootY] = rootX;
        else {
            dsu->parent[rootY] = rootX;
            dsu->rank[rootX]++;
        }
    }
}

int compareEdges(const void* a, const void* b) {
    return ((struct Edge*)a)->weight - ((struct Edge*)b)->weight;
}

int main() {
    int V = 4, E = 5;
    struct Edge edges[] = {
        {0, 1, 10}, {0, 2, 6}, {0, 3, 5}, {1, 3, 15}, {2, 3, 4}
    };

    qsort(edges, E, sizeof(struct Edge), compareEdges);

    struct DSU dsu;
    initDSU(&dsu, V);

    printf("Kruskal MST Edges:\\n");
    int totalCost = 0, edgeCount = 0;
    for (int i = 0; i < E && edgeCount < V - 1; i++) {
        int u = edges[i].src;
        int v = edges[i].dest;
        if (find(&dsu, u) != find(&dsu, v)) {
            printf("%d - %d (weight %d)\\n", u, v, edges[i].weight);
            totalCost += edges[i].weight;
            unionSets(&dsu, u, v);
            edgeCount++;
        }
    }
    printf("Minimum Spanning Tree Cost: %d\\n", totalCost);
    return 0;
}`,
    output: `Kruskal MST Edges:
2 - 3 (weight 4)
0 - 3 (weight 5)
0 - 1 (weight 10)
Minimum Spanning Tree Cost: 19`,
    explanationPoints: [
      'Sort all edges in ascending order of weight: O(E log E).',
      'For each edge (u, v): check find(u) != find(v) to ensure no cycle is formed.',
      'Union the sets containing u and v with rank optimization and path compression.',
      'Stops immediately after selecting exactly V - 1 edges.'
    ],
    examNote: 'Path compression flattens tree structure during find() operations, making amortized time complexity nearly constant: O(alpha(V)) where alpha is the Inverse Ackermann function (never exceeds 4 for any real-world input).',
    vivaTrap: 'Viva Trap: "What is the difference between Prim and Kruskal?" Answer: Kruskal is edge-centric (sorts edges, suitable for sparse graphs E ~ V). Prim is vertex-centric (suitable for dense graphs E ~ V^2).'
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// PART C: 18 3-MARK THEORY QUESTIONS WITH COMPARISON TABLES & DIAGRAMS
// ─────────────────────────────────────────────────────────────────────────────
export const DSA_THEORY_QUESTIONS: TheoryQuestion[] = [
  {
    id: 'dsa-th-1',
    qNumber: 1,
    title: 'Array vs Singly Linked List',
    marks: 3,
    category: 'Linear Structures',
    definition: 'An Array is a contiguous collection of homogeneous elements supporting O(1) random indexing. A Singly Linked List is a linear chain of nodes scattered in heap memory connected via pointers.',
    usesOrRules: [
      { title: 'Contiguity', explanation: 'Arrays require a single uninterrupted memory block. Linked lists allocate individual nodes dynamically on demand.' },
      { title: 'Cache Efficiency', explanation: 'Arrays enjoy exceptional CPU spatial locality; linked lists suffer frequent CPU cache misses due to dispersed pointer dereferencing.' }
    ],
    comparisonTable: {
      headers: ['Feature', 'Array', 'Singly Linked List'],
      rows: [
        ['Memory Layout', 'Strictly contiguous memory cells', 'Dispersed heap nodes linked by pointers'],
        ['Random Access', 'O(1) via base address index math', 'O(n) sequential linear traversal'],
        ['Insertion / Deletion at Head', 'O(n) due to shifting all elements', 'O(1) pointer rewriting'],
        ['Memory Overhead', 'Zero pointer overhead', 'Extra 4-8 bytes per node for next pointer'],
        ['Resizing Flexibility', 'Fixed size (requires reallocation)', 'Dynamic unbounded resizing']
      ]
    },
    examTip: 'Always cite memory cache locality as an advantage of arrays and pointer overhead as a disadvantage of linked lists.',
    diagram: `ARRAY:       [ 10 | 20 | 30 | 40 ] (Contiguous 0x1000..0x100C)
LINKED LIST: [10 | *] -> [20 | *] -> [30 | NULL] (Scattered Heap)`
  },
  {
    id: 'dsa-th-2',
    qNumber: 2,
    title: 'Linear Queue vs Circular Queue',
    marks: 3,
    category: 'Queues',
    definition: 'A Linear Queue inserts at rear and deletes from front linearly. A Circular Queue connects the last position back to the first using modulo arithmetic to prevent false overflow.',
    usesOrRules: [
      { title: 'False Overflow', explanation: 'In a linear queue, when elements are dequeued, empty front positions cannot be reused once rear reaches MAX-1.' },
      { title: 'Pointer Wrap', explanation: 'Circular queue reuses empty front slots via (rear + 1) % MAX == front check.' }
    ],
    comparisonTable: {
      headers: ['Dimension', 'Linear Queue', 'Circular Queue'],
      rows: [
        ['Buffer Discipline', 'Unidirectional linear array', 'Ring buffer with circular index wrapping'],
        ['Full Condition', 'rear == MAX - 1', '(rear + 1) % MAX == front'],
        ['Space Utilization', 'Poor (slots freed by dequeue are wasted)', 'Optimal (all released slots are re-occupied)'],
        ['Pointer Updates', 'rear++, front++', 'rear = (rear + 1) % MAX, front = (front + 1) % MAX']
      ]
    },
    examTip: 'State the false overflow problem clearly and write down the full condition: ((rear + 1) % MAX) == front.',
    diagram: `Linear:   [freed, freed, 30, 40, 50] -> rear=4, cannot insert! (False Overflow)
Circular: [  60 , freed, 30, 40, 50] -> rear wrapped to 0, slot utilized!`
  },
  {
    id: 'dsa-th-3',
    qNumber: 3,
    title: 'Stack vs Queue Data Structures',
    marks: 3,
    category: 'Linear Structures',
    definition: 'A Stack enforces LIFO (Last-In, First-Out) discipline where all insertions and deletions occur at a single top end. A Queue enforces FIFO (First-In, First-Out) discipline where insertions occur at rear and deletions at front.',
    usesOrRules: [
      { title: 'Access Points', explanation: 'Stack has 1 entry/exit point (top). Queue has 2 entry/exit points (front and rear).' },
      { title: 'Primary Usages', explanation: 'Stacks are used in compiler function call stacks, recursion, and undo/redo. Queues are used in CPU process scheduling and print spooling.' }
    ],
    comparisonTable: {
      headers: ['Parameter', 'Stack', 'Queue'],
      rows: [
        ['Discipline', 'LIFO (Last In First Out)', 'FIFO (First In First Out)'],
        ['Endpoints', '1 end (Top)', '2 ends (Front for deletion, Rear for insertion)'],
        ['Core Operations', 'push(), pop(), peek()', 'enqueue(), dequeue(), front()'],
        ['OS Applications', 'Function call stacks, recursion unwinding', 'CPU round-robin scheduling, disk I/O buffers'],
        ['Pointers Maintained', 'Single top pointer', 'Dual front and rear pointers']
      ]
    },
    examTip: 'Give real-world computer science examples: Call Stack for Stacks, Keyboard buffer for Queues.',
    diagram: `STACK (LIFO):  [Top: 30] -> [20] -> [10]  (Push & Pop at Top)
QUEUE (FIFO):  Front -> [10] -> [20] -> [30] <- Rear`
  },
  {
    id: 'dsa-th-4',
    qNumber: 4,
    title: 'Linear Search vs Binary Search',
    marks: 3,
    category: 'Searching',
    definition: 'Linear Search inspects every element sequentially from index 0 to n-1. Binary Search divides a strictly SORTED array into two halves at each step, achieving logarithmic time.',
    usesOrRules: [
      { title: 'Prerequisite', explanation: 'Binary search mandates that the array elements must be pre-sorted. Linear search works on any arbitrary unordered array.' },
      { title: 'Elimination Ratio', explanation: 'Binary search discards 50% of remaining candidates per comparison; linear search discards exactly 1 item per step.' }
    ],
    comparisonTable: {
      headers: ['Criteria', 'Linear Search', 'Binary Search'],
      rows: [
        ['Precondition', 'None (works on unsorted data)', 'Array MUST be sorted in advance'],
        ['Best Time Complexity', 'O(1) (found at index 0)', 'O(1) (found at exact middle index)'],
        ['Average & Worst Time', 'O(n) linear scans', 'O(log n) logarithmic halving'],
        ['Data Structure Support', 'Arrays and Linked Lists', 'Arrays (Linked lists lack O(1) midpoint access)'],
        ['Implementation Complexity', 'Very simple 1-loop scan', 'Requires tracking low, high, and mid pointers']
      ]
    },
    examTip: 'State why binary search is impossible on singly linked lists in O(log n): finding the middle element requires O(n) pointer traversal.',
    diagram: `Linear: [10] -> [25] -> [30] -> [45] -> [50] (checks 1 by 1)
Binary: [10 | 25 | 30 | 45 | 50] -> checks 30 first, eliminates half!`
  },
  {
    id: 'dsa-th-5',
    qNumber: 5,
    title: 'Infix, Prefix, and Postfix Notations',
    marks: 3,
    category: 'Expressions',
    definition: 'Infix places operators between operands (A + B). Prefix (Polish) places operators before operands (+ A B). Postfix (Reverse Polish) places operators after operands (A B +).',
    usesOrRules: [
      { title: 'Parentheses Requirement', explanation: 'Infix requires parentheses and precedence rules to resolve ambiguity. Prefix and Postfix require ZERO parentheses.' },
      { title: 'Stack Parsing', explanation: 'Postfix expressions are directly evaluated by hardware processors using a single LIFO operand stack in one forward linear pass.' }
    ],
    comparisonTable: {
      headers: ['Notation', 'Operator Position', 'Example Expression', 'Hardware Evaluation'],
      rows: [
        ['Infix', 'Between Operands', '(A + B) * C', 'Difficult (requires operator precedence parsing)'],
        ['Prefix (Polish)', 'Before Operands', '* + A B C', 'Evaluated from right to left using operand stack'],
        ['Postfix (RPN)', 'After Operands', 'A B + C *', 'Evaluated from left to right in a single pass']
      ]
    },
    examTip: 'Remember the memory rule: Postfix = Left to Right evaluation. Prefix = Right to Left evaluation.',
    diagram: `Infix:   (A + B) * C
Prefix:  * + A B C
Postfix: A B + C *`
  },
  {
    id: 'dsa-th-6',
    qNumber: 6,
    title: 'Tree vs Graph Data Structures',
    marks: 3,
    category: 'Non-Linear Structures',
    definition: 'A Tree is a restricted, connected, acyclic undirected graph with N nodes and exactly N-1 edges with a designated root node. A Graph is a generalized network of vertices and edges that may contain cycles, disconnected components, and multiple loops.',
    usesOrRules: [
      { title: 'Acyclic Guarantee', explanation: 'Trees can never contain cycles. Graphs can be cyclic or acyclic.' },
      { title: 'Root Node', explanation: 'Trees have a single master root from which all paths originate. Graphs have no standard root.' }
    ],
    comparisonTable: {
      headers: ['Property', 'Tree', 'Graph'],
      rows: [
        ['Cycles', 'Strictly Acyclic (No cycles allowed)', 'Can be Cyclic or Acyclic'],
        ['Number of Edges', 'Exactly N - 1 edges for N nodes', 'Arbitrary (0 up to N*(N-1)/2 edges)'],
        ['Root Node', 'Exactly 1 unique root node', 'No designated root node'],
        ['Paths Between Nodes', 'Exactly 1 unique simple path between any 2 nodes', 'Can have zero, one, or multiple paths'],
        ['Traversal Algorithms', 'Preorder, Inorder, Postorder, Level-Order', 'BFS, DFS with visited[] cycle prevention']
      ]
    },
    examTip: 'Every Tree is a Graph, but not every Graph is a Tree. A Tree is a minimally connected acyclic graph.',
    diagram: `TREE:      (Root) -> [Left] & [Right] (Acyclic, N-1 edges)
GRAPH:     (A) <---> (B) <---> (C) <---> (A) (Contains Cycles)`
  },
  {
    id: 'dsa-th-7',
    qNumber: 7,
    title: 'Breadth First Search (BFS) vs Depth First Search (DFS)',
    marks: 3,
    category: 'Graph Algorithms',
    definition: 'BFS traverses a graph level-by-level using a FIFO Queue. DFS explores branches as deeply as possible before backtracking using a LIFO Stack or recursion.',
    usesOrRules: [
      { title: 'Shortest Path', explanation: 'BFS is guaranteed to find the shortest path in unweighted graphs. DFS does not guarantee shortest path.' },
      { title: 'Backtracking', explanation: 'DFS is ideal for topological sorting, maze solving, and cycle detection.' }
    ],
    comparisonTable: {
      headers: ['Dimension', 'BFS (Breadth First)', 'DFS (Depth First)'],
      rows: [
        ['Data Structure Used', 'FIFO Queue', 'LIFO Stack or Recursion Call Stack'],
        ['Traversal Style', 'Horizontal / Level-by-level', 'Vertical / Deep branch dive then backtrack'],
        ['Shortest Path (Unweighted)', 'Guaranteed optimal shortest path', 'Not guaranteed'],
        ['Memory Complexity', 'O(Width of Graph) - high on bushy trees', 'O(Height of Graph) - low on balanced trees'],
        ['Primary Use Cases', 'GPS shortest route, web crawlers, peer-to-peer', 'Cycle detection, topological sort, puzzle solving']
      ]
    },
    examTip: 'Highlight the memory contrast: BFS space is bounded by maximum tree width; DFS space is bounded by tree height.',
    diagram: `BFS: Level 0 -> Level 1 -> Level 2 (Radial ripples)
DFS: Root -> Leftmost leaf -> Backtrack -> Next branch`
  },
  {
    id: 'dsa-th-8',
    qNumber: 8,
    title: 'Bubble Sort vs Insertion Sort vs Selection Sort',
    marks: 3,
    category: 'Sorting',
    definition: 'All three are O(n^2) elementary sorting algorithms, but differ in their swap mechanisms, adaptive behavior, and stability.',
    usesOrRules: [
      { title: 'Adaptivity', explanation: 'Insertion Sort and optimized Bubble Sort run in O(n) best-case time on nearly sorted arrays. Selection sort is non-adaptive and always takes O(n^2).' },
      { title: 'Swap Count', explanation: 'Selection Sort performs at most O(n) swaps, making it advantageous when write memory cycles are costly.' }
    ],
    comparisonTable: {
      headers: ['Algorithm', 'Best Time', 'Worst Time', 'Swaps (Worst)', 'Stable?'],
      rows: [
        ['Bubble Sort', 'O(n) (with flag)', 'O(n^2)', 'O(n^2) adjacent swaps', 'Yes (Stable)'],
        ['Insertion Sort', 'O(n)', 'O(n^2)', 'O(n^2) element shifts', 'Yes (Stable)'],
        ['Selection Sort', 'O(n^2)', 'O(n^2)', 'O(n) minimum item swaps', 'No (Unstable)']
      ]
    },
    examTip: 'Selection Sort is NOT stable because swapping minimum element over intervening equal elements breaks relative order.',
    diagram: `Bubble:    Adjacent comparisons & pairwise bubbling
Insertion: Shifting elements right to insert in sorted prefix
Selection: Scanning full unsorted tail to find absolute minimum`
  },
  {
    id: 'dsa-th-9',
    qNumber: 9,
    title: 'Quick Sort vs Merge Sort',
    marks: 3,
    category: 'Sorting',
    definition: 'Both are Divide-and-Conquer algorithms. Quick Sort partitions around a pivot in-place. Merge Sort divides array in half and merges sorted sub-arrays using extra memory.',
    usesOrRules: [
      { title: 'Auxiliary Memory', explanation: 'Quick Sort requires O(log n) call stack space. Merge Sort requires O(n) extra buffer space.' },
      { title: 'Worst-Case Guarantee', explanation: 'Merge Sort guarantees O(n log n) in all cases. Quick Sort degrades to O(n^2) on bad pivots.' }
    ],
    comparisonTable: {
      headers: ['Feature', 'Quick Sort', 'Merge Sort'],
      rows: [
        ['Worst Time Complexity', 'O(n^2) (skewed pivot)', 'O(n log n) (guaranteed)'],
        ['Auxiliary Space', 'O(log n) call stack (In-Place)', 'O(n) external array buffer'],
        ['Stability', 'Unstable', 'Stable'],
        ['Cache Locality', 'Excellent (sequential scans)', 'Moderate (hopping between buffers)'],
        ['Best Medium', 'Contiguous Arrays / In-RAM sorting', 'Linked Lists and External Tape/Disk sorting']
      ]
    },
    examTip: 'State in exams: Quick Sort does work in the divide step (partitioning); Merge Sort does work in the combine step (merging).',
    diagram: `Quick: Partition around pivot -> recursively sort parts
Merge: Divide in half -> sort halves -> merge two sorted lists`
  },
  {
    id: 'dsa-th-10',
    qNumber: 10,
    title: 'Collision Resolution: Separate Chaining vs Open Addressing',
    marks: 3,
    category: 'Hashing',
    definition: 'When two keys hash to the same bucket: Separate Chaining attaches colliding keys to a linked list at that bucket. Open Addressing probes for an alternate empty slot in the main table.',
    usesOrRules: [
      { title: 'Load Factor', explanation: 'Separate Chaining supports load factors lambda > 1. Open Addressing requires lambda < 1 (table must never be 100% full).' },
      { title: 'Memory Overhead', explanation: 'Chaining allocates heap pointers per item; open addressing stores all items directly inside table array slots.' }
    ],
    comparisonTable: {
      headers: ['Criterion', 'Separate Chaining', 'Open Addressing (Linear Probing)'],
      rows: [
        ['Data Structure', 'Array of Linked Lists / Buckets', 'Single flat continuous array'],
        ['Load Factor (lambda)', 'Can exceed 1.0 (unbounded)', 'Must remain strictly < 1.0 (< 0.7 recommended)'],
        ['Clustering', 'No clustering effects', 'Suffers from Primary and Secondary clustering'],
        ['Deletion Simplicity', 'Trivial (standard linked list node delete)', 'Requires DELETED (Tombstone) markers'],
        ['Cache Performance', 'Poor (pointer chasing across heap)', 'Excellent (sequential array scanning)']
      ]
    },
    examTip: 'Remember the formula for Load Factor: lambda = N / M (Number of keys / Number of slots).',
    diagram: `Chaining:       Slot[3] -> [Key 10] -> [Key 17] -> [Key 24] -> NULL
Open Address:   Slot[3]: 10 | Slot[4]: 17 | Slot[5]: 24 (Linear Probed)`
  },
  {
    id: 'dsa-th-11',
    qNumber: 11,
    title: 'Adjacency Matrix vs Adjacency List for Graph Representation',
    marks: 3,
    category: 'Graphs',
    definition: 'An Adjacency Matrix is a V x V 2D boolean/weight matrix. An Adjacency List is an array of V linked lists where list[u] stores all adjacent neighbors of vertex u.',
    usesOrRules: [
      { title: 'Space Efficiency', explanation: 'Matrix takes O(V^2) space regardless of edges. List takes O(V + E) space, optimal for sparse graphs.' },
      { title: 'Edge Query', explanation: 'Checking if edge (u, v) exists takes O(1) in matrix; takes O(degree(u)) in list.' }
    ],
    comparisonTable: {
      headers: ['Metric', 'Adjacency Matrix', 'Adjacency List'],
      rows: [
        ['Space Complexity', 'O(V^2) (fixed)', 'O(V + E) (proportional to edges)'],
        ['Edge Existence Check (u, v)', 'O(1) direct index lookup', 'O(degree(u)) list search'],
        ['Iterating All Neighbors of u', 'O(V) full row scan', 'O(degree(u)) traverses only actual neighbors'],
        ['Adding a New Vertex', 'O(V^2) full matrix reallocation', 'O(1) append to array of lists'],
        ['Optimal Graph Type', 'Dense Graphs (E ~ V^2)', 'Sparse Graphs (E << V^2)']
      ]
    },
    examTip: 'Most real-world networks (social graphs, road maps) are sparse (E << V^2), making Adjacency List the practical standard.',
    diagram: `Matrix: 5x5 grid with 0s and 1s (25 cells)
List:   0: [1] -> [2] -> NULL
        1: [0] -> [3] -> NULL`
  },
  {
    id: 'dsa-th-12',
    qNumber: 12,
    title: 'Binary Tree vs Binary Search Tree (BST)',
    marks: 3,
    category: 'Trees',
    definition: 'A Binary Tree is a tree where each node has at most 2 children without ordering constraints. A Binary Search Tree enforces that left subtree keys < node key < right subtree keys.',
    usesOrRules: [
      { title: 'Ordering', explanation: 'Binary Tree has arbitrary key positions. BST maintains strict sorted hierarchy.' },
      { title: 'Search Efficiency', explanation: 'Searching a binary tree requires O(n) full scan. Searching a balanced BST takes O(log n).' }
    ],
    comparisonTable: {
      headers: ['Attribute', 'General Binary Tree', 'Binary Search Tree (BST)'],
      rows: [
        ['Ordering Constraint', 'None (children can have any values)', 'LeftSubtree < Root < RightSubtree'],
        ['Search Time Complexity', 'O(n) (must inspect every node)', 'O(log n) average, O(n) skewed worst case'],
        ['Inorder Traversal Output', 'Arbitrary unordered sequence', 'Strictly monotonically sorted ascending sequence'],
        ['Duplicate Keys', 'Can be placed anywhere', 'Typically prohibited or tracked via counters']
      ]
    },
    examTip: 'The signature property of a BST is that Inorder traversal visits keys in ascending order.',
    diagram: `Binary Tree:     [50] -> Left: [80], Right: [20] (Arbitrary)
BST:             [50] -> Left: [20], Right: [80] (20 < 50 < 80)`
  },
  {
    id: 'dsa-th-13',
    qNumber: 13,
    title: 'Complete vs Full vs Perfect Binary Tree',
    marks: 3,
    category: 'Trees',
    definition: 'Full Binary Tree: every node has either 0 or 2 children. Complete Binary Tree: all levels are fully filled except possibly the last, which is filled from left to right. Perfect Binary Tree: all internal nodes have 2 children and all leaves are at the exact same level.',
    usesOrRules: [
      { title: 'Array Mapping', explanation: 'Complete binary trees can be packed into arrays without empty holes, making them the standard foundation for Heaps.' },
      { title: 'Node Count Formula', explanation: 'A perfect binary tree of height h contains exactly 2^(h+1) - 1 nodes.' }
    ],
    comparisonTable: {
      headers: ['Tree Type', 'Node Degree Condition', 'Leaf Position Rule', 'Array Packing'],
      rows: [
        ['Full Binary Tree', 'Every node has exactly 0 or 2 children', 'Leaves can be at varying depths', 'May leave array gaps'],
        ['Complete Binary Tree', 'Nodes can have 0, 1, or 2 children', 'Last level filled left-to-right', 'Zero array gaps (used in Heaps)'],
        ['Perfect Binary Tree', 'All internal nodes have exactly 2 children', 'All leaves at the exact same bottom level', 'Zero gaps, maximum density']
      ]
    },
    examTip: 'Draw a 3-level tree showing the difference between Complete (left-packed leaf) and Full (no 1-child nodes).',
    diagram: `Full:     Node has 0 or 2 kids
Complete: All filled, bottom packed LEFT-to-RIGHT
Perfect:  Every level completely full (Triangle)`
  },
  {
    id: 'dsa-th-14',
    qNumber: 14,
    title: 'Dynamic Memory Allocation in C: malloc() vs calloc() vs realloc() vs free()',
    marks: 3,
    category: 'Memory Management',
    definition: 'Dynamic memory functions in <stdlib.h> allocate, resize, and release heap memory at runtime.',
    usesOrRules: [
      { title: 'Zero Initialization', explanation: 'calloc() zeros out allocated memory; malloc() leaves raw uninitialized garbage values.' },
      { title: 'Heap Fragmentation', explanation: 'Always set freed pointers to NULL (ptr = NULL) to eliminate dangling pointers.' }
    ],
    comparisonTable: {
      headers: ['Function', 'Syntax', 'Initialization', 'Primary Use Case'],
      rows: [
        ['malloc()', 'void* malloc(size_t size)', 'Uninitialized garbage values', 'Allocating single buffers or structs'],
        ['calloc()', 'void* calloc(size_t n, size_t size)', 'Zero-initialized (all bytes set to 0)', 'Allocating zeroed arrays/hash buckets'],
        ['realloc()', 'void* realloc(void* ptr, size_t new_size)', 'Preserves existing data, garbage for expansion', 'Dynamically growing/shrinking capacity'],
        ['free()', 'void free(void* ptr)', 'Releases heap memory block back to OS', 'Preventing fatal memory leaks']
      ]
    },
    examTip: 'Always check if returned pointer is NULL before accessing: if (ptr == NULL) { handle_oom(); }.',
    diagram: `malloc(40):  [ ?? | ?? | ?? | ?? ] (Garbage bytes)
calloc(4, 10): [ 00 | 00 | 00 | 00 ] (Zeroed out)`
  },
  {
    id: 'dsa-th-15',
    qNumber: 15,
    title: 'Asymptotic Notations: Big-O, Big-Omega, and Big-Theta',
    marks: 3,
    category: 'Complexity Analysis',
    definition: 'Asymptotic notations describe algorithm runtime growth rate as input size n approaches infinity. Big-O represents asymptotic upper bound, Big-Omega represents asymptotic lower bound, and Big-Theta represents asymptotically tight bound.',
    usesOrRules: [
      { title: 'Mathematical Definition', explanation: 'f(n) is O(g(n)) if there exist positive constants c and n0 such that 0 <= f(n) <= c*g(n) for all n >= n0.' },
      { title: 'Tight Bound', explanation: 'f(n) is Theta(g(n)) if and only if f(n) is both O(g(n)) and Omega(g(n)).' }
    ],
    comparisonTable: {
      headers: ['Notation', 'Mathematical Meaning', 'Bound Type', 'Engineering Interpretation'],
      rows: [
        ['Big-O (O)', 'f(n) <= c * g(n)', 'Asymptotic Upper Bound', 'Guaranteed worst-case performance ceiling'],
        ['Big-Omega (Omega)', 'f(n) >= c * g(n)', 'Asymptotic Lower Bound', 'Best-case minimum execution floor'],
        ['Big-Theta (Theta)', 'c1*g(n) <= f(n) <= c2*g(n)', 'Asymptotically Tight Bound', 'Exact growth rate in all normal cases']
      ]
    },
    examTip: 'Draw the 3 bounding graphs showing c*g(n) above f(n) for Big-O, below for Big-Omega, and sandwiching f(n) for Big-Theta.',
    diagram: `Big-O:     c*g(n) >= f(n) (Ceiling)
Big-Omega: c*g(n) <= f(n) (Floor)
Big-Theta: c1*g(n) <= f(n) <= c2*g(n) (Sandwich)`
  },
  {
    id: 'dsa-th-16',
    qNumber: 16,
    title: 'Singly Linked List vs Doubly Linked List',
    marks: 3,
    category: 'Linear Structures',
    definition: 'A Singly Linked List (SLL) has nodes with 1 pointer (next). A Doubly Linked List (DLL) has nodes with 2 pointers (next and prev), allowing bidirectional navigation.',
    usesOrRules: [
      { title: 'Bidirectional Traversal', explanation: 'DLL can traverse backward in O(1) step; SLL requires restarting from head.' },
      { title: 'Node Deletion', explanation: 'Given a pointer to node X, DLL can delete X in O(1) time without knowing head; SLL requires O(n) search to find X predecessor.' }
    ],
    comparisonTable: {
      headers: ['Feature', 'Singly Linked List (SLL)', 'Doubly Linked List (DLL)'],
      rows: [
        ['Pointers Per Node', '1 pointer (next)', '2 pointers (next and prev)'],
        ['Memory Overhead', 'Lower (4/8 bytes per node)', 'Higher (8/16 bytes per node)'],
        ['Traversal Direction', 'Forward only (unidirectional)', 'Both Forward and Backward (bidirectional)'],
        ['Deletion Given Node Pointer', 'O(n) (must traverse to locate predecessor)', 'O(1) (node->prev->next = node->next)'],
        ['Implementation Complexity', 'Simpler pointer manipulation', 'Requires updating both forward and reverse links']
      ]
    },
    examTip: 'Cite browser back/forward history or music playlist previous/next track as prime use cases for Doubly Linked Lists.',
    diagram: `SLL: [10 | *] ---> [20 | *] ---> [30 | NULL]
DLL: NULL <--- [10 | * | *] <===> [20 | * | *] <===> [30 | * | NULL]`
  },
  {
    id: 'dsa-th-17',
    qNumber: 17,
    title: 'Graph Representation: Adjacency List vs Adjacency Multi-List',
    marks: 3,
    category: 'Graphs',
    definition: 'An Adjacency List stores edges separately in lists per vertex. An Adjacency Multi-List shares single edge nodes between both incident vertices, preventing duplicate edge representations in undirected graphs.',
    usesOrRules: [
      { title: 'Undirected Redundancy', explanation: 'In standard adjacency lists, an undirected edge (u, v) is duplicated in list[u] and list[v]. Multi-list uses a single edge record with dual pointers.' },
      { title: 'Edge Marking', explanation: 'Multi-lists allow marking an edge as visited in O(1) for both endpoints simultaneously.' }
    ],
    comparisonTable: {
      headers: ['Feature', 'Adjacency List', 'Adjacency Multi-List'],
      rows: [
        ['Edge Duplication', 'Edge (u, v) stored twice in undirected graph', 'Edge (u, v) stored exactly ONCE in memory'],
        ['Node Structure', 'Contains dest and next pointer', 'Contains vertex1, vertex2, path1, and path2 pointers'],
        ['Memory for Undirected Edges', '2 * E list nodes', 'E multi-list nodes'],
        ['Marking Visited Edges', 'Requires updating 2 separate list entries', 'Single boolean flag marks edge for both endpoints']
      ]
    },
    examTip: 'Adjacency Multi-List is particularly useful in computer graphics and mesh wireframes where edges carry heavy physics/render properties.',
    diagram: `Multi-List Node: [ Mark | V1 | V2 | Path_for_V1 | Path_for_V2 ]`
  },
  {
    id: 'dsa-th-18',
    qNumber: 18,
    title: 'Minimum Spanning Tree: Kruskal vs Prim Algorithms',
    marks: 3,
    category: 'Graph Algorithms',
    definition: 'Both algorithms construct a Minimum Spanning Tree (MST) with V-1 edges of minimum total weight. Kruskal uses a Greedy Edge-Sort approach with Union-Find; Prim uses a Greedy Vertex-Growing approach.',
    usesOrRules: [
      { title: 'Graph Density', explanation: 'Kruskal is faster on sparse graphs (E ~ V); Prim is faster on dense graphs (E ~ V^2).' },
      { title: 'Intermediate States', explanation: 'Kruskal creates a forest of trees that merge; Prim always maintains a single growing connected tree.' }
    ],
    comparisonTable: {
      headers: ['Feature', 'Kruskal Algorithm', 'Prim Algorithm'],
      rows: [
        ['Approach Strategy', 'Edge-centric: Sorts all edges globally', 'Vertex-centric: Grows tree from single seed vertex'],
        ['Core Data Structure', 'Disjoint Set Union (DSU / Union-Find)', 'Priority Queue (Binary Min-Heap) or Matrix'],
        ['Time Complexity', 'O(E log E) or O(E log V)', 'O(V^2) with matrix, O(E log V) with heap'],
        ['Intermediate Topology', 'Forest of disconnected sub-trees', 'Single continuous growing connected tree'],
        ['Optimal Graph Topology', 'Sparse Graphs (few edges)', 'Dense Graphs (many edges)']
      ]
    },
    examTip: 'Both algorithms find the optimal MST cost. If all edge weights are distinct, the MST is mathematically unique.',
    diagram: `Kruskal: Sort edges globally -> Pick cheapest without cycle (Forest -> Tree)
Prim:    Start at Node 0 -> Pick cheapest neighbor cut edge (Growing single tree)`
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// PART D: EXAM STRATEGY, 6 FATAL MISTAKES, REVISION TABLE & 10 QUICK MCQS
// ─────────────────────────────────────────────────────────────────────────────
export const DSA_EXAM_STRATEGY = [
  {
    part: 'Part A (Output & Pointer Traces)',
    marks: '10 Marks',
    timeAllocation: '15 Minutes',
    strategy: 'Draw pointer diagrams and stack frames on rough page. Write final output in clean mono-spaced font. Explicitly state the underlying mathematical or memory rule.'
  },
  {
    part: 'Part B (5-Mark Programming Implementations)',
    marks: '25 Marks',
    timeAllocation: '60 Minutes',
    strategy: 'Use the 4-tier formula: (1) Concept & ADT Definition [1 mark], (2) Complete C Code with struct definitions [2.5 marks], (3) Exact Sample Output [1 mark], (4) Step-by-Step Explanation & Viva Trap [0.5 mark].'
  },
  {
    part: 'Part C (3-Mark Comparative Theory)',
    marks: '25 Marks',
    timeAllocation: '35 Minutes',
    strategy: 'Always provide a minimum of 3-to-4 rows of comparative tables plus a labeled ASCII memory diagram. Examiners award full marks for formatted tables over prose paragraphs.'
  },
  {
    part: 'Part D (Final Review & Edge Cases)',
    marks: '10 Marks',
    timeAllocation: '10 Minutes',
    strategy: 'Check boundary checks: NULL pointers, empty stack/queue underflow, full circular queue wrap-around, and free() memory releases.'
  }
];

export const DSA_FATAL_MISTAKES = [
  {
    mistake: 'Passing a single pointer (struct Node* head) to a function modifying head.',
    consequence: 'C passes pointers by value! The caller head variable remains unmodified, producing empty or corrupted lists.',
    remedy: 'Always pass a double pointer (struct Node** headRef) and dereference (*headRef = newNode).'
  },
  {
    mistake: 'Reversing postfix operand pop order (calculating op2 - op1 instead of op1 - op2).',
    consequence: 'Yields inverted subtraction/division arithmetic results (e.g., 2 - 30 = -28 instead of 30 - 2 = 28).',
    remedy: 'The FIRST popped value is op2; the SECOND popped value is op1. Evaluate op1 <operator> op2.'
  },
  {
    mistake: 'Confusing Circular Queue isFull() with isEmpty() conditions.',
    consequence: 'Overwrites existing elements or falsely rejects insertions on empty queues.',
    remedy: 'Memorize: isFull() is ((rear + 1) % MAX) == front. isEmpty() is front == -1.'
  },
  {
    mistake: 'Forgetting to call free(ptr) when deleting nodes or dynamically allocated arrays.',
    consequence: 'Creates silent heap memory leaks; deductions under university coding rubrics.',
    remedy: 'Always free detached nodes immediately after adjusting surrounding pointer links.'
  },
  {
    mistake: 'Assuming Quick Sort worst-case time complexity is O(n log n).',
    consequence: 'Instant loss of marks in complexity analysis questions.',
    remedy: 'Quick Sort worst case is O(n^2) (when array is already sorted and pivot is extreme). Average case is O(n log n).'
  },
  {
    mistake: 'Writing Dijkstra algorithm for graphs with negative edge weights.',
    consequence: 'Examiner marks question incorrect with zero marks.',
    remedy: 'Explicitly state: Dijkstra requires non-negative weights. Bellman-Ford must be used for negative edge weights.'
  }
];

export const DSA_REVISION_TABLE: McqRevisionItem[] = [
  { topic: 'Array Access', remember: 'O(1) random access via index arithmetic Base + i * size' },
  { topic: 'Singly Linked List Search', remember: 'O(n) sequential scan; cannot use binary search' },
  { topic: 'Stack Discipline', remember: 'LIFO (Last In First Out); single Top pointer' },
  { topic: 'Queue Discipline', remember: 'FIFO (First In First Out); Front for pop, Rear for push' },
  { topic: 'Circular Queue Full Check', remember: '((rear + 1) % MAX) == front' },
  { topic: 'Infix to Postfix Stack', remember: 'Stores OPERATORS and parentheses; operands output directly' },
  { topic: 'Postfix Evaluation Stack', remember: 'Stores OPERANDS; pop op2 then op1, compute op1 op op2' },
  { topic: 'BST Inorder Traversal', remember: 'Always yields strictly ascending sorted keys' },
  { topic: 'AVL Tree Balance Factor', remember: 'Height(Left) - Height(Right) in {-1, 0, +1}' },
  { topic: 'Quick Sort Partition', remember: 'Hoare partition is faster; worst-case time is O(n^2)' },
  { topic: 'Merge Sort Guarantee', remember: 'Guaranteed O(n log n) in all cases; requires O(n) space' },
  { topic: 'Dijkstra Assumption', remember: 'Greedy choice; fails on negative edge weights' },
  { topic: 'Prim vs Kruskal', remember: 'Prim grows 1 tree (dense graphs); Kruskal connects edges via DSU (sparse graphs)' },
  { topic: 'Hash Table Linear Probing', remember: 'h(k, i) = (h(k) + i) % M; suffers from primary clustering' },
  { topic: 'Hash Deletion Marker', remember: 'Tombstone (DELETED) prevents premature search termination' },
  { topic: 'Heap Structure', remember: 'Complete binary tree stored contiguously in an array' }
];

export const DSA_QUICK_MCQS: QuickMcq[] = [
  {
    question: 'What is the balance factor of a node in an AVL tree allowed to be?',
    answer: '-1, 0, or +1',
    explanation: 'If Balance Factor = Height(Left) - Height(Right) becomes +2 or -2, tree rotations are performed to restore balance.'
  },
  {
    question: 'Which sorting algorithm is guaranteed to run in O(n log n) time and is stable?',
    answer: 'Merge Sort',
    explanation: 'Merge Sort divides array in half and merges sorted halves, strictly preserving original relative order for identical keys in O(n log n).'
  },
  {
    question: 'What is the time complexity to insert a node at the head of a Singly Linked List?',
    answer: 'O(1)',
    explanation: 'newNode->next = head; head = newNode; requires no shifting regardless of list size.'
  },
  {
    question: 'Which data structure is fundamentally used for Breadth First Search (BFS)?',
    answer: 'Queue (FIFO)',
    explanation: 'BFS explores vertices level by level using a First-In, First-Out Queue.'
  },
  {
    question: 'How many edges are present in a Minimum Spanning Tree of a connected graph with V vertices?',
    answer: 'V - 1 edges',
    explanation: 'An MST connects all V vertices with the minimum number of edges without containing any cycles, exactly V - 1.'
  },
  {
    question: 'What mathematical condition identifies that a circular queue of capacity N is completely full?',
    answer: '(rear + 1) % N == front',
    explanation: 'Modulo arithmetic tests if advancing rear by 1 step would collide with the current front pointer.'
  },
  {
    question: 'In evaluating a postfix expression using a stack, what is the first popped element when an operator arrives?',
    answer: 'Operand 2 (the right-hand operand)',
    explanation: 'Because operands are pushed in left-to-right order, the second operand sits on top of the stack.'
  },
  {
    question: 'What is the worst-case time complexity of searching in a skewed Binary Search Tree?',
    answer: 'O(n)',
    explanation: 'When keys are inserted in sorted order, the BST degenerates into a linear linked list of depth n.'
  },
  {
    question: 'Why does Dijkstra algorithm fail on graphs with negative edge weights?',
    answer: 'Visited nodes are never revisited, even if a negative edge later creates a shorter path.',
    explanation: 'Dijkstra greedy assumption asserts that closed nodes already have finalized optimal distances.'
  },
  {
    question: 'Which collision resolution technique does NOT suffer from primary clustering?',
    answer: 'Separate Chaining (or Double Hashing)',
    explanation: 'Separate Chaining stores colliding keys in dynamic linked lists outside the primary array, eliminating continuous block accumulation.'
  }
];
