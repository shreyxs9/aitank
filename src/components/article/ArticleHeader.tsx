import type { Article } from '../../types/content'
import { MetaRow } from '../shared/MetaRow'
import { SectionLabel } from '../shared/SectionLabel'

interface ArticleHeaderProps {
  article: Article
}

export function ArticleHeader({ article }: ArticleHeaderProps) {
  return (
    <section className="border-b border-white/10 bg-navy/95">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="space-y-5">
          <SectionLabel
            index={article.sectionIndex}
            label={article.section}
            tone={article.sectionTone}
          />
          <h1 className="editorial-heading max-w-4xl font-display text-4xl font-black leading-[0.94] text-white sm:text-5xl lg:text-7xl">
            {article.title}
          </h1>
          <p className="max-w-3xl text-base leading-7 text-white/68 sm:text-lg sm:leading-8">{article.deck}</p>
          <MetaRow
            author={article.author}
            authorAvatarUrl={article.authorAvatarUrl}
            role={article.role}
            publishedAt={article.publishedAt}
            readTime={article.readTime}
          />
        </div>
      </div>
    </section>
  )
}
