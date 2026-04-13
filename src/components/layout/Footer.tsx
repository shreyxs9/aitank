import { Link } from 'react-router-dom'
import { IssueSignupSection } from './IssueSignupSection'

export function Footer() {
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
    </>
  )
}
