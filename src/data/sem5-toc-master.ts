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
    }
  ]
};
