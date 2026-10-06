# GrowthIQ Design Preview

A frontend prototype of GrowthIQ with multiple Intelligence Studio designs and a cinematic React Three Fiber demo. Uses captured product data; backend APIs and research generation are not connected.

## Purpose of this handoff

Use this repository as a working visual and interaction reference when implementing the designs in the **mainline GrowthIQ repository**. The scope is frontend design: preserve the mainline app's existing content, capabilities, API contracts, authentication and permissions.

This is a standalone prototype, not a replacement production application. Its static records, hash router and browser storage demonstrate the experience. Port the selected design into the mainline app's components, routing and service layer. The final production stack and API mapping must be checked in that repository.

## Instructions for Claude Code

Open Claude Code in the **mainline repository** and make this design repository available as a separate local checkout. Fill in the paths and scope below, then paste the prompt into Claude Code. Keep the design checkout as a reference; implementation changes belong in mainline.

Choose one Studio variation for production. V1–V5 are alternatives, and GrowthIQ Live is a separate optional presentation mode. If the choice is undecided, Claude should inspect both repositories and report the mapping first, then ask for the missing product decision before implementing that surface.

### Copy-ready integration prompt

```text
Integrate the selected GrowthIQ frontend design into this mainline repository.

Inputs:
- Mainline repository: <absolute path>
- Design reference repository: <absolute path to giq2>
- Design preview URL: <local or deployed preview URL>
- Screens and workflows in scope: <list>
- Selected Studio variant: <V1 / V2 / V3 / V4 / V5 / out of scope>
- Theme and header choice: <Precision / Advisory / Mineral; light / dark header>
- GrowthIQ Live full-app demo: <include / exclude>

Objective:
Match the selected reference's layout, typography, spacing, colors, responsive
behavior and interactions using the mainline app's existing architecture and
real data. This is a frontend integration, not a backend redesign. Do not add
new business content or remove existing production capabilities.

Start by inspecting both repositories:
1. Read the applicable CLAUDE.md, AGENTS.md and contributor instructions.
   Inspect the working tree and preserve unrelated changes.
2. In the design repository, read README.md, PRODUCT.md, DESIGN.md, the
   relevant surface contracts and the actual source files listed in README.
   Inspect the running reference and relevant screenshots where possible.
3. In mainline, identify the framework, router, component library, styling,
   state management, API clients, authentication, permissions and test tools.
4. Produce a concise mapping: reference screen/component -> mainline target
   -> existing data/service -> behavior to preserve -> gaps or decisions.
   Verify capability IDs against mainline; do not assume prototype names or
   array positions are production identifiers.
5. If the scope and variant are specified, proceed with implementation after
   explaining the plan. Ask only for missing product decisions or incompatible
   requirements; continue independent work while those are being resolved.

Implementation rules:
- Reuse mainline components, routing, API clients and state conventions.
  Port the visual treatment; do not replace the app with the prototype shell.
- Preserve endpoint URLs, methods, payloads, response contracts, authentication,
  permission checks, business rules, pagination and server-search semantics.
  Do not modify backend code, schemas or introduce endpoints for this task.
- Keep live content and all existing capabilities. data.js is a fixture reference,
  not production data. Do not ship hardcoded companies, metrics or generated
  answers as a substitute for API responses.
- Map Studio labels/objectives to existing capabilities. Brief forms and scope
  outlines do not authorize new API fields or simulated generation success.
- Preserve real upload, research, report, customer-access and support flows.
  Do not replace working services with the prototype's unavailable messages,
  localStorage drafts or text-only brief download.
- If an interaction needs unsupported backend behavior, document the exact gap
  and retain the existing working flow. Do not silently invent a workaround
  that changes the product contract.
- Match the final CSS cascade, not only styles.css. Adapt semantic tokens and
  licensed fonts into mainline's styling system; avoid leaking global overrides.
- Preserve context between screens, validation, drafts, deep links, back
  navigation, selection state and focus using mainline's supported mechanisms.
- Use mainline's dependency versions and build tooling. Do not copy node_modules,
  generated bundles, dist, the prototype lockfile or its Vercel configuration
  wholesale. Add a dependency only where the selected surface requires it.
- Add 3D only for selected spatial/demo surfaces. Lazy-load it, retain equivalent
  keyboard/DOM controls, reduced motion and a usable non-WebGL fallback.
- Keep changes confined to the selected scope. Do not merge, deploy or modify
  production data as part of this integration.

Validation and delivery:
- Run mainline's relevant lint, type checks, tests and production build.
- Add or update focused tests for changed behavior and integration boundaries.
- Exercise real workflows in an authorized development/test environment,
  including loading, empty, error, permission-denied and long-content states.
- Compare reference and implementation at matching desktop/mobile viewports.
  Capture screenshots; verify overflow, keyboard/focus behavior and accessibility.
- If 3D/demo is included, check reduced motion, WebGL fallback, fullscreen and
  performance on the target presentation hardware when available.
- Report changed files, implemented screens, API mappings, commands/results,
  screenshots, intentional deviations and unresolved gaps. Clearly distinguish
  verified behavior from checks that could not run. Prototype QA is not proof
  that the mainline integration passes.
```

The mainline repository owns runtime behavior and service contracts; the selected prototype owns the visual reference. When they conflict, document the conflict and resolve it explicitly rather than dropping functionality or changing an API.

## Design and implementation files

| File | What the developer should use it for |
| --- | --- |
| [PRODUCT.md](PRODUCT.md) | Product intent, scope and service boundaries. |
| [DESIGN.md](DESIGN.md) | Shared visual language, token roles, typography and component specifications. Runtime values are implemented in the CSS and mirrored in `themes.json`. |
| [direction-contract.md](direction-contract.md), [theme-contract.txt](theme-contract.txt) | Briefing layout, contextual interactions and theme behavior. |
| [studio-contract.txt](studio-contract.txt), [studio-next-contract.md](studio-next-contract.md) | Original and guided Studio flows, validation and draft behavior. |
| [studio-variants-contract.md](studio-variants-contract.md) | V3–V5 interactions, responsive behavior and motion boundaries. |
| [ask-results-contract.md](ask-results-contract.md) | Ask GrowthIQ captured results, history behavior, service boundaries and review scope. |
| [ask-results.html](ask-results.html), [ask-results.jsx](ask-results.jsx), [ask-results.css](ask-results.css) | Standalone Ask results entry, React interactions and isolated styling. |
| [ask-results-data.json](ask-results-data.json) | Answer, research outline, news and image fixtures captured on 6 October 2026; bundled at build time. Additional captured history and presentation mappings live in `ask-results.jsx`. |
| [ask-thermo-contract.md](ask-thermo-contract.md), [ask-thermo.jsx](ask-thermo.jsx), [ask-thermo.css](ask-thermo.css), [ask-thermo-data.json](ask-thermo-data.json) | Thermo Fisher example, evidence inspection and proprietary-report access boundaries; static fixtures use the shared Ask Results SVG icons. |
| [growthiq-live-contract.md](growthiq-live-contract.md) | Full-app demo chapters, presenter controls and workflow handoffs. |
| [domain-expert-contract.md](domain-expert-contract.md), [domain-expert.js](domain-expert.js), [domain-expert.css](domain-expert.css) | Ask Domain Expert form, browser-only request history and future service integration boundaries. |
| [index.html](index.html) | Entry point, font loading and stylesheet/script order. |
| [app.js](app.js) | Main shell, hash routes, screens, event handling, local state and React mount/handoff integration. |
| [data.js](data.js) | Captured reference records; replace with existing mainline data access when integrating. |
| [studio-data.js](studio-data.js) | Presentation mapping of existing capabilities to objectives, names and deliverable outlines. Preserve capability identity when mapping to production. |
| [styles.css](styles.css) | Base layout, components and typography. |
| [themes.css](themes.css), [themes.json](themes.json), [theme.js](theme.js) | Runtime token overrides, palette reference and preference initialization. |
| [refinements.css](refinements.css) | Later shared layout and readability refinements. |
| [studio-next.css](studio-next.css) | Guided Studio styling. |
| [studio-spatial.jsx](studio-spatial.jsx), [studio-scene.jsx](studio-scene.jsx), [studio-variants.css](studio-variants.css) | React V3–V5 surfaces, lazy 3D scene and variant styles. |
| [growthiq-demo.jsx](growthiq-demo.jsx), [growthiq-demo.css](growthiq-demo.css) | Full-app React Three Fiber presentation and its isolated styling. |
| [assets/](assets/), [assets/FONT-LICENSES.txt](assets/FONT-LICENSES.txt) | Local fonts, attribution and generated Studio/demo bundles. |
| [build-studio.cjs](build-studio.cjs), [build-site.cjs](build-site.cjs) | Bundle React/Three modules, then package runtime files into `dist/`. |

The main prototype is vanilla HTML/CSS/JavaScript. React is mounted for the newer Studio variants, full-app demo and standalone Ask results preview; this is not a single React application. Edit the `.jsx` sources, not generated files in `assets/studio/` or `dist/`.

The CSS cascade is intentional: `styles.css` → `themes.css` → `refinements.css` → `studio-next.css` → `studio-variants.css` → `growthiq-demo.css` → `domain-expert.css`. When migrating, consolidate these into the mainline styling system while preserving the final computed appearance; copying only the base stylesheet will miss later refinements.

## Integrating into the mainline repository

1. **Agree on the target.** Walk through the preview with the product/design owner and select the production Studio variant, theme and screens. Treat the conference demo as a separate optional surface.
2. **Map existing behavior.** Match each screen, capability and contextual action to the mainline route, service call and permission model. Keep existing payloads, response shapes, pagination and authorization intact.
3. **Port the foundation first.** Implement semantic tokens, licensed fonts, shared shell, buttons, fields, tables, focus states and responsive navigation within the existing component architecture.
4. **Port one complete flow at a time.** Start with briefing → selected signal → research question, then Studio discovery → brief preparation → review. Preserve required-field rules, draft restoration and back-navigation context.
5. **Reconnect through existing services.** Replace fixture reads and prototype-only state with supported mainline data/state mechanisms. A prepared brief is not a new backend contract. If the existing service cannot support a proposed interaction, record the gap for a product decision rather than silently changing an API.
6. **Integrate presentation features separately.** Reconcile React/Three versions with the mainline stack, lazy-load scenes, retain DOM alternatives and verify motion/performance on target hardware.
7. **Validate before rollout.** Compare against the selected preview and test the real end-to-end workflow, including loading, empty, error, permission-denied and long-content states that captured records cannot exercise.

### Prototype behavior that needs production mapping

| In this preview | Mainline integration requirement |
| --- | --- |
| Captured records and local filtering | Existing API data, pagination and search semantics; local fixture search is not server-wide search. |
| Local saved/read signals, query history and drafts | Existing persistence and user/account ownership rules. Browser state is not server state. |
| Studio outlines and brief review | Existing setup/generation flow. No research is generated here; downloads contain brief text, not a generated report. |
| Selected template or attachment filenames | Existing upload mechanism and validation. File contents are not saved or transferred by this prototype; restored drafts require file reselection. |
| Links to existing GrowthIQ setup | Preserve authenticated navigation. Opening the link does not automatically transfer brief fields or files. |
| Customer access and support boundaries | Existing SalesPlay permissions and support submission services. |
| Hash routes and session restoration | Mainline router and state lifecycle, preserving equivalent deep links and return behavior. |

### Ask GrowthIQ results handoff

Open [Ask results](http://127.0.0.1:8772/ask-results.html) and read [its contract](ask-results-contract.md) when selecting this surface for Claude Code/mainline integration. This is an extension of the approved Briefing treatment, with its own stylesheet; the shared CSS cascade and theme selector do not apply to this standalone page.

The results workspace has a dedicated Ask GrowthIQ sidebar with new research, searchable Q&A/report history, an expandable two-line question with its own copy action, compact news and Sources (with a unique-link count) as the second tab and Recommended Next Steps third. Sources deduplicates existing response links and distinguishes answer citations from news and competitor figures. Recommended Next Steps has its own tab with a count and five prepared-question actions. Answer copy/download sit beside the result tabs; the confidence indicator has been removed. The sidebar has Back to Home, single-line history titles, timestamps and report-status badges. Tab content shares consistent margins; wide desktop answers use a 75% reading column with an outline alongside.

The fixture reproduces an authenticated session captured on **6 October 2026**. No backend calls run in this preview. Connect history retrieval, follow-up submission, report generation and file upload through existing mainline services, preserving their APIs, permissions and error states. The local copy/download actions export captured answer text only; they are disabled for history entries whose answers were not captured. Selected file names and follow-up text are temporary UI state, and opening the original session does not transfer them.

The source session associates a Jabil question with MXene market, news and competitor results; the preview discloses that mismatch. It also preserves the source's unavailable visualization state. Do not substitute invented answers or charts during integration. Competitor images use the original remote URLs and depend on network availability; retain the fallback and check mainline's image/CSP policy.

## Review evidence and acceptance

Use the running preview and source with the surface contracts above. Screenshots are in [.impeccable/review/](.impeccable/review/) and [verification/design-refinement/](verification/design-refinement/). Specific review records include [Studio variants](verification/studio-variants-review.json) and [GrowthIQ Live](verification/growthiq-live-review.json).

Some earlier documents—including verification paragraphs in `DESIGN.md`, `specifications.html` and `README.txt`—describe earlier deliveries or blocked browser sessions. Read their dates and scope alongside the later surface records; they are not a single current acceptance report. The shared design guidance remains useful, but experimental surfaces have their own contracts.

Earlier references to `.impeccable/design.json` point to a file absent from this checkout. Use the available design document, theme reference and runtime CSS for this handoff.

Recorded prototype checks include 84 mock-DOM checks and scoped desktop/mobile browser reviews. These do not establish production readiness. `npm run check` performs syntax validation only. For the mock checks, run `node verification/check.cjs`; it regenerates HTML snapshots and results under `verification/` and does not execute React or WebGL.

Before mainline release, verify real API workflows, access control, draft behavior, keyboard/focus navigation, responsive layouts, theme contrast and reduced motion. Fullscreen entry/exit, WebGL fallback and conference-hardware performance still need runtime verification. Preserve the existing font attribution when moving assets.

## Run locally

Install Node.js LTS, then run from the project folder:

```bash
npm ci
npm start
```

Open [http://127.0.0.1:8772](http://127.0.0.1:8772). Stop the server with `Ctrl+C`.

There is no hot reload. After editing files, run `npm run build` in another terminal and refresh the browser.

## Preview links

| Design | Local URL |
| --- | --- |
| Ask GrowthIQ — Captured results | [/ask-results.html](http://127.0.0.1:8772/ask-results.html) |
| Ask GrowthIQ — Thermo Fisher | [/ask-results?example=thermo](http://127.0.0.1:8772/ask-results?example=thermo) |
| Main app | [/#home](http://127.0.0.1:8772/#home) |
| Ask Domain Expert | [/#domain-expert](http://127.0.0.1:8772/#domain-expert) |
| Studio V1 — Original | [/#studio](http://127.0.0.1:8772/#studio) |
| Studio V2 — Guided | [/#studio-next](http://127.0.0.1:8772/#studio-next) |
| Studio V3 — Spatial | [/#studio-v3](http://127.0.0.1:8772/#studio-v3) |
| Studio V4 — Cinematic | [/#studio-v4](http://127.0.0.1:8772/#studio-v4) |
| Studio V5 — Editorial | [/#studio-v5](http://127.0.0.1:8772/#studio-v5) |
| GrowthIQ Live — Full-app demo | [/#demo](http://127.0.0.1:8772/#demo) |

## Build

```bash
npm run build
npm run check
```

The build bundles the React entries (including Ask results and its JSON fixture) into `assets/studio/`, then creates the static site in `dist/`. The check validates `app.js` syntax; it is not an Ask results interaction test.

## Deploy to Vercel

Push the project to Git and import the repository into Vercel. Use this folder as the project root. The included `vercel.json` sets:

- Framework: **Other**
- Install command: `npm ci`
- Build command: `npm run build`
- Output directory: `dist`

No environment variables are required for this preview. Use the same hash routes on your deployment URL, such as `https://your-site.vercel.app/#demo`.

See `README.txt` for detailed design and verification notes.

History delete controls are session-local preview actions with Undo; wire them to existing mainline deletion services and ownership rules during integration. The question uses larger type with a two-line preview and expands in place. Download is the primary header action; the follow-up composer floats above the reader in a compact rounded surface (760px maximum), with mobile insets and measured bottom scroll clearance.

### Thermo Fisher report example

Open [/ask-results?example=thermo](http://127.0.0.1:8772/ask-results?example=thermo) for the captured growth-opportunities report, searchable proprietary-report navigation, and inline evidence panels. Use this extensionless route because the local `.html` redirect drops the query parameter. Its source files are `ask-thermo.jsx`, `ask-thermo.css`, and `ask-thermo-data.json`. See [the integration contract](ask-thermo-contract.md) for captured-data limitations, report access, and evidence states.

The audit covers 49 answer info buttons and 25 visible opportunity controls: 74 captured controls, including 58 unavailable details and four mismatched responses. The four proprietary report links are retained; their bodies required sign-in and are not reproduced. Answer nodes, evidence and report references are static fixtures with no API calls. Preserve the existing KnowledgeStore authentication flow and service contracts when integrating.

### Ask Domain Expert

Open [/#domain-expert](http://127.0.0.1:8772/#domain-expert) or choose **Intelligence → Ask Domain Expert**. The form saves local preview requests and keeps an expandable history across reloads when browser storage is available; it does not send requests to a human expert. Unsaved form input survives navigation within the current page session. Files: `domain-expert.js` and `domain-expert.css`. See [integration notes](domain-expert-contract.md) before connecting the mainline request service.
