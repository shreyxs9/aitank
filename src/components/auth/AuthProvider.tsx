import type { Session, User } from '@supabase/supabase-js'
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { ensureProfile, getAdminProfileByEmail, getProfile } from '../../lib/communityArticles'
import { supabase } from '../../lib/supabase'
import type { AdminProfile, Profile } from '../../types/auth'
import { AuthContext, type AuthContextValue } from './AuthContext'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [adminProfile, setAdminProfile] = useState<AdminProfile | null>(null)
  const [isLoading, setIsLoading] = useState(Boolean(supabase))
  const [isAdminLoading, setIsAdminLoading] = useState(Boolean(supabase))

  const refreshProfileForUser = useCallback(async (nextUser: User | null) => {
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
  }, [])

  const refreshAdminForUser = useCallback(async (nextUser: User | null) => {
    if (!nextUser || !supabase) {
      setAdminProfile(null)
      setIsAdminLoading(false)
      return
    }

    setIsAdminLoading(true)
    const nextAdminProfile = await getAdminProfileByEmail(nextUser.email).catch(() => null)
    setAdminProfile(nextAdminProfile)
    setIsAdminLoading(false)
  }, [])

  const refreshProfile = useCallback(async () => {
    await refreshProfileForUser(user)
  }, [refreshProfileForUser, user])

  const refreshAdminProfile = useCallback(async () => {
    await refreshAdminForUser(user)
  }, [refreshAdminForUser, user])

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
      await refreshAdminForUser(data.session?.user ?? null)
      setIsLoading(false)
    }

    void loadSession()

    const {
      data: { subscription },
    } = client.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession)
      setUser(nextSession?.user ?? null)
      void refreshProfileForUser(nextSession?.user ?? null)
      void refreshAdminForUser(nextSession?.user ?? null)
      setIsLoading(false)
    })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [refreshAdminForUser, refreshProfileForUser])

  const value = useMemo<AuthContextValue>(
    () => ({
      adminProfile,
      isConfigured: Boolean(supabase),
      isAdmin: Boolean(adminProfile),
      isAdminLoading,
      isLoading,
      profile,
      refreshAdminProfile,
      refreshProfile,
      session,
      signOut: async () => {
        if (!supabase) {
          return
        }

        await supabase.auth.signOut()
      },
      user,
    }),
    [
      adminProfile,
      isAdminLoading,
      isLoading,
      profile,
      refreshAdminProfile,
      refreshProfile,
      session,
      user,
    ],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
