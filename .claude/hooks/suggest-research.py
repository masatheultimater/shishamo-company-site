#!/usr/bin/env python3
"""WebSearch前にResearcher委譲を提案"""
import os

def main():
    query = os.environ.get("TOOL_INPUT", "")
    if len(query) > 50:
        print("📚 複雑な調査はResearcherに委譲すると、コンテキストを節約できます。")

if __name__ == "__main__":
    main()
