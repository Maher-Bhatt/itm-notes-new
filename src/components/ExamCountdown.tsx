import React, { useState, useEffect, useMemo } from "react";
import { Clock, CalendarDays, AlertTriangle, ChevronDown, Sparkles } from "lucide-react";
import { TIMETABLE_DATA, TimetableBatch } from "@/data/timetableData";

export const ExamCountdown = () => {
  // Available batches from TIMETABLE_DATA plus Upcoming University Finals
  const [selectedBatchId, setSelectedBatchId] = useState<string>("bca-sem3");
  const [targetExamDate, setTargetExamDate] = useState<number>(() => {
    // Default to an upcoming university exam window in the current/upcoming term
    const now = new Date();
    // Default target: 30 days from now at 10:00 AM
    const future = new Date(now.getTime() + 18 * 24 * 60 * 60 * 1000);
    future.setHours(10, 0, 0, 0);
    return future.getTime();
  });
  const [examLabel, setExamLabel] = useState<string>("Upcoming Mid-Semester Tests (MST-2 / Finals)");

  const currentBatch = useMemo(() => {
    return TIMETABLE_DATA.find((b) => b.id === selectedBatchId) || TIMETABLE_DATA[0];
  }, [selectedBatchId]);

  // When batch changes, find next upcoming exam or calculate next exam milestone
  useEffect(() => {
    if (!currentBatch || currentBatch.exams.length === 0) return;

    const now = new Date().getTime();
    // Try to parse batch exam dates (format "DD-MM-YYYY")
    let upcomingExam: { name: string; timestamp: number } | null = null;

    for (const exam of currentBatch.exams) {
      const parts = exam.date.split("-");
      if (parts.length === 3) {
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const year = parseInt(parts[2], 10);
        const examDate = new Date(year, month, day, 10, 10, 0).getTime();
        if (examDate > now) {
          upcomingExam = { name: `${exam.courseName} (${exam.courseCode})`, timestamp: examDate };
          break;
        }
      }
    }

    if (upcomingExam) {
      setTargetExamDate(upcomingExam.timestamp);
      setExamLabel(upcomingExam.name);
    } else {
      // If past exam schedule, set to upcoming semester finals
      const nextWindow = new Date();
      nextWindow.setDate(nextWindow.getDate() + 24);
      nextWindow.setHours(10, 0, 0, 0);
      setTargetExamDate(nextWindow.getTime());
      setExamLabel(`${currentBatch.name} - Upcoming University Term Examination`);
    }
  }, [currentBatch]);

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isExamDay, setIsExamDay] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetExamDate - now;

      if (distance <= 0) {
        setIsExamDay(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setIsExamDay(false);
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetExamDate]);

  return (
    <div className="w-full relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 shadow-lg text-white mb-6 md:mb-8 border border-red-400/30">
      {/* Decorative background circles */}
      <div className="absolute -right-10 -top-10 w-44 h-44 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -left-10 -bottom-10 w-36 h-36 bg-yellow-400/20 rounded-full blur-2xl pointer-events-none" />

      <div className="relative p-5 md:p-6 flex flex-col lg:flex-row items-center justify-between gap-5 z-10">
        <div className="flex items-center gap-4 text-center md:text-left flex-col md:flex-row w-full lg:w-auto">
          <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl shrink-0 mx-auto">
            {isExamDay ? <AlertTriangle className="h-8 w-8 text-yellow-100" /> : <CalendarDays className="h-8 w-8 text-white" />}
          </div>
          <div>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-black/20 text-white/90 border border-white/20">
                Official Exam Schedule
              </span>
              {/* Batch Switcher */}
              <div className="relative inline-block text-left">
                <select
                  value={selectedBatchId}
                  onChange={(e) => setSelectedBatchId(e.target.value)}
                  className="bg-black/30 hover:bg-black/40 text-white text-xs font-semibold rounded-lg px-2.5 py-1 border border-white/20 outline-none cursor-pointer pr-6 appearance-none transition-colors"
                >
                  {TIMETABLE_DATA.map((batch) => (
                    <option key={batch.id} value={batch.id} className="bg-zinc-900 text-white">
                      {batch.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 pointer-events-none opacity-80" />
              </div>
            </div>

            <h3 className="font-extrabold text-lg md:text-xl leading-tight">
              {isExamDay ? "Exam Season is In Session!" : examLabel}
            </h3>
            <p className="text-red-100 text-xs md:text-sm mt-1 max-w-xl">
              {isExamDay
                ? "Good luck on your papers! Remember to carry your Hall Ticket and University ID."
                : "Make sure you complete your revisions. High-weightage IMP question banks are available!"}
            </p>
          </div>
        </div>

        {!isExamDay && (
          <div className="flex items-center gap-3 bg-black/30 backdrop-blur-md rounded-2xl p-3 md:p-4 shrink-0 border border-white/15 shadow-inner">
            <Clock className="h-5 w-5 text-amber-200 opacity-90 shrink-0" />
            
            <div className="flex items-baseline gap-2">
              <div className="text-center min-w-[36px]">
                <span className="text-2xl md:text-3xl font-black font-mono tracking-tight">{String(timeLeft.days).padStart(2, "0")}</span>
                <span className="text-[9px] uppercase font-bold text-red-200 block -mt-1 tracking-wider">Days</span>
              </div>
              <span className="text-xl font-bold opacity-50 -mt-2">:</span>
              <div className="text-center min-w-[36px]">
                <span className="text-2xl md:text-3xl font-black font-mono tracking-tight">{String(timeLeft.hours).padStart(2, "0")}</span>
                <span className="text-[9px] uppercase font-bold text-red-200 block -mt-1 tracking-wider">Hrs</span>
              </div>
              <span className="text-xl font-bold opacity-50 -mt-2">:</span>
              <div className="text-center min-w-[36px]">
                <span className="text-2xl md:text-3xl font-black font-mono tracking-tight">{String(timeLeft.minutes).padStart(2, "0")}</span>
                <span className="text-[9px] uppercase font-bold text-red-200 block -mt-1 tracking-wider">Min</span>
              </div>
              <span className="text-xl font-bold opacity-50 -mt-2">:</span>
              <div className="text-center min-w-[36px]">
                <span className="text-2xl md:text-3xl font-black font-mono tracking-tight">{String(timeLeft.seconds).padStart(2, "0")}</span>
                <span className="text-[9px] uppercase font-bold text-red-200 block -mt-1 tracking-wider">Sec</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

