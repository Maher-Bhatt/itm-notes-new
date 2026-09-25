import { Subject } from './types';

export const computerArchitecture: Subject = {
  id: 'ca-101',
  name: 'Computer Architecture',
  code: 'CS401',
  color: 'bg-blue-600',
  icon: 'cpu',
  description: 'Complete MST Exam Survival Notes covering Units 1 to 6 in plain language, all 46 question-bank questions, register transfer language, basic computer design, assembly programming, microprogrammed control, CPU datapath, and pipelining.',
  semester: 3,
  units: [
    // ── UNIT 1: REGISTER TRANSFER & MICRO-OPERATIONS ──
    {
      id: 'unit-1',
      title: 'Unit 1: Register Transfer & Micro-operations',
      description: 'Register Transfer Language (RTL), Common Bus System, Arithmetic, Logic & Shift Micro-operations, and Arithmetic Logic Unit (ALU) design.',
      topics: [
        {
          id: 'rtl-fundamentals',
          title: 'Register Transfer Language (RTL)',
          simpleExplanation: 'RTL is a universal symbolic language used to describe how data moves between CPU registers during clock cycles, similar to how code assigns variables.',
          detailedExplanation: `## Register Transfer Language (RTL)

Micro-operation: An elementary operation performed on data stored in registers during one clock pulse (shift, load, clear, add, increment...). RTL is the symbolic notation used to describe such micro-operations precisely and briefly. RTL specifies **what** happens; the control unit is the physical circuit that makes it happen.

### RTL Hardware Implementation Architecture
\`\`\`mermaid
flowchart LR
    R1["Source Register R1 (Flip-Flop Group)"] -->|"16-Bit Data Lines"| R2["Destination Register R2 (Flip-Flop Group)"]
    P["Control Variable (P = 1)"] -->|"Load Enable Signal"| LD["LOAD Pin"]
    CLK["Master Clock Pulse (Rising Edge)"] -->|"CLK"| R2
    LD --> R2
\`\`\`

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
> \`\`\`c
> if (P) {
>     R2 = R1; // Non-destructive read: R1 still has its value!
> }
> \`\`\`
> Half of computer architecture is just concepts you already know in programming (pointers, stacks, loops, condition checks), implemented directly with copper wires.

> [!TIP] **EXAM TIP:**
> For 3-mark question Q1: Always write the definition of RTL, give R2 <- R1 (simple) and P: R2 <- R1 (conditional), and explicitly explain that P connects to the **LOAD input** of the destination register.

> [!WARNING] **TRAP:**
> R2 <- R1 is a **COPY**, never a move! The source register R1 is never cleared or emptied.

> [!IMPORTANT] **MEMORIZE:**
> **Micro-operation:** An elementary operation performed on data stored in one or more registers during one single clock pulse.`,
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
          theoryQuestions: [
            {
              question: 'Define Register Transfer Language (RTL). State the meaning of R2 <- R1 and P: R2 <- R1 with hardware implications.',
              marks: '3 Marks',
              answer: 'Register Transfer Language (RTL) is a symbolic notation used to describe the micro-operations performed on data stored in registers during clock cycles.\n\n1. **R2 <- R1 (Unconditional Transfer):** Data from register R1 is copied into register R2 at the active clock edge. R1 retains its value (non-destructive read), while R2 takes the new value.\n2. **P: R2 <- R1 (Conditional Transfer):** The transfer occurs only if control condition P = 1. In physical hardware, control signal P is wired directly to the **LOAD enable pin** of R2, while the master clock connects to R2\'s clock input.',
              keyPoints: [
                'Definition of RTL as symbolic description of micro-operations.',
                'Unconditional vs conditional transfer differentiation.',
                'Control variable P wired to LOAD pin of destination register.'
              ]
            },
            {
              question: 'Explain how simultaneous register transfer (T: R1 <- R2, R2 <- R1) is implemented in digital hardware.',
              marks: '5 Marks',
              answer: 'Simultaneous register transfer (T: R1 <- R2, R2 <- R1) swaps the contents of R1 and R2 in a single clock cycle without requiring a temporary register.\n\n**Hardware Mechanism:**\n- Registers in modern computers are built using **edge-triggered master-slave flip-flops**.\n- At the rising edge of clock pulse T, the inputs of R1 (connected to outputs of R2) and inputs of R2 (connected to outputs of R1) are sampled simultaneously.\n- Because propagation delay through the flip-flop is greater than the setup time, both registers latch each other\'s old contents before the new outputs appear.',
              keyPoints: [
                'Uses edge-triggered master-slave flip-flops.',
                'Sampling occurs simultaneously on the rising clock edge.',
                'Propagation delay prevents race conditions.'
              ]
            }
          ],
          mcqs: [
            {
              question: 'In RTL, what does the statement P: R2 <- R1 mean in hardware?',
              options: ['R1 is cleared to 0', 'R2 loads R1 only if P = 1', 'R1 and R2 are compared', 'P is incremented'],
              correctIndex: 1,
              explanation: 'The colon denotes a condition: transfer occurs only if control variable P = 1.'
            },
            {
              question: 'What is the nature of the read and write operations during R2 <- R1?',
              options: ['Destructive read, non-destructive write', 'Non-destructive read, destructive write', 'Both are destructive', 'Both are non-destructive'],
              correctIndex: 1,
              explanation: 'Reading R1 does not erase its content (non-destructive), while writing to R2 replaces its previous content (destructive).'
            },
            {
              question: 'In digital hardware, where is the control signal P physically connected during P: R2 <- R1?',
              options: ['Clock input of R1', 'Clear input of R2', 'LOAD enable input of R2', 'Output enable of R2'],
              correctIndex: 2,
              explanation: 'Control condition P is connected to the LOAD input of the destination register R2 so it only updates when P=1.'
            },
            {
              question: 'What type of flip-flops allow simultaneous register swapping (T: R1 <- R2, R2 <- R1) in one clock cycle?',
              options: ['Level-sensitive latches', 'Edge-triggered flip-flops', 'Monostable multivibrators', 'Dynamic RAM cells'],
              correctIndex: 1,
              explanation: 'Edge-triggered flip-flops sample data precisely at the clock transition, allowing simultaneous swapping without corruption.'
            }
          ]
        },

        // ── TOPIC 2: COMMON BUS SYSTEM ──
        {
          id: 'common-bus-system',
          title: 'Common Bus System (Multiplexers & Tri-State Buffers)',
          simpleExplanation: 'Instead of wiring every register to every other register, all registers share one public data highway called a bus, with multiplexers deciding who drives it.',
          detailedExplanation: `## Common Bus System

Connecting every register directly to every other register requires $n(n-1)$ dedicated wires, resulting in an impossible physical wiring bottleneck. To solve this, all registers share a single set of parallel wires called the **Common Bus**.

### Common Bus Architecture Using 4x1 Multiplexers (Q19 & Q36)
Only one register may drive the bus at any given nanosecond. A set of multiplexers selects which register drives the bus using select lines.

\`\`\`mermaid
flowchart TD
    subgraph Regs["Source Registers (4 Registers, 4-Bit each)"]
        R0["Register 0 (R0)"]
        R1["Register 1 (R1)"]
        R2["Register 2 (R2)"]
        R3["Register 3 (R3)"]
    end

    subgraph MUXes["Multiplexer Unit (Four 4x1 MUXes)"]
        M0["4x1 MUX (Bit 0)"]
        M1["4x1 MUX (Bit 1)"]
        M2["4x1 MUX (Bit 2)"]
        M3["4x1 MUX (Bit 3)"]
    end

    SEL["Select Inputs S1, S0"] ==> MUXes
    R0 -->|"Bit 0..3"| MUXes
    R1 -->|"Bit 0..3"| MUXes
    R2 -->|"Bit 0..3"| MUXes
    R3 -->|"Bit 0..3"| MUXes

    MUXes ==>|"4-Bit Parallel Lines"| Bus["=== COMMON BUS (4 Parallel Lines) ==="]

    Bus -->|"Data to Load"| LD0["LD: R0 Enabled"]
    Bus -->|"Data to Load"| LD1["LD: R1 Enabled"]
    Bus -->|"Data to Load"| LD2["LD: R2 Enabled"]
    Bus -->|"Data to Load"| LD3["LD: R3 Enabled"]
\`\`\`

### Selection Signals & Micro-operations Table:
| $S_1$ | $S_0$ | Register Selected on Bus | Destination Load | Micro-operation Executed |
| :---: | :---: | :---: | :---: | :--- |
| **0** | **0** | **R0** | LD(R2) = 1 | \`R2 <- R0\` |
| **0** | **1** | **R1** | LD(R3) = 1 | \`R3 <- R1\` |
| **1** | **0** | **R2** | LD(R0) = 1 | \`R0 <- R2\` |
| **1** | **1** | **R3** | LD(R1) = 1 | \`R1 <- R3\` |

### Three-State (Tri-State) Buffer Bus Architecture
\`\`\`mermaid
flowchart TD
    subgraph TriState["Tri-State Buffer Alternative"]
        R0_B["Register 0 Out"] --> B0["Buffer 0"]
        R1_B["Register 1 Out"] --> B1["Buffer 1"]
        R2_B["Register 2 Out"] --> B2["Buffer 2"]
        R3_B["Register 3 Out"] --> B3["Buffer 3"]
        DEC["2x4 Decoder"]
    end

    SEL2["Select Inputs S1, S0"] ==> DEC
    DEC -->|"Enable E0"| B0
    DEC -->|"Enable E1"| B1
    DEC -->|"Enable E2"| B2
    DEC -->|"Enable E3"| B3

    B0 & B1 & B2 & B3 ==> BusLine["=== Shared Bus Wire (One Active, Three in High-Z) ==="]
\`\`\`

### Mathematical Rules for Bus Sizing:
- **Number of Select Lines:** For $n$ registers, you need $\\log_2(n)$ selection lines ($S_1, S_0$ for 4 registers).
- **Number of Multiplexers:** For $n$ registers of $k$ bits each, you need **$k$ multiplexers**, each of size **$n \\times 1$**.

> [!NOTE] **DEV BRAIN:**
> The bus is a shared resource with single-writer semantics, exactly like a mutex lock around a shared variable. Two registers driving the bus at once = **bus contention = physical short-circuit / corrupted data**.

> [!TIP] **EXAM TIP:**
> For 7-mark question Q36: Always draw the 4-register MUX diagram, write the $S_1 S_0$ selection table, and state the formula: $n$ registers of $k$ bits need $k$ MUXes of size $n \\times 1$.

> [!WARNING] **TRAP:**
> In the basic computer, memory address **never travels through the common bus**! AR is wired directly to memory address pins. Only memory data travels through the bus.`,
          shortNotes: 'Common bus shares lines across registers. S1 S0 choose source register via MUXes. LD pin latches bus data into destination.',
          examples: [
            {
              title: 'Swap via Bus requires 3 Clock Cycles',
              code: 'T1: R3 <- R1 (S=01, LD R3)\nT2: R1 <- R2 (S=10, LD R1)\nT3: R2 <- R3 (S=11, LD R2)',
              explanation: 'Because the bus can carry only one word at a time, swapping R1 and R2 requires temporary register R3 over 3 separate clock pulses.'
            }
          ],
          keyPoints: [
            'Bus eliminates point-to-point wiring.',
            'Requires k multiplexers of size n x 1 for n registers of k bits.',
            'Tri-state buffers use High-Z state to isolate inactive registers.',
            'Destination register requires its LOAD pin asserted.'
          ],
          theoryQuestions: [
            {
              question: 'Explain the design and operation of a Common Bus System for 4 registers of 4 bits each using multiplexers. Provide the selection table.',
              marks: '7 Marks',
              answer: 'A Common Bus System connects multiple registers to a single set of parallel wires to avoid point-to-point wiring bottleneck ($n(n-1)$ wires).\n\n**Design for 4 Registers (R0, R1, R2, R3) of 4 Bits each:**\n1. **Number of Multiplexers:** 4 multiplexers (one for each bit position: Bit 0, Bit 1, Bit 2, Bit 3).\n2. **Size of Multiplexers:** $4 \\times 1$ multiplexers (since there are 4 source registers).\n3. **Selection Lines:** $\\log_2(4) = 2$ selection lines ($S_1, S_0$).\n\n**Selection Table:**\n- $S_1 S_0 = 00$: R0 is placed on the bus.\n- $S_1 S_0 = 01$: R1 is placed on the bus.\n- $S_1 S_0 = 10$: R2 is placed on the bus.\n- $S_1 S_0 = 11$: R3 is placed on the bus.\n\nTo load the selected bus word into destination register Rx, its specific LOAD (LD) pin must be made active (1) during the rising clock edge.',
              keyPoints: [
                'Need 4 MUXes of size 4x1 for 4 registers of 4 bits.',
                'Select lines S1, S0 select source register.',
                'Destination register asserts its LD pin to latch data.'
              ]
            },
            {
              question: 'How does a tri-state buffer bus differ from a multiplexer-based bus? Explain the role of the High-Impedance (High-Z) state.',
              marks: '5 Marks',
              answer: 'A Three-State (Tri-State) buffer has three output states: Logic 0, Logic 1, and **High-Impedance (High-Z)**.\n\n**Difference from MUX Bus:**\n1. In a MUX bus, all connections run into multiplexer logic gates before reaching the bus lines.\n2. In a Tri-State bus, the outputs of all registers are connected directly to the same physical wire through tri-state gates.\n\n**Role of High-Z:**\nWhen the control enable line of a tri-state buffer is disabled (0), the buffer enters High-Z state, acting as an open circuit (physically disconnected). A $2 \\times 4$ decoder ensures that only **one buffer** is enabled at any given time, while all other three buffers remain in High-Z, completely preventing bus contention and electrical short circuits.',
              keyPoints: [
                'Three output states: 0, 1, and High-Z.',
                'High-Z acts as an open circuit / disconnected wire.',
                'Decoder ensures only one driver is active at any time.'
              ]
            }
          ],
          mcqs: [
            {
              question: 'How many 4x1 multiplexers are needed to construct a common bus system for 8 registers of 16 bits each?',
              options: ['4', '8', '16', '32'],
              correctIndex: 2,
              explanation: 'The number of multiplexers equals the number of bits in each register (k = 16 MUXes), while each MUX must be 8x1.'
            },
            {
              question: 'How many selection lines are required for a bus system connecting 16 registers?',
              options: ['2', '3', '4', '8'],
              correctIndex: 2,
              explanation: 'Selection lines = log2(16) = 4 selection lines (S3, S2, S1, S0).'
            },
            {
              question: 'What is the electrical behavior of a tri-state buffer in the High-Impedance (High-Z) state?',
              options: ['Drives a strong 0V to ground', 'Drives a strong 5V to Vcc', 'Acts as an open circuit with virtually infinite resistance', 'Oscillates between 0 and 1'],
              correctIndex: 2,
              explanation: 'High-Z behaves as an open switch or disconnected wire, preventing current flow or interference with the active driver.'
            },
            {
              question: 'Why can two registers NOT be simultaneously placed onto the common bus?',
              options: ['Causes memory address overflow', 'Causes bus contention, short-circuit, and corrupted data', 'Clock speed drops by 50%', 'Destination registers cannot be selected'],
              correctIndex: 1,
              explanation: 'If two drivers attempt to drive different logic levels onto the same wire simultaneously, high current causes physical overheating and undefined voltage levels.'
            }
          ]
        },

        // ── TOPIC 3: ARITHMETIC MICRO-OPERATIONS ──
        {
          id: 'arithmetic-micro-ops',
          title: 'Arithmetic Micro-operations & 2s Complement Subtraction',
          simpleExplanation: 'Arithmetic micro-operations perform basic math (add, sub, increment, decrement) on binary numbers stored in registers using digital adder circuits.',
          detailedExplanation: `## Arithmetic Micro-operations & 2's Complement

Arithmetic micro-operations perform basic calculations on numeric data stored in registers.

### 4-Bit Binary Adder-Subtractor Circuit
The standard hardware implementation uses 4 Full Adders and 4 XOR gates controlled by a **Mode Input ($M$)**:
- When $M = 0$: $B \\oplus 0 = B$, $C_{in} = 0 \\implies$ **Addition: $A + B$**
- When $M = 1$: $B \\oplus 1 = \\overline{B}$, $C_{in} = 1 \\implies$ **Subtraction: $A + \\overline{B} + 1 = A - B$**

\`\`\`mermaid
flowchart TD
    subgraph Circuit["4-Bit Adder-Subtractor Hardware"]
        M["Mode Input M\n(0 = Add, 1 = Sub)"]
        FA0["Full Adder 0"]
        FA1["Full Adder 1"]
        FA2["Full Adder 2"]
        FA3["Full Adder 3"]
        X0["XOR 0"]
        X1["XOR 1"]
        X2["XOR 2"]
        X3["XOR 3"]
    end

    M ==>|"Cin = 0 or 1"| FA0
    M ==> X0 & X1 & X2 & X3

    B0["B[0]"] --> X0 --> FA0
    B1["B[1]"] --> X1 --> FA1
    B2["B[2]"] --> X2 --> FA2
    B3["B[3]"] --> X3 --> FA3

    A0["A[0]"] --> FA0
    A1["A[1]"] --> FA1
    A2["A[2]"] --> FA2
    A3["A[3]"] --> FA3

    FA0 -->|"C1"| FA1 -->|"C2"| FA2 -->|"C3"| FA3 -->|"C4"| Cout["Carry Out / Overflow Flag"]
    FA0 --> S0["S[0]"]
    FA1 --> S1["S[1]"]
    FA2 --> S2["S[2]"]
    FA3 --> S3["S[3]"]
\`\`\`

### Micro-operations Summary Table:
| Symbolic Notation | Description | Hardware Realization |
| :--- | :--- | :--- |
| \`R3 <- R1 + R2\` | Add contents of R1 and R2 | Binary Adder with $C_{in} = 0$ |
| \`R3 <- R1 - R2\` | Subtract R2 from R1 (2's complement) | Binary Adder with $B$ complemented, $C_{in} = 1$ |
| \`R2 <- \\overline{R2}\` | 1's complement of R2 | Inverters or XOR with 1 |
| \`R2 <- \\overline{R2} + 1\` | 2's complement of R2 (negation) | Invert bits and add 1 |
| \`R1 <- R1 + 1\` | Increment R1 by 1 | Dedicated Incrementer circuit or add with $B=0, C_{in}=1$ |
| \`R1 <- R1 - 1\` | Decrement R1 by 1 | Add with all 1's in $B$ ($-1$ in 2's complement) |

### Overflow Detection Formula:
In 2's complement arithmetic, an overflow occurs when the addition of two numbers of the same sign produces a result of opposite sign.
$$\\mathbf{V = C_{in\\text{ (MSB)}} \\oplus C_{out\\text{ (MSB)}}}$$
If carry into sign bit $\\neq$ carry out of sign bit, $V = 1$ (Overflow detected!).`,
          shortNotes: 'Adder-subtractor uses XOR gates with mode bit M: M=0 adds (Cin=0), M=1 subtracts using 2s complement (Cin=1). V = C_in XOR C_out.',
          examples: [
            {
              title: '2s Complement Subtraction Example',
              code: 'A = 0101 (5), B = 0011 (3)\n1s complement of B = 1100\n2s complement of B = 1101 (-3)\nSum = 0101 + 1101 = 10010\nDiscard end-around carry: Result = 0010 (+2)',
              explanation: 'Hardware adds the 2s complement of B directly to A.'
            }
          ],
          keyPoints: [
            'Subtraction is implemented as addition with 2s complement: A + B\' + 1.',
            'Mode input M controls both the XOR complementers and the initial carry-in.',
            'Overflow flag V detects out-of-range signed results.'
          ],
          theoryQuestions: [
            {
              question: 'Explain the hardware implementation of a 4-bit adder-subtractor circuit with a logic diagram.',
              marks: '5 Marks',
              answer: 'A 4-bit adder-subtractor is constructed using four full adders and four XOR gates with a mode input $M$.\n\n- **Addition Mode ($M = 0$):** When $M = 0$, $B_i \\oplus 0 = B_i$, so the true values of $B$ enter the full adders. The carry-in $C_0 = M = 0$. The circuit computes $S = A + B$.\n- **Subtraction Mode ($M = 1$):** When $M = 1$, $B_i \\oplus 1 = \\overline{B_i}$ (1\'s complement), and the carry-in $C_0 = M = 1$. The circuit computes $S = A + \\overline{B} + 1 = A - B$ (2\'s complement subtraction).\n\nThus, a single circuit performs both operations controlled by one line.',
              keyPoints: [
                'Full adders + XOR gates.',
                'M=0 gives A + B.',
                'M=1 gives A + B\' + 1 (subtraction).'
              ]
            },
            {
              question: 'What is arithmetic overflow, and how is it detected in 2\'s complement signed arithmetic?',
              marks: '3 Marks',
              answer: 'Arithmetic overflow occurs when the result of an arithmetic operation exceeds the representation range of the $n$-bit register ($-2^{n-1}$ to $+2^{n-1}-1$).\n\n**Detection:** In signed 2\'s complement representation, overflow is detected using an XOR gate on the carry into the sign bit ($C_{n-1}$) and the carry out of the sign bit ($C_n$):\n$$\\mathbf{V = C_{n-1} \\oplus C_n}$$\nIf $V = 1$, an overflow has occurred, indicating that adding two positive numbers produced a negative result, or vice versa.',
              keyPoints: [
                'Exceeds n-bit register capacity.',
                'Formula: V = C_in(MSB) XOR C_out(MSB).',
                'Indicates corrupted sign bit.'
              ]
            }
          ],
          mcqs: [
            {
              question: 'In a 4-bit binary adder-subtractor circuit, what is the role of the XOR gates when Mode M = 1?',
              options: ['Clear register B', 'Invert register B to produce 1s complement', 'Shift register B left by 1 bit', 'Generate parity bit'],
              correctIndex: 1,
              explanation: 'Since B XOR 1 = NOT(B), the XOR gates invert the B inputs to produce the 1s complement.'
            },
            {
              question: 'How is arithmetic overflow V detected in a 2s complement binary adder?',
              options: ['V = Cout', 'V = Cin(MSB) XOR Cout(MSB)', 'V = Sign bit AND Cout', 'V = Cin(0) OR Cout(n)'],
              correctIndex: 1,
              explanation: 'Overflow occurs if and only if the carry into the most significant bit differs from the carry out of it (C_in XOR C_out).'
            },
            {
              question: 'What operation is performed when S = A + B\' + 0?',
              options: ['A minus B', 'A minus B minus 1', 'A plus B', '1s complement subtraction'],
              correctIndex: 1,
              explanation: 'A + B\' is A + (not B), which is 1s complement addition, mathematically equivalent to A - B - 1.'
            },
            {
              question: 'What is the valid numerical range for an 8-bit signed 2s complement integer?',
              options: ['0 to 255', '-127 to +127', '-128 to +127', '-256 to +255'],
              correctIndex: 2,
              explanation: 'For n bits, the range is -2^(n-1) to +2^(n-1) - 1. For n=8, this is -128 to +127.'
            }
          ]
        },

        // ── TOPIC 4: LOGIC & SHIFT MICRO-OPERATIONS ──
        {
          id: 'logic-shift-micro-ops',
          title: 'Logic & Shift Micro-operations',
          simpleExplanation: 'Logic micro-operations manipulate individual bit strings (AND, OR, XOR, NOT), while shift micro-operations slide bits left or right for bit manipulation or math.',
          detailedExplanation: `## Logic & Shift Micro-operations

### 1. One Stage of Logic Circuit (4x1 MUX)
Hardware combines basic logic gates into a single 4x1 multiplexer per bit stage:
- $S_1 S_0 = 00 \\implies$ **AND** ($E_i = A_i \\land B_i$)
- $S_1 S_0 = 01 \\implies$ **OR** ($E_i = A_i \\lor B_i$)
- $S_1 S_0 = 10 \\implies$ **XOR** ($E_i = A_i \\oplus B_i$)
- $S_1 S_0 = 11 \\implies$ **NOT / Complement** ($E_i = \\overline{A_i}$)

\`\`\`mermaid
flowchart TD
    subgraph LogicUnit["One Stage of Logic Unit (4x1 MUX)"]
        AND_G["AND Gate: Ai AND Bi"]
        OR_G["OR Gate: Ai OR Bi"]
        XOR_G["XOR Gate: Ai XOR Bi"]
        NOT_G["Inverter: NOT Ai"]
        MUX["4x1 Multiplexer"]
    end

    A["Input Bit Ai"] --> AND_G & OR_G & XOR_G & NOT_G
    B["Input Bit Bi"] --> AND_G & OR_G & XOR_G

    AND_G -->|"Line 0"| MUX
    OR_G -->|"Line 1"| MUX
    XOR_G -->|"Line 2"| MUX
    NOT_G -->|"Line 3"| MUX

    S["Select Inputs: S1, S0"] ==> MUX
    MUX --> OUT["Logic Output Ei"]
\`\`\`

### 2. Shift Micro-operations Comparison:
\`\`\`mermaid
flowchart TD
    subgraph Shifts["Three Types of Shift Micro-operations"]
        L["1. Logical Shift\n(Inserts 0 at empty end)"]
        C["2. Circular Shift (Rotate)\n(Bit shifted out wraps around to opposite end)"]
        A["3. Arithmetic Shift\n(Multiplies/divides by 2 while preserving sign bit)"]
    end
\`\`\`

| Shift Type | Left Shift Operation | Right Shift Operation | Mathematical Impact |
| :--- | :--- | :--- | :--- |
| **Logical Shift** | \`shl R1\`: Shift left, insert 0 into LSB. | \`shr R1\`: Shift right, insert 0 into MSB. | Unsigned multiplication / division by 2. |
| **Circular Shift (Rotate)**| \`cil R1\`: MSB leaves and enters LSB. | \`cir R1\`: LSB leaves and enters MSB. | Cyclic bit rotation with zero data loss. |
| **Arithmetic Shift** | \`ashl R1\`: Shift left, insert 0 into LSB, check sign overflow. | \`ashr R1\`: Shift right, **MSB replicates itself** (preserves sign). | Signed multiplication / division by 2. |

> [!IMPORTANT] **MEMORIZE:**
> In Arithmetic Shift Right (\`ashr\`), the sign bit (MSB) is **replicated**:
> $1010 \\xrightarrow{\\text{ashr}} 1101$ (remains negative!).`,
          shortNotes: '4 logic ops via 4x1 MUX. Shifts: Logical (inserts 0), Circular (wraps around), Arithmetic (preserves sign bit; ashr replicates MSB).',
          examples: [
            {
              title: 'Arithmetic Shift Right of Negative Number',
              code: 'R1 = 11110000 (-16 decimal in 2s comp)\nashr R1 -> 11111000 (-8 decimal)\nashr R1 -> 11111100 (-4 decimal)',
              explanation: 'Sign bit (1) is continuously replicated, cleanly dividing negative numbers by 2.'
            }
          ],
          keyPoints: [
            '4 logic micro-ops implemented with 4 gates and one 4x1 MUX per bit.',
            'Arithmetic shift left can cause overflow if sign bit changes: V = R[n-1] XOR R[n-2].',
            'Arithmetic shift right replicates MSB to preserve sign.'
          ],
          theoryQuestions: [
            {
              question: 'Differentiate between Logical Shift, Circular Shift, and Arithmetic Shift with concrete 4-bit binary examples.',
              marks: '5 Marks',
              answer: 'Assume initial register $R = 1011$ (MSB = 1):\n\n1. **Logical Shift:**\n   - *Logical Shift Left (SHL):* $1011 \\rightarrow 0110$ (MSB lost, 0 inserted at LSB).\n   - *Logical Shift Right (SHR):* $1011 \\rightarrow 0101$ (LSB lost, 0 inserted at MSB).\n2. **Circular Shift (Rotate):**\n   - *Circular Left (CIL):* $1011 \\rightarrow 0111$ (MSB wraps into LSB).\n   - *Circular Right (CIR):* $1011 \\rightarrow 1101$ (LSB wraps into MSB).\n3. **Arithmetic Shift:**\n   - *Arithmetic Left (ASHL):* $1011 \\rightarrow 0110$ (shifts left, inserts 0, checks if sign changes).\n   - *Arithmetic Right (ASHR):* $1011 \\rightarrow 1101$ (**MSB is replicated** to preserve negative sign).',
              keyPoints: [
                'Clear definitions for all 3 shift types.',
                'Concrete 4-bit binary examples.',
                'Highlight MSB replication in ASHR.'
              ]
            },
            {
              question: 'Why does Arithmetic Shift Left cause overflow, and how is it detected in hardware?',
              marks: '3 Marks',
              answer: 'Arithmetic shift left multiplies a signed number by 2. If the original number is too large to fit in the register after doubling, the sign bit changes unexpectedly, causing an overflow.\n\n**Detection:** If the most significant bit ($R_{n-1}$) differs from the bit immediately following it ($R_{n-2}$) before the shift, the sign bit will flip after shifting:\n$$\\mathbf{V = R_{n-1} \\oplus R_{n-2}}$$\nIf $V = 1$, an arithmetic shift left overflow has occurred.',
              keyPoints: [
                'Caused when doubling exceeds register range.',
                'Detected by: V = R(n-1) XOR R(n-2).',
                'Indicates sign flip after shift.'
              ]
            }
          ],
          mcqs: [
            {
              question: 'What happens to the sign bit (MSB) during an Arithmetic Shift Right (ASHR) operation?',
              options: ['It is set to 0', 'It is inverted', 'It is copied/replicated into the next position and remains unchanged', 'It wraps into the LSB'],
              correctIndex: 2,
              explanation: 'ASHR preserves the sign of signed integers by duplicating the MSB into its right neighbor while retaining its original value.'
            },
            {
              question: 'What logic condition detects an overflow during an Arithmetic Shift Left (ASHL) of an n-bit register?',
              options: ['V = R[n-1] AND R[n-2]', 'V = R[n-1] XOR R[n-2]', 'V = R[0] XOR R[n-1]', 'V = Carry Out'],
              correctIndex: 1,
              explanation: 'If the two highest bits are different before the shift, the sign bit will invert after shifting, meaning an overflow occurred (V = Rn-1 XOR Rn-2).'
            },
            {
              question: 'Which shift operation can be used to divide a signed integer by 2 without losing its sign?',
              options: ['Logical Shift Right (SHR)', 'Circular Shift Right (CIR)', 'Arithmetic Shift Right (ASHR)', 'Logical Shift Left (SHL)'],
              correctIndex: 2,
              explanation: 'ASHR divides signed 2s complement integers by 2 while safely preserving the sign bit.'
            },
            {
              question: 'How many select lines are required for a logic unit capable of 16 distinct Boolean functions?',
              options: ['2', '4', '8', '16'],
              correctIndex: 1,
              explanation: 'For 16 distinct functions, log2(16) = 4 select lines are required.'
            }
          ]
        },

        // ── TOPIC 5: ALU DESIGN ──
        {
          id: 'alu-design-organization',
          title: 'Arithmetic Logic Unit (ALU) Design & 14-Row Function Table',
          simpleExplanation: 'The ALU combines the arithmetic adder circuit, logic unit, and shifters into one integrated chip stage with multiplexers selecting the final result.',
          detailedExplanation: `## Arithmetic Logic Unit (ALU) Design

Instead of having separate execution circuits, modern processors combine arithmetic, logic, and shift operations into a unified Arithmetic Logic Unit (ALU) or Arithmetic Logic Shift Unit (ALSU).

### One Stage of Arithmetic Logic Shift Unit (ALSU)
\`\`\`mermaid
flowchart TD
    subgraph ALSU_Stage["One Stage of ALSU (Bit i)"]
        AU["Arithmetic Circuit\n(Full Adder + MUX)"]
        LU["Logic Unit\n(4 Logic Gates + MUX)"]
        MUX4["4x1 Final Selection MUX"]
    end

    Ai["Bit Ai"] & Bi["Bit Bi"] ==> AU & LU
    Cin["Carry In (Ci)"] --> AU
    AU -->|"Line 0: Arithmetic"| MUX4
    LU -->|"Line 1: Logic"| MUX4
    SHL["Shift-Left Input: A(i-1)"] -->|"Line 2: Shift Left"| MUX4
    SHR["Shift-Right Input: A(i+1)"] -->|"Line 3: Shift Right"| MUX4

    Sel["Operation Select S3, S2"] ==> MUX4
    AU -->|"Carry Out (C i+1)"| Cout["Carry Out to Stage i+1"]
    MUX4 --> Fi["Output Result Fi"]
\`\`\`

### Complete 14-Row Function Table (Exam Mandatory):
| $S_3$ | $S_2$ | $S_1$ | $S_0$ | $C_{in}$ | Operation | Function Name |
| :---: | :---: | :---: | :---: | :---: | :--- | :--- |
| 0 | 0 | 0 | 0 | 0 | $F = A$ | Transfer A |
| 0 | 0 | 0 | 0 | 1 | $F = A + 1$ | Increment A |
| 0 | 0 | 0 | 1 | 0 | $F = A + B$ | Add B to A |
| 0 | 0 | 0 | 1 | 1 | $F = A + B + 1$ | Add with Carry |
| 0 | 0 | 1 | 0 | 0 | $F = A + \\overline{B}$ | Subtract with Borrow |
| 0 | 0 | 1 | 0 | 1 | $F = A + \\overline{B} + 1$ | Subtract B from A |
| 0 | 0 | 1 | 1 | 0 | $F = A - 1$ | Decrement A |
| 0 | 0 | 1 | 1 | 1 | $F = A$ | Transfer A |
| 0 | 1 | 0 | 0 | $\\times$ | $F = A \\land B$ | AND |
| 0 | 1 | 0 | 1 | $\\times$ | $F = A \\lor B$ | OR |
| 0 | 1 | 1 | 0 | $\\times$ | $F = A \\oplus B$ | XOR |
| 0 | 1 | 1 | 1 | $\\times$ | $F = \\overline{A}$ | Complement A |
| 1 | 0 | $\\times$ | $\\times$ | $\\times$ | $F = \\text{shr } A$ | Shift Right A into F |
| 1 | 1 | $\\times$ | $\\times$ | $\\times$ | $F = \\text{shl } A$ | Shift Left A into F |`,
          shortNotes: 'ALSU combines full adder, logic gates, and shifters into 1 stage using 4x1 MUX. Select lines S3 S2 choose arithmetic (00), logic (01), shr (10), shl (11).',
          examples: [
            {
              title: 'Selecting Subtraction in ALSU',
              code: 'Set S3=0, S2=0 (Arithmetic)\nSet S1=1, S0=0 (B complemented)\nSet Cin=1\nResult: F = A + B\' + 1 = A - B',
              explanation: 'Configures the ALU hardware to subtract B from A.'
            }
          ],
          keyPoints: [
            'S3 and S2 select the overall category: arithmetic, logic, or shift.',
            'S1 and S0 choose the specific operation within arithmetic or logic.',
            'Cin differentiates between regular operations and their incremented/carry forms.'
          ],
          theoryQuestions: [
            {
              question: 'Draw and explain the block diagram of one stage of an Arithmetic Logic Shift Unit (ALSU). Present its complete function table.',
              marks: '7 Marks',
              answer: 'One stage of an ALSU (Bit $i$) integrates an arithmetic circuit, a logic circuit, and a shifter into a single 4x1 multiplexer.\n\n**Hardware Components:**\n1. **Arithmetic Circuit:** Composed of a Full Adder and internal multiplexer that performs 8 arithmetic operations based on $S_1, S_0, C_{in}$.\n2. **Logic Circuit:** Composed of AND, OR, XOR, NOT gates selected by $S_1, S_0$.\n3. **4x1 Selection MUX:** Selects between Arithmetic output ($S_3 S_2 = 00$), Logic output ($S_3 S_2 = 01$), Shift Right ($S_3 S_2 = 10$, connects $A_{i+1}$), and Shift Left ($S_3 S_2 = 11$, connects $A_{i-1}$).',
              keyPoints: [
                'Full diagram with 4x1 MUX.',
                'Explanation of S3 S2 mode selection.',
                '14-row function table.'
              ]
            }
          ],
          mcqs: [
            {
              question: 'In an ALSU, which select line values choose logic micro-operations?',
              options: ['S3 S2 = 00', 'S3 S2 = 01', 'S3 S2 = 10', 'S3 S2 = 11'],
              correctIndex: 1,
              explanation: 'S3 S2 = 00 selects arithmetic, 01 selects logic, 10 selects shift right, and 11 selects shift left.'
            },
            {
              question: 'How many total distinct operations are specified in the standard Mano ALSU function table?',
              options: ['8', '12', '14', '16'],
              correctIndex: 2,
              explanation: 'The standard ALSU table defines 8 arithmetic, 4 logic, and 2 shift operations = 14 total operations.'
            },
            {
              question: 'What input bit is connected to line 2 (Shift Right) of stage i in an n-stage ALSU?',
              options: ['A(i-1)', 'A(i+1)', 'B(i)', 'Carry out C(i)'],
              correctIndex: 1,
              explanation: 'In shift right, the bit from the higher adjacent stage A(i+1) moves into stage i.'
            },
            {
              question: 'What input bit is connected to line 3 (Shift Left) of stage i in an n-stage ALSU?',
              options: ['A(i-1)', 'A(i+1)', 'B(i)', 'Carry in C(i)'],
              correctIndex: 0,
              explanation: 'In shift left, the bit from the lower adjacent stage A(i-1) moves into stage i.'
            }
          ]
        }
      ]
    },

    // ── UNIT 2: BASIC COMPUTER ORGANIZATION & DESIGN ──
    {
      id: 'unit-2',
      title: 'Unit 2: Basic Computer Organization & Design',
      description: 'Instruction codes, stored program organization, computer registers and common bus, instruction cycle, memory-reference instructions, and interrupt cycle.',
      topics: [
        {
          id: 'instruction-codes-stored-program',
          title: 'Instruction Codes & Stored-Program Organization',
          simpleExplanation: 'An instruction code is a binary word that tells the computer what operation to perform and where to find the data in memory.',
          detailedExplanation: `## Instruction Codes & Stored-Program Organization

### Stored-Program Organization (von Neumann Architecture)
The fundamental concept is that program instructions and data share the same physical memory space.

\`\`\`mermaid
flowchart TD
    subgraph Memory["Memory Unit 4096 x 16"]
        M1["Address 0..4095\nStores Instructions & Operands"]
    end

    subgraph InstructionWord["16-Bit Instruction Format"]
        I["Bit 15: I\n(0 = Direct, 1 = Indirect)"]
        OP["Bits 12-14: Opcode\n(3-Bit Operation Code: 8 Ops)"]
        ADDR["Bits 0-11: Address\n(12-Bit Memory Address: 0..4095)"]
    end

    subgraph CPU["Processor Core"]
        PC["Program Counter (PC: 12b)\nPoints to next instruction"]
        AR["Address Register (AR: 12b)\nHolds memory address"]
        IR["Instruction Register (IR: 16b)\nHolds fetched opcode"]
        AC["Accumulator (AC: 16b)\nProcessor Register"]
    end

    PC --> AR
    AR --> Memory
    Memory --> IR
    Memory --> AC
\`\`\`

### Direct vs Indirect Addressing (Question Bank Q2)
- **Direct Addressing ($I = 0$):**
  The address field directly contains the **Effective Address (EA)** where the operand resides in memory.
  $$EA = \\text{Address Field of Instruction}$$
- **Indirect Addressing ($I = 1$):**
  The address field points to a memory location that contains the **Effective Address** of the operand.
  $$EA = M[\\text{Address Field}]$$

\`\`\`mermaid
flowchart TD
    subgraph DirectAccess["Direct Addressing (I = 0)"]
        I0["Inst: ADD 457 (I=0)"] -->|"Address 457"| LOC457["Mem(457) = OPERAND 35"]
        LOC457 --> AC0["AC ← AC + 35"]
    end

    subgraph IndirectAccess["Indirect Addressing (I = 1)"]
        I1["Inst: ADD 300 (I=1)"] -->|"Address 300"| LOC300["Mem(300) = 1350 (Pointer)"]
        LOC300 -->|"Pointer 1350"| LOC1350["Mem(1350) = OPERAND 82"]
        LOC1350 --> AC1["AC ← AC + 82"]
    end
\`\`\``,
          shortNotes: 'Instruction format: I (bit 15), Opcode (bits 12-14), Address (bits 0-11). Direct (I=0) EA=Address. Indirect (I=1) EA=M[Address].',
          examples: [
            {
              title: 'Direct vs Indirect Address Trace',
              code: 'Memory at 300 = 1350\nMemory at 1350 = 82\nADD 300 with I=0 -> Operates on content of 300 (1350)\nADD 300 with I=1 -> Operates on content of 1350 (82)',
              explanation: 'Indirect addressing uses location 300 as a pointer to the real operand at 1350.'
            }
          ],
          keyPoints: [
            '16-bit instruction word: 1-bit I, 3-bit Opcode, 12-bit Address.',
            'Direct addressing requires 1 memory read; indirect requires 2 memory reads.',
            'Effective Address (EA) is the exact memory address where operand resides.'
          ],
          theoryQuestions: [
            {
              question: 'Explain the difference between direct and indirect addressing in Mano\'s basic computer with a memory map diagram.',
              marks: '5 Marks',
              answer: 'In Mano\'s basic computer, bit 15 ($I$) determines addressing mode:\n\n1. **Direct Addressing ($I = 0$):** The 12-bit address field directly specifies the memory location of the operand. The Effective Address $EA = IR(0-11)$. Only **one memory read** is needed to fetch the operand.\n2. **Indirect Addressing ($I = 1$):** The 12-bit address field specifies a memory location that contains the effective address of the operand. $EA = M[IR(0-11)]$. **Two memory reads** are needed: the first to fetch the pointer address, and the second to fetch the actual operand.',
              keyPoints: [
                'Bit 15 determines mode: 0=Direct, 1=Indirect.',
                'Direct: EA = Address field (1 memory read).',
                'Indirect: EA = M[Address field] (2 memory reads).'
              ]
            }
          ],
          mcqs: [
            {
              question: 'In Mano\'s basic computer, what do bits 12 to 14 of an instruction specify?',
              options: ['Mode bit I', 'Opcode', 'Address field', 'Destination register'],
              correctIndex: 1,
              explanation: 'Bits 12-14 contain the 3-bit operation code (Opcode), specifying 1 of 8 primary operations.'
            },
            {
              question: 'If bit 15 is 1 in a memory-reference instruction, which addressing mode is active?',
              options: ['Immediate addressing', 'Direct addressing', 'Indirect addressing', 'Relative addressing'],
              correctIndex: 2,
              explanation: 'Bit 15 (I) = 1 specifies Indirect addressing, meaning the address field contains a pointer to the operand.'
            },
            {
              question: 'How many total words of memory can be directly addressed by a 12-bit address field?',
              options: ['1024 words (1K)', '2048 words (2K)', '4096 words (4K)', '65536 words (64K)'],
              correctIndex: 2,
              explanation: '2^12 = 4096 memory words (addresses 0 to 4095).'
            }
          ]
        },

        // ── TOPIC 7: COMPUTER REGISTERS & BUS ──
        {
          id: 'computer-registers-bus',
          title: 'Computer Registers & Common Bus System',
          simpleExplanation: 'Mano\'s basic computer has 8 primary registers connected to a 16-bit common bus via a 3-to-8 multiplexer system.',
          detailedExplanation: `## Computer Registers & Common Bus System

### Registers of the Basic Computer (Master Table)
| Register Symbol | Register Name | Bit Width | Function in Computer |
| :--- | :--- | :---: | :--- |
| **AR** | Address Register | 12 | Holds memory address for read/write operations |
| **PC** | Program Counter | 12 | Holds address of next instruction to be fetched |
| **DR** | Data Register | 16 | Holds operand read from memory or word to write |
| **AC** | Accumulator | 16 | General-purpose processing and math register |
| **IR** | Instruction Register | 16 | Holds the instruction code fetched from memory |
| **TR** | Temporary Register | 16 | Holds temporary data during processing |
| **INPR** | Input Register | 8 | Holds 8-bit ASCII character from input device |
| **OUTR** | Output Register | 8 | Holds 8-bit ASCII character for output device |

### Basic Computer Common Bus Architecture
\`\`\`mermaid
flowchart TD
    subgraph Regs["Basic Computer Registers"]
        AR["AR (12b)"]
        PC["PC (12b)"]
        DR["DR (16b)"]
        AC["AC (16b)"]
        IR["IR (16b)"]
        TR["TR (16b)"]
        MEM["Memory Unit 4096x16"]
    end

    MUX["7-to-1 Common Bus Multiplexer System"]
    AR -->|"Select 1"| MUX
    PC -->|"Select 2"| MUX
    DR -->|"Select 3"| MUX
    AC -->|"Select 4"| MUX
    IR -->|"Select 5"| MUX
    TR -->|"Select 6"| MUX
    MEM -->|"Select 7"| MUX

    MUX ==>|"16-Bit Parallel Bus"| BUS["=== 16-BIT COMMON BUS ==="]

    BUS -->|"LD"| AR
    BUS -->|"LD"| PC
    BUS -->|"LD"| DR
    BUS -->|"LD"| AC
    BUS -->|"LD"| IR
    BUS -->|"LD"| TR
    BUS -->|"Write Data"| MEM

    AR -.->|"Direct 12-Bit Address Wire (NOT via Bus!)"| MEM
\`\`\`

> [!WARNING] **TRAP:**
> The address for Memory read/write **NEVER travels over the common bus**! AR is hardwired directly to the address inputs of Memory. Only memory data travels over the common bus.`,
          shortNotes: '8 registers: AR(12), PC(12), DR(16), AC(16), IR(16), TR(16), INPR(8), OUTR(8). Connected via 16-bit common bus selected by 3-to-8 MUX.',
          examples: [
            {
              title: 'Memory Read Micro-operation via Bus',
              code: 'DR <- M[AR]\n1. S2 S1 S0 = 111 (Select Memory on bus)\n2. Assert LD pin of DR at clock tick\nResult: Word at address AR is loaded into DR.',
              explanation: 'Uses bus to transfer data from memory to DR in 1 clock cycle.'
            }
          ],
          keyPoints: [
            'AR and PC are 12 bits because memory has 4096 words.',
            'DR, AC, IR, TR are 16 bits to match memory word size.',
            'INPR and OUTR are 8 bits for standard ASCII characters.',
            'Memory is selected on the bus by select code 7 (111).'
          ],
          theoryQuestions: [
            {
              question: 'List all registers of Mano\'s basic computer with their bit lengths and primary functions.',
              marks: '7 Marks',
              answer: 'Mano\'s basic computer has 8 registers:\n1. **AR (12 bits):** Holds memory address; connected directly to address inputs of 4096-word memory.\n2. **PC (12 bits):** Program Counter; holds address of next sequential instruction.\n3. **DR (16 bits):** Data Register; holds operands read from memory.\n4. **AC (16 bits):** Accumulator; primary computational register.\n5. **IR (16 bits):** Instruction Register; holds current instruction opcode and address.\n6. **TR (16 bits):** Temporary Register; stores intermediate scratchpad data.\n7. **INPR (8 bits):** Input Register; receives 8-bit character from keyboard.\n8. **OUTR (8 bits):** Output Register; sends 8-bit character to display.',
              keyPoints: [
                'State all 8 registers with correct bit lengths.',
                'Explain why AR/PC are 12 bits and DR/AC/IR/TR are 16 bits.',
                'Detail function of each register.'
              ]
            }
          ],
          mcqs: [
            {
              question: 'Why are AR and PC 12 bits while DR and AC are 16 bits in Mano\'s computer?',
              options: ['Because ALU is 12 bits', 'Because memory has 4096 words (2^12) while each word is 16 bits', 'Because 4 bits are reserved for parity', 'It is an arbitrary design decision'],
              correctIndex: 1,
              explanation: 'Addressing 4096 memory words requires 12 address bits (2^12 = 4096). Each word contains 16 bits of data.'
            },
            {
              question: 'Which register is hardwired directly to the memory address pins without passing through the bus?',
              options: ['PC', 'DR', 'AR', 'TR'],
              correctIndex: 2,
              explanation: 'AR (Address Register) is wired directly to the address inputs of the memory unit.'
            }
          ]
        },

        // ── TOPIC 8: INSTRUCTION CYCLE FLOWCHART ──
        {
          id: 'instruction-cycle-flowchart',
          title: 'Instruction Cycle & Detailed Fetch/Decode RTL',
          simpleExplanation: 'The instruction cycle is the continuous heartbeat of the computer: Fetch instruction from memory, Decode opcode, and Execute micro-operations.',
          detailedExplanation: `## The Instruction Cycle

The instruction cycle consists of four continuous phases:
1. **Fetch:** Read instruction from memory into IR.
2. **Decode:** Decode operation code and determine addressing mode.
3. **Read Effective Address:** If indirect addressing ($I=1$), fetch pointer.
4. **Execute:** Perform the requested micro-operation.

### Master Instruction Cycle Flowchart (Question Bank Q3 & Q20)
\`\`\`mermaid
flowchart TD
    START(["Instruction Cycle Start"]) --> T0["T0: AR ← PC"]
    T0 --> T1["T1: IR ← Memory(AR), PC ← PC + 1"]
    T1 --> T2["T2: Decode Opcode in IR(12-14)\nAR ← IR(0-11), I ← IR(15)"]
    T2 --> CHECK{"Opcode = 111 (7)?"}

    CHECK -- Yes --> D7{"I bit = ?"}
    D7 -- I = 0 --> REGINST["Register-Reference Instruction\n(Executed at T3: CLA, CMA, INC...)"]
    D7 -- I = 1 --> IOINST["I/O-Reference Instruction\n(Executed at T3: INP, OUT, ION...)"]

    CHECK -- No --> MEMINST{"I bit = ? (Memory-Reference)"}
    MEMINST -- I = 0 (Direct) --> DIRECT["T3: Nothing\n(AR already holds Effective Address)"]
    MEMINST -- I = 1 (Indirect) --> INDIRECT["T3: AR ← Memory(AR)\n(Fetch Effective Address from Memory)"]

    DIRECT --> EXEC["Execute Memory-Reference (T4, T5, T6)\nAND, ADD, LDA, STA, BUN, BSA, ISZ"]
    INDIRECT --> EXEC

    REGINST --> SC0["SC ← 0 (Instruction Complete)"]
    IOINST --> SC0
    EXEC --> SC0
    SC0 --> INT{"Interrupt Enable (IEN) && (FGI || FGO)?"}
    INT -- Yes --> INTCYCLE["Interrupt Cycle: Save PC at Memory(0), PC ← 1"]
    INT -- No --> T0
    INTCYCLE --> T0
\`\`\`

### Fetch and Decode RTL Breakdown:
- **$T_0$:** \\\`AR <- PC\\\` (Address of instruction loaded into AR)
- **$T_1$:** \\\`IR <- M[AR], PC <- PC + 1\\\` (Instruction fetched into IR, PC incremented for next instruction)
- **$T_2$:** \\\`Decode Opcode in IR(12-14), AR <- IR(0-11), I <- IR(15)\\\``,
          shortNotes: 'T0: AR<-PC. T1: IR<-M[AR], PC<-PC+1. T2: Decode opcode, AR<-IR(0-11), I<-IR(15). T3: If I=1 AR<-M[AR]. T4-T6: Execute. SC<-0.',
          examples: [
            {
              title: 'Fetch Phase Execution',
              code: 'T0: AR <- PC\nT1: IR <- M[AR], PC <- PC + 1',
              explanation: 'Requires exactly 2 clock pulses to fetch instruction and increment program counter.'
            }
          ],
          keyPoints: [
            'Fetch phase takes 2 clock cycles: T0 and T1.',
            'T2 decodes opcode and extracts address and mode bit.',
            'Sequence Counter (SC) resets to 0 at the end of every instruction.'
          ],
          theoryQuestions: [
            {
              question: 'Draw the complete flowchart of the basic computer instruction cycle, detailing all micro-operations from T0 to T3.',
              marks: '7 Marks',
              answer: 'The instruction cycle flowchart details the sequential execution phases:\\n\\n1. **Fetch Phase ($T_0, T_1$):**\\n   - $T_0: AR \\leftarrow PC$\\n   - $T_1: IR \\leftarrow M[AR], PC \\leftarrow PC + 1$\\n2. **Decode Phase ($T_2$):**\\n   - $T_2: \\text{Decode } IR(12-14) \\text{ into } D_0..D_7, AR \\leftarrow IR(0-11), I \\leftarrow IR(15)$\\n3. **Indirect / Mode Check ($T_3$):**\\n   - If $D_7 = 0$ (Memory-reference):\\n     - $I=1: AR \\leftarrow M[AR]$ (read effective address)\\n     - $I=0$: Nothing (AR is already effective address)\\n   - If $D_7 = 1$ and $I = 0$: Execute register-reference instruction at $T_3$.\\n   - If $D_7 = 1$ and $I = 1$: Execute I/O instruction at $T_3$.',
              keyPoints: [
                'Complete flowchart diagram.',
                'Explicit RTL statements for T0, T1, T2, T3.',
                'Clear distinction between memory-reference, register-reference, and I/O instructions.'
              ]
            }
          ],
          mcqs: [
            {
              question: 'During which clock timing pulse is the Program Counter (PC) incremented by 1 during fetch?',
              options: ['T0', 'T1', 'T2', 'T3'],
              correctIndex: 1,
              explanation: 'At timing pulse T1, IR <- M[AR] and PC <- PC + 1 execute simultaneously.'
            },
            {
              question: 'What happens at timing signal T3 if the instruction is memory-reference with I = 1?',
              options: ['AR <- PC', 'AR <- M[AR]', 'PC <- PC + 1', 'SC <- 0'],
              correctIndex: 1,
              explanation: 'At T3 with I=1, indirect addressing fetches the effective address: AR <- M[AR].'
            },
            {
              question: 'What is the role of the Sequence Counter (SC) in the basic computer control unit?',
              options: ['Counts instructions executed', 'Provides sequential timing pulses T0, T1, T2...', 'Generates memory parity', 'Calculates branch address'],
              correctIndex: 1,
              explanation: 'SC is decoded by a 4-to-16 decoder to generate discrete timing signals T0, T1, T2... for sequencing micro-operations.'
            }
          ]
        },

        // ── TOPIC 9: MEMORY-REFERENCE INSTRUCTIONS ──
        {
          id: 'mri-instructions-rtl',
          title: 'Memory-Reference Instructions (AND, ADD, LDA, STA, BUN, BSA, ISZ)',
          simpleExplanation: 'Memory-reference instructions read or write RAM to perform logic, math, load, store, branching, and looping.',
          detailedExplanation: `## Memory-Reference Instructions

Mano's computer has 7 Memory-Reference Instructions (Opcode 000 to 110):

| Opcode | Mnemonic | Description | RTL Execution Micro-operations |
| :---: | :--- | :--- | :--- |
| **000** | **AND** | AND to AC | $D_0 T_4: DR \\leftarrow M[AR]$\n$D_0 T_5: AC \\leftarrow AC \\land DR, SC \\leftarrow 0$ |
| **001** | **ADD** | Add to AC | $D_1 T_4: DR \\leftarrow M[AR]$\n$D_1 T_5: AC \\leftarrow AC + DR, E \\leftarrow C_{out}, SC \\leftarrow 0$ |
| **010** | **LDA** | Load to AC | $D_2 T_4: DR \\leftarrow M[AR]$\n$D_2 T_5: AC \\leftarrow DR, SC \\leftarrow 0$ |
| **011** | **STA** | Store from AC | $D_3 T_4: M[AR] \\leftarrow AC, SC \\leftarrow 0$ |
| **100** | **BUN** | Branch Unconditional | $D_4 T_4: PC \\leftarrow AR, SC \\leftarrow 0$ |
| **101** | **BSA** | Branch & Save Return | $D_5 T_4: M[AR] \\leftarrow PC, AR \\leftarrow AR + 1$\n$D_5 T_5: PC \\leftarrow AR, SC \\leftarrow 0$ |
| **110** | **ISZ** | Increment & Skip if 0 | $D_6 T_4: DR \\leftarrow M[AR]$\n$D_6 T_5: DR \\leftarrow DR + 1$\n$D_6 T_6: M[AR] \\leftarrow DR, \\text{if } (DR=0) PC \\leftarrow PC + 1, SC \\leftarrow 0$ |

### BSA Subroutine Branch & Return Mechanism
\`\`\`mermaid
flowchart TD
    subgraph BSA_Operation["BSA SUB (Branch and Save Return Address)"]
        PC_VAL["Current PC = 21 (Next instruction to return to)"]
        AR_VAL["Target SUB Label = Location 100"]

        T4["T4: Memory(100) ← 21 (Save PC)\nAR ← 101"]
        T5["T5: PC ← 101 (Jump to Subroutine Body)"]

        PC_VAL & AR_VAL --> T4 --> T5
    end

    subgraph Return_Operation["Subroutine Return: BUN SUB I"]
        RET["BUN 100 I\nReads address stored at 100 (which is 21!)\nPC ← 21 (Clean Return to Main Program)"]
    end

    T5 --> RET
\`\`\``,
          shortNotes: '7 MRIs: AND, ADD, LDA, STA, BUN, BSA (saves PC in M[AR] and jumps to AR+1), ISZ (increments memory word and skips next instruction if zero).',
          examples: [
            {
              title: 'Subroutine Call and Return Trace',
              code: '20: BSA 100  (PC=21 saved into Mem[100], jumps to 101)\n...\n105: BUN 100 I (Indirect jump reads Mem[100]=21, returns to 21)',
              explanation: 'Standard assembly subroutine pattern in the basic computer.'
            }
          ],
          keyPoints: [
            'BSA saves return address at the first word of the subroutine.',
            'ISZ takes 3 execute cycles (T4, T5, T6) to read, increment, and write back.',
            'BUN is a single cycle jump (T4: PC <- AR).'
          ],
          theoryQuestions: [
            {
              question: 'Explain the execution cycle of the BSA (Branch and Save Return Address) instruction with a memory diagram and RTL steps.',
              marks: '5 Marks',
              answer: 'BSA is used to call a subroutine:\n1. **$D_5 T_4:** $M[AR] \\leftarrow PC, AR \\leftarrow AR + 1$\n   - The current value of $PC$ (return address) is stored in memory at the address specified by $AR$.\n   - $AR$ is incremented by 1 to point to the first executable instruction of the subroutine.\n2. **$D_5 T_5:** $PC \\leftarrow AR, SC \\leftarrow 0$\n   - $PC$ is updated to point to the start of the subroutine body.\n\n**Return from Subroutine:**\nThe subroutine returns by executing an indirect branch instruction: \`BUN SUB I\`. This reads the saved return address from memory location \`SUB\` and loads it back into $PC$.',
              keyPoints: [
                'T4 stores PC at M[AR] and increments AR.',
                'T5 updates PC to AR.',
                'Return accomplished via BUN SUB I.'
              ]
            }
          ],
          mcqs: [
            {
              question: 'How does the basic computer return from a subroutine called by BSA SUB?',
              options: ['POP PC', 'RET instruction', 'BUN SUB I (Indirect branch)', 'JMP SUB'],
              correctIndex: 2,
              explanation: 'BUN SUB I performs an indirect branch to the address saved in SUB location, returning to the caller.'
            },
            {
              question: 'How many clock cycles are required to execute the ISZ instruction during execution phase (excluding fetch and decode)?',
              options: ['1 cycle', '2 cycles', '3 cycles (T4, T5, T6)', '4 cycles'],
              correctIndex: 2,
              explanation: 'ISZ requires T4 (read memory to DR), T5 (increment DR), and T6 (write DR back to memory and check for skip) = 3 execute cycles.'
            }
          ]
        },

        // ── TOPIC 10: INTERRUPT CYCLE & I/O ──
        {
          id: 'interrupt-cycle-io',
          title: 'Input-Output Configuration & Interrupt Cycle',
          simpleExplanation: 'The interrupt cycle lets slow peripheral devices (keyboard, printer) notify the CPU when they are ready without wasting CPU time polling.',
          detailedExplanation: `## Input-Output Configuration & Interrupt Cycle

### I/O Interface Flip-Flops:
- **$FGI$ (Input Flag):** Set to 1 when a new character is available in INPR. Cleared to 0 when AC reads INPR.
- **$FGO$ (Output Flag):** Set to 1 when OUTR is empty and ready for next character. Cleared to 0 when AC writes to OUTR.
- **$IEN$ (Interrupt Enable):** Controlled by software (\`ION\` / \`IOF\`) to allow or block interrupts.

### Interrupt Cycle Flowchart & RTL (Question Bank Q5 & Q21)
\`\`\`mermaid
flowchart TD
    START(["Interrupt Check (R = 1)"]) --> T0["T0: AR ← 0, TR ← PC"]
    T0 --> T1["T1: Memory(AR) ← TR, PC ← 0"]
    T1 --> T2["T2: PC ← PC + 1, IEN ← 0, R ← 0, SC ← 0"]
    T2 --> ISR["Execution jumps to Memory Location 1\n(Address of Interrupt Service Routine)"]
\`\`\`

### Interrupt Micro-operations Explained:
1. **$T_0'$:** \\\`AR <- 0, TR <- PC\\\` (Address 0 is selected; PC is backed up in TR).
2. **$T_1'$:** \\\`M[AR] <- TR, PC <- 0\\\` (Current PC saved in memory location 0; PC cleared).
3. **$T_2'$:** \\\`PC <- PC + 1, IEN <- 0, R <- 0, SC <- 0\\\` (PC becomes 1; Interrupts disabled so nested interrupts don't corrupt location 0).

The CPU now starts executing the **Interrupt Service Routine (ISR)** located at memory address 1.`,
          shortNotes: 'Interrupt cycle saves PC at memory location 0, sets PC to 1 (ISR start address), disables IEN, and resets R flip-flop.',
          examples: [
            {
              title: 'Interrupt Return Pattern',
              code: 'Address 0: Stores Return PC\nAddress 1: JMP 100 (Jump to ISR body)\n...\nAddress 150: ION (Re-enable interrupts)\nAddress 151: BUN 0 I (Return to interrupted program)',
              explanation: 'Standard ISR layout in Mano basic computer.'
            }
          ],
          keyPoints: [
            'Interrupt condition: IEN AND (FGI OR FGO).',
            'Return address is always saved at memory address 0.',
            'ISR execution always begins at memory address 1.',
            'IEN is cleared to 0 to prevent nested interrupt corruption.'
          ],
          theoryQuestions: [
            {
              question: 'Explain the interrupt cycle of the basic computer. Why is the return address saved at location 0?',
              marks: '5 Marks',
              answer: 'When an interrupt occurs ($R = 1$):\n1. $T_0\': AR \\leftarrow 0, TR \\leftarrow PC$ (Load address 0 into AR, save PC in TR).\n2. $T_1\': M[AR] \\leftarrow TR, PC \\leftarrow 0$ (Store saved PC into location 0, clear PC).\n3. $T_2\': PC \\leftarrow PC + 1, IEN \\leftarrow 0, R \\leftarrow 0, SC \\leftarrow 0$ (Set PC to 1, disable further interrupts, reset R).\n\n**Why Location 0?**\nLocation 0 is fixed by hardware wiring as a dedicated storage slot for the return pointer. Location 1 contains a branch to the Interrupt Service Routine (ISR). This hardware convention guarantees that the CPU always knows where to save the return state and where to find the handling routine.',
              keyPoints: [
                'RTL statements for T0, T1, T2.',
                'Location 0 stores return PC.',
                'Location 1 is start of ISR.',
                'IEN cleared to prevent race conditions.'
              ]
            }
          ],
          mcqs: [
            {
              question: 'Where is the return address saved during the interrupt cycle of Mano\'s basic computer?',
              options: ['On the hardware stack', 'In register TR', 'At memory location 0', 'At memory location 1'],
              correctIndex: 2,
              explanation: 'Hardware is hardwired to save the current Program Counter (PC) at memory location 0.'
            },
            {
              question: 'Why is the Interrupt Enable flip-flop (IEN) cleared to 0 during the interrupt cycle?',
              options: ['To shut down input/output devices', 'To prevent recursive interrupts from overwriting the return address in location 0', 'To reset the sequence counter', 'To indicate an error condition'],
              correctIndex: 1,
              explanation: 'Clearing IEN prevents another interrupt from occurring before the current return address is processed, avoiding memory corruption.'
            }
          ]
        }
      ]
    },

    // ── UNIT 3: PROGRAMMING THE BASIC COMPUTER ──
    {
      id: 'unit-3',
      title: 'Unit 3: Programming the Basic Computer',
      description: 'Assembly language, two-pass assembler operation, symbol tables, program loops, subroutines, and arithmetic programming.',
      topics: [
        {
          id: 'assembly-assembler-pass',
          title: 'Assembly Language & Two-Pass Assembler',
          simpleExplanation: 'An assembler translates human-readable assembly instructions (mnemonics and labels) into binary machine code using two scanning passes.',
          detailedExplanation: `## Assembly Language & Two-Pass Assembler

### Why Two Passes Are Necessary (Forward Reference Problem):
If a branch refers to a label defined later in the code (e.g., \`BUN NEXT\` where \`NEXT\` is defined 20 lines below), a one-pass assembler cannot know the binary address during the first scan. Therefore, assemblers use two passes:
- **Pass 1:** Defines symbols and constructs the **Symbol Table** with their memory addresses using the **Location Counter (LC)**.
- **Pass 2:** Translates mnemonics to binary opcodes and looks up symbol addresses to produce executable machine code.

### Two-Pass Assembler Flowchart (Question Bank Q7 & Q24)
\`\`\`mermaid
flowchart TD
    subgraph Pass1["Pass 1: Generate Symbol Table"]
        P1_START["Read line of source code"] --> P1_LBL{"Label present?"}
        P1_LBL -- Yes --> P1_TAB["Store Label + Location Counter (LC) in Symbol Table"]
        P1_LBL -- No --> P1_PSEUDO
        P1_TAB --> P1_PSEUDO{"Pseudo-instruction?"}
        P1_PSEUDO -- ORG --> P1_ORG["Set LC <- Operand value"]
        P1_PSEUDO -- END --> P1_FINISH["Pass 1 Complete: Symbol Table Ready"]
        P1_PSEUDO -- Memory/Non-Memory --> P1_INC["LC <- LC + 1"]
        P1_INC --> P1_START
        P1_ORG --> P1_START
    end

    subgraph Pass2["Pass 2: Generate Binary Machine Code"]
        P2_START["Rewind and read source file"] --> P2_TRANS["Look up Opcode in MRI/Non-MRI table\nLook up address label in Symbol Table"]
        P2_TRANS --> P2_BIN["Generate 16-bit binary machine word"]
        P2_BIN --> P2_END{"END directive?"}
        P2_END -- No --> P2_START
        P2_END -- Yes --> P2_DONE["Save executable .bin file"]
    end

    P1_FINISH ==> Pass2
\`\`\``,
          shortNotes: 'Two-pass assembler: Pass 1 generates Symbol Table with Location Counter (LC) to resolve forward references. Pass 2 translates code to binary.',
          examples: [
            {
              title: 'Symbol Table Generation',
              code: 'ORG 100\nLOOP, LDA X  (LC=100 -> LOOP: 100)\n      ISZ CTR (LC=101)\n      BUN LOOP (LC=102)\nX,    HEX 0020 (LC=103 -> X: 103)',
              explanation: 'Pass 1 records LOOP=100 and X=103 in the Symbol Table.'
            }
          ],
          keyPoints: [
            'Forward reference problem necessitates two scanning passes.',
            'Location Counter (LC) tracks memory address assignment.',
            'Pseudo-instructions (ORG, END, DEC, HEX) guide the assembler and do not generate machine code.'
          ],
          theoryQuestions: [
            {
              question: 'Explain the working of a two-pass assembler in detail. Why are two passes required instead of one?',
              marks: '7 Marks',
              answer: 'A two-pass assembler processes assembly code in two distinct stages:\n\n**Why Two Passes?**\nTo solve the **Forward Reference Problem**, where an instruction references a memory label that is defined later in the source text (e.g., \`BUN EXIT\` before \`EXIT:\` is reached). A single pass cannot resolve the binary address.\n\n**Pass 1 (Symbol Table Generation):**\n- Initializes Location Counter (LC) from \`ORG\` directive.\n- Scans code line by line. If a label exists, records \`(Label, LC)\` in the Symbol Table.\n- Increments LC for each instruction or memory word allocation.\n- Terminates when \`END\` is encountered.\n\n**Pass 2 (Binary Code Generation):**\n- Scans the program a second time from the beginning.\n- Translates symbolic opcodes into binary operation codes.\n- Looks up label names in the Symbol Table to fill in the 12-bit address field.\n- Produces the final binary object file.',
              keyPoints: [
                'Forward reference problem explanation.',
                'Detailed breakdown of Pass 1 (Symbol Table).',
                'Detailed breakdown of Pass 2 (Binary Translation).'
              ]
            }
          ],
          mcqs: [
            {
              question: 'What is the primary purpose of Pass 1 in a two-pass assembler?',
              options: ['Generate binary machine code', 'Build the Symbol Table and assign memory addresses', 'Optimize register allocation', 'Link external libraries'],
              correctIndex: 1,
              explanation: 'Pass 1 scans the source code to assign memory addresses to all labels and store them in the Symbol Table.'
            },
            {
              question: 'Which of the following is an assembler pseudo-instruction (directive) rather than an executable machine instruction?',
              options: ['LDA', 'ADD', 'ORG', 'BSA'],
              correctIndex: 2,
              explanation: 'ORG (Origin) is an assembler directive that sets the Location Counter; it does not generate machine code.'
            }
          ]
        },

        // ── TOPIC 12: PROGRAM LOOPS & SUBROUTINES ──
        {
          id: 'program-loops-subroutines',
          title: 'Program Loops (Add 100 Numbers) & Subroutines (BSA / BUN I)',
          simpleExplanation: 'Loops repeat code using counter increments and skip instructions (ISZ), while subroutines modularize code using BSA and indirect return jumps.',
          detailedExplanation: `## Program Loops & Subroutines

### Assembly Program: Adding 100 Numbers (Question Bank Q25)
\`\`\`assembly
      ORG 100
      LDA COUNT   / Load negative count (-100)
      STA CTR     / Store in counter variable
      LDA PTR     / Load start address pointer
      STA P       / Initialize pointer P
      CLA         / Clear AC (sum = 0)
LOOP, ADD P I     / Add number indirectly through pointer P
      ISZ P       / Increment pointer to next array element
      ISZ CTR     / Increment counter; skip if zero (100 done!)
      BUN LOOP    / Repeat loop
      STA SUM     / Store final result in SUM
      HLT         / Halt program
COUNT,DEC -100    / Negative 100 for ISZ increment loop
CTR,  HEX 0       / Loop counter storage
PTR,  HEX 200     / Starting address of array
P,    HEX 0       / Running pointer
SUM,  HEX 0       / Result storage
      END
\`\`\`

### Subroutine Architecture
\`\`\`mermaid
flowchart TD
    MAIN["Main Program Execution"] --> CALL["BSA SUB\n(Save return address in SUB location)"]
    CALL --> SUB_EXEC["Subroutine Execution Code\n(Process data / parameters)"]
    SUB_EXEC --> RET["BUN SUB I\n(Indirect Branch using return address)"]
    RET --> MAIN_NEXT["Resume Main Program at Next Instruction"]
\`\`\``,
          shortNotes: 'Loops use negative counters incremented by ISZ until zero. Subroutines use BSA SUB to call and BUN SUB I to return.',
          examples: [
            {
              title: 'ISZ Loop Counter Logic',
              code: 'COUNT = -5\nIteration 1: CTR = -4 (ISZ does not skip)\nIteration 5: CTR = 0 (ISZ skips BUN LOOP -> loop terminates)',
              explanation: 'Standard idiom for loop termination in basic computer.'
            }
          ],
          keyPoints: [
            'ISZ skips next instruction only when result equals zero.',
            'Loops initialize counter with negative count value.',
            'BSA stores return address in the subroutine entry location.'
          ],
          theoryQuestions: [
            {
              question: 'Write an assembly program for Mano\'s basic computer to add 100 numbers stored starting at address 200.',
              marks: '7 Marks',
              answer: 'The program initializes a negative counter (-100) and an indirect pointer (200), accumulates elements into AC, and terminates using ISZ:\n\n``\`assembly\n      ORG 100\n      LDA COUNT    / AC <- -100\n      STA CTR      / CTR <- -100\n      LDA PTR      / AC <- 200\n      STA P        / Pointer P <- 200\n      CLA          / Sum = 0\nLOOP, ADD P I      / AC <- AC + M[P]\n      ISZ P        / P <- P + 1 (next item)\n      ISZ CTR      / CTR <- CTR + 1; skip if 0\n      BUN LOOP     / Not 0 yet, loop back\n      STA SUM      / Store total sum\n      HLT\nCOUNT,DEC -100\nCTR,  HEX 0\nPTR,  HEX 200\nP,    HEX 0\nSUM,  HEX 0\n      END\n\```',
              keyPoints: [
                'Correct usage of negative counter.',
                'Indirect addition via pointer (ADD P I).',
                'Pointer increment and counter check via ISZ.'
              ]
            }
          ],
          mcqs: [
            {
              question: 'Why are loop counters in Mano\'s computer initialized with negative values?',
              options: ['Because AC cannot hold positive numbers', 'Because ISZ increments the value and skips only when it reaches zero', 'Because memory cannot store positive values', 'To invert the sign of the result'],
              correctIndex: 1,
              explanation: 'ISZ increments memory and skips when zero is reached; starting at -N causes it to skip after exactly N iterations.'
            },
            {
              question: 'What instruction is used to return from a subroutine in Mano\'s basic computer?',
              options: ['RET', 'POP PC', 'BUN SUB I', 'JMP SUB'],
              correctIndex: 2,
              explanation: 'BUN SUB I executes an indirect branch to the address saved at location SUB.'
            }
          ]
        }
      ]
    },

    // ── UNIT 4: MICROPROGRAMMED CONTROL ──
    {
      id: 'unit-4',
      title: 'Unit 4: Microprogrammed Control',
      description: 'Control memory, address sequencing, 20-bit microinstruction format, microprogram sequencer, and comparison with hardwired control.',
      topics: [
        {
          id: 'control-memory-sequencing',
          title: 'Control Memory & Address Sequencing (Q11, Q12, Q28, Q29, Q41)',
          simpleExplanation: 'A microprogrammed control unit uses a read-only memory (ROM) to store control words (microinstructions) rather than complex combinational logic gates.',
          detailedExplanation: `## Microprogrammed Control & Address Sequencing

### Hardwired vs Microprogrammed Control (Question Bank Q11 & Q28)
| Parameter | Hardwired Control Unit | Microprogrammed Control Unit |
| :--- | :--- | :--- |
| **Implementation** | Fixed combinational logic gates and flip-flops. | Read-Only Memory (ROM) storing microprograms. |
| **Speed** | Very fast (nanosecond logic gate delays). | Slower (requires ROM access time per cycle). |
| **Flexibility / Upgrades** | Extremely difficult (requires rewiring chip). | Very easy (update ROM contents). |
| **Instruction Set Type** | RISC processors (simple fixed instructions). | CISC processors (complex variable microcode). |
| **Cost & Complexity** | Expensive for large/complex instruction sets. | Economical and modular for complex architectures. |

### Microprogrammed Control Unit Architecture
\`\`\`mermaid
flowchart TD
    subgraph Sequencer["Microprogrammed Control Architecture"]
        CAR["Control Address Register (CAR)"]
        ROM["Control Memory (ROM 128 x 20)"]
        CDR["Control Data Register (CDR / Pipeline)"]
        MUX["Next Address Multiplexer"]
        LOGIC["Mapping Logic / Subroutine Register (SBR)"]
    end

    CAR --> ROM
    ROM --> CDR
    CDR -->|"Micro-ops (F1, F2, F3)"| CPU_DATA["Control Signals to CPU Datapath"]
    CDR -->|"Branch Field (BR)"| MUX
    CDR -->|"Condition Field (CD)"| MUX
    CDR -->|"Address Field (AD)"| MUX

    LOGIC -->|"Mapping Address"| MUX
    SBR["Subroutine Register (SBR)"] --> MUX
    INC["CAR + 1 (Incrementer)"] --> MUX

    MUX --> CAR
\`\`\`

### 4 Address Sequencing Capabilities (Question Bank Q12 & Q29):
1. **Incrementing:** $CAR \\leftarrow CAR + 1$ (executes next sequential microinstruction).
2. **Conditional Branching:** $CAR \\leftarrow AD$ if condition ($CD$) is met, else $CAR \\leftarrow CAR + 1$.
3. **Mapping of Instruction Opcode:** Transforms 4-bit machine opcode into 7-bit control memory routine start address ($0\\,XXXX\\,00$).
4. **Subroutine Call and Return:** Subroutine Register ($SBR$) saves return micro-address ($SBR \\leftarrow CAR + 1$) and returns via $CAR \\leftarrow SBR$.`,
          shortNotes: 'Hardwired is faster but inflexible (RISC). Microprogrammed uses ROM (CISC). Sequencing: Increment, Conditional Branch, Mapping, Subroutine Call/Return.',
          examples: [
            {
              title: 'Mapping Logic Example',
              code: 'Machine Opcode = 0011 (ADD)\nMapping Logic outputs: 0 0011 00 = 0001100 (Address 12 in ROM)\nControl jumps to routine at address 12.',
              explanation: 'Pads 0 at MSB and 00 at LSB to generate 7-bit ROM address.'
            }
          ],
          keyPoints: [
            'Microprogrammed control stores control signals as words in ROM.',
            'Hardwired control uses decoders, flip-flops, and gates.',
            'Address sequencing provides branching, looping, and subroutine capability within microcode.'
          ],
          theoryQuestions: [
            {
              question: 'Compare Hardwired Control Unit and Microprogrammed Control Unit across speed, flexibility, design complexity, and suitability.',
              marks: '7 Marks',
              answer: 'Comparison Table:\n\n1. **Speed:** Hardwired is significantly faster because signals propagate through raw logic gates. Microprogrammed is slower due to ROM access delays.\n2. **Flexibility:** Hardwired cannot be modified without changing hardware silicon. Microprogrammed can be modified by updating ROM contents.\n3. **Design Complexity:** Hardwired becomes exponentially complex as instruction count increases. Microprogrammed is systematic and modular.\n4. **Instruction Set Suitability:** Hardwired is ideal for RISC processors with simple instructions. Microprogrammed is ideal for CISC processors with complex micro-routines.',
              keyPoints: [
                'Speed comparison (hardwired faster).',
                'Flexibility comparison (microprogrammed easier to update).',
                'RISC vs CISC association.'
              ]
            },
            {
              question: 'Explain the four address sequencing capabilities required in a control memory.',
              marks: '5 Marks',
              answer: 'A control memory sequencer must support:\n1. **Increment:** Advances $CAR \\leftarrow CAR + 1$ for sequential micro-operation execution.\n2. **Conditional Branch:** Jumps to address field $AD$ if selected condition test bit ($U, I, S, Z$) is true.\n3. **Mapping:** Converts a machine instruction opcode into the starting address of its execution routine in ROM (e.g., $0\\,XXXX\\,00$).\n4. **Subroutine Call & Return:** Saves return address in Subroutine Register ($SBR \\leftarrow CAR + 1$) and restores it upon completion ($CAR \\leftarrow SBR$).',
              keyPoints: [
                'Increment: CAR <- CAR + 1.',
                'Conditional Branch based on CD.',
                'Opcode Mapping.',
                'Subroutine Call and Return using SBR.'
              ]
            }
          ],
          mcqs: [
            {
              question: 'Why is a hardwired control unit faster than a microprogrammed control unit?',
              options: ['It uses higher clock frequency', 'Signals propagate through direct logic gates without ROM read delays', 'It has more registers', 'It does not use a sequence counter'],
              correctIndex: 1,
              explanation: 'Hardwired control uses combinational logic gates directly, avoiding the memory access latency of reading control words from ROM.'
            },
            {
              question: 'In a microprogram sequencer, which register holds the return address during a micro-subroutine call?',
              options: ['Program Counter (PC)', 'Control Address Register (CAR)', 'Subroutine Register (SBR)', 'Instruction Register (IR)'],
              correctIndex: 2,
              explanation: 'The Subroutine Register (SBR) stores CAR + 1 during a call and restores it to CAR upon return.'
            }
          ]
        },

        // ── TOPIC 14: 20-BIT MICROINSTRUCTION FORMAT ──
        {
          id: 'microinstruction-format-20bit',
          title: '20-Bit Microinstruction Format & Fetch Routine',
          simpleExplanation: 'Each microinstruction is a 20-bit control word partitioned into micro-operation fields (F1, F2, F3), condition code (CD), branch type (BR), and address (AD).',
          detailedExplanation: `## 20-Bit Microinstruction Format

### Field Decomposition (Question Bank Q13 & Q41)
\`\`\`mermaid
flowchart LR
    F1["F1: 3 Bits\n(Micro-op 1)"] --- F2["F2: 3 Bits\n(Micro-op 2)"]
    F2 --- F3["F3: 3 Bits\n(Micro-op 3)"]
    F3 --- CD["CD: 2 Bits\n(Condition Code)"]
    CD --- BR["BR: 2 Bits\n(Branch Field)"]
    BR --- AD["AD: 7 Bits\n(Address: 0..127)"]
\`\`\`

- **Total Length:** $3 + 3 + 3 + 2 + 2 + 7 = \\mathbf{20 \\text{ Bits}}$.
- **Control Memory Size:** 128 words ($2^7 = 128$).
- **$F_1, F_2, F_3$ (3 bits each):** Select up to 3 simultaneous micro-operations without hardware conflict.
- **$CD$ (2 bits):** Selects condition ($00 = \\text{Unconditional } 1$, $01 = I\\text{-bit}$, $10 = S\\text{-bit}$, $11 = Z\\text{-bit}$).
- **$BR$ (2 bits):** Branch action ($00 = \\text{JUMP}$, $01 = \\text{CALL}$, $10 = \\text{RET}$, $11 = \\text{MAP}$).
- **$AD$ (7 bits):** Target address in control memory ($0$ to $127$).

### Fetch Routine in Control Memory:
\`\`\`text
Address 64: AR <- PC
Address 65: IR <- M[AR], PC <- PC + 1
Address 66: AR <- IR(0-11), MAP (Jumps to execution routine)
\`\`\``,
          shortNotes: '20-bit format: F1(3), F2(3), F3(3), CD(2), BR(2), AD(7). Control memory has 128 words. BR: JMP, CALL, RET, MAP.',
          examples: [
            {
              title: 'Binary Microinstruction Encoding',
              code: 'Fields: F1=001, F2=100, F3=000, CD=00, BR=00, AD=1000000\nBinary: 001 100 000 00 00 1000000\nExecutes micro-ops specified by F1 and F2, unconditionally jumps to address 64.',
              explanation: 'Specifies 2 parallel micro-ops and a jump.'
            }
          ],
          keyPoints: [
            '3 fields (F1, F2, F3) allow 3 parallel micro-operations per clock cycle.',
            '7-bit address field directly addresses 128 words of ROM.',
            'BR=11 invokes mapping logic to jump to machine instruction routine.'
          ],
          theoryQuestions: [
            {
              question: 'Explain the 20-bit microinstruction format with a diagram detailing all fields and their functions.',
              marks: '5 Marks',
              answer: 'The 20-bit microinstruction format is divided into 6 functional fields:\n1. **F1, F2, F3 (3 bits each = 9 bits):** Micro-operation fields. Each 3-bit field selects one of seven micro-operations (000 is no-op), allowing up to 3 concurrent non-conflicting actions.\n2. **CD (2 bits):** Condition selection for branching (00: Unconditional, 01: Indirect bit I, 10: Sign bit S, 11: Zero bit Z).\n3. **BR (2 bits):** Branch control field (00: JMP, 01: CALL, 10: RET, 11: MAP).\n4. **AD (7 bits):** Address field containing target control memory address (0 to 127).',
              keyPoints: [
                'Diagram of 20-bit format.',
                'F1, F2, F3 micro-operation definitions.',
                'CD, BR, and AD field specifications.'
              ]
            }
          ],
          mcqs: [
            {
              question: 'What is the maximum number of words in a control memory addressed by a 7-bit address field AD?',
              options: ['64 words', '128 words', '256 words', '512 words'],
              correctIndex: 1,
              explanation: '2^7 = 128 words in control memory.'
            },
            {
              question: 'What operation is executed when the Branch field BR equals 11 in the 20-bit microinstruction format?',
              options: ['JMP', 'CALL', 'RET', 'MAP (Opcode mapping to routine start address)'],
              correctIndex: 3,
              explanation: 'BR = 11 specifies MAP, which transfers the 4-bit opcode into CAR via mapping logic.'
            }
          ]
        }
      ]
    },

    // ── UNIT 5: CENTRAL PROCESSING UNIT (CPU) ──
    {
      id: 'unit-5',
      title: 'Unit 5: Central Processing Unit (CPU)',
      description: 'General register CPU organization, 14-bit control word, register stack, Reverse Polish Notation (RPN), addressing modes, and RISC vs CISC.',
      topics: [
        {
          id: 'general-register-organization',
          title: 'General Register Organization & 14-Bit Control Word (Q30, Q42)',
          simpleExplanation: 'CPU registers are organized in a common bank connected to two source buses (Bus A, Bus B), an ALU, and a destination decoder via a 14-bit control word.',
          detailedExplanation: `## General Register Organization & Control Word

### CPU Datapath Architecture
\`\`\`mermaid
flowchart TD
    subgraph Registers["Register Bank (7 Registers)"]
        R1["R1"]
        R2["R2"]
        R3["R3"]
        R4["R4"]
        R5["R5"]
        R6["R6"]
        R7["R7"]
    end

    SELA["SELA (3 Bits)"] ==> MUXA["Multiplexer A (8x1)"]
    SELB["SELB (3 Bits)"] ==> MUXB["Multiplexer B (8x1)"]

    Registers ==> MUXA
    Registers ==> MUXB

    MUXA ==>|"Bus A"| ALU["Arithmetic Logic Unit (ALU)"]
    MUXB ==>|"Bus B"| ALU
    OPR["OPR Select (5 Bits)"] ==> ALU

    ALU ==> SHIFT["Shifter Unit"]
    SHIFT ==>|"Output Bus"| DECODER["3-to-8 Destination Decoder"]
    SELD["SELD (3 Bits)"] ==> DECODER

    DECODER ==>|"Load Enable (LD)"| Registers
\`\`\`

### 14-Bit Control Word Format:
| Field | Bit Width | Function | Selection Range |
| :--- | :---: | :--- | :--- |
| **SELA** | 3 | Selects source register for Bus A | 000 (None/Input) to 111 (R7) |
| **SELB** | 3 | Selects source register for Bus B | 000 (None/Input) to 111 (R7) |
| **SELD** | 3 | Selects destination register via decoder | 000 (None) to 111 (R7) |
| **OPR** | 5 | Selects ALU operation | 5 bits = 32 possible ALU operations |
| **Total**| **14 Bits** | Specifies complete CPU clock cycle operation | |

### Worked Example: Encoding \`R1 <- R2 + R3\`
- **Bus A Source ($SELA$):** $R_2 \\implies \\mathbf{010}$
- **Bus B Source ($SELB$):** $R_3 \\implies \\mathbf{011}$
- **Destination ($SELD$):** $R_1 \\implies \\mathbf{001}$
- **ALU Operation ($OPR$):** ADD ($A + B$) $\\implies \\mathbf{00010}$
- **Full 14-Bit Control Word:** $\\mathbf{010\\;011\\;001\\;00010}$`,
          shortNotes: '14-bit control word: SELA(3), SELB(3), SELD(3), OPR(5). Selects two source registers, destination register, and ALU operation.',
          examples: [
            {
              title: 'Control Word for R1 <- R2 + R3',
              code: 'SELA = 010 (R2)\nSELB = 011 (R3)\nSELD = 001 (R1)\nOPR  = 00010 (ADD)\nControl Word = 010 011 001 00010',
              explanation: 'Specifies adding R2 and R3 into R1 in 1 clock cycle.'
            }
          ],
          keyPoints: [
            '14-bit control word configures the entire CPU datapath for one cycle.',
            'Multiplexers select ALU operands; 3x8 decoder selects destination register.',
            'Zero code in SELD means result is discarded (no register updated).'
          ],
          theoryQuestions: [
            {
              question: 'Draw and explain the block diagram of a General Register CPU Organization. Explain how a 14-bit control word specifies operations.',
              marks: '7 Marks',
              answer: 'A general register organization contains:\n1. **Register Bank:** Seven general-purpose registers ($R_1$ to $R_7$).\n2. **Multiplexers A and B:** Two $8 \\times 1$ MUXes selected by 3-bit fields $SELA$ and $SELB$ that place chosen register contents onto Bus A and Bus B.\n3. **ALU & Shifter:** Performs arithmetic/logic operations selected by a 5-bit $OPR$ field.\n4. **Destination Decoder:** A $3 \\times 8$ decoder selected by $SELD$ that asserts the LOAD input of the destination register.\n\n**14-Bit Control Word:**\n- $SELA$ (3 bits) + $SELB$ (3 bits) + $SELD$ (3 bits) + $OPR$ (5 bits) = 14 bits.\n- At each clock cycle, the control word selects inputs, operation, and destination.',
              keyPoints: [
                'Full datapath diagram.',
                'Explanation of Bus A, Bus B, ALU, Decoder.',
                'Breakdown of all 4 fields in 14-bit control word.'
              ]
            }
          ],
          mcqs: [
            {
              question: 'In a general register organization with 7 registers, what is the bit width of the destination selection field SELD?',
              options: ['2 bits', '3 bits', '4 bits', '5 bits'],
              correctIndex: 1,
              explanation: '3 bits are required to select one of 7 registers (or 000 for no destination register).'
            },
            {
              question: 'How many total bits make up the standard CPU datapath control word for 7 registers and 32 ALU operations?',
              options: ['12 bits', '14 bits', '16 bits', '20 bits'],
              correctIndex: 1,
              explanation: 'SELA(3) + SELB(3) + SELD(3) + OPR(5) = 14 bits.'
            }
          ]
        },

        // ── TOPIC 16: STACK ORGANIZATION & RPN ──
        {
          id: 'stack-organization-rpn',
          title: 'Stack Organization, PUSH/POP & Reverse Polish Notation (Q16, Q31, Q43, Q45)',
          simpleExplanation: 'A stack is a Last-In, First-Out (LIFO) memory structure managed by a Stack Pointer (SP) that executes zero-address instructions and Reverse Polish Notation math.',
          detailedExplanation: `## Stack Organization & Reverse Polish Notation (RPN)

### 64-Word Register Stack Architecture
\`\`\`mermaid
flowchart TD
    subgraph StackHw["64-Word Register Stack Hardware"]
        SP["Stack Pointer SP: 6 Bits (0..63)"]
        MEM["Stack Storage (64 Words)"]
        FULL["FULL Flip-Flop (1 when SP = 0 after push)"]
        EMPTY["EMPTY Flip-Flop (1 when SP = 0 after pop)"]
    end

    subgraph PushOp["PUSH Micro-operations"]
        P1["SP ← SP + 1"] --> P2["Memory(SP) ← DR"]
        P2 --> P3["if (SP == 0) FULL ← 1\nEMPTY ← 0"]
    end

    subgraph PopOp["POP Micro-operations"]
        PO1["DR ← Memory(SP)"] --> PO2["SP ← SP - 1"]
        PO2 --> PO3["if (SP == 0) EMPTY ← 1\nFULL ← 0"]
    end
\`\`\`

### Reverse Polish Notation (RPN / Postfix Notation):
Standard arithmetic is **Infix**: $A + B$.
Stack processors use **Postfix (RPN)**: $A \\; B \\; +$ (operators follow operands, eliminating all parentheses!).

### Conversion Example (Question Bank Q16):
Convert: $(A + B) \\times [C \\times (D + E) + F]$
1. $(A + B) \\implies A \\; B \\; +$
2. $(D + E) \\implies D \\; E \\; +$
3. $C \\times (D + E) \\implies C \\; D \\; E \\; + \\; \\times$
4. $[\\dots] + F \\implies C \\; D \\; E \\; + \\; \\times \\; F \\; +$
5. Final Product: $\\mathbf{A \\; B \\; + \\; C \\; D \\; E \\; + \\; \\times \\; F \\; + \\; \\times}$`,
          shortNotes: 'Stack is LIFO. SP points to top. PUSH: SP<-SP+1, M[SP]<-DR. POP: DR<-M[SP], SP<-SP-1. RPN (postfix) evaluates expressions without parentheses.',
          examples: [
            {
              title: 'Evaluating Postfix on Stack',
              code: 'Expression: 5 3 + 2 *\n1. Push 5, Push 3\n2. + : Pop 3, 5 -> Add -> Push 8\n3. Push 2\n4. * : Pop 2, 8 -> Multiply -> Push 16\nResult = 16',
              explanation: 'Operands pushed; operators pop two operands and push result.'
            }
          ],
          keyPoints: [
            'SP has 6 bits to address 64 words (0 to 63).',
            'PUSH increments SP then writes data.',
            'POP reads data then decrements SP.',
            'RPN expressions are evaluated using zero-address instructions.'
          ],
          theoryQuestions: [
            {
              question: 'Explain Register Stack Organization with a diagram. Write the micro-operations for PUSH and POP with FULL and EMPTY flag handling.',
              marks: '7 Marks',
              answer: 'A 64-word register stack uses a 6-bit Stack Pointer ($SP$) and two flip-flops: $FULL$ and $EMPTY$.\n\n**PUSH Micro-operations:**\n1. $SP \\leftarrow SP + 1$\n2. $M[SP] \\leftarrow DR$ (Write data to stack top)\n3. $\\text{if } (SP = 0) \\text{ then } FULL \\leftarrow 1$ (Overflow check)\n4. $EMPTY \\leftarrow 0$ (Stack is definitely not empty)\n\n**POP Micro-operations:**\n1. $DR \\leftarrow M[SP]$ (Read data from stack top)\n2. $SP \\leftarrow SP - 1$\n3. $\\text{if } (SP = 0) \\text{ then } EMPTY \\leftarrow 1$ (Underflow check)\n4. $FULL \\leftarrow 0$ (Stack is definitely not full)',
              keyPoints: [
                'Full hardware stack diagram.',
                'Exact PUSH micro-operations with FULL flag.',
                'Exact POP micro-operations with EMPTY flag.'
              ]
            }
          ],
          mcqs: [
            {
              question: 'In a 64-word register stack, how many bits are required for the Stack Pointer (SP)?',
              options: ['5 bits', '6 bits', '7 bits', '8 bits'],
              correctIndex: 1,
              explanation: '2^6 = 64 words, so exactly 6 bits are required for SP.'
            },
            {
              question: 'What is the Reverse Polish Notation (RPN) of the infix expression (A * B) + (C / D)?',
              options: ['A B * C D / +', '+ * A B / C D', 'A B C D * / +', 'A B * + C D /'],
              correctIndex: 0,
              explanation: 'In postfix, (A*B) becomes A B *, (C/D) becomes C D /, and addition combines them: A B * C D / +.'
            }
          ]
        },

        // ── TOPIC 17: ADDRESSING MODES MASTER GUIDE ──
        {
          id: 'addressing-modes-master',
          title: 'Addressing Modes Master Guide & Numericals (Q14, Q15, Q32, Q33)',
          simpleExplanation: 'Addressing modes specify different rules for interpreting the address field of an instruction to locate the operand in registers or RAM.',
          detailedExplanation: `## Addressing Modes Master Guide

### Comprehensive Addressing Modes Architecture
\`\`\`mermaid
flowchart TD
    INSTR["Instruction Word: Mode | Opcode | Address / Offset Field"]

    INSTR --> IMM["1. Immediate Mode\nOperand is the address field value itself"]
    INSTR --> DIR["2. Direct Mode\nEffective Address EA = Address Field"]
    INSTR --> IND["3. Indirect Mode\nEA = Memory(Address Field) (Pointer)"]
    INSTR --> REG["4. Register Mode\nOperand is inside selected CPU register"]
    INSTR --> REGIND["5. Register Indirect Mode\nEA = Content of selected CPU register"]
    INSTR --> REL["6. Relative Addressing Mode\nEA = PC + Address Field (Offset)"]
    INSTR --> IDX["7. Indexed Addressing Mode\nEA = Index Register (XR) + Address Field"]
    INSTR --> BASE["8. Base Register Mode\nEA = Base Register (BR) + Offset"]
\`\`\`

### Comprehensive Comparison Table (Exam Mandatory):
| Addressing Mode | Effective Address ($EA$) Formula | Where Operand Lives | Primary Practical Use Case |
| :--- | :--- | :--- | :--- |
| **Immediate** | None ($EA = \\text{Instruction Address}$) | Inside instruction itself | Loading constants: \`int x = 5;\` |
| **Direct** | $EA = \\text{Address Field}$ | In memory at address | Accessing static global variables |
| **Indirect** | $EA = M[\\text{Address Field}]$ | In memory pointed to by pointer | Pointers and references: \`*ptr\` |
| **Register** | None ($EA = \\text{Register Name}$) | Inside CPU register | Fast local variables (no memory bus traffic!) |
| **Register Indirect**| $EA = \\text{Content of Register}$ | In memory pointed to by register | Iterating arrays via pointers: \`*(ptr++)\` |
| **Relative** | $EA = PC + \\text{Address Field}$ | Offset relative to current PC | Position-independent code, local if/else |
| **Indexed** | $EA = XR + \\text{Address Field}$ | Offset relative to Index Register | Array indexing: \`arr[i]\` |
| **Base Register** | $EA = BR + \\text{Address Field}$ | Offset relative to Base Register | Relocatable code in multiprogramming OS |

### Master Numerical Problem (Question Bank Q15 & Q33):
**Given:**
- Memory Address 200 contains: Instruction with Mode, Opcode, Address = 500
- $PC = 200$ (fetches instruction at 200, so $PC$ increments to 201)
- $R_1 = 400$
- $XR = 100$
- Memory at 500 contains 800
- Memory at 800 contains 300

**Calculate Effective Address and Operand:**
| Addressing Mode | Effective Address ($EA$) Calculation | Effective Address | Operand Fetched |
| :--- | :--- | :---: | :---: |
| **Direct** | $EA = 500$ | **500** | **800** |
| **Immediate** | $EA = 200$ (Operand is in instruction) | **200** | **500** |
| **Indirect** | $EA = M[500] = 800$ | **800** | **300** |
| **Relative** | $EA = PC + 500 = 201 + 500$ | **701** | $M[701]$ |
| **Indexed** | $EA = XR + 500 = 100 + 500$ | **600** | $M[600]$ |
| **Register** | Operand is in $R_1$ (No $EA$) | — | **400** |
| **Register Indirect**| $EA = R_1 = 400$ | **400** | $M[400]$ |`,
          shortNotes: 'Direct: EA=Addr. Indirect: EA=M[Addr]. Relative: EA=PC+Addr. Indexed: EA=XR+Addr. Reg Indirect: EA=R. Immediate: Operand=Addr.',
          examples: [
            {
              title: 'Relative Addressing Example',
              code: 'PC = 201, Offset = +50\nEA = 201 + 50 = 251\nJumps forward 50 instructions from PC.',
              explanation: 'Position independent jump.'
            }
          ],
          keyPoints: [
            'Immediate mode has fastest operand access (no memory read).',
            'Relative mode adds offset to PC (used for short jumps).',
            'Indexed mode adds base address to Index Register XR (used for arrays).'
          ],
          theoryQuestions: [
            {
              question: 'Explain any six addressing modes with diagrams, effective address formulas, and practical use cases.',
              marks: '7 Marks',
              answer: 'Six key addressing modes:\n1. **Immediate Mode:** Operand is part of instruction. No memory access. Example: \`MOV R1, #5\`.\n2. **Direct Mode:** Address field is effective address: $EA = A$. One memory access. Example: \`LDA 2000\`.\n3. **Indirect Mode:** Address field points to memory pointer: $EA = M[A]$. Two memory accesses. Example: Pointer dereference \`*ptr\`.\n4. **Register Indirect Mode:** Register contains effective address: $EA = (R)$. Example: \`MOV A, @R0\`.\n5. **Relative Addressing Mode:** Effective address is relative to PC: $EA = PC + A$. Used in branching.\n6. **Indexed Addressing Mode:** Effective address combines Index Register and address field: $EA = XR + A$. Used in array traversal.',
              keyPoints: [
                'State 6 modes clearly.',
                'Provide mathematical EA formula for each.',
                'Provide practical programming use cases.'
              ]
            }
          ],
          mcqs: [
            {
              question: 'In Relative Addressing Mode, what register is added to the address field to find the Effective Address?',
              options: ['Accumulator (AC)', 'Program Counter (PC)', 'Index Register (XR)', 'Stack Pointer (SP)'],
              correctIndex: 1,
              explanation: 'Relative addressing calculates EA = PC + Address/Offset.'
            },
            {
              question: 'Which addressing mode is most suitable for implementing array traversal arr[i] in loops?',
              options: ['Immediate mode', 'Direct mode', 'Indexed addressing mode', 'Indirect mode'],
              correctIndex: 2,
              explanation: 'Indexed addressing (EA = Base + XR) allows incrementing the Index Register XR in each iteration to access consecutive array elements.'
            }
          ]
        },

        // ── TOPIC 18: RISC VS CISC ──
        {
          id: 'risc-cisc-register-windows',
          title: 'RISC vs CISC Architecture & Overlapped Register Windows (Q18, Q34)',
          simpleExplanation: 'RISC focuses on simple, single-cycle instructions with large register files, while CISC emphasizes complex, multi-cycle instructions implemented with microcode.',
          detailedExplanation: `## RISC vs CISC & Overlapped Register Windows

### Comprehensive Comparison Table (Question Bank Q18 & Q34):
| Parameter | RISC (Reduced Instruction Set Computer) | CISC (Complex Instruction Set Computer) |
| :--- | :--- | :--- |
| **Instruction Size** | Fixed length (usually 32 bits). | Variable length (1 byte to 15+ bytes). |
| **Instruction Count** | Small set of simple instructions (< 100). | Large set of complex instructions (300+). |
| **Addressing Modes** | Very few (2 to 4 simple modes). | Many complex modes (10 to 20+ modes). |
| **Memory Access** | **Load/Store only** (only LOAD and STORE access RAM). | Any instruction can access memory (e.g., \`ADD [BX], AX\`). |
| **Control Unit** | **Hardwired** (fast, direct silicon logic). | **Microprogrammed** (stored in control ROM). |
| **Execution Rate** | One instruction per clock cycle (pipelined). | Multiple clock cycles per instruction. |
| **Registers** | Large register file (e.g., 128+ registers). | Small register set (8 to 16 registers). |
| **Examples** | ARM (Apple Silicon, Android), MIPS, RISC-V. | Intel x86 (Core i5/i7/i9), AMD. |

### Overlapped Register Windows (RISC Innovation):
\`\`\`mermaid
flowchart TD
    subgraph Global["Global Registers (Shared Across All Procedures)"]
        G0["R0..R7: Global Constants & Pointers"]
    end

    subgraph Window0["Procedure A Register Window"]
        HIGH_A["R24..R31: High (Input Parameters)"]
        LOCAL_A["R16..R23: Local Variables of A"]
        LOW_A["R8..R15: Low (Outgoing Parameters to B)"]
    end

    subgraph Window1["Procedure B Register Window (Overlapped)"]
        HIGH_B["R24..R31: High (Matches Low of A!)"]
        LOCAL_B["R16..R23: Local Variables of B"]
        LOW_B["R8..R15: Low (Outgoing to C)"]
    end

    LOW_A === HIGH_B
\`\`\`

### Register Windows Formulas (Must Memorize):
$$\\mathbf{\\text{Window Size} = L + 2C + G}$$
$$\\mathbf{\\text{Total Register File Size} = (L + C) \\times W + G}$$
Where $W$ = Number of windows, $L$ = Local registers, $C$ = Common/overlap registers, $G$ = Global registers.

**Slide Worked Example:**
Given $G = 10, L = 10, C = 6, W = 4$:
- Window Size = $10 + 2(6) + 10 = \\mathbf{32 \\text{ registers}}$.
- Total Register File = $(10 + 6) \\times 4 + 10 = 16 \\times 4 + 10 = \\mathbf{74 \\text{ registers}}$ ($R_0$ to $R_{73}$).`,
          shortNotes: 'RISC: Simple fixed instructions, load/store only, hardwired, large register file. Register File = (L + C)*W + G. Window = L + 2C + G.',
          examples: [
            {
              title: 'Register Windows Calculation',
              code: 'G=10, L=10, C=6, W=4\nWindow = 10 + 2(6) + 10 = 32 registers\nRegister File = (10 + 6)*4 + 10 = 74 registers',
              explanation: '74 total registers partitioned into 4 overlapping windows of 32 registers each.'
            }
          ],
          keyPoints: [
            'RISC relies on load/store architecture and hardwired control.',
            'CISC emphasizes rich instructions in hardware using microcode.',
            'Overlapped register windows eliminate memory stack frame overhead during function calls.'
          ],
          theoryQuestions: [
            {
              question: 'Compare RISC and CISC architectures across instruction set, registers, cycles per instruction, control unit, and pipelining.',
              marks: '7 Marks',
              answer: 'Comparison Table:\n\n1. **Instruction Set:** RISC has simple, fixed-length instructions; CISC has complex, variable-length instructions.\n2. **Memory Access:** RISC only accesses memory via LOAD and STORE (Load/Store architecture); CISC allows arithmetic operations directly on memory operands.\n3. **Registers:** RISC features a large register file (128+ registers); CISC features fewer registers (8 to 16).\n4. **Control Unit:** RISC uses hardwired control for single-cycle execution; CISC uses microprogrammed ROM.\n5. **Pipelining:** RISC is optimized for deep, efficient pipelining; CISC pipelining is complex due to variable instruction lengths.',
              keyPoints: [
                'Load/Store architecture vs memory operands.',
                'Hardwired vs microprogrammed control.',
                'Large register file vs few registers.'
              ]
            }
          ],
          mcqs: [
            {
              question: 'In RISC architecture with G=10 global, L=10 local, C=6 common registers, what is the size of each window?',
              options: ['26 registers', '32 registers', '42 registers', '74 registers'],
              correctIndex: 1,
              explanation: 'Window size = L + 2C + G = 10 + 2(6) + 10 = 32 registers.'
            },
            {
              question: 'Which of the following is a defining characteristic of RISC processors?',
              options: ['Variable length instructions', 'Microprogrammed control memory', 'Load/Store memory architecture', 'Instructions take dozens of clock cycles'],
              correctIndex: 2,
              explanation: 'In RISC, operands for arithmetic and logic instructions must reside in registers; only explicit LOAD and STORE instructions access memory.'
            }
          ]
        },

        // ── TOPIC 19: COMPUTER ARITHMETIC & BOOTH'S ALGORITHM ──
        {
          id: 'computer-arithmetic-booth',
          title: 'Booth\'s Multiplication Algorithm & Division Flowchart (Q35, Q44)',
          simpleExplanation: 'Booth\'s algorithm multiplies signed 2\'s complement binary numbers efficiently by treating strings of consecutive 1\'s as a single subtraction and addition.',
          detailedExplanation: `## Computer Arithmetic: Booth's Multiplication Algorithm

### Why Booth's Algorithm?
Standard binary multiplication requires multiple shift-and-add steps for every 1 in the multiplier.
Booth's algorithm observes that a block of consecutive 1's (e.g., $011110 = 30$) can be computed simply as $2^5 - 2^1 = 32 - 2 = 30$. This replaces multiple additions with **one subtraction and one addition**, drastically speeding up signed multiplication!

### Booth's Multiplication Algorithm Flowchart (Question Bank Q35)
\`\`\`mermaid
flowchart TD
    START(["Start Booth's Multiplication"]) --> INIT["Initialize:\nAC = 0, Qn+1 = 0\nBR = Multiplicand\nQR = Multiplier\nSC = Number of Bits (n)"]
    INIT --> CHECK{"Test (Qn, Qn+1)"}

    CHECK -- "10" --> SUB["AC ← AC - BR\n(or AC ← AC + BR' + 1)"]
    CHECK -- "01" --> ADD["AC ← AC + BR"]
    CHECK -- "00 or 11" --> ASHR

    SUB --> ASHR["Arithmetic Shift Right (ashr):\n(AC, QR, Qn+1)\nPreserve sign bit in AC!"]
    ADD --> ASHR

    ASHR --> DEC["SC ← SC - 1"]
    DEC --> LOOP{"SC == 0?"}
    LOOP -- No --> CHECK
    LOOP -- Yes --> DONE(["Done: Product is in (AC, QR)"])
\`\`\`

### Worked Numerical: Multiply $(-9) \\times (-13)$ using 5-bit Booth's
- Multiplicand $BR = -9 = 10111_2$ (2's comp), $\\overline{BR} + 1 = +9 = 01001_2$
- Multiplier $QR = -13 = 10011_2$
- Initial: $AC = 00000, Q_n = 1, Q_{n+1} = 0, SC = 5$

| Step | Operation | $AC$ | $QR$ | $Q_{n+1}$ | $SC$ |
| :---: | :--- | :---: | :---: | :---: | :---: |
| **0** | Initial Values | 00000 | 10011 | 0 | 5 |
| **1** | $Q_n Q_{n+1} = 10 \\implies AC \\leftarrow AC - BR$ | 01001 | 10011 | 0 | 5 |
| | $\\text{ashr } [AC, QR, Q_{n+1}]$ | 00100 | 11001 | 1 | 4 |
| **2** | $Q_n Q_{n+1} = 11 \\implies$ Shift only | 00010 | 01100 | 1 | 3 |
| **3** | $Q_n Q_{n+1} = 01 \\implies AC \\leftarrow AC + BR$ | 11001 | 01100 | 1 | 3 |
| | $\\text{ashr } [AC, QR, Q_{n+1}]$ | 11100 | 10110 | 0 | 2 |
| **4** | $Q_n Q_{n+1} = 00 \\implies$ Shift only | 11110 | 01011 | 0 | 1 |
| **5** | $Q_n Q_{n+1} = 10 \\implies AC \\leftarrow AC - BR$ | 00111 | 01011 | 0 | 1 |
| | $\\text{ashr } [AC, QR, Q_{n+1}]$ | **00011** | **10101** | 1 | 0 |

**Result:** $[AC, QR] = 0001110101_2 = \\mathbf{+117_{10}}$. Correct! ($(-9) \\times (-13) = +117$).`,
          shortNotes: 'Booth algorithm multiplies signed 2s complement numbers. Qn Qn+1: 10 -> AC-BR, 01 -> AC+BR, 00/11 -> no-op. Followed by ashr and SC-1.',
          examples: [
            {
              title: 'Booth Rule Selection',
              code: 'Qn Qn+1 = 10 -> Subtract BR from AC, then ashr\nQn Qn+1 = 01 -> Add BR to AC, then ashr\nQn Qn+1 = 00 -> ashr only\nQn Qn+1 = 11 -> ashr only',
              explanation: 'Applies across all n bits.'
            }
          ],
          keyPoints: [
            'Handles signed 2s complement numbers without sign conversion.',
            'Arithmetic shift right preserves the sign bit in AC.',
            'Product is stored across the combined AC and QR registers.'
          ],
          theoryQuestions: [
            {
              question: 'Draw the complete flowchart of Booth\'s Multiplication Algorithm and explain its step-by-step working.',
              marks: '7 Marks',
              answer: 'Booth\'s Algorithm multiplies two signed 2\'s complement binary numbers:\n1. **Initialization:** Multiplicand in $BR$, Multiplier in $QR$, $AC = 0$, $Q_{n+1} = 0$, Sequence Counter $SC = n$.\n2. **Bit Inspection:** Inspect the two least significant bits $[Q_n, Q_{n+1}]$:\n   - \`10\`: Beginning of a run of 1s $\\rightarrow AC \\leftarrow AC - BR$.\n   - \`01\`: End of a run of 1s $\\rightarrow AC \\leftarrow AC + BR$.\n   - \`00\` or \`11\`: Inside a run of identical bits $\\rightarrow$ No arithmetic operation.\n3. **Arithmetic Shift Right:** Arithmetic shift right $[AC, QR, Q_{n+1}]$ preserving AC\'s sign bit.\n4. **Counter Decrement:** $SC \\leftarrow SC - 1$. Repeat until $SC = 0$.\n5. **Output:** The final $2n$-bit product resides in $[AC, QR]$.',
              keyPoints: [
                'Full flowchart diagram.',
                'Explanation of [Qn, Qn+1] test cases.',
                'Preservation of sign during arithmetic shift right.'
              ]
            }
          ],
          mcqs: [
            {
              question: 'In Booth\'s multiplication algorithm, what operation is performed when Qn Qn+1 = 10?',
              options: ['AC <- AC + BR', 'AC <- AC - BR', 'Only arithmetic shift right', 'Clear AC'],
              correctIndex: 1,
              explanation: '10 indicates the beginning of a block of 1s, requiring subtraction of the multiplicand: AC <- AC - BR.'
            },
            {
              question: 'What is the primary advantage of Booth\'s multiplication algorithm over traditional shift-and-add?',
              options: ['It requires no adder circuit', 'It handles negative 2s complement numbers directly and speeds up execution over blocks of 1s', 'It uses only 1 register', 'It eliminates shift operations'],
              correctIndex: 1,
              explanation: 'Booth directly operates on signed 2s complement integers and replaces strings of additions with one subtraction and one addition.'
            }
          ]
        }
      ]
    },

    // ── UNIT 6: PIPELINE, MEMORY & I/O ORGANIZATION ──
    {
      id: 'unit-6',
      title: 'Unit 6: Pipeline, Memory & I/O Organization',
      description: 'Flynn classification, pipelining speedup formulas, hazards, memory hierarchy, cache mapping, and Direct Memory Access (DMA).',
      topics: [
        {
          id: 'pipelining-flynn-speedup',
          title: 'Flynn\'s Classification & Pipeline Speedup Formula',
          simpleExplanation: 'Pipelining overlaps different stages of instruction execution like a factory assembly line, vastly increasing throughput.',
          detailedExplanation: `## Flynn's Classification & Pipelining Speedup

### Flynn's Classification (4 Architectures):
1. **SISD (Single Instruction, Single Data):** Conventional uniprocessor. Sequential execution.
2. **SIMD (Single Instruction, Multiple Data):** Vector/Array processors, modern GPUs. Single instruction operates on arrays of data concurrently.
3. **MISD (Multiple Instruction, Single Data):** Multiple instructions operate on the same data stream (used in fault-tolerant avionics).
4. **MIMD (Multiple Instruction, Multiple Data):** Multicore processors, distributed computing clusters, supercomputers.

### 4-Stage Instruction Pipeline Architecture
\`\`\`mermaid
flowchart LR
    FI["Stage 1: FI\n(Fetch Instruction)"] -->|"Interstage Reg"| DA["Stage 2: DA\n(Decode & Address)"]
    DA -->|"Interstage Reg"| FO["Stage 3: FO\n(Fetch Operand)"]
    FO -->|"Interstage Reg"| EX["Stage 4: EX\n(Execute Instruction)"]
\`\`\`

### Pipelining Speedup Formula:
$$\\mathbf{\\text{Total Clock Cycles for } n \\text{ tasks} = k + n - 1}$$
$$\\mathbf{\\text{Speedup } S = \\frac{n \\cdot k}{k + n - 1}}$$
As $n \\rightarrow \\infty$, $\\mathbf{S \\rightarrow k}$ (Theoretical maximum speedup equals number of pipeline stages).`,
          shortNotes: 'Flynn: SISD, SIMD (GPUs), MISD, MIMD (Multicore). Pipeline Speedup S = (n*k)/(k+n-1). Max speedup approaches k.',
          examples: [
            {
              title: 'Speedup Calculation',
              code: 'k=4 stages, n=100 tasks\nCycles = 4 + 100 - 1 = 103 cycles\nNon-pipelined = 100 * 4 = 400 cycles\nSpeedup = 400 / 103 = 3.88x',
              explanation: '100 tasks finish in 103 clock cycles instead of 400 cycles.'
            }
          ],
          keyPoints: [
            'Flynn classifies systems by instruction and data streams.',
            'Pipelining increases throughput, not individual task latency.',
            'Speedup approaches number of stages k for large workloads.'
          ],
          theoryQuestions: [
            {
              question: 'Define pipelining. Derive the formula for speedup of a k-segment pipeline over an unpipelined processor for n tasks.',
              marks: '7 Marks',
              answer: 'Pipelining is a technique of decomposing a sequential process into sub-operations, with each sub-operation being executed in a dedicated segment concurrently with all other segments.\n\n**Derivation:**\n- Let $k$ = number of pipeline segments, and $t_p$ = clock cycle time.\n- To execute $n$ tasks:\n  - The first task takes $k$ clock cycles to exit the pipeline.\n  - The remaining $n-1$ tasks exit at the rate of 1 task per clock cycle.\n  - Total pipelined time $T_p = (k + n - 1) \\times t_p$.\n- In a non-pipelined system, each task takes $k \\times t_p$, so total time $T_n = n \\times k \\times t_p$.\n- **Speedup Ratio ($S$):**\n  $$S = \\frac{T_n}{T_p} = \\frac{n \\times k \\times t_p}{(k + n - 1) \\times t_p} = \\frac{n \\cdot k}{k + n - 1}$$\n- When $n \\gg k$ ($n \\rightarrow \\infty$):\n  $$S = k$$\n  The maximum theoretical speedup equals the number of stages $k$.',
              keyPoints: [
                'Clear definition of pipelining.',
                'Derivation showing (k + n - 1) cycles.',
                'Limit as n approaches infinity equals k.'
              ]
            }
          ],
          mcqs: [
            {
              question: 'In a 5-segment pipeline executing 100 tasks, how many clock cycles are required to complete all tasks?',
              options: ['500 cycles', '105 cycles', '104 cycles', '96 cycles'],
              correctIndex: 2,
              explanation: 'Total cycles = k + n - 1 = 5 + 100 - 1 = 104 clock cycles.'
            },
            {
              question: 'Which architecture category under Flynn\'s classification represents modern Graphics Processing Units (GPUs)?',
              options: ['SISD', 'SIMD', 'MISD', 'MIMD'],
              correctIndex: 1,
              explanation: 'GPUs execute Single Instruction Multiple Data (SIMD) on massive parallel matrix/vector arrays.'
            }
          ]
        },

        // ── TOPIC 21: PIPELINE HAZARDS ──
        {
          id: 'instruction-pipeline-hazards',
          title: 'Instruction Pipeline & Conflict Remedies (Hazards)',
          simpleExplanation: 'Instruction pipelines suffer from structural, data, and branch hazards that cause pipeline stalls (bubbles).',
          detailedExplanation: `## Instruction Pipeline & Conflicts (Hazards)

### Pipeline Hazards Architecture
\`\`\`mermaid
flowchart TD
    HAZARDS["Instruction Pipeline Hazards"] --> STRUCT["1. Structural Hazard\n(Hardware resource conflict, e.g. single memory port)"]
    HAZARDS --> DATA["2. Data Hazard\n(Data dependency between overlapping instructions)"]
    HAZARDS --> CONTROL["3. Control Hazard\n(Branch instructions altering Program Counter)"]

    DATA --> RAW["RAW (Read-After-Write) - True Dependency"]
    DATA --> WAR["WAR (Write-After-Read) - Anti-dependency"]
    DATA --> WAW["WAW (Write-After-Write) - Output dependency"]

    STRUCT --> SOL1["Solution: Separate Instruction & Data Caches (Harvard Architecture)"]
    DATA --> SOL2["Solution: Hardware Operand Forwarding (Bypassing) & NOP insertion"]
    CONTROL --> SOL3["Solution: Branch Prediction, Delayed Branching & Branch Target Buffer"]
\`\`\`

### Three Types of Pipeline Conflicts (Hazards) & Remedies:
| Conflict Type | Physical Root Cause | Hardware / Software Remedies |
| :--- | :--- | :--- |
| **1. Structural Hazard** | Two stages attempt to access the same physical hardware resource simultaneously. | **Separate Harvard Caches:** Independent Instruction Cache and Data Cache. |
| **2. Data Hazard (RAW)** | Instruction needs result of previous instruction before it has written back to registers. | **Operand Forwarding (Bypassing):** Route ALU output directly to next ALU input. |
| **3. Control Hazard** | Conditional jump alters PC, making all prefetched instructions invalid. | **Branch Prediction**, **Branch Target Buffer (BTB)**, and **Delayed Branching**. |`,
          shortNotes: '3 Hazards: Structural (memory conflict -> fix with Harvard cache), Data (RAW dependency -> fix with operand forwarding), Control (branch jump -> fix with branch prediction).',
          examples: [
            {
              title: 'Data Forwarding Bypass',
              code: 'ADD R1, R2, R3   (R1 ready at ALU output at cycle 3)\nSUB R4, R1, R5   (Needs R1 at cycle 4)\nBypass forwards R1 output directly to ALU input without waiting for register write-back.',
              explanation: 'Eliminates 2 pipeline stall bubbles.'
            }
          ],
          keyPoints: [
            'Pipelines suffer from structural, data, and control hazards.',
            'Operand forwarding resolves data dependencies without stalling.',
            'Branch prediction mitigates control hazard penalties.'
          ],
          theoryQuestions: [
            {
              question: 'Explain the three types of pipeline hazards (structural, data, and control) and their hardware/software solutions.',
              marks: '7 Marks',
              answer: 'Three types of hazards:\n1. **Structural Hazard (Resource Conflict):** Occurs when hardware cannot support all possible combinations of instructions simultaneously (e.g., single memory port for both instruction fetch and operand read).\n   - *Solution:* Separate Harvard caches (Instruction cache and Data cache).\n2. **Data Hazard (Data Dependency):** Occurs when an instruction depends on the result of an earlier instruction that is still in the pipeline (Read-After-Write RAW hazard).\n   - *Solution:* Hardware Operand Forwarding (bypassing) and compiler NOP insertion.\n3. **Control Hazard (Branch Penalty):** Occurs when a branch instruction changes the PC, requiring the pipeline to flush incorrectly prefetched instructions.\n   - *Solution:* Static/dynamic branch prediction, Branch Target Buffer (BTB), and delayed branching.',
              keyPoints: [
                'Detailed breakdown of all 3 hazards.',
                'Concrete hardware solutions for each hazard.',
                'Explanation of RAW dependency.'
              ]
            }
          ],
          mcqs: [
            {
              question: 'Which technique resolves data dependency hazards by routing ALU results directly to the next instruction without waiting for write-back?',
              options: ['Branch prediction', 'Operand forwarding (bypassing)', 'Harvard caching', 'Instruction prefetching'],
              correctIndex: 1,
              explanation: 'Operand forwarding routes the output of the ALU directly to the ALU inputs for the next instruction.'
            },
            {
              question: 'What type of cache architecture prevents structural pipeline hazards between instruction fetch and data read?',
              options: ['Unified cache', 'Harvard architecture (Separate Instruction & Data caches)', 'Direct mapped cache', 'Virtual memory'],
              correctIndex: 1,
              explanation: 'Harvard architecture provides independent physical caches for instructions and data, allowing simultaneous fetch and operand access.'
            }
          ]
        },

        // ── TOPIC 22: MEMORY HIERARCHY, CACHE & DMA ──
        {
          id: 'memory-hierarchy-cache-dma',
          title: 'Memory Hierarchy, Cache Mapping & Direct Memory Access (DMA)',
          simpleExplanation: 'Memory is organized hierarchically by speed and cost. DMA allows high-speed I/O devices to transfer data directly to RAM without burdening the CPU.',
          detailedExplanation: `## Memory Hierarchy, Cache Mapping & DMA

### 1. Memory Hierarchy Pyramid
\`\`\`mermaid
flowchart TD
    subgraph Pyramid["Memory Hierarchy (Fastest/Costliest to Slowest/Cheapest)"]
        REG["1. CPU Registers (< 1 ns, Bytes)"]
        L1["2. Cache Memory - L1, L2, L3 (1 - 10 ns, Megabytes)"]
        RAM["3. Main Memory - DRAM (50 - 100 ns, Gigabytes)"]
        SSD["4. Secondary Storage - SSD/HDD (0.1 - 10 ms, Terabytes)"]
        TAPE["5. Tertiary Storage - Magnetic Tape / Cloud Archive (Seconds, Petabytes)"]
    end

    REG --> L1 --> RAM --> SSD --> TAPE
\`\`\`

### 2. Cache Memory Mapping Techniques:
- **Direct Mapping:** Each block of main memory maps to exactly one fixed cache line: $\\text{Line} = \\text{Block} \\pmod{\\text{Lines}}$. Fast but suffers from conflict misses.
- **Associative Mapping:** A memory block can be placed in **any** cache line. Tag search is done in parallel using associative content-addressable memory. Zero conflict misses, but hardware is expensive.
- **Set-Associative Mapping:** Compromise. Cache is divided into sets of $k$ lines (e.g., 2-way or 4-way). A block maps to a specific set, but can be placed in any line within that set.

### 3. Direct Memory Access (DMA) Controller Architecture
\`\`\`mermaid
flowchart TD
    CPU["CPU"] <-->|"Bus Request (BR) / Bus Grant (BG)"| DMA["DMA Controller\n(Address Reg, Word Count Reg, Control)"]
    DMA <-->|"Direct Memory Transfer (No CPU overhead!)"| RAM["Main Memory (RAM)"]
    DEV["High-Speed I/O Device\n(Disk Drive / Network Card)"] <-->|"DMA Request / Ack"| DMA
\`\`\`

### DMA Transfer Modes:
1. **Burst Transfer:** DMA takes full control of bus and transfers the entire block of data continuously.
2. **Cycle Stealing:** DMA takes control of the bus for **one single memory cycle** during an internal CPU phase, transfering one word without stopping the CPU.`,
          shortNotes: 'Memory hierarchy: Registers > Cache > RAM > Secondary. Cache mapping: Direct, Associative, Set-Associative. DMA transfers data between I/O and RAM with Burst or Cycle Stealing modes.',
          examples: [
            {
              title: 'Cache Hit Ratio Calculation',
              code: 'Hits = 90, Misses = 10\nHit Ratio H = 90 / (90 + 10) = 0.90 (90%)\nAccess time = H * Tc + (1 - H) * Tm',
              explanation: 'Effective memory access time drops drastically with high hit ratio.'
            }
          ],
          keyPoints: [
            'Registers and Cache are fastest; secondary storage provides largest capacity.',
            'Set-associative cache balances hardware cost with hit ratio.',
            'DMA eliminates CPU bottleneck during bulk disk/network transfers.'
          ],
          theoryQuestions: [
            {
              question: 'Explain Direct Memory Access (DMA) with a block diagram. Differentiate between Burst Transfer and Cycle Stealing.',
              marks: '7 Marks',
              answer: 'DMA allows high-speed peripherals (disks, network cards) to transfer data directly to/from memory without routing through the CPU.\n\n**Operation:**\n1. Device asserts DMA Request ($DMARQ$).\n2. DMA Controller asserts Bus Request ($BR$) to the CPU.\n3. CPU finishes current clock cycle, puts its address and data buses in High-Z state, and asserts Bus Grant ($BG$).\n4. DMA Controller transfers data directly to/from RAM, updating its Address Register and decrementing Word Count Register.\n5. Once Word Count reaches 0, DMA sends an interrupt to the CPU and relinquishes the bus.\n\n**Transfer Modes:**\n- **Burst Transfer:** A continuous block of data is transferred in one contiguous burst while the CPU is paused.\n- **Cycle Stealing:** DMA transfers one word at a time by "stealing" a bus cycle when the CPU is performing internal operations, causing zero CPU downtime.',
              keyPoints: [
                'DMA block diagram with CPU, Memory, and Device.',
                'Step-by-step handshake (BR, BG).',
                'Burst transfer vs Cycle Stealing differentiation.'
              ]
            }
          ],
          mcqs: [
            {
              question: 'Which cache mapping technique allows a memory block to be placed in ANY available cache line?',
              options: ['Direct mapping', 'Associative mapping', 'Set-associative mapping', 'Paging'],
              correctIndex: 1,
              explanation: 'Fully associative mapping allows blocks to reside in any cache line, with parallel tag matching.'
            },
            {
              question: 'In DMA Cycle Stealing mode, how much data is transferred per bus acquisition?',
              options: ['Entire file', 'Entire block of 4KB', 'Exactly one memory word', 'Half of memory capacity'],
              correctIndex: 2,
              explanation: 'Cycle stealing takes control of the memory bus for exactly one clock/memory cycle to transfer one word.'
            }
          ]
        }
      ]
    }
  ]
};
