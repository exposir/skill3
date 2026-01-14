import React from 'react'

export interface AvatarProps {
  src?: string
  alt?: string
  name?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

export function Avatar({
  src,
  alt = '',
  name,
  size = 'md',
  className = '',
}: AvatarProps): JSX.Element {
  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-10 h-10 text-base',
    xl: 'w-12 h-12 text-lg',
  }

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={`avatar rounded-full object-cover ${sizeClasses[size]} ${className}`}
      />
    )
  }

  return (
    <div
      className={`avatar rounded-full bg-gray-200 flex items-center justify-center font-medium text-gray-600 ${sizeClasses[size]} ${className}`}
    >
      {name ? getInitials(name) : '?'}
    </div>
  )
}
