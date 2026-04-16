// Rich content for Digital Electronics topics
// These are injected into the topic objects via richContent field

export const deRichContent: Record<string, string> = {

  /* ═══════════════════════════════════════════════════════════
     DE-T2: Logic Gates & Truth Tables — Deep Theory
     ═══════════════════════════════════════════════════════════ */
  "de-t2": `
## What Are Logic Gates?

Think of logic gates like **decision-making switches** in your house. A light switch is a simple NOT gate — flip it and the state changes. Now imagine two switches controlling one light: if you need **both** switches ON to turn on the light, that's an AND gate. If **either** switch works, that's an OR gate.

In digital electronics, logic gates are the fundamental building blocks of every circuit — from your phone's processor to a calculator. They operate on **binary signals**: voltage HIGH (1) or LOW (0).

## The Three Basic Gates

### AND Gate

The AND gate outputs 1 **only when ALL inputs are 1**. Think of it as a series circuit — current flows only if every switch is closed.

**Boolean Expression:** $Y = A \\cdot B$

| A | B | Y = A·B |
|---|---|---------|
| 0 | 0 | 0 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 1 |

\`\`\`mermaid
graph LR
    A["A"] --> AND["AND Gate<br/>Y = A·B"]
    B["B"] --> AND
    AND --> Y["Y"]
\`\`\`

> **Real-world analogy:** A bank vault that needs two keys turned simultaneously. Both keys (inputs) must be active for the vault (output) to open.

### OR Gate

The OR gate outputs 1 **when ANY input is 1**. Think of it as a parallel circuit — current flows if any path is available.

**Boolean Expression:** $Y = A + B$

| A | B | Y = A+B |
|---|---|---------|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 1 |

\`\`\`mermaid
graph LR
    A["A"] --> OR["OR Gate<br/>Y = A+B"]
    B["B"] --> OR
    OR --> Y["Y"]
\`\`\`

> **Real-world analogy:** A room with two doors. You can enter if **either** door is unlocked.

### NOT Gate (Inverter)

The NOT gate **flips** the input. 0 becomes 1, 1 becomes 0. It's the simplest gate with just one input.

**Boolean Expression:** $Y = A'$ or $Y = \\overline{A}$

| A | Y = A' |
|---|--------|
| 0 | 1 |
| 1 | 0 |

## Derived (Compound) Gates

### NAND Gate — The Universal Gate

NAND is "NOT AND" — it gives the **opposite** output of an AND gate. This gate is incredibly important because **any digital circuit can be built using only NAND gates**.

**Boolean Expression:** $Y = \\overline{A \\cdot B} = (AB)'$

| A | B | A·B | Y = (A·B)' |
|---|---|-----|------------|
| 0 | 0 | 0 | **1** |
| 0 | 1 | 0 | **1** |
| 1 | 0 | 0 | **1** |
| 1 | 1 | 1 | **0** |

### NOR Gate — Also Universal

NOR is "NOT OR" — opposite of OR gate. Like NAND, **any circuit can be built using only NOR gates**.

**Boolean Expression:** $Y = \\overline{A + B} = (A+B)'$

| A | B | A+B | Y = (A+B)' |
|---|---|-----|------------|
| 0 | 0 | 0 | **1** |
| 0 | 1 | 1 | **0** |
| 1 | 0 | 1 | **0** |
| 1 | 1 | 1 | **0** |

### XOR (Exclusive OR)

XOR outputs 1 **only when inputs are different**. It's like asking "are these two bits different?"

**Boolean Expression:** $Y = A \\oplus B = A'B + AB'$

| A | B | Y = A⊕B |
|---|---|---------|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

> **Key insight:** XOR is the basis of binary addition (half adder) and parity checking in error detection.

### XNOR (Exclusive NOR)

XNOR outputs 1 **when inputs are the same**. It's the complement of XOR — an equality detector.

**Boolean Expression:** $Y = \\overline{A \\oplus B} = AB + A'B'$

## Why NAND is "Universal"

Any basic gate can be constructed using only NAND gates:

\`\`\`mermaid
graph TD
    subgraph NOT["NOT from NAND"]
        A1["A"] --> N1["NAND"]
        A1 --> N1
        N1 --> Y1["A'"]
    end
    subgraph AND["AND from NANDs"]
        A2["A"] --> N2["NAND"]
        B2["B"] --> N2
        N2 --> N3["NAND<br/>(as NOT)"]
        N3 --> Y2["A·B"]
    end
    subgraph OR["OR from NANDs"]
        A3["A"] --> N4["NAND<br/>(as NOT)"]
        B3["B"] --> N5["NAND<br/>(as NOT)"]
        N4 --> N6["NAND"]
        N5 --> N6
        N6 --> Y3["A+B"]
    end
\`\`\`

This is why NAND gates are the **most manufactured** gate in the world. Entire processors are built from billions of NAND gates.

## Truth Table Construction

For **n inputs**, a truth table has $2^n$ rows. This covers every possible combination of inputs.

| Inputs | Rows in Truth Table |
|--------|-------------------|
| 1 | $2^1 = 2$ |
| 2 | $2^2 = 4$ |
| 3 | $2^3 = 8$ |
| 4 | $2^4 = 16$ |

### How to Fill a Truth Table

1. **List all input combinations** — count in binary from 0 to $2^n - 1$
2. **Apply the Boolean expression** to each row
3. **Write the output** for each combination

\`\`\`
For 3 inputs (A, B, C):
Row 0: 000 → apply expression
Row 1: 001
Row 2: 010
Row 3: 011
Row 4: 100
Row 5: 101
Row 6: 110
Row 7: 111
\`\`\`

## Gate Summary Comparison

| Gate | Expression | Output 1 when... | Universal? |
|------|-----------|-------------------|-----------|
| AND | $A \\cdot B$ | Both inputs are 1 | No |
| OR | $A + B$ | Any input is 1 | No |
| NOT | $A'$ | Input is 0 | No |
| NAND | $(AB)'$ | Not both 1 | **Yes** |
| NOR | $(A+B)'$ | Both inputs are 0 | **Yes** |
| XOR | $A \\oplus B$ | Inputs differ | No |
| XNOR | $(A \\oplus B)'$ | Inputs are same | No |
`,


  /* ═══════════════════════════════════════════════════════════
     DE-T3: Boolean Algebra & De Morgan's — Deep Theory
     ═══════════════════════════════════════════════════════════ */
  "de-t3": `
## The Language of Digital Circuits

Boolean algebra is the **mathematical foundation** of all digital systems. Unlike regular algebra where variables can be any number, Boolean algebra works with only two values: **0 (FALSE)** and **1 (TRUE)**.

Think of it this way: regular algebra is like having a volume knob (any level from 0 to 100). Boolean algebra is like having an ON/OFF switch.

## Fundamental Operations

There are exactly three operations in Boolean algebra:

$$A \\cdot B \\quad \\text{(AND)} \\qquad A + B \\quad \\text{(OR)} \\qquad \\overline{A} \\quad \\text{(NOT)}$$

Every digital circuit ever designed — no matter how complex — uses combinations of just these three operations.

## Postulates (Axioms)

These are the **foundation rules** that define Boolean algebra. They don't need proof — they are accepted as true by definition.

$$\\text{Closure: } a + b \\in \\{0, 1\\} \\text{ and } a \\cdot b \\in \\{0, 1\\}$$

$$\\text{Identity: } a + 0 = a \\quad \\text{and} \\quad a \\cdot 1 = a$$

$$\\text{Commutative: } a + b = b + a \\quad \\text{and} \\quad a \\cdot b = b \\cdot a$$

$$\\text{Distributive: } a \\cdot (b + c) = ab + ac \\quad \\text{and} \\quad a + bc = (a+b)(a+c)$$

$$\\text{Complement: } a + \\overline{a} = 1 \\quad \\text{and} \\quad a \\cdot \\overline{a} = 0$$

> **Notice the duality:** Every rule has two forms — one for AND, one for OR. This is called the **Principle of Duality**. You can swap AND↔OR and 0↔1 to get the dual.

## Laws of Boolean Algebra

### Identity Laws
$$A + 0 = A \\qquad A \\cdot 1 = A$$

Adding 0 doesn't change a value (like adding zero in regular math). ANDing with 1 doesn't change a value.

### Null Laws
$$A + 1 = 1 \\qquad A \\cdot 0 = 0$$

ORing anything with 1 gives 1 (a locked-open switch). ANDing anything with 0 gives 0 (a broken switch).

### Idempotent Laws
$$A + A = A \\qquad A \\cdot A = A$$

Doing the same operation with itself gives itself. ORing a signal with itself doesn't double it.

### Complement Laws
$$A + \\overline{A} = 1 \\qquad A \\cdot \\overline{A} = 0$$

A variable OR its opposite always covers all cases (= 1). A variable AND its opposite is impossible (= 0).

### Double Complement
$$\\overline{\\overline{A}} = A$$

Negating twice returns to the original. Like saying "it's not NOT raining" = "it's raining."

### Absorption Laws
$$A + AB = A \\qquad A(A + B) = A$$

These are powerful simplification tools. If you already have A, then whether AB is also true doesn't matter.

**Proof of** $A + AB = A$:
$$A + AB = A(1 + B) = A \\cdot 1 = A$$

## De Morgan's Theorems

These are the most important simplification rules in digital design:

### Theorem 1: Breaking an AND

$$\\overline{A \\cdot B} = \\overline{A} + \\overline{B}$$

**"Break the bar, change the sign."** The complement of a product equals the sum of complements.

### Theorem 2: Breaking an OR

$$\\overline{A + B} = \\overline{A} \\cdot \\overline{B}$$

The complement of a sum equals the product of complements.

### Generalized De Morgan's

For any number of variables:

$$\\overline{A \\cdot B \\cdot C \\cdot \\ldots} = \\overline{A} + \\overline{B} + \\overline{C} + \\ldots$$

$$\\overline{A + B + C + \\ldots} = \\overline{A} \\cdot \\overline{B} \\cdot \\overline{C} \\cdot \\ldots$$

### Proof by Truth Table

| $A$ | $B$ | $AB$ | $\\overline{AB}$ | $\\overline{A}$ | $\\overline{B}$ | $\\overline{A} + \\overline{B}$ |
|-----|-----|------|------------------|-----------------|-----------------|-------------------------------|
| 0 | 0 | 0 | **1** | 1 | 1 | **1** |
| 0 | 1 | 0 | **1** | 1 | 0 | **1** |
| 1 | 0 | 0 | **1** | 0 | 1 | **1** |
| 1 | 1 | 1 | **0** | 0 | 0 | **0** |

Columns 4 and 7 are identical — theorem proved!

## Simplification Technique: Step-by-Step

To simplify a Boolean expression:

1. **Apply absorption** where possible
2. **Factor common terms**
3. **Use complement law** ($A + A' = 1$)
4. **Apply identity law** ($A \\cdot 1 = A$)
5. **Use De Morgan's** to break complements

\`\`\`mermaid
graph TD
    A["Start: Complex Expression"] --> B["Apply Absorption Laws"]
    B --> C["Factor Common Terms"]
    C --> D["Use Complement: A + A' = 1"]
    D --> E["Apply Identity: A * 1 = A"]
    E --> F["Apply De Morgan's if needed"]
    F --> G["Simplified Expression"]
    G --> H{"Minimal?"}
    H -->|No| B
    H -->|Yes| I["Final Result"]
\`\`\`

### Worked Example

Simplify: $Y = AB + A\\overline{B} + \\overline{A}B$

**Step 1:** Factor A from first two terms:
$$Y = A(B + \\overline{B}) + \\overline{A}B$$

**Step 2:** Apply complement law ($B + \\overline{B} = 1$):
$$Y = A \\cdot 1 + \\overline{A}B$$

**Step 3:** Apply identity ($A \\cdot 1 = A$):
$$Y = A + \\overline{A}B$$

**Step 4:** Apply absorption ($A + \\overline{A}B = A + B$):
$$Y = A + B$$

The three-term expression reduces to a simple OR gate!

## Complete Laws Reference

| Law | OR Form | AND Form |
|-----|---------|----------|
| Identity | $A + 0 = A$ | $A \\cdot 1 = A$ |
| Null | $A + 1 = 1$ | $A \\cdot 0 = 0$ |
| Idempotent | $A + A = A$ | $A \\cdot A = A$ |
| Complement | $A + A' = 1$ | $A \\cdot A' = 0$ |
| Absorption | $A + AB = A$ | $A(A+B) = A$ |
| De Morgan's | $(A+B)' = A'B'$ | $(AB)' = A'+B'$ |
| Consensus | $AB + A'C + BC = AB + A'C$ | $(A+B)(A'+C)(B+C) = (A+B)(A'+C)$ |
`,


  /* ═══════════════════════════════════════════════════════════
     DE-T4: K-Maps (Karnaugh Maps) — Deep Theory
     ═══════════════════════════════════════════════════════════ */
  "de-t4": `
## Why K-Maps Exist

Boolean algebra simplification works, but it's **hit-or-miss** — you need to guess which law to apply and in what order. For complex expressions with 3-4 variables, it becomes tedious and error-prone.

**Karnaugh Maps (K-Maps)** solve this problem. They're a **visual, systematic method** that guarantees you find the simplest expression. Think of it as "simplification by coloring" — you literally draw boxes around groups of 1s.

> **Analogy:** Boolean algebra simplification is like solving a maze by trial and error. K-Maps give you a bird's-eye view of the maze so you can see the shortest path immediately.

## The Core Idea

A K-Map arranges all possible minterms in a **2D grid** where **adjacent cells differ by exactly one variable** (Gray code ordering). This means if two adjacent cells both contain 1, the variable that changes between them can be **eliminated**.

$$\\text{If } AB\\overline{C} + ABC = AB(\\overline{C} + C) = AB$$

In the K-Map, these two minterms would be adjacent, and grouping them visually eliminates C.

## 2-Variable K-Map

The simplest K-Map. A $2 \\times 2$ grid with 4 cells.

| | B=0 | B=1 |
|---|---|---|
| **A=0** | $m_0$ | $m_1$ |
| **A=1** | $m_2$ | $m_3$ |

Where $m_0 = \\overline{A}\\overline{B}$, $m_1 = \\overline{A}B$, $m_2 = A\\overline{B}$, $m_3 = AB$.

## 3-Variable K-Map

A $2 \\times 4$ grid with 8 cells. **Column order uses Gray code: 00, 01, 11, 10** (not binary order!).

| | BC=00 | BC=01 | BC=11 | BC=10 |
|---|---|---|---|---|
| **A=0** | $m_0$ | $m_1$ | $m_3$ | $m_2$ |
| **A=1** | $m_4$ | $m_5$ | $m_7$ | $m_6$ |

> **Critical:** The first and last columns ARE adjacent (they differ by only one variable). The map wraps around!

## 4-Variable K-Map

A $4 \\times 4$ grid with 16 cells. Both rows and columns use Gray code.

| | CD=00 | CD=01 | CD=11 | CD=10 |
|---|---|---|---|---|
| **AB=00** | $m_0$ | $m_1$ | $m_3$ | $m_2$ |
| **AB=01** | $m_4$ | $m_5$ | $m_7$ | $m_6$ |
| **AB=11** | $m_{12}$ | $m_{13}$ | $m_{15}$ | $m_{14}$ |
| **AB=10** | $m_8$ | $m_9$ | $m_{11}$ | $m_{10}$ |

The map wraps around **both horizontally and vertically**. Top row is adjacent to bottom row. Left column is adjacent to right column.

## Grouping Rules (MEMORIZE THESE)

1. **Groups must contain $2^k$ cells** — that is 1, 2, 4, 8, or 16 cells
2. **Groups must be rectangular** (squares or horizontal/vertical rectangles)
3. **Groups can wrap around edges** — left↔right and top↔bottom
4. **Every 1 must be covered** by at least one group
5. **Make groups as LARGE as possible** — larger groups = fewer variables
6. **Use as FEW groups as possible** — fewer groups = fewer terms
7. **Groups CAN overlap** — a cell can belong to multiple groups
8. **No diagonal groups!**

### What Each Group Size Eliminates

| Group Size | Variables Eliminated | Variables Remaining |
|------------|---------------------|-------------------|
| 1 cell | 0 | All (full minterm) |
| 2 cells | 1 | n-1 |
| 4 cells | 2 | n-2 |
| 8 cells | 3 | n-3 |
| 16 cells | 4 | 0 (output = 1) |

## Step-by-Step K-Map Procedure

\`\`\`mermaid
graph TD
    A["1. Write the Boolean function"] --> B["2. Draw the K-Map grid"]
    B --> C["3. Fill in 1s for each minterm"]
    C --> D["4. Find largest possible groups"]
    D --> E["5. Cover all 1s with minimum groups"]
    E --> F["6. Read the simplified expression"]
    F --> G["Each group becomes one product term"]
    G --> H["OR all terms together"]
\`\`\`

### Reading a Group

For each group, look at which variables stay **constant**:
- If a variable is always 1 in the group → include it as-is
- If a variable is always 0 in the group → include its complement
- If a variable changes (both 0 and 1) → **eliminate it**

## Don't Care Conditions

Sometimes certain input combinations **never occur** or their output **doesn't matter**. These are marked as "X" or "d" in the K-Map.

**The power of don't cares:** You can treat them as either 0 or 1 — whichever helps make **larger groups**.

> **Example:** In BCD (Binary Coded Decimal), inputs 1010 through 1111 never occur (they represent 10-15, but BCD only uses 0-9). These are don't cares.

## Worked Example: 3-Variable

Given: $f(A,B,C) = \\sum m(1, 2, 3, 5, 7)$

**Step 1:** Draw the K-Map and fill in 1s:

| | BC=00 | BC=01 | BC=11 | BC=10 |
|---|---|---|---|---|
| **A=0** | 0 | 1 | 1 | 1 |
| **A=1** | 0 | 1 | 1 | 0 |

**Step 2:** Find groups:
- Group 1: $m_1, m_3, m_5, m_7$ (all cells where C=1) → gives us **C**
- Group 2: $m_2, m_3$ (where A=0, B=1) → gives us $\\overline{A}B$

**Result:** $f = C + \\overline{A}B$

Two terms instead of five minterms — significantly simpler!

## Common Mistakes to Avoid

1. **Forgetting wrap-around adjacency** — first/last columns and top/bottom rows are adjacent
2. **Making groups of 3, 5, 6, etc.** — only powers of 2 are valid
3. **Diagonal groups** — never allowed, only rectangular
4. **Not making groups large enough** — always maximize group size
5. **Leaving 1s uncovered** — every 1 must be in at least one group
`,
};
