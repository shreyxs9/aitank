import { Link } from 'react-router-dom'
import type { ArticlePreview } from '../../types/content'
import { ImagePlaceholder } from './ImagePlaceholder'
import { MetaRow } from './MetaRow'
import { SectionLabel } from './SectionLabel'
import { TagPill } from './TagPill'

interface ArticleCardVerticalProps {
  article: ArticlePreview
  displayIndex?: string
}

export function ArticleCardVertical({
  article,
  displayIndex = article.sectionIndex,
}: ArticleCardVerticalProps) {
  return (
    <Link
      to={`/article/${article.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/4 transition duration-200 hover:-translate-y-1 hover:border-white/20 hover:bg-white/6"
    >
      <div className="p-4">
        <ImagePlaceholder
          label={article.imageLabel}
          src={article.imageSrc}
          alt={article.imageAlt}
          showLabel={false}
          aspectClassName="aspect-[16/10]"
          accent={article.sectionTone === 'lavender' ? 'lavender' : 'coral'}
        />
      </div>
      <div className="flex flex-1 flex-col gap-4 px-4 pb-4 sm:px-5 sm:pb-5">
        <SectionLabel
          index={displayIndex}
          label={article.section}
          tone={article.sectionTone}
        />
        <div className="space-y-3">
          <h3 className="editorial-heading font-display text-xl font-bold leading-tight text-white transition group-hover:text-coral sm:text-2xl">
            {article.title}
          </h3>
          <p className="text-sm leading-6 text-white/66">{article.deck}</p>
        </div>
        <div className="mt-auto flex flex-wrap gap-2">
          {article.tags.slice(0, 2).map((tag) => (
            <TagPill key={tag}>{tag}</TagPill>
          ))}
        </div>
        <MetaRow
          author={article.author}
          role={article.role}
          publishedAt={article.publishedAt}
          readTime={article.readTime}
        />
      </div>
    </Link>
  )
}
