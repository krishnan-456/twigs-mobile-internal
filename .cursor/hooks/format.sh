#!/bin/bash
# afterFileEdit hook: auto-format edited .ts/.tsx files with Prettier
# Input JSON is passed via stdin; we extract file_path and run prettier on it.

set -euo pipefail

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | grep -o '"file_path":"[^"]*"' | head -1 | cut -d'"' -f4)

if [ -z "$FILE_PATH" ]; then
  exit 0
fi

# Only format files inside src/
case "$FILE_PATH" in
  */src/*.ts | */src/*.tsx)
    npx prettier --write "$FILE_PATH" >/dev/null 2>&1 || true
    ;;
esac

exit 0
