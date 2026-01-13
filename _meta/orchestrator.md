---
id: orchestrator
name: Orchestrator
version: 1.0.0
description: 按 DAG 拓扑顺序编排和执行 skills
directory: _meta/
upstream:
  - registry
downstream: []
inputs:
  - name: task
    type: string
    required: true
    description: 任务描述
  - name: skills
    type: array
    required: false
    description: 指定要执行的 skill 列表 (可选，默认自动推断)
  - name: input
    type: object
    required: false
    description: 初始输入数据
outputs:
  - name: execution_id
    type: string
    description: 执行追踪 ID
  - name: results
    type: object
    description: 所有 skills 的执行结果
created_by: manual
created_at: 2026-01-14
updated_at: 2026-01-14
tags:
  - meta
  - orchestrator
  - core
---

# Orchestrator - 执行编排器

> 按 DAG 拓扑顺序编排和执行 skills，管理状态传递

## Context

Orchestrator 是 skill 执行的核心调度器，负责：
1. 解析任务需求，确定需要执行的 skills
2. 按拓扑顺序执行 skills
3. 管理 skills 之间的状态传递
4. 处理执行失败和重试

## Instructions

当用户调用 `/orchestrate` 时，执行以下步骤：

### Step 1: 初始化执行

1. 生成唯一的 `execution_id` (格式: `exec-<timestamp>-<random>`)
2. 在 `./context/state.json` 中创建执行记录：

```json
{
  "current_execution": "exec-20260114-abc123",
  "executions": {
    "exec-20260114-abc123": {
      "execution_id": "exec-20260114-abc123",
      "started_at": "2026-01-14T10:00:00Z",
      "status": "running",
      "task": "<用户任务描述>",
      "pipeline": [],
      "current_skill": null,
      "data": {},
      "metadata": {
        "triggered_by": "user",
        "context": {}
      }
    }
  }
}
```

### Step 2: 确定执行管道

**如果用户指定了 skills:**
- 直接使用指定的 skill 列表
- 验证所有 skills 存在且依赖满足

**如果用户只提供了 task 描述:**
- 读取 `skills.json` 获取所有可用 skills
- 分析 task 描述，匹配相关的 skills
- 根据 tags、description 进行语义匹配
- 构建执行管道

**拓扑排序:**
- 根据 upstream/downstream 关系排序
- 确保依赖的 skills 先执行

更新 state.json 中的 `pipeline` 字段。

### Step 3: 执行循环

对于 pipeline 中的每个 skill：

```
for skill in pipeline:
    1. 更新 current_skill
    2. 读取 skill 文件
    3. 准备输入数据 (从上游 skills 的 output 收集)
    4. 执行 skill 的 Instructions
    5. 将输出写入 state.json
    6. 更新 skill 状态为 completed/failed
    7. 如果失败，根据策略决定是否继续
```

### Step 4: 状态管理

每个 skill 执行时，维护如下状态：

```json
{
  "data": {
    "<skill-id>": {
      "status": "running",
      "started_at": "2026-01-14T10:01:00Z",
      "input": { ... },
      "output": null,
      "error": null
    }
  }
}
```

执行完成后：

```json
{
  "data": {
    "<skill-id>": {
      "status": "completed",
      "started_at": "2026-01-14T10:01:00Z",
      "completed_at": "2026-01-14T10:01:30Z",
      "input": { ... },
      "output": { ... },
      "error": null
    }
  }
}
```

### Step 5: 完成执行

当所有 skills 执行完毕：

1. 更新执行状态为 `completed` 或 `partial_failure`
2. 收集所有 skills 的输出
3. 向用户报告执行结果

## Parallel Execution

对于没有依赖关系的 skills，可以并行执行：

```
Layer 1: [skill-a, skill-b]  <- 并行
           ↓         ↓
Layer 2: [skill-c]           <- 等待 a, b 完成
           ↓
Layer 3: [skill-d, skill-e]  <- 并行
```

标记可并行的 skills 组：

```json
{
  "pipeline": ["skill-a", "skill-b", "skill-c", "skill-d", "skill-e"],
  "parallel_groups": [
    ["skill-a", "skill-b"],
    ["skill-c"],
    ["skill-d", "skill-e"]
  ]
}
```

## Communication

### Reading State
- 读取 `./skills.json` 获取 skill 注册信息
- 读取 `./context/state.json` 获取执行状态
- 读取各 skill 文件获取执行指令

### Writing State
持续更新 `./context/state.json` 记录执行进度

## Error Handling

### Skill 执行失败

1. 记录错误信息到 state.json
2. 根据策略决定：
   - **stop**: 停止整个管道
   - **skip**: 跳过当前 skill，继续执行
   - **retry**: 重试当前 skill (最多 3 次)

```json
{
  "data": {
    "<skill-id>": {
      "status": "failed",
      "error": {
        "message": "...",
        "retries": 2,
        "action_taken": "skip"
      }
    }
  }
}
```

### 依赖 Skill 失败

如果某个 skill 的 upstream skill 失败：
1. 检查该 upstream 是否是必需依赖
2. 如果必需，跳过当前 skill
3. 如果可选，使用默认值继续

## Examples

### Example 1: 执行指定 skills

```
/orchestrate task="处理 API 数据" skills=["api-fetch", "transform", "validate"]
```

Orchestrator 执行：
1. 创建执行 ID: exec-20260114-xyz789
2. 验证 skills 存在
3. 按顺序执行: api-fetch → transform → validate
4. 返回所有结果

### Example 2: 自动推断 skills

```
/orchestrate task="从 GitHub API 获取仓库信息并转换为 CSV"
```

Orchestrator 分析：
1. 需要 API 获取 → 匹配 `api-fetch`
2. 需要格式转换 → 匹配 `json-to-csv`
3. 执行管道: api-fetch → json-to-csv

### Example 3: 带初始输入

```
/orchestrate task="处理数据" input={"url": "https://api.github.com/repos"}
```

Orchestrator：
1. 将 input 作为第一个 skill 的输入
2. 后续 skills 从 state 获取数据

## Progress Reporting

执行过程中向用户报告进度：

```
=== Execution: exec-20260114-abc123 ===
Task: 处理 API 数据

[1/3] ▶ api-fetch: Running...
[1/3] ✓ api-fetch: Completed (2.3s)
[2/3] ▶ transform: Running...
[2/3] ✓ transform: Completed (0.5s)
[3/3] ▶ validate: Running...
[3/3] ✓ validate: Completed (0.2s)

=== Execution Complete ===
Duration: 3.0s
Status: Success
Results available in state.json
```
