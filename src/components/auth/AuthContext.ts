import { createContext } from 'react'
import type { Session, User } from '@supabase/supabase-js'
import type { AdminProfile, Profile } from '../../types/auth'

export interface AuthContextValue {
  adminProfile: AdminProfile | null
  isConfigured: boolean
  isAdmin: boolean
  isAdminLoading: boolean
  isLoading: boolean
  profile: Profile | null
  refreshAdminProfile: () => Promise<void>
  refreshProfile: () => Promise<void>
  session: Session | null
  signOut: () => Promise<void>
  user: User | null
}

export const AuthContext = createContext<AuthContextValue | null>(null)
