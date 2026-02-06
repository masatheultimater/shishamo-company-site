#!/usr/bin/env python3
"""テスト失敗時にAnalyst分析を提案"""
import os

FAILURE_INDICATORS = ["FAILED", "FAIL", "Error", "error", "AssertionError", "TypeError", "Exception", "Traceback"]

def main():
    output = os.environ.get("TOOL_OUTPUT", "")
    for ind in FAILURE_INDICATORS:
        if ind in output:
            print(f"🔴 テスト失敗検出。Analystによる根本原因分析を推奨。")
            return

if __name__ == "__main__":
    main()
