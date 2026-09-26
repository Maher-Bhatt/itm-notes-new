// @ts-nocheck
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useProgress } from "@/hooks/useProgress";
import { Bookmark, BookOpen, ChevronRight, Search } from "lucide-react";
import { subjects } from "@/data/subjects"; // Fallback static data

export default function BookmarksPage() {
  const navigate = useNavigate();
  const { isBookmarked, progress } = useProgress();
  const [searchQuery, setSearchQuery] = useState("");

  const bookmarkedItems = [];
  for (const subject of subjects) {
    for (const unit of subject.units) {
      for (const topic of unit.topics) {
        if (isBookmarked(topic.id)) {
          bookmarkedItems.push({
            subjectId: subject.id,
            subjectName: subject.name,
            topicId: topic.id,
            topicTitle: topic.title,
            unitTitle: unit.title
          });
        }
      }
    }
  }

  const filteredItems = bookmarkedItems.filter(item => 
    item.topicTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.subjectName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-8 animate-fade-in">
        <div className="flex items-center gap-2 mb-6">
          <Bookmark className="h-6 w-6 text-primary fill-primary" />
          <h1 className="text-3xl font-bold">Your Bookmarks</h1>
        </div>

        {bookmarkedItems.length > 0 && (
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search your bookmarks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-md border border-input bg-background text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
        )}

        {filteredItems.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            {bookmarkedItems.length === 0 ? (
              <>
                <Bookmark className="h-12 w-12 mx-auto mb-4 opacity-20" />
                <p>You haven't bookmarked any topics yet.</p>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="mt-4 text-primary hover:underline text-sm font-medium"
                >
                  Explore Subjects
                </button>
              </>
            ) : (
              <p>No bookmarks match your search.</p>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredItems.map((item) => (
              <button
                key={item.topicId}
                onClick={() => navigate(`/subject/${item.subjectId}/topic/${item.topicId}`)}
                className="group w-full surface-elevated rounded-xl p-4 flex items-center gap-4 text-left hover:bg-secondary transition-all duration-150 apple-press"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-base truncate">{item.topicTitle}</h3>
                  <p className="text-xs text-muted-foreground truncate">
                    {item.subjectName} • {item.unitTitle}
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground/50 group-hover:text-muted-foreground/80 transition-colors shrink-0" />
              </button>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
