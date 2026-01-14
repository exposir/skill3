import React from 'react'

export interface DropdownProps {
  trigger: React.ReactNode
  children: React.ReactNode
  isOpen: boolean
  onToggle: () => void
  align?: 'left' | 'right'
}

export function Dropdown({
  trigger,
  children,
  isOpen,
  onToggle,
  align = 'left',
}: DropdownProps): JSX.Element {
  return (
    <div className="dropdown relative inline-block">
      <div onClick={onToggle} className="dropdown-trigger cursor-pointer">
        {trigger}
      </div>
      {isOpen && (
        <div
          className={`dropdown-menu absolute mt-2 bg-white rounded-md shadow-lg border z-50 min-w-48 ${
            align === 'right' ? 'right-0' : 'left-0'
          }`}
        >
          {children}
        </div>
      )}
    </div>
  )
}

export interface DropdownItemProps {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
}

export function DropdownItem({
  children,
  onClick,
  disabled = false,
}: DropdownItemProps): JSX.Element {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`dropdown-item w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      }`}
    >
      {children}
    </button>
  )
}
