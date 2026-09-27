// @ts-nocheck
import { createContext, useContext, useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export interface UserProfile {
  id?: string;
  user_id?: string;
  email?: string | null;
  display_name: string | null;
  avatar_url: string | null;
  bio?: string | null;
  branch?: string | null;
  program?: string | null;
  semester?: number | null;
  enrollment_no?: string | null;
  target_cgpa?: string | null;
  goal?: string | null;
  onboarding_completed?: boolean | null;
  level?: number;
  xp?: number;
  streak_days?: number;
  role?: string | null;
  status?: string | null;
  created_at?: string;
  updated_at?: string;
}

type AppRole = 'admin' | 'moderator' | 'user';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: UserProfile | null;
  role: AppRole | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  uploadAvatar: (file: File) => Promise<string>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('itm_student_profile');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return null;
  });
  const [role, setRole] = useState<AppRole | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProfileAndRole = async (userId: string) => {
    try {
      const [profileResponse, rolesResponse] = await Promise.all([
        supabase.from('profiles').select('*').eq('user_id', userId).maybeSingle(),
        supabase.from('user_roles').select('role').eq('user_id', userId)
      ]);

      if (profileResponse.data) {
        setProfile(profileResponse.data as any);
        try {
          localStorage.setItem('itm_student_profile', JSON.stringify(profileResponse.data));
        } catch {
          // ignore
        }
      } else {
        // Auto-create initial profile for user in Supabase with genuine data
        const defaultName = session?.user?.user_metadata?.display_name || session?.user?.email?.split('@')[0] || 'Student';
        const { data } = await supabase.from('profiles').insert({
          user_id: userId,
          email: session?.user?.email || null,
          display_name: defaultName,
          branch: "B.Tech CSE '26",
          program: "B.Tech",
          semester: 3,
          xp: 0,
          level: 1,
          streak_days: 1,
          onboarding_completed: false,
        }).select().maybeSingle();

        if (data) {
          setProfile(data as any);
          try {
            localStorage.setItem('itm_student_profile', JSON.stringify(data));
          } catch {}
        }
      }
      
      if (rolesResponse.data) {
        const roles = rolesResponse.data.map(r => r.role);
        if (roles.includes('admin') || session?.user?.email === 'maherbhatt01@gmail.com') {
          setRole('admin');
        } else if (roles.length > 0) {
          setRole(roles[0] as AppRole);
        } else {
          setRole('user');
        }
      } else if (session?.user?.email === 'maherbhatt01@gmail.com') {
        setRole('admin');
      }
    } catch (error) {
      console.error("Error fetching user data from Supabase:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshProfile = async () => {
    if (user?.id) {
      await fetchProfileAndRole(user.id);
    }
  };

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfileAndRole(session.user.id);
      } else {
        setProfile(null);
        localStorage.removeItem('itm_student_profile');
        setIsLoading(false);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfileAndRole(session.user.id);
      } else {
        setProfile(null);
        localStorage.removeItem('itm_student_profile');
        setRole(null);
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user?.id) return;

    const payload: Record<string, any> = {
      user_id: user.id,
      updated_at: new Date().toISOString(),
    };

    if (updates.display_name !== undefined) payload.display_name = updates.display_name;
    if (updates.avatar_url !== undefined) payload.avatar_url = updates.avatar_url;
    if (updates.bio !== undefined) payload.bio = updates.bio;
    if (updates.branch !== undefined) payload.branch = updates.branch;
    if (updates.program !== undefined) payload.program = updates.program;
    if (updates.semester !== undefined) payload.semester = updates.semester;
    if (updates.enrollment_no !== undefined) payload.enrollment_no = updates.enrollment_no;
    if (updates.target_cgpa !== undefined) payload.target_cgpa = updates.target_cgpa;
    if (updates.goal !== undefined) payload.goal = updates.goal;
    if (updates.onboarding_completed !== undefined) payload.onboarding_completed = updates.onboarding_completed;
    if (updates.xp !== undefined) payload.xp = updates.xp;
    if (updates.level !== undefined) payload.level = updates.level;
    if (updates.streak_days !== undefined) payload.streak_days = updates.streak_days;

    // Optimistic local state update
    setProfile(prev => {
      const merged = { ...prev, ...updates };
      try {
        localStorage.setItem('itm_student_profile', JSON.stringify(merged));
      } catch (err) {
        console.error('Failed to save profile to localStorage:', err);
      }
      return merged;
    });

    try {
      const { data, error } = await supabase
        .from('profiles')
        .upsert(payload)
        .select()
        .maybeSingle();

      if (error) throw error;
      if (data) {
        setProfile(data as any);
        try {
          localStorage.setItem('itm_student_profile', JSON.stringify(data));
        } catch {}
      }
    } catch (err) {
      console.error("Failed to update profile in Supabase:", err);
      throw err;
    }
  };

  const uploadAvatar = async (file: File): Promise<string> => {
    if (!user?.id) throw new Error("Please log in to upload a profile picture.");

    // Validate image file
    const validMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!validMimes.includes(file.type)) {
      throw new Error("Invalid image format. Supported formats: JPEG, PNG, WEBP, GIF.");
    }
    if (file.size > 5 * 1024 * 1024) {
      throw new Error("Image must be under 5MB in size.");
    }

    const fileExt = file.name.split('.').pop() || 'png';
    const filePath = `${user.id}/avatar-${Date.now()}.${fileExt}`;

    try {
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, {
          contentType: file.type,
          upsert: true,
        });

      if (uploadError) {
        console.warn("Storage upload error, falling back to base64 data URL:", uploadError.message);
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = async () => {
            const dataUrl = reader.result as string;
            await updateProfile({ avatar_url: dataUrl });
            resolve(dataUrl);
          };
          reader.onerror = () => reject(new Error("Failed to read image file."));
          reader.readAsDataURL(file);
        });
      }

      const { data: publicUrlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      const publicUrl = publicUrlData.publicUrl;
      await updateProfile({ avatar_url: publicUrl });
      return publicUrl;
    } catch (err: any) {
      console.error("Avatar upload exception:", err);
      throw err;
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.error("Signout error:", e);
    }
    localStorage.removeItem('itm_student_profile');
    localStorage.removeItem('itm_admin_god_mode');
    localStorage.removeItem('itm_notes_progress');
    localStorage.removeItem('itm_notes_gamification_v2');
    setProfile(null);
    setUser(null);
    setSession(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ session, user, profile, role, isLoading, signOut, updateProfile, uploadAvatar, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
