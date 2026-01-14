---
id: genesis
name: Genesis
version: 1.1.0
description: 元技能 - 根据用户需求自动生成新的 skill，并配置到 Claude Code
directory: _meta/
upstream: []
downstream:
  - registry
inputs:
  - name: requirement
    type: string
    required: true
    description: 用户对新 skill 的需求描述
  - name: name
    type: string
    required: false
    description: 可选的 skill 名称
outputs:
  - name: skill_id
    type: string
    description: 生成的 skill ID
  - name: skill_path
    type: string
    description: 生成的 skill 文件路径
  - name: claude_skill_path
    type: string
    description: Claude Code skill 配置路径
created_by: manual
created_at: 2026-01-14
updated_at: 2026-01-14
tags:
  - meta
  - generator
  - core
---

# Genesis - Skill 生成器

> 根据用户需求自动生成新的 skill 文件，配置到 Claude Code，并注册到系统中

## Context

Genesis 是整个自进化系统的核心。它负责：
1. 解析用户的需求描述
2. 生成符合规范的 skill 文件
3. 配置到 Claude Code 的 `.claude/skills/` 目录
4. 自动注册到 skills.json
5. 通过热重载机制使新 skill 立即可用

## Instructions

当用户描述创建新 skill 的需求时，执行以下步骤：

### Step 1: 解析需求

分析用户提供的需求描述，提取：
- **目的**: 这个 skill 要做什么
- **输入**: 需要什么输入参数
- **输出**: 会产生什么输出
- **依赖**: 是否依赖其他 skills
- **下游**: 哪些 skills 会使用它的输出

### Step 2: 生成 Skill ID 和名称

生成唯一的 skill ID：
```
skill-<三位数字>-<简短描述>
例如: skill-001-data-fetch
```

同时生成 Claude Code 可识别的 skill 名称（用于目录名）：
```
<简短描述>
例如: data-fetch
```

查询 `./skills.json` 获取当前最大的 skill 编号，然后 +1。

### Step 3: 创建 Skill 文件（两个位置）

#### 3a. 在 `_generated/` 目录创建完整 skill 文件

在 `./_generated/` 目录下创建新的 skill 文件，用于版本控制。

文件必须遵循 `./_core/skill-template.md` 中定义的模板格式：

```markdown
---
id: <generated-id>
name: <skill-name>
version: 1.0.0
description: <用户需求的简化描述，最多 200 字符>
directory: _generated/
upstream:
  - <依赖的 skill>
downstream:
  - <下游 skill>
inputs:
  - name: <参数名>
    type: <类型>
    required: <true/false>
    description: <描述>
outputs:
  - name: <输出名>
    type: <类型>
    description: <描述>
created_by: genesis
created_at: <当前日期>
updated_at: <当前日期>
tags:
  - generated
  - <其他相关标签>
---

# <Skill Name>

> <一句话描述>

## Instructions

<根据用户需求生成的具体执行步骤>

## Communication

### Reading State
Read from `./context/state.json`
Access `data.<upstream-skill>.output` for input

### Writing State
Write to `data.<this-skill>.output`
Set `data.<this-skill>.status` to "completed"

## Error Handling

- <错误处理逻辑>
```

#### 3b. 在 `.claude/skills/` 目录配置 Claude Code skill

**重要**: 这一步让 Claude Code 能够识别和加载新 skill。

1. 创建目录 `./.claude/skills/<skill-name>/`
2. 创建符号链接 `./.claude/skills/<skill-name>/SKILL.md` 指向 `../../../_generated/<skill-filename>.md`

执行命令：
```bash
mkdir -p ./.claude/skills/<skill-name>
ln -s ../../../_generated/<skill-filename>.md ./.claude/skills/<skill-name>/SKILL.md
```

例如，对于 `skill-002-data-fetch`：
```bash
mkdir -p ./.claude/skills/data-fetch
ln -s ../../../_generated/skill-002-data-fetch.md ./.claude/skills/data-fetch/SKILL.md
```

### Step 4: 更新注册表

读取并更新 `./skills.json`：

1. 在 `skills` 对象中添加新 skill 的元数据
2. 在 `graph.nodes` 中添加新节点
3. 在 `graph.edges` 中添加依赖边
4. 更新 `updated_at` 时间戳

### Step 5: 确认创建

向用户报告：
- 新 skill 的 ID 和路径
- Claude Code 配置路径
- 注册表已更新
- skill 已通过热重载生效，可以用自然语言触发

## Communication

### Writing State

创建成功后，更新 state.json：

```json
{
  "data": {
    "genesis": {
      "status": "completed",
      "output": {
        "skill_id": "<new-skill-id>",
        "skill_path": "./_generated/<filename>.md",
        "claude_skill_path": "./.claude/skills/<skill-name>/SKILL.md",
        "registered": true
      }
    }
  }
}
```

## Error Handling

- **需求不清晰**: 请求用户提供更多细节
- **ID 冲突**: 自动选择下一个可用 ID
- **文件写入失败**: 报告错误并提供手动创建指南
- **注册表更新失败**: 保留 skill 文件，提示手动注册
- **符号链接创建失败**: 报告错误，尝试直接复制文件作为备选

## Examples

### Example 1: 创建数据获取 skill

**用户输入:**
```
帮我创建一个从 REST API 获取 JSON 数据的 skill，需要支持 GET 和 POST 请求
```

**Genesis 执行:**
1. 创建文件: `./_generated/skill-002-api-fetch.md`
2. 创建目录: `./.claude/skills/api-fetch/`
3. 创建链接: `./.claude/skills/api-fetch/SKILL.md` → `../../../_generated/skill-002-api-fetch.md`
4. 更新注册表

**输出:**
```
✓ 已创建 skill: skill-002-api-fetch
✓ 源文件: ./_generated/skill-002-api-fetch.md
✓ Claude Code 配置: ./.claude/skills/api-fetch/SKILL.md
✓ 已注册到 skills.json
✓ skill 已生效，用自然语言描述 API 获取需求即可触发
```

### Example 2: 创建数据转换 skill

**用户输入:**
```
创建一个 JSON 转 CSV 的 skill，它依赖 api-fetch skill 的输出
```

**Genesis 执行:**
1. 创建文件: `./_generated/skill-003-json-to-csv.md`
2. 配置 upstream: `skill-002-api-fetch`
3. 创建目录和链接到 `.claude/skills/json-to-csv/`
4. 更新注册表和依赖图

## Self-Evolution

Genesis 可以通过以下方式自我改进：

1. **模板优化**: 根据生成的 skills 的使用反馈优化模板
2. **模式学习**: 识别常见的 skill 模式并创建子模板
3. **自动标签**: 基于内容自动推断合适的标签

当检测到重复的 skill 模式时，Genesis 应该：
1. 提议创建可复用的基础 skill
2. 将现有 skills 重构为继承基础 skill
