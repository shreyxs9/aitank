import { Link } from 'react-router-dom'
import type { Article, IssueSummary } from '../../types/content'
import { ImagePlaceholder } from '../shared/ImagePlaceholder'
import { MetaRow } from '../shared/MetaRow'
import { SectionLabel } from '../shared/SectionLabel'
import { TagPill } from '../shared/TagPill'

interface HeroFeatureProps {
  article: Article
  issue: IssueSummary
  displayIndex?: string
}

export function HeroFeature({ article, issue, displayIndex = article.sectionIndex }: HeroFeatureProps) {
  return (
    <section className="border-b border-white/10 bg-navy/95">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 sm:py-12 lg:grid-cols-2 lg:items-center lg:gap-14 lg:px-8 lg:py-16">
        <div className="space-y-6 lg:max-w-[34rem]">
          <div className="space-y-3">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-lavender">
              Issue {issue.issueNumber} . {issue.releaseDate}
            </p>
            <SectionLabel
              index={displayIndex}
              label={article.section}
              tone={article.sectionTone}
            />
          </div>

          <div className="space-y-5">
            <h1 className="editorial-heading font-display text-4xl font-black leading-[0.94] text-white sm:text-5xl lg:text-7xl">
              {article.title}
            </h1>
            <p className="max-w-2xl text-[0.95rem] leading-7 text-white/68 sm:text-lg">
              {article.deck}
            </p>
            {article.highlight ? (
              <p className="max-w-2xl border-l-2 border-lavender/55 pl-4 text-sm leading-6 text-white/78">
                {article.highlight}
              </p>
            ) : null}
          </div>

          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag, index) => (
              <TagPill key={tag} emphasis={index === 0 ? 'coral' : 'soft'}>
                {tag}
              </TagPill>
            ))}
          </div>

          <MetaRow
            author={article.author}
            role={article.role}
            publishedAt={article.publishedAt}
            readTime={article.readTime}
          />

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              to={`/article/${article.slug}`}
              className="rounded-full bg-coral px-5 py-3 text-center text-sm font-medium text-white transition hover:bg-coral/90"
            >
              Read story
            </Link>
            <a
              href="#issue"
              className="rounded-full border border-white/12 bg-white/6 px-5 py-3 text-center text-sm font-medium text-white/78 transition hover:border-white/18 hover:bg-white/10 hover:text-white"
            >
              Explore issue
            </a>
          </div>
        </div>

        <div className="lg:justify-self-stretch">
          <ImagePlaceholder
            label={article.imageLabel}
            src={article.imageSrc}
            alt={article.imageAlt}
            showLabel={false}
            aspectClassName="aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5] xl:aspect-[5/4]"
            accent="lavender"
            imageClassName="object-contain object-center sm:object-cover"
          />
        </div>
      </div>
    </section>
  )
}
