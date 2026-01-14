import React from 'react'

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  error?: string
  size?: 'sm' | 'md' | 'lg'
}

export function Input({
  label,
  error,
  size = 'md',
  className = '',
  ...props
}: InputProps): JSX.Element {
  const sizeClasses = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-3 py-2 text-base',
    lg: 'px-4 py-3 text-lg',
  }

  return (
    <div className="input-wrapper">
      {label && (
        <label className="input-label block text-sm font-medium mb-1">
          {label}
        </label>
      )}
      <input
        className={`input ${sizeClasses[size]} border rounded-md w-full ${
          error ? 'border-red-500' : 'border-gray-300'
        } ${className}`}
        {...props}
      />
      {error && (
        <span className="input-error text-red-500 text-sm mt-1">{error}</span>
      )}
    </div>
  )
}
