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
      images: {
        Row: {
          created_at: string | null
          id: number
          image_desc: string | null
          image_path: string | null
          user_uid: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          image_desc?: string | null
          image_path?: string | null
          user_uid?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          image_desc?: string | null
          image_path?: string | null
          user_uid?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "images_user_uid_fkey"
            columns: ["user_uid"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      result: {
        Row: {
          created_at: string | null
          id: number
          images: Json | null
          text: string | null
          user_uid: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          images?: Json | null
          text?: string | null
          user_uid?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          images?: Json | null
          text?: string | null
          user_uid?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "result_user_uid_fkey"
            columns: ["user_uid"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}