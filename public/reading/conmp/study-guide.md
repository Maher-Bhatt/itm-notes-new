![Diagram](/reading/conmp/img/fig-001.png)

Last-Night Formula Sheet (CONMP)

# Read This First

## What this subject is about, in plain words

In school maths you solved things exactly: 𝑥2 −4 = 0 gives 𝑥= 2. But most real problems cannot be 1 𝑒−𝑥2 𝑑𝑥 — no solved exactly with algebra. Try solving 𝑥= cos 𝑥 for x. There is no formula. Or find ∫0

formula either.

Numerical methods are recipes that get very close to the true answer using only +, −, ×, ÷ repeated many times. That is exactly what a computer (or your calculator) is good at. That’s why the subject is called “Computer Oriented Numerical Methods with Python”.

The general pattern of almost every method in this subject:

1. Start with a guess (or a table of known values).

2. Apply a formula to get a better guess.

3. Repeat until the answer stops changing (to the number of decimals you need).

Each repeat is called an iteration. The list of guesses 𝑥0, 𝑥1, 𝑥2, … is called a sequence of approximations. If the guesses settle down to a fixed value, we say the method converges.

Analogy: Finding a word in a dictionary. You open somewhere in the middle (a guess), see if your word is before or after, open again in the correct half (better guess), and repeat. You never “calculate” the page; you approach it. That is a numerical method.

## How each topic is taught in this guide

For every method you get:

In one line — the whole idea in one sentence.

Understand it — the idea in plain words with a picture or analogy.

The formula — and what each symbol means.

Step-by-step recipe — exactly what to do with your calculator.

Fully worked example — every number shown (all numbers were checked by computer).

Python program — because practicals and some questions use it.

Common mistakes and what to write in the exam.

Check yourself — small questions with answers.

## Syllabus and marks

| Unit | Topic | Weightage (out of 100) |
|---|---|---|
| 1 | Errors and Computation | 7 |
| 2 | Solution of Algebraic & Transcendental Equations | 19 |
| 3 | Curve Fitting | 11 |
| 4 | Interpolation Techniques | 24 |
| 5 | System of Linear Equations — Iterative Methods | 10 |
| 6 | Numerical Integration | 10 |
| 7 | Numerical Solution of ODEs | 19 |

Important: your folder had class notes, tutorials and CET papers for Units 1, 2, 4 and 5 only. Units 3, 6 and 7 (Curve Fitting, Integration, ODEs) had no notes in your folder, so those chapters are written from the official syllabus and the textbooks it lists (B. S. Grewal, S. S. Sastry). They carry 40 marks — study them.

Exam pattern (from your CET-1 and CET-2 papers): Q1 = six 1-mark MCQs. Q2 = attempt any 3 of 5 (3 marks each — theory, short numericals, derivations). Q3 = attempt any 3 of 5 (5 marks each — full numericals). A non-programmable calculator is allowed. Marks are given for steps — always show the iteration table.

## Calculator habits that save marks

Radian mode for anything with sin, cos, tan. (In degree mode, cos 1 means cos 1°. In this subject it always means 1 radian ≈ 57.3°.)

log means log₁₀ when written log10 ; ln is natural log (base e). Calculator: log key = log₁₀, ln key = logₑ.

Carry one extra decimal in your working; round only the final answer.

“Correct to 3 decimal places” ⇒ stop when two successive answers agree in the first 3 decimals. “Tolerance 0.01 %” ⇒ stop when |𝑥𝑛𝑒𝑤−𝑥𝑜𝑙𝑑

| × 100 < 0.01.

𝑥𝑛𝑒𝑤

# Errors and Computation

## 1.1 Why we must study errors

Numerical methods give approximate answers. If an answer is approximate, we must be able to say how wrong it might be. Otherwise a bridge designer might trust a number that is off by 10%.

So this unit answers three questions:

1. How do we describe how “good” a number is? (significant digits, accuracy, precision)

2. Where do errors come from? (types of errors)

3. How do we measure the size of an error? (absolute, relative, percentage error)

## 1.2 Mathematical preliminaries (tools used in later units)

You don’t need proofs. You need to know what these say, because later methods are built on them.

(a) Intermediate Value Theorem (IVT). Plain words: If a continuous curve is below the x-axis at one point and above it at another, it must cross the x-axis somewhere in between. Maths: if f is continuous on [a, b] and 𝑓( 𝑎) ⋅𝑓( 𝑏) < 0 (opposite signs), there is at least one root between a and b. Used in: Bisection and Regula-Falsi methods (Unit 2) — that’s how we “trap” a root.

```
 f(x)
 │ ● f(b) > 0
 │ ╱
 ───┼────────╳──────── x the curve must cross the axis at ╳
 │ ╱ ← root lies here
 │ ● f(a) < 0
```

(b) Taylor series. Any smooth function near a point x can be written as

𝑓( 𝑥+ ℎ) = 𝑓( 𝑥) + ℎ𝑓′ ( 𝑥) + ℎ2

2! 𝑓″ ( 𝑥) + ℎ3

3! 𝑓‴ ( 𝑥) + ⋯

Plain words: if you know the value, slope, curvature… at one point, you can predict the value a little distance h away. Keeping only the first two terms gives a straight-line prediction — this is the idea behind Newton-Raphson (Unit 2), Euler’s method and Taylor’s method (Unit 7).

(c) Mean Value Theorem. 𝑓( 𝑏) −𝑓( 𝑎) = ( 𝑏−𝑎) 𝑓′ ( 𝜉) for some point ξ between a and b. Plain words: somewhere between a and b, the slope of the curve equals the slope of the straight line joining the two ends.

## 1.3 Exact numbers and approximate numbers

> In one line: an exact number has no uncertainty; an approximate number is “close enough” to some true value.

Exact numbers

1. Numbers obtained by counting: 60 students in a class — not 59.8, exactly 60.

2. Numbers that are defined: 1 hour = 60 minutes; 1 m = 100 cm.

3. Numbers like 2, 1/2, 3.25 written exactly.

Approximate numbers

1. Numbers that cannot be written exactly in decimals: π = 3.14159265…, √2 = 1.41421…, 1/3 = 0.3333…, e = 2.71828… Whatever number of digits you write, it’s an approximation.

2. Every measured value: your height 1.72 m (true height might be 1.7234… m).

## 1.4 Accuracy and precision

Accuracy = how close a value is to the true value. Precision = how close repeated values are to each other (also: how many digits are used).

Football analogy (from your class notes): You shoot 5 times and every ball hits the right goalpost. Your shots are precise (they all land in the same spot) but not accurate (you didn’t score).

```
 Accurate & precise Precise, not accurate Accurate, not precise
 ( ◎ ) ( o ) ••• ( • o • )
 ••• • •
```

Memory trick: Accurate = Correct. Precise = Repeating.

## 1.5 Significant digits (significant figures)

> In one line: the significant digits of a number are the digits that tell you something real about its size and precision.

Why it matters: “correct to 4 significant figures” is a common instruction. You must know which digits count.

Rules — read slowly with the examples

| Rule | Example | Count |
|---|---|---|
| 1. Every non-zero digit counts | 3.142 | 4 |
| 2. Zeros between non-zero digits count | 502.005 → 5,0,2,0,0,5 | 6 |
| 3. Zeros at the start (leading zeros) never count — they only show where the decimal point is | 0.00320 → 3,2,0 | 3 |
| 4. Zeros at the end after a decimal point count — someone bothered to write them, so they were measured | 2.500 | 4 |
| 5. Zeros at the end of a whole number with no decimal point are usually not counted | 1234500 → 1,2,3,4,5 | 5 |

Why does rule 3 make sense? 0.00320 m = 3.20 mm. Changing units removes the leading zeros, so they can’t carry information.

Practice (tutorial Q1/Q2 MCQs):

| Number | Significant digits | Why |
|---|---|---|
| 1234500 | 5 | trailing zeros of a whole number don’t count |
| 502.005010 | 9 | all middle zeros count, last trailing zero after decimal counts |
| 0.0003221 | 4 | leading zeros don’t count |
| 7.00 | 3 | trailing zeros after decimal count |
| 4500.0 | 5 | the decimal point makes all those zeros count |

## 1.6 Rounding off and chopping

### Rounding off (symmetric round-off) — the rules

To keep n significant digits, look at the first digit you are throwing away:

1. It is more than 5 → increase the last kept digit by 1. (3.267 → 3.27)

2. It is less than 5 → keep the last digit as it is. (3.264 → 3.26)

3. It is exactly 5 followed by nothing (or only zeros) → make the last kept digit even: if it is odd, add 1; if it is even, leave it. (3.275 → 3.28 because 7 is odd; 3.265 → 3.26 because 6 is even)

4. It is 5 followed by some non-zero digit → add 1. (3.2651 → 3.27)

Why rule 3? If we always rounded 5 upward, our errors would always lean upward and pile up over thousands of calculations. Rounding to even goes up half the time and down half the time, so errors cancel out.

| round to 4 | significant figures (Tutorial | Part C, Q1) |  |  |
|---|---|---|---|---|
| Number | First 4 significant digits | First discarded digit | Action | Answer |
| 3.26425 | 3.264 | 2 | < 5, keep | 3.264 |
| 35.46735 | 35.46 | 7 | > 5, add 1 | 35.47 |
| 4985561 | 4985 | then 5 61 | followed by 5 non- zero → add 1 | 4986000 |
| 0.70035 | 0.7003 | 5 then nothing | last kept 3 is odd → add 1 | 0.7004 |
| 0.00032217 | 0.0003221 | 7 | add 1 | 0.0003222 |
| 18.265101 | 18.26 | then 5 101 | followed by 5 non- zero → add 1 | 18.27 |

### Chopping (truncating digits)

Just cut off the extra digits, no adjustment: 3.26425 → 3.264; 18.265101 → 18.26; 35.46735 → 35.46. Chopping is simpler but on average less accurate than rounding (it always errs towards zero).

## 1.7 Types of errors

Error = True value − Approximate value. There are three main sources:

### (1) Inherent errors

Errors that are already in the problem before you start calculating. You did nothing wrong; the data itself is imperfect.

Data errors: measured inputs are limited by instruments (a ruler reads to 1 mm).

Conversion errors: the computer can’t store some numbers exactly — e.g., 0.1 in binary is

0.000110011… (never ends), so it gets cut.

Modelling errors: the formula you use simplifies reality (ignoring air resistance).

### (2) Round-off errors

Errors caused by rounding numbers to a fixed number of digits during calculation. A computer keeps only about 16 digits; your calculator 10. Each rounding adds a tiny error; millions of operations can add them up. Example: 2/3 stored as 0.6667 → error 0.0000333…

### (3) Truncation errors

Errors caused by replacing an infinite process with a finite one — “cutting the process short”.

3! + ⋯. If you stop after 𝑥2 Using only the first few terms of an infinite series: 𝑒𝑥= 1 + 𝑥+ 𝑥2

2! + 𝑥3

2!, the error is about 𝑥3

3!.

Stopping an iteration after a fixed number of steps.

Using a small step h instead of an infinitely small dx (integration, ODEs).

Trap MCQ (tutorial Q3): “Which is NOT a cause of truncation error? … (b) chopping off a number.” Chopping a number is a round-off type error, not truncation. Truncation is about cutting a process.

### (4) Human errors (blunders)

Wrong copying, wrong key on the calculator, programming bugs. Avoid by checking.

## 1.8 Measuring the size of an error

Let X = true value and X₁ = approximate value.

| Measure | Formula |  | Plain meaning |
|---|---|---|---|
| Absolute error | 𝐸𝑎= | \|𝑋−𝑋1\| | How far off, in the same units |
| Relative error | 𝐸𝑟= | \|𝑋−𝑋1\| \|𝑋\| | How far off compared to the size of the number |
| Percentage error | 𝐸𝑝= | 100 𝐸𝑟× | Relative error as a percent |

Why do we need relative error? Tutorial Q7 explains it perfectly. You measure a bridge as 9999 cm (true 10000 cm) and a rivet as 9 cm (true 10 cm). Both absolute errors are 1 cm. But:

10000 × 100 = 0.01% — excellent.

Bridge: 𝐸𝑝=

10 × 100 = 10% — terrible. Relative error tells you which measurement is actually good. Rivet: 𝐸𝑝= 1

### Relationship with significant digits

If a number is correct to n decimal places, its absolute error is at most ½ × 10⁻ⁿ (e.g., 3.14 correct to 2 d.p. ⇒ error ≤ 0.005).

If a number is correct to n significant digits, the relative error satisfies (the form your MCQ uses): 2 × 10−𝑛

𝐸𝑟≤1

So for the CET-2 MCQ “If a number is correct to n significant digits, then the relative error is …” the answer is (c) ≤ ½ × 10⁻ⁿ.

## 1.9 Worked examples — every step

Example 1 (Tutorial C-Q2). Round 75462 to four significant digits, then find the absolute and percentage error.

Four significant digits: 7546 | 2. First discarded digit = 2 < 5 → keep. Rounded value X₁ = 75460. 𝐸𝑎= |75462 −75460| = 𝟐.

75462 × 100 = 0.00265%.

2

𝐸𝑝=

Example 2 (Tutorial C-Q3). 0.333 is the approximate value of 1/3. Find absolute and relative error.

True X = 0.333333…, X₁ = 0.333.

𝐸𝑎= 0.333333 −0.333 = 0.000333 ≈0.0003.

𝐸𝑟= 0.000333

0.333333 = 0.001.

Example 3 (Tutorial C-Q4). Percentage error when 625.483 is approximated to three significant figures.

Three s.f.: 625 | 483 → first discarded digit 4 < 5 → X₁ = 625.

625.483 × 100 = 0.077%.

0.483

𝐸𝑎= 0.483; 𝐸𝑝=

Example 4 (Tutorial C-Q5). Relative error in taking π = 3.141593 as 22/7.

22/7 = 3.142857.

𝐸𝑎= |3.141593 −3.142857| = 0.001264.

𝐸𝑟= 0.001264

3.141593 = 0.000402.

Example 5 (Tutorial C-Q6). A tower’s height was estimated as 47 m; actual height 45 m.

𝐸𝑝= |45 −47|

× 100 = 2

45 × 100 = 4.44%.

45

(Your tutorial sheet prints 1.65 as the answer, which doesn’t match this data. 4.44% is the correct value for 47 vs 45 — ask your teacher if this appears.)

Example 6 (CET-2, Q2). Find the absolute error if X = 0.00545828 is (i) truncated to three decimal digits,

(ii) rounded off to three decimal digits.

Key idea: “decimal digits” here means digits of the mantissa in normalised floating-point form. Write the number as 0.ddd… × 10ᵏ with the first digit non-zero: X = 0.545828 × 10⁻².

i. Truncate to 3 digits: 0.545 × 10⁻². Error = (0.545828 − 0.545) × 10⁻² = 0.000828 × 10⁻² = 0.00000828.

ii. Round to 3 digits: next digit is 8 > 5 → 0.546 × 10⁻². Error = |0.545828 − 0.546| × 10⁻² = 0.000172 × 10⁻² = 0.00000172.

Notice rounding gave the smaller error — that’s why rounding is preferred.

## 1.10 Rules for estimating errors (error propagation)

The question: if the inputs have small errors, how big is the error in the answer?

Rule 1 — Adding or subtracting: absolute errors add.

𝛥( 𝑥± 𝑦) ≤𝛥𝑥+ 𝛥𝑦

Example: x = 2.35 ± 0.005 and y = 1.2 ± 0.05 → x + y = 3.55 with error up to 0.055. So write the answer with no more decimal places than the least precise input: 3.6.

Rule 2 — Multiplying or dividing: relative errors add.

𝛥( 𝑥𝑦)

≤𝛥𝑥

|𝑥| + 𝛥𝑦

|𝑥𝑦|

|𝑦|

So the answer should have no more significant digits than the input with the fewest significant digits.

Rule 3 — Powers: the relative error of 𝑥𝑛 is about n times the relative error of x. (Squaring doubles the relative error.)

Rule 4 — General formula: for 𝑢= 𝑓( 𝑥, 𝑦, 𝑧) ,

𝛥𝑢≈|𝜕𝑢

𝜕𝑥|𝛥𝑥+ |𝜕𝑢

𝜕𝑦|𝛥𝑦+ |𝜕𝑢

𝜕𝑧|𝛥𝑧

Rule 5 — Avoid subtracting nearly equal numbers. 1.2345 − 1.2344 = 0.0001 leaves just one significant digit out of five — most of the information is lost (called loss of significance). Rewrite the formula when possible.

Rule 6 — keep 1–2 extra digits during working; round only at the end.

Worked example. 𝑢= 5𝑥𝑦2

𝑧3 with x = y = z = 1 and each having error 0.001.

Using Rules 2 and 3: 𝛥𝑢

𝑢≤𝛥𝑥

𝑥+ 2𝛥𝑦

𝑦+ 3𝛥𝑧

𝑧= 0.001 + 0.002 + 0.003 = 0.006.

u = 5 → maximum error Δu ≈ 5 × 0.006 = 0.03.

## Unit 1 — What to write in the exam

“What is error? List and explain the types of errors.” (3–5 marks) — Define error as true − approximate. Then three headings with a 2-line explanation and an example each: inherent (data/conversion), round-off (2/3 → 0.6667), truncation (series cut off). Finish with the three measures 𝐸𝑎, 𝐸𝑟, 𝐸𝑝.

“Write a short note on accuracy of numbers.” — exact vs approximate numbers (with examples), significant digits (5 rules with examples), accuracy vs precision, rounding and chopping.

“List the rules for estimating errors.” — Rules 1–6 above.

### Check yourself (answers below)

1. How many significant digits in 0.04050?

2. Round 2.36500 to 3 significant figures.

3. Is chopping a truncation error?

4. A length is 50 cm but measured as 49.5 cm. Find 𝐸𝑎, 𝐸𝑟, 𝐸𝑝.

Answers: 1) 4 (4, 0, 5, 0). 2) 2.36 (exactly 5 → last kept digit 6 is even → leave). 3) No — it is a round-off type error.

4) 0.5 cm; 0.01; 1%.

# Solution of Algebraic and Transcendental Equations

## 2.1 What are we trying to do?

Goal: find a number x that makes f(x) = 0. That number is called a root (or zero) of the equation.

Example: f(x) = x³ + x − 1. Try x = 0: f = −1. Try x = 1: f = 1. Somewhere between 0 and 1 the value passes through 0. We want that x (it turns out to be 0.6823…). There’s no simple formula for it, so we approach it step by step.

### Algebraic vs transcendental equations

Algebraic equation: f(x) is a polynomial — only powers of x with constant coefficients. Example: 𝑥3 −4𝑥−9 = 0.

Transcendental equation: f(x) contains non-polynomial functions — trigonometric, logarithmic, exponential. Example: 𝑥log10 𝑥−1.2 = 0, 𝑒−𝑥= 𝑥, 2𝑥3 −log ( 𝑥+ 3 ) + tan 𝑥+ 𝑒𝑥= 0.

A polynomial of degree n has exactly n roots (counting complex and repeated roots). A transcendental equation can have any number of roots, even infinitely many (like sin x = 0).

### Step 0 for every method — find where the root is

Before any method, find two numbers a and b where f(a) and f(b) have opposite signs. By the Intermediate Value Theorem (Unit 1), a root lies between them.

How: make a small table.

| x | 0 | 1 | 2 |
|---|---|---|---|
| f(x) = x³ + x − 1 | −1 | +1 | 9 |

Sign changes between 0 and 1 → root in [0, 1].

(A rough graph also works: plot y = f(x) or split it as y = g(x) and y = h(x) and see where the curves cross — this is the graphical method in the syllabus.)

### Two families of methods

|  | Bracketing (closed) methods | Open methods |
|---|---|---|
| Start with | an interval [a, b] containing the root (f(a)·f(b) < 0) | one or two starting guesses, need not bracket the root |
| Always converge? | Yes — the root stays trapped | No — can diverge with a bad start |
| Speed | slower | faster |
| Methods | Bisection, Regula-Falsi | Secant, Iteration (successive approximation), Newton-Raphson |

## 2.2 Bisection method (Interval halving / Bolzano’s method)

> In one line: cut the interval in half, keep the half where the sign changes, repeat.

### Understand it

Think of the “guess my number between 1 and 100” game. Smart strategy: guess 50. “Higher.” Guess

75. “Lower.” Guess 62… Each guess halves the range. Bisection does exactly this with the root.

```
 a m b
 ●─────────────────┼─────────────────●
 f(a) < 0 f(m) = ? f(b) > 0
 If f(m) < 0 → root is in [m, b] (sign changes between m and b)
 If f(m) > 0 → root is in [a, m] (sign changes between a and m)
```

### Formula

𝑥𝑛= 𝑎+ 𝑏

2

### Step-by-step recipe

1. Find a, b with f(a) < 0 and f(b) > 0 (or opposite).

2. Midpoint 𝑚= ( 𝑎+ 𝑏) /2; compute f(m).

3. If f(m) = 0 → m is the root, stop.

4. If f(m) has the same sign as f(a) → replace a by m. Otherwise replace b by m. (Keep the two ends with opposite signs.)

5. Repeat steps 2–4 until two successive midpoints agree to the required accuracy.

### Worked example (CET-1, Q2-b): root of x³ + x = 1 correct to three decimal places

f(x) = x³ + x − 1. f(0) = −1 (negative), f(1) = 1 (positive) → root in [0, 1].

| n | a (f<0) | b (f>0) | m = (a+b)/2 | f(m) | Which half? |
|---|---|---|---|---|---|
| 1 | 0 | 1 | 0.5 | −0.3750 | f(m) < 0 → a = 0.5 |
| 2 | 0.5 | 1 | 0.75 | +0.1719 | f(m) > 0 → b = 0.75 |
| 3 | 0.5 | 0.75 | 0.625 | −0.1309 | a = 0.625 |
| 4 | 0.625 | 0.75 | 0.6875 | +0.0125 | b = 0.6875 |
| 5 | 0.625 | 0.6875 | 0.65625 | −0.0611 | a = 0.65625 |
| 6 | 0.65625 | 0.6875 | 0.67188 | −0.0248 | a = 0.67188 |
| 7 | 0.67188 | 0.6875 | 0.67969 | −0.0063 | a = 0.67969 |
| 8 | 0.67969 | 0.6875 | 0.68359 | +0.0030 | b = 0.68359 |
| 9 | 0.67969 | 0.68359 | 0.68164 | −0.0016 | a = 0.68164 |
| 10 | 0.68164 | 0.68359 | 0.68262 | +0.0007 | b = 0.68262 |
| 11 | 0.68164 | 0.68262 | 0.68213 | −0.0005 | a = 0.68213 |

The last midpoints 0.6826 and 0.6821 both round to 0.682. Root ≈ 0.682.

How to compute f(m) on the calculator for m = 0.75: 0.75³ = 0.421875; + 0.75 = 1.171875; − 1 = 0.171875 ✔.

### How many iterations are needed?

After n steps the interval length is 𝑏−𝑎

2𝑛. To get error ≤ ε:

𝑏−𝑎

𝑛≥log ( 𝑏−𝑎) −log 𝜀

⇒

≤𝜀

2𝑛

log 2

Example: [0, 1], ε = 0.001 → 2𝑛≥1000 → n ≥ 9.97 → 10 iterations.

### Facts to remember

Convergence: always (if f is continuous and the start brackets a root) — “guaranteed but slow”. Rate of convergence: linear, the slowest of all methods (error halves each step).

Other names: Interval halving method, Bolzano’s method, Binary chopping / Midpoint method. (CET MCQ “find the odd one out: Bisection, Bolzano, Midpoint, Regula-Falsi” → Regula-Falsi is the odd one.) Demerits: slow; cannot find a double root where f touches the axis without crossing (no sign change, e.g. (x−1)²); fails when two roots are very close (MCQ: “Bisection doesn’t work if two roots are almost equal”); needs a bracket.

### Python

```
def bisection(f, a, b, tol=1e-4):
 if f(a) * f(b) > 0:
 raise ValueError("f(a) and f(b) must have opposite signs")
 while (b - a) / 2 > tol:
 m = (a + b) / 2
 if f(m) == 0:
 return m
 if f(a) * f(m) < 0: # sign change in left half
 b = m
 else: # sign change in right half
 a = m
 return (a + b) / 2
print(bisection(lambda x: x**3 + x - 1, 0, 1)) # 0.6823
```

Line by line: f(a)*f(b) > 0 means same signs → no guaranteed root. The loop continues while half the interval is bigger than the tolerance. f(a)*f(m) < 0 checks if the sign changes between a and m.

## 2.3 Regula-Falsi method (Method of False Position)

> In one line: instead of the midpoint, use the point where the straight line joining (a, f(a)) and (b, f(b)) cuts the x-axis.

### Understand it

Bisection ignores the sizes of f(a) and f(b). If f(a) = −1 and f(b) = +100, the root is obviously much closer to a. Regula-Falsi uses this: draw a straight line (a chord) between the two points; where the chord hits the x-axis is a smarter guess.

```
 f(b) ●
 │╲ chord
 │ ╲
 ──────┼────╳────●──── x ╳ = new guess x₁ (where chord meets axis)
 │ ╲ │ ← true curve crosses here (root)
 │ ●f(a)
```

“Regula falsi” is Latin for “false position” — the guess is a “false” root that keeps getting better.

### Formula (derived from the straight line through the two points)

𝑥1 = 𝑎𝑓( 𝑏) −𝑏𝑓( 𝑎)

𝑓( 𝑏) −𝑓( 𝑎)

Derivation (for a 3-mark question): the line through (a, f(a)) and (b, f(b)) is

𝑦−𝑓( 𝑎) = 𝑓( 𝑏) −𝑓( 𝑎)

( 𝑥−𝑎) . Put y = 0 and solve for x → the formula above.

𝑏−𝑎

### Recipe

1. Find a, b with f(a), f(b) of opposite signs.

2. Compute 𝑥1 by the formula and f(x₁).

3. If f(x₁) has the same sign as f(a), replace a by x₁; else replace b by x₁.

4. Repeat until successive x values agree.

### Worked example (CET-1 Q3-b): fourth root of 32 correct to three decimal places

The fourth root of 32 is the x with x⁴ = 32, so solve f(x) = x⁴ − 32 = 0. f(2) = 16 − 32 = −16; f(3) = 81 − 32 = 49 → root in 2, 3.

Iteration 1: 𝑥1 = 2 ( 49 ) −3 ( −16 )

= 98 + 48

= 146

65 = 2.2462. f(2.2462) = −6.5459 (negative) → replace 49 −( −16 )

65

a.

| n | a | b | xₙ | f(xₙ) |
|---|---|---|---|---|
| 1 | 2 | 3 | 2.2462 | −6.5459 |
| 2 | 2.2462 | 3 | 2.3350 | −2.2737 |
| 3 | 2.3350 | 3 | 2.3645 | −0.7433 |
| 4 | 2.3645 | 3 | 2.3740 | −0.2381 |
| 5 | 2.3740 | 3 | 2.3770 | −0.0758 |
| 6 | 2.3770 | 3 | 2.3780 | −0.0241 |
| 7 | 2.3780 | 3 | 2.3783 | −0.0076 |

Successive values 2.3780 and 2.3783 agree to 3 decimals → ⁴√32 ≈ 2.378. Notice b = 3 never changed — one end stays fixed. That is typical of Regula-Falsi and is why it can be slow.

Second example (tutorial 4e): x³ − 2x − 5 = 0 in 2, 3 gives 2.0588, 2.0813, 2.0896, 2.0927, 2.0939, 2.0943 → 2.094.

### Facts

Convergence: always (bracketing). Rate: linear, but usually faster than bisection.

Drawback: one end point can stay fixed for many iterations → slow convergence for very curved functions.

## 2.4 Secant method

> In one line: same chord formula as Regula-Falsi, but always use the two most recent points — no checking of signs.

### Understand it

Regula-Falsi wastes time by keeping an old end point just to keep the bracket. Secant says: forget the bracket, just use the last two guesses. Faster — but because the root is no longer trapped, it can occasionally run away (diverge).

### Formula

𝑥𝑛−𝑥𝑛−1 𝑥𝑛+ 1 = 𝑥𝑛−𝑓( 𝑥𝑛)

𝑓( 𝑥𝑛) −𝑓( 𝑥𝑛−1 ) (Equivalently 𝑥𝑛+ 1 = 𝑥𝑛−1𝑓( 𝑥𝑛) −𝑥𝑛𝑓( 𝑥𝑛−1 )

.)

𝑓( 𝑥𝑛) −𝑓( 𝑥𝑛−1 )

### Worked example (tutorial 5d): x³ − 5x + 1 = 0

f(2) = −1, f(3) = 13. Take x₀ = 2, x₁ = 3.

| n | xₙ₋₁ |  | xₙ | xₙ₊₁ | f(xₙ₊₁) |
|---|---|---|---|---|---|
| 1 | 2 |  | 3 | 2.0714 | −0.46902 |
| 2 | 3 |  | 2.0714 | 2.1038 | −0.20794 |
| 3 | 2.0714 |  | 2.1038 | 2.1295 | +0.00943 |
| 4 | 2.1038 |  | 2.1295 | 2.1284 | −0.00018 |
| 5 2.1295 Step 1 in detail: 𝑥2 = 3 −13 ⋅ |  | 2.1284 2.1284 3 −2 = 3 = 2.0714. Root ≈ 2.128. 13 ) −13 14 −( −1 |  |  | 0.00000 |

### Facts

Convergence not guaranteed (open method). Rate ≈ 1.618 (super-linear) — faster than Regula-Falsi and bisection, slower than Newton.

Advantage over Newton: no derivative needed.

## 2.5 Successive approximation (Iteration / Fixed-point) method

### In one line: rewrite f(x) = 0 as x = φ(x), then keep feeding the answer back in: 𝑥𝑛+ 1 = 𝜑( 𝑥𝑛) .

### Understand it

If x = φ(x), the root is a value that φ “leaves unchanged” — a fixed point. Start with a guess, apply φ, apply φ again… If it works, the numbers settle down.

Try it on your calculator right now: put it in radian mode, type 1, then press cos again and again. The display settles at 0.739085… That’s the root of x = cos x — found by pure iteration!

### The convergence condition (very important — CET MCQ)

The iteration converges if

|𝜑′ ( 𝑥) | < 1

near the root

The smaller |φ′(x)| is, the faster the convergence. (CET-1 MCQ: “for rapid convergence φ′(x) should be smaller than 1”.) If |φ′(x)| > 1, the values jump further and further away.

There are many ways to rewrite f(x) = 0 as x = φ(x). Choose the one with |φ′(x)| < 1.

### Worked example (CET-1 Q3-c): 2x − log₁₀x = 7, correct to three decimals

Step 1 — locate: f(x) = 2x − log₁₀x − 7. f(3) = 6 − 0.477 − 7 = −1.477; f(4) = 8 − 0.602 − 7 = 0.398 → root in [3, 4], closer to 4.

7 + log10 𝑥

Step 2 — rewrite: 𝑥=

= 𝜑( 𝑥) .

2

2𝑥ln 10 = 0.2171

1

Step 3 — check: 𝜑′ ( 𝑥) =

. In [3, 4] this is about 0.06 < 1 ✔ — will converge fast. 𝑥

| 4 — | iterate with x₀ = 3.6: |  |  |
|---|---|---|---|
| n | xₙ | log₁₀ xₙ | xₙ₊₁ + log = (7 xₙ)/2 |
| 0 | 3.6 | 0.55630 | 3.77815 |
| 1 | 3.77815 | 0.57728 | 3.78864 |
| 2 | 3.78864 | 0.57848 | 3.78924 |
| 3 | 3.78924 | 0.57855 | 3.78928 |
| 4 | 3.78928 |  | 3.78928 |

Root ≈ 3.789.

Second example (tutorial 7d): cos x = 3x − 1 → 𝑥= 1 + cos 𝑥

; φ′ = −sin x / 3, |φ′| < 1 ✔. From x₀ = 0.6 3

(radians): 0.60845, 0.60685, 0.60715, 0.60709, 0.60710 → 0.607.

### Facts

Order of convergence: linear (first order).

Condition: |φ′(x)| < 1. Other names: fixed-point iteration, successive approximation, iteration method.

## 2.6 Newton-Raphson method (Tangent method)

> In one line: draw the tangent at the current point; where the tangent meets the x-axis is the next guess.

### Understand it

Near a point, a smooth curve looks almost like its tangent line. So replace the curve by its tangent, and solve the easy straight-line problem.

```
 f(x)
 │ ● (xₙ, f(xₙ))
 │ ╱
 │ ╱ ← tangent line, slope f′(xₙ)
 ───┼──────╳──●────────── x
 │ xₙ₊₁ root
```

### Derivation (asked in CET-1 Q2-e — learn it)

Let 𝑥𝑛 be an approximation and the true root be 𝑥𝑛+ ℎ (h small). Then 𝑓( 𝑥𝑛+ ℎ) = 0. Expand by Taylor series:

𝑓( 𝑥𝑛) + ℎ𝑓′ ( 𝑥𝑛) + ℎ2

2! 𝑓″ ( 𝑥𝑛) + ⋯= 0

Since h is small, ignore h² and higher terms:

ℎ= −𝑓( 𝑥𝑛)

⇒

𝑓( 𝑥𝑛) + ℎ𝑓′ ( 𝑥𝑛) = 0

𝑓′ ( 𝑥𝑛)

So the next approximation 𝑥𝑛+ 1 = 𝑥𝑛+ ℎ:

𝑥𝑛+ 1 = 𝑥𝑛−𝑓( 𝑥𝑛)

𝑓′ ( 𝑥𝑛)

(Geometric derivation: slope of tangent 𝑓′ ( 𝑥𝑛) = 𝑓( 𝑥𝑛) −0

→ same formula.)

𝑥𝑛−𝑥𝑛+ 1

### Recipe

1. Find an interval with a sign change; choose x₀ (the end where |f| is smaller, or the midpoint).

2. Find f′(x) by differentiation.

3. Apply the formula repeatedly until two values agree.

### Worked example (CET-1 Q3-a): x log₁₀ x = 1.2 to tolerance 0.01 %

𝑑𝑥(𝑥log10 𝑥) = log10 𝑥+ 𝑥⋅

f(x) = x log₁₀x − 1.2. Derivative: 𝑑

1

𝑥ln 10 = log10 𝑥+ 0.43429. So 𝑓′ ( 𝑥) = log10 𝑥+ 0.43429.

|  | f(2) = −0.598, f(3) = | +0.231 → root in 2, 3. Take | x₀ = 2.5. |  |
|---|---|---|---|---|
| n | xₙ | f(xₙ) | f′(xₙ) | xₙ₊₁ = xₙ − f/f′ |
| 0 | 2.5 | −0.20515 | 0.83223 | 2.74651 |
| 1 | 2.74651 | +0.00511 | 0.87307 | 2.74065 |
| 2 | 2.74065 | 0.00000 | 0.87215 | 2.74065 |

Tolerance check: |2.74065 −2.74651

| × 100 = 0.21% (not yet), then next change is 0% < 0.01% ✔. Root ≈ 2.74065

2.7406.

See how fast? Two steps. That’s quadratic convergence: the number of correct digits roughly doubles every step.

Second example (tutorial 6e): x³ − 3x + 1 = 0 near 1.5. f′ = 3x² − 3. x₀ = 1.5 → 1.53333 → 1.53209 → 1.53209. Root 1.532.

### Newton-Raphson deductions (formulas for roots and reciprocals — tutorial Q9)

(a) Square root of N: solve f(x) = x² − N = 0, f′ = 2x:

2 −𝑁

2(𝑥𝑛+ 𝑁

)

𝑥𝑛+ 1 = 𝑥𝑛−𝑥𝑛

= 1

2𝑥𝑛

𝑥𝑛

√21 from x₀ = 4.5: 4.583333 → 4.582576 → 4.582576. √21 = 4.5826.

(b) Reciprocal of N (1/N, no division needed): f(x) = 1/x − N:

𝑥𝑛+ 1 = 𝑥𝑛( 2 −𝑁𝑥𝑛)

1/18 from x₀ = 0.05: 0.05(2 − 0.9) = 0.055 → 0.055(2 − 0.99) = 0.05555 → 0.0555.

2 ) . 1/√15 → 0.2582.

2 ( 3 −𝑁𝑥𝑛

(c) Reciprocal square root 1/√N: 𝑥𝑛+ 1 = 𝑥𝑛

𝑘[ ( 𝑘−1 ) 𝑥𝑛+

𝑘−1 ].

(d) k-th root of N: f(x) = xᵏ − N: 𝑥𝑛+ 1 = 1

𝑁

𝑥𝑛

### When Newton-Raphson fails

f′(xₙ) = 0 (horizontal tangent) → division by zero. (Tutorial MCQ: NR fails when f′(x) is zero.) Bad starting value → may diverge or jump to a different root. (CET MCQ: “convergence prone to starting value” → Newton-Raphson.)

Needs the derivative, which may be hard to compute.

### Facts

Order of convergence: 2 (quadratic) — the fastest method in this unit.

Other name: Tangent method (CET MCQ).

Converges if |𝑓( 𝑥) 𝑓″ ( 𝑥) | < |𝑓′ ( 𝑥) |

2 near the root.

| Comparison of methods (very common 5-mark | question) |  |  |
|---|---|---|---|
| Starting Method Type Formula values | Order / rate | Converges? | Other names |
| Bisection Bracketing a, b with sign ( 𝑎+ 𝑏) /2 change | 1 (linear), slowest | Always | Interval halving, Bolzano, Midpoint |
| Regula-Falsi Bracketing a, b with sign 𝑎𝑓( 𝑏) 𝑎) −𝑏𝑓( 𝑓( 𝑏) 𝑎) change −𝑓( | 1 (linear), faster than bisection | Always | False position, Chord method |
| Secant Open x₀, x₁ 𝑥𝑛−𝑥𝑛−1 𝑥𝑛−𝑓𝑛 𝑓𝑛−𝑓𝑛−1 | 1.618 | Not always | Chord |
| Iteration Open x₀ = 𝑥𝑛+ 1 𝜑( 𝑥𝑛) | 1 (linear) | If | φ′ |
| Newton- Open x₀ 𝑥𝑛) /𝑓′ ( 𝑥𝑛) 𝑥𝑛−𝑓( Raphson | 2 (quadratic), fastest | Not always | Tangent method |

Demerits (two each):

Bisection: very slow; needs a bracket; fails for even-multiplicity roots.

Regula-Falsi: one end may stay fixed → slow; needs a bracket.

Secant: may diverge; f(xₙ) − f(xₙ₋₁) may become 0.

Iteration: may diverge if |φ′| ≥ 1; choosing φ is tricky.

Newton-Raphson: needs derivative; fails when f′ = 0; sensitive to x₀.

## 2.8 Descartes’ Rule of Signs

> In one line: count sign changes in the polynomial’s coefficients to know how many positive and negative real roots are possible.

### The rule

For a polynomial P(x) with real coefficients written in descending powers:

1. Number of positive real roots = number of sign changes in the coefficients of P(x), or less than that by an even number.

2. Number of negative real roots = number of sign changes in P(−x), or less by an even number.

3. Complex roots = degree − (real roots).

### Worked example (tutorial C-Q1a): 2x⁷ − x⁵ + 4x³ − 5 = 0

Signs of P(x): + − + − → changes: (+ to −), (− to +), (+ to −) = 3 → positive roots: 3 or 1.

P(−x) = 2(−x)⁷ − (−x)⁵ + 4(−x)³ − 5 = −2x⁷ + x⁵ − 4x³ − 5 → signs − + − − → changes = 2 → negative roots: 2 or 0.

Degree 7. Maximum real roots = 3 + 2 = 5 → at least 2 complex roots. (Complex roots always come in pairs.)

Note x = 0 is not a root (constant term −5 ≠ 0).

Example (tutorial C-Q1b): x⁷ − 3x⁴ + 2x³ − 1 = 0

P(x): + − + − → 3 changes → positive roots 3 or 1.

P(−x) = −x⁷ − 3x⁴ − 2x³ − 1 → − − − − → 0 changes → no negative roots.

Max real = 3 → at least 4 complex roots.

## 2.9 Budan’s Theorem (Budan–Fourier)

> In one line: count sign changes in the list f, f′, f″, … at both ends of an interval; the difference tells how many real roots lie in that interval.

### The theorem

Let f(x) be a polynomial of degree n. For a number c, write the sequence

𝑓( 𝑐) , 𝑓′ ( 𝑐) , 𝑓″ ( 𝑐) , …, 𝑓( 𝑛) ( 𝑐)

and let V(c) = number of sign changes in this sequence (ignore zeros). Then the number of real roots in (a,

b) is V(a) − V(b) or less than that by an even number.

### Worked example (CET-1 Q2-d / tutorial C-Q2a): x³ − 3x² − 4x + 13 = 0 in [−3,−2], [−2,−1], [−1,0], [0,1], [1,2], [2,3]

Derivatives:

f(x) = x³ − 3x² − 4x + 13

f′(x) = 3x² − 6x − 4

f″(x) = 6x − 6 f‴(x) = 6

| x | f | f′ | f″ | f‴ | Signs | V(x) |
|---|---|---|---|---|---|---|
| −3 | −29 | 41 | −24 | 6 | − + − + | 3 |
| −2 | 1 | 20 | −18 | 6 | + + − + | 2 |
| −1 | 13 | 5 | −12 | 6 | + + − + | 2 |
| 0 | 13 | −4 | −6 | 6 | + − − + | 2 |
| 1 | 7 | −7 | 0 | 6 | + − (0) + | 2 |
| 2 | 1 | −4 | 6 | 6 | + − + + | 2 |
| 3 | 1 | 5 | 12 | 6 | + + + + | 0 |

Number of roots in each interval = V(left) − V(right):

[−1, 0]: 0; [0, 1]: 0; [1, 2]: 0

This matches the tutorial answer: one, zero, zero, zero, zero, either two or zero.

How to compute f(−3): (−27) − 3(9) − 4(−3) + 13 = −27 − 27 + 12 + 13 = −29 ✔.

## 2.10 Lin-Bairstow’s method (finding a quadratic factor → complex roots)

> In one line: find a quadratic factor x² + px + q of the polynomial by repeatedly correcting p and q; its roots (often complex) are then found by the quadratic formula.

### Why we need it

All the earlier methods find one real root. A polynomial may have complex roots (like 1 ± 2i). Complex roots come in conjugate pairs, and each pair corresponds to a real quadratic factor x² + px + q. Bairstow finds that factor using only real arithmetic. (Tutorial MCQ: Lin-Bairstow is used to find complex roots.)

### The procedure (synthetic division twice)

Polynomial: 𝑎0𝑥𝑛+ 𝑎1𝑥𝑛−1 + … + 𝑎𝑛. Start with guesses p₀, q₀.

First division (gives b’s):

𝑏1 = 𝑎1 −𝑝𝑏0,

𝑏𝑘= 𝑎𝑘−𝑝𝑏𝑘−1 −𝑞𝑏𝑘−2 ( 𝑘= 2, …, 𝑛)

𝑏0 = 𝑎0,

Second division (gives c’s, same rule applied to the b’s):

𝑐1 = 𝑏1 −𝑝𝑐0,

𝑐𝑘= 𝑏𝑘−𝑝𝑐𝑘−1 −𝑞𝑐𝑘−2 ( 𝑘= 2, …, 𝑛−1 )

𝑐0 = 𝑏0,

If x² + px + q were an exact factor, the remainder terms 𝑏𝑛−1 and 𝑏𝑛 would be 0. They aren’t, so we correct p and q by Δp, Δq (your tutorial’s formula):

𝛥𝑞= 𝑏𝑛𝑐𝑛−2 −𝑏𝑛−1 ( 𝑐𝑛−1 −𝑏𝑛−1 )

𝑏𝑛−1𝑐𝑛−2 −𝑏𝑛𝑐𝑛−3

−𝑐𝑛−3 ( 𝑐𝑛−1 −𝑏𝑛−1 ) ,

−𝑐𝑛−3 ( 𝑐𝑛−1 −𝑏𝑛−1 )

𝛥𝑝=

𝑐𝑛−2

𝑐𝑛−2

New values: 𝑝←𝑝+ 𝛥𝑝, 𝑞←𝑞+ 𝛥𝑞. Repeat.

Tabular layout (how to write it in the exam):

```
 a0 a1 a2 a3 a4
 −p −p·b0 −p·b1 −p·b2 −p·b3
 −q −q·b0 −q·b1 −q·b2
 ─────────────────────────────────────────────────
 b0 b1 b2 b3 b4
 −p −p·c0 −p·c1 −p·c2
 −q −q·c0 −q·c1
 ─────────────────────────────────────────────────
 c0 c1 c2 c3
```

### Worked example (CET-1 Q3-d / tutorial Q8a): x⁴ − 3x³ + 20x² + 44x + 54 = 0, p₀ = q₀ = 2, two iterations

Coefficients a = 1, −3, 20, 44, 54; n = 4.

Iteration 1 (p = 2, q = 2)

b₀ = 1

b₁ = −3 − 2(1) = −5

b₂ = 20 − 2(−5) − 2(1) = 20 + 10 − 2 = 28

b₃ = 44 − 2(28) − 2(−5) = 44 − 56 + 10 = −2

b₄ = 54 − 2(−2) − 2(28) = 54 + 4 − 56 = 2

c₀ = 1

c₁ = −5 − 2(1) = −7

c₂ = 28 − 2(−7) − 2(1) = 28 + 14 − 2 = 40

c₃ = −2 − 2(40) − 2(−7) = −2 − 80 + 14 = −68

With n = 4: 𝑏𝑛−1 = 𝑏3 = −2, 𝑏𝑛= 𝑏4 = 2, 𝑐𝑛−1 = 𝑐3 = −68, 𝑐𝑛−2 = 𝑐2 = 40, 𝑐𝑛−3 = 𝑐1 = −7.

Denominator D = c₂² − c₁(c₃ − b₃) = 1600 − (−7)(−68 + 2) = 1600 − (−7)(−66) = 1600 − 462 = 1138.

Δp = [b₃c₂ − b₄c₁]/D = [(−2)(40) − (2)(−7)]/1138 = (−80 + 14)/1138 = −66/1138 = −0.0580

Δq = [b₄c₂ − b₃(c₃ − b₃)]/D = [(2)(40) − (−2)(−66)]/1138 = (80 − 132)/1138 = −52/1138 = −0.0457 New p = 2 − 0.0580 = 1.9420, q = 2 − 0.0457 = 1.9543.

Iteration 2 (p = 1.9420, q = 1.9543)

b: 1, −4.9420, 27.6431, −0.0248, 0.0251

c: 1, −6.8840, 39.0575, −62.4212

Δp = −0.0007, Δq = −0.0005

New p = 1.9413, q = 1.9538.

Answer: quadratic factor ≈ x² + 1.9413x + 1.9538. Its roots:

−1.9413 ± √1.94132 −4 ( 1.9538 )

= −0.9706 ± 1.0058𝑖 (complex). (A third iteration changes nothing 𝑥=

2

at 4 decimals.)

## 2.11 Python programs for the practicals

```
def regula_falsi(f, a, b, tol=1e-5, max_iter=100):
 for _ in range(max_iter):
 x = (a*f(b) - b*f(a)) / (f(b) - f(a))
 if abs(f(x)) < tol:
 return x
 if f(a)*f(x) < 0: b = x
 else: a = x
 return x
def newton_raphson(f, df, x0, tol=1e-6, max_iter=50):
 x = x0
 for _ in range(max_iter):
 x_new = x - f(x)/df(x)
 if abs(x_new - x) < tol:
 return x_new
 x = x_new
 return x
import math
print(regula_falsi(lambda x: x**4 - 32, 2, 3)) # 2.3784
print(newton_raphson(lambda x: x*math.log10(x) - 1.2,
 lambda x: math.log10(x) + 0.43429, 2.5)) # 2.7406
```

### Unit 2 — Check yourself

1. Why must f(a)·f(b) < 0 in bisection?

2. Which method needs a derivative? Which needs two starting points but no bracket?

3. For x = φ(x), what condition guarantees convergence?

4. Write the NR formula for √N.

5. Descartes: how many positive roots can x³ − x² + x − 1 have?

Answers: 1) It guarantees (by IVT) a root inside. 2) Newton-Raphson; Secant. 3) |φ′(x)| < 1 near the root. 4) 2 ( 𝑥𝑛+ 𝑁/𝑥𝑛) . 5) Signs + − + − → 3 changes → 3 or 1.

𝑥𝑛+ 1 = 1

# Curve Fitting (Method of Least Squares)

(No class notes for this unit were in your folder — this chapter follows the syllabus and Grewal/Sastry.)

## 3.1 What is curve fitting?

> In one line: given messy experimental data points, find the one simple formula (line or curve) that passes as close as possible to all of them.

### Understand it

In Unit 4 (interpolation) the curve must pass exactly through every point. But real measurements contain errors, so forcing a curve through every point gives a wiggly, useless curve. Curve fitting instead finds a smooth curve that follows the general trend, accepting small misses.

```
 y │ • ← data points (scattered)
 │ • ╱ •
 │ • ╱• ╱ = best-fit straight line
 │ •╱ •
 │ ╱ •
 └──────────────── x
```

Where used: predicting sales from advertising spend, calibration of sensors, growth curves, any “trend line” in Excel.

Interpolation vs curve fitting:

| Interpolation | Curve fitting |
|---|---|
| Curve passes through every point exactly | Curve passes close to points (best overall fit) |
| For accurate data (tables of functions) | For experimental data with errors |
| Degree grows with number of points | Simple chosen form (line, parabola, exponential) |

## 3.2 The principle of least squares

For each data point ( 𝑥𝑖, 𝑦𝑖) , the fitted curve gives a value 𝑌𝑖. The difference 𝑒𝑖= 𝑦𝑖−𝑌𝑖 is called the residual (error at that point).

We can’t make every residual zero, so we make the sum of the squares of the residuals as small as possible:

2 = ∑( 𝑦𝑖−𝑌𝑖)

2 →minimum

∑

𝑆=

𝑒𝑖

Why squares? (1) Positive and negative errors would cancel if just added; squaring makes all of them positive. (2) Squares punish big errors more. (3) Squares can be differentiated easily, so we can use calculus to find the minimum.

How the minimum is found: S depends on the unknown constants (a, b, …). At a minimum, the partial derivative of S with respect to each constant is zero. This gives a set of linear equations called the normal equations. Solve them → constants → fitted curve.

## 3.3 Fitting a straight line y = a + bx

### Derivation of the normal equations (5-mark question)

𝑆= ∑( 𝑦𝑖−𝑎−𝑏𝑥𝑖)

.

𝜕𝑎= −2 ∑( 𝑦𝑖−𝑎−𝑏𝑥𝑖) = 0 ⇒∑𝑦= 𝑛𝑎+ 𝑏∑𝑥

𝜕𝑆

𝜕𝑏= −2 ∑𝑥𝑖( 𝑦𝑖−𝑎−𝑏𝑥𝑖) = 0 ⇒∑𝑥𝑦= 𝑎∑𝑥+ 𝑏∑𝑥2

𝜕𝑆

Normal equations for a straight line:

∑𝑦= 𝑛𝑎+ 𝑏∑𝑥

∑𝑥𝑦= 𝑎∑𝑥+ 𝑏∑𝑥2

Memory trick: start from y = a + bx. Sum it → first equation. Multiply by x and sum → second equation.

### Recipe

1. Make a table with columns x, y, x², xy. Add each column.

2. Put the sums into the two normal equations.

3. Solve the two equations for a and b.

### Worked example

Fit a straight line to:

x

1

2

3

4

5

| y 2 | 5 | 7 8 | 11 |
|---|---|---|---|
| x | y | x² | xy |
| 1 | 2 | 1 | 2 |
| 2 | 5 | 4 | 10 |
| 3 | 7 | 9 | 21 |
| 4 | 8 | 16 | 32 |
| 5 | 11 | 25 | 55 |
| Σx = 15 | Σy = 33 | Σx² = 55 | Σxy = 120 |

n = 5. Normal equations:

33 = 5a + 15b … (1)

120 = 15a + 55b … (2)

Multiply (1) by 3: 99 = 15a + 45b. Subtract from (2): 21 = 10b → b = 2.1. From (1): 5a = 33 − 31.5 = 1.5 → a = 0.3.

Best-fit line: y = 0.3 + 2.1x. Check: at x = 3, y = 6.6 (data 7) — close, as expected.

Direct formulas (if you prefer):

𝑛∑𝑥2 −( ∑𝑥) 2 = 5 ( 120 ) −15 ( 33 )

𝑏= 𝑛∑𝑥𝑦−∑𝑥∑𝑦

𝑎= ‾𝑦−𝑏‾𝑥= 6.6 −2.1 ( 3 ) = 0.3 = 105

5 ( 55 ) −225

50 = 2.1,

Shortcut when x values are equally spaced: shift the origin to the middle, 𝑋= 𝑥−𝑥𝑚𝑖𝑑

, so ΣX = 0 and ℎ

the equations become trivial: 𝑎= ‾𝑦, 𝑏= ∑𝑋𝑦/ ∑𝑋2 (then convert back).

## 3.4 Fitting a parabola (second-degree polynomial) y = a + bx + cx²

### Normal equations (same trick: sum, ×x and sum, ×x² and sum)

∑𝑦= 𝑛𝑎+ 𝑏∑𝑥+ 𝑐∑𝑥2

∑𝑥𝑦= 𝑎∑𝑥+ 𝑏∑𝑥2 + 𝑐∑𝑥3

∑𝑥2𝑦= 𝑎∑𝑥2 + 𝑏∑𝑥3 + 𝑐∑𝑥4

### Worked example (Grewal)

| x | 0 | 1 |  | 2 |  | 3 |  | 4 |  |
|---|---|---|---|---|---|---|---|---|---|
| y | 1 | 1.8 |  | 1.3 |  | 2.5 |  | 6.3 |  |
| x | y |  | x² | x³ | x⁴ |  | xy |  | x²y |
| 0 | 1 |  | 0 | 0 | 0 |  | 0 |  | 0 |
| 1 | 1.8 |  | 1 | 1 | 1 |  | 1.8 |  | 1.8 |
| 2 | 1.3 |  | 4 | 8 | 16 |  | 2.6 |  | 5.2 |
| 3 | 2.5 |  | 9 | 27 | 81 |  | 7.5 |  | 22.5 |
| 4 | 6.3 |  | 16 | 64 | 256 |  | 25.2 |  | 100.8 |
| 10 | 12.9 |  | 30 | 100 | 354 |  | 37.1 |  | 130.3 |

Normal equations (n = 5):

12.9 = 5a + 10b + 30c

37.1 = 10a + 30b + 100c

130.3 = 30a + 100b + 354c

Solving (elimination or calculator’s equation mode): a = 1.42, b = −1.07, c = 0.55. Best-fit parabola: y = 1.42 − 1.07x + 0.55x².

## 3.5 Polynomial regression (general degree m)

For 𝑦= 𝑎0 + 𝑎1𝑥+ … + 𝑎𝑚𝑥𝑚 there are m + 1 normal equations. Equation k (k = 0 … m) is obtained by multiplying the model by 𝑥𝑘 and summing:

∑𝑥𝑘𝑦= 𝑎0 ∑𝑥𝑘+ 𝑎1 ∑𝑥𝑘+ 1 + ⋯+ 𝑎𝑚∑𝑥𝑘+ 𝑚

The straight line (m = 1) and parabola (m = 2) are special cases. Higher degrees fit better but can oscillate — choose the lowest degree that fits well.

## 3.6 Fitting non-linear curves (by converting to a straight line)

Some curves become straight lines after taking logarithms. Then use the straight-line method on the transformed data.

| Curve | Take logs | Becomes | Fit Y = A + BX with |
|---|---|---|---|
| 𝑦= 𝑎𝑒𝑏𝑥 (exponential) | ln 𝑦= ln 𝑎+ 𝑏𝑥 | Y = A + Bx | Y = ln y, A = ln a, B = b |
| 𝑦= 𝑎𝑏𝑥 | log 𝑦= log 𝑎+ 𝑥log 𝑏 | Y = A + Bx | Y = log y, A = log a, B = log b |
| 𝑦= 𝑎𝑥𝑏 (power) | log 𝑦= log 𝑎+ 𝑏log 𝑥 | Y = A + bX | Y = log y, X = log x, A = log a |

| Worked example: | fit y = ae^{bx} |  |  |  |
|---|---|---|---|---|
| x | 1 | 2 | 3 | 4 |
| y | 7 | 11 | 17 | 27 |

Take Y = ln y.

| x | y | Y = ln y | x² | xY |
|---|---|---|---|---|
| 1 | 7 | 1.9459 | 1 | 1.9459 |
| 2 | 11 | 2.3979 | 4 | 4.7958 |
| 3 | 17 | 2.8332 | 9 | 8.4996 |
| 4 | 27 | 3.2958 | 16 | 13.1833 |
| 10 |  | 10.4728 | 30 | 28.4246 |

Normal equations: 10.4728 = 4A + 10b; 28.4246 = 10A + 30b. → b = (4·28.4246 − 10·10.4728)/(4·30 − 100) = 8.9704/20 = 0.4485; A = (10.4728 − 10·0.4485)/4 = 1.4969 → a = e^{1.4969} = 4.468. Curve: y = 4.468 e^{0.4485x}. (Check: x = 4 → 4.468 × e^{1.794} = 26.9 ≈ 27 ✔.)

## 3.7 Python (practical 4: fitting a straight line)

```
def fit_line(x, y):
 n = len(x)
 sx, sy = sum(x), sum(y)
 sxx = sum(xi*xi for xi in x)
 sxy = sum(xi*yi for xi, yi in zip(x, y))
 b = (n*sxy - sx*sy) / (n*sxx - sx*sx) # slope
 a = (sy - b*sx) / n # intercept
 return a, b
print(fit_line([1,2,3,4,5], [2,5,7,8,11])) # (0.3, 2.1)
```

## Unit 3 — What to write in the exam

State the principle of least squares (minimise Σ residual²) and why squares are used.

Derive the normal equations for a straight line (and write them for a parabola).

Numerical: make the table of sums neatly, write normal equations, solve, state the final equation. Non-linear curves: show the log transformation table.

### Check yourself

1. What is a residual? 2. Write the normal equations for y = a + bx. 3. How do you fit y = ax^b? Answers: 1) observed y minus fitted Y. 2) Σy = na + bΣx; Σxy = aΣx + bΣx². 3) Take log: log y = log a + b log x, fit a straight line between log x and log y.

# Interpolation Techniques (24 marks — the biggest unit)

## 4.1 What is interpolation?

> In one line: using a table of known values to estimate a value in between them.

### Understand it

Suppose a table gives the temperature at 10 am, 11 am and 12 noon. Someone asks for 11:30 am. Nobody measured it, but you can make a very good estimate using the values around it. That is interpolation.

```
 y │ ●
 │ ? ╱ ← we want y at a point between table values
 │ ● ╱
 │ ╱ ●
 │ ●
 └──────────────────── x
 x0 x1 x x2 x3
```

Interpolation: finding y for an x inside the table’s range.

Extrapolation: finding y for an x outside the table’s range (beyond the first or last value). (CET-2 MCQ: “computing the value outside the given argument is called extrapolation”.)

Inverse interpolation: given y, find x.

Interpolation vs extrapolation:

| Interpolation | Extrapolation |
|---|---|
| x inside [x₀, xₙ] | x outside [x₀, xₙ] |
| More reliable | Less reliable — the trend may change outside the data |
| Example: population in 1995 from census of 1991, 2001 | Example: population in 2031 from census up to 2021 |

Idea behind all formulas: find a polynomial that passes exactly through the table points, then evaluate it at the required x. Different formulas are just different ways of writing that polynomial, each

convenient in a different situation.

### Which formula to use? (memorise this decision chart — tutorial Part B Q2)

```
 Are the x values equally spaced?
 / \
 YES NO
 │ │
 Where is x in the table? Lagrange's formula
 / | \ or Newton's Divided
 near start near middle near end Difference formula
 │ │ │ (both work for unequal
 Newton's Stirling's Newton's AND equal intervals)
 FORWARD formula BACKWARD
```

(CET-2 MCQ: “Which method can be used for both equal and unequal intervals?” → the divided difference method / Lagrange’s method — both work; the expected answer in your paper is (b) Divided difference method, since Lagrange is listed separately and “Newton’s method” means forward/backward.)

## 4.2 Finite differences — the building block

When x values are equally spaced with gap h (𝑥1 = 𝑥0 + ℎ, 𝑥2 = 𝑥0 + 2ℎ, …), we build a difference table: subtract neighbouring y values, then subtract neighbouring differences, and so on.

### Forward differences (Δ, “delta”)

𝛥𝑦0 = 𝑦1 −𝑦0,

𝛥𝑦1 = 𝑦2 −𝑦1, …

𝛥2𝑦0 = 𝛥𝑦1 −𝛥𝑦0, …

In words: Δ of something = (next one) − (this one).

### Backward differences (∇, “nabla”)

𝛻𝑦1 = 𝑦1 −𝑦0,

𝛻𝑦2 = 𝑦2 −𝑦1, …

𝛻2𝑦2 = 𝛻𝑦2 −𝛻𝑦1

In words: ∇ of something = (this one) − (previous one).

Important: the numbers in the table are the same — only the names differ. 𝛥𝑦0 and 𝛻𝑦1 are the same number (𝑦1 −𝑦0). Forward names use the top of each column; backward names use the bottom.

| How | to build the | table — worked example |  |  |  |
|---|---|---|---|---|---|
| x | y | Δy | Δ²y | Δ³y | Δ⁴y |
| 1 | 8 | 4 (12−8) |  |  |  |
| 3 | 12 | 9 (21−12) | 5 (9−4) | 1 (6−5) |  |
| 5 | 21 | 15 (36−21) | 6 (15−9) | 5 (11−6) | 4 (5−1) |
| 7 | 36 | 26 (62−36) | 11 (26−15) |  |  |
| 9 | 62 |  |  |  |  |

Forward differences of y₀ (top diagonal, bold): Δy₀ = 4, Δ²y₀ = 5, Δ³y₀ = 1, Δ⁴y₀ = 4.

Backward differences at x = 9 (bottom diagonal): ∇y = 26, ∇²y = 11, ∇³y = 5, ∇⁴y = 4.

CET-2 Q2(b): find ∇y(7) and ∇²y(9) for this table.

∇y(7) = y(7) − y(5) = 36 − 21 = 15.

∇²y(9) = ∇y(9) − ∇y(7) = (62 − 36) − 15 = 26 − 15 = 11.

Fact: for a polynomial of degree n, the n-th differences are constant and higher differences are zero. (If a table’s 3rd differences are constant, the data comes from a cubic.)

## 4.3 The operators and their relations

| An operator is a symbol that acts on | a function to give another function | (like “d/dx”). Your syllabus has six: |
|---|---|---|
| Operator | Name | Definition (h = step) −𝑓( |
| Δ | Forward difference | 𝛥𝑓( 𝑥) = 𝑓( 𝑥+ ℎ) 𝑥) −𝑓( 𝑥−ℎ) |
| ∇ | Backward difference | 𝛻𝑓( 𝑥) = 𝑓( 𝑥) |
| E | Shift operator | 𝐸𝑓( 𝑥) = 𝑓( 𝑥+ ℎ) ; 𝐸𝑛𝑓( 𝑥) = 𝑓( 𝑥+ 𝑛ℎ) ; 𝐸−1𝑓( 𝑥−ℎ) 𝑥) = 𝑓( 𝑓( ) −𝑓( 𝑥−ℎ ) |
| δ | Central difference | 𝛿𝑓( 𝑥) = 𝑥+ ℎ 2 2 [𝑓( ) 𝑓( 𝑥−ℎ ) ] |
| μ | Averaging (mean) operator | 𝜇𝑓( 𝑥) = 1 𝑥+ ℎ + 2 2 2 |
| D | Differential operator | 𝑑 𝐷𝑓( 𝑥) = 𝑓′ ( 𝑥) = 𝑑𝑥𝑓( 𝑥) |

(Tutorial MCQs: forward difference is 𝑓( 𝑥+ ℎ) −𝑓( 𝑥) ; 𝛥𝑦𝑥= 𝑦𝑥+ 1 −𝑦𝑥; 𝛻𝑦𝑥= 𝑦𝑥−𝑦𝑥−1.)

Think of E as “step forward by h”. Almost every relation is proved by writing both sides in terms of E.

### Proofs of the relations (CET-2 Q2-e, tutorial B-Q5/Q6 — learn these)

The method is always the same: apply both sides to f(x) and show they give the same thing.

(a) Δ = E − 1 𝛥𝑓( 𝑥) = 𝑓( 𝑥+ ℎ) −𝑓( 𝑥) = 𝐸𝑓( 𝑥) −𝑓( 𝑥) = ( 𝐸−1 ) 𝑓( 𝑥) . Since this holds for every f, Δ = E − 1 (equivalently E = 1 + Δ). (CET-2 MCQ answer: (a) Δ = E − 1.)

(b) ∇ = 1 − E⁻¹ 𝛻𝑓( 𝑥) = 𝑓( 𝑥) −𝑓( 𝑥−ℎ) = 𝑓( 𝑥) −𝐸−1𝑓( 𝑥) = ( 1 −𝐸−1 ) 𝑓( 𝑥) ⇒ ∇ = 1 − E⁻¹.

(c) δ = E^{1/2} − E^{−1/2} 𝛿𝑓( 𝑥) = 𝑓( 𝑥+ ℎ

2 ) −𝑓( 𝑥−ℎ

2 ) = 𝐸1/2𝑓( 𝑥) −𝐸−1/2𝑓( 𝑥) ⇒ δ = E^{1/2} − E^{−1/2}.

2 [𝐸1/2𝑓( 𝑥) + 𝐸−1/2𝑓( 𝑥) ] ⇒ μ = ½(E^{1/2} + E^{−1/2}).

(d) μ = ½(E^{1/2} + E^{−1/2}) 𝜇𝑓( 𝑥) = 1

(e) Δ = E∇ = ∇E = δE^{1/2} 𝐸𝛻𝑓( 𝑥) = 𝐸[ 𝑓( 𝑥) −𝑓( 𝑥−ℎ) ] = 𝑓( 𝑥+ ℎ) −𝑓( 𝑥) = 𝛥𝑓( 𝑥) ✔. 𝛿𝐸1/2𝑓( 𝑥) = 𝛿𝑓( 𝑥+ ℎ

2 ) = 𝑓( 𝑥+ ℎ) −𝑓( 𝑥) = 𝛥𝑓( 𝑥) ✔.

(f) E = e^{hD} (connects differences with derivatives) By Taylor series:

2! 𝑓″ ( 𝑥) + ⋯= (1 + ℎ𝐷+ ( ℎ𝐷) 2

+ ⋯)𝑓( 𝑥) = 𝑒ℎ𝐷𝑓( 𝑥) 𝐸𝑓( 𝑥) = 𝑓( 𝑥+ ℎ) = 𝑓( 𝑥) + ℎ𝑓′ ( 𝑥) + ℎ2

2!

(because 𝑒𝑡= 1 + 𝑡+ 𝑡2/2! + ⋯). So E = e^{hD}, and hence Δ = e^{hD} − 1, ∇ = 1 − e^{−hD}.

(g) Δ − ∇ = Δ∇ = δ² (CET-2 Q2-e(c))

Δ − ∇ = (E − 1) − (1 − E⁻¹) = E − 2 + E⁻¹.

Δ∇ = (E − 1)(1 − E⁻¹) = E − 1 − 1 + E⁻¹ = E − 2 + E⁻¹.

δ² = (E^{1/2} − E^{−1/2})² = E − 2 + E⁻¹. All three equal ⇒ proved.

(h) μδ = ½(Δ + ∇) μδ = ½(E^{1/2} + E{−1/2})(E{1/2} − E^{−1/2}) = ½(E − E⁻¹). And ½(Δ + ∇) = ½[(E − 1) + (1 − E⁻¹)] = ½(E − E⁻¹). ✔

(i) 1 + δ²μ² = (1 + ½δ²)² μ² = ¼(E + 2 + E⁻¹), δ² = E − 2 + E⁻¹. Let S = E + E⁻¹. Then δ²μ² = ¼(S − 2)(S + 2) = ¼(S² − 4), so LHS = ¼S². RHS: 1 + ½δ² = 1 + ½(S − 2) = ½S, squared = ¼S². ✔

## 4.4 Newton’s Forward Interpolation Formula

Use when: x values are equally spaced and the required x is near the beginning of the table.

𝑦( 𝑥) = 𝑦0 + 𝑝𝛥𝑦0 + 𝑝( 𝑝−1 )

𝛥2𝑦0 + 𝑝( 𝑝−1 ) ( 𝑝−2 )

𝑝= 𝑥−𝑥0 𝛥3𝑦0 + ⋯,

2!

3!

ℎ

What is p? It measures how many steps of size h the point x is from x₀. If x₀ = 100, h = 50 and x = 160, then p = 60/50 = 1.2 — “1.2 steps along the table”. (Tutorial MCQ: x₀ = 0.6, p = 2.6, h = 0.2 → x = x₀ + ph = 0.6 + 0.52 = 1.12.)

Pattern to remember: each new term multiplies by the next factor (p − k) and divides by the next factorial, and uses the next forward difference of y₀ (top diagonal).

Derivation idea (if asked): 𝑦𝑥= 𝐸𝑝𝑦0 = ( 1 + 𝛥)

𝑝𝑦0 and expand ( 1 + 𝛥)

𝑝 by the binomial theorem.

| Worked example | (tutorial | C-Q1 / CET-2 | Q3-d): | horizon distance |  |  |  |
|---|---|---|---|---|---|---|---|
| x (height, ft) | 100 | 150 | 200 | 250 | 300 | 350 | 400 |
| y (nautical miles) | 10.63 | 13.03 | 15.04 | 16.81 | 18.42 | 19.90 | 21.27 |

Find y at (a) x = 160 ft, (b) x = 410 ft.

Difference table:

| x | y | Δ | Δ² | Δ³ | Δ⁴ | Δ⁵ | Δ⁶ |
|---|---|---|---|---|---|---|---|
| 100 | 10.63 | 2.40 | −0.39 | 0.15 | −0.07 | 0.02 | 0.02 |
| 150 | 13.03 | 2.01 | −0.24 | 0.08 | −0.05 | 0.04 |  |
| 200 | 15.04 | 1.77 | −0.16 | 0.03 | −0.01 |  |  |
| 250 | 16.81 | 1.61 | −0.13 | 0.02 |  |  |  |
| 300 | 18.42 | 1.48 | −0.11 |  |  |  |  |
| 350 | 19.90 | 1.37 |  |  |  |  |  |
| 400 | 21.27 |  |  |  |  |  |  |

(Each row shows the differences starting from that row — the forward differences of y₀ are the bold top row; the backward differences of y at 400 are the last entry in each column: 1.37, −0.11, 0.02, −0.01, 0.04,

0.02.)

(a) x = 160 (near the start → forward formula). x₀ = 100, h = 50, p = (160 − 100)/50 = 1.2.

| x = 160 (near the start → forward | formula). x₀ = 100, h = 50, p = (160 | − 100)/50 |
|---|---|---|
| Term | Calculation | Value |
| y₀ |  | 10.63 |
| pΔy₀ | 1.2 × 2.40 | 2.88 |
| p(p−1)/2! · Δ²y₀ | 1.2 × 0.2 / 2 × (−0.39) | −0.0468 |
| p(p−1)(p−2)/3! · Δ³y₀ | 1.2 × 0.2 × (−0.8) / 6 × 0.15 | −0.0048 |
| p(p−1)(p−2)(p−3)/4! · Δ⁴y₀ | (1.2)(0.2)(−0.8)(−1.8)/24 × (−0.07) | −0.0010 |
| further terms |  | ≈ 0 |
| Sum |  | 13.457 |

y(160) ≈ 13.46 nautical miles.

## 4.5 Newton’s Backward Interpolation Formula

Use when: equally spaced, and x is near the end of the table (or just beyond it — extrapolation). 𝑝= 𝑥−𝑥𝑛 𝑦( 𝑥) = 𝑦𝑛+ 𝑝𝛻𝑦𝑛+ 𝑝( 𝑝+ 1 )

𝛻2𝑦𝑛+ 𝑝( 𝑝+ 1 ) ( 𝑝+ 2 )

𝛻3𝑦𝑛+ ⋯,

2!

3!

ℎ Note the plus signs (p+1), (p+2) — the opposite of the forward formula — and that p is measured from the last value xₙ (p is usually negative for interpolation, positive for extrapolation beyond the end).

(b) x = 410 (beyond the end → backward formula). xₙ = 400, p = (410 − 400)/50 = 0.2. Backward

| at 400: ∇ = 1.37, ∇² = | −0.11, ∇³ = 0.02, ∇⁴ = −0.01, ∇⁵ = 0.04, ∇⁶ = | 0.02. |
|---|---|---|
| Term | Calculation | Value |
| yₙ |  | 21.27 |
| p∇ | × 0.2 1.37 | 0.274 |
| p(p+1)/2 · ∇² | 0.2 × 1.2 / 2 × (−0.11) | −0.0132 |
| p(p+1)(p+2)/6 · ∇³ | 0.2 × 1.2 × 2.2 / 6 × 0.02 | 0.0018 |
| higher terms |  | ≈ 0.003 (small) |
| Sum |  | ≈ 21.53 |

y(410) ≈ 21.53 nautical miles.

Another tutorial example (Q5): area of circle — diameters 80…100, find A at d = 105 (beyond the end) → backward formula → 8666.

## 4.6 Central differences and Stirling’s formula

Use when: equally spaced and x is near the middle of the table (−½ < p < ½ works best).

Choose the table value nearest to x as the origin x₀ (so the table is labelled …, y₋₂, y₋₁, y₀, y₁, y₂, …). Then

+ 𝑝2 ( 𝑝2 −1 )

2!𝛥2𝑦−1 + 𝑝( 𝑝2 −1 )

𝛥3𝑦−2 + 𝛥3𝑦−1

𝛥𝑦−1 + 𝛥𝑦0

+ 𝑝2

⋅

𝛥4𝑦−2 + ⋯ 𝑦( 𝑥) = 𝑦0 + 𝑝

2

3!

2

4!

with 𝑝= ( 𝑥−𝑥0 ) /ℎ.

How to read it: Stirling uses the differences lying on the horizontal line through y₀ in the difference table: odd differences are the average of the two just above and below that line; even differences are the single value on the line.

### Worked example (CET-2 Q3-a / tutorial Q7): y₃₅ given y₂₀ = 512, y₃₀ = 439, y₄₀ = 346, y₅₀ = 243

Take x₀ = 30 (nearest to 35), h = 10, p = (35 − 30)/10 = 0.5. Labels: y₋₁ = 512 (x=20), y₀ = 439, y₁ = 346, y₂ = 243.

| x | y | Δ | Δ² | Δ³ |
|---|---|---|---|---|
| 20 | 512 (y₋₁) | −73 (Δy₋₁) | −20 (Δ²y₋₁) | 10 (Δ³y₋₁) |
| 30 | 439 (y₀) | −93 (Δy₀) | −10 (Δ²y₀) |  |
| 40 | 346 (y₁) | −103 |  |  |
| 50 | 243 (y₂) |  |  |  |

Stirling (up to second differences — the third-difference term needs Δ³y₋₂, which doesn’t exist in this short table):

𝑦35 = 439 + 0.5 × −73 + ( −93 )

+ 0.52

× ( −20 ) = 439 −41.5 −2.5 = 𝟑𝟗𝟓

2

2

About 395 persons.

Example 2 (tutorial Q6): tan 16° from tan 0°, 5°, …, 30° with x₀ = 15°, p = 0.2 → tan 16° ≈ 0.2867 (true value 0.2867 ✔).

## 4.7 Lagrange’s Interpolation Formula

Use when: x values are unequally spaced (also works for equal spacing). No difference table needed. For n + 1 points (𝑥0, 𝑦0 ), …, ( 𝑥𝑛, 𝑦𝑛) :

𝑥−𝑥𝑗

∑

𝐿𝑖( 𝑥) = ∏

𝑦( 𝑥) =

𝐿𝑖( 𝑥) 𝑦𝑖,

𝑥𝑖−𝑥𝑗

In words: each y-value gets a weight 𝐿𝑖. The weight’s top line is “(x minus every other x-value)” multiplied together; the bottom line is “(this xᵢ minus every other x-value)” multiplied together.

Written out for four points:

( 𝑥−𝑥1 ) ( 𝑥−𝑥2 ) ( 𝑥−𝑥3 )

( 𝑥−𝑥0 ) ( 𝑥−𝑥2 ) ( 𝑥−𝑥3 )

( 𝑥0 −𝑥1 ) ( 𝑥0 −𝑥2 ) ( 𝑥0 −𝑥3 ) 𝑦0 +

( 𝑥1 −𝑥0 ) ( 𝑥1 −𝑥2 ) ( 𝑥1 −𝑥3 ) 𝑦1

𝑦=

( 𝑥−𝑥0 ) ( 𝑥−𝑥1 ) ( 𝑥−𝑥3 )

( 𝑥−𝑥0 ) ( 𝑥−𝑥1 ) ( 𝑥−𝑥2 )

( 𝑥2 −𝑥0 ) ( 𝑥2 −𝑥1 ) ( 𝑥2 −𝑥3 ) 𝑦2 +

( 𝑥3 −𝑥0 ) ( 𝑥3 −𝑥1 ) ( 𝑥3 −𝑥2 ) 𝑦3

+

Why does it work? 𝐿𝑖 equals 1 at 𝑥𝑖 and 0 at every other table point, so the formula reproduces the table exactly.

| Worked | example (CET-2 Q3-c | / | tutorial Q11): |  | viscosity | at 140° |  |  |  |  |
|---|---|---|---|---|---|---|---|---|---|---|
| t | 110 |  | 130 |  |  | 160 |  |  |  | 190 |
| v | 10.8 |  | 8.1 |  |  | 5.5 |  |  |  | 4.8 |
| = 140. | −130 −160 ( 140 ) ( 140 ) | ( 140 | −190 ) | ( | −20 10 ) ( | −50 ) ( ) | 10000 |  |  | −0.12500 |
| 𝐿0 = | −130 −160 ( 110 ) ( 110 ) −110 −160 ( 140 ) ( 140 | ( 110 ) ( | −190 = ) −190 140 ) | ( | −20 −50 ) ( ( 30 ) ( | −80 = ) ( ) −20 −50 ) ( ) | −80000 | 30000 |  | = |
| 𝐿1 = | −110 −160 ( 130 ) ( 130 −50 ( 30 ) ( 10 ) ( ) | ) ( −15000 | −190 130 ) | = | ( 20 ) ( | −30 −60 ) ( ) | = | 36000 |  | = 0.83333 |
| 𝐿2 = | −30 = ( 50 ) ( 30 ) ( ) −20 ( 30 ) ( 10 ) ( ) | −45000 −6000 | = 0.33333 −0.04167 |  |  |  |  |  |  |  |
| 𝐿3 = | = ( 80 ) ( 60 ) ( 30 ) | 144000 | = |  |  |  |  |  |  |  |

Check: the L’s add up to 1 (−0.125 + 0.8333 + 0.3333 − 0.0417 = 1 ✔ — always true, a great error check).

v(140) = (−0.125)(10.8) + (0.83333)(8.1) + (0.33333)(5.5) + (−0.04167)(4.8) = −1.35 + 6.75 + 1.8333 − 0.2 = 7.03.

### Example (CET-2 Q3-e / tutorial Q12): log₁₀656 from log 654, 658, 659, 661

Weights at x = 656: L₀ = 0.21429, L₁ = 2.5, L₂ = −2.0, L₃ = 0.28571 (sum = 1 ✔). log 656 = 0.21429(2.8156) + 2.5(2.8182) − 2.0(2.8189) + 0.28571(2.8202) = 2.8168.

### Example (tutorial MCQ Q9): polynomial through (0, 2), (2, 1), (1, 0)

( 2 −0 ) ( 2 −1 ) ⋅1 + 0 = ( 𝑥2 −3𝑥+ 2 ) + 𝑥2 −𝑥

= 3𝑥2 −7𝑥+ 4 𝑦= ( 𝑥−2 ) ( 𝑥−1 )

( 0 −2 ) ( 0 −1 ) ⋅2 + ( 𝑥−0 ) ( 𝑥−1 )

→ option 2

2

(a).

### Example (tutorial Q10): y(10) from (5,12), (6,13), (9,14), (11,16)

L-weights at x = 10: 0.16667, −0.33333, 0.83333, 0.33333 → y = 2 − 4.3333 + 11.6667 + 5.3333 = 14.67. (Your sheet prints 14.63; 14.67 is the exact value of this formula.)

### Finding the polynomial (tutorial Q13): y(1) = −3, y(3) = 9, y(4) = 30, y(6) = 132

Keep x as a symbol, expand each term, add → y = x³ − 3x² + 5x − 6. (Check: x = 3 → 27 − 27 + 15 − 6 = 9 ✔.)

Disadvantages of Lagrange: heavy calculation; if you add one more point, everything must be recomputed (Newton’s divided difference doesn’t have this problem).

## 4.8 Newton’s Divided Difference Formula

Use when: unequal spacing, and you want a formula where adding a point just adds one term.

### Divided differences

[ 𝑥0, 𝑥1, 𝑥2 ] = [ 𝑥1, 𝑥2 ] −[ 𝑥0, 𝑥1 ]

𝑦1 −𝑦0

[ 𝑥0, 𝑥1 ] =

𝑥1 −𝑥0

,

𝑥2 −𝑥0

,

…

Like a difference table, but each difference is divided by the gap between the outermost x’s involved.

### Formula

𝑦( 𝑥) = 𝑦0 + ( 𝑥−𝑥0 ) [ 𝑥0, 𝑥1 ] + ( 𝑥−𝑥0 ) ( 𝑥−𝑥1 ) [ 𝑥0, 𝑥1, 𝑥2 ]

+ ( 𝑥−𝑥0 ) ( 𝑥−𝑥1 ) ( 𝑥−𝑥2 ) [ 𝑥0, …, 𝑥3 ] + ⋯

| Worked example | (tutorial Q16): | f(8) and f(15) |  |  |  |
|---|---|---|---|---|---|
| x | f(x) | 1st div. diff | 2nd | 3rd | 4th |
| 4 | 48 | (100−48)/(5−4) = 52 | (97−52)/(7−4) = 15 | (21−15)/(10−4) = 1 | 0 |
| 5 | 100 | (294−100)/(7−5) = 97 | (202−97)/(10−5) = 21 | (27−21)/(11−5) = 1 | 0 |
| 7 | 294 | (900−294)/(10−7 ) = 202 | (310−202)/(11−7) = 27 | (33−27)/(13−7) = 1 |  |
| 10 | 900 | (1210−900)/(11−1 0) = 310 | (409−310)/(13−10 ) = 33 |  |  |
| 11 | 1210 | (2028−1210)/(13− 11) = 409 |  |  |  |
| 13 | 2028 |  |  |  |  |

Use the top row (bold): f(x) = 48 + (x−4)(52) + (x−4)(x−5)(15) + (x−4)(x−5)(x−7)(1).

f(8) = 48 + 4(52) + 4·3·15 + 4·3·1 = 48 + 208 + 180 + 12 = 448.

f(15) = 48 + 11(52) + 11·10·15 + 11·10·8 = 48 + 572 + 1650 + 880 = 3150.

(The data is actually f(x) = x³ − x²; 8³ − 8² = 448 ✔.)

Divided difference vs Newton forward/backward (tutorial B-Q7): divided differences work for unequal intervals, forward/backward need equal spacing; divided differences divide by x-gaps, ordinary 𝛥𝑘𝑦0

differences don’t; for equal spacing, [ 𝑥0, …, 𝑥𝑘] =

𝑘! ℎ𝑘.

## 4.9 Spline interpolation and cubic splines

### Why splines?

One high-degree polynomial through many points tends to wiggle wildly between points. A spline instead uses a different low-degree polynomial on each sub-interval, joined smoothly — like a flexible drafting ruler (“spline”) bent through pins.

Definition: a spline of degree k is a piecewise polynomial of degree ≤ k whose derivatives up to order k − 1 are continuous at the joining points (knots).

Linear spline = straight segments (continuous, but corners).

Cubic spline = a cubic on each interval, with f, f′ and f″ all continuous → looks perfectly smooth.

Applications (tutorial B-Q8): computer graphics and fonts (curve drawing), CAD design of car bodies/ship hulls, animation paths, robot motion planning, data smoothing.

### Cubic spline properties (tutorial B-Q9/Q10)

On each interval [ 𝑥𝑖−1, 𝑥𝑖] , s(x) is a cubic, and:

1. s passes through every data point.

2. s, s′ and s″ are continuous at every interior knot (continuity of s′ is the condition asked in Q10: the slopes from the left and the right piece are equal at each knot).

3. Natural spline: 𝑠″ ( 𝑥0 ) = 𝑠″ ( 𝑥𝑛) = 0 (i.e., M₀ = Mₙ = 0).

### Formula (equal spacing h; Mᵢ = s″(xᵢ))

On [ 𝑥𝑖−1, 𝑥𝑖] :

6ℎ[ ( 𝑥𝑖−𝑥) 3𝑀𝑖−1 + ( 𝑥−𝑥𝑖−1 ) 3𝑀𝑖]

𝑠( 𝑥) = 1

ℎ(𝑦𝑖−1 −ℎ2

6 𝑀𝑖−1) ( 𝑥𝑖−𝑥) + 1

ℎ(𝑦𝑖−ℎ2

6 𝑀𝑖) ( 𝑥−𝑥𝑖−1 )

+ 1

The M’s come from the equations (i = 1, …, n−1):

ℎ2 (𝑦𝑖−1 −2𝑦𝑖+ 𝑦𝑖+ 1 )

𝑀𝑖−1 + 4𝑀𝑖+ 𝑀𝑖+ 1 = 6

### Worked example (tutorial Q22): x = 0, 1, 2, 3; f = 1, 2, 33, 244 (natural spline, h = 1)

Equations (M₀ = M₃ = 0):

i = 1: 4M₁ + M₂ = 6(1 − 4 + 33) = 180

i = 2: M₁ + 4M₂ = 6(2 − 66 + 244) = 1080

Solve: from the first, M₂ = 180 − 4M₁; substitute: M₁ + 720 − 16M₁ = 1080 → −15M₁ = 360 → M₁ = −24, M₂ = 276.

Piece on [0, 1] (M₀ = 0, M₁ = −24, y₀ = 1, y₁ = 2):

6 [𝑥3 ( −24 ) ] + ( 1 −0 ) ( 1 −𝑥) + ( 2 + 4 ) ( 𝑥) = −4𝑥3 + 1 −𝑥+ 6𝑥= −4x³ + 5x + 1 ✔ 𝑠( 𝑥) = 1

(matches the tutorial). Similarly [1, 2]: 50x³ − 162x² + 167x − 21; 2, 3: −46x³ + 414x² − 985x + 715.

(Tutorial Q23 with y = 1, 5, 11, 8 at x = 1…4 gives M₁ = 6.8, M₂ = −15.2 and y(1.5) = 2.575.)

## 4.10 Python (practicals 5 and 6)

```
from math import factorial
def forward_table(y):
 """Return list of columns: y, Δy, Δ²y, ..."""
 table = [list(y)]
 while len(table[-1]) > 1:
 prev = table[-1]
 table.append([prev[i+1] - prev[i] for i in range(len(prev)-1)])
 return table
def newton_forward(x, y, xp):
 h = x[1] - x[0]
 p = (xp - x[0]) / h
 t = forward_table(y)
 result, term = y[0], 1.0
 for k in range(1, len(y)):
 term *= (p - (k - 1)) # p(p-1)(p-2)...
 result += term * t[k][0] / factorial(k)
 return result
def newton_backward(x, y, xp):
 h = x[1] - x[0]
 p = (xp - x[-1]) / h
 t = forward_table(y)
 result, term = y[-1], 1.0
 for k in range(1, len(y)):
 term *= (p + (k - 1)) # p(p+1)(p+2)...
 result += term * t[k][-1] / factorial(k)
 return result
x = [100,150,200,250,300,350,400]
y = [10.63,13.03,15.04,16.81,18.42,19.90,21.27]
print(round(newton_forward(x, y, 160), 2), round(newton_backward(x, y, 410), 2)) # 13.46 21.54
```

## Unit 4 — What to write in the exam

Definitions: interpolation, extrapolation; list techniques for equal (forward, backward, Stirling) and unequal (Lagrange, divided difference) intervals.

Define all operators; prove relations (Δ = E − 1, ∇ = 1 − E⁻¹, E = e^{hD}, Δ − ∇ = Δ∇ = δ²).

Numericals: always draw the full difference table, state which formula and why, compute p, then a term-by-term table.

### Check yourself

1. Table with x = 1, 2, 3, 4, 5, find y(4.6) — which formula? 2. Data at x = 2, 5, 6, 10 — which formula?

3. Prove E = 1 + Δ. 4. In Lagrange, what should the sum of the L’s be? Answers: 1) Newton’s backward. 2) Lagrange or divided difference. 3) Δf(x) = f(x+h) − f(x) = Ef(x) − f(x) ⇒ E = 1 + Δ. 4) Exactly 1.

# Solution of Systems of Linear Equations: Iterative Methods

## 5.1 What is the problem?

Solve several equations together, e.g.

10𝑥+ 𝑦−𝑧= 11.19,

−𝑥+ 𝑦+ 10𝑧= 35.61

𝑥+ 10𝑦+ 𝑧= 28.08,

### Two families of methods

Direct methods — a fixed number of steps gives the exact answer (apart from round-off): Gauss elimination, Gauss-Jordan, Cramer’s rule, matrix inversion, LU (Crout/Doolittle) decomposition. Iterative methods — start with a guess and improve it repeatedly: Gauss-Jacobi, Gauss-Seidel, relaxation.

| Direct methods | Iterative methods |
|---|---|
| Exact answer in a fixed number of steps | Approximate answer that improves with each iteration |
| Round-off errors accumulate | Self-correcting — an error in one step gets corrected later |
| Good for small, dense systems | Good for large, sparse systems (mostly zeros) |
| No convergence condition | Need diagonal dominance to guarantee convergence |

## 5.2 The key condition: diagonal dominance

> In one line: in every equation, the coefficient on the diagonal (x in eq 1, y in eq 2, z in eq 3) must be bigger (in size) than the sum of the other coefficients in that row.

|𝑎11| ≥|𝑎12| + |𝑎13|,

|𝑎22| ≥|𝑎21| + |𝑎23|,

|𝑎33| ≥|𝑎31| + |𝑎32|

(with strict “>” in at least one row). This is the sufficient condition for convergence of both Jacobi and Seidel (tutorial B-Q3; CET-2 MCQ: Jacobi is applicable when the matrix is diagonally dominant).

Why does it matter? Each iteration divides by the diagonal coefficient. A big diagonal means the other (guessed) unknowns have only a small effect, so guessing errors shrink every iteration.

If the system isn’t diagonally dominant, rearrange the equations first. Example (tutorial Q1c): x + y + 54z = 110, 27x + 6y − z = 12, 6x + 15y + 2z = 72. Reorder as: 27x + 6y − z = 12 (x-row), 6x + 15y + 2z = 72 (y- row), x + y + 54z = 110 (z-row). Now 27 > 7, 15 > 8, 54 > 2 ✔.

## 5.3 Gauss-Jacobi method (method of simultaneous displacements)

> In one line: solve each equation for its own diagonal unknown; plug all old values in at once to get all new values; repeat.

### Recipe

1. Check / arrange for diagonal dominance.

2. Rewrite: x from equation 1, y from equation 2, z from equation 3.

3. Start with x₀ = y₀ = z₀ = 0.

4. Compute new x, y, z all using the previous iteration’s values.

5. Repeat until two iterations agree to the required decimals.

### Worked example (CET-1 Q2-c / tutorial Q1b — also in your handwritten notes)

10𝑥+ 𝑦−𝑧= 11.19, 𝑥+ 10𝑦+ 𝑧= 28.08, −𝑥+ 𝑦+ 10𝑧= 35.61, correct to two decimals.

Step 1 — dominance: |10| > |1| + |−1| = 2 ✔; |10| > 2 ✔; |10| > 2 ✔ → convergence assured.

Step 2 — rewrite:

𝑥= 11.19 −𝑦+ 𝑧

𝑦= 28.08 −𝑥−𝑧

𝑧= 35.61 + 𝑥−𝑦

,

,

10

10

10

| Step 3 — iterate (every new value | uses the previous row): |  |  |
|---|---|---|---|
| Iteration | x | y | z |
| 0 | 0 | 0 | 0 |
| 1 | 1.1190 | 2.8080 | 3.5610 |
| 2 | 1.1943 | 2.3400 | 3.3921 |
| 3 | 1.2242 | 2.3494 | 3.4464 |
| 4 | 1.2287 | 2.3409 | 3.4485 |
| 5 | 1.2298 | 2.3403 | 3.4498 |
| 6 | 1.2299 | 2.3400 | 3.4499 |

Iteration 2 in detail (using iteration-1 values x = 1.119, y = 2.808, z = 3.561):

x = (11.19 − 2.808 + 3.561)/10 = 11.943/10 = 1.1943

y = (28.08 − 1.119 − 3.561)/10 = 23.4/10 = 2.3400

z = (35.61 + 1.119 − 2.808)/10 = 33.921/10 = 3.3921

Iterations 5 and 6 agree to two decimals → x = 1.23, y = 2.34, z = 3.45.

Example 2 (CET-2 Q2-a / tutorial Q1a): 5x − y + z = 10, 2x + 4y = 12, x + y + 5z = −1. x = (10 + y − z)/5, y = (12 − 2x)/4, z = (−1 − x − y)/5. From zeros: (2, 3, −0.2), (2.64, 2, −1.2), (2.64, 1.68, −1.128), … → converges to x = 2.556, y = 1.722, z = −1.056.

## 5.4 Gauss-Seidel method (method of successive displacements)

> In one line: same as Jacobi, but use each new value immediately as soon as you compute it.

### Understand the difference

In Jacobi, when computing y in iteration 2 you still use the old x from iteration 1, even though you have just calculated a better x. Seidel says: why waste it? Use the newest x right away. Result: faster convergence — about twice as fast (CET-1 MCQ: Seidel converges faster because it uses the latest available values).

### Worked example (CET-1 Q3-e / CET-2 Q2-d / tutorial Q2e)

30𝑥−2𝑦+ 3𝑧= 75, 𝑥+ 17𝑦−2𝑧= 48, 𝑥+ 𝑦+ 9𝑧= 15, correct to two decimals.

Dominance: 30 > 5, 17 > 3, 9 > 2 ✔.

𝑥= 75 + 2𝑦−3𝑧

𝑦= 48 −𝑥+ 2𝑧

𝑧= 15 −𝑥−𝑦

,

,

30

17

9

Iteration 1 (start y = z = 0):

x = (75 + 0 − 0)/30 = 2.5000

y = (48 − 2.5 + 0)/17 = 45.5/17 = 2.6765 ← uses the new x

| z = (15 − 2.5 − 2.6765)/9 | = 9.8235/9 = 1.0915 ← uses | new x and new y |  |
|---|---|---|---|
| Iteration | x | y | z |
| 1 | 2.5000 | 2.6765 | 1.0915 |
| 2 | 2.5693 | 2.8008 | 1.0700 |
| 3 | 2.5797 | 2.7977 | 1.0692 |
| 4 | 2.5796 | 2.7976 | 1.0692 |

Answer: x = 2.58, y = 2.80, z = 1.07.

Compare speed: on the Jacobi example above, Seidel reaches (1.2299, 2.3400, 3.4500) in 4 iterations instead of 6.

### Jacobi vs Seidel (tutorial B-Q4)

| Gauss-Jacobi | Gauss-Seidel |
|---|---|
| Uses values of the previous iteration only | Uses the latest values immediately |
| “Simultaneous displacement” | “Successive displacement” (tutorial MCQ) |
| Slower | ≈ 2× faster |
| All unknowns can be computed in parallel | Must be computed in sequence |
| Needs storage for old and new vectors | Only one vector needed |
| Same convergence condition: diagonal dominance | Same |

## 5.5 Well-conditioned and ill-conditioned systems

> In one line: a system is ill-conditioned if a tiny change in the coefficients causes a huge change in the solution.

Understand it: two nearly parallel lines. Wiggle one of them slightly, and their crossing point slides far away. Such a system is untrustworthy because real data always has small errors.

Indicator: the determinant of the coefficient matrix is very small compared to the coefficients (the equations are “almost dependent”).

### Worked example (tutorial B-Q5): 1.01x + 2y = 2.01, x + 2y = 2

Determinant = 1.01(2) − 2(1) = 0.02 — very small → suspect.

Solution: subtract → 0.01x = 0.01 → x = 1, y = 0.5.

Now change one coefficient slightly: 1.02x + 2y = 2.01 → 0.02x = 0.01 → x = 0.5, y = 0.75.

A 1% change in one coefficient changed x by 50% → the system is ill-conditioned.

A well-conditioned system gives only small changes in the solution for small changes in the data.

## 5.6 Python (practicals 7 and 8)

```
def jacobi(A, b, iters=25):
 n = len(b)
 x = [0.0]*n
 for _ in range(iters):
 x_new = [(b[i] - sum(A[i][j]*x[j] for j in range(n) if j != i)) / A[i][i]
 for i in range(n)] # uses only the OLD x
 x = x_new
 return x
def gauss_seidel(A, b, iters=25):
 n = len(b)
 x = [0.0]*n
 for _ in range(iters):
 for i in range(n): # overwrite x[i] immediately
 x[i] = (b[i] - sum(A[i][j]*x[j] for j in range(n) if j != i)) / A[i][i]
 return x
A = [[30,-2,3],[1,17,-2],[1,1,9]]; b = [75,48,15]
print([round(v,2) for v in gauss_seidel(A, b)]) # [2.58, 2.8, 1.07]
```

The only code difference: Jacobi builds a new list from the old one; Seidel overwrites x[i] in place, so the next equation automatically sees the newest value.

### Check yourself

1. State the sufficient condition for convergence. 2. Why is Seidel faster? 3. det = 0.0001 for a system with coefficients around 1 — what do you suspect? Answers: 1) Diagonal dominance. 2) Uses latest values immediately. 3) Ill-conditioned.

# Numerical Integration

(No class notes for this unit were in your folder — written from the syllabus and Grewal/Sastry.)

## 6.1 What is numerical integration?

### 𝑏𝑓( 𝑥) 𝑑𝑥 (the area under a curve) when the integral can’t be found by In one line: estimating ∫𝑎

> formula, or when f is known only as a table.

1 𝑒−𝑥2𝑑𝑥 has no elementary antiderivative.

Also called quadrature. Example: ∫0

### The idea

Split [a, b] into n equal strips of width

ℎ= 𝑏−𝑎

𝑛

with points 𝑥0 = 𝑎, 𝑥1 = 𝑎+ ℎ, …, 𝑥𝑛= 𝑏 and values 𝑦𝑖= 𝑓( 𝑥𝑖) . Approximate the curve over each strip (or pair/triple of strips) by a simple polynomial and add up the areas.

```
 y │ ___
 │ __/ \__ each strip approximated by a
 │ / │ │ │\ straight line (trapezium) or
 │ │ │ │ │ │ parabola (Simpson)
 └─┴───┴──┴──┴─┴── x
 x0 x1 x2 x3 x4
```

## 6.2 Newton–Cotes general formula

All the rules below come from one master formula. Replace f by Newton’s forward interpolation polynomial (Unit 4) and integrate term by term over [ 𝑥0, 𝑥0 + 𝑛ℎ] (with x = x₀ + ph, dx = h dp): 2𝛥𝑦0 + 𝑛( 2𝑛−3 )

𝛥2𝑦0 + 𝑛( 𝑛−2 ) 2

𝑦𝑑𝑥= 𝑛ℎ[𝑦0 + 𝑛

𝛥3𝑦0 + ⋯]

∫

12

24

Putting n = 1 (keep up to Δ), n = 2 (up to Δ²), n = 3 (up to Δ³) and n = 6 gives the trapezoidal rule, Simpson’s 1/3, Simpson’s 3/8 and Weddle’s rule.

## 6.3 Trapezoidal rule

2 (𝑦𝑖+ 𝑦𝑖+ 1 ). Idea: join neighbouring points by straight lines → each strip is a trapezium with area ℎ

2[(𝑦0 + 𝑦𝑛) + 2 ( 𝑦1 + 𝑦2 + ⋯+ 𝑦𝑛−1 ) ]

𝑓( 𝑥) 𝑑𝑥≈ℎ

∫

In words: h/2 × [ (first + last) + 2 × (all the middle ones) ].

Works for any n. Error order h² (exact for straight lines).

## 6.4 Simpson’s 1/3 rule

Idea: take strips in pairs and fit a parabola through each three points.

3[(𝑦0 + 𝑦𝑛) + 4(𝑦1 + 𝑦3 + 𝑦5 + ⋯) + 2 ( 𝑦2 + 𝑦4 + ⋯) ]

𝑓( 𝑥) 𝑑𝑥≈ℎ

∫

In words: h/3 × [ (first + last) + 4 × (odd-numbered) + 2 × (even-numbered middle) ].

n must be even. Error order h⁴ — very accurate (exact for cubics).

## 6.5 Simpson’s 3/8 rule

Idea: take strips in threes and fit a cubic through each four points.

8 [(𝑦0 + 𝑦𝑛) + 3(𝑦1 + 𝑦2 + 𝑦4 + 𝑦5 + ⋯) + 2(𝑦3 + 𝑦6 + ⋯)]

𝑓( 𝑥) 𝑑𝑥≈3ℎ

∫

In words: 3h/8 × [ (first + last) + 2 × (multiples of 3) + 3 × (all the rest) ].

n must be a multiple of 3.

## 6.6 Weddle’s rule

Idea: groups of six strips (degree-6 polynomial, simplified).

𝑓( 𝑥) 𝑑𝑥≈3ℎ

∫

10[𝑦0 + 5𝑦1 + 𝑦2 + 6𝑦3 + 𝑦4 + 5𝑦5 + 𝑦6]

n must be a multiple of 6. Coefficient pattern 1, 5, 1, 6, 1, 5, 1 (then repeats, with the joining y counted twice).

## 6.7 One worked example with all four rules

| ∫0 | 1 + 𝑥2 with h = | 1 (n = 6). Exact | value = tan⁻¹6 | = 1.4056. |  |  |  |
|---|---|---|---|---|---|---|---|
| x | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
| y = 1/(1+x²) | 1.0000 | 0.5000 | 0.2000 | 0.1000 | 0.0588 | 0.0385 | 0.0270 |
| name | y₀ | y₁ | y₂ | y₃ | y₄ | y₅ | y₆ |

Trapezoidal: ½[(1 + 0.0270) + 2(0.5 + 0.2 + 0.1 + 0.0588 + 0.0385)] = ½[1.0270 + 1.7946] = 1.4108

Simpson 1/3 (n = 6 even ✔): ⅓[(1 + 0.0270) + 4(0.5 + 0.1 + 0.0385) + 2(0.2 + 0.0588)] = ⅓[1.0270 + 2.5540 + 0.5176] = ⅓(4.0986) = 1.3662

Simpson 3/8 (n = 6 multiple of 3 ✔): ⅜[(1 + 0.0270) + 3(0.5 + 0.2 + 0.0588 + 0.0385) + 2(0.1)] = ⅜[1.0270 + 2.3919 + 0.2] = ⅜(3.6189) = 1.3571

Weddle (n = 6 ✔): 0.3[1 + 5(0.5) + 0.2 + 6(0.1) + 0.0588 + 5(0.0385) + 0.0270] = 0.3(4.5781) = 1.3734

(With h = 1 the function changes quickly near 0, so all rules are rough here; halving h makes them all much closer to 1.4056. In exams, just apply the rule correctly.)

## 6.8 Gaussian integration (Gauss–Legendre quadrature)

Idea: instead of equally spaced points, choose special points and weights so that very few function evaluations give high accuracy. With n points it is exact for polynomials up to degree 2n − 1.

Standard interval is [−1, 1]:

1 𝑓( 𝑡) 𝑑𝑡≈𝑓( −

√3 ) + 𝑓(

√3 ) (points ±0.57735, weights 1, 1)

Two-point: ∫−1

9𝑓( −√0.6 ) + 8

9𝑓( √0.6 ) (points 0, ±0.77460)

1 𝑓( 𝑡) 𝑑𝑡≈5

Three-point: ∫−1

9𝑓( 0 ) + 5

For any [a, b], change variable: 𝑥= 𝑏−𝑎

, 𝑑𝑥= 𝑏−𝑎

𝑡+ 𝑏+ 𝑎

𝑑𝑡.

2

2

2

𝑑𝑥

Example: ∫0

1 + 𝑥 (exact ln 2 = 0.693147). Here x = (t + 1)/2, dx = dt/2.

Two-point: ½[f(0.21132) + f(0.78868)] = ½[0.82552 + 0.55910] = 0.69231

Three-point: ½[⁵⁄₉ f(0.11270) + ⁸⁄₉ f(0.5) + ⁵⁄₉ f(0.88730)] = 0.69312 — excellent with only 3 evaluations.

## 6.9 Comparison and Python (practicals 9, 10)

| Rule | Fits | n must be | Accuracy |
|---|---|---|---|
| Trapezoidal | straight line | any | lowest (order h²) |
| Simpson 1/3 | parabola | even | high (order h⁴) |
| Simpson 3/8 | cubic | multiple of 3 | high (order h⁴) |
| Weddle | degree 6 | multiple of 6 | very high |
| Gauss | special points | 2 or 3 points | highest per evaluation |

```
def simpson_13(f, a, b, n):
 if n % 2: raise ValueError("n must be even")
 h = (b - a) / n
 s = f(a) + f(b)
 for i in range(1, n):
 s += (4 if i % 2 else 2) * f(a + i*h) # odd → 4, even → 2
 return h / 3 * s
def simpson_38(f, a, b, n):
 if n % 3: raise ValueError("n must be a multiple of 3")
 h = (b - a) / n
 s = f(a) + f(b)
 for i in range(1, n):
 s += (2 if i % 3 == 0 else 3) * f(a + i*h)
 return 3 * h / 8 * s
f = lambda x: 1 / (1 + x*x)
print(simpson_13(f, 0, 6, 6), simpson_38(f, 0, 6, 6)) # 1.3662 1.3571
```

### Check yourself

1. For Simpson’s 1/3 with n = 5, what’s wrong? 2. Write the trapezoidal rule in words. 3. Gauss 2-point points? Answers: 1) n must be even. 2) h/2 [first + last + 2(middle)]. 3) ±1/√3.

# Numerical Solution of Ordinary Differential Equations

(No class notes for this unit were in your folder — written from the syllabus and Grewal/Sastry.)

## 7.1 What is the problem?

An ordinary differential equation (ODE) relates a function y(x) to its derivative. A first-order initial value problem (IVP) is

𝑦( 𝑥0 ) = 𝑦0

𝑑𝑦

𝑑𝑥= 𝑓( 𝑥, 𝑦) ,

Plain words: you know where you start (x₀, y₀) and a rule telling you the slope at any point. Find y at later x values.

Analogy: You’re driving. You know where you are now and your speedometer reading at every moment. Where will you be after 10 minutes? Step forward a little using the current speed, check the new speed, step again…

Numerical methods produce y at points 𝑥1 = 𝑥0 + ℎ, 𝑥2 = 𝑥0 + 2ℎ, … (h = step size).

Running example for every method:

𝑑𝑦

𝑑𝑥= 𝑥+ 𝑦,

𝑦( 0 ) = 1,

find 𝑦( 0.1 ) , 𝑦( 0.2 ) with ℎ= 0.1

Exact solution (to check our answers): 𝑦= 2𝑒𝑥−𝑥−1 → y(0.1) = 1.110342, y(0.2) = 1.242806.

Methods divide into: single-step methods using the previous point only (Taylor, Picard, Euler, Runge- Kutta) — all in your syllabus.

## 7.2 Taylor’s series method

Idea: use the Taylor series about x₀:

𝑦( 𝑥) = 𝑦0 + ( 𝑥−𝑥0 ) 𝑦′0 + ( 𝑥−𝑥0 )

𝑦″0 + ( 𝑥−𝑥0 )

𝑦‴0 + ⋯

2!

3!

Find the derivatives at x₀ by repeatedly differentiating the ODE.

Example: y′ = x + y.

y′ = x + y → at (0, 1): y′₀ = 0 + 1 = 1

y″ = 1 + y′ → y″₀ = 1 + 1 = 2

y‴ = y″ → y‴₀ = 2

y⁗ = y‴ → y⁗₀ = 2

𝑦( 𝑥) = 1 + 𝑥+ 2𝑥2

2 + 2𝑥3

6 + 2𝑥4

24 = 1 + 𝑥+ 𝑥2 + 𝑥3

3 + 𝑥4

12

y(0.1) = 1 + 0.1 + 0.01 + 0.000333 + 0.0000083 = 1.110342 ✔; y(0.2) = 1.242800.

✔ Very accurate. ✘ Needs higher derivatives — messy for complicated f.

## 7.3 Picard’s method (successive approximation)

Idea: rewrite the ODE as an integral equation and iterate:

𝑦𝑛+ 1 ( 𝑥) = 𝑦0 + ∫

𝑓(𝑡, 𝑦𝑛( 𝑡) ) 𝑑𝑡

Each iteration gives a better formula for y.

Example: y′ = x + y, y(0) = 1.

Start y₀(x) = 1.

𝑥( 𝑡+ 1 ) 𝑑𝑡= 1 + 𝑥+ 𝑥2

𝑦1 = 1 + ∫0

2

𝑥(𝑡+ 1 + 𝑡+ 𝑡2

2 )𝑑𝑡= 1 + 𝑥+ 𝑥2 + 𝑥3

𝑦2 = 1 + ∫0

6

𝑥(𝑡+ 1 + 𝑡+ 𝑡2 + 𝑡3

6 )𝑑𝑡= 1 + 𝑥+ 𝑥2 + 𝑥3

3 + 𝑥4

𝑦3 = 1 + ∫0

24

y₃(0.1) = 1.110338, y₃(0.2) = 1.242733 — close to exact. ✘ Only practical when the integrals are easy.

## 7.4 Euler’s method

Idea: walk along the tangent line for one step: new y = old y + h × slope.

𝑦𝑛+ 1 = 𝑦𝑛+ ℎ𝑓( 𝑥𝑛, 𝑦𝑛)

```
 y │ ● true curve
 │ ╱ ·
 │ ╱ · ← Euler follows the tangent (straight) and drifts away
 │ ●·
 └──────────── x
 xn xn+1
```

Example:

y₁ = 1 + 0.1(0 + 1) = 1.1 (exact 1.1103)

y₂ = 1.1 + 0.1(0.1 + 1.1) = 1.22 (exact 1.2428)

✔ Simplest. ✘ Least accurate (error order h); errors grow — needs very small h.

### Modified Euler’s method (Euler–Cauchy / Heun) — improvement

Predict with Euler, then correct using the average of slopes at both ends:

( 𝑝) ) ]

( 𝑝) = 𝑦𝑛+ ℎ𝑓( 𝑥𝑛, 𝑦𝑛) ,

2 [𝑓( 𝑥𝑛, 𝑦𝑛) + 𝑓(𝑥𝑛+ 1, 𝑦𝑛+ 1

𝑦𝑛+ 1 = 𝑦𝑛+ ℎ

𝑦𝑛+ 1

Step 1: predictor 1.1; corrector 1 + 0.05[(0 + 1) + (0.1 + 1.1)] = 1.11 (repeat the corrector once more → 1.1105).

Step 2: predictor 1.231; corrector 1.2421.

## 7.5 Runge-Kutta methods

Idea: get the accuracy of Taylor’s method without computing derivatives, by sampling the slope at several points inside the step and taking a weighted average.

### Second-order RK (same as modified Euler)

𝑘1 = ℎ𝑓( 𝑥𝑛, 𝑦𝑛) ,

𝑘2 = ℎ𝑓( 𝑥𝑛+ ℎ, 𝑦𝑛+ 𝑘1 ) ,

𝑦𝑛+ 1 = 𝑦𝑛+ 1

2 ( 𝑘1 + 𝑘2 )

Example: k₁ = 0.1, k₂ = 0.1(0.1 + 1.1) = 0.12 → y₁ = 1 + 0.11 = 1.11.

### Fourth-order RK (RK4) — the most important, learn it by heart

𝑘1 = ℎ𝑓( 𝑥𝑛, 𝑦𝑛)

𝑘2 = ℎ𝑓( 𝑥𝑛+ ℎ

2 )

2, 𝑦𝑛+ 𝑘1

𝑘3 = ℎ𝑓( 𝑥𝑛+ ℎ

2 )

2, 𝑦𝑛+ 𝑘2

𝑘4 = ℎ𝑓( 𝑥𝑛+ ℎ, 𝑦𝑛+ 𝑘3 )

6 ( 𝑘1 + 2𝑘2 + 2𝑘3 + 𝑘4 )

𝑦𝑛+ 1 = 𝑦𝑛+ 1

Meaning: k₁ = slope at the start; k₂ and k₃ = slopes at the middle (estimated two ways); k₄ = slope at the end. The middle slopes get double weight (like Simpson’s rule).

Example, step 1 (x₀ = 0, y₀ = 1, h = 0.1, f = x + y):

k₁ = 0.1 × (0 + 1) = 0.1

k₂ = 0.1 × (0.05 + 1.05) = 0.11

k₃ = 0.1 × (0.05 + 1.055) = 0.1105

k₄ = 0.1 × (0.1 + 1.1105) = 0.12105

y₁ = 1 + (0.1 + 0.22 + 0.221 + 0.12105)/6 = 1 + 0.66205/6 = 1.110342 ✔ (exact 1.110342!)

Step 2 (x₁ = 0.1, y₁ = 1.110342): k₁ = 0.121034, k₂ = 0.132086, k₃ = 0.132638, k₄ = 0.144298 → y₂ = 1.242805 (exact 1.242806).

### Comparison at x = 0.2

| Method | y(0.2) | Error |
|---|---|---|
| Euler | 1.220000 | 0.0228 |
| Modified Euler | 1.242050 | 0.0008 |
| Picard (3rd approx.) | 1.242733 | 0.00007 |
| Taylor (to x⁴) | 1.242800 | 0.000006 |
| RK4 | 1.242805 | 0.0000004 |
| Exact | 1.242806 | — |

## 7.6 Python (practicals 11, 12)

```
def euler(f, x0, y0, h, n):
 x, y = x0, y0
 for _ in range(n):
 y = y + h * f(x, y)
 x = x + h
 return y
def rk4(f, x0, y0, h, n):
 x, y = x0, y0
 for _ in range(n):
 k1 = h * f(x, y)
 k2 = h * f(x + h/2, y + k1/2)
 k3 = h * f(x + h/2, y + k2/2)
 k4 = h * f(x + h, y + k3)
 y = y + (k1 + 2*k2 + 2*k3 + k4) / 6
 x = x + h
 return y
f = lambda x, y: x + y
print(euler(f, 0, 1, 0.1, 2), rk4(f, 0, 1, 0.1, 2)) # 1.22 1.242805
```

## Unit 7 — What to write in the exam

Write the general IVP form.

For each method: formula, then a neat table of x, y, (k₁ … k₄) for each step.

Mention: Euler is simplest but least accurate; modified Euler improves it; RK4 is most accurate and needs no derivatives; Taylor needs derivatives; Picard needs integrations.

### Check yourself

1. Write RK4. 2. y′ = 2y, y(0) = 1, h = 0.1 — one Euler step? 3. Why is RK4 preferred to Taylor? Answers: 1) see 7.5. 2) y₁ = 1 + 0.1(2) = 1.2. 3) Same accuracy without computing higher derivatives.

# Last-Night Formula Sheet (CONMP)

Errors: 𝐸𝑎= |𝑋−𝑋1|, 𝐸𝑟= 𝐸𝑎/|𝑋|, 𝐸𝑝= 100𝐸𝑟. Correct to n s.d. ⇒ 𝐸𝑟≤1

210−𝑛.

Roots: Bisection 𝑥= ( 𝑎+ 𝑏) /2 (linear). Regula-falsi 𝑥= 𝑎𝑓( 𝑏) −𝑏𝑓( 𝑎)

𝑓( 𝑏) −𝑓( 𝑎) (linear). Secant

𝑥𝑛+ 1 = 𝑥𝑛−𝑓𝑛

𝑓𝑛−𝑓𝑛−1 (1.618). Iteration 𝑥= 𝜑( 𝑥) , need |φ′| < 1 (linear). NR 𝑥𝑛+ 1 = 𝑥𝑛−𝑓/𝑓′ (quadratic). 2 ( 𝑥+ 𝑁/𝑥) ; 1/N: 𝑥( 2 −𝑁𝑥) . Descartes: sign changes in P(x), P(−x). Budan: V(a) − V(b). Bairstow: √N: 1

b’s, c’s, Δp, Δq.

Curve fitting: Σy = na + bΣx; Σxy = aΣx + bΣx².

Interpolation: Δ = E − 1, ∇ = 1 − E⁻¹, δ = E^{½} − E^{−½}, μ = ½(E^{½} + E^{−½}), E = e^{hD}. Forward: 𝑦0 + 𝑝𝛥𝑦0 + 𝑝( 𝑝−1 )

𝛥2𝑦0 + …, p = (x − x₀)/h. Backward: 𝑦𝑛+ 𝑝𝛻𝑦𝑛+ 𝑝( 𝑝+ 1 )

𝛻2𝑦𝑛+ …, p = (x − xₙ)/h.

+ 𝑝2

2 𝛥2𝑦−1 + …. Lagrange: Σ Lᵢyᵢ. Divided difference: y₀ + (x−x₀)[x₀,x₁] + …. Spline: Stirling: 𝑦0 + 𝑝

ℎ2 (𝑦𝑖−1 −2𝑦𝑖+ 𝑦𝑖+ 1 ).

𝑀𝑖−1 + 4𝑀𝑖+ 𝑀𝑖+ 1 = 6

Linear systems: diagonal dominance; Jacobi uses old values; Seidel uses newest.

2 [ (𝑦0 + 𝑦𝑛) + 2𝛴𝑚𝑖𝑑]; Simpson ⅓ ℎ

3 [ (𝑦0 + 𝑦𝑛) + 4𝛴𝑜𝑑𝑑+ 2𝛴𝑒𝑣𝑒𝑛] (n Integration (h = (b−a)/n): Trap ℎ

8 [ (𝑦0 + 𝑦𝑛) + 3𝛴𝑟𝑒𝑠𝑡+ 2𝛴𝑚𝑢𝑙𝑡3 ]; Weddle 3ℎ

even); ⅜ 3ℎ

10 [ 1, 5, 1, 6, 1, 5, 1 ] ; Gauss 2-pt ±1/√3.

6 ( 𝑘1 + 2𝑘2 + 2𝑘3 + 𝑘4 ) .

ODE: Euler 𝑦+ ℎ𝑓; modified Euler average of end slopes; RK4 𝑦+ 1
