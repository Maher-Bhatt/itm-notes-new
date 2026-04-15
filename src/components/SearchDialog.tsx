import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { searchTopics } from "@/data/subjects";
import { useNavigate } from "react-router-dom";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const results = searchTopics(query);
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Search Topics</DialogTitle>
        </DialogHeader>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search topics, concepts, keywords..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
            autoFocus
          />
        </div>
        {query && (
          <div className="max-h-72 overflow-y-auto space-y-1 mt-2">
            {results.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">No results found</p>
            ) : (
              results.map((r) => (
                <button
                  key={r.topic.id}
                  className="w-full text-left p-3 rounded-lg hover:bg-secondary transition-colors"
                  onClick={() => { navigate(`/subject/${r.subject.id}/topic/${r.topic.id}`); onOpenChange(false); }}
                >
                  <p className="text-sm font-medium">{r.topic.title}</p>
                  <p className="text-xs text-muted-foreground">{r.subject.name}</p>
                </button>
              ))
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
