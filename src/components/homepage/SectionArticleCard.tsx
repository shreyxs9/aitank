import type { ArticlePreview } from '../../types/content'
import { ArticleCardVertical } from '../shared/ArticleCardVertical'

interface SectionArticleCardProps {
  article: ArticlePreview
}

export function SectionArticleCard({ article }: SectionArticleCardProps) {
  return <ArticleCardVertical article={article} />
}
