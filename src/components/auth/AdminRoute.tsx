import type { ReactElement } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { isHardcodedAdminSession } from '../../lib/adminAuth'

export function AdminRoute({ children }: { children: ReactElement }) {
  const location = useLocation()

  if (!isHardcodedAdminSession()) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />
  }

  return children
}
