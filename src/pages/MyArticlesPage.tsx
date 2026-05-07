import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Footer } from '../components/layout/Footer'
import { Header } from '../components/layout/Header'
import { SupabaseNotice } from '../components/shared/SupabaseNotice'
import { useAuth } from '../components/auth/useAuth'
import {
  deleteCommunityArticle,
  deleteProfilePicture,
  fetchMyArticles,
  updateProfileDetails,
  uploadProfilePicture,
} from '../lib/communityArticles'
import { supabase } from '../lib/supabase'
import { validateProfileImageFile, validateUuid } from '../lib/validation'
import type { CommunityArticle } from '../types/communityArticles'

export function MyArticlesPage() {
  const { isConfigured, profile, refreshProfile, user } = useAuth()
  const [articles, setArticles] = useState<CommunityArticle[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [deletingArticleId, setDeletingArticleId] = useState<string | null>(null)
  const [profilePicture, setProfilePicture] = useState<File | null>(null)
  const [profilePicturePreview, setProfilePicturePreview] = useState<string | null>(null)
  const [isSavingProfilePicture, setIsSavingProfilePicture] = useState(false)
  const [profileMessage, setProfileMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const profilePictureInputRef = useRef<HTMLInputElement | null>(null)

  const articleStats = useMemo(() => {
    const published = articles.filter((article) => article.status === 'published').length
    const inReview = articles.filter((article) => article.status === 'pending_review').length

    return {
      drafts: articles.filter((article) => article.status === 'draft').length,
      inReview,
      published,
      total: articles.length,
    }
  }, [articles])

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

  useEffect(() => {
    return () => {
      if (profilePicturePreview) {
        URL.revokeObjectURL(profilePicturePreview)
      }
    }
  }, [profilePicturePreview])

  function setSelectedProfilePicture(file: File | null) {
    if (profilePicturePreview) {
      URL.revokeObjectURL(profilePicturePreview)
    }

    setProfilePicture(file)
    setProfilePicturePreview(file ? URL.createObjectURL(file) : null)
    setProfileMessage(null)
    setError(null)

    if (!file && profilePictureInputRef.current) {
      profilePictureInputRef.current.value = ''
    }
  }

  async function handleSaveProfilePicture() {
    if (!user || !profilePicture || !supabase) {
      return
    }

    const validationError = validateUuid(user.id, 'User ID') || validateProfileImageFile(profilePicture)

    if (validationError) {
      setError(validationError)
      setProfileMessage(null)
      return
    }

    setIsSavingProfilePicture(true)
    setError(null)
    setProfileMessage(null)

    try {
      const previousAvatarUrl = profile?.avatarUrl ?? null
      const avatarUrl = await uploadProfilePicture(user.id, profilePicture)

      const { error: metadataError } = await supabase.auth.updateUser({
        data: {
          avatar_url: avatarUrl,
          designation: profile?.designation ?? null,
          display_name: profile?.displayName ?? user.email?.split('@')[0] ?? null,
        },
      })

      if (metadataError) {
        throw metadataError
      }

      await updateProfileDetails(user.id, { avatarUrl })
      await deleteProfilePicture(user.id, previousAvatarUrl).catch(() => undefined)
      await refreshProfile()
      setSelectedProfilePicture(null)
      setProfileMessage('Profile picture updated.')
    } catch (caughtError) {
      const nextError =
        caughtError instanceof Error ? caughtError.message : 'Failed to update profile picture.'
      setError(nextError)
    } finally {
      setIsSavingProfilePicture(false)
    }
  }

  async function handleRemoveProfilePicture() {
    if (!user || !supabase || !profile?.avatarUrl) {
      return
    }

    setIsSavingProfilePicture(true)
    setError(null)
    setProfileMessage(null)

    try {
      const previousAvatarUrl = profile.avatarUrl

      const { error: metadataError } = await supabase.auth.updateUser({
        data: {
          avatar_url: null,
          designation: profile.designation,
          display_name: profile.displayName ?? user.email?.split('@')[0] ?? null,
        },
      })

      if (metadataError) {
        throw metadataError
      }

      await updateProfileDetails(user.id, { avatarUrl: null })
      await deleteProfilePicture(user.id, previousAvatarUrl).catch(() => undefined)
      await refreshProfile()
      setSelectedProfilePicture(null)
      setProfileMessage('Profile picture removed.')
    } catch (caughtError) {
      const nextError =
        caughtError instanceof Error ? caughtError.message : 'Failed to remove profile picture.'
      setError(nextError)
    } finally {
      setIsSavingProfilePicture(false)
    }
  }

  async function handleDelete(article: CommunityArticle) {
    if (!user) {
      setError('You need to be signed in to delete articles.')
      return
    }

    const validationError = validateUuid(article.id, 'Article ID') || validateUuid(user.id, 'User ID')

    if (validationError) {
      setError(validationError)
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

  function formatArticleDate(date: string) {
    return new Intl.DateTimeFormat(undefined, {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(new Date(date))
  }

  function getStatusLabel(status: CommunityArticle['status']) {
    if (status === 'published') {
      return 'Live'
    }

    if (status === 'pending_review') {
      return 'In review'
    }

    if (status === 'rejected') {
      return 'Rejected'
    }

    return 'Draft'
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <section className="mb-8 grid gap-6 lg:grid-cols-[1fr,28rem] lg:items-end">
          <div className="space-y-4">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-coral">
              Publishing desk
            </p>
            <h1 className="max-w-4xl font-display text-4xl font-black tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl">
              Manage drafts, review submissions, and published posts.
            </h1>
            <p className="max-w-3xl text-sm leading-7 text-white/62 sm:text-base">
              Review article status, open live URLs, and keep the contributor queue tidy from one
              workspace.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-[1fr,auto] lg:grid-cols-1">
            <div className="grid grid-cols-2 gap-3 rounded-[1.5rem] border border-white/10 bg-white/5 p-4 text-center sm:grid-cols-4">
              <div>
                <p className="text-2xl font-black tracking-[-0.04em] text-white">
                  {articleStats.total}
                </p>
                <p className="mt-1 text-[0.68rem] uppercase tracking-[0.16em] text-white/38">
                  Total
                </p>
              </div>
              <div>
                <p className="text-2xl font-black tracking-[-0.04em] text-white">
                  {articleStats.inReview}
                </p>
                <p className="mt-1 text-[0.68rem] uppercase tracking-[0.16em] text-white/38">
                  Review
                </p>
              </div>
              <div>
                <p className="text-2xl font-black tracking-[-0.04em] text-white">
                  {articleStats.drafts}
                </p>
                <p className="mt-1 text-[0.68rem] uppercase tracking-[0.16em] text-white/38">
                  Drafts
                </p>
              </div>
              <div>
                <p className="text-2xl font-black tracking-[-0.04em] text-white">
                  {articleStats.published}
                </p>
                <p className="mt-1 text-[0.68rem] uppercase tracking-[0.16em] text-white/38">
                  Live
                </p>
              </div>
            </div>
            <Link
              to="/write"
              className="inline-flex items-center justify-center rounded-full border border-coral/25 bg-coral px-5 py-3 text-center text-sm font-medium text-white transition hover:bg-[#ff8c72]"
            >
              Write new article
            </Link>
          </div>
        </section>

        {!isConfigured ? (
          <SupabaseNotice />
        ) : (
          <section className="mb-8 rounded-[1.5rem] border border-white/10 bg-white/4 p-5 sm:p-6">
            <div className="grid gap-5 md:grid-cols-[auto,1fr,auto] md:items-center">
              <div className="grid h-20 w-20 place-items-center overflow-hidden rounded-full border border-white/10 bg-black/30 text-xs font-semibold uppercase tracking-[0.18em] text-white/38">
                {profilePicturePreview || profile?.avatarUrl ? (
                  <img
                    src={profilePicturePreview ?? profile?.avatarUrl ?? ''}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : (
                  'PFP'
                )}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white">Profile picture</p>
                <p className="mt-1 truncate text-sm text-white/54">
                  {profilePicture
                    ? profilePicture.name
                    : profile?.avatarUrl
                      ? 'Current author profile picture'
                      : 'No profile picture set'}
                </p>
                {profileMessage ? (
                  <p className="mt-2 text-sm text-[#7BFFB2]">{profileMessage}</p>
                ) : null}
              </div>
              <div className="flex flex-wrap gap-3 md:justify-end">
                <label className="cursor-pointer rounded-full border border-coral/25 bg-coral/10 px-4 py-2 text-sm text-coral transition hover:bg-coral hover:text-white">
                  Choose new
                  <input
                    ref={profilePictureInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="sr-only"
                    onChange={(event) => {
                      setSelectedProfilePicture(event.target.files?.[0] ?? null)
                    }}
                  />
                </label>
                {profilePicture ? (
                  <button
                    type="button"
                    onClick={() => setSelectedProfilePicture(null)}
                    className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/58 transition hover:border-coral/30 hover:text-coral"
                  >
                    Clear selection
                  </button>
                ) : null}
                {profilePicture ? (
                  <button
                    type="button"
                    onClick={() => void handleSaveProfilePicture()}
                    disabled={isSavingProfilePicture}
                    className="rounded-full border border-coral/25 bg-coral px-4 py-2 text-sm font-medium text-white transition hover:bg-[#ff8c72] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSavingProfilePicture ? 'Saving...' : 'Save picture'}
                  </button>
                ) : null}
                {profile?.avatarUrl ? (
                  <button
                    type="button"
                    onClick={() => void handleRemoveProfilePicture()}
                    disabled={isSavingProfilePicture}
                    className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/58 transition hover:border-coral/30 hover:text-coral disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSavingProfilePicture ? 'Working...' : 'Remove picture'}
                  </button>
                ) : null}
              </div>
            </div>
          </section>
        )}

        {!isConfigured ? null : isLoading ? (
          <div className="rounded-[1.5rem] border border-white/10 bg-white/4 p-6 text-sm text-white/62">
            Loading your articles...
          </div>
        ) : error ? (
          <div className="rounded-[1.5rem] border border-coral/30 bg-coral/10 p-6 text-sm text-coral">
            {error}
          </div>
        ) : articles.length === 0 ? (
          <div className="grid gap-5 rounded-[2rem] border border-white/10 bg-white/4 p-6 sm:p-8 md:grid-cols-[1fr,auto] md:items-center">
            <div>
              <p className="text-xl font-bold tracking-[-0.03em] text-white">No articles yet</p>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-white/62">
                Start with a draft, add the essentials, then submit it for admin review.
              </p>
            </div>
            <Link
              to="/write"
              className="rounded-full border border-coral/25 bg-coral/10 px-5 py-3 text-center text-sm text-coral transition hover:bg-coral hover:text-white"
            >
              Create first draft
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {articles.map((article) => (
              <article
                key={article.id}
                className="grid gap-5 rounded-[1.5rem] border border-white/10 bg-white/4 p-4 transition hover:border-white/20 hover:bg-white/6 md:grid-cols-[11rem,1fr] md:p-5"
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
                    <span>{article.section}</span>
                    <span
                      className={`rounded-full border px-3 py-1 tracking-[0.16em] ${
                        article.status === 'published'
                          ? 'border-coral/30 bg-coral/12 text-coral'
                          : article.status === 'pending_review'
                            ? 'border-lavender/30 bg-lavender/12 text-lavender'
                            : article.status === 'rejected'
                              ? 'border-coral/25 bg-coral/8 text-coral'
                              : 'border-white/10 bg-white/5 text-white/52'
                      }`}
                    >
                      {getStatusLabel(article.status)}
                    </span>
                    <span>{formatArticleDate(article.createdAt)}</span>
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
                      {article.status === 'published' ? 'Open live post' : 'Preview article'}
                    </Link>
                    <button
                      type="button"
                      onClick={() => void handleDelete(article)}
                      disabled={deletingArticleId === article.id}
                      className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/54 transition hover:border-coral/30 hover:text-coral disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {deletingArticleId === article.id ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
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
