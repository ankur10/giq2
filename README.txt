GrowthIQ — Briefing + Intelligence Studio

LOCAL SERVER AND VERCEL — 4 OCTOBER 2026
Use a current Node.js LTS release with npm. From this repository:
  npm ci
  npm start
Open http://127.0.0.1:8772/ or http://127.0.0.1:8772/#demo.
npm start (also npm run dev) builds the app and serves dist locally. It is a static preview, without hot reload; after editing source, run npm run build and refresh. If port 8772 is already occupied, stop that server or use: npx serve dist --listen tcp://127.0.0.1:8773

For Vercel, push the project files to your Git repository and import it into Vercel with this folder as the project root. vercel.json sets Framework Preset Other, Install Command npm ci, Build Command npm run build, and Output Directory dist. No environment variables are required for this captured-data preview. The Vercel deployment itself has not been performed or verified.
Build locally with npm run build. Only runtime HTML/JS/CSS and assets are published; local review captures and source/tooling files are excluded. Existing hash routes such as /#demo, /#studio-next and /#studio-v3 work directly without rewrites. Backend services and research generation remain unconnected. This configuration does not add production authentication; apply your Vercel project's access settings if the preview needs restricted access.

INTELLIGENCE STUDIO
Studio is the second destination under Intelligence, between Your Briefing and Ask GrowthIQ. All 22 existing capability choices are retained and searchable by outcome, original capability name, or description. Five objective groups and secondary output filters replace the Micro artifacts / Deep research split.

Start at #studio, then choose a task. A dedicated #studio/<task-id> workspace presents the scope, required brief subject, optional context, and deliverable outline. Review your brief, download it as text, save it locally, or open the existing GrowthIQ /agents page. No generated results, run history, costs or progress are fabricated. Saved briefs are explicitly local drafts.

Contextual entry points: briefing signal → strategy brief; market → market model; company → company profile; live signal → signal analysis. Original #agents and #deep-research links remain valid and open the Studio catalog.

TRY THESE FLOWS
1. Home: select a signal, read its relevance, save it, switch to Saved, and explore it with GrowthIQ. Its title is carried into an editable research question.
2. Markets: search, sort and inspect a market in the adjacent pane. Ask about the selected market.
3. Competitors: choose companies and turn on Show differences only.
4. Benchmarking: choose company rows, switch Table/Chart, select a metric, export selected data.
5. Live signals: filter by search, type or region; select a signal and move to the next one.
6. Ask GrowthIQ: choose a research direction to insert an editable question.
7. Studio: filter by an objective, select a task, prepare and review its brief, then save or download it.
8. Navigation: search with Cmd/Ctrl+K; returning to a route restores its search and scroll context.

SCOPE
A frontend design reference using captured GrowthIQ records. The staging product and backend were not modified. data.js is byte-for-byte unchanged from the preceding prototype. Axiom supplied design and font references only; none of its business records were imported.

BOUNDARIES
Research/agent generation, support submission, authentication, reports and uncaptured source URLs are not connected. Their existing production integrations are required. The prototype never returns fabricated generated results. Saved signals, read state, draft forms and entered questions are local to this browser.

DOCUMENTS
specifications.html — page-by-page behavior and implementation boundaries.
studio-contract.txt — approved Studio scope, route and interaction contract.
studio-data.js — frontend presentation mapping to unchanged existing capabilities.
DESIGN.md and .impeccable/design.json — visual tokens and component specifications.
direction-contract.md — approved direction and interaction contract.
verification/results.json — 67 local render-function and event-handler checks.
assets/FONT-LICENSES.txt — font attribution and embedded licensing metadata.
theme-contract.txt — theme behavior and design scope.
verification/theme-contrast.json — 162 static semantic contrast-pair checks; not computed browser validation.

DESIGN REFINEMENT — 2 OCTOBER 2026
refinements.css is the shared refinement layer, loaded after themes.css. It tightens the page hierarchy, briefing reader and Studio catalog, aligns the research composer, and enlarges mobile header targets. Existing records, capabilities and backend boundaries are unchanged.
Browser review is now available: the first refinement was inspected on desktop and mobile, with page-width checks on 15 screens at 390, 900 and 1440px. Studio search, brief review, mobile navigation and theme/header state preservation were exercised. All 67 mock-DOM checks and 162 static contrast checks still pass. Previews are in verification/design-refinement/. The earlier review-status.json describes the prior delivery, not this bounded refinement pass.

PRIOR DELIVERY VERIFICATION LIMIT
The browser tool could not verify its admin-enforced policy and denied preview access. No bypass was attempted. Consequently, browser interactions, responsive layout, visual contrast and font rendering have not been verified, and no new screenshots were captured. Local checks use a mocked DOM; they are not browser tests. A fresh visual review at desktop 1440px and mobile 390px remains required, including the Studio catalog and task workspace. The reviewer resolved the earlier four code findings and the Studio saved-draft restoration finding by inspection, but its visual disposition remains recapture.

GUIDED STUDIO PREVIEW — 2 OCTOBER 2026
From this repository, run: python3 -m http.server 8772 --bind 127.0.0.1
Open http://127.0.0.1:8772/#studio-next (port 8772 avoids conflicting preview servers on 8771).
Enter a brief and objective, compare deliverable scope, then prepare, review, save or download the brief. Browse all capabilities remains available as a secondary path and searches the same 22 choices by original names. Task workspaces use #studio-next/<task-id>; the original catalog remains at http://127.0.0.1:8772/#studio.
Saved drafts are browser-only. Generation and automatic transfer to GrowthIQ are not connected. See studio-next-contract.md for the bounded surface contract and verification status; desktop/mobile captures are in .impeccable/review/studio-next/.

STUDIO VARIATIONS — 2 OCTOBER 2026
Intelligence Studio now exposes five versions: V1 Original (#studio), V2 Guided (#studio-next), V3 Spatial map (#studio-v3), V4 Cinematic demo (#studio-v4), and V5 Editorial (#studio-v5). V1/V2 remain available. Each version supports its own /<task-id> workspace routes and uses the same 22 existing capabilities.
V3 connects selectable 3D sheets; V4 provides a dark presentation stage with optional full screen; V5 explores an editorial folio. Define, explore and prepare a brief, then use the existing review/save/download workflow. Session selections and edits carry through within the page; saved drafts remain browser-only. No research generation or backend changes are included.
Build local React/Three assets with npm ci followed by npm run build:studio. Serve with python3 -m http.server 8772 --bind 127.0.0.1, then open http://127.0.0.1:8772/#studio-v3 (or #studio-v4 / #studio-v5). The React bundle loads on variant entry; the 3D scene loads only for V3/V4. DOM controls, reduced motion, pause and fallback paths accompany the scenes.
See studio-variants-contract.md for the surface, interaction, build and verification contract. These are isolated experimental directions, not global style approval. The implementation pass reports 83 mock-DOM checks plus syntax/build validation and Chrome desktop/mobile checks; captures are in .impeccable/review/studio-variants/. Independent confirmation resolved all three review findings and returned ship for that bounded scope; see verification/studio-variants-review.json. The full-screen unavailable fallback was observed; browser full-screen entry/exit remains unverified.

GROWTHIQ LIVE — 2 OCTOBER 2026
Open http://127.0.0.1:8772/#demo, or choose GrowthIQ Live in the navigation, for a seven-chapter full-product presentation. Select captured signals, markets, peers and customer segments; edit the research question; continue into existing Ask GrowthIQ or strategy-brief workflows with the selected context. Return to demo restores the current in-page session. No backend calls, new factual records or generated research are added.
Use chapter buttons, Previous/Next, Right/Left or Page Down/Page Up. Keyboard chapter shortcuts stay inactive while editing a field. Presenter controls include motion pause, optional full screen, help and restart; restart keeps the current selections. Exit demo returns to Your Briefing. The React Three Fiber camera follows the selected chapter; chapter advance is presenter-controlled.
Run npm ci and npm run build:studio to build both Studio variations and GrowthIQ Live, then serve with python3 -m http.server 8772 --bind 127.0.0.1. See growthiq-live-contract.md for scope, controls, handoffs and limits. This isolated presentation does not replace DESIGN.md or approve a global redesign.
Recorded QA: 84 mock-DOM checks, syntax/build validation, all seven chapters fitting at 1920x1080, and reviewed 390px mobile chapters without page overflow. Context handoffs, return state, keyboard protection, empty-question validation and manual motion pause passed browser checks. The mobile comparison overlap was fixed and recaptured; the final bounded review disposition is ship. Evidence: verification/growthiq-live-review.json and .impeccable/review/growthiq-live/. Actual fullscreen entry/exit, system reduced motion and WebGL fallback remain independently unverified; display hardware/frame rate were not benchmarked.
