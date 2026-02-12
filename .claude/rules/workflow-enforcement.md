# Mandatory Workflow Protocol

## When WORKFLOW DIRECTIVE appears (from agent-router hook)
Follow the directive steps exactly. Do NOT skip investigation or delegation steps.

## Investigation-First Rule (3+ file changes)
When a task will modify 3 or more files:
1. Use TaskCreate to create a task list before editing.
2. Run `npm run build` to establish a baseline.
3. Implement changes file by file.
4. Run `npm run build` after all changes to verify no regressions.

## Agent Delegation (concrete commands)
- **Design decisions / complex debugging**: Use Task tool (subagent_type=general-purpose)
- **Research / documentation**: Use Task tool (subagent_type=Explore)
- **Quick rule**: If you hesitate on an approach, consult before acting.

## Build Gate (enforced by hooks)
- The Stop hook runs `npm run build` automatically when source files are modified.
- The TaskCompleted hook verifies build before allowing task completion.
- If a build fails, fix the errors before finishing — do NOT ignore build failures.

## Skill Auto-Invoke
When the agent-router hook injects a SKILL AUTO-INVOKE directive, use the Skill tool to invoke the specified skill before proceeding with the main task.

## Trivial Tasks (skip investigation)
These types of changes do NOT require the investigation-first protocol:
- Single file typo/text/CSS value fix
- Comment or documentation update
- Single import addition
- Formatting-only changes
