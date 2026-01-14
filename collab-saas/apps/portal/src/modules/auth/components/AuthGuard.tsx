import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthContext } from './AuthProvider'
import type { AuthGuardProps } from '../types'

/**
 * AuthGuard - 认证守卫组件
 *
 * @example
 * <AuthGuard fallback={<LoginPage />}>
 *   <ProtectedContent />
 * </AuthGuard>
 */
export function AuthGuard({
  children,
  fallback,
  redirectTo = '/login'
}: AuthGuardProps) {
  const { isAuthenticated, isLoading } = useAuthContext()

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}>
        Loading...
      </div>
    )
  }

  if (!isAuthenticated) {
    if (fallback) {
      return <>{fallback}</>
    }
    return <Navigate to={redirectTo} replace />
  }

  return <>{children}</>
}
