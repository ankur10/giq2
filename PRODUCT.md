# GrowthIQ

<!-- impeccable:product-schema 1 -->

## Platform
web

## Product Purpose
Market, competitor and customer intelligence, with Intelligence Studio, research capabilities, signals and support. The requested outcome is a modern, high-quality frontend using existing data only.

## Operating Context
The staging application was reviewed in the user’s existing Chrome session. Eight left-nav destinations and fourteen accessible current views were captured.

## Capabilities and Constraints
No backend API changes. Preserve current data meanings, routes, permissions and service-backed workflows. Original JavaScript repository and exact API contracts are unavailable; this is a separate interactive frontend reference. Customers is a GrowthIQ workspace for the client's key customers, no longer a SalesPlay sign-in (direction chosen October 2026). Its customers are invented examples until real customer data is connected.

## Brand Commitments
GrowthIQ product name. The user selected Briefing for Home and approved a mineral light visual world inspired by the Axiom reference: locally bundled Source Serif 4, Source Sans 3 and JetBrains Mono; mineral gray canvas, white reading surfaces, charcoal primary actions, restrained blue selection and compact corners. Contextual interactions use existing data only. This direction replaces the earlier plain treatment. The user subsequently requested several color designs with a selector: The final shortlist is Precision, Advisory and Mineral, in that order; Advisory remains the default and recovery palette. Following user feedback, Grove, Midnight, Evergreen, Graphite, Slate, Atelier and Parchment were retired. The remaining options use restrained reading surfaces and concentrated accents. These are comparison options, not a claim of visual approval. Existing layout breakpoints, data meanings and workflows remain fixed; implementation visual QA remains pending. Precision retains scoped sans-serif headings and compact control refinements; Advisory and Mineral retain their existing typography and rhythm.

## Evidence on Hand
../growthiq-ui includes existing records, screenshots, source CSS findings and per-view specifications. Numeric meanings and availability must remain unchanged; no invented KPI, trend, risk score or forecast. The exception is the agent outputs and the research-value concept described below: they are labelled illustrative examples and follow the traceable-figures rule.

## Intelligence Studio
The user approved Intelligence Studio as a first-class destination in the Intelligence navigation group, below Your Briefing and above Ask GrowthIQ, replacing the Agents navigation label. The catalog organizes the existing 22 capabilities (7 micro artifacts and 15 research choices) by outcome: growth opportunities, competition, strategic decisions, customers and accounts, and research deliverables. Search retains original capability names alongside outcome-led names; output filters use existing capability formats. The three prominent starts are a market model, competitor research and a market-entry strategy.

Each task opens a dedicated workspace at #studio/<task-id> with an editable subject, optional context, the existing output format and a source-derived scope outline. Contextual entry points connect briefing signals to a strategy brief, markets to a market model, companies to a company profile, and live signals to signal analysis. Context stays editable and removable. The home briefing also links directly to the Studio catalog.

The local flow is prepare brief → review → download a text brief, save a browser-only draft, or open the existing GrowthIQ setup. This preview does not generate research or transfer the brief or files to the existing product automatically. Saved drafts contain brief text and template filenames only; resuming a saved draft restores that saved version. Template files must be selected again after restoration. Only the market-data template task requires a template selection. The outline describes the existing capability's scope, never a generated result.

The #studio catalog and task workspace extend the existing 15 route types to 17. Legacy #agents and #deep-research remain accessible as Studio catalog aliases. studio-data.js maps the unchanged data.js capabilities to presentation names, objectives and outlines; production configuration, permissions and generation remain with the existing service. Do not invent popularity, completed research history, scores, prices or duration estimates. Since October 2026 this catalogue is the earlier Studio (V1 and its variants); the Intelligence Studio navigation item opens the agent hub described in the next section.

## Intelligence Studio agents
Since October 2026 the Intelligence Studio navigation item opens the agent hub at #agent-hub. Twenty-four agents each end in a call, not a document: the call, its signature view, what changed since the last run, evidence, next actions, a watch and a confidence level. Each agent has a page at #agent/<id>. The hub is a command centre: a navy hero with the ask box and a network of all agents, the calls that need attention, and a board of agents by stage (Spot, Find, Decide, Test, Send up, Watch). The team catalogue is docs/agent-catalogue.html; the data is agents-catalogue.js and agents-examples.js; views and pages are agents.js and agents.css.

Product pages show their agents in a reader (the calls in a list beside one open output) placed under the page tabs: My Feed, Your Briefing, Markets and its ecosystem view, Competitors, Customers, My Work, and Radar, which also carries the monitor library, alerts and the set of emails.

Traceable figures: a number appears only if it comes from MnM data, a disclosed fact or a count of observed events, and every view names its source. Judgements such as relevance, fit or likelihood are ratings with evidence. No composite scores out of 100, invented indices, likelihood percentages, time lags or money at stake.

All agent outputs are illustrative examples for H.B. Fuller, labelled "Example output". Customers are invented. Events attributed to real competitors are examples, except the captured Live Signals. Controls that would need a backend (run again, watch, add a customer, monitor switches) show a preview message.

Research value is a related concept: Ask GrowthIQ answers and My Work show how much MnM proprietary research an answer draws on, at list price. Report titles and prices are illustrative.

The agents are positioned on the MarketsandMarkets promise: the Growth Equation (Markets × Customers × Competition), customers' customers, and insight traceable to evidence.

## Colour Theme Selection
The global topbar offers a native Colour theme select with three direct choices, visible theme names and a palette swatch on desktop and mobile. A selection applies immediately without rerendering the app, changing route or clearing drafts. It is saved in browser localStorage when available; unavailable storage leaves the current in-memory selection usable, and an invalid or retired saved name falls back to Advisory. The saved palette is restored before styles load. A valid ?theme= comparison link takes precedence once and persists its selection; history replacement consumes that parameter so subsequent manual choices survive reload. Saved Precision, Advisory and Mineral selections remain valid. The workspace remains light in all three palettes. The optional dark header applies a native dark color-scheme only to topbar controls. Browser theme-color follows the header surface when dark and the canvas when light. Theme changes make no API calls.

Precision uses Source Sans 3 for interface headings, brand, task names and the question composer; the signal article heading and reading summary retain their serif treatment. Compact Studio rows, tabular market figures, outlined active navigation, consistent control corners and composer focus refine task use without introducing new data or service behavior.

## Header Contrast
The three workspace canvases are lighter while reading panels remain white. An independent Dark header toggle changes only the topbar; sidebar and content remain light. Light is the default. The control exposes aria-pressed, announces state changes and stores its preference under growthiq-header-style. Theme changes preserve this choice. Valid ?header=dark or ?header=light comparison links apply and persist once; theme and header parameters are consumed independently while preserving other query fields and the route. Toggling preserves drafts, routes and filters without rerendering. Storage failure leaves the current in-memory choice usable.

## Open Decisions
Primary persona and production implementation stack were not explicitly specified. This local reference continues the already-delivered static HTML/CSS/JavaScript prototypes.

## Cinematic Product Keynote

The `#keynote` route is a silent, 22-second desktop product film. The user rejected both the movie-to-HTML presentation and the subsequent guided walkthrough, then requested cinematic motion with mobile explicitly out of scope. `keynote-contract.md` records this replacement: camera choreography carries a captured signal into its business significance and then a focused question. The existing workspace and `#demo` tour remain available.

The film uses two locally captured GrowthIQ screens as textures on React Three Fiber planes. The camera approaches Your Briefing, the Sika/Akkim signal lifts from its projected screen position into crisp HTML, its business implication comes forward, and the camera travels toward Ask GrowthIQ before the prepared question appears. The stage uses an Advisory-derived navy palette and the existing local fonts. These choices are scoped to the film and do not alter the global theme selection. The implementation uses the existing React, Three.js and React Three Fiber dependencies.

The signal headline, summary and relevance come from the existing captured dataset in `data.js`; they are not newly verified news. The on-stage implication is a faithful one-sentence condensation for its reading window. At 22 seconds, “Continue in the product” opens the actual `#ask` route with the prepared question, original signal title, full summary and full H.B. Fuller relevance. Editing and normal preview controls become available there. The film's pictured product controls are non-interactive. It fabricates no AI answer, generation sequence, research result, source URL or completed service action.

The two screen assets, `assets/keynote/briefing.jpg` and `assets/keynote/question.jpg`, were captured from the local `#home` and `#ask` routes at 1600×1000 in Advisory on 2026-10-08. The briefing has Sika selected; the Ask capture contains the prepared question. Image provenance is embedded in the assets, and the film footer identifies “Captured product · prepared question.” The original movie is not bundled.

Playback starts once the renderer is ready, stops at 22 seconds and supports Play/Pause, previous/next shot, a scrubbable playhead, fullscreen and Exit film. Space toggles playback outside interactive controls; arrows and Page Up/Page Down select shots; Home or R rewinds and End reaches the final composition. Reduced motion replaces autoplay with manually selected still compositions. Renderer failure offers a contextual product handoff; failure to load the keynote module offers a link to Your Briefing.

Desktop compositions were checked at 1280×720, 1440×900 and 1920×1080, with captures and review evidence in `.impeccable/review/keynote-film`. Reduced-motion behavior was reviewed in source but not tested using the OS setting. Mobile design and QA are excluded; actual projector, GPU and clicker hardware remain untested.
