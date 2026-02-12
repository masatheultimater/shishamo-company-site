#!/usr/bin/env python3
"""PreToolUse hook: Check sensitive file edits and inject caution via JSON additionalContext."""
import sys
import json

SENSITIVE_PATTERNS = ["auth", "security", "migration", "schema", "secret", "crypt", "token", "key"]

CRITICAL_FILES = [
    "siteConfig.ts",
    "services.ts",
    "tokens.css",
    "Layout.astro",
    "analytics.ts",
    "settings.json",
    "package.json",
]


def main():
    try:
        data = json.loads(sys.stdin.read())
        tool_input = data.get("tool_input", {})
        file_path = tool_input.get("file_path", tool_input.get("path", ""))
    except Exception:
        return

    if not file_path:
        return

    warnings = []
    file_lower = file_path.lower()

    for pat in SENSITIVE_PATTERNS:
        if pat in file_lower:
            warnings.append(f"Sensitive pattern '{pat}' detected in path.")

    for crit in CRITICAL_FILES:
        if file_path.endswith(crit):
            warnings.append(f"Critical project file: {crit} — verify changes carefully.")

    if not warnings:
        return

    context = (
        f"CAUTION: Editing {file_path}\n"
        + "\n".join(f"- {w}" for w in warnings)
        + "\nDouble-check this change aligns with project conventions before proceeding."
    )

    output = {
        "hookSpecificOutput": {
            "additionalContext": context
        }
    }
    print(json.dumps(output))


if __name__ == "__main__":
    main()
