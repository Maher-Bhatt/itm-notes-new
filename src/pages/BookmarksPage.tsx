import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  Check,
  FolderPlus,
  Folder,
  Tag,
  Plus
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

const DEFAULT_FOLDERS = [
  "All",
  "MST Must-Revise",
  "Tricky Viva Questions",
  "Formulas & Codes",
  "End-Sem Priority"
];

export default function BookmarksPage() {
  const navigate = useNavigate();
  const { isBookmarked, toggleBookmark } = useProgress();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<'recent' | 'subject' | 'unit'>('recent');
  const [viewMode, setViewMode] = useState<'grouped' | 'list'>('grouped');

  // Custom Folders State
  const [folders, setFolders] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem('itm_bookmark_folders');
      if (raw) return JSON.parse(raw);
    } catch {}
    return DEFAULT_FOLDERS;
  });

  const [selectedFolder, setSelectedFolder] = useState<string>("All");
  const [newFolderName, setNewFolderName] = useState("");
  const [showAddFolder, setShowAddFolder] = useState(false);

  // Map of topicId -> folderName
  const [itemFolders, setItemFolders] = useState<Record<string, string>>(() => {
    try {
      const raw = localStorage.getItem('itm_bookmark_item_folders');
      if (raw) return JSON.parse(raw);
    } catch {}
    return {};
  });

  // Notes state stored in localStorage
  const [notes, setNotes] = useState<Record<string, string>>(() => {
    try {
      const raw = localStorage.getItem('itm_bookmark_notes');
      if (raw) return JSON.parse(raw);
    } catch (e) {
      console.warn('Failed to load bookmark notes from localStorage:', e);
    }
    return {};
  });

  const [activeNoteEditing, setActiveNoteEditing] = useState<string | null>(null);
  const [editingNoteText, setEditingNoteText] = useState("");
  const [expandedSubjects, setExpandedSubjects] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      localStorage.setItem('itm_bookmark_notes', JSON.stringify(notes));
    } catch (e) {
      console.warn('Failed to save bookmark notes:', e);
    }
  }, [notes]);

  useEffect(() => {
    try {
      localStorage.setItem('itm_bookmark_folders', JSON.stringify(folders));
    } catch {}
  }, [folders]);

  useEffect(() => {
    try {
      localStorage.setItem('itm_bookmark_item_folders', JSON.stringify(itemFolders));
    } catch {}
  }, [itemFolders]);

  const handleCreateFolder = () => {
    const trimmed = newFolderName.trim();
    if (!trimmed) return;
    if (folders.includes(trimmed)) {
      toast.error('Folder already exists');
      return;
    }
    setFolders(prev => [...prev, trimmed]);
    setSelectedFolder(trimmed);
    setNewFolderName("");
    setShowAddFolder(false);
    toast.success(`Created folder: ${trimmed}`);
  };

  const handleAssignFolder = (topicId: string, folder: string) => {
    setItemFolders(prev => ({
      ...prev,
      [topicId]: folder
    }));
    toast.success(`Moved to "${folder}"`);
  };

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
    const list = bookmarkedItems.filter((item) => {
      // Folder filter
      if (selectedFolder !== "All") {
        const itemF = itemFolders[item.topicId];
        if (itemF !== selectedFolder) return false;
      }

      // Search query
      const matchesSearch = 
        item.topicTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subjectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.unitTitle.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesSearch;
    });

    if (sortBy === 'subject') {
      list.sort((a, b) => a.subjectName.localeCompare(b.subjectName));
    } else if (sortBy === 'unit') {
      list.sort((a, b) => a.unitTitle.localeCompare(b.unitTitle));
    }
    return list;
  }, [bookmarkedItems, searchQuery, sortBy, selectedFolder, itemFolders]);

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
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-6 animate-fade-in text-foreground">
      <div>
        {/* Header Title & Counter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
              <Bookmark className="h-5 w-5 fill-amber-500" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">Saved Bookmarks & Collections</h1>
              <p className="text-xs text-muted-foreground mt-0.5">
                Organize your study bookmarks into custom folders for MST and End-Sem revision
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-secondary border border-border text-foreground">
              {bookmarkedItems.length} Saved Topics
            </span>
          </div>
        </div>

        {/* Custom Folder Tabs Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {folders.map(f => {
            const isSelected = selectedFolder === f;
            const countInFolder = f === "All" 
              ? bookmarkedItems.length 
              : bookmarkedItems.filter(i => itemFolders[i.topicId] === f).length;

            return (
              <button
                key={f}
                onClick={() => setSelectedFolder(f)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 apple-press ${
                  isSelected
                    ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                    : 'bg-card border-border/80 text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
              >
                <Folder className="h-3.5 w-3.5" />
                <span>{f}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-primary-foreground/20' : 'bg-secondary'}`}>
                  {countInFolder}
                </span>
              </button>
            );
          })}

          {/* Add Folder Button */}
          {!showAddFolder ? (
            <button
              onClick={() => setShowAddFolder(true)}
              className="px-3 py-1.5 rounded-xl text-xs font-bold border border-dashed border-border hover:border-primary/50 text-muted-foreground hover:text-foreground flex items-center gap-1 transition-all"
            >
              <Plus className="h-3.5 w-3.5" /> Add Folder
            </button>
          ) : (
            <div className="flex items-center gap-1.5 bg-card border border-border rounded-xl p-1">
              <input
                type="text"
                placeholder="Folder name..."
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleCreateFolder();
                  if (e.key === 'Escape') setShowAddFolder(false);
                }}
                className="h-7 px-2 text-xs bg-transparent border-none focus:outline-none w-32"
                autoFocus
              />
              <button
                onClick={handleCreateFolder}
                className="px-2 py-1 rounded-lg bg-primary text-primary-foreground text-[10px] font-bold"
              >
                Create
              </button>
              <button
                onClick={() => setShowAddFolder(false)}
                className="p-1 text-muted-foreground hover:text-foreground text-[10px]"
              >
                ✕
              </button>
            </div>
          )}
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
                  Accordion
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
              {bookmarkedItems.length === 0 ? "You haven't bookmarked any topics yet" : `No bookmarks found in "${selectedFolder}"`}
            </h3>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto mb-6">
              {bookmarkedItems.length === 0
                ? "Tap the bookmark icon on any topic page or subject notes while studying to save it here for fast revision."
                : "Try switching to 'All' folder or clearing your search filter."}
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
                onClick={() => {
                  setSelectedFolder("All");
                  setSearchQuery("");
                }}
                className="px-4 py-2 rounded-xl bg-secondary text-foreground text-xs font-semibold hover:bg-secondary/80"
              >
                View All Bookmarks
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
                        <div
                          key={item.topicId}
                          onClick={() => navigate(`/subject/${item.subjectId}/topic/${item.topicId}`)}
                          className="pt-3 first:pt-0 p-3 rounded-xl hover:bg-secondary/30 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                        >
                          <div className="space-y-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold text-xs sm:text-sm text-foreground group-hover:text-primary transition-colors truncate">
                                {item.topicTitle}
                              </h3>
                              {itemFolders[item.topicId] && (
                                <span className="text-[10px] px-2 py-0.2 rounded-md bg-secondary text-primary font-medium">
                                  {itemFolders[item.topicId]}
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-muted-foreground">
                              {item.unitTitle} • ~{item.readTimeMinutes} min read
                            </p>
                          </div>

                          <div className="flex items-center gap-2 self-end sm:self-auto" onClick={(e) => e.stopPropagation()}>
                            {/* Move to folder selector */}
                            <select
                              value={itemFolders[item.topicId] || ""}
                              onChange={(e) => handleAssignFolder(item.topicId, e.target.value)}
                              className="text-[10px] h-7 px-2 rounded-lg bg-secondary border border-border text-foreground font-medium"
                            >
                              <option value="">Move to Folder...</option>
                              {folders.filter(f => f !== "All").map(f => (
                                <option key={f} value={f}>{f}</option>
                              ))}
                            </select>

                            <button
                              onClick={() => toggleBookmark(item.topicId)}
                              className="p-1.5 rounded-lg text-muted-foreground hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                              title="Remove Bookmark"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
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
          <div className="space-y-2">
            {processedItems.map((item) => (
              <div
                key={item.topicId}
                onClick={() => navigate(`/subject/${item.subjectId}/topic/${item.topicId}`)}
                className="p-4 rounded-2xl bg-card border border-border hover:border-primary/40 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-xs sm:text-sm text-foreground group-hover:text-primary transition-colors truncate">
                      {item.topicTitle}
                    </h3>
                    {itemFolders[item.topicId] && (
                      <span className="text-[10px] px-2 py-0.2 rounded-md bg-secondary text-primary font-medium">
                        {itemFolders[item.topicId]}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    {item.subjectName} • {item.unitTitle}
                  </p>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto" onClick={(e) => e.stopPropagation()}>
                  <select
                    value={itemFolders[item.topicId] || ""}
                    onChange={(e) => handleAssignFolder(item.topicId, e.target.value)}
                    className="text-[10px] h-7 px-2 rounded-lg bg-secondary border border-border text-foreground font-medium"
                  >
                    <option value="">Move to Folder...</option>
                    {folders.filter(f => f !== "All").map(f => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>

                  <button
                    onClick={() => toggleBookmark(item.topicId)}
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
