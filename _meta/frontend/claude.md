# _meta/frontend 目录索引

> 前端扩展 Skills 目录

## 基本信息

- **目录**: `_meta/frontend/`
- **父级**: `_meta/`
- **功能**: 存放前端开发相关的扩展 Skills

## 目录结构

```
_meta/frontend/
├── claude.md              # 本文件 - 目录索引
├── project-init.md        # 项目初始化 skill
├── module-generator.md    # 模块生成器 skill
├── contracts.md           # 契约管理 skill
├── build.md               # 构建验证 skill
└── coordinator.md         # 模块协调器 skill
```

## 文件说明

| 文件 | 功能 | 调用的 Skills |
|------|------|--------------|
| `project-init.md` | 初始化前端项目结构 | - |
| `module-generator.md` | 生成业务模块 | genesis, registry |
| `contracts.md` | 管理模块间接口契约 | - |
| `build.md` | 运行构建验证流水线 | - |
| `coordinator.md` | 协调多模块并行开发 | orchestrator |

## 依赖关系

```
project-init
    └── module-generator
          ├── contracts
          └── coordinator
                └── build
```

## 更新日志

| 日期 | 变更 |
|------|------|
| 2026-01-14 | 创建目录索引 |
