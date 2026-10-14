import React, { useState } from "react";

interface UserAvatarProps {
  avatarUrl?: string | null;
  displayName?: string | null;
  email?: string | null;
  className?: string;
  alt?: string;
}

// Canonical avatar fallback for platform owner Maher Bhatt
export const MAHER_CANONICAL_AVATAR = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150";

export function resolveAvatarUrl(profile?: { avatar_url?: string | null; display_name?: string | null } | null, user?: { email?: string | null; user_metadata?: any } | null): string | null {
  if (profile?.avatar_url) return profile.avatar_url;
  if (user?.user_metadata?.avatar_url) return user.user_metadata.avatar_url;
  if (user?.user_metadata?.picture) return user.user_metadata.picture;
  
  const isMaher = 
    user?.email?.toLowerCase() === "maherbhatt01@gmail.com" || 
    profile?.display_name?.toLowerCase().includes("maher");
  
  if (isMaher) return MAHER_CANONICAL_AVATAR;
  return null;
}

export function UserAvatar({
  avatarUrl,
  displayName,
  email,
  className = "w-9 h-9 text-xs",
  alt,
}: UserAvatarProps) {
  const [imageError, setImageError] = useState(false);

  const resolvedName = displayName || (email ? email.split("@")[0] : "Student");
  const isMaher = 
    email?.toLowerCase() === "maherbhatt01@gmail.com" || 
    resolvedName.toLowerCase().includes("maher");

  const effectiveUrl = (!imageError && (avatarUrl || (isMaher ? MAHER_CANONICAL_AVATAR : null))) || null;

  // 1. Valid Remote or Data URL
  if (effectiveUrl && (effectiveUrl.startsWith("http") || effectiveUrl.startsWith("data:image"))) {
    return (
      <img
        src={effectiveUrl}
        alt={alt || resolvedName}
        onError={() => setImageError(true)}
        className={`${className} rounded-full object-cover border border-slate-700/60 shadow-xs shrink-0 bg-slate-800`}
      />
    );
  }

  // 2. Preset Gradient
  if (avatarUrl && avatarUrl.startsWith("grad-")) {
    const gradients = [
      "from-indigo-600 via-purple-600 to-pink-500",
      "from-blue-600 via-teal-500 to-emerald-500",
      "from-amber-500 via-orange-600 to-red-600",
      "from-fuchsia-600 to-cyan-500",
    ];
    const idx = Math.abs((resolvedName.charCodeAt(0) || 0) % gradients.length);
    const grad = gradients[idx];

    return (
      <div
        className={`${className} rounded-full bg-gradient-to-tr ${grad} text-white font-bold flex items-center justify-center shrink-0 border border-slate-700/60 shadow-xs`}
      >
        {resolvedName.charAt(0).toUpperCase()}
      </div>
    );
  }

  // 3. Clean Initials Avatar
  const initial = resolvedName.trim() ? resolvedName.trim().charAt(0).toUpperCase() : "S";

  return (
    <div
      className={`${className} rounded-full bg-gradient-to-tr from-indigo-600 via-blue-600 to-teal-500 text-white font-bold flex items-center justify-center shrink-0 border border-slate-700/60 shadow-xs`}
    >
      {initial}
    </div>
  );
}
