import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star, MessageSquare, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Review {
  id: string;
  rating: number;
  review_text: string | null;
  created_at: string;
  profiles: { display_name: string | null } | null;
}

export function ReviewSystem({ topicId }: { topicId: string }) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadReviews();
  }, [topicId]);

  const loadReviews = async () => {
    const { data } = await supabase
      .from("reviews")
      .select("id, rating, review_text, created_at, profiles:user_id(display_name)")
      .eq("topic_id", topicId)
      .order("created_at", { ascending: false });
    if (data) setReviews(data as any);
  };

  const handleSubmit = async () => {
    if (!user || rating === 0) return;
    setSubmitting(true);
    const { error } = await supabase.from("reviews").upsert({
      user_id: user.id,
      topic_id: topicId,
      rating,
      review_text: text || null,
    });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Review submitted! ⭐" });
      setShowForm(false);
      setRating(0);
      setText("");
      loadReviews();
    }
    setSubmitting(false);
  };

  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MessageSquare className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-lg">Reviews ({reviews.length})</h3>
          {avgRating && (
            <div className="flex items-center gap-1 bg-primary/10 px-2.5 py-1 rounded-full">
              <Star className="h-3.5 w-3.5 fill-warning text-warning" />
              <span className="text-sm font-medium">{avgRating}</span>
            </div>
          )}
        </div>
        {user && !showForm && (
          <Button size="sm" variant="outline" onClick={() => setShowForm(true)} className="gap-2">
            <Star className="h-3.5 w-3.5" /> Rate Topic
          </Button>
        )}
      </div>

      {/* Form */}
      {showForm && user && (
        <div className="surface-elevated rounded-xl p-6 animate-scale-in">
          <p className="font-medium mb-3">Rate this topic</p>
          <div className="flex gap-1 mb-4 star-rating">
            {[1, 2, 3, 4, 5].map((s) => (
              <button
                key={s}
                className="star"
                onClick={() => setRating(s)}
                onMouseEnter={() => setHoverRating(s)}
                onMouseLeave={() => setHoverRating(0)}
              >
                <Star className={`h-7 w-7 transition-colors ${s <= (hoverRating || rating) ? "fill-warning text-warning" : "text-muted-foreground"}`} />
              </button>
            ))}
          </div>
          <Textarea
            placeholder="Write a review (optional)..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="bg-secondary/50 border-border mb-4"
            rows={3}
          />
          <div className="flex gap-2">
            <Button onClick={handleSubmit} disabled={submitting || rating === 0}>
              {submitting ? "Submitting..." : "Submit Review"}
            </Button>
            <Button variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button>
          </div>
        </div>
      )}

      {!user && (
        <div className="surface-elevated rounded-xl p-4 text-center text-sm text-muted-foreground">
          <a href="/auth" className="text-primary hover:underline">Sign in</a> to leave a review
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-3">
        {reviews.map((r) => (
          <div key={r.id} className="surface-elevated rounded-xl p-4 animate-fade-in">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/12 flex items-center justify-center">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">{(r.profiles as any)?.display_name || "Anonymous"}</p>
                  <p className="text-xs text-muted-foreground">{new Date(r.created_at).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className={`h-3.5 w-3.5 ${s <= r.rating ? "fill-warning text-warning" : "text-muted-foreground/30"}`} />
                ))}
              </div>
            </div>
            {r.review_text && <p className="text-sm text-muted-foreground">{r.review_text}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
