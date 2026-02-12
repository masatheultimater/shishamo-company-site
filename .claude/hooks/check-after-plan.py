#!/usr/bin/env python3
"""PostToolUse hook: After Task tool use, suggest plan review via JSON additionalContext."""
import sys
import json


def main():
    try:
        data = json.loads(sys.stdin.read())
        tool_response = data.get("tool_response", "")
        if isinstance(tool_response, dict):
            tool_response = json.dumps(tool_response)
    except Exception:
        return

    plan_indicators = ["plan", "step", "phase", "todo", "task", "implement"]
    count = sum(1 for ind in plan_indicators if ind in tool_response.lower())

    if count < 2:
        return

    context = (
        "PLAN DETECTED: The sub-agent produced a plan with multiple steps/phases. "
        "Before implementing, consider:\n"
        "1. Review the plan for completeness and feasibility.\n"
        "2. Present the plan summary to the user for confirmation.\n"
        "3. Use TaskCreate to track implementation progress."
    )

    output = {
        "hookSpecificOutput": {
            "additionalContext": context
        }
    }
    print(json.dumps(output))


if __name__ == "__main__":
    main()
