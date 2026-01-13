# 使用示例 Demo

本文档包含从简单到复杂的多个示例，帮助你快速上手自进化 Skill 编排系统。

---

## 目录

- [Level 1: 入门示例](#level-1-入门示例)
- [Level 2: 基础示例](#level-2-基础示例)
- [Level 3: 中级示例](#level-3-中级示例)
- [Level 4: 高级示例](#level-4-高级示例)
- [Level 5: 综合实战](#level-5-综合实战)

---

# Level 1: 入门示例

## Demo 1.1: 你的第一个 Skill

**目标**: 创建一个简单的问候 skill

**步骤**:

```bash
# 1. 使用 Genesis 创建 skill
/genesis "创建一个 greeting skill，接收用户名参数，返回个性化问候语"
```

**预期输出**:
```
✓ 已创建 skill: skill-002-greeting
✓ 路径: ./_generated/skill-002-greeting.md
✓ 已注册到 skills.json
```

**使用新 skill**:
```bash
/greeting name="张三"
```

**预期结果**:
```
你好，张三！欢迎使用自进化 Skill 系统！
当前时间: 2026-01-14 10:30:00
```

---

## Demo 1.2: 查看系统状态

**目标**: 熟悉系统管理命令

```bash
# 查看所有已注册的 skills
/registry action=list
```

**预期输出**:
```
=== Registered Skills ===

Meta Skills (3):
  ├── genesis      - Meta skill that generates new skills
  ├── registry     - Manages skill registration
  └── orchestrator - Executes skills in DAG order

Generated Skills (2):
  ├── skill-001-hello-world - Demo skill
  └── skill-002-greeting    - 个性化问候

Total: 5 skills
```

```bash
# 查看依赖关系图
/registry action=graph
```

**预期输出**:
```
=== Skill Dependency Graph ===

genesis
  └── registry
        └── orchestrator
              ├── skill-001-hello-world
              └── skill-002-greeting
```

---

## Demo 1.3: 手动创建 Skill

**目标**: 不使用 Genesis，手动创建 skill

**步骤**:

1. 创建文件 `_generated/skill-003-calculator.md`:

```markdown
---
id: skill-003-calculator
name: calculator
version: 1.0.0
description: 简单计算器，支持加减乘除
directory: _generated/
upstream: []
downstream: []
inputs:
  - name: expression
    type: string
    required: true
    description: 数学表达式，如 "1 + 2"
outputs:
  - name: result
    type: number
    description: 计算结果
created_by: manual
created_at: 2026-01-14
tags:
  - utility
  - math
---

# Calculator Skill

> 简单计算器，支持基本数学运算

## Instructions

当用户调用 `/calculator` 时：

1. 解析 expression 参数
2. 计算结果
3. 返回结果给用户

## Examples

输入: `/calculator expression="10 + 5 * 2"`
输出: `结果: 20`
```

2. 注册到系统:

```bash
/registry action=add skill_id=skill-003-calculator
```

3. 使用:

```bash
/calculator expression="100 / 4 + 25"
```

---

# Level 2: 基础示例

## Demo 2.1: 创建数据处理 Skill

**目标**: 创建一个处理 JSON 数据的 skill

```bash
/genesis "创建 json-formatter skill，接收 JSON 字符串，格式化输出并统计字段数量"
```

**使用示例**:
```bash
/json-formatter data='{"name":"Alice","age":25,"city":"Beijing"}'
```

**预期输出**:
```
=== JSON Formatter ===

格式化结果:
{
  "name": "Alice",
  "age": 25,
  "city": "Beijing"
}

统计:
- 字段数量: 3
- 数据类型: object
```

---

## Demo 2.2: 创建文件操作 Skill

**目标**: 创建读取和分析文件的 skill

```bash
/genesis "创建 file-analyzer skill，接收文件路径，返回文件信息（大小、行数、类型）"
```

**使用示例**:
```bash
/file-analyzer path="./README.md"
```

**预期输出**:
```
=== File Analysis ===

文件: README.md
路径: /Users/xxx/skill2/README.md
大小: 45.2 KB
行数: 1380
类型: Markdown
编码: UTF-8
最后修改: 2026-01-14 10:30:00
```

---

## Demo 2.3: 带参数验证的 Skill

**目标**: 创建包含输入验证的 skill

```bash
/genesis "创建 email-validator skill，验证邮箱格式是否正确，返回验证结果和域名信息"
```

**使用示例**:

```bash
# 有效邮箱
/email-validator email="user@example.com"
```

**输出**:
```
✅ 邮箱格式有效

详情:
- 用户名: user
- 域名: example.com
- 类型: 通用邮箱
```

```bash
# 无效邮箱
/email-validator email="invalid-email"
```

**输出**:
```
❌ 邮箱格式无效

错误: 缺少 @ 符号
建议: 请使用 user@domain.com 格式
```

---

# Level 3: 中级示例

## Demo 3.1: 创建 Skill 管道

**目标**: 创建多个相互依赖的 skills，形成数据处理管道

### Step 1: 创建数据获取 Skill

```bash
/genesis "创建 data-fetcher skill，从指定 URL 获取 JSON 数据"
```

### Step 2: 创建数据转换 Skill

```bash
/genesis "创建 data-transformer skill，将 JSON 数据转换为表格格式，上游是 data-fetcher"
```

### Step 3: 创建数据输出 Skill

```bash
/genesis "创建 data-exporter skill，将表格数据导出为 CSV 文件，上游是 data-transformer"
```

### Step 4: 查看依赖图

```bash
/registry action=graph
```

**输出**:
```
=== Data Processing Pipeline ===

data-fetcher
  └── data-transformer
        └── data-exporter
```

### Step 5: 执行管道

```bash
/orchestrate task="从 GitHub API 获取用户信息并导出为 CSV" input={"url": "https://api.github.com/users"}
```

**执行过程**:
```
=== Execution: exec-20260114-001 ===

[1/3] ▶ data-fetcher: 获取数据...
       URL: https://api.github.com/users
[1/3] ✓ data-fetcher: 完成 (1.2s)
       获取 30 条记录

[2/3] ▶ data-transformer: 转换数据...
[2/3] ✓ data-transformer: 完成 (0.3s)
       转换为 30 行 x 8 列表格

[3/3] ▶ data-exporter: 导出 CSV...
[3/3] ✓ data-exporter: 完成 (0.1s)
       文件: ./output/users.csv

=== Pipeline Complete ===
Duration: 1.6s
Output: ./output/users.csv
```

---

## Demo 3.2: 并行执行 Skills

**目标**: 创建可以并行执行的 skill 组

### 创建三个独立的数据源 Skills

```bash
/genesis "创建 fetch-weather skill，获取天气数据"
/genesis "创建 fetch-news skill，获取新闻数据"
/genesis "创建 fetch-stocks skill，获取股票数据"
```

### 创建聚合 Skill

```bash
/genesis "创建 dashboard-aggregator skill，聚合天气、新闻、股票数据生成仪表板，上游是 fetch-weather, fetch-news, fetch-stocks"
```

### 查看并行组

```bash
/registry action=graph
```

**输出**:
```
=== Parallel Execution Groups ===

Layer 0 (并行):
  ├── fetch-weather
  ├── fetch-news
  └── fetch-stocks

Layer 1 (串行):
  └── dashboard-aggregator
```

### 执行

```bash
/orchestrate task="生成今日仪表板"
```

**执行过程**:
```
=== Execution: exec-20260114-002 ===

[Layer 0] 并行执行 3 个 skills...
  ▶ fetch-weather: Running...
  ▶ fetch-news: Running...
  ▶ fetch-stocks: Running...
  ✓ fetch-weather: Completed (0.8s)
  ✓ fetch-stocks: Completed (1.0s)
  ✓ fetch-news: Completed (1.2s)

[Layer 1] 串行执行...
  ▶ dashboard-aggregator: Running...
  ✓ dashboard-aggregator: Completed (0.5s)

=== Complete ===
Total: 1.7s (并行优化节省 1.3s)
```

---

## Demo 3.3: 条件执行和错误处理

**目标**: 创建带有条件逻辑和错误处理的 skill 管道

### 创建验证 Skill

```bash
/genesis "创建 input-validator skill，验证输入数据格式，如果无效则标记错误"
```

### 创建处理 Skill（依赖验证通过）

```bash
/genesis "创建 data-processor skill，处理验证通过的数据，上游是 input-validator，只在验证成功时执行"
```

### 创建错误处理 Skill

```bash
/genesis "创建 error-handler skill，处理验证失败的情况，上游是 input-validator，只在验证失败时执行"
```

### 执行示例

**成功路径**:
```bash
/orchestrate task="处理数据" input={"data": {"name": "test", "value": 100}}
```

```
[1/2] ✓ input-validator: 验证通过
[2/2] ✓ data-processor: 处理完成
      (error-handler: 跳过 - 无错误)
```

**失败路径**:
```bash
/orchestrate task="处理数据" input={"data": "invalid"}
```

```
[1/2] ✗ input-validator: 验证失败 (格式错误)
[2/2] ✓ error-handler: 错误已处理
      (data-processor: 跳过 - 上游失败)
```

---

# Level 4: 高级示例

## Demo 4.1: 前端项目初始化

**目标**: 使用前端扩展初始化一个完整的 React 项目

### Step 1: 初始化项目

```bash
/project-init project_name="my-dashboard" framework="react" features=["typescript", "tailwind", "router", "store"]
```

**输出**:
```
✅ 项目初始化完成!

📁 创建的目录结构:
src/
├── modules/          # 业务模块
├── shared/           # 共享代码
│   ├── components/
│   ├── hooks/
│   └── utils/
├── contracts/        # 接口契约
├── app/              # 应用入口
│   ├── App.tsx
│   ├── main.tsx
│   └── routes.tsx
└── assets/           # 静态资源

📄 配置文件:
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js

🚀 下一步: /module-gen name="auth"
```

---

## Demo 4.2: 创建业务模块

**目标**: 创建认证模块和用户模块

### 创建认证模块

```bash
/module-gen name="auth" type="feature" exports=["useAuth", "AuthProvider", "AuthGuard"]
```

**输出**:
```
✅ 模块 Auth 创建完成!

📁 模块结构:
src/modules/auth/
├── index.ts
├── types.ts
├── constants.ts
├── components/
│   ├── index.ts
│   ├── AuthProvider.tsx
│   └── AuthGuard.tsx
├── hooks/
│   ├── index.ts
│   └── useAuth.ts
├── services/
│   ├── index.ts
│   └── auth.service.ts
└── __tests__/
    └── auth.test.ts

📄 契约文件:
src/contracts/auth.contract.ts

📝 Skill 文件:
_generated/skill-module-auth.md

🔗 导出:
├── useAuth (Hook)
├── AuthProvider (Component)
└── AuthGuard (Component)
```

### 创建用户模块（依赖认证模块）

```bash
/module-gen name="user" type="feature" dependencies=["auth"] exports=["useUser", "UserProfile", "UserSettings"]
```

**输出**:
```
✅ 模块 User 创建完成!

📁 模块结构:
src/modules/user/
├── index.ts
├── types.ts
├── components/
│   ├── UserProfile.tsx
│   └── UserSettings.tsx
├── hooks/
│   └── useUser.ts
└── services/
    └── user.service.ts

🔗 依赖关系:
user → auth

📤 导出:
├── useUser (Hook)
├── UserProfile (Component)
└── UserSettings (Component)
```

---

## Demo 4.3: 模块协调开发

**目标**: 协调多个模块实现一个完整功能

### 规划任务

```bash
/coordinate action=plan task="实现用户登录和个人资料展示功能"
```

**输出**:
```
=== 任务规划 ===

任务: 实现用户登录和个人资料展示功能

分析:
  需要实现的功能:
  1. 用户登录表单
  2. 登录状态管理
  3. 用户信息获取
  4. 个人资料页面

涉及模块:
  ┌────────┬──────────────────────────────────┐
  │ 模块    │ 需要实现的内容                    │
  ├────────┼──────────────────────────────────┤
  │ auth   │ 登录表单、登录 API、状态管理       │
  │ user   │ 用户信息获取、个人资料组件         │
  │ ui     │ 表单组件、按钮、布局              │
  └────────┴──────────────────────────────────┘

依赖分析:
  ui (无依赖) → auth (依赖 ui) → user (依赖 auth)

执行计划:
  Phase 1: [ui] 实现基础组件
  Phase 2: [auth] 实现登录功能
  Phase 3: [user] 实现个人资料
  Phase 4: 集成测试和构建验证

预计: 4 个 skill 执行，约 2 分钟

是否执行? [Y/n]
```

### 执行开发

```bash
/coordinate action=execute
```

**执行过程**:
```
=== Coordinated Execution ===

[Phase 1] UI 模块
  ▶ skill-module-ui: 实现 Button, Input, Form 组件...
  ✓ 完成 (新增 3 个组件)

[Phase 2] Auth 模块
  ▶ skill-module-auth: 实现 LoginForm, useAuth...
  ✓ 完成 (新增 LoginForm, 更新 useAuth)

[Phase 3] User 模块
  ▶ skill-module-user: 实现 UserProfile, useUser...
  ✓ 完成 (新增 UserProfile, 实现 useUser)

[Phase 4] 验证
  ▶ 契约一致性检查...
  ✓ 所有接口匹配
  ▶ TypeScript 类型检查...
  ✓ 无类型错误
  ▶ 运行测试...
  ✓ 12/12 测试通过

=== 开发完成 ===

变更摘要:
  新增文件: 8
  修改文件: 4
  新增代码: 456 行

功能验证:
  ✓ 登录表单渲染正确
  ✓ 登录 API 调用成功
  ✓ 用户信息正确显示
```

---

## Demo 4.4: 构建和验证

**目标**: 运行完整的构建验证流水线

```bash
/build action=all
```

**输出**:
```
=== Full Build Pipeline ===

[1/4] ESLint 检查...
  检查 45 个文件
  ✓ 通过 (0 errors, 3 warnings)

  ⚠ Warnings:
    src/modules/auth/hooks/useAuth.ts:12
      'console.log' 语句 (no-console)

[2/4] TypeScript 类型检查...
  编译 45 个文件
  ✓ 通过 (0 errors)

[3/4] 单元测试...
  运行 3 个测试套件

  ✓ auth.test.ts (5 tests)
  ✓ user.test.ts (4 tests)
  ✓ ui.test.ts (3 tests)

  测试覆盖率:
    Statements: 85%
    Branches: 78%
    Functions: 90%
    Lines: 85%

  ✓ 12/12 测试通过

[4/4] 生产构建...
  vite v5.0.0 building for production...

  ✓ 45 modules transformed

  dist/index.html          0.5 KB
  dist/assets/index.css   15.2 KB  (gzip: 4.1 KB)
  dist/assets/index.js   125.8 KB  (gzip: 42.3 KB)

  ✓ 构建完成 (2.1s)

═══════════════════════════════════════════════════════════
Pipeline: ✅ SUCCESS
Duration: 8.5s
Bundle Size: 141.5 KB (gzip: 46.4 KB)
═══════════════════════════════════════════════════════════
```

---

# Level 5: 综合实战

## Demo 5.1: 完整电商后台开发

**目标**: 使用系统开发一个完整的电商后台管理系统

### 项目规划

```
电商后台系统
├── 核心模块
│   ├── auth      - 认证授权
│   ├── api       - API 客户端
│   └── store     - 状态管理
│
├── 业务模块
│   ├── product   - 商品管理
│   ├── order     - 订单管理
│   ├── user      - 用户管理
│   └── dashboard - 数据仪表板
│
└── 共享模块
    ├── ui        - UI 组件库
    └── utils     - 工具函数
```

### Step 1: 初始化项目

```bash
/project-init project_name="ecommerce-admin" framework="react" features=["typescript", "tailwind", "router", "store", "api"]
```

### Step 2: 创建核心模块

```bash
# 按顺序创建核心模块
/module-gen name="api" type="core"
/module-gen name="store" type="core" dependencies=["api"]
/module-gen name="auth" type="core" dependencies=["api", "store"]
```

### Step 3: 创建共享模块

```bash
/module-gen name="ui" type="shared"
/module-gen name="utils" type="shared"
```

### Step 4: 创建业务模块

```bash
/module-gen name="product" type="feature" dependencies=["api", "store", "ui"]
/module-gen name="order" type="feature" dependencies=["api", "store", "ui", "product"]
/module-gen name="user" type="feature" dependencies=["api", "store", "ui", "auth"]
/module-gen name="dashboard" type="feature" dependencies=["api", "store", "ui", "product", "order", "user"]
```

### Step 5: 查看完整依赖图

```bash
/registry action=graph
```

**输出**:
```
=== E-commerce Admin Dependency Graph ===

                    ┌─────────────┐
                    │     api     │
                    └──────┬──────┘
                           │
              ┌────────────┼────────────┐
              │            │            │
              ▼            ▼            ▼
        ┌─────────┐  ┌─────────┐  ┌─────────┐
        │  store  │  │   ui    │  │  utils  │
        └────┬────┘  └────┬────┘  └─────────┘
             │            │
             └─────┬──────┘
                   │
              ┌────┴────┐
              ▼         ▼
        ┌─────────┐ ┌─────────┐
        │  auth   │ │ product │
        └────┬────┘ └────┬────┘
             │           │
             │     ┌─────┴─────┐
             │     ▼           ▼
             │ ┌─────────┐ ┌─────────┐
             └─│  user   │ │  order  │
               └────┬────┘ └────┬────┘
                    │           │
                    └─────┬─────┘
                          ▼
                    ┌───────────┐
                    │ dashboard │
                    └───────────┘

Modules: 9
Edges: 15
Max Depth: 5
```

### Step 6: 实现商品管理功能

```bash
/coordinate action=plan task="实现商品管理 CRUD 功能，包括列表、详情、创建、编辑、删除"
```

**输出**:
```
=== 任务规划: 商品管理 CRUD ===

子任务分解:
  1. [api] 添加商品相关 API 端点
  2. [store] 添加商品状态 slice
  3. [ui] 添加 Table, Modal, Form 组件
  4. [product] 实现商品列表页面
  5. [product] 实现商品详情组件
  6. [product] 实现创建/编辑表单
  7. [product] 实现删除确认

执行顺序:
  Phase 1: [api, ui] 并行
  Phase 2: [store]
  Phase 3: [product] 4 个子任务串行
  Phase 4: 集成测试

开始执行? [Y/n]
```

```bash
/coordinate action=execute
```

### Step 7: 最终构建验证

```bash
/build action=all
```

**最终输出**:
```
═══════════════════════════════════════════════════════════
E-commerce Admin Build Report
═══════════════════════════════════════════════════════════

Modules: 9
Components: 45
Hooks: 18
Services: 9
Tests: 89

Build:
  ✓ Lint: 0 errors
  ✓ Types: 0 errors
  ✓ Tests: 89/89 passed
  ✓ Build: Success

Bundle:
  Total: 245.8 KB
  Gzipped: 82.1 KB

  Breakdown:
    vendor.js   120.3 KB (49%)
    app.js       98.2 KB (40%)
    styles.css   27.3 KB (11%)

Performance:
  First Load: ~1.2s (3G)
  TTI: ~1.8s

═══════════════════════════════════════════════════════════
```

---

## Demo 5.2: 自定义 Skill 扩展系统

**目标**: 创建自定义 skill 来扩展系统能力

### 创建代码审查 Skill

```bash
/genesis "创建 code-review skill，分析指定文件或目录的代码质量，检查命名规范、复杂度、潜在问题"
```

### 创建文档生成 Skill

```bash
/genesis "创建 doc-generator skill，为指定模块自动生成 API 文档，上游是任意 module skill"
```

### 创建部署 Skill

```bash
/genesis "创建 deploy skill，执行构建并部署到指定环境，上游是 build，支持 staging 和 production 环境"
```

### 使用自定义工作流

```bash
# 代码审查
/code-review path="src/modules/product"

# 生成文档
/doc-generator module="product"

# 部署
/deploy env="staging"
```

---

## Demo 5.3: 错误排查和调试

**目标**: 演示如何排查和解决问题

### 场景: Skill 执行失败

```bash
/orchestrate task="处理数据"
```

**错误输出**:
```
=== Execution Failed ===

[1/3] ✓ data-fetcher: Completed
[2/3] ✗ data-transformer: Failed

Error:
  Code: TRANSFORM_ERROR
  Message: Cannot read property 'items' of undefined
  Skill: data-transformer
  Line: 45
```

### 调试步骤

**1. 查看执行状态**:
```bash
# 读取 state.json 查看详细信息
```

**state.json 内容**:
```json
{
  "current_execution": "exec-20260114-err001",
  "executions": {
    "exec-20260114-err001": {
      "status": "failed",
      "data": {
        "data-fetcher": {
          "status": "completed",
          "output": {
            "success": true,
            "data": null  // ← 问题: data 是 null
          }
        },
        "data-transformer": {
          "status": "failed",
          "error": {
            "code": "TRANSFORM_ERROR",
            "message": "Cannot read property 'items' of undefined"
          }
        }
      }
    }
  }
}
```

**2. 分析问题**:
- `data-fetcher` 返回的 `data` 是 `null`
- `data-transformer` 没有处理 null 的情况

**3. 修复 Skill**:
```bash
/skill-module-data-transformer action=fix requirement="添加空数据检查，当上游返回 null 时返回空数组"
```

**4. 重新执行**:
```bash
/orchestrate task="处理数据"
```

```
=== Execution Complete ===

[1/3] ✓ data-fetcher: Completed (返回空数据)
[2/3] ✓ data-transformer: Completed (处理空数据情况)
[3/3] ✓ data-exporter: Completed (导出空文件)

Result: 成功处理 0 条记录
```

---

## 总结

通过以上示例，你应该已经掌握了：

| Level | 技能 |
|-------|------|
| Level 1 | 创建简单 skill、查看系统状态 |
| Level 2 | 创建功能性 skill、参数验证 |
| Level 3 | Skill 管道、并行执行、错误处理 |
| Level 4 | 前端项目开发、模块协调、构建验证 |
| Level 5 | 完整项目开发、自定义扩展、调试排查 |

**下一步**:
- 尝试创建自己的 skill
- 探索更多前端扩展功能
- 参与系统改进和扩展

Happy Coding! 🚀
