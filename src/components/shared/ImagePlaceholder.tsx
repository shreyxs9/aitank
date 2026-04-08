interface ImagePlaceholderProps {
  label: string
  aspectClassName?: string
  accent?: 'coral' | 'lavender'
}

export function ImagePlaceholder({
  label,
  aspectClassName = 'aspect-[4/3]',
  accent = 'coral',
}: ImagePlaceholderProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[radial-gradient(circle_at_top,var(--overlay-color),transparent_45%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] ${aspectClassName} ${
        accent === 'coral' ? '[--overlay-color:rgba(255,122,92,0.22)]' : '[--overlay-color:rgba(163,136,238,0.22)]'
      }`}
    >
      <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:2.75rem_2.75rem]" />
      <div className="relative flex h-full items-end p-5">
        <p className="max-w-44 text-sm leading-6 text-white/75">{label}</p>
      </div>
    </div>
  )
}
