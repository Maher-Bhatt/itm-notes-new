### Unit-3 Programming the Basic Computer

**Computer Organization & Architecture (COA)**

### 

**Looping**

**Outline**

**Machine Language**

**Assembly Language**

**Assembler**

**Program loops**

**Programming Arithmetic and Logic operations**

**Subroutines**

**I-O Programming**

### Machine Language

- Section - 1

### Categories of programs

- Binary code
  - This is a sequence of instructions and operands in binary that list the exact representation of instructions as they appear in computer memory.

| Location | Instruction Code |  |  |  |
|---|---|---|---|---|
| 0 | 0010 | 0000 | 0000 | 0100 |
| 1 | 0001 | 0000 | 0000 | 0101 |
| 10 | 0011 | 0000 | 0000 | 0110 |
| 11 | 0111 | 0000 | 0000 | 0001 |
| 100 | 0000 | 0000 | 0101 | 0011 |
| 101 | 1111 | 1111 | 1110 | 1001 |
| 110 | 0000 | 0000 | 0000 | 0000 |

- Octal or hexadecimal code
  - This is an equivalent translation of the binary code to octal or hexadecimal representation.

| Location | Instruction |
|---|---|
| 000 | 2004 |
| 001 | 1005 |
| 002 | 3006 |
| 003 | 7001 |
| 004 | 0053 |
| 005 | FFE9 |
| 006 | 0000 |

### Categories of programs (cont.)

- Symbolic code
  - The user employs symbols (letters, numerals, or special characters) for the operation part, the address part, and other parts of the instruction code.
  - Each symbolic instruction can be translated into one binary coded instruction by a special program called an assembler and language is referred to as an assembly language program.

| Location | Instruction | Comment |
|---|---|---|
| 000 | LDA 004 | Load first operand into AC |
| 001 | ADD 005 | Add second operand to AC |
| 002 | STA 006 | Store sum in location 006 |
| 003 | HLT | Halt computer |
| 004 | 0053 | First operand |
| 005 | FFE9 | Second operand (negative) |
| 006 | 0000 | Store sum here |

- High-level programming languages
  - These are special languages developed to reflect the procedures used in the solution of a problem rather than be concerned with the computer hardware behavior. E.g. Fortran, C++, Java, etc.
  - The program is written in a sequence of statements in a form that people prefer to think in when solving a problem.
  - However, each statement must be translated into a sequence of binary instructions before the program can be executed in a computer.

**INTEGER A, B, C**

**DATA A, 83 B,-23**

**C = A + B**

**END**

### Assembly Language

- Section - 2

### Pseudo Instruction

- A pseudo instruction is not a machine instruction but rather an instruction to the assembler giving information about some phase of the translation.

| Symbol | Information for the Assembler |
|---|---|
| ORG N | Hexadecimal number N is the memory location for the instruction or operand listed in the following line. |
| END | Denotes the end of symbolic program. |
| DEC N | Signed decimal number N to be converted to binary. |
| HEX N | Hexadecimal number N to be converted to binary |

### Assembler

- Section - 3

### Assembler (cont.)

- An assembler is a program that accepts a symbolic language program and produces its binary machine language equivalent.
- The input symbolic program is called the source program and the resulting binary program is called the object program.
- The assembler is a program that operates on character strings and produces an equivalent binary interpretation.

### A.L.P. to subtract 2 numbers

| Location |  | Instruction |
|---|---|---|
|  |  | ORG 100 |
| 100 |  | LDA SUB |
| 101 |  | CMA |
| 102 |  | INC |
| 103 |  | ADD MIN |
| 104 |  | STA DIF |
| 105 |  | HLT |
| 106 | MIN, | DEC 83 |
| 107 | SUB, | DEC -23 |
| 108 | DIF, | HEX 0 |
|  |  | END |

| Symbol | Location |
|---|---|
| MIN | 106 |
| SUB | 107 |
| DIF | 108 |

### First Pass of an assembler

- LC ← 0
- Scan next line of code
- Label
- Store address in symbol table together with value of LC
- Increment LC
- Set LC
- ORG
- END
- Go to second pass
- First pass
- no
- no
- no
- yes
- yes
- yes

### Second Pass

- LC ← 0
- Scan next line of code
- Pseudo-instruction
- Store binary equivalent of instruction in location given by LC
- Increment LC
- Set LC
- ORG
- END
- Second pass
- Yes
- No
- No
- No
- Yes
- Yes
- Done
- Convert operand to binary and store in location given by LC
- MRI
- No
- Valid non-MRI instruction
- Get operation code and set bits 2-4
- Search address-symbol table for binary equivalent of symbolic address and set bits 5-16
- I
- Set first bit to 1
- Set first bit to 0
- Yes
- No
- Assemble all parts of binary instruction and store in location given by LC
- Yes
- Error in line of code
- No
- Yes
- DEC or HEX

**of an assembler**

### Program loops

- Section - 4

### Program Loops

- A program loop is a sequence of instructions that are executed many times, each time with a different set of data.
- A system program that translates a program written in a high-level programming language to a machine language program is called a compiler.

### A.L.P. to add 100 numbers

**ORG 100**

**/Origin of program is HEX 100**

**LDA ADS**

**/Load first address of operands**

**STA PTR**

**/Store in pointer**

**LDA NBR**

**/Load minus 100**

**STA CTR**

**/Store in counter**

**LOP,**

**CLA**

**/Clear accumulator**

**ADD PTR I**

**/Add an operand to AC**

**ISZ PTR**

**/Increment pointer**

**ISZ CTR**

**/Increment counter**

**BUN LOP**

**/Repeat loop again**

**STA SUM**

**/Store sum**

**HLT**

**/Halt**

**ADS,**

**HEX 150**

**/First address of operands**

**PTR,**

**HEX 0**

**/This location reserved for pointer**

**NBR,**

**DEC -100**

**/Constant to initialized counter**

**CTR,**

**HEX 0**

**/This location reserved for a counter**

**SUM,**

**HEX 0**

**/Sum is store here**

**ORG 150**

**/Origin of operands is HEX 150**

**DEC 75**

**/First operand**

**118**

**DEC 23**

**/Last operand**

**119**

**END**

**/End of symbolic program**

**.**

**.**

**.**

### A.L.P. to clear the contents of hex locations 500 to 5FF with 0

**ORG 100**

**/Origin of program is HEX 100**

**LDA ADS**

**/Load first address of operands**

**STA PTR**

**/Store in pointer**

**LDA NBR**

**/Load minus 255**

**STA CTR**

**/Store in counter**

**LOP,**

**CLA**

**/Clear accumulator**

**STA PTR I**

**/Store zero to location pointed by PTR**

**ISZ PTR**

**/Increment pointer**

**ISZ CTR**

**/Increment counter**

**BUN LOP**

**/Repeat loop again**

**HLT**

**/Halt**

**ADS,**

**HEX 500**

**/First address of operands**

**PTR,**

**HEX 0**

**/This location reserved for pointer**

**NBR,**

**DEC -255**

**/Constant to initialized counter**

**CTR,**

**HEX 0**

**/This location reserved for a counter**

**END**

**/End of symbolic program**

### Programming Arithmetic and Logic operations

- Section - 5

### A.L.P. to Add Two Double-Precision Numbers

**ORG 100**

**/Origin of program is HEX 100**

**LDA AL**

**/Load A low**

**ADD BL**

**/Add B low, carry in E**

**STA CL**

**/Store in C low**

**CLA**

**/Clear AC**

**CIL**

**/Circulate to bring carry into AC(16)**

**ADD AH**

**/Add A high and carry**

**ADD BH**

**/Add B high**

**STA CH**

**/Store in C high**

**HLT**

**/Halt**

### Subroutines

- Section - 6

### Subroutine with example

**ORG 100**

**100**

**LDA X**

**101**

**BSA SH4**

**102**

**STA X**

**103**

**LDA Y**

**104**

**BSA SH4**

**105**

**STA Y**

**106**

**HLT**

**107**

**HEX 1234**

**X,**

**108**

**HEX 4321**

**Y,**

**109**

**HEX 0**

**10A**

**CIL**

**10B**

**CIL**

**10C**

**CIL**

**10D**

**CIL**

**10E**

**AND MSK**

**10F**

**BUN SH4 I**

**110**

**HEX FFF0**

**MSK,**

**END**

**SH4,**

- A set of common instructions that can be used in a program many times is called a subroutine.
- Each time that a subroutine is used in the main part of the program, a branch is executed to the beginning of the subroutine.
- After the subroutine has been executed, a branch is made back to the main program.
- A subroutine consists of a self contained sequence of instructions that carries a given task.

### I-O Programming

- Section - 7

### A.L.P. to input one character & output one character

**ORG 100**

**/Origin of program is HEX 100**

**SKI**

**/Check input flag**

**BUN CIF**

**/Flag = 0, branch to check again**

**INP**

**/Flag = 1, input character**

**OUT**

**/Print character**

**CHR,**

**STA CHR**

**/Store character**

**HLT**

**-**

**/Store character here**

**END**

**CIF,**

**ORG 100**

**/Origin of program is HEX 100**

**LDA CHR**

**/Load character into AC**

**SKO**

**/Check output flag**

**BUN COF**

**/Flag = 0, branch to check again**

**OUT**

**/Flag = 1, output character**

**CHR,**

**HLT**

**HEX 0057**

**/Character is “W”**

**END**

**COF,**

**Input Program**

**Output Program**
