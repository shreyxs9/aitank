type PasswordVisibilityToggleProps = {
  isVisible: boolean
  label: string
  onToggle: () => void
}

export function PasswordVisibilityToggle({
  isVisible,
  label,
  onToggle,
}: PasswordVisibilityToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-white/10 text-white/58 transition hover:border-coral/50 hover:bg-white/6 hover:text-coral focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral/70"
      aria-label={label}
      aria-pressed={isVisible}
    >
      {isVisible ? (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-4.5 w-4.5"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        >
          <path d="M3 3l18 18" />
          <path d="M10.58 10.58a2 2 0 0 0 2.83 2.83" />
          <path d="M9.88 4.24A10.7 10.7 0 0 1 12 4c5 0 8.5 4 10 8a12.5 12.5 0 0 1-3.12 4.68" />
          <path d="M6.61 6.61A12.2 12.2 0 0 0 2 12c1.5 4 5 8 10 8a10.8 10.8 0 0 0 5.39-1.45" />
        </svg>
      ) : (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-4.5 w-4.5"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        >
          <path d="M2 12s3.5-8 10-8 10 8 10 8-3.5 8-10 8-10-8-10-8Z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      )}
    </button>
  )
}
