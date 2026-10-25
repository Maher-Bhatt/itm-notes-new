import React, { useState, useEffect } from "react";
import markTransparent from "@/assets/brand/itm-moocs-mark-transparent.png";
import { Sparkles, GraduationCap, ChevronRight } from "lucide-react";
import { Capacitor } from "@capacitor/core";
import { Haptics, ImpactStyle } from "@capacitor/haptics";

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
    }, 110);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const fadeTimer = setTimeout(() => {
        setIsFading(true);
      }, 200);

      const hideTimer = setTimeout(() => {
        setIsVisible(false);
        if (onComplete) onComplete();
      }, 700);

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
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div
      onClick={handleSkip}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between p-6 sm:p-8 bg-gradient-to-br from-[#0c221c] via-[#12332c] to-[#071713] text-[#F5F1E8] select-none cursor-pointer transition-opacity duration-500 cubic-bezier(0.25, 0.46, 0.45, 0.94) ${
        isFading ? "opacity-0 pointer-events-none scale-105 transition-transform" : "opacity-100"
      }`}
    >
      {/* Top University Branding + Skip affordance */}
      <div className="pt-6 w-full flex items-center justify-between animate-fade-in">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-[#D6E85D]/15 text-[#D6E85D] border border-[#D6E85D]/30 shadow-xs">
            <GraduationCap className="h-4 w-4" />
          </div>
          <span className="text-xs font-bold tracking-wider uppercase text-[#D6E85D] font-display">
            ITM SLS Baroda University
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleSkip();
          }}
          className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-[#D6E85D] text-[10px] font-bold border border-white/10 flex items-center gap-1 transition-all active:scale-95"
        >
          <span>Skip</span>
          <ChevronRight className="h-3 w-3" />
        </button>
      </div>

      {/* Center Logo Block with Glow Pulse Animation */}
      <div className="flex flex-col items-center justify-center text-center space-y-6 animate-scale-in">
        <div className="relative flex items-center justify-center">
          {/* Pulsing Backlight Rings */}
          <div className="absolute w-40 h-40 rounded-full bg-[#D6E85D]/20 blur-2xl animate-pulse" />
          <div className="absolute w-32 h-32 rounded-full border-2 border-[#D6E85D]/30 animate-spin" style={{ animationDuration: '8s' }} />

          {/* Logo Mark Container */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 p-4 sm:p-5 rounded-3xl bg-[#183F36] border border-[#255b4e] shadow-2xl flex items-center justify-center transform hover:scale-105 transition-transform">
            <img
              src={markTransparent}
              alt="ITM Notes Logo"
              className="w-full h-full object-contain filter drop-shadow-[0_4px_12px_rgba(214,232,93,0.3)] animate-pulse"
            />
          </div>
        </div>

        {/* Brand Title */}
        <div className="space-y-1">
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[#F5F1E8] font-heading">
              ITM <span className="text-[#D6E85D]">Notes</span>
            </h1>
          </div>
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#A2BAAF] font-display">
            Your Academic Companion
          </p>
        </div>
      </div>

      {/* Bottom Loading Progress & Footer */}
      <div className="w-full max-w-xs space-y-6 pb-12 sm:pb-8 flex flex-col items-center">
        <div className="w-full space-y-3">
          {/* Progress Bar Container */}
          <div className="w-full h-1.5 rounded-full bg-[#1A4238] overflow-hidden border border-[#255b4e]/50 p-0.5 shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-[#C8DC47] to-[#D6E85D] rounded-full transition-all duration-300 ease-out shadow-[0_0_12px_rgba(214,232,93,0.8)]"
              style={{ width: `${Math.min(100, progress)}%` }}
            />
          </div>

          <div className="flex items-center justify-between w-full text-[10px] text-[#A2BAAF] font-mono">
            <span className="flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-[#D6E85D] animate-spin" />
              Loading Course Packs...
            </span>
            <span className="font-bold text-[#D6E85D]">{Math.min(100, progress)}%</span>
          </div>
        </div>

        {/* Made by attribution */}
        <div className="text-[12px] text-[#A2BAAF]/90 font-medium tracking-wide bg-[#183F36]/50 px-4 py-1.5 rounded-full border border-[#D6E85D]/20 shadow-md">
          Designed & Built by <span className="font-bold text-[#D6E85D]">Maher Bhatt</span>
        </div>
      </div>
    </div>
  );
}
