#!/usr/bin/env bash
# Stop hook: Run npm run build when source files are modified.
# If build fails, block Claude from stopping (forces fix).
# Output JSON with decision: "block" to prevent stop.

PROJECT_DIR="${CLAUDE_PROJECT_DIR:-.}"
cd "$PROJECT_DIR" || exit 0

# Lock file to prevent concurrent builds
LOCK_FILE="/tmp/claude-build-gate.lock"
if [ -f "$LOCK_FILE" ]; then
    # Another build is running — skip to avoid dist/ race condition
    exit 0
fi

# Check for modified source files (staged + unstaged)
CHANGED_FILES=$(git diff --name-only HEAD 2>/dev/null || true)
UNSTAGED_FILES=$(git diff --name-only 2>/dev/null || true)
UNTRACKED_SOURCE=$(git ls-files --others --exclude-standard '*.astro' '*.ts' '*.css' '*.js' 2>/dev/null || true)

ALL_CHANGES=$(printf '%s\n%s\n%s' "$CHANGED_FILES" "$UNSTAGED_FILES" "$UNTRACKED_SOURCE" | sort -u | grep -E '\.(astro|ts|tsx|css|js|jsx)$' || true)

# No source changes — allow stop
if [ -z "$ALL_CHANGES" ]; then
    exit 0
fi

# Acquire lock and run build
touch "$LOCK_FILE"
trap 'rm -f "$LOCK_FILE"' EXIT

BUILD_OUTPUT=$(npm run build 2>&1)
BUILD_EXIT=$?

if [ $BUILD_EXIT -eq 0 ]; then
    # Build passed — allow stop
    exit 0
fi

# Build failed — block stop with safely-encoded JSON
ERROR_TAIL=$(echo "$BUILD_OUTPUT" | tail -30)
python3 -c "
import json, sys
reason = 'Build failed after source changes. Fix build errors before finishing.\\n\\n' + sys.stdin.read()
print(json.dumps({'decision': 'block', 'reason': reason}))
" <<< "$ERROR_TAIL"
exit 0
