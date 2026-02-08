#!/bin/bash
# afterFileEdit hook: warn if hardcoded hex colors found in component .tsx files.
# Enforces the "no hardcoded colors" rule from project-overview.mdc.
#
# This hook is intentionally lightweight (just grep) so it doesn't slow down editing.
# It only warns — it does NOT block the edit.

set -euo pipefail

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | grep -o '"file_path":"[^"]*"' | head -1 | cut -d'"' -f4)

if [ -z "$FILE_PATH" ]; then
  exit 0
fi

# Only check .tsx component files inside src/ (skip tests, mocks, theme, utils)
case "$FILE_PATH" in
  */src/*.tsx)
    # Skip test files and mocks
    case "$FILE_PATH" in
      */__tests__/*|*/__mocks__/*) exit 0 ;;
    esac
    # Skip theme and utility files
    case "$FILE_PATH" in
      */theme/*|*/utils/*|*/context/*) exit 0 ;;
    esac

    # Search for hardcoded hex color patterns in string literals
    # Matches: '#RRGGBB' or '#RRGGBBAA' (6 or 8 hex digits)
    # Ignores lines that are comments or contain "theme" (likely documentation)
    MATCHES=$(grep -nE "'#[0-9a-fA-F]{6,8}'" "$FILE_PATH" 2>/dev/null | grep -v '^\s*//' | grep -v 'theme' | head -5) || true

    if [ -n "$MATCHES" ]; then
      echo ""
      echo "⚠ HARDCODED HEX COLORS detected in $(basename "$FILE_PATH"):"
      echo "$MATCHES"
      echo ""
      echo "Use theme.colors.* or colorOpacity() instead."
      echo "See: .cursor/rules/common-pitfalls.mdc #1"
      echo ""
    fi
    ;;
esac

exit 0
