import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../components/auth/useAuth'
import { Footer } from '../components/layout/Footer'
import { Header } from '../components/layout/Header'
import { SupabaseNotice } from '../components/shared/SupabaseNotice'
import { supabase } from '../lib/supabase'
import { validatePassword } from '../lib/validation'

export function ResetPasswordPage() {
  const { isConfigured, isLoading, user } = useAuth()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!supabase) {
      return
    }

    setIsSubmitting(true)
    setError(null)
    setMessage(null)

    try {
      const validationError = validatePassword(password)

      if (validationError) {
        setError(validationError)
        return
      }

      if (password !== confirmPassword) {
        setError('Passwords do not match.')
        return
      }

      const { error: updateError } = await supabase.auth.updateUser({ password })

      if (updateError) {
        throw updateError
      }

      setPassword('')
      setConfirmPassword('')
      setMessage('Password updated. You can continue to your contributor workspace.')
    } catch (caughtError) {
      const nextError =
        caughtError instanceof Error ? caughtError.message : 'Could not update your password.'
      setError(nextError)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto grid min-h-[calc(100vh-10rem)] max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr,28rem] lg:items-center lg:px-8">
        <section className="space-y-5">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-coral">
            Account recovery
          </p>
          <h1 className="max-w-3xl font-display text-4xl font-black tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl">
            Set a new password for your contributor account.
          </h1>
          <p className="max-w-2xl text-sm leading-7 text-white/62 sm:text-base">
            Use the recovery link from your email to choose a new password and return to your
            author workspace.
          </p>
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-2xl shadow-black/25 sm:p-7">
          <div className="mb-6">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-white/38">
              Password reset
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-white">
              New password
            </h2>
          </div>

          {!isConfigured ? (
            <SupabaseNotice />
          ) : !isLoading && !user ? (
            <div className="space-y-4 rounded-2xl border border-coral/20 bg-coral/10 px-4 py-4 text-sm text-coral">
              <p>Open the latest password recovery link from your email to reset your password.</p>
              <Link to="/login" className="inline-flex font-semibold text-white hover:text-coral">
                Return to login
              </Link>
            </div>
          ) : (
            <form className="space-y-5" onSubmit={handleSubmit}>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-white/72">
                  New password
                </span>
                <div className="relative">
                  <input
                    id="new-password"
                    name="newPassword"
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value)
                      setError(null)
                    }}
                    type={isPasswordVisible ? 'text' : 'password'}
                    autoComplete="new-password"
                    minLength={6}
                    maxLength={128}
                    required
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 pr-20 text-white outline-none transition placeholder:text-white/28 focus:border-coral/60"
                    placeholder="Minimum 6 characters"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setIsPasswordVisible((currentValue) => !currentValue)
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/10 px-3 py-1.5 text-xs font-semibold text-white/58 transition hover:border-coral/50 hover:text-coral"
                    aria-label={isPasswordVisible ? 'Hide new password' : 'Show new password'}
                  >
                    {isPasswordVisible ? 'Hide' : 'Show'}
                  </button>
                </div>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-white/72">
                  Confirm password
                </span>
                <div className="relative">
                  <input
                    id="confirm-password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(event) => {
                      setConfirmPassword(event.target.value)
                      setError(null)
                    }}
                    type={isConfirmPasswordVisible ? 'text' : 'password'}
                    autoComplete="new-password"
                    minLength={6}
                    maxLength={128}
                    required
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 pr-20 text-white outline-none transition placeholder:text-white/28 focus:border-coral/60"
                    placeholder="Repeat your new password"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setIsConfirmPasswordVisible((currentValue) => !currentValue)
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/10 px-3 py-1.5 text-xs font-semibold text-white/58 transition hover:border-coral/50 hover:text-coral"
                    aria-label={
                      isConfirmPasswordVisible
                        ? 'Hide confirmed password'
                        : 'Show confirmed password'
                    }
                  >
                    {isConfirmPasswordVisible ? 'Hide' : 'Show'}
                  </button>
                </div>
              </label>

              {error ? (
                <p className="rounded-2xl border border-coral/20 bg-coral/10 px-4 py-3 text-sm text-coral">
                  {error}
                </p>
              ) : null}
              {message ? (
                <p className="rounded-2xl border border-[#7BFFB2]/20 bg-[#7BFFB2]/10 px-4 py-3 text-sm text-[#7BFFB2]">
                  {message}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={isSubmitting || isLoading}
                className="w-full rounded-full bg-coral px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#ff8c72] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? 'Updating...' : 'Update password'}
              </button>

              {message ? (
                <Link
                  to="/write"
                  className="inline-flex w-full justify-center rounded-full border border-white/12 px-5 py-3 text-sm font-semibold text-white transition hover:border-coral/50 hover:text-coral"
                >
                  Continue to workspace
                </Link>
              ) : null}
            </form>
          )}
        </section>
      </main>
      <Footer />
    </div>
  )
}
