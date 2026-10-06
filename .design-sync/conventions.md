# GrowthIQ conventions (read first)

GrowthIQ is a **CSS-class design system with no React components**. `window.GrowthIQ` is empty on purpose: do not import components from it. Build with plain HTML/JSX elements and the class names below. Every class and token named here is defined in `_ds_bundle.css`, which `styles.css` imports.

## Setup

- Link `styles.css` once. It loads the three fonts and all classes. No provider or wrapper component is needed.
- Theme is an attribute on `<html>`: `data-theme="advisory"` (default, also applies with no attribute), `"precision"` or `"mineral"`. Optional `data-header="dark"` darkens only `.topbar`. The workspace is always light; there is no dark mode.
- The stylesheet resets `h1`–`h4` and `p` margins to 0 and styles bare `svg` as a 20px stroked icon (`fill:none; stroke:currentColor`). Icons are inline `<svg viewBox="0 0 24 24"><path d="…"/></svg>`; there is no icon font or icon component.

## Styling idiom

Use the existing classes for controls and containers; use `var(--token)` in inline styles for your own layout glue. Never hard-code hex colours and never invent new class names expecting them to be styled.

| Need | Classes |
| --- | --- |
| App frame | `.shell` > `.sidebar` + `.workspace`; inside workspace: `.topbar`, then `main.main` |
| Sidebar | `.brand`, `.brand-mark`, `.nav-label`, `.nav` (links; current one gets `.active`), `.badge` |
| Page heading | `.page-header` (h1 + p on the left), `.header-actions` on the right |
| Buttons | `.btn` (outlined default), `.btn.primary`, `.btn.quiet` (text-only), `.btn.small`, `.icon-button`, `.row-action` (inline link-style action) |
| Status chips | `.tag`, plus `.blue`, `.green`, `.amber` or `.outline`; `.count-pill` for counts |
| Sections | `.tabs` (links; current gets `.active`), `.toolbar` > `.tool-group` |
| Inputs | `.field` wrapping `label` + `input`/`select`/`textarea`; `.search-field` (label wrapping svg + input); `.select` |
| Panels | `.surface` (white bordered card), `.table-panel` > `.table-heading` + `.table-wrap` > `table` + `.table-footer` |
| Table cells | `.name-cell` (mark + name), `.num` (right-aligned tabular figures), `.entity-mark` (initials tile; `.gray`, `.green`) |
| Text helpers | `.meta` (small muted inline row), `.sr-only` |
| Empty states | `.empty-state` > `.empty-icon` + h2 + p; `.empty-inline` |

Colour tokens (same names in all three themes): `--canvas` (page), `--surface` (panels), `--sunken`, `--ink`, `--muted`, `--line`, `--control-border`, `--accent`, `--accent-light`, `--selected`, `--selected-border`, `--primary`, `--on-primary`, `--feature`, `--on-feature`, `--focus`, `--green`/`--green-light`, `--amber`/`--amber-light`, `--error`/`--error-light`, `--chart-1` … `--chart-4`. Shape: `--radius`.

Type: body is `"Source Sans 3"` 14px/1.5; `h1`–`h4` are `"Source Serif 4"` by default (Precision switches headings to sans); figures (`.num`, `.count-pill`) use `var(--mono)` (JetBrains Mono). Do not add other font families.

## Where the truth lives

- `_ds_bundle.css` — every rule, in cascade order (base, themes, refinements, Studio, demo). Search it for a class before using one not listed above.
- `guidelines/DESIGN.md` — colour roles, type hierarchy, layout, and do/don't rules. Its dated "verification" paragraphs describe earlier prototype reviews; ignore those.

Content rules from the product: use only data you are given; never invent KPIs, scores, trends or forecasts. Sentence case, British spelling ("Colour").

## Example

```jsx
<main className="main">
  <header className="page-header">
    <div><h1>Your markets</h1><p>Published intelligence for the markets you follow.</p></div>
    <div className="header-actions"><a className="btn primary" href="#ask">Ask about a market</a></div>
  </header>
  <div className="toolbar">
    <div className="tool-group">
      <label className="search-field"><span className="sr-only">Search your markets</span><input type="search" placeholder="Search your markets" /></label>
    </div>
    <button className="btn" type="button">Filters</button>
  </div>
  <section className="table-panel">
    <div className="table-heading"><div><h2>Subscribed market reports</h2><p>3 reports</p></div><span className="tag outline">Subscribed</span></div>
    <div className="table-wrap"><table>
      <thead><tr><th>Market</th><th className="num">CAGR</th><th>Status</th><th>Report</th></tr></thead>
      <tbody><tr>
        <td><div className="name-cell"><span className="entity-mark gray" aria-hidden="true">IH</span><strong>Industrial Hose Market</strong></div></td>
        <td className="num">3.7%</td>
        <td><span className="tag green">Published</span></td>
        <td><button className="row-action" type="button">Inspect</button></td>
      </tr></tbody>
    </table></div>
    <div className="table-footer"><span>1 market report shown</span></div>
  </section>
</main>
```
