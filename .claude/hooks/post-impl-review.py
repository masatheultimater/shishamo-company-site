#!/usr/bin/env python3
"""実装後チェック: 大きな実装後にレビューを提案"""
import os, json

def main():
    output = os.environ.get("TOOL_OUTPUT", "")
    # 大きな変更を検出（行数ベース）
    if output.count("\n") > 50:
        print("📝 大きな変更を検出。Analystによるレビューを推奨します。")

if __name__ == "__main__":
    main()
