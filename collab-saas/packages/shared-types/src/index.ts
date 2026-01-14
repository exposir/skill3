// ============================================
// Common types shared across all apps
// ============================================

// --- Base Types ---

export interface BaseEntity {
  id: string
  createdAt: string
  updatedAt: string
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}

// --- User & Auth Types ---

export type UserRole = 'admin' | 'member' | 'viewer'

export interface User extends BaseEntity {
  email: string
  name: string
  avatar?: string
  role: UserRole
  organizationId?: string
  status: 'active' | 'inactive' | 'suspended'
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  name: string
}

// --- Organization Types ---

export interface Organization extends BaseEntity {
  name: string
  slug: string
  logo?: string
  ownerId: string
  plan: 'free' | 'pro' | 'enterprise'
  memberCount: number
}

export interface Team extends BaseEntity {
  name: string
  description?: string
  organizationId: string
  leaderId?: string
  memberIds: string[]
}

export interface OrgMember extends BaseEntity {
  userId: string
  organizationId: string
  role: 'owner' | 'admin' | 'member'
  joinedAt: string
}

// --- Permission Types ---

export type PermissionAction = 'create' | 'read' | 'update' | 'delete' | 'manage'
export type ResourceType = 'project' | 'task' | 'document' | 'user' | 'org' | 'settings'

export interface Permission extends BaseEntity {
  name: string
  description?: string
  resource: ResourceType
  actions: PermissionAction[]
}

export interface Role extends BaseEntity {
  name: string
  description?: string
  organizationId: string
  permissions: Permission[]
  isDefault: boolean
}

// --- Project Types ---

export type ProjectStatus = 'active' | 'archived' | 'deleted'

export interface Project extends BaseEntity {
  name: string
  description?: string
  ownerId: string
  organizationId: string
  status: ProjectStatus
  color?: string
  icon?: string
  memberIds: string[]
}

export interface ProjectMember {
  userId: string
  projectId: string
  role: 'owner' | 'admin' | 'member' | 'viewer'
  joinedAt: string
}

// --- Task Types ---

export type TaskStatus = 'todo' | 'in_progress' | 'in_review' | 'done' | 'cancelled'
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent'

export interface Task extends BaseEntity {
  title: string
  description?: string
  projectId: string
  assigneeId?: string
  reporterId: string
  status: TaskStatus
  priority: TaskPriority
  dueDate?: string
  startDate?: string
  estimatedHours?: number
  tags: string[]
  parentId?: string
  order: number
}

export interface TaskComment extends BaseEntity {
  taskId: string
  authorId: string
  content: string
  mentions: string[]
}

// --- Kanban Types ---

export interface KanbanColumn extends BaseEntity {
  name: string
  projectId: string
  status: TaskStatus
  order: number
  limit?: number
  color?: string
}

export interface KanbanCard {
  task: Task
  columnId: string
  order: number
}

// --- Calendar Types ---

export interface CalendarEvent extends BaseEntity {
  title: string
  description?: string
  startTime: string
  endTime: string
  allDay: boolean
  projectId?: string
  taskId?: string
  attendeeIds: string[]
  location?: string
  color?: string
  recurrence?: RecurrenceRule
}

export interface RecurrenceRule {
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly'
  interval: number
  endDate?: string
  count?: number
}

// --- Document Types ---

export type DocumentStatus = 'draft' | 'published' | 'archived'

export interface Document extends BaseEntity {
  title: string
  content: string
  authorId: string
  projectId?: string
  status: DocumentStatus
  version: number
  parentId?: string
  tags: string[]
}

export interface DocumentVersion extends BaseEntity {
  documentId: string
  content: string
  version: number
  authorId: string
  changelog?: string
}

// --- Template Types ---

export interface Template extends BaseEntity {
  name: string
  description?: string
  content: string
  category: string
  authorId: string
  isPublic: boolean
  usageCount: number
}

// --- File Types ---

export type FileType = 'image' | 'document' | 'video' | 'audio' | 'archive' | 'other'

export interface FileAttachment extends BaseEntity {
  name: string
  type: FileType
  mimeType: string
  size: number
  url: string
  thumbnailUrl?: string
  uploaderId: string
  projectId?: string
  taskId?: string
  documentId?: string
}

// --- Workflow Types ---

export type WorkflowTrigger = 'manual' | 'on_create' | 'on_update' | 'on_status_change' | 'scheduled'

export interface Workflow extends BaseEntity {
  name: string
  description?: string
  projectId: string
  trigger: WorkflowTrigger
  isActive: boolean
  steps: WorkflowStep[]
}

export interface WorkflowStep {
  id: string
  type: 'action' | 'condition' | 'delay'
  config: Record<string, unknown>
  nextStepId?: string
}

// --- Notification Types ---

export type NotificationType = 'info' | 'success' | 'warning' | 'error'
export type NotificationChannel = 'in_app' | 'email' | 'push'

export interface Notification extends BaseEntity {
  userId: string
  type: NotificationType
  title: string
  message: string
  isRead: boolean
  link?: string
  metadata?: Record<string, unknown>
}

export interface NotificationPreference {
  userId: string
  channel: NotificationChannel
  enabled: boolean
  categories: string[]
}

// --- Audit Types ---

export interface AuditLog extends BaseEntity {
  userId: string
  action: string
  resource: ResourceType
  resourceId: string
  details: Record<string, unknown>
  ipAddress?: string
  userAgent?: string
}

// --- Integration Types ---

export type IntegrationType = 'webhook' | 'oauth' | 'api_key'

export interface Integration extends BaseEntity {
  name: string
  type: IntegrationType
  provider: string
  organizationId: string
  config: Record<string, unknown>
  isActive: boolean
}

export interface Webhook extends BaseEntity {
  name: string
  url: string
  events: string[]
  secret?: string
  isActive: boolean
  lastTriggeredAt?: string
}

export interface ApiKey extends BaseEntity {
  name: string
  key: string
  organizationId: string
  permissions: string[]
  expiresAt?: string
  lastUsedAt?: string
}

// --- Dashboard Types ---

export interface DashboardWidget {
  id: string
  type: 'stat' | 'chart' | 'list' | 'calendar'
  title: string
  config: Record<string, unknown>
  position: { x: number; y: number; w: number; h: number }
}

export interface DashboardConfig extends BaseEntity {
  userId: string
  widgets: DashboardWidget[]
  layout: 'grid' | 'list'
}

// --- Search Types ---

export interface SearchResult {
  id: string
  type: ResourceType
  title: string
  description?: string
  url: string
  score: number
  highlights: string[]
}

export interface SearchFilters {
  types?: ResourceType[]
  projectId?: string
  dateRange?: { start: string; end: string }
  authorId?: string
}

// --- Report Types ---

export type ReportType = 'project_summary' | 'task_status' | 'team_activity' | 'time_tracking'

export interface Report extends BaseEntity {
  name: string
  type: ReportType
  config: Record<string, unknown>
  schedule?: string
  lastGeneratedAt?: string
}

export interface ReportData {
  reportId: string
  generatedAt: string
  data: Record<string, unknown>
  charts?: ChartData[]
}

export interface ChartData {
  type: 'bar' | 'line' | 'pie' | 'donut'
  labels: string[]
  datasets: { label: string; data: number[]; color?: string }[]
}

// --- Settings Types ---

export interface SystemSettings {
  siteName: string
  logo?: string
  primaryColor: string
  allowSignup: boolean
  defaultRole: UserRole
  sessionTimeout: number
}

export interface UserSettings extends BaseEntity {
  userId: string
  theme: 'light' | 'dark' | 'system'
  language: string
  timezone: string
  notifications: NotificationPreference[]
}
