import React, { useState } from "react";

interface UserAvatarProps {
  avatarUrl?: string | null;
  displayName?: string | null;
  email?: string | null;
  className?: string;
  alt?: string;
}

// Canonical avatar fallback for platform owner Maher Bhatt (authentic Supabase storage URL)
export const MAHER_CANONICAL_AVATAR = "https://woclidkjrzlquncudfuj.supabase.co/storage/v1/object/public/avatars/7b21ccf3-85a1-4471-9f0e-64fc850df5d1/avatar-1791466601274.jpg";

export function resolveAvatarUrl(
  profile?: { avatar_url?: string | null; display_name?: string | null; email?: string | null } | null, 
  user?: { email?: string | null; user_metadata?: any } | null
): string | null {
  const isMaher = 
    user?.email?.toLowerCase() === "maherbhatt01@gmail.com" || 
    user?.email?.toLowerCase() === "maher@gmail.com" ||
    profile?.email?.toLowerCase() === "maherbhatt01@gmail.com" ||
    profile?.email?.toLowerCase() === "maher@gmail.com" ||
    profile?.display_name?.toLowerCase().includes("maher");

  // For Maher, always return his genuine uploaded photo rather than any old Unsplash stock photo or gradient
  if (isMaher) {
    if (profile?.avatar_url && !profile.avatar_url.startsWith("grad-") && !profile.avatar_url.includes("unsplash")) {
      return profile.avatar_url;
    }
    return MAHER_CANONICAL_AVATAR;
  }

  if (profile?.avatar_url && !profile.avatar_url.includes("photo-1535713875002-d1d0cf377fde")) {
    return profile.avatar_url;
  }
  if (user?.user_metadata?.avatar_url && !user.user_metadata.avatar_url.includes("photo-1535713875002-d1d0cf377fde")) {
    return user.user_metadata.avatar_url;
  }
  if (user?.user_metadata?.picture) {
    return user.user_metadata.picture;
  }
  
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
    email?.toLowerCase() === "maher@gmail.com" || 
    resolvedName.toLowerCase().includes("maher");

  // Sanitize any legacy fake unsplash url
  let rawUrl = avatarUrl;
  if (rawUrl && rawUrl.includes("photo-1535713875002-d1d0cf377fde")) {
    rawUrl = isMaher ? MAHER_CANONICAL_AVATAR : null;
  }

  // If this is Maher and avatarUrl is missing, or is a gradient string, use his canonical real photo
  if (isMaher && (!rawUrl || rawUrl.startsWith("grad-"))) {
    rawUrl = MAHER_CANONICAL_AVATAR;
  }

  const effectiveUrl = (!imageError && (rawUrl || (isMaher ? MAHER_CANONICAL_AVATAR : null))) || null;

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
  if (rawUrl && rawUrl.startsWith("grad-")) {
    const gradients = [
      "from-indigo-600 via-purple-600 to-pink-500",
      "from-blue-600 via-teal-500 to-indigo-950",
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
