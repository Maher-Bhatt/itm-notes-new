import React from "react";
import markTransparent from "@/assets/brand/itm-moocs-mark-transparent.png";
import horizontalTransparent from "@/assets/brand/itm-moocs-horizontal-transparent.png";
import primaryTransparent from "@/assets/brand/itm-moocs-primary-transparent.png";

interface ItmMoocsLogoProps {
  variant?: "horizontal" | "mark" | "primary" | "live";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  showTagline?: boolean;
  inverted?: boolean;
}

/**
 * ItmMoocsLogo: Official Brand Kit Logo Component for ITM Notes.
 * Uses the authentic abstract arch/pathway mark, forest green, and chartreuse accents.
 * Supports compact UI, mark-only, or full horizontal lockup with live typography.
 */
export function ItmMoocsLogo({
  variant = "horizontal",
  size = "md",
  className = "",
  showTagline = false,
  inverted = false,
}: ItmMoocsLogoProps) {
  // Sizing maps
  const heightClasses = {
    sm: "h-7",
    md: "h-9",
    lg: "h-11",
    xl: "h-14",
  };

  const markSizeClasses = {
    sm: "w-7 h-7",
    md: "w-8 h-8",
    lg: "w-10 h-10",
    xl: "w-14 h-14",
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-xl",
    xl: "text-2xl",
  };

  if (variant === "mark") {
    return (
      <div className={`relative inline-flex items-center justify-center shrink-0 ${markSizeClasses[size]} ${className}`}>
        <img
          src={markTransparent}
          alt="ITM Notes Mark"
          className="w-full h-full object-contain"
          loading="eager"
        />
      </div>
    );
  }

  if (variant === "primary") {
    return (
      <div className={`inline-flex flex-col items-start ${className}`}>
        <img
          src={primaryTransparent}
          alt="ITM Notes — Your Academic Companion"
          className={`${heightClasses[size]} w-auto object-contain ${inverted ? "brightness-0 invert" : ""}`}
          loading="eager"
        />
      </div>
    );
  }

  if (variant === "live") {
    return (
      <div className={`inline-flex items-center gap-2.5 font-display select-none ${className}`}>
        <div className={`relative shrink-0 ${markSizeClasses[size]}`}>
          <img
            src={markTransparent}
            alt="ITM Notes Mark"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex flex-col justify-center leading-none">
          <div className="flex items-baseline gap-1">
            <span
              className={`font-extrabold tracking-tight ${textSizeClasses[size]} ${
                inverted ? "text-[#F5F1E8]" : "text-[#183F36] dark:text-[#E8EDE4]"
              }`}
            >
              ITM
            </span>
            <span
              className={`font-black tracking-tight ${textSizeClasses[size]} ${
                inverted ? "text-[#D6E85D]" : "text-[#183F36] dark:text-[#D6E85D]"
              }`}
            >
              Notes
            </span>
          </div>
          {showTagline && (
            <span
              className={`text-[9px] font-bold tracking-[0.18em] uppercase mt-0.5 ${
                inverted ? "text-[#D6E85D]/80" : "text-[#68716B] dark:text-[#D6E85D]/80"
              }`}
            >
              Your Academic Companion
            </span>
          )}
        </div>
      </div>
    );
  }

  // Default: horizontal transparent lockup
  return (
    <div className={`inline-flex items-center ${className}`}>
      <img
        src={horizontalTransparent}
        alt="ITM Notes"
        className={`${heightClasses[size]} w-auto object-contain ${inverted ? "brightness-0 invert" : ""}`}
        loading="eager"
      />
    </div>
  );
}

export default ItmMoocsLogo;
