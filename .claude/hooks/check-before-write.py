#!/usr/bin/env python3
"""編集前チェック: 複雑な変更にはAnalyst相談を提案"""
import sys, json, os

SENSITIVE = ["auth", "security", "migration", "schema", "config", "secret", "crypt", "token", "key"]

def main():
    tool_input = os.environ.get("TOOL_INPUT", "{}")
    try:
        data = json.loads(tool_input)
        file_path = data.get("file_path", data.get("path", ""))
    except:
        return
    for pat in SENSITIVE:
        if pat in file_path.lower():
            print(f"⚠️ センシティブファイル: {file_path} - Analyst相談を推奨")
            return

if __name__ == "__main__":
    main()
