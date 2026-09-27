
import React, { useState } from "react";
import { TIMETABLE_DATA } from "@/data/timetableData";
import { Calendar, Clock, BookOpen } from "lucide-react";

export const TimetableWidget = () => {
  const [selectedBatchId, setSelectedBatchId] = useState(TIMETABLE_DATA[0].id);

  const selectedBatch = TIMETABLE_DATA.find(b => b.id === selectedBatchId) || TIMETABLE_DATA[0];

  return (
    <div className="bg-card border border-border/80 rounded-2xl p-5 md:p-6 shadow-sm flex flex-col h-full">
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

      <div className="relative overflow-x-auto rounded-xl border border-border/50 flex-grow">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase bg-secondary/50 text-muted-foreground">
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

