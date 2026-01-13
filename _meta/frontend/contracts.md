---
id: contracts
name: Contract Manager
version: 1.0.0
description: 管理模块间的接口契约，确保类型安全和接口一致性
directory: _meta/frontend/
upstream:
  - module-generator
downstream:
  - build
  - coordinator
inputs:
  - name: action
    type: string
    required: true
    description: 操作类型 (list/validate/sync/generate/diff)
  - name: module
    type: string
    required: false
    description: 目标模块名称
outputs:
  - name: contracts
    type: array
    description: 契约列表
  - name: validation_result
    type: object
    description: 验证结果
created_by: manual
created_at: 2026-01-14
updated_at: 2026-01-14
tags:
  - meta
  - frontend
  - contracts
  - types
---

# Contract Manager - 契约管理器

> 管理所有模块间的接口契约，确保模块间通信的类型安全和接口一致性

## Context

契约管理器是大型前端项目的关键组件，负责：
1. 定义模块间的接口规范
2. 验证接口实现的一致性
3. 检测破坏性变更
4. 生成接口文档
5. 同步契约和实现

## Contract Structure

```
┌─────────────────────────────────────────────────────────────────┐
│                        契约系统架构                              │
└─────────────────────────────────────────────────────────────────┘

  src/contracts/
  ├── index.ts                    # 契约汇总导出
  ├── _registry.ts                # 契约注册表
  │
  ├── auth.contract.ts            # Auth 模块契约
  ├── api.contract.ts             # API 模块契约
  ├── user.contract.ts            # User 模块契约
  └── ...

  契约文件结构:
  ┌─────────────────────────────────────────┐
  │  <module>.contract.ts                   │
  ├─────────────────────────────────────────┤
  │  1. 类型导出 (Type Exports)             │
  │     - 公共类型重导出                    │
  │                                         │
  │  2. 接口定义 (Interface Definition)     │
  │     - I<Module>Module 接口              │
  │     - 公共方法签名                      │
  │                                         │
  │  3. 事件定义 (Event Definition)         │
  │     - 模块事件类型                      │
  │                                         │
  │  4. 依赖声明 (Dependency Declaration)   │
  │     - 依赖的其他模块                    │
  │                                         │
  │  5. 导出声明 (Export Declaration)       │
  │     - 模块公共 API 列表                 │
  └─────────────────────────────────────────┘
```

## Instructions

当用户调用 `/contracts` 时，根据 action 参数执行相应操作：

### Action: list

列出所有契约：

```
/contracts action=list
```

1. 扫描 `./src/contracts/` 目录
2. 解析每个契约文件
3. 输出契约摘要：

```
=== Contract Registry ===
Total: 5 contracts

┌────────────┬─────────┬──────────────────┬─────────────────┐
│ Module     │ Version │ Exports          │ Dependencies    │
├────────────┼─────────┼──────────────────┼─────────────────┤
│ auth       │ 1.0.0   │ 4 types, 3 funcs │ api, store      │
│ api        │ 1.0.0   │ 2 types, 5 funcs │ (none)          │
│ user       │ 1.0.0   │ 3 types, 4 funcs │ auth, api       │
│ store      │ 1.0.0   │ 2 types, 2 funcs │ (none)          │
│ ui         │ 1.0.0   │ 10 components    │ theme           │
└────────────┴─────────┴──────────────────┴─────────────────┘
```

### Action: validate

验证契约和实现的一致性：

```
/contracts action=validate module="auth"
```

1. 读取 `./src/contracts/auth.contract.ts`
2. 读取 `./src/modules/auth/index.ts`
3. 比对导出是否匹配
4. 检查类型定义是否一致
5. 报告验证结果：

```
=== Contract Validation: auth ===

✓ 类型导出匹配
  - AuthState ✓
  - AuthData ✓
  - AuthConfig ✓

✓ 函数导出匹配
  - useAuth ✓
  - AuthProvider ✓
  - AuthGuard ✓

✓ 依赖关系正确
  - api ✓
  - store ✓

Overall: ✅ VALID
```

或者报告错误：

```
=== Contract Validation: auth ===

✗ 导出不匹配
  - AuthGuard: 契约中定义但模块未导出
  - loginAsync: 模块导出但契约未声明

✗ 类型不一致
  - AuthState.user: 契约定义 User | null，实现为 User | undefined

Overall: ❌ INVALID (2 errors)
```

### Action: sync

同步契约和实现：

```
/contracts action=sync module="auth"
```

1. 分析模块实际导出
2. 更新契约文件
3. 或者提示需要更新模块

```
=== Contract Sync: auth ===

检测到差异:
  + loginAsync (模块有，契约无) → 添加到契约
  - AuthGuard (契约有，模块无) → 从契约移除

是否同步? [Y/n]

✓ 契约已更新
```

### Action: generate

为新模块生成契约：

```
/contracts action=generate module="payment"
```

1. 分析模块结构
2. 提取公共导出
3. 推断接口定义
4. 生成契约文件

### Action: diff

检查契约变更 (用于 CI/CD)：

```
/contracts action=diff
```

1. 比较当前契约和上一版本
2. 检测破坏性变更
3. 输出变更报告：

```
=== Contract Diff ===

auth.contract.ts:
  [BREAKING] Removed: AuthGuard
  [MINOR] Added: useAuthStatus
  [PATCH] Modified: AuthState (added optional field)

api.contract.ts:
  [MINOR] Added: fetchWithRetry

Recommendation:
  - auth: Major version bump required (1.0.0 → 2.0.0)
  - api: Minor version bump (1.0.0 → 1.1.0)
```

## Contract Template

生成的契约文件模板：

```typescript
/**
 * <Module> Module Contract
 *
 * @module <Module>
 * @version 1.0.0
 * @description <模块描述>
 *
 * @breaking-changes
 * - v1.0.0: Initial release
 */

// ==================== 版本信息 ====================
export const CONTRACT_VERSION = '1.0.0'

// ==================== 类型导出 ====================
export type {
  <Module>State,
  <Module>Data,
  <Module>Config
} from '@modules/<module>/types'

// ==================== 接口定义 ====================
/**
 * <Module> 模块公共接口
 */
export interface I<Module>Module {
  /**
   * 获取当前状态
   */
  getState(): <Module>State

  /**
   * 初始化模块
   */
  initialize(config?: <Module>Config): Promise<void>

  /**
   * 销毁模块
   */
  destroy(): void
}

// ==================== 事件定义 ====================
/**
 * 模块事件映射
 */
export interface <Module>EventMap {
  '<module>:initialized': { timestamp: number }
  '<module>:error': { error: Error }
  '<module>:updated': { data: <Module>Data }
}

// ==================== 依赖声明 ====================
/**
 * 模块依赖
 */
export interface <Module>Dependencies {
  // 声明依赖的模块
}

// ==================== 导出清单 ====================
/**
 * 模块公共导出
 */
export const <MODULE>_EXPORTS = {
  components: [] as const,
  hooks: [] as const,
  services: [] as const,
  types: [] as const,
  utils: [] as const
}

// ==================== 类型守卫 ====================
/**
 * 类型守卫函数
 */
export function is<Module>Data(obj: unknown): obj is <Module>Data {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj
  )
}
```

## Communication

### Writing State

```json
{
  "data": {
    "contracts": {
      "status": "completed",
      "output": {
        "action": "validate",
        "module": "auth",
        "valid": true,
        "errors": [],
        "warnings": []
      }
    }
  }
}
```

## Error Handling

- **契约文件不存在**: 提示生成
- **循环依赖**: 检测并报告
- **破坏性变更**: 警告并要求确认

## Examples

### Example 1: 验证所有契约

```
/contracts action=validate
```

### Example 2: 为新模块生成契约

```
/contracts action=generate module="notification"
```

### Example 3: 检查变更

```
/contracts action=diff
```
