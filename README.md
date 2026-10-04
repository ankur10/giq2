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
| [growthiq-live-contract.md](growthiq-live-contract.md) | Full-app demo chapters, presenter controls and workflow handoffs. |
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

The main prototype is vanilla HTML/CSS/JavaScript. React is mounted for the newer Studio variants and full-app demo; this is not a single React application. Edit the `.jsx` sources, not generated files in `assets/studio/` or `dist/`.

The CSS cascade is intentional: `styles.css` → `themes.css` → `refinements.css` → `studio-next.css` → `studio-variants.css` → `growthiq-demo.css`. When migrating, consolidate these into the mainline styling system while preserving the final computed appearance; copying only the base stylesheet will miss later refinements.

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
| Main app | [/#home](http://127.0.0.1:8772/#home) |
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

The build creates the static site in `dist/`. The check validates `app.js` syntax.

## Deploy to Vercel

Push the project to Git and import the repository into Vercel. Use this folder as the project root. The included `vercel.json` sets:

- Framework: **Other**
- Install command: `npm ci`
- Build command: `npm run build`
- Output directory: `dist`

No environment variables are required for this preview. Use the same hash routes on your deployment URL, such as `https://your-site.vercel.app/#demo`.

See `README.txt` for detailed design and verification notes.
