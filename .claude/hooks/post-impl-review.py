#!/usr/bin/env python3
"""PostToolUse hook: Track edit count and inject build reminder every 5 edits via JSON additionalContext."""
import sys
import json

COUNTER_FILE = "/tmp/claude-edit-counter"


def get_count():
    try:
        with open(COUNTER_FILE, "r") as f:
            return int(f.read().strip())
    except Exception:
        return 0


def set_count(n):
    try:
        with open(COUNTER_FILE, "w") as f:
            f.write(str(n))
    except Exception:
        pass


def main():
    try:
        data = json.loads(sys.stdin.read())
        tool_response = data.get("tool_response", "")
        if isinstance(tool_response, dict):
            tool_response = json.dumps(tool_response)
    except Exception:
        return

    count = get_count() + 1
    set_count(count)

    # Large change detection
    line_count = tool_response.count("\n") if isinstance(tool_response, str) else 0
    is_large = line_count > 50

    messages = []

    if is_large:
        messages.append(
            f"LARGE CHANGE: This edit touched {line_count}+ lines. "
            "Review the change for correctness before continuing."
        )

    if count % 5 == 0:
        messages.append(
            f"BUILD CHECK REMINDER: {count} edits since last build check. "
            "Run `npm run build` to verify no regressions have been introduced."
        )

    if not messages:
        return

    output = {
        "hookSpecificOutput": {
            "additionalContext": "\n\n".join(messages)
        }
    }
    print(json.dumps(output))


if __name__ == "__main__":
    main()
