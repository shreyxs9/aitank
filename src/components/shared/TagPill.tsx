interface TagPillProps {
  children: string
  emphasis?: 'soft' | 'coral' | 'lavender'
}

const emphasisClasses = {
  soft: 'border-white/12 bg-white/6 text-white/70',
  coral: 'border-coral/25 bg-coral/10 text-coral',
  lavender: 'border-lavender/25 bg-lavender/10 text-lavender',
}

export function TagPill({ children, emphasis = 'soft' }: TagPillProps) {
  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-[0.68rem] font-medium tracking-[0.18em] uppercase ${emphasisClasses[emphasis]}`}
    >
      {children}
    </span>
  )
}
