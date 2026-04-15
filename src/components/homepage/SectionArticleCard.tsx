import type { ArticlePreview } from '../../types/content'
import { ArticleCardVertical } from '../shared/ArticleCardVertical'

interface SectionArticleCardProps {
  article: ArticlePreview
  displayIndex?: string
}

export function SectionArticleCard({ article, displayIndex }: SectionArticleCardProps) {
  return <ArticleCardVertical article={article} displayIndex={displayIndex} />
}
