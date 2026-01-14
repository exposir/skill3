import { AUTH_CONSTANTS } from '../constants';
import { generateId } from '@collab-saas/shared-utils';
/**
 * Auth Service - 认证相关的 API 服务
 */
export const authService = {
    /**
     * 用户登录
     */
    async login(credentials) {
        // TODO: 替换为实际 API 调用
        // const response = await fetch(AUTH_CONSTANTS.ENDPOINTS.LOGIN, {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(credentials)
        // })
        // Mock 实现
        await new Promise(resolve => setTimeout(resolve, 500));
        if (credentials.email === 'test@example.com' && credentials.password === 'password123') {
            const user = {
                id: generateId(),
                email: credentials.email,
                name: 'Test User',
                role: 'member',
                status: 'active',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            return {
                user,
                tokens: {
                    accessToken: 'mock_access_token_' + generateId(),
                    refreshToken: 'mock_refresh_token_' + generateId(),
                    expiresIn: AUTH_CONSTANTS.TOKEN_EXPIRY
                }
            };
        }
        throw new Error(AUTH_CONSTANTS.ERRORS.INVALID_CREDENTIALS);
    },
    /**
     * 用户注册
     */
    async register(data) {
        // TODO: 替换为实际 API 调用
        await new Promise(resolve => setTimeout(resolve, 500));
        if (data.password !== data.confirmPassword) {
            throw new Error('密码不匹配');
        }
        if (data.password.length < AUTH_CONSTANTS.MIN_PASSWORD_LENGTH) {
            throw new Error(`密码至少需要 ${AUTH_CONSTANTS.MIN_PASSWORD_LENGTH} 个字符`);
        }
        const user = {
            id: generateId(),
            email: data.email,
            name: data.name,
            role: 'member',
            status: 'active',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        return {
            user,
            tokens: {
                accessToken: 'mock_access_token_' + generateId(),
                refreshToken: 'mock_refresh_token_' + generateId(),
                expiresIn: AUTH_CONSTANTS.TOKEN_EXPIRY
            }
        };
    },
    /**
     * 用户登出
     */
    async logout() {
        // TODO: 替换为实际 API 调用
        await new Promise(resolve => setTimeout(resolve, 200));
    },
    /**
     * 刷新 Token
     */
    async refreshToken(refreshToken) {
        // TODO: 替换为实际 API 调用
        await new Promise(resolve => setTimeout(resolve, 300));
        if (!refreshToken) {
            throw new Error(AUTH_CONSTANTS.ERRORS.SESSION_EXPIRED);
        }
        return {
            accessToken: 'mock_access_token_' + generateId(),
            refreshToken: 'mock_refresh_token_' + generateId(),
            expiresIn: AUTH_CONSTANTS.TOKEN_EXPIRY
        };
    },
    /**
     * 获取当前用户信息
     */
    async getCurrentUser(token) {
        // TODO: 替换为实际 API 调用
        await new Promise(resolve => setTimeout(resolve, 300));
        if (!token) {
            throw new Error(AUTH_CONSTANTS.ERRORS.SESSION_EXPIRED);
        }
        // Mock 返回
        return {
            id: 'user_1',
            email: 'test@example.com',
            name: 'Test User',
            role: 'member',
            status: 'active',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
    }
};
//# sourceMappingURL=auth.service.js.map