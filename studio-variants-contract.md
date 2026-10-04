# Intelligence Studio: V3–V5 surface contract

Updated 2 October 2026. These are requested experimental directions within Intelligence Studio. Their composition, larger typography, motion and V4 dark stage are local explorations, not approval of a new global visual system. PRODUCT.md, DESIGN.md and the existing shared tokens retain their authority; this contract does not replace them.

## Surfaces and routes

| Version | Entry route | Surface |
| --- | --- | --- |
| V1 Original | `#studio` | Existing objective-led catalog, preserved. |
| V2 Guided | `#studio-next` | Existing guided brief flow, preserved. |
| V3 Spatial map | `#studio-v3` | Light workspace with connected, selectable 3D research sheets and equivalent DOM controls. |
| V4 Cinematic demo | `#studio-v4` | Dark presentation stage with a sheet fan, staged headings, progress controls, an example subject and full-screen control. |
| V5 Editorial | `#studio-v5` | Large editorial type, objective rows and a numbered deliverable folio; no 3D scene. |

Version links sit beneath Intelligence Studio in navigation and inside each new surface. Each version supports `/<task-id>` after its base hash, such as `#studio-v3/market-model`. These task routes use the existing brief workspace and retain their originating version. V4 hides the surrounding sidebar and topbar only on its entry route; its task workspace returns to the shared shell. Exit demo opens V3.

All versions use the same 22 existing tasks and five objectives from studio-data.js. Names, original capability names, output formats, scope and restrictions retain their existing meanings. No backend, generated research, fabricated history, scores, prices or duration estimates are added.

## Interaction and state

The shared sequence is Define → Explore → Prepare:

1. Enter a subject and choose an objective. Required-field feedback returns focus to the relevant control. Browse all capabilities also permits exploration before entering a subject.
2. Compare existing deliverables and outlines, search by presentation name, original capability name or description, and select a task. A no-results state asks the user to change or clear the search.
3. Edit the subject and optional context, then open the existing task workspace. Review, text download, browser-only draft saving and the existing GrowthIQ setup remain the handoff actions. Outlines describe capability scope; they are not generated output.

Each new version keeps its stage, subject, context, objective, selected task, browse mode and query in memory for the current page session. Returning from a workspace retains the selected task, including a task selected outside the original objective through all-capability browsing. Workspace subject/context edits carry back into that version. These sessions do not promise persistence after reload. Saved drafts use the existing browser storage; restoring a draft restores its saved version. Template filenames may be recorded, but files must be selected again and are not automatically transferred to GrowthIQ.

## Motion, fallback and responsive behavior

V3/V4 use React Three Fiber scenes with frame-on-demand rendering, capped pixel density and low-power renderer preference. Selection and pointer changes animate toward a resting position rather than driving a continuous animation loop. Pause motion and the system reduced-motion preference suppress scene interpolation/parallax and associated CSS animation. V5's folio reveal respects reduced motion.

The canvas is hidden from assistive technology; named DOM buttons provide the same objective and deliverable choices, with selection state and keyboard focus. Missing WebGL or a scene error yields a static fallback. Module/application failure offers Guided Studio. On narrow screens, objectives appear before the continue action, columns stack and the task list remains scrollable. These measures are implemented behavior, not a claim of a complete accessibility audit.

V4 requests browser full screen and exposes an exit action when active. Rejected requests produce an unavailable message and leave the normal view usable. Actual full-screen entry and exit remain unverified by browser automation.

## Build and implementation

app.js owns routing, per-version sessions and the handoff to the existing workspace. studio-spatial.jsx mounts the React surfaces; studio-scene.jsx owns the lazy 3D scene; studio-variants.css contains the bounded variant treatments. Local scene colors and V4 overrides do not redefine shared design tokens.

Run `npm ci`, then `npm run build:studio`. The lockfile resolves React/React DOM 19.3.0, React Three Fiber 9.8.1 and Three.js 0.180.0. build-studio.cjs uses esbuild to emit local, split production modules into assets/studio/ and remove stale generated bundles. app.js lazily imports the React entry only for V3–V5; the 3D scene chunk is requested only by V3/V4. Serve the repository with `python3 -m http.server 8772 --bind 127.0.0.1` and open the desired hash route.

## Verification record

The implementation pass reports 83 passing mock-DOM checks, syntax validation and a successful production bundle build. The mock checks do not execute React or WebGL. Chrome checks separately exercised all three workspace handoffs, return selection across objectives, editable subject/context carry-through, search/no-results and pause controls. Desktop and 390px mobile review found no page-width overflow in the checked views. Captures are in `.impeccable/review/studio-variants/`: v3/v4/v5 desktop and mobile, plus V4/V5 selection views. WebGL fallback and system reduced-motion paths are present in source but were not independently simulated in the browser.

Review identified and the implementation addressed mobile continue-action ordering, a clipped V4 sheet and lost browse selection on return. Independent confirmation of updated source/captures resolved all three findings and returned a ship disposition for that bounded scope; it was not a fresh full audit. The durable record is `verification/studio-variants-review.json`. The full-screen unavailable fallback was observed, but entry/exit remains unverified. The mock checks are not browser tests; exhaustive accessibility and a full cross-browser audit are not verified. Older global review records describe earlier deliveries and should not be read as this pass's status.
