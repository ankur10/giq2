# GrowthIQ Live · isolated presentation contract

## Scope

GrowthIQ Live is the full-product presentation at `#demo`, available from the application navigation. Seven presenter-controlled chapters connect Your Briefing, signals, markets, competitors, customer context, Ask GrowthIQ and a strategy brief. This is an experimental presentation extension, not approval to change the global visual system. `DESIGN.md`, `.impeccable/design.json` and `direction-contract.md` retain their existing authority for the operating workspace.

The presentation uses captured September 2026 records supplied by the existing application: signals, market rows, competitor coverage and Studio capability outlines. It adds no backend integration, factual records, computed forecast or generated research. The customer chapter shows captured segment coverage; customer and account details remain behind the existing SalesPlay access boundary. Selected records are research context, without an inferred causal relationship.

## Story and handoffs

| Chapter | Presenter action | Existing destination |
| --- | --- | --- |
| Your business | Choose a perspective | Your Briefing |
| What changed | Select a captured signal and inspect its relevance | Live Signals or Your Briefing |
| Where to look | Select a market; read captured CAGR and TAM | Market explorer |
| Who matters | Select a peer; compare four captured segments | Competitor intelligence or financial benchmarking |
| Customer context | Choose a segment and compare coverage | Customer workspace access page |
| The question | Edit a question with the selected evidence | Ask GrowthIQ |
| The next decision | Review capability scope and context | Existing strategy-brief workspace or Studio catalog |

Ask receives an editable question and the selected signal, market, peer and segment evidence. The strategy-brief handoff receives the question as its subject and that evidence as context, marked with origin “GrowthIQ Live.” Both handoffs block a blank question. Subsequent review, browser-only save and text download use the existing Studio flow; no research is generated or automatically transferred to production.

Chapter, selections and question persist in memory while navigating within the loaded page. The workspace exposes “Return to demo” after a visit. Reloading does not promise to restore this presentation session. “Restart story” returns to the first chapter without clearing selections.

## Presentation and controls

The isolated dark navy stage uses the existing serif/sans pairing, pale cyan emphasis, chapter navigation and large reading content. A React Three Fiber landscape represents product destinations, with camera movement following chapter selection. It conveys navigation, not quantitative relationships. Desktop uses adjacent narrative and evidence; mobile stacks content, scrolls chapter navigation horizontally and keeps step controls available at the bottom.

- Use chapter buttons, Previous/Next, Right/Left or Page Down/Page Up. There is no timed chapter advance.
- Keyboard chapter shortcuts ignore editable fields and modified key presses. Chapter changes focus the heading; Escape closes presenter help.
- “Pause motion” disables entrances and makes camera changes immediate. The implementation also respects system reduced motion.
- “Full screen” requests browser fullscreen; an unavailable request shows a status message and leaves the presentation usable.
- “Exit demo” returns to Your Briefing. Presenter help also links to Support.

The scene uses demand rendering and a capped pixel ratio. A labeled map fallback is implemented for unavailable WebGL, with DOM chapter controls retained. Module-load or component failures provide a route back to the workspace.

## Build and use

From the repository, install dependencies with `npm ci`, then run `npm run build:studio`. `build-studio.cjs` builds both `studio-spatial.jsx` and `growthiq-demo.jsx` into `assets/studio/`, including shared chunks. The demo module loads on route entry. Its presentation styles live in `growthiq-demo.css`; routing and handoffs live in `app.js`.

Serve with `python3 -m http.server 8772 --bind 127.0.0.1` and open `http://127.0.0.1:8772/#demo`. Use an available port if 8772 is already occupied. The demo needs no production credentials for its captured-record presentation.

## Verification and limits · 2 October 2026

Checked source evidence: `growthiq-demo.jsx`, `growthiq-demo.css`, `app.js`, `build-studio.cjs`, product/design contracts and `verification/growthiq-live-review.json`. The recorded verification reports a successful bundle build, JavaScript syntax check and 84 mock-DOM checks. Mock checks do not execute React or WebGL; browser observations are separate.

Browser evidence records all seven chapters fitting at 1920×1080 without internal stage scrolling, reviewed mobile chapters without page-level horizontal overflow at 390px, selected-context handoffs, return-session restoration, keyboard/empty-question protections and manual motion pause. No application console errors were observed. The reviewer’s mobile comparison-table overlap finding was fixed with wrapping cell text and recaptured; the recorded final disposition is **ship** for this bounded scope. Captures are in `.impeccable/review/growthiq-live/`.

Actual fullscreen entry/exit, system reduced-motion behavior and WebGL fallback were not independently verified. Conference display hardware and frame rate were not benchmarked. The recorded review does not expand production or global visual approval.
