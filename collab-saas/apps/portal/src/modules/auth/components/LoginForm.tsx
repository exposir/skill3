import React, { useState } from 'react'
import { useAuthContext } from './AuthProvider'
import type { LoginFormProps, LoginCredentials } from '../types'

/**
 * LoginForm - 登录表单组件
 *
 * @example
 * <LoginForm onSuccess={() => navigate('/dashboard')} />
 */
export function LoginForm({ onSuccess, onError, className }: LoginFormProps) {
  const { login, isLoading, error } = useAuthContext()
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: '',
    remember: false
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await login(credentials)
      onSuccess?.()
    } catch (err) {
      onError?.(err instanceof Error ? err.message : 'Login failed')
    }
  }

  const formStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    maxWidth: '400px',
    margin: '0 auto',
    padding: '2rem',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  }

  const inputStyles: React.CSSProperties = {
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem'
  }

  const buttonStyles: React.CSSProperties = {
    padding: '0.75rem',
    backgroundColor: '#4a69bd',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: isLoading ? 'not-allowed' : 'pointer',
    opacity: isLoading ? 0.7 : 1
  }

  const errorStyles: React.CSSProperties = {
    color: '#e74c3c',
    fontSize: '0.875rem',
    marginTop: '-0.5rem'
  }

  return (
    <form onSubmit={handleSubmit} style={formStyles} className={className}>
      <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>登录</h2>

      {error && <div style={errorStyles}>{error}</div>}

      <input
        type="email"
        placeholder="邮箱"
        value={credentials.email}
        onChange={e => setCredentials(prev => ({ ...prev, email: e.target.value }))}
        style={inputStyles}
        required
        disabled={isLoading}
      />

      <input
        type="password"
        placeholder="密码"
        value={credentials.password}
        onChange={e => setCredentials(prev => ({ ...prev, password: e.target.value }))}
        style={inputStyles}
        required
        disabled={isLoading}
      />

      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <input
          type="checkbox"
          checked={credentials.remember}
          onChange={e => setCredentials(prev => ({ ...prev, remember: e.target.checked }))}
          disabled={isLoading}
        />
        记住我
      </label>

      <button type="submit" style={buttonStyles} disabled={isLoading}>
        {isLoading ? '登录中...' : '登录'}
      </button>

      <p style={{ textAlign: 'center', color: '#666', fontSize: '0.875rem' }}>
        测试账号: test@example.com / password123
      </p>
    </form>
  )
}
