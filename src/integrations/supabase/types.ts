export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          user_id: string
          display_name: string | null
          avatar_url: string | null
          email: string | null
          branch: string | null
          program: string | null
          semester: number | null
          enrollment_no: string | null
          bio: string | null
          target_cgpa: string | null
          goal: string | null
          onboarding_completed: boolean | null
          achievements: Json | null
          role: string | null
          xp: number | null
          level: number | null
          streak_days: number | null
          status: string | null
          division?: string | null
          weekly_goal_days?: number | null
          weekly_goal_completed_days?: number | null
          streak_freeze_count?: number | null
          streak_freeze_last_claimed_week?: string | null
          push_enabled?: boolean | null
          motion_reduced?: boolean | null
          is_suspended?: boolean | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          display_name?: string | null
          avatar_url?: string | null
          email?: string | null
          branch?: string | null
          program?: string | null
          semester?: number | null
          enrollment_no?: string | null
          bio?: string | null
          target_cgpa?: string | null
          goal?: string | null
          onboarding_completed?: boolean | null
          achievements?: Json | null
          role?: string | null
          xp?: number | null
          level?: number | null
          streak_days?: number | null
          status?: string | null
          division?: string | null
          weekly_goal_days?: number | null
          weekly_goal_completed_days?: number | null
          streak_freeze_count?: number | null
          streak_freeze_last_claimed_week?: string | null
          push_enabled?: boolean | null
          motion_reduced?: boolean | null
          is_suspended?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          display_name?: string | null
          avatar_url?: string | null
          email?: string | null
          branch?: string | null
          program?: string | null
          semester?: number | null
          enrollment_no?: string | null
          bio?: string | null
          target_cgpa?: string | null
          goal?: string | null
          onboarding_completed?: boolean | null
          achievements?: Json | null
          role?: string | null
          xp?: number | null
          level?: number | null
          streak_days?: number | null
          status?: string | null
          division?: string | null
          weekly_goal_days?: number | null
          weekly_goal_completed_days?: number | null
          streak_freeze_count?: number | null
          streak_freeze_last_claimed_week?: string | null
          push_enabled?: boolean | null
          motion_reduced?: boolean | null
          is_suspended?: boolean | null
          created_at?: string
          updated_at?: string
        }
      }
      user_achievements: {
        Row: {
          id: string
          user_id: string
          achievement_id: string
          title: string
          description: string | null
          icon: string | null
          tier: string | null
          xp_reward: number | null
          unlocked_at: string
        }
        Insert: {
          id?: string
          user_id: string
          achievement_id: string
          title: string
          description?: string | null
          icon?: string | null
          tier?: string | null
          xp_reward?: number | null
          unlocked_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          achievement_id?: string
          title?: string
          description?: string | null
          icon?: string | null
          tier?: string | null
          xp_reward?: number | null
          unlocked_at?: string
        }
      }
      user_roles: {
        Row: {
          id: string
          user_id: string
          role: 'admin' | 'moderator' | 'user'
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          role: 'admin' | 'moderator' | 'user'
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          role?: 'admin' | 'moderator' | 'user'
          created_at?: string
        }
      }
      universities: {
        Row: { id: string, name: string, created_at: string, updated_at: string }
        Insert: { id?: string, name: string, created_at?: string, updated_at?: string }
        Update: { id?: string, name?: string, created_at?: string, updated_at?: string }
      }
      programs: {
        Row: { id: string, university_id: string, name: string, created_at: string }
        Insert: { id?: string, university_id: string, name: string, created_at?: string }
        Update: { id?: string, university_id?: string, name?: string, created_at?: string }
      }
      branches: {
        Row: { id: string, program_id: string, name: string, created_at: string }
        Insert: { id?: string, program_id: string, name: string, created_at?: string }
        Update: { id?: string, program_id?: string, name?: string, created_at?: string }
      }
      semesters: {
        Row: { id: string, branch_id: string, number: number, created_at: string }
        Insert: { id?: string, branch_id: string, number: number, created_at?: string }
        Update: { id?: string, branch_id?: string, number?: number, created_at?: string }
      }
      subjects: {
        Row: { id: string, semester_id: string, name: string, code: string, color: string | null, icon: string | null, description: string | null, order_index: number, created_at: string, updated_at: string }
        Insert: { id?: string, semester_id: string, name: string, code: string, color?: string | null, icon?: string | null, description?: string | null, order_index?: number, created_at?: string, updated_at?: string }
        Update: { id?: string, semester_id?: string, name?: string, code?: string, color?: string | null, icon?: string | null, description?: string | null, order_index?: number, created_at?: string, updated_at?: string }
      }
      units: {
        Row: { id: string, subject_id: string, title: string, description: string | null, order_index: number, created_at: string, updated_at: string }
        Insert: { id?: string, subject_id: string, title: string, description?: string | null, order_index?: number, created_at?: string, updated_at?: string }
        Update: { id?: string, subject_id?: string, title?: string, description?: string | null, order_index?: number, created_at?: string, updated_at?: string }
      }
      topics: {
        Row: { id: string, unit_id: string, title: string, simple_explanation: string | null, detailed_explanation: string | null, rich_content: string | null, short_notes: string | null, order_index: number, created_at: string, updated_at: string }
        Insert: { id?: string, unit_id: string, title: string, simple_explanation?: string | null, detailed_explanation?: string | null, rich_content?: string | null, short_notes?: string | null, order_index?: number, created_at?: string, updated_at?: string }
        Update: { id?: string, unit_id?: string, title?: string, simple_explanation?: string | null, detailed_explanation?: string | null, rich_content?: string | null, short_notes?: string | null, order_index?: number, created_at?: string, updated_at?: string }
      }
      examples: {
        Row: { id: string, topic_id: string, title: string, problem: string | null, explanation: string | null, code: string | null, output: string | null, order_index: number, created_at: string }
        Insert: { id?: string, topic_id: string, title: string, problem?: string | null, explanation?: string | null, code?: string | null, output?: string | null, order_index?: number, created_at?: string }
        Update: { id?: string, topic_id?: string, title?: string, problem?: string | null, explanation?: string | null, code?: string | null, output?: string | null, order_index?: number, created_at?: string }
      }
      key_points: {
        Row: { id: string, topic_id: string, point: string, order_index: number, created_at: string }
        Insert: { id?: string, topic_id: string, point: string, order_index?: number, created_at?: string }
        Update: { id?: string, topic_id?: string, point?: string, order_index?: number, created_at?: string }
      }
      mcqs: {
        Row: { id: string, topic_id: string, question: string, options: Json, correct_index: number, explanation: string | null, order_index: number, created_at: string }
        Insert: { id?: string, topic_id: string, question: string, options: Json, correct_index: number, explanation?: string | null, order_index?: number, created_at?: string }
        Update: { id?: string, topic_id?: string, question?: string, options?: Json, correct_index?: number, explanation?: string | null, order_index?: number, created_at?: string }
      }
      community_posts: {
        Row: {
          id: string
          author_id: string
          author_name: string
          author_email: string | null
          author_avatar: string | null
          author_branch: string | null
          is_masked: boolean
          mask_alias: string
          category: string
          content: string
          likes: number
          pinned: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          author_id: string
          author_name: string
          author_email?: string | null
          author_avatar?: string | null
          author_branch?: string | null
          is_masked?: boolean
          mask_alias?: string
          category: string
          content: string
          likes?: number
          pinned?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          author_id?: string
          author_name?: string
          author_email?: string | null
          author_avatar?: string | null
          author_branch?: string | null
          is_masked?: boolean
          mask_alias?: string
          category?: string
          content?: string
          likes?: number
          pinned?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      community_comments: {
        Row: {
          id: string
          post_id: string
          author_id: string
          author_name: string
          author_email: string | null
          author_avatar: string | null
          is_masked: boolean
          mask_alias: string
          content: string
          likes: number
          created_at: string
        }
        Insert: {
          id?: string
          post_id: string
          author_id: string
          author_name: string
          author_email?: string | null
          author_avatar?: string | null
          is_masked?: boolean
          mask_alias?: string
          content: string
          likes?: number
          created_at?: string
        }
        Update: {
          id?: string
          post_id?: string
          author_id?: string
          author_name?: string
          author_email?: string | null
          author_avatar?: string | null
          is_masked?: boolean
          mask_alias?: string
          content?: string
          likes?: number
          created_at?: string
        }
      }
      community_post_likes: {
        Row: {
          id: string
          post_id: string
          user_id: string
          created_at: string
        }
        Insert: {
          id?: string
          post_id: string
          user_id: string
          created_at?: string
        }
        Update: {
          id?: string
          post_id?: string
          user_id?: string
          created_at?: string
        }
      }
      push_subscriptions: {
        Row: {
          id: string
          user_id: string
          platform: 'android' | 'web' | 'ios'
          token: string
          endpoint: string | null
          p256dh: string | null
          auth: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          platform: 'android' | 'web' | 'ios'
          token: string
          endpoint?: string | null
          p256dh?: string | null
          auth?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          platform?: 'android' | 'web' | 'ios'
          token?: string
          endpoint?: string | null
          p256dh?: string | null
          auth?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      bookmark_folders: {
        Row: {
          id: string
          user_id: string
          name: string
          color: string | null
          icon: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          color?: string | null
          icon?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          color?: string | null
          icon?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      search_analytics: {
        Row: {
          id: string
          user_id: string | null
          query: string
          results_count: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          query: string
          results_count?: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          query?: string
          results_count?: number
          created_at?: string
        }
      }
      student_friends: {
        Row: {
          id: string
          user_id: string
          friend_id: string
          friend_name: string | null
          friend_email: string | null
          friend_branch: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          friend_id: string
          friend_name?: string | null
          friend_email?: string | null
          friend_branch?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          friend_id?: string
          friend_name?: string | null
          friend_email?: string | null
          friend_branch?: string | null
          created_at?: string
        }
      }
      client_errors: {
        Row: {
          id: string
          user_id: string | null
          route: string
          message: string
          stack: string | null
          app_version: string | null
          device_info: Json | null
          status: 'unresolved' | 'investigating' | 'resolved'
          created_at: string
          resolved_at: string | null
          resolved_by: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          route: string
          message: string
          stack?: string | null
          app_version?: string | null
          device_info?: Json | null
          status?: 'unresolved' | 'investigating' | 'resolved'
          created_at?: string
          resolved_at?: string | null
          resolved_by?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          route?: string
          message?: string
          stack?: string | null
          app_version?: string | null
          device_info?: Json | null
          status?: 'unresolved' | 'investigating' | 'resolved'
          created_at?: string
          resolved_at?: string | null
          resolved_by?: string | null
        }
      }
      announcements: {
        Row: {
          id: string
          title: string
          message: string
          type: 'info' | 'warning' | 'success' | 'error'
          audience: 'all' | 'students' | 'admins'
          draft: boolean
          scheduled_start: string | null
          scheduled_end: string | null
          target_semester: number | null
          target_branch: string | null
          active: boolean
          created_at: string
          created_by: string | null
        }
        Insert: {
          id?: string
          title: string
          message: string
          type?: 'info' | 'warning' | 'success' | 'error'
          audience?: 'all' | 'students' | 'admins'
          draft?: boolean
          scheduled_start?: string | null
          scheduled_end?: string | null
          target_semester?: number | null
          target_branch?: string | null
          active?: boolean
          created_at?: string
          created_by?: string | null
        }
        Update: {
          id?: string
          title?: string
          message?: string
          type?: 'info' | 'warning' | 'success' | 'error'
          audience?: 'all' | 'students' | 'admins'
          draft?: boolean
          scheduled_start?: string | null
          scheduled_end?: string | null
          target_semester?: number | null
          target_branch?: string | null
          active?: boolean
          created_at?: string
          created_by?: string | null
        }
      }
      maintenance_windows: {
        Row: {
          id: string
          title: string
          reason: string | null
          start_time: string
          end_time: string
          affected_areas: string[]
          is_active: boolean
          created_at: string
          created_by: string | null
        }
        Insert: {
          id?: string
          title: string
          reason?: string | null
          start_time: string
          end_time: string
          affected_areas?: string[]
          is_active?: boolean
          created_at?: string
          created_by?: string | null
        }
        Update: {
          id?: string
          title?: string
          reason?: string | null
          start_time?: string
          end_time?: string
          affected_areas?: string[]
          is_active?: boolean
          created_at?: string
          created_by?: string | null
        }
      }
      topic_versions: {
        Row: {
          id: string
          topic_id: string
          version_number: number
          title: string
          content: string
          status: 'draft' | 'published' | 'scheduled'
          published_at: string | null
          scheduled_at: string | null
          created_by: string | null
          created_at: string
        }
        Insert: {
          id?: string
          topic_id: string
          version_number?: number
          title: string
          content: string
          status?: 'draft' | 'published' | 'scheduled'
          published_at?: string | null
          scheduled_at?: string | null
          created_by?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          topic_id?: string
          version_number?: number
          title?: string
          content?: string
          status?: 'draft' | 'published' | 'scheduled'
          published_at?: string | null
          scheduled_at?: string | null
          created_by?: string | null
          created_at?: string
        }
      }
      audit_logs: {
        Row: {
          id: string
          admin_id: string | null
          admin_email: string
          action_type: string
          target_type: string
          target_id: string | null
          details: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          admin_id?: string | null
          admin_email: string
          action_type: string
          target_type: string
          target_id?: string | null
          details?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          admin_id?: string | null
          admin_email?: string
          action_type?: string
          target_type?: string
          target_id?: string | null
          details?: Json | null
          created_at?: string
        }
      }
      support_tickets: {
        Row: {
          id: string
          user_id: string | null
          user_email: string | null
          user_name: string | null
          subject: string
          message: string
          status: 'open' | 'in_progress' | 'resolved'
          priority: 'low' | 'medium' | 'high' | 'urgent'
          admin_reply: string | null
          replied_at: string | null
          replied_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          user_email?: string | null
          user_name?: string | null
          subject?: string
          message: string
          status?: 'open' | 'in_progress' | 'resolved'
          priority?: 'low' | 'medium' | 'high' | 'urgent'
          admin_reply?: string | null
          replied_at?: string | null
          replied_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          user_email?: string | null
          user_name?: string | null
          subject?: string
          message?: string
          status?: 'open' | 'in_progress' | 'resolved'
          priority?: 'low' | 'medium' | 'high' | 'urgent'
          admin_reply?: string | null
          replied_at?: string | null
          replied_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      feature_flags: {
        Row: {
          id: string
          key: string
          enabled: boolean
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          key: string
          enabled?: boolean
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          key?: string
          enabled?: boolean
          description?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      moderation_reports: {
        Row: {
          id: string
          type: 'errata' | 'student_contribution' | 'community_post'
          target_id: string
          target_title: string | null
          reporter_id: string | null
          reporter_name: string | null
          reporter_email: string | null
          content: string
          suggested_fix: string | null
          status: 'pending' | 'approved' | 'rejected'
          rejection_reason: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          created_at: string
        }
        Insert: {
          id?: string
          type: 'errata' | 'student_contribution' | 'community_post'
          target_id: string
          target_title?: string | null
          reporter_id?: string | null
          reporter_name?: string | null
          reporter_email?: string | null
          content: string
          suggested_fix?: string | null
          status?: 'pending' | 'approved' | 'rejected'
          rejection_reason?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          type?: 'errata' | 'student_contribution' | 'community_post'
          target_id?: string
          target_title?: string | null
          reporter_id?: string | null
          reporter_name?: string | null
          reporter_email?: string | null
          content?: string
          suggested_fix?: string | null
          status?: 'pending' | 'approved' | 'rejected'
          rejection_reason?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      app_role: 'admin' | 'moderator' | 'user'
    }
  }
}
