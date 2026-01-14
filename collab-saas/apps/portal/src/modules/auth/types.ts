/**
 * Auth Module Types
 * @module Auth
 */

import type { User } from '@collab-saas/shared-types'

/** 认证状态 */
export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

/** 登录凭证 */
export interface LoginCredentials {
  email: string
  password: string
  remember?: boolean
}

/** 注册数据 */
export interface RegisterData {
  email: string
  password: string
  name: string
  confirmPassword: string
}

/** 认证上下文值 */
export interface AuthContextValue extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => Promise<void>
  refreshToken: () => Promise<void>
}

/** 登录表单 Props */
export interface LoginFormProps {
  onSuccess?: () => void
  onError?: (error: string) => void
  className?: string
}

/** 认证守卫 Props */
export interface AuthGuardProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  redirectTo?: string
}

/** Token 响应 */
export interface TokenResponse {
  accessToken: string
  refreshToken: string
  expiresIn: number
}

/** 认证响应 */
export interface AuthResponse {
  user: User
  tokens: TokenResponse
}
