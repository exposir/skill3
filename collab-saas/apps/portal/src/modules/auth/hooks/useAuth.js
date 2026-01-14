import { useState, useCallback, useEffect } from 'react';
import { authService } from '../services/auth.service';
import { AUTH_CONSTANTS } from '../constants';
const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
    error: null
};
/**
 * useAuth - Auth 模块主 Hook
 *
 * @example
 * const { user, isAuthenticated, login, logout } = useAuth()
 */
export function useAuth() {
    const [state, setState] = useState(initialState);
    // 初始化时检查本地存储的 token
    useEffect(() => {
        const initAuth = async () => {
            const token = localStorage.getItem(AUTH_CONSTANTS.STORAGE_KEYS.TOKEN);
            if (token) {
                try {
                    const user = await authService.getCurrentUser(token);
                    setState({
                        user,
                        token,
                        isAuthenticated: true,
                        isLoading: false,
                        error: null
                    });
                }
                catch {
                    localStorage.removeItem(AUTH_CONSTANTS.STORAGE_KEYS.TOKEN);
                    setState({ ...initialState, isLoading: false });
                }
            }
            else {
                setState({ ...initialState, isLoading: false });
            }
        };
        initAuth();
    }, []);
    const login = useCallback(async (credentials) => {
        setState(prev => ({ ...prev, isLoading: true, error: null }));
        try {
            const { user, tokens } = await authService.login(credentials);
            localStorage.setItem(AUTH_CONSTANTS.STORAGE_KEYS.TOKEN, tokens.accessToken);
            if (credentials.remember) {
                localStorage.setItem(AUTH_CONSTANTS.STORAGE_KEYS.REFRESH_TOKEN, tokens.refreshToken);
            }
            setState({
                user,
                token: tokens.accessToken,
                isAuthenticated: true,
                isLoading: false,
                error: null
            });
        }
        catch (error) {
            setState(prev => ({
                ...prev,
                isLoading: false,
                error: error instanceof Error ? error.message : AUTH_CONSTANTS.ERRORS.UNKNOWN
            }));
            throw error;
        }
    }, []);
    const register = useCallback(async (data) => {
        setState(prev => ({ ...prev, isLoading: true, error: null }));
        try {
            const { user, tokens } = await authService.register(data);
            localStorage.setItem(AUTH_CONSTANTS.STORAGE_KEYS.TOKEN, tokens.accessToken);
            setState({
                user,
                token: tokens.accessToken,
                isAuthenticated: true,
                isLoading: false,
                error: null
            });
        }
        catch (error) {
            setState(prev => ({
                ...prev,
                isLoading: false,
                error: error instanceof Error ? error.message : AUTH_CONSTANTS.ERRORS.UNKNOWN
            }));
            throw error;
        }
    }, []);
    const logout = useCallback(async () => {
        setState(prev => ({ ...prev, isLoading: true }));
        try {
            await authService.logout();
        }
        finally {
            localStorage.removeItem(AUTH_CONSTANTS.STORAGE_KEYS.TOKEN);
            localStorage.removeItem(AUTH_CONSTANTS.STORAGE_KEYS.REFRESH_TOKEN);
            setState({ ...initialState, isLoading: false });
        }
    }, []);
    const refreshToken = useCallback(async () => {
        const refresh = localStorage.getItem(AUTH_CONSTANTS.STORAGE_KEYS.REFRESH_TOKEN);
        if (!refresh) {
            throw new Error(AUTH_CONSTANTS.ERRORS.SESSION_EXPIRED);
        }
        try {
            const tokens = await authService.refreshToken(refresh);
            localStorage.setItem(AUTH_CONSTANTS.STORAGE_KEYS.TOKEN, tokens.accessToken);
            setState(prev => ({ ...prev, token: tokens.accessToken }));
        }
        catch {
            await logout();
            throw new Error(AUTH_CONSTANTS.ERRORS.SESSION_EXPIRED);
        }
    }, [logout]);
    return {
        ...state,
        login,
        register,
        logout,
        refreshToken
    };
}
//# sourceMappingURL=useAuth.js.map