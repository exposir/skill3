/**
 * Auth Module Contract
 *
 * 定义模块的公共接口，其他模块通过此契约与本模块交互。
 *
 * @module Auth
 * @version 1.0.0
 */
// ==================== 导出声明 ====================
/**
 * 本模块导出的公共 API
 */
export const AUTH_EXPORTS = {
    components: ['LoginForm', 'AuthProvider', 'AuthGuard'],
    hooks: ['useAuth', 'useAuthContext'],
    services: ['authService'],
    types: ['AuthState', 'LoginCredentials', 'RegisterData', 'AuthContextValue']
};
//# sourceMappingURL=auth.contract.js.map