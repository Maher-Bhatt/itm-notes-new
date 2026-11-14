## Asymptotic Notation

Prof. Madonna Lamin, ITMBU

## Algorithm efficiency using asymptotic notation

Big O, Big Ω, and Big Θ — From Fundamentals to Real Computer Science Applications

The goal is not merely to memorize definitions, but to develop the ability to look at an algorithm, count its work, express its efficiency mathematically, and compare it with other algorithms.

## Why do we analyze algorithms

Suppose two programmers write programs to search for a student ID.

Algorithm A

Checks every student one by one.

Algorithm B

Uses a sorted list and repeatedly divides the search space into half.

## contd…

For 10 students, both may appear fast.

For 10 million students, the difference becomes enormous.

So the important question is:

How does the running time of an algorithm grow as the input size grows?

This is the central idea behind algorithm analysis.

## What is input size?

| Problem | Input Size n |
|---|---|
| Searching in an array | Number of elements |
| Sorting students/contacts | Number of students/contacts |
| Processing a string | Number of characters |
| Graph Traversal | Number of vertices/edges |
| Matrix Multiplication | Matrix dimension |
| Processing database records | Number of records |

We normally represent the size of input by n.

## contd…

For example:

Student IDs:

101 205 309 411 523 602 715 There are 7 elements.

Therefore:

N = 7 If there are 1,000,000 students: N = 1,000,000

## What does efficiency mean?

Algorithm efficiency generally concerns:

1. Time efficiency — how much computation is required?

2. Space efficiency — how much memory is required?

In this session we concentrate on time complexity.

## contd…

Consider:

Algorithm A → 10n operations Algorithm B → n² operations When n=10:

- 10n = 100 n^2 = 100
- They are approximately equal But when n = 1,000,000
- 10n = 10,000,000 While n^2 = 1,000,000,000,000
- The difference is enormous. That is why growth matters

## The basic idea behind asymptotic analysis

Asymptotic analysis studies the behavior of an algorithm when:

n -> ∞

In simple words, What happens to the algorithm when the input becomes very large?

We generally ignore:

- machine speed programming language
- compiler
- small constant differences
- lower-order terms
- and focus on the dominant growth term.

## Example- simplifying a running time function

Suppose an algorithm takes:

T(n) = 3n^2 + 5n + 10 For very large n, which term dominates?

3n^2 Therefore, T(n) = Θ(n^2)

We usually ignore:

- coefficient 3 5n
- constant 10
- because the quadratic term dominates as n grows

| Common growth rates |  |  |  |
|---|---|---|---|
|  | Complexity | Name | Example |
|  | O(1) | Constant | Array Access |
|  | O(log n) | Logarithmic | Binary Search |
|  | O(n) | Linear | Linear Search |
|  | O(n log n) | Linearithmetic | Merge Sort |
|  | O(n^2) | Quadratic | Bubble Sort |
|  | O(n^3) | Cubic | Basic matrix multiplication |
|  | O(2^n) | Exponential | Some recursive subset algorithms |
|  | O(n!) | Factorial | Brute-force travelling salesperson problem |

## A useful growth hierarchy

1 < log n < n < n log n < n^2 < n^3 < 2^n < n!

As n becomes large, algorithms further to the right generally become much more expensive.

## Three important asymptotic notations

The three fundamental notations are:

1. Big O : O(g(n))

2. Big Omega : ꭥ(g(n))

3. Big Theta : Θ(g(n))

They describe different types of bounds.

## Big-O Upper bound

Fundamental Idea:

Big O tells us:

The algorithm will not grow faster than a particular rate, asymptotically.

Formally: f(n) = O(g(n))

if there exist positive constants c and n0, such that 0 ≤ f(n) ≤ cg(n)

for all:

n ≥ n0

## contd..

Interpretation: "At most this order of growth."

For example:

T(n) = 3n + 5

We can say: T(n) = O(n)

because eventually 3n+5 is bounded above by some constant multiple of n.

## Real Application

Suppose we have, Student IDs:

101 205 309 411 523 602 715 We want to find:

Linear search checks:

101 → 205 → 309 → 411 → 523 If there are n students, in the worst case we may check all n.

Therefore,T(n)=n and O(n)

## contd..

Real application

Linear search can be used when:

- data is unsorted
- dataset is small
- simplicity is more important than speed

## Big ꭥ Notation- Lower bound

Big Omega tells us:

The algorithm requires at least this much growth asymptotically.

Formally, f(n)=Ω(g(n))

if there exist positive constants c and n0, such that 0≤cg(n)≤f(n) for all n≥n0

## contd..

Interpretation:"At least this much work." For example:

f(n)=3n+5 Then f(n)=Ω(n)

because the function grows at least linearly.

## Real application: ﬁnding the minimum

Consider:

10 45 23 78 12 To determine the maximum, we must examine every element. Why?

Because suppose we have examined:

10 45 23 We cannot know whether 78 or another unseen element is larger. Therefore, any correct algorithm must inspect all n elements. Hence, T(n)=Ω(n)

This is an important example because the lower bound is fundamental to the problem.

## Big Θ - tight bound

Big Theta tells us:

The algorithm grows exactly at this asymptotic rate, within constant factors.

Formally, f(n)=Θ(g(n)) if there exist positive constants c1,c2,n0 such that 0≤c1g(n)≤f(n)≤c2g(n) for all n≥n0

## contd…

"This is the actual asymptotic growth rate."

For example:

f(n)=5n+10

Then, f(n) = Θ(n)

because it both O(n) and ꭥ(n)

Therefore, Θ(n)

## The relationship between O,ꭥ andΘ

| Think of it like |  | Notation | Analogy | Meaning |  |
|---|---|---|---|---|---|
| inequalities | between | f(n) = O(g(n)) | f ≤ g | Upper bound |  |
| numbers |  | f(n) = Ω(g(n)) | f ≥ g | Lower bound |  |
|  |  | f(n) = Θ(g(n)) | f = g | Tight bound (both hold) |  |

So Θ is the intersection of O and Ω — it's the "sweet spot" where the same function bounds growth from both above and below (within constant factors).

## contd…

Suppose an algorithm's runtime is f(n) = 3n² + 5n + 2.

O(n²) — true, since f(n) grows no faster than n²

- O(n³) — also true (a looser but still valid upper bound)
- Ω(n²) — true, since f(n) grows no slower than n²
- Ω(n) — also true (a looser but still valid lower bound)
- Θ(n²) — true and most informative, since n² is both a tight upper and lower bound Notice that O and Ω bounds aren't unique — many valid ones exist, some tighter than others. Θ, when it applies, pins the growth rate down precisely.

## contd..

Why this matters in practice?

O is used most often in casual conversation ("this algorithm is O(n log n)") because people usually care about worst-case performance guarantees.

Ω is used when arguing that a problem cannot be solved faster than some rate (e.g., "comparison-based sorting is Ω(n log n)").

Θ is the most precise statement and is preferred in formal analysis when the upper and lower bounds coincide — it says "this is exactly the growth rate, not just a ceiling or floor."

## Why do we ignore constants?

Suppose: T1(n)=5n and T2(n)=100n

Technically, T2 requires more operations.

But both grow linearly.

Therefore, T1(n)=Θ(n) and T2(n)=Θ(n)

Asymptotic notation focuses on growth rate, not exact execution time.

## Why do we ignore lower order terms?

Consider:

T(n)=n3+100n2+500n+1000

For very large n: n^3 dominates the other terms, therefore

T(n) = Θ(n^3)

## Graphical representation

![Figure](/reading/dsa/img/u1-05-asymptotic-notation-slides-p028-96.webp)

Refer:

https://ggc-discrete- math.github.io/growth _functions.html

## contd…

As n grows:

- O(1) barely grows
- O(logn) grows slowly
- O(n) grows steadily
- O(nlogn) grows faster
- O(n2) grows rapidly

This is why choosing the right algorithm matters.

## Application: Array Access

Consider: x = arr[500];

If we know the index, the computer can directly calculate the memory address.

Therefore, T(n)=Θ(1)

This is constant time

Whether the array contains 19 elements or 10 million elements, accessing one known index takes essentially constant-time work

## Application 2: Linear search

for(i = 0; i < n; i++)

{ if(arr[i] == key)

return i;

} In the worst case, n, elements are examined.

Therefore, O(n)

But there is an important distinction:

Best Case: The key is at the first position :ꭥ(1)

Worst Case: The is at the last position or absent: O(n)

Average Case: Usually, Θ(n), under common assumptions about the key’s location

## Application 3: binary search

Suppose the sorted data contains:

10 20 30 40 50 60 70 80 We search for : 70 Binary search repeatedly halves the search space 8 elements ↓ 4 elements ↓ 2 elements ↓ 1 element

## contd..

After k steps: 2^k/n = 1

Therefore, n = 2^k

Taking logarithm: k = log n

Hence, T(n) = Θ(log n)

## Why is binary search so powerful?

Suppose we have,

n=1,000,000

Linear Search may require approximately: 1,000,000 Binary Search requires approximately:log2(1,000,000)≈20 comparisons

That is a huge difference

## Real applications of binary search

Binary-Search-like techniques are fundamental in:

- Database indexes
- Searching sorted datasets
- Dictionaries
- Library lookup systems
- Range Searching
- Debugging/Version Search problems

## Application 4: nested loop

for(i = 0; i < n; i++){ for(j = 0; j < n; j++){ printf("*");

} } Outer loop: n iterations Inner loop: n iterations Therefore, n x n = n^2 Hence, Θ(n^2)

## Real Application: Comparing every pair

Suppose we have students: A, B,C,D

Possible comparisons: A-B, A-C, A-D, B-C,B-D, C-D

The number of pairs is approximately: n(n-1)/2

Therefore: Θ(n^2)

## contd…

Applications:

This occurs in:

- duplicate detection
- brute-force similarity comparison
- pairwise distance calculations
- collision checking
- some graph algorithms

## Application 5: three nested loops

for(i = 0; i < n; i++)

for(j = 0; j < n; j++)

for(k = 0; k < n; k++) operation();

Number of operations: nxnxn Therefore, Θ(n^3)

## Application: Matrix multiplication

For two n x n matrices, the basic matrix multiplication algorithms performs approximately: n ^3 Therefore, Θ(n^3)

This illustrates why algorithmic improvements in matrix computation are so important in:

computer graphics

- scientific computing
- machine learning
- simulations
- data science

## Application 6: merge sort

Merge Sort follows:

Divide ↓ Sort left half ↓ Sort right half ↓ Merge

## contd…

The array is repeatedly divided: n-> n/2->n/4->n/8->...

Number of levels: log n

At each level, approximately n work is performed

Therefore, n x logn

and Θ(n log n)

## Application 7: recursive ﬁbonacci

Consider: F(n) = F(n-1) + F(n-2)

With the naive recursive implementation The recursion tree expands rapidly:

F(n)

/ \ F(n-1) F(n-2)

/ \ / \ F(n-2) F(n-3) F(n-3) F(n-4)

...

## contd..

Many computations are repeated.

The running time is exponential, commonly expressed as : O(2^n)

Recursion can create enormous repeated work.

## The same problem can have different complexity

Consider Fibonacci:

Naive Recursive Fibonacci: O(2^n)

Iterative Fibonacci: O(n)

Dynamic Programming: O(n)

With O(n) additional space in the basic memoized/table approach. This is one of the most important lessons in algorithm design The problem does not determine the complexity; the algorithm does.

## Important properties of asymptotic notation

Property 1: Constant Multiplication

If f(n) = Θ(g(n)) then,

for any positive constant c:

c(f(n)) = Θ(g(n))

Example:

5n = Θ(n)

100n = Θ(n)

## contd..

Property 2: Ignore lower-order terms

If f(n) = n^2 + n + 1, then:

f(n) = Θ(n^2)

because n^2 dominates n and 1

## contd…

Property 3: Transitivity

If f(n)= O(g(n)) and g(n) = O(h(n)) then:

f(n) = O(h(n))

Example:

n = O(n log n) and nlog n =O(n^2)

Therefore, n = O(n^2)

## contd…

Property 4: Reflexivity

Every function is asymptotically bounded by itself

Therefore, f(n) = O(f(n))

Also, f(n) = ꭥ(f(n))

and , f(n) = Θ(f(n))

## contd…

Property 5: Symmetry of Θ

If f(n) = Θ(g(n)) then:

g(n) = Θ(f(n))

Example:

3n + 5 = Θ(n)

Therefore,

n = Θ(3n + 5)

## contd…

Property 6: Sum Rule

Suppose, f(n) = O(g(n)) and h(n) = O(k(n)) then

f(n) + h(n) = O(g(n) + k(n))

In practical algorithm analysis, we often use:

O(n) + O(n^2) and retain the dominant term O(n^2)

## contd…

Property 7: Product Rule If two operations occur inside nested loops, their complexities multiply.

for(i=0; i<n; i++){ for(j=0; j<n; j++) { operation();

} } Outer: O(n)

Inner: O(n)

Therefore, O(n) x O(n) = O(n^2)

## Sequential versus nested operations

Sequential A B Complexity: T(n) = TA(n) + TB(n) Nested A B Complexity:T(n) = TA(n) x TB(n)

## contd..

Property 8: Logarithm Base Does Not Matter Asymptotically Consider, log2n and log10n Using change of base:

log2n = log10n/log102 Since: 1/log102 is a constant log2n = log10n Therefore, in asymptotic notation we usually write: O(log n) without worrying about the base.

## contd…

Property 9: Polynomial Growth For fixed positive constants : na grows faster than nb if,

a > b

For example:

n < n^2 < n^3

Therefore: O(n) <O(n^2) < O(n^3) in terms of growth rate
