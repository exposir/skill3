---
id: communication
name: Communication Protocol
version: 1.0.0
description: 定义 skill 之间的通信协议和状态传递机制
directory: _core/
upstream: []
downstream: []
inputs: []
outputs: []
created_by: manual
created_at: 2026-01-14
updated_at: 2026-01-14
tags:
  - core
  - protocol
  - communication
---

# Communication Protocol - 通信协议

> 定义 skills 之间的数据传递、状态共享和事件通知机制

## Overview

本协议定义了 skill 系统中的三种通信模式：

1. **State-based (状态共享)**: 通过 state.json 共享数据
2. **Event-driven (事件驱动)**: 通过事件通知机制
3. **Direct (直接调用)**: 一个 skill 显式调用另一个

## State-based Communication

### State File Structure

`./context/state.json`:

```json
{
  "version": "1.0.0",
  "current_execution": "exec-001",
  "executions": {
    "exec-001": {
      "execution_id": "exec-001",
      "status": "running",
      "pipeline": ["skill-a", "skill-b", "skill-c"],
      "current_skill": "skill-b",
      "data": {
        "skill-a": {
          "status": "completed",
          "input": { "url": "https://api.example.com" },
          "output": { "data": [...], "count": 100 }
        },
        "skill-b": {
          "status": "running",
          "input": { "data": "<<ref:skill-a.output.data>>" }
        }
      }
    }
  }
}
```

### Reading Data from Upstream

当 skill 需要从上游获取数据时：

```markdown
## Reading from Upstream

1. Read `./context/state.json`
2. Get current execution: `state.current_execution`
3. Access upstream data: `state.executions[exec_id].data[upstream_skill_id].output`

Example:
- To get output from skill-a: `state.executions.exec-001.data["skill-a"].output`
```

### Writing Data for Downstream

当 skill 完成执行后：

```markdown
## Writing for Downstream

1. Read current state.json
2. Update this skill's data:
   ```json
   {
     "data": {
       "<this-skill-id>": {
         "status": "completed",
         "completed_at": "<timestamp>",
         "output": { <your-output-data> }
       }
     }
   }
   ```
3. Write back to state.json
```

### Reference Syntax

支持引用其他 skill 的输出：

```
<<ref:skill-id.output.field>>        # 引用特定字段
<<ref:skill-id.output>>              # 引用整个输出
<<ref:skill-id.status>>              # 引用状态
```

## Event-driven Communication

### Event Types

| Event | Trigger | Data |
|-------|---------|------|
| `skill:started` | Skill 开始执行 | skill_id, execution_id |
| `skill:completed` | Skill 成功完成 | skill_id, output |
| `skill:failed` | Skill 执行失败 | skill_id, error |
| `pipeline:started` | 管道开始 | execution_id, pipeline |
| `pipeline:completed` | 管道完成 | execution_id, results |

### Event Log

事件记录在 `./context/events.log`:

```
2026-01-14T10:00:00Z [skill:started] {"skill_id": "skill-a", "execution_id": "exec-001"}
2026-01-14T10:00:05Z [skill:completed] {"skill_id": "skill-a", "output": {...}}
2026-01-14T10:00:06Z [skill:started] {"skill_id": "skill-b", "execution_id": "exec-001"}
```

### Subscribing to Events

Skills 可以声明要监听的事件：

```yaml
---
id: skill-monitor
events:
  subscribe:
    - skill:failed
    - pipeline:completed
---
```

## Direct Invocation

### Calling Another Skill

一个 skill 可以显式调用另一个：

```markdown
## Instructions

1. 完成初始处理
2. 调用 `skill-helper` 处理子任务:
   - 使用 `/skill-helper` 命令
   - 传递参数: input=<data>
3. 获取结果继续处理
```

### Passing Data Directly

直接调用时传递数据：

```markdown
调用 skill-b 并传递数据:
/skill-b input='{"data": [1,2,3]}'
```

## Data Formats

### Standard Output Format

所有 skills 应使用标准输出格式：

```json
{
  "success": true,
  "data": { ... },
  "metadata": {
    "processed_at": "2026-01-14T10:00:00Z",
    "duration_ms": 1500,
    "records_count": 100
  },
  "errors": []
}
```

### Error Format

错误输出格式：

```json
{
  "success": false,
  "data": null,
  "metadata": {
    "processed_at": "2026-01-14T10:00:00Z"
  },
  "errors": [
    {
      "code": "VALIDATION_ERROR",
      "message": "Invalid input format",
      "field": "url",
      "details": "URL must start with https://"
    }
  ]
}
```

## Type Definitions

### Common Types

```typescript
// Skill Input/Output
interface SkillData {
  status: "pending" | "running" | "completed" | "failed";
  started_at?: string;
  completed_at?: string;
  input: Record<string, any>;
  output: Record<string, any> | null;
  error: SkillError | null;
}

// Error
interface SkillError {
  code: string;
  message: string;
  field?: string;
  details?: string;
  stack?: string;
}

// Execution
interface Execution {
  execution_id: string;
  status: "pending" | "running" | "completed" | "failed" | "partial";
  started_at: string;
  completed_at?: string;
  pipeline: string[];
  current_skill: string | null;
  data: Record<string, SkillData>;
  metadata: Record<string, any>;
}
```

## Best Practices

### 1. Always Check Upstream Status

```markdown
Before processing:
1. Read state.json
2. Verify upstream skill status is "completed"
3. If upstream failed, handle gracefully
```

### 2. Atomic State Updates

```markdown
When updating state:
1. Read current state
2. Modify only your skill's data
3. Write entire state back
4. Verify write succeeded
```

### 3. Idempotent Operations

Skills should be idempotent when possible:
- Same input → Same output
- Can be safely re-run
- Handle duplicate executions gracefully

### 4. Timeout Handling

```markdown
For long-running operations:
1. Update status periodically
2. Set reasonable timeouts
3. Clean up on timeout
```

## Examples

### Example: Reading Upstream Data

```markdown
## Instructions

1. Read state.json
2. Get execution: `state.current_execution`
3. Access data:
   ```
   upstream_output = state.executions[exec_id].data["api-fetch"].output
   items = upstream_output.data
   ```
4. Process items...
```

### Example: Writing Results

```markdown
## After Processing

Update state.json:
```json
{
  "data": {
    "transform": {
      "status": "completed",
      "completed_at": "2026-01-14T10:05:00Z",
      "output": {
        "success": true,
        "data": { "transformed_items": [...] },
        "metadata": { "count": 50 }
      }
    }
  }
}
```
```
