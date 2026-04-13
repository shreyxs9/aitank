import type { Article } from '../../types/content'
import { MetaRow } from '../shared/MetaRow'
import { SectionLabel } from '../shared/SectionLabel'

interface ArticleHeaderProps {
  article: Article
}

export function ArticleHeader({ article }: ArticleHeaderProps) {
  return (
    <section className="border-b border-white/10 bg-navy/95">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="space-y-5">
          <SectionLabel
            index={article.sectionIndex}
            label={article.section}
            tone={article.sectionTone}
          />
          <h1 className="max-w-4xl font-display text-5xl font-black leading-[0.95] tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl">
            {article.title}
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-white/68">{article.deck}</p>
          <MetaRow
            author={article.author}
            role={article.role}
            publishedAt={article.publishedAt}
            readTime={article.readTime}
          />
        </div>
      </div>
    </section>
  )
}
