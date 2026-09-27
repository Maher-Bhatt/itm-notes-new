
import React, { useState, useEffect } from "react";
import { Clock, CalendarDays, AlertTriangle } from "lucide-react";

export const ExamCountdown = () => {
  // Target: Sept 30, 2026 10:10 AM
  const targetDate = new Date("2026-09-30T10:10:00").getTime();
  
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isExamDay, setIsExamDay] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(timer);
        setIsExamDay(true);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="w-full relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-600 to-orange-500 shadow-lg text-white mb-6 md:mb-8 border border-red-400/30">
      {/* Decorative background circles */}
      <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
      <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-yellow-500/20 rounded-full blur-2xl"></div>

      <div className="relative p-5 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 z-10">
        <div className="flex items-center gap-4 text-center md:text-left flex-col md:flex-row">
          <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl flex-shrink-0 mx-auto">
            {isExamDay ? <AlertTriangle className="h-8 w-8 text-yellow-100" /> : <CalendarDays className="h-8 w-8 text-white" />}
          </div>
          <div>
            <h3 className="font-bold text-lg md:text-xl leading-tight">
              {isExamDay ? "Exam Season is Here!" : "MST & CET-2 Exams are Approaching!"}
            </h3>
            <p className="text-red-100 text-sm mt-1">
              {isExamDay ? "Good luck on your papers. Stay calm and do your best." : "Make sure you complete your revisions. Question banks are now available!"}
            </p>
          </div>
        </div>

        {!isExamDay && (
          <div className="flex items-center gap-3 bg-black/20 backdrop-blur-md rounded-xl p-3 md:p-4 shrink-0 border border-white/10 shadow-inner">
            <Clock className="h-5 w-5 opacity-80" />
            
            <div className="flex items-baseline gap-2">
              <div className="text-center">
                <span className="text-2xl md:text-3xl font-black font-mono tracking-tight">{String(timeLeft.days).padStart(2, "0")}</span>
                <span className="text-[10px] uppercase font-bold text-red-200 block -mt-1 tracking-wider">Days</span>
              </div>
              <span className="text-xl font-bold opacity-50 -mt-2">:</span>
              <div className="text-center">
                <span className="text-2xl md:text-3xl font-black font-mono tracking-tight">{String(timeLeft.hours).padStart(2, "0")}</span>
                <span className="text-[10px] uppercase font-bold text-red-200 block -mt-1 tracking-wider">Hrs</span>
              </div>
              <span className="text-xl font-bold opacity-50 -mt-2">:</span>
              <div className="text-center">
                <span className="text-2xl md:text-3xl font-black font-mono tracking-tight">{String(timeLeft.minutes).padStart(2, "0")}</span>
                <span className="text-[10px] uppercase font-bold text-red-200 block -mt-1 tracking-wider">Min</span>
              </div>
              <span className="text-xl font-bold opacity-50 -mt-2">:</span>
              <div className="text-center">
                <span className="text-2xl md:text-3xl font-black font-mono tracking-tight">{String(timeLeft.seconds).padStart(2, "0")}</span>
                <span className="text-[10px] uppercase font-bold text-red-200 block -mt-1 tracking-wider">Sec</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

