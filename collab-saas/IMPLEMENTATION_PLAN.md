# 项目协作 SaaS 完整实施计划

> 使用 Darwin 元能力构建 20+ 模块的大型项目协作 SaaS 平台

---

## 实施总览

| Phase | 目标 | 产出 | 状态 |
|-------|------|------|------|
| Phase 0 | 验证元能力 | 1 个 Skill + 基础项目 | ✅ 已完成 |
| Phase 1 | 扩展 Skills | 3 个新 Skills | ✅ 已完成 |
| Phase 2 | 完善项目结构 | 4 个子应用 | ✅ 已完成 |
| Phase 3 | 共享层构建 | 6 个共享包 | ✅ 已完成 |
| Phase 4 | 业务模块开发 | 18 个模块 | ⏳ 待执行 |
| Phase 5 | 集成验证 | 可部署应用 | ⏳ 待执行 |

---

## Phase 0: 最小可行验证 ✅ 已完成

**目标**: 验证 Darwin 元能力是否能支撑微前端架构

### 0.1 创建 mf-init skill ✅

使用 Genesis 创建微前端初始化 skill

```
skill-003-mf-init
├── 源文件: _generated/skill-003-mf-init.md
├── Claude Code: .claude/skills/mf-init/SKILL.md
├── 功能:
│   ├── 创建 Monorepo 根目录配置
│   ├── 配置 pnpm-workspace.yaml
│   ├── 配置 turbo.json
│   ├── 创建 Host 主应用
│   ├── 创建 Remote 子应用
│   └── 创建共享包结构
└── 状态: ✅ 已创建并注册
```

### 0.2 初始化微前端项目 ✅

使用 mf-init skill 创建项目结构

```
collab-saas/
├── package.json              # Monorepo 根配置
├── pnpm-workspace.yaml       # 工作空间配置
├── turbo.json                # Turborepo 配置
├── tsconfig.base.json        # 基础 TS 配置
│
├── apps/
│   ├── host/                 # 主应用 (:3000)
│   │   ├── package.json
│   │   ├── vite.config.ts    # Federation host
│   │   ├── tsconfig.json
│   │   ├── index.html
│   │   └── src/
│   │       ├── main.tsx
│   │       ├── App.tsx
│   │       ├── index.css
│   │       └── remotes.d.ts
│   │
│   └── portal/               # 子应用 (:3001)
│       ├── package.json
│       ├── vite.config.ts    # Federation remote
│       ├── tsconfig.json
│       ├── index.html
│       └── src/
│           ├── main.tsx
│           └── App.tsx
│
└── packages/
    ├── shared-types/         # 共享类型
    │   ├── package.json
    │   ├── tsconfig.json
    │   └── src/index.ts
    │
    ├── shared-utils/         # 工具函数
    │   ├── package.json
    │   ├── tsconfig.json
    │   └── src/index.ts
    │
    └── shared-ui/            # UI 组件
        ├── package.json
        ├── tsconfig.json
        └── src/
            ├── index.ts
            └── components/
                ├── Button.tsx
                ├── Card.tsx
                └── Loading.tsx
```

**验证结果:**
- ✅ 依赖安装成功 (78 packages)
- ✅ 类型检查通过 (5/5 packages)

### 0.3 创建 auth 模块 ✅

使用 module-generator 创建认证模块

```
apps/portal/src/modules/auth/
├── index.ts                  # 模块入口
├── types.ts                  # 类型定义
├── constants.ts              # 常量
│
├── components/
│   ├── index.ts
│   ├── AuthProvider.tsx      # 认证上下文
│   ├── AuthGuard.tsx         # 路由守卫
│   └── LoginForm.tsx         # 登录表单
│
├── hooks/
│   ├── index.ts
│   └── useAuth.ts            # 认证 Hook
│
├── services/
│   ├── index.ts
│   └── auth.service.ts       # 认证 API
│
├── store/                    # (预留)
├── utils/                    # (预留)
└── __tests__/                # (预留)
```

**模块导出:**
- 组件: `LoginForm`, `AuthProvider`, `AuthGuard`
- Hooks: `useAuth`, `useAuthContext`
- 服务: `authService`
- 类型: `AuthState`, `LoginCredentials`, `RegisterData`, `AuthContextValue`

### 0.4 验证契约 ✅

创建并验证 auth 模块契约

```
apps/portal/src/contracts/auth.contract.ts
├── 类型导出: AuthState, LoginCredentials, RegisterData
├── 接口定义: IAuthModule
├── 事件定义: AuthEvents
├── 依赖声明: AuthDependencies
└── 导出声明: AUTH_EXPORTS
```

**验证结果:**
- ✅ 模块导出与契约定义一致
- ✅ 所有类型正确导出

### 0.5 验证构建 ✅

运行完整构建验证

```bash
$ pnpm typecheck
Tasks:    5 successful, 5 total
Time:     4.197s

$ pnpm build
@collab-saas/portal: ✓ built in 779ms
@collab-saas/host:   ✓ built in 793ms
Tasks:    2 successful, 2 total
Time:     3.727s
```

**构建产物:**
```
Host 应用:
├── dist/index.html                           0.38 kB
├── dist/assets/style-*.css                   0.92 kB
├── dist/assets/index-*.js                    6.61 kB
└── dist/assets/__federation_shared_*.js    ~400 kB

Portal 应用:
├── dist/index.html                           0.31 kB
├── dist/assets/remoteEntry.js                3.37 kB
├── dist/assets/__federation_expose_App-*.js  2.67 kB
└── dist/assets/__federation_shared_*.js    ~400 kB
```

### Phase 0 验收结果

| 验收标准 | 状态 |
|----------|------|
| mf-init skill 成功创建并可用 | ✅ |
| 微前端项目结构正确 (host + portal) | ✅ |
| auth 模块包含完整结构 | ✅ |
| TypeScript 类型检查通过 | ✅ (5/5 包) |
| 构建成功 | ✅ (2/2 应用) |

### Phase 0 产出统计

| 类别 | 数量 | 详情 |
|------|------|------|
| 新 Skills | 1 | skill-003-mf-init |
| 应用 | 2 | host, portal |
| 共享包 | 3 | shared-types, shared-utils, shared-ui |
| 业务模块 | 1 | auth |
| 契约文件 | 1 | auth.contract.ts |
| 总文件数 | ~40 | 配置 + 代码 + 类型 |

---

## Phase 1: 扩展 Skills (元能力增强)

**目标**: 创建支持大规模开发的新 Skills

### 1.1 创建 app-generator skill

用于生成子应用（portal, workspace, docs, admin）

```markdown
skill-004-app-generator
├── 输入: app_name, app_type, port, modules[]
├── 输出: 完整子应用结构
└── 功能:
    ├── 创建子应用目录结构
    ├── 配置 Module Federation remote
    ├── 生成路由配置
    └── 注册到 host
```

### 1.2 创建 shared-lib skill

用于生成共享库

```markdown
skill-005-shared-lib
├── 输入: lib_name, lib_type, exports[]
├── 输出: 共享包结构
└── 功能:
    ├── 创建包目录结构
    ├── 配置 package.json
    ├── 生成入口文件
    └── 配置类型导出
```

### 1.3 创建 batch-module skill

用于批量生成模块

```markdown
skill-006-batch-module
├── 输入: modules[] (模块定义数组)
├── 输出: 批量生成的模块
└── 功能:
    ├── 解析模块依赖图
    ├── 按拓扑顺序生成
    ├── 自动创建契约
    └── 更新注册表
```

---

## Phase 2: 完善项目结构 (子应用创建)

**目标**: 创建完整的 4 个子应用

### 2.1 子应用规划

| 子应用 | 端口 | 路由前缀 | 包含模块 |
|--------|------|----------|----------|
| portal | 3001 | `/` | dashboard, notification, search |
| workspace | 3002 | `/workspace` | project, task, kanban, calendar, comment, file, workflow |
| docs | 3003 | `/docs` | document, template |
| admin | 3004 | `/admin` | user, org, permission, audit, settings, report, integration |

### 2.2 创建步骤

```
Step 2.1: 用 app-generator 创建 workspace 子应用
Step 2.2: 用 app-generator 创建 docs 子应用
Step 2.3: 用 app-generator 创建 admin 子应用
Step 2.4: 更新 host 的 remotes 配置
Step 2.5: 验证所有子应用可独立启动
```

### 2.3 Host remotes 配置

```typescript
// apps/host/vite.config.ts
federation({
  name: 'host',
  remotes: {
    portal: 'http://localhost:3001/assets/remoteEntry.js',
    workspace: 'http://localhost:3002/assets/remoteEntry.js',
    docs: 'http://localhost:3003/assets/remoteEntry.js',
    admin: 'http://localhost:3004/assets/remoteEntry.js',
  },
  shared: ['react', 'react-dom', 'react-router-dom', 'zustand']
})
```

---

## Phase 3: 共享层构建 (共享包完善)

**目标**: 构建完整的共享基础设施

### 3.1 共享包规划

| 包名 | 功能 | 依赖 |
|------|------|------|
| shared-types | 全局类型定义 | - |
| shared-utils | 工具函数 | shared-types |
| shared-hooks | 共享 Hooks | shared-types, shared-utils |
| shared-services | API 服务层 | shared-types |
| shared-ui | UI 组件库 | shared-types, shared-utils |
| shared-store | 全局状态管理 | shared-types, zustand |

### 3.2 创建步骤

```
Step 3.1: 扩展 shared-types (添加所有业务类型)
Step 3.2: 扩展 shared-utils (添加更多工具函数)
Step 3.3: 用 shared-lib 创建 shared-hooks
Step 3.4: 用 shared-lib 创建 shared-services
Step 3.5: 扩展 shared-ui (添加更多组件)
Step 3.6: 用 shared-lib 创建 shared-store
Step 3.7: 验证所有包类型检查通过
```

### 3.3 shared-types 完整类型

```typescript
// 用户相关
export interface User { ... }
export interface Organization { ... }
export interface Permission { ... }

// 项目相关
export interface Project { ... }
export interface Task { ... }
export interface Comment { ... }

// 文档相关
export interface Document { ... }
export interface Template { ... }

// 通用类型
export interface ApiResponse<T> { ... }
export interface PaginatedResponse<T> { ... }
```

---

## Phase 4: 业务模块开发 (核心功能)

**目标**: 创建 18 个业务模块 (auth 已完成)

### 4.1 模块依赖层级

```
Layer 1: 基础层 (已完成)
└── auth ✅

Layer 2: 核心层 (6 个模块)
├── user (依赖 auth)
├── org (依赖 user)
├── permission (依赖 org)
├── notification (依赖 auth)
├── audit (依赖 user)
└── integration (依赖 auth)

Layer 3: 业务层 (12 个模块)
├── project (依赖 permission, notification)
├── task (依赖 project)
├── kanban (依赖 task)
├── calendar (依赖 task)
├── comment (依赖 task)
├── file (依赖 project)
├── workflow (依赖 project)
├── document (依赖 permission)
├── template (依赖 document)
├── dashboard (依赖 project, task)
├── search (依赖 project, document)
├── report (依赖 project, task)
└── settings (依赖 permission)
```

### 4.2 Layer 2 模块详情

#### user 模块
```
apps/admin/src/modules/user/
├── 功能: 用户管理、用户列表、用户详情、用户编辑
├── 组件: UserList, UserDetail, UserForm, UserAvatar
├── Hooks: useUser, useUsers
├── Services: userService (CRUD)
└── 契约: user.contract.ts
```

#### org 模块
```
apps/admin/src/modules/org/
├── 功能: 组织管理、团队管理、成员管理
├── 组件: OrgList, OrgDetail, TeamList, MemberList
├── Hooks: useOrg, useTeam
├── Services: orgService
└── 契约: org.contract.ts
```

#### permission 模块
```
apps/admin/src/modules/permission/
├── 功能: 角色管理、权限配置、访问控制
├── 组件: RoleList, RoleForm, PermissionMatrix
├── Hooks: usePermission, useRoles
├── Services: permissionService
└── 契约: permission.contract.ts
```

#### notification 模块
```
apps/portal/src/modules/notification/
├── 功能: 通知中心、消息列表、通知设置
├── 组件: NotificationList, NotificationItem, NotificationBell
├── Hooks: useNotifications
├── Services: notificationService
└── 契约: notification.contract.ts
```

#### audit 模块
```
apps/admin/src/modules/audit/
├── 功能: 审计日志、操作记录、安全事件
├── 组件: AuditLog, AuditDetail, AuditFilter
├── Hooks: useAuditLogs
├── Services: auditService
└── 契约: audit.contract.ts
```

#### integration 模块
```
apps/admin/src/modules/integration/
├── 功能: 第三方集成、Webhook、API Key
├── 组件: IntegrationList, WebhookForm, ApiKeyManager
├── Hooks: useIntegrations
├── Services: integrationService
└── 契约: integration.contract.ts
```

### 4.3 Layer 3 模块详情

#### project 模块
```
apps/workspace/src/modules/project/
├── 功能: 项目列表、项目详情、项目设置
├── 组件: ProjectList, ProjectCard, ProjectForm, ProjectHeader
├── Hooks: useProject, useProjects
├── Services: projectService
└── 契约: project.contract.ts
```

#### task 模块
```
apps/workspace/src/modules/task/
├── 功能: 任务管理、任务详情、任务分配
├── 组件: TaskList, TaskDetail, TaskForm, TaskCard
├── Hooks: useTask, useTasks
├── Services: taskService
└── 契约: task.contract.ts
```

#### kanban 模块
```
apps/workspace/src/modules/kanban/
├── 功能: 看板视图、拖拽排序、泳道管理
├── 组件: KanbanBoard, KanbanColumn, KanbanCard
├── Hooks: useKanban
├── Services: kanbanService
└── 契约: kanban.contract.ts
```

#### calendar 模块
```
apps/workspace/src/modules/calendar/
├── 功能: 日历视图、日程安排、提醒
├── 组件: Calendar, CalendarEvent, CalendarHeader
├── Hooks: useCalendar
├── Services: calendarService
└── 契约: calendar.contract.ts
```

#### comment 模块
```
apps/workspace/src/modules/comment/
├── 功能: 评论列表、评论回复、@提及
├── 组件: CommentList, CommentForm, CommentItem
├── Hooks: useComments
├── Services: commentService
└── 契约: comment.contract.ts
```

#### file 模块
```
apps/workspace/src/modules/file/
├── 功能: 文件上传、文件列表、文件预览
├── 组件: FileList, FileUploader, FilePreview
├── Hooks: useFiles
├── Services: fileService
└── 契约: file.contract.ts
```

#### workflow 模块
```
apps/workspace/src/modules/workflow/
├── 功能: 工作流定义、流程执行、状态流转
├── 组件: WorkflowDesigner, WorkflowList, WorkflowRunner
├── Hooks: useWorkflow
├── Services: workflowService
└── 契约: workflow.contract.ts
```

#### document 模块
```
apps/docs/src/modules/document/
├── 功能: 文档编辑、文档列表、版本历史
├── 组件: DocumentEditor, DocumentList, DocumentHeader
├── Hooks: useDocument
├── Services: documentService
└── 契约: document.contract.ts
```

#### template 模块
```
apps/docs/src/modules/template/
├── 功能: 模板管理、模板应用、模板分类
├── 组件: TemplateList, TemplateCard, TemplateEditor
├── Hooks: useTemplates
├── Services: templateService
└── 契约: template.contract.ts
```

#### dashboard 模块
```
apps/portal/src/modules/dashboard/
├── 功能: 仪表盘、数据统计、快捷入口
├── 组件: DashboardGrid, StatCard, RecentActivity
├── Hooks: useDashboard
├── Services: dashboardService
└── 契约: dashboard.contract.ts
```

#### search 模块
```
apps/portal/src/modules/search/
├── 功能: 全局搜索、搜索结果、筛选器
├── 组件: SearchBar, SearchResults, SearchFilter
├── Hooks: useSearch
├── Services: searchService
└── 契约: search.contract.ts
```

#### report 模块
```
apps/admin/src/modules/report/
├── 功能: 报表生成、数据导出、图表展示
├── 组件: ReportList, ReportChart, ReportExport
├── Hooks: useReport
├── Services: reportService
└── 契约: report.contract.ts
```

#### settings 模块
```
apps/admin/src/modules/settings/
├── 功能: 系统设置、偏好配置、主题设置
├── 组件: SettingsForm, SettingsSection, ThemePicker
├── Hooks: useSettings
├── Services: settingsService
└── 契约: settings.contract.ts
```

### 4.4 执行步骤

```
=== Layer 2 (可并行) ===
Step 4.1: 创建 user 模块 (admin)
Step 4.2: 创建 notification 模块 (portal)
Step 4.3: 创建 integration 模块 (admin)

=== Layer 2 (依赖 user) ===
Step 4.4: 创建 org 模块 (admin)
Step 4.5: 创建 audit 模块 (admin)

=== Layer 2 (依赖 org) ===
Step 4.6: 创建 permission 模块 (admin)

=== Layer 3 (可并行) ===
Step 4.7: 创建 project 模块 (workspace)
Step 4.8: 创建 document 模块 (docs)
Step 4.9: 创建 dashboard 模块 (portal)
Step 4.10: 创建 settings 模块 (admin)

=== Layer 3 (依赖 project) ===
Step 4.11: 创建 task 模块 (workspace)
Step 4.12: 创建 file 模块 (workspace)
Step 4.13: 创建 workflow 模块 (workspace)

=== Layer 3 (依赖 task) ===
Step 4.14: 创建 kanban 模块 (workspace)
Step 4.15: 创建 calendar 模块 (workspace)
Step 4.16: 创建 comment 模块 (workspace)

=== Layer 3 (依赖 document) ===
Step 4.17: 创建 template 模块 (docs)

=== Layer 3 (依赖 project, task, document) ===
Step 4.18: 创建 search 模块 (portal)
Step 4.19: 创建 report 模块 (admin)
```

---

## Phase 5: 集成验证 (最终验收)

**目标**: 完成所有验证，确保系统可部署

### 5.1 验证清单

```
Step 5.1: 验证所有模块契约一致性
         └── /contracts action=validate

Step 5.2: 运行全量类型检查
         └── pnpm typecheck

Step 5.3: 运行单元测试
         └── pnpm test

Step 5.4: 构建所有子应用
         └── pnpm build

Step 5.5: 启动所有应用验证运行时
         └── pnpm dev (5 个端口)

Step 5.6: 验证 Module Federation 加载
         └── 访问 http://localhost:3000

Step 5.7: 验证路由跳转
         └── Host -> Portal -> Workspace -> Docs -> Admin
```

### 5.2 最终验收标准

| 标准 | 目标 |
|------|------|
| 应用数量 | 5 个 (host + 4 remotes) |
| 模块数量 | 19 个 (auth + 18 业务模块) |
| 共享包数量 | 6 个 |
| TypeScript 错误 | 0 |
| 构建成功率 | 100% |
| 契约验证 | 全部通过 |

---

## 完整模块清单

| # | 模块 | 子应用 | 依赖 | 状态 |
|---|------|--------|------|------|
| 1 | auth | portal | - | ✅ 已完成 |
| 2 | user | admin | auth | ⏳ 待创建 |
| 3 | org | admin | user | ⏳ 待创建 |
| 4 | permission | admin | org | ⏳ 待创建 |
| 5 | notification | portal | auth | ⏳ 待创建 |
| 6 | audit | admin | user | ⏳ 待创建 |
| 7 | integration | admin | auth | ⏳ 待创建 |
| 8 | project | workspace | permission, notification | ⏳ 待创建 |
| 9 | task | workspace | project | ⏳ 待创建 |
| 10 | kanban | workspace | task | ⏳ 待创建 |
| 11 | calendar | workspace | task | ⏳ 待创建 |
| 12 | comment | workspace | task | ⏳ 待创建 |
| 13 | file | workspace | project | ⏳ 待创建 |
| 14 | workflow | workspace | project | ⏳ 待创建 |
| 15 | document | docs | permission | ⏳ 待创建 |
| 16 | template | docs | document | ⏳ 待创建 |
| 17 | dashboard | portal | project, task | ⏳ 待创建 |
| 18 | search | portal | project, document | ⏳ 待创建 |
| 19 | report | admin | project, task | ⏳ 待创建 |
| 20 | settings | admin | permission | ⏳ 待创建 |

---

## 执行命令参考

```bash
# 开发
pnpm dev                    # 启动所有应用
pnpm --filter @collab-saas/host dev  # 仅启动 host

# 构建
pnpm build                  # 构建所有应用
pnpm typecheck              # 类型检查

# 验证
pnpm test                   # 运行测试
pnpm lint                   # 代码检查

# 清理
pnpm clean                  # 清理构建产物
```

---

## 下一步行动

确认后开始执行 Phase 1，创建 3 个新 Skills：
1. `skill-004-app-generator`
2. `skill-005-shared-lib`
3. `skill-006-batch-module`
