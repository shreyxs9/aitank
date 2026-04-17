import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../../assets/aitank-logo-light.png'

const navItems = [
  { label: 'Home', to: '/' }
  // { label: 'Components', to: '/components' },
]

function WhatsAppIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4 shrink-0"
      fill="currentColor"
    >
      <path d="M19.05 4.93A9.9 9.9 0 0 0 12.03 2C6.56 2 2.11 6.45 2.1 11.92c0 1.75.46 3.46 1.32 4.97L2 22l5.26-1.38a9.86 9.86 0 0 0 4.73 1.2h.01c5.47 0 9.92-4.45 9.92-9.92a9.84 9.84 0 0 0-2.87-6.97Zm-7.04 15.22h-.01a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.12.82.83-3.04-.2-.31a8.23 8.23 0 0 1-1.27-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.85 5.83 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.55-3.7 8.24-8.24 8.24Zm4.52-6.16c-.25-.13-1.47-.73-1.7-.81-.23-.09-.39-.13-.56.12-.17.25-.65.81-.8.97-.15.17-.29.19-.54.07-.25-.13-1.05-.39-2-1.25-.74-.66-1.24-1.48-1.39-1.73-.15-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.13-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.08 0 1.23.89 2.42 1.02 2.58.12.17 1.75 2.67 4.23 3.75.59.25 1.06.4 1.42.51.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.17-.48-.29Z" />
    </svg>
  )
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
        <Link to="/" className="flex min-w-0 items-center gap-3 text-white">
          <img
            src={logo}
            alt="AI Tank logo"
            className="h-11 w-auto shrink-0 sm:h-12"
          />
          <div className="min-w-0">
            <p className="truncate font-display text-lg font-black tracking-[-0.04em] sm:text-xl">
              The Loop
            </p>
            <p className="truncate text-[0.6rem] uppercase tracking-[0.28em] text-white/45 sm:text-[0.68rem] sm:tracking-[0.34em]">
              AI Tank Magazine
            </p>
          </div>
        </Link>

        <button
          type="button"
          className="shrink-0 rounded-full border border-white/10 px-4 py-2 text-sm text-white/75 md:hidden"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          Menu
        </button>

        <nav
          className={`${isOpen ? 'flex' : 'hidden'} absolute inset-x-4 top-full mt-3 flex-col gap-3 rounded-[1.5rem] border border-white/10 bg-ink/95 p-4 shadow-2xl shadow-black/30 md:static md:mt-0 md:flex md:flex-row md:items-center md:border-0 md:bg-transparent md:p-0 md:shadow-none`}
        >
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm transition ${
                  isActive
                    ? 'bg-white/10 text-white'
                    : 'text-white/62 hover:bg-white/6 hover:text-white'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <a
            href="https://chat.whatsapp.com/H76HPaLrz478jOwepDCkYj"
            target="_blank"
            rel="noreferrer"
            onClick={() => setIsOpen(false)}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#25D366]/25 bg-[#25D366]/12 px-4 py-2 text-center text-sm text-[#7BFFB2] transition hover:bg-[#25D366] hover:text-ink"
          >
            <WhatsAppIcon />
            <span>Join our Community</span>
          </a>
          <a
            href="https://aitank.ai"
            target="_blank"
            rel="noreferrer"
            onClick={() => setIsOpen(false)}
            className="rounded-full border border-coral/25 bg-coral/10 px-4 py-2 text-center text-sm text-coral transition hover:bg-coral hover:text-white"
          >
            Visit AI Tank website
          </a>
        </nav>
      </div>
    </header>
  )
}
