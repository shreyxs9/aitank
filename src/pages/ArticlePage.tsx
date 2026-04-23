import { Link, Navigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { ArticleBody } from '../components/article/ArticleBody'
import { ArticleHeader } from '../components/article/ArticleHeader'
import { ArticleSidebar } from '../components/article/ArticleSidebar'
import { Footer } from '../components/layout/Footer'
import { Header } from '../components/layout/Header'
import { getArticleBySlug } from '../data/content'
import { communityArticleToEditorialArticle } from '../lib/articleTransforms'
import { fetchCommunityArticleBySlug } from '../lib/communityArticles'
import type { Article } from '../types/content'
import { useAuth } from '../components/auth/useAuth'

export function ArticlePage() {
  const { slug } = useParams()
  const { user } = useAuth()
  const [article, setArticle] = useState<Article | undefined>(() =>
    slug ? getArticleBySlug(slug) : undefined,
  )
  const [isLoading, setIsLoading] = useState(Boolean(slug && !getArticleBySlug(slug)))

  useEffect(() => {
    let cancelled = false

    async function loadArticle() {
      if (!slug) {
        setArticle(undefined)
        setIsLoading(false)
        return
      }

      const localArticle = getArticleBySlug(slug)

      if (localArticle) {
        setArticle(localArticle)
        setIsLoading(false)
        return
      }

      setIsLoading(true)

      try {
        const communityArticle = await fetchCommunityArticleBySlug(slug)

        if (!cancelled) {
          setArticle(
            communityArticle ? communityArticleToEditorialArticle(communityArticle) : undefined,
          )
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    void loadArticle()

    return () => {
      cancelled = true
    }
  }, [slug])

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="mx-auto flex min-h-[50vh] max-w-7xl items-center justify-center px-4 text-sm text-white/62 sm:px-6 lg:px-8">
          Loading article...
        </main>
        <Footer />
      </div>
    )
  }

  if (!article) {
    return <Navigate to="/" replace />
  }

  const previewOnly = !user

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="border-b border-white/10 bg-white/4">
          <div className="mx-auto flex max-w-7xl flex-col items-start gap-2 px-4 py-3 text-xs text-white/58 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3 sm:px-6 sm:py-4 sm:text-sm lg:px-8">
            <Link to="/" className="transition hover:text-white">
              Back to issue
            </Link>
            <span className="hidden h-1 w-1 rounded-full bg-white/25 sm:block" />
            <p className="break-words">
              {article.breadcrumb.join(' / ')} <span className="text-coral">/ {article.title}</span>
            </p>
          </div>
        </section>

        <ArticleHeader article={article} />

        <div className="mx-auto grid max-w-7xl gap-0 lg:grid-cols-[minmax(0,1fr),20rem] lg:px-8">
          <ArticleBody article={article} previewOnly={previewOnly} />
          <ArticleSidebar article={article} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
