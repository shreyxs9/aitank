import { PullQuote } from '../components/article/PullQuote'
import { Footer } from '../components/layout/Footer'
import { Header } from '../components/layout/Header'
import { IssueStrip } from '../components/layout/IssueStrip'
import { FounderSpotlightCard } from '../components/homepage/FounderSpotlightCard'
import { SectionArticleCard } from '../components/homepage/SectionArticleCard'
import { ArticleCardHorizontal } from '../components/shared/ArticleCardHorizontal'
import { ImagePlaceholder } from '../components/shared/ImagePlaceholder'
import { MetaRow } from '../components/shared/MetaRow'
import { SectionLabel } from '../components/shared/SectionLabel'
import { TagPill } from '../components/shared/TagPill'
import { componentShowcaseArticle, featuredArticle, founders, issueSummary } from '../data/content'

export function ComponentsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <IssueStrip issue={issueSummary} />
        <section className="border-b border-white/10 bg-navy/95">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-lavender">
              Components showcase
            </p>
            <h1 className="mt-4 max-w-4xl font-display text-5xl tracking-[-0.06em] text-white sm:text-6xl">
              The actual building blocks used across the app.
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-white/66">
              This page demonstrates the shared visual language instead of acting as a placeholder.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-5 lg:grid-cols-3">
            <div className="rounded-[1.75rem] border border-white/10 bg-white/4 p-6">
              <SectionLabel
                index={featuredArticle.sectionIndex}
                label={featuredArticle.section}
                tone={featuredArticle.sectionTone}
              />
              <h2 className="mt-4 font-display text-3xl tracking-[-0.04em] text-white">
                Labels and metadata
              </h2>
              <div className="mt-6 flex flex-wrap gap-2">
                <TagPill emphasis="coral">Read story</TagPill>
                <TagPill emphasis="lavender">Join community</TagPill>
                <TagPill>Issue archive</TagPill>
              </div>
              <div className="mt-6">
                <MetaRow
                  author={featuredArticle.author}
                  role={featuredArticle.role}
                  publishedAt={featuredArticle.publishedAt}
                  readTime={featuredArticle.readTime}
                />
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-white/10 bg-white/4 p-6 lg:col-span-2">
              <h2 className="font-display text-3xl tracking-[-0.04em] text-white">
                Image placeholder system
              </h2>
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <ImagePlaceholder label="Hero artwork or editorial image" aspectClassName="aspect-[5/4]" />
                <ImagePlaceholder
                  label="Article image for cards and side modules"
                  aspectClassName="aspect-[5/4]"
                  accent="lavender"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 xl:grid-cols-3">
            <div className="xl:col-span-2">
              <ArticleCardHorizontal article={componentShowcaseArticle} />
            </div>
            <SectionArticleCard article={featuredArticle} />
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-5 lg:grid-cols-3">
            {founders.map((founder) => (
              <FounderSpotlightCard key={founder.id} founder={founder} />
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 pb-16 sm:px-6 lg:px-8">
          <PullQuote pullQuote={featuredArticle.pullQuote} />
        </section>
      </main>
      <Footer />
    </div>
  )
}
