> Everything here is taken from the CONMP Complete Study Guide: for each unit, what examiners ask, what to write, the common mistakes and quick self-checks, followed by the last-night revision sheet.

# Errors and Computation

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

### Unit 2 — Check yourself

1. Why must f(a)·f(b) < 0 in bisection?

2. Which method needs a derivative? Which needs two starting points but no bracket?

3. For x = φ(x), what condition guarantees convergence?

4. Write the NR formula for √N.

5. Descartes: how many positive roots can x³ − x² + x − 1 have?

Answers: 1) It guarantees (by IVT) a root inside. 2) Newton-Raphson; Secant. 3) |φ′(x)| < 1 near the root. 4) 2 ( 𝑥𝑛+ 𝑁/𝑥𝑛) . 5) Signs + − + − → 3 changes → 3 or 1.

𝑥𝑛+ 1 = 1

# Curve Fitting (Method of Least Squares)

## Unit 3 — What to write in the exam

State the principle of least squares (minimise Σ residual²) and why squares are used.

Derive the normal equations for a straight line (and write them for a parabola).

Numerical: make the table of sums neatly, write normal equations, solve, state the final equation. Non-linear curves: show the log transformation table.

### Check yourself

1. What is a residual? 2. Write the normal equations for y = a + bx. 3. How do you fit y = ax^b? Answers: 1) observed y minus fitted Y. 2) Σy = na + bΣx; Σxy = aΣx + bΣx². 3) Take log: log y = log a + b log x, fit a straight line between log x and log y.

# Interpolation Techniques (24 marks — the biggest unit)

## Unit 4 — What to write in the exam

Definitions: interpolation, extrapolation; list techniques for equal (forward, backward, Stirling) and unequal (Lagrange, divided difference) intervals.

Define all operators; prove relations (Δ = E − 1, ∇ = 1 − E⁻¹, E = e^{hD}, Δ − ∇ = Δ∇ = δ²).

Numericals: always draw the full difference table, state which formula and why, compute p, then a term-by-term table.

### Check yourself

1. Table with x = 1, 2, 3, 4, 5, find y(4.6) — which formula? 2. Data at x = 2, 5, 6, 10 — which formula?

3. Prove E = 1 + Δ. 4. In Lagrange, what should the sum of the L’s be? Answers: 1) Newton’s backward. 2) Lagrange or divided difference. 3) Δf(x) = f(x+h) − f(x) = Ef(x) − f(x) ⇒ E = 1 + Δ. 4) Exactly 1.

# Solution of Systems of Linear Equations: Iterative Methods

### Check yourself

1. State the sufficient condition for convergence. 2. Why is Seidel faster? 3. det = 0.0001 for a system with coefficients around 1 — what do you suspect? Answers: 1) Diagonal dominance. 2) Uses latest values immediately. 3) Ill-conditioned.

# Numerical Integration

### Check yourself

1. For Simpson’s 1/3 with n = 5, what’s wrong? 2. Write the trapezoidal rule in words. 3. Gauss 2-point points? Answers: 1) n must be even. 2) h/2 [first + last + 2(middle)]. 3) ±1/√3.

# Numerical Solution of Ordinary Differential Equations

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
