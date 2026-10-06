
import React, { useState, useEffect } from "react";
import { TIMETABLE_DATA } from "@/data/timetableData";
import { Calendar, Clock, BookOpen } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export const TimetableWidget = () => {
  const { profile } = useAuth();
  
  const defaultBatchId = React.useMemo(() => {
    if (profile?.program && profile?.semester) {
      const baseId = `${profile.program.toLowerCase()}-sem${profile.semester}`;
      
      // Try exact match first
      let match = TIMETABLE_DATA.find(b => b.id === baseId);
      
      // Try with branch suffix if exact match fails
      if (!match && profile.branch) {
        const branchLower = profile.branch.toLowerCase();
        let branchCode = 'cse'; // Default to CSE
        if (branchLower.includes('ai') || branchLower.includes('artificial')) branchCode = 'aids';
        else if (branchLower.includes('cyber') || branchLower.includes('csn')) branchCode = 'csn';
        
        match = TIMETABLE_DATA.find(b => b.id === `${baseId}-${branchCode}`);
      }
      
      // Try any that starts with the baseId (e.g. b.tech-sem3)
      if (!match) {
        match = TIMETABLE_DATA.find(b => b.id.startsWith(baseId));
      }
      
      if (match) return match.id;
    }
    return TIMETABLE_DATA[0].id;
  }, [profile]);

  const [selectedBatchId, setSelectedBatchId] = useState(defaultBatchId);

  useEffect(() => {
    setSelectedBatchId(defaultBatchId);
  }, [defaultBatchId]);

  const selectedBatch = TIMETABLE_DATA.find(b => b.id === selectedBatchId) || TIMETABLE_DATA[0];

  return (
    <div className="bg-card border border-border/80 rounded-2xl p-5 md:p-6 shadow-sm flex flex-col">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Exam Timetable
          </h2>
          <p className="text-sm text-muted-foreground mt-1">Official MST / CET-2 Schedule (Sept-Oct 2026)</p>
        </div>

        <select 
          className="bg-secondary text-foreground text-sm font-medium border border-border/50 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary/50 transition-all cursor-pointer min-w-[200px]"
          value={selectedBatchId}
          onChange={(e) => setSelectedBatchId(e.target.value)}
        >
          {TIMETABLE_DATA.map(batch => (
            <option key={batch.id} value={batch.id}>{batch.name}</option>
          ))}
        </select>
      </div>

      {/* Mobile View: Compact Examination Cards (Zero Horizontal Scroll Needed) */}
      <div className="sm:hidden space-y-3">
        {selectedBatch.exams.map((exam, index) => (
          <div key={index} className="p-4 rounded-xl border border-border/70 bg-secondary/20 flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold text-primary px-2.5 py-0.5 rounded-full bg-primary/10">
                {exam.date}
              </span>
              <span className="text-[11px] font-mono text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {exam.time}
              </span>
            </div>
            <div className="flex items-start gap-2 pt-1">
              <BookOpen className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-foreground leading-snug">
                  {exam.courseName}
                </h4>
                <p className="text-[11px] font-mono text-muted-foreground mt-0.5">
                  Code: {exam.courseCode}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop / Laptop View: High-Density Table with Sticky Header */}
      <div className="hidden sm:block relative overflow-x-auto overflow-y-auto max-h-[450px] rounded-xl border border-border/50">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase bg-secondary/50 text-muted-foreground sticky top-0 z-10 shadow-sm">
            <tr>
              <th scope="col" className="px-4 py-3 font-semibold whitespace-nowrap">Date</th>
              <th scope="col" className="px-4 py-3 font-semibold whitespace-nowrap">Time</th>
              <th scope="col" className="px-4 py-3 font-semibold whitespace-nowrap">Course Code</th>
              <th scope="col" className="px-4 py-3 font-semibold w-full">Subject</th>
            </tr>
          </thead>
          <tbody>
            {selectedBatch.exams.map((exam, index) => (
              <tr key={index} className="border-b border-border/30 last:border-0 hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3.5 font-medium text-foreground whitespace-nowrap">
                  {exam.date}
                </td>
                <td className="px-4 py-3.5 whitespace-nowrap text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 opacity-70" />
                    {exam.time}
                  </div>
                </td>
                <td className="px-4 py-3.5 font-mono text-xs text-muted-foreground whitespace-nowrap">
                  {exam.courseCode}
                </td>
                <td className="px-4 py-3.5 font-medium text-primary">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-3.5 w-3.5 opacity-70 shrink-0" />
                    <span>{exam.courseName}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

