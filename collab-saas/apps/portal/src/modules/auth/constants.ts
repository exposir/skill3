/**
 * Auth Module Constants
 * @module Auth
 */

export const AUTH_CONSTANTS = {
  /** 存储键 */
  STORAGE_KEYS: {
    TOKEN: 'collab_auth_token',
    REFRESH_TOKEN: 'collab_refresh_token',
    USER: 'collab_user'
  },

  /** API 端点 */
  ENDPOINTS: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh',
    ME: '/api/auth/me'
  },

  /** 错误消息 */
  ERRORS: {
    INVALID_CREDENTIALS: '邮箱或密码错误',
    EMAIL_EXISTS: '该邮箱已被注册',
    NETWORK_ERROR: '网络连接失败，请稍后重试',
    SESSION_EXPIRED: '登录已过期，请重新登录',
    UNKNOWN: '发生未知错误'
  },

  /** Token 过期时间（毫秒） */
  TOKEN_EXPIRY: 3600 * 1000, // 1 hour

  /** 密码最小长度 */
  MIN_PASSWORD_LENGTH: 8
} as const
