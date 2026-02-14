#!/usr/bin/env bash
# TaskCompleted hook: Verify build passes when tasks are completed.
# Uses exit code 2 + stderr to block task completion on build failure.

PROJECT_DIR="${CLAUDE_PROJECT_DIR:-.}"
cd "$PROJECT_DIR" || exit 0

# Lock file to prevent concurrent builds
LOCK_FILE="/tmp/claude-build-gate.lock"
if [ -f "$LOCK_FILE" ]; then
    # Another build is running — skip to avoid dist/ race condition
    exit 0
fi

# Read stdin for task info (may contain task_subject)
STDIN_DATA=$(cat)
TASK_SUBJECT=$(echo "$STDIN_DATA" | python3 -c "
import sys, json
try:
    d = json.load(sys.stdin)
    print(d.get('task_subject', d.get('subject', '')))
except:
    print('')
" 2>/dev/null || echo "")

# Skip build check for planning/research tasks
if echo "$TASK_SUBJECT" | grep -qiE "plan|research|investigate|explore|analyze|document|checkpoint"; then
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

# Acquire lock and run build
touch "$LOCK_FILE"
trap 'rm -f "$LOCK_FILE"' EXIT

BUILD_OUTPUT=$(npm run build 2>&1)
BUILD_EXIT=$?

if [ $BUILD_EXIT -eq 0 ]; then
    # Build passed — allow completion
    exit 0
fi

# Build failed — block completion via exit 2 + stderr
ERROR_TAIL=$(echo "$BUILD_OUTPUT" | tail -20 || true)
echo "Build failed. Fix errors before completing this task:" >&2
echo "$ERROR_TAIL" >&2
exit 2
