import { Subject } from './types';

export const computerArchitecture: Subject = {
  id: "ca-101",
  name: "Computer Architecture",
  code: "CS401",
  semester: 4,
  description: "Computer Architecture and Organization (MST Survival Notes)",
  color: "bg-blue-500",
  icon: "cpu",
  units: [
    {
      id: "ca-u1",
      title: "Register Transfer and Micro-operations",
      description: "RTL, common bus, arithmetic / logic / shift micro-operations, ALU",
      topics: [
        {
          id: "ca-t1",
          title: "Register Transfer Language (RTL)",
          simpleExplanation: "RTL is a symbolic notation used to describe the micro-operations of a digital system.",
          detailedExplanation: "RTL describes which register gets which data under which condition. For example, R2 ← R1 means the content of R1 is copied to R2. P: R2 ← R1 means the transfer happens only if control function P = 1.",
          shortNotes: "RTL = Symbolic notation for micro-operations.\nExample: R2 ← R1",
          keyPoints: [
            "RTL describes micro-operations precisely and briefly.",
            "Arrow ← means transfer (destination on left).",
            "Colon : separates a control condition from the operation."
          ],
          examples: [
            {
              title: "Simple Transfer",
              problem: "Transfer R1 to R2",
              explanation: "The value of R1 is copied to R2.",
              code: "R2 ← R1"
            }
          ],
          mcqs: [
            {
              question: "What does P: R2 ← R1 mean?",
              options: [
                "Transfer R1 to R2 unconditionally",
                "Transfer R1 to R2 only if P=1",
                "Transfer R2 to R1",
                "Load P into R2"
              ],
              correctIndex: 1,
              explanation: "The colon separates the control condition (P) from the operation."
            }
          ]
        },
        {
          id: "ca-t2",
          title: "Common Bus System",
          simpleExplanation: "Instead of wiring every register to every other, all registers share one set of lines called the bus.",
          detailedExplanation: "Only one register may put data on the bus at a time. A multiplexer per bit line (e.g., 4x1 for four registers) selects the source register using select lines. The destination register loads the bus value when its LD input = 1 at the clock edge.",
          shortNotes: "Common Bus = Shared wires for all registers. Avoids O(N^2) wiring.",
          keyPoints: [
            "Only one register drives the bus at a time.",
            "Multiplexers or tri-state buffers select the source.",
            "n registers need log2(n) select lines."
          ],
          examples: [],
          mcqs: []
        }
      ]
    },
    {
      id: "ca-u2",
      title: "Basic Computer Organization and Design",
      description: "instruction codes, registers, formats, control, instruction cycle, interrupts",
      topics: [
        {
          id: "ca-t3",
          title: "Instruction Formats",
          simpleExplanation: "A binary code that specifies a sequence of micro-operations.",
          detailedExplanation: "The basic computer uses a 16-bit format: 1 bit for Mode (I), 3 bits for Opcode, and 12 bits for Address.",
          shortNotes: "16-bit instruction: Bit 15 = I (Mode), 14-12 = Opcode, 11-0 = Address.",
          keyPoints: [
            "Memory-reference instructions use the address field.",
            "Register-reference instructions have opcode 111 and I=0.",
            "Input-output instructions have opcode 111 and I=1."
          ],
          examples: [],
          mcqs: []
        }
      ]
    },
    {
      id: "ca-u3",
      title: "Programming the Basic Computer",
      description: "machine and assembly language, assembler, loops, subroutines",
      topics: []
    },
    {
      id: "ca-u4",
      title: "Microprogrammed Control",
      description: "control memory, address sequencing, microinstruction format",
      topics: []
    },
    {
      id: "ca-u5",
      title: "Central Processing Unit (CPU)",
      description: "general registers, stack, addressing modes, RISC vs CISC",
      topics: []
    },
    {
      id: "ca-u6",
      title: "Computer Arithmetic (Deep Research Notes)",
      description: "Adders, Booth's Algorithm, Array Multipliers, Division, and IEEE 754 Floating Point.",
      topics: [
        {
          id: "ca-arith-1",
          title: "Carry Look-ahead Adder",
          simpleExplanation: "A fast adder that calculates carry signals in advance based on inputs, reducing the ripple delay.",
          detailedExplanation: "In a standard Ripple Carry Adder, the carry output of each full adder is connected to the carry input of the next. This creates a **carry propagation delay**. \n\nThe Carry Look-ahead Adder (CLA) solves this by using logic gates to look at lower-order bits and instantly decide if a carry will be generated. It uses two functions:\n- **Carry Generate ($G_i = A_i \\cdot B_i$)**: A carry is generated if both inputs are 1.\n- **Carry Propagate ($P_i = A_i \\oplus B_i$)**: A carry is propagated if at least one input is 1.\n\nEquations:\n$C_{i+1} = G_i + (P_i \\cdot C_i)$",
          shortNotes: "CLA reduces delay. Generate G = AB, Propagate P = A XOR B.",
          keyPoints: ["Removes ripple carry delay", "Calculates all carries simultaneously", "Uses Generate (G) and Propagate (P) functions"],
          examples: [],
          mcqs: [
            { question: "What is the formula for Carry Generate ($G_i$)?", options: ["A + B", "A XOR B", "A AND B", "A OR B"], correctIndex: 2, explanation: "Generate means a carry is absolutely created, which only happens if both bits are 1 (A AND B)." }
          ]
        },
        {
          id: "ca-arith-2",
          title: "Booth's Algorithm (Signed Multiplication)",
          simpleExplanation: "An algorithm that multiplies two signed binary numbers in 2's complement notation by detecting patterns of 1s and 0s.",
          detailedExplanation: "Booth's algorithm looks at two adjacent bits of the multiplier ($Q_0$ and $Q_{-1}$). \n\n### Rules:\n1. If $Q_0, Q_{-1} = 01$: Add Multiplicand ($M$) to Accumulator ($A$).\n2. If $Q_0, Q_{-1} = 10$: Subtract Multiplicand ($M$) from Accumulator ($A$).\n3. If $Q_0, Q_{-1} = 00$ or $11$: Do nothing (just shift).\n4. ALWAYS perform an **Arithmetic Shift Right (ASR)** on the combined register $AQ Q_{-1}$.\n\nThis algorithm is highly efficient for strings of 1s (like `001110`), as it replaces multiple additions with one subtraction and one addition.",
          shortNotes: "01 -> A = A + M. 10 -> A = A - M. 00/11 -> Shift only. Always Arithmetic Shift Right.",
          keyPoints: ["Works for signed 2's complement numbers", "Examines 2 bits at a time", "Reduces number of additions required"],
          examples: [
            {
              title: "Multiply (-7) x (3)",
              problem: "Use Booth's to multiply M = 1001 (-7) and Q = 0011 (3)",
              explanation: "Booth's algorithm shifts and conditionally adds/subtracts, keeping track of the sign bit throughout the Arithmetic Shift Right. Final result is -21 (1110 1011)."
            }
          ],
          mcqs: [
            { question: "In Booth's Algorithm, what happens if the bits are 10?", options: ["Shift only", "Add M", "Subtract M", "Halt"], correctIndex: 2, explanation: "10 means transitioning into a block of 1s, so we subtract M." }
          ]
        },
        {
          id: "ca-arith-3",
          title: "IEEE 754 Floating Point Representation",
          simpleExplanation: "The standard way computers store floating point (decimal) numbers, using a Sign, Exponent, and Mantissa.",
          detailedExplanation: "Floating point numbers are stored in three fields: $ (-1)^S \\times 1.M \\times 2^{E - Bias} $\n\n### Single Precision (32-bit)\n- **Sign (S)**: 1 bit (0 for positive, 1 for negative)\n- **Biased Exponent (E)**: 8 bits (Bias = 127)\n- **Mantissa (M)**: 23 bits (normalized, so the leading '1.' is implicit)\n\n### Double Precision (64-bit)\n- **Sign**: 1 bit\n- **Biased Exponent**: 11 bits (Bias = 1023)\n- **Mantissa**: 52 bits",
          shortNotes: "Single: 1-bit sign, 8-bit exp (bias 127), 23-bit mantissa.\nDouble: 1-bit sign, 11-bit exp (bias 1023), 52-bit mantissa.",
          keyPoints: ["Bias allows exponents to be treated as unsigned numbers", "Mantissa is normalized (starts with 1.)", "Single precision = 32 bits total"],
          examples: [
            {
              title: "Converting to IEEE 754 Single Precision",
              problem: "Represent 1234.125 in Single Precision",
              explanation: "1. Convert to binary: 10011010010.001 \n2. Normalize: 1.0011010010001 x 2^10 \n3. Exponent = 10 + 127 = 137 (10001001) \n4. Mantissa = 00110100100010000000000"
            }
          ],
          mcqs: []
        }
      ]
    }
  ]
};
