# GrowthIQ

<!-- impeccable:product-schema 1 -->

## Platform
web

## Product Purpose
Market, competitor and customer intelligence, with Intelligence Studio, research capabilities, signals and support. The requested outcome is a modern, high-quality frontend using existing data only.

## Operating Context
The staging application was reviewed in the user’s existing Chrome session. Eight left-nav destinations and fourteen accessible current views were captured.

## Capabilities and Constraints
No backend API changes. Preserve current data meanings, routes, permissions and service-backed workflows. Original JavaScript repository and exact API contracts are unavailable; this is a separate interactive frontend reference. Customers is restricted to its SalesPlay access boundary. Do not invent authenticated customer screens.

## Brand Commitments
GrowthIQ product name. The user selected Briefing for Home and approved a mineral light visual world inspired by the Axiom reference: locally bundled Source Serif 4, Source Sans 3 and JetBrains Mono; mineral gray canvas, white reading surfaces, charcoal primary actions, restrained blue selection and compact corners. Contextual interactions use existing data only. This direction replaces the earlier plain treatment. The user subsequently requested several color designs with a selector: The final shortlist is Precision, Advisory and Mineral, in that order; Advisory remains the default and recovery palette. Following user feedback, Grove, Midnight, Evergreen, Graphite, Slate, Atelier and Parchment were retired. The remaining options use restrained reading surfaces and concentrated accents. These are comparison options, not a claim of visual approval. Existing layout breakpoints, data meanings and workflows remain fixed; implementation visual QA remains pending. Precision retains scoped sans-serif headings and compact control refinements; Advisory and Mineral retain their existing typography and rhythm.

## Evidence on Hand
../growthiq-ui includes existing records, screenshots, source CSS findings and per-view specifications. Numeric meanings and availability must remain unchanged; no invented KPI, trend, risk score or forecast.

## Intelligence Studio
The user approved Intelligence Studio as a first-class destination in the Intelligence navigation group, below Your Briefing and above Ask GrowthIQ, replacing the Agents navigation label. The catalog organizes the existing 22 capabilities (7 micro artifacts and 15 research choices) by outcome: growth opportunities, competition, strategic decisions, customers and accounts, and research deliverables. Search retains original capability names alongside outcome-led names; output filters use existing capability formats. The three prominent starts are a market model, competitor research and a market-entry strategy.

Each task opens a dedicated workspace at #studio/<task-id> with an editable subject, optional context, the existing output format and a source-derived scope outline. Contextual entry points connect briefing signals to a strategy brief, markets to a market model, companies to a company profile, and live signals to signal analysis. Context stays editable and removable. The home briefing also links directly to the Studio catalog.

The local flow is prepare brief → review → download a text brief, save a browser-only draft, or open the existing GrowthIQ setup. This preview does not generate research or transfer the brief or files to the existing product automatically. Saved drafts contain brief text and template filenames only; resuming a saved draft restores that saved version. Template files must be selected again after restoration. Only the market-data template task requires a template selection. The outline describes the existing capability's scope, never a generated result.

The #studio catalog and task workspace extend the existing 15 route types to 17. Legacy #agents and #deep-research remain accessible as Studio catalog aliases. studio-data.js maps the unchanged data.js capabilities to presentation names, objectives and outlines; production configuration, permissions and generation remain with the existing service. Do not invent popularity, completed research history, scores, prices or duration estimates.

## Colour Theme Selection
The global topbar offers a native Colour theme select with three direct choices, visible theme names and a palette swatch on desktop and mobile. A selection applies immediately without rerendering the app, changing route or clearing drafts. It is saved in browser localStorage when available; unavailable storage leaves the current in-memory selection usable, and an invalid or retired saved name falls back to Advisory. The saved palette is restored before styles load. A valid ?theme= comparison link takes precedence once and persists its selection; history replacement consumes that parameter so subsequent manual choices survive reload. Saved Precision, Advisory and Mineral selections remain valid. The workspace remains light in all three palettes. The optional dark header applies a native dark color-scheme only to topbar controls. Browser theme-color follows the header surface when dark and the canvas when light. Theme changes make no API calls.

Precision uses Source Sans 3 for interface headings, brand, task names and the question composer; the signal article heading and reading summary retain their serif treatment. Compact Studio rows, tabular market figures, outlined active navigation, consistent control corners and composer focus refine task use without introducing new data or service behavior.

## Header Contrast
The three workspace canvases are lighter while reading panels remain white. An independent Dark header toggle changes only the topbar; sidebar and content remain light. Light is the default. The control exposes aria-pressed, announces state changes and stores its preference under growthiq-header-style. Theme changes preserve this choice. Valid ?header=dark or ?header=light comparison links apply and persist once; theme and header parameters are consumed independently while preserving other query fields and the route. Toggling preserves drafts, routes and filters without rerendering. Storage failure leaves the current in-memory choice usable.

## Open Decisions
Primary persona and production implementation stack were not explicitly specified. This local reference continues the already-delivered static HTML/CSS/JavaScript prototypes.

## Ostrel Townhall Keynote

The isolated `#keynote` route adapts the user-supplied Ostrel explainer into a presenter-controlled, nine-scene townhall story: question → familiar market view → connected markets → opportunity chain → customer shift → competitor signals → joined intelligence → prepared perspective → next conversation. It preserves the existing workspace and `#demo` tour. Its approved ivory/navy/orange presentation identity is local to this route; the workspace themes and brand commitments above remain in force elsewhere. The six-minute rehearsal and direction contract are in `keynote-contract.md`.

Ostrel Coatings, Talmir Motors and Quendra Chemicals, their events and the buyer role are fictional. The customer scene compares **22% electric revenue five years ago** with **70% electric pipeline today**: these are distinct measures, not a growth calculation. Evidence inspectors identify the supplied video and approximate timestamps, and distinguish scenario evidence from independently verified research. The answer is a prepared synthesis; no model, external research, backend action or outreach runs. The final text download is an illustrative brief. Captured product results open separately and do not constitute a live response to the keynote question. The source video is neither bundled nor uploaded.

Presenters can advance or reverse with the visible controls, arrow keys or Page Up/Page Down; Space advances outside interactive controls. Home/End and 1–9 select scenes, N toggles on-screen rehearsal notes, M pauses motion, B blanks the stage, and Escape closes the modal or notes/blank state. Fullscreen, restart and simple-graphics controls support rehearsal. Notes are visible to the audience, not private presenter notes. Chapter, motion and simple-graphics preferences survive route navigation in memory; restart resets the story and exploration selections. System reduced motion and manual pause suppress animated travel and entrances. The simple fallback retains the story, evidence and actions without WebGL.
