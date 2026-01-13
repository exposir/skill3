---
id: registry
name: Registry Manager
version: 1.0.0
description: 管理 skill 注册表、依赖关系和版本控制
directory: _meta/
upstream:
  - genesis
downstream:
  - orchestrator
inputs:
  - name: action
    type: string
    required: true
    description: 操作类型 (list, add, remove, update, graph, validate)
  - name: skill_id
    type: string
    required: false
    description: 目标 skill ID
  - name: data
    type: object
    required: false
    description: 更新数据
outputs:
  - name: result
    type: object
    description: 操作结果
  - name: graph
    type: object
    description: DAG 图结构 (仅 graph 操作)
created_by: manual
created_at: 2026-01-14
updated_at: 2026-01-14
tags:
  - meta
  - registry
  - core
---

# Registry Manager - 注册表管理器

> 管理所有 skills 的元数据、依赖关系图和版本控制

## Context

Registry 是 skill 系统的中央注册表管理器，负责：
1. 维护 skills.json 注册表
2. 管理 skill 之间的依赖关系 (DAG)
3. 版本控制和变更追踪
4. 验证 skill 配置的正确性

## Instructions

当用户调用 `/registry` 时，根据 action 参数执行相应操作：

### Action: list

列出所有已注册的 skills：

```
/registry action=list
```

1. 读取 `./skills.json`
2. 格式化输出所有 skills 的摘要信息：
   - ID, Name, Description
   - Type (meta/generated)
   - Status (active/inactive)
   - Upstream/Downstream 数量

### Action: add

添加新 skill 到注册表：

```
/registry action=add skill_id=<id> data=<metadata>
```

1. 验证 skill_id 不存在
2. 验证 data 包含必要字段
3. 添加到 skills.json
4. 更新 graph.nodes 和 graph.edges
5. 重新计算 execution_order (拓扑排序)

### Action: remove

从注册表移除 skill：

```
/registry action=remove skill_id=<id>
```

1. 检查是否有其他 skills 依赖此 skill
2. 如果有依赖，警告用户并列出受影响的 skills
3. 如果确认删除，从 skills、graph.nodes、graph.edges 中移除
4. 可选：删除对应的 skill 文件

### Action: update

更新 skill 元数据：

```
/registry action=update skill_id=<id> data=<partial-metadata>
```

1. 验证 skill 存在
2. 合并更新数据
3. 更新 version (如果有实质性变更)
4. 更新 updated_at 时间戳
5. 如果 upstream/downstream 变更，更新 graph

### Action: graph

显示依赖关系图：

```
/registry action=graph
```

1. 读取 graph 数据
2. 以可视化方式输出 DAG：
   ```
   genesis
     └── registry
           └── orchestrator
                 ├── skill-001-xxx
                 │     └── skill-002-yyy
                 └── skill-003-zzz
   ```

### Action: validate

验证注册表和 skill 文件的一致性：

```
/registry action=validate
```

检查项目：
1. skills.json 中的每个 skill 是否有对应文件
2. 每个 skill 文件是否包含正确的元数据
3. upstream/downstream 引用是否有效
4. 是否存在循环依赖
5. 是否有孤立的 skill (无上下游)

## Topological Sort Algorithm

用于计算 execution_order：

```
function topologicalSort(graph):
    visited = {}
    order = []

    function visit(node):
        if node in visited:
            return
        visited[node] = true
        for each upstream in graph.edges where edge.to == node:
            visit(upstream.from)
        order.push(node)

    for each node in graph.nodes:
        visit(node)

    return order
```

## Communication

### Reading State
读取 `./skills.json` 获取当前注册表

### Writing State
更新操作后写回 `./skills.json`

操作结果写入 `./context/state.json`:
```json
{
  "data": {
    "registry": {
      "status": "completed",
      "output": {
        "action": "<action>",
        "result": {...}
      }
    }
  }
}
```

## Error Handling

- **Skill 不存在**: 返回清晰的错误信息
- **循环依赖检测**: 拒绝创建循环依赖，并显示冲突路径
- **文件缺失**: 标记 skill 状态为 "missing"
- **元数据不完整**: 列出缺失字段

## Examples

### Example 1: 查看所有 skills

```
/registry action=list
```

输出:
```
=== Skill Registry ===
Total: 5 skills (3 meta, 2 generated)

[meta] genesis (v1.0.0) - Active
  └─▶ registry, orchestrator

[meta] registry (v1.0.0) - Active
  └─▶ orchestrator

[meta] orchestrator (v1.0.0) - Active
  └─▶ *

[generated] skill-001-api-fetch (v1.0.0) - Active
  └─▶ skill-002-transform

[generated] skill-002-transform (v1.0.0) - Active
  └─▶ (none)
```

### Example 2: 验证注册表

```
/registry action=validate
```

输出:
```
=== Validation Report ===
✓ All 5 skills have valid files
✓ No circular dependencies
✓ All references valid
⚠ skill-002-transform has no downstream (leaf node)
```
