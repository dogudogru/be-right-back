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
          email: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          created_at?: string
          updated_at?: string
        }
      }
      conversations: {
        Row: {
          id: string
          user_id: string
          contact_name: string
          avatar_url: string | null
          created_at: string
          updated_at: string
          last_message: string | null
          last_message_at: string
        }
        Insert: {
          id?: string
          user_id: string
          contact_name: string
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
          last_message?: string | null
          last_message_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          contact_name?: string
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
          last_message?: string | null
          last_message_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          conversation_id: string
          content: string
          sender: string
          created_at: string
          is_ai_generated: boolean
          status: string
        }
        Insert: {
          id?: string
          conversation_id: string
          content: string
          sender: string
          created_at?: string
          is_ai_generated?: boolean
          status?: string
        }
        Update: {
          id?: string
          conversation_id?: string
          content?: string
          sender?: string
          created_at?: string
          is_ai_generated?: boolean
          status?: string
        }
      }
    }
    Functions: {
      [_ in never]: never
    }
  }
}