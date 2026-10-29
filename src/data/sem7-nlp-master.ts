import { Subject } from './types';

export const sem7NlpMaster: Subject = {
  id: "sem7-nlp",
  name: "Natural Language Processing & Generative AI",
  code: "NLP702",
  color: "bg-fuchsia-600",
  icon: "sparkles",
  description: "Comprehensive University Syllabus for NLP & Generative AI — Text Preprocessing (Tokenization, Lemmatization, Byte-Pair Encoding BPE), Vector Embeddings (TF-IDF, Word2Vec, GloVe), Recurrent Models (RNN, LSTM, GRU, Seq2Seq), The Transformer Architecture (Self-Attention, Multi-Head Attention, RoPE), Large Language Models (BERT, GPT, LLaMA), Parameter-Efficient Fine-Tuning (LoRA, QLoRA), and Retrieval-Augmented Generation (RAG).",
  semester: 7,
  units: [
    {
      id: "nlp-u1",
      title: "Unit 1: Text Representations, Embeddings & Language Modeling",
      description: "Tokenization paradigms (Word, Subword, BPE), N-gram language models, TF-IDF vector space, Word2Vec (Skip-Gram & CBOW with Negative Sampling), and GloVe co-occurrence matrices.",
      topics: [
        {
          id: "nlp-u1-t1",
          title: "Subword Tokenization (BPE), Vector Space Semantics, and Word2Vec Skip-Gram Architecture",
          simpleExplanation: "Computers cannot process raw human text directly; text must be decomposed into numerical vectors. Modern LLMs use subword tokenization (such as Byte-Pair Encoding) to handle rare words and multilingual vocabularies. Word2Vec maps words into continuous high-dimensional vector spaces where words sharing similar contextual usage are positioned close to one another, capturing semantic relationships (e.g., King - Man + Woman = Queen).",
          detailedExplanation: `## 1. Evolution of Text Representations

\`\`\`mermaid
flowchart LR
    ONEHOT["1. One-Hot Encoding\nSparse, High-Dim, Orthogonal (No Semantics)"] --> TFIDF["2. TF-IDF\nTerm Frequency * Inverse Doc Frequency"]
    TFIDF --> W2V["3. Distributed Embeddings\nWord2Vec, GloVe (Dense 300D, Static)"]
    W2V --> TRANS["4. Contextual Embeddings\nBERT, GPT, Transformers (Context-Aware)"]
\`\`\`

---

## 2. Word2Vec: Skip-Gram vs Continuous Bag of Words (CBOW)
- **CBOW**: Predicts the target word $w_t$ given a context window of surrounding words $(w_{t-2}, w_{t-1}, w_{t+1}, w_{t+2})$. Fast to train on common words.
- **Skip-Gram**: Predicts surrounding context words given the central target word $w_t$. Superior performance on rare words and specialized jargon.

### Objective Function with Negative Sampling:
$$\mathcal{L} = \sum_{t=1}^T \sum_{-c \le j \le c, j \ne 0} \left[ \log \sigma(v'_{w_{t+j}}^\top v_{w_t}) + \sum_{k=1}^K \mathbb{E}_{w_i \sim P_n(w)} \left[ \log \sigma(-v'_{w_i}^\top v_{w_t}) \right] \right]$$
Where $K$ represents the number of randomly drawn negative samples (typically 5-20).`,
          shortNotes: "Text is tokenized via BPE. Word2Vec maps words to dense vectors using Skip-Gram or CBOW. Negative sampling makes training scalable across billions of words.",
          examples: [
            {
              title: "Cosine Similarity & Word Vector Arithmetic in Python",
              problem: "Calculate semantic vector similarities and verify analogies like 'Paris - France + Germany' using dense embeddings.",
              explanation: "Cosine similarity measures the angle between vectors independent of magnitude.",
              code: `import numpy as np

def cosine_similarity(v1, v2):
    return np.dot(v1, v2) / (np.linalg.norm(v1) * np.linalg.norm(v2))

# Mock semantic embeddings (3-dimensional projection)
vec_king   = np.array([0.85, 0.45, 0.12])
vec_man    = np.array([0.70, 0.20, 0.05])
vec_woman  = np.array([0.20, 0.85, 0.05])
vec_queen  = np.array([0.35, 0.95, 0.15])

# Analogical query: King - Man + Woman ~ Queen
query = vec_king - vec_man + vec_woman
sim = cosine_similarity(query, vec_queen)
print(f"Cosine similarity (King - Man + Woman vs Queen): {sim:.4f}")
assert sim > 0.90`
            }
          ],
          keyPoints: [
            "One-hot vectors cannot represent semantic similarity because all pairs have dot product 0.",
            "Byte-Pair Encoding (BPE) iteratively merges the most frequent adjacent character pairs.",
            "Skip-Gram with negative sampling replaces softmax normalization with fast binary logistic regressions.",
            "Cosine similarity between normalized vectors ranges from -1 (opposite) to +1 (identical)."
          ],
          theoryQuestions: [
            {
              question: "Explain the Byte-Pair Encoding (BPE) tokenization algorithm used in modern LLMs (such as GPT-4 and LLaMA).",
              marks: "7 Marks",
              answer: "1. Initialize vocabulary with all individual characters in the corpus plus end-of-word marker. 2. Tokenize corpus into individual characters. 3. Count frequency of all adjacent character pairs across corpus. 4. Find the most frequent pair (e.g., 'e' + 's' -> 'es') and merge them into a single new vocabulary token. 5. Repeat merging steps until target vocabulary size (e.g. 32,000 to 100,000 tokens) is reached. This preserves common whole words while decomposing unseen words into known subwords."
            }
          ],
          mcqs: [
            {
              question: "Which model architecture predicts the surrounding context words given the center target word?",
              options: ["Continuous Bag of Words (CBOW)", "Skip-Gram", "Autoencoder", "TF-IDF"],
              correctIndex: 1,
              explanation: "The Skip-Gram architecture takes the central target word and maximizes the probability of predicting its surrounding context words."
            }
          ]
        }
      ]
    },
    {
      id: "nlp-u2",
      title: "Unit 2: The Transformer Architecture, LLMs & Retrieval-Augmented Generation (RAG)",
      description: "Scaled Dot-Product Attention, Multi-Head Attention, Positional Encodings (Sinusoidal & RoPE), Encoder-Decoder vs Decoder-Only (BERT vs GPT), LoRA fine-tuning, and RAG pipelines.",
      topics: [
        {
          id: "nlp-u2-t1",
          title: "Multi-Head Self-Attention Math, Decoder-Only Architectures, LoRA, and Production RAG",
          simpleExplanation: "The Transformer architecture abandoned recursive loops in favor of Self-Attention, allowing models to process all words in a sequence simultaneously in parallel. Queries, Keys, and Values compute attention weights representing how strongly each word relates to every other word. Modern LLMs use Decoder-Only architectures (like GPT, LLaMA, and Gemini) to generate text autoregressively. Retrieval-Augmented Generation (RAG) grounds LLM outputs with external private databases.",
          detailedExplanation: `## 1. Scaled Dot-Product Attention Equation
Given input matrix $X \in \mathbb{R}^{T \times d_{\text{model}}}$, project into Queries ($Q$), Keys ($K$), and Values ($V$):
$$Q = X W_Q, \quad K = X W_K, \quad V = X W_V$$

$$\text{Attention}(Q, K, V) = \text{softmax}\left( \frac{Q K^\top}{\sqrt{d_k}} \right) V$$

- $\sqrt{d_k}$ scaling prevents dot products from growing excessively large for high dimensions, which would cause softmax gradients to vanish.

\`\`\`mermaid
flowchart TD
    subgraph Multi_Head ["Multi-Head Self-Attention Block"]
        direction TB
        Q["Queries (Q)"] & K["Keys (K)"] --> MATMUL1["Matrix Multiplication (Q * K^T)"]
        MATMUL1 --> SCALE["Scale by 1 / sqrt(d_k)"]
        SCALE --> MASK["Optional Causal Mask\n(Prevents looking at future tokens)"]
        MASK --> SOFTMAX["Softmax (Attention Weights)"]
        SOFTMAX & V["Values (V)"] --> MATMUL2["Matrix Multiplication (Weights * V)"]
        MATMUL2 --> CONCAT["Concatenate Heads"]
        CONCAT --> PROJ["Linear Projection (W_O)"]
    end
\`\`\`

---

## 2. Low-Rank Adaptation (LoRA) Fine-Tuning
Instead of updating all billions of parameters in weight matrix $W_0 \in \mathbb{R}^{d \times k}$, LoRA decomposes the weight update $\Delta W$ into two low-rank matrices:
$$W = W_0 + \Delta W = W_0 + B \cdot A, \quad \text{where } B \in \mathbb{R}^{d \times r}, A \in \mathbb{R}^{r \times k}, \quad r \ll \min(d, k)$$
- Reduces trainable parameters by $> 99\%$, enabling consumer GPUs to fine-tune enterprise models.

---

## 3. Retrieval-Augmented Generation (RAG) Architecture
1. **Indexing**: Chunk private docs $\to$ generate embeddings with bi-encoder $\to$ store in Vector Database (Milvus/Pinecone/Chroma).
2. **Retrieval**: User query embedded $\to$ Top-$K$ relevant chunks retrieved via Cosine Similarity / HNSW.
3. **Augmentation**: Chunks appended into prompt context window.
4. **Generation**: LLM synthesizes grounded, hallucination-free answer with source citations.`,
          shortNotes: "Self-Attention computes Q*K^T / sqrt(d_k) * V. LoRA freezes base weights and trains low-rank adapter matrices B*A. RAG retrieves relevant document chunks to ground LLM generation.",
          examples: [
            {
              title: "Complete RAG Pipeline Implementation in Python (LangChain / LlamaIndex style)",
              problem: "Implement a semantic retriever that embeds queries, searches vector embeddings, and formats prompt with retrieved context.",
              explanation: "Calculates cosine similarity across document embeddings and appends top matches to prompt.",
              code: `import numpy as np

class MinimalRAG:
    def __init__(self, documents, mock_embed_fn):
        self.docs = documents
        self.embed_fn = mock_embed_fn
        self.doc_embeddings = np.array([self.embed_fn(d) for d in documents])

    def query(self, user_question, top_k=2):
        q_vec = self.embed_fn(user_question)
        # Cosine similarity matrix multiplication
        sims = np.dot(self.doc_embeddings, q_vec) / (
            np.linalg.norm(self.doc_embeddings, axis=1) * np.linalg.norm(q_vec)
        )
        top_indices = np.argsort(sims)[::-1][:top_k]
        context = "\\n".join([f"- {self.docs[i]}" for i in top_indices])
        
        prompt = f"""Use the following verified university context to answer the question:
Context:
{context}

Question: {user_question}
Answer:"""
        return prompt`
            }
          ],
          keyPoints: [
            "Scaled dot-product attention scales by 1/sqrt(d_k) to prevent vanishing gradients in softmax.",
            "Causal masking sets upper triangular values to -infinity to enforce autoregressive generation in decoders.",
            "LoRA drastically reduces memory consumption during fine-tuning by decomposing weight updates into rank r matrices.",
            "RAG prevents LLM hallucinations by grounding responses in external factual document repositories."
          ],
          theoryQuestions: [
            {
              question: "Explain the Multi-Head Attention mechanism and contrast Encoder-Only (BERT) vs Decoder-Only (GPT) architectures.",
              marks: "7 Marks",
              answer: "Multi-Head Attention projects Q, K, V into h distinct subspace heads, computes attention independently per head, concatenates the outputs, and projects through a final linear layer. This allows the model to attend simultaneously to information from different positions and representation subspaces. BERT is Encoder-Only with bidirectional attention, ideal for classification, NER, and embedding generation. GPT is Decoder-Only with masked causal attention, ideal for autoregressive text generation."
            }
          ],
          mcqs: [
            {
              question: "Why is the scaling factor 1 / sqrt(d_k) applied to the dot product of Q and K in self-attention?",
              options: [
                "To reduce computation time",
                "To prevent dot products from becoming excessively large, which leads to vanishing softmax gradients",
                "To convert matrices into scalars",
                "To encrypt attention weights"
              ],
              correctIndex: 1,
              explanation: "For large dimensions d_k, the dot products grow large in magnitude, pushing the softmax function into regions with extremely small gradients. Dividing by sqrt(d_k) stabilizes the variance."
            }
          ]
        }
      ]
    },
    {
      id: "nlp-u3",
      title: "Unit 3: Sequence Tagging, Hidden Markov Models (HMM) & NER",
      description: "Part-of-Speech tagging, Named Entity Recognition (NER, BIO scheme), Hidden Markov Models (HMM: Forward-Backward, Viterbi decoding, Baum-Welch training), and Conditional Random Fields (CRF).",
      topics: [
        {
          id: "nlp-u3-t1",
          title: "Hidden Markov Models, The Viterbi Algorithm, and Named Entity Recognition (NER)",
          simpleExplanation: "When reading the sentence 'I can can a can', the word 'can' appears three times with three different grammatical meanings: modal verb, action verb, and noun. Sequence Tagging assigns the correct Part-of-Speech (POS) tag or identifies names, places, and organizations (Named Entity Recognition - NER). Because we cannot directly see what grammar role is inside the speaker's brain (hidden states), we only see the spoken words (observations). A Hidden Markov Model (HMM) calculates the probability of transitions between hidden grammar states and word emissions. The Viterbi Algorithm is dynamic programming at its best: it finds the single most probable sequence of hidden tags in real time without calculating quadrillions of combinations.",
          detailedExplanation: `## 1. Hidden Markov Model (HMM) Formalism

An HMM is a probabilistic generative model defined by the 5-tuple $\\lambda = (S, V, A, B, \\pi)$:
- $S = \\{s_1, s_2, \\dots, s_N\\}$: Set of hidden states (e.g., POS tags: Noun, Verb, Adj).
- $V = \\{v_1, v_2, \\dots, v_M\\}$: Set of observation vocabulary words.
- $A = \\{a_{ij}\\}$: Transition probability matrix, where $a_{ij} = P(q_t = s_j \\mid q_{t-1} = s_i)$.
- $B = \\{b_j(k)\\}$: Emission probability matrix, where $b_j(k) = P(o_t = v_k \\mid q_t = s_j)$.
- $\\pi = \\{\\pi_i\\}$: Initial state probability distribution, where $\\pi_i = P(q_1 = s_i)$.

### The Three Fundamental Problems of HMMs:
1. **Evaluation**: Given model $\\lambda$ and observation sequence $O = (o_1, o_2, \\dots, o_T)$, compute $P(O \\mid \\lambda)$. Solved via the **Forward-Backward Algorithm** in $O(N^2 T)$ time (vs naive $O(N^T)$).
2. **Decoding**: Find the optimal hidden state sequence $Q = (q_1, q_2, \\dots, q_T)$ that best explains $O$. Solved via the **Viterbi Algorithm**.
3. **Learning (Parameter Estimation)**: Given observations $O$, adjust parameters $(A, B, \\pi)$ to maximize $P(O \\mid \\lambda)$. Solved via the **Baum-Welch (Expectation-Maximization)** algorithm.

---

## 2. The Viterbi Dynamic Programming Decoding Algorithm

Finds $Q^* = \\arg\\max_Q P(Q, O \\mid \\lambda)$:

1. **Initialization** ($t = 1$, for $1 \\le i \\le N$):
   \\[
   v_1(i) = \\pi_i \\cdot b_i(o_1), \\qquad \\psi_1(i) = 0
   \\]
2. **Recursion** ($2 \\le t \\le T$, for $1 \\le j \\le N$):
   \\[
   v_t(j) = \\max_{1 \\le i \\le N} \\left[ v_{t-1}(i) \\cdot a_{ij} \\right] \\cdot b_j(o_t)
   \\]
   \\[
   \\psi_t(j) = \\arg\\max_{1 \\le i \\le N} \\left[ v_{t-1}(i) \\cdot a_{ij} \\right]
   \\]
3. **Termination**:
   \\[
   P^* = \\max_{1 \\le i \\le N} v_T(i), \\qquad q_T^* = \\arg\\max_{1 \\le i \\le N} v_T(i)
   \\]
4. **Backtracking Path Reconstruction** ($t = T-1, T-2, \\dots, 1$):
   \\[
   q_t^* = \\psi_{t+1}(q_{t+1}^*)
   \\]

---

## 3. Named Entity Recognition (NER) & BIO Tagging Scheme

In NER, tokens are classified into entity spans:
- **B (Beginning)**: Token begins an entity (e.g., \`B-PER\`, \`B-LOC\`, \`B-ORG\`).
- **I (Inside)**: Token is inside an ongoing multi-word entity (e.g., \`I-ORG\`).
- **O (Outside)**: Token is not part of any named entity.

Example: \`[Elon: B-PER] [Musk: I-PER] [visited: O] [Google: B-ORG] [in: O] [New: B-LOC] [York: I-LOC]\`.`,
          shortNotes: "HMM has hidden states S, observations V, transitions A, emissions B, and priors pi. Viterbi decoding finds argmax state sequence in O(N^2 * T) DP time. NER uses BIO tagging scheme.",
          examples: [
            {
              title: "Python Implementation: Viterbi Algorithm from Scratch for POS Tagging",
              problem: "Implement the Viterbi dynamic programming algorithm to find the most probable POS tag sequence for the sentence 'Jane spot will'.",
              explanation: "Calculates max transition-emission paths across time steps and backtracks optimal state pointers.",
              code: `import numpy as np

# States: Noun (N), Verb (V)
states = ["Noun", "Verb"]
# Vocabulary: Jane, spot, will
obs_map = {"Jane": 0, "spot": 1, "will": 2}

# Transition Matrix A: A[i, j] = P(state_j | state_i)
# rows: [Noun, Verb] -> cols: [Noun, Verb]
A = np.array([
    [0.3, 0.7],  # P(Noun->Noun)=0.3, P(Noun->Verb)=0.7
    [0.8, 0.2]   # P(Verb->Noun)=0.8, P(Verb->Verb)=0.2
])

# Emission Matrix B: B[state, word]
# words: [Jane, spot, will]
B = np.array([
    [0.6, 0.3, 0.1],  # Noun: Jane=0.6, spot=0.3, will=0.1
    [0.05, 0.5, 0.45] # Verb: Jane=0.05, spot=0.5, will=0.45
])

# Initial Probabilities Pi
pi = np.array([0.8, 0.2])  # 80% sentences start with Noun

def viterbi(sentence: list[str]):
    T = len(sentence)
    N = len(states)
    viterbi_matrix = np.zeros((N, T))
    backpointer = np.zeros((N, T), dtype=int)

    # Step 1: Initialization
    w0 = obs_map[sentence[0]]
    for s in range(N):
        viterbi_matrix[s, 0] = pi[s] * B[s, w0]
        backpointer[s, 0] = 0

    # Step 2: Recursion
    for t in range(1, T):
        wt = obs_map[sentence[t]]
        for s in range(N):
            trans_probs = viterbi_matrix[:, t - 1] * A[:, s]
            best_prev = np.argmax(trans_probs)
            viterbi_matrix[s, t] = trans_probs[best_prev] * B[s, wt]
            backpointer[s, t] = best_prev

    # Step 3: Termination & Backtracking
    best_last_state = np.argmax(viterbi_matrix[:, T - 1])
    best_path = [best_last_state]

    for t in range(T - 1, 0, -1):
        prev = backpointer[best_path[-1], t]
        best_path.append(prev)

    best_path.reverse()
    return [states[s] for s in best_path], np.max(viterbi_matrix[:, T - 1])

sentence = ["Jane", "will", "spot"]
path, max_prob = viterbi(sentence)
print(f"Sentence: {sentence}")
print(f"Optimal Viterbi POS Path: {path}")
print(f"Joint Sequence Probability: {max_prob:.6f}")`,
              output: `Sentence: ['Jane', 'will', 'spot']
Optimal Viterbi POS Path: ['Noun', 'Verb', 'Noun']
Joint Sequence Probability: 0.036288`
            }
          ],
          keyPoints: [
            "HMM models sequence tagging as unobserved hidden states emitting observable words.",
            "The Three Fundamental HMM problems are Evaluation (Forward), Decoding (Viterbi), and Learning (Baum-Welch).",
            "The Viterbi algorithm computes the most probable hidden state sequence in O(N^2 * T) time.",
            "BIO scheme differentiates between Beginning, Inside, and Outside of entity spans.",
            "Conditional Random Fields (CRF) overcome the label bias problem of HMMs and MEMMs."
          ],
          theoryQuestions: [
            {
              question: "Explain the Viterbi Algorithm for Hidden Markov Models. Provide the mathematical recurrence relations for initialization, recursion, and termination.",
              marks: "7 Marks",
              answer: "The Viterbi algorithm is a dynamic programming algorithm that finds the most probable sequence of hidden states Q* = (q1, ..., qT) given observation sequence O = (o1, ..., oT) in an HMM. 1. Initialization (t=1): v_1(j) = pi_j * b_j(o_1) for 1 <= j <= N, with backpointer psi_1(j) = 0. 2. Recursion (2 <= t <= T): v_t(j) = max_i [v_{t-1}(i) * a_ij] * b_j(o_t), where psi_t(j) = argmax_i [v_{t-1}(i) * a_ij]. Here v_t(j) represents the probability of the most likely hidden state sequence leading up to state j at time t having generated the first t observations. 3. Termination: P* = max_i v_T(i), with q_T* = argmax_i v_T(i). 4. Backtracking: q_t* = psi_{t+1}(q_{t+1}*) for t = T-1 down to 1. Total time complexity is O(N^2 * T), avoiding the exponential O(N^T) brute-force search."
            }
          ],
          mcqs: [
            {
              question: "What is the computational time complexity of the Viterbi decoding algorithm for an HMM with N hidden states and an observation sequence of length T?",
              options: ["O(N^2 * T)", "O(N^T)", "O(T^2 * N)", "O(N * log T)"],
              correctIndex: 0,
              explanation: "At each of the T time steps, the algorithm computes transitions from all N previous states to all N current states, resulting in N * N = N^2 operations per step, giving O(N^2 * T) total time."
            }
          ]
        }
      ]
    },
    {
      id: "nlp-u4",
      title: "Unit 4: Seq2Seq, LSTM Networks & Neural Machine Translation",
      description: "Recurrent Neural Networks (RNN) and vanishing gradients, Long Short-Term Memory (LSTM) cell gating mechanics, Gated Recurrent Units (GRU), Sequence-to-Sequence (Seq2Seq) Encoder-Decoder architecture, and Bahdanau Additive Attention.",
      topics: [
        {
          id: "nlp-u4-t1",
          title: "LSTM Gating Mechanics, Seq2Seq Models, and Additive Attention in Machine Translation",
          simpleExplanation: "Standard Recurrent Neural Networks (RNNs) suffer from severe short-term memory loss: by the time they read word 50 of a sentence, they have completely forgotten word 1 because mathematical gradients vanish to zero! The LSTM (Long Short-Term Memory) network fixed this by inventing a physical 'Memory Conveyor Belt' (Cell State). It uses three smart gates: a Forget Gate (throws away useless junk), an Input Gate (stores new important facts), and an Output Gate (decides what to say right now). When translating languages ('English to French'), Seq2Seq uses an Encoder to read English and a Decoder to write French. Adding Attention lets the Decoder look back and shine a mental spotlight on the exact English words it is translating right now!",
          detailedExplanation: `## 1. LSTM Internal Gating Mathematics

An LSTM cell maintains two hidden vectors: the **Cell State $C_t$** (long-term memory) and the **Hidden State $h_t$** (short-term output):

\`\`\`mermaid
flowchart LR
    subgraph LSTMCell["LSTM Cell Mechanics (Time Step t)"]
        F["Forget Gate: f_t = sigma(W_f [h_{t-1}, x_t] + b_f)"]
        I["Input Gate: i_t = sigma(W_i [h_{t-1}, x_t] + b_i)"]
        C_cand["Candidate: ~C_t = tanh(W_c [h_{t-1}, x_t] + b_c)"]
        C_new["Cell Update: C_t = f_t * C_{t-1} + i_t * ~C_t"]
        O["Output Gate: o_t = sigma(W_o [h_{t-1}, x_t] + b_o)"]
        H["Hidden Output: h_t = o_t * tanh(C_t)"]
        F --> C_new
        I --> C_new
        C_cand --> C_new
        C_new --> H
        O --> H
    end
\`\`\`

1. **Forget Gate**: Decides what fraction of prior cell state $C_{t-1}$ to retain:
   \\[
   f_t = \\sigma(W_f \\cdot [h_{t-1}, x_t] + b_f) \\in (0, 1)
   \\]
2. **Input Gate & Candidate Cell State**:
   \\[
   i_t = \\sigma(W_i \\cdot [h_{t-1}, x_t] + b_i), \\qquad \\tilde{C}_t = \\tanh(W_c \\cdot [h_{t-1}, x_t] + b_c)
   \\]
3. **Cell State Update (Additive Highway)**:
   \\[
   C_t = f_t \\odot C_{t-1} + i_t \\odot \\tilde{C}_t
   \\]
   Because the derivative $\\frac{\\partial C_t}{\\partial C_{t-1}} = f_t$, error gradients flow back across hundreds of time steps without vanishing when $f_t \\approx 1$.
4. **Output Gate & Hidden State**:
   \\[
   o_t = \\sigma(W_o \\cdot [h_{t-1}, x_t] + b_o), \\qquad h_t = o_t \\odot \\tanh(C_t)
   \\]

---

## 2. Seq2Seq & Bahdanau Additive Attention

Traditional Seq2Seq (Sutskever et al., 2014) compressed the entire source sentence into a single fixed-length bottleneck vector $c = h_T^{(enc)}$, causing translation quality to collapse on sentences $> 20$ words.

### Bahdanau Attention (Dzmitry Bahdanau et al., 2015):
Allows the decoder to construct a dynamic, time-varying context vector $c_t$ by attending to all encoder hidden states $(h_1^{(enc)}, h_2^{(enc)}, \\dots, h_{T_x}^{(enc)})$:

1. **Alignment Score (Additive)**:
   \\[
   e_{t, i} = v_a^T \\tanh(W_a s_{t-1} + U_a h_i^{(enc)})
   \\]
   where $s_{t-1}$ is the previous decoder hidden state.
2. **Attention Weights (Softmax Normalized)**:
   \\[
   \\alpha_{t, i} = \\frac{\\exp(e_{t, i})}{\\sum_{k=1}^{T_x} \\exp(e_{t, k})}
   \\]
3. **Dynamic Context Vector**:
   \\[
   c_t = \\sum_{i=1}^{T_x} \\alpha_{t, i} \\, h_i^{(enc)}
   \\]`,
          shortNotes: "LSTM prevents vanishing gradients with additive cell state Ct. Gates: Forget (ft), Input (it), Output (ot). Seq2Seq encoder-decoder bottleneck solved by Bahdanau attention using dynamic context vectors ct = sum alpha_ti * hi.",
          examples: [
            {
              title: "Python Implementation: Bahdanau Attention Weight Alignment Matrix",
              problem: "Calculate Bahdanau alignment scores and Softmax attention distribution between decoder hidden states and encoder outputs.",
              explanation: "Applies additive tanh scoring function and softmax normalization to produce an attention alignment vector.",
              code: `import numpy as np

def softmax(x):
    e_x = np.exp(x - np.max(x))
    return e_x / np.sum(e_x)

# 4 encoder hidden states (source sentence: 'The', 'black', 'cat', 'slept')
# dimension d = 3
H_enc = np.array([
    [0.2, 0.8, -0.1],  # 'The'
    [0.9, -0.3, 0.5],  # 'black'
    [0.85, 0.4, 0.6],  # 'cat'
    [-0.1, 0.1, 0.9]   # 'slept'
])

# Decoder previous state (translating: 'chat')
s_prev = np.array([0.7, 0.2, 0.4])

# Learnable projection matrices (simulation)
np.random.seed(42)
W_a = np.random.randn(4, 3) * 0.5
U_a = np.random.randn(4, 3) * 0.5
v_a = np.random.randn(4) * 0.5

# Step 1: Compute alignment scores e_i = v_a^T * tanh(W_a * s_prev + U_a * h_i)
scores = []
for h_i in H_enc:
    proj = np.tanh(W_a @ s_prev + U_a @ h_i)
    score = np.dot(v_a, proj)
    scores.append(score)

scores = np.array(scores)
# Step 2: Softmax attention distribution
alpha = softmax(scores)

# Step 3: Weighted Context Vector
c_t = np.sum(alpha[:, np.newaxis] * H_enc, axis=0)

words = ["The", "black", "cat", "slept"]
print("--- Bahdanau Attention Alignment Weights ---")
for word, weight in zip(words, alpha):
    print(f"Word: '{word:6}' -> Attention Weight alpha: {weight:.4f}")

print(f"\\nDynamic Context Vector c_t: {np.round(c_t, 3)}")`,
              output: `--- Bahdanau Attention Alignment Weights ---
Word: 'The   ' -> Attention Weight alpha: 0.1843
Word: 'black ' -> Attention Weight alpha: 0.2912
Word: 'cat   ' -> Attention Weight alpha: 0.3854
Word: 'slept ' -> Attention Weight alpha: 0.1391

Dynamic Context Vector c_t: [0.612 0.229 0.483]`
            }
          ],
          keyPoints: [
            "LSTMs mitigate vanishing gradients through an additive Cell State conveyor belt.",
            "The Forget Gate uses sigmoid to scale historical memory between 0 (forget) and 1 (keep).",
            "Seq2Seq encoder-decoder models map variable-length inputs to variable-length outputs.",
            "Bahdanau attention calculates a dynamic context vector per target word via alignment softmax.",
            "BLEU score evaluates machine translation accuracy via modified n-gram precision and brevity penalty."
          ],
          theoryQuestions: [
            {
              question: "Explain why standard Recurrent Neural Networks (RNNs) suffer from the Vanishing Gradient problem during backpropagation through time (BPTT). How does the LSTM architecture solve it?",
              marks: "7 Marks",
              answer: "In standard RNNs, hidden state evolves as h_t = tanh(W_hh * h_{t-1} + W_xh * x_t). By the chain rule across T time steps, the gradient of loss L_T w.r.t h_1 contains a product of Jacobian matrices: prod_{k=2}^T (dh_k / dh_{k-1}) = prod (diag(1 - tanh^2(...)) * W_hh^T). Because tanh derivative is strictly <= 1 and the largest eigenvalue of W_hh is typically < 1, multiplying this term dozens of times causes gradients to shrink exponentially toward zero (vanishing gradient), preventing the network from learning dependencies beyond 10-15 steps. LSTMs solve this by introducing the Cell State C_t with additive linear dynamics: C_t = f_t * C_{t-1} + i_t * ~C_t. The partial derivative dC_t / dC_{t-1} = f_t. When the forget gate f_t is close to 1, the gradient flows backwards through time indefinitely without exponential decay."
            }
          ],
          mcqs: [
            {
              question: "Which gate in the LSTM cell is responsible for determining how much of the PREVIOUS cell state C_{t-1} is retained or erased?",
              options: ["Forget Gate", "Input Gate", "Output Gate", "Reset Gate"],
              correctIndex: 0,
              explanation: "The Forget Gate f_t = sigma(W_f [h_{t-1}, x_t] + b_f) outputs values between 0 and 1, multiplying C_{t-1} to scale how much past memory is preserved."
            }
          ]
        }
      ]
    },
    {
      id: "nlp-u5",
      title: "Unit 5: Prompt Engineering, Fine-Tuning (LoRA), RLHF & LLM Evaluation",
      description: "Prompt Engineering paradigms (Chain-of-Thought, Tree-of-Thoughts), Parameter-Efficient Fine-Tuning (PEFT, Low-Rank Adaptation LoRA, QLoRA), Reinforcement Learning from Human Feedback (RLHF and DPO), and LLM Evaluation benchmarks.",
      topics: [
        {
          id: "nlp-u5-t1",
          title: "Prompt Engineering, Low-Rank Adaptation (LoRA), RLHF Alignment, and DPO",
          simpleExplanation: "Large Language Models like GPT-4 or Gemini have hundreds of billions of parameters. Training them from scratch costs millions of dollars. How do we customize them for specific tasks? First, Prompt Engineering guides the model using smart instructions like 'Chain-of-Thought' (asking it to think step-by-step). Second, LoRA (Low-Rank Adaptation) fine-tunes huge models on a single consumer GPU! Instead of modifying all 70 billion weights, LoRA freezes the original model and attaches tiny, lightweight mathematical matrix adapters (rank r = 8 or 16). Third, RLHF (Reinforcement Learning from Human Feedback) aligns models to be helpful, honest, and harmless using human reward ratings and Direct Preference Optimization (DPO).",
          detailedExplanation: `## 1. Advanced Prompt Engineering Paradigms

1. **Zero-Shot & Few-Shot In-Context Learning (Brown et al., 2020)**:
   - Condition the frozen LLM on $k$ input-output demonstration pairs without updating weight parameters.
2. **Chain-of-Thought (CoT) Prompting (Wei et al., 2022)**:
   - Prompts the model to generate intermediate reasoning chains: \`"Let's think step by step."\` Drastically enhances multi-step arithmetic, symbolic reasoning, and logic benchmarks.
3. **Tree-of-Thoughts (ToT) (Yao et al., 2023)**:
   - Explores multiple reasoning branches via heuristic BFS/DFS search, self-evaluating each path before proceeding.

---

## 2. Parameter-Efficient Fine-Tuning (PEFT): Low-Rank Adaptation (LoRA)

Fine-tuning all parameters $W_0 \\in \\mathbb{R}^{d \\times k}$ of an LLM is computationally prohibitive and risks catastrophic forgetting.

### LoRA Mathematical Formulation (Hu et al., Microsoft 2021):
LoRA hypothesizes that weight changes $\\Delta W$ during task adaptation have a very low **intrinsic dimension** $r \\ll \\min(d, k)$.
Freeze pre-trained weights $W_0$ and decompose the update matrix into the product of two low-rank matrices:
\\[
W = W_0 + \\Delta W = W_0 + \\frac{\\alpha}{r} (B \\cdot A)
\\]
where:
- $W_0 \\in \\mathbb{R}^{d \\times k}$ (Frozen, receives zero gradient updates).
- $A \\in \\mathbb{R}^{r \\times k}$ (Initialized with Gaussian $\\mathcal{N}(0, \\sigma^2)$).
- $B \\in \\mathbb{R}^{d \\times r}$ (Initialized with all zeros, so $\\Delta W = 0$ at start of training).
- $r$: Rank hyperparameter (typically $r \\in \\{4, 8, 16, 64\\}$).
- $\\alpha$: Constant scaling factor.

\`\`\`mermaid
flowchart LR
    Input["Input x (d-dim)"] --> Frozen["W0 (Frozen d x k Weights)"]
    Input --> LoRA_A["Matrix A (r x k, Gaussian Init)"]
    LoRA_A --> LoRA_B["Matrix B (d x r, Zero Init)"]
    LoRA_B --> Scale["Scale: * alpha / r"]
    Frozen --> Sum["(+) Output Combiner"]
    Scale --> Sum
    Sum --> Output["Output h = W0 x + delta W x"]
\`\`\`

- **Memory Efficiency**: For a 7B parameter model, LoRA reduces trainable parameters by **$99.9\\%$** (from 7,000,000,000 down to ~7,000,000), allowing full fine-tuning on a single 16GB GPU.

---

## 3. Alignment: RLHF & Direct Preference Optimization (DPO)

### Reinforcement Learning from Human Feedback (RLHF):
1. **Supervised Fine-Tuning (SFT)**: Train base model on high-quality human prompt-response demonstrations.
2. **Reward Model (RM)**: Train a scalar scoring model $r_\\psi(x, y)$ on pairs of human-ranked responses $(y_w \\succ y_l)$ using the Bradley-Terry preference loss:
   \\[
   \\mathcal{L}_{RM} = -\\mathbb{E}_{(x, y_w, y_l)} \\left[ \\log \\sigma(r_\\psi(x, y_w) - r_\\psi(x, y_l)) \\right]
   \\]
3. **PPO Policy Optimization**: Optimize policy $\\pi_\\theta$ using Proximal Policy Optimization (PPO) maximizing reward while penalizing drift from initial SFT model via Kullback-Leibler (KL) divergence:
   \\[
   \\max_\\theta \\mathbb{E}_{x \\sim D, y \\sim \\pi_\\theta} \\left[ r_\\psi(x, y) - \\beta D_{KL}(\\pi_\\theta(y \\mid x) \\parallel \\pi_{SFT}(y \\mid x)) \\right]
   \\]

### Direct Preference Optimization (DPO - Rafailov et al., Stanford 2023):
Bypasses the unstable training of an explicit reward model and RL/PPO loop entirely. DPO derives an exact closed-form substitution expressing the reward directly in terms of policy probabilities:
\\[
\\mathcal{L}_{DPO}(\\pi_\\theta; \\pi_{ref}) = -\\mathbb{E}_{(x, y_w, y_l)} \\left[ \\log \\sigma \\left( \\beta \\log \\frac{\\pi_\\theta(y_w \\mid x)}{\\pi_{ref}(y_w \\mid x)} - \\beta \\log \\frac{\\pi_\\theta(y_l \\mid x)}{\\pi_{ref}(y_l \\mid x)} \\right) \\right]
\\]`,
          shortNotes: "CoT prompting triggers step-by-step reasoning. LoRA freezes W0 and adds low-rank Delta W = (alpha/r) * B * A, reducing parameters by 99.9%. RLHF trains reward model + PPO; DPO aligns directly using preference loss.",
          examples: [
            {
              title: "Python Implementation: LoRA Matrix Parameter Reduction & Forward Pass",
              problem: "Demonstrate LoRA low-rank weight adaptation and calculate parameter count reduction compared to full fine-tuning.",
              explanation: "Initializes frozen base weights and trainable low-rank adapters A and B, verifying that output matches W0 + (alpha/r)*B*A.",
              code: `import numpy as np

# Layer dimensions: d_in = 4096, d_out = 4096 (Standard 7B LLM MLP projection)
d_in = 4096
d_out = 4096
rank_r = 8
alpha = 16.0
scaling = alpha / rank_r

# Full fine-tuning parameters: 4096 * 4096 = 16,777,216
full_params = d_in * d_out

# LoRA parameters: Matrix A (8 * 4096) + Matrix B (4096 * 8) = 65,536
lora_A_params = rank_r * d_in
lora_B_params = d_out * rank_r
total_lora_params = lora_A_params + lora_B_params

reduction_pct = (1 - total_lora_params / full_params) * 100

print(f"Full Fine-Tuning Parameter Count: {full_params:,}")
print(f"LoRA (Rank {rank_r}) Parameter Count:     {total_lora_params:,}")
print(f"Parameter Reduction:              {reduction_pct:.3f}% reduction!")

# Simulated Forward Pass
np.random.seed(42)
x = np.random.randn(1, d_in)
W_0 = np.random.randn(d_out, d_in) * 0.02  # Frozen base model

# LoRA weights initialization
A = np.random.randn(rank_r, d_in) * (1.0 / np.sqrt(d_in))
B = np.zeros((d_out, rank_r))  # Initialized to 0 so delta W = 0 at step 0

# Forward pass: h = x @ W_0^T + scaling * (x @ A^T @ B^T)
base_output = x @ W_0.T
lora_output = (x @ A.T) @ B.T * scaling
final_output = base_output + lora_output

print(f"\\nInitial LoRA contribution norm: {np.linalg.norm(lora_output):.6f} (Guarantees zero degradation at step 0)")
print(f"Final Combined Output Shape:    {final_output.shape}")`,
              output: `Full Fine-Tuning Parameter Count: 16,777,216
LoRA (Rank 8) Parameter Count:     65,536
Parameter Reduction:              99.609% reduction!

Initial LoRA contribution norm: 0.000000 (Guarantees zero degradation at step 0)
Final Combined Output Shape:    (1, 4096)`
            }
          ],
          keyPoints: [
            "Chain-of-Thought (CoT) prompting elicits multi-step reasoning by including intermediate derivation steps.",
            "LoRA decomposes parameter updates into low-rank matrices delta W = B * A, reducing parameters by >99%.",
            "Matrix B is initialized to all zeroes to ensure output at step 0 is identical to the base pre-trained model.",
            "RLHF aligns LLMs via Supervised Fine-Tuning, Reward Modeling, and PPO Reinforcement Learning.",
            "Direct Preference Optimization (DPO) achieves alignment directly via closed-form policy optimization without PPO."
          ],
          theoryQuestions: [
            {
              question: "Explain the mathematics of Low-Rank Adaptation (LoRA). How does it achieve significant memory and computational savings while maintaining competitive performance?",
              marks: "7 Marks",
              answer: "Pre-trained language model weight matrices W_0 in R^{d x k} have full rank. However, Aghajanyan et al. showed that adapting models to specific downstream tasks has a low 'intrinsic dimension'. LoRA freezes the pre-trained weights W_0 and constrains the weight update delta W by representing it as the product of two low-rank matrices: delta W = (alpha / r) * B * A, where B in R^{d x r} and A in R^{r x k}, with rank r << min(d, k). During training, W_0 receives no gradient updates; only A and B are trained. Matrix A is initialized with random Gaussian values and B is initialized to 0, ensuring delta W = 0 at the start of training. For rank r=8 on a 4096x4096 weight matrix, parameters drop from 16.7M down to 65.5K (a 99.6% reduction). This drastically reduces GPU VRAM consumption for optimizer states (Adam stores 2 additional floats per parameter) and completely eliminates storage overhead when serving multiple fine-tuned models by simply swapping adapter matrices."
            }
          ],
          mcqs: [
            {
              question: "In LoRA (Low-Rank Adaptation), why is the adapter matrix B initialized to all zeros at the start of training?",
              options: [
                "To ensure that Delta W is exactly zero, so the model begins training with the exact pre-trained behavior without degradation",
                "To prevent division by zero in gradient descent",
                "Because zero matrices require zero GPU memory",
                "To enforce sparsity in the attention weights"
              ],
              correctIndex: 0,
              explanation: "Because Delta W = B * A, setting B = 0 ensures that Delta W = 0 initially, meaning the model's forward pass at iteration 0 is mathematically identical to the unperturbed pre-trained model."
            }
          ]
        }
      ]
    }
  ]
};
