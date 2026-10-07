# GrowthIQ stage demo v2: "One decision, start to finish"

Date: 8 October 2026
Status: design approved in conversation. Supersedes `2026-10-08-growthiq-stage-demo-design.md` (the 100-second Ostrel version), which was built to its look checkpoint and rejected: not enough real product, too narrow, and tied to the explainer film.

## Purpose

A live, presenter-driven keynote demo for a company townhall that tells the whole product as one story. Every feature appears once, at the moment one person needs it.

## Decisions

| Question | Decision |
| --- | --- |
| Audience | Whole company, mixed roles. No jargon. |
| Length | About 5 minutes, narrated live, advanced by clicker. Each act can be skipped. |
| Truthfulness | Scripted but truthful: the real interface and stylesheets, staged content, nothing the product cannot do. |
| Story world | Fictional, written for the room. Independent of the explainer film. |
| Numbers | Fictional, shown with an "illustrative" label. |
| Existing code | `app.js`, `#demo`, `#keynote` and their sources are not modified. |

## Cast (all fictional)

- **Maya**, head of strategy at **Norvane**, a hundred-year-old maker of industrial pumps and heat exchangers.
- **Kestrow Group**, Norvane's main rival.
- **Thalic Cooling**, a liquid-cooling start-up.
- **Arden Compute**, a data-centre builder and existing Norvane customer.

## Storyline

| Time | Act | On screen | Presenter says (gist) | Features |
| --- | --- | --- | --- | --- |
| 0:00–0:20 | Cold open | Dark stage. Clock reads 6:42. One email notification: "Your GrowthIQ Radar: 3 things that moved overnight." | "This is Maya. She runs strategy at a company that has made pumps for a hundred years. This is how her Tuesday starts." | — |
| 0:20–1:00 | 1. It finds you | The Radar digest opens. One line stands out: "Kestrow Group acquires Thalic Cooling." It becomes Your Briefing: the signal and "What this means for Norvane". | "She didn't go looking. It found her, and it told her why it matters to her company." | Radar, Your Briefing (Live Signals folded in) |
| 1:00–2:10 | 2. What's really going on? | Market explorer: Norvane's ecosystem, data-centre liquid cooling lighting up with size and growth. Competitors: who is present, as a grid. Benchmarking: rivals side by side. | "Here's the market it points to. Here's who is already there. Here's how they compare with us." | Markets, Competitors, Benchmarking |
| 2:10–3:10 | 3. Ask | Maya types "Should Norvane enter data-centre liquid cooling?" The answer assembles: recommendation, sources, connected markets, deep-research outline. | "She asks the question she'd ask her smartest analyst." Pause. "An answer, with the evidence attached." | Ask GrowthIQ |
| 3:10–3:50 | 4. Go deeper | One uncertain line (can Norvane's technology handle these heat loads?) goes to a specialist. A customer view shows which Norvane customers are building data centres: Arden Compute. | "Some questions need a person. And the opportunity isn't theoretical: one of our own customers is already building." | Ask Domain Expert, Customers |
| 3:50–4:40 | 5. Make it real | Intelligence Studio: a market model, a profile of Kestrow and a market-entry strategy build and stack into a board pack. | "By nine o'clock she has what used to take weeks: the model, the competitor, the plan." | Intelligence Studio |
| 4:40–5:00 | Close | A Radar tracker switches on. Pull back to every screen of the morning, then dark. "We see growth before it happens." | "And tomorrow morning, it'll be watching this for her too." | Radar |

Act 3 is the peak. Acts 2 and 4 are the first to drop if time is short. Support is not shown. The customer view is one light beat because the repo's Customers screen is only a SalesPlay sign-in boundary.

## Staging

The product is a place and the camera moves through Maya's morning. Screens sit on the dark stage as lit panels in the order she uses them.

- Real screens are on stage about 80% of the time.
- Each beat pushes in on one region at roughly twice normal size and dims the rest, so it reads from the back row.
- A large scripted cursor moves, clicks and types. One clicker press triggers one action.
- Constants: a clock (6:42 to 9:00) and a feature label naming the product area.
- Palette: dark navy stage `#14213d` to `#070b16`, the product in its normal light theme, orange `#e07a26` only for what the story is pointing at.
- Motion: one move at a time, stillness while the presenter speaks. No spinning, bounce or confetti.

**Signature moves**

| Act | Move |
| --- | --- |
| Cold open | Only the clock and one notification are lit. |
| 1 | The headline lifts out of the email and becomes the briefing signal's title. |
| 2 | The ecosystem diagram lifts into depth as a field of connected markets (the main WebGL moment), settles into the competitor grid, then benchmark bars rise. |
| 3 | As the answer writes, the market, rivals and signal seen earlier fly in and dock as its sources. |
| 4 | A sentence peels off as a request card to the expert; the customer list filters to one name. |
| 5 | Three documents build page by page and stack into one board pack. |
| Close | Pull back to all the morning's screens, dim, closing line. |

## Architecture

| Piece | Responsibility |
| --- | --- |
| `stage/story.mjs` | The script as data: acts, steps (one per clicker press), and per step the screen, focus region, cursor actions, clock, label and target duration; plus all screen content. |
| `stage/director.mjs` | Step state machine over the flattened steps: next, back, skip act, jump to act, restart, autoplay. Pure. |
| `stage/Sealed.jsx` | Renders children inside an isolated style scope (shadow root) with a chosen set of the product's stylesheets, rewritten so `:root` rules apply to the scope. |
| `stage/screens/*.jsx` | One component per product screen, using the product's real class names and markup structure, content from the story. |
| `stage/World.jsx` | Lays screens out in space; moves the view to a named screen or region; spotlight dim; carries an element between screens. |
| `stage/Cursor.jsx` | The scripted pointer. |
| `stage/Frame.jsx` | Clock and feature label. |
| `stage/Scene.jsx`, `stage/constellation.mjs` | The 3D market field for act 2. |
| `stage/stage.jsx` | Entry: input, director, wiring, fallbacks. |

Screens are sealed from each other because the product's stylesheets reuse variable names with different values (`ask-results.css` and the main cascade both define `--ink`, `--accent` and others).

Screens rebuild the product's markup rather than embedding the running app, because the app hard-codes its workspace content and must not be modified.

What a screen shows is a function of the current step and the seconds spent in it, so back, skip and jump always land in a correct state.

## Controls

| Action | Input |
| --- | --- |
| Next / previous step | Clicker (Page Down / Page Up), arrows, space |
| Next / previous act | `]` / `[` |
| Jump to act | 1–7 |
| Restart | R |
| Fullscreen | F |

## Stage safety

Offline; `?autoplay` recording mode; flat fallback for act 2 without WebGL; cross-fades when reduced motion is requested (`?motion=full` overrides); error boundary around WebGL.

## Testing

- Unit: director; story integrity (every step names a screen and focus that exist; total target time is 280–320 seconds once all acts exist); constellation.
- Stills of every step at 1920×1080 and a recorded autoplay run reviewed frame by frame.
- Not verifiable here: venue hardware. One rehearsal on it is required.

## Build order

1. Engine plus the cold open and act 1, finished, for an experience check by the presenter.
2. Acts 2 and 3.
3. Acts 4 and 5 and the close.
4. Polish, fallbacks, recorded run, one-page script.

## Out of scope

Live service calls; changes to the main app or the existing demo routes; a navigation link to the stage page; mobile layout; committing the explainer film.
