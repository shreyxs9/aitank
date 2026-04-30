interface MetaRowProps {
  author: string
  authorAvatarUrl?: string
  role?: string
  publishedAt?: string
  readTime: string
}

export function MetaRow({ author, authorAvatarUrl, role, publishedAt, readTime }: MetaRowProps) {
  return (
    <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-2 text-sm text-white/62">
      {authorAvatarUrl ? (
        <img
          src={authorAvatarUrl}
          alt={author}
          className="h-8 w-8 shrink-0 rounded-full border border-white/10 object-cover"
        />
      ) : null}
      <span className="max-w-full break-words font-medium text-white/82">{author}</span>
      {role ? <span className="h-1 w-1 rounded-full bg-white/25" /> : null}
      {role ? <span className="max-w-full break-words">{role}</span> : null}
      {publishedAt ? <span className="h-1 w-1 rounded-full bg-white/25" /> : null}
      {publishedAt ? <time dateTime={publishedAt}>{publishedAt}</time> : null}
      <span className="h-1 w-1 rounded-full bg-white/25" />
      <span>{readTime}</span>
    </div>
  )
}
