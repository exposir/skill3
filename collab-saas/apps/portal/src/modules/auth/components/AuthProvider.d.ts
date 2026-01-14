import React from 'react';
import type { AuthContextValue } from '../types';
export declare function useAuthContext(): AuthContextValue;
interface AuthProviderProps {
    children: React.ReactNode;
}
/**
 * AuthProvider - 认证上下文提供者
 *
 * @example
 * <AuthProvider>
 *   <App />
 * </AuthProvider>
 */
export declare function AuthProvider({ children }: AuthProviderProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=AuthProvider.d.ts.map