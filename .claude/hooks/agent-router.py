#!/usr/bin/env python3
"""Agent Router: Classify user prompt and inject workflow directives via JSON additionalContext."""
import sys
import json
import os
import glob
import re

CONSENSUS_TRIGGERS = [
    "重要", "critical", "大規模", "large-scale",
    "破壊的変更", "breaking change", "マイグレーション", "migration",
    "合議", "consensus", "比較検討", "話し合って"
]

ANALYST_TRIGGERS = [
    "設計", "アーキテクチャ", "実装", "design", "architecture",
    "なぜ動かない", "error", "bug", "debug", "デバッグ",
    "どっちがいい", "compare", "trade-off", "トレードオフ",
    "リファクタ", "レビュー", "refactor", "review",
    "セキュリティ", "security", "パフォーマンス", "performance", "メリデメ"
]

RESEARCHER_TRIGGERS = [
    "調べて", "リサーチ", "research", "investigate",
    "ドキュメント", "library", "docs", "ライブラリ",
    "pdf", "動画", "video", "audio", "音声",
    "最新", "latest", "ベストプラクティス", "best practice"
]

MULTI_FILE_TRIGGERS = [
    "全ページ", "all pages", "サイト全体", "site-wide",
    "一括", "batch", "全ファイル", "all files",
    "フッター変更", "ヘッダー変更", "レイアウト変更"
]


def discover_skills():
    """Scan ~/.claude/skills/*/SKILL.md for trigger keywords from frontmatter."""
    skills = {}
    skill_dirs = glob.glob(os.path.expanduser("~/.claude/skills/*/SKILL.md"))
    for path in skill_dirs:
        try:
            with open(path) as f:
                content = f.read()
            match = re.match(r'^---\n(.*?)\n---', content, re.DOTALL)
            if not match:
                continue
            fm = match.group(1)
            name = ""
            triggers = []
            in_triggers = False
            for line in fm.split("\n"):
                if line.startswith("name:"):
                    name = line.split(":", 1)[1].strip().strip("'\"")
                elif line.strip() == "triggers:":
                    in_triggers = True
                elif in_triggers and line.startswith("  - "):
                    triggers.append(line.strip().lstrip("- ").strip())
                elif in_triggers and not line.startswith("  "):
                    in_triggers = False
            if name and triggers:
                skills[f"/{name}"] = triggers
        except Exception:
            continue
    return skills


def classify(prompt):
    """Classify prompt into workflow type and matched trigger."""
    p = prompt.lower()

    # Dynamically discover skill triggers from SKILL.md frontmatter
    skill_triggers = discover_skills()
    for skill, keywords in skill_triggers.items():
        for kw in keywords:
            if kw.lower() in p:
                return "skill", skill, kw

    # Then workflow classification
    for t in CONSENSUS_TRIGGERS:
        if t.lower() in p:
            return "consensus", None, t
    for t in MULTI_FILE_TRIGGERS:
        if t.lower() in p:
            return "multi-file", None, t
    for t in ANALYST_TRIGGERS:
        if t.lower() in p:
            return "analyst", None, t
    for t in RESEARCHER_TRIGGERS:
        if t.lower() in p:
            return "researcher", None, t

    return None, None, ""


DIRECTIVES = {
    "consensus": (
        "WORKFLOW DIRECTIVE: CONSENSUS MODE\n"
        "This task requires multi-perspective analysis before proceeding.\n"
        "1. Spawn an Analyst sub-agent: Use Task tool (subagent_type=general-purpose) to analyze the design question independently.\n"
        "2. Spawn a Researcher sub-agent: Use Task tool (subagent_type=Explore) for broader context.\n"
        "3. Synthesize both analyses and present options with trade-offs to the user.\n"
        "4. Get explicit user confirmation before implementing."
    ),
    "analyst": (
        "WORKFLOW DIRECTIVE: ANALYST CONSULTATION\n"
        "This task involves design decisions or complex debugging.\n"
        "1. Before making changes, spawn an Analyst sub-agent (Task tool, subagent_type=general-purpose) to analyze the problem.\n"
        "2. Present the Analyst's findings and your proposed approach to the user.\n"
        "3. Proceed only after user confirms the approach."
    ),
    "researcher": (
        "WORKFLOW DIRECTIVE: RESEARCH DELEGATION\n"
        "This task requires external research or documentation review.\n"
        "1. Delegate research to a sub-agent (Task tool, subagent_type=Explore or general-purpose).\n"
        "2. Save research findings to .claude/docs/research/ if substantial.\n"
        "3. Summarize findings before acting on them."
    ),
    "multi-file": (
        "WORKFLOW DIRECTIVE: MULTI-FILE CHANGE PROTOCOL\n"
        "This task affects multiple files across the project.\n"
        "1. Use TaskCreate to create a task list before editing any files.\n"
        "2. Run `npm run build` to establish a baseline.\n"
        "3. Implement changes file by file.\n"
        "4. Run `npm run build` after all changes to verify no regressions.\n"
        "5. The Stop hook will also verify the build automatically."
    ),
}


def main():
    try:
        data = json.loads(sys.stdin.read())
        prompt = data.get("prompt", "")
    except Exception:
        return

    if not prompt:
        return

    category, skill, trigger = classify(prompt)

    if category is None:
        return

    if category == "skill":
        directive = (
            f"WORKFLOW DIRECTIVE: SKILL AUTO-INVOKE\n"
            f"Detected keyword '{trigger}' matching skill {skill}.\n"
            f"INVOKE SKILL: Use the Skill tool to invoke `{skill}` before proceeding with the main task.\n"
            f"After the skill completes, continue with the user's request."
        )
    else:
        directive = DIRECTIVES[category]
        directive += f"\n\n[Triggered by: '{trigger}']"

    output = {
        "hookSpecificOutput": {
            "additionalContext": directive
        }
    }
    print(json.dumps(output))


if __name__ == "__main__":
    main()
