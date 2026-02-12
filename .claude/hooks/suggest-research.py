#!/usr/bin/env python3
"""PreToolUse hook: Suggest Researcher delegation for complex searches via JSON additionalContext."""
import sys
import json


def main():
    try:
        data = json.loads(sys.stdin.read())
        tool_input = data.get("tool_input", {})
        query = tool_input.get("query", tool_input.get("prompt", ""))
    except Exception:
        return

    if not query or len(query) <= 50:
        return

    context = (
        "SUGGESTION: This search query is substantial. "
        "Consider delegating to a Researcher sub-agent (Task tool, subagent_type=Explore) "
        "to preserve main context window tokens."
    )

    output = {
        "hookSpecificOutput": {
            "additionalContext": context
        }
    }
    print(json.dumps(output))


if __name__ == "__main__":
    main()
