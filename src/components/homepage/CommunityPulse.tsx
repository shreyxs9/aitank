import type { CommunityPulseItem } from '../../types/content'

interface CommunityPulseProps {
  title: string
  description: string
  items: CommunityPulseItem[]
}

export function CommunityPulse({ title, description, items }: CommunityPulseProps) {
  return (
    <section id="community" className="border-t border-white/10 bg-black/20">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-lavender">
              {title}
            </p>
            <h2 className="editorial-heading font-display text-3xl font-extrabold leading-tight text-white sm:text-5xl">
              Join the conversations happening around the issue.
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-6 text-white/62">{description}</p>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.id}
              className="rounded-[1.75rem] border border-white/10 bg-white/4 p-5"
            >
              <p className="mb-3 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-coral">
                {item.title}
              </p>
              <p className="text-sm leading-6 text-white/72">{item.detail}</p>
            </article>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <a
            href="https://aitank.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-lavender/40 bg-lavender/10 px-6 py-3 text-sm font-semibold text-lavender transition hover:bg-lavender/20 sm:w-auto"
          >
            Explore our AI Community
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2.5 7h9M7.5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
