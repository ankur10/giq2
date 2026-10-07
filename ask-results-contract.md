# Ask GrowthIQ results redesign

Extension of the approved GrowthIQ Briefing visual system, code-led. User requested redesign following live review of the existing Ask GrowthIQ session and middle history section. Frontend only; no backend/API changes or invented research.

Preview: [http://127.0.0.1:8772/ask-results.html](http://127.0.0.1:8772/ask-results.html). Run `npm start` from the repository root.

## First viewport
A dedicated Ask GrowthIQ sidebar contains new research and searchable, date-grouped Q&A/report history. An expandable two-line question and adjacent copy action sit above six tabs: Answer, Sources, Connected Market, Deep Research, News and Key Competitors. A compact sans-serif answer heading, existing-answer summary and portfolio comparison table establish reading order. On wide desktop the answer uses a 75% column with a section outline alongside; all tab bodies share consistent bounds and gutters.

## Signature interaction
Select history → read result → navigate its sections → prepare a follow-up. Expand recommendations within the layout, reducing reader height without obscuring content. Table selection transfers existing portfolio labels to the composer. Missing captured results and service actions are explicit, never simulated.

## Responsive and motion
The research sidebar starts open at widths of 900px and above; below 900px it starts closed and opens as a dismissible drawer. There is no unrelated application navigation or Show filter. At 1100px and below, the outline disappears and the answer fills the reader. Tabs and tables scroll within their own bounds. Question expansion is an accessible button; research chapters retain native disclosures. Section scrolling respects reduced motion.

## Source and limits
ask-results-data.json captures DOM content from the authenticated source session on 6 October 2026. MXene market/news/competitor results accompany a Jabil question in that session; the mismatch is disclosed, not repaired by fabrication. Text/Visual mode preserves the source visualization failure. History contains captured entries, not their uncaptured answers. Follow-ups, file attachments and report generation are not connected to services. Original public competitor images are linked remotely.

## Implementation and mainline mapping

- `ask-results.html` loads the standalone React bundle and `ask-results.css`; it does not inherit the main shell's theme selector or CSS cascade.
- `ask-results.jsx` owns navigation, tabs, local history filtering, recommendations, composer and export actions. `ask-results-data.json` supplies the captured answer, report outline, news and competitor images; other captured entries and presentation mappings are in JSX.
- `build-studio.cjs` bundles the JSX and JSON into `assets/studio/ask-results.js`; `build-site.cjs` packages the page, stylesheet and assets into `dist/`. Edit sources, not generated output.
- No backend calls are made. Mainline must use existing services for real history, follow-ups, report generation and file uploads, preserving API contracts, authentication and permissions. Local search covers captured entries only. Draft text and selected filenames are temporary; opening the original session does not transfer them.
- Copy and download export the captured answer as plain text. Both controls have accessible names on mobile and are disabled when an uncaptured history answer is selected. They are not generated-report downloads.
- Keep the source Jabil/MXene disclosure, unavailable visual state and remote-image fallback. Reconcile actual service responses during integration; do not fabricate missing content.

## Sources and reader actions

Sources is the second tab. It deduplicates exact URLs and labels their provenance: 2 answer citations, 9 unique news links and 2 competitor figure links. Supporting links are not verified answer citations. Mainline must derive this collection from its existing responses and retain provenance.

Recommendations show a count and five unfiltered entries. Answer copy/download and a neutral expandable confidence control sit beside the composer. The redundant Answer eyebrow has been removed. News uses compact headline rows.

## Verification — current dedicated workspace

The current revision replaces the earlier application-rail layout. The implementation pass reported a successful build after removing the redundant Answer eyebrow. Chrome verification measured matching section bounds for all five non-answer tabs (left 316, top 215.5, width 1215 at the inspected desktop viewport). Desktop and 390px mobile captures are `workspace-desktop.jpg`, `workspace-sources.jpg` and `workspace-mobile.jpg` under `.impeccable/review/ask-results/`.

The fresh reviewer confirmed layout fidelity and requested removal of the redundant Answer eyebrow. The final reviewer confirmed that removal resolved the finding, identified no regressions from the fix and returned a **ship** disposition scoped to that fix. Earlier browser checks and the earlier review of mobile action labels and uncaptured-history export disabling cover previous revisions, not approval of this workspace revision. `npm run check` validates only `app.js` syntax. Production integration remains unverified.

Font-family alias warnings (local Source Sans/Source Serif files are the incumbent Source Sans 3/Source Serif 4), palette/type-ramp differences, the absent `.impeccable/design.json` and older verification records remain scoped or incumbent discrepancies. They are not new global rules; `DESIGN.md` is unchanged.


## Compact sidebar and next steps — latest refinement

Recommended Next Steps is now the seventh result tab, with five captured recommendations, type labels, a count, and actions that populate the follow-up composer. The former expandable footer recommendations are removed. Copy answer and Download sit beside the tab list on wide screens and directly below it on narrower screens. The answer contains no redundant Answer label.

The dedicated sidebar has Back to Home, no Your research heading or close icon, single-line truncated titles (full title retained in the tooltip), and time/status metadata on the second line. Report status styling supports Completed, Processing and Failed; captured records currently include only Completed and Processing. No failure record or exact timestamp was invented. The header toggle remains available for mobile navigation.

Validated build/check, report labels, recommendation-to-composer action, and desktop/mobile layouts. Latest captures: next-steps-desktop.jpg and next-steps-mobile.jpg. No browser console errors observed. These refinements have local verification; earlier independent verdicts retain their original scope.


## Header and composer refinement — latest

The question fills available header width and truncates to one line until expanded. Tab order begins Answer, Sources (13 unique links), Recommended Next Steps (5), followed by the existing remaining views. Download is a filled primary header action. Confidence UI has been removed. Recommendation buttons sit directly beneath their text. The follow-up composer matches the approximately 75% answer column on wide screens and is full width on small screens.

Each Q&A/report row has a separate accessible delete control. Deletion only hides the entry in current-session preview state, with Undo for the latest deletion; reload restores fixtures. No server data is deleted. Browser checks verified Q&A count 7→6→7 and Reports 3→2→3, question expansion, zero confidence controls, reordered tabs, and desktop/mobile layouts. Build and syntax checks pass. Screenshot: .impeccable/review/ask-results/latest-answer.jpg.


## Reading-space cleanup — latest

Question typography is now 19px/1.6 on desktop and 16px/1.6 on mobile, with a two-line preview and in-place expansion; this supersedes the previous single-line rule. Tab labels are 15px desktop / 14px mobile. Sources groups and their divider lines occupy 75% of the content area, capped at 900px, with responsive full width on smaller screens. Next Steps retains the count only in its tab; its main heading count and first divider beneath the description are removed. History titles span the row width; the separate delete control aligns with timestamp metadata. News sort and competitor image-zoom controls are removed; captured news order and fit-width images remain, including original-image links.

Build and syntax checks pass. Browser checks verified source width 900px in a 1215px region, no first Next Steps border, no heading count, and no News/Competitors select controls; desktop/mobile typography inspected.


## Floating follow-up composer — latest

Following the supplied Perplexity reference, the composer is now an isolated rounded floating surface rather than a full-width footer strip. It is capped at 760px, aligned with the reader on desktop, and inset 12px on mobile. Its measured height drives reader bottom padding through ResizeObserver so final content can scroll above it, including when attachment rows increase its height. File controls and the explicit preview-only indication remain. News rows and their divider lines are now capped at 680px, superseding earlier 900px/75% rules.

Build and syntax checks pass; desktop/mobile rendering inspected. Desktop composer measured 760×79px with 127px reader bottom clearance. Screenshot: .impeccable/review/ask-results/floating-composer.jpg.

## Scroll behavior

The top navigation and question scroll with the document. Only the result tabs and adjacent copy/download controls stick to the viewport top. The history sidebar and floating follow-up composer remain available. Tab switches and answer outline links account for the sticky toolbar.

Answer text ends with a compact list of the five existing recommended steps. Its border traces twice when scrolled into view, with reduced-motion support. Selecting a suggestion here or in the Recommended Next Steps tab fills and focuses the follow-up composer, expands its textarea to show the draft, announces the update, and fades a yellow highlight. No research is submitted automatically.

Follow-up selection uses a stationary 4.4-second warm highlight: gentle onset, a short hold, then a gradual fade back to the focused composer border. Reduced-motion mode uses a shorter color-only cue. Repeated selections restart the feedback.

Reusable highlight: `ui/highlight-update.mjs` exports `highlightUpdate(element, options)`. The composer now uses its pale-yellow defaults; duration remains 4.4 seconds. See `ui/highlight-update.md` for cross-repository and Claude Code integration instructions.
