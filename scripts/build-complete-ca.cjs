const fs = require('fs');
const path = require('path');

const caContent = `import { Subject } from './types';

export const computerArchitecture: Subject = {
  id: 'ca-101',
  name: 'Computer Architecture',
  code: 'CS401',
  color: 'bg-blue-600',
  icon: 'cpu',
  description: 'Complete MST Exam Survival Notes covering Units 1 to 6 in plain language, all 46 question-bank questions, register transfer language, basic computer design, assembly programming, microprogrammed control, CPU datapath, and pipelining.',
  semester: 3,
  units: [
    {
      id: 'unit-1',
      title: 'Unit 1: Register Transfer & Micro-operations',
      description: 'Register Transfer Language (RTL), Common Bus System, Arithmetic, Logic & Shift Micro-operations, and Arithmetic Logic Unit (ALU) design.',
      topics: [
        {
          id: 'rtl-fundamentals',
          title: 'Register Transfer Language (RTL)',
          simpleExplanation: 'RTL is a universal symbolic language used to describe how data moves between CPU registers during clock cycles, similar to how code assigns variables.',
          detailedExplanation: \`## Register Transfer Language (RTL)

Micro-operation: An elementary operation performed on data stored in registers during one clock pulse (shift, load, clear, add, increment...). RTL is the symbolic notation used to describe such micro-operations precisely and briefly. RTL specifies **what** happens; the control unit is the physical circuit that makes it happen.

### RTL Symbols Master Table (Exam Mandatory)
| Symbol | Meaning | Example | Hardware Implementation |
| :--- | :--- | :--- | :--- |
| **Capital letters (+ digits)** | Name of a register | AR, PC, IR, R1, R2 | Flip-flops grouped together |
| **Arrow (<-)** | Transfer of data (source on right, destination on left) | R2 <- R1 | Non-destructive read, destructive write |
| **Colon (:)** | Separates control condition from operation | P: R2 <- R1 | P connected to LOAD input of R2 |
| **Comma (,)** | Two simultaneous operations at same clock edge | R2 <- R1, R1 <- R2 | Simultaneous register swap |
| **Parentheses ( )** | Specific bit-slice of a register | R2(0-7), PC(H) | Sub-byte or address slice wiring |
| **Square brackets [ ]** | Memory word selected by address register | DR <- M[AR] | Memory Read operation via Bus |

### Two RTL Statements Explained (Question Bank Q1)
1. **Simple Transfer (R2 <- R1):**
   The content of R1 is copied into R2 at the next clock edge. R1 keeps its value (**non-destructive read**), while R2's old value is overwritten (**destructive write**).
2. **Conditional Transfer (P: R2 <- R1):**
   The transfer happens only if control condition P = 1, and it occurs at the next active clock pulse. In physical hardware, signal P is wired directly to the **LOAD input** of R2, and R1's output pins are connected to R2's data inputs.
3. **Simultaneous Transfer (T: R1 <- R2, R2 <- R1):**
   Swaps the contents of two registers at the same clock tick. This is possible because both registers latch data on the rising clock edge simultaneously using edge-triggered flip-flops.

> [!NOTE] **DEV BRAIN:**
> RTL is literally assignment statements in code:
> \\\`\\\`\\\`c
> if (P) {
>     R2 = R1; // Non-destructive read: R1 still has its value!
> }
> \\\`\\\`\\\`
> Half of computer architecture is just concepts you already know in programming (pointers, stacks, loops, condition checks), implemented directly with copper wires.

> [!TIP] **EXAM TIP:**
> For 3-mark question Q1: Always write the definition of RTL, give R2 <- R1 (simple) and P: R2 <- R1 (conditional), and explicitly explain that P connects to the **LOAD input** of the destination register.

> [!WARNING] **TRAP:**
> R2 <- R1 is a **COPY**, never a move! The source register R1 is never cleared or emptied.

> [!IMPORTANT] **MEMORIZE:**
> **Micro-operation:** An elementary operation performed on data stored in one or more registers during one single clock pulse.\`,
          shortNotes: 'RTL uses symbols like R2 <- R1 to denote register data copy. P: R2 <- R1 is conditional transfer where P connects to R2 LOAD pin.',
          examples: [
            {
              title: 'RTL Swap Operation',
              code: 'T: R1 <- R2, R2 <- R1',
              explanation: 'When timing signal T is high, both registers swap values simultaneously at the clock edge.'
            }
          ],
          keyPoints: [
            'RTL describes microscopic data movements between registers.',
            'Arrow denotes data transfer direction (Dest <- Source).',
            'Transfers are non-destructive reads and destructive writes.',
            'Colon separates timing/control signals from the micro-operation.'
          ],
          mcqs: [
            {
              question: 'In RTL, what does the statement P: R2 <- R1 mean in hardware?',
              options: ['R1 is cleared to 0', 'R2 loads R1 only if P = 1', 'R1 and R2 are compared', 'P is incremented'],
              correctIndex: 1,
              explanation: 'The colon denotes a condition: transfer occurs only if control variable P = 1.'
            }
          ]
        },
        {
          id: 'common-bus-system',
          title: 'Common Bus System (Multiplexers & Tri-State Buffers)',
          simpleExplanation: 'Instead of wiring every register to every other register, all registers share one public data highway called a bus, with multiplexers deciding who drives it.',
          detailedExplanation: \`## Common Bus System

Connecting every register directly to every other register requires $n(n-1)$ dedicated wires, resulting in an impossible physical wiring bottleneck. To solve this, all registers share a single set of parallel wires called the **Common Bus**.

### Common Bus Using 4x1 Multiplexers (Q19 & Q36)
Only one register may drive the bus at any given nanosecond. A set of multiplexers selects which register drives the bus using select lines.

\`\`\`text
         +---------+     +---------+     +---------+     +---------+
         |   R1    |     |   R2    |     |   R3    |     |   R4    | (4 registers)
         +----+----+     +----+----+     +----+----+     +----+----+
              |               |               |               |
            Line 0          Line 1          Line 2          Line 3
              |               |               |               |
      +-------+---------------+---------------+---------------+-------+
      |               Four 4x1 Multiplexers (one per bit line)        |
      +-------------------------------+-------------------------------+
                                      | Select Lines S1, S0
                                      v
                             [ Common Bus (4 Lines) ]
                                      |
         +----------------------------+----------------------------+
         v                            v                            v
      LD of R1                     LD of R2                     LD of R3
\`\`\`

### Selection Signals & Micro-operations Table:
| $S_1$ | $S_0$ | Register Selected on Bus | Destination Load | Micro-operation Executed |
| :---: | :---: | :---: | :---: | :--- |
| **0** | **0** | **R1** | LD(R3) = 1 | \`R3 <- R1\` |
| **0** | **1** | **R2** | LD(R1) = 1 | \`R1 <- R2\` |
| **1** | **0** | **R3** | LD(R4) = 1 | \`R4 <- R3\` |
| **1** | **1** | **R4** | LD(R2) = 1 | \`R2 <- R4\` |

### Mathematical Rules for Bus Sizing:
- **Number of Select Lines:** For $n$ registers, you need $\\\\log_2(n)$ selection lines ($S_1, S_0$ for 4 registers).
- **Number of Multiplexers:** For $n$ registers of $k$ bits each, you need **$k$ multiplexers**, each of size **$n \\\\times 1$**.

### Three-State (Tri-State) Buffer Alternative:
Instead of multiplexers, each register output connects to the bus through a tri-state buffer. A $2 \\\\times 4$ decoder enables exactly one buffer while all other buffers remain in **High-Impedance (High-Z)** state (acting as an open circuit / disconnected wire).

> [!NOTE] **DEV BRAIN:**
> The bus is a shared resource with single-writer semantics, exactly like a mutex lock around a shared variable. Two registers driving the bus at once = **bus contention = physical short-circuit / corrupted data**.

> [!TIP] **EXAM TIP:**
> For 7-mark question Q36: Always draw the 4-register MUX diagram, write the $S_1 S_0$ selection table, and state the formula: $n$ registers of $k$ bits need $k$ MUXes of size $n \\\\times 1$.

> [!WARNING] **TRAP:**
> In the basic computer, memory address **never travels through the common bus**! AR is wired directly to memory address pins. Only memory data travels through the bus.\`,
          shortNotes: 'Common bus shares lines across registers. S1 S0 choose source register via MUXes. LD pin latches bus data into destination.',
          examples: [
            {
              title: 'Swap via Bus requires 3 Clock Cycles',
              code: 'T1: R3 <- R1 (S=00, LD R3)\\nT2: R1 <- R2 (S=01, LD R1)\\nT3: R2 <- R3 (S=10, LD R2)',
              explanation: 'Because the bus can carry only one word at a time, swapping R1 and R2 requires temporary register R3 over 3 separate clock pulses.'
            }
          ],
          keyPoints: [
            'Bus eliminates point-to-point wiring.',
            'Only one register drives the bus at a time.',
            'Requires log2(n) select lines and k MUXes of size n x 1.',
            'Tri-state buffers use High-Z state to isolate inactive registers.'
          ],
          mcqs: [
            {
              question: 'To construct a common bus for 8 registers of 16 bits each, how many multiplexers of what size are needed?',
              options: ['8 MUXes of 16x1', '16 MUXes of 8x1', '16 MUXes of 16x1', '8 MUXes of 8x1'],
              correctIndex: 1,
              explanation: 'You need k multiplexers of size n x 1. For 8 registers of 16 bits: 16 MUXes of 8x1 with 3 select lines.'
            }
          ]
        },
        {
          id: 'arithmetic-micro-ops',
          title: 'Arithmetic Micro-operations & 2s Complement Subtraction',
          simpleExplanation: 'Basic numeric calculations: addition, subtraction, increment, and decrement. Subtraction is performed using 2s complement addition.',
          detailedExplanation: \`## Arithmetic Micro-operations

The basic arithmetic micro-operations are addition, subtraction, increment, decrement, and complement. Multiplication and division are complex sequential operations composed of addition, subtraction, and shifts.

### Arithmetic Micro-operations Table:
| RTL Statement | Operation Name | Hardware Circuit Used |
| :--- | :--- | :--- |
| **R3 <- R1 + R2** | Add | Binary parallel adder (chain of full adders) |
| **R3 <- R1 - R2** | Subtract | Binary adder-subtractor ($R_1 + R_2' + 1$) |
| **R2 <- R2'** | 1's Complement | Invert every bit via NOT gates |
| **R2 <- R2' + 1** | Negate (2's Complement) | Invert every bit, then add 1 |
| **R1 <- R1 + 1** | Increment | Up-counter circuit |
| **R1 <- R1 - 1** | Decrement | Down-counter circuit |

### Adder-Subtractor Circuit:
A binary parallel adder uses $n$ full adders in cascade. To support subtraction:
- Mode bit **M = 0**: Functions as an **Adder** ($A + B + 0$).
- Mode bit **M = 1**: Functions as a **Subtractor** ($A + B' + 1$).
The $B$ inputs are XORed with $M$. When $M=1$, XOR inverts $B$ (1's complement) and $M$ feeds as input carry $C_{in} = 1$, giving 2's complement.

### How to Subtract using 2's Complement (5 Steps - Q21 & Q35):
1. Ensure both binary numbers have the exact same bit-width (e.g., 8 bits).
2. Invert every bit of the number being subtracted to find its **1's complement**.
3. Add 1 to get its **2's complement** (which represents $-B$).
4. Add the 2's complement to the first number ($A$).
5. **Analyze End Carry:**
   - If End Carry = 1: Discard carry. The result is positive and correct (**no borrow occurred, $A \\\\ge B$**).
   - If End Carry = 0: Result is negative and represented in 2's complement form.

### Signed Overflow Formula:
$$V = C_n \\\\oplus C_{n-1}$$
Overflow occurs when adding two positive numbers yields a negative result, or adding two negative numbers yields a positive result.

> [!NOTE] **DEV BRAIN:**
> Hardware never has a minus circuit. Subtraction $A - B$ is always executed as $A + (-B)$ using two's complement arithmetic.

> [!TIP] **EXAM TIP:**
> In unsigned subtraction problems (Q21, Q35), End Carry = 1 does NOT mean overflow! It means **no borrow** ($A \\\\ge B$). Always discard the end carry and write the remaining 8 bits.

> [!WARNING] **TRAP:**
> Do NOT include the 9th carry bit in your final 8-bit subtraction result! Discard it and state whether carry was 1 or 0.\`,
          shortNotes: 'Subtraction: R1 + R2\\\' + 1. End carry = 1 means positive/no borrow. Overflow V = Cn XOR Cn-1.',
          examples: [
            {
              title: "Subtract 181 - 59 using 8-bit 2's Complement",
              code: "R1 = 10110101 (181)\\nR2 = 00111011 ( 59)\\n1's comp of R2 = 11000100\\n2's comp of R2 = 11000101 (-59)\\nAdd R1 + (-R2): 10110101 + 11000101 = 1 | 01111010\\nDiscard Carry 1 -> Result = 01111010 (122)",
              explanation: "End carry 1 indicates positive result without borrow. 181 - 59 = 122 decimal."
            }
          ],
          keyPoints: [
            'Subtraction uses 2s complement adder-subtractor.',
            'End carry 1 in unsigned subtraction indicates A >= B.',
            'Overflow flag V detects signed magnitude overflow.',
            'Increment and decrement use simple counter circuits.'
          ],
          mcqs: [
            {
              question: "In 2's complement subtraction of unsigned numbers, what does a final carry of 1 indicate?",
              options: ['Arithmetic overflow', 'Result is negative', 'No borrow occurred (A >= B)', 'Underflow'],
              correctIndex: 2,
              explanation: 'A final carry of 1 in 2s complement subtraction indicates that A >= B and no borrow was required.'
            }
          ]
        },
        {
          id: 'logic-shift-micro-ops',
          title: 'Logic & Shift Micro-operations',
          simpleExplanation: 'Logic micro-ops treat bits as independent Boolean variables (AND, OR, XOR). Shifts move bits left or right for multiplication and division.',
          detailedExplanation: \`## Logic & Shift Micro-operations

### 1. Logic Micro-operations
Logic micro-operations treat every bit position independently as a Boolean variable. There is **no carry propagation** between bits.

| Operation | RTL Statement | Typical Practical Hardware Use |
| :--- | :--- | :--- |
| **AND** | \`R3 <- R1 AND R2\` | **Masking:** Clearing selected bits to 0. |
| **OR** | \`R3 <- R1 OR R2\` | **Selective Set:** Forcing chosen bits to 1. |
| **XOR** | \`R3 <- R1 XOR R2\` | **Selective Complement:** Inverting bits; \`R1 XOR R1 = 0\` clears register. |
| **NOT** | \`R1 <- R1'\` | Inverting all bits (1's complement). |

### 2. Shift Micro-operations
Shifts move bits laterally left or right. There are three fundamental categories:

| Shift Type | Left Shift Rule | Right Shift Rule |
| :--- | :--- | :--- |
| **Logical Shift** | Discard MSB, 0 enters LSB. | Discard LSB, 0 enters MSB. |
| **Circular (Rotate)** | MSB wraps around into LSB. | LSB wraps around into MSB. |
| **Arithmetic Shift** | 0 enters LSB; flag overflow if sign changes. | **Sign bit (MSB) is preserved and duplicated!** |

### Logical Right Shift vs Arithmetic Right Shift (Q20):
| Comparison Basis | Logical Right Shift (\`shr\`) | Arithmetic Right Shift (\`ashr\`) |
| :--- | :--- | :--- |
| **Bit Entering MSB** | Always a binary **0**. | **A copy of the existing sign bit (MSB unchanged)**. |
| **Data Type** | Unsigned binary numbers / bit patterns. | Signed 2's complement integers. |
| **Mathematical Effect** | Divides unsigned integer by 2. | Divides signed integer by 2 preserving the algebraic sign. |
| **Example on 1011 (-5)** | Becomes \`0101\` (+5: sign corrupted!). | Becomes \`1101\` (-3: correctly divided by 2 rounded down). |

> [!NOTE] **DEV BRAIN:**
> In programming:
> - Logical shift right is \`>>>\` in Java / TypeScript.
> - Arithmetic shift right is \`>>\` in C / Java / Python.

> [!TIP] **EXAM TIP:**
> For 3-mark question Q3:
> Initial register: \`1011\`:
> - Logical left shift (\`shl\`): \`0110\`
> - Logical right shift (\`shr\`): \`0101\`
> - Arithmetic right shift (\`ashr\`): \`1101\` (sign bit 1 preserved!).

> [!IMPORTANT] **MEMORIZE:**
> **Arithmetic Shift Rule:** Left shift multiplies by 2 ($X \\\\times 2$). Right shift divides by 2 ($X \\\\div 2$) for signed numbers.\`,
          shortNotes: 'Logic ops: AND masks, OR sets, XOR complements. Shift ops: Logical shifts 0 in, Arithmetic right shift preserves sign bit for signed division.',
          examples: [
            {
              title: 'Shifts on 4-bit 1011',
              code: 'Initial: 1011\\nshl:  0110 (MSB lost, 0 enters LSB)\\nshr:  0101 (LSB lost, 0 enters MSB)\\nashr: 1101 (LSB lost, sign bit 1 duplicated)',
              explanation: 'Notice how ashr preserves the negative sign bit in MSB.'
            }
          ],
          keyPoints: [
            'Logic micro-ops have no carry between bit positions.',
            'AND is used for masking; OR for selective set.',
            'Arithmetic right shift preserves the MSB sign bit.',
            'Arithmetic left shift can cause overflow if sign bit changes.'
          ],
          mcqs: [
            {
              question: 'Which shift operation must be used to perform division by 2 on a signed 2s complement number?',
              options: ['Circular right shift', 'Logical right shift', 'Arithmetic right shift', 'Logical left shift'],
              correctIndex: 2,
              explanation: 'Arithmetic right shift duplicates the sign bit, preserving negative/positive sign while dividing by 2.'
            }
          ]
        },
        {
          id: 'alu-design-organization',
          title: 'Arithmetic Logic Unit (ALU) Design & 14-Row Function Table',
          simpleExplanation: 'The ALU combines arithmetic, logic, and shift circuits into one unified block, with select lines choosing which operation reaches the output.',
          detailedExplanation: \`## Arithmetic Logic Unit (ALU) Organization

The ALU is the combinational heart of the CPU. It accepts operands from registers (typically Accumulator AC and Data Register DR), computes the selected function within one clock cycle, and returns the result with status flags ($C, S, Z, V$).

### ALU Architecture Block Diagram (Q22 & Q46)
\`\`\`text
            Operands A, B
                 |
        +--------+--------+------------------+
        |                 |                  |
        v                 v                  v
  +-----------+     +-----------+      +-----------+
  |Arithmetic |     |   Logic   |      |  Shifter  |
  |  Circuit  |     |  Circuit  |      |   Unit    |
  | F=A+Y+Cin |     |AND,OR,XOR |      | shr / shl |
  +-----+-----+     +-----+-----+      +-----+-----+
        |                 |                  |
        +--------+--------+------------------+
                 |
                 v
           +-----------+
           | 4x1 MUX   |  <-- S3, S2 select unit
           +-----+-----+
                 |
                 v Output F & Status Flags (C, S, Z, V)
\`\`\`

### Complete 14-Row ALU Function Table (Exam Goldmine):
| $S_3 S_2$ | $S_1 S_0$ | $C_{in}$ | Output Formula | Hardware Function Name |
| :---: | :---: | :---: | :--- | :--- |
| **00** | 00 | 0 | $F = A$ | Transfer A |
| **00** | 00 | 1 | $F = A + 1$ | Increment A |
| **00** | 01 | 0 | $F = A + B$ | Add A and B |
| **00** | 01 | 1 | $F = A + B + 1$ | Add with Carry |
| **00** | 10 | 0 | $F = A + B'$ | A plus 1's complement of B |
| **00** | 10 | 1 | $F = A + B' + 1$ | **Subtract ($A - B$)** |
| **00** | 11 | 0 | $F = A - 1$ | Decrement A |
| **00** | 11 | 1 | $F = A$ | Transfer A |
| **01** | 00 | X | $F = A \\\\wedge B$ | Bitwise AND |
| **01** | 01 | X | $F = A \\\\vee B$ | Bitwise OR |
| **01** | 10 | X | $F = A \\\\oplus B$ | Bitwise XOR |
| **01** | 11 | X | $F = A'$ | Complement A (NOT) |
| **10** | XX | X | $F = \\\\text{shr } A$ | Shift Right A |
| **11** | XX | X | $F = \\\\text{shl } A$ | Shift Left A |

### Status Flags Generated:
- **C (Carry):** Carry-out of binary adder.
- **S (Sign):** Equal to MSB of result (1 = Negative, 0 = Positive).
- **Z (Zero):** High (1) if all output bits are 0.
- **V (Overflow):** High if signed overflow occurred ($V = C_n \\\\oplus C_{n-1}$).

> [!TIP] **EXAM TIP:**
> You do NOT need to memorize all 14 rows blindly! Remember the pattern:
> - $S_3 S_2$ picks the unit: **00 = Arithmetic, 01 = Logic, 10 = Shift Right, 11 = Shift Left**.
> - $S_1 S_0$ picks Y in the arithmetic adder: **00 = 0, 01 = B, 10 = B', 11 = All 1s**.
> - $C_{in}$ adds the extra $+1$. Subtraction ($A - B$) is $S_1 S_0 = 10, C_{in} = 1$.\`,
          shortNotes: 'ALU combines Arithmetic, Logic, and Shifter circuits. S3S2 selects stage, S1S0 selects inputs, Cin adds 1. Status flags: C, S, Z, V.',
          examples: [
            {
              title: 'ALU Subtraction Selection',
              code: 'S3S2 = 00, S1S0 = 10, Cin = 1 -> F = A + B\\\' + 1 = A - B',
              explanation: 'Arithmetic circuit configured to negate B and add 1, executing 2s complement subtraction.'
            }
          ],
          keyPoints: [
            'S3 S2 select lines pick Arithmetic, Logic, or Shift output.',
            'Arithmetic circuit is built around a full adder with MUX on B input.',
            'Four status flags (C, S, Z, V) allow conditional branching in programs.'
          ],
          mcqs: [
            {
              question: 'To execute subtraction (A - B) in the standard ALU, what values must S1 S0 and Cin have?',
              options: ['S1S0 = 01, Cin = 0', 'S1S0 = 10, Cin = 1', 'S1S0 = 00, Cin = 1', 'S1S0 = 11, Cin = 0'],
              correctIndex: 1,
              explanation: 'S1S0 = 10 selects 1s complement of B, and Cin = 1 adds 1 to form the 2s complement.'
            }
          ]
        }
      ]
    },

    // ── UNIT 2: BASIC COMPUTER ORGANIZATION & DESIGN ──
    {
      id: 'unit-2',
      title: 'Unit 2: Basic Computer Organization & Design',
      description: 'Instruction codes, registers, common bus of basic computer, instruction cycle (T0-T6), memory-reference instructions, and interrupt cycle.',
      topics: [
        {
          id: 'instruction-codes-stored-program',
          title: 'Instruction Codes & Stored-Program Organization',
          simpleExplanation: 'Instructions and data live in the exact same memory as numbers. The CPU reads instructions from the code area and manipulates variables in the data area.',
          detailedExplanation: \`## Instruction Codes & Stored-Program Organization

A computer instruction is a binary code that specifies a sequence of micro-operations. The **Stored-Program Concept** (Von Neumann Architecture) states that programs (instructions) and data (operands) share the exact same physical memory.

### Basic Computer Specifications:
- **Memory Capacity:** 4096 words $\\\\times$ 16 bits.
- **Address Bus Width:** 12 bits ($2^{12} = 4096$ memory words).
- **Word Length:** 16 bits.
- **Processor Register:** Accumulator (**AC**, 16 bits).

### 16-Bit Instruction Format (Figure 2.1):
\`\`\`text
   15   14      12 11                               0
  +----+----------+----------------------------------+
  | I  |  Opcode  |          Address (12 bits)       |
  +----+----------+----------------------------------+
    |       |                     |
    |    (3 bits)      (Points to operand in RAM: 0 to 4095)
 (Mode: 0=Direct, 1=Indirect)
\`\`\`

### Direct vs Indirect Addressing (The I Bit - Q15):
- **Direct Addressing ($I = 0$):**
  The 12-bit address field directly contains the memory address of the operand.
  *Example:* \`0 001 0100 0101 0111\` (\`1457h\`) -> Effective Address = \`457h\`. Requires **1 memory access**.
- **Indirect Addressing ($I = 1$):**
  The 12-bit address field contains the address of a memory word that holds the **real address** (pointer) of the operand.
  *Example:* Location 300 holds 1350; location 1350 holds data. Requires **2 memory accesses**.

> [!NOTE] **DEV BRAIN:**
> - Immediate = Literal constant (\`int x = 5;\`).
> - Direct = Standard variable (\`int x = y;\` - read memory address of y).
> - Indirect = Pointer dereference (\`int x = *ptr;\` - read pointer address, then read target address).

> [!TIP] **EXAM TIP:**
> For 3-mark question Q15: Draw the two boxes showing Direct ($I=0$) taking 1 memory read vs Indirect ($I=1$) taking 2 memory reads.\`,
          shortNotes: 'Stored program: Code and Data share RAM. 16-bit instruction = Mode I (1 bit) + Opcode (3 bits) + Address (12 bits). Direct = 1 memory read, Indirect = 2 memory reads.',
          examples: [
            {
              title: 'Hex Instruction Translation',
              code: 'ADD 457 (Direct):   Hex = 1457h (I=0, Opcode=001, Address=457h)\\nADD 457 (Indirect): Hex = 9457h (I=1, Opcode=001, Address=457h)',
              explanation: 'Notice how setting mode bit 15 transforms hex 1xxx to 9xxx.'
            }
          ],
          keyPoints: [
            'Stored-program concept stores code and data in same RAM.',
            'Memory has 4096 words, requiring 12 address bits.',
            'Bit 15 is mode bit I: 0 for Direct, 1 for Indirect.',
            'Direct addressing needs 1 RAM read; Indirect needs 2 RAM reads.'
          ],
          mcqs: [
            {
              question: 'In a 16-bit basic computer instruction, how many bits are allocated for the address field?',
              options: ['8 bits', '12 bits', '14 bits', '16 bits'],
              correctIndex: 1,
              explanation: 'Because memory has 4096 words (2^12 = 4096), 12 bits are required for the address.'
            }
          ]
        },
        {
          id: 'computer-registers-bus',
          title: 'Computer Registers & Common Bus System',
          simpleExplanation: 'The basic computer has 8 registers connected to a 16-bit common bus. 3 select lines (S2 S1 S0) decide which unit drives the bus.',
          detailedExplanation: \`## Registers of the Basic Computer & Common Bus

### Master Register Table (Q5 & Q24):
| Register | Bits | Full Name | Exact Architectural Function | Bus Select ($S_2 S_1 S_0$) |
| :--- | :---: | :--- | :--- | :---: |
| **AR** | 12 | Address Register | Holds the 12-bit physical address for memory read/write. | **001** (1) |
| **PC** | 12 | Program Counter | Holds address of next instruction; incremented after fetch. | **010** (2) |
| **DR** | 16 | Data Register | Holds operand read from memory; serves as ALU input. | **011** (3) |
| **AC** | 16 | Accumulator | Main CPU processing register; receives output from ALU. | **100** (4) |
| **IR** | 16 | Instruction Register | Holds fetched instruction code; feeds opcode decoders. | **101** (5) |
| **TR** | 16 | Temporary Register | Holds scratchpad data (e.g., saves PC during interrupt). | **110** (6) |
| **Memory** | 16 | Main RAM (4096x16) | Stores programs and operands. | **111** (7) |
| **INPR** | 8 | Input Register | Holds 8-bit ASCII character from keyboard. | Not on bus |
| **OUTR** | 8 | Output Register | Holds 8-bit ASCII character for printer/display. | Receives from bus |

### Common Bus System Operation:
- **16 Common Bus Lines:** Connect the registers and memory.
- **Select Lines ($S_2 S_1 S_0$):** Select which unit places its 16 bits onto the bus.
- **Control Inputs:** Each register has **LD (load)**, **INR (increment)**, and **CLR (clear)** inputs.
- **Special AC Input:** AC does NOT load directly from the bus! AC receives data from the **Adder and Logic Circuit (ALU)**, which takes inputs from AC, DR, and INPR.

\`\`\`text
Micro-operation Example:
AR <- PC        => S2 S1 S0 = 010 (PC drives bus), LD(AR) = 1
IR <- M[AR]     => S2 S1 S0 = 111 (Memory drives bus), Read = 1, LD(IR) = 1
PC <- PC + 1    => INR(PC) = 1 (No bus transfer needed)
\`\`\`

> [!TIP] **EXAM TIP:**
> For question Q24: Write the 8-row register table with bits and bus numbers (1=AR, 2=PC, 3=DR, 4=AC, 5=IR, 6=TR, 7=Memory). Explicitly mention that AC input comes through the ALU, not directly from the bus!\`,
          shortNotes: '8 Registers: AR(12), PC(12), DR(16), AC(16), IR(16), TR(16), INPR(8), OUTR(8). Bus select: 1=AR, 2=PC, 3=DR, 4=AC, 5=IR, 6=TR, 7=Memory.',
          examples: [
            {
              title: 'RTL to Bus Signals Mapping',
              code: 'AR <- PC:       S2S1S0 = 010, LD(AR)\\nIR <- M[AR]:    S2S1S0 = 111, Read, LD(IR)\\nM[AR] <- AC:    S2S1S0 = 100, Write',
              explanation: 'Demonstrating how symbolic RTL maps directly into binary multiplexer select lines and control wire assertions.'
            }
          ],
          keyPoints: [
            'AR and PC are 12 bits; DR, AC, IR, TR are 16 bits.',
            'Memory address always comes straight from AR.',
            'AC input is fed by the ALU, not directly from the bus.'
          ],
          mcqs: [
            {
              question: 'Which register supplies the address for every memory read and write operation?',
              options: ['Program Counter (PC)', 'Instruction Register (IR)', 'Address Register (AR)', 'Data Register (DR)'],
              correctIndex: 2,
              explanation: 'Memory address inputs are wired directly to the Address Register (AR).'
            }
          ]
        },
        {
          id: 'instruction-cycle-flowchart',
          title: 'Instruction Cycle & Detailed Fetch/Decode RTL',
          simpleExplanation: 'The processor repeats 4 steps forever: Fetch instruction, Decode opcode, Read effective address if indirect, and Execute micro-operations.',
          detailedExplanation: \`## Complete Instruction Cycle (Q6 & Q23)

Every instruction goes through 4 phases:
1. **Fetch** the instruction from memory.
2. **Decode** the instruction.
3. **Read Effective Address** from memory if indirect ($I = 1$).
4. **Execute** the instruction.

### Instruction Cycle Flowchart & Timing Signals:
The timing signals $T_0, T_1, T_2, \\\\dots, T_{15}$ are generated by a 4-bit Sequence Counter (**SC**) fed through a $4 \\\\times 16$ decoder. SC increments each clock tick or resets to 0 ($SC \\\\leftarrow 0$).

\`\`\`text
                  START (SC <- 0)
                         |
                         v
              +---------------------+
              | T0: AR <- PC        |  (Address to AR)
              +----------+----------+
                         |
                         v
              +---------------------+
              | T1: IR <- M[AR]     |  (Read instruction into IR)
              |     PC <- PC + 1    |  (Increment Program Counter)
              +----------+----------+
                         |
                         v
              +---------------------+
              | T2: D0..D7 <- Decode IR(12-14)
              |     AR <- IR(0-11)  |  (Address bits to AR)
              |     I <- IR(15)     |  (Mode bit to I flip-flop)
              +----------+----------+
                         |
                 +-------v-------+
                 |  Is D7 = 0?   |
                 +---+-------+---+
                    /         \\\\
             (D7=0: MRI)    (D7=1: Non-MRI)
                 /             \\\\
        +-------v-------+   +---v-----------+
        |   Is I = 1?   |   |   Is I = 0?   |
        +---+-------+---+   +---+-------+---+
           /         \\\\         /         \\\\
     (I=1:Ind)    (I=0:Dir)  (I=0:Reg)  (I=1:I/O)
        /             \\\\         /         \\\\
  +----v----+      +---v---+ +---v---+   +---v---+
  |   T3:   |      |  T3:  | |  T3:  |   |  T3:  |
  |AR<-M[AR]|      |Nothing| |Execute|   |Execute|
  +----+----+      +---+---+ |SC <- 0|   |SC <- 0|
       |               |     +-------+   +-------+
       +-------+-------+
               |
               v
     +-------------------+
     | T4, T5, T6:       |
     | Execute MRI,      |
     | then SC <- 0      |
     +-------------------+
\`\`\`

### Fetch & Decode RTL (Must Memorize Verbatim - Q6, Q23):
| Timing | Exact RTL Statement | Physical Hardware Activity |
| :---: | :--- | :--- |
| **$T_0$** | \`AR <- PC\` | Bus select $S_2 S_1 S_0 = 010$ (PC on bus), \`LD(AR) = 1\`. AR now holds instruction address. |
| **$T_1$** | \`IR <- M[AR], PC <- PC + 1\` | Memory read: $S = 111$, \`Read = 1\`, \`LD(IR) = 1\`. In same clock tick, \`INR(PC) = 1\`. |
| **$T_2$** | \`D0..D7 <- Decode IR(12-14), AR <- IR(0-11), I <- IR(15)\` | Opcode decoded into $D_0 \\\\dots D_7$; address bits copied to AR; mode bit latched to I. |

### After Decode - What Happens at $T_3$:
- **Memory-Reference Indirect ($D_7' I T_3$):** \`AR <- M[AR]\` (Reads effective address).
- **Memory-Reference Direct ($D_7' I' T_3$):** Nothing (AR already holds effective address).
- **Register-Reference ($D_7 I' T_3$):** Executes immediately at $T_3$, then \`SC <- 0\`.
- **Input-Output ($D_7 I T_3$):** Executes immediately at $T_3$, then \`SC <- 0\`.

> [!NOTE] **DEV BRAIN:**
> $T_0 - T_2$ is simply the CPU interpreter loop:
> \`\`\`c
> op = memory[PC++];
> switch (opcode) { ... }
> \`\`\`
> $T_3$ indirect handling is literally \`addr = *addr;\`.

> [!TIP] **EXAM TIP:**
> Whenever asked about Fetch/Decode: Always write the three lines for $T_0, T_1, T_2$ with the bus select codes ($010, 111$).\`,
          shortNotes: 'T0: AR <- PC. T1: IR <- M[AR], PC <- PC + 1. T2: Decode opcode, AR <- IR(0-11), I <- IR(15). T3: AR <- M[AR] if indirect.',
          examples: [
            {
              title: 'Timing for Instruction Cycle',
              code: 'T0: Bus=PC, LD(AR)\\nT1: Memory Read, LD(IR), INR(PC)\\nT2: 3x8 Decode IR(12-14), AR=IR(0-11), I=IR(15)',
              explanation: 'Standard 3-cycle fetch and decode sequence in M. Morris Mano computer.'
            }
          ],
          keyPoints: [
            'T0, T1, T2 are identical for EVERY instruction.',
            'T3 reads the effective address only for indirect instructions.',
            'SC <- 0 resets timing back to T0 after execution.'
          ],
          mcqs: [
            {
              question: 'During which clock timing signal is the Program Counter (PC) incremented by 1 during fetch?',
              options: ['T0', 'T1', 'T2', 'T3'],
              correctIndex: 1,
              explanation: 'At timing T1, the instruction is read into IR and simultaneously PC is incremented.'
            }
          ]
        },
        {
          id: 'mri-instructions-rtl',
          title: 'Memory-Reference Instructions (AND, ADD, LDA, STA, BUN, BSA, ISZ)',
          simpleExplanation: 'All 7 memory instructions and their exact step-by-step execution RTL micro-operations.',
          detailedExplanation: \`## Memory-Reference Instructions (MRI)

All 7 memory-reference instructions have opcodes $000$ to $110$. Execution starts at timing signal $T_4$ after the effective address is established in AR.

### Complete MRI Execution RTL Table (Q7, Q25, Q38):
| Symbol | Opcode | Hex ($I=0$) | Hex ($I=1$) | Exact Execution RTL Micro-operations | Operational Description |
| :--- | :---: | :---: | :---: | :--- | :--- |
| **AND** | 000 | 0xxx | 8xxx | \`D0T4: DR <- M[AR]\`\\\\n\`D0T5: AC <- AC AND DR, SC <- 0\` | Bitwise AND memory word to AC. |
| **ADD** | 001 | 1xxx | 9xxx | \`D1T4: DR <- M[AR]\`\\\\n\`D1T5: AC <- AC + DR, E <- Cout, SC <- 0\` | Add memory word to AC; carry-out goes to flip-flop E. |
| **LDA** | 010 | 2xxx | Axxx | \`D2T4: DR <- M[AR]\`\\\\n\`D2T5: AC <- DR, SC <- 0\` | Load memory word into AC via DR (AC has no direct path from memory). |
| **STA** | 011 | 3xxx | Bxxx | \`D3T4: M[AR] <- AC, SC <- 0\` | Store AC content into memory word at AR. Only 1 step! |
| **BUN** | 100 | 4xxx | Cxxx | \`D4T4: PC <- AR, SC <- 0\` | Branch Unconditionally (jump to address AR). |
| **BSA** | 101 | 5xxx | Dxxx | \`D5T4: M[AR] <- PC, AR <- AR + 1\`\\\\n\`D5T5: PC <- AR, SC <- 0\` | **Branch and Save Return Address (Subroutine Call)**. |
| **ISZ** | 110 | 6xxx | Exxx | \`D6T4: DR <- M[AR]\`\\\\n\`D6T5: DR <- DR + 1\`\\\\n\`D6T6: M[AR] <- DR, if(DR==0) PC <- PC+1, SC <- 0\` | **Increment and Skip if Zero (Loop Counter)**. |

### How BSA (Subroutine Call) Works:
\`BSA 135\` executed at location 20:
1. Return address (21) is saved in memory at address 135: \`M[135] <- 21\`.
2. Subroutine code starts executing at $135 + 1 = 136$: \`PC <- 136\`.
3. Return is made using indirect branch: \`BUN 135 I\` -> loads \`PC <- M[135] = 21\`.

> [!TIP] **EXAM TIP:**
> For 7-mark question Q38: Write this table with the $D_i T_4, D_i T_5$ RTL lines.
> **About NBR:** Question banks sometimes ask about "NBR". NBR is NOT an instruction! It is simply a variable label in the "Add 100 numbers" program holding constant -100.\`,
          shortNotes: '7 MRI instructions: AND, ADD, LDA (via DR), STA (1 step), BUN (jump), BSA (call), ISZ (loop counter). All end with SC <- 0.',
          examples: [
            {
              title: 'Subroutine Call & Return RTL',
              code: 'BSA 135 at location 20: M[135] <- 21, PC <- 136\\nReturn: BUN 135 I: PC <- M[135] = 21',
              explanation: 'BSA saves PC at target location and jumps to target+1. BUN ... I reads return address back.'
            }
          ],
          keyPoints: [
            'AC has no direct path from memory; LDA must load through DR.',
            'STA finishes in a single clock cycle at T4.',
            'BSA stores return address in the first word of the subroutine.',
            'ISZ takes 3 cycles (T4, T5, T6) to read, increment, and write back.'
          ],
          mcqs: [
            {
              question: 'Why does the LDA instruction take two clock cycles (T4 and T5) to complete?',
              options: ['Because AC is slow', 'Because AC has no direct input from the memory bus', 'Because memory needs two reads', 'To check parity'],
              correctIndex: 1,
              explanation: 'Memory cannot write directly into AC. The word is read into DR at T4, and DR is copied to AC at T5.'
            }
          ]
        },
        {
          id: 'interrupt-cycle-io',
          title: 'Input-Output Configuration & Interrupt Cycle',
          simpleExplanation: 'I/O devices are slow. Instead of wasting CPU time polling flags in a loop, interrupts let hardware pause the CPU only when data is ready.',
          detailedExplanation: \`## Input-Output & Interrupt Cycle (Q8, Q26, Q39)

### Why Interrupts are Essential:
Input/Output devices (keyboard, printer) operate thousands of times slower than the CPU.
- **Programmed I/O (Polling):** The CPU sits in an infinite busy-wait loop testing flags (\`while(!ready);\`), wasting billions of clock cycles.
- **Interrupt-Initiated I/O:** The CPU executes user programs at full speed. When a peripheral needs service, hardware asserts an interrupt signal. The CPU pauses, runs the handler, and resumes.

### Basic Computer I/O Interface:
- **INPR (8 bits):** Holds incoming ASCII character.
- **OUTR (8 bits):** Holds character to print.
- **FGI (Input Flag):** Set to 1 when a key is pressed. Cleared to 0 when read by \`INP\`.
- **FGO (Output Flag):** 1 when printer is ready; 0 when printing. Set by printer when done.
- **IEN (Interrupt Enable):** Set by \`ION\`, cleared by \`IOF\`.

### Hardware Interrupt Flip-Flop (R):
Condition to set interrupt flip-flop $R = 1$:
$$T_0' T_1' T_2' \\\\cdot (IEN) \\\\cdot (FGI + FGO) : R \\\\leftarrow 1$$

### Interrupt Cycle in RTL (Must Memorize - Q26, Q39):
\`\`\`text
RT0: AR <- 0, TR <- PC
RT1: M[AR] <- TR, PC <- 0
RT2: PC <- PC + 1, IEN <- 0, R <- 0, SC <- 0
\`\`\`

### What Happens to the Interrupted Program:
1. The currently executing instruction finishes normally; interrupts are serviced **between instructions**.
2. Return address in PC is saved in **memory location 0**.
3. PC becomes 1 (\`PC <- 1\`).
4. At location 1, programmer places an unconditional jump (\`BUN ISR\`) to the Interrupt Service Routine.
5. Interrupts are disabled (\`IEN <- 0\`) to prevent nested interrupts.
6. Return is made using indirect branch: \`BUN 0 I\` (reads saved PC from location 0 and resumes main program).

> [!NOTE] **DEV BRAIN:**
> Polling = \`while(!ready) {}\` (busy waiting).
> Interrupt = Event listener / webhook callback: register a handler, do useful work, get invoked when event fires. Location 0 is the hardware "stack frame".\`,
          shortNotes: 'Interrupt cycle: RT0: AR <- 0, TR <- PC. RT1: M[0] <- TR, PC <- 0. RT2: PC <- 1, IEN <- 0, R <- 0, SC <- 0. Returns via BUN 0 I.',
          examples: [
            {
              title: 'Interrupt Service Routine Flow',
              code: 'Location 0: [Saved PC]\\nLocation 1: BUN ISR\\n...\\nISR: Save AC, Service Device, Restore AC, ION, BUN 0 I',
              explanation: 'Demonstrating how location 0 stores return pointer and BUN 0 I restores original program counter.'
            }
          ],
          keyPoints: [
            'Interrupts eliminate CPU polling waste.',
            'Interrupt cycle triggers only after instruction execution finishes.',
            'Return address is stored in location 0; execution jumps to location 1.',
            'IEN is cleared to 0 to prevent nested interrupts during service.'
          ],
          mcqs: [
            {
              question: 'In the basic computer, where is the return address saved during an interrupt cycle?',
              options: ['On the CPU stack', 'In register TR permanently', 'In memory location 0', 'In the accumulator'],
              correctIndex: 2,
              explanation: 'The return address (PC) is stored in memory word at address 0 (M[0] <- TR).'
            }
          ]
        }
      ]
    },

    // ── UNIT 3: PROGRAMMING THE BASIC COMPUTER ──
    {
      id: 'unit-3',
      title: 'Unit 3: Programming the Basic Computer',
      description: 'Machine language, assembly language, assembler two-pass translation, program loops, subroutines, and double-precision addition.',
      topics: [
        {
          id: 'assembly-assembler-pass',
          title: 'Assembly Language & Two-Pass Assembler',
          simpleExplanation: 'An assembler converts symbolic assembly language into binary machine code in two passes to resolve forward reference labels.',
          detailedExplanation: \`## Assembly Language & The Two-Pass Assembler

### Pseudo-Instructions:
Pseudo-instructions are directives to the assembler; they do NOT generate machine instructions.
- **ORG N:** Origin. Sets the assembler's Location Counter (LC) to hex address $N$.
- **END:** Marks physical end of symbolic source program.
- **DEC N:** Converts signed decimal constant $N$ into binary.
- **HEX N:** Converts hexadecimal number $N$ into binary.

### Why an Assembler Needs Two Passes (Q3.3):
A label can be referenced before it is defined (**forward reference**):
\`\`\`assembly
        BUN TOTAL       / Jump to TOTAL before assembler knows where TOTAL is!
        ...
TOTAL,  HEX 0           / Defined later in code
\`\`\`

### Two-Pass Translation Table:
| Assembler Stage | Primary Objective | Actions Taken |
| :--- | :--- | :--- |
| **First Pass** | **Build Address-Symbol Table** | Scans every line. Increments Location Counter (LC). If a label exists, stores \`(Label, LC)\` in table. Ignores opcodes. |
| **Second Pass** | **Generate Binary Machine Code** | Translates mnemonics to opcodes, looks up labels in address-symbol table, converts constants (DEC/HEX), and writes object file. |

> [!TIP] **EXAM TIP:**
> For questions about Two-Pass Assembler: State that Pass 1 generates the Address-Symbol Table, and Pass 2 generates binary machine code.\`,
          shortNotes: 'Pass 1 builds the Address-Symbol Table. Pass 2 converts mnemonics and symbolic addresses into binary machine code.',
          examples: [
            {
              title: 'Address Symbol Table Example',
              code: 'ORG 100\\nLDA SUB   -> LC = 100\\n...\\nSUB, DEC -23 -> Address Table: SUB = 107',
              explanation: 'Pass 1 records SUB = 107. Pass 2 replaces LDA SUB with LDA 107.'
            }
          ],
          keyPoints: [
            'Forward references mandate two passes.',
            'Location Counter (LC) tracks memory positions.',
            'ORG sets LC; END terminates translation.'
          ],
          mcqs: [
            {
              question: 'What is the primary output generated by the first pass of a two-pass assembler?',
              options: ['Object code file', 'Address-Symbol Table', 'Relocation dictionary', 'Syntax error log only'],
              correctIndex: 1,
              explanation: 'The first pass scans labels and assigns them addresses to construct the Address-Symbol Table.'
            }
          ]
        },
        {
          id: 'program-loops-subroutines',
          title: 'Program Loops (Add 100 Numbers) & Subroutines (BSA / BUN I)',
          simpleExplanation: 'Loops are built with ISZ and BUN. Subroutines are called with BSA and returned with BUN ... I.',
          detailedExplanation: \`## Program Loops & Subroutines

### Program to Add 100 Numbers Stored from Address 150h (Q40):
The basic computer lacks a \`FOR\` or \`WHILE\` loop instruction. Loops are constructed using:
- **ISZ** (Increment and Skip if Zero) as counter.
- **BUN** to repeat the loop.
- **Indirect Addressing** (\`ADD PTR I\`) to walk an array pointer.

\`\`\`assembly
        ORG 100         / Program starts at hex 100
        LDA ADS         / Load start address of array (150)
        STA PTR         / Store in pointer variable
        LDA NBR         / Load constant -100 into AC
        STA CTR         / Store in loop counter
        CLA             / Clear AC (running sum = 0)
LOP,    ADD PTR I       / Add number pointed to by PTR (Indirect!)
        ISZ PTR         / Increment pointer to next array word
        ISZ CTR         / Increment counter; skip next when CTR == 0
        BUN LOP         / Repeat loop
        STA SUM         / Store calculated sum
        HLT             / Stop

ADS,    HEX 150         / Array base address
PTR,    HEX 0           / Pointer variable
NBR,    DEC -100        / Negative count constant (-100)
CTR,    HEX 0           / Counter variable
SUM,    HEX 0           / Final sum
        ORG 150
        DEC 75          / First number
        ...
        END
\`\`\`

### Subroutine Linkage (BSA and BUN ... I - Q10, Q27):
1. **Call (\`BSA SUB\`):** Saves return address in the first word of the subroutine (\`M[SUB] <- PC\`) and sets \`PC <- SUB + 1\`.
2. **Subroutine Body:** Runs useful operations.
3. **Return (\`BUN SUB I\`):** Indirect branch to \`SUB\`, setting \`PC <- M[SUB]\` (restores saved return address).

> [!WARNING] **TRAP:**
> Because BSA saves the return address inside the subroutine's first memory word, **subroutines in the basic computer cannot be recursive**! A second call would overwrite the saved return address. Real computers use a **Stack** to support recursion.\`,
          shortNotes: 'Loop uses ISZ CTR and BUN. BSA saves return address at first word of subroutine; BUN SUB I returns from subroutine.',
          examples: [
            {
              title: 'Subroutine Call & Return',
              code: '100: BSA SH4     -> M[SH4] = 101, PC = SH4 + 1\\n...\\nSH4, HEX 0       -> Holds return address 101\\n     CIL x4\\n     BUN SH4 I   -> PC = M[SH4] = 101 (Returns!)',
              explanation: 'SH4 subroutine shifts AC left 4 bits and returns cleanly to main program.'
            }
          ],
          keyPoints: [
            'ISZ increments memory word and skips next instruction if result is 0.',
            'BSA stores return address in first word of subroutine.',
            'Basic computer subroutines cannot support recursion.'
          ],
          mcqs: [
            {
              question: 'Why can subroutines in the basic computer not be called recursively?',
              options: ['No memory available', 'Return address is overwritten in subroutine first word', 'AC is cleared', 'CPU halts'],
              correctIndex: 1,
              explanation: 'BSA stores return address in subroutine code itself; recursive call overwrites return address causing infinite loop.'
            }
          ]
        }
      ]
    },

    // ── UNIT 4: MICROPROGRAMMED CONTROL ──
    {
      id: 'unit-4',
      title: 'Unit 4: Microprogrammed Control',
      description: 'Control memory, microprogram sequencing, microinstruction format (20 bits), and comparison with hardwired control.',
      topics: [
        {
          id: 'control-memory-sequencing',
          title: 'Control Memory & Address Sequencing (Q11, Q12, Q28, Q29, Q41)',
          simpleExplanation: 'Microprogrammed control stores control signals inside a ROM memory instead of building complex wiring gates.',
          detailedExplanation: \`## Microprogrammed Control & Address Sequencing

In a microprogrammed control unit, control signals are stored as words in a dedicated **Control Memory (ROM)**. Reading a word from control memory outputs the micro-operations for that clock cycle.

### Key Components:
- **Control Memory (ROM):** Stores the microprogram routines (Fetch, Decode, Execute routines).
- **Control Address Register (CAR):** Holds address of next microinstruction (functions as micro-PC).
- **Control Data Register (Pipeline Register):** Holds current microinstruction while next is read.
- **Sequencer (Next-Address Generator):** Computes next CAR address.

### Four Methods of Generating Next Address (Q29, Q41):
1. **Sequential Increment:** \`CAR <- CAR + 1\` (normal execution).
2. **Branching:** Conditional or unconditional jump (\`CAR <- AD\` if condition true).
3. **Opcode Mapping:** Machine opcode mapped to starting routine address: \`CAR(2-5) <- DR(11-14), CAR(0,1,6) <- 0\`.
4. **Subroutine Call & Return:** \`CALL: CAR <- AD, SBR <- CAR + 1\`. \`RET: CAR <- SBR\` (SBR = Subroutine Register).

### Hardwired vs Microprogrammed Control (Q13):
| Parameter | Hardwired Control | Microprogrammed Control |
| :--- | :--- | :--- |
| **Implementation** | Gates, flip-flops, decoders (fixed circuit). | Control Memory (ROM) + Sequencer. |
| **Speed** | **Extremely Fast** (gate delay only). | Slower (requires ROM read cycle per step). |
| **Flexibility** | Difficult to modify (must rewire hardware). | Easy to modify (update microcode in ROM). |
| **Architecture** | RISC processors (ARM, RISC-V). | CISC processors (x86, IBM). |\`,
          shortNotes: 'Control memory stores microprograms. CAR holds next microinstruction address. Sequencer uses Increment, Branch, Mapping, or Subroutine Call.',
          examples: [
            {
              title: 'Opcode Mapping',
              code: 'Opcode ADD = 0001 -> CAR = 0000100 (Address 4 in ROM)',
              explanation: 'Each routine gets 4 words in control memory.'
            }
          ],
          keyPoints: [
            'Microprogrammed control uses ROM lookup tables instead of random logic gates.',
            'CAR functions as the program counter for microinstructions.',
            'SBR register stores return address for microroutines.'
          ],
          mcqs: [
            {
              question: 'Which register holds the address of the next microinstruction to be read from control memory?',
              options: ['Program Counter (PC)', 'Control Address Register (CAR)', 'Instruction Register (IR)', 'Subroutine Register (SBR)'],
              correctIndex: 1,
              explanation: 'CAR holds the address of the next microinstruction in control memory.'
            }
          ]
        },
        {
          id: 'microinstruction-format-20bit',
          title: '20-Bit Microinstruction Format & Fetch Routine',
          simpleExplanation: 'Microinstructions have fields for micro-operations (F1, F2, F3), condition testing (CD), branch type (BR), and address (AD).',
          detailedExplanation: \`## 20-Bit Microinstruction Format (Figure 4.3)

\`\`\`text
   3      3      3       2      2         7
 +------+------+------+------+------+------------+
 |  F1  |  F2  |  F3  |  CD  |  BR  |  AD (addr) | = 20 bits
 +------+------+------+------+------+------------+
   Micro-ops fields     Cond   Branch   Address in ROM
\`\`\`

- **F1, F2, F3 (3 bits each = 9 bits):** Up to 3 micro-operations execute concurrently in one cycle.
- **CD (Condition, 2 bits):** \`00=U\` (Unconditional), \`01=I\` (Indirect bit), \`10=S\` (Sign bit), \`11=Z\` (Zero bit).
- **BR (Branch, 2 bits):** \`00=JMP\`, \`01=CALL\`, \`10=RET\`, \`11=MAP\`.
- **AD (Address, 7 bits):** Address in 128-word control memory.

### Complete Fetch Routine in Microcode (Mano Architecture):
| Address | Label | F1 | F2 | F3 | CD | BR | AD | Hardware RTL Executed |
| :---: | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| **64** | FETCH | PCTAR | - | - | U | JMP | 65 | \`AR <- PC\` |
| **65** | - | - | READ | INCPC | U | JMP | 66 | \`DR <- M[AR], PC <- PC + 1\` |
| **66** | - | DRTAR | - | - | U | MAP | - | \`AR <- DR(0-10), CAR <- Map(Opcode)\` |\`,
          shortNotes: '20-bit format: F1(3) F2(3) F3(3) CD(2) BR(2) AD(7). Fetch routine takes 3 microinstructions at ROM addresses 64, 65, 66.',
          examples: [
            {
              title: 'Fetch Microinstruction at Address 65',
              code: 'Address 65: F2=READ, F3=INCPC, CD=U, BR=JMP, AD=66',
              explanation: 'Simultaneously reads memory into DR and increments PC, then advances CAR to 66.'
            }
          ],
          keyPoints: [
            'Up to 3 micro-operations run concurrently in one microinstruction.',
            'CD field selects condition flag to test.',
            'BR field specifies JMP, CALL, RET, or MAP.'
          ],
          mcqs: [
            {
              question: 'In the 20-bit microinstruction format, how many bits are used for the branch address field (AD)?',
              options: ['3 bits', '5 bits', '7 bits', '12 bits'],
              correctIndex: 2,
              explanation: 'AD uses 7 bits, allowing addressing of 2^7 = 128 words of control memory.'
            }
          ]
        }
      ]
    },

    // ── UNIT 5: CENTRAL PROCESSING UNIT ──
    {
      id: 'unit-5',
      title: 'Unit 5: Central Processing Unit (CPU)',
      description: 'General register organization, 14-bit control word, stack architecture, 3/2/1/0-address formats, addressing modes, and RISC vs CISC.',
      topics: [
        {
          id: 'general-register-organization',
          title: 'General Register Organization & 14-Bit Control Word (Q30, Q42)',
          simpleExplanation: 'Modern CPUs connect multiple registers to an ALU via two multiplexers, with a destination decoder saving results.',
          detailedExplanation: \`## General Register Organization (Q30, Q42)

In modern processors, intermediate results remain inside high-speed general registers ($R_1$ to $R_7$) rather than visiting memory repeatedly.

### Architecture Block Diagram:
- **Two Multiplexers (MUX A and MUX B):** Select source registers for the A Bus and B Bus.
- **ALU:** Operates on the two buses based on Operation Select (**OPR**).
- **Destination Decoder (3x8):** Enables the **Load** input of the designated destination register.

### 14-Bit Control Word Structure:
$$\\\\mathbf{\\\\text{Control Word} = \\\\text{SELA (3)} \\\\; | \\\\; \\\\text{SELB (3)} \\\\; | \\\\; \\\\text{SELD (3)} \\\\; | \\\\; \\\\text{OPR (5)} = 14 \\\\text{ bits}}$$

### Selection Encoding Table:
| Binary | SELA (Source A) | SELB (Source B) | SELD (Destination) |
| :---: | :---: | :---: | :---: |
| **000** | Input | Input | None (No register loaded) |
| **001** | R1 | R1 | R1 |
| **010** | R2 | R2 | R2 |
| **011** | R3 | R3 | R3 |
| **100** | R4 | R4 | R4 |
| **101** | R5 | R5 | R5 |
| **110** | R6 | R6 | R6 |
| **111** | R7 | R7 | R7 |

### Worked Example: Execute $R_3 \\\\leftarrow R_1 + R_2$ (Q42):
- **SELA = 001** ($R_1$ drives A Bus).
- **SELB = 010** ($R_2$ drives B Bus).
- **OPR = 00010** (ALU executes ADD: $A + B$).
- **SELD = 011** (Decoder enables Load of $R_3$).
- **14-bit Control Word:** \`001 010 011 00010\`.
*Entire operation completes in one clock cycle!*

> [!NOTE] **DEV BRAIN:**
> The control word is simply function arguments encoded as bits:
> \`alu(OPR, reg[SELA], reg[SELB]) -> reg[SELD]\`.\`,
          shortNotes: 'Control Word (14 bits) = SELA(3) | SELB(3) | SELD(3) | OPR(5). Executes register-to-register operations in 1 clock cycle.',
          examples: [
            {
              title: 'Control Word for R1 <- R2 - R3',
              code: 'SELA=R2(010), SELB=R3(011), SELD=R1(001), OPR=SUB(00101)\\nControl Word: 010 011 001 00101',
              explanation: 'Puts R2 on A bus, R3 on B bus, subtracts, and writes to R1.'
            }
          ],
          keyPoints: [
            '7 registers feed two MUXes into an ALU.',
            'Destination decoder latches result into target register.',
            'Takes exactly 1 clock cycle.'
          ],
          mcqs: [
            {
              question: 'In general register organization, how many bits are used in the control word to select the destination register?',
              options: ['2 bits', '3 bits', '4 bits', '5 bits'],
              correctIndex: 1,
              explanation: '3 bits (SELD) are used to decode 1 of 7 destination registers using a 3x8 decoder.'
            }
          ]
        },
        {
          id: 'stack-organization-rpn',
          title: 'Stack Organization, PUSH/POP & Reverse Polish Notation (Q16, Q31, Q43, Q45)',
          simpleExplanation: 'A stack is a Last-In First-Out (LIFO) storage structure managed by a Stack Pointer (SP). Used for evaluating expressions in Reverse Polish Notation without parentheses.',
          detailedExplanation: \`## Stack Organization & Reverse Polish Notation (RPN)

### Register Stack vs Memory Stack (Q16, Q45):
| Parameter | Register Stack (64 Words) | Memory Stack |
| :--- | :--- | :--- |
| **Location** | Dedicated CPU register array. | Reserved region of main RAM. |
| **Speed** | Ultra fast (zero memory bus accesses). | Slower (requires RAM bus cycles). |
| **Capacity** | Fixed & small (64 words). | Large, bounded only by RAM size. |
| **SP Growth** | **Increments on PUSH** (\`SP <- SP + 1\`). | **Decrements on PUSH** (\`SP <- SP - 1\`). |
| **Flags** | FULL and EMTY 1-bit hardware flags. | Limit registers check overflow. |

### Reverse Polish Notation (RPN):
Infix expressions are converted to Postfix (RPN), removing the need for parentheses:
- Infix: $(A + B) \\\\times (C - D)$
- Postfix (RPN): $A \\\\; B \\\\; + \\\\; C \\\\; D \\\\; - \\\\; \\\\times$

### Evaluating $(3 \\\\times 4) + (5 \\\\times 6) = 3 \\\\; 4 \\\\; * \\\\; 5 \\\\; 6 \\\\; * \\\\; +$:
1. Read 3: \`PUSH 3\` -> Stack: \`[3]\`
2. Read 4: \`PUSH 4\` -> Stack: \`[3, 4]\`
3. Read \`*\`: \`POP 4\`, \`POP 3\`, compute $3 \\\\times 4 = 12$, \`PUSH 12\` -> Stack: \`[12]\`
4. Read 5: \`PUSH 5\` -> Stack: \`[12, 5]\`
5. Read 6: \`PUSH 6\` -> Stack: \`[12, 5, 6]\`
6. Read \`*\`: \`POP 6\`, \`POP 5\`, compute $5 \\\\times 6 = 30$, \`PUSH 30\` -> Stack: \`[12, 30]\`
7. Read \`+\`: \`POP 30\`, \`POP 12\`, compute $12 + 30 = 42$, \`PUSH 42\` -> **Result = 42**.\`,
          shortNotes: 'RPN (Postfix) eliminates parentheses. Operands pushed; operators pop top two, compute, and push result.',
          examples: [
            {
              title: 'Stack Operation Trace (Q43)',
              code: 'PUSH A -> [A]\\nPUSH B -> [A, B]\\nPUSH C -> [A, B, C]\\nPOP    -> [A, B] (DR=C)\\nPUSH D -> [A, B, D]\\nPOP    -> [A, B] (DR=D)',
              explanation: 'Stack Pointer (SP) points to top item. POP moves SP down but does not erase until overwritten.'
            }
          ],
          keyPoints: [
            'Stack operates on LIFO (Last-In First-Out) principle.',
            'Register stack SP increments on PUSH; Memory stack SP decrements on PUSH.',
            'RPN expressions are evaluated by scanning left to right.'
          ],
          mcqs: [
            {
              question: 'What is the Reverse Polish Notation (RPN) for the expression (A + B) * (C - D)?',
              options: ['* + A B - C D', 'A B + C D - *', 'A B C D + - *', '+ A B * - C D'],
              correctIndex: 1,
              explanation: '(A + B) becomes A B +, (C - D) becomes C D -, multiplied together gives A B + C D - *.'
            }
          ]
        },
        {
          id: 'addressing-modes-master',
          title: 'Addressing Modes Master Guide & Numericals (Q14, Q15, Q32, Q33)',
          simpleExplanation: 'Addressing modes specify the rule for finding where the operand lives in memory or registers.',
          detailedExplanation: \`## 10 Addressing Modes Master Guide (Q32)

Assume address field = 300, $R_1 = 200$, Index Register $XR = 100$, $M[300] = 200$, $M[200] = 45$, $M[400] = 77$:

| # | Addressing Mode | Effective Address (EA) Formula | Example Loaded into AC | Memory Refs | Primary Practical Purpose |
| :-: | :--- | :--- | :--- | :---: | :--- |
| **1** | **Implied** | Implied by opcode (AC or TOS) | \`CMA\` | 0 | Very short 1-byte instructions. |
| **2** | **Immediate** | No EA (operand inside instruction) | \`LOAD #300\` -> \`AC = 300\` | 0 | Initializing constants. |
| **3** | **Register** | Operand in CPU register | \`LOAD R1\` -> \`AC = 200\` | 0 | Fastest access, no bus delay. |
| **4** | **Register Indirect** | $EA = [R_1]$ | \`LOAD (R1)\` -> \`AC = M[200] = 45\` | 1 | High-speed pointer dereference. |
| **5** | **Autoincrement** | $EA = [R_1]$, then $R_1 \\\\leftarrow R_1 + 1$ | \`LOAD (R1)+\` -> \`AC = 45\` | 1 | Traversing arrays/buffers linearly. |
| **6** | **Direct** | $EA = \\\\text{Address part}$ | \`LOAD 300\` -> \`AC = M[300] = 200\` | 1 | Accessing simple static variables. |
| **7** | **Indirect** | $EA = M[\\\\text{Address part}]$ | \`LOAD @300\` -> \`AC = M[200] = 45\` | 2 | Pointers and jump tables. |
| **8** | **Relative** | $EA = PC + \\\\text{Displacement}$ | \`BR +350\` | 1 | Relocatable code & short branch jumps. |
| **9** | **Indexed** | $EA = XR + \\\\text{Displacement}$ | \`LOAD 300(XR)\` -> \`AC = M[400] = 77\` | 1 | Array indexing (\`array[i]\`). |
| **10**| **Base Register** | $EA = \\\\text{Base} + \\\\text{Displacement}$ | \`LOAD 20(BASE)\` | 1 | OS program relocation in memory. |

### Essential Exam Numericals:
- **Q14 - Indexed Addressing:** Given $R_1 = 500$ (index register), displacement = $250$:
  $$EA = 250 + 500 = \\\\mathbf{750}$$
- **Q33 - Relative Addressing:** Given $PC = 1200$, displacement = $+350$:
  $$EA = 1200 + 350 = \\\\mathbf{1550}$$

> [!NOTE] **DEV BRAIN:**
> - Immediate = Literal (\`x = 5\`).
> - Direct = Variable (\`x = var\`).
> - Indirect = Pointer (\`x = *ptr\`).
> - Indexed = Array indexing (\`arr[i]\` -> base + index).
> - Base Register = Object field offset (\`obj.field\`).
> - Relative = Local goto / branch offset (\`goto +10\`).\`,
          shortNotes: '10 Addressing modes: Immediate(constant), Direct(variable), Indirect(pointer), Indexed(array XR+disp), Relative(PC+disp).',
          examples: [
            {
              title: 'Indexed Addressing Calculation',
              code: 'Index Register XR = 500, Displacement = 250\\nEffective Address = 250 + 500 = 750',
              explanation: 'Memory location 750 contains the actual operand.'
            }
          ],
          keyPoints: [
            'Addressing modes give programming versatility and save address bits.',
            'Relative addressing creates position-independent relocatable code.',
            'Indexed mode is optimal for stepping through sequential array elements.'
          ],
          mcqs: [
            {
              question: 'Which addressing mode is most effective for accessing elements of an array in memory?',
              options: ['Immediate addressing', 'Direct addressing', 'Indexed addressing', 'Implied addressing'],
              correctIndex: 2,
              explanation: 'Indexed addressing adds an index register offset to a base array address, perfect for array traversal.'
            }
          ]
        },
        {
          id: 'risc-cisc-register-windows',
          title: 'RISC vs CISC Architecture & Overlapped Register Windows (Q18, Q34)',
          simpleExplanation: 'RISC uses few simple instructions and large register files. CISC uses many complex instructions and microcode. Register windows eliminate function call overhead.',
          detailedExplanation: \`## RISC vs CISC & Overlapped Register Windows (Q18, Q34)

### 8-Point Comprehensive Comparison Table:
| Comparison Basis | RISC (Reduced Instruction Set) | CISC (Complex Instruction Set) |
| :--- | :--- | :--- |
| **Instruction Set** | Small, simple, fixed (typically < 100). | Large, complex, specialized (100 to 300). |
| **Instruction Length** | Fixed length (e.g., all 32 bits); easy decode. | Variable length (1 to 15 bytes); complex decode. |
| **Addressing Modes** | Few, simple modes (typically 3 to 5). | Many complex modes (10 to 20). |
| **Memory Access** | **Strictly LOAD & STORE only**. | Arithmetic instructions can directly access memory. |
| **Control Unit** | **Hardwired** for maximum clock speed. | **Microprogrammed** (stored in ROM). |
| **Execution Rate** | One instruction per clock cycle (pipelined). | Multiple clock cycles per instruction. |
| **Registers** | Large register file (e.g., 128+ registers). | Small register set (8 to 16 registers). |
| **Compiler / Hardware** | Smart compiler does heavy lifting. | Complex hardware; simpler compiler. |
| **Examples** | ARM (Apple Silicon, Android), MIPS, RISC-V. | Intel x86 (Core i5/i7/i9), AMD, VAX. |

### Overlapped Register Windows (RISC Innovation):
In standard CISC, every function call pushes parameters to RAM and saves registers on the stack.
In RISC, CPU registers are partitioned into overlapping windows:
- **Global Registers ($G$):** Common to all procedures.
- **Local Registers ($L$):** Private to current procedure.
- **Common / Overlap Registers ($C$):** Shared between Caller and Callee for zero-copy parameter passing!

### Register Windows Formulas (Must Memorize):
$$\\\\mathbf{\\\\text{Window Size} = L + 2C + G}$$
$$\\\\mathbf{\\\\text{Total Register File Size} = (L + C) \\\\times W + G}$$
Where $W$ = Number of windows.

**Slide Worked Example:**
Given $G = 10, L = 10, C = 6, W = 4$:
- Window Size = $10 + 2(6) + 10 = \\\\mathbf{32 \\\\text{ registers}}$.
- Total Register File = $(10 + 6) \\\\times 4 + 10 = 16 \\\\times 4 + 10 = \\\\mathbf{74 \\\\text{ registers}}$ ($R_0$ to $R_{73}$).

> [!TIP] **EXAM TIP:**
> For 5-mark and 7-mark questions (Q18, Q34): Draw the comparison table with at least 6 points, write the Overlapped Register Windows formulas, and solve the numerical ($W=4 \\\\rightarrow 74$ registers).\`,
          shortNotes: 'RISC: Simple fixed instructions, load/store only, hardwired, large register file. Register File = (L + C)*W + G. Window = L + 2C + G.',
          examples: [
            {
              title: 'Register Windows Calculation',
              code: 'G=10, L=10, C=6, W=4\\nWindow = 10 + 2(6) + 10 = 32 registers\\nRegister File = (10 + 6)*4 + 10 = 74 registers',
              explanation: '74 total registers partitioned into 4 overlapping windows of 32 registers each.'
            }
          ],
          keyPoints: [
            'RISC relies on load/store architecture and hardwired control.',
            'CISC emphasizes rich instructions in hardware using microcode.',
            'Overlapped register windows eliminate memory stack frame overhead during function calls.'
          ],
          mcqs: [
            {
              question: 'In RISC architecture with G=10 global, L=10 local, C=6 common registers, what is the size of each window?',
              options: ['26 registers', '32 registers', '42 registers', '74 registers'],
              correctIndex: 1,
              explanation: 'Window size = L + 2C + G = 10 + 2(6) + 10 = 32 registers.'
            }
          ]
        }
      ]
    },

    // ── UNIT 6: PIPELINE AND VECTOR PROCESSING ──
    {
      id: 'unit-6',
      title: 'Unit 6: Pipeline & Vector Processing',
      description: 'Flynn classification, pipelining speedup formulas, arithmetic and instruction pipelines, hazards, and array processors.',
      topics: [
        {
          id: 'pipelining-flynn-speedup',
          title: 'Flynn\\\'s Classification & Pipeline Speedup Formula',
          simpleExplanation: 'Pipelining overlaps different stages of instruction execution like a factory assembly line, vastly increasing throughput.',
          detailedExplanation: \`## Flynn's Classification & Pipelining Speedup

### Flynn's Classification (4 Architectures):
Classified by number of simultaneous instruction and data streams:
1. **SISD (Single Instruction, Single Data):** Conventional uniprocessor (e.g., standard PC). Sequential execution.
2. **SIMD (Single Instruction, Multiple Data):** Vector and Array processors, modern GPUs. One instruction broadcast to hundreds of processing units acting on different array elements simultaneously.
3. **MISD (Multiple Instruction, Single Data):** Multiple instructions operate on the same data stream. Theoretical (used in fault-tolerant flight computers).
4. **MIMD (Multiple Instruction, Multiple Data):** Multicore processors, distributed computing clusters, supercomputers.

### Pipelining Speedup Formula:
A pipeline divides a sequential task into $k$ sub-operations (segments), each executing concurrently in separate hardware stages separated by interface registers.

Let:
- $k$ = number of pipeline segments (stages)
- $n$ = number of tasks to execute
- $t_p$ = clock cycle time of the pipeline
- $t_n$ = execution time for non-pipelined hardware ($t_n = k \\\\cdot t_p$)

$$\\\\mathbf{\\\\text{Total Clock Cycles for } n \\\\text{ tasks} = k + n - 1}$$
$$\\\\mathbf{\\\\text{Speedup } S = \\\\frac{\\\\text{Non-pipelined Time}}{\\\\text{Pipelined Time}} = \\\\frac{n \\\\cdot t_n}{(k + n - 1) \\\\cdot t_p} = \\\\frac{n \\\\cdot k}{k + n - 1}}$$

**As $n \\\\rightarrow \\\\infty$ (large number of tasks):**
$$\\\\mathbf{S \\\\rightarrow k}$$
*The maximum theoretical speedup equals the number of stages in the pipeline!*

**Worked Numerical Example:**
If $k = 4$ stages, $n = 100$ tasks, $t_p = 20\\\\text{ ns}$, $t_n = 80\\\\text{ ns}$:
$$S = \\\\frac{100 \\\\times 80}{(4 + 99) \\\\times 20} = \\\\frac{8000}{2060} \\\\approx \\\\mathbf{3.88}$$
(Nearly achieves theoretical maximum of 4x speedup!).\`,
          shortNotes: 'Flynn: SISD, SIMD (GPUs), MISD, MIMD (Multicore). Pipeline Speedup S = (n*k)/(k+n-1). Max speedup approaches k.',
          examples: [
            {
              title: 'Speedup Calculation',
              code: 'k=4 stages, n=100 tasks\\nCycles = 4 + 100 - 1 = 103 cycles\\nNon-pipelined = 100 * 4 = 400 cycles\\nSpeedup = 400 / 103 = 3.88x',
              explanation: '100 tasks finish in 103 clock cycles instead of 400 cycles.'
            }
          ],
          keyPoints: [
            'Flynn classifies systems by instruction and data streams.',
            'Pipelining increases throughput, not individual task latency.',
            'Speedup approaches number of stages k for large workloads.'
          ],
          mcqs: [
            {
              question: 'In a 5-segment pipeline executing 100 tasks, how many clock cycles are required to complete all tasks?',
              options: ['500 cycles', '105 cycles', '104 cycles', '96 cycles'],
              correctIndex: 2,
              explanation: 'Total cycles = k + n - 1 = 5 + 100 - 1 = 104 clock cycles.'
            }
          ]
        },
        {
          id: 'instruction-pipeline-hazards',
          title: 'Instruction Pipeline & Conflict Remedies (Hazards)',
          simpleExplanation: 'Instruction pipelines overlap Fetch, Decode, Operand Fetch, and Execute. Hazards (resource, data, branch) stall the pipeline.',
          detailedExplanation: \`## Instruction Pipeline & Conflicts (Hazards)

### 4-Stage Instruction Pipeline:
1. **FI (Fetch Instruction):** Read instruction from cache/memory.
2. **DA (Decode & Address):** Decode opcode and calculate effective address.
3. **FO (Fetch Operand):** Read operand from memory or register.
4. **EX (Execute):** Perform ALU operation and store result.

### Three Types of Pipeline Conflicts (Hazards) & Remedies:
| Conflict Type | Physical Root Cause | Hardware / Software Remedies |
| :--- | :--- | :--- |
| **1. Resource Conflict (Structural Hazard)** | Two stages attempt to access the same physical hardware resource simultaneously (e.g., FI and FO both need RAM). | **Separate Harvard Cache:** Independent Instruction Cache and Data Cache. |
| **2. Data Dependency (Data Hazard)** | An instruction needs the result of a previous instruction that has not yet finished writing back (\`RAW\` hazard). | **1. Hardware Interlocking** (stall pipeline).\\\\n**2. Operand Forwarding (Bypassing):** Forward ALU output directly to next ALU input.\\\\n**3. Delayed Load:** Compiler reorders code. |
| **3. Branch Difficulty (Control Hazard)** | Conditional jump changes the PC, making all prefetched instructions in the pipeline incorrect. | **1. Branch Prediction** (Static/Dynamic).\\\\n**2. Branch Target Buffer (BTB)**.\\\\n**3. Loop Buffer**.\\\\n**4. Delayed Branch:** Execute branch delay slot. |

> [!NOTE] **DEV BRAIN:**
> Think of pipeline hazards like git merge conflicts or CI/CD build bottlenecks:
> - Structural = Two jobs trying to use the same GPU.
> - Data = Job B needs artifact from Job A before Job A finishes.
> - Control = If statement changes which downstream jobs should run.\`,
          shortNotes: '3 Hazards: Structural (memory conflict -> fix with Harvard cache), Data (RAW dependency -> fix with operand forwarding), Control (branch jump -> fix with branch prediction).',
          examples: [
            {
              title: 'Data Forwarding Bypass',
              code: 'ADD R1, R2, R3   (R1 ready at ALU output at cycle 3)\\nSUB R4, R1, R5   (Needs R1 at cycle 4)\\nBypass forwards R1 output directly to ALU input without waiting for register write-back.',
              explanation: 'Eliminates 2 pipeline stall bubbles.'
            }
          ],
          keyPoints: [
            'Pipelines suffer from structural, data, and control hazards.',
            'Operand forwarding resolves data dependencies without stalling.',
            'Branch prediction mitigates control hazard penalties.'
          ],
          mcqs: [
            {
              question: 'Which technique resolves data dependency hazards by routing ALU results directly to the next instruction without waiting for write-back?',
              options: ['Branch prediction', 'Operand forwarding (bypassing)', 'Harvard caching', 'Instruction prefetching'],
              correctIndex: 1,
              explanation: 'Operand forwarding routes the output of the ALU directly to the ALU inputs for the next instruction.'
            }
          ]
        }
      ]
    }
  ]
};
`;

const targetPath = path.join(__dirname, '..', 'src', 'data', 'computer-architecture.ts');
fs.writeFileSync(targetPath, caContent, 'utf8');
console.log('Successfully written complete Computer Architecture Master File!');

