#!/usr/bin/env bash
# TaskCompleted hook: Verify build passes when tasks are completed.
# Uses exit code 2 + stderr to block task completion on build failure.

set -euo pipefail

PROJECT_DIR="${CLAUDE_PROJECT_DIR:-.}"
cd "$PROJECT_DIR"

# Read stdin for task info (may contain task_subject)
STDIN_DATA=$(cat)
TASK_SUBJECT=$(echo "$STDIN_DATA" | python3 -c "import sys,json; print(json.load(sys.stdin).get('task_subject',''))" 2>/dev/null || echo "")

# Skip build check for planning/research tasks
SKIP_PATTERNS="plan|research|investigate|explore|analyze|document|checkpoint"
if echo "$TASK_SUBJECT" | grep -qiE "$SKIP_PATTERNS"; then
    exit 0
fi

# Check for uncommitted source changes
CHANGED_FILES=$(git diff --name-only 2>/dev/null || true)
UNTRACKED_SOURCE=$(git ls-files --others --exclude-standard '*.astro' '*.ts' '*.css' '*.js' 2>/dev/null || true)

ALL_CHANGES=$(printf '%s\n%s' "$CHANGED_FILES" "$UNTRACKED_SOURCE" | sort -u | grep -E '\.(astro|ts|tsx|css|js|jsx)$' || true)

# No source changes — allow completion
if [ -z "$ALL_CHANGES" ]; then
    exit 0
fi

# Source files changed — run build
BUILD_OUTPUT=$(npm run build 2>&1) || {
    # Build failed — block completion via exit 2 + stderr
    ERROR_TAIL=$(echo "$BUILD_OUTPUT" | tail -20)
    echo "Build failed. Fix errors before completing this task:" >&2
    echo "$ERROR_TAIL" >&2
    exit 2
}

# Build passed — allow completion
exit 0
