# GrowthIQ Innovation OS — Connected Opportunity Brief

## Product reference and retained versions

Based on the user-provided **GrowthIQ 3.0 — The Innovation Command Center: A Growth Operating System for the VP of Innovation** proposal. The opportunity is the persistent unit of work. The user approved a rebuild around connected opportunity reasoning and one continuous brief with contextual editors; the previous prototype and main GrowthIQ remain available for comparison.

| Version | Entry | Implementation | Browser-local key |
| --- | --- | --- | --- |
| Current connected brief | `innovation.html#home` | `innovation/innovation-brief.jsx`, `innovation/brief-model.mjs`, `innovation/learning.mjs`, `innovation/learning-ui.jsx`, `innovation-brief.css`; shared `innovation.css` | `growthiq-connected-brief-v1` |
| Retained previous prototype | `innovation-classic.html#home` | `innovation/innovation.jsx`, `innovation/model.mjs`, `innovation/persistence.mjs`, `innovation.css` | `growthiq-innovation-os-v1` |
| Existing GrowthIQ | `index.html#feed` | Existing application and service boundaries | Existing keys, unchanged by this version |

The connected brief links to both comparison entries. Its state is independent of the previous prototype: opening or resetting either version does not migrate, merge or reset the other. Connected Markets, Living Landscape and the hidden Expedition remain existing separate experiences.

The persona is a VP of Innovation at **Meridian Specialty Materials**, a fictional compounder. **Aster Mobility** is a fictional battery-pack manufacturer. Battery Materials Expansion starts at Validate; Discover and Screen are completed only as illustrative scenario context. Fund, Hold and Stop change disposition, not lifecycle stage. Funding a validation program does not establish feasibility or commercialization readiness.

### Original-proposal mapping

| Proposal | Current connected interpretation |
| --- | --- |
| §1 Workspaces and interconnected intelligence | Home, Portfolio and the brief share one opportunity record. A source-linked reasoning chain connects market, customer, application, capability and constraint. |
| §2 Innovation Command Center | Home presents the capacity signal, conditional scenario effect, unresolved questions and next action; no fabricated portfolio metrics. |
| §3 Living Opportunity Canvas | One readable document holds thesis, strategic fit, objection, evidence, scenario, validation work, decision and history. Editing happens in context. |
| §4 Seven-stage innovation workflow | Expandable lifecycle, with Validate implemented in depth; no generic workflow designer. |
| §5 Interconnected growth intelligence | Each reasoning link opens a source record and its implication. Captured market context is distinguished from illustrative links and team hypotheses. |
| §6 AI understands ongoing work | A prepared interpretation connects the capacity signal to a specific volume assumption and deliberate review. No live AI research is simulated. |
| §7 Intelligent starting points | Inspect the signal, follow the reasoning, challenge the case, inspect tests and prepare a decision. |
| §8 Persistent assets | Browser-local drafts, evidence-linked revisions, validation learning, immutable decision snapshots and downloadable memos. |
| §9 One canvas, multiple modes | Six anchors—case, evidence, learning, validation, decision and history—navigate one continuous brief; editors and nested source drilldowns preserve reading context. |
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
| `#home` | Next unresolved action and validation questions |
| `#portfolio` | Shared opportunity summary |
| `#opportunity/battery-materials/case` | Thesis, fit, strongest objection and connected reasoning |
| `#opportunity/battery-materials/evidence` | Source, interpretation, conversion and current scenario |
| `#opportunity/battery-materials/learning` | Five claims, pending findings and recorded assessments |
| `#opportunity/battery-materials/validation` | Program, two tests, criteria, questions and learning |
| `#opportunity/battery-materials/decision` | Decision basis, explicit choice and receipt |
| `#opportunity/battery-materials/history` | Recorded decisions, immutable exports and revisions |

These six opportunity hashes scroll and focus sections of the same document. Browser Back/Forward is supported under static hosting. In the new entry, legacy `#opportunity/battery-materials/overview` redirects to `case`, and `#opportunity/battery-materials/assumptions` redirects to `evidence`. Unknown routes recover to Home with a notice. The classic entry retains its old `overview`, `evidence`, `assumptions` and `decision` routes.

`innovation-brief.jsx` owns the React shell, routing, contextual dialog stack and source loading. `learning.mjs` owns claim definitions, finding intake, assessment transitions and learning validation/export; `learning-ui.jsx` renders Home learning, claim rows, source and assessment drawers, and the previous-decision comparison. `brief-model.mjs` owns scenario fixtures, validation, transitions, local persistence, snapshot creation and memo generation; it reuses arithmetic from `model.mjs`. The entry loads shared `themes.css` and `innovation.css`, then the scoped `innovation-brief.css` layer. It reads a valid existing palette preference and defaults to Advisory without writing the theme preference.

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

The connected version writes only `growthiq-connected-brief-v1`; the key name is retained while the saved schema is now version 2. Valid version-1 connected work migrates on restoration by adding the five unresolved claims and empty findings/assessment history. Existing decisions and their snapshots are preserved without retroactively adding learning; a migrated decision draft receives the new pending-evidence reason field. Version-2 state stores committed edits, learning records, drafts, decisions and history; the expert brief is a local draft. Reload validates saved state. Malformed or incompatible data starts a fresh scenario with a notice. Denied storage or quota failure leaves an explicitly session-only experience. Confirmed reset replaces only this version's state with its seed, preserving classic and main-product data and theme preferences.

Storage events load the latest browser-local state from another tab. The stale-review guard protects comparisons; this is not collaborative merging. No authentication, backend changes, payments, funding authorization, research generation, outreach, expert requests, live monitoring, collaboration or SalesPlay execution is performed. No runtime file depends on the proposal attachment's machine-specific path.

## Visual continuity and verification

The direction contract is `.impeccable/briefs/innovation-connected.md`. This is an ordinary extension of the incumbent GrowthIQ visual system: local Source Serif, Source Sans and JetBrains Mono assets, semantic palette roles, editorial reading surfaces and compact controls. The brief adds an anchored document and contextual editing, with source-backed reasoning as its signature interaction. On narrow screens the reasoning chain and reading columns stack; the drawer fits the viewport. Reduced-motion CSS removes animations and transitions.

`PRODUCT.md` and `DESIGN.md` remain the durable product and visual context. This task did not revise the global system or normalize preexisting detector advisories. Learning adds readable claim rows, source excerpts and protected contextual assessment editors using the same semantic roles, font assets and incumbent family aliases. The documentation handoff records the absent sidecar and the detector observations in `.impeccable/review/innovation-learning/documentation.md`.

Verified during this extension: **90 passing `npm test` checks**, plus **3 passing Connected Markets regression checks** (`node --test verification/connected-markets.test.mjs`); build, check and diff checks passed. `learning.test.mjs` covers finding intake and provenance, accepted and rejected assessments, claim/input validation, stale and draft guards, dependent-claim reopening, immutable snapshots/memos, draft persistence and version-1 migration. Existing classic and connected checks remain in the test suite.

The implementation handoff reports browser verification at desktop **1440 × 900** and mobile **390 × 844**: a funded baseline, prepared interview review ($2.8M → $2.24M), technical blocker, subsequent Hold with the original snapshot preserved, manual entry, draft reload and no-change review. Mobile screens had no horizontal overflow; Escape returned focus, and no browser errors were observed. Captures are in `.impeccable/review/innovation-learning/`, including desktop/mobile Home pending, claims, assessment and decision views, plus manual intake and the review receipt. Snapshot and memo content are also covered by model checks; a browser download click alone does not establish filesystem delivery. The independent extension finish review disposition is **Ship**, with no material findings. That review inspected supplied screenshots and source; it did not independently run browser/tests or measure live contrast or motion. These checks concern this local prototype, not an exhaustive accessibility or production-integration audit.
