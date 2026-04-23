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
      articles: {
        Row: {
          author_id: string
          body: string
          cover_image_url: string | null
          created_at: string
          deck: string
          id: string
          published_at: string | null
          section: string
          slug: string
          status: 'draft' | 'published'
          tags: string[]
          title: string
          updated_at: string
        }
        Insert: {
          author_id: string
          body: string
          cover_image_url?: string | null
          created_at?: string
          deck?: string
          id?: string
          published_at?: string | null
          section?: string
          slug: string
          status?: 'draft' | 'published'
          tags?: string[]
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string
          body?: string
          cover_image_url?: string | null
          created_at?: string
          deck?: string
          id?: string
          published_at?: string | null
          section?: string
          slug?: string
          status?: 'draft' | 'published'
          tags?: string[]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          display_name: string | null
          id: string
          updated_at: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          id: string
          updated_at?: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}
