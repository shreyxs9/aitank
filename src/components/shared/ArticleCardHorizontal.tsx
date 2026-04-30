import { Link } from 'react-router-dom'
import type { ArticlePreview } from '../../types/content'
import { ImagePlaceholder } from './ImagePlaceholder'
import { MetaRow } from './MetaRow'
import { SectionLabel } from './SectionLabel'

interface ArticleCardHorizontalProps {
  article: ArticlePreview
}

export function ArticleCardHorizontal({ article }: ArticleCardHorizontalProps) {
  return (
    <Link
      to={`/article/${article.slug}`}
      className="group grid gap-4 rounded-[1.75rem] border border-white/10 bg-white/4 p-4 transition duration-200 hover:border-white/18 hover:bg-white/6 sm:grid-cols-[12rem,1fr] sm:gap-5"
    >
      <ImagePlaceholder
        label={article.imageLabel}
        src={article.imageSrc}
        alt={article.imageAlt}
        showLabel={false}
        aspectClassName="aspect-[16/10] sm:aspect-square"
        accent={article.sectionTone === 'lavender' ? 'lavender' : 'coral'}
      />
      <div className="flex flex-col justify-between gap-4">
        <div className="space-y-3">
          <SectionLabel
            index={article.sectionIndex}
            label={article.section}
            tone={article.sectionTone}
          />
          <h3 className="editorial-heading font-display text-xl font-bold leading-tight text-white transition group-hover:text-coral sm:text-2xl">
            {article.title}
          </h3>
          <p className="max-w-xl text-sm leading-6 text-white/66">{article.deck}</p>
        </div>
        <MetaRow
          author={article.author}
          authorAvatarUrl={article.authorAvatarUrl}
          role={article.role}
          publishedAt={article.publishedAt}
          readTime={article.readTime}
        />
      </div>
    </Link>
  )
}
