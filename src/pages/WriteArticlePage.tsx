import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Footer } from '../components/layout/Footer'
import { Header } from '../components/layout/Header'
import { SupabaseNotice } from '../components/shared/SupabaseNotice'
import { useAuth } from '../components/auth/useAuth'
import { createCommunityArticle, uploadArticleCoverImage } from '../lib/communityArticles'
import {
  normalizeWhitespace,
  parseTags,
  validateArticleBody,
  validateArticleDeck,
  validateArticleStatus,
  validateArticleTitle,
  validateImageFile,
  validateTags,
} from '../lib/validation'
import type { CommunityArticleStatus } from '../types/communityArticles'

export function WriteArticlePage() {
  const navigate = useNavigate()
  const { isConfigured, user } = useAuth()
  const [title, setTitle] = useState('')
  const [deck, setDeck] = useState('')
  const [tags, setTags] = useState('')
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null)
  const [coverImagePreviewUrl, setCoverImagePreviewUrl] = useState('')
  const [body, setBody] = useState('')
  const [status, setStatus] = useState<CommunityArticleStatus>('draft')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDraggingCover, setIsDraggingCover] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const parsedTags = useMemo(
    () => parseTags(tags),
    [tags],
  )

  const bodyStats = useMemo(() => {
    const words = body.trim().split(/\s+/).filter(Boolean).length
    const paragraphs = body
      .split(/\n{2,}/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean).length

    return {
      paragraphs,
      readingTime: Math.max(1, Math.ceil(words / 220)),
      words,
    }
  }, [body])

  const completionItems = [
    { isComplete: title.trim().length > 0, label: 'Headline' },
    { isComplete: deck.trim().length > 0, label: 'Deck' },
    { isComplete: bodyStats.words >= 120, label: 'Body' },
    { isComplete: parsedTags.length > 0, label: 'Tags' },
  ]
  const completedItems = completionItems.filter((item) => item.isComplete).length
  const completionPercent = Math.round((completedItems / completionItems.length) * 100)

  useEffect(() => {
    return () => {
      if (coverImagePreviewUrl) {
        URL.revokeObjectURL(coverImagePreviewUrl)
      }
    }
  }, [coverImagePreviewUrl])

  function applyCoverImage(file: File | null) {
    if (!file) {
      setCoverImageFile(null)
      setCoverImagePreviewUrl('')
      return
    }

    const validationError = validateImageFile(file)
    if (validationError) {
      setError(validationError)
      return
    }

    setError(null)
    setCoverImageFile(file)
    setCoverImagePreviewUrl(URL.createObjectURL(file))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!user) {
      setError('You need to be signed in to submit an article.')
      return
    }

    const normalizedTitle = normalizeWhitespace(title)
    const normalizedDeck = normalizeWhitespace(deck)
    const normalizedBody = body.trim()
    const validationError =
      validateArticleTitle(normalizedTitle) ||
      validateArticleDeck(normalizedDeck) ||
      validateTags(parsedTags) ||
      validateArticleBody(normalizedBody) ||
      validateArticleStatus(status) ||
      (coverImageFile ? validateImageFile(coverImageFile) : null)

    if (validationError) {
      setError(validationError)
      return
    }

    setError(null)
    setIsSubmitting(true)

    try {
      const coverImageUrl =
        coverImageFile ? await uploadArticleCoverImage(user.id, coverImageFile) : ''

      const { article } = await createCommunityArticle(user.id, {
        body: normalizedBody,
        coverImageUrl,
        deck: normalizedDeck,
        section: 'Community',
        status,
        tags: parsedTags,
        title: normalizedTitle,
      })

      navigate(`/article/${article.slug}`)
    } catch (caughtError) {
      const nextError =
        caughtError instanceof Error ? caughtError.message : 'Article submission failed.'
      setError(nextError)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <section className="mb-8 grid gap-6 lg:grid-cols-[1fr,22rem] lg:items-end">
          <div className="space-y-4">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-coral">
              Contributor studio
            </p>
            <h1 className="max-w-4xl font-display text-4xl font-black tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl">
              Shape the piece, then choose how it goes live.
            </h1>
            <p className="max-w-3xl text-sm leading-7 text-white/64 sm:text-base">
              Build a clean reader-ready post with a headline, deck, cover, tags, and plain-text
              body. Save a draft while it is rough or send it to the editors for review.
            </p>
          </div>
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-white">Readiness</p>
                <p className="mt-1 text-xs text-white/48">{completedItems} of 4 essentials done</p>
              </div>
              <span className="text-2xl font-black tracking-[-0.04em] text-white">
                {completionPercent}%
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/8">
              <div
                className="h-full rounded-full bg-coral transition-all"
                style={{ width: `${completionPercent}%` }}
              />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {completionItems.map((item) => (
                <span
                  key={item.label}
                  className={`rounded-full border px-3 py-2 text-xs ${
                    item.isComplete
                      ? 'border-coral/30 bg-coral/12 text-coral'
                      : 'border-white/10 text-white/45'
                  }`}
                >
                  {item.label}
                </span>
              ))}
            </div>
          </div>
        </section>

        {!isConfigured ? (
          <SupabaseNotice />
        ) : (
          <form
            onSubmit={handleSubmit}
            className="grid gap-6 lg:grid-cols-[minmax(0,1fr),24rem] lg:items-start"
          >
            <div className="grid gap-5 rounded-[2rem] border border-white/10 bg-black/20 p-5 shadow-2xl shadow-black/20 sm:p-7">
              <div className="grid gap-5">
                <label className="block">
                  <span className="mb-2 flex items-center justify-between gap-3 text-sm text-white/72">
                    <span>Headline</span>
                    <span className="text-xs text-white/38">{title.length}/110</span>
                  </span>
                  <input
                    id="article-title"
                    name="title"
                    value={title}
                    onChange={(event) => {
                      setTitle(event.target.value)
                      setError(null)
                    }}
                    required
                    minLength={8}
                    maxLength={110}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-white/28 focus:border-coral/60"
                    placeholder="Write a strong editorial headline"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 flex items-center justify-between gap-3 text-sm text-white/72">
                    <span>Deck</span>
                    <span className="text-xs text-white/38">{deck.length}/220</span>
                  </span>
                  <textarea
                    id="article-deck"
                    name="deck"
                    value={deck}
                    onChange={(event) => {
                      setDeck(event.target.value)
                      setError(null)
                    }}
                    required
                    minLength={30}
                    maxLength={220}
                    rows={3}
                    className="w-full resize-y rounded-[1.5rem] border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-white/28 focus:border-coral/60"
                    placeholder="One concise paragraph that explains why the piece matters."
                  />
                </label>

                <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr),20rem]">
                  <label className="block">
                    <span className="mb-2 block text-sm text-white/72">Tags</span>
                    <input
                      id="article-tags"
                      name="tags"
                      value={tags}
                      onChange={(event) => {
                        setTags(event.target.value)
                        setError(null)
                      }}
                      maxLength={180}
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-white/28 focus:border-coral/60"
                      placeholder="AI ops, annotation, product"
                    />
                    <div className="mt-3 flex min-h-8 flex-wrap gap-2">
                      {parsedTags.length > 0 ? (
                        parsedTags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/62"
                          >
                            {tag}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-white/38">Separate tags with commas.</span>
                      )}
                    </div>
                  </label>

                  <div className="rounded-[1.5rem] border border-white/10 bg-white/4 p-4">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <span className="text-sm text-white/72">Cover image</span>
                      <span className="text-xs uppercase tracking-[0.22em] text-white/38">
                        Optional
                      </span>
                    </div>
                    <label
                      onDragEnter={(event) => {
                        event.preventDefault()
                        setIsDraggingCover(true)
                      }}
                      onDragOver={(event) => {
                        event.preventDefault()
                        setIsDraggingCover(true)
                      }}
                      onDragLeave={(event) => {
                        event.preventDefault()
                        setIsDraggingCover(false)
                      }}
                      onDrop={(event) => {
                        event.preventDefault()
                        setIsDraggingCover(false)
                        applyCoverImage(event.dataTransfer.files[0] ?? null)
                      }}
                      className={`flex min-h-52 cursor-pointer flex-col items-center justify-center rounded-[1.25rem] border border-dashed px-5 py-6 text-center transition ${
                        isDraggingCover
                          ? 'border-coral bg-coral/12'
                          : 'border-white/14 bg-black/15 hover:border-white/28 hover:bg-white/6'
                      }`}
                    >
                      {coverImagePreviewUrl ? (
                        <div className="w-full space-y-4">
                          <img
                            src={coverImagePreviewUrl}
                            alt="Selected cover preview"
                            className="aspect-[16/9] w-full rounded-[1rem] object-cover"
                          />
                          <div className="space-y-1">
                            <p className="truncate text-sm font-medium text-white">
                              {coverImageFile?.name || 'Selected image'}
                            </p>
                            <p className="text-xs text-white/50">Click or drop to replace.</p>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <p className="text-sm font-medium text-white">Drop an image here</p>
                          <p className="text-sm leading-6 text-white/56">
                            JPG, PNG, or WebP under 5 MB.
                          </p>
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        className="hidden"
                        onChange={(event) => applyCoverImage(event.target.files?.[0] ?? null)}
                      />
                    </label>
                    {coverImageFile ? (
                      <button
                        type="button"
                        onClick={() => applyCoverImage(null)}
                        className="mt-3 text-sm text-white/54 transition hover:text-coral"
                      >
                        Remove cover
                      </button>
                    ) : null}
                  </div>
                </div>

                <label className="block">
                  <span className="mb-2 flex items-center justify-between gap-3 text-sm text-white/72">
                    <span>Body</span>
                    <span className="text-xs text-white/38">
                      {bodyStats.words} words / {bodyStats.readingTime} min read
                    </span>
                  </span>
                  <textarea
                    id="article-body"
                    name="body"
                    value={body}
                    onChange={(event) => {
                      setBody(event.target.value)
                      setError(null)
                    }}
                    required
                    minLength={600}
                    maxLength={30000}
                    rows={18}
                    className="w-full resize-y rounded-[1.5rem] border border-white/10 bg-white/5 px-4 py-3 leading-7 text-white outline-none transition placeholder:text-white/28 focus:border-coral/60"
                    placeholder="Write in plain paragraphs. Separate sections with blank lines for now."
                  />
                </label>
              </div>

              <div className="sticky bottom-4 z-10 flex flex-col gap-4 rounded-[1.5rem] border border-white/10 bg-ink/95 p-4 shadow-2xl shadow-black/30 backdrop-blur sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-white">Submission mode</p>
                  <div className="flex rounded-full border border-white/10 bg-white/5 p-1">
                    {(['draft', 'pending_review'] as const).map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setStatus(option)}
                        className={`rounded-full px-4 py-2 text-sm transition ${
                          status === option
                            ? 'bg-coral text-white'
                            : 'text-white/62 hover:bg-white/6 hover:text-white'
                        }`}
                      >
                        {option === 'draft' ? 'Draft' : 'Review'}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-white/42">
                    {status === 'draft'
                      ? 'Drafts stay in your workspace until opened from My Articles.'
                      : 'Submitted posts wait for admin approval before appearing on the home page.'}
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link
                    to="/my-articles"
                    className="rounded-full border border-white/10 px-5 py-3 text-center text-sm text-white/72 transition hover:bg-white/6 hover:text-white"
                  >
                    My articles
                  </Link>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-full bg-coral px-5 py-3 text-sm font-medium text-white transition hover:bg-[#ff8c72] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting
                      ? 'Saving...'
                      : status === 'draft'
                        ? 'Save draft'
                        : 'Submit for review'}
                  </button>
                </div>
              </div>

              {error ? (
                <div className="rounded-[1.25rem] border border-coral/30 bg-coral/10 p-4 text-sm text-coral">
                  {error}
                </div>
              ) : null}
            </div>

            <aside className="top-24 grid gap-4 lg:sticky">
              <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5">
                {coverImagePreviewUrl ? (
                  <img
                    src={coverImagePreviewUrl}
                    alt=""
                    className="aspect-[16/10] w-full object-cover"
                  />
                ) : (
                  <div className="flex aspect-[16/10] items-center justify-center bg-white/5 text-sm text-white/38">
                    Cover preview
                  </div>
                )}
                <div className="space-y-4 p-5">
                  <div className="flex flex-wrap items-center gap-2 text-[0.68rem] uppercase tracking-[0.22em] text-white/40">
                    <span>Community</span>
                    <span>{status === 'pending_review' ? 'In review' : 'Draft'}</span>
                    <span>{bodyStats.readingTime} min</span>
                  </div>
                  <div className="space-y-3">
                    <h2 className="text-2xl font-black tracking-[-0.04em] text-white">
                      {title.trim() || 'Your article headline'}
                    </h2>
                    <p className="text-sm leading-6 text-white/62">
                      {deck.trim() || 'The article deck will preview here as readers will scan it.'}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {parsedTags.length > 0 ? (
                      parsedTags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/58"
                        >
                          {tag}
                        </span>
                      ))
                    ) : (
                      <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/38">
                        No tags yet
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 rounded-[1.5rem] border border-white/10 bg-white/4 p-4 text-center">
                <div>
                  <p className="text-lg font-bold text-white">{bodyStats.words}</p>
                  <p className="mt-1 text-[0.68rem] uppercase tracking-[0.16em] text-white/38">
                    Words
                  </p>
                </div>
                <div>
                  <p className="text-lg font-bold text-white">{bodyStats.paragraphs}</p>
                  <p className="mt-1 text-[0.68rem] uppercase tracking-[0.16em] text-white/38">
                    Paras
                  </p>
                </div>
                <div>
                  <p className="text-lg font-bold text-white">{parsedTags.length}</p>
                  <p className="mt-1 text-[0.68rem] uppercase tracking-[0.16em] text-white/38">
                    Tags
                  </p>
                </div>
              </div>
            </aside>
          </form>
        )}
      </main>
      <Footer />
    </div>
  )
}
