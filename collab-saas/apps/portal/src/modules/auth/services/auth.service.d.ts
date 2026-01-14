import type { User } from '@collab-saas/shared-types';
import type { LoginCredentials, RegisterData, AuthResponse, TokenResponse } from '../types';
/**
 * Auth Service - 认证相关的 API 服务
 */
export declare const authService: {
    /**
     * 用户登录
     */
    login(credentials: LoginCredentials): Promise<AuthResponse>;
    /**
     * 用户注册
     */
    register(data: RegisterData): Promise<AuthResponse>;
    /**
     * 用户登出
     */
    logout(): Promise<void>;
    /**
     * 刷新 Token
     */
    refreshToken(refreshToken: string): Promise<TokenResponse>;
    /**
     * 获取当前用户信息
     */
    getCurrentUser(token: string): Promise<User>;
};
//# sourceMappingURL=auth.service.d.ts.map