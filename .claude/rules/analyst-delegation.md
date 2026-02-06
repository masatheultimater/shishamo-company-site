# Analyst Delegation Rules

## When to consult Analyst
MUST: Design decisions, complex debugging, trade-off analysis, code review for 3+ files
SKIP: Simple edits, standard operations, trivial changes

## Execution
- Use Task tool to spawn Analyst sub-agent
- If Codex CLI available: delegate via `codex exec`
- Always run in background for parallel work
- Quick Rule: "If you hesitate → consult Analyst"
