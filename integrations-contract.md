# Integrations

Route: `/#integrations`, under **Workspace** in the shared navigation. This is a frontend proposal for configuring company sources. Every provider shown is a design proposal, not a claim of a deployed connector.

## Surface and behavior

Operate mode: an ordinary extension of the established GrowthIQ visual world, governed by `PRODUCT.md`, `DESIGN.md` and the logo catalog revision in `.impeccable/briefs/integrations.md`. The full-width discovery view combines search, a category rail and provider logo tiles. Choosing a tile replaces the catalog with a focused provider introduction and setup view. Existing themes, fonts, semantic colors and controls remain in use; this does not introduce a new global design system.

The catalog contains 35 sources across CRM, Documents, Team tools, Projects & support, and Data & business. Search matches provider names and descriptions within the selected category. **Saved setups** filters to configured providers; empty results offer **Browse all**. Changing category clears search. Category counts describe the catalog or saved setups; the result count reflects the active search.

At the user's explicit request, 34 vendor logos were downloaded from asset URLs exposed by the Nango and Pipedream integration pages. These local images live in `assets/integrations/`; `provenance.json` records each asset URL, origin page and local path. The native Documents tile uses the existing SVG icon. Catalog attribution links to the source pages. Logos identify proposed sources and do not promise provider capabilities or deployed integrations.

The setup form requires a name and at least one scope or filename. CRM choices are proposed record types; Drive/SharePoint folders and Slack/Teams channels are explicitly examples, not discovered account contents. Non-file sources offer Daily, Weekly or Manual frequency and a disclosure of proposed read-only access. These preferences do not authorize access or start synchronization.

There is one saved setup per provider. Manage edits that record; it does not create a second account. **Back to integrations** and **Close** discard unsaved form edits, retain the catalog's filter/search and return focus to the source tile, or search if that tile is absent. Selecting a source focuses the setup heading. Through 1050px the provider introduction and setup stack; through 700px categories scroll horizontally above the grid, which becomes two columns through 440px. Mobile text inputs use 16px type.

## Local state and service boundaries

Records persist in this browser under `growthiq-integrations-v1`, keyed by provider ID. Each holds `label`, `scopes`, `frequency`, `paused` and `updated`. These are prototype fields, not an API contract. Storage failure leaves changes in memory for the visit and shows a warning. Search, category, panel selection, unsaved drafts and removal undo are not persisted.

Saved connections show **Not authorized**; non-file sync shows **Not started** or **Paused (preview)**. Pause/resume changes only the local preference. Remove deletes the local setup and offers a single in-memory undo; reloading loses undo, a later removal replaces it, and saving a setup clears it. Removing a setup does not revoke provider access.

Documents uses the native file picker and retains filenames only, deduplicated by name. Individual names can be removed before saving. File bytes are never read, uploaded or persisted. The saved filename list is not a document collection available for research. Documents has no frequency or pause/resume controls.

The feature performs no provider API calls or OAuth, accepts no credentials and runs no sync. Logos load as local site assets; attribution links open their source pages only when selected. The preview neither enforces nor changes actual access-control rules. Provider names, scope examples and local saved states must not be presented as verified production capabilities.

## Mainline handover

`integrations.js` owns the catalog, forms, local state and delegated events; `integrations.css` supplies scoped styling. `app.js` owns routing/navigation, and `index.html` plus `build-site.cjs` include the runtime files. Port the surface into the mainline router, components and state conventions after checking the actual service contracts.

Integration requires verified authentication/authorization flows, permission and ACL enforcement, provider scope discovery, multi-account identities, authoritative sync states and errors, supported scheduling, and explicit revoke/disconnect semantics. Document sources need the existing secure upload and validation flow. Confirm what removing a setup means for retained indexed content and provider authorization. Do not infer endpoints, payloads or permissions from this preview; unsupported behavior remains an identified product/service gap.

## Recorded verification

Initial implementation verification reported `npm run build` passing and browser checks covering required-scope validation, save/reload, pause/resume and remove/undo. The logo catalog revision reports all 91 checks in `node verification/check.cjs` and `node verification/integrations.cjs` passing. Browser review confirmed 34/34 vendor logos loaded, search and Back behavior, and no horizontal page overflow at 390px. These checks establish local preview behavior, not provider connectivity or production permission enforcement.

Token review found the 6px panel radius and 12/13/14px supporting type also present in incumbent `my-work.css`. Detector flags for those values are advisory consistency observations, not a reason to rewrite the global design. Shared `DESIGN.md`, themes and tokens remain authoritative and unchanged by this feature.
