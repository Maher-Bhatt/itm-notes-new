import { createContext, useContext, useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export interface UserProfile {
  id?: string;
  user_id?: string;
  display_name: string | null;
  avatar_url: string | null;
  bio?: string | null;
  target_cgpa?: string | null;
  goal?: string | null;
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

  const fetchProfileAndRole = async (userId: string) => {
    try {
      const [profileResponse, rolesResponse] = await Promise.all([
        supabase.from('profiles').select('*').eq('user_id', userId).maybeSingle(),
        supabase.from('user_roles').select('role').eq('user_id', userId)
      ]);

      if (profileResponse.data) {
        setProfile(prev => {
          const merged = { ...prev, ...profileResponse.data };
          try {
            localStorage.setItem('itm_student_profile', JSON.stringify(merged));
          } catch {
            // ignore
          }
          return merged;
        });
      } else {
        // Auto-create initial profile for user in Supabase
        const defaultName = session?.user?.user_metadata?.display_name || session?.user?.email?.split('@')[0] || 'Student';
        supabase.from('profiles').insert({
          user_id: userId,
          display_name: defaultName,
          branch: "B.Tech CSE '26",
        }).select().maybeSingle().then(({ data }) => {
          if (data) {
            setProfile(data as any);
            try {
              localStorage.setItem('itm_student_profile', JSON.stringify(data));
            } catch {}
          }
        });
      }
      
      if (rolesResponse.data) {
        // Find if user has admin role, otherwise fallback to their other role (e.g. 'user')
        const roles = rolesResponse.data.map(r => r.role);
        if (roles.includes('admin')) {
          setRole('admin');
        } else if (roles.length > 0) {
          setRole(roles[0] as AppRole);
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    setProfile(prev => {
      const merged = { ...prev, ...updates };
      try {
        localStorage.setItem('itm_student_profile', JSON.stringify(merged));
      } catch (err) {
        console.error('Failed to save profile to localStorage:', err);
      }
      return merged;
    });

    if (user?.id) {
      try {
        await supabase.from('profiles').upsert({
          user_id: user.id,
          display_name: updates.display_name ?? profile?.display_name ?? null,
          avatar_url: updates.avatar_url ?? profile?.avatar_url ?? null,
          updated_at: new Date().toISOString(),
        });
      } catch (err) {
        console.error("Failed to update profile in Supabase:", err);
      }
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
    <AuthContext.Provider value={{ session, user, profile, role, isLoading, signOut, updateProfile }}>
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
