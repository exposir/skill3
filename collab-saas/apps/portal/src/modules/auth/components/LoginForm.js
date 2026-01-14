import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useAuthContext } from './AuthProvider';
/**
 * LoginForm - 登录表单组件
 *
 * @example
 * <LoginForm onSuccess={() => navigate('/dashboard')} />
 */
export function LoginForm({ onSuccess, onError, className }) {
    const { login, isLoading, error } = useAuthContext();
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
        remember: false
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(credentials);
            onSuccess?.();
        }
        catch (err) {
            onError?.(err instanceof Error ? err.message : 'Login failed');
        }
    };
    const formStyles = {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        maxWidth: '400px',
        margin: '0 auto',
        padding: '2rem',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    };
    const inputStyles = {
        padding: '0.75rem',
        border: '1px solid #ddd',
        borderRadius: '4px',
        fontSize: '1rem'
    };
    const buttonStyles = {
        padding: '0.75rem',
        backgroundColor: '#4a69bd',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        fontSize: '1rem',
        cursor: isLoading ? 'not-allowed' : 'pointer',
        opacity: isLoading ? 0.7 : 1
    };
    const errorStyles = {
        color: '#e74c3c',
        fontSize: '0.875rem',
        marginTop: '-0.5rem'
    };
    return (_jsxs("form", { onSubmit: handleSubmit, style: formStyles, className: className, children: [_jsx("h2", { style: { textAlign: 'center', marginBottom: '1rem' }, children: "\u767B\u5F55" }), error && _jsx("div", { style: errorStyles, children: error }), _jsx("input", { type: "email", placeholder: "\u90AE\u7BB1", value: credentials.email, onChange: e => setCredentials(prev => ({ ...prev, email: e.target.value })), style: inputStyles, required: true, disabled: isLoading }), _jsx("input", { type: "password", placeholder: "\u5BC6\u7801", value: credentials.password, onChange: e => setCredentials(prev => ({ ...prev, password: e.target.value })), style: inputStyles, required: true, disabled: isLoading }), _jsxs("label", { style: { display: 'flex', alignItems: 'center', gap: '0.5rem' }, children: [_jsx("input", { type: "checkbox", checked: credentials.remember, onChange: e => setCredentials(prev => ({ ...prev, remember: e.target.checked })), disabled: isLoading }), "\u8BB0\u4F4F\u6211"] }), _jsx("button", { type: "submit", style: buttonStyles, disabled: isLoading, children: isLoading ? '登录中...' : '登录' }), _jsx("p", { style: { textAlign: 'center', color: '#666', fontSize: '0.875rem' }, children: "\u6D4B\u8BD5\u8D26\u53F7: test@example.com / password123" })] }));
}
//# sourceMappingURL=LoginForm.js.map