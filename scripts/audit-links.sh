#!/bin/sh
set -eu
python3 scripts/check-search-quality.py
"${LYCHEE_BIN:-lychee}" --offline --include-fragments=anchor-only \
  --root-dir "$PWD/dist/client" --index-files index.html \
  --files-from work/growth/quality-inputs.txt --format json \
  --output work/growth/quality-links.json
