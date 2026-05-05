import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Footer } from '../components/layout/Footer'
import { Header } from '../components/layout/Header'
import { SupabaseNotice } from '../components/shared/SupabaseNotice'
import { fetchAdminReviewArticles, updateArticleReviewStatus } from '../lib/communityArticles'
import { HARDCODED_ADMIN_USERNAME, signOutHardcodedAdmin } from '../lib/adminAuth'
import { supabase } from '../lib/supabase'
import { validateUuid } from '../lib/validation'
import type { CommunityArticle } from '../types/communityArticles'

type ReviewFilter = 'all' | 'pending_review' | 'published' | 'rejected'

export function AdminDashboardPage() {
  const navigate = useNavigate()
  const [articles, setArticles] = useState<CommunityArticle[]>([])
  const [activeFilter, setActiveFilter] = useState<ReviewFilter>('pending_review')
  const [isLoading, setIsLoading] = useState(true)
  const [updatingArticleId, setUpdatingArticleId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const stats = useMemo(
    () => ({
      pending: articles.filter((article) => article.status === 'pending_review').length,
      published: articles.filter((article) => article.status === 'published').length,
      rejected: articles.filter((article) => article.status === 'rejected').length,
      total: articles.length,
    }),
    [articles],
  )

  const filteredArticles = useMemo(() => {
    const nextArticles =
      activeFilter === 'all'
        ? articles
        : articles.filter((article) => article.status === activeFilter)

    return [...nextArticles].sort((firstArticle, secondArticle) => {
      const firstDate = new Date(firstArticle.publishedAt ?? firstArticle.createdAt).getTime()
      const secondDate = new Date(secondArticle.publishedAt ?? secondArticle.createdAt).getTime()

      return secondDate - firstDate
    })
  }, [activeFilter, articles])

  useEffect(() => {
    let cancelled = false

    async function loadArticles() {
      try {
        const nextArticles = await fetchAdminReviewArticles()

        if (!cancelled) {
          setArticles(nextArticles)
        }
      } catch (caughtError) {
        if (!cancelled) {
          const nextError =
            caughtError instanceof Error ? caughtError.message : 'Failed to load review queue.'
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
  }, [])

  async function handleReview(article: CommunityArticle, status: 'published' | 'rejected') {
    const validationError =
      validateUuid(article.id, 'Article ID') ||
      (status !== 'published' && status !== 'rejected' ? 'Review status is invalid.' : null)

    if (validationError) {
      setError(validationError)
      return
    }

    if (article.status === status) {
      setError(`Article is already ${status === 'published' ? 'approved' : 'rejected'}.`)
      return
    }

    setError(null)
    setUpdatingArticleId(article.id)

    try {
      const nextArticle = await updateArticleReviewStatus(article.id, status)
      setArticles((currentArticles) =>
        currentArticles.map((currentArticle) =>
          currentArticle.id === article.id ? nextArticle : currentArticle,
        ),
      )
    } catch (caughtError) {
      const nextError =
        caughtError instanceof Error ? caughtError.message : 'Failed to update article status.'
      setError(nextError)
    } finally {
      setUpdatingArticleId(null)
    }
  }

  function handleAdminSignOut() {
    signOutHardcodedAdmin()
    navigate('/admin/login', { replace: true })
  }

  function formatDate(date: string) {
    return new Intl.DateTimeFormat(undefined, {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(new Date(date))
  }

  function getStatusLabel(status: CommunityArticle['status']) {
    if (status === 'published') {
      return 'Approved'
    }

    if (status === 'rejected') {
      return 'Rejected'
    }

    if (status === 'pending_review') {
      return 'Pending'
    }

    return 'Draft'
  }

  function getFilteredEmptyMessage() {
    if (activeFilter === 'published') {
      return {
        title: 'No approved articles yet',
        detail: 'Approved submissions will stay here so admins can revisit live community posts.',
      }
    }

    if (activeFilter === 'rejected') {
      return {
        title: 'No rejected articles',
        detail: 'Rejected submissions will appear here if an admin sends a post back from review.',
      }
    }

    if (activeFilter === 'pending_review') {
      return {
        title: 'No pending submissions',
        detail: 'New contributor submissions will appear here when they are ready for review.',
      }
    }

    return {
      title: 'No submissions yet',
      detail: 'Submitted articles will appear here when contributors send them for review.',
    }
  }

  const filterItems: Array<{ count: number; label: string; value: ReviewFilter }> = [
    { count: stats.pending, label: 'Pending', value: 'pending_review' },
    { count: stats.published, label: 'Approved', value: 'published' },
    { count: stats.rejected, label: 'Rejected', value: 'rejected' },
    { count: stats.total, label: 'All', value: 'all' },
  ]

  const emptyMessage = getFilteredEmptyMessage()

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <section className="mb-8 grid gap-6 lg:grid-cols-[1fr,28rem] lg:items-end">
          <div className="space-y-4">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-coral">
              Admin desk
            </p>
            <h1 className="max-w-4xl font-display text-4xl font-black tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl">
              Review submissions before publication.
            </h1>
            <p className="max-w-3xl text-sm leading-7 text-white/62 sm:text-base">
              Signed in as {HARDCODED_ADMIN_USERNAME}. Pending posts stay out of the public homepage
              until an admin approves them.
            </p>
            <button
              type="button"
              onClick={handleAdminSignOut}
              className="rounded-full border border-white/10 px-5 py-3 text-sm text-white/72 transition hover:bg-white/6 hover:text-white"
            >
              Sign out admin
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3 rounded-[1.5rem] border border-white/10 bg-white/5 p-4 text-center sm:grid-cols-4">
            <div>
              <p className="text-2xl font-black tracking-[-0.04em] text-white">{stats.total}</p>
              <p className="mt-1 text-[0.68rem] uppercase tracking-[0.16em] text-white/38">
                Total
              </p>
            </div>
            <div>
              <p className="text-2xl font-black tracking-[-0.04em] text-white">{stats.pending}</p>
              <p className="mt-1 text-[0.68rem] uppercase tracking-[0.16em] text-white/38">
                Pending
              </p>
            </div>
            <div>
              <p className="text-2xl font-black tracking-[-0.04em] text-white">{stats.published}</p>
              <p className="mt-1 text-[0.68rem] uppercase tracking-[0.16em] text-white/38">
                Approved
              </p>
            </div>
            <div>
              <p className="text-2xl font-black tracking-[-0.04em] text-white">{stats.rejected}</p>
              <p className="mt-1 text-[0.68rem] uppercase tracking-[0.16em] text-white/38">
                Rejected
              </p>
            </div>
          </div>
        </section>

        {!supabase ? (
          <SupabaseNotice />
        ) : isLoading ? (
          <div className="rounded-[1.5rem] border border-white/10 bg-white/4 p-6 text-sm text-white/62">
            Loading review queue...
          </div>
        ) : error ? (
          <div className="rounded-[1.5rem] border border-coral/30 bg-coral/10 p-6 text-sm text-coral">
            {error}
          </div>
        ) : articles.length === 0 ? (
          <div className="rounded-[2rem] border border-white/10 bg-white/4 p-8">
            <p className="text-xl font-bold tracking-[-0.03em] text-white">No submissions yet</p>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/62">
              Submitted articles will appear here when contributors send them for review.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="flex flex-wrap gap-2 rounded-[1.25rem] border border-white/10 bg-black/20 p-2">
              {filterItems.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => {
                    setActiveFilter(item.value)
                    setError(null)
                  }}
                  className={`flex min-h-11 items-center gap-2 rounded-full px-4 text-sm transition ${
                    activeFilter === item.value
                      ? 'bg-white text-ink'
                      : 'text-white/58 hover:bg-white/6 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs ${
                      activeFilter === item.value
                        ? 'bg-ink/10 text-ink/72'
                        : 'bg-white/8 text-white/44'
                    }`}
                  >
                    {item.count}
                  </span>
                </button>
              ))}
            </div>

            {filteredArticles.length === 0 ? (
              <div className="rounded-[2rem] border border-white/10 bg-white/4 p-8">
                <p className="text-xl font-bold tracking-[-0.03em] text-white">
                  {emptyMessage.title}
                </p>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-white/62">
                  {emptyMessage.detail}
                </p>
              </div>
            ) : null}

            <div className="grid gap-4">
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                className={`grid gap-5 rounded-[1.5rem] border p-4 md:grid-cols-[12rem,1fr] md:p-5 ${
                  article.status === 'published'
                    ? 'border-[#7BFFB2]/20 bg-[#7BFFB2]/[0.045]'
                    : article.status === 'rejected'
                      ? 'border-white/10 bg-white/[0.025]'
                      : 'border-white/10 bg-white/4'
                }`}
              >
                <div className="overflow-hidden rounded-[1.1rem] border border-white/10 bg-white/5">
                  {article.coverImageUrl ? (
                    <img
                      src={article.coverImageUrl}
                      alt=""
                      className="aspect-[16/11] h-full w-full object-cover md:aspect-auto"
                    />
                  ) : (
                    <div className="flex aspect-[16/11] h-full min-h-32 items-center justify-center px-4 text-center text-xs uppercase tracking-[0.18em] text-white/30 md:aspect-auto">
                      No cover
                    </div>
                  )}
                </div>

                <div className="min-w-0">
                  <div className="mb-3 flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/40">
                    <span>{article.authorName}</span>
                    <span>
                      {article.status === 'published' && article.publishedAt
                        ? `Approved ${formatDate(article.publishedAt)}`
                        : `Submitted ${formatDate(article.createdAt)}`}
                    </span>
                    <span
                      className={`rounded-full border px-3 py-1 tracking-[0.16em] ${
                        article.status === 'published'
                          ? 'border-[#7BFFB2]/30 bg-[#7BFFB2]/12 text-[#7BFFB2]'
                          : article.status === 'rejected'
                            ? 'border-white/10 bg-white/5 text-white/52'
                            : 'border-lavender/30 bg-lavender/12 text-lavender'
                      }`}
                    >
                      {getStatusLabel(article.status)}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold tracking-[-0.03em] text-white">
                    {article.title}
                  </h2>
                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-white/62">
                    {article.deck}
                  </p>
                  <div className="mt-5 flex min-h-7 flex-wrap gap-2">
                    {article.tags.length > 0 ? (
                      article.tags.slice(0, 5).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/58"
                        >
                          {tag}
                        </span>
                      ))
                    ) : (
                      <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/36">
                        No tags
                      </span>
                    )}
                  </div>
                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <Link
                      to={`/article/${article.slug}`}
                      className="rounded-full border border-coral/25 bg-coral/10 px-4 py-2 text-sm text-coral transition hover:bg-coral hover:text-white"
                    >
                      {article.status === 'published' ? 'Open live post' : 'Preview'}
                    </Link>
                    <button
                      type="button"
                      onClick={() => void handleReview(article, 'published')}
                      disabled={updatingArticleId === article.id || article.status === 'published'}
                      className="rounded-full border border-[#7BFFB2]/25 bg-[#7BFFB2]/10 px-4 py-2 text-sm text-[#7BFFB2] transition hover:bg-[#7BFFB2] hover:text-ink disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {updatingArticleId === article.id
                        ? 'Updating...'
                        : article.status === 'published'
                          ? 'Approved'
                          : 'Approve'}
                    </button>
                    <button
                      type="button"
                      onClick={() => void handleReview(article, 'rejected')}
                      disabled={updatingArticleId === article.id || article.status === 'rejected'}
                      className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/54 transition hover:border-coral/30 hover:text-coral disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {article.status === 'published' ? 'Remove from live' : 'Reject'}
                    </button>
                  </div>
                </div>
              </article>
            ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
