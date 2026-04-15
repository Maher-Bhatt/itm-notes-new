import { useParams, Link, useNavigate } from "react-router-dom";
import { getTopic, getAdjacentTopics, getSubject } from "@/data/subjects";
import { useProgress } from "@/hooks/useProgress";
import { MCQQuiz } from "@/components/MCQQuiz";
import { ReviewSystem } from "@/components/ReviewSystem";
import { TestMe } from "@/components/TestMe";
import { ArrowLeft, Bookmark, CheckCircle, BookOpen, ChevronLeft, ChevronRight, Menu, X, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useState, useEffect, useCallback } from "react";
import { SearchDialog } from "@/components/SearchDialog";
import { Footer } from "@/components/Footer";
import { useSupportFlow, SupportFlow } from "@/components/SupportFlow";
import { useAuth } from "@/contexts/AuthContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

function XcodeBlock({ code, label, variant }: { code: string; label?: string; variant?: "output" }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [code]);

  return (
    <div className="xcode-block">
      <div className="xcode-block-header">
        <span className={`text-[11px] font-mono ${variant === "output" ? "text-success/70" : "text-muted-foreground"}`}>
          {label || (variant === "output" ? "Output" : "Code")}
        </span>
        <button onClick={handleCopy} className="text-muted-foreground hover:text-foreground transition-colors apple-press p-1 -m-1">
          {copied ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
        </button>
      </div>
      <div className="xcode-block-body">
        <pre><code className={`text-[13px] leading-relaxed ${variant === "output" ? "text-success/80" : ""}`}>{code}</code></pre>
      </div>
    </div>
  );
}

export default function TopicPage() {
  const { subjectId, topicId } = useParams<{ subjectId: string; topicId: string }>();
  const result = getTopic(subjectId || "", topicId || "");
  const subject = getSubject(subjectId || "");
  const adjacent = getAdjacentTopics(subjectId || "", topicId || "");
  const { isCompleted, isBookmarked, toggleComplete, toggleBookmark, saveMcqScore } = useProgress();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const { shouldShow, dismiss, recordEngagement } = useSupportFlow();
  const [showReviewPrompt, setShowReviewPrompt] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    recordEngagement();
  }, [topicId]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [topicId]);

  if (!result) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center animate-fade-in">
        <h2 className="text-xl font-bold mb-2">Topic not found</h2>
        <Link to="/" className="text-primary hover:underline text-sm">← Back to home</Link>
      </div>
    </div>
  );

  const { topic, unitTitle } = result;
  const completed = isCompleted(topic.id);
  const bookmarked = isBookmarked(topic.id);

  const handleComplete = () => {
    if (!completed) {
      toggleComplete(topic.id);
      if (user) {
        setTimeout(() => setShowReviewPrompt(true), 500);
      }
    } else {
      toggleComplete(topic.id);
    }
  };

  const allUnits = subject?.units || [];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
      <SupportFlow open={shouldShow} onDismiss={dismiss} />

      <Dialog open={showReviewPrompt} onOpenChange={setShowReviewPrompt}>
        <DialogContent className="sm:max-w-md surface-elevated border border-white/5">
          <DialogHeader>
            <DialogTitle className="font-semibold">Topic Completed! 🎉</DialogTitle>
            <DialogDescription className="text-muted-foreground">Would you like to rate this topic and leave a review?</DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 mt-4">
            <button onClick={() => { setShowReviewPrompt(false); document.getElementById("reviews")?.scrollIntoView({ behavior: "smooth" }); }} className="pill-button apple-press bg-primary text-primary-foreground h-10 px-5 text-sm flex-1 inline-flex items-center justify-center">Leave a Review</button>
            <Button variant="outline" onClick={() => setShowReviewPrompt(false)} className="flex-1 apple-press rounded-full">Maybe Later</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Frosted sticky header */}
      <header className="sticky top-0 z-50 apple-vibrancy border-b border-white/5">
        <div className="max-w-[1400px] mx-auto px-4 h-12 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden apple-press p-1.5 rounded-lg hover:bg-white/5">
              {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
            <button onClick={() => navigate(`/subject/${subjectId}`)} className="apple-press p-1.5 rounded-lg hover:bg-white/5">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <nav className="hidden sm:flex items-center gap-1 text-[13px] text-muted-foreground">
              <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
              <ChevronRight className="h-3 w-3 opacity-40" />
              <Link to={`/subject/${subjectId}`} className="hover:text-foreground transition-colors">{subject?.name}</Link>
              <ChevronRight className="h-3 w-3 opacity-40" />
              <span className="text-foreground font-medium truncate max-w-[200px]">{topic.title}</span>
            </nav>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleComplete}
              className={`apple-press h-8 px-3 rounded-lg text-[13px] font-medium inline-flex items-center gap-1.5 transition-colors ${
                completed ? "bg-success/12 text-success" : "hover:bg-white/5 text-muted-foreground"
              }`}
            >
              <CheckCircle className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{completed ? "Completed" : "Mark Complete"}</span>
            </button>
            <TestMe mcqs={topic.mcqs} topicId={topic.id} topicTitle={topic.title} />
            <button onClick={() => toggleBookmark(topic.id)} className="apple-press p-1.5 rounded-lg hover:bg-white/5">
              <Bookmark className={`h-4 w-4 transition-colors ${bookmarked ? "fill-warning text-warning" : "text-muted-foreground"}`} />
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 max-w-[1400px] mx-auto w-full">
        {/* Sidebar — translucent, collapsible */}
        <aside className={`${sidebarOpen ? "fixed inset-0 z-40 lg:relative" : "hidden lg:block"} lg:w-64 lg:shrink-0`}>
          {sidebarOpen && <div className="fixed inset-0 bg-black/50 lg:hidden z-40" onClick={() => setSidebarOpen(false)} />}
          <div className={`${sidebarOpen ? "fixed left-0 top-12 bottom-0 w-64 z-50" : ""} lg:sticky lg:top-12 lg:h-[calc(100vh-3rem)] overflow-y-auto apple-vibrancy border-r border-white/5 p-3`}>
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-2">Contents</p>
            {allUnits.map((unit) => (
              <div key={unit.id} className="mb-4">
                <p className="text-[11px] font-semibold text-muted-foreground/60 px-2 mb-1">{unit.title}</p>
                <div className="space-y-0.5">
                  {unit.topics.map((t) => {
                    const isCurrent = t.id === topic.id;
                    const tCompleted = isCompleted(t.id);
                    return (
                      <button
                        key={t.id}
                        onClick={() => { navigate(`/subject/${subjectId}/topic/${t.id}`); setSidebarOpen(false); }}
                        className={`apple-press w-full text-left px-2.5 py-1.5 rounded-lg text-[13px] flex items-center gap-2 transition-colors ${
                          isCurrent ? "bg-primary/12 text-primary font-medium" : "text-muted-foreground hover:bg-white/5"
                        }`}
                      >
                        {tCompleted ? (
                          <CheckCircle className="h-3 w-3 text-success shrink-0" />
                        ) : (
                          <BookOpen className="h-3 w-3 shrink-0 opacity-30" />
                        )}
                        <span className="truncate">{t.title}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Main reading area — "Reader Mode" */}
        <main className="flex-1 min-w-0 animate-fade-in">
          <div className="max-w-2xl mx-auto px-6 py-10">
            <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold mb-3">{unitTitle}</p>
            <h1 className="text-3xl font-bold mb-8 leading-tight">{topic.title}</h1>

            <Accordion type="multiple" defaultValue={["simple", "detailed", "examples", "keypoints", "mcqs", "reviews"]}>
              <AccordionItem value="simple" className="border-white/5">
                <AccordionTrigger className="text-[15px] font-semibold hover:no-underline">Simple Explanation</AccordionTrigger>
                <AccordionContent>
                  <p className="text-[15px] leading-[1.8] text-muted-foreground whitespace-pre-line">{topic.simpleExplanation}</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="detailed" className="border-white/5">
                <AccordionTrigger className="text-[15px] font-semibold hover:no-underline">Detailed Explanation</AccordionTrigger>
                <AccordionContent>
                  {topic.detailedExplanation.split("\n\n").map((para, i) => (
                    <p key={i} className="mb-4 last:mb-0 leading-[1.8] text-muted-foreground whitespace-pre-line text-[15px]">{para}</p>
                  ))}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="examples" className="border-white/5">
                <AccordionTrigger className="text-[15px] font-semibold hover:no-underline">Examples ({topic.examples.length})</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-6">
                    {topic.examples.map((ex, i) => (
                      <div key={i} className="surface-elevated rounded-2xl overflow-hidden">
                        <div className="px-5 py-3.5 border-b border-white/5">
                          <h4 className="font-semibold text-[15px]">{ex.title}</h4>
                          <p className="text-[13px] text-muted-foreground mt-0.5">{ex.problem}</p>
                        </div>
                        <div className="p-5 space-y-4">
                          <p className="text-[14px] text-muted-foreground leading-relaxed">{ex.explanation}</p>
                          {ex.code && <XcodeBlock code={ex.code} />}
                          {ex.output && <XcodeBlock code={ex.output} variant="output" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="keypoints" className="border-white/5">
                <AccordionTrigger className="text-[15px] font-semibold hover:no-underline">Key Points ({topic.keyPoints.length})</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-1.5">
                    {topic.keyPoints.map((point, i) => (
                      <div key={i} className="flex items-start gap-3 py-2.5 px-1">
                        <span className="w-5 h-5 rounded-md bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">{i + 1}</span>
                        <span className="text-[14px] text-muted-foreground leading-relaxed">{point}</span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="mcqs" className="border-white/5">
                <AccordionTrigger className="text-[15px] font-semibold hover:no-underline">Quiz ({topic.mcqs.length} MCQs)</AccordionTrigger>
                <AccordionContent>
                  <MCQQuiz mcqs={topic.mcqs} topicId={topic.id} onComplete={(score, total) => saveMcqScore(topic.id, score, total)} />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="reviews" id="reviews" className="border-white/5">
                <AccordionTrigger className="text-[15px] font-semibold hover:no-underline">Reviews</AccordionTrigger>
                <AccordionContent>
                  <ReviewSystem topicId={topic.id} />
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Nav */}
            <div className="flex items-center justify-between mt-12 pt-8 border-t border-white/5">
              {adjacent.prev ? (
                <button onClick={() => navigate(`/subject/${subjectId}/topic/${adjacent.prev!.id}`)} className="apple-press inline-flex items-center gap-1.5 text-[14px] text-muted-foreground hover:text-foreground transition-colors">
                  <ChevronLeft className="h-4 w-4" /> Previous
                </button>
              ) : <div />}
              {adjacent.next ? (
                <button onClick={() => navigate(`/subject/${subjectId}/topic/${adjacent.next!.id}`)} className="apple-press inline-flex items-center gap-1.5 text-[14px] text-primary font-medium">
                  Next <ChevronRight className="h-4 w-4" />
                </button>
              ) : <div />}
            </div>
          </div>

          <Footer />
        </main>
      </div>
    </div>
  );
}
