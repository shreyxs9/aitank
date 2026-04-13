import type { Article, ArticleFigure } from '../../types/content'
import { ImagePlaceholder } from '../shared/ImagePlaceholder'
import { PullQuote } from './PullQuote'

interface ArticleBodyProps {
  article: Article
}

function FigureCard({ figure, compact = false }: { figure: ArticleFigure; compact?: boolean }) {
  return (
    <figure className="space-y-3">
      <a href={figure.src} target="_blank" rel="noreferrer" className="block">
        <div
          className={`overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/96 p-3 shadow-[0_24px_80px_rgba(0,0,0,0.18)] ${
            compact ? 'max-w-md' : ''
          }`}
        >
          <img src={figure.src} alt={figure.alt} className="w-full rounded-[1rem]" loading="lazy" />
        </div>
      </a>
      {figure.caption ? <figcaption className="text-sm leading-6 text-white/48">{figure.caption}</figcaption> : null}
    </figure>
  )
}

export function ArticleBody({ article }: ArticleBodyProps) {
  return (
    <article className="min-w-0 border-b border-white/10 px-4 py-10 sm:px-6 lg:px-0 lg:pr-10">
      <div className="space-y-8">
        <figure className="space-y-4">
          <ImagePlaceholder
            label={article.imageLabel}
            src={article.imageSrc}
            alt={article.imageAlt}
            showLabel={false}
            aspectClassName="aspect-[16/9]"
            accent={article.sectionTone === 'lavender' ? 'lavender' : 'coral'}
          />
          <figcaption className="text-sm text-white/45">{article.heroCaption}</figcaption>
        </figure>

        <p className="font-display text-3xl font-extrabold leading-tight tracking-[-0.03em] text-white/92">
          {article.intro}
        </p>

        {article.body.map((section, index) => (
          <section key={`${article.id}-section-${index}`} className="space-y-5">
            {section.heading ? (
              <h2 className="font-display text-3xl font-extrabold tracking-[-0.04em] text-white">
                {section.heading}
              </h2>
            ) : null}

            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-base leading-8 text-white/72">
                {paragraph}
              </p>
            ))}

            {section.bullets?.length ? (
              <ul className="space-y-3 pl-5 text-base leading-8 text-white/72 marker:text-coral">
                {section.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            ) : null}

            {section.callout ? (
              <aside className="space-y-4 rounded-[1.5rem] border border-white/12 bg-white/5 p-6">
                {section.callout.eyebrow ? (
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-coral">
                    {section.callout.eyebrow}
                  </p>
                ) : null}
                {section.callout.title ? (
                  <h3 className="font-display text-2xl font-bold tracking-[-0.03em] text-white">
                    {section.callout.title}
                  </h3>
                ) : null}
                {section.callout.formula ? (
                  <pre className="overflow-x-auto rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm leading-7 text-white/82">
                    <code>{section.callout.formula}</code>
                  </pre>
                ) : null}
                {section.callout.body.map((line) => (
                  <p key={line} className="text-base leading-8 text-white/72">
                    {line}
                  </p>
                ))}
              </aside>
            ) : null}

            {section.figures?.length ? (
              <div
                className={`grid gap-5 ${
                  section.figures.length > 1 ? 'md:grid-cols-2' : ''
                }`}
              >
                {section.figures.map((figure) => (
                  <FigureCard key={figure.src} figure={figure} compact={section.figures?.length === 1} />
                ))}
              </div>
            ) : null}

            {index === 0 ? <PullQuote pullQuote={article.pullQuote} /> : null}
          </section>
        ))}
      </div>
    </article>
  )
}
