import type { PullQuoteData } from '../../types/content'

interface PullQuoteProps {
  pullQuote: PullQuoteData
}

export function PullQuote({ pullQuote }: PullQuoteProps) {
  return (
    <figure className="my-10 rounded-[1.75rem] border border-coral/14 bg-coral/6 p-5 sm:p-6">
      <blockquote className="editorial-heading font-display text-2xl font-bold leading-tight text-white sm:text-3xl">
        "{pullQuote.quote}"
      </blockquote>
      {pullQuote.attribution ? (
        <figcaption className="mt-4 text-sm text-white/58">{pullQuote.attribution}</figcaption>
      ) : null}
    </figure>
  )
}
