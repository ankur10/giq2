# GrowthIQ Innovation OS — Living Opportunity Brief

## Product reference and retained versions

Based on the user-provided **GrowthIQ 3.0 — The Innovation Command Center: A Growth Operating System for the VP of Innovation** proposal. The opportunity is the persistent unit of work. The user approved a connected opportunity brief and then a guided extension that makes connections and their implications the focus. The current discovery extension brings new illustrative evidence, an alternative route, changed implications and a deliberate response into that same continuous brief. The prior guided investigation, connected brief, classic prototype and main GrowthIQ remain available for comparison.

| Version | Entry | Implementation | Browser-local key |
| --- | --- | --- | --- |
| Current living brief / discovery | `innovation.html#home` (`data-experience="discovery"`) | Shared brief, learning and investigation modules plus `innovation/discovery.mjs`, `innovation/discovery-ui.jsx` and `innovation-discovery.css` | `growthiq-opportunity-discovery-v1` |
| Retained guided investigation | `innovation-guided.html#home` (`data-experience="guided"`) | Shared brief and learning modules plus `innovation/investigation.mjs`, `innovation/investigation-ui.jsx` and `innovation-investigation.css` | `growthiq-guided-investigation-v1` |
| Retained connected brief | `innovation-connected.html#home` | `innovation/innovation-brief.jsx`, `innovation/brief-model.mjs`, `innovation/learning.mjs`, `innovation/learning-ui.jsx`, `innovation-brief.css`; shared `innovation.css` | `growthiq-connected-brief-v1` |
| Retained previous prototype | `innovation-classic.html#home` | `innovation/innovation.jsx`, `innovation/model.mjs`, `innovation/persistence.mjs`, `innovation.css` | `growthiq-innovation-os-v1` |
| Existing GrowthIQ | `index.html#feed` | Existing application and service boundaries | Existing keys, unchanged by this version |

The discovery and retained guided entries link to each other and the comparison versions, including a mobile Compare versions disclosure. Each version has independent state: opening or resetting one does not copy, migrate, merge or reset another. The discovery version starts with its own scenario; prior guided work stays in its original store. Connected Markets, Living Landscape and the hidden Expedition remain existing separate experiences.

The persona is a VP of Innovation at **Meridian Specialty Materials**, a fictional compounder. **Aster Mobility** is a fictional battery-pack manufacturer. Battery Materials Expansion starts at Validate; Discover and Screen are completed only as illustrative scenario context. Fund, Hold and Stop change disposition, not lifecycle stage. Funding a validation program does not establish feasibility or commercialization readiness.

### Original-proposal mapping

| Proposal | Continuous-brief interpretation |
| --- | --- |
| §1 Workspaces and interconnected intelligence | Home, Portfolio and the brief share one opportunity record. A source-linked reasoning chain connects market, customer, application, capability and constraint. |
| §2 Innovation Command Center | Home presents the capacity signal, conditional scenario effect, unresolved questions and next action; no fabricated portfolio metrics. |
| §3 Living Opportunity Canvas | One readable document holds thesis, strategic fit, objection, evidence, scenario, validation work, decision and history. Editing happens in context. |
| §4 Seven-stage innovation workflow | Expandable lifecycle, with Validate implemented in depth; no generic workflow designer. |
| §5 Interconnected growth intelligence | Each reasoning link opens a source record and its implication. Captured market context is distinguished from illustrative links and team hypotheses. |
| §6 AI understands ongoing work | A prepared interpretation connects the capacity signal to a specific volume assumption and deliberate review. No live AI research is simulated. |
| §7 Intelligent starting points | Inspect the signal, follow the reasoning, challenge the case, inspect tests and prepare a decision. |
| §8 Persistent assets | Browser-local drafts, evidence-linked revisions, validation learning, immutable decision snapshots and downloadable memos. |
| §9 One canvas, multiple modes | The current brief adds New route before the six shared anchors—case, evidence, learning, validation, decision and history; all navigate one continuous brief, while editors and nested source drilldowns preserve reading context. |
| §10 Living portfolio | One row derives owner, stage, disposition and next action from the shared state; Hold and Stop retain access to the case. |
| §11 Challenge My Thesis | Four prepared counterarguments with sources and deduplicated questions linked to the relevant validation test. |
| §12 Human + machine | Editable, downloadable expert-validation brief; local and unsent. |
| §13 Design principles | Persistent work, transparent derivation, source proximity, explicit human judgments and decision traceability. |
| §14 The 90-Day Product | Home, one opportunity, a connected brief and a complete validation decision loop form the prototype slice. |
| §15 Monday-morning experience | Reload restores local work; Home prioritizes new validation evidence, then responds to signal review, decisions and subsequent changes to the case. |
| Common platform / different roles | Reusable opportunity, source and validation records; no additional personas are simulated. |

The previous prototype retains its original Home, Portfolio and tabbed Overview / Evidence / Assumptions / Decision canvas. It demonstrates the earlier evidence-to-decision loop, editable scenario and plan, challenge questions, expert brief and snapshot memos. Its earlier layout and local store are retained as a comparison, not represented as the new continuous brief.

## Routes and implementation

`npm run build` builds the application entries; `npm start` serves `dist`. Open `innovation.html#home` for the new version.

| Current hash | Purpose |
| --- | --- |
| `#home` | Current discovery implication and return to the same brief; retained guided Home presents possible specification routes |
| `#opportunity/battery-materials/routes` | Current discovery source, alternative route, before/after implications and inline response |
| `#opportunity/battery-materials/investigate` | Retained guided entry only: investigation using the last selected route |
| `#opportunity/battery-materials/investigate/existing` | Investigate an existing specification and supplier-switching case |
| `#opportunity/battery-materials/investigate/new` | Investigate an open new-specification window |
| `#portfolio` | Shared opportunity summary |
| `#opportunity/battery-materials/case` | Thesis, fit, strongest objection and connected reasoning |
| `#opportunity/battery-materials/evidence` | Source, interpretation, conversion and current scenario |
| `#opportunity/battery-materials/learning` | Five claims, pending findings and recorded assessments |
| `#opportunity/battery-materials/validation` | Program, two tests, criteria, questions and learning |
| `#opportunity/battery-materials/decision` | Decision basis, explicit choice and receipt |
| `#opportunity/battery-materials/history` | Recorded decisions, immutable exports and revisions |

The current discovery entry has seven brief-section anchors; New route opens at the brief heading so opportunity identity, disposition and navigation remain in view. The six shared anchors navigate the same document. In discovery, The opportunity (`case`) scrolls and focuses its section, while the global Brief link opens `routes`; the retained guided navigation is unchanged. The three investigation hashes open the investigation workspace only in the retained guided entry; the discovery entry redirects them to `routes`. Browser Back/Forward is supported under static hosting. In the new entry, legacy `#opportunity/battery-materials/overview` redirects to `case`, and `#opportunity/battery-materials/assumptions` redirects to `evidence`. Unknown routes recover to Home with a notice. The classic entry retains its old `overview`, `evidence`, `assumptions` and `decision` routes.

`discovery.mjs` owns E-05, alternative-route implications, response drafts, immutable records, deduplicated questions and memo content; `discovery-ui.jsx` renders discovery Home and the inline New route section. `innovation-brief.jsx` selects the experience from the HTML entry, scopes storage to its key, and owns the React shell, routing, contextual dialog stack and source loading. `investigation.mjs` defines the two routes, four relationships, source records, saved reasoning, questions and memo content; `investigation-ui.jsx` renders guided Home, route comparison, selected-connection reading, consequence preview and saved investigations. `learning.mjs` owns claim definitions, finding intake, assessment transitions and learning validation/export; `learning-ui.jsx` renders Home learning, claim rows, source and assessment drawers, and the previous-decision comparison. `brief-model.mjs` owns scenario fixtures, validation, transitions, local persistence, snapshot creation and memo generation; it reuses arithmetic from `model.mjs`. The entry loads shared `themes.css` and `innovation.css`, then the scoped `innovation-brief.css` layer; guided and discovery load `innovation-investigation.css`, and discovery additionally loads `innovation-discovery.css`. `build-site.cjs` includes current and retained entries and their stylesheets in the static build. It reads a valid existing palette preference and defaults to Advisory without writing the theme preference.

## New evidence and an alternative route in the current brief

The discovery entry opens a living opportunity brief, with New route followed by the opportunity, evidence, learning, validation, decision and history. E-05 is an **authored fictional Aster engineering follow-up**, labeled “Illustrative engineering interview.” It says the expansion expects to retain the existing design and approved materials, while an unnamed component integrator may evaluate thermal-protection assemblies for Aster’s next platform. No external interview was conducted. Captured EV taxonomy does not substantiate the relationship; the integrator, selection window, access, commercial terms and qualification remain unverified.

A prepared interpretation proposes investigating supply of a formulation to that integrator. The visible chain is **Meridian → component integrator → Aster’s next platform**. Source statement, provenance, limitations and prepared inference remain distinct within the same brief. The before/after comparison makes three implications explicit: the expansion opening narrows toward a possible next-platform opportunity; the point of entry moves from direct Aster access to an unidentified integrator; and qualification needs assembly-level compatibility followed by pack-level approval. A current qualification blocker remains a blocker, and a partner does not establish a remedy.

Neither inspecting this route nor pursuing or dismissing it changes the thesis, volume, share, price, claim judgments or funding decision. Existing revenue inputs describe the original direct-supply scenario, not partner economics. The decision context makes that boundary explicit.

**Pursue this route** requires a rationale and adds two questions to the existing demand and qualification tests: identify the integrator and confirm its willingness and selection window; establish assembly/pack tests and ownership of each qualification gate. These questions use stable identities and are deduplicated on repeated pursuit. **Dismiss this route** requires a rationale, defers those two questions from active validation work and preserves other questions, the source, implications and earlier responses. Reconsidering or reopening appends a subsequent record; it never rewrites history.

The inline response draft survives navigation and reload. Changed opportunity, assumptions, reviewed claims/evidence, plan, tests, findings or prior responses make its basis stale. The rationale remains visible, and saving requires rereading the implications and explicitly acknowledging the current basis. Open case or impact-assessment drafts must be saved, discarded or otherwise resolved before a response can be recorded. Model save errors appear beside the rationale with actions to review each blocking draft; the written rationale is preserved while resolving it. The response form and receipt receive keyboard focus, and “Review what changes” moves focus to the implications heading.

Each saved response captures its timestamp, outcome, rationale, source, all three before/after implications and limitations, question texts and current revenue inputs. Saved responses are material case changes; response drafts are not. A decision requires an initial pursue/dismiss response and no uncommitted response draft. Subsequent decisions include immutable route-response snapshots. Markdown memos preserve the decision’s source statement and limitation, recorded implications, rationale and active or deferred questions even if the live brief later changes.

## Retained guided investigation and its consequences

Home asks whether Aster’s added capacity creates an opening for Meridian. It offers two explicitly conditional routes: **compete within the existing specification**, where an incumbent may retain the specification and qualification advantage, or **help shape a new specification**, where a new design and open selection window must first be established. The comparison shows each possible opening, the case against it and the evidence to seek. Neither route is a validated opportunity.

Four selectable connections make the reasoning inspectable:

| Connection | Mechanism and implication | Counterevidence and next question |
| --- | --- | --- |
| Customer need | Downstream requirements could shape Aster’s material needs; begin with the customer problem. | No downstream evidence establishes a new need. Which pack-level problem matters, and how is it measured? |
| Selection window | Expansion could repeat an existing design or introduce a new one; investigate switching or early specification work accordingly. | Capacity does not establish either design choice. Is supplier selection reopening, or is a new specification being developed? |
| Buying access | Adoption requires a reason to replace the incumbent, or access before a new specification locks. | Interview interest is not a supplier invitation or commitment. Who controls selection, and can Meridian participate? |
| Technical fit | Formulation experience may contribute to performance; customer-defined tests must establish qualification. | No qualification result establishes fit. What requirement and evidence must the material meet? |

Each connection exposes its mechanism, commercial implication, counterargument, source statement, provenance, source limitation and next question. Captured EV taxonomy is separate from illustrative company records, buying-role assumptions, downstream need and application hypotheses. No inferred connection becomes a researched fact.

**Preview technical finding** temporarily illustrates an unmet requirement. It changes the technical connection and its commercial implication: the current formulation is challenged, so reformulation or a partner needs separate evidence before increasing commitment. The capacity announcement remains; pricing, utilization and procurement access remain unresolved. Preview writes no working evidence, claim, assumption, question or saved investigation. Adding questions and saving a route are disabled while preview is active.

Bringing the prepared sample into evidence review is a separate deliberate action. It enters the established learning flow; only an explicit human assessment changes the working qualification claim. A blocked claim changes the actual technical reasoning and Home’s next investigation prompt. For manually entered evidence, the connection discloses the human-reviewed qualification scope and the linked source references, provenance and excerpts, rather than substituting the prepared sample’s statement. This scoped judgment does not establish a feasible remedy, cost or timeline.

**Add question to validation plan** retains the selected connection’s question with its demand or qualification test. The same route/connection question is deduplicated and its button becomes “Added to validation plan.” A blocked technical route can add its changed technical question; unaffected questions remain deduplicated. Exploration does not change revenue inputs or claim judgments.

A written route judgment persists as a local draft through closing and reload. Saving requires a rationale and the current evidence basis; changed assumptions, claims, assessments or capacity review require rereading and explicitly accepting the refreshed basis. Saving creates an immutable record of the route, rationale, conclusion, all four connections and their source records. The brief displays those saved records and warns when their evidence basis differs from the working case. Later findings never rewrite earlier reasoning.

Saved investigations count as material case changes and are copied into subsequent decision snapshots. Decision memos include the saved rationale, conclusion, connection mechanisms/implications and source statements with provenance. An earlier decision exports its own saved investigation history. An uncommitted investigation judgment must be saved or cleared before recording a decision. Route selection and navigation persist for convenience but do not constitute a material revision or trigger decision divergence.

## Source, interpretation and conversion

`data/data1.json` is a captured EV export. Its connected-graph core summary and Battery Production sub-market establish research context only. They are not newly verified research, evidence of a customer relationship, proof of company fit, obtainable share or revenue. A failed fetch leaves the local scenario usable and marks the context unavailable.

All seeded Aster and Meridian records, application assumptions, interviews, technical assessments and prepared interpretations are authored illustrative fixtures. Manually entered findings are labeled “User-provided · unverified”; their source text is preserved separately from the user’s judgment. Source records are read-only; user revisions receive actual timestamps. Neither the proposal's sample $120M opportunity nor its additional portfolio examples are presented as researched values.

The derivation makes three different things visible:

1. **Illustrative source announcement:** Aster plans annual capacity of 280,000 packs, up from 200,000. Capacity is not procurement; commissioning and utilization are unconfirmed.
2. **Team conversion assumptions:** 50 kg of material per pack and 100% application eligibility. These are not statements from the capacity source.
3. **Proposed working hypothesis:** 280,000 × 50 kg × 100% ÷ 1,000 = **14,000 eligible tonnes annually**. The baseline is 200,000 × 50 kg × 100% ÷ 1,000 = **10,000 tonnes**.

Annual revenue scenario = eligible tonnes × obtainable share / 100 × price per tonne. The illustrative baseline is 10,000 × 5% × $4,000 = **$2,000,000**; accepting the volume proposal at the baseline share and price yields **$2,800,000**. The contextual scenario editor lets the user change eligible volume, share and price; the prepared pack-to-tonne derivation remains a labeled hypothesis.

Inputs must be finite and nonnegative, share must be 0–100%, and the result must remain finite. This calculation excludes costs, margins and profitability. It is not market size, committed revenue or a forecast.

## Review and draft protection

The capacity review starts with no selected assessment. Both acceptance and rejection require an explicit choice and rationale. Acceptance changes only eligible volume and links its provenance to the expansion hypothesis; rejection retains the current volume and source. Neither judgment resolves willingness to pay, material intensity or qualification.

The comparison uses current committed assumptions. If these change while the review is open, confirmation is blocked until the user explicitly acknowledges the refreshed comparison. An uncommitted scenario draft blocks acceptance; the user can open a nested editor to save or discard that draft, return with Back, and review the current comparison. Rejection does not overwrite the scenario draft.

Contextual editors save draft values separately from committed values. Closing a drawer preserves its draft; reopening resumes it. Save commits the edit and clears that draft; Discard retains committed values. Nested source/challenge drilldown offers Back. Review receipts and decision receipts receive focus; closing a contextual dialog returns focus to its opener when available.

## Evidence-to-decision return visit

Learning is a new anchored section of the same brief, not a separate workspace. Five explicit claims make the case assessable:

| Claim | Linked validation test | Dependent scenario input |
| --- | --- | --- |
| Customers have a reason to switch | Customer demand | None |
| Customers will consider the assumed price | Customer demand | Price per tonne |
| The obtainable share is plausible | Customer demand | Obtainable share |
| Eligible volume reflects material requirements | Qualification | Eligible volume |
| A credible qualification path exists | Qualification | None |

Claims start **Unresolved**. A reviewed judgment may be **Supported within scope**, **Challenged** or **Blocked**, or remain unresolved. Inspecting a claim shows its scope, source context, related finding history and next question. A supported claim is a recorded human assessment within its written scope; it is not automatic verification or commercial readiness.

Manual intake requires a title, source type (customer interview, technical assessment, market source or team observation), date or context, reference, source excerpt and at least one affected claim. Saving creates an immutable finding with an actual added timestamp and “User-provided · unverified” provenance. Source material remains separate from the later assessment. The finding enters the pending queue without changing claims or scenario values; Home and Portfolio prioritize its review. Intake drafts persist independently through closing and reload.

Two optional prepared samples demonstrate a return visit: a fictional interview round and a technical qualification blocker. Their assessment suggestions are explicitly labeled prepared illustrative material. Manual findings start with a blank user assessment; no AI generation, source verification or research retrieval runs. Each sample can be added once. Adding a sample draws attention to the pending queue.

The assessment drawer keeps the source excerpt and provenance visible. Users edit each affected claim’s relationship (Supports, Challenges or Context only), judgment and written rationale/scope, then explicitly apply the assessment or record no change. Acceptance requires a reason and a complete scoped judgment for every affected claim. It can optionally revise one linked scenario input with a separate explanation. Context-only evidence cannot change a claim judgment or input. Rejection requires a no-change reason and preserves claims and assumptions while retaining both the finding and assessment record. A recorded finding is assessed once; a follow-up finding is needed to revisit it.

Assessment drafts persist. If committed assumptions, claims or assessment history change while an assessment is open, acceptance requires reviewing and acknowledging the refreshed comparison. An unsaved scenario draft blocks acceptance until saved or discarded; recording no change preserves that scenario draft. A successful review receives a focused receipt with the result and recorded reasoning. Nested source/claim views retain Back and contextual reading position.

Changing price, share or volume outside its claim assessment reopens the dependent claim with an explanation that its evidence needs review against the new input. This includes manual scenario changes and the separate capacity-volume review. Test status and learning notes never close claims automatically.

Accepting the prepared interview assessment after the capacity proposal, with its suggested trial price of $3,200/t, changes the illustrative annual scenario from **$2,800,000 to $2,240,000** (14,000 t × 5% × $3,200). Switching is supported only within the stated interview scope; price is challenged and the other claims remain unresolved. The technical sample can record qualification as blocked. These judgments update the current assessment and objection without authorizing a decision or revising earlier records.

The decision section compares the current annual scenario and changed claim judgments with the latest recorded decision, and identifies new or pending findings. A subsequent Hold, Fund or Stop records a new snapshot. Earlier decisions and their memos retain the original source material, assumptions and reasoning.

## Validation work and deliberate decisions

The seed proposes **$150,000 over eight weeks and five interviews**. This is an editable illustrative envelope. Two editable tests make the learning commitment concrete:

| Test | Seed checkpoint and expected evidence | Seed advance / hold criteria |
| --- | --- | --- |
| Will customers pay and switch? | Customer discovery lead, Week 4; documented responses on the problem, acceptable price and reason to switch | At least three of five interviews identify the problem and a credible path to testing a price near $4,000/t; hold if switching value or price is unsupported. This is a validation signal, not an order. |
| Is there a credible route to qualification? | Materials R&D lead, Week 8; customer criteria, test plan, capability gaps and material intensity estimate | Define a feasible next test program and replace the 50 kg assumption with a supported range; hold or stop for blocking requirements or no feasible qualification path. |

Each test has a responsible owner, checkpoint, method, expected evidence, advance criteria, hold/stop criteria, status and learning notes. Status options are Not started, In progress and Ready for review; Ready for review requires learning notes. Notes and statuses do not automatically resolve evidence gaps. Challenge questions are added once and associated with a test.

Every decision requires an intentionally selected outcome and written rationale. The UI initially selects none. Opportunity, scenario, program and test drafts must be saved or discarded before recording. Open impact-assessment drafts must also be applied, rejected or discarded. Pending findings require a written reason for deciding while their evidence remains unassessed. If the capacity review remains pending, a separate written reason for deciding with it open is required.

| Outcome | Additional requirement | Local result |
| --- | --- | --- |
| Fund validation | Valid saved plan and tests; explicit acknowledgment of the tests, scoped claim judgments and remaining evidence gaps | Disposition becomes Validation planned; Home directs the user to continue validation work. |
| Hold | Condition for reconsideration | Disposition becomes On hold; next action revisits the condition. |
| Stop | No additional field beyond the shared rationale requirements | Disposition becomes Stopped; next action returns to retained history. |

A receipt confirms the recorded result. Each decision appends an immutable copy of the opportunity, inputs and origins, review, plan, experiments, questions, source records, captured-context availability, gaps, calculated scenario and complete learning state (claims, findings and assessment history). Later committed edits produce a divergence notice and a next action to review the changed case. Exporting an earlier decision always uses that decision's snapshot, including its original test criteria, scoped claims, source excerpts and assessment history. Memos include pending-finding status and any written reason for deciding with evidence unassessed; recorded input changes retain their before/after values and reasoning. Decision memos and expert briefs download as Markdown; downloading an expert brief sends no request.

## Persistence and service boundaries

The current discovery entry writes only `growthiq-opportunity-discovery-v1` and stores a version-1 discovery record within the shared version-2 brief schema. It does not import or migrate prior guided, connected or classic state. The retained guided entry writes only `growthiq-guided-investigation-v1`; its shared brief schema is version 2 with a version-1 investigation record. The retained connected entry writes only `growthiq-connected-brief-v1`; that key name is retained while its saved schema is version 2. Valid version-1 connected work migrates on restoration by adding the five unresolved claims and empty findings/assessment history. Existing decisions and their snapshots are preserved without retroactively adding learning; a migrated decision draft receives the new pending-evidence reason field. Version-2 state stores committed edits, learning records, drafts, decisions and history; the expert brief is a local draft. Reload validates saved state. Malformed or incompatible data starts a fresh scenario with a notice. Denied storage or quota failure leaves an explicitly session-only experience. Confirmed reset replaces only the active version's state with its seed, preserving the other comparison versions, main-product data and theme preferences. Its dialog title, action and receipt identify the active discovery, guided or connected experience.

Storage events load the latest browser-local state from another tab. The stale-review guard protects comparisons; this is not collaborative merging. No authentication, backend changes, payments, funding authorization, research generation, outreach, expert requests, live monitoring, collaboration or SalesPlay execution is performed. No runtime file depends on the proposal attachment's machine-specific path.

## Retained guided visual continuity and historical verification

The guided direction contract is `.impeccable/briefs/innovation-guided.md`; the retained connected contract is `.impeccable/briefs/innovation-connected.md`. This is an ordinary extension of the incumbent GrowthIQ Advisory world: bundled Source Serif, Source Sans and JetBrains Mono assets, semantic palettes, editorial reading surfaces, fine borders and compact controls. The guided signature is a selected relationship beside its mechanism, implication and evidence. At widths through 950px the relationship navigation becomes concise labels above the explanation; selecting a relationship focuses and scrolls to it. Through 800px the shell compacts and comparison links move into a disclosure. Route comparison stays in a contained table scroller. Selected-connection reveal lasts 280ms; reduced-motion CSS disables it.

`PRODUCT.md` and `DESIGN.md` remain the durable product and visual context, unchanged by this extension. No global tokens, sidecar or drift repairs were introduced. `.impeccable/review/innovation-guided/documentation.md` records the scoped CSS and detector observations without promoting this composition into global brand guidance.

The implementation handoff reports **99 passing application checks** (`npm test`) and **3 passing Connected Markets checks** (`node --test verification/connected-markets.test.mjs`), with build, check and diff checks passing. Investigation checks cover source/hypothesis distinctions, preview purity, saved reasoning and sources, stale-basis guards, question deduplication, decision snapshot/memo inclusion, navigation versus material changes, and isolated storage. Existing classic, connected and learning checks remain in the suite. Two independent-review findings were fixed: a qualification blocker now varies only the technical-fit question identity, preserving deduplication for unaffected questions; reset copy now names the active experience. The final 99-check run, build and diff check passed after these fixes.

Reported browser exercises covered route comparison and selection, source disclosure, deduplicated question UI, draft reload, saving into the brief, and preview → sample intake → human assessment → changed Home. The previous connected comparison state remained unchanged. No console errors or horizontal page overflow were observed at 390px and 819px. Screenshots in `.impeccable/review/innovation-guided/` cover desktop **1440 × 900**, mobile **390 × 844** and user width **819 × 942**, including Home, investigation, comparison, technical connection, changed implications and saved brief. The required viewport matrix reflects the final layout; supplemental comparison, implications and saved-brief captures precede the compact-navigation and access-wording refinements. Additional `question-dedup-819.jpg` and settled `reset-819.jpg` captures document the review fixes at user width. Reduced motion was inspected in source but was not OS-tested. Snapshot and memo content is supported by model checks; a browser download click alone does not prove filesystem delivery.

The independent guided-extension finish review is **Pass — ship**, with both findings resolved through source changes, regression coverage and screenshots, and no remaining material findings from this review. The guided verification state was reset through its scoped UI, leaving the initial scenario ready and comparison states preserved. This documentation pass checked source and supplied implementation evidence; it did not independently rerun browser or runtime tests. The reported checks concern this local prototype, not an exhaustive accessibility or production-integration audit.


## Current discovery visual continuity and verification

The current contract is `.impeccable/briefs/innovation-discovery.md`. This remains an ordinary extension of the incumbent Advisory design: existing local fonts, semantic colors, ruled reading surfaces, compact controls and contextual editors. `innovation-discovery.css` adds the three-step relationship chain, adjacent source and interpretation, before/after implication rows, unchanged-input explanation, inline response and retained history. Through 1100px the implication title moves above its comparison; through 800px source, chain and implications stack, response actions fill their available width, and section navigation scrolls within its own container. Response and receipt emphasis lasts 240ms, disabled by reduced-motion CSS.

The single detector pass produced 11 font-size advisories only, recorded in `.impeccable/review/innovation-discovery/detector.json`. These are local type-size observations; no global token change or unrelated design drift repair was made. `PRODUCT.md`, `DESIGN.md` and the sidecar remain unchanged. The documentation handoff in that review directory records the scoped evidence without changing historical global verification claims.

The implementation handoff reports **107 passing application checks** (`npm test`) and **3 passing Connected Markets checks**, plus passing build, check and diff checks. Discovery checks cover unchanged economics and claims, explicit rationale, stale basis, open-draft guards, question deduplication, pursue/dismiss/reopen history, retained qualification blockers, immutable decision memos, malformed saved records and isolation from guided storage.

Reported browser exercises covered pursued drafts surviving reload, changed inputs and stale-basis acknowledgment, dismissal and reopening, question deduplication, a Hold decision, downloaded memo with the actual file inspected, the implications jump and keyboard focus, mobile response-form keyboard use, comparison with the guided version and browser Back. No console errors or horizontal page overflow were observed at 390px and 1280px. Required captures in `.impeccable/review/innovation-discovery/` are `desktop.jpg` (1440 × 900), `desktop-full.jpg`, `mobile.jpg` (390 × 844), `mobile-implications.jpg` and `user-1280.jpg` (1280 × 720). Supplemental `mobile-editor.jpg` records the inline form; `pursued-receipt.jpg` predates the chain reorder and is interaction evidence, not final-layout evidence.

Two P2 finish-review findings were fixed in one batch: discovery case navigation now focuses its actual section, and model save errors appear beside the response rationale with draft-recovery actions. Browser rechecks covered desktop/mobile case navigation and Back, plus a blocking scenario draft followed by review, discard and successful retry. All 107 application checks and the build passed after these fixes. `desktop.jpg`, `mobile.jpg` and `user-1280.jpg` were refreshed. `desktop-opportunity-fix.jpg`, `mobile-opportunity-fix.jpg` and `mobile-error-fix.jpg` are authoritative for the targeted fixes; `desktop-full.jpg` predates the navigation fix.

Reduced motion was inspected in source, not tested through the OS setting. This documentation pass reviewed source and supplied implementation evidence without independently rerunning runtime or browser tests. The independent finish-review verdict is **Pass — ship**, with both findings resolved (2/2) through source and desktop/mobile fix captures and no remaining material findings from that scoped review. Runtime recovery and test results are implementation verification; the independent reviewer did not rerun them. Verification state was reset only for this discovery test work; retained guided state was preserved. These checks cover the local prototype, not exhaustive accessibility or production integrations.
