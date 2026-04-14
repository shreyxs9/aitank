import { Footer } from '../components/layout/Footer'
import { Header } from '../components/layout/Header'
import { IssueStrip } from '../components/layout/IssueStrip'
import { CommunityPulse } from '../components/homepage/CommunityPulse'
import { FounderSpotlightBand } from '../components/homepage/FounderSpotlightBand'
import { HeroFeature } from '../components/homepage/HeroFeature'
import { SecondaryRow } from '../components/homepage/SecondaryRow'
import { SectionGrid } from '../components/homepage/SectionGrid'
import {
  communityPulse,
  editorialGridArticles,
  featuredArticle,
  founders,
  issueSummary,
  secondaryRowArticles,
} from '../data/content'

export function HomePage() {
  return (
    <div className="min-h-screen bg-transparent">
      <Header />
      <main>
        <IssueStrip issue={issueSummary} />
        <HeroFeature article={featuredArticle} issue={issueSummary} />
        <SectionGrid articles={editorialGridArticles} />
        <FounderSpotlightBand founders={founders} />
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
