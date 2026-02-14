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
    except Exception:
        return

    count = get_count() + 1
    set_count(count)

    if count % 5 == 0:
        output = {
            "hookSpecificOutput": {
                "additionalContext": (
                    f"BUILD CHECK REMINDER: {count} edits since last build check. "
                    "Run `npm run build` to verify no regressions have been introduced."
                )
            }
        }
        print(json.dumps(output))


if __name__ == "__main__":
    main()
