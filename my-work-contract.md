# My Work

Route: `/#work`, retained for task/project management. The no-hash entry point and brand link now open [My Feed](my-feed-contract.md) at `/#feed`. Your Briefing remains at `/#home`. This prototype has no authentication flow; configure the production post-login landing route in the mainline application.

## Surface direction

Operate mode. Extend the existing GrowthIQ palette, typography, sidebar and controls. A slim project panel filters one unified activity list. A compact attention section surfaces ready and failed items. Avoid metric cards, progress percentages and separate project dashboards. Responsive projects become wrapping controls above the list.

## Implemented

- Search, type and project filtering, plus status filters for Ready, In progress, Failed, Drafts and Monitoring. Status counts reflect the selected project before search/type filters. All filters combine, with clear-filter recovery in empty states.
- New project inline form: required name, optional description.
- Activity details expand immediately below the selected row. Assign/reassign a project and continue to existing feature routes. Saved Q&A drafts use the `growthiq-prepare-question` event to prefill Ask GrowthIQ without executing research.
- Dismiss attention without deleting work.
- New work menu links to Ask GrowthIQ, Intelligence Studio, Radar and Ask Domain Expert.
- Existing browser Radar records, expert requests and saved questions are read at render time; duplicate saved question strings are deduplicated. Local drafts are not presented as executed research.
- Six labeled fixture activities illustrate Ready, Answer available, Processing, Active, Awaiting response and Failed states. Hide examples with the checkbox. The Thermo Fisher and Jabil examples link to captured results; other examples explain their limitations.
- Projects, assignments, dismissed attention and fixture visibility persist under `growthiq-my-work-v1`. Existing storage keys are only read. Storage failures produce a warning and keep changes in memory. No API, scheduling or email operation is triggered.

## My Feed integration

My Feed reads `GROWTHIQ_WORK.snapshot()` for projects and activities. Its supporting panel shows up to two non-example activities other than Q&A, one locally saved question draft, and four project shortcuts. Captured Jabil research is the fallback when there is no local question. These are compact shortcuts; the full list and project controls stay here.

`openProject(id)` selects the matching project and clears activity selection, search and type filters. `openActivity(id)` opens activity details with the all-projects view and cleared filters. Both shortcuts navigate to `/#work`. They do not execute a task. The Continue question action in draft details restores its text in Ask GrowthIQ.

## Integration with the mainline repository

Source files: `my-work.js`, `my-work.css`. App routing/nav in `app.js`; runtime inclusion in `index.html` and `build-site.cjs`. Replace the window-module entry with the mainline router/component conventions. Replace localStorage and fixtures with authenticated project/activity adapters using confirmed contracts. Keep status labels specific to activity type. Production details should navigate to a specific task, not just its feature index.

Project context is currently assigned in My Work after an activity exists. Automatic project assignment when starting work, cross-device synchronization, sorting by authoritative timestamps, live job updates and retries require mainline integration. Do not invent endpoints or imply example jobs are running. Ask GrowthIQ locally saved questions remain drafts; Continue question restores their content for editing without submitting it.

## Validation

My Work syntax and 90 existing JavaScript checks passed. Browser checks cover status filtering, inline report details, saved-question handoff and 390px mobile layout (no horizontal page overflow). Status filters scroll horizontally on narrow screens. Full build validation encountered an unrelated missing `innovation-investigation.css` entry in the current build manifest; the local preview was restored using available runtime files without changing that manifest.

## Project lifecycle workspace

Selecting a project opens **Overview**, with **Work** and **Findings** as sibling views. My Work remains separate from My Feed.

- Overview: objective, ready/in-progress summary, four feature shortcuts, local next-step checklist, recent project changes.
- Work: existing status/search/type filters, inline activity details, project assignment, an Add existing work picker (moves an activity from its previous project), and Pin as evidence.
- Findings: pinned activities, timestamped notes with optional HTTP(S) source links, and an editable decision/rationale.
- Lifecycle: edit name/objective; Active, On hold or Completed; archive and restore. Archived projects are hidden from the sidebar until Show archived projects is selected. Archiving retains research and prevents new launches from that project. Completion/archiving does not stop Radar delivery; subscriptions retain independent settings.
- Existing v1 records migrate lazily: optional `state`, `archived`, `steps`, `pins`, `notes`, `decision`, `decisionAt`, and `updates` fields live on each project. No backend contracts changed. Recent changes record project actions, not fabricated service events.

### Explicit feature handoff

`GROWTHIQ_WORK.contextBanner(route)` displays the active project while the user stays in the chosen feature. `captureActivity(activityId, route)` is called by the existing save actions in Ask GrowthIQ, Studio, Radar and Ask Domain Expert. This attaches the saved record to the initiating project. A visible Detach action clears context; leaving the feature clears it too. Context is in memory for the current page session, so reloading before saving loses this association. Mainline should replace it with an explicit project ID in router state and the confirmed create/update contract.

Studio briefs now appear as draft activities, using the existing per-task storage key. Saving a second brief for the same Studio task overwrites that local draft, as in the incumbent Studio prototype. Saved questions are identified by their full text. Production integration needs durable distinct IDs; do not use these prototype IDs for concurrent projects or report versions.

Completed report lineage, follow-ups from the standalone results app, uploaded documents, team permissions/sharing, authoritative timestamps and live task outcomes still require mainline integration. This pass supports notes and source links, not document uploads. Notes are append-only in this preview; the project decision and objective are editable.

### Lifecycle verification

`node verification/my-work.cjs` checks project view navigation, all four feature handoffs, assignment, unrelated-route isolation, archive/restore and the Studio draft adapter. The build and existing 90 checks pass. Browser QA on the separate localhost origin verified project creation, next-step entry, question save/assignment, evidence pinning, note/decision saving, completion, archive/restore and persistence after reload. Desktop and 390px mobile checks confirmed the project views fit without horizontal page overflow.
