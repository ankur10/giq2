# My Work

Route: `/#work`, retained for task/project management. The no-hash entry point and brand link now open [My Feed](my-feed-contract.md) at `/#feed`. Your Briefing remains at `/#home`. This prototype has no authentication flow; configure the production post-login landing route in the mainline application.

## Surface direction

Operate mode. Extend the existing GrowthIQ palette, typography, sidebar and controls. A slim project panel filters one unified activity list. A compact attention section surfaces ready and failed items. Avoid metric cards, progress percentages and separate project dashboards. Responsive projects become wrapping controls above the list.

## Implemented

- Search, type filtering and project filtering, with matching empty states.
- New project inline form: required name, optional description.
- Open activity details, assign/reassign a project, continue to existing feature routes.
- Dismiss attention without deleting work.
- New work menu links to Ask GrowthIQ, Intelligence Studio, Radar and Ask Domain Expert.
- Existing browser Radar records, expert requests and saved questions are read at render time; duplicate saved question strings are deduplicated. Local drafts are not presented as executed research.
- Six labeled fixture activities illustrate Ready, Answer available, Processing, Active, Awaiting response and Failed states. Hide examples with the checkbox. The Thermo Fisher and Jabil examples link to captured results; other examples explain their limitations.
- Projects, assignments, dismissed attention and fixture visibility persist under `growthiq-my-work-v1`. Existing storage keys are only read. Storage failures produce a warning and keep changes in memory. No API, scheduling or email operation is triggered.

## My Feed integration

My Feed reads `GROWTHIQ_WORK.snapshot()` for projects and activities. Its supporting panel shows up to two non-example activities other than Q&A, one locally saved question draft, and four project shortcuts. Captured Jabil research is the fallback when there is no local question. These are compact shortcuts; the full list and project controls stay here.

`openProject(id)` selects the matching project and clears activity selection, search and type filters. `openActivity(id)` opens activity details with the all-projects view and cleared filters. Both shortcuts navigate to `/#work`. They do not execute a task or automatically restore a saved question in Ask GrowthIQ.

## Integration with the mainline repository

Source files: `my-work.js`, `my-work.css`. App routing/nav in `app.js`; runtime inclusion in `index.html` and `build-site.cjs`. Replace the window-module entry with the mainline router/component conventions. Replace localStorage and fixtures with authenticated project/activity adapters using confirmed contracts. Keep status labels specific to activity type. Production details should navigate to a specific task, not just its feature index.

Project context is currently assigned in My Work after an activity exists. Automatic project assignment when starting work, cross-device synchronization, sorting by authoritative timestamps, live job updates and retries require mainline integration. Do not invent endpoints or imply example jobs are running. Ask GrowthIQ locally saved questions remain drafts; opening the existing feature does not restore their content automatically.

## Validation

Build and 88 existing JavaScript checks passed. Browser checks cover project creation, assignment, persistence after reload, desktop and 390px mobile (no horizontal overflow). Screenshots: `.impeccable/review/my-work/desktop.png` and `mobile.png`. Functional QA uses localhost origin separately from the user's 127.0.0.1 data.
