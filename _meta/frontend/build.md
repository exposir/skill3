---
id: build
name: Build Validator
version: 1.0.0
description: 验证项目构建、类型检查、代码质量和测试
directory: _meta/frontend/
upstream:
  - contracts
  - module-generator
downstream: []
inputs:
  - name: action
    type: string
    required: true
    description: 操作类型 (check/build/test/lint/all)
  - name: module
    type: string
    required: false
    description: 目标模块 (可选，默认全部)
  - name: fix
    type: boolean
    required: false
    description: 是否自动修复问题
outputs:
  - name: success
    type: boolean
    description: 是否成功
  - name: errors
    type: array
    description: 错误列表
  - name: warnings
    type: array
    description: 警告列表
created_by: manual
created_at: 2026-01-14
updated_at: 2026-01-14
tags:
  - meta
  - frontend
  - build
  - quality
---

# Build Validator - 构建验证器

> 验证项目构建、类型检查、代码质量和测试，确保代码质量

## Context

构建验证器是代码质量的守门人，负责：
1. TypeScript 类型检查
2. ESLint 代码规范检查
3. 单元测试运行
4. 构建验证
5. 模块依赖检查

## Build Pipeline

```
┌─────────────────────────────────────────────────────────────────┐
│                       构建验证流水线                             │
└─────────────────────────────────────────────────────────────────┘

    ┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐
    │  Lint   │────▶│  Type   │────▶│  Test   │────▶│  Build  │
    │ ESLint  │     │  Check  │     │ Vitest  │     │  Vite   │
    └────┬────┘     └────┬────┘     └────┬────┘     └────┬────┘
         │               │               │               │
         ▼               ▼               ▼               ▼
    ┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐
    │ 代码风格 │     │ 类型安全 │     │ 功能正确 │     │ 产物生成 │
    └─────────┘     └─────────┘     └─────────┘     └─────────┘

    任一步骤失败 → 停止流水线，报告错误
```

## Instructions

当用户调用 `/build` 时，根据 action 参数执行相应操作：

### Action: lint

运行 ESLint 检查：

```
/build action=lint
```

执行：
```bash
npx eslint src --ext .ts,.tsx --format stylish
```

输出：
```
=== ESLint Results ===

src/modules/auth/hooks/useAuth.ts
  12:5  warning  Unexpected console statement  no-console
  25:1  error    Missing return type           @typescript-eslint/explicit-function-return-type

src/modules/api/client.ts
  8:10  error    'axios' is defined but never used  @typescript-eslint/no-unused-vars

✖ 3 problems (2 errors, 1 warning)

Status: ❌ FAILED
```

如果 `fix=true`:
```bash
npx eslint src --ext .ts,.tsx --fix
```

### Action: check

运行 TypeScript 类型检查：

```
/build action=check
```

执行：
```bash
npx tsc --noEmit
```

输出：
```
=== TypeScript Check ===

src/modules/user/services/user.service.ts:45:5
  error TS2322: Type 'string' is not assignable to type 'number'.

src/modules/auth/components/AuthGuard.tsx:18:10
  error TS2339: Property 'isAuthenticated' does not exist on type 'AuthState'.

Found 2 errors in 2 files.

Status: ❌ FAILED
```

### Action: test

运行单元测试：

```
/build action=test
```

执行：
```bash
npx vitest run --reporter=verbose
```

输出：
```
=== Test Results ===

 ✓ src/modules/auth/__tests__/useAuth.test.ts (3 tests) 45ms
   ✓ useAuth > should initialize with default state
   ✓ useAuth > should handle login success
   ✓ useAuth > should handle login error

 ✗ src/modules/user/__tests__/user.service.test.ts (2 tests) 120ms
   ✓ userService > should fetch user by id
   ✗ userService > should handle user not found
     → Expected: { error: 'Not found' }
     → Received: { error: 'User not found' }

Test Files: 1 passed, 1 failed (2 total)
Tests:      4 passed, 1 failed (5 total)
Duration:   165ms

Status: ❌ FAILED
```

### Action: build

运行完整构建：

```
/build action=build
```

执行：
```bash
npx vite build
```

输出：
```
=== Build Results ===

vite v5.0.0 building for production...

✓ 156 modules transformed.
dist/index.html                  0.45 kB │ gzip:  0.29 kB
dist/assets/index-DiwrgTda.css  12.34 kB │ gzip:  3.12 kB
dist/assets/index-CjFxLtEO.js  145.67 kB │ gzip: 48.23 kB

✓ built in 2.34s

Bundle Analysis:
  - Total Size: 158.46 kB
  - Gzipped: 51.64 kB
  - Modules: 156
  - Chunks: 3

Status: ✅ SUCCESS
```

### Action: all

运行完整验证流水线：

```
/build action=all
```

按顺序执行：
1. lint
2. check
3. test
4. build

```
=== Full Build Pipeline ===

[1/4] Lint...
  ✓ ESLint passed (0 errors, 2 warnings)

[2/4] Type Check...
  ✓ TypeScript passed (0 errors)

[3/4] Test...
  ✓ All tests passed (15/15)

[4/4] Build...
  ✓ Build successful (158.46 kB)

═══════════════════════════════════════
Pipeline: ✅ SUCCESS
Duration: 12.5s
═══════════════════════════════════════
```

### Module-specific Build

针对特定模块验证：

```
/build action=all module="auth"
```

只验证 auth 模块相关代码：
- `src/modules/auth/**/*`
- `src/contracts/auth.contract.ts`
- 相关测试文件

## Dependency Check

额外的依赖检查：

```
┌─────────────────────────────────────────────────────────────────┐
│                       依赖关系验证                               │
└─────────────────────────────────────────────────────────────────┘

检查项:
  1. 循环依赖检测
  2. 缺失依赖检测
  3. 未使用依赖检测
  4. 版本兼容性检测

输出:
=== Dependency Analysis ===

Module Dependencies:
  auth → api, store
  user → auth, api
  dashboard → user, api, charts

Issues:
  ⚠ Circular dependency: auth → user → auth
  ⚠ Unused dependency in user: lodash

Recommendations:
  - Extract shared logic to avoid circular dependency
  - Remove unused lodash from user module
```

## Quality Gates

定义质量门槛：

```typescript
// quality-gates.config.ts
export const qualityGates = {
  // 代码覆盖率
  coverage: {
    statements: 80,
    branches: 70,
    functions: 80,
    lines: 80
  },

  // Bundle 大小限制
  bundleSize: {
    maxSize: '500KB',
    maxGzipSize: '150KB'
  },

  // 复杂度限制
  complexity: {
    maxCyclomaticComplexity: 10,
    maxCognitiveComplexity: 15
  },

  // 类型覆盖率
  typeCoverage: {
    minCoverage: 95
  }
}
```

## Communication

### Writing State

```json
{
  "data": {
    "build": {
      "status": "completed",
      "output": {
        "action": "all",
        "success": true,
        "results": {
          "lint": { "errors": 0, "warnings": 2 },
          "check": { "errors": 0 },
          "test": { "passed": 15, "failed": 0 },
          "build": { "size": "158.46 kB", "duration": "2.34s" }
        },
        "duration": "12.5s"
      }
    }
  }
}
```

## Error Handling

- **依赖未安装**: 提示运行 npm install
- **配置文件缺失**: 提示运行 /project-init
- **测试失败**: 显示失败详情和建议修复

## Examples

### Example 1: 快速类型检查

```
/build action=check
```

### Example 2: 修复 lint 问题

```
/build action=lint fix=true
```

### Example 3: 完整验证

```
/build action=all
```

### Example 4: 模块级验证

```
/build action=all module="auth"
```
