// ============================================
// Shared Zustand Stores
// ============================================

import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'
import type { User, AuthState, Notification, UserSettings } from '@collab-saas/shared-types'

// --- Auth Store ---

interface AuthStore extends AuthState {
  setUser: (user: User | null) => void
  setToken: (token: string | null) => void
  login: (user: User, token: string) => void
  logout: () => void
  setLoading: (isLoading: boolean) => void
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: true,

        setUser: (user) => set({ user, isAuthenticated: !!user }),
        setToken: (token) => set({ token }),
        login: (user, token) => set({ user, token, isAuthenticated: true, isLoading: false }),
        logout: () => set({ user: null, token: null, isAuthenticated: false }),
        setLoading: (isLoading) => set({ isLoading }),
      }),
      {
        name: 'auth-storage',
        partialize: (state) => ({ token: state.token }),
      }
    ),
    { name: 'AuthStore' }
  )
)

// --- UI Store ---

interface UIState {
  sidebarOpen: boolean
  theme: 'light' | 'dark' | 'system'
  isMobile: boolean
}

interface UIStore extends UIState {
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
  setTheme: (theme: 'light' | 'dark' | 'system') => void
  setIsMobile: (isMobile: boolean) => void
}

export const useUIStore = create<UIStore>()(
  devtools(
    persist(
      (set) => ({
        sidebarOpen: true,
        theme: 'system',
        isMobile: false,

        toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
        setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
        setTheme: (theme) => set({ theme }),
        setIsMobile: (isMobile) => set({ isMobile, sidebarOpen: !isMobile }),
      }),
      {
        name: 'ui-storage',
        partialize: (state) => ({ theme: state.theme, sidebarOpen: state.sidebarOpen }),
      }
    ),
    { name: 'UIStore' }
  )
)

// --- Notification Store ---

interface NotificationStore {
  notifications: Notification[]
  unreadCount: number
  addNotification: (notification: Notification) => void
  removeNotification: (id: string) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  clearAll: () => void
}

export const useNotificationStore = create<NotificationStore>()(
  devtools(
    (set) => ({
      notifications: [],
      unreadCount: 0,

      addNotification: (notification) =>
        set((state) => ({
          notifications: [notification, ...state.notifications],
          unreadCount: state.unreadCount + (notification.isRead ? 0 : 1),
        })),

      removeNotification: (id) =>
        set((state) => {
          const notification = state.notifications.find((n) => n.id === id)
          return {
            notifications: state.notifications.filter((n) => n.id !== id),
            unreadCount: notification && !notification.isRead
              ? state.unreadCount - 1
              : state.unreadCount,
          }
        }),

      markAsRead: (id) =>
        set((state) => {
          const notification = state.notifications.find((n) => n.id === id)
          if (!notification || notification.isRead) return state
          return {
            notifications: state.notifications.map((n) =>
              n.id === id ? { ...n, isRead: true } : n
            ),
            unreadCount: state.unreadCount - 1,
          }
        }),

      markAllAsRead: () =>
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
          unreadCount: 0,
        })),

      clearAll: () => set({ notifications: [], unreadCount: 0 }),
    }),
    { name: 'NotificationStore' }
  )
)

// --- Settings Store ---

interface SettingsStore {
  settings: UserSettings | null
  setSettings: (settings: UserSettings) => void
  updateSettings: (updates: Partial<UserSettings>) => void
}

export const useSettingsStore = create<SettingsStore>()(
  devtools(
    persist(
      (set) => ({
        settings: null,

        setSettings: (settings) => set({ settings }),
        updateSettings: (updates) =>
          set((state) => ({
            settings: state.settings ? { ...state.settings, ...updates } : null,
          })),
      }),
      {
        name: 'settings-storage',
      }
    ),
    { name: 'SettingsStore' }
  )
)

// --- Modal Store ---

interface ModalState {
  modals: Map<string, { isOpen: boolean; data?: unknown }>
}

interface ModalStore extends ModalState {
  openModal: (id: string, data?: unknown) => void
  closeModal: (id: string) => void
  toggleModal: (id: string, data?: unknown) => void
  isModalOpen: (id: string) => boolean
  getModalData: <T>(id: string) => T | undefined
}

export const useModalStore = create<ModalStore>()(
  devtools(
    (set, get) => ({
      modals: new Map(),

      openModal: (id, data) =>
        set((state) => {
          const modals = new Map(state.modals)
          modals.set(id, { isOpen: true, data })
          return { modals }
        }),

      closeModal: (id) =>
        set((state) => {
          const modals = new Map(state.modals)
          modals.set(id, { isOpen: false })
          return { modals }
        }),

      toggleModal: (id, data) => {
        const modal = get().modals.get(id)
        if (modal?.isOpen) {
          get().closeModal(id)
        } else {
          get().openModal(id, data)
        }
      },

      isModalOpen: (id) => get().modals.get(id)?.isOpen ?? false,
      getModalData: <T>(id: string) => get().modals.get(id)?.data as T | undefined,
    }),
    { name: 'ModalStore' }
  )
)

// --- Toast Store ---

export interface Toast {
  id: string
  type: 'info' | 'success' | 'warning' | 'error'
  title: string
  message?: string
  duration?: number
}

interface ToastStore {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, 'id'>) => string
  removeToast: (id: string) => void
  clearToasts: () => void
}

export const useToastStore = create<ToastStore>()(
  devtools(
    (set) => ({
      toasts: [],

      addToast: (toast) => {
        const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`
        const newToast = { ...toast, id }

        set((state) => ({ toasts: [...state.toasts, newToast] }))

        if (toast.duration !== 0) {
          setTimeout(() => {
            set((state) => ({
              toasts: state.toasts.filter((t) => t.id !== id),
            }))
          }, toast.duration ?? 5000)
        }

        return id
      },

      removeToast: (id) =>
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        })),

      clearToasts: () => set({ toasts: [] }),
    }),
    { name: 'ToastStore' }
  )
)

// --- Helper Hooks ---

export function useAuth() {
  return useAuthStore((state) => ({
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    login: state.login,
    logout: state.logout,
  }))
}

export function useTheme() {
  return useUIStore((state) => ({
    theme: state.theme,
    setTheme: state.setTheme,
  }))
}

export function useToast() {
  const addToast = useToastStore((state) => state.addToast)

  return {
    success: (title: string, message?: string) =>
      addToast({ type: 'success', title, message }),
    error: (title: string, message?: string) =>
      addToast({ type: 'error', title, message }),
    warning: (title: string, message?: string) =>
      addToast({ type: 'warning', title, message }),
    info: (title: string, message?: string) =>
      addToast({ type: 'info', title, message }),
  }
}
