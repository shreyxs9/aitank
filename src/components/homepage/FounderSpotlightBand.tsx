import type { Founder } from '../../types/content'
import { FounderSpotlightCard } from './FounderSpotlightCard'

interface FounderSpotlightBandProps {
  founders: Founder[]
}

export function FounderSpotlightBand({ founders }: FounderSpotlightBandProps) {
  return (
    <section className="border-y border-white/10 bg-navy/70">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-lavender">
              Founder spotlight
            </p>
            <h2 className="editorial-heading font-display text-3xl font-extrabold leading-tight text-white sm:text-5xl">
              Builders with strong opinions about the human layer.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-white/62">
            Short founder portraits from the teams turning process discipline into product advantage.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {founders.map((founder) => (
            <FounderSpotlightCard key={founder.id} founder={founder} />
          ))}
        </div>
      </div>
    </section>
  )
}
