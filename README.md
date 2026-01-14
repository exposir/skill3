# Darwin: 自进化 Skill 编排系统

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Platform](https://img.shields.io/badge/platform-Claude%20Code-purple.svg)

一个基于 Claude Code skill 热重载机制的**自进化 AI Agent 框架**，通过元编程实现 skill 的自动生成、扩展和图结构编排。

> **重要**: Skills 通过**自然语言描述自动触发**，不是斜杠命令。描述你的需求，Claude 会自动匹配并加载相应的 Skill。

---

## 目录

- [快速开始](#快速开始)
- [系统架构](#系统架构)
- [目录结构](#目录结构)
- [核心 Skills](#核心-skills)
- [前端开发扩展](#前端开发扩展)
- [Skill 文件格式](#skill-文件格式)
- [FAQ](#faq)

---

## 快速开始

### 环境要求

| 要求 | 版本/说明 |
|------|-----------|
| Claude Code | 最新版本 (支持 skill 热重载) |
| 操作系统 | macOS / Linux / Windows |
| Node.js | 18+ (前端扩展需要) |

### 安装

```bash
# 克隆项目
git clone <repo-url> my-skill-project
cd my-skill-project

# 在 Claude Code 中打开
claude .
```

### 使用示例

**生成新 Skill:**
```
帮我创建一个从 REST API 获取 JSON 数据的 skill
```

**执行 API 请求:**
```
从 https://api.github.com/users/octocat 获取用户信息
```

**查看已有 Skills:**
```
列出所有已注册的 skills
```

**执行 Skill 管道:**
```
从 GitHub 获取数据并转换为 CSV
```

---

## 系统架构

```
┌─────────────────────────────────────────────────────────────────┐
│                         用户层                                   │
│                                                                 │
│   "创建一个 skill"     "列出 skills"     "执行任务"              │
└──────────┬─────────────────┬─────────────────┬──────────────────┘
           │                 │                 │
           ▼                 ▼                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                      元 Skill 层                                 │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐              │
│  │   Genesis   │─▶│  Registry   │─▶│ Orchestrator│              │
│  │  (生成器)    │  │  (注册表)    │  │  (编排器)    │              │
│  └─────────────┘  └─────────────┘  └─────────────┘              │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐              │
│  │project-init │  │ module-gen  │  │   build     │              │
│  │ (项目初始化) │  │ (模块生成)   │  │ (构建验证)   │              │
│  └─────────────┘  └─────────────┘  └─────────────┘              │
└─────────────────────────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────────────┐
│                     生成 Skill 层                                │
│                                                                 │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐        │
│  │ api-fetch     │  │ json-to-csv   │  │ file-analyzer │        │
│  │ (API 获取)    │  │ (格式转换)     │  │ (文件分析)    │        │
│  └───────────────┘  └───────────────┘  └───────────────┘        │
└─────────────────────────────────────────────────────────────────┘
```

### 热重载机制

```
Genesis 生成 → 写入 _generated/ → 创建符号链接 → Claude Code 检测 → 立即可用
     └────────────────── 全过程 < 1 秒 ──────────────────┘
```

---

## 目录结构

```
darwin/
│
├── CLAUDE.md                      # 项目结构索引
├── README.md                      # 本文档
├── skills.json                    # DAG 注册表
│
├── .claude/                       # Claude Code 配置
│   └── skills/                    # Skill 配置目录
│       ├── claude.md              # 目录索引
│       ├── genesis/SKILL.md       # → _meta/genesis.md
│       ├── registry/SKILL.md      # → _meta/registry.md
│       ├── orchestrator/SKILL.md  # → _meta/orchestrator.md
│       ├── project-init/SKILL.md  # → _meta/frontend/project-init.md
│       ├── module-gen/SKILL.md    # → _meta/frontend/module-generator.md
│       ├── contracts/SKILL.md     # → _meta/frontend/contracts.md
│       ├── build/SKILL.md         # → _meta/frontend/build.md
│       ├── coordinate/SKILL.md    # → _meta/frontend/coordinator.md
│       └── api-fetch/SKILL.md     # → _generated/skill-002-api-fetch.md
│
├── _meta/                         # 元 Skill 源文件 (勿改)
│   ├── claude.md                  # 目录索引
│   ├── genesis.md                 # 创世技能
│   ├── registry.md                # 注册表管理
│   ├── orchestrator.md            # 执行编排器
│   └── frontend/                  # 前端扩展
│       ├── claude.md
│       ├── project-init.md
│       ├── module-generator.md
│       ├── contracts.md
│       ├── build.md
│       └── coordinator.md
│
├── _generated/                    # 生成的 Skills
│   ├── claude.md                  # 目录索引
│   ├── skill-001-hello-world.md   # 示例 skill
│   └── skill-002-api-fetch.md     # API 获取 skill
│
├── _core/                         # 核心规范文档
│   ├── claude.md
│   ├── skill-template.md          # Skill 模板
│   └── communication.md           # 通信协议
│
├── context/                       # 运行时上下文
│   ├── claude.md
│   └── state.json                 # 状态管理
│
└── templates/                     # 代码模板
    └── module/
```

---

## 核心 Skills

### 元 Skills (系统核心)

| Skill | 触发方式 | 功能 |
|-------|----------|------|
| **Genesis** | `创建一个 xxx skill` | 根据需求生成新 skill |
| **Registry** | `列出所有 skills` | 管理注册表和依赖图 |
| **Orchestrator** | `执行 xxx 任务` | 按 DAG 顺序编排执行 |

### 前端扩展 Skills

| Skill | 触发方式 | 功能 |
|-------|----------|------|
| **project-init** | `初始化一个 React 项目` | 创建项目结构 |
| **module-gen** | `创建 auth 功能模块` | 生成业务模块 |
| **contracts** | `验证接口契约一致性` | 管理模块契约 |
| **build** | `运行完整构建验证` | 构建和测试 |
| **coordinate** | `规划实现登录功能` | 多模块协调 |

### 已生成的 Skills

| ID | 名称 | 功能 |
|----|------|------|
| skill-001 | Hello World | 示例 skill |
| skill-002 | API Fetch | REST API 数据获取 (GET/POST) |

---

## 前端开发扩展

### 开发流程

```
1. 初始化项目          2. 创建模块           3. 实现功能
   ┌─────────┐           ┌─────────┐           ┌─────────┐
   │初始化 React│──────────▶│创建 auth │──────────▶│实现登录  │
   │  项目     │           │  模块    │           │  功能    │
   └─────────┘           └─────────┘           └─────────┘
                                                    │
4. 验证契约            5. 构建验证                  │
   ┌─────────┐           ┌─────────┐               │
   │验证接口  │◀──────────│运行构建  │◀──────────────┘
   │ 一致性   │           │  验证    │
   └─────────┘           └─────────┘
```

### 模块目录结构

```
src/modules/<name>/
├── index.ts           # 模块入口
├── types.ts           # 类型定义
├── components/        # React 组件
├── hooks/             # React Hooks
├── services/          # 业务服务
├── store/             # 状态管理
└── __tests__/         # 测试
```

---

## Skill 文件格式

### 基本结构

```markdown
<!--
  @file: skill-002-api-fetch.md
  @parent: _generated/
  @function: 从 REST API 获取 JSON 数据
  @skills: -
  @created: 2026-01-14
  @updated: 2026-01-14
  @generator: genesis
-->
---
id: skill-002-api-fetch
name: API Fetch
version: 1.0.0
description: 从 REST API 获取 JSON 数据，支持 GET 和 POST 请求
directory: _generated/
upstream: []
downstream: []
inputs:
  - name: url
    type: string
    required: true
    description: API 请求的 URL 地址
outputs:
  - name: data
    type: object
    description: API 返回的 JSON 数据
created_by: genesis
created_at: 2026-01-14
tags:
  - generated
  - api
---

# API Fetch

> 从 REST API 获取 JSON 数据

## Instructions

[具体执行步骤]

## Communication

[状态读写方式]

## Error Handling

[错误处理策略]
```

### 文件规范

| 规范 | 说明 |
|------|------|
| **注释头** | 每个文件必须有标准注释 |
| **YAML frontmatter** | 包含元数据定义 |
| **目录索引** | 每个目录有 `claude.md` |
| **命名格式** | `skill-<NNN>-<name>.md` |

---

## DAG 依赖关系

Skills 通过 `upstream` 和 `downstream` 形成有向无环图：

```
genesis ──▶ registry ──▶ orchestrator
                              │
         ┌────────────────────┼────────────────────┐
         ▼                    ▼                    ▼
    api-fetch            json-to-csv          file-analyzer
         │                    │
         └─────────┬──────────┘
                   ▼
              aggregate
```

**规则:**
- 无依赖的 skills 可并行执行
- 有依赖的 skills 按拓扑序执行
- 循环依赖会被自动检测并拒绝

---

## 状态管理

### state.json 结构

```json
{
  "version": "1.0.0",
  "current_execution": "exec-20260114-abc123",
  "executions": {
    "exec-20260114-abc123": {
      "status": "running",
      "pipeline": ["skill-001", "skill-002"],
      "data": {
        "skill-001": {
          "status": "completed",
          "output": { ... }
        }
      }
    }
  }
}
```

### 状态流转

```
pending ──▶ running ──▶ completed
               │
               ├──▶ failed ──▶ retrying
               │
               └──▶ skipped
```

---

## 注意事项

1. **不要手动修改** `_meta/` 目录下的核心 skills
2. **自定义 skills** 通过 Genesis 生成或手动创建在 `_generated/`
3. **每个目录** 必须有 `claude.md` 索引文件
4. **每个文件** 必须有标准注释头
5. **skills.json** 由系统自动维护
6. **热重载** 修改后立即生效，无需重启

---

## FAQ

**Q: Skill 是如何被触发的？**

A: 通过自然语言描述。Claude 会根据你的请求匹配最相关的 skill。

**Q: 可以手动创建 skill 吗？**

A: 可以。在 `.claude/skills/` 下创建 `<name>/SKILL.md`，包含 YAML frontmatter。

**Q: 如何调试 skill？**

A: 查看 `context/state.json` 中的执行状态，或请求验证注册表一致性。

**Q: 支持哪些前端框架？**

A: React、Vue、Svelte。初始化时指定：`初始化一个 Vue 项目`

---

## 版本历史

| 版本 | 日期 | 变更 |
|------|------|------|
| 2.0.0 | 2026-01-14 | 添加前端扩展，支持超大型项目 |
| 1.0.0 | 2026-01-14 | 初始版本，核心三元 Skill |

---

## License

MIT
