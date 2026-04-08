import type { Founder } from '../../types/content'
import { TagPill } from '../shared/TagPill'

interface FounderSpotlightCardProps {
  founder: Founder
}

export function FounderSpotlightCard({ founder }: FounderSpotlightCardProps) {
  return (
    <article className="flex h-full flex-col rounded-[1.75rem] border border-lavender/18 bg-white/5 p-5 transition duration-200 hover:-translate-y-1 hover:border-lavender/35 hover:bg-white/8">
      <div className="mb-5 flex items-start gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/8 text-xl font-semibold text-lavender">
          {founder.startup.charAt(0)}
        </div>
        <div className="space-y-1">
          <h3 className="font-display text-2xl tracking-[-0.04em] text-white">{founder.startup}</h3>
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
        className="mt-auto w-fit rounded-full border border-coral/25 bg-coral/10 px-4 py-2 text-sm font-medium text-coral transition hover:bg-coral hover:text-white"
      >
        {founder.cta}
      </button>
    </article>
  )
}
