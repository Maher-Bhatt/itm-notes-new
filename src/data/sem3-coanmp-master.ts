import { Subject } from './types';

export const sem3CoanmpMaster: Subject = {
  id: 'sem3-coanmp',
  name: 'Computer Oriented Numerical Methods with Python (COANMP)',
  code: 'COANMP',
  color: 'bg-blue-600',
  icon: 'calculator',
  description: 'Learn numerical methods for solving mathematical problems using computers and Python.',
  semester: 3,
  units: [
    {
      id: 'unit1',
      title: 'Number Systems & Error Analysis',
      description: 'Understanding how computers represent numbers and the errors that arise during computation.',
      topics: [
        {
          id: 'num-systems',
          title: 'Number Systems (Binary, Octal, Hexadecimal conversions)',
          simpleExplanation: 'Computers use different number bases like Binary (base 2), Octal (base 8), and Hexadecimal (base 16) instead of our usual Decimal (base 10) system.',
          detailedExplanation: `
## What are Number Systems?
A number system is a way to represent numbers. We humans use the Decimal system (base 10). But computers use switches that are either ON or OFF, so they use the Binary system (base 2).

> [!IMPORTANT] **MEMORIZE:** 
> - Decimal: Base 10 (0-9)
> - Binary: Base 2 (0-1)
> - Octal: Base 8 (0-7)
> - Hexadecimal: Base 16 (0-9, A-F)

> [!NOTE] **DEV BRAIN:** 
> Think of number systems like text encodings (UTF-8, ASCII). It's the same underlying data, just represented differently for different hardware/software requirements. Hexadecimal is like base64 for binaries—it compresses long binary strings into shorter, human-readable formats!

### Comparisons
| System | Base | Digits Used | Example |
|---|---|---|---|
| Binary | 2 | 0, 1 | 1011 |
| Octal | 8 | 0-7 | 75 |
| Decimal | 10 | 0-9 | 145 |
| Hexadecimal| 16 | 0-9, A-F | 1A3 |

### Conversions
**1. Decimal to Binary:**
Divide the decimal number by 2 repeatedly and note the remainders. Read the remainders from bottom to top.

> [!TIP] **EXAM TIP:**
> Always show your division steps clearly in the exam. Write the final answer with a small subscript 2, like $(1101)_2$. 

**2. Binary to Decimal:**
Multiply each bit by 2 raised to the power of its position (starting from 0 on the right) and add them up.

> [!WARNING] **TRAP:**
> Don't forget that position indices start at **0**, not 1! The rightmost bit is multiplied by $2^0$, not $2^1$.

### Python Code for Conversions
\`\`\`python
# Decimal to Binary, Octal, Hex
decimal_num = 25
print("Binary:", bin(decimal_num)) # Output: 0b11001
print("Octal:", oct(decimal_num))  # Output: 0o31
print("Hexadecimal:", hex(decimal_num)) # Output: 0x19
\`\`\`
\`,
          richContent: \`
### Step-by-Step Trace: Decimal 13 to Binary
| Step | Operation | Quotient | Remainder |
|---|---|---|---|
| 1 | 13 / 2 | 6 | **1** |
| 2 | 6 / 2 | 3 | **0** |
| 3 | 3 / 2 | 1 | **1** |
| 4 | 1 / 2 | 0 | **1** |

Read remainders bottom-up: **1101**
          `,
          shortNotes: 'Decimal = Base 10, Binary = Base 2, Octal = Base 8, Hexadecimal = Base 16. Convert decimal to other bases by repeated division.',
          examples: [
            {
              title: 'Convert 13 to Binary',
              description: '13 / 2 = 6 rem 1, 6 / 2 = 3 rem 0, 3 / 2 = 1 rem 1, 1 / 2 = 0 rem 1. Result: 1101',
              code: 'bin(13) # Returns 0b1101'
            }
          ],
          keyPoints: [
            'Binary uses 0 and 1.',
            'Octal uses 0 to 7.',
            'Hexadecimal uses 0-9 and A-F.',
            'Python provides built-in functions like bin(), oct(), and hex() for conversions.'
          ],
          mcqs: [
            { question: 'Which base is used for Hexadecimal numbers?', options: ['2', '8', '10', '16'], correctIndex: 3, explanation: 'Hexadecimal uses base 16.' },
            { question: 'What is the binary representation of decimal 5?', options: ['101', '111', '100', '110'], correctIndex: 0, explanation: '5/2=2 rem 1, 2/2=1 rem 0, 1/2=0 rem 1 -> 101' },
            { question: 'Which symbol represents 14 in Hexadecimal?', options: ['C', 'D', 'E', 'F'], correctIndex: 2, explanation: 'A=10, B=11, C=12, D=13, E=14.' }
          ]
        },
        {
          id: 'floating-point',
          title: 'Floating Point Representation',
          simpleExplanation: 'How computers store numbers with decimal points (real numbers) using a specific format called floating-point representation.',
          detailedExplanation: `
## Floating Point Representation
Computers cannot store infinite real numbers. They use floating-point representation, which is similar to scientific notation.

> [!IMPORTANT] **MEMORIZE:**
> Floating-point structure = Sign bit + Exponent + Mantissa (Significand).

> [!NOTE] **DEV BRAIN:**
> Think of Floating-Point like string interpolation where the string has a fixed length. You allocate 1 char for sign, 8 chars for the power (exponent), and 23 chars for the actual value (mantissa). If your number needs more chars, it gets cut off (precision loss!).

### Normalization
A floating-point number is normalized if the leading digit of the mantissa is non-zero. Normalization maximizes the precision of the stored number.

> [!TIP] **EXAM TIP:**
> For normalization questions, always shift the decimal point until exactly one non-zero digit is to the left of the decimal, and adjust the exponent accordingly.

### IEEE 754 Standard Comparison
| Precision | Total Bits | Sign Bits | Exponent Bits | Mantissa Bits |
|---|---|---|---|---|
| Single (Float) | 32 | 1 | 8 | 23 |
| Double (Double) | 64 | 1 | 11 | 52 |

> [!WARNING] **TRAP:**
> Don't confuse the Mantissa length for the whole size. Single precision is 32 bits TOTAL, not a 32-bit mantissa!
\`,
          richContent: \`
### Example of Floating Point Storage
Storing $1.23 \\times 10^3$:
- Sign: Positive (0)
- Exponent: Encodes the '3'
- Mantissa: Encodes '123'
          `,
          shortNotes: 'Real numbers are stored as floating-point numbers: Sign, Exponent, and Mantissa. IEEE 754 is the standard.',
          examples: [
            { title: 'Scientific Notation', description: 'The number 123.45 is stored as 0.12345 * 10^3 in normalized decimal floating point.' }
          ],
          keyPoints: [
            'Real numbers use floating-point representation.',
            'It consists of a sign, exponent, and mantissa.',
            'Normalization ensures maximum precision.',
            'IEEE 754 standard defines single and double precision.'
          ],
          mcqs: [
            { question: 'In floating-point representation, what part holds the actual digits of the number?', options: ['Sign', 'Exponent', 'Mantissa', 'Base'], correctIndex: 2, explanation: 'The mantissa holds the significant digits.' },
            { question: 'How many bits are used for the exponent in single precision IEEE 754?', options: ['8', '11', '23', '52'], correctIndex: 0, explanation: 'Single precision uses 8 bits for the exponent.' },
            { question: 'What is the purpose of normalization?', options: ['Save memory', 'Maximize precision', 'Increase speed', 'None'], correctIndex: 1, explanation: 'Normalization maximizes the number of significant digits stored.' }
          ]
        },
        {
          id: 'types-of-errors',
          title: 'Types of Errors',
          simpleExplanation: 'Numerical methods give approximate answers. Errors tell us how far our approximate answer is from the exact true answer.',
          detailedExplanation: `
## Types of Errors in Numerical Computing

> [!IMPORTANT] **MEMORIZE:**
> - Absolute Error = $|True - Approx|$
> - Relative Error = $\\frac{|True - Approx|}{|True|}$
> - Percentage Error = $Relative \\times 100\\%$

> [!NOTE] **DEV BRAIN:**
> Absolute error is like measuring page load time (e.g., "it took 200ms longer"). Relative error is like a performance degradation percentage (e.g., "it was 15% slower"). In large systems, a 200ms delay might be fine (low relative error), but for a 10ms microservice, it's terrible (high relative error).

### Summary Table
| Error Type | Cause | Example |
|---|---|---|
| Absolute | Direct difference | $10 - 9.8 = 0.2$ |
| Relative | Ratio to true value | $0.2 / 10 = 0.02$ |
| Round-off | Limited precision | $\\pi \\approx 3.14$ |
| Truncation| Stopping an infinite process early | Taylor series cut off after 3 terms |

> [!WARNING] **TRAP:**
> Always use the **True** value in the denominator for Relative error, not the Approximate value.

> [!TIP] **EXAM TIP:**
> When asked to calculate errors, write down all formulas first. Showing the formulas guarantees partial marks even if you mess up the final calculator arithmetic.

### Python Code
\`\`\`python
true_val = 10.0
approx_val = 9.8

abs_err = abs(true_val - approx_val)
rel_err = abs_err / abs(true_val)
pct_err = rel_err * 100

print(f"Absolute Error: {abs_err}") # Output: 0.1999999999999993
print(f"Percentage Error: {pct_err}%") # Output: 1.999999999999993%
\`\`\`
\`,
          richContent: \`
### Step-by-Step Trace
True = 3.14159, Approx = 3.14
1. Abs Error = |3.14159 - 3.14| = 0.00159
2. Rel Error = 0.00159 / 3.14159 = 0.000506
3. Pct Error = 0.0506%
          `,
          shortNotes: 'Errors measure inaccuracy. Absolute = |True - Approx|. Relative = Absolute/|True|. Round-off = limited digits. Truncation = stopping an infinite series.',
          examples: [
            { title: 'Error Calculation', description: 'True = 3.14159, Approx = 3.14. Absolute Error = 0.00159.' }
          ],
          keyPoints: [
            'Absolute error is the magnitude of the difference.',
            'Relative error is scaled by the true value.',
            'Round-off happens when dropping decimal places.',
            'Truncation happens when cutting mathematical formulas short.'
          ],
          mcqs: [
            { question: 'Which error occurs when an infinite series is approximated by a finite number of terms?', options: ['Round-off error', 'Truncation error', 'Absolute error', 'Relative error'], correctIndex: 1, explanation: 'Truncation error arises from cutting off an infinite process.' },
            { question: 'What is the formula for Relative Error?', options: ['|True - Approx|', '|True - Approx| / |Approx|', '|True - Approx| / |True|', 'True / Approx'], correctIndex: 2, explanation: 'Relative error is Absolute Error divided by True Value.' },
            { question: 'If True Value is 10 and Approx Value is 9, what is the Percentage Error?', options: ['1%', '10%', '0.1%', '90%'], correctIndex: 1, explanation: 'Absolute = 1. Relative = 1/10 = 0.1. Percentage = 10%.' }
          ]
        },
        {
          id: 'significant-figures',
          title: 'Significant Figures',
          simpleExplanation: 'Significant figures are the digits in a number that carry meaningful information about its precision.',
          detailedExplanation: `
## What are Significant Figures?
Significant figures represent the meaningful digits in a number that contribute to its precision.

> [!IMPORTANT] **MEMORIZE:**
> 1. All non-zero digits are significant.
> 2. Zeros between non-zero digits are significant.
> 3. Leading zeros are NEVER significant.
> 4. Trailing zeros to the right of a decimal ARE significant.

> [!NOTE] **DEV BRAIN:**
> Think of trailing zeros like explicitly typing a variable as a 'float' instead of an 'int'. When you write \`2.500\`, you are explicitly telling the system "I measured this up to 3 decimal places", whereas \`2.5\` implies you only measured up to 1 decimal place. The zeros carry metadata about precision!

> [!WARNING] **TRAP:**
> 0.0045 has **two** significant figures (4 and 5), not four! Leading zeros only act as placeholders. 

### Why do they matter?
If a result is calculated to 10 decimal places, but the input data only had 3 significant figures, most of those 10 decimal places are garbage noise.

> [!TIP] **EXAM TIP:**
> When doing arithmetic, your final answer should have the same number of significant figures as the input with the *fewest* significant figures.
\`,
          richContent: \`
### Example Trace
| Number | Significant Figures | Explanation |
|---|---|---|
| 123 | 3 | All non-zero |
| 1005 | 4 | Trapped zeros count |
| 0.0045 | 2 | Leading zeros ignore |
| 2.500 | 4 | Trailing after decimal counts |
          `,
          shortNotes: 'Non-zero digits, trapped zeros, and trailing zeros after a decimal point are significant. Leading zeros are never significant.',
          examples: [
            { title: 'Counting Sig Figs', description: '0.003040 has 4 significant figures: the 3, the trapped 0, the 4, and the trailing 0.' }
          ],
          keyPoints: [
            'Non-zero digits are always significant.',
            'Zeros between non-zeros are significant.',
            'Leading zeros only locate the decimal point.',
            'Trailing zeros after a decimal point indicate precision.'
          ],
          mcqs: [
            { question: 'How many significant figures are in the number 0.004050?', options: ['3', '4', '6', '7'], correctIndex: 1, explanation: 'Leading zeros are not significant. 4, 0, 5, 0 are significant.' },
            { question: 'How many significant figures are in 1002.0?', options: ['2', '4', '5', '6'], correctIndex: 2, explanation: 'All non-zeros and trapped zeros are significant. Trailing zero after decimal is significant.' },
            { question: 'Which of the following numbers has exactly 3 significant figures?', options: ['0.03', '300', '3.00', '0.30'], correctIndex: 2, explanation: '3.00 has three significant figures due to trailing zeros after decimal.' }
          ]
        }
      ]
    },
    {
      id: 'unit2',
      title: 'Roots of Non-Linear Equations',
      description: 'Methods to find the roots (where the function equals zero) of complex equations.',
      topics: [
        {
          id: 'bisection-method',
          title: 'Bisection Method',
          simpleExplanation: 'A slow but guaranteed way to find a root by repeatedly cutting an interval in half.',
          detailedExplanation: `
## The Bisection Method

### Bisection Method Interval Halving Flowchart
\`\`\`mermaid
flowchart TD
    START(["Start Bisection Method"]) --> GUESS["Find initial interval [a, b] such that\nf(a) * f(b) < 0 (Opposite Signs)"]
    GUESS --> CALC["c = (a + b) / 2 (Midpoint)"]
    CALC --> CHECK{"|f(c)| < Tolerance OR (b - a)/2 < Tol?"}
    CHECK -- Yes --> ROOT(["Root found: x = c"])
    CHECK -- No --> EVAL{"f(a) * f(c) < 0?"}
    EVAL -- Yes --> SET_B["b = c (Root lies in left half [a, c])"]
    EVAL -- No --> SET_A["a = c (Root lies in right half [c, b])"]
    SET_B --> CALC
    SET_A --> CALC
\`\`\`

This method repeatedly halves an interval to find the root.

> [!IMPORTANT] **MEMORIZE:**
> Initial condition: $f(a) \\times f(b) < 0$
> Midpoint formula: $c = \\frac{a + b}{2}$

> [!NOTE] **DEV BRAIN:**
> The Bisection method is literally **Binary Search**! You check the middle element, see if the target is to the left or right, and throw away half the array. It's $O(\\log N)$ in terms of interval size reduction, which is slow compared to hash maps (Newton-Raphson), but it's 100% guaranteed to find the target!

### Algorithm
1. Find $a, b$ such that $f(a) \\times f(b) < 0$.
2. Calculate midpoint $c = \\frac{a + b}{2}$.
3. Check $f(c)$:
   - If $f(c) \\times f(a) < 0$, root is between $a$ and $c$. So $b = c$.
   - Else, root is between $c$ and $b$. So $a = c$.
4. Repeat until $|a - b| < tolerance$.

> [!WARNING] **TRAP:**
> Do NOT forget to check the sign of $f(c)$. Students often mistakenly check the value of $c$ instead of $f(c)$.

> [!TIP] **EXAM TIP:**
> Always draw a table with columns: Iteration | a | b | c | f(a) | f(b) | f(c) | Error. This guarantees full marks for steps.

### Python Code
\`\`\`python
def f(x): return x**3 - x - 2

def bisection(a, b, tol):
    if f(a) * f(b) >= 0: return None
    while (b - a) >= tol:
        c = (a + b) / 2
        if f(c) == 0: break
        elif f(c) * f(a) < 0: b = c
        else: a = c
    return c
\`\`\`
\`,
          richContent: \`
### Step-by-Step Trace for $f(x) = x^2 - 4$
Target Tolerance: 0.5. Initial $a=0, b=3$.
| Iter | a | b | c (Mid) | f(c) | New Interval |
|---|---|---|---|---|---|
| 1 | 0 | 3 | 1.5 | -1.75 | [1.5, 3] |
| 2 | 1.5 | 3 | 2.25 | 1.06 | [1.5, 2.25] |
| 3 | 1.5 | 2.25 | 1.875 | -0.48 | [1.875, 2.25] |
*(Stop since interval width is < 0.5)*
          `,
          shortNotes: 'Finds root by halving interval [a,b]. Condition: f(a)*f(b) < 0. Midpoint c = (a+b)/2. Guaranteed convergence but very slow.',
          examples: [
            { title: 'Finding Root', description: 'Let a=0 (f(0)=-4) and b=3 (f(3)=5). Midpoint c=1.5. f(1.5)= -1.75. Replace a.' }
          ],
          keyPoints: [
            'Requires two initial guesses bracketing the root.',
            'Convergence is linear (slow).',
            'Never fails to find a root if one exists.'
          ],
          theoryQuestions: [
            {
              question: 'Explain the Bisection Method with a flowchart. Derive its convergence rate and discuss its limitations.',
              marks: '7 Marks',
              answer: 'The Bisection Method finds real roots of continuous functions based on the Intermediate Value Theorem:\n1. Find two initial points $a$ and $b$ such that $f(a) \\cdot f(b) < 0$.\n2. Calculate midpoint $c = \\frac{a + b}{2}$.\n3. If $f(c) = 0$, $c$ is the exact root. If $f(a) \\cdot f(c) < 0$, root lies in $[a, c]$; set $b = c$. Else, set $a = c$.\n4. Repeat until interval $|b - a| < \\epsilon$.\n\n**Convergence:**\nIn each iteration, the interval width is halved: $\\epsilon_{n+1} = \\frac{1}{2} \\epsilon_n$. Hence, the method converges **linearly** with rate 1/2.\n**Limitations:** Convergence is slow compared to Newton-Raphson, and cannot find complex roots or even-multiplicity roots where the function touches the x-axis without crossing.',
              keyPoints: ['Intermediate value theorem basis.', 'Linear convergence with factor 1/2.', 'Guaranteed convergence vs slow speed.']
            },
          ],
          mcqs: [
            { question: 'What is the necessary condition for initial guesses a and b?', options: ['f(a) * f(b) > 0', 'f(a) * f(b) = 0', 'f(a) * f(b) < 0', 'f(a) = f(b)'], correctIndex: 2, explanation: 'Opposite signs guarantee a root.' },
            { question: 'What is the convergence rate of the Bisection method?', options: ['Linear', 'Quadratic', 'Cubic', 'Exponential'], correctIndex: 0, explanation: 'Bisection method has linear convergence.' },
            { question: 'How is the next point calculated?', options: ['c = a - b', 'c = (a * b) / 2', 'c = a + b', 'c = (a + b) / 2'], correctIndex: 3, explanation: 'Midpoint.' }
          ]
        },
        {
          id: 'newton-raphson',
          title: 'Newton-Raphson Method',
          simpleExplanation: 'A very fast method that uses the tangent line (derivative) of the function to slide quickly toward the root.',
          detailedExplanation: `
## Newton-Raphson Method

### Newton-Raphson Tangent Line Convergence Flowchart
\`\`\`mermaid
flowchart TD
    START(["Start Newton-Raphson Method"]) --> INIT["Choose initial guess x0\nCompute f(x0) and derivative f'(x0)"]
    INIT --> CHECK_DERIV{"|f'(x0)| == 0?"}
    CHECK_DERIV -- Yes --> FAIL(["Fails: Horizontal tangent / division by zero! Pick new x0"])
    CHECK_DERIV -- No --> NEXT["x1 = x0 - f(x0) / f'(x0)"]
    NEXT --> CONV{"|x1 - x0| < Tolerance?"}
    CONV -- Yes --> ROOT(["Root found: x = x1\n(Quadratic Order of Convergence: p = 2)"])
    CONV -- No --> ITER["x0 = x1"] --> NEXT
\`\`\`


> [!IMPORTANT] **MEMORIZE:**
> Formula: $x_{n+1} = x_n - \\frac{f(x_n)}{f'(x_n)}$
> Convergence: Quadratic (Fastest!)

> [!NOTE] **DEV BRAIN:**
> Think of Newton-Raphson like Gradient Descent in Machine Learning. You use the derivative (gradient) to take huge steps when you are far away, and smaller steps as the gradient flattens out near the target. 

### Algorithm
1. Choose initial guess $x_0$.
2. Compute next guess: $x_{n+1} = x_n - \\frac{f(x_n)}{f'(x_n)}$
3. Repeat until $|x_{n+1} - x_n| < tolerance$.

> [!WARNING] **TRAP:**
> The method fails entirely if $f'(x_n) = 0$ (division by zero). If you hit a horizontal tangent, you must pick a new starting point!

> [!TIP] **EXAM TIP:**
> Always compute the derivative $f'(x)$ algebraically *before* starting your iterations table. Write it explicitly on the exam paper.

### Python Code
\`\`\`python
def newton_raphson(x0, tol):
    x = x0
    while True:
        fx = f(x)
        dfx = df(x)
        x_new = x - fx / dfx
        if abs(x_new - x) < tol: return x_new
        x = x_new
\`\`\`
\`,
          richContent: \`
### Trace for $f(x) = x^2 - 4$, $f'(x) = 2x$, $x_0 = 3$
| n | $x_n$ | $f(x_n)$ | $f'(x_n)$ | $x_{n+1}$ |
|---|---|---|---|---|
| 0 | 3 | 5 | 6 | 3 - (5/6) = 2.1667 |
| 1 | 2.1667 | 0.694 | 4.333 | 2.1667 - 0.16 = 2.006 |
| 2 | 2.006 | 0.024 | 4.012 | 2.000 |
          `,
          shortNotes: 'Formula: x_{n+1} = x_n - f(x_n)/f\'(x_n). Requires only one initial guess. Very fast (quadratic convergence). Fails if derivative is zero.',
          examples: [
            { title: 'Find root of x^2 - 4 = 0', description: 'Guess x0 = 3. x1 = 3 - (5/6) = 2.166. Fast convergence.' }
          ],
          keyPoints: [
            'Requires derivative $f\'(x)$.',
            'Needs one initial guess (Open method).',
            'Quadratic convergence rate.',
            'Fails if tangent is horizontal.'
          ],
          theoryQuestions: [
            {
              question: 'Derive the Newton-Raphson iteration formula using Taylor series. Prove that its order of convergence is quadratic (p = 2).',
              marks: '7 Marks',
              answer: "**Derivation:**\nExpanding $f(x)$ about guess $x_0$ using Taylor series:\n$$f(x) = f(x_0) + (x - x_0) f'(x_0) + \\frac{(x - x_0)^2}{2!} f''(x_0) + \\dots$$\nNeglecting second and higher order terms and setting $f(x) = 0$ at the root $x_1$:\n$$0 \\approx f(x_0) + (x_1 - x_0) f'(x_0) \\implies \\mathbf{x_{n+1} = x_n - \\frac{f(x_n)}{f'(x_n)}}$$\n\n**Proof of Quadratic Convergence ($p = 2$):**\nLet $x_n = \\alpha + \\epsilon_n$ where $\\alpha$ is the true root ($f(\\alpha) = 0$).\nSubstituting into the iteration formula and expanding around $\\alpha$ yields:\n$$\\epsilon_{n+1} \\approx \\frac{f''(\\alpha)}{2 f'(\\alpha)} \\epsilon_n^2 = C \\cdot \\epsilon_n^2$$\nSince $\\epsilon_{n+1} \\propto \\epsilon_n^2$, the order of convergence is **2 (Quadratic)**.",
              keyPoints: ['Taylor series 1st order derivation.', "Formula x_{n+1} = x_n - f/f'.", 'Proof showing epsilon_{n+1} proportional to epsilon_n^2.']
            },
          ],
          mcqs: [
            { question: 'What is the formula for Newton-Raphson?', options: ['x - f(x)/f\'(x)', 'x + f(x)/f\'(x)', 'x - f\'(x)/f(x)', 'f(x) - x/f\'(x)'], correctIndex: 0, explanation: 'Standard formula.' },
            { question: 'What is the convergence order?', options: ['Linear', 'Quadratic', 'Cubic', 'Exponential'], correctIndex: 1, explanation: 'Quadratic.' },
            { question: 'When will it fail?', options: ['If guess is root', 'If f(x) is negative', 'If f\'(x) is zero', 'If f(x) is polynomial'], correctIndex: 2, explanation: 'Division by zero.' }
          ]
        },
        {
          id: 'secant-method',
          title: 'Secant Method',
          simpleExplanation: 'Like Newton-Raphson, but without derivatives. It uses two previous points to draw a secant line instead of a tangent.',
          detailedExplanation: `
## Secant Method
Approximates the derivative using a secant line drawn through two recent points.

> [!IMPORTANT] **MEMORIZE:**
> Formula: $x_{n+1} = x_n - f(x_n) \\frac{x_n - x_{n-1}}{f(x_n) - f(x_{n-1})}$

> [!NOTE] **DEV BRAIN:**
> If Newton-Raphson is exact analytic calculation, Secant is a numerical approximation. It's like calculating FPS by taking the delta time between the last two frames instead of analyzing the underlying game loop code.

### Algorithm
1. Choose $x_0, x_1$.
2. Calculate $x_2$ using the formula.
3. Shift variables: $x_0 = x_1, x_1 = x_2$.
4. Repeat.

> [!WARNING] **TRAP:**
> DO NOT require the two initial guesses to bracket the root. This is an *open* method, not a bracketing method like Bisection!

> [!TIP] **EXAM TIP:**
> Be very careful with calculator parentheses here. Calculate the denominator $f(x_n) - f(x_{n-1})$ first, then multiply.
\`,
          richContent: \`
### Comparison Table
| Feature | Newton-Raphson | Secant |
|---|---|---|
| Guesses Required | 1 | 2 |
| Derivative Needed | Yes | No |
| Convergence | Quadratic (2.0) | Super-linear (1.618) |
          `,
          shortNotes: 'Uses a secant line. Formula uses previous two points. Requires two guesses, no bracketing. Super-linear convergence.',
          examples: [
            { title: 'No derivative needed', description: 'Just plug in two x values to get a straight line slope.' }
          ],
          keyPoints: [
            'Does NOT require derivatives.',
            'Requires two initial guesses.',
            'Convergence rate is 1.618.',
            'Fails if $f(x_n) = f(x_{n-1})$.'
          ],
          mcqs: [
            { question: 'Why is Secant often preferred?', options: ['Faster', 'No derivatives needed', 'Guaranteed to converge', 'One guess'], correctIndex: 1, explanation: 'Saves from complex analytical calculus.' },
            { question: 'How many initial guesses?', options: ['1', '2', '3', 'None'], correctIndex: 1, explanation: 'Requires two points.' },
            { question: 'Order of convergence?', options: ['1', '1.618', '2', '3'], correctIndex: 1, explanation: '1.618 (Super-linear).' }
          ]
        },
        {
          id: 'regula-falsi',
          title: 'Regula-Falsi (False Position)',
          simpleExplanation: 'A mix of Bisection (safe) and Secant (fast). Brackets the root but draws straight lines to find the next guess.',
          detailedExplanation: `
## Regula-Falsi Method

> [!IMPORTANT] **MEMORIZE:**
> Formula: $x_2 = \\frac{x_0 f(x_1) - x_1 f(x_0)}{f(x_1) - f(x_0)}$
> Guaranteed convergence because it brackets the root!

> [!NOTE] **DEV BRAIN:**
> It's an optimization of Binary Search! Instead of strictly picking the 50% midpoint, it estimates where the target is based on the values at the endpoints (Interpolation Search). If $f(a)$ is -1 and $f(b)$ is 100, the root is likely very close to $a$.

### Algorithm
1. Find $x_0, x_1$ such that $f(x_0) \\times f(x_1) < 0$.
2. Calculate $x_2$ using formula.
3. Check $f(x_2)$ and replace $x_0$ or $x_1$ to maintain opposite signs.

> [!WARNING] **TRAP:**
> For highly curved functions, one endpoint might never change, making the algorithm extremely slow. It can get "stuck".

> [!TIP] **EXAM TIP:**
> The formula is essentially identical to the Secant method, but the logic for *updating* the points is identical to the Bisection method.
\`,
          richContent: \`
### Bracketing Methods Comparison
| Feature | Bisection | Regula-Falsi |
|---|---|---|
| Next Point | Midpoint | Line Intercept |
| Speed | Slow | Faster (usually) |
| Convergence | Guaranteed | Guaranteed |
          `,
          shortNotes: 'Bracketing method. Formula: (a*f(b) - b*f(a))/(f(b) - f(a)). Guaranteed convergence. Faster than bisection.',
          examples: [
            { title: 'Visualizing', description: 'Draws a chord. Where the chord crosses the x-axis is the new guess.' }
          ],
          keyPoints: [
            'Requires two initial guesses that bracket the root.',
            'Uses a straight line interpolation.',
            'Guaranteed to converge.',
            'Can suffer slow convergence on one side.'
          ],
          mcqs: [
            { question: 'Regula-Falsi is similar to which two methods?', options: ['Newton & Secant', 'Bisection & Secant', 'Bisection & Newton', 'Euler & Secant'], correctIndex: 1, explanation: 'Bracketing like Bisection, straight lines like Secant.' },
            { question: 'Does it guarantee convergence?', options: ['Yes', 'No', 'Only for polynomials', 'Only if f\'>0'], correctIndex: 0, explanation: 'It traps the root.' },
            { question: 'Primary disadvantage?', options: ['Requires derivatives', 'May diverge', 'One endpoint fixed (slow)', 'Requires 3 guesses'], correctIndex: 2, explanation: 'Endpoint stalling.' }
          ]
        },
        {
          id: 'fixed-point-iteration',
          title: 'Fixed Point Iteration Method',
          simpleExplanation: 'Rewrite equation f(x) = 0 into x = g(x). Plug answer back into g(x) until it stops changing.',
          detailedExplanation: `
## Fixed Point Iteration Method

> [!IMPORTANT] **MEMORIZE:**
> Rearrange into $x = g(x)$.
> Condition for convergence: $|g'(x)| < 1$ near the root.

> [!NOTE] **DEV BRAIN:**
> This is a recursive function or a \`while(true)\` loop. \`x = g(x)\` is like updating your state: \`state = update(state)\`. It only terminates if the update function stabilizes!

### Algorithm
1. Rearrange $f(x) = 0$ into $x = g(x)$.
2. Initial guess $x_0$.
3. $x_{n+1} = g(x_n)$.
4. Repeat.

> [!WARNING] **TRAP:**
> Not every rearrangement $x = g(x)$ will work. If you pick a $g(x)$ where the derivative is $> 1$, the values will explode toward infinity!

> [!TIP] **EXAM TIP:**
> If a question asks you to "show convergence is possible", compute $g'(x)$ and prove that substituting your initial guess gives a value between -1 and 1.
\`,
          richContent: \`
### Example Rearrangement: $x^2 - x - 2 = 0$
- **Option 1:** $x = x^2 - 2 \\Rightarrow g'(x) = 2x$. If root is near 2, $|g'(2)| = 4 > 1$. **Diverges.**
- **Option 2:** $x = \\sqrt{x + 2} \\Rightarrow g'(x) = \\frac{1}{2\\sqrt{x+2}}$. If root is near 2, $|g'(2)| = 1/4 < 1$. **Converges!**
          `,
          shortNotes: 'Convert f(x)=0 to x=g(x). Converges ONLY IF |g\'(x)| < 1. Linear convergence.',
          examples: [
            { title: 'Rearranging', description: 'f(x) = x^2 - x - 2 = 0. Option B: x = sqrt(x + 2) is better because derivative is smaller.' }
          ],
          keyPoints: [
            'Requires rearranging to $x = g(x)$.',
            'Must satisfy $|g\'(x)| < 1$.',
            'Simple but can be unstable.'
          ],
          mcqs: [
            { question: 'Mandatory condition for convergence?', options: ['|g\'(x)| > 1', '|g\'(x)| < 1', 'g\'(x) = 0', 'g(x) < 0'], correctIndex: 1, explanation: 'Derivative strictly less than 1.' },
            { question: 'How is equation manipulated?', options: ['f\'(x)=0', 'x=f(x)', 'x=g(x)', 'g(x)=0'], correctIndex: 2, explanation: 'Rearranged into x=g(x).' },
            { question: 'If |g\'(x)| > 1, what happens?', options: ['Converges faster', 'Different root', 'Diverges', 'Loops'], correctIndex: 2, explanation: 'Errors multiply, causing divergence.' }
          ]
        }
      ]
    },
    {
      id: 'unit3',
      title: 'Interpolation',
      description: 'Estimating unknown values that fall between known values.',
      topics: [
        {
          id: 'newtons-forward',
          title: 'Newton\'s Forward Difference Interpolation',
          simpleExplanation: 'A formula to guess a value when your target x is near the BEGINNING of a set of equally spaced data points.',
          detailedExplanation: `
## Newton's Forward Formula

### Decision Tree for Interpolation Techniques
\`\`\`mermaid
flowchart TD
    DATA["Given Data Points (x0, y0), (x1, y1)... (xn, yn)"] --> SPACING{"Are x-values equally spaced?\n(h = x1 - x0 = x2 - x1)"}

    SPACING -- "Yes (Equispaced)" --> POS{"Where does target x lie?"}
    POS -- "Near the beginning of table" --> N_FWD["Newton's Forward Difference Formula"]
    POS -- "Near the end of table" --> N_BWD["Newton's Backward Difference Formula"]
    POS -- "Near the center of table" --> N_CENT["Central Differences (Gauss, Stirling, Bessel)"]

    SPACING -- "No (Unequally Spaced)" --> UNEQ{"Formula Preference"}
    UNEQ --> LAGRANGE["Lagrange's Interpolation Formula\n(No difference table required)"]
    UNEQ --> N_DIV["Newton's Divided Difference Formula\n(Easier to add new data points)"]
\`\`\`


> [!IMPORTANT] **MEMORIZE:**
> Parameter $u = \\frac{x - x_0}{h}$
> Formula: $y = y_0 + u \\Delta y_0 + \\frac{u(u-1)}{2!} \\Delta^2 y_0 + ...$

> [!NOTE] **DEV BRAIN:**
> Interpolation is just a lookup table (LUT) with a built-in easing function! When your data points are equally spaced (like frames in an animation), you can use predictable mathematical steps (forward differences) to smoothly estimate frames in between.

### When to use
- The x-values MUST be **equally spaced** (constant interval $h$).
- Use for targets near the **top/beginning** of the table.

> [!WARNING] **TRAP:**
> Do not use this for unequally spaced data. It will yield completely wrong results.

> [!TIP] **EXAM TIP:**
> Always draw the difference table completely. Even if your formula calculation is wrong, a correct difference table gets you 50% of the marks!
\`,
          richContent: \`
### Trace: Creating a Difference Table
| $x$ | $y$ | $\\Delta y$ | $\\Delta^2 y$ |
|---|---|---|---|
| 10| 5 | (8-5) = **3** | |
| 20| 8 | (14-8) = 6 | (6-3) = **3** |
| 30| 14| | |
Use the top row numbers (3 and 3) for the formula!
          `,
          shortNotes: 'Equally spaced data. Best for finding values near START. Uses forward difference operator Δ.',
          examples: [
            { title: 'When to use Forward', description: 'If x are 10, 20, 30. Want x=12, use Forward because 12 is near 10.' }
          ],
          keyPoints: [
            'Only for equally spaced x-values.',
            'Relies on top row of difference table.',
            'u = (x - x0)/h.'
          ],
          mcqs: [
            { question: 'When is Newton Forward Interpolation best used?', options: ['Near end', 'Near beginning', 'Unequally spaced', 'Middle'], correctIndex: 1, explanation: 'Best accuracy near the start.' },
            { question: 'What does h represent?', options: ['Height', 'x,y diff', 'Equal spacing interval', 'First x'], correctIndex: 2, explanation: 'h is step size.' },
            { question: 'Formula for u?', options: ['(x-xn)/h', '(x0-x)/h', '(x-x0)/h', '(x+x0)/h'], correctIndex: 2, explanation: 'Distance from start divided by step size.' }
          ]
        },
        {
          id: 'lagrange-interpolation',
          title: 'Lagrange\'s Interpolation',
          simpleExplanation: 'A flexible method for guessing values that works even when the data points are NOT equally spaced.',
          detailedExplanation: `
## Lagrange's Interpolation

> [!IMPORTANT] **MEMORIZE:**
> For the $y_i$ term: Numerator skips $(x - x_i)$. Denominator replaces $x$ with $x_i$.

> [!NOTE] **DEV BRAIN:**
> Lagrange interpolation is like a series of ON/OFF switches (Basis Polynomials). For each known point $x_i$, it creates a sub-function that equals exactly 1 at $x_i$, and 0 at all other points. It then scales this function by $y_i$ and adds them all up! 

### The Formula
$y = \\frac{(x-x_1)(x-x_2)...}{(x_0-x_1)(x_0-x_2)...} y_0 + \\frac{(x-x_0)(x-x_2)...}{(x_1-x_0)(x_1-x_2)...} y_1 + ...$

### When to use
Works perfectly for **unequally spaced** data points.

> [!WARNING] **TRAP:**
> The calculation gets very messy. Watch your minus signs carefully in the denominator!

> [!TIP] **EXAM TIP:**
> Write out the fraction structure empty first: $\\frac{()()}{()()} y_0 + ...$ Then fill in the x values. This prevents skipping a term.
\`,
          richContent: \`
### Comparison Table
| Feature | Newton Forward | Lagrange |
|---|---|---|
| Spacing | Must be equal | Can be unequal |
| Table Required | Yes | No |
| Complexity | Easy arithmetic | Heavy multiplication |
          `,
          shortNotes: 'Works for UNEQUALLY spaced data. No difference table required.',
          examples: [
            { title: 'Unequal Spacing', description: 'Data: x=[1, 2, 5]. Spacing is 1, then 3. Lagrange handles it perfectly.' }
          ],
          keyPoints: [
            'Does not require equally spaced intervals.',
            'No difference table.',
            'Computationally heavy for large n.'
          ],
          mcqs: [
            { question: 'When MUST you use Lagrange over Newton Forward?', options: ['Equally spaced', 'Unequally spaced', 'Finding roots', 'Finding derivatives'], correctIndex: 1, explanation: 'Perfect for unequal intervals.' },
            { question: 'Does Lagrange require a difference table?', options: ['Yes', 'No', 'Large datasets', 'Polynomials'], correctIndex: 1, explanation: 'Computes directly.' },
            { question: 'What happens to numerator term corresponding to y_i?', options: ['Includes (x-xi)', 'Skips (x-xi)', 'Squared', 'Zero'], correctIndex: 1, explanation: 'Skipped to avoid making term 0.' }
          ]
        }
      ]
    },
    {
      id: 'unit4',
      title: 'Numerical Differentiation & Integration',
      description: 'Using algorithms to find slopes and areas under curves.',
      topics: [
        {
          id: 'numerical-integration-trapezoidal',
          title: 'Trapezoidal Rule',
          simpleExplanation: 'Estimating area by drawing straight lines between points.',
          detailedExplanation: `
## Numerical Integration

### Numerical Integration Formulas Comparison
\`\`\`mermaid
flowchart TD
    INTEG["Numerical Integration: Integral a to b of f(x) dx\nDivide interval [a, b] into n equal subintervals of width h = (b - a)/n"]

    INTEG --> TRAP["Trapezoidal Rule (n can be any integer)\nApproximates curve by straight line chords (1st-degree polynomial)\nFormula: (h/2) * [ (y0 + yn) + 2*(y1 + y2 + ... + yn-1) ]"]

    INTEG --> SIMP13["Simpson's 1/3 Rule (n MUST be EVEN)\nApproximates curve by parabolic arcs (2nd-degree polynomial)\nFormula: (h/3) * [ (y0 + yn) + 4*(odd y) + 2*(even y) ]"]

    INTEG --> SIMP38["Simpson's 3/8 Rule (n MUST be MULTIPLE OF 3)\nApproximates curve by 3rd-degree cubic polynomial\nFormula: (3h/8) * [ (y0 + yn) + 3*(y1+y2+y4...) + 2*(y3+y6...) ]"]
\`\`\`


> [!IMPORTANT] **MEMORIZE:**
> Formula: $\\frac{h}{2} [ (First + Last) + 2(Sum \\; of \\; Rest) ]$

> [!NOTE] **DEV BRAIN:**
> Trapezoidal rule is like rendering a 3D circle in an old video game—you just connect the points with flat polygons (straight lines). It looks blocky (error), but if you increase the polygon count (increase $n$, decrease $h$), it looks perfectly smooth!

### Usage
- Interval width $h = \\frac{b - a}{n}$
- Uses linear segments (degree 1).

> [!WARNING] **TRAP:**
> Do NOT multiply the first and last $y$ values by 2. Only the middle terms get the $2x$ multiplier.

> [!TIP] **EXAM TIP:**
> $n$ represents the number of intervals, not the number of points. Number of points is always $n + 1$.
\`,
          richContent: \`
### Step-by-Step Trace
$h = 1$. Points: $y_0=10, y_1=20, y_2=30$
1. First + Last = 10 + 30 = 40
2. Rest = 20 $\\rightarrow 2 \\times 20 = 40$
3. Area = (1/2) * (40 + 40) = 40
          `,
          shortNotes: 'Connects points with straight lines (linear). Any number of intervals.',
          examples: [
            { title: 'Simple Area', description: 'h=1, y=[10, 20, 30]. Area = 40.' }
          ],
          keyPoints: [
            'Straight linear segments.',
            'No restrictions on number of intervals.',
            'Error proportional to h^2.'
          ],
          mcqs: [
            { question: 'Trapezoidal rule approximates the curve using:', options: ['Parabolas', 'Straight lines', 'Cubic', 'Circles'], correctIndex: 1, explanation: 'Draws straight line forming trapezoid.' },
            { question: 'Which values multiplied by 2?', options: ['First/last', 'All', 'Intermediate', 'None'], correctIndex: 2, explanation: 'Intermediate values only.' },
            { question: 'Restriction on intervals (n)?', options: ['Even', 'Multiple 3', 'Odd', 'No restriction'], correctIndex: 3, explanation: 'Can be applied to any n.' }
          ]
        },
        {
          id: 'simpsons-13',
          title: 'Simpson\'s 1/3 Rule',
          simpleExplanation: 'A better way to find area. Uses smooth U-shaped curves (parabolas) to connect the points.',
          detailedExplanation: `
## Simpson's 1/3 Rule

> [!IMPORTANT] **MEMORIZE:**
> Constraint: **$n$ MUST be an EVEN number.**
> Formula: $\\frac{h}{3} [ (First + Last) + 4(Odd) + 2(Even) ]$

> [!NOTE] **DEV BRAIN:**
> If Trapezoidal is flat-shaded polygons, Simpson's 1/3 is Bezier curves. It uses 3 points to define a smooth quadratic curve (parabola), which matches mathematical functions much better.

### Why 1/3?
Because the multiplier in front is $h/3$.

> [!WARNING] **TRAP:**
> "Odd" and "Even" refer to the **subscripts** ($y_1, y_2$), NOT the actual data values! $y_1$ is odd, $y_2$ is even.

> [!TIP] **EXAM TIP:**
> Check $n$ before applying. If a question gives you 6 data points, $n = 5$ (odd). You cannot use Simpson's 1/3 for the whole thing! (You'd use Simpson's 3/8, or combine methods).
\`,
          richContent: \`
### Integration Comparison Table
| Method | Curve Used | Multipliers | n Requirement |
|---|---|---|---|
| Trapezoidal | Line (Degree 1) | 1, 2, 2, 2... 1 | None |
| Simpson's 1/3 | Parabola (Degree 2) | 1, 4, 2, 4... 1 | Must be Even |
          `,
          shortNotes: 'Uses parabolas. Formula: (h/3)*[ (y_first + y_last) + 4*(Odd y) + 2*(Even y) ]. EVEN intervals.',
          examples: [
            { title: 'Requirement Check', description: '5 data points -> n = 4. 4 is even, CAN use Simpson 1/3.' }
          ],
          keyPoints: [
            'Quadratic parabolas.',
            'n MUST be even.',
            'More accurate than Trapezoidal.',
            'Multiplier pattern: 1, 4, 2, 4, 2... 4, 1.'
          ],
          mcqs: [
            { question: 'Assumes curve is a:', options: ['Line', 'Parabola', 'Cubic', 'Circle'], correctIndex: 1, explanation: 'Uses quadratic interpolation.' },
            { question: 'Restriction on n?', options: ['Odd', 'Multiple 3', 'Even', 'No restriction'], correctIndex: 2, explanation: 'Requires pairs of intervals.' },
            { question: 'Odd-indexed terms multiplied by?', options: ['2', '3', '4', '1'], correctIndex: 2, explanation: 'y_1, y_3 get 4.' }
          ]
        }
      ]
    },
    {
      id: 'unit5',
      title: 'Solution of Linear Algebraic Equations',
      description: 'Methods to solve multiple equations with multiple unknowns.',
      topics: [
        {
          id: 'gauss-elimination',
          title: 'Gauss Elimination Method',
          simpleExplanation: 'Simplify a system of equations into a triangle shape, solve from the bottom up.',
          detailedExplanation: `
## Gauss Elimination

### Gauss Elimination Algorithm Flowchart
\`\`\`mermaid
flowchart TD
    START(["Start with System: A * X = B"]) --> AUG["Form Augmented Matrix [ A | B ]"]
    AUG --> FWD["Forward Elimination:\nApply elementary row operations to eliminate\nelements below the main diagonal"]
    FWD --> TRIANG["Upper Triangular Matrix Form:\n[ U | B' ] where all a_ij = 0 for i > j"]
    TRIANG --> BACK["Back Substitution:\n1. Solve for x_n = b'_n / u_nn\n2. Substitute x_n backwards to solve for x_n-1, x_n-2 ... x_1"]
    BACK --> DONE(["Unique Solution Vector X Obtained"])
\`\`\`


> [!IMPORTANT] **MEMORIZE:**
> Step 1: Forward Elimination (Make Upper Triangular Matrix)
> Step 2: Back Substitution (Solve z, then y, then x)

> [!NOTE] **DEV BRAIN:**
> Think of this as cleaning up a dependency graph. You systematically remove dependencies until one module stands alone (e.g. $z = 5$). Then you resolve the parent modules up the chain using that known value.

### The Process
Use row operations to make all numbers below the main diagonal zero.

> [!WARNING] **TRAP:**
> Do NOT swap columns. You can swap rows (Partial Pivoting) to avoid division by zero, but swapping columns changes the variables!

> [!TIP] **EXAM TIP:**
> Write out your row operations explicitly (e.g., $R_2 \\rightarrow R_2 - 2R_1$). If you make a math error, the examiner will see your logic was correct.
\`,
          richContent: \`
### Step-by-Step Triangle Formation
Start:
$[2, 1, -1]$
$[-3, -1, 2]$
$[-2, 1, 2]$

Goal (Upper Triangular):
$[X, X, X]$
$[0, X, X]$
$[0, 0, X]$
          `,
          shortNotes: 'Direct method. Step 1: Forward elimination to Upper Triangular. Step 2: Back substitution.',
          examples: [
            { title: 'Upper Triangular', description: 'Zeros form a triangle in bottom left.' }
          ],
          keyPoints: [
            'Direct method.',
            'Goal: Upper Triangular Matrix.',
            'Row operations.',
            'Back substitution.'
          ],
          mcqs: [
            { question: 'Goal of forward elimination?', options: ['Identity', 'Lower Triangular', 'Upper Triangular', 'Diagonal'], correctIndex: 2, explanation: 'Zeroes below diagonal.' },
            { question: 'Process used after?', options: ['Forward sub', 'Back sub', 'Integration', 'Iteration'], correctIndex: 1, explanation: 'Solve bottom-up.' },
            { question: 'Direct or iterative?', options: ['Iterative', 'Direct', 'Graphical', 'Randomized'], correctIndex: 1, explanation: 'Fixed algorithmic steps.' }
          ]
        },
        {
          id: 'gauss-seidel',
          title: 'Gauss-Seidel Iterative Method',
          simpleExplanation: 'Guess x, y, z. Use equations to improve x, IMMEDIATELY use new x to improve y.',
          detailedExplanation: `
## Gauss-Seidel Method

> [!IMPORTANT] **MEMORIZE:**
> Rule: Use the most recently calculated values **immediately**.
> Condition: Matrix must be **Diagonally Dominant**.

> [!NOTE] **DEV BRAIN:**
> In Jacobi method (the alternative), updates are synchronous (values update only after the whole loop). In Gauss-Seidel, updates are asynchronous/immediate. Because it uses the freshest data, Gauss-Seidel converges much faster!

### How it works
1. Rearrange to isolate $x, y, z$.
2. Guess $y=0, z=0$. Get new $x$.
3. When finding new $y$, use the NEW $x$ immediately!

> [!WARNING] **TRAP:**
> If the matrix is NOT diagonally dominant, the iterations will diverge (numbers go to infinity). Always check and rearrange rows if needed before starting.

> [!TIP] **EXAM TIP:**
> Create a neat table: Iteration | x | y | z. Circle the updated values in your calculation to prove you used the immediate update property.
\`,
          richContent: \`
### Comparison Table
| Feature | Jacobi | Gauss-Seidel |
|---|---|---|
| Variable Update | End of iteration | Immediately |
| Convergence Speed | Slow | Fast |
          `,
          shortNotes: 'Iterative method. Uses latest updated values immediately. Requires Diagonally Dominant matrix.',
          examples: [
            { title: 'Immediate Update', description: 'Find x=2 in eq 1, use x=2 immediately in eq 2.' }
          ],
          keyPoints: [
            'Iterative method.',
            'Uses latest updated values immediately.',
            'Faster than Jacobi.',
            'Must be diagonally dominant.'
          ],
          mcqs: [
            { question: 'Difference between Seidel and Jacobi?', options: ['Direct', 'Uses updated values immediately', 'No initial guess', 'Difference table'], correctIndex: 1, explanation: 'Instantly uses new variables.' },
            { question: 'Condition for convergence?', options: ['Symmetric', 'Diagonal dominance', 'Identity', 'Zero'], correctIndex: 1, explanation: 'Diagonal > sum of others.' },
            { question: 'Which converges faster?', options: ['Jacobi', 'Gauss-Seidel', 'Equal', 'Bisection'], correctIndex: 1, explanation: 'Uses fresher data.' }
          ]
        }
      ]
    },
    {
      id: 'unit6',
      title: 'Ordinary Differential Equations (ODE)',
      description: 'Solving differential equations numerically.',
      topics: [
        {
          id: 'eulers-method',
          title: 'Euler\'s Method',
          simpleExplanation: 'Using slope to take a tiny step forward in a straight line to guess next point.',
          detailedExplanation: `
## Euler's Method

> [!IMPORTANT] **MEMORIZE:**
> Formula: $y_{n+1} = y_n + h \\cdot f(x_n, y_n)$
> (New Y = Old Y + step_size * slope)

> [!NOTE] **DEV BRAIN:**
> Euler's method is basic physics simulation in games! \`position += velocity * delta_time\`. The problem? If \`delta_time\` ($h$) is too big, physics breaks and players clip through walls! 

### The Concept
Assume the slope stays constant for a very small step $h$, and draw a straight line.

> [!WARNING] **TRAP:**
> Euler's method has very large truncation error. The straight line approximation diverges quickly from the true curve if $h$ is large.

> [!TIP] **EXAM TIP:**
> Write $f(x_n, y_n)$ explicitly as your differential equation. If the ODE is $dy/dx = x+y$, then slope $= x_n + y_n$.
\`,
          richContent: \`
### Step-by-Step Trace
$dy/dx = x+y$. Start (0,1), $h=0.1$.
1. Slope at (0,1) = 0 + 1 = 1
2. New $y = 1 + 0.1 \\times 1 = 1.1$
3. Next point: (0.1, 1.1)
          `,
          shortNotes: 'Simplest ODE solver. y_new = y_old + h*f(x,y). Not very accurate unless h is tiny.',
          examples: [
            { title: 'One step', description: 'dy/dx = x+y. Start (0,1), h=0.1. New point is (0.1, 1.1).' }
          ],
          keyPoints: [
            'First-order method.',
            'Uses tangent line.',
            'Error is large unless h is small.',
            'Basis for advanced methods.'
          ],
          mcqs: [
            { question: 'Euler method used for:', options: ['Roots', 'Integrals', 'ODEs', 'Linear Systems'], correctIndex: 2, explanation: 'Steps through ODE.' },
            { question: 'What does f(x,y) represent?', options: ['Area', 'Slope (dy/dx)', 'Second derivative', 'Step size'], correctIndex: 1, explanation: 'Slope of tangent.' },
            { question: 'Increase accuracy by:', options: ['Increase h', 'Decrease h', 'Negative h', 'Always accurate'], correctIndex: 1, explanation: 'Smaller step size = shorter tangent approximation.' }
          ]
        },
        {
          id: 'runge-kutta-4',
          title: 'Runge-Kutta Method (4th order)',
          simpleExplanation: 'Industry standard. Calculates slope at four places in a single step and averages them.',
          detailedExplanation: `
## Runge-Kutta 4th Order (RK4)

### Runge-Kutta 4th Order (RK4) 4-Slope Architecture
\`\`\`mermaid
flowchart TD
    START(["Initial Condition: (x0, y0), Step size h"]) --> S1["Slope k1 = h * f(x0, y0)\n(Slope at beginning of interval)"]
    S1 --> S2["Slope k2 = h * f(x0 + h/2, y0 + k1/2)\n(Slope at midpoint using k1)"]
    S2 --> S3["Slope k3 = h * f(x0 + h/2, y0 + k2/2)\n(Improved slope at midpoint using k2)"]
    S3 --> S4["Slope k4 = h * f(x0 + h, y0 + k3)\n(Slope at end of interval using k3)"]
    S4 --> AVG["Weighted Average of 4 Slopes:\nk = (k1 + 2*k2 + 2*k3 + k4) / 6"]
    AVG --> NEXT["y1 = y0 + k\nx1 = x0 + h\n(High-accuracy O(h^4) step without calculating derivatives!)"]
\`\`\`


> [!IMPORTANT] **MEMORIZE:**
> $y_{n+1} = y_n + \\frac{1}{6}(k_1 + 2k_2 + 2k_3 + k_4)$

> [!NOTE] **DEV BRAIN:**
> If Euler is just checking the slope once, RK4 is like Anti-Aliasing. It samples the slope at the start ($k_1$), twice in the middle ($k_2, k_3$), and at the end ($k_4$), then blends them. It's incredibly stable!

### The Four Slopes
- $k_1 = h \\cdot f(x_n, y_n)$ (Start)
- $k_2 = h \\cdot f(x_n + h/2, y_n + k_1/2)$ (Mid 1)
- $k_3 = h \\cdot f(x_n + h/2, y_n + k_2/2)$ (Mid 2)
- $k_4 = h \\cdot f(x_n + h, y_n + k_3)$ (End)

> [!WARNING] **TRAP:**
> $k_3$ uses $k_2$ to guess the y-coordinate. Do NOT use $k_1$ for $k_3$!

> [!TIP] **EXAM TIP:**
> Calculate $k_1, k_2, k_3, k_4$ separately and clearly. The examiner looks for these 4 values before looking at your final answer.
\`,
          richContent: \`
### Comparison Table
| Feature | Euler | RK4 |
|---|---|---|
| Slopes per step | 1 | 4 |
| Accuracy | Low | Very High |
| Computation | Fast | Heavy |
          `,
          shortNotes: 'Highly accurate. Calculates 4 slopes (k1,k2,k3,k4). y_new = y_old + (1/6)*(k1 + 2k2 + 2k3 + k4).',
          examples: [
            { title: 'Weights', description: 'Weights: 1/6 for k1, 2/6 for k2, 2/6 for k3, 1/6 for k4. Sum to 1 (average).' }
          ],
          keyPoints: [
            'Fourth-order accuracy.',
            'Evaluates function 4 times.',
            'Weighted average of slopes.',
            'Industry standard.'
          ],
          mcqs: [
            { question: 'Evaluations per step in RK4?', options: ['1', '2', '3', '4'], correctIndex: 3, explanation: 'Calculates k1,k2,k3,k4.' },
            { question: 'Which slopes given double weight?', options: ['k1, k4', 'k2, k3', 'k1, k2', 'None'], correctIndex: 1, explanation: 'Midpoint slopes multiplied by 2.' },
            { question: 'Why preferred over Euler?', options: ['Fewer calculations', 'Much more accurate', 'Direct', 'No h'], correctIndex: 1, explanation: 'Averages slopes, lower error.' }
          ]
        }
      ]
    }
  ]
};
