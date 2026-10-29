import { Subject } from './types';

export const sem6CdMaster: Subject = {
  id: "sem6-cd",
  name: "Compiler Design & Language Translation",
  code: "CD601",
  color: "bg-indigo-600",
  icon: "cpu",
  description: "Comprehensive University Syllabus for Compiler Design — Lexical Analysis (Flex/Lex, DFA Tokenization), Syntax Analysis (LL(1) First & Follow, LR(0), SLR, LALR, CLR), Syntax-Directed Translation (SDT, S-Attributed vs L-Attributed), Intermediate Code Generation (Three-Address Code, DAG, Quadruples), Runtime Storage Management, and Code Optimization (Common Subexpression Elimination, Loop Invariant Code Motion).",
  semester: 6,
  units: [
    {
      id: "cd-u1",
      title: "Unit 1: Lexical Analysis & Compiler Architecture",
      description: "Phases of a compiler, Front-End vs Back-End, Lexical Analyzer generation, regular expressions to DFA (Thomson's Construction, Subset Construction), and Lex/Flex tooling.",
      topics: [
        {
          id: "cd-u1-t1",
          title: "Compiler Phases Pipeline, Lexical Tokenization, and DFA State Minimization",
          simpleExplanation: "A compiler translates high-level source code into target machine code through 6 coordinated phases: Lexical Analysis, Syntax Analysis, Semantic Analysis, Intermediate Code Generation, Code Optimization, and Target Code Generation. The Lexical Analyzer groups raw characters into meaningful units called Tokens (such as identifiers, keywords, and operators) using Deterministic Finite Automata (DFA).",
          detailedExplanation: `## 1. Compiler Architecture Pipeline

\`\`\`mermaid
flowchart TD
    SRC["Source Code: position = initial + rate * 60"] --> P1["1. Lexical Analyzer (Scanner)\nStream of Tokens: <id,1> <=> <id,2> <+> <id,3> <*> <num,60>"]
    P1 --> P2["2. Syntax Analyzer (Parser)\nAbstract Syntax Tree (AST)"]
    P2 --> P3["3. Semantic Analyzer (Type Checking)\nDecorated AST with int-to-float conversions"]
    P3 --> P4["4. Intermediate Code Generator (ICG)\nThree-Address Code (TAC): t1 = inttofloat(60)..."]
    P4 --> P5["5. Machine-Independent Code Optimizer\nt1 = id3 * 60.0; id1 = id2 + t1"]
    P5 --> P6["6. Target Code Generator & Allocator\nAssembly / Machine Code: LDF R2, id3; MULF R2, #60.0..."]
    
    SYM[("Symbol Table\nIdentifiers, Types, Scopes")] --- P1 & P2 & P3 & P4 & P5 & P6
    ERR["Error Handler\nLexical, Syntax, Type Errors"] --- P1 & P2 & P3 & P4 & P5 & P6
\`\`\`

---

## 2. Tokens, Patterns, and Lexemes
- **Token**: Abstract symbol category recognized by the compiler (e.g., \`ID\`, \`ASSIGN\`, \`NUM\`, \`IF\`).
- **Lexeme**: The exact character sequence in source code matching a token pattern (e.g., \`counter\`, \`=\`, \`3.1415\`, \`if\`).
- **Pattern**: The formal grammar rule (typically a Regular Expression) governing valid lexemes.

---

## 3. DFA State Minimization (Hopcroft's Partitioning Algorithm)
1. Initialize two groups: $P_0 = \{F, S \setminus F\}$ where $F$ is the set of accepting states and $S \setminus F$ are non-accepting states.
2. For each group $G$ and each alphabet symbol $a \in \Sigma$, check if $\delta(s, a)$ leads to different partitions.
3. If states split into different partitions, subdivide $G$.
4. Repeat until partition set stabilizes ($P_{k+1} = P_k$).`,
          shortNotes: "Compiler front-end analyzes source (Lexical, Syntax, Semantic); back-end generates target code (ICG, Optimizer, Code Gen). Tokens are categorized lexemes recognized via DFAs.",
          examples: [
            {
              title: "Lex / Flex Scanner Specification for C Language Tokens",
              problem: "Write a Flex specification to tokenize C identifiers, integers, and arithmetic operators while counting line numbers.",
              explanation: "Flex rules map regex patterns to C token return actions.",
              code: `%{
#include <stdio.h>
int line_num = 1;
%}

DIGIT       [0-9]
LETTER      [a-zA-Z_]
ID          {LETTER}({LETTER}|{DIGIT})*
INT_LITERAL {DIGIT}+
WS          [ \\t]+

%%
"\\n"            { line_num++; }
{WS}            { /* discard whitespace */ }
"if"|"else"|"while"|"int"|"return" { printf("KEYWORD: %s at line %d\\n", yytext, line_num); }
{ID}            { printf("IDENTIFIER: %s at line %d\\n", yytext, line_num); }
{INT_LITERAL}   { printf("INTEGER: %s at line %d\\n", yytext, line_num); }
"+"|"-"|"*"|"/" { printf("OPERATOR: %s\\n", yytext); }
"="             { printf("ASSIGNMENT\\n"); }
";"             { printf("SEMICOLON\\n"); }
.               { printf("LEXICAL ERROR: Unrecognized character '%s' at line %d\\n", yytext, line_num); }
%%

int main() {
    yylex();
    return 0;
}`
            }
          ],
          keyPoints: [
            "Lexical analysis transforms raw characters into token streams and populates the symbol table.",
            "Regular expressions are converted to NFA via Thompson's Construction, then to DFA via Subset Construction.",
            "DFA minimization guarantees the smallest possible state count and fastest execution speed.",
            "Symbol table tracks identifier name, type, memory offset, scope level, and line declaration."
          ],
          theoryQuestions: [
            {
              question: "Differentiate between compiler Front-End and Back-End with an architectural diagram.",
              marks: "7 Marks",
              answer: "The Front-End is language-dependent and machine-independent (Lexical, Syntax, Semantic Analysis). It generates an intermediate representation (IR). The Back-End is machine-dependent (Code Optimization, Target Code Generation, Register Allocation). This separation enables retargetable compilers: N front-ends and M back-ends require only N + M modules instead of N * M."
            },
            {
              question: "Explain the role of the Symbol Table across all compiler phases.",
              marks: "5 Marks",
              answer: "The symbol table is a central hash table or tree structure tracking identifier attributes: name, type (int, float, array, struct), memory offset, scope depth, and line number. Created during lexical analysis, enriched with types during semantic analysis, and accessed during code generation for variable memory locations."
            }
          ],
          mcqs: [
            {
              question: "Which phase of the compiler is responsible for checking type compatibility across expressions?",
              options: ["Lexical Analyzer", "Syntax Analyzer", "Semantic Analyzer", "Code Optimizer"],
              correctIndex: 2,
              explanation: "Semantic Analysis enforces contextual rules, including type checking, array bounds, and identifier declaration checks."
            },
            {
              question: "What is the worst-case time complexity of converting a regular expression to an equivalent DFA?",
              options: ["O(N)", "O(N log N)", "O(N^2)", "O(2^N)"],
              correctIndex: 3,
              explanation: "In the worst case, subset construction can generate up to 2^N states for an N-state NFA."
            }
          ]
        }
      ]
    },
    {
      id: "cd-u2",
      title: "Unit 2: Syntax Analysis & Parsing Algorithms",
      description: "Context-Free Grammars, Ambiguity removal, Left Recursion elimination, Left Factoring, LL(1) Parsers, LR(0), SLR(1), LALR(1), and CLR(1) Parsing.",
      topics: [
        {
          id: "cd-u2-t1",
          title: "LL(1) Predictive Parsing vs LR Bottom-Up Shift-Reduce Parsing (SLR, LALR, CLR)",
          simpleExplanation: "Parsers verify whether a sequence of tokens follows the grammatical rules of the programming language. Top-Down parsers (LL(1)) construct parse trees from the start symbol down to the leaves using First and Follow sets. Bottom-Up parsers (LR) start from the token leaves and reduce them toward the start symbol using shift and reduce actions with a stack.",
          detailedExplanation: `## 1. Top-Down vs Bottom-Up Parsing Hierarchy

\`\`\`mermaid
flowchart TD
    PARSER["Parsing Algorithms"] --> TD["Top-Down Parsers (LL)"]
    PARSER --> BU["Bottom-Up Parsers (LR)"]
    
    TD --> LL1["LL(1): Left-to-right, Leftmost derivation, 1-token lookahead"]
    TD --> RD["Recursive Descent (with Backtracking)"]
    
    BU --> LR0["LR(0): Weakest, no lookahead"]
    BU --> SLR1["SLR(1): Uses Follow sets for reduce"]
    BU --> LALR1["LALR(1): Merges LR(1) core states (Yacc/Bison)"]
    BU --> CLR1["CLR(1): Canonical LR with exact lookaheads (Most Powerful)"]
\`\`\`

---

## 2. LL(1) Grammar Conditions
A Context-Free Grammar $G$ is LL(1) if and only if:
1. It contains **no left recursion** ($A \to A\alpha$).
2. It is **left-factored** (no $A \to \alpha\beta_1 \mid \alpha\beta_2$).
3. For every non-terminal $A$ with productions $A \to \alpha \mid \beta$:
   - $\text{FIRST}(\alpha) \cap \text{FIRST}(\beta) = \emptyset$.
   - If $\epsilon \in \text{FIRST}(\alpha)$, then $\text{FIRST}(\beta) \cap \text{FOLLOW}(A) = \emptyset$.

---

## 3. LR Parsing Table Conflicts
- **Shift/Reduce Conflict**: Parser cannot decide whether to shift the incoming token or reduce the handle on stack.
- **Reduce/Reduce Conflict**: Parser cannot decide which of two distinct production rules should be used to reduce the handle on stack.`,
          shortNotes: "LL(1) is top-down non-backtracking; LR is bottom-up shift-reduce. Power ordering: LR(0) < SLR(1) < LALR(1) < CLR(1). LALR(1) is the standard engine for Yacc/Bison.",
          examples: [
            {
              title: "Eliminating Left Recursion and Left Factoring in CFG",
              problem: "Eliminate immediate left recursion from grammar: E -> E + T | T, T -> T * F | F.",
              explanation: "Replace left recursive rules A -> A alpha | beta with A -> beta A' and A' -> alpha A' | epsilon.",
              code: `/* ORIGINAL GRAMMAR (LEFT RECURSIVE):
 * E -> E + T | T
 * T -> T * F | F
 * F -> ( E ) | id
 */

/* TRANSFORMED LL(1) COMPLIANT GRAMMAR: */
E  -> T E'
E' -> + T E' | ε
T  -> F T'
T' -> * F T' | ε
F  -> ( E ) | id`
            }
          ],
          keyPoints: [
            "Left recursion causes infinite loops in top-down recursive descent parsers.",
            "FIRST set of a string is the set of terminals that begin strings derived from it.",
            "FOLLOW set of non-terminal A is the set of terminals that can appear immediately to the right of A.",
            "CLR(1) has more states than LALR(1); LALR(1) merges states with identical LR(0) cores."
          ],
          theoryQuestions: [
            {
              question: "Compute FIRST and FOLLOW sets for the arithmetic grammar: E -> T E', E' -> + T E' | epsilon, T -> F T', T' -> * F T' | epsilon, F -> ( E ) | id.",
              marks: "7 Marks",
              answer: "FIRST(F) = {(, id}; FIRST(T) = {(, id}; FIRST(E) = {(, id}; FIRST(E') = {+, epsilon}; FIRST(T') = {*, epsilon}. FOLLOW(E) = {$, )}; FOLLOW(E') = {$, )}; FOLLOW(T) = {+, $, )}; FOLLOW(T') = {+, $, )}; FOLLOW(F) = {*, +, $, )}."
            }
          ],
          mcqs: [
            {
              question: "Which parser class is employed by modern parser generators such as Yacc and GNU Bison?",
              options: ["LL(1)", "SLR(1)", "LALR(1)", "Operator Precedence"],
              correctIndex: 2,
              explanation: "Yacc and Bison use LALR(1) parsers because they combine the parsing power of LR(1) with the compact state count of LR(0)."
            }
          ]
        }
      ]
    },
    {
      id: "cd-u3",
      title: "Unit 3: Intermediate Code Generation & Code Optimization",
      description: "Three-Address Code (Quadruples, Triples, Indirect Triples), Syntax-Directed Translation (SDT), DAG representation, Basic Blocks, and Loop Optimization.",
      topics: [
        {
          id: "cd-u3-t1",
          title: "Three-Address Code (TAC), Basic Blocks, Control Flow Graphs, and Loop Invariant Code Motion",
          simpleExplanation: "Intermediate Code Generation translates parsed syntax into an abstract machine format such as Three-Address Code (TAC), where each instruction has at most one operator and two operands. The code optimizer reorganizes basic blocks to reduce execution time and memory footprint without altering program output.",
          detailedExplanation: `## 1. Three-Address Code Formats
Three-Address Code instructions take the form $x = y \text{ op } z$.

Three major representation formats:
1. **Quadruples**: Records with 4 fields: \`(op, arg1, arg2, result)\`. Easy to rearrange during optimization.
2. **Triples**: Records with 3 fields: \`(op, arg1, arg2)\`. Results are referenced by statement index \`(0), (1)\`.
3. **Indirect Triples**: Pointers to an array of triples. Facilitates statement movement without changing pointer references.

---

## 2. Basic Blocks and Control Flow Graph (CFG)
A **Basic Block** is a maximal sequence of consecutive instructions where:
- Control enters only at the first instruction (**Leader**).
- Control leaves the block only at the final instruction, with no branches in between.

### Leader Identification Rules:
1. Instruction 1 is a leader.
2. Any instruction that is the target of a conditional or unconditional jump is a leader.
3. Any instruction immediately following a conditional or unconditional jump is a leader.

---

## 3. Principal Optimization Techniques
- **Common Subexpression Elimination (CSE)**: Eliminate redundant evaluations of previously computed expressions.
- **Copy Propagation**: If $x = y$, substitute $y$ for $x$ in subsequent statements until $x$ or $y$ is reassigned.
- **Dead Code Elimination**: Remove variables and statements whose values are never subsequently used.
- **Loop Invariant Code Motion**: Move loop calculations whose operands do not change outside the loop header.
- **Strength Reduction**: Replace expensive operations with cheaper ones (e.g. $x * 8 \implies x \ll 3$).`,
          shortNotes: "TAC limits operations to one per line. Basic blocks are single-entry single-exit sequences. Optimizations include CSE, Dead Code Elimination, and Loop Invariant Code Motion.",
          examples: [
            {
              title: "Three-Address Code and Quadruple Table Generation",
              problem: "Translate the expression a = b * -c + b * -c into Three-Address Code and Quadruple table.",
              explanation: "Use temporary registers t1, t2, t3 to break expression into atomic operations.",
              code: `// Three-Address Code (TAC):
t1 = uminus c
t2 = b * t1
t3 = uminus c
t4 = b * t3
t5 = t2 + t4
a = t5

// Optimized TAC (via Common Subexpression Elimination):
t1 = uminus c
t2 = b * t1
t5 = t2 + t2
a = t5`
            }
          ],
          keyPoints: [
            "Three-Address Code acts as a universal bridge between language-specific parsing and hardware-specific assembly.",
            "DAGs (Directed Acyclic Graphs) detect common subexpressions within basic blocks automatically.",
            "Strength reduction replaces costly multiplication and division with bit-shifts or additions.",
            "Loop induction variables can be merged to eliminate counter overhead."
          ],
          theoryQuestions: [
            {
              question: "Explain the algorithm to partition Three-Address Code into Basic Blocks and construct a Control Flow Graph.",
              marks: "7 Marks",
              answer: "1. Determine Leaders: first statement is a leader; jump targets are leaders; statements following jumps are leaders. 2. For each leader, its basic block includes all statements up to but not including the next leader or end of program. 3. Construct CFG: Add directed edge B1 -> B2 if B2 can execute immediately after B1 (conditional branch, unconditional jump, or fall-through)."
            }
          ],
          mcqs: [
            {
              question: "Replacing the multiplication 'x = y * 8' with the bitwise shift 'x = y << 3' is an example of which optimization?",
              options: ["Constant Folding", "Strength Reduction", "Loop Unrolling", "Dead Code Elimination"],
              correctIndex: 1,
              explanation: "Strength reduction replaces computationally expensive operations (multiplication) with faster equivalent operations (bitwise shift)."
            }
          ]
        }
      ]
    },
    {
      id: "cd-u4",
      title: "Unit 4: Syntax-Directed Translation (SDT), Type Checking & Runtime Storage",
      description: "Syntax-Directed Definitions (SDD: S-attributed vs L-attributed), Dependency Graphs, Type Systems (Structural vs Name Equivalence), and Runtime Storage Organization (Activation Records, Calling Conventions, Heap Management).",
      topics: [
        {
          id: "cd-u4-t1",
          title: "Syntax-Directed Translation, Type Systems, and Activation Record Stack Layout",
          simpleExplanation: "Parsing only tells you whether code has correct grammar, not what it actually means. Syntax-Directed Translation (SDT) attaches little calculation scripts to grammar rules: as the parser builds the tree, it calculates expressions and checks types on the fly! S-attributed rules compute values from children to parents (bottom-up), while L-attributed rules pass context from left siblings. When your program runs, every time a function is called, the CPU pushes an 'Activation Record' (Stack Frame) containing local variables, return pointers, and registers onto the call stack. Understanding this layout is essential for understanding how recursion works, how stack overflows happen, and how buffer overflows can be exploited.",
          detailedExplanation: `## 1. Syntax-Directed Definitions (SDD) & Attribute Grammars

An SDD associates each grammar symbol with a set of attributes and each production with semantic rules:
- **Synthesized Attributes**: Computed solely from the attribute values of the node's children in the parse tree. Evaluated naturally in bottom-up post-order traversals.
- **Inherited Attributes**: Computed from the attribute values of the node's parent and/or siblings. Passed top-down or left-to-right.

\`\`\`mermaid
flowchart TD
    subgraph SAttributed["S-Attributed Definition (Bottom-Up Synthesized)"]
        E["E.val = 14"]
        E1["E1.val = 10"] --> E
        Plus["+"] --> E
        T["T.val = 4"] --> E
    end
    subgraph LAttributed["L-Attributed Definition (Left-to-Right Dependency)"]
        Decl["D -> T L"]
        T_type["T.type = int"] --> L_in["L.in = int (Inherited from left sibling)"]
    end
\`\`\`

- **S-Attributed Grammar**: Contains exclusively synthesized attributes. Can be evaluated directly during bottom-up LR parsing without building explicit parse trees.
- **L-Attributed Grammar**: An inherited attribute of child $X_j$ in production $A \\to X_1 X_2 \\dots X_n$ can depend only on:
  1. The attributes of symbols $X_1, X_2, \\dots, X_{j-1}$ to its left.
  2. The inherited attributes of parent $A$.
  - Evaluated in a single depth-first, left-to-right traversal during LL parsing.

---

## 2. Runtime Memory Hierarchy & Activation Record (Stack Frame) Layout

When a function executes, the runtime environment allocates an **Activation Record (Stack Frame)** on the call stack:

\`\`\`mermaid
flowchart TD
    subgraph Frame["Activation Record (Stack Frame Layout)"]
        P1["Actual Arguments / Parameters (Passed by Caller)"]
        Ret["Return Address (Instruction pointer after call)"]
        DL["Dynamic Link (Control Link: points to Caller's Frame)"]
        SL["Static Link (Access Link: points to lexical parent frame)"]
        Reg["Saved Machine Registers & State"]
        Local["Local Variables"]
        Temp["Temporary Expression Evaluations & Spill Registers"]
    end
\`\`\`

- **Control Link (Dynamic Link)**: Points to the caller's activation record. Used to restore the stack pointer upon function return.
- **Access Link (Static Link)**: Points to the activation record of the lexically enclosing function. Used in nested languages (Pascal, Python closures) to resolve non-local variables in $O(\\text{depth})$.

---

## 3. Storage Allocation Paradigms

1. **Static Allocation**: Fixed addresses bound at compile time. No recursion possible (e.g., early FORTRAN).
2. **Stack Allocation**: Activation records pushed on call, popped on return (LIFO). Supports recursion.
3. **Heap Allocation**: Unstructured dynamic memory allocation (\`malloc\`, \`new\`). Managed via manual deallocation or automated Garbage Collection (Mark-and-Sweep, Generational GC).`,
          shortNotes: "S-attributed uses only synthesized attributes (bottom-up LR). L-attributed attributes depend on left siblings and parent. Activation records contain parameters, return address, dynamic link, static link, locals, and temps.",
          examples: [
            {
              title: "Python Implementation: Syntax-Directed Translation Evaluator & Stack Frame Tracer",
              problem: "Simulate an SDD evaluating arithmetic expressions while tracing function call activation records and dynamic links.",
              explanation: "Demonstrates S-attributed bottom-up evaluation of expression AST and simulates activation record stack frames with dynamic links.",
              code: `class ActivationRecord:
    def __init__(self, func_name: str, args: dict, dynamic_link=None):
        self.func_name = func_name
        self.args = args
        self.locals = {}
        self.dynamic_link = dynamic_link  # Pointer to caller's frame

    def __repr__(self):
        caller = self.dynamic_link.func_name if self.dynamic_link else "ROOT"
        return f"[Frame: {self.func_name}({self.args}) | Caller={caller} | Locals={self.locals}]"

# Simulate call stack
call_stack = []

def call_function(func_name: str, args: dict):
    caller_frame = call_stack[-1] if call_stack else None
    new_frame = ActivationRecord(func_name, args, dynamic_link=caller_frame)
    call_stack.append(new_frame)
    print(f"PUSH -> {new_frame}")
    return new_frame

def return_function():
    popped = call_stack.pop()
    print(f"POP  <- {popped.func_name} exited. Stack Depth: {len(call_stack)}")

# Simulate recursive factorial execution
print("=== Simulating Activation Record Allocation ===")
f3 = call_function("factorial", {"n": 3})
f3.locals["partial"] = 3
f2 = call_function("factorial", {"n": 2})
f2.locals["partial"] = 2
f1 = call_function("factorial", {"n": 1})
f1.locals["result"] = 1

return_function()
return_function()
return_function()`,
              output: `=== Simulating Activation Record Allocation ===
PUSH -> [Frame: factorial({'n': 3}) | Caller=ROOT | Locals={}]
PUSH -> [Frame: factorial({'n': 2}) | Caller=factorial | Locals={}]
PUSH -> [Frame: factorial({'n': 1}) | Caller=factorial | Locals={}]
POP  <- factorial exited. Stack Depth: 2
POP  <- factorial exited. Stack Depth: 1
POP  <- factorial exited. Stack Depth: 0`
            }
          ],
          keyPoints: [
            "S-attributed definitions use only synthesized attributes and evaluate in bottom-up LR passes.",
            "L-attributed definitions allow inherited attributes that depend solely on left siblings and parents.",
            "Activation records store actual parameters, return address, dynamic link, local variables, and temporaries.",
            "Dynamic link tracks execution call order; Static link tracks lexical scope nesting.",
            "Buffer overflow attacks overwrite the saved return address inside the activation record."
          ],
          theoryQuestions: [
            {
              question: "Differentiate between S-Attributed and L-Attributed Syntax-Directed Definitions (SDDs). How can an S-attributed SDD be evaluated during LR parsing?",
              marks: "5 Marks",
              answer: "1. Definition: An S-attributed SDD involves only synthesized attributes, where the attribute of a parent node is computed solely from its children's attributes. An L-attributed SDD permits both synthesized and inherited attributes, with the restriction that inherited attributes can only depend on attributes of parent nodes or siblings strictly to the left. 2. Parsing Integration: An S-attributed SDD can be evaluated directly during bottom-up LR parsing on the fly. As the parser performs a 'reduce' action for production A -> XYZ, the attributes of X, Y, and Z already sit at known offsets on the parser value stack. The semantic rule computes A.val and replaces the top 3 attribute entries on the stack with A.val without needing an explicit syntax tree. L-attributed SDDs require depth-first left-to-right evaluation."
            }
          ],
          mcqs: [
            {
              question: "In a function's runtime activation record, what is the primary role of the Dynamic Link (Control Link)?",
              options: [
                "It points to the activation record of the calling function to restore the stack pointer upon return",
                "It points to the lexically enclosing scope for variable resolution",
                "It stores the machine instructions of the function",
                "It points to the global heap allocator"
              ],
              correctIndex: 0,
              explanation: "The Dynamic Link (Control Link) points directly to the activation record of the function that called the current subroutine, enabling the runtime to unwind the stack frame upon return."
            }
          ]
        }
      ]
    },
    {
      id: "cd-u5",
      title: "Unit 5: Target Code Generation & Register Allocation",
      description: "Code generation design issues, Directed Acyclic Graph (DAG) representation for Basic Blocks, register allocation (Linear Scan, Graph Coloring), Sethi-Ullman algorithm, and Peephole Optimization.",
      topics: [
        {
          id: "cd-u5-t1",
          title: "DAG Representation for Basic Blocks, Register Allocation, and Peephole Optimization",
          simpleExplanation: "After the compiler optimizes the code and organizes variables, the final step is translating everything into real machine assembly instructions (like x86-64 or ARM). The biggest challenge is that CPU registers are lightning fast but extremely scarce (a CPU has only 16 or 32 registers), while your program might have thousands of variables! Register Allocation uses graph coloring algorithms to assign variables that are used at the same time to different registers, 'spilling' extras to slower RAM only when forced. Finally, Peephole Optimization looks through a tiny sliding window (a 'peephole') of 2 or 3 assembly instructions to spot silly inefficiencies—like storing a number to memory and immediately loading it back into the same register—and eliminates them.",
          detailedExplanation: `## 1. Directed Acyclic Graph (DAG) for Basic Blocks

A DAG provides an efficient internal representation for a basic block:
- **Leaves**: Represent unique initial identifiers or constants.
- **Interior Nodes**: Represent operators, labelled by operator symbols and associated with variable names assigned to that result.

\`\`\`mermaid
flowchart TD
    Plus["+ (t1, a)"] --> B["b"]
    Plus --> C["c"]
    Mult["* (t2, d)"] --> Plus
    Mult --> Plus
\`\`\`

### Optimizations Automated via DAG Construction:
1. **Common Subexpression Elimination**: If an operator node with the same children already exists, attach the new variable label to the existing node rather than creating a duplicate node.
2. **Dead Code Elimination**: Any node with no outward edges and whose labels are not live at the exit of the basic block is deleted.
3. **Algebraic Identity Simplification**: Simplify $x + 0 = x$, $x \\times 1 = x$, and $x \\times 0 = 0$.

---

## 2. Register Allocation via Graph Coloring (Chaitin's Algorithm)

CPUs possess limited physical registers $K$ (e.g., $K = 16$).
1. **Liveness Analysis**: Compute the live ranges of all temporary variables (intervals where a variable holds a value needed in future statements).
2. **Interference Graph $G = (V, E)$**:
   - Vertices $V$: Variables / temporaries.
   - Edges $E$: An undirected edge exists between $u$ and $v$ if their live ranges overlap (they cannot share the same register).
3. **Kempe's K-Coloring Heuristic**:
   - Find a vertex $v$ with degree $< K$.
   - Push $v$ onto the stack and remove it from graph $G$.
   - Repeat until graph is empty.
   - Pop vertices from stack and assign one of $K$ registers (colors) not used by any neighbor.
   - If every remaining vertex has degree $\\ge K$, select a node to **Spill** to memory RAM.

---

## 3. Peephole Optimization Techniques

Peephole optimization examines a sliding window of target machine instructions:
1. **Redundant Load/Store Elimination**:
   \`\`\`assembly
   MOV R0, a
   MOV a, R0     ; REDUNDANT: Eliminate!
   \`\`\`
2. **Unreachable Code Elimination**:
   \`\`\`assembly
   JMP label
   MOV R1, #0    ; UNREACHABLE: Eliminate!
   \`\`\`
3. **Flow of Control Optimization**:
   \`\`\`assembly
   JMP L1
   ...
   L1: JMP L2    ; Can be optimized directly to: JMP L2
   \`\`\`
4. **Strength Reduction & Machine Idioms**:
   - Replace \`MUL R0, #2\` with \`SHL R0, #1\`.
   - Replace \`MOV R0, #0\` with \`XOR R0, R0\` (faster on x86).`,
          shortNotes: "DAG optimizes basic blocks by eliminating common subexpressions. Register allocation uses Chaitin's graph coloring with K colors. Peephole optimization uses a sliding window to eliminate redundant loads/stores and jumps to jumps.",
          examples: [
            {
              title: "Python Implementation: Peephole Optimizer & DAG Common Subexpression Finder",
              problem: "Implement a sliding-window peephole optimizer eliminating redundant store-load sequences and algebraic zeroes.",
              explanation: "Scans assembly instruction tuples and applies peephole transformation rules.",
              code: `def peephole_optimize(instructions: list[str]) -> list[str]:
    optimized = []
    i = 0
    n = len(instructions)

    while i < n:
        # Rule 1: Redundant Store followed by immediate Load of same register/variable
        # e.g., 'MOV [x], R0' followed by 'MOV R0, [x]'
        if i < n - 1:
            curr = instructions[i].split()
            nxt = instructions[i + 1].split()

            if curr[0] == "MOV" and nxt[0] == "MOV":
                dest1, src1 = curr[1].rstrip(','), curr[2]
                dest2, src2 = nxt[1].rstrip(','), nxt[2]
                if dest1 == src2 and src1 == dest2:
                    # Skip the redundant second load
                    optimized.append(instructions[i])
                    print(f"[Peephole] Eliminated redundant load: '{instructions[i+1]}'")
                    i += 2
                    continue

        # Rule 2: Machine Idiom - Replace 'MOV R0, #0' with 'XOR R0, R0'
        parts = instructions[i].split()
        if len(parts) == 3 and parts[0] == "MOV" and parts[2] == "#0":
            reg = parts[1].rstrip(',')
            optimized.append(f"XOR {reg}, {reg}")
            print(f"[Peephole] Optimized '{instructions[i]}' -> 'XOR {reg}, {reg}'")
            i += 1
            continue

        optimized.append(instructions[i])
        i += 1

    return optimized

raw_assembly = [
    "MOV R0, #0",
    "ADD R0, R1",
    "MOV [mem_a], R0",
    "MOV R0, [mem_a]",
    "SUB R2, #1"
]

print("=== Original Machine Code ===")
for line in raw_assembly:
    print(line)

print("\\n=== Peephole Optimization Pass ===")
opt_assembly = peephole_optimize(raw_assembly)

print("\\n=== Final Optimized Assembly ===")
for line in opt_assembly:
    print(line)`,
              output: `=== Original Machine Code ===
MOV R0, #0
ADD R0, R1
MOV [mem_a], R0
MOV R0, [mem_a]
SUB R2, #1

=== Peephole Optimization Pass ===
[Peephole] Optimized 'MOV R0, #0' -> 'XOR R0, R0'
[Peephole] Eliminated redundant load: 'MOV R0, [mem_a]'

=== Final Optimized Assembly ===
XOR R0, R0
ADD R0, R1
MOV [mem_a], R0
SUB R2, #1`
            }
          ],
          keyPoints: [
            "DAGs identify common subexpressions within basic blocks by sharing nodes with identical operand children.",
            "Register allocation maps unbounded variables onto K hardware registers via graph coloring.",
            "Chaitin's heuristic repeatedly prunes nodes with degree < K to color the interference graph.",
            "Variables whose live ranges conflict cannot be assigned the same physical register.",
            "Peephole optimization replaces short instruction sequences with faster machine idioms like XOR for zeroing."
          ],
          theoryQuestions: [
            {
              question: "Explain Register Allocation using Graph Coloring (Chaitin's Algorithm). What steps occur when the graph is not K-colorable?",
              marks: "7 Marks",
              answer: "1. Interference Graph: Construct an undirected graph G=(V, E) where each vertex represents a virtual register/temporary, and an edge connects two vertices if their live ranges overlap. 2. Simplification: If a vertex v has degree < K (where K is available registers), removing v cannot prevent the remaining graph from being colored. Push v onto a stack and remove it from G. Repeat until all vertices have degree < K. 3. Select & Coloring: Pop vertices from the stack in reverse order and assign an available register color not used by its neighbors. 4. Spilling: If at any step all remaining nodes have degree >= K, the graph may not be K-colorable. A heuristic selects a candidate node with high memory cost/low usage frequency to 'spill' (store in memory stack frame rather than register). A store is inserted after definition and a load before each use, and the coloring process restarts."
            }
          ],
          mcqs: [
            {
              question: "In compiler register allocation, if a CPU provides K physical registers, an interference graph node can be guaranteed colorable if its degree in the graph is:",
              options: ["Strictly less than K", "Greater than or equal to K", "Equal to 2K", "Infinite"],
              correctIndex: 0,
              explanation: "If a node has degree < K, its neighbors can occupy at most K - 1 distinct colors, guaranteeing that at least one of the K colors remains free to assign to this node."
            }
          ]
        }
      ]
    }
  ]
};
