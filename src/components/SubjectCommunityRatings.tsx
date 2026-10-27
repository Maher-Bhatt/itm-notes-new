import React, { useState } from 'react';
import { 
  Star, 
  Clock, 
  TrendingUp, 
  Users, 
  MessageSquare, 
  Award, 
  CheckCircle2, 
  ThumbsUp,
  Sparkles
} from 'lucide-react';
import { useGamification } from '@/hooks/useGamification';
import { toast } from 'sonner';

export interface SubjectCommunityRatingData {
  subjectId: string;
  difficultyScore: number; // 1 to 5
  averageWeeklyHours: number;
  passRatePercentage: number;
  topperTips: string[];
  totalVotes: number;
}

const DEFAULT_RATINGS: Record<string, SubjectCommunityRatingData> = {
  oopj: {
    subjectId: 'oopj',
    difficultyScore: 3.5,
    averageWeeklyHours: 5,
    passRatePercentage: 88,
    topperTips: [
      'Write executable Java code syntax with exception handling for 7-mark questions.',
      'Practice Dynamic Method Dispatch and Interface default methods thoroughly.',
      'Unit 4 Multithreading (wait/notify) is guaranteed in Section B.'
    ],
    totalVotes: 142
  },
  dsa: {
    subjectId: 'dsa',
    difficultyScore: 4.5,
    averageWeeklyHours: 8,
    passRatePercentage: 74,
    topperTips: [
      'Draw the step-by-step tree rotation diagram for AVL insertion (LL, LR, RL, RR).',
      'Circular Queue modulo arithmetic and Infix to Postfix stack tables score full marks.',
      'Always state both Time and Auxiliary Space complexities in answers.'
    ],
    totalVotes: 198
  },
  'ca-101': {
    subjectId: 'ca-101',
    difficultyScore: 4.2,
    averageWeeklyHours: 6.5,
    passRatePercentage: 79,
    topperTips: [
      'Master Booth’s Multiplication flowchart and write all arithmetic register steps clearly.',
      'AMAT formulas and Cache mapping problems are scoring if formulas are memorized.',
      'Pipeline hazard operand forwarding diagrams save 10+ marks.'
    ],
    totalVotes: 165
  },
  dbms: {
    subjectId: 'dbms',
    difficultyScore: 3.2,
    averageWeeklyHours: 4.5,
    passRatePercentage: 91,
    topperTips: [
      'Draw neat ER diagrams with clear primary/foreign key cardinalities.',
      'BCNF vs 3NF questions require proving functional dependency candidate keys.',
      'ACID properties with real-world banking transaction examples are mandatory.'
    ],
    totalVotes: 124
  },
  conmp: {
    subjectId: 'conmp',
    difficultyScore: 3.8,
    averageWeeklyHours: 6,
    passRatePercentage: 82,
    topperTips: [
      'Newton-Raphson iteration tables must retain at least 4 decimal places.',
      'Simpson’s 1/3rd rule requires verifying that the interval count n is even.',
      'Always write the initial interval check f(a) * f(b) < 0 for root finding.'
    ],
    totalVotes: 110
  }
};

interface SubjectCommunityRatingsProps {
  subjectId: string;
}

export const SubjectCommunityRatings: React.FC<SubjectCommunityRatingsProps> = ({ subjectId }) => {
  const [data, setData] = useState<SubjectCommunityRatingData>(() => {
    return DEFAULT_RATINGS[subjectId] || {
      subjectId,
      difficultyScore: 3.5,
      averageWeeklyHours: 5,
      passRatePercentage: 85,
      topperTips: ['Review previous year question papers and practice university mock tests.'],
      totalVotes: 45
    };
  });

  const [userRating, setUserRating] = useState<number>(0);
  const [hasVoted, setHasVoted] = useState(false);
  const { addXp } = useGamification();

  const handleRate = (score: number) => {
    if (hasVoted) return;
    setUserRating(score);
    setHasVoted(true);

    const newVotes = data.totalVotes + 1;
    const newAvg = Math.round(((data.difficultyScore * data.totalVotes + score) / newVotes) * 10) / 10;

    setData(prev => ({
      ...prev,
      difficultyScore: newAvg,
      totalVotes: newVotes
    }));

    addXp(15, 'Contributed Subject Peer Review');
    toast.success(`Thank you for rating! (${score} Stars) +15 XP awarded.`);
  };

  return (
    <div className="bg-card border border-border/80 rounded-3xl p-6 shadow-sm space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/70 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <Users className="h-4 w-4" />
            </span>
            <h3 className="font-extrabold text-base text-foreground">
              Peer Community Difficulty & Topper Advice
            </h3>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Crowdsourced insights from senior students who completed this subject
          </p>
        </div>

        <span className="text-xs text-muted-foreground font-medium self-start sm:self-auto">
          {data.totalVotes} student reviews
        </span>
      </div>

      {/* 3 Metric Pills */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Difficulty */}
        <div className="p-4 rounded-2xl bg-secondary/30 border border-border/70 space-y-1">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
            Subject Difficulty
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xl font-black text-foreground">
              {data.difficultyScore} <span className="text-xs text-muted-foreground font-normal">/ 5</span>
            </span>
            <div className="flex text-amber-500">
              {[1, 2, 3, 4, 5].map(star => (
                <Star
                  key={star}
                  className={`h-3.5 w-3.5 ${star <= Math.round(data.difficultyScore) ? 'fill-amber-500' : 'text-muted-foreground/30'}`}
                />
              ))}
            </div>
          </div>
          <span className="text-[10px] text-muted-foreground block">
            {data.difficultyScore > 4 ? 'Challenging (High Effort)' : data.difficultyScore > 3 ? 'Moderate (Balanced)' : 'Conceptually Accessible'}
          </span>
        </div>

        {/* Weekly Hours */}
        <div className="p-4 rounded-2xl bg-secondary/30 border border-border/70 space-y-1">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
            Recommended Prep
          </span>
          <span className="text-xl font-black text-foreground block">
            ~{data.averageWeeklyHours} <span className="text-xs text-muted-foreground font-normal">hrs/week</span>
          </span>
          <span className="text-[10px] text-muted-foreground block">
            For grade A / A+ target
          </span>
        </div>

        {/* Pass Rate */}
        <div className="p-4 rounded-2xl bg-secondary/30 border border-border/70 space-y-1">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
            Historical Pass Rate
          </span>
          <span className="text-xl font-black text-indigo-400 dark:text-indigo-400 block">
            {data.passRatePercentage}%
          </span>
          <span className="text-[10px] text-muted-foreground block">
            Based on past 3 semesters
          </span>
        </div>
      </div>

      {/* Senior Topper Advice List */}
      <div className="space-y-2.5">
        <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-amber-500" />
          Senior Topper Advice & Exam Strategy:
        </span>
        <div className="space-y-2">
          {data.topperTips.map((tip, idx) => (
            <div 
              key={idx}
              className="p-3 rounded-2xl bg-primary/5 border border-primary/20 text-xs text-foreground/90 flex items-start gap-2.5"
            >
              <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <span className="leading-relaxed">{tip}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Rate This Subject Widget */}
      <div className="p-4 rounded-2xl bg-card border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-bold text-foreground block">
            How difficult do you find this subject?
          </span>
          <p className="text-[11px] text-muted-foreground">
            Help upcoming juniors by casting your difficulty vote (+15 XP)
          </p>
        </div>

        <div className="flex items-center gap-1.5 self-start sm:self-auto">
          {[1, 2, 3, 4, 5].map(star => (
            <button
              key={star}
              disabled={hasVoted}
              onClick={() => handleRate(star)}
              className={`p-1 rounded-lg transition-transform hover:scale-125 apple-press ${
                userRating >= star ? 'text-amber-500' : 'text-muted-foreground hover:text-amber-400'
              }`}
              title={`Rate ${star} Stars`}
            >
              <Star className={`h-5 w-5 ${userRating >= star ? 'fill-amber-500' : ''}`} />
            </button>
          ))}
          {hasVoted && (
            <span className="text-xs font-bold text-indigo-400 dark:text-indigo-400 ml-2">
              Voted!
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
