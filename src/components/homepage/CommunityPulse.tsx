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
            <h2 className="font-display text-4xl tracking-[-0.05em] text-white sm:text-5xl">
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
      </div>
    </section>
  )
}
