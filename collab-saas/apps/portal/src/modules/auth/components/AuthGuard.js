import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Navigate } from 'react-router-dom';
import { useAuthContext } from './AuthProvider';
/**
 * AuthGuard - 认证守卫组件
 *
 * @example
 * <AuthGuard fallback={<LoginPage />}>
 *   <ProtectedContent />
 * </AuthGuard>
 */
export function AuthGuard({ children, fallback, redirectTo = '/login' }) {
    const { isAuthenticated, isLoading } = useAuthContext();
    if (isLoading) {
        return (_jsx("div", { style: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }, children: "Loading..." }));
    }
    if (!isAuthenticated) {
        if (fallback) {
            return _jsx(_Fragment, { children: fallback });
        }
        return _jsx(Navigate, { to: redirectTo, replace: true });
    }
    return _jsx(_Fragment, { children: children });
}
//# sourceMappingURL=AuthGuard.js.map