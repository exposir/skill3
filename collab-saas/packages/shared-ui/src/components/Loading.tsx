import React from 'react'

export interface LoadingProps {
  size?: 'sm' | 'md' | 'lg'
  text?: string
}

export function Loading({ size = 'md', text = 'Loading...' }: LoadingProps) {
  const sizes = {
    sm: { spinner: 16, font: '0.75rem' },
    md: { spinner: 24, font: '0.875rem' },
    lg: { spinner: 32, font: '1rem' }
  }

  const containerStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem'
  }

  const spinnerStyles: React.CSSProperties = {
    width: sizes[size].spinner,
    height: sizes[size].spinner,
    border: '2px solid #e0e0e0',
    borderTopColor: '#4a69bd',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite'
  }

  return (
    <div style={containerStyles}>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
      <div style={spinnerStyles} />
      {text && <span style={{ fontSize: sizes[size].font, color: '#666' }}>{text}</span>}
    </div>
  )
}
