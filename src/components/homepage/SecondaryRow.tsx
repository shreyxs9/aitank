import type { ArticlePreview } from '../../types/content'
import { ArticleCardHorizontal } from '../shared/ArticleCardHorizontal'

interface SecondaryRowProps {
  articles: ArticlePreview[]
}

export function SecondaryRow({ articles }: SecondaryRowProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-3">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-white/45">
            More from this issue
          </p>
          <h2 className="editorial-heading font-display text-3xl font-extrabold leading-tight text-white sm:text-5xl">
            A second row for tighter reads, field notes, and operator detail.
          </h2>
        </div>
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        {articles.map((article) => (
          <ArticleCardHorizontal key={article.id} article={article} />
        ))}
      </div>
    </section>
  )
}
