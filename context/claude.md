# context 目录索引

> 运行时上下文目录

## 基本信息

- **目录**: `context/`
- **父级**: `/` (项目根目录)
- **功能**: 存放运行时状态和 skill 间传递的数据

## 目录结构

```
context/
├── claude.md              # 本文件 - 目录索引
└── state.json             # 运行时状态文件
```

## 文件说明

| 文件 | 功能 | 更新者 |
|------|------|--------|
| `state.json` | 保存执行状态和 skill 间数据传递 | Orchestrator, 各 Skills |

## state.json 结构

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

## 注意事项

- 此文件由系统自动维护，不建议手动修改
- 执行记录会随时间累积，可定期清理历史记录
- Skills 通过此文件进行数据传递

## 更新日志

| 日期 | 变更 |
|------|------|
| 2026-01-14 | 创建目录索引 |
