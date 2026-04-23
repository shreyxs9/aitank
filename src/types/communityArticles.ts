export type CommunityArticleStatus = 'draft' | 'published'

export interface CommunityArticle {
  id: string
  authorId: string
  authorName: string
  body: string
  coverImageUrl: string | null
  createdAt: string
  deck: string
  publishedAt: string | null
  section: string
  slug: string
  status: CommunityArticleStatus
  tags: string[]
  title: string
  updatedAt: string
}

export interface CommunityArticleDraft {
  body: string
  coverImageUrl?: string
  deck: string
  section: string
  status: CommunityArticleStatus
  tags: string[]
  title: string
}
