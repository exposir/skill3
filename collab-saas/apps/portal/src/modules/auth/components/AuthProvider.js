import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext } from 'react';
import { useAuth } from '../hooks/useAuth';
const AuthContext = createContext(null);
export function useAuthContext() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext must be used within AuthProvider');
    }
    return context;
}
/**
 * AuthProvider - 认证上下文提供者
 *
 * @example
 * <AuthProvider>
 *   <App />
 * </AuthProvider>
 */
export function AuthProvider({ children }) {
    const auth = useAuth();
    return (_jsx(AuthContext.Provider, { value: auth, children: children }));
}
//# sourceMappingURL=AuthProvider.js.map