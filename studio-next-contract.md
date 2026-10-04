# Guided Intelligence Studio — surface brief

## Purpose and scope

`#studio-next` extends the existing GrowthIQ visual world with a guided start: define a brief and objective, compare deliverable scope, then prepare and review a brief. The existing `#studio` catalog and its task routes remain available; its “Try the new Studio” link opens this preview.

The extension uses the same 22 capabilities and five objectives in `studio-data.js`, backed by unchanged `data.js` records. `#studio-next/<task-id>` reuses the existing task workspace. Implementation is in `app.js`, `studio-next.css` and the stylesheet inclusion in `index.html`.

## Interaction contract

- Start with a required subject and objective. Carry the editable subject into deliverable selection and the task workspace.
- Compare choices within the objective using their existing description, output format and scope outline. The outline describes capability scope, not generated research.
- Keep “Browse all capabilities” secondary and available without completing the start form. Search all 22 by presentation name, original capability name or description; show an explicit empty state when nothing matches.
- “Prepare this brief” opens the existing workspace for optional context, required-field validation, review, text download and browser-only draft saving. The market-data template capability still requires selecting a file; only its filename is saved, and restoring a draft requires selecting the file again.
- Returning to an already prepared task in the same session retains context and template edits; subject edits remain synchronized with the guided brief. Explicitly resuming a saved draft restores the saved version.
- Saved drafts appear on the guided start. They share the existing browser storage and are not research history. Opening existing GrowthIQ does not transfer the brief or selected files automatically.

## Surface design

Preserve `DESIGN.md`, shared semantic palette roles, existing fonts and the Precision, Advisory and Mineral themes. Advisory remains the default; the independent header setting remains shared. This is a surface extension, not a token or brand revision.

The first view pairs a prominent brief form with a concise explanation of the flow. Selection pairs a compact choice list with an adjacent scope panel. At mobile widths these panels stack; the choice list scrolls within a bounded height. Keep clear selected states, native objective controls, visible labels and inset keyboard focus in the scrollable choice list.

## Boundaries and validation

No new APIs, capabilities, records, generation, completed research history or production integration are introduced.

The implementation pass reports 75 passing mock-DOM logic checks and Chrome checks for subject carry-through, review, search, empty results and no error logs. Desktop (1440px) and mobile (390px) first-view and selection captures are in `.impeccable/review/studio-next/`; the mobile check reported no page overflow. Mock checks are not browser tests. The independent reviewer returned ship after confirming both edits-preservation and inset-focus findings resolved. That confirmation covered the two fixes, not a new exhaustive audit.

## Preview

Run `python3 -m http.server 8772 --bind 127.0.0.1` from the repository root, then open `http://127.0.0.1:8772/#studio-next`. Port 8772 isolates this preview from other servers on 8771. Compare the retained catalog at `http://127.0.0.1:8772/#studio`.
