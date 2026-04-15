import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../../assets/aitank-logo-light.png'

const navItems = [
  { label: 'Home', to: '/' }
  // { label: 'Components', to: '/components' },
]

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
