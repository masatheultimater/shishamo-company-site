#!/usr/bin/env bash
# Stop hook: Run npm run build when source files are modified.
# If build fails, block Claude from stopping (forces fix).
# Output JSON with decision: "block" to prevent stop.

set -euo pipefail

# Prevent infinite loops — if this hook triggers another stop, skip
if [ "${STOP_HOOK_ACTIVE:-}" = "1" ]; then
    exit 0
fi
export STOP_HOOK_ACTIVE=1

PROJECT_DIR="${CLAUDE_PROJECT_DIR:-.}"
cd "$PROJECT_DIR"

# Check for modified source files (staged + unstaged)
CHANGED_FILES=$(git diff --name-only HEAD 2>/dev/null || true)
UNSTAGED_FILES=$(git diff --name-only 2>/dev/null || true)
UNTRACKED_SOURCE=$(git ls-files --others --exclude-standard '*.astro' '*.ts' '*.css' '*.js' 2>/dev/null || true)

ALL_CHANGES=$(printf '%s\n%s\n%s' "$CHANGED_FILES" "$UNSTAGED_FILES" "$UNTRACKED_SOURCE" | sort -u | grep -E '\.(astro|ts|tsx|css|js|jsx)$' || true)

# No source changes — allow stop
if [ -z "$ALL_CHANGES" ]; then
    exit 0
fi

# Source files changed — run build
BUILD_OUTPUT=$(npm run build 2>&1) || {
    # Build failed — block stop
    # Extract last 30 lines of error for context
    ERROR_TAIL=$(echo "$BUILD_OUTPUT" | tail -30)

    # Output JSON to block
    cat <<ENDJSON
{"decision": "block", "reason": "Build failed after source changes. Fix build errors before finishing.\n\nBuild output (last 30 lines):\n${ERROR_TAIL}"}
ENDJSON
    exit 0
}

# Build passed — allow stop
exit 0
