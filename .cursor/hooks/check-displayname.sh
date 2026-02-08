#!/bin/bash
# afterFileEdit hook: warn if forwardRef is used without displayName
# Catches pitfall #2 from common-pitfalls.mdc

set -euo pipefail

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | grep -o '"file_path":"[^"]*"' | head -1 | cut -d'"' -f4)

if [ -z "$FILE_PATH" ]; then
  exit 0
fi

# Only check component .tsx files inside src/ (not tests, utils, context)
case "$FILE_PATH" in
  */src/*.tsx)
    # Skip non-component directories
    case "$FILE_PATH" in
      */__tests__/*|*/__mocks__/*|*/utils/*|*/context/*|*/theme/*) exit 0 ;;
    esac

    # Check if file uses forwardRef
    if grep -q 'React\.forwardRef\|forwardRef<' "$FILE_PATH" 2>/dev/null; then
      # Extract component name from forwardRef pattern
      # Looks for: export const ComponentName = React.forwardRef
      COMPONENT_NAME=$(grep -oE 'export const ([A-Z][a-zA-Z0-9]+) = (React\.)?forwardRef' "$FILE_PATH" 2>/dev/null | head -1 | sed 's/export const \([A-Z][a-zA-Z0-9]*\).*/\1/')
      
      if [ -n "$COMPONENT_NAME" ]; then
        # Check if displayName is set for this component
        if ! grep -q "${COMPONENT_NAME}\.displayName" "$FILE_PATH" 2>/dev/null; then
          echo ""
          echo "⚠ MISSING displayName in $(basename "$FILE_PATH")"
          echo "  Found: export const ${COMPONENT_NAME} = React.forwardRef(...)"
          echo "  Missing: ${COMPONENT_NAME}.displayName = '${COMPONENT_NAME}';"
          echo ""
          echo "  Add after the component definition:"
          echo "  ${COMPONENT_NAME}.displayName = '${COMPONENT_NAME}';"
          echo ""
          echo "  See: .cursor/rules/common-pitfalls.mdc #2"
          echo ""
        fi
      fi
    fi
    ;;
esac

exit 0
