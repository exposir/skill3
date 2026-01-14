# Darwin 项目结构索引

> 此文件是项目根目录的结构索引，用于防止无序扩张，保持项目结构清晰。

## 基本信息

- **项目名称**: Darwin - 自进化 Skill 编排系统
- **版本**: 2.0.0
- **根目录**: /Users/menglingyu/skill3

## 目录结构

```
darwin/
│
├── claude.md                    # 本文件 - 项目结构索引
├── README.md                    # 项目说明文档
├── demo.md                      # 使用示例
├── skills.json                  # DAG 注册表
│
├── .claude/                     # Claude Code 配置目录
│   └── skills/                  # Skill 配置（符号链接）
│       ├── genesis/
│       ├── registry/
│       ├── orchestrator/
│       └── ...
│
├── _meta/                       # 元 Skill 源文件（核心，勿改）
│   ├── genesis.md
│   ├── registry.md
│   ├── orchestrator.md
│   └── frontend/                # 前端扩展 Skills
│
├── _core/                       # 核心基础设施文档
│   ├── skill-template.md
│   └── communication.md
│
├── _generated/                  # 自动生成的 Skills
│   └── skill-*.md
│
├── context/                     # 运行时上下文
│   └── state.json
│
├── src/                         # 前端代码目录（如有）
│   ├── modules/
│   └── contracts/
│
└── templates/                   # 代码模板
```

## 文件命名规范

| 类型 | 命名规范 | 示例 |
|------|----------|------|
| 生成的 Skill | `skill-<三位数字>-<简短描述>.md` | `skill-002-api-fetch.md` |
| 模块 Skill | `skill-module-<模块名>.md` | `skill-module-auth.md` |
| 目录索引 | `claude.md` | 每个目录必须有 |

## 文件注释规范

每个 `.md` 文件头部必须包含：

```markdown
<!--
  @file: <文件名>
  @parent: <父级目录>
  @function: <文件功能描述>
  @skills: <调用的 skills，逗号分隔>
  @created: <创建日期>
  @updated: <更新日期>
-->
```

## 子目录索引

| 目录 | 说明 | claude.md |
|------|------|-----------|
| `.claude/skills/` | Claude Code skill 配置 | 有 |
| `_meta/` | 元 Skill 源文件 | 有 |
| `_core/` | 核心基础设施文档 | 有 |
| `_generated/` | 自动生成的 Skills | 有 |
| `context/` | 运行时上下文 | 有 |

## 更新日志

| 日期 | 变更 |
|------|------|
| 2026-01-14 | 创建项目结构索引 |
