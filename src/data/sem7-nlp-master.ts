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
    }
  ]
};
