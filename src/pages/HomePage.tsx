import { useEffect, useState } from 'react'
import { Footer } from '../components/layout/Footer'
import { Header } from '../components/layout/Header'
import { IssueStrip } from '../components/layout/IssueStrip'
import { CommunityPulse } from '../components/homepage/CommunityPulse'
import { HeroFeature } from '../components/homepage/HeroFeature'
import { SecondaryRow } from '../components/homepage/SecondaryRow'
import { SectionGrid } from '../components/homepage/SectionGrid'
import {
  communityPulse,
  editorialGridArticles,
  featuredArticle,
  issueSummary,
  secondaryRowArticles,
} from '../data/content'
import { communityArticleToEditorialArticle } from '../lib/articleTransforms'
import { fetchPublishedCommunityArticles } from '../lib/communityArticles'
import type { ArticlePreview } from '../types/content'

export function HomePage() {
  const [communityArticles, setCommunityArticles] = useState<ArticlePreview[]>([])

  useEffect(() => {
    let cancelled = false

    async function loadCommunityArticles() {
      try {
        const publishedArticles = await fetchPublishedCommunityArticles()

        if (!cancelled) {
          setCommunityArticles(publishedArticles.map(communityArticleToEditorialArticle))
        }
      } catch {
        if (!cancelled) {
          setCommunityArticles([])
        }
      }
    }

    void loadCommunityArticles()

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="min-h-screen bg-transparent">
      <Header />
      <main>
        <IssueStrip issue={issueSummary} />
        <HeroFeature article={featuredArticle} issue={issueSummary} displayIndex="01" />
        <SectionGrid articles={editorialGridArticles} />
        {communityArticles.length > 0 ? (
          <SectionGrid
            articles={communityArticles}
            eyebrow="Community articles"
            title="Fresh contributor stories from the AI Tank community."
            description="Only admin-approved submissions appear here. Drafts and review submissions stay inside the author workspace."
            startIndex={1}
          />
        ) : null}
        {secondaryRowArticles.length > 0 ? <SecondaryRow articles={secondaryRowArticles} /> : null}
        <CommunityPulse
          title={communityPulse.title}
          description={communityPulse.description}
          items={communityPulse.items}
        />
      </main>
      <Footer />
    </div>
  )
}
