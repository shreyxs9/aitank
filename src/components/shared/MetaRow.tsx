interface MetaRowProps {
  author: string
  role?: string
  publishedAt?: string
  readTime: string
}

export function MetaRow({ author, role, publishedAt, readTime }: MetaRowProps) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-white/62">
      <span className="font-medium text-white/82">{author}</span>
      {role ? <span className="h-1 w-1 rounded-full bg-white/25" /> : null}
      {role ? <span>{role}</span> : null}
      {publishedAt ? <span className="h-1 w-1 rounded-full bg-white/25" /> : null}
      {publishedAt ? <time dateTime={publishedAt}>{publishedAt}</time> : null}
      <span className="h-1 w-1 rounded-full bg-white/25" />
      <span>{readTime}</span>
    </div>
  )
}
