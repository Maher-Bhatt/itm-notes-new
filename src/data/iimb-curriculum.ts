// =============================================================================
// IIM BANGALORE (IIMB) CURRICULUM & SYLLABUS TOPIC COUNT TAXONOMY (2026-2027)
// Deep-researched against IIMB PGP (MBA), PGP-BA (Business Analytics),
// DCAL (Data Centre and Analytics Lab), and AICTE/UGC topic count benchmarks.
// =============================================================================

export interface TopicUnit {
  unitNumber: number;
  unitTitle: string;
  topicCount: number;
  topics: string[];
}

export interface IIMBCourse {
  id: string;
  code: string;
  name: string;
  department: 'Decision Sciences' | 'Business Analytics' | 'Finance & Accounting' | 'Marketing' | 'Operations' | 'Strategy';
  program: 'PGP (MBA)' | 'PGP-BA (Business Analytics)' | 'IIMBx Executive';
  term: 'Term I' | 'Term II' | 'Term III' | 'Term IV' | 'Term V' | 'Term VI';
  credits: number;
  totalTopics: number;
  description: string;
  leadFaculty: string;
  pedagogy: string;
  toolsUsed: string[];
  keyCaseStudies: string[];
  units: TopicUnit[];
}

export interface DegreeTopicStat {
  degree: string;
  durationYears: number;
  totalSemesters: number;
  totalTheorySubjects: number;
  avgUnitsPerSubject: number;
  avgTopicsPerUnit: number;
  totalSyllabusTopics: number;
  practicalLabsCount: number;
  labExperimentsCount: number;
  totalGraduationUnits: number;
  keyDisciplineFocus: string;
}

export interface UniversityComparison {
  dimension: string;
  iitBombay: string;
  iimBangalore: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. DEGREE-WIDE SYLLABUS TOPIC COUNT TAXONOMY
// ─────────────────────────────────────────────────────────────────────────────
export const DEGREE_TOPIC_STATISTICS: DegreeTopicStat[] = [
  {
    degree: 'B.Tech in Artificial Intelligence & Data Science',
    durationYears: 4,
    totalSemesters: 8,
    totalTheorySubjects: 38,
    avgUnitsPerSubject: 5,
    avgTopicsPerUnit: 10,
    totalSyllabusTopics: 1900,
    practicalLabsCount: 16,
    labExperimentsCount: 192,
    totalGraduationUnits: 2092,
    keyDisciplineFocus: 'Machine Learning, Deep Neural Nets, Calculus, Linear Algebra, MLOps & Big Data Pipelines',
  },
  {
    degree: 'B.Tech in Computer Science & Engineering (CSE)',
    durationYears: 4,
    totalSemesters: 8,
    totalTheorySubjects: 42,
    avgUnitsPerSubject: 5,
    avgTopicsPerUnit: 9,
    totalSyllabusTopics: 1890,
    practicalLabsCount: 18,
    labExperimentsCount: 216,
    totalGraduationUnits: 2106,
    keyDisciplineFocus: 'Data Structures, Operating Systems, Computer Architecture, Compilers & Distributed Systems',
  },
  {
    degree: 'BCA (Bachelor of Computer Applications)',
    durationYears: 3,
    totalSemesters: 6,
    totalTheorySubjects: 30,
    avgUnitsPerSubject: 5,
    avgTopicsPerUnit: 9,
    totalSyllabusTopics: 1350,
    practicalLabsCount: 12,
    labExperimentsCount: 144,
    totalGraduationUnits: 1494,
    keyDisciplineFocus: 'Web Development, DBMS, OOP in Java, Python Programming & Cloud Fundamentals',
  },
  {
    degree: 'MCA (Master of Computer Applications)',
    durationYears: 2,
    totalSemesters: 4,
    totalTheorySubjects: 20,
    avgUnitsPerSubject: 5,
    avgTopicsPerUnit: 10,
    totalSyllabusTopics: 1000,
    practicalLabsCount: 8,
    labExperimentsCount: 112,
    totalGraduationUnits: 1112,
    keyDisciplineFocus: 'Enterprise Software, Advanced AI/ML, Cloud Architecture, Microservices & Deep Learning',
  },
  {
    degree: 'MBA / PGP at IIM Bangalore (IIMB)',
    durationYears: 2,
    totalSemesters: 6,
    totalTheorySubjects: 28,
    avgUnitsPerSubject: 5,
    avgTopicsPerUnit: 8,
    totalSyllabusTopics: 1120,
    practicalLabsCount: 6,
    labExperimentsCount: 72,
    totalGraduationUnits: 1192,
    keyDisciplineFocus: 'Decision Sciences, Predictive Modeling, Corporate Finance, Platform Strategy & Supply Chain',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 2. IIM BANGALORE (IIMB) MASTER SUBJECTS & DETAILED TOPICS REGISTRY
// ─────────────────────────────────────────────────────────────────────────────
export const IIMB_COURSES_REGISTRY: IIMBCourse[] = [
  // ─── 1. DECISION SCIENCES I ───────────────────────────────────────────────
  {
    id: 'iimb-ds1',
    code: 'DS-101',
    name: 'Decision Sciences I: Probability & Business Statistics',
    department: 'Decision Sciences',
    program: 'PGP (MBA)',
    term: 'Term I',
    credits: 3,
    totalTopics: 42,
    description: 'Foundational quantitative methods for managerial decision-making: descriptive analytics, discrete & continuous probability models, sampling distributions, and statistical hypothesis testing with spreadsheet modeling.',
    leadFaculty: 'Prof. U Dinesh Kumar / Prof. Shankar Venkatagiri',
    pedagogy: 'Harvard Business Case Studies + Interactive Microsoft Excel / Python Jupyter Labs + Real-World Market Datasets',
    toolsUsed: ['Python', 'Excel Solver', 'RStudio', 'Jupyter'],
    keyCaseStudies: [
      'Credit Risk Scoring at HDFC Retail Banking',
      'Quality Control & Defect Sampling at Tata Motors Assembly',
      'A/B Testing Conversion Optimization at Flipkart',
    ],
    units: [
      {
        unitNumber: 1,
        unitTitle: 'Descriptive Analytics & Visual Data Summarization',
        topicCount: 8,
        topics: [
          'Types of Data: Nominal, Ordinal, Interval, and Ratio Scales',
          'Measures of Central Tendency: Arithmetic Mean, Weighted Mean, Median, Mode',
          'Measures of Dispersion: Variance, Standard Deviation, Interquartile Range (IQR)',
          'Shape of Distributions: Skewness, Kurtosis, and Normal QQ-Plots',
          'Visual Analytics: Histograms, Box-and-Whisker Plots, Scatter Matrices',
          'Outlier Detection Rules: Tukey 1.5xIQR Rule and Z-Score Standardized Thresholds',
          'Covariance and Pearson Correlation Matrix Computation',
          'Handling Missing Values and Data Imputation in Business Spreadsheets',
        ],
      },
      {
        unitNumber: 2,
        unitTitle: 'Probability Theory & Conditional Probability in Business',
        topicCount: 8,
        topics: [
          'Sample Spaces, Elementary Events, Mutually Exclusive & Collective Exhaustion',
          'Axioms of Probability and Addition Rules for Compound Events',
          'Conditional Probability and Multiplicative Law of Probability',
          'Independence of Random Events in Financial Markets',
          'Bayes Theorem Derivation and Prior vs Posterior Odds Formulation',
          'Medical Diagnostic Screening: Sensitivity, Specificity, and Positive Predictive Value (PPV)',
          'Decision Trees under Probabilistic Uncertainty',
          'Expected Value of Perfect Information (EVPI) and Risk Assessment',
        ],
      },
      {
        unitNumber: 3,
        unitTitle: 'Discrete & Continuous Probability Distributions',
        topicCount: 9,
        topics: [
          'Discrete Random Variables: Probability Mass Function (PMF) & Cumulative Distribution (CDF)',
          'Expected Value E[X] and Variance Var(X) Properties',
          'Binomial Distribution: Assumptions, Formula, and Customer Churn Trials',
          'Poisson Distribution: Arrival Rates, Call Center Workloads, Queuing Arrivals',
          'Hypergeometric Distribution: Sampling without Replacement in Auditing',
          'Continuous Random Variables: Probability Density Function (PDF)',
          'Uniform Distribution in Risk and Simulation Modeling',
          'Normal (Gaussian) Distribution: Empirical Rule (68-95-99.7) and Z-Transformation',
          'Exponential Distribution: Memoryless Property and Equipment Time-to-Failure (MTBF)',
        ],
      },
      {
        unitNumber: 4,
        unitTitle: 'Sampling Distributions & The Central Limit Theorem',
        topicCount: 8,
        topics: [
          'Population Parameters vs Sample Statistics',
          'Simple Random Sampling, Stratified Sampling, and Cluster Sampling Schemes',
          'Sampling Distribution of the Sample Mean and Standard Error (SE)',
          'Central Limit Theorem (CLT) Mathematical Proof & Business Simulation',
          'Finite Population Correction (FPC) Factor',
          'Point Estimation: Unbiasedness, Consistency, and Efficiency',
          'Confidence Interval for Population Mean with Known Variance (Z-Distribution)',
          'Student t-Distribution and Degrees of Freedom for Unknown Variance',
        ],
      },
      {
        unitNumber: 5,
        unitTitle: 'Statistical Hypothesis Testing for Managerial Decisions',
        topicCount: 9,
        topics: [
          'Formulating Null (H0) and Alternative (H1) Hypotheses in Management',
          'Type I Error (Alpha) and Type II Error (Beta) Trade-offs in Business',
          'P-Value Interpretation and Critical Value Decision Boundaries',
          'One-Tailed vs Two-Tailed Hypothesis Tests',
          'One-Sample and Two-Sample Independent t-Tests for Market Differences',
          'Paired t-Test for Before-and-After Employee Training Evaluation',
          'One-Way Analysis of Variance (ANOVA): F-Statistic and Sum of Squares',
          'Post-hoc Pairwise Comparisons: Tukey HSD and Bonferroni Corrections',
          'Chi-Square Test of Independence for Consumer Demographic Segmentation',
        ],
      },
    ],
  },

  // ─── 2. DECISION SCIENCES II ──────────────────────────────────────────────
  {
    id: 'iimb-ds2',
    code: 'DS-201',
    name: 'Decision Sciences II: Prescriptive Analytics & Optimization',
    department: 'Decision Sciences',
    program: 'PGP (MBA)',
    term: 'Term II',
    credits: 3,
    totalTopics: 44,
    description: 'Prescriptive analytics, mathematical optimization, linear programming, sensitivity analysis, integer programming, multiple regression modeling, and Monte Carlo decision simulations.',
    leadFaculty: 'Prof. Jishnu Hazra / Prof. U Dinesh Kumar',
    pedagogy: 'Management Decision Cases + Gurobi / Excel Solver Optimization + Empirical Regression Labs',
    toolsUsed: ['Python', 'Gurobi', 'Excel Solver', 'Statsmodels', 'Scikit-Learn'],
    keyCaseStudies: [
      'Supply Chain Distribution Network at Asian Paints',
      'Revenue Management & Dynamic Seat Allocation at IndiGo Airlines',
      'Portfolio Asset Allocation at ICICI Prudential AMC',
    ],
    units: [
      {
        unitNumber: 1,
        unitTitle: 'Simple & Multiple Linear Regression Modeling',
        topicCount: 9,
        topics: [
          'Ordinary Least Squares (OLS) Principle and Objective Minimization',
          'Derivation of Slope (Beta1) and Intercept (Beta0) Estimators',
          'Coefficient of Determination (R-Squared) and Adjusted R-Squared',
          'Multiple Linear Regression: Model Matrix Formulation Y = X*Beta + Epsilon',
          'F-Test for Overall Model Significance and Individual t-Tests for Predictors',
          'Dummy Variables and Interaction Effects for Categorical Business Features',
          'Standardized Beta Coefficients and Relative Feature Importance',
          'Logarithmic and Polynomial Transformations for Non-Linear Demand Curves',
          'Interpreting Elasticities from Log-Log Econometric Demand Equations',
        ],
      },
      {
        unitNumber: 2,
        unitTitle: 'Regression Diagnostics & Econometric Assumptions',
        topicCount: 9,
        topics: [
          'Gauss-Markov Assumptions: Linearity, Exogeneity, Homoscedasticity',
          'Detecting Multicollinearity: Variance Inflation Factor (VIF) and Condition Index',
          'Remedies for Multicollinearity: Ridge Regression, PCA Feature Extraction',
          'Heteroscedasticity: Breusch-Pagan Test and White Robust Standard Errors',
          'Autocorrelation in Time Series Residuals: Durbin-Watson Test',
          'Normality of Residuals: Shapiro-Wilk Test and Jarque-Bera Test',
          'Identifying Influential Outliers: Leverage Values, Studentized Residuals, Cooks Distance',
          'Model Selection Criteria: Akaike Information Criterion (AIC) and Bayesian IC (BIC)',
          'Stepwise Regression: Forward Addition, Backward Elimination, and Stepwise Search',
        ],
      },
      {
        unitNumber: 3,
        unitTitle: 'Linear Programming (LP) & Managerial Optimization',
        topicCount: 9,
        topics: [
          'Mathematical Formulation of Linear Programming Problems (LPP)',
          'Decision Variables, Objective Function (Max/Min), and Linear Constraints',
          'Graphical Solution Method for Two-Variable Product Mix Problems',
          'Corner Point (Extreme Point) Feasible Region Property',
          'Standard Form LPP: Slack, Surplus, and Artificial Variables',
          'The Simplex Algorithm: Tableau Representation, Pivot Operations, and Optimality',
          'Big-M Method and Two-Phase Simplex for Greater-than-or-Equal Constraints',
          'Degeneracy, Multiple Optimal Solutions, and Unbounded Feasibility Cases',
          'Transportation Problem: North-West Corner, Vogel Approximation, and MODI Method',
        ],
      },
      {
        unitNumber: 4,
        unitTitle: 'Duality & Sensitivity Analysis for Business Decisions',
        topicCount: 8,
        topics: [
          'Primal-Dual Relationships and Economic Interpretation of the Dual',
          'Shadow Prices (Dual Variables): Marginal Value of Resource Availability',
          'Allowable Increase and Decrease for Objective Function Coefficients',
          'Right-Hand Side (RHS) Constraint Ranging and 100 Percent Rule',
          'Reduced Cost of Non-Basic Decision Variables in Product Introduction',
          'Post-Optimality Analysis: Adding New Products or Regulatory Constraints',
          'Dual Simplex Algorithm for Re-optimization After Parameter Shifts',
          'Managerial Interpretation of Slack Capacity and Bottleneck Resources',
        ],
      },
      {
        unitNumber: 5,
        unitTitle: 'Integer Programming & Monte Carlo Decision Simulation',
        topicCount: 9,
        topics: [
          'Pure Integer, Mixed-Integer (MILP), and Binary (0-1) Programming Formulations',
          'Capital Budgeting and Project Selection via Binary Variables',
          'Facility Location and Fixed-Charge Optimization Models',
          'Branch-and-Bound Algorithm for Integer Linear Programs',
          'Cutting Plane Methods (Gomory Cuts) for Integer Polyhedra',
          'Monte Carlo Simulation Architecture: Generating Pseudo-Random Numbers',
          'Probability Distribution Fitting for Uncertain Business Parameters',
          'Simulating Risk Profiles: Net Present Value (NPV) at Risk and Value at Risk (VaR)',
          'Sensitivity Tornado Charts for Enterprise Risk Mitigation',
        ],
      },
    ],
  },

  // ─── 3. PREDICTIVE ANALYTICS & MACHINE LEARNING ───────────────────────────
  {
    id: 'iimb-pred-ml',
    code: 'BA-401',
    name: 'Predictive Analytics & Machine Learning for Business',
    department: 'Business Analytics',
    program: 'PGP-BA (Business Analytics)',
    term: 'Term IV',
    credits: 3,
    totalTopics: 48,
    description: 'Advanced predictive modeling and applied machine learning: classification pipelines, logistic regression, decision trees, ensemble methods (Random Forest, XGBoost), clustering, and time series econometrics.',
    leadFaculty: 'Prof. U Dinesh Kumar',
    pedagogy: 'Wiley "Business Analytics: Science of Data-Driven Decision Making" Framework + Live Kaggle/Enterprise Case Contests',
    toolsUsed: ['Python', 'Scikit-Learn', 'Pandas', 'XGBoost', 'LightGBM', 'Seaborn'],
    keyCaseStudies: [
      'Customer Churn Prediction at Bharti Airtel',
      'Fraud Detection in Real-Time UPI Digital Payments',
      'Demand Forecasting and Safety Stock for Amazon India Warehouses',
    ],
    units: [
      {
        unitNumber: 1,
        unitTitle: 'Supervised Learning Framework & Model Validation',
        topicCount: 10,
        topics: [
          'Predictive Modeling Workflow: Problem Formulation to Deployment',
          'Feature Engineering: One-Hot Encoding, Target Encoding, Box-Cox Transformation',
          'Train, Validation, and Test Dataset Partitioning Strategy',
          'K-Fold Cross-Validation and Stratified K-Fold for Imbalanced Data',
          'The Bias-Variance Tradeoff: Underfitting vs Overfitting Mechanics',
          'Regularization Techniques: L1 Lasso (Feature Sparsity) and L2 Ridge (Shrinkage)',
          'ElasticNet Regularization for Correlated Predictor Sets',
          'Hyperparameter Optimization: GridSearchCV vs RandomizedSearchCV vs Bayesian',
          'Data Leakage Traps in Business Analytics and Preventative Pipelines',
          'Scikit-Learn Pipeline Architecture: ColumnTransformer and Custom Estimators',
        ],
      },
      {
        unitNumber: 2,
        unitTitle: 'Classification Models & Logistic Regression',
        topicCount: 10,
        topics: [
          'Binary Classification: Why Linear Regression Fails for Probability Bounds',
          'Logistic (Sigmoid) Function and Logit Link Formulation',
          'Maximum Likelihood Estimation (MLE) for Logistic Regression Parameters',
          'Interpreting Odds Ratios (OR) and Marginal Effects in Business Context',
          'Confusion Matrix Metrics: Accuracy, Precision, Recall (Sensitivity), Specificity',
          'F1-Score and Beta-Weighted F-Beta Score for Asymmetric Business Costs',
          'Receiver Operating Characteristic (ROC) Curve and Area Under Curve (AUC)',
          'Precision-Recall (PR) Curves for Rare Event Detection (Fraud, Defaults)',
          'Optimal Classification Threshold Tuning via Expected Cost Minimization',
          'Handling Class Imbalance: SMOTE (Oversampling) and Class-Weight Penalty',
        ],
      },
      {
        unitNumber: 3,
        unitTitle: 'Tree-Based Algorithms & Ensemble Learning',
        topicCount: 10,
        topics: [
          'Decision Tree Architecture: Root, Internal Decision Nodes, and Leaf Outputs',
          'Splitting Criteria for Classification: Gini Impurity vs Information Gain (Entropy)',
          'Splitting Criteria for Regression: Mean Squared Error (MSE) Reduction',
          'Pruning Strategies: Pre-pruning (Max Depth, Min Samples) and Cost-Complexity (ccp_alpha)',
          'Bagging (Bootstrap Aggregation): Reducing Model Variance',
          'Random Forest: Random Feature Subspaces and Out-of-Bag (OOB) Error Estimation',
          'Feature Importance Measures: Mean Decrease Impurity (MDI) vs Permutation Importance',
          'Boosting Philosophy: Converting Weak Learners into Strong Predictive Ensembles',
          'Gradient Boosting Machines (GBM): Loss Function Optimization via Gradient Descent',
          'XGBoost & LightGBM: Histogram Binning, Leaf-wise Splits, and Early Stopping',
        ],
      },
      {
        unitNumber: 4,
        unitTitle: 'Unsupervised Learning & Customer Segmentation',
        topicCount: 9,
        topics: [
          'Unsupervised Analytics in Business: Discovering Hidden Customer Personas',
          'Distance Metrics in Feature Space: Euclidean, Manhattan, Mahalanobis, Cosine',
          'K-Means Clustering Algorithm: Centroid Initialization, Assignment, and Convergence',
          'Determining Optimal Clusters: Elbow Method (Inertia) and Silhouette Analysis',
          'K-Means++ Initialization for Faster Convergence and Better Local Minima',
          'Hierarchical Clustering: Agglomerative vs Divisive, Dendrogram Interpretation',
          'Linkage Criteria: Ward Minimum Variance, Complete, and Average Linkage',
          'Principal Component Analysis (PCA): Eigenvalue Decomposition and Scree Plot',
          'PCA Dimensionality Reduction for High-Dimensional Retail Scanning Data',
        ],
      },
      {
        unitNumber: 5,
        unitTitle: 'Time Series Forecasting & Econometric Dynamics',
        topicCount: 9,
        topics: [
          'Components of Time Series: Trend, Seasonality, Cyclical, and Irregular Noise',
          'Decomposition Methods: Additive vs Multiplicative Classical Models',
          'Stationarity Requirement: Weak Stationarity and Augmented Dickey-Fuller (ADF) Test',
          'Differencing and Seasonal Differencing for Trend Removal',
          'Exponential Smoothing Methods: Simple SES, Holt Linear Trend, and Holt-Winters',
          'Autoregressive (AR) and Moving Average (MA) Stochastic Models',
          'Autocorrelation Function (ACF) and Partial Autocorrelation (PACF) Plots',
          'Autoregressive Integrated Moving Average: ARIMA(p,d,q) Parameter Selection',
          'Seasonal ARIMA (SARIMAX) with External Economic Exogenous Regressors',
        ],
      },
    ],
  },

  // ─── 4. DEEP LEARNING & GENERATIVE AI FOR BUSINESS ────────────────────────
  {
    id: 'iimb-dl-genai',
    code: 'BA-502',
    name: 'Deep Learning & Generative AI for Business Transformation',
    department: 'Business Analytics',
    program: 'PGP-BA (Business Analytics)',
    term: 'Term V',
    credits: 3,
    totalTopics: 44,
    description: 'Neural network architectures, deep learning with PyTorch, computer vision in retail, sequence modeling in finance, NLP transformers, Large Language Models (LLMs), RAG pipelines, and AI enterprise governance.',
    leadFaculty: 'Prof. U Dinesh Kumar / Prof. Pulak Ghosh',
    pedagogy: 'PyTorch Cloud GPU Notebooks + Enterprise Generative AI Architectures + Ethical Case Debates',
    toolsUsed: ['PyTorch', 'Hugging Face', 'LangChain', 'ChromaDB', 'OpenAI API', 'Ollama'],
    keyCaseStudies: [
      'Enterprise Knowledge Retrieval (RAG) at Infosys Consulting',
      'Automated Medical Claim Processing with Vision & OCR at Star Health',
      'Algorithmic Trading Sentiment Extraction from Bloomberg Financial News',
    ],
    units: [
      {
        unitNumber: 1,
        unitTitle: 'Deep Neural Networks & Backpropagation Foundations',
        topicCount: 9,
        topics: [
          'Biological Neuron to Artificial Perceptron Mathematical Mapping',
          'Activation Functions: Sigmoid, Tanh, ReLU, Leaky ReLU, Softmax',
          'Multi-Layer Perceptron (MLP) Architecture and Matrix Forward Propagation',
          'Loss Functions: Binary Cross-Entropy, Categorical Cross-Entropy, MSE, Huber',
          'Backpropagation Algorithm: Chain Rule of Partial Derivatives',
          'Optimization Algorithms: SGD, Momentum, RMSprop, Adam, AdamW',
          'Deep Learning Overfitting Remedies: Dropout Layers, L2 Weight Decay, Early Stopping',
          'Batch Normalization and Layer Normalization for Stable Training Gradients',
          'Building Custom Feedforward Neural Networks in PyTorch (`nn.Module`)',
        ],
      },
      {
        unitNumber: 2,
        unitTitle: 'Computer Vision in Retail & Manufacturing',
        topicCount: 9,
        topics: [
          '2D Image Representations as Tensors (Height x Width x Channels)',
          'Convolution Operations: Filters, Kernels, Stride, Padding (Valid vs Same)',
          'Pooling Layers: MaxPooling and AveragePooling for Spatial Downsampling',
          'Classic CNN Architectures: LeNet, AlexNet, VGG, ResNet (Residual Skip Connections)',
          'Transfer Learning in PyTorch: Fine-Tuning Pretrained ResNet Models',
          'Object Detection Fundamentals: Sliding Window to YOLO and Faster R-CNN',
          'Automated Defect Inspection in Manufacturing Assembly Lines',
          'Retail Shelf Analytics: Out-of-Stock Detection using Computer Vision',
          'Facial Biometrics & Security: Cosine Similarity on Embedding Vectors',
        ],
      },
      {
        unitNumber: 3,
        unitTitle: 'Sequence Modeling & Financial Time-Series RNNs',
        topicCount: 8,
        topics: [
          'Sequential Data Structures and Limitations of Standard Feedforward Networks',
          'Recurrent Neural Network (RNN) Architecture and Hidden State Memory Loop',
          'Vanishing and Exploding Gradient Problem in Long Sequences (BPTT)',
          'Long Short-Term Memory (LSTM) Networks: Forget, Input, Output Gates',
          'Gated Recurrent Units (GRU): Reset and Update Gate Formulations',
          'Bidirectional RNNs for Comprehensive Contextual Encoding',
          'Multi-Step Demand & Stock Price Volatility Forecasting using LSTM',
          'Attention Mechanism: Bahdanau Additive vs Luong Multiplicative Attention',
        ],
      },
      {
        unitNumber: 4,
        unitTitle: 'Natural Language Processing & Transformer Architecture',
        topicCount: 9,
        topics: [
          'NLP Text Preprocessing: Tokenization, Stemming, Lemmatization, Stop Words',
          'Word Embeddings: Word2Vec (CBOW, Skip-Gram), GloVe, and Semantic Vectors',
          'The Transformer Revolution: "Attention Is All You Need" Core Architecture',
          'Scaled Dot-Product Attention Formula: Query (Q), Key (K), Value (V) Tensors',
          'Multi-Head Self-Attention and Positional Encoding Techniques',
          'Encoder-Only Models: BERT Architecture and Masked Language Modeling (MLM)',
          'Customer Sentiment Classification on E-Commerce Product Reviews',
          'Named Entity Recognition (NER) for Legal & Financial Contracts',
          'Topic Modeling using Latent Dirichlet Allocation (LDA) and BERTopic',
        ],
      },
      {
        unitNumber: 5,
        unitTitle: 'Generative AI, Large Language Models (LLMs) & Enterprise RAG',
        topicCount: 9,
        topics: [
          'Decoder-Only Architectures: GPT-style Autoregressive Next-Token Prediction',
          'Pretraining vs Supervised Fine-Tuning (SFT) vs RLHF / DPO Alignment',
          'Parameter-Efficient Fine-Tuning (PEFT): Low-Rank Adaptation (LoRA / QLoRA)',
          'Prompt Engineering: Few-Shot, Chain-of-Thought (CoT), ReAct Framework',
          'Retrieval-Augmented Generation (RAG) Architecture for Enterprise Databases',
          'Vector Databases: Indexing with HNSW, FAISS, ChromaDB, Cosine Distance',
          'Semantic Chunking Strategies and Hybrid Search (BM25 + Dense Vectors)',
          'Agentic AI Workflows: Tool Calling, Self-Reflection, LangChain, LlamaIndex',
          'AI Ethics, Hallucination Audits, Copyright, and Responsible AI Governance',
        ],
      },
    ],
  },

  // ─── 5. CORPORATE FINANCE & FINANCIAL VALUATION ───────────────────────────
  {
    id: 'iimb-fin-val',
    code: 'FA-202',
    name: 'Corporate Finance & Valuation',
    department: 'Finance & Accounting',
    program: 'PGP (MBA)',
    term: 'Term II',
    credits: 3,
    totalTopics: 40,
    description: 'Corporate capital budgeting, capital structure decisions, cost of capital, dividend policy, discounted cash flow (DCF) valuation, relative valuation multiples, and mergers & acquisitions financing.',
    leadFaculty: 'Prof. M S Narasimhan / Prof. P C Narayan',
    pedagogy: 'Harvard Business Financial Cases + Financial Modeling in Excel + Wall Street Earnings Calls',
    toolsUsed: ['Excel', 'Bloomberg Terminal', 'Python FinTech', 'CapIQ'],
    keyCaseStudies: [
      'Valuation of Tata Motors Acquisition of Jaguar Land Rover (JLR)',
      'Capital Structure & Debt Overhang at Reliance Industries',
      'Valuation of Zomato IPO and Tech Platform Unit Economics',
    ],
    units: [
      {
        unitNumber: 1,
        unitTitle: 'Time Value of Money & Fixed Income Valuation',
        topicCount: 8,
        topics: [
          'Future Value (FV) and Present Value (PV) of Lump Sums and Cash Flows',
          'Ordinary Annuities, Annuities Due, and Perpetuities in Valuation',
          'Compounding Frequency: Annual, Semi-Annual, Continuous Compounding (e^rt)',
          'Nominal vs Effective Annual Rates (EAR) and Inflation Adjustments',
          'Bond Valuation: Coupon Payments, Par Value, and Market Price Equations',
          'Yield to Maturity (YTM) and Yield to Call (YTC) Calculation',
          'Interest Rate Risk: Macaulay Duration and Modified Duration',
          'Term Structure of Interest Rates and Yield Curve Theories',
        ],
      },
      {
        unitNumber: 2,
        unitTitle: 'Capital Budgeting Decisions & Investment Criteria',
        topicCount: 8,
        topics: [
          'Net Present Value (NPV) Rule and Value Additivity Property',
          'Internal Rate of Return (IRR) and Pitfalls: Multiple IRRs, Reinvestment Rate',
          'Modified Internal Rate of Return (MIRR) Formulation',
          'Payback Period and Discounted Payback Period in Corporate Risk',
          'Profitability Index (PI) for Capital Rationing Situations',
          'Estimating Project Cash Flows: Sunk Costs, Opportunity Costs, Working Capital',
          'Depreciation Tax Shields: Straight-Line vs MACRS / WDV Methods',
          'Equivalent Annual Cost (EAC) for Projects with Unequal Lifespans',
        ],
      },
      {
        unitNumber: 3,
        unitTitle: 'Risk, Return & The Weighted Average Cost of Capital (WACC)',
        topicCount: 8,
        topics: [
          'Expected Return and Variance of Portfolios (Markowitz Modern Portfolio Theory)',
          'Systematic (Market) Risk vs Unsystematic (Diversifiable) Risk',
          'The Capital Asset Pricing Model (CAPM): Beta Estimation and Security Market Line (SML)',
          'Estimating Cost of Equity (Ke): CAPM vs Dividend Discount Model (DDM)',
          'Cost of Debt (Kd) and Corporate Marginal Tax Rate Shield Effect',
          'Cost of Preferred Stock and Hybrid Securities',
          'Weighted Average Cost of Capital (WACC) Formula and Market Value Weights',
          'Adjusted Present Value (APV) Approach for Highly Leveraged Buyouts',
        ],
      },
      {
        unitNumber: 4,
        unitTitle: 'Corporate Valuation: DCF & Relative Multiples',
        topicCount: 8,
        topics: [
          'Free Cash Flow to Firm (FCFF) Derivation from Operating Income (EBIT)',
          'Free Cash Flow to Equity (FCFE) Derivation from Net Income',
          'Forecasting Pro-Forma Income Statements and Balance Sheets',
          'Estimating Terminal Value: Gordon Growth Model vs Exit Multiple Method',
          'Enterprise Value (EV) vs Equity Value Reconciliation',
          'Comparable Company Analysis (Trading Comps): EV/EBITDA, P/E, P/B, EV/Sales',
          'Precedent Transaction Multiples in M&A Deal Benchmarking',
          'Sum-of-the-Parts (SOTP) Valuation for Multi-Division Conglomerates',
        ],
      },
      {
        unitNumber: 5,
        unitTitle: 'Capital Structure, Dividends & Corporate Restructuring',
        topicCount: 8,
        topics: [
          'Modigliani-Miller Theorem: Capital Structure Irrelevance (Proposition I & II)',
          'Trade-off Theory: Balancing Tax Shields against Bankruptcy Distress Costs',
          'Pecking Order Theory: Asymmetric Information and Financing Hierarchy',
          'Dividend Policy: Dividend Discount Model, Share Buybacks, Signalling Effects',
          'Mergers & Acquisitions (M&A): Strategic Motives, Synergies (Cost vs Revenue)',
          'Deal Structuring: Cash vs Stock Mergers, Exchange Ratios, EPS Accretion/Dilution',
          'Corporate Divestitures, Carve-outs, and Spin-offs',
          'Leveraged Buyout (LBO) Mechanics and Sponsor Equity Returns (IRR)',
        ],
      },
    ],
  },

  // ─── 6. MARKETING MANAGEMENT & CUSTOMER ANALYTICS ─────────────────────────
  {
    id: 'iimb-mkt-analytics',
    code: 'MKT-301',
    name: 'Marketing Management & Customer Analytics',
    department: 'Marketing',
    program: 'PGP (MBA)',
    term: 'Term I',
    credits: 3,
    totalTopics: 42,
    description: 'Strategic marketing management, segmentation, targeting, positioning (STP), customer lifetime value (CLV) models, marketing mix modeling, digital clickstream analytics, and dynamic pricing.',
    leadFaculty: 'Prof. S Ramesh Kumar / Prof. Avinash G Mulky',
    pedagogy: 'Brand Marketing Case Method + Conjoint Analysis Labs + Retail Basket Analytics',
    toolsUsed: ['R', 'Python', 'Sawtooth Conjoint', 'Tableau', 'Google Analytics'],
    keyCaseStudies: [
      'Repositioning Titan Edge: Luxury Watch Branding in Emerging Markets',
      'Dynamic Surge Pricing Strategy at Ola Cabs',
      'Omnichannel Retailing & Customer Lifetime Value at Titan Tanishq',
    ],
    units: [
      {
        unitNumber: 1,
        unitTitle: 'Strategic Marketing Framework & Consumer Behavior',
        topicCount: 8,
        topics: [
          'Strategic Marketing 3Cs: Customer, Competitor, Company Capabilities',
          'Consumer Decision-Making Journey: Need Recognition to Post-Purchase Evaluation',
          'Psychological Influences: Perception, Motivation, Attitudes, Cognitive Dissonance',
          'B2B vs B2C Buying Behavior and Buying Center Roles',
          'Market Segmentation: Geographic, Demographic, Psychographic, Behavioral',
          'Target Market Selection and Evaluating Segment Attractiveness (TAM, SAM, SOM)',
          'Positioning Strategy: Perceptual Mapping, Value Proposition, Brand Mantra',
          'Brand Equity Dimensions: Brand Awareness, Associations, Perceived Quality, Loyalty',
        ],
      },
      {
        unitNumber: 2,
        unitTitle: 'Customer Lifetime Value (CLV) & Retention Modeling',
        topicCount: 9,
        topics: [
          'Customer Centricity: From Transactional Marketing to Relationship Equity',
          'Customer Acquisition Cost (CAC) Calculation across Marketing Channels',
          'Customer Lifetime Value (CLV) Mathematical Formula with Discount Rates',
          'Retention Rate, Churn Rate, and Customer Survival Probabilities',
          'The Pareto 80/20 Rule and Whale Curve Analysis in Customer Profitability',
          'RFM (Recency, Frequency, Monetary) Scoring & Customer Tier Segmentation',
          'Survival Analysis for Customer Churn: Kaplan-Meier Curves & Cox Proportional Hazards',
          'Up-Selling, Cross-Selling, and Share-of-Wallet Maximization Models',
          'Balancing CAC and CLV: The Rule of 3x LTV/CAC in Startup Unit Economics',
        ],
      },
      {
        unitNumber: 3,
        unitTitle: 'Product Design & Conjoint Analysis',
        topicCount: 8,
        topics: [
          'Product Strategy: Core Benefit, Actual Product, Augmented Product Levels',
          'New Product Development (NPD) Funnel: Idea Generation to Commercialization',
          'Product Life Cycle (PLC): Introduction, Growth, Maturity, Decline Strategies',
          'Conjoint Analysis Principles: Decomposing Multi-Attribute Consumer Preferences',
          'Full-Profile vs Choice-Based Conjoint (CBC) Experimental Design',
          'Estimating Part-Worth Utilities using Multinomial Logit Regression',
          'Simulating Market Share under Alternative Competitor Product Feature Launches',
          'Price Elasticity of Demand and Willingness-to-Pay (WTP) Extraction',
        ],
      },
      {
        unitNumber: 4,
        unitTitle: 'Dynamic Pricing & Revenue Management',
        topicCount: 8,
        topics: [
          'Pricing Strategies: Cost-Plus, Value-Based, Competitive, Penetration, Skimming',
          'Economic Price Elasticity: Inelastic vs Elastic Pricing Strategies',
          'Price Discrimination: 1st Degree (Personalized), 2nd Degree (Volume), 3rd Degree (Segments)',
          'Revenue Management & Yield Management: Capacity Constraints and Perishable Inventory',
          'Dynamic Surge Pricing Algorithms in Ride-Hailing & Airlines',
          'Psychological Pricing: Charm Pricing, Anchoring, Decoy Effect, Price Bundling',
          'Promotional Discount Optimization and Trade Promotion Effectiveness',
          'B2B Value-in-Use Pricing Models for Enterprise SaaS Contracts',
        ],
      },
      {
        unitNumber: 5,
        unitTitle: 'Digital Marketing & Market Basket Analytics',
        topicCount: 9,
        topics: [
          'Digital Marketing Funnel: Awareness, Interest, Consideration, Conversion, Retention',
          'Search Engine Marketing (SEM): Google Ads Quality Score and Ad Auction Mechanics',
          'Search Engine Optimization (SEO): Organic Crawling, PageRank, Domain Authority',
          'Multi-Touch Attribution Models: First-Touch, Last-Touch, Linear, Data-Driven Shapley',
          'A/B Testing Experiments: Sample Size Determination, Conversion Z-Test, Lift Analysis',
          'Market Basket Analysis: Association Rule Mining (Support, Confidence, Lift)',
          'The Apriori Algorithm for Retail Cross-Merchandising Layouts',
          'Collaborative Filtering Recommendation Engines: User-User vs Item-Item Cosine Similarity',
          'Social Network Marketing: Influencer Engagement Metrics and Virality Coefficients',
        ],
      },
    ],
  },

  // ─── 7. COMPETITION, STRATEGY & PLATFORM BUSINESS MODELS ──────────────────
  {
    id: 'iimb-strat-platform',
    code: 'STR-201',
    name: 'Competition, Strategy & Platform Ecosystems',
    department: 'Strategy',
    program: 'PGP (MBA)',
    term: 'Term II',
    credits: 3,
    totalTopics: 38,
    description: 'Corporate and business unit strategy, competitive advantage, resource-based view (RBV), platform economics, multi-sided market dynamics, network effects, and digital disruption.',
    leadFaculty: 'Prof. P D Jose / Prof. Rejie George Pallathitta',
    pedagogy: 'Harvard & IIMB Strategy Cases + Platform Business Simulations + Boardroom Strategic Debates',
    toolsUsed: ['Strategy Canvas', 'VRIO Matrix', 'Value Chain Maps', 'Game Theory Models'],
    keyCaseStudies: [
      'Jio Disruption of Indian Telecom: Platform Ecosystem Building',
      'The Rise of Swiggy & Zomato: Hyperlocal Two-Sided Platform Dynamics',
      'Infosys vs TCS: Sustaining Competitive Advantage in Global IT Services',
    ],
    units: [
      {
        unitNumber: 1,
        unitTitle: 'Industry Analysis & Environmental Scanning',
        topicCount: 8,
        topics: [
          'Defining Strategy: Operational Effectiveness vs Strategic Positioning',
          'Macro-Environmental Scanning: PESTEL Framework (Political, Economic, Social, Tech, Eco, Legal)',
          'Porters Five Forces Industry Attractiveness Framework',
          'Threat of New Entrants: Economies of Scale, Capital Requirements, Switching Costs',
          'Bargaining Power of Buyers and Suppliers: Concentration and Sourcing Options',
          'Threat of Substitutes and Internal Competitive Rivalry',
          'Strategic Groups Mapping: Identifying Niche Clusters within Industries',
          'Industry Life Cycle Evolution: Fragmentation, Consolidation, Maturity, Disruption',
        ],
      },
      {
        unitNumber: 2,
        unitTitle: 'Internal Analysis & The Resource-Based View (RBV)',
        topicCount: 7,
        topics: [
          'Resource-Based View (RBV): Tangible vs Intangible Enterprise Resources',
          'The VRIO Framework: Value, Rarity, Inimitability, Organization',
          'Causal Ambiguity and Social Complexity as Barriers to Imitation',
          'Core Competencies: Identifying and Leveraging Unique Organizational Capabilities',
          'Dynamic Capabilities: Sensing, Seizing, and Transforming in Volatile Markets',
          'Porters Value Chain Analysis: Primary Activities vs Support Activities',
          'Cost Driver Analysis and Value Proposition Mapping',
        ],
      },
      {
        unitNumber: 3,
        unitTitle: 'Generic Competitive Strategies & Blue Ocean Moves',
        topicCount: 8,
        topics: [
          'Porters Generic Competitive Strategies: Cost Leadership vs Differentiation',
          'Mechanisms of Cost Leadership: Process Innovation, Global Sourcing, Learning Curve',
          'Mechanisms of Differentiation: Premium Features, Customer Service, Brand Prestige',
          'The "Stuck in the Middle" Strategic Trap and How Companies Overcome It',
          'Focus (Niche) Strategies: Cost Focus vs Differentiation Focus',
          'Blue Ocean Strategy: Value Innovation, Strategy Canvas, Four Actions Framework (ERRC)',
          'Disruptive Innovation Theory (Clayton Christensen): Low-End vs New-Market Disruption',
          'Game Theory in Business: Nash Equilibrium, Prisoners Dilemma in Price Wars',
        ],
      },
      {
        unitNumber: 4,
        unitTitle: 'Platform Business Models & Multi-Sided Market Dynamics',
        topicCount: 8,
        topics: [
          'Linear Pipeline Businesses vs Multi-Sided Platform (MSP) Ecosystems',
          'Direct (Same-Side) Network Effects: Communication Networks and Metcalfe Law',
          'Indirect (Cross-Side) Network Effects: Developers & Users, Drivers & Riders',
          'Solving the Chicken-and-Egg Cold Start Problem in Two-Sided Marketplaces',
          'Platform Monetization Strategies: Transaction Fees, Subscriptions, Advertising, Freemium',
          'Platform Governance: Rules, Curating Matchmaking Quality, Disincentivizing Bad Actors',
          'Envelopment Strategy: Entering Adjacent Platform Markets to Absorb User Bases',
          'Winner-Take-All Market Dynamics: Multihoming Costs and Differentiation Barriers',
        ],
      },
      {
        unitNumber: 5,
        unitTitle: 'Corporate Strategy: Diversification, M&A & Global Expansion',
        topicCount: 7,
        topics: [
          'Corporate-Level vs Business-Level Strategy: Defining the Scope of the Firm',
          'Vertical Integration: Backward vs Forward, Transaction Cost Economics (Make vs Buy)',
          'Horizontal Diversification: Related vs Unrelated Conglomerate Diversification',
          'Portfolio Management Matrices: BCG Growth-Share Matrix and GE-McKinsey Matrix',
          'Strategic Alliances and Joint Ventures: Governance Structures and Partner Selection',
          'Mergers & Acquisitions Strategic Integration: Post-Merger Cultural and Systems Synergy',
          'Global Expansion Frameworks: Ghemawat CAGE Distance Framework (Cultural, Admin, Geo, Econ)',
        ],
      },
    ],
  },

  // ─── 8. PRODUCTION & OPERATIONS MANAGEMENT ────────────────────────────────
  {
    id: 'iimb-ops-sc',
    code: 'POM-201',
    name: 'Production & Supply Chain Management',
    department: 'Operations',
    program: 'PGP (MBA)',
    term: 'Term II',
    credits: 3,
    totalTopics: 40,
    description: 'Operations strategy, process flow design, capacity planning, Little’s Law, inventory management (EOQ, safety stock), supply chain coordination, the bullwhip effect, and Six Sigma quality control.',
    leadFaculty: 'Prof. Jishnu Hazra / Prof. B Mahadevan',
    pedagogy: 'Process Bottleneck Simulations + The Beer Game Supply Chain Lab + Lean Six Sigma Audits',
    toolsUsed: ['SimQuick', 'Python Queueing Modules', 'Excel Solver', 'Minitab'],
    keyCaseStudies: [
      'The Dabbawalas of Mumbai: Six Sigma Operational Excellence in Logistics',
      'Zara Fast Fashion: Agile Supply Chain and Responsive Production Cycles',
      'Dell Computers: Build-to-Order Direct Model vs Traditional Distribution',
    ],
    units: [
      {
        unitNumber: 1,
        unitTitle: 'Operations Strategy & Process Flow Analysis',
        topicCount: 8,
        topics: [
          'Operations as a Source of Competitive Advantage: Cost, Quality, Time, Flexibility',
          'Process Types: Job Shop, Batch, Assembly Line, Continuous Flow, Cellular Manufacturing',
          'Process Flow Diagrams: Tasks, Inventories, Decision Points, Routing',
          'Cycle Time, Process Lead Time, and System Throughput Rate Metrics',
          'Littles Law Formulation: Inventory = Throughput Rate x Flow Time (I = R x T)',
          'Bottleneck Identification and Theory of Constraints (Goldratt Drum-Buffer-Rope)',
          'Capacity Utilization Rate and Process Efficiency Ratios',
          'Line Balancing: Precedence Diagrams, Desired Cycle Time, Minimum Workstations',
        ],
      },
      {
        unitNumber: 2,
        unitTitle: 'Inventory Control & Multi-Echelon Stocking Policies',
        topicCount: 8,
        topics: [
          'Functions and Costs of Inventory: Holding, Ordering, Stockout, Purchase Costs',
          'Economic Order Quantity (EOQ) Mathematical Derivation and Sensitivity Analysis',
          'Economic Production Quantity (EPQ) for Simultaneous Production and Consumption',
          'Quantity Discounts and All-Units Price Breaks Optimization',
          'Continuous Review Policy (s, Q): Reorder Point (ROP) under Stochastic Demand',
          'Safety Stock Sizing: Service Level Z-Value and Standard Deviation of Lead-Time Demand',
          'Periodic Review Policy (R, S): Target Stock Level Calculation',
          'ABC Analysis and Selective Inventory Control (VED, FSN Categorization)',
        ],
      },
      {
        unitNumber: 3,
        unitTitle: 'Supply Chain Coordination & The Bullwhip Effect',
        topicCount: 8,
        topics: [
          'Supply Chain Network Structure: Suppliers, Manufacturers, Distributors, Retailers',
          'The Bullwhip Effect: Order Variance Amplification Upstream in Supply Chains',
          'Root Causes of the Bullwhip Effect: Demand Forecasting, Batching, Price Fluctuations, Rationing',
          'Mitigation Strategies: Vendor Managed Inventory (VMI) and Point-of-Sale (POS) Data Sharing',
          'Collaborative Planning, Forecasting, and Replenishment (CPFR) Protocols',
          'Risk Pooling Strategy: Centralized vs Decentralized Warehouse Architectures',
          'Postponement and Mass Customization: Delaying Product Differentiation',
          'The Beer Distribution Game Simulation: Experiencing Supply Chain Oscillations',
        ],
      },
      {
        unitNumber: 4,
        unitTitle: 'Total Quality Management (TQM) & Six Sigma Analytics',
        topicCount: 8,
        topics: [
          'Evolution of Quality: Inspection, Statistical Quality Control, TQM, Six Sigma',
          'Dimensions of Quality: Product Reliability, Performance, Aesthetics, Durability',
          'Cost of Quality (COQ): Prevention, Appraisal, Internal Failure, External Failure Costs',
          'Statistical Process Control (SPC): Common Causes vs Special Causes of Variation',
          'Control Charts for Variables: X-bar and R Charts for Manufacturing Tolerances',
          'Control Charts for Attributes: p-Charts (Fraction Defective) and c-Charts (Defect Count)',
          'Process Capability Ratios: Cp and Cpk Indices for Six Sigma Quality Benchmarks',
          'Six Sigma DMAIC Methodology: Define, Measure, Analyze, Improve, Control',
        ],
      },
      {
        unitNumber: 5,
        unitTitle: 'Service Operations & Queuing Systems Modeling',
        topicCount: 8,
        topics: [
          'Distinct Characteristics of Service Operations: Intangibility, Perishability, Inseparability',
          'Service Blueprinting: Line of Visibility, Front-Office vs Back-Office Operations',
          'Queueing System Architecture: Calling Population, Arrival Process, Queue Discipline',
          'Kendall Notation for Queuing Systems: M/M/1, M/M/c, M/G/1 Models',
          'M/M/1 Queuing Formulas: System Utilization (Rho), Average Queue Length, Waiting Time',
          'Multi-Server Queuing (M/M/c) Optimization for Bank Tellers and Hospital Emergency Rooms',
          'Psychology of Waiting Lines: Unoccupied Time, Uncertain Waits, Unexplained Delays',
          'Managing Peak Demand in Services: Yield Management and Capacity Reservation',
        ],
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 3. IIT BOMBAY VS IIM BANGALORE CURRICULUM COMPARISON
// ─────────────────────────────────────────────────────────────────────────────
export const IITB_VS_IIMB_COMPARISON: UniversityComparison[] = [
  {
    dimension: 'Primary Institutional Mandate',
    iitBombay: 'Technological & Scientific Engineering Innovation (Institute of National Importance - INI)',
    iimBangalore: 'Management Leadership, Enterprise Decision Sciences & Business Analytics (Institute of National Importance - INI)',
  },
  {
    dimension: 'Flagship Analytical Degree',
    iitBombay: 'B.Tech in Computer Science & Engineering (CSE) / M.Tech in Artificial Intelligence',
    iimBangalore: 'Post Graduate Programme in Business Analytics (PGP-BA) / MBA in Decision Sciences',
  },
  {
    dimension: 'Curricular Focus & Objective',
    iitBombay: 'System internals, compiler design, low-level OS primitives, computational complexity proofs, algorithmic efficiency (Big-O)',
    iimBangalore: 'Data-driven managerial decision-making, prescriptive optimization, ROI modeling, causal econometric inference, platform strategy',
  },
  {
    dimension: 'Core Applied Math Suite',
    iitBombay: 'Discrete Mathematics, Graph Theory, Abstract Algebra, Numerical Analysis, Continuous Calculus',
    iimBangalore: 'Applied Probability, Econometrics, Mathematical Optimization (LPP/MILP), Multivariate Statistics, Monte Carlo Risk Simulation',
  },
  {
    dimension: 'Pedagogical Methodology',
    iitBombay: 'Algorithmic proofs, Linux kernel hacking labs, software architecture projects, hardware simulation in Verilog',
    iimBangalore: 'Harvard & IIMB case study method, boardroom decision simulations, Python/R predictive analytics, corporate financial modeling',
  },
  {
    dimension: 'Typical Capstone Project',
    iitBombay: 'Building a distributed consensus engine, custom compiler pass, deep learning vision transformer, or microkernel extension',
    iimBangalore: 'Enterprise customer churn intervention, algorithmic supply chain network optimization, dynamic pricing model, corporate valuation thesis',
  },
];

// Helper functions
export function getAllIIMBCourses(): IIMBCourse[] {
  return IIMB_COURSES_REGISTRY;
}

export function getIIMBCourseById(id: string): IIMBCourse | undefined {
  if (!id) return undefined;
  return IIMB_COURSES_REGISTRY.find(c => c.id.toLowerCase() === id.toLowerCase() || c.code.toLowerCase() === id.toLowerCase());
}

export function getDegreeTopicStats(): DegreeTopicStat[] {
  return DEGREE_TOPIC_STATISTICS;
}

export function getIIMBStats() {
  const totalCourses = IIMB_COURSES_REGISTRY.length;
  const totalTopics = IIMB_COURSES_REGISTRY.reduce((acc, c) => acc + c.totalTopics, 0);
  const totalDepartments = Array.from(new Set(IIMB_COURSES_REGISTRY.map(c => c.department))).length;
  const totalCaseStudies = IIMB_COURSES_REGISTRY.reduce((acc, c) => acc + c.keyCaseStudies.length, 0);
  return {
    totalCourses,
    totalTopics,
    totalDepartments,
    totalCaseStudies,
  };
}
