import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Footer } from '../components/layout/Footer'
import { Header } from '../components/layout/Header'
import { SupabaseNotice } from '../components/shared/SupabaseNotice'
import { useAuth } from '../components/auth/useAuth'
import { createCommunityArticle, uploadArticleCoverImage } from '../lib/communityArticles'
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

  function applyCoverImage(file: File | null) {
    if (!file) {
      setCoverImageFile(null)
      setCoverImagePreviewUrl('')
      return
    }

    setCoverImageFile(file)
    setCoverImagePreviewUrl(URL.createObjectURL(file))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!user) {
      setError('You need to be signed in to submit an article.')
      return
    }

    setError(null)
    setIsSubmitting(true)

    try {
      const coverImageUrl =
        coverImageFile ? await uploadArticleCoverImage(user.id, coverImageFile) : ''

      const { article } = await createCommunityArticle(user.id, {
        body,
        coverImageUrl,
        deck,
        section: 'Community',
        status,
        tags: tags
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean),
        title,
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
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <section className="mb-8 space-y-4">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-coral">
            Contributor studio
          </p>
          <h1 className="font-display text-4xl font-black tracking-[-0.05em] text-white sm:text-5xl">
            Draft and publish a free article.
          </h1>
          <p className="max-w-3xl text-sm leading-7 text-white/64 sm:text-base">
            Start with a sharp deck, use clear section naming, and keep the body in clean
            paragraphs. The current flow is intentionally simple so it stays easy to connect to a
            richer editor later.
          </p>
        </section>

        {!isConfigured ? (
          <SupabaseNotice />
        ) : (
          <form
            onSubmit={handleSubmit}
            className="grid gap-6 rounded-[2rem] border border-white/10 bg-black/20 p-6 shadow-2xl shadow-black/20 sm:p-8"
          >
            <label className="block">
              <span className="mb-2 block text-sm text-white/72">Title</span>
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                required
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-coral/60"
                placeholder="Write a strong editorial headline"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm text-white/72">Deck</span>
              <textarea
                value={deck}
                onChange={(event) => setDeck(event.target.value)}
                required
                rows={3}
                className="w-full rounded-[1.5rem] border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-coral/60"
                placeholder="One concise paragraph that explains why the piece matters."
              />
            </label>

            <div className="grid gap-6 lg:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm text-white/72">Tags</span>
                <input
                  value={tags}
                  onChange={(event) => setTags(event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-coral/60"
                  placeholder="AI ops, annotation, product"
                />
              </label>

              <div className="rounded-[1.5rem] border border-white/10 bg-white/4 p-4">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <span className="text-sm text-white/72">Cover image</span>
                  <span className="text-xs uppercase tracking-[0.22em] text-white/38">Community</span>
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
                        className="h-36 w-full rounded-[1rem] object-cover"
                      />
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-white">
                          {coverImageFile?.name || 'Selected image'}
                        </p>
                        <p className="text-xs text-white/50">
                          Drop another image or click to replace it.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-sm font-medium text-white">Drop an image here</p>
                      <p className="text-sm leading-6 text-white/56">
                        JPG, PNG, or WebP. The file will upload to Supabase Storage when you save
                        the article.
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
              </div>
            </div>

            <label className="block">
              <span className="mb-2 block text-sm text-white/72">Body</span>
              <textarea
                value={body}
                onChange={(event) => setBody(event.target.value)}
                required
                rows={16}
                className="w-full rounded-[1.5rem] border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-coral/60"
                placeholder="Write in plain paragraphs. Separate sections with blank lines for now."
              />
            </label>

            <div className="flex flex-col gap-4 rounded-[1.5rem] border border-white/10 bg-white/4 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-2">
                <p className="text-sm text-white">Publishing mode</p>
                <div className="flex gap-2">
                  {(['draft', 'published'] as const).map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setStatus(option)}
                      className={`rounded-full px-4 py-2 text-sm transition ${
                        status === option
                          ? 'bg-coral text-white'
                          : 'border border-white/10 text-white/62 hover:bg-white/6 hover:text-white'
                      }`}
                    >
                      {option === 'draft' ? 'Save draft' : 'Publish now'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/my-articles"
                  className="rounded-full border border-white/10 px-5 py-3 text-center text-sm text-white/72 transition hover:bg-white/6 hover:text-white"
                >
                  View my articles
                </Link>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-full bg-coral px-5 py-3 text-sm font-medium text-white transition hover:bg-[#ff8c72] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? 'Saving...' : status === 'draft' ? 'Save draft' : 'Publish article'}
                </button>
              </div>
            </div>

            {error ? <p className="text-sm text-coral">{error}</p> : null}
          </form>
        )}
      </main>
      <Footer />
    </div>
  )
}
