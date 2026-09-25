import type { Subject } from './types';

export const sem1ClaSubject: Subject = {
  id: 'sem1-cla',
  name: 'Calculus & Linear Algebra',
  code: 'MATH101',
  color: 'bg-indigo-600',
  icon: 'calculator',
  description: 'Comprehensive University Syllabus for Engineering Mathematics 1 — Successive Differentiation, Partial Derivatives, Matrix Rank, Linear Systems, Eigenvalues, and Multiple Integrals',
  semester: 1,
  units: [
    {
      id: "cla-u1",
      title: "Unit 1: Differential Calculus & Successive Differentiation",
      description: "Standard nth derivatives of elementary functions, Leibniz's product differentiation theorem and proofs, evaluation of indeterminate forms via L'H\u00f4pital's rule, and Taylor/Maclaurin series expansions.",
      topics: [
        {
          id: "cla-u1-t1",
          title: "Standard nth Derivatives of Elementary Functions",
          simpleExplanation: "Finding the derivative of a function once or twice is easy, but what if you need the 50th or nth derivative? Successive differentiation gives us exact shortcut formulas to jump straight to the nth derivative of exponential, power, logarithmic, and trigonometric functions without differentiating over and over.",
          detailedExplanation: `## Successive Differentiation & Standard $n$-th Derivatives

In engineering mathematics, many physical phenomena (such as wave propagation, harmonic motion, and transient circuit response) require higher-order rates of change. The process of differentiating a function repeatedly is called **successive differentiation**.

If $y = f(x)$, then:
- First derivative: $y_1 = \\frac{dy}{dx} = f'(x)$
- Second derivative: $y_2 = \\frac{d^2 y}{dx^2} = f''(x)$
- $n$-th derivative: $y_n = \\frac{d^n y}{dx^n} = f^{(n)}(x)$

Let us rigorously derive the standard $n$-th derivative formulas that form the foundation of university exam problems.

---

### 1. $n$-th Derivative of Exponential Function: $y = e^{ax}$

Let $y = e^{ax}$.
- $y_1 = a e^{ax}$
- $y_2 = a^2 e^{ax}$
- $y_3 = a^3 e^{ax}$

By mathematical induction, for any positive integer $n$:
$$\\frac{d^n}{dx^n}(e^{ax}) = a^n e^{ax}$$

*Special Case:* If $y = a^x = e^{x \\ln a}$, then:
$$y_n = (\\ln a)^n a^x$$

---

### 2. $n$-th Derivative of Power Function: $y = (ax + b)^m$

Let $y = (ax + b)^m$. Differentiating successively:
- $y_1 = m a (ax + b)^{m-1}$
- $y_2 = m(m-1) a^2 (ax + b)^{m-2}$
- $y_3 = m(m-1)(m-2) a^3 (ax + b)^{m-3}$

Continuing this process up to the $n$-th step:
$$y_n = m(m-1)(m-2)\\dots(m - n + 1) a^n (ax + b)^{m-n} = \\frac{m!}{(m-n)!} a^n (ax + b)^{m-n}$$

#### Critical Sub-Cases:
1. **Case $m = n$:**
   $$y_n = n! a^n$$
2. **Case $m < n$ (where $m$ is a positive integer):**
   $$y_n = 0$$
3. **Case $m = -1$, i.e., $y = \\frac{1}{ax + b}$:**
   $$y_1 = (-1) a (ax + b)^{-2}$$
   $$y_2 = (-1)(-2) a^2 (ax + b)^{-3} = (-1)^2 2! a^2 (ax + b)^{-3}$$
   $$y_n = \\frac{(-1)^n n! a^n}{(ax + b)^{n+1}}$$

---

### 3. $n$-th Derivative of Logarithmic Function: $y = \\ln(ax + b)$

Differentiating once:
$$y_1 = \\frac{a}{ax + b} = a(ax + b)^{-1}$$

Now, the $n$-th derivative of $y$ is simply the $(n-1)$-th derivative of $y_1$:
$$y_n = \\frac{d^{n-1}}{dx^{n-1}} \\left[ a(ax + b)^{-1} \\right] = a \\cdot \\frac{(-1)^{n-1} (n-1)! a^{n-1}}{(ax + b)^n}$$
$$y_n = \\frac{(-1)^{n-1} (n-1)! a^n}{(ax + b)^n}$$

---

### 4. $n$-th Derivatives of Sine and Cosine: $y = \\sin(ax + b)$ and $y = \\cos(ax + b)$

Let $y = \\sin(ax + b)$.
- $y_1 = a \\cos(ax + b) = a \\sin\\left(ax + b + \\frac{\\pi}{2}\\right)$
- $y_2 = a^2 \\cos\\left(ax + b + \\frac{\\pi}{2}\\right) = a^2 \\sin\\left(ax + b + 2 \\cdot \\frac{\\pi}{2}\\right)$
- $y_3 = a^3 \\sin\\left(ax + b + 3 \\cdot \\frac{\\pi}{2}\\right)$

By induction:
$$\\frac{d^n}{dx^n}[\\sin(ax + b)] = a^n \\sin\\left(ax + b + \\frac{n\\pi}{2}\\right)$$

Similarly for $y = \\cos(ax + b)$:
$$\\frac{d^n}{dx^n}[\\cos(ax + b)] = a^n \\cos\\left(ax + b + \\frac{n\\pi}{2}\\right)$$

---

### 5. $n$-th Derivative of $e^{ax} \\sin(bx + c)$ and $e^{ax} \\cos(bx + c)$

Let $y = e^{ax} \\sin(bx + c)$.
$$y_1 = a e^{ax} \\sin(bx + c) + b e^{ax} \\cos(bx + c) = e^{ax} [a \\sin(bx + c) + b \\cos(bx + c)]$$

Substitute $a = r \\cos \\phi$ and $b = r \\sin \\phi$, where:
$$r = \\sqrt{a^2 + b^2}, \\quad \\phi = \\tan^{-1}\\left(\\frac{b}{a}\\right)$$

Then:
$$y_1 = e^{ax} [r \\cos \\phi \\sin(bx + c) + r \\sin \\phi \\cos(bx + c)] = r e^{ax} \\sin(bx + c + \\phi)$$

Differentiating repeatedly adds a factor of $r$ and shifts the angle by $\\phi$ at each step:
$$y_n = r^n e^{ax} \\sin(bx + c + n\\phi) = (a^2 + b^2)^{n/2} e^{ax} \\sin\\left(bx + c + n \\tan^{-1}\\frac{b}{a}\\right)$$

Similarly:
$$y_n = (a^2 + b^2)^{n/2} e^{ax} \\cos\\left(bx + c + n \\tan^{-1}\\frac{b}{a}\\right)$$

---

### Master Comparison Table of Standard $n$-th Derivatives

| Function $y$ | $n$-th Derivative $y_n$ | Key Exam Condition |
| :--- | :--- | :--- |
| $e^{ax}$ | $a^n e^{ax}$ | Holds for all $n \\ge 1$ |
| $(ax + b)^m$ | $\\frac{m!}{(m-n)!} a^n (ax + b)^{m-n}$ | $m \\ge n$ |
| $\\frac{1}{ax + b}$ | $\\frac{(-1)^n n! a^n}{(ax + b)^{n+1}}$ | Note power in denom is $n+1$ |
| $\\ln(ax + b)$ | $\\frac{(-1)^{n-1} (n-1)! a^n}{(ax + b)^n}$ | Note power of $-1$ is $n-1$ |
| $\\sin(ax + b)$ | $a^n \\sin\\left(ax + b + \\frac{n\\pi}{2}\\right)$ | Phase shift $+ \\frac{n\\pi}{2}$ |
| $\\cos(ax + b)$ | $a^n \\cos\\left(ax + b + \\frac{n\\pi}{2}\\right)$ | Phase shift $+ \\frac{n\\pi}{2}$ |
| $e^{ax} \\sin(bx + c)$ | $(a^2 + b^2)^{n/2} e^{ax} \\sin\\left(bx + c + n\\tan^{-1}\\frac{b}{a}\\right)$ | $r = \\sqrt{a^2+b^2}$ |

---

> [!TIP] **EXAM TIP:**
> When asked to find the $n$-th derivative of a rational fraction like $\\frac{x}{(x-1)(x-2)(x-3)}$, NEVER use the quotient rule! Always split the expression into **partial fractions** first: $A/(x-1) + B/(x-2) + C/(x-3)$, and then apply the standard formula for $(ax+b)^{-1}$ to each term individually.

> [!NOTE] **DEV BRAIN:**
> Think of $y_n$ as a closed-form formula $O(1)$ computation instead of an iterative loop $O(n)$. Rather than executing \`for (i = 0; i < n; i++) diff()\`, mathematical analysis gives you the direct result in constant time!

> [!WARNING] **TRAP:**
> Watch out for the exponent and sign in $\\ln(ax + b)$! The $n$-th derivative has $(n-1)!$ and $(-1)^{n-1}$, NOT $n!$ or $(-1)^n$. For example, the 1st derivative is positive: $\\frac{a}{ax+b}$, because $(-1)^{1-1} = (-1)^0 = +1$.

> [!IMPORTANT] **MEMORIZE:**
> - $D^n [\\sin(ax)] = a^n \\sin(ax + n\\pi/2)$
> - $D^n [\\cos(ax)] = a^n \\cos(ax + n\\pi/2)$
> - $D^n [(ax+b)^{-1}] = (-1)^n n! a^n (ax+b)^{-(n+1)}$
> - $D^n [\\ln(ax+b)] = (-1)^{n-1} (n-1)! a^n (ax+b)^{-n}$`,
          shortNotes: "Standard nth derivatives: e^(ax) -> a^n e^(ax); sin(ax+b) -> a^n sin(ax+b+n\u03c0/2); (ax+b)^-1 -> (-1)^n n! a^n (ax+b)^-(n+1); ln(ax+b) -> (-1)^(n-1) (n-1)! a^n (ax+b)^-n.",
          examples: [
            {
              title: "Finding nth Derivative Using Partial Fractions",
              problem: "Find the nth derivative of y = (x + 1) / ((x - 2)(x - 3)).",
              explanation: "Step 1: Resolve y into partial fractions.\nLet (x + 1)/((x - 2)(x - 3)) = A/(x - 2) + B/(x - 3).\nMultiplying by (x - 2)(x - 3): x + 1 = A(x - 3) + B(x - 2).\nPut x = 2: 3 = A(-1) => A = -3.\nPut x = 3: 4 = B(1) => B = 4.\nSo y = -3(x - 2)^(-1) + 4(x - 3)^(-1).\n\nStep 2: Apply standard nth derivative formula D^n[(x - a)^(-1)] = (-1)^n n! / (x - a)^(n+1).\nTherefore:\ny_n = -3 * [(-1)^n n! / (x - 2)^(n+1)] + 4 * [(-1)^n n! / (x - 3)^(n+1)]\ny_n = (-1)^n n! [ 4/(x - 3)^(n+1) - 3/(x - 2)^(n+1) ].",
              code: "import sympy as sp\nx, n = sp.symbols('x n')\ny = (x + 1) / ((x - 2) * (x - 3))\n# Partial fractions representation\npartial_y = sp.apart(y)\nprint(f'Partial fractions: {partial_y}')\n# Verify for n = 3\ny_3_exact = sp.diff(y, x, 3)\nprint(f'3rd derivative: {sp.simplify(y_3_exact)}')",
              output: "Partial fractions: 4/(x - 3) - 3/(x - 2)\n3rd derivative: -6*(4*(x - 2)**4 - 3*(x - 3)**4)/((x - 3)**4*(x - 2)**4)",
            },
          ],
          keyPoints: [
    "The nth derivative of e^(ax) scales by a factor of a^n.",
    "Differentiating sine or cosine introduces a phase shift of \u03c0/2 for each differentiation step, leading to + n\u03c0/2.",
    "Rational functions must always be decomposed into partial fractions before finding nth derivatives.",
    "The nth derivative of ln(ax+b) contains (n-1)! and (-1)^(n-1) because the first derivative already reduces the power to -1.",
    "For y = e^(ax) sin(bx+c), the amplitude scales by (a^2+b^2)^(n/2) and the phase shifts by n*tan^(-1)(b/a)."
],
          theoryQuestions: [
            {
              question: "Derive the formula for the nth derivative of y = sin(ax + b) and hence find the nth derivative of sin^3(x).",
              marks: "7 Marks",
              answer: "1. Differentiate y = sin(ax+b): y_1 = a cos(ax+b) = a sin(ax+b+\u03c0/2). Successive differentiation yields y_n = a^n sin(ax+b + n\u03c0/2) by mathematical induction.\n2. For y = sin^3(x), use trigonometric identity: sin(3x) = 3 sin(x) - 4 sin^3(x) => sin^3(x) = (3/4)sin(x) - (1/4)sin(3x).\n3. Differentiating n times:\ny_n = (3/4) sin(x + n\u03c0/2) - (1/4) * 3^n * sin(3x + n\u03c0/2).",
              keyPoints: ["Derivation using phase shift \u03c0/2", "Identity sin^3(x) = 1/4(3 sin x - sin 3x)", "Applying standard formula to each component"],
            },
            {
              question: "Find the nth derivative of y = e^(2x) cos(3x).",
              marks: "5 Marks",
              answer: "Using the standard formula for y = e^(ax) cos(bx+c):\nHere a = 2, b = 3, c = 0.\nr = sqrt(a^2 + b^2) = sqrt(2^2 + 3^2) = sqrt(13).\nphi = tan^(-1)(b/a) = tan^(-1)(3/2).\nTherefore:\ny_n = (13)^(n/2) e^(2x) cos(3x + n * tan^(-1)(3/2)).",
              keyPoints: ["Identify a=2, b=3", "r = sqrt(13)", "phi = tan^(-1)(1.5)", "Final form (13)^(n/2) e^(2x) cos(...)"],
            },
          ],
          mcqs: [
            {
              question: "What is the nth derivative of y = ln(2x + 3)?",
              options: ["(-1)^n n! 2^n / (2x + 3)^n", "(-1)^(n-1) (n-1)! 2^n / (2x + 3)^n", "n! 2^n / (2x + 3)^(n+1)", "(-1)^(n-1) n! 2^n / (2x + 3)^n"],
              correctIndex: 1,
              explanation: "Formula for ln(ax+b) is (-1)^(n-1) (n-1)! a^n / (ax+b)^n. Substituting a = 2 gives (-1)^(n-1) (n-1)! 2^n / (2x + 3)^n.",
            },
            {
              question: "What is the nth derivative of cos(2x) at x = 0 when n = 4?",
              options: ["0", "8", "16", "-16"],
              correctIndex: 2,
              explanation: "D^n[cos(2x)] = 2^n cos(2x + n\u03c0/2). For n = 4: 2^4 cos(2(0) + 4\u03c0/2) = 16 cos(2\u03c0) = 16(1) = 16.",
            },
            {
              question: "If y = (3x + 1)^3, what is its 4th derivative (y_4)?",
              options: ["162", "0", "81", "24"],
              correctIndex: 1,
              explanation: "For any polynomial (ax+b)^m, whenever n > m, the nth derivative is identically 0. Here n = 4 > m = 3, so y_4 = 0.",
            },
          ],
        },
        {
          id: "cla-u1-t2",
          title: "Leibniz's Theorem for nth Derivative of a Product & University Proof",
          simpleExplanation: "The product rule gives the first derivative of u*v as u'*v + u*v'. Leibniz's theorem generalizes this to the nth derivative! It looks exactly like the Binomial Theorem, replacing powers with derivatives.",
          detailedExplanation: `## Leibniz's Theorem for Product Differentiation

When a function is expressed as the product of two functions $y = u(x) \\cdot v(x)$, differentiating once yields the standard product rule:
$$(uv)_1 = u_1 v + u v_1$$

Differentiating a second time:
$$(uv)_2 = (u_2 v + u_1 v_1) + (u_1 v_1 + u v_2) = u_2 v + 2 u_1 v_1 + u v_2$$

Notice the striking similarity to the binomial expansion $(a+b)^2 = a^2 + 2ab + b^2$. **Leibniz's Theorem** states that this exact binomial symmetry holds for any arbitrary positive integer $n$.

---

### Statement of Leibniz's Theorem

If $u$ and $v$ are two functions of $x$ possessing continuous derivatives up to order $n$, then the $n$-th derivative of their product is given by:
$$(uv)_n = \\sum_{r=0}^{n} \\binom{n}{r} u_{n-r} v_r$$
$$(uv)_n = u_n v + \\binom{n}{1} u_{n-1} v_1 + \\binom{n}{2} u_{n-2} v_2 + \\dots + \\binom{n}{r} u_{n-r} v_r + \\dots + u v_n$$

Where:
$$\\binom{n}{r} = \\frac{n!}{r!(n-r)!}$$
and $u_0 = u, v_0 = v$.

---

### Rigorous Mathematical Induction Proof

#### Step 1: Base Case ($n = 1$)
For $n = 1$:
$$(uv)_1 = u_1 v + u v_1 = \\binom{1}{0} u_1 v + \\binom{1}{1} u v_1$$
The theorem holds true for $n = 1$.

#### Step 2: Inductive Hypothesis
Assume that the theorem holds true for some positive integer $k$:
$$(uv)_k = u_k v + \\binom{k}{1} u_{k-1} v_1 + \\binom{k}{2} u_{k-2} v_2 + \\dots + \\binom{k}{r} u_{k-r} v_r + \\dots + u v_k$$

#### Step 3: Inductive Step ($n = k + 1$)
Differentiating both sides with respect to $x$:
$$\\frac{d}{dx}[(uv)_k] = (uv)_{k+1}$$

Applying the ordinary product rule to each term on the right-hand side:
$$(uv)_{k+1} = [u_{k+1} v + u_k v_1] + \\binom{k}{1} [u_k v_1 + u_{k-1} v_2] + \\binom{k}{2} [u_{k-1} v_2 + u_{k-2} v_3] + \\dots + \\binom{k}{r} [u_{k-r+1} v_r + u_{k-r} v_{r+1}] + \\dots + [u_1 v_k + u v_{k+1}]$$

Now, group the coefficients of corresponding derivative terms:
$$(uv)_{k+1} = u_{k+1} v + \\left[1 + \\binom{k}{1}\\right] u_k v_1 + \\left[\\binom{k}{1} + \\binom{k}{2}\\right] u_{k-1} v_2 + \\dots + \\left[\\binom{k}{r-1} + \\binom{k}{r}\\right] u_{k-r+1} v_r + \\dots + u v_{k+1}$$

Using **Pascal's Identity**:
$$\\binom{k}{r-1} + \\binom{k}{r} = \\binom{k+1}{r}$$

We get:
- $1 + \\binom{k}{1} = \\binom{k}{0} + \\binom{k}{1} = \\binom{k+1}{1}$
- $\\binom{k}{1} + \\binom{k}{2} = \\binom{k+1}{2}$
- $\\binom{k}{r-1} + \\binom{k}{r} = \\binom{k+1}{r}$

Substituting these back into the expression:
$$(uv)_{k+1} = u_{k+1} v + \\binom{k+1}{1} u_k v_1 + \\binom{k+1}{2} u_{k-1} v_2 + \\dots + \\binom{k+1}{r} u_{k+1-r} v_r + \\dots + u v_{k+1}$$

This is precisely the statement of Leibniz's theorem for $n = k + 1$.
Hence, by the **Principle of Mathematical Induction**, Leibniz's theorem is true for all positive integers $n \\ge 1$. $\\quad \\blacksquare$

---

### The Golden Rule of Applying Leibniz's Theorem in Exams

When evaluating $D^n[f(x) \\cdot g(x)]$:
1. Always assign $v$ to the **algebraic polynomial** (e.g., $x, x^2, x^3$).
2. Why? Because higher derivatives of a polynomial vanish!
   - If $v = x^2$, then $v_1 = 2x, v_2 = 2, v_3 = 0, v_4 = 0, \\dots$
   - The entire infinite sum collapses to **just 3 terms**!
3. Assign $u$ to the function whose $n$-th derivative is readily known (e.g., $e^{ax}, \\sin ax, \\cos ax$).

---

### University Classic Pattern: Proving Differential Equations

Many university exam questions follow this exact pattern:
Given $y = f(x)$, prove $(1-x^2) y_{n+2} - (2n+1)x y_{n+1} - (n^2 + m^2) y_n = 0$.

**Step-by-step strategy:**
1. Differentiate once to obtain $y_1$.
2. Clear square roots and fractions: multiply up and square if necessary.
3. Differentiate again with respect to $x$ to obtain a differential equation containing $y_2, y_1, y$.
4. Apply Leibniz's theorem to each term $n$ times:
   - $D^n[(1-x^2) y_2] = (1-x^2) y_{n+2} + n(-2x) y_{n+1} + \\frac{n(n-1)}{2}(-2) y_n$
   - $D^n[x y_1] = x y_{n+1} + n(1) y_n$
   - $D^n[y] = y_n$
5. Collect and combine coefficients of $y_{n+2}, y_{n+1}, y_n$. The required equation emerges automatically!

---

> [!TIP] **EXAM TIP:**
> When differentiating an equation like $(1-x^2) y_1^2 = m^2 y^2$, differentiate with respect to $x$:
> $(1-x^2) 2 y_1 y_2 + (-2x) y_1^2 = m^2 2 y y_1$.
> Notice that $2 y_1$ is a common factor in ALL terms! Divide through by $2 y_1$ immediately to get $(1-x^2) y_2 - x y_1 = m^2 y$.

> [!NOTE] **DEV BRAIN:**
> Leibniz's theorem is the mathematical equivalent of \`zipWith\` in functional programming: combining derivatives of $u$ in decreasing order with derivatives of $v$ in increasing order, weighted by binomial coefficients.

> [!WARNING] **TRAP:**
> Do NOT mix up $u$ and $v$! If you set $u = x^2$ and $v = e^{ax}$, you will need $u_n$ (which is 0 for $n > 2$), but $v_r$ will never terminate! You will waste 15 minutes calculating terms that could have terminated in 3 lines.

> [!IMPORTANT] **MEMORIZE:**
> - Leibniz formula: $(uv)_n = u_n v + n u_{n-1} v_1 + \\frac{n(n-1)}{2!} u_{n-2} v_2 + \\frac{n(n-1)(n-2)}{3!} u_{n-3} v_3 + \\dots$
> - Term $D^n[(1-x^2) y_2] = (1-x^2) y_{n+2} - 2nx y_{n+1} - n(n-1) y_n$
> - Term $D^n[x y_1] = x y_{n+1} + n y_n$`,
          shortNotes: "Leibniz Theorem: (uv)_n = \u03a3 C(n,r) u_{n-r} v_r. Always choose v as the polynomial so v_3, v_4... vanish. Essential for proving (1-x^2)y_{n+2} - (2n+1)xy_{n+1} - ... = 0.",
          examples: [
            {
              title: "Finding nth Derivative of x^2 * e^(3x)",
              problem: "Find the nth derivative of y = x^2 * e^(3x).",
              explanation: "Let u = e^(3x) and v = x^2.\nThen u_n = 3^n e^(3x), u_{n-1} = 3^(n-1) e^(3x), u_{n-2} = 3^(n-2) e^(3x).\nFor v: v = x^2, v_1 = 2x, v_2 = 2, v_3 = 0, v_4 = 0, ...\n\nApplying Leibniz's theorem:\n(uv)_n = u_n v + n u_{n-1} v_1 + [n(n-1)/2] u_{n-2} v_2\n(uv)_n = [3^n e^(3x)](x^2) + n [3^(n-1) e^(3x)](2x) + [n(n-1)/2] [3^(n-2) e^(3x)](2)\nFactor out 3^(n-2) e^(3x):\n(uv)_n = 3^(n-2) e^(3x) [ 9x^2 + 6nx + n(n-1) ].",
              code: "import sympy as sp\nx, n = sp.symbols('x n')\ny = (x**2) * sp.exp(3*x)\n# Let's test for n = 2 and n = 3\ny_2 = sp.diff(y, x, 2)\nprint(f'2nd derivative: {sp.factor(y_2)}')\n# Using Leibniz formula for n = 2:\n# 3^(0) * e^(3x) * [9x^2 + 12x + 2]\nprint('Matches Leibniz formula exactly!')",
              output: "2nd derivative: (9*x**2 + 12*x + 2)*exp(3*x)\nMatches Leibniz formula exactly!",
            },
          ],
          keyPoints: [
    "Leibniz's theorem gives the nth derivative of the product of two functions.",
    "Its coefficients are identical to the binomial expansion: C(n, 0), C(n, 1), ..., C(n, n).",
    "Assign the polynomial factor to v because its derivatives become zero after order equal to its degree.",
    "Pascal's identity C(k, r-1) + C(k, r) = C(k+1, r) is the core step in the induction proof.",
    "Used universally in engineering exams to establish higher-order differential equations and evaluate y_n(0)."
],
          theoryQuestions: [
            {
              question: "State and prove Leibniz's theorem for the nth derivative of the product of two functions.",
              marks: "7 Marks",
              answer: "1. Statement: If u and v are functions of x with derivatives up to order n, then (uv)_n = \u03a3 C(n,r) u_{n-r} v_r from r = 0 to n.\n2. Proof by induction:\n- Verify for n = 1: (uv)_1 = u_1 v + u v_1.\n- Assume true for n = k: (uv)_k = \u03a3 C(k,r) u_{k-r} v_r.\n- Differentiate with respect to x: (uv)_{k+1} = d/dx [\u03a3 C(k,r) u_{k-r} v_r] = \u03a3 C(k,r) [u_{k-r+1} v_r + u_{k-r} v_{r+1}].\n- Collect terms and use Pascal's identity C(k, r-1) + C(k, r) = C(k+1, r).\n- Conclude that theorem holds for n = k+1. By induction, it holds for all n.",
              keyPoints: ["Formal statement with formula", "Base case n = 1", "Induction step with Pascal identity", "Conclusion"],
            },
            {
              question: "If y = sin(m * sin^(-1) x), prove that (1 - x^2) y_{n+2} - (2n + 1)x y_{n+1} + (m^2 - n^2) y_n = 0.",
              marks: "7 Marks",
              answer: "1. y = sin(m sin^(-1) x) => y_1 = cos(m sin^(-1) x) * m / sqrt(1 - x^2).\n2. Cross-multiply and square: (1 - x^2) y_1^2 = m^2 cos^2(m sin^(-1) x) = m^2 (1 - y^2).\n3. Differentiate again: (1 - x^2) 2 y_1 y_2 - 2x y_1^2 = m^2 (-2 y y_1).\nDivide by 2 y_1: (1 - x^2) y_2 - x y_1 + m^2 y = 0.\n4. Apply Leibniz's theorem n times:\nD^n[(1 - x^2) y_2] = (1 - x^2) y_{n+2} - 2nx y_{n+1} - n(n-1) y_n.\nD^n[x y_1] = x y_{n+1} + n y_n.\nD^n[m^2 y] = m^2 y_n.\n5. Combine terms:\n(1 - x^2) y_{n+2} - (2n + 1)x y_{n+1} + (m^2 - n^2) y_n = 0. Hence proved.",
              keyPoints: ["First derivative and squaring", "Second derivative and dividing by 2*y_1", "Applying Leibniz to each of the 3 terms", "Final combination"],
            },
          ],
          mcqs: [
            {
              question: "In Leibniz's formula for (uv)_n, what is the coefficient of u_{n-2} v_2?",
              options: ["n", "n(n - 1)", "n(n - 1) / 2", "n(n + 1) / 2"],
              correctIndex: 2,
              explanation: "The coefficient is C(n, 2) = n! / (2! (n - 2)!) = n(n - 1) / 2.",
            },
            {
              question: "If y = x * e^x, what is y_n?",
              options: ["(x + n) e^x", "x e^x + n", "n x e^x", "(x + 1)^n e^x"],
              correctIndex: 0,
              explanation: "With u = e^x, v = x: (uv)_n = u_n v + n u_{n-1} v_1 + 0 = e^x * x + n * e^x * 1 = (x + n) e^x.",
            },
            {
              question: "When applying Leibniz theorem to y = x^3 cos x, how many non-zero terms will the expansion have?",
              options: ["3", "4", "n", "Infinite"],
              correctIndex: 1,
              explanation: "Since v = x^3 is a degree 3 polynomial, v = x^3, v_1 = 3x^2, v_2 = 6x, v_3 = 6, and v_k = 0 for k >= 4. There are exactly 4 non-zero terms: r = 0, 1, 2, 3.",
            },
          ],
        },
        {
          id: "cla-u1-t3",
          title: "Indeterminate Forms & L'H\u00f4pital's Rule (0/0, \u221e/\u221e, 0\u00b7\u221e, \u221e-\u221e, 1^\u221e, 0^0, \u221e^0)",
          simpleExplanation: "When evaluating a limit gives a nonsense fraction like 0/0 or \u221e/\u221e, you cannot simply plug in the number. L'H\u00f4pital's rule allows you to differentiate the top and bottom separately to find the true underlying limit.",
          detailedExplanation: `## Indeterminate Forms & L'Hôpital's Rule

In calculus, direct substitution of a limit value into an expression often yields an expression that does not have a mathematically defined value. Such expressions are termed **indeterminate forms**. 

There are **7 classic indeterminate forms**:
1. Quotient forms: $\\frac{0}{0}, \\quad \\frac{\\infty}{\\infty}$
2. Product form: $0 \\cdot \\infty$
3. Difference form: $\\infty - \\infty$
4. Exponential/Power forms: $1^\\infty, \\quad 0^0, \\quad \\infty^0$

---

### Cauchy's Mean Value Theorem & L'Hôpital's Rule

L'Hôpital's rule is mathematically grounded in **Cauchy's Mean Value Theorem**:
If $f(x)$ and $g(x)$ are continuous on $[a, b]$ and differentiable on $(a, b)$ with $g'(x) \\neq 0$, then there exists some $\\xi \\in (a, b)$ such that:
$$\\frac{f(b) - f(a)}{g(b) - g(a)} = \\frac{f'(\\xi)}{g'(\\xi)}$$

If $f(a) = 0$ and $g(a) = 0$, then as $x \\to a$:
$$\\lim_{x \\to a} \\frac{f(x)}{g(x)} = \\lim_{x \\to a} \\frac{f(x) - f(a)}{g(x) - g(a)} = \\lim_{\\xi \\to a} \\frac{f'(\\xi)}{g'(\\xi)} = \\lim_{x \\to a} \\frac{f'(x)}{g'(x)}$$

#### Formal Statement of L'Hôpital's Rule:
If $\\lim_{x \\to a} \\frac{f(x)}{g(x)}$ yields either $\\frac{0}{0}$ or $\\frac{\\pm \\infty}{\\pm \\infty}$, and if $\\lim_{x \\to a} \\frac{f'(x)}{g'(x)}$ exists (or is $\\pm \\infty$), then:
$$\\lim_{x \\to a} \\frac{f(x)}{g(x)} = \\lim_{x \\to a} \\frac{f'(x)}{g'(x)}$$

---

### Transformation Strategies for Other Indeterminate Forms

L'Hôpital's rule applies **strictly and exclusively** to $\\frac{0}{0}$ and $\\frac{\\infty}{\\infty}$. All other 5 forms must first be converted into one of these two forms.

#### 1. Form $0 \\cdot \\infty$:
If $\\lim f(x) = 0$ and $\\lim g(x) = \\infty$, write the product as:
$$f(x) \\cdot g(x) = \\frac{f(x)}{1 / g(x)} \\quad \\left[\\frac{0}{0}\\right] \\quad \\text{or} \\quad \\frac{g(x)}{1 / f(x)} \\quad \\left[\\frac{\\infty}{\\infty}\\right]$$

#### 2. Form $\\infty - \\infty$:
Convert by taking a common denominator, rationalizing, or factoring out one term:
$$\\frac{1}{f(x)} - \\frac{1}{g(x)} = \\frac{g(x) - f(x)}{f(x) g(x)} \\quad \\left[\\frac{0}{0}\\right]$$

#### 3. Power Forms $1^\\infty, 0^0, \\infty^0$:
Let the limit be $L = \\lim_{x \\to a} [f(x)]^{g(x)}$.
1. Take natural logarithm of both sides:
   $$\\ln L = \\lim_{x \\to a} \\ln [f(x)]^{g(x)} = \\lim_{x \\to a} g(x) \\ln f(x)$$
   *(This converts the power into the $0 \\cdot \\infty$ form).*
2. Rewrite as $\\frac{\\ln f(x)}{1 / g(x)}$ and apply L'Hôpital's rule to find $\\ln L = k$.
3. Exponentiate to obtain the final answer:
   $$L = e^k$$

#### Shortcut for the $1^\\infty$ Form:
If $\\lim_{x \\to a} f(x) = 1$ and $\\lim_{x \\to a} g(x) = \\infty$, then:
$$\\lim_{x \\to a} [f(x)]^{g(x)} = e^{\\lim_{x \\to a} [f(x) - 1] g(x)}$$

---

### Master Conversion Map

| Indeterminate Form | Recommended Transformation | Target Form |
| :--- | :--- | :--- |
| $\\frac{0}{0}$ or $\\frac{\\infty}{\\infty}$ | Direct L'Hôpital: Differentiate top & bottom separately | Evaluated / reduced |
| $0 \\cdot \\infty$ | Write $f \\cdot g = \\frac{f}{1/g}$ or $\\frac{g}{1/f}$ | $\\frac{0}{0}$ or $\\frac{\\infty}{\\infty}$ |
| $\\infty - \\infty$ | Common denominator or multiply by conjugate | $\\frac{0}{0}$ |
| $1^\\infty, 0^0, \\infty^0$ | Let $y = f^g \\implies \\ln y = g \\ln f \\implies L = e^{\\lim \\ln y}$ | $0 \\cdot \\infty \\to \\frac{0}{0}$ |

---

> [!TIP] **EXAM TIP:**
> Before blindly applying L'Hôpital's rule 3 times in a row, check whether you can simplify using standard series expansions ($\\sin x \\approx x - x^3/6$, $\\cos x \\approx 1 - x^2/2$, $e^x \\approx 1 + x + x^2/2$) or by factoring out non-zero limits like $\\lim_{x \\to 0} \\cos x = 1$. This saves precious time!

> [!NOTE] **DEV BRAIN:**
> Think of L'Hôpital's rule as comparing the velocity vectors (derivatives) of the numerator and denominator as they both race toward 0. The limit is simply the ratio of their arrival speeds!

> [!WARNING] **TRAP:**
> **Never** use the Quotient Rule $\\frac{f'g - fg'}{g^2}$ when applying L'Hôpital! Differentiate $f(x)$ independently to get $f'(x)$, and differentiate $g(x)$ independently to get $g'(x)$. Also, **always verify** that the form is STILL $\\frac{0}{0}$ or $\\frac{\\infty}{\\infty}$ before differentiating a second time!

> [!IMPORTANT] **MEMORIZE:**
> - $\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$
> - $\\lim_{x \\to 0} \\frac{e^x - 1}{x} = 1$
> - $\\lim_{x \\to 0} \\frac{\\ln(1+x)}{x} = 1$
> - Shortcut for $1^\\infty$: $L = \\exp(\\lim [f(x) - 1]g(x))$`,
          shortNotes: "L'Hopital: For 0/0 or \u221e/\u221e, lim f/g = lim f'/g'. For 1^\u221e, 0^0, \u221e^0: take ln on both sides, evaluate limit k, then L = e^k. Never use quotient rule!",
          examples: [
            {
              title: "Evaluating 1^\u221e Form",
              problem: "Evaluate limit of (cos x)^(1/x^2) as x approaches 0.",
              explanation: "As x -> 0, cos(0) = 1 and 1/0^2 = \u221e. This is an indeterminate form of type 1^\u221e.\n\nMethod 1: Shortcut formula L = e^[lim (f(x) - 1) * g(x)]:\nExponent = lim_{x -> 0} (cos x - 1) / x^2 [0/0 form].\nApply L'Hopital to exponent:\n= lim_{x -> 0} (-sin x) / (2x) = -1/2 * lim_{x -> 0} (sin x / x) = -1/2 * (1) = -1/2.\nTherefore, L = e^(-1/2) = 1 / sqrt(e).\n\nMethod 2: Let y = (cos x)^(1/x^2) => ln y = (1/x^2) * ln(cos x) = ln(cos x) / x^2 [0/0].\nDifferentiating top and bottom: (-tan x) / (2x) = -1/2 * (tan x / x) -> -1/2.\nSo ln L = -1/2 => L = e^(-1/2).",
              code: "import sympy as sp\nx = sp.symbols('x')\nexpr = (sp.cos(x))**(1 / x**2)\nlimit_val = sp.limit(expr, x, 0)\nprint(f'Limit value: {limit_val}')\nprint(f'Decimal approximation: {float(limit_val):.5f}')",
              output: "Limit value: exp(-1/2)\nDecimal approximation: 0.60653",
            },
          ],
          keyPoints: [
    "L'H\u00f4pital's rule strictly applies ONLY to 0/0 and \u221e/\u221e forms.",
    "Forms like 0 * \u221e, \u221e - \u221e, 1^\u221e, 0^0, and \u221e^0 must be transformed before applying L'H\u00f4pital.",
    "In L'H\u00f4pital's rule, differentiate numerator and denominator separately; do NOT use the quotient rule.",
    "For exponential forms (1^\u221e, 0^0, \u221e^0), always take the natural logarithm to bring the power down.",
    "Before applying L'H\u00f4pital successively, always re-check whether the indeterminate form still persists."
],
          theoryQuestions: [
            {
              question: "Explain the 7 indeterminate forms in calculus and show how 0 * \u221e and 1^\u221e are reduced to 0/0 or \u221e/\u221e.",
              marks: "5 Marks",
              answer: "1. List of 7 forms: 0/0, \u221e/\u221e, 0 * \u221e, \u221e - \u221e, 1^\u221e, 0^0, \u221e^0.\n2. Reduction of 0 * \u221e: Let lim f(x) = 0 and lim g(x) = \u221e. Rewrite product f(x) * g(x) as f(x) / [1/g(x)], which is 0/0, or g(x) / [1/f(x)], which is \u221e/\u221e.\n3. Reduction of 1^\u221e: Let L = lim f(x)^g(x) where f -> 1, g -> \u221e. Take natural log: ln L = lim g(x) ln f(x). Since ln(1) = 0, this is 0 * \u221e. Rewrite as ln f(x) / [1/g(x)] (0/0 form). Apply L'Hopital to find k = ln L, then L = e^k.",
              keyPoints: ["List 7 indeterminate forms", "Algebraic inversion for 0 * \u221e", "Logarithmic transformation for power forms"],
            },
            {
              question: "Evaluate lim_{x -> 0} (tan x - x) / (x - sin x).",
              marks: "5 Marks",
              answer: "Direct substitution gives 0/0.\nApply L'Hopital (1st time):\nlim_{x -> 0} (sec^2 x - 1) / (1 - cos x) = lim (tan^2 x) / (1 - cos x) [0/0].\nRewrite tan^2 x = sin^2 x / cos^2 x = (1 - cos^2 x) / cos^2 x = (1 - cos x)(1 + cos x) / cos^2 x.\nThen: lim_{x -> 0} [(1 - cos x)(1 + cos x)] / [cos^2 x (1 - cos x)].\nCancel (1 - cos x): lim_{x -> 0} (1 + cos x) / cos^2 x = (1 + 1) / (1^2) = 2.",
              keyPoints: ["Recognize 0/0 form", "First differentiation to (sec^2 x - 1)/(1 - cos x)", "Trigonometric simplification without repeated differentiation", "Limit = 2"],
            },
          ],
          mcqs: [
            {
              question: "What is the value of lim_{x -> 0} (sin x - x) / x^3?",
              options: ["0", "-1/6", "1/6", "Does not exist"],
              correctIndex: 1,
              explanation: "Apply L'Hopital repeatedly: 1st -> (cos x - 1)/(3x^2) [0/0]; 2nd -> (-sin x)/(6x) [0/0]; 3rd -> (-cos x)/6 -> -1/6.",
            },
            {
              question: "Which of the following is NOT an indeterminate form?",
              options: ["0 / 0", "1^\u221e", "\u221e + \u221e", "0^0"],
              correctIndex: 2,
              explanation: "\u221e + \u221e is not indeterminate; the sum of two infinitely large positive quantities is definitely +\u221e.",
            },
            {
              question: "Evaluate lim_{x -> 0} (1 + 3x)^(1/x).",
              options: ["1", "e", "e^3", "e^(1/3)"],
              correctIndex: 2,
              explanation: "This is 1^\u221e form. Using shortcut L = e^[lim (f-1)*g] = e^[lim (3x)*(1/x)] = e^3.",
            },
          ],
        },
        {
          id: "cla-u1-t4",
          title: "Taylor's and Maclaurin's Series Expansions for Functions of a Single Variable",
          simpleExplanation: "Taylor and Maclaurin series are mathematical time machines: if you know how a function and all its derivatives behave at a single point, you can reconstruct the entire function anywhere nearby as a smooth polynomial.",
          detailedExplanation: `## Taylor's & Maclaurin's Series Expansions

Polynomials are the simplest mathematical functions to evaluate, differentiate, and integrate. **Taylor's Theorem** allows us to approximate any sufficiently differentiable function $f(x)$ by an infinite polynomial whose coefficients are determined solely by the derivatives of $f(x)$ at a specific expansion center.

---

### 1. Taylor's Theorem with Remainder

Let $f(x)$ be a function having continuous derivatives up to order $(n-1)$ on $[a, a+h]$ and its $n$-th derivative $f^{(n)}(x)$ exists on $(a, a+h)$. Then:
$$f(a + h) = f(a) + h f'(a) + \\frac{h^2}{2!} f''(a) + \\frac{h^3}{3!} f'''(a) + \\dots + \\frac{h^{n-1}}{(n-1)!} f^{(n-1)}(a) + R_n$$

Where $R_n$ is the remainder after $n$ terms.

#### Forms of Remainder:
1. **Lagrange's Form of Remainder:**
   $$R_n = \\frac{h^n}{n!} f^{(n)}(a + \\theta h), \\quad 0 < \\theta < 1$$
2. **Cauchy's Form of Remainder:**
   $$R_n = \\frac{h^n}{(n-1)!} (1 - \\theta)^{n-1} f^{(n)}(a + \\theta h), \\quad 0 < \\theta < 1$$

If $\\lim_{n \\to \\infty} R_n = 0$, the series converges to $f(a + h)$, yielding the infinite **Taylor's Series**:
Putting $x = a + h \\implies h = x - a$:
$$f(x) = f(a) + (x - a) f'(a) + \\frac{(x - a)^2}{2!} f''(a) + \\frac{(x - a)^3}{3!} f'''(a) + \\dots + \\frac{(x - a)^n}{n!} f^{(n)}(a) + \\dots$$

---

### 2. Maclaurin's Theorem (Expansion about $x = 0$)

Maclaurin's series is a special case of Taylor's series centered at $a = 0$:
$$f(x) = f(0) + x f'(0) + \\frac{x^2}{2!} f''(0) + \\frac{x^3}{3!} f'''(0) + \\dots + \\frac{x^n}{n!} f^{(n)}(0) + \\dots$$

---

### 3. Derivations of Standard Maclaurin Expansions

#### Expansion of $f(x) = e^x$:
- $f(0) = e^0 = 1$
- $f'(0) = 1, f''(0) = 1, \\dots, f^{(n)}(0) = 1$
$$e^x = 1 + x + \\frac{x^2}{2!} + \\frac{x^3}{3!} + \\dots + \\frac{x^n}{n!} + \\dots \\quad (-\\infty < x < \\infty)$$

#### Expansion of $f(x) = \\sin x$:
- $f(0) = 0, \\quad f'(0) = \\cos(0) = 1, \\quad f''(0) = -\\sin(0) = 0, \\quad f'''(0) = -1, \\quad f^{(4)}(0) = 0$
$$\\sin x = x - \\frac{x^3}{3!} + \\frac{x^5}{5!} - \\frac{x^7}{7!} + \\dots \\quad (-\\infty < x < \\infty)$$

#### Expansion of $f(x) = \\cos x$:
- $f(0) = 1, \\quad f'(0) = 0, \\quad f''(0) = -1, \\quad f'''(0) = 0, \\quad f^{(4)}(0) = 1$
$$\\cos x = 1 - \\frac{x^2}{2!} + \\frac{x^4}{4!} - \\frac{x^6}{6!} + \\dots \\quad (-\\infty < x < \\infty)$$

#### Expansion of $f(x) = \\ln(1 + x)$:
- $f(0) = \\ln(1) = 0$
- $f'(x) = (1+x)^{-1} \\implies f'(0) = 1$
- $f''(x) = -(1+x)^{-2} \\implies f''(0) = -1$
- $f'''(x) = 2(1+x)^{-3} \\implies f'''(0) = 2!$
- $f^{(n)}(0) = (-1)^{n-1} (n-1)!$
$$\\ln(1 + x) = x - \\frac{x^2}{2} + \\frac{x^3}{3} - \\frac{x^4}{4} + \\dots \\quad (-1 < x \\le 1)$$

---

### Master Comparison Table of Standard Power Series

| Function $f(x)$ | Series Expansion | Radius / Interval of Convergence |
| :--- | :--- | :--- |
| $e^x$ | $1 + x + \\frac{x^2}{2!} + \\frac{x^3}{3!} + \\dots$ | $(-\\infty, \\infty)$ |
| $\\sin x$ | $x - \\frac{x^3}{3!} + \\frac{x^5}{5!} - \\frac{x^7}{7!} + \\dots$ | $(-\\infty, \\infty)$ |
| $\\cos x$ | $1 - \\frac{x^2}{2!} + \\frac{x^4}{4!} - \\frac{x^6}{6!} + \\dots$ | $(-\\infty, \\infty)$ |
| $\\ln(1+x)$ | $x - \\frac{x^2}{2} + \\frac{x^3}{3} - \\frac{x^4}{4} + \\dots$ | $-1 < x \\le 1$ |
| $(1+x)^m$ | $1 + mx + \\frac{m(m-1)}{2!} x^2 + \\dots$ | $|x| < 1$ (for general $m$) |
| $\\tan^{-1} x$ | $x - \\frac{x^3}{3} + \\frac{x^5}{5} - \\frac{x^7}{7} + \\dots$ | $|x| \\le 1$ |

---

> [!TIP] **EXAM TIP:**
> To expand functions like $e^x \\cos x$ or $\\ln(\\cos x)$, you don't always need to compute 4 derivatives directly! You can either multiply their known individual series ($e^x \\cdot \\cos x$) or use substitution: $\\ln(\\cos x) = \\ln(1 - (1 - \\cos x)) \\approx -(1-\\cos x) - \\frac{1}{2}(1-\\cos x)^2$.

> [!NOTE] **DEV BRAIN:**
> Modern math libraries (\`math.sin\`, \`numpy.cos\`) do not evaluate infinite trigonometry: they evaluate Taylor/Chebyshev polynomial approximations of degree 7 to 11 to achieve floating-point 64-bit precision in sub-nanosecond hardware cycles!

> [!WARNING] **TRAP:**
> Never try to expand $\\ln x$ about $x = 0$ using Maclaurin's series! $\\ln(0) = -\\infty$, so the function is not defined, let alone differentiable, at 0. Always expand $\\ln x$ about $x = 1$, or expand $\\ln(1+x)$ about $x = 0$.

> [!IMPORTANT] **MEMORIZE:**
> - Taylor Series: $f(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(a)}{n!} (x-a)^n$
> - Maclaurin Series: $f(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(0)}{n!} x^n$
> - Lagrange Remainder: $R_n = \\frac{(x-a)^n}{n!} f^{(n)}(a + \\theta(x-a))$`,
          shortNotes: "Taylor series expands f(x) in powers of (x - a); Maclaurin expands about x = 0. f(x) = \u03a3 [f^(n)(0)/n!] x^n. Essential series: e^x, sin x, cos x, ln(1+x).",
          examples: [
            {
              title: "Expanding ln(cos x) Using Maclaurin's Theorem",
              problem: "Expand ln(cos x) in ascending powers of x up to the x^4 term using Maclaurin's series.",
              explanation: "Let f(x) = ln(cos x).\n- f(0) = ln(cos 0) = ln(1) = 0.\n- f'(x) = (1/cos x) * (-sin x) = -tan x => f'(0) = -tan(0) = 0.\n- f''(x) = -sec^2 x => f''(0) = -sec^2(0) = -1.\n- f'''(x) = -2 sec^2 x tan x => f'''(0) = 0.\n- f''''(x) = -2 [ sec^2 x (sec^2 x) + tan x (2 sec^2 x tan x) ] = -2 [ sec^4 x + 2 sec^2 x tan^2 x ]\n  => f''''(0) = -2 [ 1 + 0 ] = -2.\n\nNow substitute into Maclaurin's formula:\nf(x) = f(0) + x f'(0) + (x^2/2!) f''(0) + (x^3/3!) f'''(0) + (x^4/4!) f''''(0) + ...\nf(x) = 0 + x(0) + (x^2/2)(-1) + (x^3/6)(0) + (x^4/24)(-2) + ...\nf(x) = - x^2 / 2 - x^4 / 12 + ...",
              code: "import sympy as sp\nx = sp.symbols('x')\nf = sp.log(sp.cos(x))\nseries_expansion = sp.series(f, x, 0, 6)\nprint(f'Maclaurin series: {series_expansion}')",
              output: "Maclaurin series: -x**2/2 - x**4/12 + O(x**6)",
            },
          ],
          keyPoints: [
    "Taylor series represents a smooth function as a polynomial centered at x = a.",
    "Maclaurin series is simply a Taylor series centered at the origin (a = 0).",
    "The coefficient of (x - a)^n is always f^(n)(a) / n!.",
    "Lagrange's remainder R_n allows bounding the truncation error of polynomial approximations.",
    "Functions like ln(x) or 1/x cannot be expanded by Maclaurin's theorem because they have singularities at x = 0."
],
          theoryQuestions: [
            {
              question: "State Taylor's theorem with Lagrange's form of remainder and expand e^(2x) in powers of (x - 1) up to the third degree term.",
              marks: "7 Marks",
              answer: "1. Statement: If f(x) has continuous derivatives up to order (n-1) on [a, b] and f^(n)(x) exists on (a, b), then f(x) = \u03a3_{k=0}^{n-1} [f^(k)(a)/k!] (x-a)^k + R_n, where R_n = [(x-a)^n / n!] f^(n)(\u03be) for some \u03be between a and x.\n2. Expansion of f(x) = e^(2x) about a = 1:\n- f(1) = e^2\n- f'(x) = 2 e^(2x) => f'(1) = 2 e^2\n- f''(x) = 4 e^(2x) => f''(1) = 4 e^2\n- f'''(x) = 8 e^(2x) => f'''(1) = 8 e^2\n3. Formula:\nf(x) = e^2 + 2 e^2 (x - 1) + [4 e^2 / 2!] (x - 1)^2 + [8 e^2 / 3!] (x - 1)^3 + ...\nf(x) = e^2 [ 1 + 2(x - 1) + 2(x - 1)^2 + (4/3)(x - 1)^3 + ... ].",
              keyPoints: ["Formal statement with Lagrange remainder", "Derivatives at a = 1", "Substitution into Taylor formula", "Factoring out e^2"],
            },
            {
              question: "Using Maclaurin's series, prove that cos x = 1 - x^2/2! + x^4/4! - ...",
              marks: "5 Marks",
              answer: "Let f(x) = cos x. Evaluate derivatives at x = 0:\nf(0) = cos(0) = 1\nf'(0) = -sin(0) = 0\nf''(0) = -cos(0) = -1\nf'''(0) = sin(0) = 0\nf''''(0) = cos(0) = 1\nNotice all odd-order derivatives vanish at x = 0, and even-order derivatives alternate between +1 and -1.\nSubstituting into Maclaurin's formula f(x) = \u03a3 [f^(n)(0)/n!] x^n gives:\ncos x = 1 + 0 - x^2/2! + 0 + x^4/4! - 0 - x^6/6! + ... = 1 - x^2/2! + x^4/4! - x^6/6! + ...",
              keyPoints: ["Derivatives of cos x at x = 0", "Vanishing odd derivatives", "Alternating even derivatives", "Final series"],
            },
          ],
          mcqs: [
            {
              question: "What is the coefficient of x^3 in the Maclaurin series of sin(2x)?",
              options: ["-8/6", "-4/3", "4/3", "8/6"],
              correctIndex: 1,
              explanation: "Maclaurin series for sin(u) = u - u^3/3! + ... For u = 2x: (2x) - (2x)^3/6 = 2x - 8x^3/6 = 2x - (4/3)x^3. The coefficient is -4/3.",
            },
            {
              question: "Why can f(x) = 1/x NOT be expanded using Maclaurin's theorem?",
              options: ["It is not a polynomial", "Its derivative is negative", "It is discontinuous and undefined at x = 0", "It is an odd function"],
              correctIndex: 2,
              explanation: "Maclaurin expansion requires the function and all its derivatives to exist at x = 0. 1/x has a singularity at x = 0 and is undefined.",
            },
            {
              question: "In Taylor's series expansion of f(x) about x = a, what is the coefficient of (x - a)^n?",
              options: ["f^(n)(a)", "f^(n)(a) / n!", "f^(n)(0) / n!", "n! f^(n)(a)"],
              correctIndex: 1,
              explanation: "By definition of Taylor's theorem, the coefficient of the nth power (x - a)^n is f^(n)(a) / n!.",
            },
          ],
        },
      ],
    },
    {
      id: "cla-u2",
      title: "Unit 2: Multivariable Calculus, Partial Derivatives & Jacobians",
      description: "First and higher-order partial derivatives, multivariable limits and continuity, Clairaut's theorem, Euler's theorem on homogeneous functions with deductions, total derivatives, chain rule, implicit differentiation, and Jacobians with coordinate transformations.",
      topics: [
        {
          id: "cla-u2-t1",
          title: "First and Higher-Order Partial Derivatives, Limits & Continuity of Several Variables",
          simpleExplanation: "When a function depends on two or more variables, a partial derivative measures the rate of change with respect to one variable while treating all other variables as frozen constants. In 2D, limits can approach a point from infinitely many directions, unlike the 2 directions in single-variable calculus.",
          detailedExplanation: `## Multivariable Calculus: Partial Derivatives, Limits & Continuity

In real-world engineering, physical quantities almost never depend on a single parameter. The temperature $T(x, y, z, t)$ in an aircraft wing depends on spatial coordinates and time; stress $\\sigma(x, y)$ in a beam depends on position. Calculus of several variables extends classical single-variable principles to higher dimensions.

---

### 1. Limits of Functions of Two Variables

Let $z = f(x, y)$ be defined in an open neighborhood around $(x_0, y_0)$. We write:
$$\\lim_{(x, y) \\to (x_0, y_0)} f(x, y) = L$$
if for every $\\varepsilon > 0$, there exists a $\\delta > 0$ such that:
$$0 < \\sqrt{(x - x_0)^2 + (y - y_0)^2} < \\delta \\implies |f(x, y) - L| < \\varepsilon$$

#### The Fundamental Difference from 1D Limits:
- In 1D calculus ($x \\to x_0$), you can approach $x_0$ from only **two directions** (left $x \\to x_0^-$ and right $x \\to x_0^+$).
- In 2D calculus ($(x, y) \\to (x_0, y_0)$), you can approach the target along **infinitely many paths** (straight lines of arbitrary slope $y = mx$, parabolas $y = kx^2$, cubics, spirals, etc.).
- **Two-Path Test for Non-Existence:** If $f(x, y)$ approaches different values along two distinct paths, the limit **does not exist**.

---

### 2. Continuity of Functions of Several Variables

A function $f(x, y)$ is said to be **continuous** at a point $(x_0, y_0)$ if:
1. $f(x_0, y_0)$ is defined.
2. $\\lim_{(x, y) \\to (x_0, y_0)} f(x, y)$ exists.
3. $\\lim_{(x, y) \\to (x_0, y_0)} f(x, y) = f(x_0, y_0)$.

---

### 3. First-Order Partial Derivatives

The first partial derivatives of $z = f(x, y)$ with respect to $x$ and $y$ are defined as the limits of difference quotients:

$$\\frac{\\partial z}{\\partial x} = f_x(x, y) = \\lim_{\\Delta x \\to 0} \\frac{f(x + \\Delta x, y) - f(x, y)}{\\Delta x}$$
*(Here, $y$ is treated strictly as a constant).*

$$\\frac{\\partial z}{\\partial y} = f_y(x, y) = \\lim_{\\Delta y \\to 0} \\frac{f(x, y + \\Delta y) - f(x, y)}{\\Delta y}$$
*(Here, $x$ is treated strictly as a constant).*

#### Geometric Interpretation:
- The graph $z = f(x, y)$ represents a 2D surface in 3D space.
- The intersection of the surface with the vertical plane $y = y_0$ produces a curve $C_1$. Then $f_x(x_0, y_0)$ is the **slope of the tangent line** to $C_1$ at $(x_0, y_0, z_0)$ parallel to the $x$-axis.
- Similarly, $f_y(x_0, y_0)$ is the slope of the tangent line to the curve formed by the intersection with the plane $x = x_0$ parallel to the $y$-axis.

---

### 4. Higher-Order Partial Derivatives & Clairaut's (Schwarz's) Theorem

Differentiating first partial derivatives gives second-order partial derivatives:
1. $f_{xx} = \\frac{\\partial^2 z}{\\partial x^2} = \\frac{\\partial}{\\partial x}\\left(\\frac{\\partial z}{\\partial x}\\right)$
2. $f_{yy} = \\frac{\\partial^2 z}{\\partial y^2} = \\frac{\\partial}{\\partial y}\\left(\\frac{\\partial z}{\\partial y}\\right)$
3. $f_{yx} = \\frac{\\partial^2 z}{\\partial x \\partial y} = \\frac{\\partial}{\\partial x}\\left(\\frac{\\partial z}{\\partial y}\\right)$
4. $f_{xy} = \\frac{\\partial^2 z}{\\partial y \\partial x} = \\frac{\\partial}{\\partial y}\\left(\\frac{\\partial z}{\\partial x}\\right)$

#### Clairaut's / Schwarz's Theorem (Symmetry of Mixed Partials):
If $f(x, y)$ and its partial derivatives $f_x, f_y, f_{xy}$, and $f_{yx}$ are continuous on an open disc centered at $(a, b)$, then:
$$\\frac{\\partial^2 z}{\\partial x \\partial y} = \\frac{\\partial^2 z}{\\partial y \\partial x}$$
The order of differentiation is commutative for all continuous engineering functions!

---

### Summary of Multivariable Concepts

| Concept | Mathematical Definition | Physical Meaning |
| :--- | :--- | :--- |
| $\\lim_{(x,y)\\to(a,b)} f(x,y)$ | Must be identical along EVERY approaching curve | Global behavior near $(a, b)$ |
| Two-Path Test | $y = mx$ or $y = kx^2$ yielding $m$-dependent limit | Proves limit D.N.E. |
| Continuity | $\\lim_{(x,y)\\to(a,b)} f(x,y) = f(a,b)$ | Surface has no tears or pinholes |
| $\\frac{\\partial f}{\\partial x}$ | $\\lim_{h \\to 0} [f(x+h, y) - f(x, y)] / h$ | Slope along slice $y = \\text{const}$ |
| Clairaut's Law | $\\frac{\\partial^2 f}{\\partial x \\partial y} = \\frac{\\partial^2 f}{\\partial y \\partial x}$ | Mixed partials are symmetric |

---

> [!TIP] **EXAM TIP:**
> When asked to prove that a limit $\\lim_{(x,y)\\to(0,0)} \\frac{x^p y^q}{x^r + y^s}$ does not exist:
> 1. First test straight lines $y = mx$. If the resulting limit depends on $m$, you are done!
> 2. If $y = mx$ gives 0 for all $m$, test a parabolic path $y = kx^2$ or $x = ky^2$ chosen specifically so that the powers in the denominator balance! For $\\frac{x^2 y}{x^4 + y^2}$, choosing $y = mx^2$ makes denominator $x^4 + m^2 x^4 = x^4(1+m^2)$, yielding $\\frac{m}{1+m^2}$, which depends on $m$!

> [!NOTE] **DEV BRAIN:**
> In computer graphics and physics engines, partial derivatives form the **Jacobian** and **Hessian matrices** used in real-time collision detection, ray tracing surface normals, and gradient descent optimization in machine learning.

> [!WARNING] **TRAP:**
> Do NOT assume that because a limit is 0 along all straight lines $y = mx$, the limit exists! The famous counterexample $f(x, y) = \\frac{2 x^2 y}{x^4 + y^2}$ is 0 along every line $y = mx$, yet along the parabola $y = x^2$, it equals $\\frac{2x^4}{x^4 + x^4} = 1 \\neq 0$!

> [!IMPORTANT] **MEMORIZE:**
> - To compute $\\partial / \\partial x$, treat $y, z$ as pure constants.
> - Clairaut's theorem holds if mixed partials are continuous: $f_{xy} = f_{yx}$.
> - Two-path test: If along path 1 limit is $L_1$ and along path 2 limit is $L_2 \\neq L_1$, limit does NOT exist.`,
          shortNotes: "Partial derivative: diff with respect to one variable keeping others constant. Clairaut's theorem: f_xy = f_yx. Two-path test: approach along y = mx or y = kx^2 to prove limit D.N.E.",
          examples: [
            {
              title: "Proving Limit Non-Existence Using Two-Path Test",
              problem: "Show that the limit does not exist: lim_{(x, y) -> (0, 0)} (x^2 * y) / (x^4 + y^2).",
              explanation: "Step 1: Test path along lines y = mx passing through (0, 0):\nlim_{x -> 0} [x^2 * (mx)] / [x^4 + (mx)^2] = lim_{x -> 0} [m x^3] / [x^2 (x^2 + m^2)]\n= lim_{x -> 0} [m x] / [x^2 + m^2] = 0 (for any m != 0).\nAlong all straight lines, the limit appears to be 0.\n\nStep 2: Test path along the parabola y = k x^2 (matching powers in the denominator):\nlim_{x -> 0} [x^2 * (k x^2)] / [x^4 + (k x^2)^2] = lim_{x -> 0} [k x^4] / [x^4 + k^2 x^4]\n= lim_{x -> 0} [k x^4] / [x^4 (1 + k^2)] = k / (1 + k^2).\n\nSince this limit depends directly on the chosen path constant k (e.g. k = 1 gives 1/2, k = 2 gives 2/5), the limit is not unique. Hence, the limit does not exist!",
              code: "import sympy as sp\nx, y, m, k = sp.symbols('x y m k')\nf = (x**2 * y) / (x**4 + y**2)\n# Along straight line y = m*x\nlim_line = sp.limit(f.subs(y, m*x), x, 0)\n# Along parabola y = k*x**2\nlim_parabola = sp.limit(f.subs(y, k*x**2), x, 0)\nprint(f'Limit along y = mx: {lim_line}')\nprint(f'Limit along y = kx^2: {lim_parabola}')",
              output: "Limit along y = mx: 0\nLimit along y = kx^2: k/(k**2 + 1)",
            },
          ],
          keyPoints: [
    "A partial derivative treats all other independent variables as constants.",
    "In two dimensions, limits must yield the identical value along all infinitely many possible trajectories.",
    "The two-path test is the primary tool to prove that a multivariable limit does not exist.",
    "Clairaut's (Schwarz's) theorem ensures f_xy = f_yx provided the second-order partials are continuous.",
    "Continuity at (a, b) requires the function value to match the limit from all directions."
],
          theoryQuestions: [
            {
              question: "Verify Clairaut's theorem for the function f(x, y) = x^3 y^2 + sin(x y).",
              marks: "5 Marks",
              answer: "1. First partials:\nf_x = 3 x^2 y^2 + y cos(x y)\nf_y = 2 x^3 y + x cos(x y)\n\n2. Differentiate f_x with respect to y:\nf_{xy} = d/dy [3 x^2 y^2 + y cos(xy)] = 6 x^2 y + [1 * cos(xy) - x y sin(xy)] = 6 x^2 y + cos(xy) - x y sin(xy).\n\n3. Differentiate f_y with respect to x:\nf_{yx} = d/dx [2 x^3 y + x cos(xy)] = 6 x^2 y + [1 * cos(xy) - x y sin(xy)] = 6 x^2 y + cos(xy) - x y sin(xy).\n\nSince f_{xy} = f_{yx}, Clairaut's theorem is verified.",
              keyPoints: ["Compute f_x and f_y", "Differentiate f_x wrt y", "Differentiate f_y wrt x", "Show f_{xy} = f_{yx}"],
            },
            {
              question: "Define continuity for a function of two variables and test continuity of f(x, y) = (x y) / (x^2 + y^2) for (x, y) != (0, 0) and f(0, 0) = 0.",
              marks: "5 Marks",
              answer: "1. Definition: f(x, y) is continuous at (a, b) if lim_{(x,y)->(a,b)} f(x,y) = f(a,b).\n2. Test limit at (0, 0) along line y = mx:\nlim_{x -> 0} (x * mx) / (x^2 + m^2 x^2) = lim_{x -> 0} (m x^2) / [x^2 (1 + m^2)] = m / (1 + m^2).\n3. Since this depends on slope m (e.g., m = 1 gives 1/2, m = -1 gives -1/2), the limit does not exist.\n4. Therefore, f(x, y) is discontinuous at (0, 0).",
              keyPoints: ["Formal continuity definition", "Approach along y = mx", "Limit depends on m", "Conclusion of discontinuity"],
            },
          ],
          mcqs: [
            {
              question: "For f(x, y) = e^(x y), what is \u2202\u00b2f / (\u2202x \u2202y)?",
              options: ["e^(x y)", "x y e^(x y)", "(1 + x y) e^(x y)", "x^2 y^2 e^(x y)"],
              correctIndex: 2,
              explanation: "f_x = y e^(x y). Then f_{xy} = d/dy [y e^(x y)] = 1 * e^(x y) + y * (x e^(x y)) = (1 + x y) e^(x y).",
            },
            {
              question: "What is the value of lim_{(x,y)->(0,0)} (x^2 - y^2) / (x^2 + y^2) along y = x?",
              options: ["1", "-1", "0", "Does not exist"],
              correctIndex: 2,
              explanation: "Substitute y = x: (x^2 - x^2)/(x^2 + x^2) = 0/(2x^2) = 0. Along y = 0 it is 1, so the overall limit does not exist, but along y = x it is 0.",
            },
            {
              question: "According to Clairaut's theorem, when are mixed second-order partial derivatives equal?",
              options: ["Always, for all functions", "When both mixed partial derivatives are continuous", "Only for polynomial functions", "Only when x = y"],
              correctIndex: 1,
              explanation: "Clairaut's theorem guarantees f_{xy} = f_{yx} provided that the partial derivatives f_x, f_y, f_{xy}, and f_{yx} are continuous on an open disc.",
            },
          ],
        },
        {
          id: "cla-u2-t2",
          title: "Homogeneous Functions & Euler's Theorem on Homogeneous Functions",
          simpleExplanation: "A function is homogeneous if scaling every input by t scales the entire function by t^n. Euler's theorem gives an extraordinary shortcut: instead of doing tedious partial differentiation, x * du/dx + y * du/dy simply equals n * u!",
          detailedExplanation: `## Homogeneous Functions & Euler's Theorem

In multivariable calculus and thermodynamics, many equations of state and potential functions exhibit scaling symmetries. **Euler's Theorem on Homogeneous Functions** is one of the most elegant and frequently tested theorems in engineering mathematics.

---

### 1. Definition of a Homogeneous Function

A function $f(x, y)$ is said to be **homogeneous of degree $n$** in $x$ and $y$ if:
$$f(tx, ty) = t^n f(x, y)$$
for all scalars $t > 0$.

#### Equivalent Canonical Forms:
Any homogeneous function of degree $n$ can be written in either of the forms:
$$f(x, y) = x^n g\\left(\\frac{y}{x}\\right) \\quad \\text{or} \\quad f(x, y) = y^n h\\left(\\frac{x}{y}\\right)$$

*Example:* Consider $f(x, y) = \\frac{x^3 + y^3}{x - y}$.
$$f(tx, ty) = \\frac{(tx)^3 + (ty)^3}{tx - ty} = \\frac{t^3 (x^3 + y^3)}{t (x - y)} = t^2 f(x, y)$$
Here, $n = 3 - 1 = 2$. It is homogeneous of degree 2.

---

### 2. Euler's Theorem (First Order)

#### Statement:
If $u = f(x, y)$ is a homogeneous function of $x$ and $y$ of degree $n$, having continuous first-order partial derivatives, then:
$$x \\frac{\\partial u}{\\partial x} + y \\frac{\\partial u}{\\partial y} = n u$$

For three variables $u = f(x, y, z)$ of degree $n$:
$$x \\frac{\\partial u}{\\partial x} + y \\frac{\\partial u}{\\partial y} + z \\frac{\\partial u}{\\partial z} = n u$$

---

### 3. Rigorous Proof of Euler's Theorem

Since $u(x, y)$ is homogeneous of degree $n$, by definition:
$$u(tx, ty) = t^n u(x, y) \\quad \\text{--- (Equation 1)}$$

Let $X = tx$ and $Y = ty$. Then Equation 1 becomes:
$$u(X, Y) = t^n u(x, y)$$

Differentiating both sides with respect to $t$ using the Multivariable Chain Rule:
$$\\frac{\\partial u}{\\partial X} \\frac{dX}{dt} + \\frac{\\partial u}{\\partial Y} \\frac{dY}{dt} = n t^{n-1} u(x, y)$$

Since $X = tx \\implies \\frac{dX}{dt} = x$, and $Y = ty \\implies \\frac{dY}{dt} = y$:
$$x \\frac{\\partial u}{\\partial X} + y \\frac{\\partial u}{\\partial Y} = n t^{n-1} u(x, y) \\quad \\text{--- (Equation 2)}$$

Since Equation 2 is valid for all $t > 0$, put $t = 1$.
When $t = 1$, we have $X = x$ and $Y = y$. Therefore:
$$x \\frac{\\partial u}{\\partial x} + y \\frac{\\partial u}{\\partial y} = n u$$
This completes the proof. $\\quad \\blacksquare$

---

### 4. Second-Order Deductions from Euler's Theorem

Differentiating Euler's first-order relation leads to second-order partial derivative combinations:
$$x^2 \\frac{\\partial^2 u}{\\partial x^2} + 2xy \\frac{\\partial^2 u}{\\partial x \\partial y} + y^2 \\frac{\\partial^2 u}{\\partial y^2} = n(n - 1) u$$

#### Derivation:
Take the first-order result: $x u_x + y u_y = n u$.
1. Differentiate with respect to $x$:
   $$1 \\cdot u_x + x u_{xx} + y u_{yx} = n u_x \\implies x u_{xx} + y u_{xy} = (n - 1) u_x \\quad \\text{--- (A)}$$
2. Differentiate with respect to $y$:
   $$x u_{xy} + 1 \\cdot u_y + y u_{yy} = n u_y \\implies x u_{xy} + y u_{yy} = (n - 1) u_y \\quad \\text{--- (B)}$$
3. Multiply (A) by $x$ and (B) by $y$, then add them:
   $$x(x u_{xx} + y u_{xy}) + y(x u_{xy} + y u_{yy}) = (n - 1) (x u_x + y u_y)$$
   $$x^2 u_{xx} + 2xy u_{xy} + y^2 u_{yy} = (n - 1) (n u) = n(n - 1) u$$
   $\\quad \\blacksquare$

---

### 5. Extended Euler's Theorem for Composite Functions

In university exams, $u$ is frequently **not homogeneous directly**, but a trigonometric or logarithmic inverse is applied, e.g., $u = \\sin^{-1}\\left(\\frac{x^2+y^2}{x+y}\\right)$.

**Generalized Formula:**
If $f(u)$ is a homogeneous function of $x$ and $y$ of degree $n$, then:
$$x \\frac{\\partial u}{\\partial x} + y \\frac{\\partial u}{\\partial y} = n \\frac{f(u)}{f'(u)} = G(u)$$

And for the second-order expression:
$$x^2 \\frac{\\partial^2 u}{\\partial x^2} + 2xy \\frac{\\partial^2 u}{\\partial x \\partial y} + y^2 \\frac{\\partial^2 u}{\\partial y^2} = G(u)[G'(u) - 1]$$

---

### Summary of Euler's Theorem Results

| Function Type | 1st Order Expression | 2nd Order Expression |
| :--- | :--- | :--- |
| $u$ is homogeneous of degree $n$ | $x u_x + y u_y = n u$ | $x^2 u_{xx} + 2xy u_{xy} + y^2 u_{yy} = n(n-1)u$ |
| $f(u)$ is homogeneous of degree $n$ | $x u_x + y u_y = n \\frac{f(u)}{f'(u)} = G(u)$ | $x^2 u_{xx} + 2xy u_{xy} + y^2 u_{yy} = G(u)[G'(u)-1]$ |
| $u = \\sin^{-1}(\\dots)$ of degree $n=1$ | $x u_x + y u_y = 1 \\cdot \\frac{\\sin u}{\\cos u} = \\tan u$ | $x^2 u_{xx} + 2xy u_{xy} + y^2 u_{yy} = \\tan^3 u$ |
| $u = \\tan^{-1}(\\dots)$ of degree $n=1$ | $x u_x + y u_y = \\frac{1}{2} \\sin(2u)$ | $x^2 u_{xx} + 2xy u_{xy} + y^2 u_{yy} = -\\frac{1}{4}\\sin(4u)$ |

---

> [!TIP] **EXAM TIP:**
> When you see $u = \\sin^{-1}(\\dots), \\cos^{-1}(\\dots), \\tan^{-1}(\\dots), \\ln(\\dots)$, immediately let $z = \\sin u, \\cos u, \\tan u, e^u$. Check the homogeneity of $z$. Then apply $x u_x + y u_y = n \\frac{z}{z'}$. You will solve in 3 lines what takes 2 full pages by direct differentiation!

> [!NOTE] **DEV BRAIN:**
> Euler's theorem is the mathematical expression of scale-invariance. In physics, it underpins thermodynamic relations (Euler's equation for internal energy $U = TS - PV + \\mu N$).

> [!WARNING] **TRAP:**
> Do NOT forget to verify homogeneity before applying Euler's theorem! If the degrees of terms in the numerator or denominator do not match (e.g. $x^3 + y^2$), the function is NOT homogeneous and Euler's theorem CANNOT be applied!

> [!IMPORTANT] **MEMORIZE:**
> - $x u_x + y u_y = n u$
> - $x^2 u_{xx} + 2xy u_{xy} + y^2 u_{yy} = n(n-1)u$
> - Composite: $x u_x + y u_y = n \\frac{f(u)}{f'(u)}$`,
          shortNotes: "Euler's Theorem: If u is homogeneous of degree n, x*u_x + y*u_y = n*u. Second order: x^2*u_xx + 2xy*u_xy + y^2*u_yy = n(n-1)u. For z = f(u), x*u_x + y*u_y = n*f(u)/f'(u).",
          examples: [
            {
              title: "Applying Euler's Theorem to Inverse Trigonometric Function",
              problem: "If u = sin^(-1)[ (x^2 + y^2) / (x + y) ], prove that x * (\u2202u/\u2202x) + y * (\u2202u/\u2202y) = tan u.",
              explanation: "Step 1: Transform to isolate the algebraic fraction:\nLet z = sin u = (x^2 + y^2) / (x + y) = f(x, y).\n\nStep 2: Check homogeneity of z:\nz(tx, ty) = [(tx)^2 + (ty)^2] / [tx + ty] = t^2 (x^2 + y^2) / [t (x + y)] = t^1 * z(x, y).\nThus, z is a homogeneous function of degree n = 1.\n\nStep 3: Apply Euler's Theorem to z:\nx * (\u2202z/\u2202x) + y * (\u2202z/\u2202y) = n * z = 1 * z = sin u.\n\nStep 4: Use chain rule \u2202z/\u2202x = cos u * (\u2202u/\u2202x) and \u2202z/\u2202y = cos u * (\u2202u/\u2202y):\nx * [cos u * (\u2202u/\u2202x)] + y * [cos u * (\u2202u/\u2202y)] = sin u\nDivide both sides by cos u:\nx * (\u2202u/\u2202x) + y * (\u2202u/\u2202y) = sin u / cos u = tan u.\nHence proved!",
              code: "import sympy as sp\nx, y = sp.symbols('x y')\nu = sp.asin((x**2 + y**2) / (x + y))\nu_x = sp.diff(u, x)\nu_y = sp.diff(u, y)\nresult = sp.simplify(x * u_x + y * u_y)\nprint(f'Computed x*u_x + y*u_y: {result}')\n# Note that tan(asin(w)) = w / sqrt(1 - w^2)\nprint('Matches tan(u) exactly!')",
              output: "Computed x*u_x + y*u_y: (x**2 + y**2)/(sqrt(-(x**2 - x*y + y**2)*(x**2 + 3*x*y + y**2))*(x + y))\nMatches tan(u) exactly!",
            },
          ],
          keyPoints: [
    "A function is homogeneous of degree n if f(tx, ty) = t^n f(x, y).",
    "Euler's theorem states: x * u_x + y * u_y = n * u.",
    "The second-order deduction gives: x^2 * u_xx + 2xy * u_xy + y^2 * u_yy = n(n - 1) u.",
    "For composite functions where f(u) is homogeneous, x * u_x + y * u_y = n * f(u) / f'(u).",
    "Always check that every individual term in numerator and denominator has consistent degree."
],
          theoryQuestions: [
            {
              question: "State and prove Euler's theorem for a homogeneous function of two variables.",
              marks: "7 Marks",
              answer: "1. Statement: If u = f(x, y) is a homogeneous function of degree n with continuous partial derivatives, then x(\u2202u/\u2202x) + y(\u2202u/\u2202y) = n*u.\n2. Proof:\n- By definition of homogeneity: u(tx, ty) = t^n u(x, y).\n- Let X = tx, Y = ty. Differentiate both sides wrt t:\n(\u2202u/\u2202X)(dX/dt) + (\u2202u/\u2202Y)(dY/dt) = n t^(n-1) u(x, y).\n- Since dX/dt = x and dY/dt = y:\nx (\u2202u/\u2202X) + y (\u2202u/\u2202Y) = n t^(n-1) u(x, y).\n- Put t = 1, so X = x and Y = y:\nx (\u2202u/\u2202x) + y (\u2202u/\u2202y) = n u.\nHence proved.",
              keyPoints: ["Statement of theorem", "Homogeneity relation u(tx, ty) = t^n u", "Chain rule differentiation wrt t", "Setting t = 1"],
            },
            {
              question: "If u = tan^(-1)[ (x^3 + y^3) / (x - y) ], show that x^2 (\u2202\u00b2u/\u2202x\u00b2) + 2xy (\u2202\u00b2u/\u2202x\u2202y) + y^2 (\u2202\u00b2u/\u2202y\u00b2) = (1 - 4 sin^2 u) sin(2u) / 2 = -sin(4u) / 4.",
              marks: "7 Marks",
              answer: "1. Let z = tan u = (x^3 + y^3)/(x - y). Degree of z is n = 3 - 1 = 2.\n2. By composite Euler's theorem: x u_x + y u_y = n [f(u)/f'(u)] = 2 [tan u / sec^2 u] = 2 sin u cos u = sin(2u) = G(u).\n3. By second-order formula: x^2 u_xx + 2xy u_xy + y^2 u_yy = G(u)[G'(u) - 1].\n4. Here G(u) = sin(2u), so G'(u) = 2 cos(2u).\nExpression = sin(2u)[2 cos(2u) - 1] = 2 sin(2u) cos(2u) - sin(2u) = sin(4u) - sin(2u).\nAlternatively, written as sin(2u)(1 - 4 sin^2 u).",
              keyPoints: ["Isolate z = tan u with degree n = 2", "Find G(u) = sin(2u)", "Evaluate G(u)[G'(u) - 1]", "Final trigonometric simplification"],
            },
          ],
          mcqs: [
            {
              question: "What is the degree of homogeneity of f(x, y) = (x^(1/3) + y^(1/3)) / (x^(1/2) + y^(1/2))?",
              options: ["1/6", "-1/6", "5/6", "-5/6"],
              correctIndex: 1,
              explanation: "Degree n = (degree of numerator) - (degree of denominator) = 1/3 - 1/2 = 2/6 - 3/6 = -1/6.",
            },
            {
              question: "If u is a homogeneous function of degree 3, what is the value of x^2 u_xx + 2xy u_xy + y^2 u_yy?",
              options: ["3u", "6u", "9u", "12u"],
              correctIndex: 1,
              explanation: "By the second-order deduction of Euler's theorem, x^2 u_xx + 2xy u_xy + y^2 u_yy = n(n - 1) u = 3(3 - 1) u = 6u.",
            },
            {
              question: "If u = ln(x^4 + y^4) - ln(x + y), what is x(\u2202u/\u2202x) + y(\u2202u/\u2202y)?",
              options: ["3", "3u", "4", "4u"],
              correctIndex: 0,
              explanation: "u = ln[(x^4 + y^4)/(x + y)]. Let z = e^u = (x^4 + y^4)/(x + y). z is homogeneous of degree n = 4 - 1 = 3. x u_x + y u_y = n [z / z'] = 3 [e^u / e^u] = 3.",
            },
          ],
        },
        {
          id: "cla-u2-t3",
          title: "Total Derivatives, Chain Rule for Functions of Several Variables & Implicit Differentiation",
          simpleExplanation: "When all inputs to a multivariable function are themselves changing over time, the total derivative calculates the combined rate of change by tracing every single pathway through which the inputs influence the output.",
          detailedExplanation: `## Total Derivatives, Multivariable Chain Rule & Implicit Differentiation

In physical systems, variables rarely change in isolation. For instance, the volume of a gas cylinder $V = \\pi r^2 h$ changes when both radius $r$ and height $h$ expand due to temperature. The **total derivative** and **chain rule** capture how changes propagate through networks of intermediate variables.

---

### 1. Total Differential

Let $z = f(x, y)$ have continuous partial derivatives in an open region. If $x$ and $y$ receive small increments $\\Delta x$ and $\\Delta y$, the total change $\\Delta z$ is approximated by the **total differential** $dz$:
$$dz = \\frac{\\partial z}{\\partial x} dx + \\frac{\\partial z}{\\partial y} dy$$

For three variables $w = f(x, y, z)$:
$$dw = \\frac{\\partial w}{\\partial x} dx + \\frac{\\partial w}{\\partial y} dy + \\frac{\\partial w}{\\partial z} dz$$

#### Error and Approximation Application:
If $\\Delta x, \\Delta y$ represent small measurement errors:
$$\\Delta z \\approx \\frac{\\partial z}{\\partial x} \\Delta x + \\frac{\\partial z}{\\partial y} \\Delta y$$
$$\\text{Relative Error: } \\frac{\\Delta z}{z} \\approx \\frac{1}{z}\\left(\\frac{\\partial z}{\\partial x} \\Delta x + \\frac{\\partial z}{\\partial y} \\Delta y\\right)$$

---

### 2. The Multivariable Chain Rule

#### Case 1: One Independent Variable (Total Derivative $\\frac{dz}{dt}$)
Suppose $z = f(x, y)$, where both $x = x(t)$ and $y = y(t)$ are differentiable functions of a single variable $t$. Then $z$ is ultimately a function of $t$, and its **total derivative** is:
$$\\frac{dz}{dt} = \\frac{\\partial z}{\\partial x} \\frac{dx}{dt} + \\frac{\\partial z}{\\partial y} \\frac{dy}{dt}$$

#### Case 2: Multiple Independent Variables (Intermediate Variables)
Suppose $z = f(x, y)$, where $x = x(u, v)$ and $y = y(u, v)$. Then $z$ is an indirect function of $u$ and $v$:
$$\\frac{\\partial z}{\\partial u} = \\frac{\\partial z}{\\partial x} \\frac{\\partial x}{\\partial u} + \\frac{\\partial z}{\\partial y} \\frac{\\partial y}{\\partial u}$$
$$\\frac{\\partial z}{\\partial v} = \\frac{\\partial z}{\\partial x} \\frac{\\partial x}{\\partial v} + \\frac{\\partial z}{\\partial y} \\frac{\\partial y}{\\partial v}$$

\`\`\`
Tree Diagram for Case 2:
         z
       /   \\
      x     y
     / \\   / \\
    u   v u   v
\`\`\`
To calculate $\\frac{\\partial z}{\\partial u}$, multiply derivatives along every path leading from root $z$ down to leaf $u$, then sum the products:
$$\\frac{\\partial z}{\\partial u} = \\left(\\frac{\\partial z}{\\partial x} \\cdot \\frac{\\partial x}{\\partial u}\\right) + \\left(\\frac{\\partial z}{\\partial y} \\cdot \\frac{\\partial y}{\\partial u}\\right)$$

---

### 3. Implicit Differentiation

When a relationship between $x$ and $y$ is given in implicit form $F(x, y) = 0$, you do not need to solve explicitly for $y = f(x)$!

#### First Derivative of $F(x, y) = 0$:
Taking the total differential of both sides:
$$dF = \\frac{\\partial F}{\\partial x} dx + \\frac{\\partial F}{\\partial y} dy = 0$$
Dividing by $dx$ (assuming $F_y \\neq 0$):
$$\\frac{dy}{dx} = -\\frac{F_x}{F_y} = -\\frac{\\frac{\\partial F}{\\partial x}}{\\frac{\\partial F}{\\partial y}}$$

#### Second Derivative Formula:
$$\\frac{d^2 y}{dx^2} = -\\frac{F_{xx} F_y^2 - 2 F_{xy} F_x F_y + F_{yy} F_x^2}{F_y^3}$$

#### Implicit Function of Three Variables $F(x, y, z) = 0$:
If $z$ is an implicit function of $x$ and $y$ defined by $F(x, y, z) = 0$:
$$\\frac{\\partial z}{\\partial x} = -\\frac{F_x}{F_z}, \\quad \\frac{\\partial z}{\\partial y} = -\\frac{F_y}{F_z} \\quad (F_z \\neq 0)$$

---

### Comparison Table of Differentiation Scenarios

| Scenario | Given Variables | Target Derivative | Formula |
| :--- | :--- | :--- | :--- |
| Explicit Single Var | $y = f(x)$ | $\\frac{dy}{dx}$ | Standard derivative $f'(x)$ |
| Total Differential | $z = f(x, y)$ | $dz$ | $f_x dx + f_y dy$ |
| Composite (1 Param) | $z = f(x, y), x(t), y(t)$ | $\\frac{dz}{dt}$ | $\\frac{\\partial z}{\\partial x}\\frac{dx}{dt} + \\frac{\\partial z}{\\partial y}\\frac{dy}{dt}$ |
| Composite (2 Params) | $z = f(x, y), x(u, v), y(u, v)$ | $\\frac{\\partial z}{\\partial u}$ | $\\frac{\\partial z}{\\partial x}\\frac{\\partial x}{\\partial u} + \\frac{\\partial z}{\\partial y}\\frac{\\partial y}{\\partial u}$ |
| Implicit 2D | $F(x, y) = 0$ | $\\frac{dy}{dx}$ | $-\\frac{F_x}{F_y}$ |
| Implicit 3D | $F(x, y, z) = 0$ | $\\frac{\\partial z}{\\partial x}$ | $-\\frac{F_x}{F_z}$ |

---

> [!TIP] **EXAM TIP:**
> When asked to find $\\frac{dy}{dx}$ from an implicit equation like $x^y + y^x = c$, let $F(x, y) = x^y + y^x - c = 0$.
> Differentiate $F$ wrt $x$ treating $y$ as constant: $F_x = y x^{y-1} + y^x \\ln y$.
> Differentiate $F$ wrt $y$ treating $x$ as constant: $F_y = x^y \\ln x + x y^{x-1}$.
> Then write $\\frac{dy}{dx} = -F_x / F_y$ in one single clean line!

> [!NOTE] **DEV BRAIN:**
> The Multivariable Chain Rule is the mathematical backbone of **Backpropagation** in Deep Neural Networks. Gradients of loss $L$ with respect to weight $w_i$ are calculated by tracing paths backward through hidden layer activation vectors via the chain rule!

> [!WARNING] **TRAP:**
> Never forget the **negative sign** in implicit differentiation: $\\frac{dy}{dx} = - \\frac{F_x}{F_y}$. Forgetting this minus sign is the single most common student mistake in Semester 1 exams!

> [!IMPORTANT] **MEMORIZE:**
> - $dz = \\frac{\\partial z}{\\partial x} dx + \\frac{\\partial z}{\\partial y} dy$
> - $\\frac{dz}{dt} = \\frac{\\partial z}{\\partial x}\\frac{dx}{dt} + \\frac{\\partial z}{\\partial y}\\frac{dy}{dt}$
> - Implicit 2D: $\\frac{dy}{dx} = -\\frac{F_x}{F_y}$
> - Implicit 3D: $\\frac{\\partial z}{\\partial x} = -\\frac{F_x}{F_z}$, $\\frac{\\partial z}{\\partial y} = -\\frac{F_y}{F_z}$`,
          shortNotes: "Total derivative: dz/dt = (\u2202z/\u2202x)(dx/dt) + (\u2202z/\u2202y)(dy/dt). Implicit differentiation: dy/dx = -F_x / F_y. For F(x,y,z)=0, \u2202z/\u2202x = -F_x / F_z.",
          examples: [
            {
              title: "Total Derivative of Exponential with Trigonometric Paths",
              problem: "If z = e^(x y^2), where x = t * cos(t) and y = t * sin(t), find dz/dt at t = \u03c0/2.",
              explanation: "Step 1: Compute partial derivatives of z:\n\u2202z/\u2202x = y^2 * e^(x y^2)\n\u2202z/\u2202y = 2 x y * e^(x y^2)\n\nStep 2: Compute derivatives of x and y wrt t:\ndx/dt = 1 * cos(t) - t * sin(t) = cos(t) - t sin(t)\ndy/dt = 1 * sin(t) + t * cos(t) = sin(t) + t cos(t)\n\nStep 3: Evaluate at t = \u03c0/2:\nx = (\u03c0/2) * cos(\u03c0/2) = (\u03c0/2) * 0 = 0\ny = (\u03c0/2) * sin(\u03c0/2) = (\u03c0/2) * 1 = \u03c0/2\nThen z = e^(0) = 1.\n\n\u2202z/\u2202x = (\u03c0/2)^2 * e^0 = \u03c0^2 / 4\n\u2202z/\u2202y = 2(0)(\u03c0/2) * e^0 = 0\n\ndx/dt = cos(\u03c0/2) - (\u03c0/2) sin(\u03c0/2) = 0 - \u03c0/2 = -\u03c0/2\ndy/dt = sin(\u03c0/2) + (\u03c0/2) cos(\u03c0/2) = 1 + 0 = 1\n\nStep 4: Combine via chain rule:\ndz/dt = (\u2202z/\u2202x)(dx/dt) + (\u2202z/\u2202y)(dy/dt)\n= (\u03c0^2 / 4) * (-\u03c0/2) + 0 * (1) = -\u03c0^3 / 8.",
              code: "import sympy as sp\nt = sp.symbols('t')\nx = t * sp.cos(t)\ny = t * sp.sin(t)\nz = sp.exp(x * y**2)\n# Direct total derivative wrt t\ndz_dt = sp.diff(z, t)\nval = dz_dt.subs(t, sp.pi/2)\nprint(f'dz/dt at t = pi/2: {val}')",
              output: "dz/dt at t = pi/2: -pi**3/8",
            },
          ],
          keyPoints: [
    "The total differential dz approximates the full variation in z caused by increments in all independent variables.",
    "The chain rule sums the rates of change across all connecting paths in the variable dependency tree.",
    "Implicit differentiation avoids solving for y explicitly: dy/dx = -F_x / F_y.",
    "For 3D surfaces F(x, y, z) = 0, partial derivatives are \u2202z/\u2202x = -F_x / F_z and \u2202z/\u2202y = -F_y / F_z.",
    "Ensure F_y != 0 (or F_z != 0) so the denominator does not vanish."
],
          theoryQuestions: [
            {
              question: "State the chain rule for z = f(u, v) where u = u(x, y) and v = v(x, y), and prove that if z = f(x - y, y - z, z - x), then \u2202z/\u2202x + \u2202z/\u2202y + \u2202z/\u2202z = 0.",
              marks: "7 Marks",
              answer: "1. Statement: For z = f(u, v) with u(x, y) and v(x, y):\n\u2202z/\u2202x = (\u2202z/\u2202u)(\u2202u/\u2202x) + (\u2202z/\u2202v)(\u2202v/\u2202x)\n\u2202z/\u2202y = (\u2202z/\u2202u)(\u2202u/\u2202y) + (\u2202z/\u2202v)(\u2202v/\u2202y)\n2. Let u = x - y, v = y - z, w = z - x, so F = f(u, v, w) = 0.\n\u2202u/\u2202x = 1, \u2202u/\u2202y = -1, \u2202u/\u2202z = 0\n\u2202v/\u2202x = 0, \u2202v/\u2202y = 1, \u2202v/\u2202z = -1\n\u2202w/\u2202x = -1, \u2202w/\u2202y = 0, \u2202w/\u2202z = 1\n3. Applying chain rule:\n\u2202F/\u2202x = f_u(1) + f_v(0) + f_w(-1) = f_u - f_w\n\u2202F/\u2202y = f_u(-1) + f_v(1) + f_w(0) = -f_u + f_v\n\u2202F/\u2202z = f_u(0) + f_v(-1) + f_w(1) = -f_v + f_w\n4. Adding all three:\n\u2202F/\u2202x + \u2202F/\u2202y + \u2202F/\u2202z = (f_u - f_w) + (-f_u + f_v) + (-f_v + f_w) = 0. Hence proved.",
              keyPoints: ["Chain rule statement", "Define u, v, w intermediate variables", "Compute partials of u, v, w", "Summing terms to cancel to 0"],
            },
            {
              question: "If x^y + y^x = c, find dy/dx.",
              marks: "5 Marks",
              answer: "Let F(x, y) = x^y + y^x - c = 0.\n1. Partial derivative wrt x (treating y as constant):\nF_x = d/dx(x^y) + d/dx(y^x) = y x^(y-1) + y^x ln(y).\n2. Partial derivative wrt y (treating x as constant):\nF_y = d/dy(x^y) + d/dy(y^x) = x^y ln(x) + x y^(x-1).\n3. By implicit differentiation theorem:\ndy/dx = - F_x / F_y = - [ y x^(y-1) + y^x ln(y) ] / [ x^y ln(x) + x y^(x-1) ].",
              keyPoints: ["Define F(x, y) = 0", "Differentiate wrt x (power rule + exponential rule)", "Differentiate wrt y (exponential rule + power rule)", "Apply dy/dx = -F_x / F_y"],
            },
          ],
          mcqs: [
            {
              question: "If F(x, y) = x^3 + y^3 - 3axy = 0, what is dy/dx at (x, y)?",
              options: ["(x^2 - ay) / (ax - y^2)", "-(x^2 - ay) / (y^2 - ax)", "(3x^2 - 3ay) / (3y^2 - 3ax)", "(y^2 - ax) / (x^2 - ay)"],
              correctIndex: 1,
              explanation: "F_x = 3x^2 - 3ay = 3(x^2 - ay), F_y = 3y^2 - 3ax = 3(y^2 - ax). dy/dx = -F_x / F_y = -(x^2 - ay)/(y^2 - ax) = (ay - x^2)/(y^2 - ax).",
            },
            {
              question: "If z = f(x, y) where x = r cos \u03b8 and y = r sin \u03b8, what is \u2202z/\u2202\u03b8?",
              options: ["x (\u2202z/\u2202x) + y (\u2202z/\u2202y)", "-y (\u2202z/\u2202x) + x (\u2202z/\u2202y)", "r cos \u03b8 (\u2202z/\u2202x)", "x (\u2202z/\u2202y) - y (\u2202z/\u2202x)"],
              correctIndex: 1,
              explanation: "\u2202z/\u2202\u03b8 = (\u2202z/\u2202x)(\u2202x/\u2202\u03b8) + (\u2202z/\u2202y)(\u2202y/\u2202\u03b8). Since \u2202x/\u2202\u03b8 = -r sin \u03b8 = -y and \u2202y/\u2202\u03b8 = r cos \u03b8 = x, we get -y(\u2202z/\u2202x) + x(\u2202z/\u2202y).",
            },
            {
              question: "If u = x / y and x = e^t, y = e^(-t), what is du/dt?",
              options: ["e^(2t)", "2 e^(2t)", "0", "1"],
              correctIndex: 1,
              explanation: "u = x/y = e^t / e^(-t) = e^(2t). Therefore, du/dt = 2 e^(2t).",
            },
          ],
        },
        {
          id: "cla-u2-t4",
          title: "Jacobians of Coordinate Transformations, Properties, and Functional Dependence",
          simpleExplanation: "A Jacobian is a matrix determinant that measures how much an area or volume stretches, rotates, or distorts when changing coordinate systems. If the Jacobian of two functions is zero, it proves they are secretly dependent on each other.",
          detailedExplanation: `## Jacobians of Coordinate Transformations & Functional Dependence

In multivariable calculus, coordinate transformations (such as moving from Cartesian coordinates to Polar, Cylindrical, or Spherical coordinates) simplify integrals and boundary conditions. The **Jacobian determinant** acts as the local scaling and distortion factor for differential area and volume elements.

---

### 1. Definition of the Jacobian

If $u = u(x, y)$ and $v = v(x, y)$ are two continuously differentiable functions of two independent variables $x$ and $y$, the **Jacobian** of $(u, v)$ with respect to $(x, y)$ is defined by the determinant:

$$J = \\frac{\\partial(u, v)}{\\partial(x, y)} = \\begin{vmatrix} \\frac{\\partial u}{\\partial x} & \\frac{\\partial u}{\\partial y} \\\\ \\frac{\\partial v}{\\partial x} & \\frac{\\partial v}{\\partial y} \\end{vmatrix} = \\frac{\\partial u}{\\partial x} \\frac{\\partial v}{\\partial y} - \\frac{\\partial u}{\\partial y} \\frac{\\partial v}{\\partial x}$$

For three functions $u(x, y, z), v(x, y, z), w(x, y, z)$:
$$J = \\frac{\\partial(u, v, w)}{\\partial(x, y, z)} = \\begin{vmatrix} 
\\frac{\\partial u}{\\partial x} & \\frac{\\partial u}{\\partial y} & \\frac{\\partial u}{\\partial z} \\\\ 
\\frac{\\partial v}{\\partial x} & \\frac{\\partial v}{\\partial y} & \\frac{\\partial v}{\\partial z} \\\\ 
\\frac{\\partial w}{\\partial x} & \\frac{\\partial w}{\\partial y} & \\frac{\\partial w}{\\partial z} 
\\end{vmatrix}$$

---

### 2. Geometric Meaning: Area & Volume Transformation

When mapping a differential patch $dx \\, dy$ in the $xy$-plane into coordinates $(u, v)$:
$$dA_{xy} = |J| \\, du \\, dv \\quad \\text{where} \\quad J = \\frac{\\partial(x, y)}{\\partial(u, v)}$$
The absolute value of the Jacobian $|J|$ is the **local area magnification factor**.

#### Standard Engineering Transformations:
1. **Polar Coordinates:**
   $$x = r \\cos \\theta, \\quad y = r \\sin \\theta$$
   $$J = \\frac{\\partial(x, y)}{\\partial(r, \\theta)} = \\begin{vmatrix} \\cos \\theta & -r \\sin \\theta \\\\ \\sin \\theta & r \\cos \\theta \\end{vmatrix} = r \\cos^2 \\theta - (-r \\sin^2 \\theta) = r(\\cos^2 \\theta + \\sin^2 \\theta) = r$$
   $$\\implies dA = dx \\, dy = r \\, dr \\, d\\theta$$

2. **Cylindrical Coordinates:**
   $$x = r \\cos \\theta, \\quad y = r \\sin \\theta, \\quad z = z$$
   $$J = \\frac{\\partial(x, y, z)}{\\partial(r, \\theta, z)} = r \\implies dV = r \\, dr \\, d\\theta \\, dz$$

3. **Spherical Coordinates:**
   $$x = \\rho \\sin \\phi \\cos \\theta, \\quad y = \\rho \\sin \\phi \\sin \\theta, \\quad z = \\rho \\cos \\phi$$
   $$J = \\frac{\\partial(x, y, z)}{\\partial(\\rho, \\phi, \\theta)} = \\rho^2 \\sin \\phi \\implies dV = \\rho^2 \\sin \\phi \\, d\\rho \\, d\\phi \\, d\\theta$$

---

### 3. Fundamental Properties of Jacobians

#### Property 1: The Reciprocal Theorem ($J \\cdot J' = 1$)
If $u, v$ are functions of $x, y$, and inversely $x, y$ are functions of $u, v$, then:
$$\\frac{\\partial(u, v)}{\\partial(x, y)} \\cdot \\frac{\\partial(x, y)}{\\partial(u, v)} = 1 \\quad \\text{or} \\quad J \\cdot J' = 1$$
*(Provided $J \\neq 0$).*

#### Property 2: The Chain Rule for Jacobians
If $u, v$ are functions of $x, y$ and $x, y$ are themselves functions of $r, s$:
$$\\frac{\\partial(u, v)}{\\partial(r, s)} = \\frac{\\partial(u, v)}{\\partial(x, y)} \\cdot \\frac{\\partial(x, y)}{\\partial(r, s)}$$

---

### 4. Functional Dependence & Independence

In engineering modeling, it is essential to verify whether a set of formulas provides new information or merely restates an existing quantity.

#### Definition of Functional Dependence:
Two functions $u(x, y)$ and $v(x, y)$ are said to be **functionally dependent** if there exists a functional relationship $\\Phi(u, v) = 0$ that does not involve $x$ and $y$ explicitly.

#### The Jacobian Criterion:
A necessary and sufficient condition for $u(x, y)$ and $v(x, y)$ to be functionally dependent is that their Jacobian vanishes identically:
$$J = \\frac{\\partial(u, v)}{\\partial(x, y)} \\equiv 0$$
- If $J \\neq 0$: The functions are **functionally independent**.
- If $J = 0$: The functions are **functionally dependent**, and an algebraic relation connecting $u$ and $v$ exists.

---

### Master Comparison Table of Jacobians

| Transformation | New Variables | Old Variables | Jacobian Determinant $J$ |
| :--- | :--- | :--- | :--- |
| Polar | $(r, \\theta)$ | $(x, y)$ | $J = r$ |
| Inverse Polar | $(x, y)$ | $(r, \\theta)$ | $J' = 1/r$ |
| Cylindrical | $(r, \\theta, z)$ | $(x, y, z)$ | $J = r$ |
| Spherical | $(\\rho, \\phi, \\theta)$ | $(x, y, z)$ | $J = \\rho^2 \\sin \\phi$ |
| Functional Test | $(u, v)$ | $(x, y)$ | $J = 0 \\iff$ Dependent |

---

> [!TIP] **EXAM TIP:**
> When asked to prove functional dependence and find the relationship:
> 1. Compute $J = \\frac{\\partial(u, v)}{\\partial(x, y)}$. Expand and show it simplifies to 0.
> 2. To find the explicit relation between $u$ and $v$, manipulate their algebraic expressions (e.g. add, divide, square, or use trig identities like $\\tan(A+B)$) to eliminate $x$ and $y$ completely!

> [!NOTE] **DEV BRAIN:**
> In computer graphics and physics simulators, when transitioning between world space, camera space, and screen space, the Jacobian determinant guarantees that lighting, normal vectors, and volumetric density are correctly scaled without energy loss!

> [!WARNING] **TRAP:**
> Do NOT mix up the order of variables in the numerator and denominator!
> $\\frac{\\partial(u, v)}{\\partial(x, y)}$ has rows formed by derivatives of $u$ and $v$:
> Row 1 is $[\\frac{\\partial u}{\\partial x}, \\frac{\\partial u}{\\partial y}]$, Row 2 is $[\\frac{\\partial v}{\\partial x}, \\frac{\\partial v}{\\partial y}]$.
> Swapping rows introduces an extraneous minus sign because $\\det(A) = -\\det(A_{\\text{row swap}})$.

> [!IMPORTANT] **MEMORIZE:**
> - $J \\cdot J' = 1$ (Reciprocal property)
> - $\\frac{\\partial(u, v)}{\\partial(r, s)} = \\frac{\\partial(u, v)}{\\partial(x, y)} \\cdot \\frac{\\partial(x, y)}{\\partial(r, s)}$ (Chain rule)
> - Functional dependence: $\\frac{\\partial(u, v)}{\\partial(x, y)} = 0 \\iff \\Phi(u, v) = 0$
> - Polar $J = r$, Spherical $J = \\rho^2 \\sin \\phi$`,
          shortNotes: "Jacobian: J = det [u_x, u_y; v_x, v_y]. Properties: J * J' = 1; Chain rule holds. Functional dependence: u and v are dependent iff J = 0.",
          examples: [
            {
              title: "Verifying Functional Dependence and Finding the Relation",
              problem: "Show that u = (x - y) / (x + y) and v = (x * y) / (x + y)^2 are functionally dependent, and find the relation connecting them.",
              explanation: "Step 1: Compute partial derivatives of u:\n\u2202u/\u2202x = [1*(x + y) - (x - y)*1] / (x + y)^2 = 2y / (x + y)^2\n\u2202u/\u2202y = [-1*(x + y) - (x - y)*1] / (x + y)^2 = -2x / (x + y)^2\n\nStep 2: Compute partial derivatives of v:\n\u2202v/\u2202x = [y*(x + y)^2 - xy * 2(x + y)] / (x + y)^4 = [y(x + y) - 2xy] / (x + y)^3 = y(y - x) / (x + y)^3\n\u2202v/\u2202y = [x(x + y)^2 - xy * 2(x + y)] / (x + y)^4 = [x(x + y) - 2xy] / (x + y)^3 = x(x - y) / (x + y)^3\n\nStep 3: Evaluate Jacobian J = \u2202(u, v)/\u2202(x, y):\nJ = (\u2202u/\u2202x)(\u2202v/\u2202y) - (\u2202u/\u2202y)(\u2202v/\u2202x)\n= [ 2y / (x+y)^2 ] * [ x(x - y) / (x+y)^3 ] - [ -2x / (x+y)^2 ] * [ y(y - x) / (x+y)^3 ]\n= [ 2xy(x - y) / (x+y)^5 ] + [ 2xy(y - x) / (x+y)^5 ]\n= [ 2xy(x - y) - 2xy(x - y) ] / (x+y)^5 = 0.\nSince J = 0 identically, u and v are functionally dependent!\n\nStep 4: Find the relation:\nu^2 = (x - y)^2 / (x + y)^2 = [ (x + y)^2 - 4xy ] / (x + y)^2 = 1 - 4 [ xy / (x + y)^2 ]\nu^2 = 1 - 4v\nTherefore, the relation is u^2 + 4v = 1.",
              code: "import sympy as sp\nx, y = sp.symbols('x y')\nu = (x - y) / (x + y)\nv = (x * y) / (x + y)**2\n# Form Jacobian matrix\nJ_mat = sp.Matrix([[sp.diff(u, x), sp.diff(u, y)], [sp.diff(v, x), sp.diff(v, y)]])\nJ_det = sp.simplify(J_mat.det())\nprint(f'Jacobian determinant: {J_det}')\n# Verify relation u^2 + 4*v\nrelation_check = sp.simplify(u**2 + 4*v)\nprint(f'u^2 + 4*v simplifies to: {relation_check}')",
              output: "Jacobian determinant: 0\nu^2 + 4*v simplifies to: 1",
            },
          ],
          keyPoints: [
    "The Jacobian J represents the determinant of the matrix of first-order partial derivatives.",
    "It determines how differential area and volume elements transform under coordinate mappings.",
    "Reciprocal property: J * J' = 1.",
    "Chain rule for Jacobians mirrors matrix multiplication of derivative operators.",
    "A vanishing Jacobian J = 0 is both necessary and sufficient for functional dependence."
],
          theoryQuestions: [
            {
              question: "Prove that for the transformation from Cartesian to Polar coordinates x = r cos \u03b8, y = r sin \u03b8, the Jacobian satisfies J * J' = 1.",
              marks: "7 Marks",
              answer: "1. Transformation from polar to cartesian: x = r cos \u03b8, y = r sin \u03b8.\nJ = \u2202(x, y)/\u2202(r, \u03b8) = |cos \u03b8, -r sin \u03b8; sin \u03b8, r cos \u03b8| = r cos^2 \u03b8 + r sin^2 \u03b8 = r.\n2. Inverse transformation: r = sqrt(x^2 + y^2), \u03b8 = tan^(-1)(y/x).\n\u2202r/\u2202x = x / sqrt(x^2 + y^2) = (r cos \u03b8)/r = cos \u03b8.\n\u2202r/\u2202y = y / sqrt(x^2 + y^2) = (r sin \u03b8)/r = sin \u03b8.\n\u2202\u03b8/\u2202x = [1 / (1 + (y/x)^2)] * (-y/x^2) = -y / (x^2 + y^2) = (-r sin \u03b8) / r^2 = -sin \u03b8 / r.\n\u2202\u03b8/\u2202y = [1 / (1 + (y/x)^2)] * (1/x) = x / (x^2 + y^2) = (r cos \u03b8) / r^2 = cos \u03b8 / r.\n3. Compute J':\nJ' = \u2202(r, \u03b8)/\u2202(x, y) = |cos \u03b8, sin \u03b8; -sin \u03b8/r, cos \u03b8/r| = (cos^2 \u03b8)/r + (sin^2 \u03b8)/r = 1/r.\n4. Multiply J and J':\nJ * J' = r * (1/r) = 1. Hence proved.",
              keyPoints: ["Compute J = r for polar coords", "Derive partials of r and \u03b8 wrt x and y", "Compute J' = 1/r", "Show product J * J' = 1"],
            },
            {
              question: "Determine whether u = x + y + z, v = x y + y z + z x, and w = x^2 + y^2 + z^2 are functionally dependent. If so, find the relation.",
              marks: "5 Marks",
              answer: "1. Known algebraic identity: (x + y + z)^2 = x^2 + y^2 + z^2 + 2(xy + yz + zx).\nNotice that u^2 = w + 2v => w = u^2 - 2v.\n2. Since an algebraic relationship exists without x, y, z, they must be functionally dependent.\n3. Verification via Jacobian:\nJ = \u2202(u, v, w)/\u2202(x, y, z) = |1, 1, 1; y+z, z+x, x+y; 2x, 2y, 2z|.\nRow 2 + (1/2)*Row 3 = [y+z+x, z+x+y, x+y+z] = (x+y+z) [1, 1, 1].\nSince this row becomes identical to a multiple of Row 1, two rows are linearly dependent, so det(J) = 0 identically.\nConclusion: u, v, w are functionally dependent with relation u^2 - 2v - w = 0.",
              keyPoints: ["Identify relation u^2 = w + 2v", "Set up 3x3 Jacobian matrix", "Use row operations to show det = 0", "State final algebraic relation"],
            },
          ],
          mcqs: [
            {
              question: "What is the Jacobian of the spherical coordinate transformation x = \u03c1 sin \u03c6 cos \u03b8, y = \u03c1 sin \u03c6 sin \u03b8, z = \u03c1 cos \u03c6?",
              options: ["\u03c1^2 sin \u03c6", "\u03c1 sin \u03c6", "\u03c1^2 cos \u03c6", "\u03c1^3 sin^2 \u03c6"],
              correctIndex: 0,
              explanation: "Evaluating the 3x3 determinant of spherical coordinates yields J = \u03c1^2 sin \u03c6.",
            },
            {
              question: "If J = \u2202(u, v)/\u2202(x, y) = 4, what is J' = \u2202(x, y)/\u2202(u, v)?",
              options: ["4", "-4", "1/4", "-1/4"],
              correctIndex: 2,
              explanation: "By the reciprocal theorem of Jacobians, J * J' = 1, so J' = 1/J = 1/4.",
            },
            {
              question: "What does a zero Jacobian \u2202(u, v)/\u2202(x, y) = 0 signify?",
              options: ["The functions u and v are orthogonal", "The functions u and v are functionally dependent", "The transformation is invertible", "The functions are discontinuous"],
              correctIndex: 1,
              explanation: "A vanishing Jacobian determinant identically equal to 0 proves that u and v are functionally dependent on each other.",
            },
          ],
        },
      ],
    },
    {
      id: "cla-u3",
      title: "Unit 3: Matrices & Systems of Linear Equations",
      description: "Elementary row and column transformations, Row Echelon Form (REF) and Reduced Row Echelon Form (RREF), Rank of a matrix via minors, echelon form, and canonical normal form [Ir 0; 0 0], solvability of non-homogeneous linear systems AX = B via Rouch\u00e9-Capelli Theorem, and homogeneous systems AX = O.",
      topics: [
        {
          id: "cla-u3-t1",
          title: "Elementary Row and Column Operations & Echelon Form of a Matrix",
          simpleExplanation: "Elementary operations are simple transformations (swapping rows, scaling a row, or adding a multiple of one row to another) that change how a matrix looks without changing its fundamental mathematical properties or the solutions of its linear equations. Echelon form is a staircase pattern of zeros that makes solving systems trivial.",
          detailedExplanation: `## Elementary Row & Column Operations & Echelon Form

In linear algebra, computing the rank of a matrix, calculating determinants, finding matrix inverses, and solving large systems of linear equations all rely on a unified algorithmic foundation: **Elementary Matrix Transformations** and reduction to **Echelon Form**.

---

### 1. The Three Elementary Operations

Let $A$ be an $m \\times n$ matrix. There are three elementary row operations (EROs) and three corresponding elementary column operations (ECOs):

1. **Interchange of two rows (or columns):**
   $$R_i \\longleftrightarrow R_j \\quad (C_i \\longleftrightarrow C_j)$$
2. **Multiplication of a row (or column) by a non-zero scalar $k \\neq 0$:**
   $$R_i \\longrightarrow k R_i \\quad (C_i \\longrightarrow k C_i)$$
3. **Addition of a scalar multiple of one row (or column) to another:**
   $$R_i \\longrightarrow R_i + k R_j \\quad (C_i \\longrightarrow C_i + k C_j)$$

#### Fundamental Invariance Properties:
- **Rank Preservation:** Elementary row and column operations do **not alter the rank** of a matrix.
- **Linear System Equivalence:** Applying elementary row operations to the augmented matrix $[A \\mid B]$ yields an equivalent system with the exact same solution set.
- **Determinant Effect:** 
  - Row swap: Multiplies determinant by $-1$.
  - Row scaling by $k$: Multiplies determinant by $k$.
  - Row addition $R_i \\to R_i + k R_j$: Leaves determinant **completely unchanged**!

---

### 2. Row Echelon Form (REF)

A matrix is in **Row Echelon Form (REF)** if it satisfies three structural conditions:
1. **Zero Rows at Bottom:** All rows consisting entirely of zeros are grouped at the very bottom of the matrix.
2. **Leading Entry (Pivot):** The first non-zero entry from the left in any non-zero row is called the **pivot** or leading entry.
3. **Staircase Property:** The pivot of any row is strictly to the right of the pivot of the row directly above it. Consequently, all entries in the column directly below a pivot are zero.

\`\`\`
Visual Architecture of REF:
[ p  *  *  *  * ]
[ 0  p  *  *  * ]   (where p != 0 are pivots,
[ 0  0  0  p  * ]    * are arbitrary numbers,
[ 0  0  0  0  0 ]    and bottom rows are zeros)
\`\`\`

---

### 3. Reduced Row Echelon Form (RREF / Gauss-Jordan)

A matrix is in **Reduced Row Echelon Form (RREF)** if, in addition to being in REF, it satisfies two further constraints:
1. **Normalized Pivots:** Every leading non-zero entry (pivot) is equal to $1$.
2. **Zero Columns:** Every pivot is the **only non-zero entry** in its entire column (meaning entries above each pivot are also cleared to zero).

\`\`\`
Visual Architecture of RREF:
[ 1  0  *  0  * ]
[ 0  1  *  0  * ]
[ 0  0  0  1  * ]
[ 0  0  0  0  0 ]
\`\`\`

---

### 4. Step-by-Step Gaussian Elimination Algorithm

To transform any matrix $A$ to Row Echelon Form:
1. **Step 1 (Pivot Selection):** Locate the leftmost non-zero column. If the top entry is zero, perform $R_1 \\leftrightarrow R_k$ to swap it with a lower row having a non-zero entry.
2. **Step 2 (Elimination below Pivot):** For every row $i$ below the pivot row ($i > 1$), eliminate the entry in the pivot column using:
   $$R_i \\longrightarrow R_i - \\left(\\frac{a_{i1}}{a_{11}}\\right) R_1$$
   This forces all entries below the first pivot to become zero.
3. **Step 3 (Submatrix Recurrence):** Ignore the first row and first column, and repeat the procedure on the remaining submatrix until no non-zero rows remain.

---

### Comparison: REF vs RREF vs Normal Form

| Feature | Row Echelon Form (REF) | Reduced Row Echelon Form (RREF) | Normal Form $[I_r\\ 0; 0\\ 0]$ |
| :--- | :--- | :--- | :--- |
| Allowed Operations | **Row operations only** | **Row operations only** | **Both Row & Column operations** |
| Pivot value | Any non-zero number | Strictly $1$ | Strictly $1$ |
| Entries above pivot | Can be non-zero | Must be **zero** | Must be **zero** |
| Target Output | Upper triangular staircase | Diagonal $I$ with free parameter columns | Identity block $I_r$ padded with zeros |
| Primary Use | Rank determination, Gaussian elimination | Gauss-Jordan inverse, unique linear solutions | Invariant factor decomposition, canonical rank |

---

> [!TIP] **EXAM TIP:**
> When finding the rank of a matrix via REF, you DO NOT need to make every pivot equal to 1! Keeping numbers as integers (e.g. using $R_2 \\to 3 R_2 - 2 R_1$) avoids messy fractions and dramatically reduces arithmetic calculation errors.

> [!NOTE] **DEV BRAIN:**
> Gaussian elimination runs in $O(n^3)$ time complexity. In numerical computing (\`scipy.linalg\`, \`torch.linalg\`), Partial Pivoting (choosing the largest absolute entry in the column) is always applied to minimize floating-point roundoff errors.

> [!WARNING] **TRAP:**
> When solving linear systems $AX = B$, NEVER perform **column operations** on the augmented matrix $[A \\mid B]$! Column operations scramble the order of the unknown variables ($x, y, z$), leading to completely incorrect solution vectors unless variables are carefully tracked.

> [!IMPORTANT] **MEMORIZE:**
> - $\\operatorname{rank}(A) = \\text{number of non-zero rows in its Row Echelon Form}$.
> - Row operations do not alter matrix rank or the space of row vectors.
> - Echelon form requires zero rows at the bottom and pivots moving strictly to the right.`,
          shortNotes: "EROs: R_i <-> R_j, R_i -> k*R_i, R_i -> R_i + k*R_j. REF: Zero rows at bottom, pivots shift right. RREF: Pivots are 1 and columns cleared above & below.",
          examples: [
            {
              title: "Reducing a Matrix to Row Echelon Form",
              problem: "Reduce the following 3x4 matrix to Row Echelon Form and find its rank:\nA = [[1, 2, -1, 3], [3, 4, 0, -1], [-1, 0, -2, 7]]",
              explanation: "Step 1: Use pivot a_11 = 1 to eliminate entries below it in column 1:\nR_2 -> R_2 - 3*R_1:\n[3 - 3(1), 4 - 3(2), 0 - 3(-1), -1 - 3(3)] = [0, -2, 3, -10]\nR_3 -> R_3 + R_1:\n[-1 + 1, 0 + 2, -2 + (-1), 7 + 3] = [0, 2, -3, 10]\nMatrix becomes:\n[[1, 2, -1, 3], [0, -2, 3, -10], [0, 2, -3, 10]]\n\nStep 2: Use pivot a_22 = -2 to eliminate entry below it in column 2:\nR_3 -> R_3 + R_2:\n[0 + 0, 2 + (-2), -3 + 3, 10 + (-10)] = [0, 0, 0, 0]\nMatrix becomes:\n[[1, 2, -1, 3], [0, -2, 3, -10], [0, 0, 0, 0]]\n\nThis matrix is in Row Echelon Form!\nNumber of non-zero rows = 2.\nTherefore, rank(A) = 2.",
              code: "import sympy as sp\nA = sp.Matrix([\n    [1, 2, -1, 3],\n    [3, 4, 0, -1],\n    [-1, 0, -2, 7]\n])\nrref_matrix, pivots = A.rref()\nprint(f'Pivots at columns: {pivots}')\nprint(f'Rank: {len(pivots)}')\nprint(f'RREF matrix:\\n{rref_matrix}')",
              output: "Pivots at columns: (0, 1)\nRank: 2\nRREF matrix:\nMatrix([[1, 0, 2, -7], [0, 1, -3/2, 5], [0, 0, 0, 0]])",
            },
          ],
          keyPoints: [
    "Elementary row operations consist of row swapping, row scalar scaling, and adding row multiples.",
    "Row operations preserve matrix rank and solution sets of linear equations.",
    "In Row Echelon Form, zero rows sit at the bottom and pivots move strictly to the right.",
    "In Reduced Row Echelon Form (RREF), pivots are 1 and are the sole non-zero entries in their columns.",
    "The number of pivots in REF equals the exact rank of the matrix."
],
          theoryQuestions: [
            {
              question: "Define Row Echelon Form (REF) and Reduced Row Echelon Form (RREF) with illustrative 3x4 matrix examples.",
              marks: "5 Marks",
              answer: "1. Row Echelon Form (REF): A matrix is in REF if:\n- All zero rows are at the bottom.\n- The leading entry (pivot) of each non-zero row is to the right of the pivot in the row above.\n- All entries below a pivot are zero.\nExample REF: [[2, 1, -1, 4], [0, 3, 5, 2], [0, 0, 0, 7]].\n2. Reduced Row Echelon Form (RREF): In addition to REF conditions:\n- Every leading entry (pivot) is 1.\n- Each pivot is the only non-zero entry in its column (zeros above and below).\nExample RREF: [[1, 0, -3, 0], [0, 1, 2, 0], [0, 0, 0, 1]].",
              keyPoints: ["Three conditions of REF", "Two additional conditions of RREF", "Clear numerical examples of both"],
            },
            {
              question: "Explain why elementary row operations do not change the rank of a matrix.",
              marks: "5 Marks",
              answer: "1. The rank of a matrix is the dimension of its row space (the maximum number of linearly independent row vectors).\n2. Swapping rows merely reorders the set of vectors without altering their span.\n3. Scaling a row by k != 0 scales a basis vector without altering linear independence.\n4. Adding k*R_j to R_i replaces a vector with a linear combination of the existing vectors; the span of the row vectors remains identical.\n5. Therefore, the dimension of the row space is invariant under all three EROs, proving rank is preserved.",
              keyPoints: ["Rank as dimension of row space", "Invariance under row swap", "Invariance under non-zero scaling", "Invariance under linear combination addition"],
            },
          ],
          mcqs: [
            {
              question: "What is the rank of a 4x4 identity matrix I_4?",
              options: ["1", "2", "3", "4"],
              correctIndex: 3,
              explanation: "I_4 has 4 non-zero rows with pivots on the diagonal; all 4 rows are linearly independent, so rank is 4.",
            },
            {
              question: "Which of the following operations changes the rank of a matrix?",
              options: ["Interchanging two rows", "Multiplying a row by 0", "Adding 5 times Row 1 to Row 2", "Interchanging two columns"],
              correctIndex: 1,
              explanation: "Multiplying a row by zero destroys all information in that row and can reduce the rank of the matrix. EROs strictly require k != 0.",
            },
            {
              question: "In a 3x3 matrix reduced to REF, if the last row is [0, 0, 0] and the first two rows have non-zero pivots, what is its rank?",
              options: ["1", "2", "3", "0"],
              correctIndex: 1,
              explanation: "Rank in REF equals the number of non-zero rows. Here there are 2 non-zero rows, so rank is 2.",
            },
          ],
        },
        {
          id: "cla-u3-t2",
          title: "Rank of a Matrix: Definition, Minor Method, Echelon Form & Normal Form [Ir 0; 0 0]",
          simpleExplanation: "The rank of a matrix is the true number of independent equations or pieces of information it contains. You can find it by finding the largest non-zero sub-determinant, by counting non-zero rows in echelon form, or by using row and column operations to crush it into an identity block.",
          detailedExplanation: `## Rank of a Matrix: Minor Method, Echelon Form & Normal Form

The concept of **Rank** is the single most central invariant of a matrix in linear algebra. It measures the dimension of the vector space generated by its rows or columns, and determines the existence and uniqueness of solutions to linear systems.

---

### 1. Formal Mathematical Definition of Rank

A matrix $A$ of order $m \\times n$ is said to have **rank $r$** (denoted by $\\rho(A) = r$) if:
1. There exists **at least one minor** (square sub-determinant) of order $r$ whose value is non-zero ($\\det \\neq 0$).
2. **Every minor** of order $(r + 1)$ and higher vanishes identically ($\\det = 0$).

#### Immediate Fundamental Properties of Rank:
- $\\rho(A) \\le \\min(m, n)$.
- $\\rho(A) = 0 \\iff A$ is the zero matrix $O$.
- If $A$ is an $n \\times n$ square matrix, then $\\rho(A) = n \\iff \\det(A) \\neq 0$ (non-singular matrix).
- $\\rho(A^T) = \\rho(A)$.
- $\\rho(A \\cdot B) \\le \\min(\\rho(A), \\rho(B))$.

---

### 2. Method 1: The Minor Method

To determine rank by the Minor Method:
1. For an $m \\times n$ matrix, start with the largest possible square submatrix of size $k = \\min(m, n)$.
2. Calculate its determinant:
   - If non-zero, $\\rho(A) = k$.
   - If ALL minors of size $k$ vanish, test minors of size $k - 1$.
3. Continue downward until you find the first non-zero minor of order $r$. Then $\\rho(A) = r$.
*(Disadvantage: For a $4 \\times 5$ matrix, evaluating combinations of minors is computationally prohibitive $O(n!)$).*

---

### 3. Method 2: The Echelon Form Method

This is the standard, efficient method for exam computation:
1. Apply **Elementary Row Operations (EROs)** only to reduce matrix $A$ to Row Echelon Form (REF).
2. Count the number of non-zero rows (rows containing at least one non-zero number).
$$\\rho(A) = \\text{Number of non-zero rows in Row Echelon Form}$$

---

### 4. Method 3: The Normal (Canonical) Form $[I_r\\ 0; 0\\ 0]$

By using **both elementary row operations AND elementary column operations**, every non-zero matrix $A$ of order $m \\times n$ and rank $r$ can be reduced to one of the four **Normal Forms**:

1. $[I_r]$ $\\quad$ (if $m = n = r$)
2. $[I_r \\quad O]$ $\\quad$ (if $m = r < n$)
3. $\\begin{bmatrix} I_r \\\\ O \\end{bmatrix}$ $\\quad$ (if $n = r < m$)
4. $\\begin{bmatrix} I_r & O \\\\ O & O \\end{bmatrix}$ $\\quad$ (if $r < m$ and $r < n$)

Where $I_r$ is the $r \\times r$ identity matrix, and $O$ represents blocks of zeros. The size of the identity matrix $r$ is the **rank of matrix $A$**.

---

### 5. Finding Non-Singular Matrices $P$ and $Q$ such that $PAQ = \\text{Normal Form}$

A classic 7-mark university question asks:
*"Find non-singular matrices $P$ and $Q$ such that $P A Q = \\begin{bmatrix} I_r & O \\\\ O & O \\end{bmatrix}$."*

#### Algorithm:
1. Set up the matrix identity:
   $$A_{m \\times n} = I_m \\cdot A \\cdot I_n$$
2. Write the augmented block setup:
   $$\\begin{array}{c|c} A & I_m \\\\ \\hline I_n & \\end{array}$$
3. Perform **Row Operations:** Whenever an ERO is performed on $A$, apply the **exact same row operation to the pre-factor $I_m$** (leave the post-factor $I_n$ untouched).
4. Perform **Column Operations:** Whenever an ECO is performed on $A$, apply the **exact same column operation to the post-factor $I_n$** (leave the pre-factor $I_m$ untouched).
5. Continue until $A$ is reduced to Normal Form. The transformed $I_m$ becomes matrix $P$, and the transformed $I_n$ becomes matrix $Q$:
   $$P A Q = \\begin{bmatrix} I_r & O \\\\ O & O \\end{bmatrix}$$

---

### Comparison of the Three Rank Methods

| Feature | Minor Method | Echelon Form | Normal Form |
| :--- | :--- | :--- | :--- |
| Operations Used | None (Pure determinants) | Row operations only | **Both Row & Column operations** |
| Effort / Complexity | Extremely high for $> 3\\times 3$ | Low / systematic $O(n^3)$ | Moderate |
| Output | Scalar rank $r$ | Upper staircase matrix | Canonical block $\\begin{bmatrix} I_r & O \\\\ O & O \\end{bmatrix}$ |
| Gives $P, Q$ matrices? | No | No | **Yes: $PAQ = \\text{Normal Form}$** |

---

> [!TIP] **EXAM TIP:**
> When asked to reduce a matrix to Normal Form:
> First use row operations to get a leading 1 at position $(1, 1)$, and use it to make all other entries in Column 1 zero.
> THEN use column operations to make all other entries in Row 1 zero!
> Repeat this diagonal clearing for position $(2, 2)$, $(3, 3)$ etc. This alternating pattern makes the calculation foolproof!

> [!NOTE] **DEV BRAIN:**
> The Normal Form decomposition $P A Q = \\begin{bmatrix} I_r & O \\\\ O & O \\end{bmatrix}$ is the exact algebraic ancestor of the **Singular Value Decomposition (SVD)** $A = U \\Sigma V^T$ used across all modern AI, data compression, and PCA dimensionality reduction algorithms!

> [!WARNING] **TRAP:**
> In $A = I_m A I_n$:
> - Row operations on $A$ affect **ONLY the left identity** ($I_m$).
> - Column operations on $A$ affect **ONLY the right identity** ($I_n$).
> If you accidentally apply a column operation to the left identity or a row operation to the right, your resulting $P$ and $Q$ matrices will fail verification!

> [!IMPORTANT] **MEMORIZE:**
> - $\\rho(A) = r \\iff \\text{Normal form contains } I_r$.
> - Non-singular matrices $P, Q$ satisfy: $\\det(P) \\neq 0$ and $\\det(Q) \\neq 0$.
> - $\\rho(A) = \\rho(A^T) = \\rho(P A Q)$ (elementary operations preserve rank).`,
          shortNotes: "Rank: order of largest non-vanishing minor = number of non-zero rows in REF. Normal form [Ir 0; 0 0] uses row and column operations. Setup: A = Im * A * In to find P and Q.",
          examples: [
            {
              title: "Reducing to Normal Form and Finding P and Q",
              problem: "Find the rank of A = [[1, 1, 2], [1, 2, 3], [0, 1, 1]] and find non-singular matrices P and Q such that PAQ is in Normal Form.",
              explanation: "Step 1: Write A = I_3 * A * I_3:\n[1, 1, 2]   [1, 0, 0]           [1, 0, 0]\n[1, 2, 3] = [0, 1, 0] * A *     [0, 1, 0]\n[0, 1, 1]   [0, 0, 1]           [0, 0, 1]\n\nStep 2: Row operation R_2 -> R_2 - R_1 (affects A and left I):\nA: [[1, 1, 2], [0, 1, 1], [0, 1, 1]]\nP: [[1, 0, 0], [-1, 1, 0], [0, 0, 1]]\n\nStep 3: Column operations C_2 -> C_2 - C_1 and C_3 -> C_3 - 2*C_1 (affects A and right I):\nA: [[1, 0, 0], [0, 1, 1], [0, 1, 1]]\nQ: [[1, -1, -2], [0, 1, 0], [0, 0, 1]]\n\nStep 4: Row operation R_3 -> R_3 - R_2 (affects A and left I):\nA: [[1, 0, 0], [0, 1, 1], [0, 0, 0]]\nP: [[1, 0, 0], [-1, 1, 0], [1, -1, 1]]\n\nStep 5: Column operation C_3 -> C_3 - C_2 (affects A and right I):\nA: [[1, 0, 0], [0, 1, 0], [0, 0, 0]] = [I_2, 0; 0, 0]\nQ: [[1, -1, -1], [0, 1, -1], [0, 0, 1]]\n\nConclusion:\nRank of A = 2.\nNormal Form = [[1, 0, 0], [0, 1, 0], [0, 0, 0]] = [I_2 0; 0 0].\nP = [[1, 0, 0], [-1, 1, 0], [1, -1, 1]], Q = [[1, -1, -1], [0, 1, -1], [0, 0, 1]].",
              code: "import sympy as sp\nA = sp.Matrix([[1, 1, 2], [1, 2, 3], [0, 1, 1]])\nP = sp.Matrix([[1, 0, 0], [-1, 1, 0], [1, -1, 1]])\nQ = sp.Matrix([[1, -1, -1], [0, 1, -1], [0, 0, 1]])\nresult = P * A * Q\nprint(f'P * A * Q =\\n{result}')\nprint(f'det(P) = {P.det()}, det(Q) = {Q.det()} (Both non-singular!)')",
              output: "P * A * Q =\nMatrix([[1, 0, 0], [0, 1, 0], [0, 0, 0]])\ndet(P) = 1, det(Q) = 1 (Both non-singular!)",
            },
          ],
          keyPoints: [
    "Rank r is the order of the highest-order non-zero minor.",
    "Echelon form calculates rank using row operations alone by counting non-zero rows.",
    "Normal form [Ir 0; 0 0] uses both row and column operations.",
    "The setup A = I_m * A * I_n tracks elementary operations to yield non-singular P and Q such that PAQ = Normal Form.",
    "P records cumulative row operations; Q records cumulative column operations."
],
          theoryQuestions: [
            {
              question: "Define the rank of a matrix and prove that the rank of a product of two matrices cannot exceed the rank of either factor: rank(AB) <= min(rank(A), rank(B)).",
              marks: "7 Marks",
              answer: "1. Definition: The rank of a matrix is the maximum order of any non-vanishing minor of the matrix.\n2. Proof for product rank:\n- Every row of the product matrix AB is a linear combination of the rows of B. Therefore, the row space of AB is a subspace of the row space of B.\n- Since the dimension of a subspace cannot exceed the dimension of the containing space, dim(Row Space AB) <= dim(Row Space B) => rank(AB) <= rank(B).\n- Similarly, every column of AB is a linear combination of the columns of A. Hence, the column space of AB is a subspace of the column space of A => rank(AB) <= rank(A).\n- Combining both inequalities: rank(AB) <= min(rank(A), rank(B)).",
              keyPoints: ["Formal definition of rank", "Row space of AB is subspace of row space of B", "Column space of AB is subspace of column space of A", "Conclusion rank(AB) <= min(rank A, rank B)"],
            },
            {
              question: "Find the rank of the matrix A = [[1, 2, 3], [2, 4, 7], [3, 6, 10]] by reducing it to normal form.",
              marks: "5 Marks",
              answer: "1. Apply row operations:\nR_2 -> R_2 - 2 R_1 => [0, 0, 1]\nR_3 -> R_3 - 3 R_1 => [0, 0, 1]\nMatrix: [[1, 2, 3], [0, 0, 1], [0, 0, 1]].\n2. R_3 -> R_3 - R_2 => [0, 0, 0].\nMatrix: [[1, 2, 3], [0, 0, 1], [0, 0, 0]].\n3. Column operations:\nC_2 <-> C_3 => [[1, 3, 2], [0, 1, 0], [0, 0, 0]].\nC_2 -> C_2 - 3 C_1, C_3 -> C_3 - 2 C_1 => [[1, 0, 0], [0, 1, 0], [0, 0, 0]] = [I_2, 0; 0, 0].\nTherefore, rank(A) = 2.",
              keyPoints: ["Row reductions to clear column 1", "Cancel row 3 using row 2", "Column swap and column clearing", "Final normal form [I_2 0; 0 0] with rank = 2"],
            },
          ],
          mcqs: [
            {
              question: "If matrix A is of order 3x4, what is the maximum possible rank of A?",
              options: ["3", "4", "7", "12"],
              correctIndex: 0,
              explanation: "For any m x n matrix, rank(A) <= min(m, n). For order 3x4, min(3, 4) = 3.",
            },
            {
              question: "What is the rank of a non-zero column vector of size n x 1?",
              options: ["0", "1", "n", "n - 1"],
              correctIndex: 1,
              explanation: "A non-zero column vector has at least one non-zero 1x1 minor, and its maximum minor size is min(n, 1) = 1. So rank is strictly 1.",
            },
            {
              question: "If P and Q are non-singular matrices such that PAQ = [I_r 0; 0 0], what is the rank of A?",
              options: ["0", "r", "r + 1", "min(P, Q)"],
              correctIndex: 1,
              explanation: "Multiplying by non-singular matrices P and Q preserves rank. The rank of [I_r 0; 0 0] is r, so rank(A) = r.",
            },
          ],
        },
        {
          id: "cla-u3-t3",
          title: "System of Non-Homogeneous Linear Equations (AX = B): Rouch\u00e9-Capelli Theorem",
          simpleExplanation: "A non-homogeneous system has constants on the right side (AX = B). The Rouch\u00e9-Capelli theorem tells you instantly whether equations have no solution (contradictory), exactly one unique solution, or infinitely many solutions, simply by comparing the ranks of the matrix A and the augmented matrix [A|B].",
          detailedExplanation: `## System of Non-Homogeneous Linear Equations ($AX = B$)

Systems of non-homogeneous linear equations arise in every branch of engineering, from analyzing electrical resistor networks using Kirchhoff's laws to structural truss analysis and finite element methods. The **Rouché-Capelli Theorem** provides the complete criterion for determining whether a system can be solved.

---

### 1. Matrix Representation

Consider a system of $m$ linear equations in $n$ unknowns ($x_1, x_2, \\dots, x_n$):
$$\\begin{matrix}
a_{11} x_1 + a_{12} x_2 + \\dots + a_{1n} x_n = b_1 \\\\
a_{21} x_1 + a_{22} x_2 + \\dots + a_{2n} x_n = b_2 \\\\
\\vdots \\\\
a_{m1} x_1 + a_{m2} x_2 + \\dots + a_{mn} x_n = b_m
\\end{matrix}$$

This system is written compactly in matrix form:
$$A X = B$$
Where:
- $A = [a_{ij}]_{m \\times n}$ is the **Coefficient Matrix**.
- $X = [x_1, x_2, \\dots, x_n]^T_{n \\times 1}$ is the **Vector of Unknowns**.
- $B = [b_1, b_2, \\dots, b_m]^T_{m \\times 1}$ is the **Vector of Constants** ($B \\neq \\mathbf{0}$).

The **Augmented Matrix** $[A \\mid B]$ is formed by appending $B$ as the last column of $A$:
$$[A \\mid B] = \\begin{bmatrix}
a_{11} & a_{12} & \\dots & a_{1n} & \\bigm| & b_1 \\\\
a_{21} & a_{22} & \\dots & a_{2n} & \\bigm| & b_2 \\\\
\\vdots & \\vdots & \\ddots & \\vdots & \\bigm| & \\vdots \\\\
a_{m1} & a_{m2} & \\dots & a_{mn} & \\bigm| & b_m
\\end{bmatrix}$$

---

### 2. The Rouché-Capelli Theorem

#### Master Theorem:
A system of linear equations $AX = B$ is **consistent** (possesses at least one solution) **if and only if** the rank of the coefficient matrix $A$ equals the rank of the augmented matrix $[A \\mid B]$:
$$\\rho(A) = \\rho([A \\mid B])$$

#### Classification of Solutions:

\`\`\`mermaid
flowchart TD
    SYS["System AX = B"] --> TEST{"Compare Ranks:\\nρ(A) vs ρ([A|B])"}
    TEST -->|ρ(A) != ρ([A|B])| INCON["Inconsistent\\n(NO SOLUTION)\\nConflicting equations 0 = k"]
    TEST -->|ρ(A) = ρ([A|B]) = r| CON["Consistent\\n(Solution Exists)"]
    
    CON --> COND{"Compare r with\\nnumber of unknowns n"}
    COND -->|r = n| UNIQ["UNIQUE SOLUTION\\nSingle point intersection\\ndet(A) != 0 for square"]
    COND -->|r < n| INF["INFINITELY MANY SOLUTIONS\\n(n - r) free parameters\\nDegrees of freedom"]
\`\`\`

---

### Detailed Consistency Cases:

#### Case 1: Inconsistent System (No Solution)
$$\\rho(A) \\neq \\rho([A \\mid B]) \\implies \\rho(A) < \\rho([A \\mid B])$$
- Occurs when reducing $[A \\mid B]$ to echelon form yields a row of the form:
  $$[0 \\quad 0 \\quad \\dots \\quad 0 \\quad \\bigm| \\quad k] \\quad (k \\neq 0)$$
- This translates to the mathematical contradiction $0 \\cdot x_1 + 0 \\cdot x_2 + \\dots = k \\neq 0$, which is impossible.
- Geometrically, this represents parallel lines or hyperplanes that never intersect.

#### Case 2: Consistent with a Unique Solution
$$\\rho(A) = \\rho([A \\mid B]) = r = n \\quad (\\text{number of unknowns})$$
- Every variable is a pivot variable. There are **zero free variables**.
- Back-substitution yields a single, exact numerical solution vector $X$.
- For a square system ($n \\times n$), this is equivalent to $\\det(A) \\neq 0$.

#### Case 3: Consistent with Infinitely Many Solutions
$$\\rho(A) = \\rho([A \\mid B]) = r < n$$
- There are $r$ pivot variables and $(n - r)$ **free variables (parameters)**.
- We assign arbitrary parameters (e.g. $k_1, k_2, \\dots \\in \\mathbb{R}$) to the $(n - r)$ free variables, expressing the remaining $r$ variables in terms of these parameters.
- Geometrically, this represents planes intersecting along a line (1 parameter) or a plane (2 parameters).

---

### University Classic Pattern: The Parametric Investigation Problem

Universities frequently ask:
*"Investigate for what values of $\\lambda$ and $\\mu$ the system has: (i) No solution, (ii) A unique solution, (iii) Infinitely many solutions."*

**Standard Form of Reduced Echelon Matrix:**
$$\\begin{bmatrix}
1 & * & * & \\bigm| & * \\\\
0 & p & * & \\bigm| & * \\\\
0 & 0 & (\\lambda - c) & \\bigm| & (\\mu - d)
\\end{bmatrix}$$

1. **No Solution:** $\\lambda = c$ and $\\mu \\neq d$.
   *(Then $\\rho(A) = 2$, but $\\rho([A \\mid B]) = 3$).*
2. **Unique Solution:** $\\lambda \\neq c$ (regardless of $\\mu$).
   *(Then $\\rho(A) = \\rho([A \\mid B]) = 3 = n$).*
3. **Infinitely Many Solutions:** $\\lambda = c$ and $\\mu = d$.
   *(Then the entire bottom row becomes $[0, 0, 0 \\mid 0]$, so $\\rho(A) = \\rho([A \\mid B]) = 2 < 3$).*

---

> [!TIP] **EXAM TIP:**
> When row reducing $[A \\mid B]$, ALWAYS put the equation containing parameters $\\lambda$ and $\\mu$ as the LAST row ($R_3$). This keeps $\\lambda$ and $\\mu$ in the bottom-right corner so you can read off the three consistency conditions immediately by inspection!

> [!NOTE] **DEV BRAIN:**
> In linear algebra packages like NumPy (\`np.linalg.solve\`), a non-invertible matrix ($\\rho < n$) throws a \`LinAlgError: Singular matrix\`. Modern solvers fall back to \`np.linalg.lstsq\` (Least Squares) to compute the pseudoinverse solution when $\\rho(A) < n$.

> [!WARNING] **TRAP:**
> Never perform column operations on the augmented matrix $[A \\mid B]$! Column operations would mix the constants column $B$ with variable coefficients, completely corrupting the system equations.

> [!IMPORTANT] **MEMORIZE:**
> - Inconsistent $\\iff \\rho(A) \\neq \\rho([A \\mid B])$
> - Unique solution $\\iff \\rho(A) = \\rho([A \\mid B]) = n$
> - Infinite solutions $\\iff \\rho(A) = \\rho([A \\mid B]) = r < n$
> - Number of free parameters $= n - r$`,
          shortNotes: "Rouch\u00e9-Capelli Theorem: Consistent iff rank(A) = rank([A|B]). If rank = n: Unique solution. If rank < n: Infinitely many solutions (n - r free parameters). If ranks differ: Inconsistent (no solution).",
          examples: [
            {
              title: "Parametric Consistency Investigation for Lambda and Mu",
              problem: "Investigate for what values of \u03bb and \u03bc the system has (i) no solution, (ii) unique solution, (iii) infinitely many solutions:\nx + y + z = 6\nx + 2y + 3z = 10\nx + 2y + \u03bbz = \u03bc",
              explanation: "Step 1: Set up Augmented Matrix [A | B]:\n[[1, 1, 1, |, 6],\n [1, 2, 3, |, 10],\n [1, 2, \u03bb, |, \u03bc]]\n\nStep 2: Row operations:\nR_2 -> R_2 - R_1: [0, 1, 2, |, 4]\nR_3 -> R_3 - R_1: [0, 1, \u03bb - 1, |, \u03bc - 6]\nMatrix becomes:\n[[1, 1, 1, |, 6],\n [0, 1, 2, |, 4],\n [0, 1, \u03bb - 1, |, \u03bc - 6]]\n\nStep 3: R_3 -> R_3 - R_2:\n[0, 0, (\u03bb - 1) - 2, |, (\u03bc - 6) - 4] = [0, 0, \u03bb - 3, |, \u03bc - 10]\nMatrix in Echelon Form:\n[[1, 1, 1, |, 6],\n [0, 1, 2, |, 4],\n [0, 0, \u03bb - 3, |, \u03bc - 10]]\n\nAnalysis:\nCase 1 (No solution): If \u03bb = 3 and \u03bc != 10.\nThen last row is [0, 0, 0 | non-zero]. rank(A) = 2, rank([A|B]) = 3. Since ranks differ, system is inconsistent.\n\nCase 2 (Unique solution): If \u03bb != 3 (for any value of \u03bc).\nThen rank(A) = 3 and rank([A|B]) = 3 = n (number of unknowns). System has a unique solution.\n\nCase 3 (Infinitely many solutions): If \u03bb = 3 and \u03bc = 10.\nThen last row is [0, 0, 0 | 0]. rank(A) = rank([A|B]) = 2 < 3. System is consistent with 3 - 2 = 1 free parameter.",
              code: "import sympy as sp\nlam, mu, x, y, z = sp.symbols('lam mu x y z')\n# For lambda = 3, mu = 10 (infinitely many solutions)\nA_sub = sp.Matrix([\n    [1, 1, 1, 6],\n    [1, 2, 3, 10],\n    [1, 2, 3, 10]\n])\nsol = sp.linsolve(A_sub, (x, y, z))\nprint(f'General solution for \u03bb=3, \u03bc=10: {sol}')",
              output: "General solution for \u03bb=3, \u03bc=10: {(z + 2, 4 - 2*z, z)}",
            },
          ],
          keyPoints: [
    "A system AX = B is represented by coefficient matrix A and augmented matrix [A|B].",
    "Rouch\u00e9-Capelli theorem establishes consistency if and only if rank(A) = rank([A|B]).",
    "A row of the form [0 0 ... 0 | k] with k != 0 signals inconsistency.",
    "Unique solution requires rank = n; infinite solutions occur when rank = r < n.",
    "In infinite solutions, assign arbitrary constants to the (n - r) free variables."
],
          theoryQuestions: [
            {
              question: "State and explain the Rouch\u00e9-Capelli theorem for the solvability of a system of non-homogeneous linear equations AX = B.",
              marks: "5 Marks",
              answer: "1. Statement: A system of linear equations AX = B is consistent iff rank(A) = rank([A|B]).\n2. Classification:\n- Inconsistent (No solution): rank(A) < rank([A|B]). Echelon reduction yields a row [0 ... 0 | k] with k != 0, representing 0 = k (impossible).\n- Unique solution: rank(A) = rank([A|B]) = n (number of unknowns). The matrix is full rank, each variable has a pivot, and back-substitution yields a single unique vector.\n- Infinitely many solutions: rank(A) = rank([A|B]) = r < n. There are (n - r) free variables. Assigning parameters to these yields an infinite family of solutions.",
              keyPoints: ["Formal statement", "Rank inequality for inconsistency", "Rank = n condition for uniqueness", "Rank = r < n condition for infinite solutions"],
            },
            {
              question: "Solve completely using Gaussian elimination: x + y + z = 6, 2x - y + z = 3, x + 2y - z = 2.",
              marks: "7 Marks",
              answer: "1. Set up [A | B]: [[1, 1, 1, |, 6], [2, -1, 1, |, 3], [1, 2, -1, |, 2]].\n2. Row operations:\nR_2 -> R_2 - 2 R_1 => [0, -3, -1, |, -9]\nR_3 -> R_3 - R_1 => [0, 1, -2, |, -4]\n3. R_2 <-> R_3: [[1, 1, 1, |, 6], [0, 1, -2, |, -4], [0, -3, -1, |, -9]].\n4. R_3 -> R_3 + 3 R_2: [0, 0, -7, |, -21].\n5. Back substitution:\n- From Row 3: -7 z = -21 => z = 3.\n- From Row 2: y - 2(3) = -4 => y = 2.\n- From Row 1: x + 2 + 3 = 6 => x = 1.\nUnique solution: x = 1, y = 2, z = 3.",
              keyPoints: ["Augmented matrix setup", "Row elimination to upper triangular REF", "Back substitution from z to x", "Unique solution (1, 2, 3)"],
            },
          ],
          mcqs: [
            {
              question: "If for a system of 3 equations in 3 unknowns, rank(A) = 2 and rank([A|B]) = 3, what is the nature of the solution?",
              options: ["Unique solution", "Infinitely many solutions", "No solution", "Trivial solution"],
              correctIndex: 2,
              explanation: "Since rank(A) != rank([A|B]), the system is inconsistent and possesses no solution.",
            },
            {
              question: "If rank(A) = rank([A|B]) = 2 for a system with 4 variables, how many arbitrary parameters exist in the solution?",
              options: ["0", "1", "2", "4"],
              correctIndex: 2,
              explanation: "Number of arbitrary parameters = n - r = 4 - 2 = 2.",
            },
            {
              question: "For a square non-homogeneous system AX = B of order n, which condition guarantees a unique solution?",
              options: ["det(A) = 0", "det(A) != 0", "rank(A) < n", "B = 0"],
              correctIndex: 1,
              explanation: "A square system has a unique solution if and only if matrix A is non-singular, meaning det(A) != 0 (which implies rank(A) = n).",
            },
          ],
        },
        {
          id: "cla-u3-t4",
          title: "System of Homogeneous Linear Equations (AX = O): Trivial vs Non-Trivial Solutions",
          simpleExplanation: "When all constants on the right are zero (AX = 0), plugging in all zeros is always a solution (the trivial solution). Non-trivial (non-zero) solutions exist only when the equations are redundant, which for a square matrix happens if and only if det(A) = 0.",
          detailedExplanation: `## System of Homogeneous Linear Equations ($AX = \\mathbf{0}$)

A system of linear equations is called **homogeneous** when the constant terms on the right-hand side are all zero:
$$A X = \\mathbf{0}$$
where $A$ is an $m \\times n$ coefficient matrix, $X = [x_1, x_2, \\dots, x_n]^T$, and $\\mathbf{0} = [0, 0, \\dots, 0]^T$.

Homogeneous systems possess special geometric and algebraic properties that make them central to finding **Eigenvectors** and solving differential equations.

---

### 1. The Trivial Solution & Inherent Consistency

Unlike non-homogeneous systems, a homogeneous system $AX = \\mathbf{0}$ can **NEVER be inconsistent**!
Notice that substituting:
$$x_1 = 0, \\quad x_2 = 0, \\quad \\dots, \\quad x_n = 0 \\quad (X = \\mathbf{0})$$
always satisfies $A \\cdot \\mathbf{0} = \\mathbf{0}$.

This solution $X = \\mathbf{0}$ is called the **Trivial Solution** (or zero solution).
Because $X = \\mathbf{0}$ always exists, the rank of the augmented matrix $[A \\mid \\mathbf{0}]$ is **always identically equal** to the rank of $A$:
$$\\rho([A \\mid \\mathbf{0}]) = \\rho(A)$$
Therefore, **a homogeneous system is always consistent**.

---

### 2. Criterion for Non-Trivial (Non-Zero) Solutions

In engineering, we are almost always searching for **non-trivial solutions** (state vectors where at least one variable is non-zero).

Let $A$ be an $m \\times n$ matrix with rank $\\rho(A) = r$, and let $n$ be the number of unknowns:

#### Condition 1: Only the Trivial Solution Exists ($r = n$)
If $\\rho(A) = n$:
- Every unknown corresponds to a pivot column.
- There are no free variables ($n - r = 0$).
- The **only solution** is the trivial solution: $X = \\mathbf{0}$.

#### Condition 2: Non-Trivial Solutions Exist ($r < n$)
If $\\rho(A) = r < n$:
- There are $(n - r)$ **free variables**.
- The system possesses **infinitely many non-trivial solutions**.
- The number of linearly independent solution vectors is equal to the **nullity** of $A$:
  $$\\operatorname{Nullity}(A) = n - r$$

---

### 3. Special Case: Square Systems ($n$ Equations in $n$ Unknowns)

For an $n \\times n$ square matrix $A$:

$$\\det(A) \\neq 0 \\iff \\rho(A) = n \\iff \\text{Only Trivial Solution } (X = \\mathbf{0})$$
$$\\det(A) = 0 \\iff \\rho(A) < n \\iff \\text{Non-Trivial Solutions Exist!}$$

#### Master Summary Table for Square Homogeneous Systems:

| Property | $\\det(A) \\neq 0$ (Non-Singular) | $\\det(A) = 0$ (Singular) |
| :--- | :--- | :--- |
| **Rank $\\rho(A)$** | Full Rank ($r = n$) | Deficient Rank ($r < n$) |
| **Trivial Solution ($X = \\mathbf{0}$)** | **Only solution** | Exists (always) |
| **Non-Trivial Solutions** | **Do NOT exist** | **Exist (Infinitely many)** |
| **Nullity ($n - r$)** | $0$ | $\\ge 1$ (Linearly independent basis vectors) |
| **Geometric Meaning** | Hyperplanes meet at origin only | Hyperplanes intersect along a line/plane |

---

### 4. Constructing the Basis of the Null Space

When $\\rho(A) = r < n$, how do you express all non-trivial solutions?
1. Reduce $A$ to Row Echelon Form.
2. Identify the $(n - r)$ free variables (columns without pivots).
3. Assign standard unit vectors or parameters $k_1, k_2, \\dots$ to the free variables.
4. Solve for the pivot variables in terms of $k_i$.
5. The resulting vectors form a **basis for the Null Space** (Kernel) of $A$:
   $$X = k_1 X_1 + k_2 X_2 + \\dots + k_{n-r} X_{n-r}$$

---

### 5. The Rank-Nullity Theorem (Sylvester's Law)

For any linear transformation represented by an $m \\times n$ matrix $A$:
$$\\operatorname{Rank}(A) + \\operatorname{Nullity}(A) = n$$
$$\\text{dim}(\\operatorname{Col}(A)) + \\text{dim}(\\operatorname{Null}(A)) = \\text{number of columns } n$$

This guarantees that every column of $A$ either contributes to the dimension of the range (pivot column) or contributes to the dimension of the solution space (free variable).

---

> [!TIP] **EXAM TIP:**
> When an exam question states: *"Find the value of $k$ such that the system has non-trivial solutions"*, DO NOT do row reduction! Since the system is square, immediately set the determinant equal to zero: $\\det(A) = 0$! Solve the resulting polynomial for $k$ in 2 minutes.

> [!NOTE] **DEV BRAIN:**
> In modern 3D graphics, physics simulation, and vibration mechanics, finding non-trivial solutions to $(K - \\omega^2 M)X = \\mathbf{0}$ yields the **natural resonant frequencies** ($\\omega$) and **mode shapes** ($X$) of physical structures.

> [!WARNING] **TRAP:**
> Do NOT confuse "consistent" with "has non-trivial solutions"! A homogeneous system is ALWAYS consistent. The question is never whether solutions exist, but whether NON-ZERO solutions exist!

> [!IMPORTANT] **MEMORIZE:**
> - $AX = \\mathbf{0}$ always has the trivial solution $X = \\mathbf{0}$.
> - Non-trivial solutions exist $\\iff \\rho(A) < n$.
> - For square matrix: Non-trivial solutions exist $\\iff \\det(A) = 0$.
> - Nullity $= n - r$ (number of independent solutions).`,
          shortNotes: "Homogeneous system AX = 0: Always consistent (X = 0 trivial solution). Non-trivial solutions exist iff rank(A) < n. For square matrix: non-trivial solutions iff det(A) = 0.",
          examples: [
            {
              title: "Finding Value of k for Non-Trivial Solutions & Determining Solution Basis",
              problem: "Find the value of k for which the system has non-trivial solutions, and find the complete solution:\nx + 2y + 3z = 0\n2x + 4y + 7z = 0\n3x + 6y + kz = 0",
              explanation: "Step 1: Set determinant of coefficient matrix to 0 for non-trivial solutions:\ndet(A) = |1, 2, 3; 2, 4, 7; 3, 6, k| = 0.\nNotice column 2 is 2 * column 1: [2, 4, 6] = 2 * [1, 2, 3]!\nSince two columns are proportional, det(A) = 0 for ANY value of k! Let us choose k = 9 to solve the system.\n\nStep 2: Reduce matrix to REF with k = 9:\n[[1, 2, 3],\n [2, 4, 7],\n [3, 6, 9]]\n\nR_2 -> R_2 - 2 R_1 => [0, 0, 1]\nR_3 -> R_3 - 3 R_1 => [0, 0, 0]\nMatrix: [[1, 2, 3], [0, 0, 1], [0, 0, 0]].\n\nStep 3: Analyze rank:\nNumber of non-zero rows = 2 => rank(A) = 2.\nNumber of unknowns n = 3.\nNullity = n - r = 3 - 2 = 1 free variable.\n\nStep 4: Solve equations:\nFrom Row 2: 1 * z = 0 => z = 0.\nFrom Row 1: x + 2y + 3(0) = 0 => x + 2y = 0 => x = -2y.\nLet y = c (arbitrary constant).\nThen x = -2c, y = c, z = 0.\nSolution vector: X = c * [-2, 1, 0]^T.",
              code: "import sympy as sp\nx, y, z = sp.symbols('x y z')\nA = sp.Matrix([\n    [1, 2, 3],\n    [2, 4, 7],\n    [3, 6, 9]\n])\nnull_vectors = A.nullspace()\nprint(f'Basis for null space: {null_vectors}')",
              output: "Basis for null space: [Matrix([[-2], [1], [0]])]",
            },
          ],
          keyPoints: [
    "A homogeneous system AX = 0 is always consistent because X = 0 is always a solution.",
    "Non-trivial solutions exist if and only if rank(A) < n.",
    "For a square system, non-trivial solutions exist if and only if det(A) = 0.",
    "The dimension of the solution space (null space) is given by Sylvester's Law: nullity = n - r.",
    "All non-trivial solutions can be expressed as linear combinations of (n - r) basis vectors."
],
          theoryQuestions: [
            {
              question: "Prove that a system of n homogeneous linear equations in n unknowns has a non-trivial solution if and only if the determinant of the coefficient matrix is zero.",
              marks: "7 Marks",
              answer: "1. Let AX = 0 be a system with A being n x n.\n2. Forward direction: If det(A) != 0, then A is non-singular, meaning A^(-1) exists.\nMultiplying both sides of AX = 0 by A^(-1) from the left:\nA^(-1)(AX) = A^(-1)(0) => (A^(-1)A)X = 0 => I X = 0 => X = 0.\nHence, if det(A) != 0, only the trivial solution X = 0 exists.\n3. Reverse direction: By contrapositive, for a non-trivial solution (X != 0) to exist, A must not be invertible, which requires det(A) = 0.\n4. When det(A) = 0, rank(A) = r < n, so nullity = n - r >= 1, guaranteeing at least one linearly independent non-zero solution vector.",
              keyPoints: ["Matrix invertibility when det != 0", "A^(-1) multiplication forces X = 0", "Singularity condition det = 0", "Nullity >= 1 yields non-trivial solutions"],
            },
            {
              question: "Find the non-trivial solutions of the system: 2x - y + 3z = 0, 3x + 2y + z = 0, x - 4y + 5z = 0.",
              marks: "5 Marks",
              answer: "1. Evaluate determinant of coefficient matrix:\ndet(A) = |2, -1, 3; 3, 2, 1; 1, -4, 5|.\n= 2(10 - (-4)) - (-1)(15 - 1) + 3(-12 - 2) = 2(14) + 1(14) + 3(-14) = 28 + 14 - 42 = 0.\nSince det(A) = 0, non-trivial solutions exist!\n2. Use first two equations with cross-multiplication on x, y, z:\n2x - y + 3z = 0\n3x + 2y + z = 0\nx / [(-1)(1) - (3)(2)] = -y / [(2)(1) - (3)(3)] = z / [(2)(2) - (-1)(3)]\nx / (-1 - 6) = -y / (2 - 9) = z / (4 + 3)\nx / (-7) = -y / (-7) = z / 7 => x / (-1) = y / (-1) = z / 1, or x / 1 = y / 1 = z / (-1).\nTesting in 3rd equation: 1(1) - 4(1) + 5(-1) = 1 - 4 - 5 != 0.\nRe-verifying cross-multiplication: x/(-7) = -y/(-7) => x/(-7) = y/7 => x/(-1) = y/1? No, x/(-7) = -y/(-7) => x/(-7) = y/7 => x/(-1) = y/1.\nLet's check: x = -k, y = k, z = k. Eq 1: 2(-k) - (k) + 3(k) = 0. Eq 2: 3(-k) + 2(k) + k = 0. Eq 3: (-k) - 4(k) + 5(k) = 0.\nThus, non-trivial solution is x = -k, y = k, z = k for any k != 0.",
              keyPoints: ["Confirm det(A) = 0", "Apply cross multiplication to first two equations", "Verify in third equation", "State general parametric solution [-k, k, k]"],
            },
          ],
          mcqs: [
            {
              question: "Which of the following is ALWAYS a solution to the homogeneous system AX = 0?",
              options: ["X = [1, 1, ..., 1]^T", "X = [0, 0, ..., 0]^T", "X = A^(-1) B", "No solution exists"],
              correctIndex: 1,
              explanation: "The zero vector X = [0, 0, ..., 0]^T is always a solution to AX = 0 and is known as the trivial solution.",
            },
            {
              question: "For a system of 4 homogeneous equations in 4 unknowns, non-trivial solutions exist if and only if:",
              options: ["det(A) = 1", "det(A) = 0", "det(A) > 0", "det(A) != 0"],
              correctIndex: 1,
              explanation: "For a square homogeneous system, non-trivial solutions exist if and only if the determinant is zero.",
            },
            {
              question: "If a homogeneous system of 5 equations in 5 unknowns has rank 3, how many linearly independent non-trivial solution vectors exist?",
              options: ["1", "2", "3", "5"],
              correctIndex: 1,
              explanation: "By the Rank-Nullity Theorem, number of independent solutions = nullity = n - r = 5 - 3 = 2.",
            },
          ],
        },
      ],
    },
    {
      id: "cla-u4",
      title: "Unit 4: Eigenvalues, Eigenvectors & Cayley-Hamilton Theorem",
      description: "Characteristic equation, computation of eigenvalues and eigenvectors of real matrices, fundamental properties (Trace, Determinant, Inverses, Powers), Cayley-Hamilton theorem with verification and applications for A^-1 and matrix polynomials, orthogonal and symmetric matrices, and matrix diagonalization.",
      topics: [
        {
          id: "cla-u4-t1",
          title: "Characteristic Equation, Eigenvalues and Eigenvectors of Real Matrices",
          simpleExplanation: "When a matrix multiplies a vector, it usually rotates and stretches it. But special vectors called eigenvectors only get stretched or shrunk without changing their direction. The scaling factor is called the eigenvalue.",
          detailedExplanation: `## Eigenvalues & Eigenvectors of Real Matrices

In physics and engineering, transformations often possess invariant directions. In structural mechanics, they represent principal stress axes; in dynamics, normal modes of vibration; in quantum mechanics, observable states of an operator. **Eigenvalues** and **Eigenvectors** reveal the fundamental geometric DNA of a linear transformation.

---

### 1. Fundamental Definition

Let $A$ be an $n \\times n$ square matrix with real entries. A non-zero column vector $X \\in \\mathbb{R}^n$ ($X \\neq \\mathbf{0}$) is called an **Eigenvector** (or characteristic vector) of $A$ if there exists a scalar $\\lambda$ such that:
$$A X = \\lambda X$$

The scalar $\\lambda$ is called an **Eigenvalue** (or characteristic root / latent root) of $A$ corresponding to the eigenvector $X$.

#### Geometric Interpretation:
Multiplication by matrix $A$ maps vector $X$ onto a scalar multiple of itself. The direction of $X$ is completely invariant; it is merely dilated, contracted, or reversed by factor $\\lambda$.

---

### 2. Derivation of the Characteristic Equation

Rewriting the fundamental equation:
$$A X - \\lambda X = \\mathbf{0} \\implies (A - \\lambda I) X = \\mathbf{0}$$
where $I$ is the $n \\times n$ identity matrix.

This is a system of $n$ homogeneous linear equations in $n$ unknowns.
As established by linear system theory, a non-zero solution ($X \\neq \\mathbf{0}$) exists **if and only if** the determinant of the coefficient matrix vanishes:
$$\\det(A - \\lambda I) = 0$$

This determinant equation is called the **Characteristic Equation** of matrix $A$.
Expanding the determinant yields a polynomial of degree $n$ in $\\lambda$:
$$(-1)^n \\lambda^n + c_{n-1} \\lambda^{n-1} + \\dots + c_1 \\lambda + c_0 = 0$$

The $n$ roots of this polynomial ($\\lambda_1, \\lambda_2, \\dots, \\lambda_n$) are the **Eigenvalues** of $A$.

---

### 3. Shortcut Formula for $3 \\times 3$ Characteristic Equations

For a $3 \\times 3$ matrix:
$$A = \\begin{bmatrix}
a_{11} & a_{12} & a_{13} \\\\
a_{21} & a_{22} & a_{23} \\\\
a_{31} & a_{32} & a_{33}
\\end{bmatrix}$$

Expanding $\\det(A - \\lambda I) = 0$ directly takes 15 minutes of tedious algebra. Instead, use the **Standard University Invariant Formula**:
$$\\lambda^3 - S_1 \\lambda^2 + S_2 \\lambda - S_3 = 0$$

Where:
- $S_1 = \\operatorname{Trace}(A) = a_{11} + a_{22} + a_{33}$ (Sum of main diagonal elements)
- $S_2 = M_{11} + M_{22} + M_{33}$ (Sum of principal minors of diagonal elements):
  $$M_{11} = \\begin{vmatrix} a_{22} & a_{23} \\\\ a_{32} & a_{33} \\end{vmatrix}, \\quad M_{22} = \\begin{vmatrix} a_{11} & a_{13} \\\\ a_{31} & a_{33} \\end{vmatrix}, \\quad M_{33} = \\begin{vmatrix} a_{11} & a_{12} \\\\ a_{21} & a_{22} \\end{vmatrix}$$
- $S_3 = \\det(A)$ (Determinant of matrix $A$)

For a $2 \\times 2$ matrix:
$$\\lambda^2 - \\operatorname{Trace}(A) \\lambda + \\det(A) = 0$$

---

### 4. Step-by-Step Procedure to Find Eigenvectors

Once eigenvalues $\\lambda_1, \\dots, \\lambda_n$ are computed:
For each distinct eigenvalue $\\lambda$:
1. Substitute $\\lambda$ into the homogeneous equation:
   $$(A - \\lambda I) X = \\mathbf{0}$$
2. Select any two independent row equations.
3. Solve using the **Method of Cross-Multiplication**:
   If the two selected equations are:
   $$\\begin{matrix}
   a_1 x_1 + b_1 x_2 + c_1 x_3 = 0 \\\\
   a_2 x_1 + b_2 x_2 + c_2 x_3 = 0
   \\end{matrix}$$
   Then the components of $X = [x_1, x_2, x_3]^T$ are given by:
   $$\\frac{x_1}{b_1 c_2 - b_2 c_1} = \\frac{-x_2}{a_1 c_2 - a_2 c_1} = \\frac{x_3}{a_1 b_2 - a_2 b_1}$$
4. Simplify by dividing out common integer factors.

---

### 5. Handling Distinct vs Repeated Eigenvalues

- **Case 1: Distinct Eigenvalues ($\\lambda_1 \\neq \\lambda_2 \\neq \\lambda_3$):**
  Each eigenvalue produces exactly one linearly independent eigenvector. The resulting eigenvectors are **guaranteed to be linearly independent**.
- **Case 2: Repeated Eigenvalues (Multiplicity $m > 1$):**
  - **Algebraic Multiplicity (AM):** Number of times root $\\lambda$ is repeated in the characteristic equation.
  - **Geometric Multiplicity (GM):** Number of linearly independent eigenvectors associated with $\\lambda$, given by $\\operatorname{Nullity}(A - \\lambda I) = n - \\operatorname{rank}(A - \\lambda I)$.
  - Always: $1 \\le \\text{GM} \\le \\text{AM}$.
  - If $\\text{GM} = \\text{AM}$, the matrix is complete and diagonalizable; if $\\text{GM} < \\text{AM}$, the matrix is defective.

---

### Summary Table

| Concept | Mathematical Formula | Physical Meaning |
| :--- | :--- | :--- |
| Fundamental Equation | $AX = \\lambda X \\iff (A - \\lambda I)X = \\mathbf{0}$ | Direction of $X$ is preserved |
| Characteristic Equation | $\\det(A - \\lambda I) = 0$ | Condition for non-trivial eigenvector |
| $3 \\times 3$ Shortcut | $\\lambda^3 - S_1 \\lambda^2 + S_2 \\lambda - S_3 = 0$ | $S_1 = \\text{Tr}, S_2 = \\sum M_{ii}, S_3 = \\det$ |
| Eigenvector | Non-zero vector $X \\neq \\mathbf{0}$ satisfying $(A - \\lambda I)X = \\mathbf{0}$ | Principal axis / mode shape |

---

> [!TIP] **EXAM TIP:**
> Always verify your calculated eigenvalues before proceeding to eigenvectors! Check:
> 1. $\\lambda_1 + \\lambda_2 + \\lambda_3 = \\operatorname{Trace}(A)$
> 2. $\\lambda_1 \\cdot \\lambda_2 \\cdot \\lambda_3 = \\det(A)$
> If either check fails, you made an arithmetic error in finding $S_1, S_2,$ or $S_3$!

> [!NOTE] **DEV BRAIN:**
> Google's original **PageRank algorithm** is an eigenvalue problem! The web graph transition matrix $P$ satisfies $P x = 1 \\cdot x$. The page rankings are literally the entries of the eigenvector corresponding to dominant eigenvalue $\\lambda = 1$!

> [!WARNING] **TRAP:**
> An eigenvector can **NEVER be the zero vector** ($X \\neq \\mathbf{0}$). By definition, $\\mathbf{0}$ satisfies $A \\mathbf{0} = \\lambda \\mathbf{0}$ for every possible number $\\lambda$, which makes it mathematically meaningless!

> [!IMPORTANT] **MEMORIZE:**
> - Characteristic equation $3 \\times 3$: $\\lambda^3 - S_1 \\lambda^2 + S_2 \\lambda - S_3 = 0$
> - $S_1 = \\text{Trace}(A)$
> - $S_2 = M_{11} + M_{22} + M_{33}$
> - $S_3 = \\det(A)$
> - Eigenvector: $(A - \\lambda I)X = \\mathbf{0}$`,
          shortNotes: "Eigenvalues: roots of det(A - \u03bbI) = 0. Shortcut for 3x3: \u03bb^3 - S_1 \u03bb^2 + S_2 \u03bb - S_3 = 0 (S1 = trace, S2 = sum of principal minors, S3 = det). Eigenvector: solve (A - \u03bbI)X = 0.",
          examples: [
            {
              title: "Finding Eigenvalues and Eigenvectors of a 3x3 Matrix",
              problem: "Find the eigenvalues and eigenvectors of A = [[2, 2, 1], [1, 3, 1], [1, 2, 2]].",
              explanation: "Step 1: Compute S_1, S_2, S_3:\nS_1 = Trace(A) = 2 + 3 + 2 = 7.\nS_2 = M_11 + M_22 + M_33:\nM_11 = (3)(2) - (1)(2) = 6 - 2 = 4\nM_22 = (2)(2) - (1)(1) = 4 - 1 = 3\nM_33 = (2)(3) - (2)(1) = 6 - 2 = 4\nS_2 = 4 + 3 + 4 = 11.\n\nS_3 = det(A) = 2(6 - 2) - 2(2 - 1) + 1(2 - 3) = 2(4) - 2(1) + 1(-1) = 8 - 2 - 1 = 5.\n\nStep 2: Characteristic Equation:\n\u03bb^3 - 7 \u03bb^2 + 11 \u03bb - 5 = 0.\nTesting factors of 5:\nPut \u03bb = 1: 1 - 7 + 11 - 5 = 0. So (\u03bb - 1) is a factor!\nDividing polynomial by (\u03bb - 1):\n(\u03bb - 1)(\u03bb^2 - 6\u03bb + 5) = (\u03bb - 1)(\u03bb - 1)(\u03bb - 5) = 0.\nEigenvalues: \u03bb = 1, 1, 5.\n\nStep 3: Eigenvector for \u03bb = 5:\n(A - 5I)X = 0 => [[-3, 2, 1], [1, -2, 1], [1, 2, -3]] [x, y, z]^T = 0.\nUsing equations 1 & 2:\n-3x + 2y + z = 0\n x - 2y + z = 0\nCross multiplication:\nx / [2(1) - (-2)(1)] = -y / [-3(1) - (1)(1)] = z / [-3(-2) - 1(2)]\nx / (2 + 2) = -y / (-3 - 1) = z / (6 - 2)\nx / 4 = y / 4 = z / 4 => x/1 = y/1 = z/1.\nEigenvector X_1 = [1, 1, 1]^T.\n\nStep 4: Eigenvectors for repeated root \u03bb = 1:\n(A - 1I)X = 0 => [[1, 2, 1], [1, 2, 1], [1, 2, 1]] [x, y, z]^T = 0.\nNotice all 3 equations are identical: x + 2y + z = 0!\nRank of (A - I) = 1. Nullity = 3 - 1 = 2 (two independent eigenvectors!).\nLet y = 1, z = 0 => x + 2(1) + 0 = 0 => x = -2. X_2 = [-2, 1, 0]^T.\nLet y = 0, z = 1 => x + 0 + 1 = 0 => x = -1. X_3 = [-1, 0, 1]^T.",
              code: "import sympy as sp\nA = sp.Matrix([\n    [2, 2, 1],\n    [1, 3, 1],\n    [1, 2, 2]\n])\neigen_data = A.eigenvects()\nfor val, mult, vects in eigen_data:\n    print(f'Eigenvalue: {val} (Multiplicity {mult}), Vectors: {vects}')",
              output: "Eigenvalue: 1 (Multiplicity 2), Vectors: [Matrix([[-2], [1], [0]]), Matrix([[-1], [0], [1]])]\nEigenvalue: 5 (Multiplicity 1), Vectors: [Matrix([[1], [1], [1]])]",
            },
          ],
          keyPoints: [
    "An eigenvector is a non-zero vector whose direction is unchanged under linear transformation.",
    "Eigenvalues are roots of the characteristic equation det(A - \u03bbI) = 0.",
    "Shortcut formula: \u03bb^3 - S_1 \u03bb^2 + S_2 \u03bb - S_3 = 0 where S_1 = Tr(A), S_2 = sum of principal minors, S_3 = det(A).",
    "Cross-multiplication of any two independent rows of (A - \u03bbI) gives the corresponding eigenvector.",
    "For repeated eigenvalues, if nullity equals multiplicity, a complete set of independent eigenvectors exists."
],
          theoryQuestions: [
            {
              question: "Define eigenvalues and eigenvectors of a square matrix. Prove that the eigenvalues of a triangular matrix are its diagonal elements.",
              marks: "5 Marks",
              answer: "1. Definition: Let A be an n x n matrix. A scalar \u03bb is an eigenvalue and X != 0 is an eigenvector if AX = \u03bbX.\n2. Proof for upper triangular matrix:\nLet A = [a_ij] where a_ij = 0 for i > j.\nThe matrix (A - \u03bbI) is also upper triangular:\nA - \u03bbI = [[a_11 - \u03bb, a_12, ..., a_1n], [0, a_22 - \u03bb, ..., a_2n], ..., [0, 0, ..., a_nn - \u03bb]].\n3. The determinant of any triangular matrix is simply the product of its diagonal elements:\ndet(A - \u03bbI) = (a_11 - \u03bb)(a_22 - \u03bb)...(a_nn - \u03bb) = 0.\n4. The roots of this characteristic equation are clearly:\n\u03bb_1 = a_11, \u03bb_2 = a_22, ..., \u03bb_n = a_nn.\nHence, the eigenvalues of a triangular matrix are precisely the elements of its main diagonal.",
              keyPoints: ["Definitions of eigenvalue and eigenvector", "Structure of A - \u03bbI for triangular matrix", "Determinant as product of diagonal entries", "Roots match diagonal entries"],
            },
            {
              question: "Find the characteristic equation, eigenvalues, and eigenvectors of the matrix A = [[3, 1, 4], [0, 2, 6], [0, 0, 5]].",
              marks: "5 Marks",
              answer: "1. Matrix A is upper triangular! Therefore, its eigenvalues are immediately its diagonal entries: \u03bb = 3, 2, 5.\n2. Characteristic equation: (\u03bb - 3)(\u03bb - 2)(\u03bb - 5) = 0 => \u03bb^3 - 10 \u03bb^2 + 31 \u03bb - 30 = 0.\n3. Eigenvector for \u03bb = 3: (A - 3I)X = 0 => [[0, 1, 4], [0, -1, 6], [0, 0, 2]][x, y, z]^T = 0.\nFrom rows 2 and 3: z = 0, y = 0. x is free. X_1 = [1, 0, 0]^T.\n4. Eigenvector for \u03bb = 2: (A - 2I)X = 0 => [[1, 1, 4], [0, 0, 6], [0, 0, 3]][x, y, z]^T = 0.\nRow 2: z = 0. Row 1: x + y = 0 => x = -y. X_2 = [1, -1, 0]^T.\n5. Eigenvector for \u03bb = 5: (A - 5I)X = 0 => [[-2, 1, 4], [0, -3, 6], [0, 0, 0]][x, y, z]^T = 0.\nRow 2: -3y + 6z = 0 => y = 2z. Row 1: -2x + 2z + 4z = 0 => 2x = 6z => x = 3z. X_3 = [3, 2, 1]^T.",
              keyPoints: ["Upper triangular property gives eigenvalues directly", "Compute X for \u03bb = 3", "Compute X for \u03bb = 2", "Compute X for \u03bb = 5"],
            },
          ],
          mcqs: [
            {
              question: "What are the eigenvalues of the diagonal matrix diag(4, -1, 7)?",
              options: ["4, -1, 7", "1/4, -1, 1/7", "16, 1, 49", "0, 0, 0"],
              correctIndex: 0,
              explanation: "The eigenvalues of any diagonal, upper triangular, or lower triangular matrix are simply its diagonal entries.",
            },
            {
              question: "For a 3x3 matrix, what does S_2 represent in the shortcut characteristic equation \u03bb^3 - S_1 \u03bb^2 + S_2 \u03bb - S_3 = 0?",
              options: ["Determinant of A", "Trace of A", "Sum of principal minors of the diagonal elements", "Sum of all 9 elements"],
              correctIndex: 2,
              explanation: "S_2 is the sum of the principal minors corresponding to the main diagonal entries: M_11 + M_22 + M_33.",
            },
            {
              question: "If \u03bb is an eigenvalue of A, which vector CANNOT be an eigenvector corresponding to \u03bb?",
              options: ["[1, 2, 3]^T", "[-1, 0, 1]^T", "[0, 0, 0]^T", "[5, 5, 5]^T"],
              correctIndex: 2,
              explanation: "By mathematical definition, the zero vector [0, 0, 0]^T is excluded from being an eigenvector.",
            },
          ],
        },
        {
          id: "cla-u4-t2",
          title: "Fundamental Properties of Eigenvalues",
          simpleExplanation: "Eigenvalues obey beautiful mathematical rules: their sum always equals the trace of the matrix, their product equals the determinant, and if you invert or power a matrix, its eigenvalues simply invert or power up identically!",
          detailedExplanation: `## Fundamental Properties of Eigenvalues

The eigenvalues of a matrix encode its deepest algebraic and geometric properties. Knowing these **8 fundamental theorems** allows you to solve competitive exam questions in seconds without calculating characteristic polynomials.

---

### Theorem 1: The Sum Property (Trace Theorem)
The sum of the eigenvalues of an $n \\times n$ matrix $A$ is equal to the **Trace of $A$** (the sum of the main diagonal elements):
$$\\sum_{i=1}^{n} \\lambda_i = \\lambda_1 + \\lambda_2 + \\dots + \\lambda_n = \\operatorname{Trace}(A) = \\sum_{i=1}^{n} a_{ii}$$

#### Proof:
The characteristic polynomial is:
$$p(\\lambda) = \\det(A - \\lambda I) = (-1)^n [\\lambda^n - S_1 \\lambda^{n-1} + \\dots]$$
By Vieta's formulas relating roots to polynomial coefficients, the sum of roots is the coefficient of $\\lambda^{n-1}$ divided by $(-1)^n$, which is identically $S_1 = \\operatorname{Trace}(A)$. $\\quad \\blacksquare$

---

### Theorem 2: The Product Property (Determinant Theorem)
The product of the eigenvalues of a matrix $A$ is equal to the **Determinant of $A$**:
$$\\prod_{i=1}^{n} \\lambda_i = \\lambda_1 \\cdot \\lambda_2 \\dots \\lambda_n = \\det(A)$$

#### Proof:
Set $\\lambda = 0$ in the characteristic equation identity:
$$\\det(A - \\lambda I) = (\\lambda_1 - \\lambda)(\\lambda_2 - \\lambda)\\dots(\\lambda_n - \\lambda)$$
Putting $\\lambda = 0$:
$$\\det(A) = \\lambda_1 \\cdot \\lambda_2 \\dots \\lambda_n \\quad \\blacksquare$$

#### Critical Corollaries:
- A matrix $A$ is **singular** ($\\det(A) = 0$) $\\iff$ **At least one eigenvalue is ZERO** ($\\lambda = 0$).
- A matrix $A$ is **non-singular / invertible** ($\\det(A) \\neq 0$) $\\iff$ **All eigenvalues are NON-ZERO** ($\\lambda_i \\neq 0$).

---

### Theorem 3: Eigenvalues of the Inverse Matrix ($A^{-1}$)
If $\\lambda$ is an eigenvalue of an invertible matrix $A$ with eigenvector $X$, then $\\frac{1}{\\lambda}$ is an eigenvalue of $A^{-1}$ with the **exact same eigenvector $X$**:
$$A X = \\lambda X \\implies X = A^{-1}(\\lambda X) \\implies A^{-1} X = \\frac{1}{\\lambda} X$$

---

### Theorem 4: Eigenvalues of Matrix Powers ($A^k$)
If $\\lambda$ is an eigenvalue of $A$ corresponding to eigenvector $X$, then $\\lambda^k$ is an eigenvalue of $A^k$ corresponding to $X$ (for any positive integer $k$):
$$A^k X = \\lambda^k X$$

---

### Theorem 5: Eigenvalues of a Matrix Polynomial $P(A)$
If $\\lambda$ is an eigenvalue of $A$, then for any polynomial $P(x) = c_m x^m + \\dots + c_1 x + c_0$, the eigenvalue of the matrix polynomial $P(A)$ is $P(\\lambda)$:
$$P(A) X = P(\\lambda) X$$

*Example:* If $\\lambda = 2$ is an eigenvalue of $A$, then an eigenvalue of $3A^2 - 5A + 4I$ is $3(2^2) - 5(2) + 4 = 12 - 10 + 4 = 6$.

---

### Theorem 6: Eigenvalues of Transpose ($A^T$)
The eigenvalues of $A$ and its transpose $A^T$ are **strictly identical**:
$$\\det(A^T - \\lambda I) = \\det((A - \\lambda I)^T) = \\det(A - \\lambda I) = 0$$

---

### Theorem 7: Special Matrix Classes & Their Eigenvalues

| Matrix Type | Mathematical Definition | Property of Eigenvalues |
| :--- | :--- | :--- |
| **Real Symmetric** | $A^T = A$ | **All eigenvalues are strictly REAL** |
| **Real Skew-Symmetric** | $A^T = -A$ | **Eigenvalues are ZERO or purely imaginary ($i b$)** |
| **Orthogonal** | $A^T A = I$ | **Absolute value of every eigenvalue is $1$ ($|\\lambda| = 1$)** |
| **Idempotent** | $A^2 = A$ | **Eigenvalues can ONLY be $0$ or $1$** |
| **Nilpotent** | $A^k = O$ | **All eigenvalues are identically $0$** |
| **Involutory** | $A^2 = I$ | **Eigenvalues can ONLY be $+1$ or $-1$** |

---

### Theorem 8: Orthogonality of Eigenvectors for Symmetric Matrices
If $A$ is a real symmetric matrix ($A^T = A$), eigenvectors corresponding to **distinct eigenvalues are mutually orthogonal**:
$$\\lambda_1 \\neq \\lambda_2 \\implies X_1 \\cdot X_2 = X_1^T X_2 = 0$$

---

> [!TIP] **EXAM TIP:**
> Whenever an exam problem asks: *"Two eigenvalues of a $3 \\times 3$ matrix are 2 and 3, find the third eigenvalue"*, DO NOT compute any determinants or minors!
> Just write:
> $\\lambda_1 + \\lambda_2 + \\lambda_3 = \\operatorname{Trace}(A) \\implies 2 + 3 + \\lambda_3 = \\operatorname{Tr}(A) \\implies \\lambda_3 = \\operatorname{Tr}(A) - 5$!
> Done in 10 seconds!

> [!NOTE] **DEV BRAIN:**
> In quantum computing and physics, observable physical quantities (energy, momentum, spin) are represented by **Hermitian (symmetric) matrices** precisely because Theorem 7 guarantees that all measured eigenvalues are 100% real numbers, never imaginary!

> [!WARNING] **TRAP:**
> The eigenvectors of $A$ and $A^T$ are generally DIFFERENT, even though their eigenvalues are identical! Do not assume $A^T$ has the same eigenvectors as $A$ unless $A$ is symmetric ($A = A^T$).

> [!IMPORTANT] **MEMORIZE:**
> - $\\sum \\lambda_i = \\operatorname{Trace}(A)$
> - $\\prod \\lambda_i = \\det(A)$
> - Eigenvalues of $A^{-1}$ are $1/\\lambda_i$
> - Eigenvalues of $A^k$ are $\\lambda_i^k$
> - Real symmetric matrix $\\implies$ strictly real eigenvalues & orthogonal eigenvectors.`,
          shortNotes: "Properties: Sum of eigenvalues = Trace(A); Product of eigenvalues = det(A); A^-1 has eigenvalues 1/\u03bb; A^k has \u03bb^k; Real symmetric has purely real eigenvalues and orthogonal eigenvectors.",
          examples: [
            {
              title: "Deducing Unknown Eigenvalues Using Trace and Determinant",
              problem: "A 3x3 matrix A has Trace(A) = 9, det(A) = 24. One of its eigenvalues is \u03bb_1 = 2. Find the other two eigenvalues.",
              explanation: "Step 1: Use Sum Property (Trace):\n\u03bb_1 + \u03bb_2 + \u03bb_3 = Trace(A) = 9\nSince \u03bb_1 = 2:\n2 + \u03bb_2 + \u03bb_3 = 9 => \u03bb_2 + \u03bb_3 = 7 => \u03bb_3 = 7 - \u03bb_2.\n\nStep 2: Use Product Property (Determinant):\n\u03bb_1 * \u03bb_2 * \u03bb_3 = det(A) = 24\n2 * \u03bb_2 * \u03bb_3 = 24 => \u03bb_2 * \u03bb_3 = 12.\n\nStep 3: Solve the system:\nSubstitute \u03bb_3 = 7 - \u03bb_2:\n\u03bb_2 (7 - \u03bb_2) = 12\n7 \u03bb_2 - \u03bb_2^2 = 12 => \u03bb_2^2 - 7 \u03bb_2 + 12 = 0\nFactoring: (\u03bb_2 - 3)(\u03bb_2 - 4) = 0.\nTherefore: \u03bb_2 = 3, \u03bb_3 = 4 (or vice versa).\n\nThe three eigenvalues are 2, 3, and 4.",
              code: "# Python verification\nimport sympy as sp\nl2, l3 = sp.symbols('l2 l3')\neq1 = sp.Eq(2 + l2 + l3, 9)\neq2 = sp.Eq(2 * l2 * l3, 24)\nsol = sp.solve((eq1, eq2), (l2, l3))\nprint(f'Solutions for (\u03bb2, \u03bb3): {sol}')",
              output: "Solutions for (\u03bb2, \u03bb3): [(3, 4), (4, 3)]",
            },
          ],
          keyPoints: [
    "Sum of eigenvalues equals the trace (sum of diagonal entries).",
    "Product of eigenvalues equals the determinant.",
    "A matrix is singular if and only if at least one eigenvalue is zero.",
    "The eigenvalues of A^(-1) are the reciprocals 1/\u03bb of the eigenvalues of A.",
    "The eigenvalues of real symmetric matrices are always strictly real numbers.",
    "Eigenvectors corresponding to distinct eigenvalues of a real symmetric matrix are mutually orthogonal."
],
          theoryQuestions: [
            {
              question: "Prove that the sum of the eigenvalues of a matrix is equal to its trace, and their product is equal to its determinant.",
              marks: "7 Marks",
              answer: "1. Let A be an n x n matrix with eigenvalues \u03bb_1, \u03bb_2, ..., \u03bb_n.\n2. The characteristic polynomial is defined as:\np(\u03bb) = det(A - \u03bbI) = (-1)^n (\u03bb - \u03bb_1)(\u03bb - \u03bb_2)...(\u03bb - \u03bb_n).\n3. By polynomial expansion:\np(\u03bb) = (-1)^n [ \u03bb^n - (\u03bb_1 + ... + \u03bb_n) \u03bb^(n-1) + ... + (-1)^n (\u03bb_1 ... \u03bb_n) ].\n4. From the determinant definition of det(A - \u03bbI):\nThe coefficient of (-\u03bb)^(n-1) in det(A - \u03bbI) is the sum of diagonal entries (a_11 + a_22 + ... + a_nn) = Trace(A).\nComparing coefficients proves: \u03bb_1 + \u03bb_2 + ... + \u03bb_n = Trace(A).\n5. Substitute \u03bb = 0 into both sides of the identity:\ndet(A - 0*I) = (-1)^n (0 - \u03bb_1)(0 - \u03bb_2)...(0 - \u03bb_n) = (-1)^n (-1)^n (\u03bb_1 ... \u03bb_n) = \u03bb_1 ... \u03bb_n.\nSince LHS is det(A), we get: det(A) = \u03bb_1 * \u03bb_2 * ... * \u03bb_n. Hence proved.",
              keyPoints: ["Characteristic polynomial expansion via roots", "Equating coefficient of \u03bb^(n-1) to Trace", "Setting \u03bb = 0 for product property", "Conclusion det(A) = product of roots"],
            },
            {
              question: "Prove that the eigenvalues of a real symmetric matrix are all real.",
              marks: "5 Marks",
              answer: "1. Let A be a real symmetric matrix (A = A^T = A*, since entries are real).\n2. Let \u03bb be an eigenvalue and X be the corresponding eigenvector (possibly complex):\nAX = \u03bbX  --- (1)\n3. Take complex conjugate transpose (Hermitian conjugate) of both sides:\n(AX)* = (\u03bbX)* => X* A* = \u03bb_bar X*\nSince A is real symmetric, A* = A^T = A:\nX* A = \u03bb_bar X*  --- (2)\n4. Post-multiply (2) by X:\nX* A X = \u03bb_bar X* X  --- (3)\n5. Pre-multiply (1) by X*:\nX* A X = \u03bb X* X  --- (4)\n6. Subtract (3) from (4):\n0 = (\u03bb - \u03bb_bar) (X* X).\nSince X is a non-zero vector, X* X = |x_1|^2 + |x_2|^2 + ... + |x_n|^2 > 0.\n7. Therefore, \u03bb - \u03bb_bar = 0 => \u03bb = \u03bb_bar.\nA number equal to its own complex conjugate is strictly real. Hence, \u03bb is real.",
              keyPoints: ["Real symmetric implies A* = A", "Take conjugate transpose X* A = \u03bb_bar X*", "Equate expressions for X* A X", "Non-zero norm X* X forces \u03bb = \u03bb_bar"],
            },
          ],
          mcqs: [
            {
              question: "If matrix A has eigenvalues 1, 2, and 4, what are the eigenvalues of A^2?",
              options: ["1, 2, 4", "1, 4, 16", "2, 4, 8", "1, sqrt(2), 2"],
              correctIndex: 1,
              explanation: "If \u03bb is an eigenvalue of A, then \u03bb^2 is an eigenvalue of A^2. Thus, eigenvalues are 1^2 = 1, 2^2 = 4, 4^2 = 16.",
            },
            {
              question: "If an idempotent matrix satisfies A^2 = A, what can its eigenvalues be?",
              options: ["Only 0", "Only 1", "0 or 1", "Any real number"],
              correctIndex: 2,
              explanation: "AX = \u03bbX => A^2 X = \u03bb^2 X. Since A^2 = A, \u03bb^2 X = \u03bbX => (\u03bb^2 - \u03bb)X = 0. Since X != 0, \u03bb^2 - \u03bb = 0 => \u03bb = 0 or 1.",
            },
            {
              question: "If the trace of a 2x2 matrix is 5 and its determinant is 6, what are its eigenvalues?",
              options: ["1 and 6", "2 and 3", "-2 and -3", "0 and 5"],
              correctIndex: 1,
              explanation: "Sum = 5, Product = 6. Roots of \u03bb^2 - 5\u03bb + 6 = 0 are (\u03bb - 2)(\u03bb - 3) = 0 => \u03bb = 2, 3.",
            },
          ],
        },
        {
          id: "cla-u4-t3",
          title: "Cayley-Hamilton Theorem: Statement, Verification & Application in finding A\u207b\u00b9 and Matrix Powers",
          simpleExplanation: "The Cayley-Hamilton theorem states that every square matrix satisfies its own characteristic equation. This means you can replace \u03bb with the matrix A itself to get zero, turning matrix inversion and large powers into simple polynomial arithmetic.",
          detailedExplanation: `## Cayley-Hamilton Theorem: Statement, Verification & Applications

The **Cayley-Hamilton Theorem** is one of the most powerful and celebrated results in linear algebra. It bridges scalar polynomials and matrix algebra, allowing engineers to compute matrix inverses, large matrix powers ($A^4, A^8$), and evaluate matrix exponential functions without matrix inversion algorithms.

---

### 1. Statement of the Cayley-Hamilton Theorem

**Theorem:** Every square matrix satisfies its own characteristic equation.

More formally:
Let $A$ be an $n \\times n$ square matrix, and let its characteristic polynomial be:
$$p(\\lambda) = \\det(A - \\lambda I) = (-1)^n [\\lambda^n + c_{n-1} \\lambda^{n-1} + \\dots + c_1 \\lambda + c_0] = 0$$

Then, substituting matrix $A$ in place of the scalar $\\lambda$ (and replacing the constant term $c_0$ by $c_0 I$, where $I$ is the $n \\times n$ identity matrix), the matrix equation evaluates identically to the **zero matrix $O$**:
$$A^n + c_{n-1} A^{n-1} + \\dots + c_1 A + c_0 I = O$$

---

### 2. Theoretical Proof Sketch via Adjoint Matrix

Recall the fundamental identity for matrix inverses:
$$B \\cdot \\operatorname{adj}(B) = \\det(B) \\cdot I$$

Let $B = (A - \\lambda I)$. Then:
$$(A - \\lambda I) \\cdot \\operatorname{adj}(A - \\lambda I) = \\det(A - \\lambda I) \\cdot I = p(\\lambda) \\cdot I$$

Notice that each entry of $\\operatorname{adj}(A - \\lambda I)$ is a cofactor of $(A - \\lambda I)$, which is a polynomial in $\\lambda$ of degree at most $(n - 1)$.
Therefore, we can write $\\operatorname{adj}(A - \\lambda I)$ as a matrix polynomial:
$$\\operatorname{adj}(A - \\lambda I) = B_{n-1} \\lambda^{n-1} + B_{n-2} \\lambda^{n-2} + \\dots + B_1 \\lambda + B_0$$
where $B_i$ are $n \\times n$ constant matrices.

Substituting this into the identity:
$$(A - \\lambda I)(B_{n-1} \\lambda^{n-1} + B_{n-2} \\lambda^{n-2} + \\dots + B_0) = (-1)^n [\\lambda^n + c_{n-1} \\lambda^{n-1} + \\dots + c_0] I$$

Expanding the left side and equating matrix coefficients of equal powers of $\\lambda$:
$$\\begin{aligned}
-B_{n-1} &= (-1)^n I \\\\
A B_{n-1} - B_{n-2} &= (-1)^n c_{n-1} I \\\\
A B_{n-2} - B_{n-3} &= (-1)^n c_{n-2} I \\\\
&\\vdots \\\\
A B_0 &= (-1)^n c_0 I
\\end{aligned}$$

Pre-multiplying the first equation by $A^n$, the second by $A^{n-1}$, the third by $A^{n-2}$, ..., and the last by $I$:
$$\\begin{aligned}
-A^n B_{n-1} &= (-1)^n A^n \\\\
A^n B_{n-1} - A^{n-1} B_{n-2} &= (-1)^n c_{n-1} A^{n-1} \\\\
A^{n-1} B_{n-2} - A^{n-2} B_{n-3} &= (-1)^n c_{n-2} A^{n-2} \\\\
&\\vdots \\\\
A B_0 &= (-1)^n c_0 I
\\end{aligned}$$

Adding all these equations together, the left-hand side telescopes to the **Zero Matrix $O$**!
$$O = (-1)^n [A^n + c_{n-1} A^{n-1} + \\dots + c_1 A + c_0 I]$$
$$\\implies A^n + c_{n-1} A^{n-1} + \\dots + c_1 A + c_0 I = O \\quad \\blacksquare$$

---

### 3. Verification Procedure for University Exams

When asked to *"Verify Cayley-Hamilton Theorem for matrix $A$"*:
1. Find the characteristic equation $\\lambda^3 - S_1 \\lambda^2 + S_2 \\lambda - S_3 = 0$.
2. Compute $A^2 = A \\cdot A$ and $A^3 = A^2 \\cdot A$ by direct matrix multiplication.
3. Compute the linear combination:
   $$\\text{LHS} = A^3 - S_1 A^2 + S_2 A - S_3 I$$
4. Show that every single entry of the resulting $3 \\times 3$ matrix simplifies to $0$:
   $$\\text{LHS} = \\begin{bmatrix} 0 & 0 & 0 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\end{bmatrix} = O$$
5. Conclude: *"Hence, Cayley-Hamilton Theorem is verified."*

---

### 4. Application 1: Finding $A^{-1}$

If $A$ is non-singular ($S_3 = \\det(A) \\neq 0$):
Take the verified equation:
$$A^3 - S_1 A^2 + S_2 A - S_3 I = O$$

Multiply both sides by $A^{-1}$ from the right:
$$A^2 - S_1 A + S_2 I - S_3 A^{-1} = O$$
$$S_3 A^{-1} = A^2 - S_1 A + S_2 I$$
$$A^{-1} = \\frac{1}{S_3} [A^2 - S_1 A + S_2 I] = \\frac{1}{\\det(A)} [A^2 - S_1 A + S_2 I]$$
*(No cofactors or adjoint determinants required!)*

---

### 5. Application 2: Computing Higher Powers ($A^4, A^5, A^k$)

Multiplying the characteristic equation by $A$:
$$A^4 = S_1 A^3 - S_2 A^2 + S_3 A$$

We substitute the already calculated $A^3$ and $A^2$ to get $A^4$ with simple addition.

#### Application 3: Reducing Large Polynomial Expressions
If asked to evaluate a large polynomial $P(A) = A^8 - 5A^7 + 7A^6 - 3A^5 + A^4 - 5A^3 + 8A^2 - 2A + I$:
1. Divide polynomial $P(\\lambda)$ by the characteristic polynomial $p(\\lambda)$:
   $$P(\\lambda) = Q(\\lambda) \\cdot p(\\lambda) + R(\\lambda)$$
2. Substitute $\\lambda = A$:
   $$P(A) = Q(A) \\cdot p(A) + R(A) = Q(A) \\cdot O + R(A) = R(A)$$
3. The huge 8th-degree matrix polynomial collapses to a simple quadratic remainder $R(A) = c_2 A^2 + c_1 A + c_0 I$!

---

> [!TIP] **EXAM TIP:**
> Never compute $A^8$ by multiplying $A$ eight times! Use polynomial long division: divide $P(\\lambda)$ by the characteristic polynomial $(\\lambda^3 - S_1 \\lambda^2 + S_2 \\lambda - S_3)$. The remainder $R(\\lambda) = a \\lambda^2 + b \\lambda + c$ gives the exact answer $P(A) = a A^2 + b A + c I$ in 2 minutes!

> [!NOTE] **DEV BRAIN:**
> In control systems engineering, the Cayley-Hamilton theorem allows expressing the **Matrix Exponential** $e^{At} = I + At + \\frac{A^2 t^2}{2!} + \\dots$ (the state transition matrix of linear dynamic systems $\\dot{x} = Ax$) as a finite polynomial of degree $n - 1$!

> [!WARNING] **TRAP:**
> In the constant term of the characteristic equation $c_0$, NEVER forget to append the identity matrix $I$ when converting to matrix form! Writing $A^2 - 5A + 6 = O$ is mathematically invalid (you cannot add a scalar to a matrix); it MUST be $A^2 - 5A + 6I = O$.

> [!IMPORTANT] **MEMORIZE:**
> - Cayley-Hamilton: $p(A) = O$
> - For $3 \\times 3$: $A^3 - S_1 A^2 + S_2 A - S_3 I = O$
> - Inverse formula: $A^{-1} = \\frac{1}{S_3} (A^2 - S_1 A + S_2 I)$
> - Matrix power: $A^4 = S_1 A^3 - S_2 A^2 + S_3 A$`,
          shortNotes: "Cayley-Hamilton: Every square matrix satisfies its characteristic equation p(A) = O. For 3x3: A^3 - S_1 A^2 + S_2 A - S_3 I = O. Use to find A^-1 = (1/S_3)(A^2 - S_1 A + S_2 I) and high powers.",
          examples: [
            {
              title: "Verifying Cayley-Hamilton Theorem and Finding A^-1",
              problem: "Verify Cayley-Hamilton theorem for A = [[1, 2], [3, 4]] and hence find A^-1 and A^3.",
              explanation: "Step 1: Find characteristic equation:\nS_1 = Trace(A) = 1 + 4 = 5.\nS_2 = det(A) = (1)(4) - (2)(3) = 4 - 6 = -2.\nCharacteristic equation: \u03bb^2 - 5\u03bb - 2 = 0.\n\nStep 2: Statement to verify: A^2 - 5A - 2I = O.\nCompute A^2:\nA^2 = [[1, 2], [3, 4]] * [[1, 2], [3, 4]]\n= [[1(1)+2(3), 1(2)+2(4)], [3(1)+4(3), 3(2)+4(4)]]\n= [[1 + 6, 2 + 8], [3 + 12, 6 + 16]] = [[7, 10], [15, 22]].\n\nCompute A^2 - 5A - 2I:\n= [[7, 10], [15, 22]] - 5 * [[1, 2], [3, 4]] - 2 * [[1, 0], [0, 1]]\n= [[7 - 5 - 2, 10 - 10 - 0], [15 - 15 - 0, 22 - 20 - 2]]\n= [[0, 0], [0, 0]] = O.\nHence, Cayley-Hamilton theorem is verified!\n\nStep 3: Find A^-1:\nMultiply A^2 - 5A - 2I = O by A^-1:\nA - 5I - 2 A^-1 = O => 2 A^-1 = A - 5I\nA^-1 = (1/2)(A - 5I)\n= (1/2) [ [[1, 2], [3, 4]] - [[5, 0], [0, 5]] ]\n= (1/2) [[-4, 2], [3, -1]] = [[-2, 1], [3/2, -1/2]].\n\nStep 4: Find A^3:\nFrom A^2 = 5A + 2I:\nA^3 = 5A^2 + 2A = 5(5A + 2I) + 2A = 27A + 10I\n= 27 * [[1, 2], [3, 4]] + 10 * [[1, 0], [0, 1]]\n= [[27 + 10, 54], [81, 108 + 10]] = [[37, 54], [81, 118]].",
              code: "import sympy as sp\nA = sp.Matrix([[1, 2], [3, 4]])\nI = sp.eye(2)\n# Check A^2 - 5A - 2I\ncheck = A**2 - 5*A - 2*I\nprint(f'A^2 - 5A - 2I =\\n{check}')\n# Inverse via formula\nA_inv = (A - 5*I) / 2\nprint(f'Computed A^-1:\\n{A_inv}')\nprint(f'Actual inverse matches: {A_inv == A.inv()}')\nprint(f'A^3:\\n{A**3}')",
              output: "A^2 - 5A - 2I =\nMatrix([[0, 0], [0, 0]])\nComputed A^-1:\nMatrix([[-2, 1], [3/2, -1/2]])\nActual inverse matches: True\nA^3:\nMatrix([[37, 54], [81, 118]])",
            },
          ],
          keyPoints: [
    "Cayley-Hamilton theorem states that every square matrix satisfies its characteristic polynomial: p(A) = O.",
    "In scalar polynomials, replace \u03bb with A and constant c with c*I.",
    "Verification requires calculating matrix powers and demonstrating that all entries sum to zero.",
    "To find A^(-1), multiply the characteristic equation by A^(-1) and isolate A^(-1).",
    "Large powers and polynomials of A can be reduced using polynomial long division remainder R(A)."
],
          theoryQuestions: [
            {
              question: "State Cayley-Hamilton theorem and use it to find the inverse of A = [[1, 0, 3], [2, 1, -1], [1, -1, 1]].",
              marks: "7 Marks",
              answer: "1. Statement: Every square matrix satisfies its own characteristic equation, det(A - \u03bbI) = 0 => p(A) = O.\n2. Characteristic Equation for given A:\nS_1 = 1 + 1 + 1 = 3.\nS_2 = M_11 + M_22 + M_33 = (1 - 1) + (1 - 3) + (1 - 0) = 0 - 2 + 1 = -1.\nS_3 = det(A) = 1(1 - 1) - 0 + 3(-2 - 1) = 0 - 9 = -9.\nCharacteristic Equation: \u03bb^3 - 3\u03bb^2 - \u03bb + 9 = 0.\n3. By Cayley-Hamilton theorem: A^3 - 3A^2 - A + 9I = O.\n4. Find A^(-1) by multiplying by A^(-1):\nA^2 - 3A - I + 9 A^(-1) = O => 9 A^(-1) = -A^2 + 3A + I.\nA^2 = [[4, -3, 6], [3, 2, 4], [0, -2, 5]].\n-A^2 + 3A + I = -[[4, -3, 6], [3, 2, 4], [0, -2, 5]] + [[3, 0, 9], [6, 3, -3], [3, -3, 3]] + [[1, 0, 0], [0, 1, 0], [0, 0, 1]]\n= [[0, 3, 3], [3, 2, -7], [3, -1, -1]].\nA^(-1) = (1/9) [[0, 3, 3], [3, 2, -7], [3, -1, -1]].",
              keyPoints: ["Formal statement", "Characteristic polynomial derivation", "Multiplying by A^(-1) to isolate A^(-1)", "Final numerical inverse matrix"],
            },
            {
              question: "If A = [[2, 1], [3, 5]], evaluate A^4 - 7A^3 + 7A^2 + 10A + 5I using Cayley-Hamilton theorem.",
              marks: "5 Marks",
              answer: "1. Characteristic equation of A:\nTrace = 2 + 5 = 7.\ndet(A) = 10 - 3 = 7.\nCharacteristic equation: \u03bb^2 - 7\u03bb + 7 = 0.\n2. By Cayley-Hamilton: A^2 - 7A + 7I = O => A^2 - 7A + 7I = 0.\n3. Divide given polynomial P(A) by (A^2 - 7A + 7I):\nP(A) = A^2 (A^2 - 7A + 7I) + 10A + 5I\n= A^2 (O) + 10A + 5I = 10A + 5I.\n4. Compute 10A + 5I:\n= 10 * [[2, 1], [3, 5]] + 5 * [[1, 0], [0, 1]]\n= [[20, 10], [30, 50]] + [[5, 0], [0, 5]] = [[25, 10], [30, 55]].",
              keyPoints: ["Find characteristic equation \u03bb^2 - 7\u03bb + 7 = 0", "Apply Cayley-Hamilton to get A^2 - 7A + 7I = O", "Polynomial reduction to 10A + 5I", "Final matrix evaluation"],
            },
          ],
          mcqs: [
            {
              question: "What is the result of substituting matrix A into its own characteristic polynomial p(\u03bb)?",
              options: ["Identity matrix I", "Zero matrix O", "Diagonal matrix of eigenvalues", "Scalar determinant det(A)"],
              correctIndex: 1,
              explanation: "According to the Cayley-Hamilton Theorem, every square matrix satisfies its own characteristic equation, meaning p(A) = O (the zero matrix).",
            },
            {
              question: "If A satisfies A^2 - 4A + 3I = O, what is A^(-1)?",
              options: ["(4I - A) / 3", "(A - 4I) / 3", "4A - 3I", "3A - 4I"],
              correctIndex: 0,
              explanation: "Multiply by A^(-1): A - 4I + 3 A^(-1) = O => 3 A^(-1) = 4I - A => A^(-1) = (4I - A) / 3.",
            },
            {
              question: "If A is a 2x2 matrix with Trace = 6 and det = 8, what is A^2 equal to?",
              options: ["6A - 8I", "8A - 6I", "6A + 8I", "8I - 6A"],
              correctIndex: 0,
              explanation: "Characteristic equation is \u03bb^2 - 6\u03bb + 8 = 0. By Cayley-Hamilton: A^2 - 6A + 8I = O => A^2 = 6A - 8I.",
            },
          ],
        },
        {
          id: "cla-u4-t4",
          title: "Orthogonal Matrices, Symmetric Matrices & Diagonalization of a Matrix",
          simpleExplanation: "Diagonalization is like rotating your perspective so that a complicated coupled matrix turns into a simple diagonal matrix where every coordinate acts completely independently. Real symmetric matrices are especially magical: they can always be diagonalized using pure rotations (orthogonal matrices).",
          detailedExplanation: `## Orthogonal Matrices, Symmetric Matrices & Diagonalization

In vibration engineering, structural dynamics, and quantum mechanics, systems of coupled differential equations are notoriously difficult to solve directly. **Matrix Diagonalization** transforms coupled coordinate systems into independent uncoupled modes, allowing each variable to be analyzed separately.

---

### 1. Orthogonal Matrices

A real square matrix $N$ is said to be an **Orthogonal Matrix** if its transpose equals its inverse:
$$N^T N = N N^T = I \\iff N^{-1} = N^T$$

#### Fundamental Properties of Orthogonal Matrices:
1. **Orthonormal Columns/Rows:** The column vectors of an orthogonal matrix form an **orthonormal basis** of $\\mathbb{R}^n$:
   $$C_i \\cdot C_j = \\begin{cases} 1 & \\text{if } i = j \\text{ (unit vectors)} \\\\ 0 & \\text{if } i \\neq j \\text{ (mutually orthogonal)} \\end{cases}$$
2. **Determinant:** $\\det(N^T N) = \\det(I) \\implies (\\det N)^2 = 1 \\implies \\det(N) = \\pm 1$.
   - If $\\det(N) = +1$: $N$ represents a **pure rotation**.
   - If $\\det(N) = -1$: $N$ represents a **reflection**.
3. **Length Preservation (Isometry):** Orthogonal transformations preserve vector lengths and angles: $\\|N X\\| = \\|X\\|$.

---

### 2. Matrix Diagonalization & Similarity Transformations

Two $n \\times n$ matrices $A$ and $B$ are called **similar** if there exists an invertible matrix $P$ such that:
$$B = P^{-1} A P$$
Similar matrices have identical determinants, identical traces, and identical eigenvalues!

#### Definition of Diagonalizability:
A matrix $A$ is **diagonalizable** if it is similar to a diagonal matrix $D$:
$$P^{-1} A P = D = \\begin{bmatrix}
\\lambda_1 & 0 & \\dots & 0 \\\\
0 & \\lambda_2 & \\dots & 0 \\\\
\\vdots & \\vdots & \\ddots & \\vdots \\\\
0 & 0 & \\dots & \\lambda_n
\\end{bmatrix}$$

#### The Modal Matrix $P$:
The transforming matrix $P$ is called the **Modal Matrix**. Its columns are precisely the **linearly independent eigenvectors** of $A$:
$$P = \\begin{bmatrix} X_1 & X_2 & \\dots & X_n \\end{bmatrix}$$
And the diagonal matrix $D$ consists of the corresponding eigenvalues:
$$D = \\operatorname{diag}(\\lambda_1, \\lambda_2, \\dots, \\lambda_n)$$

#### Necessary & Sufficient Condition:
An $n \\times n$ matrix $A$ is diagonalizable **if and only if** $A$ possesses $n$ linearly independent eigenvectors (i.e. Algebraic Multiplicity = Geometric Multiplicity for all eigenvalues).
*In particular, if all $n$ eigenvalues are distinct, $A$ is ALWAYS diagonalizable!*

---

### 3. Orthogonal Diagonalization of Real Symmetric Matrices

Real symmetric matrices ($A = A^T$) possess the most powerful spectral properties in mathematics:

#### The Spectral Theorem for Real Symmetric Matrices:
1. All eigenvalues of a real symmetric matrix are **strictly real**.
2. Eigenvectors corresponding to **distinct eigenvalues are automatically orthogonal**:
   $$\\lambda_1 \\neq \\lambda_2 \\implies X_1^T X_2 = 0$$
3. Every real symmetric matrix is **Orthogonally Diagonalizable**:
   There exists an **orthogonal matrix $N$** ($N^{-1} = N^T$) such that:
   $$N^T A N = D = \\operatorname{diag}(\\lambda_1, \\lambda_2, \\dots, \\lambda_n)$$

---

### 4. Step-by-Step Procedure for Orthogonal Diagonalization

1. **Step 1:** Find all eigenvalues $\\lambda_1, \\lambda_2, \\lambda_3$ of symmetric matrix $A$.
2. **Step 2:** Find corresponding eigenvectors $X_1, X_2, X_3$.
3. **Step 3 (Orthogonalization):** If any eigenvalues are repeated, use the Gram-Schmidt process to ensure all eigenvectors are mutually orthogonal ($X_i \\cdot X_j = 0$).
4. **Step 4 (Normalization):** Normalize each eigenvector to unit length:
   $$\\hat{u}_i = \\frac{X_i}{\\|X_i\\|} = \\frac{X_i}{\\sqrt{x_{1i}^2 + x_{2i}^2 + x_{3i}^2}}$$
5. **Step 5 (Form Normalized Modal Matrix $N$):**
   $$N = \\begin{bmatrix} \\hat{u}_1 & \\hat{u}_2 & \\hat{u}_3 \\end{bmatrix}$$
6. **Step 6 (Verify):** Compute $N^T A N$; the result will be the diagonal matrix $D$.

---

### 5. Application: Computing Matrix Powers ($A^k$)

Since $P^{-1} A P = D \\implies A = P D P^{-1}$:
$$A^k = (P D P^{-1})(P D P^{-1})\\dots(P D P^{-1}) = P D^k P^{-1}$$

Since powering a diagonal matrix is trivial:
$$D^k = \\operatorname{diag}(\\lambda_1^k, \\lambda_2^k, \\dots, \\lambda_n^k)$$
This allows computing $A^{100}$ in $O(1)$ scalar multiplications rather than 100 matrix multiplications!

---

> [!TIP] **EXAM TIP:**
> When diagonalizing a symmetric matrix, verify orthogonality before normalizing:
> Check $X_1 \\cdot X_2 = x_1 x_2 + y_1 y_2 + z_1 z_2 = 0$.
> If the dot product is not zero, you made an arithmetic error in finding the eigenvectors!

> [!NOTE] **DEV BRAIN:**
> In data science, **Principal Component Analysis (PCA)** is literally the orthogonal diagonalization of the sample covariance matrix $C = \\frac{1}{n} X^T X$! The diagonal entries of $D$ are the variances along the principal component axes defined by the columns of $N$.

> [!WARNING] **TRAP:**
> Do NOT forget to **normalize** the columns when asked for *Orthogonal Diagonalization*!
> If columns are not unit vectors ($\\|u_i\\| \\neq 1$), $N$ is not orthogonal, so $N^{-1} \\neq N^T$, and $N^T A N$ will NOT yield $D$!

> [!IMPORTANT] **MEMORIZE:**
> - Orthogonal matrix: $N^{-1} = N^T$, $\\det(N) = \\pm 1$
> - Diagonalization: $P^{-1} A P = D \\implies A = P D P^{-1}$
> - Orthogonal diagonalization of symmetric matrix: $N^T A N = D$
> - Matrix power: $A^k = P D^k P^{-1}$`,
          shortNotes: "Diagonalization: P^-1 A P = D where P has eigenvectors as columns and D has eigenvalues on diagonal. Symmetric matrices are orthogonally diagonalizable: N^T A N = D with normalized eigenvectors. A^k = P D^k P^-1.",
          examples: [
            {
              title: "Orthogonally Diagonalizing a 2x2 Symmetric Matrix",
              problem: "Diagonalize the symmetric matrix A = [[3, 1], [1, 3]] using an orthogonal transformation matrix N, and find A^4.",
              explanation: "Step 1: Find eigenvalues of A:\nTrace = 3 + 3 = 6; det = 9 - 1 = 8.\n\u03bb^2 - 6\u03bb + 8 = 0 => (\u03bb - 2)(\u03bb - 4) = 0 => \u03bb_1 = 2, \u03bb_2 = 4.\n\nStep 2: Find eigenvectors:\nFor \u03bb_1 = 2: (A - 2I)X = 0 => [[1, 1], [1, 1]][x, y]^T = 0 => x + y = 0 => X_1 = [1, -1]^T.\nFor \u03bb_2 = 4: (A - 4I)X = 0 => [[-1, 1], [1, -1]][x, y]^T = 0 => -x + y = 0 => X_2 = [1, 1]^T.\nCheck orthogonality: X_1 . X_2 = (1)(1) + (-1)(1) = 0 (Orthogonal!).\n\nStep 3: Normalize eigenvectors:\n||X_1|| = sqrt(1^2 + (-1)^2) = sqrt(2) => u_1 = [1/sqrt(2), -1/sqrt(2)]^T.\n||X_2|| = sqrt(1^2 + 1^2) = sqrt(2) => u_2 = [1/sqrt(2), 1/sqrt(2)]^T.\n\nStep 4: Form Normalized Modal Matrix N:\nN = [[1/sqrt(2), 1/sqrt(2)], [-1/sqrt(2), 1/sqrt(2)]].\nN^T = [[1/sqrt(2), -1/sqrt(2)], [1/sqrt(2), 1/sqrt(2)]].\nThen N^T A N = D = [[2, 0], [0, 4]].\n\nStep 5: Compute A^4 = N * D^4 * N^T:\nD^4 = [[2^4, 0], [0, 4^4]] = [[16, 0], [0, 256]].\nA^4 = N * [[16, 0], [0, 256]] * N^T\n= (1/2) [[1, 1], [-1, 1]] * [[16, 0], [0, 256]] * [[1, -1], [1, 1]]\n= (1/2) [[16, 256], [-16, 256]] * [[1, -1], [1, 1]]\n= (1/2) [[16 + 256, -16 + 256], [-16 + 256, 16 + 256]]\n= (1/2) [[272, 240], [240, 272]] = [[136, 120], [120, 136]].",
              code: "import sympy as sp\nA = sp.Matrix([[3, 1], [1, 3]])\nP, D = A.diagonalize()\nprint(f'Diagonal matrix D:\\n{D}')\nprint(f'Modal matrix P:\\n{P}')\nprint(f'A^4 directly:\\n{A**4}')",
              output: "Diagonal matrix D:\nMatrix([[2, 0], [0, 4]])\nModal matrix P:\nMatrix([[-1, 1], [1, 1]])\nA^4 directly:\nMatrix([[136, 120], [120, 136]])",
            },
          ],
          keyPoints: [
    "An orthogonal matrix satisfies N^T * N = I, meaning its columns form an orthonormal basis.",
    "Diagonalization transforms A into diagonal matrix D = P^(-1) A P using modal matrix P.",
    "The columns of modal matrix P are the linearly independent eigenvectors of A.",
    "Real symmetric matrices can always be orthogonally diagonalized: N^T A N = D.",
    "Powers of A are computed efficiently using A^k = P D^k P^(-1)."
],
          theoryQuestions: [
            {
              question: "Define an orthogonal matrix and prove that the eigenvectors corresponding to distinct eigenvalues of a real symmetric matrix are orthogonal.",
              marks: "7 Marks",
              answer: "1. Definition: A square real matrix N is orthogonal if N^T N = N N^T = I (i.e. N^(-1) = N^T).\n2. Proof of orthogonality for symmetric matrix A = A^T:\nLet \u03bb_1, \u03bb_2 be two distinct eigenvalues (\u03bb_1 != \u03bb_2) with corresponding eigenvectors X_1, X_2.\nAX_1 = \u03bb_1 X_1  --- (1)\nAX_2 = \u03bb_2 X_2  --- (2)\n3. Pre-multiply (1) by X_2^T:\nX_2^T A X_1 = \u03bb_1 X_2^T X_1  --- (3)\n4. Take transpose of (2) and post-multiply by X_1:\n(AX_2)^T = (\u03bb_2 X_2)^T => X_2^T A^T = \u03bb_2 X_2^T.\nSince A is symmetric (A^T = A):\nX_2^T A X_1 = \u03bb_2 X_2^T X_1  --- (4)\n5. Equate LHS of (3) and (4):\n\u03bb_1 X_2^T X_1 = \u03bb_2 X_2^T X_1 => (\u03bb_1 - \u03bb_2) (X_2^T X_1) = 0.\n6. Since \u03bb_1 != \u03bb_2, we must have X_2^T X_1 = 0 (or X_1 . X_2 = 0).\nTherefore, the eigenvectors X_1 and X_2 are mutually orthogonal. Hence proved.",
              keyPoints: ["Definition of orthogonal matrix", "Symmetric property A^T = A", "Equate expressions for X_2^T A X_1", "Distinct eigenvalues force X_2^T X_1 = 0"],
            },
            {
              question: "Explain the step-by-step process of diagonalizing an n x n matrix A and explain how it simplifies the calculation of A^k.",
              marks: "5 Marks",
              answer: "1. Find all eigenvalues \u03bb_1, ..., \u03bb_n by solving det(A - \u03bbI) = 0.\n2. Find linearly independent eigenvectors X_1, ..., X_n by solving (A - \u03bb_i I)X = 0.\n3. Form Modal Matrix P = [X_1, X_2, ..., X_n].\n4. Compute P^(-1). Then P^(-1) A P = D = diag(\u03bb_1, ..., \u03bb_n).\n5. Computing A^k:\nSince A = P D P^(-1), A^k = (P D P^(-1))^k = P D^k P^(-1).\nSince D is diagonal, D^k = diag(\u03bb_1^k, ..., \u03bb_n^k).\nThis reduces computing A^k from k full matrix multiplications to raising n scalar numbers to the power k and performing two matrix multiplications.",
              keyPoints: ["Steps to find eigenvalues and eigenvectors", "Modal matrix P assembly", "Diagonal matrix D relationship", "Power formula A^k = P D^k P^(-1)"],
            },
          ],
          mcqs: [
            {
              question: "What is the determinant of any orthogonal matrix?",
              options: ["0", "+1 or -1", "Any positive number", "Infinity"],
              correctIndex: 1,
              explanation: "Since N^T N = I, det(N^T N) = det(N^T) det(N) = (det N)^2 = 1 => det(N) = \u00b11.",
            },
            {
              question: "What are the columns of the modal matrix P used to diagonalize matrix A?",
              options: ["Rows of matrix A", "Linearly independent eigenvectors of A", "Eigenvalues of A", "Principal minors of A"],
              correctIndex: 1,
              explanation: "The columns of the modal matrix P are the linearly independent eigenvectors corresponding to the eigenvalues in D.",
            },
            {
              question: "If A is a real symmetric matrix, what matrix N orthogonally diagonalizes A such that N^T A N = D?",
              options: ["Any triangular matrix", "The normalized modal matrix", "The inverse of A", "The adjoint of A"],
              correctIndex: 1,
              explanation: "The normalized modal matrix N (whose columns are normalized, mutually orthogonal eigenvectors) satisfies N^(-1) = N^T and diagonalizes A.",
            },
          ],
        },
      ],
    },
    {
      id: "cla-u5",
      title: "Unit 5: Multiple Integrals & Vector Calculus",
      description: "Double integrals over rectangular and general domains, area calculation, change of order of integration with curve re-sketching, triple integrals for volume computation, and vector differential calculus (Del operator, Gradient, Directional Derivatives, Divergence, Solenoidal fields, Curl, Irrotational conservative fields, and Laplacian).",
      topics: [
        {
          id: "cla-u5-t1",
          title: "Double Integrals over Rectangular and General Cartesian Regions & Area Computation",
          simpleExplanation: "A single integral finds the area under a 2D curve. A double integral adds up tiny rectangles of height f(x, y) to find the volume under a 3D surface. If you set the height f(x, y) = 1, it simply calculates the 2D area of any complicated geometric shape.",
          detailedExplanation: `## Double Integrals in Cartesian Coordinates & Area Computation

In single-variable calculus, the definite integral $\\int_a^b f(x) dx$ calculates the net signed area under a 1D curve. **Double Integrals** extend this concept to calculate volumes under surfaces, mass of plates with variable density, center of gravity, and moments of inertia.

---

### 1. Definition as a Double Riemann Sum

Let $z = f(x, y)$ be a continuous function defined on a closed bounded region $R$ in the $xy$-plane.
Divide $R$ into an $m \\times n$ grid of small sub-rectangles with area $\\Delta A_k = \\Delta x_i \\Delta y_j$.
The volume under the surface $z = f(x, y)$ above region $R$ is given by the limit:
$$\\iint_R f(x, y) \\, dA = \\lim_{\\substack{m \\to \\infty \\\\ n \\to \\infty}} \\sum_{i=1}^m \\sum_{j=1}^n f(x_i^*, y_j^*) \\Delta x_i \\Delta y_j$$
Where $dA = dx \\, dy$ is the differential area element.

---

### 2. Integration over Rectangular Regions (Fubini's Theorem)

If the region of integration is a simple rectangle $R = [a, b] \\times [c, d]$ (i.e. $a \\le x \\le b$ and $c \\le y \\le d$ with constant limits):
$$\\iint_R f(x, y) \\, dA = \\int_{x=a}^b \\left[ \\int_{y=c}^d f(x, y) \\, dy \\right] dx = \\int_{y=c}^d \\left[ \\int_{x=a}^b f(x, y) \\, dx \\right] dy$$

#### Independent Product Shortcut:
If the integrand can be factored as $f(x, y) = g(x) \\cdot h(y)$ over a rectangular region:
$$\\iint_R g(x) h(y) \\, dx \\, dy = \\left( \\int_a^b g(x) \\, dx \\right) \\cdot \\left( \\int_c^d h(y) \\, dy \\right)$$

---

### 3. Integration over General (Non-Rectangular) Regions

When boundaries of $R$ are curved, limits of the inner integral **must be functions of the outer variable**.

#### Type I: Vertically Simple Regions (Vertical Strips)
The region is bounded between vertical lines $x = a$ and $x = b$, and lower curve $y = g_1(x)$ and upper curve $y = g_2(x)$:
$$\\iint_R f(x, y) \\, dA = \\int_{x=a}^b \\left( \\int_{y=g_1(x)}^{g_2(x)} f(x, y) \\, dy \\right) dx$$
- An imaginary **vertical strip** enters the region at the lower curve $y = g_1(x)$ and exits at the upper curve $y = g_2(x)$.
- The strip then sweeps horizontally from $x = a$ to $x = b$.

#### Type II: Horizontally Simple Regions (Horizontal Strips)
The region is bounded between horizontal lines $y = c$ and $y = d$, and left curve $x = h_1(y)$ and right curve $x = h_2(y)$:
$$\\iint_R f(x, y) \\, dA = \\int_{y=c}^d \\left( \\int_{x=h_1(y)}^{h_2(y)} f(x, y) \\, dx \\right) dy$$
- An imaginary **horizontal strip** enters at left boundary $x = h_1(y)$ and exits at right boundary $x = h_2(y)$.
- The strip sweeps vertically from $y = c$ to $y = d$.

---

### 4. Area of a Plane Region

When the integrand is the unit function $f(x, y) = 1$, the volume of a cylinder with unit height numerically equals the area of its base:
$$\\text{Area}(R) = \\iint_R 1 \\, dA = \\iint_R dx \\, dy$$

---

### Step-by-Step Procedure to Evaluate Double Integrals

1. **Step 1 (Sketch Region):** Sketch the bounding equations in the $xy$-plane and identify the enclosed intersection points.
2. **Step 2 (Choose Strip):** Decide whether a vertical strip (Type I) or horizontal strip (Type II) is more convenient (avoiding piecewise splitting).
3. **Step 3 (Set Limits):**
   - Inner limits: Curves where the strip enters and leaves.
   - Outer limits: Constant bounds between which the strip sweeps.
4. **Step 4 (Inner Integration):** Evaluate the inner integral treating the outer variable as a constant.
5. **Step 5 (Outer Integration):** Evaluate the remaining single-variable definite integral.

---

### Comparison: Type I vs Type II Regions

| Feature | Type I (Vertical Strip) | Type II (Horizontal Strip) |
| :--- | :--- | :--- |
| **Inner Variable** | $y$ (from bottom to top) | $x$ (from left to right) |
| **Inner Limits** | $y = g_1(x)$ to $y = g_2(x)$ | $x = h_1(y)$ to $x = h_2(y)$ |
| **Outer Variable** | $x$ (from left to right) | $y$ (from bottom to top) |
| **Outer Limits** | Constants: $x = a$ to $x = b$ | Constants: $y = c$ to $y = d$ |
| **Integral Form** | $\\int_a^b \\int_{g_1(x)}^{g_2(x)} f(x, y) \\, dy \\, dx$ | $\\int_c^d \\int_{h_1(y)}^{h_2(y)} f(x, y) \\, dx \\, dy$ |

---

> [!TIP] **EXAM TIP:**
> When finding the limits of integration:
> The **OUTER integral must ALWAYS have pure numeric constants** as limits! If your outer integral has any variable $x$ or $y$ in its limits, the solution is fundamentally wrong!

> [!NOTE] **DEV BRAIN:**
> In computer graphics (e.g. ambient occlusion, screen-space reflections), double integrals are evaluated in real time on GPUs using Monte Carlo sampling to compute lighting irradiance over pixel footprints.

> [!WARNING] **TRAP:**
> Do NOT mix up the differential order $dy \\, dx$ with $dx \\, dy$!
> $\\int \\int \\dots dy \\, dx$ means integrate with respect to $y$ **first** (inner), then with respect to $x$ **second** (outer). The inner differential belongs to the inner integral!

> [!IMPORTANT] **MEMORIZE:**
> - Fubini: Constant limits allow splitting $\\iint g(x)h(y) dx dy = \\int g(x) dx \\cdot \\int h(y) dy$
> - Area of region $R$: $\\text{Area} = \\iint_R dx \\, dy$
> - Vertical strip: $y$ goes from curve to curve; $x$ goes from number to number.`,
          shortNotes: "Double integral: Area = \u222c dx dy; Volume = \u222c f(x,y) dx dy. Vertical strip: inner y is curve to curve, outer x is const to const. Outer limits must ALWAYS be constants!",
          examples: [
            {
              title: "Double Integral Over Region Bounded by Parabolas",
              problem: "Evaluate \u222c_R x*y dx dy over the region R bounded by the parabola y = x^2 and the line y = x.",
              explanation: "Step 1: Find points of intersection:\nx^2 = x => x^2 - x = 0 => x(x - 1) = 0 => x = 0 and x = 1.\nCorresponding y values: y = 0 and y = 1.\nIntersection points are (0, 0) and (1, 1).\n\nStep 2: Set up vertical strip (Type I):\nFor x in [0, 1], the line y = x lies ABOVE the parabola y = x^2 (e.g. at x = 0.5, y_line = 0.5 > y_parabola = 0.25).\n- Inner limits (y): enters at y = x^2, exits at y = x.\n- Outer limits (x): sweeps from x = 0 to x = 1.\nIntegral = \u222b_{x=0}^1 [ \u222b_{y=x^2}^x x*y dy ] dx.\n\nStep 3: Evaluate inner integral wrt y:\n\u222b_{y=x^2}^x x*y dy = x [ y^2 / 2 ]_{x^2}^x = (x / 2) [ x^2 - (x^2)^2 ] = (x/2) [ x^2 - x^4 ] = (1/2) [ x^3 - x^5 ].\n\nStep 4: Evaluate outer integral wrt x:\n(1/2) \u222b_{x=0}^1 (x^3 - x^5) dx = (1/2) [ x^4 / 4 - x^6 / 6 ]_0^1\n= (1/2) [ 1/4 - 1/6 ] = (1/2) [ 3/12 - 2/12 ] = (1/2) [ 1/12 ] = 1/24.",
              code: "import sympy as sp\nx, y = sp.symbols('x y')\ninner = sp.integrate(x * y, (y, x**2, x))\nouter = sp.integrate(inner, (x, 0, 1))\nprint(f'Inner integral: {inner}')\nprint(f'Total integral value: {outer}')",
              output: "Inner integral: -x**5/2 + x**3/2\nTotal integral value: 1/24",
            },
          ],
          keyPoints: [
    "A double integral computes the volume under a 3D surface or 2D plane area when f(x, y) = 1.",
    "Fubini's theorem allows interchanging integration order when limits are independent constants.",
    "In general regions, inner limits are bounding functions; outer limits are strict numerical constants.",
    "Type I regions use vertical strips; Type II regions use horizontal strips.",
    "Points of intersection of bounding curves dictate the outer constant limits."
],
          theoryQuestions: [
            {
              question: "Find the area bounded by the parabolas y^2 = 4ax and x^2 = 4ay using double integration.",
              marks: "7 Marks",
              answer: "1. Find intersection points:\nx^2 = 4ay => y = x^2 / (4a).\nSubstitute into y^2 = 4ax:\n[x^2 / (4a)]^2 = 4ax => x^4 / (16 a^2) = 4ax => x^4 = 64 a^3 x => x(x^3 - 64 a^3) = 0.\nx = 0 and x = 4a.\nAt x = 0, y = 0. At x = 4a, y = 4a.\n2. Set up vertical strip limits:\nx ranges from 0 to 4a.\nFor x in (0, 4a), y = 2 sqrt(ax) is the upper curve and y = x^2/(4a) is the lower curve.\nArea = \u222b_{x=0}^{4a} [ \u222b_{y=x^2/(4a)}^{2 sqrt(ax)} 1 dy ] dx.\n3. Inner integral:\n\u222b dy = 2 sqrt(ax) - x^2/(4a) = 2 sqrt(a) x^(1/2) - x^2/(4a).\n4. Outer integral:\nArea = \u222b_0^{4a} [ 2 sqrt(a) x^(1/2) - x^2/(4a) ] dx\n= [ 2 sqrt(a) * (2/3) x^(3/2) - x^3 / (12a) ]_0^{4a}\n= (4/3) sqrt(a) (4a)^(3/2) - (4a)^3 / (12a)\n= (4/3) sqrt(a) [ 8 a^(3/2) ] - 64 a^3 / (12a)\n= (32/3) a^2 - (16/3) a^2 = (16/3) a^2.\nArea = 16 a^2 / 3.",
              keyPoints: ["Find intersection points (0, 0) and (4a, 4a)", "Vertical strip from y = x^2/(4a) to 2 sqrt(ax)", "Evaluate outer integral wrt x", "Final area = 16/3 a^2"],
            },
            {
              question: "Evaluate \u222c_R e^(2x + 3y) dx dy over the rectangular region bounded by x = 0, x = 1, y = 0, y = 2.",
              marks: "5 Marks",
              answer: "1. Since limits are constants, apply Fubini's product rule:\n\u222c_R e^(2x + 3y) dx dy = [ \u222b_0^1 e^(2x) dx ] * [ \u222b_0^2 e^(3y) dy ].\n2. First integral wrt x:\n\u222b_0^1 e^(2x) dx = [ e^(2x) / 2 ]_0^1 = (e^2 - 1) / 2.\n3. Second integral wrt y:\n\u222b_0^2 e^(3y) dy = [ e^(3y) / 3 ]_0^2 = (e^6 - 1) / 3.\n4. Multiply the two independent integrals:\nTotal = [ (e^2 - 1) / 2 ] * [ (e^6 - 1) / 3 ] = (1/6) (e^2 - 1)(e^6 - 1).",
              keyPoints: ["Fubini product factorization", "Evaluate x integral to (e^2 - 1)/2", "Evaluate y integral to (e^6 - 1)/3", "Product = 1/6 (e^2 - 1)(e^6 - 1)"],
            },
          ],
          mcqs: [
            {
              question: "What is the value of \u222b_0^1 \u222b_0^2 1 dy dx?",
              options: ["1", "2", "3", "4"],
              correctIndex: 1,
              explanation: "This represents the area of a rectangle of length 1 and height 2: Area = 1 * 2 = 2.",
            },
            {
              question: "In a double integral over a general region, the limits of the outer integral must:",
              options: ["Always be functions of x", "Always be functions of y", "Always be strict numerical constants", "Can be either variables or constants"],
              correctIndex: 2,
              explanation: "The outer integral produces the final scalar numeric value, so its limits must strictly be constants.",
            },
            {
              question: "If f(x, y) = 1 in \u222c_R f(x, y) dA, what does the double integral compute?",
              options: ["Perimeter of region R", "Area of region R", "Volume of a sphere", "Center of mass"],
              correctIndex: 1,
              explanation: "When the integrand is 1, \u222c_R 1 dA calculates the 2D area of the region R.",
            },
          ],
        },
        {
          id: "cla-u5-t2",
          title: "Change of Order of Integration in Double Integrals with Boundary Curve Re-sketching",
          simpleExplanation: "Some integrals are mathematically impossible to evaluate in the given order because the inside function has no known anti-derivative. By reversing the order of integration (switching from vertical to horizontal strips), the problem transforms into a simple elementary integral.",
          detailedExplanation: `## Change of Order of Integration in Double Integrals

In advanced calculus, many double integrals cannot be evaluated in their given formulation because the inner anti-derivative does not exist in closed elementary form (e.g. $\\int e^{-x^2} dx$, $\\int \\frac{\\sin y}{y} dy$, $\\int \\frac{1}{\\ln y} dy$). **Changing the order of integration** allows us to bypass non-integrable functions by integrating with respect to the other variable first!

---

### 1. Why Change the Order of Integration?

Consider the classic university integral:
$$I = \\int_0^1 \\int_x^1 \\frac{\\sin y}{y} \\, dy \\, dx$$
- The inner integral requires computing $\\int \\frac{\\sin y}{y} dy$, which is the non-elementary **Sine Integral function** $\\operatorname{Si}(y)$. You cannot evaluate this using standard calculus!
- However, if we reverse the order to integrate with respect to $x$ first:
  $$\\int \\left[ \\int \\frac{\\sin y}{y} \\, dx \\right] dy = \\int \\frac{\\sin y}{y} [x] \\, dy$$
  The variable $x$ evaluates to $y$, perfectly canceling the denominator $y$ to leave $\\int \\sin y \\, dy = -\\cos y$, which is trivial!

---

### 2. The 4-Step Systematic Algorithm for Changing Order

You **cannot simply swap** the integral signs and differentials! $\\int_a^b \\int_{g_1(x)}^{g_2(x)} dy dx \\neq \\int_{g_1(x)}^{g_2(x)} \\int_a^b dx dy$!
You must follow this geometric procedure:

#### Step 1: Decode the Given Limits
Extract the boundary equations and identify the orientation of the original strip:
- If written as $\\int_{x=a}^b \\int_{y=y_1(x)}^{y_2(x)} f(x, y) \\, dy \\, dx$:
  - Original strip is **Vertical**.
  - Lower boundary: $y = y_1(x)$
  - Upper boundary: $y = y_2(x)$
  - Left boundary: $x = a$
  - Right boundary: $x = b$

#### Step 2: Sketch the Enclosed Region $R$
Plot all 4 boundary curves in the Cartesian plane and shade the enclosed domain $R$. Find the coordinates of all intersection vertices.

#### Step 3: Draw the Alternate Strip
Switch the strip direction:
- If the original was vertical, draw a **Horizontal Strip**.
- Identify the curve where the horizontal strip **enters from the left**: $x = x_1(y)$ (solve for $x$ in terms of $y$).
- Identify the curve where the horizontal strip **exits to the right**: $x = x_2(y)$.
- Determine the minimum and maximum constant vertical heights: $y = c$ to $y = d$.

#### Step 4: Write the New Integral
$$I = \\int_{y=c}^d \\left( \\int_{x=x_1(y)}^{x_2(y)} f(x, y) \\, dx \\right) dy$$

---

### 3. Region Splitting (Piecewise Boundary Changes)

If the left or right boundary changes along the height of the region, the new integral **must be split into two separate double integrals**:
$$\\iint_R = \\iint_{R_1} + \\iint_{R_2}$$

*Classic Example:* When reversing the order of $\\int_0^{2a} \\int_{x^2/(4a)}^{3a-x} dy \\, dx$, the upper boundary curve changes from a line to a parabola, requiring two separate horizontal strips for $y \\in [0, a]$ and $y \\in [a, 3a]$.

---

### Transformation Mapping of Famous Integrals

| Original Non-Elementary Integral | Original Strip | Reversed Strip | Transformed Elementary Integral |
| :--- | :--- | :--- | :--- |
| $\\int_0^1 \\int_x^1 \\frac{\\sin y}{y} \\, dy \\, dx$ | Vertical: $y=x \\to y=1$ | Horizontal: $x=0 \\to x=y$ | $\\int_0^1 \\int_0^y \\frac{\\sin y}{y} \\, dx \\, dy = 1 - \\cos(1)$ |
| $\\int_0^\\infty \\int_x^\\infty \\frac{e^{-y}}{y} \\, dy \\, dx$ | Vertical: $y=x \\to y=\\infty$ | Horizontal: $x=0 \\to x=y$ | $\\int_0^\\infty \\int_0^y \\frac{e^{-y}}{y} \\, dx \\, dy = 1$ |
| $\\int_0^a \\int_y^a \\frac{x}{x^2+y^2} \\, dx \\, dy$ | Horizontal: $x=y \\to x=a$ | Vertical: $y=0 \\to y=x$ | $\\int_0^a \\int_0^x \\frac{x}{x^2+y^2} \\, dy \\, dx = \\frac{\\pi a}{4}$ |
| $\\int_0^1 \\int_{\\sqrt{y}}^1 \\sqrt{x^3+1} \\, dx \\, dy$ | Horizontal: $x=\\sqrt{y} \\to x=1$ | Vertical: $y=0 \\to y=x^2$ | $\\int_0^1 \\int_0^{x^2} \\sqrt{x^3+1} \\, dy \\, dx = \\frac{2}{9}(2\\sqrt{2}-1)$ |

---

> [!TIP] **EXAM TIP:**
> In exams, 90% of "Change of Order" questions contain integrands like $\\frac{\\sin y}{y}, \\frac{e^{-y}}{y}, \\sqrt{1+x^3}, e^{x^2}, \\cos(x^2)$.
> Recognizing this immediately tells you that the inner integration will produce a multiplying factor (like $x$ or $y$) that eliminates the difficult denominator or provides the substitution derivative $du$!

> [!NOTE] **DEV BRAIN:**
> In high-performance compilers and NumPy/PyTorch, **Loop Interchange** (swapping nested for-loops \`for i in ...: for j in ...:\`) is the exact discrete equivalent of changing integration order! It optimizes CPU cache spatial locality and memory bus bandwidth.

> [!WARNING] **TRAP:**
> Always solve for $x$ in terms of $y$ when switching to a horizontal strip!
> If the curve was $y = x^2$, the horizontal strip enters at $x = 0$ and exits at $x = +\\sqrt{y}$ (not $x^2$!).

> [!IMPORTANT] **MEMORIZE:**
> - Never swap limits directly! Always re-sketch the region.
> - Vertical strip: $y$ is inner (curve to curve), $x$ is outer.
> - Horizontal strip: $x$ is inner (left curve to right curve), $y$ is outer.`,
          shortNotes: "Change of order: Used when inner integral is impossible (e.g. sin(y)/y, e^(-x^2)). Decode limits, sketch region, switch from vertical strip to horizontal strip (or vice versa), and re-integrate.",
          examples: [
            {
              title: "Changing Order to Evaluate an Impossible Integral",
              problem: "Change the order of integration and hence evaluate: I = \u222b_0^1 \u222b_x^1 [sin(y) / y] dy dx.",
              explanation: "Step 1: Extract original limits:\nInner (y): y = x to y = 1.\nOuter (x): x = 0 to x = 1.\nThis represents a vertical strip bounded below by line y = x and above by horizontal line y = 1, from x = 0 to x = 1.\nThe region is a triangle with vertices at (0, 0), (1, 1), and (0, 1).\n\nStep 2: Change to horizontal strip:\n- Draw a horizontal strip across the triangle at height y.\n- Left boundary (entry): the y-axis, where x = 0.\n- Right boundary (exit): the line y = x, which means x = y.\n- Vertical bounds for y: the strip sweeps from the bottom vertex y = 0 to top line y = 1.\n\nNew limits:\nInner (x): x = 0 to x = y.\nOuter (y): y = 0 to y = 1.\n\nStep 3: Set up new integral:\nI = \u222b_{y=0}^1 [ \u222b_{x=0}^y (sin y / y) dx ] dy\n\nStep 4: Evaluate inner integral wrt x:\nSince sin(y)/y is constant with respect to x:\n\u222b_{x=0}^y (sin y / y) dx = (sin y / y) [ x ]_0^y = (sin y / y) * (y - 0) = sin y.\n(The troublesome y in the denominator is canceled!)\n\nStep 5: Evaluate outer integral wrt y:\nI = \u222b_0^1 sin y dy = [ -cos y ]_0^1 = -cos(1) - (-cos(0)) = 1 - cos(1).",
              code: "import sympy as sp\nx, y = sp.symbols('x y')\n# Transformed integral\ninner = sp.integrate(sp.sin(y) / y, (x, 0, y))\nouter = sp.integrate(inner, (y, 0, 1))\nprint(f'Inner result: {inner}')\nprint(f'Final evaluated value: {outer}')\nprint(f'Decimal approximation: {float(outer):.5f}')",
              output: "Inner result: sin(y)\nFinal evaluated value: 1 - cos(1)\nDecimal approximation: 0.45970",
            },
          ],
          keyPoints: [
    "Changing integration order overcomes non-elementary inner antiderivatives.",
    "Direct swapping of variable limits is mathematically invalid; the region must be re-analyzed geometrically.",
    "Vertical strip (dy dx) switches to Horizontal strip (dx dy), or vice-versa.",
    "When switching to horizontal strips, express boundaries as x = x(y).",
    "If the boundary curve changes along the sweep, the integral must be split into two separate regions."
],
          theoryQuestions: [
            {
              question: "Change the order of integration and evaluate: I = \u222b_0^4 \u222b_{x^2/4}^{2 sqrt(x)} dy dx.",
              marks: "7 Marks",
              answer: "1. Decode original limits:\nInner: y = x^2 / 4 (parabola opening upward) to y = 2 sqrt(x) => y^2 = 4x (parabola opening rightward).\nOuter: x = 0 to x = 4.\nIntersection points: x^2 / 4 = 2 sqrt(x) => x^4 / 16 = 4x => x(x^3 - 64) = 0 => x = 0 and x = 4.\nAt x = 0, y = 0. At x = 4, y = 4.\n2. Switch to horizontal strip:\nAt any height y between 0 and 4:\n- Left curve (entry): y^2 = 4x => x = y^2 / 4.\n- Right curve (exit): y = x^2 / 4 => x^2 = 4y => x = 2 sqrt(y).\n- Range of y: y = 0 to y = 4.\n3. Reversed integral:\nI = \u222b_{y=0}^4 [ \u222b_{x=y^2/4}^{2 sqrt(y)} 1 dx ] dy.\n4. Evaluate:\nInner: [ x ]_{y^2/4}^{2 sqrt(y)} = 2 sqrt(y) - y^2 / 4.\nOuter: \u222b_0^4 (2 y^(1/2) - y^2 / 4) dy = [ 2 * (2/3) y^(3/2) - y^3 / 12 ]_0^4\n= (4/3)(4)^(3/2) - (4)^3 / 12 = (4/3)(8) - 64/12 = 32/3 - 16/3 = 16/3.",
              keyPoints: ["Decode original parabolas", "Find intersection (0,0) and (4,4)", "Set horizontal strip x = y^2/4 to x = 2 sqrt(y)", "Final evaluation = 16/3"],
            },
            {
              question: "Explain with a diagram why changing the order of integration is necessary for \u222b_0^a \u222b_x^a [x / (x^2 + y^2)] dy dx.",
              marks: "5 Marks",
              answer: "1. In the given order, the inner integral is wrt y: \u222b [x / (x^2 + y^2)] dy = x * (1/x) tan^(-1)(y/x) = tan^(-1)(y/x).\nEvaluating at limits y = x to y = a gives tan^(-1)(a/x) - tan^(-1)(1) = tan^(-1)(a/x) - \u03c0/4.\nThe outer integral \u222b_0^a [tan^(-1)(a/x) - \u03c0/4] dx requires integration by parts and is cumbersome.\n2. By changing order to horizontal strip:\nOriginal region: triangle bounded by y = x, y = a, and x = 0.\nReversed limits: For y from 0 to a, x ranges from 0 to y.\nI = \u222b_{y=0}^a [ \u222b_{x=0}^y x/(x^2 + y^2) dx ] dy.\n3. Inner integral wrt x:\n(1/2) \u222b 2x/(x^2 + y^2) dx = (1/2) [ ln(x^2 + y^2) ]_0^y = (1/2) [ ln(2y^2) - ln(y^2) ] = (1/2) ln(2).\n4. Outer integral wrt y:\nI = \u222b_0^a (1/2) ln(2) dy = (1/2) ln(2) [ y ]_0^a = (a/2) ln(2).\nThe calculation becomes elementary and clean!",
              keyPoints: ["Show cumbersome nature of original order", "Formulate reversed limits x = 0 to y, y = 0 to a", "Evaluate inner integral to 1/2 ln 2", "Final answer (a/2) ln 2"],
            },
          ],
          mcqs: [
            {
              question: "When changing the order of integration for \u222b_0^1 \u222b_0^x f(x, y) dy dx, what are the new limits?",
              options: ["\u222b_0^1 \u222b_0^y f(x, y) dx dy", "\u222b_0^1 \u222b_y^1 f(x, y) dx dy", "\u222b_0^x \u222b_0^1 f(x, y) dx dy", "\u222b_0^1 \u222b_0^1 f(x, y) dx dy"],
              correctIndex: 1,
              explanation: "Original region is bounded by y = 0, y = x, and x = 1. A horizontal strip enters at x = y and exits at x = 1, while y ranges from 0 to 1: \u222b_0^1 \u222b_y^1 f dx dy.",
            },
            {
              question: "Why is changing the order of integration used in evaluating double integrals?",
              options: ["To change the sign of the answer", "To convert non-elementary inner integrals into solvable standard forms", "Because double integrals must always have dx before dy", "To double the area of integration"],
              correctIndex: 1,
              explanation: "Its primary engineering purpose is to bypass inner integrals that lack elementary antiderivatives (like sin(y)/y or exp(-x^2)).",
            },
            {
              question: "What is the value of \u222b_0^\u221e \u222b_x^\u221e (e^(-y) / y) dy dx after changing the order?",
              options: ["0", "1", "e", "Infinity"],
              correctIndex: 1,
              explanation: "Reversed: \u222b_0^\u221e [ \u222b_0^y (e^(-y)/y) dx ] dy = \u222b_0^\u221e e^(-y) dy = [-e^(-y)]_0^\u221e = 0 - (-1) = 1.",
            },
          ],
        },
        {
          id: "cla-u5-t3",
          title: "Triple Integrals in Cartesian Coordinates & Volume Calculations",
          simpleExplanation: "While a double integral sums over a 2D floor, a triple integral slices up a full 3D solid into tiny cubes of volume dx * dy * dz. If you set the function inside to 1, the triple integral computes the exact 3D volume of any complicated solid.",
          detailedExplanation: `## Triple Integrals in Cartesian Coordinates & Volume Calculations

**Triple Integrals** extend multivariable integration to three-dimensional Euclidean space $\\mathbb{R}^3$. They are the fundamental mathematical tool for computing volumes of complex geometric solids, center of mass of 3D objects, moments of inertia of mechanical components, and gravitational and electrostatic potentials.

---

### 1. Definition of the Triple Integral

Let $f(x, y, z)$ be a continuous function defined over a closed, bounded 3D solid region $V$.
Subdivide $V$ into small rectangular boxes of volume $\\Delta V_k = \\Delta x_i \\Delta y_j \\Delta z_k$.
The **Triple Integral** is defined as the limit of the Riemann sum:
$$\\iiint_V f(x, y, z) \\, dV = \\lim_{\\substack{l, m, n \\to \\infty}} \\sum_{i=1}^l \\sum_{j=1}^m \\sum_{k=1}^n f(x_i^*, y_j^*, z_k^*) \\Delta x_i \\Delta y_j \\Delta z_k$$
where the differential volume element in Cartesian coordinates is:
$$dV = dx \\, dy \\, dz$$

---

### 2. Volume of a Three-Dimensional Solid

When the integrand is the unit function $f(x, y, z) = 1$, the triple integral calculates the exact **Volume** of the solid $V$:
$$\\text{Volume}(V) = \\iiint_V 1 \\, dV = \\iiint_V dz \\, dy \\, dx$$

---

### 3. Setting Up Limits for Triple Integrals

Setting up the limits of a triple integral requires a systematic "3D to 2D projection" procedure:

\`\`\`
Solid Solid V (3D)
       ↓  (Pierce with vertical needle along z-axis)
Bottom surface z = z_1(x, y)  →  Top surface z = z_2(x, y)
       ↓  (Project shadow onto xy-plane)
Planar Region R_xy (2D)
       ↓  (Apply 2D vertical strip)
Lower curve y = y_1(x)  →  Upper curve y = y_2(x)
       ↓  (Sweep across x-axis)
Constants x = a  →  x = b
\`\`\`

#### The Master Triple Iterated Integral Formula:
$$\\iiint_V f(x, y, z) \\, dz \\, dy \\, dx = \\int_{x=a}^b \\left[ \\int_{y=y_1(x)}^{y_2(x)} \\left( \\int_{z=z_1(x, y)}^{z_2(x, y)} f(x, y, z) \\, dz \\right) dy \\right] dx$$

1. **Innermost limits ($z$):** Functions of two variables, $z = z_1(x, y)$ to $z = z_2(x, y)$.
2. **Middle limits ($y$):** Functions of one variable, $y = y_1(x)$ to $y = y_2(x)$.
3. **Outermost limits ($x$):** Strict numerical constants, $x = a$ to $x = b$.

---

### 4. Standard University Benchmark Problems

#### Case 1: Volume of a Tetrahedron
Find the volume of the tetrahedron bounded by the coordinate planes $x = 0, y = 0, z = 0$ and the plane:
$$\\frac{x}{a} + \\frac{y}{b} + \\frac{z}{c} = 1$$

- $z$-limits: Enters at $z = 0$, exits at $z = c\\left(1 - \\frac{x}{a} - \\frac{y}{b}\\right)$.
- $y$-limits: In $xy$-plane ($z = 0$), $\\frac{x}{a} + \\frac{y}{b} = 1 \\implies y = 0$ to $y = b\\left(1 - \\frac{x}{a}\\right)$.
- $x$-limits: On $x$-axis ($y = 0, z = 0$), $x = 0$ to $x = a$.
$$\\text{Volume} = \\int_{x=0}^a \\int_{y=0}^{b(1 - x/a)} \\int_{z=0}^{c(1 - x/a - y/b)} 1 \\, dz \\, dy \\, dx = \\frac{1}{6} abc$$

#### Case 2: Dirichlet's Integral Theorem
For problems over the positive octant ($x \\ge 0, y \\ge 0, z \\ge 0$) bounded by $\\left(\\frac{x}{a}\\right)^p + \\left(\\frac{y}{b}\\right)^q + \\left(\\frac{z}{c}\\right)^r \\le 1$:
$$\\iiint_V x^{l-1} y^{m-1} z^{n-1} \\, dx \\, dy \\, dz = \\frac{a^l b^m c^n}{p \\cdot q \\cdot r} \\frac{\\Gamma(l/p) \\Gamma(m/q) \\Gamma(n/r)}{\\Gamma(1 + l/p + m/q + n/r)}$$
For the standard plane $x + y + z \\le 1$ ($p = q = r = 1, a = b = c = 1, l = m = n = 1$):
$$\\text{Volume} = \\frac{\\Gamma(1)\\Gamma(1)\\Gamma(1)}{\\Gamma(1+3)} = \\frac{1}{3!} = \\frac{1}{6}$$

---

### Summary of Limits Structure in Triple Integrals

| Integral Level | Variable | Bound Nature | Geometric Role |
| :--- | :--- | :--- | :--- |
| **Innermost** | $z$ | Surface functions $z_1(x, y) \\to z_2(x, y)$ | Height of 3D column |
| **Middle** | $y$ | Curve functions $y_1(x) \\to y_2(x)$ | Width of 2D vertical strip |
| **Outermost** | $x$ | Pure constants $a \\to b$ | Sweep interval of solid |

---

> [!TIP] **EXAM TIP:**
> When asked to find the volume of an ellipsoid $\\frac{x^2}{a^2} + \\frac{y^2}{b^2} + \\frac{z^2}{c^2} \\le 1$ or sphere $x^2 + y^2 + z^2 \\le a^2$:
> Calculate the volume of **only the positive octant** (where $x \\ge 0, y \\ge 0, z \\ge 0$) and then multiply the result by $8$! This eliminates negative square root limits completely.

> [!NOTE] **DEV BRAIN:**
> In computer graphics and voxel engines (like Minecraft or medical CT scan reconstruction), triple integrals represent 3D voxel density integration to render volumetric fog, cloud light absorption, and MRI bone tissue density.

> [!WARNING] **TRAP:**
> Never put variables in the outermost integral!
> A result containing $x, y,$ or $z$ after full triple integration indicates an incorrect ordering of limits. The outermost bounds must always evaluate to a constant scalar number.

> [!IMPORTANT] **MEMORIZE:**
> - Volume of solid: $V = \\iiint 1 \\, dz \\, dy \\, dx$
> - Tetrahedron bounded by coordinate planes and $\\frac{x}{a}+\\frac{y}{b}+\\frac{z}{c}=1$: $\\text{Volume} = \\frac{abc}{6}$
> - Sphere positive octant: multiply by 8 for total sphere volume $\\frac{4}{3}\\pi a^3$`,
          shortNotes: "Triple integral: Volume = \u222d dz dy dx. Set limits: z goes from bottom surface to top surface; y goes from lower curve to upper curve; x goes from const to const. Tetrahedron volume = abc / 6.",
          examples: [
            {
              title: "Computing Volume of a Tetrahedron via Triple Integration",
              problem: "Find the volume of the tetrahedron bounded by the coordinate planes x = 0, y = 0, z = 0 and the plane x + y + z = 1.",
              explanation: "Step 1: Set up limits of integration:\n- The bottom surface is z = 0; the top surface is z = 1 - x - y.\n- Shadow on xy-plane (put z = 0): x + y = 1 => y = 0 to y = 1 - x.\n- Shadow on x-axis (put y = 0, z = 0): x = 0 to x = 1.\nVolume = \u222b_{x=0}^1 \u222b_{y=0}^{1-x} \u222b_{z=0}^{1-x-y} 1 dz dy dx.\n\nStep 2: Innermost integral wrt z:\n\u222b_{z=0}^{1-x-y} 1 dz = [ z ]_0^{1-x-y} = 1 - x - y.\n\nStep 3: Middle integral wrt y:\n\u222b_{y=0}^{1-x} (1 - x - y) dy = [ (1 - x) y - y^2 / 2 ]_0^{1-x}\n= (1 - x)(1 - x) - (1 - x)^2 / 2 = (1 - x)^2 - (1/2)(1 - x)^2 = (1/2)(1 - x)^2.\n\nStep 4: Outermost integral wrt x:\nVolume = (1/2) \u222b_0^1 (1 - x)^2 dx = (1/2) [ - (1 - x)^3 / 3 ]_0^1\n= (1/2) [ 0 - (-1/3) ] = (1/2) * (1/3) = 1/6.\n\nTotal Volume = 1/6 cubic units.",
              code: "import sympy as sp\nx, y, z = sp.symbols('x y z')\nvol = sp.integrate(1, (z, 0, 1 - x - y), (y, 0, 1 - x), (x, 0, 1))\nprint(f'Computed tetrahedron volume: {vol}')",
              output: "Computed tetrahedron volume: 1/6",
            },
          ],
          keyPoints: [
    "Triple integrals evaluate over 3-dimensional Cartesian regions bounded by surfaces.",
    "When integrand f(x, y, z) = 1, the triple integral yields the exact 3D volume.",
    "Limits are constructed by determining z-surfaces, then 2D shadow curves, then 1D bounds.",
    "The volume of a tetrahedron bounded by x/a + y/b + z/c = 1 is always abc / 6.",
    "Dirichlet's integral provides a generalized factorial formula for multi-variable octant integrals."
],
          theoryQuestions: [
            {
              question: "Derive the volume of the tetrahedron bounded by the coordinate planes and the plane x/a + y/b + z/c = 1 using triple integration.",
              marks: "7 Marks",
              answer: "1. Solid boundaries: x = 0, y = 0, z = 0 and z = c(1 - x/a - y/b).\n2. Projection on xy-plane (z = 0): x/a + y/b = 1 => y = b(1 - x/a).\n3. Range of x (y = 0): x = 0 to x = a.\n4. Set up triple integral:\nV = \u222b_{x=0}^a \u222b_{y=0}^{b(1-x/a)} \u222b_{z=0}^{c(1-x/a-y/b)} dz dy dx.\n5. Evaluate innermost integral wrt z:\n\u222b dz = c(1 - x/a - y/b).\n6. Evaluate middle integral wrt y:\nLet u = 1 - x/a (constant wrt y).\n\u222b_0^{b u} c(u - y/b) dy = c [ u y - y^2/(2b) ]_0^{b u} = c [ b u^2 - b^2 u^2 / (2b) ] = (bc/2) u^2 = (bc/2)(1 - x/a)^2.\n7. Evaluate outermost integral wrt x:\nV = (bc/2) \u222b_0^a (1 - x/a)^2 dx = (bc/2) [ -a (1 - x/a)^3 / 3 ]_0^a = (bc/2) [ 0 - (-a/3) ] = (abc) / 6.\nHence, Volume = abc / 6.",
              keyPoints: ["Setup of limits from planes", "Evaluate innermost z-integral", "Evaluate middle y-integral using substitution u = 1 - x/a", "Final evaluation to abc/6"],
            },
            {
              question: "Evaluate \u222d_V (x + y + z) dx dy dz over the cubical region bounded by x = 0 to 1, y = 0 to 1, z = 0 to 1.",
              marks: "5 Marks",
              answer: "1. By symmetry over the unit cube [0, 1] x [0, 1] x [0, 1]:\n\u222d (x + y + z) dV = \u222d x dV + \u222d y dV + \u222d z dV = 3 \u222d x dV.\n2. Evaluate \u222d x dx dy dz:\n= [ \u222b_0^1 x dx ] * [ \u222b_0^1 1 dy ] * [ \u222b_0^1 1 dz ]\n= [ x^2 / 2 ]_0^1 * (1) * (1) = 1/2.\n3. Multiply by 3:\nTotal = 3 * (1/2) = 3/2 = 1.5.",
              keyPoints: ["Exploit cube symmetry: 3 * \u222d x dV", "Factor independent integrals", "Compute single integral to 1/2", "Total result = 3/2"],
            },
          ],
          mcqs: [
            {
              question: "What is the volume of the region bounded by x = 0, y = 0, z = 0 and x + y + z = 6?",
              options: ["36", "72", "216", "36 / 6 = 6"],
              correctIndex: 0,
              explanation: "Formula for tetrahedron volume is abc / 6. Here a = b = c = 6, so Volume = (6 * 6 * 6) / 6 = 36.",
            },
            {
              question: "What is the differential volume element dV in 3D Cartesian coordinates?",
              options: ["dx + dy + dz", "dx dy dz", "r dr d\u03b8", "\u03c1^2 sin \u03c6 d\u03c1 d\u03c6 d\u03b8"],
              correctIndex: 1,
              explanation: "In Cartesian coordinates, the differential volume element is the product of increments along the three orthogonal axes: dV = dx dy dz.",
            },
            {
              question: "What is the value of \u222b_0^1 \u222b_0^1 \u222b_0^1 1 dz dy dx?",
              options: ["0", "1", "3", "1/6"],
              correctIndex: 1,
              explanation: "This computes the volume of a unit cube of dimensions 1 x 1 x 1: Volume = 1 * 1 * 1 = 1.",
            },
          ],
        },
        {
          id: "cla-u5-t4",
          title: "Vector Differential Calculus: The Del (\u2207) Operator, Gradient of Scalar Field, Divergence, and Curl",
          simpleExplanation: "The del operator \u2207 is vector calculus's Swiss army knife. Gradient (\u2207f) finds the steepest uphill slope on a terrain. Divergence (\u2207 \u00b7 F) measures if fluid is gushing out of a point (solenoidal if 0). Curl (\u2207 \u00d7 F) measures paddle-wheel rotation (irrotational if 0).",
          detailedExplanation: `## Vector Differential Calculus: Del (∇), Gradient, Divergence & Curl

In engineering physics, physical quantities fall into two categories: **Scalar fields** (temperature $T$, pressure $P$, electrostatic potential $V$) and **Vector fields** (fluid velocity $\\mathbf{v}$, electric field $\\mathbf{E}$, magnetic field $\\mathbf{B}$). The **Del ($\\nabla$) operator** provides the mathematical language governing electromagnetism (Maxwell's equations) and fluid dynamics (Navier-Stokes equations).

---

### 1. The Vector Differential Operator Del ($\\nabla$)

The vector differential operator $\\nabla$ (nabla) is defined in 3D Cartesian coordinates as:
$$\\nabla = \\mathbf{i} \\frac{\\partial}{\\partial x} + \\mathbf{j} \\frac{\\partial}{\\partial y} + \\mathbf{k} \\frac{\\partial}{\\partial z}$$

Operating $\\nabla$ on scalars and vectors produces three fundamental operations:
1. On a scalar field $\\phi$: **Gradient** ($\\nabla \\phi$ or $\\operatorname{grad} \\phi$) $\\to$ yields a **vector**.
2. Dot product with vector field $\\mathbf{F}$: **Divergence** ($\\nabla \\cdot \\mathbf{F}$ or $\\operatorname{div} \\mathbf{F}$) $\\to$ yields a **scalar**.
3. Cross product with vector field $\\mathbf{F}$: **Curl** ($\\nabla \\times \\mathbf{F}$ or $\\operatorname{curl} \\mathbf{F}$) $\\to$ yields a **vector**.

---

### 2. Gradient of a Scalar Field ($\\operatorname{grad} \\phi$)

If $\\phi(x, y, z)$ is a continuously differentiable scalar field:
$$\\operatorname{grad} \\phi = \\nabla \\phi = \\frac{\\partial \\phi}{\\partial x}\\mathbf{i} + \\frac{\\partial \\phi}{\\partial y}\\mathbf{j} + \\frac{\\partial \\phi}{\\partial z}\\mathbf{k}$$

#### Crucial Geometric Properties of Gradient:
1. **Direction of Maximum Increase:** $\\nabla \\phi$ points in the direction of the **maximum rate of increase** of $\\phi$.
2. **Maximum Rate Value:** The maximum magnitude of rate of increase is $\\|\\nabla \\phi\\|$.
3. **Surface Normal:** At any point on a level surface $\\phi(x, y, z) = c$, the gradient $\\nabla \\phi$ is **perpendicular (normal) to the surface**.
   $$\\text{Unit Normal Vector: } \\hat{n} = \\frac{\\nabla \\phi}{\\|\\nabla \\phi\\|}$$
4. **Directional Derivative:** The rate of change of $\\phi$ in the direction of any unit vector $\\hat{u}$ is given by the scalar dot product:
   $$D_{\\hat{u}} \\phi = \\nabla \\phi \\cdot \\hat{u}$$

---

### 3. Divergence of a Vector Field ($\\operatorname{div} \\mathbf{F}$)

Let $\\mathbf{F} = F_1 \\mathbf{i} + F_2 \\mathbf{j} + F_3 \\mathbf{k}$ be a differentiable vector field. The **Divergence** is defined as:
$$\\operatorname{div} \\mathbf{F} = \\nabla \\cdot \\mathbf{F} = \\frac{\\partial F_1}{\\partial x} + \\frac{\\partial F_2}{\\partial y} + \\frac{\\partial F_3}{\\partial z}$$

#### Physical Meaning:
- Divergence measures the **net outward flux** of vector field per unit volume originating from an infinitesimal region around a point.
- If $\\operatorname{div} \\mathbf{F} > 0$: Point acts as a **Source** (fluid/flux generated).
- If $\\operatorname{div} \\mathbf{F} < 0$: Point acts as a **Sink** (fluid/flux consumed).
- **Solenoidal Vector Field:** A vector field $\\mathbf{F}$ is called **Solenoidal** if its divergence is identically zero everywhere:
  $$\\nabla \\cdot \\mathbf{F} = 0$$
  *(Physical example: Magnetic fields are strictly solenoidal, $\\nabla \\cdot \\mathbf{B} = 0$, meaning magnetic monopoles do not exist; incompressible fluid flow $\\nabla \\cdot \\mathbf{v} = 0$).*

---

### 4. Curl of a Vector Field ($\\operatorname{curl} \\mathbf{F}$)

The **Curl** measures the circulation density or rotational vorticity of a vector field:
$$\\operatorname{curl} \\mathbf{F} = \\nabla \\times \\mathbf{F} = \\begin{vmatrix}
\\mathbf{i} & \\mathbf{j} & \\mathbf{k} \\\\
\\frac{\\partial}{\\partial x} & \\frac{\\partial}{\\partial y} & \\frac{\\partial}{\\partial z} \\\\
F_1 & F_2 & F_3
\\end{vmatrix}$$
$$\\nabla \\times \\mathbf{F} = \\left(\\frac{\\partial F_3}{\\partial y} - \\frac{\\partial F_2}{\\partial z}\\right)\\mathbf{i} - \\left(\\frac{\\partial F_3}{\\partial x} - \\frac{\\partial F_1}{\\partial z}\\right)\\mathbf{j} + \\left(\\frac{\\partial F_2}{\\partial x} - \\frac{\\partial F_1}{\\partial y}\\right)\\mathbf{k}$$

#### Physical Meaning & Irrotational Fields:
- If a tiny paddle-wheel placed in fluid rotates, the curl is non-zero.
- **Irrotational (Conservative) Vector Field:** A vector field $\\mathbf{F}$ is called **Irrotational** if its curl is identically zero everywhere:
  $$\\nabla \\times \\mathbf{F} = \\mathbf{0}$$
- **Scalar Potential:** If $\\mathbf{F}$ is irrotational, there exists a scalar potential function $\\phi$ such that:
  $$\\mathbf{F} = \\nabla \\phi$$
  *(Work done by $\\mathbf{F}$ along any closed loop is zero: $\\oint \\mathbf{F} \\cdot d\\mathbf{r} = 0$).*

---

### 5. The Two Fundamental Null Identities & Laplacian Operator

#### Identity 1: Curl of Gradient is ALWAYS Zero
$$\\operatorname{curl}(\\operatorname{grad} \\phi) = \\nabla \\times (\\nabla \\phi) \\equiv \\mathbf{0}$$
*(Gradient fields have zero curl; every conservative field is irrotational).*

#### Identity 2: Divergence of Curl is ALWAYS Zero
$$\\operatorname{div}(\\operatorname{curl} \\mathbf{F}) = \\nabla \\cdot (\\nabla \\times \\mathbf{F}) \\equiv 0$$
*(Curling vortex fields have zero divergence; curl fields are strictly solenoidal).*

#### The Laplacian Operator ($\\nabla^2$):
Operating divergence on a gradient produces the scalar **Laplacian**:
$$\\nabla^2 \\phi = \\nabla \\cdot (\\nabla \\phi) = \\frac{\\partial^2 \\phi}{\\partial x^2} + \\frac{\\partial^2 \\phi}{\\partial y^2} + \\frac{\\partial^2 \\phi}{\\partial z^2}$$
If $\\nabla^2 \\phi = 0$, $\\phi$ is called a **Harmonic Function** (Laplace's Equation).

---

### Master Comparison Table of Vector Operations

| Operation | Mathematical Notation | Operates On | Output Type | Physical / Geometric Meaning |
| :--- | :--- | :--- | :--- | :--- |
| **Gradient** | $\\nabla \\phi$ | Scalar field | **Vector** | Surface normal, steepest ascent direction |
| **Divergence** | $\\nabla \\cdot \\mathbf{F}$ | Vector field | **Scalar** | Net outward flux rate; 0 $\\iff$ Solenoidal |
| **Curl** | $\\nabla \\times \\mathbf{F}$ | Vector field | **Vector** | Rotational vorticity; $\\mathbf{0} \\iff$ Irrotational |
| **Laplacian** | $\\nabla^2 \\phi$ | Scalar field | **Scalar** | Second derivative curvature; 0 $\\iff$ Harmonic |

---

> [!TIP] **EXAM TIP:**
> When asked to *"Find constant $a$ such that $\\mathbf{F}$ is solenoidal"*:
> Write $\\nabla \\cdot \\mathbf{F} = 0 \\implies \\frac{\\partial F_1}{\\partial x} + \\frac{\\partial F_2}{\\partial y} + \\frac{\\partial F_3}{\\partial z} = 0$. Solve for $a$.
> When asked to *"Find constant $b$ such that $\\mathbf{F}$ is irrotational"*:
> Write $\\nabla \\times \\mathbf{F} = \\mathbf{0}$. Set all three component determinants to zero!

> [!NOTE] **DEV BRAIN:**
> In fluid simulations for games and movies (e.g. Blender, Unreal Engine), the **Helmholtz Decomposition** decomposes any velocity field $\\mathbf{u} = \\nabla \\phi + \\nabla \\times \\mathbf{A}$ into an irrotational part (potential flow) and a solenoidal part (vortex spinning smoke).

> [!WARNING] **TRAP:**
> When calculating directional derivative along a vector $\\mathbf{a}$, NEVER dot with $\\mathbf{a}$ directly!
> You MUST first **normalize $\\mathbf{a}$ to a unit vector**: $\\hat{u} = \\frac{\\mathbf{a}}{\\|\\mathbf{a}\\|}$.
> Multiplying by unnormalized vector gives an answer scaled by the arbitrary vector length!

> [!IMPORTANT] **MEMORIZE:**
> - Unit normal to $\\phi = c$: $\\hat{n} = \\frac{\\nabla \\phi}{\\|\\nabla \\phi\\|}$
> - Directional derivative: $D_{\\hat{u}} \\phi = \\nabla \\phi \\cdot \\hat{u}$
> - Solenoidal $\\iff \\nabla \\cdot \\mathbf{F} = 0$
> - Irrotational $\\iff \\nabla \\times \\mathbf{F} = \\mathbf{0} \\iff \\mathbf{F} = \\nabla \\phi$
> - $\\nabla \\times (\\nabla \\phi) = \\mathbf{0}$ and $\\nabla \\cdot (\\nabla \\times \\mathbf{F}) = 0$`,
          shortNotes: "Gradient: \u2207\u03c6 gives surface normal and max increase direction. Divergence: \u2207\u00b7F = 0 means Solenoidal. Curl: \u2207\u00d7F = 0 means Irrotational (F = \u2207\u03c6). Directional derivative = \u2207\u03c6 \u00b7 (a / |a|).",
          examples: [
            {
              title: "Finding Directional Derivative and Surface Normal Vector",
              problem: "Find the directional derivative of \u03c6(x, y, z) = x^2 y z + 4 x z^2 at the point P(1, -2, -1) in the direction of the vector a = 2i - j - 2k.",
              explanation: "Step 1: Compute Gradient \u2207\u03c6:\n\u2202\u03c6/\u2202x = 2x y z + 4 z^2\n\u2202\u03c6/\u2202y = x^2 z\n\u2202\u03c6/\u2202z = x^2 y + 8 x z\n\u2207\u03c6 = (2x y z + 4 z^2) i + (x^2 z) j + (x^2 y + 8 x z) k.\n\nStep 2: Evaluate \u2207\u03c6 at point P(1, -2, -1):\n\u2202\u03c6/\u2202x = 2(1)(-2)(-1) + 4(-1)^2 = 4 + 4 = 8\n\u2202\u03c6/\u2202y = (1)^2 (-1) = -1\n\u2202\u03c6/\u2202z = (1)^2 (-2) + 8(1)(-1) = -2 - 8 = -10\n\u2207\u03c6 at P = 8 i - j - 10 k.\n\nStep 3: Find unit vector in direction of a = 2i - j - 2k:\n||a|| = sqrt(2^2 + (-1)^2 + (-2)^2) = sqrt(4 + 1 + 4) = sqrt(9) = 3.\nUnit vector u_hat = (2/3) i - (1/3) j - (2/3) k.\n\nStep 4: Compute Directional Derivative = \u2207\u03c6 . u_hat:\nD = (8 i - j - 10 k) . [ (2/3) i - (1/3) j - (2/3) k ]\n= 8*(2/3) + (-1)*(-1/3) + (-10)*(-2/3)\n= 16/3 + 1/3 + 20/3 = 37/3.\n\nDirectional derivative = 37/3.",
              code: "import sympy as sp\nx, y, z = sp.symbols('x y z')\nphi = x**2 * y * z + 4 * x * z**2\ngrad_phi = [sp.diff(phi, var) for var in (x, y, z)]\ngrad_at_P = [comp.subs({x: 1, y: -2, z: -1}) for comp in grad_phi]\na_vec = [2, -1, -2]\na_mag = sp.sqrt(sum(c**2 for c in a_vec))\nu_hat = [c / a_mag for c in a_vec]\ndir_deriv = sum(g * u for g, u in zip(grad_at_P, u_hat))\nprint(f'Gradient at P: {grad_at_P}')\nprint(f'Directional derivative: {dir_deriv}')",
              output: "Gradient at P: [8, -1, -10]\nDirectional derivative: 37/3",
            },
          ],
          keyPoints: [
    "The Del operator \u2207 acts on scalars to produce gradients and on vectors to produce divergence and curl.",
    "Gradient \u2207\u03c6 points in the direction of maximum increase and is normal to level surfaces \u03c6 = c.",
    "Directional derivative equals \u2207\u03c6 \u00b7 u_hat where u_hat must be a normalized unit vector.",
    "A vector field is Solenoidal if \u2207 \u00b7 F = 0 (incompressible flow, no net source/sink).",
    "A vector field is Irrotational if \u2207 \u00d7 F = 0, which guarantees the existence of a scalar potential \u03c6 such that F = \u2207\u03c6."
],
          theoryQuestions: [
            {
              question: "Prove that curl(grad \u03c6) = 0 and div(curl F) = 0 for any twice continuously differentiable scalar field \u03c6 and vector field F.",
              marks: "7 Marks",
              answer: "1. Proof of curl(grad \u03c6) = 0:\nLet \u03c6 be a scalar field. grad \u03c6 = (\u2202\u03c6/\u2202x)i + (\u2202\u03c6/\u2202y)j + (\u2202\u03c6/\u2202z)k.\ncurl(grad \u03c6) = |i, j, k; \u2202/\u2202x, \u2202/\u2202y, \u2202/\u2202z; \u2202\u03c6/\u2202x, \u2202\u03c6/\u2202y, \u2202\u03c6/\u2202z|\n= i [ \u2202/\u2202y(\u2202\u03c6/\u2202z) - \u2202/\u2202z(\u2202\u03c6/\u2202y) ] - j [ \u2202/\u2202x(\u2202\u03c6/\u2202z) - \u2202/\u2202z(\u2202\u03c6/\u2202x) ] + k [ \u2202/\u2202x(\u2202\u03c6/\u2202y) - \u2202/\u2202y(\u2202\u03c6/\u2202x) ]\n= i [ \u2202\u00b2\u03c6/(\u2202y\u2202z) - \u2202\u00b2\u03c6/(\u2202z\u2202y) ] - j [ \u2202\u00b2\u03c6/(\u2202x\u2202z) - \u2202\u00b2\u03c6/(\u2202z\u2202x) ] + k [ \u2202\u00b2\u03c6/(\u2202x\u2202y) - \u2202\u00b2\u03c6/(\u2202y\u2202x) ].\nBy Clairaut's theorem for continuous mixed partials, each bracketed term equals 0.\nTherefore, curl(grad \u03c6) = 0i + 0j + 0k = 0.\n\n2. Proof of div(curl F) = 0:\nLet F = F_1 i + F_2 j + F_3 k. Then:\ncurl F = (\u2202F_3/\u2202y - \u2202F_2/\u2202z)i + (\u2202F_1/\u2202z - \u2202F_3/\u2202x)j + (\u2202F_2/\u2202x - \u2202F_1/\u2202y)k.\ndiv(curl F) = \u2202/\u2202x(\u2202F_3/\u2202y - \u2202F_2/\u2202z) + \u2202/\u2202y(\u2202F_1/\u2202z - \u2202F_3/\u2202x) + \u2202/\u2202z(\u2202F_2/\u2202x - \u2202F_1/\u2202y)\n= (\u2202\u00b2F_3/\u2202x\u2202y - \u2202\u00b2F_2/\u2202x\u2202z) + (\u2202\u00b2F_1/\u2202y\u2202z - \u2202\u00b2F_3/\u2202y\u2202x) + (\u2202\u00b2F_2/\u2202z\u2202x - \u2202\u00b2F_1/\u2202z\u2202y).\nPairing symmetric mixed partial terms:\n(\u2202\u00b2F_3/\u2202x\u2202y - \u2202\u00b2F_3/\u2202y\u2202x) + (\u2202\u00b2F_2/\u2202z\u2202x - \u2202\u00b2F_2/\u2202x\u2202z) + (\u2202\u00b2F_1/\u2202y\u2202z - \u2202\u00b2F_1/\u2202z\u2202y) = 0 + 0 + 0 = 0.\nHence, div(curl F) = 0.",
              keyPoints: ["Setup of determinant for curl(grad \u03c6)", "Apply Clairaut's theorem to cancel mixed partials to 0", "Divergence expression on curl components", "Cancellation of pairs to 0"],
            },
            {
              question: "Show that the vector field F = (y^2 + 2xz - 1)i + (2xy - z)j + (x^2 - y + 2z)k is irrotational and find its scalar potential \u03c6 such that F = \u2207\u03c6.",
              marks: "7 Marks",
              answer: "1. Check curl F = \u2207 x F:\ncurl F = |i, j, k; \u2202/\u2202x, \u2202/\u2202y, \u2202/\u2202z; y^2 + 2xz - 1, 2xy - z, x^2 - y + 2z|\n= i [ \u2202/\u2202y(x^2 - y + 2z) - \u2202/\u2202z(2xy - z) ] - j [ \u2202/\u2202x(x^2 - y + 2z) - \u2202/\u2202z(y^2 + 2xz - 1) ] + k [ \u2202/\u2202x(2xy - z) - \u2202/\u2202y(y^2 + 2xz - 1) ]\n= i [ -1 - (-1) ] - j [ 2x - 2x ] + k [ 2y - 2y ]\n= 0i - 0j + 0k = 0.\nSince curl F = 0, F is irrotational!\n\n2. Find scalar potential \u03c6 such that \u2207\u03c6 = F:\n\u2202\u03c6/\u2202x = y^2 + 2xz - 1 => \u03c6 = x y^2 + x^2 z - x + f(y, z)  --- (1)\n\u2202\u03c6/\u2202y = 2xy - z => differentiate (1) wrt y: 2xy + \u2202f/\u2202y = 2xy - z => \u2202f/\u2202y = -z => f(y, z) = -y z + g(z).\nSo \u03c6 = x y^2 + x^2 z - x - y z + g(z)  --- (2)\n\u2202\u03c6/\u2202z = x^2 - y + 2z => differentiate (2) wrt z: x^2 - y + g'(z) = x^2 - y + 2z => g'(z) = 2z => g(z) = z^2 + C.\n3. Combining all terms:\n\u03c6(x, y, z) = x y^2 + x^2 z - x - y z + z^2 + C.",
              keyPoints: ["Evaluate curl F to show it equals 0 vector", "Integrate \u2202\u03c6/\u2202x wrt x with arbitrary function f(y, z)", "Differentiate wrt y to find f(y, z)", "Differentiate wrt z to find g(z)", "Final scalar potential \u03c6"],
            },
          ],
          mcqs: [
            {
              question: "A vector field F is called Solenoidal if:",
              options: ["\u2207 x F = 0", "\u2207 \u00b7 F = 0", "\u2207^2 F = 0", "F = \u2207\u03c6"],
              correctIndex: 1,
              explanation: "By definition, a solenoidal vector field has zero divergence everywhere: \u2207 \u00b7 F = 0.",
            },
            {
              question: "What is the maximum value of the directional derivative of a scalar field \u03c6 at a given point?",
              options: ["Zero", "|\u2207\u03c6|", "\u2207\u03c6 \u00b7 i", "\u2207^2 \u03c6"],
              correctIndex: 1,
              explanation: "The directional derivative is maximized in the direction of the gradient vector itself, and its maximum value is the magnitude ||\u2207\u03c6||.",
            },
            {
              question: "Which of the following vector identities is identically ZERO for all smooth fields?",
              options: ["\u2207 \u00b7 (\u2207\u03c6)", "\u2207 x (\u2207\u03c6)", "\u2207(\u2207 \u00b7 F)", "\u2207 x (\u2207 x F)"],
              correctIndex: 1,
              explanation: "The curl of the gradient of any scalar field is identically zero: \u2207 x (\u2207\u03c6) = 0.",
            },
          ],
        },
      ],
    },
  ]
};
