---
id: project-init
name: Project Initializer
version: 1.0.0
description: 初始化大型前端项目结构，创建基础配置和目录
directory: _meta/frontend/
upstream: []
downstream:
  - module-generator
  - contracts
inputs:
  - name: project_name
    type: string
    required: true
    description: 项目名称
  - name: framework
    type: string
    required: false
    description: 前端框架 (react/vue/svelte)，默认 react
  - name: features
    type: array
    required: false
    description: 启用的特性 (typescript, tailwind, router, store, api)
outputs:
  - name: project_structure
    type: object
    description: 生成的项目结构
  - name: config_files
    type: array
    description: 生成的配置文件列表
created_by: manual
created_at: 2026-01-14
updated_at: 2026-01-14
tags:
  - meta
  - frontend
  - init
  - core
---

# Project Initializer - 项目初始化器

> 初始化大型前端项目的完整结构，包括配置文件、目录结构和基础代码

## Context

这是前端开发 skill 系统的入口点。它负责：
1. 创建标准化的项目目录结构
2. 生成配置文件 (package.json, tsconfig.json, vite.config.ts 等)
3. 初始化模块注册表
4. 设置构建和开发环境

## Instructions

当用户调用 `/project-init` 时，执行以下步骤：

### Step 1: 解析参数

```
project_name: 项目名称 (必需)
framework: react | vue | svelte (默认: react)
features: ['typescript', 'tailwind', 'router', 'store', 'api']
```

### Step 2: 创建目录结构

在 `./src/` 目录下创建以下结构：

```
src/
├── modules/                    # 业务模块目录
│   └── .gitkeep
│
├── shared/                     # 共享代码
│   ├── components/            # 公共组件
│   ├── hooks/                 # 公共 hooks
│   ├── utils/                 # 工具函数
│   ├── types/                 # 公共类型
│   └── constants/             # 常量定义
│
├── contracts/                  # 模块接口契约
│   └── index.ts               # 契约导出
│
├── app/                        # 应用入口
│   ├── App.tsx
│   ├── main.tsx
│   └── routes.tsx
│
└── assets/                     # 静态资源
    ├── styles/
    └── images/
```

### Step 3: 生成配置文件

#### package.json
```json
{
  "name": "<project_name>",
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint src --ext .ts,.tsx",
    "type-check": "tsc --noEmit",
    "test": "vitest"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.0.0",
    "typescript": "^5.0.0",
    "vite": "^5.0.0",
    "vitest": "^1.0.0",
    "eslint": "^8.0.0"
  }
}
```

#### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@modules/*": ["src/modules/*"],
      "@shared/*": ["src/shared/*"],
      "@contracts/*": ["src/contracts/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

#### vite.config.ts
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@modules': path.resolve(__dirname, './src/modules'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@contracts': path.resolve(__dirname, './src/contracts')
    }
  }
})
```

### Step 4: 创建模块注册表

创建 `./src/modules/registry.json`:

```json
{
  "version": "1.0.0",
  "modules": {},
  "dependencies": {},
  "build_order": []
}
```

### Step 5: 创建基础入口文件

#### src/app/main.tsx
```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/global.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

#### src/app/App.tsx
```typescript
import React from 'react'

function App() {
  return (
    <div className="app">
      <h1>Welcome to {PROJECT_NAME}</h1>
      <p>Start building your modules!</p>
    </div>
  )
}

export default App
```

### Step 6: 更新状态

更新 `./context/state.json`:

```json
{
  "data": {
    "project-init": {
      "status": "completed",
      "output": {
        "project_name": "<name>",
        "framework": "react",
        "structure": {
          "src": ["modules", "shared", "contracts", "app", "assets"],
          "config": ["package.json", "tsconfig.json", "vite.config.ts"]
        },
        "ready_for_modules": true
      }
    }
  }
}
```

### Step 7: 报告结果

向用户展示：

```
✅ 项目初始化完成!

📁 项目结构:
   src/
   ├── modules/      (业务模块)
   ├── shared/       (共享代码)
   ├── contracts/    (接口契约)
   ├── app/          (应用入口)
   └── assets/       (静态资源)

📄 配置文件:
   ├── package.json
   ├── tsconfig.json
   └── vite.config.ts

🚀 下一步:
   1. 运行 /module-gen name="auth" 创建认证模块
   2. 运行 /module-gen name="api" 创建 API 模块
   3. 运行 /build 验证项目构建
```

## Communication

### Writing State
```json
{
  "data": {
    "project-init": {
      "status": "completed",
      "output": {
        "project_name": "...",
        "framework": "...",
        "ready_for_modules": true
      }
    }
  }
}
```

## Error Handling

- **目录已存在**: 询问是否覆盖
- **权限不足**: 报告错误，提供手动创建指南
- **依赖安装失败**: 继续创建结构，提示手动安装

## Examples

### Example 1: 基本初始化

```
/project-init project_name="my-app"
```

### Example 2: 完整配置

```
/project-init project_name="enterprise-app" framework="react" features=["typescript", "tailwind", "router", "store", "api"]
```
