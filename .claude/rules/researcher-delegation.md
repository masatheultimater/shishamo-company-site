# Researcher Delegation Rules

## When to delegate to Researcher
MUST: Library investigation, repository-wide analysis, multi-document research
SKIP: Simple lookups, known information, single-page references

## Execution
- Use Task tool to spawn Researcher sub-agent
- If Gemini CLI available: delegate via `gemini -p`
- Save results to `.claude/docs/research/{topic}.md`
- Return summary only to preserve main context
