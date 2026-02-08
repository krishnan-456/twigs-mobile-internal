#!/bin/bash
# afterFileEdit hook: warn if Pressable is used without accessibilityRole
# Catches pitfall #5 from common-pitfalls.mdc

set -euo pipefail

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | grep -o '"file_path":"[^"]*"' | head -1 | cut -d'"' -f4)

if [ -z "$FILE_PATH" ]; then
  exit 0
fi

# Only check component .tsx files inside src/ (not tests)
case "$FILE_PATH" in
  */src/*.tsx)
    # Skip non-component directories
    case "$FILE_PATH" in
      */__tests__/*|*/__mocks__/*|*/utils/*|*/context/*|*/theme/*) exit 0 ;;
    esac

    # Check if file uses Pressable
    if grep -q '<Pressable' "$FILE_PATH" 2>/dev/null; then
      # Count Pressable usages
      PRESSABLE_COUNT=$(grep -c '<Pressable' "$FILE_PATH" 2>/dev/null || echo "0")
      
      # Count accessibilityRole usages (on Pressable or passed through)
      A11Y_ROLE_COUNT=$(grep -cE 'accessibilityRole[=:]' "$FILE_PATH" 2>/dev/null || echo "0")
      
      # If there are Pressables but no accessibilityRole anywhere in the file
      if [ "$PRESSABLE_COUNT" -gt 0 ] && [ "$A11Y_ROLE_COUNT" -eq 0 ]; then
        echo ""
        echo "⚠ MISSING accessibilityRole in $(basename "$FILE_PATH")"
        echo "  Found ${PRESSABLE_COUNT} <Pressable> element(s) but no accessibilityRole"
        echo ""
        echo "  Add to each interactive Pressable:"
        echo "  <Pressable"
        echo "    accessible"
        echo "    accessibilityRole=\"button\"  // or 'checkbox', 'radio', 'switch', etc."
        echo "    accessibilityState={{ disabled }}"
        echo "    ..."
        echo "  />"
        echo ""
        echo "  See: .cursor/rules/common-pitfalls.mdc #5"
        echo ""
      fi
    fi

    # Also check for TouchableOpacity (deprecated pattern)
    if grep -q '<TouchableOpacity' "$FILE_PATH" 2>/dev/null; then
      echo ""
      echo "⚠ DEPRECATED: TouchableOpacity found in $(basename "$FILE_PATH")"
      echo "  Use <Pressable> instead of <TouchableOpacity>"
      echo "  See: .cursor/rules/component-commands.mdc (Translation table)"
      echo ""
    fi
    ;;
esac

exit 0
