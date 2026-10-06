# Ask Domain Expert

Route: `/#domain-expert`. A new Intelligence navigation item after Ask GrowthIQ; included in global command search through the shared navigation definition.

## Behavior and integration

`domain-expert.js` renders the request form and history within the existing app shell. `domain-expert.css` uses existing theme tokens and fonts. `index.html` loads the module before `app.js`; `build-site.cjs` publishes both files for the existing Vercel build.

Fields: request title, optional market/geography, question/context, reply email. Required values reject whitespace-only input; email validates format. Text is length bounded and escaped when rendered. Drafts remain in memory across navigation, and reset after submission. Failed validation focuses the first invalid field with its associated inline message.

Submit stores a record in localStorage under `growthiq-domain-expert-requests-v1`. History is newest-first and expandable, with timestamp, local request ID and complete entered details. Confirmation and history explicitly say that no expert has been contacted. Storage failure retains the record in memory and warns that it will not survive reload. No fictional expert, assignment, SLA, price or completed requests are displayed. Request history starts empty.

Mainline integration: replace browser storage with the existing authenticated request create/list service when a contract is supplied. Keep server IDs, timestamps, actual statuses and service errors authoritative; do not ship the preview's local status as confirmation of human engagement. Do not add or guess backend endpoints. All submission currently stays on the device. Local history belongs to this browser origin, not an account; it can disappear when browser data is cleared.

## Surface direction

THESIS: Make asking a human expert as direct as submitting a clear business question, with an accessible record of prior requests.
OWN-WORLD: Ordinary extension of the incumbent GrowthIQ shell: white form surface, mineral canvas, Source Serif headings, Source Sans controls, existing palette variables and SVG icons.
STORY: Describe question and context → submit → confirm local save → reopen history.
FIRST VIEWPORT: Active Intelligence navigation, page heading, form, short human-expertise guidance and a Request history shortcut.
FORM: Operate, code-led incumbent extension; no new visual world or comp.

## Verification

Build and JavaScript syntax checks pass. Browser QA verified required-field errors, test submission on the isolated localhost origin, expansion of submitted details and persistence after reload. The deliverable at 127.0.0.1 has an empty history. 390px mobile viewport has no horizontal overflow. Screenshots: `.impeccable/review/domain-expert/desktop.png`, `mobile.png`, `history.png`. Detector returned no findings.
