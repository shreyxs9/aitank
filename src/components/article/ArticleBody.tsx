import type { Article } from '../../types/content'
import { ImagePlaceholder } from '../shared/ImagePlaceholder'
import { PullQuote } from './PullQuote'

interface ArticleBodyProps {
  article: Article
}

export function ArticleBody({ article }: ArticleBodyProps) {
  return (
    <article className="min-w-0 border-b border-white/10 px-4 py-10 sm:px-6 lg:px-0 lg:pr-10">
      <div className="space-y-8">
        <figure className="space-y-4">
          <ImagePlaceholder
            label={article.imageLabel}
            aspectClassName="aspect-[16/9]"
            accent={article.sectionTone === 'lavender' ? 'lavender' : 'coral'}
          />
          <figcaption className="text-sm text-white/45">{article.heroCaption}</figcaption>
        </figure>

        <p className="font-display text-3xl leading-tight tracking-[-0.03em] text-white/92">
          {article.intro}
        </p>

        {article.body.map((section, index) => (
          <section key={`${article.id}-section-${index}`} className="space-y-5">
            {section.heading ? (
              <h2 className="font-display text-3xl tracking-[-0.04em] text-white">
                {section.heading}
              </h2>
            ) : null}
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-base leading-8 text-white/72">
                {paragraph}
              </p>
            ))}
            {index === 0 ? <PullQuote pullQuote={article.pullQuote} /> : null}
          </section>
        ))}
      </div>
    </article>
  )
}
