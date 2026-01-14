import React from 'react'

export interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode
}

export function EmptyState({
  icon,
  title,
  description,
  action,
}: EmptyStateProps): JSX.Element {
  return (
    <div className="empty-state flex flex-col items-center justify-center py-12 text-center">
      {icon && (
        <div className="empty-state-icon text-gray-400 mb-4">
          {icon}
        </div>
      )}
      <h3 className="empty-state-title text-lg font-medium text-gray-900 mb-2">
        {title}
      </h3>
      {description && (
        <p className="empty-state-description text-gray-500 mb-4 max-w-sm">
          {description}
        </p>
      )}
      {action && (
        <div className="empty-state-action">
          {action}
        </div>
      )}
    </div>
  )
}
