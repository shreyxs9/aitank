import type { SectionTone } from '../../types/content'

interface SectionLabelProps {
  index: string
  label: string
  tone?: SectionTone
}

const toneClasses: Record<SectionTone, string> = {
  coral: 'text-coral',
  lavender: 'text-lavender',
  white: 'text-white/70',
}

export function SectionLabel({ index, label, tone = 'coral' }: SectionLabelProps) {
  return (
    <p className={`text-[0.68rem] font-semibold uppercase tracking-[0.28em] ${toneClasses[tone]}`}>
      {index} . {label}
    </p>
  )
}
