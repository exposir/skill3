import React from 'react'
import { classNames } from '@collab-saas/shared-utils'

export interface CardProps {
  title?: string
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export function Card({ title, children, className, style }: CardProps) {
  const cardStyles: React.CSSProperties = {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    overflow: 'hidden',
    ...style
  }

  const headerStyles: React.CSSProperties = {
    padding: '1rem',
    borderBottom: '1px solid #eee',
    fontWeight: 600,
    color: '#333'
  }

  const bodyStyles: React.CSSProperties = {
    padding: '1rem'
  }

  return (
    <div className={classNames('card', className)} style={cardStyles}>
      {title && <div style={headerStyles}>{title}</div>}
      <div style={bodyStyles}>{children}</div>
    </div>
  )
}
