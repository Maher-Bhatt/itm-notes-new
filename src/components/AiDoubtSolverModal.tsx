import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Send, 
  BookOpen, 
  ExternalLink, 
  AlertCircle, 
  CheckCircle2, 
  Volume2, 
  VolumeX, 
  Bot,
  Lightbulb
} from 'lucide-react';
import { solveStudentDoubt, DoubtAnswer } from '@/services/aiDoubtSolver';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface AiDoubtSolverModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuestion?: string;
}

const SAMPLE_QUESTIONS = [
  "Explain Dijkstra's shortest path algorithm with example",
  "Difference between Abstract Class and Interface in Java",
  "ACID properties in DBMS with real-world examples",
  "Booth's multiplication algorithm steps and flowchart",
  "What are pipeline hazards in Computer Architecture?"
];

export const AiDoubtSolverModal: React.FC<AiDoubtSolverModalProps> = ({
  isOpen,
  onClose,
  initialQuestion = ''
}) => {
  const [question, setQuestion] = useState(initialQuestion);
  const [isLoading, setIsLoading] = useState(false);
  const [answer, setAnswer] = useState<DoubtAnswer | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleAsk = async (queryText?: string) => {
    const q = (queryText || question).trim();
    if (!q) {
      toast.error('Please enter your doubt question');
      return;
    }

    if (queryText) {
      setQuestion(queryText);
    }

    setIsLoading(true);
    setAnswer(null);
    stopSpeech();

    try {
      const res = await solveStudentDoubt(q);
      setAnswer(res);
      if (res.remainingDailyQuota <= 3) {
        toast.warning(`Daily Doubt Quota: ${res.remainingDailyQuota} queries left for today`);
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to solve doubt');
    } finally {
      setIsLoading(false);
    }
  };

  const stopSpeech = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const handleSpeak = (text: string) => {
    if (!('speechSynthesis' in window)) {
      toast.error('Text-to-speech is not supported on this browser');
      return;
    }

    if (isSpeaking) {
      stopSpeech();
      return;
    }

    window.speechSynthesis.cancel();
    // Clean text of markdown characters
    const cleanText = text.replace(/[#*`_~]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    // Pick a natural studio English voice if available
    const voices = window.speechSynthesis.getVoices();
    const studioVoice = voices.find(v => 
      v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Studio'))
    ) || voices.find(v => v.lang.startsWith('en'));

    if (studioVoice) {
      utterance.voice = studioVoice;
    }

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleCitationClick = (url: string) => {
    stopSpeech();
    onClose();
    navigate(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="bg-card border border-border rounded-3xl max-w-2xl w-full p-6 shadow-2xl relative max-h-[90vh] flex flex-col animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-border/60">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shadow-sm">
              <Bot className="h-5 w-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-foreground">
                  AI Syllabus Doubt Solver
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-500 dark:text-amber-500 text-[10px] font-bold">
                  Grounded in CampusLoop
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Ask any 2 AM exam doubt — answered directly from your verified syllabus
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              stopSpeech();
              onClose();
            }}
            className="p-1.5 rounded-xl hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 custom-scrollbar pr-1">
          {/* Quick Query Chips */}
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground mb-2">
              <Lightbulb className="h-3.5 w-3.5 text-amber-500" />
              <span>Suggested Exam Doubts:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {SAMPLE_QUESTIONS.map((sample, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAsk(sample)}
                  disabled={isLoading}
                  className="text-[11px] px-2.5 py-1 rounded-xl bg-secondary/80 hover:bg-secondary text-foreground/80 hover:text-foreground border border-border/50 transition-all text-left truncate max-w-full apple-press"
                >
                  {sample}
                </button>
              ))}
            </div>
          </div>

          {/* Input Box */}
          <div className="relative">
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleAsk();
                }
              }}
              placeholder="Type your exam doubt here (e.g. Explain Morris Inorder Traversal or Normalization 1NF to 3NF)..."
              rows={3}
              className="w-full rounded-2xl bg-secondary/40 border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
            />
            <div className="flex items-center justify-between mt-2">
              <span className="text-[11px] text-muted-foreground">
                Press <strong>Enter</strong> to solve • Citations verified against university syllabus notes
              </span>
              <button
                onClick={() => handleAsk()}
                disabled={isLoading || !question.trim()}
                className="px-4 py-2 rounded-xl bg-primary text-primary-foreground font-semibold text-xs flex items-center gap-1.5 hover:opacity-90 transition-all disabled:opacity-50 shadow-md apple-press"
              >
                {isLoading ? (
                  <>
                    <Sparkles className="h-3.5 w-3.5 animate-spin" /> Thinking...
                  </>
                ) : (
                  <>
                    <Send className="h-3.5 w-3.5" /> Solve Doubt
                  </>
                )}
              </button>
            </div>
          </div>

          {/* AI Answer Card */}
          {answer && (
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 sm:p-5 space-y-4 animate-scale-in">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-500 dark:text-amber-500 flex items-center justify-center">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-xs font-bold text-foreground">
                    Verified Answer
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary font-medium text-muted-foreground">
                    Confidence: {Math.round(answer.confidence * 100)}%
                  </span>
                </div>

                <button
                  onClick={() => handleSpeak(answer.answerMarkdown)}
                  className="flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors px-2 py-1 rounded-lg bg-primary/10"
                  title="Listen with Studio AI Voice"
                >
                  {isSpeaking ? (
                    <>
                      <VolumeX className="h-3.5 w-3.5" /> Stop Voice
                    </>
                  ) : (
                    <>
                      <Volume2 className="h-3.5 w-3.5" /> Listen (Studio AI)
                    </>
                  )}
                </button>
              </div>

              {/* Formatted Answer */}
              <div className="text-sm text-foreground/90 leading-relaxed whitespace-pre-line bg-card/70 p-4 rounded-xl border border-border/60">
                {answer.answerMarkdown}
              </div>

              {/* Citations Box */}
              {answer.citations.length > 0 && (
                <div className="pt-2 border-t border-border/60">
                  <p className="text-xs font-bold text-foreground flex items-center gap-1.5 mb-2">
                    <BookOpen className="h-3.5 w-3.5 text-primary" />
                    Source Syllabus Topics (Click to Read Full Note):
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {answer.citations.map((cite, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleCitationClick(cite.url)}
                        className="p-2.5 rounded-xl bg-card border border-border/80 hover:border-primary/50 cursor-pointer transition-all flex items-center justify-between group shadow-sm"
                      >
                        <div className="truncate pr-2">
                          <p className="text-xs font-bold text-foreground group-hover:text-primary transition-colors truncate">
                            {cite.topicTitle}
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            {cite.subjectName} • {cite.unitName}
                          </p>
                        </div>
                        <ExternalLink className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary flex-shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer quota */}
        <div className="pt-3 border-t border-border/60 flex items-center justify-between text-[11px] text-muted-foreground">
          <span>Daily Quota: {answer ? answer.remainingDailyQuota : 20} doubts remaining today</span>
          <span className="text-primary font-medium">Available 24/7 during exam nights</span>
        </div>
      </div>
    </div>
  );
};
