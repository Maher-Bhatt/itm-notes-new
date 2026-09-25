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
    }
  ]
};
