#!/usr/bin/env python3
"""PostToolUse hook: Detect test/build failures and inject analysis guidance via JSON additionalContext."""
import sys
import json

# Only analyze commands that look like tests or builds
COMMAND_PATTERNS = [
    "npm run build", "npm test", "npm run test", "npx ", "astro build",
    "pytest", "jest", "vitest", "mocha", "cargo test", "go test",
    "make test", "make build",
]

# Require these stronger indicators (not just "error" which matches too broadly)
FAILURE_INDICATORS = [
    "FAILED", "FAIL ", "ERR!", "BUILD ERROR",
    "AssertionError", "TypeError", "SyntaxError", "ReferenceError",
    "Traceback (most recent call last)",
    "error TS", "error[E",  # TypeScript / Rust compiler errors
    "Cannot find module", "Module not found",
    "✗ ", "✘ ",  # Common test failure markers
]

BUILD_INDICATORS = [
    "npm run build", "astro build", "vite build",
    "build failed", "Build failed", "compilation error",
]


def main():
    try:
        data = json.loads(sys.stdin.read())
        command = ""
        tool_input = data.get("tool_input", {})
        if isinstance(tool_input, dict):
            command = tool_input.get("command", "")
        tool_response = data.get("tool_response", "")
        if not isinstance(tool_response, str):
            tool_response = json.dumps(tool_response)
    except Exception:
        return

    # Only analyze test/build commands, not every Bash call
    is_test_or_build = any(pat in command for pat in COMMAND_PATTERNS)
    if not is_test_or_build:
        return

    is_failure = any(ind in tool_response for ind in FAILURE_INDICATORS)
    if not is_failure:
        return

    is_build = any(ind in tool_response for ind in BUILD_INDICATORS)

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
            "TEST FAILURE DETECTED: Errors found in test output.\n"
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
