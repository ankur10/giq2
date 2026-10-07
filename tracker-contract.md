# Radar

Route: `/#radar` (`/#tracker` redirects for existing links), under Intelligence after Ask Domain Expert. Appears in shared command search. Files: `tracker.js`, `tracker.css`; loaded by `index.html`, mapped by `app.js`, shipped by `build-site.cjs`.

## Scope and behavior

Frontend-only prototype. Users track Companies, Topics or Events, with a scope field and optional focus. Delivery choices: Daily, Weekly (day), Monthly (first day), time, timezone and recipient email. Example starts prefill editable company, topic and event briefs. No invented subscribers, experts, delivery history or live news. The adjacent preview uses an email-client container: message toolbar, subject, sender avatar, recipient and time, followed by a short branded message on an inset neutral canvas. Two linked archive stories demonstrate content; they remain fixed across presets and are not live matches. Recipient, subject and schedule follow the selected tracker. Manage preferences opens the tracker editor; Unsubscribe explains the preview-only state. This is a browser-rendered design reference, not production email-client-compatible HTML.

Create and Edit validate nonblank scope, valid time and email, and length-bound user text. My radar supports Preview email, Edit, Pause and Resume. Cancel discards changes. Records persist in browser localStorage under `growthiq-trackers-v1`; the most recent tracker is initially selected after reload. Text is escaped before rendering. Storage failure preserves changes in memory and displays a warning. No background job, subscription, message or email is created. Active is explicitly labeled Preview, and Next delivery says not scheduled. Local storage belongs to an origin/browser, not an authenticated account.

Production integration must replace localStorage with authenticated create/list/update operations and server-authoritative statuses, next delivery times, timezone/DST scheduling and real digest content with verified sources. Connect only to confirmed backend contracts. Recipient validation, email scheduling, provider integration, preference management and unsubscribe handling are backend work; do not ship preview status as proof of delivery. No backend endpoints have been invented or changed.

## Direction

THESIS: Subscribe to a useful briefing with a clear scope, a simple cadence and a visible example of the result.
OWN-WORLD: Ordinary extension of GrowthIQ's existing white surfaces, mineral canvas, theme variables, Source Serif headings and Source Sans controls. SVG icons match the shell.
STORY: Choose a starting idea → refine scope and schedule → inspect the sample email → create and manage tracker.
FIRST VIEWPORT: Radar heading and My radar at left, email preview at right. Empty state and starter examples make the feature discoverable.
FORM: Operate/Read, code-led incumbent extension. No new visual world or approved comp.

## Verification

Browser QA on isolated localhost origin: empty-field validation, topic preset, live recipient/frequency preview, create, pause, persisted pause after reload, edit to monthly, resume. 127.0.0.1 deliverable begins empty. Checked Events preset and 390px mobile layout without horizontal overflow. Build and JavaScript checks pass; no browser runtime errors. Detector returned []. Captures at `.impeccable/review/tracker/`: desktop.png, form.png, saved.png, mobile.png.
