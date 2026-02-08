#!/bin/bash
# afterFileEdit hook: warn if component folder exists but not exported from src/index.ts
# Catches pitfall #14 from common-pitfalls.mdc

set -euo pipefail

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | grep -o '"file_path":"[^"]*"' | head -1 | cut -d'"' -f4)

if [ -z "$FILE_PATH" ]; then
  exit 0
fi

# Only check when editing component index.ts files
case "$FILE_PATH" in
  */src/*/index.ts)
    # Skip utility directories
    case "$FILE_PATH" in
      */utils/*|*/context/*|*/theme/*|*/__tests__/*) exit 0 ;;
    esac

    # Extract the component directory name
    DIR_NAME=$(dirname "$FILE_PATH" | xargs basename)
    
    # Get the workspace root (parent of src/)
    WORKSPACE=$(dirname "$FILE_PATH" | sed 's|/src/.*|/src|')
    ROOT_INDEX="${WORKSPACE}/index.ts"
    
    if [ -f "$ROOT_INDEX" ]; then
      # Check if the component is exported from root index.ts
      # Look for: export { ComponentName } from './<dir-name>'
      # or: export { ComponentName } from './<dir-name>/index'
      if ! grep -qE "from '\.\/${DIR_NAME}'|from \"\.\/${DIR_NAME}\"" "$ROOT_INDEX" 2>/dev/null; then
        echo ""
        echo "⚠ COMPONENT NOT EXPORTED from src/index.ts"
        echo "  Component directory: src/${DIR_NAME}/"
        echo "  Root barrel: src/index.ts"
        echo ""
        echo "  Add to src/index.ts (in alphabetical order):"
        echo "  // ${DIR_NAME^}"  # Capitalize first letter
        echo "  export { ... } from './${DIR_NAME}';"
        echo "  export type { ...Props } from './${DIR_NAME}';"
        echo ""
        echo "  See: .cursor/rules/common-pitfalls.mdc #14"
        echo ""
      fi
    fi
    ;;
esac

exit 0
