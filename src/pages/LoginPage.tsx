import { useEffect, useRef, useState } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { Footer } from '../components/layout/Footer'
import { Header } from '../components/layout/Header'
import { SupabaseNotice } from '../components/shared/SupabaseNotice'
import { useAuth } from '../components/auth/useAuth'
import { supabase } from '../lib/supabase'
import {
  EMAIL_MAX_LENGTH,
  normalizeWhitespace,
  validateDesignation,
  validateDisplayName,
  validateEmail,
  validatePassword,
  validateProfileImageFile,
} from '../lib/validation'
import { updateProfileDetails, uploadProfilePicture } from '../lib/communityArticles'

type AuthMode = 'login' | 'signup'

const duplicateEmailMessage = 'Email already exists, please try another email ID'

function getEmailCheckErrorMessage(error: { code?: string; message?: string }) {
  if (error.code === 'PGRST202') {
    return 'Email validation is not available yet. Run the latest Supabase schema and try again.'
  }

  return error.message || 'Could not validate this email address.'
}

export function LoginPage() {
  const location = useLocation()
  const from = typeof location.state?.from === 'string' ? location.state.from : '/write'
  const { isConfigured, user } = useAuth()
  const [mode, setMode] = useState<AuthMode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false)
  const [displayName, setDisplayName] = useState('')
  const [designation, setDesignation] = useState('')
  const [profilePicture, setProfilePicture] = useState<File | null>(null)
  const [profilePicturePreview, setProfilePicturePreview] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isResendingConfirmation, setIsResendingConfirmation] = useState(false)
  const [isSendingPasswordReset, setIsSendingPasswordReset] = useState(false)
  const [pendingConfirmationEmail, setPendingConfirmationEmail] = useState<string | null>(null)
  const profilePictureInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    return () => {
      if (profilePicturePreview) {
        URL.revokeObjectURL(profilePicturePreview)
      }
    }
  }, [profilePicturePreview])

  function setSelectedProfilePicture(file: File | null) {
    if (profilePicturePreview) {
      URL.revokeObjectURL(profilePicturePreview)
    }

    setProfilePicture(file)
    setProfilePicturePreview(file ? URL.createObjectURL(file) : null)
    setError(null)

    if (!file && profilePictureInputRef.current) {
      profilePictureInputRef.current.value = ''
    }
  }

  if (user) {
    return <Navigate to={from} replace />
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!supabase) {
      return
    }

    setIsSubmitting(true)
    setError(null)
    setMessage(null)
    setPendingConfirmationEmail(null)

    try {
      const normalizedEmail = email.trim().toLowerCase()
      const normalizedDisplayName = normalizeWhitespace(displayName)
      const normalizedDesignation = normalizeWhitespace(designation)
      const validationError =
        validateEmail(normalizedEmail) ||
        validatePassword(password) ||
        (mode === 'signup' && password !== confirmPassword ? 'Passwords do not match.' : null) ||
        (mode === 'signup'
          ? validateDisplayName(normalizedDisplayName) ||
            validateDesignation(normalizedDesignation) ||
            (profilePicture ? validateProfileImageFile(profilePicture) : null)
          : null)

      if (validationError) {
        setError(validationError)
        return
      }

      if (mode === 'login') {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: normalizedEmail,
          password,
        })

        if (signInError) {
          throw signInError
        }

        setMessage('Signed in. Redirecting...')
      } else {
        const { data: isEmailRegistered, error: emailCheckError } = await supabase.rpc(
          'email_is_registered',
          {
            email_to_check: normalizedEmail,
          },
        )

        if (emailCheckError) {
          throw new Error(getEmailCheckErrorMessage(emailCheckError))
        }

        if (isEmailRegistered) {
          setError(duplicateEmailMessage)
          return
        }

        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email: normalizedEmail,
          password,
          options: {
            data: {
              designation: normalizedDesignation || null,
              display_name: normalizedDisplayName || normalizedEmail.split('@')[0],
            },
          },
        })

        if (signUpError) {
          throw signUpError
        }

        if (signUpData.user && signUpData.session) {
          let avatarUrl: string | null = null

          if (profilePicture) {
            avatarUrl = await uploadProfilePicture(signUpData.user.id, profilePicture)
          }

          const { error: metadataError } = await supabase.auth.updateUser({
            data: {
              avatar_url: avatarUrl,
              designation: normalizedDesignation || null,
              display_name: normalizedDisplayName || normalizedEmail.split('@')[0],
            },
          })

          if (metadataError) {
            throw metadataError
          }

          await updateProfileDetails(signUpData.user.id, {
            avatarUrl,
            designation: normalizedDesignation || null,
            displayName: normalizedDisplayName || normalizedEmail.split('@')[0],
          })
        }

        if (signUpData.session) {
          setMessage('Account created. Redirecting...')
        } else {
          setPendingConfirmationEmail(normalizedEmail)
          setMessage('Account created. Check your email to confirm your account.')
        }
      }
    } catch (caughtError) {
      const nextError =
        caughtError instanceof Error ? caughtError.message : 'Authentication failed.'
      setError(nextError)
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleResendConfirmation() {
    if (!supabase || !pendingConfirmationEmail) {
      return
    }

    const validationError = validateEmail(pendingConfirmationEmail)

    if (validationError) {
      setError(validationError)
      return
    }

    setIsResendingConfirmation(true)
    setError(null)
    setMessage(null)

    try {
      const { error: resendError } = await supabase.auth.resend({
        type: 'signup',
        email: pendingConfirmationEmail,
      })

      if (resendError) {
        throw resendError
      }

      setMessage('Confirmation email sent again. Check your inbox.')
    } catch (caughtError) {
      const nextError =
        caughtError instanceof Error ? caughtError.message : 'Could not resend confirmation email.'
      setError(nextError)
    } finally {
      setIsResendingConfirmation(false)
    }
  }

  async function handleForgotPassword() {
    if (!supabase) {
      return
    }

    const normalizedEmail = email.trim().toLowerCase()
    const validationError = validateEmail(normalizedEmail)

    if (validationError) {
      setError(validationError)
      setMessage(null)
      return
    }

    setIsSendingPasswordReset(true)
    setError(null)
    setMessage(null)
    setPendingConfirmationEmail(null)

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(normalizedEmail, {
        redirectTo: `${window.location.origin}/reset-password`,
      })

      if (resetError) {
        throw resetError
      }

      setMessage('Password recovery email sent. Check your inbox for the reset link.')
    } catch (caughtError) {
      const nextError =
        caughtError instanceof Error
          ? caughtError.message
          : 'Could not send the password recovery email.'
      setError(nextError)
    } finally {
      setIsSendingPasswordReset(false)
    }
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,122,92,0.16),transparent_30%),radial-gradient(circle_at_70%_20%,rgba(163,136,238,0.14),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_35%)]" />
        <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.05fr,0.95fr] lg:px-8 lg:py-16">
          <section className="relative space-y-8">
            <div className="inline-flex items-center gap-3 rounded-full border border-coral/20 bg-coral/10 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-coral shadow-[0_0_0_1px_rgba(255,122,92,0.06)]">
              <span className="h-2 w-2 rounded-full bg-coral" />
              Contributor access
            </div>

            <div className="space-y-5">
              <p className="text-sm uppercase tracking-[0.28em] text-white/38">
                Editorial workspace
              </p>
              <h1 className="max-w-3xl font-display text-4xl font-black leading-[0.95] tracking-[-0.06em] text-white sm:text-5xl lg:text-[4.5rem]">
                Write for The Loop with an author space that feels like the magazine.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-white/64 sm:text-lg">
                Writers can save drafts, submit articles for review, and manage their own
                submissions without any gated-reading flow. The front page stays open to
                readers while contributors get a clean backstage to create.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { title: 'Email auth', detail: 'Fast, direct sign-in for contributors.' },
                { title: 'Own your drafts', detail: 'Track every piece from draft to review.' },
                { title: 'Submit for review', detail: 'Admins approve posts before they go public.' },
              ].map((item, index) => (
                <div
                  key={item.title}
                  className="rounded-[1.75rem] border border-white/10 bg-white/[0.045] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.16)] backdrop-blur-sm"
                >
                  <div className="mb-5 flex items-center justify-between">
                    <span className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-white/32">
                      0{index + 1}
                    </span>
                    <span className="h-2.5 w-2.5 rounded-full bg-coral/80" />
                  </div>
                  <p className="text-base font-semibold text-white">{item.title}</p>
                  <p className="mt-2 text-sm leading-6 text-white/52">{item.detail}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-4 lg:grid-cols-[1.2fr,0.8fr]">
              <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.2)]">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-white/38">
                  Why this exists
                </p>
                <p className="mt-4 max-w-xl text-lg leading-8 text-white/76">
                  The Loop is building an editorial ecosystem, not a locked members area. This
                  login is for authorship and publishing tools only.
                </p>
                <div className="mt-8 flex flex-wrap gap-3 text-sm text-white/58">
                  {['Responsive workspace', 'Clean article management', 'Free reader access'].map(
                    (item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 bg-black/20 px-4 py-2"
                      >
                        {item}
                      </span>
                    ),
                  )}
                </div>
              </div>

              <div className="rounded-[2rem] border border-lavender/18 bg-lavender/10 p-6 shadow-[0_24px_60px_rgba(53,41,86,0.18)]">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-lavender">
                  Access note
                </p>
                <p className="mt-4 text-3xl font-black tracking-[-0.05em] text-white">24/7</p>
                <p className="mt-2 text-sm leading-6 text-white/62">
                  Drafts stay available across sessions so contributors can return, revise, and
                  publish on their own schedule.
                </p>
              </div>
            </div>
          </section>

          <section
            id="login-section"
            className="relative scroll-mt-28 rounded-[2.25rem] border border-white/10 bg-[linear-gradient(180deg,rgba(23,20,20,0.92),rgba(12,12,12,0.82))] p-4 shadow-[0_40px_90px_rgba(0,0,0,0.35)] sm:p-5"
          >
            <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-coral/50 to-transparent" />
            <div className="rounded-[1.9rem] border border-white/8 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_40%),rgba(255,255,255,0.02)] p-6 sm:p-8">
              <div className="mb-8 flex items-start justify-between gap-4">
                <div>
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-white/34">
                    Author login
                  </p>
                  <h2 className="mt-3 font-display text-3xl font-black tracking-[-0.05em] text-white">
                    {mode === 'login' ? 'Welcome back' : 'Create your byline'}
                  </h2>
                  <p className="mt-2 max-w-md text-sm leading-6 text-white/52">
                    {mode === 'login'
                      ? 'Access drafts, submit new stories, and manage everything tied to your contributor profile.'
                      : 'Set up your account to start writing and publishing community pieces inside The Loop.'}
                  </p>
                </div>
                <div className="hidden rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.68rem] uppercase tracking-[0.24em] text-white/42 sm:block">
                  Free access
                </div>
              </div>

          {!isConfigured ? (
            <SupabaseNotice />
          ) : (
            <>
              <div className="mb-6 flex gap-2 rounded-full border border-white/10 bg-black/25 p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                {(['login', 'signup'] as const).map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      setMode(item)
                      setConfirmPassword('')
                      setIsConfirmPasswordVisible(false)
                      setError(null)
                    }}
                    className={`flex-1 rounded-full px-4 py-3 text-sm font-medium transition ${
                      mode === item
                        ? 'bg-coral text-white shadow-[0_12px_30px_rgba(255,122,92,0.35)]'
                        : 'text-white/54 hover:bg-white/6 hover:text-white'
                    }`}
                  >
                    {item === 'login' ? 'Login' : 'Create account'}
                  </button>
                ))}
              </div>

              <form className="space-y-5" onSubmit={handleSubmit}>
                {mode === 'signup' ? (
                  <div className="space-y-5">
                    <label className="block">
                      <span className="mb-2 block text-sm font-medium text-white/72">Profile picture</span>
                      <span
                        className="flex cursor-pointer items-center gap-4 rounded-2xl border border-dashed border-white/16 bg-white/5 px-4 py-4 transition hover:border-coral/50 hover:bg-white/[0.07]"
                        onDragOver={(event) => {
                          event.preventDefault()
                        }}
                        onDrop={(event) => {
                          event.preventDefault()
                          setSelectedProfilePicture(event.dataTransfer.files?.[0] ?? null)
                        }}
                      >
                        <span className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-full border border-white/10 bg-black/30 text-xs font-semibold uppercase tracking-[0.18em] text-white/38">
                          {profilePicturePreview ? (
                            <img
                              src={profilePicturePreview}
                              alt=""
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            'PFP'
                          )}
                        </span>
                        <span className="min-w-0">
                          <span className="block text-sm font-medium text-white/78">
                            Drop or choose a JPG, PNG, or WebP
                          </span>
                          <span className="mt-1 block truncate text-xs text-white/42">
                            {profilePicture ? profilePicture.name : 'Shown in your author section'}
                          </span>
                          {profilePicture ? (
                            <button
                              type="button"
                              onClick={(event) => {
                                event.preventDefault()
                                setSelectedProfilePicture(null)
                              }}
                              className="mt-3 rounded-full border border-white/10 px-3 py-1.5 text-xs font-semibold text-white/58 transition hover:border-coral/40 hover:text-coral"
                            >
                              Remove selected picture
                            </button>
                          ) : null}
                        </span>
                        <input
                          id="profile-picture"
                          ref={profilePictureInputRef}
                          name="profilePicture"
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          className="sr-only"
                          onChange={(event) => {
                            setSelectedProfilePicture(event.target.files?.[0] ?? null)
                          }}
                        />
                      </span>
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-sm font-medium text-white/72">Display name</span>
                      <input
                        id="display-name"
                        name="displayName"
                        value={displayName}
                        onChange={(event) => {
                          setDisplayName(event.target.value)
                          setError(null)
                        }}
                        autoComplete="name"
                        maxLength={60}
                        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white outline-none transition placeholder:text-white/28 focus:border-coral/60 focus:bg-white/[0.07]"
                        placeholder="Your byline"
                      />
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-sm font-medium text-white/72">Designation</span>
                      <input
                        id="designation"
                        name="designation"
                        value={designation}
                        onChange={(event) => {
                          setDesignation(event.target.value)
                          setError(null)
                        }}
                        autoComplete="organization-title"
                        maxLength={90}
                        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white outline-none transition placeholder:text-white/28 focus:border-coral/60 focus:bg-white/[0.07]"
                        placeholder="Founder, AI researcher, product lead"
                      />
                    </label>
                  </div>
                ) : null}

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-white/72">Email</span>
                  <input
                    id="email"
                    name="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value)
                      setError(null)
                    }}
                    type="email"
                    autoComplete="email"
                    maxLength={EMAIL_MAX_LENGTH}
                    required
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white outline-none transition placeholder:text-white/28 focus:border-coral/60 focus:bg-white/[0.07]"
                    placeholder="you@example.com"
                  />
                </label>

                <div>
                  <span className="mb-2 flex items-center justify-between gap-3">
                    <label htmlFor="password" className="text-sm font-medium text-white/72">
                      Password
                    </label>
                    {mode === 'login' ? (
                      <button
                        type="button"
                        onClick={handleForgotPassword}
                        disabled={isSubmitting || isSendingPasswordReset}
                        className="text-xs font-semibold text-white/58 transition hover:text-coral disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {isSendingPasswordReset ? 'Sending...' : 'Forgot password?'}
                      </button>
                    ) : null}
                  </span>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      value={password}
                      onChange={(event) => {
                        setPassword(event.target.value)
                        setError(null)
                      }}
                      type={isPasswordVisible ? 'text' : 'password'}
                      autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                      minLength={6}
                      maxLength={128}
                      required
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 pr-20 text-white outline-none transition placeholder:text-white/28 focus:border-coral/60 focus:bg-white/[0.07]"
                      placeholder="Minimum 6 characters"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setIsPasswordVisible((currentValue) => !currentValue)
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/10 px-3 py-1.5 text-xs font-semibold text-white/58 transition hover:border-coral/50 hover:text-coral"
                      aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
                    >
                      {isPasswordVisible ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </div>

                {mode === 'signup' ? (
                  <div>
                    <label
                      htmlFor="confirm-password"
                      className="mb-2 block text-sm font-medium text-white/72"
                    >
                      Confirm password
                    </label>
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
                        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 pr-20 text-white outline-none transition placeholder:text-white/28 focus:border-coral/60 focus:bg-white/[0.07]"
                        placeholder="Repeat your password"
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
                  </div>
                ) : null}

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
                {pendingConfirmationEmail ? (
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/58">
                    <p>
                      Did not receive it? We can resend the confirmation mail to{' '}
                      <span className="font-medium text-white/78">{pendingConfirmationEmail}</span>.
                    </p>
                    <button
                      type="button"
                      onClick={handleResendConfirmation}
                      disabled={isSubmitting || isResendingConfirmation}
                      className="mt-3 rounded-full border border-white/12 px-4 py-2 text-xs font-semibold text-white transition hover:border-coral/50 hover:text-coral disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isResendingConfirmation ? 'Sending...' : 'Resend email'}
                    </button>
                  </div>
                ) : null}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-full bg-coral px-5 py-3.5 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(255,122,92,0.28)] transition hover:-translate-y-0.5 hover:bg-[#ff8c72] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting
                    ? 'Working...'
                    : mode === 'login'
                      ? 'Sign in'
                      : 'Create account'}
                </button>
              </form>
            </>
          )}

              <p className="mt-8 text-sm text-white/48">
                Want to browse instead?{' '}
                <Link to="/" className="text-white transition hover:text-coral">
                  Return to the issue
                </Link>
              </p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
