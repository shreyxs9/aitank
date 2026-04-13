import { useState } from 'react'

export function IssueSignupSection() {
  const [email, setEmail] = useState('')
  const [hasSubmitted, setHasSubmitted] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setHasSubmitted(true)
  }

  return (
    <section className="relative overflow-hidden border-t border-white/10">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(53,41,86,0.55),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_50%_110%,rgba(255,122,92,0.12),transparent)]" />

      <div className="relative mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        {/* Eyebrow */}
        <p className="mb-5 text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-lavender">
          Monthly reminders
        </p>

        {/* Heading */}
        <h2 className="mb-4 font-display text-3xl font-extrabold leading-tight tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl">
          Get a note when the next issue drops.
        </h2>

        {/* Sub */}
        <p className="mx-auto mb-10 max-w-xl text-base leading-7 text-white/58">
          Monthly. No noise. Just a single email when a new issue of The Loop is live.
        </p>

        {/* Form */}
        {hasSubmitted ? (
          <div className="inline-flex items-center gap-3 rounded-full border border-lavender/30 bg-lavender/10 px-6 py-4 text-sm font-medium text-lavender">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8.5l3.5 3.5 6.5-7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            You're on the list. We'll be in touch.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <input
              id="issue-signup-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="your@email.com"
              className="min-w-0 flex-1 rounded-full border border-white/12 bg-white/6 px-5 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-coral/50 focus:bg-white/10"
            />
            <button
              type="submit"
              className="rounded-full bg-coral px-6 py-3 text-sm font-semibold text-white transition hover:bg-coral/88 active:scale-95"
            >
              Notify me
            </button>
          </form>
        )}

        <p className="mt-5 text-xs text-white/32">
          No spam. Unsubscribe any time.
        </p>
      </div>
    </section>
  )
}
