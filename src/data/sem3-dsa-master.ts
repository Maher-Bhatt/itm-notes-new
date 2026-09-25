import { Subject } from './types';

export const sem3DsaMaster: Subject = {
  id: 'sem3-dsa',
  name: 'Data Structures and Algorithms (DSA)',
  code: 'DSA301',
  color: 'bg-green-600',
  icon: 'database',
  description: 'Comprehensive study material for Data Structures and Algorithms.',
  semester: 3,
  units: [
    {
      id: 'u1',
      title: 'Introduction to Data Structures & Complexity Analysis',
      description: 'Basics of DSA, time and space complexity, and recursion.',
      topics: [
        {
          id: 't1-1',
          title: 'Types of Data Structures (Linear vs Non-Linear)',
          simpleExplanation: 'Data structures are ways to store and organize data. Linear means data is in a line, non-linear means it is connected randomly or in branches.',
          detailedExplanation: `## Introduction to Data Structures

Data structures are fundamental concepts in computer science used to store, organize, and manage data efficiently so that it can be accessed and modified easily. Choosing the right data structure for a specific problem can greatly improve the performance of an algorithm.

### 1. Linear Data Structures
In linear data structures, elements are arranged in a sequential or linear order, where each element is connected to its previous and next adjacent elements. They are easier to implement because data is arranged in a single level.
- **Arrays**: A collection of items stored at contiguous memory locations. Elements can be accessed randomly using their indices.
- **Linked Lists**: A sequence of elements where every element points to the next element. They allow dynamic memory allocation.
- **Stacks**: Follows the Last-In-First-Out (LIFO) principle. Think of a stack of plates.
- **Queues**: Follows the First-In-First-Out (FIFO) principle. Think of a queue of people at a ticket counter.

### 2. Non-Linear Data Structures
In non-linear data structures, elements are not arranged in a sequence. Elements can be connected to multiple other elements in a hierarchical or network manner. They are more complex but better for certain types of relationships.
- **Trees**: A hierarchical data structure consisting of nodes connected by edges, with a single root node.
- **Graphs**: A network of nodes (vertices) connected by edges. There are no rules about how nodes must be connected.

### Differences
- **Memory Layout**: Linear is sequential; Non-Linear is scattered (usually).
- **Access Method**: Linear often allows straightforward iteration. Non-linear requires traversal algorithms like BFS or DFS.
- **Complexity**: Linear structures are relatively easy to implement; Non-linear structures are harder but often provide better efficiency for search and hierarchical data mapping.`,
          shortNotes: 'Linear: Data in sequence (Array, Stack). Non-Linear: Data in hierarchy/network (Tree, Graph).',
          examples: [
            {
              title: 'Declaring Linear vs Non-Linear in C',
              code: `// Linear: Array
int arr[5] = {1, 2, 3, 4, 5};

// Non-Linear: Tree Node
struct Node {
    int data;
    struct Node* left;
    struct Node* right;
};`,
              explanation: 'Arrays store sequentially, while tree nodes use pointers to branch out.'
            }
          ],
          keyPoints: [
            'Data structures organize data in memory.',
            'Linear DS: Arrays, Stacks, Queues, Linked Lists.',
            'Non-Linear DS: Trees, Graphs.',
            'Linear structures are sequential.',
            'Non-linear structures represent hierarchical relationships.'
          ],
          mcqs: [
            {
              question: 'Which of the following is a linear data structure?',
              options: ['Tree', 'Graph', 'Array', 'None'],
              correctAnswer: 'Array',
              explanation: 'Arrays store data in a linear sequence.'
            }
          ]
        },
        {
          id: 't1-2',
          title: 'Time Complexity (Big O, Omega, Theta)',
          simpleExplanation: 'Time complexity is a way to measure how the time taken by an algorithm grows as the input size grows.',
          detailedExplanation: `## Time Complexity Analysis

Time complexity is the computational complexity that describes the amount of computer time it takes to run an algorithm as a function of the size of the input.

### Asymptotic Notations
To mathematically describe time complexity, we use asymptotic notations. They give us the limit of the algorithm's performance.

#### 1. Big-O Notation (O)
Big-O describes the **upper bound** or worst-case scenario. It guarantees that the algorithm will not take more time than specified.
- For example, if an algorithm is O(n), in the worst case, the time will grow linearly with the input size n.
- It is the most commonly used notation because we usually care about the worst-case time limit.

#### 2. Omega Notation (Ω)
Omega describes the **lower bound** or best-case scenario. It indicates the minimum amount of time an algorithm will take.
- If an algorithm is Ω(n), it will take at least n steps in the best case.

#### 3. Theta Notation (Θ)
Theta describes the **exact bound** or average-case scenario. It bounds the algorithm from both above and below.
- If an algorithm is Θ(n), its time complexity grows strictly linearly in all reasonable cases.

### Common Time Complexities
- **O(1)**: Constant time (e.g., accessing an array element).
- **O(log n)**: Logarithmic time (e.g., binary search).
- **O(n)**: Linear time (e.g., simple loop).
- **O(n log n)**: Linearithmic time (e.g., merge sort).
- **O(n²)**: Quadratic time (e.g., nested loops).
- **O(2^n)**: Exponential time (e.g., naive recursive Fibonacci).

Analyzing loops, recursions, and data structure operations using these notations helps developers choose the optimal algorithm.`,
          shortNotes: 'Big-O: Worst case (Upper Bound). Omega: Best case (Lower Bound). Theta: Average case (Exact Bound).',
          examples: [
            {
              title: 'O(n) Example',
              code: `void printArray(int arr[], int n) {
    for (int i = 0; i < n; i++) { // Runs n times
        printf("%d ", arr[i]);
    }
}`,
              explanation: 'The loop runs n times, giving a time complexity of O(n).'
            }
          ],
          keyPoints: [
            'Time complexity evaluates execution time growth relative to input size.',
            'Big-O is the upper bound (worst-case).',
            'Omega is the lower bound (best-case).',
            'Theta is the tight bound (average-case).',
            'Lower complexity means a more efficient algorithm.'
          ],
          mcqs: [
            {
              question: 'What does Big-O notation describe?',
              options: ['Best case', 'Average case', 'Worst case', 'Memory limit'],
              correctAnswer: 'Worst case',
              explanation: 'Big-O represents the upper bound or worst-case scenario of an algorithm.'
            }
          ]
        },
        {
          id: 't1-3',
          title: 'Space Complexity',
          simpleExplanation: 'Space complexity measures how much memory an algorithm uses as the input size grows.',
          detailedExplanation: `## Space Complexity

Space complexity is a measure of the amount of working storage an algorithm needs to complete its execution. It is crucial when designing software for devices with limited memory.

### Components of Space Complexity
Space complexity is composed of two parts:
1. **Fixed Part**: Memory needed for variables, constants, and program code. This is independent of the input size.
2. **Variable Part**: Memory needed for variables whose size depends on the problem size (e.g., dynamic arrays, recursion stack space).

### Calculating Space Complexity
We express space complexity using Big-O notation, just like time complexity.
- **Auxiliary Space**: The extra or temporary space used by an algorithm. Often, "space complexity" in interviews refers specifically to auxiliary space.
- Total Space = Auxiliary Space + Space used by input variables.

### Examples
- A simple loop variable takes **O(1)** space.
- An array of size n takes **O(n)** space.
- A 2D matrix of size n x n takes **O(n²)** space.
- Recursive functions use the call stack, so a recursion depth of n takes **O(n)** auxiliary space.

### Time-Space Tradeoff
Often, you can reduce the time complexity of an algorithm by using more space (e.g., using a hash map to cache results). Conversely, you can reduce space usage by accepting a longer running time (e.g., recalculating values instead of storing them).`,
          shortNotes: 'Space complexity = Fixed Space + Variable (Input-dependent) Space.',
          examples: [
            {
              title: 'O(n) Space Example',
              code: `int* createArray(int n) {
    int* arr = (int*)malloc(n * sizeof(int)); // Allocates space for n integers
    return arr;
}`,
              explanation: 'The algorithm allocates memory proportional to the input size n, making its space complexity O(n).'
            }
          ],
          keyPoints: [
            'Space complexity measures memory usage.',
            'Includes fixed part and variable part.',
            'Auxiliary space is the extra temporary space used.',
            'Recursion adds to space complexity via the call stack.'
          ],
          mcqs: [
            {
              question: 'What does auxiliary space refer to?',
              options: ['Total memory used', 'Extra space used by the algorithm temporarily', 'Memory for the code', 'Memory for the input'],
              correctAnswer: 'Extra space used by the algorithm temporarily',
              explanation: 'Auxiliary space is the temporary or extra space used by an algorithm excluding the input data.'
            }
          ]
        },
        {
          id: 't1-4',
          title: 'Recursion and its analysis',
          simpleExplanation: 'Recursion is when a function calls itself to solve a smaller version of the same problem.',
          detailedExplanation: `## Recursion

Recursion is a programming technique where a function calls itself in order to solve a problem. The problem is broken down into smaller, simpler sub-problems until a base case is reached.

### Essential Components of Recursion
1. **Base Case**: The condition under which the function stops calling itself. Without a base case, the function will recurse infinitely, leading to a stack overflow error.
2. **Recursive Step**: The part of the function that breaks the problem down into a smaller piece and calls the function itself.

### How Recursion Works
When a recursive function is called, its execution state (variables, parameters, return address) is pushed onto the call stack. When a base case is reached, the function returns, and the previous function states are popped off the stack, completing their execution.

### Analyzing Recursion
- **Time Complexity**: Often determined by the number of recursive calls made. For example, a naive Fibonacci recursive function calls itself twice per step, leading to O(2^n) time.
- **Space Complexity**: Determined by the maximum depth of the call stack. A recursion that goes n levels deep will have a space complexity of O(n).

### Pros and Cons
- **Pros**: Can make code much cleaner and easier to understand for problems like tree traversal or complex mathematical sequences.
- **Cons**: Can be slow and use a lot of memory due to the overhead of multiple function calls and stack frames. Iterative solutions are generally more efficient.`,
          shortNotes: 'Recursion requires a base case to stop. Uses the call stack, impacting space complexity.',
          examples: [
            {
              title: 'Recursive Factorial in C',
              code: `int factorial(int n) {
    if (n == 0 || n == 1) // Base case
        return 1;
    return n * factorial(n - 1); // Recursive step
}`,
              explanation: 'Calculates the factorial of a number by recursively calling itself until n is 1 or 0.'
            }
          ],
          keyPoints: [
            'Recursion involves a function calling itself.',
            'MUST have a base case to prevent infinite loops (stack overflow).',
            'Space complexity is usually O(n) due to the call stack.',
            'Recurrence relations can be solved using the Master Theorem.'
          ],
          mcqs: [
            {
              question: 'What happens if a recursive function lacks a base case?',
              options: ['It runs faster', 'It returns 0', 'It causes a Stack Overflow', 'It converts to iteration'],
              correctAnswer: 'It causes a Stack Overflow',
              explanation: 'Without a base case, recursion continues infinitely, exhausting the call stack memory.'
            }
          ]
        }
      ]
    },
    {
      id: 'u2',
      title: 'Arrays, Strings & Linked Lists',
      description: 'Core linear data structures and string manipulation.',
      topics: [
        {
          id: 't2-1',
          title: 'Arrays (1D, 2D, operations)',
          simpleExplanation: 'An array stores multiple items of the same type sequentially in memory.',
          detailedExplanation: `## Arrays

An array is a collection of elements, all of the same data type, stored in contiguous memory locations.

### 1D Arrays
A one-dimensional array is like a list of variables of the same type.
- Elements are accessed using an index, starting from 0.
- Size must be defined at the time of creation (in static arrays).

### 2D Arrays
A two-dimensional array can be visualized as a grid or a table with rows and columns. It is an array of arrays.
- Elements are accessed using two indices: \`arr[row][column]\`.
- Stored in memory either in row-major or column-major order.

### Core Operations
1. **Traversal**: Visiting every element of the array. Time: O(n).
2. **Insertion**: Adding a new element. If at the end, O(1). If in the middle, O(n) as elements must be shifted.
3. **Deletion**: Removing an element. Requires shifting subsequent elements to fill the gap. Time: O(n).
4. **Search**: Finding an element. O(n) for linear search, O(log n) for binary search (if sorted).

### Advantages and Disadvantages
- **Advantages**: Constant time O(1) random access using index. Easy to implement.
- **Disadvantages**: Fixed size. Costly insertions and deletions due to shifting.`,
          shortNotes: 'Arrays offer O(1) random access but O(n) insertions/deletions.',
          examples: [
            {
              title: '2D Array Traversal',
              code: `int matrix[2][3] = {{1, 2, 3}, {4, 5, 6}};
for(int i=0; i<2; i++) {
    for(int j=0; j<3; j++) {
        printf("%d ", matrix[i][j]);
    }
    printf("\\n");
}`,
              explanation: 'Prints the elements of a 2x3 matrix.'
            }
          ],
          keyPoints: [
            'Arrays use contiguous memory.',
            'Zero-based indexing is standard.',
            'Random access is O(1).',
            'Insertions/Deletions are O(n).'
          ],
          mcqs: [
            {
              question: 'What is the time complexity of accessing an element in an array by its index?',
              options: ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'],
              correctAnswer: 'O(1)',
              explanation: 'Arrays allow direct random access using index arithmetic, which takes constant time.'
            }
          ]
        },
        {
          id: 't2-2',
          title: 'Strings and Pattern Matching',
          simpleExplanation: 'Strings are arrays of characters. Pattern matching is finding a smaller string inside a larger one.',
          detailedExplanation: `## Strings

In most languages (like C), a string is essentially a 1D array of characters terminated by a null character (\`\\0\`). Strings are used to store textual data.

### String Operations
Common string operations include length calculation, concatenation, copying, and comparison. Languages often provide standard libraries (like \`<string.h>\` in C) to perform these tasks.

### Pattern Matching
Pattern matching (or string searching) involves finding the occurrences of a "pattern" string within a "text" string.

#### 1. Naive Pattern Matching
- Checks for the pattern at every possible position in the text.
- Time Complexity: **O(m * n)**, where m is pattern length and n is text length.
- Easy to implement but inefficient for large texts.

#### 2. KMP (Knuth-Morris-Pratt) Algorithm
- Uses the degenerate property of the pattern (pattern having same sub-patterns appearing more than once in the pattern itself) to avoid unnecessary comparisons.
- It precomputes an LPS (Longest Prefix which is also Suffix) array.
- Time Complexity: **O(m + n)**. Highly efficient.

#### 3. Rabin-Karp Algorithm
- Uses hashing to find the pattern.
- Computes a hash value for the pattern and for every substring of the text of the same length.
- Time Complexity: Average O(m+n), Worst-case O(m*n) (due to hash collisions).`,
          shortNotes: 'Strings are character arrays. KMP algorithm does pattern matching in O(m+n) time.',
          examples: [
            {
              title: 'Naive Pattern Search in C',
              code: `void search(char* pat, char* txt) {
    int m = strlen(pat);
    int n = strlen(txt);
    for (int i = 0; i <= n - m; i++) {
        int j;
        for (j = 0; j < m; j++) {
            if (txt[i + j] != pat[j]) break;
        }
        if (j == m) printf("Pattern found at %d\\n", i);
    }
}`,
              explanation: 'Iterates through the text checking if the pattern matches at the current index.'
            }
          ],
          keyPoints: [
            'Strings in C are null-terminated char arrays.',
            'Pattern matching finds a substring within a string.',
            'Naive approach is O(n*m).',
            'KMP algorithm is O(n+m) using the LPS array.'
          ],
          mcqs: [
            {
              question: 'Which algorithm uses hashing for string matching?',
              options: ['KMP', 'Naive', 'Rabin-Karp', 'Boyer-Moore'],
              correctAnswer: 'Rabin-Karp',
              explanation: 'Rabin-Karp uses rolling hash functions to match the pattern with substrings of the text.'
            }
          ]
        },
        {
          id: 't2-3',
          title: 'Singly Linked List (insertion, deletion, traversal)',
          simpleExplanation: 'A linked list is a chain of nodes where each node holds data and a pointer to the next node.',
          detailedExplanation: `## Singly Linked List

A Singly Linked List is a linear data structure consisting of nodes. Each node contains two parts:
1. **Data**: The value stored in the node.
2. **Next Pointer**: A reference (or link) to the next node in the sequence.
The last node points to \`NULL\`, indicating the end of the list.

### Operations

#### 1. Traversal
Starting from the \`head\` (first node), follow the \`next\` pointers until you reach \`NULL\`.
- Time Complexity: O(n)

#### 2. Insertion
- **At the Beginning**: Create a new node, point its next to the current head, and update head. (O(1))
- **At the End**: Traverse to the last node, attach the new node, and point its next to NULL. (O(n))
- **At a specific position**: Traverse to the position, update pointers to insert the new node in the middle. (O(n))

#### 3. Deletion
- **From the Beginning**: Update head to head->next, free the old head. (O(1))
- **From the End**: Traverse to the second-to-last node, update its next to NULL, free the last node. (O(n))
- **Specific Node**: Traverse to find the node, update the previous node's next pointer to bypass the deleted node. (O(n))

### Advantages over Arrays
- Dynamic size (grows and shrinks as needed).
- Easy insertion and deletion without shifting elements.

### Disadvantages
- No random access (must traverse from the beginning to reach an element).
- Extra memory required for pointers.`,
          shortNotes: 'Singly Linked List: Nodes point in one direction. Dynamic size, O(1) head insertion.',
          examples: [
            {
              title: 'Insert at Beginning in C',
              code: `struct Node {
    int data;
    struct Node* next;
};

void push(struct Node** head_ref, int new_data) {
    struct Node* new_node = (struct Node*)malloc(sizeof(struct Node));
    new_node->data = new_data;
    new_node->next = (*head_ref);
    (*head_ref) = new_node;
}`,
              explanation: 'Allocates a new node, makes it point to the current head, and updates the head.'
            }
          ],
          keyPoints: [
            'Each node has data and a next pointer.',
            'The last node points to NULL.',
            'Insertion at head is O(1).',
            'No random access; traversing is required.'
          ],
          mcqs: [
            {
              question: 'What is the time complexity to insert a node at the beginning of a singly linked list?',
              options: ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'],
              correctAnswer: 'O(1)',
              explanation: 'Only the new node and the head pointer need to be updated, which takes constant time.'
            }
          ]
        },
        {
          id: 't2-4',
          title: 'Doubly Linked List',
          simpleExplanation: 'A linked list where each node has pointers to both the next and the previous nodes, allowing traversal in both directions.',
          detailedExplanation: `## Doubly Linked List

A Doubly Linked List (DLL) is a complex type of linked list in which a node contains a pointer to the previous as well as the next node in the sequence.

### Structure of a Node
A DLL node contains:
1. **Prev Pointer**: Points to the previous node.
2. **Data**: The value stored.
3. **Next Pointer**: Points to the next node.

### Advantages over Singly Linked List
- **Bi-directional Traversal**: You can navigate the list forward and backward.
- **Easier Deletion**: If you have a pointer to a specific node, you can delete it in O(1) time because you already have access to its previous node (via the prev pointer). In a singly linked list, you would have to traverse from the head to find the previous node.

### Disadvantages
- **Extra Memory**: Each node requires an extra pointer, increasing space complexity.
- **More Complex Operations**: Insertions and deletions require updating more pointers (two next pointers and two prev pointers).

### Operations
- **Insertion**: Similar to singly linked lists but requires updating the \`prev\` pointers of adjacent nodes.
- **Deletion**: Unlink the node by updating the \`next\` pointer of the preceding node and the \`prev\` pointer of the succeeding node.`,
          shortNotes: 'Doubly Linked List allows traversal in both directions. Needs extra memory for the previous pointer.',
          examples: [
            {
              title: 'DLL Node Structure',
              code: `struct Node {
    int data;
    struct Node* next;
    struct Node* prev;
};`,
              explanation: 'The node has pointers to both adjacent nodes.'
            }
          ],
          keyPoints: [
            'Nodes contain data, prev, and next pointers.',
            'Enables bidirectional traversal.',
            'Deletion of a known node is O(1).',
            'Uses more memory than a singly linked list.'
          ],
          mcqs: [
            {
              question: 'What is an advantage of a Doubly Linked List over a Singly Linked List?',
              options: ['Uses less memory', 'Can traverse backward', 'Faster random access', 'No pointers needed'],
              correctAnswer: 'Can traverse backward',
              explanation: 'The prev pointer allows traversal in the backward direction.'
            }
          ]
        },
        {
          id: 't2-5',
          title: 'Circular Linked List',
          simpleExplanation: 'A linked list where the last node points back to the first node, forming a circle.',
          detailedExplanation: `## Circular Linked List

In a Circular Linked List, all nodes are connected to form a continuous circle. There is no \`NULL\` at the end.

### Types
1. **Circular Singly Linked List**: The \`next\` pointer of the last node points back to the first node (head).
2. **Circular Doubly Linked List**: The \`next\` of the last node points to the first, and the \`prev\` of the first node points to the last node.

### Key Characteristics
- Any node can be a starting point. We can traverse the whole list by starting from any point.
- Useful for applications that require a round-robin approach, like CPU scheduling in operating systems.
- Often, instead of a \`head\` pointer, a \`tail\` pointer is maintained that points to the last node. This allows O(1) insertion at both the beginning (tail->next) and the end.

### Operations
When traversing, the condition to stop is not reaching \`NULL\`, but returning to the starting node. This requires careful implementation to avoid infinite loops.`,
          shortNotes: 'Circular Linked List has no NULL pointers. The last node points to the head.',
          examples: [
            {
              title: 'Traversal in Circular List',
              code: `void traverse(struct Node* head) {
    if (head != NULL) {
        struct Node* temp = head;
        do {
            printf("%d ", temp->data);
            temp = temp->next;
        } while (temp != head);
    }
}`,
              explanation: 'Uses a do-while loop to print nodes until it loops back to the head.'
            }
          ],
          keyPoints: [
            'Last node connects to the first node.',
            'No NULL pointers in a fully populated list.',
            'Useful in round-robin scheduling algorithms.',
            'Can maintain a tail pointer for O(1) head/tail insertions.'
          ],
          mcqs: [
            {
              question: 'In a Circular Singly Linked List, where does the next pointer of the last node point?',
              options: ['NULL', 'The previous node', 'The first node (head)', 'Itself'],
              correctAnswer: 'The first node (head)',
              explanation: 'To form a circle, the end connects back to the beginning.'
            }
          ]
        }
      ]
    },
    {
      id: 'u3',
      title: 'Stacks & Queues',
      description: 'LIFO and FIFO abstract data types and their applications.',
      topics: [
        {
          id: 't3-1',
          title: 'Stack (array & linked list implementation)',
          simpleExplanation: 'A stack is a LIFO (Last In First Out) structure. You add and remove elements from only one end, called the top.',
          detailedExplanation: `## Stack Data Structure

A Stack is a linear data structure that follows a particular order in which operations are performed. The order is **LIFO (Last In First Out)** or **FILO (First In Last Out)**.
Imagine a stack of plates in a cafeteria: you can only add a plate to the top, and you can only remove a plate from the top.

### Primary Operations
- **Push**: Adds an item to the stack. If the stack is full, it causes an Overflow condition.
- **Pop**: Removes an item from the stack. If the stack is empty, it causes an Underflow condition.
- **Peek / Top**: Returns the top element without removing it.
- **isEmpty**: Returns true if the stack is empty.

### 1. Array Implementation
We use an array and an integer variable \`top\` initialized to -1.
- **Push**: Increment \`top\`, then place the element at \`arr[top]\`.
- **Pop**: Return \`arr[top]\`, then decrement \`top\`.
- **Pros**: Easy to implement, memory is saved as pointers are not involved.
- **Cons**: Fixed size (unless implemented dynamically).

### 2. Linked List Implementation
We use a singly linked list. The head of the list acts as the top of the stack.
- **Push**: Insert a new node at the head (beginning of the list).
- **Pop**: Delete the node at the head.
- **Pros**: Dynamic size, can grow indefinitely.
- **Cons**: Requires extra memory for pointers.`,
          shortNotes: 'Stack follows LIFO. Operations are Push, Pop, Peek. Implemented via Arrays or Linked Lists.',
          examples: [
            {
              title: 'Stack Push using Array',
              code: `void push(int arr[], int* top, int value, int MAX) {
    if (*top >= MAX - 1) {
        printf("Stack Overflow\\n");
    } else {
        (*top)++;
        arr[*top] = value;
    }
}`,
              explanation: 'Increments the top index and assigns the value.'
            }
          ],
          keyPoints: [
            'LIFO structure.',
            'Push and Pop operations take O(1) time.',
            'Array implementation can suffer from Stack Overflow.',
            'Linked List implementation uses dynamic memory.'
          ],
          mcqs: [
            {
              question: 'Which principle does a Stack follow?',
              options: ['FIFO', 'LIFO', 'Random Access', 'None'],
              correctAnswer: 'LIFO',
              explanation: 'Stack follows Last-In-First-Out.'
            }
          ]
        },
        {
          id: 't3-2',
          title: 'Applications of Stack (infix to postfix, expression evaluation)',
          simpleExplanation: 'Stacks are used heavily in compilers for evaluating mathematical expressions and handling function calls.',
          detailedExplanation: `## Applications of Stack

Stacks are widely used in computer science for parsing and evaluating expressions, as well as managing function calls.

### 1. Expression Conversion (Infix to Postfix)
Mathematical expressions are normally written in **Infix** notation (e.g., A + B). However, computers prefer **Postfix** (A B +) or **Prefix** (+ A B) notations because they don't require parentheses or operator precedence rules to evaluate.

**Algorithm for Infix to Postfix using Stack:**
1. Scan the infix expression from left to right.
2. If the scanned character is an operand, output it.
3. If it is an operator:
   - Pop and output from the stack until an operator with lower precedence is found.
   - Push the current operator onto the stack.
4. If it is an opening parenthesis '(', push it to the stack.
5. If it is a closing parenthesis ')', pop and output from the stack until an '(' is encountered.
6. Pop the remaining operators from the stack.

### 2. Postfix Evaluation
Once an expression is in postfix, a stack is used to evaluate it:
1. Scan from left to right.
2. If an operand is encountered, push it onto the stack.
3. If an operator is encountered, pop two operands, apply the operator, and push the result back.
4. The final result will be the only item left in the stack.

### 3. Other Applications
- **Function Call Stack**: Managing function returns and local variables in programming languages.
- **Undo Features**: Storing the history of actions in text editors.
- **Parentheses Matching**: Checking for balanced parentheses in code blocks.`,
          shortNotes: 'Stacks evaluate Postfix expressions and convert Infix to Postfix. Also manage function calls.',
          examples: [
            {
              title: 'Postfix Evaluation Logic',
              code: `// For expression: "2 3 +"
push(2);
push(3);
// Read '+'
val1 = pop(); // 3
val2 = pop(); // 2
push(val2 + val1); // push 5`,
              explanation: 'Operands are pushed; operators pop operands and push results.'
            }
          ],
          keyPoints: [
            'Infix: A + B',
            'Postfix: A B +',
            'Postfix evaluation relies entirely on Stack data structure.',
            'Stacks match balanced parentheses in compilers.'
          ],
          mcqs: [
            {
              question: 'In postfix notation, the operator is placed:',
              options: ['Before operands', 'Between operands', 'After operands', 'Anywhere'],
              correctAnswer: 'After operands',
              explanation: 'Postfix means the operator comes after its operands.'
            }
          ]
        },
        {
          id: 't3-3',
          title: 'Queue (Simple, Circular, Priority)',
          simpleExplanation: 'A queue is a FIFO (First In First Out) structure. Elements are added at the back and removed from the front.',
          detailedExplanation: `## Queue Data Structure

A Queue is a linear structure which follows the **FIFO (First In First Out)** principle. Like a line at a ticket counter, the first person in line is the first one to be served.

### Simple Queue Operations
- **Enqueue**: Add an item to the rear of the queue.
- **Dequeue**: Remove an item from the front of the queue.
- **Front/Rear**: Get the front or rear item without removing it.

In an array-based simple queue, a problem arises: after several enqueue and dequeue operations, empty spaces are created at the front of the array that cannot be reused without shifting all elements.

### Circular Queue
To solve the empty space problem of simple queues, the Circular Queue connects the rear of the array back to the front, forming a circle mathematically using the modulo operator.
- **Next Position**: \`(current_position + 1) % MAX_SIZE\`
- Reuses the blank spaces left by dequeued elements.

### Priority Queue
In a priority queue, every element is associated with a priority. Elements are dequeued based on their priority rather than their arrival time.
- If two elements have the same priority, they are served according to their order in the queue.
- Typically implemented using **Heaps** for efficient O(log n) enqueue and dequeue operations.
- **Applications**: CPU scheduling, Dijkstra's algorithm.`,
          shortNotes: 'Queue is FIFO. Circular queue reuses space. Priority queue serves highest priority first.',
          examples: [
            {
              title: 'Circular Queue Enqueue',
              code: `void enqueue(int queue[], int* rear, int* front, int val, int MAX) {
    if ((*rear + 1) % MAX == *front) {
        printf("Queue Full\\n");
    } else {
        if (*front == -1) *front = 0;
        *rear = (*rear + 1) % MAX;
        queue[*rear] = val;
    }
}`,
              explanation: 'Uses modulo operator to wrap around the array indices.'
            }
          ],
          keyPoints: [
            'Queue follows FIFO.',
            'Enqueue adds to rear; Dequeue removes from front.',
            'Circular Queues solve the wasted space issue of simple array queues.',
            'Priority Queues use Heaps.'
          ],
          mcqs: [
            {
              question: 'Which problem of a simple array queue does a circular queue solve?',
              options: ['Slow access time', 'Memory wastage at the front', 'Lack of priority', 'Infinite loops'],
              correctAnswer: 'Memory wastage at the front',
              explanation: 'In simple queues, dequeued spaces cannot be reused. Circular queues wrap around to use them.'
            }
          ]
        },
        {
          id: 't3-4',
          title: 'Deque (Double-ended Queue)',
          simpleExplanation: 'A Deque is a flexible queue where you can add or remove elements from both the front and the rear.',
          detailedExplanation: `## Deque (Double-ended Queue)

A Deque (pronounced "deck") is a generalization of a queue in which elements can be added to or removed from either the front or the rear. It does not strictly follow FIFO or LIFO.

### Types of Deques
1. **Input Restricted Deque**: Insertion is restricted to one end (e.g., rear), but deletion can be done from both ends.
2. **Output Restricted Deque**: Deletion is restricted to one end (e.g., front), but insertion can be done at both ends.

### Operations
- **insertFront()**: Adds an item at the front.
- **insertLast()**: Adds an item at the rear.
- **deleteFront()**: Removes an item from the front.
- **deleteLast()**: Removes an item from the rear.

### Implementations
Like standard queues, a Deque can be implemented using either arrays (specifically circular arrays) or linked lists (usually doubly linked lists to allow efficient deletion from the rear).

### Applications
- **Palindromic Checking**: A deque can efficiently check if a string is a palindrome by comparing and popping the front and rear characters simultaneously.
- **Undo-Redo Operations**: Managing a history of states where you might drop the oldest state or the newest state.
- **Multiprocessor Scheduling**: Used in work-stealing algorithms where idle processors steal tasks from the rear of busy processors' deques.`,
          shortNotes: 'Deque allows insertion and deletion from both ends. Can act as both stack and queue.',
          examples: [
            {
              title: 'Deque characteristics',
              code: `// Conceptual Deque: [10, 20, 30]
insertFront(5);  // [5, 10, 20, 30]
insertLast(40);  // [5, 10, 20, 30, 40]
deleteLast();    // [5, 10, 20, 30]`,
              explanation: 'Demonstrates flexibility of adding/removing from both sides.'
            }
          ],
          keyPoints: [
            'Insertion and deletion possible at both ends.',
            'Breaks strict FIFO/LIFO rules.',
            'Often implemented with Doubly Linked Lists or Circular Arrays.',
            'Can function as both a Stack and a Queue.'
          ],
          mcqs: [
            {
              question: 'In an input-restricted deque, insertions are allowed at:',
              options: ['Both ends', 'Only one end', 'Any position', 'None of the above'],
              correctAnswer: 'Only one end',
              explanation: 'Input-restricted means input (insertion) is limited to one end, while deletion can happen at both.'
            }
          ]
        }
      ]
    },
    {
      id: 'u4',
      title: 'Trees',
      description: 'Hierarchical data structures, binary trees, and heaps.',
      topics: [
        {
          id: 't4-1',
          title: 'Binary Tree (types, properties)',
          simpleExplanation: 'A tree where every node has at most two children, commonly called the left and right child.',
          detailedExplanation: `## Binary Tree

A Tree is a hierarchical non-linear data structure. A **Binary Tree** is a special type of tree in which each node can have a maximum of two children (left child and right child).

### Basic Terminology
- **Root**: The topmost node of the tree.
- **Leaf Node**: A node with no children.
- **Depth**: The number of edges from the root to a node.
- **Height**: The number of edges on the longest path from the node to a leaf.

### Types of Binary Trees
1. **Full Binary Tree**: Every node has either 0 or 2 children. No node has only one child.
2. **Complete Binary Tree**: All levels are completely filled except possibly the last level, and all nodes are as far left as possible. (Crucial for Heap data structures).
3. **Perfect Binary Tree**: All internal nodes have two children and all leaf nodes are at the same level.
4. **Degenerate (or Pathological) Tree**: Every internal node has one child. It essentially behaves like a linked list.
5. **Balanced Binary Tree**: The height of the left and right subtrees of any node differ by at most one.

### Properties of Binary Trees
- The maximum number of nodes at level 'l' is **2^l**.
- The maximum number of nodes in a binary tree of height 'h' is **2^(h+1) - 1**.
- In a strictly Full Binary Tree, the number of leaf nodes is the number of internal nodes plus 1.`,
          shortNotes: 'Binary Tree nodes have max 2 children. Types: Full, Complete, Perfect, Balanced.',
          examples: [
            {
              title: 'Node Structure in C',
              code: `struct Node {
    int data;
    struct Node* left;
    struct Node* right;
};`,
              explanation: 'A standard node holding data and pointers to a left and right child.'
            }
          ],
          keyPoints: [
            'Max two children per node.',
            'Full tree: 0 or 2 children.',
            'Complete tree: filled left-to-right.',
            'Height of a balanced binary tree is O(log n).'
          ],
          mcqs: [
            {
              question: 'What is the maximum number of nodes at level 3 of a binary tree? (Root is level 0)',
              options: ['4', '8', '16', '3'],
              correctAnswer: '8',
              explanation: 'Max nodes at level l = 2^l. For level 3, 2^3 = 8.'
            }
          ]
        },
        {
          id: 't4-2',
          title: 'Binary Search Tree (BST) - operations',
          simpleExplanation: 'A binary tree sorted such that left children are smaller than the parent, and right children are larger.',
          detailedExplanation: `## Binary Search Tree (BST)

A Binary Search Tree is a node-based binary tree data structure which has the following properties:
- The left subtree of a node contains only nodes with keys **lesser** than the node’s key.
- The right subtree of a node contains only nodes with keys **greater** than the node’s key.
- The left and right subtree each must also be a binary search tree.
- There must be no duplicate nodes (typically).

### Operations

#### 1. Searching
To search for a value:
- Compare it with the root.
- If equal, return true.
- If less, go to the left child.
- If greater, go to the right child.
- **Time Complexity**: O(h), where h is the height of the tree. O(log n) for a balanced tree, O(n) for a degenerate tree.

#### 2. Insertion
Similar to searching, traverse the tree to find the appropriate leaf spot to insert the new node, maintaining the BST properties.

#### 3. Deletion
Deleting a node is complex and has three cases:
1. **Node to be deleted is a leaf**: Simply remove it.
2. **Node has only one child**: Copy the child to the node and delete the child.
3. **Node has two children**: Find the **inorder successor** (the smallest node in the right subtree), copy its value to the node, and recursively delete the inorder successor.

### Importance
BSTs allow for fast lookup, addition, and removal of items, bridging the gap between sorted arrays (fast search, slow insert) and linked lists (fast insert, slow search).`,
          shortNotes: 'BST: Left < Parent < Right. Searching takes O(log n) on average.',
          examples: [
            {
              title: 'BST Search Logic',
              code: `struct Node* search(struct Node* root, int key) {
    if (root == NULL || root->data == key)
       return root;
    
    if (root->data < key)
       return search(root->right, key);
       
    return search(root->left, key);
}`,
              explanation: 'Recursively searches the left or right subtree based on value comparison.'
            }
          ],
          keyPoints: [
            'Left child is smaller, Right child is larger.',
            'Inorder traversal of a BST gives a sorted array.',
            'Average time complexity for search/insert/delete is O(log n).',
            'Worst-case time complexity is O(n) (skewed tree).'
          ],
          mcqs: [
            {
              question: 'Which traversal of a BST produces a sorted sequence?',
              options: ['Preorder', 'Inorder', 'Postorder', 'Level-order'],
              correctAnswer: 'Inorder',
              explanation: 'Inorder traversal visits Left -> Root -> Right, perfectly aligning with BST sorted properties.'
            }
          ]
        },
        {
          id: 't4-3',
          title: 'AVL Tree (rotations, balancing)',
          simpleExplanation: 'An AVL tree is a self-balancing Binary Search Tree where the heights of the two child subtrees of any node differ by at most one.',
          detailedExplanation: `## AVL Tree

An AVL tree (named after inventors Adelson-Velsky and Landis) is a **self-balancing Binary Search Tree (BST)**. In a standard BST, insertions can lead to a degenerate tree (essentially a linked list) with O(n) search times. An AVL tree maintains a balance factor to guarantee O(log n) heights.

### Balance Factor
The Balance Factor (BF) of a node is the height of the left subtree minus the height of the right subtree.
- **BF = Height(Left) - Height(Right)**
- In an AVL tree, the BF for every node must be **-1, 0, or 1**.

### Rotations
When an insertion or deletion causes the BF of any node to violate the AVL property (becomes > 1 or < -1), the tree performs **rotations** to restore balance.

There are 4 types of rotations:
1. **Right Rotation (LL Case)**: Used when a node is inserted into the left subtree of the left child.
2. **Left Rotation (RR Case)**: Used when a node is inserted into the right subtree of the right child.
3. **Left-Right Rotation (LR Case)**: Used when a node is inserted into the right subtree of the left child. Requires a left rotation on the child, then a right rotation on the parent.
4. **Right-Left Rotation (RL Case)**: Used when a node is inserted into the left subtree of the right child.

### Performance
Because the tree is always strictly balanced, search, insertion, and deletion all take **O(log n)** time in both average and worst cases. The tradeoff is the overhead of calculating balance factors and performing rotations during modifications.`,
          shortNotes: 'AVL Tree is a self-balancing BST. Balance Factor must be -1, 0, or 1.',
          examples: [
            {
              title: 'LL Rotation Example',
              code: `// Insert 10, then 5, then 2 (LL Imbalance at 10)
// Tree before:
//     10
//    /
//   5
//  /
// 2
// After Right Rotation on 10:
//   5
//  / \\
// 2   10`,
              explanation: 'The right rotation shifts 5 to the root, balancing the tree.'
            }
          ],
          keyPoints: [
            'Self-balancing BST.',
            'Ensures O(log n) time complexity for operations.',
            'Balance Factor = Height(Left) - Height(Right).',
            '4 Rotations: LL, RR, LR, RL.'
          ],
          mcqs: [
            {
              question: 'In an AVL tree, what is the allowed range for a node\'s balance factor?',
              options: ['-2, -1, 0', '-1, 0, 1', '0, 1, 2', 'It can be any integer'],
              correctAnswer: '-1, 0, 1',
              explanation: 'The height difference between left and right subtrees cannot exceed 1.'
            }
          ]
        },
        {
          id: 't4-4',
          title: 'Heap (Max-Heap, Min-Heap, Heapify)',
          simpleExplanation: 'A Heap is a complete binary tree where the parent is always greater (Max-Heap) or smaller (Min-Heap) than its children.',
          detailedExplanation: `## Heap Data Structure

A Heap is a special Tree-based data structure that satisfies two properties:
1. **Shape Property**: It must be a **Complete Binary Tree** (all levels filled except possibly the last, left-aligned).
2. **Heap Property**:
   - **Max-Heap**: The key present at any node is greater than or equal to the keys of its children. The largest key is at the root.
   - **Min-Heap**: The key present at any node is less than or equal to the keys of its children. The smallest key is at the root.

### Array Representation
Because heaps are complete binary trees, they are normally implemented as arrays rather than using pointers.
For a node at index \`i\`:
- Parent index: \`(i - 1) / 2\`
- Left child index: \`(2 * i) + 1\`
- Right child index: \`(2 * i) + 2\`

### Operations
1. **Insert**: Add the new element to the end of the array, then "bubble up" (swap with parent) until the heap property is restored. O(log n).
2. **Extract Max/Min**: Remove the root element, move the last element in the array to the root, and then call **Heapify** to bubble it down. O(log n).

### Heapify
Heapify is the process of creating a heap from an array or fixing a broken heap property at a node. It compares a node with its children and swaps them if the property is violated, recursively continuing downwards.
Building a heap from an unsorted array takes **O(n)** time.

### Applications
- Priority Queues.
- Heap Sort algorithm.
- Finding the k-th largest/smallest element in an array.`,
          shortNotes: 'Heaps are complete binary trees. Max-Heap: Root is largest. Usually stored in an array.',
          examples: [
            {
              title: 'Array indexing for Heaps',
              code: `// Array: [100, 40, 50, 10, 15, 50, 40]
// Index i = 1 (Value 40)
// Left Child = 2(1)+1 = 3 (Value 10)
// Right Child = 2(1)+2 = 4 (Value 15)
// Parent = (1-1)/2 = 0 (Value 100)`,
              explanation: 'Array mapping eliminates the need for pointers.'
            }
          ],
          keyPoints: [
            'Must be a Complete Binary Tree.',
            'Max-Heap: parent >= children.',
            'Min-Heap: parent <= children.',
            'Implemented efficiently using Arrays.',
            'Heapify is an O(n) process to build the heap.'
          ],
          mcqs: [
            {
              question: 'In an array-based Max-Heap starting at index 0, what is the index of the left child of node i?',
              options: ['2i', '2i + 1', '2i + 2', 'i / 2'],
              correctAnswer: '2i + 1',
              explanation: 'Using 0-based indexing, the left child is at 2i + 1.'
            }
          ]
        },
        {
          id: 't4-5',
          title: 'Tree Traversals (Inorder, Preorder, Postorder, Level-order)',
          simpleExplanation: 'Traversals are algorithms to visit every node in a tree exactly once in a specific order.',
          detailedExplanation: `## Tree Traversals

Unlike linear data structures (arrays, linked lists) which have only one logical way to traverse them, trees can be traversed in different ways.

Traversals are generally categorized into **Depth-First Search (DFS)** and **Breadth-First Search (BFS)**.

### Depth-First Traversals (DFS)
DFS goes as deep as possible into a subtree before returning. The three types depend on when we visit the Root (the current node) relative to its Left and Right subtrees.

1. **Inorder Traversal (Left, Root, Right)**
   - Algorithm: Visit Left subtree, process Root, visit Right subtree.
   - **Use Case**: In a Binary Search Tree (BST), Inorder traversal yields nodes in non-decreasing (sorted) order.

2. **Preorder Traversal (Root, Left, Right)**
   - Algorithm: Process Root, visit Left subtree, visit Right subtree.
   - **Use Case**: Used to create a copy of the tree. Also used to get prefix expression of an expression tree.

3. **Postorder Traversal (Left, Right, Root)**
   - Algorithm: Visit Left subtree, visit Right subtree, process Root.
   - **Use Case**: Used to delete the tree. Since it processes children before parents, it safely deletes subtrees before the root.

### Breadth-First Traversal (BFS)
- **Level-Order Traversal**
   - Algorithm: Visit nodes level by level, from left to right.
   - Requires a **Queue** data structure.
   - Start by enqueueing the root. Then, loop: dequeue a node, process it, and enqueue its children.`,
          shortNotes: 'Inorder: Left-Root-Right. Preorder: Root-Left-Right. Postorder: Left-Right-Root.',
          examples: [
            {
              title: 'Inorder Recursive Function',
              code: `void printInorder(struct Node* node) {
    if (node == NULL) return;
    
    printInorder(node->left);   // Left
    printf("%d ", node->data);  // Root
    printInorder(node->right);  // Right
}`,
              explanation: 'Recursively visits left child, prints parent, then visits right child.'
            }
          ],
          keyPoints: [
            'Inorder for BST returns sorted data.',
            'Preorder processes the node before its children.',
            'Postorder processes children before the node (good for deletion).',
            'Level-order uses a Queue and visits level-by-level.'
          ],
          mcqs: [
            {
              question: 'Which traversal method is best for deleting all nodes in a tree?',
              options: ['Inorder', 'Preorder', 'Postorder', 'Level-order'],
              correctAnswer: 'Postorder',
              explanation: 'Postorder visits children before the parent, allowing safe deletion of child nodes before the parent node.'
            }
          ]
        }
      ]
    },
    {
      id: 'u5',
      title: 'Graphs',
      description: 'Network representations, traversals, and shortest path algorithms.',
      topics: [
        {
          id: 't5-1',
          title: 'Graph Representation (Adjacency Matrix, List)',
          simpleExplanation: 'Graphs are networks of nodes (vertices) and connections (edges). They are represented using grids (matrices) or lists.',
          detailedExplanation: `## Graph Data Structure

A Graph is a non-linear data structure consisting of **Vertices (V)** and **Edges (E)**. Edges connect a pair of vertices. Graphs can be Directed (edges have arrows/directions) or Undirected, and Weighted (edges have costs) or Unweighted.

To use graphs in code, we must represent them in memory. There are two primary ways:

### 1. Adjacency Matrix
A 2D array of size V x V.
- If there is an edge from vertex i to vertex j, \`matrix[i][j] = 1\` (or the weight of the edge).
- If there is no edge, \`matrix[i][j] = 0\`.
- **Pros**: Easy to implement. Checking if an edge exists between two nodes is O(1).
- **Cons**: Takes **O(V^2)** space, which is highly inefficient for sparse graphs (graphs with few edges).

### 2. Adjacency List
An array of lists. The size of the array is equal to the number of vertices.
- \`array[i]\` contains a linked list (or dynamic array) of all vertices connected to vertex i.
- **Pros**: Space efficient. Takes **O(V + E)** space. Great for sparse graphs.
- **Cons**: Checking if a specific edge exists between i and j takes O(V) time in the worst case (must traverse the list).

### Which one to choose?
- Use an **Adjacency Matrix** for dense graphs (many edges) or when fast edge lookups are necessary.
- Use an **Adjacency List** for sparse graphs, which represents most real-world networks (like social networks or maps).`,
          shortNotes: 'Adjacency Matrix is O(V^2) space. Adjacency List is O(V+E) space and better for sparse graphs.',
          examples: [
            {
              title: 'Adjacency Matrix Setup',
              code: `int V = 4;
int matrix[4][4] = {0}; // Initialize with 0

// Add undirected edge between 0 and 1
matrix[0][1] = 1;
matrix[1][0] = 1;`,
              explanation: 'Sets the intersecting cells to 1 to denote an edge.'
            }
          ],
          keyPoints: [
            'Graphs consist of Vertices and Edges.',
            'Adjacency Matrix: 2D array, fast lookup O(1), high memory O(V^2).',
            'Adjacency List: Array of linked lists, slower lookup, low memory O(V+E).',
            'Matrix is symmetric for undirected unweighted graphs.'
          ],
          mcqs: [
            {
              question: 'Which representation is most space-efficient for a sparse graph?',
              options: ['Adjacency Matrix', 'Adjacency List', 'Edge List', '2D Array'],
              correctAnswer: 'Adjacency List',
              explanation: 'Adjacency lists only store existing edges, avoiding the wasted space of O(V^2) zeros in matrices.'
            }
          ]
        },
        {
          id: 't5-2',
          title: 'BFS and DFS (Graph Traversals)',
          simpleExplanation: 'BFS explores the graph in a wide circle level by level. DFS goes deep down one path before backing up.',
          detailedExplanation: `## Graph Traversals

Graph traversal means visiting every vertex and edge exactly once in a well-defined order. The two standard algorithms are BFS and DFS.

### 1. Breadth-First Search (BFS)
BFS explores the graph layer by layer, exploring all immediate neighbors of a node before moving to the next level.
- **Data Structure**: Uses a **Queue**.
- **Algorithm**:
  1. Start at a source node, mark it as visited, and enqueue it.
  2. Loop until queue is empty:
     - Dequeue a node and process it.
     - Enqueue all its unvisited adjacent neighbors and mark them visited.
- **Applications**: Finding the shortest path in an unweighted graph, web crawling, social network friends-of-friends.

### 2. Depth-First Search (DFS)
DFS explores as far as possible along each branch before backtracking.
- **Data Structure**: Uses a **Stack** (often implicitly via recursion).
- **Algorithm (Recursive)**:
  1. Start at a node and mark it as visited.
  2. For every unvisited adjacent neighbor, recursively call the DFS function.
- **Applications**: Solving mazes, topological sorting, detecting cycles in a graph.

### Visited Array
Unlike trees, graphs can contain cycles. To avoid infinite loops, both BFS and DFS must maintain a boolean \`visited\` array to track nodes that have already been processed.

### Time Complexity
For both algorithms, the time complexity is **O(V + E)** when using an adjacency list representation.`,
          shortNotes: 'BFS uses a Queue (level-by-level). DFS uses a Stack/Recursion (deep path first).',
          examples: [
            {
              title: 'DFS Recursive Snippet',
              code: `void DFS(int v, int visited[], struct Graph* graph) {
    visited[v] = 1;
    printf("%d ", v);
    
    struct Node* temp = graph->adjLists[v];
    while(temp) {
        int connectedVertex = temp->vertex;
        if(visited[connectedVertex] == 0) {
            DFS(connectedVertex, visited, graph);
        }
        temp = temp->next;
    }
}`,
              explanation: 'Marks node as visited, prints it, then recursively visits unvisited neighbors.'
            }
          ],
          keyPoints: [
            'BFS explores breadth using a Queue.',
            'DFS explores depth using a Stack or Recursion.',
            'Both take O(V + E) time.',
            'Visited array is essential to prevent infinite loops.'
          ],
          mcqs: [
            {
              question: 'Which data structure is fundamentally used for Breadth-First Search?',
              options: ['Stack', 'Queue', 'Tree', 'Hash Map'],
              correctAnswer: 'Queue',
              explanation: 'BFS uses a Queue to maintain the FIFO order of exploring neighbors level by level.'
            }
          ]
        },
        {
          id: 't5-3',
          title: 'Shortest Path (Dijkstra\'s Algorithm)',
          simpleExplanation: 'Dijkstra’s algorithm finds the shortest path from a starting point to all other points in a weighted graph.',
          detailedExplanation: `## Dijkstra's Algorithm

Dijkstra's Algorithm is a popular greedy algorithm used to find the shortest path from a single source vertex to all other vertices in a given graph. It is heavily used in GPS mapping and network routing protocols.

### Requirements
- The graph can be directed or undirected.
- Edge weights must be **non-negative**. (If there are negative weights, Bellman-Ford algorithm must be used).

### How it works
The algorithm maintains two sets: one containing vertices included in the shortest-path tree (processed), and one containing vertices not yet included.

1. Initialize all distances from the source to infinity, and the distance to the source itself to 0.
2. Maintain a Priority Queue (or min-heap) to pick the vertex \`u\` with the minimum distance value.
3. For the picked vertex \`u\`, update the distance values of all its adjacent vertices \`v\`.
   - **Relaxation Step**: If \`distance[u] + weight(u, v) < distance[v]\`, then update \`distance[v] = distance[u] + weight(u, v)\`.
4. Mark vertex \`u\` as processed.
5. Repeat until all vertices are processed.

### Time Complexity
- Using a simple array to find the minimum distance: **O(V^2)**
- Using a Min-Heap (Priority Queue) and adjacency list: **O((V + E) log V)**. This is highly efficient.

### Limitations
It fails if the graph has negative edge weights because it assumes that once a node is processed, its shortest path is finalized (greedy choice). Negative weights could later provide a cheaper path.`,
          shortNotes: 'Dijkstra finds the single-source shortest path. Uses greedy approach. Fails with negative weights.',
          examples: [
            {
              title: 'Relaxation Step Logic',
              code: `if (!visited[v] && dist[u] != INF 
    && dist[u] + graph[u][v] < dist[v]) {
    
    dist[v] = dist[u] + graph[u][v];
}`,
              explanation: 'Updates the distance to neighbor v if a shorter path through u is found.'
            }
          ],
          keyPoints: [
            'Single-source shortest path algorithm.',
            'Uses a greedy approach.',
            'Requires non-negative edge weights.',
            'Time complexity O((V+E) log V) with Min-Heap.'
          ],
          mcqs: [
            {
              question: 'Dijkstra\'s algorithm will fail if the graph contains:',
              options: ['Cycles', 'Directed edges', 'Negative edge weights', 'Multiple components'],
              correctAnswer: 'Negative edge weights',
              explanation: 'The greedy approach assumes path costs only increase. Negative weights break this assumption.'
            }
          ]
        },
        {
          id: 't5-4',
          title: 'Minimum Spanning Tree (Prim\'s, Kruskal\'s)',
          simpleExplanation: 'A Minimum Spanning Tree (MST) connects all the nodes of a graph using the least amount of total edge weight.',
          detailedExplanation: `## Minimum Spanning Tree (MST)

Given a connected, undirected, weighted graph, a Spanning Tree is a subgraph that is a tree and includes all the vertices of the graph. A **Minimum Spanning Tree (MST)** is the spanning tree with the lowest total edge weight.

An MST has **V vertices** and exactly **V-1 edges**. There are two famous greedy algorithms to find an MST.

### 1. Kruskal's Algorithm
Kruskal's algorithm builds the MST by sorting the edges.
- **Algorithm**:
  1. Sort all the edges from lowest weight to highest.
  2. Take the edge with the lowest weight and add it to the spanning tree.
  3. **Condition**: If adding the edge creates a cycle, reject it. (Checked using a Disjoint Set / Union-Find data structure).
  4. Keep adding edges until there are V-1 edges in the tree.
- **Best for**: Sparse graphs.

### 2. Prim's Algorithm
Prim's algorithm builds the MST by growing it from a starting vertex, similar to Dijkstra's.
- **Algorithm**:
  1. Initialize a tree with a single random vertex.
  2. Maintain a set of all edges connecting the tree to vertices not yet in the tree.
  3. Pick the edge with the minimum weight and add the new vertex to the tree.
  4. Repeat until all vertices are included.
- **Best for**: Dense graphs.

### Real-world Applications
- Laying out electrical wiring across houses with minimum wire cost.
- Computer network topology design.
- Road network planning.`,
          shortNotes: 'MST connects all nodes with V-1 edges at minimum cost. Solved using Kruskal\'s (sort edges) or Prim\'s (grow from vertex).',
          examples: [
            {
              title: 'Union-Find for Kruskal\'s Cycle Check',
              code: `int find(int parent[], int i) {
    if (parent[i] == -1)
        return i;
    return find(parent, parent[i]);
}
// If find(x) == find(y), adding edge creates a cycle`,
              explanation: 'Finds the root of the sets. If both belong to the same set, adding an edge creates a cycle.'
            }
          ],
          keyPoints: [
            'MST has V vertices and V-1 edges.',
            'No cycles are allowed in a spanning tree.',
            'Kruskal sorts edges and uses Union-Find.',
            'Prim grows a tree from a starting node using a priority queue.'
          ],
          mcqs: [
            {
              question: 'How many edges are in a Minimum Spanning Tree of a graph with V vertices?',
              options: ['V', 'V - 1', 'V + 1', 'E - 1'],
              correctAnswer: 'V - 1',
              explanation: 'A tree connecting V nodes without cycles always has exactly V - 1 edges.'
            }
          ]
        }
      ]
    },
    {
      id: 'u6',
      title: 'Sorting & Searching',
      description: 'Fundamental algorithms for searching and ordering arrays.',
      topics: [
        {
          id: 't6-1',
          title: 'Linear Search & Binary Search',
          simpleExplanation: 'Linear search checks every item one by one. Binary search splits sorted data in half repeatedly to find the item fast.',
          detailedExplanation: `## Searching Algorithms

Searching is the process of finding the position of a specific element within a data structure.

### 1. Linear Search
A simple, brute-force approach.
- **How it works**: Starts from the first element and compares it with the target value. Moves sequentially to the next element until a match is found or the end of the array is reached.
- **Prerequisite**: None. Works on unsorted and sorted arrays.
- **Time Complexity**: **O(n)** worst-case.
- **Use case**: Small arrays or unsorted data.

### 2. Binary Search
A highly efficient divide-and-conquer algorithm.
- **How it works**:
  1. Find the middle element of the array.
  2. If the target matches the middle element, return its index.
  3. If the target is smaller, repeat the search on the left half.
  4. If the target is larger, repeat the search on the right half.
- **Prerequisite**: The array **must be sorted**.
- **Time Complexity**: **O(log n)** worst-case. In each step, the search space is reduced by half.
- **Use case**: Large, sorted datasets.

### Comparison
While Binary Search is drastically faster for large datasets (e.g., searching 1 million items takes at most 20 comparisons in Binary Search, vs 1 million in Linear Search), the overhead of keeping the array sorted must be considered if the data changes frequently.`,
          shortNotes: 'Linear Search: O(n), unsorted. Binary Search: O(log n), must be sorted.',
          examples: [
            {
              title: 'Binary Search Implementation',
              code: `int binarySearch(int arr[], int l, int r, int x) {
    while (l <= r) {
        int m = l + (r - l) / 2; // Avoids overflow
        if (arr[m] == x) return m;
        if (arr[m] < x) l = m + 1;
        else r = m - 1;
    }
    return -1;
}`,
              explanation: 'Iteratively halves the search space until the element is found or boundaries cross.'
            }
          ],
          keyPoints: [
            'Linear search iterates element by element.',
            'Binary search uses divide and conquer.',
            'Binary search requires a sorted array.',
            'O(log n) is exponentially faster than O(n) for large n.'
          ],
          mcqs: [
            {
              question: 'What is a mandatory requirement for binary search to work?',
              options: ['Array must contain integers', 'Array must be sorted', 'Array must have even length', 'Array must be dynamic'],
              correctAnswer: 'Array must be sorted',
              explanation: 'Binary search relies on the array being sorted to know which half to discard.'
            }
          ]
        },
        {
          id: 't6-2',
          title: 'Bubble, Selection, Insertion Sort',
          simpleExplanation: 'These are simple sorting algorithms that take O(n²) time. They are easy to code but slow for large lists.',
          detailedExplanation: `## Simple Sorting Algorithms

These three algorithms are considered "comparison sorts" with an O(n²) average and worst-case time complexity. They are rarely used in production for large data but are fundamental for understanding algorithmic thinking.

### 1. Bubble Sort
- **How it works**: Repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The largest element "bubbles up" to the end of the array in each pass.
- **Optimization**: Can stop early if a pass makes no swaps (meaning the array is already sorted).
- **Time Complexity**: O(n²) worst, O(n) best (if optimized).

### 2. Selection Sort
- **How it works**: Divides the array into a sorted and unsorted region. It repeatedly selects the smallest (or largest) element from the unsorted region and swaps it with the first element of the unsorted region.
- **Advantage**: Makes the minimum number of swaps (O(n) swaps total), useful if writing to memory is expensive.
- **Time Complexity**: O(n²) in all cases.

### 3. Insertion Sort
- **How it works**: Builds the final sorted array one item at a time. It takes an element from the unsorted part and inserts it into its correct position in the sorted part (like sorting playing cards in your hands).
- **Advantage**: Highly efficient for small arrays or arrays that are already mostly sorted.
- **Time Complexity**: O(n²) worst, O(n) best.`,
          shortNotes: 'Bubble: swaps adjacent. Selection: finds minimum. Insertion: places one by one. All are O(n²).',
          examples: [
            {
              title: 'Insertion Sort in C',
              code: `void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}`,
              explanation: 'Shifts larger elements to the right to make room for the key.'
            }
          ],
          keyPoints: [
            'All three have worst-case time complexity of O(n²).',
            'Bubble sort bubbles largest element to the end.',
            'Selection sort has minimum memory writes (swaps).',
            'Insertion sort is best for nearly sorted data.'
          ],
          mcqs: [
            {
              question: 'Which sorting algorithm behaves like sorting a hand of playing cards?',
              options: ['Bubble Sort', 'Selection Sort', 'Insertion Sort', 'Merge Sort'],
              correctAnswer: 'Insertion Sort',
              explanation: 'Insertion sort takes one item at a time and places it in the correct position among already sorted items.'
            }
          ]
        },
        {
          id: 't6-3',
          title: 'Merge Sort & Quick Sort',
          simpleExplanation: 'Advanced sorting algorithms that use Divide and Conquer to sort data very quickly in O(n log n) time.',
          detailedExplanation: `## Divide and Conquer Sorting

For large datasets, O(n²) algorithms are too slow. Merge Sort and Quick Sort use the **Divide and Conquer** paradigm to achieve O(n log n) time complexity.

### 1. Merge Sort
- **How it works**: 
  1. **Divide**: Recursively divide the array in half until you have sub-arrays of size 1.
  2. **Conquer**: Repeatedly merge the sub-arrays to produce new sorted sub-arrays until there is only one sorted array remaining.
- **Time Complexity**: **O(n log n)** in best, average, and worst cases.
- **Space Complexity**: **O(n)** because it requires a temporary array to hold data during the merge step.
- **Characteristics**: It is a stable sort (maintains relative order of equal elements).

### 2. Quick Sort
- **How it works**:
  1. Pick an element as a **pivot**.
  2. **Partition** the array so that all elements smaller than the pivot come before it, and all elements greater come after it.
  3. Recursively apply the above steps to the sub-arrays on the left and right of the pivot.
- **Time Complexity**: **O(n log n)** average case. **O(n²)** worst case (happens if the pivot chosen is consistently the greatest or smallest element, e.g., already sorted array with last element as pivot).
- **Space Complexity**: **O(log n)** auxiliary stack space.
- **Characteristics**: Usually faster in practice than Merge Sort due to better cache locality, but it is unstable and has a poor worst-case.`,
          shortNotes: 'Merge Sort: O(n log n) always, needs extra space. Quick Sort: O(n log n) average, O(n²) worst, in-place.',
          examples: [
            {
              title: 'Quick Sort Partition Logic',
              code: `int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = (low - 1);
    for (int j = low; j <= high - 1; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(&arr[i], &arr[j]);
        }
    }
    swap(&arr[i + 1], &arr[high]);
    return (i + 1);
}`,
              explanation: 'Places pivot in correct spot, smaller elements to left, larger to right.'
            }
          ],
          keyPoints: [
            'Both use Divide and Conquer.',
            'Merge sort is stable and guarantees O(n log n).',
            'Quick sort is faster in practice but worst-case is O(n²).',
            'Quick sort does not require extra array space (in-place).'
          ],
          mcqs: [
            {
              question: 'What is the worst-case time complexity of Quick Sort?',
              options: ['O(n)', 'O(n log n)', 'O(n^2)', 'O(log n)'],
              correctAnswer: 'O(n^2)',
              explanation: 'If the worst pivot is chosen repeatedly (like on an already sorted array), it degrades to O(n²).'
            }
          ]
        },
        {
          id: 't6-4',
          title: 'Hashing (Hash functions, collision resolution)',
          simpleExplanation: 'Hashing turns data into an array index using a formula, allowing extremely fast O(1) data retrieval.',
          detailedExplanation: `## Hashing

Hashing is a technique that uniquely identifies a specific object from a group of similar objects. It allows for O(1) average time complexity for search, insert, and delete operations.

### How it works
1. **Hash Function**: A mathematical formula that takes a key (like a string or ID) and converts it into an integer.
2. **Hash Table**: An array where the data is stored. The integer generated by the hash function is used as the index in this array.

*Example*: If Hash Function is \`key % 10\`, the key \`45\` will be stored at index \`5\`.

### Collisions
A collision occurs when the hash function generates the same index for two different keys (e.g., \`45 % 10 = 5\` and \`25 % 10 = 5\`). Because an array index can only hold one item, we need ways to resolve this.

### Collision Resolution Techniques

1. **Chaining (Open Hashing)**
   - Each slot in the hash table array is a pointer to a Linked List.
   - If a collision occurs, the new element is simply appended to the linked list at that index.
   - Easy to implement, but requires extra memory for pointers.

2. **Open Addressing (Closed Hashing)**
   - All elements are stored in the hash table itself. When a collision occurs, we look for the next empty slot in the array.
   - **Linear Probing**: Linearly search for the next empty slot (\`index + 1\`, \`index + 2\`, etc.). Can cause primary clustering.
   - **Quadratic Probing**: Search slots using a quadratic formula (\`index + 1^2\`, \`index + 2^2\`, etc.).
   - **Double Hashing**: Use a second hash function to determine the step size for probing.`,
          shortNotes: 'Hashing uses a function to map keys to indices for O(1) access. Collisions are handled via Chaining or Probing.',
          examples: [
            {
              title: 'Simple Hash Function & Linear Probing',
              code: `int hash(int key, int size) {
    return key % size;
}

// Inserting with linear probing
int index = hash(key, size);
while(hashTable[index] != EMPTY) {
    index = (index + 1) % size; // Move to next slot
}
hashTable[index] = key;`,
              explanation: 'Generates an index and iteratively checks next slots if occupied.'
            }
          ],
          keyPoints: [
            'Provides O(1) average time complexity.',
            'Hash functions should distribute keys uniformly.',
            'Collisions happen when two keys hash to the same index.',
            'Chaining uses linked lists.',
            'Linear Probing searches the next available array slot.'
          ],
          mcqs: [
            {
              question: 'In hashing, what is "Chaining"?',
              options: ['Linking hash tables together', 'Using linked lists to store colliding elements', 'Using multiple hash functions', 'Searching the next array slot'],
              correctAnswer: 'Using linked lists to store colliding elements',
              explanation: 'Chaining makes each array element the head of a linked list to store multiple items at the same hash index.'
            }
          ]
        }
      ]
    }
  ]
};
