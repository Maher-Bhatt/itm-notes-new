/**
 * ITM Notes - Unified AI Voice Engine
 * 
 * Provides a single, consistent, studio-quality AI narrator voice across the entire application.
 * Pre-processes technical text, expands computer science acronyms, and formats code for natural listening.
 */

export interface VoicePlaybackState {
  isPlaying: boolean;
  isPaused: boolean;
  currentSentence: string;
  currentIndex: number;
  totalSentences: number;
  rate: number;
  voiceName: string;
}

type PlaybackListener = (state: VoicePlaybackState) => void;

class AIVoiceEngine {
  private static instance: AIVoiceEngine;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private sentences: string[] = [];
  private currentIndex: number = 0;
  private isPlaying: boolean = false;
  private isPaused: boolean = false;
  private rate: number = 0.98;
  private pitch: number = 0.98;
  private lockedVoice: SpeechSynthesisVoice | null = null;
  private listeners: Set<PlaybackListener> = new Set();
  private keepAliveInterval: ReturnType<typeof setInterval> | null = null;

  private constructor() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      this.initVoice();
      window.speechSynthesis.onvoiceschanged = () => {
        this.initVoice();
      };
    }
  }

  public static getInstance(): AIVoiceEngine {
    if (!AIVoiceEngine.instance) {
      AIVoiceEngine.instance = new AIVoiceEngine();
    }
    return AIVoiceEngine.instance;
  }

  /**
   * Identifies and permanently locks onto the single best, most natural human-like AI voice.
   * Prioritizes Microsoft Natural Neural voices, Google Neural voices, and Apple Enhanced voices.
   */
  private initVoice(): void {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return;

    // Preference hierarchy for the single best natural AI narrator voice:
    const preferred =
      // 1. High-fidelity Microsoft Natural online neural voices
      voices.find(
        (v) =>
          v.lang.startsWith("en") &&
          (v.name.includes("Jenny") ||
            v.name.includes("Aria") ||
            v.name.includes("Guy") ||
            v.name.includes("Natural"))
      ) ||
      // 2. High-fidelity Google US/UK English voices
      voices.find(
        (v) =>
          v.lang.startsWith("en") &&
          (v.name.includes("Google US English") ||
            v.name.includes("Google UK English Female"))
      ) ||
      // 3. Apple Enhanced Voices
      voices.find(
        (v) =>
          v.lang.startsWith("en") &&
          (v.name.includes("Samantha") ||
            v.name.includes("Daniel") ||
            v.name.includes("Karen") ||
            v.name.includes("Serena"))
      ) ||
      // 4. Any English voice with Neural or Studio
      voices.find(
        (v) =>
          v.lang.startsWith("en") &&
          (v.name.includes("Neural") || v.name.includes("Studio"))
      ) ||
      // 5. Fallback standard English
      voices.find((v) => v.lang === "en-US") ||
      voices.find((v) => v.lang.startsWith("en"));

    if (preferred) {
      this.lockedVoice = preferred;
    }
  }

  /**
   * Prepares and translates academic computer science & engineering text into natural speech.
   * Avoids reading raw brackets, semicolons, and acronyms awkwardly.
   */
  public cleanAndPrepareText(rawText: string): string {
    return rawText
      // Technical Acronyms
      .replace(/\bOOPJ\b/g, "Object Oriented Programming using Java")
      .replace(/\bCONMP\b/g, "Computer Oriented Numerical Methods with Python")
      .replace(/\bCOANMP\b/g, "Computer Oriented Numerical Methods with Python")
      .replace(/\bDSA\b/g, "Data Structures and Algorithms")
      .replace(/\bDBMS\b/g, "Database Management Systems")
      .replace(/\bCA\b/g, "Computer Architecture")
      .replace(/\bBST\b/g, "Binary Search Tree")
      .replace(/\bALU\b/g, "Arithmetic Logic Unit")
      .replace(/\bCPU\b/g, "C P U")
      .replace(/\bRAM\b/g, "Ram memory")
      .replace(/\bROM\b/g, "Rom memory")
      .replace(/\bDMA\b/g, "Direct Memory Access")
      .replace(/\bFIFO\b/g, "First In First Out")
      .replace(/\bLIFO\b/g, "Last In First Out")
      .replace(/\bGC\b/g, "Garbage Collector")
      .replace(/\bJVM\b/g, "Java Virtual Machine")
      .replace(/\bSQL\b/g, "S Q L database")
      .replace(/\b1NF\b/g, "First Normal Form")
      .replace(/\b2NF\b/g, "Second Normal Form")
      .replace(/\b3NF\b/g, "Third Normal Form")
      .replace(/\bBCNF\b/g, "Boyce Codd Normal Form")
      .replace(/\bACID\b/g, "Acid properties: Atomicity, Consistency, Isolation, and Durability")

      // Programming syntax translation
      .replace(/\bsuper\(\)/g, "super constructor call")
      .replace(/\bthis\(\)/g, "this constructor call")
      .replace(/\binstanceof\b/g, "instance of")
      .replace(/\bvoid\b/g, "void return type")
      .replace(/```[\s\S]*?```/g, " [Here is the code implementation: refer to the on-screen code block] ")
      .replace(/`([^`]+)`/g, "$1")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/!\[([^\]]*)\]\([^)]+\)/g, "")
      .replace(/[#*_~>]/g, " ")

      // Complexity and Math
      .replace(/O\(1\)/g, "constant time, Big O of 1")
      .replace(/O\(n\)/g, "linear time, Big O of n")
      .replace(/O\(n\s*\^?\s*2\)/g, "quadratic time, Big O of n squared")
      .replace(/O\(n\s*log\s*n\)/gi, "Big O of n log n")
      .replace(/O\(([a-zA-Z0-9^ +*]+)\)/g, "Big O of $1")
      .replace(/\\\[[\s\S]*?\\\]/g, " [refer to the on-screen formula] ")
      .replace(/\\\([\s\S]*?\\\)/g, " [formula] ")
      .replace(/\$\$[\s\S]*?\$\$/g, " [formula] ")
      .replace(/\$([^$]+)\$/g, "$1")
      .replace(/!=/g, " not equal to ")
      .replace(/==/g, " equals ")
      .replace(/<=/g, " less than or equal to ")
      .replace(/>=/g, " greater than or equal to ")
      .replace(/->/g, " leads to ")
      .replace(/\|[^|\n]+\|/g, " ")
      .replace(/[-]{3,}/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  /**
   * Breaks text into manageable natural sentence phrases (<= 180 characters)
   * to guarantee speech never stalls or hits browser buffer limits.
   */
  private splitIntoPhrases(text: string): string[] {
    const cleaned = this.cleanAndPrepareText(text);
    if (!cleaned) return [];

    const rawSentences = cleaned.match(/[^.!?]+[.!?]+(\s+|$)|[^.!?]+$/g) || [cleaned];
    const phrases: string[] = [];
    let buffer = "";

    for (const raw of rawSentences) {
      const trimmed = raw.trim();
      if (!trimmed) continue;

      if ((buffer + " " + trimmed).length < 180) {
        buffer = buffer ? `${buffer} ${trimmed}` : trimmed;
      } else {
        if (buffer) phrases.push(buffer);
        buffer = trimmed;
      }
    }
    if (buffer) phrases.push(buffer);
    return phrases;
  }

  /**
   * Starts reading text aloud using the locked AI voice.
   */
  public speak(text: string, onFinish?: () => void): void {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    this.stop();
    this.sentences = this.splitIntoPhrases(text);
    this.currentIndex = 0;
    this.isPlaying = true;
    this.isPaused = false;

    if (this.sentences.length === 0) {
      this.stop();
      return;
    }

    this.speakCurrentPhrase(onFinish);
    this.startKeepAlive();
  }

  private speakCurrentPhrase(onFinish?: () => void): void {
    if (this.currentIndex >= this.sentences.length || !this.isPlaying) {
      this.stop();
      if (onFinish) onFinish();
      return;
    }

    const phrase = this.sentences[this.currentIndex];
    const utterance = new SpeechSynthesisUtterance(phrase);
    utterance.rate = this.rate;
    utterance.pitch = this.pitch;

    if (this.lockedVoice) {
      utterance.voice = this.lockedVoice;
    }

    utterance.onend = () => {
      if (this.isPlaying && !this.isPaused) {
        this.currentIndex++;
        this.notifyListeners();
        this.speakCurrentPhrase(onFinish);
      }
    };

    utterance.onerror = (e) => {
      if (e.error === "interrupted" || e.error === "canceled") return;
      if (this.isPlaying && this.currentIndex + 1 < this.sentences.length) {
        this.currentIndex++;
        this.notifyListeners();
        this.speakCurrentPhrase(onFinish);
      } else {
        this.stop();
      }
    };

    this.currentUtterance = utterance;
    window.speechSynthesis.speak(utterance);
    this.notifyListeners();
  }

  public pause(): void {
    if (typeof window !== "undefined" && "speechSynthesis" in window && this.isPlaying) {
      window.speechSynthesis.pause();
      this.isPaused = true;
      this.notifyListeners();
    }
  }

  public resume(): void {
    if (typeof window !== "undefined" && "speechSynthesis" in window && this.isPaused) {
      window.speechSynthesis.resume();
      this.isPaused = false;
      this.notifyListeners();
    }
  }

  public next(): void {
    if (this.currentIndex + 1 < this.sentences.length) {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      this.currentIndex++;
      this.isPlaying = true;
      this.isPaused = false;
      this.speakCurrentPhrase();
    }
  }

  public previous(): void {
    if (this.currentIndex > 0) {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      this.currentIndex--;
      this.isPlaying = true;
      this.isPaused = false;
      this.speakCurrentPhrase();
    }
  }

  public getVoiceName(): string {
    return this.lockedVoice?.name || "Natural Neural AI Narrator";
  }

  public stop(): void {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    this.stopKeepAlive();
    this.isPlaying = false;
    this.isPaused = false;
    this.currentUtterance = null;
    this.currentIndex = 0;
    this.notifyListeners();
  }

  public setRate(newRate: number): void {
    this.rate = Math.max(0.7, Math.min(2.0, newRate));
    if (this.isPlaying && !this.isPaused) {
      // Re-trigger current sentence with updated rate
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        this.speakCurrentPhrase();
      }
    }
    this.notifyListeners();
  }

  public getState(): VoicePlaybackState {
    return {
      isPlaying: this.isPlaying,
      isPaused: this.isPaused,
      currentSentence: this.sentences[this.currentIndex] || "",
      currentIndex: this.currentIndex,
      totalSentences: this.sentences.length,
      rate: this.rate,
      voiceName: this.lockedVoice?.name || "Natural AI Narrator",
    };
  }

  public subscribe(listener: PlaybackListener): () => void {
    this.listeners.add(listener);
    listener(this.getState());
    return () => this.listeners.delete(listener);
  }

  private notifyListeners(): void {
    const state = this.getState();
    this.listeners.forEach((l) => l(state));
  }

  /**
   * Chrome TTS Keep-Alive Heartbeat
   * Prevents Chrome from freezing SpeechSynthesis after 15 seconds.
   */
  private startKeepAlive(): void {
    this.stopKeepAlive();
    this.keepAliveInterval = setInterval(() => {
      if (typeof window !== "undefined" && "speechSynthesis" in window && this.isPlaying && !this.isPaused) {
        window.speechSynthesis.pause();
        window.speechSynthesis.resume();
      }
    }, 9000);
  }

  private stopKeepAlive(): void {
    if (this.keepAliveInterval) {
      clearInterval(this.keepAliveInterval);
      this.keepAliveInterval = null;
    }
  }
}

export const aiVoice = AIVoiceEngine.getInstance();
