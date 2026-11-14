> **Computer Oriented Numerical Methods with Python (S2320C1) · End-semester examination, Winter 2025 · Tuesday 30 December 2025 · 100 marks · 10:10 am – 1:10 pm**
> ITM SLS Baroda University · B.Tech Semester III (Regular). Question 1 is compulsory.
> Questions transcribed from the original paper. Solutions are written by CampusLoop and every number was checked by computer; check the method against your class notes.

# Q1. Multiple choice questions [20]

**1. In Simpson's 1/3 rule, the number of intervals is:** (a) Even · (b) Odd · (c) Multiple of 3 · (d) any number
**Answer: (a) Even.**

**2. The number of significant digits in the number 1234500 is:** (a) 4 · (b) 5 · (c) 6 · (d) 7
**Answer: (b) 5.** Trailing zeros of a whole number without a decimal point are not counted as significant.

**3. Using Euler's method find y(0.1) if dy/dx = (y − 2x)/y, y(0) = 1:** (a) 1 · (b) 1.1 · (c) 0.1 · (d) 0.2
**Answer: (b) 1.1.** y₁ = y₀ + h f(0, 1) = 1 + 0.1 × (1 − 0)/1 = 1.1.

**4. The second degree polynomial through (0, 2), (2, 1) and (1, 0) using Lagrange's formula is:** (a) ½(3x² − 7x + 4) · (b) ½(32x² + 7x + 4) · (c) ½(3x² + 7x − 4) · (d) ½(3x² − 7x − 4)
**Answer: (a).** Check: x = 0 → 2; x = 2 → ½(12 − 14 + 4) = 1; x = 1 → ½(3 − 7 + 4) = 0 ✓.

**5. Newton's forward interpolation formula is used to interpolate values:** (a) nearer to the middle · (b) nearer to the end · (c) nearer to the beginning · (d) any value
**Answer: (c) nearer to the beginning** (backward formula: near the end; Stirling/Bessel: middle).

**6. In Simpson's 3/8 rule, the number of intervals is:** (a) Even · (b) Odd · (c) Multiple of 3 · (d) any number
**Answer: (c) Multiple of 3.**

**7. Newton's method is also known as:** (a) Method of False Position · (b) Method of Chords · (c) Method of Tangents · (d) Method of Slopes
**Answer: (c) Method of tangents.**

**8. Which interpolation method can be used for both equal and unequal intervals?** (a) Lagrange's · (b) Divided difference · (c) Cubic spline · (d) Newton's
**Answer: (a) Lagrange's method** (Newton's divided difference formula also works for both; Newton's forward/backward formulas need equal intervals).

**9. Which relation between the operators is correct?** (a) Δ = E − 1 · (b) Δ = E + 1 · (c) ∇ = E − 1 · (d) ∇ = E + 1
**Answer: (a) Δ = E − 1.** (∇ = 1 − E⁻¹.)

**10. The method used to find the best-fitting curve by minimizing the sum of the squares of the residuals is called:** (a) group average · (b) moments · (c) least squares · (d) none
**Answer: (c) The method of least squares.**

**11. The convergence of which method is prone to the starting value?** (a) Regula-Falsi · (b) Newton-Raphson · (c) Bisection · (d) all
**Answer: (b) Newton-Raphson.**

**12. If a number is correct to n significant digits, then the relative error is:** **Answer: (d) < ½ × 10⁻ⁿ⁺¹.**

**13. In the successive approximation method, for rapid convergence φ′(x) should be:** **Answer: (b) smaller than 1** (|φ′(x)| < 1).

**14. Lin-Bairstow's method is used to find:** **Answer: (d) complex roots** (quadratic factors).

**15. The Gauss-Jacobi method is applicable if the system matrix is:** (a) Sparse · (b) Diagonally dominant · (c) Singular · (d) All mentioned
**Answer: (b) Diagonally dominant.**

**16. One real root of x³ − x − 1 = 0 lies in the interval:** (a) 0 and 1 · (b) 1 and 2 · (c) 2 and 3 · (d) none
**Answer: (b) 1 and 2.** f(1) = −1 < 0, f(2) = 5 > 0.

**17. If f(x) has a root between x₁ and x₂, then f(x₁) and f(x₂) have signs which are:** **Answer: (d) opposite.**

**18. Which rule is also known as the parabolic rule?** **Answer: (b) Simpson's 1/3 rule.**

**19. Given dy/dx = log(x + y), y(0) = 2, to find y(0.8) with h = 0.2, how many times is Euler's formula applied?** (a) two · (b) three · (c) four · (d) five
**Answer: (c) four** (0 → 0.2 → 0.4 → 0.6 → 0.8).

**20. The Gauss-Seidel method converges faster than Gauss-Jacobi because:** **Answer: (c) it uses the latest available values.**

# Q2. Attempt any four out of six [20]

## Q2.1 Given log₁₀ 654 = 2.8156, log₁₀ 658 = 2.8182, log₁₀ 659 = 2.8189, log₁₀ 661 = 2.8202, find log₁₀ 656 by Lagrange's formula.

x₀, x₁, x₂, x₃ = 654, 658, 659, 661 and x = 656. The Lagrange coefficients:
- L₀ = (656−658)(656−659)(656−661) / [(654−658)(654−659)(654−661)] = (−2)(−3)(−5)/[(−4)(−5)(−7)] = −30/−140 = **0.214286**
- L₁ = (2)(−3)(−5)/[(4)(−1)(−3)] = 30/12 = **2.5**
- L₂ = (2)(−2)(−5)/[(5)(1)(−2)] = 20/−10 = **−2**
- L₃ = (2)(−2)(−3)/[(7)(3)(2)] = 12/42 = **0.285714**

log₁₀ 656 = 0.214286(2.8156) + 2.5(2.8182) − 2(2.8189) + 0.285714(2.8202)
= 0.603343 + 7.045500 − 5.637800 + 0.805771 = **2.8168** (true value 2.81690).

## Q2.2 Thermocouple: output at 37 °C using Newton's divided difference formula.

| x | y | 1st divided difference | 2nd | 3rd |
|---|---|---|---|---|
| 0 | 0.0 | | | |
| | | (0.4 − 0)/10 = 0.04 | | |
| 10 | 0.4 | | 0 | |
| | | 0.04 | | 0 |
| 20 | 0.8 | | 0 | |
| | | 0.04 | | 0 |
| 30 | 1.2 | | 0 | |
| | | 0.04 | | … |
| 40 | 1.6 | | 0 | |
| | | 0.04 | | |
| 50 | 2.0 | | | |

All first divided differences are 0.04 and higher ones are 0, so
f(x) = y₀ + (x − x₀)[x₀, x₁] = 0 + (37 − 0)(0.04) = **1.48 mV**.

## Q2.3 Pressure P at t = 142 °C and t = 175 °C using the appropriate Newton formula.

Difference table (h = 10):

| t | P | Δ | Δ² | Δ³ | Δ⁴ |
|---|---|---|---|---|---|
| 140 | 3.685 | 1.169 | 0.279 | 0.047 | 0.002 |
| 150 | 4.854 | 1.448 | 0.326 | 0.049 | |
| 160 | 6.302 | 1.774 | 0.375 | | |
| 170 | 8.076 | 2.149 | | | |
| 180 | 10.225 | | | | |

**t = 142 (near the start) → Newton forward**, p = (142 − 140)/10 = 0.2:
P = 3.685 + 0.2(1.169) + [0.2(−0.8)/2](0.279) + [0.2(−0.8)(−1.8)/6](0.047) + [0.2(−0.8)(−1.8)(−2.8)/24](0.002)
= 3.685 + 0.2338 − 0.02232 + 0.002256 − 0.000067 = **3.899 kgf/cm²**.

**t = 175 (near the end) → Newton backward**, p = (175 − 180)/10 = −0.5, using ∇ values at 180 (2.149, 0.375, 0.049, 0.002):
P = 10.225 + (−0.5)(2.149) + [(−0.5)(0.5)/2](0.375) + [(−0.5)(0.5)(1.5)/6](0.049) + [(−0.5)(0.5)(1.5)(2.5)/24](0.002)
= 10.225 − 1.0745 − 0.046875 − 0.003063 − 0.000078 = **9.100 kgf/cm²**.

## Q2.4 Using Stirling's formula find y₃₅ given y₂₀ = 512, y₃₀ = 439, y₄₀ = 346, y₅₀ = 243.

Take x₀ = 30 (the value nearest the middle of the interval containing 35), h = 10, p = (35 − 30)/10 = 0.5.

| x | y | Δ | Δ² | Δ³ |
|---|---|---|---|---|
| 20 (x₋₁) | 512 | −73 | −20 | 10 |
| 30 (x₀) | 439 | −93 | −10 | |
| 40 (x₁) | 346 | −103 | | |
| 50 (x₂) | 243 | | | |

Stirling: y = y₀ + p·(Δy₀ + Δy₋₁)/2 + (p²/2)·Δ²y₋₁ + [p(p² − 1)/6]·(Δ³y₋₁ + Δ³y₋₂)/2 + …
= 439 + 0.5 × (−93 − 73)/2 + (0.25/2)(−20) = 439 − 41.5 − 2.5 = **395** (up to second differences).

The third-difference term needs Δ³y₋₂, which these four values cannot give, so stop at second differences: **y₃₅ ≈ 395**. (For p = ½, Bessel's formula is the better choice and gives 394.375 using all the differences.)

## Q2.5 Establish the relations (a) Δ = E − 1 (b) E = e^(hD) (c) Δ − ∇ = Δ∇ = δ².

Definitions (step h): Δf(x) = f(x + h) − f(x), ∇f(x) = f(x) − f(x − h), δf(x) = f(x + h/2) − f(x − h/2), Ef(x) = f(x + h), Df(x) = f′(x).

**(a)** Δf(x) = f(x + h) − f(x) = Ef(x) − f(x) = (E − 1)f(x). Hence **Δ = E − 1**.

**(b)** By Taylor's series, Ef(x) = f(x + h) = f(x) + hf′(x) + (h²/2!)f″(x) + … = [1 + hD + (hD)²/2! + …]f(x) = e^(hD) f(x). Hence **E = e^(hD)**.

**(c)** Since ∇ = 1 − E⁻¹ and Δ = E − 1:
- Δ − ∇ = (E − 1) − (1 − E⁻¹) = E − 2 + E⁻¹.
- Δ∇ = (E − 1)(1 − E⁻¹) = E − 1 − 1 + E⁻¹ = E − 2 + E⁻¹.
- δ = E^(1/2) − E^(−1/2), so δ² = E − 2 + E⁻¹.

Hence **Δ − ∇ = Δ∇ = δ²**.

## Q2.6 Visible horizon: y at (a) x = 160 ft (b) x = 410 ft.

| x | y | Δ | Δ² | Δ³ | Δ⁴ | Δ⁵ | Δ⁶ |
|---|---|---|---|---|---|---|---|
| 100 | 10.63 | 2.40 | −0.39 | 0.15 | −0.07 | 0.02 | 0.02 |
| 150 | 13.03 | 2.01 | −0.24 | 0.08 | −0.05 | 0.04 | |
| 200 | 15.04 | 1.77 | −0.16 | 0.03 | −0.01 | | |
| 250 | 16.81 | 1.61 | −0.13 | 0.02 | | | |
| 300 | 18.42 | 1.48 | −0.11 | | | | |
| 350 | 19.90 | 1.37 | | | | | |
| 400 | 21.27 | | | | | | |

**(a) x = 160: Newton forward**, p = (160 − 100)/50 = 1.2:
y = 10.63 + 1.2(2.40) + [1.2(0.2)/2](−0.39) + [1.2(0.2)(−0.8)/6](0.15) + [1.2(0.2)(−0.8)(−1.8)/24](−0.07) + …
= 10.63 + 2.88 − 0.0468 − 0.0048 − 0.0010 − 0.0002 + 0.0001 ≈ **13.46 nautical miles**.

**(b) x = 410: Newton backward**, p = (410 − 400)/50 = 0.2, with ∇ values at 400 (1.37, −0.11, 0.02, −0.01, 0.04, 0.02):
y = 21.27 + 0.2(1.37) + [0.2(1.2)/2](−0.11) + [0.2(1.2)(2.2)/6](0.02) + [0.2(1.2)(2.2)(3.2)/24](−0.01) + …
= 21.27 + 0.274 − 0.0132 + 0.0018 − 0.0007 + 0.0024 + 0.0010 ≈ **21.53 nautical miles** (slight extrapolation).

# Q3. Attempt any four out of six [20]

## Q3.1 Real root of x log₁₀ x = 1.2 to 0.01 % using Newton-Raphson.

x₀ = 2.5 → 2.746505 → 2.740649 → 2.740646: **x ≈ 2.7406**. Full table: [CONMP CET-1 2025, Q3(d)](/library/conmp/paper-cet-1-2025-08-22#q3d-find-a-real-root-of-x-log-x-1-2-to-a-tolerance-of-0-01-using-newton-raphson).

## Q3.2 Positive root of x³ = 1 − x² by successive approximations, three decimals.

f(x) = x³ + x² − 1; f(0) = −1, f(1) = 1, so the root is in (0, 1). Write x²(x + 1) = 1 → **x = φ(x) = 1/√(1 + x)**.
φ′(x) = −½(1 + x)^(−3/2), |φ′(x)| < 1 on (0, 1) ✓. Take x₀ = 0.75:

| n | xₙ | xₙ₊₁ = 1/√(1 + xₙ) |
|---|---|---|
| 0 | 0.75000 | 0.75593 |
| 1 | 0.75593 | 0.75465 |
| 2 | 0.75465 | 0.75493 |

**x ≈ 0.755** (exact 0.75488).

## Q3.3 Lin-Bairstow, two iterations, x⁴ − 8x³ + 39x² − 62x + 50, p₀ = q₀ = 0.

After two iterations **x² − 1.9057x + 1.8970** (true factor x² − 2x + 2). Full working: [CONMP CET-2 2025, Q3(a)](/library/conmp/paper-cet-2-2025-10-08#q3a-two-iterations-of-lin-bairstow-quadratic-factor-x-px-q-of-x-8x-39x-62x-50-p-).

## Q3.4 Budan's theorem for x³ − 3x² − 4x + 13 = 0.

One root in [−3, −2], none in [−2, −1], [−1, 0], [0, 1], [1, 2], and two in [2, 3]. Full table: [CONMP CET-2 2025, Q2(e)](/library/conmp/paper-cet-2-2025-10-08#q2e-budan-s-theorem-number-of-roots-of-x-3x-4x-13-0-in-3-2-2-1-1-0-0-1-1-2-2-3).

## Q3.5 False position: positive root of x³ − 2x − 5 = 0, three decimals.

f(2) = −1, f(3) = 16, so the root is in (2, 3).

| n | a | b | x | f(x) |
|---|---|---|---|---|
| 1 | 2.00000 | 3.00000 | 2.05882 | −0.39080 |
| 2 | 2.05882 | 3.00000 | 2.08126 | −0.14720 |
| 3 | 2.08126 | 3.00000 | 2.08964 | −0.05468 |
| 4 | 2.08964 | 3.00000 | 2.09274 | −0.02020 |
| 5 | 2.09274 | 3.00000 | 2.09388 | −0.00745 |
| 6 | 2.09388 | 3.00000 | 2.09431 | −0.00275 |

**x ≈ 2.094** (exact 2.09455).

## Q3.6 Bisection: positive root of x³ − x = 11, four significant digits.

**x ≈ 2.374.** Full 14-step table: [CONMP CET-1 2025, Q3(c)](/library/conmp/paper-cet-1-2025-08-22#q3c-obtain-a-positive-root-of-x-x-11-by-the-bisection-method-correct-to-four-sig).

# Q4. Attempt any four out of six [20]

## Q4.1 Euler's method: y at x = 0.1 from dy/dx = x + y + xy, y(0) = 1, in five steps.

h = 0.02 → y(0.1) ≈ **1.1125**. Table: [CONMP CET-2 2025, Q2(a)](/library/conmp/paper-cet-2-2025-10-08#q2a-euler-s-method-y-at-x-0-1-from-dy-dx-x-y-xy-y0-1-in-five-steps).

## Q4.2 Heun's predictor-corrector: y at x = 0.1, dy/dx = x² + y, y(0) = 1, h = 0.05.

- Step 1: predictor y = 1 + 0.05(0 + 1) = 1.050000; corrector y = 1 + 0.025[1 + (0.0025 + 1.05)] = 1.051313 → 1.051345 → **1.051346**.
- Step 2 (x = 0.05): f = 0.0025 + 1.051346 = 1.053846; predictor 1.104038; corrector 1.105543 → 1.105581 → **1.105582**.

**y(0.1) ≈ 1.1056.**

## Q4.3 RK-4: y(0.2) for dy/dx = x + y, y(0) = 1, h = 0.1.

| x | y | k₁ | k₂ | k₃ | k₄ | new y |
|---|---|---|---|---|---|---|
| 0.0 | 1.000000 | 0.100000 | 0.110000 | 0.110500 | 0.121050 | 1.110342 |
| 0.1 | 1.110342 | 0.121034 | 0.132086 | 0.132638 | 0.144298 | 1.242805 |

**y(0.2) ≈ 1.2428** (exact 2e^0.2 − 1.2 = 1.24281).

## Q4.4 Fit a straight line by least squares: x = 1…5, y = 14, 27, 40, 55, 68.

y = a + bx; normal equations Σy = na + bΣx, Σxy = aΣx + bΣx².
n = 5, Σx = 15, Σy = 204, Σx² = 55, Σxy = 14 + 54 + 120 + 220 + 340 = 748.
- 204 = 5a + 15b
- 748 = 15a + 55b

Multiply the first by 3: 612 = 15a + 45b; subtract: 136 = 10b → **b = 13.6**; then 5a = 204 − 204 → **a = 0**.

**Best-fit line: y = 13.6x.**

## Q4.5 RK-2: y(0.3) for dy/dx = y − x, y(0) = 2, h = 0.1.

**y(0.3) ≈ 2.6492.** Table: [CONMP CET-2 2025, Q2(c)](/library/conmp/paper-cet-2-2025-10-08#q2c-given-dy-dx-y-x-y0-2-find-y0-3-using-the-r-k-second-order-formula-with-h-0-1).

## Q4.6 Taylor series: y(0.1) to four decimals, dy/dx = x² + y², y(0) = 1.

- y′ = x² + y² → y′(0) = 1
- y″ = 2x + 2yy′ → y″(0) = 2
- y‴ = 2 + 2(y′)² + 2yy″ → y‴(0) = 2 + 2 + 4 = 8
- y⁗ = 4y′y″ + 2y′y″ + 2yy‴ = 6y′y″ + 2yy‴ → y⁗(0) = 12 + 16 = 28

y(0.1) = 1 + 0.1(1) + (0.01/2)(2) + (0.001/6)(8) + (0.0001/24)(28)
= 1 + 0.1 + 0.01 + 0.001333 + 0.000117 = **1.1115**.

# Q5. Attempt any four out of six [20]

## Q5.1 ∫₀.₅¹·³ e^(x²) dx by Simpson's rule with five ordinates.

**≈ 2.0762.** Table: [CONMP CET-2 2025, Q2(d)](/library/conmp/paper-cet-2-2025-10-08#q2d-estimate-e-x-dx-by-simpson-s-appropriate-rule-with-five-ordinates).

## Q5.2 Gauss-Seidel: 7x₁ + 52x₂ + 13x₃ = 104, 83x₁ + 11x₂ − 4x₃ = 95, 3x₁ + 8x₂ + 29x₃ = 71.

**x₁ = 1.058, x₂ = 1.367, x₃ = 1.962.** Table: [CONMP CET-2 2025, Q3(b)](/library/conmp/paper-cet-2-2025-10-08#q3b-gauss-seidel-7x-52x-13x-104-83x-11x-4x-95-3x-8x-29x-71-three-decimals).

## Q5.3 ∫₀.₅¹·³ ln x dx by Simpson's rule, h = 0.2.

**≈ −0.1125.** Table: [CONMP CET-2 2025, Q2(b)](/library/conmp/paper-cet-2-2025-10-08#q2b-evaluate-ln-x-dx-by-simpson-s-appropriate-rule-with-h-0-2).

## Q5.4 Jacobi: 10x + y − z = 11.19, x + 10y + z = 28.08, −x + y + 10z = 35.61.

**x = 1.23, y = 2.34, z = 3.45.** Table: [CONMP CET-2 2025, Q3(d)](/library/conmp/paper-cet-2-2025-10-08#q3d-jacobi-iteration-10x-y-z-11-19-x-10y-z-28-08-x-y-10z-35-61-two-decimals).

## Q5.5 Evaluate ∫₀¹ dx/(1 + x²) by the trapezoidal rule with h = 1/5.

| x | 0 | 0.2 | 0.4 | 0.6 | 0.8 | 1.0 |
|---|---|---|---|---|---|---|
| y = 1/(1 + x²) | 1.000000 | 0.961538 | 0.862069 | 0.735294 | 0.609756 | 0.500000 |

I = (h/2)[(y₀ + y₅) + 2(y₁ + y₂ + y₃ + y₄)] = 0.1 × [1.5 + 2(3.168657)] = **0.7837** (exact π/4 = 0.7854).

## Q5.6 Fit a second degree parabola to x = 0…4, y = 1, 1.8, 1.3, 2.5, 6.3.

y = a + bx + cx². Sums: n = 5, Σx = 10, Σx² = 30, Σx³ = 100, Σx⁴ = 354, Σy = 12.9, Σxy = 37.1, Σx²y = 130.3.

Normal equations:
- 12.9 = 5a + 10b + 30c
- 37.1 = 10a + 30b + 100c
- 130.3 = 30a + 100b + 354c

Solving: **a = 1.42, b = −1.07, c = 0.55**, so **y = 1.42 − 1.07x + 0.55x²**.
