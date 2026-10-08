# GrowthIQ film: "Follow the line"

Date: 8 October 2026
Status: storyboard approved in conversation. Build order: spine, then fragments and polish, then sound and export.

## Purpose

A self-running motion piece of about 1 minute 36 seconds that opens the townhall session before the live five-minute demo (`stage.html`). No narration. Locked to its score.

## Idea

One orange line runs through the whole film without a cut. It follows three rules: it can spike, it can travel, and it can draw an outline. It is the only orange thing on screen. The film opens and closes on the same image: one calm line.

## Storyboard

100 beats a minute; 40 bars of four beats; 2.4 seconds a bar. Every move lands on a beat.

| Bars | Section | Pace | Picture | Words |
| --- | --- | --- | --- | --- |
| 1–2 | The line | Still | Black. One flat orange line. One pulse runs along it. | none |
| 3–8 | Noise | Building | The camera pulls back; the line is one of thousands, all twitching. It loses its colour among them. | "Everything is moving." "All at once." |
| 9–12 | Signal | Sharp | One line spikes and turns orange. The rest fall back. A card snaps on to it. | "This one matters." Card: "A rival buys a cooling start-up." |
| 13–22 | The run | Fast | The line takes off and the camera rides it through four points, then five product areas, then up a steep curve to one number. | "AI data centres run hot." "Heat needs cooling." "Cooling needs pumps." "You make pumps." Radar, Briefing, Markets, Competitors, Customers. "25% a year" |
| 23–30 | Stillness | Held | The line shrinks to a text cursor. A question types. One bar of nothing. The answer appears and the line underlines it. Evidence clicks in. | "Should we enter?" "Yes. Start with components." |
| 31–36 | Work | Driving | The line draws three rectangles; each fills as a page; they stack. | "Model." "Profile." "Plan." |
| 37–40 | Close | Release | The line draws a frame that becomes the real product window. The wordmark appears. The frame unfolds into one flat, calm line. | "GrowthIQ" "We see growth before it happens." |

No invented company names appear. "25% a year" is illustrative.

## Design language

Navy stage `#14213d` to `#070b16`; pale blue-grey `#9fb3d1` for everything that is not the line; orange `#e8701a` for the line only; white type in Source Serif 4, a few words at a time. Product elements appear as fragments in space; the only full product screen is the window at the close.

## Architecture

| File | Responsibility |
| --- | --- |
| `film/score.mjs` | Tempo, sections and every cue as data. Pure. |
| `film/line.mjs` | The line's shape, colour and head position, and the camera pose, as pure functions of the beat. |
| `film/Scene.jsx` | Draws the line, the noise field, the path's points and their labels in 3D. |
| `film/Type.jsx` | Screen-space words, the typed question, the pages and the frame's contents. Reports where the cursor and underline must sit. |
| `film/film.jsx` | Entry: the clock, the start gate and keys. |
| `film.html`, `film.css` | Page shell and styling. |

One clock drives everything. In the spine it is wall time from the start key; when sound is added it becomes the audio clock, so picture and sound cannot drift.

## Controls

Space or click: start. R: restart. F: fullscreen. M: mute (once sound exists). `?t=<seconds>` shows a frozen frame; `?autostart` starts without a key, for recording.

## Testing

Unit tests for the score (sections tile the timeline; cues sit on beats and inside the film) and the line (no gaps: the head and the camera move continuously across every section boundary). Stills per section and a recorded run reviewed by frames. Sound will be verifiable by analysis only (cue timing, levels); judging how it sounds needs a person.

## Out of scope for the spine

Product fragments, the product window's contents, depth of field, sound, and the exported video.
