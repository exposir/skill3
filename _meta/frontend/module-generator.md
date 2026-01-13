---
id: module-generator
name: Module Generator
version: 1.0.0
description: 生成前端业务模块，包括代码结构、接口定义和 skill 文件
directory: _meta/frontend/
upstream:
  - project-init
downstream:
  - contracts
  - build
inputs:
  - name: name
    type: string
    required: true
    description: 模块名称 (如 auth, user, product)
  - name: type
    type: string
    required: false
    description: 模块类型 (feature/shared/core)，默认 feature
  - name: dependencies
    type: array
    required: false
    description: 依赖的其他模块
  - name: exports
    type: array
    required: false
    description: 模块导出的公共 API
outputs:
  - name: module_path
    type: string
    description: 模块路径
  - name: skill_path
    type: string
    description: 生成的 skill 文件路径
  - name: contract_path
    type: string
    description: 接口契约文件路径
created_by: manual
created_at: 2026-01-14
updated_at: 2026-01-14
tags:
  - meta
  - frontend
  - module
  - generator
---

# Module Generator - 模块生成器

> 生成标准化的前端业务模块，包括目录结构、基础代码、接口契约和对应的 skill 文件

## Context

模块生成器是前端开发 skill 系统的核心，负责：
1. 创建模块的标准目录结构
2. 生成基础代码文件
3. 创建模块对应的 skill 文件 (用于后续维护)
4. 定义模块接口契约
5. 注册模块到系统

## Module Types

```
┌─────────────────────────────────────────────────────────────────┐
│                       模块类型说明                               │
└─────────────────────────────────────────────────────────────────┘

┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   feature   │     │   shared    │     │    core     │
│  业务功能模块 │     │  共享功能模块 │     │  核心基础模块 │
└─────────────┘     └─────────────┘     └─────────────┘
      │                   │                   │
      │  auth             │  ui               │  api
      │  user             │  form             │  store
      │  product          │  table            │  router
      │  order            │  modal            │  i18n
      │  dashboard        │  notification     │  theme
      └───────────────────┴───────────────────┘
```

## Instructions

当用户调用 `/module-gen` 时，执行以下步骤：

### Step 1: 验证参数

```
name: 模块名称 (必需，小写字母和连字符)
type: feature | shared | core (默认: feature)
dependencies: ['api', 'store'] (可选)
exports: ['useAuth', 'AuthProvider'] (可选，自动推断)
```

### Step 2: 创建模块目录结构

在 `./src/modules/<name>/` 下创建：

```
src/modules/<name>/
├── index.ts                    # 模块公共导出
├── types.ts                    # 模块类型定义
├── constants.ts                # 模块常量
│
├── components/                 # React 组件
│   ├── index.ts
│   └── <Name>Container.tsx    # 主容器组件
│
├── hooks/                      # React Hooks
│   ├── index.ts
│   └── use<Name>.ts           # 主 Hook
│
├── services/                   # 业务服务
│   ├── index.ts
│   └── <name>.service.ts
│
├── store/                      # 状态管理 (如果需要)
│   ├── index.ts
│   ├── <name>.slice.ts
│   └── <name>.selectors.ts
│
├── utils/                      # 模块工具函数
│   └── index.ts
│
└── __tests__/                  # 测试文件
    └── <name>.test.ts
```

### Step 3: 生成基础代码

#### index.ts (模块入口)
```typescript
/**
 * @module <Name>
 * @description <模块描述>
 *
 * @exports
 * - Components: <Name>Container
 * - Hooks: use<Name>
 * - Services: <name>Service
 * - Types: <Name>State, <Name>Config
 *
 * @dependencies
 * - @modules/api
 * - @modules/store
 *
 * @skill skill-module-<name>
 * @contract <name>.contract.ts
 */

// Components
export { <Name>Container } from './components'

// Hooks
export { use<Name> } from './hooks'

// Services
export { <name>Service } from './services'

// Types
export type { <Name>State, <Name>Config, <Name>Props } from './types'

// Constants
export { <NAME>_CONSTANTS } from './constants'
```

#### types.ts (类型定义)
```typescript
/**
 * <Name> Module Types
 * @module <Name>
 */

/** 模块状态 */
export interface <Name>State {
  isLoading: boolean
  error: string | null
  data: <Name>Data | null
}

/** 模块数据 */
export interface <Name>Data {
  id: string
  // TODO: 添加具体字段
}

/** 模块配置 */
export interface <Name>Config {
  enabled: boolean
  // TODO: 添加配置项
}

/** 组件 Props */
export interface <Name>Props {
  className?: string
  // TODO: 添加 props
}
```

#### hooks/use<Name>.ts
```typescript
import { useState, useCallback } from 'react'
import type { <Name>State } from '../types'
import { <name>Service } from '../services'

/**
 * use<Name> - <Name> 模块主 Hook
 *
 * @example
 * const { data, isLoading, fetch<Name> } = use<Name>()
 */
export function use<Name>() {
  const [state, setState] = useState<<Name>State>({
    isLoading: false,
    error: null,
    data: null
  })

  const fetch<Name> = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))
    try {
      const data = await <name>Service.fetch()
      setState({ isLoading: false, error: null, data })
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }))
    }
  }, [])

  return {
    ...state,
    fetch<Name>
  }
}
```

#### components/<Name>Container.tsx
```typescript
import React from 'react'
import { use<Name> } from '../hooks'
import type { <Name>Props } from '../types'

/**
 * <Name>Container - <Name> 模块主容器组件
 */
export function <Name>Container({ className }: <Name>Props) {
  const { data, isLoading, error } = use<Name>()

  if (isLoading) {
    return <div className={className}>Loading...</div>
  }

  if (error) {
    return <div className={className}>Error: {error}</div>
  }

  return (
    <div className={className}>
      {/* TODO: 实现组件内容 */}
      <h2><Name> Module</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
```

#### services/<name>.service.ts
```typescript
import type { <Name>Data } from '../types'

/**
 * <Name> Service - 业务逻辑服务
 */
export const <name>Service = {
  /**
   * 获取数据
   */
  async fetch(): Promise<<Name>Data> {
    // TODO: 实现 API 调用
    // import { apiClient } from '@modules/api'
    // return apiClient.get('/<name>')

    return {
      id: '1',
      // TODO: 返回实际数据
    }
  },

  /**
   * 创建数据
   */
  async create(data: Partial<<Name>Data>): Promise<<Name>Data> {
    // TODO: 实现
    throw new Error('Not implemented')
  },

  /**
   * 更新数据
   */
  async update(id: string, data: Partial<<Name>Data>): Promise<<Name>Data> {
    // TODO: 实现
    throw new Error('Not implemented')
  },

  /**
   * 删除数据
   */
  async delete(id: string): Promise<void> {
    // TODO: 实现
    throw new Error('Not implemented')
  }
}
```

### Step 4: 生成接口契约

创建 `./src/contracts/<name>.contract.ts`:

```typescript
/**
 * <Name> Module Contract
 *
 * 定义模块的公共接口，其他模块通过此契约与本模块交互。
 *
 * @module <Name>
 * @version 1.0.0
 */

// ==================== 类型导出 ====================

/** 模块状态类型 */
export type { <Name>State, <Name>Data, <Name>Config } from '@modules/<name>/types'

// ==================== 接口定义 ====================

/**
 * <Name> 模块公共 API
 */
export interface I<Name>Module {
  /** 获取当前状态 */
  getState(): <Name>State

  /** 获取数据 */
  fetch(): Promise<<Name>Data>

  /** 订阅状态变化 */
  subscribe(callback: (state: <Name>State) => void): () => void
}

// ==================== 事件定义 ====================

/** 模块事件类型 */
export type <Name>Events = {
  '<name>:loaded': { data: <Name>Data }
  '<name>:error': { error: string }
  '<name>:updated': { data: <Name>Data }
}

// ==================== 依赖声明 ====================

/**
 * 本模块依赖的其他模块
 */
export interface <Name>Dependencies {
  api?: typeof import('@modules/api')
  store?: typeof import('@modules/store')
}

// ==================== 导出声明 ====================

/**
 * 本模块导出的公共 API
 */
export const <NAME>_EXPORTS = {
  components: ['<Name>Container'],
  hooks: ['use<Name>'],
  services: ['<name>Service'],
  types: ['<Name>State', '<Name>Data', '<Name>Config', '<Name>Props']
} as const
```

### Step 5: 生成模块 Skill

创建 `./_generated/skill-module-<name>.md`:

```markdown
---
id: skill-module-<name>
name: <Name> Module
version: 1.0.0
description: <Name> 业务模块 - 负责 <描述>
directory: _generated/
module_path: src/modules/<name>/
contract_path: src/contracts/<name>.contract.ts
upstream:
  - <依赖模块>
downstream:
  - <下游模块>
inputs:
  - name: action
    type: string
    required: true
    description: 操作类型 (implement/refactor/fix/extend)
  - name: requirement
    type: string
    required: true
    description: 具体需求描述
outputs:
  - name: files_modified
    type: array
    description: 修改的文件列表
  - name: exports_added
    type: array
    description: 新增的导出
created_by: module-generator
created_at: <date>
updated_at: <date>
tags:
  - module
  - <name>
  - frontend
---

# <Name> Module Skill

> 维护 <Name> 模块的代码实现

## Module Info

- **路径**: `src/modules/<name>/`
- **契约**: `src/contracts/<name>.contract.ts`
- **类型**: feature

## Instructions

当用户需要修改 <Name> 模块时，执行以下步骤：

### action: implement

实现新功能：
1. 读取需求描述
2. 检查契约定义
3. 在对应目录下添加/修改代码
4. 更新 index.ts 导出
5. 更新契约文件 (如果接口变更)
6. 添加测试

### action: refactor

重构代码：
1. 分析现有代码
2. 保持接口不变
3. 优化内部实现
4. 确保测试通过

### action: fix

修复问题：
1. 定位问题代码
2. 修复 bug
3. 添加回归测试

### action: extend

扩展功能：
1. 检查是否需要修改契约
2. 添加新的组件/hooks/services
3. 更新导出

## Communication

### With Other Modules

通过契约文件与其他模块通信：

```typescript
// 其他模块引用本模块
import { use<Name>, <Name>Container } from '@modules/<name>'
import type { <Name>Data } from '@contracts/<name>.contract'
```

### State Updates

更新 state.json:
```json
{
  "data": {
    "skill-module-<name>": {
      "status": "completed",
      "output": {
        "files_modified": ["..."],
        "exports_added": ["..."]
      }
    }
  }
}
```
```

### Step 6: 注册模块

更新 `./src/modules/registry.json`:

```json
{
  "modules": {
    "<name>": {
      "name": "<Name>",
      "type": "feature",
      "path": "src/modules/<name>",
      "contract": "src/contracts/<name>.contract.ts",
      "skill": "_generated/skill-module-<name>.md",
      "dependencies": [],
      "exports": ["<Name>Container", "use<Name>", "<name>Service"],
      "version": "1.0.0",
      "status": "active"
    }
  },
  "dependencies": {
    "<name>": []
  },
  "build_order": ["<name>"]
}
```

### Step 7: 更新 skills.json

添加新的模块 skill 到注册表。

### Step 8: 报告结果

```
✅ 模块 <Name> 创建完成!

📁 模块结构:
   src/modules/<name>/
   ├── index.ts
   ├── types.ts
   ├── components/
   ├── hooks/
   ├── services/
   └── __tests__/

📄 生成的文件:
   ├── src/contracts/<name>.contract.ts  (接口契约)
   └── _generated/skill-module-<name>.md (模块 Skill)

📤 导出的 API:
   ├── <Name>Container  (组件)
   ├── use<Name>        (Hook)
   └── <name>Service    (服务)

🔗 依赖关系:
   ├── 上游: [无]
   └── 下游: [无]

🚀 下一步:
   1. 实现具体业务逻辑: /skill-module-<name> action=implement
   2. 添加依赖模块: /module-gen name="api"
   3. 运行构建验证: /build
```

## Error Handling

- **模块已存在**: 询问是否覆盖或合并
- **无效名称**: 报告命名规范
- **循环依赖**: 检测并拒绝

## Examples

### Example 1: 创建认证模块

```
/module-gen name="auth" type="feature" exports=["useAuth", "AuthProvider", "AuthGuard"]
```

### Example 2: 创建 API 模块

```
/module-gen name="api" type="core"
```

### Example 3: 创建依赖其他模块的模块

```
/module-gen name="user" type="feature" dependencies=["auth", "api"]
```
