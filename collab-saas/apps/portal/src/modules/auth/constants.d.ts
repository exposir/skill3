/**
 * Auth Module Constants
 * @module Auth
 */
export declare const AUTH_CONSTANTS: {
    /** 存储键 */
    readonly STORAGE_KEYS: {
        readonly TOKEN: "collab_auth_token";
        readonly REFRESH_TOKEN: "collab_refresh_token";
        readonly USER: "collab_user";
    };
    /** API 端点 */
    readonly ENDPOINTS: {
        readonly LOGIN: "/api/auth/login";
        readonly REGISTER: "/api/auth/register";
        readonly LOGOUT: "/api/auth/logout";
        readonly REFRESH: "/api/auth/refresh";
        readonly ME: "/api/auth/me";
    };
    /** 错误消息 */
    readonly ERRORS: {
        readonly INVALID_CREDENTIALS: "邮箱或密码错误";
        readonly EMAIL_EXISTS: "该邮箱已被注册";
        readonly NETWORK_ERROR: "网络连接失败，请稍后重试";
        readonly SESSION_EXPIRED: "登录已过期，请重新登录";
        readonly UNKNOWN: "发生未知错误";
    };
    /** Token 过期时间（毫秒） */
    readonly TOKEN_EXPIRY: number;
    /** 密码最小长度 */
    readonly MIN_PASSWORD_LENGTH: 8;
};
//# sourceMappingURL=constants.d.ts.map