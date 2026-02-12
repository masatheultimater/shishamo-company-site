#!/usr/bin/env python3
"""PostToolUse hook: Detect test/build failures and inject analysis guidance via JSON additionalContext."""
import sys
import json

FAILURE_INDICATORS = [
    "FAILED", "FAIL", "Error", "error", "AssertionError",
    "TypeError", "Exception", "Traceback", "ERR!", "BUILD ERROR",
    "SyntaxError", "ReferenceError"
]

BUILD_ERROR_INDICATORS = [
    "npm run build", "astro build", "vite build",
    "build failed", "Build failed", "compilation error"
]


def main():
    try:
        data = json.loads(sys.stdin.read())
        tool_response = data.get("tool_response", "")
        if isinstance(tool_response, dict):
            tool_response = json.dumps(tool_response)
    except Exception:
        return

    is_failure = any(ind in tool_response for ind in FAILURE_INDICATORS)
    is_build = any(ind in tool_response for ind in BUILD_ERROR_INDICATORS)

    if not is_failure:
        return

    if is_build:
        context = (
            "BUILD FAILURE DETECTED: The build command failed.\n"
            "1. Read the error output carefully — identify the failing file and line number.\n"
            "2. Fix the root cause (not symptoms).\n"
            "3. Re-run `npm run build` to verify the fix.\n"
            "4. Do NOT proceed with other changes until the build passes."
        )
    else:
        context = (
            "TEST/COMMAND FAILURE DETECTED: Errors found in command output.\n"
            "1. Analyze the root cause before attempting a fix.\n"
            "2. If the failure is complex, consider spawning an Analyst sub-agent.\n"
            "3. Re-run the command after fixing to verify."
        )

    output = {
        "hookSpecificOutput": {
            "additionalContext": context
        }
    }
    print(json.dumps(output))


if __name__ == "__main__":
    main()
