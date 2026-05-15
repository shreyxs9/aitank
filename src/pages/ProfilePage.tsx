import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../components/auth/useAuth'
import { Footer } from '../components/layout/Footer'
import { Header } from '../components/layout/Header'
import { SupabaseNotice } from '../components/shared/SupabaseNotice'
import { fetchMyArticles, updateProfileDetails } from '../lib/communityArticles'
import { supabase } from '../lib/supabase'
import {
  normalizeWhitespace,
  validateDesignation,
  validateDisplayName,
  validateUsername,
} from '../lib/validation'
import type { CommunityArticle } from '../types/communityArticles'

function formatDate(date: string | undefined) {
  if (!date) {
    return 'Not available'
  }

  return new Intl.DateTimeFormat(undefined, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date))
}

export function ProfilePage() {
  const { isConfigured, profile, refreshProfile, user } = useAuth()
  const [articles, setArticles] = useState<CommunityArticle[]>([])
  const [displayName, setDisplayName] = useState('')
  const [username, setUsername] = useState('')
  const [designation, setDesignation] = useState('')
  const [isLoadingArticles, setIsLoadingArticles] = useState(true)
  const [isSavingProfile, setIsSavingProfile] = useState(false)
  const [activityError, setActivityError] = useState<string | null>(null)
  const [profileError, setProfileError] = useState<string | null>(null)
  const [profileMessage, setProfileMessage] = useState<string | null>(null)

  const articleStats = useMemo(
    () => ({
      drafts: articles.filter((article) => article.status === 'draft').length,
      inReview: articles.filter((article) => article.status === 'pending_review').length,
      published: articles.filter((article) => article.status === 'published').length,
      total: articles.length,
    }),
    [articles],
  )

  useEffect(() => {
    let cancelled = false

    async function loadProfileData() {
      if (!user) {
        setArticles([])
        setIsLoadingArticles(false)
        return
      }

      try {
        await refreshProfile()
        const nextArticles = await fetchMyArticles(user.id)

        if (!cancelled) {
          setArticles(nextArticles)
        }
      } catch (caughtError) {
        if (!cancelled) {
          const nextError =
            caughtError instanceof Error ? caughtError.message : 'Failed to load profile details.'
          setActivityError(nextError)
        }
      } finally {
        if (!cancelled) {
          setIsLoadingArticles(false)
        }
      }
    }

    void loadProfileData()

    return () => {
      cancelled = true
    }
  }, [refreshProfile, user])

  useEffect(() => {
    setDisplayName(profile?.displayName ?? '')
    setUsername(profile?.username ?? '')
    setDesignation(profile?.designation ?? '')
  }, [profile?.designation, profile?.displayName, profile?.username])

  async function handleSaveProfile(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!user || !supabase) {
      return
    }

    const normalizedDisplayName = normalizeWhitespace(displayName)
    const normalizedUsername = username.trim().toLowerCase()
    const normalizedDesignation = normalizeWhitespace(designation)
    const validationError =
      validateDisplayName(normalizedDisplayName) ||
      validateUsername(normalizedUsername) ||
      validateDesignation(normalizedDesignation)

    if (validationError) {
      setProfileError(validationError)
      setProfileMessage(null)
      return
    }

    setIsSavingProfile(true)
    setProfileError(null)
    setProfileMessage(null)

    try {
      await updateProfileDetails(user.id, {
        designation: normalizedDesignation || null,
        displayName: normalizedDisplayName || null,
        username: normalizedUsername || null,
      })

      const { error: metadataError } = await supabase.auth.updateUser({
        data: {
          designation: normalizedDesignation || null,
          display_name: normalizedDisplayName || null,
          user_name: normalizedUsername || null,
        },
      })

      if (metadataError) {
        throw metadataError
      }

      await refreshProfile()
      setProfileMessage('Profile details updated.')
    } catch (caughtError) {
      const nextError =
        caughtError instanceof Error ? caughtError.message : 'Failed to update profile details.'
      setProfileError(nextError)
    } finally {
      setIsSavingProfile(false)
    }
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <section className="mb-8 grid gap-6 lg:grid-cols-[1fr,24rem] lg:items-end">
          <div className="space-y-4">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-coral">
              Contributor profile
            </p>
            <h1 className="max-w-4xl font-display text-4xl font-black tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl">
              Account details, byline, and publishing activity.
            </h1>
            <p className="max-w-3xl text-sm leading-7 text-white/62 sm:text-base">
              Review the information attached to your author account and jump back into your
              writing workspace.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Link
              to="/write"
              className="rounded-full border border-coral/25 bg-coral px-5 py-3 text-sm font-medium text-white transition hover:bg-[#ff8c72]"
            >
              Write new article
            </Link>
            <Link
              to="/my-articles"
              className="rounded-full border border-white/10 px-5 py-3 text-sm text-white/72 transition hover:bg-white/6 hover:text-white"
            >
              My Articles
            </Link>
          </div>
        </section>

        {!isConfigured ? (
          <SupabaseNotice />
        ) : (
          <div className="grid gap-6 lg:grid-cols-[26rem,1fr]">
            <section className="rounded-[1.75rem] border border-white/10 bg-white/4 p-6">
              <div className="flex items-center gap-5">
                <div className="grid h-24 w-24 shrink-0 place-items-center overflow-hidden rounded-full border border-white/10 bg-black/30 text-xs font-semibold uppercase tracking-[0.18em] text-white/38">
                  {profile?.avatarUrl ? (
                    <img src={profile.avatarUrl} alt="" className="h-full w-full object-cover" />
                  ) : (
                    'PFP'
                  )}
                </div>
                <div className="min-w-0">
                  <h2 className="truncate text-2xl font-black tracking-[-0.04em] text-white">
                    {profile?.displayName || user?.email || 'Contributor'}
                  </h2>
                  <p className="mt-2 truncate text-sm text-white/54">
                    {profile?.designation || 'No designation added'}
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-3">
                <Link
                  to="/my-articles"
                  className="rounded-full border border-coral/25 bg-coral/10 px-4 py-2 text-center text-sm text-coral transition hover:bg-coral hover:text-white"
                >
                  Manage profile picture
                </Link>
              </div>
            </section>

            <section className="rounded-[1.75rem] border border-white/10 bg-white/4 p-6">
              <h2 className="text-xl font-bold tracking-[-0.03em] text-white">
                Account information
              </h2>

              <form className="mt-5 grid gap-4" onSubmit={handleSaveProfile}>
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-white/72">
                    Display name
                  </span>
                  <input
                    id="profile-display-name"
                    name="displayName"
                    value={displayName}
                    onChange={(event) => {
                      setDisplayName(event.target.value)
                      setProfileError(null)
                      setProfileMessage(null)
                    }}
                    autoComplete="name"
                    maxLength={60}
                    className="w-full rounded-2xl border border-white/10 bg-black/16 px-4 py-3.5 text-white outline-none transition placeholder:text-white/28 focus:border-coral/60 focus:bg-white/[0.07]"
                    placeholder="Your byline"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-white/72">Username</span>
                  <input
                    id="profile-username"
                    name="username"
                    value={username}
                    onChange={(event) => {
                      setUsername(event.target.value)
                      setProfileError(null)
                      setProfileMessage(null)
                    }}
                    autoComplete="username"
                    maxLength={30}
                    className="w-full rounded-2xl border border-white/10 bg-black/16 px-4 py-3.5 text-white outline-none transition placeholder:text-white/28 focus:border-coral/60 focus:bg-white/[0.07]"
                    placeholder="your-username"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-white/72">
                    Designation
                  </span>
                  <input
                    id="profile-designation"
                    name="designation"
                    value={designation}
                    onChange={(event) => {
                      setDesignation(event.target.value)
                      setProfileError(null)
                      setProfileMessage(null)
                    }}
                    autoComplete="organization-title"
                    maxLength={90}
                    className="w-full rounded-2xl border border-white/10 bg-black/16 px-4 py-3.5 text-white outline-none transition placeholder:text-white/28 focus:border-coral/60 focus:bg-white/[0.07]"
                    placeholder="Founder, AI researcher, product lead"
                  />
                </label>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="submit"
                    disabled={isSavingProfile}
                    className="rounded-full border border-coral/25 bg-coral px-5 py-3 text-sm font-medium text-white transition hover:bg-[#ff8c72] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSavingProfile ? 'Saving...' : 'Save profile'}
                  </button>
                  {profileMessage ? (
                    <p className="text-sm text-[#7BFFB2]">{profileMessage}</p>
                  ) : null}
                </div>
                {profileError ? (
                  <p className="rounded-2xl border border-coral/20 bg-coral/10 px-4 py-3 text-sm text-coral">
                    {profileError}
                  </p>
                ) : null}
              </form>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  ['Email', user?.email || 'Not available'],
                  ['Account created', formatDate(user?.created_at)],
                  ['User ID', user?.id || 'Not available'],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="min-w-0 rounded-[1.25rem] border border-white/10 bg-black/16 p-4"
                  >
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-white/38">
                      {label}
                    </p>
                    <p className="mt-2 truncate text-sm text-white/72">{value}</p>
                  </div>
                ))}
              </div>

              {profile?.bio ? (
                <div className="mt-4 rounded-[1.25rem] border border-white/10 bg-black/16 p-4">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-white/38">
                    Bio
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white/72">{profile.bio}</p>
                </div>
              ) : null}
            </section>

            <section className="rounded-[1.75rem] border border-white/10 bg-white/4 p-6 lg:col-span-2">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-xl font-bold tracking-[-0.03em] text-white">
                  Publishing activity
                </h2>
                {activityError ? <p className="text-sm text-coral">{activityError}</p> : null}
              </div>

              {isLoadingArticles ? (
                <p className="text-sm text-white/54">Loading publishing activity...</p>
              ) : (
                <div className="grid gap-3 sm:grid-cols-4">
                  {[
                    ['Total', articleStats.total],
                    ['Drafts', articleStats.drafts],
                    ['In review', articleStats.inReview],
                    ['Published', articleStats.published],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-[1.25rem] border border-white/10 bg-black/16 p-4 text-center"
                    >
                      <p className="text-3xl font-black tracking-[-0.04em] text-white">{value}</p>
                      <p className="mt-1 text-[0.68rem] uppercase tracking-[0.18em] text-white/38">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
