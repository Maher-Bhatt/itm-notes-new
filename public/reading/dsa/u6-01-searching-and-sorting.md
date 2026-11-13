## SEARCHING AND SORTING TECHNIQUES

### Student Notes for Undergraduate Computer Science

Topics: Basics, Selection, Insertion, Exchange, Bubble, Quick Sort, External Sort, Linear Search, Binary Search, List and Hashed List

### 1. Learning Objectives

- Understand the purpose and importance of sorting and searching.
- Explain Selection, Insertion, Exchange, Bubble and Quick Sort.
- Understand internal versus external sorting.
- Apply Linear Search and Binary Search to practical problems.
- Understand list-based searching and hashed-list searching.
- Write and trace pseudocode for common algorithms.
- Compare algorithms using time and space complexity.
- Identify suitable algorithms for real Computer Science applications.

### 2. Basics of Sorting and Searching

2.1 Sorting Sorting is the process of arranging data according to a specified order, usually ascending or descending.

```
Unsorted: 40 10 30 50 20
Sorted: 10 20 30 40 50
```

2.2 Searching Searching is the process of locating a required element, called a key, in a collection of data.

```
List: 15 22 31 44 58
Key: 31 -> Found at index 2
```

2.3 Important Sorting Concepts

- Internal sorting: all data fits in main memory.
- External sorting: data is too large for main memory and secondary storage is used.
- Stable sorting: equal keys retain their original relative order.
- In-place sorting: requires only a small amount of additional memory.
- Comparison sorting: elements are ordered by comparing keys.

### 3. Selection Sort

Selection Sort repeatedly finds the smallest element in the unsorted portion and places it at the beginning.

```
64 25 12 22 11
Pass 1: 11 25 12 22 64
Pass 2: 11 12 25 22 64
Pass 3: 11 12 22 25 64
Pass 4: 11 12 22 25 64
SELECTION_SORT(A, n)
for i <- 0 to n-2
minIndex <- i
for j <- i+1 to n-1
```

```
if A[j] < A[minIndex]
minIndex <- j
swap A[i] and A[minIndex]
```

Complexity and Applications

| Case | Time |
|---|---|
| Best | O(n²) |
| Average | O(n²) |
| Worst | O(n²) |
| Space | O(1) |

- Useful for small datasets and memory-constrained situations.
- Useful when minimizing the number of swaps is important.
- Simple algorithm for teaching comparison-based sorting.

### 4. Insertion Sort

Insertion Sort builds the sorted portion one element at a time. It is similar to arranging playing cards in your hand.

```
5 2 4 6 1 3
After inserting 2: 2 5
After inserting 4: 2 4 5
After inserting 6: 2 4 5 6
After inserting 1: 1 2 4 5 6
After inserting 3: 1 2 3 4 5 6
INSERTION_SORT(A, n)
for i <- 1 to n-1
key <- A[i]
j <- i - 1
while j >= 0 AND A[j] > key
A[j+1] <- A[j]
j <- j - 1
A[j+1] <- key
```

| Case | Time |
|---|---|
| Best | O(n) |
| Average | O(n²) |
| Worst | O(n²) |
| Space | O(1) |

- Excellent for small or nearly sorted datasets.
- Can be used when elements arrive one at a time and the sorted order must be maintained.
- Often used inside hybrid sorting algorithms.

### 5. Exchange Sort

Exchange sorting is a simple comparison-based approach in which elements are compared and exchanged when they are in the wrong order.

```
Example: 5 3 4 1
Compare 5 and 3 -> 3 5 4 1
Compare 3 and 1 -> 1 5 4 3
Continue comparisons -> 1 3 4 5
EXCHANGE_SORT(A, n)
for i <- 0 to n-2
for j <- i+1 to n-1
if A[i] > A[j]
swap A[i] and A[j]
```

| Case | Complexity |
|---|---|
| Best | O(n²) |
| Average | O(n²) |
| Worst | O(n²) |
| Space | O(1) |

Exchange sort is mainly useful for learning the basic idea of comparison and swapping. More efficient algorithms should normally be used for large datasets.

### 6. Bubble Sort

Bubble Sort repeatedly compares adjacent elements and swaps them when they are in the wrong order. Large elements gradually move toward the end of the list.

```
5 1 4 2 8
Pass 1 -> 1 4 2 5 8
Pass 2 -> 1 2 4 5 8
Sorted -> 1 2 4 5 8
```

Optimized Pseudocode

```
BUBBLE_SORT(A, n)
for i <- 0 to n-2
swapped <- false
for j <- 0 to n-i-2
if A[j] > A[j+1]
swap A[j] and A[j+1]
swapped <- true
if swapped = false
break
```

| Case | Time |
|---|---|
| Best (optimized) | O(n) |
| Average | O(n²) |
| Worst | O(n²) |
| Space | O(1) |

- Very simple to understand and implement.
- Useful for teaching and very small datasets.
- Usually unsuitable for large datasets because of O(n²) average/worst performance.

### 7. Quick Sort

Quick Sort is a divide-and-conquer algorithm. It selects a pivot, partitions the array around the pivot, and recursively sorts the two partitions.

```
8 3 1 7 0 10 2
Choose pivot = 2
Left: 1 0
Pivot: 2
Right: 8 3 7 10
Recursively sort both sides
Result: 0 1 2 3 7 8 10
QUICKSORT(A, low, high)
if low < high
p <- PARTITION(A, low, high)
QUICKSORT(A, low, p-1)
QUICKSORT(A, p+1, high)
PARTITION(A, low, high)
pivot <- A[high]
i <- low - 1
for j <- low to high-1
if A[j] <= pivot
i <- i + 1
swap A[i] and A[j]
swap A[i+1] and A[high]
return i+1
```

| Case | Time |
|---|---|
| Best | O(n log n) |
| Average | O(n log n) |
| Worst | O(n²) |
| Average recursion space | O(log n) |

- Fast in practice for many in-memory datasets.
- Useful in general-purpose sorting.
- Performance depends strongly on pivot selection.
- Poor pivot choices can produce the O(n²) worst case.

### 8. External Sorting

External sorting is used when the dataset is too large to fit completely into main memory. The data is processed in portions and stored temporarily on secondary storage.

External Merge Sort A common external sorting technique is External Merge Sort.

```
Step 1: Divide a huge file into chunks that fit in RAM.
Step 2: Read each chunk into memory.
Step 3: Sort each chunk using an internal sorting algorithm.
Step 4: Write each sorted chunk back to disk.
Step 5: Merge the sorted chunks.
Step 6: Produce one final sorted file.
Input file: 12 GB
Available RAM for sorting: 2 GB
Create chunks:
Chunk 1 -> 2 GB -> sort -> run 1
Chunk 2 -> 2 GB -> sort -> run 2
...
Chunk 6 -> 2 GB -> sort -> run 6
Merge runs:
Run 1 + Run 2 + ... + Run 6 -> Sorted 12 GB file
```

Applications

- Sorting large database tables.
- Processing log files.
- Big-data processing.
- Large transaction files.
- External database operations.
- Data warehouse processing.

External sorting focuses heavily on reducing disk I/O because reading and writing data to secondary storage is usually much slower than processing data already in RAM.

### 9. Linear Search

Linear Search examines elements sequentially from the beginning until the target is found or the list ends.

```
List: 12 25 7 40 18
Key = 40
Compare 40 with 12 -> no
Compare 40 with 25 -> no
Compare 40 with 7 -> no
Compare 40 with 40 -> found
```

```
LINEAR_SEARCH(A, n, key)
for i <- 0 to n-1
if A[i] = key
return i
return -1
```

| Case | Time |
|---|---|
| Best | O(1) |
| Average | O(n) |
| Worst | O(n) |
| Space | O(1) |

- Works on sorted or unsorted data.
- Simple to implement.
- Useful when the dataset is small or unsorted.

### 10. Binary Search

Binary Search repeatedly divides a sorted list into two halves and determines which half may contain the target.

Important: Binary Search requires the data to be sorted.

```
Sorted list:
10 20 30 40 50 60 70
Key = 60
Middle = 40 -> key is larger
Search right half
Middle = 60 -> found
```

Pseudocode - Iterative

```
BINARY_SEARCH(A, n, key)
low <- 0
high <- n-1
while low <= high
mid <- low + (high-low)/2
if A[mid] = key
return mid
else if key < A[mid]
high <- mid - 1
else
low <- mid + 1
return -1
```

| Case | Time |
|---|---|
| Best | O(1) |
| Average | O(log n) |
| Worst | O(log n) |

Space (iterative)

- Very efficient for large sorted arrays.
- Common in searching tables, indexes and ordered datasets.
- Cannot be directly applied to an unsorted array.

### 11. List Searching

A list is a collection of elements connected through an organization such as an array or linked list. Searching a list can be performed using Linear Search. If the list is sorted and supports efficient indexing, Binary Search may also be possible.

11.1 Searching a Linked List

```
SEARCH_LIST(head, key)
current <- head
while current != NULL
if current.data = key
return current
current <- current.next
return NULL
```

For a singly linked list, direct access to the middle element is not efficient, so ordinary Binary Search is not as straightforward as it is on an array.

Applications of List Searching

- Finding a student record.
- Searching a contact list.
- Finding a product in a small collection.
- Searching linked records in memory.
- Managing dynamically changing collections.

### 12. Hashed List / Hash Table

A hashed list is commonly implemented using a hash table. A hash function converts a key into an index where the associated record can be stored or searched.

```
Key -> Hash Function -> Index
Student ID 1052
|
v
h(1052) = 2
|
v
Hash Table[2] -> Student record
```

12.1 Hash Function A simple hash function can use the modulo operator:

```
h(key) = key MOD table_size
```

Example:

```
Table size = 10
Key = 123
h(123) = 123 MOD 10
= 3
Store key 123 at index 3.
```

12.2 Collision A collision occurs when two different keys produce the same hash-table index.

```
Table size = 10
h(123) = 3
h(153) = 3
Both keys map to index 3 -> collision
```

12.3 Collision Handling

- Separate chaining: each table position stores a list of records.
- Linear probing: search for the next available table position.
- Quadratic probing: use increasing quadratic offsets.
- Double hashing: use a second hash function to determine the probe sequence.

12.4 Hash Search Pseudocode

```
HASH_SEARCH(table, key)
index <- HASH(key)
if table[index] is empty
return NOT_FOUND
search the records associated with table[index]
if key is found
return record
else
return NOT_FOUND
```

12.5 Complexity

|  | Situation |  |  | Average |  |  | Worst |  |
|---|---|---|---|---|---|---|---|---|
| Hash search |  |  | O(1) |  |  | O(n) |  |  |
| Hash insertion |  |  | O(1) |  |  | O(n) |  |  |
| Hash deletion |  |  | O(1) |  |  | O(n) |  |  |

With a good hash function and controlled load factor, hash tables provide approximately constant-time average searching.

Applications of Hashing

- Database indexing.
- Symbol tables in compilers.
- Caching.
- Dictionaries and maps.
- Password and credential systems (using appropriate cryptographic hashing).
- Duplicate detection.
- Counting frequencies.
- Fast lookup of IDs, usernames and product codes.

### 13. Comparison of Searching Techniques

|  | Technique |  |  | Requirement |  |  | Best |  |  | Average |  |  | Worst |  |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Linear Search |  |  | No sorting required |  |  | O(1) |  |  | O(n) |  |  | O(n) |  |  |
| Binary Search |  |  | Sorted data |  |  | O(1) |  |  | O(log n) |  |  | O(log n) |  |  |
| Hash Search |  |  | Hash table |  |  | O(1) |  |  | O(1) |  |  | O(n) |  |  |

### 14. Comparison of Sorting Techniques

|  | Algorithm |  |  | Best |  |  | Average |  |  | Worst |  |  | Space |  |  | Stable? |  |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Selection Sort |  |  | O(n²) |  |  | O(n²) |  |  | O(n²) |  |  | O(1) |  |  | Usually No |  |  |
| Insertion Sort |  |  | O(n) |  |  | O(n²) |  |  | O(n²) |  |  | O(1) |  |  | Yes |  |  |
| Exchange Sort |  |  | O(n²) |  |  | O(n²) |  |  | O(n²) |  |  | O(1) |  |  | Depends |  |  |
| Bubble Sort |  |  | O(n) |  |  | O(n²) |  |  | O(n²) |  |  | O(1) |  |  | Yes |  |  |
| Quick Sort |  |  | O(n log n) |  |  | O(n log n) |  |  | O(n²) |  |  | O(log n) avg. |  |  | Usually No |  |  |
| External Merge Sort |  |  | Depends |  |  | Depends |  |  | Depends |  |  | Uses external storage |  |  | Yes |  |  |

### 15. Choosing the Right Algorithm

- Small dataset: Insertion Sort can be a good simple choice.
- Nearly sorted dataset: Insertion Sort is often effective.
- Need simple teaching implementation: Selection or Bubble Sort.
- Large in-memory dataset: Quick Sort is often a strong practical choice.
- Data does not fit in RAM: External Merge Sort is appropriate.
- Unsorted small list: Linear Search.
- Sorted array: Binary Search.
- Very fast key-based lookup: Hash Table.

### 16. Computer Science Applications

|  | Area |  |  | Example |  |
|---|---|---|---|---|---|
| Databases |  |  | Sorting records, indexing and searching customer/student records |  |  |

| Operating Systems | Managing process and resource information |
|---|---|
| Compilers | Symbol tables and identifier lookup |
| Web Search | Indexing and retrieving documents |
| E-commerce | Searching products and sorting by price/rating |
| Networking | Routing and lookup tables |
| Cybersecurity | Fast lookup, duplicate detection and cryptographic hash functions |
| AI/ML | Preparing and organizing datasets |
| Information Retrieval | Ranking and retrieving documents |
| File Systems | Searching and organizing files |

### 17. Worked Example: Choosing a Technique

Suppose a university stores 50 million student records. The system needs to locate a student using a unique ID.

- Linear Search could require examining millions of records.
- Binary Search is excellent if the records are maintained in sorted order and random access is available.
- A Hash Table can provide approximately O(1) average lookup by student ID.
- For a very large file that cannot fit in memory, external sorting may be used when records need to be ordered.

### 18. Common Mistakes to Avoid

- Using Binary Search on unsorted data.
- Forgetting the visited/sorted boundary when tracing sorting algorithms.
- Confusing a hash function with encryption.
- Ignoring collisions in hash tables.
- Assuming Quick Sort always runs in O(n log n).
- Forgetting that external sorting is designed for data larger than available main memory.
- Using O(1) as the worst-case hash-table search without considering collisions.
- Forgetting that linked lists do not provide efficient random access.

### 19. Quick Revision Sheet

|  | Topic |  |  | Key Idea |  |
|---|---|---|---|---|---|
| Selection Sort |  |  | Select minimum and place it in position |  |  |
| Insertion Sort |  |  | Insert each element into sorted portion |  |  |
| Exchange Sort |  |  | Compare elements and exchange when out of order |  |  |
| Bubble Sort |  |  | Repeatedly exchange adjacent elements |  |  |
| Quick Sort |  |  | Partition around pivot and recursively sort |  |  |
| External Sort |  |  | Sort data using disk/external storage |  |  |
| Linear Search |  |  | Check elements sequentially |  |  |
| Binary Search |  |  | Repeatedly divide sorted data in half |  |  |
| List Search |  |  | Search elements in array/list/linked list |  |  |
| Hashed List |  |  | Use hash function for fast key-based lookup |  |  |

### 20. Exam-Oriented Questions

Short Answer Questions

1. What is sorting? Why is sorting important?

2. Differentiate internal and external sorting.

3. What is a stable sorting algorithm?

4. Explain Selection Sort with an example.

5. Why is Insertion Sort suitable for nearly sorted data?

6. What is the basic principle of Bubble Sort?

7. What is a pivot in Quick Sort?

8. What is a collision in hashing?

9. What is Linear Search?

10. Why must Binary Search use sorted data?

11. What is the average complexity of hash-table search?

Descriptive / Programming Questions

12. Write pseudocode for Selection Sort and trace it for 64, 25, 12, 22, 11.

13. Write a program for Insertion Sort and analyze its complexity.

14. Explain Bubble Sort with a suitable example and optimize it using a swap flag.

15. Explain Quick Sort using the divide-and-conquer approach.

16. Explain External Merge Sort and why it is needed for very large files.

17. Write pseudocode for Linear Search and Binary Search.

18. Compare Linear Search, Binary Search and Hash Search.

19. Explain collision resolution using separate chaining and linear probing.

20. Design a hash table for a set of student IDs using modulo hashing.

21. Select an appropriate searching/sorting technique for a university student-record system and justify your choice.

### 21. Key Takeaways

- Sorting organizes data; searching locates data.
- Selection, Insertion, Exchange and Bubble Sort are simple O(n²) techniques in their typical forms.
- Insertion Sort is especially effective for small or nearly sorted data.
- Quick Sort uses divide and conquer and has O(n log n) average performance.
- External sorting is required when data is larger than available main memory.
- Linear Search works without requiring sorted data.
- Binary Search is much faster but requires sorted, efficiently accessible data.
- Hashing provides approximately O(1) average lookup when the table and hash function are well designed.
- The correct algorithm depends on dataset size, ordering, memory, storage and required performance.

End of Student Notes
