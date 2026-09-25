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
          role: string | null
          xp: number | null
          level: number | null
          streak_days: number | null
          status: string | null
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
          role?: string | null
          xp?: number | null
          level?: number | null
          streak_days?: number | null
          status?: string | null
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
          role?: string | null
          xp?: number | null
          level?: number | null
          streak_days?: number | null
          status?: string | null
          created_at?: string
          updated_at?: string
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
