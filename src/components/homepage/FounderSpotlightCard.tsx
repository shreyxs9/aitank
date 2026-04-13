import type { Founder } from '../../types/content'
import { TagPill } from '../shared/TagPill'

interface FounderSpotlightCardProps {
  founder: Founder
}

export function FounderSpotlightCard({ founder }: FounderSpotlightCardProps) {
  return (
    <article className="flex h-full flex-col rounded-[1.75rem] border border-lavender/18 bg-white/5 p-4 transition duration-200 hover:-translate-y-1 hover:border-lavender/35 hover:bg-white/8 sm:p-5">
      <div className="mb-5 flex items-start gap-3 sm:gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/8 text-lg font-semibold text-lavender sm:h-14 sm:w-14 sm:text-xl">
          {founder.startup.charAt(0)}
        </div>
        <div className="min-w-0 space-y-1">
          <h3 className="font-display text-xl font-bold tracking-[-0.04em] text-white sm:text-2xl">{founder.startup}</h3>
          <p className="text-sm text-lavender">
            {founder.founder}, {founder.role}
          </p>
        </div>
      </div>
      <p className="mb-5 text-base leading-7 text-white/78">"{founder.quote}"</p>
      <p className="mb-5 text-sm leading-6 text-white/62">{founder.summary}</p>
      <div className="mb-6 flex flex-wrap gap-2">
        <TagPill emphasis="lavender">{founder.focus}</TagPill>
        <TagPill>{founder.stage}</TagPill>
        <TagPill>{founder.location}</TagPill>
      </div>
      <button
        type="button"
        className="mt-auto w-full rounded-full border border-coral/25 bg-coral/10 px-4 py-2 text-sm font-medium text-coral transition hover:bg-coral hover:text-white sm:w-fit"
      >
        {founder.cta}
      </button>
    </article>
  )
}
