import type { Subject } from "./types";

export const digitalElectronicsSubject: Subject = {
  id: "digital-electronics",
  name: "Digital Electronics",
  code: "DE",
  color: "152 69% 40%",
  icon: "⚡",
  description: "Number Systems, Logic Gates, Boolean Algebra, K-Maps, Combinational Circuits",
  semester: 2,
  units: [
    {
      id: "de-u1",
      title: "Unit 1: Digital Fundamentals",
      description: "Number systems, logic gates, Boolean algebra, K-maps, combinational circuits",
      topics: [
        {
          id: "de-t1",
          title: "Number Systems & Conversions",
          simpleExplanation: "Computers understand only 0s and 1s (binary). Number systems are different ways to represent the same number. Decimal (base 10) is what we use daily, Binary (base 2) is what computers use, Octal (base 8) and Hexadecimal (base 16) are shortcuts for humans to read binary more easily.",
          detailedExplanation: `**Four Number Systems:**
| System | Base | Digits | Example |
|--------|------|--------|---------|
| Binary | 2 | 0, 1 | 1010₂ |
| Octal | 8 | 0-7 | 12₈ |
| Decimal | 10 | 0-9 | 10₁₀ |
| Hexadecimal | 16 | 0-9, A-F | A₁₆ |

**Conversion Methods:**
1. **Decimal to Binary** — Divide by 2, collect remainders (bottom to top)
2. **Binary to Decimal** — Multiply each bit by 2^position, sum
3. **Binary to Octal** — Group bits by 3 from right
4. **Binary to Hex** — Group bits by 4 from right

**Quick conversions:**
- Hex to Binary: Each hex digit = 4 binary bits
- Octal to Binary: Each octal digit = 3 binary bits`,
          examples: [
            { title: "Decimal to Binary Conversion", problem: "Convert decimal 25 to binary.", explanation: "Repeatedly divide by 2 and collect remainders from bottom to top.", code: `25 ÷ 2 = 12 remainder 1
12 ÷ 2 = 6  remainder 0
6  ÷ 2 = 3  remainder 0
3  ÷ 2 = 1  remainder 1
1  ÷ 2 = 0  remainder 1

Read remainders bottom to top: 11001`, output: `25₁₀ = 11001₂

Verify: 1×16 + 1×8 + 0×4 + 0×2 + 1×1 = 16+8+1 = 25 ✓` },
            { title: "Binary to Hex Conversion", problem: "Convert binary 11010110 to hexadecimal.", explanation: "Group binary digits into groups of 4 from the right, then convert each group.", code: `Binary:  1101  0110
         ↓     ↓
Hex:     D     6

1101 = 8+4+0+1 = 13 = D
0110 = 0+4+2+0 = 6  = 6`, output: `11010110₂ = D6₁₆` }
          ],
          keyPoints: [
            "Binary (base 2), Octal (base 8), Decimal (base 10), Hexadecimal (base 16)",
            "Decimal to Binary: divide by 2, read remainders bottom-up",
            "Binary to Decimal: multiply each bit by 2^position, sum all",
            "Binary to Hex: group 4 bits from right; Binary to Octal: group 3 bits",
            "Hex digits: A=10, B=11, C=12, D=13, E=14, F=15",
            "Computers use binary internally; hex is a compact representation"
          ],
          mcqs: [
            { question: "What is 1010₂ in decimal?", options: ["8", "10", "12", "5"], correctIndex: 1, explanation: "1×8 + 0×4 + 1×2 + 0×1 = 8 + 2 = 10." },
            { question: "Hexadecimal uses base:", options: ["2", "8", "10", "16"], correctIndex: 3, explanation: "Hexadecimal is base 16, using digits 0-9 and letters A-F." },
            { question: "What is F in hexadecimal?", options: ["10", "12", "15", "16"], correctIndex: 2, explanation: "In hex: A=10, B=11, C=12, D=13, E=14, F=15." },
            { question: "To convert decimal to binary, you divide by:", options: ["8", "10", "16", "2"], correctIndex: 3, explanation: "Repeatedly divide by 2 and collect remainders to convert decimal to binary." },
            { question: "How many binary digits does one hex digit represent?", options: ["2", "3", "4", "8"], correctIndex: 2, explanation: "Each hexadecimal digit represents exactly 4 binary digits (bits)." }
          ]
        },
        {
          id: "de-t2",
          title: "Logic Gates & Truth Tables",
          simpleExplanation: "Logic gates are the building blocks of all digital circuits. They take binary inputs (0 or 1) and produce a binary output based on a logical rule. AND gate outputs 1 only when ALL inputs are 1. OR gate outputs 1 when ANY input is 1. NOT gate flips the input.",
          detailedExplanation: `**Basic Gates:**
| Gate | Symbol | Rule | Expression |
|------|--------|------|-----------|
| AND | · | Output 1 only if ALL inputs are 1 | Y = A·B |
| OR | + | Output 1 if ANY input is 1 | Y = A+B |
| NOT | ' or ¬ | Inverts the input | Y = A' |

**Derived Gates:**
| Gate | Rule | Expression |
|------|------|-----------|
| NAND | NOT of AND | Y = (A·B)' |
| NOR | NOT of OR | Y = (A+B)' |
| XOR | Output 1 if inputs are DIFFERENT | Y = A⊕B |
| XNOR | Output 1 if inputs are SAME | Y = (A⊕B)' |

**NAND and NOR are "universal gates"** — any circuit can be built using only NAND gates (or only NOR gates).

**Truth Table:** Lists all possible input combinations and their corresponding output. For n inputs, there are 2ⁿ rows.`,
          examples: [
            { title: "Truth Tables for Basic Gates", problem: "Write truth tables for AND, OR, and XOR gates.", explanation: "List all input combinations and apply the gate's rule to find outputs.", code: `AND Gate (Y = A·B):        OR Gate (Y = A+B):
A | B | Y                  A | B | Y
0 | 0 | 0                  0 | 0 | 0
0 | 1 | 0                  0 | 1 | 1
1 | 0 | 0                  1 | 0 | 1
1 | 1 | 1                  1 | 1 | 1

XOR Gate (Y = A⊕B):       NAND Gate (Y = (A·B)'):
A | B | Y                  A | B | Y
0 | 0 | 0                  0 | 0 | 1
0 | 1 | 1                  0 | 1 | 1
1 | 0 | 1                  1 | 0 | 1
1 | 1 | 0                  1 | 1 | 0`, output: `AND: Both must be 1 → output 1
OR: At least one 1 → output 1
XOR: Inputs must differ → output 1
NAND: Opposite of AND` }
          ],
          keyPoints: [
            "AND: All inputs must be 1 for output 1",
            "OR: Any input being 1 gives output 1",
            "NOT: Inverts 0→1 and 1→0",
            "NAND = NOT(AND), NOR = NOT(OR)",
            "XOR: Output 1 when inputs are different",
            "NAND and NOR are universal gates — can build any circuit",
            "n inputs → 2ⁿ rows in truth table"
          ],
          mcqs: [
            { question: "AND gate outputs 1 when:", options: ["Any input is 1", "All inputs are 1", "No inputs are 1", "Inputs are different"], correctIndex: 1, explanation: "AND gate requires ALL inputs to be 1 to produce output 1." },
            { question: "Which gate is the universal gate?", options: ["AND", "OR", "NAND", "XOR"], correctIndex: 2, explanation: "NAND (and NOR) are universal — any logic circuit can be built using only NAND gates." },
            { question: "XOR outputs 1 when:", options: ["Both inputs are 1", "Both inputs are 0", "Inputs are different", "Inputs are same"], correctIndex: 2, explanation: "XOR (Exclusive OR) outputs 1 only when the inputs are different." },
            { question: "How many rows in a truth table for 3 inputs?", options: ["3", "6", "8", "16"], correctIndex: 2, explanation: "For n inputs: 2ⁿ rows. For 3 inputs: 2³ = 8 rows." },
            { question: "NOT gate with input 0 gives:", options: ["0", "1", "Undefined", "Error"], correctIndex: 1, explanation: "NOT inverts the input: NOT(0) = 1, NOT(1) = 0." }
          ]
        },
        {
          id: "de-t3",
          title: "Boolean Algebra & De Morgan's Theorems",
          simpleExplanation: "Boolean algebra is math for digital logic — but with only two values: 0 and 1. De Morgan's theorems are powerful shortcuts: 'NOT of AND equals OR of NOTs' and 'NOT of OR equals AND of NOTs'. These help simplify complex circuits.",
          detailedExplanation: `**Boolean Algebra Laws:**
| Law | AND Form | OR Form |
|-----|----------|---------|
| Identity | A·1 = A | A+0 = A |
| Null | A·0 = 0 | A+1 = 1 |
| Complement | A·A' = 0 | A+A' = 1 |
| Idempotent | A·A = A | A+A = A |
| Double Negation | (A')' = A | |

**De Morgan's Theorems:**
1. (A·B)' = A' + B' — Break the AND, change to OR, complement each
2. (A+B)' = A' · B' — Break the OR, change to AND, complement each

These theorems let you convert between AND/OR forms and are essential for circuit simplification.`,
          examples: [
            { title: "Simplifying Boolean Expressions", problem: "Simplify: Y = A·B + A·B' + A'·B", explanation: "Apply Boolean algebra laws step by step to reduce the expression.", code: `Y = A·B + A·B' + A'·B

Step 1: Group first two terms (factor out A)
Y = A·(B + B') + A'·B

Step 2: B + B' = 1 (Complement law)
Y = A·1 + A'·B

Step 3: A·1 = A (Identity law)
Y = A + A'·B

Step 4: Apply absorption: A + A'·B = A + B
Y = A + B`, output: `Simplified: Y = A + B

This means a complex 3-term expression
reduces to just an OR gate!` },
            { title: "De Morgan's Theorem Application", problem: "Apply De Morgan's theorem to (A·B·C)'", explanation: "Break the AND, change to OR, complement each variable.", code: `De Morgan's: (A·B·C)' = A' + B' + C'

Verify with A=1, B=1, C=0:
Left:  (1·1·0)' = (0)' = 1
Right: 0 + 0 + 1 = 1  ✓

Another example: (A+B)' = A'·B'
Verify with A=0, B=1:
Left:  (0+1)' = (1)' = 0
Right: 1·0 = 0  ✓`, output: `(A·B·C)' = A' + B' + C'
(A+B+C)' = A'·B'·C'
Both theorems verified!` }
          ],
          keyPoints: [
            "Boolean algebra uses only 0 and 1 with AND (·), OR (+), NOT (')",
            "Identity: A·1=A, A+0=A. Null: A·0=0, A+1=1",
            "Complement: A·A'=0, A+A'=1",
            "De Morgan's 1: (A·B)' = A'+B' (break AND → OR, complement each)",
            "De Morgan's 2: (A+B)' = A'·B' (break OR → AND, complement each)",
            "Absorption: A+A·B=A and A·(A+B)=A"
          ],
          mcqs: [
            { question: "What is A + A' equal to?", options: ["A", "0", "1", "A'"], correctIndex: 2, explanation: "Complement law: A variable OR its complement always equals 1." },
            { question: "De Morgan's: (A·B)' equals:", options: ["A'·B'", "A'+B'", "A·B'", "(A+B)'"], correctIndex: 1, explanation: "De Morgan's first theorem: break the AND, change to OR, complement each." },
            { question: "A · 0 equals:", options: ["A", "1", "0", "A'"], correctIndex: 2, explanation: "Null law: anything AND 0 equals 0." },
            { question: "What is (A')' ?", options: ["0", "1", "A'", "A"], correctIndex: 3, explanation: "Double negation: complementing twice returns to the original value." },
            { question: "A + 1 equals:", options: ["A", "1", "0", "A'"], correctIndex: 1, explanation: "Null law: anything OR 1 equals 1." }
          ]
        },
        {
          id: "de-t4",
          title: "K-Map Simplification",
          simpleExplanation: "K-Maps (Karnaugh Maps) are a visual way to simplify Boolean expressions. Instead of using algebra, you draw a grid, fill in values, and group adjacent 1s together. Each group gives you a simpler term in the final expression.",
          detailedExplanation: `**Karnaugh Map (K-Map):**
A graphical method for simplifying Boolean expressions. Adjacent cells differ by only one variable (Gray code ordering).

**Steps:**
1. Draw the K-Map grid (2-var: 2×2, 3-var: 2×4, 4-var: 4×4)
2. Fill in 1s for minterms where output is 1
3. Group adjacent 1s in powers of 2 (1, 2, 4, 8...)
4. Groups can wrap around edges
5. Read simplified expression from groups

**Grouping Rules:**
- Groups must be rectangular (powers of 2: 1, 2, 4, 8)
- Make groups as large as possible
- Every 1 must be in at least one group
- Groups can overlap
- Fewer groups = simpler expression`,
          examples: [
            { title: "2-Variable K-Map", problem: "Simplify F(A,B) = Σm(1,2,3) using K-Map.", explanation: "In a 2-variable K-Map, group adjacent 1s to find the simplified expression.", code: `K-Map:
        B=0  B=1
A=0  |  0  |  1  |
A=1  |  1  |  1  |

Minterms: m1(0,1)=AB', m2(1,0)=A'B, m3(1,1)=AB

Groups:
- Column B=1: {m1, m3} → B (A changes, B stays 1)
- Row A=1: {m2, m3} → A (B changes, A stays 1)

F = A + B`, output: `F(A,B) = Σm(1,2,3) = A + B

Without K-Map: A'B + AB' + AB
With K-Map: A + B  (much simpler!)` }
          ],
          keyPoints: [
            "K-Maps visually simplify Boolean expressions",
            "Adjacent cells differ by exactly one variable (Gray code)",
            "Group adjacent 1s in powers of 2 (1, 2, 4, 8)",
            "Larger groups give simpler terms",
            "Groups can wrap around edges of the K-Map",
            "Variables that stay constant in a group appear in the result"
          ],
          mcqs: [
            { question: "K-Map groups must be:", options: ["Any shape", "Powers of 2", "Only squares", "Prime numbers"], correctIndex: 1, explanation: "K-Map groups must contain 1, 2, 4, 8, or 16 cells — always powers of 2." },
            { question: "Adjacent cells in K-Map differ by:", options: ["Two variables", "One variable", "All variables", "No variables"], correctIndex: 1, explanation: "Adjacent cells in a K-Map differ by exactly one variable, following Gray code ordering." },
            { question: "A 3-variable K-Map has how many cells?", options: ["4", "6", "8", "16"], correctIndex: 2, explanation: "For n variables: 2ⁿ cells. For 3 variables: 2³ = 8 cells." },
            { question: "Can K-Map groups wrap around?", options: ["No, never", "Yes, edges wrap", "Only top-bottom", "Only left-right"], correctIndex: 1, explanation: "K-Map groups can wrap around all edges because edge cells are logically adjacent." },
            { question: "Larger groups in K-Map mean:", options: ["More variables", "Simpler expression", "More complex result", "More terms"], correctIndex: 1, explanation: "Larger groups eliminate more variables, giving a simpler final expression." }
          ]
        },
        {
          id: "de-t5",
          title: "Combinational Circuits",
          simpleExplanation: "Combinational circuits are digital circuits whose output depends ONLY on the current inputs (no memory). Half adders add two bits, full adders handle carry, and multiplexers select one of many inputs. These are the building blocks of computer processors.",
          detailedExplanation: `**Half Adder:**
Adds two single bits. Has two outputs:
- Sum (S) = A ⊕ B (XOR)
- Carry (C) = A · B (AND)

**Full Adder:**
Adds three bits (A, B, and Carry-in). Built from two half adders:
- Sum = A ⊕ B ⊕ Cin
- Cout = (A·B) + (Cin·(A⊕B))

**Multiplexer (MUX):**
Selects one of many inputs based on selection lines.
- 2:1 MUX: 1 select line, 2 inputs
- 4:1 MUX: 2 select lines, 4 inputs
- 8:1 MUX: 3 select lines, 8 inputs

**Demultiplexer (DEMUX):**
Opposite of MUX — routes one input to one of many outputs.`,
          examples: [
            { title: "Half Adder Truth Table", problem: "Show how a half adder adds two single bits.", explanation: "Half adder produces Sum (using XOR) and Carry (using AND).", code: `Half Adder: Adds A + B

A | B | Sum | Carry
0 | 0 |  0  |   0
0 | 1 |  1  |   0
1 | 0 |  1  |   0
1 | 1 |  0  |   1

Sum = A XOR B
Carry = A AND B

Example: 1 + 1 = 10 (binary)
Sum = 0, Carry = 1 → result is "10"`, output: `Half Adder needs only 2 gates: XOR + AND
Full Adder extends this with Carry-in input` },
            { title: "4:1 Multiplexer", problem: "Select one of 4 inputs using 2 selection lines.", explanation: "A MUX is like a rotary switch — selection lines choose which input passes through.", code: `4:1 MUX with Select lines S1, S0:

S1 | S0 | Output
 0 |  0 |  I₀ (Input 0 selected)
 0 |  1 |  I₁ (Input 1 selected)
 1 |  0 |  I₂ (Input 2 selected)
 1 |  1 |  I₃ (Input 3 selected)

Boolean: Y = S1'·S0'·I₀ + S1'·S0·I₁ + S1·S0'·I₂ + S1·S0·I₃

Example: If S1=1, S0=0, and I₂=1 → Output = 1`, output: `4:1 MUX: 4 data inputs, 2 select lines, 1 output
Used in data routing, memory addressing, function generation` }
          ],
          keyPoints: [
            "Combinational circuits: output depends ONLY on current inputs",
            "Half Adder: Sum = A⊕B, Carry = A·B",
            "Full Adder: handles carry-in; built from two half adders",
            "MUX selects one of many inputs; DEMUX routes one input to many outputs",
            "2ⁿ inputs need n selection lines in a MUX",
            "These circuits are building blocks of ALU, memory, and processors"
          ],
          mcqs: [
            { question: "A half adder has how many outputs?", options: ["1", "2", "3", "4"], correctIndex: 1, explanation: "A half adder has two outputs: Sum and Carry." },
            { question: "Sum in a half adder uses which gate?", options: ["AND", "OR", "XOR", "NAND"], correctIndex: 2, explanation: "Sum = A XOR B. XOR outputs 1 when inputs are different." },
            { question: "A 4:1 MUX needs how many select lines?", options: ["1", "2", "3", "4"], correctIndex: 1, explanation: "For 2ⁿ inputs, you need n select lines. 4 inputs → 2 select lines." },
            { question: "Full adder differs from half adder by:", options: ["More outputs", "Having carry-in input", "Using more gates", "Being faster"], correctIndex: 1, explanation: "Full adder has a carry-in input (Cin) in addition to A and B, allowing multi-bit addition." },
            { question: "Combinational circuits have:", options: ["Memory", "Feedback loops", "Output depends only on current input", "Clock signals"], correctIndex: 2, explanation: "Combinational circuits have no memory — output is purely determined by current inputs." }
          ]
        }
      ]
    }
  ]
};
