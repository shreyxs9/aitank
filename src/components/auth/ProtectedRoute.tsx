import type { ReactElement } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './useAuth'

export function ProtectedRoute({ children }: { children: ReactElement }) {
  const location = useLocation()
  const { isLoading, user } = useAuth()

  if (isLoading) {
    return (
      <div className="mx-auto flex min-h-[40vh] max-w-3xl items-center justify-center px-4 text-sm text-white/62">
        Checking your session...
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  return children
}
