#!/usr/bin/env python3
"""Agent Router: Classify user prompt and inject workflow directives via JSON additionalContext."""
import sys
import json

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

# Skill keyword → skill name mapping (bilingual)
SKILL_TRIGGERS = {
    "/refactor": ["refactor", "リファクタ", "code quality", "コード品質", "clean up", "技術的負債"],
    "/deploy-verify": ["deploy", "デプロイ", "production check", "本番確認", "pre-deploy"],
    "/wcag-audit": ["contrast", "WCAG", "a11y", "コントラスト", "視認性", "accessibility", "アクセシビリティ"],
    "/pricing-sync": ["pricing", "料金", "sync prices", "価格", "料金同期", "料金チェック"],
    "/gtm-event": ["tracking", "GTM", "イベント追加", "トラッキング", "dataLayer", "analytics event"],
    "/checkpointing": ["checkpoint", "セッション保存", "save session", "進捗保存", "save progress"],
    "/hook-scaffold": ["new hook", "create hook", "add hook", "フック追加", "新しいフック", "フック作成"],
    "/hook-debug": ["test hook", "debug hook", "hook not working", "フックテスト", "フックデバッグ", "フック動かない"],
    "/rules-audit": ["audit rules", "consolidate rules", "rules cleanup", "ルール整理", "ルール統合", "ルール重複"],
}


def classify(prompt):
    """Classify prompt into workflow type and matched trigger."""
    p = prompt.lower()

    # Check skill triggers first
    for skill, keywords in SKILL_TRIGGERS.items():
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
