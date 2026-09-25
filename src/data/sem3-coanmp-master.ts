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
A number system is a way to represent numbers. We humans use the Decimal system (base 10) because we have 10 fingers. But computers use switches that are either ON or OFF, so they use the Binary system (base 2).

### Types of Number Systems
1. **Decimal (Base 10):** Uses digits 0-9. Example: 145
2. **Binary (Base 2):** Uses digits 0 and 1. Example: 1011
3. **Octal (Base 8):** Uses digits 0-7. Example: 75
4. **Hexadecimal (Base 16):** Uses digits 0-9 and A-F (where A=10, B=11, C=12, D=13, E=14, F=15). Example: 1A3

### Conversions
**1. Decimal to Binary:**
Divide the decimal number by 2 repeatedly and note the remainders. Read the remainders from bottom to top.

**2. Binary to Decimal:**
Multiply each bit by 2 raised to the power of its position (starting from 0 on the right) and add them up.

### Python Code for Conversions
\`\`\`python
# Decimal to Binary, Octal, Hex
decimal_num = 25
print("Binary:", bin(decimal_num)) # Output: 0b11001
print("Octal:", oct(decimal_num))  # Output: 0o31
print("Hexadecimal:", hex(decimal_num)) # Output: 0x19
\`\`\`
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
            {
              question: 'Which base is used for Hexadecimal numbers?',
              options: ['2', '8', '10', '16'],
              correctOptionIndex: 3,
              explanation: 'Hexadecimal uses base 16.'
            },
            {
              question: 'What is the binary representation of decimal 5?',
              options: ['101', '111', '100', '110'],
              correctOptionIndex: 0,
              explanation: '5/2=2 rem 1, 2/2=1 rem 0, 1/2=0 rem 1 -> 101'
            },
            {
              question: 'Which symbol represents 14 in Hexadecimal?',
              options: ['C', 'D', 'E', 'F'],
              correctOptionIndex: 2,
              explanation: 'A=10, B=11, C=12, D=13, E=14.'
            }
          ]
        },
        {
          id: 'floating-point',
          title: 'Floating Point Representation',
          simpleExplanation: 'How computers store numbers with decimal points (real numbers) using a specific format called floating-point representation.',
          detailedExplanation: `
## Floating Point Representation
Computers cannot store infinite real numbers. They use floating-point representation, which is similar to scientific notation (e.g., $1.23 \\times 10^3$).

In a computer, a floating-point number is divided into three parts:
1. **Sign bit:** 1 bit (0 for positive, 1 for negative)
2. **Exponent:** Represents the power of the base.
3. **Mantissa (or Significand):** The actual digits of the number.

### Normalization
A floating-point number is normalized if the leading digit of the mantissa is non-zero. For example, $0.123 \\times 10^2$ is normalized, but $0.0123 \\times 10^3$ is not. Normalization maximizes the precision of the stored number.

### IEEE 754 Standard
The most common standard for floating-point representation.
- **Single Precision (32-bit):** 1 sign bit, 8 exponent bits, 23 mantissa bits.
- **Double Precision (64-bit):** 1 sign bit, 11 exponent bits, 52 mantissa bits.
`,
          shortNotes: 'Real numbers are stored as floating-point numbers: Sign, Exponent, and Mantissa. IEEE 754 is the standard.',
          examples: [
            {
              title: 'Scientific Notation',
              description: 'The number 123.45 is stored as 0.12345 * 10^3 in normalized decimal floating point.'
            }
          ],
          keyPoints: [
            'Real numbers use floating-point representation.',
            'It consists of a sign, exponent, and mantissa.',
            'Normalization ensures maximum precision.',
            'IEEE 754 standard defines single (32-bit) and double (64-bit) precision.'
          ],
          mcqs: [
            {
              question: 'In floating-point representation, what part holds the actual digits of the number?',
              options: ['Sign', 'Exponent', 'Mantissa', 'Base'],
              correctOptionIndex: 2,
              explanation: 'The mantissa holds the significant digits.'
            },
            {
              question: 'How many bits are used for the exponent in single precision IEEE 754?',
              options: ['8', '11', '23', '52'],
              correctOptionIndex: 0,
              explanation: 'Single precision uses 8 bits for the exponent.'
            },
            {
              question: 'What is the purpose of normalization?',
              options: ['Save memory', 'Maximize precision', 'Increase speed', 'None of the above'],
              correctOptionIndex: 1,
              explanation: 'Normalization maximizes the number of significant digits stored, thus maximizing precision.'
            }
          ]
        },
        {
          id: 'types-of-errors',
          title: 'Types of Errors (Absolute, Relative, Round-off, Truncation)',
          simpleExplanation: 'Numerical methods give approximate answers. Errors tell us how far our approximate answer is from the exact true answer.',
          detailedExplanation: `
## Types of Errors in Numerical Computing

Because computers have limited memory and numerical methods are approximations, we always encounter errors. 

### 1. Absolute Error ($E_a$)
The direct difference between the True Value ($X$) and the Approximate Value ($X'$).
**Formula:** $E_a = |X - X'|$

### 2. Relative Error ($E_r$)
The ratio of the Absolute Error to the True Value. It tells you how big the error is compared to the number itself.
**Formula:** $E_r = \\frac{|X - X'|}{|X|}$

### 3. Percentage Error ($E_p$)
Relative error expressed as a percentage.
**Formula:** $E_p = E_r \\times 100\\%$

### 4. Round-off Error
Occurs when a number with many decimal places is approximated by a number with fewer decimal places.
Example: Rounding $\\pi$ (3.14159...) to 3.14.

### 5. Truncation Error
Occurs when an infinite mathematical process is stopped (truncated) after a finite number of steps.
Example: Using only the first 3 terms of a Taylor series to approximate a function.

### Python Code to Calculate Errors
\`\`\`python
true_val = 10.0
approx_val = 9.8

absolute_error = abs(true_val - approx_val)
relative_error = absolute_error / abs(true_val)
percentage_error = relative_error * 100

print(f"Absolute Error: {absolute_error}")
print(f"Relative Error: {relative_error}")
print(f"Percentage Error: {percentage_error}%")
\`\`\`
`,
          shortNotes: 'Errors measure inaccuracy. Absolute = |True - Approx|. Relative = Absolute/|True|. Round-off = due to limited digits. Truncation = due to stopping an infinite series.',
          examples: [
            {
              title: 'Error Calculation',
              description: 'True = 3.14159, Approx = 3.14. Absolute Error = |3.14159 - 3.14| = 0.00159. Relative Error = 0.00159 / 3.14159 = 0.000506.'
            }
          ],
          keyPoints: [
            'Absolute error is the magnitude of the difference.',
            'Relative error is scaled by the true value.',
            'Round-off happens when dropping decimal places.',
            'Truncation happens when cutting mathematical formulas short.'
          ],
          mcqs: [
            {
              question: 'Which error occurs when an infinite series is approximated by a finite number of terms?',
              options: ['Round-off error', 'Truncation error', 'Absolute error', 'Relative error'],
              correctOptionIndex: 1,
              explanation: 'Truncation error arises from cutting off (truncating) an infinite process.'
            },
            {
              question: 'What is the formula for Relative Error?',
              options: ['|True - Approx|', '|True - Approx| / |Approx|', '|True - Approx| / |True|', 'True / Approx'],
              correctOptionIndex: 2,
              explanation: 'Relative error is Absolute Error divided by True Value.'
            },
            {
              question: 'If True Value is 10 and Approx Value is 9, what is the Percentage Error?',
              options: ['1%', '10%', '0.1%', '90%'],
              correctOptionIndex: 1,
              explanation: 'Absolute = 1. Relative = 1/10 = 0.1. Percentage = 0.1 * 100% = 10%.'
            }
          ]
        },
        {
          id: 'significant-figures',
          title: 'Significant Figures',
          simpleExplanation: 'Significant figures are the digits in a number that carry meaningful information about its precision.',
          detailedExplanation: `
## What are Significant Figures?
Significant figures (or significant digits) represent the meaningful digits in a number that contribute to its precision.

### Rules for counting Significant Figures:
1. **All non-zero digits are significant.** (e.g., 123 has 3 sig figs)
2. **Zeros between non-zero digits are significant.** (e.g., 1005 has 4 sig figs)
3. **Leading zeros are NOT significant.** They just show where the decimal point is. (e.g., 0.0045 has 2 sig figs: 4 and 5)
4. **Trailing zeros to the right of a decimal point ARE significant.** (e.g., 2.500 has 4 sig figs)
5. **Trailing zeros in a whole number may or may not be significant**, depending on context, but usually, without a decimal point, they are not (e.g., 1500 has 2 sig figs). If written as $1.500 \\times 10^3$, it has 4.

### Why do they matter?
In numerical computing, you need to know how many digits you can trust. If a result is calculated to 10 decimal places, but the input data only had 3 significant figures, most of those 10 decimal places are garbage (meaningless noise).
`,
          shortNotes: 'Non-zero digits, trapped zeros, and trailing zeros after a decimal point are significant. Leading zeros are never significant.',
          examples: [
            {
              title: 'Counting Sig Figs',
              description: '0.003040 has 4 significant figures: the 3, the trapped 0, the 4, and the trailing 0.'
            }
          ],
          keyPoints: [
            'Non-zero digits are always significant.',
            'Zeros between non-zeros are significant.',
            'Leading zeros only locate the decimal point and are not significant.',
            'Trailing zeros after a decimal point indicate precision and are significant.'
          ],
          mcqs: [
            {
              question: 'How many significant figures are in the number 0.004050?',
              options: ['3', '4', '6', '7'],
              correctOptionIndex: 1,
              explanation: 'The leading zeros are not significant. The 4, 0, 5, 0 are significant. Total = 4.'
            },
            {
              question: 'How many significant figures are in 1002.0?',
              options: ['2', '4', '5', '6'],
              correctOptionIndex: 2,
              explanation: 'All non-zeros are significant. The trapped zeros are significant. The trailing zero after decimal is significant. Total = 5.'
            },
            {
              question: 'Which of the following numbers has exactly 3 significant figures?',
              options: ['0.03', '300', '3.00', '0.30'],
              correctOptionIndex: 2,
              explanation: '3.00 has three significant figures because trailing zeros after the decimal are significant.'
            }
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
If a continuous function $f(x)$ has a positive value at $a$ ($f(a) > 0$) and a negative value at $b$ ($f(b) < 0$), then the graph of the function must cross the x-axis somewhere between $a$ and $b$. That crossing point is the root!

### Algorithm
1. Find two points, $a$ and $b$, such that $f(a) \\times f(b) < 0$ (they have opposite signs).
2. Calculate the midpoint $c = \\frac{a + b}{2}$.
3. Check $f(c)$:
   - If $f(c) == 0$, $c$ is the exact root. Stop.
   - If $f(c)$ has the same sign as $f(a)$, the root is between $c$ and $b$. Update $a = c$.
   - If $f(c)$ has the same sign as $f(b)$, the root is between $a$ and $c$. Update $b = c$.
4. Repeat steps 2 and 3 until $|a - b|$ is smaller than your desired error tolerance.

### Convergence
The Bisection method is **guaranteed to converge** (find the root) if the initial guesses bracket the root. However, it is **slow** (linear convergence).

### Python Code
\`\`\`python
def f(x):
    return x**3 - x - 2

def bisection(a, b, tol):
    if f(a) * f(b) >= 0:
        print("Incorrect initial guesses.")
        return None
    
    while (b - a) >= tol:
        c = (a + b) / 2
        if f(c) == 0:
            break
        elif f(c) * f(a) < 0:
            b = c
        else:
            a = c
            
    return c

root = bisection(1, 2, 0.001)
print(f"Root: {root}")
\`\`\`
`,
          shortNotes: 'Finds root by halving interval [a,b]. Condition: f(a)*f(b) < 0. Midpoint c = (a+b)/2. Guaranteed convergence but very slow.',
          examples: [
            {
              title: 'Finding Root of x^2 - 4',
              description: 'Let a=0 (f(0)=-4) and b=3 (f(3)=5). Midpoint c=1.5. f(1.5)= -1.75. Since f(1.5) is negative, replace a. New interval [1.5, 3].'
            }
          ],
          keyPoints: [
            'Requires two initial guesses that bracket the root.',
            'Relies on the Intermediate Value Theorem.',
            'Convergence is linear (slow).',
            'It is a bracketing method, so it never fails to find a root if one exists in the interval.'
          ],
          mcqs: [
            {
              question: 'What is the necessary condition for initial guesses a and b in the Bisection method?',
              options: ['f(a) * f(b) > 0', 'f(a) * f(b) = 0', 'f(a) * f(b) < 0', 'f(a) = f(b)'],
              correctOptionIndex: 2,
              explanation: 'The function must have opposite signs at a and b for a root to exist between them.'
            },
            {
              question: 'What is the convergence rate of the Bisection method?',
              options: ['Linear', 'Quadratic', 'Cubic', 'Exponential'],
              correctOptionIndex: 0,
              explanation: 'Bisection method has a linear convergence rate, making it slow.'
            },
            {
              question: 'How is the next point calculated in Bisection method?',
              options: ['c = a - b', 'c = (a * b) / 2', 'c = a + b', 'c = (a + b) / 2'],
              correctOptionIndex: 3,
              explanation: 'The interval is halved by finding the arithmetic mean (midpoint) of a and b.'
            }
          ]
        },
        {
          id: 'newton-raphson',
          title: 'Newton-Raphson Method',
          simpleExplanation: 'A very fast method that uses the tangent line (derivative) of the function to slide quickly toward the root.',
          detailedExplanation: `
## Newton-Raphson Method
Instead of just guessing, Newton's method uses the slope of the curve to point towards the root. You start with one guess, draw a tangent line there, and see where that tangent hits the x-axis. That hit becomes your new, better guess.

### Derivation
From Taylor's series, or geometrically looking at the tangent:
Slope $f'(x_0) = \\frac{f(x_0) - 0}{x_0 - x_1}$
Rearranging for $x_1$:
**Formula:** $x_{n+1} = x_n - \\frac{f(x_n)}{f'(x_n)}$

### Algorithm
1. Choose an initial guess $x_0$.
2. Calculate the next guess using the formula: $x_{n+1} = x_n - \\frac{f(x_n)}{f'(x_n)}$
3. Repeat step 2 until $|x_{n+1} - x_n|$ is less than the tolerance.

### Convergence
Newton-Raphson has **Quadratic convergence** (very fast). The number of correct decimal places roughly doubles with every step! However, it can fail if $f'(x_n) = 0$ (division by zero) or if the initial guess is too far away.

### Python Code
\`\`\`python
def f(x):
    return x**2 - 4

def df(x):
    return 2*x

def newton_raphson(x0, tol):
    x = x0
    while True:
        fx = f(x)
        dfx = df(x)
        if dfx == 0:
            print("Derivative is zero. Fails.")
            return None
            
        x_new = x - fx / dfx
        if abs(x_new - x) < tol:
            return x_new
        x = x_new

root = newton_raphson(3, 0.0001)
print(f"Root: {root}")
\`\`\`
`,
          shortNotes: 'Formula: x_{n+1} = x_n - f(x_n)/f\'(x_n). Requires only one initial guess. Very fast (quadratic convergence). Fails if derivative is zero.',
          examples: [
            {
              title: 'Find root of x^2 - 4 = 0',
              description: 'Guess x0 = 3. f(3)=5, f\'(3)=6. x1 = 3 - (5/6) = 2.166. Much closer to true root 2.0 very quickly.'
            }
          ],
          keyPoints: [
            'Requires the derivative of the function $f\'(x)$.',
            'Needs only one initial guess (Open method).',
            'Quadratic convergence rate (fastest among basic methods).',
            'Fails if the tangent is horizontal ($f\'(x) = 0$).'
          ],
          mcqs: [
            {
              question: 'What is the formula for the Newton-Raphson method?',
              options: ['x - f(x)/f\'(x)', 'x + f(x)/f\'(x)', 'x - f\'(x)/f(x)', 'f(x) - x/f\'(x)'],
              correctOptionIndex: 0,
              explanation: 'The next point is derived by subtracting the ratio of the function to its derivative from the current point.'
            },
            {
              question: 'What is the order of convergence for the Newton-Raphson method?',
              options: ['Linear (1)', 'Quadratic (2)', 'Cubic (3)', 'Super-linear (1.618)'],
              correctOptionIndex: 1,
              explanation: 'It converges quadratically, meaning the error squares at each step.'
            },
            {
              question: 'When will Newton-Raphson method fail?',
              options: ['If initial guess is a root', 'If f(x) is negative', 'If f\'(x) is zero', 'If f(x) is a polynomial'],
              correctOptionIndex: 2,
              explanation: 'If the derivative f\'(x) is zero, the tangent is parallel to the x-axis and will never intersect it, leading to a division by zero error.'
            }
          ]
        },
        {
          id: 'secant-method',
          title: 'Secant Method',
          simpleExplanation: 'Like Newton-Raphson, but you don’t need to calculate the derivative. It uses two previous points to draw a line instead of a tangent.',
          detailedExplanation: `
## Secant Method
The Newton-Raphson method is fast but requires calculating the derivative $f'(x)$, which can be hard for complex functions. The Secant method approximates the derivative by using a secant line drawn through two recent points.

### Formula
Approximate derivative: $f'(x_n) \\approx \\frac{f(x_n) - f(x_{n-1})}{x_n - x_{n-1}}$

Substitute this into Newton's formula to get the **Secant Method Formula**:
$x_{n+1} = x_n - f(x_n) \\frac{x_n - x_{n-1}}{f(x_n) - f(x_{n-1})}$

### Algorithm
1. Choose two initial guesses $x_0$ and $x_1$. (They do NOT need to bracket the root).
2. Calculate the next point $x_2$ using the formula.
3. Replace $x_0$ with $x_1$, and $x_1$ with $x_2$.
4. Repeat until $|x_{n+1} - x_n| < \\text{tolerance}$.

### Convergence
It is faster than Bisection but slightly slower than Newton-Raphson. Its convergence rate is super-linear (approx $1.618$).

### Python Code
\`\`\`python
def f(x):
    return x**3 - 20

def secant(x0, x1, tol):
    while abs(x1 - x0) >= tol:
        f0 = f(x0)
        f1 = f(x1)
        if f1 - f0 == 0:
            print("Division by zero")
            break
            
        x2 = x1 - f1 * (x1 - x0) / (f1 - f0)
        x0 = x1
        x1 = x2
        
    return x1

root = secant(2, 3, 0.0001)
print(f"Root: {root}")
\`\`\`
`,
          shortNotes: 'Uses a secant line to approximate the derivative. Formula: x2 = x1 - f(x1)*(x1-x0)/(f(x1)-f(x0)). Requires two guesses, but no bracketing. Super-linear convergence.',
          examples: [
            {
              title: 'No derivative needed',
              description: 'If f(x) is extremely complex, you just plug in two x values to get a straight line slope, avoiding complex calculus.'
            }
          ],
          keyPoints: [
            'Does NOT require calculating derivatives.',
            'Requires two initial guesses (Open method).',
            'Convergence rate is 1.618 (Golden ratio).',
            'Can fail if $f(x_n) = f(x_{n-1})$ (division by zero).'
          ],
          mcqs: [
            {
              question: 'Why is the Secant method often preferred over Newton-Raphson?',
              options: ['It is faster', 'It does not require finding derivatives', 'It is guaranteed to converge', 'It only requires one initial guess'],
              correctOptionIndex: 1,
              explanation: 'Secant approximates the derivative, saving the user from doing analytical calculus.'
            },
            {
              question: 'How many initial guesses does the Secant method require?',
              options: ['1', '2', '3', 'None'],
              correctOptionIndex: 1,
              explanation: 'It requires two points to draw the initial secant line.'
            },
            {
              question: 'What is the order of convergence for the Secant method?',
              options: ['1 (Linear)', '1.618 (Super-linear)', '2 (Quadratic)', '3 (Cubic)'],
              correctOptionIndex: 1,
              explanation: 'The order is approximately 1.618, making it faster than linear but slower than quadratic.'
            }
          ]
        },
        {
          id: 'regula-falsi',
          title: 'Regula-Falsi (False Position) Method',
          simpleExplanation: 'A mix of Bisection and Secant methods. It brackets the root like Bisection but draws straight lines between points like Secant to find the next guess faster.',
          detailedExplanation: `
## Regula-Falsi (False Position) Method
The Bisection method always picks the midpoint, which is safe but ignores the function's values. If $f(a)$ is very close to 0 and $f(b)$ is huge, the root is probably closer to $a$. The False Position method takes advantage of this by connecting $f(a)$ and $f(b)$ with a straight line to find the next guess.

### Algorithm
1. Find initial guesses $x_0$ and $x_1$ such that $f(x_0) \\times f(x_1) < 0$ (bracketing).
2. Calculate the intersection of the straight line with the x-axis:
   $x_2 = \\frac{x_0 \\cdot f(x_1) - x_1 \\cdot f(x_0)}{f(x_1) - f(x_0)}$
3. Evaluate $f(x_2)$.
4. Replace either $x_0$ or $x_1$ with $x_2$ such that the new interval still brackets the root (just like Bisection).
5. Repeat until tolerance is reached.

### Convergence
It is a bracketing method, so it **always converges**. It is generally faster than Bisection but can be very slow if the curve is highly convex (it can get "stuck" using the same endpoint repeatedly).

### Python Code
\`\`\`python
def f(x):
    return x**3 - x - 1

def regula_falsi(x0, x1, tol):
    if f(x0) * f(x1) >= 0:
        return None
        
    x2 = x0
    while True:
        f0 = f(x0)
        f1 = f(x1)
        x2_old = x2
        
        # False position formula
        x2 = (x0 * f1 - x1 * f0) / (f1 - f0)
        
        if abs(x2 - x2_old) < tol:
            break
            
        if f(x2) * f0 < 0:
            x1 = x2
        else:
            x0 = x2
            
    return x2

root = regula_falsi(1, 2, 0.0001)
print(f"Root: {root}")
\`\`\`
`,
          shortNotes: 'Bracketing method. Connects f(a) and f(b) with a line. Formula: c = (a*f(b) - b*f(a))/(f(b) - f(a)). Guaranteed convergence. Faster than bisection.',
          examples: [
            {
              title: 'Visualizing False Position',
              description: 'Instead of blindly cutting the interval in half, it draws a chord. Where the chord crosses the x-axis is the new guess.'
            }
          ],
          keyPoints: [
            'Requires two initial guesses that bracket the root.',
            'Uses a straight line (chord) interpolation.',
            'Guaranteed to converge.',
            'Can suffer from slow convergence on one side of the root.'
          ],
          mcqs: [
            {
              question: 'Regula-Falsi method is similar to which two methods?',
              options: ['Newton & Secant', 'Bisection & Secant', 'Bisection & Newton', 'Euler & Secant'],
              correctOptionIndex: 1,
              explanation: 'It uses bracketing like Bisection and straight lines like Secant.'
            },
            {
              question: 'Does Regula-Falsi guarantee convergence?',
              options: ['Yes', 'No', 'Only for polynomials', 'Only if f\'(x) > 0'],
              correctOptionIndex: 0,
              explanation: 'Because it is a bracketing method, it traps the root and guarantees finding it.'
            },
            {
              question: 'What is a primary disadvantage of Regula-Falsi?',
              options: ['It requires derivatives', 'It may diverge', 'One endpoint may remain fixed, causing slow convergence', 'It requires 3 guesses'],
              correctOptionIndex: 2,
              explanation: 'For concave/convex curves, one endpoint might never update, making progress very slow.'
            }
          ]
        },
        {
          id: 'fixed-point-iteration',
          title: 'Fixed Point Iteration Method',
          simpleExplanation: 'Rewrite the equation f(x) = 0 into the form x = g(x). Then keep plugging your answer back into g(x) until it stops changing.',
          detailedExplanation: `
## Fixed Point Iteration Method
This is a very simple method, but it requires some algebraic manipulation.

### The Concept
If you have an equation $f(x) = 0$, you rearrange it algebraically into the form $x = g(x)$.
A "fixed point" is a value of $x$ where plugging it into $g(x)$ gives you back $x$. (i.e., $x = g(x)$).

### Algorithm
1. Rearrange $f(x) = 0$ to get $x = g(x)$.
2. Choose an initial guess $x_0$.
3. Calculate $x_1 = g(x_0)$.
4. Calculate $x_2 = g(x_1)$, and in general $x_{n+1} = g(x_n)$.
5. Repeat until $|x_{n+1} - x_n| < \\text{tolerance}$.

### Convergence Condition
This method will ONLY converge if the slope of $g(x)$ is gentle near the root.
Specifically, **$|g'(x)| < 1$** near the root. If $|g'(x)| > 1$, the guesses will diverge (blow up).

### Python Code
\`\`\`python
import math

# Solving f(x) = x^3 + x - 1 = 0
# Rearrange to: x = 1 / (x^2 + 1)
def g(x):
    return 1 / (x**2 + 1)

def fixed_point(x0, tol):
    x_old = x0
    while True:
        x_new = g(x_old)
        if abs(x_new - x_old) < tol:
            return x_new
        x_old = x_new

root = fixed_point(0.5, 0.0001)
print(f"Root: {root}")
\`\`\`
`,
          shortNotes: 'Convert f(x)=0 to x=g(x). Iterate x_{n+1} = g(x_n). Converges ONLY IF |g\'(x)| < 1 near the root. Linear convergence.',
          examples: [
            {
              title: 'Rearranging f(x)',
              description: 'f(x) = x^2 - x - 2 = 0. Option A: x = x^2 - 2. Option B: x = sqrt(x + 2). Option B is better because its derivative is smaller, aiding convergence.'
            }
          ],
          keyPoints: [
            'Requires rearranging the function to $x = g(x)$.',
            'Convergence depends entirely on how you rearrange it.',
            'Must satisfy $|g\'(x)| < 1$ to converge.',
            'Simple to program but can be unstable.'
          ],
          mcqs: [
            {
              question: 'What is the mandatory condition for convergence in Fixed Point Iteration?',
              options: ['|g\'(x)| > 1', '|g\'(x)| < 1', 'g\'(x) = 0', 'g(x) < 0'],
              correctOptionIndex: 1,
              explanation: 'The absolute value of the derivative of g(x) must be strictly less than 1 near the root.'
            },
            {
              question: 'How is the equation $f(x)=0$ manipulated for this method?',
              options: ['$f\'(x) = 0$', '$x = f(x)$', '$x = g(x)$', '$g(x) = 0$'],
              correctOptionIndex: 2,
              explanation: 'It is algebraically rearranged into $x = g(x)$.'
            },
            {
              question: 'If $|g\'(x)| > 1$, what happens?',
              options: ['It converges faster', 'It converges to a different root', 'It diverges', 'It loops infinitely at the same value'],
              correctOptionIndex: 2,
              explanation: 'A derivative greater than 1 means errors get multiplied at each step, causing divergence.'
            }
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
## Interpolation Basics
Interpolation means finding a value inside a given range of data points. If the x-values (independent variables) are equally spaced, we use Newton's Forward or Backward difference formulas.

### Forward Difference Table
We build a table of differences. 
$\\Delta y_0 = y_1 - y_0$
$\\Delta^2 y_0 = \\Delta y_1 - \\Delta y_0$ ... and so on.

### Newton's Forward Formula
Use this when finding a value near the **start** (top) of the data table.
Let $h$ be the equal spacing between x-values.
Let $u = \\frac{x - x_0}{h}$ (where $x$ is the value to find, $x_0$ is the first x-value).

**Formula:**
$y = y_0 + u \\Delta y_0 + \\frac{u(u-1)}{2!} \\Delta^2 y_0 + \\frac{u(u-1)(u-2)}{3!} \\Delta^3 y_0 + ...$

### Python Implementation (Concept)
To do this in Python, you first compute the forward difference table (a 2D array), then apply the formula using the top row of differences.
`,
          shortNotes: 'Used for equally spaced data. Best for finding values near the START of the table. Uses forward difference operator Δ.',
          examples: [
            {
              title: 'When to use Forward',
              description: 'If x-values are 10, 20, 30, 40. And you want to find y for x=12, use Forward because 12 is near the beginning (10).'
            }
          ],
          keyPoints: [
            'Only works for equally spaced x-values.',
            'Uses the forward difference operator $\\Delta$.',
            'Relies on the top row of the difference table.',
            'Calculates a parameter $u = (x - x_0)/h$.'
          ],
          mcqs: [
            {
              question: 'When is Newton\'s Forward Interpolation best used?',
              options: ['Near the end of the data', 'Near the beginning of the data', 'For unequally spaced data', 'In the exact middle of the data'],
              correctOptionIndex: 1,
              explanation: 'It is designed to be most accurate using the leading differences near the top of the table.'
            },
            {
              question: 'What does \'h\' represent in the formula?',
              options: ['Height of the function', 'Difference between x and y', 'Equal spacing interval between x-values', 'The first x-value'],
              correctOptionIndex: 2,
              explanation: 'h is the step size or constant interval between consecutive x data points.'
            },
            {
              question: 'What is the formula for u in Forward Interpolation?',
              options: ['(x - x_n)/h', '(x_0 - x)/h', '(x - x_0)/h', '(x + x_0)/h'],
              correctOptionIndex: 2,
              explanation: 'u measures how many steps h the target x is away from the starting point x0.'
            }
          ]
        },
        {
          id: 'lagrange-interpolation',
          title: 'Lagrange\'s Interpolation',
          simpleExplanation: 'A flexible method for guessing values that works even when the data points are NOT equally spaced.',
          detailedExplanation: `
## Lagrange's Interpolation
Newton's Forward and Backward formulas only work if the x-values are equally spaced (e.g., 2, 4, 6, 8). If the data is randomly spaced (e.g., 2, 3, 7, 10), we MUST use a different method. Lagrange's formula is perfect for this.

### The Formula
For given points $(x_0, y_0), (x_1, y_1), ... (x_n, y_n)$, the interpolated value $y$ for a given $x$ is:

$y = \\frac{(x-x_1)(x-x_2)...(x-x_n)}{(x_0-x_1)(x_0-x_2)...(x_0-x_n)} y_0 + \\frac{(x-x_0)(x-x_2)...(x-x_n)}{(x_1-x_0)(x_1-x_2)...(x_1-x_n)} y_1 + ...$

Notice the pattern: for the term containing $y_i$, the numerator has all $(x - x_j)$ except $x_i$, and the denominator replaces the plain $x$ with $x_i$.

### Python Code
\`\`\`python
def lagrange_interpolation(x_vals, y_vals, x_target):
    n = len(x_vals)
    result = 0.0
    
    for i in range(n):
        term = y_vals[i]
        for j in range(n):
            if i != j:
                term = term * (x_target - x_vals[j]) / (x_vals[i] - x_vals[j])
        result += term
        
    return result

# Unequally spaced data
X = [0, 1, 3, 4]
Y = [5, 6, 50, 105]
# Find y for x=2
ans = lagrange_interpolation(X, Y, 2)
print(f"y at x=2 is {ans}") # Expected output: 19.0
\`\`\`
`,
          shortNotes: 'Works for UNEQUALLY spaced data. Computes a weighted sum of the y-values. No difference table required.',
          examples: [
            {
              title: 'Unequal Spacing',
              description: 'Data: x=[1, 2, 5], y=[10, 15, 30]. Spacing is 1, then 3. Newton methods fail here. Lagrange handles it perfectly.'
            }
          ],
          keyPoints: [
            'Does not require equally spaced intervals.',
            'Does not require a difference table.',
            'Computationally heavy if the number of points is large.',
            'Can also be used for equally spaced data.'
          ],
          mcqs: [
            {
              question: 'When must you use Lagrange Interpolation over Newton Forward?',
              options: ['When points are equally spaced', 'When points are unequally spaced', 'When finding roots', 'When finding derivatives'],
              correctOptionIndex: 1,
              explanation: 'Lagrange does not rely on a constant step size h, making it perfect for unequal intervals.'
            },
            {
              question: 'Does Lagrange Interpolation require a difference table?',
              options: ['Yes', 'No', 'Only for large datasets', 'Only for polynomials'],
              correctOptionIndex: 1,
              explanation: 'It computes the polynomial directly using products and sums, skipping difference tables.'
            },
            {
              question: 'What happens to the numerator term corresponding to y_i?',
              options: ['It includes (x - x_i)', 'It skips (x - x_i)', 'It is squared', 'It is zero'],
              correctOptionIndex: 1,
              explanation: 'To avoid the term becoming zero at x = x_i, the factor (x - x_i) is skipped in the numerator and denominator.'
            }
          ]
        }
      ]
    },
    {
      id: 'unit4',
      title: 'Numerical Differentiation & Integration',
      description: 'Using algorithms to find slopes (derivatives) and areas under curves (integrals).',
      topics: [
        {
          id: 'numerical-integration-trapezoidal',
          title: 'Trapezoidal Rule',
          simpleExplanation: 'Estimating the area under a curve by drawing straight lines between points, creating shapes that look like trapezoids.',
          detailedExplanation: `
## Numerical Integration
Integration finds the area under a curve. When a function is too hard to integrate analytically, or we only have a table of data points, we use numerical integration (quadrature).

### The Trapezoidal Rule
This is the simplest method. It connects data points with straight lines. The area under the curve is approximated as the sum of the areas of multiple trapezoids.

**Formula:**
Let $h = \\frac{b - a}{n}$ be the width of each trapezoid (where $n$ is number of intervals).
$y_0, y_1, ... y_n$ are the function values.

$\\int_a^b f(x) dx \\approx \\frac{h}{2} \\left[ (y_0 + y_n) + 2(y_1 + y_2 + ... + y_{n-1}) \\right]$

**In words:** "h over 2 times (first + last + 2 * sum of the rest)."

### Python Code
\`\`\`python
def f(x):
    return 1 / (1 + x**2)

def trapezoidal(a, b, n):
    h = (b - a) / n
    result = f(a) + f(b) # first and last
    
    for i in range(1, n):
        result += 2 * f(a + i*h) # sum of the rest * 2
        
    return (h / 2) * result

# Integrate 1/(1+x^2) from 0 to 1 with 10 intervals
area = trapezoidal(0, 1, 10)
print(f"Area: {area}") 
\`\`\`
`,
          shortNotes: 'Connects points with straight lines (linear). Formula: (h/2) * [ (y_first + y_last) + 2*(sum of rest) ]. Can be used for ANY number of intervals.',
          examples: [
            {
              title: 'Simple Area',
              description: 'If h=1, and y values are [10, 20, 30]. Area = (1/2) * [(10 + 30) + 2*(20)] = 0.5 * [40 + 40] = 40.'
            }
          ],
          keyPoints: [
            'Approximates the curve using straight linear segments.',
            'Has no restrictions on the number of intervals ($n$ can be odd or even).',
            'Least accurate of the Newton-Cotes formulas.',
            'Error is proportional to $h^2$.'
          ],
          mcqs: [
            {
              question: 'The Trapezoidal rule approximates the curve using:',
              options: ['Parabolas', 'Straight lines', 'Cubic curves', 'Circles'],
              correctOptionIndex: 1,
              explanation: 'It draws a straight line between two adjacent points, forming a trapezoid.'
            },
            {
              question: 'In the Trapezoidal rule formula, which values are multiplied by 2?',
              options: ['First and last only', 'All values', 'All intermediate values', 'None'],
              correctOptionIndex: 2,
              explanation: 'The first and last y-values are taken once; all the middle (intermediate) values are multiplied by 2.'
            },
            {
              question: 'Is there a restriction on the number of intervals (n) for the Trapezoidal rule?',
              options: ['Must be even', 'Must be a multiple of 3', 'Must be odd', 'No restriction'],
              correctOptionIndex: 3,
              explanation: 'Unlike Simpson\'s rules, Trapezoidal can be applied to any number of intervals.'
            }
          ]
        },
        {
          id: 'simpsons-13',
          title: 'Simpson\'s 1/3 Rule',
          simpleExplanation: 'A much better way to find area. Instead of straight lines, it uses smooth U-shaped curves (parabolas) to connect the points.',
          detailedExplanation: `
## Simpson's 1/3 Rule
While Trapezoidal uses straight lines (degree 1), Simpson's 1/3 rule fits a parabola (degree 2 curve) through three adjacent points. Because curves match real functions better than straight lines, this method is highly accurate.

### The Formula
Let $h = \\frac{b - a}{n}$. **Crucial: $n$ MUST be an EVEN number.**

$\\int_a^b f(x) dx \\approx \\frac{h}{3} \\left[ (y_0 + y_n) + 4(y_1 + y_3 + ...) + 2(y_2 + y_4 + ...) \\right]$

**In words:** "h over 3 times (first + last + 4 * sum of ODD positions + 2 * sum of EVEN positions)."

### Why 1/3?
The coefficient in front of the formula is $h/3$, hence the name.

### Python Code
\`\`\`python
def simpson13(a, b, n):
    if n % 2 != 0:
        return "n must be even"
        
    h = (b - a) / n
    result = f(a) + f(b)
    
    for i in range(1, n):
        k = a + i*h
        if i % 2 == 0:
            result += 2 * f(k) # Even indices
        else:
            result += 4 * f(k) # Odd indices
            
    return (h / 3) * result
\`\`\`
`,
          shortNotes: 'Uses parabolas. Formula: (h/3)*[ (y_first + y_last) + 4*(Odd y) + 2*(Even y) ]. Requires an EVEN number of intervals (n).',
          examples: [
            {
              title: 'Requirement Check',
              description: 'If you have 5 data points, n = 4 intervals. Since 4 is even, you CAN use Simpson\'s 1/3.'
            }
          ],
          keyPoints: [
            'Approximates the curve using quadratic parabolas.',
            'The number of intervals ($n$) MUST be an even number.',
            'Much more accurate than the Trapezoidal rule.',
            'Multiplier pattern is 1, 4, 2, 4, 2... 4, 1.'
          ],
          mcqs: [
            {
              question: 'Simpson\'s 1/3 rule assumes the curve between points is a:',
              options: ['Straight line', 'Parabola', 'Cubic spline', 'Circle'],
              correctOptionIndex: 1,
              explanation: 'It uses quadratic interpolation, which forms parabolas.'
            },
            {
              question: 'What is the restriction on the number of intervals (n) for Simpson\'s 1/3 rule?',
              options: ['Must be odd', 'Must be a multiple of 3', 'Must be even', 'No restriction'],
              correctOptionIndex: 2,
              explanation: 'It requires pairs of intervals to fit parabolas, so total intervals must be even.'
            },
            {
              question: 'In the formula, what are the odd-indexed terms multiplied by?',
              options: ['2', '3', '4', '1'],
              correctOptionIndex: 2,
              explanation: 'Terms like y_1, y_3, y_5 are multiplied by 4.'
            }
          ]
        }
      ]
    },
    {
      id: 'unit5',
      title: 'Solution of Linear Algebraic Equations',
      description: 'Methods to solve multiple equations with multiple unknowns (like x, y, z) simultaneously.',
      topics: [
        {
          id: 'gauss-elimination',
          title: 'Gauss Elimination Method',
          simpleExplanation: 'A step-by-step way to simplify a system of equations into a triangle shape, making it super easy to solve from the bottom up.',
          detailedExplanation: `
## Gauss Elimination
If you have a system of linear equations (e.g., $3x + 2y - z = 1$), you can represent it as a matrix. Gauss elimination systematically modifies this matrix to make the bottom-left corner all zeros.

### The Process
1. **Forward Elimination:** Use row operations (adding/subtracting multiples of rows) to convert the matrix into an **Upper Triangular Matrix** (all zeros below the main diagonal).
2. **Back Substitution:** Once you have a triangle, the last equation will look like $5z = 10$, meaning $z = 2$. Plug $z$ into the equation above it to find $y$, and so on up to $x$.

### Example System
$2x + y - z = 8$
$-3x - y + 2z = -11$
$-2x + y + 2z = -3$

Forward elimination turns the coefficient matrix into:
$[2, 1, -1]$
$[0, 0.5, 0.5]$
$[0, 0, 1]$
Then solve for z, then y, then x.
`,
          shortNotes: 'Direct method. Step 1: Forward elimination to create Upper Triangular Matrix. Step 2: Back substitution to find unknowns.',
          examples: [
            {
              title: 'Upper Triangular form',
              description: 'Matrix looks like: [ [a, b, c], [0, d, e], [0, 0, f] ]. Notice the zeros form a triangle in the bottom left.'
            }
          ],
          keyPoints: [
            'It is a direct method (gives exact answer in finite steps, ignoring round-off).',
            'Goal is an Upper Triangular Matrix.',
            'Uses row operations.',
            'Requires back substitution at the end.'
          ],
          mcqs: [
            {
              question: 'What is the goal of the forward elimination step in Gauss Elimination?',
              options: ['Identity Matrix', 'Lower Triangular Matrix', 'Upper Triangular Matrix', 'Diagonal Matrix'],
              correctOptionIndex: 2,
              explanation: 'It zeroes out the elements below the main diagonal, forming an upper triangular matrix.'
            },
            {
              question: 'What process is used after forming the upper triangular matrix?',
              options: ['Forward substitution', 'Back substitution', 'Integration', 'Iteration'],
              correctOptionIndex: 1,
              explanation: 'You solve the easiest variable at the bottom and substitute backward up the equations.'
            },
            {
              question: 'Is Gauss Elimination a direct or iterative method?',
              options: ['Iterative', 'Direct', 'Graphical', 'Randomized'],
              correctOptionIndex: 1,
              explanation: 'It provides the solution in a fixed number of algorithmic steps (direct method).'
            }
          ]
        },
        {
          id: 'gauss-seidel',
          title: 'Gauss-Seidel Iterative Method',
          simpleExplanation: 'A guessing game. Start with guesses for x, y, z. Use the equations to improve x, then IMMEDIATELY use the new x to improve y. Repeat until the numbers stop changing.',
          detailedExplanation: `
## Gauss-Seidel Method
Unlike Gauss Elimination, which is direct, Gauss-Seidel is an **Iterative Method**. You start with a guess (usually zeros) and keep refining it.

### How it works
1. Rearrange the equations so each variable is on the left side of one equation.
   $x = (C_1 - b_1y - c_1z) / a_1$
   $y = (C_2 - a_2x - c_2z) / b_2$
   $z = (C_3 - a_3x - b_3y) / c_3$
2. Guess $y=0, z=0$, plug into the first equation to get a new $x$.
3. **The Trick:** When calculating the new $y$ in the second equation, use the **NEW** $x$ you just found, not the old guess!
4. Repeat this loop until the values stabilize.

### Convergence Condition
It only works if the system is **Diagonally Dominant**. This means the absolute value of the diagonal coefficient is greater than or equal to the sum of the absolute values of the other coefficients in that row.
`,
          shortNotes: 'Iterative method. Uses the most recently updated values immediately in the next equation. Requires Diagonally Dominant matrix to converge.',
          examples: [
            {
              title: 'Immediate Update',
              description: 'If you find x=2 in eq 1, you use x=2 immediately in eq 2 to find y. You don\'t wait for the next loop.'
            }
          ],
          keyPoints: [
            'Iterative method.',
            'Uses latest updated values immediately (unlike Jacobi method).',
            'Converges faster than the Jacobi method.',
            'System must be diagonally dominant to guarantee convergence.'
          ],
          mcqs: [
            {
              question: 'What is the main difference between Gauss-Seidel and Jacobi methods?',
              options: ['Seidel is direct', 'Seidel uses updated values immediately', 'Jacobi requires no initial guess', 'Seidel uses a difference table'],
              correctOptionIndex: 1,
              explanation: 'Gauss-Seidel uses the newest available variable values instantly, while Jacobi waits for the next full iteration cycle.'
            },
            {
              question: 'What condition guarantees convergence for Gauss-Seidel?',
              options: ['Symmetric matrix', 'Diagonal dominance', 'Identity matrix', 'Zero matrix'],
              correctOptionIndex: 1,
              explanation: 'The diagonal elements must be larger in magnitude than the sum of the other elements in their respective rows.'
            },
            {
              question: 'Which method generally converges faster?',
              options: ['Jacobi', 'Gauss-Seidel', 'They are equal', 'Bisection'],
              correctOptionIndex: 1,
              explanation: 'Because it uses updated information immediately, Gauss-Seidel reaches the solution in fewer iterations than Jacobi.'
            }
          ]
        }
      ]
    },
    {
      id: 'unit6',
      title: 'Ordinary Differential Equations (ODE)',
      description: 'Solving differential equations numerically when analytical calculus is too difficult.',
      topics: [
        {
          id: 'eulers-method',
          title: 'Euler\'s Method',
          simpleExplanation: 'Using the slope (derivative) at a point to take a tiny step forward in a straight line to guess the next point.',
          detailedExplanation: `
## Euler's Method
This is the simplest numerical method for solving Ordinary Differential Equations (ODEs) of the form $dy/dx = f(x, y)$ with an initial condition $y(x_0) = y_0$.

### The Concept
A differential equation gives you the slope of the curve at any point. If you know a starting point, you can calculate the slope there. Assume the slope stays constant for a very small step $h$, and draw a straight line to find the next point.

### Formula
$y_{n+1} = y_n + h \\cdot f(x_n, y_n)$
$x_{n+1} = x_n + h$

Where $h$ is the step size. Smaller $h$ means better accuracy but more computation.

### Python Code
\`\`\`python
# Solve dy/dx = x + y, given y(0) = 1. Find y at x=0.2 with h=0.1
def f(x, y):
    return x + y

def euler(x0, y0, target_x, h):
    x = x0
    y = y0
    
    while x < target_x:
        slope = f(x, y)
        y = y + h * slope # Update y
        x = x + h         # Update x
        
    return y

ans = euler(0, 1, 0.2, 0.1)
print(ans)
\`\`\`
`,
          shortNotes: 'Simplest ODE solver. Formula: y_{new} = y_{old} + h * f(x, y). Assumes constant slope over step h. Not very accurate unless h is tiny.',
          examples: [
            {
              title: 'One step of Euler',
              description: 'dy/dx = x+y. Start (0,1), h=0.1. Slope = 0+1=1. New y = 1 + 0.1*(1) = 1.1. New point is (0.1, 1.1).'
            }
          ],
          keyPoints: [
            'First-order method.',
            'Uses the tangent line to approximate the curve.',
            'Error is large unless the step size $h$ is very small.',
            'Forms the basis for more advanced methods like Runge-Kutta.'
          ],
          mcqs: [
            {
              question: 'Euler\'s method is used for solving:',
              options: ['Roots of equations', 'Integrals', 'Ordinary Differential Equations', 'Linear Systems'],
              correctOptionIndex: 2,
              explanation: 'It steps through an ODE using its derivative to find y values.'
            },
            {
              question: 'In Euler\'s formula $y_{n+1} = y_n + h * f(x_n, y_n)$, what does $f(x_n, y_n)$ represent?',
              options: ['The area', 'The slope (dy/dx)', 'The second derivative', 'The step size'],
              correctOptionIndex: 1,
              explanation: 'f(x, y) is the differential equation dy/dx, representing the slope of the tangent.'
            },
            {
              question: 'How can you increase the accuracy of Euler\'s method?',
              options: ['Increase h', 'Decrease h', 'Use negative h', 'It is perfectly accurate always'],
              correctOptionIndex: 1,
              explanation: 'A smaller step size h means the tangent line approximation is used for a shorter distance, reducing error.'
            }
          ]
        },
        {
          id: 'runge-kutta-4',
          title: 'Runge-Kutta Method (4th order)',
          simpleExplanation: 'The industry standard for solving ODEs. It calculates the slope at four different places in a single step and averages them to get a highly accurate next point.',
          detailedExplanation: `
## Runge-Kutta 4th Order (RK4)
Euler's method only looks at the slope at the beginning of the step. RK4 is vastly superior because it calculates four different slopes and takes a weighted average.

### The Four Slopes (k1, k2, k3, k4)
1. **$k_1$:** Slope at the beginning of the step (same as Euler).
   $k_1 = h \\cdot f(x_n, y_n)$
2. **$k_2$:** Slope at the midpoint, using $k_1$ to guess the midpoint $y$.
   $k_2 = h \\cdot f(x_n + \\frac{h}{2}, y_n + \\frac{k_1}{2})$
3. **$k_3$:** Another slope at the midpoint, using $k_2$ to guess the midpoint $y$.
   $k_3 = h \\cdot f(x_n + \\frac{h}{2}, y_n + \\frac{k_2}{2})$
4. **$k_4$:** Slope at the end of the step, using $k_3$.
   $k_4 = h \\cdot f(x_n + h, y_n + k_3)$

### The Formula
Take a weighted average where the midpoints get twice the weight:
$y_{n+1} = y_n + \\frac{1}{6}(k_1 + 2k_2 + 2k_3 + k_4)$
$x_{n+1} = x_n + h$

This method is incredibly accurate and is the default algorithm in software like MATLAB and SciPy for solving ODEs.
`,
          shortNotes: 'Highly accurate. Calculates 4 slopes (k1,k2,k3,k4). k2 & k3 are at midpoints. Formula: y_{new} = y_{old} + (1/6)*(k1 + 2k2 + 2k3 + k4).',
          examples: [
            {
              title: 'Weights',
              description: 'Notice the weights in the formula: 1/6 for k1, 2/6 for k2, 2/6 for k3, and 1/6 for k4. They sum to 1, making it an average slope.'
            }
          ],
          keyPoints: [
            'Fourth-order accuracy (very low error).',
            'Evaluates the function 4 times per step.',
            'Uses a weighted average of slopes.',
            'Industry standard for solving initial value problems.'
          ],
          mcqs: [
            {
              question: 'How many function evaluations (slopes) are calculated per step in RK4?',
              options: ['1', '2', '3', '4'],
              correctOptionIndex: 3,
              explanation: 'It calculates k1, k2, k3, and k4.'
            },
            {
              question: 'In the RK4 formula, which slopes are given double weight?',
              options: ['k1 and k4', 'k2 and k3', 'k1 and k2', 'None'],
              correctOptionIndex: 1,
              explanation: 'k2 and k3, the midpoint slopes, are multiplied by 2 in the weighted average.'
            },
            {
              question: 'Why is RK4 preferred over Euler\'s method?',
              options: ['It requires fewer calculations', 'It is much more accurate for the same step size', 'It is a direct method', 'It does not use h'],
              correctOptionIndex: 1,
              explanation: 'RK4 averages slopes across the interval, making its error drastically lower than Euler\'s.'
            }
          ]
        }
      ]
    }
  ]
};
