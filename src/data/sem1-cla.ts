import type { Subject } from './types';

export const sem1ClaSubject: Subject = {
  id: 'sem1-cla',
  name: 'Calculus & Linear Algebra',
  code: 'MATH101',
  color: 'bg-indigo-600',
  icon: 'calculator',
  description: 'Engineering Mathematics 1 — Differential Calculus, Partial Derivatives & Jacobians, Matrix Rank, Eigenvalues, and Multiple Integrals',
  semester: 1,
  units: [
    {
      id: 'cla-u1',
      title: 'Unit 1: Differential Calculus & Successive Differentiation',
      description: "Indeterminate forms, L'Hôpital's rule, nth derivative, Leibniz's theorem, and Taylor/Maclaurin series expansions.",
      topics: [
        {
          id: 'cla-t1',
          title: "Indeterminate Forms, L'Hôpital's Rule & Leibniz's Theorem",
          simpleExplanation: "When limits result in 0/0 or ∞/∞, L'Hôpital's rule allows evaluating them by differentiating numerator and denominator. Leibniz's theorem gives the nth derivative of the product of two functions.",
          detailedExplanation: `### Indeterminate Forms & L'Hôpital's Rule

When evaluating $\\lim_{x \\to a} \\frac{f(x)}{g(x)}$ yields the indeterminate forms $\\frac{0}{0}$ or $\\frac{\\infty}{\\infty}$:
$$\\lim_{x \\to a} \\frac{f(x)}{g(x)} = \\lim_{x \\to a} \\frac{f'(x)}{g'(x)}$$
*(Provided the limit of the ratio of derivatives exists).*

Other forms ($0 \\cdot \\infty$, $\\infty - \\infty$, $0^0$, $1^\\infty$, $\\infty^0$) must first be converted into $\\frac{0}{0}$ or $\\frac{\\infty}{\\infty}$ using algebraic inversion or logarithmic transformation.

### Standard $n$-th Derivatives:
1. $y = e^{ax} \\implies y_n = a^n e^{ax}$
2. $y = (ax + b)^m \\implies y_n = m(m-1)\\dots(m-n+1) a^n (ax + b)^{m-n}$
3. $y = \\sin(ax + b) \\implies y_n = a^n \\sin\\left(ax + b + \\frac{n\\pi}{2}\\right)$
4. $y = \\cos(ax + b) \\implies y_n = a^n \\cos\\left(ax + b + \\frac{n\\pi}{2}\\right)$

### Leibniz's Theorem for Product Differentiation:
If $u$ and $v$ are functions of $x$ possessing derivatives up to order $n$:
$$(uv)_n = \\sum_{r=0}^{n} \\binom{n}{r} u_{n-r} v_r = u_n v + n u_{n-1} v_1 + \\frac{n(n-1)}{2!} u_{n-2} v_2 + \\dots + u v_n$$

> [!TIP] **EXAM TIP:**
> When applying Leibniz's theorem to $y = x^2 e^{3x}$, always assign $v = x^2$ because its higher derivatives vanish after $v_2 = 2$ ($v_3 = 0, v_4 = 0$), drastically simplifying the calculation!`,
          shortNotes: "L'Hopital: diff top and bottom for 0/0 or ∞/∞. Leibniz: (uv)_n = Σ C(n,r) u_{n-r} v_r. Assign polynomial to v so higher derivatives vanish.",
          examples: [
            {
              title: "Evaluating 0/0 Form Using L'Hôpital's Rule",
              problem: "Evaluate limit of (sin x - x) / x^3 as x approaches 0.",
              explanation: "Direct substitution yields 0/0. Apply L'Hôpital's rule repeatedly until non-zero denominator is reached.",
              code: `# Limit as x -> 0 of (sin(x) - x) / x^3
# Step 1: Differentiate top and bottom -> (cos(x) - 1) / (3*x^2) [Still 0/0]
# Step 2: Differentiate again -> -sin(x) / (6*x) [Still 0/0]
# Step 3: Differentiate again -> -cos(x) / 6
# Evaluating at x = 0: -cos(0) / 6 = -1/6`,
              output: 'Limit = -1/6 = -0.1667'
            }
          ],
          keyPoints: [
            "L'Hôpital's rule strictly applies only to 0/0 or ∞/∞ forms.",
            "Forms like 1^∞ are solved by taking the natural logarithm: L = lim ln y.",
            "Leibniz's theorem mirrors the Binomial Theorem for differentiation of products.",
            "Taylor series expands f(x) about x = a: f(x) = Σ [f^(n)(a) / n!] (x - a)^n."
          ],
          mcqs: [
            {
              question: "What is the nth derivative of sin(ax + b)?",
              options: [
                "a^n sin(ax + b)",
                "a^n sin(ax + b + nπ/2)",
                "a^n cos(ax + b)",
                "n! a^n sin(ax + b)"
              ],
              correctIndex: 1,
              explanation: "Each differentiation of sine advances the phase by π/2 and multiplies by a, yielding a^n sin(ax + b + nπ/2)."
            }
          ]
        }
      ]
    },
    {
      id: 'cla-u2',
      title: 'Unit 2: Multivariable Calculus & Partial Differentiation',
      description: "Partial derivatives, Euler's theorem for homogeneous functions, Jacobians, and multivariable maxima/minima.",
      topics: [
        {
          id: 'cla-t2',
          title: "Partial Derivatives, Euler's Theorem & Jacobians",
          simpleExplanation: "When a function depends on multiple variables (e.g. z = f(x, y)), a partial derivative measures the rate of change with respect to one variable while holding all other variables constant. The Jacobian measures how coordinate transformations scale volumes.",
          detailedExplanation: `### Partial Differentiation
For $z = f(x, y)$:
- $\\frac{\\partial z}{\\partial x} = \\lim_{\\Delta x \\to 0} \\frac{f(x + \\Delta x, y) - f(x, y)}{\\Delta x}$ (treating $y$ as a constant).
- $\\frac{\\partial z}{\\partial y} = \\lim_{\\Delta y \\to 0} \\frac{f(x, y + \\Delta y) - f(x, y)}{\\Delta y}$ (treating $x$ as a constant).

### Euler's Theorem on Homogeneous Functions:
A function $f(x, y)$ is homogeneous of degree $n$ if $f(tx, ty) = t^n f(x, y)$.
**Theorem**: If $u = f(x, y)$ is a homogeneous function of degree $n$, then:
$$x \\frac{\\partial u}{\\partial x} + y \\frac{\\partial u}{\\partial y} = n u$$
For second-order derivatives:
$$x^2 \\frac{\\partial^2 u}{\\partial x^2} + 2xy \\frac{\\partial^2 u}{\\partial x \\partial y} + y^2 \\frac{\\partial^2 u}{\\partial y^2} = n(n - 1) u$$

### Jacobians (Transformation Determinants):
If $u = u(x, y)$ and $v = v(x, y)$, the Jacobian of $(u, v)$ with respect to $(x, y)$ is:
$$J = \\frac{\\partial(u, v)}{\\partial(x, y)} = \\begin{vmatrix} \\frac{\\partial u}{\\partial x} & \\frac{\\partial u}{\\partial y} \\\\[6pt] \\frac{\\partial v}{\\partial x} & \\frac{\\partial v}{\\partial y} \\end{vmatrix}$$

**Reciprocal Property**:
$$J \\cdot J' = \\frac{\\partial(u, v)}{\\partial(x, y)} \\cdot \\frac{\\partial(x, y)}{\\partial(u, v)} = 1$$`,
          shortNotes: "Euler's theorem: x(∂u/∂x) + y(∂u/∂y) = nu for homogeneous degree n. Jacobian J = |∂u/∂x ∂u/∂y; ∂v/∂x ∂v/∂y| with J * J' = 1.",
          examples: [
            {
              title: "Jacobian of Cartesian to Polar Coordinates",
              problem: "Calculate the Jacobian ∂(x, y) / ∂(r, θ) where x = r cos θ and y = r sin θ.",
              explanation: "Compute partial derivatives of x and y with respect to r and θ, then evaluate determinant.",
              code: `# x = r * cos(theta), y = r * sin(theta)
# dx/dr = cos(theta),      dx/dtheta = -r * sin(theta)
# dy/dr = sin(theta),      dy/dtheta = r * cos(theta)
# J = (cos * r*cos) - (-r*sin * sin) = r*(cos^2 + sin^2) = r`,
              output: 'Jacobian ∂(x, y) / ∂(r, θ) = r'
            }
          ],
          keyPoints: [
            "Euler's theorem dramatically simplifies partial derivative sums for homogeneous functions.",
            "Jacobian represents the local area/volume scaling factor during coordinate transformations.",
            "If the Jacobian of several functions is identically zero, the functions are functionally dependent.",
            "Lagrange multipliers solve constrained optimization problems: ∇f = λ∇g."
          ],
          mcqs: [
            {
              question: "If u = (x^2 + y^2) / (x + y), what is x(∂u/∂x) + y(∂u/∂y)?",
              options: ["0", "u", "2u", "-u"],
              correctIndex: 1,
              explanation: "Degree of numerator is 2, denominator is 1. Homogeneous degree n = 2 - 1 = 1. By Euler's theorem, x(∂u/∂x) + y(∂u/∂y) = 1 · u = u."
            }
          ]
        }
      ]
    },
    {
      id: 'cla-u3',
      title: 'Unit 3: Matrices & Systems of Linear Equations',
      description: 'Matrix rank, Echelon form, Normal form, consistency of linear equations, Gauss Elimination and Gauss-Jordan methods.',
      topics: [
        {
          id: 'cla-t3',
          title: 'Matrix Rank, Echelon Form & Consistency of Linear Systems',
          simpleExplanation: 'The rank of a matrix is the number of non-zero rows after row reduction. A system of linear equations AX = B has solutions only when rank(A) equals rank([A|B]).',
          detailedExplanation: `### Rank of a Matrix

The rank $\\rho(A)$ of an $m \\times n$ matrix $A$ is the maximum number of linearly independent row or column vectors:
- **Row Echelon Form**:
  1. All non-zero rows are above any rows of all zeros.
  2. The leading coefficient (pivot) of a non-zero row is strictly to the right of the leading coefficient of the row above it.
  3. $\\text{Rank } \\rho(A) = \\text{number of non-zero rows in Echelon form}$.

### Consistency Criteria (Rouché-Capelli Theorem):
For the linear system $AX = B$ with augmented matrix $[A|B]$ and $n$ unknowns:
1. **Inconsistent (No Solution)**: $\\rho(A) \\neq \\rho([A|B])$.
2. **Consistent with Unique Solution**: $\\rho(A) = \\rho([A|B]) = n$ (number of unknowns).
3. **Consistent with Infinitely Many Solutions**: $\\rho(A) = \\rho([A|B]) = r < n$ (there are $n - r$ free variables/parameters).

### Homogeneous System ($AX = 0$):
- Always consistent since $X = 0$ (trivial solution) always satisfies it.
- Has non-trivial (non-zero) solutions if and only if $\\rho(A) < n$ (i.e. $\\det(A) = 0$ for square matrices).`,
          shortNotes: "Rank = number of non-zero rows in Echelon form. AX = B: No solution if rank(A) < rank(A|B). Unique if rank(A) = rank(A|B) = n. Infinite if rank < n.",
          examples: [
            {
              title: "Testing System Consistency using Rank",
              problem: "Determine consistency of: x + y + z = 6, x + 2y + 3z = 10, x + 2y + λz = μ.",
              explanation: "Row reduce the augmented matrix [A|B] to upper triangular form and inspect the last row.",
              code: `# Row operations on [A|B]:
# [ 1  1   1 | 6 ]
# [ 1  2   3 | 10] -> R2 - R1: [0 1 2 | 4]
# [ 1  2   λ | μ ] -> R3 - R2: [0 0 λ-3 | μ-10]
# Case 1: If λ = 3 and μ != 10 -> Rank(A)=2, Rank(A|B)=3 -> NO SOLUTION
# Case 2: If λ != 3 -> Rank(A) = Rank(A|B) = 3 -> UNIQUE SOLUTION
# Case 3: If λ = 3 and μ = 10 -> Rank(A) = Rank(A|B) = 2 -> INFINITELY MANY SOLUTIONS`,
              output: 'λ=3, μ≠10: No Solution | λ≠3: Unique | λ=3, μ=10: Infinite'
            }
          ],
          keyPoints: [
            'Elementary row operations do not alter the rank of a matrix.',
            'A system AX = B is consistent if and only if rank(A) = rank(A|B).',
            'Homogeneous system AX = 0 has non-trivial solutions iff det(A) = 0.',
            'Normal form [I_r 0; 0 0] explicitly reveals rank r via both row and column operations.'
          ],
          mcqs: [
            {
              question: 'If a linear system with 3 equations and 3 unknowns has rank(A) = 2 and rank([A|B]) = 3, the system has:',
              options: ['A unique solution', 'Infinitely many solutions', 'No solution', 'Trivial solution only'],
              correctIndex: 2,
              explanation: 'When rank(A) ≠ rank([A|B]), the system is inconsistent and has no solution.'
            }
          ]
        }
      ]
    },
    {
      id: 'cla-u4',
      title: 'Unit 4: Eigenvalues, Eigenvectors & Cayley-Hamilton Theorem',
      description: 'Characteristic equation, eigenvalue properties, Cayley-Hamilton theorem, and matrix diagonalization.',
      topics: [
        {
          id: 'cla-t4',
          title: 'Eigenvalues, Eigenvectors & Cayley-Hamilton Theorem',
          simpleExplanation: 'When a matrix acts on an eigenvector, it only scales it by a constant factor called the eigenvalue (AX = λX). The Cayley-Hamilton theorem states that every square matrix satisfies its own characteristic equation.',
          detailedExplanation: `### Eigenvalues & Eigenvectors

For an $n \\times n$ square matrix $A$:
$$AX = \\lambda X \\iff (A - \\lambda I)X = 0$$
For non-zero vector solutions $X \\neq 0$, the characteristic determinant must vanish:
$$\\det(A - \\lambda I) = 0$$
- The roots $\\lambda_1, \\lambda_2, \\dots, \\lambda_n$ are the **Eigenvalues**.
- The non-zero vectors $X_i$ satisfying $(A - \\lambda_i I)X_i = 0$ are the corresponding **Eigenvectors**.

### Fundamental Eigenvalue Properties:
1. **Sum of Eigenvalues** = $\\text{Trace of } A$ (sum of main diagonal elements).
2. **Product of Eigenvalues** = $\\det(A)$ (determinant of $A$).
3. If $\\lambda$ is an eigenvalue of $A$, then:
   - $A^{-1}$ has eigenvalue $\\frac{1}{\\lambda}$ (if $A$ is invertible).
   - $A^m$ has eigenvalue $\\lambda^m$.
   - $kA$ has eigenvalue $k\\lambda$.
4. Eigenvalues of a triangular or diagonal matrix are simply its **diagonal elements**.

### Cayley-Hamilton Theorem:
**"Every square matrix satisfies its own characteristic equation."**

If the characteristic polynomial is:
$$p(\\lambda) = \\lambda^n + c_{n-1}\\lambda^{n-1} + \\dots + c_1\\lambda + c_0 = 0$$
Then replacing $\\lambda$ with matrix $A$ yields the zero matrix:
$$A^n + c_{n-1}A^{n-1} + \\dots + c_1 A + c_0 I = O$$

#### Finding Matrix Inverse using Cayley-Hamilton:
Multiplying throughout by $A^{-1}$:
$$A^{-1} = -\\frac{1}{c_0} \\left(A^{n-1} + c_{n-1}A^{n-2} + \\dots + c_1 I\\right)$$`,
          shortNotes: 'det(A - λI) = 0 gives eigenvalues. Sum(λ) = Trace(A), Product(λ) = det(A). Cayley-Hamilton: matrix satisfies its own characteristic equation; used to find A^-1.',
          examples: [
            {
              title: 'Eigenvalues & Inverse via Cayley-Hamilton',
              problem: 'Find eigenvalues of A = [[2, 1], [1, 2]] and express A^-1 using Cayley-Hamilton.',
              explanation: 'Characteristic eq: det(A - λI) = λ^2 - Trace*λ + det = 0.',
              code: `# Trace = 2 + 2 = 4, Det = 2*2 - 1*1 = 3
# Characteristic Eq: λ^2 - 4λ + 3 = 0
# Roots: (λ - 1)(λ - 3) = 0 -> λ1 = 1, λ2 = 3
# By Cayley-Hamilton: A^2 - 4A + 3I = O
# Multiply by A^-1: A - 4I + 3 A^-1 = 0
# A^-1 = (1/3)(4I - A)`,
              output: 'Eigenvalues: 1, 3 | A^-1 = (4I - A)/3'
            }
          ],
          keyPoints: [
            'Sum of eigenvalues equals trace; product of eigenvalues equals determinant.',
            'Cayley-Hamilton theorem enables computing matrix powers (A^10) and inverse A^-1 without row operations.',
            'Eigenvectors corresponding to distinct eigenvalues of a symmetric matrix are mutually orthogonal.',
            'A matrix is diagonalizable if it possesses n linearly independent eigenvectors.'
          ],
          mcqs: [
            {
              question: 'If a 3x3 matrix has eigenvalues 2, 3, and 5, what is its determinant?',
              options: ['10', '30', '15', '25'],
              correctIndex: 1,
              explanation: 'The determinant of a matrix equals the product of its eigenvalues: 2 × 3 × 5 = 30.'
            }
          ]
        }
      ]
    },
    {
      id: 'cla-u5',
      title: 'Unit 5: Multiple Integrals & Vector Calculus',
      description: 'Double integrals, change of order of integration, triple integrals, gradient, divergence, curl, and solenoidal fields.',
      topics: [
        {
          id: 'cla-t5',
          title: 'Multiple Integrals, Gradient, Divergence & Curl',
          simpleExplanation: 'Double and triple integrals compute areas and volumes in 2D and 3D. Vector calculus uses the del operator ∇ to measure slope (gradient), outflow (divergence), and rotation (curl).',
          detailedExplanation: `### Double Integrals & Change of Order

A double integral $\\iint_R f(x, y) \\, dx \\, dy$ computes the volume under the surface $z = f(x, y)$ over region $R$.

### Change of Order of Integration:
Often an integral is difficult or impossible to evaluate in the given order (e.g. $\\int_0^1 \\int_y^1 e^{x^2} \\, dx \\, dy$).
1. Sketch the boundary curves of the region $R$.
2. Convert vertical strips to horizontal strips (or vice versa).
3. Determine new limits: $\\int_0^1 \\int_0^x e^{x^2} \\, dy \\, dx = \\int_0^1 x e^{x^2} \\, dx = \\frac{1}{2}(e - 1)$.

### Vector Differential Operator (\\(\\nabla\\) - Del):
$$\\nabla = \\hat{i}\\frac{\\partial}{\\partial x} + \\hat{j}\\frac{\\partial}{\\partial y} + \\hat{k}\\frac{\\partial}{\\partial z}$$

1. **Gradient (Scalar $\\to$ Vector)**:
   $$\\nabla \\phi = \\hat{i}\\frac{\\partial \\phi}{\\partial x} + \\hat{j}\\frac{\\partial \\phi}{\\partial y} + \\hat{k}\\frac{\\partial \\phi}{\\partial z}$$
   Points in the direction of maximum rate of increase of scalar field $\\phi$. The magnitude is the maximum directional derivative.

2. **Divergence (Vector $\\to$ Scalar)**:
   $$\\text{div } \\vec{F} = \\nabla \\cdot \\vec{F} = \\frac{\\partial F_1}{\\partial x} + \\frac{\\partial F_2}{\\partial y} + \\frac{\\partial F_3}{\\partial z}$$
   - If $\\nabla \\cdot \\vec{F} = 0$, the vector field is **Solenoidal** (incompressible fluid flow).

3. **Curl (Vector $\\to$ Vector)**:
   $$\\text{curl } \\vec{F} = \\nabla \\times \\vec{F} = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\[4pt] \\frac{\\partial}{\\partial x} & \\frac{\\partial}{\\partial y} & \\frac{\\partial}{\\partial z} \\\\[4pt] F_1 & F_2 & F_3 \\end{vmatrix}$$
   - If $\\nabla \\times \\vec{F} = \\vec{0}$, the vector field is **Irrotational** (conservative force field, $\\vec{F} = \\nabla \\phi$).`,
          shortNotes: 'Change order of integration swaps dx dy with new region limits. Grad(φ) = vector slope. Div(F) = 0 is Solenoidal. Curl(F) = 0 is Irrotational.',
          examples: [
            {
              title: 'Testing Solenoidal Vector Field',
              problem: 'Determine if F = (x + 3y)i + (y - 2z)j + (x - 2z)k is solenoidal.',
              explanation: 'Compute div F = dF1/dx + dF2/dy + dF3/dz. If zero, it is solenoidal.',
              code: `# F1 = x + 3y   -> dF1/dx = 1
# F2 = y - 2z   -> dF2/dy = 1
# F3 = x - 2z   -> dF3/dz = -2
# div F = 1 + 1 + (-2) = 0`,
              output: 'div F = 0 -> Field is Solenoidal (Incompressible)'
            }
          ],
          keyPoints: [
            'Changing the order of integration requires re-sketching the integration domain.',
            'Gradient of a scalar field gives a vector normal to the level surface φ(x,y,z) = c.',
            'A vector field with zero divergence is Solenoidal (∇ · F = 0).',
            'A vector field with zero curl is Irrotational (∇ × F = 0) and can be expressed as F = ∇φ.'
          ],
          mcqs: [
            {
              question: 'A vector field F is called solenoidal if:',
              options: ['∇ × F = 0', '∇ · F = 0', '∇²F = 0', '∇F = 0'],
              correctIndex: 1,
              explanation: 'A vector field is solenoidal when its divergence is zero (∇ · F = 0).'
            }
          ]
        }
      ]
    }
  ]
};
