# design-sync notes — GrowthIQ

- **Tokens-only sync, by the owner's choice (2026-10-06).** This repo has no React component library: the UI in `app.js` is vanilla template strings, and the only React code is two whole-app `mount()` entries plus a 3D scene. The owner chose "styles and tokens only" over authoring new React wrappers. `window.GrowthIQ` is therefore intentionally empty and there are zero component cards.
- **Entry and stylesheet are generated.** `sh .design-sync/build-css.sh` (run after `npm run build`) concatenates the six-file cascade from `dist/` in `index.html` order into `dist/growthiq-ds.css` (the `cssEntry`) and writes an empty `dist/growthiq-ds-entry.mjs` (pass it as `--entry`). `dist/` is gitignored, so both must be regenerated on a fresh clone via `buildCmd`.
- **Converter command:** `node .ds-sync/resync.mjs --config .design-sync/config.json --node-modules ./node_modules --entry ./dist/growthiq-ds-entry.mjs --out ./ds-bundle [--remote .design-sync/.cache/remote-sync.json]`.
- **Render check:** playwright is not installed and there are no component previews to render, so validate runs with `--no-render-check`. Instead, the conventions example was rendered by hand (`.design-sync/.cache/specimen.html` against `ds-bundle/styles.css`) and checked in a browser: all three fonts loaded, Advisory tokens applied.
- **Themes:** Advisory is the default (`:root, :root[data-theme="advisory"]`); Precision and Mineral need `data-theme` on `<html>`. `theme.js` (the runtime switcher) is not shipped; designs set the attribute directly.
- `guidelines/DESIGN.md` is the repo's `DESIGN.md` verbatim, including dated verification paragraphs the README calls out as historical.

## Known render warns

- `[ZERO_MATCH] no component exports — treating as tokens-only DS` — expected.
- `[RENDER_SKIPPED]` — expected, see above.

## Re-sync risks

- `.design-sync/conventions.md` enumerates class names and tokens by hand. If CSS classes are renamed or removed, re-run the grep validation against `ds-bundle/_ds_bundle.css` and update it.
- A new stylesheet added to `index.html` must also be added to `.design-sync/build-css.sh`, in cascade order, or it silently won't ship.
- If real React components are ever added, drop the empty entry, point `--entry` at the built library, and revisit the conventions header (it currently tells the agent not to import components).
