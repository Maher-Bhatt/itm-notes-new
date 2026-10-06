import { useState, useEffect, useMemo } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search, BookOpen, FileText, Calculator, Code, Trophy, Sparkles, ChevronRight, ExternalLink } from "lucide-react";
import { searchTopics, subjects } from "@/data/subjects";
import { REAL_STUDY_MATERIALS } from "@/data/materialsData";
import { useNavigate } from "react-router-dom";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TOOLS_SEARCH_ITEMS = [
  { title: "75% Attendance Buffer Calculator", category: "Tool", route: "/calculator", icon: Calculator, desc: "Calculate safe leaves and required classes" },
  { title: "ITM SGPA & CGPA Predictor", category: "Tool", route: "/calculator", icon: Calculator, desc: "Forecast your semester grade point average" },
  { title: "Practical Coding Lab (DSA, Java, Python)", category: "Lab", route: "/coding-lab", icon: Code, desc: "Run university practicals with test cases" },
  { title: "Semester Practice Quizzes", category: "Quiz", route: "/quiz", icon: Trophy, desc: "Active recall test with instant feedback" },
  { title: "Campus Social & Student Community", category: "Social", route: "/community", icon: Sparkles, desc: "Connect with verified classmates" },
  { title: "Mid-Semester (MST) Question Banks", category: "Exam", route: "/materials", icon: FileText, desc: "Official exam question banks and formats" },
];

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onOpenChange(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onOpenChange]);

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;

    // 1. Matched Tools
    const matchedTools = TOOLS_SEARCH_ITEMS.filter(
      (t) => t.title.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q)
    );

    // 2. Matched Subjects
    const matchedSubjects = subjects.filter(
      (s) => s.name.toLowerCase().includes(q) || s.code.toLowerCase().includes(q)
    );

    // 3. Matched Study Materials
    const matchedMaterials = REAL_STUDY_MATERIALS.filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        m.subject.toLowerCase().includes(q) ||
        m.category.toLowerCase().includes(q)
    ).slice(0, 5);

    // 4. Matched Topics
    const matchedTopics = searchTopics(q).slice(0, 6);

    const totalCount =
      matchedTools.length + matchedSubjects.length + matchedMaterials.length + matchedTopics.length;

    return {
      totalCount,
      tools: matchedTools,
      subjects: matchedSubjects,
      materials: matchedMaterials,
      topics: matchedTopics,
    };
  }, [query]);

  const handleNavigate = (path: string) => {
    navigate(path);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl p-0 overflow-hidden bg-card border-border shadow-2xl">
        <DialogHeader className="p-4 pb-2 border-b border-border/80">
          <DialogTitle className="text-sm font-bold text-foreground">Global Resource Search</DialogTitle>
        </DialogHeader>

        <div className="p-4 pt-2">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search subjects, notes, question banks, tools..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 h-11 rounded-xl bg-secondary/40 border-border text-sm focus-visible:ring-primary"
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-muted-foreground hover:text-foreground"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        <div className="max-h-[60vh] overflow-y-auto px-4 pb-4 space-y-4">
          {!query.trim() && (
            <div className="py-2">
              <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block mb-2 px-1">
                Popular Quick Links
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {TOOLS_SEARCH_ITEMS.slice(0, 4).map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <button
                      key={tool.title}
                      onClick={() => handleNavigate(tool.route)}
                      className="p-3 rounded-xl border border-border/60 bg-secondary/20 hover:bg-secondary/60 hover:border-primary/40 text-left transition-all flex items-center gap-3 group apple-press"
                    >
                      <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0 group-hover:scale-105 transition-transform">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-foreground truncate">{tool.title}</h4>
                        <p className="text-[10px] text-muted-foreground truncate">{tool.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {searchResults && searchResults.totalCount === 0 && (
            <div className="text-center py-10 px-4">
              <Search className="h-8 w-8 text-muted-foreground/40 mx-auto mb-2" />
              <p className="text-sm font-bold text-foreground">No resources found for "{query}"</p>
              <p className="text-xs text-muted-foreground mt-1">
                Try searching for a subject like "DSA", "DBMS", or keywords like "Question Bank", "Attendance", or "Cheat Sheet".
              </p>
            </div>
          )}

          {searchResults && searchResults.totalCount > 0 && (
            <div className="space-y-4">
              {/* Subjects */}
              {searchResults.subjects.length > 0 && (
                <div>
                  <span className="text-[10px] font-bold text-primary uppercase tracking-wider block mb-1.5 px-1">
                    Subjects ({searchResults.subjects.length})
                  </span>
                  <div className="space-y-1.5">
                    {searchResults.subjects.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => handleNavigate(`/subject/${sub.id}`)}
                        className="w-full p-2.5 rounded-xl border border-border/60 hover:border-primary/40 bg-card hover:bg-secondary/40 text-left transition-colors flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <BookOpen className="h-4 w-4 text-primary shrink-0" />
                          <div className="truncate">
                            <h4 className="text-xs font-bold text-foreground truncate">{sub.name}</h4>
                            <p className="text-[10px] text-muted-foreground">
                              {sub.code} • Semester {sub.semester}
                            </p>
                          </div>
                        </div>
                        <ChevronRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary shrink-0 ml-2" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Study Materials & Question Banks */}
              {searchResults.materials.length > 0 && (
                <div>
                  <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wider block mb-1.5 px-1">
                    Study Materials & Papers ({searchResults.materials.length})
                  </span>
                  <div className="space-y-1.5">
                    {searchResults.materials.map((mat) => (
                      <button
                        key={mat.id}
                        onClick={() => handleNavigate('/materials')}
                        className="w-full p-2.5 rounded-xl border border-border/60 hover:border-amber-500/40 bg-card hover:bg-secondary/40 text-left transition-colors flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <FileText className="h-4 w-4 text-amber-500 shrink-0" />
                          <div className="truncate">
                            <h4 className="text-xs font-bold text-foreground truncate">{mat.title}</h4>
                            <p className="text-[10px] text-muted-foreground">
                              {mat.subject} • {mat.category} ({mat.fileType})
                            </p>
                          </div>
                        </div>
                        <span className="text-[10px] font-semibold text-primary group-hover:underline shrink-0 ml-2">
                          View
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Syllabus Topics */}
              {searchResults.topics.length > 0 && (
                <div>
                  <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider block mb-1.5 px-1">
                    Syllabus Topics ({searchResults.topics.length})
                  </span>
                  <div className="space-y-1.5">
                    {searchResults.topics.map((t) => (
                      <button
                        key={t.topic.id}
                        onClick={() => handleNavigate(`/subject/${t.subject.id}/topic/${t.topic.id}`)}
                        className="w-full p-2.5 rounded-xl border border-border/60 hover:border-emerald-500/40 bg-card hover:bg-secondary/40 text-left transition-colors flex items-center justify-between group"
                      >
                        <div className="min-w-0">
                          <h4 className="text-xs font-semibold text-foreground truncate">{t.topic.title}</h4>
                          <p className="text-[10px] text-muted-foreground">{t.subject.name}</p>
                        </div>
                        <ChevronRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-emerald-500 shrink-0 ml-2" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Academic Tools */}
              {searchResults.tools.length > 0 && (
                <div>
                  <span className="text-[10px] font-bold text-purple-500 uppercase tracking-wider block mb-1.5 px-1">
                    Tools & Calculators ({searchResults.tools.length})
                  </span>
                  <div className="space-y-1.5">
                    {searchResults.tools.map((tl) => (
                      <button
                        key={tl.title}
                        onClick={() => handleNavigate(tl.route)}
                        className="w-full p-2.5 rounded-xl border border-border/60 hover:border-purple-500/40 bg-card hover:bg-secondary/40 text-left transition-colors flex items-center justify-between group"
                      >
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-foreground truncate">{tl.title}</h4>
                          <p className="text-[10px] text-muted-foreground">{tl.desc}</p>
                        </div>
                        <ChevronRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-purple-500 shrink-0 ml-2" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="p-3 bg-secondary/30 border-t border-border flex items-center justify-between text-[11px] text-muted-foreground px-4">
          <span>Press <kbd className="px-1.5 py-0.5 rounded bg-background border border-border text-[10px] font-mono">ESC</kbd> to close</span>
          <span className="flex items-center gap-1">ITM Notes Discovery</span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
