import { Subject } from './types';

export const sem5TocMaster: Subject = {
  id: "sem5-toc",
  name: "Theory of Computation & Automata (TOC)",
  code: "TOC503",
  color: "bg-amber-600",
  icon: "book",
  description: "Comprehensive University Syllabus for Theory of Computation — Deterministic and Non-Deterministic Finite Automata (DFA/NFA), Regular Expressions, Pumping Lemma, Context-Free Grammars (CFG), Pushdown Automata (PDA), Turing Machines, Chomsky Hierarchy, and the Halting Problem.",
  semester: 5,
  units: [
    {
      id: "toc-u1",
      title: "Unit 1: Finite Automata & Language Recognition",
      description: "Formal mathematical definition of DFA and NFA (5-tuple), Language acceptance, Subset Construction Algorithm (NFA to DFA equivalence), Epsilon-NFA, and DFA State Minimization (Myhill-Nerode / Table-Filling Method).",
      topics: [
        {
          id: "toc-u1-t1",
          title: "Deterministic Finite Automata (DFA), NFA to DFA Subset Construction, and DFA Minimization",
          simpleExplanation: "A Finite Automaton is an abstract mathematical machine with a finite set of internal states that reads input symbols sequentially and either accepts or rejects the string. In a Deterministic Finite Automaton (DFA), for each state and input symbol, there is exactly one unique next state transition. In a Non-Deterministic Finite Automaton (NFA), multiple transitions (or zero transitions) can exist. By the Powerset (Subset) Construction Theorem, every NFA can be converted to an equivalent DFA with at most 2^Q states.",
          detailedExplanation: `## 1. Formal 5-Tuple Definition of DFA

A Deterministic Finite Automaton (DFA) is defined formally as a 5-tuple:
\\[
M = (Q, \\Sigma, \\delta, q_0, F)
\\]
1. $Q$: A finite, non-empty set of internal states.
2. $\\Sigma$: A finite, non-empty set of input symbols (the alphabet).
3. $\\delta$: The transition function mapping state and symbol to a single next state:
   \\[
   \\delta: Q \\times \\Sigma \\to Q
   \\]
4. $q_0 \\in Q$: The designated start (initial) state.
5. $F \\subseteq Q$: The set of accepting (final) states.

\`\`\`mermaid
stateDiagram-v2
    [*] --> q0
    q0 --> q1: 1
    q0 --> q0: 0
    q1 --> q2: 1
    q1 --> q0: 0
    q2 --> q2: 0, 1
    q2 --> [*]
\`\`\`
*(DFA accepting all binary strings ending with substring '11')*

---

## 2. NFA to DFA Equivalence: Subset Construction

While an NFA transition function maps to the powerset:
\\[
\\delta_{\\text{NFA}}: Q \\times (\\Sigma \\cup \\{\\epsilon\\}) \\to 2^Q
\\]
The **Subset Construction Algorithm** proves that NFAs and DFAs recognize the exact same class of **Regular Languages**:
- For an NFA with $|Q| = n$ states, the equivalent DFA has states that are subsets of $Q$.
- The maximum possible number of states in the converted DFA is $2^n$.

---

## 3. DFA Minimization (Table-Filling / Myhill-Nerode Algorithm)

Two states $p$ and $q$ are **equivalent ($p \\equiv q$)** if for all strings $w \\in \\Sigma^*$, $\\hat{\\delta}(p, w) \\in F \\iff \\hat{\\delta}(q, w) \\in F$. If there exists any string $w$ that drives one state to an accepting state and the other to a non-accepting state, $p$ and $q$ are **distinguishable**.

### Table-Filling Algorithm Steps:
1. Construct a triangular table for all pairs $(p, q)$ where $p \\ne q$.
2. **Base Step**: Mark any pair $(p, q)$ where one state is in $F$ and the other is not in $F$ ($p \\in F \\land q \\notin F$).
3. **Inductive Step**: For all unmarked pairs $(p, q)$, examine if for any symbol $a \\in \\Sigma$, the transition pair $(\\delta(p, a), \\delta(q, a))$ is already marked. If marked, mark $(p, q)$.
4. Repeat until no more marks can be placed. Unmarked pairs are equivalent and merged into a single state in the minimal DFA.`,
          shortNotes: "DFA is a 5-tuple (Q, Sigma, delta, q0, F) with unique transitions. NFA allows multiple next states. Every NFA with n states converts to an equivalent DFA with at most 2^n states. DFA minimization merges indistinguishable states.",
          examples: [
            {
              title: "Python Implementation: DFA String Simulator",
              problem: "Implement a DFA simulator in Python that verifies whether a binary string contains an even number of 0s and an even number of 1s.",
              explanation: "Uses 4 states representing parity combinations (ee, eo, oe, oo).",
              code: `class ParityDFA:
    def __init__(self):
        # States: 0=even_0_even_1, 1=even_0_odd_1, 2=odd_0_even_1, 3=odd_0_odd_1
        self.transitions = {
            0: {'0': 2, '1': 1},
            1: {'0': 3, '1': 0},
            2: {'0': 0, '1': 3},
            3: {'0': 1, '1': 2}
        }
        self.start = 0
        self.final = {0}

    def accepts(self, s):
        state = self.start
        for char in s:
            if char not in self.transitions[state]:
                return False
            state = self.transitions[state][char]
        return state in self.final

dfa = ParityDFA()
test_strings = ["0011", "0101", "100", "1110"]
for s in test_strings:
    print(f"String '{s}': {'ACCEPTED' if dfa.accepts(s) else 'REJECTED'}")`,
              output: `String '0011': ACCEPTED
String '0101': ACCEPTED
String '100': REJECTED
String '1110': REJECTED`
            }
          ],
          keyPoints: [
            "A DFA transition function delta(q, a) maps to exactly one state; an NFA maps to a subset of states 2^Q.",
            "DFAs and NFAs possess strictly identical language recognition power (the Regular Languages).",
            "An NFA with n states can produce a DFA with at most 2^n states in the worst case.",
            "Myhill-Nerode theorem guarantees a unique minimal DFA up to state isomorphism.",
            "Regular languages are closed under Union, Intersection, Complement, Concatenation, and Kleene Star."
          ],
          theoryQuestions: [
            {
              question: "State the formal definition of a Deterministic Finite Automaton (DFA). Describe the Subset Construction algorithm for converting an NFA to a DFA.",
              marks: "7 Marks",
              answer: "A DFA is a 5-tuple (Q, Sigma, delta, q0, F) where Q is a finite set of states, Sigma is the alphabet, delta: Q x Sigma -> Q is the transition function, q0 is start state, and F is the set of accepting states. The Subset Construction algorithm converts an NFA (Q_N, Sigma, delta_N, q0_N, F_N) to DFA: 1. DFA start state is the epsilon-closure of q0_N. 2. For each newly discovered DFA state S (a subset of Q_N) and each symbol a in Sigma, compute the transition delta_D(S, a) = epsilon-closure(union of delta_N(q, a) for all q in S). 3. Add this set of states as a new state in the DFA if not already present. 4. Repeat until no new subsets are discovered. 5. A DFA state is accepting if it contains at least one state from F_N."
            }
          ],
          mcqs: [
            {
              question: "If an NFA has n states, what is the theoretical maximum number of states in the equivalent minimal or converted DFA?",
              options: [
                "n",
                "2^n",
                "n^2",
                "2n"
              ],
              correctIndex: 1,
              explanation: "In the subset construction algorithm, each DFA state represents a distinct subset of the NFA states. For n states, the power set has cardinality 2^n."
            }
          ]
        }
      ]
    },
    {
      id: "toc-u2",
      title: "Unit 2: Regular Expressions & Pumping Lemma for Regular Languages",
      description: "Regular Expressions, Conversion of Regular Expressions to Automata (Thompson's Algorithm), Arden's Theorem, Pumping Lemma for Regular Languages, and Non-Regularity Proofs.",
      topics: [
        {
          id: "toc-u2-t1",
          title: "The Pumping Lemma for Regular Languages and Proofs of Non-Regularity",
          simpleExplanation: "The Pumping Lemma is a fundamental mathematical theorem used to prove that a given language is NOT regular. It states that any sufficiently long string in a regular language contains a substring that can be repeated ('pumped') any number of times without leaving the language. If a language violates this property (such as languages requiring unbounded counting or memory, like L = {0^n 1^n | n >= 0}), the language cannot be recognized by any finite automaton and is provably non-regular.",
          detailedExplanation: `## 1. Statement of the Pumping Lemma for Regular Languages

If a language $L$ is regular, there exists a constant integer $p \\ge 1$ (the **Pumping Length**, which corresponds to the number of states in the minimal DFA recognizing $L$) such that every string $s \\in L$ with length $|s| \\ge p$ can be partitioned into three substrings:
\\[
s = x y z
\\]
satisfying all three of the following conditions:
1. $|y| > 0$ (the pumped substring $y$ is non-empty).
2. $|xy| \\le p$ (the repetition occurs within the first $p$ characters).
3. For all integers $i \\ge 0$, the pumped string $x y^i z \\in L$.

\`\`\`mermaid
flowchart LR
    q0((q0)) -->|x| q_loop((q_loop))
    q_loop -->|y (Pumping Loop)| q_loop
    q_loop -->|z| q_accept(((q_accept)))
\`\`\`

---

## 2. Standard Proof Technique: Proving a Language is NOT Regular

To prove that a language $L$ is not regular by contradiction using the Pumping Lemma:
1. **Assume $L$ is regular** towards a contradiction.
2. By the Pumping Lemma, there exists some pumping length $p$.
3. **Choose a clever test string $s \\in L$** expressed in terms of $p$ such that $|s| \\ge p$ (e.g., $s = 0^p 1^p$).
4. Analyze all possible partitions $s = xyz$ satisfying $|xy| \\le p$ and $|y| \\ge 1$.
   - Since $|xy| \\le p$, the substring $y$ consists exclusively of $0$s ($y = 0^k$ for $k \\ge 1$).
5. **Pump the string** by picking an integer $i$ (e.g. $i = 0$ or $i = 2$) such that the pumped string $x y^i z \\notin L$.
   - For $i = 2$: $x y^2 z = 0^{p+k} 1^p$. Since $k \\ge 1$, the number of $0$s ($p + k$) exceeds the number of $1$s ($p$).
   - Thus, $x y^2 z \\notin L$, contradicting condition 3 of the Pumping Lemma!
6. Therefore, the initial assumption must be false: **$L$ is provably not regular**!`,
          shortNotes: "Pumping lemma proves a language is NOT regular. Any string |s| >= p splits into s = xyz where |y| > 0, |xy| <= p, and xy^i z in L for all i >= 0. Used to prove 0^n 1^n is non-regular.",
          examples: [
            {
              title: "Mathematical Proof: L = {a^n b^n | n >= 0} is Not Regular",
              problem: "Formally prove using the Pumping Lemma that L = {a^n b^n | n >= 0} cannot be recognized by any Finite Automaton.",
              explanation: "Demonstrates standard contradiction methodology.",
              code: `# FORMAL PROOF OF NON-REGULARITY:
1. Assume L = {a^n b^n | n >= 0} is regular.
2. Let p be the pumping length guaranteed by the Pumping Lemma.
3. Select string s = a^p b^p in L. Clearly |s| = 2p >= p.
4. By the lemma, s = xyz with |y| >= 1 and |xy| <= p.
   Since |xy| <= p, both x and y must consist solely of 'a's.
   Let y = a^k where 1 <= k <= p.
5. Consider i = 2 (pumping up):
   s' = x y^2 z = a^(p + k) b^p.
   Since k >= 1, the number of 'a's is (p + k) != p (number of 'b's).
   Therefore, s' is not in L!
6. Contradiction reached. L is NOT a regular language. Q.E.D.`,
              output: `Theorem Verified: L = {a^n b^n | n >= 0} is Non-Regular (Context-Free Language).`
            }
          ],
          keyPoints: [
            "Pumping Lemma can ONLY be used to prove a language is NOT regular; it cannot prove a language is regular.",
            "Three conditions: s = xyz, |y| > 0, |xy| <= p, and xy^i z in L for all i >= 0.",
            "Languages requiring unbounded memory (like matching parentheses or palindromes) are non-regular.",
            "Arden's Theorem: If P and Q are regular expressions and P does not contain epsilon, then R = Q + RP has unique solution R = QP*."
          ],
          theoryQuestions: [
            {
              question: "State the Pumping Lemma for regular languages. Use it to prove that the language L = {0^n 1^n | n >= 0} is not regular.",
              marks: "7 Marks",
              answer: "The Pumping Lemma states that if L is regular, there exists an integer p >= 1 such that for every s in L with |s| >= p, s can be split into s = xyz such that: 1. |y| > 0, 2. |xy| <= p, and 3. xy^i z in L for all i >= 0. Proof that L = {0^n 1^n | n >= 0} is not regular: 1. Assume L is regular with pumping length p. 2. Choose s = 0^p 1^p in L. Length |s| = 2p >= p. 3. Since |xy| <= p, x and y must consist only of '0's. Let y = 0^k where 1 <= k <= p. 4. Pump with i = 0 (remove y): xy^0 z = 0^(p-k) 1^p. Since k >= 1, the number of zeros is p - k, which is strictly less than the number of ones p. 5. Therefore, xy^0 z is not in L, violating condition 3. By contradiction, L is not regular."
            }
          ],
          mcqs: [
            {
              question: "Which of the following formal languages is REGULAR and can be recognized by a Finite Automaton?",
              options: [
                "L = {a^n b^n | n >= 0}",
                "L = {w w^R | w in {0, 1}*} (Even-length Palindromes)",
                "L = {a^n b^m | n >= 1, m >= 1} (a followed by b)",
                "L = {a^(p) | p is a prime number}"
              ],
              correctIndex: 2,
              explanation: "L = {a^n b^m | n >= 1, m >= 1} has regular expression a a* b b* (or a+ b+), requiring no matching count or memory between a's and b's, making it strictly regular."
            }
          ]
        }
      ]
    },
    {
      id: "toc-u3",
      title: "Unit 3: Context-Free Grammars (CFG) & Pushdown Automata (PDA)",
      description: "Context-Free Grammars (CFG), parse trees, grammar ambiguity, Chomsky Normal Form (CNF), Pushdown Automata (PDA: acceptance by empty stack vs final state), DPDA vs NPDA, and Pumping Lemma for Context-Free Languages.",
      topics: [
        {
          id: "toc-u3-t1",
          title: "Context-Free Grammars, Ambiguity Resolution, CNF Conversion, and Pushdown Automata",
          simpleExplanation: "A Finite Automaton is like an elevator that only remembers which floor it is on right now; it has no memory of how many times people got on or off. That's why it cannot check if brackets in code are balanced: '((()))'. To do that, we add a Stack to the machine! This stack-enabled machine is called a Pushdown Automaton (PDA). The language it speaks is generated by Context-Free Grammars (CFGs), which compilers use to parse programming languages like C, Java, and Python. If a grammar can produce two different syntax trees for the exact same code, it is 'ambiguous'—which would confuse a compiler, so we transform it into Chomsky Normal Form (CNF) to guarantee unambiguous parsing.",
          detailedExplanation: `## 1. Context-Free Grammar (CFG) Formalism

A Context-Free Grammar is a 4-tuple $G = (V, \\Sigma, R, S)$:
- $V$: Finite set of Non-terminal variables.
- $\\Sigma$: Finite set of Terminal symbols ($V \\cap \\Sigma = \\emptyset$).
- $R$: Finite set of Production rules of the form $A \\to \\alpha$, where $A \\in V$ and $\\alpha \\in (V \\cup \\Sigma)^*$.
- $S \\in V$: Start variable.

### Grammar Ambiguity:
A CFG is **ambiguous** if there exists at least one string $w \\in L(G)$ that admits **two or more distinct leftmost derivations** (or two distinct parse trees).
Classic example: The Dangling-Else problem in imperative programming languages.

---

## 2. Chomsky Normal Form (CNF)

A grammar $G$ is in Chomsky Normal Form if every production is of the form:
\\[
A \\to BC \\quad \\text{or} \\quad A \\to a
\\]
where $A, B, C \\in V$ ($B, C \\ne S$) and $a \\in \\Sigma$. (Optionally $S \\to \\epsilon$ if $\\epsilon \\in L$).

### Theorem:
Any parse tree for string $w$ of length $|w| = n$ in a CNF grammar has exactly:
- $2n - 1$ derivation steps
- $2n - 1$ interior non-terminal nodes

---

## 3. Pushdown Automata (PDA) Architecture

\`\`\`mermaid
flowchart LR
    Tape["Input Tape: a1 a2 a3 ... an"] --> Control["Finite State Control (Q)"]
    Control <--> Stack["LIFO Stack Storage (Gamma) [Top: Z0]"]
\`\`\`

A PDA is formally defined as a 7-tuple:
\\[
M = (Q, \\Sigma, \\Gamma, \\delta, q_0, Z_0, F)
\\]
- $Q$: Finite set of states
- $\\Sigma$: Input alphabet
- $\\Gamma$: Stack alphabet
- $\\delta: Q \\times (\\Sigma \\cup \\{\\epsilon\\}) \\times \\Gamma \\to \\mathcal{P}(Q \\times \\Gamma^*)$: Transition function
- $q_0 \\in Q$: Initial state
- $Z_0 \\in \\Gamma$: Start stack symbol
- $F \\subseteq Q$: Set of accepting states

### Acceptance Modes:
1. **Acceptance by Final State**: $L(M) = \\{ w \\in \\Sigma^* \\mid (q_0, w, Z_0) \\vdash^* (q_f, \\epsilon, \\gamma), \\; q_f \\in F \\}$
2. **Acceptance by Empty Stack**: $N(M) = \\{ w \\in \\Sigma^* \\mid (q_0, w, Z_0) \\vdash^* (q, \\epsilon, \\epsilon), \\; q \\in Q \\}$
- **Equivalence**: $L(M)$ and $N(M)$ are computationally equivalent in recognizing CFLs.
- **DPDA vs NPDA**: Unlike finite automata (where DFA = NFA), Deterministic PDAs are **strictly less expressive** than Non-deterministic PDAs: $\\text{DCFL} \\subsetneq \\text{CFL}$. (e.g., Even-length palindromes $w w^R$ require non-determinism to guess the midpoint).`,
          shortNotes: "CFG has A -> alpha rules. Ambiguous CFG produces 2+ parse trees for same string. CNF rules: A -> BC or A -> a (2n-1 steps for length n). PDA = FA + LIFO stack. DPDA < NPDA (palindromes require NPDA).",
          examples: [
            {
              title: "Python Implementation: Pushdown Automaton for Balanced Parentheses / a^n b^n",
              problem: "Simulate a deterministic Pushdown Automaton with explicit LIFO stack accepting L = {a^n b^n | n >= 1}.",
              explanation: "Pushes stack symbols for each 'a', pops on each 'b', and accepts if stack returns to bottom marker Z0 on input exhaustion.",
              code: `class PushdownAutomaton:
    def __init__(self):
        self.stack = []
        self.state = "q0"

    def process(self, string: str) -> bool:
        self.stack = ["Z0"]
        self.state = "q0"

        for ch in string:
            top = self.stack[-1] if self.stack else None

            if self.state == "q0":
                if ch == 'a':
                    self.stack.append('A')  # Push A
                elif ch == 'b' and top == 'A':
                    self.stack.pop()        # Match first b, pop A
                    self.state = "q1"
                else:
                    return False
            elif self.state == "q1":
                if ch == 'b' and top == 'A':
                    self.stack.pop()        # Continue popping A
                else:
                    return False  # Disallowed 'a' after 'b' or stack empty

        # Check acceptance: must be in state q1 and stack has only Z0
        if self.state == "q1" and len(self.stack) == 1 and self.stack[0] == "Z0":
            return True
        return False

pda = PushdownAutomaton()
test_cases = ["ab", "aaabbb", "aaaaabbbbb", "aabbb", "aab", "ba", ""]
for test in test_cases:
    result = pda.process(test)
    print(f"Input: '{test:12}' -> Accepted: {result}")`,
              output: `Input: 'ab          ' -> Accepted: True
Input: 'aaabbb      ' -> Accepted: True
Input: 'aaaaabbbbb  ' -> Accepted: True
Input: 'aabbb       ' -> Accepted: False
Input: 'aab         ' -> Accepted: False
Input: 'ba          ' -> Accepted: False
Input: '            ' -> Accepted: False`
            }
          ],
          keyPoints: [
            "Context-Free Grammars have productions of the form A -> alpha with a single nonterminal on LHS.",
            "Ambiguous grammars yield multiple distinct parse trees for the same terminal string.",
            "In Chomsky Normal Form, deriving a string of length n takes exactly 2n - 1 production steps.",
            "Pushdown Automata augment finite control with a single unbounded LIFO stack memory.",
            "Deterministic PDAs are strictly less expressive than Non-Deterministic PDAs (DCFL subset CFL)."
          ],
          theoryQuestions: [
            {
              question: "Prove why the language L = {w w^R | w in {0, 1}*} cannot be recognized by a Deterministic Pushdown Automaton (DPDA).",
              marks: "5 Marks",
              answer: "A DPDA must make a deterministic choice at each transition based on the current state, input symbol, and stack top. For the language of even-length palindromes L = {w w^R}, there is no delimiter marking where the first half w ends and the reversed second half w^R begins. A deterministic machine reading '00' cannot know whether the string has ended (palindrome '0' + '0') or if it is the prefix of '001100'. Therefore, a PDA must use non-determinism (NPDA) to guess the midpoint transition from pushing symbols to popping symbols."
            }
          ],
          mcqs: [
            {
              question: "If a Context-Free Grammar is in Chomsky Normal Form (CNF), how many production steps are required to derive a terminal string of length n?",
              options: ["2n - 1", "n^2", "2n + 1", "n - 1"],
              correctIndex: 0,
              explanation: "In CNF, every variable step A -> BC increases the number of variables by 1, taking n - 1 steps to reach n variables. Each of the n variables then expands to a terminal symbol A -> a in n steps. Total steps = (n - 1) + n = 2n - 1."
            }
          ]
        }
      ]
    },
    {
      id: "toc-u4",
      title: "Unit 4: Turing Machines & Decidability",
      description: "Turing Machine formal 7-tuple definition, Instantaneous Descriptions (ID), Turing Machine variations (Multi-tape, Non-deterministic), Recursive vs Recursively Enumerable languages, and the Halting Problem.",
      topics: [
        {
          id: "toc-u4-t1",
          title: "Turing Machines, Church-Turing Thesis, and Halting Problem Undecidability",
          simpleExplanation: "What is the absolute limit of what any computer can ever compute? In 1936, Alan Turing designed a theoretical machine with a simple read/write head moving left and right across an infinite strip of tape. This simple device—the Turing Machine—can compute anything that any modern supercomputer, quantum computer, or Python script will ever be able to compute (the Church-Turing Thesis). However, Turing discovered a shocking mathematical truth: there are problems that NO algorithm can ever solve! The most famous is the 'Halting Problem': it is mathematically impossible to write a master program that can look at any arbitrary piece of code and tell whether it will finish running or get stuck in an infinite loop.",
          detailedExplanation: `## 1. Turing Machine Formal Definition

A standard deterministic one-tape Turing Machine (TM) is a 7-tuple:
\\[
M = (Q, \\Sigma, \\Gamma, \\delta, q_0, B, F)
\\]
- $Q$: Finite set of states
- $\\Sigma$: Input alphabet (not containing the blank symbol $B$)
- $\\Gamma$: Tape alphabet, where $\\Sigma \\subset \\Gamma$ and $B \\in \\Gamma$
- $\\delta: Q \\times \\Gamma \\to Q \\times \\Gamma \\times \\{L, R\\}$: Partial transition function
- $q_0 \\in Q$: Start state
- $B \\in \\Gamma$: Blank symbol filling infinite tape cells
- $F \\subseteq Q$: Set of accepting states (often partitioned into $q_{accept}$ and $q_{reject}$)

### Instantaneous Description (ID):
An ID $\\alpha_1 q \\alpha_2$ completely captures the current configuration:
- State is $q \\in Q$
- Tape contents are $\\alpha_1 \\alpha_2$
- Current tape head is reading the first symbol of $\\alpha_2$

---

## 2. Decidable (Recursive) vs Recognizable (Recursively Enumerable)

\`\`\`mermaid
flowchart TD
    subgraph All["All Formal Languages (2^Sigma*)"]
        subgraph RE["Recursively Enumerable (Turing Recognizable)"]
            subgraph REC["Recursive (Decidable: Halts on all inputs)"]
                CFL["Context-Free"]
                REG["Regular"]
            end
        end
    end
\`\`\`

1. **Turing Decidable (Recursive Language, $\\mathcal{R}$)**:
   A language $L$ is decidable if there exists a Turing Machine $M$ that **halts on all inputs**:
   \\[
   w \\in L \\implies M(w) \\text{ halts and ACCEPTS}
   \\]
   \\[
   w \\notin L \\implies M(w) \\text{ halts and REJECTS (Never loops indefinitely)}
   \\]

2. **Turing Recognizable (Recursively Enumerable, $\\mathcal{RE}$)**:
   A language $L$ is recognizable if there exists a TM $M$ such that:
   \\[
   w \\in L \\implies M(w) \\text{ halts and ACCEPTS}
   \\]
   \\[
   w \\notin L \\implies M(w) \\text{ REJECTS or LOOPS FOREVER}
   \\]

> **Complementation Theorem**: A language $L$ is Decidable if and only if both $L$ and its complement $\\overline{L}$ are Recursively Enumerable ($L \\in \\mathcal{RE} \\land \\overline{L} \\in \\mathcal{RE} \\iff L \\in \\mathcal{R}$).

---

## 3. The Halting Problem & Diagonalization Proof

Define the Halting Language:
\\[
A_{TM} = \\{ \\langle M, w \\rangle \\mid M \\text{ is a TM and } M \\text{ accepts } w \\}
\\]
\\[
H_{TM} = \\{ \\langle M, w \\rangle \\mid M \\text{ is a TM and } M \\text{ halts on input } w \\}
\\]

### Alan Turing's Diagonalization Proof:
1. Assume for contradiction that there exists a decider $H$ for $A_{TM}$:
   \\[
   H(\\langle M, w \\rangle) = \\begin{cases} \\text{accept} & \\text{if } M \\text{ accepts } w \\\\ \\text{reject} & \\text{if } M \\text{ does not accept } w \\end{cases}
   \\]
2. Construct a new adversarial Turing Machine $D$ that takes description $\\langle M \\rangle$ as input:
   - Run $H$ on input $\\langle M, \\langle M \\rangle \\rangle$.
   - If $H$ accepts, $D$ loops forever / rejects.
   - If $H$ rejects, $D$ accepts.
3. Now evaluate what happens when $D$ is fed its own encoding $\\langle D \\rangle$:
   \\[
   D(\\langle D \\rangle) = \\text{accept} \\iff H(\\langle D, \\langle D \\rangle \\rangle) = \\text{reject} \\iff D \\text{ does NOT accept } \\langle D \\rangle
   \\]
4. **Contradiction!** $D$ accepts $\\langle D \\rangle$ if and only if $D$ does not accept $\\langle D \\rangle$.
5. Therefore, no such decider $H$ can exist. $A_{TM}$ and $H_{TM}$ are strictly **Undecidable**.`,
          shortNotes: "TM = 7-tuple with infinite read/write tape. Decidable (Recursive) halts on all inputs. Recognizable (RE) halts on yes, may loop on no. Halting problem is undecidable by Turing's diagonalization.",
          examples: [
            {
              title: "Python Implementation: 1-Tape Turing Machine for L = {0^n 1^n | n >= 1}",
              problem: "Simulate a deterministic Turing Machine tape transitions accepting equal numbers of 0s and 1s.",
              explanation: "Marks 0 as X, scans right to match 1 as Y, moves back to left marker, repeating until all matched.",
              code: `class TuringMachine:
    def __init__(self, tape_str: str):
        self.tape = list(tape_str) + ['B'] * 20  # Infinite tape simulation
        self.head = 0
        self.state = "q0"

    def step(self) -> bool:
        symbol = self.tape[self.head]

        # Transition table delta(state, symbol) -> (new_state, write_symbol, direction)
        transitions = {
            ("q0", '0'): ("q1", 'X', 'R'),  # Mark 0 as X, search for 1
            ("q0", 'Y'): ("q3", 'Y', 'R'),  # All 0s matched, check remaining
            ("q1", '0'): ("q1", '0', 'R'),  # Skip 0s
            ("q1", 'Y'): ("q1", 'Y', 'R'),  # Skip Ys
            ("q1", '1'): ("q2", 'Y', 'L'),  # Mark 1 as Y, head back left
            ("q2", 'Y'): ("q2", 'Y', 'L'),  # Move back
            ("q2", '0'): ("q2", '0', 'L'),  # Move back
            ("q2", 'X'): ("q0", 'X', 'R'),  # Found marker X, repeat
            ("q3", 'Y'): ("q3", 'Y', 'R'),  # Skip remaining Ys
            ("q3", 'B'): ("q_accept", 'B', 'R')  # Accepted cleanly!
        }

        key = (self.state, symbol)
        if key in transitions:
            new_state, write_sym, direction = transitions[key]
            self.tape[self.head] = write_sym
            self.head += (1 if direction == 'R' else -1)
            self.state = new_state
            return True
        return False  # No transition = Reject

    def run(self, max_steps=500) -> bool:
        steps = 0
        while self.state != "q_accept" and steps < max_steps:
            if not self.step():
                return False
            steps += 1
        return self.state == "q_accept"

# Verify test strings
test_inputs = ["01", "0011", "000111", "001", "0101"]
for inp in test_inputs:
    tm = TuringMachine(inp)
    accepted = tm.run()
    print(f"Input: {inp:10} -> Accepted: {accepted}")`,
              output: `Input: 01         -> Accepted: True
Input: 0011       -> Accepted: True
Input: 000111     -> Accepted: True
Input: 001        -> Accepted: False
Input: 0101       -> Accepted: False`
            }
          ],
          keyPoints: [
            "A Turing Machine features an infinite tape and a read/write head capable of bi-directional movement.",
            "Church-Turing Thesis posits that any algorithmic computation can be simulated by a Turing Machine.",
            "Recursive languages are decidable; the Turing Machine halts on all inputs.",
            "Recursively Enumerable languages are recognizable; the machine may loop infinitely on invalid inputs.",
            "The Halting Problem is proved undecidable via Cantor's diagonal argument."
          ],
          theoryQuestions: [
            {
              question: "Differentiate between Recursive (Decidable) Languages and Recursively Enumerable (Turing Recognizable) Languages. State the Complementation Theorem.",
              marks: "5 Marks",
              answer: "A language L is Recursive (Decidable) if there exists a Turing Machine M that halts on every input w in Sigma*, outputting ACCEPT if w in L and REJECT if w not in L. A language L is Recursively Enumerable if there exists a TM M that halts and accepts if w in L, but may loop infinitely if w not in L. Complementation Theorem: A language L is Recursive if and only if both L and its complement L_bar are Recursively Enumerable. If both L and L_bar have recognizers M1 and M2, a master decider can simulate M1 and M2 in parallel on input w; exactly one will halt, guaranteeing the decider halts on all inputs."
            }
          ],
          mcqs: [
            {
              question: "Which of the following problems is provably UNDECIDABLE by any computational algorithm?",
              options: [
                "Determining whether an arbitrary Turing Machine halts on a given input w",
                "Determining whether a given string is accepted by a Deterministic Finite Automaton",
                "Determining whether a Context-Free Grammar generates the empty language",
                "Sorting an array of n integers"
              ],
              correctIndex: 0,
              explanation: "The Halting Problem (determining if an arbitrary TM halts on input w) was proven undecidable by Alan Turing in 1936 using diagonalization."
            }
          ]
        }
      ]
    },
    {
      id: "toc-u5",
      title: "Unit 5: Chomsky Hierarchy, Undecidability & Reducibility",
      description: "The 4 levels of the Chomsky Hierarchy (Type 0 to Type 3), Post Correspondence Problem (PCP and MPCP), Rice's Theorem, and undecidable properties of Context-Free Languages.",
      topics: [
        {
          id: "toc-u5-t1",
          title: "The Chomsky Hierarchy, Post Correspondence Problem (PCP), and Rice's Theorem",
          simpleExplanation: "Linguist Noam Chomsky organized all possible languages into four distinct classes like Russian nesting dolls: Regular (Type 3) inside Context-Free (Type 2) inside Context-Sensitive (Type 1) inside Recursively Enumerable (Type 0). As we go up the ladder, the machines become more powerful, but more questions become mathematically impossible to answer. For instance, can we check if two programs do the exact same thing? Rice's Theorem answers with an emphatic NO: any non-trivial semantic property of a program's behavior is completely undecidable! Another famous puzzle is the Post Correspondence Problem (PCP)—matching up dominoes with strings on the top and bottom—which is also provably undecidable.",
          detailedExplanation: `## 1. The Chomsky Hierarchy Taxonomy

\`\`\`mermaid
flowchart TD
    T0["Type 0: Recursively Enumerable (Unrestricted Grammars) - Turing Machine"]
    T1["Type 1: Context-Sensitive (alpha A beta -> alpha gamma beta) - Linear Bounded Automaton"]
    T2["Type 2: Context-Free (A -> alpha) - Pushdown Automaton"]
    T3["Type 3: Regular (A -> aB or A -> a) - Finite Automaton"]
    T0 --> T1 --> T2 --> T3
\`\`\`

| Chomsky Type | Language Class | Grammar Production Restrictions | Recognizing Machine |
| :--- | :--- | :--- | :--- |
| **Type 3** | Regular | $A \\to aB$ or $A \\to a$ (Right-Linear) | Deterministic / Nondeterministic Finite Automata (DFA/NFA) |
| **Type 2** | Context-Free | $A \\to \\alpha$, where $A \\in V, \\alpha \\in (V \\cup \\Sigma)^*$ | Pushdown Automata (NPDA) |
| **Type 1** | Context-Sensitive | $\\alpha A \\beta \\to \\alpha \\gamma \\beta$, with $|\\alpha \\gamma \\beta| \\ge |\\alpha A \\beta|$ | Linear Bounded Automata (LBA) |
| **Type 0** | Recursively Enumerable | $\\alpha \\to \\beta$, with $\\alpha \\in (V \\cup \\Sigma)^+$, no size limits | Turing Machine (TM) |

---

## 2. Decidability Matrix Across the Hierarchy

| Decision Problem | Regular (Type 3) | Context-Free (Type 2) | Context-Sensitive (Type 1) | Recursively Enumerable (Type 0) |
| :--- | :--- | :--- | :--- | :--- |
| **Membership ($w \\in L$)** | Decidable ($O(n)$) | Decidable (CYK $O(n^3)$) | Decidable (PSPACE) | Undecidable |
| **Emptiness ($L = \\emptyset$)** | Decidable | Decidable | Undecidable | Undecidable |
| **Finiteness ($|L| < \\infty$)** | Decidable | Decidable | Undecidable | Undecidable |
| **Equivalence ($L_1 = L_2$)** | Decidable | Undecidable | Undecidable | Undecidable |
| **Ambiguity of Grammar** | Not Applicable | **Undecidable** | Undecidable | Undecidable |

---

## 3. Post Correspondence Problem (PCP) & Rice's Theorem

### Post Correspondence Problem (PCP):
Given two lists of strings of equal length over alphabet $\\Sigma$:
\\[
A = (u_1, u_2, \\dots, u_k), \\qquad B = (v_1, v_2, \\dots, v_k)
\\]
Does there exist a sequence of indices $i_1, i_2, \\dots, i_m$ ($m \\ge 1, 1 \\le i_j \\le k$) such that:
\\[
u_{i_1} u_{i_2} \\dots u_{i_m} = v_{i_1} v_{i_2} \\dots v_{i_m}
\\]
- **Emil Post (1946)** proved that PCP is **Undecidable**.
- PCP is widely used as the starting point for proving undecidability of CFG ambiguity, equivalence of CFGs, and universality of CFGs ($L(G) = \\Sigma^*$).

### Rice's Theorem:
> **Theorem**: Any non-trivial semantic property of the language recognized by a Turing Machine is **Undecidable**.

A property $P$ of RE languages is non-trivial if:
1. There exists at least one TM $M_1$ whose language $L(M_1)$ has property $P$.
2. There exists at least one TM $M_2$ whose language $L(M_2)$ does **not** have property $P$.
- **Consequence**: Questions like "Does program $M$ accept the empty language?", "Does $M$ accept all inputs?", or "Does $M$ halt on string 'hello'?" are provably undecidable.`,
          shortNotes: "Chomsky hierarchy: Type 3 (Regular/FA) < Type 2 (CFG/PDA) < Type 1 (CSG/LBA) < Type 0 (RE/TM). Equivalence of CFGs is undecidable. PCP is undecidable. Rice's Theorem: all non-trivial language properties of TMs are undecidable.",
          examples: [
            {
              title: "Python Implementation: Post Correspondence Problem (PCP) Match Searcher",
              problem: "Search for a valid index sequence matching top and bottom strings in a PCP instance using bounded BFS.",
              explanation: "Performs breadth-first state exploration of concatenated prefixes to find an identical match or prove no match within depth limit.",
              code: `from collections import deque

def solve_pcp(A: list[str], B: list[str], max_depth: int = 5):
    # Queue holds: (top_string, bottom_string, index_path)
    queue = deque()
    for i in range(len(A)):
        queue.append((A[i], B[i], [i + 1]))

    while queue:
        top, bottom, path = queue.popleft()

        # Check for complete match
        if top == bottom:
            return path, top

        # Prune if one is not a prefix of the other
        if not (top.startswith(bottom) or bottom.startswith(top)):
            continue

        if len(path) >= max_depth:
            continue

        for i in range(len(A)):
            queue.append((top + A[i], bottom + B[i], path + [i + 1]))

    return None, None

# Classic PCP Instance with a known solution
# List A: ['a', 'ab', 'bba']
# List B: ['baa', 'aa', 'bb']
A_dominoes = ["a", "ab", "bba"]
B_dominoes = ["baa", "aa", "bb"]

solution_path, matched_str = solve_pcp(A_dominoes, B_dominoes, max_depth=6)
print("PCP Dominoes A:", A_dominoes)
print("PCP Dominoes B:", B_dominoes)
if solution_path:
    print(f"Match Found! Domino Sequence: {solution_path}")
    print(f"Concatenated String: '{matched_str}'")
else:
    print("No solution found within search depth.")`,
              output: `PCP Dominoes A: ['a', 'ab', 'bba']
PCP Dominoes B: ['baa', 'aa', 'bb']
Match Found! Domino Sequence: [3, 2, 3, 1]
Concatenated String: 'bbaabbbaa'`
            }
          ],
          keyPoints: [
            "Chomsky hierarchy defines Type 0 (RE/TM), Type 1 (CSG/LBA), Type 2 (CFG/PDA), Type 3 (Regular/FA).",
            "Determining whether a Context-Free Grammar is ambiguous is provably undecidable.",
            "Equivalence of two Context-Free Grammars (L(G1) == L(G2)) is undecidable.",
            "Post Correspondence Problem (PCP) matches top and bottom string concatenations and is undecidable.",
            "Rice's Theorem asserts that all non-trivial semantic properties of RE languages are undecidable."
          ],
          theoryQuestions: [
            {
              question: "State Rice's Theorem formally. Using Rice's Theorem, prove that determining whether a Turing Machine accepts an empty language (L(M) = empty) is undecidable.",
              marks: "7 Marks",
              answer: "Rice's Theorem states: Let P be any property of Recursively Enumerable languages. If P is non-trivial (meaning there exists at least one TM M1 with L(M1) in P, and at least one TM M2 with L(M2) not in P), then the problem of determining whether L(M) has property P for an arbitrary Turing Machine M is undecidable. Proof that Emptiness is undecidable: 1. Emptiness is a property of the language recognized by the TM (if L(M1) = L(M2), then L(M1) is empty iff L(M2) is empty). 2. Non-triviality: Let M_empty be a TM that immediately rejects all inputs; L(M_empty) = empty (satisfies property). Let M_all be a TM that accepts all inputs; L(M_all) = Sigma* != empty (does not satisfy property). Since the property is non-trivial and concerns the recognized language, Rice's Theorem directly implies that determining whether L(M) = empty is undecidable."
            }
          ],
          mcqs: [
            {
              question: "Which of the following decision problems is DECIDABLE for Context-Free Grammars?",
              options: [
                "Testing whether L(G) is empty (Emptiness problem)",
                "Testing whether two CFGs generate the same language (Equivalence problem)",
                "Testing whether a given CFG is ambiguous",
                "Testing whether L(G) = Sigma* (Universality problem)"
              ],
              correctIndex: 0,
              explanation: "The Emptiness problem for CFGs is decidable: it can be checked in polynomial time by determining whether the start variable S can derive any string of terminals using variable reachability."
            }
          ]
        }
      ]
    }
  ]
};
