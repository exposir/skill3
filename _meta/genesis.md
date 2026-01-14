---
id: genesis
name: Genesis
version: 1.2.0
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

<!--
  @file: genesis.md
  @parent: _meta/
  @function: 元技能 - 根据用户需求自动生成新的 skill
  @skills: registry
  @created: 2026-01-14
  @updated: 2026-01-14
-->

# Genesis - Skill 生成器

> 根据用户需求自动生成新的 skill 文件，配置到 Claude Code，并注册到系统中

## Context

Genesis 是整个自进化系统的核心。它负责：
1. 解析用户的需求描述
2. 生成符合规范的 skill 文件（包含标准注释）
3. 配置到 Claude Code 的 `.claude/skills/` 目录
4. 自动注册到 skills.json
5. 更新目录索引 claude.md
6. 通过热重载机制使新 skill 立即可用

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

**重要**: 文件必须包含标准注释头，格式如下：

```markdown
<!--
  @file: <文件名>
  @parent: _generated/
  @function: <文件功能描述>
  @skills: <调用的 skills，逗号分隔，无则填 ->
  @created: <当前日期>
  @updated: <当前日期>
  @generator: genesis
-->
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

### Step 4: 更新注册表

读取并更新 `./skills.json`：

1. 在 `skills` 对象中添加新 skill 的元数据
2. 在 `graph.nodes` 中添加新节点
3. 在 `graph.edges` 中添加依赖边
4. 更新 `updated_at` 时间戳

### Step 5: 更新目录索引

**重要**: 更新 `./_generated/claude.md` 文件，在"已生成的 Skills"表格中添加新条目：

```markdown
| <文件名> | <功能描述> | <上游依赖> |
```

同时更新 `./.claude/skills/claude.md` 文件，在"已配置的 Skills"表格中添加新条目。

### Step 6: 确认创建

向用户报告：
- 新 skill 的 ID 和路径
- Claude Code 配置路径
- 注册表已更新
- 目录索引已更新
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
        "registered": true,
        "index_updated": true
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
- **索引更新失败**: 提示手动更新 claude.md

## Examples

### Example 1: 创建数据获取 skill

**用户输入:**
```
帮我创建一个从 REST API 获取 JSON 数据的 skill，需要支持 GET 和 POST 请求
```

**Genesis 执行:**
1. 创建文件: `./_generated/skill-002-api-fetch.md`（包含标准注释头）
2. 创建目录: `./.claude/skills/api-fetch/`
3. 创建链接: `./.claude/skills/api-fetch/SKILL.md` → `../../../_generated/skill-002-api-fetch.md`
4. 更新注册表 `skills.json`
5. 更新索引 `_generated/claude.md` 和 `.claude/skills/claude.md`

**输出:**
```
✓ 已创建 skill: skill-002-api-fetch
✓ 源文件: ./_generated/skill-002-api-fetch.md
✓ Claude Code 配置: ./.claude/skills/api-fetch/SKILL.md
✓ 已注册到 skills.json
✓ 已更新目录索引
✓ skill 已生效，用自然语言描述 API 获取需求即可触发
```

**生成的完整文件内容:**

```markdown
<!--
  @file: skill-002-api-fetch.md
  @parent: _generated/
  @function: 从 REST API 获取 JSON 数据，支持 GET 和 POST 请求
  @skills: -
  @created: 2026-01-14
  @updated: 2026-01-14
  @generator: genesis
-->
---
id: skill-002-api-fetch
name: API Fetch
version: 1.0.0
description: 从 REST API 获取 JSON 数据，支持 GET 和 POST 请求
directory: _generated/
upstream: []
downstream: []
inputs:
  - name: url
    type: string
    required: true
    description: API 请求的 URL 地址
  - name: method
    type: string
    required: false
    description: 请求方法，GET 或 POST，默认 GET
  - name: headers
    type: object
    required: false
    description: 请求头对象
  - name: body
    type: object
    required: false
    description: POST 请求的请求体
outputs:
  - name: data
    type: object
    description: API 返回的 JSON 数据
  - name: status_code
    type: number
    description: HTTP 响应状态码
  - name: success
    type: boolean
    description: 请求是否成功
created_by: genesis
created_at: 2026-01-14
updated_at: 2026-01-14
tags:
  - generated
  - api
  - fetch
  - http
---

# API Fetch

> 从 REST API 获取 JSON 数据，支持 GET 和 POST 请求

## Instructions

当用户需要从 API 获取数据时，执行以下步骤：

### Step 1: 解析参数

从用户输入或上游 skill 获取：
- `url`: 必需，API 地址
- `method`: 可选，默认 GET
- `headers`: 可选，请求头
- `body`: 可选，POST 请求体

### Step 2: 发送请求

使用适当的工具发送 HTTP 请求：

**GET 请求:**
```bash
curl -X GET "<url>" -H "Content-Type: application/json"
```

**POST 请求:**
```bash
curl -X POST "<url>" -H "Content-Type: application/json" -d '<body>'
```

### Step 3: 处理响应

解析响应数据：
- 检查状态码是否为 2xx
- 解析 JSON 响应体
- 处理可能的错误

### Step 4: 输出结果

将结果写入 state.json 并返回给用户或下游 skill。

## Communication

### Reading State
从 `./context/state.json` 读取上游数据（如有）

### Writing State
```json
{
  "data": {
    "skill-002-api-fetch": {
      "status": "completed",
      "output": {
        "success": true,
        "data": { ... },
        "status_code": 200
      }
    }
  }
}
```

## Error Handling

- **URL 无效**: 返回错误信息，提示检查 URL 格式
- **网络错误**: 返回错误信息，包含具体错误原因
- **非 2xx 状态码**: 返回错误信息，包含状态码和响应体
- **JSON 解析失败**: 返回原始响应内容

## Examples

### 示例 1: GET 请求
```
从 https://api.github.com/users/octocat 获取用户信息
```

### 示例 2: POST 请求
```
向 https://api.example.com/data 发送 POST 请求，body 为 {"name": "test"}
```
```

---

### Example 2: 创建带依赖的数据转换 skill

**用户输入:**
```
创建一个 JSON 转 CSV 的 skill，它依赖 api-fetch skill 的输出
```

**Genesis 执行:**
1. 创建文件: `./_generated/skill-003-json-to-csv.md`
2. 配置 upstream: `skill-002-api-fetch`
3. 创建目录: `./.claude/skills/json-to-csv/`
4. 创建链接: `./.claude/skills/json-to-csv/SKILL.md` → `../../../_generated/skill-003-json-to-csv.md`
5. 更新注册表和依赖图
6. 更新目录索引

**输出:**
```
✓ 已创建 skill: skill-003-json-to-csv
✓ 源文件: ./_generated/skill-003-json-to-csv.md
✓ Claude Code 配置: ./.claude/skills/json-to-csv/SKILL.md
✓ upstream: [skill-002-api-fetch]
✓ 已注册到 skills.json
✓ 已更新目录索引
✓ skill 已生效
```

**生成的完整文件内容:**

```markdown
<!--
  @file: skill-003-json-to-csv.md
  @parent: _generated/
  @function: 将 JSON 数据转换为 CSV 格式
  @skills: skill-002-api-fetch
  @created: 2026-01-14
  @updated: 2026-01-14
  @generator: genesis
-->
---
id: skill-003-json-to-csv
name: JSON to CSV
version: 1.0.0
description: 将 JSON 数据转换为 CSV 格式
directory: _generated/
upstream:
  - skill-002-api-fetch
downstream: []
inputs:
  - name: json_data
    type: array
    required: true
    description: 要转换的 JSON 数组数据（从上游获取）
  - name: output_file
    type: string
    required: false
    description: 输出文件路径，默认 ./output/data.csv
outputs:
  - name: csv_content
    type: string
    description: 生成的 CSV 内容
  - name: file_path
    type: string
    description: 保存的文件路径
  - name: row_count
    type: number
    description: 转换的行数
created_by: genesis
created_at: 2026-01-14
updated_at: 2026-01-14
tags:
  - generated
  - transform
  - csv
  - json
---

# JSON to CSV

> 将 JSON 数据转换为 CSV 格式

## Instructions

当需要将 JSON 数据转换为 CSV 时，执行以下步骤：

### Step 1: 读取上游数据

从 `./context/state.json` 读取上游 skill 的输出：
```
data.skill-002-api-fetch.output.data
```

### Step 2: 验证数据格式

检查数据是否为数组格式：
- 如果是对象，尝试提取数组字段
- 如果无法转换，返回错误

### Step 3: 提取字段名

从第一条记录提取所有字段名作为 CSV 表头。

### Step 4: 生成 CSV

遍历数据，生成 CSV 格式：
```
field1,field2,field3
value1,value2,value3
...
```

### Step 5: 保存文件

将 CSV 内容保存到指定路径（默认 `./output/data.csv`）。

### Step 6: 输出结果

返回 CSV 内容、文件路径和行数。

## Communication

### Reading State
```javascript
const upstreamData = state.data["skill-002-api-fetch"].output.data;
```

### Writing State
```json
{
  "data": {
    "skill-003-json-to-csv": {
      "status": "completed",
      "output": {
        "csv_content": "...",
        "file_path": "./output/data.csv",
        "row_count": 100
      }
    }
  }
}
```

## Error Handling

- **上游数据为空**: 生成空 CSV（仅表头）
- **数据格式错误**: 返回错误信息
- **文件写入失败**: 返回 CSV 内容但标记文件保存失败
```

---

### Example 3: 创建模块 skill（前端模块）

**用户输入:**
```
为 auth 模块创建一个维护 skill，用于实现登录、注册、登出功能
```

**Genesis 执行:**
1. 创建文件: `./_generated/skill-module-auth.md`
2. 创建目录: `./.claude/skills/module-auth/`
3. 创建链接
4. 更新注册表
5. 更新目录索引

**输出:**
```
✓ 已创建 skill: skill-module-auth
✓ 源文件: ./_generated/skill-module-auth.md
✓ Claude Code 配置: ./.claude/skills/module-auth/SKILL.md
✓ 已注册到 skills.json
✓ 已更新目录索引
✓ skill 已生效
```

**生成的完整文件内容:**

```markdown
<!--
  @file: skill-module-auth.md
  @parent: _generated/
  @function: Auth 模块维护 skill，实现登录、注册、登出功能
  @skills: -
  @created: 2026-01-14
  @updated: 2026-01-14
  @generator: genesis
-->
---
id: skill-module-auth
name: Module Auth
version: 1.0.0
description: Auth 模块维护 skill，实现登录、注册、登出功能
directory: _generated/
upstream: []
downstream: []
inputs:
  - name: action
    type: string
    required: true
    description: 操作类型 - implement, fix, refactor, test
  - name: feature
    type: string
    required: false
    description: 具体功能 - login, register, logout
outputs:
  - name: files_created
    type: array
    description: 创建的文件列表
  - name: files_modified
    type: array
    description: 修改的文件列表
created_by: genesis
created_at: 2026-01-14
updated_at: 2026-01-14
tags:
  - generated
  - module
  - auth
  - frontend
---

# Module Auth

> Auth 模块维护 skill，负责实现和维护认证相关功能

## Context

此 skill 负责维护 `src/modules/auth/` 目录下的代码，包括：
- 登录功能 (login)
- 注册功能 (register)
- 登出功能 (logout)
- 认证状态管理

## Module Structure

```
src/modules/auth/
├── index.ts              # 模块入口
├── types.ts              # 类型定义
├── constants.ts          # 常量
├── components/
│   ├── LoginForm.tsx
│   ├── RegisterForm.tsx
│   ├── AuthProvider.tsx
│   └── AuthGuard.tsx
├── hooks/
│   └── useAuth.ts
├── services/
│   └── auth.service.ts
└── __tests__/
    └── auth.test.ts
```

## Instructions

### action=implement

实现指定功能：

1. 检查模块目录是否存在
2. 根据 feature 参数实现对应功能
3. 确保遵循项目代码规范
4. 更新 index.ts 导出

### action=fix

修复 bug：

1. 分析问题描述
2. 定位问题代码
3. 实现修复
4. 验证修复效果

### action=test

编写或运行测试：

1. 为指定功能编写测试用例
2. 运行测试并报告结果

## Communication

### Writing State
```json
{
  "data": {
    "skill-module-auth": {
      "status": "completed",
      "output": {
        "action": "implement",
        "feature": "login",
        "files_created": ["src/modules/auth/components/LoginForm.tsx"],
        "files_modified": ["src/modules/auth/index.ts"]
      }
    }
  }
}
```

## Error Handling

- **模块不存在**: 提示先运行 module-gen 创建模块
- **功能未知**: 列出支持的功能列表
- **代码冲突**: 报告冲突并请求用户确认

## Examples

### 实现登录功能
```
在 auth 模块中实现登录表单和登录逻辑
```

### 修复 bug
```
修复 auth 模块中的 token 刷新问题
```

### 运行测试
```
运行 auth 模块的所有测试
```
```

---

### Example 4: 创建工具类 skill

**用户输入:**
```
创建一个文件分析 skill，可以分析指定文件的行数、大小、类型等信息
```

**生成的完整文件内容:**

```markdown
<!--
  @file: skill-004-file-analyzer.md
  @parent: _generated/
  @function: 分析文件的行数、大小、类型等信息
  @skills: -
  @created: 2026-01-14
  @updated: 2026-01-14
  @generator: genesis
-->
---
id: skill-004-file-analyzer
name: File Analyzer
version: 1.0.0
description: 分析文件的行数、大小、类型等信息
directory: _generated/
upstream: []
downstream: []
inputs:
  - name: path
    type: string
    required: true
    description: 要分析的文件或目录路径
  - name: recursive
    type: boolean
    required: false
    description: 是否递归分析子目录
outputs:
  - name: file_info
    type: object
    description: 文件信息对象
  - name: summary
    type: string
    description: 分析摘要文本
created_by: genesis
created_at: 2026-01-14
updated_at: 2026-01-14
tags:
  - generated
  - utility
  - file
  - analysis
---

# File Analyzer

> 分析文件的行数、大小、类型等信息

## Instructions

当用户需要分析文件信息时：

### Step 1: 验证路径

检查指定路径是否存在：
```bash
ls -la <path>
```

### Step 2: 判断类型

- 如果是文件：分析单个文件
- 如果是目录：分析目录下所有文件

### Step 3: 收集信息

对每个文件收集：
- 文件名
- 文件大小 (bytes, KB, MB)
- 行数 (文本文件)
- 文件类型 (扩展名)
- 最后修改时间
- 编码格式 (如可检测)

### Step 4: 生成报告

输出格式化的分析报告：

```
=== File Analysis ===

文件: example.ts
路径: /path/to/example.ts
大小: 2.5 KB
行数: 85
类型: TypeScript
编码: UTF-8
修改: 2026-01-14 10:30:00
```

## Communication

### Writing State
```json
{
  "data": {
    "skill-004-file-analyzer": {
      "status": "completed",
      "output": {
        "file_info": {
          "name": "example.ts",
          "path": "/path/to/example.ts",
          "size_bytes": 2560,
          "size_human": "2.5 KB",
          "lines": 85,
          "type": "TypeScript",
          "encoding": "UTF-8",
          "modified": "2026-01-14T10:30:00Z"
        },
        "summary": "分析完成: 1 个文件, 共 85 行"
      }
    }
  }
}
```

## Error Handling

- **路径不存在**: 返回错误信息
- **无权限**: 报告权限问题
- **二进制文件**: 跳过行数统计，标记为二进制
```

## Self-Evolution

Genesis 可以通过以下方式自我改进：

1. **模板优化**: 根据生成的 skills 的使用反馈优化模板
2. **模式学习**: 识别常见的 skill 模式并创建子模板
3. **自动标签**: 基于内容自动推断合适的标签

当检测到重复的 skill 模式时，Genesis 应该：
1. 提议创建可复用的基础 skill
2. 将现有 skills 重构为继承基础 skill
