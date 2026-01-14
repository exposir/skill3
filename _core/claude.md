# _core 目录索引

> 核心基础设施文档目录

## 基本信息

- **目录**: `_core/`
- **父级**: `/` (项目根目录)
- **功能**: 存放核心规范和协议文档，定义 skill 的标准格式和通信方式

## 目录结构

```
_core/
├── claude.md              # 本文件 - 目录索引
├── skill-template.md      # Skill 模板规范
└── communication.md       # 通信协议规范
```

## 文件说明

| 文件 | 功能 | 调用的 Skills |
|------|------|--------------|
| `skill-template.md` | 定义 skill 文件的标准格式和必需字段 | - |
| `communication.md` | 定义 skills 之间如何传递数据 | - |

## 使用方式

- **Genesis** 在生成新 skill 时会参考 `skill-template.md`
- **Orchestrator** 在执行 skills 时会遵循 `communication.md` 中的协议

## 可扩展性

这些文档可以根据需要进行自定义和扩展：
- 添加新的模板字段
- 扩展通信协议
- 定义新的数据格式

## 更新日志

| 日期 | 变更 |
|------|------|
| 2026-01-14 | 创建目录索引 |
