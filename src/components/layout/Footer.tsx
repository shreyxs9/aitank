import { useState } from 'react'
import type { MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'
import { IssueSignupSection } from './IssueSignupSection'

export function Footer() {
  const { user } = useAuth()
  const [showAuthNotice, setShowAuthNotice] = useState(false)

  function handleWriteArticleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (user) {
      return
    }

    event.preventDefault()
    setShowAuthNotice(true)
  }

  return (
    <>
      <IssueSignupSection />
      <footer className="border-t border-white/10 bg-black/20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.4fr,1fr] lg:px-8 lg:py-12">
          <div className="space-y-4">
            <p className="font-display text-2xl font-black tracking-[-0.04em] text-white sm:text-3xl">The Loop</p>
            <p className="max-w-xl text-sm leading-6 text-white/62">
              A free editorial front page for the people building, reviewing, and living
              with applied AI. Open access, sharper context.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-3">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-white/45">
                Explore
              </p>
              <Link to="/" className="block text-sm text-white/72 transition hover:text-white">
                Current issue
              </Link>
              <Link
                to="/write"
                onClick={handleWriteArticleClick}
                className="block text-sm text-white/72 transition hover:text-white"
              >
                Write article
              </Link>
              <Link
                to="/my-articles"
                className="block text-sm text-white/72 transition hover:text-white"
              >
                My articles
              </Link>
            </div>
            <div className="space-y-3">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-white/45">
                Connect
              </p>
              <a
                href="https://aitank.ai"
                target="_blank"
                rel="noreferrer"
                className="block text-sm text-white/72 transition hover:text-white"
              >
                Visit AI Tank website
              </a>
            </div>
          </div>
        </div>
      </footer>
      {showAuthNotice ? (
        <div
          aria-live="polite"
          className="fixed bottom-5 left-4 right-4 z-[60] mx-auto max-w-md rounded-2xl border border-coral/25 bg-ink/95 p-4 text-white shadow-[0_24px_70px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:left-auto sm:right-6 sm:mx-0"
          role="status"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-white">Login or create an account</p>
              <p className="mt-1 text-sm leading-6 text-white/62">
                You need a contributor account before writing an article.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowAuthNotice(false)}
              className="rounded-full border border-white/10 px-2.5 py-1 text-sm text-white/58 transition hover:bg-white/6 hover:text-white"
              aria-label="Dismiss notification"
            >
              x
            </button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              to="/login"
              onClick={() => setShowAuthNotice(false)}
              className="rounded-full bg-coral px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#ff8c72]"
            >
              Login
            </Link>
            <Link
              to="/login?mode=signup"
              onClick={() => setShowAuthNotice(false)}
              className="rounded-full border border-white/12 px-4 py-2 text-sm font-semibold text-white/72 transition hover:border-coral/40 hover:text-coral"
            >
              Sign up
            </Link>
          </div>
        </div>
      ) : null}
    </>
  )
}
