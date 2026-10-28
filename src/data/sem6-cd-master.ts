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
    }
  ]
};
