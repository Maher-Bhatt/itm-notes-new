> **Computer Oriented Numerical Methods: formula sheet**
> Typed from a student's handwritten revision notes (12 pages) so it can be searched and read on a phone. Where the handwritten version had a slip or left something out, the corrected form is given and marked *Note*. Each section links to a solved exam question that uses the formula.

# 1. Errors

Actual (true) value **x**, approximate value **x′**.

| Error | Formula |
|---|---|
| Absolute error | Eₐ = \|x − x′\| |
| Relative error | Eᵣ = \|x − x′\| / \|x\| |
| Percentage error | Eₚ = Eᵣ × 100 % |

*Note:* the absolute error is usually written with modulus bars; the sign of x − x′ only says whether x′ is an under- or over-estimate.

# 2. Roots of algebraic and transcendental equations

## 2.1 Descartes' rule of signs

For a polynomial f(x) = 0 of degree **n**:
- **p** = number of sign changes in f(x) → the number of **positive** real roots is p or p − 2, p − 4, …
- **q** = number of sign changes in f(−x) → the number of **negative** real roots is q or q − 2, …
- Number of **complex** roots is at least **n − (p + q)** (complex roots come in conjugate pairs).

## 2.2 Budan's theorem

Let V(c) = number of sign changes in the sequence f(c), f′(c), f″(c), …, f⁽ⁿ⁾(c). The number of real roots of f(x) = 0 in (a, b), counted with multiplicity, is

**V(a) − V(b) − 2m**, m = 0, 1, 2, …

| V(a) − V(b) | Real roots in (a, b) |
|---|---|
| 0 | none |
| 1 | exactly one |
| 2 | two or none |
| 3 | three or one |

(Even values give an even count, odd values an odd count.) Worked example: [CONMP CET-1 2026, Q2(d)](/library/conmp/paper-cet-1-2026-08-31#q2d-budan-s-theorem-real-roots-of-x-3x-4x-13-0-in-the-given-intervals).

## 2.3 Bracketing methods

Start with [a, b] where f(a) and f(b) have **opposite signs**.

| Method | Next approximation |
|---|---|
| **Bisection** | xₙ₊₁ = (a + b) / 2 |
| **Regula falsi** (false position) | xₙ₊₁ = [a f(b) − b f(a)] / [f(b) − f(a)] |

**Which end to replace:** keep the sub-interval where the sign changes. If f(xₙ₊₁) has the **same sign as f(a)**, replace a by xₙ₊₁; otherwise replace b. (The handwritten shortcut "answer > 0 → replace the right end, answer < 0 → replace the left end" works when f(a) < 0 < f(b).)

## 2.4 Open-ended methods

| Method | Formula | Order of convergence |
|---|---|---|
| **Newton-Raphson** | xₙ₊₁ = xₙ − f(xₙ) / f′(xₙ), n = 0, 1, 2, … | 2 (quadratic) |
| **Secant** (method of chords) | xₙ₊₁ = xₙ − [(xₙ − xₙ₋₁) / (f(xₙ) − f(xₙ₋₁))] · f(xₙ), n ≥ 1 | ≈ 1.618 |
| **Fixed-point iteration** (successive approximations) | write f(x) = 0 as x = φ(x); xₙ₊₁ = φ(xₙ) | 1 (linear) |

Fixed-point iteration converges if **|φ′(x)| < 1** for all x in the interval I containing the root, with x₀ ∈ I.

Worked secant example: [CONMP CET-1 2025, Q3(a)](/library/conmp/paper-cet-1-2025-08-22#q3a-find-the-fourth-root-of-32-correct-to-four-significant-digits-by-the-secant-).

## 2.5 Newton-Raphson deductions (iterative formulas)

| To find | Iteration |
|---|---|
| 1/N (reciprocal, no division) | xₙ₊₁ = xₙ (2 − N xₙ) |
| √N | xₙ₊₁ = ½ (xₙ + N / xₙ) |
| 1/√N | xₙ₊₁ = ½ (xₙ + 1 / (N xₙ)) |
| ᵏ√N | xₙ₊₁ = (1/k) [(k − 1) xₙ + N / xₙᵏ⁻¹] |

*Note:* the 1/√N formula in the notes is the √ formula applied to 1/N and converges correctly. The form obtained directly from Newton's method on f(x) = 1/x² − N is xₙ₊₁ = ½ xₙ (3 − N xₙ²), which avoids division; both are accepted.

## 2.6 Lin-Bairstow method

Finds a **quadratic factor x² + px + q** of a polynomial a₀xⁿ + a₁xⁿ⁻¹ + … + aₙ, starting from guesses p₀, q₀.
1. Synthetic division: bₖ = aₖ − p bₖ₋₁ − q bₖ₋₂ (b₋₁ = b₋₂ = 0).
2. Second division: cₖ = bₖ − p cₖ₋₁ − q cₖ₋₂.
3. Solve for the corrections: cₙ₋₂ Δp + cₙ₋₃ Δq = bₙ₋₁ and (cₙ₋₁ − bₙ₋₁) Δp + cₙ₋₂ Δq = bₙ.
4. p ← p + Δp, q ← q + Δq; repeat until Δp, Δq are small.

*Note:* the handwritten page only states the goal; the steps above are the version used in the solved papers. Worked example: [CONMP CET-2 2025, Q3(a)](/library/conmp/paper-cet-2-2025-10-08#q3a-two-iterations-of-lin-bairstow-quadratic-factor-x-px-q-of-x-8x-39x-62x-50-p-).

# 3. Systems of linear equations

For a₁x + b₁y + c₁z = d₁, a₂x + b₂y + c₂z = d₂, a₃x + b₃y + c₃z = d₃ (rearranged so the system is **diagonally dominant**: |a₁| ≥ |b₁| + |c₁| and so on, which guarantees convergence).

**Gauss-Jacobi** (every new value uses only the previous iteration):
- xₖ₊₁ = (1/a₁) [d₁ − b₁yₖ − c₁zₖ]
- yₖ₊₁ = (1/b₂) [d₂ − a₂xₖ − c₂zₖ]
- zₖ₊₁ = (1/c₃) [d₃ − a₃xₖ − b₃yₖ]

**Gauss-Seidel** (uses each new value as soon as it is found):
- x₁ = (1/a₁) [d₁ − b₁y₀ − c₁z₀]
- y₁ = (1/b₂) [d₂ − a₂x₁ − c₂z₀]
- z₁ = (1/c₃) [d₃ − a₃x₁ − b₃y₁]

Gauss-Seidel typically converges about **twice as fast** as Gauss-Jacobi. Worked example: [CONMP CET-1 2026, Q3(e)](/library/conmp/paper-cet-1-2026-08-31#q3e-gauss-seidel-30x-2y-3z-75-x-17y-2z-48-x-y-9z-15-two-decimals).

# 4. Interpolation

## 4.1 Equally spaced arguments

Spacing h, p = (x − x₀) / h.

**Newton's forward difference formula** (use when x is near the **beginning** of the table):

y = y₀ + p Δy₀ + p(p − 1)/2! Δ²y₀ + p(p − 1)(p − 2)/3! Δ³y₀ + …

**Newton's backward difference formula** (x near the **end**; here p = (x − xₙ) / h and differences are taken at yₙ):

y = yₙ + p ∇yₙ + p(p + 1)/2! ∇²yₙ + p(p + 1)(p + 2)/3! ∇³yₙ + …

*Note:* the notes write y₀ in the backward formula; it is the **last** tabulated value yₙ.

## 4.2 Stirling's central difference formula

Use when x is near the **middle** of the table; choose x₀ as the tabulated value just below x, so −½ < p < ½ is ideal.

y = y₀ + p (Δy₀ + Δy₋₁)/2 + p²/2! Δ²y₋₁ + p(p² − 1²)/3! · (Δ³y₋₁ + Δ³y₋₂)/2 + p²(p² − 1²)/4! Δ⁴y₋₂ + p(p² − 1²)(p² − 2²)/5! · (Δ⁵y₋₂ + Δ⁵y₋₃)/2 + …

The differences used lie on the horizontal line through y₀ in the difference table: odd orders are averaged across the line (Δy₋₁ and Δy₀), even orders sit on it (Δ²y₋₁, Δ⁴y₋₂). Worked example: [CONMP CET-2 2026, Q3(a)](/library/conmp/paper-cet-2-2026-10-05#q3a-using-stirling-s-formula-find-y-given-y-512-y-439-y-346-y-243).

## 4.3 Unequally spaced arguments

**Lagrange's interpolation formula** (four points shown):

y = y₀ (x − x₁)(x − x₂)(x − x₃) / [(x₀ − x₁)(x₀ − x₂)(x₀ − x₃)]
 + y₁ (x − x₀)(x − x₂)(x − x₃) / [(x₁ − x₀)(x₁ − x₂)(x₁ − x₃)]
 + y₂ (x − x₀)(x − x₁)(x − x₃) / [(x₂ − x₀)(x₂ − x₁)(x₂ − x₃)]
 + y₃ (x − x₀)(x − x₁)(x − x₂) / [(x₃ − x₀)(x₃ − x₁)(x₃ − x₂)]

**Newton's divided difference formula:**

y = y₀ + (x − x₀)[x₀, x₁] + (x − x₀)(x − x₁)[x₀, x₁, x₂] + (x − x₀)(x − x₁)(x − x₂)[x₀, x₁, x₂, x₃] + …

where [x₀, x₁] = (y₁ − y₀)/(x₁ − x₀), [x₀, x₁, x₂] = ([x₁, x₂] − [x₀, x₁])/(x₂ − x₀), and so on.

*Note:* the notes write Δy₀, Δ²y₀ here; for unequal spacing they must be the **divided differences** above. Worked examples: [Lagrange, end-sem 2025 Q2.1](/library/conmp/paper-end-sem-2025-12-30#q2-1-given-log-654-2-8156-log-658-2-8182-log-659-2-8189-log-661-2-8202-find-log-) · [divided differences, end-sem 2025 Q2.2](/library/conmp/paper-end-sem-2025-12-30#q2-2-thermocouple-output-at-37-c-using-newton-s-divided-difference-formula).

# 5. Numerical integration

I = ∫ₐᵇ y dx with h = (b − a)/n and ordinates y₀, y₁, …, yₙ.

| Rule | Condition on n | Formula |
|---|---|---|
| **Trapezoidal** | any n | (h/2) [(y₀ + yₙ) + 2(y₁ + y₂ + … + yₙ₋₁)] |
| **Simpson's 1/3** (parabolic rule) | n even (n = 2m) | (h/3) [(y₀ + yₙ) + 4(y₁ + y₃ + … + yₙ₋₁) + 2(y₂ + y₄ + … + yₙ₋₂)] |
| **Simpson's 3/8** | n a multiple of 3 (n = 3m) | (3h/8) [(y₀ + yₙ) + 3(y₁ + y₂ + y₄ + y₅ + …) + 2(y₃ + y₆ + …)] |

In Simpson's 3/8 rule the ordinates whose index is a multiple of 3 get weight 2, all other interior ordinates get weight 3. Worked example: [CONMP CET-2 2025, Q2(b)](/library/conmp/paper-cet-2-2025-10-08#q2b-evaluate-ln-x-dx-by-simpson-s-appropriate-rule-with-h-0-2).

# 6. Numerical solution of ordinary differential equations

Initial value problem dy/dx = f(x, y), y(x₀) = y₀, step size h, xₙ₊₁ = xₙ + h.

**Euler's method:** yₙ₊₁ = yₙ + h f(xₙ, yₙ), n = 0, 1, 2, …

**Modified Euler / improved Euler / Heun's / predictor-corrector method:**
- Predictor: yᵖₙ₊₁ = yₙ + h f(xₙ, yₙ)
- Corrector: yₙ₊₁ = yₙ + (h/2) [f(xₙ, yₙ) + f(xₙ₊₁, yᵖₙ₊₁)] (repeat the corrector until two values agree, if asked)

**Runge-Kutta method of order 2:**
1. Identify f(x, y), x₀, y₀ and h.
2. k₁ = h f(x₀, y₀)
3. k₂ = h f(x₀ + h, y₀ + k₁)
4. k = ½ (k₁ + k₂)
5. y₁ = y₀ + k, x₁ = x₀ + h

**Runge-Kutta method of order 4:**
1. Identify f(x, y), x₀, y₀ and h.
2. k₁ = h f(x₀, y₀)
3. k₂ = h f(x₀ + h/2, y₀ + k₁/2)
4. k₃ = h f(x₀ + h/2, y₀ + k₂/2)
5. k₄ = h f(x₀ + h, y₀ + k₃)
6. k = (1/6) [k₁ + 2k₂ + 2k₃ + k₄]
7. y₁ = y₀ + k, x₁ = x₀ + h

# 7. Curve fitting (least squares)

**Straight line y = ax + b** (n data points):
- Σy = a Σx + n b
- Σxy = a Σx² + b Σx

**Second-degree parabola y = ax² + bx + c:**
- Σy = a Σx² + b Σx + n c
- Σxy = a Σx³ + b Σx² + c Σx
- Σx²y = a Σx⁴ + b Σx³ + c Σx²

Build a table of x, y, x², x³, x⁴, xy, x²y, add the columns and solve the normal equations. Worked examples: [straight line, end-sem 2025 Q4.4](/library/conmp/paper-end-sem-2025-12-30#q4-4-fit-a-straight-line-by-least-squares-x-1-5-y-14-27-40-55-68) · [parabola, end-sem 2025 Q5.6](/library/conmp/paper-end-sem-2025-12-30#q5-6-fit-a-second-degree-parabola-to-x-0-4-y-1-1-8-1-3-2-5-6-3).
