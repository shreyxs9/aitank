import { useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { Footer } from '../components/layout/Footer'
import { Header } from '../components/layout/Header'
import { SupabaseNotice } from '../components/shared/SupabaseNotice'
import { supabase } from '../lib/supabase'
import {
  HARDCODED_ADMIN_USERNAME,
  isHardcodedAdminSession,
  signInHardcodedAdmin,
} from '../lib/adminAuth'
import { validateAdminUsername, validatePassword } from '../lib/validation'

export function AdminLoginPage() {
  const location = useLocation()
  const from = typeof location.state?.from === 'string' ? location.state.from : '/admin'
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (isHardcodedAdminSession()) {
    return <Navigate to={from} replace />
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setError(null)
    setIsSubmitting(true)

    const normalizedUsername = username.trim().toLowerCase()
    const validationError =
      validateAdminUsername(normalizedUsername) || validatePassword(password, 8)

    if (validationError) {
      setError(validationError)
      setIsSubmitting(false)
      return
    }

    const isValid = signInHardcodedAdmin(normalizedUsername, password)

    if (isValid) {
      window.location.assign(from)
      return
    }

    setError('Invalid admin credentials.')
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto grid min-h-[calc(100vh-10rem)] max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr,28rem] lg:items-center lg:px-8">
        <section className="space-y-5">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-coral">
            Admin review
          </p>
          <h1 className="max-w-3xl font-display text-4xl font-black tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl">
            Review contributor submissions before they reach readers.
          </h1>
          <p className="max-w-2xl text-sm leading-7 text-white/62 sm:text-base">
            Admins can approve pending articles, reject work that needs revision, and keep the
            public issue limited to approved posts.
          </p>
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-2xl shadow-black/25 sm:p-7">
          <div className="mb-6">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-white/38">
              Admin login
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-white">
              Sign in
            </h2>
          </div>

          {!supabase ? (
            <SupabaseNotice />
          ) : (
            <form className="space-y-5" onSubmit={handleSubmit}>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-white/72">Admin ID</span>
                <input
                  id="admin-username"
                  name="adminUsername"
                  value={username}
                  onChange={(event) => {
                    setUsername(event.target.value)
                    setError(null)
                  }}
                  autoComplete="username"
                  maxLength={80}
                  required
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white outline-none transition placeholder:text-white/28 focus:border-coral/60"
                  placeholder={HARDCODED_ADMIN_USERNAME}
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-white/72">Password</span>
                <input
                  id="admin-password"
                  name="adminPassword"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value)
                    setError(null)
                  }}
                  type="password"
                  autoComplete="current-password"
                  minLength={8}
                  maxLength={128}
                  required
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white outline-none transition placeholder:text-white/28 focus:border-coral/60"
                  placeholder="Admin password"
                />
              </label>

              {error ? (
                <p className="rounded-2xl border border-coral/20 bg-coral/10 px-4 py-3 text-sm text-coral">
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full bg-coral px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#ff8c72] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? 'Checking...' : 'Open review desk'}
              </button>
            </form>
          )}
        </section>
      </main>
      <Footer />
    </div>
  )
}
