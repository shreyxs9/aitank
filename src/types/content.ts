export type SectionTone = 'coral' | 'lavender' | 'white'
export type ArticleLayout = 'editorial' | 'document-pages'

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
  imageSrc?: string
  imageAlt?: string
  tags: string[]
  highlight?: string
}

export interface ArticleFigure {
  src: string
  alt: string
  caption?: string
}

export interface ArticleCallout {
  eyebrow?: string
  title?: string
  formula?: string
  body: string[]
}

export interface ArticleBodySection {
  heading?: string
  paragraphs: string[]
  bullets?: string[]
  callout?: ArticleCallout
  figures?: ArticleFigure[]
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
  layout?: ArticleLayout
  breadcrumb: string[]
  intro: string
  heroCaption: string
  pullQuote: PullQuoteData
  body: ArticleBodySection[]
  sidebar: SidebarCard[]
  documentPages?: ArticleFigure[]
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
