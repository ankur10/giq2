#!/bin/sh
# Concatenates the prototype's six-file CSS cascade (same order as index.html)
# into one stylesheet for design-sync's cssEntry. Run from the repo root after `npm run build`.
set -e
out=dist/growthiq-ds.css
: > "$out"
for f in styles.css themes.css refinements.css studio-next.css studio-variants.css growthiq-demo.css; do
  printf '\n/* ==== %s ==== */\n' "$f" >> "$out"
  cat "dist/$f" >> "$out"
done
printf 'export {};\n' > dist/growthiq-ds-entry.mjs
echo "wrote $out"
