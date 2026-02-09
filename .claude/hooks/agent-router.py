#!/usr/bin/env python3
"""Agent Router: ユーザー入力からエージェント振り分けを提案"""
import sys, json, os

ANALYST_TRIGGERS = [
    "設計", "アーキテクチャ", "実装", "design", "architecture",
    "なぜ動かない", "error", "bug", "debug", "デバッグ",
    "どっちがいい", "compare", "trade-off", "トレードオフ",
    "リファクタ", "レビュー", "refactor", "review",
    "セキュリティ", "security", "パフォーマンス", "performance","メリデメ"
]

RESEARCHER_TRIGGERS = [
    "調べて", "リサーチ", "research", "investigate",
    "ドキュメント", "library", "docs", "ライブラリ",
    "pdf", "動画", "video", "audio", "音声",
    "最新", "latest", "ベストプラクティス", "best practice","調査"
]

CONSENSUS_TRIGGERS = [
    "重要", "critical", "大規模", "large-scale",
    "破壊的変更", "breaking change", "マイグレーション", "migration",
    "合議", "consensus", "比較検討","話し合って"
]

def detect_agent(prompt):
    p = prompt.lower()
    for t in CONSENSUS_TRIGGERS:
        if t in p:
            return "consensus", t
    for t in ANALYST_TRIGGERS:
        if t in p:
            return "analyst", t
    for t in RESEARCHER_TRIGGERS:
        if t in p:
            return "researcher", t
    return None, ""

def main():
    prompt = os.environ.get("USER_PROMPT", "")
    if not prompt:
        try:
            data = json.loads(sys.stdin.read())
            prompt = data.get("prompt", "")
        except:
            return

    agent, trigger = detect_agent(prompt)
    if agent == "consensus":
        print(f"⚖️ 合議制推奨: '{trigger}' を検出。複数Analystの独立分析→統合提案を推奨。")
    elif agent == "analyst":
        print(f"🧠 Analyst推奨: '{trigger}' を検出。深い推論が必要です。")
    elif agent == "researcher":
        print(f"🔍 Researcher推奨: '{trigger}' を検出。リサーチ委譲を推奨。")

if __name__ == "__main__":
    main()
