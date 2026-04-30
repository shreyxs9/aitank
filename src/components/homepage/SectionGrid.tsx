import type { ArticlePreview } from '../../types/content'
import { SectionArticleCard } from './SectionArticleCard'

interface SectionGridProps {
  articles: ArticlePreview[]
  description?: string
  eyebrow?: string
  startIndex?: number
  title?: string
}

export function SectionGrid({
  articles,
  description = 'Every section is open. Click any story to move into the long-form article view.',
  eyebrow = 'Editorial sections',
  startIndex = 2,
  title = 'An editorial grid that reads like a magazine, not a feed.',
}: SectionGridProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-3">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-coral">
            {eyebrow}
          </p>
          <h2 className="editorial-heading font-display text-3xl font-extrabold leading-tight text-white sm:text-5xl">
            {title}
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-white/62">
          {description}
        </p>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {articles.map((article, index) => (
          <SectionArticleCard
            key={article.id}
            article={article}
            displayIndex={String(index + startIndex).padStart(2, '0')}
          />
        ))}
      </div>
    </section>
  )
}
