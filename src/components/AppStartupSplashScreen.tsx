import React, { useState, useEffect } from "react";
import { Sparkles, ChevronRight, BookOpen } from "lucide-react";
import { Capacitor } from "@capacitor/core";
import { Haptics, ImpactStyle } from "@capacitor/haptics";
import { CampusLoopLogo } from "@/components/campusloop/CampusLoopLogo";

interface AppStartupSplashScreenProps {
  onComplete?: () => void;
}

export function AppStartupSplashScreen({ onComplete }: AppStartupSplashScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Trigger gentle native haptic vibration on startup
    if (Capacitor.isNativePlatform()) {
      try {
        Haptics.impact({ style: ImpactStyle.Medium });
      } catch (e) {
        // Fallback silently
      }
    }

    // Smooth progress animation from 0% to 100%
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 25) + 15;
      });
    }, 90);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const fadeTimer = setTimeout(() => {
        setIsFading(true);
      }, 150);

      const hideTimer = setTimeout(() => {
        setIsVisible(false);
        if (onComplete) onComplete();
      }, 500);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [progress, onComplete]);

  // Handle instant tap to skip splash
  const handleSkip = () => {
    if (Capacitor.isNativePlatform()) {
      try {
        Haptics.impact({ style: ImpactStyle.Light });
      } catch (e) {}
    }
    setIsFading(true);
    setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, 200);
  };

  if (!isVisible) return null;

  return (
    <div
      onClick={handleSkip}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between p-6 sm:p-8 bg-[#161412] text-[#F6F2EC] select-none cursor-pointer transition-opacity duration-300 ${
        isFading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Top University Branding + Skip affordance */}
      <div className="pt-6 w-full flex items-center justify-between animate-fade-in max-w-sm">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-white/10 text-[#F6F2EC] border border-white/15">
            <BookOpen className="h-4 w-4" />
          </div>
          <span className="text-xs font-semibold tracking-wider uppercase text-stone-300 font-sans">
            Semester 3 Library
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleSkip();
          }}
          className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-[#F6F2EC] text-[11px] font-medium border border-white/10 flex items-center gap-1 transition-all active:scale-95"
        >
          <span>Skip</span>
          <ChevronRight className="h-3 w-3" />
        </button>
      </div>

      {/* Center Logo Block with Calm Editorial Style */}
      <div className="flex flex-col items-center justify-center text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-[#A85A32] text-white flex items-center justify-center shadow-lg font-serif text-2xl font-bold">
          CL
        </div>

        <div className="space-y-1">
          <h1 className="text-3xl sm:text-4xl font-serif font-semibold tracking-tight text-[#F6F2EC]">
            CampusLoop
          </h1>
          <p className="text-xs font-sans text-stone-400 tracking-wide">
            Your semester, in one calm place
          </p>
        </div>
      </div>

      {/* Bottom Loading Progress & Footer */}
      <div className="w-full max-w-xs space-y-4 pb-10 flex flex-col items-center">
        <div className="w-full space-y-2">
          {/* Progress Bar Container */}
          <div className="w-full h-1 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-[#A85A32] rounded-full transition-all duration-200 ease-out"
              style={{ width: `${Math.min(100, progress)}%` }}
            />
          </div>

          <div className="flex items-center justify-between w-full text-[11px] text-stone-400 font-mono">
            <span className="flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-[#A85A32] animate-spin" />
              Loading library...
            </span>
            <span className="font-semibold text-stone-300">{Math.min(100, progress)}%</span>
          </div>
        </div>

        <div className="text-[11px] text-stone-400 font-medium">
          Built by <span className="font-semibold text-stone-200">Maher Bhatt</span>
        </div>
      </div>
    </div>
  );
}
