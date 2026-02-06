#!/usr/bin/env python3
"""計画後チェック: 計画作成後にレビューを提案"""
import os

def main():
    output = os.environ.get("TOOL_OUTPUT", "")
    plan_indicators = ["plan", "step", "phase", "todo", "task", "implement"]
    count = sum(1 for ind in plan_indicators if ind in output.lower())
    if count >= 2:
        print("📋 計画を検出。Analystによるレビューを推奨します。")

if __name__ == "__main__":
    main()
