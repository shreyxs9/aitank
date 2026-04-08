export type SectionTone = 'coral' | 'lavender' | 'white'

export interface ArticlePreview {
  id: string
  slug: string
  section: string
  sectionIndex: string
  sectionTone: SectionTone
  title: string
  deck: string
  author: string
  role: string
  readTime: string
  publishedAt: string
  imageLabel: string
  tags: string[]
  highlight?: string
}

export interface ArticleBodySection {
  heading?: string
  paragraphs: string[]
}

export interface PullQuoteData {
  quote: string
  attribution?: string
}

export interface SidebarCard {
  title: string
  items: string[]
}

export interface Article extends ArticlePreview {
  breadcrumb: string[]
  intro: string
  heroCaption: string
  pullQuote: PullQuoteData
  body: ArticleBodySection[]
  sidebar: SidebarCard[]
}

export interface FounderSpotlight {
  id: string
  startup: string
  founder: string
  role: string
  location: string
  stage: string
  focus: string
  quote: string
  summary: string
  cta: string
}

export interface SectionBlock {
  id: string
  heading: string
  description: string
  articleIds: string[]
}

export type Founder = FounderSpotlight

export interface CommunityPulseItem {
  id: string
  title: string
  detail: string
}

export interface IssueSummary {
  issueNumber: string
  issueLabel: string
  releaseDate: string
  strapline: string
}
