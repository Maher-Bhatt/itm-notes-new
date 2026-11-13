### Algorithm Analysis

When analyzing iterative algorithms, the time complexity depends on how the loop variable changes. Nearly every iterative algorithm can be categorized into one of a few common iteration patterns. Mastering these patterns lets you analyze almost any loop.

## 1. Constant Increment (Linear)

Pattern

for(i = 1; i <= n; i++)

Or

for(i = 0; i < n; i += c)

where c is a constant.

Analysis

Number of iterations

n/c = O(n)

Example

for(i=0;i<n;i++)

{ printf("%d",i);

}

0,1,2,3,...,n−1

Prof. Madonna Lamin, ITMBU

Time Complexity

O(n)

## 2. Constant Decrement (Linear)

Pattern

for(i=n;i>0;i--)

Or

for(i=n;i>0;i-=5)

n,n−1,n−2,...

Time Complexity

O(n)

## 3. Multiplication (Logarithmic)

Pattern

for(i=1;i<=n;i*=2)

Prof. Madonna Lamin, ITMBU

...

Suppose after k iterations,

2^k = n Taking log on both sides k = log n

Time Complexity

O(log n)

## 4. Division (Logarithmic)

Pattern

for(i=n;i>=1;i/=2)

n n/2 n/4 n/8 ...

O(log n)

Prof. Madonna Lamin, ITMBU

## 5. Exponential Growth

Pattern

for(i=2;i<=n;i=i*i)

...

Suppose

2^2^k = n Taking log twice k = log log n

Time Complexity

O(log log n)

## 6. Square Root Increment

Pattern

for(i=1;i*i<=n;i++)

Since

i² ≤ n

Maximum value of i

√n

Prof. Madonna Lamin, ITMBU

O(√n)

## 7. Cube Root Increment

for(i=1;i*i*i<=n;i++)

³√n

O(n^(1/3))

## 8. Powers

Pattern

for(i=1;i<=sqrt(n);i++)

O(√n)

## 9. Variable Increment

Pattern

for(i=1;i<=n;i=i+2)

Prof. Madonna Lamin, ITMBU

...

Approximately

n/2

O(n)

## 10. Increasing by i

i=1;

while(i<n)

i=i+i;

Equivalent to multiplication by 2.

O(log n)

## 11. Increasing by Square

i=2;

Prof. Madonna Lamin, ITMBU

while(i<n)

i=i*i;

O(log log n)

## 12. Triangular Iteration

for(i=1;i<=n;i++)

for(j=1;j<=i;j++)

...

n

Total 1+2+3+...+n = n(n+1)/2

O(n²)

## 13. Reverse Triangle

for(i=n;i>=1;i--)

for(j=1;j<=i;j++)

Prof. Madonna Lamin, ITMBU

n n−1 n−2 ...

Again

n(n+1)/2

O(n²)

## 14. Nested Independent Loops

for(i=1;i<=n;i++)

for(j=1;j<=m;j++)

n × m

O(nm)

Note: If m = n then O(n^2)

Prof. Madonna Lamin, ITMBU

## 15. Triple Nested Loops

for(i=1;i<=n;i++)

for(j=1;j<=n;j++)

for(k=1;k<=n;k++)

n × n × n

O(n³)

## 16. Nested Logarithmic

for(i=1;i<=n;i++)

for(j=1;j<=n;j*=2)

Outer loop

n

Inner loop

log n

O(n log n)

Prof. Madonna Lamin, ITMBU

## 17. Nested Square Root

for(i=1;i<=n;i++)

for(j=1;j*j<=n;j++)

Outer

n

Inner

√n

O(n√n)

## 18. Log × Log

for(i=1;i<=n;i*=2)

for(j=1;j<=n;j*=2)

Both loops

log n

O((log n)²)

Prof. Madonna Lamin, ITMBU

## 19. Log × Linear

for(i=1;i<=n;i*=2)

for(j=1;j<=n;j++)

O(n log n)

## 20. Two Consecutive Loops

for(i=1;i<=n;i++)

for(j=1;j<=n;j++)

n+n=2n

=O(n)

## 21. Three Consecutive Loops

for(i=1;i<=n;i++)

for(j=1;j<=n*n;j++)

for(k=1;k<=log n;k++)

Prof. Madonna Lamin, ITMBU

n+n²+log n

Dominant Term

O(n²)

## 22. Geometric Progression

for(i=1;i<=n;i*=3)

...

3^k = n k = log n

O(log n)

## 23. Arithmetic Progression

for(i=5;i<=n;i+=5)

Prof. Madonna Lamin, ITMBU

...

Approximately

n/5

O(n)

## 24. Harmonic Iteration

for(i=1;i<=n;i++)

for(j=1;j<=n/i;j++)

Total iterations

n(1 + 1/2 + 1/3 + 1/4+...+1/n)

Using the harmonic series Hn = ln n

O(n log n)

## 25. Dependent Nested Loop

for(i=1;i<=n;i++)

for(j=i;j<=n;j++)

Prof. Madonna Lamin, ITMBU

n n−1 n−2 ...

Total = n(n+1)/2

O(n²)

Summary of common iterative patterns

| Loop Pattern | Example | Time Complexity |
|---|---|---|
| Increment by 1 | i++ | O(n) |
| Decrement by 1 | i– | O(n) |
| Increment by constant | i = i + k | O(n) |
| Multiply by constant | i = i * 2 | O(log n) |
| Divide by constant | i = i /2 | O(log n) |
| Square each time | i = i* i | O(log log n) |
| Square-root bound | i*i < n | O(√n) |
| Cube-root bound | i * i * i <=n | O(n^(⅓)) |
| Two consecutive loops | n+n | O(n) |
| Nested linear | n * n | O(n^2) |
| Triple nested | n^3 | O(n^3) |
| Linear X log | n x log n | O(n log n) |
| Log x log | log n x log n | O((log n) ^2) |
| Harmonic | ∑(n/i) | O(n log n) |
| Triangular loops | ∑i | O(n^2) |

Prof. Madonna Lamin, ITMBU

| Reverse Triangular | ∑(n - i) | O(n^2) |
|---|---|---|
| Independent loops | n x m | O(nm) |
| Consecutive mixed loops | n + n^2 + log n | O(max(n^2)) |

Harmonic Series

The harmonic series is one of the most important series in algorithm analysis because it appears in the time complexity of many algorithms, such as nested loops with variable increments, sieve algorithms, and union-find analysis.

The harmonic series is:

Hn = 1 + 1/2 + 1/3 + 1/4+...+1/n

Although it grows forever, it grows very slowly. The key result is

Hn = O(log n)

Prof. Madonna Lamin, ITMBU

### Analysing Recursive Algorithms

When analyzing recursive algorithms, we often express the running time using a recurrence relation. A recurrence relates the time for a problem of size n to the time for smaller subproblems.

## What is a Recurrence Relation?

A recurrence is an equation of the form:

T(n)=Time for recursive calls+Work done outside recursion

where:

T(n) = running time for input size n

Base case gives the stopping condition.

Example:

T(1) = 1

means a problem of size 1 takes constant time

## General Form

T(n)=aT(b/n)+f(n)

where :

- a = number of recursive calls
- n/b = size of each subproblem
- f(n) = work done outside recursion

Prof. Madonna Lamin, ITMBU

## Example 1: Recursive Factorial

Factorial(n)

if n == 1 return 1 return n × Factorial(n-1)

Recurrence

Each call makes one recursive call.

T(n)=T(n−1)+1

Base Case:

T(1)=1

Expansion

T(n) =T(n−1)+1 = T(n-2) + 1 + 1 = T(n - 3) + 1 + 1 + 1 … =T(1) + n - 1

Since T(1) = 1 T(n) = n

Therefore

T(n) = Θ(n)

Prof. Madonna Lamin, ITMBU

## Example 2: Recursive Sum of Array

Sum(A,n)

if n <= 0 return 0

return A[n - 1] + Sum(A,n-1)

Recurrence

T(n)=T(n−1)+1

Result

Θ(n)

Prof. Madonna Lamin, ITMBU

## Example 3: Binary Search

BinarySearch(A, low, high,key)

if(low > high) return mid = (low + high) /2 if(key == Data[mid])

return mid else if(key < Data[mid])

return BinarySearch(A, low, mid - 1, key) else return BinarySearch(A, mid + 1, high, key)

Each recursive call searches only half.

Recurrence

T(n)=T(n/2)+1

Expansion

T(n) = T(n/2)+1 =T(n/4) + 2 = T(n/8) + 3 ….

Stop when n/2^k = 1

Therefore 2^k = n

Taking logarithm k = log n

Hence

T(n)=1+logn

Therefore

Θ(log n)

Prof. Madonna Lamin, ITMBU

## Example 4: Merge Sort

Merge Sort divides into two equal halves.

Recurrence

T(n)=2T(n/2)+n

where

- two recursive calls
- merge takes n

Expansion

Level 0 —--- n

Level 1 —---2(n/2) = n

Level 2 —--4(n/4) = n

Every level costs is n

Number of levels is log n

Total

n + n + n + … = n log n

Therefore

Θ(n log n)

Prof. Madonna Lamin, ITMBU

## Example 5: Fibonacci (Naive Recursion)

Fib(n)

if n<=1 return n

return Fib(n-1)+Fib(n-2)

Recurrence

T(n)=T(n−1)+T(n−2)+1

Base Case

T(0) = 0 , T(1) = 1

Expand the Recurrence

Start with T(n) = T(n−1)+T(n−2)+1

Expand T(n - 1)

T(n) = [T(n−2)+T(n−3)+1]+T(n−2)+1 =2T(n−2)+T(n−3)+2

Expand one of the T(n - 2) terms T(n) = 2[T(n−3)+T(n−4)+1]+T(n−3)+2 =3T(n−3)+2T(n−4)+4

The expression becomes increasingly complicated because each recursive call creates two more recursive calls.

Prof. Madonna Lamin, ITMBU

Recursion Tree

F(5)

/ \ F(4) F(3)

/ \ / \ F(3) F(2) F(2) F(1)

/ \ / \ / \ F(2)F(1)F(1)F(0)F(1)F(0)

/ \ F(1) F(0)

This generates many repeated computations.

Count number of calls

Let C(n) be the number of function calls Then

C(n)=C(n−1)+C(n−2)+1

The growth follows the same pattern as the Fibonacci sequence.

| For small values ,n |  | Calls |
|---|---|---|
| 0 |  | 1 |
| 1 |  | 1 |
| 2 |  | 3 |
| 3 |  | 5 |
| 4 |  | 9 |
| 5 |  | 15 |
| 6 |  | 25 |
| 7 |  | 41 |
| 8 |  | 67 |

Prof. Madonna Lamin, ITMBU

The number of calls increases very rapidly.

Find an Upper Bound

Since

T(n−2)≤T(n−1),

we have

T(n)=T(n−1)+T(n−2)+1 ≤T(n−1)+T(n−1)+1 = 2T(n - 1) + 1

Ignoring constants T(n) ≤ 2T(n - 1)

Expand T(n) ≤ 2T(n−1)

≤2(2T(n−2))

=2^2T(n - 2)

= 2 ^ 3T(n - 3)

…..

=2 ^ (n - 1)T(1)

Since T(1) is constant T(n) = O(2^n)

The solution grows exponentially:

T(n) = Θ(2^n)

## Example 6: Tower of Hanoi

Move(n)

Move(n−1)

Move largest disk

Move(n−1)

Prof. Madonna Lamin, ITMBU

Recurrence

T(n)=2T(n−1)+1

Expand

T(n) = 2T(n−1)+1 = 2(2T(n−2)+1)+1 = 4T(n−2)+3 = 8T(n−3)+7 ….

Solution T(n) = 2^n -1

Θ(2^n)

## Steps to Analyze a Recursive Algorithm

1. Identify the base case.

2. Write the recurrence relation by counting:

- Number of recursive calls.
- Size of each recursive subproblem.
- Extra work done outside recursion.

3. Solve the recurrence using:

- Expansion (iteration) method.
- Substitution method.
- Recursion tree.
- Master Theorem (for divide-and-conquer recurrences).

4. Express the result using Big-O, Big-Ω, or Big-Θ notation.

Prof. Madonna Lamin, ITMBU

### Power of a Number Using Recursion

The Power of a Number using Recursion is a classic example of a recursive algorithm. It can also be analyzed using a recurrence relation.

Given a base x and an exponent n, compute , x ^ n

using recursion

Example:

- 2^5 = 32
- 3^4 = 81

Recursive Idea

x^n=x×x^n−1

Pseudocode

Power(x, n)

if n == 0 return 1

return x * Power(x, n-1)

Recursive Calls

Power(2,4)

= 2 × Power(2,3)

Power(2,3)

= 2 × Power(2,2)

Power(2,2)

= 2 × Power(2,1)

Power(2,1)

= 2 × Power(2,0)

Power(2,0)

= 1

Prof. Madonna Lamin, ITMBU

Returning Back

Power(2,1)

=2×1 =2

Power(2,2)

=2×2 =4

Power(2,3)

=2×4 =8

Power(2,4)

=2×8 =16

Recursion Tree

Power(2,4)

| Power(2,3)

| Power(2,2)

| Power(2,1)

| Power(2,0)

Unlike Fibonacci, only one recursive call is made at each level, so the recursion forms a straight chain rather than a branching tree.

### Time Complexity Analysis

Step 1: Write the Recurrence

Each call performs:

- One recursive call
- One multiplication (constant time)

Prof. Madonna Lamin, ITMBU

Therefore,

T(n)=T(n−1)+1

Base case:

T(0)=1

Step 2: Expand the Recurrence

T(n) = T(n−1)+1 = T(n−2)+1+1 = T(n−3)+1+1+1 ….

= T(0) + n

Since T(0) = 1 T(n) = n + 1

Step 3:

T(n) = Θ(n)

Prof. Madonna Lamin, ITMBU

Prof. Madonna Lamin, ITMBU

Summary

| Problem | Recurrence | Time Complexity |
|---|---|---|
| Factorial | T(n) = T(n-1) + 1 | Θ(n) |
| Sum of first n numbers | T(n) = T(n-1) + 1 | Θ(n) |
| Power of a number | T(n) = T(n-1) + 1 | Θ(n) |
| Sum of Array Elements | T(n) = T(n-1) + 1 | Θ(n) |
| Find Maximum in an Array | T(n) = T(n-1) + 1 | Θ(n) |
| Reverse a String | T(n) = T(n-1) + 1 | Θ(n) |
| Check Palindrome | T(n) = T(n-2) + 1 | Θ(n) |
| Decimal to Binary | T(n) = T(n/2) + 1 | Θ(log n) |
| Binary Search | T(n) = T(n/2) + 1 | Θ(log n) |
| Merge Sort | T(n) = 2T(n/2) + n | Θ(n log n) |
| Tower of Hanoi | T(n) = 2T(n - 1) + 1 | Θ(2^n) |
| Fibonacci (Naive) | T(n) = T(n-1) + T(n-2) + 1 | O(2^n) |

Prof. Madonna Lamin, ITMBU
