import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useProgress } from "@/hooks/useProgress";
import { 
  Bookmark, 
  BookOpen, 
  ChevronRight, 
  ChevronDown, 
  Search, 
  Clock, 
  Edit3, 
  Save, 
  ArrowUpDown, 
  Layers, 
  Trash2,
  Check
} from "lucide-react";
import { subjects } from "@/data/subjects";
import { toast } from "sonner";

interface BookmarkedItem {
  subjectId: string;
  subjectName: string;
  unitId: string;
  unitTitle: string;
  topicId: string;
  topicTitle: string;
  readTimeMinutes: number;
}

export default function BookmarksPage() {
  const navigate = useNavigate();
  const { isBookmarked, toggleBookmark } = useProgress();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<'recent' | 'subject' | 'unit'>('recent');
  const [viewMode, setViewMode] = useState<'grouped' | 'list'>('grouped');

  // Notes state stored in localStorage
  const [notes, setNotes] = useState<Record<string, string>>(() => {
    try {
      const raw = localStorage.getItem('itm_bookmark_notes');
      if (raw) return JSON.parse(raw);
    } catch {}
    return {};
  });

  const [activeNoteEditing, setActiveNoteEditing] = useState<string | null>(null);
  const [editingNoteText, setEditingNoteText] = useState("");

  // Track collapsed/expanded subjects in grouped mode
  const [expandedSubjects, setExpandedSubjects] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      localStorage.setItem('itm_bookmark_notes', JSON.stringify(notes));
    } catch {}
  }, [notes]);

  // Extract all bookmarked topics from subjects data
  const bookmarkedItems: BookmarkedItem[] = useMemo(() => {
    const items: BookmarkedItem[] = [];
    for (const subject of subjects) {
      for (const unit of subject.units) {
        for (const topic of unit.topics) {
          if (isBookmarked(topic.id)) {
            const contentLength = (topic as any).content?.length || 2400;
            const readTimeMinutes = Math.max(3, Math.min(15, Math.ceil(contentLength / 450)));
            items.push({
              subjectId: subject.id,
              subjectName: subject.name,
              unitId: unit.id,
              unitTitle: unit.title,
              topicId: topic.id,
              topicTitle: topic.title,
              readTimeMinutes,
            });
          }
        }
      }
    }
    return items;
  }, [isBookmarked]);

  // Filtered & Sorted items
  const processedItems = useMemo(() => {
    let list = bookmarkedItems.filter((item) =>
      item.topicTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subjectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.unitTitle.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (sortBy === 'subject') {
      list.sort((a, b) => a.subjectName.localeCompare(b.subjectName));
    } else if (sortBy === 'unit') {
      list.sort((a, b) => a.unitTitle.localeCompare(b.unitTitle));
    }
    // 'recent' retains reverse insertion / default bookmarked order
    return list;
  }, [bookmarkedItems, searchQuery, sortBy]);

  // Group items by Subject
  const groupedBySubject = useMemo(() => {
    const groups: Record<string, { subjectId: string; subjectName: string; topics: BookmarkedItem[] }> = {};
    processedItems.forEach((item) => {
      if (!groups[item.subjectName]) {
        groups[item.subjectName] = {
          subjectId: item.subjectId,
          subjectName: item.subjectName,
          topics: [],
        };
      }
      groups[item.subjectName].topics.push(item);
    });
    return groups;
  }, [processedItems]);

  const toggleSubjectExpand = (subjectName: string) => {
    setExpandedSubjects((prev) => ({
      ...prev,
      [subjectName]: prev[subjectName] === undefined ? false : !prev[subjectName],
    }));
  };

  const handleStartEditNote = (topicId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveNoteEditing(topicId);
    setEditingNoteText(notes[topicId] || "");
  };

  const handleSaveNote = (topicId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const trimmed = editingNoteText.trim();
    setNotes((prev) => {
      const updated = { ...prev };
      if (trimmed) {
        updated[topicId] = trimmed;
      } else {
        delete updated[topicId];
      }
      return updated;
    });
    setActiveNoteEditing(null);
    toast.success('Note saved for this bookmarked topic');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-8 animate-fade-in">
        {/* Header Title & Counter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
              <Bookmark className="h-5 w-5 fill-amber-500" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">Your Saved Bookmarks</h1>
              <p className="text-xs text-muted-foreground mt-0.5">
                Quick access to critical exam concepts, personal notes & study materials
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-secondary border border-border text-foreground">
              {bookmarkedItems.length} Saved Topic{bookmarkedItems.length === 1 ? '' : 's'}
            </span>
          </div>
        </div>

        {/* Filter & Controls Toolbar */}
        {bookmarkedItems.length > 0 && (
          <div className="bg-card border border-border rounded-2xl p-4 mb-6 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by topic, subject, or unit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-9 pr-4 rounded-xl border border-input bg-background text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {/* Sort By Dropdown */}
              <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-secondary border border-border text-xs">
                <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-muted-foreground font-medium hidden sm:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent font-semibold text-foreground focus:outline-none cursor-pointer"
                >
                  <option value="recent">Recently Bookmarked</option>
                  <option value="subject">Subject Name</option>
                  <option value="unit">Unit Title</option>
                </select>
              </div>

              {/* View Mode Toggle */}
              <div className="inline-flex rounded-xl bg-secondary p-1 border border-border">
                <button
                  onClick={() => setViewMode('grouped')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    viewMode === 'grouped'
                      ? 'bg-primary text-primary-foreground shadow-xs'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  title="Group topics by Subject"
                >
                  Subject Accordion
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    viewMode === 'list'
                      ? 'bg-primary text-primary-foreground shadow-xs'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  title="View flat topic list"
                >
                  Flat List
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {processedItems.length === 0 ? (
          <div className="text-center py-20 bg-card border border-dashed border-border rounded-3xl p-8">
            <Bookmark className="h-12 w-12 mx-auto mb-4 text-muted-foreground/30" />
            <h3 className="text-base font-bold text-foreground mb-1">
              {bookmarkedItems.length === 0 ? "You haven't bookmarked any topics yet" : "No matching bookmarks found"}
            </h3>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto mb-6">
              {bookmarkedItems.length === 0
                ? "Tap the bookmark icon on any topic page or subject notes while studying to save it here for fast revision."
                : "Try adjusting your search query or clear the filter to see your saved study topics."}
            </p>
            {bookmarkedItems.length === 0 ? (
              <button
                onClick={() => navigate('/dashboard')}
                className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold shadow-sm hover:opacity-90 transition-opacity"
              >
                Browse Subjects
              </button>
            ) : (
              <button
                onClick={() => setSearchQuery("")}
                className="px-4 py-2 rounded-xl bg-secondary text-foreground text-xs font-semibold hover:bg-secondary/80"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : viewMode === 'grouped' ? (
          /* ── Grouped by Subject (Accordion View) ── */
          <div className="space-y-4">
            {Object.entries(groupedBySubject).map(([subjectName, group]) => {
              const isCollapsed = expandedSubjects[subjectName] === false;
              return (
                <div key={subjectName} className="bg-card border border-border rounded-2xl overflow-hidden shadow-xs">
                  {/* Subject Accordion Header */}
                  <button
                    onClick={() => toggleSubjectExpand(subjectName)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between text-left bg-secondary/30 hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                        <BookOpen className="h-4 w-4" />
                      </div>
                      <div>
                        <h2 className="font-bold text-sm sm:text-base text-foreground">{subjectName}</h2>
                        <span className="text-[11px] text-muted-foreground">
                          {group.topics.length} Bookmarked Topic{group.topics.length === 1 ? '' : 's'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-muted-foreground hidden sm:inline">
                        {isCollapsed ? 'Expand' : 'Collapse'}
                      </span>
                      {isCollapsed ? (
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                  </button>

                  {/* Topic Items Inside Subject */}
                  {!isCollapsed && (
                    <div className="p-3 sm:p-4 space-y-3 divide-y divide-border/40">
                      {group.topics.map((item) => (
                        <div key={item.topicId} className="pt-3 first:pt-0">
                          <div
                            onClick={() => navigate(`/subject/${item.subjectId}/topic/${item.topicId}`)}
                            className="group p-3 rounded-xl hover:bg-secondary/40 transition-colors flex items-start justify-between gap-3 cursor-pointer"
                          >
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-2 mb-1">
                                <h3 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors truncate">
                                  {item.topicTitle}
                                </h3>
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-secondary text-muted-foreground">
                                  {item.unitTitle}
                                </span>
                              </div>

                              <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3 text-primary" />
                                  <span>{item.readTimeMinutes} min read</span>
                                </span>

                                {notes[item.topicId] && (
                                  <span className="text-amber-500 font-semibold flex items-center gap-1">
                                    <span>📝 Note added</span>
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <button
                                type="button"
                                onClick={(e) => handleStartEditNote(item.topicId, e)}
                                className="p-1.5 rounded-lg bg-secondary hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-colors"
                                title="Add or edit personal revision note"
                              >
                                <Edit3 className="h-3.5 w-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleBookmark(item.topicId);
                                  toast.info('Bookmark removed');
                                }}
                                className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                                title="Remove bookmark"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                              <ChevronRight className="h-4 w-4 text-muted-foreground/60 group-hover:text-primary transition-colors" />
                            </div>
                          </div>

                          {/* Personal Note Display & Inline Editor */}
                          {activeNoteEditing === item.topicId ? (
                            <div className="mt-2 p-3 bg-secondary/30 rounded-xl border border-border space-y-2">
                              <label className="text-[11px] font-bold text-foreground block">
                                Personal Revision Note for {item.topicTitle}:
                              </label>
                              <textarea
                                value={editingNoteText}
                                onChange={(e) => setEditingNoteText(e.target.value)}
                                placeholder="E.g. Formula: S = P + Q. Focus on derivation for 7-mark question..."
                                rows={2}
                                className="w-full p-2.5 text-xs rounded-lg border border-input bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                              />
                              <div className="flex justify-end gap-2">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveNoteEditing(null);
                                  }}
                                  className="px-2.5 py-1 text-xs rounded-lg text-muted-foreground hover:bg-secondary"
                                >
                                  Cancel
                                </button>
                                <button
                                  type="button"
                                  onClick={(e) => handleSaveNote(item.topicId, e)}
                                  className="px-3 py-1 text-xs font-bold rounded-lg bg-primary text-primary-foreground hover:opacity-90 flex items-center gap-1 shadow-xs"
                                >
                                  <Save className="h-3 w-3" /> Save Note
                                </button>
                              </div>
                            </div>
                          ) : notes[item.topicId] ? (
                            <div 
                              onClick={(e) => handleStartEditNote(item.topicId, e)}
                              className="mt-1.5 mx-3 p-2.5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-amber-950 dark:text-amber-200 cursor-pointer hover:bg-amber-500/15 transition-colors flex items-start justify-between gap-2"
                            >
                              <p className="italic">"{notes[item.topicId]}"</p>
                              <Edit3 className="h-3 w-3 shrink-0 text-amber-500 mt-0.5" />
                            </div>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          /* ── Flat List View ── */
          <div className="space-y-3">
            {processedItems.map((item) => (
              <div key={item.topicId} className="bg-card border border-border rounded-2xl p-4 shadow-xs">
                <div
                  onClick={() => navigate(`/subject/${item.subjectId}/topic/${item.topicId}`)}
                  className="group flex items-start justify-between gap-3 cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <BookOpen className="h-4 w-4" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors truncate">
                      {item.topicTitle}
                    </h3>
                    <p className="text-xs text-muted-foreground truncate mb-1">
                      {item.subjectName} • {item.unitTitle}
                    </p>
                    <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                      <Clock className="h-3 w-3 text-primary" />
                      <span>{item.readTimeMinutes} min read</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={(e) => handleStartEditNote(item.topicId, e)}
                      className="p-1.5 rounded-lg bg-secondary hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-colors"
                      title="Add note"
                    >
                      <Edit3 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBookmark(item.topicId);
                        toast.info('Bookmark removed');
                      }}
                      className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                    <ChevronRight className="h-4 w-4 text-muted-foreground/60 group-hover:text-primary transition-colors" />
                  </div>
                </div>

                {/* Personal Note */}
                {activeNoteEditing === item.topicId ? (
                  <div className="mt-3 p-3 bg-secondary/30 rounded-xl border border-border space-y-2">
                    <textarea
                      value={editingNoteText}
                      onChange={(e) => setEditingNoteText(e.target.value)}
                      placeholder="Add personal note..."
                      rows={2}
                      className="w-full p-2.5 text-xs rounded-lg border border-input bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveNoteEditing(null);
                        }}
                        className="px-2.5 py-1 text-xs rounded-lg text-muted-foreground hover:bg-secondary"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={(e) => handleSaveNote(item.topicId, e)}
                        className="px-3 py-1 text-xs font-bold rounded-lg bg-primary text-primary-foreground hover:opacity-90 flex items-center gap-1 shadow-xs"
                      >
                        <Save className="h-3 w-3" /> Save Note
                      </button>
                    </div>
                  </div>
                ) : notes[item.topicId] ? (
                  <div 
                    onClick={(e) => handleStartEditNote(item.topicId, e)}
                    className="mt-2 p-2 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-amber-950 dark:text-amber-200 cursor-pointer hover:bg-amber-500/15 transition-colors flex items-start justify-between gap-2"
                  >
                    <p className="italic">"{notes[item.topicId]}"</p>
                    <Edit3 className="h-3 w-3 shrink-0 text-amber-500 mt-0.5" />
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
