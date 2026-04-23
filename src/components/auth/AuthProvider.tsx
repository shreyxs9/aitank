import type { Session, User } from '@supabase/supabase-js'
import {
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { ensureProfile, getProfile } from '../../lib/communityArticles'
import { supabase } from '../../lib/supabase'
import type { Profile } from '../../types/auth'
import { AuthContext, type AuthContextValue } from './AuthContext'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(Boolean(supabase))

  async function refreshProfileForUser(nextUser: User | null) {
    if (!nextUser || !supabase) {
      setProfile(null)
      return
    }

    const existingProfile = await getProfile(nextUser.id).catch(() => null)

    if (existingProfile) {
      setProfile(existingProfile)
      return
    }

    const ensuredProfile = await ensureProfile(nextUser).catch(() => null)
    setProfile(ensuredProfile)
  }

  useEffect(() => {
    const client = supabase

    if (!client) {
      return
    }

    let isMounted = true

    const loadSession = async () => {
      const { data } = await client.auth.getSession()

      if (!isMounted) {
        return
      }

      setSession(data.session)
      setUser(data.session?.user ?? null)
      await refreshProfileForUser(data.session?.user ?? null)
      setIsLoading(false)
    }

    void loadSession()

    const {
      data: { subscription },
    } = client.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession)
      setUser(nextSession?.user ?? null)
      void refreshProfileForUser(nextSession?.user ?? null)
      setIsLoading(false)
    })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      isConfigured: Boolean(supabase),
      isLoading,
      profile,
      refreshProfile: async () => {
        await refreshProfileForUser(user)
      },
      session,
      signOut: async () => {
        if (!supabase) {
          return
        }

        await supabase.auth.signOut()
      },
      user,
    }),
    [isLoading, profile, session, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
