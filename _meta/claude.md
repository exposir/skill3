# _meta 目录索引

> 元 Skill 源文件目录，包含系统核心 skills

## 基本信息

- **目录**: `_meta/`
- **父级**: `/` (项目根目录)
- **功能**: 存放元 Skill 源文件，这些是系统核心，不建议手动修改

## 目录结构

```
_meta/
├── claude.md              # 本文件 - 目录索引
├── genesis.md             # 创世技能 - 生成新 skill
├── registry.md            # 注册表管理
├── orchestrator.md        # 执行编排器
│
└── frontend/              # 前端扩展 Skills
    ├── claude.md          # 子目录索引
    ├── project-init.md    # 项目初始化
    ├── module-generator.md # 模块生成器
    ├── contracts.md       # 契约管理
    ├── build.md           # 构建验证
    └── coordinator.md     # 模块协调器
```

## 文件说明

| 文件 | 功能 | 调用的 Skills |
|------|------|--------------|
| `genesis.md` | 根据用户需求生成新 skill | registry |
| `registry.md` | 管理 skill 注册表和 DAG | - |
| `orchestrator.md` | 按 DAG 顺序编排执行 skills | registry |

## 注意事项

- 这些文件通过符号链接配置到 `.claude/skills/` 目录
- 修改这些文件会影响整个系统的行为
- 如需扩展，请在 `_generated/` 目录创建新 skill

## 更新日志

| 日期 | 变更 |
|------|------|
| 2026-01-14 | 创建目录索引 |
