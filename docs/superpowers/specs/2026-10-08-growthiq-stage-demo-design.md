# GrowthIQ stage demo: "Inside the AI layer"

Date: 8 October 2026
Status: design approved in conversation; awaiting review of this document before planning.

## Purpose

A live, presenter-driven demo of GrowthIQ for a company townhall keynote. It replaces a feature-by-feature walkthrough with one continuous story told through 3D motion that resolves into the real product interface.

## Decisions already made

| Question | Decision |
| --- | --- |
| Audience | Whole company, mixed roles. Goal: pride and a shared understanding of what the product is. No jargon. |
| How real is the AI moment | Scripted but truthful. The story leads; the product screens are the real interface with staged content. Nothing is shown that the product cannot do. |
| Length and delivery | About 100 seconds, narrated live, advanced by clicker. One continuous shot. |
| Story world | Ostrel Coatings, from the explainer film `MnM_Growth_Explainer_Ostrel.mp4`. The demo must stand alone, but echoes the film for those who have seen it. |
| Concept | "Inside the AI layer". The film shows the AI layer as a closed box; the demo opens it. |
| Existing demos | The `#demo` and `#keynote` routes and their sources are out of scope and must not be changed. Nothing is reused from them. |

## The one sentence

The audience should leave able to say: "It noticed something that mattered to us, told us why, and turned it into work, in about a minute."

## Beat sheet

Each beat advances on one clicker press. Times are targets for the recording mode and for rehearsal; live, the presenter sets the pace.

| # | Name | Time | On screen | Presenter says |
| --- | --- | --- | --- | --- |
| 1 | The question | 0–10s | Deep navy, empty. One line types itself: "Where is Ostrel's next growth?" | "Every company asks this question. Watch what happens when Ostrel asks GrowthIQ." |
| 2 | The world | 10–25s | The question drops into the dark. A flat web of markets appears around one point, Ostrel, then tilts and gains depth: hundreds of markets in space. | "Ostrel makes coatings. But it doesn't sit in one market. It sits inside hundreds." |
| 3 | Three lenses | 25–50s | Three sweeps of light pass through, on one press. Markets: a path ignites from battery packs to fire protection to new coatings to Ostrel. Customers: Talmir Motors fills from mostly grey to mostly orange. Competitors: Quendra pulses three times. Each sweep leaves one card in space. | "GrowthIQ looks three ways at once. Markets: a need is travelling towards us. Customers: one of ours is already changing. Competitors: someone else has noticed." |
| 4 | Convergence | 50–70s | The three cards pull together. The camera pushes through, the constellation collapses inward and becomes the real product answer screen. The answer writes itself with the three cards docked as evidence. | "Seen separately, these are three facts. Seen together, they're an answer." Pause. |
| 5 | The brief | 70–88s | One click. The answer unfolds into a strategy brief in the real interface. | "And one click turns that answer into something I can take into a meeting." |
| 6 | Pull back | 88–100s | The camera pulls out. The product screen shrinks to one lit point. Two other points glow faintly. Closing line fades in: "We see growth before it happens." | "That was one opportunity. It's already watching the others." |

Beat 4 is the peak and the only beat with a deliberate silence.

## Scripted content

All companies are the film's fictional ones. This content lives in `stage/story.js` and nowhere else.

**Evidence cards (beat 3)**

- Markets: "Bigger battery packs need fire protection, and fire protection needs new coatings."
- Customers: "Talmir Motors: 22% electric five years ago. 70% of today's pipeline."
- Competitors: "Quendra Chemicals: hiring battery engineers, filing patents, building a pilot line."

The Talmir figures are the film's. They are different measures (past revenue, current pipeline) and are worded so they are not presented as like-for-like growth. This is the only number in the demo.

**Answer (beat 4)**

- Heading: "Battery fire-protection coatings"
- Summary: "A need created in electric-vehicle battery packs is reaching coatings. One of Ostrel's customers is already moving towards it, and a competitor is building capability for it."
- Evidence: the three cards above, labelled Markets, Customers, Competitors.

**Brief (beat 5)**

Uses the outline of the product's existing strategy-brief capability in `studio-data.js`.

- Where to play: battery fire-protection coatings for electric-vehicle packs.
- Why now: Talmir Motors' pipeline is now mostly electric.
- Competitor moves: Quendra Chemicals is hiring, patenting and piloting.
- Recommended decision: investigate fit with Talmir's new battery-pack line before the specification is set.

**Faint points in beat 6:** wind-blade edge protection and heat-pump coil coatings, the film's other two opportunities. They glow but carry no label or claim.

**Not shown:** a named contact, a sales talk track, or deep customer intelligence. The product does not provide these.

## The look

The film's world with the lights turned down and depth added.

- **Stage:** the deep navy the film ends on, falling to near-black at the edges.
- **Orange** (the film's orange) is used only for things that are alive in the story: the travelling path, the changing customer, the answer.
- **Everything else** is cool, pale blue-grey points and hairlines.
- **White** is reserved for the real product screens in beats 4 and 5, so they are the brightest thing shown.
- **Type:** the repo's bundled Source Serif 4 for the question and closing line, set large; Source Sans 3 for labels. At most five or six words on screen during the 3D beats.
- **Constellation:** a few hundred small points joined by hairlines, drifting slowly. Depth comes from focus: near points sharp, far points soft. Only named markets get labels, and only when lit. Ostrel is a slightly larger steady disc.
- **Lens sweeps:** one soft plane of light passing through once per lens. Each leaves a small glass card with one line of text.
- **Convergence:** the cards overlap (the film's three circles, as an action); points fly to where the product screen's elements sit; the interface fades in over them.
- **Motion:** one eased camera move per beat, stillness between beats. No spinning, bounce, confetti or particle bursts.
- **Avoid:** globes, neon grids, purple gradients, robot or brain imagery.

## Architecture

A standalone full-screen page, following the pattern of `ask-results.html`.

| File | Responsibility | Depends on |
| --- | --- | --- |
| `stage.html` | Page shell; loads the bundle and stylesheets. | — |
| `stage.css` | Stage-only styling: navy stage, typed question, cards, closing line. | Bundled fonts in `assets/`. |
| `stage/story.js` | The script as data: beats, target timings, all on-screen words, answer, brief, named markets. | Nothing. |
| `stage/director.js` | Beat state: current beat, progress within a beat (0 to 1), next, back, restart, jump. Never advances on its own except in recording mode. Pure logic, no DOM. | `story.js` |
| `stage/constellation.js` | Seeded, deterministic layout of points and links, including the named markets and the battery-to-Ostrel path. Pure function. | `story.js` |
| `stage/Scene.jsx` | React Three Fiber canvas: instanced points, line segments, lens sweeps, camera rig, glow and soft focus. Draws only from (beat, progress). | `constellation.js`, three, R3F |
| `stage/ProductLayer.jsx` | The real-interface layer for beats 4 and 5, as ordinary DOM. Exposes the on-screen positions of its elements for the convergence. | `story.js`, product stylesheets |
| `stage/Overlay.jsx` | Typed question, the three cards, closing line. | `story.js` |
| `stage/Stage.jsx` | Entry point. Wires input to the director and passes state to the three layers. | All of the above |

**Data flow.** Input (clicker or key) goes to the director. The director holds (beat, progress). Scene, Overlay and ProductLayer each render from that state and nothing else. No layer talks to another directly, except that ProductLayer reports element positions upward so Scene can use them as fly-to targets in beat 4.

**Product screens.** ProductLayer uses the repo's real stylesheets: `ask-results.css` (its classes are namespaced `ar-`) for the answer view, and the Studio brief styles from the main cascade for the brief view. If loading both on one page causes conflicts, the brief view is isolated in a same-origin frame so both keep their real styling and positions can still be measured.

**Build.** Add `stage/Stage.jsx` to the entry points in `build-studio.cjs` and `stage.html`, `stage.css` to the file list in `build-site.cjs`. No other build changes.

**New dependency.** `@react-three/postprocessing` (with its `postprocessing` peer) for glow and soft focus. Effects are switched off automatically on the fallback path.

## Controls

| Action | Input |
| --- | --- |
| Next beat | Clicker (Page Down), right arrow, space |
| Previous beat | Clicker (Page Up), left arrow |
| Restart | R |
| Jump to beat | 1–6 |
| Fullscreen | F |

No speaker notes are shown on screen. The script is delivered separately as a one-page document.

## Stage safety

- **Offline.** Fonts and code are local. No network requests at run time.
- **Recording mode.** `stage.html?autoplay` runs all six beats on the target timings for capturing a fallback video with a screen recorder.
- **No WebGL.** Scene falls back to a flat 2D drawing of the same constellation layout per beat. The Overlay and ProductLayer are unaffected, so the story still completes.
- **Reduced motion.** If the operating system asks for reduced motion, camera travel is replaced by cross-fades. `?motion=full` overrides this on a stage machine.
- **Performance.** A few hundred instanced points. Device pixel ratio is capped so 4K projectors stay smooth.
- **Errors.** A React error boundary around Scene triggers the same 2D fallback rather than a blank screen.

## Testing

- **Automated (`node --test`):**
  - `director.js`: next, back, restart, jump, bounds at first and last beat, and that nothing advances without input outside recording mode.
  - `constellation.js`: same seed gives the same layout; named markets and the path exist and are connected.
- **Build:** `npm run build` succeeds and `dist/` contains the stage page.
- **Browser:** run every beat at 1920×1080, screenshot each, and check the console for errors. Check the no-WebGL fallback and recording mode.
- **Not verifiable here:** the venue machine, projector and clicker. One rehearsal on that hardware is required.

## Build order

1. Two still frames (beat 3 constellation, beat 4 convergence) for approval of the look.
2. Director and the six-beat skeleton with placeholder visuals, so timing can be rehearsed early.
3. The 3D scene.
4. The product layer and the convergence.
5. Polish, fallbacks, recording mode, and the one-page script.

## Out of scope

- Any live call to a GrowthIQ service.
- Changes to the main app, the existing `#demo` and `#keynote` routes, or their sources.
- A link to the stage page from the app's navigation. It is opened by address.
- Mobile layout. The page is designed for a 16:9 stage display.
- Recording the fallback video. The presenter records it once the demo is final.
- Committing the explainer film to the repository.
