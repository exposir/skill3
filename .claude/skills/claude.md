# .claude/skills 目录索引

> Claude Code Skill 配置目录

## 基本信息

- **目录**: `.claude/skills/`
- **父级**: `.claude/`
- **功能**: Claude Code 识别和加载 skills 的配置目录

## 目录结构

```
.claude/skills/
├── claude.md              # 本文件 - 目录索引
│
├── genesis/               # 创世技能
│   └── SKILL.md → ../../../_meta/genesis.md
│
├── registry/              # 注册表管理
│   └── SKILL.md → ../../../_meta/registry.md
│
├── orchestrator/          # 执行编排器
│   └── SKILL.md → ../../../_meta/orchestrator.md
│
├── project-init/          # 项目初始化
│   └── SKILL.md → ../../../_meta/frontend/project-init.md
│
├── module-gen/            # 模块生成器
│   └── SKILL.md → ../../../_meta/frontend/module-generator.md
│
├── contracts/             # 契约管理
│   └── SKILL.md → ../../../_meta/frontend/contracts.md
│
├── build/                 # 构建验证
│   └── SKILL.md → ../../../_meta/frontend/build.md
│
├── coordinate/            # 模块协调器
│   └── SKILL.md → ../../../_meta/frontend/coordinator.md
│
└── <generated-skills>/    # 生成的 skills（由 Genesis 创建）
    └── SKILL.md → ../../../_generated/skill-*.md
```

## 配置规范

每个 skill 是一个**目录**，包含 `SKILL.md` 文件：

```
<skill-name>/
└── SKILL.md    # 符号链接或实际文件
```

## 符号链接规范

- **元 Skills**: 链接到 `_meta/` 目录
- **生成的 Skills**: 链接到 `_generated/` 目录

```bash
# 创建符号链接示例
ln -s ../../../_generated/skill-002-api-fetch.md .claude/skills/api-fetch/SKILL.md
```

## 已配置的 Skills

| 目录 | 源文件 | 功能 |
|------|--------|------|
| `genesis/` | `_meta/genesis.md` | 生成新 skill |
| `registry/` | `_meta/registry.md` | 注册表管理 |
| `orchestrator/` | `_meta/orchestrator.md` | 执行编排 |
| `project-init/` | `_meta/frontend/project-init.md` | 项目初始化 |
| `module-gen/` | `_meta/frontend/module-generator.md` | 模块生成 |
| `contracts/` | `_meta/frontend/contracts.md` | 契约管理 |
| `build/` | `_meta/frontend/build.md` | 构建验证 |
| `coordinate/` | `_meta/frontend/coordinator.md` | 模块协调 |
| `api-fetch/` | `_generated/skill-002-api-fetch.md` | REST API 数据获取 |
| `mf-init/` | `_generated/skill-003-mf-init.md` | 微前端项目初始化 |
| `app-generator/` | `_generated/skill-004-app-generator.md` | 微前端子应用生成 |
| `shared-lib/` | `_generated/skill-005-shared-lib.md` | 共享库生成 |
| `batch-module/` | `_generated/skill-006-batch-module.md` | 批量模块生成 |

## 更新日志

| 日期 | 变更 |
|------|------|
| 2026-01-15 | 添加 app-generator, shared-lib, batch-module skills |
| 2026-01-14 | 添加 mf-init skill |
| 2026-01-14 | 添加 api-fetch skill |
| 2026-01-14 | 创建目录索引，配置核心 skills |
