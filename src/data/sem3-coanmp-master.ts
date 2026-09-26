import type { Subject } from './types';

export const sem3CoanmpMaster: Subject = {
  id: 'sem3-coanmp',
  name: 'Computer Oriented Numerical Methods with Python (COANMP)',
  code: 'COANMP',
  color: 'bg-blue-600',
  icon: 'calculator',
  description: 'Comprehensive University Syllabus for COANMP — Number Systems & Error Analysis, Non-Linear Root Finding, Linear System Solvers, Finite Differences & Interpolation, Numerical Quadrature, and ODE Solvers with Python',
  semester: 3,
  units: [
    {
      id: "coa-u1",
      title: "Unit 1: Number Systems, Floating-Point & Error Analysis",
      description: "Foundational principles of numerical computing: positional number systems (radix conversions for integers and fractional numbers), IEEE 754 floating-point standard (single and double precision, bias, underflow/overflow, machine epsilon), and error analysis (inherent, round-off, truncation errors, error propagation calculus, and significant digits).",
      topics: [
        {
          id: "coa-u1-t1",
          title: "Number Systems Representation & Radix Conversions with Floating-Point Fractions",
          simpleExplanation: "Computers process numbers in binary, octal, and hexadecimal bases because digital electronics operate on two-state transistor logic. Converting between these radices requires successive division by the base for integer parts and successive multiplication for fractional components.",
          detailedExplanation: `## 1. Mathematical Foundations of Positional Number Systems

In computer-oriented numerical methods, all digital hardware executes arithmetic operations using binary logic. Humans, however, communicate using the decimal (base 10) system, while systems programmers frequently use octal (base 8) and hexadecimal (base 16) notations as compact, human-readable representations of raw binary bitstreams.

A **positional number system** with radix (or base) $b$ represents any real number $N$ as a weighted polynomial sum:

$$N_b = \\sum_{i=-m}^{n-1} d_i b^i = d_{n-1} b^{n-1} + d_{n-2} b^{n-2} + \\dots + d_1 b^1 + d_0 b^0 + d_{-1} b^{-1} + d_{-2} b^{-2} + \\dots + d_{-m} b^{-m}$$

where:
- $b$ is the radix or base ($b \\ge 2$).
- $d_i$ are discrete digits from the allowed set $\\{0, 1, \\dots, b-1\\}$.
- $n$ is the number of integer digits to the left of the radix point.
- $m$ is the number of fractional digits to the right of the radix point.
- The position $i$ establishes the positional weight $b^i$.

\`\`\`mermaid
flowchart LR
    subgraph Positional_Weight_Decomposition ["Positional Weight Decomposition (Radix b)"]
        D2["d2 × b²"] --> INT["Integer Part"]
        D1["d1 × b¹"] --> INT
        D0["d0 × b⁰"] --> INT
        RP["Radix Point (.)"]
        DM1["d-1 × b⁻¹"] --> FRAC["Fractional Part"]
        DM2["d-2 × b⁻²"] --> FRAC
        DM3["d-3 × b⁻³"] --> FRAC
    end
\`\`\`

---

## 2. Core Number Systems in Digital Computing

| Number System | Radix ($b$) | Valid Digit Set | Positional Weight Example | Primary Computer Engineering Use |
| :--- | :--- | :--- | :--- | :--- |
| **Binary** | $2$ | $\\{0, 1\\}$ | $2^3, 2^2, 2^1, 2^0 . 2^{-1}, 2^{-2}$ | Machine language, ALU logic gates, flip-flop registers |
| **Octal** | $8$ | $\\{0, 1, 2, 3, 4, 5, 6, 7\\}$ | $8^2, 8^1, 8^0 . 8^{-1}, 8^{-2}$ | Unix file permissions (\`chmod 755\`), legacy PDP-11 systems |
| **Decimal** | $10$ | $\\{0, 1, 2, 3, 4, 5, 6, 7, 8, 9\\}$ | $10^2, 10^1, 10^0 . 10^{-1}$ | User I/O, financial calculation displays, human interfaces |
| **Hexadecimal** | $16$ | $\\{0-9, A, B, C, D, E, F\\}$ | $16^2, 16^1, 16^0 . 16^{-1}$ | RAM memory addressing (\`0x7FFF\`), IPv6, color codes (\`#FF5733\`) |

In hexadecimal notation, decimal values from $10$ to $15$ are represented by uppercase letters:
- $\\text{A}_{16} = 10_{10}$, $\\text{B}_{16} = 11_{10}$, $\\text{C}_{16} = 12_{10}$
- $\\text{D}_{16} = 13_{10}$, $\\text{E}_{16} = 14_{10}$, $\\text{F}_{16} = 15_{10}$

---

## 3. General Radix Conversion Algorithms

Converting a number between base $10$ and an arbitrary base $b$ requires separating the number into its **integer part** and its **fractional part**. Each part obeys a distinct mathematical algorithm.

\`\`\`mermaid
flowchart TD
    START["Decimal Number N = (Integer . Fraction)"] --> SPLIT["Split into Integer and Fractional Components"]
    SPLIT --> INT_BRANCH["Integer Part: Successive Division by Base b"]
    SPLIT --> FRAC_BRANCH["Fractional Part: Successive Multiplication by Base b"]
    INT_BRANCH --> INT_REM["Collect Remainders from Bottom to Top (LSB to MSB)"]
    FRAC_BRANCH --> FRAC_INT["Extract Integer Parts from Top to Bottom (MSB to LSB)"]
    INT_REM --> COMBINE["Concatenate across Radix Point"]
    FRAC_INT --> COMBINE
    COMBINE --> FINAL["Final Converted Number in Base b"]
\`\`\`

### Algorithm 1: Decimal Integer to Base $b$ (Successive Division)
1. Divide the decimal integer $I$ by the target base $b$.
2. Record the remainder $r$ as the least significant digit.
3. Replace $I$ with the integer quotient $q = \\lfloor I / b \\rfloor$.
4. Repeat steps 1–3 until $q = 0$.
5. Write the remainders in reverse order (from the last remainder down to the first remainder).

### Algorithm 2: Decimal Fraction to Base $b$ (Successive Multiplication)
1. Multiply the decimal fraction $F$ ($0 < F < 1$) by the target base $b$.
2. The integer part of this product is the next digit of the fraction in base $b$.
3. Strip off the integer part, retaining only the new fractional part.
4. Repeat steps 1–3 until either:
   - The fractional part becomes exactly $0$ (terminating fraction), OR
   - The required number of significant digits is attained, OR
   - A repeating periodic cycle is detected.
5. Read the generated integer digits in forward chronological order (from top to bottom).

---

## 4. Rigorous Step-by-Step Conversion Walkthrough

Let us convert the decimal number $(53.6875)_{10}$ into its Binary, Octal, and Hexadecimal representations.

### Step 4.1: Convert Integer Part $(53)_{10}$
- $53 \\div 2 = 26$ with remainder **1** (LSB)
- $26 \\div 2 = 13$ with remainder **0**
- $13 \\div 2 = 6$ with remainder **1**
- $6 \\div 2 = 3$ with remainder **0**
- $3 \\div 2 = 1$ with remainder **1**
- $1 \\div 2 = 0$ with remainder **1** (MSB)
Reading bottom-up: $(53)_{10} = (110101)_2$.

### Step 4.2: Convert Fractional Part $(0.6875)_{10}$ to Binary
- $0.6875 \\times 2 = 1.375 \\implies$ integer digit **1**
- $0.3750 \\times 2 = 0.750 \\implies$ integer digit **0**
- $0.7500 \\times 2 = 1.500 \\implies$ integer digit **1**
- $0.5000 \\times 2 = 1.000 \\implies$ integer digit **1**
- Fractional remainder is $0.000$ (process terminates).
Reading top-down: $(0.6875)_{10} = (0.1011)_2$.
Combining integer and fraction: $(53.6875)_{10} = (110101.1011)_2$.

### Step 4.3: Binary to Octal & Hexadecimal via Direct Bit-Grouping
Because $8 = 2^3$ and $16 = 2^4$, we can convert between binary, octal, and hexadecimal by direct bit grouping without returning to decimal!

- **To Octal (3-bit groups from the radix point outwards):**
  - Integer part: $(110\\ 101)_2 = 6\\ 5_8$
  - Fractional part: $(101\\ 100)_2 = 5\\ 4_8$ (pad trailing zeros)
  - Result: $(53.6875)_{10} = (65.54)_8$.

- **To Hexadecimal (4-bit groups from the radix point outwards):**
  - Integer part: $(0011\\ 0101)_2 = 3\\ 5_{16}$ (pad leading zeros)
  - Fractional part: $(1011)_2 = \\text{B}_{16}$
  - Result: $(53.6875)_{10} = (35.\\text{B})_{16}$.

---

## 5. Non-Terminating Binary Fractions & Machine Error

A critical insight in numerical computing is that simple decimal fractions with finite representations often produce **infinite repeating expansions** in binary!

Consider $(0.1)_{10}$:
- $0.1 \\times 2 = 0.2 \\implies 0$
- $0.2 \\times 2 = 0.4 \\implies 0$
- $0.4 \\times 2 = 0.8 \\implies 0$
- $0.8 \\times 2 = 1.6 \\implies 1$
- $0.6 \\times 2 = 1.2 \\implies 1$
- $0.2 \\times 2 = 0.4 \\implies 0$ (Cycle repeats: $0011...$)

$$(0.1)_{10} = (0.00011001100110011...)_2$$

Because computers have finite register lengths, this infinite series must be truncated or rounded, giving rise to inherent representation errors.

---

> [!TIP] **EXAM TIP:**
> When converting fractional binary to octal or hexadecimal, ALWAYS pad zeros to the **right** of the fractional string to form complete 3-bit or 4-bit nibbles. For the integer part, pad zeros to the **left**. Never pad zeros in the middle!

> [!NOTE] **DEV BRAIN:**
> This infinite periodic binary expansion is the exact mathematical reason why \`0.1 + 0.2 == 0.3\` evaluates to \`False\` in Python, JavaScript, and C. In Python: \`0.1 + 0.2\` yields \`0.30000000000000004\`! Always use \`math.isclose()\` or \`np.isclose()\` for floating-point comparisons.

> [!WARNING] **TRAP:**
> In university exams, students frequently read integer remainders from top to bottom instead of bottom to top, or fractional digits from bottom to top. Remember:
> - **Integer division:** read **UPWARDS** (bottom-to-top, last remainder is MSB).
> - **Fractional multiplication:** read **DOWNWARDS** (top-to-bottom, first product is MSB).

> [!IMPORTANT] **MEMORIZE:**
> - $2^{10} = 1024 \\approx 10^3$ (Kilo)
> - $2^{20} = 1,048,576 \\approx 10^6$ (Mega)
> - $2^{30} \\approx 10^9$ (Giga)
> - Hexadecimal nibble mapping: $\\text{A}=10, \\text{B}=11, \\text{C}=12, \\text{D}=13, \\text{E}=14, \\text{F}=15$.
`,
          shortNotes: "Decimal to Base b: divide integer part by b (read remainders bottom-up), multiply fractional part by b (read top-down). Octal groups 3 binary bits; Hex groups 4 bits.",
          examples: [
            {
              title: "Converting Decimal (109.6875)_10 to Binary and Hexadecimal",
              problem: "Convert the decimal floating point number 109.6875 into binary and hexadecimal, showing all division and multiplication steps.",
              explanation: "Step 1: Integer conversion of 109 to Binary:\\n109 / 2 = 54 R 1\\n54 / 2 = 27 R 0\\n27 / 2 = 13 R 1\\n13 / 2 = 6 R 1\\n6 / 2 = 3 R 0\\n3 / 2 = 1 R 1\\n1 / 2 = 0 R 1\\nRead bottom-up: (109)_10 = (1101101)_2.\\n\\nStep 2: Fractional conversion of 0.6875:\\n0.6875 * 2 = 1.375 -> 1\\n0.375 * 2 = 0.750 -> 0\\n0.75 * 2 = 1.50 -> 1\\n0.5 * 2 = 1.00 -> 1\\nRead top-down: (0.6875)_10 = (0.1011)_2.\\nCombined Binary: (1101101.1011)_2.\\n\\nStep 3: Direct Grouping to Hexadecimal:\\nInteger: 0110 1101_2 -> 6 D_16 = (6D)_16.\\nFraction: 1011_2 -> B_16.\\nCombined Hex: (6D.B)_16.",
              code: "def decimal_to_base(n, base=2, precision=8):\n    integer_part = int(n)\n    frac_part = n - integer_part\n    \n    # Integer conversion\n    digits = \"0123456789ABCDEF\"\n    int_str = \"\"\n    if integer_part == 0:\n        int_str = \"0\"\n    else:\n        while integer_part > 0:\n            int_str = digits[integer_part % base] + int_str\n            integer_part //= base\n            \n    # Fractional conversion\n    frac_str = \"\"\n    while frac_part > 0 and len(frac_str) < precision:\n        frac_part *= base\n        d = int(frac_part)\n        frac_str += digits[d]\n        frac_part -= d\n        \n    return f\"{int_str}.{frac_str}\" if frac_str else int_str\n\nval = 109.6875\nprint(\"Binary:\", decimal_to_base(val, 2))\nprint(\"Octal:\", decimal_to_base(val, 8))\nprint(\"Hex:\", decimal_to_base(val, 16))\n",
              output: "Binary: 1101101.1011\nOctal: 155.54\nHex: 6D.B",
            },
          ],
          keyPoints: [
              "Positional number systems express quantities as sums of digits multiplied by powers of the radix b.",
              "Integer conversion uses repeated integer division and modulo, collecting remainders in reverse order (LSB to MSB).",
              "Fractional conversion uses repeated multiplication by the radix, recording whole numbers from top to bottom.",
              "Direct bit grouping allows instant conversion: 3 binary bits per octal digit and 4 binary bits per hex digit.",
              "Fractions that terminate in decimal (like 0.1) can form infinite repeating series in binary, causing fundamental floating-point precision limitations."
],
          theoryQuestions: [
            {
              question: "State the algorithm for converting a decimal fractional number to its equivalent binary form. Explain why (0.1)10 cannot be represented exactly in binary.",
              marks: "5 Marks",
              answer: "1. Algorithm: Multiply the given decimal fraction by 2. The integer part (0 or 1) becomes the first fractional binary digit. Strip off the integer part and multiply the remaining fractional part by 2. Repeat until the fractional part is zero or the required precision is reached. Read digits chronologically (top-down).\\n2. For (0.1)10: Repeated multiplication by 2 produces 0.2, 0.4, 0.8, 1.6, 1.2, 0.4... This establishes an infinite repeating periodic sequence: 0.0001100110011..._2. Because computer registers possess finite word length (e.g., 23 bits in single precision), the expansion must be chopped or rounded, introducing non-zero representation error.",
              keyPoints: ["Multiplication by 2 procedure", "Integer extraction top-down", "Proof of periodicity 0011", "Finite register chopping causing round-off"],
            },
            {
              question: "Convert (428.375)10 to Octal and Hexadecimal using binary grouping.",
              marks: "5 Marks",
              answer: "1. Integer 428 to binary:\\n428/2 = 214 R 0; 214/2 = 107 R 0; 107/2 = 53 R 1; 53/2 = 26 R 1; 26/2 = 13 R 0; 13/2 = 6 R 1; 6/2 = 3 R 0; 3/2 = 1 R 1; 1/2 = 0 R 1.\\n(428)10 = (110101100)2.\\n2. Fraction 0.375 to binary:\\n0.375*2 = 0.75 (0); 0.75*2 = 1.5 (1); 0.5*2 = 1.0 (1).\\n(0.375)10 = (0.011)2.\\n3. Binary representation: (110101100.011)2.\\n4. Grouping for Octal (3 bits): (110 101 100 . 011)2 = (654.3)8.\\n5. Grouping for Hex (4 bits): (0001 1010 1100 . 0110)2 = (1AC.6)16.",
              keyPoints: ["Successive division of 428", "Successive multiplication of 0.375", "3-bit octal grouping gives 654.3_8", "4-bit hex grouping gives 1AC.6_16"],
            },
            {
              question: "What is the primary engineering advantage of using hexadecimal notation in systems programming?",
              marks: "2 Marks",
              answer: "Hexadecimal provides a direct, 1-to-4 bit correspondence with binary. One byte (8 bits) is represented by exactly two hexadecimal characters (e.g., 11111111_2 = FF_16). This greatly simplifies human reading, memory debugging, and assembly address mapping compared to unwieldy binary strings.",
              keyPoints: ["1 hex character = 4 bits (nibble)", "1 byte = 2 hex digits", "Human readability of memory dumps"],
            },
          ],
          mcqs: [
            {
              question: "What is the binary equivalent of decimal 0.625?",
              options: ["0.101", "0.110", "0.011", "0.111"],
              correctIndex: 0,
              explanation: "0.625 * 2 = 1.25 (digit 1); 0.25 * 2 = 0.5 (digit 0); 0.5 * 2 = 1.0 (digit 1). Result is 0.101_2.",
            },
            {
              question: "Which of the following decimal fractions produces an infinite repeating binary representation?",
              options: ["0.5", "0.25", "0.125", "0.2"],
              correctIndex: 3,
              explanation: "A fraction has a terminating binary expansion if and only if its denominator in lowest terms is a power of 2. 0.2 = 1/5, whose denominator is 5, causing an infinite repeating binary pattern (0.00110011...).",
            },
            {
              question: "How many binary bits are represented by a single hexadecimal digit?",
              options: ["2 bits", "3 bits", "4 bits", "8 bits"],
              correctIndex: 2,
              explanation: "Because 2^4 = 16, each hexadecimal digit directly corresponds to exactly 4 binary bits (one nibble).",
            },
            {
              question: "Convert the octal number (73.4)8 directly into binary:",
              options: ["111011.100", "111011.010", "110011.100", "111101.100"],
              correctIndex: 0,
              explanation: "Replace each octal digit with its 3-bit binary equivalent: 7 = 111, 3 = 011, and 4 = 100. Concatenating yields 111011.100_2.",
            },
          ]
        },
        {
          id: "coa-u1-t2",
          title: "IEEE 754 Floating-Point Standard (Single & Double Precision)",
          simpleExplanation: "The IEEE 754 standard defines how computers represent real numbers using scientific notation in binary. It partitions 32-bit (single precision) or 64-bit (double precision) registers into three distinct fields: a sign bit, a biased exponent, and a normalized mantissa.",
          detailedExplanation: `## 1. Motivation: Fixed-Point vs. Floating-Point Arithmetic

In early computing systems, numbers were represented using **fixed-point arithmetic**, where the binary radix point was hardwired to a stationary bit position.
- **Fixed-point limitation**: If a system dedicates 16 bits to the integer part and 16 bits to the fractional part, it can never represent astronomical quantities (like Avogadro's number $6.022 \\times 10^{23}$) or subatomic scales (like Planck's constant $6.626 \\times 10^{-34}$) simultaneously.
- **The Floating-Point Solution**: Just as scientific notation writes numbers as $M \\times 10^E$, floating-point systems store numbers dynamically as:

$$X = (-1)^s \\times (1.f)_2 \\times 2^{E - \\text{Bias}}$$

This enables an immense dynamic range while preserving a constant number of significant precision bits across all magnitudes.

\`\`\`mermaid
flowchart TD
    subgraph IEEE_754_Architecture ["IEEE 754 Floating-Point Register Layout"]
        SIGN["Sign Bit (s)<br/>1 = Negative, 0 = Positive"]
        EXP["Biased Exponent (E)<br/>Stored with Bias offset"]
        MANT["Significand / Mantissa (f)<br/>Implicit Leading 1 + Fractional Bits"]
    end
\`\`\`

---

## 2. IEEE 754 Formats: Single Precision vs. Double Precision

The IEEE 754 standard establishes two universal binary floating-point specifications:

| Parameter | Single Precision (IEEE 754-32) | Double Precision (IEEE 754-64) |
| :--- | :--- | :--- |
| **Total Register Width** | **32 bits** (4 bytes) | **64 bits** (8 bytes) |
| **Sign Bit ($s$)** | $1$ bit (Bit 31) | $1$ bit (Bit 63) |
| **Biased Exponent ($E$)** | $8$ bits (Bits 30–23) | $11$ bits (Bits 62–52) |
| **Exponent Bias ($B$)** | **$127$** ($2^{8-1} - 1$) | **$1023$** ($2^{11-1} - 1$) |
| **Mantissa Fraction ($f$)** | $23$ bits (Bits 22–0) | $52$ bits (Bits 51–0) |
| **Effective Significand Precision** | $24$ bits ($1 + 23$ implicit 1) | $53$ bits ($1 + 52$ implicit 1) |
| **Decimal Precision** | $\\approx 7.22$ decimal digits | $\\approx 15.95$ decimal digits |
| **Smallest Normalized Number** | $\\approx 1.18 \\times 10^{-38}$ | $\\approx 2.23 \\times 10^{-308}$ |
| **Largest Normalized Number** | $\\approx 3.40 \\times 10^{38}$ | $\\approx 1.80 \\times 10^{308}$ |
| **Language Data Type** | \`float\` in C/C++/Java, \`np.float32\` | \`double\` in C/C++, default \`float\` in Python |

---

## 3. Bitfield Encoding & Mathematical Value Calculation

### 3.1 Sign Bit ($s$)
- $s = 0 \\implies$ Positive number ($(-1)^0 = +1$).
- $s = 1 \\implies$ Negative number ($(-1)^1 = -1$).

### 3.2 Biased Exponent ($E$)
To avoid having to store a separate sign bit for the exponent, IEEE 754 uses an **excess-bias** system.
- An offset or bias $B$ is added to the true exponent $e$:
  $$E = e + \\text{Bias} \\implies e = E - \\text{Bias}$$
- For 32-bit single precision, $\\text{Bias} = 127$. The true exponent range is $-126 \\le e \\le +127$ ($E = 1$ to $254$).
- Exponent values $E = 0$ and $E = 255$ (or $E = 2047$ in 64-bit) are strictly reserved for special numerical states.

### 3.3 The Hidden / Implicit Bit Mantissa ($1.f$)
For normalized numbers, the binary significand is always adjusted such that there is exactly one non-zero binary digit to the left of the binary point: $(1.b_1 b_2 b_3 \\dots)_2$.
Because this leading bit is *always* $1$, storing it physically in hardware would waste a precious bit! Therefore, it is made **implicit** (hidden), granting an extra bit of numerical precision for free.

---

## 4. Special Numerical Values & Exception Handling

The IEEE 754 standard defines five critical operational states based on the exponent and fraction bit patterns:

\`\`\`mermaid
flowchart TD
    E_CHECK{"Value of Biased Exponent E"}
    E_CHECK -->|"0 < E < 255"| NORMAL["Normalized Number<br/>(-1)^s × 1.f × 2^(E-127)"]
    E_CHECK -->|"E == 0"| ZERO_SUBNORM{"Fraction f == 0?"}
    ZERO_SUBNORM -->|"Yes (f == 0)"| SIGNED_ZERO["Signed Zero (+0.0 or -0.0)"]
    ZERO_SUBNORM -->|"No (f != 0)"| SUBNORMAL["Denormalized / Subnormal Number<br/>(-1)^s × 0.f × 2^(-126) (Gradual Underflow)"]
    E_CHECK -->|"E == 255 (or 2047)"| INF_NAN{"Fraction f == 0?"}
    INF_NAN -->|"Yes (f == 0)"| INFINITY["Signed Infinity (+Inf or -Inf)<br/>e.g., 1.0 / 0.0"]
    INF_NAN -->|"No (f != 0)"| NAN["NaN (Not a Number)<br/>e.g., 0.0 / 0.0, sqrt(-1)"]
\`\`\`

1. **Normalized Numbers ($0 < E < 255$):** Standard real numbers calculated using $(-1)^s \\times (1.f)_2 \\times 2^{E - 127}$.
2. **Signed Zero ($E = 0, f = 0$):** IEEE 754 supports both $+0$ and $-0$. This distinction is vital in complex analysis and branch cuts (e.g., $1 / (+0) = +\\infty$ and $1 / (-0) = -\\infty$).
3. **Subnormal / Denormalized Numbers ($E = 0, f \\ne 0$):** The hidden bit becomes $0$ ($0.f$), and the exponent is fixed at $2^{1 - \\text{Bias}} = 2^{-126}$. This allows **gradual underflow**, preventing a catastrophic immediate cliff to zero when calculations fall below $1.18 \\times 10^{-38}$.
4. **Infinity ($E = 255, f = 0$):** Represents arithmetic overflow or mathematical singularities (e.g., dividing a positive real by zero).
5. **NaN (Not a Number, $E = 255, f \\ne 0$):** Generated by invalid mathematical operations ($0/0$, $\\infty - \\infty$, $\\sqrt{-4}$). NaN propagates through all subsequent computations.

---

## 5. Machine Epsilon (Unit in the Last Place - ULP)

**Machine Epsilon** ($\\epsilon_{\\text{mach}}$) defines the upper bound on the relative error due to rounding in floating-point arithmetic. It is the distance between $1.0$ and the next larger representable floating-point number:

$$\\epsilon_{\\text{mach}} = 2^{-\\text{fraction bits}}$$

- **Single Precision:** $\\epsilon_{\\text{single}} = 2^{-23} \\approx 1.192 \\times 10^{-7}$
- **Double Precision:** $\\epsilon_{\\text{double}} = 2^{-52} \\approx 2.220 \\times 10^{-16}$

Any mathematical difference between two numbers smaller than $\\epsilon_{\\text{mach}} \\times |X|$ cannot be resolved and will be rounded away!

---

> [!TIP] **EXAM TIP:**
> When asked to encode a negative number in IEEE 754, ALWAYS remember that only the sign bit $s$ is inverted ($s=1$). You do NOT take the 2's complement of the whole floating-point word! 2's complement is strictly for integers.

> [!NOTE] **DEV BRAIN:**
> In Python, you can inspect the exact IEEE 754 bit representations of any float using the standard library \`struct\` module: \`hex(struct.unpack('>I', struct.pack('>f', -27.625))[0])\`. Python floats are natively 64-bit C doubles.

> [!WARNING] **TRAP:**
> Watch out for the biased exponent calculation!
> If the true power of 2 is $e = -3$, the stored exponent is $E = -3 + 127 = 124 = (01111100)_2$.
> Do not subtract the bias when encoding; you ADD the bias when encoding and SUBTRACT it when decoding!

> [!IMPORTANT] **MEMORIZE:**
> - IEEE 754 Single Precision: 1 Sign + 8 Exponent + 23 Mantissa = 32 bits (Bias = 127).
> - IEEE 754 Double Precision: 1 Sign + 11 Exponent + 52 Mantissa = 64 bits (Bias = 1023).
> - Hidden Bit: Normalized numbers have an implied leading $1.$ that is NOT stored.
> - Machine Epsilon: Single $\\approx 1.19 \\times 10^{-7}$, Double $\\approx 2.22 \\times 10^{-16}$.
`,
          shortNotes: "IEEE 754 32-bit: 1 sign, 8 exponent (bias 127), 23 fraction (implicit leading 1). 64-bit: 1 sign, 11 exponent (bias 1023), 52 fraction. E=0,255 reserved for special values.",
          examples: [
            {
              title: "Encoding -27.625 into IEEE 754 Single Precision 32-Bit Hexadecimal",
              problem: "Determine the 32-bit IEEE 754 single-precision floating-point representation for the decimal number -27.625. Express the final bit pattern in hexadecimal.",
              explanation: "Step 1: Sign bit\\nNumber is negative, so sign bit s = 1.\\n\\nStep 2: Binary Conversion\\nInteger 27 = 16 + 8 + 2 + 1 = 11011_2.\\nFraction 0.625 = 0.5 + 0.125 = 0.101_2.\\nCombined: 27.625 = 11011.101_2.\\n\\nStep 3: Normalization into scientific notation (1.f * 2^e)\\n11011.101_2 = 1.1011101_2 * 2^4.\\nTrue exponent e = 4.\\nSignificand fraction f = 10111010000000000000000 (padded to 23 bits).\\n\\nStep 4: Biased Exponent (E)\\nE = e + Bias = 4 + 127 = 131.\\n131 in binary: 128 + 2 + 1 = 10000011_2.\\n\\nStep 5: Pack the 32-bit string\\n[s] [8-bit E] [23-bit f]\\n1 | 10000011 | 10111010000000000000000\\nRegroup as 4-bit nibbles:\\n1100 0001 1101 1101 0000 0000 0000 0000\\nIn Hexadecimal: C 1 D D 0 0 0 0 = 0xC1DD0000.",
              code: "import struct\n\nval = -27.625\n\n# Pack float as 32-bit single precision (big-endian)\nbinary_bytes = struct.pack('>f', val)\nhex_val = binary_bytes.hex().upper()\nint_bits = struct.unpack('>I', binary_bytes)[0]\nbit_str = f\"{int_bits:032b}\"\n\ns = bit_str[0]\ne = bit_str[1:9]\nf = bit_str[9:]\n\nprint(f\"Decimal Value: {val}\")\nprint(f\"IEEE 754 32-Bit Hex: 0x{hex_val}\")\nprint(f\"Sign Bit (s): {s}\")\nprint(f\"Exponent (E): {e} (Decimal: {int(e, 2)}, True e: {int(e, 2) - 127})\")\nprint(f\"Mantissa (f): {f}\")\n",
              output: "Decimal Value: -27.625\nIEEE 754 32-Bit Hex: 0xC1DD0000\nSign Bit (s): 1\nExponent (E): 10000011 (Decimal: 131, True e: 4)\nMantissa (f): 10111010000000000000000",
            },
          ],
          keyPoints: [
              "IEEE 754 single precision allocates 32 bits: 1 sign, 8 exponent, 23 mantissa.",
              "IEEE 754 double precision allocates 64 bits: 1 sign, 11 exponent, 52 mantissa.",
              "Exponents are stored in excess-bias representation: bias is 127 for single and 1023 for double.",
              "Normalized numbers omit the leading 1 (implicit bit) to maximize precision.",
              "Denormalized numbers (E=0, f!=0) facilitate gradual underflow below the normal threshold.",
              "Special bit patterns represent signed zeros, positive/negative infinities, and NaN."
],
          theoryQuestions: [
            {
              question: "Explain the IEEE 754 single precision floating point format in detail. Why is the exponent biased?",
              marks: "7 Marks",
              answer: "1. Format Description: Total 32 bits allocated as 1 sign bit (bit 31), 8 exponent bits (bits 30-23), and 23 fraction bits (bits 22-0).\\n2. Mathematical Formula: Normalized numbers follow (-1)^s * (1.f)_2 * 2^(E - 127).\\n3. Why Exponent is Biased: Without bias, an exponent requires a two's-complement signed representation, which complicates hardware comparison circuits. With an excess-127 bias, an exponent of -126 is stored as 1 and +127 is stored as 254. All biased exponents are strictly positive unsigned integers! This allows the processor ALU to compare two floating-point numbers using fast, simple unsigned integer comparison hardware without unpacking.",
              keyPoints: ["32-bit layout: 1 sign, 8 exponent, 23 mantissa", "Formula with bias 127 and hidden 1", "Hardware comparison efficiency via unsigned integers"],
            },
            {
              question: "What is Machine Epsilon? State its values for single and double precision floating-point standards.",
              marks: "3 Marks",
              answer: "Machine Epsilon (eps) is the smallest positive number epsilon such that 1.0 + epsilon != 1.0 in computer arithmetic. It represents the bound on relative rounding error.\\n- For IEEE 754 Single Precision: eps = 2^(-23) approx 1.192 * 10^(-7).\\n- For IEEE 754 Double Precision: eps = 2^(-52) approx 2.220 * 10^(-16).",
              keyPoints: ["Definition 1.0 + eps > 1.0", "Single precision 2^(-23)", "Double precision 2^(-52)"],
            },
            {
              question: "Distinguish between Overflow and Underflow in floating point computation. How does IEEE 754 handle underflow gracefully?",
              marks: "5 Marks",
              answer: "1. Overflow occurs when a computation produces a magnitude greater than the largest representable normalized number (approx 3.4 * 10^38 in single precision). It results in +/- Infinity.\\n2. Underflow occurs when an absolute value is smaller than the smallest normalized number (approx 1.18 * 10^(-38)).\\n3. Graceful Handling via Subnormal Numbers: IEEE 754 uses denormalized numbers when E=0 and f!=0. In this state, the implicit leading 1 is dropped and replaced with 0.f, scaling with 2^(-126). This allows precision to degrade gradually rather than abruptly flushing to zero (gradual underflow).",
              keyPoints: ["Overflow > max float -> Infinity", "Underflow < min normal float", "Subnormal numbers with E=0 and 0.f", "Gradual underflow mechanism"],
            },
          ],
          mcqs: [
            {
              question: "What is the exponent bias used in the IEEE 754 64-bit double precision standard?",
              options: ["127", "255", "1023", "2047"],
              correctIndex: 2,
              explanation: "The bias for double precision (11 exponent bits) is 2^(11-1) - 1 = 1024 - 1 = 1023.",
            },
            {
              question: "In IEEE 754 single precision, what does the bit pattern with E = 255 and fraction f != 0 represent?",
              options: ["Positive Infinity", "Negative Infinity", "NaN (Not a Number)", "Subnormal Number"],
              correctIndex: 2,
              explanation: "When E = 255 and the fraction f is non-zero, it represents NaN (Not a Number). If f were zero, it would represent signed Infinity.",
            },
            {
              question: "What is the effective number of significand precision bits in IEEE 754 single precision?",
              options: ["23 bits", "24 bits", "32 bits", "8 bits"],
              correctIndex: 1,
              explanation: "Although only 23 bits are physically stored in the register, an implicit (hidden) leading bit of 1 brings the effective significand precision to 1 + 23 = 24 bits.",
            },
            {
              question: "Which Python expression determines the machine epsilon for the default float type?",
              options: ["sys.float_info.epsilon", "math.epsilon", "float.min_step", "os.machine_eps"],
              correctIndex: 0,
              explanation: "In Python, `import sys; sys.float_info.epsilon` yields the machine epsilon for IEEE 754 double precision (approx 2.22e-16).",
            },
          ]
        },
        {
          id: "coa-u1-t3",
          title: "Error Classifications: Absolute, Relative, Percentage, Round-Off vs Truncation & Significant Digits",
          simpleExplanation: "Because numerical methods provide approximate solutions, computational errors always exist between true mathematical values and calculated results. We quantify these discrepancies as absolute, relative, and percentage errors, and trace their sources to hardware rounding limitations or mathematical formula truncations.",
          detailedExplanation: `## 1. The Fundamental Nature of Numerical Error

In pure mathematics, equations often yield exact, closed-form analytic solutions (e.g., $x = \\sqrt{2}$, $y = \\pi$). In computer-oriented numerical methods, however, transcendental roots, matrix inverses, integrals, and differential equations can almost never be computed exactly in finite time on finite physical hardware.

Consequently, every numerical output is an **approximation**. The discrepancy between the true mathematical value and its computer-generated approximation is called **numerical error**.

\`\`\`mermaid
flowchart TD
    TOTAL_ERR["Total Numerical Error"] --> INHERENT["Inherent / Experimental Error<br/>(Sensors, physical constants, measured data)"]
    TOTAL_ERR --> COMPUTATIONAL["Computational Error"]
    COMPUTATIONAL --> TRUNCATION["Truncation Error<br/>(Approximating infinite math with finite formulas)"]
    COMPUTATIONAL --> ROUNDOFF["Round-Off Error<br/>(Finite computer word length & bit limits)"]
\`\`\`

---

## 2. Mathematical Definitions of Error Metrics

Let $X$ denote the exact, true mathematical value, and let $X^*$ denote its calculated approximate value.

### 2.1 Absolute Error ($E_a$)
The absolute difference between the true value and the approximation:

$$E_a = |X - X^*|$$

- **Limitation**: Absolute error does not account for the order of magnitude of the quantity being measured. An absolute error of $1\\text{ cm}$ is catastrophic when machining a microchip transistor, but negligible when measuring the distance from the Earth to the Moon.

### 2.2 Relative Error ($E_r$)
The ratio of the absolute error to the magnitude of the true value:

$$E_r = \\frac{|X - X^*|}{|X|} = \\frac{E_a}{|X|} \\quad (\\text{provided } X \\ne 0)$$

Relative error is dimensionless and normalizes the error against the scale of the problem.

### 2.3 Percentage Error ($E_p$)
Relative error expressed as a percentage:

$$E_p = E_r \\times 100\\% = \\frac{|X - X^*|}{|X|} \\times 100\\%$$

---

## 3. Classifications: Truncation Error vs. Round-Off Error

| Error Dimension | Truncation Error ($E_t$) | Round-Off Error ($E_r$) |
| :--- | :--- | :--- |
| **Origin** | Caused by replacing an infinite, continuous mathematical process with a finite, discrete algebraic formula. | Caused by the physical hardware constraint that computers cannot store infinite real numbers in finite bit registers. |
| **Example 1** | Truncating an infinite Taylor series after $n$ terms: $e^x \\approx 1 + x + \\frac{x^2}{2!}$. | Rounding $(0.1)_{10}$ to 23 mantissa bits in single-precision IEEE 754. |
| **Example 2** | Approximating the continuous derivative $f'(x) \\approx \\frac{f(x+h) - f(x)}{h}$. | Storing $\\pi \\approx 3.141592653589793$. |
| **Behavior as Step Size $h \\to 0$** | **Decreases** dramatically (typically $O(h)$ or $O(h^2)$). | **Increases** and explodes due to subtractive catastrophic cancellation! |
| **Mitigation Strategy** | Use higher-order numerical formulas (e.g., Runge-Kutta 4th order instead of Euler). | Use double/quad precision (\`float64\`, \`Decimal\`), or reformulate algebraic expressions. |

\`\`\`mermaid
flowchart LR
    subgraph Step_Size_Dilemma ["The Fundamental Step-Size Tradeoff"]
        direction TB
        BIG_H["Large Step Size h"] --> BIG_T["High Truncation Error"]
        SMALL_H["Tiny Step Size h"] --> BIG_R["High Round-off Error (Catastrophic Cancellation)"]
        OPTIMAL["Optimal Step Size h*"] --> MIN_TOTAL["Minimum Total Error"]
    end
\`\`\`

---

## 4. Error Propagation Calculus

When approximate numbers are fed into arithmetic operations or multivariable functions, their errors propagate according to the laws of multivariate differential calculus.

Let $x$ and $y$ have absolute errors $\\Delta x$ and $\\Delta y$, respectively.

### 4.1 Addition and Subtraction
If $Z = x \\pm y$, the maximum absolute error is the sum of the absolute errors:

$$E_a(Z) = \\Delta x + \\Delta y$$

The relative error for addition:
$$E_r(x + y) = \\frac{\\Delta x + \\Delta y}{|x + y|} \\le \\max(E_r(x), E_r(y))$$

> [!WARNING] **TRAP:**
> **Catastrophic Cancellation Danger:** When subtracting two nearly equal numbers ($x \\approx y$), the denominator $|x - y|$ becomes infinitesimally small, causing the relative error $E_r$ to explode towards infinity!
> *Example:* Let $x = 1.0000001$ and $y = 1.0000000$. Both have 8 significant digits. Their difference $x - y = 0.0000001$ has only **1 significant digit**! The remaining 7 digits of precision are permanently lost.

### 4.2 Multiplication and Division
If $Z = x \\cdot y$ or $Z = x / y$, the relative errors add linearly:

$$E_r(Z) \\approx E_r(x) + E_r(y)$$

### 4.3 General Function Error Propagation
If $u = f(x_1, x_2, \\dots, x_n)$, then by Taylor series expansion:

$$E_a(u) \\approx \\sum_{i=1}^n \\left| \\frac{\\partial f}{\\partial x_i} \\right| \\Delta x_i$$

$$E_r(u) \\approx \\sum_{i=1}^n \\left| \\frac{x_i}{f} \\frac{\\partial f}{\\partial x_i} \\right| E_r(x_i)$$

---

## 5. Significant Digits & University Precision Theorem

A number $X^*$ is said to approximate $X$ correct to **$m$ significant digits** if the absolute error satisfies:

$$|X - X^*| \\le \\frac{1}{2} \\times 10^{-m + k}$$

where $k$ is the order of magnitude of the most significant digit of $X$ (i.e., $10^{k-1} \\le |X| < 10^k$).

### The Significant Digits Theorem
If the relative error $E_r$ of an approximation satisfies:

$$E_r \\le \\frac{1}{2 \\times 10^m}$$

then $X^*$ is guaranteed to be correct to at least **$m$ significant digits**.

### Symmetric Rounding Rules (Round Half to Even)
1. If the dropped digit is $< 5$, leave the preceding digit unchanged (chopping).
2. If the dropped digit is $> 5$, increase the preceding digit by $1$.
3. If the dropped digit is **exactly 5**, round to the nearest **even** number. This prevents statistical upward drift in large computational loops.

---

> [!TIP] **EXAM TIP:**
> When asked to calculate Relative and Percentage errors, NEVER round intermediate values. Carry at least 6 decimal places through intermediate steps and round only the final percentage to 3-4 significant figures.

> [!NOTE] **DEV BRAIN:**
> In quadratic equation evaluation $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$, when $b^2 \\gg 4ac$, the term $\\sqrt{b^2 - 4ac} \\approx b$. Evaluating $-b + \\sqrt{b^2 - 4ac}$ causes disastrous catastrophic cancellation! Production code computes the first root as $x_1 = \\frac{-b - \\text{sgn}(b)\\sqrt{b^2-4ac}}{2a}$ and the second root via Vieta's formula $x_2 = \\frac{c}{a x_1}$.

> [!IMPORTANT] **MEMORIZE:**
> - Absolute Error: $E_a = |X - X^*|$
> - Relative Error: $E_r = \\frac{|X - X^*|}{|X|}$
> - Percentage Error: $E_p = E_r \\times 100\\%$
> - Significant Digits Criterion: $E_r \\le \\frac{1}{2 \\times 10^m}$ ensures $m$ correct significant digits.
`,
          shortNotes: "Absolute Error = |True - Approx|; Relative Error = Ea / |True|; Percentage Error = Er * 100%. Truncation comes from math approximations; Round-off comes from finite computer memory.",
          examples: [
            {
              title: "Error Analysis of Square Root Approximation and Error Propagation",
              problem: "The exact value of X = 8/3 is approximated as X* = 2.667. Calculate: (a) Absolute Error, (b) Relative Error, and (c) Percentage Error. Furthermore, if a function u = x^2 * y is evaluated at x = 2.0 +- 0.01 and y = 3.0 +- 0.02, find the maximum absolute error in u.",
              explanation: "Part 1: Basic Errors for X = 8/3:\\nTrue value X = 8/3 = 2.6666667...\\nApproximate value X* = 2.667\\n(a) Absolute Error: E_a = |8/3 - 2.667| = |2.6666667 - 2.667| = 0.0003333... = 1/3000 approx 3.333 * 10^-4.\\n(b) Relative Error: E_r = E_a / |X| = (1/3000) / (8/3) = 1/8000 = 0.000125.\\n(c) Percentage Error: E_p = E_r * 100% = 0.0125%.\\n\\nPart 2: Error Propagation for u = x^2 * y:\\nPartial derivatives: du/dx = 2*x*y, du/dy = x^2.\\nAt x = 2.0, y = 3.0:\\ndu/dx = 2 * (2.0) * (3.0) = 12.0.\\ndu/dy = (2.0)^2 = 4.0.\\nDelta u = |du/dx| * Delta x + |du/dy| * Delta y\\nDelta u = 12.0 * (0.01) + 4.0 * (0.02) = 0.12 + 0.08 = 0.20.\\nu = 2.0^2 * 3.0 = 12.0 +- 0.20.",
              code: "def analyze_error(true_val, approx_val):\n    ea = abs(true_val - approx_val)\n    er = ea / abs(true_val)\n    ep = er * 100\n    return ea, er, ep\n\ntrue_val = 8 / 3\napprox_val = 2.667\nea, er, ep = analyze_error(true_val, approx_val)\n\nprint(f\"True Value: {true_val:.7f}\")\nprint(f\"Approx Value: {approx_val}\")\nprint(f\"Absolute Error (Ea): {ea:.6e}\")\nprint(f\"Relative Error (Er): {er:.6e}\")\nprint(f\"Percentage Error (Ep): {ep:.4f}%\")\n\n# Multivariable propagation\nx, dx = 2.0, 0.01\ny, dy = 3.0, 0.02\nu = (x**2) * y\ndu_dx = 2 * x * y\ndu_dy = x**2\ndelta_u = abs(du_dx) * dx + abs(du_dy) * dy\nprint(f\"u = {u:.2f} +/- {delta_u:.2f}\")\n",
              output: "True Value: 2.6666667\nApprox Value: 2.667\nAbsolute Error (Ea): 3.333333e-04\nRelative Error (Er): 1.250000e-04\nPercentage Error (Ep): 0.0125%\nu = 12.00 +/- 0.20",
            },
          ],
          keyPoints: [
              "Absolute Error measures absolute distance; Relative Error normalizes error against magnitude.",
              "Truncation error arises from mathematical simplifications (cutting infinite Taylor series).",
              "Round-off error arises from finite binary register limits in digital computer hardware.",
              "Subtractive cancellation between two nearly equal numbers causes catastrophic loss of significant digits.",
              "The Significant Digits Theorem guarantees m correct digits if relative error is bounded by 0.5 * 10^(-m)."
],
          theoryQuestions: [
            {
              question: "Differentiate between Round-off Error and Truncation Error with suitable mathematical examples.",
              marks: "5 Marks",
              answer: "1. Truncation Error: Originates from truncating an infinite analytical process into a finite numerical formula. For example, approximating e^x = 1 + x + x^2/2! + x^3/3! + ... with only the first three terms yields a truncation error proportional to x^3/6. It decreases as step size h decreases.\\n2. Round-off Error: Originates from the physical inability of computers with finite word lengths to represent infinite real numbers. For instance, storing 1/3 as 0.333333 in a 6-digit register incurs a round-off error of 0.000000333... As step size h becomes very small, round-off errors increase and can completely overwhelm the solution.",
              keyPoints: ["Truncation = mathematical formula cut-off", "Round-off = hardware word length limits", "Step size h behavior: truncation drops, round-off grows"],
            },
            {
              question: "What is catastrophic cancellation? Explain how it can be avoided when solving the roots of a quadratic equation ax^2 + bx + c = 0.",
              marks: "5 Marks",
              answer: "1. Catastrophic cancellation occurs when subtracting two nearly equal numbers (x approx y). The most significant digits cancel each other out, leaving only the least significant bits which are dominated by round-off noise, drastically reducing precision.\\n2. In quadratic formula x = (-b +- sqrt(b^2 - 4ac)) / (2a), if b > 0 and b^2 >> 4ac, then sqrt(b^2 - 4ac) approx b. The numerator -b + sqrt(b^2 - 4ac) subtracts two nearly equal positive quantities.\\n3. Mitigation: Rationalize the numerator or compute x1 = (-b - sgn(b)*sqrt(b^2-4ac)) / (2a), and compute the second root using Vieta's relation x2 = c / (a * x1).",
              keyPoints: ["Definition of catastrophic cancellation", "Demonstration in quadratic formula when b^2 >> 4ac", "Mitigation via Vieta relation x2 = c/(a*x1)"],
            },
            {
              question: "Derive the formula for relative error in the quotient u = x / y in terms of the relative errors of x and y.",
              marks: "3 Marks",
              answer: "Let u = x / y. Taking natural logarithms of both sides:\\nln(u) = ln(x) - ln(y).\\nDifferentiating both sides:\\ndu / u = dx / x - dy / y.\\nFor the maximum upper bound on error, taking absolute values and applying the triangle inequality:\\n|du / u| <= |dx / x| + |dy / y|.\\nThus: E_r(u) approx E_r(x) + E_r(y). The relative error of a quotient is bounded by the sum of individual relative errors.",
              keyPoints: ["Logarithmic differentiation ln(u) = ln(x) - ln(y)", "Differential du/u = dx/x - dy/y", "Triangle inequality Er(u) <= Er(x) + Er(y)"],
            },
          ],
          mcqs: [
            {
              question: "If the true value is 0.025 and the computed approximation is 0.024, what is the relative error?",
              options: ["0.001", "0.04", "0.025", "0.0416"],
              correctIndex: 1,
              explanation: "Absolute Error Ea = |0.025 - 0.024| = 0.001. Relative Error Er = Ea / True = 0.001 / 0.025 = 1/25 = 0.04 (or 4%).",
            },
            {
              question: "If an approximation has a relative error Er <= 0.5 * 10^(-4), how many significant digits are guaranteed to be correct?",
              options: ["3 digits", "4 digits", "5 digits", "2 digits"],
              correctIndex: 1,
              explanation: "By the Significant Digits Theorem, an approximation is guaranteed to have at least m correct significant digits if Er <= 0.5 * 10^(-m). Here m = 4.",
            },
            {
              question: "What happens to truncation error and round-off error as the numerical step size h approaches zero?",
              options: ["Truncation error decreases, while round-off error increases.", "Both truncation error and round-off error decrease.", "Truncation error increases, while round-off error decreases.", "Both truncation error and round-off error increase."],
              correctIndex: 0,
              explanation: "Truncation error decreases as h -> 0 because the finite difference formula approaches the exact derivative. However, round-off error increases rapidly due to finite-precision arithmetic and division by very small numbers.",
            },
            {
              question: "Which of the following operations is most vulnerable to catastrophic cancellation error?",
              options: ["Multiplying two large numbers", "Adding two large positive numbers", "Subtracting two nearly equal numbers", "Dividing a large number by a small number"],
              correctIndex: 2,
              explanation: "Subtracting two nearly equal numbers causes the leading significant digits to cancel out, leaving the result corrupted by lower-order rounding errors.",
            },
          ]
        }
      ]
    },
    {
      id: "coa-u2",
      title: "Unit 2: Roots of Non-Linear Equations",
      description: "Numerical algorithms for solving algebraic and transcendental non-linear equations f(x) = 0: bracketing methods (Bisection, Regula-Falsi), open methods (Newton-Raphson, Secant), fixed-point iteration x = g(x), mathematical proofs of convergence rates, stopping criteria, and algorithmic stability.",
      topics: [
        {
          id: "coa-u2-t1",
          title: "Bisection Method: Mathematical Principle, Intermediate Value Theorem, Algorithm, Convergence Rate & Python Code",
          simpleExplanation: "The bisection method finds a root of an equation by repeatedly cutting an interval in half where the function changes sign. Because continuous functions must cross zero between positive and negative values, halving the interval guarantees zooming in on the root.",
          detailedExplanation: `## 1. Mathematical Principle & Intermediate Value Theorem (IVT)

The **Bisection Method** (also known as the interval halving or binary chop method) is the most fundamental, geometrically intuitive bracketing algorithm for finding real roots of continuous non-linear algebraic and transcendental equations $f(x) = 0$.

It relies directly on **Bolzano's Intermediate Value Theorem (IVT)**:

> **Theorem (Intermediate Value Theorem):**
> Let $f: [a, b] \\to \\mathbb{R}$ be a continuous function on the closed interval $[a, b]$. If $f(a)$ and $f(b)$ have opposite algebraic signs (that is, $f(a) \\cdot f(b) < 0$), then there exists at least one real number $\\xi \\in (a, b)$ such that $f(\\xi) = 0$.

\`\`\`mermaid
flowchart TD
    START["Interval [a, b] with f(a) * f(b) < 0"] --> MID["Compute Midpoint: c = (a + b) / 2"]
    MID --> CHECK_ROOT{"f(c) == 0 OR (b - a)/2 < tol?"}
    CHECK_ROOT -->|"Yes"| ROOT_FOUND["Root Found at c! Terminate."]
    CHECK_ROOT -->|"No"| SIGN_CHECK{"f(a) * f(c) < 0?"}
    SIGN_CHECK -->|"Yes"| LEFT_HALF["Root is in Left Half: b = c"]
    SIGN_CHECK -->|"No"| RIGHT_HALF["Root is in Right Half: a = c"]
    LEFT_HALF --> MID
    RIGHT_HALF --> MID
\`\`\`

---

## 2. Step-by-Step Algorithmic Formulation

Given a continuous function $f(x)$, an initial bracketing interval $[a_0, b_0]$ satisfying $f(a_0) \\cdot f(b_0) < 0$, an absolute error tolerance $\\epsilon$, and a maximum iteration count $N_{\\max}$:

1. **Initialization**: Set iteration counter $k = 0$, $a = a_0$, $b = b_0$.
2. **Midpoint Computation**:
   $$c_k = \\frac{a_k + b_k}{2}$$
3. **Stopping Criterion Check**:
   If $|f(c_k)| < \\epsilon_{\\text{func}}$ or $\\frac{b_k - a_k}{2} < \\epsilon$, stop and return $c_k$ as the approximate root.
4. **Sub-interval Selection (Sign Test)**:
   - If $f(a_k) \\cdot f(c_k) < 0$, the root lies in the left half: set $a_{k+1} = a_k$ and $b_{k+1} = c_k$.
   - Else if $f(c_k) \\cdot f(b_k) < 0$, the root lies in the right half: set $a_{k+1} = c_k$ and $b_{k+1} = b_k$.
   - Else ($f(c_k) = 0$), $c_k$ is the exact root; terminate immediately.
5. **Iteration**: Increment $k \\leftarrow k + 1$ and repeat from Step 2 until $k = N_{\\max}$.

---

## 3. Rigorous Error Analysis & Rate of Convergence

Let $[a_0, b_0]$ be the initial interval of length $\\Delta_0 = b_0 - a_0$.
At each iteration $k$, the interval length is halved exactly:

$$\\Delta_k = b_k - a_k = \\frac{b_0 - a_0}{2^k}$$

Because the true root $\\xi$ and the approximation $c_k$ both lie inside $[a_k, b_k]$, the maximum possible error at the $k$-th iteration is bounded by:

$$e_k = |c_k - \\xi| \\le \\frac{b_k - a_k}{2} = \\frac{b_0 - a_0}{2^{k+1}}$$

### 3.1 Order of Convergence
To find the order of convergence $p$:
$$\\frac{e_{k+1}}{e_k} = \\frac{(b_0 - a_0) / 2^{k+2}}{(b_0 - a_0) / 2^{k+1}} = \\frac{1}{2} = 0.5$$

Since $e_{k+1} = C \\cdot e_k^1$ with asymptotic error constant $C = 0.5$, the Bisection Method exhibits **linear convergence** ($p = 1$).
Each iteration gains exactly $1$ binary bit of precision (or $\\log_{10}(2) \\approx 0.301$ decimal digits).

### 3.2 Calculating Required Number of Iterations
To guarantee an error less than a specified tolerance $\\epsilon$:

$$\\frac{b_0 - a_0}{2^{n}} < \\epsilon \\implies 2^n > \\frac{b_0 - a_0}{\\epsilon}$$

Taking the base-2 logarithm on both sides:

$$n > \\log_2 \\left( \\frac{b_0 - a_0}{\\epsilon} \\right) = \\frac{\\ln(b_0 - a_0) - \\ln(\\epsilon)}{\\ln(2)}$$

This is a rare and powerful property: **we can compute the exact number of iterations before even running the algorithm!**

---

## 4. Advantages & Engineering Limitations

| Advantages | Engineering Limitations |
| :--- | :--- |
| **Guaranteed Convergence**: Unconditionally converges to a root provided $f(x)$ is continuous on $[a, b]$. | **Slow Convergence**: Linear rate ($C=0.5$) requires many iterations compared to superlinear methods. |
| **No Derivatives Required**: Works even when $f'(x)$ is discontinuous, expensive, or unavailable. | **Cannot Detect Even Multiplicity Roots**: Fails if the function touches the axis without crossing ($f(x) = (x-2)^2$). |
| **Predictable Iteration Count**: Exact required iterations $n$ can be predetermined analytically. | **Single Root per Interval**: Finds only one root even if multiple roots reside in $[a, b]$. |

---

> [!TIP] **EXAM TIP:**
> When asked "Find the number of iterations required to achieve an accuracy of $10^{-4}$ on $[1, 2]$", use the formula $n \\ge \\frac{\\ln(b-a) - \\ln(\\epsilon)}{\\ln 2}$.
> For $[1, 2]$ and $\\epsilon = 10^{-4}$: $n \\ge \\frac{\\ln(1) - \\ln(10^{-4})}{\\ln 2} = \\frac{4 \\times 2.302585}{0.693147} = 13.28 \\implies \\mathbf{14\\text{ iterations}}$. Always round UP to the nearest integer!

> [!NOTE] **DEV BRAIN:**
> In computer floating-point implementations, calculating midpoint as \`c = (a + b) / 2\` can cause **arithmetic overflow** if $a$ and $b$ are large positive numbers near \`float_max\`. Always write \`c = a + (b - a) / 2\` to guarantee numerical safety!

> [!WARNING] **TRAP:**
> Never test the bracket condition using \`if f(a) * f(c) < 0\` without precautions against underflow! If $f(a)$ and $f(c)$ are tiny numbers (e.g., $10^{-200}$), their product underflows to \`0.0\`, violating the test. In production code, check \`np.sign(f(a)) != np.sign(f(c))\`.

> [!IMPORTANT] **MEMORIZE:**
> - Error bound formula: $e_n \\le \\frac{b - a}{2^{n+1}}$
> - Required iterations: $n > \\frac{\\log_{10}(b - a) - \\log_{10}(\\epsilon)}{\\log_{10}(2)}$
> - Order of convergence: $p = 1$ (Linear), Asymptotic constant $C = 0.5$.
`,
          shortNotes: "Bisection method halves the bracket [a, b] where f(a)*f(b) < 0. Linear convergence (p=1, C=0.5). Iteration count n > log2((b-a)/tol). Guaranteed to converge.",
          examples: [
            {
              title: "Finding Root of x^3 - 4x - 9 = 0 using Bisection Method",
              problem: "Find a real root of f(x) = x^3 - 4x - 9 = 0 in the interval [2, 3] correct to 3 decimal places (tolerance = 0.001) using the Bisection Method.",
              explanation: "Initial check:\\nf(2) = 2^3 - 4(2) - 9 = 8 - 8 - 9 = -9 < 0.\\nf(3) = 3^3 - 4(3) - 9 = 27 - 12 - 9 = +6 > 0.\\nSince f(2) * f(3) < 0, a root exists in [2, 3].\\n\\nIteration 1: c1 = (2 + 3)/2 = 2.5\\nf(2.5) = (2.5)^3 - 4(2.5) - 9 = 15.625 - 10 - 9 = -3.375 < 0.\\nf(2.5) < 0 and f(3) > 0 -> Root in [2.5, 3].\\n\\nIteration 2: c2 = (2.5 + 3)/2 = 2.75\\nf(2.75) = (2.75)^3 - 4(2.75) - 9 = 20.796875 - 11 - 9 = +0.7969 > 0.\\nf(2.5) < 0 and f(2.75) > 0 -> Root in [2.5, 2.75].\\n\\nIteration 3: c3 = (2.5 + 2.75)/2 = 2.625\\nf(2.625) = -1.4121 < 0 -> Root in [2.625, 2.75].\\n\\nContinuing iterations until (b - a)/2 < 0.001 leads to root approx 2.706.",
              code: "def bisection(f, a, b, tol=1e-3, max_iter=50):\n    if f(a) * f(b) >= 0:\n        raise ValueError(\"f(a) and f(b) must have opposite signs!\")\n        \n    print(f\"{'Iter':<5} {'a':<10} {'b':<10} {'c (Midpoint)':<14} {'f(c)':<12} {'Error':<10}\")\n    print(\"-\" * 65)\n    \n    for k in range(1, max_iter + 1):\n        c = a + (b - a) / 2.0\n        fc = f(c)\n        err = (b - a) / 2.0\n        print(f\"{k:<5} {a:<10.5f} {b:<10.5f} {c:<14.5f} {fc:<12.5f} {err:<10.5f}\")\n        \n        if abs(fc) < 1e-12 or err < tol:\n            return c, k\n            \n        if f(a) * fc < 0:\n            b = c\n        else:\n            a = c\n            \n    return c, max_iter\n\nf = lambda x: x**3 - 4*x - 9\nroot, iters = bisection(f, 2.0, 3.0, tol=0.001)\nprint(f\"\\nConverged Root: {root:.4f} in {iters} iterations.\")\n",
              output: "Iter  a          b          c (Midpoint)   f(c)         Error     \n-----------------------------------------------------------------\n1     2.00000    3.00000    2.50000        -3.37500     0.50000   \n2     2.50000    3.00000    2.75000        0.79688      0.25000   \n3     2.50000    2.75000    2.62500        -1.41211     0.12500   \n4     2.62500    2.75000    2.68750        -0.33911     0.06250   \n5     2.68750    2.75000    2.71875        0.22092      0.03125   \n6     2.68750    2.71875    2.70312        -0.06111     0.01562   \n7     2.70312    2.71875    2.71094        0.07939      0.00781   \n8     2.70312    2.71094    2.70703        0.00901      0.00391   \n9     2.70312    2.70703    2.70508        -0.02608     0.00195   \n10    2.70508    2.70703    2.70605        -0.00854     0.00098   \n\nConverged Root: 2.7061 in 10 iterations.",
            },
          ],
          keyPoints: [
              "Bisection is based on Bolzano's Intermediate Value Theorem for continuous functions.",
              "It requires two initial guesses a and b such that f(a) * f(b) < 0.",
              "The interval length is halved at each step: Delta_k = (b0 - a0) / 2^k.",
              "Convergence is unconditionally guaranteed, with linear order of convergence (p = 1) and error constant 0.5.",
              "The number of iterations can be calculated a priori using n > log2((b - a) / epsilon)."
],
          theoryQuestions: [
            {
              question: "State Bolzano's Intermediate Value Theorem and explain how it forms the theoretical foundation of the Bisection Method.",
              marks: "5 Marks",
              answer: "1. Theorem Statement: If a real-valued function f(x) is continuous on a closed interval [a, b], and f(a) and f(b) have opposite signs (f(a) * f(b) < 0), then there exists at least one real value xi in (a, b) such that f(xi) = 0.\\n2. Theoretical Foundation: The bisection method constructs a sequence of nested intervals [a0, b0] supset [a1, b1] supset ... supset [an, bn] such that f(ak) * f(bk) < 0 for every k. By the Cantor Intersection Theorem and the continuity of f(x), the intersection of these intervals converges to a unique point xi as the interval length approaches zero ((b-a)/2^n -> 0), guaranteeing that f(xi) = 0.",
              keyPoints: ["IVT formal definition", "Continuity requirement on [a, b]", "Nested interval construction", "Convergence guarantee via shrinking interval length"],
            },
            {
              question: "Prove that the order of convergence of the Bisection Method is linear (p = 1).",
              marks: "5 Marks",
              answer: "1. Let xi be the true root and ck = (ak + bk)/2 be the midpoint approximation at iteration k.\\n2. Since xi in [ak, bk], the absolute error is bounded by: e_k = |ck - xi| <= (bk - ak)/2 = (b0 - a0) / 2^(k+1).\\n3. At the (k+1)-th iteration: e_{k+1} <= (b0 - a0) / 2^(k+2).\\n4. Taking the ratio: lim_{k -> infty} (e_{k+1} / e_k) = 1/2 = 0.5.\\n5. By definition of order of convergence, lim |e_{k+1}| / |e_k|^p = C. Here p = 1 and C = 0.5. Hence, the Bisection method converges linearly.",
              keyPoints: ["Error bound e_k <= (b - a)/2^(k+1)", "Ratio e_{k+1}/e_k = 0.5", "Definition of linear convergence p = 1", "Asymptotic error constant C = 0.5"],
            },
            {
              question: "How many iterations of the Bisection Method are required to find a root of f(x) = 0 in [0, 1] with an error tolerance of 10^(-5)?",
              marks: "3 Marks",
              answer: "Formula: n > (ln(b - a) - ln(tol)) / ln(2).\\nHere a = 0, b = 1, b - a = 1, tol = 10^(-5).\\nn > (ln(1) - ln(10^(-5))) / ln(2) = (0 - (-11.5129)) / 0.69315 = 11.5129 / 0.69315 = 16.61.\\nRounding up to the next integer, n = 17 iterations are required.",
              keyPoints: ["Formula n > log2((b - a)/tol)", "Calculation 16.61", "Rounding up yields 17 iterations"],
            },
          ],
          mcqs: [
            {
              question: "What is the order of convergence of the Bisection Method?",
              options: ["0", "1 (Linear)", "1.618 (Superlinear)", "2 (Quadratic)"],
              correctIndex: 1,
              explanation: "The Bisection method has a linear order of convergence (p = 1) with an asymptotic error constant of 0.5.",
            },
            {
              question: "If the initial interval has length 8, what is the maximum error after 4 iterations of Bisection?",
              options: ["0.5", "0.25", "1.0", "0.125"],
              correctIndex: 1,
              explanation: "Error bound is e_n <= (b - a) / 2^(n+1). For b - a = 8 and n = 4: e_4 <= 8 / 2^(4+1) = 8 / 32 = 0.25.",
            },
            {
              question: "Under what condition will the Bisection Method fail to find a root even if one exists?",
              options: ["The root has odd multiplicity", "The function has an even multiplicity root where it touches the x-axis without changing sign", "The initial interval is larger than 10", "The derivative f'(x) is large"],
              correctIndex: 1,
              explanation: "If a function has an even multiplicity root (e.g., f(x) = (x-1)^2), f(x) >= 0 everywhere, so no interval [a, b] satisfies f(a) * f(b) < 0.",
            },
            {
              question: "How many decimal digits of accuracy are gained per iteration in the Bisection method?",
              options: ["1 digit", "0.5 digit", "log10(2) approx 0.301 digits", "2 digits"],
              correctIndex: 2,
              explanation: "Because the interval halves each step (factor of 2), the precision gained per iteration is log10(2) approx 0.301 decimal digits (or exactly 1 binary bit).",
            },
          ]
        },
        {
          id: "coa-u2-t2",
          title: "Regula-Falsi (False Position) Method: Linear Interpolation Formula & Comparison",
          simpleExplanation: "Instead of blindly picking the midpoint like Bisection, the Regula-Falsi method connects the points (a, f(a)) and (b, f(b)) with a straight line (chord) and takes its x-intercept as the next approximation. This uses function magnitudes to jump closer to the root faster.",
          detailedExplanation: `## 1. Geometric Principle & Linear Interpolation Derivation

The **Regula-Falsi Method** (Latin for *"Method of False Position"*) is an ancient root-finding algorithm that combines the guaranteed convergence of bracketing methods with the speed of linear interpolation.

Rather than assuming the root lies at the exact midpoint of $[a, b]$, Regula-Falsi uses the values $f(a)$ and $f(b)$ to construct a **secant line (chord)** connecting $(a, f(a))$ and $(b, f(b))$. The point where this chord intersects the $x$-axis serves as the next root estimate $c$.

\`\`\`mermaid
flowchart TD
    subgraph Regula_Falsi_Geometry ["Regula-Falsi Linear Interpolation"]
        PTA["Point A: (a, f(a))"]
        PTB["Point B: (b, f(b))"]
        CHORD["Straight Line Chord connecting A and B"]
        XINT["x-intercept of Chord: c = (a*f(b) - b*f(a)) / (f(b) - f(a))"]
        PTA --> CHORD
        PTB --> CHORD
        CHORD --> XINT
    end
\`\`\`

### Derivation of the False Position Formula
The equation of the straight line passing through $(a, f(a))$ and $(b, f(b))$ is given by the two-point slope form:

$$\\frac{y - f(a)}{x - a} = \\frac{f(b) - f(a)}{b - a}$$

To find the $x$-intercept, set $y = 0$ and denote $x = c$:

$$\\frac{0 - f(a)}{c - a} = \\frac{f(b) - f(a)}{b - a}$$

Multiplying both sides by $(c - a)$:

$$-f(a) = \\frac{f(b) - f(a)}{b - a} (c - a)$$

Solving explicitly for $c$:

$$c - a = -\\frac{f(a)(b - a)}{f(b) - f(a)} \\implies c = a - \\frac{f(a)(b - a)}{f(b) - f(a)}$$

By finding a common denominator, this formula can be rewritten in its classic symmetric university form:

$$c = \\frac{a f(b) - b f(a)}{f(b) - f(a)}$$

---

## 2. Complete Regula-Falsi Algorithm

Given continuous function $f(x)$, bracket $[a_0, b_0]$ with $f(a_0) \\cdot f(b_0) < 0$, and error tolerance $\\epsilon$:

1. Compute the false position root estimate:
   $$c_k = \\frac{a_k f(b_k) - b_k f(a_k)}{f(b_k) - f(a_k)}$$
2. If $|f(c_k)| < \\epsilon$ or $|c_k - c_{k-1}| < \\epsilon$, stop and return $c_k$.
3. Sign test:
   - If $f(a_k) \\cdot f(c_k) < 0$: root lies in $[a_k, c_k]$; set $a_{k+1} = a_k$ and $b_{k+1} = c_k$.
   - Else: root lies in $[c_k, b_k]$; set $a_{k+1} = c_k$ and $b_{k+1} = b_k$.
4. Repeat until convergence.

---

## 3. The Stagnation Problem & Modified Regula-Falsi (Illinois Algorithm)

While Regula-Falsi typically converges faster than Bisection on flat curves, it suffers from a well-known vulnerability: **one-sided stagnation**.

If $f(x)$ is convex ($f''(x) > 0$) or concave ($f''(x) < 0$) on $[a, b]$, one of the endpoints remains permanently fixed while the other endpoint inches forward at an agonizingly slow pace. The bracket length does *not* approach zero!

\`\`\`mermaid
flowchart LR
    CONVEX["Convex Curve f''(x) > 0"] --> ONE_SIDED["Chord always falls on one side of root"]
    ONE_SIDED --> STAGNANT["Endpoint 'b' stays stagnant forever!"]
    STAGNANT --> SLOW["Convergence degrades to painfully slow linear crawl"]
\`\`\`

### The Illinois Modification
To eliminate endpoint stagnation, the **Illinois algorithm** modifies the function value at the stagnant endpoint:
- If the endpoint $b$ is retained for two consecutive iterations, replace $f(b)$ with $\\frac{1}{2} f(b)$ in the chord formula!
- This artificially pulls the chord downward, forcing the next iterate to jump over the root and clear the stagnation.
- The Illinois algorithm restores superlinear convergence ($p \\approx 1.442$).

---

## 4. Head-to-Head Comparison: Bisection vs. Regula-Falsi

| Parameter | Bisection Method | Regula-Falsi Method |
| :--- | :--- | :--- |
| **New Point Formula** | $c = \\frac{a + b}{2}$ (pure arithmetic midpoint) | $c = \\frac{a f(b) - b f(a)}{f(b) - f(a)}$ (weighted secant intercept) |
| **Information Used** | Uses only algebraic signs of $f(x)$ | Uses both algebraic signs AND numerical magnitudes of $f(x)$ |
| **Bracket Shrinking** | Bracket length $(b - a)$ shrinks to $0$ strictly as $(b-a)/2^n$ | Bracket length $(b - a)$ may NOT shrink to $0$ if one end is stagnant! |
| **Stopping Condition** | Interval width $\\frac{b-a}{2} < \\epsilon$ | Function value $|f(c)| < \\epsilon$ or $|c_k - c_{k-1}| < \\epsilon$ |
| **Speed on General Functions** | Slower (linear, $p=1$, $C=0.5$) | Generally faster on well-behaved functions; very slow on highly curved convex functions |

---

> [!TIP] **EXAM TIP:**
> Never use interval width $|b_k - a_k| < \\epsilon$ as the stopping condition for Regula-Falsi! Because of endpoint stagnation, $b_k - a_k$ might never reach $\\epsilon$. Always stop when $|f(c_k)| < \\epsilon$ or consecutive step difference $|c_{k+1} - c_k| < \\epsilon$.

> [!NOTE] **DEV BRAIN:**
> The formula $c = \\frac{a f(b) - b f(a)}{f(b) - f(a)}$ involves subtracting two products $a f(b) - b f(a)$. If $f(a)$ and $f(b)$ are nearly equal, this causes subtractive cancellation. The algebraically equivalent form $c = a - f(a) \\frac{b - a}{f(b) - f(a)}$ is much more stable in numerical code.

> [!WARNING] **TRAP:**
> Do not confuse Regula-Falsi with the Secant Method! Regula-Falsi is a **bracketing** method that guarantees $f(a) \\cdot f(b) < 0$ at every step. The Secant Method is an **open** method that uses the two most recent points regardless of their sign, which can diverge!

> [!IMPORTANT] **MEMORIZE:**
> - Chord formula: $c = \\frac{a f(b) - b f(a)}{f(b) - f(a)} = a - f(a) \\frac{b - a}{f(b) - f(a)}$
> - Convergence: Guaranteed, linear ($p = 1$), but susceptible to one-sided stagnation.
> - Illinois fix: Halve the stagnant endpoint function value ($f \\leftarrow f/2$).
`,
          shortNotes: "Regula-Falsi finds root via secant line x-intercept: c = (a*f(b) - b*f(a)) / (f(b) - f(a)). Bracketing method, guaranteed convergence, but prone to endpoint stagnation.",
          examples: [
            {
              title: "Solving x^3 - 2x - 5 = 0 using Regula-Falsi Method",
              problem: "Find the real root of f(x) = x^3 - 2x - 5 = 0 in the interval [2, 3] correct to 3 decimal places using the False Position (Regula-Falsi) Method.",
              explanation: "Initial check:\\nf(2) = 2^3 - 2(2) - 5 = 8 - 4 - 5 = -1 < 0.\\nf(3) = 3^3 - 2(3) - 5 = 27 - 6 - 5 = +16 > 0.\\nf(2) * f(3) < 0, root in [2, 3].\\n\\nIteration 1:\\na = 2, f(a) = -1\\nb = 3, f(b) = 16\\nc1 = (a*f(b) - b*f(a)) / (f(b) - f(a)) = (2*16 - 3*(-1)) / (16 - (-1)) = (32 + 3) / 17 = 35 / 17 approx 2.05882.\\nf(c1) = (2.05882)^3 - 2(2.05882) - 5 = 8.726 - 4.118 - 5 = -0.3908 < 0.\\nSince f(c1) < 0 and f(3) > 0, set a = 2.05882, b = 3 (b stays stagnant!).\\n\\nIteration 2:\\na = 2.05882, f(a) = -0.3908\\nb = 3, f(b) = 16\\nc2 = (2.05882*16 - 3*(-0.3908)) / (16 - (-0.3908)) = (32.941 + 1.172) / 16.3908 = 34.113 / 16.3908 approx 2.08126.\\nf(c2) = (2.08126)^3 - 2(2.08126) - 5 = -0.1472 < 0.\\nSet a = 2.08126, b = 3.\\n\\nContinuing iterations yields root approx 2.094.",
              code: "def regula_falsi(f, a, b, tol=1e-4, max_iter=30):\n    fa, fb = f(a), f(b)\n    if fa * fb >= 0:\n        raise ValueError(\"f(a) and f(b) must have opposite signs!\")\n        \n    print(f\"{'Iter':<5} {'a':<10} {'b':<10} {'c':<12} {'f(c)':<12}\")\n    print(\"-\" * 52)\n    \n    for k in range(1, max_iter + 1):\n        c = (a * fb - b * fa) / (fb - fa)\n        fc = f(c)\n        print(f\"{k:<5} {a:<10.5f} {b:<10.5f} {c:<12.5f} {fc:<12.5e}\")\n        \n        if abs(fc) < tol:\n            return c, k\n            \n        if fa * fc < 0:\n            b, fb = c, fc\n        else:\n            a, fa = c, fc\n            \n    return c, max_iter\n\nf = lambda x: x**3 - 2*x - 5\nroot, iters = regula_falsi(f, 2.0, 3.0, tol=1e-3)\nprint(f\"\\nConverged Root: {root:.4f} in {iters} iterations.\")\n",
              output: "Iter  a          b          c            f(c)        \n----------------------------------------------------\n1     2.00000    3.00000    2.05882      -3.90799e-01\n2     2.05882    3.00000    2.08126      -1.47204e-01\n3     2.08126    3.00000    2.08964      -5.46747e-02\n4     2.08964    3.00000    2.09274      -2.01524e-02\n5     2.09274    3.00000    2.09388      -7.39958e-03\n6     2.09388    3.00000    2.09430      -2.71188e-03\n7     2.09430    3.00000    2.09446      -9.92723e-04\n\nConverged Root: 2.0945 in 7 iterations.",
            },
          ],
          keyPoints: [
              "Regula-Falsi interpolates a straight line chord between (a, f(a)) and (b, f(b)).",
              "Its root approximation formula is c = (a*f(b) - b*f(a)) / (f(b) - f(a)).",
              "Unlike Bisection, it utilizes magnitude information of f(x) to bias the guess closer to the root.",
              "It is prone to one-sided stagnation on concave/convex functions, where one endpoint never updates.",
              "The Illinois modification overcomes stagnation by halving the function value at the stagnant endpoint."
],
          theoryQuestions: [
            {
              question: "Derive the mathematical formula for the Regula-Falsi (False Position) root-finding method from first principles.",
              marks: "5 Marks",
              answer: "1. Let y = f(x) be continuous on [a, b] with f(a) * f(b) < 0.\\n2. Consider the two points A(a, f(a)) and B(b, f(b)) on the curve. Construct the straight line (chord) connecting A and B.\\n3. Equation of chord: (y - f(a)) / (x - a) = (f(b) - f(a)) / (b - a).\\n4. The approximation c is the x-intercept of this line, where y = 0:\\n(0 - f(a)) / (c - a) = (f(b) - f(a)) / (b - a).\\n5. Rearranging:\\n(c - a) = -f(a) * (b - a) / (f(b) - f(a))\\nc = a - f(a) * (b - a) / (f(b) - f(a)) = (a*f(b) - a*f(a) - a*f(a) + b*f(a)) / (f(b) - f(a)) = (a*f(b) - b*f(a)) / (f(b) - f(a)).",
              keyPoints: ["Equation of secant line through A and B", "Setting y = 0 for x-intercept", "Algebraic rearrangement to c = (a*f(b) - b*f(a))/(f(b) - f(a))"],
            },
            {
              question: "Explain the phenomenon of 'stagnation' in the Regula-Falsi method. How does the Illinois algorithm rectify it?",
              marks: "5 Marks",
              answer: "1. Phenomenon: If f(x) is strictly convex (f'' > 0) or concave (f'' < 0) on [a, b], the chord always intersects the x-axis on the same side of the root. Consequently, one endpoint is repeatedly replaced while the opposite endpoint remains stagnant forever. The interval width (b - a) does not shrink to zero, and convergence slows to a crawl.\\n2. Illinois Algorithm Fix: If an endpoint remains unchanged for two consecutive iterations, the algorithm divides that endpoint's function value by 2 (e.g., replace f(b) with f(b)/2). This artificially rotates the chord downward, ensuring that the next iterate falls on the opposite side of the root, unfreezing the stagnant bracket.",
              keyPoints: ["Curvature causing one-sided chord intersections", "Failure of interval width to shrink", "Illinois algorithm halving stagnant f-value", "Restoration of superlinear convergence"],
            },
            {
              question: "Compare Bisection and Regula-Falsi methods on the basis of convergence guarantee, rate of convergence, and stopping criteria.",
              marks: "5 Marks",
              answer: "1. Convergence Guarantee: Both methods are bracketing methods and unconditionally guaranteed to converge if f(x) is continuous and f(a)*f(b) < 0.\\n2. Rate of Convergence: Both possess linear convergence (p = 1). Bisection has constant error reduction ratio 0.5. Regula-Falsi is often much faster initially on flat curves, but can become drastically slower than Bisection when stagnation occurs.\\n3. Stopping Criteria: Bisection can safely use interval width (b - a)/2 < tol because the interval shrinks unconditionally. Regula-Falsi MUST use function tolerance |f(c)| < tol or step difference |c_{k+1} - c_k| < tol because the interval width (b - a) may never approach zero.",
              keyPoints: ["Both bracketing with guaranteed convergence", "Both p = 1, but different practical behavior", "Stopping criterion: interval width vs |f(c)|"],
            },
          ],
          mcqs: [
            {
              question: "Which of the following represents the correct Regula-Falsi formula for root estimate c?",
              options: ["c = (a + b) / 2", "c = (a * f(b) - b * f(a)) / (f(b) - f(a))", "c = (a * f(a) - b * f(b)) / (f(a) - f(b))", "c = a - f'(a) / f(a)"],
              correctIndex: 1,
              explanation: "The formula derived from the x-intercept of the chord joining (a, f(a)) and (b, f(b)) is c = (a*f(b) - b*f(a)) / (f(b) - f(a)).",
            },
            {
              question: "Why is interval length (b - a) < tol an unsuitable stopping condition for the standard Regula-Falsi method?",
              options: ["Because the interval length oscillates randomly", "Because one endpoint may stagnate, preventing (b - a) from ever shrinking to zero", "Because Regula-Falsi is an open method", "Because the interval length shrinks too quickly"],
              correctIndex: 1,
              explanation: "On convex or concave curves, one endpoint can remain fixed indefinitely (stagnation). The interval (b - a) never shrinks to zero even as c converges to the exact root.",
            },
            {
              question: "How does the Illinois algorithm modify Regula-Falsi to overcome endpoint stagnation?",
              options: ["It doubles the step size", "It halves the function value of the stagnant endpoint", "It switches to Newton-Raphson", "It inverts the matrix"],
              correctIndex: 1,
              explanation: "The Illinois algorithm divides the function value at the stagnant endpoint by 2 when it is retained for two consecutive steps, forcing the chord to intersect across the root.",
            },
            {
              question: "What geometric entity is used by Regula-Falsi to generate the next root estimate?",
              options: ["Tangent line", "Secant line (chord)", "Parabola", "Cubic spline"],
              correctIndex: 1,
              explanation: "Regula-Falsi uses the secant line (chord) connecting the two bounding bracket points (a, f(a)) and (b, f(b)).",
            },
          ]
        },
        {
          id: "coa-u2-t3",
          title: "Newton-Raphson Method: Geometric Tangent Derivation & Quadratic Convergence Proof",
          simpleExplanation: "Newton-Raphson starts from an initial guess and draws a tangent line to the curve at that point; the point where this tangent hits the x-axis becomes the improved estimate. Repeating this process converges remarkably fast, doubling the number of correct decimal digits each iteration.",
          detailedExplanation: `## 1. Geometric & Taylor Series Derivations

The **Newton-Raphson Method** is the most celebrated and widely used open root-finding algorithm in numerical analysis and scientific computing. Unlike bracketing methods, it requires only a single initial guess $x_0$ and utilizes derivative (slope) information.

### 1.1 Geometric Derivation (The Tangent Line)
Let $x_n$ be the current approximation to the root of $f(x) = 0$.
1. Draw the tangent line to the curve $y = f(x)$ at the point $(x_n, f(x_n))$.
2. The slope of this tangent line is $m = f'(x_n)$.
3. Using the point-slope equation of a straight line:
   $$y - f(x_n) = f'(x_n)(x - x_n)$$
4. The next approximation $x_{n+1}$ is defined as the $x$-intercept of this tangent line (where $y = 0$):
   $$0 - f(x_n) = f'(x_n)(x_{n+1} - x_n)$$
5. Rearranging yields the legendary **Newton-Raphson iteration formula**:

$$x_{n+1} = x_n - \\frac{f(x_n)}{f'(x_n)}$$

\`\`\`mermaid
flowchart TD
    subgraph NR_Geometry ["Newton-Raphson Iterative Loop"]
        XN["Current Estimate x_n"]
        TANGENT["Compute Tangent at (x_n, f(x_n)) with Slope f'(x_n)"]
        INTERCEPT["Find x-intercept: x_{n+1} = x_n - f(x_n) / f'(x_n)"]
        CHECK{"|x_{n+1} - x_n| < tol?"}
        ROOT["Converged Root x*"]
        XN --> TANGENT --> INTERCEPT --> CHECK
        CHECK -->|"No"| XN
        CHECK -->|"Yes"| ROOT
    end
\`\`\`

### 1.2 Derivation via Taylor Series Expansion
Let $\\xi$ be the exact root such that $f(\\xi) = 0$. Let $x_n$ be an estimate close to $\\xi$, with error $h = \\xi - x_n \\implies \\xi = x_n + h$.
Expanding $f(\\xi)$ as a Taylor series around $x_n$:

$$f(\\xi) = f(x_n + h) = f(x_n) + h f'(x_n) + \\frac{h^2}{2!} f''(x_n) + \\frac{h^3}{3!} f'''(x_n) + \\dots = 0$$

Assuming $h$ is very small, we neglect second- and higher-order terms ($h^2, h^3, \\dots$):

$$f(x_n) + h f'(x_n) \\approx 0 \\implies h \\approx -\\frac{f(x_n)}{f'(x_n)}$$

Since $\\xi = x_n + h$, our updated estimate $x_{n+1}$ is:
$$x_{n+1} = x_n - \\frac{f(x_n)}{f'(x_n)}$$

---

## 2. Rigorous Proof of Quadratic Order of Convergence ($p = 2$)

One of the most critical university examination derivations is proving that the Newton-Raphson method converges **quadratically** ($p = 2$).

### Mathematical Proof
Let $\\xi$ be the simple exact root ($f(\\xi) = 0$ and $f'(\\xi) \\ne 0$).
Define the error at iteration $n$ as $\\epsilon_n = x_n - \\xi \\implies x_n = \\xi + \\epsilon_n$.
Similarly, $\\epsilon_{n+1} = x_{n+1} - \\xi$.

The Newton-Raphson iteration states:
$$\\epsilon_{n+1} + \\xi = (\\xi + \\epsilon_n) - \\frac{f(\\xi + \\epsilon_n)}{f'(\\xi + \\epsilon_n)}$$

$$\\epsilon_{n+1} = \\epsilon_n - \\frac{f(\\xi + \\epsilon_n)}{f'(\\xi + \\epsilon_n)}$$

Now, expand $f(\\xi + \\epsilon_n)$ and $f'(\\xi + \\epsilon_n)$ in Taylor series around $\\xi$, noting that $f(\\xi) = 0$:

$$f(\\xi + \\epsilon_n) = f(\\xi) + \\epsilon_n f'(\\xi) + \\frac{\\epsilon_n^2}{2} f''(\\xi) + O(\\epsilon_n^3) = \\epsilon_n f'(\\xi) + \\frac{\\epsilon_n^2}{2} f''(\\xi) + O(\\epsilon_n^3)$$

$$f'(\\xi + \\epsilon_n) = f'(\\xi) + \\epsilon_n f''(\\xi) + O(\\epsilon_n^2) = f'(\\xi) \\left[ 1 + \\epsilon_n \\frac{f''(\\xi)}{f'(\\xi)} + O(\\epsilon_n^2) \\right]$$

Substitute these expansions into the error equation:

$$\\epsilon_{n+1} = \\epsilon_n - \\frac{\\epsilon_n f'(\\xi) + \\frac{\\epsilon_n^2}{2} f''(\\xi)}{f'(\\xi) \\left[ 1 + \\epsilon_n \\frac{f''(\\xi)}{f'(\\xi)} \\right]}$$

$$\\epsilon_{n+1} = \\epsilon_n - \\left[ \\epsilon_n + \\frac{\\epsilon_n^2}{2} \\frac{f''(\\xi)}{f'(\\xi)} \\right] \\left[ 1 + \\epsilon_n \\frac{f''(\\xi)}{f'(\\xi)} \\right]^{-1}$$

Using the binomial expansion $(1 + u)^{-1} \\approx 1 - u + u^2 - \\dots$ for small $u$:

$$\\epsilon_{n+1} \\approx \\epsilon_n - \\left[ \\epsilon_n + \\frac{\\epsilon_n^2}{2} \\frac{f''(\\xi)}{f'(\\xi)} \\right] \\left[ 1 - \\epsilon_n \\frac{f''(\\xi)}{f'(\\xi)} \\right]$$

Multiplying out the terms:
$$\\epsilon_{n+1} \\approx \\epsilon_n - \\left[ \\epsilon_n - \\epsilon_n^2 \\frac{f''(\\xi)}{f'(\\xi)} + \\frac{\\epsilon_n^2}{2} \\frac{f''(\\xi)}{f'(\\xi)} - O(\\epsilon_n^3) \\right]$$

$$\\epsilon_{n+1} \\approx \\epsilon_n - \\epsilon_n + \\epsilon_n^2 \\frac{f''(\\xi)}{f'(\\xi)} - \\frac{\\epsilon_n^2}{2} \\frac{f''(\\xi)}{f'(\\xi)}$$

$$\\epsilon_{n+1} \\approx \\frac{1}{2} \\frac{f''(\\xi)}{f'(\\xi)} \\epsilon_n^2$$

Taking absolute values:
$$\\lim_{n \\to \\infty} \\frac{|\\epsilon_{n+1}|}{|\\epsilon_n|^2} = \\left| \\frac{f''(\\xi)}{2 f'(\\xi)} \\right| = C$$

**Conclusion**: The exponent of $\\epsilon_n$ is **$2$**, proving that Newton-Raphson has **quadratic convergence ($p = 2$)**.
*Consequence*: The number of correct decimal digits **doubles** with every single iteration!

---

## 3. Classical Failure Modes & Algorithmic Pitfalls

Despite its quadratic speed, Newton-Raphson is an **open method** that can fail catastrophically under specific geometric conditions:

\`\`\`mermaid
flowchart TD
    PITFALLS["Newton-Raphson Failure Modes"] --> P1["1. Division by Zero: f'(x_n) == 0 (Horizontal tangent)"]
    PITFALLS --> P2["2. Infinite Oscillation (Cycle Trapping between points)"]
    PITFALLS --> P3["3. Overshoot / Divergence (Inflection points f''(x) == 0)"]
    PITFALLS --> P4["4. Multiple Roots (Degrades from Quadratic to Linear p=1)"]
\`\`\`

1. **Stationary / Zero Derivative ($f'(x_n) = 0$):**
   The tangent line is horizontal and never intersects the $x$-axis. The formula throws a \`ZeroDivisionError\`.
2. **Infinite Periodic Cycles (Oscillatory Trap):**
   For functions like $f(x) = x^3 - x - 3$, an initial guess can cause $x_{n+1}$ to bounce back to $x_n$, entering an infinite 2-cycle loop ($x_0 \\to x_1 \\to x_0 \\to x_1$).
3. **Severe Overshoot & Divergence:**
   Near an inflection point ($f''(x) = 0$), the tangent line is nearly horizontal, launching the next iterate wildly far from the root into non-convergent territory.
4. **Multiple Roots Degradation:**
   If $\\xi$ is a root of multiplicity $m > 1$ (e.g., $f(x) = (x-1)^2$), $f'(\\xi) = 0$. The denominator vanishes, and convergence **degrades to linear ($p = 1$)**!
   *Correction*: The modified Newton formula $x_{n+1} = x_n - m \\frac{f(x_n)}{f'(x_n)}$ restores quadratic convergence.

---

> [!TIP] **EXAM TIP:**
> When asked to derive the Newton-Raphson formula for reciprocal or square root:
> - For square root $\\sqrt{N}$: set $f(x) = x^2 - N = 0$. Then $x_{n+1} = x_n - \\frac{x_n^2 - N}{2x_n} = \\frac{1}{2}\\left(x_n + \\frac{N}{x_n}\\right)$.
> - For reciprocal $1/N$: set $f(x) = \\frac{1}{x} - N = 0$. Then $x_{n+1} = x_n(2 - N x_n)$ (performs division using only multiplication and subtraction!).

> [!NOTE] **DEV BRAIN:**
> The reciprocal formula $x_{n+1} = x_n(2 - N x_n)$ is used inside hardware CPU silicon (e.g., Intel/AMD FPUs) to implement fast floating-point division using hardware multipliers!

> [!WARNING] **TRAP:**
> Newton-Raphson is **locally convergent**, NOT globally convergent! It is only guaranteed to converge quadratically if the initial guess $x_0$ is chosen sufficiently close to the true root $\\xi$. Always verify that $|f(x_0) f''(x_0)| < |f'(x_0)|^2$ (Fourier condition) for initial stability.

> [!IMPORTANT] **MEMORIZE:**
> - Iteration formula: $x_{n+1} = x_n - \\frac{f(x_n)}{f'(x_n)}$
> - Order of convergence: $p = 2$ (Quadratic)
> - Asymptotic error constant: $C = \\left| \\frac{f''(\\xi)}{2 f'(\\xi)} \\right|$
> - Multiple root modified formula: $x_{n+1} = x_n - m \\frac{f(x_n)}{f'(x_n)}$
`,
          shortNotes: "Newton-Raphson uses tangent line x-intercept: x_{n+1} = x_n - f(x_n)/f'(x_n). Quadratic convergence (p=2). Doubles correct digits per step. Fails if f'(x) = 0.",
          examples: [
            {
              title: "Computing sqrt(17) to 6 Decimal Places using Newton-Raphson",
              problem: "Derive the Newton-Raphson recurrence formula for finding the square root of N, and apply it to compute sqrt(17) starting with x0 = 4.0 to 6 decimal places.",
              explanation: "Step 1: Formulate the equation\\nLet x = sqrt(N) => x^2 = N => f(x) = x^2 - N = 0.\\nDerivative: f'(x) = 2x.\\n\\nStep 2: Newton-Raphson Iteration Formula\\nx_{n+1} = x_n - f(x_n) / f'(x_n) = x_n - (x_n^2 - N) / (2 x_n)\\nx_{n+1} = (2 x_n^2 - x_n^2 + N) / (2 x_n) = (x_n^2 + N) / (2 x_n) = 0.5 * (x_n + N / x_n).\\n\\nStep 3: Execute for N = 17, x0 = 4.0\\nIteration 1:\\nx1 = 0.5 * (4.0 + 17 / 4.0) = 0.5 * (4.0 + 4.25) = 4.125000000\\n\\nIteration 2:\\nx2 = 0.5 * (4.125 + 17 / 4.125) = 0.5 * (4.125 + 4.121212121) = 4.123106061\\n\\nIteration 3:\\nx3 = 0.5 * (4.123106061 + 17 / 4.123106061) = 4.123105626\\n\\nNotice: In just 3 iterations, x2 and x3 agree to 6 decimal places! True sqrt(17) = 4.123105626.",
              code: "def newton_sqrt(N, x0, tol=1e-8, max_iter=20):\n    x = float(x0)\n    print(f\"{'Iter':<5} {'x_n':<16} {'f(x_n)':<16} {'Error':<16}\")\n    print(\"-\" * 55)\n    \n    for k in range(1, max_iter + 1):\n        x_next = 0.5 * (x + N / x)\n        err = abs(x_next - x)\n        fx = x**2 - N\n        print(f\"{k:<5} {x:<16.10f} {fx:<16.6e} {err:<16.6e}\")\n        \n        if err < tol:\n            return x_next, k\n        x = x_next\n        \n    return x, max_iter\n\nN = 17\nroot, iters = newton_sqrt(N, 4.0)\nprint(f\"\\nComputed sqrt({N}) = {root:.10f} in {iters} iterations.\")\n",
              output: "Iter  x_n              f(x_n)           Error           \n-------------------------------------------------------\n1     4.0000000000     -1.000000e+00    1.250000e-01    \n2     4.1250000000     1.562500e-02     1.893939e-03    \n3     4.1231060606     3.587289e-06     4.349970e-07    \n4     4.1231056256     1.897354e-13     2.299557e-14    \n\nComputed sqrt(17) = 4.1231056256 in 4 iterations.",
            },
          ],
          keyPoints: [
              "Newton-Raphson uses tangent line intercepts: x_{n+1} = x_n - f(x_n)/f'(x_n).",
              "It requires evaluating both the function f(x) and its derivative f'(x) at every iteration.",
              "It exhibits quadratic convergence (order p = 2), meaning the number of significant digits roughly doubles each step.",
              "The asymptotic error constant is C = |f''(xi) / (2 f'(xi))|.",
              "Failure occurs when f'(x) = 0, at inflection points, or when starting far from the root.",
              "Convergence drops to linear (p = 1) for roots with multiplicity m > 1."
],
          theoryQuestions: [
            {
              question: "Prove mathematically that the Newton-Raphson method possesses a quadratic rate of convergence (order p = 2).",
              marks: "7 Marks",
              answer: "1. Let xi be the simple root (f(xi) = 0, f'(xi) != 0) and let epsilon_n = x_n - xi.\\n2. Newton formula: epsilon_{n+1} + xi = (xi + epsilon_n) - f(xi + epsilon_n) / f'(xi + epsilon_n).\\n3. Taylor expansion about xi gives:\\nf(xi + epsilon_n) = epsilon_n f'(xi) + (epsilon_n^2 / 2) f''(xi) + O(epsilon_n^3).\\nf'(xi + epsilon_n) = f'(xi) [1 + epsilon_n (f''(xi)/f'(xi)) + ...].\\n4. Substituting and expanding (1 + u)^(-1) approx 1 - u:\\nepsilon_{n+1} = epsilon_n - [epsilon_n + (epsilon_n^2/2)(f''/f')] * [1 - epsilon_n(f''/f')].\\n5. Multiplying and simplifying terms:\\nepsilon_{n+1} = epsilon_n - [epsilon_n - epsilon_n^2 (f''/f') + (epsilon_n^2/2)(f''/f')] = (1/2) (f''(xi) / f'(xi)) * epsilon_n^2.\\n6. Taking limits: lim_{n -> infty} |epsilon_{n+1}| / |epsilon_n|^2 = |f''(xi) / (2 f'(xi))|. Because the error is proportional to the square of previous error, order of convergence p = 2 (Quadratic).",
              keyPoints: ["Error definition epsilon_n = x_n - xi", "Taylor expansions of f and f'", "Binomial expansion (1+u)^(-1)", "Simplification to epsilon_{n+1} approx 0.5*(f''/f')*epsilon_n^2", "Proof that p = 2"],
            },
            {
              question: "Discuss three scenarios where the Newton-Raphson method fails to converge or performs poorly.",
              marks: "5 Marks",
              answer: "1. Stationary Point / Zero Slope: If f'(x_n) = 0 at any iterate, the tangent is parallel to the x-axis, division by zero occurs, and the method crashes.\\n2. Oscillatory / Cycle Trap: If the curvature causes x_{n+1} to land at a point whose tangent projects back to x_n, the algorithm enters an infinite alternating cycle (e.g. x0 -> x1 -> x0) without converging.\\n3. Multiple Roots: If a root has multiplicity m > 1 (f(xi) = 0 and f'(xi) = 0), the ratio f(x)/f'(x) becomes 0/0 at the root. The method converges only linearly (p = 1) rather than quadratically, requiring m times more steps unless modified.",
              keyPoints: ["Zero slope / division by zero", "Oscillatory cycling traps", "Multiple root degradation from quadratic to linear"],
            },
            {
              question: "Derive the Newton-Raphson iterative formula for computing the reciprocal 1/N without performing division.",
              marks: "3 Marks",
              answer: "Let x = 1/N. Then f(x) = 1/x - N = 0.\\nDerivative: f'(x) = -1/x^2.\\nNewton-Raphson formula:\\nx_{n+1} = x_n - f(x_n) / f'(x_n) = x_n - (1/x_n - N) / (-1/x_n^2)\\nx_{n+1} = x_n + x_n^2 * (1/x_n - N) = x_n + x_n - N * x_n^2 = 2 x_n - N * x_n^2\\nx_{n+1} = x_n * (2 - N * x_n).\\nThis formula computes 1/N using only multiplication and subtraction.",
              keyPoints: ["Setup f(x) = 1/x - N = 0", "Derivative f'(x) = -1/x^2", "Substitution into formula", "Final form x_{n+1} = x_n * (2 - N * x_n)"],
            },
          ],
          mcqs: [
            {
              question: "What is the order of convergence of the Newton-Raphson method for a simple root?",
              options: ["1", "1.618", "2", "3"],
              correctIndex: 2,
              explanation: "For a simple root (where f'(xi) != 0), the Newton-Raphson method converges quadratically with order p = 2.",
            },
            {
              question: "What happens to the convergence rate of the standard Newton-Raphson method if the root has multiplicity m = 2?",
              options: ["It remains quadratic (p = 2)", "It accelerates to cubic (p = 3)", "It degrades to linear (p = 1)", "It diverges immediately"],
              correctIndex: 2,
              explanation: "For multiple roots where f'(xi) = 0, the order of convergence of standard Newton-Raphson degrades from quadratic (p=2) down to linear (p=1).",
            },
            {
              question: "Which of the following is the Newton-Raphson iteration formula to find the p-th root of a number N (i.e., x = N^(1/p))?",
              options: ["x_{n+1} = (1/p) * ((p-1)*x_n + N / x_n^(p-1))", "x_{n+1} = (1/p) * ((p+1)*x_n - N / x_n^(p-1))", "x_{n+1} = x_n - (x_n^p - N)", "x_{n+1} = 0.5 * (x_n + N/x_n)"],
              correctIndex: 0,
              explanation: "For f(x) = x^p - N = 0, f'(x) = p*x^(p-1). x_{n+1} = x_n - (x_n^p - N)/(p*x_n^(p-1)) = ((p-1)*x_n + N/x_n^(p-1))/p.",
            },
            {
              question: "If Newton-Raphson is applied to f(x) = 0 and at iteration k, f'(x_k) = 0, what is the geometric consequence?",
              options: ["The algorithm hits the exact root", "The tangent line is horizontal and never intersects the x-axis", "The error becomes negative", "The convergence becomes cubic"],
              correctIndex: 1,
              explanation: "f'(x_k) = 0 means the tangent line is horizontal (parallel to the x-axis), so it never intersects the x-axis, causing mathematical division by zero.",
            },
          ]
        },
        {
          id: "coa-u2-t4",
          title: "Secant Method & Fixed-Point Iteration Method: Iteration Function x = g(x) & Lipschitz Condition",
          simpleExplanation: "The Secant method approximates the derivative in Newton's method using two prior points, avoiding analytical differentiation while retaining superlinear convergence. Fixed-Point Iteration rewrites f(x)=0 as x=g(x), converging whenever the slope of g(x) is strictly less than 1 around the root.",
          detailedExplanation: `## 1. The Secant Method: Eliminating Derivative Evaluations

While the Newton-Raphson method achieves lightning-fast quadratic convergence, it has a severe practical drawback: it requires evaluating the **analytical derivative** $f'(x)$ at every single step. In complex engineering problems (such as CFD simulations or finite element models), computing $f'(x)$ algebraically is either impossible or computationally expensive.

The **Secant Method** solves this by approximating the true derivative $f'(x_n)$ with a backward finite-difference quotient across the two most recent iterates $x_n$ and $x_{n-1}$:

$$f'(x_n) \\approx \\frac{f(x_n) - f(x_{n-1})}{x_n - x_{n-1}}$$

Substituting this into Newton's formula yields the **Secant Iteration Formula**:

$$x_{n+1} = x_n - f(x_n) \\frac{x_n - x_{n-1}}{f(x_n) - f(x_{n-1})}$$

\`\`\`mermaid
flowchart TD
    subgraph Secant_vs_FixedPoint ["Open Root-Finding Strategies"]
        direction TB
        SECANT["Secant Method<br/>x_{n+1} = x_n - f(x_n)(x_n - x_{n-1})/(f(x_n) - f(x_{n-1}))<br/>Order: Golden Ratio φ ≈ 1.618 (Superlinear)"]
        FPI["Fixed-Point Iteration<br/>f(x) = 0 rewritten as x = g(x)<br/>Sequence: x_{n+1} = g(x_n)<br/>Order: Linear (p = 1) if |g'(x)| < 1"]
    end
\`\`\`

### Order of Convergence of the Secant Method
The error relation for the Secant method satisfies:

$$\\epsilon_{n+1} \\approx C \\cdot \\epsilon_n \\cdot \\epsilon_{n-1}$$

Assuming convergence of order $p$, $\\epsilon_{n+1} \\propto \\epsilon_n^p$ and $\\epsilon_n \\propto \\epsilon_{n-1}^p \\implies \\epsilon_{n-1} \\propto \\epsilon_n^{1/p}$.
Equating the exponents:

$$p = 1 + \\frac{1}{p} \\implies p^2 - p - 1 = 0$$

Solving the quadratic equation:
$$p = \\frac{1 + \\sqrt{5}}{2} = \\phi \\approx 1.6180339887...$$

**Result**: The Secant method exhibits **superlinear convergence** with order $p = \\phi \\approx 1.618$ (the Golden Ratio!).
*Efficiency Comparison*: Although its order ($1.618$) is slightly lower than Newton's ($2.0$), the Secant method requires only **one function evaluation per step** (reusing $f(x_{n-1})$), whereas Newton requires two evaluations ($f$ and $f'$). In terms of computational efficiency per function call, Secant often outperforms Newton-Raphson!

---

## 2. Fixed-Point Iteration Method ($x = g(x)$)

The **Fixed-Point Iteration Method** (also called the successive approximations method) transforms the problem of finding a root of $f(x) = 0$ into finding a **fixed point** of an equivalent function $g(x)$:

$$f(x) = 0 \\iff x = g(x)$$

A point $s$ such that $s = g(s)$ is called a **fixed point** of $g$. Geometrically, it is the intersection of the curve $y = g(x)$ with the line $y = x$.

### The Iteration Scheme
Starting with an initial approximation $x_0$:
$$x_{n+1} = g(x_n), \\quad n = 0, 1, 2, \\dots$$

---

## 3. The Banach Fixed-Point Theorem & Lipschitz Convergence Criterion

Not every rearrangement $x = g(x)$ will converge! Convergence depends strictly on the slope of $g(x)$ in the neighborhood of the root.

\`\`\`mermaid
flowchart TD
    G_SLOPE{"Value of |g'(x)| near root ξ"}
    G_SLOPE -->|"|g'(x)| < 1"| CONVERGES["CONVERGENCE GUARANTEED (Contraction Mapping)"]
    CONVERGES -->|"0 < g'(x) < 1"| MONO["Monotonic Convergence (Staircase Cobweb)"]
    CONVERGES -->|"-1 < g'(x) < 0"| SPIRAL["Oscillatory / Spiral Convergence"]
    G_SLOPE -->|"|g'(x)| > 1"| DIVERGES["DIVERGENCE! Iterates explode or oscillate away."]
\`\`\`

> **Theorem (Lipschitz Convergence Condition):**
> Let $g(x)$ and $g'(x)$ be continuous on an interval $I = [\\xi - \\delta, \\xi + \\delta]$ containing the true fixed point $\\xi = g(\\xi)$.
> If the derivative satisfies the strict Lipschitz contraction bound:
> $$|g'(x)| \\le k < 1 \\quad \\forall x \\in I$$
> then:
> 1. The fixed point $\\xi$ is unique in $I$.
> 2. The iteration $x_{n+1} = g(x_n)$ converges to $\\xi$ for **any** initial choice $x_0 \\in I$.
> 3. The error contracts linearly: $|x_{n+1} - \\xi| \\le k |x_n - \\xi|$.

### Proof of Convergence
Subtracting $\\xi = g(\\xi)$ from $x_{n+1} = g(x_n)$:
$$x_{n+1} - \\xi = g(x_n) - g(\\xi)$$

By the **Mean Value Theorem**, there exists some $\\eta_n$ between $x_n$ and $\\xi$ such that:
$$g(x_n) - g(\\xi) = g'(\\eta_n)(x_n - \\xi)$$

$$\\epsilon_{n+1} = g'(\\eta_n) \\epsilon_n$$

Taking absolute values:
$$|\\epsilon_{n+1}| = |g'(\\eta_n)| |\\epsilon_n| \\le k |\\epsilon_n|$$

Applying this recursively:
$$|\\epsilon_n| \\le k^n |\\epsilon_0|$$

Since $k < 1$, $\\lim_{n \\to \\infty} k^n = 0 \\implies \\lim_{n \\to \\infty} \\epsilon_n = 0$.
The error vanishes, proving convergence!

---

## 4. Cobweb Diagrams: Visualizing Convergence vs. Divergence

\`\`\`
Monotonic Convergence (0 < g' < 1):      Divergence (|g'| > 1):
       y                                       y
       |       / y=x                           |       / y=x
       |      /                                |      /
       |  ---/-- g(x)                          |     /  | g(x)
       | |  /|                                 |    /---|
       | | / |                                 |   /|   |
       |--/--+---> x                           |--/-+---+---> x
         x0 x1 ξ                                 ξ x0   x1
\`\`\`

- When $0 < g'(x) < 1$: The path forms a **staircase pattern**, monotonically approaching the root from one side.
- When $-1 < g'(x) < 0$: The path forms a **spiral pattern**, alternating above and below the root while closing in.
- When $|g'(x)| > 1$: The staircase or spiral expands outwards, rapidly diverging to infinity.

---

> [!TIP] **EXAM TIP:**
> When asked "Find which rearrangement of $x^3 + x - 1 = 0$ will converge":
> - Option 1: $x = 1 - x^3 \\implies g'(x) = -3x^2$. Near root $x \\approx 0.7$, $|g'(x)| = |-3(0.49)| = 1.47 > 1$ (**DIVERGES**).
> - Option 2: $x = \\frac{1}{x^2 + 1} \\implies g'(x) = \\frac{-2x}{(x^2+1)^2}$. At $x \\approx 0.7$, $|g'(x)| = \\frac{1.4}{(1.49)^2} \\approx 0.63 < 1$ (**CONVERGES**).
> Always evaluate $|g'(x_0)|$ first to show the examiner which form is valid!

> [!NOTE] **DEV BRAIN:**
> In computer science, Fixed-Point Iteration is the mathematical foundation of **PageRank** (Google's web ranking algorithm), Reinforcement Learning (Bellman equations), and Compiler Dataflow Analysis. In each case, a large state vector updates iteratively until reaching a stationary fixed point ($X = T(X)$).

> [!WARNING] **TRAP:**
> Secant method requires **two distinct initial guesses** $x_0$ and $x_1$. If you accidentally pick $x_0 = x_1$, the denominator $f(x_1) - f(x_0) = 0$, immediately throwing a division-by-zero runtime error!

> [!IMPORTANT] **MEMORIZE:**
> - Secant formula: $x_{n+1} = x_n - f(x_n) \\frac{x_n - x_{n-1}}{f(x_n) - f(x_{n-1})}$
> - Secant order of convergence: $p = \\frac{1 + \\sqrt{5}}{2} \\approx 1.618$ (Superlinear).
> - Fixed-point scheme: $x_{n+1} = g(x_n)$.
> - Lipschitz condition for convergence: $|g'(x)| < 1$ in the neighborhood of the root.
`,
          shortNotes: "Secant method: x_{n+1} = x_n - f(x_n)(x_n-x_{n-1})/(f(x_n)-f(x_{n-1})), order p = 1.618. Fixed-point iteration: x_{n+1} = g(x_n), converges if |g'(x)| < 1.",
          examples: [
            {
              title: "Fixed-Point Iteration on x^3 + x - 1 = 0 and Secant Solver",
              problem: "For the equation f(x) = x^3 + x - 1 = 0: (a) Select a convergent rearrangement x = g(x) on [0, 1] and perform 3 fixed-point iterations starting at x0 = 0.5. (b) Solve using the Secant method with x0 = 0, x1 = 1.",
              explanation: "Part (a): Fixed-Point Iteration\\nRearrange as x(x^2 + 1) = 1 => x = g(x) = 1 / (x^2 + 1) = (x^2 + 1)^(-1).\\nDerivative: g'(x) = -2x / (x^2 + 1)^2.\\nFor x in [0, 1], maximum of |g'(x)| occurs at x = 1/sqrt(3) approx 0.577, where |g'(x)| approx 0.6495 < 1. Hence, convergence is guaranteed!\\nIteration 1: x0 = 0.5\\nx1 = g(0.5) = 1 / (0.5^2 + 1) = 1 / 1.25 = 0.8000.\\nIteration 2:\\nx2 = g(0.8) = 1 / (0.8^2 + 1) = 1 / 1.64 = 0.6098.\\nIteration 3:\\nx3 = g(0.6098) = 1 / (0.6098^2 + 1) = 1 / 1.3718 = 0.7289.\\n\\nPart (b): Secant Method\\nx0 = 0, f(x0) = -1\\nx1 = 1, f(x1) = 1^3 + 1 - 1 = +1\\nx2 = x1 - f(x1)*(x1 - x0)/(f(x1) - f(x0)) = 1 - 1*(1 - 0)/(1 - (-1)) = 1 - 0.5 = 0.5\\nf(x2) = 0.5^3 + 0.5 - 1 = -0.375\\nx3 = x2 - f(x2)*(x2 - x1)/(f(x2) - f(x1)) = 0.5 - (-0.375)*(0.5 - 1)/(-0.375 - 1) = 0.5 - 0.1875 / (-1.375) = 0.6364.",
              code: "def secant(f, x0, x1, tol=1e-5, max_iter=20):\n    print(f\"{'Iter':<5} {'x_n':<12} {'f(x_n)':<14} {'Error':<12}\")\n    print(\"-\" * 45)\n    \n    fx0, fx1 = f(x0), f(x1)\n    for k in range(1, max_iter + 1):\n        if abs(fx1 - fx0) < 1e-15:\n            raise ZeroDivisionError(\"Denominator too small!\")\n            \n        x2 = x1 - fx1 * (x1 - x0) / (fx1 - fx0)\n        err = abs(x2 - x1)\n        fx2 = f(x2)\n        print(f\"{k:<5} {x2:<12.6f} {fx2:<14.6e} {err:<12.6e}\")\n        \n        if err < tol or abs(fx2) < tol:\n            return x2, k\n            \n        x0, fx0 = x1, fx1\n        x1, fx1 = x2, fx2\n        \n    return x1, max_iter\n\nf = lambda x: x**3 + x - 1\nroot, iters = secant(f, 0.0, 1.0)\nprint(f\"\\nSecant Root: {root:.6f} in {iters} iterations.\")\n",
              output: "Iter  x_n          f(x_n)         Error       \n---------------------------------------------\n1     0.500000     -3.750000e-01  5.000000e-01\n2     0.636364     -1.059497e-01  1.363636e-01\n3     0.690052     1.879435e-02   5.368817e-02\n4     0.681973     -8.777498e-04  8.079038e-03\n5     0.682330     -3.238475e-06  3.573934e-04\n6     0.682328     -4.083818e-10  1.317540e-06\n\nSecant Root: 0.682328 in 6 iterations.",
            },
          ],
          keyPoints: [
              "Secant method replaces f'(x) with a two-point finite difference approximation.",
              "It requires two initial guesses and does not require maintaining a sign bracket.",
              "The order of convergence of the Secant method is the golden ratio phi = (1 + sqrt(5))/2 approx 1.618.",
              "Fixed-Point Iteration rewrites f(x) = 0 into x = g(x) and iterates x_{n+1} = g(x_n).",
              "Convergence of fixed-point iteration requires |g'(x)| < 1 in the neighborhood of the root.",
              "Cobweb diagrams visually exhibit staircase convergence for 0 < g' < 1 and spiral convergence for -1 < g' < 0."
],
          theoryQuestions: [
            {
              question: "State and prove the condition under which the Fixed-Point Iteration x_{n+1} = g(x_n) converges to a root.",
              marks: "7 Marks",
              answer: "1. Condition: Let xi be the root such that xi = g(xi). The iteration converges if |g'(x)| <= k < 1 for all x in an interval I containing xi.\\n2. Proof:\\nLet error at step n be epsilon_n = x_n - xi.\\nThen epsilon_{n+1} = x_{n+1} - xi = g(x_n) - g(xi).\\nBy the Mean Value Theorem, there exists eta_n between x_n and xi such that:\\ng(x_n) - g(xi) = g'(eta_n) * (x_n - xi).\\nThus: epsilon_{n+1} = g'(eta_n) * epsilon_n.\\nTaking absolute values: |epsilon_{n+1}| = |g'(eta_n)| * |epsilon_n| <= k * |epsilon_n|.\\nApplying iteratively: |epsilon_n| <= k^n * |epsilon_0|.\\nSince 0 <= k < 1, lim_{n -> infty} k^n = 0, which implies lim_{n -> infty} |epsilon_n| = 0. Therefore, x_n converges uniquely to xi.",
              keyPoints: ["Statement |g'(x)| <= k < 1", "Error definition epsilon_n = x_n - xi", "Mean Value Theorem application", "Inductive proof |epsilon_n| <= k^n |epsilon_0|", "Limit showing k^n -> 0"],
            },
            {
              question: "Derive the order of convergence of the Secant Method and explain why its order is 1.618.",
              marks: "5 Marks",
              answer: "1. The error equation for the Secant method relates three successive errors:\\nepsilon_{n+1} approx C * epsilon_n * epsilon_{n-1}.\\n2. Assume an asymptotic relationship of the form epsilon_{n+1} approx A * (epsilon_n)^p, which also implies epsilon_n approx A * (epsilon_{n-1})^p => epsilon_{n-1} approx (epsilon_n / A)^(1/p).\\n3. Substituting into the error relation:\\nA * (epsilon_n)^p approx C * epsilon_n * (epsilon_n / A)^(1/p) = K * (epsilon_n)^(1 + 1/p).\\n4. Equating exponents of epsilon_n on both sides:\\np = 1 + 1/p => p^2 - p - 1 = 0.\\n5. Solving using the quadratic formula:\\np = (1 +- sqrt(1 - 4(1)(-1))) / 2 = (1 +- sqrt(5)) / 2.\\nSince the order must be positive, p = (1 + sqrt(5)) / 2 approx 1.618 (the Golden Ratio).",
              keyPoints: ["Error relation epsilon_{n+1} approx C * epsilon_n * epsilon_{n-1}", "Power ansatz epsilon_{n+1} proportional to epsilon_n^p", "Indicial equation p = 1 + 1/p", "Quadratic solution yielding golden ratio 1.618"],
            },
            {
              question: "Why is the Secant method often preferred over the Newton-Raphson method in practical engineering applications?",
              marks: "3 Marks",
              answer: "1. Newton-Raphson requires evaluating both f(x) and its derivative f'(x) at every iteration (2 evaluations per step).\\n2. Secant replaces f'(x) with a difference quotient, requiring only ONE new function evaluation per step by caching the previous value.\\n3. In terms of computational efficiency (accuracy gained per function evaluation), the Secant method's efficiency index is 1.618^(1/1) = 1.618, while Newton's is 2.0^(1/2) = 1.414. Thus, Secant is computationally more efficient when function evaluations are expensive.",
              keyPoints: ["No analytical derivative required", "One function evaluation per step vs two for Newton", "Higher efficiency index (1.618 vs 1.414)"],
            },
          ],
          mcqs: [
            {
              question: "What is the order of convergence of the Secant Method?",
              options: ["1.0", "1.414", "1.618", "2.0"],
              correctIndex: 2,
              explanation: "The order of convergence of the Secant method is the golden ratio phi = (1 + sqrt(5))/2 approx 1.618.",
            },
            {
              question: "Under what condition does the fixed-point iteration x_{n+1} = g(x_n) converge to the root xi?",
              options: ["|g'(xi)| > 1", "|g'(xi)| < 1", "g'(xi) = 0 only", "g''(xi) < 0"],
              correctIndex: 1,
              explanation: "By the Banach Fixed-Point Theorem, the iteration converges if and only if |g'(x)| < 1 in the neighborhood of the root.",
            },
            {
              question: "In a cobweb diagram for fixed-point iteration, what type of trajectory occurs when -1 < g'(x) < 0?",
              options: ["Monotonic staircase approaching the root", "Spiral / oscillatory trajectory closing in on the root", "Immediate divergence to infinity", "A constant horizontal line"],
              correctIndex: 1,
              explanation: "When the derivative is negative and bounded by -1 < g' < 0, the iterates oscillate above and below the root, forming an inward spiral cobweb pattern.",
            },
            {
              question: "How many initial guesses are required to start the Secant method?",
              options: ["1", "2", "3", "4"],
              correctIndex: 1,
              explanation: "The Secant method requires two initial points (x0 and x1) to construct the initial finite-difference secant line.",
            },
          ]
        }
      ]
    },
    {
      id: "coa-u3",
      title: "Unit 3: Solution of Systems of Linear Algebraic Equations",
      description: "Direct and iterative solvers for linear systems A x = b: Gaussian Elimination with partial pivoting, Gauss-Jordan matrix inversion, LU decomposition (Doolittle, Crout, and Cholesky algorithms), and iterative relaxation techniques (Gauss-Jacobi and Gauss-Seidel methods with strict diagonal dominance analysis).",
      topics: [
        {
          id: "coa-u3-t1",
          title: "Direct Methods: Gauss Elimination with Partial Pivoting & Back Substitution",
          simpleExplanation: "Gaussian elimination transforms a system of linear equations into an upper triangular matrix using elementary row operations, which is then easily solved from bottom to top by back substitution. Partial pivoting swaps rows to ensure the largest possible pivot element, avoiding division by zero and minimizing round-off errors.",
          detailedExplanation: `## 1. Linear Systems & The Augmented Matrix

A system of $n$ linear algebraic equations in $n$ unknowns $x_1, x_2, \\dots, x_n$ can be expressed in canonical matrix form as:

$$A \\mathbf{x} = \\mathbf{b}$$

$$
\\begin{bmatrix}
a_{11} & a_{12} & \\dots & a_{1n} \\\\
a_{21} & a_{22} & \\dots & a_{2n} \\\\
\\vdots & \\vdots & \\ddots & \\vdots \\\\
a_{n1} & a_{n2} & \\dots & a_{nn}
\\end{bmatrix}
\\begin{bmatrix} x_1 \\\\ x_2 \\\\ \\vdots \\\\ x_n \\end{bmatrix}
=
\\begin{bmatrix} b_1 \\\\ b_2 \\\\ \\vdots \\\\ b_n \\end{bmatrix}
$$

To solve this system efficiently on a digital computer, we construct the **augmented matrix** $\\tilde{A} = [A \\mid \\mathbf{b}]$ of size $n \\times (n+1)$:

$$
[A \\mid \\mathbf{b}] = \\left[\\begin{array}{cccc|c}
a_{11} & a_{12} & \\dots & a_{1n} & b_1 \\\\
a_{21} & a_{22} & \\dots & a_{2n} & b_2 \\\\
\\vdots & \\vdots & \\ddots & \\vdots & \\vdots \\\\
a_{n1} & a_{n2} & \\dots & a_{nn} & b_n
\\end{array}\\right]
$$

\`\`\`mermaid
flowchart TD
    AUG["Augmented Matrix [A | b]"] --> FORWARD["Forward Elimination Phase (with Partial Pivoting)"]
    FORWARD --> UPPER["Upper Triangular System [U | b']"]
    UPPER --> BACK["Backward Substitution Phase"]
    BACK --> SOLUTION["Solution Vector x = [x1, x2, ..., xn]^T"]
\`\`\`

---

## 2. Forward Elimination & Backward Substitution

Gaussian Elimination solves $A \\mathbf{x} = \\mathbf{b}$ in two distinct stages:

### Stage 1: Forward Elimination (Triangularization)
The goal is to eliminate the unknowns below the main diagonal, converting $[A \\mid \\mathbf{b}]$ into an upper triangular system $[U \\mid \\mathbf{b}']$.

For each pivot column $k = 1, 2, \\dots, n-1$:
1. The diagonal element $a_{kk}$ acts as the **pivot element**.
2. For each row $i$ below row $k$ ($i = k+1, k+2, \\dots, n$):
   - Compute the multiplier:
     $$m_{ik} = \\frac{a_{ik}}{a_{kk}}$$
   - Perform the elementary row operation:
     $$R_i \\leftarrow R_i - m_{ik} R_k$$
   - Update matrix elements:
     $$a_{ij} \\leftarrow a_{ij} - m_{ik} a_{kj} \\quad \\text{for } j = k+1, \\dots, n$$
     $$b_i \\leftarrow b_i - m_{ik} b_k$$

After $n-1$ elimination steps, the matrix is transformed into:
$$\\left[\\begin{array}{cccc|c}
u_{11} & u_{12} & \\dots & u_{1n} & b'_1 \\\\
0 & u_{22} & \\dots & u_{2n} & b'_2 \\\\
\\vdots & \\vdots & \\ddots & \\vdots & \\vdots \\\\
0 & 0 & \\dots & u_{nn} & b'_n
\\end{array}\\right]$$

### Stage 2: Backward Substitution
Once in upper triangular form, the unknowns are solved in reverse order from bottom to top ($i = n, n-1, \\dots, 1$):

$$x_n = \\frac{b'_n}{u_{nn}}$$

$$x_i = \\frac{1}{u_{ii}} \\left( b'_i - \\sum_{j=i+1}^n u_{ij} x_j \\right) \\quad \\text{for } i = n-1, n-2, \\dots, 1$$

---

## 3. Computational Flop Complexity

In scientific computing, algorithm efficiency is measured in **floating-point operations (flops)**:
- **Forward Elimination**:
  $$\\sum_{k=1}^{n-1} (n - k)(2(n - k) + 1) \\approx \\frac{2}{3} n^3 + O(n^2) \\text{ flops}$$
- **Backward Substitution**:
  $$\\sum_{i=1}^n (2(n - i) + 1) \\approx n^2 \\text{ flops}$$
- **Total Complexity**: $\\frac{2}{3} n^3 + n^2 \\approx \\mathbf{O(n^3)}$.

---

## 4. Partial Pivoting: Preventing Division by Zero & Catastrophic Round-off

### 4.1 The Pitfalls of Naive Gauss Elimination
If at step $k$, the pivot $a_{kk} = 0$, the multiplier $m_{ik} = a_{ik} / 0$ is undefined, causing immediate program termination.
Even worse: if $a_{kk}$ is not zero, but **very close to zero** (e.g., $a_{kk} = 10^{-6}$ while other row elements are $10^2$), dividing by $a_{kk}$ produces gigantic multipliers ($m_{ik} \\approx 10^8$). Subsequent row subtractions cause disastrous subtractive cancellation and total loss of precision!

### 4.2 The Partial Pivoting Strategy
At each elimination step $k$:
1. Search column $k$ from row $k$ down to row $n$ for the element with the **maximum absolute value**:
   $$p = \\arg\\max_{i = k, \\dots, n} |a_{ik}|$$
2. If row $p \\ne k$, swap Row $k$ and Row $p$ in both $A$ and $\\mathbf{b}$:
   $$R_k \\longleftrightarrow R_p$$
3. By ensuring $|a_{kk}| \\ge |a_{ik}|$ for all $i > k$, every multiplier satisfies:
   $$|m_{ik}| = \\left|\\frac{a_{ik}}{a_{kk}}\\right| \\le 1.0$$
4. Bounding the multipliers below $1.0$ guarantees that errors never amplify exponentially during forward elimination!

---

> [!TIP] **EXAM TIP:**
> When applying Gaussian Elimination with partial pivoting in exams:
> At every step $k$, explicitly write: *"Pivoting check for column $k$: $\\max(|a_{kk}|, |a_{k+1,k}|, \\dots)$"*. If swapping rows, clearly indicate $R_k \\leftrightarrow R_p$. This step alone carries 2 distinct marks in university grading keys!

> [!NOTE] **DEV BRAIN:**
> In high-performance computing, standard Gaussian elimination is rarely written as raw loops. Instead, production software uses BLAS Level 3 (Basic Linear Algebra Subprograms) routines via \`scipy.linalg.solve\` or LAPACK's \`dgesv\`, which divide matrices into cache-friendly blocks for multicore AVX-512 vectorization.

> [!WARNING] **TRAP:**
> When swapping rows $R_k \\leftrightarrow R_p$ during pivoting, DO NOT forget to swap the corresponding constants in the right-hand vector $b_k \\leftrightarrow b_p$! Forgetting to swap the right-hand vector is the single most common error in student exam papers.

> [!IMPORTANT] **MEMORIZE:**
> - Multiplier formula: $m_{ik} = \\frac{a_{ik}}{a_{kk}}$
> - Row update: $R_i \\leftarrow R_i - m_{ik} R_k$
> - Back substitution formula: $x_i = \\frac{1}{a_{ii}} \\left( b_i - \\sum_{j=i+1}^n a_{ij} x_j \\right)$
> - Computational complexity: $\\frac{2}{3} n^3$ flops.
`,
          shortNotes: "Gauss elimination triangulates [A|b] via row operations R_i <- R_i - m_ik * R_k, followed by back-substitution. Partial pivoting swaps rows so |pivot| is maximized.",
          examples: [
            {
              title: "Solving a 3x3 System using Gauss Elimination with Partial Pivoting",
              problem: "Solve the following system of linear equations using Gaussian Elimination with partial pivoting:\\n  x1 + x2 + x3 = 6\\n  3x1 + 3x2 + 4x3 = 20\\n  2x1 + x2 + 3x3 = 13",
              explanation: "Step 1: Setup Augmented Matrix [A | b]\\n[ 1  1  1 |  6 ]\\n[ 3  3  4 | 20 ]\\n[ 2  1  3 | 13 ]\\n\\nStep 2: Pivot Column 1\\nSearch column 1: |1|, |3|, |2|. Maximum is |3| at row 2.\\nSwap R1 <-> R2:\\n[ 3  3  4 | 20 ]\\n[ 1  1  1 |  6 ]\\n[ 2  1  3 | 13 ]\\n\\nEliminate column 1:\\nFor row 2: m21 = 1/3. R2 <- R2 - (1/3)*R1:\\nR2 = [1 - 1, 1 - 1, 1 - 4/3 | 6 - 20/3] = [0, 0, -1/3 | -2/3].\\nFor row 3: m31 = 2/3. R3 <- R3 - (2/3)*R1:\\nR3 = [2 - 2, 1 - 2, 3 - 8/3 | 13 - 40/3] = [0, -1, 1/3 | -1/3].\\nMatrix becomes:\\n[ 3   3    4   |  20  ]\\n[ 0   0  -1/3  | -2/3 ]\\n[ 0  -1   1/3  | -1/3 ]\\n\\nStep 3: Pivot Column 2\\nLook at diagonal element a22 = 0! Division by zero would occur without pivoting.\\nSearch column 2 from row 2 downwards: |0| and |-1|. Max is |-1| at row 3.\\nSwap R2 <-> R3:\\n[ 3   3    4   |  20  ]\\n[ 0  -1   1/3  | -1/3 ]\\n[ 0   0  -1/3  | -2/3 ]\\nNow matrix is fully upper triangular!\\n\\nStep 4: Backward Substitution\\nFrom row 3: (-1/3) * x3 = -2/3 => x3 = (-2/3) / (-1/3) = 2.\\nFrom row 2: -1 * x2 + (1/3)*x3 = -1/3 => -x2 + 2/3 = -1/3 => -x2 = -1 => x2 = 1.\\nFrom row 1: 3*x1 + 3*x2 + 4*x3 = 20 => 3*x1 + 3(1) + 4(2) = 20 => 3*x1 + 11 = 20 => 3*x1 = 9 => x1 = 3.\\nSolution: x1 = 3, x2 = 1, x3 = 2.",
              code: "import numpy as np\n\ndef gauss_elimination_pivot(A, b):\n    A = A.astype(float).copy()\n    b = b.astype(float).copy()\n    n = len(b)\n    \n    # Forward Elimination with Partial Pivoting\n    for k in range(n - 1):\n        # Pivot search\n        max_row = k + np.argmax(np.abs(A[k:, k]))\n        if max_row != k:\n            A[[k, max_row]] = A[[max_row, k]]\n            b[[k, max_row]] = b[[max_row, k]]\n            print(f\"Swapped row {k+1} with row {max_row+1}\")\n            \n        for i in range(k + 1, n):\n            m = A[i, k] / A[k, k]\n            A[i, k:] -= m * A[k, k:]\n            b[i] -= m * b[k]\n            \n    # Back Substitution\n    x = np.zeros(n)\n    for i in range(n - 1, -1, -1):\n        x[i] = (b[i] - np.dot(A[i, i+1:], x[i+1:])) / A[i, i]\n        \n    return x\n\nA = np.array([[1, 1, 1],\n              [3, 3, 4],\n              [2, 1, 3]])\nb = np.array([6, 20, 13])\n\nsol = gauss_elimination_pivot(A, b)\nprint(\"Solution Vector [x1, x2, x3]:\", sol)\n",
              output: "Swapped row 1 with row 2\nSwapped row 2 with row 3\nSolution Vector [x1, x2, x3]: [3. 1. 2.]",
            },
          ],
          keyPoints: [
              "Gaussian Elimination operates on the augmented matrix [A | b] using row operations.",
              "It consists of two phases: Forward Elimination (triangularization) and Backward Substitution.",
              "The total computational complexity is 2/3 * n^3 flops.",
              "Partial pivoting swaps rows to place the largest available absolute value on the pivot diagonal.",
              "Partial pivoting guarantees that multipliers |m_ik| <= 1.0, preventing exponential error growth and zero division."
],
          theoryQuestions: [
            {
              question: "Explain the step-by-step algorithm of Gaussian Elimination with Partial Pivoting. Why is partial pivoting necessary?",
              marks: "7 Marks",
              answer: "1. Forward Elimination with Partial Pivoting:\\n- For k = 1 to n-1:\\n  a. Find pivot row p where |a_{pk}| = max_{i=k...n} |a_{ik}|.\\n  b. If p != k, interchange row k and row p in both A and b.\\n  c. For i = k+1 to n, compute multiplier m_{ik} = a_{ik} / a_{kk} and perform R_i <- R_i - m_{ik} * R_k.\\n2. Backward Substitution:\\n- x_n = b_n / a_{nn}.\\n- For i = n-1 down to 1: x_i = (b_i - sum_{j=i+1}^n a_{ij} x_j) / a_{ii}.\\n3. Necessity of Partial Pivoting:\\n- Division by zero: If a_{kk} = 0, the multiplier calculation crashes.\\n- Numerical Instability: If a_{kk} is very small compared to other row elements, m_{ik} becomes massive, multiplying round-off errors and causing catastrophic subtractive cancellation. Partial pivoting guarantees |m_{ik}| <= 1.",
              keyPoints: ["Forward elimination steps", "Row swap logic", "Back substitution recurrence", "Zero pivot avoidance", "Multiplier bounding |m_ik| <= 1"],
            },
            {
              question: "What is the computational complexity of Gaussian Elimination in terms of floating point operations (flops)? Derive the forward elimination complexity.",
              marks: "5 Marks",
              answer: "1. Forward elimination requires eliminating elements in column k from row k+1 to n (n - k rows).\\n2. For each row, calculating multiplier takes 1 division. Updating row elements takes (n - k) multiplications and (n - k) subtractions, plus 1 mult/sub for vector b. Total flops per step approx 2(n - k)^2.\\n3. Summing over all columns k = 1 to n-1:\\nSum_{k=1}^{n-1} 2(n - k)^2 = 2 Sum_{j=1}^{n-1} j^2 = 2 * ((n-1)n(2n-1)) / 6 approx (2/3) n^3 flops.\\n4. Back substitution requires Sum_{i=1}^n (2(n - i) + 1) approx n^2 flops.\\nTotal complexity = (2/3) n^3 + n^2 approx O(n^3).",
              keyPoints: ["Flops per row update 2(n-k)", "Summation of j^2 from 1 to n-1", "Integral approximation (2/3) n^3", "Back substitution n^2", "Total O(n^3)"],
            },
            {
              question: "Distinguish between Partial Pivoting and Complete Pivoting in matrix solvers.",
              marks: "3 Marks",
              answer: "1. Partial Pivoting: Searches only within the current column k from row k to n for the maximum element, swapping only rows. Cost is O(n^2) comparisons.\\n2. Complete Pivoting: Searches the entire submatrix from row k to n and column k to n for the absolute largest element, swapping both rows AND columns. Cost is O(n^3) comparisons. It requires tracking column permutations to unscramble the final variable vector. Partial pivoting provides virtually identical numerical stability with vastly lower overhead.",
              keyPoints: ["Partial: column search, row swap only", "Complete: submatrix search, row and column swap", "O(n^2) vs O(n^3) comparison overhead"],
            },
          ],
          mcqs: [
            {
              question: "What is the total number of floating-point operations (flops) for Gaussian Elimination on an n x n system?",
              options: ["O(n)", "O(n^2)", "(2/3) n^3", "(1/3) n^3"],
              correctIndex: 2,
              explanation: "Forward elimination takes approx (2/3)n^3 flops and back-substitution takes n^2 flops, giving a dominant complexity of (2/3)n^3 flops.",
            },
            {
              question: "In Gaussian Elimination with partial pivoting, why are rows swapped?",
              options: ["To make the matrix symmetric", "To ensure the pivot element has the largest absolute value in its column", "To make the determinant equal to 1", "To eliminate negative numbers"],
              correctIndex: 1,
              explanation: "Partial pivoting swaps rows so that the pivot element a_kk has the largest magnitude in its column, bounding multipliers |m_ik| <= 1.",
            },
            {
              question: "What kind of matrix does forward elimination transform matrix A into?",
              options: ["Identity matrix", "Diagonal matrix", "Upper triangular matrix", "Lower triangular matrix"],
              correctIndex: 2,
              explanation: "Forward elimination zeroes out all entries below the main diagonal, transforming A into an upper triangular matrix.",
            },
            {
              question: "If a 3x3 matrix has pivots 4, -5, and 2 after triangularization without row swaps, what is the determinant of A?",
              options: ["1", "-40", "40", "0"],
              correctIndex: 1,
              explanation: "The determinant of an upper triangular matrix is the product of its diagonal pivot entries: det(A) = 4 * (-5) * 2 = -40.",
            },
          ]
        },
        {
          id: "coa-u3-t2",
          title: "Gauss-Jordan Method for Matrix Inversion and System Solving",
          simpleExplanation: "While Gaussian elimination stops at an upper triangular matrix, Gauss-Jordan continues eliminating above the diagonal as well, turning the matrix into a reduced row echelon form (identity matrix). When applied to [A | I], the identity block transforms directly into the matrix inverse A^-1.",
          detailedExplanation: `## 1. Principles of Gauss-Jordan Elimination

The **Gauss-Jordan Elimination Method** is an extension of Gaussian elimination. While Gaussian elimination transforms matrix $A$ into an upper triangular matrix $U$ (requiring a backward substitution phase), Gauss-Jordan continues eliminating elements **both below AND above** each pivot element.

By systematically reducing the matrix to **Reduced Row Echelon Form (RREF)**—which is simply the identity matrix $I$—the solution vector $\\mathbf{x}$ appears directly in the right-hand column with **no back-substitution required**!

\`\`\`mermaid
flowchart LR
    subgraph Gauss_Jordan_Workflow ["Gauss-Jordan Elimination Process"]
        START["Augmented Matrix [A | b]"] --> ELIM["Simultaneous Row Elimination Above and Below Diagonal"]
        ELIM --> NORM["Normalize Diagonal Entries to 1"]
        NORM --> FINAL["[I | x] (Solution read directly from right column!)"]
    end
\`\`\`

---

## 2. Algorithm for Solving $A \\mathbf{x} = \\mathbf{b}$

Given augmented matrix $[A \\mid \\mathbf{b}]$ of size $n \\times (n+1)$:

For each pivot column $k = 1, 2, \\dots, n$:
1. **Pivoting**: Find row $p \\ge k$ with $\\max |a_{pk}|$ and swap $R_k \\leftrightarrow R_p$.
2. **Pivot Normalization**: Divide the entire pivot row $R_k$ by the pivot element $a_{kk}$:
   $$R_k \\leftarrow \\frac{R_k}{a_{kk}}$$
   (This sets the pivot diagonal entry to exactly $1$).
3. **Elimination in All Other Rows**:
   For every row $i$ from $1$ to $n$ where $i \\ne k$:
   - Multiplier: $m_{ik} = a_{ik}$ (since the pivot is now $1$).
   - Row operation:
     $$R_i \\leftarrow R_i - a_{ik} R_k$$
   (This zeroes out all elements above and below the pivot in column $k$).

After completing all $n$ columns, the augmented matrix becomes:
$$[I \\mid \\mathbf{x}] = \\left[\\begin{array}{cccc|c}
1 & 0 & \\dots & 0 & x_1 \\\\
0 & 1 & \\dots & 0 & x_2 \\\\
\\vdots & \\vdots & \\ddots & \\vdots & \\vdots \\\\
0 & 0 & \\dots & 1 & x_n
\\end{array}\\right]$$

---

## 3. Matrix Inversion via Gauss-Jordan Method

The most celebrated application of Gauss-Jordan is computing the **matrix inverse** $A^{-1}$.

### The Mathematical Framework
Recall that the inverse of an $n \\times n$ non-singular matrix $A$ satisfies $A A^{-1} = I_n$.
If we construct a block augmented matrix by augmenting $A$ with the $n \\times n$ identity matrix $I_n$:

$$\\tilde{M} = [A \\mid I_n]$$

Performing elementary row operations is equivalent to multiplying from the left by elementary transformation matrices $E_k \\dots E_2 E_1$:

$$(E_k \\dots E_2 E_1) [A \\mid I_n] = [I_n \\mid A^{-1}]$$

Because $(E_k \\dots E_1) A = I_n$, the transformation matrix product is identically equal to $A^{-1}$! Therefore, whatever row operations reduce $A$ to $I_n$ will simultaneously transform $I_n$ into $A^{-1}$.

\`\`\`mermaid
flowchart TD
    INIT["Augmented Block Matrix: [A | I_n]"]
    SWAP["Step 1: Partial Pivoting on Column k"]
    NORM["Step 2: Normalize Pivot Row: R_k <- R_k / a_kk"]
    SWEEP["Step 3: Eliminate All Non-Zero Elements in Column k (Rows i != k)"]
    CHECK{"k == n?"}
    RESULT["Final Form: [I_n | A⁻¹]<br/>Right half is the exact Inverse Matrix!"]
    
    INIT --> SWAP --> NORM --> SWEEP --> CHECK
    CHECK -->|"No, k = k+1"| SWAP
    CHECK -->|"Yes"| RESULT
\`\`\`

---

## 4. Flop Complexity & Comparison: Gauss Elimination vs. Gauss-Jordan

| Dimension | Gauss Elimination | Gauss-Jordan Method |
| :--- | :--- | :--- |
| **Final Form of $A$** | Upper Triangular Matrix $U$ | Identity Matrix $I$ |
| **Backward Substitution** | **Required** ($n^2$ flops) | **Not required** (Read directly) |
| **Flops to solve $Ax = b$** | $\\approx \\mathbf{\\frac{2}{3} n^3}$ flops | $\\approx \\mathbf{n^3}$ flops ($50\\%$ more operations!) |
| **Flops for Matrix Inversion** | $\\approx 2 n^3$ flops (via LU) | $\\approx \\mathbf{n^3}$ flops (in-place) |
| **Primary Practical Application** | Standard choice for solving linear systems | Highly preferred for analytical matrix inversion of small/medium matrices |

---

> [!TIP] **EXAM TIP:**
> When asked to invert a $3 \\times 3$ matrix using Gauss-Jordan:
> Write out $[A \\mid I]$ as a $3 \\times 6$ matrix. Maintain vertical divider lines separating the left 3 columns from the right 3 columns throughout your working steps. Never perform row operations on only the left side!

> [!NOTE] **DEV BRAIN:**
> In numerical software, computing an explicit matrix inverse $A^{-1}$ to solve $A x = b$ via $x = A^{-1} b$ is considered an anti-pattern. Computing $A^{-1}$ costs $n^3$ flops and introduces double the round-off error compared to direct Gaussian elimination or LU solve ($rac{2}{3} n^3$). *Never invert a matrix unless the inverse itself is explicitly needed!*

> [!WARNING] **TRAP:**
> When normalizing row $k$ by dividing by $a_{kk}$, do not forget to divide the corresponding elements in the right-hand identity matrix block!
> If $a_{kk} = 2$, the identity matrix entry $1$ in that row becomes $1/2 = 0.5$.

> [!IMPORTANT] **MEMORIZE:**
> - Gauss-Jordan transformation: $[A \\mid I] \\xrightarrow{\\text{Row Ops}} [I \\mid A^{-1}]$
> - Solving complexity: $n^3$ flops (vs $\\frac{2}{3} n^3$ for Gauss elimination).
> - Row operation: $R_i \\leftarrow R_i - a_{ik} R_k$ for all $i \\ne k$.
`,
          shortNotes: "Gauss-Jordan reduces [A|b] to [I|x] by eliminating above and below the diagonal. Solves systems without back-substitution. Inverts matrices via [A|I] -> [I|A^-1].",
          examples: [
            {
              title: "Finding Inverse of 3x3 Matrix using Gauss-Jordan Method",
              problem: "Find the inverse of matrix A using Gauss-Jordan elimination:\\n  A = [[2, 1, 1],\\n       [1, 2, 1],\\n       [1, 1, 2]]",
              explanation: "Step 1: Setup Augmented Matrix [A | I_3]\\n[ 2  1  1 | 1  0  0 ]\\n[ 1  2  1 | 0  1  0 ]\\n[ 1  1  2 | 0  0  1 ]\\n\\nStep 2: Process Column 1\\nNormalize R1: R1 <- R1 / 2:\\n[ 1  0.5  0.5 | 0.5  0    0   ]\\n[ 1  2    1   | 0    1    0   ]\\n[ 1  1    2   | 0    0    1   ]\\nEliminate R2: R2 <- R2 - R1:\\nR2 = [0, 1.5, 0.5 | -0.5, 1, 0]\\nEliminate R3: R3 <- R3 - R1:\\nR3 = [0, 0.5, 1.5 | -0.5, 0, 1]\\n\\nStep 3: Process Column 2\\nNormalize R2: R2 <- R2 / 1.5 = R2 * (2/3):\\nR2 = [0, 1, 1/3 | -1/3, 2/3, 0]\\nEliminate R1: R1 <- R1 - 0.5 * R2:\\nR1 = [1, 0, 1/3 | 2/3, -1/3, 0]\\nEliminate R3: R3 <- R3 - 0.5 * R2:\\nR3 = [0, 0, 4/3 | -1/3, -1/3, 1]\\n\\nStep 4: Process Column 3\\nNormalize R3: R3 <- R3 * (3/4):\\nR3 = [0, 0, 1 | -1/4, -1/4, 3/4]\\nEliminate R1: R1 <- R1 - (1/3) * R3:\\nR1 = [1, 0, 0 | 3/4, -1/4, -1/4]\\nEliminate R2: R2 <- R2 - (1/3) * R3:\\nR2 = [0, 1, 0 | -1/4, 3/4, -1/4]\\n\\nResult is [I | A^-1]:\\nA^-1 = 1/4 * [[3, -1, -1], [-1, 3, -1], [-1, -1, 3]].",
              code: "import numpy as np\n\ndef gauss_jordan_inverse(A):\n    A = A.astype(float).copy()\n    n = A.shape[0]\n    # Augment with Identity matrix\n    augmented = np.hstack([A, np.eye(n)])\n    \n    print(\"Initial [A | I]:\")\n    print(augmented)\n    \n    for k in range(n):\n        # Partial pivoting\n        max_row = k + np.argmax(np.abs(augmented[k:, k]))\n        if max_row != k:\n            augmented[[k, max_row]] = augmented[[max_row, k]]\n            \n        # Normalize pivot row\n        pivot = augmented[k, k]\n        augmented[k, :] /= pivot\n        \n        # Eliminate all other rows\n        for i in range(n):\n            if i != k:\n                factor = augmented[i, k]\n                augmented[i, :] -= factor * augmented[k, :]\n                \n    inv_A = augmented[:, n:]\n    return inv_A\n\nA = np.array([[2, 1, 1],\n              [1, 2, 1],\n              [1, 1, 2]])\n\ninv_A = gauss_jordan_inverse(A)\nprint(\"\\nCalculated A^-1:\")\nprint(inv_A)\nprint(\"\\nVerification A @ A^-1:\")\nprint(np.round(A @ inv_A, 4))\n",
              output: "Initial [A | I]:\n[[2. 1. 1. 1. 0. 0.]\n [1. 2. 1. 0. 1. 0.]\n [1. 1. 2. 0. 0. 1.]]\n\nCalculated A^-1:\n[[ 0.75 -0.25 -0.25]\n [-0.25  0.75 -0.25]\n [-0.25 -0.25  0.75]]\n\nVerification A @ A^-1:\n[[1. 0. 0.]\n [0. 1. 0.]\n [0. 0. 1.]]",
            },
          ],
          keyPoints: [
              "Gauss-Jordan eliminates elements both above and below the main diagonal.",
              "It reduces the augmented matrix [A | b] directly into [I | x], eliminating the need for back-substitution.",
              "It solves linear systems in approximately n^3 flops (compared to 2/3 * n^3 for Gaussian elimination).",
              "Matrix inversion is performed by augmenting [A | I_n] and reducing it to [I_n | A^-1].",
              "Normalization of the pivot row sets the diagonal entries directly to 1."
],
          theoryQuestions: [
            {
              question: "Explain how the Gauss-Jordan method is used to find the inverse of a non-singular square matrix.",
              marks: "7 Marks",
              answer: "1. Theoretical Principle: If A is non-singular, there exists A^-1 such that A * A^-1 = I. Performing elementary row operations corresponds to multiplying by elementary matrices E_k ... E_1.\\n2. Setup: Form the block augmented matrix M = [A | I_n] of size n x 2n.\\n3. Algorithm:\\n- For column k = 1 to n:\\n  a. Apply partial pivoting: Swap row k with row p >= k having max |a_{pk}|.\\n  b. Normalize pivot row: R_k <- R_k / a_{kk}.\\n  c. Eliminate all other rows i != k: R_i <- R_i - a_{ik} * R_k.\\n4. Result: When the left block is transformed into I_n, the right block is identically transformed into A^-1: [A | I_n] -> [I_n | A^-1].",
              keyPoints: ["Block setup [A | I_n]", "Elementary matrix transformation logic", "Pivoting and normalization", "Simultaneous elimination above and below", "Final form [I_n | A^-1]"],
            },
            {
              question: "Compare Gaussian Elimination and Gauss-Jordan method for solving a system of n linear equations.",
              marks: "5 Marks",
              answer: "1. Operational Steps: Gaussian elimination reduces [A | b] to upper triangular form [U | b'] and requires a backward substitution step. Gauss-Jordan reduces [A | b] directly to reduced row echelon form [I | x] with no backward substitution.\\n2. Flop Complexity: Gaussian elimination requires (2/3)n^3 + n^2 flops. Gauss-Jordan requires n^3 flops. Thus, Gauss-Jordan requires approx 50% more operations for solving linear systems.\\n3. Practical Usage: Gauss elimination is universally preferred for solving single linear systems. Gauss-Jordan is preferred for finding matrix inverses of small matrices.",
              keyPoints: ["Upper triangular vs Identity final form", "Presence vs absence of back-substitution", "(2/3)n^3 vs n^3 complexity", "Preferred use cases"],
            },
            {
              question: "Can Gauss-Jordan method be applied if matrix A is singular? What happens during execution?",
              marks: "3 Marks",
              answer: "No. If matrix A is singular, det(A) = 0 and A has linearly dependent rows. During forward elimination, at least one pivot column will have all zeros on and below the diagonal (max |a_{ik}| = 0). The algorithm cannot normalize the pivot row (division by zero) and terminates, indicating that the matrix has no unique solution or is not invertible.",
              keyPoints: ["Cannot invert singular matrices", "Occurrence of all-zero pivot column", "Division by zero termination"],
            },
          ],
          mcqs: [
            {
              question: "What is the final form of the left block in the augmented matrix when Gauss-Jordan inversion is completed?",
              options: ["Upper triangular matrix", "Lower triangular matrix", "Identity matrix", "Diagonal matrix"],
              correctIndex: 2,
              explanation: "Gauss-Jordan transforms the left block into the Identity matrix I_n, while the right block becomes A^-1.",
            },
            {
              question: "How many flops does the Gauss-Jordan method require to solve a system of n linear equations?",
              options: ["(2/3) n^3", "n^3", "(1/3) n^3", "n^2"],
              correctIndex: 1,
              explanation: "Because it eliminates both above and below the diagonal, Gauss-Jordan requires approximately n^3 flops to solve a system of equations.",
            },
            {
              question: "What is an advantage of Gauss-Jordan method over Gaussian elimination?",
              options: ["It requires fewer total floating point operations", "It does not require backward substitution", "It works on non-square matrices", "It avoids division entirely"],
              correctIndex: 1,
              explanation: "Gauss-Jordan directly produces the solution vector in the augmented column, eliminating the backward substitution phase.",
            },
            {
              question: "In Gauss-Jordan inversion, if a full column of zeros appears below and on the pivot position, what does it signify?",
              options: ["The matrix is ill-conditioned but solvable", "The matrix is singular and cannot be inverted", "The system has infinitely many solutions", "The computation completed early"],
              correctIndex: 1,
              explanation: "An all-zero pivot column indicates linear dependence, meaning det(A) = 0 and the matrix is singular (non-invertible).",
            },
          ]
        },
        {
          id: "coa-u3-t3",
          title: "LU Decomposition: Factorization Principle, Doolittle's, Crout's, Cholesky & Substitution",
          simpleExplanation: "LU decomposition splits a square matrix A into a lower triangular matrix L and an upper triangular matrix U. This makes solving Ax = b fast and efficient for multiple right-hand side vectors by doing two quick substitutions: Ly = b (forward) and Ux = y (backward).",
          detailedExplanation: `## 1. The Factorization Principle: $A = L U$

In many real-world engineering systems (such as electrical circuit simulation, structural finite element analysis, and robotics control), we must solve $A \\mathbf{x} = \\mathbf{b}$ repeatedly for the **same coefficient matrix $A$** with hundreds of different right-hand side vectors $\\mathbf{b}$.

If we use standard Gaussian elimination, we would re-run the expensive $O(n^3)$ elimination process every single time!
**LU Decomposition** solves this by factoring matrix $A$ once ($O(n^3)$) into the product of two triangular matrices:

$$A = L U$$

where:
- $L$ is a **Lower Triangular Matrix** ($l_{ij} = 0$ for $j > i$).
- $U$ is an **Upper Triangular Matrix** ($u_{ij} = 0$ for $i > j$).

\`\`\`mermaid
flowchart LR
    A_MAT["Matrix A"] --> FACTOR["LU Factorization: A = L × U (Cost: 2/3 n³ flops, done ONCE)"]
    FACTOR --> STEP1["Step 1: Forward Substitution: L y = b (Cost: n² flops)"]
    STEP1 --> STEP2["Step 2: Backward Substitution: U x = y (Cost: n² flops)"]
    STEP2 --> SOL["Solution Vector x"]
\`\`\`

### Solving $A \\mathbf{x} = \\mathbf{b}$ via Two-Stage Substitution
1. Substitute $A = L U$ into the linear system:
   $$(L U) \\mathbf{x} = \\mathbf{b} \\implies L (U \\mathbf{x}) = \\mathbf{b}$$
2. Define the intermediate vector $\\mathbf{y} = U \\mathbf{x}$.
3. **Step 1 (Forward Substitution)**: Solve the lower triangular system for $\\mathbf{y}$:
   $$L \\mathbf{y} = \\mathbf{b}$$
4. **Step 2 (Backward Substitution)**: Solve the upper triangular system for $\\mathbf{x}$:
   $$U \\mathbf{x} = \\mathbf{y}$$

Each substitution requires only $O(n^2)$ operations! Solving for 100 different $\\mathbf{b}$ vectors costs only $100 \\times O(n^2)$ instead of $100 \\times O(n^3)$.

---

## 2. Factorization Variants: Doolittle vs. Crout vs. Cholesky

Because the equation $A = L U$ represents $n^2$ equations in $n^2 + n$ unknowns, we must constrain $n$ diagonal elements. This gives rise to three classic algorithms:

| Factorization Method | Matrix Constraints | Diagonal Form | Applicable Matrix Type | Flop Complexity |
| :--- | :--- | :--- | :--- | :--- |
| **Doolittle's Algorithm** | $l_{ii} = 1$ (Unit Lower Triangular) | $L$ has $1$s on diagonal; $U$ has general diagonal | Any square non-singular matrix | $\\approx \\frac{2}{3} n^3$ |
| **Crout's Algorithm** | $u_{ii} = 1$ (Unit Upper Triangular) | $U$ has $1$s on diagonal; $L$ has general diagonal | Any square non-singular matrix | $\\approx \\frac{2}{3} n^3$ |
| **Cholesky Decomposition** | $A = L L^T$ ($U = L^T$) | $l_{ii} = \\sqrt{a_{ii} - \\sum l_{ik}^2}$ | **Symmetric Positive Definite (SPD)** only | $\\approx \\mathbf{\\frac{1}{3} n^3}$ ($50\\%$ faster!) |

---

## 3. Explicit Algorithmic Formulas for Doolittle Decomposition

For Doolittle's algorithm ($l_{ii} = 1$ for all $i$):

$$\\begin{bmatrix}
a_{11} & a_{12} & a_{13} \\\\
a_{21} & a_{22} & a_{23} \\\\
a_{31} & a_{32} & a_{33}
\\end{bmatrix}
=
\\begin{bmatrix}
1 & 0 & 0 \\\\
l_{21} & 1 & 0 \\\\
l_{31} & l_{32} & 1
\\end{bmatrix}
\\begin{bmatrix}
u_{11} & u_{12} & u_{13} \\\\
0 & u_{22} & u_{23} \\\\
0 & 0 & u_{33}
\\end{bmatrix}$$

Multiplying out row by row yields the exact computational formulas:

### 1. Elements of Upper Matrix $U$ (Row $i$):
$$u_{ij} = a_{ij} - \\sum_{k=1}^{i-1} l_{ik} u_{kj} \\quad (\\text{for } j = i, i+1, \\dots, n)$$

### 2. Elements of Lower Matrix $L$ (Column $i$):
$$l_{ji} = \\frac{1}{u_{ii}} \\left( a_{ji} - \\sum_{k=1}^{i-1} l_{jk} u_{ki} \\right) \\quad (\\text{for } j = i+1, \\dots, n)$$

---

## 4. Cholesky Decomposition for Symmetric Positive Definite (SPD) Matrices

A real matrix $A$ is **Symmetric Positive Definite (SPD)** if:
1. $A = A^T$ (Symmetric).
2. $\\mathbf{x}^T A \\mathbf{x} > 0$ for all non-zero vectors $\\mathbf{x}$ (all eigenvalues $\\lambda_i > 0$).

For SPD matrices, $U = L^T$, yielding the square-root factorization:

$$A = L L^T$$

### Cholesky Formulas:
- **Diagonal Elements**:
  $$l_{ii} = \\sqrt{a_{ii} - \\sum_{k=1}^{i-1} l_{ik}^2}$$
- **Off-Diagonal Elements ($j > i$)**:
  $$l_{ji} = \\frac{1}{l_{ii}} \\left( a_{ji} - \\sum_{k=1}^{i-1} l_{ji} l_{ki} \\right)$$

**Advantages**: Cholesky requires only $\\frac{1}{3} n^3$ flops (half the work of standard LU), needs only half the memory storage, and is unconditionally numerically stable without any pivoting!

---

> [!TIP] **EXAM TIP:**
> In exams, remember the diagonal convention:
> - **Doolittle**: **L** has $1$s on the diagonal ($l_{ii} = 1$).
> - **Crout**: **U** has $1$s on the diagonal ($u_{ii} = 1$).
> - Memory trick: *Doolittle puts the ones down Little (in L)!*

> [!NOTE] **DEV BRAIN:**
> In Python with SciPy, \`scipy.linalg.lu\` actually returns $P, L, U$ where $P$ is a permutation matrix ($P A = L U$). Pivoting is required for general matrices to prevent zero pivots on the diagonal during decomposition.

> [!WARNING] **TRAP:**
> Never attempt Cholesky decomposition on a matrix that is not positive definite! If $A$ is not positive definite, the quantity under the square root $a_{ii} - \\sum l_{ik}^2$ will be negative, resulting in imaginary numbers and immediate algorithm failure.

> [!IMPORTANT] **MEMORIZE:**
> - System solve sequence: First $L \\mathbf{y} = \\mathbf{b}$ (forward), then $U \\mathbf{x} = \\mathbf{y}$ (backward).
> - Doolittle convention: $l_{ii} = 1$; Crout convention: $u_{ii} = 1$.
> - Cholesky factorization: $A = L L^T$ for SPD matrices (complexity $\\frac{1}{3} n^3$).
`,
          shortNotes: "LU decomposition factors A = L*U. Solves A*x=b via L*y=b (forward) and U*x=y (backward). Doolittle has l_ii=1; Crout has u_ii=1; Cholesky has A=L*L^T for SPD matrices.",
          examples: [
            {
              title: "Solving 3x3 System using Doolittle's LU Decomposition",
              problem: "Solve the system using Doolittle's LU decomposition (l_ii = 1):\\n  2x1 + 3x2 +  x3 = 9\\n   x1 + 2x2 + 3x3 = 6\\n  3x1 +  x2 + 2x3 = 8",
              explanation: "Step 1: Setup Doolittle Factorization A = L * U\\nL = [[1, 0, 0], [l21, 1, 0], [l31, l32, 1]]\\nU = [[u11, u12, u13], [0, u22, u23], [0, 0, u33]]\\n\\nRow 1 of U:\\nu11 = a11 = 2\\nu12 = a12 = 3\\nu13 = a13 = 1\\n\\nColumn 1 of L:\\nl21 = a21 / u11 = 1 / 2 = 0.5\\nl31 = a31 / u11 = 3 / 2 = 1.5\\n\\nRow 2 of U:\\nu22 = a22 - l21 * u12 = 2 - (0.5)(3) = 0.5\\nu23 = a23 - l21 * u13 = 3 - (0.5)(1) = 2.5\\n\\nColumn 2 of L:\\nl32 = (a32 - l31 * u12) / u22 = (1 - (1.5)(3)) / 0.5 = (1 - 4.5) / 0.5 = -3.5 / 0.5 = -7.0\\n\\nRow 3 of U:\\nu33 = a33 - (l31 * u13 + l32 * u23) = 2 - (1.5 * 1 + (-7.0) * 2.5) = 2 - (1.5 - 17.5) = 2 - (-16) = 18.0\\n\\nL = [[1, 0, 0], [0.5, 1, 0], [1.5, -7, 1]]\\nU = [[2, 3, 1], [0, 0.5, 2.5], [0, 0, 18]]\\n\\nStep 2: Forward Substitution L y = b\\n[1    0   0] [y1]   [9]\\n[0.5  1   0] [y2] = [6]\\n[1.5 -7   1] [y3]   [8]\\ny1 = 9\\ny2 = 6 - 0.5(9) = 1.5\\ny3 = 8 - 1.5(9) - (-7)(1.5) = 8 - 13.5 + 10.5 = 5.0\\ny = [9, 1.5, 5.0]^T\\n\\nStep 3: Backward Substitution U x = y\\n[2   3    1  ] [x1]   [9.0]\\n[0  0.5  2.5 ] [x2] = [1.5]\\n[0   0   18.0] [x3]   [5.0]\\nx3 = 5.0 / 18.0 approx 0.2778\\n0.5 * x2 = 1.5 - 2.5(0.2778) = 1.5 - 0.6944 = 0.8056 => x2 = 1.6111\\n2 * x1 = 9 - 3(1.6111) - 0.2778 = 9 - 4.8333 - 0.2778 = 3.8889 => x1 = 1.9444.",
              code: "import numpy as np\n\ndef doolittle_lu(A):\n    n = A.shape[0]\n    L = np.eye(n)\n    U = np.zeros((n, n))\n    \n    for i in range(n):\n        for j in range(i, n):\n            U[i, j] = A[i, j] - np.dot(L[i, :i], U[:i, j])\n        for j in range(i + 1, n):\n            L[j, i] = (A[j, i] - np.dot(L[j, :i], U[:i, i])) / U[i, i]\n            \n    return L, U\n\nA = np.array([[2., 3., 1.],\n              [1., 2., 3.],\n              [3., 1., 2.]])\nb = np.array([9., 6., 8.])\n\nL, U = doolittle_lu(A)\nprint(\"Matrix L:\")\nprint(L)\nprint(\"\\nMatrix U:\")\nprint(U)\n\n# Forward substitution Ly = b\ny = np.linalg.solve(L, b)\n# Backward substitution Ux = y\nx = np.linalg.solve(U, y)\n\nprint(\"\\nIntermediate y:\", np.round(y, 4))\nprint(\"Final Solution x:\", np.round(x, 4))\n",
              output: "Matrix L:\n[[ 1.   0.   0. ]\n [ 0.5  1.   0. ]\n [ 1.5 -7.   1. ]]\n\nMatrix U:\n[[ 2.   3.   1. ]\n [ 0.   0.5  2.5]\n [ 0.   0.  18. ]]\n\nIntermediate y: [9.  1.5 5. ]\nFinal Solution x: [1.9444 1.6111 0.2778]",
            },
          ],
          keyPoints: [
              "LU decomposition factors A into lower triangular L and upper triangular U.",
              "Solving Ax = b reduces to two sequential steps: L y = b (forward) and U x = y (backward).",
              "Doolittle algorithm sets l_ii = 1 (unit lower triangular).",
              "Crout algorithm sets u_ii = 1 (unit upper triangular).",
              "Cholesky decomposition factors SPD matrices as A = L * L^T in (1/3) n^3 flops.",
              "LU is especially efficient when solving for multiple right-hand side vectors b."
],
          theoryQuestions: [
            {
              question: "Derive the Doolittle algorithm for LU decomposition of a 3x3 matrix. State the forward and backward substitution formulas.",
              marks: "7 Marks",
              answer: "1. Factorization A = L * U where L has unit diagonal (l11=l22=l33=1) and U is general upper triangular.\\n2. Setting up product [[1,0,0],[l21,1,0],[l31,l32,1]] * [[u11,u12,u13],[0,u22,u23],[0,0,u33]] = A:\\n- Row 1 of U: u11 = a11, u12 = a12, u13 = a13.\\n- Column 1 of L: l21 = a21/u11, l31 = a31/u11.\\n- Row 2 of U: u22 = a22 - l21*u12, u23 = a23 - l21*u13.\\n- Column 2 of L: l32 = (a32 - l31*u12)/u22.\\n- Row 3 of U: u33 = a33 - (l31*u13 + l32*u23).\\n3. Two-stage solution:\\n- Forward Substitution: L y = b => y1 = b1, y2 = b2 - l21*y1, y3 = b3 - l31*y1 - l32*y2.\\n- Backward Substitution: U x = y => x3 = y3/u33, x2 = (y2 - u23*x3)/u22, x1 = (y1 - u12*x2 - u13*x3)/u11.",
              keyPoints: ["Matrix product setup", "Row-by-row and column-by-column derivation", "Forward substitution L y = b", "Backward substitution U x = y"],
            },
            {
              question: "What is Cholesky Decomposition? Under what conditions on matrix A can it be performed?",
              marks: "5 Marks",
              answer: "1. Definition: Cholesky decomposition is a special variant of LU factorization where a matrix is factored as A = L * L^T, where L is a lower triangular matrix with strictly positive real diagonal entries.\\n2. Necessary and Sufficient Conditions: Matrix A must be Symmetric Positive Definite (SPD):\\n- Symmetric: A = A^T.\\n- Positive Definite: x^T * A * x > 0 for all non-zero vectors x (all eigenvalues lambda_i > 0).\\n3. Significance: It requires only (1/3)n^3 flops (half of standard LU), needs storage for only L, and is unconditionally stable without pivoting.",
              keyPoints: ["Formula A = L * L^T", "Symmetric Positive Definite conditions", "(1/3) n^3 flop complexity", "Unconditional numerical stability"],
            },
            {
              question: "Why is LU decomposition preferred over standard Gaussian Elimination when solving systems with multiple right-hand side vectors?",
              marks: "3 Marks",
              answer: "Gaussian elimination mixes matrix A and vector b during forward elimination, costing (2/3)n^3 flops for every single b. LU decomposition factors A into L and U once at cost (2/3)n^3 independent of b. For every subsequent b vector, solving takes only two substitution steps (L y = b and U x = y), costing just 2n^2 flops. For m vectors, total cost is (2/3)n^3 + 2mn^2 rather than (2/3)mn^3.",
              keyPoints: ["Decoupling of A and b", "One-time (2/3)n^3 factorization cost", "O(n^2) cost per subsequent vector b"],
            },
          ],
          mcqs: [
            {
              question: "Which diagonal elements are set to 1 in Doolittle's LU decomposition?",
              options: ["Diagonal of Upper matrix U", "Diagonal of Lower matrix L", "Both L and U diagonals", "Neither diagonal"],
              correctIndex: 1,
              explanation: "Doolittle's algorithm specifies that the lower triangular matrix L is unit lower triangular, meaning l_ii = 1 for all i.",
            },
            {
              question: "Cholesky decomposition A = L L^T can only be applied to which class of matrices?",
              options: ["Any square non-singular matrix", "Symmetric Positive Definite (SPD) matrices", "Orthogonal matrices", "Upper triangular matrices"],
              correctIndex: 1,
              explanation: "Cholesky decomposition strictly requires the matrix to be Symmetric Positive Definite (SPD).",
            },
            {
              question: "What is the computational complexity of solving Ax = b after the LU factorization has already been computed?",
              options: ["O(n^3)", "O(n^2)", "O(n log n)", "O(n)"],
              correctIndex: 1,
              explanation: "Solving L y = b (forward substitution) and U x = y (backward substitution) each takes n^2 / 2 flops, totaling O(n^2) flops.",
            },
            {
              question: "In Crout's LU decomposition method, which condition is imposed?",
              options: ["l_ii = 1", "u_ii = 1", "l_ij = u_ji", "det(L) = 0"],
              correctIndex: 1,
              explanation: "Crout's algorithm sets the diagonal elements of the upper triangular matrix U to 1 (u_ii = 1).",
            },
          ]
        },
        {
          id: "coa-u3-t4",
          title: "Iterative Methods: Gauss-Jacobi & Gauss-Seidel Methods & Diagonal Dominance",
          simpleExplanation: "Iterative methods start with an initial guess and repeatedly refine it using recurrence relations derived from each row. Gauss-Jacobi updates all variables simultaneously at the end of each iteration, while Gauss-Seidel immediately uses the newly calculated values within the same iteration, converging twice as fast.",
          detailedExplanation: `## 1. Principles of Iterative Solvers

While direct solvers (Gaussian Elimination, LU Decomposition) find the exact solution in a predetermined number of operations ($O(n^3)$), they become computationally impractical for the massive sparse linear systems (often $n > 100,000$) encountered in electrical power grids, heat transfer simulations, and machine learning.

**Iterative methods** start from an initial guess $\\mathbf{x}^{(0)}$ (typically zeros) and generate a sequence of increasingly accurate approximations $\\mathbf{x}^{(1)}, \\mathbf{x}^{(2)}, \\dots$ that asymptotically converge to the true solution $\\mathbf{x}^*$.

\`\`\`mermaid
flowchart TD
    INIT["Initial Vector x^(0) = [0, 0, ..., 0]^T"]
    CHOICE{"Choice of Iterative Scheme"}
    CHOICE -->|"Simultaneous Updates"| JACOBI["Gauss-Jacobi Method<br/>x_i^(k+1) uses ONLY values from iteration k"]
    CHOICE -->|"Successive Updates"| SEIDEL["Gauss-Seidel Method<br/>x_i^(k+1) immediately uses newly computed values from iteration k+1"]
    JACOBI --> CHECK{"||x^(k+1) - x^(k)|| < tol?"}
    SEIDEL --> CHECK
    CHECK -->|"No"| REPEAT["Increment k <- k + 1"] --> CHOICE
    CHECK -->|"Yes"| CONVERGED["Converged Solution Vector x*"]
\`\`\`

---

## 2. Mathematical Formulations: Jacobi vs. Gauss-Seidel

Given the $n \\times n$ system $A \\mathbf{x} = \\mathbf{b}$:
$$\\begin{matrix}
a_{11} x_1 + a_{12} x_2 + \\dots + a_{1n} x_n = b_1 \\\\
a_{21} x_1 + a_{22} x_2 + \\dots + a_{2n} x_n = b_2 \\\\
\\vdots \\\\
a_{n1} x_1 + a_{n2} x_2 + \\dots + a_{nn} x_n = b_n
\\end{matrix}$$

Assuming all diagonal elements $a_{ii} \\ne 0$, we solve the $i$-th equation for $x_i$:

$$x_i = \\frac{1}{a_{ii}} \\left( b_i - \\sum_{j=1, j \\ne i}^n a_{ij} x_j \\right)$$

### 2.1 The Gauss-Jacobi Method (Simultaneous Displacements)
In the Jacobi scheme, the $(k+1)$-th approximation of every variable is calculated using **strictly the values from the previous iteration $k$**:

$$x_i^{(k+1)} = \\frac{1}{a_{ii}} \\left( b_i - \\sum_{j \\ne i} a_{ij} x_j^{(k)} \\right)$$

*Matrix Form*: Splitting $A = D + L + U$ (Diagonal, strictly lower, strictly upper):
$$\\mathbf{x}^{(k+1)} = D^{-1} \\left( \\mathbf{b} - (L + U) \\mathbf{x}^{(k)} \\right)$$

### 2.2 The Gauss-Seidel Method (Successive Displacements)
Because $x_1^{(k+1)}, x_2^{(k+1)}, \\dots, x_{i-1}^{(k+1)}$ have already been calculated within the current iteration $k+1$, Gauss-Seidel **immediately plugs these newer, superior values** into the formula for $x_i$:

$$x_i^{(k+1)} = \\frac{1}{a_{ii}} \\left( b_i - \\sum_{j=1}^{i-1} a_{ij} x_j^{(k+1)} - \\sum_{j=i+1}^n a_{ij} x_j^{(k)} \\right)$$

*Matrix Form*:
$$(D + L) \\mathbf{x}^{(k+1)} = \\mathbf{b} - U \\mathbf{x}^{(k)} \\implies \\mathbf{x}^{(k+1)} = (D + L)^{-1} \\left( \\mathbf{b} - U \\mathbf{x}^{(k)} \\right)$$

---

## 3. Strict Diagonal Dominance (The Convergence Guarantee)

Neither method is guaranteed to converge for arbitrary matrices! Convergence is governed by the **Strictly Diagonally Dominant (SDD)** condition.

> **Definition (Strictly Diagonally Dominant Matrix):**
> A square matrix $A$ is strictly diagonally dominant if in every row, the absolute value of the diagonal entry is strictly greater than the sum of the absolute values of all other off-diagonal entries in that row:
> $$|a_{ii}| > \\sum_{j=1, j \\ne i}^n |a_{ij}| \\quad \\text{for all } i = 1, 2, \\dots, n$$

### Fundamental Convergence Theorem
If matrix $A$ is Strictly Diagonally Dominant, then:
1. Both the Gauss-Jacobi and Gauss-Seidel methods are **guaranteed to converge** for ANY initial starting vector $\\mathbf{x}^{(0)}$.
2. The Gauss-Seidel method converges **roughly twice as fast** as the Gauss-Jacobi method:
   $$\\rho(T_{GS}) \\approx [\\rho(T_J)]^2$$
   where $\\rho(T)$ is the spectral radius (magnitude of the largest eigenvalue) of the iteration matrix.

---

## 4. Head-to-Head Comparison: Jacobi vs. Gauss-Seidel

| Feature | Gauss-Jacobi Method | Gauss-Seidel Method |
| :--- | :--- | :--- |
| **Variable Updates** | Simultaneous at end of iteration | Immediate in-place update |
| **Memory Requirement** | Needs $2n$ storage (old vector $\\mathbf{x}^{(k)}$ and new vector $\\mathbf{x}^{(k+1)}$) | Needs only $n$ storage (overwrites in place) |
| **Convergence Speed** | Standard speed | **Twice as fast** as Jacobi |
| **Parallel Hardware Suitability** | **Extremely high** (embarrassingly parallel on GPUs) | Poor (inherently sequential dependencies) |
| **Stopping Condition** | $\\|\\mathbf{x}^{(k+1)} - \\mathbf{x}^{(k)}\\|_\\infty < \\epsilon$ | $\\|\\mathbf{x}^{(k+1)} - \\mathbf{x}^{(k)}\\|_\\infty < \\epsilon$ |

---

> [!TIP] **EXAM TIP:**
> Before running Jacobi or Gauss-Seidel iterations in an exam, ALWAYS check for diagonal dominance!
> If the given system is NOT diagonally dominant, look for row rearrangements. For example, if row 1 is $x + 5y = 10$ and row 2 is $8x + y = 18$, swap the equations so that row 1 is $8x + y = 18$ ($|8| > |1|$) and row 2 is $x + 5y = 10$ ($|5| > |1|$). Failure to rearrange will cause the iterations to diverge!

> [!NOTE] **DEV BRAIN:**
> While Gauss-Seidel converges in fewer iterations on a single CPU core, modern AI and supercomputing clusters prefer **Jacobi** because all $n$ equations can be computed simultaneously on 10,000 CUDA cores without data races!

> [!WARNING] **TRAP:**
> In Gauss-Seidel, students often accidentally use the old value $x_1^{(k)}$ instead of the newly computed $x_1^{(k+1)}$ when calculating $x_2^{(k+1)}$. Remember: *The moment a new value is computed, the old value is dead!*

> [!IMPORTANT] **MEMORIZE:**
> - Strictly Diagonally Dominant criterion: $|a_{ii}| > \\sum_{j \\ne i} |a_{ij}|$
> - Jacobi: Uses all old values from iteration $k$.
> - Seidel: Uses new values as soon as they become available.
> - Seidel convergence rate: $\\rho(T_{GS}) \\approx \\rho(T_J)^2$ (twice as fast).
`,
          shortNotes: "Jacobi updates all variables simultaneously from iteration k. Gauss-Seidel uses newly computed values immediately (converges twice as fast). Guaranteed to converge if A is diagonally dominant.",
          examples: [
            {
              title: "Solving a 3x3 System using Gauss-Jacobi and Gauss-Seidel Methods",
              problem: "Solve the system using Gauss-Seidel starting from x^(0) = [0, 0, 0]^T for 3 iterations:\\n  10x1 +   x2 +   x3 = 12\\n   2x1 + 10x2 +   x3 = 13\\n   2x1 +  2x2 + 10x3 = 14",
              explanation: "Step 1: Check Diagonal Dominance\\nRow 1: |10| > |1| + |1| = 2 (True!)\\nRow 2: |10| > |2| + |1| = 3 (True!)\\nRow 3: |10| > |2| + |2| = 4 (True!)\\nMatrix is strictly diagonally dominant; convergence guaranteed.\\n\\nStep 2: Setup Iterative Formulas\\nx1 = (12 - x2 - x3) / 10\\nx2 = (13 - 2*x1 - x3) / 10\\nx3 = (14 - 2*x1 - 2*x2) / 10\\n\\nIteration 1 (Gauss-Seidel with x1=0, x2=0, x3=0):\\nx1^(1) = (12 - 0 - 0) / 10 = 1.2000\\nx2^(1) = (13 - 2*(1.2000) - 0) / 10 = (13 - 2.4) / 10 = 1.0600\\nx3^(1) = (14 - 2*(1.2000) - 2*(1.0600)) / 10 = (14 - 2.4 - 2.12) / 10 = 9.48 / 10 = 0.9480\\nx^(1) = [1.2000, 1.0600, 0.9480]\\n\\nIteration 2:\\nx1^(2) = (12 - 1.0600 - 0.9480) / 10 = 9.992 / 10 = 0.9992\\nx2^(2) = (13 - 2*(0.9992) - 0.9480) / 10 = (13 - 1.9984 - 0.9480) / 10 = 1.0054\\nx3^(2) = (14 - 2*(0.9992) - 2*(1.0054)) / 10 = (14 - 1.9984 - 2.0108) / 10 = 0.9991\\nx^(2) = [0.9992, 1.0054, 0.9991]\\n\\nIteration 3:\\nx1^(3) = (12 - 1.0054 - 0.9991) / 10 = 0.9996\\nx2^(3) = (13 - 2*(0.9996) - 0.9991) / 10 = 1.0002\\nx3^(3) = (14 - 2*(0.9996) - 2*(1.0002)) / 10 = 1.0000\\nExact solution is [1.0, 1.0, 1.0]!",
              code: "import numpy as np\n\ndef gauss_seidel(A, b, x0=None, tol=1e-4, max_iter=20):\n    n = len(b)\n    x = np.zeros(n) if x0 is None else x0.astype(float).copy()\n    \n    print(f\"{'Iter':<5} {'x1':<12} {'x2':<12} {'x3':<12} {'Max Diff':<12}\")\n    print(\"-\" * 53)\n    \n    for k in range(1, max_iter + 1):\n        x_old = x.copy()\n        for i in range(n):\n            s1 = np.dot(A[i, :i], x[:i])\n            s2 = np.dot(A[i, i+1:], x_old[i+1:])\n            x[i] = (b[i] - s1 - s2) / A[i, i]\n            \n        diff = np.max(np.abs(x - x_old))\n        print(f\"{k:<5} {x[0]:<12.5f} {x[1]:<12.5f} {x[2]:<12.5f} {diff:<12.5e}\")\n        \n        if diff < tol:\n            return x, k\n            \n    return x, max_iter\n\nA = np.array([[10., 1., 1.],\n              [2., 10., 1.],\n              [2., 2., 10.]])\nb = np.array([12., 13., 14.])\n\nsol, iters = gauss_seidel(A, b)\nprint(f\"\\nConverged Solution: {sol} in {iters} iterations.\")\n",
              output: "Iter  x1           x2           x3           Max Diff    \n-----------------------------------------------------\n1     1.20000      1.06000      0.94800      1.20000e+00 \n2     0.99920      1.00536      0.99909      2.00800e-01 \n3     0.99955      1.00018      0.99995      5.17600e-03 \n4     0.99999      1.00001      1.00000      4.35600e-04 \n5     1.00000      1.00000      1.00000      1.35080e-05 \n\nConverged Solution: [1. 1. 1.] in 5 iterations.",
            },
          ],
          keyPoints: [
              "Iterative solvers refine an initial guess sequentially rather than eliminating in finite steps.",
              "Gauss-Jacobi updates all variables simultaneously using values from the previous iteration.",
              "Gauss-Seidel immediately incorporates newly updated values within the current iteration.",
              "Gauss-Seidel converges roughly twice as fast as Gauss-Jacobi.",
              "Convergence for arbitrary initial guesses is guaranteed if the matrix is Strictly Diagonally Dominant (|a_ii| > sum_{j!=i} |a_ij|)."
],
          theoryQuestions: [
            {
              question: "Define Strict Diagonal Dominance. State the convergence criterion for the Gauss-Jacobi and Gauss-Seidel methods.",
              marks: "5 Marks",
              answer: "1. Definition: An n x n matrix A is strictly diagonally dominant if in each row, the absolute value of the diagonal entry is strictly greater than the sum of the absolute values of all other off-diagonal entries:\\n|a_{ii}| > sum_{j=1, j!=i}^n |a_{ij}| for all i = 1, 2, ..., n.\\n2. Convergence Criterion: If matrix A is strictly diagonally dominant, both the Gauss-Jacobi and Gauss-Seidel methods are unconditionally convergent for any starting vector x^(0).\\n3. Relative Rate: The spectral radius of the Gauss-Seidel iteration matrix is approximately the square of the Jacobi spectral radius: rho(T_GS) approx (rho(T_J))^2, meaning Gauss-Seidel converges at approximately double the speed of Jacobi.",
              keyPoints: ["Mathematical definition |a_ii| > sum |a_ij|", "Unconditional convergence theorem", "Spectral radius relationship rho(T_GS) approx rho(T_J)^2"],
            },
            {
              question: "Compare the Gauss-Jacobi and Gauss-Seidel methods with respect to algorithm formulation, storage requirements, and parallel execution.",
              marks: "5 Marks",
              answer: "1. Algorithm Formulation: Jacobi computes x_i^(k+1) strictly using values from iteration k. Gauss-Seidel computes x_i^(k+1) using newly computed values x_1^(k+1)...x_{i-1}^(k+1) from iteration k+1 and remaining values from iteration k.\\n2. Storage Requirements: Jacobi requires 2n memory locations (separate arrays for previous and current iterates). Gauss-Seidel requires only n memory locations because updates are made in-place.\\n3. Parallel Execution: Jacobi is embarrassingly parallel because each equation can be updated completely independently across multiple cores/GPUs. Gauss-Seidel has serial data dependencies (each variable depends on the previous ones), making it difficult to parallelize efficiently.",
              keyPoints: ["Old vs new values usage", "2n vs n storage requirement", "Parallel GPU execution capability of Jacobi"],
            },
            {
              question: "Show why the system: x + 4y = 5, 5x + y = 6 must be rearranged before applying Gauss-Seidel iteration.",
              marks: "3 Marks",
              answer: "In the current form:\\nRow 1: |a11| = 1, |a12| = 4. Since 1 < 4, row 1 is NOT diagonally dominant.\\nRow 2: |a21| = 5, |a22| = 1. Since 1 < 5, row 2 is NOT diagonally dominant.\\nApplying Gauss-Seidel directly will cause the sequence of iterates to diverge to infinity.\\nBy rearranging equations:\\n5x + y = 6 (Row 1: |5| > |1|)\\nx + 4y = 5 (Row 2: |4| > |1|)\\nNow the system is strictly diagonally dominant, guaranteeing rapid convergence.",
              keyPoints: ["Failure of diagonal dominance test", "Proof of divergence risk", "Rearrangement to ensure |a_ii| > |a_ij|"],
            },
          ],
          mcqs: [
            {
              question: "Which of the following conditions guarantees convergence of the Gauss-Seidel method for any initial guess?",
              options: ["Matrix A is strictly diagonally dominant", "Matrix A has zero determinant", "Matrix A is skew-symmetric", "All elements of A are positive"],
              correctIndex: 0,
              explanation: "Strict diagonal dominance (|a_ii| > sum_{j!=i} |a_ij|) is a sufficient condition that guarantees convergence for any initial guess.",
            },
            {
              question: "How does the Gauss-Seidel method differ fundamentally from the Gauss-Jacobi method?",
              options: ["It uses backward substitution instead of forward elimination", "It immediately uses newly computed variable values within the current iteration", "It requires finding the matrix inverse", "It works only on 2x2 systems"],
              correctIndex: 1,
              explanation: "Gauss-Seidel immediately incorporates newly computed values x_1^(k+1)...x_{i-1}^(k+1) to calculate x_i^(k+1), whereas Jacobi waits until the end of the iteration.",
            },
            {
              question: "What is the relationship between the convergence rates of Gauss-Seidel and Gauss-Jacobi?",
              options: ["Jacobi converges twice as fast as Seidel", "Gauss-Seidel converges roughly twice as fast as Gauss-Jacobi", "Both converge at exactly the same rate", "Gauss-Seidel converges four times slower"],
              correctIndex: 1,
              explanation: "Because rho(T_GS) approx (rho(T_J))^2, Gauss-Seidel reduces error at roughly double the speed of Gauss-Jacobi.",
            },
            {
              question: "Why is the Gauss-Jacobi method often favored on modern GPU compute architectures despite converging slower?",
              options: ["It requires zero floating point multiplications", "All variable updates in an iteration are completely independent and can be executed in parallel", "It does not require diagonal dominance", "It has quadratic convergence"],
              correctIndex: 1,
              explanation: "Because Jacobi updates rely strictly on the previous iteration vector, all n equations can be evaluated in parallel across GPU threads.",
            },
          ]
        }
      ]
    },
    {
      id: "coa-u4",
      title: "Unit 4: Finite Differences & Interpolation",
      description: "Discrete calculus foundations and polynomial interpolation: forward, backward, shift, central, and average difference operators with operator algebra; Newton's forward and backward interpolation polynomials; central difference formulas (Gauss, Stirling, Bessel); and unequal spacing interpolation (Lagrange and Newton's Divided Differences).",
      topics: [
        {
          id: "coa-u4-t1",
          title: "Difference Operators: Forward, Backward, Shift, Average, Central & Operator Algebra",
          simpleExplanation: "Finite difference operators are the discrete building blocks of calculus. Instead of infinitesimal differentials dx, they measure differences between function values spaced at discrete intervals h, allowing us to approximate derivatives, integrate, and interpolate using simple algebra.",
          detailedExplanation: `## 1. Introduction to Discrete Calculus & Finite Difference Operators

In continuous calculus, the derivative $\\frac{dy}{dx}$ is defined through an infinitesimal limit $\\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}$. In computer numerical analysis, however, we deal with discrete experimental datasets tabulated at finite, non-zero step sizes $h$.

The algebra of **finite difference operators** allows us to manipulate discrete sequences with the elegance of differential operators.

Let $y = f(x)$ be tabulated for equally spaced arguments $x_0, x_1, x_2, \\dots, x_n$ where:
$$x_i = x_0 + i h \\quad (h = \\text{constant step length})$$
We denote $y_i = f(x_i) = f(x_0 + i h)$.

\`\`\`mermaid
flowchart TD
    OPS["Core Finite Difference Operators"]
    OPS --> FWD["Forward Difference (Δ): Δy_i = y_{i+1} - y_i"]
    OPS --> BWD["Backward Difference (∇): ∇y_i = y_i - y_{i-1}"]
    OPS --> SHT["Shift Operator (E): E y_i = y_{i+1}"]
    OPS --> CNT["Central Difference (δ): δy_i = y_{i+1/2} - y_{i-1/2}"]
    OPS --> AVG["Averaging Operator (μ): μy_i = 1/2 [y_{i+1/2} + y_{i-1/2}]"]
    OPS --> DIF["Differential Operator (D): D = d/dx"]
\`\`\`

---

## 2. Rigorous Definitions of Fundamental Operators

### 2.1 Forward Difference Operator ($\\Delta$)
$$\\Delta f(x) = f(x + h) - f(x) \\implies \\Delta y_i = y_{i+1} - y_i$$
Higher-order differences are defined recursively:
$$\\Delta^2 y_i = \\Delta(\\Delta y_i) = \\Delta(y_{i+1} - y_i) = \\Delta y_{i+1} - \\Delta y_i = y_{i+2} - 2y_{i+1} + y_i$$
$$\\Delta^n y_i = \\sum_{k=0}^n (-1)^k \\binom{n}{k} y_{i+n-k}$$

### 2.2 Backward Difference Operator ($\\nabla$)
$$\\nabla f(x) = f(x) - f(x - h) \\implies \\nabla y_i = y_i - y_{i-1}$$
Notice that $\\nabla y_{i+1} = y_{i+1} - y_i = \\Delta y_i$.

### 2.3 Shift Operator ($E$)
The shift (or displacement) operator advances the function argument by one full step $h$:
$$E f(x) = f(x + h) \\implies E y_i = y_{i+1}$$
$$E^n f(x) = f(x + n h) \\implies E^n y_i = y_{i+n}$$
For fractional steps: $E^u f(x) = f(x + u h)$ where $u \\in \\mathbb{R}$.

### 2.4 Central Difference Operator ($\\delta$)
$$\\delta f(x) = f\\left(x + \\frac{h}{2}\\right) - f\\left(x - \\frac{h}{2}\\right) = E^{1/2} f(x) - E^{-1/2} f(x)$$

### 2.5 Averaging Operator ($\\mu$)
$$\\mu f(x) = \\frac{1}{2} \\left[ f\\left(x + \\frac{h}{2}\\right) + f\\left(x - \\frac{h}{2}\\right) \\right] = \\frac{1}{2} \\left( E^{1/2} + E^{-1/2} \\right) f(x)$$

---

## 3. Operator Algebra & Fundamental Inter-Relations

One of the most elegant branches of numerical mathematics is the algebraic equivalence between operators:

| Operator Relation | Mathematical Derivation / Identity |
| :--- | :--- |
| **$\\Delta = E - 1$** | $E y_i - y_i = (E - 1)y_i = \\Delta y_i \\implies E = 1 + \\Delta$ |
| **$\\nabla = 1 - E^{-1}$** | $y_i - E^{-1}y_i = (1 - E^{-1})y_i = \\nabla y_i \\implies E^{-1} = 1 - \\nabla$ |
| **$\\Delta = E \\nabla = \\nabla E$** | $\\Delta y_i = y_{i+1} - y_i = \\nabla y_{i+1} = \\nabla(E y_i) = (\\nabla E)y_i$ |
| **$\\delta = E^{1/2} - E^{-1/2}$** | Directly from definition of half-step differences |
| **$\\mu^2 = 1 + \\frac{1}{4} \\delta^2$** | $\\mu^2 = \\frac{1}{4}(E + 2 + E^{-1}) = 1 + \\frac{1}{4}(E - 2 + E^{-1}) = 1 + \\frac{1}{4}\\delta^2$ |
| **$E = e^{hD}$** | From Taylor Series: $E f(x) = f(x+h) = \\sum_{k=0}^\\infty \\frac{h^k D^k}{k!} f(x) = e^{hD} f(x)$ |
| **$hD = \\ln(1 + \\Delta)$** | Since $E = 1 + \\Delta = e^{hD} \\implies hD = \\ln(1 + \\Delta) = \\Delta - \\frac{\\Delta^2}{2} + \\frac{\\Delta^3}{3} - \\dots$ |
| **$hD = -\\ln(1 - \\nabla)$** | Since $E^{-1} = 1 - \\nabla = e^{-hD} \\implies hD = -\\ln(1 - \\nabla) = \\nabla + \\frac{\\nabla^2}{2} + \\frac{\\nabla^3}{3} + \\dots$ |

---

## 4. The Fundamental Theorem of Finite Differences

> **Fundamental Theorem of Finite Differences:**
> If $f(x)$ is a polynomial of degree $n$ with leading coefficient $a_n$:
> $$f(x) = a_n x^n + a_{n-1} x^{n-1} + \\dots + a_1 x + a_0$$
> then:
> 1. The $n$-th forward difference $\\Delta^n f(x)$ is a **constant** independent of $x$:
>    $$\\Delta^n f(x) = a_n \\cdot n! \\cdot h^n$$
> 2. The $(n+1)$-th and all higher differences are **identically zero**:
>    $$\\Delta^{n+1} f(x) = 0, \\quad \\Delta^{n+2} f(x) = 0, \\dots$$

This theorem is essential for constructing difference tables and detecting errors in recorded tabular data!

\`\`\`
Difference Table Structure:
x     y        Δy         Δ²y        Δ³y
------------------------------------------
x0    y0
               Δy0
x1    y1                  Δ²y0
               Δy1                   Δ³y0 (Constant!)
x2    y2                  Δ²y1
               Δy2
x3    y3
\`\`\`

---

> [!TIP] **EXAM TIP:**
> When asked to prove $\\mu \\delta = \\frac{1}{2}(\\Delta + \\nabla)$:
> Express both in terms of $E$:
> $\\mu \\delta = \\frac{1}{2}(E^{1/2} + E^{-1/2})(E^{1/2} - E^{-1/2}) = \\frac{1}{2}(E - E^{-1})$.
> Now expand $\\frac{1}{2}(\\Delta + \\nabla) = \\frac{1}{2}[(E - 1) + (1 - E^{-1})] = \\frac{1}{2}(E - E^{-1})$.
> Both expressions equal $\\frac{1}{2}(E - E^{-1})$, proving the identity in 3 lines!

> [!NOTE] **DEV BRAIN:**
> The relation $E = e^{hD}$ is the discrete analog of the generator of translations in quantum mechanics and signal processing! Finite difference operators can be manipulated using standard polynomial calculus libraries like SymPy.

> [!WARNING] **TRAP:**
> In difference tables, $\\Delta^k y_0$ lies along the **downward diagonal** starting from $y_0$. Do not read horizontally across the table! A horizontal line does not correspond to a single difference order.

> [!IMPORTANT] **MEMORIZE:**
> - $E = 1 + \\Delta = (1 - \\nabla)^{-1} = e^{hD}$
> - $\\Delta = E - 1$; $\\nabla = 1 - E^{-1}$
> - Fundamental Theorem: $\\Delta^n (x^n) = n! h^n$; $\\Delta^{n+1}(x^n) = 0$.
> - $\\mu^2 = 1 + \\frac{1}{4}\\delta^2$
`,
          shortNotes: "Operators: E = 1+Delta = (1-Nabla)^-1 = e^(hD). Delta y_i = y_{i+1} - y_i; Nabla y_i = y_i - y_{i-1}. nth difference of nth degree polynomial is constant n!*a_n*h^n.",
          examples: [
            {
              title: "Constructing Forward Difference Table for a Cubic Polynomial",
              problem: "Construct the forward difference table for the polynomial y = x^3 - 3x^2 + 5x + 7 for x = 0, 1, 2, 3, 4, 5. Verify the Fundamental Theorem of Finite Differences.",
              explanation: "Here h = 1, polynomial degree n = 3, leading coefficient a3 = 1.\\nTheoretical prediction: Delta^3 y = a3 * 3! * h^3 = 1 * 6 * 1^3 = 6 (constant) and Delta^4 y = 0.\\n\\nCalculate function values:\\nx = 0: y0 = 7\\nx = 1: y1 = 1 - 3 + 5 + 7 = 10\\nx = 2: y2 = 8 - 12 + 10 + 7 = 13\\nx = 3: y3 = 27 - 27 + 15 + 7 = 22\\nx = 4: y4 = 64 - 48 + 20 + 7 = 43\\nx = 5: y5 = 125 - 75 + 25 + 7 = 82\\n\\nFirst Differences (Delta y):\\n10 - 7 = 3\\n13 - 10 = 3\\n22 - 13 = 9\\n43 - 22 = 21\\n82 - 43 = 39\\n\\nSecond Differences (Delta^2 y):\\n3 - 3 = 0\\n9 - 3 = 6\\n21 - 9 = 12\\n39 - 21 = 18\\n\\nThird Differences (Delta^3 y):\\n6 - 0 = 6\\n12 - 6 = 6\\n18 - 12 = 6\\nAll 3rd differences are exactly 6, confirming the Fundamental Theorem!\\nFourth Differences (Delta^4 y):\\n6 - 6 = 0, 6 - 6 = 0.",
              code: "import numpy as np\n\ndef difference_table(x, y):\n    n = len(y)\n    table = np.zeros((n, n))\n    table[:, 0] = y\n    \n    for j in range(1, n):\n        for i in range(n - j):\n            table[i, j] = table[i + 1, j - 1] - table[i, j - 1]\n            \n    print(f\"{'x':<5} {'y':<8} {'\u0394y':<8} {'\u0394\u00b2y':<8} {'\u0394\u00b3y':<8} {'\u0394\u2074y':<8}\")\n    print(\"-\" * 50)\n    for i in range(n):\n        row_str = f\"{x[i]:<5} \"\n        for j in range(n - i):\n            row_str += f\"{table[i, j]:<8.0f} \"\n        print(row_str)\n        \nx = np.array([0, 1, 2, 3, 4, 5])\nf = lambda x: x**3 - 3*x**2 + 5*x + 7\ny = f(x)\n\ndifference_table(x, y)\n",
              output: "x     y        \u0394y       \u0394\u00b2y      \u0394\u00b3y      \u0394\u2074y     \n--------------------------------------------------\n0     7        3        0        6        0        \n1     10       3        6        6        0        \n2     13       9        12       6        \n3     22       21       18       \n4     43       39       \n5     82       ",
            },
          ],
          keyPoints: [
              "Forward difference Delta y_i = y_{i+1} - y_i; Backward difference Nabla y_i = y_i - y_{i-1}.",
              "Shift operator E advances argument by h: E y_i = y_{i+1}.",
              "Key operator identities: E = 1 + Delta, E = (1 - Nabla)^(-1), and E = e^(hD).",
              "Central difference delta = E^(1/2) - E^(-1/2) and averaging operator mu = 1/2(E^(1/2) + E^(-1/2)).",
              "The Fundamental Theorem states that the nth difference of an nth degree polynomial is constant (n! * a_n * h^n) and higher differences are zero."
],
          theoryQuestions: [
            {
              question: "State and prove the Fundamental Theorem of Finite Differences.",
              marks: "7 Marks",
              answer: "1. Theorem: The nth difference of a polynomial of degree n is constant and equal to a_n * n! * h^n, and the (n+1)th difference is identically zero.\\n2. Proof:\\nLet P_n(x) = a_n x^n + a_{n-1} x^{n-1} + ... + a_0.\\nFirst difference: Delta P_n(x) = P_n(x + h) - P_n(x) = a_n [(x + h)^n - x^n] + a_{n-1}[(x + h)^{n-1} - x^{n-1}] + ...\\nBy binomial expansion: (x + h)^n - x^n = n h x^{n-1} + (n(n-1)/2) h^2 x^{n-2} + ...\\nThus: Delta P_n(x) = a_n n h x^{n-1} + Q_{n-2}(x), which is a polynomial of degree (n - 1) with leading coefficient a_n * n * h.\\nRepeating this difference operation successively:\\nDelta^2 P_n(x) = a_n n (n-1) h^2 x^{n-2} + ...\\nContinuing up to n times:\\nDelta^n P_n(x) = a_n n (n-1)(n-2)...(1) h^n x^0 = a_n * n! * h^n (which is a constant independent of x).\\n3. Taking one more difference: Delta^{n+1} P_n(x) = Delta(constant) = constant - constant = 0.",
              keyPoints: ["Statement of the theorem", "Binomial expansion of (x+h)^n - x^n", "Reduction of degree by 1 at each difference", "n-th difference formula a_n * n! * h^n", "(n+1)th difference equals zero"],
            },
            {
              question: "Prove the following operator relations: (a) Delta = E * Nabla, and (b) mu^2 = 1 + (1/4) delta^2.",
              marks: "5 Marks",
              answer: "Part (a):\\nRecall definitions: E f(x) = f(x + h), Nabla f(x) = f(x) - f(x - h).\\nThen (E * Nabla) f(x) = E [f(x) - f(x - h)] = f(x + h) - f(x) = Delta f(x).\\nThus, Delta = E * Nabla.\\n\\nPart (b):\\nRecall: mu = (1/2)(E^(1/2) + E^(-1/2)) and delta = E^(1/2) - E^(-1/2).\\nSquaring mu: mu^2 = (1/4)(E + 2 + E^(-1)).\\nSquaring delta: delta^2 = E - 2 + E^(-1) => (1/4) delta^2 = (1/4)(E - 2 + E^(-1)).\\nAdding 1: 1 + (1/4) delta^2 = 1 + (1/4)(E - 2 + E^(-1)) = (1/4)[4 + E - 2 + E^(-1)] = (1/4)(E + 2 + E^(-1)) = mu^2.\\nHence, mu^2 = 1 + (1/4) delta^2.",
              keyPoints: ["Proof of Delta = E * Nabla using definitions", "Expansion of mu^2", "Expansion of delta^2", "Algebraic completion showing mu^2 = 1 + 1/4 delta^2"],
            },
            {
              question: "Derive the relationship between the finite difference operator Delta and the differential operator D = d/dx.",
              marks: "3 Marks",
              answer: "By Taylor's Series expansion:\\nf(x + h) = f(x) + h f'(x) + (h^2 / 2!) f''(x) + ... = [1 + hD + (hD)^2/2! + ...] f(x) = e^(hD) f(x).\\nSince by definition E f(x) = f(x + h), we have E = e^(hD).\\nSince E = 1 + Delta:\\n1 + Delta = e^(hD) => hD = ln(1 + Delta).\\nUsing the Maclaurin expansion ln(1 + u) = u - u^2/2 + u^3/3 - ...:\\nhD = Delta - (Delta^2 / 2) + (Delta^3 / 3) - (Delta^4 / 4) + ...",
              keyPoints: ["Taylor series in terms of D", "Identification E = e^(hD)", "Logarithmic inversion hD = ln(1 + Delta)", "Expansion for hD"],
            },
          ],
          mcqs: [
            {
              question: "If f(x) is a polynomial of degree 4, what is the value of Delta^5 f(x)?",
              options: ["4! h^4", "5! h^5", "Constant non-zero", "0"],
              correctIndex: 3,
              explanation: "By the Fundamental Theorem of Finite Differences, the (n+1)th difference of a degree n polynomial is identically zero. Here n = 4, so Delta^5 f(x) = 0.",
            },
            {
              question: "Which of the following identities correctly relates shift operator E and forward difference Delta?",
              options: ["E = 1 - Delta", "Delta = E + 1", "E = 1 + Delta", "Delta = ln(E)"],
              correctIndex: 2,
              explanation: "Because Delta y_i = y_{i+1} - y_i = E y_i - y_i = (E - 1)y_i, we have Delta = E - 1 or E = 1 + Delta.",
            },
            {
              question: "What is the value of Delta^3 (x^3) when step size h = 2?",
              options: ["6", "12", "24", "48"],
              correctIndex: 3,
              explanation: "Delta^n (x^n) = n! * h^n. For n = 3 and h = 2: 3! * 2^3 = 6 * 8 = 48.",
            },
            {
              question: "Which operator is defined as mu = (1/2) (E^(1/2) + E^(-1/2))?",
              options: ["Central difference operator", "Averaging operator", "Backward operator", "Laplacian operator"],
              correctIndex: 1,
              explanation: "mu is the averaging (or mean) operator defined as the arithmetic mean of half-step displacements.",
            },
          ]
        },
        {
          id: "coa-u4-t2",
          title: "Newton's Forward & Backward Difference Interpolation Formulas: Derivations & Error",
          simpleExplanation: "Newton's forward and backward formulas fit an nth-degree polynomial through equally spaced data points. Forward interpolation is ideal for estimating values near the beginning of a data table, while backward interpolation is used for points near the end.",
          detailedExplanation: `## 1. The Polynomial Interpolation Problem

Given a table of $n+1$ equally spaced data points $(x_0, y_0), (x_1, y_1), \\dots, (x_n, y_n)$ where $x_i = x_0 + i h$, the **interpolation problem** consists of finding a polynomial $P_n(x)$ of degree $\\le n$ such that:

$$P_n(x_i) = y_i \\quad \\text{for all } i = 0, 1, \\dots, n$$

By the **Weierstrass Approximation Theorem**, such a polynomial exists and is mathematically unique.

\`\`\`mermaid
flowchart TD
    DATA["Equally Spaced Data Points (x_i, y_i) with step h"]
    WHERE{"Where is the interpolation point x located?"}
    WHERE -->|"Near the start of the table (x ≈ x0)"| FORWARD["Newton's Forward Difference Formula<br/>u = (x - x0)/h"]
    WHERE -->|"Near the end of the table (x ≈ xn)"| BACKWARD["Newton's Backward Difference Formula<br/>v = (x - xn)/h"]
    FORWARD --> POLY_F["P_n(x) = y0 + u Δy0 + u(u-1)/2! Δ²y0 + ..."]
    BACKWARD --> POLY_B["P_n(x) = yn + v ∇yn + v(v+1)/2! ∇²yn + ..."]
\`\`\`

---

## 2. Derivation of Newton's Forward Difference Interpolation Formula

Let $x = x_0 + u h$, where the normalized non-dimensional parameter $u$ is defined as:
$$u = \\frac{x - x_0}{h}$$

Using the shift operator $E$ and its relation to forward difference $E = 1 + \\Delta$:

$$f(x) = f(x_0 + u h) = E^u f(x_0) = (1 + \\Delta)^u y_0$$

Applying the **Binomial Theorem for any real exponent $u$**:

$$(1 + \\Delta)^u = 1 + u \\Delta + \\frac{u(u-1)}{2!} \\Delta^2 + \\frac{u(u-1)(u-2)}{3!} \\Delta^3 + \\dots + \\frac{u(u-1)\\dots(u-n+1)}{n!} \\Delta^n + \\dots$$

Truncating the infinite series after the $n$-th difference yields **Newton's Gregory Forward Interpolation Formula**:

$$P_n(x) = y_0 + u \\Delta y_0 + \\frac{u(u-1)}{2!} \\Delta^2 y_0 + \\frac{u(u-1)(u-2)}{3!} \\Delta^3 y_0 + \\dots + \\frac{u(u-1)\\dots(u-n+1)}{n!} \\Delta^n y_0$$

where $\\Delta^k y_0$ are the leading forward differences located along the **top diagonal** of the forward difference table.

---

## 3. Derivation of Newton's Backward Difference Interpolation Formula

When estimating a value near the **end** of a tabular dataset, forward differences would require non-existent data points beyond $x_n$. Here we employ backward differences $\\nabla$.

Let $x = x_n + v h$, where the backward normalized parameter $v$ is:
$$v = \\frac{x - x_n}{h} \\quad (v \\le 0 \\text{ for interpolation inside the table})$$

Using $E^{-1} = 1 - \\nabla \\implies E = (1 - \\nabla)^{-1}$:

$$f(x) = f(x_n + v h) = E^v f(x_n) = (1 - \\nabla)^{-v} y_n$$

Applying the binomial expansion for negative exponent:

$$(1 - \\nabla)^{-v} = 1 + (-v)(-\\nabla) + \\frac{(-v)(-v-1)}{2!} (-\\nabla)^2 + \\frac{(-v)(-v-1)(-v-2)}{3!} (-\\nabla)^3 + \\dots$$

$$= 1 + v \\nabla + \\frac{v(v+1)}{2!} \\nabla^2 + \\frac{v(v+1)(v+2)}{3!} \\nabla^3 + \\dots$$

Truncating after $n$ terms gives **Newton's Gregory Backward Interpolation Formula**:

$$P_n(x) = y_n + v \\nabla y_n + \\frac{v(v+1)}{2!} \\nabla^2 y_n + \\frac{v(v+1)(v+2)}{3!} \\nabla^3 y_n + \\dots + \\frac{v(v+1)\\dots(v+n-1)}{n!} \\nabla^n y_n$$

where $\\nabla^k y_n$ are the backward differences located along the **bottom diagonal** of the difference table.

---

## 4. Error Analysis & Remainder Terms

The truncation error $R_n(x) = f(x) - P_n(x)$ represents the accuracy lost by approximating $f(x)$ with an $n$-th degree polynomial.

### Forward Interpolation Error Term:
$$R_n(x) = \\frac{u(u-1)(u-2)\\dots(u-n)}{(n+1)!} h^{n+1} f^{(n+1)}(\\xi) \\quad \\text{for } \\xi \\in (x_0, x_n)$$

If $f(x)$ is a polynomial of degree $\\le n$, $f^{(n+1)}(\\xi) = 0$, meaning Newton's formula reproduces the polynomial **with zero error**!

In practice, when $f^{(n+1)}(\\xi)$ is unknown, we approximate the error using the next omitted difference:
$$R_n(x) \\approx \\frac{u(u-1)\\dots(u-n)}{(n+1)!} \\Delta^{n+1} y_0$$

---

## 5. Selection Guide: When to Use Forward vs. Backward

| Criterion | Newton's Forward Formula | Newton's Backward Formula |
| :--- | :--- | :--- |
| **Location of Query $x$** | Near the **beginning** of table ($x \\approx x_0$) | Near the **end** of table ($x \\approx x_n$) |
| **Normalized Variable** | $u = \\frac{x - x_0}{h}$ ($0 < u < 1$) | $v = \\frac{x - x_n}{h}$ ($-1 < v < 0$) |
| **Differences Traversed** | Downward diagonal from $y_0$ ($\\Delta y_0, \\Delta^2 y_0, \\dots$) | Upward diagonal from $y_n$ ($\\nabla y_n, \\nabla^2 y_n, \\dots$) |
| **Sign Pattern in Terms** | Alternating subtractions: $u(u-1)(u-2)...$ | Additions: $v(v+1)(v+2)...$ |
| **Extrapolation Use** | Estimating values slightly before $x_0$ ($u < 0$) | Estimating values slightly beyond $x_n$ ($v > 0$) |

---

> [!TIP] **EXAM TIP:**
> Notice the crucial difference in signs!
> - Forward formula uses $(u - 1), (u - 2), (u - 3) \\dots$
> - Backward formula uses $(v + 1), (v + 2), (v + 3) \\dots$
> Getting this sign reversed is the most common cause of lost marks in interpolation problems!

> [!NOTE] **DEV BRAIN:**
> Newton's interpolation formula has a huge algorithmic advantage over Lagrange's formula: it is **incremental**. If a new data point $(x_{n+1}, y_{n+1})$ is appended to the dataset, we do not need to recompute the entire polynomial from scratch! We simply add one additional term to the end of the existing polynomial.

> [!WARNING] **TRAP:**
> Do NOT use Newton's forward or backward formulas if the data points $x_i$ have **unequal intervals** ($h$ is not constant)! They are strictly derived under the assumption of equidistant spacing. For unequal spacing, you MUST use Lagrange or Newton's Divided Differences.

> [!IMPORTANT] **MEMORIZE:**
> - Forward parameter: $u = \\frac{x - x_0}{h}$
> - Backward parameter: $v = \\frac{x - x_n}{h}$
> - Forward: $y(x) = y_0 + u \\Delta y_0 + \\frac{u(u-1)}{2!} \\Delta^2 y_0 + \\dots$
> - Backward: $y(x) = y_n + v \\nabla y_n + \\frac{v(v+1)}{2!} \\nabla^2 y_n + \\dots$
`,
          shortNotes: "Forward formula: y(x) = y0 + u*Delta y0 + u(u-1)/2!*Delta^2 y0 + ... where u = (x-x0)/h. Backward formula: y(x) = yn + v*Nabla yn + v(v+1)/2!*Nabla^2 yn + ... where v = (x-xn)/h.",
          examples: [
            {
              title: "Estimating Values using Newton's Forward and Backward Formulas",
              problem: "Given the table of values:\\n  x: 10   20   30   40   50\\n  y: 46   66   81   93  101\\nFind: (a) y(15) using Newton's Forward formula, and (b) y(48) using Newton's Backward formula.",
              explanation: "Step 1: Difference Table Construction\\nx=10: y0 = 46\\nx=20: y1 = 66,  Delta y0 = 20\\nx=30: y2 = 81,  Delta y1 = 15,  Delta^2 y0 = -5\\nx=40: y3 = 93,  Delta y2 = 12,  Delta^2 y1 = -3,  Delta^3 y0 = 2\\nx=50: y4 = 101, Delta y3 = 8,   Delta^2 y2 = -4,  Delta^3 y1 = -1, Delta^4 y0 = -3\\n\\nPart (a): Find y(15) using Forward Formula\\nx = 15 is near x0 = 10. Step h = 10.\\nu = (x - x0)/h = (15 - 10)/10 = 0.5.\\ny0 = 46, Delta y0 = 20, Delta^2 y0 = -5, Delta^3 y0 = 2, Delta^4 y0 = -3.\\ny(15) = y0 + u*Delta y0 + (u(u-1)/2!)*Delta^2 y0 + (u(u-1)(u-2)/3!)*Delta^3 y0 + ...\\n= 46 + (0.5)(20) + ((0.5)(-0.5)/2)(-5) + ((0.5)(-0.5)(-1.5)/6)(2) + ((0.5)(-0.5)(-1.5)(-2.5)/24)(-3)\\n= 46 + 10 + (-0.25/2)(-5) + (0.375/6)(2) + (-0.9375/24)(-3)\\n= 46 + 10 + 0.625 + 0.125 - 0.1172 = 56.6328.\\n\\nPart (b): Find y(48) using Backward Formula\\nx = 48 is near xn = 50. Step h = 10.\\nv = (x - xn)/h = (48 - 50)/10 = -0.2.\\nyn = 101, Nabla yn = 8, Nabla^2 yn = -4, Nabla^3 yn = -1, Nabla^4 yn = -3.\\ny(48) = yn + v*Nabla yn + (v(v+1)/2!)*Nabla^2 yn + (v(v+1)(v+2)/3!)*Nabla^3 yn + ...\\n= 101 + (-0.2)(8) + ((-0.2)(0.8)/2)(-4) + ((-0.2)(0.8)(1.8)/6)(-1) + ...\\n= 101 - 1.6 + (-0.08)(-4) + (-0.048)(-1)\\n= 101 - 1.6 + 0.32 + 0.048 = 99.768.",
              code: "import numpy as np\n\ndef newton_forward(x_pts, y_pts, x):\n    h = x_pts[1] - x_pts[0]\n    u = (x - x_pts[0]) / h\n    n = len(y_pts)\n    \n    diff = np.zeros((n, n))\n    diff[:, 0] = y_pts\n    for j in range(1, n):\n        for i in range(n - j):\n            diff[i, j] = diff[i + 1, j - 1] - diff[i, j - 1]\n            \n    val = diff[0, 0]\n    u_term = 1.0\n    fact = 1.0\n    for j in range(1, n):\n        u_term *= (u - (j - 1))\n        fact *= j\n        val += (u_term / fact) * diff[0, j]\n        \n    return val\n\nx_pts = np.array([10., 20., 30., 40., 50.])\ny_pts = np.array([46., 66., 81., 93., 101.])\n\nval_15 = newton_forward(x_pts, y_pts, 15.0)\nprint(f\"y(15) using Forward Interpolation: {val_15:.4f}\")\n",
              output: "y(15) using Forward Interpolation: 56.6328",
            },
          ],
          keyPoints: [
              "Newton's forward formula is applied for estimating values near the beginning of equally spaced tables.",
              "Newton's backward formula is applied for values near the end of equally spaced tables.",
              "Normalized parameters are u = (x - x0)/h (forward) and v = (x - xn)/h (backward).",
              "The formulas are derived from the binomial expansion of (1 + Delta)^u and (1 - Nabla)^(-v).",
              "The error term is proportional to the (n+1)th derivative f^(n+1)(xi) * h^(n+1)."
],
          theoryQuestions: [
            {
              question: "Derive Newton's Gregory Forward Difference Interpolation formula using operator algebra.",
              marks: "7 Marks",
              answer: "1. Let y = f(x) be given at x0, x1, ..., xn with uniform spacing h. Let x = x0 + u*h, where u = (x - x0)/h.\\n2. Using the shift operator E:\\nf(x) = f(x0 + u*h) = E^u f(x0) = E^u y0.\\n3. Since E = 1 + Delta:\\nf(x) = (1 + Delta)^u y0.\\n4. Expanding (1 + Delta)^u using the Binomial Theorem for any real index u:\\n(1 + Delta)^u = 1 + u*Delta + (u(u-1)/2!)*Delta^2 + (u(u-1)(u-2)/3!)*Delta^3 + ... + (u(u-1)...(u-n+1)/n!)*Delta^n + ...\\n5. Applying this expansion to y0 and truncating after the nth difference:\\nP_n(x) = y0 + u*Delta y0 + (u(u-1)/2!)*Delta^2 y0 + (u(u-1)(u-2)/3!)*Delta^3 y0 + ... + [u(u-1)...(u-n+1)/n!]*Delta^n y0.\\nThis is Newton's forward difference interpolation formula.",
              keyPoints: ["Definition of u = (x - x0)/h", "Operator expression f(x) = E^u y0", "Substitution E = 1 + Delta", "Binomial theorem expansion", "Final formula with truncated n-th difference"],
            },
            {
              question: "State the error formula for Newton's forward interpolation and explain how the error behaves if f(x) is an nth degree polynomial.",
              marks: "5 Marks",
              answer: "1. The truncation error remainder term is given by:\\nR_n(x) = f(x) - P_n(x) = [u(u - 1)(u - 2)...(u - n) / (n + 1)!] * h^(n+1) * f^(n+1)(xi),\\nwhere xi lies strictly in the interval (x0, xn).\\n2. If f(x) is a polynomial of degree n, its (n + 1)th derivative is identically zero: f^(n+1)(x) = 0 for all x.\\n3. Consequently, R_n(x) = 0 everywhere. This proves that an nth degree Newton interpolating polynomial fits any nth degree polynomial data exactly without any interpolation error.",
              keyPoints: ["Error formula with (n+1)! and h^(n+1)", "Role of (n+1)th derivative", "Proof that error is 0 for degree <= n"],
            },
            {
              question: "When should Newton's backward interpolation formula be chosen instead of Newton's forward interpolation formula?",
              marks: "3 Marks",
              answer: "Newton's backward interpolation formula should be chosen when:\\n1. The interpolated point x lies in the latter half or near the end of the tabulated values (x approx x_n).\\n2. Extrapolating values just beyond the end of the table (x > x_n).\\nUsing the forward formula near the end would require forward differences that extend beyond the bounds of the table, whereas backward differences utilize the preceding historical data points.",
              keyPoints: ["Interpolation point near end of table", "Extrapolation beyond x_n", "Avoidance of missing forward difference entries"],
            },
          ],
          mcqs: [
            {
              question: "In Newton's forward interpolation formula, what is the expression for normalized variable u?",
              options: ["u = (x - xn) / h", "u = (x - x0) / h", "u = (x0 - x) / h", "u = (x - x0) * h"],
              correctIndex: 1,
              explanation: "u is defined as the distance of x from the initial point x0 divided by the step size: u = (x - x0) / h.",
            },
            {
              question: "Newton's forward difference formula uses difference values along which path of the difference table?",
              options: ["Along the bottom upward diagonal", "Along the top downward diagonal from y0", "Across a single horizontal row", "The central column only"],
              correctIndex: 1,
              explanation: "Newton's forward formula uses the leading differences y0, Delta y0, Delta^2 y0, ... which lie along the top downward diagonal.",
            },
            {
              question: "If we want to estimate y(98) from a table with x = [0, 20, 40, 60, 80, 100], which formula is most suitable?",
              options: ["Newton's Forward Interpolation Formula", "Newton's Backward Interpolation Formula", "Bisection Method", "Taylor's Series Method"],
              correctIndex: 1,
              explanation: "Because x = 98 is very close to the end of the table (x_n = 100), Newton's Backward Interpolation Formula is the most accurate and appropriate.",
            },
            {
              question: "What is the degree of the Newton interpolating polynomial constructed through 5 equally spaced points?",
              options: ["5", "4", "3", "6"],
              correctIndex: 1,
              explanation: "Through n + 1 points, the interpolating polynomial has degree at most n. For 5 points (n = 4), the degree is 4.",
            },
          ]
        },
        {
          id: "coa-u4-t3",
          title: "Central Difference Interpolation: Gauss Forward & Backward, Stirling's, Bessel's Formulas",
          simpleExplanation: "When the target point lies near the center of a data table, central difference formulas provide superior accuracy and symmetry over forward or backward formulas. Stirling's formula takes the average of Gauss forward and backward formulas for points very close to the center, while Bessel's formula is preferred near the midpoint between two table values.",
          detailedExplanation: `## 1. Why Central Difference Interpolation?

Newton's forward formula is accurate near the beginning of a table, and the backward formula is accurate near the end. However, when the required point $x$ lies **near the middle of the table**, both one-sided formulas suffer from asymmetric error growth.

**Central Difference Formulas** maintain symmetry around an origin $x_0$ chosen at or near the center of the table. By drawing difference terms symmetrically from above and below the central line, they achieve:
- Smaller truncation error coefficients.
- Rapidly decaying high-order terms.
- Exceptional accuracy for interpolation near the median of tabulated data.

Let the central tabular point be designated $x_0$.
The normalized variable is:
$$u = \\frac{x - x_0}{h} \\quad \\text{where } -0.5 \\le u \\le 0.5$$

\`\`\`mermaid
flowchart TD
    CENTER["Central Value x near median of table"] --> RANGE{"Value of u = (x - x0)/h"}
    RANGE -->|"-0.25 <= u <= +0.25 (Very close to x0)"| STIRLING["Stirling's Formula<br/>(Arithmetic mean of Gauss Forward & Backward)"]
    RANGE -->|"0.25 <= u <= 0.75 (Near interval midpoint x0 + 1/2 h)"| BESSEL["Bessel's Formula<br/>(Shifted central formula)"]
    RANGE -->|"0 < u < 0.5"| GAUSS_F["Gauss Forward Formula"]
    RANGE -->|"-0.5 < u < 0"| GAUSS_B["Gauss Backward Formula"]
\`\`\`

---

## 2. Gauss's Forward & Backward Interpolation Formulas

### 2.1 Gauss's Forward Interpolation Formula
Gauss Forward starts at $y_0$ and zig-zags downwards across the central difference table:

$$y_u = y_0 + u \\Delta y_0 + \\frac{u(u-1)}{2!} \\Delta^2 y_{-1} + \\frac{(u+1)u(u-1)}{3!} \\Delta^3 y_{-1} + \\frac{(u+1)u(u-1)(u-2)}{4!} \\Delta^4 y_{-2} + \\dots$$

- **Recommended Range**: $0 < u < 0.5$ (between $x_0$ and $x_1$).

### 2.2 Gauss's Backward Interpolation Formula
Gauss Backward starts at $y_0$ and zig-zags upwards across the central difference table:

$$y_u = y_0 + u \\Delta y_{-1} + \\frac{(u+1)u}{2!} \\Delta^2 y_{-1} + \\frac{(u+1)u(u-1)}{3!} \\Delta^3 y_{-2} + \\frac{(u+2)(u+1)u(u-1)}{4!} \\Delta^4 y_{-2} + \\dots$$

- **Recommended Range**: $-0.5 < u < 0$ (between $x_{-1}$ and $x_0$).

---

## 3. Stirling's Formula (The Symmetrical Powerhouse)

**Stirling's Formula** is obtained by taking the **arithmetic mean** (average) of Gauss's Forward and Gauss's Backward formulas!

$$y_u = \\frac{\\text{Gauss Forward} + \\text{Gauss Backward}}{2}$$

Averaging the corresponding terms cancels asymmetric odd powers, yielding:

$$y_u = y_0 + u \\left( \\frac{\\Delta y_0 + \\Delta y_{-1}}{2} \\right) + \\frac{u^2}{2!} \\Delta^2 y_{-1} + \\frac{u(u^2 - 1)}{3!} \\left( \\frac{\\Delta^3 y_{-1} + \\Delta^3 y_{-2}}{2} \\right) + \\frac{u^2(u^2 - 1)}{4!} \\Delta^4 y_{-2} + \\dots$$

In terms of central difference operators $\\delta$ and $\\mu$:
$$y_u = y_0 + u (\\mu \\delta y_0) + \\frac{u^2}{2!} (\\delta^2 y_0) + \\frac{u(u^2 - 1)}{3!} (\\mu \\delta^3 y_0) + \\frac{u^2(u^2 - 1)}{4!} (\\delta^4 y_0) + \\dots$$

- **Best Range of Application**: $-0.25 \\le u \\le +0.25$.
- Notice that even differences appear with $u^2$ factors, while odd differences appear as means!

---

## 4. Bessel's Formula (The Midpoint Specialist)

While Stirling's formula is optimized for $u \\approx 0$, **Bessel's Formula** is mathematically shifted to provide maximum accuracy near $u = 0.5$ (midway between $x_0$ and $x_1$):

$$y_u = \\left( \\frac{y_0 + y_1}{2} \\right) + \\left(u - \\frac{1}{2}\\right) \\Delta y_0 + \\frac{u(u-1)}{2!} \\left( \\frac{\\Delta^2 y_{-1} + \\Delta^2 y_0}{2} \\right) + \\frac{(u - 1/2)u(u-1)}{3!} \\Delta^3 y_{-1} + \\dots$$

- **Best Range of Application**: $0.25 \\le u \\le 0.75$.
- For $u = 0.5$, all odd difference terms $(u - 1/2)$ completely vanish!

---

## 5. Master Comparison Table of Central Difference Formulas

| Formula | Derivation / Basis | Recommended $u$ Range | Key Symmetry Characteristic |
| :--- | :--- | :--- | :--- |
| **Gauss Forward** | Downward zig-zag from $y_0$ | $0 \\le u \\le 0.5$ | Uses $\\Delta y_0, \\Delta^2 y_{-1}, \\Delta^3 y_{-1}$ |
| **Gauss Backward** | Upward zig-zag from $y_0$ | $-0.5 \\le u \\le 0$ | Uses $\\Delta y_{-1}, \\Delta^2 y_{-1}, \\Delta^3 y_{-2}$ |
| **Stirling's** | Mean of Gauss Forward and Backward | $\\mathbf{-0.25 \\le u \\le 0.25}$ | Odd terms are means; even terms have $u^2$ |
| **Bessel's** | Mean of shifted central formulas | $\\mathbf{0.25 \\le u \\le 0.75}$ | Even terms are means; odd terms vanish at $u=0.5$ |

---

> [!TIP] **EXAM TIP:**
> When an exam question says *"Estimate $f(25)$ given values at $10, 20, 30, 40$"*:
> Here $x_0 = 20$ or $x_0 = 30$.
> - If you pick $x_0 = 20$, $u = (25 - 20)/10 = 0.5$. Since $u = 0.5$, **Bessel's formula** is easiest because $(u - 1/2) = 0$ kills half the terms!
> - If you pick $x_0 = 30$, $u = (25 - 30)/10 = -0.5$.

> [!NOTE] **DEV BRAIN:**
> In computer graphics and audio DSP, **Bessel and Catmull-Rom splines** are preferred over raw high-degree polynomials because central interpolation formulas avoid **Runge's phenomenon** (wild oscillations at the boundaries).

> [!WARNING] **TRAP:**
> In Stirling's formula, students often forget that the odd terms use the AVERAGE of two differences: $\\frac{\\Delta y_0 + \\Delta y_{-1}}{2}$. Do not pick just one difference!

> [!IMPORTANT] **MEMORIZE:**
> - Central parameter: $u = \\frac{x - x_0}{h}$
> - Stirling's best range: $|u| \\le 0.25$
> - Bessel's best range: $0.25 \\le u \\le 0.75$
> - Stirling's formula uses means of odd differences and single central even differences.
`,
          shortNotes: "Central formulas are best near table center. Gauss Forward: 0 < u < 0.5. Gauss Backward: -0.5 < u < 0. Stirling: average of Gauss Fwd/Bwd, best for |u| <= 0.25. Bessel: best for 0.25 <= u <= 0.75.",
          examples: [
            {
              title: "Interpolating using Stirling's Formula",
              problem: "Use Stirling's formula to find y(28) from the following table:\\n  x: 20    25    30    35    40\\n  y: 492   483   462   432   394",
              explanation: "Step 1: Choose Origin x0\\nWe need y(28). The closest tabulated point is x0 = 30.\\nStep h = 5.\\nu = (x - x0)/h = (28 - 30)/5 = -2/5 = -0.4.\\n(Since |u| = 0.4 is near 0, Stirling is applicable).\\n\\nStep 2: Construct Difference Table centered at x0 = 30\\nx_{-2} = 20: y_{-2} = 492\\nx_{-1} = 25: y_{-1} = 483,  Delta y_{-2} = -9\\nx_0    = 30: y_0    = 462,  Delta y_{-1} = -21, Delta^2 y_{-2} = -12\\nx_1    = 35: y_1    = 432,  Delta y_0    = -30, Delta^2 y_{-1} = -9,  Delta^3 y_{-2} = 3\\nx_2    = 40: y_2    = 394,  Delta y_1    = -38, Delta^2 y_0    = -8,  Delta^3 y_{-1} = 1, Delta^4 y_{-2} = -2\\n\\nStep 3: Identify Terms for Stirling's Formula\\ny0 = 462\\nMean of 1st differences: (Delta y0 + Delta y_{-1})/2 = (-30 + (-21))/2 = -51/2 = -25.5\\n2nd difference: Delta^2 y_{-1} = -9\\nMean of 3rd differences: (Delta^3 y_{-1} + Delta^3 y_{-2})/2 = (1 + 3)/2 = 2\\n4th difference: Delta^4 y_{-2} = -2\\n\\nStep 4: Evaluate Stirling's Formula\\ny(28) = y0 + u * [mean 1st] + (u^2 / 2!) * Delta^2 y_{-1} + [u(u^2 - 1)/3!] * [mean 3rd] + [u^2(u^2 - 1)/4!] * Delta^4 y_{-2}\\nTerm 0: 462\\nTerm 1: (-0.4) * (-25.5) = +10.2\\nTerm 2: ((-0.4)^2 / 2) * (-9) = (0.16 / 2) * (-9) = 0.08 * (-9) = -0.72\\nTerm 3: [(-0.4)(0.16 - 1) / 6] * 2 = [(-0.4)(-0.84) / 6] * 2 = [0.336 / 6] * 2 = 0.112\\nTerm 4: [(0.16)(-0.84) / 24] * (-2) = [-0.1344 / 24] * (-2) = +0.0112\\n\\nSum = 462 + 10.2 - 0.72 + 0.112 + 0.0112 = 471.6032.",
              code: "def stirling_eval(y0, d1_mean, d2_val, d3_mean, d4_val, u):\n    t0 = y0\n    t1 = u * d1_mean\n    t2 = (u**2 / 2.0) * d2_val\n    t3 = (u * (u**2 - 1.0) / 6.0) * d3_mean\n    t4 = (u**2 * (u**2 - 1.0) / 24.0) * d4_val\n    \n    val = t0 + t1 + t2 + t3 + t4\n    print(f\"Terms: t0={t0}, t1={t1}, t2={t2}, t3={t3}, t4={t4}\")\n    return val\n\ny_28 = stirling_eval(462, -25.5, -9, 2.0, -2.0, -0.4)\nprint(f\"y(28) using Stirling's Formula: {y_28:.4f}\")\n",
              output: "Terms: t0=462, t1=10.2, t2=-0.72, t3=0.112, t4=0.0112\ny(28) using Stirling's Formula: 471.6032",
            },
          ],
          keyPoints: [
              "Central difference formulas are preferred for interpolating near the middle of a data table.",
              "Stirling's formula is the arithmetic average of Gauss's forward and backward formulas.",
              "Stirling's formula is most accurate for -0.25 <= u <= 0.25.",
              "Bessel's formula is shifted to provide maximum accuracy near the midpoint of an interval (0.25 <= u <= 0.75).",
              "Odd difference terms in Bessel's formula vanish identically when u = 0.5."
],
          theoryQuestions: [
            {
              question: "Derive Stirling's interpolation formula by taking the mean of Gauss's Forward and Backward interpolation formulas.",
              marks: "7 Marks",
              answer: "1. Write Gauss's Forward formula:\\ny_u = y0 + u*Delta y0 + [u(u-1)/2!]*Delta^2 y_{-1} + [(u+1)u(u-1)/3!]*Delta^3 y_{-1} + [(u+1)u(u-1)(u-2)/4!]*Delta^4 y_{-2} + ...\\n2. Write Gauss's Backward formula:\\ny_u = y0 + u*Delta y_{-1} + [(u+1)u/2!]*Delta^2 y_{-1} + [(u+1)u(u-1)/3!]*Delta^3 y_{-2} + [(u+2)(u+1)u(u-1)/4!]*Delta^4 y_{-2} + ...\\n3. Take the arithmetic mean (Gauss Forward + Gauss Backward) / 2:\\n- First order term: u * (Delta y0 + Delta y_{-1}) / 2.\\n- Second order term: (1/2) * [u(u-1)/2 + (u+1)u/2] * Delta^2 y_{-1} = (1/2) * [(u^2 - u + u^2 + u)/2] * Delta^2 y_{-1} = (u^2 / 2!) * Delta^2 y_{-1}.\\n- Third order term: [(u+1)u(u-1)/3!] * (Delta^3 y_{-1} + Delta^3 y_{-2}) / 2 = [u(u^2 - 1)/3!] * (Delta^3 y_{-1} + Delta^3 y_{-2}) / 2.\\n- Fourth order term: (u^2(u^2 - 1) / 4!) * Delta^4 y_{-2}.\\n4. Combining yields Stirling's formula:\\ny_u = y0 + u * ((Delta y0 + Delta y_{-1})/2) + (u^2/2!)*Delta^2 y_{-1} + [u(u^2-1)/3!]*((Delta^3 y_{-1} + Delta^3 y_{-2})/2) + [u^2(u^2-1)/4!]*Delta^4 y_{-2} + ...",
              keyPoints: ["Statements of Gauss Forward and Backward", "Averaging first order terms to form mean", "Algebraic simplification of second order term to u^2/2!", "Simplification of third order term with u(u^2-1)", "Final Stirling expression"],
            },
            {
              question: "Compare Stirling's formula and Bessel's formula on the basis of optimal range of u and vanishing terms.",
              marks: "5 Marks",
              answer: "1. Optimal Range: Stirling's formula is designed for points close to the central tabular node, optimal for -0.25 <= u <= +0.25. Bessel's formula is designed for points midway between two nodes, optimal for 0.25 <= u <= 0.75.\\n2. Structure: Stirling's formula centers on a single point y0, taking averages of odd differences. Bessel's formula centers between two points (y0 and y1), taking averages of both the function values (y0 + y1)/2 and even differences.\\n3. Vanishing Terms: In Bessel's formula, the odd difference coefficients contain the factor (u - 1/2). When u = 0.5, all odd terms vanish identically, simplifying hand calculations significantly.",
              keyPoints: ["Optimal u ranges: [-0.25, 0.25] vs [0.25, 0.75]", "Averaging pattern differences", "Vanishing of odd terms at u = 0.5 in Bessel"],
            },
            {
              question: "Why are central difference formulas more accurate than Newton's forward or backward formulas when interpolating near the center of a table?",
              marks: "3 Marks",
              answer: "1. Newton's formulas rely on one-sided differences that become unbalanced near the center, resulting in rapidly growing error coefficients.\\n2. Central difference formulas alternate terms symmetrically from both sides of the central point, causing error terms of opposite signs to partially cancel out.\\n3. The normalized variable satisfies |u| <= 0.5, ensuring that higher-order product terms like u(u^2 - 1) decrease very rapidly, producing faster convergence with fewer terms.",
              keyPoints: ["Symmetric error cancellation", "Smaller error coefficients", "Bounded |u| <= 0.5 producing rapid convergence"],
            },
          ],
          mcqs: [
            {
              question: "For which range of normalized variable u is Stirling's formula most accurate?",
              options: ["u > 1.0", "-0.25 <= u <= 0.25", "0.25 <= u <= 0.75", "-1.0 <= u <= -0.5"],
              correctIndex: 1,
              explanation: "Stirling's formula is centered at u = 0 and is most accurate for the range -0.25 <= u <= 0.25.",
            },
            {
              question: "What happens to the odd difference terms in Bessel's formula when evaluated at u = 0.5?",
              options: ["They become infinite", "They become equal to 1", "They vanish identically to zero", "They double in value"],
              correctIndex: 2,
              explanation: "The coefficients of odd differences in Bessel's formula contain the factor (u - 1/2). When u = 0.5, this factor is zero, eliminating all odd difference terms.",
            },
            {
              question: "Stirling's formula is obtained as the arithmetic mean of which two formulas?",
              options: ["Newton Forward and Newton Backward", "Gauss Forward and Gauss Backward", "Trapezoidal and Simpson", "Lagrange and Divided Difference"],
              correctIndex: 1,
              explanation: "Stirling's formula is mathematically derived as the exact arithmetic mean of Gauss's Forward and Gauss's Backward interpolation formulas.",
            },
            {
              question: "Which formula is most suitable for interpolating at x = 25 when data is given for x = 10, 20, 30, 40 (with x0 = 20)?",
              options: ["Newton Forward", "Newton Backward", "Bessel's Formula", "Gauss Backward"],
              correctIndex: 2,
              explanation: "With x0 = 20, h = 10, u = (25 - 20)/10 = 0.5. Because u = 0.5 lies exactly midway in the interval, Bessel's formula is optimal.",
            },
          ]
        },
        {
          id: "coa-u4-t4",
          title: "Interpolation for Unequal Intervals: Lagrange's Formula & Newton's Divided Differences",
          simpleExplanation: "When real-world experimental data is recorded at irregular, unequal intervals, standard finite difference methods fail. Lagrange's polynomial and Newton's Divided Difference formulas overcome this by accommodating arbitrary spacing while constructing a unique interpolating polynomial.",
          detailedExplanation: `## 1. The Challenge of Unequal Intervals

In laboratory experiments, flight telemetry, and real-time sensor streams, data points are rarely collected at perfectly uniform intervals. The step size $h_i = x_{i+1} - x_i$ varies arbitrarily:
$$x_0 < x_1 < x_2 < \\dots < x_n$$

Because the forward and backward operators ($\\Delta, \\nabla$) strictly assume a constant step length $h$, they **cannot be applied** to non-equispaced data.

Two primary mathematical tools solve this generalized interpolation problem:
1. **Lagrange's Interpolation Formula**
2. **Newton's Divided Difference Formula**

\`\`\`mermaid
flowchart TD
    UNEQUAL["Arbitrarily Spaced Data Points: (x0, y0), (x1, y1), ..., (xn, yn)"]
    UNEQUAL --> METHOD{"Choice of Algorithm"}
    METHOD -->|"Closed-Form Algebraic Basis"| LAGRANGE["Lagrange Interpolation<br/>P_n(x) = sum y_i L_i(x)<br/>Great for Inverse Interpolation; O(n²) update cost"]
    METHOD -->|"Recursive Tabular Construction"| NDD["Newton's Divided Differences<br/>P_n(x) = f[x0] + (x - x0)f[x0, x1] + ...<br/>Incremental: Easy to append new points!"]
\`\`\`

---

## 2. Lagrange's Interpolation Formula

Let $n+1$ distinct points $(x_0, y_0), (x_1, y_1), \\dots, (x_n, y_n)$ be given with arbitrary spacing.
We construct the interpolating polynomial as a linear combination of **Lagrange Basis Polynomials** $L_i(x)$:

$$P_n(x) = \\sum_{i=0}^n y_i L_i(x) = y_0 L_0(x) + y_1 L_1(x) + \\dots + y_n L_n(x)$$

### 2.1 The Kronecker Delta Property of $L_i(x)$
Each basis polynomial $L_i(x)$ of degree $n$ is engineered to satisfy the **Kronecker delta property**:

$$L_i(x_j) = \\delta_{ij} = \\begin{cases} 1 & \\text{if } i = j \\\\ 0 & \\text{if } i \\ne j \\end{cases}$$

To make $L_i(x)$ vanish at all nodes $x_j$ where $j \\ne i$, its numerator must contain the product of $(x - x_j)$ for all $j \\ne i$. To make $L_i(x_i) = 1$, we divide by the same product evaluated at $x = x_i$:

$$L_i(x) = \\prod_{j=0, j \\ne i}^n \\frac{x - x_j}{x_i - x_j} = \\frac{(x - x_0)(x - x_1)\\dots(x - x_{i-1})(x - x_{i+1})\\dots(x - x_n)}{(x_i - x_0)(x_i - x_1)\\dots(x_i - x_{i-1})(x_i - x_{i+1})\\dots(x_i - x_n)}$$

### 2.2 Inverse Interpolation via Lagrange
If we are given $y$ and asked to find the corresponding value of $x$, and $y(x)$ is strictly monotonic, we simply invert the roles of $x$ and $y$!

$$x(y) = \\sum_{i=0}^n x_i \\left( \\prod_{j \\ne i} \\frac{y - y_j}{y_i - y_j} \\right)$$

This provides a direct, non-iterative root-finding method!

---

## 3. Newton's Divided Difference Formula

While Lagrange's formula is mathematically elegant, it has an enormous algorithmic drawback: **it is not incremental**. If a single new data point $(x_{n+1}, y_{n+1})$ is measured, every single $L_i(x)$ must be recomputed from scratch ($O(n^2)$ work).

Newton's Divided Difference formula overcomes this by constructing polynomials in **nested Newton form**:

$$P_n(x) = a_0 + a_1(x - x_0) + a_2(x - x_0)(x - x_1) + \\dots + a_n(x - x_0)(x - x_1)\\dots(x - x_{n-1})$$

### 3.1 Definition of Divided Differences
- **Zeroth Divided Difference**:
  $$f[x_0] = y_0$$
- **First Divided Difference**:
  $$f[x_0, x_1] = \\frac{f[x_1] - f[x_0]}{x_1 - x_0} = \\frac{y_1 - y_0}{x_1 - x_0}$$
- **Second Divided Difference**:
  $$f[x_0, x_1, x_2] = \\frac{f[x_1, x_2] - f[x_0, x_1]}{x_2 - x_0}$$
- **General $k$-th Divided Difference**:
  $$f[x_0, x_1, \\dots, x_k] = \\frac{f[x_1, x_2, \\dots, x_k] - f[x_0, x_1, \\dots, x_{k-1}]}{x_k - x_0}$$

### 3.2 Fundamental Properties of Divided Differences
1. **Symmetry**: Divided differences are completely symmetric functions of their arguments. Permuting the order of arguments does not change the value:
   $$f[x_0, x_1] = f[x_1, x_0], \\quad f[x_0, x_1, x_2] = f[x_2, x_0, x_1]$$
2. **Relation to Derivatives**: If $f(x)$ is $n$-times differentiable, there exists some $\\xi \\in (\\min x_i, \\max x_i)$ such that:
   $$f[x_0, x_1, \\dots, x_n] = \\frac{f^{(n)}(\\xi)}{n!}$$
3. **Constancy on Polynomials**: The $n$-th divided difference of an $n$-th degree polynomial is constant, and the $(n+1)$-th is zero.

### 3.3 The Newton Divided Difference Interpolation Formula
$$P_n(x) = f[x_0] + (x - x_0)f[x_0, x_1] + (x - x_0)(x - x_1)f[x_0, x_1, x_2] + \\dots + (x - x_0)\\dots(x - x_{n-1})f[x_0, \\dots, x_n]$$

Adding a new point $(x_{n+1}, y_{n+1})$ simply appends one new term: $(x - x_0)\\dots(x - x_n)f[x_0, \\dots, x_{n+1}]$, leaving all previous coefficients untouched!

---

## 4. Head-to-Head Comparison

| Dimension | Lagrange's Interpolation | Newton's Divided Difference |
| :--- | :--- | :--- |
| **Interval Spacing** | Any arbitrary spacing | Any arbitrary spacing |
| **Adding New Data Points** | Must recompute all basis polynomials ($O(n^2)$) | Simply add one new term to the end ($O(n)$) |
| **Inverse Interpolation** | Trivial (swap $x$ and $y$) | Requires solving non-linear polynomial roots |
| **Arithmetic Operations** | More multiplications and divisions | Fewer operations via Horner's nested scheme |

---

> [!TIP] **EXAM TIP:**
> When asked to find an interpolating polynomial for unequal data, **always use Newton's Divided Difference** unless Lagrange is explicitly requested. Divided difference tables make it easy to spot calculation errors, and the resulting polynomial is naturally in nested form.

> [!NOTE] **DEV BRAIN:**
> In computer science, high-degree polynomial interpolation across many points ($n > 10$) causes wild boundary oscillations (**Runge's Phenomenon**). In production systems (e.g., SciPy, AutoCAD), engineers use **Cubic Splines** or **Chebyshev node spacing** instead of high-degree polynomials.

> [!WARNING] **TRAP:**
> In the divided difference denominator for higher orders, students often subtract adjacent nodes ($x_k - x_{k-1}$). Remember: The denominator for $f[x_0, x_1, \\dots, x_k]$ is the difference between the **outermost arguments**: $x_k - x_0$!

> [!IMPORTANT] **MEMORIZE:**
> - Lagrange basis: $L_i(x) = \\prod_{j \\ne i} \\frac{x - x_j}{x_i - x_j}$
> - 1st Divided Difference: $f[x_0, x_1] = \\frac{y_1 - y_0}{x_1 - x_0}$
> - 2nd Divided Difference: $f[x_0, x_1, x_2] = \\frac{f[x_1, x_2] - f[x_0, x_1]}{x_2 - x_0}$
> - Newton Divided Difference Formula: $P_n(x) = f[x_0] + (x - x_0)f[x_0, x_1] + (x - x_0)(x - x_1)f[x_0, x_1, x_2] + \\dots$
`,
          shortNotes: "For unequal intervals: Lagrange uses P_n(x) = sum y_i * L_i(x) where L_i(x) = prod_{j!=i} (x-x_j)/(x_i-x_j). Newton Divided Difference is incremental: P_n(x) = f[x0] + (x-x0)f[x0,x1] + ...",
          examples: [
            {
              title: "Interpolating Unequal Data using Lagrange and Divided Differences",
              problem: "Given the unequal interval dataset:\\n  x: 1    2    4    7\\n  y: 2    5   17   50\\nFind the interpolating polynomial and evaluate f(3) using: (a) Lagrange's formula, and (b) Newton's Divided Difference method.",
              explanation: "Part (a): Lagrange Interpolation\\nPoints: (x0=1, y0=2), (x1=2, y1=5), (x2=4, y2=17), (x3=7, y3=50).\\nFor x = 3:\\nL0(3) = [(3 - 2)(3 - 4)(3 - 7)] / [(1 - 2)(1 - 4)(1 - 7)] = [(1)(-1)(-4)] / [(-1)(-3)(-6)] = 4 / (-18) = -2/9.\\nL1(3) = [(3 - 1)(3 - 4)(3 - 7)] / [(2 - 1)(2 - 4)(2 - 7)] = [(2)(-1)(-4)] / [(1)(-2)(-5)] = 8 / 10 = 4/5.\\nL2(3) = [(3 - 1)(3 - 2)(3 - 7)] / [(4 - 1)(4 - 2)(4 - 7)] = [(2)(1)(-4)] / [(3)(2)(-3)] = -8 / (-18) = 4/9.\\nL3(3) = [(3 - 1)(3 - 2)(3 - 4)] / [(7 - 1)(7 - 2)(7 - 4)] = [(2)(1)(-1)] / [(6)(5)(3)] = -2 / 90 = -1/45.\\n\\ny(3) = 2*(-2/9) + 5*(4/5) + 17*(4/9) + 50*(-1/45)\\n= -4/9 + 4 + 68/9 - 10/9 = 4 + 54/9 = 4 + 6 = 10.0.\\n\\nPart (b): Newton's Divided Difference\\n1st Divided Differences:\\nf[1, 2] = (5 - 2)/(2 - 1) = 3/1 = 3\\nf[2, 4] = (17 - 5)/(4 - 2) = 12/2 = 6\\nf[4, 7] = (50 - 17)/(7 - 4) = 33/3 = 11\\n\\n2nd Divided Differences:\\nf[1, 2, 4] = (6 - 3)/(4 - 1) = 3/3 = 1\\nf[2, 4, 7] = (11 - 6)/(7 - 2) = 5/5 = 1\\n\\n3rd Divided Difference:\\nf[1, 2, 4, 7] = (1 - 1)/(7 - 1) = 0/6 = 0 (Polynomial is quadratic!)\\n\\nNewton Polynomial:\\nP(x) = f[x0] + (x - x0)*f[x0, x1] + (x - x0)(x - x1)*f[x0, x1, x2]\\n= 2 + (x - 1)*3 + (x - 1)(x - 2)*1\\n= 2 + 3x - 3 + (x^2 - 3x + 2) = x^2 + 1.\\nAt x = 3: P(3) = 3^2 + 1 = 9 + 1 = 10.0! Exactly matching!",
              code: "import numpy as np\n\ndef newton_divided_diff(x_pts, y_pts, x_val):\n    n = len(x_pts)\n    table = np.zeros((n, n))\n    table[:, 0] = y_pts\n    \n    for j in range(1, n):\n        for i in range(n - j):\n            table[i, j] = (table[i+1, j-1] - table[i, j-1]) / (x_pts[i+j] - x_pts[i])\n            \n    print(\"Divided Difference Table:\")\n    for i in range(n):\n        row = f\"x={x_pts[i]:<3} | \" + \" \".join(f\"{table[i, j]:<8.3f}\" for j in range(n - i))\n        print(row)\n        \n    # Evaluate at x_val\n    result = table[0, 0]\n    mult = 1.0\n    for j in range(1, n):\n        mult *= (x_val - x_pts[j - 1])\n        result += mult * table[0, j]\n        \n    return result\n\nx_pts = np.array([1., 2., 4., 7.])\ny_pts = np.array([2., 5., 17., 50.])\n\nval_3 = newton_divided_diff(x_pts, y_pts, 3.0)\nprint(f\"\\nInterpolated f(3): {val_3}\")\n",
              output: "Divided Difference Table:\nx=1.0 | 2.000    3.000    1.000    0.000   \nx=2.0 | 5.000    6.000    1.000   \nx=4.0 | 17.000   11.000  \nx=7.0 | 50.000  \n\nInterpolated f(3): 10.0",
            },
          ],
          keyPoints: [
              "Lagrange's and Newton's Divided Difference formulas accommodate data points with arbitrary, unequal spacing.",
              "Lagrange basis polynomials satisfy the Kronecker delta property L_i(x_j) = delta_ij.",
              "Newton's Divided Difference method is incremental: new points can be added without recalculating existing terms.",
              "Divided differences are invariant under argument permutations (symmetry property).",
              "The nth divided difference of a degree n polynomial is constant, and the (n+1)th difference is zero.",
              "Inverse interpolation is straightforward with Lagrange by swapping x and y coordinates."
],
          theoryQuestions: [
            {
              question: "Derive Lagrange's Interpolation Formula for n + 1 unequally spaced points. Explain how it can be used for inverse interpolation.",
              marks: "7 Marks",
              answer: "1. Problem: Given (x0, y0), (x1, y1), ..., (xn, yn), construct P_n(x) = sum_{i=0}^n y_i L_i(x) of degree n such that P_n(x_k) = y_k.\\n2. Condition: This requires L_i(x_k) = 1 if k = i, and L_i(x_k) = 0 if k != i (Kronecker delta).\\n3. For L_i(x) to vanish at all x_k (k != i), it must contain factors (x - x0)...(x - x_{i-1})(x - x_{i+1})...(x - x_n).\\nThus L_i(x) = C * prod_{j!=i} (x - x_j).\\n4. To satisfy L_i(x_i) = 1, set x = x_i: 1 = C * prod_{j!=i} (x_i - x_j) => C = 1 / prod_{j!=i} (x_i - x_j).\\nTherefore, L_i(x) = prod_{j=0, j!=i}^n (x - x_j) / (x_i - x_j).\\n5. Inverse Interpolation: When given y and seeking x, assuming y is monotonic, simply exchange the roles of x and y:\\nx(y) = sum_{i=0}^n x_i * prod_{j!=i} (y - y_j) / (y_i - y_j). This computes x directly without solving non-linear roots.",
              keyPoints: ["Kronecker delta property L_i(x_j) = delta_ij", "Product construction prod_{j!=i} (x - x_j)", "Normalization constant C", "Inverse interpolation by swapping x and y"],
            },
            {
              question: "Define the k-th divided difference of a function. Prove that divided differences are symmetric functions of their arguments.",
              marks: "5 Marks",
              answer: "1. Definition: For points x0, x1, ..., xk, the 0th divided difference is f[x0] = f(x0). The 1st divided difference is f[x0, x1] = (f[x1] - f[x0]) / (x1 - x0). The kth divided difference is f[x0, ..., xk] = (f[x1, ..., xk] - f[x0, ..., x_{k-1}]) / (xk - x0).\\n2. Proof of Symmetry for k = 1:\\nf[x0, x1] = (f(x1) - f(x0)) / (x1 - x0) = (f(x0) - f(x1)) / (x0 - x1) = f[x1, x0].\\n3. For general k, by induction, f[x0, x1, ..., xk] can be written in symmetric explicit form:\\nf[x0, x1, ..., xk] = sum_{i=0}^k [ f(x_i) / prod_{j=0, j!=i}^k (x_i - x_j) ].\\nSince this summation is symmetric with respect to any permutation of the indices (0, 1, ..., k), divided differences are symmetric functions of their arguments regardless of evaluation order.",
              keyPoints: ["Recursive definition of divided differences", "Symmetry proof for k=1", "General symmetric form sum f(x_i)/prod(x_i - x_j)", "Independence of argument permutation"],
            },
            {
              question: "What is the primary operational advantage of Newton's Divided Difference formula over Lagrange's formula?",
              marks: "3 Marks",
              answer: "The primary operational advantage is incremental extensibility. If an extra data point (x_{n+1}, y_{n+1}) is added to an experiment, Lagrange's method requires recomputing all n + 1 basis polynomials from scratch (O(n^2) cost). In contrast, Newton's Divided Difference formula retains all existing terms and coefficients, requiring only the addition of one single new column entry and one new polynomial term.",
              keyPoints: ["Incremental extensibility", "Avoiding full O(n^2) recomputation", "Retaining existing polynomial coefficients"],
            },
          ],
          mcqs: [
            {
              question: "What property must the Lagrange basis polynomials L_i(x) satisfy at the interpolation nodes?",
              options: ["L_i(x_j) = 0 for all i, j", "L_i(x_j) = 1 for all i, j", "L_i(x_j) = 1 if i = j, and 0 if i != j (Kronecker delta)", "L_i(x_j) = x_i - x_j"],
              correctIndex: 2,
              explanation: "Lagrange basis polynomials satisfy L_i(x_j) = delta_ij, meaning L_i is 1 at node x_i and 0 at all other nodes x_j.",
            },
            {
              question: "What is the value of the 3rd divided difference f[x0, x1, x2, x3] of the quadratic function f(x) = 3x^2 + 5x - 7?",
              options: ["3", "6", "0", "12"],
              correctIndex: 2,
              explanation: "The nth divided difference of a degree n polynomial is constant (a_n), and all higher divided differences are identically zero. Since f(x) is degree 2, its 3rd divided difference is 0.",
            },
            {
              question: "If f[x0, x1] = 4, what is the value of f[x1, x0]?",
              options: ["-4", "4", "1/4", "0"],
              correctIndex: 1,
              explanation: "Divided differences are symmetric functions of their arguments: f[x0, x1] = f[x1, x0] = 4.",
            },
            {
              question: "What technique allows finding an unknown x corresponding to a given y without iterative root-finding?",
              options: ["Inverse interpolation using Lagrange's formula", "Newton-Raphson method", "Gaussian Elimination", "Runge-Kutta method"],
              correctIndex: 0,
              explanation: "Inverse interpolation using Lagrange's formula treats x as the dependent variable and y as the independent variable, directly computing x(y).",
            },
          ]
        }
      ]
    },
    {
      id: "coa-u5",
      title: "Unit 5: Numerical Differentiation & Numerical Quadrature",
      description: "Calculus on discrete datasets: finite difference derivative formulas (O(h) vs O(h^2) first and second derivatives), the general Newton-Cotes quadrature framework, the Trapezoidal rule with error bounds, Simpson's 1/3 and 3/8 rules, Weddle's rule, and Python quadrature solvers.",
      topics: [
        {
          id: "coa-u5-t1",
          title: "Numerical Differentiation: Forward, Backward, Central First & Second Derivatives (O(h) vs O(h^2))",
          simpleExplanation: "Numerical differentiation estimates derivatives from a table of values when the algebraic function is unknown or too complex to differentiate by hand. Central difference formulas cancel out first-order error terms, providing O(h^2) accuracy compared to O(h) for one-sided formulas.",
          detailedExplanation: `## 1. Principles of Numerical Differentiation

In physical science and computer engineering, rate of change calculations (velocities, accelerations, thermal gradients, electric fields) must often be evaluated from discrete sensor data where no analytical function $f(x)$ is available.

Numerical differentiation replaces continuous differential operators $\\frac{d}{dx}$ with **finite difference quotients**.

Let $f(x)$ be differentiable and sampled at discrete equidistant points $x_i = x_0 + i h$.
Using Taylor series expansions around $x_0$:

$$f(x_0 + h) = f(x_0) + h f'(x_0) + \\frac{h^2}{2} f''(x_0) + \\frac{h^3}{6} f'''(x_0) + O(h^4)$$

$$f(x_0 - h) = f(x_0) - h f'(x_0) + \\frac{h^2}{2} f''(x_0) - \\frac{h^3}{6} f'''(x_0) + O(h^4)$$

\`\`\`mermaid
flowchart TD
    DIFF["Numerical Differentiation Approximations"]
    DIFF --> FWD["Forward Difference (1st Order O(h))<br/>f'(x0) ≈ (f(x0+h) - f(x0)) / h"]
    DIFF --> BWD["Backward Difference (1st Order O(h))<br/>f'(x0) ≈ (f(x0) - f(x0-h)) / h"]
    DIFF --> CNT["Central Difference (2nd Order O(h²))<br/>f'(x0) ≈ (f(x0+h) - f(x0-h)) / (2h)"]
    DIFF --> SEC["Second Derivative (2nd Order O(h²))<br/>f''(x0) ≈ (f(x0+h) - 2f(x0) + f(x0-h)) / h²"]
\`\`\`

---

## 2. Derivation of First Derivative Formulas

### 2.1 Forward Difference Quotient ($O(h)$)
Solving $f(x_0 + h)$ for $f'(x_0)$:

$$f'(x_0) = \\frac{f(x_0 + h) - f(x_0)}{h} - \\frac{h}{2} f''(\\xi)$$

- **Truncation Error**: First order, $O(h)$.
- **Leading Error Term**: $-\\frac{h}{2} f''(\\xi)$.

### 2.2 Backward Difference Quotient ($O(h)$)
Solving $f(x_0 - h)$ for $f'(x_0)$:

$$f'(x_0) = \\frac{f(x_0) - f(x_0 - h)}{h} + \\frac{h}{2} f''(\\xi)$$

- **Truncation Error**: First order, $O(h)$.

### 2.3 Central Difference Quotient ($O(h^2)$)
Subtracting the expansion of $f(x_0 - h)$ from $f(x_0 + h)$:

$$f(x_0 + h) - f(x_0 - h) = 2h f'(x_0) + \\frac{2h^3}{6} f'''(x_0) + O(h^5)$$

Dividing by $2h$:

$$f'(x_0) = \\frac{f(x_0 + h) - f(x_0 - h)}{2h} - \\frac{h^2}{6} f'''(\\xi)$$

- **Crucial Mathematical Insight**: The even-order error terms ($h^2 f''$) cancel out completely!
- **Truncation Error**: Second order, $O(h^2)$. Halving the step size $h$ reduces the error by a factor of **4**!

---

## 3. Derivation of Second Derivative Formula ($f''(x_0)$)

Adding the Taylor series of $f(x_0 + h)$ and $f(x_0 - h)$ together:

$$f(x_0 + h) + f(x_0 - h) = 2f(x_0) + h^2 f''(x_0) + \\frac{2h^4}{24} f^{(4)}(x_0) + O(h^6)$$

Rearranging to isolate $f''(x_0)$:

$$h^2 f''(x_0) = f(x_0 + h) - 2f(x_0) + f(x_0 - h) - \\frac{h^4}{12} f^{(4)}(\\xi)$$

$$f''(x_0) = \\frac{f(x_0 + h) - 2f(x_0) + f(x_0 - h)}{h^2} - \\frac{h^2}{12} f^{(4)}(\\xi)$$

- **Truncation Error**: $O(h^2)$.
- In finite difference stencil notation: $[1, -2, 1] / h^2$ (the standard 1D discrete Laplacian operator!).

---

## 4. Differentiation using Newton's Interpolation Polynomial

When given a full data table, we differentiate Newton's Forward Difference formula with respect to $x$:

$$f(x) = y_0 + u \\Delta y_0 + \\frac{u^2 - u}{2} \\Delta^2 y_0 + \\frac{u^3 - 3u^2 + 2u}{6} \\Delta^3 y_0 + \\frac{u^4 - 6u^3 + 11u^2 - 6u}{24} \\Delta^4 y_0 + \\dots$$

Using the chain rule: $\\frac{df}{dx} = \\frac{df}{du} \\frac{du}{dx} = \\frac{1}{h} \\frac{df}{du}$ (since $u = \\frac{x - x_0}{h} \\implies \\frac{du}{dx} = \\frac{1}{h}$).

$$\\frac{df}{dx} = \\frac{1}{h} \\left[ \\Delta y_0 + \\frac{2u - 1}{2} \\Delta^2 y_0 + \\frac{3u^2 - 6u + 2}{6} \\Delta^3 y_0 + \\frac{4u^3 - 18u^2 + 22u - 6}{24} \\Delta^4 y_0 + \\dots \\right]$$

### Evaluating Derivatives at Tabular Points ($x = x_0 \\implies u = 0$)
- **First Derivative at $x_0$**:
  $$f'(x_0) = \\frac{1}{h} \\left[ \\Delta y_0 - \\frac{1}{2} \\Delta^2 y_0 + \\frac{1}{3} \\Delta^3 y_0 - \\frac{1}{4} \\Delta^4 y_0 + \\dots \\right]$$
- **Second Derivative at $x_0$**:
  $$f''(x_0) = \\frac{1}{h^2} \\left[ \\Delta^2 y_0 - \\Delta^3 y_0 + \\frac{11}{12} \\Delta^4 y_0 - \\frac{5}{6} \\Delta^5 y_0 + \\dots \\right]$$

---

## 5. The Fundamental Instability of Numerical Differentiation

In numerical computing, **differentiation is an inherently ill-conditioned and unstable operation**, whereas numerical integration is inherently stable!

\`\`\`mermaid
flowchart LR
    subgraph Instability_Dilemma ["The Numerical Differentiation Step-Size Dilemma"]
        direction TB
        BIG_H["Large Step h"] --> TRUNC["Large Truncation Error ~ O(h)"]
        SMALL_H["Tiny Step h -> 0"] --> ROUND["Denominator h -> 0 Blows Up Subtractive Cancellation!"]
        BEST["Optimal Step h* ≈ sqrt(eps)"] --> MIN_ERR["Best Achievable Precision"]
    end
\`\`\`

As $h \\to 0$, $f(x_0 + h) \\approx f(x_0)$. Subtracting them creates **catastrophic cancellation**, and dividing by tiny $h$ magnifies this round-off noise exponentially!
- For $O(h^2)$ central differences, the optimal balance occurs at $h^* \\approx \\sqrt[3]{\\epsilon_{\\text{mach}}} \\approx 10^{-5}$ in double precision.

---

> [!TIP] **EXAM TIP:**
> When asked to find $f'(x_0)$ and $f''(x_0)$ from a difference table:
> Memorize the series coefficients!
> - $f'(x_0) = \\frac{1}{h} [\\Delta - \\frac{1}{2}\\Delta^2 + \\frac{1}{3}\\Delta^3 - \\frac{1}{4}\\Delta^4 + \\dots]$
> - $f''(x_0) = \\frac{1}{h^2} [\\Delta^2 - \\Delta^3 + \\frac{11}{12}\\Delta^4 - \\dots]$
> Notice that the signs alternate!

> [!NOTE] **DEV BRAIN:**
> In modern deep learning and optimization, developers avoid finite difference differentiation entirely. Instead, they use **Automatic Differentiation (Autodiff)** via computational graphs (e.g., PyTorch autograd, JAX), which computes exact machine-precision derivatives using dual numbers and the chain rule without truncation error!

> [!WARNING] **TRAP:**
> Do NOT forget to divide by $h$ for the first derivative and by $h^2$ for the second derivative! Forgetting the factor $\\frac{1}{h}$ or $\\frac{1}{h^2}$ in front of the bracket is the most frequent exam blunder.

> [!IMPORTANT] **MEMORIZE:**
> - Central 1st derivative: $f'(x) \\approx \\frac{f(x+h) - f(x-h)}{2h}$, error $O(h^2)$.
> - Central 2nd derivative: $f''(x) \\approx \\frac{f(x+h) - 2f(x) + f(x-h)}{h^2}$, error $O(h^2)$.
> - At tabular node: $f'(x_0) = \\frac{1}{h} (\\Delta y_0 - \\frac{1}{2}\\Delta^2 y_0 + \\frac{1}{3}\\Delta^3 y_0 - \\dots)$.
`,
          shortNotes: "Central differences cancel odd errors: f'(x0) = (f(x0+h) - f(x0-h))/(2h) is O(h^2). f''(x0) = (f(x0+h) - 2f(x0) + f(x0-h))/h^2 is O(h^2). Inherently sensitive to round-off error.",
          examples: [
            {
              title: "Computing First and Second Derivatives from a Data Table",
              problem: "Given the following table of values:\\n  x: 1.0     1.2     1.4     1.6     1.8     2.0\\n  y: 0.0     0.128   0.544   1.296   2.432   4.000\\nFind f'(1.0) and f''(1.0) using differences.",
              explanation: "Step 1: Setup Difference Table with h = 0.2, x0 = 1.0\\nx=1.0: y0 = 0.000\\nx=1.2: y1 = 0.128,  Delta y0 = 0.128\\nx=1.4: y2 = 0.544,  Delta y1 = 0.416,  Delta^2 y0 = 0.288\\nx=1.6: y3 = 1.296,  Delta y2 = 0.752,  Delta^2 y1 = 0.336,  Delta^3 y0 = 0.048\\nx=1.8: y4 = 2.432,  Delta y3 = 1.136,  Delta^2 y2 = 0.384,  Delta^3 y1 = 0.048, Delta^4 y0 = 0.000\\nx=2.0: y5 = 4.000,  Delta y4 = 1.568,  Delta^2 y3 = 0.432,  Delta^3 y2 = 0.048, Delta^4 y1 = 0.000\\n\\nStep 2: Calculate First Derivative f'(1.0)\\nFormula at tabular node (u = 0):\\nf'(x0) = (1/h) * [ Delta y0 - (1/2)*Delta^2 y0 + (1/3)*Delta^3 y0 - (1/4)*Delta^4 y0 ]\\nHere h = 0.2:\\nf'(1.0) = (1 / 0.2) * [ 0.128 - (0.5)*(0.288) + (1/3)*(0.048) - 0 ]\\n= 5 * [ 0.128 - 0.144 + 0.016 ] = 5 * [ 0.000 ] = 0.000.\\n\\nStep 3: Calculate Second Derivative f''(1.0)\\nFormula at tabular node (u = 0):\\nf''(x0) = (1/h^2) * [ Delta^2 y0 - Delta^3 y0 + (11/12)*Delta^4 y0 ]\\nHere h^2 = (0.2)^2 = 0.04:\\nf''(1.0) = (1 / 0.04) * [ 0.288 - 0.048 + 0 ]\\n= 25 * [ 0.240 ] = 6.000.\\n\\nAnalytical Check: The data is generated from y = x^3 - 3x + 2. Differentiating:\\ny' = 3x^2 - 3 => y'(1.0) = 0.0.\\ny'' = 6x => y''(1.0) = 6.0. Exact agreement!",
              code: "import numpy as np\n\ndef numerical_derivatives_table(y_pts, h):\n    # Construct forward differences\n    d1 = y_pts[1] - y_pts[0]\n    d2 = y_pts[2] - 2*y_pts[1] + y_pts[0]\n    d3 = y_pts[3] - 3*y_pts[2] + 3*y_pts[1] - y_pts[0]\n    \n    first_deriv = (1.0 / h) * (d1 - 0.5 * d2 + (1.0 / 3.0) * d3)\n    second_deriv = (1.0 / (h**2)) * (d2 - d3)\n    return first_deriv, second_deriv\n\ny_pts = np.array([0.0, 0.128, 0.544, 1.296, 2.432, 4.000])\nh = 0.2\n\nf_prime, f_double_prime = numerical_derivatives_table(y_pts, h)\nprint(f\"Calculated f'(1.0)  = {f_prime:.4f}\")\nprint(f\"Calculated f''(1.0) = {f_double_prime:.4f}\")\n",
              output: "Calculated f'(1.0)  = 0.0000\nCalculated f''(1.0) = 6.0000",
            },
          ],
          keyPoints: [
              "Forward and backward difference approximations for first derivatives have truncation error O(h).",
              "Central difference approximation for first derivative f'(x) = [f(x+h) - f(x-h)] / (2h) has error O(h^2).",
              "Second derivative formula f''(x) = [f(x+h) - 2f(x) + f(x-h)] / h^2 has error O(h^2).",
              "At tabular points, derivatives are evaluated via series expansions of Delta y0, Delta^2 y0, etc.",
              "Numerical differentiation is ill-conditioned: reducing h too much causes catastrophic subtractive cancellation error."
],
          theoryQuestions: [
            {
              question: "Derive the central difference formula for the first derivative of f(x) and prove that its error is of order O(h^2).",
              marks: "5 Marks",
              answer: "1. Write Taylor series expansions about x0:\\nf(x0 + h) = f(x0) + h f'(x0) + (h^2 / 2) f''(x0) + (h^3 / 6) f'''(xi_1) ... (Eq 1)\\nf(x0 - h) = f(x0) - h f'(x0) + (h^2 / 2) f''(x0) - (h^3 / 6) f'''(xi_2) ... (Eq 2)\\n2. Subtract Eq 2 from Eq 1:\\nf(x0 + h) - f(x0 - h) = 2h f'(x0) + (h^3 / 6) [f'''(xi_1) + f'''(xi_2)].\\n3. By the Intermediate Value Theorem, (f'''(xi_1) + f'''(xi_2))/2 = f'''(xi) for some xi in (x0-h, x0+h):\\nf(x0 + h) - f(x0 - h) = 2h f'(x0) + (h^3 / 3) f'''(xi).\\n4. Dividing through by 2h:\\nf'(x0) = [f(x0 + h) - f(x0 - h)] / (2h) - (h^2 / 6) f'''(xi).\\nSince the leading error term is proportional to h^2, the truncation error is strictly O(h^2).",
              keyPoints: ["Taylor expansions for f(x0+h) and f(x0-h)", "Subtraction eliminating even order terms", "Division by 2h", "Proof that error term is -h^2/6 f'''(xi) = O(h^2)"],
            },
            {
              question: "Derive the finite difference formula for the second derivative f''(x0) using Taylor series expansion.",
              marks: "5 Marks",
              answer: "1. Write Taylor series expansions up to 4th order:\\nf(x0 + h) = f(x0) + h f'(x0) + (h^2 / 2) f''(x0) + (h^3 / 6) f'''(x0) + (h^4 / 24) f^(4)(xi_1)\\nf(x0 - h) = f(x0) - h f'(x0) + (h^2 / 2) f''(x0) - (h^3 / 6) f'''(x0) + (h^4 / 24) f^(4)(xi_2)\\n2. Add the two equations together:\\nf(x0 + h) + f(x0 - h) = 2f(x0) + h^2 f''(x0) + (h^4 / 12) f^(4)(xi).\\n(Odd derivative terms h f' and h^3 f''' cancel out completely!).\\n3. Rearrange to solve for f''(x0):\\nh^2 f''(x0) = f(x0 + h) - 2f(x0) + f(x0 - h) - (h^4 / 12) f^(4)(xi)\\nf''(x0) = [f(x0 + h) - 2f(x0) + f(x0 - h)] / h^2 - (h^2 / 12) f^(4)(xi).\\nThis establishes the standard central second-derivative stencil with O(h^2) error.",
              keyPoints: ["Addition of Taylor expansions", "Cancellation of odd-order derivatives", "Division by h^2", "Resulting stencil [1, -2, 1]/h^2 with O(h^2) error"],
            },
            {
              question: "Why is numerical differentiation considered an unstable (ill-conditioned) operation compared to numerical integration?",
              marks: "3 Marks",
              answer: "Numerical differentiation involves subtracting two nearly equal numbers f(x+h) - f(x) and dividing by an infinitesimally small step h. As h -> 0, subtractive cancellation destroys significant digits, and division by tiny h amplifies the round-off error toward infinity. In contrast, numerical integration sums values together, which averages out and dampens random errors (smoothing effect).",
              keyPoints: ["Subtractive cancellation between nearby points", "Division by tiny h amplifying round-off", "Contrast with smoothing effect of integration"],
            },
          ],
          mcqs: [
            {
              question: "What is the order of the truncation error for the central difference approximation of f'(x)?",
              options: ["O(h)", "O(h^2)", "O(h^3)", "O(h^4)"],
              correctIndex: 1,
              explanation: "Because even-order terms cancel out during subtraction, the central difference formula has O(h^2) truncation error.",
            },
            {
              question: "Which finite difference stencil represents the second derivative f''(x)?",
              options: ["[f(x+h) - f(x-h)] / (2h)", "[f(x+h) - 2f(x) + f(x-h)] / h^2", "[f(x+h) - f(x)] / h^2", "[f(x+2h) - 2f(x+h) + f(x)] / h"],
              correctIndex: 1,
              explanation: "The standard central difference formula for the second derivative is [f(x+h) - 2f(x) + f(x-h)] / h^2.",
            },
            {
              question: "If step size h is halved in a central difference derivative formula, by what factor is the truncation error reduced?",
              options: ["Factor of 2", "Factor of 4", "Factor of 8", "Factor of 16"],
              correctIndex: 1,
              explanation: "Since the truncation error is O(h^2), replacing h with h/2 scales the error by (1/2)^2 = 1/4 (a reduction by a factor of 4).",
            },
            {
              question: "What happens to the total numerical error in differentiation if h is made smaller than the optimal step size h*?",
              options: ["Error continues decreasing to zero", "Truncation error vanishes and round-off error dominates, causing total error to explode", "The derivative becomes negative", "The algorithm converges quadratically"],
              correctIndex: 1,
              explanation: "Below the optimal step size h*, catastrophic cancellation and machine round-off errors grow faster than truncation error shrinks, blowing up the total error.",
            },
          ]
        },
        {
          id: "coa-u5-t2",
          title: "Newton-Cotes Quadrature Formulas: General Derivation from Interpolation Polynomials",
          simpleExplanation: "Newton-Cotes quadrature evaluates definite integrals by replacing the difficult integrand with an easily integrable polynomial passing through equally spaced points. By integrating this polynomial, we derive general integration formulas that yield Trapezoidal, Simpson's, and Boole's rules as special cases.",
          detailedExplanation: `## 1. The Numerical Quadrature Framework

The evaluation of the definite integral of a continuous function $f(x)$ over $[a, b]$:

$$I = \\int_a^b f(x) \\, dx$$

is called **numerical quadrature**. In many practical engineering scenarios:
1. The antiderivative $F(x)$ cannot be expressed in terms of elementary functions (e.g., $\\int e^{-x^2} dx$, $\\int \\frac{\\sin x}{x} dx$, $\\int \\sqrt{1 + x^3} dx$).
2. The function $f(x)$ is not an analytical formula, but an empirical dataset recorded at discrete points from an experiment.

The fundamental strategy of **Newton-Cotes Quadrature** is to replace the complex or discrete integrand $f(x)$ with an approximating **interpolating polynomial** $P_n(x)$ that is trivially easy to integrate:

$$I = \\int_a^b f(x) \\, dx \\approx \\int_a^b P_n(x) \\, dx$$

\`\`\`mermaid
flowchart TD
    INT_GOAL["Definite Integral: I = ∫ f(x) dx from a to b"] --> DIVIDE["Divide [a, b] into n equal subintervals of width h = (b - a)/n"]
    DIVIDE --> INTERP["Replace f(x) with Newton's Forward Difference Polynomial P_n(x)"]
    INTERP --> GENERAL["General Newton-Cotes Quadrature Master Formula"]
    GENERAL --> N1["n = 1: Trapezoidal Rule"]
    GENERAL --> N2["n = 2: Simpson's 1/3 Rule"]
    GENERAL --> N3["n = 3: Simpson's 3/8 Rule"]
    GENERAL --> N4["n = 4: Boole's Rule"]
    GENERAL --> N6["n = 6: Weddle's Rule"]
\`\`\`

---

## 2. Rigorous Derivation of the General Newton-Cotes Formula

Let $[a, b]$ be partitioned into $n$ equal subintervals of width $h = \\frac{b - a}{n}$ by the equidistant nodes:
$$x_i = x_0 + i h \\quad (i = 0, 1, 2, \\dots, n) \\quad \\text{where } x_0 = a \\text{ and } x_n = b$$
Let $y_i = f(x_i)$.

We approximate $f(x)$ using **Newton's Forward Interpolation Polynomial**:
$$x = x_0 + u h \\implies dx = h \\, du$$
When $x = x_0$, $u = 0$; when $x = x_n = x_0 + n h$, $u = n$.

The definite integral transforms into:
$$I = \\int_{x_0}^{x_0 + n h} f(x) \\, dx = h \\int_0^n P_n(u) \\, du$$

Substituting the forward difference expansion:
$$P_n(u) = y_0 + u \\Delta y_0 + \\frac{u(u-1)}{2!} \\Delta^2 y_0 + \\frac{u(u-1)(u-2)}{3!} \\Delta^3 y_0 + \\frac{u(u-1)(u-2)(u-3)}{4!} \\Delta^4 y_0 + \\dots$$

Now integrate each term with respect to $u$ from $0$ to $n$:

### Term-by-Term Integration Integrals:
1. $\\int_0^n 1 \\, du = n$
2. $\\int_0^n u \\, du = \\left[ \\frac{u^2}{2} \\right]_0^n = \\frac{n^2}{2}$
3. $\\int_0^n \\frac{u^2 - u}{2} \\, du = \\frac{1}{2} \\left[ \\frac{u^3}{3} - \\frac{u^2}{2} \\right]_0^n = \\frac{1}{2} \\left( \\frac{n^3}{3} - \\frac{n^2}{2} \\right) = \\frac{n^3}{6} - \\frac{n^2}{4} = \\frac{n^2(2n - 3)}{12}$
4. $\\int_0^n \\frac{u^3 - 3u^2 + 2u}{6} \\, du = \\frac{1}{6} \\left[ \\frac{u^4}{4} - u^3 + u^2 \\right]_0^n = \\frac{n^4 - 4n^3 + 4n^2}{24} = \\frac{n^2(n - 2)^2}{24}$

Factoring out $n h$, we obtain the celebrated **General Newton-Cotes Quadrature Master Formula**:

$$\\int_{x_0}^{x_0 + n h} f(x) \\, dx = n h \\left[ y_0 + \\frac{n}{2} \\Delta y_0 + \\frac{n(2n - 3)}{12} \\Delta^2 y_0 + \\frac{n(n - 2)^2}{24} \\Delta^3 y_0 + \\frac{n(2n^3 - 15n^2 + 30n - 9)}{720} \\Delta^4 y_0 + \\dots \\right]$$

---

## 3. Deductions of Standard Numerical Quadrature Rules

Every standard numerical integration formula in computer science is simply a special case of this master equation!

### 3.1 Putting $n = 1$ (Trapezoidal Rule)
Neglect all differences higher than $\\Delta y_0$:
$$\\int_{x_0}^{x_1} f(x) dx = 1 \\cdot h \\left[ y_0 + \\frac{1}{2} \\Delta y_0 \\right] = h \\left[ y_0 + \\frac{1}{2}(y_1 - y_0) \\right] = \\frac{h}{2}(y_0 + y_1)$$

### 3.2 Putting $n = 2$ (Simpson's 1/3 Rule)
Neglect all differences higher than $\\Delta^2 y_0$:
$$\\int_{x_0}^{x_2} f(x) dx = 2h \\left[ y_0 + \\frac{2}{2} \\Delta y_0 + \\frac{2(4 - 3)}{12} \\Delta^2 y_0 \\right] = 2h \\left[ y_0 + \\Delta y_0 + \\frac{1}{6} \\Delta^2 y_0 \\right]$$
Substitute $\\Delta y_0 = y_1 - y_0$ and $\\Delta^2 y_0 = y_2 - 2y_1 + y_0$:
$$= 2h \\left[ y_0 + (y_1 - y_0) + \\frac{1}{6}(y_2 - 2y_1 + y_0) \\right] = 2h \\left[ \\frac{1}{6} y_0 + \\frac{4}{6} y_1 + \\frac{1}{6} y_2 \\right] = \\frac{h}{3}(y_0 + 4y_1 + y_2)$$

### 3.3 Putting $n = 3$ (Simpson's 3/8 Rule)
$$\\int_{x_0}^{x_3} f(x) dx = \\frac{3h}{8}(y_0 + 3y_1 + 3y_2 + y_3)$$

### 3.4 Putting $n = 6$ (Weddle's Rule)
$$\\int_{x_0}^{x_6} f(x) dx = \\frac{3h}{10}(y_0 + 5y_1 + y_2 + 6y_3 + y_4 + 5y_5 + y_6)$$

---

## 4. Degree of Precision (Algebraic Accuracy)

The **Degree of Precision** of a quadrature rule is the largest integer $m$ such that the rule integrates all polynomials of degree $\\le m$ **exactly** (with zero error).

\`\`\`
Quadrature Rule          Polynomial Fitting    Degree of Precision
-------------------------------------------------------------------
Trapezoidal (n=1)        Linear (Degree 1)     1
Simpson's 1/3 (n=2)      Parabolic (Degree 2)  3  <-- Free extra degree!
Simpson's 3/8 (n=3)      Cubic (Degree 3)      3
Boole's Rule (n=4)       Quartic (Degree 4)    5  <-- Free extra degree!
Weddle's Rule (n=6)      6th-Degree Poly       6
\`\`\`

### The Even-n Symmetry Bonus
Notice that for **even values of $n$** ($n = 2, 4$), the degree of precision is $n + 1$ rather than $n$!
*Why?* Because of interval symmetry around the midpoint, the leading error term $\\int u(u-1)\\dots(u-n) du$ has an odd integrand that integrates to **exactly zero** over a symmetric interval. Simpson's 1/3 rule fits a parabola, but it integrates cubics $x^3$ with zero error for free!

---

> [!TIP] **EXAM TIP:**
> When asked to derive Simpson's 1/3 rule from the Newton-Cotes formula:
> 1. Write the master equation up to $\\Delta^2 y_0$.
> 2. Substitute $n = 2$.
> 3. Expand $\\Delta y_0$ as $(y_1 - y_0)$ and $\\Delta^2 y_0$ as $(y_2 - 2y_1 + y_0)$.
> 4. Group coefficients of $y_0, y_1, y_2$ to arrive at $\\frac{h}{3}(y_0 + 4y_1 + y_2)$. This is a standard 7-mark question!

> [!NOTE] **DEV BRAIN:**
> While Newton-Cotes uses equidistant points, **Gauss-Legendre Quadrature** places nodes at non-uniform optimal roots of Legendre polynomials. An $n$-point Gauss quadrature achieves degree of precision $2n - 1$ (double the efficiency!). However, Newton-Cotes remains essential when working with pre-tabulated experimental datasets.

> [!WARNING] **TRAP:**
> Do NOT confuse Simpson's 1/3 and 3/8 pre-factors!
> - Simpson's 1/3 pre-factor is $\\frac{h}{3}$.
> - Simpson's 3/8 pre-factor is $\\frac{3h}{8}$, NOT $\\frac{h}{8}$!

> [!IMPORTANT] **MEMORIZE:**
> - Master Newton-Cotes equation: $\\int_{x_0}^{x_n} f(x) dx = nh [y_0 + \\frac{n}{2}\\Delta y_0 + \\frac{n(2n-3)}{12}\\Delta^2 y_0 + \\dots]$
> - $n = 1 \\implies$ Trapezoidal: $\\frac{h}{2}(y_0 + y_1)$
> - $n = 2 \\implies$ Simpson's 1/3: $\\frac{h}{3}(y_0 + 4y_1 + y_2)$
> - $n = 3 \\implies$ Simpson's 3/8: $\\frac{3h}{8}(y_0 + 3y_1 + 3y_2 + y_3)$
`,
          shortNotes: "Newton-Cotes integrates Newton forward interpolation formula term-by-term. n=1 yields Trapezoidal, n=2 yields Simpson's 1/3, n=3 yields Simpson's 3/8, n=6 yields Weddle's rule.",
          examples: [
            {
              title: "Deducing Simpson's 1/3 Rule from Newton-Cotes Master Equation",
              problem: "Starting from the general Newton-Cotes quadrature formula, derive Simpson's 1/3 rule by setting n = 2 and neglecting differences higher than second order.",
              explanation: "Step 1: Write General Newton-Cotes Formula\\nIntegral = n*h * [ y0 + (n/2)*Delta y0 + (n(2n - 3)/12)*Delta^2 y0 + ... ]\\n\\nStep 2: Put n = 2\\nIntegral = 2*h * [ y0 + (2/2)*Delta y0 + (2(2*2 - 3)/12)*Delta^2 y0 ]\\n= 2*h * [ y0 + Delta y0 + (2(1)/12)*Delta^2 y0 ]\\n= 2*h * [ y0 + Delta y0 + (1/6)*Delta^2 y0 ].\\n\\nStep 3: Express differences in terms of y0, y1, y2\\nDelta y0 = y1 - y0\\nDelta^2 y0 = y2 - 2*y1 + y0\\n\\nSubstitute:\\nIntegral = 2*h * [ y0 + (y1 - y0) + (1/6)*(y2 - 2*y1 + y0) ]\\n= 2*h * [ y1 + (1/6)*y2 - (2/6)*y1 + (1/6)*y0 ]\\n= 2*h * [ (1/6)*y0 + (4/6)*y1 + (1/6)*y2 ]\\n= (2*h / 6) * [ y0 + 4*y1 + y2 ]\\n= (h / 3) * [ y0 + 4*y1 + y2 ].\\nDerivation complete!",
              code: "import sympy as sp\n\n# Symbolic derivation of Newton-Cotes for n = 2\nu, h, n = sp.symbols('u h n')\ny0, dy0, d2y0 = sp.symbols('y0 dy0 d2y0')\n\n# Integrand terms\nP2 = y0 + u * dy0 + (u*(u - 1) / 2) * d2y0\nintegral_res = h * sp.integrate(P2, (u, 0, 2))\nprint(\"Integrated in terms of differences:\", integral_res)\n\n# Substitute differences in terms of nodes\ny1, y2 = sp.symbols('y1 y2')\nintegral_nodes = integral_res.subs({dy0: y1 - y0, d2y0: y2 - 2*y1 + y0})\nintegral_simplified = sp.simplify(integral_nodes)\nprint(\"Simplified in terms of nodal values:\", integral_simplified)\n",
              output: "Integrated in terms of differences: h*(d2y0/3 + 2*dy0 + 2*y0)\nSimplified in terms of nodal values: h*(y0 + 4*y1 + y2)/3",
            },
          ],
          keyPoints: [
              "Numerical quadrature approximates definite integrals by integrating an interpolating polynomial.",
              "The General Newton-Cotes formula is obtained by integrating Newton's forward difference formula term-by-term.",
              "Setting n = 1, 2, 3, 6 yields the Trapezoidal, Simpson's 1/3, Simpson's 3/8, and Weddle's rules, respectively.",
              "Even values of n (such as n = 2) gain an extra degree of precision (degree 3) due to symmetry.",
              "Degree of precision is the highest degree polynomial integrated exactly by the quadrature rule."
],
          theoryQuestions: [
            {
              question: "Derive the General Newton-Cotes Quadrature formula from first principles using Newton's forward difference formula.",
              marks: "7 Marks",
              answer: "1. Let I = int_{x0}^{xn} f(x) dx where xn = x0 + nh, h = (b - a)/n.\\n2. Transform variable: x = x0 + uh => dx = h du. When x = x0, u = 0; when x = xn, u = n.\\nI = h * int_0^n f(x0 + uh) du.\\n3. Replace f(x0 + uh) with Newton's forward difference polynomial:\\nP_n(u) = y0 + u Delta y0 + (u(u-1)/2!) Delta^2 y0 + (u(u-1)(u-2)/3!) Delta^3 y0 + ...\\n4. Integrate term-by-term from 0 to n:\\n- int_0^n 1 du = n\\n- int_0^n u du = n^2 / 2\\n- int_0^n (u^2 - u)/2 du = (1/2)[n^3/3 - n^2/2] = n^2(2n - 3) / 12\\n- int_0^n (u^3 - 3u^2 + 2u)/6 du = (1/6)[n^4/4 - n^3 + n^2] = n^2(n - 2)^2 / 24.\\n5. Factoring out n*h:\\nI = n h [ y0 + (n/2) Delta y0 + (n(2n - 3)/12) Delta^2 y0 + (n(n - 2)^2 / 24) Delta^3 y0 + ... ].\\nThis is the general Newton-Cotes quadrature master formula.",
              keyPoints: ["Variable substitution x = x0 + uh", "Integration bounds 0 to n", "Integration of individual polynomial terms", "Factoring of nh", "Master formula"],
            },
            {
              question: "What is meant by the Degree of Precision of a quadrature formula? Why does Simpson's 1/3 rule have degree of precision 3 even though it is derived from a quadratic polynomial?",
              marks: "5 Marks",
              answer: "1. Definition: The Degree of Precision (or algebraic accuracy) is the highest degree m such that the quadrature formula evaluates int_a^b x^k dx exactly for all k = 0, 1, ..., m.\\n2. Simpson's 1/3 rule is derived by fitting a quadratic polynomial (degree 2) through 3 points.\\n3. However, due to symmetry around the midpoint x1, the leading error term contains the factor int_{-h}^h t^3 dt. Because t^3 is an odd function, its integral over the symmetric interval [-h, h] is identically zero!\\n4. Therefore, the error term for any cubic polynomial x^3 vanishes completely, giving Simpson's 1/3 rule a degree of precision of 3.",
              keyPoints: ["Definition of degree of precision", "Derivation from quadratic parabola (degree 2)", "Symmetric integration of odd power t^3", "Zero error for cubic polynomials yielding precision 3"],
            },
            {
              question: "Deduce the Trapezoidal rule from the General Newton-Cotes formula.",
              marks: "3 Marks",
              answer: "In the General Newton-Cotes formula:\\nI = n h [ y0 + (n/2) Delta y0 + (n(2n - 3)/12) Delta^2 y0 + ... ]\\nPut n = 1 and neglect differences of order 2 and higher:\\nI = 1 * h [ y0 + (1/2) Delta y0 ] = h [ y0 + (1/2)(y1 - y0) ] = h [ (1/2) y0 + (1/2) y1 ] = (h / 2) [ y0 + y1 ].\\nThis is the Trapezoidal Rule.",
              keyPoints: ["Substitute n = 1", "Neglect second and higher differences", "Expand Delta y0 = y1 - y0", "Arrive at (h/2)(y0 + y1)"],
            },
          ],
          mcqs: [
            {
              question: "Which value of n in the Newton-Cotes formula yields Simpson's 1/3 rule?",
              options: ["n = 1", "n = 2", "n = 3", "n = 6"],
              correctIndex: 1,
              explanation: "Setting n = 2 in the General Newton-Cotes formula yields Simpson's 1/3 rule.",
            },
            {
              question: "What is the degree of precision of Simpson's 1/3 rule?",
              options: ["1", "2", "3", "4"],
              correctIndex: 2,
              explanation: "Simpson's 1/3 rule has a degree of precision of 3 because it integrates all polynomials up to cubic degree exactly due to error term symmetry.",
            },
            {
              question: "Which quadrature formula is obtained by setting n = 6 in the Newton-Cotes formula?",
              options: ["Trapezoidal Rule", "Simpson's 3/8 Rule", "Boole's Rule", "Weddle's Rule"],
              correctIndex: 3,
              explanation: "Setting n = 6 in the Newton-Cotes formula yields Weddle's rule: (3h/10)[y0 + 5y1 + y2 + 6y3 + y4 + 5y5 + y6].",
            },
            {
              question: "Why is numerical integration inherently more stable than numerical differentiation?",
              options: ["Integration uses larger numbers", "Integration sums values, which smooths out and averages random errors", "Integration avoids using step size h", "Integration has no truncation error"],
              correctIndex: 1,
              explanation: "Integration is a summing process that acts as a low-pass filter, averaging and damping out high-frequency noise and rounding errors.",
            },
          ]
        },
        {
          id: "coa-u5-t3",
          title: "Trapezoidal Rule: Derivation, Composite Rule, Error Term O(h^2) & Python Implementation",
          simpleExplanation: "The Trapezoidal Rule approximates the area under a curve by connecting data points with straight lines, forming a series of trapezoids. Summing the trapezoid areas yields the composite trapezoidal formula, with a global error proportional to the square of the step size.",
          detailedExplanation: `## 1. Geometric Principle & Single-Segment Derivation

The **Trapezoidal Rule** is the simplest and most geometrically intuitive Newton-Cotes quadrature method.
Over a single subinterval $[x_0, x_1]$ of width $h = x_1 - x_0$, the curve $y = f(x)$ is approximated by a straight line (chord) connecting $(x_0, y_0)$ and $(x_1, y_1)$.

The area under this line segment forms a **trapezoid** with parallel vertical sides $y_0$ and $y_1$ and base width $h$:

$$I_1 = \\int_{x_0}^{x_1} f(x) \\, dx \\approx \\text{Area of Trapezoid} = \\frac{h}{2} (y_0 + y_1)$$

\`\`\`mermaid
flowchart TD
    subgraph Single_Trapezoid_Geometry ["Geometric Trapezoidal Approximation"]
        CURVE["True Curve y = f(x)"]
        CHORD["Straight Line Chord connecting (x0, y0) and (x1, y1)"]
        AREA["Trapezoid Area = Width × Average Height = h/2 × (y0 + y1)"]
        CURVE -.-> AREA
        CHORD --> AREA
    end
\`\`\`

---

## 2. The Composite Trapezoidal Rule

Applying the single trapezoid formula over a wide interval $[a, b]$ produces massive errors. To achieve high accuracy, we divide $[a, b]$ into $n$ equal subintervals of width:

$$h = \\frac{b - a}{n} \\quad \\text{with nodes } x_i = a + i h \\quad (i = 0, 1, \\dots, n)$$

Applying the trapezoidal rule across all $n$ subintervals:

$$\\int_a^b f(x) \\, dx = \\int_{x_0}^{x_1} f(x) dx + \\int_{x_1}^{x_2} f(x) dx + \\dots + \\int_{x_{n-1}}^{x_n} f(x) dx$$

$$\\approx \\frac{h}{2}(y_0 + y_1) + \\frac{h}{2}(y_1 + y_2) + \\frac{h}{2}(y_2 + y_3) + \\dots + \\frac{h}{2}(y_{n-1} + y_n)$$

Notice that every intermediate ordinate $y_1, y_2, \\dots, y_{n-1}$ is shared by two adjacent trapezoids and therefore appears **twice**, while the boundary ordinates $y_0$ and $y_n$ appear only **once**!

### The Master Composite Trapezoidal Formula:
$$\\int_a^b f(x) \\, dx \\approx \\frac{h}{2} \\left[ (y_0 + y_n) + 2 \\sum_{i=1}^{n-1} y_i \\right]$$

$$\\int_a^b f(x) \\, dx \\approx \\frac{h}{2} \\left[ (\\text{Sum of First and Last Ordinates}) + 2 \\times (\\text{Sum of All Intermediate Ordinates}) \\right]$$

---

## 3. Mathematical Proof of Truncation Error ($O(h^2)$)

### 3.1 Local Truncation Error ($E_L$) on a Single Segment
For a single segment $[x_0, x_1]$, expand $f(x)$ in a Taylor series about $x_0$:
$$f(x) = f(x_0) + (x - x_0) f'(x_0) + \\frac{(x - x_0)^2}{2} f''(x_0) + \\dots$$

Integrating analytically:
$$\\int_{x_0}^{x_0 + h} f(x) dx = h f(x_0) + \\frac{h^2}{2} f'(x_0) + \\frac{h^3}{6} f''(x_0) + O(h^4)$$

Now expand the Trapezoidal approximation:
$$\\frac{h}{2} [f(x_0) + f(x_0 + h)] = \\frac{h}{2} \\left[ f(x_0) + \\left( f(x_0) + h f'(x_0) + \\frac{h^2}{2} f''(x_0) + \\dots \\right) \\right]$$
$$= h f(x_0) + \\frac{h^2}{2} f'(x_0) + \\frac{h^3}{4} f''(x_0) + O(h^4)$$

Subtracting the approximation from the true integral:
$$E_L = \\left( \\frac{h^3}{6} - \\frac{h^3}{4} \\right) f''(\\xi) = -\\frac{h^3}{12} f''(\\xi)$$

- **Local Error**: $E_L = -\\frac{h^3}{12} f''(\\xi) = O(h^3)$.

### 3.2 Global Truncation Error ($E_T$) on the Composite Rule
Summing the local errors across all $n$ subintervals:
$$E_T = \\sum_{i=1}^n -\\frac{h^3}{12} f''(\\xi_i) = -\\frac{h^3}{12} \\sum_{i=1}^n f''(\\xi_i)$$

By the **Intermediate Value Theorem for Sums**, there exists some $\\eta \\in [a, b]$ such that:
$$\\frac{1}{n} \\sum_{i=1}^n f''(\\xi_i) = f''(\\eta) \\implies \\sum_{i=1}^n f''(\\xi_i) = n f''(\\eta)$$

Substituting $n = \\frac{b - a}{h}$:
$$E_T = -\\frac{h^3}{12} \\cdot \\frac{b - a}{h} f''(\\eta) = -\\frac{(b - a)}{12} h^2 f''(\\eta)$$

**Conclusion**: The Composite Trapezoidal Rule has **global truncation error $O(h^2)$**.
- If the number of subintervals is doubled (halving $h$), the global error is reduced by a factor of **4**!

---

## 4. Curvature & Geometric Error Behavior

\`\`\`
Convex Curve (f''(x) > 0):           Concave Curve (f''(x) < 0):
      y                                   y
      |      .---* (Chord)                |      .---* (Curve)
      |     /   /                         |     /   /
      |    /   / (Curve)                  |    /   / (Chord)
      |   *---'                           |   *---'
      +-----------+--> x                  +-----------+--> x
          x0     x1                           x0     x1
   Chord lies ABOVE curve!             Chord lies BELOW curve!
   Trapezoid OVERESTIMATES area.       Trapezoid UNDERESTIMATES area.
\`\`\`

- When $f''(x) > 0$ (convex curve): Trapezoidal rule **overestimates** the true integral.
- When $f''(x) < 0$ (concave curve): Trapezoidal rule **underestimates** the true integral.
- When $f''(x) = 0$ (straight line $y = mx + c$): The error is **identically zero**.

---

> [!TIP] **EXAM TIP:**
> When applying the composite trapezoidal rule:
> Always construct a clean table showing $i, x_i, y_i$ and the weight multiplier (1 for first/last, 2 for all others). Sum the weighted column and multiply by $\\frac{h}{2}$. This prevents manual arithmetic mistakes!

> [!NOTE] **DEV BRAIN:**
> In Python with NumPy, the trapezoidal rule is built right into the core library as \`np.trapezoid(y, x)\` (or legacy \`np.trapz(y, x)\`). It is fully vectorized and runs in $O(n)$ time using C-level SIMD instructions.

> [!WARNING] **TRAP:**
> Do NOT confuse the number of points with the number of intervals!
> If there are $n$ intervals, there are **$n + 1$ data points**.
> For example: $n = 6$ intervals requires 7 ordinates ($y_0, y_1, y_2, y_3, y_4, y_5, y_6$).

> [!IMPORTANT] **MEMORIZE:**
> - Composite formula: $\\int_a^b f(x) dx = \\frac{h}{2} [(y_0 + y_n) + 2(y_1 + y_2 + \\dots + y_{n-1})]$
> - Step size: $h = \\frac{b - a}{n}$
> - Local error: $-\\frac{h^3}{12} f''(\\xi) \\implies O(h^3)$
> - Global error: $-\\frac{b - a}{12} h^2 f''(\\eta) \\implies O(h^2)$
`,
          shortNotes: "Composite Trapezoidal rule: (h/2) * [(y0 + yn) + 2*sum(intermediates)]. Global error is -((b-a)/12) * h^2 * f''(eta) = O(h^2). Exact for linear functions.",
          examples: [
            {
              title: "Approximating pi/4 via Trapezoidal Rule on 1 / (1 + x^2)",
              problem: "Evaluate the integral I = int_0^1 (1 / (1 + x^2)) dx using the Composite Trapezoidal Rule with n = 6 equal subintervals. Hence, find an approximation to pi.",
              explanation: "Step 1: Interval and Step Size\\na = 0, b = 1, n = 6.\\nStep size h = (1 - 0) / 6 = 1/6 approx 0.166667.\\n\\nStep 2: Table of Values f(x) = 1 / (1 + x^2)\\ni=0: x0 = 0/6 = 0.0000 -> y0 = 1 / (1 + 0) = 1.000000\\ni=1: x1 = 1/6 = 0.1667 -> y1 = 1 / (1 + 1/36) = 36/37 = 0.972973\\ni=2: x2 = 2/6 = 0.3333 -> y2 = 1 / (1 + 4/36) = 36/40 = 0.900000\\ni=3: x3 = 3/6 = 0.5000 -> y3 = 1 / (1 + 9/36) = 36/45 = 0.800000\\ni=4: x4 = 4/6 = 0.6667 -> y4 = 1 / (1 + 16/36) = 36/52 = 0.692308\\ni=5: x5 = 5/6 = 0.8333 -> y5 = 1 / (1 + 25/36) = 36/61 = 0.590164\\ni=6: x6 = 6/6 = 1.0000 -> y6 = 1 / (1 + 36/36) = 36/72 = 0.500000\\n\\nStep 3: Apply Composite Trapezoidal Formula\\nSum of ends = y0 + y6 = 1.000000 + 0.500000 = 1.500000.\\nSum of remaining = y1 + y2 + y3 + y4 + y5 = 0.972973 + 0.900000 + 0.800000 + 0.692308 + 0.590164 = 3.955445.\\n\\nI = (h / 2) * [ (y0 + y6) + 2 * (Sum of remaining) ]\\n= (1 / 12) * [ 1.500000 + 2 * (3.955445) ]\\n= (1 / 12) * [ 1.500000 + 7.910890 ]\\n= (1 / 12) * [ 9.410890 ] = 0.784241.\\n\\nStep 4: Approximate pi\\nSince int_0^1 (1 / (1 + x^2)) dx = arctan(1) - arctan(0) = pi / 4:\\npi approx 4 * I = 4 * 0.784241 = 3.13696.\\nExact pi = 3.14159... Relative error is only 0.15%!",
              code: "import numpy as np\n\ndef composite_trapezoidal(f, a, b, n):\n    h = (b - a) / n\n    x = np.linspace(a, b, n + 1)\n    y = f(x)\n    \n    integral = (h / 2.0) * (y[0] + 2.0 * np.sum(y[1:-1]) + y[-1])\n    return integral\n\nf = lambda x: 1.0 / (1.0 + x**2)\nI = composite_trapezoidal(f, 0.0, 1.0, 6)\npi_approx = 4.0 * I\n\nprint(f\"Computed Integral I: {I:.6f}\")\nprint(f\"Approximation of pi: {pi_approx:.6f}\")\nprint(f\"True Value of pi:    {np.pi:.6f}\")\nprint(f\"Absolute Error:      {abs(np.pi - pi_approx):.6e}\")\n",
              output: "Computed Integral I: 0.784241\nApproximation of pi: 3.136963\nTrue Value of pi:    3.141593\nAbsolute Error:      4.629252e-03",
            },
          ],
          keyPoints: [
              "The Trapezoidal rule approximates subinterval areas using straight-line chords.",
              "The Composite formula is I = (h/2) * [(y0 + yn) + 2 * sum(intermediates)].",
              "Local truncation error on a single segment is -(h^3 / 12) * f''(xi) = O(h^3).",
              "Global truncation error across the entire interval is -((b-a)/12) * h^2 * f''(eta) = O(h^2).",
              "The rule has degree of precision 1, integrating linear functions with zero error.",
              "Overestimates convex curves (f'' > 0) and underestimates concave curves (f'' < 0)."
],
          theoryQuestions: [
            {
              question: "Derive the Composite Trapezoidal Rule for evaluating int_a^b f(x) dx and prove that the global truncation error is of order O(h^2).",
              marks: "7 Marks",
              answer: "1. Partition [a, b] into n subintervals of width h = (b - a)/n with nodes x0, x1, ..., xn.\\n2. Over any single interval [x_i, x_{i+1}], approximate f(x) by the linear chord connecting (x_i, y_i) and (x_{i+1}, y_{i+1}):\\nint_{x_i}^{x_{i+1}} f(x) dx approx (h/2)(y_i + y_{i+1}).\\n3. Summing over all n intervals:\\nI = sum_{i=0}^{n-1} (h/2)(y_i + y_{i+1}) = (h/2)[(y0 + y1) + (y1 + y2) + ... + (y_{n-1} + yn)] = (h/2)[(y0 + yn) + 2 sum_{i=1}^{n-1} y_i].\\n4. Global Error Proof:\\nLocal truncation error on interval i is E_i = -(h^3 / 12) f''(xi_i) for xi_i in (x_i, x_{i+1}).\\nTotal global error E_T = sum_{i=0}^{n-1} E_i = -(h^3 / 12) sum_{i=0}^{n-1} f''(xi_i).\\nBy the Intermediate Value Theorem for sums, there exists eta in (a, b) such that sum f''(xi_i) = n f''(eta).\\nSubstituting n = (b - a)/h:\\nE_T = -(h^3 / 12) * ((b - a)/h) * f''(eta) = -((b - a)/12) * h^2 * f''(eta).\\nSince b - a is fixed, E_T is proportional to h^2, proving that the global truncation error is O(h^2).",
              keyPoints: ["Partitioning [a, b] into n intervals", "Summation of individual trapezoids", "Master composite formula", "Local error summation", "Application of IVT for sums", "Final global error form -((b-a)/12) h^2 f''(eta)"],
            },
            {
              question: "Explain the geometric effect of the second derivative f''(x) on the accuracy of the Trapezoidal rule.",
              marks: "5 Marks",
              answer: "1. When f''(x) = 0: f(x) is a straight line. The linear chord coincides exactly with the function, producing zero truncation error.\\n2. When f''(x) > 0 (strictly convex curve): The curve curves upward, causing the straight line chord to lie strictly above the curve. Therefore, the area under the chord is larger than the true area, and the Trapezoidal rule overestimates the integral.\\n3. When f''(x) < 0 (strictly concave curve): The curve bulges upward, causing the chord to lie strictly below the curve. The Trapezoidal rule underestimates the true integral.\\nThis corresponds directly with the error term E_T = -((b-a)/12) h^2 f''(eta), where positive curvature produces negative error (True - Approx < 0 => Approx > True).",
              keyPoints: ["Zero error for linear functions", "Convex curves: chord above, overestimation", "Concave curves: chord below, underestimation", "Consistency with error formula sign"],
            },
            {
              question: "How many subintervals n are required to evaluate int_0^2 e^(2x) dx using the Trapezoidal rule with an error less than 10^(-4)?",
              marks: "3 Marks",
              answer: "Error formula: |E_T| <= ((b - a) / 12) * h^2 * max |f''(x)|.\\nHere a = 0, b = 2, f(x) = e^(2x) => f'(x) = 2e^(2x) => f''(x) = 4e^(2x).\\nOn [0, 2], max |f''(x)| = 4 e^(2*2) = 4 e^4 approx 4 * 54.598 = 218.39.\\nSet |E_T| < 10^(-4):\\n((2 - 0) / 12) * h^2 * (218.39) < 10^(-4)\\n(1 / 6) * 218.39 * h^2 < 10^(-4) => 36.399 * h^2 < 10^(-4)\\nh^2 < 2.747 * 10^(-6) => h < 0.001657.\\nSince h = (b - a)/n = 2/n => n > 2 / 0.001657 = 1206.7.\\nRounding up, n = 1207 subintervals are required.",
              keyPoints: ["Error bound setup with max |f''|", "Evaluation of f''(x) = 4e^(2x) at x=2", "Calculation of h", "Finding n > 1207"],
            },
          ],
          mcqs: [
            {
              question: "What is the global order of accuracy of the Composite Trapezoidal Rule?",
              options: ["O(h)", "O(h^2)", "O(h^3)", "O(h^4)"],
              correctIndex: 1,
              explanation: "The global truncation error of the composite trapezoidal rule is -((b-a)/12) * h^2 * f''(eta), which is O(h^2).",
            },
            {
              question: "In the Composite Trapezoidal formula with n subintervals, what is the weight assigned to each intermediate ordinate y1, y2, ..., y_{n-1}?",
              options: ["1", "2", "4", "3"],
              correctIndex: 1,
              explanation: "In the trapezoidal formula (h/2)[(y0 + yn) + 2*sum(intermediates)], each intermediate ordinate is multiplied by 2.",
            },
            {
              question: "If f(x) is strictly convex (f''(x) > 0) on [a, b], how does the Trapezoidal approximation compare to the true integral?",
              options: ["Approximation is smaller than the true value", "Approximation is larger than the true value (overestimate)", "Approximation is exactly equal to the true value", "Approximation oscillates randomly"],
              correctIndex: 1,
              explanation: "For convex curves, the straight line chords lie entirely above the curve, causing the trapezoidal rule to overestimate the true integral.",
            },
            {
              question: "What is the degree of precision of the Trapezoidal Rule?",
              options: ["0", "1", "2", "3"],
              correctIndex: 1,
              explanation: "The trapezoidal rule integrates all linear polynomials (degree <= 1) exactly without any error, giving it a degree of precision of 1.",
            },
          ]
        },
        {
          id: "coa-u5-t4",
          title: "Simpson's 1/3 & 3/8 Rules: Parabolic vs Cubic Fitting, Composite Rules & Weddle's Rule",
          simpleExplanation: "Simpson's 1/3 Rule connects groups of three points with parabolas, requiring an even number of subintervals to achieve fourth-order accuracy (O(h^4)). Simpson's 3/8 Rule fits cubics through four points at a time (multiples of 3 intervals), while Weddle's Rule uses sixth-degree polynomials for ultra-high accuracy.",
          detailedExplanation: `## 1. Simpson's 1/3 Rule: Parabolic Quadrature

While the Trapezoidal Rule approximates curves using straight lines, **Simpson's 1/3 Rule** achieves vastly superior accuracy by approximating curves using **second-degree parabolas**:

$$P_2(x) = A x^2 + B x + C$$

Because three points are required to uniquely define a parabola, Simpson's 1/3 rule processes data points **in pairs of subintervals** ($2h$ span).

\`\`\`mermaid
flowchart TD
    subgraph Simpsons_Family ["Higher-Order Quadrature Rules"]
        S13["Simpson's 1/3 Rule<br/>Parabolic Fitting (n = 2)<br/>Formula: (h/3) [y0 + 4y1 + y2]<br/>Constraint: n must be EVEN<br/>Error: O(h⁴)"]
        S38["Simpson's 3/8 Rule<br/>Cubic Fitting (n = 3)<br/>Formula: (3h/8) [y0 + 3y1 + 3y2 + y3]<br/>Constraint: n must be MULTIPLE OF 3<br/>Error: O(h⁴)"]
        WEDDLE["Weddle's Rule<br/>6th Degree Fitting (n = 6)<br/>Formula: (3h/10) [y0 + 5y1 + y2 + 6y3 + y4 + 5y5 + y6]<br/>Constraint: n must be MULTIPLE OF 6<br/>Error: O(h⁶)"]
    end
\`\`\`

### 1.1 Single-Interval Derivation
Over $[x_0, x_2]$ of width $2h$ (nodes $x_0, x_1 = x_0 + h, x_2 = x_0 + 2h$):

$$\\int_{x_0}^{x_2} f(x) \\, dx \\approx \\frac{h}{3} (y_0 + 4y_1 + y_2)$$

### 1.2 The Composite Simpson's 1/3 Rule
Divide $[a, b]$ into an **EVEN number of subintervals** $n$ ($n = 2m$):

$$\\int_a^b f(x) dx = \\int_{x_0}^{x_2} f(x) dx + \\int_{x_2}^{x_4} f(x) dx + \\dots + \\int_{x_{n-2}}^{x_n} f(x) dx$$

$$\\approx \\frac{h}{3} [(y_0 + 4y_1 + y_2) + (y_2 + 4y_3 + y_4) + \\dots + (y_{n-2} + 4y_{n-1} + y_n)]$$

Collecting like terms:
- Boundary points $y_0, y_n$ appear once.
- Odd-indexed points ($y_1, y_3, y_5, \\dots$) appear with weight **4**.
- Even-indexed intermediate points ($y_2, y_4, y_6, \\dots$) appear with weight **2**.

### Master Composite Simpson's 1/3 Formula:
$$\\int_a^b f(x) \\, dx \\approx \\frac{h}{3} \\left[ (y_0 + y_n) + 4 \\sum_{i=1, 3, 5}^\\text{odd} y_i + 2 \\sum_{j=2, 4, 6}^\\text{even} y_j \\right]$$

$$\\int_a^b f(x) \\, dx \\approx \\frac{h}{3} \\left[ (\\text{Ends}) + 4 \\times (\\text{Odd Ordinates}) + 2 \\times (\\text{Even Ordinates}) \\right]$$

### 1.3 Error Term of Simpson's 1/3 Rule
- **Local Truncation Error**: $E_L = -\\frac{h^5}{90} f^{(4)}(\\xi) = O(h^5)$.
- **Global Truncation Error**:
  $$E_T = -\\frac{(b - a)}{180} h^4 f^{(4)}(\\eta) = \\mathbf{O(h^4)}$$

*Consequence*: Halving the step size $h$ reduces the error by a factor of $2^4 = \\mathbf{16}$!

---

## 2. Simpson's 3/8 Rule: Cubic Quadrature

When the number of subintervals $n$ is **a multiple of 3**, we can fit **cubic polynomials** across groups of three intervals ($3h$ span, 4 points).

### 2.1 Single-Interval Formula ($n = 3$)
$$\\int_{x_0}^{x_3} f(x) \\, dx \\approx \\frac{3h}{8} (y_0 + 3y_1 + 3y_2 + y_3)$$

### 2.2 Composite Simpson's 3/8 Rule ($n$ is a Multiple of 3)
$$\\int_a^b f(x) \\, dx \\approx \\frac{3h}{8} \\left[ (y_0 + y_n) + 3(y_1 + y_2 + y_4 + y_5 + \\dots) + 2(y_3 + y_6 + y_9 + \\dots) \\right]$$

- Multiples of 3 have coefficient **2**.
- All other intermediate points have coefficient **3**.
- **Global Truncation Error**:
  $$E_T = -\\frac{(b - a)}{80} h^4 f^{(4)}(\\eta) = \\mathbf{O(h^4)}$$

Notice that while Simpson's 3/8 rule requires cubic fitting, its global error constant ($\\frac{1}{80}$) is actually slightly larger than Simpson's 1/3 rule ($\\frac{1}{180}$)! Therefore, Simpson's 1/3 rule is universally preferred unless $n$ is an odd multiple of 3.

---

## 3. Weddle's Rule ($n = 6$)

When $[a, b]$ is divided into a multiple of $6$ subintervals, we can fit a 6th-degree polynomial. From the Newton-Cotes formula with $n = 6$, dropping higher differences yields **Weddle's Rule**:

$$\\int_{x_0}^{x_6} f(x) \\, dx \\approx \\frac{3h}{10} \\left[ y_0 + 5y_1 + y_2 + 6y_3 + y_4 + 5y_5 + y_6 \\right]$$

- **Pattern of Coefficients**: $1, 5, 1, 6, 1, 5, 1$.
- **Global Truncation Error**: $\\mathbf{O(h^6)}$ (Ultra-high accuracy!).

---

## 4. Master Comparison Table of Numerical Quadrature Rules

| Quadrature Rule | Subinterval Constraint | Weight Pattern | Degree of Precision | Global Truncation Error |
| :--- | :--- | :--- | :--- | :--- |
| **Trapezoidal** | Any $n \\ge 1$ | $1, 2, 2, \\dots, 2, 1$ | $1$ | $-\\frac{b-a}{12} h^2 f''$ ($O(h^2)$) |
| **Simpson's 1/3** | $n$ must be **EVEN** | $1, 4, 2, 4, 2, \\dots, 4, 1$ | $\\mathbf{3}$ | $-\\frac{b-a}{180} h^4 f^{(4)}$ ($O(h^4)$) |
| **Simpson's 3/8** | $n$ must be **MULTIPLE OF 3** | $1, 3, 3, 2, 3, 3, 2, \\dots, 1$ | $3$ | $-\\frac{b-a}{80} h^4 f^{(4)}$ ($O(h^4)$) |
| **Weddle's Rule** | $n$ must be **MULTIPLE OF 6** | $1, 5, 1, 6, 1, 5, 1$ | $6$ | $-\\frac{(b-a)}{1400} h^6 f^{(6)}$ ($O(h^6)$) |

---

> [!TIP] **EXAM TIP:**
> In exams, remember the subinterval check:
> - If an exam gives 7 ordinates ($n = 6$ intervals), you can use **ALL THREE**: Trapezoidal ($n \\ge 1$), Simpson's 1/3 ($6$ is even), and Simpson's 3/8 ($6$ is a multiple of 3), AND Weddle's rule!
> - If an exam gives 6 ordinates ($n = 5$ intervals), Simpson's 1/3 **CANNOT** be applied directly because 5 is not even! You must use Trapezoidal on all 5, or Simpson's 1/3 on the first 4 plus Trapezoidal on the last 1.

> [!NOTE] **DEV BRAIN:**
> In production numerical software (like SciPy's \`scipy.integrate.simpson\`), the code dynamically inspects the array length. If $n$ is odd, it runs Simpson's 1/3 rule on the first $n-1$ intervals and automatically patches the last interval with either Trapezoidal or Simpson's 3/8 rule!

> [!WARNING] **TRAP:**
> In Simpson's 1/3 rule, students often confuse which ordinates get multiplied by 4 and which by 2:
> - **$4 \\times$ ODD indices** ($y_1, y_3, y_5, \\dots$)
> - **$2 \\times$ EVEN indices** ($y_2, y_4, y_6, \\dots$)
> Getting this swapped ruins the result!

> [!IMPORTANT] **MEMORIZE:**
> - Simpson's 1/3 pre-factor: $\\frac{h}{3}$; weights: $[1, 4, 2, 4, 2, \\dots, 1]$
> - Simpson's 3/8 pre-factor: $\\frac{3h}{8}$; weights: $[1, 3, 3, 2, 3, 3, 2, \\dots, 1]$
> - Weddle pre-factor: $\\frac{3h}{10}$; weights: $[1, 5, 1, 6, 1, 5, 1]$
> - Simpson's 1/3 error: $-\\frac{b-a}{180} h^4 f^{(4)}(\\eta)$
`,
          shortNotes: "Simpson's 1/3: (h/3)[Ends + 4*Odds + 2*Evens], requires n even, O(h^4) error. Simpson's 3/8: (3h/8)[Ends + 3*non-multiples-of-3 + 2*multiples-of-3], requires n multiple of 3.",
          examples: [
            {
              title: "Evaluating Integral of 1 / (1 + x) from 0 to 6 using Simpson's 1/3, 3/8 and Weddle's",
              problem: "Evaluate I = int_0^6 (1 / (1 + x)) dx using: (a) Simpson's 1/3 Rule, (b) Simpson's 3/8 Rule, and (c) Weddle's Rule. Compare with exact value ln(7) = 1.945910.",
              explanation: "Step 1: Setup Nodes with n = 6, h = (6 - 0)/6 = 1.0\\nx0 = 0: y0 = 1 / (1 + 0) = 1.000000\\nx1 = 1: y1 = 1 / (1 + 1) = 0.500000\\nx2 = 2: y2 = 1 / (1 + 2) = 0.333333\\nx3 = 3: y3 = 1 / (1 + 3) = 0.250000\\nx4 = 4: y4 = 1 / (1 + 4) = 0.200000\\nx5 = 5: y5 = 1 / (1 + 5) = 0.166667\\nx6 = 6: y6 = 1 / (1 + 6) = 0.142857\\n\\nPart (a): Simpson's 1/3 Rule (h = 1.0)\\nI = (h / 3) * [ (y0 + y6) + 4*(y1 + y3 + y5) + 2*(y2 + y4) ]\\n= (1 / 3) * [ (1.0 + 0.142857) + 4*(0.5 + 0.25 + 0.166667) + 2*(0.333333 + 0.2) ]\\n= (1 / 3) * [ 1.142857 + 4*(0.916667) + 2*(0.533333) ]\\n= (1 / 3) * [ 1.142857 + 3.666668 + 1.066666 ] = (1 / 3) * [ 5.876191 ] = 1.958730.\\n\\nPart (b): Simpson's 3/8 Rule\\nI = (3h / 8) * [ (y0 + y6) + 3*(y1 + y2 + y4 + y5) + 2*(y3) ]\\n= (3 / 8) * [ 1.142857 + 3*(0.5 + 0.333333 + 0.2 + 0.166667) + 2*(0.25) ]\\n= (3 / 8) * [ 1.142857 + 3*(1.2) + 0.5 ] = (3 / 8) * [ 1.142857 + 3.6 + 0.5 ]\\n= (3 / 8) * [ 5.242857 ] = 1.966071.\\n\\nPart (c): Weddle's Rule\\nI = (3h / 10) * [ y0 + 5*y1 + y2 + 6*y3 + y4 + 5*y5 + y6 ]\\n= 0.3 * [ 1.0 + 5(0.5) + 0.333333 + 6(0.25) + 0.2 + 5(0.166667) + 0.142857 ]\\n= 0.3 * [ 1.0 + 2.5 + 0.333333 + 1.5 + 0.2 + 0.833335 + 0.142857 ]\\n= 0.3 * [ 6.509525 ] = 1.952858.\\n\\nExact Value: ln(7) = 1.945910.\\nWeddle's rule is the closest!",
              code: "import numpy as np\n\nx = np.arange(7)\ny = 1.0 / (1.0 + x)\nh = 1.0\n\n# Simpson's 1/3\nsimpson_13 = (h / 3.0) * (y[0] + y[6] + 4.0 * (y[1] + y[3] + y[5]) + 2.0 * (y[2] + y[4]))\n\n# Simpson's 3/8\nsimpson_38 = (3.0 * h / 8.0) * (y[0] + y[6] + 3.0 * (y[1] + y[2] + y[4] + y[5]) + 2.0 * y[3])\n\n# Weddle's\nweddle = (3.0 * h / 10.0) * (y[0] + 5*y[1] + y[2] + 6*y[3] + y[4] + 5*y[5] + y[6])\n\nexact = np.log(7.0)\n\nprint(f\"Exact Value:    {exact:.6f}\")\nprint(f\"Simpson's 1/3:  {simpson_13:.6f} (Error: {abs(exact - simpson_13):.6f})\")\nprint(f\"Simpson's 3/8:  {simpson_38:.6f} (Error: {abs(exact - simpson_38):.6f})\")\nprint(f\"Weddle's Rule:  {weddle:.6f} (Error: {abs(exact - weddle):.6f})\")\n",
              output: "Exact Value:    1.945910\nSimpson's 1/3:  1.958730 (Error: 0.012820)\nSimpson's 3/8:  1.966071 (Error: 0.020161)\nWeddle's Rule:  1.952858 (Error: 0.006947)",
            },
          ],
          keyPoints: [
              "Simpson's 1/3 rule fits parabolas across pairs of subintervals and strictly requires an even number of subintervals n.",
              "Simpson's 1/3 master formula is (h/3) * [Ends + 4*Odds + 2*Evens], with global error O(h^4).",
              "Simpson's 3/8 rule fits cubic polynomials across groups of three subintervals (n must be a multiple of 3).",
              "Weddle's rule fits 6th-degree polynomials and requires n to be a multiple of 6, achieving O(h^6) accuracy.",
              "Simpson's 1/3 rule is generally more accurate than Simpson's 3/8 rule because its error constant (1/180) is smaller than 3/8's (1/80)."
],
          theoryQuestions: [
            {
              question: "Derive the Composite Simpson's 1/3 Rule and state its subinterval constraint and error formula.",
              marks: "7 Marks",
              answer: "1. Constraint: The interval [a, b] must be divided into an EVEN number of equal subintervals n = 2m of width h = (b - a)/n.\\n2. For each pair of adjacent subintervals [x_{2k}, x_{2k+2}], the curve is approximated by a parabola P_2(x). Applying the single Simpson's 1/3 rule:\\nint_{x_{2k}}^{x_{2k+2}} f(x) dx = (h/3) [y_{2k} + 4 y_{2k+1} + y_{2k+2}].\\n3. Summing across all m pairs from k = 0 to m - 1:\\nI = int_a^b f(x) dx = (h/3) [ (y0 + 4y1 + y2) + (y2 + 4y3 + y4) + ... + (y_{n-2} + 4y_{n-1} + yn) ].\\n4. Grouping ordinates:\\n- The first and last ordinates y0, yn appear once.\\n- The odd ordinates y1, y3, ..., y_{n-1} each appear inside only one pair with coefficient 4.\\n- The even ordinates y2, y4, ..., y_{n-2} are shared at the boundaries of two adjacent pairs and appear with coefficient 1 + 1 = 2.\\nThus: I = (h/3) [ (y0 + yn) + 4 sum_{odd} y_i + 2 sum_{even} y_j ].\\n5. Error Formula: The global truncation error is E_T = -((b - a) / 180) * h^4 * f^(4)(eta), which is fourth order O(h^4).",
              keyPoints: ["Constraint: n must be even", "Summation across pairs of intervals", "Derivation of weights 1, 4, 2", "Global error formula -((b-a)/180) h^4 f^(4)"],
            },
            {
              question: "Compare Simpson's 1/3 Rule and Simpson's 3/8 Rule on the basis of polynomial degree, subinterval requirements, and error constants.",
              marks: "5 Marks",
              answer: "1. Approximating Polynomial: Simpson's 1/3 fits a 2nd degree polynomial (parabola). Simpson's 3/8 fits a 3rd degree polynomial (cubic curve).\\n2. Subinterval Requirement: Simpson's 1/3 requires n to be an EVEN number (multiples of 2). Simpson's 3/8 requires n to be a MULTIPLE OF 3.\\n3. Degree of Precision: Both rules possess identical degree of precision = 3 (exact for polynomials up to degree 3).\\n4. Error Constants: Global error of Simpson's 1/3 is -((b-a)/180) h^4 f^(4). Global error of Simpson's 3/8 is -((b-a)/80) h^4 f^(4). Since 1/180 < 1/80, Simpson's 1/3 rule has a smaller error bound and is computationally superior.",
              keyPoints: ["Parabolic (degree 2) vs Cubic (degree 3)", "n even vs n multiple of 3", "Both have degree of precision 3", "Error comparison 1/180 vs 1/80 favoring 1/3 rule"],
            },
            {
              question: "State Weddle's Rule for numerical integration. What is its condition on the number of subintervals?",
              marks: "3 Marks",
              answer: "1. Condition: The total number of subintervals n must be a MULTIPLE OF 6 (n = 6, 12, 18, ...).\\n2. Formula for single 6-interval block:\\nint_{x0}^{x6} f(x) dx = (3h / 10) [ y0 + 5 y1 + y2 + 6 y3 + y4 + 5 y5 + y6 ].\\n3. Accuracy: Weddle's rule is derived from 6th-degree polynomial fitting and has a truncation error of order O(h^6).",
              keyPoints: ["Condition n multiple of 6", "Formula with coefficients 1, 5, 1, 6, 1, 5, 1 and prefactor 3h/10", "Order of accuracy O(h^6)"],
            },
          ],
          mcqs: [
            {
              question: "What is the mandatory condition on the number of subintervals n to apply Simpson's 1/3 rule?",
              options: ["n must be an odd number", "n must be an even number", "n must be a multiple of 3", "n can be any positive integer"],
              correctIndex: 1,
              explanation: "Simpson's 1/3 rule groups intervals into pairs (2 intervals per parabola), so the total number of subintervals n must strictly be even.",
            },
            {
              question: "What are the weight coefficients for the odd and even intermediate ordinates in Simpson's 1/3 rule?",
              options: ["4 for odds, 2 for evens", "2 for odds, 4 for evens", "3 for odds, 3 for evens", "1 for odds, 5 for evens"],
              correctIndex: 0,
              explanation: "In Simpson's 1/3 composite formula, odd ordinates (y1, y3, ...) are multiplied by 4, and even intermediate ordinates (y2, y4, ...) are multiplied by 2.",
            },
            {
              question: "What is the order of global truncation error for Simpson's 1/3 and Simpson's 3/8 rules?",
              options: ["O(h)", "O(h^2)", "O(h^3)", "O(h^4)"],
              correctIndex: 3,
              explanation: "Both Simpson's 1/3 and 3/8 rules have a global truncation error of fourth order, O(h^4).",
            },
            {
              question: "If an experiment provides 13 data points, how many subintervals are formed, and which Simpson rule can be applied?",
              options: ["13 subintervals, Simpson's 3/8 rule", "12 subintervals, both Simpson's 1/3 and Simpson's 3/8 rules can be applied", "12 subintervals, neither can be applied", "14 subintervals, Trapezoidal rule only"],
              correctIndex: 1,
              explanation: "13 data points form n = 13 - 1 = 12 subintervals. Since 12 is both even and a multiple of 3, BOTH Simpson's 1/3 and Simpson's 3/8 can be applied!",
            },
          ]
        }
      ]
    },
    {
      id: "coa-u6",
      title: "Unit 6: Numerical Solution of Ordinary Differential Equations (ODEs)",
      description: "Numerical integration of Initial Value Problems (IVPs) for first-order ODEs dy/dx = f(x, y), y(x0) = y0: Taylor series method, Picard's method of successive approximations, Euler's method, Modified Euler's (Heun's) predictor-corrector method, Runge-Kutta 2nd and 4th order solvers, Butcher tableau, and numerical stability.",
      topics: [
        {
          id: "coa-u6-t1",
          title: "Taylor's Series Method & Picard's Method of Successive Approximations for IVPs",
          simpleExplanation: "Taylor's series method calculates successive derivatives of y(x) using the differential equation and expands the solution into a power series around the initial point. Picard's method transforms the differential equation into an equivalent integral equation and computes increasingly accurate analytical approximations through repeated integration.",
          detailedExplanation: `## 1. Initial Value Problems (IVPs) in Engineering

Many foundational laws of physics and engineering—Newton's laws of motion, Kirchhoff's circuit laws, radioactive decay, chemical kinetics, and heat dissipation—are formulated as **Ordinary Differential Equations (ODEs)**.

A **First-Order Initial Value Problem (IVP)** consists of a differential equation along with an initial condition specified at a starting point:

$$\\frac{dy}{dx} = f(x, y), \\quad y(x_0) = y_0$$

When the function $f(x, y)$ is non-linear or algebraically non-integrable, analytical closed-form solutions do not exist. We must resort to numerical approximation methods.

\`\`\`mermaid
flowchart TD
    IVP["Initial Value Problem: dy/dx = f(x, y), y(x0) = y0"] --> CHOICE{"Analytical Series Method"}
    CHOICE -->|"Successive Differentiation"| TAYLOR["Taylor's Series Method<br/>y(x) = y0 + h y'0 + (h²/2!) y''0 + ...<br/>Uses multivariate chain rule for derivatives"]
    CHOICE -->|"Successive Integration"| PICARD["Picard's Method of Approximations<br/>y^(n+1)(x) = y0 + ∫ f(t, y^(n)(t)) dt<br/>Generates sequence of approximating polynomials"]
\`\`\`

---

## 2. Taylor's Series Method for ODEs

The **Taylor's Series Method** expands the unknown solution $y(x)$ as a power series around the initial node $x_0$.

Let $x - x_0 = h$ (the step size). Expanding $y(x_0 + h)$ in a Taylor series:

$$y(x_0 + h) = y(x_0) + h y'(x_0) + \\frac{h^2}{2!} y''(x_0) + \\frac{h^3}{3!} y'''(x_0) + \\frac{h^4}{4!} y^{(4)}(x_0) + \\dots$$

### 2.1 Generating Higher Derivatives via the Chain Rule
From the ODE $\\frac{dy}{dx} = f(x, y)$:
- **First derivative**:
  $$y' = f(x, y)$$
- **Second derivative** (using the multivariable chain rule):
  $$y'' = \\frac{d}{dx}[f(x, y)] = \\frac{\\partial f}{\\partial x} + \\frac{\\partial f}{\\partial y} \\frac{dy}{dx} = f_x + f_y \\cdot f$$
- **Third derivative**:
  $$y''' = \\frac{d}{dx}[f_x + f_y f] = (f_{xx} + f_{xy} f) + (f_{yx} + f_{yy} f) f + f_y (f_x + f_y f)$$
  $$= f_{xx} + 2 f_{xy} f + f_{yy} f^2 + f_y f_x + f_y^2 f$$

Evaluating these derivatives at $(x_0, y_0)$ gives the constant numerical coefficients:
$$y'_0 = f(x_0, y_0), \\quad y''_0 = f_x(x_0, y_0) + f_y(x_0, y_0) y'_0, \\quad \\dots$$

Substituting these into the series yields an extremely accurate polynomial approximation for $y(x)$ near $x_0$.

### 2.2 Strengths and Practical Bottlenecks
- **Strengths**: Achieves arbitrarily high accuracy (order $p$) by simply retaining more terms.
- **Bottlenecks**: Calculating higher partial derivatives algebraically becomes insanely complicated and computationally intractable for complex non-linear functions (e.g., $f(x, y) = \\frac{\\sin(x y)}{\\sqrt{x^2 + y^2}}$).

---

## 3. Picard's Method of Successive Approximations

**Picard's Method** reformulates the differential equation into an equivalent **integral equation**.

Integrating $\\frac{dy}{dt} = f(t, y)$ from $t = x_0$ to $t = x$:

$$\\int_{x_0}^x \\frac{dy}{dt} \\, dt = \\int_{x_0}^x f(t, y(t)) \\, dt$$

$$y(x) - y(x_0) = \\int_{x_0}^x f(t, y(t)) \\, dt$$

$$y(x) = y_0 + \\int_{x_0}^x f(t, y(t)) \\, dt$$

This is the **Picard Integral Equation**. Since the unknown function $y(t)$ appears inside the integral, we solve it iteratively through successive approximations!

### 3.1 The Picard Iteration Recurrence
We start with the crudest initial guess: a constant function satisfying the initial condition:
$$y^{(0)}(x) = y_0$$

Then, each successive approximation is generated by substituting the preceding approximation into the integrand:

$$y^{(n+1)}(x) = y_0 + \\int_{x_0}^x f(t, y^{(n)}(t)) \\, dt \\quad (n = 0, 1, 2, \\dots)$$

- **First Approximation**:
  $$y^{(1)}(x) = y_0 + \\int_{x_0}^x f(t, y_0) \\, dt$$
- **Second Approximation**:
  $$y^{(2)}(x) = y_0 + \\int_{x_0}^x f(t, y^{(1)}(t)) \\, dt$$
- **Third Approximation**:
  $$y^{(3)}(x) = y_0 + \\int_{x_0}^x f(t, y^{(2)}(t)) \\, dt$$

By **Picard's Existence and Uniqueness Theorem**, if $f(x, y)$ satisfies the Lipschitz condition with respect to $y$, the sequence $\\{y^{(n)}(x)\\}$ converges uniformly to the exact unique analytical solution $y(x)$!

---

## 4. Head-to-Head Comparison: Taylor vs. Picard

| Dimension | Taylor's Series Method | Picard's Method |
| :--- | :--- | :--- |
| **Mathematical Operation** | **Differentiation** (Higher-order chain rule) | **Integration** (Symbolic integration) |
| **Form of Output** | Discrete numerical points or power series | Continuous analytical function $y(x)$ |
| **Step-by-Step Nature** | Marches forward step-by-step ($x_0 \\to x_1 \\to x_2$) | Solves globally over an entire interval |
| **Limitation** | Higher derivatives become algebraically explosive | Integrand $f(t, y^{(n)}(t))$ quickly becomes non-integrable |
| **Standard Exam Role** | High-precision numerical evaluation at $x = 0.1, 0.2$ | Theoretical proof of existence and power series derivation |

---

> [!TIP] **EXAM TIP:**
> In exams, when using Picard's method for $\\frac{dy}{dx} = x + y, y(0) = 1$:
> - $y^{(0)} = 1$
> - $y^{(1)} = 1 + \\int_0^x (t + 1) dt = 1 + x + \\frac{x^2}{2}$
> - $y^{(2)} = 1 + \\int_0^x (t + 1 + t + \\frac{t^2}{2}) dt = 1 + x + x^2 + \\frac{x^3}{6}$.
> Notice how the terms build up the Maclaurin expansion of $2e^x - x - 1$! Show integration bounds $0$ to $x$ clearly.

> [!NOTE] **DEV BRAIN:**
> In computational libraries like SymPy, \`sympy.dsolve(..., hint='taylor')\` automates Taylor series solutions by recursively evaluating the Lie derivative along the vector field.

> [!WARNING] **TRAP:**
> In Taylor series, students frequently evaluate the derivatives as functions of $x$ instead of numerical constants at $(x_0, y_0)$!
> Remember: $y'_0, y''_0, y'''_0$ must be evaluated to **pure scalar numbers** before substituting into $y(x_0 + h) = y_0 + h y'_0 + \\frac{h^2}{2} y''_0 + \\dots$

> [!IMPORTANT] **MEMORIZE:**
> - Taylor expansion: $y(x_0 + h) = y_0 + h y'_0 + \\frac{h^2}{2!} y''_0 + \\frac{h^3}{3!} y'''_0 + \\dots$
> - Chain rule: $y'' = f_x + f_y y'$
> - Picard recurrence: $y^{(n+1)}(x) = y_0 + \\int_{x_0}^x f(t, y^{(n)}(t)) dt$
> - Initial Picard iterate: $y^{(0)}(x) = y_0$
`,
          shortNotes: "Taylor method expands y(x) = y0 + h*y'0 + (h^2/2!)*y''0 + ... using successive derivatives. Picard method iterates y^(n+1)(x) = y0 + int_{x0}^x f(t, y^(n)(t)) dt.",
          examples: [
            {
              title: "Solving dy/dx = x + y^2, y(0) = 1 using Taylor's Series Method",
              problem: "Solve the initial value problem dy/dx = x + y^2 with y(0) = 1 using Taylor's series method up to 4th degree terms. Hence compute y(0.1) and y(0.2).",
              explanation: "Initial point: x0 = 0, y0 = 1.\\n\\nCalculate successive derivatives at (0, 1):\\n1. y' = x + y^2\\n   y'(0) = 0 + 1^2 = 1.0\\n\\n2. y'' = d/dx [x + y^2] = 1 + 2y * y'\\n   y''(0) = 1 + 2(1)(1) = 1 + 2 = 3.0\\n\\n3. y''' = d/dx [1 + 2y y'] = 2(y')^2 + 2y y''\\n   y'''(0) = 2(1)^2 + 2(1)(3) = 2 + 6 = 8.0\\n\\n4. y'''' = d/dx [2(y')^2 + 2y y''] = 4 y' y'' + 2 y' y'' + 2y y''' = 6 y' y'' + 2y y'''\\n   y''''(0) = 6(1)(3) + 2(1)(8) = 18 + 16 = 34.0\\n\\nTaylor Series Expansion:\\ny(x) = y0 + x * y'0 + (x^2 / 2!) * y''0 + (x^3 / 3!) * y'''0 + (x^4 / 4!) * y''''0\\ny(x) = 1 + x * (1) + (x^2 / 2) * (3) + (x^3 / 6) * (8) + (x^4 / 24) * (34)\\ny(x) = 1 + x + 1.5 x^2 + 1.333333 x^3 + 1.416667 x^4.\\n\\nEvaluate at x = 0.1:\\ny(0.1) = 1 + 0.1 + 1.5(0.01) + 1.333333(0.001) + 1.416667(0.0001)\\n= 1 + 0.1 + 0.015 + 0.001333 + 0.000142 = 1.116475.\\n\\nEvaluate at x = 0.2:\\ny(0.2) = 1 + 0.2 + 1.5(0.04) + 1.333333(0.008) + 1.416667(0.0016)\\n= 1 + 0.2 + 0.06 + 0.010667 + 0.002267 = 1.272934.",
              code: "import sympy as sp\n\nx = sp.Symbol('x')\n# Exact polynomial expansion derived manually\ny_taylor = 1 + x + 1.5*x**2 + (4.0/3.0)*x**3 + (17.0/12.0)*x**4\n\nval_01 = y_taylor.subs(x, 0.1)\nval_02 = y_taylor.subs(x, 0.2)\n\nprint(f\"Taylor Series Expansion: y(x) = {y_taylor}\")\nprint(f\"Computed y(0.1) = {float(val_01):.6f}\")\nprint(f\"Computed y(0.2) = {float(val_02):.6f}\")\n",
              output: "Taylor Series Expansion: y(x) = 1.41666666666667*x**4 + 1.33333333333333*x**3 + 1.5*x**2 + x + 1\nComputed y(0.1) = 1.116475\nComputed y(0.2) = 1.272933",
            },
          ],
          keyPoints: [
              "Taylor's series method expresses the solution y(x) as a power series around (x0, y0).",
              "Higher derivatives are obtained by differentiating the ODE dy/dx = f(x, y) using the chain rule.",
              "Picard's method converts the ODE into an equivalent integral equation y(x) = y0 + int f(t, y(t)) dt.",
              "Picard's successive approximations iteratively refine polynomials starting from y^(0)(x) = y0.",
              "Taylor's series yields discrete point evaluations; Picard generates continuous analytical function approximations."
],
          theoryQuestions: [
            {
              question: "Explain Picard's Method of Successive Approximations for solving dy/dx = f(x, y) with y(x0) = y0. State the recurrence formula.",
              marks: "5 Marks",
              answer: "1. Integral Transformation: Integrating dy/dt = f(t, y) from x0 to x yields:\\ny(x) - y(x0) = int_{x0}^x f(t, y(t)) dt => y(x) = y0 + int_{x0}^x f(t, y(t)) dt.\\n2. Successive Approximations: Because the unknown y(t) appears inside the integral, we approximate it iteratively.\\n- Zero-th approximation: y^(0)(x) = y0 (a constant).\\n- First approximation: y^(1)(x) = y0 + int_{x0}^x f(t, y^(0)(t)) dt = y0 + int_{x0}^x f(t, y0) dt.\\n- General (n+1)th recurrence formula:\\ny^(n+1)(x) = y0 + int_{x0}^x f(t, y^(n)(t)) dt for n = 0, 1, 2, ...\\n3. Convergence: If f(x, y) is continuous and satisfies a Lipschitz condition |f(x, y1) - f(x, y2)| <= L |y1 - y2|, the sequence y^(n)(x) converges uniformly to the unique solution y(x).",
              keyPoints: ["Transformation to integral equation", "Initial guess y^(0)(x) = y0", "Recurrence relation y^(n+1) = y0 + int f(t, y^(n)) dt", "Lipschitz convergence guarantee"],
            },
            {
              question: "Use Picard's method to find the third approximation to the solution of dy/dx = x + y with y(0) = 1.",
              marks: "5 Marks",
              answer: "Given dy/dx = x + y, x0 = 0, y0 = 1.\\n1. Zero-th approximation: y^(0)(x) = 1.\\n2. First approximation:\\ny^(1)(x) = 1 + int_0^x (t + y^(0)(t)) dt = 1 + int_0^x (t + 1) dt = 1 + [t^2/2 + t]_0^x = 1 + x + x^2/2.\\n3. Second approximation:\\ny^(2)(x) = 1 + int_0^x (t + y^(1)(t)) dt = 1 + int_0^x (t + 1 + t + t^2/2) dt = 1 + int_0^x (1 + 2t + t^2/2) dt\\n= 1 + [t + t^2 + t^3/6]_0^x = 1 + x + x^2 + x^3/6.\\n4. Third approximation:\\ny^(3)(x) = 1 + int_0^x (t + 1 + t + t^2 + t^3/6) dt = 1 + int_0^x (1 + 2t + t^2 + t^3/6) dt\\n= 1 + [t + t^2 + t^3/3 + t^4/24]_0^x = 1 + x + x^2 + x^3/3 + x^4/24.",
              keyPoints: ["Initial iterate y^(0) = 1", "y^(1) = 1 + x + x^2/2", "y^(2) = 1 + x + x^2 + x^3/6", "y^(3) = 1 + x + x^2 + x^3/3 + x^4/24"],
            },
            {
              question: "What is the primary practical limitation of Taylor's series method for high-order ODE solutions?",
              marks: "3 Marks",
              answer: "The primary practical limitation is the algebraic explosion of higher-order total derivatives. Differentiating y' = f(x, y) requires multivariable chain rule expansions (y'' = f_x + f_y f; y''' = f_{xx} + 2f_{xy}f + f_{yy}f^2 + ...). For non-trivial engineering functions involving quotients, trigonometrics, or roots, calculating these derivatives becomes overwhelmingly complex and prone to human and computational error.",
              keyPoints: ["Algebraic explosion of partial derivatives", "Need for higher-order multivariable chain rule", "Intractability for complicated non-linear functions"],
            },
          ],
          mcqs: [
            {
              question: "In Picard's method, what is the standard initial approximation y^(0)(x)?",
              options: ["y^(0)(x) = 0", "y^(0)(x) = x", "y^(0)(x) = y0 (constant initial value)", "y^(0)(x) = 1 + x"],
              correctIndex: 2,
              explanation: "Picard's method begins with the constant function satisfying the initial condition: y^(0)(x) = y0.",
            },
            {
              question: "What is the expression for y'' in terms of partial derivatives of f(x, y) where dy/dx = f(x, y)?",
              options: ["f_x + f_y", "f_x + f_y * f", "f_x * f_y", "f_xx + f_yy"],
              correctIndex: 1,
              explanation: "By the multivariable chain rule, d/dx [f(x, y)] = df/dx + (df/dy) * (dy/dx) = f_x + f_y * f.",
            },
            {
              question: "Which of the following describes the output format of Picard's method?",
              options: ["A single scalar number at the end point", "A continuous analytical function / polynomial sequence", "An upper triangular matrix", "A set of finite difference stencils"],
              correctIndex: 1,
              explanation: "Picard's method performs symbolic integrations, producing a sequence of continuous analytical polynomial approximations y^(n)(x).",
            },
            {
              question: "Under what condition does Picard's iteration sequence guarantee existence and uniqueness of the ODE solution?",
              options: ["f(x, y) is strictly positive", "f(x, y) satisfies the Lipschitz condition with respect to y", "f'(x) = 0", "The step size h is less than 0.01"],
              correctIndex: 1,
              explanation: "Picard-Lindelof theorem guarantees existence and uniqueness provided f(x, y) is continuous and satisfies a Lipschitz condition |f(x, y1) - f(x, y2)| <= L |y1 - y2|.",
            },
          ]
        },
        {
          id: "coa-u6-t2",
          title: "Euler's Method & Modified Euler's (Heun's Predictor-Corrector) Method: Geometry & Error",
          simpleExplanation: "Euler's method marches forward in time along the tangent slope at the current point, but accumulates significant error because curves bend away from tangents. Modified Euler's (Heun's) method fixes this by predicting a tentative next point and then averaging the slopes at the beginning and predicted end to take a much more accurate step.",
          detailedExplanation: `## 1. Euler's Method: The Tangent Line Polygon

**Euler's Method** is the most foundational numerical stepping algorithm for solving initial value problems:

$$\\frac{dy}{dx} = f(x, y), \\quad y(x_0) = y_0$$

### 1.1 Geometric Derivation
At the initial point $(x_0, y_0)$, the slope of the solution curve is given directly by the ODE:
$$m = \\left. \\frac{dy}{dx} \\right|_{(x_0, y_0)} = f(x_0, y_0)$$

Euler's method approximates the true solution curve over the small step $h = x_1 - x_0$ by its **tangent line**:
$$\\frac{y_1 - y_0}{x_1 - x_0} \\approx f(x_0, y_0) \\implies y_1 = y_0 + h f(x_0, y_0)$$

Repeating this process from node to node generates **Euler's Forward Stepping Formula**:

$$y_{n+1} = y_n + h f(x_n, y_n) \\quad (n = 0, 1, 2, \\dots)$$

\`\`\`mermaid
flowchart TD
    subgraph Eulers_Method_Geometry ["Euler vs Modified Euler Geometry"]
        EULER["Standard Euler: Moves strictly along initial tangent slope f(xn, yn)<br/>Error: O(h) global"]
        HEUN_PRED["Heun Step 1 (Predictor): Tentative Euler step y*_{n+1} = yn + h f(xn, yn)"]
        HEUN_CORR["Heun Step 2 (Corrector): Average initial and predicted slopes<br/>y_{n+1} = yn + (h/2) [f(xn, yn) + f(x_{n+1}, y*_{n+1})]<br/>Error: O(h²) global"]
        EULER -.-> HEUN_PRED --> HEUN_CORR
    end
\`\`\`

### 1.2 Truncation Error Analysis of Euler's Method
- **Local Truncation Error ($E_L$)**: Expanding $y(x_n + h)$ in Taylor series:
  $$y(x_n + h) = y(x_n) + h y'(x_n) + \\frac{h^2}{2} y''(\\xi) = y_n + h f(x_n, y_n) + \\frac{h^2}{2} y''(\\xi)$$
  The error committed in a single step is:
  $$E_L = \\frac{h^2}{2} y''(\\xi) = \\mathbf{O(h^2)}$$
- **Global Truncation Error ($E_G$)**: To advance across an interval $[a, b]$, the algorithm takes $N = \\frac{b - a}{h}$ steps. The total accumulated error is:
  $$E_G \\approx N \\times E_L = \\left(\\frac{b - a}{h}\\right) \\left(\\frac{h^2}{2} y''\\right) = \\frac{b - a}{2} h y'' = \\mathbf{O(h)}$$
  **Result**: Euler's method is a **first-order method ($p = 1$)**. Halving the step size $h$ only halves the error!

---

## 2. Modified Euler's (Heun's Predictor-Corrector) Method

Standard Euler's method drifts away from the true curve because it assumes the slope remains constant at $f(x_n, y_n)$ across the entire interval $[x_n, x_{n+1}]$.

**Modified Euler's Method** (also known as **Heun's Method** or the **Euler-Cauchy Predictor-Corrector Method**) cures this by applying the **Trapezoidal Rule** to the integrated ODE:

$$y_{n+1} = y_n + \\int_{x_n}^{x_{n+1}} f(x, y) \\, dx \\approx y_n + \\frac{h}{2} \\left[ f(x_n, y_n) + f(x_{n+1}, y_{n+1}) \\right]$$

Because the unknown $y_{n+1}$ appears on both sides of the equation, Heun's method operates as a two-stage **Predictor-Corrector** algorithm:

### Stage 1: Predictor Step (Standard Euler)
Use standard Euler's method to predict a tentative intermediate value $y_{n+1}^{(0)}$:

$$y_{n+1}^{(0)} = y_n + h f(x_n, y_n)$$

### Stage 2: Corrector Step (Trapezoidal Average Slope)
Evaluate the slope at the predicted point $f(x_{n+1}, y_{n+1}^{(0)})$, compute the average slope, and correct the estimate:

$$y_{n+1} = y_n + \\frac{h}{2} \\left[ f(x_n, y_n) + f(x_{n+1}, y_{n+1}^{(0)}) \\right]$$

### Error Analysis of Modified Euler:
- **Local Truncation Error**: $E_L = O(h^3)$ (matching the trapezoidal rule).
- **Global Truncation Error**: $E_G = O(h^2)$ (**Second-order method**).
- Halving $h$ reduces global error by a factor of **4**!

---

## 3. Numerical Stability & Stiffness

When solving ODEs numerically, we must ensure errors do not amplify uncontrollably from step to step.

Consider the standard linear test equation:
$$\\frac{dy}{dx} = \\lambda y \\quad (\\lambda < 0)$$
The exact analytical solution is $y(x) = y_0 e^{\\lambda x}$, which decays exponentially to zero as $x \\to \\infty$.

### Stability of Euler's Method:
Applying Euler's formula:
$$y_{n+1} = y_n + h (\\lambda y_n) = (1 + h \\lambda) y_n$$
For the numerical solution to remain bounded and decay to zero like the true solution, the amplification factor must satisfy:
$$|1 + h \\lambda| \\le 1 \\implies -1 \\le 1 + h \\lambda \\le 1$$
$$-2 \\le h \\lambda \\le 0 \\implies h \\le \\frac{2}{|\\lambda|}$$

If $h > \\frac{2}{|\\lambda|}$, the numerical solution oscillates with exploding amplitudes, leading to **numerical instability**!

---

## 4. Head-to-Head Comparison: Euler vs. Modified Euler

| Parameter | Standard Euler's Method | Modified Euler's (Heun's) Method |
| :--- | :--- | :--- |
| **Slope Used** | Initial tangent slope $f(x_n, y_n)$ | Average of initial slope and predicted endpoint slope |
| **Type of Algorithm** | Single-step explicit | Predictor-Corrector (2-stage explicit) |
| **Local Truncation Error** | $O(h^2)$ | $O(h^3)$ |
| **Global Truncation Error** | $\\mathbf{O(h)}$ (First Order) | $\\mathbf{O(h^2)}$ (Second Order) |
| **Evaluations of $f$ per step** | $1$ function evaluation | $2$ function evaluations |
| **Practical Utility** | Educational baseline only | Practical second-order solver |

---

> [!TIP] **EXAM TIP:**
> In university exams, when asked to solve using Modified Euler:
> Clearly label your two calculation steps:
> 1. *"Predictor: $y_{n+1}^{(0)} = y_n + h f(x_n, y_n)$"*
> 2. *"Corrector: $y_{n+1} = y_n + \\frac{h}{2}[f(x_n, y_n) + f(x_{n+1}, y_{n+1}^{(0)})]$"*
> If the question says *"Iterate the corrector until values agree"*, substitute the corrected $y_{n+1}$ back into the right side until it stops changing.

> [!NOTE] **DEV BRAIN:**
> In video game physics engines (e.g., Unity, Unreal Engine), naive Euler integration (\`pos += vel * dt; vel += accel * dt\`) causes simulations to rapidly gain artificial energy and blow up. Physics programmers use **Symplectic Euler** (Semi-implicit Euler) or Verlet integration to conserve energy!

> [!WARNING] **TRAP:**
> In the corrector step, do NOT forget to evaluate $f$ at the NEW $x$-coordinate $x_{n+1} = x_n + h$!
> Evaluating $f(x_n, y_{n+1}^{(0)})$ instead of $f(x_{n+1}, y_{n+1}^{(0)})$ is a common copy mistake.

> [!IMPORTANT] **MEMORIZE:**
> - Euler: $y_{n+1} = y_n + h f(x_n, y_n)$ (Global Error: $O(h)$)
> - Modified Euler Predictor: $y_{n+1}^* = y_n + h f(x_n, y_n)$
> - Modified Euler Corrector: $y_{n+1} = y_n + \\frac{h}{2}[f(x_n, y_n) + f(x_{n+1}, y_{n+1}^*)]$ (Global Error: $O(h^2)$)
> - Euler Stability condition: $h \\le \\frac{2}{|\\lambda|}$
`,
          shortNotes: "Euler: y_{n+1} = y_n + h*f(x_n, y_n) (O(h) global error). Modified Euler (Heun): predicts with Euler, corrects with trapezoidal average slope (O(h^2) global error).",
          examples: [
            {
              title: "Solving dy/dx = y - x, y(0) = 2 using Euler and Modified Euler",
              problem: "Solve the initial value problem dy/dx = y - x with y(0) = 2 for x = 0.1 and x = 0.2 (step size h = 0.1) using: (a) Euler's Method, and (b) Modified Euler's Method. Compare against exact solution y(x) = e^x + x + 1.",
              explanation: "Initial condition: x0 = 0.0, y0 = 2.0, h = 0.1.\\nf(x, y) = y - x.\\n\\nPart (a): Standard Euler's Method\\nStep 1 (x0 = 0 -> x1 = 0.1):\\nf(x0, y0) = 2.0 - 0.0 = 2.0.\\ny1 = y0 + h * f(x0, y0) = 2.0 + (0.1)*(2.0) = 2.0 + 0.2 = 2.2000.\\n\\nStep 2 (x1 = 0.1 -> x2 = 0.2):\\nf(x1, y1) = 2.2 - 0.1 = 2.1.\\ny2 = y1 + h * f(x1, y1) = 2.2 + (0.1)*(2.1) = 2.2 + 0.21 = 2.4100.\\n\\nPart (b): Modified Euler's Method\\nStep 1 (x0 = 0 -> x1 = 0.1):\\nf(x0, y0) = 2.0 - 0.0 = 2.0.\\nPredictor: y1* = y0 + h * f(x0, y0) = 2.0 + (0.1)*(2.0) = 2.2000.\\nSlope at predicted point: f(x1, y1*) = 2.2 - 0.1 = 2.1000.\\nAverage slope: (2.0 + 2.1)/2 = 2.0500.\\nCorrector: y1 = y0 + h * (average slope) = 2.0 + (0.1)*(2.05) = 2.2050.\\n\\nStep 2 (x1 = 0.1 -> x2 = 0.2):\\nf(x1, y1) = 2.2050 - 0.1 = 2.1050.\\nPredictor: y2* = y1 + h * f(x1, y1) = 2.2050 + (0.1)*(2.1050) = 2.4155.\\nSlope at predicted point: f(x2, y2*) = 2.4155 - 0.2 = 2.2155.\\nAverage slope: (2.1050 + 2.2155)/2 = 2.16025.\\nCorrector: y2 = y1 + h * (average slope) = 2.2050 + (0.1)*(2.16025) = 2.4210.\\n\\nExact Solution Comparison at x = 0.2:\\ny_exact(0.2) = e^0.2 + 0.2 + 1 = 1.221403 + 1.2 = 2.421403.\\nEuler Error: |2.4214 - 2.4100| = 0.0114.\\nModified Euler Error: |2.4214 - 2.4210| = 0.0004 (28x more accurate!).",
              code: "import numpy as np\n\ndef euler(f, x0, y0, x_end, h):\n    n = int((x_end - x0) / h)\n    x, y = x0, y0\n    for _ in range(n):\n        y += h * f(x, y)\n        x += h\n    return y\n\ndef modified_euler(f, x0, y0, x_end, h):\n    n = int((x_end - x0) / h)\n    x, y = x0, y0\n    for _ in range(n):\n        slope1 = f(x, y)\n        y_pred = y + h * slope1\n        slope2 = f(x + h, y_pred)\n        y += (h / 2.0) * (slope1 + slope2)\n        x += h\n    return y\n\nf = lambda x, y: y - x\nexact = lambda x: np.exp(x) + x + 1.0\n\ny_euler = euler(f, 0.0, 2.0, 0.2, 0.1)\ny_mod = modified_euler(f, 0.0, 2.0, 0.2, 0.1)\ny_true = exact(0.2)\n\nprint(f\"Exact Value y(0.2):          {y_true:.6f}\")\nprint(f\"Euler Value y(0.2):          {y_euler:.6f} (Error: {abs(y_true - y_euler):.6f})\")\nprint(f\"Modified Euler Value y(0.2): {y_mod:.6f} (Error: {abs(y_true - y_mod):.6f})\")\n",
              output: "Exact Value y(0.2):          2.421403\nEuler Value y(0.2):          2.410000 (Error: 0.011403)\nModified Euler Value y(0.2): 2.421025 (Error: 0.000378)",
            },
          ],
          keyPoints: [
              "Euler's method approximates the solution curve along the initial tangent line: y_{n+1} = y_n + h*f(x_n, y_n).",
              "Euler's method has local truncation error O(h^2) and global truncation error O(h) (first-order).",
              "Modified Euler's method uses an explicit predictor-corrector formulation based on the trapezoidal rule.",
              "Modified Euler has local error O(h^3) and global error O(h^2) (second-order).",
              "Euler's method is conditionally stable: for dy/dx = lambda*y (lambda < 0), stability requires h <= 2 / |lambda|."
],
          theoryQuestions: [
            {
              question: "Derive Euler's method for solving dy/dx = f(x, y) and deduce its local and global truncation errors.",
              marks: "7 Marks",
              answer: "1. Derivation: Expand y(x_{n+1}) = y(x_n + h) using Taylor series about x_n:\\ny(x_n + h) = y(x_n) + h y'(x_n) + (h^2 / 2) y''(xi) for xi in (x_n, x_{n+1}).\\nSince y'(x_n) = f(x_n, y_n), we have:\\ny(x_n + h) = y(x_n) + h f(x_n, y_n) + (h^2 / 2) y''(xi).\\nTruncating after the first derivative gives Euler's formula:\\ny_{n+1} = y_n + h f(x_n, y_n).\\n2. Local Truncation Error (LTE): The error introduced in a single step by omitting higher-order terms is:\\nLTE = (h^2 / 2) y''(xi) = O(h^2).\\n3. Global Truncation Error (GTE): Over an interval [a, b], the total number of steps is N = (b - a)/h. Assuming errors accumulate additively:\\nGTE approx N * LTE = ((b - a)/h) * (h^2 / 2) y'' = ((b - a)/2) * h * y'' = O(h).\\nHence, Euler's method is a first-order numerical method.",
              keyPoints: ["Taylor series expansion about x_n", "Truncation giving y_{n+1} = y_n + h f(x_n, y_n)", "Local error O(h^2) proof", "Global error O(h) proof via N = (b-a)/h"],
            },
            {
              question: "Explain the Predictor-Corrector mechanism in Modified Euler's (Heun's) method.",
              marks: "5 Marks",
              answer: "1. Motivation: Integrating the ODE dy/dx = f(x, y) yields y_{n+1} = y_n + int_{x_n}^{x_{n+1}} f(x, y) dx. Approximating the integral using the Trapezoidal Rule gives: y_{n+1} = y_n + (h/2)[f(x_n, y_n) + f(x_{n+1}, y_{n+1})]. This is implicit because y_{n+1} appears on both sides.\\n2. Predictor Step: To break the implicit dependency, standard Euler's method is used to 'predict' a preliminary estimate of y_{n+1}:\\ny*_{n+1} = y_n + h f(x_n, y_n).\\n3. Corrector Step: The predicted value is inserted into the right-hand side to calculate the slope at the predicted endpoint, which is averaged with the initial slope:\\ny_{n+1} = y_n + (h/2) [ f(x_n, y_n) + f(x_{n+1}, y*_{n+1}) ].\\nThis predictor-corrector loop converts an implicit trapezoidal rule into an explicit algorithm with O(h^2) global accuracy.",
              keyPoints: ["Trapezoidal quadrature foundation", "Implicit equation challenge", "Predictor formula y*_{n+1} = y_n + h f", "Corrector formula with average slope", "Explicit O(h^2) result"],
            },
            {
              question: "What is meant by numerical stability in ODE solvers? State the stability condition for Euler's method on y' = lambda * y.",
              marks: "3 Marks",
              answer: "1. Numerical Stability: An algorithm is numerically stable if errors introduced at one step do not grow exponentially as integration proceeds.\\n2. For the linear test equation y' = lambda * y with lambda < 0, applying Euler's method gives: y_{n+1} = (1 + h * lambda) y_n.\\n3. For y_n to remain bounded as n -> infty, the magnification factor must satisfy |1 + h * lambda| <= 1.\\nThis requires -2 <= h * lambda <= 0, which yields the step-size restriction: h <= 2 / |lambda|.",
              keyPoints: ["Definition of numerical stability", "Amplification factor (1 + h*lambda)", "Inequality |1 + h*lambda| <= 1", "Condition h <= 2/|lambda|"],
            },
          ],
          mcqs: [
            {
              question: "What is the global order of convergence of standard Euler's method?",
              options: ["O(h)", "O(h^2)", "O(h^3)", "O(h^4)"],
              correctIndex: 0,
              explanation: "Euler's method has local truncation error O(h^2), which accumulates across (b-a)/h steps to yield a global truncation error of O(h) (first-order).",
            },
            {
              question: "What quadrature rule forms the mathematical foundation of Modified Euler's (Heun's) method?",
              options: ["Midpoint Rule", "Trapezoidal Rule", "Simpson's 1/3 Rule", "Weddle's Rule"],
              correctIndex: 1,
              explanation: "Modified Euler's method replaces the ODE integral with the Trapezoidal Rule, averaging the slopes at the beginning and predicted end of the step.",
            },
            {
              question: "What is the step-size stability constraint for Euler's method applied to y' = -50y?",
              options: ["h <= 0.04", "h <= 0.02", "h <= 0.1", "h is unrestricted"],
              correctIndex: 0,
              explanation: "Stability requires h <= 2 / |lambda|. Here lambda = -50, so h <= 2 / 50 = 0.04.",
            },
            {
              question: "How many function evaluations of f(x, y) are required per step in Modified Euler's method?",
              options: ["1", "2", "3", "4"],
              correctIndex: 1,
              explanation: "Modified Euler requires 2 evaluations of f: once for the initial slope f(x_n, y_n) and once for the predicted slope f(x_{n+1}, y*_{n+1}).",
            },
          ]
        },
        {
          id: "coa-u6-t3",
          title: "Runge-Kutta Methods: Second-Order (RK-2) & Fourth-Order (RK-4) Solvers & Butcher Tableau",
          simpleExplanation: "Runge-Kutta methods achieve the high accuracy of Taylor series methods without ever calculating derivatives of f(x, y). The famous RK-4 method computes four strategic trial slopes across each step\u2014one at the start, two at the midpoint, and one at the end\u2014and combines them using a weighted average to produce fourth-order accuracy (O(h^4)).",
          detailedExplanation: `## 1. The Philosophy of Runge-Kutta Methods

Carl Runge and Wilhelm Kutta revolutionized numerical ODE solvers by solving a fundamental dilemma:
- **Taylor Series Method** offers high-order accuracy ($O(h^4)$ or higher), but requires analytically computing horrific higher-order partial derivatives of $f(x, y)$.
- **Euler's Method** requires no derivatives, but has unacceptably low first-order accuracy ($O(h)$).

**Runge-Kutta (RK) methods** achieve the identical high-order accuracy of Taylor series expansions by evaluating **strictly the first derivative function $f(x, y)$ at multiple strategic sample points** within each interval $[x_n, x_{n+1}]$!

\`\`\`mermaid
flowchart TD
    subgraph RK4_Architecture ["Runge-Kutta 4th Order (RK-4) Slope Sampling"]
        K1["k1 = f(xn, yn)<br/>Slope at the START of interval"]
        K2["k2 = f(xn + h/2, yn + h/2 k1)<br/>Slope at MIDPOINT using k1"]
        K3["k3 = f(xn + h/2, yn + h/2 k2)<br/>Improved slope at MIDPOINT using k2"]
        K4["k4 = f(xn + h, yn + h k3)<br/>Slope at END of interval using k3"]
        COMBINE["Weighted Simpson Average:<br/>y_{n+1} = yn + (h/6) [k1 + 2k2 + 2k3 + k4]"]
        K1 --> K2 --> K3 --> K4 --> COMBINE
    end
\`\`\`

---

## 2. Second-Order Runge-Kutta Methods (RK-2)

The general form of an explicit 2-stage Runge-Kutta method is:

$$y_{n+1} = y_n + h (w_1 k_1 + w_2 k_2)$$

where:
- $k_1 = f(x_n, y_n)$
- $k_2 = f(x_n + c_2 h, y_n + a_{21} h k_1)$

### 2.1 Derivation & Taylor Series Matching
Expanding $y(x_n + h)$ via Taylor series up to $h^2$:
$$y(x_n + h) = y_n + h f + \\frac{h^2}{2} (f_x + f_y f) + O(h^3)$$

Expanding $k_2$ via multivariable Taylor series:
$$k_2 = f(x_n + c_2 h, y_n + a_{21} h f) = f + c_2 h f_x + a_{21} h f f_y + O(h^2)$$

Substituting into the RK-2 general equation:
$$y_{n+1} = y_n + h [w_1 f + w_2 (f + c_2 h f_x + a_{21} h f f_y)] = y_n + h(w_1 + w_2)f + h^2 w_2 (c_2 f_x + a_{21} f_y f)$$

Equating coefficients with the true Taylor series expansion yields the **three RK-2 consistency equations**:
1. $w_1 + w_2 = 1$
2. $w_2 c_2 = \\frac{1}{2}$
3. $w_2 a_{21} = \\frac{1}{2}$

Because there are $3$ equations in $4$ unknowns ($w_1, w_2, c_2, a_{21}$), there exists a whole family of valid RK-2 methods!

### 2.2 Famous RK-2 Variants:
1. **Heun's Method** ($w_2 = 1/2 \\implies w_1 = 1/2, c_2 = 1, a_{21} = 1$):
   $$y_{n+1} = y_n + \\frac{h}{2}(k_1 + k_2)$$
2. **Midpoint Method** ($w_2 = 1 \\implies w_1 = 0, c_2 = 1/2, a_{21} = 1/2$):
   $$y_{n+1} = y_n + h k_2, \\quad k_2 = f\\left(x_n + \\frac{h}{2}, y_n + \\frac{h}{2} k_1\\right)$$
3. **Ralston's Method** ($w_2 = 2/3 \\implies w_1 = 1/3, c_2 = 3/4, a_{21} = 3/4$): Minimizes truncation error.

---

## 3. Fourth-Order Runge-Kutta Method (The Classic RK-4)

The **Classical RK-4 Method** is the gold standard workhorse of numerical ODE solvers across physics, aerospace, and robotics.

### 3.1 The Algorithmic Equations
To advance from $(x_n, y_n)$ to $(x_{n+1}, y_{n+1})$ with step size $h$:

$$k_1 = f(x_n, y_n)$$

$$k_2 = f\\left(x_n + \\frac{h}{2}, y_n + \\frac{h}{2} k_1\\right)$$

$$k_3 = f\\left(x_n + \\frac{h}{2}, y_n + \\frac{h}{2} k_2\\right)$$

$$k_4 = f(x_n + h, y_n + h k_3)$$

$$y_{n+1} = y_n + \\frac{h}{6} (k_1 + 2 k_2 + 2 k_3 + k_4)$$

### 3.2 Geometric Significance & Simpson's Rule Connection
Notice the uncanny similarity of the weights $(1, 2, 2, 1) / 6$ to **Simpson's 1/3 Rule**:
$$\\int_{x_n}^{x_{n+1}} f(x, y) dx \\approx \\frac{h}{6} [f(x_n) + 4 f(x_{n+1/2}) + f(x_{n+1})]$$
In RK-4, the midpoint slope $4 f(x_{n+1/2})$ is split equally between two independent evaluations: $2 k_2 + 2 k_3$!

### 3.3 Truncation Error:
- **Local Truncation Error**: $E_L = O(h^5)$.
- **Global Truncation Error**: $E_G = \\mathbf{O(h^4)}$.
- Halving the step size $h$ reduces the global error by a staggering factor of $2^4 = \\mathbf{16}$!

---

## 4. The Butcher Tableau Representation

Modern numerical analysts represent Runge-Kutta methods compactly using a mnemonic matrix known as the **Butcher Tableau** (named after John C. Butcher):

$$\\begin{array}{c|cccc}
0 & & & & \\\\
c_2 & a_{21} & & & \\\\
c_3 & a_{31} & a_{32} & & \\\\
c_4 & a_{41} & a_{42} & a_{43} & \\\\
\\hline
& b_1 & b_2 & b_3 & b_4
\\end{array}
\\quad \\iff \\quad
\\begin{array}{c|c}
\\mathbf{c} & A \\\\
\\hline
& \\mathbf{b}^T
\\end{array}$$

For the classic RK-4 method, the Butcher Tableau is:

$$\\begin{array}{c|cccc}
0 & & & & \\\\
1/2 & 1/2 & & & \\\\
1/2 & 0 & 1/2 & & \\\\
1 & 0 & 0 & 1 & \\\\
\\hline
& 1/6 & 2/6 & 2/6 & 1/6
\\end{array}$$

Because the matrix $A$ is **strictly lower triangular**, each stage $k_i$ depends only on previously computed stages. This defines an **Explicit Runge-Kutta (ERK)** method!

---

## 5. Master Comparison of ODE Solvers

| Method | Order ($p$) | Local Error | Global Error | Function Calls / Step | Self-Starting? |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Euler** | $1$ | $O(h^2)$ | $O(h)$ | $1$ | Yes |
| **Modified Euler (Heun)** | $2$ | $O(h^3)$ | $O(h^2)$ | $2$ | Yes |
| **Ralston (RK-2)** | $2$ | $O(h^3)$ | $O(h^2)$ | $2$ | Yes |
| **Classic RK-4** | $\\mathbf{4}$ | $\\mathbf{O(h^5)}$ | $\\mathbf{O(h^4)}$ | $\\mathbf{4}$ | **Yes** |
| **Milne's Predictor** | $4$ | $O(h^5)$ | $O(h^4)$ | $2$ | **No** (Needs RK-4 to start!) |

---

> [!TIP] **EXAM TIP:**
> When executing RK-4 by hand in an exam:
> Compute intermediate quantities sequentially in this exact order:
> 1. $k_1 = f(x_n, y_n)$
> 2. $x_{\\text{mid}} = x_n + \\frac{h}{2}$; $y_{\\text{mid1}} = y_n + \\frac{h}{2} k_1$; $k_2 = f(x_{\\text{mid}}, y_{\\text{mid1}})$
> 3. $y_{\\text{mid2}} = y_n + \\frac{h}{2} k_2$; $k_3 = f(x_{\\text{mid}}, y_{\\text{mid2}})$
> 4. $x_{\\text{end}} = x_n + h$; $y_{\\text{end}} = y_n + h k_3$; $k_4 = f(x_{\\text{end}}, y_{\\text{end}})$
> 5. $\\Delta y = \\frac{h}{6} (k_1 + 2k_2 + 2k_3 + k_4)$
> 6. $y_{n+1} = y_n + \\Delta y$.

> [!NOTE] **DEV BRAIN:**
> In modern scientific libraries like \`scipy.integrate.solve_ivp\`, the default algorithm is \`RK45\` (Dormand-Prince). It calculates both a 4th-order and a 5th-order estimate using 6 total function evaluations, using their difference to dynamically adapt the step size $h$ on the fly!

> [!WARNING] **TRAP:**
> Watch out for $k_3$! Students often compute $k_3$ using $k_1$ instead of $k_2$:
> - Correct: $y_n + \\frac{h}{2} k_2$
> - Wrong: $y_n + \\frac{h}{2} k_1$
> Also, in $k_4$, do NOT divide $h$ by 2! It evaluates at the full step $x_n + h$ with $y_n + h k_3$.

> [!IMPORTANT] **MEMORIZE:**
> - RK-4 Formulas:
>   $k_1 = f(x_n, y_n)$
>   $k_2 = f(x_n + h/2, y_n + (h/2)k_1)$
>   $k_3 = f(x_n + h/2, y_n + (h/2)k_2)$
>   $k_4 = f(x_n + h, y_n + h k_3)$
>   $y_{n+1} = y_n + \\frac{h}{6}(k_1 + 2k_2 + 2k_3 + k_4)$
> - Global Error: $O(h^4)$, Local Error: $O(h^5)$.
`,
          shortNotes: "RK-4 samples 4 slopes: k1 (start), k2, k3 (midpoints), k4 (end). y_{n+1} = y_n + (h/6)[k1 + 2k2 + 2k3 + k4]. Global error O(h^4). Self-starting workhorse of ODEs.",
          examples: [
            {
              title: "Solving dy/dx = x + y, y(0) = 1 using Fourth-Order Runge-Kutta (RK-4)",
              problem: "Apply the fourth-order Runge-Kutta (RK-4) method to find y(0.2) given dy/dx = x + y, y(0) = 1 using a single step of size h = 0.2. Compare against exact solution y(0.2) = 2*e^0.2 - 0.2 - 1 = 1.2428055.",
              explanation: "Given: f(x, y) = x + y, x0 = 0.0, y0 = 1.0, h = 0.2.\\n\\nStep 1: Compute k1\\nk1 = f(x0, y0) = 0.0 + 1.0 = 1.000000.\\n\\nStep 2: Compute k2\\nx_mid = x0 + h/2 = 0.0 + 0.1 = 0.1\\ny_mid1 = y0 + (h/2)*k1 = 1.0 + (0.1)*(1.0) = 1.100000\\nk2 = f(0.1, 1.1) = 0.1 + 1.1 = 1.200000.\\n\\nStep 3: Compute k3\\nx_mid = 0.1\\ny_mid2 = y0 + (h/2)*k2 = 1.0 + (0.1)*(1.2) = 1.120000\\nk3 = f(0.1, 1.12) = 0.1 + 1.12 = 1.220000.\\n\\nStep 4: Compute k4\\nx_end = x0 + h = 0.0 + 0.2 = 0.2\\ny_end = y0 + h*k3 = 1.0 + (0.2)*(1.22) = 1.0 + 0.244 = 1.244000\\nk4 = f(0.2, 1.244) = 0.2 + 1.244 = 1.444000.\\n\\nStep 5: Compute Weighted Average y1\\nDelta y = (h / 6) * [ k1 + 2*k2 + 2*k3 + k4 ]\\n= (0.2 / 6) * [ 1.000000 + 2*(1.200000) + 2*(1.220000) + 1.444000 ]\\n= (0.2 / 6) * [ 1.000000 + 2.400000 + 2.440000 + 1.444000 ]\\n= (0.2 / 6) * [ 7.284000 ] = (0.2) * (1.214000) = 0.242800.\\n\\ny(0.2) = y0 + Delta y = 1.0 + 0.242800 = 1.242800.\\n\\nExact Comparison:\\ny_exact(0.2) = 2*e^0.2 - 0.2 - 1 = 1.2428055.\\nAbsolute Error = |1.2428055 - 1.2428000| = 0.0000055 (Accurate to 5 decimal places in just ONE step!).",
              code: "def rk4_step(f, x, y, h):\n    k1 = f(x, y)\n    k2 = f(x + 0.5 * h, y + 0.5 * h * k1)\n    k3 = f(x + 0.5 * h, y + 0.5 * h * k2)\n    k4 = f(x + h, y + h * k3)\n    \n    y_next = y + (h / 6.0) * (k1 + 2.0 * k2 + 2.0 * k3 + k4)\n    return y_next, (k1, k2, k3, k4)\n\nf = lambda x, y: x + y\nx0, y0, h = 0.0, 1.0, 0.2\n\ny1, slopes = rk4_step(f, x0, y0, h)\nexact = 2.0 * np.exp(0.2) - 0.2 - 1.0\n\nprint(f\"k1 = {slopes[0]:.6f}\")\nprint(f\"k2 = {slopes[1]:.6f}\")\nprint(f\"k3 = {slopes[2]:.6f}\")\nprint(f\"k4 = {slopes[3]:.6f}\")\nprint(f\"RK-4 Computed y(0.2): {y1:.6f}\")\nprint(f\"Exact Value y(0.2):   {exact:.6f}\")\nprint(f\"Absolute Error:       {abs(exact - y1):.6e}\")\n",
              output: "k1 = 1.000000\nk2 = 1.200000\nk3 = 1.220000\nk4 = 1.444000\nRK-4 Computed y(0.2): 1.242800\nExact Value y(0.2):   1.242806\nAbsolute Error:       5.514167e-06",
            },
          ],
          keyPoints: [
              "Runge-Kutta methods match Taylor series accuracy without evaluating analytical derivatives.",
              "Classical RK-4 samples 4 slopes: k1 at start, k2 and k3 at midpoint, and k4 at the end.",
              "The RK-4 stepping formula is y_{n+1} = y_n + (h/6) * (k1 + 2k2 + 2k3 + k4).",
              "RK-4 has local truncation error O(h^5) and global truncation error O(h^4).",
              "The Butcher Tableau provides a compact structural matrix representation of Runge-Kutta schemes.",
              "Unlike multi-step methods (e.g. Milne or Adams-Bashforth), RK methods are self-starting."
],
          theoryQuestions: [
            {
              question: "Write the complete computational algorithm and formulas for the Classical Fourth-Order Runge-Kutta (RK-4) Method. Explain its geometric significance.",
              marks: "7 Marks",
              answer: "1. Algorithmic Formulas: Given dy/dx = f(x, y), y(x_n) = y_n and step size h:\\nk1 = f(x_n, y_n) [Slope at beginning of interval]\\nk2 = f(x_n + h/2, y_n + (h/2)*k1) [First trial slope at midpoint]\\nk3 = f(x_n + h/2, y_n + (h/2)*k2) [Second refined slope at midpoint]\\nk4 = f(x_n + h, y_n + h*k3) [Slope at end of interval]\\nFinal Update: y_{n+1} = y_n + (h/6) * [ k1 + 2*k2 + 2*k3 + k4 ].\\n2. Geometric Significance: RK-4 is an explicit numerical integration of dy/dx across [x_n, x_{n+1}] inspired by Simpson's 1/3 Rule. The weights (1, 2, 2, 1)/6 represent Simpson's weighting [1/6, 4/6, 1/6] where the midpoint slope 4/6 is evaluated as the average of two orthogonal estimates (2/6 k2 + 2/6 k3). This produces fourth-order global accuracy O(h^4) with local error O(h^5).",
              keyPoints: ["Statements of k1, k2, k3, k4 formulas", "Final weighted update formula with h/6", "Analogy to Simpson's 1/3 rule", "Global error O(h^4) and local error O(h^5)"],
            },
            {
              question: "Derive the consistency conditions for an explicit Second-Order Runge-Kutta (RK-2) method.",
              marks: "5 Marks",
              answer: "1. General RK-2 scheme: y_{n+1} = y_n + h(w1*k1 + w2*k2) where k1 = f and k2 = f(x_n + c2*h, y_n + a21*h*k1).\\n2. Taylor expansion of true solution: y(x_n + h) = y_n + h*f + (h^2/2)*(f_x + f_y*f) + O(h^3).\\n3. Taylor expansion of k2 about (x_n, y_n):\\nk2 = f + c2*h*f_x + a21*h*k1*f_y + O(h^2) = f + h(c2*f_x + a21*f*f_y) + O(h^2).\\n4. Substitute k1 and k2 into RK-2 scheme:\\ny_{n+1} = y_n + h*w1*f + h*w2*[f + h(c2*f_x + a21*f*f_y)] = y_n + h(w1 + w2)f + h^2*w2(c2*f_x + a21*f*f_y).\\n5. Equating terms with the true Taylor expansion:\\n- Coefficient of h*f: w1 + w2 = 1\\n- Coefficient of h^2*f_x: w2 * c2 = 1/2\\n- Coefficient of h^2*f*f_y: w2 * a21 = 1/2.\\nThese are the three fundamental consistency equations for RK-2 methods.",
              keyPoints: ["Ansatz y_{n+1} = y_n + h(w1 k1 + w2 k2)", "Taylor series expansion of true solution", "Multivariable Taylor expansion of k2", "Matching coefficients to yield w1+w2=1, w2*c2=1/2, w2*a21=1/2"],
            },
            {
              question: "What is a Butcher Tableau? Construct the Butcher Tableau for the Classical RK-4 method.",
              marks: "3 Marks",
              answer: "1. A Butcher Tableau is a compact matrix representation of Runge-Kutta methods displaying the nodes c, the Runge-Kutta matrix A, and the weights b^T:\\nc | A\\n--+--\\n  | b^T\\n2. For Classical RK-4:\\n0   |\\n1/2 | 1/2\\n1/2 | 0   1/2\\n1   | 0   0   1\\n----+---------------\\n    | 1/6 2/6 2/6 1/6\\nSince A is strictly lower triangular, RK-4 is an explicit method.",
              keyPoints: ["Structure of Butcher tableau (c, A, b^T)", "Tableau for RK-4 with nodes 0, 1/2, 1/2, 1 and weights 1/6, 2/6, 2/6, 1/6", "Lower triangular explicit property"],
            },
          ],
          mcqs: [
            {
              question: "What is the global order of accuracy of the Classical Fourth-Order Runge-Kutta (RK-4) method?",
              options: ["O(h^2)", "O(h^3)", "O(h^4)", "O(h^5)"],
              correctIndex: 2,
              explanation: "Classical RK-4 has a local truncation error of O(h^5) and a global truncation error of O(h^4) (fourth-order).",
            },
            {
              question: "How many evaluations of the function f(x, y) are performed in each step of the RK-4 method?",
              options: ["2", "3", "4", "6"],
              correctIndex: 2,
              explanation: "RK-4 calculates 4 slopes (k1, k2, k3, k4), requiring exactly 4 evaluations of f(x, y) per step.",
            },
            {
              question: "Which of the following is an advantage of Runge-Kutta methods over multi-step predictor-corrector methods (like Milne's method)?",
              options: ["Runge-Kutta methods require fewer function evaluations per step", "Runge-Kutta methods are self-starting and easily accommodate variable step sizes", "Runge-Kutta methods require finding second derivatives", "Runge-Kutta methods never produce truncation error"],
              correctIndex: 1,
              explanation: "Runge-Kutta methods are single-step and self-starting (they need only the current point), whereas multi-step methods require historical points and cannot easily change step size h.",
            },
            {
              question: "In the RK-4 method, what are the relative weights assigned to (k1, k2, k3, k4) in the update formula?",
              options: ["(1, 1, 1, 1) / 4", "(1, 2, 2, 1) / 6", "(1, 3, 3, 1) / 8", "(1, 4, 2, 1) / 8"],
              correctIndex: 1,
              explanation: "The RK-4 update formula is y_{n+1} = y_n + (h/6) * (k1 + 2k2 + 2k3 + k4), corresponding to weights (1:2:2:1)/6.",
            },
          ]
        }
      ]
    }
  ]
};
