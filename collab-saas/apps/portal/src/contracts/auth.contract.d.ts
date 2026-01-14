/**
 * Auth Module Contract
 *
 * 定义模块的公共接口，其他模块通过此契约与本模块交互。
 *
 * @module Auth
 * @version 1.0.0
 */
import type { User } from '@collab-saas/shared-types';
/** 认证状态 */
export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}
/** 登录凭证 */
export interface LoginCredentials {
    email: string;
    password: string;
    remember?: boolean;
}
/** 注册数据 */
export interface RegisterData {
    email: string;
    password: string;
    name: string;
    confirmPassword: string;
}
/**
 * Auth 模块公共 API
 */
export interface IAuthModule {
    /** 获取当前认证状态 */
    getState(): AuthState;
    /** 用户登录 */
    login(credentials: LoginCredentials): Promise<void>;
    /** 用户注册 */
    register(data: RegisterData): Promise<void>;
    /** 用户登出 */
    logout(): Promise<void>;
    /** 刷新 Token */
    refreshToken(): Promise<void>;
    /** 检查是否已认证 */
    isAuthenticated(): boolean;
    /** 获取当前用户 */
    getCurrentUser(): User | null;
}
/** 模块事件类型 */
export type AuthEvents = {
    'auth:login': {
        user: User;
    };
    'auth:logout': Record<string, never>;
    'auth:error': {
        error: string;
    };
    'auth:token-refreshed': {
        token: string;
    };
};
/**
 * 本模块依赖的其他模块
 */
export interface AuthDependencies {
    sharedTypes: typeof import('@collab-saas/shared-types');
    sharedUtils: typeof import('@collab-saas/shared-utils');
}
/**
 * 本模块导出的公共 API
 */
export declare const AUTH_EXPORTS: {
    readonly components: readonly ["LoginForm", "AuthProvider", "AuthGuard"];
    readonly hooks: readonly ["useAuth", "useAuthContext"];
    readonly services: readonly ["authService"];
    readonly types: readonly ["AuthState", "LoginCredentials", "RegisterData", "AuthContextValue"];
};
//# sourceMappingURL=auth.contract.d.ts.map