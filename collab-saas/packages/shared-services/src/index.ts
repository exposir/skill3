// ============================================
// Shared API Services
// ============================================

import type { ApiResponse, PaginatedResponse } from '@collab-saas/shared-types'

// --- HTTP Client ---

export interface RequestConfig {
  headers?: Record<string, string>
  params?: Record<string, string | number | boolean>
  signal?: AbortSignal
}

export interface HttpClient {
  get<T>(url: string, config?: RequestConfig): Promise<T>
  post<T>(url: string, data?: unknown, config?: RequestConfig): Promise<T>
  put<T>(url: string, data?: unknown, config?: RequestConfig): Promise<T>
  patch<T>(url: string, data?: unknown, config?: RequestConfig): Promise<T>
  delete<T>(url: string, config?: RequestConfig): Promise<T>
}

class ApiClient implements HttpClient {
  private baseUrl: string
  private defaultHeaders: Record<string, string>
  private tokenGetter: (() => string | null) | null = null

  constructor(baseUrl: string, defaultHeaders: Record<string, string> = {}) {
    this.baseUrl = baseUrl
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...defaultHeaders,
    }
  }

  setTokenGetter(getter: () => string | null): void {
    this.tokenGetter = getter
  }

  private getHeaders(): Record<string, string> {
    const headers = { ...this.defaultHeaders }
    if (this.tokenGetter) {
      const token = this.tokenGetter()
      if (token) {
        headers['Authorization'] = `Bearer ${token}`
      }
    }
    return headers
  }

  private buildUrl(url: string, params?: Record<string, string | number | boolean>): string {
    const fullUrl = url.startsWith('http') ? url : `${this.baseUrl}${url}`
    if (!params) return fullUrl
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      searchParams.append(key, String(value))
    })
    return `${fullUrl}?${searchParams.toString()}`
  }

  private async request<T>(
    method: string,
    url: string,
    data?: unknown,
    config?: RequestConfig
  ): Promise<T> {
    const response = await fetch(this.buildUrl(url, config?.params), {
      method,
      headers: {
        ...this.getHeaders(),
        ...config?.headers,
      },
      body: data ? JSON.stringify(data) : undefined,
      signal: config?.signal,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new ApiError(response.status, errorData.message || `HTTP ${response.status}`, errorData)
    }

    return response.json()
  }

  async get<T>(url: string, config?: RequestConfig): Promise<T> {
    return this.request<T>('GET', url, undefined, config)
  }

  async post<T>(url: string, data?: unknown, config?: RequestConfig): Promise<T> {
    return this.request<T>('POST', url, data, config)
  }

  async put<T>(url: string, data?: unknown, config?: RequestConfig): Promise<T> {
    return this.request<T>('PUT', url, data, config)
  }

  async patch<T>(url: string, data?: unknown, config?: RequestConfig): Promise<T> {
    return this.request<T>('PATCH', url, data, config)
  }

  async delete<T>(url: string, config?: RequestConfig): Promise<T> {
    return this.request<T>('DELETE', url, undefined, config)
  }
}

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public data?: unknown
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

// Create singleton instance
// Base URL can be configured at runtime via setBaseUrl
const DEFAULT_API_BASE_URL = '/api'
export const apiClient = new ApiClient(DEFAULT_API_BASE_URL)

// Allow runtime configuration
export function configureApiClient(baseUrl: string): void {
  Object.assign(apiClient, new ApiClient(baseUrl))
}

// --- Base Service ---

export interface CrudService<T, CreateDTO = Partial<T>, UpdateDTO = Partial<T>> {
  getAll(params?: Record<string, unknown>): Promise<PaginatedResponse<T>>
  getById(id: string): Promise<T>
  create(data: CreateDTO): Promise<T>
  update(id: string, data: UpdateDTO): Promise<T>
  delete(id: string): Promise<void>
}

export function createCrudService<T, CreateDTO = Partial<T>, UpdateDTO = Partial<T>>(
  resourcePath: string
): CrudService<T, CreateDTO, UpdateDTO> {
  return {
    async getAll(params?: Record<string, unknown>): Promise<PaginatedResponse<T>> {
      const queryParams = params as Record<string, string | number | boolean> | undefined
      return apiClient.get<PaginatedResponse<T>>(resourcePath, { params: queryParams })
    },

    async getById(id: string): Promise<T> {
      const response = await apiClient.get<ApiResponse<T>>(`${resourcePath}/${id}`)
      if (!response.data) throw new ApiError(404, 'Resource not found')
      return response.data
    },

    async create(data: CreateDTO): Promise<T> {
      const response = await apiClient.post<ApiResponse<T>>(resourcePath, data)
      if (!response.data) throw new ApiError(500, 'Failed to create resource')
      return response.data
    },

    async update(id: string, data: UpdateDTO): Promise<T> {
      const response = await apiClient.patch<ApiResponse<T>>(`${resourcePath}/${id}`, data)
      if (!response.data) throw new ApiError(500, 'Failed to update resource')
      return response.data
    },

    async delete(id: string): Promise<void> {
      await apiClient.delete(`${resourcePath}/${id}`)
    },
  }
}

// --- Auth Service ---

import type { User, LoginCredentials, RegisterData, AuthState } from '@collab-saas/shared-types'

export interface AuthService {
  login(credentials: LoginCredentials): Promise<{ user: User; token: string }>
  register(data: RegisterData): Promise<{ user: User; token: string }>
  logout(): Promise<void>
  getCurrentUser(): Promise<User>
  refreshToken(): Promise<{ token: string }>
}

export const authService: AuthService = {
  async login(credentials: LoginCredentials) {
    return apiClient.post<{ user: User; token: string }>('/auth/login', credentials)
  },

  async register(data: RegisterData) {
    return apiClient.post<{ user: User; token: string }>('/auth/register', data)
  },

  async logout() {
    await apiClient.post('/auth/logout')
  },

  async getCurrentUser() {
    const response = await apiClient.get<ApiResponse<User>>('/auth/me')
    if (!response.data) throw new ApiError(401, 'Not authenticated')
    return response.data
  },

  async refreshToken() {
    return apiClient.post<{ token: string }>('/auth/refresh')
  },
}

// --- Upload Service ---

export interface UploadService {
  uploadFile(file: File, onProgress?: (progress: number) => void): Promise<{ url: string; id: string }>
  uploadFiles(files: File[], onProgress?: (progress: number) => void): Promise<{ url: string; id: string }[]>
  deleteFile(id: string): Promise<void>
}

export const uploadService: UploadService = {
  async uploadFile(file: File, onProgress?: (progress: number) => void) {
    const formData = new FormData()
    formData.append('file', file)

    const xhr = new XMLHttpRequest()

    return new Promise((resolve, reject) => {
      if (onProgress) {
        xhr.upload.addEventListener('progress', (e) => {
          if (e.lengthComputable) {
            onProgress(Math.round((e.loaded / e.total) * 100))
          }
        })
      }

      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(JSON.parse(xhr.responseText))
        } else {
          reject(new ApiError(xhr.status, 'Upload failed'))
        }
      })

      xhr.addEventListener('error', () => reject(new ApiError(0, 'Upload failed')))
      xhr.open('POST', `${DEFAULT_API_BASE_URL}/upload`)
      xhr.send(formData)
    })
  },

  async uploadFiles(files: File[], onProgress?: (progress: number) => void) {
    const results: { url: string; id: string }[] = []
    let completed = 0

    for (const file of files) {
      const result = await this.uploadFile(file, (progress) => {
        const overall = ((completed + progress / 100) / files.length) * 100
        onProgress?.(Math.round(overall))
      })
      results.push(result)
      completed++
    }

    return results
  },

  async deleteFile(id: string) {
    await apiClient.delete(`/upload/${id}`)
  },
}

// --- WebSocket Service ---

export type WebSocketMessageHandler = (data: unknown) => void

export interface WebSocketService {
  connect(url: string): void
  disconnect(): void
  send(event: string, data: unknown): void
  on(event: string, handler: WebSocketMessageHandler): () => void
  off(event: string, handler: WebSocketMessageHandler): void
}

class WebSocketClient implements WebSocketService {
  private ws: WebSocket | null = null
  private handlers: Map<string, Set<WebSocketMessageHandler>> = new Map()
  private reconnectAttempts = 0
  private maxReconnectAttempts = 5
  private reconnectDelay = 1000

  connect(url: string): void {
    this.ws = new WebSocket(url)

    this.ws.onmessage = (event) => {
      try {
        const { type, data } = JSON.parse(event.data)
        this.handlers.get(type)?.forEach(handler => handler(data))
      } catch {
        // Invalid message format
      }
    }

    this.ws.onclose = () => {
      if (this.reconnectAttempts < this.maxReconnectAttempts) {
        setTimeout(() => {
          this.reconnectAttempts++
          this.connect(url)
        }, this.reconnectDelay * this.reconnectAttempts)
      }
    }

    this.ws.onopen = () => {
      this.reconnectAttempts = 0
    }
  }

  disconnect(): void {
    this.ws?.close()
    this.ws = null
  }

  send(event: string, data: unknown): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type: event, data }))
    }
  }

  on(event: string, handler: WebSocketMessageHandler): () => void {
    if (!this.handlers.has(event)) {
      this.handlers.set(event, new Set())
    }
    this.handlers.get(event)!.add(handler)
    return () => this.off(event, handler)
  }

  off(event: string, handler: WebSocketMessageHandler): void {
    this.handlers.get(event)?.delete(handler)
  }
}

export const wsClient = new WebSocketClient()

// --- Export all ---

export { ApiClient }
