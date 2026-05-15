import { useEffect, useMemo, useState } from 'react'
import { Footer } from '../components/layout/Footer'
import { Header } from '../components/layout/Header'
import { IssueStrip } from '../components/layout/IssueStrip'
import { CommunityPulse } from '../components/homepage/CommunityPulse'
import { HeroFeature } from '../components/homepage/HeroFeature'
import { SecondaryRow } from '../components/homepage/SecondaryRow'
import { SectionGrid } from '../components/homepage/SectionGrid'
import {
  communityPulse,
  featuredArticle,
  issueArticleGroups,
  issueSummary,
  secondaryRowArticles,
} from '../data/content'
import { communityArticleToEditorialArticle } from '../lib/articleTransforms'
import { fetchPublishedCommunityArticles } from '../lib/communityArticles'
import { getIssueSummaryForDate } from '../lib/issues'
import type { Article, IssueSummary } from '../types/content'

interface IssueArticleGroup {
  articles: Article[]
  issue: IssueSummary
}

export function HomePage() {
  const [approvedContributorArticles, setApprovedContributorArticles] = useState<
    Array<{ article: Article; issue: IssueSummary }>
  >([])

  const homepageIssueGroups = useMemo<IssueArticleGroup[]>(() => {
    const groups = issueArticleGroups.map(({ issue, articles }) => ({
      issue,
      articles: [...articles],
    }))

    approvedContributorArticles.forEach(({ article, issue }) => {
      const existingGroup = groups.find((group) => group.issue.issueNumber === issue.issueNumber)

      if (existingGroup) {
        existingGroup.articles.push(article)
      } else {
        groups.push({ issue, articles: [article] })
      }
    })

    return groups.sort((firstGroup, secondGroup) =>
      secondGroup.issue.issueNumber.localeCompare(firstGroup.issue.issueNumber),
    )
  }, [approvedContributorArticles])

  const currentIssueGroup = homepageIssueGroups[0]
  const heroArticle = currentIssueGroup?.articles[0] ?? featuredArticle
  const editorialGridArticles = currentIssueGroup?.articles.slice(1) ?? []
  const archiveIssueGroups = homepageIssueGroups.slice(1)

  useEffect(() => {
    let cancelled = false

    async function loadCommunityArticles() {
      try {
        const publishedArticles = await fetchPublishedCommunityArticles()

        if (!cancelled) {
          setApprovedContributorArticles(
            publishedArticles.map((article) => ({
              article: communityArticleToEditorialArticle(article),
              issue: getIssueSummaryForDate(article.publishedAt ?? article.createdAt),
            })),
          )
        }
      } catch {
        if (!cancelled) {
          setApprovedContributorArticles([])
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
        <IssueStrip issue={currentIssueGroup?.issue ?? issueSummary} />
        <HeroFeature
          article={heroArticle}
          issue={currentIssueGroup?.issue ?? issueSummary}
          displayIndex="01"
        />
        {editorialGridArticles.length > 0 ? <SectionGrid articles={editorialGridArticles} /> : null}
        {archiveIssueGroups.map(({ issue, articles }) => (
          <SectionGrid
            key={issue.issueNumber}
            articles={articles}
            eyebrow={`Issue ${issue.issueNumber} . ${issue.releaseDate}`}
            title={issue.issueLabel}
            description="Contributor stories from this monthly issue."
            startIndex={1}
          />
        ))}
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
