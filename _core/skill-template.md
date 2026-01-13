# Skill Template

This document defines the standard template for all skills in the self-evolving skill system.

## Metadata Header (Required)

Every skill file MUST begin with a YAML frontmatter block:

```yaml
---
id: <unique-skill-id>           # e.g., "skill-001", "genesis", "orchestrator"
name: <human-readable-name>      # e.g., "data-fetch", "json-transform"
version: <semver>                # e.g., "1.0.0"
description: <brief-description> # What this skill does
directory: <location>            # Where this skill resides
upstream:                        # Skills that feed into this one
  - <skill-id>
  - <skill-id>
downstream:                      # Skills that receive output from this one
  - <skill-id>
inputs:                          # Expected input parameters
  - name: <param-name>
    type: <string|number|boolean|object|array>
    required: <true|false>
    description: <what-this-param-is>
outputs:                         # What this skill produces
  - name: <output-name>
    type: <string|number|boolean|object|array>
    description: <what-this-output-is>
created_by: <genesis|manual>     # How this skill was created
created_at: <ISO-date>           # When this skill was created
updated_at: <ISO-date>           # Last modification date
tags:                            # Categorization tags
  - <tag>
---
```

## Skill Body Structure

### 1. Title Section
```markdown
# <Skill Name>

> <One-line description of what this skill does>
```

### 2. Context Section (Optional)
```markdown
## Context

<Background information Claude needs to understand before executing>
```

### 3. Instructions Section (Required)
```markdown
## Instructions

<Step-by-step instructions for Claude to execute this skill>

1. First, do X
2. Then, do Y
3. Finally, do Z
```

### 4. Communication Protocol Section
```markdown
## Communication

### Reading State
To read the current execution state:
- Read from `~/.claude/skills/context/state.json`
- Look for `data.<upstream-skill-id>.output` for input data

### Writing State
After execution, update state:
- Write output to `data.<this-skill-id>.output`
- Set `data.<this-skill-id>.status` to "completed" or "failed"
```

### 5. Error Handling Section
```markdown
## Error Handling

<How to handle common errors>

- If X fails, then Y
- Always log errors to state.json
```

### 6. Examples Section (Optional)
```markdown
## Examples

### Example 1: <Scenario>
Input: ...
Output: ...
```

---

## Template Example

```markdown
---
id: skill-example
name: example-processor
version: 1.0.0
description: Demonstrates skill template usage
directory: _generated/
upstream:
  - skill-init
downstream:
  - skill-output
inputs:
  - name: data
    type: object
    required: true
    description: The data to process
outputs:
  - name: result
    type: object
    description: Processed result
created_by: genesis
created_at: 2026-01-14
updated_at: 2026-01-14
tags:
  - example
  - template
---

# Example Processor

> Processes input data and produces structured output

## Instructions

1. Read input data from the upstream skill's output in state.json
2. Process the data according to the requirements
3. Write the result to state.json under this skill's output
4. Update status to "completed"

## Communication

### Reading State
```bash
Read ~/.claude/skills/context/state.json
Access data.skill-init.output for input
```

### Writing State
```json
{
  "data": {
    "skill-example": {
      "status": "completed",
      "output": { "result": "..." }
    }
  }
}
```

## Error Handling

- If input data is missing, set status to "failed" with error message
- If processing fails, log the error and notify orchestrator
```
