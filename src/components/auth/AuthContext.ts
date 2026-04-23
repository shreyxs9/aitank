import { createContext } from 'react'
import type { Session, User } from '@supabase/supabase-js'
import type { Profile } from '../../types/auth'

export interface AuthContextValue {
  isConfigured: boolean
  isLoading: boolean
  profile: Profile | null
  refreshProfile: () => Promise<void>
  session: Session | null
  signOut: () => Promise<void>
  user: User | null
}

export const AuthContext = createContext<AuthContextValue | null>(null)
