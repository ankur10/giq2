# Thermo Fisher captured report

Route: `/ask-results?example=thermo`. The Thermofisher item in the original Q&A history opens this example. Use the extensionless route: the local server's `.html` redirect drops the query parameter.

## Scope and rendering

Frontend-only static fixture of session `session-1791198624111`, inspected in signed-in Chrome on 6 October 2026. No API changes or research submissions. The question's original spelling is retained.

`ask-thermo.jsx` owns the example; `ask-thermo.css` extends the existing Ask Results styles. `ask-thermo-data.json` contains static captured answer nodes, 74 evidence-control records (including unavailable responses), source URLs, five news articles, six research chapters and four proprietary references. The entry component in `ask-results.jsx` chooses the example using the query string and passes its shared SVG `Icon` component, preserving the existing icon vocabulary. `build-site.cjs` includes the new stylesheet; esbuild bundles the fixture into the existing results asset. These source nodes and report references make no API requests.

## Navigation and evidence

Dedicated Ask GrowthIQ navigation includes captured examples and a searchable Proprietary Data report list. Selecting a report opens its access/details surface; Sources includes the same four report references alongside 15 distinct public evidence/news links. Source inclusion is session-level, not a verified report-page-to-claim attribution.

All 49 answer info buttons and 25 visible opportunity-list controls were inspected in the live UI and reproduced: 74 captured controls, not 74 successful evidence responses. Another 25 hidden duplicate controls were excluded. Each detail panel names the selected metric, value and opportunity. Overview, Methodology and Sources separate the summary, expandable calculation steps and citations. Previous/Next moves through captured controls. Escape closes the panel and restores focus. Desktop uses a side-by-side panel; at 1000px and below it overlays the reader and bounds keyboard focus. The main tabs support arrow keys, Home and End.

The fixture marks 58 controls as unavailable and four responses as mismatched. Some aggregate and SAM growth controls returned a different metric explanation. These are explicit unavailable/mismatch states. Do not manufacture calculations or silently replace source values. Source confidence labels are retained only inside evidence details.

Proprietary KnowledgeStore viewers required sign-in. No report pages or invented chapter lists are included. Report URLs exclude authentication queries; original-session links provide a fallback. Production integration must use the existing authenticated report resolver, not hardcoded preview URLs or session tokens.

Copy and Download operate on the captured answer. Follow-up is local-only and explicitly marked as a preview. Navigation and content are fixture-driven and should map onto mainline response data; do not port the snapshot as production data.

## Verification

Build and syntax checks passed. All 74 local evidence controls opened. Mobile Escape restored focus; report search and selection worked. Desktop and 390px mobile screenshots are in `.impeccable/review/ask-thermo/`. The sanitized source capture is review-only and excluded from `dist/`. News links place the external-link indicator directly after the headline in both examples.

## Surface direction

THESIS: Keep a long research answer readable while making its supporting evidence inspectable in place.
OWN-WORLD: Extend the existing Ask Results white canvas, muted blue-gray navigation, Source Sans typography, fine dividers and dark blue actions.
STORY: Question → answer → selected metric and methodology → underlying source or licensed report.
FIRST VIEWPORT: Question and tabs above the answer; compact research/report navigation at left; floating follow-up below.
FORM: Read/Operate. Code-led extension of the incumbent design. No replacement world or comp was commissioned.
