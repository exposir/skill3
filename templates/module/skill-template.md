---
id: module-skill-template
name: Module Skill Template
version: 1.0.0
description: 业务模块 Skill 的标准模板，用于生成模块维护 skill
directory: templates/module/
inputs:
  - name: module_name
    type: string
    required: true
    description: 模块名称
  - name: module_type
    type: string
    required: true
    description: 模块类型 (feature/shared/core)
  - name: dependencies
    type: array
    required: false
    description: 依赖模块列表
created_by: manual
created_at: 2026-01-14
tags:
  - template
  - module
---

# Module Skill Template

> 用于生成业务模块 skill 的标准模板

## Template

当 module-generator 创建新模块时，使用此模板生成对应的 skill 文件：

```markdown
---
id: skill-module-{{MODULE_NAME}}
name: {{MODULE_NAME_PASCAL}} Module
version: 1.0.0
description: {{MODULE_NAME_PASCAL}} 业务模块 - {{DESCRIPTION}}
directory: _generated/
module_path: src/modules/{{MODULE_NAME}}/
contract_path: src/contracts/{{MODULE_NAME}}.contract.ts
type: {{MODULE_TYPE}}
upstream:
{{#each DEPENDENCIES}}
  - skill-module-{{this}}
{{/each}}
downstream: []
inputs:
  - name: action
    type: string
    required: true
    description: 操作类型 (implement/refactor/fix/extend/document)
  - name: requirement
    type: string
    required: true
    description: 具体需求描述
  - name: files
    type: array
    required: false
    description: 目标文件列表
outputs:
  - name: files_modified
    type: array
    description: 修改的文件列表
  - name: files_created
    type: array
    description: 新建的文件列表
  - name: exports_changed
    type: object
    description: 导出变更
created_by: module-generator
created_at: {{DATE}}
updated_at: {{DATE}}
tags:
  - module
  - {{MODULE_NAME}}
  - {{MODULE_TYPE}}
  - frontend
---

# {{MODULE_NAME_PASCAL}} Module Skill

> 维护 {{MODULE_NAME_PASCAL}} 模块的代码实现

## Module Info

| 属性 | 值 |
|------|-----|
| 路径 | `src/modules/{{MODULE_NAME}}/` |
| 契约 | `src/contracts/{{MODULE_NAME}}.contract.ts` |
| 类型 | {{MODULE_TYPE}} |
| 版本 | 1.0.0 |

## Directory Structure

\`\`\`
src/modules/{{MODULE_NAME}}/
├── index.ts                    # 模块入口和导出
├── types.ts                    # 类型定义
├── constants.ts                # 常量定义
│
├── components/                 # React 组件
│   ├── index.ts
│   └── {{MODULE_NAME_PASCAL}}Container.tsx
│
├── hooks/                      # React Hooks
│   ├── index.ts
│   └── use{{MODULE_NAME_PASCAL}}.ts
│
├── services/                   # 业务服务
│   ├── index.ts
│   └── {{MODULE_NAME}}.service.ts
│
├── store/                      # 状态管理
│   ├── index.ts
│   ├── {{MODULE_NAME}}.slice.ts
│   └── {{MODULE_NAME}}.selectors.ts
│
├── utils/                      # 工具函数
│   └── index.ts
│
└── __tests__/                  # 测试
    ├── {{MODULE_NAME}}.test.ts
    └── {{MODULE_NAME}}.integration.test.ts
\`\`\`

## Instructions

当需要修改 {{MODULE_NAME_PASCAL}} 模块时，根据 action 参数执行相应操作：

### action: implement

实现新功能：

1. **分析需求**
   - 读取 requirement 描述
   - 确定需要修改的文件
   - 检查是否需要修改契约

2. **检查依赖**
   - 读取依赖模块的契约
   - 确保接口兼容

3. **实现代码**
   - 在对应目录下添加/修改代码
   - 遵循模块的代码规范
   - 添加必要的类型定义

4. **更新导出**
   - 更新 index.ts 导出
   - 如果有新的公共 API，更新契约

5. **添加测试**
   - 为新功能添加单元测试
   - 更新集成测试（如果需要）

6. **验证**
   - 运行类型检查
   - 运行测试
   - 验证契约一致性

### action: refactor

重构现有代码：

1. 分析现有代码结构
2. 确保公共接口不变
3. 优化内部实现
4. 保持测试通过
5. 更新文档（如果需要）

### action: fix

修复 bug：

1. 定位问题代码
2. 分析根本原因
3. 实现修复
4. 添加回归测试
5. 验证修复

### action: extend

扩展现有功能：

1. 检查是否需要修改契约
2. 设计扩展方案
3. 实现新功能
4. 保持向后兼容
5. 更新文档和测试

### action: document

更新文档：

1. 更新代码注释
2. 更新 JSDoc
3. 更新契约文档
4. 生成 API 文档

## Code Standards

### 文件命名
- 组件: PascalCase.tsx (e.g., `{{MODULE_NAME_PASCAL}}Container.tsx`)
- Hooks: camelCase.ts (e.g., `use{{MODULE_NAME_PASCAL}}.ts`)
- 服务: kebab-case.ts (e.g., `{{MODULE_NAME}}.service.ts`)
- 类型: types.ts
- 常量: constants.ts

### 导出规范
\`\`\`typescript
// index.ts
// 1. Components
export { {{MODULE_NAME_PASCAL}}Container } from './components'

// 2. Hooks
export { use{{MODULE_NAME_PASCAL}} } from './hooks'

// 3. Services
export { {{MODULE_NAME}}Service } from './services'

// 4. Types (使用 type 导出)
export type { {{MODULE_NAME_PASCAL}}State, {{MODULE_NAME_PASCAL}}Props } from './types'

// 5. Constants
export { {{MODULE_NAME_UPPER}}_CONSTANTS } from './constants'
\`\`\`

### 类型定义规范
\`\`\`typescript
// types.ts
/** 模块状态 */
export interface {{MODULE_NAME_PASCAL}}State {
  isLoading: boolean
  error: string | null
  data: {{MODULE_NAME_PASCAL}}Data | null
}

/** 组件 Props */
export interface {{MODULE_NAME_PASCAL}}Props {
  className?: string
  // ...
}
\`\`\`

## Communication

### With Upstream Modules

读取上游模块的输出：

\`\`\`typescript
// 从 API 模块获取数据
import { apiClient } from '@modules/api'

// 从 Store 模块获取状态
import { useAppSelector } from '@modules/store'
\`\`\`

### With Downstream Modules

通过契约暴露公共 API：

\`\`\`typescript
// 其他模块引用本模块
import { use{{MODULE_NAME_PASCAL}}, {{MODULE_NAME_PASCAL}}Container } from '@modules/{{MODULE_NAME}}'
import type { {{MODULE_NAME_PASCAL}}State } from '@contracts/{{MODULE_NAME}}.contract'
\`\`\`

### State Updates

执行完成后更新 state.json：

\`\`\`json
{
  "data": {
    "skill-module-{{MODULE_NAME}}": {
      "status": "completed",
      "output": {
        "action": "implement",
        "files_modified": ["src/modules/{{MODULE_NAME}}/..."],
        "files_created": ["..."],
        "exports_changed": {
          "added": ["newFunction"],
          "removed": [],
          "modified": []
        }
      }
    }
  }
}
\`\`\`

## Error Handling

- **类型错误**: 检查并修复类型定义
- **导入错误**: 验证依赖模块是否存在
- **测试失败**: 修复测试或更新预期结果
- **契约不匹配**: 同步契约和实现

## Examples

### Example 1: 添加新的 Hook

\`\`\`
/skill-module-{{MODULE_NAME}} action=implement requirement="添加 use{{MODULE_NAME_PASCAL}}Status hook 返回模块状态"
\`\`\`

### Example 2: 修复 Bug

\`\`\`
/skill-module-{{MODULE_NAME}} action=fix requirement="修复 use{{MODULE_NAME_PASCAL}} 在组件卸载后仍然更新状态的问题"
\`\`\`

### Example 3: 重构服务

\`\`\`
/skill-module-{{MODULE_NAME}} action=refactor requirement="将 {{MODULE_NAME}}.service.ts 拆分为多个小文件" files=["services/{{MODULE_NAME}}.service.ts"]
\`\`\`
```

## Template Variables

| 变量 | 说明 | 示例 |
|------|------|------|
| `{{MODULE_NAME}}` | 模块名 (kebab-case) | `user-profile` |
| `{{MODULE_NAME_PASCAL}}` | 模块名 (PascalCase) | `UserProfile` |
| `{{MODULE_NAME_CAMEL}}` | 模块名 (camelCase) | `userProfile` |
| `{{MODULE_NAME_UPPER}}` | 模块名 (UPPER_CASE) | `USER_PROFILE` |
| `{{MODULE_TYPE}}` | 模块类型 | `feature` |
| `{{DESCRIPTION}}` | 模块描述 | `用户资料管理` |
| `{{DEPENDENCIES}}` | 依赖列表 | `['api', 'auth']` |
| `{{DATE}}` | 创建日期 | `2026-01-14` |
