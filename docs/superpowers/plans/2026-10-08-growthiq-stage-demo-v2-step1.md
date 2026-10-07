# GrowthIQ Stage Demo v2, Step 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** The engine plus the cold open and act 1 of the five-minute demo, finished, so the presenter can judge the experience before the remaining acts are built.

**Architecture:** A director over flattened steps; real product screens in sealed style scopes laid out in a world; a camera that pushes in on named regions; a scripted cursor; a clock and feature label.

**Tech Stack:** React 19, esbuild, `node --test`; three/R3F unused in this step.

**Spec:** `docs/superpowers/specs/2026-10-08-growthiq-stage-demo-v2-design.md`

## Global Constraints

- Do not modify `app.js`, `tracker.*`, `keynote*`, `growthiq-demo*`, `ask-results*`, or any file with uncommitted changes this plan did not create.
- Commit sources only; never `assets/studio/` or the `.mp4`.
- All story words and screen content live in `stage/story.mjs`.
- Screens use the product's real class names and its real stylesheets, unmodified on disk.
- Stage colours: navy `#14213d`, edge `#070b16`, orange `#e07a26`.
- Step 2 and later acts are a separate plan, written after the experience check.

---

### Task 1: Story and director for acts and steps

**Files:** rewrite `stage/story.mjs`, `stage/director.mjs`, `stage/test/director.test.mjs`; create `stage/test/story.test.mjs`.

**Interfaces:**
- `story.mjs` exports `acts: {id, name, steps: Step[]}[]`, `steps` (flattened, each with `act` index), `screens: string[]`, and content objects `radar`, `briefing`. `Step = {id, screen, focus, label, clock, duration, cursor?: {to, click?, at}[], carry?: {from, to}}`.
- `createDirector({steps, autoplay, start, startProgress})` returns `{state(), next(), back(), jump(n), skip(direction), act(n), restart(), tick(dt), subscribe(fn)}`; `state()` is `{step, id, act, progress, seconds, count}`.
- `actionForKey(key)` adds `]` → `{type:'skip', direction:1}`, `[` → `{type:'skip', direction:-1}`, digits → `{type:'act', act:n-1}`.

- [ ] Write tests: step bounds; progress holds at 1; `skip` lands on the first step of the adjacent act; `act(n)` lands on that act's first step; autoplay; key map; story integrity (unique step ids, every `screen` is in `screens`, durations positive).
- [ ] Implement; `npm test` passes.
- [ ] Commit.

### Task 2: Sealed style scopes

**Files:** create `stage/Sealed.jsx`.

**Interfaces:** `loadSheets(names: string[]): Promise<void>` fetches and caches stylesheets, rewriting `:root[attr]` to `:host([attr])`, `:root` to `:host`, and `html`/`body` selectors to `:host`; `<Sealed sheets={[...]} theme="advisory" className>` renders children through a portal into a shadow root with those sheets adopted and exposes the root via `ref`.

- [ ] Implement; verify in the browser that a `.btn.primary` inside a scope computes the Advisory primary colour and that the page outside is unaffected.
- [ ] Commit.

### Task 3: Screens for the cold open and act 1

**Files:** create `stage/screens/Inbox.jsx`, `stage/screens/RadarMail.jsx`, `stage/screens/Briefing.jsx`, `stage/screens/Shell.jsx`.

- `Inbox`: stage-styled clock and notification (not a product screen).
- `RadarMail`: the product's `tracker-mail-window` markup from `tracker.js` `email()`, three stories from `story.radar`.
- `Shell`: the app shell markup from `app.js` `shell()` (sidebar, topbar, page header) with Norvane as the workspace.
- `Briefing`: `home()` and `signalReading()` markup inside `Shell`.
- Every region the camera can target carries `data-focus="<name>"`.

- [ ] Implement; capture each at 1920×1080 and compare against the running app's `#radar` and `#home` for fidelity.
- [ ] Commit.

### Task 4: World, camera, spotlight, cursor, carry, frame

**Files:** create `stage/World.jsx`, `stage/Cursor.jsx`, `stage/Frame.jsx`; rewrite `stage/stage.jsx`, `stage.css`; delete `stage/Overlay.jsx`, `stage/ProductLayer.jsx`.

- World places screens 1440×900 on a row; the camera transform fits the step's `screen`/`focus` rect into 84% × 76% of the viewport, eased over 1.4s; a spotlight dims everything outside the focus rect.
- Cursor moves to a named focus element at `at` seconds and shows a click ring.
- Carry: text travels from one screen's element to another's while the camera moves.
- Frame: clock top right, feature label bottom left.

- [ ] Implement; click through all steps; record `?autoplay` and review frames.
- [ ] Acceptance: every focused region's text is at least 28px tall on a 1080p frame; no console errors; back, skip and restart land in correct states.
- [ ] Commit.

### Task 5: Experience checkpoint

- [ ] Send the presenter stills and the recorded clip of the cold open and act 1. Stop for feedback.
