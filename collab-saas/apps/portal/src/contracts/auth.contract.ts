/**
 * Auth Module Contract
 *
 * 定义模块的公共接口，其他模块通过此契约与本模块交互。
 *
 * @module Auth
 * @version 1.0.0
 */

import type { User } from '@collab-saas/shared-types'

// ==================== 类型导出 ====================

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

// ==================== 接口定义 ====================

/**
 * Auth 模块公共 API
 */
export interface IAuthModule {
  /** 获取当前认证状态 */
  getState(): AuthState

  /** 用户登录 */
  login(credentials: LoginCredentials): Promise<void>

  /** 用户注册 */
  register(data: RegisterData): Promise<void>

  /** 用户登出 */
  logout(): Promise<void>

  /** 刷新 Token */
  refreshToken(): Promise<void>

  /** 检查是否已认证 */
  isAuthenticated(): boolean

  /** 获取当前用户 */
  getCurrentUser(): User | null
}

// ==================== 事件定义 ====================

/** 模块事件类型 */
export type AuthEvents = {
  'auth:login': { user: User }
  'auth:logout': Record<string, never>
  'auth:error': { error: string }
  'auth:token-refreshed': { token: string }
}

// ==================== 依赖声明 ====================

/**
 * 本模块依赖的其他模块
 */
export interface AuthDependencies {
  sharedTypes: typeof import('@collab-saas/shared-types')
  sharedUtils: typeof import('@collab-saas/shared-utils')
}

// ==================== 导出声明 ====================

/**
 * 本模块导出的公共 API
 */
export const AUTH_EXPORTS = {
  components: ['LoginForm', 'AuthProvider', 'AuthGuard'],
  hooks: ['useAuth', 'useAuthContext'],
  services: ['authService'],
  types: ['AuthState', 'LoginCredentials', 'RegisterData', 'AuthContextValue']
} as const
