import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Footer } from '../components/layout/Footer'
import { Header } from '../components/layout/Header'
import { SupabaseNotice } from '../components/shared/SupabaseNotice'
import { useAuth } from '../components/auth/useAuth'
import { deleteCommunityArticle, fetchMyArticles } from '../lib/communityArticles'
import type { CommunityArticle } from '../types/communityArticles'

export function MyArticlesPage() {
  const { isConfigured, user } = useAuth()
  const [articles, setArticles] = useState<CommunityArticle[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [deletingArticleId, setDeletingArticleId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function loadArticles() {
      if (!user) {
        setArticles([])
        setIsLoading(false)
        return
      }

      try {
        const nextArticles = await fetchMyArticles(user.id)

        if (!cancelled) {
          setArticles(nextArticles)
        }
      } catch (caughtError) {
        if (!cancelled) {
          const nextError =
            caughtError instanceof Error ? caughtError.message : 'Failed to load your articles.'
          setError(nextError)
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    void loadArticles()

    return () => {
      cancelled = true
    }
  }, [user])

  async function handleDelete(article: CommunityArticle) {
    if (!user) {
      setError('You need to be signed in to delete articles.')
      return
    }

    const confirmed = window.confirm(`Delete "${article.title}"? This cannot be undone.`)

    if (!confirmed) {
      return
    }

    setError(null)
    setDeletingArticleId(article.id)

    try {
      await deleteCommunityArticle(article.id, user.id)
      setArticles((currentArticles) =>
        currentArticles.filter((currentArticle) => currentArticle.id !== article.id),
      )
    } catch (caughtError) {
      const nextError =
        caughtError instanceof Error ? caughtError.message : 'Failed to delete the article.'
      setError(nextError)
    } finally {
      setDeletingArticleId(null)
    }
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <section className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-3">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-coral">
              My articles
            </p>
            <h1 className="font-display text-4xl font-black tracking-[-0.05em] text-white sm:text-5xl">
              Track your drafts and published posts.
            </h1>
          </div>
          <Link
            to="/write"
            className="rounded-full border border-coral/25 bg-coral/10 px-5 py-3 text-center text-sm text-coral transition hover:bg-coral hover:text-white"
          >
            Write a new article
          </Link>
        </section>

        {!isConfigured ? (
          <SupabaseNotice />
        ) : isLoading ? (
          <div className="rounded-[1.5rem] border border-white/10 bg-white/4 p-6 text-sm text-white/62">
            Loading your articles...
          </div>
        ) : error ? (
          <div className="rounded-[1.5rem] border border-coral/30 bg-coral/10 p-6 text-sm text-coral">
            {error}
          </div>
        ) : articles.length === 0 ? (
          <div className="rounded-[1.5rem] border border-white/10 bg-white/4 p-6 text-sm text-white/62">
            No articles yet. Start with a draft and publish when the structure is ready.
          </div>
        ) : (
          <div className="grid gap-4">
            {articles.map((article) => (
              <article
                key={article.id}
                className="rounded-[1.5rem] border border-white/10 bg-white/4 p-5 transition hover:border-white/20 hover:bg-white/6"
              >
                <div className="mb-3 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.24em] text-white/40">
                  <span>{article.section}</span>
                  <span>{article.status}</span>
                  <span>{new Date(article.createdAt).toLocaleDateString()}</span>
                </div>
                <h2 className="text-2xl font-bold tracking-[-0.03em] text-white">{article.title}</h2>
                <p className="mt-3 text-sm leading-6 text-white/62">{article.deck}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/58"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-4">
                  <Link
                    to={`/article/${article.slug}`}
                    className="text-sm text-coral transition hover:text-white"
                  >
                    Open article
                  </Link>
                  <button
                    type="button"
                    onClick={() => void handleDelete(article)}
                    disabled={deletingArticleId === article.id}
                    className="text-sm text-white/54 transition hover:text-coral disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {deletingArticleId === article.id ? 'Deleting...' : 'Delete article'}
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
