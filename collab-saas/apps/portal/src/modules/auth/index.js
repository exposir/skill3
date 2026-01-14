/**
 * @module Auth
 * @description 认证模块 - 处理用户登录、注册、登出和认证状态管理
 *
 * @exports
 * - Components: LoginForm, RegisterForm, AuthProvider, AuthGuard
 * - Hooks: useAuth
 * - Services: authService
 * - Types: AuthState, LoginCredentials, RegisterData
 *
 * @dependencies
 * - @collab-saas/shared-types
 * - @collab-saas/shared-utils
 *
 * @skill skill-module-auth
 * @contract auth.contract.ts
 */
// Components
export { LoginForm } from './components/LoginForm';
export { AuthProvider, useAuthContext } from './components/AuthProvider';
export { AuthGuard } from './components/AuthGuard';
// Hooks
export { useAuth } from './hooks/useAuth';
// Services
export { authService } from './services/auth.service';
// Constants
export { AUTH_CONSTANTS } from './constants';
//# sourceMappingURL=index.js.map