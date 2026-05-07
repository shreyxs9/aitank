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
      app_admins: {
        Row: {
          created_at: string
          email: string
          id: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
        }
        Relationships: []
      }
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
          status: 'draft' | 'pending_review' | 'published' | 'rejected'
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
          status?: 'draft' | 'pending_review' | 'published' | 'rejected'
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
          status?: 'draft' | 'pending_review' | 'published' | 'rejected'
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
          designation: string | null
          display_name: string | null
          id: string
          updated_at: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          designation?: string | null
          display_name?: string | null
          id: string
          updated_at?: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          designation?: string | null
          display_name?: string | null
          id?: string
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: {
      email_is_registered: {
        Args: {
          email_to_check: string
        }
        Returns: boolean
      }
      admin_fetch_review_articles: {
        Args: {
          admin_password: string
        }
        Returns: Array<
          Database['public']['Tables']['articles']['Row'] & {
            author_avatar_url: string | null
            author_designation: string | null
            author_display_name: string | null
            author_username: string | null
          }
        >
      }
      admin_update_article_review_status: {
        Args: {
          admin_password: string
          article_id: string
          next_status: 'published' | 'rejected'
        }
        Returns: Array<
          Database['public']['Tables']['articles']['Row'] & {
            author_avatar_url: string | null
            author_designation: string | null
            author_display_name: string | null
            author_username: string | null
          }
        >
      }
    }
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}
